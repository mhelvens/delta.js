/* import internal stuff */
import U                            from '../misc.js';
import defineDelta                  from './Delta.js';
import {MultipleActiveFacadesError} from '../Error.js';

export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Composite)) { return }

	defineDelta(deltaJs);

	var _overloads = {}; // method -> [delta-classes]
	deltaJs.onNewFacadeMethod((method, handler) => {
		U.a(_overloads, method).push(handler);
	});

	U.extend(deltaJs.constructor.prototype, {
		/** {@protected}{@method}
		 * @param options {object}
		 * @param arg     {*}
		 * @return {DeltaJs#Delta}
		 */
		_newDeltaByMethod(options, arg) {
			var newDeltas = _overloads[options.method].map(handler => handler(arg, options));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				var delta = new this.Delta.Overloaded(arg, options);
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
			throw new Error(`A Delta.Composite subclass (in this case: ${this.type}) needs to implement the 'operation' method.`);
		},

		/** {@public}{@method}
		 * Returns an object that allows new delta operations to be added more easily.
		 * @return {function} - the facade to this delta, for easily adding operations
		 */
		do(...firstArgs) {
			var thisDelta = this;
			// The facade object exposes operations methods directly, but arguments to
			// those operations can partly be given through function-call notation.
			// Therefore, a facade is a function, storing arguments that are already given.
			var fcd = function (...args) {
				return thisDelta.do(...fcd._args, ...args);
			};
			fcd._args = firstArgs;
			U.extend(fcd, operationMethods, {
				_applyOperationMethod(method, ...finalArgs) {
					return thisDelta.operation({method}, ...fcd._args, ...finalArgs); // TODO: (method)
				},
				delta: thisDelta
			});
			return fcd;
		},
	});

	var operationMethods = {};
	deltaJs.onNewFacadeMethod((method) => {
		if (U.isUndefined(operationMethods[method])) {
			operationMethods[method] = function (...args) {
				if (this._facadeDisabled) { throw new MultipleActiveFacadesError(this) }
				var newDelta = this._applyOperationMethod(method, ...args);
				if (newDelta instanceof deltaJs.Delta.Composite) {
					var activeSubFacade = this._activeSubFacade;
					while (activeSubFacade) {
						activeSubFacade._facadeDisabled = true;
						activeSubFacade = activeSubFacade._activeSubFacade;
					}
					return this._activeSubFacade = newDelta.do();
				} else {
					return this;
				}
			};
		}
	});

};
