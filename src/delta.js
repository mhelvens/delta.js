define(['js-graph', 'bluebird', './traverse-dag.js', './misc.js'], function (JsGraph, P, traverse, U) {
	'use strict';

	/******************************************************************************************************************/

	// the delta-model class, which is the container of all operation types,
	// all deltas, their ordering and rules
	var CoreDM = U.newClass(function () {

		// Accumulated data for the available delta operation types
		var _opTypes = {};
		/* the name and delta classes */
		var _composeFns = [];
		/* the case distinctions of delta composition */

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
					applyTo: applyTo,
					compose(property, op2) {
						if (U.isUndefined(op2)) { return this }
						var foundComposeFn;
						_composeFns.some(({op1Type, op2Type, composeFn}) => {
							if (this.type === op1Type && op2.type === op2Type) {
								foundComposeFn = composeFn;
								return true;
							}
						});
						if (foundComposeFn) {
							foundComposeFn(this, property, op2);
						} else {
							var err = new Error(
									`You cannot follow a '${this.type}' operation ` +
									`with a '${op2.type}' operation on the same property.`
							);
							err.op1 = this.type;
							err.op2 = op2.type;
							throw err;
						}
					}
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

		// an easy way to get the 'modify' delta constructor
		Object.defineProperty(this, 'Delta', {
			get() { return _opTypes['modify'].Delta }
		});

		// the modify operation (MUST BE THE FIRST OPERATION TYPE TO BE DEFINED)
		var thisDM = this;
		this._addOperationType({
			name: 'modify',
			constructor: function Modify(deltaDescription, operations) {
				// normalize things
				deltaDescription = deltaDescription || {};
				this.operations = operations || {};

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

	});


	/******************************************************************************************************************/


	// convenience definitions for the application and composition functions below
	var keepFirst = () => {};
	var keepSecond = (d1, p, d2) => { d1[p] = d2 };
	var applySecondToFirstValue = (d1, p, d2) => { d2.applyTo(d1[p], 'value') };

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


	/******************************************************************************************************************/


	// a delta model class with a number of common operations already added in
	var ExtendedDM = U.newSubclass(CoreDM, function () {
		// the other standard operation types
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
		this._addCompositionRule('add', 'replace', (d1, p, d2) => { d1[p] = CoreDM._newDelta('add', d2.value) });
		this._addCompositionRule('add', 'modify', applySecondToFirstValue);
		this._addCompositionRule('add', 'remove', (d1, p) => { d1[p] = CoreDM._newDelta('forbid') });
		this._addCompositionRule('replace', 'replace', keepSecond);
		this._addCompositionRule('replace', 'modify', applySecondToFirstValue);
		this._addCompositionRule('replace', 'remove', keepSecond);
		this._addCompositionRule('modify', 'replace', keepSecond);
		this._addCompositionRule('modify', 'modify', (d1, p, d2) => {
			Object.keys(d2.operations).forEach((prop) => {
				d1.compose(prop, d2.operations[prop]);
			});
		});
		this._addCompositionRule('modify', 'remove', keepSecond);
		this._addCompositionRule('remove', 'add', (d1, p, d2) => { d1[p] = CoreDM._newDelta('replace', d2.value) });
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
			[].push.apply(d1[p].value, d2.value);
		});
		this._addCompositionRule('alter', 'replace', keepSecond);
		this._addCompositionRule('alter', 'remove', (d1, p) => { d1[p] = CoreDM._newDelta('forbid') });
		this._addCompositionRule('add', 'alter', (d1, p, d2) => {
			assertFunction(d1[p].value, d2.alias);
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('replace', 'alter', (d1, p, d2) => {
			assertFunction(d1[p].value, d2.alias);
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
			constructor: function After(value) { this.value = value },
			applyTo(obj, property) {
				assertFunction(obj[property], 'after');
				var partOne = obj[property];
				var partTwo = this.value;
				obj[property] = function (...args) {
					return P.resolve(partOne.apply(this, args)).then(function () {
						return partTwo.apply(this, args);
					}.bind(this));
				};
			}
		});
		this._addCompositionRule('after', 'replace', keepSecond);
		this._addCompositionRule('after', 'remove', keepSecond);
		this._addCompositionRule('add', 'after', (d1, p, d2) => {
			assertFunction(d1[p].value, 'after');
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('replace', 'after', (d1, p, d2) => {
			assertFunction(d1[p].value, 'after');
			applySecondToFirstValue(d1, p, d2);
		});
		this._addCompositionRule('insert', 'after', applySecondToFirstValue);
		this._addCompositionRule('after', 'insert', applySecondToFirstValue);
		/* TODO: the above compositions of 'insert' and 'after' are not actually correct (e.g., not associative). */
	});


	/******************************************************************************************************************/


	// a delta model class with common operations and a partially ordered set of deltas
	var PartiallyOrderedDM = U.newSubclass(ExtendedDM, function () {
		var _graph = new JsGraph();
		/* deltas in a strict partial order */
		U.extend(this, {
			// get the graph of deltas
			graph() { return _graph }
		});

		var _deltaConditions = {};
		/* arrays of arrays: disjunctive normal forms */
		var _settledDeltaConditions = {};
		/* Booleans */
		var _conditionsUnsettled = false;

		function _registerDisjunct(id, disjunct) {
			if (disjunct === true) {
				_settledDeltaConditions[id] = true;
			} else if (_deltaConditions[id] !== true) {
				U.array(_deltaConditions, 'id').push(disjunct);
			}
		}

		function _settleConditions() {
			if (_conditionsUnsettled) {
				_conditionsUnsettled = false;
				var somethingChanged;
				do {
					somethingChanged = false;
					_graph.eachVertex((id) => {
						if (_settledDeltaConditions[id]) { return }
						if (U.isUndefined(_deltaConditions[id])) { return }
						if (_deltaConditions[id].some((disjunct) =>
										disjunct.every((conjunct) =>
												_settledDeltaConditions[conjunct]))) {
							_settledDeltaConditions[id] = true;
							somethingChanged = true;
						}
					});
				} while (somethingChanged);
			}
		}

		U.extend(this, {
			// register a new delta into the delta model
			register(config) {

				// perform sanity checks
				U.assert(config instanceof Object,
						`A delta should be given as an object.`);
				U.assert(typeof config.id === 'string',
						`A delta should have a unique 'id'.`);

				// normalize configuration
				if (config.resolves && config.resolves.length > 0) {
					config.manuallySelectable = false;
				}
				[
					['manuallySelectable', true],
					['onlyIf', []],
					['after', []],
					['selects', []],
					['expects', []],
					['requires', []]
				].forEach((prop, def) => {
							if (U.isUndefined(config[prop])) {
								config[prop] = def;
							}
						});

				// create delta
				var delta = new this.Delta();

				// create delta properties
				Object.defineProperties(delta, {
					id: { get() { return config.id } },
					manuallySelectable: { get() { return !!config.manuallySelectable } },
					selected: {
						get() {
							_settleConditions();
							return !!_settledDeltaConditions[config.id];
						}
					},
					if: {
						get() {
							if (config.if === true) { /* literal 'true' */
								return true;
							} else if (config.if || config.iff || config.resolves) { /* array of ids */
								return [].concat(
										config.if || [],
										config.iff || [],
										config.resolves || []
								);
							} else { /* no if clause */
								return undefined;
							}
						}
					},
					onlyIf: {
						get() {
							return [].concat(
									config.onlyIf || [],
									config.iff || [],
									config.expects || [],
									config.resolves || []
							);
						}
					},
					after: {
						get() {
							return [].concat(
									config.after || [],
									config.expects || [],
									config.resolves || [],
									config.requires || []
							);
						}
					},
					selects: {
						get() {
							return [].concat(
									config.selects || [],
									config.requires || []
							);
						}
					}
				});

				// update conditions
				_conditionsUnsettled = true;
				_registerDisjunct(delta.id, delta.if);
				delta.selects.forEach((id) => { _registerDisjunct(id, [delta.id]); });

				// update the graph
				_graph.addVertex(delta.id, delta);
				delta.after.forEach((id) => {
					_graph.createEdge(id, delta.id);
				});
				U.assert(!_graph.hasCycle(),
						`The delta ${delta.id} introduced a cycle in the application order.`);

				// return the delta, so additional operations can be added to it
				return delta;

			},

			// select a number of deltas by id, so they will be applied when this delta model is applied
			select(...ids) {
				// process single plugin name by making its condition 'true'
				ids.forEach((id) => { _registerDisjunct(id, true) });
			},

			// register a named variation point in the code-base
			// (i.e., apply all registered deltas and return the resulting value)
			vp(name, val) {

				// a temporary object to hold the value while it is undergoing change
				var obj = {};
				obj[name] = val;

				// check if any 'onlyIf' conditions are being violated
				_graph.eachVertex((id, delta) => {
					U.assert(!delta.selected || delta.onlyIf.every((d) => d.selected),
							`The 'onlyIf' condition of delta '${delta.id}' was violated.`);
				});

				// apply the delta
				_graph.topologically((id, delta) => {
					delta.selectivelyApplyTo(obj, name);
				});

				// return the transformed value
				return obj[name];

			}
		});

	});


	/******************************************************************************************************************/


	// return the main object
	return PartiallyOrderedDM;

});
