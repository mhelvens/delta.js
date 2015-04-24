/* import external libraries */
import Graph from 'graph.js';


/* import internal stuff */
import {isDefined, indent, oncePer, s, t}               from './util.es6.js';
import Path                                             from './Path.es6.js';
import define_OperationTypes                            from './operationTypes.es6.js';
import define_Modify                                    from './Modify.es6.js';
import define_ContainerProxy                            from './ContainerProxy.es6.js';
import {ApplicationOrderCycle, UnresolvedDeltaConflict} from './Error.es6.js';


export default oncePer('DeltaModel', (deltaJs) => {


	define_OperationTypes(deltaJs);
	define_ContainerProxy(deltaJs);

	/**
	 * @class DeltaJs#Delta.DeltaModel
	 * @extends DeltaJs#Delta
	 */
	deltaJs.newOperationType('DeltaModel', class DeltaModel extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.graph = new Graph();
		}

		/**
		 *
		 * @returns {DeltaJs#Delta.DeltaModel} a clone of this delta model
		 */
		clone() {
			var result = super.clone();
			result.graph = this.graph.clone(d => d.clone());
			return result;
		}

		/**
		 * Assert that this delta model has no unresolved conflicts.
		 * @private
		 */
		_assertNoUnresolvedConflicts() {
			for (let conflictInfo of this.conflicts()) {
				if (conflictInfo.conflictResolvingDeltas.size === 0) {
					throw new UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
				}
			}
		}

		/**
		 *
		 * @param  target   {DeltaJs.ReadableTarget|*}
		 * @param [options] {object}
		 * @returns {boolean|DeltaJs.PreconditionFailure}
		 */
		precondition(target, options = {}) {
			for (let [name, delta] of this.graph.vertices()) {
				if ([...this.graph.verticesTo(name)].length === 0) { // source vertices // TODO: create graph.inDegree method
					let judgment = delta.evaluatePrecondition(target, options);
					if (judgment !== true) { return judgment }
				}
			}
			return true;
		}

		/**
		 *
		 * @param  target   {DeltaJs.ReadableTarget|*}
		 * @param [options] {object}
		 */
		applyTo(target, options = {}) {
			/* throw an exception if there are unresolved conflicts */
			this._assertNoUnresolvedConflicts();
			/* no unresolved conflicts: apply the delta model */
			for (let [, subDelta] of this.graph.vertices_topologically()) {
				subDelta.applyTo(target, Object.assign({}, options, { weak: true }));
			}
		}

		/**
		 *
		 * @param [options]       {object}
		 * @param [options.debug] {boolean}
		 * @returns {string} a string representation of this delta model
		 */
		toString(options = {}) {
			let str = super.toString(options);
			if (this.graph.vertexCount() > 0) {
				let deltas = '';
				for (let [name, delta] of this.graph.vertices_topologically()) {
					deltas += `[${name}] ${delta.toString(options)}\n`;
				}
				str += '\n' + indent(deltas, 4);
			}
			return str;
		}

		/**
		 *
		 * @returns {Set.<{ conflictingDeltas: Set.<string>, conflictResolvingDeltas: Set.<string> }>}
		 *          information about all conflicts
		 */
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
					if (!x.commutesWith(y, { weak: true })) {
						var conflictInfo = {
							conflictingDeltas:       new Set([first, second]),
							conflictResolvingDeltas: new Set()
						};
						for (let nearestResolver of resolutions.get(first).get(second)) {
							for (let [resolver] of [[nearestResolver], ...g.verticesWithPathFrom(nearestResolver)]) {
								let z = this.graph.vertexValue(resolver);
								if (resolver !== sink && z.resolves(x, y, { weak: true })) {
									conflictInfo.conflictResolvingDeltas.add(resolver);
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

	},
	/**
	 * @class DeltaJs#Delta.DeltaModel.Proxy
	 * @extends DeltaJs#ContainerProxy
	 */
	class DeltaModelProxy extends deltaJs.ContainerProxy {

		constructor(...args) {
			super(...args);
			this._childOptions               = new Map(); // key -> options
			this._childApplicationConditions = new Map(); // key -> application-condition
		}

		/**
		 *
		 * @param rawArgs {Array.<*>}
		 * @return {{ options: Object, args: Array.<*> }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, name, ...options, path, ...args),
			// though name and/or path may also be passed as options directly
			var options = {};
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.DeltaModel method is insufficient.`) }
				var arg = rawArgs.shift();
				if (typeof arg === 'string') {
					if (!options.name) { options.name = arg          }
					else               { options.path = arg          }
				} else                 { Object.assign(options, arg) }
			} while (!options.path || !options.name);
			return { options, args: rawArgs };
		}

		/**
		 *
		 * @param delta   {DeltaJs#Delta}
		 * @param options {{path: Path, name: string, feature: boolean}}
		 * @return {DeltaJs#Proxy}
		 */
		addOperation(delta, options) {
			var {path, name, feature} = options;

			/* create application condition and optional eponymous linked feature */
			if (!this._childApplicationConditions.has(name)) {
				let appCond;
				if (feature) { appCond = deltaJs.newFeature(  name,            options                                  ) }
				else         { appCond = deltaJs.newFeature( `delta__${name}`, Object.assign({ hidden: true }, options) ) }
				if (isDefined(options['resolves'])) {
					appCond.if(options['resolves']);
					options = Object.assign({}, options, { feature: false });
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
				let newOptions = Object.assign({}, options, { name: undefined });
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

		/**
		 * Dynamically compute and return the delta belonging to this proxy.
		 * @return {DeltaJs#Delta} the delta belonging to this proxy
		 */
		delta() {
			var result = super.delta();
			result.graph.clear();
			for (let name of this.childKeys()) {
				let options = this._childOptions.get(name);

				/* delta in the graph */
				let delta = this.childDelta(name);
				result.graph.addVertex(name, delta);

				/* application order */
				for (let subName of [ ...options['resolves'] || [],
				                      ...options['after']    || [],
				                      ...options['requires'] || [] ]) {
					result.graph.createEdge(subName, name);
					let cycle = result.graph.cycle();
					if (cycle) {
						result.graph.removeExistingEdge(subName, name);
						throw new ApplicationOrderCycle(cycle);
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


	/* equality */
	deltaJs.newEquality( t('DeltaModel', 'DeltaModel'), (d1, d2) => {
		var g1 = d1.graph.transitiveReduction();
		var g2 = d2.graph.transitiveReduction();
		return g1.equals(g2, (x, y) => x.equals(y));
	} );


});
