/* import internal stuff */
import U           from '../misc.js';
import defineDelta from './Delta.js';

export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Composite)) { return }

	defineDelta(deltaJs);

	U.extend(deltaJs.constructor.prototype, {
		/** {@protected}{@method}
		 * @param method {string}
		 * @param arg    {*}
		 * @return {DeltaJs#Delta}
		 */
		_newDeltaByMethod(method, arg, options) {
			var newDeltas = this._overloads[method]
					.map(type => new this.Delta[type](arg, U.extend({ method }, options)));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				var delta = new this.Delta.Overloaded(arg, U.extend({ method }, options));
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
		 * Implement this method in subclasses to prepare a specific delta operation with this delta as the base.
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation() {
			throw new Error(`A Delta.Composite subclass needs to implement the 'operation' method.`);
		},

		/** {@public}{@property}
		 * Returns an object that allows new delta operations to be added more easily.
		 * @return {function} - the facade to this delta, for easily adding operations
		 */
		facade(...firstArgs) {
			var thisDelta = this;
			// The facade object exposes operations methods directly, but arguments to
			// those operations can partly be given through function-call notation.
			// Therefore, a facade is a function, storing arguments that are already given.
			var fcd = function (...args) {
				return thisDelta.facade.apply(thisDelta, fcd._args.concat(args));
			};
			fcd._args = firstArgs;
			U.extend(fcd, operationMethods, {
				_applyOperationMethod(method, ...finalArgs) {
					return {
						newDelta: thisDelta.operation.apply(thisDelta, [method].concat(fcd._args).concat(finalArgs)),
						fcdArgs:  fcd._args
					};
				},
				delta: thisDelta
			});
			return fcd;
		},
	});

	var operationMethods = {};
	deltaJs.onNewOperationType((cls) => {
		if (cls === deltaJs.Delta.Composite) { return }
		(cls.options.methods || []).forEach((method) => {
			if (U.isUndefined(operationMethods[method])) {
				operationMethods[method] = function (...args) {
					var {newDelta, fcdArgs} = this._applyOperationMethod.apply(this, [method].concat(args));
					if (newDelta instanceof deltaJs.Delta.Composite) {
						return newDelta.facade();
					} else {
						return this.delta.facade.apply(this.delta, fcdArgs);
					}
				};
			}
		});
	});

};
