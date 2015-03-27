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
	
	var extend = __webpack_require__(1).extend;
	
	/* import the DeltaJs class */
	
	var DeltaJs = _interopRequire(__webpack_require__(2));
	
	/* make Target classes available under the DeltaJs symbol */
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var WritableTarget = _TargetJs.WritableTarget;
	
	extend(DeltaJs, { ReadableTarget: ReadableTarget, WritableTarget: WritableTarget });
	
	/* make Path classes available under the DeltaJs symbol */
	
	var Path = _interopRequire(__webpack_require__(4));
	
	extend(DeltaJs, { Path: Path });
	
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
	
	extend(DeltaJs, { ApplicationError: ApplicationError, MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
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
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/*  extend the first passed object with the properties     */
	/*  of the other objects, from left to right, and returns  */
	/*  the first passed object                                */
	exports.extend = extend;
	exports.dfault = dfault;
	exports.o = o;
	exports.a = a;
	
	/* a simple `assert` function, to express a condition that is expected to be true */
	exports.assert = assert;
	
	/* test if a value is `undefined` */
	exports.isUndefined = isUndefined;
	
	/* test if a value is defined (not `undefined`) */
	exports.isDefined = isDefined;
	
	/* repeat a string a given number of times */
	exports.repeat = repeat;
	
	/* shift every line in a string right by a given number of spaces */
	exports.indent = indent;
	
	/* run a function only once per obj+string combo */
	exports.oncePer = oncePer;
	
	function extend(obj1) {
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
	}
	
	function dfault(object) {
		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}
	
		var keys = rest.slice(0, -1);
		var def = rest[rest.length - 1];
		if (keys.length === 0) {
			return object;
		}
		var last = o.apply(undefined, [object].concat(_toConsumableArray(keys.slice(0, -1))));
		if (isUndefined(last[keys[keys.length - 1]])) {
			last[keys[keys.length - 1]] = def;
		}
		return last[keys[keys.length - 1]];
	}
	
	function o(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return dfault.apply(undefined, [object].concat(keys, [{}]));
	}
	
	function a(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return dfault.apply(undefined, [object].concat(keys, [[]]));
	}
	
	function assert(condition, message) {
		if (!condition) {
			throw new Error(message || "Assertion failed");
		}
	}
	
	function isUndefined(val) {
		return typeof val === "undefined";
	}
	
	function isDefined(val) {
		return typeof val !== "undefined";
	}
	
	function repeat(nr, str) {
		return new Array(nr + 1).join(str);
	}
	
	function indent(str, amount) {
		var char = arguments[2] === undefined ? " " : arguments[2];
	
		return str.replace(/^(?!\s*$)/mg, repeat(amount, char));
	}
	
	function oncePer(obj, key, fn) {
		var opfn = function (obj) {
			var p = "_once per: " + key;
			if (obj[p]) {
				return;
			}
			obj[p] = true; // TODO: make non-enumeratable, or use ES6 Symbol
			return fn.call(obj, obj);
		};
		if (typeof obj === "string") {
			var _ref = [obj, key];
	
			var _ref2 = _slicedToArray(_ref, 2);
	
			key = _ref2[0];
			fn = _ref2[1];
	
			return opfn;
		} else {
			return opfn(obj);
		}
	}
	
	/* shorthand specifier for composition preconditions */
	var t = exports.t = function (type1, type2) {
		return function (d1, d2) {
			return d1.type === type1 && d2.type === type2;
		};
	};
	
	/* shorthand specifier for composition implementations */
	var define_d = exports.define_d = function (deltaJs) {
		return function (type, fn) {
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
		};
	};
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var assert = _utilJs.assert;
	var isUndefined = _utilJs.isUndefined;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var WritableTarget = _TargetJs.WritableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(7));
	
	var define_Overloaded = _interopRequire(__webpack_require__(8));
	
	var define_Modify = _interopRequire(__webpack_require__(9));
	
	var define_basicOperations = _interopRequire(__webpack_require__(10));
	
	var define_PutIntoArray = _interopRequire(__webpack_require__(11));
	
	var define_PutIntoFunction = _interopRequire(__webpack_require__(12));
	
	var define_DeltaModel = _interopRequire(__webpack_require__(13));
	
	var define_features = _interopRequire(__webpack_require__(14));
	
	var define_variationPoints = _interopRequire(__webpack_require__(15));
	
	var define_applicationConditions = _interopRequire(__webpack_require__(16));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(17));
	
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
	
			define_ContainerProxy(this);
			define_Delta(this);
			define_Overloaded(this);
			define_Modify(this);
			define_basicOperations(this);
			define_PutIntoArray(this);
			define_PutIntoFunction(this);
			define_DeltaModel(this);
			define_features(this);
			define_variationPoints(this);
			define_applicationConditions(this);
		}
	
		_prototypeProperties(DeltaJs, null, {
			newOperationType: {
	
				/** {@public}{@method}
	    * @param name       {string}   - name of the new operation type
	    * @param DeltaClass {Function} - the new operation class
	    * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	    */
	
				value: function newOperationType(name, DeltaClass, ProxyClass) {
					var _this = this;
	
					/* sanity checks */
					assert(name[0] === name[0].toUpperCase(), "Delta operation classes must have a name starting with a capital letter - '" + name + "' does not.");
					assert(isUndefined(this.Delta[name]), "The '" + name + "' operation type already exists.");
	
					/* store the operation class */
					this.Delta[name] = DeltaClass;
	
					/* set the (optional) Proxy class */
					DeltaClass.Proxy = ProxyClass;
	
					/* fetch the given applyTo function (if any) which will be slightly modified */
					var givenApplyTo = DeltaClass.prototype.applyTo || function () {};
	
					/* augment the class prototype */
					extend(DeltaClass.prototype, {
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
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.wt = wt;
	exports.rt = rt;
	
	var U = _interopRequire(__webpack_require__(1));
	
	var ReadableTarget = exports.ReadableTarget = (function () {
		function ReadableTarget(value) {
			_classCallCheck(this, ReadableTarget);
	
			this._val = value;
		}
	
		_prototypeProperties(ReadableTarget, null, {
			getValue: {
				value: function getValue() {
					return this._val;
				},
				writable: true,
				configurable: true
			},
			value: {
				get: function () {
					return this.getValue();
				},
				set: function (v) {
					this.setValue(v);
				},
				configurable: true
			}
		});
	
		return ReadableTarget;
	})();
	
	var WritableTarget = exports.WritableTarget = (function (ReadableTarget) {
		function WritableTarget(obj, prop) {
			_classCallCheck(this, WritableTarget);
	
			_get(Object.getPrototypeOf(WritableTarget.prototype), "constructor", this).call(this);
			this._obj = obj;
			this._prop = prop;
		}
	
		_inherits(WritableTarget, ReadableTarget);
	
		_prototypeProperties(WritableTarget, null, {
			getValue: {
				value: function getValue() {
					return this._obj[this._prop];
				},
				writable: true,
				configurable: true
			},
			setValue: {
				value: function setValue(v) {
					this._obj[this._prop] = v;
				},
				writable: true,
				configurable: true
			},
			"delete": {
				value: function _delete() {
					delete this._obj[this._prop];
				},
				writable: true,
				configurable: true
			}
		});
	
		return WritableTarget;
	})(ReadableTarget);
	
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
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _utilJs = __webpack_require__(1);
	
	var U = _interopRequire(_utilJs);
	
	var assert = _utilJs.assert;
	var isDefined = _utilJs.isDefined;
	
	var Path = (function () {
		function Path() {
			var str = arguments[0] === undefined ? "" : arguments[0];
	
			_classCallCheck(this, Path);
	
			///////////////////////  11111  22222222222  33  //
			var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
			assert(match, "The path string '" + str + "' is not well formed.");
	
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
		}
	
		_prototypeProperties(Path, null, {
			set: {
				value: function set(other) {
					this._prop = other._prop;
					this._rest = other._rest;
				},
				writable: true,
				configurable: true
			},
			prop: {
				get: function () {
					return this._prop;
				},
				configurable: true
			},
			rest: {
				get: function () {
					return this._rest;
				},
				configurable: true
			},
			toString: {
				value: function toString() {
					var result = "";
					if (isDefined(this.prop)) {
						result += this.prop;
						if (isDefined(this.rest)) {
							result += "." + this.rest.toString();
						}
					}
					return result;
				},
				writable: true,
				configurable: true
			}
		});
	
		return Path;
	})();
	
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
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var oncePer = _utilJs.oncePer;
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var wt = _TargetJs.wt;
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	
	var define_Composed = _interopRequire(__webpack_require__(18));
	
	module.exports = oncePer("Delta", function (deltaJs) {
	
		oncePer(deltaJs.constructor, "Delta", function () {
	
			extend(deltaJs.constructor.prototype, {
				/** {@public}{@method}
	    * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	    * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	    */
				newComposition: function newComposition(precondition, compose) {
					this.Delta.newComposition(precondition, compose);
				}
			});
		});
	
		deltaJs.Delta = (function () {
			function Delta() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Delta);
	
				this.id = ++deltaJs.Delta._nextID;
				this.args = args;
			}
	
			_prototypeProperties(Delta, {
				newComposition: {
	
					/** {@public}{@static}{@method}
	     * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	     * @param compose {Boolean|((DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta)} - false, or a side-effect free function
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
	
							/* throw an error if 'false' was found rather than a function*/
							if (composeFn === false || !success) {
								throw new CompositionError(d1, d2);
							}
	
							/*  if no composition function is found, use a linear delta model  */
							/*  to 'naively' have one delta apply after another                */
							if (composeFn === true) {
								composeFn = function (d1, d2) {
									return new deltaJs.Delta.Composed([d1, d2]);
								};
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
		deltaJs.Delta._nextID = 0;
		deltaJs.Delta._compositions = []; // [{precondition, composeFn}]
	
		/* define deltaJs.Delta.Composed for use in compositions */
		define_Composed(deltaJs);
	});

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
	
	var define_Delta = _interopRequire(__webpack_require__(7));
	
	var _utilJs = __webpack_require__(1);
	
	var U = _interopRequire(_utilJs);
	
	var indent = _utilJs.indent;
	var oncePer = _utilJs.oncePer;
	
	var _ErrorJs = __webpack_require__(5);
	
	var MultipleOverloadsApplicationError = _ErrorJs.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorJs.NoOverloadsApplicationError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	module.exports = oncePer("Overloaded", function (deltaJs) {
	
		define_Delta(deltaJs);
	
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
						str += "\n" + indent(overloads, 4);
						return str;
					},
					writable: true,
					configurable: true
				}
			});
	
			return Overloaded;
		})(deltaJs.Delta));
	
		/* composition */
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
	});

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
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var indent = _utilJs.indent;
	var t = _utilJs.t;
	var oncePer = _utilJs.oncePer;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var wt = __webpack_require__(3).wt;
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(17));
	
	module.exports = oncePer("Modify", function (deltaJs) {
	
		define_ContainerProxy(deltaJs);
	
		//noinspection JSUnusedLocalSymbols
		deltaJs.newOperationType("Modify", (function (_deltaJs$Delta) {
			function Modify() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Modify);
	
				_get(Object.getPrototypeOf(Modify.prototype), "constructor", this).apply(this, args);
				this.subDeltas = {};
				extend(this.subDeltas, this.arg || {});
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
								_this.subDeltas[prop].applyTo(wt(target.value, prop), extend({}, options, { restrictToProperty: null }));
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
								return _this.subDeltas[p].toString(extend({}, options, { targetProp: p }));
							}).join("\n");
							str += "\n" + indent(deltas, 4);
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
				_classCallCheck(this, ModifyProxy);
	
				if (_deltaJs$ContainerProxy != null) {
					_deltaJs$ContainerProxy.apply(this, arguments);
				}
			}
	
			_inherits(ModifyProxy, _deltaJs$ContainerProxy);
	
			_prototypeProperties(ModifyProxy, null, {
				processProxyArguments: {
	
					//noinspection JSMethodCanBeStatic
					/** {@public}{@method}
	     * @param rawArgs {*[]}
	     * @return {?{ options: Object, args: *[] }}
	     */
	
					value: function processProxyArguments() {
						for (var _len = arguments.length, rawArgs = Array(_len), _key = 0; _key < _len; _key++) {
							rawArgs[_key] = arguments[_key];
						}
	
						// rawArgs is parsed as (...options, path, ...args),
						// though path may also be passed as an option directly
						var options = {};
						do {
							if (rawArgs.length === 0) {
								throw new Error("The argument list for this Modify.Proxy method is insufficient.");
							}
							var arg = rawArgs.shift();
							if (typeof arg === "string") {
								options.path = arg;
							} else {
								extend(options, arg);
							}
						} while (!options.path);
						return { options: options, args: rawArgs };
					},
					writable: true,
					configurable: true
				},
				addOperation: {
	
					/** {@public}{@method}
	     * @param delta   {DeltaJs#Delta}
	     * @param options {{path: Path}}
	     * @return {DeltaJs#Proxy} - the deepest proxy created for this operation
	     */
	
					value: function addOperation(delta, options) {
						var path = options.path;
	
						if (!path.prop) {
							throw new Error("Operations on a Modify.Proxy need to have a non-empty path.");
						}
	
						/* create proxies */
						var deepestProxy;
						if (path.rest) {
							var newOptions = extend({}, options, { path: path.rest });
							var childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
							deepestProxy = childProxy.addOperation(delta, newOptions);
						} else {
							deepestProxy = this.addChildProxy(path.prop, delta);
						}
	
						// NOTE: Modify operations do not (yet) use any options
	
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
		deltaJs.newComposition(t("Modify", "Modify"), function (d1, d2) {
			var result = d1.clone();
			Object.keys(d2.subDeltas).forEach(function (prop) {
				result.subDeltas[prop] = deltaJs.Delta.composed(result.subDeltas[prop], d2.subDeltas[prop]);
			});
			return result;
		});
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var isUndefined = _utilJs.isUndefined;
	var isDefined = _utilJs.isDefined;
	var t = _utilJs.t;
	var define_d = _utilJs.define_d;
	var oncePer = _utilJs.oncePer;
	
	var _TargetJs = __webpack_require__(3);
	
	var WritableTarget = _TargetJs.WritableTarget;
	var ReadableTarget = _TargetJs.ReadableTarget;
	var rt = _TargetJs.rt;
	var wt = _TargetJs.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(7));
	
	var define_Modify = _interopRequire(__webpack_require__(9));
	
	module.exports = oncePer("basic operations", function (deltaJs) {
	
		define_Delta(deltaJs);
		define_Modify(deltaJs);
	
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
					value: function precondition(target) {
						return target instanceof WritableTarget && isUndefined(target.value);
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
		deltaJs.newOperationType("Remove", (function (_deltaJs$Delta3) {
			function Remove() {
				_classCallCheck(this, Remove);
	
				if (_deltaJs$Delta3 != null) {
					_deltaJs$Delta3.apply(this, arguments);
				}
			}
	
			_inherits(Remove, _deltaJs$Delta3);
	
			_prototypeProperties(Remove, null, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
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
		deltaJs.newOperationType("Forbid", (function (_deltaJs$Delta4) {
			function Forbid() {
				_classCallCheck(this, Forbid);
	
				if (_deltaJs$Delta4 != null) {
					_deltaJs$Delta4.apply(this, arguments);
				}
			}
	
			_inherits(Forbid, _deltaJs$Delta4);
	
			_prototypeProperties(Forbid, null, {
				precondition: {
					value: function precondition(target) {
						return isUndefined(target.value);
					},
					writable: true,
					configurable: true
				}
			});
	
			return Forbid;
		})(deltaJs.Delta));
		deltaJs.newOperationType("Replace", (function (_deltaJs$Delta5) {
			function Replace() {
				_classCallCheck(this, Replace);
	
				if (_deltaJs$Delta5 != null) {
					_deltaJs$Delta5.apply(this, arguments);
				}
			}
	
			_inherits(Replace, _deltaJs$Delta5);
	
			_prototypeProperties(Replace, null, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
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
		deltaJs.newOperationType("Update", (function (_deltaJs$Delta6) {
			function Update() {
				_classCallCheck(this, Update);
	
				if (_deltaJs$Delta6 != null) {
					_deltaJs$Delta6.apply(this, arguments);
				}
			}
	
			_inherits(Update, _deltaJs$Delta6);
	
			_prototypeProperties(Update, null, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg(target.value);
					},
					writable: true,
					configurable: true
				}
			});
	
			return Update;
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
	
		/* utility function d */
		var d = define_d(deltaJs);
	
		/* composition - introducing 'Add' **************************************************/
		deltaJs.newComposition(t("Add", "Modify"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Modify", "Add"), false);
		deltaJs.newComposition(t("Add", "Add"), false);
	
		/* composition - introducing 'Remove' ***********************************************/
		deltaJs.newComposition(t("Modify", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Add", "Remove"), d("Forbid"));
		deltaJs.newComposition(t("Remove", "Modify"), false);
		deltaJs.newComposition(t("Remove", "Add"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Remove", "Remove"), false);
	
		/* composition - introducing 'Forbid' ***********************************************/
		deltaJs.newComposition(t("Modify", "Forbid"), false);
		deltaJs.newComposition(t("Add", "Forbid"), false);
		deltaJs.newComposition(t("Remove", "Forbid"), d("Remove"));
		deltaJs.newComposition(t("Forbid", "Modify"), false);
		deltaJs.newComposition(t("Forbid", "Add"), d("Add", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Forbid", "Remove"), false);
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
		deltaJs.newComposition(t("Remove", "Replace"), false);
		deltaJs.newComposition(t("Forbid", "Replace"), false);
		deltaJs.newComposition(t("Replace", "Modify"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Replace", "Add"), false);
		deltaJs.newComposition(t("Replace", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Replace", "Forbid"), false);
		deltaJs.newComposition(t("Replace", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
	
		/* composition - introducing 'Update' ***********************************************/
		deltaJs.newComposition(t("Modify", "Update"), true);
		deltaJs.newComposition(t("Add", "Update"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Remove", "Update"), true);
		deltaJs.newComposition(t("Forbid", "Update"), true);
		deltaJs.newComposition(t("Replace", "Update"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Update", "Modify"), true);
		deltaJs.newComposition(t("Update", "Add"), true);
		deltaJs.newComposition(t("Update", "Remove"), d("Remove"));
		deltaJs.newComposition(t("Update", "Forbid"), true);
		deltaJs.newComposition(t("Update", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("Update", "Update"), d("Update", function (_ref) {
			var p1 = _ref.p1;
			var p2 = _ref.p2;
			return function (v) {
				return p2(p1(v));
			};
		}));
	});

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
	
	var _utilJs = __webpack_require__(1);
	
	var U = _interopRequire(_utilJs);
	
	var isDefined = _utilJs.isDefined;
	var t = _utilJs.t;
	var define_d = _utilJs.define_d;
	var oncePer = _utilJs.oncePer;
	
	var define_Modify = _interopRequire(__webpack_require__(9));
	
	var define_basicOperations = _interopRequire(__webpack_require__(10));
	
	var define_Proxy = _interopRequire(__webpack_require__(19));
	
	module.exports = oncePer("PutIntoArray", function (deltaJs) {
	
		define_Modify(deltaJs);
		define_basicOperations(deltaJs);
		define_Proxy(deltaJs);
	
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
						return isDefined(target.value) && Array.isArray(target.value);
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
		var d = define_d(deltaJs);
		deltaJs.newComposition(t("Modify", "PutIntoArray"), false);
		deltaJs.newComposition(t("Add", "PutIntoArray"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Remove", "PutIntoArray"), false);
		deltaJs.newComposition(t("Forbid", "PutIntoArray"), false);
		deltaJs.newComposition(t("Replace", "PutIntoArray"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Update", "PutIntoArray"), true);
		deltaJs.newComposition(t("PutIntoArray", "Modify"), false);
		deltaJs.newComposition(t("PutIntoArray", "Add"), false);
		deltaJs.newComposition(t("PutIntoArray", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoArray", "Forbid"), false);
		deltaJs.newComposition(t("PutIntoArray", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoArray", "Update"), true);
		deltaJs.newComposition(t("PutIntoArray", "PutIntoArray"), function (d1, d2) {
			return new deltaJs.Delta.PutIntoArray([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
		});
	
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	});

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
	
	var _utilJs = __webpack_require__(1);
	
	var isUndefined = _utilJs.isUndefined;
	var isDefined = _utilJs.isDefined;
	var t = _utilJs.t;
	var define_d = _utilJs.define_d;
	var oncePer = _utilJs.oncePer;
	
	var WritableTarget = __webpack_require__(3).WritableTarget;
	
	var define_Modify = _interopRequire(__webpack_require__(9));
	
	var define_BasicOperations = _interopRequire(__webpack_require__(10));
	
	var define_Proxy = _interopRequire(__webpack_require__(19));
	
	module.exports = oncePer("PutIntoFunction", function (deltaJs) {
	
		define_Modify(deltaJs);
		define_BasicOperations(deltaJs);
		define_Proxy(deltaJs);
	
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
						return isDefined(target.value) && typeof target.value === "function" && (isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						if (isUndefined(target.value._DeltaJs_functions)) {
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
		var d = define_d(deltaJs);
		deltaJs.newComposition(t("Modify", "PutIntoFunction"), false);
		deltaJs.newComposition(t("Add", "PutIntoFunction"), d("Add", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Remove", "PutIntoFunction"), false);
		deltaJs.newComposition(t("Forbid", "PutIntoFunction"), false);
		deltaJs.newComposition(t("Replace", "PutIntoFunction"), d("Replace", function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(t("Update", "PutIntoFunction"), true);
		deltaJs.newComposition(t("PutIntoFunction", "Modify"), false);
		deltaJs.newComposition(t("PutIntoFunction", "Add"), false);
		deltaJs.newComposition(t("PutIntoFunction", "Remove"), d("Remove"));
		deltaJs.newComposition(t("PutIntoFunction", "Forbid"), false);
		deltaJs.newComposition(t("PutIntoFunction", "Replace"), d("Replace", function (_ref) {
			var p2 = _ref.p2;
			return p2;
		}));
		deltaJs.newComposition(t("PutIntoFunction", "Update"), true);
		deltaJs.newComposition(t("PutIntoFunction", "PutIntoFunction"), function (d1, d2) {
			return new deltaJs.Delta.PutIntoFunction([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
		});
	
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	});

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
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var isDefined = _utilJs.isDefined;
	var indent = _utilJs.indent;
	var oncePer = _utilJs.oncePer;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var define_Modify = _interopRequire(__webpack_require__(9));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(17));
	
	var ApplicationOrderCycle = __webpack_require__(5).ApplicationOrderCycle;
	
	module.exports = oncePer("DeltaModel", function (deltaJs) {
	
		define_ContainerProxy(deltaJs);
	
		//noinspection JSUnusedLocalSymbols
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
							str += "\n" + indent(deltas, 4);
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
				this._childOptions = {}; // key -> options
				this._childApplicationConditions = {}; // key -> application-condition
			}
	
			_inherits(DeltaModelProxy, _deltaJs$ContainerProxy);
	
			_prototypeProperties(DeltaModelProxy, null, {
				processProxyArguments: {
	
					/** {@public}{@method}
	     * @param rawArgs {*[]}
	     * @return {?{ options: Object, args: *[] }}
	     */
	
					value: function processProxyArguments() {
						for (var _len = arguments.length, rawArgs = Array(_len), _key = 0; _key < _len; _key++) {
							rawArgs[_key] = arguments[_key];
						}
	
						// rawArgs is parsed as (...options, name, ...options, path, ...args),
						// though name and/or path may also be passed as options directly
						var options = {};
						do {
							if (rawArgs.length === 0) {
								throw new Error("The argument list for this Modify.DeltaModel method is insufficient.");
							}
							var arg = rawArgs.shift();
							if (typeof arg === "string") {
								if (!options.name) {
									options.name = arg;
								} else {
									options.path = arg;
								}
							} else {
								extend(options, arg);
							}
						} while (!options.path || !options.name);
						return { options: options, args: rawArgs };
					},
					writable: true,
					configurable: true
				},
				addOperation: {
	
					/** {@public}{@method}
	     * @param delta   {DeltaJs#Delta}
	     * @param options {{path: Path, name: string, feature: boolean}}
	     * @return {DeltaJs#Proxy}
	     */
	
					value: function addOperation(delta, options) {
						var path = options.path;
						var name = options.name;
						var feature = options.feature;
	
						/* create application condition and optional eponymous linked feature */
						if (!this._childApplicationConditions[name]) {
							var appCond = undefined;
							if (feature) {
								appCond = deltaJs.newFeature(name, options);
							} else {
								appCond = deltaJs.newFeature("delta__" + name, extend({ hidden: true }, options));
							}
							if (isDefined(options.resolves)) {
								appCond["if"](options.resolves);
								options = extend({}, options, { feature: false });
							}
							if (isDefined(options.requires)) {
								appCond.selects(options.requires);
							}
							if (feature || appCond.conditional) {
								delta.applicationCondition = appCond;
							}
							this._childApplicationConditions[name] = appCond;
						}
	
						/* create proxies */
						var deepestProxy;
						if (path.prop) {
							var newOptions = extend({}, options, { name: undefined });
							var childProxy = this.addChildProxy(name, new deltaJs.Delta.Modify());
							deepestProxy = childProxy.addOperation(delta, newOptions);
						} else {
							deepestProxy = this.addChildProxy(name, delta);
						}
	
						/* store options */
						if (!this._childOptions[name]) {
							this._childOptions[name] = options;
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
							var options = _this._childOptions[name];
	
							/* delta in the graph */
							var delta = _this.childDelta(name);
							result.graph.addVertex(name, delta);
	
							/* application order */
							[].concat(_toConsumableArray(options.resolves || []), _toConsumableArray(options.after || []), _toConsumableArray(options.requires || [])).forEach(function (subName) {
								result.graph.createEdge(subName, name);
								if (result.graph.hasCycle()) {
									result.graph.removeExistingEdge(subName, name);
									throw new ApplicationOrderCycle(subName, name);
								}
							});
	
							/* application condition */
							if (options.feature || _this._childApplicationConditions[name].conditional) {
								delta.applicationCondition = _this._childApplicationConditions[name];
							}
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
		}, true);
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var a = _utilJs.a;
	var assert = _utilJs.assert;
	var isUndefined = _utilJs.isUndefined;
	var oncePer = _utilJs.oncePer;
	
	var ConstraintFailure = __webpack_require__(5).ConstraintFailure;
	
	module.exports = oncePer("features", function (deltaJs) {
	
		oncePer(deltaJs.constructor, "features", function () {
	
			extend(deltaJs.constructor.prototype, {
				/** {@public}{@method}
	    * @param name    {string}  - the name of the new feature
	    * @param options {object?} - the (optional) options for the new feature
	    * @return {DeltaJs#Feature} - the object representing the new feature
	    */
				newFeature: function newFeature(name) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					/* sanity check*/
					assert(isUndefined(this.features[name]), "A feature with the name '" + name + "' already exists.");
	
					/* create the new feature */
					return this.features[name] = new this.Feature(name, options);
				}
			});
		});
	
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
				a(_if, feature).push(_normalizeClause(disjunct));
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
				a(_onlyIf, feature).push(_normalizeClause(conjunct));
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
						if (isUndefined(_selected[featureName])) {
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
		deltaJs.Feature = (function () {
			function Feature(name) {
				var _this = this;
	
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				_classCallCheck(this, Feature);
	
				/* set basic fields */
				this.name = name;
				this.options = options;
	
				/* update conditions */
				Object.keys(options).forEach(function (option) {
					_this.addOption(option, options[option]);
				});
			}
	
			_prototypeProperties(Feature, null, {
				selected: {
					get: function () {
						_settleConditions();
						if (_selected[this.name] && !_allowed[this.name]) {
							throw new ConstraintFailure(this);
						}
						return _selected[this.name];
					},
					configurable: true
				},
				condition: {
					get: function () {
						return _if[this.name];
					},
					configurable: true
				},
				conditional: {
					get: function () {
						return a(_if, this.name).length > 0;
					},
					configurable: true
				},
				restricted: {
					get: function () {
						return a(_onlyIf, this.name).length > 0;
					},
					configurable: true
				},
				select: {
					value: function select() {
						this["if"](true);
					},
					writable: true,
					configurable: true
				}
			});
	
			return Feature;
		})();
	
		/* restrictions and connections */
		var FEATURE_CONNECTIONS = [["if", [_addIf]], // this selected by other
		["onlyIf", [_addOnlyIf]], // error if this but not other
		["selects", [_addSelects]], // other selected by this
		["requiredBy", [_addRequiredBy]], // error if other but not this
		["iff", [_addIf, _addOnlyIf]] // if and onlyIf
		];
		deltaJs.Feature.prototype.addOption = function (optionName, value) {
			var _this = this;
	
			FEATURE_CONNECTIONS.forEach(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);
	
				var connectionName = _ref2[0];
				var methods = _ref2[1];
	
				if (optionName === connectionName) {
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
	});
	
	// change nothing

	// change nothing

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var oncePer = _utilJs.oncePer;
	
	var define_DeltaModel = _interopRequire(__webpack_require__(13));
	
	module.exports = oncePer("variation points", function (deltaJs) {
	
		oncePer(deltaJs.constructor, "variation points", function () {
	
			define_DeltaModel(deltaJs);
	
			extend(deltaJs.constructor.prototype, {
	
				/** {@public}{@method}
	    * This method indicates a variation point.
	    * @param name {string} - a hook by which operations from the core delta model can be applied
	    * @param val  {*}      - the initial value of this variation point
	    * @return {*} - the value of this variation point after applying the appropriate deltas
	    */
				vp: function vp(name, val) {
					var root = _defineProperty({}, name, val);
					this._deltaModelProxy.delta().applyTo(root, {
						restrictToProperty: name
					});
					return root[name];
				},
	
				/** {@public}{@method}
	    * A {DeltaJs} instance has one fundamental {DeltaJs#DeltaModel} instance, which is applied
	    * to any variation points that are encountered. This method is an alias to the eponymous
	    * method on that 'root' delta model. It returns the proxy that allows new delta operations
	    * to be added more easily. It presets the 'feature' option to 'true', but this can be
	    * overwritten manually.
	    * @return {DeltaJs#Proxy} - the proxy to this delta, for easily adding operations
	    */
				"do": function _do() {
					var _deltaModelProxy;
	
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					return (_deltaModelProxy = this._deltaModelProxy)["do"].apply(_deltaModelProxy, [{ feature: true }].concat(args));
				}
	
			});
		});
	
		deltaJs._deltaModelProxy = new deltaJs.Delta.DeltaModel()["do"]();
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var isUndefined = _utilJs.isUndefined;
	var oncePer = _utilJs.oncePer;
	module.exports = oncePer("application conditions", function (deltaJs) {
	
		oncePer(deltaJs.constructor, "application conditions", function () {
	
			extend(deltaJs.constructor.prototype, {
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
		});
	
		extend(deltaJs.Delta.prototype, Object.defineProperties({}, {
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
					return isUndefined(this.applicationCondition) || this.applicationCondition.selected;
				},
				enumerable: true,
				configurable: true
			}
		}));
	});

/***/ },
/* 17 */
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
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var a = _utilJs.a;
	var isUndefined = _utilJs.isUndefined;
	var oncePer = _utilJs.oncePer;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var define_Overloaded = _interopRequire(__webpack_require__(8));
	
	var define_Proxy = _interopRequire(__webpack_require__(19));
	
	var MultipleActiveProxiesError = __webpack_require__(5).MultipleActiveProxiesError;
	
	module.exports = oncePer("ContainerProxy", function (deltaJs) {
	
		define_Proxy(deltaJs);
	
		/* a Proxy class for container operation types like Modify and DeltaModel */
		deltaJs.ContainerProxy = (function (_deltaJs$Proxy) {
	
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
	
			_inherits(ContainerProxy, _deltaJs$Proxy);
	
			_prototypeProperties(ContainerProxy, {
				_newDeltaByMethod: {
	
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
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
						var newDeltas = deltaJs.ContainerProxy._methodHandlers[method].map(function (handler) {
							return handler.apply(undefined, _toConsumableArray(args));
						});
						if (newDeltas.length === 1) {
							return newDeltas[0];
						} else {
							// newDeltas.length > 1
							define_Overloaded(deltaJs);
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
						if (isUndefined(deltaJs.ContainerProxy.prototype[method])) {
							deltaJs.ContainerProxy.prototype[method] = function () {
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}
	
								return this._do(method, args);
							};
						}
	
						/* register handlers for each method */
						a(deltaJs.ContainerProxy, "_methodHandlers", method).push(handler);
					},
					writable: true,
					configurable: true
				}
			}, {
				deactivate: {
					value: function deactivate() {
						var _this = this;
	
						Object.keys(this._children).forEach(function (key) {
							_this.childProxy(key).deactivate();
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
						var ProxyClass = delta.constructor.Proxy || deltaJs.Proxy;
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
						return a(this._children, key);
					},
					writable: true,
					configurable: true
				},
				childProxy: {
					value: function childProxy(key) {
						return a(this._children, key)[this._children[key].length - 1];
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
	
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
					value: function _do(method, doArgs) {
						var _ref;
	
						/* is this proxy active? */
						if (!this.active) {
							throw new MultipleActiveProxiesError();
						}
	
						/* container-specific processing of arguments */
	
						var _processProxyArguments$apply = (_ref = this).processProxyArguments.apply(_ref, _toConsumableArray(this._doArgs).concat(_toConsumableArray(doArgs)));
	
						var options = _processProxyArguments$apply.options;
						var args = _processProxyArguments$apply.args;
	
						/* if the options contain a path, reify it */
						if (typeof options.path === "string") {
							options.path = new Path(options.path);
						}
	
						/* the argument list is finished; create a new delta and put it in the right place */
						var delta = deltaJs.ContainerProxy._newDeltaByMethod(method, args);
						var proxy = this.addOperation(delta, options);
	
						/* return the right Proxy instance for chaining */
						return proxy instanceof deltaJs.ContainerProxy ? proxy : this;
					},
					writable: true,
					configurable: true
				},
				processProxyArguments: {
	
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
					//noinspection JSCommentMatchesSignature
					/** {@public}{@abstract}{@method}
	     * Subclasses of `ContainerProxy` should implement this method to extract an
	     * options object, path and final argument list from a given 'raw' argument list.
	     *
	     * @param args {[*]}
	     * @return {{options: Object, args: [*]}}
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
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var indent = _utilJs.indent;
	var oncePer = _utilJs.oncePer;
	module.exports = oncePer("Composed", function (deltaJs) {
	
		// NOTE: Not importing the circular dependency deltaJs.Delta here.
		//       That file will import this one at the proper time.
	
		deltaJs.newOperationType("Composed", (function (_deltaJs$Delta) {
			function Composed() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Composed);
	
				_get(Object.getPrototypeOf(Composed.prototype), "constructor", this).apply(this, args);
				this._components = this.arg || [];
			}
	
			_inherits(Composed, _deltaJs$Delta);
	
			_prototypeProperties(Composed, null, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(Composed.prototype), "clone", this).call(this);
						result._components = this._components.map(function (delta) {
							return delta.clone();
						});
						return result;
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						this._components.forEach(function (components) {
							components.applyTo(target, options);
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
	
						var str = _get(Object.getPrototypeOf(Composed.prototype), "toString", this).call(this, options);
						if (this._components.length > 0) {
							var deltas = "";
							this._components.forEach(function (delta) {
								deltas += "• " + delta.toString(options) + "\n";
							});
							str += "\n" + indent(deltas, 4);
						}
						return str;
					},
					writable: true,
					configurable: true
				},
				precondition: {
					value: function precondition(target) {
						if (this._components.length === 0) {
							return true;
						}
						return this._components[0].precondition(target);
					},
					writable: true,
					configurable: true
				},
				_collapse: {
					value: function _collapse() {
						var _this = this;
	
						/* flatten Composed that are inside Composed */
						this._components = (function () {
							var newComponents = [];
							_this._components.forEach(function (delta) {
								if (delta instanceof deltaJs.Delta.Composed) {
									delta._collapse();
									newComponents.push.apply(newComponents, _toConsumableArray(delta._components));
								} else {
									newComponents.push(delta);
								}
							});
							return newComponents;
						})();
	
						/* compose neighbouring pairs where possible */
						var changed = undefined;
						do {
							changed = false;
							this._components = (function () {
								var newComponents = [];
								for (var i = 0; i < _this._components.length - 1; i += 1) {
									var composedPair = _this._components[i].composedWith(_this._components[i + 1]);
									if (composedPair instanceof deltaJs.Delta.Composed) {
										newComponents.push(_this._components[i]);
									} else {
										newComponents.push(composedPair);
										changed = true;
										i += 1;
									}
								}
								if (i === _this._components.length - 1) {
									newComponents.push(_this._components[i]);
								}
								return newComponents;
							})();
						} while (changed);
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
	
			return Composed;
		})(deltaJs.Delta));
	
		/* composition */
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.Composed || d2 instanceof deltaJs.Delta.Composed;
		}, function (d1, d2) {
			var D1 = d1 instanceof deltaJs.Delta.Composed ? d1._components : [d1];
			var D2 = d2 instanceof deltaJs.Delta.Composed ? d2._components : [d2];
			var result = new deltaJs.Delta.Composed([].concat(_toConsumableArray(D1), _toConsumableArray(D2)));
			result._collapse();
			return result;
		});
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(6));
	
	/* import internal stuff */
	
	var _utilJs = __webpack_require__(1);
	
	var extend = _utilJs.extend;
	var oncePer = _utilJs.oncePer;
	
	var define_Delta = _interopRequire(__webpack_require__(7));
	
	module.exports = oncePer("Proxy", function (deltaJs) {
	
		define_Delta(deltaJs);
	
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
	
		extend(deltaJs.Delta.prototype, {
	
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
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzOTEzNzU0MDNkZmUxMzNkMmZjNCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3h5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtB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QUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFNLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU07T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxLQUFLLENBQUssRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUs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U0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQU8sY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFVLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQW1DLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRTtHQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFPLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFB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QUM7QUFDeEMsUUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNoQixXQUFNLElBQUksS0FBSyxrQ0FBZ0MsSUFBSSxDQUFDLElBQUksc0NBQW1DLENBQUM7S0FDNUY7QUFDRCxXQUFPLFlBQUksVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQUcsT0FBSSxJQUFJLENBQUMsQ0FBQztJQUNuRDs7R0FFRCxDQUFDLENBQUM7RUFHSCxDQUFDLEMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzkxMzc1NDAzZGZlMTMzZDJmYzRcbiAqKi8iLCIvKiBpbXBvcnQgdXRpbGl0aWVzICovXG5pbXBvcnQge2V4dGVuZH0gZnJvbSAnLi91dGlsLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBQYXRoIH0pO1xuXG5cbi8qIG1ha2UgRXJyb3IgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIENvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciwgQ29uc3RyYWludEZhaWx1cmUsXG4gICAgICAgIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSwgVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QsXG4gICAgICAgIE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIi8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cbi8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cbi8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG9iajE7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0dmFyIGxhc3QgPSBvKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRpZiAoaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHR9XG5cdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gZGZhdWx0KG9iamVjdCwgLi4ua2V5cywge30pIH1cblxuXG5leHBvcnQgZnVuY3Rpb24gYShvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIGRmYXVsdChvYmplY3QsIC4uLmtleXMsIFtdKSB9XG5cblxuLyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxufVxuXG5cbi8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbn1cblxuXG4vKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQobnIsIHN0cikge1xuXHRyZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKTtcbn1cblxuXG4vKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIHJlcGVhdChhbW91bnQsIGNoYXIpKTtcbn1cblxuXG4vKiBydW4gYSBmdW5jdGlvbiBvbmx5IG9uY2UgcGVyIG9iaitzdHJpbmcgY29tYm8gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbmNlUGVyKG9iaiwga2V5LCBmbikge1xuXHR2YXIgb3BmbiA9IChvYmopID0+IHtcblx0XHR2YXIgcCA9IGBfb25jZSBwZXI6ICR7a2V5fWA7XG5cdFx0aWYgKG9ialtwXSkgeyByZXR1cm4gfVxuXHRcdG9ialtwXSA9IHRydWU7IC8vIFRPRE86IG1ha2Ugbm9uLWVudW1lcmF0YWJsZSwgb3IgdXNlIEVTNiBTeW1ib2xcblx0XHRyZXR1cm4gZm4uY2FsbChvYmosIG9iaik7XG5cdH07XG5cdGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuXHRcdFtrZXksIGZuXSA9IFtvYmosIGtleV07XG5cdFx0cmV0dXJuIG9wZm47XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG9wZm4ob2JqKTtcblx0fVxufVxuXG5cbi8qIHNob3J0aGFuZCBzcGVjaWZpZXIgZm9yIGNvbXBvc2l0aW9uIHByZWNvbmRpdGlvbnMgKi9cbmV4cG9ydCB2YXIgdCA9ICh0eXBlMSwgdHlwZTIpID0+IHtcblx0cmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMik7XG59O1xuXG5cbi8qIHNob3J0aGFuZCBzcGVjaWZpZXIgZm9yIGNvbXBvc2l0aW9uIGltcGxlbWVudGF0aW9ucyAqL1xuZXhwb3J0IHZhciBkZWZpbmVfZCA9IChkZWx0YUpzKSA9PiAodHlwZSwgZm4pID0+IHtcblx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcbn07XG5cblxuXG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGFzc2VydCwgaXNVbmRlZmluZWR9ICAgICAgICAgICAgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1B1dEludG9BcnJheSAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lX1B1dEludG9GdW5jdGlvbiAgICAgICAgICAgICAgICAgICBmcm9tICcuL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhTW9kZWwgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhTW9kZWwuanMnO1xuaW1wb3J0IGRlZmluZV9mZWF0dXJlcyAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lX3ZhcmlhdGlvblBvaW50cyAgICAgICAgICAgICAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lX2FwcGxpY2F0aW9uQ29uZGl0aW9ucyAgICAgICAgICAgICBmcm9tICcuL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0NvbnRhaW5lclByb3h5LmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzXG4gKiBhbmQgYWN0cyBhcyBhIGZhY2FkZSAoYXMgaW4gZGVzaWduIHBhdHRlcm4pIHRvIHRoZSBtb3JlIHNwZWNpZmljXG4gKiBzdWJzeXN0ZW1zIG9mIGRlbHRhLmpzLlxuICpcbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBEZWx0YUpzIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFKcyB7XG5cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX1B1dEludG9BcnJheSAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfUHV0SW50b0Z1bmN0aW9uICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9EZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2ZlYXR1cmVzICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfdmFyaWF0aW9uUG9pbnRzICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9hcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICAge3N0cmluZ30gICAtIG5hbWUgb2YgdGhlIG5ldyBvcGVyYXRpb24gdHlwZVxuXHQgKiBAcGFyYW0gRGVsdGFDbGFzcyB7RnVuY3Rpb259IC0gdGhlIG5ldyBvcGVyYXRpb24gY2xhc3Ncblx0ICogQHBhcmFtIFByb3h5Q2xhc3Mgez9GdW5jdGlvbn0gLSB0aGUgb3B0aW9uYWwgY3VzdG9tIFByb3h5IHN1YmNsYXNzIGZvciB0aGlzIG9wZXJhdGlvbi10eXBlXG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIERlbHRhQ2xhc3MsIFByb3h5Q2xhc3MpIHtcblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0YXNzZXJ0KG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSxcblx0XHRcdGBEZWx0YSBvcGVyYXRpb24gY2xhc3NlcyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtICcke25hbWV9JyBkb2VzIG5vdC5gKTtcblx0XHRhc3NlcnQoaXNVbmRlZmluZWQodGhpcy5EZWx0YVtuYW1lXSksXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIHN0b3JlIHRoZSBvcGVyYXRpb24gY2xhc3MgKi9cblx0XHR0aGlzLkRlbHRhW25hbWVdID0gRGVsdGFDbGFzcztcblxuXHRcdC8qIHNldCB0aGUgKG9wdGlvbmFsKSBQcm94eSBjbGFzcyAqL1xuXHRcdERlbHRhQ2xhc3MuUHJveHkgPSBQcm94eUNsYXNzO1xuXG5cdFx0LyogZmV0Y2ggdGhlIGdpdmVuIGFwcGx5VG8gZnVuY3Rpb24gKGlmIGFueSkgd2hpY2ggd2lsbCBiZSBzbGlnaHRseSBtb2RpZmllZCAqL1xuXHRcdHZhciBnaXZlbkFwcGx5VG8gPSBEZWx0YUNsYXNzLnByb3RvdHlwZS5hcHBseVRvIHx8ICgoKT0+e30pO1xuXG5cdFx0LyogYXVnbWVudCB0aGUgY2xhc3MgcHJvdG90eXBlICovXG5cdFx0ZXh0ZW5kKERlbHRhQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhlIHRhcmdldCBpcyBub3QgYWxyZWFkeSBpbiBUYXJnZXQgZm9ybSwgbWFrZSBpdCBzbyBub3cgKi9cblx0XHRcdFx0aWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCkpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBuZXcgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCh0YXJnZXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRnaXZlbkFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSxcblx0XHRcdHR5cGU6IG5hbWVcblx0XHR9KTtcblxuXHRcdC8qIGNyZWF0ZSBhbnkgZ2l2ZW4gbWV0aG9kcyB3aXRoIGRlZmF1bHQgaGFuZGxlciAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSk7XG5cdFx0KERlbHRhQ2xhc3MucHJvdG90eXBlLm1ldGhvZHMgfHwgW2xvd2VyY2FzZU5hbWVdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCAoLi4uYXJncykgPT4gbmV3IERlbHRhQ2xhc3MoLi4uYXJncykpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gRGVsdGFDbGFzcztcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0ICovXG5cdG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKTtcblx0fVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbmV4cG9ydCBjbGFzcyBSZWFkYWJsZVRhcmdldCB7XG5cdGNvbnN0cnVjdG9yKHZhbHVlKSB7IHRoaXMuX3ZhbCA9IHZhbHVlIH1cblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfVxuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfVxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgV3JpdGFibGVUYXJnZXQgZXh0ZW5kcyBSZWFkYWJsZVRhcmdldCB7XG5cdGNvbnN0cnVjdG9yKG9iaiwgcHJvcCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fb2JqID0gb2JqO1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHR9XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH1cblx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5leHBvcnQgZnVuY3Rpb24gcnQob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgUmVhZGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYXJnZXQuanNcbiAqKi8iLCJpbXBvcnQgVSwge2Fzc2VydCwgaXNEZWZpbmVkfSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuXG5cdGNvbnN0cnVjdG9yKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdGFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdFx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdFx0aWYgKGxlYWQgPT09ICcjJykge1xuXHRcdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHRcdH0gZWxzZSBpZiAocHJvcCAhPT0gJycpIHtcblx0XHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuX3Jlc3QgPSBuZXcgUGF0aChyZXN0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9XG5cblx0Z2V0IHByb3AoKSB7IHJldHVybiB0aGlzLl9wcm9wIH1cblxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHZhciByZXN1bHQgPSBcIlwiO1xuXHRcdGlmIChpc0RlZmluZWQodGhpcy5wcm9wKSkge1xuXHRcdFx0cmVzdWx0ICs9IHRoaXMucHJvcDtcblx0XHRcdGlmIChpc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG59XG5cbi8vIFRPRE86IGltcGxlbWVudCB0aGF0IHRoZSBgLihpbnN0YW5jZSkuYCBtZW1iZXJzIGFyZSBhY3R1YWxseSBpbmNsdWRlZCBpbiBpbnN0YW5jZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhdGguanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHRcdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0XHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0XHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgQ29tcG9zaXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhMSwgZGVsdGEyKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29uc3RyYWludEZhaWx1cmUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZlYXR1cmUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHRcdHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZnJvbSwgdG8pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdFx0dGhpcy5mcm9tID0gZnJvbTtcblx0XHR0aGlzLnRvICAgPSB0bztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhcykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ1VucmVzb2x2ZWREZWx0YUNvbmZsaWN0Jztcblx0XHR2YXIgZGVsdGFOYW1lcyA9IGRlbHRhcy5tYXAoZCA9PiBgJyR7ZC5uYW1lfSdgKS5qb2luKCcsJyk7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHRcdHRoaXMuZGVsdGFzID0gZGVsdGFzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBPbmx5IG9uZSBQcm94eSBwZXIgcGF0aCBjYW4gYmUgYWN0aXZlIGF0IGFueSBnaXZlbiB0aW1lLmA7XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9ICAgICAgICAgICAgICAgICAgICBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICAgICAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIENvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZV9Db21wb3NlZCAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0NvbXBvc2VkLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdEZWx0YScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdEZWx0YScsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHRcdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0XHR0aGlzLkRlbHRhLm5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRkZWx0YUpzLkRlbHRhID0gY2xhc3MgRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0dGhpcy5pZCA9ICsrZGVsdGFKcy5EZWx0YS5fbmV4dElEO1xuXHRcdFx0dGhpcy5hcmdzID0gYXJncztcblx0XHR9XG5cblx0XHRnZXQgYXJnKCkgIHsgcmV0dXJuIHRoaXMuYXJnc1swXSB9XG5cdFx0c2V0IGFyZyh2KSB7IHRoaXMuYXJnc1swXSA9IHYgfVxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnKSB9XG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuUmVhZGFibGVUYXJnZXR9XG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0XHQgKi9cblx0XHRldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnByZWNvbmRpdGlvbikge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBBcHBsaWNhdGlvbkVycm9yKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSAgdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHQgKiBAcGFyYW0gIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHQgKi9cblx0XHRhcHBsaWVkVG8odmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpICAgeyB2YWx1ZSA9IHZhbHVlLnZhbHVlICAgfVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpLCBvcHRpb25zKTtcblx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmIChvcHRpb25zLnRhcmdldFByb3ApICAgeyBzdHIgKz0gYCDigLkke29wdGlvbnMudGFyZ2V0UHJvcH3igLpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdGlmICh0aGlzLmFyZ3MubGVuZ3RoID4gMCkgeyBzdHIgKz0gYDogJHt0aGlzLmFyZ3MubWFwKChhKSA9PiBKU09OLnN0cmluZ2lmeShhKSkuam9pbignLCcpfWAgfVxuXHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICB7IHN0ciArPSBgICgke3RoaXMuaWR9KWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHRcdCAqIEBwYXJhbSBjb21wb3NlIHtCb29sZWFufCgoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YSl9IC0gZmFsc2UsIG9yIGEgc2lkZS1lZmZlY3QgZnJlZSBmdW5jdGlvblxuXHRcdCAqL1xuXHRcdHN0YXRpYyBuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhcyB7W0RlbHRhSnMjRGVsdGFdfSAtIHRoZSBkZWx0YXMgdG8gY29tcG9zZVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0c3RhdGljIGNvbXBvc2VkKC4uLmRlbHRhcykge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk5vT3AoKTtcblx0XHRcdGRlbHRhcy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIgZDEgPSByZXN1bHQsXG5cdFx0XHRcdCAgICBkMiA9IGRlbHRhIHx8IG5ldyBkZWx0YUpzLkRlbHRhLk5vT3AoKTtcblxuXHRcdFx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0XHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0XHRcdHZhciBzdWNjZXNzID0gRGVsdGEuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB0aHJvdyBhbiBlcnJvciBpZiAnZmFsc2UnIHdhcyBmb3VuZCByYXRoZXIgdGhhbiBhIGZ1bmN0aW9uKi9cblx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gZmFsc2UgfHwgIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHRcdFx0LyogIGlmIG5vIGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGlzIGZvdW5kLCB1c2UgYSBsaW5lYXIgZGVsdGEgbW9kZWwgICovXG5cdFx0XHRcdC8qICB0byAnbmFpdmVseScgaGF2ZSBvbmUgZGVsdGEgYXBwbHkgYWZ0ZXIgYW5vdGhlciAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHRpZiAoY29tcG9zZUZuID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y29tcG9zZUZuID0gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQoW2QxLCBkMl0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdFx0XHRyZXN1bHQgPSBjb21wb3NlRm4oZDEsIGQyKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fTtcblx0ZGVsdGFKcy5EZWx0YS5fbmV4dElEID0gMDtcblx0ZGVsdGFKcy5EZWx0YS5fY29tcG9zaXRpb25zICA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblxuXG5cdC8qIGRlZmluZSBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkIGZvciB1c2UgaW4gY29tcG9zaXRpb25zICovXG5cdGRlZmluZV9Db21wb3NlZChkZWx0YUpzKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhX2NsYXNzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgZGVmaW5lX0RlbHRhIGZyb20gJy4vRGVsdGFfY2xhc3MuanMnO1xuaW1wb3J0IFUsIHtpbmRlbnQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0TXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdPdmVybG9hZGVkJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9EZWx0YShkZWx0YUpzKTtcblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnT3ZlcmxvYWRlZCcsIGNsYXNzIE92ZXJsb2FkZWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSB0aGlzLmFyZyB8fCBbXTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5ldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWRcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaW5kZW50LCB0LCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ01vZGlmeScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfQ29udGFpbmVyUHJveHkoZGVsdGFKcyk7XG5cblxuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ01vZGlmeScsIGNsYXNzIE1vZGlmeSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0ZXh0ZW5kKHRoaXMuc3ViRGVsdGFzLCB0aGlzLmFyZyB8fCB7fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gdGhpcy5zdWJEZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHQgKi9cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgfVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGlmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0XHR0aGlzLnN1YkRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdFx0XHRcdGV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Rcblx0XHRcdFx0XHRcdC5rZXlzKHRoaXMuc3ViRGVsdGFzKVxuXHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5zdWJEZWx0YXNbcF0udG9TdHJpbmcoZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHRhcmdldFByb3A6IHAgfSkpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdH0sIGNsYXNzIE1vZGlmeVByb3h5IGV4dGVuZHMgZGVsdGFKcy5Db250YWluZXJQcm94eSB7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSByYXdBcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7P3sgb3B0aW9uczogT2JqZWN0LCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpLFxuXHRcdFx0Ly8gdGhvdWdoIHBhdGggbWF5IGFsc28gYmUgcGFzc2VkIGFzIGFuIG9wdGlvbiBkaXJlY3RseVxuXHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHJhd0FyZ3MubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcihgVGhlIGFyZ3VtZW50IGxpc3QgZm9yIHRoaXMgTW9kaWZ5LlByb3h5IG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgICB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgeyBleHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghb3B0aW9ucy5wYXRoKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge3twYXRoOiBQYXRofX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fSAtIHRoZSBkZWVwZXN0IHByb3h5IGNyZWF0ZWQgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIge3BhdGh9ID0gb3B0aW9ucztcblx0XHRcdGlmICghcGF0aC5wcm9wKSB7IHRocm93IG5ldyBFcnJvcignT3BlcmF0aW9ucyBvbiBhIE1vZGlmeS5Qcm94eSBuZWVkIHRvIGhhdmUgYSBub24tZW1wdHkgcGF0aC4nKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiBwYXRoLnJlc3QgfSk7XG5cdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5PVEU6IE1vZGlmeSBvcGVyYXRpb25zIGRvIG5vdCAoeWV0KSB1c2UgYW55IG9wdGlvbnNcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBkZWVwZXN0IGNyZWF0ZWQgcHJveHkgKi9cblx0XHRcdHJldHVybiBkZWVwZXN0UHJveHk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzID0ge307XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuY2hpbGREZWx0YShwcm9wKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0sIGQyLnN1YkRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7aXNVbmRlZmluZWQsIGlzRGVmaW5lZCwgdCwgZGVmaW5lX2QsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdiYXNpYyBvcGVyYXRpb25zJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9EZWx0YSAoZGVsdGFKcyk7XG5cdGRlZmluZV9Nb2RpZnkoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnLCBjbGFzcyBOb09wIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywgY2xhc3MgQWRkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCBjbGFzcyBSZW1vdmUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywgY2xhc3MgRm9yYmlkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCBjbGFzcyBSZXBsYWNlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnVXBkYXRlJywgY2xhc3MgVXBkYXRlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ05vT3AnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblxuXHQvKiB1dGlsaXR5IGZ1bmN0aW9uIGQgKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdNb2RpZnknKSwgZCgnQWRkJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnQWRkJyAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ0FkZCcgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ01vZGlmeScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdSZW1vdmUnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdGb3JiaWQnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnRm9yYmlkJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdNb2RpZnknKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICwgJ1JlcGxhY2UnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAsICdSZXBsYWNlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnTW9kaWZ5JyApLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ0FkZCcgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnRm9yYmlkJyApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1VwZGF0ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1VwZGF0ZScgKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1VwZGF0ZScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdNb2RpZnknICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnQWRkJyAgICApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdGb3JiaWQnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1VwZGF0ZScgKSwgZCgnVXBkYXRlJywgICh7cDEsIHAyfSkgPT4gdiA9PiBwMihwMSh2KSkpICAgKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUsIHtpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0FycmF5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9iYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIGNsYXNzIFB1dEludG9BcnJheSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgZCA9IGRlZmluZV9kKGRlbHRhSnMpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAgICAgICwgJ1B1dEludG9BcnJheScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAsICdQdXRJbnRvQXJyYXknKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAgICAgICwgJ1B1dEludG9BcnJheScpLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnTW9kaWZ5JyAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdBZGQnICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlbW92ZScgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnRm9yYmlkJyAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdSZXBsYWNlJyAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1VwZGF0ZScgICAgICApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUHV0SW50b0FycmF5JyksIChkMSwgZDIpID0+XG5cdFx0bmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KFsuLi5kMS52YWx1ZXMsIC4uLmQyLnZhbHVlc10pKTtcblxuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QdXRJbnRvQXJyYXkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7aXNVbmRlZmluZWQsIGlzRGVmaW5lZCwgdCwgZGVmaW5lX2QsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX0Jhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdQdXRJbnRvRnVuY3Rpb24nLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX01vZGlmeSAgICAgICAgIChkZWx0YUpzKTtcblx0ZGVmaW5lX0Jhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lX1Byb3h5ICAgICAgICAgIChkZWx0YUpzKTtcblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCBjbGFzcyBQdXRJbnRvRnVuY3Rpb24gZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdChpc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdNb2RpZnknICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ0FkZCcgICAgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdGb3JiaWQnICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnVXBkYXRlJyAgICAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT5cblx0XHRuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSkpO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBpc0RlZmluZWQsIGluZGVudCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAgICAgICAgICBmcm9tICcuL0NvbnRhaW5lclByb3h5LmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25PcmRlckN5Y2xlfSAgICAgICAgICAgICAgZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignRGVsdGFNb2RlbCcsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfQ29udGFpbmVyUHJveHkoZGVsdGFKcyk7XG5cblxuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0RlbHRhTW9kZWwnLCBjbGFzcyBEZWx0YU1vZGVsIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH1cblxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSwgY2xhc3MgRGVsdGFNb2RlbFByb3h5IGV4dGVuZHMgZGVsdGFKcy5Db250YWluZXJQcm94eSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuX2NoaWxkT3B0aW9ucyA9IHt9OyAgICAgICAgICAgICAgIC8vIGtleSAtPiBvcHRpb25zXG5cdFx0XHR0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9ucyA9IHt9OyAvLyBrZXkgLT4gYXBwbGljYXRpb24tY29uZGl0aW9uXG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSByYXdBcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7P3sgb3B0aW9uczogT2JqZWN0LCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIG5hbWUsIC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpLFxuXHRcdFx0Ly8gdGhvdWdoIG5hbWUgYW5kL29yIHBhdGggbWF5IGFsc28gYmUgcGFzc2VkIGFzIG9wdGlvbnMgZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5EZWx0YU1vZGVsIG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMubmFtZSkgeyBvcHRpb25zLm5hbWUgPSBhcmcgICB9XG5cdFx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgfVxuXHRcdFx0XHR9IGVsc2UgICAgICAgICAgICAgICAgIHsgZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCB8fCAhb3B0aW9ucy5uYW1lKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge3twYXRoOiBQYXRoLCBuYW1lOiBzdHJpbmcsIGZlYXR1cmU6IGJvb2xlYW59fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIge3BhdGgsIG5hbWUsIGZlYXR1cmV9ID0gb3B0aW9ucztcblxuXHRcdFx0LyogY3JlYXRlIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWwgZXBvbnltb3VzIGxpbmtlZCBmZWF0dXJlICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdKSB7XG5cdFx0XHRcdGxldCBhcHBDb25kO1xuXHRcdFx0XHRpZiAoZmVhdHVyZSkgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICB7IGFwcENvbmQgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoIGBkZWx0YV9fJHtuYW1lfWAsIGV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuXHRcdFx0XHRcdGFwcENvbmQuaWYob3B0aW9uc1sncmVzb2x2ZXMnXSk7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBmZWF0dXJlOiBmYWxzZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmZWF0dXJlIHx8IGFwcENvbmQuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFwcENvbmQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0gPSBhcHBDb25kO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgbmFtZTogdW5kZWZpbmVkIH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShuYW1lLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShuYW1lLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIG9wdGlvbnMgKi9cblx0XHRcdGlmICghdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdKSB7XG5cdFx0XHRcdHRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSA9IG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmNsZWFyKCk7XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdFx0bGV0IG9wdGlvbnMgPSB0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0LyogZGVsdGEgaW4gdGhlIGdyYXBoICovXG5cdFx0XHRcdHZhciBkZWx0YSA9IHRoaXMuY2hpbGREZWx0YShuYW1lKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gb3JkZXIgKi9cblx0XHRcdFx0WyAuLi5vcHRpb25zWydyZXNvbHZlcyddfHxbXSwgLi4ub3B0aW9uc1snYWZ0ZXInXXx8W10sIC4uLm9wdGlvbnNbJ3JlcXVpcmVzJ118fFtdIF0uZm9yRWFjaCgoc3ViTmFtZSkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5jcmVhdGVFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LmdyYXBoLnJlbW92ZUV4aXN0aW5nRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBjb25kaXRpb24gKi9cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXS5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRcdGRlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV07XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwgfHxcblx0XHRkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbFxuXHQpLCB0cnVlKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhLCBhc3NlcnQsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2ZlYXR1cmVzJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ2ZlYXR1cmVzJywgKCkgPT4ge1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0XHRhc3NlcnQoaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdGZ1bmN0aW9uIF9ub3JtYWxpemVDbGF1c2UoaW5wdXQpIHtcblx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0dmFyIF9pZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9zZWxlY3RlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRhKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBjb25zdHJhaW50cyBiZXR3ZWVuIGZlYXR1cmVzIChlbmZvcmNlZCBieSBlcnJvcnMpICovXG5cdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRPbmx5SWYoZmVhdHVyZSwgY29uanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlXSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfb25seUlmW2ZlYXR1cmVdICE9PSBmYWxzZSkge1xuXHRcdFx0YShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKGlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKChfaWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5zb21lKGRpc2ogPT4gZGlzai5ldmVyeShjb25qID0+IF9zZWxlY3RlZFtjb25qXSkpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cblx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnb25seUlmJyBjb25qdW5jdHMgdGhhdCBhcmUgZXhjbHVkZWQsIHRoaXMgZmVhdHVyZSBpcyBleGNsdWRlZCAqL1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkZlYXR1cmUgPSBjbGFzcyBGZWF0dXJlIHtcblx0XHRjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9XG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gICAgICAgICAgICAgICAgICAgfVxuXHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIGEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH1cblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBhKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9XG5cdFx0c2VsZWN0KCkgeyB0aGlzLmlmKHRydWUpIH1cblx0fTtcblxuXG5cdC8qIHJlc3RyaWN0aW9ucyBhbmQgY29ubmVjdGlvbnMgKi9cblx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRbICdpZicsICAgICAgICAgW19hZGRJZl0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzXSAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFsgJ3JlcXVpcmVkQnknLCBbX2FkZFJlcXVpcmVkQnldICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25OYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW2Nvbm5lY3Rpb25OYW1lLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG9wdGlvbk5hbWUgPT09IGNvbm5lY3Rpb25OYW1lKSB7XG5cdFx0XHRcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZCh0aGlzLm5hbWUsIHZhbHVlKSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbmFtZV0pID0+IHtcblx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihuYW1lLCB2YWx1ZSk7XG5cdFx0fTtcblx0fSk7XG5cblxuXHQvKiB0aGUgZmVhdHVyZXMgYmVsb25naW5nIHRvIHRoaXMgRGVsdGFKcyBpbnN0YW5jZSAqL1xuXHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YU1vZGVsIGZyb20gJy4vRGVsdGFNb2RlbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcigndmFyaWF0aW9uIHBvaW50cycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICd2YXJpYXRpb24gcG9pbnRzJywgKCkgPT4ge1xuXG5cdFx0ZGVmaW5lX0RlbHRhTW9kZWwoZGVsdGFKcyk7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogVGhpcyBtZXRob2QgaW5kaWNhdGVzIGEgdmFyaWF0aW9uIHBvaW50LlxuXHRcdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludCBhZnRlciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgZGVsdGFzXG5cdFx0XHQgKi9cblx0XHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0XHR2YXIgcm9vdCA9IHsgW25hbWVdOiB2YWwgfTtcblx0XHRcdFx0dGhpcy5fZGVsdGFNb2RlbFByb3h5LmRlbHRhKCkuYXBwbHlUbyhyb290LCB7XG5cdFx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIHByb3h5IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0XHQgKiB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS4gSXQgcHJlc2V0cyB0aGUgJ2ZlYXR1cmUnIG9wdGlvbiB0byAndHJ1ZScsIGJ1dCB0aGlzIGNhbiBiZVxuXHRcdFx0ICogb3ZlcndyaXR0ZW4gbWFudWFsbHkuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fSAtIHRoZSBwcm94eSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0XHQgKi9cblx0XHRcdGRvKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWxQcm94eS5kbyh7IGZlYXR1cmU6IHRydWUgfSwgLi4uYXJncyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdGRlbHRhSnMuX2RlbHRhTW9kZWxQcm94eSA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKS5kbygpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignYXBwbGljYXRpb24gY29uZGl0aW9ucycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdhcHBsaWNhdGlvbiBjb25kaXRpb25zJywgKCkgPT4ge1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdFx0ZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmUpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdCguLi5mZWF0dXJlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXHRcdGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIGlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQgfVxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhLCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgZnJvbSAnLi9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVfUHJveHkgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yfSAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ0NvbnRhaW5lclByb3h5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Qcm94eShkZWx0YUpzKTtcblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIGNvbnRhaW5lciBvcGVyYXRpb24gdHlwZXMgbGlrZSBNb2RpZnkgYW5kIERlbHRhTW9kZWwgKi9cblx0ZGVsdGFKcy5Db250YWluZXJQcm94eSA9IGNsYXNzIENvbnRhaW5lclByb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7XG5cblx0XHQvLyBBIFByb3h5IGluc3RhbmNlIGV4cG9zZXMgb3BlcmF0aW9uIG1ldGhvZHMgZGlyZWN0bHkuIEFyZ3VtZW50c1xuXHRcdC8vIHRvIHRob3NlIG9wZXJhdGlvbnMgY2FuIGJlIHByZS1zdXBwbGllZCB0aHJvdWdoIHRoZSBgZG9gIG1ldGhvZC5cblxuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9kb0FyZ3MgICAgICAgPSBbXTtcblx0XHRcdHRoaXMuX29yaWdpbmFsICAgICA9IHRoaXM7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiAgICAgPSB7fTsgLy8ga2V5IC0+IFtwcm94aWVzXVxuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zXG5cdFx0fVxuXG5cblx0XHRkZWFjdGl2YXRlKCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNoaWxkUHJveHkoa2V5KS5kZWFjdGl2YXRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdHN1cGVyLmRlYWN0aXZhdGUoKTtcblx0XHR9XG5cblxuXHRcdGFkZENoaWxkUHJveHkoa2V5LCBkZWx0YSkge1xuXHRcdFx0LyogZ2V0IHRoZSBjdXJyZW50IHByb3h5IGZvciB0aGUgZ2l2ZW4ga2V5ICovXG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY2hpbGRQcm94eShrZXkpO1xuXG5cdFx0XHQvKiBnZXQgLyBjcmVhdGUgZGVsdGEgcHJveHkgKi9cblx0XHRcdHZhciBQcm94eUNsYXNzID0gZGVsdGEuY29uc3RydWN0b3IuUHJveHkgfHwgZGVsdGFKcy5Qcm94eTtcblx0XHRcdHZhciBwcm94eSA9IG5ldyBQcm94eUNsYXNzKHsgZGVsdGEsIHBhcmVudDogdGhpcyB9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjdXJyZW50IHByb3h5IGlmIGl0LCBhbmQgdGhlIGN1cnJlbnQgcHJveHksIGFyZSBib3RoIE1vZGlmeS5Qcm94eSAqL1xuXHRcdFx0aWYgKGN1cnJlbnQgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSAmJlxuXHRcdFx0XHRwcm94eSAgIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkpIHsgcmV0dXJuIGN1cnJlbnQgfVxuXG5cdFx0XHQvKiB3ZSBuZWVkIGEgbmV3IHByb3h5LCBzbyBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IG9uZSAqL1xuXHRcdFx0aWYgKGN1cnJlbnQpIHsgY3VycmVudC5kZWFjdGl2YXRlKCkgfVxuXG5cdFx0XHQvKiBjcmVhdGUgYSBuZXcgUHJveHkgb2YgdGhlIHJpZ2h0IGNsYXNzLCByZW1lbWJlciBpdCBhbmQgcmV0dXJuIGl0ICovXG5cdFx0XHR0aGlzLl9jaGlsZHJlbltrZXldLnB1c2gocHJveHkpO1xuXHRcdFx0cmV0dXJuIHByb3h5O1xuXHRcdH1cblxuXG5cdFx0Y2hpbGRLZXlzKCkgeyByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pIH1cblxuXG5cdFx0Y2hpbGRQcm94aWVzKGtleSkgeyByZXR1cm4gYSh0aGlzLl9jaGlsZHJlbiwga2V5KSB9XG5cblxuXHRcdGNoaWxkUHJveHkoa2V5KSB7IHJldHVybiBhKHRoaXMuX2NoaWxkcmVuLCBrZXkpW3RoaXMuX2NoaWxkcmVuW2tleV0ubGVuZ3RoLTFdIH1cblxuXG5cdFx0Y2hpbGREZWx0YShrZXkpIHtcblx0XHRcdHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKFxuXHRcdFx0XHQuLi50aGlzLmNoaWxkUHJveGllcyhrZXkpLm1hcChwcm94eSA9PiBwcm94eS5kZWx0YSgpKVxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdGRvKC4uLmRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogcmV0dXJuIGEgdmVyc2lvbiBvZiB0aGlzIFByb3h5IHdpdGggZXh0cmEgcHJlbG9hZGVkIGFyZ3MgKi9cblx0XHRcdC8vIG5vdGUgdGhhdCB0aGlzIG1peGVzIHByb3RvdHlwaWNhbCBpbmhlcml0YW5jZVxuXHRcdFx0Ly8gaW50byB0aGUgZXhpc3RpbmcgY2xhc3NpY2FsIGluaGVyaXRhbmNlIHNjaGVtZVxuXHRcdFx0dmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG5cdFx0XHRyZXN1bHQuX2RvQXJncyAgID0gWy4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzXTtcblx0XHRcdHJlc3VsdC5fb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdF9kbyhtZXRob2QsIGRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogY29udGFpbmVyLXNwZWNpZmljIHByb2Nlc3Npbmcgb2YgYXJndW1lbnRzICovXG5cdFx0XHR2YXIge29wdGlvbnMsIGFyZ3N9ID0gdGhpcy5wcm9jZXNzUHJveHlBcmd1bWVudHMoLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3MpO1xuXG5cdFx0XHQvKiBpZiB0aGUgb3B0aW9ucyBjb250YWluIGEgcGF0aCwgcmVpZnkgaXQgKi9cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5wYXRoID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRvcHRpb25zLnBhdGggPSBuZXcgUGF0aChvcHRpb25zLnBhdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0aGUgYXJndW1lbnQgbGlzdCBpcyBmaW5pc2hlZDsgY3JlYXRlIGEgbmV3IGRlbHRhIGFuZCBwdXQgaXQgaW4gdGhlIHJpZ2h0IHBsYWNlICovXG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncyk7XG5cdFx0XHR2YXIgcHJveHkgPSB0aGlzLmFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucyk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgcmlnaHQgUHJveHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nICovXG5cdFx0XHRyZXR1cm4gKHByb3h5IGluc3RhbmNlb2YgZGVsdGFKcy5Db250YWluZXJQcm94eSkgPyBwcm94eSA6IHRoaXM7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBleHRyYWN0IGFuXG5cdFx0ICogb3B0aW9ucyBvYmplY3QsIHBhdGggYW5kIGZpbmFsIGFyZ3VtZW50IGxpc3QgZnJvbSBhIGdpdmVuICdyYXcnIGFyZ3VtZW50IGxpc3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gYXJncyB7WypdfVxuXHRcdCAqIEByZXR1cm4ge3tvcHRpb25zOiBPYmplY3QsIGFyZ3M6IFsqXX19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAncHJvY2Vzc1Byb3h5QXJndW1lbnRzJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gYWRkIGEgZ2l2ZW4gZGVsdGFcblx0XHQgKiB1bmRlciBhIGdpdmVuIHBhdGggd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucywgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBQcm94eS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdhZGRPcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogQ3JlYXRlIGEgZGVsdGEgYmFzZWQgb24gYSBtZXRob2QtbmFtZSBhbmQgYXJndW1lbnQtbGlzdC5cblx0XHQgKiBJZiB0aGUgbWV0aG9kLW5hbWUgaXMgb3ZlcmxvYWRlZCwgeW91J2xsIGF1dG9tYXRpY2FsbHkgZ2V0XG5cdFx0ICogYW4gYERlbHRhLk92ZXJsb2FkZWRgIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBfbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9tZXRob2RIYW5kbGVyc1ttZXRob2RdLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoLi4uYXJncykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdGRlZmluZV9PdmVybG9hZGVkKGRlbHRhSnMpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZChuZXdEZWx0YXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2QgIHtzdHJpbmd9ICAgLSBtZXRob2QgbmFtZVxuXHRcdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXG5cdFx0XHQvKiBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBQcm94eSBjbGFzcyB3aXRoIG5ldyBvcGVyYXRpb24gbWV0aG9kICovXG5cdFx0XHRpZiAoaXNVbmRlZmluZWQoZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSkpIHtcblx0XHRcdFx0ZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2RvKG1ldGhvZCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJlZ2lzdGVyIGhhbmRsZXJzIGZvciBlYWNoIG1ldGhvZCAqL1xuXHRcdFx0YShkZWx0YUpzLkNvbnRhaW5lclByb3h5LCAnX21ldGhvZEhhbmRsZXJzJywgbWV0aG9kKS5wdXNoKGhhbmRsZXIpO1xuXG5cdFx0fVxuXG5cblx0fTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbnRhaW5lclByb3h5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2luZGVudCwgb25jZVBlcn0gICAgICAgZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdDb21wb3NlZCcsIChkZWx0YUpzKSA9PiB7XG5cblxuXHQvLyBOT1RFOiBOb3QgaW1wb3J0aW5nIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5IGRlbHRhSnMuRGVsdGEgaGVyZS5cblx0Ly8gICAgICAgVGhhdCBmaWxlIHdpbGwgaW1wb3J0IHRoaXMgb25lIGF0IHRoZSBwcm9wZXIgdGltZS5cblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQ29tcG9zZWQnLCBjbGFzcyBDb21wb3NlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jb21wb25lbnRzID0gdGhpcy5hcmcgfHwgW107XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5fY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudHMubWFwKChkZWx0YSkgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuX2NvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50cykgPT4ge1xuXHRcdFx0XHRjb21wb25lbnRzLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5fY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBg4oCiICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5fY29tcG9uZW50cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbMF0ucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0fVxuXG5cdFx0X2NvbGxhcHNlKCkge1xuXHRcdFx0LyogZmxhdHRlbiBDb21wb3NlZCB0aGF0IGFyZSBpbnNpZGUgQ29tcG9zZWQgKi9cblx0XHRcdHRoaXMuX2NvbXBvbmVudHMgPSAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgbmV3Q29tcG9uZW50cyA9IFtdO1xuXHRcdFx0XHR0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGRlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCkge1xuXHRcdFx0XHRcdFx0ZGVsdGEuX2NvbGxhcHNlKCk7XG5cdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goLi4uZGVsdGEuX2NvbXBvbmVudHMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBuZXdDb21wb25lbnRzO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogY29tcG9zZSBuZWlnaGJvdXJpbmcgcGFpcnMgd2hlcmUgcG9zc2libGUgKi9cblx0XHRcdGxldCBjaGFuZ2VkO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRjaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuX2NvbXBvbmVudHMgPSAoKCkgPT4ge1xuXHRcdFx0XHRcdGxldCBuZXdDb21wb25lbnRzID0gW107XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb21wb25lbnRzLmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuXHRcdFx0XHRcdFx0bGV0IGNvbXBvc2VkUGFpciA9IHRoaXMuX2NvbXBvbmVudHNbaV0uY29tcG9zZWRXaXRoKHRoaXMuX2NvbXBvbmVudHNbaSsxXSk7XG5cdFx0XHRcdFx0XHRpZiAoY29tcG9zZWRQYWlyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCkge1xuXHRcdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2godGhpcy5fY29tcG9uZW50c1tpXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goY29tcG9zZWRQYWlyKTtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGkgKz0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGkgPT09IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKHRoaXMuX2NvbXBvbmVudHNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbmV3Q29tcG9uZW50cztcblx0XHRcdFx0fSkoKTtcblx0XHRcdH0gd2hpbGUgKGNoYW5nZWQpO1xuXHRcdH1cblxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQgPyBkMS5fY29tcG9uZW50cyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkID8gZDIuX2NvbXBvbmVudHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Db21wb3NlZChbLi4uRDEsIC4uLkQyXSk7XG5cdFx0cmVzdWx0Ll9jb2xsYXBzZSgpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ29tcG9zZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdQcm94eScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLlByb3h5ID0gY2xhc3MgUHJveHkge1xuXHRcdGNvbnN0cnVjdG9yKHtwYXJlbnQsIGRlbHRhfSA9IHt9KSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5fZGVsdGEgPSBkZWx0YTtcblx0XHR9XG5cdFx0ZGVsdGEoKSB7IHJldHVybiB0aGlzLl9kZWx0YTsgfVxuXHRcdGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmUgfVxuXHRcdGRlYWN0aXZhdGUoKSB7IHRoaXMuX2FjdGl2ZSA9IGZhbHNlIH1cblx0fTtcblxuXG5cdGV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBhcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IHRoaXMuY29uc3RydWN0b3IuUHJveHk7XG5cdFx0XHRpZiAoIVByb3h5Q2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nICdkbycgb24gZGVsdGEgdHlwZSAnJHt0aGlzLnR5cGV9Jywgd2hpY2ggaGFzIG5vIFByb3h5IGludGVyZmFjZS5gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJveHlDbGFzcyh7IGRlbHRhOiB0aGlzIH0pLmRvKC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1Byb3h5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==