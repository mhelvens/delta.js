/* import external libraries */
import JsGraph from 'js-graph';
import {ApplicationOrderCycle} from './Error.js';


/* import internal stuff */
import U                            from '../misc.js';
import Path                         from '../Path.js';
import defineDelta                  from './Delta.js';
import {MultipleActiveFacadesError} from '../Error.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Facade)) { return }


	defineDelta(deltaJs);


	// TODO: Bake in delta model functionality
	// TODO: 'one Facade active at a time' (cannot use earlier ones after new ones have been used)
	// TODO: Basic application of deltas
	// TODO: Composition in order to generate error messages
	// TODO: Error messages based on syntactic conflicts in delta models


	//var facadeMethods = {
	//	addOperator(path, delta) {
	//		var facade = this.getFacadeByPath(new Path(path));
	//		facade.delta = delta;
	//		if (delta instanceof deltaJs.Delta.Composite) {
	//			return facade;
	//		}
	//		return this;
	//	},
	//	getFacadeByPath(path) {
	//		if (path && path.prop) {
	//			if (!this.children[path.prop]) {
	//				this.children[path.prop] = new deltaJs.Facade({ parent: this });
	//			}
	//			return this.children[path.prop].getFacadeByPath(path.rest);
	//		} else {
	//			return this;
	//		}
	//	}
	//};
	//
	//
	//function newFacade(options) { // TODO: lots of stuff
	//	var { delta, parent, facadeArgs } = options;
	//	// The facade object exposes operations methods directly, but arguments to
	//	// those operations can partly be given through function-call notation.
	//	// Therefore, a facade is a function, storing arguments that are already given.
	//	var result = (...args) => newFacade(U.extend({}, options, { facadeArgs: result.facadeArgs.concat(args) }));
	//	U.extend(result, facadeMethods, operationMethods, options, {
	//		_applyOperationMethod(method, ...finalArgs) {
	//			return result.addOperator(thisDelta, [{method}].concat(result._args).concat(finalArgs));
	//		},
	//		children: {},
	//		delta, parent, facadeArgs
	//	});
	//	return result;
	//}
	//
	//
	///* react to any new operation types */ // TODO: lots of stuff
	//var operationMethods = {};
	//deltaJs.onNewOperationType((cls) => {
	//	if (cls === deltaJs.Delta.Composite) { return }
	//	(cls.options.methods || []).forEach((method) => {
	//		if (U.isUndefined(operationMethods[method])) {
	//			operationMethods[method] = function (...args) {
	//				if (this._facadeDisabled) { throw new MultipleActiveFacadesError(this) }
	//				var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	//				if (newDelta instanceof deltaJs.Delta.Composite) {
	//					var activeSubFacade = this._activeSubFacade;
	//					while (activeSubFacade) {
	//						activeSubFacade._facadeDisabled = true;
	//						activeSubFacade = activeSubFacade._activeSubFacade;
	//					}
	//					return this._activeSubFacade = newDelta.do();
	//				} else {
	//					return this;
	//				}
	//			};
	//		}
	//	});
	//});
	//
	//
	///** {@class}
	// *
	// */
	//deltaJs.Delta.Composite = U.newSubclass(deltaJs.Delta, { // TODO: what 'operation' should do
	//	/** {@public}{@abstract}{@method}
	//	 * Implement this method in subclasses to prepare a specific delta operation with this delta as the base.
	//	 * @return {DeltaJs#Delta} - the delta resulting from the operation
	//	 */
	//	operation() {
	//		throw new Error(`A Delta.Composite subclass (in this case: ${this.type}) needs to implement the 'operation' method.`);
	//	}
	//});


};
