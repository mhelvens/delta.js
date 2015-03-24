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
	
	var U = _interopRequire(_utilJs);
	
	var extend = _utilJs.extend;
	var oncePer = _utilJs.oncePer;
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var wt = _TargetJs.wt;
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
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
	
				this.id = ++Delta._nextID;
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
									var result = new deltaJs.Delta.DeltaModel();
									result.graph.addNewVertex(1, d1);
									result.graph.addNewVertex(2, d2);
									result.graph.addNewEdge(1, 2);
									return result;
								};
								// TODO: make a new dedicated delta type for this; DeltaModel is overkill
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
	     * @param options {Object}
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
	
	var define_Proxy = _interopRequire(__webpack_require__(18));
	
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
	
	var define_Proxy = _interopRequire(__webpack_require__(18));
	
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
	     * @param options {Object}
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
	
	var define_Proxy = _interopRequire(__webpack_require__(18));
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNzE0Mzc0NTU2ODIxNTMyNTMyZSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUU7R0FBQSxDQUFDLENBQW9CLENBQUM7OztBQUloRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTSxRQUFRLENBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFNO09BQUUsRUFBRSxRQUFGLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFFLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFFLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsS0FBSyxDQUFLLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENB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QUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVEsY0FBYyxDQUFDLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFPLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVEsY0FBYyxDQUFDLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQU8sRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBVSxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFtQyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQU8sRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBTSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUU7R0FBQSxDQUFDLENBQW9CLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLEVBQUUsVUFBQyxFQUFFLEVBQUUsRUFBRTtVQUNqRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSw4QkFBSyxFQUFFLENBQUMsTUFBTSxzQkFBSyxFQUFFLENBQUMsTUFBTSxHQUFFO0dBQUEsQ0FBQyxDQUFDOzs7RUFLL0QsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQzVFeUQsQ0FBVzs7S0FBOUQsV0FBVyxXQUFYLFdBQVc7S0FBRSxTQUFTLFdBQVQsU0FBUztLQUFFLENBQUMsV0FBRCxDQUFDO0tBQUUsUUFBUSxXQUFSLFFBQVE7S0FBRSxPQUFPLFdBQVAsT0FBTzs7S0FDNUMsY0FBYyx1QkFBcUMsQ0FBYSxFQUFoRSxjQUFjOztLQUNmLGFBQWEsdUNBQXVDLENBQWE7O0tBQ2pFLHNCQUFzQix1Q0FBOEIsRUFBc0I7O0tBQzFFLFlBQVksdUNBQXdDLEVBQVk7O2tCQUd4RCxPQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxPQUFPLEVBQUs7O0FBR3RELGVBQWEsQ0FBVSxPQUFPLENBQUMsQ0FBQztBQUNoQyx3QkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxjQUFZLENBQVcsT0FBTyxDQUFDLENBQUM7OztBQUloQyxTQUFPLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCO0FBQzlCLFlBRHNDLGVBQWU7c0NBQ2pELElBQUk7QUFBSixTQUFJOzs7MEJBRDhCLGVBQWU7O0FBRS9ELCtCQUZnRCxlQUFlLDhDQUV0RCxJQUFJLEVBQUU7QUFDZixRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxFQUFFLENBQUM7SUFDaEY7O2FBSmdELGVBQWU7O3dCQUFmLGVBQWU7QUFLaEUsU0FBSztZQUFBLGlCQUFHO0FBQ1AsVUFBSSxNQUFNLDhCQU5zQyxlQUFlLHNDQU1yQyxDQUFDO0FBQzNCLFlBQU0sQ0FBQyxNQUFNLGdDQUFPLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQztBQUNqQyxhQUFPLE1BQU0sQ0FBQztNQUNkOzs7O0FBQ0QsZ0JBQVk7WUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFDcEIsYUFBTyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLEtBQ2xFLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksTUFBTSxZQUFZLGNBQWMsQ0FBQyxDQUFDO01BQ2xGOzs7O0FBQ0QsV0FBTztZQUFBLGlCQUFDLE1BQU0sRUFBRTtBQUNmLFVBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUNqRCxXQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQzlCLFdBQUksS0FBSzs7Ozs7Ozs7OztVQUFHLFlBQW1COzs7MENBQU4sSUFBSTtBQUFKLGFBQUk7OztBQUM1QixZQUFJLE1BQU0sQ0FBQztBQUNYLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFLEVBQUs7QUFDeEMsZUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLFFBQU8sSUFBSSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDOztBQUVILGVBQU8sTUFBTSxDQUFDO1FBQ2QsRUFBQztBQUNGLFlBQUssQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFlBQW1COzBDQUFOLElBQUk7QUFBSixhQUFJOzs7QUFBSSxrQkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQUUsQ0FBQyxDQUFDO0FBQ2pGLGFBQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO09BQ3JCO0FBQ0QsVUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUMxQyxVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBcUI7V0FBbkIsTUFBTSxRQUFOLE1BQU07V0FBRSxLQUFLLFFBQUwsS0FBSzs7QUFDbEMsZUFBUSxNQUFNO0FBQ2IsYUFBSyxTQUFTO0FBQUU7QUFDZixhQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ2xCLE1BQU07QUFDUixhQUFLLFFBQVE7QUFBRTs7OztBQUlkLGNBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxhQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7VUFDOUIsTUFBTTtBQUNSLGFBQUssUUFBUTtBQUFFO0FBQ2QsYUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNmLE1BQU07QUFBQSxRQUNSO09BQ0QsQ0FBQyxDQUFDO01BQ0g7Ozs7QUFDRyxXQUFPO1VBQUEsWUFBRztBQUFFLGFBQU8sRUFBRTtNQUFFOzs7OztVQS9Dc0IsZUFBZTtLQUFTLE9BQU8sQ0FBQyxLQUFLLEVBZ0RyRixDQUFDOzs7QUFJSCxTQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7VUFBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUM7QUFDOUcsU0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUcsVUFBQyxLQUFLO1VBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQzlHLFNBQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFHLFVBQUMsS0FBSztVQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFHLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBQzs7O0FBSTlHLE1BQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQixTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVcsaUJBQWlCLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEgsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFjLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hILFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBVyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUNoSCxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVcsaUJBQWlCLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEgsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFVLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hILFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBVyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUNoSCxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQVUsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEgsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFhLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQ2hILFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoSCxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQVUsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEgsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRTtHQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUNoSCxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQVUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEgsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxVQUFDLEVBQUUsRUFBRSxFQUFFO1VBQ3ZFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLDhCQUFLLEVBQUUsQ0FBQyxNQUFNLHNCQUFLLEVBQUUsQ0FBQyxNQUFNLEdBQUU7R0FBQSxDQUFDLENBQUM7OztFQUtsRSxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0M3RkssT0FBTyx1Q0FBTSxDQUFVOzs7O21DQUltQixDQUFXOztLQUFwRCxNQUFNLFdBQU4sTUFBTTtLQUFFLFNBQVMsV0FBVCxTQUFTO0tBQUUsTUFBTSxXQUFOLE1BQU07S0FBRSxPQUFPLFdBQVAsT0FBTzs7S0FDbkMsSUFBSSx1Q0FBc0MsQ0FBVzs7S0FDckQsYUFBYSx1Q0FBNkIsQ0FBYTs7S0FDdkQscUJBQXFCLHVDQUFxQixFQUFxQjs7S0FDOUQscUJBQXFCLHVCQUFvQixDQUFZLEVBQXJELHFCQUFxQjs7a0JBR2QsT0FBTyxDQUFDLFlBQVksRUFBRSxVQUFDLE9BQU8sRUFBSzs7QUFHakQsdUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRy9CLFNBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZO0FBRXpCLFlBRmlDLFVBQVU7c0NBRXZDLElBQUk7QUFBSixTQUFJOzs7MEJBRnlCLFVBQVU7O0FBR3JELCtCQUgyQyxVQUFVLDhDQUc1QyxJQUFJLEVBQUU7QUFDZixRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0I7O2FBTDJDLFVBQVU7O3dCQUFWLFVBQVU7QUFPdEQsU0FBSztZQUFBLGlCQUFHO0FBQ1AsVUFBSSxNQUFNLDhCQVJpQyxVQUFVLHNDQVEzQixDQUFDO0FBQzNCLFlBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNsQyxZQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUs7QUFDdEMsYUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO09BQzFDLENBQUMsQ0FBQztBQUNILGFBQU8sTUFBTSxDQUFDO01BQ2Q7Ozs7QUFFRCxXQUFPO1lBQUEsaUJBQUMsTUFBTSxFQUFnQjtVQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFDM0IsVUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFLO0FBQzVDLGVBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2xDLENBQUMsQ0FBQztNQUNIOzs7O0FBTUQsWUFBUTs7Ozs7OztZQUFBLG9CQUFlO1VBQWQsT0FBTyxnQ0FBRyxFQUFFOztBQUNwQixVQUFJLEdBQUcsOEJBM0JvQyxVQUFVLDBDQTJCNUIsT0FBTyxDQUFDLENBQUM7QUFDbEMsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRTtBQUNqQyxXQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFLO0FBQ3pDLGNBQU0sVUFBUSxJQUFJLFVBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBSSxDQUFDO1FBQ25ELENBQUMsQ0FBQztBQUNILFVBQUcsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztPQUNoQztBQUNELGFBQU8sR0FBRyxDQUFDO01BQ1g7Ozs7QUFBQTs7Ozs7O1VBcEMyQyxVQUFVO0tBQVMsT0FBTyxDQUFDLEtBQUs7QUEwQ2pFLFlBRkgsZUFBZTtzQ0FFUixJQUFJO0FBQUosU0FBSTs7OzBCQUZYLGVBQWU7O0FBR3RCLCtCQUhPLGVBQWUsOENBR2IsSUFBSSxFQUFFO0FBQ2YsUUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDeEIsUUFBSSxDQUFDLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztJQUN0Qzs7YUFOTyxlQUFlOzt3QkFBZixlQUFlO0FBWXZCLHlCQUFxQjs7Ozs7OztZQUFBLGlDQUFhO3dDQUFULE9BQU87QUFBUCxjQUFPOzs7OztBQUcvQixVQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsU0FBRztBQUNGLFdBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFBRSxjQUFNLElBQUksS0FBSyx3RUFBd0U7UUFBRTtBQUNySCxXQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUIsV0FBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDNUIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFBRSxnQkFBTyxDQUFDLElBQUksR0FBRyxHQUFHO1NBQUksTUFDeEI7QUFBRSxnQkFBTyxDQUFDLElBQUksR0FBRyxHQUFHO1NBQUk7UUFDM0MsTUFBc0I7QUFBRSxjQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztRQUFFO09BQy9DLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUN6QyxhQUFPLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7TUFDbEM7Ozs7QUFPRCxnQkFBWTs7Ozs7Ozs7WUFBQSxzQkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1VBQ3ZCLElBQUksR0FBbUIsT0FBTyxDQUE5QixJQUFJO1VBQUUsSUFBSSxHQUFhLE9BQU8sQ0FBeEIsSUFBSTtVQUFFLE9BQU8sR0FBSSxPQUFPLENBQWxCLE9BQU87OztBQUd4QixVQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFdBQUksT0FBTyxhQUFDO0FBQ1osV0FBSSxPQUFPLEVBQUU7QUFBRSxlQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBRyxJQUFJLEVBQWEsT0FBTyxDQUE4QjtRQUFFLE1BQ3pGO0FBQUUsZUFBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLGFBQVksSUFBSSxFQUFJLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBRTtRQUFFO0FBQ3BHLFdBQUksU0FBUyxDQUFDLE9BQU8sU0FBWSxDQUFDLEVBQUU7QUFDbkMsZUFBTyxNQUFHLENBQUMsT0FBTyxTQUFZLENBQUMsQ0FBQztBQUNoQyxlQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNsRDtBQUNELFdBQUksU0FBUyxDQUFDLE9BQU8sU0FBWSxDQUFDLEVBQUU7QUFDbkMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFNBQVksQ0FBQyxDQUFDO1FBQ3JDO0FBQ0QsV0FBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUNuQyxhQUFLLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDO1FBQ3JDO0FBQ0QsV0FBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztPQUNqRDs7O0FBR0QsVUFBSSxZQUFZLENBQUM7QUFDakIsVUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2QsV0FBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUMxRCxXQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUN0RSxtQkFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO09BQzFELE1BQU07QUFDTixtQkFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQy9DOzs7QUFHRCxVQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixXQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztPQUNuQzs7O0FBR0QsYUFBTyxZQUFZLENBQUM7TUFDcEI7Ozs7QUFPRCxTQUFLOzs7Ozs7OztZQUFBLGlCQUFHOzs7QUFDUCxVQUFJLE1BQU0sOEJBOUVILGVBQWUsc0NBOEVJLENBQUM7QUFDM0IsWUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQixVQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2xDLFdBQUksT0FBTyxHQUFHLE1BQUssYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHdkMsV0FBSSxLQUFLLEdBQUcsTUFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsYUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7QUFHcEMsb0NBQUssT0FBTyxTQUFZLElBQUUsRUFBRSxzQkFBSyxPQUFPLE1BQVMsSUFBRSxFQUFFLHNCQUFLLE9BQU8sU0FBWSxJQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDeEcsY0FBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFlBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRTtBQUM1QixlQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxlQUFNLElBQUkscUJBQXFCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsQ0FBQyxDQUFDOzs7QUFHSCxXQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBSywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7QUFDMUUsYUFBSyxDQUFDLG9CQUFvQixHQUFHLE1BQUssMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEU7T0FFRCxDQUFDLENBQUM7QUFDSCxhQUFPLE1BQU0sQ0FBQztNQUNkOzs7Ozs7VUF2R08sZUFBZTtLQUFTLE9BQU8sQ0FBQyxjQUFjLEVBeUdyRCxDQUFDOzs7OztBQU1ILFNBQU8sQ0FBQyxjQUFjLENBQUMsVUFBQyxFQUFFLEVBQUUsRUFBRTtVQUM3QixFQUFFLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQ3RDLEVBQUUsWUFBWSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVU7R0FDdEMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUdULENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7OzttQ0M5S29ELENBQVc7O0tBQXpELE1BQU0sV0FBTixNQUFNO0tBQUUsQ0FBQyxXQUFELENBQUM7S0FBRSxNQUFNLFdBQU4sTUFBTTtLQUFFLFdBQVcsV0FBWCxXQUFXO0tBQUUsT0FBTyxXQUFQLE9BQU87O0tBQ3ZDLGlCQUFpQix1QkFBNkIsQ0FBWSxFQUExRCxpQkFBaUI7O2tCQUdWLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQyxPQUFPLEVBQUs7O0FBRy9DLFNBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFNOztBQUU5QyxTQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQU1yQyxjQUFVLHNCQUFDLElBQUksRUFBZ0I7U0FBZCxPQUFPLGdDQUFHLEVBQUU7OztBQUU1QixXQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsZ0NBQ1YsSUFBSSx1QkFBb0IsQ0FBQzs7O0FBR3RELFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsQ0FBQyxDQUFDO0dBRUgsQ0FBQyxDQUFDOzs7QUFJSCxXQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRTtBQUNoQyxRQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxRQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFJO1dBQUksSUFBSSxZQUFZLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO0lBQUEsQ0FBQyxDQUFDO0FBQzlFLFVBQU8sS0FBSyxDQUFDO0dBQ2I7OztBQUlELE1BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLE1BQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixXQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQWlCO09BQWYsUUFBUSxnQ0FBRyxFQUFFOztBQUNyQyx1QkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsT0FBSSxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQ3RCLGFBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUIsTUFBTSxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUUsRUFFOUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDakMsS0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRDtHQUNEO0FBQ0QsV0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRTtBQUM1QyxtQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDbEQsVUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7R0FDSDs7O0FBSUQsTUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE1BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixXQUFTLFVBQVUsQ0FBQyxPQUFPLEVBQWlCO09BQWYsUUFBUSxnQ0FBRyxFQUFFOztBQUN6Qyx1QkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsT0FBSSxRQUFRLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLFlBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUIsTUFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsRUFFN0IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEMsS0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRDtHQUNEO0FBQ0QsV0FBUyxjQUFjLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRTtBQUMvQyxtQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDbEQsY0FBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7R0FDSDs7O0FBSUQsTUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDakMsV0FBUyxpQkFBaUIsR0FBRztBQUM1QixPQUFJLENBQUMsb0JBQW9CLEVBQUU7QUFBRSxXQUFNO0lBQUU7QUFDckMsdUJBQW9CLEdBQUcsS0FBSyxDQUFDOzs7QUFHN0IsT0FBSSxnQkFBZ0IsQ0FBQztBQUNyQixNQUFHO0FBQ0Ysb0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLFVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVcsRUFBSztBQUN0RCxTQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFOztBQUU1QixVQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtBQUFFLGdCQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSztPQUFFO0FBQzNFLFVBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFJO2NBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFJO2VBQUksU0FBUyxDQUFDLElBQUksQ0FBQztRQUFBLENBQUM7T0FBQSxDQUFDLEVBQUU7QUFDL0UsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDOUIsdUJBQWdCLEdBQUcsSUFBSSxDQUFDO09BQ3hCO01BQ0Q7S0FDRCxDQUFDLENBQUM7SUFDSCxRQUFRLGdCQUFnQixFQUFFOzs7QUFHM0IsU0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBVyxFQUFLOztBQUV0RCxZQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxjQUFJO1lBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFJO2FBQUksU0FBUyxDQUFDLElBQUksQ0FBQztNQUFBLENBQUM7S0FBQSxDQUFDLENBQUM7SUFDdkcsQ0FBQyxDQUFDO0dBQ0g7Ozs7O0FBTUQsU0FBTyxDQUFDLE9BQU87QUFDSCxZQURZLE9BQU8sQ0FDbEIsSUFBSTs7O1FBQUUsT0FBTyxnQ0FBRyxFQUFFOzswQkFEUCxPQUFPOzs7QUFHN0IsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7OztBQUd2QixVQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUN4QyxXQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDeEMsQ0FBQyxDQUFDO0lBQ0g7O3dCQVZzQixPQUFPO0FBVzFCLFlBQVE7VUFBQSxZQUFHO0FBQ2QsdUJBQWlCLEVBQUUsQ0FBQztBQUNwQixVQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2pELGFBQU0sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNsQztBQUNELGFBQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUM1Qjs7O0FBQ0csYUFBUztVQUFBLFlBQUs7QUFBRSxhQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQW9COzs7QUFDekQsZUFBVztVQUFBLFlBQUc7QUFBRSxhQUFPLENBQUMsQ0FBQyxHQUFHLEVBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO01BQUU7OztBQUN6RCxjQUFVO1VBQUEsWUFBSTtBQUFFLGFBQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7TUFBRTs7O0FBQzdELFVBQU07WUFBQSxrQkFBRztBQUFFLFVBQUksTUFBRyxDQUFDLElBQUksQ0FBQztNQUFFOzs7Ozs7VUFyQkgsT0FBTztNQXNCOUIsQ0FBQzs7O0FBSUYsTUFBTSxtQkFBbUIsR0FBRyxDQUMzQixDQUFFLElBQUksRUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBYztBQUN0RCxHQUFFLFFBQVEsRUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUEwQjtBQUN0RCxHQUFFLFNBQVMsRUFBSyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBYTtBQUN0RCxHQUFFLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFzQjtBQUN0RCxHQUFFLEtBQUssRUFBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUU7R0FDdEQsQ0FBQztBQUNGLFNBQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUU7OztBQUM1RCxzQkFBbUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWtCOzs7UUFBaEIsQ0FBQztRQUFFLE9BQU87O0FBQ3ZDLFFBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNmLFlBQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFBRSxZQUFNLENBQUMsTUFBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO01BQUUsQ0FBQyxDQUFDO0tBQzFEO0lBQ0QsQ0FBQyxDQUFDO0dBQ0gsQ0FBQztBQUNGLHFCQUFtQixDQUFDLE9BQU8sQ0FBQyxnQkFBWTs7O09BQVYsSUFBSTs7QUFDakMsVUFBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDbEQsUUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztHQUNGLENBQUMsQ0FBQzs7O0FBSUgsU0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7RUFHdEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQ2hLNEIsQ0FBVzs7S0FBakMsTUFBTSxXQUFOLE1BQU07S0FBRSxPQUFPLFdBQVAsT0FBTzs7S0FDaEIsaUJBQWlCLHVDQUFNLEVBQWlCOztrQkFHaEMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFVBQUMsT0FBTyxFQUFLOztBQUd2RCxTQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxZQUFNOztBQUV0RCxvQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFM0IsU0FBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFOzs7Ozs7OztBQVFyQyxNQUFFLGNBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtBQUNiLFNBQUksSUFBSSx1QkFBTSxJQUFJLEVBQUcsR0FBRyxDQUFFLENBQUM7QUFDM0IsU0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDM0Msd0JBQWtCLEVBQUUsSUFBSTtNQUN4QixDQUFDLENBQUM7QUFDSCxZQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjs7Ozs7Ozs7OztBQVVELFVBQUUsZUFBVTs7O3VDQUFOLElBQUk7QUFBSixVQUFJOzs7QUFDVCxZQUFPLHdCQUFJLENBQUMsZ0JBQWdCLGFBQUcsb0JBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQUssSUFBSSxFQUFDLENBQUM7S0FDNUQ7O0lBRUQsQ0FBQyxDQUFDO0dBRUgsQ0FBQyxDQUFDOztBQUdILFNBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLE1BQUcsRUFBRSxDQUFDO0VBRy9ELENBQUMsQzs7Ozs7Ozs7Ozs7O21DQy9DeUMsQ0FBVzs7S0FBOUMsTUFBTSxXQUFOLE1BQU07S0FBRSxXQUFXLFdBQVgsV0FBVztLQUFFLE9BQU8sV0FBUCxPQUFPO2tCQUdyQixPQUFPLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxPQUFPLEVBQUs7O0FBRzdELFNBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLHdCQUF3QixFQUFFLFlBQU07O0FBRTVELFNBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtBQUNyQyxVQUFNLG9CQUFjOzs7dUNBQVYsUUFBUTtBQUFSLGNBQVE7OztBQUNqQixhQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQzdCLFVBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTs7O0FBQzNCLHNCQUFLLE1BQU0sZ0NBQUksT0FBTyxFQUFDLENBQUM7T0FDeEIsTUFBTTtBQUNOLGFBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQ2hDO01BQ0QsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxDQUFDLENBQUM7R0FFSCxDQUFDLENBQUM7O0FBR0gsUUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUywwQkFBRSxFQUkvQjtBQUZJLHVCQUFvQjtTQURBLFlBQUc7QUFBRSxZQUFPLElBQUksQ0FBQyxxQkFBcUI7S0FBRTtTQUN4QyxVQUFDLEVBQUUsRUFBRTtBQUFFLFNBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFO0tBQUU7Ozs7QUFDNUQsV0FBUTtTQUFBLFlBQUc7QUFBRSxZQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUTtLQUFFOzs7O0tBQ3JHLENBQUM7RUFHSCxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0M5QkssT0FBTyx1Q0FBTSxDQUFVOzs7O21DQUlnQixDQUFXOztLQUFqRCxNQUFNLFdBQU4sTUFBTTtLQUFFLENBQUMsV0FBRCxDQUFDO0tBQUUsV0FBVyxXQUFYLFdBQVc7S0FBRSxPQUFPLFdBQVAsT0FBTzs7S0FDaEMsSUFBSSx1Q0FBbUMsQ0FBVzs7S0FDbEQsaUJBQWlCLHVDQUFzQixDQUFpQjs7S0FDeEQsWUFBWSx1Q0FBMkIsRUFBWTs7S0FDbEQsMEJBQTBCLHVCQUFZLENBQVksRUFBbEQsMEJBQTBCOztrQkFHbkIsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsT0FBTyxFQUFLOztBQUdyRCxjQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7OztBQUl0QixTQUFPLENBQUMsY0FBYzs7Ozs7QUFLVixZQUxtQixjQUFjO1FBS2hDLE9BQU8sZ0NBQUcsRUFBRTs7MEJBTE0sY0FBYzs7QUFNM0MsK0JBTjZCLGNBQWMsNkNBTXJDLE9BQU8sRUFBRTtBQUNmLFFBQUksQ0FBQyxPQUFPLEdBQVMsRUFBRSxDQUFDO0FBQ3hCLFFBQUksQ0FBQyxTQUFTLEdBQU8sSUFBSSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxTQUFTLEdBQU8sRUFBRSxDQUFDO0FBQ3hCLFFBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3hCOzthQVg2QixjQUFjOzt3QkFBZCxjQUFjO0FBMklyQyxxQkFBaUI7Ozs7Ozs7Ozs7Ozs7O1lBQUEsMkJBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN0QyxVQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQU87Y0FBSSxPQUFPLHFDQUFJLElBQUksRUFBQztPQUFBLENBQUMsQ0FBQztBQUNoRyxVQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQzNCLGNBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ3BCLE1BQU07O0FBQ04sd0JBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsY0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQy9DO01BQ0Q7Ozs7QUFPTSxrQkFBYzs7Ozs7OztZQUFBLHdCQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUU7OztBQUd0QyxVQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQzFELGNBQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFlBQW1COzBDQUFOLElBQUk7QUFBSixhQUFJOzs7QUFDM0QsZUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO09BQ0Y7OztBQUdELE9BQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUVuRTs7Ozs7QUF4SkQsY0FBVTtZQUFBLHNCQUFHOzs7QUFDWixZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDNUMsYUFBSyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7T0FDbEMsQ0FBQyxDQUFDO0FBQ0gsaUNBbEI2QixjQUFjLDRDQWtCeEI7TUFDbkI7Ozs7QUFHRCxpQkFBYTtZQUFBLHVCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7O0FBRXpCLFVBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQUduQyxVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFELFVBQUksS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7O0FBR3BELFVBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFDaEQsS0FBSyxZQUFjLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtBQUFFLGNBQU8sT0FBTztPQUFFOzs7QUFHbEUsVUFBSSxPQUFPLEVBQUU7QUFBRSxjQUFPLENBQUMsVUFBVSxFQUFFO09BQUU7OztBQUdyQyxVQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxhQUFPLEtBQUssQ0FBQztNQUNiOzs7O0FBR0QsYUFBUztZQUFBLHFCQUFHO0FBQUUsYUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7TUFBRTs7OztBQUdsRCxnQkFBWTtZQUFBLHNCQUFDLEdBQUcsRUFBRTtBQUFFLGFBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO01BQUU7Ozs7QUFHbkQsY0FBVTtZQUFBLG9CQUFDLEdBQUcsRUFBRTtBQUFFLGFBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO01BQUU7Ozs7QUFHL0UsY0FBVTtZQUFBLG9CQUFDLEdBQUcsRUFBRTs7O0FBQ2YsYUFBTyx5QkFBTyxDQUFDLEtBQUssRUFBQyxRQUFRLDBDQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFLO2NBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtPQUFBLENBQUMsRUFDckQsQ0FBQztNQUNGOzs7OztZQUdDLGVBQVk7d0NBQVIsTUFBTTtBQUFOLGFBQU07Ozs7QUFFWCxVQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUFFLGFBQU0sSUFBSSwwQkFBMEIsRUFBRTtPQUFFOzs7OztBQUs1RCxVQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFlBQU0sQ0FBQyxPQUFPLGdDQUFTLElBQUksQ0FBQyxPQUFPLEdBQUssTUFBTSxDQUFDLENBQUM7QUFDaEQsWUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2xDLGFBQU8sTUFBTSxDQUFDO01BQ2Q7Ozs7QUFNRCxPQUFHOzs7O1lBQUEsYUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFOzs7O0FBRW5CLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQUUsYUFBTSxJQUFJLDBCQUEwQixFQUFFO09BQUU7Ozs7eUNBR3RDLFlBQUksRUFBQyxxQkFBcUIsZ0NBQUksSUFBSSxDQUFDLE9BQU8sNEJBQUssTUFBTSxHQUFDOztVQUF2RSxPQUFPLGdDQUFQLE9BQU87VUFBRSxJQUFJLGdDQUFKLElBQUk7OztBQUdsQixVQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDckMsY0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDdEM7OztBQUdELFVBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7QUFHOUMsYUFBUSxLQUFLLFlBQVksT0FBTyxDQUFDLGNBQWMsR0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO01BQ2hFOzs7O0FBY0QseUJBQXFCOzs7Ozs7Ozs7Ozs7O1lBQUEsaUNBQUc7QUFDdkIsWUFBTSxJQUFJLEtBQUssc0ZBQXNGLENBQUM7TUFDdEc7Ozs7QUFZRCxnQkFBWTs7Ozs7Ozs7Ozs7O1lBQUEsd0JBQUc7QUFDZCxZQUFNLElBQUksS0FBSyw2RUFBNkUsQ0FBQztNQUM3Rjs7Ozs7O1VBNUg2QixjQUFjO0tBQVMsT0FBTyxDQUFDLEtBQUssQ0F5S2xFLENBQUM7RUFHRixDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7S0M5TEssT0FBTyx1Q0FBTSxDQUFVOzs7O21DQUlBLENBQVc7O0tBQWpDLE1BQU0sV0FBTixNQUFNO0tBQUUsT0FBTyxXQUFQLE9BQU87O0tBQ2hCLFlBQVksdUNBQVcsQ0FBa0I7O2tCQUdqQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsT0FBTyxFQUFLOztBQUc1QyxjQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBR3RCLFNBQU8sQ0FBQyxLQUFLO0FBQ0QsWUFEVSxLQUFLOzRDQUNJLEVBQUU7O1FBQW5CLE1BQU0sUUFBTixNQUFNO1FBQUUsS0FBSyxRQUFMLEtBQUs7OzBCQURMLEtBQUs7O0FBRXpCLFFBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3BCOzt3QkFMb0IsS0FBSztBQU0xQixTQUFLO1lBQUEsaUJBQUc7QUFBRSxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7TUFBRTs7OztBQUMzQixVQUFNO1VBQUEsWUFBRztBQUFFLGFBQU8sSUFBSSxDQUFDLE9BQU87TUFBRTs7O0FBQ3BDLGNBQVU7WUFBQSxzQkFBRztBQUFFLFVBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSztNQUFFOzs7Ozs7VUFSaEIsS0FBSztNQVMxQixDQUFDOztBQUdGLFFBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7O0FBTS9CLFNBQUUsZUFBVTs7O3NDQUFOLElBQUk7QUFBSixTQUFJOzs7QUFDVCxRQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4QyxRQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2hCLFdBQU0sSUFBSSxLQUFLLGtDQUFnQyxJQUFJLENBQUMsSUFBSSxzQ0FBbUMsQ0FBQztLQUM1RjtBQUNELFdBQU8sWUFBSSxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBRyxPQUFJLElBQUksQ0FBQyxDQUFDO0lBQ25EOztHQUVELENBQUMsQ0FBQztFQUdILENBQUMsQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNzE0Mzc0NTU2ODIxNTMyNTMyZVxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbi8qIGltcG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuaW1wb3J0IERlbHRhSnMgZnJvbSAnLi9EZWx0YUpzLmpzJztcblxuXG4vKiBtYWtlIFRhcmdldCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgQXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIENvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciwgQ29uc3RyYWludEZhaWx1cmUsXG4gICAgICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSwgVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QsXG4gICAgICAgICAgICAgICAgICAgIE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yIH0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwiLyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuLyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuLyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gb2JqMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZGZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHR2YXIga2V5cyA9IHJlc3Quc2xpY2UoMCwgLTEpO1xuXHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHR2YXIgbGFzdCA9IG8ob2JqZWN0LCAuLi5rZXlzLnNsaWNlKDAsIC0xKSk7XG5cdGlmIChpc1VuZGVmaW5lZChsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dKSkge1xuXHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdH1cblx0cmV0dXJuIGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gZGZhdWx0KG9iamVjdCwgLi4ua2V5cywgW10pIH1cblxuXG4vKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG59XG5cblxuLyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuXG4vKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdChuciwgc3RyKSB7XG5cdHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpO1xufVxuXG5cbi8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgcmVwZWF0KGFtb3VudCwgY2hhcikpO1xufVxuXG5cbi8qIHJ1biBhIGZ1bmN0aW9uIG9ubHkgb25jZSBwZXIgb2JqK3N0cmluZyBjb21ibyAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uY2VQZXIob2JqLCBrZXksIGZuKSB7XG5cdHZhciBvcGZuID0gKG9iaikgPT4ge1xuXHRcdHZhciBwID0gYF9vbmNlIHBlcjogJHtrZXl9YDtcblx0XHRpZiAob2JqW3BdKSB7IHJldHVybiB9XG5cdFx0b2JqW3BdID0gdHJ1ZTsgLy8gVE9ETzogbWFrZSBub24tZW51bWVyYXRhYmxlLCBvciB1c2UgRVM2IFN5bWJvbFxuXHRcdHJldHVybiBmbi5jYWxsKG9iaiwgb2JqKTtcblx0fTtcblx0aWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG5cdFx0W2tleSwgZm5dID0gW29iaiwga2V5XTtcblx0XHRyZXR1cm4gb3Bmbjtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gb3BmbihvYmopO1xuXHR9XG59XG5cblxuLyogc2hvcnRoYW5kIHNwZWNpZmllciBmb3IgY29tcG9zaXRpb24gcHJlY29uZGl0aW9ucyAqL1xuZXhwb3J0IHZhciB0ID0gKHR5cGUxLCB0eXBlMikgPT4ge1xuXHRyZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKTtcbn07XG5cblxuLyogc2hvcnRoYW5kIHNwZWNpZmllciBmb3IgY29tcG9zaXRpb24gaW1wbGVtZW50YXRpb25zICovXG5leHBvcnQgdmFyIGRlZmluZV9kID0gKGRlbHRhSnMpID0+ICh0eXBlLCBmbikgPT4ge1xuXHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xufTtcblxuXG5cblxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYXNzZXJ0LCBpc1VuZGVmaW5lZH0gICAgICAgICAgICBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFfY2xhc3MuanMnO1xuaW1wb3J0IGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfUHV0SW50b0FycmF5ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVfUHV0SW50b0Z1bmN0aW9uICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHV0SW50b0Z1bmN0aW9uLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGFNb2RlbCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lX2ZlYXR1cmVzICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVfdmFyaWF0aW9uUG9pbnRzICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVfYXBwbGljYXRpb25Db25kaXRpb25zICAgICAgICAgICAgIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHNcbiAqIGFuZCBhY3RzIGFzIGEgZmFjYWRlIChhcyBpbiBkZXNpZ24gcGF0dGVybikgdG8gdGhlIG1vcmUgc3BlY2lmaWNcbiAqIHN1YnN5c3RlbXMgb2YgZGVsdGEuanMuXG4gKlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIERlbHRhSnMgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YUpzIHtcblxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9QdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX0RlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfZmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV92YXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2FwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbmFtZSAgICAgICB7c3RyaW5nfSAgIC0gbmFtZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiB0eXBlXG5cdCAqIEBwYXJhbSBEZWx0YUNsYXNzIHtGdW5jdGlvbn0gLSB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKiBAcGFyYW0gUHJveHlDbGFzcyB7P0Z1bmN0aW9ufSAtIHRoZSBvcHRpb25hbCBjdXN0b20gUHJveHkgc3ViY2xhc3MgZm9yIHRoaXMgb3BlcmF0aW9uLXR5cGVcblx0ICovXG5cdG5ld09wZXJhdGlvblR5cGUobmFtZSwgRGVsdGFDbGFzcywgUHJveHlDbGFzcykge1xuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRhc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbiBjbGFzc2VzIG11c3QgaGF2ZSBhIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGNhcGl0YWwgbGV0dGVyIC0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdGFzc2VydChpc1VuZGVmaW5lZCh0aGlzLkRlbHRhW25hbWVdKSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0Lyogc3RvcmUgdGhlIG9wZXJhdGlvbiBjbGFzcyAqL1xuXHRcdHRoaXMuRGVsdGFbbmFtZV0gPSBEZWx0YUNsYXNzO1xuXG5cdFx0Lyogc2V0IHRoZSAob3B0aW9uYWwpIFByb3h5IGNsYXNzICovXG5cdFx0RGVsdGFDbGFzcy5Qcm94eSA9IFByb3h5Q2xhc3M7XG5cblx0XHQvKiBmZXRjaCB0aGUgZ2l2ZW4gYXBwbHlUbyBmdW5jdGlvbiAoaWYgYW55KSB3aGljaCB3aWxsIGJlIHNsaWdodGx5IG1vZGlmaWVkICovXG5cdFx0dmFyIGdpdmVuQXBwbHlUbyA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmFwcGx5VG8gfHwgKCgpPT57fSk7XG5cblx0XHQvKiBhdWdtZW50IHRoZSBjbGFzcyBwcm90b3R5cGUgKi9cblx0XHRleHRlbmQoRGVsdGFDbGFzcy5wcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgc2VsZWN0aW9uPyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuc2VsZWN0ZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBhbHJlYWR5IGluIFRhcmdldCBmb3JtLCBtYWtlIGl0IHNvIG5vdyAqL1xuXHRcdFx0XHRpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0KSkge1xuXHRcdFx0XHRcdHRhcmdldCA9IG5ldyBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0KHRhcmdldCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBkb2VzIHRoZSB0YXJnZXQgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uIG9mIHRoZSBkZWx0YT8gKi9cblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpcy5ldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXG5cdFx0XHRcdC8qIE9LLCB0aGVuIGFwcGx5IGl0IGlmIGEgbWV0aG9kIHRvIGRvIHNvIHdhcyBpbmNsdWRlZCBpbiB0aGUgb3BlcmF0aW9uICovXG5cdFx0XHRcdGdpdmVuQXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9LFxuXHRcdFx0dHlwZTogbmFtZVxuXHRcdH0pO1xuXG5cdFx0LyogY3JlYXRlIGFueSBnaXZlbiBtZXRob2RzIHdpdGggZGVmYXVsdCBoYW5kbGVyICovXG5cdFx0dmFyIGxvd2VyY2FzZU5hbWUgPSBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKTtcblx0XHQoRGVsdGFDbGFzcy5wcm90b3R5cGUubWV0aG9kcyB8fCBbbG93ZXJjYXNlTmFtZV0pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0dGhpcy5Db250YWluZXJQcm94eS5uZXdQcm94eU1ldGhvZChtZXRob2QsICguLi5hcmdzKSA9PiBuZXcgRGVsdGFDbGFzcyguLi5hcmdzKSk7XG5cdFx0fSk7XG5cblx0XHQvKiByZXR1cm4gdGhlIG5ldyBjbGFzcyAqL1xuXHRcdHJldHVybiBEZWx0YUNsYXNzO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBtZXRob2QgIHtzdHJpbmd9ICAgLSBtZXRob2QgbmFtZVxuXHQgKiBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIG1ldGhvZCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgbmV3IGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHQgKi9cblx0bmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKSB7XG5cdFx0dGhpcy5Db250YWluZXJQcm94eS5uZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpO1xuXHR9XG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGNsYXNzIFJlYWRhYmxlVGFyZ2V0IHtcblx0Y29uc3RydWN0b3IodmFsdWUpIHsgdGhpcy5fdmFsID0gdmFsdWUgfVxuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9XG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9XG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXcml0YWJsZVRhcmdldCBleHRlbmRzIFJlYWRhYmxlVGFyZ2V0IHtcblx0Y29uc3RydWN0b3Iob2JqLCBwcm9wKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9vYmogPSBvYmo7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdH1cblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfVxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVLCB7YXNzZXJ0LCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG5cblx0Y29uc3RydWN0b3Ioc3RyID0gXCJcIikge1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0YXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH1cblxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfVxuXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKGlzRGVmaW5lZCh0aGlzLnByb3ApKSB7XG5cdFx0XHRyZXN1bHQgKz0gdGhpcy5wcm9wO1xuXHRcdFx0aWYgKGlzRGVmaW5lZCh0aGlzLnJlc3QpKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIi5cIiArIHRoaXMucmVzdC50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cbn1cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdFx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZSBkZWx0YS10eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHRcdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHRcdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBDb21wb3NpdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGExLCBkZWx0YTIpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50RmFpbHVyZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZmVhdHVyZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIGZlYXR1cmUgJyR7ZmVhdHVyZS5uYW1lfScgaXMgYm90aCBzZWxlY3RlZCBhbmQgZXhjbHVkZWQgYnkgaXRzIGNvbnN0cmFpbnRzLmA7XG5cdFx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25PcmRlckN5Y2xlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBuZXcgYXBwbGljYXRpb24gb3JkZXIgYmV0d2VlbiAke2Zyb219IGFuZCAke3RvfSBjcmVhdGVkIGEgY3ljbGUuYDtcblx0XHR0aGlzLmZyb20gPSBmcm9tO1xuXHRcdHRoaXMudG8gICA9IHRvO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnJlc29sdmVkRGVsdGFDb25mbGljdCBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGFzKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QnO1xuXHRcdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke2RlbHRhTmFtZXN9LmA7XG5cdFx0dGhpcy5kZWx0YXMgPSBkZWx0YXM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE9ubHkgb25lIFByb3h5IHBlciBwYXRoIGNhbiBiZSBhY3RpdmUgYXQgYW55IGdpdmVuIHRpbWUuYDtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSwge2V4dGVuZCwgb25jZVBlcn0gICAgICAgICAgICAgICAgIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCB3dH0gICAgICAgICAgICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignRGVsdGEnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdFx0dGhpcy5EZWx0YS5uZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5EZWx0YSA9IGNsYXNzIERlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHRoaXMuaWQgPSArK0RlbHRhLl9uZXh0SUQ7XG5cdFx0XHR0aGlzLmFyZ3MgPSBhcmdzO1xuXHRcdH1cblxuXHRcdGdldCBhcmcoKSAgeyByZXR1cm4gdGhpcy5hcmdzWzBdIH1cblx0XHRzZXQgYXJnKHYpIHsgdGhpcy5hcmdzWzBdID0gdiB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcpIH1cblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCBvciBhbiBpbnN0YW5jZSBvZiBgRGVsdGFKcy5BcHBsaWNhdGlvbkVycm9yYFxuXHRcdCAqL1xuXHRcdGV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMucHJlY29uZGl0aW9uKSB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQodGhpcywgb3RoZXIpIH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKG9wdGlvbnMudGFyZ2V0UHJvcCkgICB7IHN0ciArPSBgIOKAuSR7b3B0aW9ucy50YXJnZXRQcm9wfeKAumAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0ICogQHBhcmFtIGNvbXBvc2Uge0Jvb2xlYW58KChEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhKX0gLSBmYWxzZSwgb3IgYSBzaWRlLWVmZmVjdCBmcmVlIGZ1bmN0aW9uXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0ZGVsdGFKcy5EZWx0YS5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGFzIHtbRGVsdGFKcyNEZWx0YV19IC0gdGhlIGRlbHRhcyB0byBjb21wb3NlXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRzdGF0aWMgY29tcG9zZWQoLi4uZGVsdGFzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGQxID0gcmVzdWx0LFxuXHRcdFx0XHQgICAgZDIgPSBkZWx0YSB8fCBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IERlbHRhLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogdGhyb3cgYW4gZXJyb3IgaWYgJ2ZhbHNlJyB3YXMgZm91bmQgcmF0aGVyIHRoYW4gYSBmdW5jdGlvbiovXG5cdFx0XHRcdGlmIChjb21wb3NlRm4gPT09IGZhbHNlIHx8ICFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHRcdC8qICBpZiBubyBjb21wb3NpdGlvbiBmdW5jdGlvbiBpcyBmb3VuZCwgdXNlIGEgbGluZWFyIGRlbHRhIG1vZGVsICAqL1xuXHRcdFx0XHQvKiAgdG8gJ25haXZlbHknIGhhdmUgb25lIGRlbHRhIGFwcGx5IGFmdGVyIGFub3RoZXIgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNvbXBvc2VGbiA9IChkMSwgZDIpID0+IHtcblx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly8gVE9ETzogbWFrZSBhIG5ldyBkZWRpY2F0ZWQgZGVsdGEgdHlwZSBmb3IgdGhpczsgRGVsdGFNb2RlbCBpcyBvdmVya2lsbFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdFx0XHRyZXN1bHQgPSBjb21wb3NlRm4oZDEsIGQyKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9O1xuXHRkZWx0YUpzLkRlbHRhLl9uZXh0SUQgPSAwO1xuXHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMgID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFfY2xhc3MuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBkZWZpbmVfRGVsdGEgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQgVSwge2luZGVudCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ092ZXJsb2FkZWQnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhKGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdPdmVybG9hZGVkJywgY2xhc3MgT3ZlcmxvYWRlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLm92ZXJsb2FkcyA9IHRoaXMuYXJnIHx8IFtdO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk92ZXJsb2FkZWR9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHxcblx0XHRkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZFxuXHQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCgpO1xuXHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZDEsIGQyLCBlcnJvcnMpIH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL092ZXJsb2FkZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBpbmRlbnQsIHQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignTW9kaWZ5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Db250YWluZXJQcm94eShkZWx0YUpzKTtcblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTW9kaWZ5JywgY2xhc3MgTW9kaWZ5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuc3ViRGVsdGFzID0ge307XG5cdFx0XHRleHRlbmQodGhpcy5zdWJEZWx0YXMsIHRoaXMuYXJnIHx8IHt9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLnN1YkRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0aWYgKCFvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSB8fCBvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSA9PT0gcHJvcCkge1xuXHRcdFx0XHRcdHRoaXMuc3ViRGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0XHRcdFx0ZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdFxuXHRcdFx0XHRcdFx0LmtleXModGhpcy5zdWJEZWx0YXMpXG5cdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLnN1YkRlbHRhc1twXS50b1N0cmluZyhleHRlbmQoe30sIG9wdGlvbnMsIHsgdGFyZ2V0UHJvcDogcCB9KSkpXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSwgY2xhc3MgTW9kaWZ5UHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHJhd0FyZ3MgeypbXX1cblx0XHQgKiBAcmV0dXJuIHs/eyBvcHRpb25zOiBPYmplY3QsIGFyZ3M6ICpbXSB9fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi5yYXdBcmdzKSB7XG5cdFx0XHQvLyByYXdBcmdzIGlzIHBhcnNlZCBhcyAoLi4ub3B0aW9ucywgcGF0aCwgLi4uYXJncyksXG5cdFx0XHQvLyB0aG91Z2ggcGF0aCBtYXkgYWxzbyBiZSBwYXNzZWQgYXMgYW4gb3B0aW9uIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuUHJveHkgbWV0aG9kIGlzIGluc3VmZmljaWVudC5gKSB9XG5cdFx0XHRcdHZhciBhcmcgPSByYXdBcmdzLnNoaWZ0KCk7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykgeyBvcHRpb25zLnBhdGggPSBhcmcgICAgIH1cblx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICB7IGV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGgpO1xuXHRcdFx0cmV0dXJuIHsgb3B0aW9ucywgYXJnczogcmF3QXJncyB9O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIGRlZXBlc3QgcHJveHkgY3JlYXRlZCBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXHRcdFx0aWYgKCFwYXRoLnByb3ApIHsgdGhyb3cgbmV3IEVycm9yKCdPcGVyYXRpb25zIG9uIGEgTW9kaWZ5LlByb3h5IG5lZWQgdG8gaGF2ZSBhIG5vbi1lbXB0eSBwYXRoLicpIH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHBhdGg6IHBhdGgucmVzdCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTk9URTogTW9kaWZ5IG9wZXJhdGlvbnMgZG8gbm90ICh5ZXQpIHVzZSBhbnkgb3B0aW9uc1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gdGhpcy5jaGlsZERlbHRhKHByb3ApO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IGRlbHRhSnMuRGVsdGEuY29tcG9zZWQocmVzdWx0LnN1YkRlbHRhc1twcm9wXSwgZDIuc3ViRGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9ICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFfY2xhc3MuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2Jhc2ljIG9wZXJhdGlvbnMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhIChkZWx0YUpzKTtcblx0ZGVmaW5lX01vZGlmeShkZWx0YUpzKTtcblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcsIGNsYXNzIE5vT3AgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHt9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdBZGQnLCBjbGFzcyBBZGQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCBjbGFzcyBGb3JiaWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIGNsYXNzIFJlcGxhY2UgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdVcGRhdGUnLCBjbGFzcyBVcGRhdGUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTm9PcCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXG5cdC8qIHV0aWxpdHkgZnVuY3Rpb24gZCAqL1xuXHR2YXIgZCA9IGRlZmluZV9kKGRlbHRhSnMpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ01vZGlmeScpLCBkKCdBZGQnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdBZGQnICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnQWRkJyAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnTW9kaWZ5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ0ZvcmJpZCcpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdGb3JiaWQnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ01vZGlmeScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnUmVtb3ZlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgLCAnUmVwbGFjZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICwgJ1JlcGxhY2UnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnQWRkJyAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdGb3JiaWQnICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnVXBkYXRlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnVXBkYXRlJyApLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnVXBkYXRlJyApLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ01vZGlmeScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdBZGQnICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ0ZvcmJpZCcgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnVXBkYXRlJyApLCBkKCdVcGRhdGUnLCAgKHtwMSwgcDJ9KSA9PiB2ID0+IHAyKHAxKHYpKSkgICApO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSwge2lzRGVmaW5lZCwgdCwgZGVmaW5lX2QsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdQdXRJbnRvQXJyYXknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX01vZGlmeSAgICAgICAgIChkZWx0YUpzKTtcblx0ZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lX1Byb3h5ICAgICAgICAgIChkZWx0YUpzKTtcblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5JywgY2xhc3MgUHV0SW50b0FycmF5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMuYXJnID8gKEFycmF5LmlzQXJyYXkodGhpcy5hcmcpID8gdGhpcy5hcmcgOiBbdGhpcy5hcmddKSA6IFtdO1xuXHRcdH1cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFsuLi50aGlzLnZhbHVlc107XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdNb2RpZnknICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0FkZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVtb3ZlJyAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdGb3JiaWQnICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlcGxhY2UnICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnVXBkYXRlJyAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT5cblx0XHRuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSkpO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ1B1dEludG9GdW5jdGlvbicsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgKGRlbHRhSnMpO1xuXHRkZWZpbmVfQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXHRkZWZpbmVfUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIGNsYXNzIFB1dEludG9GdW5jdGlvbiBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KGlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRpZiAoaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IG1ldGhvZHMoKSB7IHJldHVybiBbXSB9XG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ01vZGlmeScgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnQWRkJyAgICAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ0ZvcmJpZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdVcGRhdGUnICAgICAgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PlxuXHRcdG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbihbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGlzRGVmaW5lZCwgaW5kZW50LCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICAgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9ICAgICAgICAgICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdEZWx0YU1vZGVsJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Db250YWluZXJQcm94eShkZWx0YUpzKTtcblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGNsYXNzIERlbHRhTW9kZWwgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHRcdC8vIFRPRE86IGFkZCBwcmVjb25kaXRpb24gbWV0aG9kIHdoaWNoIGNoZWNrcyAnc291cmNlJyBkZWx0YXNcblxuXHR9LCBjbGFzcyBEZWx0YU1vZGVsUHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307ICAgICAgICAgICAgICAgLy8ga2V5IC0+IG9wdGlvbnNcblx0XHRcdHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zID0ge307IC8vIGtleSAtPiBhcHBsaWNhdGlvbi1jb25kaXRpb25cblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHJhd0FyZ3MgeypbXX1cblx0XHQgKiBAcmV0dXJuIHs/eyBvcHRpb25zOiBPYmplY3QsIGFyZ3M6ICpbXSB9fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi5yYXdBcmdzKSB7XG5cdFx0XHQvLyByYXdBcmdzIGlzIHBhcnNlZCBhcyAoLi4ub3B0aW9ucywgbmFtZSwgLi4ub3B0aW9ucywgcGF0aCwgLi4uYXJncyksXG5cdFx0XHQvLyB0aG91Z2ggbmFtZSBhbmQvb3IgcGF0aCBtYXkgYWxzbyBiZSBwYXNzZWQgYXMgb3B0aW9ucyBkaXJlY3RseVxuXHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHJhd0FyZ3MubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcihgVGhlIGFyZ3VtZW50IGxpc3QgZm9yIHRoaXMgTW9kaWZ5LkRlbHRhTW9kZWwgbWV0aG9kIGlzIGluc3VmZmljaWVudC5gKSB9XG5cdFx0XHRcdHZhciBhcmcgPSByYXdBcmdzLnNoaWZ0KCk7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5uYW1lKSB7IG9wdGlvbnMubmFtZSA9IGFyZyAgIH1cblx0XHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgeyBvcHRpb25zLnBhdGggPSBhcmcgICB9XG5cdFx0XHRcdH0gZWxzZSAgICAgICAgICAgICAgICAgeyBleHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghb3B0aW9ucy5wYXRoIHx8ICFvcHRpb25zLm5hbWUpO1xuXHRcdFx0cmV0dXJuIHsgb3B0aW9ucywgYXJnczogcmF3QXJncyB9O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIge3BhdGgsIG5hbWUsIGZlYXR1cmV9ID0gb3B0aW9ucztcblxuXHRcdFx0LyogY3JlYXRlIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWwgZXBvbnltb3VzIGxpbmtlZCBmZWF0dXJlICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdKSB7XG5cdFx0XHRcdGxldCBhcHBDb25kO1xuXHRcdFx0XHRpZiAoZmVhdHVyZSkgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cblx0XHRcdFx0ZWxzZSAgICAgICAgIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggYGRlbHRhX18ke25hbWV9YCwgZXh0ZW5kKHsgaGlkZGVuOiB0cnVlIH0sIG9wdGlvbnMpICkgfVxuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0XHRvcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IGZlYXR1cmU6IGZhbHNlIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLnNlbGVjdHMob3B0aW9uc1sncmVxdWlyZXMnXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGZlYXR1cmUgfHwgYXBwQ29uZC5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRcdGRlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gYXBwQ29uZDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSA9IGFwcENvbmQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBuYW1lOiB1bmRlZmluZWQgfSk7XG5cdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgb3B0aW9ucyAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0pIHtcblx0XHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zW25hbWVdID0gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0LyogcmV0dXJuIHRoZSBkZWVwZXN0IGNyZWF0ZWQgcHJveHkgKi9cblx0XHRcdHJldHVybiBkZWVwZXN0UHJveHk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguY2xlYXIoKTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvKiBkZWx0YSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFx0dmFyIGRlbHRhID0gdGhpcy5jaGlsZERlbHRhKG5hbWUpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhKTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBvcmRlciAqL1xuXHRcdFx0XHRbIC4uLm9wdGlvbnNbJ3Jlc29sdmVzJ118fFtdLCAuLi5vcHRpb25zWydhZnRlciddfHxbXSwgLi4ub3B0aW9uc1sncmVxdWlyZXMnXXx8W10gXS5mb3JFYWNoKChzdWJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmNyZWF0ZUVkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5ncmFwaC5oYXNDeWNsZSgpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEFwcGxpY2F0aW9uT3JkZXJDeWNsZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlIHx8IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsXG5cdCksIHRydWUpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGEsIGFzc2VydCwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignZmVhdHVyZXMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnZmVhdHVyZXMnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0ZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRcdGFzc2VydChpc1VuZGVmaW5lZCh0aGlzLmZlYXR1cmVzW25hbWVdKSxcblx0XHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdFx0cmV0dXJuIHRoaXMuZmVhdHVyZXNbbmFtZV0gPSBuZXcgdGhpcy5GZWF0dXJlKG5hbWUsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdGEoX2lmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoZGlzanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFNlbGVjdHMoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0dmFyIF9vbmx5SWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgY29uanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChjb25qdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRhKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZE9ubHlJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHNldHRsaW5nIHJlbGF0aW9ucyBiZXR3ZWVuIGZlYXR1cmVzICovXG5cdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRpZiAoIV9jb25kaXRpb25zVW5zZXR0bGVkKSB7IHJldHVybiB9XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0ZG8ge1xuXHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRpZiAoaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IGNsYXNzIEZlYXR1cmUge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH1cblx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICB9XG5cdFx0Z2V0IGNvbmRpdGlvbmFsKCkgeyByZXR1cm4gYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfVxuXHRcdGdldCByZXN0cmljdGVkKCkgIHsgcmV0dXJuIGEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH1cblx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHR9O1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhTW9kZWwgZnJvbSAnLi9EZWx0YU1vZGVsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCd2YXJpYXRpb24gcG9pbnRzJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ3ZhcmlhdGlvbiBwb2ludHMnLCAoKSA9PiB7XG5cblx0XHRkZWZpbmVfRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHRcdCAqL1xuXHRcdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0XHR0aGlzLl9kZWx0YU1vZGVsUHJveHkuZGVsdGEoKS5hcHBseVRvKHJvb3QsIHtcblx0XHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgcHJveHkgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIHByb3h5IHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbFByb3h5LmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5fZGVsdGFNb2RlbFByb3h5ID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpLmRvKCk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YXJpYXRpb25Qb2ludHMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdhcHBsaWNhdGlvbiBjb25kaXRpb25zJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRleHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdHNldCBhcHBsaWNhdGlvbkNvbmRpdGlvbihhYykgeyB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFjIH0sXG5cdFx0Z2V0IHNlbGVjdGVkKCkgeyByZXR1cm4gaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZCB9XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGEsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcbmltcG9ydCB7TXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3J9ICAgICAgZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignQ29udGFpbmVyUHJveHknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX1Byb3h5KGRlbHRhSnMpO1xuXG5cblx0LyogYSBQcm94eSBjbGFzcyBmb3IgY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyBsaWtlIE1vZGlmeSBhbmQgRGVsdGFNb2RlbCAqL1xuXHRkZWx0YUpzLkNvbnRhaW5lclByb3h5ID0gY2xhc3MgQ29udGFpbmVyUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHtcblxuXHRcdC8vIEEgUHJveHkgaW5zdGFuY2UgZXhwb3NlcyBvcGVyYXRpb24gbWV0aG9kcyBkaXJlY3RseS4gQXJndW1lbnRzXG5cdFx0Ly8gdG8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gYmUgcHJlLXN1cHBsaWVkIHRocm91Z2ggdGhlIGBkb2AgbWV0aG9kLlxuXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRcdHRoaXMuX2RvQXJncyAgICAgICA9IFtdO1xuXHRcdFx0dGhpcy5fb3JpZ2luYWwgICAgID0gdGhpcztcblx0XHRcdHRoaXMuX2NoaWxkcmVuICAgICA9IHt9OyAvLyBrZXkgLT4gW3Byb3hpZXNdXG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnNcblx0XHR9XG5cblxuXHRcdGRlYWN0aXZhdGUoKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY2hpbGRQcm94eShrZXkpLmRlYWN0aXZhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0c3VwZXIuZGVhY3RpdmF0ZSgpO1xuXHRcdH1cblxuXG5cdFx0YWRkQ2hpbGRQcm94eShrZXksIGRlbHRhKSB7XG5cdFx0XHQvKiBnZXQgdGhlIGN1cnJlbnQgcHJveHkgZm9yIHRoZSBnaXZlbiBrZXkgKi9cblx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5jaGlsZFByb3h5KGtleSk7XG5cblx0XHRcdC8qIGdldCAvIGNyZWF0ZSBkZWx0YSBwcm94eSAqL1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSBkZWx0YS5jb25zdHJ1Y3Rvci5Qcm94eSB8fCBkZWx0YUpzLlByb3h5O1xuXHRcdFx0dmFyIHByb3h5ID0gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YSwgcGFyZW50OiB0aGlzIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGN1cnJlbnQgcHJveHkgaWYgaXQsIGFuZCB0aGUgY3VycmVudCBwcm94eSwgYXJlIGJvdGggTW9kaWZ5LlByb3h5ICovXG5cdFx0XHRpZiAoY3VycmVudCBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5ICYmXG5cdFx0XHRcdHByb3h5ICAgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSkgeyByZXR1cm4gY3VycmVudCB9XG5cblx0XHRcdC8qIHdlIG5lZWQgYSBuZXcgcHJveHksIHNvIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgb25lICovXG5cdFx0XHRpZiAoY3VycmVudCkgeyBjdXJyZW50LmRlYWN0aXZhdGUoKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBhIG5ldyBQcm94eSBvZiB0aGUgcmlnaHQgY2xhc3MsIHJlbWVtYmVyIGl0IGFuZCByZXR1cm4gaXQgKi9cblx0XHRcdHRoaXMuX2NoaWxkcmVuW2tleV0ucHVzaChwcm94eSk7XG5cdFx0XHRyZXR1cm4gcHJveHk7XG5cdFx0fVxuXG5cblx0XHRjaGlsZEtleXMoKSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikgfVxuXG5cblx0XHRjaGlsZFByb3hpZXMoa2V5KSB7IHJldHVybiBhKHRoaXMuX2NoaWxkcmVuLCBrZXkpIH1cblxuXG5cdFx0Y2hpbGRQcm94eShrZXkpIHsgcmV0dXJuIGEodGhpcy5fY2hpbGRyZW4sIGtleSlbdGhpcy5fY2hpbGRyZW5ba2V5XS5sZW5ndGgtMV0gfVxuXG5cblx0XHRjaGlsZERlbHRhKGtleSkge1xuXHRcdFx0cmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQoXG5cdFx0XHRcdC4uLnRoaXMuY2hpbGRQcm94aWVzKGtleSkubWFwKHByb3h5ID0+IHByb3h5LmRlbHRhKCkpXG5cdFx0XHQpO1xuXHRcdH1cblxuXG5cdFx0ZG8oLi4uZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiByZXR1cm4gYSB2ZXJzaW9uIG9mIHRoaXMgUHJveHkgd2l0aCBleHRyYSBwcmVsb2FkZWQgYXJncyAqL1xuXHRcdFx0Ly8gbm90ZSB0aGF0IHRoaXMgbWl4ZXMgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlXG5cdFx0XHQvLyBpbnRvIHRoZSBleGlzdGluZyBjbGFzc2ljYWwgaW5oZXJpdGFuY2Ugc2NoZW1lXG5cdFx0XHR2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcblx0XHRcdHJlc3VsdC5fZG9BcmdzICAgPSBbLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3NdO1xuXHRcdFx0cmVzdWx0Ll9vcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0X2RvKG1ldGhvZCwgZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiBjb250YWluZXItc3BlY2lmaWMgcHJvY2Vzc2luZyBvZiBhcmd1bWVudHMgKi9cblx0XHRcdHZhciB7b3B0aW9ucywgYXJnc30gPSB0aGlzLnByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi50aGlzLl9kb0FyZ3MsIC4uLmRvQXJncyk7XG5cblx0XHRcdC8qIGlmIHRoZSBvcHRpb25zIGNvbnRhaW4gYSBwYXRoLCByZWlmeSBpdCAqL1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLnBhdGggPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdG9wdGlvbnMucGF0aCA9IG5ldyBQYXRoKG9wdGlvbnMucGF0aCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRoZSBhcmd1bWVudCBsaXN0IGlzIGZpbmlzaGVkOyBjcmVhdGUgYSBuZXcgZGVsdGEgYW5kIHB1dCBpdCBpbiB0aGUgcmlnaHQgcGxhY2UgKi9cblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKTtcblx0XHRcdHZhciBwcm94eSA9IHRoaXMuYWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSByaWdodCBQcm94eSBpbnN0YW5jZSBmb3IgY2hhaW5pbmcgKi9cblx0XHRcdHJldHVybiAocHJveHkgaW5zdGFuY2VvZiBkZWx0YUpzLkNvbnRhaW5lclByb3h5KSA/IHByb3h5IDogdGhpcztcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGV4dHJhY3QgYW5cblx0XHQgKiBvcHRpb25zIG9iamVjdCwgcGF0aCBhbmQgZmluYWwgYXJndW1lbnQgbGlzdCBmcm9tIGEgZ2l2ZW4gJ3JhdycgYXJndW1lbnQgbGlzdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19XG5cdFx0ICogQHJldHVybiB7e29wdGlvbnM6IE9iamVjdCwgYXJnczogWypdfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdwcm9jZXNzUHJveHlBcmd1bWVudHMnIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBhZGQgYSBnaXZlbiBkZWx0YVxuXHRcdCAqIHVuZGVyIGEgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLCBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIFByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ2FkZE9wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBDcmVhdGUgYSBkZWx0YSBiYXNlZCBvbiBhIG1ldGhvZC1uYW1lIGFuZCBhcmd1bWVudC1saXN0LlxuXHRcdCAqIElmIHRoZSBtZXRob2QtbmFtZSBpcyBvdmVybG9hZGVkLCB5b3UnbGwgYXV0b21hdGljYWxseSBnZXRcblx0XHQgKiBhbiBgRGVsdGEuT3ZlcmxvYWRlZGAgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFyZ3MgICB7WypdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0c3RhdGljIF9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX21ldGhvZEhhbmRsZXJzW21ldGhvZF0ubWFwKGhhbmRsZXIgPT4gaGFuZGxlciguLi5hcmdzKSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0ZGVmaW5lX092ZXJsb2FkZWQoZGVsdGFKcyk7XG5cdFx0XHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKG5ld0RlbHRhcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdFx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKSB7XG5cblx0XHRcdC8qIGF1dG9tYXRpY2FsbHkgcG9wdWxhdGUgdGhlIFByb3h5IGNsYXNzIHdpdGggbmV3IG9wZXJhdGlvbiBtZXRob2QgKi9cblx0XHRcdGlmIChpc1VuZGVmaW5lZChkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdKSkge1xuXHRcdFx0XHRkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZG8obWV0aG9kLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyogcmVnaXN0ZXIgaGFuZGxlcnMgZm9yIGVhY2ggbWV0aG9kICovXG5cdFx0XHRhKGRlbHRhSnMuQ29udGFpbmVyUHJveHksICdfbWV0aG9kSGFuZGxlcnMnLCBtZXRob2QpLnB1c2goaGFuZGxlcik7XG5cblx0XHR9XG5cblxuXHR9O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ29udGFpbmVyUHJveHkuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdQcm94eScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLlByb3h5ID0gY2xhc3MgUHJveHkge1xuXHRcdGNvbnN0cnVjdG9yKHtwYXJlbnQsIGRlbHRhfSA9IHt9KSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5fZGVsdGEgPSBkZWx0YTtcblx0XHR9XG5cdFx0ZGVsdGEoKSB7IHJldHVybiB0aGlzLl9kZWx0YTsgfVxuXHRcdGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmUgfVxuXHRcdGRlYWN0aXZhdGUoKSB7IHRoaXMuX2FjdGl2ZSA9IGZhbHNlIH1cblx0fTtcblxuXG5cdGV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBhcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IHRoaXMuY29uc3RydWN0b3IuUHJveHk7XG5cdFx0XHRpZiAoIVByb3h5Q2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nICdkbycgb24gZGVsdGEgdHlwZSAnJHt0aGlzLnR5cGV9Jywgd2hpY2ggaGFzIG5vIFByb3h5IGludGVyZmFjZS5gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJveHlDbGFzcyh7IGRlbHRhOiB0aGlzIH0pLmRvKC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1Byb3h5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==