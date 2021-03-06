/* import internal stuff */
import {extend, a, isUndefined, oncePer} from './util.es6.js';
import Path                              from './Path.es6.js';
import define_Overloaded                 from './Overloaded.es6.js';
import define_Proxy                      from './Proxy.es6.js';
import {MultipleActiveProxiesError}      from './Error.es6.js';


export default oncePer('ContainerProxy', (deltaJs) => {


	define_Proxy(deltaJs);


	oncePer(deltaJs.constructor, 'ContainerProxy', (DeltaJs) => {
		extend(DeltaJs.prototype, /** @lends DeltaJs.prototype */ {
			/**
			 * @param method  {string}   - method name
			 * @param handler {function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
			 */
			newProxyMethod(method, handler) {
				this.ContainerProxy.newProxyMethod(method, handler);
			}
		});
	});


	/* a Proxy class for container operation types like Modify and DeltaModel */
	deltaJs.ContainerProxy = class ContainerProxy extends deltaJs.Proxy {

		// A Proxy instance exposes operation methods directly. Arguments
		// to those operations can be pre-supplied through the `do` method.

		constructor(options = {}) {
			super(options);
			this._doArgs   = [];
			this._original = this;
			this._children = new Map(); // key -> [proxies]
		}


		deactivate() {
			for (let key of this._children.keys()) {
				this.childProxy(key).deactivate();
			}
			super.deactivate();
		}


		addChildProxy(key, delta) {
			/* get the current proxy for the given key */
			var current = this.childProxy(key);

			/* get / create delta proxy */
			var ProxyClass = delta.constructor.Proxy || deltaJs.Proxy;
			var proxy = new ProxyClass({ delta, parent: this });

			/* return the current proxy if it, and the current proxy, are both Modify.Proxy */
			if (current instanceof deltaJs.Delta.Modify.Proxy &&
				proxy   instanceof deltaJs.Delta.Modify.Proxy) { return current }

			/* we need a new proxy, so deactivate the current one */
			if (current) { current.deactivate() }

			/* create a new Proxy of the right class, remember it and return it */
			this._children.get(key).push(proxy);
			return proxy;
		}


		childKeys() { return [...this._children.keys()] } // TODO: Is an iterable a good return value?


		childProxies(key) { return a(this._children, key) }


		childProxy(key) {
			if (!this._children.has(key)) { this._children.set(key, []) }
			return this._children.get(key)[this._children.get(key).length-1];
		}


		childDelta(key) {
			let result = deltaJs.Delta.composed(
				...this.childProxies(key).map(proxy => proxy.delta())
			);
			return result;
		}


		do(...doArgs) {
			/* is this proxy active? */
			if (!this.active) { throw new MultipleActiveProxiesError() }

			/* return a version of this Proxy with extra preloaded args */
			// note that this mixes prototypical inheritance
			// into the existing classical inheritance scheme
			var result = Object.create(this);
			result._doArgs   = [...this._doArgs, ...doArgs];
			result._original = this._original;
			return result;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		_do(method, doArgs) {
			/* is this proxy active? */
			if (!this.active) { throw new MultipleActiveProxiesError() }

			/* container-specific processing of arguments */
			var {options, args} = this.processProxyArguments(...this._doArgs, ...doArgs);

			/* if the options contain a path, reify it */
			if (typeof options.path === 'string') {
				options.path = new Path(options.path);
			}

			/* the argument list is finished; create a new delta and put it in the right place */
			var delta = deltaJs.ContainerProxy._newDeltaByMethod(method, args);
			var proxy = this.addOperation(delta, options);

			/* return the right Proxy instance for chaining */
			return (proxy instanceof deltaJs.ContainerProxy) ? proxy : this;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		//noinspection JSCommentMatchesSignature
		/**
		 * Subclasses of `ContainerProxy` should implement this method to extract an
		 * options object, path and final argument list from a given 'raw' argument list.
		 * @abstract
		 * @protected
		 */
		processProxyArguments() {
			throw new Error(`A 'ContainerProxy' subclass needs to implement the 'processProxyArguments' method.`);
		}


		//noinspection JSCommentMatchesSignature
		/** {@public}{@abstract}{@method}
		 * Subclasses of `ContainerProxy` should implement this method to add a given delta
		 * under a given path with the given options, and return its corresponding Proxy.
		 * @abstract
		 * @protected
		 */
		addOperation() {
			throw new Error(`A 'ContainerProxy' subclass needs to implement the 'addOperation' method.`);
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		/**
		 * Create a delta based on a method-name and argument-list.
		 * If the method-name is overloaded, you'll automatically get
		 * an `Delta.Overloaded` instance.
		 *
		 * @param method {string}
		 * @param [args] {*}
		 * @return {DeltaJs#Delta}
		 */
		static _newDeltaByMethod(method, args) {
			var newDeltas = deltaJs.ContainerProxy._methodHandlers[method].map(handler => handler(...args));
			if (newDeltas.length === 1) {
				return newDeltas[0];
			} else { // newDeltas.length > 1
				define_Overloaded(deltaJs);
				return new deltaJs.Delta.Overloaded(newDeltas);
			}
		}


		/**
		 * @static
		 * @param method  {string}   - method name
		 * @param handler {function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
		 */
		static newProxyMethod(method, handler) {

			/* automatically populate the Proxy class with new operation method */
			if (isUndefined(deltaJs.ContainerProxy.prototype[method])) {
				deltaJs.ContainerProxy.prototype[method] = function (...args) {
					return this._do(method, args);
				};
			}

			/* register handlers for each method */
			a(deltaJs.ContainerProxy, '_methodHandlers', method).push(handler);

		}

	};


});
