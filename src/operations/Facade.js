/* import external libraries */
import JsGraph from 'js-graph';
import {ApplicationOrderCycle} from './Error.js';


/* import internal stuff */
import U                            from '../misc.js';
import Path                         from '../Path.js';
import defineDelta                  from './Delta.js';
import defineOverloaded             from './Overloaded.js';
import {MultipleActiveFacadesError} from '../Error.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Facade)) { return }


	defineDelta     (deltaJs);
	defineOverloaded(deltaJs);


	// TODO: Bake in delta model functionality
	// TODO: 'one Facade active at a time' (cannot use earlier ones after new ones have been used)
	// TODO: Basic application of deltas
	// TODO: Composition in order to generate error messages
	// TODO: Error messages based on syntactic conflicts in delta models


	class Facade {

		// A Facade object exposes operation methods directly, but option-arguments
		// to those operations can be pre-supplied through the `do` method.
		//
		// (...options, operationMethod, ...options, path, ...operationArgs)
		//
		// When the operationMethod has been given, the argument list is
		// considered finished, and the operation is added.

		constructor(options = {}) {
			/* mandatory fields */
			this._options         = options;
			this._delta           = options.delta  || null;
			this._parent          = options.parent || null;
			this._children        = {};
			this._activeSubFacade = null;

			/* the fields for a Facade with a partial argument list */
			this._doOptions = options._doOptions || {};
			this._original  = options._original  || this;

			/* activate this Facade instance */
			this._active = true;
			if (this._parent) {
				if (this._parent._activeSubFacade) {
					this._parent._activeSubFacade._active = false;
				}
				this._parent._activeSubFacade = this._original;
			}
		}

		_assertThisFacadeIsActive() {
			if (!this._active) {
				throw new MultipleActiveFacadesError(this._original);
			}
		}

		addOperator(path, delta) {
			this._assertThisFacadeIsActive();
			var facade = this.getFacadeByPath(new Path(path));
			facade.delta = delta;

			// TODO: do we determine which facade to return to the user from this method, or from another method?
			//if (delta instanceof deltaJs.Delta.Composite) {
			//	return facade;
			//} else {
			//	return this;
			//}
		}

		getFacadeByPath(path) {
			if (path && path.prop) {
				if (!this.children[path.prop]) {
					// note: the following creates a new child Facade, and activates it
					this.children[path.prop] = new deltaJs.Facade({ parent: this });
				}
				return this.children[path.prop].getFacadeByPath(path.rest);
			} else {
				return this._original;
			}
		}

		do(...doArgs) {
			this._assertThisFacadeIsActive();

			var allDoArgs = [...this._doArgs, ...doArgs];

			try {

				var {method, options, path, args} = Facade._transformArgs(...allDoArgs);

				/* the argument list is finished; create a new delta and put it in the right place */
				var delta;
				// TODO

				/* return the right Facade instance */
				if (delta instanceof Composite) {
					// TODO (get the path from the args = the second argument that is a string)
				} else {
					return this; // return this facade, but preserve preloaded options
				}

			} catch (__) {

				/* return a object with this Facade instance as its prototype, carrying any preloaded args */
				// note that this mixes prototypical inheritance into the existing classical inheritance scheme
				var result = Object.create(this);
				result._doArgs   = allDoArgs;
				result._original = this._original;
				return result;

			}
		}

		static constructor() {
			/* initialize a list of delta creation functions */
			Facade._deltaCreationFunctions = {}; // method -> (args => Delta)

			/* automatically populate the Facade class with new operation methods */
			deltaJs.onNewFacadeMethod((method) => {
				if (U.isUndefined(Facade.prototype[method])) {
					throw new Error(`The method name '${method}' is already in use.`); // TODO: specific error class
				}
				Facade.prototype[method] = function (...args) {
					this.do(method, ...args);
				};
			});

			/* register handlers for each method */
			Facade._methodHandlers = {}; // method -> [handlers]
			deltaJs.onNewFacadeMethod((method, handler) => {
				U.a(Facade._methodHandlers, method).push(handler);
			});
		}

		static _transformArgs(...args) {
			var options = {};
			var method;
			var path;
			do {
				if (args.length === 0) { throw new Error(`Invalid argument list.`) }
				var arg = args.shift();
				if (typeof arg === 'string') {
					if (!method) { method = arg }
					else         { path   = arg }
				} else { U.extend(options, arg) }
			} while (!path);
			return { method, options, path, args };
		}

		static _newDeltaByMethod(method, args) {
			var newDeltas = Facade._methodHandlers[method].map(handler => handler(...args));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				return new deltaJs.Delta.Overloaded(newDeltas);
			}
		}

	}
	deltaJs.Facade = Facade;


	/** {@class}
	 *
	 */
	class Composite {}
	deltaJs.Delta.Composite = Composite;


};
