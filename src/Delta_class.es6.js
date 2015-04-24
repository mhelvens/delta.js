/* import internal stuff */
import {ReadableTarget, wt}  from './Target.es6.js';
import {PreconditionFailure} from './Error.es6.js';
import define_Composed       from './Composed.es6.js';
import {oncePer, isDefined, isUndefined,
        arraysEqual, swapLastTwo} from './util.es6.js';


export default oncePer('Delta', (deltaJs) => {


	/**
	 * @class DeltaJs#Delta
	 */
	deltaJs.Delta = class Delta {

		constructor(...args) {
			this.id = ++deltaJs.Delta._nextID;
			this.args = args;
		}

		/**
		 *
		 * @property arg
		 * @type {*}
		 */
		get arg()  { return this.args[0] }
		set arg(v) { this.args[0] = v }

		/**
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @abstract
		 * @nosideeffects
		 * @return {DeltaJs#Delta} a clone of this delta
		 */
		clone() { return new this.constructor(this.arg) }

		/**
		 * @protected
		 * @param target                          {DeltaJs.ReadableTarget}
		 * @param [options]                       {object}
		 * @param [options.skipWeakPreconditions] {boolean}
		 * @return {boolean|DeltaJs.PreconditionFailure} `true`  if the precondition is satisfied, otherwise
		 *                                               `false` or an instance of {@link DeltaJs.PreconditionFailure}
		 */
		evaluatePrecondition(target, options = {}) {
			let {weak} = options;
			if (this.precondition) {
				let judgment = this.precondition(target, options);
				if (judgment instanceof PreconditionFailure) {
					return judgment;
				} else if (!judgment) {
					return new PreconditionFailure(this, target.value);
				}
			}
			return true;
		}

		/**
		 * @nosideeffects
		 * @param value     {*}      any given value
		 * @param [options] {object} the (optional) options for this delta application
		 * @return {*} the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value, options = {}) {
			if (value instanceof ReadableTarget)   { value = value.value   }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'), options);
			return obj.value;
		}

		/**
		 * @param [options] {object}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = this.type;
			if (options.targetProp)   { str += ` ‹${options.targetProp}›`                               }
			if (this.args.length > 0) { str += `: ${this.args.map((a) => JSON.stringify(a)).join(',')}` }
			if (options.debug)        { str += ` (${this.id})`                                          }
			return str;
		}

	};
	deltaJs.Delta._nextID = 0;


});
