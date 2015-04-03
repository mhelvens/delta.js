/* import internal stuff */
import {extend, indent, t, oncePer, objectsEqual} from './util.es6.js';
import Path                         from './Path.es6.js';
import {wt}                         from './Target.es6.js';
import define_ContainerProxy        from './ContainerProxy.es6.js';


export default oncePer('Modify', (deltaJs) => {


	define_ContainerProxy(deltaJs);


	//noinspection JSUnusedLocalSymbols
	deltaJs.newOperationType('Modify', class Modify extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.subDeltas = {};
			extend(this.subDeltas, this.arg || {});
		}

		/** {@public}{@method}{@nosideeffects}
		 * @return {DeltaJs#Delta.Modify} - a clone of this delta
		 */
		clone() {
			var result = super.clone();
			Object.keys(this.subDeltas).forEach((prop) => {
				result.subDeltas[prop] = this.subDeltas[prop].clone();
			});
			return result;
		}

		equals(other) {
			return objectsEqual(this.subDeltas, other.subDeltas, (d1, d2) => d1.equals(d2));
		}

		/** {@public}{@method}
		 * @param target {*}
		 */
		precondition(target) { return target.value instanceof Object }

		/** {@public}{@method}
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			Object.keys(this.subDeltas).forEach((prop) => {
				if (!options.restrictToProperty || options.restrictToProperty === prop) {
					this.subDeltas[prop].applyTo(wt(target.value, prop),
						extend({}, options, { restrictToProperty: null }));
				}
			});
		}

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (Object.keys(this.subDeltas).length > 0) {
				var deltas = Object
						.keys(this.subDeltas)
						.map((p) => this.subDeltas[p].toString(extend({}, options, { targetProp: p })))
						.join('\n');
				str += '\n' + indent(deltas, 4);
			}
			return str;
		}

	}, class ModifyProxy extends deltaJs.ContainerProxy {

		//noinspection JSMethodCanBeStatic
		/** {@public}{@method}
		 * @param rawArgs {*[]}
		 * @return {?{ options: Object, args: *[] }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, path, ...args),
			// though path may also be passed as an option directly
			var options = {};
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.Proxy method is insufficient.`) }
				var arg = rawArgs.shift();
				if (typeof arg === 'string') { options.path = arg     }
				else                         { extend(options, arg) }
			} while (!options.path);
			return { options, args: rawArgs };
		}

		/** {@public}{@method}
		 * @param delta   {DeltaJs#Delta}
		 * @param options {{path: Path}}
		 * @return {DeltaJs#Proxy} - the deepest proxy created for this operation
		 */
		addOperation(delta, options) {
			var {path} = options;
			if (!path.prop) { throw new Error('Operations on a Modify.Proxy need to have a non-empty path.') }

			/* create proxies */
			var deepestProxy;
			if (path.rest) {
				let newOptions = extend({}, options, { path: path.rest });
				let childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
				deepestProxy = childProxy.addOperation(delta, newOptions);
			} else {
				deepestProxy = this.addChildProxy(path.prop, delta);
			}

			// NOTE: Modify operations do not (yet) use any options

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
			result.subDeltas = {};
			this.childKeys().forEach((prop) => {
				result.subDeltas[prop] = this.childDelta(prop);
			});
			return result;
		}

	});


	/* composition - introducing 'Modify' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Modify'), (d1, d2) => {
		var result = d1.clone();
		Object.keys(d2.subDeltas).forEach((prop) => {
			result.subDeltas[prop] = deltaJs.Delta.composed(result.subDeltas[prop], d2.subDeltas[prop]);
		});
		return result;
	});


});
