(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["js-graph"], factory);
	else if(typeof exports === 'object')
		exports["DeltaJs"] = factory(require("js-graph"));
	else
		root["DeltaJs"] = factory(root["JsGraph"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import utilities */
	
	var U = _interopRequire(__webpack_require__(1));
	
	/* import the DeltaJs class */
	
	var DeltaJs = _interopRequire(__webpack_require__(2));
	
	/* make Target classes available under the DeltaJs symbol */
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var WritableTarget = _TargetJs.WritableTarget;
	
	U.extend(DeltaJs, { ReadableTarget: ReadableTarget, WritableTarget: WritableTarget });
	
	/* make Path classes available under the DeltaJs symbol */
	
	var Path = _interopRequire(__webpack_require__(4));
	
	U.extend(DeltaJs, { Path: Path });
	
	/* make Error classes available under the DeltaJs symbol */
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var MultipleOverloadsApplicationError = _ErrorJs.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorJs.NoOverloadsApplicationError;
	var DeltaArgApplicationError = _ErrorJs.DeltaArgApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	var ConstraintFailure = _ErrorJs.ConstraintFailure;
	var ApplicationOrderCycle = _ErrorJs.ApplicationOrderCycle;
	var UnresolvedConflict = _ErrorJs.UnresolvedConflict;
	var MultipleActiveFacadesError = _ErrorJs.MultipleActiveFacadesError;
	
	U.extend(DeltaJs, { ApplicationError: ApplicationError, MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError, DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError, MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure, ApplicationOrderCycle: ApplicationOrderCycle,
	  UnresolvedConflict: UnresolvedConflict, MultipleActiveFacadesError: MultipleActiveFacadesError });
	
	/* export the DeltaJs class */
	module.exports = DeltaJs;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var U = {
	
		/* create a new class, given a constructor and possible prototype */
		newClass: function newClass() {
			var constructor = arguments[0] === undefined ? {} : arguments[0];
			var prototype = arguments[1] === undefined ? {} : arguments[1];
	
			/* allow for no constructor function to be passed */
			if (typeof constructor !== "function") {
				prototype = constructor;
				constructor = function () {};
			}
	
			/* define the class */
			var cls = constructor;
			cls.prototype = prototype;
			cls.prototype.constructor = cls;
			return cls;
		},
	
		/* create a new subclass, given a superclass, constructor and possible prototype */
		newSubclass: function newSubclass(superClass) {
			var constructorMaker = arguments[1] === undefined ? {} : arguments[1];
			var prototype = arguments[2] === undefined ? {} : arguments[2];
	
			/* allow for no constructor function to be passed */
			if (typeof constructorMaker !== "function") {
				prototype = constructorMaker;
				constructorMaker = function (superFn) {
					return function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}
	
						superFn.apply(this, args);
					};
				};
			}
	
			/* define the subclass */
			var cls = constructorMaker(superClass.prototype.constructor);
			cls.prototype = Object.create(superClass.prototype);
			U.extend(cls.prototype, prototype);
			cls.prototype.constructor = cls;
			return cls;
		},
	
		/*  extend the first passed object with the properties     */
		/*  of the other objects, from left to right, and returns  */
		/*  the first passed object                                */
		extend: function extend(obj1) {
			for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				rest[_key - 1] = arguments[_key];
			}
	
			rest.forEach(function (obj) {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
					}
				}
			});
			return obj1;
		},
	
		"default": function _default(object) {
			for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				rest[_key - 1] = arguments[_key];
			}
	
			var keys = rest.slice(0, -1);
			var def = rest[rest.length - 1];
			if (keys.length === 0) {
				return object;
			}
			var last = U.o.apply(U, [object].concat(_toConsumableArray(keys.slice(0, -1))));
			if (U.isUndefined(last[keys[keys.length - 1]])) {
				last[keys[keys.length - 1]] = def;
			}
			return last[keys[keys.length - 1]];
		},
	
		o: function o(object) {
			for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				keys[_key - 1] = arguments[_key];
			}
	
			return U["default"].apply(U, [object].concat(keys, [{}]));
		},
	
		a: function a(object) {
			for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				keys[_key - 1] = arguments[_key];
			}
	
			return U["default"].apply(U, [object].concat(keys, [[]]));
		},
	
		/* a simple `assert` function, to express a condition that is expected to be true */
		assert: function assert(condition, message) {
			if (!condition) {
				throw new Error(message || "Assertion failed");
			}
		},
	
		/* test if a value is `undefined` */
		isUndefined: function isUndefined(val) {
			return typeof val === "undefined";
		},
	
		/* test if a value is defined (not `undefined`) */
		isDefined: function isDefined(val) {
			return typeof val !== "undefined";
		},
	
		/* repeat a string a given number of times */
		repeat: function repeat(nr, str) {
			return new Array(nr + 1).join(str);
		},
	
		/* shift every line in a string right by a given number of spaces */
		indent: function indent(str, amount) {
			var char = arguments[2] === undefined ? " " : arguments[2];
	
			return str.replace(/^(?!\s*$)/mg, U.repeat(amount, char));
		}
	};
	
	module.exports = U;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(6));
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var WritableTarget = _TargetJs.WritableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var MultipleOverloadsApplicationError = _ErrorJs.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorJs.NoOverloadsApplicationError;
	var DeltaArgApplicationError = _ErrorJs.DeltaArgApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var defineComposite = _interopRequire(__webpack_require__(8));
	
	var defineOverloaded = _interopRequire(__webpack_require__(9));
	
	var defineModify = _interopRequire(__webpack_require__(10));
	
	var defineBasicOperations = _interopRequire(__webpack_require__(11));
	
	var definePutIntoArray = _interopRequire(__webpack_require__(12));
	
	var definePutIntoFunction = _interopRequire(__webpack_require__(13));
	
	var defineDeltaModel = _interopRequire(__webpack_require__(14));
	
	var defineFeatures = _interopRequire(__webpack_require__(15));
	
	var defineVariationPoints = _interopRequire(__webpack_require__(16));
	
	var defineApplicationConditions = _interopRequire(__webpack_require__(17));
	
	/** {@public}{@class DeltaJs}
	 * This class offers every functionality you need from delta modeling.
	 * Each instance offers its own operation types and variation points.
	 * You will usually need only one instance per application.
	 */
	module.exports = U.newClass(function DeltaJs() {
	
		this._compositions = []; // [{precondition, composeFn}]
		this._overloads = {}; // method -> [delta-classes]
		this._onNewOperationTypeListeners = [];
	
		defineDelta(this);
		defineComposite(this);
		defineOverloaded(this);
		defineModify(this);
		defineBasicOperations(this);
		definePutIntoArray(this);
		definePutIntoFunction(this);
		defineDeltaModel(this);
		defineFeatures(this);
		defineVariationPoints(this);
		defineApplicationConditions(this);
	}, /** @lends DeltaJs.prototype */{
	
		/** {@private}{@method}
	  * @param delta  {DeltaJs#Delta}
	  * @param target {DeltaJs.ReadableTarget}
	  * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
	  *                                      `false` or an instance of `DeltaJs.ApplicationError`
	  */
		_evaluatePrecondition: function _evaluatePrecondition(delta, target) {
			if (typeof delta.precondition === "function") {
				var judgment = delta.precondition(target);
				if (judgment instanceof ApplicationError) {
					return judgment;
				} else if (!judgment) {
					return new ApplicationError(delta, target.value);
				}
			}
			return true;
		},
	
		/** {@public}{@method}
	  * @param name      {string}
	  * @param prototype {object}
	  */
		newOperationType: function newOperationType(Superclass, name, prototype) {
			var _this = this;
	
			if (typeof Superclass === "string") {
				var _ref = [undefined, Superclass, name];
	
				var _ref2 = _slicedToArray(_ref, 3);
	
				Superclass = _ref2[0];
				name = _ref2[1];
				prototype = _ref2[2];
			}
			prototype = prototype || {};
	
			/* 'this' alias */
			var thisDeltaJs = this;
	
			/* sanity checks */
			U.assert(name[0] === name[0].toUpperCase(), "Delta operations must have a name starting with a capital letter -- '" + name + "' does not.");
			U.assert(!this.Delta[name], "The '" + name + "' operation type already exists.");
	
			/* Delta subclass */
			var cls = this.Delta[name] = U.newSubclass(Superclass || this.Delta, function (superFn) {
				return function (arg, options) {
					superFn.call(this, arg, options);
					if (this.construct) {
						this.construct();
					}
				};
			}, U.extend({}, prototype, {
				applyTo: function applyTo(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					/* should this delta only be applied for a specific property on the target object? */
					if (options.restrictToProperty && this.options.targetProp && options.restrictToProperty !== this.options.targetProp) {
						return;
					}
	
					/* should this delta only be applied for a specific feature selection? */
					if (!this.selected) {
						return;
					}
	
					/* does the target satisfy the precondition of the delta? */
					var judgment = thisDeltaJs._evaluatePrecondition(this, target);
					if (judgment !== true) {
						throw judgment;
					}
	
					/* OK, then apply it if a method to do so was included in the operation */
					if (U.isDefined(prototype.applyTo)) {
						prototype.applyTo.call(this, target, !!this.options.targetProp ? U.extend({}, options, { restrictToProperty: null }) : options);
					}
				}
			}));
			cls.type = cls.prototype.type = name;
			cls.options = cls.prototype.options = { // TODO: don't put this in prototype anymore
				// if no methods are provided, use the operation name starting with a lowercase letter
				methods: prototype.methods || [name[0].toLowerCase() + name.slice(1)]
			};
	
			/* add this new type to the list of types associated with each method */
			cls.options.methods.forEach(function (method) {
				U.a(_this._overloads, method).push(name);
			});
	
			/* notify listeners */
			this._onNewOperationTypeListeners.forEach(function (fn) {
				fn(cls);
			});
	
			/* return the new class */
			return cls;
		},
	
		/** {@public}{@method}
	  * @param fn {(Function) => undefined} - a function that takes a subclass of `DeltaJs#Delta`
	  */
		onNewOperationType: function onNewOperationType(fn) {
			var _this = this;
	
			this._onNewOperationTypeListeners.push(fn);
			Object.keys(this.Delta).forEach(function (name) {
				if (name[0] === name[0].toUpperCase()) {
					fn(_this.Delta[name]);
				}
			});
		},
	
		/** {@public}{@method}
	  * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	  * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	  */
		newComposition: function newComposition(precondition, compose) {
			this._compositions.push({ precondition: precondition, compose: compose });
		},
	
		/** {@public}{@method}
	  * @param d1 {DeltaJs#Delta} - the first delta
	  * @param d2 {DeltaJs#Delta} - the second delta
	  * @return {DeltaJs#Delta} - the composed delta
	  */
		composed: function composed(d1, d2) {
			/* handle the cases where one or both arguments are undefined */
			if (U.isUndefined(d1)) {
				d1 = new this.Delta.NoOp();
			}
			if (U.isUndefined(d2)) {
				d2 = new this.Delta.NoOp();
			}
	
			/* use the first composition function for which these deltas satisfy the precondition */
			var composeFn = function () {};
			var success = this._compositions.some(function (_ref) {
				var precondition = _ref.precondition;
				var fn = _ref.compose;
	
				if (precondition(d1, d2)) {
					composeFn = fn;
					return true; // success; break the loop
				}
			});
	
			/* throw an error on failure */
			if (!success) {
				throw new CompositionError(d1, d2);
			}
	
			/* return the result on success */
			return composeFn(d1, d2);
		}
	
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	exports.wt = wt;
	exports.rt = rt;
	
	var U = _interopRequire(__webpack_require__(1));
	
	var ReadableTarget = exports.ReadableTarget = U.newClass(function (value) {
		this._val = value;
	}, Object.defineProperties({
		getValue: function getValue() {
			return this._val;
		} }, {
		value: {
			get: function () {
				return this.getValue();
			},
			set: function (v) {
				this.setValue(v);
			},
			enumerable: true,
			configurable: true
		}
	}));
	
	var WritableTarget = exports.WritableTarget = U.newSubclass(ReadableTarget, function (superFn) {
		return function (obj, prop) {
			this._obj = obj;
			this._prop = prop;
		};
	}, {
		getValue: function getValue() {
			return this._obj[this._prop];
		},
		setValue: function setValue(v) {
			this._obj[this._prop] = v;
		},
		"delete": function _delete() {
			delete this._obj[this._prop];
		}
	});
	
	ReadableTarget.prototype.chain = function chain(prop) {
		U.assert(this.value instanceof Object, "The ReadableTarget.prototype.chain method expects the target value to be an Object.");
		return new WritableTarget(this.value, prop);
	};
	
	function wt(obj, prop) {
		return new WritableTarget(obj, prop);
	}
	
	function rt(obj, prop) {
		return new ReadableTarget(obj, prop);
	}
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = U.newClass(function () {
		var str = arguments[0] === undefined ? "" : arguments[0];
	
		///////////////////////  11111  22222222222  33  //
		var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
		U.assert(match, "The path string '" + str + "' is not well formed.");
	
		var _match = _slicedToArray(match, 4);
	
		var lead = _match[1];
		var prop = _match[2];
		var rest = _match[3];
	
		if (lead === "#") {
			// The # separator is used in the JsDoc sense, and is translated to '.(instance).'
			this.set(new Path(".(instance)." + prop + "" + rest));
		} else if (prop !== "") {
			this._prop = prop;
			if (rest !== "") {
				this._rest = new Path(rest);
			}
		}
	}, Object.defineProperties({
		set: function set(other) {
			this._prop = other._prop;
			this._rest = other._rest;
		},
		toString: function toString() {
			var result = "";
			if (U.isDefined(this.prop)) {
				result += this.prop;
				if (U.isDefined(this.rest)) {
					result += "." + this.rest.toString();
				}
			}
			return result;
		}
	}, {
		prop: {
			get: function () {
				return this._prop;
			},
			enumerable: true,
			configurable: true
		},
		rest: {
			get: function () {
				return this._rest;
			},
			enumerable: true,
			configurable: true
		}
	}));
	
	module.exports = Path;
	
	// TODO: implement that the `.(instance).` members are actually included in instances

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var U = _interopRequire(__webpack_require__(1));
	
	var ApplicationError = exports.ApplicationError = U.newSubclass(Error, function (superFn) {
		return function ApplicationError(delta, value) {
			superFn.call(this);
			this.name = "ApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		};
	});
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, function (superFn) {
		return function MultipleOverloadsApplicationError(delta, value) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			superFn.call(this, delta, value);
			this.name = "MultipleOverloadsApplicationError";
			this.message = "None of the delta-types " + delta.overloads.map(function (d) {
				return "'" + d.type + "'";
			}).join(",") + " can apply to this value of type '" + typeof value + "'." + errors.map(function (e) {
				return "\n-- " + e.message;
			}).join("");
			this.errors = errors;
		};
	});
	
	var NoOverloadsApplicationError = exports.NoOverloadsApplicationError = U.newSubclass(ApplicationError, function (superFn) {
		return function NoOverloadsApplicationError(delta, value) {
			superFn.call(this, delta, value);
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		};
	});
	
	var DeltaArgApplicationError = exports.DeltaArgApplicationError = U.newSubclass(ApplicationError, function (superFn) {
		return function DeltaArgApplicationError(delta, baseDelta) {
			superFn.call(this, delta, baseDelta.arg);
			this.name = "DeltaArgApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to the type-'" + typeof baseDelta.arg + "'-value of this base delta of type '" + baseDelta.type + "'.";
			this.baseDelta = baseDelta;
		};
	});
	
	var CompositionError = exports.CompositionError = U.newSubclass(Error, function (superFn) {
		return function CompositionError(delta1, delta2) {
			superFn.call(this);
			this.name = "CompositionError";
			this.message = "This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "'.";
			this.delta1 = delta1;
			this.delta2 = delta2;
		};
	});
	
	var MultipleOverloadsCompositionError = exports.MultipleOverloadsCompositionError = U.newSubclass(CompositionError, function (superFn) {
		return function MultipleOverloadsCompositionError(delta1, delta2) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			superFn.call(this, delta1, delta2);
			this.name = "MultipleOverloadsCompositionError";
			this.message = "There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'." + errors.map(function (e) {
				return "\n-- " + e.message;
			}).join("");
			this.errors = errors;
		};
	});
	
	var ConstraintFailure = exports.ConstraintFailure = U.newSubclass(Error, function (superFn) {
		return function ConstraintFailure(feature) {
			superFn.call(this);
			this.name = "ConstraintFailure";
			this.message = "The feature '" + feature.name + "' is both selected and excluded by its constraints.";
			this.feature = feature;
		};
	});
	
	var ApplicationOrderCycle = exports.ApplicationOrderCycle = U.newSubclass(Error, function (superFn) {
		return function ApplicationOrderCycle(from, to) {
			superFn.call(this);
			this.name = "ApplicationOrderCycle";
			this.message = "The new application order between " + from + " and " + to + " created a cycle.";
			this.from = from;
			this.to = to;
		};
	});
	
	var DeltaConflict = exports.DeltaConflict = U.newSubclass(Error, function (superFn) {
		return function DeltaConflict(deltas) {
			superFn.call(this);
			this.name = "DeltaConflict";
			var deltaNames = deltas.map(function (d) {
				return "'" + d.name + "'";
			}).join(",");
			this.message = "There is an unresolved conflict between deltas " + deltaNames + ".";
			this.deltas = deltas;
		};
	});
	
	var MultipleActiveFacadesError = exports.MultipleActiveFacadesError = U.newSubclass(Error, function (superFn) {
		return function MultipleActiveFacadesError(delta) {
			superFn.call(this);
			this.name = "MultipleActiveFacadesError";
			this.delta = delta;
			this.message = "Only one 'do' interface can be active per '" + delta.type + "' delta.";
		};
	});
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var wt = _TargetJs.wt;
	
	var defineApplicationConditions = _interopRequire(__webpack_require__(17));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta)) {
			return;
		}
	
		deltaJs._nextDeltaID = 0;
	
		/** {@class Delta}
	  *
	  */
		deltaJs.Delta = U.newClass(function Delta(arg) {
			var options = arguments[1] === undefined ? {} : arguments[1];
	
			this.arg = arg;
			this.id = deltaJs._nextDeltaID++;
			this.options = options;
		}, {
	
			/** {@public}{@abstract}{@method}{@nosideeffects}
	   * This method should be overwritten by subclasses to make a clone of 'this' delta.
	   * @return {DeltaJs#Delta} - a clone of this delta
	   */
			clone: function clone() {
				return new this.constructor(this.arg, this.options);
			},
	
			/** {@public}{@method}{@nosideeffects}
	   * @param  value   {*}       - any given value
	   * @param  options {object?} - the (optional) options for this delta application
	   * @return {*} - the value resulting in this delta being applied to the given `value`
	   */
			appliedTo: function appliedTo(value) {
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				if (value instanceof ReadableTarget) {
					value = value.value;
				}
				if (typeof value.clone === "function") {
					value = value.clone();
				}
				var obj = { value: value };
				this.applyTo(wt(obj, "value"), options);
				return obj.value;
			},
	
			/** {@public}{@method}{@nosideeffects}
	   * @param other {DeltaJs#Delta} - the other delta to compose with
	   * @return {DeltaJs#Delta} - the composed delta
	   */
			composedWith: function composedWith(other) {
				return deltaJs.composed(this, other);
			},
	
			/** {@public}{@method}
	   * @param options {object?}
	   * @return {string}
	   */
			toString: function toString() {
				var options = arguments[0] === undefined ? {} : arguments[0];
	
				var str = this.type;
				if (this.options.targetProp) {
					str += " ‹" + this.options.targetProp + "›";
				}
				if (U.isDefined(this.arg)) {
					str += ": " + JSON.stringify(this.arg);
				}
				if (options.debug) {
					str += " (" + this.id + ")";
				}
				return str;
			} });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var MultipleActiveFacadesError = __webpack_require__(5).MultipleActiveFacadesError;
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.Composite)) {
			return;
		}
	
		defineDelta(deltaJs);
	
		U.extend(deltaJs.constructor.prototype, {
			/** {@protected}{@method}
	   * @param options {object}
	   * @param arg     {*}
	   * @return {DeltaJs#Delta}
	   */
			_newDeltaByMethod: function _newDeltaByMethod(options, arg) {
				var _this = this;
	
				var newDeltas = this._overloads[options.method].map(function (type) {
					return new _this.Delta[type](arg, options);
				});
				if (newDeltas.length === 1) {
					return newDeltas[0];
				} else {
					// newDeltas.length > 1
					var delta = new this.Delta.Overloaded(arg, options);
					delta.overloads = newDeltas;
					return delta;
				}
			}
		});
	
		/** {@class}
	  *
	  */
		deltaJs.Delta.Composite = U.newSubclass(deltaJs.Delta, function (superFn) {
			return function Composite() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				superFn.apply(this, args);
			};
		}, {
			/** {@public}{@abstract}{@method}
	   * Implement this method in subclasses to prepare a specific delta operation with this delta as the base.
	   * @return {DeltaJs#Delta} - the delta resulting from the operation
	   */
			operation: function operation() {
				throw new Error("A Delta.Composite subclass (in this case: " + this.type + ") needs to implement the 'operation' method.");
			},
	
			/** {@public}{@method}
	   * Returns an object that allows new delta operations to be added more easily.
	   * @return {function} - the facade to this delta, for easily adding operations
	   */
			"do": function _do() {
				for (var _len = arguments.length, firstArgs = Array(_len), _key = 0; _key < _len; _key++) {
					firstArgs[_key] = arguments[_key];
				}
	
				var thisDelta = this;
				// The facade object exposes operations methods directly, but arguments to
				// those operations can partly be given through function-call notation.
				// Therefore, a facade is a function, storing arguments that are already given.
				var fcd = (function (_fcd) {
					var _fcdWrapper = function fcd(_x) {
						return _fcd.apply(this, arguments);
					};
	
					_fcdWrapper.toString = function () {
						return _fcd.toString();
					};
	
					return _fcdWrapper;
				})(function () {
					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}
	
					return thisDelta["do"].apply(thisDelta, _toConsumableArray(fcd._args).concat(args));
				});
				fcd._args = firstArgs;
				U.extend(fcd, operationMethods, {
					_applyOperationMethod: function _applyOperationMethod(method) {
						for (var _len2 = arguments.length, finalArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
							finalArgs[_key2 - 1] = arguments[_key2];
						}
	
						return thisDelta.operation.apply(thisDelta, [{ method: method }].concat(_toConsumableArray(fcd._args), finalArgs));
					},
					delta: thisDelta
				});
				return fcd;
			} });
	
		var operationMethods = {};
		deltaJs.onNewOperationType(function (cls) {
			if (cls === deltaJs.Delta.Composite) {
				return;
			}
			(cls.options.methods || []).forEach(function (method) {
				if (U.isUndefined(operationMethods[method])) {
					operationMethods[method] = function () {
						var _ref;
	
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}
	
						if (this._facadeDisabled) {
							throw new MultipleActiveFacadesError(this);
						}
						var newDelta = (_ref = this)._applyOperationMethod.apply(_ref, [method].concat(args));
						if (newDelta instanceof deltaJs.Delta.Composite) {
							var activeSubFacade = this._activeSubFacade;
							while (activeSubFacade) {
								activeSubFacade._facadeDisabled = true;
								activeSubFacade = activeSubFacade._activeSubFacade;
							}
							return this._activeSubFacade = newDelta["do"]();
						} else {
							return this;
						}
					};
				}
			});
		});
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var _ErrorJs = __webpack_require__(5);
	
	var MultipleOverloadsApplicationError = _ErrorJs.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorJs.NoOverloadsApplicationError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.Overloaded)) {
			return;
		}
	
		defineDelta(deltaJs);
	
		deltaJs.newOperationType(deltaJs.Delta, "Overloaded", {
			construct: function construct() {
				this.overloads = [];
			},
	
			/** {@public}{@abstract}{@method}{@nosideeffects}
	   * @return {DeltaJs#Delta.Overloaded} - a clone of this delta
	   */
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
				result.overloads = this.overloads.map(function (delta) {
					return delta.clone();
				});
				return result;
			},
	
			/** {@public}{@method}
	   * @param target  {Delta.WritableTarget} - the target to which to apply this delta
	   * @param options {object?}              - the (optional) options for this delta application
	   */
			applyTo: function applyTo(target) {
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				/* apply the first overload that applies to the target; gather any errors */
				var errors = [];
				var success = this.overloads.some(function (delta) {
					var judgment = deltaJs._evaluatePrecondition(delta, target);
					if (judgment !== true) {
						errors.push(judgment);
						return false;
					}
					delta.applyTo(target, options);
					return true;
				});
				/* if none apply, throw an appropriate error */
				if (!success) {
					if (errors.length === 0) {
						throw new NoOverloadsApplicationError(this, target.value);
					} else if (errors.length === 1) {
						throw errors[0];
					} else {
						throw new MultipleOverloadsApplicationError(this, target.value, errors);
					}
				}
			},
	
			/** {@public}{@method}
	   * @param options {object?}
	   * @return {string}
	   */
			toString: function toString(options) {
				var str = deltaJs.Delta.prototype.toString.call(this, options);
				var overloads = this.overloads.map(function (delta) {
					return delta.toString(options);
				}).join("\n");
				str += "\n" + U.indent(overloads, 4);
				return str;
			}
		});
	
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.Overloaded || d2 instanceof deltaJs.Delta.Overloaded;
		}, function (d1, d2) {
			var D1 = d1 instanceof deltaJs.Delta.Overloaded ? d1.overloads : [d1];
			var D2 = d2 instanceof deltaJs.Delta.Overloaded ? d2.overloads : [d2];
			var result = new deltaJs.Delta.Overloaded();
			var errors = [];
			D1.forEach(function (delta1) {
				D2.forEach(function (delta2) {
					try {
						result.overloads.push(delta1.composedWith(delta2));
					} catch (error) {
						errors.push(error);
					}
				});
			});
			if (result.overloads.length === 0) {
				throw new MultipleOverloadsCompositionError(d1, d2, errors);
			}
			return result;
		});
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var wt = __webpack_require__(3).wt;
	
	var defineComposite = _interopRequire(__webpack_require__(8));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.Modify)) {
			return;
		}
	
		defineComposite(deltaJs);
	
		deltaJs.newOperationType(deltaJs.Delta.Composite, "Modify", {
			construct: function construct() {
				this.deltas = {};
			},
	
			/** {@public}{@abstract}{@method}{@nosideeffects}
	   * @return {DeltaJs#Delta.Modify} - a clone of this delta
	   */
			clone: function clone() {
				var _this = this;
	
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
				Object.keys(this.deltas).forEach(function (prop) {
					result.deltas[prop] = _this.deltas[prop].clone();
				});
				return result;
			},
	
			/** {@public}{@method}
	   * @param target {*}
	   */
			precondition: function precondition(target) {
				return target.value instanceof Object;
			},
	
			/** {@public}{@method}
	   * @param target  {Delta.WritableTarget} - the target to which to apply this delta
	   * @param options {object?}              - the (optional) options for this delta application
	   */
			applyTo: function applyTo(target) {
				var _this = this;
	
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				Object.keys(this.deltas).forEach(function (prop) {
					//if (!options.restrictToProperty || options.restrictToProperty === prop) {
					//	this.deltas[prop].applyTo(wt(target.value, prop),
					//			U.extend({}, options, { restrictToProperty: null }));
					//}
					_this.deltas[prop].applyTo(wt(target.value, prop), options);
				});
			},
	
			/** {@public}{@method}
	   * @param options {object?}
	   * @return {string}
	   */
			toString: function toString(options) {
				var _this = this;
	
				var str = deltaJs.Delta.prototype.toString.call(this, options);
				if (Object.keys(this.deltas).length > 0) {
					var deltas = Object.keys(this.deltas).map(function (p) {
						return _this.deltas[p].toString(options);
					}).join("\n");
					str += "\n" + U.indent(deltas, 4);
				}
				return str;
			},
	
			/** {@public}{@method}
	   * Prepare a specific delta operation with this Modify delta as the base.
	   * @param options {object} - any options; there may be any number of these before the `path` argument
	   * @param path {string}    - the relative path to which to apply this operation
	   * @param arg {*}          - the argument to the operation
	   * @return {DeltaJs#Delta} - the delta resulting from the operation
	   */
			operation: function operation(options, path, arg) {
				var args = [].slice.call(arguments, 0);
				var allOptions = {};
				while (typeof args[0] === "object") {
					U.extend(allOptions, args.shift());
				}
				var _ref = args;
	
				var _ref2 = _slicedToArray(_ref, 2);
	
				path = _ref2[0];
				arg = _ref2[1];
	
				var delta = deltaJs._newDeltaByMethod(allOptions, arg);
				return this._addOperation(allOptions, new Path(path), delta);
			},
	
			/** {@public}{@method}
	   * Get the deepest existing Modify delta corresponding to a relative path.
	   * @param path {Path} - a path relative to this delta
	   * @return {{ delta: DeltaJs#Delta.Modify, rest: Path }} - the deepest Modify delta corresponding to the path,
	   *                                                         and the unused rest of the path
	   */
			deepestModifyDeltaByPath: function deepestModifyDeltaByPath(path) {
				if (U.isUndefined(path.prop) || this.deltas[path.prop].type !== "Modify") {
					return { delta: this, rest: path };
				}
				return this.deltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
			},
	
			/** {@private}{@method}
	   * @param options {object}
	   * @param path    {string}
	   * @param delta   {DeltaJs#Delta}
	   */
			_addOperation: function _addOperation(options, path, delta) {
				/* if there is a 'rest' to the path, set a link in the chain */
				if (path.rest) {
					return this.operation({ method: "modify" }, path.prop)._addOperation(options, path.rest, delta);
				}
	
				/* store the new delta, possibly composed with an existing one */
				this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
				this.deltas[path.prop].options.targetProp = path.prop;
	
				/* return the composed delta if it has an operations interface; otherwise, return the given delta */
				return this.deltas[path.prop] instanceof deltaJs.Delta.Composite ? this.deltas[path.prop] : delta;
			}
		});
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var _TargetJs = __webpack_require__(3);
	
	var WritableTarget = _TargetJs.WritableTarget;
	var ReadableTarget = _TargetJs.ReadableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var DeltaArgApplicationError = __webpack_require__(5).DeltaArgApplicationError;
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs._basicOperationsDefined)) {
			return;
		}
		deltaJs._basicOperationsDefined = true;
	
		defineDelta(deltaJs);
	
		/* convenience definitions for the application and composition functions below ******/
		function t(type1, type2) {
			return function (d1, d2) {
				return d1.type === type1 && d2.type === type2;
			};
		}
		function d(type, fn) {
			if (typeof fn === "string") {
				fn = (function (v) {
					return function (o) {
						return o[v];
					};
				})(fn);
			}
			return function (d1, d2) {
				return new deltaJs.Delta[type](fn && fn({ d1: d1, d2: d2, p1: d1.arg, p2: d2.arg }));
			};
		}
	
		/* declaring the no-op type *********************************************************/
		var NoOp = deltaJs.newOperationType("NoOp");
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof NoOp;
		}, function (d1, d2) {
			return d2.clone();
		});
		deltaJs.newComposition(function (d1, d2) {
			return d2 instanceof NoOp;
		}, function (d1, d2) {
			return d1.clone();
		});
	
		/* declaring the basic operation types **********************************************/
		[["Add", "add", function (target) {
			return U.isUndefined(target.value);
		}], ["Replace", "replace", function (target) {
			return U.isDefined(target.value);
		}]].forEach(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 3);
	
			var Type = _ref2[0];
			var type = _ref2[1];
			var pre = _ref2[2];
	
			deltaJs.newOperationType(Type, {
				construct: function construct() {
					this.deltasToApplyToArg = [];
				},
				precondition: function precondition(target) {
					return target instanceof WritableTarget && pre(target);
				},
				applyTo: function applyTo(target) {
					target.value = this.deltasToApplyToArg.reduce(function (v, d) {
						return d.appliedTo(v);
					}, this.arg);
				},
				clone: function clone() {
					var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
					result.deltasToApplyToArg = this.deltasToApplyToArg.map(function (d) {
						return d;
					});
					return result;
				},
				afterApplying: function afterApplying(delta) {
					var result = this.clone();
					result.deltasToApplyToArg.push(delta); // don't clone, as that would break any facades
					if (result.deltasToApplyToArg.reduce(function (d1, d2) {
						return deltaJs.composed(d1, d2);
					}).precondition(wt(result, "arg")) !== true) {
						throw new DeltaArgApplicationError(delta, this);
					}
					return result;
				},
	
				/** {@public}{@method}
	    * @param options {object?}
	    * @return {string}
	    */
				toString: function toString(options) {
					var _this = this;
	
					var str = deltaJs.Delta.prototype.toString.call(this, options);
					if (Object.keys(this.deltasToApplyToArg).length > 0) {
						var deltas = Object.keys(this.deltasToApplyToArg).map(function (p) {
							return _this.deltasToApplyToArg[p].toString(options);
						}).join("\n");
						str += "\n" + U.indent(deltas, 4);
					}
					return str;
				} });
		});
		deltaJs.newOperationType("Remove", {
			precondition: function precondition(target) {
				return target instanceof WritableTarget && U.isDefined(target.value);
			},
			applyTo: function applyTo(target) {
				target["delete"]();
			}
		});
		deltaJs.newOperationType("Forbid", {
			precondition: function precondition(target) {
				return U.isUndefined(target.value);
			}
		});
	
		/* composition - introducing 'Modify' ***********************************************/
		deltaJs.newComposition(t("Modify", "Modify"), function (d1, d2) {
			var result = d1.clone();
			Object.keys(d2.deltas).forEach(function (prop) {
				result.deltas[prop] = deltaJs.composed(result.deltas[prop], d2.deltas[prop]);
			});
			return result;
		});
	
		/* composition - introducing 'Add' **************************************************/
		deltaJs.newComposition(t("Add", "Modify"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
	
		/* composition - introducing 'Remove' ***********************************************/
		deltaJs.newComposition(t("Modify", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Add", "Remove"), d("Forbid"));
		deltaJs.newComposition(t("Remove", "Add"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
	
		/* composition - introducing 'Forbid' ***********************************************/
		deltaJs.newComposition(t("Remove", "Forbid"), d("Remove"));
		deltaJs.newComposition(t("Forbid", "Add"), d("Add", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Forbid", "Forbid"), d("Forbid"));
	
		/* composition - introducing 'Replace' **********************************************/
		deltaJs.newComposition(t("Modify", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Add", "Replace"), d("Add", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Replace", "Modify"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
		deltaJs.newComposition(t("Replace", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Replace", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var _TargetJs = __webpack_require__(3);
	
	var WritableTarget = _TargetJs.WritableTarget;
	var ReadableTarget = _TargetJs.ReadableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var DeltaArgApplicationError = __webpack_require__(5).DeltaArgApplicationError;
	
	var defineBasicOperations = _interopRequire(__webpack_require__(11));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.PutIntoArray)) {
			return;
		}
	
		defineBasicOperations(deltaJs);
	
		/* convenience definitions for the application and composition functions below */
		function t(type1, type2) {
			return function (d1, d2) {
				return d1.type === type1 && d2.type === type2;
			};
		}
		function d(type, fn) {
			if (typeof fn === "string") {
				fn = (function (v) {
					return function (o) {
						return o[v];
					};
				})(fn);
			}
			return function (d1, d2) {
				return new deltaJs.Delta[type](fn && fn({ d1: d1, d2: d2, p1: d1.arg, p2: d2.arg }));
			};
		}
	
		/* declaring the array operation type ***********************************************/
		deltaJs.newOperationType("PutIntoArray", {
			construct: function construct() {
				this.values = this.options.method ? [{ method: this.options.method, value: this.arg }] : [];
			},
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
				result.values = [];
				this.values.forEach(function (v) {
					result.values.push(v);
				});
				return result;
			},
			precondition: function precondition(target) {
				return U.isDefined(target.value) && Array.isArray(target.value);
			},
			applyTo: function applyTo(target) {
				var arr = target.value;
				this.values.forEach(function (_ref) {
					var method = _ref.method;
					var value = _ref.value;
	
					switch (method) {
						case "prepend":
							{
								arr.unshift(value);
							}break;
						case "insert":
							{
								// 'insert' doesn't *have* to use a random position. Any position will do.
								//  E.g., its implementation could just be the same as for 'append'.
								//  Nonetheless, we use a random position to force the tests to be permissive.
								var position = Math.floor(Math.random() * (arr.length + 1));
								arr.splice(position, 0, value);
							}break;
						case "append":
							{
								arr.push(value);
							}break;
					}
				});
			},
			methods: ["prepend", "insert", "append"]
		});
	
		/* composition - introducing 'PutIntoArray' **************************************************/
		deltaJs.newComposition(t("Add", "PutIntoArray"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
		deltaJs.newComposition(t("Replace", "PutIntoArray"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
		deltaJs.newComposition(t("PutIntoArray", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoArray", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoArray", "PutIntoArray"), function (d1, d2) {
			var result = new deltaJs.Delta.PutIntoArray();
			result.values = d1.values.concat(d2.values);
			return result;
		});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var WritableTarget = __webpack_require__(3).WritableTarget;
	
	var defineBasicOperations = _interopRequire(__webpack_require__(11));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.PutIntoFunction)) {
			return;
		}
	
		defineBasicOperations(deltaJs);
	
		/* convenience definitions for the application and composition functions below */
		function t(type1, type2) {
			return function (d1, d2) {
				return d1.type === type1 && d2.type === type2;
			};
		}
		function d(type, fn) {
			if (typeof fn === "string") {
				fn = (function (v) {
					return function (o) {
						return o[v];
					};
				})(fn);
			}
			return function (d1, d2) {
				return new deltaJs.Delta[type](fn && fn({ d1: d1, d2: d2, p1: d1.arg, p2: d2.arg }));
			};
		}
	
		/* declaring the function operation type */
		deltaJs.newOperationType("PutIntoFunction", {
			construct: function construct() {
				if (this.options.method) {
					this.values = [{
						method: this.options.method,
						value: this.arg
					}];
				} else {
					this.values = [];
				}
			},
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super()
				result.values = [];
				this.values.forEach(function (v) {
					result.values.push(v);
				});
				return result;
			},
			precondition: function precondition(target) {
				return U.isDefined(target.value) && typeof target.value === "function" && (U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
			},
			applyTo: function applyTo(target) {
				if (U.isUndefined(target.value._DeltaJs_functions)) {
					var originalFn = target.value;
					var newFn = (function (_newFn) {
						var _newFnWrapper = function newFn(_x) {
							return _newFn.apply(this, arguments);
						};
	
						_newFnWrapper.toString = function () {
							return _newFn.toString();
						};
	
						return _newFnWrapper;
					})(function () {
						var _this = this;
	
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}
	
						var result;
						newFn._DeltaJs_functions.forEach(function (fn) {
							result = fn.apply(_this, args);
						});
						//noinspection JSUnusedAssignment
						return result;
					});
					newFn._DeltaJs_functions = [function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}
	
						originalFn.apply(this, args);
					}];
					target.value = newFn;
				}
				var arr = target.value._DeltaJs_functions;
				this.values.forEach(function (_ref) {
					var method = _ref.method;
					var value = _ref.value;
	
					switch (method) {
						case "prepend":
							{
								arr.unshift(value);
							}break;
						case "insert":
							{
								// 'insert' doesn't *have* to use a random position. Any position will do.
								//  E.g., its implementation could just be the same as for 'append'.
								//  Nonetheless, we use a random position to force the tests to be permissive.
								var position = Math.floor(Math.random() * (arr.length + 1));
								arr.splice(position, 0, value);
							}break;
						case "append":
							{
								arr.push(value);
							}break;
					}
				});
			},
			methods: ["prepend", "insert", "append"]
		});
	
		/* composition - introducing 'PutIntoFunction' **************************************************/
		deltaJs.newComposition(t("Add", "PutIntoFunction"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
		deltaJs.newComposition(t("Replace", "PutIntoFunction"), function (d1, d2) {
			return d1.afterApplying(d2);
		});
		deltaJs.newComposition(t("PutIntoFunction", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoFunction", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoFunction", "PutIntoFunction"), function (d1, d2) {
			var result = new deltaJs.Delta.PutIntoFunction();
			result.values = d1.values.concat(d2.values);
			return result;
		});
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(6));
	
	var ApplicationOrderCycle = __webpack_require__(5).ApplicationOrderCycle;
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var defineComposite = _interopRequire(__webpack_require__(8));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.DeltaModel)) {
			return;
		}
	
		defineComposite(deltaJs);
	
		var DeltaModel = deltaJs.newOperationType(deltaJs.Delta.Composite, "DeltaModel", {
			construct: function construct() {
				this.graph = new JsGraph();
			},
			clone: function clone() {
				var result = new DeltaModel();
				result.graph = this.graph.clone();
				result.graph.eachVertex(function (id, delta) {
					result.graph.setVertex(id, delta.clone());
				});
				return result;
			},
			applyTo: function applyTo(target) {
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				this.graph.topologically(function (name, subDelta) {
					subDelta.applyTo(target, options);
				});
			},
	
			/** {@public}{@method}
	   * Prepare a specific delta operation with this Modify delta as the base.
	   * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
	   * @param name {string}      - the name of the delta inside the delta model
	   * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
	   * @param path {string}      - the relative path to perform this operation on
	   * @param arg {*}            - the argument to the operation
	   * @return {DeltaJs#Delta} - the delta resulting from the operation
	   */
			operation: function operation(options1, name, options2, path, arg) {
				var args = [].slice.call(arguments);
				var allOptions = {};
				while (typeof args[0] === "object") {
					U.extend(allOptions, args.shift());
				}
				name = args.shift();
				while (typeof args[0] === "object") {
					U.extend(allOptions, args.shift());
				}
				var _ref = args;
	
				var _ref2 = _slicedToArray(_ref, 2);
	
				path = _ref2[0];
				arg = _ref2[1];
	
				var delta = deltaJs._newDeltaByMethod(allOptions, arg);
				return this._addOperation(name, allOptions, new Path(path), delta);
			},
	
			/** {@public}{@method}
	   * @param options {object?}
	   * @return {string}
	   */
			toString: function toString(options) {
				var str = deltaJs.Delta.prototype.toString.call(this, options);
				if (this.graph.vertexCount() > 0) {
					var deltas = "";
					this.graph.topologically(function (name, delta) {
						deltas += "[" + name + "] " + delta.toString(options) + "\n";
					});
					str += "\n" + U.indent(deltas, 4);
				}
				return str;
			},
	
			_addOperation: function _addOperation(name, options, path, delta) {
				var _this = this;
	
				var deltaBase;
	
				/* check if a delta with this name already exists */
				var existingDelta = this.graph.vertexValue(name);
	
				if (U.isDefined(existingDelta) && existingDelta.type === "Modify" && U.isDefined(path.rest)) {
					return existingDelta._addOperation(options, path.rest, delta);
				}
	
				/* if there is a path, create the corresponding chain of deltas */
				if (path.prop) {
					deltaBase = new deltaJs.Delta.Modify();
					deltaBase._addOperation(options, path, delta);
				}
	
				/* if there is already a delta with this name, compose them and return `delta` early */
				if (U.isDefined(existingDelta)) {
					deltaBase = existingDelta.composedWith(deltaBase);
					deltaBase.name = existingDelta.name;
					deltaBase.applicationCondition = existingDelta.applicationCondition;
					this.graph.setVertex(name, deltaBase);
				} else {
	
					/* add the new delta to the delta model */
					deltaBase.name = name;
					this.graph.addVertex(name, deltaBase);
	
					/* connect it to the partial order */
					(options.resolves || []).concat(options.after || []).concat(options.requires || []).forEach(function (subordinateName) {
						_this.graph.createEdge(subordinateName, name);
						if (_this.graph.hasCycle()) {
							_this.graph.removeExistingEdge(subordinateName, name);
							throw new ApplicationOrderCycle(subordinateName, name);
						}
					});
	
					/* application condition and optionally, an eponymous, linked feature */
					var deltaFeature;
					if (options.feature) {
						deltaFeature = deltaJs.newFeature(name, options);
					} else {
						deltaFeature = deltaJs.newFeature("delta__" + name, U.extend({ hidden: true }, options));
					}
					if (options.feature || deltaFeature.conditional) {
						deltaBase.applicationCondition = deltaFeature;
					}
	
					/* extract 'if' from compound options */
					if (U.isDefined(options.resolves)) {
						deltaFeature["if"](options.resolves);
					}
	
					/* extract 'selects' from compound options */
					if (U.isDefined(options.requires)) {
						deltaFeature.selects(options.requires);
					}
				}
	
				return delta;
			}
	
			// TODO: add precondition method which checks 'source' deltas
	
		});
	
		/* composition - introducing 'DeltaModel' */
		// to compose delta models, we simply have one apply after the other
		// without any composability checks; in the future, this may become more clever
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof DeltaModel || d2 instanceof DeltaModel;
		}, function (d1, d2) {
			var result = new DeltaModel();
			result.graph.addNewVertex(1, d1);
			result.graph.addNewVertex(2, d2);
			result.graph.addNewEdge(1, 2);
			return result;
		});
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var ConstraintFailure = __webpack_require__(5).ConstraintFailure;
	
	module.exports = function (deltaJs) {
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (deltaJs._featuresImplemented) {
			return;
		}
		deltaJs._featuresImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		/* given a 'user input' clause, normalize it */
		function _normalizeClause(input) {
			input = Array.isArray(input) ? input : [input];
			input = input.map(function (conj) {
				return conj instanceof deltaJs.Feature ? conj.name : conj;
			});
			return input;
		}
	
		/* code for the mutual selection of features */
		var _if = {}; // feature -> (arrays of arrays; disjunctive normal form)
		var _selected = {}; // feature -> Boolean
		function _addIf(feature) {
			var disjunct = arguments[1] === undefined ? [] : arguments[1];
	
			_conditionsUnsettled = true;
			if (disjunct === true) {
				_selected[feature] = true;
			} else if (disjunct === false) {} else if (_if[feature] !== true) {
				U.a(_if, feature).push(_normalizeClause(disjunct));
			}
		}
		function _addSelects(feature, otherFeatures) {
			_normalizeClause(otherFeatures).forEach(function (other) {
				_addIf(other, feature);
			});
		}
	
		/* code for constraints between features (enforced by errors) */
		var _onlyIf = {}; // feature -> (arrays of arrays; conjunctive normal form)
		var _allowed = {}; // feature -> Boolean
		function _addOnlyIf(feature) {
			var conjunct = arguments[1] === undefined ? [] : arguments[1];
	
			_conditionsUnsettled = true;
			if (conjunct === false) {
				_allowed[feature] = false;
			} else if (conjunct === true) {} else if (_onlyIf[feature] !== false) {
				U.a(_onlyIf, feature).push(_normalizeClause(conjunct));
			}
		}
		function _addRequiredBy(feature, otherFeatures) {
			_normalizeClause(otherFeatures).forEach(function (other) {
				_addOnlyIf(other, feature);
			});
		}
	
		/* code for settling relations between features */
		var _conditionsUnsettled = false;
		function _settleConditions() {
			if (!_conditionsUnsettled) {
				return;
			}
			_conditionsUnsettled = false;
	
			/* fixed point computation of selected features (i.e., propagate them until there is no change) */
			var somethingChanged;
			do {
				somethingChanged = false;
				Object.keys(deltaJs.features).forEach(function (featureName) {
					if (!_selected[featureName]) {
						/* if there are 'if' disjuncts that are selected, this feature is selected */
						if (U.isUndefined(_selected[featureName])) {
							_selected[featureName] = false;
						}
						if ((_if[featureName] || []).some(function (disj) {
							return disj.every(function (conj) {
								return _selected[conj];
							});
						})) {
							_selected[featureName] = true;
							somethingChanged = true;
						}
					}
				});
			} while (somethingChanged);
	
			/* computation of allowed features */
			Object.keys(deltaJs.features).forEach(function (featureName) {
				/* if there are 'onlyIf' conjuncts that are excluded, this feature is excluded */
				_allowed[featureName] = (_onlyIf[featureName] || []).every(function (conj) {
					return conj.some(function (disj) {
						return _selected[disj];
					});
				});
			});
		}
	
		/** {@public}{@class DeltaJs#Feature}
	  *
	  */
		deltaJs.Feature = U.newClass(function Feature(name) {
			var _this = this;
	
			var options = arguments[1] === undefined ? {} : arguments[1];
	
			/* set basic fields */
			this.name = name;
			this.options = options;
	
			/* update conditions */
			Object.keys(options).forEach(function (option) {
				_this.addOption(option, options[option]);
			});
		}, Object.defineProperties({
			select: function select() {
				this["if"](true);
			}
		}, {
			selected: {
				get: function () {
					_settleConditions();
					if (_selected[this.name] && !_allowed[this.name]) {
						throw new ConstraintFailure(this);
					}
					return _selected[this.name];
				},
				enumerable: true,
				configurable: true
			},
			condition: {
				get: function () {
					return _if[this.name];
				},
				enumerable: true,
				configurable: true
			},
			conditional: {
				get: function () {
					return U.a(_if, this.name).length > 0;
				},
				enumerable: true,
				configurable: true
			},
			restricted: {
				get: function () {
					return U.a(_onlyIf, this.name).length > 0;
				},
				enumerable: true,
				configurable: true
			}
		}));
	
		/* restrictions and connections */
		var FEATURE_CONNECTIONS = [["if", [_addIf, _addRequiredBy]], // this selected by other
		["onlyIf", [_addOnlyIf]], // error if this but not other
		["selects", [_addSelects, _addOnlyIf]], // other selected by this
		["requiredBy", [_addRequiredBy]], // error if other but not this
		["iff", [_addIf, _addRequiredBy, _addOnlyIf]] // if and onlyIf
		];
		deltaJs.Feature.prototype.addOption = function (name, value) {
			var _this = this;
	
			FEATURE_CONNECTIONS.forEach(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var n = _ref2[0];
				var methods = _ref2[1];
	
				if (name === n) {
					methods.forEach(function (method) {
						method(_this.name, value);
					});
				}
			});
		};
		FEATURE_CONNECTIONS.forEach(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 1);
	
			var name = _ref2[0];
	
			deltaJs.Feature.prototype[name] = function (value) {
				this.addOption(name, value);
			};
		});
	
		/* the features belonging to this DeltaJs instance */
		deltaJs.features = {}; // name -> Feature
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (U.isDefined(deltaJs.constructor._featuresImplemented)) {
			return;
		}
		deltaJs.constructor._featuresImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		U.extend(deltaJs.constructor.prototype, {
			/** {@public}{@method}
	   * @param name    {string}  - the name of the new feature
	   * @param options {object?} - the (optional) options for the new feature
	   * @return {DeltaJs#Feature} - the object representing the new feature
	   */
			newFeature: function newFeature(name) {
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				/* sanity check*/
				U.assert(U.isUndefined(this.features[name]), "A feature with the name '" + name + "' already exists.");
	
				/* create the new feature */
				return this.features[name] = new this.Feature(name, options);
			}
		});
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	};
	
	// change nothing

	// change nothing

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var rt = __webpack_require__(3).rt;
	
	var defineDeltaModel = _interopRequire(__webpack_require__(14));
	
	module.exports = function (deltaJs) {
	
		defineDeltaModel(deltaJs);
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (deltaJs._variationPointsImplemented) {
			return;
		}
		deltaJs._variationPointsImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		deltaJs._deltaModel = new deltaJs.Delta.DeltaModel();
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (U.isDefined(deltaJs.constructor._variationPointsImplemented)) {
			return;
		}
		deltaJs.constructor._variationPointsImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		U.extend(deltaJs.constructor.prototype, {
	
			/** {@public}{@method}
	   * This method indicates a variation point.
	   * @param name {string} - a hook by which operations from the core delta model can be applied
	   * @param val  {*}      - the initial value of this variation point
	   * @return {*} - the value of this variation point after applying the appropriate deltas
	   */
			vp: function vp(name, val) {
				var root = _defineProperty({}, name, val);
				this._deltaModel.applyTo(rt(root), {
					restrictToProperty: name
				});
				return root[name];
			},
	
			/** {@public}{@method}
	   * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
	   * to any variation points that are encountered. This method is an alias to the eponymous
	   * method on that 'root' delta model. It adds a new operation to it.
	   * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
	   * @param name {string}      - the name of the delta inside the delta model
	   * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
	   * @param path {string}      - the relative path to perform this operation on
	   * @param arg {*}            - the argument to the operation
	   * @return {DeltaJs#Delta} - the delta resulting from the operation
	   */
			operation: function operation(options1, name, options2, path, arg) {
				var _deltaModel;
	
				return (_deltaModel = this._deltaModel).operation.apply(_deltaModel, arguments);
			},
	
			/** {@public}{@method}
	   * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
	   * to any variation points that are encountered. This method is an alias to the eponymous
	   * method on that 'root' delta model. It returns the facade that allows new delta operations
	   * to be added more easily. It presets the 'feature' option to 'true', but this can be
	   * overwritten manually.
	   * @return {function} - the facade to this delta, for easily adding operations
	   */
			"do": function _do() {
				var _deltaModel;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				// from the core delta model, deltas are features by default
				return (_deltaModel = this._deltaModel)["do"].apply(_deltaModel, [{ feature: true }].concat(args));
			}
	
		});
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	module.exports = function (deltaJs) {
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (deltaJs._applicationConditionsImplemented) {
			return;
		}
		deltaJs._applicationConditionsImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		U.extend(deltaJs.Delta.prototype, Object.defineProperties({}, {
			applicationCondition: {
				get: function () {
					return this._applicationCondition;
				},
				set: function (ac) {
					this._applicationCondition = ac;
				},
				enumerable: true,
				configurable: true
			},
			selected: {
				get: function () {
					return U.isUndefined(this.applicationCondition) || this.applicationCondition.selected;
				},
				enumerable: true,
				configurable: true
			}
		}));
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (U.isDefined(deltaJs.constructor._applicationConditionsImplemented)) {
			return;
		}
		deltaJs.constructor._applicationConditionsImplemented = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		U.extend(deltaJs.constructor.prototype, {
	
			select: function select() {
				var _this = this;
	
				for (var _len = arguments.length, features = Array(_len), _key = 0; _key < _len; _key++) {
					features[_key] = arguments[_key];
				}
	
				features.forEach(function (feature) {
					if (Array.isArray(feature)) {
						var _ref;
	
						(_ref = _this).select.apply(_ref, _toConsumableArray(feature));
					} else {
						_this.features[feature].select();
					}
				});
			}
	
		});
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YjNlZjcxMTAzYTlkNGNhZjA1NyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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V0FBVyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQzs7O0FBSTdELEdBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7O0FBRXZDLFNBQU0sb0JBQWM7OztzQ0FBVixRQUFRO0FBQVIsYUFBUTs7O0FBQ2pCLFlBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDN0IsU0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7QUFDM0IscUJBQUssTUFBTSxnQ0FBSSxPQUFPLEVBQUMsQ0FBQztNQUN4QixNQUFNO0FBQ04sWUFBSyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7TUFDaEM7S0FDRCxDQUFDLENBQUM7SUFDSDs7R0FFRCxDQUFDLENBQUM7OztFQUlILEMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWIzZWY3MTEwM2E5ZDRjYWYwNTdcbiAqKi8iLCIvKiBpbXBvcnQgdXRpbGl0aWVzICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbi8qIGltcG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuaW1wb3J0IERlbHRhSnMgZnJvbSAnLi9EZWx0YUpzLmpzJztcblxuXG4vKiBtYWtlIFRhcmdldCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBQYXRoIH0pO1xuXG5cbi8qIG1ha2UgRXJyb3IgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcblx0XHRDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG5cdFx0Q29uc3RyYWludEZhaWx1cmUsIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSxcblx0XHRVbnJlc29sdmVkQ29uZmxpY3QsIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgQXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50RmFpbHVyZSwgQXBwbGljYXRpb25PcmRlckN5Y2xlLFxuICAgICAgICAgICAgICAgICAgICBVbnJlc29sdmVkQ29uZmxpY3QsIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yIH0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwidmFyIFUgPSB7XG5cblx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9iajE7XG5cdH0sXG5cblx0ZGVmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0XHR2YXIga2V5cyA9IHJlc3Quc2xpY2UoMCwgLTEpO1xuXHRcdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRcdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0XHR2YXIgbGFzdCA9IFUubyhvYmplY3QsIC4uLmtleXMuc2xpY2UoMCwgLTEpKTtcblx0XHRpZiAoVS5pc1VuZGVmaW5lZChsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dKSkge1xuXHRcdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0XHR9XG5cdFx0cmV0dXJuIGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV07XG5cdH0sXG5cblx0byhvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIHt9KSB9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnN9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHR0aGlzLl9jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdHRoaXMuX292ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycyA9IFtdO1xuXG5cdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXG59LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHtcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKHR5cGVvZiBkZWx0YS5wcmVjb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICB7c3RyaW5nfVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlIHtvYmplY3R9XG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdW5kZWZpbmVkLCBTdXBlcmNsYXNzLCBuYW1lXSB9XG5cdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IHRoaXMuRGVsdGFbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKFN1cGVyY2xhc3MgfHwgdGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgcHJvcGVydHkgb24gdGhlIHRhcmdldCBvYmplY3Q/ICovXG5cdFx0XHRcdGlmIChvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAmJiAgdGhpcy5vcHRpb25zLnRhcmdldFByb3AgJiZcblx0XHRcdFx0XHRvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAhPT0gdGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7XG5cdFx0XHRcdFx0cHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIChcblx0XHRcdFx0XHRcdFx0ISF0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCA/XG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSA6XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRjbHMub3B0aW9ucyA9IGNscy5wcm90b3R5cGUub3B0aW9ucyA9IHsgLy8gVE9ETzogZG9uJ3QgcHV0IHRoaXMgaW4gcHJvdG90eXBlIGFueW1vcmVcblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHR9O1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0Y2xzLm9wdGlvbnMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgVS5hKHRoaXMuX292ZXJsb2FkcywgbWV0aG9kKS5wdXNoKG5hbWUpIH0pO1xuXG5cdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHQgKi9cblx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuRGVsdGEpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0Zm4odGhpcy5EZWx0YVtuYW1lXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHQgKi9cblx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfSxcblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBDb25zdHJhaW50RmFpbHVyZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb25zdHJhaW50RmFpbHVyZShmZWF0dXJlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25PcmRlckN5Y2xlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uT3JkZXJDeWNsZShmcm9tLCB0bykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHR0aGlzLmZyb20gPSBmcm9tO1xuXHR0aGlzLnRvICAgPSB0bztcbn0pO1xuXG5leHBvcnQgdmFyIERlbHRhQ29uZmxpY3QgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFDb25mbGljdChkZWx0YXMpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFDb25mbGljdCc7XG5cdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yKGRlbHRhKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yJztcblx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgJ2RvJyBpbnRlcmZhY2UgY2FuIGJlIGFjdGl2ZSBwZXIgJyR7ZGVsdGEudHlwZX0nIGRlbHRhLmA7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YSkpIHsgcmV0dXJuIH1cblxuXHRkZWx0YUpzLl9uZXh0RGVsdGFJRCA9IDA7XG5cblx0LyoqIHtAY2xhc3MgRGVsdGF9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YShhcmcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuYXJnICA9IGFyZztcblx0XHR0aGlzLmlkID0gZGVsdGFKcy5fbmV4dERlbHRhSUQrKztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9LCB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcsIHRoaXMub3B0aW9ucykgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiBkZWx0YUpzLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgc3RyICs9IGAg4oC5JHt0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcH3igLpgIH1cblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpICAgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHByb3RlY3RlZH17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgIHsqfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X25ld0RlbHRhQnlNZXRob2Qob3B0aW9ucywgYXJnKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gdGhpcy5fb3ZlcmxvYWRzW29wdGlvbnMubWV0aG9kXVxuXHRcdFx0XHRcdC5tYXAodHlwZSA9PiBuZXcgdGhpcy5EZWx0YVt0eXBlXShhcmcsIG9wdGlvbnMpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5EZWx0YS5PdmVybG9hZGVkKGFyZywgb3B0aW9ucyk7XG5cdFx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0LyoqIHtAY2xhc3N9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSA9IFUubmV3U3ViY2xhc3MoZGVsdGFKcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0ZSguLi5hcmdzKSB7XG5cdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIEltcGxlbWVudCB0aGlzIG1ldGhvZCBpbiBzdWJjbGFzc2VzIHRvIHByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgRGVsdGEuQ29tcG9zaXRlIHN1YmNsYXNzIChpbiB0aGlzIGNhc2U6ICR7dGhpcy50eXBlfSkgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnb3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5maXJzdEFyZ3MpIHtcblx0XHRcdHZhciB0aGlzRGVsdGEgPSB0aGlzO1xuXHRcdFx0Ly8gVGhlIGZhY2FkZSBvYmplY3QgZXhwb3NlcyBvcGVyYXRpb25zIG1ldGhvZHMgZGlyZWN0bHksIGJ1dCBhcmd1bWVudHMgdG9cblx0XHRcdC8vIHRob3NlIG9wZXJhdGlvbnMgY2FuIHBhcnRseSBiZSBnaXZlbiB0aHJvdWdoIGZ1bmN0aW9uLWNhbGwgbm90YXRpb24uXG5cdFx0XHQvLyBUaGVyZWZvcmUsIGEgZmFjYWRlIGlzIGEgZnVuY3Rpb24sIHN0b3JpbmcgYXJndW1lbnRzIHRoYXQgYXJlIGFscmVhZHkgZ2l2ZW4uXG5cdFx0XHR2YXIgZmNkID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YS5kbyguLi5mY2QuX2FyZ3MsIC4uLmFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGZjZC5fYXJncyA9IGZpcnN0QXJncztcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLm9wZXJhdGlvbih7bWV0aG9kfSwgLi4uZmNkLl9hcmdzLCAuLi5maW5hbEFyZ3MpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWx0YTogdGhpc0RlbHRhXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBmY2Q7XG5cdFx0fSxcblx0fSk7XG5cblx0dmFyIG9wZXJhdGlvbk1ldGhvZHMgPSB7fTtcblx0ZGVsdGFKcy5vbk5ld09wZXJhdGlvblR5cGUoKGNscykgPT4ge1xuXHRcdGlmIChjbHMgPT09IGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSB7IHJldHVybiB9XG5cdFx0KGNscy5vcHRpb25zLm1ldGhvZHMgfHwgW10pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9mYWNhZGVEaXNhYmxlZCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IodGhpcykgfVxuXHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kKG1ldGhvZCwgLi4uYXJncyk7XG5cdFx0XHRcdFx0aWYgKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHtcblx0XHRcdFx0XHRcdHZhciBhY3RpdmVTdWJGYWNhZGUgPSB0aGlzLl9hY3RpdmVTdWJGYWNhZGU7XG5cdFx0XHRcdFx0XHR3aGlsZSAoYWN0aXZlU3ViRmFjYWRlKSB7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZVN1YkZhY2FkZS5fZmFjYWRlRGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhY3RpdmVTdWJGYWNhZGUgPSBhY3RpdmVTdWJGYWNhZGUuX2FjdGl2ZVN1YkZhY2FkZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hY3RpdmVTdWJGYWNhZGUgPSBuZXdEZWx0YS5kbygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEsICdPdmVybG9hZGVkJywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5vdmVybG9hZHMgPSBbXSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXHR9KTtcblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fCBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnTW9kaWZ5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5kZWx0YXMgPSB7fSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHQgKi9cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHQvL2lmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0Ly9cdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0Ly9cdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHQvL31cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gYW55IG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0W3BhdGgsIGFyZ10gPSBhcmdzO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCBhcmcpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogR2V0IHRoZSBkZWVwZXN0IGV4aXN0aW5nIE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIGEgcmVsYXRpdmUgcGF0aC5cblx0XHQgKiBAcGFyYW0gcGF0aCB7UGF0aH0gLSBhIHBhdGggcmVsYXRpdmUgdG8gdGhpcyBkZWx0YVxuXHRcdCAqIEByZXR1cm4ge3sgZGVsdGE6IERlbHRhSnMjRGVsdGEuTW9kaWZ5LCByZXN0OiBQYXRoIH19IC0gdGhlIGRlZXBlc3QgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhdGgsXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHVudXNlZCByZXN0IG9mIHRoZSBwYXRoXG5cdFx0ICovXG5cdFx0ZGVlcGVzdE1vZGlmeURlbHRhQnlQYXRoKHBhdGgpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHBhdGgucHJvcCkgfHwgdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS50eXBlICE9PSAnTW9kaWZ5Jykge1xuXHRcdFx0XHRyZXR1cm4geyBkZWx0YTogdGhpcywgcmVzdDogcGF0aCB9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uZGVlcGVzdE1vZGlmeURlbHRhQnlQYXRoKHBhdGgucmVzdCB8fCBuZXcgUGF0aCgpKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbih7IG1ldGhvZDogJ21vZGlmeScgfSwgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0Ll9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5vcHRpb25zLnRhcmdldFByb3AgPSBwYXRoLnByb3A7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdHJldHVybiAodGhpcy5kZWx0YXNbcGF0aC5wcm9wXSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkID0gdHJ1ZTtcblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIG5vLW9wIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgTm9PcCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0W1xuXHRcdFsnQWRkJywgICAgICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XS5mb3JFYWNoKChbVHlwZSwgdHlwZSwgcHJlXSkgPT4ge1xuXHRcdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZyA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLm1hcChkID0+IGQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTsgLy8gZG9uJ3QgY2xvbmUsIGFzIHRoYXQgd291bGQgYnJlYWsgYW55IGZhY2FkZXNcblx0XHRcdFx0aWYgKHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKChkMSwgZDIpID0+IGRlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdCAgICAucHJlY29uZGl0aW9uKHd0KHJlc3VsdCwgJ2FyZycpKSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gZGVsdGFKcy5jb21wb3NlZChyZXN1bHQuZGVsdGFzW3Byb3BdLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLm9wdGlvbnMubWV0aG9kID8gW3sgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLCB2YWx1ZTogdGhpcy5hcmcgfV0gOiBbXTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvQXJyYXknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24pKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubWV0aG9kKSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0ICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLFxuXHQgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdcbiAgICAgICAgICAgICAgIH1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdCAgICAgICAoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdHZhciBEZWx0YU1vZGVsID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCBhcmcpIHtcblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0dmFyIGFsbE9wdGlvbnMgPSB7fTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRbcGF0aCwgYXJnXSA9IGFyZ3M7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXG5cdFx0XHR2YXIgZGVsdGFCYXNlO1xuXG5cdFx0XHQvKiBjaGVjayBpZiBhIGRlbHRhIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzICovXG5cdFx0XHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG5cblxuXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoZXhpc3RpbmdEZWx0YSkgJiYgZXhpc3RpbmdEZWx0YS50eXBlID09PSAnTW9kaWZ5JyAmJiBVLmlzRGVmaW5lZChwYXRoLnJlc3QpKSB7XG5cdFx0XHRcdHJldHVybiBleGlzdGluZ0RlbHRhLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpO1xuXHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IGV4aXN0aW5nRGVsdGEuY29tcG9zZWRXaXRoKGRlbHRhQmFzZSk7XG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuXHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBleGlzdGluZ0RlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnNldFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdFx0ZGVsdGFCYXNlLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHR0aGlzLmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXG5cdFx0XHRcdC8qIGNvbm5lY3QgaXQgdG8gdGhlIHBhcnRpYWwgb3JkZXIgKi9cblx0XHRcdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlKSB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblxuXHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdH0pO1xuXG5cdH0sIHtcblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHQgKi9cblx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0dGhpcy5fZGVsdGFNb2RlbC5hcHBseVRvKHJ0KHJvb3QpLCB7XG5cdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgYWRkcyBhIG5ldyBvcGVyYXRpb24gdG8gaXQuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5vcGVyYXRpb24oLi4uYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgZmFjYWRlIHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHQvLyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsLCBkZWx0YXMgYXJlIGZlYXR1cmVzIGJ5IGRlZmF1bHRcblx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsLmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdHJldHVybiBVLmlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmUpKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3QoLi4uZmVhdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9