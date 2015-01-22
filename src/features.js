/* import internal stuff */
import U from './misc.js';


export default (deltaJs) => {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (deltaJs._featuresImplemented) { return }
	deltaJs._featuresImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* code for the interaction between features and their auto-select conditions */
	var _conditions = {}; // feature -> (arrays of arrays; disjunctive normal form)
	var _settledConditions = {}; // feature -> Boolean
	var _conditionsUnsettled = false;
	function _registerDisjunct(feature, disjunct) {
		_conditionsUnsettled = true;
		if (disjunct === true) {
			_settledConditions[feature] = true;
		} else if (disjunct === false) {
			// change nothing
		} else if (_conditions[feature] !== true) {
			if (U.isUndefined(_conditions[feature])) { _conditions[feature] = [] }
			_conditions[feature].push(disjunct);
		}
	}
	function _settleConditions() {
		if (_conditionsUnsettled) {
			_conditionsUnsettled = false;
			var somethingChanged;
			do {
				somethingChanged = false;
				Object.keys(deltaJs.features).forEach((featureName) => {
					if (_settledConditions[featureName]) { return }
					if (U.isUndefined(_conditions[featureName])) { return }
					if (_conditions[featureName].some((disjunct) => disjunct.every((conjunct) => _settledConditions[conjunct]))) {
						_settledConditions[featureName] = true;
						somethingChanged = true;
					}
				});
			} while (somethingChanged);
		}
	}

	/** {@public}{@class DeltaJs#Feature}
	 *
	 */
	deltaJs.Feature = U.newClass(function Feature(name, options = {}) {

		/* set basic fields */
		this.name = name;
		this.options = options;

		/* update conditions */
		_registerDisjunct(name, this.if);
		this.selects.forEach((other) => {
			_registerDisjunct(other, [name]);
		});

	}, {
		select() { _registerDisjunct(this.name, true) },
		get selected() {
			_settleConditions();
			return _settledConditions[this.name];
		},
		get if() {
			/* fix strange behavior in PhantomJS */
			if (!this.options) { return }

			/* return the result */
			if (this.options['if'] === true || this.options['if'] === false) { // literal 'true' or 'false'
				return this.options['if'];
			} else if (this.options['if'] || this.options['iff']) { // array of names
				return [].concat(
					this.options['if']  || [],
					this.options['iff'] || []
				);
			} else { // default: false
				return false;
			}
		},
		get onlyIf() {
			/* fix strange behavior in PhantomJS */
			if (!this.options) { return }

			/* return the result */
			if (this.options['onlyIf'] === true || this.options['onlyIf'] === false) { // literal 'true' or 'false'
				return this.options['onlyIf'];
			} else if (this.options['onlyIf'] || this.options['iff'] || this.options['expects']) { // array of names
				return [].concat(
					this.options['onlyIf']  || [],
					this.options['iff']     || [],
					this.options['expects'] || []
				);
			} else { // default: true
				return true;
			}
		},
		get selects() {
			/* fix strange behavior in PhantomJS */
			if (!this.options) { return }

			/* return the result */
			return this.options['selects'] || [];
		},
	});


	/* the features belonging to this DeltaJs instance */
	deltaJs.features = {}; // name -> Feature


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (U.isDefined(deltaJs.constructor._featuresImplemented)) { return }
	deltaJs.constructor._featuresImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	U.extend(deltaJs.constructor.prototype, {
		///** {@public}{@method}
		// *
		// */
		//vp(name, val) {
		//	// TODO
		//},

		/** {@public}{@method}
		 * @param name    {string} - the name of the new feature
		 * @param options {Object} - the options for the new feature
		 * @return {DeltaJs#Feature} - the object representing the new feature
		 */
		newFeature(name, options = {}) {
			/* sanity check*/
			U.assert(U.isUndefined(this.features[name]),
				`A feature with the name '${name}' already exists.`);

			/* create the new feature */
			return this.features[name] = new this.Feature(name, options);
		},

	});

};
