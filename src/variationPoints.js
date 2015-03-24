/* import internal stuff */
import {extend, oncePer} from './util.js';
import define_DeltaModel from './DeltaModel.js';


export default oncePer('variation points', (deltaJs) => {


	oncePer(deltaJs.constructor, 'variation points', () => {

		define_DeltaModel(deltaJs);

		extend(deltaJs.constructor.prototype, {

			/** {@public}{@method}
			 * This method indicates a variation point.
			 * @param name {string} - a hook by which operations from the core delta model can be applied
			 * @param val  {*}      - the initial value of this variation point
			 * @return {*} - the value of this variation point after applying the appropriate deltas
			 */
			vp(name, val) {
				var root = { [name]: val };
				this._deltaModelProxy.delta().applyTo(root, {
					restrictToProperty: name
				});
				return root[name];
			},

			/** {@public}{@method}
			 * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
			 * to any variation points that are encountered. This method is an alias to the eponymous
			 * method on that 'root' delta model. It returns the proxy that allows new delta operations
			 * to be added more easily. It presets the 'feature' option to 'true', but this can be
			 * overwritten manually.
			 * @return {DeltaJs#Proxy} - the proxy to this delta, for easily adding operations
			 */
			do(...args) {
				return this._deltaModelProxy.do({ feature: true }, ...args);
			}

		});

	});


	deltaJs._deltaModelProxy = new deltaJs.Delta.DeltaModel().do();


});
