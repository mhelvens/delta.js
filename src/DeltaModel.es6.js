/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, isDefined, indent, oncePer, o, graphDescendants} from './util.es6.js';
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
			result.graph = this.graph.clone();
			for (let [id, delta] of result.graph.vertices()) {
				result.graph.setVertex(id, delta.clone());
			}
			return result;
		}

		equals(other) {
			var g1 = this .graph.transitiveReduction();
			var g2 = other.graph.transitiveReduction();
			for (let [n1, d1] of g1.vertices()) {
				if (!g2.vertexValue(n1).equals(d1)) {
					return false;
				}
			}
			for (let [n2, d2] of g2.vertices()) {
				if (!g1.vertexValue(n2).equals(d2)) {
					return false;
				}
			}
			for (let [n1From, n1To] of g1.edges()) {
				if (!g2.hasEdge(n1From, n1To)) {
					return false;
				}
			}
			for (let [n2From, n2To] of g2.edges()) {
				if (!g1.hasEdge(n2From, n2To)) {
					return false;
				}
			}
			return true;
		}

		_assertNoUnresolvedConflicts() {
			for (let conflictInfo of this.conflicts()) {
				if (conflictInfo.conflictResolvingDeltas.length === 0) {
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

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
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

		/** {@public}{@method}
		 *
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
			var resolutions = {}; // first -> second -> possible-resolving-delta -> true
			var getResolutionsIn = (name) => {
				if (g.vertexValue(name)) { return }
				var ancestors = {};
				for (let [pred] of g.verticesTo(name)) {
					getResolutionsIn(pred);
					ancestors[pred] = { [pred]: true };
					let predAncestors = g.vertexValue(pred);
					extend(ancestors[pred], ...Object.keys(predAncestors).map(ppred => predAncestors[ppred]));
				}
				g.setVertex(name, ancestors);
				for (let pred1 of Object.keys(ancestors)) {
					for (let pred2 of Object.keys(ancestors)) {
						if (pred1 >= pred2) { continue } // make sure pred1 < pred2
						let ancs1 = extend({}, ancestors[pred1]);
						let ancs2 = extend({}, ancestors[pred2]);
						for (let anc1 of Object.keys(ancs1)) {
							for (let anc2 of Object.keys(ancs2)) {
								if (anc1 === anc2) {
									delete ancs1[anc1];
									delete ancs2[anc2];
								}
							}
						}
						for (let anc1 of Object.keys(ancs1)) {
							for (let anc2 of Object.keys(ancs2)) {
								o(resolutions, ...[anc1, anc2].sort())[name] = true;
							}
						}
					}
				}
			};
			getResolutionsIn(sink);

			/* out of the incomparable deltas, find those that are actually in conflict, and find any */
			var result = [];
			for (let first of Object.keys(resolutions)) {
				for (let second of Object.keys(resolutions[first])) {
					let x = this.graph.vertexValue(first);
					let y = this.graph.vertexValue(second);
					if (!x.commutesWith(y)) {
						var conflictInfo = {
							conflictingDeltas:       [first, second],
							conflictResolvingDeltas: []
						};
						for (let resolver of Object.keys(resolutions[first][second])) {
							graphDescendants(g, resolver).forEach((resolver) => {
								let z = this.graph.vertexValue(resolver);
								if (resolver !== sink) {
									if (z.resolves(x, y)) {
										conflictInfo.conflictResolvingDeltas.push(resolver);
									}
								}
							});
						}
						result.push(conflictInfo);
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
			this._childOptions = {};               // key -> options
			this._childApplicationConditions = {}; // key -> application-condition
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
			if (!this._childApplicationConditions[name]) {
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
				this._childApplicationConditions[name] = appCond;
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
			if (!this._childOptions[name]) {
				this._childOptions[name] = options;
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
			this.childKeys().forEach((name) => {
				let options = this._childOptions[name];

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
				if (options.feature || this._childApplicationConditions[name].conditional) {
					delta.applicationCondition = this._childApplicationConditions[name];
				}

			});
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
