/* import internal stuff */
import U               from '../misc.js';
import Path            from '../Path.js';
import {wt}            from '../Target.js';
import defineComposite from './Composite.js';


export default (deltaJs) => {
	if (U.isDefined(deltaJs.Delta.Modify)) { return }

	defineComposite(deltaJs);

	class Modify extends deltaJs.Delta.Composite {
		constructor(...args) { super(...args); this.deltas = {}; }

		/** {@public}{@abstract}{@method}{@nosideeffects}
		 * @return {DeltaJs#Delta.Modify} - a clone of this delta
		 */
		clone() {
			var result = super.clone();
			Object.keys(this.deltas).forEach((prop) => {
				result.deltas[prop] = this.deltas[prop].clone();
			});
			return result;
		}

		/** {@public}{@method}
		 * @param target {*}
		 */
		precondition(target) { return target.value instanceof Object }

		/** {@public}{@method}
		 * @param target  {Delta.WritableTarget} - the target to which to apply this delta
		 * @param options {object?}              - the (optional) options for this delta application
		 */
		applyTo(target, options = {}) {
			Object.keys(this.deltas).forEach((prop) => {
				if (!options.restrictToProperty || options.restrictToProperty === prop) {
					this.deltas[prop].applyTo(wt(target.value, prop),
						U.extend({}, options, { restrictToProperty: null }));
				}
			});
		}

		/** {@public}{@method}
		 * @param options {object?}
		 * @return {string}
		 */
		toString(options = {}) {
			var str = super.toString(options);
			if (Object.keys(this.deltas).length > 0) {
				var deltas = Object
					.keys(this.deltas)
					.map((p) => this.deltas[p].toString(U.extend({}, options, { targetProp: p })))
					.join('\n');
				str += '\n' + U.indent(deltas, 4);
			}
			return str;
		}

		/** {@public}{@method}
		 * Prepare a specific delta operation with this Modify delta as the base.
		 * @param options {object} - any options; there may be any number of these before the `path` argument
		 * @param path {string}    - the relative path to which to apply this operation
		 * @param args {[*]}       - the arguments to the operation
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation(options, path, ...args) { // TODO: replace this through the new Facade refactoring
			var argss = [...arguments];
			var allOptions = {};
			while (typeof argss[0] === 'object') {
				U.extend(allOptions, argss.shift());
			}
			path = argss.shift();
			var delta = deltaJs._newDeltaByMethod(allOptions, ...argss);
			return this._addOperation(allOptions, new Path(path), delta);
		}

		/** {@public}{@method}
		 * Get the deepest existing Modify delta corresponding to a relative path.
		 * @param path {Path} - a path relative to this delta
		 * @return {{ delta: DeltaJs#Delta.Modify, rest: Path }} - the deepest Modify delta corresponding to the path,
		 *                                                         and the unused rest of the path
		 */
		deepestModifyDeltaByPath(path) {
			if (U.isUndefined(path.prop) || this.deltas[path.prop].type !== 'Modify') {
				return { delta: this, rest: path };
			}
			return this.deltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
		}

		/** {@private}{@method}
		 * @param options {object}
		 * @param path    {string}
		 * @param delta   {DeltaJs#Delta}
		 */
		_addOperation(options, path, delta) {
			/* if there is a 'rest' to the path, set a link in the chain */
			if (path.rest) {
				return this.operation({ method: 'modify' }, path.prop)
				           ._addOperation(options, path.rest, delta);
			}

			/* store the new delta, possibly composed with an existing one */
			this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;

			/* return the composed delta if it has an operations interface; otherwise, return the given delta */
			return (this.deltas[path.prop] instanceof deltaJs.Delta.Composite) ? this.deltas[path.prop] : delta;
		}
	}
	deltaJs.newOperationType('Modify', Modify);

};
