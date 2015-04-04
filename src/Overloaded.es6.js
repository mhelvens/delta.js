/* import internal stuff */
import define_Delta                   from './Delta_class.es6.js';
import {indent, oncePer, arraysEqual} from './util.es6.js';
import {MultipleOverloadsApplicationError,
		NoOverloadsApplicationError,
		MultipleOverloadsCompositionError} from './Error.es6.js';


export default oncePer('Overloaded', (deltaJs) => {


	define_Delta(deltaJs);


	deltaJs.newOperationType('Overloaded', class Overloaded extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this.overloads = this.arg || [];
		}

		/** {@public}{@method}{@nosideeffects}
		 * @return {DeltaJs#Delta.Overloaded} - a clone of this delta
		 */
		clone() {
			var result = super.clone();
			result.overloads = this.overloads.map(delta => delta.clone());
			return result;
		}

		equals(other) {
			return arraysEqual(this.overloads, other.overloads, (d1, d2) => d1.equals(d2));
		}

		/** {@public}{@method}
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			/* apply the first overload that applies to the target; gather any errors */
			var errors = [];
			var success = this.overloads.some((delta) => {
				var judgment = delta.evaluatePrecondition(target);
				if (judgment !== true) {
					errors.push(judgment);
					return false;
				}
				delta.applyTo(target, options);
				return true;
			});
			/* if none apply, throw an appropriate error */
			if (!success) {
				if (errors.length === 0) {
					throw new NoOverloadsApplicationError(this, target.value);
				} else if (errors.length === 1) {
					throw errors[0];
				} else {
					throw new MultipleOverloadsApplicationError(this, target.value, errors);
				}
			}
		}

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			var overloads = this.overloads.map((delta) => delta.toString(options)).join('\n');
			str += '\n' + indent(overloads, 4);
			return str;
		}

	});


	/* composition */
	deltaJs.newComposition((d1, d2) => (
		d1 instanceof deltaJs.Delta.Overloaded ||
		d2 instanceof deltaJs.Delta.Overloaded
	), (d1, d2) => {
		var D1 = d1 instanceof deltaJs.Delta.Overloaded ? d1.overloads : [d1];
		var D2 = d2 instanceof deltaJs.Delta.Overloaded ? d2.overloads : [d2];
		var result = new deltaJs.Delta.Overloaded();
		var errors = [];
		for (let delta1 of D1) {
			for (let delta2 of D2) {
				try { result.overloads.push(delta1.composedWith(delta2)) }
				catch (error) { errors.push(error) }
			}
		}
		if (result.overloads.length === 0) { throw new MultipleOverloadsCompositionError(d1, d2, errors) }
		return result;
	});


});
