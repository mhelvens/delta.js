/* import internal stuff */
import {indent, oncePer, arraysEqual, t} from './util.es6.js';
import define_OperationTypes             from './operationTypes.es6.js';


export default oncePer('Composed', (deltaJs) => {


	define_OperationTypes(deltaJs);

	// NOTE: Not importing the circular dependency deltaJs.Delta here.
	//       That file will import this one at the proper time.


	deltaJs.newOperationType('Composed', class Composed extends deltaJs.Delta {

		constructor(...args) {
			super(...args);
			this._components = this.arg || [];
			this.options = args[1] || {};
		}

		clone() {
			var result = super.clone();
			result._components = this._components.map((delta) => delta.clone());
			return result;
		}

		applyTo(target, options = {}) {
			for (let delta of this._components) {
				delta.applyTo(target, options);
			}
		}

		/**
		 * @public
		 * @method
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (this._components.length > 0) {
				var deltas = '';
				for (let delta of this._components) {
					deltas += `• ${delta.toString(options)}\n`;
				}
				str += '\n' + indent(deltas, 4);
			}
			return str;
		}

		precondition(target, options) {
			if (this._components.length === 0) { return true }
			return this._components[0].precondition(target, options);
		}

		_collapse() {
			/* flatten Composed that are inside Composed */
			this._components = (() => {
				let newComponents = [];
				for (let delta of this._components) {
					if (delta instanceof deltaJs.Delta.Composed) {
						delta._collapse();
						newComponents.push(...delta._components);
					} else {
						newComponents.push(delta);
					}
				}
				return newComponents;
			})();

			/* compose neighbouring pairs where possible */
			let changed;
			do {
				changed = false;
				this._components = (() => {
					let newComponents = [];
					for (var i = 0; i < this._components.length - 1; i += 1) {
						let composedPair = this._components[i].composedWith(this._components[i+1], this.options);
						if (composedPair instanceof deltaJs.Delta.Composed) {
							newComponents.push(this._components[i]);
						} else {
							newComponents.push(composedPair);
							changed = true;
							i += 1;
						}
					}
					if (i === this._components.length - 1) {
						newComponents.push(this._components[i]);
					}
					return newComponents;
				})();
			} while (changed);
		}

		get methods() { return [] }

	});


	/* composition */
	deltaJs.newComposition((d1, d2) => (
		d1 instanceof deltaJs.Delta.Composed ||
		d2 instanceof deltaJs.Delta.Composed
	), (d1, d2, opt) => {
		var D1 = d1 instanceof deltaJs.Delta.Composed ? d1._components : [d1];
		var D2 = d2 instanceof deltaJs.Delta.Composed ? d2._components : [d2];
		var result = new deltaJs.Delta.Composed([...D1, ...D2], opt);
		result._collapse();
		return result;
	});


	/* equality */
	deltaJs.newEquality( t('Composed', 'Composed'), (d1, d2) =>
			arraysEqual(d1._components, d2._components, (x, y) => x.equals(y)) );


});
