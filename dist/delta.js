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
	
	U.extend(DeltaJs, { ApplicationError: ApplicationError, MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError, DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError, MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure, ApplicationOrderCycle: ApplicationOrderCycle, UnresolvedConflict: UnresolvedConflict });
	
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
		} }, {
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
				throw new Error("A Delta.Composite subclass needs to implement the 'operation' method.");
			},
	
			/** {@public}{@property}
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
	
						return {
							newDelta: thisDelta.operation.apply(thisDelta, [{ method: method }].concat(_toConsumableArray(fcd._args), finalArgs)),
							fcdArgs: fcd._args
						};
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
	
						var _applyOperationMethod$apply = (_ref = this)._applyOperationMethod.apply(_ref, [method].concat(args));
	
						var newDelta = _applyOperationMethod$apply.newDelta;
						var fcdArgs = _applyOperationMethod$apply.fcdArgs;
	
						if (newDelta instanceof deltaJs.Delta.Composite) {
							return newDelta["do"]();
						} else {
							var _delta;
	
							return (_delta = this.delta)["do"].apply(_delta, _toConsumableArray(fcdArgs));
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
	
			// In the line directly below, 'this' cannot be used because of a bug in traceur:
			// https://github.com/google/traceur-compiler/issues/1631
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
					result.deltasToApplyToArg.push(delta);
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
	
				/* check if a delta with this name already exists */
				var alreadyExists = U.isDefined(this.graph.vertexValue(name));
	
				/* starting to define the delta that goes directly in the graph */
				var deltaBase = delta;
	
				/* if there is a path, create the corresponding chain of deltas */
				if (path.prop) {
					deltaBase = new deltaJs.Delta.Modify();
					deltaBase._addOperation(options, path, delta);
				}
	
				/* if there is already a delta with this name, compose them and return `delta` early */
				if (alreadyExists) {
					var existingDelta = this.graph.vertexValue(name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YWE3ZWMxMmZmZWNmZTllZDM2MSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRhYTdlYzEyZmZlY2ZlOWVkMzYxXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuXHRcdENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWRDb25mbGljdH0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludEZhaWx1cmUsIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSwgVW5yZXNvbHZlZENvbmZsaWN0IH0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwidmFyIFUgPSB7XG5cblx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9iajE7XG5cdH0sXG5cblx0ZGVmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0XHR2YXIga2V5cyA9IHJlc3Quc2xpY2UoMCwgLTEpO1xuXHRcdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRcdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0XHR2YXIgbGFzdCA9IFUubyhvYmplY3QsIC4uLmtleXMuc2xpY2UoMCwgLTEpKTtcblx0XHRpZiAoVS5pc1VuZGVmaW5lZChsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dKSkge1xuXHRcdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0XHR9XG5cdFx0cmV0dXJuIGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV07XG5cdH0sXG5cblx0byhvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIHt9KSB9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnN9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHR0aGlzLl9jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdHRoaXMuX292ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycyA9IFtdO1xuXG5cdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXG59LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHtcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKHR5cGVvZiBkZWx0YS5wcmVjb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICB7c3RyaW5nfVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlIHtvYmplY3R9XG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdW5kZWZpbmVkLCBTdXBlcmNsYXNzLCBuYW1lXSB9XG5cdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IHRoaXMuRGVsdGFbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKFN1cGVyY2xhc3MgfHwgdGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgcHJvcGVydHkgb24gdGhlIHRhcmdldCBvYmplY3Q/ICovXG5cdFx0XHRcdGlmIChvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAmJiAgdGhpcy5vcHRpb25zLnRhcmdldFByb3AgJiZcblx0XHRcdFx0XHRvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAhPT0gdGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7XG5cdFx0XHRcdFx0cHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIChcblx0XHRcdFx0XHRcdFx0ISF0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCA/XG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSA6XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRjbHMub3B0aW9ucyA9IGNscy5wcm90b3R5cGUub3B0aW9ucyA9IHsgLy8gVE9ETzogZG9uJ3QgcHV0IHRoaXMgaW4gcHJvdG90eXBlIGFueW1vcmVcblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHR9O1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0Y2xzLm9wdGlvbnMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgVS5hKHRoaXMuX292ZXJsb2FkcywgbWV0aG9kKS5wdXNoKG5hbWUpIH0pO1xuXG5cdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHQgKi9cblx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuRGVsdGEpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0Zm4odGhpcy5EZWx0YVtuYW1lXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHQgKi9cblx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBDb25zdHJhaW50RmFpbHVyZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb25zdHJhaW50RmFpbHVyZShmZWF0dXJlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25PcmRlckN5Y2xlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uT3JkZXJDeWNsZShmcm9tLCB0bykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHR0aGlzLmZyb20gPSBmcm9tO1xuXHR0aGlzLnRvICAgPSB0bztcbn0pO1xuXG5leHBvcnQgdmFyIERlbHRhQ29uZmxpY3QgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFDb25mbGljdChkZWx0YXMpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFDb25mbGljdCc7XG5cdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcbn0pO1xuXG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCB3dH0gICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4uL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEpKSB7IHJldHVybiB9XG5cblx0ZGVsdGFKcy5fbmV4dERlbHRhSUQgPSAwO1xuXG5cdC8qKiB7QGNsYXNzIERlbHRhfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGEoYXJnLCBvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLmFyZyAgPSBhcmc7XG5cdFx0dGhpcy5pZCA9IGRlbHRhSnMuX25leHREZWx0YUlEKys7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSAgdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHQgKiBAcGFyYW0gIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHQgKi9cblx0XHRhcHBsaWVkVG8odmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpICAgeyB2YWx1ZSA9IHZhbHVlLnZhbHVlICAgfVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpLCBvcHRpb25zKTtcblx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5jb21wb3NlZCh0aGlzLCBvdGhlcikgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy50YXJnZXRQcm9wKSB7IHN0ciArPSBgIOKAuSR7dGhpcy5vcHRpb25zLnRhcmdldFByb3B94oC6YCB9XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5hcmcpKSAgIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICAgICB7IHN0ciArPSBgICgke3RoaXMuaWR9KWAgICAgICAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgZnJvbSAnLi9EZWx0YS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHByb3RlY3RlZH17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgIHsqfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X25ld0RlbHRhQnlNZXRob2Qob3B0aW9ucywgYXJnKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gdGhpcy5fb3ZlcmxvYWRzW29wdGlvbnMubWV0aG9kXVxuXHRcdFx0XHRcdC5tYXAodHlwZSA9PiBuZXcgdGhpcy5EZWx0YVt0eXBlXShhcmcsIG9wdGlvbnMpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5EZWx0YS5PdmVybG9hZGVkKGFyZywgb3B0aW9ucyk7XG5cdFx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0LyoqIHtAY2xhc3N9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSA9IFUubmV3U3ViY2xhc3MoZGVsdGFKcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0ZSguLi5hcmdzKSB7XG5cdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIEltcGxlbWVudCB0aGlzIG1ldGhvZCBpbiBzdWJjbGFzc2VzIHRvIHByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgRGVsdGEuQ29tcG9zaXRlIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ29wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5maXJzdEFyZ3MpIHtcblx0XHRcdHZhciB0aGlzRGVsdGEgPSB0aGlzO1xuXHRcdFx0Ly8gVGhlIGZhY2FkZSBvYmplY3QgZXhwb3NlcyBvcGVyYXRpb25zIG1ldGhvZHMgZGlyZWN0bHksIGJ1dCBhcmd1bWVudHMgdG9cblx0XHRcdC8vIHRob3NlIG9wZXJhdGlvbnMgY2FuIHBhcnRseSBiZSBnaXZlbiB0aHJvdWdoIGZ1bmN0aW9uLWNhbGwgbm90YXRpb24uXG5cdFx0XHQvLyBUaGVyZWZvcmUsIGEgZmFjYWRlIGlzIGEgZnVuY3Rpb24sIHN0b3JpbmcgYXJndW1lbnRzIHRoYXQgYXJlIGFscmVhZHkgZ2l2ZW4uXG5cdFx0XHR2YXIgZmNkID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YS5kbyguLi5mY2QuX2FyZ3MsIC4uLmFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGZjZC5fYXJncyA9IGZpcnN0QXJncztcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0bmV3RGVsdGE6IHRoaXNEZWx0YS5vcGVyYXRpb24oe21ldGhvZH0sIC4uLmZjZC5fYXJncywgLi4uZmluYWxBcmdzKSxcblx0XHRcdFx0XHRcdGZjZEFyZ3M6ICBmY2QuX2FyZ3Ncblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWx0YTogdGhpc0RlbHRhXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBmY2Q7XG5cdFx0fSxcblx0fSk7XG5cblx0dmFyIG9wZXJhdGlvbk1ldGhvZHMgPSB7fTtcblx0ZGVsdGFKcy5vbk5ld09wZXJhdGlvblR5cGUoKGNscykgPT4ge1xuXHRcdGlmIChjbHMgPT09IGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSB7IHJldHVybiB9XG5cdFx0KGNscy5vcHRpb25zLm1ldGhvZHMgfHwgW10pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciB7bmV3RGVsdGEsIGZjZEFyZ3N9ID0gdGhpcy5fYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5hcmdzKTtcblx0XHRcdFx0XHRpZiAobmV3RGVsdGEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLmRvKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmRlbHRhLmRvKC4uLmZjZEFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0TXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YSwgJ092ZXJsb2FkZWQnLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLm92ZXJsb2FkcyA9IFtdIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cdH0pO1xuXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL092ZXJsb2FkZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuTW9kaWZ5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdNb2RpZnknLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLmRlbHRhcyA9IHt9IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdC8vaWYgKCFvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSB8fCBvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSA9PT0gcHJvcCkge1xuXHRcdFx0XHQvL1x0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHQvL1x0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdC8vfVxuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBhbnkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblx0XHRcdHZhciBhbGxPcHRpb25zID0ge307XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRbcGF0aCwgYXJnXSA9IGFyZ3M7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gcGF0aCAgICB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb24oeyBtZXRob2Q6ICdtb2RpZnknIH0sIHBhdGgucHJvcClcblx0XHRcdFx0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ub3B0aW9ucy50YXJnZXRQcm9wID0gcGF0aC5wcm9wO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG5cdFx0XHRyZXR1cm4gKHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdIDogZGVsdGE7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvTW9kaWZ5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCA9IHRydWU7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICoqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBuby1vcCB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIE5vT3AgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFtcblx0XHRbJ0FkZCcsICAgICAnYWRkJywgICAgICh0YXJnZXQpID0+IFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKV0sXG5cdFx0WydSZXBsYWNlJywgJ3JlcGxhY2UnLCAodGFyZ2V0KSA9PiBVLmlzRGVmaW5lZCAgKHRhcmdldC52YWx1ZSldXG5cdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHQvLyBJbiB0aGUgbGluZSBkaXJlY3RseSBiZWxvdywgJ3RoaXMnIGNhbm5vdCBiZSB1c2VkIGJlY2F1c2Ugb2YgYSBidWcgaW4gdHJhY2V1cjpcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3RyYWNldXItY29tcGlsZXIvaXNzdWVzLzE2MzFcblx0XHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoVHlwZSwge1xuXHRcdFx0Y29uc3RydWN0KCkgICAgICAgICAgeyB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIHByZSh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkgICAgICB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9LFxuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRhZnRlckFwcGx5aW5nKGRlbHRhKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmNsb25lKCk7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucHVzaChkZWx0YSk7XG5cdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiBkZWx0YUpzLmNvbXBvc2VkKGQxLCBkMikpXG5cdFx0XHRcdFx0XHQgICAgLnByZWNvbmRpdGlvbih3dChyZXN1bHQsICdhcmcnKSkgIT09IHRydWUpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmdbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IGRlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5vcHRpb25zLm1ldGhvZCA/IFt7IG1ldGhvZDogdGhpcy5vcHRpb25zLm1ldGhvZCwgdmFsdWU6IHRoaXMuYXJnIH1dIDogW107XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSgpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLm1ldGhvZCkge1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdCAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5vcHRpb25zLm1ldGhvZCxcblx0ICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuYXJnXG4gICAgICAgICAgICAgICB9XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHQgICAgICAgKFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcbmltcG9ydCB7QXBwbGljYXRpb25PcmRlckN5Y2xlfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHR2YXIgRGVsdGFNb2RlbCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdHZhciBhbGxPcHRpb25zID0ge307XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0W3BhdGgsIGFyZ10gPSBhcmdzO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCBhcmcpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblxuXHRcdFx0LyogY2hlY2sgaWYgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyAqL1xuXHRcdFx0dmFyIGFscmVhZHlFeGlzdHMgPSBVLmlzRGVmaW5lZCh0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpKTtcblxuXHRcdFx0Lyogc3RhcnRpbmcgdG8gZGVmaW5lIHRoZSBkZWx0YSB0aGF0IGdvZXMgZGlyZWN0bHkgaW4gdGhlIGdyYXBoICovXG5cdFx0XHR2YXIgZGVsdGFCYXNlID0gZGVsdGE7XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcblx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUsIGNvbXBvc2UgdGhlbSBhbmQgcmV0dXJuIGBkZWx0YWAgZWFybHkgKi9cblx0XHRcdGlmIChhbHJlYWR5RXhpc3RzKSB7XG5cdFx0XHRcdHZhciBleGlzdGluZ0RlbHRhID0gdGhpcy5ncmFwaC52ZXJ0ZXhWYWx1ZShuYW1lKTtcblx0XHRcdFx0ZGVsdGFCYXNlID0gZXhpc3RpbmdEZWx0YS5jb21wb3NlZFdpdGgoZGVsdGFCYXNlKTtcblx0XHRcdFx0ZGVsdGFCYXNlLm5hbWUgPSBleGlzdGluZ0RlbHRhLm5hbWU7XG5cdFx0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGV4aXN0aW5nRGVsdGEuYXBwbGljYXRpb25Db25kaXRpb247XG5cdFx0XHRcdHRoaXMuZ3JhcGguc2V0VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdFx0ZGVsdGFCYXNlLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHR0aGlzLmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXG5cdFx0XHRcdC8qIGNvbm5lY3QgaXQgdG8gdGhlIHBhcnRpYWwgb3JkZXIgKi9cblx0XHRcdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlKSB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblxuXHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdH0pO1xuXG5cdH0sIHtcblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHQgKi9cblx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0dGhpcy5fZGVsdGFNb2RlbC5hcHBseVRvKHJ0KHJvb3QpLCB7XG5cdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgYWRkcyBhIG5ldyBvcGVyYXRpb24gdG8gaXQuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5vcGVyYXRpb24oLi4uYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgZmFjYWRlIHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHQvLyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsLCBkZWx0YXMgYXJlIGZlYXR1cmVzIGJ5IGRlZmF1bHRcblx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsLmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdHJldHVybiBVLmlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmUpKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3QoLi4uZmVhdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9