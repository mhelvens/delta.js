/* import internal stuff */
import {extend, oncePer} from './util.es6.js';
import define_Delta      from './Delta_class.es6.js';


export default oncePer('Proxy', (deltaJs) => {


	define_Delta(deltaJs);


	deltaJs.Proxy = class Proxy {
		constructor({parent, delta} = {}) {
			this._parent = parent;
			this._active = true;
			this._delta = delta;
		}
		delta() { return this._delta; }
		get active() { return this._active }
		deactivate() { this._active = false }
	};


	extend(deltaJs.Delta.prototype, {

		/** {@public}{@method}
		 * @param args {*[]}
		 * @return {DeltaJs#Proxy}
		 */
		do(...args) {
			var ProxyClass = this.constructor.Proxy;
			if (!ProxyClass) {
				throw new Error(`Calling 'do' on delta type '${this.type}', which has no Proxy interface.`);
			}
			return new ProxyClass({ delta: this }).do(...args);
		}

	});


});
