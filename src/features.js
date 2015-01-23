/* import internal stuff */
import U from './misc.js';
import {ConstraintFailure} from './Error.js';

export default (deltaJs) => {
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (deltaJs._featuresImplemented) { return }
	deltaJs._featuresImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/* given a 'user input' clause, normalize it */
	function _normalizeClause(input) {
		input = Array.isArray(input) ? input : [input];
		input = input.map(conj => conj instanceof deltaJs.Feature ? conj.name : conj);
		return input;
	}

	/* code for the mutual selection of features */
	var _if = {}; // feature -> (arrays of arrays; disjunctive normal form)
	var _selected = {}; // feature -> Boolean
	function _addIf(feature, disjunct = []) {
		_conditionsUnsettled = true;
		if (disjunct === true) {
			_selected[feature] = true;
		} else if (disjunct === false) {
			// change nothing
		} else if (_if[feature] !== true) {
			U.a(_if, feature).push(_normalizeClause(disjunct));
		}
	}
	function _addSelects(feature, otherFeatures) {
		_normalizeClause(otherFeatures).forEach((other) => {
			_addIf(other, feature);
		});
	}

	/* code for constraints between features (enforced by errors) */
	var _onlyIf = {}; // feature -> (arrays of arrays; conjunctive normal form)
	var _allowed = {}; // feature -> Boolean
	function _addOnlyIf(feature, conjunct = []) {
		_conditionsUnsettled = true;
		if (conjunct === false) {
			_allowed[feature] = false;
		} else if (conjunct === true) {
			// change nothing
		} else if (_onlyIf[feature] !== false) {
			U.a(_onlyIf, feature).push(_normalizeClause(conjunct));
		}
	}

	/* code for settling relations between features */
	var _conditionsUnsettled = false;
	function _settleConditions() {
		if (!_conditionsUnsettled) { return }
		_conditionsUnsettled = false;

		/* fixed point computation of selected features (i.e., propagate them until there is no change) */
		var somethingChanged;
		do {
			somethingChanged = false;
			Object.keys(deltaJs.features).forEach((featureName) => {
				if (!_selected[featureName]) {
					/* if there are 'if' disjuncts that are selected, this feature is selected */
					if (U.isUndefined(_selected[featureName])) { _selected[featureName] = false }
					if ((_if[featureName] || []).some(disj => disj.every(conj => _selected[conj]))) {
						_selected[featureName] = true;
						somethingChanged = true;
					}
				}
			});
		} while (somethingChanged);

		/* computation of allowed features */
		Object.keys(deltaJs.features).forEach((featureName) => {
			/* if there are 'onlyIf' conjuncts that are excluded, this feature is excluded */
			_allowed[featureName] = (_onlyIf[featureName] || []).every(conj => conj.some(disj => _selected[disj]));
		});
	}

	/** {@public}{@class DeltaJs#Feature}
	 *
	 */
	deltaJs.Feature = U.newClass(function Feature(name, options = {}) {

		/* set basic fields */
		this.name = name;
		this.options = options;

		/* update conditions */
		Object.keys(this.options).forEach((option) => {
			_addIf(option, options[option]);
		});

	}, {
		get selected() {
			_settleConditions();
			if (_selected[this.name] && !_allowed[this.name]) {
				throw new ConstraintFailure(this);
			}
			return _selected[this.name];
		},
		addOption(name, value) {
			switch (name) {
			case 'if':       { _addIf(this.name, value);                                    } break;
			case 'onlyIf':   { _addOnlyIf(this.name, value);                                } break;
			case 'iff':      { _addOnlyIf(this.name, value); _addIf(this.name, value);      } break;
			case 'selects':  { _addSelects(this.name, value);                               } break;
			case 'requires': { _addSelects(this.name, value); _addOnlyIf(this.name, value); } break;
			}
		},
		if      (disjunct) { this.addOption('if',       disjunct) },
		onlyIf  (conjunct) { this.addOption('onlyIf',   conjunct) },
		iff     (features) { this.addOption('iff',      features) },
		selects (features) { this.addOption('selects',  features) },
		requires(features) { this.addOption('requires', features) },
		select() { this.if(true) },
	});

	/* the features belonging to this DeltaJs instance */
	deltaJs.features = {}; // name -> Feature

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (U.isDefined(deltaJs.constructor._featuresImplemented)) { return }
	deltaJs.constructor._featuresImplemented = true;
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	U.extend(deltaJs.constructor.prototype, {
		/** {@public}{@method}
		 * @param name    {string}  - the name of the new feature
		 * @param options {object?} - the (optional) options for the new feature
		 * @return {DeltaJs#Feature} - the object representing the new feature
		 */
		newFeature(name, options = {}) {
			/* sanity check*/
			U.assert(U.isUndefined(this.features[name]),
				`A feature with the name '${name}' already exists.`);

			/* create the new feature */
			return this.features[name] = new this.Feature(name, options);
		}
	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};
