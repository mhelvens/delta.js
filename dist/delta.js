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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1ODBhMzBhM2RhZmUwNDMzYTJiZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3h5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtB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QUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFNLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU07T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxLQUFLLENBQUssRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUs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U0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQU8sY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFVLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQU8sRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQW1DLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRTtHQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFPLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFB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QUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLEVBQUU7QUFDaEIsV0FBTSxJQUFJLEtBQUssa0NBQWdDLElBQUksQ0FBQyxJQUFJLHNDQUFtQyxDQUFDO0tBQzVGO0FBQ0QsV0FBTyxZQUFJLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFHLE9BQUksSUFBSSxDQUFDLENBQUM7SUFDbkQ7O0dBRUQsQ0FBQyxDQUFDO0VBR0gsQ0FBQyxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU4MGEzMGEzZGFmZTA0MzNhMmJkXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCIvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG4vKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG4vKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvYmoxO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdHZhciBsYXN0ID0gbyhvYmplY3QsIC4uLmtleXMuc2xpY2UoMCwgLTEpKTtcblx0aWYgKGlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0fVxuXHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbyhvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIGRmYXVsdChvYmplY3QsIC4uLmtleXMsIHt9KSB9XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfVxuXG5cbi8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cbn1cblxuXG4vKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KG5yLCBzdHIpIHtcblx0cmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cik7XG59XG5cblxuLyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCByZXBlYXQoYW1vdW50LCBjaGFyKSk7XG59XG5cblxuLyogcnVuIGEgZnVuY3Rpb24gb25seSBvbmNlIHBlciBvYmorc3RyaW5nIGNvbWJvICovXG5leHBvcnQgZnVuY3Rpb24gb25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0dmFyIG9wZm4gPSAob2JqKSA9PiB7XG5cdFx0dmFyIHAgPSBgX29uY2UgcGVyOiAke2tleX1gO1xuXHRcdGlmIChvYmpbcF0pIHsgcmV0dXJuIH1cblx0XHRvYmpbcF0gPSB0cnVlOyAvLyBUT0RPOiBtYWtlIG5vbi1lbnVtZXJhdGFibGUsIG9yIHVzZSBFUzYgU3ltYm9sXG5cdFx0cmV0dXJuIGZuLmNhbGwob2JqLCBvYmopO1xuXHR9O1xuXHRpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcblx0XHRba2V5LCBmbl0gPSBbb2JqLCBrZXldO1xuXHRcdHJldHVybiBvcGZuO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcGZuKG9iaik7XG5cdH1cbn1cblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBwcmVjb25kaXRpb25zICovXG5leHBvcnQgdmFyIHQgPSAodHlwZTEsIHR5cGUyKSA9PiB7XG5cdHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpO1xufTtcblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBpbXBsZW1lbnRhdGlvbnMgKi9cbmV4cG9ydCB2YXIgZGVmaW5lX2QgPSAoZGVsdGFKcykgPT4gKHR5cGUsIGZuKSA9PiB7XG5cdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG59O1xuXG5cblxuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhc3NlcnQsIGlzVW5kZWZpbmVkfSAgICAgICAgICAgIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQgZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9QdXRJbnRvQXJyYXkgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZV9QdXRJbnRvRnVuY3Rpb24gICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YU1vZGVsICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVfZmVhdHVyZXMgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZV92YXJpYXRpb25Qb2ludHMgICAgICAgICAgICAgICAgICAgZnJvbSAnLi92YXJpYXRpb25Qb2ludHMuanMnO1xuaW1wb3J0IGRlZmluZV9hcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgICAgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3N9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50c1xuICogYW5kIGFjdHMgYXMgYSBmYWNhZGUgKGFzIGluIGRlc2lnbiBwYXR0ZXJuKSB0byB0aGUgbW9yZSBzcGVjaWZpY1xuICogc3Vic3lzdGVtcyBvZiBkZWx0YS5qcy5cbiAqXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgRGVsdGFKcyBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhSnMge1xuXG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9QdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX1B1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9mZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX3ZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfYXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAgIHtzdHJpbmd9ICAgLSBuYW1lIG9mIHRoZSBuZXcgb3BlcmF0aW9uIHR5cGVcblx0ICogQHBhcmFtIERlbHRhQ2xhc3Mge0Z1bmN0aW9ufSAtIHRoZSBuZXcgb3BlcmF0aW9uIGNsYXNzXG5cdCAqIEBwYXJhbSBQcm94eUNsYXNzIHs/RnVuY3Rpb259IC0gdGhlIG9wdGlvbmFsIGN1c3RvbSBQcm94eSBzdWJjbGFzcyBmb3IgdGhpcyBvcGVyYXRpb24tdHlwZVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBEZWx0YUNsYXNzLCBQcm94eUNsYXNzKSB7XG5cdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdGFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9uIGNsYXNzZXMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0YXNzZXJ0KGlzVW5kZWZpbmVkKHRoaXMuRGVsdGFbbmFtZV0pLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBzdG9yZSB0aGUgb3BlcmF0aW9uIGNsYXNzICovXG5cdFx0dGhpcy5EZWx0YVtuYW1lXSA9IERlbHRhQ2xhc3M7XG5cblx0XHQvKiBzZXQgdGhlIChvcHRpb25hbCkgUHJveHkgY2xhc3MgKi9cblx0XHREZWx0YUNsYXNzLlByb3h5ID0gUHJveHlDbGFzcztcblxuXHRcdC8qIGZldGNoIHRoZSBnaXZlbiBhcHBseVRvIGZ1bmN0aW9uIChpZiBhbnkpIHdoaWNoIHdpbGwgYmUgc2xpZ2h0bHkgbW9kaWZpZWQgKi9cblx0XHR2YXIgZ2l2ZW5BcHBseVRvID0gRGVsdGFDbGFzcy5wcm90b3R5cGUuYXBwbHlUbyB8fCAoKCk9Pnt9KTtcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdGV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChEZWx0YUNsYXNzLnByb3RvdHlwZS5tZXRob2RzIHx8IFtsb3dlcmNhc2VOYW1lXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBEZWx0YUNsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIERlbHRhQ2xhc3M7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcik7XG5cdH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgY2xhc3MgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSkgeyB0aGlzLl92YWwgPSB2YWx1ZSB9XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH1cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH1cblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdyaXRhYmxlVGFyZ2V0IGV4dGVuZHMgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3RvcihvYmosIHByb3ApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX29iaiA9IG9iajtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0fVxuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9XG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUsIHthc3NlcnQsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcblxuXHRjb25zdHJ1Y3RvcihzdHIgPSBcIlwiKSB7XG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0dmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFsuI10/KShcXHcqfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRhc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0XHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fVxuXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9XG5cblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblxuXHR0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxufVxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYDtcblx0XHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlIGRlbHRhLXR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdFx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdFx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIENvbXBvc2l0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YTEsIGRlbHRhMik7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnRGYWlsdXJlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihmZWF0dXJlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0XHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25PcmRlckN5Y2xlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHRcdHRoaXMuZnJvbSA9IGZyb207XG5cdFx0dGhpcy50byAgID0gdG87XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0IGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YXMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdVbnJlc29sdmVkRGVsdGFDb25mbGljdCc7XG5cdFx0dmFyIGRlbHRhTmFtZXMgPSBkZWx0YXMubWFwKGQgPT4gYCcke2QubmFtZX0nYCkuam9pbignLCcpO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBpcyBhbiB1bnJlc29sdmVkIGNvbmZsaWN0IGJldHdlZW4gZGVsdGFzICR7ZGVsdGFOYW1lc30uYDtcblx0XHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgUHJveHkgcGVyIHBhdGggY2FuIGJlIGFjdGl2ZSBhdCBhbnkgZ2l2ZW4gdGltZS5gO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBvbmNlUGVyfSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVfQ29tcG9zZWQgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Db21wb3NlZC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignRGVsdGEnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdFx0dGhpcy5EZWx0YS5uZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5EZWx0YSA9IGNsYXNzIERlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHRoaXMuaWQgPSArK2RlbHRhSnMuRGVsdGEuX25leHRJRDtcblx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0fVxuXG5cdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZykgfVxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdFx0ICovXG5cdFx0ZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wcmVjb25kaXRpb24pIHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpcy5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZCh0aGlzLCBvdGhlcikgfVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAob3B0aW9ucy50YXJnZXRQcm9wKSAgIHsgc3RyICs9IGAg4oC5JHtvcHRpb25zLnRhcmdldFByb3B94oC6YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHsgc3RyICs9IGA6ICR7dGhpcy5hcmdzLm1hcCgoYSkgPT4gSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJywnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7Qm9vbGVhbnwoKERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGEpfSAtIGZhbHNlLCBvciBhIHNpZGUtZWZmZWN0IGZyZWUgZnVuY3Rpb25cblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YXMge1tEZWx0YUpzI0RlbHRhXX0gLSB0aGUgZGVsdGFzIHRvIGNvbXBvc2Vcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBjb21wb3NlZCguLi5kZWx0YXMpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cdFx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGQxID0gcmVzdWx0LFxuXHRcdFx0XHQgICAgZDIgPSBkZWx0YSB8fCBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IERlbHRhLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogdGhyb3cgYW4gZXJyb3IgaWYgJ2ZhbHNlJyB3YXMgZm91bmQgcmF0aGVyIHRoYW4gYSBmdW5jdGlvbiovXG5cdFx0XHRcdGlmIChjb21wb3NlRm4gPT09IGZhbHNlIHx8ICFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHRcdC8qICBpZiBubyBjb21wb3NpdGlvbiBmdW5jdGlvbiBpcyBmb3VuZCwgdXNlIGEgbGluZWFyIGRlbHRhIG1vZGVsICAqL1xuXHRcdFx0XHQvKiAgdG8gJ25haXZlbHknIGhhdmUgb25lIGRlbHRhIGFwcGx5IGFmdGVyIGFub3RoZXIgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNvbXBvc2VGbiA9IChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkKFtkMSwgZDJdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRcdFx0cmVzdWx0ID0gY29tcG9zZUZuKGQxLCBkMik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH07XG5cdGRlbHRhSnMuRGVsdGEuX25leHRJRCA9IDA7XG5cdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cblxuXHQvKiBkZWZpbmUgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCBmb3IgdXNlIGluIGNvbXBvc2l0aW9ucyAqL1xuXHRkZWZpbmVfQ29tcG9zZWQoZGVsdGFKcyk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YV9jbGFzcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IGRlZmluZV9EZWx0YSBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBVLCB7aW5kZW50LCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignT3ZlcmxvYWRlZCcsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ092ZXJsb2FkZWQnLCBjbGFzcyBPdmVybG9hZGVkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMub3ZlcmxvYWRzID0gdGhpcy5hcmcgfHwgW107XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGluZGVudCwgdCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICBmcm9tICcuL0NvbnRhaW5lclByb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdNb2RpZnknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0NvbnRhaW5lclByb3h5KGRlbHRhSnMpO1xuXG5cblx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdNb2RpZnknLCBjbGFzcyBNb2RpZnkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdGV4dGVuZCh0aGlzLnN1YkRlbHRhcywgdGhpcy5hcmcgfHwge30pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuc3ViRGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJEZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHRcdFx0XHRleHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0XG5cdFx0XHRcdFx0XHQua2V5cyh0aGlzLnN1YkRlbHRhcylcblx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuc3ViRGVsdGFzW3BdLnRvU3RyaW5nKGV4dGVuZCh7fSwgb3B0aW9ucywgeyB0YXJnZXRQcm9wOiBwIH0pKSlcblx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHR9LCBjbGFzcyBNb2RpZnlQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBhbiBvcHRpb24gZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5Qcm94eSBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7IG9wdGlvbnMucGF0aCA9IGFyZyAgICAgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIHsgZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHt7cGF0aDogUGF0aH19XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX0gLSB0aGUgZGVlcGVzdCBwcm94eSBjcmVhdGVkIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRofSA9IG9wdGlvbnM7XG5cdFx0XHRpZiAoIXBhdGgucHJvcCkgeyB0aHJvdyBuZXcgRXJyb3IoJ09wZXJhdGlvbnMgb24gYSBNb2RpZnkuUHJveHkgbmVlZCB0byBoYXZlIGEgbm9uLWVtcHR5IHBhdGguJykgfVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogcGF0aC5yZXN0IH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOT1RFOiBNb2RpZnkgb3BlcmF0aW9ucyBkbyBub3QgKHlldCkgdXNlIGFueSBvcHRpb25zXG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLmNoaWxkRGVsdGEocHJvcCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gZGVsdGFKcy5EZWx0YS5jb21wb3NlZChyZXN1bHQuc3ViRGVsdGFzW3Byb3BdLCBkMi5zdWJEZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTW9kaWZ5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignYmFzaWMgb3BlcmF0aW9ucycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEgKGRlbHRhSnMpO1xuXHRkZWZpbmVfTW9kaWZ5KGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJywgY2xhc3MgTm9PcCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge30pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0FkZCcsIGNsYXNzIEFkZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywgY2xhc3MgUmVtb3ZlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIGNsYXNzIEZvcmJpZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIGlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZXBsYWNlJywgY2xhc3MgUmVwbGFjZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1VwZGF0ZScsIGNsYXNzIFVwZGF0ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdOb09wJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cblx0LyogdXRpbGl0eSBmdW5jdGlvbiBkICovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnTW9kaWZ5JyksIGQoJ0FkZCcsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ0FkZCcgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdBZGQnICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdNb2RpZnknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnUmVtb3ZlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnRm9yYmlkJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ0ZvcmJpZCcpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnTW9kaWZ5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdSZW1vdmUnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAsICdSZXBsYWNlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgLCAnUmVwbGFjZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdBZGQnICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ0ZvcmJpZCcgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdVcGRhdGUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdVcGRhdGUnICksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdVcGRhdGUnICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnTW9kaWZ5JyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ0FkZCcgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnRm9yYmlkJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdVcGRhdGUnICksIGQoJ1VwZGF0ZScsICAoe3AxLCBwMn0pID0+IHYgPT4gcDIocDEodikpKSAgICk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVLCB7aXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ1B1dEludG9BcnJheScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgKGRlbHRhSnMpO1xuXHRkZWZpbmVfYmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXHRkZWZpbmVfUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCBjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IG1ldGhvZHMoKSB7IHJldHVybiBbXSB9XG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAgICAgICwgJ1B1dEludG9BcnJheScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgLCAnUHV0SW50b0FycmF5JyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAgICAgICwgJ1B1dEludG9BcnJheScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgLCAnUHV0SW50b0FycmF5JyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ01vZGlmeScgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnQWRkJyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdSZW1vdmUnICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0ZvcmJpZCcgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVwbGFjZScgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdVcGRhdGUnICAgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1B1dEludG9BcnJheScpLCAoZDEsIGQyKSA9PlxuXHRcdG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheShbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9CYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0Z1bmN0aW9uJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9CYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywgY2xhc3MgUHV0SW50b0Z1bmN0aW9uIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMuYXJnID8gKEFycmF5LmlzQXJyYXkodGhpcy5hcmcpID8gdGhpcy5hcmcgOiBbdGhpcy5hcmddKSA6IFtdO1xuXHRcdH1cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFsuLi50aGlzLnZhbHVlc107XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHQoaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgZCA9IGRlZmluZV9kKGRlbHRhSnMpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnTW9kaWZ5JyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdBZGQnICAgICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnRm9yYmlkJyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1VwZGF0ZScgICAgICAgICApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+XG5cdFx0bmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKFsuLi5kMS52YWx1ZXMsIC4uLmQyLnZhbHVlc10pKTtcblxuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaXNEZWZpbmVkLCBpbmRlbnQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgICAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gICAgICAgICAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ0RlbHRhTW9kZWwnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0NvbnRhaW5lclByb3h5KGRlbHRhSnMpO1xuXG5cblx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdEZWx0YU1vZGVsJywgY2xhc3MgRGVsdGFNb2RlbCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9XG5cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0sIGNsYXNzIERlbHRhTW9kZWxQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgICAgICAgICAgICAgICAvLyBrZXkgLT4gb3B0aW9uc1xuXHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnMgPSB7fTsgLy8ga2V5IC0+IGFwcGxpY2F0aW9uLWNvbmRpdGlvblxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBuYW1lLCAuLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBuYW1lIGFuZC9vciBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBvcHRpb25zIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuRGVsdGFNb2RlbCBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm5hbWUpIHsgb3B0aW9ucy5uYW1lID0gYXJnICAgfVxuXHRcdFx0XHRcdGVsc2UgICAgICAgICAgICAgICB7IG9wdGlvbnMucGF0aCA9IGFyZyAgIH1cblx0XHRcdFx0fSBlbHNlICAgICAgICAgICAgICAgICB7IGV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGggfHwgIW9wdGlvbnMubmFtZSk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHt7cGF0aDogUGF0aCwgbmFtZTogc3RyaW5nLCBmZWF0dXJlOiBib29sZWFufX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRoLCBuYW1lLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIGNyZWF0ZSBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsIGVwb255bW91cyBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHRsZXQgYXBwQ29uZDtcblx0XHRcdFx0aWYgKGZlYXR1cmUpIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBleHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgZmVhdHVyZTogZmFsc2UgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zWydyZXF1aXJlcyddKSkge1xuXHRcdFx0XHRcdGFwcENvbmQuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZmVhdHVyZSB8fCBhcHBDb25kLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSBhcHBDb25kO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdID0gYXBwQ29uZDtcblx0XHRcdH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IG5hbWU6IHVuZGVmaW5lZCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSBvcHRpb25zICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0gPSBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5jbGVhcigpO1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGxldCBvcHRpb25zID0gdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8qIGRlbHRhIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzLmNoaWxkRGVsdGEobmFtZSk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGEpO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIG9yZGVyICovXG5cdFx0XHRcdFsgLi4ub3B0aW9uc1sncmVzb2x2ZXMnXXx8W10sIC4uLm9wdGlvbnNbJ2FmdGVyJ118fFtdLCAuLi5vcHRpb25zWydyZXF1aXJlcyddfHxbXSBdLmZvckVhY2goKHN1Yk5hbWUpID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguY3JlYXRlRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gY29uZGl0aW9uICovXG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0uY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWxcblx0KSwgdHJ1ZSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYSwgYXNzZXJ0LCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdmZWF0dXJlcycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG5hbWUgICAge3N0cmluZ30gIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqL1xuXHRcdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFx0YXNzZXJ0KGlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdFx0LyogY3JlYXRlIHRoZSBuZXcgZmVhdHVyZSAqL1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0YShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdGEoX29ubHlJZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGNvbmp1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRSZXF1aXJlZEJ5KGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRkbyB7XG5cdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIV9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdGlmIChpc1VuZGVmaW5lZChfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSkgeyBfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gY2xhc3MgRmVhdHVyZSB7XG5cdFx0Y29uc3RydWN0b3IobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdGlmIChfc2VsZWN0ZWRbdGhpcy5uYW1lXSAmJiAhX2FsbG93ZWRbdGhpcy5uYW1lXSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3NlbGVjdGVkW3RoaXMubmFtZV07XG5cdFx0fVxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgIH1cblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBhKF9pZiwgICAgIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9XG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gYShfb25seUlmLCB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfVxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH07XG5cblxuXHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdGNvbnN0IEZFQVRVUkVfQ09OTkVDVElPTlMgPSBbXG5cdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzLCBfYWRkT25seUlmXSAgICAgICAgICAgIF0sIC8vIG90aGVyIHNlbGVjdGVkIGJ5IHRoaXNcblx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAobmFtZSA9PT0gbikge1xuXHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdH07XG5cdH0pO1xuXG5cblx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGFNb2RlbCBmcm9tICcuL0RlbHRhTW9kZWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ3ZhcmlhdGlvbiBwb2ludHMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAndmFyaWF0aW9uIHBvaW50cycsICgpID0+IHtcblxuXHRcdGRlZmluZV9EZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdFx0ICovXG5cdFx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHRcdHRoaXMuX2RlbHRhTW9kZWxQcm94eS5kZWx0YSgpLmFwcGx5VG8ocm9vdCwge1xuXHRcdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCByZXR1cm5zIHRoZSBwcm94eSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHRcdCAqIG92ZXJ3cml0dGVuIG1hbnVhbGx5LlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX0gLSB0aGUgcHJveHkgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdFx0ICovXG5cdFx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsUHJveHkuZG8oeyBmZWF0dXJlOiB0cnVlIH0sIC4uLmFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsUHJveHkgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCkuZG8oKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnYXBwbGljYXRpb24gY29uZGl0aW9ucycsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmZWF0dXJlKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3QoLi4uZmVhdHVyZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdGV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblx0XHRnZXQgc2VsZWN0ZWQoKSB7IHJldHVybiBpc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkIH1cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYSwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuaW1wb3J0IHtNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdDb250YWluZXJQcm94eScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfUHJveHkoZGVsdGFKcyk7XG5cblxuXHQvKiBhIFByb3h5IGNsYXNzIGZvciBjb250YWluZXIgb3BlcmF0aW9uIHR5cGVzIGxpa2UgTW9kaWZ5IGFuZCBEZWx0YU1vZGVsICovXG5cdGRlbHRhSnMuQ29udGFpbmVyUHJveHkgPSBjbGFzcyBDb250YWluZXJQcm94eSBleHRlbmRzIGRlbHRhSnMuUHJveHkge1xuXG5cdFx0Ly8gQSBQcm94eSBpbnN0YW5jZSBleHBvc2VzIG9wZXJhdGlvbiBtZXRob2RzIGRpcmVjdGx5LiBBcmd1bWVudHNcblx0XHQvLyB0byB0aG9zZSBvcGVyYXRpb25zIGNhbiBiZSBwcmUtc3VwcGxpZWQgdGhyb3VnaCB0aGUgYGRvYCBtZXRob2QuXG5cblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblx0XHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdFx0dGhpcy5fZG9BcmdzICAgICAgID0gW107XG5cdFx0XHR0aGlzLl9vcmlnaW5hbCAgICAgPSB0aGlzO1xuXHRcdFx0dGhpcy5fY2hpbGRyZW4gICAgID0ge307IC8vIGtleSAtPiBbcHJveGllc11cblx0XHRcdHRoaXMuX2NoaWxkT3B0aW9ucyA9IHt9OyAvLyBrZXkgLT4gb3B0aW9uc1xuXHRcdH1cblxuXG5cdFx0ZGVhY3RpdmF0ZSgpIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jaGlsZFByb3h5KGtleSkuZGVhY3RpdmF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRzdXBlci5kZWFjdGl2YXRlKCk7XG5cdFx0fVxuXG5cblx0XHRhZGRDaGlsZFByb3h5KGtleSwgZGVsdGEpIHtcblx0XHRcdC8qIGdldCB0aGUgY3VycmVudCBwcm94eSBmb3IgdGhlIGdpdmVuIGtleSAqL1xuXHRcdFx0dmFyIGN1cnJlbnQgPSB0aGlzLmNoaWxkUHJveHkoa2V5KTtcblxuXHRcdFx0LyogZ2V0IC8gY3JlYXRlIGRlbHRhIHByb3h5ICovXG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IGRlbHRhLmNvbnN0cnVjdG9yLlByb3h5IHx8IGRlbHRhSnMuUHJveHk7XG5cdFx0XHR2YXIgcHJveHkgPSBuZXcgUHJveHlDbGFzcyh7IGRlbHRhLCBwYXJlbnQ6IHRoaXMgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY3VycmVudCBwcm94eSBpZiBpdCwgYW5kIHRoZSBjdXJyZW50IHByb3h5LCBhcmUgYm90aCBNb2RpZnkuUHJveHkgKi9cblx0XHRcdGlmIChjdXJyZW50IGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkgJiZcblx0XHRcdFx0cHJveHkgICBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5KSB7IHJldHVybiBjdXJyZW50IH1cblxuXHRcdFx0Lyogd2UgbmVlZCBhIG5ldyBwcm94eSwgc28gZGVhY3RpdmF0ZSB0aGUgY3VycmVudCBvbmUgKi9cblx0XHRcdGlmIChjdXJyZW50KSB7IGN1cnJlbnQuZGVhY3RpdmF0ZSgpIH1cblxuXHRcdFx0LyogY3JlYXRlIGEgbmV3IFByb3h5IG9mIHRoZSByaWdodCBjbGFzcywgcmVtZW1iZXIgaXQgYW5kIHJldHVybiBpdCAqL1xuXHRcdFx0dGhpcy5fY2hpbGRyZW5ba2V5XS5wdXNoKHByb3h5KTtcblx0XHRcdHJldHVybiBwcm94eTtcblx0XHR9XG5cblxuXHRcdGNoaWxkS2V5cygpIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKSB9XG5cblxuXHRcdGNoaWxkUHJveGllcyhrZXkpIHsgcmV0dXJuIGEodGhpcy5fY2hpbGRyZW4sIGtleSkgfVxuXG5cblx0XHRjaGlsZFByb3h5KGtleSkgeyByZXR1cm4gYSh0aGlzLl9jaGlsZHJlbiwga2V5KVt0aGlzLl9jaGlsZHJlbltrZXldLmxlbmd0aC0xXSB9XG5cblxuXHRcdGNoaWxkRGVsdGEoa2V5KSB7XG5cdFx0XHRyZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZChcblx0XHRcdFx0Li4udGhpcy5jaGlsZFByb3hpZXMoa2V5KS5tYXAocHJveHkgPT4gcHJveHkuZGVsdGEoKSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cblx0XHRkbyguLi5kb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIHJldHVybiBhIHZlcnNpb24gb2YgdGhpcyBQcm94eSB3aXRoIGV4dHJhIHByZWxvYWRlZCBhcmdzICovXG5cdFx0XHQvLyBub3RlIHRoYXQgdGhpcyBtaXhlcyBwcm90b3R5cGljYWwgaW5oZXJpdGFuY2Vcblx0XHRcdC8vIGludG8gdGhlIGV4aXN0aW5nIGNsYXNzaWNhbCBpbmhlcml0YW5jZSBzY2hlbWVcblx0XHRcdHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuXHRcdFx0cmVzdWx0Ll9kb0FyZ3MgICA9IFsuLi50aGlzLl9kb0FyZ3MsIC4uLmRvQXJnc107XG5cdFx0XHRyZXN1bHQuX29yaWdpbmFsID0gdGhpcy5fb3JpZ2luYWw7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRfZG8obWV0aG9kLCBkb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIGNvbnRhaW5lci1zcGVjaWZpYyBwcm9jZXNzaW5nIG9mIGFyZ3VtZW50cyAqL1xuXHRcdFx0dmFyIHtvcHRpb25zLCBhcmdzfSA9IHRoaXMucHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzKTtcblxuXHRcdFx0LyogaWYgdGhlIG9wdGlvbnMgY29udGFpbiBhIHBhdGgsIHJlaWZ5IGl0ICovXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMucGF0aCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0b3B0aW9ucy5wYXRoID0gbmV3IFBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGhlIGFyZ3VtZW50IGxpc3QgaXMgZmluaXNoZWQ7IGNyZWF0ZSBhIG5ldyBkZWx0YSBhbmQgcHV0IGl0IGluIHRoZSByaWdodCBwbGFjZSAqL1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpO1xuXHRcdFx0dmFyIHByb3h5ID0gdGhpcy5hZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJpZ2h0IFByb3h5IGluc3RhbmNlIGZvciBjaGFpbmluZyAqL1xuXHRcdFx0cmV0dXJuIChwcm94eSBpbnN0YW5jZW9mIGRlbHRhSnMuQ29udGFpbmVyUHJveHkpID8gcHJveHkgOiB0aGlzO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gZXh0cmFjdCBhblxuXHRcdCAqIG9wdGlvbnMgb2JqZWN0LCBwYXRoIGFuZCBmaW5hbCBhcmd1bWVudCBsaXN0IGZyb20gYSBnaXZlbiAncmF3JyBhcmd1bWVudCBsaXN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGFyZ3Mge1sqXX1cblx0XHQgKiBAcmV0dXJuIHt7b3B0aW9uczogT2JqZWN0LCBhcmdzOiBbKl19fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cygpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ3Byb2Nlc3NQcm94eUFyZ3VtZW50cycgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGFkZCBhIGdpdmVuIGRlbHRhXG5cdFx0ICogdW5kZXIgYSBnaXZlbiBwYXRoIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMsIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgUHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnYWRkT3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIENyZWF0ZSBhIGRlbHRhIGJhc2VkIG9uIGEgbWV0aG9kLW5hbWUgYW5kIGFyZ3VtZW50LWxpc3QuXG5cdFx0ICogSWYgdGhlIG1ldGhvZC1uYW1lIGlzIG92ZXJsb2FkZWQsIHlvdSdsbCBhdXRvbWF0aWNhbGx5IGdldFxuXHRcdCAqIGFuIGBEZWx0YS5PdmVybG9hZGVkYCBpbnN0YW5jZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXJncyAgIHtbKl19XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRzdGF0aWMgX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbWV0aG9kSGFuZGxlcnNbbWV0aG9kXS5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKC4uLmFyZ3MpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHRkZWZpbmVfT3ZlcmxvYWRlZChkZWx0YUpzKTtcblx0XHRcdFx0cmV0dXJuIG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQobmV3RGVsdGFzKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0XHQgKiBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIG1ldGhvZCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgbmV3IGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblxuXHRcdFx0LyogYXV0b21hdGljYWxseSBwb3B1bGF0ZSB0aGUgUHJveHkgY2xhc3Mgd2l0aCBuZXcgb3BlcmF0aW9uIG1ldGhvZCAqL1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0pKSB7XG5cdFx0XHRcdGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9kbyhtZXRob2QsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZWdpc3RlciBoYW5kbGVycyBmb3IgZWFjaCBtZXRob2QgKi9cblx0XHRcdGEoZGVsdGFKcy5Db250YWluZXJQcm94eSwgJ19tZXRob2RIYW5kbGVycycsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblxuXHRcdH1cblxuXG5cdH07XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Db250YWluZXJQcm94eS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpbmRlbnQsIG9uY2VQZXJ9ICAgICAgIGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignQ29tcG9zZWQnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0Ly8gTk9URTogTm90IGltcG9ydGluZyB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeSBkZWx0YUpzLkRlbHRhIGhlcmUuXG5cdC8vICAgICAgIFRoYXQgZmlsZSB3aWxsIGltcG9ydCB0aGlzIG9uZSBhdCB0aGUgcHJvcGVyIHRpbWUuXG5cblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0NvbXBvc2VkJywgY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5fY29tcG9uZW50cyA9IHRoaXMuYXJnIHx8IFtdO1xuXHRcdH1cblxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuX2NvbXBvbmVudHMgPSB0aGlzLl9jb21wb25lbnRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudHMpID0+IHtcblx0XHRcdFx0Y29tcG9uZW50cy5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuX2NvbXBvbmVudHMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYOKAoiAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoID09PSAwKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWzBdLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdH1cblxuXHRcdF9jb2xsYXBzZSgpIHtcblx0XHRcdC8qIGZsYXR0ZW4gQ29tcG9zZWQgdGhhdCBhcmUgaW5zaWRlIENvbXBvc2VkICovXG5cdFx0XHR0aGlzLl9jb21wb25lbnRzID0gKCgpID0+IHtcblx0XHRcdFx0bGV0IG5ld0NvbXBvbmVudHMgPSBbXTtcblx0XHRcdFx0dGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGlmIChkZWx0YSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLl9jb2xsYXBzZSgpO1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKC4uLmRlbHRhLl9jb21wb25lbnRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbmV3Q29tcG9uZW50cztcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIGNvbXBvc2UgbmVpZ2hib3VyaW5nIHBhaXJzIHdoZXJlIHBvc3NpYmxlICovXG5cdFx0XHRsZXQgY2hhbmdlZDtcblx0XHRcdGRvIHtcblx0XHRcdFx0Y2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9jb21wb25lbnRzID0gKCgpID0+IHtcblx0XHRcdFx0XHRsZXQgbmV3Q29tcG9uZW50cyA9IFtdO1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY29tcG9uZW50cy5sZW5ndGggLSAxOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdGxldCBjb21wb3NlZFBhaXIgPSB0aGlzLl9jb21wb25lbnRzW2ldLmNvbXBvc2VkV2l0aCh0aGlzLl9jb21wb25lbnRzW2krMV0pO1xuXHRcdFx0XHRcdFx0aWYgKGNvbXBvc2VkUGFpciBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQpIHtcblx0XHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKHRoaXMuX2NvbXBvbmVudHNbaV0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKGNvbXBvc2VkUGFpcik7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRpICs9IDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpID09PSB0aGlzLl9jb21wb25lbnRzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHRcdG5ld0NvbXBvbmVudHMucHVzaCh0aGlzLl9jb21wb25lbnRzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0NvbXBvbmVudHM7XG5cdFx0XHRcdH0pKCk7XG5cdFx0XHR9IHdoaWxlIChjaGFuZ2VkKTtcblx0XHR9XG5cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZFxuXHQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkID8gZDEuX2NvbXBvbmVudHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCA/IGQyLl9jb21wb25lbnRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQoWy4uLkQxLCAuLi5EMl0pO1xuXHRcdHJlc3VsdC5fY29sbGFwc2UoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbXBvc2VkLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHJveHknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhKGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5Qcm94eSA9IGNsYXNzIFByb3h5IHtcblx0XHRjb25zdHJ1Y3Rvcih7cGFyZW50LCBkZWx0YX0gPSB7fSkge1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RlbHRhID0gZGVsdGE7XG5cdFx0fVxuXHRcdGRlbHRhKCkgeyByZXR1cm4gdGhpcy5fZGVsdGE7IH1cblx0XHRnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlIH1cblx0XHRkZWFjdGl2YXRlKCkgeyB0aGlzLl9hY3RpdmUgPSBmYWxzZSB9XG5cdH07XG5cblxuXHRleHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gYXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yLlByb3h5O1xuXHRcdFx0aWYgKCFQcm94eUNsYXNzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyAnZG8nIG9uIGRlbHRhIHR5cGUgJyR7dGhpcy50eXBlfScsIHdoaWNoIGhhcyBubyBQcm94eSBpbnRlcmZhY2UuYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YTogdGhpcyB9KS5kbyguLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Qcm94eS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=