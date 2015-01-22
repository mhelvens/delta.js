/* import internal stuff */
import U from '../misc.js';
import defineDelta from './Delta.js';
import {MultipleOverloadsApplicationError,
		NoOverloadsApplicationError,
		MultipleOverloadsCompositionError} from '../Error.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Overloaded)) { return }

	defineDelta(deltaJs);

	deltaJs.overloads = {}; // method -> [delta-classes]

	deltaJs.Delta.Overloaded = U.newSubclass(deltaJs.Delta, (superFn) => function Overloaded(arg, meta) {
		superFn.call(this, arg, meta);
		this.overloads = [];
	}, {
		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {Overloaded} - a clone of this delta
		 */
		clone() {
			var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta); // super()
			result.overloads = this.overloads.map(delta => delta.clone());
			return result;
		},

		/** {@public}{@method}
		 * @param target {WritableTarget}
		 */
		applyTo(target) {
			/* apply the first overload that applies to the target; gather any errors */
			var errors = [];
			var success = this.overloads.some((delta) => {
				var judgment = deltaJs._evaluatePrecondition(delta, target);
				if (judgment !== true) {
					errors.push(judgment);
					return false;
				}
				delta.applyTo(target);
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
		},

		/** {@public}{@method}
		 * @param options {Object?}
		 * @return {String}
		 */
		toString(options) {
			var str = deltaJs.Delta.prototype.toString.call(this, options);
			var overloads = this.overloads.map((delta) => delta.toString(options)).join('\n');
			str += '\n' + U.indent(overloads, 4);
			return str;
		}
	});

	deltaJs.Delta.Overloaded.type = deltaJs.Delta.Overloaded.prototype.type = 'Overloaded';
	deltaJs.Delta.Overloaded.meta = deltaJs.Delta.Overloaded.prototype.meta = { methods: [] };

	deltaJs.newComposition((d1, d2) => (d1 instanceof deltaJs.Delta.Overloaded || d2 instanceof deltaJs.Delta.Overloaded), (d1, d2) => {
		var D1 = d1 instanceof deltaJs.Delta.Overloaded ? d1.overloads : [d1];
		var D2 = d2 instanceof deltaJs.Delta.Overloaded ? d2.overloads : [d2];
		var result = new deltaJs.Delta.Overloaded();
		var errors = [];
		D1.forEach((delta1) => {
			D2.forEach((delta2) => {
				try { result.overloads.push(delta1.composedWith(delta2)) }
				catch (error) { errors.push(error) }
			});
		});
		if (result.overloads.length === 0) { throw new MultipleOverloadsCompositionError(d1, d2, errors) }
		return result;
	});

};
