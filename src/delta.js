define(['js-graph', './misc.js'], function (JsGraph, U) {
	'use strict';


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/* convenience definitions for the application and composition functions below */
	var keepFirst = () => {};
	var keepSecond = (d1, p, d2) => { d1.operations[p] = d2 };
	var applySecondToFirstValue = (d1, p, d2) => { d2.applyTo(d1.operations[p], 'value') };

	function assertFunction(val, opType) {
		U.assert(typeof val === 'function',
				`The operation '${opType}' expects the property it acts on to be a function.`);
	}

	function assertDefined(val, opType) {
		U.assert(U.isDefined(val),
				`The operation '${opType}' expects the property to be defined.`);
	}

	function assertUndefined(val, opType) {
		U.assert(U.isUndefined(val),
				`The operation '${opType}' expects the property to be undefined.`);
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	// the delta-model class, which is the container of all operation types,
	// all deltas, their ordering and rules
	var DeltaModel = U.newClass(function () {

		// Accumulated data for the available delta operation types
		var _opTypes = {}; // the name and delta classes
		var _composeFns = []; // the case distinctions of delta composition

		U.extend(this, {

			// a function to fully define a new delta operation type
			_addOperationType({name, constructor, applyTo, prototype, method}) {
				// define the method for adding the new operation to a Modify delta.
				// It is put on a temporary object
				var objectWithMethod = {};

				// define the operation type
				_opTypes[name] = {
					name: name,
					Delta: constructor,
					method: objectWithMethod[name]
				};

				// define the specific Delta class
				U.extend(_opTypes[name].Delta.prototype, prototype, {
					constructor: constructor,
					type: name,
					applyTo: applyTo
				});

				// make the operation method available on the 'modify' delta
				// (assumes that 'modify' is the first delta type to be defined)
				_opTypes['modify'].Delta.prototype[name] =
						U.isDefined(method) ? method :
								function (property, ...values) {
									this._addOperation(_opTypes[name], property, values);
									return this;
								};

			},

			// a function to give a new name to (a variation of) an existing delta operation type
			_addOperationAlias({name, target, transform}) {

				// define the method for adding the new operation to a Modify delta
				var objectWithMethod = {};
				Object.defineProperty(objectWithMethod, name, {
					value(property, ...values) {
						this._addOperation(_opTypes[target], property, transform(values));
						return this;
					}
				});

				// define the operation type
				_opTypes[name] = {
					name: name,
					method: objectWithMethod[name]
				};

				// make the operation method available on the 'modify' delta (assumes that 'modify' is defined first)
				_opTypes['modify'].Delta.prototype[name] = _opTypes[name].method;

			},

			// a function to add a new valid case distinction for delta composition
			_addCompositionRule(op1Type, op2Type, composeFn) {
				_composeFns.push({ op1Type, op2Type, composeFn });
			},

			// get a new delta of a given type, constructed with the given values
			_newDelta(type, ...values) {
				return U.applyConstructor(_opTypes[type].Delta, values);
			}
		});

		// the modify operation (MUST BE THE FIRST OPERATION TYPE TO BE DEFINED)
		var thisDM = this;
		this._addOperationType({
			name: 'modify',
			constructor: function Modify(deltaDescription = {}, operations = {}) {
				this.operations = operations;
				// process possible delta description
				Object.keys(deltaDescription).forEach((key) => {
					var match = key.match(/^(\w+)\s+([\w\.]+)$/);
					if (match) {
						var operation = match[1];
						var property = match[2];
						U.assert(operation in _opTypes,
								`I don't know the '${operation}' operation.`);
						this[operation](property, deltaDescription[key]);
					}
				});
			},
			applyTo(obj, property) {
				if (U.isDefined(property)) {
					// if the property is passed, apply this delta to `obj[property]`
					U.assert(U.isDefined(obj[property]),
							`The 'modify' operation expects the property to be already defined.`);
					Object.keys(this.operations).forEach((subProperty) => {
						this.operations[subProperty].applyTo(obj[property], subProperty);
					});
				} else {
					// if the property is not passed, apply this delta to `obj`
					U.assert(U.isDefined(obj),
							`The 'modify' operation expects the property to be already defined.`);
					Object.keys(this.operations).forEach((subProperty) => {
						this.operations[subProperty].applyTo(obj, subProperty);
					});
				}
			},
			prototype: {
				selectivelyApplyTo(obj, subProperty) {
					// if the property is not passed, apply this delta to `obj`
					U.assert(U.isDefined(obj),
							`The 'modify' operation expects the property to be already defined.`);
					if (U.isDefined(this.operations[subProperty])) {
						this.operations[subProperty].applyTo(obj, subProperty);
					}
				},
				compose(property, op2) {
					if (U.isUndefined(op2)) { return this }
					var foundComposeFn;
					_composeFns.some(({op1Type, op2Type, composeFn}) => {
						if (this.operations[property].type === op1Type && op2.type === op2Type) {
							foundComposeFn = composeFn;
							return true;
						}
					});
					if (foundComposeFn) {
						foundComposeFn(this, property, op2);
					} else {
						var err = new Error(
								`You cannot follow a '${this.operations[property].type}' operation ` +
								`with a '${op2.type}' operation on the same property.`
						);
						err.op1 = this.operations[property].type;
						err.op2 = op2.type;
						throw err;
					}
				},
				_addOperation(opType, property, values) {
					var dotIndex = property.indexOf('.');
					if (dotIndex !== -1) {
						// the property is a dot-separated path; recursively create a modify-chain
						var actualProperty = property.slice(0, dotIndex);
						var restOfProperty = property.slice(dotIndex + 1);
						var newModifyDelta = this._addOperation(_opTypes['modify'], actualProperty);
						return newModifyDelta[opType.name].apply(newModifyDelta, [restOfProperty].concat(values));
					} else {

						// the property is a single name; add the new delta directly
						var _newDelta = thisDM._newDelta.apply(thisDM, [opType.name].concat(values));
						if (this.operations.hasOwnProperty(property) && U.isDefined(this.operations[property])) {
							this.compose(property, _newDelta);
						} else {
							this.operations[property] = _newDelta;
						}
						return this.operations[property];
					}
				}
			},
			method(property, deltaDescription) {
				return this._addOperation(_opTypes['modify'], property, [deltaDescription]);
			}
		});


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		this._addOperationType({
			name: 'add',
			constructor: function Add(value) { this.value = value },
			applyTo(obj, property) {
				assertUndefined(obj[property], 'add');
				obj[property] = this.value;
			}
		});
		this._addOperationType({
			name: 'replace',
			constructor: function Replace(value) { this.value = value },
			applyTo(obj, property) {
				assertDefined(obj[property], 'replace');
				obj[property] = this.value;
			}
		});
		this._addOperationType({ // TODO: document this operation
			name: 'replaceAround',
			constructor: function ReplaceAround(value) { this.value = value },
			applyTo(obj, property) {
				assertDefined(obj[property], 'replaceAround');
				obj[property] = this.value(obj[property]);
			}
		});
		this._addOperationType({
			name: 'remove',
			constructor: function Remove() {},
			applyTo(obj, property) {
				assertDefined(obj[property], 'remove');
				delete obj[property];
			}
		});
		this._addOperationType({
			name: 'forbid',
			constructor: function Forbid() {},
			applyTo(obj, property) { assertUndefined(obj[property], 'forbid') }
		});


		// composition of the standard operation types
		this._addCompositionRule('add', 'replace', (d1, p, d2) => { d1.operations[p] = DeltaModel._newDelta('add', d2.value) });
		this._addCompositionRule('add', 'modify', applySecondToFirstValue);
		this._addCompositionRule('add', 'remove', (d1, p) => { d1.operations[p] = DeltaModel._newDelta('forbid') });
		this._addCompositionRule('replace', 'replace', keepSecond);
		this._addCompositionRule('replace', 'modify', applySecondToFirstValue);
		this._addCompositionRule('replace', 'remove', keepSecond);

		//this._addCompositionRule('add', 'replaceAround', applySecondToFirstValue); // too tricky right now; must refactor
		//this._addCompositionRule('replaceAround', 'replace', keepSecond);
		//this._addCompositionRule('replaceAround', 'modify', applySecondToFirstValue);
		//this._addCompositionRule('replaceAround', 'remove', keepSecond);
		//this._addCompositionRule('replaceAround', 'replaceAround', keepSecond);

		this._addCompositionRule('modify', 'replace', keepSecond);
		this._addCompositionRule('modify', 'modify', (d1, p, d2) => {
			Object.keys(d2.operations).forEach((prop) => {
				d1.compose(prop, d2.operations[prop]);
			});
		});
		this._addCompositionRule('modify', 'remove', keepSecond);
		this._addCompositionRule('remove', 'add', (d1, p, d2) => { d1.operations[p] = DeltaModel._newDelta('replace', d2.value) });
		this._addCompositionRule('remove', 'forbid', keepFirst);
		this._addCompositionRule('forbid', 'add', keepSecond);
		this._addCompositionRule('forbid', 'forbid', keepFirst);


		// 'alter' operation type
		this._addOperationType({
			name: 'alter',
			constructor: function Alter(value, alias) {
				this.value = value || [];
				this.alias = alias || 'alter';
			},
			applyTo(obj, property) {
				assertFunction(obj[property], this.alias);
				this.value.forEach((subOp) => {
					var partOne = obj[property];
					var partTwo = subOp.value;
					if (subOp.type === 'prepend') {
						obj[property] = function (...args) {
							partTwo.apply(this, args);
							partOne.apply(this, args);
						};
					} else { /* 'append' or 'insert' */
						obj[property] = function (...args) {
							partOne.apply(this, args);
							partTwo.apply(this, args);
						};
					}
				});
			}
		});
		this._addCompositionRule('alter', 'alter', (d1, p, d2) => {
			[].push.apply(d1.operations[p].value, d2.value);
		});
		this._addCompositionRule('alter', 'replace', keepSecond);
		this._addCompositionRule('alter', 'remove', (d1, p) => { d1.operations[p] = DeltaModel._newDelta('forbid') });
		this._addCompositionRule('add', 'alter', (d1, p, d2) => {
			assertFunction(d1.operations[p].value, d2.alias);
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('replace', 'alter', (d1, p, d2) => {
			assertFunction(d1.operations[p].value, d2.alias);
			applySecondToFirstValue(d1, p, d2);
		});


		// the 'prepend', 'insert' and 'append' operation type aliases
		['prepend', 'insert', 'append'].forEach((opType) => {
			this._addOperationAlias({
				name: opType,
				target: 'alter',
				transform: (args) => [[{ type: opType, value: args[0] }], opType]
			});
		});


		// 'after' operation type
		this._addOperationType({
			name: 'after',
			constructor: function After(value) {
				U.assert(typeof resolvePromise === 'function',
						`Before creating an 'after' operation, you must register a promise resolver with delta.js.`);
				this.value = value;
			},
			applyTo(obj, property) {
				assertFunction(obj[property], 'after');
				var partOne = obj[property];
				var partTwo = this.value;
				obj[property] = function (...args) {
					return resolvePromise(partOne.apply(this, args)).then(function () {
						return partTwo.apply(this, args);
					}.bind(this));
				};
			}
		});
		this._addCompositionRule('after', 'replace', keepSecond);
		this._addCompositionRule('after', 'remove', keepSecond);
		this._addCompositionRule('add', 'after', (d1, p, d2) => {
			assertFunction(d1.operations[p].value, 'after');
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('replace', 'after', (d1, p, d2) => {
			assertFunction(d1.operations[p].value, 'after');
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('insert', 'after', applySecondToFirstValue);
		this._addCompositionRule('after', 'insert', applySecondToFirstValue);
		/* TODO: the above compositions of 'insert' and 'after' are not actually correct (e.g., not associative). */


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		var _graph = new JsGraph(); /* deltas in a strict partial order */
		U.extend(this, {
			// get the graph of deltas
			graph() { return _graph }
		});

		var _deltaConditions = {}; /* arrays of arrays: disjunctive normal forms */
		var _settledDeltaConditions = {}; /* Booleans */
		var _conditionsUnsettled = false;

		function _registerDisjunct(deltaName, disjunct) {
			_conditionsUnsettled = true;
			if (disjunct === true) {
				_settledDeltaConditions[deltaName] = true;
			} else if (disjunct === false) {
				// change nothing
			} else if (_deltaConditions[deltaName] !== true) {
				U.array(_deltaConditions, deltaName).push(disjunct);
			}
		}

		function _settleConditions() {
			if (_conditionsUnsettled) {
				_conditionsUnsettled = false;
				var somethingChanged;
				do {
					somethingChanged = false;
					_graph.eachVertex((deltaName) => {
						if (_settledDeltaConditions[deltaName]) { return }
						if (U.isUndefined(_deltaConditions[deltaName])) { return }
						if (_deltaConditions[deltaName].some((disjunct) =>
										disjunct.every((conjunct) =>
												_settledDeltaConditions[conjunct]))) {
							_settledDeltaConditions[deltaName] = true;
							somethingChanged = true;
						}
					});
				} while (somethingChanged);
			}
		}


		// a class of a standard named delta with meta-data that is registered into the delta model
		this.Delta = U.newSubclass(_opTypes['modify'].Delta, function Delta(superFn, deltaName, options = {}) {
			// call the constructor of the 'modify' delta
			superFn.call(this, options);

			// perform sanity checks
			U.assert(options instanceof Object,
					`A delta should be given as an object.`);
			// TODO: check uniqueness of `deltaName`

			//// make this delta a ModifyDelta, so run its constructor
			//console.log(this, options);
			//_opTypes['modify'].Delta.prototype.constructor.call(this, options);

			// create delta properties
			Object.defineProperties(this, {
				name: { get() { return deltaName } },
				manuallySelectable: {
					get() {
						if (U.isDefined(options['manuallySelectable'])) {
							return !!options['manuallySelectable'];
						} else if (U.isDefined(options['resolves']) && options['resolves'].length > 0) {
							return false;
						} else {
							return true;
						}
					}
				},
				selected: {
					get() {
						_settleConditions();
						return !!_settledDeltaConditions[deltaName];
					}
				},
				if: {
					get() {
						if (options['if'] === true || options['if'] === false) { /* literal 'true' or 'false' */
							return options['if'];
						} else if (options['if'] || options['iff'] || options['resolves']) { /* array of names */
							return [].concat(
									options['if'] || [],
									options['iff'] || [],
									options['resolves'] || []
							);
						} else { /* default: false */
							return false;
						}
					}
				},
				onlyIf: {
					get() {
						if (options['onlyIf'] === true || options['onlyIf'] === false) { /* literal 'true' or 'false' */
							return options['onlyIf'];
						} else if (options['onlyIf'] || options['iff'] || options['expects'] ||  options['resolves']) { /* array of names */
							return [].concat(
									options['onlyIf'] || [],
									options['iff'] || [],
									options['expects'] || [],
									options['resolves'] || []
							);
						} else { /* default: true */
							return true;
						}
					}
				},
				appliedAfter: {
					get() {
						return [].concat(
								options['appliedAfter'] || [],
								options['expects'] || [],
								options['resolves'] || [],
								options['requires'] || []
						);
					}
				},
				selects: {
					get() {
						return [].concat(
								options['selects'] || [],
								options['requires'] || []
						);
					}
				}
			});

			// update conditions
			_conditionsUnsettled = true;
			if (U.isDefined(this.if)) { _registerDisjunct(deltaName, this.if) }
			this.selects.forEach((otherDeltaName) => {
				_registerDisjunct(otherDeltaName, [deltaName]);
			});

			// update the graph
			_graph.addVertex(deltaName, this);
			this.appliedAfter.forEach((otherDeltaName) => {
				_graph.createEdge(otherDeltaName, deltaName);
			});
			U.assert(!_graph.hasCycle(),
					`The delta ${deltaName} introduced a cycle in the application order.`);

		});


		U.extend(this, {
			// select a number of deltas by name, so they will be applied when applicable
			select(...deltaNames) {
				deltaNames.forEach((deltaName) => {
					_registerDisjunct(deltaName, true);
				});
			},

			// register a named variation point in the code-base
			// (i.e., apply all registered deltas and return the resulting value)
			vp(vpName, val) {

				// a temporary object to hold the value while it is undergoing change
				var obj = {};
				obj[vpName] = val;

				// check if any 'onlyIf' conditions are being violated
				_settleConditions();
				_graph.eachVertex((name, delta) => {
					U.assert(!delta.selected || delta.onlyIf === true || delta.onlyIf.every((d) => _graph.vertexValue(d).selected),
							`The 'onlyIf' condition of delta '${delta.name}' was violated.`);
				});

				// apply the proper deltas
				_graph.topologically((name, delta) => {
					if (delta.selected) {
						delta.selectivelyApplyTo(obj, vpName);
					}
				});

				// return the transformed value
				return obj[vpName];

			}
		});

	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	var resolvePromise = null;
	U.extend(DeltaModel, {
		registerPromiseResolver(promiseResolverFn) {
			resolvePromise = promiseResolverFn;
		}
	});


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/* return the main delta model class */
	return DeltaModel;


});
