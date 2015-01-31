/* import internal stuff */
import U               from '../misc.js';
import Path            from '../Path.js';
import {wt}            from '../Target.js';
import defineComposite from './Composite.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Modify)) { return }

	defineComposite(deltaJs);

	deltaJs.newOperationType(deltaJs.Delta.Composite, 'Modify', {
		construct() { this.deltas = {} },

		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {DeltaJs#Delta.Modify} - a clone of this delta
		 */
		clone() {
			var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
			Object.keys(this.deltas).forEach((prop) => {
				result.deltas[prop] = this.deltas[prop].clone();
			});
			return result;
		},

		/** {@public}{@method}
		 * @param target {*}
		 */
		precondition(target) { return target.value instanceof Object },

		/** {@public}{@method}
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			Object.keys(this.deltas).forEach((prop) => {
				//if (!options.restrictToProperty || options.restrictToProperty === prop) {
				//	this.deltas[prop].applyTo(wt(target.value, prop),
				//			U.extend({}, options, { restrictToProperty: null }));
				//}
				this.deltas[prop].applyTo(wt(target.value, prop), options);
			});
		},

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options) {
			var str = deltaJs.Delta.prototype.toString.call(this, options);
			if (Object.keys(this.deltas).length > 0) {
				var deltas = Object.keys(this.deltas).map((p) => this.deltas[p].toString(options)).join('\n');
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		},

		/** {@public}{@method}
		 * Prepare a specific delta operation with this Modify delta as the base.
		 * @param method {string}   - the type of operation (e.g., 'add', 'remove', etc.)
		 * @param options {object?} - the (optional) options for this operation
		 * @param path {string}     - the relative path to which to apply this operation
		 * @param arg {*}           - the argument to the operation
		 * @return {DeltaJs#Delta}  - the delta resulting from the operation
		 */
		operation(method, options, path, arg) {
			if (typeof options === 'string') { [options, path, arg] = [{}, options, path] }
			var delta = deltaJs._getDeltaByMethod(method, arg);
			return this._addOperation(options, new Path(path), delta);
		},

		/** {@private}{@method}
		 * @param options {object}
		 * @param path    {string}
		 * @param delta   {DeltaJs#Delta}
		 */
		_addOperation(options, path, delta) {
			/* if there is a 'rest' to the path, set a link in the chain */
			if (path.rest) {
				return this.operation('modify', path.prop)
						._addOperation(options, path.rest, delta);
			}

			/* store the new delta, possibly composed with an existing one */
			this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
			this.deltas[path.prop].options.targetProp = path.prop;

			/* return the composed delta if it has an operations interface; otherwise, return the given delta */
			return (this.deltas[path.prop] instanceof deltaJs.Delta.Composite) ? this.deltas[path.prop] : delta;
		}
	});

};
