/* import internal stuff */
import {extend, a, assert, isUndefined, oncePer} from './util.es6.js';
import {ConstraintFailure}                       from './Error.es6.js';


export default oncePer('features', (deltaJs) => {


	oncePer(deltaJs.constructor, 'features', () => {

		extend(deltaJs.constructor.prototype, {
			/** {@public}{@method}
			 * @param name    {string}  - the name of the new feature
			 * @param options {object?} - the (optional) options for the new feature
			 * @return {DeltaJs#Feature} - the object representing the new feature
			 */
			newFeature(name, options = {}) {
				/* sanity check*/
				assert(isUndefined(this.features[name]),
					`A feature with the name '${name}' already exists.`);

				/* create the new feature */
				return this.features[name] = new this.Feature(name, options);
			}
		});

	});


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
			a(_if, feature).push(_normalizeClause(disjunct));
		}
	}
	function _addSelects(feature, otherFeatures) {
		for (let other of _normalizeClause(otherFeatures)) {
			_addIf(other, feature);
		}
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
			a(_onlyIf, feature).push(_normalizeClause(conjunct));
		}
	}
	function _addRequiredBy(feature, otherFeatures) {
		for (let other of _normalizeClause(otherFeatures)) {
			_addOnlyIf(other, feature);
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
			for (let featureName of Object.keys(deltaJs.features)) {
				if (!_selected[featureName]) {
					/* if there are 'if' disjuncts that are selected, this feature is selected */
					if (isUndefined(_selected[featureName])) { _selected[featureName] = false }
					if ((_if[featureName] || []).some(disj => disj.every(conj => _selected[conj]))) {
						_selected[featureName] = true;
						somethingChanged = true;
					}
				}
			}
		} while (somethingChanged);

		/* computation of allowed features */
		for (let featureName of Object.keys(deltaJs.features)) {
			/* if there are 'onlyIf' conjuncts that are excluded, this feature is excluded */
			_allowed[featureName] = (_onlyIf[featureName] || []).every(conj => conj.some(disj => _selected[disj]));
		}
	}


	/** {@public}{@class DeltaJs#Feature}
	 *
	 */
	deltaJs.Feature = class Feature {
		constructor(name, options = {}) {
			/* set basic fields */
			this.name = name;
			this.options = options;

			/* update conditions */
			for (let option of Object.keys(options)) {
				this.addOption(option, options[option]);
			}
		}
		get selected() {
			_settleConditions();
			if (_selected[this.name] && !_allowed[this.name]) {
				throw new ConstraintFailure(this);
			}
			return _selected[this.name];
		}
		get condition()   { return _if[this.name]                   }
		get conditional() { return a(_if,     this.name).length > 0 }
		get restricted()  { return a(_onlyIf, this.name).length > 0 }
		select() { this.if(true) }
	};


	/* restrictions and connections */
	const FEATURE_CONNECTIONS = [
		[ 'if',         [_addIf]             ], // this selected by other
		[ 'onlyIf',     [_addOnlyIf]         ], // error if this but not other
		[ 'selects',    [_addSelects]        ], // other selected by this
		[ 'requiredBy', [_addRequiredBy]     ], // error if other but not this
		[ 'iff',        [_addIf, _addOnlyIf] ]  // if and onlyIf
	];
	deltaJs.Feature.prototype.addOption = function (optionName, value) {
		for (let [connectionName, methods] of FEATURE_CONNECTIONS) {
			if (optionName === connectionName) {
				for (let method of methods) { method(this.name, value) }
			}
		}
	};
	for (let [name] of FEATURE_CONNECTIONS) {
		deltaJs.Feature.prototype[name] = function (value) {
			this.addOption(name, value);
		};
	}


	/* the features belonging to this DeltaJs instance */
	deltaJs.features = {}; // name -> Feature


});
