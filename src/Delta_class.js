/* import internal stuff */
import U, {extend, oncePer}                 from './util.js';
import {ReadableTarget, wt}                 from './Target.js';
import {ApplicationError, CompositionError} from './Error.js';


export default oncePer('Delta', (deltaJs) => {


	oncePer(deltaJs.constructor, 'Delta', () => {

		extend(deltaJs.constructor.prototype, {
			/** {@public}{@method}
			 * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
			 * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
			 */
			newComposition(precondition, compose) {
				this.Delta.newComposition(precondition, compose);
			}
		});

	});


	deltaJs.Delta = class Delta {

		constructor(...args) {
			this.id = ++Delta._nextID;
			this.args = args;
		}

		get arg()  { return this.args[0] }
		set arg(v) { this.args[0] = v }

		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * This method should be overwritten by subclasses to make a clone of 'this' delta.
		 * @return {DeltaJs#Delta} - a clone of this delta
		 */
		clone() { return new this.constructor(this.arg) }

		/** {@private}{@method}
		 * @param target {DeltaJs.ReadableTarget}
		 * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
		 *                                      `false` or an instance of `DeltaJs.ApplicationError`
		 */
		evaluatePrecondition(target) {
			if (this.precondition) {
				var judgment = this.precondition(target);
				if (judgment instanceof ApplicationError) {
					return judgment;
				} else if (!judgment) {
					return new ApplicationError(this, target.value);
				}
			}
			return true;
		}

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
		}

		/** {@public}{@method}{@nosideeffects}
		 * @param other {DeltaJs#Delta} - the other delta to compose with
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		composedWith(other) { return deltaJs.Delta.composed(this, other) }

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = this.type;
			if (options.targetProp)   { str += ` ‹${options.targetProp}›`                               }
			if (this.args.length > 0) { str += `: ${this.args.map((a) => JSON.stringify(a)).join(',')}` }
			if (options.debug)        { str += ` (${this.id})`                                          }
			return str;
		}

		/** {@public}{@static}{@method}
		 * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
		 * @param compose {Boolean|((DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta)} - false, or a side-effect free function
		 */
		static newComposition(precondition, compose) {
			deltaJs.Delta._compositions.push({precondition, compose});
		}

		/** {@public}{@static}{@method}
		 * @param deltas {[DeltaJs#Delta]} - the deltas to compose
		 * @return {DeltaJs#Delta} - the composed delta
		 */
		static composed(...deltas) {
			var result = new deltaJs.Delta.NoOp();

			deltas.forEach((delta) => {
				var d1 = result,
				    d2 = delta || new deltaJs.Delta.NoOp();

				/* use the first composition function for which these deltas satisfy the precondition */
				var composeFn = ()=>{};
				var success = Delta._compositions.some(({precondition, compose: fn}) => {
					if (precondition(d1, d2)) {
						composeFn = fn;
						return true; // success; break the loop
					}
				});

				/* throw an error if 'false' was found rather than a function*/
				if (composeFn === false || !success) { throw new CompositionError(d1, d2) }

				/*  if no composition function is found, use a linear delta model  */
				/*  to 'naively' have one delta apply after another                */
				if (composeFn === true) {
					composeFn = (d1, d2) => {
						var result = new deltaJs.Delta.DeltaModel();
						result.graph.addNewVertex(1, d1);
						result.graph.addNewVertex(2, d2);
						result.graph.addNewEdge(1, 2);
						return result;
					};
					// TODO: make a new dedicated delta type for this; DeltaModel is overkill
				}

				/* return the result on success */
				result = composeFn(d1, d2);
			});

			return result;
		}

	};
	deltaJs.Delta._nextID = 0;
	deltaJs.Delta._compositions  = []; // [{precondition, composeFn}]


});
