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
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
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
	var CompositionError = _ErrorJs.CompositionError;
	
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
		this._facadeMethods = []; // method -> (args => Delta)
		this._onNewFacadeMethodListeners = [];
	
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
	  * @param delta        {DeltaJs#Delta}
	  * @param target       {DeltaJs.ReadableTarget}
	  * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
	  *                                      `false` or an instance of `DeltaJs.ApplicationError`
	  */
		_evaluatePrecondition: function _evaluatePrecondition(delta, target) {
			if (delta.precondition) {
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
	  * @param name  {string}   - name of the new operation type
	  * @param Class {Function} - prototype of the new operation class
	  */
		newOperationType: function newOperationType(name, Class) {
			var _this = this;
	
			/* sanity checks */
			U.assert(name[0] === name[0].toUpperCase(), "Delta operation classes must have a name starting with a capital letter -- '" + name + "' does not.");
			U.assert(U.isUndefined(this.Delta[name]), "The '" + name + "' operation type already exists.");
	
			/* store the operation class */
			this.Delta[name] = Class;
	
			/* 'this' alias */
			var thisDeltaJs = this;
	
			/* fetch the given applyTo function (if any) which will be slightly modified */
			var givenApplyTo = Class.prototype.applyTo || function () {};
	
			/* augment the class prototype */
			U.extend(Class.prototype, {
				applyTo: function applyTo(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
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
					givenApplyTo.call(this, target, options);
				},
				type: name
			});
	
			/* create any given methods with default handler */
			var lowercaseName = name[0].toLowerCase() + name.slice(1);
			(Class.prototype.methods || [lowercaseName]).forEach(function (method) {
				_this.newFacadeMethod(method, function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					return _applyConstructor(Class, args);
				});
			});
	
			/* return the new class */
			return Class;
		},
	
		/** {@public}{@method}
	  * @param method  {string}   - method name
	  * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	  */
		newFacadeMethod: function newFacadeMethod(method, handler) {
			/* register  */
			this._facadeMethods.push([method, handler]);
	
			/* notify listeners */
			this._onNewFacadeMethodListeners.forEach(function (fn) {
				fn(method, handler);
			});
		},
	
		/** {@public}{@method}
	  * @param fn {(String, Function) => undefined} -
	  *           a function that takes a name and a function that creates a `DeltaJs#Delta` instance
	  */
		onNewFacadeMethod: function onNewFacadeMethod(fn) {
			this._onNewFacadeMethodListeners.push(fn);
			this._facadeMethods.forEach(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var method = _ref2[0];
				var handler = _ref2[1];
	
				fn(method, handler);
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
			superFn.call(this); // super()
			this.name = "ApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		};
	});
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, function (superFn) {
		return function MultipleOverloadsApplicationError(delta, value) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			superFn.call(this, delta, value); // super()
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
			superFn.call(this, delta, value); // super()
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		};
	});
	
	var DeltaArgApplicationError = exports.DeltaArgApplicationError = U.newSubclass(ApplicationError, function (superFn) {
		return function DeltaArgApplicationError(delta, baseDelta) {
			superFn.call(this, delta, baseDelta.arg); // super()
			this.name = "DeltaArgApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to the type-'" + typeof baseDelta.arg + "'-value of this base delta of type '" + baseDelta.type + "'.";
			this.baseDelta = baseDelta;
		};
	});
	
	var CompositionError = exports.CompositionError = U.newSubclass(Error, function (superFn) {
		return function CompositionError(delta1, delta2) {
			superFn.call(this); // super()
			this.name = "CompositionError";
			this.message = "This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "'.";
			this.delta1 = delta1;
			this.delta2 = delta2;
		};
	});
	
	var MultipleOverloadsCompositionError = exports.MultipleOverloadsCompositionError = U.newSubclass(CompositionError, function (superFn) {
		return function MultipleOverloadsCompositionError(delta1, delta2) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			superFn.call(this, delta1, delta2); // super()
			this.name = "MultipleOverloadsCompositionError";
			this.message = "There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'." + errors.map(function (e) {
				return "\n-- " + e.message;
			}).join("");
			this.errors = errors;
		};
	});
	
	var ConstraintFailure = exports.ConstraintFailure = U.newSubclass(Error, function (superFn) {
		return function ConstraintFailure(feature) {
			superFn.call(this); // super()
			this.name = "ConstraintFailure";
			this.message = "The feature '" + feature.name + "' is both selected and excluded by its constraints.";
			this.feature = feature;
		};
	});
	
	var ApplicationOrderCycle = exports.ApplicationOrderCycle = U.newSubclass(Error, function (superFn) {
		return function ApplicationOrderCycle(from, to) {
			superFn.call(this); // super()
			this.name = "ApplicationOrderCycle";
			this.message = "The new application order between " + from + " and " + to + " created a cycle.";
			this.from = from;
			this.to = to;
		};
	});
	
	var DeltaConflict = exports.DeltaConflict = U.newSubclass(Error, function (superFn) {
		return function DeltaConflict(deltas) {
			superFn.call(this); // super()
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
			superFn.call(this); // super()
			this.name = "MultipleActiveFacadesError";
			this.delta = delta;
			this.message = "Only one 'do' interface can be active per '" + delta.type + "' delta.";
		};
	});
	
	// TODO: use ES6 class notation to implement these
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
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var Delta = (function () {
			function Delta() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Delta);
	
				this.id = ++Delta._nextID;
				this.arg = args[0];
				this.args = args;
			}
	
			_prototypeProperties(Delta, null, {
				clone: {
	
					/** {@public}{@abstract}{@method}{@nosideeffects}
	     * This method should be overwritten by subclasses to make a clone of 'this' delta.
	     * @return {DeltaJs#Delta} - a clone of this delta
	     */
	
					value: function clone() {
						return new this.constructor(this.arg);
					},
					writable: true,
					configurable: true
				},
				appliedTo: {
	
					/** {@public}{@method}{@nosideeffects}
	     * @param  value   {*}       - any given value
	     * @param  options {object?} - the (optional) options for this delta application
	     * @return {*} - the value resulting in this delta being applied to the given `value`
	     */
	
					value: function appliedTo(value) {
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
					writable: true,
					configurable: true
				},
				composedWith: {
	
					/** {@public}{@method}{@nosideeffects}
	     * @param other {DeltaJs#Delta} - the other delta to compose with
	     * @return {DeltaJs#Delta} - the composed delta
	     */
	
					value: function composedWith(other) {
						return deltaJs.composed(this, other);
					},
					writable: true,
					configurable: true
				},
				toString: {
	
					/** {@public}{@method}
	     * @param options {object?}
	     * @return {string}
	     */
	
					value: function toString() {
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						var str = this.type;
						if (options.targetProp) {
							str += " ‹" + options.targetProp + "›";
						}
						if (this.args.length > 0) {
							str += ": " + this.args.map(function (a) {
								return JSON.stringify(a);
							}).join(",");
						}
						if (options.debug) {
							str += " (" + this.id + ")";
						}
						return str;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Delta;
		})();
	
		Delta._nextID = 0;
		deltaJs.Delta = Delta;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var MultipleActiveFacadesError = __webpack_require__(5).MultipleActiveFacadesError;
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.Composite)) {
			return;
		}
	
		defineDelta(deltaJs);
	
		// TODO: replace this file entirely with the new Facade.js
	
		var _overloads = {}; // method -> [delta-classes]
		deltaJs.onNewFacadeMethod(function (method, handler) {
			U.a(_overloads, method).push(handler);
		});
	
		U.extend(deltaJs.constructor.prototype, {
			/** {@protected}{@method}
	   * @param options {object}
	   * @param args    {[*]}
	   * @return {DeltaJs#Delta}
	   */
			_newDeltaByMethod: function _newDeltaByMethod(options) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}
	
				var newDeltas = _overloads[options.method].map(function (handler) {
					return handler.apply(undefined, args);
				});
				if (newDeltas.length === 1) {
					return newDeltas[0];
				} else {
					// newDeltas.length > 1
					var delta = _applyConstructor(this.Delta.Overloaded, args);
					delta.overloads = newDeltas;
					return delta;
				}
			}
		});
	
		var Composite = (function (_deltaJs$Delta) {
			function Composite() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Composite);
	
				_get(Object.getPrototypeOf(Composite.prototype), "constructor", this).apply(this, args);
			}
	
			_inherits(Composite, _deltaJs$Delta);
	
			_prototypeProperties(Composite, null, {
				operation: {
	
					/** {@public}{@abstract}{@method}
	     * Implement this method in subclasses to prepare a specific delta operation with this delta as the base.
	     * @return {DeltaJs#Delta} - the delta resulting from the operation
	     */
	
					value: function operation() {
						throw new Error("A Delta.Composite subclass (in this case: " + this.type + ") " + "needs to implement the 'operation' method.");
					},
					writable: true,
					configurable: true
				},
				"do": {
	
					/** {@public}{@method}
	     * Returns an object that allows new delta operations to be added more easily.
	     * @return {function} - the facade to this delta, for easily adding operations
	     */
	
					value: function _do() {
						for (var _len = arguments.length, firstArgs = Array(_len), _key = 0; _key < _len; _key++) {
							firstArgs[_key] = arguments[_key];
						}
	
						var thisDelta = this;
						// The facade object exposes operations methods directly, but arguments to
						// those operations can partly be given through function-call notation.
						// Therefore, a facade is a function, storing arguments that are already given.
						var fcd = function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}
	
							return thisDelta["do"].apply(thisDelta, _toConsumableArray(fcd._args).concat(args));
						};
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
					},
					writable: true,
					configurable: true
				}
			});
	
			return Composite;
		})(deltaJs.Delta);
	
		deltaJs.Delta.Composite = Composite;
	
		var operationMethods = {};
		deltaJs.onNewFacadeMethod(function (method) {
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
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var Overloaded = (function (_deltaJs$Delta) {
			function Overloaded() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Overloaded);
	
				_get(Object.getPrototypeOf(Overloaded.prototype), "constructor", this).apply(this, args);this.overloads = [];
			}
	
			_inherits(Overloaded, _deltaJs$Delta);
	
			_prototypeProperties(Overloaded, null, {
				clone: {
	
					/** {@public}{@abstract}{@method}{@nosideeffects}
	     * @return {DeltaJs#Delta.Overloaded} - a clone of this delta
	     */
	
					value: function clone() {
						var result = _get(Object.getPrototypeOf(Overloaded.prototype), "clone", this).call(this);
						result.overloads = this.overloads.map(function (delta) {
							return delta.clone();
						});
						return result;
					},
					writable: true,
					configurable: true
				},
				applyTo: {
	
					/** {@public}{@method}
	     * @param target  {Delta.WritableTarget} - the target to which to apply this delta
	     * @param options {object?}              - the (optional) options for this delta application
	     */
	
					value: function applyTo(target) {
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
					writable: true,
					configurable: true
				},
				toString: {
	
					/** {@public}{@method}
	     * @param options {object?}
	     * @return {string}
	     */
	
					value: function toString() {
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						var str = _get(Object.getPrototypeOf(Overloaded.prototype), "toString", this).call(this, options);
						var overloads = this.overloads.map(function (delta) {
							return delta.toString(options);
						}).join("\n");
						str += "\n" + U.indent(overloads, 4);
						return str;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Overloaded;
		})(deltaJs.Delta);
	
		deltaJs.newOperationType("Overloaded", Overloaded);
	
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
	
	var _slice = Array.prototype.slice;
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var Modify = (function (_deltaJs$Delta$Composite) {
			function Modify() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Modify);
	
				_get(Object.getPrototypeOf(Modify.prototype), "constructor", this).apply(this, args);this.deltas = {};
			}
	
			_inherits(Modify, _deltaJs$Delta$Composite);
	
			_prototypeProperties(Modify, null, {
				clone: {
	
					/** {@public}{@abstract}{@method}{@nosideeffects}
	     * @return {DeltaJs#Delta.Modify} - a clone of this delta
	     */
	
					value: function clone() {
						var _this = this;
	
						var result = _get(Object.getPrototypeOf(Modify.prototype), "clone", this).call(this);
						Object.keys(this.deltas).forEach(function (prop) {
							result.deltas[prop] = _this.deltas[prop].clone();
						});
						return result;
					},
					writable: true,
					configurable: true
				},
				precondition: {
	
					/** {@public}{@method}
	     * @param target {*}
	     */
	
					value: function precondition(target) {
						return target.value instanceof Object;
					},
					writable: true,
					configurable: true
				},
				applyTo: {
	
					/** {@public}{@method}
	     * @param target  {Delta.WritableTarget} - the target to which to apply this delta
	     * @param options {object?}              - the (optional) options for this delta application
	     */
	
					value: function applyTo(target) {
						var _this = this;
	
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						Object.keys(this.deltas).forEach(function (prop) {
							if (!options.restrictToProperty || options.restrictToProperty === prop) {
								_this.deltas[prop].applyTo(wt(target.value, prop), U.extend({}, options, { restrictToProperty: null }));
							}
						});
					},
					writable: true,
					configurable: true
				},
				toString: {
	
					/** {@public}{@method}
	     * @param options {object?}
	     * @return {string}
	     */
	
					value: function toString() {
						var _this = this;
	
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						var str = _get(Object.getPrototypeOf(Modify.prototype), "toString", this).call(this, options);
						if (Object.keys(this.deltas).length > 0) {
							var deltas = Object.keys(this.deltas).map(function (p) {
								return _this.deltas[p].toString(U.extend({}, options, { targetProp: p }));
							}).join("\n");
							str += "\n" + U.indent(deltas, 4);
						}
						return str;
					},
					writable: true,
					configurable: true
				},
				operation: {
	
					/** {@public}{@method}
	     * Prepare a specific delta operation with this Modify delta as the base.
	     * @param options {object} - any options; there may be any number of these before the `path` argument
	     * @param path {string}    - the relative path to which to apply this operation
	     * @param args {[*]}       - the arguments to the operation
	     * @return {DeltaJs#Delta} - the delta resulting from the operation
	     */
	
					value: function operation(options, path) {
						for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
							args[_key - 2] = arguments[_key];
						}
	
						// TODO: replace this through the new Facade refactoring
						var argss = [].concat(_slice.call(arguments));
						var allOptions = {};
						while (typeof argss[0] === "object") {
							U.extend(allOptions, argss.shift());
						}
						path = argss.shift();
						var delta = deltaJs._newDeltaByMethod.apply(deltaJs, [allOptions].concat(argss));
						return this._addOperation(allOptions, new Path(path), delta);
					},
					writable: true,
					configurable: true
				},
				deepestModifyDeltaByPath: {
	
					/** {@public}{@method}
	     * Get the deepest existing Modify delta corresponding to a relative path.
	     * @param path {Path} - a path relative to this delta
	     * @return {{ delta: DeltaJs#Delta.Modify, rest: Path }} - the deepest Modify delta corresponding to the path,
	     *                                                         and the unused rest of the path
	     */
	
					value: function deepestModifyDeltaByPath(path) {
						if (U.isUndefined(path.prop) || this.deltas[path.prop].type !== "Modify") {
							return { delta: this, rest: path };
						}
						return this.deltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
					},
					writable: true,
					configurable: true
				},
				_addOperation: {
	
					/** {@private}{@method}
	     * @param options {object}
	     * @param path    {string}
	     * @param delta   {DeltaJs#Delta}
	     */
	
					value: function _addOperation(options, path, delta) {
						/* if there is a 'rest' to the path, set a link in the chain */
						if (path.rest) {
							return this.operation({ method: "modify" }, path.prop)._addOperation(options, path.rest, delta);
						}
	
						/* store the new delta, possibly composed with an existing one */
						this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
	
						/* return the composed delta if it has an operations interface; otherwise, return the given delta */
						return this.deltas[path.prop] instanceof deltaJs.Delta.Composite ? this.deltas[path.prop] : delta;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Modify;
		})(deltaJs.Delta.Composite);
	
		deltaJs.newOperationType("Modify", Modify);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var NoOp = (function (_deltaJs$Delta) {
			function NoOp() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, NoOp);
	
				_get(Object.getPrototypeOf(NoOp.prototype), "constructor", this).apply(this, args);
			}
	
			_inherits(NoOp, _deltaJs$Delta);
	
			return NoOp;
		})(deltaJs.Delta);
	
		deltaJs.newOperationType("NoOp", NoOp);
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
	
			var Class = (function (_deltaJs$Delta2) {
				function Class() {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					_classCallCheck(this, Class);
	
					_get(Object.getPrototypeOf(Class.prototype), "constructor", this).apply(this, args);this.deltasToApplyToArg = [];
				}
	
				_inherits(Class, _deltaJs$Delta2);
	
				_prototypeProperties(Class, null, {
					precondition: {
						value: function precondition(target) {
							return target instanceof WritableTarget && pre(target);
						},
						writable: true,
						configurable: true
					},
					applyTo: {
						value: function applyTo(target) {
							target.value = this.deltasToApplyToArg.reduce(function (v, d) {
								return d.appliedTo(v);
							}, this.arg);
						},
						writable: true,
						configurable: true
					},
					clone: {
						value: function clone() {
							var result = _get(Object.getPrototypeOf(Class.prototype), "clone", this).call(this);
							result.deltasToApplyToArg = this.deltasToApplyToArg.map(function (d) {
								return d;
							});
							return result;
						},
						writable: true,
						configurable: true
					},
					afterApplying: {
						value: function afterApplying(delta) {
							var result = this.clone();
							result.deltasToApplyToArg.push(delta); // don't clone, as that would break any facades // TODO: this will no longer matter after the refactoring
							if (result.deltasToApplyToArg.reduce(function (d1, d2) {
								return deltaJs.composed(d1, d2);
							}).precondition(wt(result, "arg")) !== true) {
								throw new DeltaArgApplicationError(delta, this);
							}
							return result;
						},
						writable: true,
						configurable: true
					},
					toString: {
						value: function toString() {
							var _this = this;
	
							var options = arguments[0] === undefined ? {} : arguments[0];
	
							var str = _get(Object.getPrototypeOf(Class.prototype), "toString", this).call(this, options);
							if (Object.keys(this.deltasToApplyToArg).length > 0) {
								var deltas = Object.keys(this.deltasToApplyToArg).map(function (p) {
									return _this.deltasToApplyToArg[p].toString(options);
								}).join("\n");
								str += "\n" + U.indent(deltas, 4);
							}
							return str;
						},
						writable: true,
						configurable: true
					}
				});
	
				return Class;
			})(deltaJs.Delta);
	
			deltaJs.newOperationType(Type, Class);
		});
	
		var Remove = (function (_deltaJs$Delta2) {
			function Remove() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Remove);
	
				_get(Object.getPrototypeOf(Remove.prototype), "constructor", this).apply(this, args);
			}
	
			_inherits(Remove, _deltaJs$Delta2);
	
			_prototypeProperties(Remove, null, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && U.isDefined(target.value);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						target["delete"]();
					},
					writable: true,
					configurable: true
				}
			});
	
			return Remove;
		})(deltaJs.Delta);
	
		deltaJs.newOperationType("Remove", Remove);
	
		var Forbid = (function (_deltaJs$Delta3) {
			function Forbid() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Forbid);
	
				_get(Object.getPrototypeOf(Forbid.prototype), "constructor", this).apply(this, args);
			}
	
			_inherits(Forbid, _deltaJs$Delta3);
	
			_prototypeProperties(Forbid, null, {
				precondition: {
					value: function precondition(target) {
						return U.isUndefined(target.value);
					},
					writable: true,
					configurable: true
				}
			});
	
			return Forbid;
		})(deltaJs.Delta);
	
		deltaJs.newOperationType("Forbid", Forbid);
	
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
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var PutIntoArray = (function (_deltaJs$Delta) {
			function PutIntoArray() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, PutIntoArray);
	
				_get(Object.getPrototypeOf(PutIntoArray.prototype), "constructor", this).apply(this, args);
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : [];
			}
	
			_inherits(PutIntoArray, _deltaJs$Delta);
	
			_prototypeProperties(PutIntoArray, null, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoArray.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					},
					writable: true,
					configurable: true
				},
				precondition: {
					value: function precondition(target) {
						return U.isDefined(target.value) && Array.isArray(target.value);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
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
					writable: true,
					configurable: true
				}
			});
	
			return PutIntoArray;
		})(deltaJs.Delta);
	
		PutIntoArray.prototype.methods = [];
		deltaJs.newOperationType("PutIntoArray", PutIntoArray);
	
		/* Facade methods ****************************************************************************/
		deltaJs.newFacadeMethod("prepend", function (value) {
			return new PutIntoArray({ method: "prepend", value: value }, {});
		});
		deltaJs.newFacadeMethod("insert", function (value) {
			return new PutIntoArray({ method: "insert", value: value }, {});
		});
		deltaJs.newFacadeMethod("append", function (value) {
			return new PutIntoArray({ method: "append", value: value }, {});
		});
	
		/* composition *******************************************************************************/
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
			return new deltaJs.Delta.PutIntoArray(d1.values.concat(d2.values));
		});
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var PutIntoFunction = (function (_deltaJs$Delta) {
			function PutIntoFunction() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, PutIntoFunction);
	
				_get(Object.getPrototypeOf(PutIntoFunction.prototype), "constructor", this).apply(this, args);
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : [];
			}
	
			_inherits(PutIntoFunction, _deltaJs$Delta);
	
			_prototypeProperties(PutIntoFunction, null, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoFunction.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					},
					writable: true,
					configurable: true
				},
				precondition: {
					value: function precondition(target) {
						return U.isDefined(target.value) && typeof target.value === "function" && (U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
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
					writable: true,
					configurable: true
				}
			});
	
			return PutIntoFunction;
		})(deltaJs.Delta);
	
		PutIntoFunction.prototype.methods = [];
		deltaJs.newOperationType("PutIntoFunction", PutIntoFunction);
	
		/* Facade methods ****************************************************************************/
		deltaJs.newFacadeMethod("prepend", function (value) {
			return new PutIntoFunction({ method: "prepend", value: value }, {});
		});
		deltaJs.newFacadeMethod("insert", function (value) {
			return new PutIntoFunction({ method: "insert", value: value }, {});
		});
		deltaJs.newFacadeMethod("append", function (value) {
			return new PutIntoFunction({ method: "append", value: value }, {});
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
			return new deltaJs.Delta.PutIntoFunction(d1.values.concat(d2.values));
		});
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slice = Array.prototype.slice;
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	
		var DeltaModel = (function (_deltaJs$Delta$Composite) {
			function DeltaModel() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, DeltaModel);
	
				_get(Object.getPrototypeOf(DeltaModel.prototype), "constructor", this).apply(this, args);
				this.graph = new JsGraph();
			}
	
			_inherits(DeltaModel, _deltaJs$Delta$Composite);
	
			_prototypeProperties(DeltaModel, null, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(DeltaModel.prototype), "clone", this).call(this);
						result.graph = this.graph.clone();
						result.graph.eachVertex(function (id, delta) {
							result.graph.setVertex(id, delta.clone());
						});
						return result;
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						this.graph.topologically(function (name, subDelta) {
							subDelta.applyTo(target, options);
						});
					},
					writable: true,
					configurable: true
				},
				operation: {
	
					/** {@public}{@method}
	     * Prepare a specific delta operation with this Modify delta as the base.
	     * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
	     * @param name {string}      - the name of the delta inside the delta model
	     * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
	     * @param path {string}      - the relative path to perform this operation on
	     * @param args {[*]}         - the arguments to the operation
	     * @return {DeltaJs#Delta} - the delta resulting from the operation
	     */
	
					value: function operation(options1, name, options2, path) {
						for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
							args[_key - 4] = arguments[_key];
						}
	
						var argss = [].concat(_slice.call(arguments));
						var allOptions = {};
						while (typeof argss[0] === "object") {
							U.extend(allOptions, argss.shift());
						}
						name = argss.shift();
						while (typeof argss[0] === "object") {
							U.extend(allOptions, argss.shift());
						}
						path = argss.shift();
						var delta = deltaJs._newDeltaByMethod.apply(deltaJs, [allOptions].concat(argss));
						return this._addOperation(name, allOptions, new Path(path), delta);
					},
					writable: true,
					configurable: true
				},
				toString: {
	
					/** {@public}{@method}
	     * @param options {object?}
	     * @return {string}
	     */
	
					value: function toString() {
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						var str = _get(Object.getPrototypeOf(DeltaModel.prototype), "toString", this).call(this, options);
						if (this.graph.vertexCount() > 0) {
							var deltas = "";
							this.graph.topologically(function (name, delta) {
								deltas += "[" + name + "] " + delta.toString(options) + "\n";
							});
							str += "\n" + U.indent(deltas, 4);
						}
						return str;
					},
					writable: true,
					configurable: true
				},
				_addOperation: {
					value: function _addOperation(name, options, path, delta) {
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
					,
					writable: true,
					configurable: true
				}
			});
	
			return DeltaModel;
		})(deltaJs.Delta.Composite);
	
		deltaJs.newOperationType("DeltaModel", DeltaModel);
	
		/* composition */
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
	   * @param args {[*]}         - the arguments to the operation
	   * @return {DeltaJs#Delta} - the delta resulting from the operation
	   */
			operation: function operation(options1, name, options2, path, args) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxOTM1MDA0MzM1OTRjMzE5NWRmNiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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OztBQUNqQixZQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQzdCLFNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTs7O0FBQzNCLHFCQUFLLE1BQU0sZ0NBQUksT0FBTyxFQUFDLENBQUM7TUFDeEIsTUFBTTtBQUNOLFlBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO01BQ2hDO0tBQ0QsQ0FBQyxDQUFDO0lBQ0g7O0dBRUQsQ0FBQyxDQUFDOzs7RUFJSCxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE5MzUwMDQzMzU5NGMzMTk1ZGY2XG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuXHRcdENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsXG5cdFx0VW5yZXNvbHZlZENvbmZsaWN0LCBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludEZhaWx1cmUsIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSxcbiAgICAgICAgICAgICAgICAgICAgVW5yZXNvbHZlZENvbmZsaWN0LCBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8ob2JqZWN0LCAuLi5rZXlzLnNsaWNlKDAsIC0xKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfSxcblxuXHRhKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywgW10pIH0sXG5cblx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHR9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Db21wb3NpdGUuanMnO1xuaW1wb3J0IGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHMuXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0dGhpcy5fY29tcG9zaXRpb25zICA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblx0dGhpcy5fZmFjYWRlTWV0aG9kcyA9IFtdOyAvLyBtZXRob2QgLT4gKGFyZ3MgPT4gRGVsdGEpXG5cdHRoaXMuX29uTmV3RmFjYWRlTWV0aG9kTGlzdGVuZXJzICA9IFtdO1xuXG5cdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXG59LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHtcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgICAgICAgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0ICAgICAgIHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKGRlbHRhLnByZWNvbmRpdGlvbikge1xuXHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBBcHBsaWNhdGlvbkVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdHJldHVybiBuZXcgQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbmFtZSAge3N0cmluZ30gICAtIG5hbWUgb2YgdGhlIG5ldyBvcGVyYXRpb24gdHlwZVxuXHQgKiBAcGFyYW0gQ2xhc3Mge0Z1bmN0aW9ufSAtIHByb3RvdHlwZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBDbGFzcykge1xuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9uIGNsYXNzZXMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLS0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5EZWx0YVtuYW1lXSksXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIHN0b3JlIHRoZSBvcGVyYXRpb24gY2xhc3MgKi9cblx0XHR0aGlzLkRlbHRhW25hbWVdID0gQ2xhc3M7XG5cblx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0LyogZmV0Y2ggdGhlIGdpdmVuIGFwcGx5VG8gZnVuY3Rpb24gKGlmIGFueSkgd2hpY2ggd2lsbCBiZSBzbGlnaHRseSBtb2RpZmllZCAqL1xuXHRcdHZhciBnaXZlbkFwcGx5VG8gPSBDbGFzcy5wcm90b3R5cGUuYXBwbHlUbyB8fCAoKCk9Pnt9KTtcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdFUuZXh0ZW5kKENsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXG5cdFx0XHRcdC8qIE9LLCB0aGVuIGFwcGx5IGl0IGlmIGEgbWV0aG9kIHRvIGRvIHNvIHdhcyBpbmNsdWRlZCBpbiB0aGUgb3BlcmF0aW9uICovXG5cdFx0XHRcdGdpdmVuQXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCwgb3B0aW9ucyk7XG5cblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChDbGFzcy5wcm90b3R5cGUubWV0aG9kcyB8fCBbbG93ZXJjYXNlTmFtZV0pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0dGhpcy5uZXdGYWNhZGVNZXRob2QobWV0aG9kLCAoLi4uYXJncykgPT4gbmV3IENsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIENsYXNzO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdGYWNhZGVNZXRob2QobWV0aG9kLCBoYW5kbGVyKSB7XG5cdFx0LyogcmVnaXN0ZXIgICovXG5cdFx0dGhpcy5fZmFjYWRlTWV0aG9kcy5wdXNoKFttZXRob2QsIGhhbmRsZXJdKTtcblxuXHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHR0aGlzLl9vbk5ld0ZhY2FkZU1ldGhvZExpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihtZXRob2QsIGhhbmRsZXIpIH0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGZuIHsoU3RyaW5nLCBGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtXG5cdCAqICAgICAgICAgICBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBuYW1lIGFuZCBhIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHQgKi9cblx0b25OZXdGYWNhZGVNZXRob2QoZm4pIHtcblx0XHR0aGlzLl9vbk5ld0ZhY2FkZU1ldGhvZExpc3RlbmVycy5wdXNoKGZuKTtcblx0XHR0aGlzLl9mYWNhZGVNZXRob2RzLmZvckVhY2goKFttZXRob2QsIGhhbmRsZXJdKSA9PiB7XG5cdFx0XHRmbihtZXRob2QsIGhhbmRsZXIpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0ICovXG5cdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdHRoaXMuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkMSB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZmlyc3QgZGVsdGFcblx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0ICovXG5cdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdC8qIGhhbmRsZSB0aGUgY2FzZXMgd2hlcmUgb25lIG9yIGJvdGggYXJndW1lbnRzIGFyZSB1bmRlZmluZWQgKi9cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMSkpIHsgZDEgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cblx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHR2YXIgc3VjY2VzcyA9IHRoaXMuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdHJldHVybiBjb21wb3NlRm4oZDEsIGQyKTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH0sXG5cdHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBcIlwiO1xuXHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLnByb3ApKSB7XG5cdFx0XHRyZXN1bHQgKz0gdGhpcy5wcm9wO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZSBkZWx0YS10eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpOyAvLyBzdXBlcigpXG5cdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCBiYXNlRGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTsgLy8gc3VwZXIoKVxuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGExLCBkZWx0YTIpOyAvLyBzdXBlcigpXG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29uc3RyYWludEZhaWx1cmUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29uc3RyYWludEZhaWx1cmUoZmVhdHVyZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25PcmRlckN5Y2xlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uT3JkZXJDeWNsZShmcm9tLCB0bykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdHRoaXMuZnJvbSA9IGZyb207XG5cdHRoaXMudG8gICA9IHRvO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFDb25mbGljdCA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUNvbmZsaWN0KGRlbHRhcykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ0RlbHRhQ29uZmxpY3QnO1xuXHR2YXIgZGVsdGFOYW1lcyA9IGRlbHRhcy5tYXAoZCA9PiBgJyR7ZC5uYW1lfSdgKS5qb2luKCcsJyk7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBpcyBhbiB1bnJlc29sdmVkIGNvbmZsaWN0IGJldHdlZW4gZGVsdGFzICR7ZGVsdGFOYW1lc30uYDtcblx0dGhpcy5kZWx0YXMgPSBkZWx0YXM7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvcihkZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7IC8vIHN1cGVyKClcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yJztcblx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgJ2RvJyBpbnRlcmZhY2UgY2FuIGJlIGFjdGl2ZSBwZXIgJyR7ZGVsdGEudHlwZX0nIGRlbHRhLmA7XG59KTtcblxuLy8gVE9ETzogdXNlIEVTNiBjbGFzcyBub3RhdGlvbiB0byBpbXBsZW1lbnQgdGhlc2VcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YSkpIHsgcmV0dXJuIH1cblxuXHRjbGFzcyBEZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHR0aGlzLmlkID0gKytEZWx0YS5fbmV4dElEO1xuXHRcdFx0dGhpcy5hcmcgPSBhcmdzWzBdO1xuXHRcdFx0dGhpcy5hcmdzID0gYXJncztcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcpIH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKG9wdGlvbnMudGFyZ2V0UHJvcCkgICB7IHN0ciArPSBgIOKAuSR7b3B0aW9ucy50YXJnZXRQcm9wfeKAumAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdH1cblx0RGVsdGEuX25leHRJRCA9IDA7XG5cdGRlbHRhSnMuRGVsdGEgPSBEZWx0YTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXG5cdC8vIFRPRE86IHJlcGxhY2UgdGhpcyBmaWxlIGVudGlyZWx5IHdpdGggdGhlIG5ldyBGYWNhZGUuanNcblxuXG5cdHZhciBfb3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0ZGVsdGFKcy5vbk5ld0ZhY2FkZU1ldGhvZCgobWV0aG9kLCBoYW5kbGVyKSA9PiB7XG5cdFx0VS5hKF9vdmVybG9hZHMsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblx0fSk7XG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gYXJncyAgICB7WypdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X25ld0RlbHRhQnlNZXRob2Qob3B0aW9ucywgLi4uYXJncykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IF9vdmVybG9hZHNbb3B0aW9ucy5tZXRob2RdLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoLi4uYXJncykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHZhciBkZWx0YSA9IG5ldyB0aGlzLkRlbHRhLk92ZXJsb2FkZWQoLi4uYXJncyk7XG5cdFx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Y2xhc3MgQ29tcG9zaXRlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykgeyBzdXBlciguLi5hcmdzKSB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBJbXBsZW1lbnQgdGhpcyBtZXRob2QgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIERlbHRhLkNvbXBvc2l0ZSBzdWJjbGFzcyAoaW4gdGhpcyBjYXNlOiAke3RoaXMudHlwZX0pIGAgK1xuXHRcdFx0ICAgICAgICAgICAgICAgIGBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uZmlyc3RBcmdzKSB7XG5cdFx0XHR2YXIgdGhpc0RlbHRhID0gdGhpcztcblx0XHRcdC8vIFRoZSBmYWNhZGUgb2JqZWN0IGV4cG9zZXMgb3BlcmF0aW9ucyBtZXRob2RzIGRpcmVjdGx5LCBidXQgYXJndW1lbnRzIHRvXG5cdFx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdFx0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHRcdFx0dmFyIGZjZCA9ICguLi5hcmdzKSA9PiB0aGlzRGVsdGEuZG8oLi4uZmNkLl9hcmdzLCAuLi5hcmdzKTtcblx0XHRcdGZjZC5fYXJncyA9IGZpcnN0QXJncztcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLm9wZXJhdGlvbih7bWV0aG9kfSwgLi4uZmNkLl9hcmdzLCAuLi5maW5hbEFyZ3MpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkZWx0YTogdGhpc0RlbHRhXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBmY2Q7XG5cdFx0fVxuXHR9XG5cdGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlID0gQ29tcG9zaXRlO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdGYWNhZGVNZXRob2QoKG1ldGhvZCkgPT4ge1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSkpIHtcblx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9mYWNhZGVEaXNhYmxlZCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IodGhpcykgfVxuXHRcdFx0XHR2YXIgbmV3RGVsdGEgPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmFyZ3MpO1xuXHRcdFx0XHRpZiAobmV3RGVsdGEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkge1xuXHRcdFx0XHRcdHZhciBhY3RpdmVTdWJGYWNhZGUgPSB0aGlzLl9hY3RpdmVTdWJGYWNhZGU7XG5cdFx0XHRcdFx0d2hpbGUgKGFjdGl2ZVN1YkZhY2FkZSkge1xuXHRcdFx0XHRcdFx0YWN0aXZlU3ViRmFjYWRlLl9mYWNhZGVEaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRhY3RpdmVTdWJGYWNhZGUgPSBhY3RpdmVTdWJGYWNhZGUuX2FjdGl2ZVN1YkZhY2FkZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FjdGl2ZVN1YkZhY2FkZSA9IG5ld0RlbHRhLmRvKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGNsYXNzIE92ZXJsb2FkZWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7IHN1cGVyKC4uLmFyZ3MpOyB0aGlzLm92ZXJsb2FkcyA9IFtdOyB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblx0fVxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ092ZXJsb2FkZWQnLCBPdmVybG9hZGVkKTtcblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fCBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0Y2xhc3MgTW9kaWZ5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncyk7IHRoaXMuZGVsdGFzID0ge307IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0XG5cdFx0XHRcdFx0LmtleXModGhpcy5kZWx0YXMpXG5cdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcoVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgdGFyZ2V0UHJvcDogcCB9KSkpXG5cdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gYW55IG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19ICAgICAgIC0gdGhlIGFyZ3VtZW50cyB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCAuLi5hcmdzKSB7IC8vIFRPRE86IHJlcGxhY2UgdGhpcyB0aHJvdWdoIHRoZSBuZXcgRmFjYWRlIHJlZmFjdG9yaW5nXG5cdFx0XHR2YXIgYXJnc3MgPSBbLi4uYXJndW1lbnRzXTtcblx0XHRcdHZhciBhbGxPcHRpb25zID0ge307XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdHBhdGggPSBhcmdzcy5zaGlmdCgpO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCAuLi5hcmdzcyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEdldCB0aGUgZGVlcGVzdCBleGlzdGluZyBNb2RpZnkgZGVsdGEgY29ycmVzcG9uZGluZyB0byBhIHJlbGF0aXZlIHBhdGguXG5cdFx0ICogQHBhcmFtIHBhdGgge1BhdGh9IC0gYSBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgZGVsdGFcblx0XHQgKiBAcmV0dXJuIHt7IGRlbHRhOiBEZWx0YUpzI0RlbHRhLk1vZGlmeSwgcmVzdDogUGF0aCB9fSAtIHRoZSBkZWVwZXN0IE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXRoLFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSB1bnVzZWQgcmVzdCBvZiB0aGUgcGF0aFxuXHRcdCAqL1xuXHRcdGRlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwYXRoLnByb3ApIHx8IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0udHlwZSAhPT0gJ01vZGlmeScpIHtcblx0XHRcdFx0cmV0dXJuIHsgZGVsdGE6IHRoaXMsIHJlc3Q6IHBhdGggfTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmRlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoLnJlc3QgfHwgbmV3IFBhdGgoKSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbih7IG1ldGhvZDogJ21vZGlmeScgfSwgcGF0aC5wcm9wKVxuXHRcdFx0XHQgICAgICAgICAgIC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdH1cblx0fVxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ01vZGlmeScsIE1vZGlmeSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQgPSB0cnVlO1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqKioqKiovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgbm8tb3AgdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGNsYXNzIE5vT3AgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHsgY29uc3RydWN0b3IoLi4uYXJncykgeyBzdXBlciguLi5hcmdzKSB9IH1cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJywgTm9PcCk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRbICAgWydBZGQnLCAgICAgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFsnUmVwbGFjZScsICdyZXBsYWNlJywgKHRhcmdldCkgPT4gVS5pc0RlZmluZWQgICh0YXJnZXQudmFsdWUpXVxuXHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0Y2xhc3MgQ2xhc3MgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncyk7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW107IH1cblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIHByZSh0YXJnZXQpIH1cblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9XG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTsgLy8gZG9uJ3QgY2xvbmUsIGFzIHRoYXQgd291bGQgYnJlYWsgYW55IGZhY2FkZXMgLy8gVE9ETzogdGhpcyB3aWxsIG5vIGxvbmdlciBtYXR0ZXIgYWZ0ZXIgdGhlIHJlZmFjdG9yaW5nXG5cdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnXG5cdFx0XHRcdFx0XHQucmVkdWNlKChkMSwgZDIpID0+IGRlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Rcblx0XHRcdFx0XHRcdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0Lm1hcChwID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG9wdGlvbnMpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIENsYXNzKTtcblx0fSk7XG5cdGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncykgfVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH1cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCBSZW1vdmUpO1xuXHRjbGFzcyBGb3JiaWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7IHN1cGVyKC4uLmFyZ3MpIH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywgRm9yYmlkKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSBkZWx0YUpzLmNvbXBvc2VkKHJlc3VsdC5kZWx0YXNbcHJvcF0sIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdFB1dEludG9BcnJheS5wcm90b3R5cGUubWV0aG9kcyA9IFtdO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIFB1dEludG9BcnJheSk7XG5cblx0LyogRmFjYWRlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSwge30pKTtcblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpKTtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRjbGFzcyBQdXRJbnRvRnVuY3Rpb24gZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdFB1dEludG9GdW5jdGlvbi5wcm90b3R5cGUubWV0aG9kcyA9IFtdO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIFB1dEludG9GdW5jdGlvbik7XG5cblx0LyogRmFjYWRlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSwge30pKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcykpO1xuXHR9KTtcblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0Y2xhc3MgRGVsdGFNb2RlbCBleHRlbmRzIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH1cblxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19ICAgICAgICAgLSB0aGUgYXJndW1lbnRzIHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgLi4uYXJncykge1xuXHRcdFx0dmFyIGFyZ3NzID0gWy4uLmFyZ3VtZW50c107XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJnc3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gYXJnc3Muc2hpZnQoKTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3NzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0cGF0aCA9IGFyZ3NzLnNoaWZ0KCk7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIC4uLmFyZ3NzKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgYWxsT3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0dmFyIGRlbHRhQmFzZTtcblxuXHRcdFx0LyogY2hlY2sgaWYgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyAqL1xuXHRcdFx0dmFyIGV4aXN0aW5nRGVsdGEgPSB0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpO1xuXG5cblxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpICYmIGV4aXN0aW5nRGVsdGEudHlwZSA9PT0gJ01vZGlmeScgJiYgVS5pc0RlZmluZWQocGF0aC5yZXN0KSkge1xuXHRcdFx0XHRyZXR1cm4gZXhpc3RpbmdEZWx0YS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcblx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUsIGNvbXBvc2UgdGhlbSBhbmQgcmV0dXJuIGBkZWx0YWAgZWFybHkgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBleGlzdGluZ0RlbHRhLmNvbXBvc2VkV2l0aChkZWx0YUJhc2UpO1xuXHRcdFx0XHRkZWx0YUJhc2UubmFtZSA9IGV4aXN0aW5nRGVsdGEubmFtZTtcblx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcblx0XHRcdFx0dGhpcy5ncmFwaC5zZXRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0LyogYWRkIHRoZSBuZXcgZGVsdGEgdG8gdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcblx0XHRcdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblxuXHRcdFx0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG5cdFx0XHRcdChvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdKS5jb25jYXQob3B0aW9uc1snYWZ0ZXInXSB8fCBbXSkuY29uY2F0KG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW10pLmZvckVhY2goKHN1Ym9yZGluYXRlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsbHksIGFuIGVwb255bW91cywgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdFx0dmFyIGRlbHRhRmVhdHVyZTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSkgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggYGRlbHRhX18ke25hbWV9YCwgVS5leHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZXh0cmFjdCAnaWYnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuaWYob3B0aW9uc1sncmVzb2x2ZXMnXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdzZWxlY3RzJyBmcm9tIGNvbXBvdW5kIG9wdGlvbnMgKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0ZGVsdGFGZWF0dXJlLnNlbGVjdHMob3B0aW9uc1sncmVxdWlyZXMnXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdH1cblxuXHRcdC8vIFRPRE86IGFkZCBwcmVjb25kaXRpb24gbWV0aG9kIHdoaWNoIGNoZWNrcyAnc291cmNlJyBkZWx0YXNcblx0fVxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0RlbHRhTW9kZWwnLCBEZWx0YU1vZGVsKTtcblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgRGVsdGFNb2RlbCB8fCBkMiBpbnN0YW5jZW9mIERlbHRhTW9kZWwpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0VS5hKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBjb25zdHJhaW50cyBiZXR3ZWVuIGZlYXR1cmVzIChlbmZvcmNlZCBieSBlcnJvcnMpICovXG5cdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRPbmx5SWYoZmVhdHVyZSwgY29uanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlXSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfb25seUlmW2ZlYXR1cmVdICE9PSBmYWxzZSkge1xuXHRcdFx0VS5hKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZE9ubHlJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHNldHRsaW5nIHJlbGF0aW9ucyBiZXR3ZWVuIGZlYXR1cmVzICovXG5cdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRpZiAoIV9jb25kaXRpb25zVW5zZXR0bGVkKSB7IHJldHVybiB9XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0ZG8ge1xuXHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSkgeyBfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0fSk7XG5cblx0fSwge1xuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIFUuYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0c2VsZWN0KCkgeyB0aGlzLmlmKHRydWUpIH1cblx0fSk7XG5cblxuXHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdGNvbnN0IEZFQVRVUkVfQ09OTkVDVElPTlMgPSBbXG5cdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzLCBfYWRkT25seUlmXSAgICAgICAgICAgIF0sIC8vIG90aGVyIHNlbGVjdGVkIGJ5IHRoaXNcblx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAobmFtZSA9PT0gbikge1xuXHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdH07XG5cdH0pO1xuXG5cblx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKi9cblx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7cnR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblxuXHRkZWZpbmVEZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cdGRlbHRhSnMuX2RlbHRhTW9kZWwgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdCAqL1xuXHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHR0aGlzLl9kZWx0YU1vZGVsLmFwcGx5VG8ocnQocm9vdCksIHtcblx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCBhZGRzIGEgbmV3IG9wZXJhdGlvbiB0byBpdC5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19ICAgICAgICAgLSB0aGUgYXJndW1lbnRzIHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJncykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwub3BlcmF0aW9uKC4uLmFyZ3VtZW50cyk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIGZhY2FkZSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0ICogb3ZlcndyaXR0ZW4gbWFudWFsbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0Ly8gZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCwgZGVsdGFzIGFyZSBmZWF0dXJlcyBieSBkZWZhdWx0XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5kbyh7IGZlYXR1cmU6IHRydWUgfSwgLi4uYXJncyk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YXJpYXRpb25Qb2ludHMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cblx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdHNldCBhcHBsaWNhdGlvbkNvbmRpdGlvbihhYykgeyB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFjIH0sXG5cblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gVS5pc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0ZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmZWF0dXJlKSkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==