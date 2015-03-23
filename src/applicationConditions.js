/* import internal stuff */
import U from './misc.js';


export default (deltaJs) => {
	U.oncePer(deltaJs, 'application conditions', () => {

		U.extend(deltaJs.Delta.prototype, {

			get applicationCondition() { return this._applicationCondition },
			set applicationCondition(ac) { this._applicationCondition = ac },

			get selected() {
				return U.isUndefined(this.applicationCondition) || this.applicationCondition.selected;
			}

		});

	});
	U.oncePer(deltaJs.constructor, 'application conditions', () => {

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

	});
};
