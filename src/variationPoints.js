/* import internal stuff */
import U from './misc.js';
import {rt} from './Target.js';
import defineDeltaModel from './operations/DeltaModel.js';

export default (deltaJs) => {

	defineDeltaModel(deltaJs);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (deltaJs._variationPointsImplemented) { return }
	deltaJs._variationPointsImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	deltaJs._deltaModel = new deltaJs.Delta.DeltaModel();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (U.isDefined(deltaJs.constructor._variationPointsImplemented)) { return }
	deltaJs.constructor._variationPointsImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	U.extend(deltaJs.constructor.prototype, {

		/** {@public}{@method}
		 * This method indicates a variation point.
		 * @param name {string} - a hook by which operations from the core delta model can be applied
		 * @param val  {*}      - the initial value of this variation point
		 * @return {*} - the value of this variation point after applying the appropriate deltas
		 */
		vp(name, val) {
			var root = { [name]: val };
			this._deltaModel.applyTo(rt(root), {
				restrictToProperty: name
			});
			return root[name];
		},

		/** {@public}{@method}
		 * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
		 * to any variation points that are encountered. This method is an alias to the eponymous
		 * method on that 'root' delta model. It adds a new operation to it.
		 * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
		 * @param name {string}      - the name of the delta inside the delta model
		 * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
		 * @param path {string}      - the relative path to perform this operation on
		 * @param args {[*]}         - the arguments to the operation
		 * @return {DeltaJs#Delta} - the delta resulting from the operation
		 */
		operation(options1, name, options2, path, args) {
			return this._deltaModel.operation(...arguments);
		},

		/** {@public}{@method}
		 * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
		 * to any variation points that are encountered. This method is an alias to the eponymous
		 * method on that 'root' delta model. It returns the facade that allows new delta operations
		 * to be added more easily. It presets the 'feature' option to 'true', but this can be
		 * overwritten manually.
		 * @return {function} - the facade to this delta, for easily adding operations
		 */
		do(...args) {
			// from the core delta model, deltas are features by default
			return this._deltaModel.do({ feature: true }, ...args);
		}

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
