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
	var CompositionError = _ErrorJs.CompositionError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	var ConstraintFailure = _ErrorJs.ConstraintFailure;
	var ApplicationOrderCycle = _ErrorJs.ApplicationOrderCycle;
	var UnresolvedDeltaConflict = _ErrorJs.UnresolvedDeltaConflict;
	var MultipleActiveProxiesError = _ErrorJs.MultipleActiveProxiesError;
	
	U.extend(DeltaJs, { ApplicationError: ApplicationError, MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	                    NoOverloadsApplicationError: NoOverloadsApplicationError, CompositionError: CompositionError,
	                    MultipleOverloadsCompositionError: MultipleOverloadsCompositionError, ConstraintFailure: ConstraintFailure,
	                    ApplicationOrderCycle: ApplicationOrderCycle, UnresolvedDeltaConflict: UnresolvedDeltaConflict,
	                    MultipleActiveProxiesError: MultipleActiveProxiesError });
	
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
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
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
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var defineOverloaded = _interopRequire(__webpack_require__(8));
	
	var defineModify = _interopRequire(__webpack_require__(9));
	
	var defineBasicOperations = _interopRequire(__webpack_require__(10));
	
	var definePutIntoArray = _interopRequire(__webpack_require__(11));
	
	var definePutIntoFunction = _interopRequire(__webpack_require__(12));
	
	var defineDeltaModel = _interopRequire(__webpack_require__(13));
	
	var defineFeatures = _interopRequire(__webpack_require__(14));
	
	var defineVariationPoints = _interopRequire(__webpack_require__(15));
	
	var defineApplicationConditions = _interopRequire(__webpack_require__(16));
	
	var defineProxy = _interopRequire(__webpack_require__(17));
	
	/** {@public}{@class}
	 * This class offers every functionality you need from delta modeling.
	 * Each instance offers its own operation types and variation points
	 * and acts as a facade (as in design pattern) to the more specific
	 * subsystems of delta.js.
	 *
	 * You will usually need only one DeltaJs instance per application.
	 */
	
	var DeltaJs = (function () {
		function DeltaJs() {
			_classCallCheck(this, DeltaJs);
	
			defineDelta(this);
			defineProxy(this);
			defineOverloaded(this);
			defineModify(this);
			defineBasicOperations(this);
			definePutIntoArray(this);
			definePutIntoFunction(this);
			defineDeltaModel(this);
			defineFeatures(this);
			defineVariationPoints(this);
			defineApplicationConditions(this);
		}
	
		_prototypeProperties(DeltaJs, null, {
			newOperationType: {
	
				/** {@public}{@method}
	    * @param name        {string}   - name of the new operation type
	    * @param DeltaClass  {Function} - the new operation class
	    * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	    */
	
				value: function newOperationType(name, DeltaClass, ProxyClass) {
					var _this = this;
	
					/* sanity checks */
					U.assert(name[0] === name[0].toUpperCase(), "Delta operation classes must have a name starting with a capital letter - '" + name + "' does not.");
					U.assert(U.isUndefined(this.Delta[name]), "The '" + name + "' operation type already exists.");
	
					/* 'this' alias */
					var thisDeltaJs = this;
	
					/* store the operation class */
					this.Delta[name] = DeltaClass;
	
					/* set the (optional) Proxy class */
					DeltaClass.Proxy = ProxyClass;
	
					/* fetch the given applyTo function (if any) which will be slightly modified */
					var givenApplyTo = DeltaClass.prototype.applyTo || function () {};
	
					/* augment the class prototype */
					U.extend(DeltaClass.prototype, {
						applyTo: function applyTo(target) {
							var options = arguments[1] === undefined ? {} : arguments[1];
	
							/* should this delta only be applied for a specific feature selection? */
							if (!this.selected) {
								return;
							}
	
							/* if the target is not already in Target form, make it so now */
							if (!(target instanceof DeltaJs.ReadableTarget)) {
								target = new DeltaJs.ReadableTarget(target);
							}
	
							/* does the target satisfy the precondition of the delta? */
							var judgment = this.evaluatePrecondition(target);
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
					(DeltaClass.prototype.methods || [lowercaseName]).forEach(function (method) {
						_this.ContainerProxy.newProxyMethod(method, function () {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}
	
							return _applyConstructor(DeltaClass, args);
						});
					});
	
					/* return the new class */
					return DeltaClass;
				},
				writable: true,
				configurable: true
			},
			newProxyMethod: {
	
				/** {@public}{@method}
	    * @param method  {string}   - method name
	    * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	    */
	
				value: function newProxyMethod(method, handler) {
					this.ContainerProxy.newProxyMethod(method, handler);
				},
				writable: true,
				configurable: true
			},
			newComposition: {
	
				/** {@public}{@method}
	    * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	    * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	    */
	
				value: function newComposition(precondition, compose) {
					this.Delta.newComposition(precondition, compose);
				},
				writable: true,
				configurable: true
			}
		});
	
		return DeltaJs;
	})();
	
	module.exports = DeltaJs;

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
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var ApplicationError = exports.ApplicationError = (function (Error) {
		function ApplicationError(delta, value) {
			_classCallCheck(this, ApplicationError);
	
			_get(Object.getPrototypeOf(ApplicationError.prototype), "constructor", this).call(this);
			this.name = "ApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		}
	
		_inherits(ApplicationError, Error);
	
		return ApplicationError;
	})(Error);
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = (function (ApplicationError) {
		function MultipleOverloadsApplicationError(delta, value) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			_classCallCheck(this, MultipleOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(MultipleOverloadsApplicationError.prototype), "constructor", this).call(this, delta, value);
			this.name = "MultipleOverloadsApplicationError";
			this.message = "None of the delta-types " + delta.overloads.map(function (d) {
				return "'" + d.type + "'";
			}).join(",") + " can apply to this value of type '" + typeof value + "'." + errors.map(function (e) {
				return "\n-- " + e.message;
			}).join("");
			this.errors = errors;
		}
	
		_inherits(MultipleOverloadsApplicationError, ApplicationError);
	
		return MultipleOverloadsApplicationError;
	})(ApplicationError);
	
	var NoOverloadsApplicationError = exports.NoOverloadsApplicationError = (function (ApplicationError) {
		function NoOverloadsApplicationError(delta, value) {
			_classCallCheck(this, NoOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(NoOverloadsApplicationError.prototype), "constructor", this).call(this, delta, value);
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		}
	
		_inherits(NoOverloadsApplicationError, ApplicationError);
	
		return NoOverloadsApplicationError;
	})(ApplicationError);
	
	var CompositionError = exports.CompositionError = (function (Error) {
		function CompositionError(delta1, delta2) {
			_classCallCheck(this, CompositionError);
	
			_get(Object.getPrototypeOf(CompositionError.prototype), "constructor", this).call(this);
			this.name = "CompositionError";
			this.message = "This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "'.";
			this.delta1 = delta1;
			this.delta2 = delta2;
		}
	
		_inherits(CompositionError, Error);
	
		return CompositionError;
	})(Error);
	
	var MultipleOverloadsCompositionError = exports.MultipleOverloadsCompositionError = (function (CompositionError) {
		function MultipleOverloadsCompositionError(delta1, delta2) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			_classCallCheck(this, MultipleOverloadsCompositionError);
	
			_get(Object.getPrototypeOf(MultipleOverloadsCompositionError.prototype), "constructor", this).call(this, delta1, delta2);
			this.name = "MultipleOverloadsCompositionError";
			this.message = "There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'." + errors.map(function (e) {
				return "\n-- " + e.message;
			}).join("");
			this.errors = errors;
		}
	
		_inherits(MultipleOverloadsCompositionError, CompositionError);
	
		return MultipleOverloadsCompositionError;
	})(CompositionError);
	
	var ConstraintFailure = exports.ConstraintFailure = (function (Error) {
		function ConstraintFailure(feature) {
			_classCallCheck(this, ConstraintFailure);
	
			_get(Object.getPrototypeOf(ConstraintFailure.prototype), "constructor", this).call(this);
			this.name = "ConstraintFailure";
			this.message = "The feature '" + feature.name + "' is both selected and excluded by its constraints.";
			this.feature = feature;
		}
	
		_inherits(ConstraintFailure, Error);
	
		return ConstraintFailure;
	})(Error);
	
	var ApplicationOrderCycle = exports.ApplicationOrderCycle = (function (Error) {
		function ApplicationOrderCycle(from, to) {
			_classCallCheck(this, ApplicationOrderCycle);
	
			_get(Object.getPrototypeOf(ApplicationOrderCycle.prototype), "constructor", this).call(this);
			this.name = "ApplicationOrderCycle";
			this.message = "The new application order between " + from + " and " + to + " created a cycle.";
			this.from = from;
			this.to = to;
		}
	
		_inherits(ApplicationOrderCycle, Error);
	
		return ApplicationOrderCycle;
	})(Error);
	
	var UnresolvedDeltaConflict = exports.UnresolvedDeltaConflict = (function (Error) {
		function UnresolvedDeltaConflict(deltas) {
			_classCallCheck(this, UnresolvedDeltaConflict);
	
			_get(Object.getPrototypeOf(UnresolvedDeltaConflict.prototype), "constructor", this).call(this);
			this.name = "UnresolvedDeltaConflict";
			var deltaNames = deltas.map(function (d) {
				return "'" + d.name + "'";
			}).join(",");
			this.message = "There is an unresolved conflict between deltas " + deltaNames + ".";
			this.deltas = deltas;
		}
	
		_inherits(UnresolvedDeltaConflict, Error);
	
		return UnresolvedDeltaConflict;
	})(Error);
	
	var MultipleActiveProxiesError = exports.MultipleActiveProxiesError = (function (Error) {
		function MultipleActiveProxiesError() {
			_classCallCheck(this, MultipleActiveProxiesError);
	
			_get(Object.getPrototypeOf(MultipleActiveProxiesError.prototype), "constructor", this).call(this);
			this.name = "MultipleActiveProxiesError";
			this.message = "Only one Proxy per path can be active at any given time.";
		}
	
		_inherits(MultipleActiveProxiesError, Error);
	
		return MultipleActiveProxiesError;
	})(Error);
	
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
	
	var defineApplicationConditions = _interopRequire(__webpack_require__(16));
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	
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
				this.args = args;
			}
	
			_prototypeProperties(Delta, {
				newComposition: {
	
					/** {@public}{@static}{@method}
	     * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	     * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	     */
	
					value: function newComposition(precondition, compose) {
						deltaJs.Delta._compositions.push({ precondition: precondition, compose: compose });
					},
					writable: true,
					configurable: true
				},
				composed: {
	
					/** {@public}{@static}{@method}
	     * @param deltas {[DeltaJs#Delta]} - the deltas to compose
	     * @return {DeltaJs#Delta} - the composed delta
	     */
	
					value: function composed() {
						for (var _len = arguments.length, deltas = Array(_len), _key = 0; _key < _len; _key++) {
							deltas[_key] = arguments[_key];
						}
	
						var result = new deltaJs.Delta.NoOp();
	
						deltas.forEach(function (delta) {
							var d1 = result,
							    d2 = delta || new deltaJs.Delta.NoOp();
	
							/* use the first composition function for which these deltas satisfy the precondition */
							var composeFn = function () {};
							var success = Delta._compositions.some(function (_ref) {
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
							result = composeFn(d1, d2);
						});
	
						return result;
					},
					writable: true,
					configurable: true
				}
			}, {
				arg: {
					get: function () {
						return this.args[0];
					},
					set: function (v) {
						this.args[0] = v;
					},
					configurable: true
				},
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
				evaluatePrecondition: {
	
					/** {@private}{@method}
	     * @param target {DeltaJs.ReadableTarget}
	     * @return {Boolean|ApplicationError} - `true` if the precondition is satisfied, otherwise
	     *                                      `false` or an instance of `DeltaJs.ApplicationError`
	     */
	
					value: function evaluatePrecondition(target) {
						if (this.precondition) {
							var judgment = this.precondition(target);
							if (judgment instanceof ApplicationError) {
								return judgment;
							} else if (!judgment) {
								return new ApplicationError(this, target.value);
							}
						}
						return true;
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
						return deltaJs.Delta.composed(this, other);
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
		Delta._compositions = []; // [{precondition, composeFn}]
		deltaJs.Delta = Delta;
	};

/***/ },
/* 8 */
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
	
		deltaJs.newOperationType("Overloaded", (function (_deltaJs$Delta) {
			function Overloaded() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Overloaded);
	
				_get(Object.getPrototypeOf(Overloaded.prototype), "constructor", this).apply(this, args);
				this.overloads = this.arg || [];
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
							var judgment = delta.evaluatePrecondition(target);
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
		})(deltaJs.Delta));
	
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
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var wt = __webpack_require__(3).wt;
	
	var defineProxy = _interopRequire(__webpack_require__(17));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.Modify)) {
			return;
		}
	
		defineProxy(deltaJs);
	
		deltaJs.newOperationType("Modify", (function (_deltaJs$Delta) {
			function Modify() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Modify);
	
				_get(Object.getPrototypeOf(Modify.prototype), "constructor", this).apply(this, args);
				this.subDeltas = {};
				U.extend(this.subDeltas, this.arg || {});
			}
	
			_inherits(Modify, _deltaJs$Delta);
	
			_prototypeProperties(Modify, null, {
				clone: {
	
					/** {@public}{@abstract}{@method}{@nosideeffects}
	     * @return {DeltaJs#Delta.Modify} - a clone of this delta
	     */
	
					value: function clone() {
						var _this = this;
	
						var result = _get(Object.getPrototypeOf(Modify.prototype), "clone", this).call(this);
						Object.keys(this.subDeltas).forEach(function (prop) {
							result.subDeltas[prop] = _this.subDeltas[prop].clone();
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
	
						Object.keys(this.subDeltas).forEach(function (prop) {
							if (!options.restrictToProperty || options.restrictToProperty === prop) {
								_this.subDeltas[prop].applyTo(wt(target.value, prop), U.extend({}, options, { restrictToProperty: null }));
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
						if (Object.keys(this.subDeltas).length > 0) {
							var deltas = Object.keys(this.subDeltas).map(function (p) {
								return _this.subDeltas[p].toString(U.extend({}, options, { targetProp: p }));
							}).join("\n");
							str += "\n" + U.indent(deltas, 4);
						}
						return str;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Modify;
		})(deltaJs.Delta), (function (_deltaJs$ContainerProxy) {
			function ModifyProxy() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, ModifyProxy);
	
				_get(Object.getPrototypeOf(ModifyProxy.prototype), "constructor", this).apply(this, args);
				this._childOptions = {}; // key -> options-of-first-occurrence
			}
	
			_inherits(ModifyProxy, _deltaJs$ContainerProxy);
	
			_prototypeProperties(ModifyProxy, null, {
				processProxyArguments: {
	
					/** {@public}{@method}
	     * @param rawArgs {*[]}
	     * @return {?{ options: Object, path: string, args: *[] }}
	     */
	
					value: function processProxyArguments() {
						for (var _len = arguments.length, rawArgs = Array(_len), _key = 0; _key < _len; _key++) {
							rawArgs[_key] = arguments[_key];
						}
	
						// rawArgs is parsed as (...options, path, ...args)
						var options = {};
						var path;
						do {
							if (rawArgs.length === 0) {
								throw new Error("The argument list for this Modify.Proxy method is insufficient.");
							}
							var arg = rawArgs.shift();
							if (typeof arg === "string") {
								path = arg;
							} else {
								U.extend(options, arg);
							}
						} while (!path);
						return { options: options, path: path, args: rawArgs };
					},
					writable: true,
					configurable: true
				},
				addOperation: {
	
					/** {@public}{@method}
	     * @param delta   {DeltaJs#Delta}
	     * @param path    {Path}
	     * @param options {Object}
	     */
	
					value: function addOperation(delta, path, options) {
						if (!path.prop) {
							throw new Error("Operations on a Modify.Proxy need to have a non-empty path.");
						}
	
						/* create proxies */
						var deepestProxy, childProxy;
						if (path.rest) {
							childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
							deepestProxy = childProxy.addOperation(delta, path.rest, options);
						} else {
							childProxy = deepestProxy = this.addChildProxy(path.prop, delta);
						}
	
						/* store options */
						if (!this._childOptions[path.prop]) {
							this._childOptions[path.prop] = options;
						}
	
						/* return the deepest created proxy */
						return deepestProxy;
					},
					writable: true,
					configurable: true
				},
				delta: {
	
					/** {@public}{@method}
	     * Dynamically compute and return the delta belonging to this proxy.
	     *
	     * @return the delta belonging to this proxy
	     */
	
					value: function delta() {
						var _this = this;
	
						var result = _get(Object.getPrototypeOf(ModifyProxy.prototype), "delta", this).call(this);
						result.subDeltas = {};
						this.childKeys().forEach(function (prop) {
							result.subDeltas[prop] = _this.childDelta(prop);
						});
						return result;
					},
					writable: true,
					configurable: true
				}
			});
	
			return ModifyProxy;
		})(deltaJs.ContainerProxy));
	
		/* composition - introducing 'Modify' ***********************************************/
		function t(type1, type2) {
			return function (d1, d2) {
				return d1.type === type1 && d2.type === type2;
			};
		}
		deltaJs.newComposition(t("Modify", "Modify"), function (d1, d2) {
			var result = d1.clone();
			Object.keys(d2.subDeltas).forEach(function (prop) {
				result.subDeltas[prop] = deltaJs.Delta.composed(result.subDeltas[prop], d2.subDeltas[prop]);
			});
			return result;
		});
	};
	
	///** {@public}{@method} // TODO: replace all this through the new Proxy refactoring
	// * Prepare a specific delta operation with this Modify delta as the base.
	// * @param options {object} - any options; there may be any number of these before the `path` argument
	// * @param path {string}    - the relative path to which to apply this operation
	// * @param args {[*]}       - the arguments to the operation
	// * @return {DeltaJs#Delta} - the delta resulting from the operation
	// */
	//operation(options, path, ...args) {
	//	var argss = [...arguments];
	//	var allOptions = {};
	//	while (typeof argss[0] === 'object') {
	//		U.extend(allOptions, argss.shift());
	//	}
	//	path = argss.shift();
	//	var delta = deltaJs._newDeltaByMethod(allOptions, ...argss);
	//	return this._addOperation(allOptions, new Path(path), delta);
	//}
	///** {@private}{@method}
	// * @param options {object}
	// * @param path    {string}
	// * @param delta   {DeltaJs#Delta}
	// */
	//_addOperation(options, path, delta) {
	//	/* if there is a 'rest' to the path, set a link in the chain */
	//	if (path.rest) {
	//		return this.operation({ method: 'modify' }, path.prop)
	//			._addOperation(options, path.rest, delta);
	//	}
	//
	//	/* store the new delta, possibly composed with an existing one */
	//	this.subDeltas[path.prop] = this.subDeltas[path.prop] ? this.subDeltas[path.prop].composedWith(delta) : delta;
	//
	//	/* return the composed delta if it has an operations interface; otherwise, return the given delta */
	//	return (this.subDeltas[path.prop] instanceof deltaJs.Delta.Composite) ? this.subDeltas[path.prop] : delta;
	//}

	///** {@public}{@method}
	// * Get the deepest existing Modify delta corresponding to a relative path.
	// * @param path {Path} - a path relative to this delta
	// * @return {{ delta: DeltaJs#Delta.Modify, rest: Path }} - the deepest Modify delta corresponding to the path,
	// *                                                         and the unused rest of the path
	// */
	//deepestModifyDeltaByPath(path) { // TODO: not needed anymore, right?
	//	if (U.isUndefined(path.prop) || this.subDeltas[path.prop].type !== 'Modify') {
	//		return { delta: this, rest: path };
	//	}
	//	return this.subDeltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
	//}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var _TargetJs = __webpack_require__(3);
	
	var WritableTarget = _TargetJs.WritableTarget;
	var ReadableTarget = _TargetJs.ReadableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var defineModify = _interopRequire(__webpack_require__(9));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs._basicOperationsDefined)) {
			return;
		}
		deltaJs._basicOperationsDefined = true;
	
		defineDelta(deltaJs);
		defineModify(deltaJs);
	
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
	
		/* declaring the basic operation types **********************************************/
		deltaJs.newOperationType("NoOp", (function (_deltaJs$Delta) {
			function NoOp() {
				_classCallCheck(this, NoOp);
	
				if (_deltaJs$Delta != null) {
					_deltaJs$Delta.apply(this, arguments);
				}
			}
	
			_inherits(NoOp, _deltaJs$Delta);
	
			return NoOp;
		})(deltaJs.Delta));
		deltaJs.newOperationType("Add", (function (_deltaJs$Delta2) {
			function Add() {
				_classCallCheck(this, Add);
	
				if (_deltaJs$Delta2 != null) {
					_deltaJs$Delta2.apply(this, arguments);
				}
			}
	
			_inherits(Add, _deltaJs$Delta2);
	
			_prototypeProperties(Add, null, {
				precondition: {
					//constructor(...args) { super(...args) }
	
					value: function precondition(target) {
						return target instanceof WritableTarget && U.isUndefined(target.value);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Add;
		})(deltaJs.Delta));
		deltaJs.newOperationType("Replace", (function (_deltaJs$Delta3) {
			function Replace() {
				_classCallCheck(this, Replace);
	
				if (_deltaJs$Delta3 != null) {
					_deltaJs$Delta3.apply(this, arguments);
				}
			}
	
			_inherits(Replace, _deltaJs$Delta3);
	
			_prototypeProperties(Replace, null, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && U.isDefined(target.value);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Replace;
		})(deltaJs.Delta));
		deltaJs.newOperationType("Remove", (function (_deltaJs$Delta4) {
			function Remove() {
				_classCallCheck(this, Remove);
	
				if (_deltaJs$Delta4 != null) {
					_deltaJs$Delta4.apply(this, arguments);
				}
			}
	
			_inherits(Remove, _deltaJs$Delta4);
	
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
		})(deltaJs.Delta));
		deltaJs.newOperationType("Forbid", (function (_deltaJs$Delta5) {
			function Forbid() {
				_classCallCheck(this, Forbid);
	
				if (_deltaJs$Delta5 != null) {
					_deltaJs$Delta5.apply(this, arguments);
				}
			}
	
			_inherits(Forbid, _deltaJs$Delta5);
	
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
		})(deltaJs.Delta));
	
		/* composition - introducing 'NoOp' *************************************************/
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.NoOp;
		}, function (d1, d2) {
			return d2.clone();
		});
		deltaJs.newComposition(function (d1, d2) {
			return d2 instanceof deltaJs.Delta.NoOp;
		}, function (d1, d2) {
			return d1.clone();
		});
	
		/* composition - introducing 'Add' **************************************************/
		deltaJs.newComposition(t("Add", "Modify"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
	
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
		deltaJs.newComposition(t("Replace", "Modify"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Replace", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Replace", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
	};

/***/ },
/* 11 */
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
	
	var defineBasicOperations = _interopRequire(__webpack_require__(10));
	
	var defineProxy = _interopRequire(__webpack_require__(17));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.PutIntoArray)) {
			return;
		}
	
		defineBasicOperations(deltaJs);
		defineProxy(deltaJs);
	
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
		deltaJs.newOperationType("PutIntoArray", (function (_deltaJs$Delta) {
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
				},
				methods: {
					get: function () {
						return [];
					},
					configurable: true
				}
			});
	
			return PutIntoArray;
		})(deltaJs.Delta));
	
		/* Proxy methods ****************************************************************************/
		deltaJs.newProxyMethod("prepend", function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: "prepend", value: value });
		});
		deltaJs.newProxyMethod("insert", function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: "insert", value: value });
		});
		deltaJs.newProxyMethod("append", function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: "append", value: value });
		});
	
		/* composition *******************************************************************************/
		deltaJs.newComposition(t("Add", "PutIntoArray"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Replace", "PutIntoArray"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("PutIntoArray", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoArray", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoArray", "PutIntoArray"), function (d1, d2) {
			return new deltaJs.Delta.PutIntoArray([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
		});
	
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
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
	
	var WritableTarget = __webpack_require__(3).WritableTarget;
	
	var defineBasicOperations = _interopRequire(__webpack_require__(10));
	
	var defineProxy = _interopRequire(__webpack_require__(17));
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.PutIntoFunction)) {
			return;
		}
	
		defineBasicOperations(deltaJs);
		defineProxy(deltaJs);
	
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
		deltaJs.newOperationType("PutIntoFunction", (function (_deltaJs$Delta) {
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
				},
				methods: {
					get: function () {
						return [];
					},
					configurable: true
				}
			});
	
			return PutIntoFunction;
		})(deltaJs.Delta));
	
		/* Proxy methods ****************************************************************************/
		deltaJs.newProxyMethod("prepend", function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: "prepend", value: value });
		});
		deltaJs.newProxyMethod("insert", function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: "insert", value: value });
		});
		deltaJs.newProxyMethod("append", function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: "append", value: value });
		});
	
		/* composition - introducing 'PutIntoFunction' **************************************************/
		deltaJs.newComposition(t("Add", "PutIntoFunction"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Replace", "PutIntoFunction"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("PutIntoFunction", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoFunction", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoFunction", "PutIntoFunction"), function (d1, d2) {
			return new deltaJs.Delta.PutIntoFunction([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
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
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(6));
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var defineModify = _interopRequire(__webpack_require__(9));
	
	var defineProxy = _interopRequire(__webpack_require__(17));
	
	var ApplicationOrderCycle = __webpack_require__(5).ApplicationOrderCycle;
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Delta.DeltaModel)) {
			return;
		}
	
		defineModify(deltaJs);
		defineProxy(deltaJs);
	
		deltaJs.newOperationType("DeltaModel", (function (_deltaJs$Delta) {
			function DeltaModel() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, DeltaModel);
	
				_get(Object.getPrototypeOf(DeltaModel.prototype), "constructor", this).apply(this, args);
				this.graph = new JsGraph();
			}
	
			_inherits(DeltaModel, _deltaJs$Delta);
	
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
					}
	
					// TODO: add precondition method which checks 'source' deltas
	
					,
					writable: true,
					configurable: true
				}
			});
	
			return DeltaModel;
		})(deltaJs.Delta), (function (_deltaJs$ContainerProxy) {
			function DeltaModelProxy() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, DeltaModelProxy);
	
				_get(Object.getPrototypeOf(DeltaModelProxy.prototype), "constructor", this).apply(this, args);
				this._childOptions = {}; // key -> options-of-first-occurrence
			}
	
			_inherits(DeltaModelProxy, _deltaJs$ContainerProxy);
	
			_prototypeProperties(DeltaModelProxy, null, {
				processProxyArguments: {
	
					/** {@public}{@method}
	     * @param rawArgs {*[]}
	     * @return {?{ options: Object, path: string, args: *[] }}
	     */
	
					value: function processProxyArguments() {
						for (var _len = arguments.length, rawArgs = Array(_len), _key = 0; _key < _len; _key++) {
							rawArgs[_key] = arguments[_key];
						}
	
						// rawArgs is parsed as (...options, name, ...options, path, ...args)
						var options = {};
						var path;
						do {
							if (rawArgs.length === 0) {
								throw new Error("The argument list for this Modify.DeltaModel method is insufficient.");
							}
							var arg = rawArgs.shift();
							if (typeof arg === "string") {
								if (!options.name) {
									options.name = arg;
								} else {
									path = arg;
								}
							} else {
								U.extend(options, arg);
							}
						} while (!path);
						return { options: options, path: path, args: rawArgs };
					},
					writable: true,
					configurable: true
				},
				addOperation: {
	
					/** {@public}{@method}
	     * @param delta   {DeltaJs#Delta}
	     * @param path    {Path}
	     * @param options {Object}
	     * @return {DeltaJs#Proxy}
	     */
	
					value: function addOperation(delta, path, options) {
						/* create proxies */
						var deepestProxy;
						if (path.prop) {
							var newOptions = U.extend({}, options, { name: undefined });
							var childProxy = this.addChildProxy(options.name, new deltaJs.Delta.Modify());
							deepestProxy = childProxy.addOperation(delta, path, newOptions);
						} else {
							deepestProxy = this.addChildProxy(options.name, delta);
						}
	
						/* store options */
						if (!this._childOptions[options.name]) {
							this._childOptions[options.name] = options;
						}
	
						/* return the deepest created proxy */
						return deepestProxy;
					},
					writable: true,
					configurable: true
				},
				delta: {
	
					/** {@public}{@method}
	     * Dynamically compute and return the delta belonging to this proxy.
	     *
	     * @return the delta belonging to this proxy
	     */
	
					value: function delta() {
						var _this = this;
	
						var result = _get(Object.getPrototypeOf(DeltaModelProxy.prototype), "delta", this).call(this);
						result.graph.clear();
						this.childKeys().forEach(function (name) {
							result.graph.addVertex(name, _this.childDelta(name));
							var options = _this._childOptions[name];
							[].concat(_toConsumableArray(options.resolves || []), _toConsumableArray(options.after || []), _toConsumableArray(options.requires || [])).forEach(function (subName) {
								result.graph.createEdge(subName, name);
								if (result.graph.hasCycle()) {
									result.graph.removeExistingEdge(subName, name);
									throw new ApplicationOrderCycle(subName, name);
								}
							});
						});
						return result;
					},
					writable: true,
					configurable: true
				}
			});
	
			return DeltaModelProxy;
		})(deltaJs.ContainerProxy));
	
		/* composition */
		// to compose delta models, we simply have one apply after the other
		// without any composability checks; in the future, this may become more clever
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.DeltaModel || d2 instanceof deltaJs.Delta.DeltaModel;
		}, function (d1, d2) {
			var result = new deltaJs.Delta.DeltaModel();
			result.graph.addNewVertex(1, d1);
			result.graph.addNewVertex(2, d2);
			result.graph.addNewEdge(1, 2);
			return result;
		});
	};
	
	///** {@public}{@method} // TODO: redo this stuff with the new Proxy refactoring
	// * Prepare a specific delta operation with this Modify delta as the base.
	// * @param options1 {object?} - any (optional) options; there may be any number of these before the `name` argument
	// * @param name {string}      - the name of the delta inside the delta model
	// * @param options2 {object?} - any (optional) options; there may be any number of these before the `path` argument
	// * @param path {string}      - the relative path to perform this operation on
	// * @param args {[*]}         - the arguments to the operation
	// * @return {DeltaJs#Delta} - the delta resulting from the operation
	// */
	//operation(options1, name, options2, path, ...args) {
	//	var argss = [...arguments];
	//	var allOptions = {};
	//	while (typeof argss[0] === 'object') {
	//		U.extend(allOptions, argss.shift());
	//	}
	//	name = argss.shift();
	//	while (typeof argss[0] === 'object') {
	//		U.extend(allOptions, argss.shift());
	//	}
	//	path = argss.shift();
	//	var delta = deltaJs._newDeltaByMethod(allOptions, ...argss);
	//	return this._addOperation(name, allOptions, new Path(path), delta);
	//}
	//
	//
	//_addOperation(name, options, path, delta) {
	//	var deltaBase;
	//
	//	/* check if a delta with this name already exists */
	//	var existingDelta = this.graph.vertexValue(name);
	//
	//
	//
	//	if (U.isDefined(existingDelta) && existingDelta.type === 'Modify' && U.isDefined(path.rest)) {
	//		return existingDelta._addOperation(options, path.rest, delta);
	//	}
	//
	//
	//	/* if there is a path, create the corresponding chain of deltas */
	//	if (path.prop) {
	//		deltaBase = new deltaJs.Delta.Modify();
	//		deltaBase._addOperation(options, path, delta);
	//	}
	//
	//	/* if there is already a delta with this name, compose them and return `delta` early */
	//	if (U.isDefined(existingDelta)) {
	//		deltaBase = existingDelta.composedWith(deltaBase);
	//		deltaBase.name = existingDelta.name;
	//		deltaBase.applicationCondition = existingDelta.applicationCondition;
	//		this.graph.setVertex(name, deltaBase);
	//	} else {
	//
	//		/* add the new delta to the delta model */
	//		deltaBase.name = name;
	//		this.graph.addVertex(name, deltaBase);
	//
	//		/* connect it to the partial order */
	//		(options['resolves'] || []).concat(options['after'] || []).concat(options['requires'] || []).forEach((subordinateName) => {
	//			this.graph.createEdge(subordinateName, name);
	//			if (this.graph.hasCycle()) {
	//				this.graph.removeExistingEdge(subordinateName, name);
	//				throw new ApplicationOrderCycle(subordinateName, name);
	//			}
	//		});
	//
	//		/* application condition and optionally, an eponymous, linked feature */
	//		var deltaFeature;
	//		if (options.feature) { deltaFeature = deltaJs.newFeature(  name,            options                             ) }
	//		else                 { deltaFeature = deltaJs.newFeature( `delta__${name}`, U.extend({ hidden: true }, options) ) }
	//		if (options.feature || deltaFeature.conditional) {
	//			deltaBase.applicationCondition = deltaFeature;
	//		}
	//
	//		/* extract 'if' from compound options */
	//		if (U.isDefined(options['resolves'])) {
	//			deltaFeature.if(options['resolves']);
	//		}
	//
	//		/* extract 'selects' from compound options */
	//		if (U.isDefined(options['requires'])) {
	//			deltaFeature.selects(options['requires']);
	//		}
	//	}
	//
	//	return delta;
	//}

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var rt = __webpack_require__(3).rt;
	
	var defineDeltaModel = _interopRequire(__webpack_require__(13));
	
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
	   * method on that 'root' delta model. It returns the proxy that allows new delta operations
	   * to be added more easily. It presets the 'feature' option to 'true', but this can be
	   * overwritten manually.
	   * @return {function} - the proxy to this delta, for easily adding operations
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
/* 16 */
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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(6));
	
	/* import internal stuff */
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var defineDelta = _interopRequire(__webpack_require__(7));
	
	var defineOverloaded = _interopRequire(__webpack_require__(8));
	
	var MultipleActiveProxiesError = __webpack_require__(5).MultipleActiveProxiesError;
	
	// TODO: Bake in delta model functionality
	// DONE: 'one Proxy active at a time' (cannot use earlier ones after new ones have been used)
	// TODO: Basic application of deltas
	// TODO: Composition in order to generate error messages
	// TODO: Error messages based on syntactic conflicts in delta models
	
	module.exports = function (deltaJs) {
		if (U.isDefined(deltaJs.Proxy)) {
			return;
		}
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		defineDelta(deltaJs);
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		deltaJs.Proxy = (function () {
			function Proxy() {
				var _ref = arguments[0] === undefined ? {} : arguments[0];
	
				var parent = _ref.parent;
				var delta = _ref.delta;
	
				_classCallCheck(this, Proxy);
	
				this._parent = parent;
				this._active = true;
				this._delta = delta;
			}
	
			_prototypeProperties(Proxy, null, {
				delta: {
					value: function delta() {
						return this._delta;
					},
					writable: true,
					configurable: true
				},
				active: {
					get: function () {
						return this._active;
					},
					configurable: true
				},
				deactivate: {
					value: function deactivate() {
						this._active = false;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Proxy;
		})();
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		/* a Proxy class for non-container operation types */
	
		var BasicProxy = (function (_deltaJs$Proxy) {
			function BasicProxy() {
				_classCallCheck(this, BasicProxy);
	
				if (_deltaJs$Proxy != null) {
					_deltaJs$Proxy.apply(this, arguments);
				}
			}
	
			_inherits(BasicProxy, _deltaJs$Proxy);
	
			return BasicProxy;
		})(deltaJs.Proxy);
	
		deltaJs.BasicProxy = BasicProxy;
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		/* a Proxy class for container operation types like Modify and DeltaModel */
		deltaJs.ContainerProxy = (function (_deltaJs$Proxy2) {
	
			// A Proxy instance exposes operation methods directly. Arguments
			// to those operations can be pre-supplied through the `do` method.
	
			function ContainerProxy() {
				var options = arguments[0] === undefined ? {} : arguments[0];
	
				_classCallCheck(this, ContainerProxy);
	
				_get(Object.getPrototypeOf(ContainerProxy.prototype), "constructor", this).call(this, options);
				this._doArgs = [];
				this._original = this;
				this._children = {}; // key -> [proxies]
				this._childOptions = {}; // key -> options
			}
	
			_inherits(ContainerProxy, _deltaJs$Proxy2);
	
			_prototypeProperties(ContainerProxy, {
				_newDeltaByMethod: {
	
					/** {@public}{@abstract}{@method}
	     * Create a delta based on a method-name and argument-list.
	     * If the method-name is overloaded, you'll automatically get
	     * an `Delta.Overloaded` instance.
	     *
	     * @param method {string}
	     * @param args   {[*]}
	     * @return {DeltaJs#Delta}
	     */
	
					value: function _newDeltaByMethod(method, args) {
						defineOverloaded(deltaJs);
						var newDeltas = deltaJs.ContainerProxy._methodHandlers[method].map(function (handler) {
							return handler.apply(undefined, _toConsumableArray(args));
						});
						if (newDeltas.length === 1) {
							return newDeltas[0];
						} else {
							// newDeltas.length > 1
							return new deltaJs.Delta.Overloaded(newDeltas);
						}
					},
					writable: true,
					configurable: true
				},
				newProxyMethod: {
	
					/** {@public}{@static}{@method}
	     * @param method  {string}   - method name
	     * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	     */
	
					value: function newProxyMethod(method, handler) {
	
						/* automatically populate the Proxy class with new operation method */
						if (U.isUndefined(deltaJs.ContainerProxy.prototype[method])) {
							deltaJs.ContainerProxy.prototype[method] = function () {
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}
	
								return this._do(method, args);
							};
						}
	
						/* register handlers for each method */
						U.a(deltaJs.ContainerProxy, "_methodHandlers", method).push(handler);
					},
					writable: true,
					configurable: true
				}
			}, {
				deactivate: {
					value: function deactivate() {
						var _this2 = this;
	
						Object.keys(this._children).forEach(function (key) {
							_this2.childProxy(key).deactivate();
						});
						_get(Object.getPrototypeOf(ContainerProxy.prototype), "deactivate", this).call(this);
					},
					writable: true,
					configurable: true
				},
				addChildProxy: {
					value: function addChildProxy(key, delta) {
						/* get the current proxy for the given key */
						var current = this.childProxy(key);
	
						/* get / create delta proxy */
						var ProxyClass = delta.constructor.Proxy || deltaJs.BasicProxy;
						var proxy = new ProxyClass({ delta: delta, parent: this });
	
						/* return the current proxy if it, and the current proxy, are both Modify.Proxy */
						if (current instanceof deltaJs.Delta.Modify.Proxy && proxy instanceof deltaJs.Delta.Modify.Proxy) {
							return current;
						}
	
						/* we need a new proxy, so deactivate the current one */
						if (current) {
							current.deactivate();
						}
	
						/* create a new Proxy of the right class, remember it and return it */
						this._children[key].push(proxy);
						return proxy;
					},
					writable: true,
					configurable: true
				},
				childKeys: {
					value: function childKeys() {
						return Object.keys(this._children);
					},
					writable: true,
					configurable: true
				},
				childProxies: {
					value: function childProxies(key) {
						return U.a(this._children, key);
					},
					writable: true,
					configurable: true
				},
				childProxy: {
					value: function childProxy(key) {
						return U.a(this._children, key)[this._children[key].length - 1];
					},
					writable: true,
					configurable: true
				},
				childDelta: {
					value: function childDelta(key) {
						var _deltaJs$Delta;
	
						return (_deltaJs$Delta = deltaJs.Delta).composed.apply(_deltaJs$Delta, _toConsumableArray(this.childProxies(key).map(function (proxy) {
							return proxy.delta();
						})));
					},
					writable: true,
					configurable: true
				},
				"do": {
					value: function _do() {
						for (var _len = arguments.length, doArgs = Array(_len), _key = 0; _key < _len; _key++) {
							doArgs[_key] = arguments[_key];
						}
	
						/* is this proxy active? */
						if (!this.active) {
							throw new MultipleActiveProxiesError();
						}
	
						/* return a version of this Proxy with extra preloaded args */
						// note that this mixes prototypical inheritance
						// into the existing classical inheritance scheme
						var result = Object.create(this);
						result._doArgs = [].concat(_toConsumableArray(this._doArgs), doArgs);
						result._original = this._original;
						return result;
					},
					writable: true,
					configurable: true
				},
				_do: {
					value: function _do(method, doArgs) {
						var _ref;
	
						/* is this proxy active? */
						if (!this.active) {
							throw new MultipleActiveProxiesError();
						}
	
						/* container-specific processing of arguments */
	
						var _processProxyArguments$apply = (_ref = this).processProxyArguments.apply(_ref, _toConsumableArray(this._doArgs).concat(_toConsumableArray(doArgs)));
	
						var options = _processProxyArguments$apply.options;
						var path = _processProxyArguments$apply.path;
						var args = _processProxyArguments$apply.args;
	
						/* the argument list is finished; create a new delta and put it in the right place */
						var delta = deltaJs.ContainerProxy._newDeltaByMethod(method, args);
						var proxy = this.addOperation(delta, new Path(path), options);
	
						/* return the right Proxy instance for chaining */
						return proxy instanceof deltaJs.ContainerProxy ? proxy : this;
					},
					writable: true,
					configurable: true
				},
				processProxyArguments: {
	
					//noinspection JSCommentMatchesSignature
					/** {@public}{@abstract}{@method}
	     * Subclasses of `ContainerProxy` should implement this method to extract an
	     * options object, path and final argument list from a given 'raw' argument list.
	     *
	     * @param args {[*]}
	     * @return {{options: Object, path: String, args: [*]}}
	     */
	
					value: function processProxyArguments() {
						throw new Error("A 'ContainerProxy' subclass needs to implement the 'processProxyArguments' method.");
					},
					writable: true,
					configurable: true
				},
				addOperation: {
	
					//noinspection JSCommentMatchesSignature
					/** {@public}{@abstract}{@method}
	     * Subclasses of `ContainerProxy` should implement this method to add a given delta
	     * under a given path with the given options, and return its corresponding Proxy.
	     *
	     * @param delta   {DeltaJs#Delta}
	     * @param path    {Path}
	     * @param options {Object}
	     * @return {DeltaJs#Proxy}
	     */
	
					value: function addOperation() {
						throw new Error("A 'ContainerProxy' subclass needs to implement the 'addOperation' method.");
					},
					writable: true,
					configurable: true
				}
			});
	
			return ContainerProxy;
		})(deltaJs.Proxy);
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		U.extend(deltaJs.Delta.prototype, {
	
			/** {@public}{@method}
	   * @param args {*[]}
	   * @return {DeltaJs#Proxy}
	   */
			"do": function _do() {
				var _ref;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				var ProxyClass = this.constructor.Proxy;
				if (!ProxyClass) {
					throw new Error("Calling 'do' on delta type '" + this.type + "', which has no Proxy interface.");
				}
				return (_ref = new ProxyClass({ delta: this }))["do"].apply(_ref, args);
			}
	
		});
	
		//deltaJs.ContainerProxy._proxyMethods = []; // method -> (args => Delta)
		//deltaJs.ContainerProxy._onNewProxyMethodListeners  = [];
		//
		//
		///* process new operation methods */
		//deltaJs.ContainerProxy.onNewProxyMethod((method, handler) => {
		//
		//	/* automatically populate the Proxy class with new operation method */
		//	if (U.isUndefined(deltaJs.ContainerProxy.prototype[method])) {
		//		deltaJs.ContainerProxy.prototype[method] = function (...args) {
		//			this._do(method, args);
		//		};
		//	}
		//
		//	/* register handlers for each method */
		//	U.a(deltaJs.ContainerProxy, '_methodHandlers', method).push(handler);
		//
		//});
	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
		///* all container-type proxies (Modify, DeltaModel) hold references to ProxyProxy's */
		//class Proxy {
		//
		//	// This class accumulates a sequence of Proxy instances,
		//	// where only the last one in the list is active.
		//	// The end-user should not get a reference to a ProxyProxy,
		//	// but should only hold references to its stored proxys.
		//
		//	constructor({parent} = {}) {
		//		this._parent  = parent;
		//		this._proxys = [];
		//	}
		//
		//	activeProxy() { return this._proxys[this._proxys.length-1] }
		//
		//	childProxy(ProxyClass) {
		//		/* can we reuse the currently active Proxy? if not, deactivate it */
		//		var current = this._activeProxy();
		//		if (current.constructor === ProxyClass && ProxyClass === deltaJs.Modify.Proxy) { return current }
		//		current._active = false;
		//
		//		/* create a new Proxy of the right class, remember it and return it */
		//		var next = new ProxyClass({ parent: this._parent }); // direct link to non-proxy parent
		//		this._proxys.push(next);
		//		return next;
		//	}
		//
		//	// TODO: applyTo method
		//
		//}
		//Proxy.Proxy = Proxy;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNWExMTBmN2IwNDg0MTQ1YjRkNyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFB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QUksVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQUcsT0FBSSxJQUFJLENBQUMsQ0FBQztJQUNuRDs7R0FFRCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWtFSCxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI1YTExMGY3YjA0ODQxNDViNGQ3XG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8ob2JqZWN0LCAuLi5rZXlzLnNsaWNlKDAsIC0xKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfSxcblxuXHRhKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywgW10pIH0sXG5cblx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHR9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuaW1wb3J0IGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zICAgICAgICAgICAgICBmcm9tICcuL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHJveHkuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHNcbiAqIGFuZCBhY3RzIGFzIGEgZmFjYWRlIChhcyBpbiBkZXNpZ24gcGF0dGVybikgdG8gdGhlIG1vcmUgc3BlY2lmaWNcbiAqIHN1YnN5c3RlbXMgb2YgZGVsdGEuanMuXG4gKlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIERlbHRhSnMgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YUpzIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lUHJveHkgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAgICB7c3RyaW5nfSAgIC0gbmFtZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiB0eXBlXG5cdCAqIEBwYXJhbSBEZWx0YUNsYXNzICB7RnVuY3Rpb259IC0gdGhlIG5ldyBvcGVyYXRpb24gY2xhc3Ncblx0ICogQHBhcmFtIFByb3h5Q2xhc3Mgez9GdW5jdGlvbn0gLSB0aGUgb3B0aW9uYWwgY3VzdG9tIFByb3h5IHN1YmNsYXNzIGZvciB0aGlzIG9wZXJhdGlvbi10eXBlXG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIERlbHRhQ2xhc3MsIFByb3h5Q2xhc3MpIHtcblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbiBjbGFzc2VzIG11c3QgaGF2ZSBhIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGNhcGl0YWwgbGV0dGVyIC0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5EZWx0YVtuYW1lXSksXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzdG9yZSB0aGUgb3BlcmF0aW9uIGNsYXNzICovXG5cdFx0dGhpcy5EZWx0YVtuYW1lXSA9IERlbHRhQ2xhc3M7XG5cblx0XHQvKiBzZXQgdGhlIChvcHRpb25hbCkgUHJveHkgY2xhc3MgKi9cblx0XHREZWx0YUNsYXNzLlByb3h5ID0gUHJveHlDbGFzcztcblxuXHRcdC8qIGZldGNoIHRoZSBnaXZlbiBhcHBseVRvIGZ1bmN0aW9uIChpZiBhbnkpIHdoaWNoIHdpbGwgYmUgc2xpZ2h0bHkgbW9kaWZpZWQgKi9cblx0XHR2YXIgZ2l2ZW5BcHBseVRvID0gRGVsdGFDbGFzcy5wcm90b3R5cGUuYXBwbHlUbyB8fCAoKCk9Pnt9KTtcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdFUuZXh0ZW5kKERlbHRhQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhlIHRhcmdldCBpcyBub3QgYWxyZWFkeSBpbiBUYXJnZXQgZm9ybSwgbWFrZSBpdCBzbyBub3cgKi9cblx0XHRcdFx0aWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCkpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBuZXcgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCh0YXJnZXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRnaXZlbkFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSxcblx0XHRcdHR5cGU6IG5hbWVcblx0XHR9KTtcblxuXHRcdC8qIGNyZWF0ZSBhbnkgZ2l2ZW4gbWV0aG9kcyB3aXRoIGRlZmF1bHQgaGFuZGxlciAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSk7XG5cdFx0KERlbHRhQ2xhc3MucHJvdG90eXBlLm1ldGhvZHMgfHwgW2xvd2VyY2FzZU5hbWVdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCAoLi4uYXJncykgPT4gbmV3IERlbHRhQ2xhc3MoLi4uYXJncykpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gRGVsdGFDbGFzcztcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0ICovXG5cdG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5EZWx0YS5uZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpO1xuXHR9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH0sXG5cdHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBcIlwiO1xuXHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLnByb3ApKSB7XG5cdFx0XHRyZXN1bHQgKz0gdGhpcy5wcm9wO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdFx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZSBkZWx0YS10eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHRcdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHRcdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBDb21wb3NpdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGExLCBkZWx0YTIpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50RmFpbHVyZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZmVhdHVyZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIGZlYXR1cmUgJyR7ZmVhdHVyZS5uYW1lfScgaXMgYm90aCBzZWxlY3RlZCBhbmQgZXhjbHVkZWQgYnkgaXRzIGNvbnN0cmFpbnRzLmA7XG5cdFx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25PcmRlckN5Y2xlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBuZXcgYXBwbGljYXRpb24gb3JkZXIgYmV0d2VlbiAke2Zyb219IGFuZCAke3RvfSBjcmVhdGVkIGEgY3ljbGUuYDtcblx0XHR0aGlzLmZyb20gPSBmcm9tO1xuXHRcdHRoaXMudG8gICA9IHRvO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnJlc29sdmVkRGVsdGFDb25mbGljdCBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGFzKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QnO1xuXHRcdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke2RlbHRhTmFtZXN9LmA7XG5cdFx0dGhpcy5kZWx0YXMgPSBkZWx0YXM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE9ubHkgb25lIFByb3h5IHBlciBwYXRoIGNhbiBiZSBhY3RpdmUgYXQgYW55IGdpdmVuIHRpbWUuYDtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICAgICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyAgICAgICAgICBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEpKSB7IHJldHVybiB9XG5cblxuXHRjbGFzcyBEZWx0YSB7XG5cblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHRoaXMuaWQgPSArK0RlbHRhLl9uZXh0SUQ7XG5cdFx0XHR0aGlzLmFyZ3MgPSBhcmdzO1xuXHRcdH1cblxuXG5cdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnKSB9XG5cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCBvciBhbiBpbnN0YW5jZSBvZiBgRGVsdGFKcy5BcHBsaWNhdGlvbkVycm9yYFxuXHRcdCAqL1xuXHRcdGV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMucHJlY29uZGl0aW9uKSB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKG9wdGlvbnMudGFyZ2V0UHJvcCkgICB7IHN0ciArPSBgIOKAuSR7b3B0aW9ucy50YXJnZXRQcm9wfeKAumAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGFzIHtbRGVsdGFKcyNEZWx0YV19IC0gdGhlIGRlbHRhcyB0byBjb21wb3NlXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRzdGF0aWMgY29tcG9zZWQoLi4uZGVsdGFzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGQxID0gcmVzdWx0LFxuXHRcdFx0XHRcdGQyID0gZGVsdGEgfHwgbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHRcdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSBEZWx0YS5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRcdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRcdFx0cmVzdWx0ID0gY29tcG9zZUZuKGQxLCBkMik7XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdH1cblx0RGVsdGEuX25leHRJRCA9IDA7XG5cdERlbHRhLl9jb21wb3NpdGlvbnMgID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHRkZWx0YUpzLkRlbHRhID0gRGVsdGE7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSkgeyByZXR1cm4gfVxuXG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ092ZXJsb2FkZWQnLCBjbGFzcyBPdmVybG9hZGVkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMub3ZlcmxvYWRzID0gdGhpcy5hcmcgfHwgW107XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWRcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL092ZXJsb2FkZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5IGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXG5cdGRlZmluZVByb3h5KGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdNb2RpZnknLCBjbGFzcyBNb2RpZnkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdFUuZXh0ZW5kKHRoaXMuc3ViRGVsdGFzLCB0aGlzLmFyZyB8fCB7fSk7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLnN1YkRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGlmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0XHR0aGlzLnN1YkRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdFxuXHRcdFx0XHRcdC5rZXlzKHRoaXMuc3ViRGVsdGFzKVxuXHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuc3ViRGVsdGFzW3BdLnRvU3RyaW5nKFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHRhcmdldFByb3A6IHAgfSkpKVxuXHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cblx0fSwgY2xhc3MgTW9kaWZ5UHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zLW9mLWZpcnN0LW9jY3VycmVuY2Vcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgcGF0aDogc3RyaW5nLCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpXG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0dmFyIHBhdGg7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5Qcm94eSBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7IHBhdGggPSBhcmcgICAgICAgICAgICAgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIHsgVS5leHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghcGF0aCk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBwYXRoLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIHBhdGggICAge1BhdGh9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIHBhdGgsIG9wdGlvbnMpIHtcblx0XHRcdGlmICghcGF0aC5wcm9wKSB7IHRocm93IG5ldyBFcnJvcignT3BlcmF0aW9ucyBvbiBhIE1vZGlmeS5Qcm94eSBuZWVkIHRvIGhhdmUgYSBub24tZW1wdHkgcGF0aC4nKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5LCBjaGlsZFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgcGF0aC5yZXN0LCBvcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNoaWxkUHJveHkgPSBkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIG9wdGlvbnMgKi9cblx0XHRcdGlmICghdGhpcy5fY2hpbGRPcHRpb25zW3BhdGgucHJvcF0pIHtcblx0XHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zW3BhdGgucHJvcF0gPSBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLmNoaWxkRGVsdGEocHJvcCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0sIGQyLnN1YkRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuLy8vKioge0BwdWJsaWN9e0BtZXRob2R9IC8vIFRPRE86IHJlcGxhY2UgYWxsIHRoaXMgdGhyb3VnaCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBhbnkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuLy8gKiBAcGFyYW0gYXJncyB7WypdfSAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgLi4uYXJncykge1xuLy9cdHZhciBhcmdzcyA9IFsuLi5hcmd1bWVudHNdO1xuLy9cdHZhciBhbGxPcHRpb25zID0ge307XG4vL1x0d2hpbGUgKHR5cGVvZiBhcmdzc1swXSA9PT0gJ29iamVjdCcpIHtcbi8vXHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3NzLnNoaWZ0KCkpO1xuLy9cdH1cbi8vXHRwYXRoID0gYXJnc3Muc2hpZnQoKTtcbi8vXHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIC4uLmFyZ3NzKTtcbi8vXHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG4vL31cbi8vLyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cbi8vICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cbi8vICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG4vLyAqL1xuLy9fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG4vL1x0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG4vL1x0aWYgKHBhdGgucmVzdCkge1xuLy9cdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKHsgbWV0aG9kOiAnbW9kaWZ5JyB9LCBwYXRoLnByb3ApXG4vL1x0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuLy9cdH1cbi8vXG4vL1x0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cbi8vXHR0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuLy9cbi8vXHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG4vL1x0cmV0dXJuICh0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuLy99XG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfVxuLy8gKiBHZXQgdGhlIGRlZXBlc3QgZXhpc3RpbmcgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gYSByZWxhdGl2ZSBwYXRoLlxuLy8gKiBAcGFyYW0gcGF0aCB7UGF0aH0gLSBhIHBhdGggcmVsYXRpdmUgdG8gdGhpcyBkZWx0YVxuLy8gKiBAcmV0dXJuIHt7IGRlbHRhOiBEZWx0YUpzI0RlbHRhLk1vZGlmeSwgcmVzdDogUGF0aCB9fSAtIHRoZSBkZWVwZXN0IE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXRoLFxuLy8gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgdW51c2VkIHJlc3Qgb2YgdGhlIHBhdGhcbi8vICovXG4vL2RlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoKSB7IC8vIFRPRE86IG5vdCBuZWVkZWQgYW55bW9yZSwgcmlnaHQ/XG4vL1x0aWYgKFUuaXNVbmRlZmluZWQocGF0aC5wcm9wKSB8fCB0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdLnR5cGUgIT09ICdNb2RpZnknKSB7XG4vL1x0XHRyZXR1cm4geyBkZWx0YTogdGhpcywgcmVzdDogcGF0aCB9O1xuLy9cdH1cbi8vXHRyZXR1cm4gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXS5kZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aC5yZXN0IHx8IG5ldyBQYXRoKCkpO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQgPSB0cnVlO1xuXG5cblx0ZGVmaW5lRGVsdGEgKGRlbHRhSnMpO1xuXHRkZWZpbmVNb2RpZnkoZGVsdGFKcyk7XG5cblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcsIGNsYXNzIE5vT3AgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHt9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdBZGQnLCBjbGFzcyBBZGQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHQvL2NvbnN0cnVjdG9yKC4uLmFyZ3MpIHsgc3VwZXIoLi4uYXJncykgfVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZXBsYWNlJywgY2xhc3MgUmVwbGFjZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywgY2xhc3MgUmVtb3ZlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywgY2xhc3MgRm9yYmlkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdOb09wJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCBkKCdBZGQnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZVByb3h5ICAgICAgICAgIChkZWx0YUpzKTtcblxuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5JywgY2xhc3MgUHV0SW50b0FycmF5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMuYXJnID8gKEFycmF5LmlzQXJyYXkodGhpcy5hcmcpID8gdGhpcy5hcmcgOiBbdGhpcy5hcmddKSA6IFtdO1xuXHRcdH1cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFsuLi50aGlzLnZhbHVlc107XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgICAgICAnUHV0SW50b0FycmF5JyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAgICAgICdQdXRJbnRvQXJyYXknKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlbW92ZScgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVwbGFjZScgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSk7XG5cdH0pO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbikpIHsgcmV0dXJuIH1cblxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIGNsYXNzIFB1dEludG9GdW5jdGlvbiBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHQoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IG1ldGhvZHMoKSB7IHJldHVybiBbXSB9XG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKFsuLi5kMS52YWx1ZXMsIC4uLmQyLnZhbHVlc10pO1xuXHR9KTtcblxuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKSkgeyByZXR1cm4gfVxuXG5cblx0ZGVmaW5lTW9kaWZ5KGRlbHRhSnMpO1xuXHRkZWZpbmVQcm94eSAoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0RlbHRhTW9kZWwnLCBjbGFzcyBEZWx0YU1vZGVsIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH1cblxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHRcdC8vIFRPRE86IGFkZCBwcmVjb25kaXRpb24gbWV0aG9kIHdoaWNoIGNoZWNrcyAnc291cmNlJyBkZWx0YXNcblxuXHR9LCBjbGFzcyBEZWx0YU1vZGVsUHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zLW9mLWZpcnN0LW9jY3VycmVuY2Vcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgcGF0aDogc3RyaW5nLCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIG5hbWUsIC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpXG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0dmFyIHBhdGg7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5EZWx0YU1vZGVsIG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMubmFtZSkgeyBvcHRpb25zLm5hbWUgPSBhcmcgICAgIH1cblx0XHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgeyBwYXRoICAgICAgICAgPSBhcmcgICAgIH1cblx0XHRcdFx0fSBlbHNlICAgICAgICAgICAgICAgICB7IFUuZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIXBhdGgpO1xuXHRcdFx0cmV0dXJuIHsgb3B0aW9ucywgcGF0aCwgYXJnczogcmF3QXJncyB9O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtQYXRofVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIHBhdGgsIG9wdGlvbnMpIHtcblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IG5hbWU6IHVuZGVmaW5lZCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkob3B0aW9ucy5uYW1lLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBwYXRoLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShvcHRpb25zLm5hbWUsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgb3B0aW9ucyAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZE9wdGlvbnNbb3B0aW9ucy5uYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnNbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguY2xlYXIoKTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkVmVydGV4KG5hbWUsIHRoaXMuY2hpbGREZWx0YShuYW1lKSk7XG5cdFx0XHRcdGxldCBvcHRpb25zID0gdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdO1xuXHRcdFx0XHRbIC4uLihvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdKSwgLi4uKG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10pLCAuLi4ob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkgXVxuXHRcdFx0XHRcdC5mb3JFYWNoKChzdWJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguY3JlYXRlRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwgfHxcblx0XHRkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbFxuXHQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfSAvLyBUT0RPOiByZWRvIHRoaXMgc3R1ZmYgd2l0aCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG4vLyAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuLy8gKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cbi8vICogQHBhcmFtIGFyZ3Mge1sqXX0gICAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCAuLi5hcmdzKSB7XG4vL1x0dmFyIGFyZ3NzID0gWy4uLmFyZ3VtZW50c107XG4vL1x0dmFyIGFsbE9wdGlvbnMgPSB7fTtcbi8vXHR3aGlsZSAodHlwZW9mIGFyZ3NzWzBdID09PSAnb2JqZWN0Jykge1xuLy9cdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJnc3Muc2hpZnQoKSk7XG4vL1x0fVxuLy9cdG5hbWUgPSBhcmdzcy5zaGlmdCgpO1xuLy9cdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG4vL1x0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcbi8vXHR9XG4vL1x0cGF0aCA9IGFyZ3NzLnNoaWZ0KCk7XG4vL1x0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCAuLi5hcmdzcyk7XG4vL1x0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuLy99XG4vL1xuLy9cbi8vX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuLy9cdHZhciBkZWx0YUJhc2U7XG4vL1xuLy9cdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cbi8vXHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG4vL1xuLy9cbi8vXG4vL1x0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpICYmIGV4aXN0aW5nRGVsdGEudHlwZSA9PT0gJ01vZGlmeScgJiYgVS5pc0RlZmluZWQocGF0aC5yZXN0KSkge1xuLy9cdFx0cmV0dXJuIGV4aXN0aW5nRGVsdGEuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cbi8vXHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cbi8vXHRpZiAocGF0aC5wcm9wKSB7XG4vL1x0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcbi8vXHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuLy9cdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSkge1xuLy9cdFx0ZGVsdGFCYXNlID0gZXhpc3RpbmdEZWx0YS5jb21wb3NlZFdpdGgoZGVsdGFCYXNlKTtcbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuLy9cdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcbi8vXHRcdHRoaXMuZ3JhcGguc2V0VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1x0fSBlbHNlIHtcbi8vXG4vL1x0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcbi8vXHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1xuLy9cdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuLy9cdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG4vL1x0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuLy9cdFx0XHRpZiAodGhpcy5ncmFwaC5oYXNDeWNsZSgpKSB7XG4vL1x0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcbi8vXHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG4vL1x0XHRcdH1cbi8vXHRcdH0pO1xuLy9cbi8vXHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuLy9cdFx0dmFyIGRlbHRhRmVhdHVyZTtcbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUpIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cbi8vXHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG4vL1x0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGRlbHRhRmVhdHVyZTtcbi8vXHRcdH1cbi8vXG4vL1x0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG4vL1x0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcbi8vXHRcdFx0ZGVsdGFGZWF0dXJlLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuLy9cdFx0fVxuLy9cbi8vXHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuLy9cdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG4vL1x0XHRcdGRlbHRhRmVhdHVyZS5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuLy9cdFx0fVxuLy9cdH1cbi8vXG4vL1x0cmV0dXJuIGRlbHRhO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0VS5hKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBjb25zdHJhaW50cyBiZXR3ZWVuIGZlYXR1cmVzIChlbmZvcmNlZCBieSBlcnJvcnMpICovXG5cdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRPbmx5SWYoZmVhdHVyZSwgY29uanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlXSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfb25seUlmW2ZlYXR1cmVdICE9PSBmYWxzZSkge1xuXHRcdFx0VS5hKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZE9ubHlJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHNldHRsaW5nIHJlbGF0aW9ucyBiZXR3ZWVuIGZlYXR1cmVzICovXG5cdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRpZiAoIV9jb25kaXRpb25zVW5zZXR0bGVkKSB7IHJldHVybiB9XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0ZG8ge1xuXHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSkgeyBfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0fSk7XG5cblx0fSwge1xuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIFUuYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0c2VsZWN0KCkgeyB0aGlzLmlmKHRydWUpIH1cblx0fSk7XG5cblxuXHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdGNvbnN0IEZFQVRVUkVfQ09OTkVDVElPTlMgPSBbXG5cdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzLCBfYWRkT25seUlmXSAgICAgICAgICAgIF0sIC8vIG90aGVyIHNlbGVjdGVkIGJ5IHRoaXNcblx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAobmFtZSA9PT0gbikge1xuXHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdH07XG5cdH0pO1xuXG5cblx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKi9cblx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7cnR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblxuXHRkZWZpbmVEZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cdGRlbHRhSnMuX2RlbHRhTW9kZWwgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdCAqL1xuXHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHR0aGlzLl9kZWx0YU1vZGVsLmFwcGx5VG8ocnQocm9vdCksIHtcblx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCBhZGRzIGEgbmV3IG9wZXJhdGlvbiB0byBpdC5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19ICAgICAgICAgLSB0aGUgYXJndW1lbnRzIHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJncykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwub3BlcmF0aW9uKC4uLmFyZ3VtZW50cyk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIHByb3h5IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgcHJveHkgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGRvKC4uLmFyZ3MpIHtcblx0XHRcdC8vIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwsIGRlbHRhcyBhcmUgZmVhdHVyZXMgYnkgZGVmYXVsdFxuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwuZG8oeyBmZWF0dXJlOiB0cnVlIH0sIC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0cmV0dXJuIFUuaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdCguLi5mZWF0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuLy8gVE9ETzogQmFrZSBpbiBkZWx0YSBtb2RlbCBmdW5jdGlvbmFsaXR5XG4vLyBET05FOiAnb25lIFByb3h5IGFjdGl2ZSBhdCBhIHRpbWUnIChjYW5ub3QgdXNlIGVhcmxpZXIgb25lcyBhZnRlciBuZXcgb25lcyBoYXZlIGJlZW4gdXNlZClcbi8vIFRPRE86IEJhc2ljIGFwcGxpY2F0aW9uIG9mIGRlbHRhc1xuLy8gVE9ETzogQ29tcG9zaXRpb24gaW4gb3JkZXIgdG8gZ2VuZXJhdGUgZXJyb3IgbWVzc2FnZXNcbi8vIFRPRE86IEVycm9yIG1lc3NhZ2VzIGJhc2VkIG9uIHN5bnRhY3RpYyBjb25mbGljdHMgaW4gZGVsdGEgbW9kZWxzXG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuUHJveHkpKSB7IHJldHVybiB9XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0ZGVsdGFKcy5Qcm94eSA9IGNsYXNzIFByb3h5IHtcblxuXHRcdGNvbnN0cnVjdG9yKHtwYXJlbnQsIGRlbHRhfSA9IHt9KSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5fZGVsdGEgPSBkZWx0YTtcblx0XHR9XG5cblx0XHRkZWx0YSgpIHsgcmV0dXJuIHRoaXMuX2RlbHRhOyB9XG5cblx0XHRnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlIH1cblxuXHRcdGRlYWN0aXZhdGUoKSB7IHRoaXMuX2FjdGl2ZSA9IGZhbHNlIH1cblxuXHR9O1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIG5vbi1jb250YWluZXIgb3BlcmF0aW9uIHR5cGVzICovXG5cdGNsYXNzIEJhc2ljUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHt9XG5cdGRlbHRhSnMuQmFzaWNQcm94eSA9IEJhc2ljUHJveHk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogYSBQcm94eSBjbGFzcyBmb3IgY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyBsaWtlIE1vZGlmeSBhbmQgRGVsdGFNb2RlbCAqL1xuXHRkZWx0YUpzLkNvbnRhaW5lclByb3h5ID0gY2xhc3MgQ29udGFpbmVyUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHtcblxuXHRcdC8vIEEgUHJveHkgaW5zdGFuY2UgZXhwb3NlcyBvcGVyYXRpb24gbWV0aG9kcyBkaXJlY3RseS4gQXJndW1lbnRzXG5cdFx0Ly8gdG8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gYmUgcHJlLXN1cHBsaWVkIHRocm91Z2ggdGhlIGBkb2AgbWV0aG9kLlxuXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRcdHRoaXMuX2RvQXJncyAgICAgICA9IFtdO1xuXHRcdFx0dGhpcy5fb3JpZ2luYWwgICAgID0gdGhpcztcblx0XHRcdHRoaXMuX2NoaWxkcmVuICAgICA9IHt9OyAvLyBrZXkgLT4gW3Byb3hpZXNdXG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnNcblx0XHR9XG5cblxuXHRcdGRlYWN0aXZhdGUoKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY2hpbGRQcm94eShrZXkpLmRlYWN0aXZhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0c3VwZXIuZGVhY3RpdmF0ZSgpO1xuXHRcdH1cblxuXG5cdFx0YWRkQ2hpbGRQcm94eShrZXksIGRlbHRhKSB7XG5cdFx0XHQvKiBnZXQgdGhlIGN1cnJlbnQgcHJveHkgZm9yIHRoZSBnaXZlbiBrZXkgKi9cblx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5jaGlsZFByb3h5KGtleSk7XG5cblx0XHRcdC8qIGdldCAvIGNyZWF0ZSBkZWx0YSBwcm94eSAqL1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSBkZWx0YS5jb25zdHJ1Y3Rvci5Qcm94eSB8fCBkZWx0YUpzLkJhc2ljUHJveHk7XG5cdFx0XHR2YXIgcHJveHkgPSBuZXcgUHJveHlDbGFzcyh7IGRlbHRhLCBwYXJlbnQ6IHRoaXMgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY3VycmVudCBwcm94eSBpZiBpdCwgYW5kIHRoZSBjdXJyZW50IHByb3h5LCBhcmUgYm90aCBNb2RpZnkuUHJveHkgKi9cblx0XHRcdGlmIChjdXJyZW50IGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkgJiZcblx0XHRcdFx0cHJveHkgICBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5KSB7IHJldHVybiBjdXJyZW50IH1cblxuXHRcdFx0Lyogd2UgbmVlZCBhIG5ldyBwcm94eSwgc28gZGVhY3RpdmF0ZSB0aGUgY3VycmVudCBvbmUgKi9cblx0XHRcdGlmIChjdXJyZW50KSB7IGN1cnJlbnQuZGVhY3RpdmF0ZSgpIH1cblxuXHRcdFx0LyogY3JlYXRlIGEgbmV3IFByb3h5IG9mIHRoZSByaWdodCBjbGFzcywgcmVtZW1iZXIgaXQgYW5kIHJldHVybiBpdCAqL1xuXHRcdFx0dGhpcy5fY2hpbGRyZW5ba2V5XS5wdXNoKHByb3h5KTtcblx0XHRcdHJldHVybiBwcm94eTtcblx0XHR9XG5cblxuXHRcdGNoaWxkS2V5cygpIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKSB9XG5cblxuXHRcdGNoaWxkUHJveGllcyhrZXkpIHsgcmV0dXJuIFUuYSh0aGlzLl9jaGlsZHJlbiwga2V5KSB9XG5cblxuXHRcdGNoaWxkUHJveHkoa2V5KSB7IHJldHVybiBVLmEodGhpcy5fY2hpbGRyZW4sIGtleSlbdGhpcy5fY2hpbGRyZW5ba2V5XS5sZW5ndGgtMV0gfVxuXG5cblx0XHRjaGlsZERlbHRhKGtleSkge1xuXHRcdFx0cmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQoXG5cdFx0XHRcdC4uLnRoaXMuY2hpbGRQcm94aWVzKGtleSkubWFwKHByb3h5ID0+IHByb3h5LmRlbHRhKCkpXG5cdFx0XHQpO1xuXHRcdH1cblxuXG5cdFx0ZG8oLi4uZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiByZXR1cm4gYSB2ZXJzaW9uIG9mIHRoaXMgUHJveHkgd2l0aCBleHRyYSBwcmVsb2FkZWQgYXJncyAqL1xuXHRcdFx0Ly8gbm90ZSB0aGF0IHRoaXMgbWl4ZXMgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlXG5cdFx0XHQvLyBpbnRvIHRoZSBleGlzdGluZyBjbGFzc2ljYWwgaW5oZXJpdGFuY2Ugc2NoZW1lXG5cdFx0XHR2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcblx0XHRcdHJlc3VsdC5fZG9BcmdzICAgPSBbLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3NdO1xuXHRcdFx0cmVzdWx0Ll9vcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdF9kbyhtZXRob2QsIGRvQXJncykge1xuXG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiBjb250YWluZXItc3BlY2lmaWMgcHJvY2Vzc2luZyBvZiBhcmd1bWVudHMgKi9cblx0XHRcdHZhciB7b3B0aW9ucywgcGF0aCwgYXJnc30gPSB0aGlzLnByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi50aGlzLl9kb0FyZ3MsIC4uLmRvQXJncyk7XG5cblx0XHRcdC8qIHRoZSBhcmd1bWVudCBsaXN0IGlzIGZpbmlzaGVkOyBjcmVhdGUgYSBuZXcgZGVsdGEgYW5kIHB1dCBpdCBpbiB0aGUgcmlnaHQgcGxhY2UgKi9cblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKTtcblx0XHRcdHZhciBwcm94eSA9IHRoaXMuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXcgUGF0aChwYXRoKSwgb3B0aW9ucyk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgcmlnaHQgUHJveHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nICovXG5cdFx0XHRyZXR1cm4gKHByb3h5IGluc3RhbmNlb2YgZGVsdGFKcy5Db250YWluZXJQcm94eSkgPyBwcm94eSA6IHRoaXM7XG5cdFx0fVxuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gZXh0cmFjdCBhblxuXHRcdCAqIG9wdGlvbnMgb2JqZWN0LCBwYXRoIGFuZCBmaW5hbCBhcmd1bWVudCBsaXN0IGZyb20gYSBnaXZlbiAncmF3JyBhcmd1bWVudCBsaXN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGFyZ3Mge1sqXX1cblx0XHQgKiBAcmV0dXJuIHt7b3B0aW9uczogT2JqZWN0LCBwYXRoOiBTdHJpbmcsIGFyZ3M6IFsqXX19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAncHJvY2Vzc1Byb3h5QXJndW1lbnRzJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gYWRkIGEgZ2l2ZW4gZGVsdGFcblx0XHQgKiB1bmRlciBhIGdpdmVuIHBhdGggd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucywgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBQcm94eS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtQYXRofVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdhZGRPcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIENyZWF0ZSBhIGRlbHRhIGJhc2VkIG9uIGEgbWV0aG9kLW5hbWUgYW5kIGFyZ3VtZW50LWxpc3QuXG5cdFx0ICogSWYgdGhlIG1ldGhvZC1uYW1lIGlzIG92ZXJsb2FkZWQsIHlvdSdsbCBhdXRvbWF0aWNhbGx5IGdldFxuXHRcdCAqIGFuIGBEZWx0YS5PdmVybG9hZGVkYCBpbnN0YW5jZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXJncyAgIHtbKl19XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRzdGF0aWMgX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKSB7XG5cdFx0XHRkZWZpbmVPdmVybG9hZGVkKGRlbHRhSnMpO1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX21ldGhvZEhhbmRsZXJzW21ldGhvZF0ubWFwKGhhbmRsZXIgPT4gaGFuZGxlciguLi5hcmdzKSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0cmV0dXJuIG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQobmV3RGVsdGFzKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0XHQgKiBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIG1ldGhvZCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgbmV3IGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblxuXHRcdFx0LyogYXV0b21hdGljYWxseSBwb3B1bGF0ZSB0aGUgUHJveHkgY2xhc3Mgd2l0aCBuZXcgb3BlcmF0aW9uIG1ldGhvZCAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSkpIHtcblx0XHRcdFx0ZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2RvKG1ldGhvZCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJlZ2lzdGVyIGhhbmRsZXJzIGZvciBlYWNoIG1ldGhvZCAqL1xuXHRcdFx0VS5hKGRlbHRhSnMuQ29udGFpbmVyUHJveHksICdfbWV0aG9kSGFuZGxlcnMnLCBtZXRob2QpLnB1c2goaGFuZGxlcik7XG5cblx0XHR9XG5cblx0fTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBhcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IHRoaXMuY29uc3RydWN0b3IuUHJveHk7XG5cdFx0XHRpZiAoIVByb3h5Q2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nICdkbycgb24gZGVsdGEgdHlwZSAnJHt0aGlzLnR5cGV9Jywgd2hpY2ggaGFzIG5vIFByb3h5IGludGVyZmFjZS5gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJveHlDbGFzcyh7IGRlbHRhOiB0aGlzIH0pLmRvKC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cblxuXHQvL2RlbHRhSnMuQ29udGFpbmVyUHJveHkuX3Byb3h5TWV0aG9kcyA9IFtdOyAvLyBtZXRob2QgLT4gKGFyZ3MgPT4gRGVsdGEpXG5cdC8vZGVsdGFKcy5Db250YWluZXJQcm94eS5fb25OZXdQcm94eU1ldGhvZExpc3RlbmVycyAgPSBbXTtcblx0Ly9cblx0Ly9cblx0Ly8vKiBwcm9jZXNzIG5ldyBvcGVyYXRpb24gbWV0aG9kcyAqL1xuXHQvL2RlbHRhSnMuQ29udGFpbmVyUHJveHkub25OZXdQcm94eU1ldGhvZCgobWV0aG9kLCBoYW5kbGVyKSA9PiB7XG5cdC8vXG5cdC8vXHQvKiBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBQcm94eSBjbGFzcyB3aXRoIG5ldyBvcGVyYXRpb24gbWV0aG9kICovXG5cdC8vXHRpZiAoVS5pc1VuZGVmaW5lZChkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdKSkge1xuXHQvL1x0XHRkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0Ly9cdFx0XHR0aGlzLl9kbyhtZXRob2QsIGFyZ3MpO1xuXHQvL1x0XHR9O1xuXHQvL1x0fVxuXHQvL1xuXHQvL1x0LyogcmVnaXN0ZXIgaGFuZGxlcnMgZm9yIGVhY2ggbWV0aG9kICovXG5cdC8vXHRVLmEoZGVsdGFKcy5Db250YWluZXJQcm94eSwgJ19tZXRob2RIYW5kbGVycycsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblx0Ly9cblx0Ly99KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvLy8qIGFsbCBjb250YWluZXItdHlwZSBwcm94aWVzIChNb2RpZnksIERlbHRhTW9kZWwpIGhvbGQgcmVmZXJlbmNlcyB0byBQcm94eVByb3h5J3MgKi9cblx0Ly9jbGFzcyBQcm94eSB7XG5cdC8vXG5cdC8vXHQvLyBUaGlzIGNsYXNzIGFjY3VtdWxhdGVzIGEgc2VxdWVuY2Ugb2YgUHJveHkgaW5zdGFuY2VzLFxuXHQvL1x0Ly8gd2hlcmUgb25seSB0aGUgbGFzdCBvbmUgaW4gdGhlIGxpc3QgaXMgYWN0aXZlLlxuXHQvL1x0Ly8gVGhlIGVuZC11c2VyIHNob3VsZCBub3QgZ2V0IGEgcmVmZXJlbmNlIHRvIGEgUHJveHlQcm94eSxcblx0Ly9cdC8vIGJ1dCBzaG91bGQgb25seSBob2xkIHJlZmVyZW5jZXMgdG8gaXRzIHN0b3JlZCBwcm94eXMuXG5cdC8vXG5cdC8vXHRjb25zdHJ1Y3Rvcih7cGFyZW50fSA9IHt9KSB7XG5cdC8vXHRcdHRoaXMuX3BhcmVudCAgPSBwYXJlbnQ7XG5cdC8vXHRcdHRoaXMuX3Byb3h5cyA9IFtdO1xuXHQvL1x0fVxuXHQvL1xuXHQvL1x0YWN0aXZlUHJveHkoKSB7IHJldHVybiB0aGlzLl9wcm94eXNbdGhpcy5fcHJveHlzLmxlbmd0aC0xXSB9XG5cdC8vXG5cdC8vXHRjaGlsZFByb3h5KFByb3h5Q2xhc3MpIHtcblx0Ly9cdFx0LyogY2FuIHdlIHJldXNlIHRoZSBjdXJyZW50bHkgYWN0aXZlIFByb3h5PyBpZiBub3QsIGRlYWN0aXZhdGUgaXQgKi9cblx0Ly9cdFx0dmFyIGN1cnJlbnQgPSB0aGlzLl9hY3RpdmVQcm94eSgpO1xuXHQvL1x0XHRpZiAoY3VycmVudC5jb25zdHJ1Y3RvciA9PT0gUHJveHlDbGFzcyAmJiBQcm94eUNsYXNzID09PSBkZWx0YUpzLk1vZGlmeS5Qcm94eSkgeyByZXR1cm4gY3VycmVudCB9XG5cdC8vXHRcdGN1cnJlbnQuX2FjdGl2ZSA9IGZhbHNlO1xuXHQvL1xuXHQvL1x0XHQvKiBjcmVhdGUgYSBuZXcgUHJveHkgb2YgdGhlIHJpZ2h0IGNsYXNzLCByZW1lbWJlciBpdCBhbmQgcmV0dXJuIGl0ICovXG5cdC8vXHRcdHZhciBuZXh0ID0gbmV3IFByb3h5Q2xhc3MoeyBwYXJlbnQ6IHRoaXMuX3BhcmVudCB9KTsgLy8gZGlyZWN0IGxpbmsgdG8gbm9uLXByb3h5IHBhcmVudFxuXHQvL1x0XHR0aGlzLl9wcm94eXMucHVzaChuZXh0KTtcblx0Ly9cdFx0cmV0dXJuIG5leHQ7XG5cdC8vXHR9XG5cdC8vXG5cdC8vXHQvLyBUT0RPOiBhcHBseVRvIG1ldGhvZFxuXHQvL1xuXHQvL31cblx0Ly9Qcm94eS5Qcm94eSA9IFByb3h5O1xuXG5cblxuXG5cblxuXG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1Byb3h5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==