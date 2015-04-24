/* import internal stuff */
import {extend, isUndefined, oncePer} from './util.es6.js';


export default oncePer('application conditions', (deltaJs) => {


	oncePer(deltaJs.constructor, 'application conditions', () => {
		//noinspection JSCommentMatchesSignature
		Object.assign(deltaJs.constructor.prototype, /** @lends DeltaJs.prototype */ {

			/**
			 *
			 * @param ...features {Array.<string>}
			 */
			select(...features) {
				for (let feature of features) {
					if (Array.isArray(feature)) {
						this.select(...feature);
					} else {
						this.features[feature].select();
					}
				}
			}

		});
	});


	extend(deltaJs.Delta.prototype, /** @lends DeltaJs#Delta.prototype */ {

		/**
		 *
		 * @property applicationCondition
		 * @type {DeltaJs#Feature}
		 */
		get applicationCondition() { return this._applicationCondition },
		set applicationCondition(ac) { this._applicationCondition = ac },

		/**
		 *
		 * @property selected
		 * @type {boolean}
		 * @readonly
		 */
		get selected() { return isUndefined(this.applicationCondition) || this.applicationCondition.selected }

	});


});
