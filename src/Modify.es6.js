/* import internal stuff */
import {indent, t, oncePer, mapEqual} from './util.es6.js';
import Path                           from './Path.es6.js';
import {wt}                           from './Target.es6.js';
import define_OperationTypes          from './operationTypes.es6.js';
import define_ContainerProxy          from './ContainerProxy.es6.js';


export default oncePer('Modify', (deltaJs) => {


	define_OperationTypes(deltaJs);
	define_ContainerProxy(deltaJs);


	//noinspection JSUnusedLocalSymbols
	deltaJs.newOperationType('Modify', class Modify extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.subDeltas = new Map(this.arg && Object.keys(this.arg).map(key => [key, this.arg[key]]));
		}

		/**
		 * @nosideeffects
		 * @return {DeltaJs#Delta.Modify} - a clone of this delta
		 */
		clone() {
			var result = super.clone();
			for (let [key, delta] of this.subDeltas) {
				result.subDeltas.set(key, delta.clone());
			}
			return result;
		}

		/**
		 * @public
		 * @method
		 * @param target {*}
		 * @param options {object}
		 */
		precondition(target, options = {}) {
			if (!(target.value instanceof Object)) { return false }
			for (let [prop, delta] of this.subDeltas) {
				if (!options.restrictToProperty || options.restrictToProperty === prop) {
					let judgment = delta.evaluatePrecondition(wt(target.value, prop),
						Object.assign({}, options, { restrictToProperty: null }));
					if (judgment !== true) { return judgment }
				}
			}
			return true;
		}

		/**
		 * @public
		 * @method
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			for (let [prop, delta] of this.subDeltas) {
				if (!options.restrictToProperty || options.restrictToProperty === prop) {
					delta.applyTo(wt(target.value, prop),
						Object.assign({}, options, { restrictToProperty: null }));
				}
			}
		}

		/**
		 * @public
		 * @method
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (this.subDeltas.size > 0) {
				var deltas = this.subDeltas.entries()
						.map(([prop, delta]) => delta.toString(Object.assign({}, options, { targetProp: prop })))
						.join('\n');
				str += '\n' + indent(deltas, 4);
			}
			return str;
		}

	}, class ModifyProxy extends deltaJs.ContainerProxy {

		//noinspection JSMethodCanBeStatic
		/**
		 * @param rawArgs {Array.<*>}
		 * @return {?{ options: Object, args: Array.<*> }}
		 */
		processProxyArguments(...rawArgs) {
			// rawArgs is parsed as (...options, path, ...args),
			// though path may also be passed as an option directly
			var options = {};
			do {
				if (rawArgs.length === 0) { throw new Error(`The argument list for this Modify.Proxy method is insufficient.`) }
				let arg = rawArgs.shift();
				if (typeof arg === 'string') { options.path = arg          }
				else                         { Object.assign(options, arg) }
			} while (!options.path);
			return { options, args: rawArgs };
		}

		/**
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
				let newOptions = Object.assign({}, options, { path: path.rest });
				let childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
				deepestProxy = childProxy.addOperation(delta, newOptions);
			} else {
				deepestProxy = this.addChildProxy(path.prop, delta);
			}

			// NOTE: Modify operations do not (yet) use any options

			/* return the deepest created proxy */
			return deepestProxy;
		}

		/**
		 * Dynamically compute and return the delta belonging to this proxy.
		 * @public
		 * @method
		 * @return the delta belonging to this proxy
		 */
		delta() {
			var result = super.delta();
			for (let prop of this.childKeys()) {
				result.subDeltas.set(prop, this.childDelta(prop));
			}
			return result;
		}

	});


	/* composition - introducing 'Modify' ***********************************************/
	deltaJs.newComposition( t('Modify', 'Modify'), (d1, d2, opt) => {
		var result = d1.clone();
		for (let prop of d2.subDeltas.keys()) {
			result.subDeltas.set(prop, deltaJs.Delta.composed(result.subDeltas.get(prop), d2.subDeltas.get(prop), opt));
		}
		return result;
	});


	/* equality ***********************************************/
	deltaJs.newEquality( t('Modify', 'Modify'),
		(d1, d2) => mapEqual(d1.subDeltas, d2.subDeltas, (x, y) => x.equals(y)) );


	/* commutation ***********************************************/
	deltaJs.newCommutation( t('Modify', 'Modify'), (d1, d2, opt) => {
		for (let prop of d1.subDeltas.keys()) {
			if (d2.subDeltas.has(prop)) {
				let sub1 = d1.subDeltas.get(prop);
				let sub2 = d2.subDeltas.get(prop);
				if (!sub1.commutesWith(sub2, opt)) { return false }
			}
		}
		return true;
	});



});
