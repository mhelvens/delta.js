/* import internal stuff */
import U                           from '../misc.js';
import {ReadableTarget, wt}        from '../Target.js';
import defineApplicationConditions from '../applicationConditions.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta)) { return }

	deltaJs._nextDeltaUUID = 0;

	/** {@class Delta}
	 *
	 */
	deltaJs.Delta = U.newClass(function Delta(arg, options = {}) {
		this.arg  = arg;
		this.uuid = deltaJs._nextDeltaUUID++;
		this.options = options;
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg, this.options) },

		/** {@public}{@method}{@nosideeffects}
		 * @param  value   {*}       - any given value
		 * @param  options {object?} - the (optional) options for this delta application
		 * @return {*} - the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value, options = {}) {
			if (value instanceof ReadableTarget)   { value = value.value   }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'), options);
			return obj.value;
		},

		/** {@public}{@method}{@nosideeffects}
		 * @param other {DeltaJs#Delta} - the other delta to compose with
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		composedWith(other) { return deltaJs.composed(this, other) },

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = this.type;
			if (this.options.targetProp)  { str += ` ‹${this.options.targetProp}›`    }
			if (U.isDefined(this.arg)) { str += `: ${JSON.stringify(this.arg)}` }
			if (options.debug)         { str += ` (${this.options.uuid})`          }
			return str;
		},
	});
};
