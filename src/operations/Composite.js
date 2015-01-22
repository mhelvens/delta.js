/* import internal stuff */
import U           from '../misc.js';
import defineDelta from './Delta.js';

export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Composite)) { return }

	defineDelta(deltaJs);

	U.extend(deltaJs.constructor.prototype, {
		/** {@protected}{@method}
		 * @param method {String}
		 * @param arg    {*}
		 * @return {DeltaJs#Delta}
		 */
		_getDeltaByMethod(method, arg) {
			var newDeltas = this._overloads[method]
					.map(type => new this.Delta[type](arg, { method }));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				var delta = new this.Delta.Overloaded(arg, { method });
				delta.overloads = newDeltas;
				return delta;
			}
		}
	});

	/** {@class}
	 *
	 */
	deltaJs.Delta.Composite = U.newSubclass(deltaJs.Delta, (superFn) => function Composite(...args) {
		superFn.apply(this, args);
	}, {
		/** {@public}{@abstract}{@method}
		 * Implement this in subclasses to prepare a specific delta operation with this delta as the base.
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation() {
			throw new Error(`A Delta.Composite subclass needs to implement the 'operation' method.`);
		},

		/** {@public}{@method}{@nosideeffects}
		 * @return {Function} - the facade to this delta, for easily adding operations
		 */
		facade() { return deltaJs.facade(this) },
	});

	var operationMethods = {};
	deltaJs.onNewOperationType((cls) => {
		(cls.meta && cls.meta.methods || []).forEach((method) => {
			if (U.isUndefined(operationMethods[method])) {
				operationMethods[method] = function (...args) {
					var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
					return deltaJs.facade(
						(newDelta instanceof deltaJs.Delta.Composite) ? newDelta : this.delta
					);
				};
			}
		});
	});

	/** {@public}{@method}{@nosideeffects}
	 * @param delta {Composite} - the other delta to compose with
	 * @return {Composite} - the composed delta
	 */
	deltaJs.facade = function facade(delta) {
		/* the facade itself */
		// The facade object exposes operations methods directly, but arguments to
		// those operations can partly be given through function-call notation.
		// Therefore, a facade is a function, storing arguments that are already given.
		var fcd = function (...args) {
			var result = facade(delta);
			result._args = fcd._args.concat(args);
			return result;
		};
		fcd._args = [];
		U.extend(fcd, operationMethods, {
			_applyOperationMethod(method, ...finalArgs) {
				return delta.operation.apply(delta, [method].concat(fcd._args).concat(finalArgs));
			},
			delta
		});
		return fcd;
	};

};
