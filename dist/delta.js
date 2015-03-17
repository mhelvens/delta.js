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
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	  * @param Superclass {Function?} - optional superclass
	  * @param name       {string}    - name of the new operation type
	  * @param prototype  {object}    - prototype of the new operation class
	  */
		newOperationType: function newOperationType(Superclass, name, prototype) {
			var _this7 = this;
	
			if (typeof Superclass === "string") {
				var _ref = [this.Delta, Superclass, name];
	
				var _ref2 = _slicedToArray(_ref, 3);
	
				Superclass = _ref2[0];
				name = _ref2[1];
				prototype = _ref2[2];
			}
			if (!prototype) {
				prototype = {};
			}
	
			/* 'this' alias */
			var thisDeltaJs = this;
	
			/* sanity checks */
			U.assert(name[0] === name[0].toUpperCase(), "Delta operations must have a name starting with a capital letter -- '" + name + "' does not.");
			U.assert(!this.Delta[name], "The '" + name + "' operation type already exists.");
	
			/* Delta subclass */
	
			var Cls = (function (Superclass) {
				function Cls(arg) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					_classCallCheck(this, Cls);
	
					// TODO: ...args instead of arg, and remove options
					_get(Object.getPrototypeOf(Cls.prototype), "constructor", this).call(this, options, arg);
					if (this.construct) {
						this.construct();
					}
				}
	
				_inherits(Cls, Superclass);
	
				return Cls;
			})(Superclass);
	
			this.Delta[name] = Cls;
			U.extend(Cls.prototype, prototype, {
				applyTo: function applyTo(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					/* should this delta only be applied for a specific property on the target object? */
					if (options.restrictToProperty && this.options.targetProp && options.restrictToProperty !== this.options.targetProp) {
						return;
					} // TODO: remove options
	
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
						var newOptions = !!this.options.targetProp ? // TODO: remove options
						U.extend({}, options, { restrictToProperty: null }) : options;
						prototype.applyTo.call(this, target, newOptions);
					}
				},
				type: name
			});
	
			/* create the given methods with default handler */
			(prototype.methods || [name[0].toLowerCase() + name.slice(1)]).forEach(function (method) {
				_this7.newFacadeMethod(method, function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					return _applyConstructor(Cls, args);
				});
			});
	
			/* return the new class */
			return Cls;
		},
	
		/** {@public}{@method}
	  * @param method  {string}    - method name
	  * @param handler {Function}  - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
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
		deltaJs.Delta = U.newClass(function Delta(options) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}
	
			this.id = deltaJs._nextDeltaID++;
			this.arg = args[0];
			this.args = args;
			this.options = options;
		}, {
	
			/** {@public}{@abstract}{@method}{@nosideeffects}
	   * This method should be overwritten by subclasses to make a clone of 'this' delta.
	   * @return {DeltaJs#Delta} - a clone of this delta
	   */
			clone: function clone() {
				return new this.constructor(this.arg, this.options);
			}, // TODO: remove options
	
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
				} // TODO: pass targetProp through options argument
				if (U.isDefined(this.arg)) {
					str += ": " + JSON.stringify(this.arg);
				} // TODO: and remove this.options
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
	
		var _overloads = {}; // method -> [delta-classes]
		deltaJs.onNewFacadeMethod(function (method, handler) {
			U.a(_overloads, method).push(handler);
		});
	
		U.extend(deltaJs.constructor.prototype, {
			/** {@protected}{@method}
	   * @param options {object}
	   * @param arg     {*}
	   * @return {DeltaJs#Delta}
	   */
			_newDeltaByMethod: function _newDeltaByMethod(options, arg) {
				var newDeltas = _overloads[options.method].map(function (handler) {
					return handler(arg, options);
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
	
						return thisDelta.operation.apply(thisDelta, [{ method: method }].concat(_toConsumableArray(fcd._args), finalArgs)); // TODO: (method)
					},
					delta: thisDelta
				});
				return fcd;
			} });
	
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
	
		deltaJs.newOperationType("Overloaded", {
			construct: function construct() {
				this.overloads = [];
			},
	
			/** {@public}{@abstract}{@method}{@nosideeffects}
	   * @return {DeltaJs#Delta.Overloaded} - a clone of this delta
	   */
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super.clone() // TODO: remove options
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
	
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super() // TODO: remove options
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
				this.deltas[path.prop].options.targetProp = path.prop; // TODO: remove options
	
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
					var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super() // TODO; remove options
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
		var PutIntoArray = deltaJs.newOperationType("PutIntoArray", {
			construct: function construct() {
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : []; // TODO: (method)
			},
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super() // TODO: remove options
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
			methods: []
		});
	
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
		var PutIntoFunction = deltaJs.newOperationType("PutIntoFunction", {
			construct: function construct() {
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : []; // TODO: (method)
			},
			clone: function clone() {
				var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options); // super() // TODO: remove options
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
			methods: []
		});
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhYTZmYTViNWZmY2FlOTViZTExMCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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dGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYWE2ZmE1YjVmZmNhZTk1YmUxMTBcbiAqKi8iLCIvKiBpbXBvcnQgdXRpbGl0aWVzICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbi8qIGltcG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuaW1wb3J0IERlbHRhSnMgZnJvbSAnLi9EZWx0YUpzLmpzJztcblxuXG4vKiBtYWtlIFRhcmdldCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBQYXRoIH0pO1xuXG5cbi8qIG1ha2UgRXJyb3IgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcblx0XHRDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG5cdFx0Q29uc3RyYWludEZhaWx1cmUsIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSxcblx0XHRVbnJlc29sdmVkQ29uZmxpY3QsIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgQXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50RmFpbHVyZSwgQXBwbGljYXRpb25PcmRlckN5Y2xlLFxuICAgICAgICAgICAgICAgICAgICBVbnJlc29sdmVkQ29uZmxpY3QsIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yIH0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwidmFyIFUgPSB7XG5cblx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9iajE7XG5cdH0sXG5cblx0ZGVmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0XHR2YXIga2V5cyA9IHJlc3Quc2xpY2UoMCwgLTEpO1xuXHRcdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRcdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0XHR2YXIgbGFzdCA9IFUubyhvYmplY3QsIC4uLmtleXMuc2xpY2UoMCwgLTEpKTtcblx0XHRpZiAoVS5pc1VuZGVmaW5lZChsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dKSkge1xuXHRcdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0XHR9XG5cdFx0cmV0dXJuIGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV07XG5cdH0sXG5cblx0byhvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIHt9KSB9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnN9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHR0aGlzLl9jb21wb3NpdGlvbnMgID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHR0aGlzLl9mYWNhZGVNZXRob2RzID0gW107IC8vIG1ldGhvZCAtPiAoYXJncyA9PiBEZWx0YSlcblx0dGhpcy5fb25OZXdGYWNhZGVNZXRob2RMaXN0ZW5lcnMgID0gW107XG5cblx0ZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgKHRoaXMpO1xuXHRkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgKHRoaXMpO1xuXHRkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cbn0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8ge1xuXG5cdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkZWx0YSAgICAgICAge0RlbHRhSnMjRGVsdGF9XG5cdCAqIEBwYXJhbSB0YXJnZXQgICAgICAge0RlbHRhSnMuUmVhZGFibGVUYXJnZXR9XG5cdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCBvciBhbiBpbnN0YW5jZSBvZiBgRGVsdGFKcy5BcHBsaWNhdGlvbkVycm9yYFxuXHQgKi9cblx0X2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpIHtcblx0XHRpZiAoZGVsdGEucHJlY29uZGl0aW9uKSB7XG5cdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBTdXBlcmNsYXNzIHtGdW5jdGlvbj99IC0gb3B0aW9uYWwgc3VwZXJjbGFzc1xuXHQgKiBAcGFyYW0gbmFtZSAgICAgICB7c3RyaW5nfSAgICAtIG5hbWUgb2YgdGhlIG5ldyBvcGVyYXRpb24gdHlwZVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlICB7b2JqZWN0fSAgICAtIHByb3RvdHlwZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGUpIHtcblx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3RoaXMuRGVsdGEsIFN1cGVyY2xhc3MsIG5hbWVdIH1cblx0XHRpZiAoIXByb3RvdHlwZSkgIHsgcHJvdG90eXBlICA9IHt9IH1cblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbnMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLS0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KCF0aGlzLkRlbHRhW25hbWVdLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdGNsYXNzIENscyBleHRlbmRzIFN1cGVyY2xhc3Mge1xuXHRcdFx0Y29uc3RydWN0b3IoYXJnLCBvcHRpb25zID0ge30pIHsgLy8gVE9ETzogLi4uYXJncyBpbnN0ZWFkIG9mIGFyZywgYW5kIHJlbW92ZSBvcHRpb25zXG5cdFx0XHRcdHN1cGVyKG9wdGlvbnMsIGFyZyk7XG5cdFx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5EZWx0YVtuYW1lXSA9IENscztcblx0XHRVLmV4dGVuZChDbHMucHJvdG90eXBlLCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgcHJvcGVydHkgb24gdGhlIHRhcmdldCBvYmplY3Q/ICovXG5cdFx0XHRcdGlmIChvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAmJiAgdGhpcy5vcHRpb25zLnRhcmdldFByb3AgJiZcblx0XHRcdFx0XHRvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAhPT0gdGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgcmV0dXJuIH0gLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7XG5cdFx0XHRcdFx0dmFyIG5ld09wdGlvbnMgPSAoXG5cdFx0XHRcdFx0XHQhIXRoaXMub3B0aW9ucy50YXJnZXRQcm9wID8gLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblx0XHRcdFx0XHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pIDpcblx0XHRcdFx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIG5ld09wdGlvbnMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgdGhlIGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHQocHJvdG90eXBlLm1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdHRoaXMubmV3RmFjYWRlTWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBDbHMoLi4uYXJncykpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gQ2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gIC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIG1ldGhvZCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgbmV3IGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHQgKi9cblx0bmV3RmFjYWRlTWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXG5cdFx0LyogcmVnaXN0ZXIgICovXG5cdFx0dGhpcy5fZmFjYWRlTWV0aG9kcy5wdXNoKFttZXRob2QsIGhhbmRsZXJdKTtcblxuXHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHR0aGlzLl9vbk5ld0ZhY2FkZU1ldGhvZExpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihtZXRob2QsIGhhbmRsZXIpIH0pO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhTdHJpbmcsIEZ1bmN0aW9uKSA9PiB1bmRlZmluZWR9IC1cblx0ICogICAgICAgICAgIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIG5hbWUgYW5kIGEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRvbk5ld0ZhY2FkZU1ldGhvZChmbikge1xuXHRcdHRoaXMuX29uTmV3RmFjYWRlTWV0aG9kTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdHRoaXMuX2ZhY2FkZU1ldGhvZHMuZm9yRWFjaCgoW21ldGhvZCwgaGFuZGxlcl0pID0+IHtcblx0XHRcdGZuKG1ldGhvZCwgaGFuZGxlcik7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHQgKi9cblx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfSxcblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBDb25zdHJhaW50RmFpbHVyZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb25zdHJhaW50RmFpbHVyZShmZWF0dXJlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25PcmRlckN5Y2xlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uT3JkZXJDeWNsZShmcm9tLCB0bykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHR0aGlzLmZyb20gPSBmcm9tO1xuXHR0aGlzLnRvICAgPSB0bztcbn0pO1xuXG5leHBvcnQgdmFyIERlbHRhQ29uZmxpY3QgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFDb25mbGljdChkZWx0YXMpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFDb25mbGljdCc7XG5cdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yKGRlbHRhKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yJztcblx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgJ2RvJyBpbnRlcmZhY2UgY2FuIGJlIGFjdGl2ZSBwZXIgJyR7ZGVsdGEudHlwZX0nIGRlbHRhLmA7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YSkpIHsgcmV0dXJuIH1cblxuXHRkZWx0YUpzLl9uZXh0RGVsdGFJRCA9IDA7XG5cblx0LyoqIHtAY2xhc3MgRGVsdGF9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YShvcHRpb25zLCAuLi5hcmdzKSB7XG5cdFx0dGhpcy5pZCA9IGRlbHRhSnMuX25leHREZWx0YUlEKys7XG5cdFx0dGhpcy5hcmcgPSBhcmdzWzBdO1xuXHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpIH0sIC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSAgdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHQgKiBAcGFyYW0gIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHQgKi9cblx0XHRhcHBsaWVkVG8odmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpICAgeyB2YWx1ZSA9IHZhbHVlLnZhbHVlICAgfVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpLCBvcHRpb25zKTtcblx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5jb21wb3NlZCh0aGlzLCBvdGhlcikgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy50YXJnZXRQcm9wKSB7IHN0ciArPSBgIOKAuSR7dGhpcy5vcHRpb25zLnRhcmdldFByb3B94oC6YCB9IC8vIFRPRE86IHBhc3MgdGFyZ2V0UHJvcCB0aHJvdWdoIG9wdGlvbnMgYXJndW1lbnRcblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpICAgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9IC8vIFRPRE86IGFuZCByZW1vdmUgdGhpcy5vcHRpb25zXG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHR2YXIgX292ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdGRlbHRhSnMub25OZXdGYWNhZGVNZXRob2QoKG1ldGhvZCwgaGFuZGxlcikgPT4ge1xuXHRcdFUuYShfb3ZlcmxvYWRzLCBtZXRob2QpLnB1c2goaGFuZGxlcik7XG5cdH0pO1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIGFyZyAgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfbmV3RGVsdGFCeU1ldGhvZChvcHRpb25zLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSBfb3ZlcmxvYWRzW29wdGlvbnMubWV0aG9kXS5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKGFyZywgb3B0aW9ucykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHZhciBkZWx0YSA9IG5ldyB0aGlzLkRlbHRhLk92ZXJsb2FkZWQoYXJnLCBvcHRpb25zKTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKioge0BjbGFzc31cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlID0gVS5uZXdTdWJjbGFzcyhkZWx0YUpzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRlKC4uLmFyZ3MpIHtcblx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9LCB7XG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogSW1wbGVtZW50IHRoaXMgbWV0aG9kIGluIHN1YmNsYXNzZXMgdG8gcHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSBEZWx0YS5Db21wb3NpdGUgc3ViY2xhc3MgKGluIHRoaXMgY2FzZTogJHt0aGlzLnR5cGV9KSBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LlxuXHRcdCAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGRvKC4uLmZpcnN0QXJncykge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLmRvKC4uLmZjZC5fYXJncywgLi4uYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0ZmNkLl9hcmdzID0gZmlyc3RBcmdzO1xuXHRcdFx0VS5leHRlbmQoZmNkLCBvcGVyYXRpb25NZXRob2RzLCB7XG5cdFx0XHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzRGVsdGEub3BlcmF0aW9uKHttZXRob2R9LCAuLi5mY2QuX2FyZ3MsIC4uLmZpbmFsQXJncyk7IC8vIFRPRE86IChtZXRob2QpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlbHRhOiB0aGlzRGVsdGFcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGZjZDtcblx0XHR9LFxuXHR9KTtcblxuXHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXHRkZWx0YUpzLm9uTmV3RmFjYWRlTWV0aG9kKChtZXRob2QpID0+IHtcblx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcGVyYXRpb25NZXRob2RzW21ldGhvZF0pKSB7XG5cdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAodGhpcy5fZmFjYWRlRGlzYWJsZWQpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlRmFjYWRlc0Vycm9yKHRoaXMpIH1cblx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5hcmdzKTtcblx0XHRcdFx0aWYgKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHtcblx0XHRcdFx0XHR2YXIgYWN0aXZlU3ViRmFjYWRlID0gdGhpcy5fYWN0aXZlU3ViRmFjYWRlO1xuXHRcdFx0XHRcdHdoaWxlIChhY3RpdmVTdWJGYWNhZGUpIHtcblx0XHRcdFx0XHRcdGFjdGl2ZVN1YkZhY2FkZS5fZmFjYWRlRGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0YWN0aXZlU3ViRmFjYWRlID0gYWN0aXZlU3ViRmFjYWRlLl9hY3RpdmVTdWJGYWNhZGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hY3RpdmVTdWJGYWNhZGUgPSBuZXdEZWx0YS5kbygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0TXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ092ZXJsb2FkZWQnLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLm92ZXJsb2FkcyA9IFtdIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyLmNsb25lKCkgLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cdH0pO1xuXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL092ZXJsb2FkZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuTW9kaWZ5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdNb2RpZnknLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLmRlbHRhcyA9IHt9IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKSAvLyBUT0RPOiByZW1vdmUgb3B0aW9uc1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdC8vaWYgKCFvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSB8fCBvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSA9PT0gcHJvcCkge1xuXHRcdFx0XHQvL1x0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHQvL1x0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdC8vfVxuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBhbnkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblx0XHRcdHZhciBhbGxPcHRpb25zID0ge307XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRbcGF0aCwgYXJnXSA9IGFyZ3M7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBHZXQgdGhlIGRlZXBlc3QgZXhpc3RpbmcgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gYSByZWxhdGl2ZSBwYXRoLlxuXHRcdCAqIEBwYXJhbSBwYXRoIHtQYXRofSAtIGEgcGF0aCByZWxhdGl2ZSB0byB0aGlzIGRlbHRhXG5cdFx0ICogQHJldHVybiB7eyBkZWx0YTogRGVsdGFKcyNEZWx0YS5Nb2RpZnksIHJlc3Q6IFBhdGggfX0gLSB0aGUgZGVlcGVzdCBNb2RpZnkgZGVsdGEgY29ycmVzcG9uZGluZyB0byB0aGUgcGF0aCxcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgdW51c2VkIHJlc3Qgb2YgdGhlIHBhdGhcblx0XHQgKi9cblx0XHRkZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQocGF0aC5wcm9wKSB8fCB0aGlzLmRlbHRhc1twYXRoLnByb3BdLnR5cGUgIT09ICdNb2RpZnknKSB7XG5cdFx0XHRcdHJldHVybiB7IGRlbHRhOiB0aGlzLCByZXN0OiBwYXRoIH07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5kZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aC5yZXN0IHx8IG5ldyBQYXRoKCkpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhICdyZXN0JyB0byB0aGUgcGF0aCwgc2V0IGEgbGluayBpbiB0aGUgY2hhaW4gKi9cblx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKHsgbWV0aG9kOiAnbW9kaWZ5JyB9LCBwYXRoLnByb3ApXG5cdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdLm9wdGlvbnMudGFyZ2V0UHJvcCA9IHBhdGgucHJvcDsgLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQgPSB0cnVlO1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqKioqKiovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgbm8tb3AgdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBOb09wID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRbXG5cdFx0WydBZGQnLCAgICAgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFsnUmVwbGFjZScsICdyZXBsYWNlJywgKHRhcmdldCkgPT4gVS5pc0RlZmluZWQgICh0YXJnZXQudmFsdWUpXVxuXHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdGNvbnN0cnVjdCgpICAgICAgICAgIHsgdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBwcmUodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0YXBwbHlUbyh0YXJnZXQpICAgICAgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKHYsIGQpID0+IGQuYXBwbGllZFRvKHYpLCB0aGlzLmFyZykgfSxcblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKSAvLyBUT0RPOyByZW1vdmUgb3B0aW9uc1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnB1c2goZGVsdGEpOyAvLyBkb24ndCBjbG9uZSwgYXMgdGhhdCB3b3VsZCBicmVhayBhbnkgZmFjYWRlc1xuXHRcdFx0XHRpZiAocmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKGQxLCBkMikgPT4gZGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0ICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSBkZWx0YUpzLmNvbXBvc2VkKHJlc3VsdC5kZWx0YXNbcHJvcF0sIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgUHV0SW50b0FycmF5ID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTsgLy8gVE9ETzogKG1ldGhvZClcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKCkgLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogW11cblx0fSk7XG5cblx0LyogRmFjYWRlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSwge30pKTtcblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpKTtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHR2YXIgUHV0SW50b0Z1bmN0aW9uID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTsgLy8gVE9ETzogKG1ldGhvZClcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKCkgLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdCAgICAgICAoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogW11cblx0fSk7XG5cblx0LyogRmFjYWRlIG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSwge30pKTtcblx0ZGVsdGFKcy5uZXdGYWNhZGVNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBQdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSwge30pKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcykpO1xuXHR9KTtcblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0dmFyIERlbHRhTW9kZWwgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdEZWx0YU1vZGVsJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMSB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBuYW1lYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMiB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zMSwgbmFtZSwgb3B0aW9uczIsIHBhdGgsIGFyZykge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0bmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdFtwYXRoLCBhcmddID0gYXJncztcblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QoYWxsT3B0aW9ucywgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgYWxsT3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cblx0XHRcdHZhciBkZWx0YUJhc2U7XG5cblx0XHRcdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cblx0XHRcdHZhciBleGlzdGluZ0RlbHRhID0gdGhpcy5ncmFwaC52ZXJ0ZXhWYWx1ZShuYW1lKTtcblxuXG5cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSAmJiBleGlzdGluZ0RlbHRhLnR5cGUgPT09ICdNb2RpZnknICYmIFUuaXNEZWZpbmVkKHBhdGgucmVzdCkpIHtcblx0XHRcdFx0cmV0dXJuIGV4aXN0aW5nRGVsdGEuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdH1cblxuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0ZGVsdGFCYXNlID0gbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCk7XG5cdFx0XHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRlbHRhIHdpdGggdGhpcyBuYW1lLCBjb21wb3NlIHRoZW0gYW5kIHJldHVybiBgZGVsdGFgIGVhcmx5ICovXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoZXhpc3RpbmdEZWx0YSkpIHtcblx0XHRcdFx0ZGVsdGFCYXNlID0gZXhpc3RpbmdEZWx0YS5jb21wb3NlZFdpdGgoZGVsdGFCYXNlKTtcblx0XHRcdFx0ZGVsdGFCYXNlLm5hbWUgPSBleGlzdGluZ0RlbHRhLm5hbWU7XG5cdFx0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGV4aXN0aW5nRGVsdGEuYXBwbGljYXRpb25Db25kaXRpb247XG5cdFx0XHRcdHRoaXMuZ3JhcGguc2V0VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8qIGFkZCB0aGUgbmV3IGRlbHRhIHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0XHRkZWx0YUJhc2UubmFtZSA9IG5hbWU7XG5cdFx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuXHRcdFx0XHQob3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXSkuY29uY2F0KG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdKS5mb3JFYWNoKChzdWJvcmRpbmF0ZU5hbWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLmdyYXBoLmNyZWF0ZUVkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRpZiAodGhpcy5ncmFwaC5oYXNDeWNsZSgpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdyYXBoLnJlbW92ZUV4aXN0aW5nRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEFwcGxpY2F0aW9uT3JkZXJDeWNsZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gY29uZGl0aW9uIGFuZCBvcHRpb25hbGx5LCBhbiBlcG9ueW1vdXMsIGxpbmtlZCBmZWF0dXJlICovXG5cdFx0XHRcdHZhciBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUpIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cblx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgICAgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoIGBkZWx0YV9fJHtuYW1lfWAsIFUuZXh0ZW5kKHsgaGlkZGVuOiB0cnVlIH0sIG9wdGlvbnMpICkgfVxuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlIHx8IGRlbHRhRmVhdHVyZS5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGRlbHRhRmVhdHVyZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGV4dHJhY3QgJ2lmJyBmcm9tIGNvbXBvdW5kIG9wdGlvbnMgKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pKSB7XG5cdFx0XHRcdFx0ZGVsdGFGZWF0dXJlLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZXh0cmFjdCAnc2VsZWN0cycgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXF1aXJlcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWx0YTtcblxuXHRcdH1cblxuXHRcdC8vIFRPRE86IGFkZCBwcmVjb25kaXRpb24gbWV0aG9kIHdoaWNoIGNoZWNrcyAnc291cmNlJyBkZWx0YXNcblxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdEZWx0YU1vZGVsJyAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgRGVsdGFNb2RlbCB8fCBkMiBpbnN0YW5jZW9mIERlbHRhTW9kZWwpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0VS5hKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBjb25zdHJhaW50cyBiZXR3ZWVuIGZlYXR1cmVzIChlbmZvcmNlZCBieSBlcnJvcnMpICovXG5cdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRPbmx5SWYoZmVhdHVyZSwgY29uanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlXSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfb25seUlmW2ZlYXR1cmVdICE9PSBmYWxzZSkge1xuXHRcdFx0VS5hKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZE9ubHlJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHNldHRsaW5nIHJlbGF0aW9ucyBiZXR3ZWVuIGZlYXR1cmVzICovXG5cdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRpZiAoIV9jb25kaXRpb25zVW5zZXR0bGVkKSB7IHJldHVybiB9XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0ZG8ge1xuXHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSkgeyBfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0fSk7XG5cblx0fSwge1xuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIFUuYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0c2VsZWN0KCkgeyB0aGlzLmlmKHRydWUpIH1cblx0fSk7XG5cblxuXHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdGNvbnN0IEZFQVRVUkVfQ09OTkVDVElPTlMgPSBbXG5cdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzLCBfYWRkT25seUlmXSAgICAgICAgICAgIF0sIC8vIG90aGVyIHNlbGVjdGVkIGJ5IHRoaXNcblx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAobmFtZSA9PT0gbikge1xuXHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdH07XG5cdH0pO1xuXG5cblx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKi9cblx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7cnR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblxuXHRkZWZpbmVEZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cdGRlbHRhSnMuX2RlbHRhTW9kZWwgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdCAqL1xuXHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHR0aGlzLl9kZWx0YU1vZGVsLmFwcGx5VG8ocnQocm9vdCksIHtcblx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCBhZGRzIGEgbmV3IG9wZXJhdGlvbiB0byBpdC5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCBhcmcpIHtcblx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsLm9wZXJhdGlvbiguLi5hcmd1bWVudHMpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCByZXR1cm5zIHRoZSBmYWNhZGUgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHQgKiB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS4gSXQgcHJlc2V0cyB0aGUgJ2ZlYXR1cmUnIG9wdGlvbiB0byAndHJ1ZScsIGJ1dCB0aGlzIGNhbiBiZVxuXHRcdCAqIG92ZXJ3cml0dGVuIG1hbnVhbGx5LlxuXHRcdCAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGRvKC4uLmFyZ3MpIHtcblx0XHRcdC8vIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwsIGRlbHRhcyBhcmUgZmVhdHVyZXMgYnkgZGVmYXVsdFxuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwuZG8oeyBmZWF0dXJlOiB0cnVlIH0sIC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0cmV0dXJuIFUuaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdCguLi5mZWF0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=