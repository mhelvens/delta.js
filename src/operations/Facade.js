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
	// DONE: 'one Facade active at a time' (cannot use earlier ones after new ones have been used)
	// TODO: Basic application of deltas
	// TODO: Composition in order to generate error messages
	// TODO: Error messages based on syntactic conflicts in delta models


	class Facade {

		// A Facade instance exposes operation methods directly. Arguments
		// to those operations can be pre-supplied through the `do` method.


		constructor({parent} = {}) {
			this._parent   = parent;
			this._doArgs   = [];
			this._original = this;
			this._active   = true;
		}


		do(...doArgs) {
			/* return a version of this Facade with extra preloaded args */
			// note that this mixes prototypical inheritance
			// into the existing classical inheritance scheme
			var result = Object.create(this);
			result._doArgs   = [...this._doArgs, ...doArgs];
			result._original = this._original;
			return result;
		}


		_do(method, doArgs) {
			/* gather all arguments */
			var allDoArgs = [...this._doArgs, ...doArgs];

			/* container-specific processing of arguments */
			// this gathers all options objects together, and recognizes
			// whether an operation type has yet been passed
			var argResponse = this.processFacadeArguments(...allDoArgs);

			/* the argument list is finished; create a new delta and put it in the right place */
			var delta = Facade._newDeltaByMethod(method, argResponse.rest); // TODO: is this still good?
			this.addOperation(new Path(argResponse.path), delta, argResponse.options);

			/* return the right Facade instance */
			if (U.isDefined(delta.constructor.Facade)) {
				// TODO
			} else {
				return this; // return this facade, preserving preloaded options
			}


		}


		//noinspection JSCommentMatchesSignature
		/** {@public}{@abstract}{@method}
		 * @param args {[*]}
		 * @return {{options: Object, path: String, args: [*]}}
		 */
		processFacadeArguments() {
			throw new Error(`A Delta.Container subclass (in this case: ${this.type}) ` +
			                `needs to implement the static 'processFacadeArguments' method.`);
		}


		static _newDeltaByMethod(method, args) {
			var newDeltas = Facade._methodHandlers[method].map(handler => handler(...args));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				return new deltaJs.Delta.Overloaded(newDeltas);
			}
		}

		// TODO: (abstract?) applyTo method

	}
	deltaJs.Facade = Facade;


	/* automatically populate the Facade class with new operation methods */
	deltaJs.onNewFacadeMethod((method) => {
		if (U.isUndefined(Facade.prototype[method])) {
			throw new Error(`The method name '${method}' is already in use.`); // TODO: specific error class?
		}
		Facade.prototype[method] = function (...args) {
			this._do(method, args);
		};
	});


	/* register handlers for each method */
	Facade._methodHandlers = {}; // method -> [handlers]
	deltaJs.onNewFacadeMethod((method, handler) => {
		U.a(Facade._methodHandlers, method).push(handler);
	});



	/* a Facade class for non-container operation types */
	class Basic extends Facade {
		constructor(options = {}) {
			super(options);
			this.delta = options.delta;
			this._args = options.args;
		}
	}
	Facade.Basic = Basic;


	/* all container-type facades (Modify, DeltaModel) hold references to FacadeProxy's */
	class Proxy {

		// This class accumulates a sequence of Facade instances,
		// where only the last one in the list is active.
		// The end-user should not get a reference to a FacadeProxy,
		// but should only hold references to its stored facades.

		constructor({parent} = {}) {
			this._parent  = parent;
			this._facades = [];
		}

		_activeFacade() { return this._facades[this._facades.length-1] }

		_childFacade(FacadeClass) {
			/* can we reuse the currently active Facade? if not, deactivate it */
			var current = this._activeFacade();
			if (current.constructor === FacadeClass && FacadeClass === deltaJs.Modify.Facade) { return current }
			current._active = false;

			/* create a new Facade of the right class, remember it and return it */
			var next = new FacadeClass({ parent: this._parent }); // direct link to non-proxy parent
			this._facades.push(next);
			return next;
		}

		// TODO: applyTo method

	}
	Facade.Proxy = Proxy;







};






















