/* import internal stuff */
import {extend, isUndefined, oncePer} from './util.js';


export default oncePer('application conditions', (deltaJs) => {


	oncePer(deltaJs.constructor, 'application conditions', () => {

		extend(deltaJs.constructor.prototype, {
			select(...features) {
				features.forEach((feature) => {
					if (Array.isArray(feature)) {
						this.select(...feature);
					} else {
						this.features[feature].select();
					}
				});
			}
		});

	});


	extend(deltaJs.Delta.prototype, {
		get applicationCondition() { return this._applicationCondition },
		set applicationCondition(ac) { this._applicationCondition = ac },
		get selected() { return isUndefined(this.applicationCondition) || this.applicationCondition.selected }
	});


});
