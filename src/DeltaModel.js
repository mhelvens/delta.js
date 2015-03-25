/* import external libraries */
import JsGraph from 'js-graph';


/* import internal stuff */
import {extend, isDefined, indent, oncePer} from './util.js';
import Path                                 from './Path.js';
import define_Modify                        from './Modify.js';
import define_ContainerProxy                from './ContainerProxy.js';
import {ApplicationOrderCycle}              from './Error.js';


export default oncePer('DeltaModel', (deltaJs) => {


	define_ContainerProxy(deltaJs);


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
			var source = 'source', sink = 'sink';
			while (g.hasVertex(source)) { source = `${source}'` }
			while (g.hasVertex(sink))   { sink   = `${sink}'`   }

			/* source and sink nodes */


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
		 * @param options {Object}
		 * @return {DeltaJs#Proxy}
		 */
		addOperation(delta, options) {
			var {path, name, feature} = options;

			/* create application condition and optional eponymous linked feature */
			if (!this._childApplicationConditions[name]) {
				let appCond;
				if (feature) { appCond = deltaJs.newFeature(  name,            options                             ) }
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
