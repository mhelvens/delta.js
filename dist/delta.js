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
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/*  extend the first passed object with the properties     */
	/*  of the other objects, from left to right, and returns  */
	/*  the first passed object                                */
	exports.extend = extend;
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
	exports.arraysEqual = arraysEqual;
	exports.objectsEqual = objectsEqual;
	exports.graphDescendants = graphDescendants;
	
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
	
	function arraysEqual(a, b) {
		var eq = arguments[2] === undefined ? function (x, y) {
			return x === y;
		} : arguments[2];
	
		if (a.length !== b.length) {
			return false;
		}
		for (var i = 0; i < a.length; ++i) {
			if (!eq(a[i], b[i])) {
				return false;
			}
		}
		return true;
	}
	
	function objectsEqual(a, b) {
		var eq = arguments[2] === undefined ? function (x, y) {
			return x === y;
		} : arguments[2];
	
		var aKeys = Object.keys(a);
		var bKeys = Object.keys(b);
		if (aKeys.length !== bKeys.length) {
			return false;
		}
		aKeys.sort();
		bKeys.sort();
		for (var i = 0; i < aKeys.length; ++i) {
			if (aKeys[i] !== bKeys[i]) {
				return false;
			}
			if (!eq(a[aKeys[i]], b[bKeys[i]])) {
				return false;
			}
		}
		return true;
	}
	
	function graphDescendants(graph, key) {
		return Object.keys((function succDescendants(key) {
			return extend.apply(undefined, [_defineProperty({}, key, true)].concat(_toConsumableArray(graph.successors(key).map(function (succ) {
				return succDescendants(succ);
			}))));
		})(key));
	}
	
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
	var isDefined = _utilJs.isDefined;
	var arraysEqual = _utilJs.arraysEqual;
	
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
					var givenEquals = DeltaClass.prototype.equals;
	
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
						equals: function equals(other) {
							if (this.type !== other.type) {
								return false;
							}
							if (isDefined(givenEquals)) {
								return givenEquals.call(this, other);
							} else {
								return arraysEqual(this.args, other.args);
							}
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
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.wt = wt;
	exports.rt = rt;
	
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
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _utilJs = __webpack_require__(1);
	
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
	     * @param value   {*}       - any given value
	     * @param options {object?} - the (optional) options for this delta application
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
	
	var indent = _utilJs.indent;
	var oncePer = _utilJs.oncePer;
	var arraysEqual = _utilJs.arraysEqual;
	
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
	
					/** {@public}{@method}{@nosideeffects}
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
				equals: {
					value: function equals(other) {
						return arraysEqual(this.overloads, other.overloads, function (d1, d2) {
							return d1.equals(d2);
						});
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
	var objectsEqual = _utilJs.objectsEqual;
	
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
	
					/** {@public}{@method}{@nosideeffects}
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
				equals: {
					value: function equals(other) {
						return objectsEqual(this.subDeltas, other.subDeltas, function (d1, d2) {
							return d1.equals(d2);
						});
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
	
	var isDefined = _utilJs.isDefined;
	var t = _utilJs.t;
	var define_d = _utilJs.define_d;
	var oncePer = _utilJs.oncePer;
	var arraysEqual = _utilJs.arraysEqual;
	
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
				equals: {
					value: function equals(other) {
						return arraysEqual(this.values, other.values, function (a, b) {
							return a.method === b.method && a.value && b.value;
						});
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
	var arraysEqual = _utilJs.arraysEqual;
	
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
				equals: {
					value: function equals(other) {
						return arraysEqual(this.values, other.values, function (a, b) {
							return a.method === b.method && a.value && b.value;
						});
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
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
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
	var o = _utilJs.o;
	var graphDescendants = _utilJs.graphDescendants;
	
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
				equals: {
					value: function equals(other) {
						var g1 = this.graph.transitiveReduction();
						var g2 = other.graph.transitiveReduction();
						var result = true;
						g1.eachVertex(function (n1, d1) {
							if (g2.vertexValue(n1).equals(d1)) {
								result = false;
								return false;
							}
						});
						if (!result) {
							return false;
						}
						g2.eachVertex(function (n2, d2) {
							if (g1.vertexValue(n2).equals(d2)) {
								result = false;
								return false;
							}
						});
						if (!result) {
							return false;
						}
						g1.eachEdge(function (n1From, n1To) {
							if (g2.hasEdge(n1From, n1To)) {
								result = false;
								return false;
							}
						});
						if (!result) {
							return false;
						}
						g1.eachEdge(function (n2From, n2To) {
							if (g1.hasEdge(n2From, n2To)) {
								result = false;
								return false;
							}
						});
						return result; // TODO: move 'equals' method to the js-graph library (and make more efficient)
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
					},
					writable: true,
					configurable: true
				},
				conflicts: {
	
					/** {@public}{@method}
	     *
	     */
	
					value: function conflicts() {
						var _this = this;
	
						/* clone the graph */
						var g = this.graph.clone();
	
						/* source and sink keys */
						var sink = "(sink)";
						while (g.hasVertex(sink)) {
							sink = "" + sink + "'";
						}
	
						/* create sink vertex, connect it to all other vertices */
						g.addNewVertex(sink, null);
						g.eachVertex(function (name) {
							g.setVertex(name, null);
							if (name !== sink) {
								g.ensureEdge(name, sink);
							}
						});
	
						/* transitive reduction */
						g = g.transitiveReduction();
	
						/* for each delta, gather its ancestors and register through which predecessor they may be reached */
						var resolutions = {}; // first -> second -> possible-resolving-delta -> true
						var getResolutionsIn = function (name) {
							if (g.vertexValue(name)) {
								return;
							}
	
							/* find ancestors */
							var ancestors = {};
							g.predecessors(name).forEach(function (pred) {
								getResolutionsIn(pred);
								ancestors[pred] = _defineProperty({}, pred, true);
								var predAncestors = g.vertexValue(pred);
								extend.apply(undefined, [ancestors[pred]].concat(_toConsumableArray(Object.keys(predAncestors).map(function (ppred) {
									return predAncestors[ppred];
								}))));
							});
							g.setVertex(name, ancestors);
	
							/* find 'incomparable' deltas, plus the first delta that is 'greater' than both */
							Object.keys(ancestors).forEach(function (pred1) {
								Object.keys(ancestors).forEach(function (pred2) {
									if (pred1 >= pred2) {
										return;
									} // make sure pred1 < pred2
									var ancs1 = extend({}, ancestors[pred1]);
									var ancs2 = extend({}, ancestors[pred2]);
									Object.keys(ancs1).forEach(function (anc1) {
										Object.keys(ancs2).forEach(function (anc2) {
											if (anc1 === anc2) {
												delete ancs1[anc1];
												delete ancs2[anc2];
											}
										});
									});
									Object.keys(ancs1).forEach(function (anc1) {
										Object.keys(ancs2).forEach(function (anc2) {
											o.apply(undefined, [resolutions].concat(_toConsumableArray([anc1, anc2].sort())))[name] = true;
										});
									});
								});
							});
						};
						getResolutionsIn(sink);
	
						var result = [];
						Object.keys(resolutions).forEach(function (first) {
							Object.keys(resolutions[first]).forEach(function (second) {
								var x = _this.graph.vertexValue(first);
								var y = _this.graph.vertexValue(second);
								if (!x.composedWith(y).equals(y.composedWith(x))) {
									result.push({ deltas: [x, y] });
									// TODO: see if conflicts are resolved:
									//graphDescendants(g, firstResolver).forEach((resolver) => {
									//
									//});
								}
							});
						});
	
						// TODO: remove test code
						console.log(JSON.stringify(result, null, 4));
	
						return result;
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
	var arraysEqual = _utilJs.arraysEqual;
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
				equals: {
					value: function equals(other) {
						return arraysEqual(this._components, other._components, function (d1, d2) {
							return d1.equals(d2);
						});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NGY1NmJkYjg4YjVkYjZiOWJlYiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3h5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtB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QUFDLFFBQVEsRUFBRyxVQUFDLEtBQUs7VUFBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRyxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUM7OztBQUkzRyxNQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUIsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQVcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQU8sY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7VUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtB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Y0FBVTtZQUFBLHNCQUFHO0FBQUUsVUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLO01BQUU7Ozs7OztVQVJoQixLQUFLO01BUzFCLENBQUM7O0FBR0YsUUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7Ozs7QUFNL0IsU0FBRSxlQUFVOzs7c0NBQU4sSUFBSTtBQUFKLFNBQUk7OztBQUNULFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLEVBQUU7QUFDaEIsV0FBTSxJQUFJLEtBQUssa0NBQWdDLElBQUksQ0FBQyxJQUFJLHNDQUFtQyxDQUFDO0tBQzVGO0FBQ0QsV0FBTyxZQUFJLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFHLE9BQUksSUFBSSxDQUFDLENBQUM7SUFDbkQ7O0dBRUQsQ0FBQyxDQUFDO0VBR0gsQ0FBQyxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDY0ZjU2YmRiODhiNWRiNmI5YmViXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCIvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG4vKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG4vKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvYmoxO1xufVxuXG5cbmZ1bmN0aW9uIGRmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0dmFyIGxhc3QgPSBvKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRpZiAoaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHR9XG5cdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfVxuZXhwb3J0IGZ1bmN0aW9uIGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfVxuXG5cbi8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cbn1cblxuXG4vKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KG5yLCBzdHIpIHtcblx0cmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cik7XG59XG5cblxuLyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCByZXBlYXQoYW1vdW50LCBjaGFyKSk7XG59XG5cblxuLyogcnVuIGEgZnVuY3Rpb24gb25seSBvbmNlIHBlciBvYmorc3RyaW5nIGNvbWJvICovXG5leHBvcnQgZnVuY3Rpb24gb25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0dmFyIG9wZm4gPSAob2JqKSA9PiB7XG5cdFx0dmFyIHAgPSBgX29uY2UgcGVyOiAke2tleX1gO1xuXHRcdGlmIChvYmpbcF0pIHsgcmV0dXJuIH1cblx0XHRvYmpbcF0gPSB0cnVlOyAvLyBUT0RPOiBtYWtlIG5vbi1lbnVtZXJhdGFibGUsIG9yIHVzZSBFUzYgU3ltYm9sXG5cdFx0cmV0dXJuIGZuLmNhbGwob2JqLCBvYmopO1xuXHR9O1xuXHRpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcblx0XHRba2V5LCBmbl0gPSBbb2JqLCBrZXldO1xuXHRcdHJldHVybiBvcGZuO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcGZuKG9iaik7XG5cdH1cbn1cblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBwcmVjb25kaXRpb25zICovXG5leHBvcnQgdmFyIHQgPSAodHlwZTEsIHR5cGUyKSA9PiB7XG5cdHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpO1xufTtcblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBpbXBsZW1lbnRhdGlvbnMgKi9cbmV4cG9ydCB2YXIgZGVmaW5lX2QgPSAoZGVsdGFKcykgPT4gKHR5cGUsIGZuKSA9PiB7XG5cdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheXNFcXVhbChhLCBiLCBlcT0oeCx5KT0+eD09PXkpIHtcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgeyByZXR1cm4gZmFsc2UgfVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAoIWVxKGFbaV0sIGJbaV0pKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdHNFcXVhbChhLCBiLCBlcT0oeCx5KT0+eD09PXkpIHtcblx0dmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSk7XG5cdHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpO1xuXHRpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlIH1cblx0YUtleXMuc29ydCgpO1xuXHRiS2V5cy5zb3J0KCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYUtleXMubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAoYUtleXNbaV0gIT09IGJLZXlzW2ldKSAgICAgICAgIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRpZiAoIWVxKGFbYUtleXNbaV1dLCBiW2JLZXlzW2ldXSkpIHsgcmV0dXJuIGZhbHNlIH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ3JhcGhEZXNjZW5kYW50cyhncmFwaCwga2V5KSB7XG5cdHJldHVybiBPYmplY3Qua2V5cygoZnVuY3Rpb24gc3VjY0Rlc2NlbmRhbnRzKGtleSkge1xuXHRcdHJldHVybiBleHRlbmQoeyBba2V5XTogdHJ1ZSB9LCAuLi5ncmFwaC5zdWNjZXNzb3JzKGtleSkubWFwKHN1Y2MgPT4gc3VjY0Rlc2NlbmRhbnRzKHN1Y2MpKSk7XG5cdH0pKGtleSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbC5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBhc3NlcnQsIGlzVW5kZWZpbmVkLCBpc0RlZmluZWQsIGFycmF5c0VxdWFsfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFfY2xhc3MuanMnO1xuaW1wb3J0IGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfUHV0SW50b0FycmF5ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVfUHV0SW50b0Z1bmN0aW9uICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHV0SW50b0Z1bmN0aW9uLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGFNb2RlbCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lX2ZlYXR1cmVzICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVfdmFyaWF0aW9uUG9pbnRzICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVfYXBwbGljYXRpb25Db25kaXRpb25zICAgICAgICAgICAgIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHNcbiAqIGFuZCBhY3RzIGFzIGEgZmFjYWRlIChhcyBpbiBkZXNpZ24gcGF0dGVybikgdG8gdGhlIG1vcmUgc3BlY2lmaWNcbiAqIHN1YnN5c3RlbXMgb2YgZGVsdGEuanMuXG4gKlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIERlbHRhSnMgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWx0YUpzIHtcblxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9QdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX0RlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfZmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV92YXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2FwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbmFtZSAgICAgICB7c3RyaW5nfSAgIC0gbmFtZSBvZiB0aGUgbmV3IG9wZXJhdGlvbiB0eXBlXG5cdCAqIEBwYXJhbSBEZWx0YUNsYXNzIHtGdW5jdGlvbn0gLSB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKiBAcGFyYW0gUHJveHlDbGFzcyB7P0Z1bmN0aW9ufSAtIHRoZSBvcHRpb25hbCBjdXN0b20gUHJveHkgc3ViY2xhc3MgZm9yIHRoaXMgb3BlcmF0aW9uLXR5cGVcblx0ICovXG5cdG5ld09wZXJhdGlvblR5cGUobmFtZSwgRGVsdGFDbGFzcywgUHJveHlDbGFzcykge1xuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRhc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbiBjbGFzc2VzIG11c3QgaGF2ZSBhIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGNhcGl0YWwgbGV0dGVyIC0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdGFzc2VydChpc1VuZGVmaW5lZCh0aGlzLkRlbHRhW25hbWVdKSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0Lyogc3RvcmUgdGhlIG9wZXJhdGlvbiBjbGFzcyAqL1xuXHRcdHRoaXMuRGVsdGFbbmFtZV0gPSBEZWx0YUNsYXNzO1xuXG5cdFx0Lyogc2V0IHRoZSAob3B0aW9uYWwpIFByb3h5IGNsYXNzICovXG5cdFx0RGVsdGFDbGFzcy5Qcm94eSA9IFByb3h5Q2xhc3M7XG5cblx0XHQvKiBmZXRjaCB0aGUgZ2l2ZW4gYXBwbHlUbyBmdW5jdGlvbiAoaWYgYW55KSB3aGljaCB3aWxsIGJlIHNsaWdodGx5IG1vZGlmaWVkICovXG5cdFx0dmFyIGdpdmVuQXBwbHlUbyA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmFwcGx5VG8gfHwgKCgpPT57fSk7XG5cdFx0dmFyIGdpdmVuRXF1YWxzICA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmVxdWFscztcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdGV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHRlcXVhbHMob3RoZXIpIHtcblx0XHRcdFx0aWYgKHRoaXMudHlwZSAhPT0gb3RoZXIudHlwZSkgeyByZXR1cm4gZmFsc2UgfVxuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKGdpdmVuRXF1YWxzKSkge1xuXHRcdFx0XHRcdHJldHVybiBnaXZlbkVxdWFscy5jYWxsKHRoaXMsIG90aGVyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gYXJyYXlzRXF1YWwodGhpcy5hcmdzLCBvdGhlci5hcmdzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHR5cGU6IG5hbWVcblx0XHR9KTtcblxuXHRcdC8qIGNyZWF0ZSBhbnkgZ2l2ZW4gbWV0aG9kcyB3aXRoIGRlZmF1bHQgaGFuZGxlciAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSk7XG5cdFx0KERlbHRhQ2xhc3MucHJvdG90eXBlLm1ldGhvZHMgfHwgW2xvd2VyY2FzZU5hbWVdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCAoLi4uYXJncykgPT4gbmV3IERlbHRhQ2xhc3MoLi4uYXJncykpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gRGVsdGFDbGFzcztcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0ICovXG5cdG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKTtcblx0fVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3Rvcih2YWx1ZSkgeyB0aGlzLl92YWwgPSB2YWx1ZSB9XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH1cblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH1cblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFdyaXRhYmxlVGFyZ2V0IGV4dGVuZHMgUmVhZGFibGVUYXJnZXQge1xuXHRjb25zdHJ1Y3RvcihvYmosIHByb3ApIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX29iaiA9IG9iajtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0fVxuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9XG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IHthc3NlcnQsIGlzRGVmaW5lZH0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcblxuXHRjb25zdHJ1Y3RvcihzdHIgPSBcIlwiKSB7XG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdFx0dmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFsuI10/KShcXHcqfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0XHRhc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0XHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fVxuXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9XG5cblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblxuXHR0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoaXNEZWZpbmVkKHRoaXMucmVzdCkpIHtcblx0XHRcdFx0cmVzdWx0ICs9IFwiLlwiICsgdGhpcy5yZXN0LnRvU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxufVxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYDtcblx0XHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlIGRlbHRhLXR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdFx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdFx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIENvbXBvc2l0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YTEsIGRlbHRhMik7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnRGYWlsdXJlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihmZWF0dXJlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0XHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25PcmRlckN5Y2xlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHRcdHRoaXMuZnJvbSA9IGZyb207XG5cdFx0dGhpcy50byAgID0gdG87XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0IGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YXMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdVbnJlc29sdmVkRGVsdGFDb25mbGljdCc7XG5cdFx0dmFyIGRlbHRhTmFtZXMgPSBkZWx0YXMubWFwKGQgPT4gYCcke2QubmFtZX0nYCkuam9pbignLCcpO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBpcyBhbiB1bnJlc29sdmVkIGNvbmZsaWN0IGJldHdlZW4gZGVsdGFzICR7ZGVsdGFOYW1lc30uYDtcblx0XHR0aGlzLmRlbHRhcyA9IGRlbHRhcztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgUHJveHkgcGVyIHBhdGggY2FuIGJlIGFjdGl2ZSBhdCBhbnkgZ2l2ZW4gdGltZS5gO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBvbmNlUGVyfSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVfQ29tcG9zZWQgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Db21wb3NlZC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignRGVsdGEnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdFx0dGhpcy5EZWx0YS5uZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5EZWx0YSA9IGNsYXNzIERlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHRoaXMuaWQgPSArK2RlbHRhSnMuRGVsdGEuX25leHRJRDtcblx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0fVxuXG5cdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZykgfVxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdFx0ICovXG5cdFx0ZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wcmVjb25kaXRpb24pIHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpcy5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQodGhpcywgb3RoZXIpIH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKG9wdGlvbnMudGFyZ2V0UHJvcCkgICB7IHN0ciArPSBgIOKAuSR7b3B0aW9ucy50YXJnZXRQcm9wfeKAumAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0ICogQHBhcmFtIGNvbXBvc2Uge0Jvb2xlYW58KChEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhKX0gLSBmYWxzZSwgb3IgYSBzaWRlLWVmZmVjdCBmcmVlIGZ1bmN0aW9uXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0ZGVsdGFKcy5EZWx0YS5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGFzIHtbRGVsdGFKcyNEZWx0YV19IC0gdGhlIGRlbHRhcyB0byBjb21wb3NlXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRzdGF0aWMgY29tcG9zZWQoLi4uZGVsdGFzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXHRcdFx0ZGVsdGFzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBkMSA9IHJlc3VsdCxcblx0XHRcdFx0ICAgIGQyID0gZGVsdGEgfHwgbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHRcdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSBEZWx0YS5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIHRocm93IGFuIGVycm9yIGlmICdmYWxzZScgd2FzIGZvdW5kIHJhdGhlciB0aGFuIGEgZnVuY3Rpb24qL1xuXHRcdFx0XHRpZiAoY29tcG9zZUZuID09PSBmYWxzZSB8fCAhc3VjY2VzcykgeyB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihkMSwgZDIpIH1cblxuXHRcdFx0XHQvKiAgaWYgbm8gY29tcG9zaXRpb24gZnVuY3Rpb24gaXMgZm91bmQsIHVzZSBhIGxpbmVhciBkZWx0YSBtb2RlbCAgKi9cblx0XHRcdFx0LyogIHRvICduYWl2ZWx5JyBoYXZlIG9uZSBkZWx0YSBhcHBseSBhZnRlciBhbm90aGVyICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdGlmIChjb21wb3NlRm4gPT09IHRydWUpIHtcblx0XHRcdFx0XHRjb21wb3NlRm4gPSAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5Db21wb3NlZChbZDEsIGQyXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0XHRcdHJlc3VsdCA9IGNvbXBvc2VGbihkMSwgZDIpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9O1xuXHRkZWx0YUpzLkRlbHRhLl9uZXh0SUQgPSAwO1xuXHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMgID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXG5cblx0LyogZGVmaW5lIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQgZm9yIHVzZSBpbiBjb21wb3NpdGlvbnMgKi9cblx0ZGVmaW5lX0NvbXBvc2VkKGRlbHRhSnMpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFfY2xhc3MuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5pbXBvcnQge2luZGVudCwgb25jZVBlciwgYXJyYXlzRXF1YWx9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0TXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdPdmVybG9hZGVkJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9EZWx0YShkZWx0YUpzKTtcblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnT3ZlcmxvYWRlZCcsIGNsYXNzIE92ZXJsb2FkZWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSB0aGlzLmFyZyB8fCBbXTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXlzRXF1YWwodGhpcy5vdmVybG9hZHMsIG90aGVyLm92ZXJsb2FkcywgKGQxLCBkMikgPT4gZDEuZXF1YWxzKGQyKSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGluZGVudCwgdCwgb25jZVBlciwgb2JqZWN0c0VxdWFsfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ01vZGlmeScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfQ29udGFpbmVyUHJveHkoZGVsdGFKcyk7XG5cblxuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ01vZGlmeScsIGNsYXNzIE1vZGlmeSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0ZXh0ZW5kKHRoaXMuc3ViRGVsdGFzLCB0aGlzLmFyZyB8fCB7fSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuc3ViRGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHRyZXR1cm4gb2JqZWN0c0VxdWFsKHRoaXMuc3ViRGVsdGFzLCBvdGhlci5zdWJEZWx0YXMsIChkMSwgZDIpID0+IGQxLmVxdWFscyhkMikpO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0aWYgKCFvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSB8fCBvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSA9PT0gcHJvcCkge1xuXHRcdFx0XHRcdHRoaXMuc3ViRGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0XHRcdGV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Rcblx0XHRcdFx0XHRcdC5rZXlzKHRoaXMuc3ViRGVsdGFzKVxuXHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5zdWJEZWx0YXNbcF0udG9TdHJpbmcoZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHRhcmdldFByb3A6IHAgfSkpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdH0sIGNsYXNzIE1vZGlmeVByb3h5IGV4dGVuZHMgZGVsdGFKcy5Db250YWluZXJQcm94eSB7XG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSByYXdBcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7P3sgb3B0aW9uczogT2JqZWN0LCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpLFxuXHRcdFx0Ly8gdGhvdWdoIHBhdGggbWF5IGFsc28gYmUgcGFzc2VkIGFzIGFuIG9wdGlvbiBkaXJlY3RseVxuXHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHJhd0FyZ3MubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcihgVGhlIGFyZ3VtZW50IGxpc3QgZm9yIHRoaXMgTW9kaWZ5LlByb3h5IG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgICB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgeyBleHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghb3B0aW9ucy5wYXRoKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge3twYXRoOiBQYXRofX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fSAtIHRoZSBkZWVwZXN0IHByb3h5IGNyZWF0ZWQgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIge3BhdGh9ID0gb3B0aW9ucztcblx0XHRcdGlmICghcGF0aC5wcm9wKSB7IHRocm93IG5ldyBFcnJvcignT3BlcmF0aW9ucyBvbiBhIE1vZGlmeS5Qcm94eSBuZWVkIHRvIGhhdmUgYSBub24tZW1wdHkgcGF0aC4nKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IGV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiBwYXRoLnJlc3QgfSk7XG5cdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5PVEU6IE1vZGlmeSBvcGVyYXRpb25zIGRvIG5vdCAoeWV0KSB1c2UgYW55IG9wdGlvbnNcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBkZWVwZXN0IGNyZWF0ZWQgcHJveHkgKi9cblx0XHRcdHJldHVybiBkZWVwZXN0UHJveHk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzID0ge307XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuY2hpbGREZWx0YShwcm9wKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0sIGQyLnN1YkRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7aXNVbmRlZmluZWQsIGlzRGVmaW5lZCwgdCwgZGVmaW5lX2QsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSAgICAgICBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdiYXNpYyBvcGVyYXRpb25zJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9EZWx0YSAoZGVsdGFKcyk7XG5cdGRlZmluZV9Nb2RpZnkoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnLCBjbGFzcyBOb09wIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywgY2xhc3MgQWRkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCBjbGFzcyBSZW1vdmUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywgY2xhc3MgRm9yYmlkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCBjbGFzcyBSZXBsYWNlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnVXBkYXRlJywgY2xhc3MgVXBkYXRlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ05vT3AnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblxuXHQvKiB1dGlsaXR5IGZ1bmN0aW9uIGQgKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdNb2RpZnknKSwgZCgnQWRkJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnQWRkJyAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ0FkZCcgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ01vZGlmeScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdSZW1vdmUnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdGb3JiaWQnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnRm9yYmlkJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdNb2RpZnknKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICwgJ1JlcGxhY2UnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAsICdSZXBsYWNlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnTW9kaWZ5JyApLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ0FkZCcgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnRm9yYmlkJyApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1VwZGF0ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1VwZGF0ZScgKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgLCAnVXBkYXRlJyApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1VwZGF0ZScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdNb2RpZnknICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnQWRkJyAgICApLCB0cnVlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdGb3JiaWQnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1VwZGF0ZScgKSwgZCgnVXBkYXRlJywgICh7cDEsIHAyfSkgPT4gdiA9PiBwMihwMSh2KSkpICAgKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc0RlZmluZWQsIHQsIGRlZmluZV9kLCBvbmNlUGVyLCBhcnJheXNFcXVhbH0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfYmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVfUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ1B1dEludG9BcnJheScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgKGRlbHRhSnMpO1xuXHRkZWZpbmVfYmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXHRkZWZpbmVfUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCBjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFsuLi50aGlzLnZhbHVlc107XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGVxdWFscyhvdGhlcikge1xuXHRcdFx0cmV0dXJuIGFycmF5c0VxdWFsKHRoaXMudmFsdWVzLCBvdGhlci52YWx1ZXMsXG5cdFx0XHRcdChhLCBiKSA9PiBhLm1ldGhvZCA9PT0gYi5tZXRob2QgJiYgYS52YWx1ZSAmJiBiLnZhbHVlKTtcblx0XHR9XG5cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdNb2RpZnknICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0FkZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVtb3ZlJyAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdGb3JiaWQnICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlcGxhY2UnICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnVXBkYXRlJyAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT5cblx0XHRuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSkpO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlciwgYXJyYXlzRXF1YWx9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0Z1bmN0aW9uJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9CYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywgY2xhc3MgUHV0SW50b0Z1bmN0aW9uIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRlcXVhbHMob3RoZXIpIHtcblx0XHRcdHJldHVybiBhcnJheXNFcXVhbCh0aGlzLnZhbHVlcywgb3RoZXIudmFsdWVzLFxuXHRcdFx0XHQoYSwgYikgPT4gYS5tZXRob2QgPT09IGIubWV0aG9kICYmIGEudmFsdWUgJiYgYi52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KGlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ01vZGlmeScgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnQWRkJyAgICAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ0ZvcmJpZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdVcGRhdGUnICAgICAgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PlxuXHRcdG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbihbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGlzRGVmaW5lZCwgaW5kZW50LCBvbmNlUGVyLCBvLCBncmFwaERlc2NlbmRhbnRzfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICAgICAgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9ICAgICAgICAgICAgICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdEZWx0YU1vZGVsJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Db250YWluZXJQcm94eShkZWx0YUpzKTtcblxuXG5cdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGNsYXNzIERlbHRhTW9kZWwgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHR2YXIgZzEgPSB0aGlzIC5ncmFwaC50cmFuc2l0aXZlUmVkdWN0aW9uKCk7XG5cdFx0XHR2YXIgZzIgPSBvdGhlci5ncmFwaC50cmFuc2l0aXZlUmVkdWN0aW9uKCk7XG5cdFx0XHR2YXIgcmVzdWx0ID0gdHJ1ZTtcblx0XHRcdGcxLmVhY2hWZXJ0ZXgoKG4xLCBkMSkgPT4ge1xuXHRcdFx0XHRpZiAoZzIudmVydGV4VmFsdWUobjEpLmVxdWFscyhkMSkpIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKCFyZXN1bHQpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdGcyLmVhY2hWZXJ0ZXgoKG4yLCBkMikgPT4ge1xuXHRcdFx0XHRpZiAoZzEudmVydGV4VmFsdWUobjIpLmVxdWFscyhkMikpIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKCFyZXN1bHQpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdGcxLmVhY2hFZGdlKChuMUZyb20sIG4xVG8pID0+IHtcblx0XHRcdFx0aWYgKGcyLmhhc0VkZ2UobjFGcm9tLCBuMVRvKSkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIXJlc3VsdCkgeyByZXR1cm4gZmFsc2UgfVxuXHRcdFx0ZzEuZWFjaEVkZ2UoKG4yRnJvbSwgbjJUbykgPT4ge1xuXHRcdFx0XHRpZiAoZzEuaGFzRWRnZShuMkZyb20sIG4yVG8pKSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7IC8vIFRPRE86IG1vdmUgJ2VxdWFscycgbWV0aG9kIHRvIHRoZSBqcy1ncmFwaCBsaWJyYXJ5IChhbmQgbWFrZSBtb3JlIGVmZmljaWVudClcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0Y29uZmxpY3RzKCkge1xuXHRcdFx0LyogY2xvbmUgdGhlIGdyYXBoICovXG5cdFx0XHR2YXIgZyA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblxuXHRcdFx0Lyogc291cmNlIGFuZCBzaW5rIGtleXMgKi9cblx0XHRcdHZhciBzaW5rID0gJyhzaW5rKSc7XG5cdFx0XHR3aGlsZSAoZy5oYXNWZXJ0ZXgoc2luaykpIHsgc2luayA9IGAke3Npbmt9J2AgfVxuXG5cdFx0XHQvKiBjcmVhdGUgc2luayB2ZXJ0ZXgsIGNvbm5lY3QgaXQgdG8gYWxsIG90aGVyIHZlcnRpY2VzICovXG5cdFx0XHRnLmFkZE5ld1ZlcnRleChzaW5rLCBudWxsKTtcblx0XHRcdGcuZWFjaFZlcnRleCgobmFtZSkgPT4ge1xuXHRcdFx0XHRnLnNldFZlcnRleChuYW1lLCBudWxsKTtcblx0XHRcdFx0aWYgKG5hbWUgIT09IHNpbmspIHsgZy5lbnN1cmVFZGdlKG5hbWUsIHNpbmspIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiB0cmFuc2l0aXZlIHJlZHVjdGlvbiAqL1xuXHRcdFx0ZyA9IGcudHJhbnNpdGl2ZVJlZHVjdGlvbigpO1xuXG5cdFx0XHQvKiBmb3IgZWFjaCBkZWx0YSwgZ2F0aGVyIGl0cyBhbmNlc3RvcnMgYW5kIHJlZ2lzdGVyIHRocm91Z2ggd2hpY2ggcHJlZGVjZXNzb3IgdGhleSBtYXkgYmUgcmVhY2hlZCAqL1xuXHRcdFx0dmFyIHJlc29sdXRpb25zID0ge307IC8vIGZpcnN0IC0+IHNlY29uZCAtPiBwb3NzaWJsZS1yZXNvbHZpbmctZGVsdGEgLT4gdHJ1ZVxuXHRcdFx0dmFyIGdldFJlc29sdXRpb25zSW4gPSAobmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoZy52ZXJ0ZXhWYWx1ZShuYW1lKSkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGZpbmQgYW5jZXN0b3JzICovXG5cdFx0XHRcdHZhciBhbmNlc3RvcnMgPSB7fTtcblx0XHRcdFx0Zy5wcmVkZWNlc3NvcnMobmFtZSkuZm9yRWFjaCgocHJlZCkgPT4ge1xuXHRcdFx0XHRcdGdldFJlc29sdXRpb25zSW4ocHJlZCk7XG5cdFx0XHRcdFx0YW5jZXN0b3JzW3ByZWRdID0geyBbcHJlZF06IHRydWUgfTtcblx0XHRcdFx0XHR2YXIgcHJlZEFuY2VzdG9ycyA9IGcudmVydGV4VmFsdWUocHJlZCk7XG5cdFx0XHRcdFx0ZXh0ZW5kKGFuY2VzdG9yc1twcmVkXSwgLi4uT2JqZWN0LmtleXMocHJlZEFuY2VzdG9ycykubWFwKHBwcmVkID0+IHByZWRBbmNlc3RvcnNbcHByZWRdKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRnLnNldFZlcnRleChuYW1lLCBhbmNlc3RvcnMpO1xuXG5cdFx0XHRcdC8qIGZpbmQgJ2luY29tcGFyYWJsZScgZGVsdGFzLCBwbHVzIHRoZSBmaXJzdCBkZWx0YSB0aGF0IGlzICdncmVhdGVyJyB0aGFuIGJvdGggKi9cblx0XHRcdFx0T2JqZWN0LmtleXMoYW5jZXN0b3JzKS5mb3JFYWNoKChwcmVkMSkgPT4ge1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKGFuY2VzdG9ycykuZm9yRWFjaCgocHJlZDIpID0+IHtcblx0XHRcdFx0XHRcdGlmIChwcmVkMSA+PSBwcmVkMikgeyByZXR1cm4gfSAvLyBtYWtlIHN1cmUgcHJlZDEgPCBwcmVkMlxuXHRcdFx0XHRcdFx0dmFyIGFuY3MxID0gZXh0ZW5kKHt9LCBhbmNlc3RvcnNbcHJlZDFdKTtcblx0XHRcdFx0XHRcdHZhciBhbmNzMiA9IGV4dGVuZCh7fSwgYW5jZXN0b3JzW3ByZWQyXSk7XG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhhbmNzMSkuZm9yRWFjaCgoYW5jMSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhhbmNzMikuZm9yRWFjaCgoYW5jMikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChhbmMxID09PSBhbmMyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgYW5jczFbYW5jMV07XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgYW5jczJbYW5jMl07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoYW5jczEpLmZvckVhY2goKGFuYzEpID0+IHtcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoYW5jczIpLmZvckVhY2goKGFuYzIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRvKHJlc29sdXRpb25zLCAuLi5bYW5jMSwgYW5jMl0uc29ydCgpKVtuYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHRcdGdldFJlc29sdXRpb25zSW4oc2luayk7XG5cblxuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0T2JqZWN0LmtleXMocmVzb2x1dGlvbnMpLmZvckVhY2goKGZpcnN0KSA9PiB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHJlc29sdXRpb25zW2ZpcnN0XSkuZm9yRWFjaCgoc2Vjb25kKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHggPSB0aGlzLmdyYXBoLnZlcnRleFZhbHVlKGZpcnN0KTtcblx0XHRcdFx0XHR2YXIgeSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUoc2Vjb25kKTtcblx0XHRcdFx0XHRpZiAoIXguY29tcG9zZWRXaXRoKHkpLmVxdWFscyh5LmNvbXBvc2VkV2l0aCh4KSkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHsgZGVsdGFzOiBbeCwgeV0gfSk7XG5cdFx0XHRcdFx0XHQvLyBUT0RPOiBzZWUgaWYgY29uZmxpY3RzIGFyZSByZXNvbHZlZDpcblx0XHRcdFx0XHRcdC8vZ3JhcGhEZXNjZW5kYW50cyhnLCBmaXJzdFJlc29sdmVyKS5mb3JFYWNoKChyZXNvbHZlcikgPT4ge1xuXHRcdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHRcdC8vfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vIFRPRE86IHJlbW92ZSB0ZXN0IGNvZGVcblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgNCkpO1xuXG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0sIGNsYXNzIERlbHRhTW9kZWxQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgICAgICAgICAgICAgICAvLyBrZXkgLT4gb3B0aW9uc1xuXHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnMgPSB7fTsgLy8ga2V5IC0+IGFwcGxpY2F0aW9uLWNvbmRpdGlvblxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBuYW1lLCAuLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBuYW1lIGFuZC9vciBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBvcHRpb25zIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuRGVsdGFNb2RlbCBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm5hbWUpIHsgb3B0aW9ucy5uYW1lID0gYXJnICAgfVxuXHRcdFx0XHRcdGVsc2UgICAgICAgICAgICAgICB7IG9wdGlvbnMucGF0aCA9IGFyZyAgIH1cblx0XHRcdFx0fSBlbHNlICAgICAgICAgICAgICAgICB7IGV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGggfHwgIW9wdGlvbnMubmFtZSk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHt7cGF0aDogUGF0aCwgbmFtZTogc3RyaW5nLCBmZWF0dXJlOiBib29sZWFufX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRoLCBuYW1lLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIGNyZWF0ZSBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsIGVwb255bW91cyBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHRsZXQgYXBwQ29uZDtcblx0XHRcdFx0aWYgKGZlYXR1cmUpIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBleHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgZmVhdHVyZTogZmFsc2UgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zWydyZXF1aXJlcyddKSkge1xuXHRcdFx0XHRcdGFwcENvbmQuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZmVhdHVyZSB8fCBhcHBDb25kLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSBhcHBDb25kO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdID0gYXBwQ29uZDtcblx0XHRcdH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IG5hbWU6IHVuZGVmaW5lZCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSBvcHRpb25zICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0gPSBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5jbGVhcigpO1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGxldCBvcHRpb25zID0gdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8qIGRlbHRhIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzLmNoaWxkRGVsdGEobmFtZSk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGEpO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIG9yZGVyICovXG5cdFx0XHRcdFsgLi4ub3B0aW9uc1sncmVzb2x2ZXMnXXx8W10sIC4uLm9wdGlvbnNbJ2FmdGVyJ118fFtdLCAuLi5vcHRpb25zWydyZXF1aXJlcyddfHxbXSBdLmZvckVhY2goKHN1Yk5hbWUpID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguY3JlYXRlRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gY29uZGl0aW9uICovXG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0uY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWxcblx0KSwgdHJ1ZSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYSwgYXNzZXJ0LCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9ICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdmZWF0dXJlcycsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRvbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG5hbWUgICAge3N0cmluZ30gIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqL1xuXHRcdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFx0YXNzZXJ0KGlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdFx0LyogY3JlYXRlIHRoZSBuZXcgZmVhdHVyZSAqL1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0YShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdGEoX29ubHlJZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGNvbmp1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRSZXF1aXJlZEJ5KGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRkbyB7XG5cdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIV9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdGlmIChpc1VuZGVmaW5lZChfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSkgeyBfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gY2xhc3MgRmVhdHVyZSB7XG5cdFx0Y29uc3RydWN0b3IobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdGlmIChfc2VsZWN0ZWRbdGhpcy5uYW1lXSAmJiAhX2FsbG93ZWRbdGhpcy5uYW1lXSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3NlbGVjdGVkW3RoaXMubmFtZV07XG5cdFx0fVxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgIH1cblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBhKF9pZiwgICAgIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9XG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gYShfb25seUlmLCB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfVxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH07XG5cblxuXHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdGNvbnN0IEZFQVRVUkVfQ09OTkVDVElPTlMgPSBbXG5cdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRbICdzZWxlY3RzJywgICAgW19hZGRTZWxlY3RzLCBfYWRkT25seUlmXSAgICAgICAgICAgIF0sIC8vIG90aGVyIHNlbGVjdGVkIGJ5IHRoaXNcblx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRdO1xuXHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAobmFtZSA9PT0gbikge1xuXHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdH07XG5cdH0pO1xuXG5cblx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGFNb2RlbCBmcm9tICcuL0RlbHRhTW9kZWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ3ZhcmlhdGlvbiBwb2ludHMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAndmFyaWF0aW9uIHBvaW50cycsICgpID0+IHtcblxuXHRcdGRlZmluZV9EZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdFx0ZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdFx0ICovXG5cdFx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHRcdHRoaXMuX2RlbHRhTW9kZWxQcm94eS5kZWx0YSgpLmFwcGx5VG8ocm9vdCwge1xuXHRcdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCByZXR1cm5zIHRoZSBwcm94eSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHRcdCAqIG92ZXJ3cml0dGVuIG1hbnVhbGx5LlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX0gLSB0aGUgcHJveHkgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdFx0ICovXG5cdFx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsUHJveHkuZG8oeyBmZWF0dXJlOiB0cnVlIH0sIC4uLmFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsUHJveHkgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCkuZG8oKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnYXBwbGljYXRpb24gY29uZGl0aW9ucycsICgpID0+IHtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmZWF0dXJlKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3QoLi4uZmVhdHVyZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdGV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblx0XHRnZXQgc2VsZWN0ZWQoKSB7IHJldHVybiBpc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkIH1cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYSwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuaW1wb3J0IHtNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gICAgICBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdDb250YWluZXJQcm94eScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfUHJveHkoZGVsdGFKcyk7XG5cblxuXHQvKiBhIFByb3h5IGNsYXNzIGZvciBjb250YWluZXIgb3BlcmF0aW9uIHR5cGVzIGxpa2UgTW9kaWZ5IGFuZCBEZWx0YU1vZGVsICovXG5cdGRlbHRhSnMuQ29udGFpbmVyUHJveHkgPSBjbGFzcyBDb250YWluZXJQcm94eSBleHRlbmRzIGRlbHRhSnMuUHJveHkge1xuXG5cdFx0Ly8gQSBQcm94eSBpbnN0YW5jZSBleHBvc2VzIG9wZXJhdGlvbiBtZXRob2RzIGRpcmVjdGx5LiBBcmd1bWVudHNcblx0XHQvLyB0byB0aG9zZSBvcGVyYXRpb25zIGNhbiBiZSBwcmUtc3VwcGxpZWQgdGhyb3VnaCB0aGUgYGRvYCBtZXRob2QuXG5cblx0XHRjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcblx0XHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdFx0dGhpcy5fZG9BcmdzICAgICAgID0gW107XG5cdFx0XHR0aGlzLl9vcmlnaW5hbCAgICAgPSB0aGlzO1xuXHRcdFx0dGhpcy5fY2hpbGRyZW4gICAgID0ge307IC8vIGtleSAtPiBbcHJveGllc11cblx0XHRcdHRoaXMuX2NoaWxkT3B0aW9ucyA9IHt9OyAvLyBrZXkgLT4gb3B0aW9uc1xuXHRcdH1cblxuXG5cdFx0ZGVhY3RpdmF0ZSgpIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jaGlsZFByb3h5KGtleSkuZGVhY3RpdmF0ZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRzdXBlci5kZWFjdGl2YXRlKCk7XG5cdFx0fVxuXG5cblx0XHRhZGRDaGlsZFByb3h5KGtleSwgZGVsdGEpIHtcblx0XHRcdC8qIGdldCB0aGUgY3VycmVudCBwcm94eSBmb3IgdGhlIGdpdmVuIGtleSAqL1xuXHRcdFx0dmFyIGN1cnJlbnQgPSB0aGlzLmNoaWxkUHJveHkoa2V5KTtcblxuXHRcdFx0LyogZ2V0IC8gY3JlYXRlIGRlbHRhIHByb3h5ICovXG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IGRlbHRhLmNvbnN0cnVjdG9yLlByb3h5IHx8IGRlbHRhSnMuUHJveHk7XG5cdFx0XHR2YXIgcHJveHkgPSBuZXcgUHJveHlDbGFzcyh7IGRlbHRhLCBwYXJlbnQ6IHRoaXMgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY3VycmVudCBwcm94eSBpZiBpdCwgYW5kIHRoZSBjdXJyZW50IHByb3h5LCBhcmUgYm90aCBNb2RpZnkuUHJveHkgKi9cblx0XHRcdGlmIChjdXJyZW50IGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkgJiZcblx0XHRcdFx0cHJveHkgICBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5KSB7IHJldHVybiBjdXJyZW50IH1cblxuXHRcdFx0Lyogd2UgbmVlZCBhIG5ldyBwcm94eSwgc28gZGVhY3RpdmF0ZSB0aGUgY3VycmVudCBvbmUgKi9cblx0XHRcdGlmIChjdXJyZW50KSB7IGN1cnJlbnQuZGVhY3RpdmF0ZSgpIH1cblxuXHRcdFx0LyogY3JlYXRlIGEgbmV3IFByb3h5IG9mIHRoZSByaWdodCBjbGFzcywgcmVtZW1iZXIgaXQgYW5kIHJldHVybiBpdCAqL1xuXHRcdFx0dGhpcy5fY2hpbGRyZW5ba2V5XS5wdXNoKHByb3h5KTtcblx0XHRcdHJldHVybiBwcm94eTtcblx0XHR9XG5cblxuXHRcdGNoaWxkS2V5cygpIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKSB9XG5cblxuXHRcdGNoaWxkUHJveGllcyhrZXkpIHsgcmV0dXJuIGEodGhpcy5fY2hpbGRyZW4sIGtleSkgfVxuXG5cblx0XHRjaGlsZFByb3h5KGtleSkgeyByZXR1cm4gYSh0aGlzLl9jaGlsZHJlbiwga2V5KVt0aGlzLl9jaGlsZHJlbltrZXldLmxlbmd0aC0xXSB9XG5cblxuXHRcdGNoaWxkRGVsdGEoa2V5KSB7XG5cdFx0XHRyZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZChcblx0XHRcdFx0Li4udGhpcy5jaGlsZFByb3hpZXMoa2V5KS5tYXAocHJveHkgPT4gcHJveHkuZGVsdGEoKSlcblx0XHRcdCk7XG5cdFx0fVxuXG5cblx0XHRkbyguLi5kb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIHJldHVybiBhIHZlcnNpb24gb2YgdGhpcyBQcm94eSB3aXRoIGV4dHJhIHByZWxvYWRlZCBhcmdzICovXG5cdFx0XHQvLyBub3RlIHRoYXQgdGhpcyBtaXhlcyBwcm90b3R5cGljYWwgaW5oZXJpdGFuY2Vcblx0XHRcdC8vIGludG8gdGhlIGV4aXN0aW5nIGNsYXNzaWNhbCBpbmhlcml0YW5jZSBzY2hlbWVcblx0XHRcdHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuXHRcdFx0cmVzdWx0Ll9kb0FyZ3MgICA9IFsuLi50aGlzLl9kb0FyZ3MsIC4uLmRvQXJnc107XG5cdFx0XHRyZXN1bHQuX29yaWdpbmFsID0gdGhpcy5fb3JpZ2luYWw7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRfZG8obWV0aG9kLCBkb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIGNvbnRhaW5lci1zcGVjaWZpYyBwcm9jZXNzaW5nIG9mIGFyZ3VtZW50cyAqL1xuXHRcdFx0dmFyIHtvcHRpb25zLCBhcmdzfSA9IHRoaXMucHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzKTtcblxuXHRcdFx0LyogaWYgdGhlIG9wdGlvbnMgY29udGFpbiBhIHBhdGgsIHJlaWZ5IGl0ICovXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMucGF0aCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0b3B0aW9ucy5wYXRoID0gbmV3IFBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGhlIGFyZ3VtZW50IGxpc3QgaXMgZmluaXNoZWQ7IGNyZWF0ZSBhIG5ldyBkZWx0YSBhbmQgcHV0IGl0IGluIHRoZSByaWdodCBwbGFjZSAqL1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpO1xuXHRcdFx0dmFyIHByb3h5ID0gdGhpcy5hZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJpZ2h0IFByb3h5IGluc3RhbmNlIGZvciBjaGFpbmluZyAqL1xuXHRcdFx0cmV0dXJuIChwcm94eSBpbnN0YW5jZW9mIGRlbHRhSnMuQ29udGFpbmVyUHJveHkpID8gcHJveHkgOiB0aGlzO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gZXh0cmFjdCBhblxuXHRcdCAqIG9wdGlvbnMgb2JqZWN0LCBwYXRoIGFuZCBmaW5hbCBhcmd1bWVudCBsaXN0IGZyb20gYSBnaXZlbiAncmF3JyBhcmd1bWVudCBsaXN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGFyZ3Mge1sqXX1cblx0XHQgKiBAcmV0dXJuIHt7b3B0aW9uczogT2JqZWN0LCBhcmdzOiBbKl19fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cygpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ3Byb2Nlc3NQcm94eUFyZ3VtZW50cycgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGFkZCBhIGdpdmVuIGRlbHRhXG5cdFx0ICogdW5kZXIgYSBnaXZlbiBwYXRoIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMsIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgUHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnYWRkT3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIENyZWF0ZSBhIGRlbHRhIGJhc2VkIG9uIGEgbWV0aG9kLW5hbWUgYW5kIGFyZ3VtZW50LWxpc3QuXG5cdFx0ICogSWYgdGhlIG1ldGhvZC1uYW1lIGlzIG92ZXJsb2FkZWQsIHlvdSdsbCBhdXRvbWF0aWNhbGx5IGdldFxuXHRcdCAqIGFuIGBEZWx0YS5PdmVybG9hZGVkYCBpbnN0YW5jZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXJncyAgIHtbKl19XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRzdGF0aWMgX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbWV0aG9kSGFuZGxlcnNbbWV0aG9kXS5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKC4uLmFyZ3MpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHRkZWZpbmVfT3ZlcmxvYWRlZChkZWx0YUpzKTtcblx0XHRcdFx0cmV0dXJuIG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQobmV3RGVsdGFzKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0XHQgKiBAcGFyYW0gaGFuZGxlciB7RnVuY3Rpb259IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIG1ldGhvZCBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgbmV3IGBEZWx0YUpzI0RlbHRhYCBpbnN0YW5jZVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblxuXHRcdFx0LyogYXV0b21hdGljYWxseSBwb3B1bGF0ZSB0aGUgUHJveHkgY2xhc3Mgd2l0aCBuZXcgb3BlcmF0aW9uIG1ldGhvZCAqL1xuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0pKSB7XG5cdFx0XHRcdGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9kbyhtZXRob2QsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZWdpc3RlciBoYW5kbGVycyBmb3IgZWFjaCBtZXRob2QgKi9cblx0XHRcdGEoZGVsdGFKcy5Db250YWluZXJQcm94eSwgJ19tZXRob2RIYW5kbGVycycsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblxuXHRcdH1cblxuXG5cdH07XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Db250YWluZXJQcm94eS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpbmRlbnQsIG9uY2VQZXIsIGFycmF5c0VxdWFsfSBmcm9tICcuL3V0aWwuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ0NvbXBvc2VkJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdC8vIE5PVEU6IE5vdCBpbXBvcnRpbmcgdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kgZGVsdGFKcy5EZWx0YSBoZXJlLlxuXHQvLyAgICAgICBUaGF0IGZpbGUgd2lsbCBpbXBvcnQgdGhpcyBvbmUgYXQgdGhlIHByb3BlciB0aW1lLlxuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdDb21wb3NlZCcsIGNsYXNzIENvbXBvc2VkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuX2NvbXBvbmVudHMgPSB0aGlzLmFyZyB8fCBbXTtcblx0XHR9XG5cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Ll9jb21wb25lbnRzID0gdGhpcy5fY29tcG9uZW50cy5tYXAoKGRlbHRhKSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXlzRXF1YWwodGhpcy5fY29tcG9uZW50cywgb3RoZXIuX2NvbXBvbmVudHMsIChkMSwgZDIpID0+IGQxLmVxdWFscyhkMikpO1xuXHRcdH1cblxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuX2NvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50cykgPT4ge1xuXHRcdFx0XHRjb21wb25lbnRzLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5fY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBg4oCiICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRpZiAodGhpcy5fY29tcG9uZW50cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbMF0ucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0fVxuXG5cdFx0X2NvbGxhcHNlKCkge1xuXHRcdFx0LyogZmxhdHRlbiBDb21wb3NlZCB0aGF0IGFyZSBpbnNpZGUgQ29tcG9zZWQgKi9cblx0XHRcdHRoaXMuX2NvbXBvbmVudHMgPSAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgbmV3Q29tcG9uZW50cyA9IFtdO1xuXHRcdFx0XHR0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGRlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCkge1xuXHRcdFx0XHRcdFx0ZGVsdGEuX2NvbGxhcHNlKCk7XG5cdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goLi4uZGVsdGEuX2NvbXBvbmVudHMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBuZXdDb21wb25lbnRzO1xuXHRcdFx0fSkoKTtcblxuXHRcdFx0LyogY29tcG9zZSBuZWlnaGJvdXJpbmcgcGFpcnMgd2hlcmUgcG9zc2libGUgKi9cblx0XHRcdGxldCBjaGFuZ2VkO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRjaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuX2NvbXBvbmVudHMgPSAoKCkgPT4ge1xuXHRcdFx0XHRcdGxldCBuZXdDb21wb25lbnRzID0gW107XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb21wb25lbnRzLmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuXHRcdFx0XHRcdFx0bGV0IGNvbXBvc2VkUGFpciA9IHRoaXMuX2NvbXBvbmVudHNbaV0uY29tcG9zZWRXaXRoKHRoaXMuX2NvbXBvbmVudHNbaSsxXSk7XG5cdFx0XHRcdFx0XHRpZiAoY29tcG9zZWRQYWlyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCkge1xuXHRcdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2godGhpcy5fY29tcG9uZW50c1tpXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRuZXdDb21wb25lbnRzLnB1c2goY29tcG9zZWRQYWlyKTtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGkgKz0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGkgPT09IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKHRoaXMuX2NvbXBvbmVudHNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbmV3Q29tcG9uZW50cztcblx0XHRcdFx0fSkoKTtcblx0XHRcdH0gd2hpbGUgKGNoYW5nZWQpO1xuXHRcdH1cblxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdFx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQgPyBkMS5fY29tcG9uZW50cyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkID8gZDIuX2NvbXBvbmVudHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Db21wb3NlZChbLi4uRDEsIC4uLkQyXSk7XG5cdFx0cmVzdWx0Ll9jb2xsYXBzZSgpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ29tcG9zZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdQcm94eScsIChkZWx0YUpzKSA9PiB7XG5cblxuXHRkZWZpbmVfRGVsdGEoZGVsdGFKcyk7XG5cblxuXHRkZWx0YUpzLlByb3h5ID0gY2xhc3MgUHJveHkge1xuXHRcdGNvbnN0cnVjdG9yKHtwYXJlbnQsIGRlbHRhfSA9IHt9KSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5fZGVsdGEgPSBkZWx0YTtcblx0XHR9XG5cdFx0ZGVsdGEoKSB7IHJldHVybiB0aGlzLl9kZWx0YTsgfVxuXHRcdGdldCBhY3RpdmUoKSB7IHJldHVybiB0aGlzLl9hY3RpdmUgfVxuXHRcdGRlYWN0aXZhdGUoKSB7IHRoaXMuX2FjdGl2ZSA9IGZhbHNlIH1cblx0fTtcblxuXG5cdGV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBhcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IHRoaXMuY29uc3RydWN0b3IuUHJveHk7XG5cdFx0XHRpZiAoIVByb3h5Q2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nICdkbycgb24gZGVsdGEgdHlwZSAnJHt0aGlzLnR5cGV9Jywgd2hpY2ggaGFzIG5vIFByb3h5IGludGVyZmFjZS5gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJveHlDbGFzcyh7IGRlbHRhOiB0aGlzIH0pLmRvKC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1Byb3h5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==