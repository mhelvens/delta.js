/* import internal stuff */
import U from './misc.js';


export default (deltaJs) => {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (deltaJs._applicationConditionsImplemented) { return }
	deltaJs._applicationConditionsImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	U.extend(deltaJs.Delta.prototype, {

		get applicationCondition() { return this._applicationCondition },
		set applicationCondition(ac) { this._applicationCondition = ac },

		get selected() {
			return U.isUndefined(this.applicationCondition) || this.applicationCondition.selected;
		}

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (U.isDefined(deltaJs.constructor._applicationConditionsImplemented)) { return }
	deltaJs.constructor._applicationConditionsImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	U.extend(deltaJs.constructor.prototype, {

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


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
