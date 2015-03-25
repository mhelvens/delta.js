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
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
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
	var t = function (type1, type2) {
		return function (d1, d2) {
			return d1.type === type1 && d2.type === type2;
		};
	};
	
	exports.t = t;
	/* shorthand specifier for composition implementations */
	var define_d = function (deltaJs) {
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
	exports.define_d = define_d;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
		_createClass(DeltaJs, {
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
				}
			},
			newProxyMethod: {
	
				/** {@public}{@method}
	    * @param method  {string}   - method name
	    * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	    */
	
				value: function newProxyMethod(method, handler) {
					this.ContainerProxy.newProxyMethod(method, handler);
				}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.wt = wt;
	exports.rt = rt;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var U = _interopRequire(__webpack_require__(1));
	
	var ReadableTarget = exports.ReadableTarget = (function () {
		function ReadableTarget(value) {
			_classCallCheck(this, ReadableTarget);
	
			this._val = value;
		}
	
		_createClass(ReadableTarget, {
			getValue: {
				value: function getValue() {
					return this._val;
				}
			},
			value: {
				get: function () {
					return this.getValue();
				},
				set: function (v) {
					this.setValue(v);
				}
			}
		});
	
		return ReadableTarget;
	})();
	
	var WritableTarget = exports.WritableTarget = (function (_ReadableTarget) {
		function WritableTarget(obj, prop) {
			_classCallCheck(this, WritableTarget);
	
			_get(Object.getPrototypeOf(WritableTarget.prototype), "constructor", this).call(this);
			this._obj = obj;
			this._prop = prop;
		}
	
		_inherits(WritableTarget, _ReadableTarget);
	
		_createClass(WritableTarget, {
			getValue: {
				value: function getValue() {
					return this._obj[this._prop];
				}
			},
			setValue: {
				value: function setValue(v) {
					this._obj[this._prop] = v;
				}
			},
			"delete": {
				value: function _delete() {
					delete this._obj[this._prop];
				}
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
		_createClass(Path, {
			set: {
				value: function set(other) {
					this._prop = other._prop;
					this._rest = other._rest;
				}
			},
			prop: {
				get: function () {
					return this._prop;
				}
			},
			rest: {
				get: function () {
					return this._rest;
				}
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
				}
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var ApplicationError = exports.ApplicationError = (function (_Error) {
		function ApplicationError(delta, value) {
			_classCallCheck(this, ApplicationError);
	
			_get(Object.getPrototypeOf(ApplicationError.prototype), "constructor", this).call(this);
			this.name = "ApplicationError";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		}
	
		_inherits(ApplicationError, _Error);
	
		return ApplicationError;
	})(Error);
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = (function (_ApplicationError) {
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
	
		_inherits(MultipleOverloadsApplicationError, _ApplicationError);
	
		return MultipleOverloadsApplicationError;
	})(ApplicationError);
	
	var NoOverloadsApplicationError = exports.NoOverloadsApplicationError = (function (_ApplicationError2) {
		function NoOverloadsApplicationError(delta, value) {
			_classCallCheck(this, NoOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(NoOverloadsApplicationError.prototype), "constructor", this).call(this, delta, value);
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		}
	
		_inherits(NoOverloadsApplicationError, _ApplicationError2);
	
		return NoOverloadsApplicationError;
	})(ApplicationError);
	
	var CompositionError = exports.CompositionError = (function (_Error2) {
		function CompositionError(delta1, delta2) {
			_classCallCheck(this, CompositionError);
	
			_get(Object.getPrototypeOf(CompositionError.prototype), "constructor", this).call(this);
			this.name = "CompositionError";
			this.message = "This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "'.";
			this.delta1 = delta1;
			this.delta2 = delta2;
		}
	
		_inherits(CompositionError, _Error2);
	
		return CompositionError;
	})(Error);
	
	var MultipleOverloadsCompositionError = exports.MultipleOverloadsCompositionError = (function (_CompositionError) {
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
	
		_inherits(MultipleOverloadsCompositionError, _CompositionError);
	
		return MultipleOverloadsCompositionError;
	})(CompositionError);
	
	var ConstraintFailure = exports.ConstraintFailure = (function (_Error3) {
		function ConstraintFailure(feature) {
			_classCallCheck(this, ConstraintFailure);
	
			_get(Object.getPrototypeOf(ConstraintFailure.prototype), "constructor", this).call(this);
			this.name = "ConstraintFailure";
			this.message = "The feature '" + feature.name + "' is both selected and excluded by its constraints.";
			this.feature = feature;
		}
	
		_inherits(ConstraintFailure, _Error3);
	
		return ConstraintFailure;
	})(Error);
	
	var ApplicationOrderCycle = exports.ApplicationOrderCycle = (function (_Error4) {
		function ApplicationOrderCycle(from, to) {
			_classCallCheck(this, ApplicationOrderCycle);
	
			_get(Object.getPrototypeOf(ApplicationOrderCycle.prototype), "constructor", this).call(this);
			this.name = "ApplicationOrderCycle";
			this.message = "The new application order between " + from + " and " + to + " created a cycle.";
			this.from = from;
			this.to = to;
		}
	
		_inherits(ApplicationOrderCycle, _Error4);
	
		return ApplicationOrderCycle;
	})(Error);
	
	var UnresolvedDeltaConflict = exports.UnresolvedDeltaConflict = (function (_Error5) {
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
	
		_inherits(UnresolvedDeltaConflict, _Error5);
	
		return UnresolvedDeltaConflict;
	})(Error);
	
	var MultipleActiveProxiesError = exports.MultipleActiveProxiesError = (function (_Error6) {
		function MultipleActiveProxiesError() {
			_classCallCheck(this, MultipleActiveProxiesError);
	
			_get(Object.getPrototypeOf(MultipleActiveProxiesError.prototype), "constructor", this).call(this);
			this.name = "MultipleActiveProxiesError";
			this.message = "Only one Proxy per path can be active at any given time.";
		}
	
		_inherits(MultipleActiveProxiesError, _Error6);
	
		return MultipleActiveProxiesError;
	})(Error);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Delta, {
				arg: {
					get: function () {
						return this.args[0];
					},
					set: function (v) {
						this.args[0] = v;
					}
				},
				clone: {
	
					/** {@public}{@abstract}{@method}{@nosideeffects}
	     * This method should be overwritten by subclasses to make a clone of 'this' delta.
	     * @return {DeltaJs#Delta} - a clone of this delta
	     */
	
					value: function clone() {
						return new this.constructor(this.arg);
					}
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
					}
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
					}
				},
				composedWith: {
	
					/** {@public}{@method}{@nosideeffects}
	     * @param other {DeltaJs#Delta} - the other delta to compose with
	     * @return {DeltaJs#Delta} - the composed delta
	     */
	
					value: function composedWith(other) {
						return deltaJs.Delta.composed(this, other);
					}
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
					}
				}
			}, {
				newComposition: {
	
					/** {@public}{@static}{@method}
	     * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	     * @param compose {Boolean|((DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta)} - false, or a side-effect free function
	     */
	
					value: function newComposition(precondition, compose) {
						deltaJs.Delta._compositions.push({ precondition: precondition, compose: compose });
					}
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
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Overloaded, {
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
					}
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
					}
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
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Modify, {
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
					}
				},
				precondition: {
	
					/** {@public}{@method}
	     * @param target {*}
	     */
	
					value: function precondition(target) {
						return target.value instanceof Object;
					}
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
					}
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
					}
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
	
			_createClass(ModifyProxy, {
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
					}
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
					}
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
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Add, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isUndefined(target.value);
					}
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg;
					}
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
	
			_createClass(Remove, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
					}
				},
				applyTo: {
					value: function applyTo(target) {
						target["delete"]();
					}
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
	
			_createClass(Forbid, {
				precondition: {
					value: function precondition(target) {
						return isUndefined(target.value);
					}
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
	
			_createClass(Replace, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
					}
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg;
					}
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
	
			_createClass(Update, {
				precondition: {
					value: function precondition(target) {
						return target instanceof WritableTarget && isDefined(target.value);
					}
				},
				applyTo: {
					value: function applyTo(target) {
						target.value = this.arg(target.value);
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(PutIntoArray, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoArray.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					}
				},
				precondition: {
					value: function precondition(target) {
						return isDefined(target.value) && Array.isArray(target.value);
					}
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
					}
				},
				methods: {
					get: function () {
						return [];
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(PutIntoFunction, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoFunction.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					}
				},
				precondition: {
					value: function precondition(target) {
						return isDefined(target.value) && typeof target.value === "function" && (isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
					}
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
					}
				},
				methods: {
					get: function () {
						return [];
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(DeltaModel, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(DeltaModel.prototype), "clone", this).call(this);
						result.graph = this.graph.clone();
						result.graph.eachVertex(function (id, delta) {
							result.graph.setVertex(id, delta.clone());
						});
						return result;
					}
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						this.graph.topologically(function (name, subDelta) {
							subDelta.applyTo(target, options);
						});
					}
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
				},
				conflicts: {
	
					/** {@public}{@method}
	     *
	     */
	
					value: function conflicts() {
						/* clone the graph */
						var g = this.graph.clone();
	
						/* source and sink keys */
						var source = "source",
						    sink = "sink";
						while (g.hasVertex(source)) {
							source = "" + source + "'";
						}
						while (g.hasVertex(sink)) {
							sink = "" + sink + "'";
						}
	
						/* source and sink nodes */
					}
	
					// TODO: add precondition method which checks 'source' deltas
	
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
	
			_createClass(DeltaModelProxy, {
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
					}
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
					}
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
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Feature, {
				selected: {
					get: function () {
						_settleConditions();
						if (_selected[this.name] && !_allowed[this.name]) {
							throw new ConstraintFailure(this);
						}
						return _selected[this.name];
					}
				},
				condition: {
					get: function () {
						return _if[this.name];
					}
				},
				conditional: {
					get: function () {
						return a(_if, this.name).length > 0;
					}
				},
				restricted: {
					get: function () {
						return a(_onlyIf, this.name).length > 0;
					}
				},
				select: {
					value: function select() {
						this["if"](true);
					}
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
							_this.select.apply(_this, _toConsumableArray(feature));
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
				configurable: true,
				enumerable: true
			},
			selected: {
				get: function () {
					return isUndefined(this.applicationCondition) || this.applicationCondition.selected;
				},
				configurable: true,
				enumerable: true
			}
		}));
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(ContainerProxy, {
				deactivate: {
					value: function deactivate() {
						var _this = this;
	
						Object.keys(this._children).forEach(function (key) {
							_this.childProxy(key).deactivate();
						});
						_get(Object.getPrototypeOf(ContainerProxy.prototype), "deactivate", this).call(this);
					}
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
					}
				},
				childKeys: {
					value: function childKeys() {
						return Object.keys(this._children);
					}
				},
				childProxies: {
					value: function childProxies(key) {
						return a(this._children, key);
					}
				},
				childProxy: {
					value: function childProxy(key) {
						return a(this._children, key)[this._children[key].length - 1];
					}
				},
				childDelta: {
					value: function childDelta(key) {
						var _deltaJs$Delta;
	
						return (_deltaJs$Delta = deltaJs.Delta).composed.apply(_deltaJs$Delta, _toConsumableArray(this.childProxies(key).map(function (proxy) {
							return proxy.delta();
						})));
					}
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
					}
				},
				_do: {
	
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
					value: function _do(method, doArgs) {
						/* is this proxy active? */
						if (!this.active) {
							throw new MultipleActiveProxiesError();
						}
	
						/* container-specific processing of arguments */
	
						var _processProxyArguments$apply = this.processProxyArguments.apply(this, _toConsumableArray(this._doArgs).concat(_toConsumableArray(doArgs)));
	
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
					}
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
					}
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
					}
				}
			}, {
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
					}
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
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
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
	
			_createClass(Proxy, {
				delta: {
					value: function delta() {
						return this._delta;
					}
				},
				active: {
					get: function () {
						return this._active;
					}
				},
				deactivate: {
					value: function deactivate() {
						this._active = false;
					}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMDBiZjI5MWU4YmU5YWZkYWMzOSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFHLE9BQUksSUFBSSxDQUFDLENBQUM7SUFDbkQ7O0dBRUQsQ0FBQyxDQUFDO0VBR0gsQ0FBQyxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIwMGJmMjkxZThiZTlhZmRhYzM5XG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCIvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG4vKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG4vKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvYmoxO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdHZhciBsYXN0ID0gbyhvYmplY3QsIC4uLmtleXMuc2xpY2UoMCwgLTEpKTtcblx0aWYgKGlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0fVxuXHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbyhvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIGRmYXVsdChvYmplY3QsIC4uLmtleXMsIHt9KSB9XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfVxuXG5cbi8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cbn1cblxuXG4vKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KG5yLCBzdHIpIHtcblx0cmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cik7XG59XG5cblxuLyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCByZXBlYXQoYW1vdW50LCBjaGFyKSk7XG59XG5cblxuLyogcnVuIGEgZnVuY3Rpb24gb25seSBvbmNlIHBlciBvYmorc3RyaW5nIGNvbWJvICovXG5leHBvcnQgZnVuY3Rpb24gb25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0dmFyIG9wZm4gPSAob2JqKSA9PiB7XG5cdFx0dmFyIHAgPSBgX29uY2UgcGVyOiAke2tleX1gO1xuXHRcdGlmIChvYmpbcF0pIHsgcmV0dXJuIH1cblx0XHRvYmpbcF0gPSB0cnVlOyAvLyBUT0RPOiBtYWtlIG5vbi1lbnVtZXJhdGFibGUsIG9yIHVzZSBFUzYgU3ltYm9sXG5cdFx0cmV0dXJuIGZuLmNhbGwob2JqLCBvYmopO1xuXHR9O1xuXHRpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcblx0XHRba2V5LCBmbl0gPSBbb2JqLCBrZXldO1xuXHRcdHJldHVybiBvcGZuO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcGZuKG9iaik7XG5cdH1cbn1cblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBwcmVjb25kaXRpb25zICovXG5leHBvcnQgdmFyIHQgPSAodHlwZTEsIHR5cGUyKSA9PiB7XG5cdHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpO1xufTtcblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBpbXBsZW1lbnRhdGlvbnMgKi9cbmV4cG9ydCB2YXIgZGVmaW5lX2QgPSAoZGVsdGFKcykgPT4gKHR5cGUsIGZuKSA9PiB7XG5cdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG59O1xuXG5cblxuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhc3NlcnQsIGlzVW5kZWZpbmVkfSAgICAgICAgICAgIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQgZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9QdXRJbnRvQXJyYXkgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZV9QdXRJbnRvRnVuY3Rpb24gICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YU1vZGVsICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVfZmVhdHVyZXMgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZV92YXJpYXRpb25Qb2ludHMgICAgICAgICAgICAgICAgICAgZnJvbSAnLi92YXJpYXRpb25Qb2ludHMuanMnO1xuaW1wb3J0IGRlZmluZV9hcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgICAgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3N9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50c1xuICogYW5kIGFjdHMgYXMgYSBmYWNhZGUgKGFzIGluIGRlc2lnbiBwYXR0ZXJuKSB0byB0aGUgbW9yZSBzcGVjaWZpY1xuICogc3Vic3lzdGVtcyBvZiBkZWx0YS5qcy5cbiAqXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgRGVsdGFKcyBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhSnMge1xuXG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9QdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX1B1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9mZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX3ZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfYXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAgIHtzdHJpbmd9ICAgLSBuYW1lIG9mIHRoZSBuZXcgb3BlcmF0aW9uIHR5cGVcblx0ICogQHBhcmFtIERlbHRhQ2xhc3Mge0Z1bmN0aW9ufSAtIHRoZSBuZXcgb3BlcmF0aW9uIGNsYXNzXG5cdCAqIEBwYXJhbSBQcm94eUNsYXNzIHs/RnVuY3Rpb259IC0gdGhlIG9wdGlvbmFsIGN1c3RvbSBQcm94eSBzdWJjbGFzcyBmb3IgdGhpcyBvcGVyYXRpb24tdHlwZVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBEZWx0YUNsYXNzLCBQcm94eUNsYXNzKSB7XG5cdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdGFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9uIGNsYXNzZXMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0YXNzZXJ0KGlzVW5kZWZpbmVkKHRoaXMuRGVsdGFbbmFtZV0pLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBzdG9yZSB0aGUgb3BlcmF0aW9uIGNsYXNzICovXG5cdFx0dGhpcy5EZWx0YVtuYW1lXSA9IERlbHRhQ2xhc3M7XG5cblx0XHQvKiBzZXQgdGhlIChvcHRpb25hbCkgUHJveHkgY2xhc3MgKi9cblx0XHREZWx0YUNsYXNzLlByb3h5ID0gUHJveHlDbGFzcztcblxuXHRcdC8qIGZldGNoIHRoZSBnaXZlbiBhcHBseVRvIGZ1bmN0aW9uIChpZiBhbnkpIHdoaWNoIHdpbGwgYmUgc2xpZ2h0bHkgbW9kaWZpZWQgKi9cblx0XHR2YXIgZ2l2ZW5BcHBseVRvID0gRGVsdGFDbGFzcy5wcm90b3R5cGUuYXBwbHlUbyB8fCAoKCk9Pnt9KTtcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdGV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChEZWx0YUNsYXNzLnByb3RvdHlwZS5tZXRob2RzIHx8IFtsb3dlcmNhc2VOYW1lXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBEZWx0YUNsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIERlbHRhQ2xhc3M7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcik7XG5cdH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgY2xhc3MgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSkgeyB0aGlzLl92YWwgPSB2YWx1ZSB9XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH1cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH1cblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdyaXRhYmxlVGFyZ2V0IGV4dGVuZHMgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3RvcihvYmosIHByb3ApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX29iaiA9IG9iajtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0fVxuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9XG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUsIHthc3NlcnQsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcblxuXHRjb25zdHJ1Y3RvcihzdHIgPSBcIlwiKSB7XG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0dmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFsuI10/KShcXHcqfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRhc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0XHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fVxuXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9XG5cblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblxuXHR0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxufVxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYDtcblx0XHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlIGRlbHRhLXR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdFx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdFx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIENvbXBvc2l0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YTEsIGRlbHRhMik7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnRGYWlsdXJlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihmZWF0dXJlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0XHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25PcmRlckN5Y2xlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHRcdHRoaXMuZnJvbSA9IGZyb207XG5cdFx0dGhpcy50byAgID0gdG87XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0IGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YXMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdVbnJlc29sdmVkRGVsdGFDb25mbGljdCc7XG5cdFx0dmFyIGRlbHRhTmFtZXMgPSBkZWx0YXMubWFwKGQgPT4gYCcke2QubmFtZX0nYCkuam9pbignLCcpO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBpcyBhbiB1bnJlc29sdmVkIGNvbmZsaWN0IGJldHdlZW4gZGVsdGFzICR7ZGVsdGFOYW1lc30uYDtcblx0XHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgUHJveHkgcGVyIHBhdGggY2FuIGJlIGFjdGl2ZSBhdCBhbnkgZ2l2ZW4gdGltZS5gO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVLCB7ZXh0ZW5kLCBvbmNlUGVyfSAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdEZWx0YScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdEZWx0YScsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHRcdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0XHR0aGlzLkRlbHRhLm5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRkZWx0YUpzLkRlbHRhID0gY2xhc3MgRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0dGhpcy5pZCA9ICsrRGVsdGEuX25leHRJRDtcblx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0fVxuXG5cdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZykgfVxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdFx0ICovXG5cdFx0ZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wcmVjb25kaXRpb24pIHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpcy5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZCh0aGlzLCBvdGhlcikgfVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAob3B0aW9ucy50YXJnZXRQcm9wKSAgIHsgc3RyICs9IGAg4oC5JHtvcHRpb25zLnRhcmdldFByb3B94oC6YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHsgc3RyICs9IGA6ICR7dGhpcy5hcmdzLm1hcCgoYSkgPT4gSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJywnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7Qm9vbGVhbnwoKERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGEpfSAtIGZhbHNlLCBvciBhIHNpZGUtZWZmZWN0IGZyZWUgZnVuY3Rpb25cblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YXMge1tEZWx0YUpzI0RlbHRhXX0gLSB0aGUgZGVsdGFzIHRvIGNvbXBvc2Vcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBjb21wb3NlZCguLi5kZWx0YXMpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdGRlbHRhcy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIgZDEgPSByZXN1bHQsXG5cdFx0XHRcdCAgICBkMiA9IGRlbHRhIHx8IG5ldyBkZWx0YUpzLkRlbHRhLk5vT3AoKTtcblxuXHRcdFx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0XHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0XHRcdHZhciBzdWNjZXNzID0gRGVsdGEuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiB0aHJvdyBhbiBlcnJvciBpZiAnZmFsc2UnIHdhcyBmb3VuZCByYXRoZXIgdGhhbiBhIGZ1bmN0aW9uKi9cblx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gZmFsc2UgfHwgIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHRcdFx0LyogIGlmIG5vIGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGlzIGZvdW5kLCB1c2UgYSBsaW5lYXIgZGVsdGEgbW9kZWwgICovXG5cdFx0XHRcdC8qICB0byAnbmFpdmVseScgaGF2ZSBvbmUgZGVsdGEgYXBwbHkgYWZ0ZXIgYW5vdGhlciAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHRpZiAoY29tcG9zZUZuID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y29tcG9zZUZuID0gKGQxLCBkMikgPT4ge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKTtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyBUT0RPOiBtYWtlIGEgbmV3IGRlZGljYXRlZCBkZWx0YSB0eXBlIGZvciB0aGlzOyBEZWx0YU1vZGVsIGlzIG92ZXJraWxsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0XHRcdHJlc3VsdCA9IGNvbXBvc2VGbihkMSwgZDIpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH07XG5cdGRlbHRhSnMuRGVsdGEuX25leHRJRCA9IDA7XG5cdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YV9jbGFzcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IGRlZmluZV9EZWx0YSBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBVLCB7aW5kZW50LCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignT3ZlcmxvYWRlZCcsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ092ZXJsb2FkZWQnLCBjbGFzcyBPdmVybG9hZGVkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMub3ZlcmxvYWRzID0gdGhpcy5hcmcgfHwgW107XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGluZGVudCwgdCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICBmcm9tICcuL0NvbnRhaW5lclByb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdNb2RpZnknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0NvbnRhaW5lclByb3h5KGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdNb2RpZnknLCBjbGFzcyBNb2RpZnkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdGV4dGVuZCh0aGlzLnN1YkRlbHRhcywgdGhpcy5hcmcgfHwge30pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuc3ViRGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJEZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHRcdFx0XHRleHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0XG5cdFx0XHRcdFx0XHQua2V5cyh0aGlzLnN1YkRlbHRhcylcblx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuc3ViRGVsdGFzW3BdLnRvU3RyaW5nKGV4dGVuZCh7fSwgb3B0aW9ucywgeyB0YXJnZXRQcm9wOiBwIH0pKSlcblx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHR9LCBjbGFzcyBNb2RpZnlQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBhbiBvcHRpb24gZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5Qcm94eSBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7IG9wdGlvbnMucGF0aCA9IGFyZyAgICAgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIHsgZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX0gLSB0aGUgZGVlcGVzdCBwcm94eSBjcmVhdGVkIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRofSA9IG9wdGlvbnM7XG5cdFx0XHRpZiAoIXBhdGgucHJvcCkgeyB0aHJvdyBuZXcgRXJyb3IoJ09wZXJhdGlvbnMgb24gYSBNb2RpZnkuUHJveHkgbmVlZCB0byBoYXZlIGEgbm9uLWVtcHR5IHBhdGguJykgfVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogcGF0aC5yZXN0IH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOT1RFOiBNb2RpZnkgb3BlcmF0aW9ucyBkbyBub3QgKHlldCkgdXNlIGFueSBvcHRpb25zXG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLmNoaWxkRGVsdGEocHJvcCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gZGVsdGFKcy5EZWx0YS5jb21wb3NlZChyZXN1bHQuc3ViRGVsdGFzW3Byb3BdLCBkMi5zdWJEZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTW9kaWZ5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignYmFzaWMgb3BlcmF0aW9ucycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEgKGRlbHRhSnMpO1xuXHRkZWZpbmVfTW9kaWZ5KGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJywgY2xhc3MgTm9PcCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge30pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0FkZCcsIGNsYXNzIEFkZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywgY2xhc3MgUmVtb3ZlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIGNsYXNzIEZvcmJpZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIGlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZXBsYWNlJywgY2xhc3MgUmVwbGFjZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1VwZGF0ZScsIGNsYXNzIFVwZGF0ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdOb09wJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cblx0LyogdXRpbGl0eSBmdW5jdGlvbiBkICovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnTW9kaWZ5JyksIGQoJ0FkZCcsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ0FkZCcgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdBZGQnICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdNb2RpZnknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnUmVtb3ZlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnRm9yYmlkJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ0ZvcmJpZCcpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnTW9kaWZ5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdSZW1vdmUnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAsICdSZXBsYWNlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgLCAnUmVwbGFjZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdBZGQnICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ0ZvcmJpZCcgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdVcGRhdGUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdVcGRhdGUnICksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdVcGRhdGUnICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnTW9kaWZ5JyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ0FkZCcgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnRm9yYmlkJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdVcGRhdGUnICksIGQoJ1VwZGF0ZScsICAoe3AxLCBwMn0pID0+IHYgPT4gcDIocDEodikpKSAgICk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVLCB7aXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ1B1dEludG9BcnJheScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgKGRlbHRhSnMpO1xuXHRkZWZpbmVfYmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXHRkZWZpbmVfUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCBjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IG1ldGhvZHMoKSB7IHJldHVybiBbXSB9XG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAgICAgICwgJ1B1dEludG9BcnJheScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgLCAnUHV0SW50b0FycmF5JyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAgICAgICwgJ1B1dEludG9BcnJheScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgLCAnUHV0SW50b0FycmF5JyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ01vZGlmeScgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnQWRkJyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdSZW1vdmUnICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0ZvcmJpZCcgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVwbGFjZScgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdVcGRhdGUnICAgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1B1dEludG9BcnJheScpLCAoZDEsIGQyKSA9PlxuXHRcdG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheShbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2lzVW5kZWZpbmVkLCBpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9CYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0Z1bmN0aW9uJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9CYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywgY2xhc3MgUHV0SW50b0Z1bmN0aW9uIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMuYXJnID8gKEFycmF5LmlzQXJyYXkodGhpcy5hcmcpID8gdGhpcy5hcmcgOiBbdGhpcy5hcmddKSA6IFtdO1xuXHRcdH1cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFsuLi50aGlzLnZhbHVlc107XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHQoaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbih7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgZCA9IGRlZmluZV9kKGRlbHRhSnMpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnTW9kaWZ5JyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdBZGQnICAgICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnRm9yYmlkJyAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1VwZGF0ZScgICAgICAgICApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+XG5cdFx0bmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKFsuLi5kMS52YWx1ZXMsIC4uLmQyLnZhbHVlc10pKTtcblxuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaXNEZWZpbmVkLCBpbmRlbnQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgICAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gICAgICAgICAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ0RlbHRhTW9kZWwnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0NvbnRhaW5lclByb3h5KGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdEZWx0YU1vZGVsJywgY2xhc3MgRGVsdGFNb2RlbCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9XG5cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0Y29uZmxpY3RzKCkge1xuXHRcdFx0LyogY2xvbmUgdGhlIGdyYXBoICovXG5cdFx0XHR2YXIgZyA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblxuXHRcdFx0Lyogc291cmNlIGFuZCBzaW5rIGtleXMgKi9cblx0XHRcdHZhciBzb3VyY2UgPSAnc291cmNlJywgc2luayA9ICdzaW5rJztcblx0XHRcdHdoaWxlIChnLmhhc1ZlcnRleChzb3VyY2UpKSB7IHNvdXJjZSA9IGAke3NvdXJjZX0nYCB9XG5cdFx0XHR3aGlsZSAoZy5oYXNWZXJ0ZXgoc2luaykpICAgeyBzaW5rICAgPSBgJHtzaW5rfSdgICAgfVxuXG5cdFx0XHQvKiBzb3VyY2UgYW5kIHNpbmsgbm9kZXMgKi9cblxuXG5cdFx0fVxuXG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSwgY2xhc3MgRGVsdGFNb2RlbFByb3h5IGV4dGVuZHMgZGVsdGFKcy5Db250YWluZXJQcm94eSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuX2NoaWxkT3B0aW9ucyA9IHt9OyAgICAgICAgICAgICAgIC8vIGtleSAtPiBvcHRpb25zXG5cdFx0XHR0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9ucyA9IHt9OyAvLyBrZXkgLT4gYXBwbGljYXRpb24tY29uZGl0aW9uXG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSByYXdBcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7P3sgb3B0aW9uczogT2JqZWN0LCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIG5hbWUsIC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpLFxuXHRcdFx0Ly8gdGhvdWdoIG5hbWUgYW5kL29yIHBhdGggbWF5IGFsc28gYmUgcGFzc2VkIGFzIG9wdGlvbnMgZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5EZWx0YU1vZGVsIG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMubmFtZSkgeyBvcHRpb25zLm5hbWUgPSBhcmcgICB9XG5cdFx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgfVxuXHRcdFx0XHR9IGVsc2UgICAgICAgICAgICAgICAgIHsgZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCB8fCAhb3B0aW9ucy5uYW1lKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRoLCBuYW1lLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIGNyZWF0ZSBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsIGVwb255bW91cyBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHRsZXQgYXBwQ29uZDtcblx0XHRcdFx0aWYgKGZlYXR1cmUpIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICB7IGFwcENvbmQgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoIGBkZWx0YV9fJHtuYW1lfWAsIGV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuXHRcdFx0XHRcdGFwcENvbmQuaWYob3B0aW9uc1sncmVzb2x2ZXMnXSk7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBmZWF0dXJlOiBmYWxzZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmZWF0dXJlIHx8IGFwcENvbmQuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFwcENvbmQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0gPSBhcHBDb25kO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgbmFtZTogdW5kZWZpbmVkIH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShuYW1lLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShuYW1lLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIG9wdGlvbnMgKi9cblx0XHRcdGlmICghdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdKSB7XG5cdFx0XHRcdHRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSA9IG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmNsZWFyKCk7XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdFx0bGV0IG9wdGlvbnMgPSB0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0LyogZGVsdGEgaW4gdGhlIGdyYXBoICovXG5cdFx0XHRcdHZhciBkZWx0YSA9IHRoaXMuY2hpbGREZWx0YShuYW1lKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gb3JkZXIgKi9cblx0XHRcdFx0WyAuLi5vcHRpb25zWydyZXNvbHZlcyddfHxbXSwgLi4ub3B0aW9uc1snYWZ0ZXInXXx8W10sIC4uLm9wdGlvbnNbJ3JlcXVpcmVzJ118fFtdIF0uZm9yRWFjaCgoc3ViTmFtZSkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5jcmVhdGVFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LmdyYXBoLnJlbW92ZUV4aXN0aW5nRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBjb25kaXRpb24gKi9cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXS5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRcdGRlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV07XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwgfHxcblx0XHRkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbFxuXHQpLCB0cnVlKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhLCBhc3NlcnQsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2ZlYXR1cmVzJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ2ZlYXR1cmVzJywgKCkgPT4ge1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0XHRhc3NlcnQoaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdGZ1bmN0aW9uIF9ub3JtYWxpemVDbGF1c2UoaW5wdXQpIHtcblx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0dmFyIF9pZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9zZWxlY3RlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRhKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBjb25zdHJhaW50cyBiZXR3ZWVuIGZlYXR1cmVzIChlbmZvcmNlZCBieSBlcnJvcnMpICovXG5cdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRPbmx5SWYoZmVhdHVyZSwgY29uanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlXSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfb25seUlmW2ZlYXR1cmVdICE9PSBmYWxzZSkge1xuXHRcdFx0YShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKGlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKChfaWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5zb21lKGRpc2ogPT4gZGlzai5ldmVyeShjb25qID0+IF9zZWxlY3RlZFtjb25qXSkpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cblx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnb25seUlmJyBjb25qdW5jdHMgdGhhdCBhcmUgZXhjbHVkZWQsIHRoaXMgZmVhdHVyZSBpcyBleGNsdWRlZCAqL1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkZlYXR1cmUgPSBjbGFzcyBGZWF0dXJlIHtcblx0XHRjb25zdHJ1Y3RvcihuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9XG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gICAgICAgICAgICAgICAgICAgfVxuXHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIGEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH1cblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBhKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9XG5cdFx0c2VsZWN0KCkgeyB0aGlzLmlmKHRydWUpIH1cblx0fTtcblxuXG5cdC8qIHJlc3RyaWN0aW9ucyBhbmQgY29ubmVjdGlvbnMgKi9cblx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRbICdpZicsICAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgIF0sIC8vIHRoaXMgc2VsZWN0ZWQgYnkgb3RoZXJcblx0XHRbICdvbmx5SWYnLCAgICAgW19hZGRPbmx5SWZdICAgICAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIHRoaXMgYnV0IG5vdCBvdGhlclxuXHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHMsIF9hZGRPbmx5SWZdICAgICAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFsgJ3JlcXVpcmVkQnknLCBbX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgb3RoZXIgYnV0IG5vdCB0aGlzXG5cdFx0WyAnaWZmJywgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5LCBfYWRkT25seUlmXSBdICAvLyBpZiBhbmQgb25seUlmXG5cdF07XG5cdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGUuYWRkT3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbiwgbWV0aG9kc10pID0+IHtcblx0XHRcdGlmIChuYW1lID09PSBuKSB7XG5cdFx0XHRcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZCh0aGlzLm5hbWUsIHZhbHVlKSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbmFtZV0pID0+IHtcblx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihuYW1lLCB2YWx1ZSk7XG5cdFx0fTtcblx0fSk7XG5cblxuXHQvKiB0aGUgZmVhdHVyZXMgYmVsb25naW5nIHRvIHRoaXMgRGVsdGFKcyBpbnN0YW5jZSAqL1xuXHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IGRlZmluZV9EZWx0YU1vZGVsIGZyb20gJy4vRGVsdGFNb2RlbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcigndmFyaWF0aW9uIHBvaW50cycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICd2YXJpYXRpb24gcG9pbnRzJywgKCkgPT4ge1xuXG5cdFx0ZGVmaW5lX0RlbHRhTW9kZWwoZGVsdGFKcyk7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogVGhpcyBtZXRob2QgaW5kaWNhdGVzIGEgdmFyaWF0aW9uIHBvaW50LlxuXHRcdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludCBhZnRlciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgZGVsdGFzXG5cdFx0XHQgKi9cblx0XHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0XHR2YXIgcm9vdCA9IHsgW25hbWVdOiB2YWwgfTtcblx0XHRcdFx0dGhpcy5fZGVsdGFNb2RlbFByb3h5LmRlbHRhKCkuYXBwbHlUbyhyb290LCB7XG5cdFx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIHByb3h5IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0XHQgKiB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS4gSXQgcHJlc2V0cyB0aGUgJ2ZlYXR1cmUnIG9wdGlvbiB0byAndHJ1ZScsIGJ1dCB0aGlzIGNhbiBiZVxuXHRcdFx0ICogb3ZlcndyaXR0ZW4gbWFudWFsbHkuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fSAtIHRoZSBwcm94eSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0XHQgKi9cblx0XHRcdGRvKC4uLmFyZ3MpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWxQcm94eS5kbyh7IGZlYXR1cmU6IHRydWUgfSwgLi4uYXJncyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdGRlbHRhSnMuX2RlbHRhTW9kZWxQcm94eSA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKS5kbygpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignYXBwbGljYXRpb24gY29uZGl0aW9ucycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdhcHBsaWNhdGlvbiBjb25kaXRpb25zJywgKCkgPT4ge1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdFx0ZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmUpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdCguLi5mZWF0dXJlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXHRcdGdldCBzZWxlY3RlZCgpIHsgcmV0dXJuIGlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQgfVxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhLCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgZnJvbSAnLi9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVfUHJveHkgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yfSAgICAgIGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ0NvbnRhaW5lclByb3h5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Qcm94eShkZWx0YUpzKTtcblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIGNvbnRhaW5lciBvcGVyYXRpb24gdHlwZXMgbGlrZSBNb2RpZnkgYW5kIERlbHRhTW9kZWwgKi9cblx0ZGVsdGFKcy5Db250YWluZXJQcm94eSA9IGNsYXNzIENvbnRhaW5lclByb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7XG5cblx0XHQvLyBBIFByb3h5IGluc3RhbmNlIGV4cG9zZXMgb3BlcmF0aW9uIG1ldGhvZHMgZGlyZWN0bHkuIEFyZ3VtZW50c1xuXHRcdC8vIHRvIHRob3NlIG9wZXJhdGlvbnMgY2FuIGJlIHByZS1zdXBwbGllZCB0aHJvdWdoIHRoZSBgZG9gIG1ldGhvZC5cblxuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9kb0FyZ3MgICAgICAgPSBbXTtcblx0XHRcdHRoaXMuX29yaWdpbmFsICAgICA9IHRoaXM7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiAgICAgPSB7fTsgLy8ga2V5IC0+IFtwcm94aWVzXVxuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zXG5cdFx0fVxuXG5cblx0XHRkZWFjdGl2YXRlKCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNoaWxkUHJveHkoa2V5KS5kZWFjdGl2YXRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdHN1cGVyLmRlYWN0aXZhdGUoKTtcblx0XHR9XG5cblxuXHRcdGFkZENoaWxkUHJveHkoa2V5LCBkZWx0YSkge1xuXHRcdFx0LyogZ2V0IHRoZSBjdXJyZW50IHByb3h5IGZvciB0aGUgZ2l2ZW4ga2V5ICovXG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY2hpbGRQcm94eShrZXkpO1xuXG5cdFx0XHQvKiBnZXQgLyBjcmVhdGUgZGVsdGEgcHJveHkgKi9cblx0XHRcdHZhciBQcm94eUNsYXNzID0gZGVsdGEuY29uc3RydWN0b3IuUHJveHkgfHwgZGVsdGFKcy5Qcm94eTtcblx0XHRcdHZhciBwcm94eSA9IG5ldyBQcm94eUNsYXNzKHsgZGVsdGEsIHBhcmVudDogdGhpcyB9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjdXJyZW50IHByb3h5IGlmIGl0LCBhbmQgdGhlIGN1cnJlbnQgcHJveHksIGFyZSBib3RoIE1vZGlmeS5Qcm94eSAqL1xuXHRcdFx0aWYgKGN1cnJlbnQgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSAmJlxuXHRcdFx0XHRwcm94eSAgIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkpIHsgcmV0dXJuIGN1cnJlbnQgfVxuXG5cdFx0XHQvKiB3ZSBuZWVkIGEgbmV3IHByb3h5LCBzbyBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IG9uZSAqL1xuXHRcdFx0aWYgKGN1cnJlbnQpIHsgY3VycmVudC5kZWFjdGl2YXRlKCkgfVxuXG5cdFx0XHQvKiBjcmVhdGUgYSBuZXcgUHJveHkgb2YgdGhlIHJpZ2h0IGNsYXNzLCByZW1lbWJlciBpdCBhbmQgcmV0dXJuIGl0ICovXG5cdFx0XHR0aGlzLl9jaGlsZHJlbltrZXldLnB1c2gocHJveHkpO1xuXHRcdFx0cmV0dXJuIHByb3h5O1xuXHRcdH1cblxuXG5cdFx0Y2hpbGRLZXlzKCkgeyByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pIH1cblxuXG5cdFx0Y2hpbGRQcm94aWVzKGtleSkgeyByZXR1cm4gYSh0aGlzLl9jaGlsZHJlbiwga2V5KSB9XG5cblxuXHRcdGNoaWxkUHJveHkoa2V5KSB7IHJldHVybiBhKHRoaXMuX2NoaWxkcmVuLCBrZXkpW3RoaXMuX2NoaWxkcmVuW2tleV0ubGVuZ3RoLTFdIH1cblxuXG5cdFx0Y2hpbGREZWx0YShrZXkpIHtcblx0XHRcdHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKFxuXHRcdFx0XHQuLi50aGlzLmNoaWxkUHJveGllcyhrZXkpLm1hcChwcm94eSA9PiBwcm94eS5kZWx0YSgpKVxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdGRvKC4uLmRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogcmV0dXJuIGEgdmVyc2lvbiBvZiB0aGlzIFByb3h5IHdpdGggZXh0cmEgcHJlbG9hZGVkIGFyZ3MgKi9cblx0XHRcdC8vIG5vdGUgdGhhdCB0aGlzIG1peGVzIHByb3RvdHlwaWNhbCBpbmhlcml0YW5jZVxuXHRcdFx0Ly8gaW50byB0aGUgZXhpc3RpbmcgY2xhc3NpY2FsIGluaGVyaXRhbmNlIHNjaGVtZVxuXHRcdFx0dmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG5cdFx0XHRyZXN1bHQuX2RvQXJncyAgID0gWy4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzXTtcblx0XHRcdHJlc3VsdC5fb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdF9kbyhtZXRob2QsIGRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogY29udGFpbmVyLXNwZWNpZmljIHByb2Nlc3Npbmcgb2YgYXJndW1lbnRzICovXG5cdFx0XHR2YXIge29wdGlvbnMsIGFyZ3N9ID0gdGhpcy5wcm9jZXNzUHJveHlBcmd1bWVudHMoLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3MpO1xuXG5cdFx0XHQvKiBpZiB0aGUgb3B0aW9ucyBjb250YWluIGEgcGF0aCwgcmVpZnkgaXQgKi9cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5wYXRoID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRvcHRpb25zLnBhdGggPSBuZXcgUGF0aChvcHRpb25zLnBhdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0aGUgYXJndW1lbnQgbGlzdCBpcyBmaW5pc2hlZDsgY3JlYXRlIGEgbmV3IGRlbHRhIGFuZCBwdXQgaXQgaW4gdGhlIHJpZ2h0IHBsYWNlICovXG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncyk7XG5cdFx0XHR2YXIgcHJveHkgPSB0aGlzLmFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucyk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgcmlnaHQgUHJveHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nICovXG5cdFx0XHRyZXR1cm4gKHByb3h5IGluc3RhbmNlb2YgZGVsdGFKcy5Db250YWluZXJQcm94eSkgPyBwcm94eSA6IHRoaXM7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBleHRyYWN0IGFuXG5cdFx0ICogb3B0aW9ucyBvYmplY3QsIHBhdGggYW5kIGZpbmFsIGFyZ3VtZW50IGxpc3QgZnJvbSBhIGdpdmVuICdyYXcnIGFyZ3VtZW50IGxpc3QuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gYXJncyB7WypdfVxuXHRcdCAqIEByZXR1cm4ge3tvcHRpb25zOiBPYmplY3QsIGFyZ3M6IFsqXX19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAncHJvY2Vzc1Byb3h5QXJndW1lbnRzJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gYWRkIGEgZ2l2ZW4gZGVsdGFcblx0XHQgKiB1bmRlciBhIGdpdmVuIHBhdGggd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucywgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBQcm94eS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdhZGRPcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogQ3JlYXRlIGEgZGVsdGEgYmFzZWQgb24gYSBtZXRob2QtbmFtZSBhbmQgYXJndW1lbnQtbGlzdC5cblx0XHQgKiBJZiB0aGUgbWV0aG9kLW5hbWUgaXMgb3ZlcmxvYWRlZCwgeW91J2xsIGF1dG9tYXRpY2FsbHkgZ2V0XG5cdFx0ICogYW4gYERlbHRhLk92ZXJsb2FkZWRgIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBfbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9tZXRob2RIYW5kbGVyc1ttZXRob2RdLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoLi4uYXJncykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdGRlZmluZV9PdmVybG9hZGVkKGRlbHRhSnMpO1xuXHRcdFx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZChuZXdEZWx0YXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2QgIHtzdHJpbmd9ICAgLSBtZXRob2QgbmFtZVxuXHRcdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXG5cdFx0XHQvKiBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBQcm94eSBjbGFzcyB3aXRoIG5ldyBvcGVyYXRpb24gbWV0aG9kICovXG5cdFx0XHRpZiAoaXNVbmRlZmluZWQoZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSkpIHtcblx0XHRcdFx0ZGVsdGFKcy5Db250YWluZXJQcm94eS5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2RvKG1ldGhvZCwgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIHJlZ2lzdGVyIGhhbmRsZXJzIGZvciBlYWNoIG1ldGhvZCAqL1xuXHRcdFx0YShkZWx0YUpzLkNvbnRhaW5lclByb3h5LCAnX21ldGhvZEhhbmRsZXJzJywgbWV0aG9kKS5wdXNoKGhhbmRsZXIpO1xuXG5cdFx0fVxuXG5cblx0fTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbnRhaW5lclByb3h5LmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHJveHknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhKGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5Qcm94eSA9IGNsYXNzIFByb3h5IHtcblx0XHRjb25zdHJ1Y3Rvcih7cGFyZW50LCBkZWx0YX0gPSB7fSkge1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RlbHRhID0gZGVsdGE7XG5cdFx0fVxuXHRcdGRlbHRhKCkgeyByZXR1cm4gdGhpcy5fZGVsdGE7IH1cblx0XHRnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlIH1cblx0XHRkZWFjdGl2YXRlKCkgeyB0aGlzLl9hY3RpdmUgPSBmYWxzZSB9XG5cdH07XG5cblxuXHRleHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gYXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yLlByb3h5O1xuXHRcdFx0aWYgKCFQcm94eUNsYXNzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyAnZG8nIG9uIGRlbHRhIHR5cGUgJyR7dGhpcy50eXBlfScsIHdoaWNoIGhhcyBubyBQcm94eSBpbnRlcmZhY2UuYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YTogdGhpcyB9KS5kbyguLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Qcm94eS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=