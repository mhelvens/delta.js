/* import internal stuff */
import U                    from '../misc.js';
import {ReadableTarget, wt} from '../Target.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta)) { return }

	deltaJs._nextDeltaUUID = 0;

	/** {@class}
	 *
	 */
	deltaJs.Delta = U.newClass(function Delta(arg, meta) {
		this.arg = arg;
		this.meta = U.extend({}, meta || {}, { uuid: deltaJs._nextDeltaUUID++ });
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg, this.meta) },

		/** {@public}{@method}{@nosideeffects}
		 * @param  value {*} - any given value
		 * @return {*} - the value resulting in this delta being applied to the given `value`
		 */
		appliedTo(value) {
			if (value instanceof ReadableTarget)   { value = value.value   }
			if (typeof value.clone === 'function') { value = value.clone() }
			var obj = { value };
			this.applyTo(wt(obj, 'value'));
			return obj.value;
		},

		/** {@public}{@method}{@nosideeffects}
		 * @param other {DeltaJs#Delta} - the other delta to compose with
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		composedWith(other) { return deltaJs.composed(this, other) },

		/** {@public}{@method}
		 * @param options {Object?}
		 * @return {String}
		 */
		toString(options = {}) {
			var str = this.type;
			if (this.meta.targetProp)  { str += ` ‹${this.meta.targetProp}›` }
			if (U.isDefined(this.arg)) { str += `: ${JSON.stringify(this.arg)}` }
			if (options.debug)         { str += ` (${this.meta.uuid})` }
			return str;
		},
	});
};
