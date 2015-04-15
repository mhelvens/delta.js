/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, isDefined, indent, oncePer, s}          from './util.es6.js';
import Path                                             from './Path.es6.js';
import define_Modify                                    from './Modify.es6.js';
import define_ContainerProxy                            from './ContainerProxy.es6.js';
import {ApplicationOrderCycle, UnresolvedDeltaConflict} from './Error.es6.js';


export default oncePer('DeltaModel', (deltaJs) => {


	define_ContainerProxy(deltaJs);


	//noinspection JSUnusedLocalSymbols
	deltaJs.newOperationType('DeltaModel', class DeltaModel extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.graph = new JsGraph();
		}

		clone() {
			var result = super.clone();
			result.graph = this.graph.clone(d => d.clone());
			return result;
		}

		equals(other) {
			var g1 = this .graph.transitiveReduction();
			var g2 = other.graph.transitiveReduction();
			return g1.equals(g2, (x, y) => x.equals(y));
		}

		_assertNoUnresolvedConflicts() {
			for (let conflictInfo of this.conflicts()) {
				if (conflictInfo.conflictResolvingDeltas.size === 0) {
					throw new UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
				}
			}
		}

		applyTo(target, options = {}) {
			/* throw an exception if there are unresolved conflicts */
			this._assertNoUnresolvedConflicts();

			/* no unresolved conflicts: apply the delta model */
			for (let [, subDelta] of this.graph.vertices_topologically()) {
				subDelta.applyTo(target, options);
			}
		}

		toString(options = {}) {
			var str = super.toString(options);
			if (this.graph.vertexCount() > 0) {
				var deltas = '';
				for (let [name, delta] of this.graph.vertices_topologically()) {
					deltas += `[${name}] ${delta.toString(options)}\n`;
				}
				str += '\n' + indent(deltas, 4);
			}
			return str;
		}

		conflicts() {
			/* clone the graph */
			var g = this.graph.clone();

			/* source and sink keys */
			var sink = '(sink)';
			while (g.hasVertex(sink)) { sink = `${sink}'` }

			/* create sink vertex, connect it to all other vertices */
			g.addNewVertex(sink, null);
			for (let [name] of g.vertices()) {
				g.setVertex(name, null);
				if (name !== sink) { g.ensureEdge(name, sink) }
			}

			/* transitive reduction */
			g = g.transitiveReduction();

			/* find all pairs of 'incomparable' deltas, plus the closest deltas that are 'greater' than both */
			var resolutions = new Map(); // first -> second -> Set<possible-resolving-delta>
			var getResolutionsIn = (name) => {
				if (g.vertexValue(name)) { return }
				let ancestors = new Map(); // pred -> Set<ancestors-inc-pred>
				for (let [pred] of g.verticesTo(name)) {
					getResolutionsIn(pred);
					let additionalAncestors = new Set([pred]);
					for (let ancSet of g.vertexValue(pred).values()) {
						for (let anc of ancSet.values()) {
							additionalAncestors.add(anc);
						}
					}
					ancestors.set(pred, additionalAncestors);
				}

				g.setVertex(name, ancestors);
				for (let pred1 of ancestors.keys()) {
					for (let pred2 of ancestors.keys()) {
						if (pred1 < pred2) {
							let ancs1 = new Set(ancestors.get(pred1));
							let ancs2 = new Set(ancestors.get(pred2));
							for (let anc1 of ancs1) {
								for (let anc2 of ancs2) {
									if (anc1 === anc2) {
										ancs1.delete(anc1);
										ancs2.delete(anc2);
									}
								}
							}
							for (let anc1 of ancs1) {
								for (let anc2 of ancs2) {
									s(resolutions, ...[anc1, anc2].sort()).add(name);
								}
							}
						}
					}
				}
			};
			getResolutionsIn(sink);

			/* out of the incomparable deltas, find those that are actually in conflict, and find any */
			var result = new Set();
			for (let first of resolutions.keys()) {
				for (let second of resolutions.get(first).keys()) {
					let x = this.graph.vertexValue(first);
					let y = this.graph.vertexValue(second);
					if (!x.commutesWith(y)) {
						var conflictInfo = {
							conflictingDeltas:       new Set([first, second]),
							conflictResolvingDeltas: new Set()
						};
						for (let nearestResolver of resolutions.get(first).get(second)) {
							for (let [resolver] of [[nearestResolver], ...g.verticesWithPathFrom(nearestResolver)]) {
								let z = this.graph.vertexValue(resolver);
								if (resolver !== sink) {
									if (z.resolves(x, y)) {
										conflictInfo.conflictResolvingDeltas.add(resolver);
									}
								}
							}
						}
						result.add(conflictInfo);
					}
				}
			}

			/* return the conflict results */
			return result;
		}

		// TODO: add precondition method which checks 'source' deltas

	}, class DeltaModelProxy extends deltaJs.ContainerProxy {

		constructor(...args) {
			super(...args);
			this._childOptions               = new Map(); // key -> options
			this._childApplicationConditions = new Map(); // key -> application-condition
		}

		/** {@public}{@method}
		 * @param rawArgs {*[]}
		 * @return {?{ options: Object, args: *[] }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, name, ...options, path, ...args),
			// though name and/or path may also be passed as options directly
			var options = {};
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.DeltaModel method is insufficient.`) }
				var arg = rawArgs.shift();
				if (typeof arg === 'string') {
					if (!options.name) { options.name = arg   }
					else               { options.path = arg   }
				} else                 { extend(options, arg) }
			} while (!options.path || !options.name);
			return { options, args: rawArgs };
		}

		/** {@public}{@method}
		 * @param delta   {DeltaJs#Delta}
		 * @param options {{path: Path, name: string, feature: boolean}}
		 * @return {DeltaJs#Proxy}
		 */
		addOperation(delta, options) {
			var {path, name, feature} = options;

			/* create application condition and optional eponymous linked feature */
			if (!this._childApplicationConditions.has(name)) {
				let appCond;
				if (feature) { appCond = deltaJs.newFeature(  name,            options                           ) }
				else         { appCond = deltaJs.newFeature( `delta__${name}`, extend({ hidden: true }, options) ) }
				if (isDefined(options['resolves'])) {
					appCond.if(options['resolves']);
					options = extend({}, options, { feature: false });
				}
				if (isDefined(options['requires'])) {
					appCond.selects(options['requires']);
				}
				if (feature || appCond.conditional) {
					delta.applicationCondition = appCond;
				}
				this._childApplicationConditions.set(name, appCond);
			}

			/* create proxies */
			var deepestProxy;
			if (path.prop) {
				let newOptions = extend({}, options, { name: undefined });
				let childProxy = this.addChildProxy(name, new deltaJs.Delta.Modify());
				deepestProxy = childProxy.addOperation(delta, newOptions);
			} else {
				deepestProxy = this.addChildProxy(name, delta);
			}

			/* store options */
			if (!this._childOptions.has(name)) {
				this._childOptions.set(name, options);
			}

			/* return the deepest created proxy */
			return deepestProxy;
		}

		/** {@public}{@method}
		 * Dynamically compute and return the delta belonging to this proxy.
		 *
		 * @return the delta belonging to this proxy
		 */
		delta() {
			var result = super.delta();
			result.graph.clear();
			for (let name of this.childKeys()) {
				let options = this._childOptions.get(name);

				/* delta in the graph */
				var delta = this.childDelta(name);
				result.graph.addVertex(name, delta);

				/* application order */
				for (let subName of [ ...options['resolves'] || [],
				                      ...options['after']    || [],
				                      ...options['requires'] || [] ]) {
					result.graph.createEdge(subName, name);
					if (result.graph.hasCycle()) {
						result.graph.removeExistingEdge(subName, name);
						throw new ApplicationOrderCycle(subName, name);
					}
				}

				/* application condition */
				if (options.feature || this._childApplicationConditions.get(name).conditional) {
					delta.applicationCondition = this._childApplicationConditions.get(name);
				}
			}
			return result;
		}

	});


	/* composition */
	// to compose delta models, we simply have one apply after the other
	// without any composability checks; in the future, this may become more clever
	deltaJs.newComposition((d1, d2) => (
		d1 instanceof deltaJs.Delta.DeltaModel ||
		d2 instanceof deltaJs.Delta.DeltaModel
	), true);


});
