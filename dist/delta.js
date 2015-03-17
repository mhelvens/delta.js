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
			this.arg = arguments[1]; // TODO: store all args
			this.id = deltaJs._nextDeltaID++;
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
	
						return thisDelta.operation.apply(thisDelta, [{ method: method }].concat(_toConsumableArray(fcd._args), finalArgs));
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
		deltaJs.newOperationType("PutIntoArray", {
			construct: function construct() {
				this.values = this.options.method ? [{ method: this.options.method, value: this.arg }] : []; // TODO: remove options
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
					// TODO: remove options
					this.values = [{
						method: this.options.method,
						value: this.arg
					}];
				} else {
					this.values = [];
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMzIzZmY3MjEyNDM3MjI5ZmU3YyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3Mi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QyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7OztBQUMzQixxQkFBSyxNQUFNLGdDQUFJLE9BQU8sRUFBQyxDQUFDO01BQ3hCLE1BQU07QUFDTixZQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztNQUNoQztLQUNELENBQUMsQ0FBQztJQUNIOztHQUVELENBQUMsQ0FBQzs7O0VBSUgsQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjMzIzZmY3MjEyNDM3MjI5ZmU3Y1xuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcblx0XHRDb25zdHJhaW50RmFpbHVyZSwgQXBwbGljYXRpb25PcmRlckN5Y2xlLFxuXHRcdFVucmVzb2x2ZWRDb25mbGljdCwgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsXG4gICAgICAgICAgICAgICAgICAgIFVucmVzb2x2ZWRDb25mbGljdCwgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJ2YXIgVSA9IHtcblxuXHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqMTtcblx0fSxcblxuXHRkZWZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHRcdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdFx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdFx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHRcdHZhciBsYXN0ID0gVS5vKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHRcdH1cblx0XHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcblx0fSxcblxuXHRvKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywge30pIH0sXG5cblx0YShvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIFtdKSB9LFxuXG5cdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0fSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0Lyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cblx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIENvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGEuanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzJztcbmltcG9ydCBkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuaW1wb3J0IGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAgZnJvbSAnLi92YXJpYXRpb25Qb2ludHMuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdHRoaXMuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdHRoaXMuX2ZhY2FkZU1ldGhvZHMgPSBbXTsgLy8gbWV0aG9kIC0+IChhcmdzID0+IERlbHRhKVxuXHR0aGlzLl9vbk5ld0ZhY2FkZU1ldGhvZExpc3RlbmVycyAgPSBbXTtcblxuXHRkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblxufSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyB7XG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICogQHBhcmFtIGRlbHRhICAgICAgICB7RGVsdGFKcyNEZWx0YX1cblx0ICogQHBhcmFtIHRhcmdldCAgICAgICB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdCAqL1xuXHRfZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCkge1xuXHRcdGlmIChkZWx0YS5wcmVjb25kaXRpb24pIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIFN1cGVyY2xhc3Mge0Z1bmN0aW9uP30gLSBvcHRpb25hbCBzdXBlcmNsYXNzXG5cdCAqIEBwYXJhbSBuYW1lICAgICAgIHtzdHJpbmd9ICAgIC0gbmFtZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiB0eXBlXG5cdCAqIEBwYXJhbSBwcm90b3R5cGUgIHtvYmplY3R9ICAgIC0gcHJvdG90eXBlIG9mIHRoZSBuZXcgb3BlcmF0aW9uIGNsYXNzXG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdGhpcy5EZWx0YSwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdGlmICghcHJvdG90eXBlKSAgeyBwcm90b3R5cGUgID0ge30gfVxuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0Y2xhc3MgQ2xzIGV4dGVuZHMgU3VwZXJjbGFzcyB7XG5cdFx0XHRjb25zdHJ1Y3RvcihhcmcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHRzdXBlcihvcHRpb25zLCBhcmcpO1xuXHRcdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3QpIHsgdGhpcy5jb25zdHJ1Y3QoKSB9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuRGVsdGFbbmFtZV0gPSBDbHM7XG5cdFx0VS5leHRlbmQoQ2xzLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIHByb3BlcnR5IG9uIHRoZSB0YXJnZXQgb2JqZWN0PyAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgJiYgIHRoaXMub3B0aW9ucy50YXJnZXRQcm9wICYmXG5cdFx0XHRcdFx0b3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgIT09IHRoaXMub3B0aW9ucy50YXJnZXRQcm9wKSB7IHJldHVybiB9IC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgc2VsZWN0aW9uPyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuc2VsZWN0ZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBkb2VzIHRoZSB0YXJnZXQgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uIG9mIHRoZSBkZWx0YT8gKi9cblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKHRoaXMsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3RvdHlwZS5hcHBseVRvKSkge1xuXHRcdFx0XHRcdHZhciBuZXdPcHRpb25zID0gKFxuXHRcdFx0XHRcdFx0ISF0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCA/IC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSA6XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBuZXdPcHRpb25zKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9LFxuXHRcdFx0dHlwZTogbmFtZVxuXHRcdH0pO1xuXG5cdFx0LyogY3JlYXRlIHRoZSBnaXZlbiBtZXRob2RzIHdpdGggZGVmYXVsdCBoYW5kbGVyICovXG5cdFx0KHByb3RvdHlwZS5tZXRob2RzIHx8IFsgbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSkgXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLm5ld0ZhY2FkZU1ldGhvZChtZXRob2QsICguLi5hcmdzKSA9PiBuZXcgQ2xzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIENscztcblxuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAgLSBtZXRob2QgbmFtZVxuXHQgKiBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259ICAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0ICovXG5cdG5ld0ZhY2FkZU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblxuXHRcdC8qIHJlZ2lzdGVyICAqL1xuXHRcdHRoaXMuX2ZhY2FkZU1ldGhvZHMucHVzaChbbWV0aG9kLCBoYW5kbGVyXSk7XG5cblx0XHQvKiBub3RpZnkgbGlzdGVuZXJzICovXG5cdFx0dGhpcy5fb25OZXdGYWNhZGVNZXRob2RMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4obWV0aG9kLCBoYW5kbGVyKSB9KTtcblxuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGZuIHsoU3RyaW5nLCBGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtXG5cdCAqICAgICAgICAgICBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBuYW1lIGFuZCBhIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHQgKi9cblx0b25OZXdGYWNhZGVNZXRob2QoZm4pIHtcblx0XHR0aGlzLl9vbk5ld0ZhY2FkZU1ldGhvZExpc3RlbmVycy5wdXNoKGZuKTtcblx0XHR0aGlzLl9mYWNhZGVNZXRob2RzLmZvckVhY2goKFttZXRob2QsIGhhbmRsZXJdKSA9PiB7XG5cdFx0XHRmbihtZXRob2QsIGhhbmRsZXIpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0ICovXG5cdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdHRoaXMuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkMSB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZmlyc3QgZGVsdGFcblx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0ICovXG5cdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdC8qIGhhbmRsZSB0aGUgY2FzZXMgd2hlcmUgb25lIG9yIGJvdGggYXJndW1lbnRzIGFyZSB1bmRlZmluZWQgKi9cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMSkpIHsgZDEgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cblx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHR2YXIgc3VjY2VzcyA9IHRoaXMuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdHJldHVybiBjb21wb3NlRm4oZDEsIGQyKTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH0sXG5cdHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBcIlwiO1xuXHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLnByb3ApKSB7XG5cdFx0XHRyZXN1bHQgKz0gdGhpcy5wcm9wO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlIGRlbHRhLXR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmAgK1xuXHQgICAgICAgICAgICAgICBlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcbn0pO1xuXG5leHBvcnQgdmFyIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCBiYXNlRGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTtcblx0dGhpcy5uYW1lID0gJ0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGUgdHlwZS0nJHt0eXBlb2YgYmFzZURlbHRhLmFyZ30nLXZhbHVlIG9mIHRoaXMgYmFzZSBkZWx0YSBvZiB0eXBlICcke2Jhc2VEZWx0YS50eXBlfScuYDtcblx0dGhpcy5iYXNlRGVsdGEgPSBiYXNlRGVsdGE7XG59KTtcblxuZXhwb3J0IHZhciBDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKENvbXBvc2l0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YTEsIGRlbHRhMik7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29uc3RyYWludEZhaWx1cmUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29uc3RyYWludEZhaWx1cmUoZmVhdHVyZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcbn0pO1xuXG5leHBvcnQgdmFyIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoZnJvbSwgdG8pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25PcmRlckN5Y2xlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBuZXcgYXBwbGljYXRpb24gb3JkZXIgYmV0d2VlbiAke2Zyb219IGFuZCAke3RvfSBjcmVhdGVkIGEgY3ljbGUuYDtcblx0dGhpcy5mcm9tID0gZnJvbTtcblx0dGhpcy50byAgID0gdG87XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUNvbmZsaWN0ID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIERlbHRhQ29uZmxpY3QoZGVsdGFzKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0RlbHRhQ29uZmxpY3QnO1xuXHR2YXIgZGVsdGFOYW1lcyA9IGRlbHRhcy5tYXAoZCA9PiBgJyR7ZC5uYW1lfSdgKS5qb2luKCcsJyk7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBpcyBhbiB1bnJlc29sdmVkIGNvbmZsaWN0IGJldHdlZW4gZGVsdGFzICR7ZGVsdGFOYW1lc30uYDtcblx0dGhpcy5kZWx0YXMgPSBkZWx0YXM7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvcihkZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvcic7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy5tZXNzYWdlID0gYE9ubHkgb25lICdkbycgaW50ZXJmYWNlIGNhbiBiZSBhY3RpdmUgcGVyICcke2RlbHRhLnR5cGV9JyBkZWx0YS5gO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCB3dH0gICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4uL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEpKSB7IHJldHVybiB9XG5cblx0ZGVsdGFKcy5fbmV4dERlbHRhSUQgPSAwO1xuXG5cdC8qKiB7QGNsYXNzIERlbHRhfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGEob3B0aW9ucywgLi4uYXJncykge1xuXHRcdHRoaXMuYXJnID0gYXJnc1swXTsgLy8gVE9ETzogc3RvcmUgYWxsIGFyZ3Ncblx0XHR0aGlzLmlkID0gZGVsdGFKcy5fbmV4dERlbHRhSUQrKztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9LCB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcsIHRoaXMub3B0aW9ucykgfSwgLy8gVE9ETzogcmVtb3ZlIG9wdGlvbnNcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiBkZWx0YUpzLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgc3RyICs9IGAg4oC5JHt0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcH3igLpgIH0gLy8gVE9ETzogcGFzcyB0YXJnZXRQcm9wIHRocm91Z2ggb3B0aW9ucyBhcmd1bWVudFxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgICB7IHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKX1gIH0gLy8gVE9ETzogYW5kIHJlbW92ZSB0aGlzLm9wdGlvbnNcblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0fSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdHZhciBfb3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0ZGVsdGFKcy5vbk5ld0ZhY2FkZU1ldGhvZCgobWV0aG9kLCBoYW5kbGVyKSA9PiB7XG5cdFx0VS5hKF9vdmVybG9hZHMsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblx0fSk7XG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gYXJnICAgICB7Kn1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9uZXdEZWx0YUJ5TWV0aG9kKG9wdGlvbnMsIGFyZykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IF9vdmVybG9hZHNbb3B0aW9ucy5tZXRob2RdLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoYXJnLCBvcHRpb25zKSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMuRGVsdGEuT3ZlcmxvYWRlZChhcmcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkZWx0YS5vdmVybG9hZHMgPSBuZXdEZWx0YXM7XG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8qKiB7QGNsYXNzfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUgPSBVLm5ld1N1YmNsYXNzKGRlbHRhSnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGUoLi4uYXJncykge1xuXHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJncyk7XG5cdH0sIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBJbXBsZW1lbnQgdGhpcyBtZXRob2QgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIERlbHRhLkNvbXBvc2l0ZSBzdWJjbGFzcyAoaW4gdGhpcyBjYXNlOiAke3RoaXMudHlwZX0pIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ29wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uZmlyc3RBcmdzKSB7XG5cdFx0XHR2YXIgdGhpc0RlbHRhID0gdGhpcztcblx0XHRcdC8vIFRoZSBmYWNhZGUgb2JqZWN0IGV4cG9zZXMgb3BlcmF0aW9ucyBtZXRob2RzIGRpcmVjdGx5LCBidXQgYXJndW1lbnRzIHRvXG5cdFx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdFx0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHRcdFx0dmFyIGZjZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzRGVsdGEuZG8oLi4uZmNkLl9hcmdzLCAuLi5hcmdzKTtcblx0XHRcdH07XG5cdFx0XHRmY2QuX2FyZ3MgPSBmaXJzdEFyZ3M7XG5cdFx0XHRVLmV4dGVuZChmY2QsIG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdFx0X2FwcGx5T3BlcmF0aW9uTWV0aG9kKG1ldGhvZCwgLi4uZmluYWxBcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YS5vcGVyYXRpb24oe21ldGhvZH0sIC4uLmZjZC5fYXJncywgLi4uZmluYWxBcmdzKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH0sXG5cdH0pO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdGYWNhZGVNZXRob2QoKG1ldGhvZCkgPT4ge1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSkpIHtcblx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9mYWNhZGVEaXNhYmxlZCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IodGhpcykgfVxuXHRcdFx0XHR2YXIgbmV3RGVsdGEgPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmFyZ3MpO1xuXHRcdFx0XHRpZiAobmV3RGVsdGEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkge1xuXHRcdFx0XHRcdHZhciBhY3RpdmVTdWJGYWNhZGUgPSB0aGlzLl9hY3RpdmVTdWJGYWNhZGU7XG5cdFx0XHRcdFx0d2hpbGUgKGFjdGl2ZVN1YkZhY2FkZSkge1xuXHRcdFx0XHRcdFx0YWN0aXZlU3ViRmFjYWRlLl9mYWNhZGVEaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRhY3RpdmVTdWJGYWNhZGUgPSBhY3RpdmVTdWJGYWNhZGUuX2FjdGl2ZVN1YkZhY2FkZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FjdGl2ZVN1YkZhY2FkZSA9IG5ld0RlbHRhLmRvKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnT3ZlcmxvYWRlZCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMub3ZlcmxvYWRzID0gW10gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk92ZXJsb2FkZWR9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIuY2xvbmUoKSAvLyBUT0RPOiByZW1vdmUgb3B0aW9uc1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblx0fSk7XG5cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHwgZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCgpO1xuXHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZDEsIGQyLCBlcnJvcnMpIH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Nb2RpZnkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ01vZGlmeScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMuZGVsdGFzID0ge30gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpIC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpcy5kZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0Ly9pZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdC8vXHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdC8vXHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0Ly99XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fSAtIGFueSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXHRcdFx0dmFyIGFsbE9wdGlvbnMgPSB7fTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdFtwYXRoLCBhcmddID0gYXJncztcblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QoYWxsT3B0aW9ucywgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oYWxsT3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEdldCB0aGUgZGVlcGVzdCBleGlzdGluZyBNb2RpZnkgZGVsdGEgY29ycmVzcG9uZGluZyB0byBhIHJlbGF0aXZlIHBhdGguXG5cdFx0ICogQHBhcmFtIHBhdGgge1BhdGh9IC0gYSBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgZGVsdGFcblx0XHQgKiBAcmV0dXJuIHt7IGRlbHRhOiBEZWx0YUpzI0RlbHRhLk1vZGlmeSwgcmVzdDogUGF0aCB9fSAtIHRoZSBkZWVwZXN0IE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXRoLFxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHRoZSB1bnVzZWQgcmVzdCBvZiB0aGUgcGF0aFxuXHRcdCAqL1xuXHRcdGRlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChwYXRoLnByb3ApIHx8IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0udHlwZSAhPT0gJ01vZGlmeScpIHtcblx0XHRcdFx0cmV0dXJuIHsgZGVsdGE6IHRoaXMsIHJlc3Q6IHBhdGggfTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmRlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoLnJlc3QgfHwgbmV3IFBhdGgoKSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gcGF0aCAgICB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb24oeyBtZXRob2Q6ICdtb2RpZnknIH0sIHBhdGgucHJvcClcblx0XHRcdFx0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ub3B0aW9ucy50YXJnZXRQcm9wID0gcGF0aC5wcm9wOyAvLyBUT0RPOiByZW1vdmUgb3B0aW9uc1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG5cdFx0XHRyZXR1cm4gKHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdIDogZGVsdGE7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvTW9kaWZ5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCA9IHRydWU7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICoqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBuby1vcCB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIE5vT3AgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFtcblx0XHRbJ0FkZCcsICAgICAnYWRkJywgICAgICh0YXJnZXQpID0+IFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKV0sXG5cdFx0WydSZXBsYWNlJywgJ3JlcGxhY2UnLCAodGFyZ2V0KSA9PiBVLmlzRGVmaW5lZCAgKHRhcmdldC52YWx1ZSldXG5cdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoVHlwZSwge1xuXHRcdFx0Y29uc3RydWN0KCkgICAgICAgICAgeyB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIHByZSh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkgICAgICB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9LFxuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpIC8vIFRPRE87IHJlbW92ZSBvcHRpb25zXG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRhZnRlckFwcGx5aW5nKGRlbHRhKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmNsb25lKCk7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucHVzaChkZWx0YSk7IC8vIGRvbid0IGNsb25lLCBhcyB0aGF0IHdvdWxkIGJyZWFrIGFueSBmYWNhZGVzXG5cdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiBkZWx0YUpzLmNvbXBvc2VkKGQxLCBkMikpXG5cdFx0XHRcdFx0XHQgICAgLnByZWNvbmRpdGlvbih3dChyZXN1bHQsICdhcmcnKSkgIT09IHRydWUpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmdbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IGRlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5vcHRpb25zLm1ldGhvZCA/IFt7IG1ldGhvZDogdGhpcy5vcHRpb25zLm1ldGhvZCwgdmFsdWU6IHRoaXMuYXJnIH1dIDogW107IC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpIC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSgpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLm1ldGhvZCkgeyAvLyBUT0RPOiByZW1vdmUgb3B0aW9uc1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdCAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5vcHRpb25zLm1ldGhvZCxcblx0ICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuYXJnXG4gICAgICAgICAgICAgICB9XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpIC8vIFRPRE86IHJlbW92ZSBvcHRpb25zXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHQgICAgICAgKFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcbmltcG9ydCB7QXBwbGljYXRpb25PcmRlckN5Y2xlfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHR2YXIgRGVsdGFNb2RlbCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRcdHZhciBhbGxPcHRpb25zID0ge307XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRuYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0W3BhdGgsIGFyZ10gPSBhcmdzO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCBhcmcpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblxuXHRcdFx0dmFyIGRlbHRhQmFzZTtcblxuXHRcdFx0LyogY2hlY2sgaWYgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyAqL1xuXHRcdFx0dmFyIGV4aXN0aW5nRGVsdGEgPSB0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpO1xuXG5cblxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpICYmIGV4aXN0aW5nRGVsdGEudHlwZSA9PT0gJ01vZGlmeScgJiYgVS5pc0RlZmluZWQocGF0aC5yZXN0KSkge1xuXHRcdFx0XHRyZXR1cm4gZXhpc3RpbmdEZWx0YS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcblx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUsIGNvbXBvc2UgdGhlbSBhbmQgcmV0dXJuIGBkZWx0YWAgZWFybHkgKi9cblx0XHRcdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBleGlzdGluZ0RlbHRhLmNvbXBvc2VkV2l0aChkZWx0YUJhc2UpO1xuXHRcdFx0XHRkZWx0YUJhc2UubmFtZSA9IGV4aXN0aW5nRGVsdGEubmFtZTtcblx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcblx0XHRcdFx0dGhpcy5ncmFwaC5zZXRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0LyogYWRkIHRoZSBuZXcgZGVsdGEgdG8gdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcblx0XHRcdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblxuXHRcdFx0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG5cdFx0XHRcdChvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdKS5jb25jYXQob3B0aW9uc1snYWZ0ZXInXSB8fCBbXSkuY29uY2F0KG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW10pLmZvckVhY2goKHN1Ym9yZGluYXRlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsbHksIGFuIGVwb255bW91cywgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdFx0dmFyIGRlbHRhRmVhdHVyZTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSkgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggYGRlbHRhX18ke25hbWV9YCwgVS5leHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZXh0cmFjdCAnaWYnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuaWYob3B0aW9uc1sncmVzb2x2ZXMnXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdzZWxlY3RzJyBmcm9tIGNvbXBvdW5kIG9wdGlvbnMgKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0ZGVsdGFGZWF0dXJlLnNlbGVjdHMob3B0aW9uc1sncmVxdWlyZXMnXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlbHRhO1xuXG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdGZ1bmN0aW9uIF9ub3JtYWxpemVDbGF1c2UoaW5wdXQpIHtcblx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0dmFyIF9pZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9zZWxlY3RlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRVLmEoX2lmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoZGlzanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFNlbGVjdHMoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0dmFyIF9vbmx5SWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgY29uanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChjb25qdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRVLmEoX29ubHlJZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGNvbmp1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRSZXF1aXJlZEJ5KGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRkbyB7XG5cdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIV9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKChfaWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5zb21lKGRpc2ogPT4gZGlzai5ldmVyeShjb25qID0+IF9zZWxlY3RlZFtjb25qXSkpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cblx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnb25seUlmJyBjb25qdW5jdHMgdGhhdCBhcmUgZXhjbHVkZWQsIHRoaXMgZmVhdHVyZSBpcyBleGNsdWRlZCAqL1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkZlYXR1cmUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHR9KTtcblxuXHR9LCB7XG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdGlmIChfc2VsZWN0ZWRbdGhpcy5uYW1lXSAmJiAhX2FsbG93ZWRbdGhpcy5uYW1lXSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3NlbGVjdGVkW3RoaXMubmFtZV07XG5cdFx0fSxcblx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0Z2V0IGNvbmRpdGlvbmFsKCkgeyByZXR1cm4gVS5hKF9pZiwgICAgIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdGdldCByZXN0cmljdGVkKCkgIHsgcmV0dXJuIFUuYShfb25seUlmLCB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHR9KTtcblxuXG5cdC8qIHJlc3RyaWN0aW9ucyBhbmQgY29ubmVjdGlvbnMgKi9cblx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRbICdpZicsICAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgIF0sIC8vIHRoaXMgc2VsZWN0ZWQgYnkgb3RoZXJcblx0XHRbICdvbmx5SWYnLCAgICAgW19hZGRPbmx5SWZdICAgICAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIHRoaXMgYnV0IG5vdCBvdGhlclxuXHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHMsIF9hZGRPbmx5SWZdICAgICAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFsgJ3JlcXVpcmVkQnknLCBbX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgb3RoZXIgYnV0IG5vdCB0aGlzXG5cdFx0WyAnaWZmJywgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5LCBfYWRkT25seUlmXSBdICAvLyBpZiBhbmQgb25seUlmXG5cdF07XG5cdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGUuYWRkT3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbiwgbWV0aG9kc10pID0+IHtcblx0XHRcdGlmIChuYW1lID09PSBuKSB7XG5cdFx0XHRcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZCh0aGlzLm5hbWUsIHZhbHVlKSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbmFtZV0pID0+IHtcblx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihuYW1lLCB2YWx1ZSk7XG5cdFx0fTtcblx0fSk7XG5cblxuXHQvKiB0aGUgZmVhdHVyZXMgYmVsb25naW5nIHRvIHRoaXMgRGVsdGFKcyBpbnN0YW5jZSAqL1xuXHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG5hbWUgICAge3N0cmluZ30gIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqL1xuXHRcdG5ld0ZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh0aGlzLmZlYXR1cmVzW25hbWVdKSxcblx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBuZXcgZmVhdHVyZSAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuZmVhdHVyZXNbbmFtZV0gPSBuZXcgdGhpcy5GZWF0dXJlKG5hbWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtydH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXG5cdGRlZmluZURlbHRhTW9kZWwoZGVsdGFKcyk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblx0ZGVsdGFKcy5fZGVsdGFNb2RlbCA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaW5kaWNhdGVzIGEgdmFyaWF0aW9uIHBvaW50LlxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludCBhZnRlciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgZGVsdGFzXG5cdFx0ICovXG5cdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHR2YXIgcm9vdCA9IHsgW25hbWVdOiB2YWwgfTtcblx0XHRcdHRoaXMuX2RlbHRhTW9kZWwuYXBwbHlUbyhydChyb290KSwge1xuXHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IGFkZHMgYSBuZXcgb3BlcmF0aW9uIHRvIGl0LlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMSB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBuYW1lYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMiB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zMSwgbmFtZSwgb3B0aW9uczIsIHBhdGgsIGFyZykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwub3BlcmF0aW9uKC4uLmFyZ3VtZW50cyk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIGZhY2FkZSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0ICogb3ZlcndyaXR0ZW4gbWFudWFsbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0Ly8gZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCwgZGVsdGFzIGFyZSBmZWF0dXJlcyBieSBkZWZhdWx0XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5kbyh7IGZlYXR1cmU6IHRydWUgfSwgLi4uYXJncyk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YXJpYXRpb25Qb2ludHMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cblx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdHNldCBhcHBsaWNhdGlvbkNvbmRpdGlvbihhYykgeyB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFjIH0sXG5cblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gVS5pc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0ZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmZWF0dXJlKSkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==