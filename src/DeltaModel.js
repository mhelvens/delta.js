/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, isDefined, indent, oncePer, o, graphDescendants} from './util.js';
import Path                                    from './Path.js';
import define_Modify                           from './Modify.js';
import define_ContainerProxy                   from './ContainerProxy.js';
import {ApplicationOrderCycle}                 from './Error.js';


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
			result.graph.eachVertex((id, delta) => {
				result.graph.setVertex(id, delta.clone());
			});
			return result;
		}

		equals(other) {
			var g1 = this .graph.transitiveReduction();
			var g2 = other.graph.transitiveReduction();
			var result = true;
			g1.eachVertex((n1, d1) => {
				if (g2.vertexValue(n1).equals(d1)) {
					result = false;
					return false;
				}
			});
			if (!result) { return false }
			g2.eachVertex((n2, d2) => {
				if (g1.vertexValue(n2).equals(d2)) {
					result = false;
					return false;
				}
			});
			if (!result) { return false }
			g1.eachEdge((n1From, n1To) => {
				if (g2.hasEdge(n1From, n1To)) {
					result = false;
					return false;
				}
			});
			if (!result) { return false }
			g1.eachEdge((n2From, n2To) => {
				if (g1.hasEdge(n2From, n2To)) {
					result = false;
					return false;
				}
			});
			return result; // TODO: move 'equals' method to the js-graph library (and make more efficient)
		}

		applyTo(target, options = {}) {
			this.graph.topologically((name, subDelta) => {
				subDelta.applyTo(target, options);
			});
		}

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (this.graph.vertexCount() > 0) {
				var deltas = '';
				this.graph.topologically((name, delta) => {
					deltas += `[${name}] ${delta.toString(options)}\n`;
				});
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
			g.eachVertex((name) => {
				g.setVertex(name, null);
				if (name !== sink) { g.ensureEdge(name, sink) }
			});

			/* transitive reduction */
			g = g.transitiveReduction();

			/* for each delta, gather its ancestors and register through which predecessor they may be reached */
			var resolutions = {}; // first -> second -> possible-resolving-delta -> true
			var getResolutionsIn = (name) => {
				if (g.vertexValue(name)) { return }

				/* find ancestors */
				var ancestors = {};
				g.predecessors(name).forEach((pred) => {
					getResolutionsIn(pred);
					ancestors[pred] = { [pred]: true };
					var predAncestors = g.vertexValue(pred);
					extend(ancestors[pred], ...Object.keys(predAncestors).map(ppred => predAncestors[ppred]));
				});
				g.setVertex(name, ancestors);

				/* find 'incomparable' deltas, plus the first delta that is 'greater' than both */
				Object.keys(ancestors).forEach((pred1) => {
					Object.keys(ancestors).forEach((pred2) => {
						if (pred1 >= pred2) { return } // make sure pred1 < pred2
						var ancs1 = extend({}, ancestors[pred1]);
						var ancs2 = extend({}, ancestors[pred2]);
						Object.keys(ancs1).forEach((anc1) => {
							Object.keys(ancs2).forEach((anc2) => {
								if (anc1 === anc2) {
									delete ancs1[anc1];
									delete ancs2[anc2];
								}
							});
						});
						Object.keys(ancs1).forEach((anc1) => {
							Object.keys(ancs2).forEach((anc2) => {
								o(resolutions, ...[anc1, anc2].sort())[name] = true;
							});
						});
					});
				});
			};
			getResolutionsIn(sink);


			var result = [];
			Object.keys(resolutions).forEach((first) => {
				Object.keys(resolutions[first]).forEach((second) => {
					var x = this.graph.vertexValue(first);
					var y = this.graph.vertexValue(second);
					if (!x.composedWith(y).equals(y.composedWith(x))) {
						result.push({ deltas: [x, y] });
						// TODO: see if conflicts are resolved:
						//graphDescendants(g, firstResolver).forEach((resolver) => {
						//
						//});
					}
				});
			});


			// TODO: remove test code
			console.log(JSON.stringify(result, null, 4));


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
				[ ...options['resolves']||[], ...options['after']||[], ...options['requires']||[] ].forEach((subName) => {
					result.graph.createEdge(subName, name);
					if (result.graph.hasCycle()) {
						result.graph.removeExistingEdge(subName, name);
						throw new ApplicationOrderCycle(subName, name);
					}
				});

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
