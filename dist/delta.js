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
	var PreconditionFailure = _ErrorJs.PreconditionFailure;
	var MultipleOverloadsApplicationError = _ErrorJs.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorJs.NoOverloadsApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	var MultipleOverloadsCompositionError = _ErrorJs.MultipleOverloadsCompositionError;
	var ConstraintFailure = _ErrorJs.ConstraintFailure;
	var ApplicationOrderCycle = _ErrorJs.ApplicationOrderCycle;
	var UnresolvedDeltaConflict = _ErrorJs.UnresolvedDeltaConflict;
	var MultipleActiveProxiesError = _ErrorJs.MultipleActiveProxiesError;
	
	extend(DeltaJs, { ApplicationError: ApplicationError, PreconditionFailure: PreconditionFailure, MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
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
	exports.customIndexOf = customIndexOf;
	exports.arraysEqual = arraysEqual;
	exports.arraysHaveSameElements = arraysHaveSameElements;
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
	
	function customIndexOf(a, value) {
		var eq = arguments[2] === undefined ? function (x, y) {
			return x === y;
		} : arguments[2];
	
		for (var i = 0; i < a.length; ++i) {
			if (eq(a[i], value)) {
				return i;
			}
		}
		return -1;
	}
	
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
	
	function arraysHaveSameElements(a, b) {
		var eq = arguments[2] === undefined ? function (x, y) {
			return x === y;
		} : arguments[2];
	
		if (a.length !== b.length) {
			return false;
		}
		var bb = [].concat(_toConsumableArray(b));
		for (var i = 0; i < a.length; ++i) {
			var found = false;
			for (var j = 0; j < bb.length; ++j) {
				if (eq(a[i], bb[j])) {
					bb.splice(j, 1);
					found = true;
					break;
				}
			}
			if (!found) {
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
	
					/* fetch certain given methods (if they exist) that need to be slightly augmented */
					var givenApplyTo = DeltaClass.prototype.applyTo || function () {};
					var givenRefines = DeltaClass.prototype.refines;
					var givenEquals = DeltaClass.prototype.equals;
					var givenCommutesWith = DeltaClass.prototype.commutesWith;
					var givenResolves = DeltaClass.prototype.resolves;
	
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
						refines: function refines(other) {
							if (this.type !== other.type) {
								return false;
							}
							if (isDefined(givenRefines)) {
								return givenRefines.call(this, other);
							} else {
								return this.equals(other);
							}
						},
						equals: function equals(other) {
							if (this.type !== other.type) {
								return false;
							}
							if (isDefined(givenEquals)) {
								return givenEquals.call(this, other);
							} else if (isDefined(givenRefines)) {
								return this.refines(other) && other.refines(this);
							} else {
								return arraysEqual(this.args, other.args);
							}
						},
						commutesWith: function commutesWith(other) {
							if (isDefined(givenCommutesWith)) {
								return givenCommutesWith.call(this, other);
							} else {
								return this.composedWith(other).equals(other.composedWith(this));
							}
						},
						resolves: function resolves(d1, d2) {
							if (isDefined(givenResolves)) {
								return givenResolves.call(this, d1, d2);
							} else {
								return d1.composedWith(d2).composedWith(this).equals(d2.composedWith(d1).composedWith(this));
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
		function ApplicationError() {
			_classCallCheck(this, ApplicationError);
	
			if (Error != null) {
				Error.apply(this, arguments);
			}
		}
	
		_inherits(ApplicationError, Error);
	
		return ApplicationError;
	})(Error);
	
	var PreconditionFailure = exports.PreconditionFailure = (function (ApplicationError) {
		function PreconditionFailure(delta, value) {
			_classCallCheck(this, PreconditionFailure);
	
			_get(Object.getPrototypeOf(PreconditionFailure.prototype), "constructor", this).call(this);
			this.name = "PreconditionFailure";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		}
	
		_inherits(PreconditionFailure, ApplicationError);
	
		return PreconditionFailure;
	})(ApplicationError);
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = (function (PreconditionFailure) {
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
	
		_inherits(MultipleOverloadsApplicationError, PreconditionFailure);
	
		return MultipleOverloadsApplicationError;
	})(PreconditionFailure);
	
	var NoOverloadsApplicationError = exports.NoOverloadsApplicationError = (function (PreconditionFailure) {
		function NoOverloadsApplicationError(delta, value) {
			_classCallCheck(this, NoOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(NoOverloadsApplicationError.prototype), "constructor", this).call(this, delta, value);
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no specific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		}
	
		_inherits(NoOverloadsApplicationError, PreconditionFailure);
	
		return NoOverloadsApplicationError;
	})(PreconditionFailure);
	
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
	
	var UnresolvedDeltaConflict = exports.UnresolvedDeltaConflict = (function (ApplicationError) {
		function UnresolvedDeltaConflict(deltaNames) {
			_classCallCheck(this, UnresolvedDeltaConflict);
	
			_get(Object.getPrototypeOf(UnresolvedDeltaConflict.prototype), "constructor", this).call(this);
			this.name = "UnresolvedDeltaConflict";
			var nameList = deltaNames.slice(0, -1).map(function (name) {
				return "'" + name + "'";
			}).join(",");
			this.message = "There is an unresolved conflict between deltas " + nameList + " and '" + deltaNames[deltaNames.length - 1] + "'.";
			this.deltaNames = deltaNames;
		}
	
		_inherits(UnresolvedDeltaConflict, ApplicationError);
	
		return UnresolvedDeltaConflict;
	})(ApplicationError);
	
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
	
	var PreconditionFailure = _ErrorJs.PreconditionFailure;
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
	     * @return {Boolean|PreconditionFailure} - `true` if the precondition is satisfied, otherwise
	     *                                        `false` or an instance of `DeltaJs.PreconditionFailure`
	     */
	
					value: function evaluatePrecondition(target) {
						if (this.precondition) {
							var judgment = this.precondition(target);
							if (judgment instanceof PreconditionFailure) {
								return judgment;
							} else if (!judgment) {
								return new PreconditionFailure(this, target.value);
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
	var arraysHaveSameElements = _utilJs.arraysHaveSameElements;
	var customIndexOf = _utilJs.customIndexOf;
	
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
				refines: {
					value: function refines(other) {
						/* define operation equality */
						var eq = function (x, y) {
							return x.method === y.method && x.value === y.value;
						};
	
						/* both need to at least have the same operations (not necessarily in the same order) */
						if (!arraysHaveSameElements(this.values, other.values, eq)) {
							return false;
						}
	
						/* appensions and prepensions need to be in the same order */
						if (!arraysEqual(this.values.filter(function (v) {
							return v.method === "append";
						}), other.values.filter(function (v) {
							return v.method === "append";
						}), eq)) {
							return false;
						}
						if (!arraysEqual(this.values.filter(function (v) {
							return v.method === "prepend";
						}), other.values.filter(function (v) {
							return v.method === "prepend";
						}), eq)) {
							return false;
						}
	
						/* insertions in 'this' cannot come later than their counterparts in 'other', */
						/* in the sense of appensions and prepensions that have come before it        */
						var appensionsAndPrepensionsSeen = [];
						for (var i = 0; i < this.values.length; ++i) {
							if (this.values[i].method === "insert") {
								var ind = customIndexOf(other.values, this.values[i], eq);
								var appensionsAndPrepensionsToGo = [].concat(appensionsAndPrepensionsSeen);
								for (var j = 0; j <= ind; ++j) {
									var indd = customIndexOf(appensionsAndPrepensionsToGo, other.values[j], eq);
									if (indd > -1) {
										appensionsAndPrepensionsToGo.splice(indd, 1);
									}
								}
								if (appensionsAndPrepensionsToGo.length > 0) {
									return false;
								}
							} else {
								appensionsAndPrepensionsSeen.push(this.values[i]);
							}
						}
	
						/* OK, it's a refinement */
						return true;
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
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationOrderCycle = _ErrorJs.ApplicationOrderCycle;
	var UnresolvedDeltaConflict = _ErrorJs.UnresolvedDeltaConflict;
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
				_assertNoUnresolvedConflicts: {
					value: function _assertNoUnresolvedConflicts() {
						var conflicts = this.conflicts();
						conflicts.forEach(function (conflictInfo) {
							if (conflictInfo.conflictResolvingDeltas.length === 0) {
								throw new UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
							}
						});
					},
					writable: true,
					configurable: true
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						/* throw an exception if there are unresolved conflicts */
						this._assertNoUnresolvedConflicts();
	
						/* no unresolved conflicts: apply the delta model */
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
	
						/* find all pairs of 'incomparable' deltas, plus the closest deltas that are 'greater' than both */
						var resolutions = {}; // first -> second -> possible-resolving-delta -> true
						var getResolutionsIn = function (name) {
							if (g.vertexValue(name)) {
								return;
							}
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
	
						/* out of the incomparable deltas, find those that are actually in conflict, and find any */
						var result = [];
						Object.keys(resolutions).forEach(function (first) {
							Object.keys(resolutions[first]).forEach(function (second) {
								var x = _this.graph.vertexValue(first);
								var y = _this.graph.vertexValue(second);
								if (!x.commutesWith(y)) {
									var conflictInfo = {
										conflictingDeltas: [first, second],
										conflictResolvingDeltas: []
									};
									Object.keys(resolutions[first][second]).forEach(function (resolver) {
										graphDescendants(g, resolver).forEach(function (resolver) {
											var z = _this.graph.vertexValue(resolver);
											if (resolver !== sink) {
												if (z.resolves(x, y)) {
													conflictInfo.conflictResolvingDeltas.push(resolver);
												}
											}
										});
									});
									result.push(conflictInfo);
								}
							});
						});
	
						/* return the conflict results */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYjU5NDVjYTFjY2RiYzM0NjUwOCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFfY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL092ZXJsb2FkZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9QdXRJbnRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9Db250YWluZXJQcm94eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ29tcG9zZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1Byb3h5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtB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TyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFNLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU07T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtPQUFFLEVBQUUsUUFBRixFQUFFO1VBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUUsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxLQUFLLENBQUssRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxDQUEwQyxDQUFDO0FBQ2hHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFF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QUFFLE1BQU0sRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQzNHLFNBQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFHLFVBQUMsS0FBSztVQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFHLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FBQzs7O0FBSTNHLE1BQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQixTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVEsY0FBYyxDQUFDLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBVyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFNO09BQUUsRUFBRSxRQUFGLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFFLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxTQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQVEsY0FBYyxDQUFDLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQzFHLFNBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBTyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO09BQUUsRUFBRSxRQUFGLEVBQUU7T0FBRSxFQUFFLFFBQUYsRUFBRTtVQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0dBQUEsQ0FBQyxDQUFFLENBQUM7QUFDMUcsU0FBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FB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QUFDO0FBQ3hDLFFBQUksQ0FBQyxVQUFVLEVBQUU7QUFDaEIsV0FBTSxJQUFJLEtBQUssa0NBQWdDLElBQUksQ0FBQyxJQUFJLHNDQUFtQyxDQUFDO0tBQzVGO0FBQ0QsV0FBTyxZQUFJLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFHLE9BQUksSUFBSSxDQUFDLENBQUM7SUFDbkQ7O0dBRUQsQ0FBQyxDQUFDO0VBR0gsQ0FBQyxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBiNTk0NWNhMWNjZGJjMzQ2NTA4XG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IHtleHRlbmR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBQcmVjb25kaXRpb25GYWlsdXJlLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBQcmVjb25kaXRpb25GYWlsdXJlLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCIvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG4vKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG4vKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvYmoxO1xufVxuXG5cbmZ1bmN0aW9uIGRmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0dmFyIGxhc3QgPSBvKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRpZiAoaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHR9XG5cdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfVxuZXhwb3J0IGZ1bmN0aW9uIGEob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBkZmF1bHQob2JqZWN0LCAuLi5rZXlzLCBbXSkgfVxuXG5cbi8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cbn1cblxuXG4vKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG5cbi8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cblxuLyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0KG5yLCBzdHIpIHtcblx0cmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cik7XG59XG5cblxuLyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCByZXBlYXQoYW1vdW50LCBjaGFyKSk7XG59XG5cblxuLyogcnVuIGEgZnVuY3Rpb24gb25seSBvbmNlIHBlciBvYmorc3RyaW5nIGNvbWJvICovXG5leHBvcnQgZnVuY3Rpb24gb25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0dmFyIG9wZm4gPSAob2JqKSA9PiB7XG5cdFx0dmFyIHAgPSBgX29uY2UgcGVyOiAke2tleX1gO1xuXHRcdGlmIChvYmpbcF0pIHsgcmV0dXJuIH1cblx0XHRvYmpbcF0gPSB0cnVlOyAvLyBUT0RPOiBtYWtlIG5vbi1lbnVtZXJhdGFibGUsIG9yIHVzZSBFUzYgU3ltYm9sXG5cdFx0cmV0dXJuIGZuLmNhbGwob2JqLCBvYmopO1xuXHR9O1xuXHRpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcblx0XHRba2V5LCBmbl0gPSBbb2JqLCBrZXldO1xuXHRcdHJldHVybiBvcGZuO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBvcGZuKG9iaik7XG5cdH1cbn1cblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBwcmVjb25kaXRpb25zICovXG5leHBvcnQgdmFyIHQgPSAodHlwZTEsIHR5cGUyKSA9PiB7XG5cdHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpO1xufTtcblxuXG4vKiBzaG9ydGhhbmQgc3BlY2lmaWVyIGZvciBjb21wb3NpdGlvbiBpbXBsZW1lbnRhdGlvbnMgKi9cbmV4cG9ydCB2YXIgZGVmaW5lX2QgPSAoZGVsdGFKcykgPT4gKHR5cGUsIGZuKSA9PiB7XG5cdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21JbmRleE9mKGEsIHZhbHVlLCBlcT0oeCx5KT0+eD09PXkpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG5cdFx0aWYgKGVxKGFbaV0sIHZhbHVlKSkgeyByZXR1cm4gaSB9XG5cdH1cblx0cmV0dXJuIC0xO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheXNFcXVhbChhLCBiLCBlcT0oeCx5KT0+eD09PXkpIHtcblx0aWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgeyByZXR1cm4gZmFsc2UgfVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAoIWVxKGFbaV0sIGJbaV0pKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5c0hhdmVTYW1lRWxlbWVudHMoYSwgYiwgZXE9KHgseSk9Png9PT15KSB7XG5cdGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlIH1cblx0dmFyIGJiID0gWy4uLmJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcblx0XHR2YXIgZm91bmQgPSBmYWxzZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGJiLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRpZiAoZXEoYVtpXSwgYmJbal0pKSB7XG5cdFx0XHRcdGJiLnNwbGljZShqLCAxKTtcblx0XHRcdFx0Zm91bmQgPSB0cnVlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCFmb3VuZCkgeyByZXR1cm4gZmFsc2UgfVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RzRXF1YWwoYSwgYiwgZXE9KHgseSk9Png9PT15KSB7XG5cdHZhciBhS2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuXHR2YXIgYktleXMgPSBPYmplY3Qua2V5cyhiKTtcblx0aWYgKGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoKSB7IHJldHVybiBmYWxzZSB9XG5cdGFLZXlzLnNvcnQoKTtcblx0YktleXMuc29ydCgpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGFLZXlzLmxlbmd0aDsgKytpKSB7XG5cdFx0aWYgKGFLZXlzW2ldICE9PSBiS2V5c1tpXSkgICAgICAgICB7IHJldHVybiBmYWxzZSB9XG5cdFx0aWYgKCFlcShhW2FLZXlzW2ldXSwgYltiS2V5c1tpXV0pKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYXBoRGVzY2VuZGFudHMoZ3JhcGgsIGtleSkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMoKGZ1bmN0aW9uIHN1Y2NEZXNjZW5kYW50cyhrZXkpIHtcblx0XHRyZXR1cm4gZXh0ZW5kKHsgW2tleV06IHRydWUgfSwgLi4uZ3JhcGguc3VjY2Vzc29ycyhrZXkpLm1hcChzdWNjID0+IHN1Y2NEZXNjZW5kYW50cyhzdWNjKSkpO1xuXHR9KShrZXkpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgYXNzZXJ0LCBpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCBhcnJheXNFcXVhbH0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCBkZWZpbmVfT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lX01vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX2Jhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1B1dEludG9BcnJheSAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lX1B1dEludG9GdW5jdGlvbiAgICAgICAgICAgICAgICAgICBmcm9tICcuL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhTW9kZWwgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhTW9kZWwuanMnO1xuaW1wb3J0IGRlZmluZV9mZWF0dXJlcyAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lX3ZhcmlhdGlvblBvaW50cyAgICAgICAgICAgICAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lX2FwcGxpY2F0aW9uQ29uZGl0aW9ucyAgICAgICAgICAgICBmcm9tICcuL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0NvbnRhaW5lclByb3h5LmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzXG4gKiBhbmQgYWN0cyBhcyBhIGZhY2FkZSAoYXMgaW4gZGVzaWduIHBhdHRlcm4pIHRvIHRoZSBtb3JlIHNwZWNpZmljXG4gKiBzdWJzeXN0ZW1zIG9mIGRlbHRhLmpzLlxuICpcbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBEZWx0YUpzIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFKcyB7XG5cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkZWZpbmVfQ29udGFpbmVyUHJveHkgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX092ZXJsb2FkZWQgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfTW9kaWZ5ICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX1B1dEludG9BcnJheSAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfUHV0SW50b0Z1bmN0aW9uICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9EZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lX2ZlYXR1cmVzICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVfdmFyaWF0aW9uUG9pbnRzICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZV9hcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICAge3N0cmluZ30gICAtIG5hbWUgb2YgdGhlIG5ldyBvcGVyYXRpb24gdHlwZVxuXHQgKiBAcGFyYW0gRGVsdGFDbGFzcyB7RnVuY3Rpb259IC0gdGhlIG5ldyBvcGVyYXRpb24gY2xhc3Ncblx0ICogQHBhcmFtIFByb3h5Q2xhc3Mgez9GdW5jdGlvbn0gLSB0aGUgb3B0aW9uYWwgY3VzdG9tIFByb3h5IHN1YmNsYXNzIGZvciB0aGlzIG9wZXJhdGlvbi10eXBlXG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKG5hbWUsIERlbHRhQ2xhc3MsIFByb3h5Q2xhc3MpIHtcblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0YXNzZXJ0KG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSxcblx0XHRcdGBEZWx0YSBvcGVyYXRpb24gY2xhc3NlcyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtICcke25hbWV9JyBkb2VzIG5vdC5gKTtcblx0XHRhc3NlcnQoaXNVbmRlZmluZWQodGhpcy5EZWx0YVtuYW1lXSksXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIHN0b3JlIHRoZSBvcGVyYXRpb24gY2xhc3MgKi9cblx0XHR0aGlzLkRlbHRhW25hbWVdID0gRGVsdGFDbGFzcztcblxuXHRcdC8qIHNldCB0aGUgKG9wdGlvbmFsKSBQcm94eSBjbGFzcyAqL1xuXHRcdERlbHRhQ2xhc3MuUHJveHkgPSBQcm94eUNsYXNzO1xuXG5cdFx0LyogZmV0Y2ggY2VydGFpbiBnaXZlbiBtZXRob2RzIChpZiB0aGV5IGV4aXN0KSB0aGF0IG5lZWQgdG8gYmUgc2xpZ2h0bHkgYXVnbWVudGVkICovXG5cdFx0dmFyIGdpdmVuQXBwbHlUbyAgICAgICA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmFwcGx5VG8gfHwgKCgpPT57fSk7XG5cdFx0dmFyIGdpdmVuUmVmaW5lcyAgICAgICA9IERlbHRhQ2xhc3MucHJvdG90eXBlLnJlZmluZXM7XG5cdFx0dmFyIGdpdmVuRXF1YWxzICAgICAgICA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmVxdWFscztcblx0XHR2YXIgZ2l2ZW5Db21tdXRlc1dpdGggID0gRGVsdGFDbGFzcy5wcm90b3R5cGUuY29tbXV0ZXNXaXRoO1xuXHRcdHZhciBnaXZlblJlc29sdmVzICAgICAgPSBEZWx0YUNsYXNzLnByb3RvdHlwZS5yZXNvbHZlcztcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdGV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHRyZWZpbmVzKG90aGVyKSB7XG5cdFx0XHRcdGlmICh0aGlzLnR5cGUgIT09IG90aGVyLnR5cGUpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChnaXZlblJlZmluZXMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdpdmVuUmVmaW5lcy5jYWxsKHRoaXMsIG90aGVyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lcXVhbHMob3RoZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHRcdGlmICh0aGlzLnR5cGUgIT09IG90aGVyLnR5cGUpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChnaXZlbkVxdWFscykpIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2l2ZW5FcXVhbHMuY2FsbCh0aGlzLCBvdGhlcik7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNEZWZpbmVkKGdpdmVuUmVmaW5lcykpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5yZWZpbmVzKG90aGVyKSAmJiBvdGhlci5yZWZpbmVzKHRoaXMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBhcnJheXNFcXVhbCh0aGlzLmFyZ3MsIG90aGVyLmFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29tbXV0ZXNXaXRoKG90aGVyKSB7XG5cdFx0XHRcdGlmIChpc0RlZmluZWQoZ2l2ZW5Db21tdXRlc1dpdGgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdpdmVuQ29tbXV0ZXNXaXRoLmNhbGwodGhpcywgb3RoZXIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNvbXBvc2VkV2l0aChvdGhlcilcblx0XHRcdFx0XHRcdC5lcXVhbHMob3RoZXIuY29tcG9zZWRXaXRoKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlc29sdmVzKGQxLCBkMikge1xuXHRcdFx0XHRpZiAoaXNEZWZpbmVkKGdpdmVuUmVzb2x2ZXMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGdpdmVuUmVzb2x2ZXMuY2FsbCh0aGlzLCBkMSwgZDIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBkMS5jb21wb3NlZFdpdGgoZDIpLmNvbXBvc2VkV2l0aCh0aGlzKVxuXHRcdFx0XHRcdFx0LmVxdWFscyhkMi5jb21wb3NlZFdpdGgoZDEpLmNvbXBvc2VkV2l0aCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChEZWx0YUNsYXNzLnByb3RvdHlwZS5tZXRob2RzIHx8IFtsb3dlcmNhc2VOYW1lXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBEZWx0YUNsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIERlbHRhQ2xhc3M7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcik7XG5cdH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFJlYWRhYmxlVGFyZ2V0IHtcblx0Y29uc3RydWN0b3IodmFsdWUpIHsgdGhpcy5fdmFsID0gdmFsdWUgfVxuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9XG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9XG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBXcml0YWJsZVRhcmdldCBleHRlbmRzIFJlYWRhYmxlVGFyZ2V0IHtcblx0Y29uc3RydWN0b3Iob2JqLCBwcm9wKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLl9vYmogPSBvYmo7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdH1cblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfVxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCB7YXNzZXJ0LCBpc0RlZmluZWR9IGZyb20gJy4vdXRpbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG5cblx0Y29uc3RydWN0b3Ioc3RyID0gXCJcIikge1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0YXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH1cblxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfVxuXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKGlzRGVmaW5lZCh0aGlzLnByb3ApKSB7XG5cdFx0XHRyZXN1bHQgKz0gdGhpcy5wcm9wO1xuXHRcdFx0aWYgKGlzRGVmaW5lZCh0aGlzLnJlc3QpKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIi5cIiArIHRoaXMucmVzdC50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cbn1cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IGNsYXNzIFByZWNvbmRpdGlvbkZhaWx1cmUgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnUHJlY29uZGl0aW9uRmFpbHVyZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHRcdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIFByZWNvbmRpdGlvbkZhaWx1cmUge1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgUHJlY29uZGl0aW9uRmFpbHVyZSB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwZWNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdFx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdFx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIENvbXBvc2l0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YTEsIGRlbHRhMik7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRcdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnN0cmFpbnRGYWlsdXJlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihmZWF0dXJlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0XHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25PcmRlckN5Y2xlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHRcdHRoaXMuZnJvbSA9IGZyb207XG5cdFx0dGhpcy50byAgID0gdG87XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0IGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhTmFtZXMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdVbnJlc29sdmVkRGVsdGFDb25mbGljdCc7XG5cdFx0dmFyIG5hbWVMaXN0ID0gZGVsdGFOYW1lcy5zbGljZSgwLCAtMSkubWFwKG5hbWUgPT4gYCcke25hbWV9J2ApLmpvaW4oJywnKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke25hbWVMaXN0fSBhbmQgJyR7ZGVsdGFOYW1lc1tkZWx0YU5hbWVzLmxlbmd0aC0xXX0nLmA7XG5cdFx0dGhpcy5kZWx0YU5hbWVzID0gZGVsdGFOYW1lcztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgT25seSBvbmUgUHJveHkgcGVyIHBhdGggY2FuIGJlIGFjdGl2ZSBhdCBhbnkgZ2l2ZW4gdGltZS5gO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBvbmNlUGVyfSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtQcmVjb25kaXRpb25GYWlsdXJlLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVfQ29tcG9zZWQgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Db21wb3NlZC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignRGVsdGEnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdFx0dGhpcy5EZWx0YS5uZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5EZWx0YSA9IGNsYXNzIERlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHRoaXMuaWQgPSArK2RlbHRhSnMuRGVsdGEuX25leHRJRDtcblx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0fVxuXG5cdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZykgfVxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58UHJlY29uZGl0aW9uRmFpbHVyZX0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuUHJlY29uZGl0aW9uRmFpbHVyZWBcblx0XHQgKi9cblx0XHRldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdGlmICh0aGlzLnByZWNvbmRpdGlvbikge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBQcmVjb25kaXRpb25GYWlsdXJlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUHJlY29uZGl0aW9uRmFpbHVyZSh0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZCh0aGlzLCBvdGhlcikgfVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAob3B0aW9ucy50YXJnZXRQcm9wKSAgIHsgc3RyICs9IGAg4oC5JHtvcHRpb25zLnRhcmdldFByb3B94oC6YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHsgc3RyICs9IGA6ICR7dGhpcy5hcmdzLm1hcCgoYSkgPT4gSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJywnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSB7Qm9vbGVhbnwoKERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGEpfSAtIGZhbHNlLCBvciBhIHNpZGUtZWZmZWN0IGZyZWUgZnVuY3Rpb25cblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YXMge1tEZWx0YUpzI0RlbHRhXX0gLSB0aGUgZGVsdGFzIHRvIGNvbXBvc2Vcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBjb21wb3NlZCguLi5kZWx0YXMpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cdFx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGQxID0gcmVzdWx0LFxuXHRcdFx0XHQgICAgZDIgPSBkZWx0YSB8fCBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IERlbHRhLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogdGhyb3cgYW4gZXJyb3IgaWYgJ2ZhbHNlJyB3YXMgZm91bmQgcmF0aGVyIHRoYW4gYSBmdW5jdGlvbiovXG5cdFx0XHRcdGlmIChjb21wb3NlRm4gPT09IGZhbHNlIHx8ICFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHRcdC8qICBpZiBubyBjb21wb3NpdGlvbiBmdW5jdGlvbiBpcyBmb3VuZCwgdXNlIGEgbGluZWFyIGRlbHRhIG1vZGVsICAqL1xuXHRcdFx0XHQvKiAgdG8gJ25haXZlbHknIGhhdmUgb25lIGRlbHRhIGFwcGx5IGFmdGVyIGFub3RoZXIgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGNvbXBvc2VGbiA9IChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkKFtkMSwgZDJdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRcdFx0cmVzdWx0ID0gY29tcG9zZUZuKGQxLCBkMik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH07XG5cdGRlbHRhSnMuRGVsdGEuX25leHRJRCA9IDA7XG5cdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cblxuXHQvKiBkZWZpbmUgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCBmb3IgdXNlIGluIGNvbXBvc2l0aW9ucyAqL1xuXHRkZWZpbmVfQ29tcG9zZWQoZGVsdGFKcyk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YV9jbGFzcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IGRlZmluZV9EZWx0YSAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhX2NsYXNzLmpzJztcbmltcG9ydCB7aW5kZW50LCBvbmNlUGVyLCBhcnJheXNFcXVhbH0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ092ZXJsb2FkZWQnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhKGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdPdmVybG9hZGVkJywgY2xhc3MgT3ZlcmxvYWRlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLm92ZXJsb2FkcyA9IHRoaXMuYXJnIHx8IFtdO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRlcXVhbHMob3RoZXIpIHtcblx0XHRcdHJldHVybiBhcnJheXNFcXVhbCh0aGlzLm92ZXJsb2Fkcywgb3RoZXIub3ZlcmxvYWRzLCAoZDEsIGQyKSA9PiBkMS5lcXVhbHMoZDIpKTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5ldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWRcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2V4dGVuZCwgaW5kZW50LCB0LCBvbmNlUGVyLCBvYmplY3RzRXF1YWx9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Db250YWluZXJQcm94eSAgICAgICAgZnJvbSAnLi9Db250YWluZXJQcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignTW9kaWZ5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Db250YWluZXJQcm94eShkZWx0YUpzKTtcblxuXG5cdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTW9kaWZ5JywgY2xhc3MgTW9kaWZ5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuc3ViRGVsdGFzID0ge307XG5cdFx0XHRleHRlbmQodGhpcy5zdWJEZWx0YXMsIHRoaXMuYXJnIHx8IHt9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gdGhpcy5zdWJEZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRlcXVhbHMob3RoZXIpIHtcblx0XHRcdHJldHVybiBvYmplY3RzRXF1YWwodGhpcy5zdWJEZWx0YXMsIG90aGVyLnN1YkRlbHRhcywgKGQxLCBkMikgPT4gZDEuZXF1YWxzKGQyKSk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJEZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHRcdFx0ZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdFxuXHRcdFx0XHRcdFx0LmtleXModGhpcy5zdWJEZWx0YXMpXG5cdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLnN1YkRlbHRhc1twXS50b1N0cmluZyhleHRlbmQoe30sIG9wdGlvbnMsIHsgdGFyZ2V0UHJvcDogcCB9KSkpXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIGluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSwgY2xhc3MgTW9kaWZ5UHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHJhd0FyZ3MgeypbXX1cblx0XHQgKiBAcmV0dXJuIHs/eyBvcHRpb25zOiBPYmplY3QsIGFyZ3M6ICpbXSB9fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi5yYXdBcmdzKSB7XG5cdFx0XHQvLyByYXdBcmdzIGlzIHBhcnNlZCBhcyAoLi4ub3B0aW9ucywgcGF0aCwgLi4uYXJncyksXG5cdFx0XHQvLyB0aG91Z2ggcGF0aCBtYXkgYWxzbyBiZSBwYXNzZWQgYXMgYW4gb3B0aW9uIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuUHJveHkgbWV0aG9kIGlzIGluc3VmZmljaWVudC5gKSB9XG5cdFx0XHRcdHZhciBhcmcgPSByYXdBcmdzLnNoaWZ0KCk7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykgeyBvcHRpb25zLnBhdGggPSBhcmcgICAgIH1cblx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICB7IGV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGgpO1xuXHRcdFx0cmV0dXJuIHsgb3B0aW9ucywgYXJnczogcmF3QXJncyB9O1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7e3BhdGg6IFBhdGh9fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIGRlZXBlc3QgcHJveHkgY3JlYXRlZCBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXHRcdFx0aWYgKCFwYXRoLnByb3ApIHsgdGhyb3cgbmV3IEVycm9yKCdPcGVyYXRpb25zIG9uIGEgTW9kaWZ5LlByb3h5IG5lZWQgdG8gaGF2ZSBhIG5vbi1lbXB0eSBwYXRoLicpIH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHBhdGg6IHBhdGgucmVzdCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTk9URTogTW9kaWZ5IG9wZXJhdGlvbnMgZG8gbm90ICh5ZXQpIHVzZSBhbnkgb3B0aW9uc1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gdGhpcy5jaGlsZERlbHRhKHByb3ApO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IGRlbHRhSnMuRGVsdGEuY29tcG9zZWQocmVzdWx0LnN1YkRlbHRhc1twcm9wXSwgZDIuc3ViRGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9ICAgICAgIGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVfRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGFfY2xhc3MuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG9uY2VQZXIoJ2Jhc2ljIG9wZXJhdGlvbnMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhIChkZWx0YUpzKTtcblx0ZGVmaW5lX01vZGlmeShkZWx0YUpzKTtcblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcsIGNsYXNzIE5vT3AgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHt9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdBZGQnLCBjbGFzcyBBZGQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCBjbGFzcyBGb3JiaWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIGNsYXNzIFJlcGxhY2UgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdVcGRhdGUnLCBjbGFzcyBVcGRhdGUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTm9PcCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXG5cdC8qIHV0aWxpdHkgZnVuY3Rpb24gZCAqL1xuXHR2YXIgZCA9IGRlZmluZV9kKGRlbHRhSnMpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ01vZGlmeScpLCBkKCdBZGQnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdBZGQnICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnQWRkJyAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnTW9kaWZ5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ0ZvcmJpZCcpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdGb3JiaWQnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ01vZGlmeScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnUmVtb3ZlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgLCAnUmVwbGFjZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnICwgJ1JlcGxhY2UnKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnQWRkJyAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdGb3JiaWQnICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnVXBkYXRlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnVXBkYXRlJyApLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnVXBkYXRlJyApLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ01vZGlmeScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdBZGQnICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ0ZvcmJpZCcgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnVXBkYXRlJyApLCBkKCdVcGRhdGUnLCAgKHtwMSwgcDJ9KSA9PiB2ID0+IHAyKHAxKHYpKSkgICApO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQge2lzRGVmaW5lZCwgdCwgZGVmaW5lX2QsIG9uY2VQZXIsIGFycmF5c0VxdWFsLCBhcnJheXNIYXZlU2FtZUVsZW1lbnRzLCBjdXN0b21JbmRleE9mfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZV9iYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0FycmF5JywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9iYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIGNsYXNzIFB1dEludG9BcnJheSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMuYXJnID8gKEFycmF5LmlzQXJyYXkodGhpcy5hcmcpID8gdGhpcy5hcmcgOiBbdGhpcy5hcmddKSA6IFtdO1xuXHRcdH1cblxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0cmVmaW5lcyhvdGhlcikge1xuXHRcdFx0LyogZGVmaW5lIG9wZXJhdGlvbiBlcXVhbGl0eSAqL1xuXHRcdFx0dmFyIGVxID0gKHgsIHkpID0+IHgubWV0aG9kID09PSB5Lm1ldGhvZCAmJiB4LnZhbHVlID09PSB5LnZhbHVlO1xuXG5cdFx0XHQvKiBib3RoIG5lZWQgdG8gYXQgbGVhc3QgaGF2ZSB0aGUgc2FtZSBvcGVyYXRpb25zIChub3QgbmVjZXNzYXJpbHkgaW4gdGhlIHNhbWUgb3JkZXIpICovXG5cdFx0XHRpZiAoIWFycmF5c0hhdmVTYW1lRWxlbWVudHModGhpcy52YWx1ZXMsIG90aGVyLnZhbHVlcywgZXEpKSB7IHJldHVybiBmYWxzZSB9XG5cblx0XHRcdC8qIGFwcGVuc2lvbnMgYW5kIHByZXBlbnNpb25zIG5lZWQgdG8gYmUgaW4gdGhlIHNhbWUgb3JkZXIgKi9cblx0XHRcdGlmICghYXJyYXlzRXF1YWwoXG5cdFx0XHRcdHRoaXMgLnZhbHVlcy5maWx0ZXIodiA9PiB2Lm1ldGhvZCA9PT0gJ2FwcGVuZCcpLFxuXHRcdFx0XHRvdGhlci52YWx1ZXMuZmlsdGVyKHYgPT4gdi5tZXRob2QgPT09ICdhcHBlbmQnKSwgZXFcblx0XHRcdCkpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdGlmICghYXJyYXlzRXF1YWwoXG5cdFx0XHRcdHRoaXMgLnZhbHVlcy5maWx0ZXIodiA9PiB2Lm1ldGhvZCA9PT0gJ3ByZXBlbmQnKSxcblx0XHRcdFx0b3RoZXIudmFsdWVzLmZpbHRlcih2ID0+IHYubWV0aG9kID09PSAncHJlcGVuZCcpLCBlcVxuXHRcdFx0KSkgeyByZXR1cm4gZmFsc2UgfVxuXG5cdFx0XHQvKiBpbnNlcnRpb25zIGluICd0aGlzJyBjYW5ub3QgY29tZSBsYXRlciB0aGFuIHRoZWlyIGNvdW50ZXJwYXJ0cyBpbiAnb3RoZXInLCAqL1xuXHRcdFx0LyogaW4gdGhlIHNlbnNlIG9mIGFwcGVuc2lvbnMgYW5kIHByZXBlbnNpb25zIHRoYXQgaGF2ZSBjb21lIGJlZm9yZSBpdCAgICAgICAgKi9cblx0XHRcdHZhciBhcHBlbnNpb25zQW5kUHJlcGVuc2lvbnNTZWVuID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGlmICh0aGlzLnZhbHVlc1tpXS5tZXRob2QgPT09ICdpbnNlcnQnKSB7XG5cdFx0XHRcdFx0dmFyIGluZCA9IGN1c3RvbUluZGV4T2Yob3RoZXIudmFsdWVzLCB0aGlzLnZhbHVlc1tpXSwgZXEpO1xuXHRcdFx0XHRcdHZhciBhcHBlbnNpb25zQW5kUHJlcGVuc2lvbnNUb0dvID0gWy4uLmFwcGVuc2lvbnNBbmRQcmVwZW5zaW9uc1NlZW5dO1xuXHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDw9IGluZDsgKytqKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZCA9IGN1c3RvbUluZGV4T2YoYXBwZW5zaW9uc0FuZFByZXBlbnNpb25zVG9Hbywgb3RoZXIudmFsdWVzW2pdLCBlcSk7XG5cdFx0XHRcdFx0XHRpZiAoaW5kZCA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGFwcGVuc2lvbnNBbmRQcmVwZW5zaW9uc1RvR28uc3BsaWNlKGluZGQsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYXBwZW5zaW9uc0FuZFByZXBlbnNpb25zVG9Hby5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFwcGVuc2lvbnNBbmRQcmVwZW5zaW9uc1NlZW4ucHVzaCh0aGlzLnZhbHVlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogT0ssIGl0J3MgYSByZWZpbmVtZW50ICovXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBpc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBkID0gZGVmaW5lX2QoZGVsdGFKcyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdNb2RpZnknICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0FkZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVtb3ZlJyAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdGb3JiaWQnICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlcGxhY2UnICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnVXBkYXRlJyAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT5cblx0XHRuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSkpO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtpc1VuZGVmaW5lZCwgaXNEZWZpbmVkLCB0LCBkZWZpbmVfZCwgb25jZVBlciwgYXJyYXlzRXF1YWx9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVfQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lX1Byb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHV0SW50b0Z1bmN0aW9uJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Nb2RpZnkgICAgICAgICAoZGVsdGFKcyk7XG5cdGRlZmluZV9CYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZV9Qcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywgY2xhc3MgUHV0SW50b0Z1bmN0aW9uIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRlcXVhbHMob3RoZXIpIHtcblx0XHRcdHJldHVybiBhcnJheXNFcXVhbCh0aGlzLnZhbHVlcywgb3RoZXIudmFsdWVzLFxuXHRcdFx0XHQoYSwgYikgPT4gYS5tZXRob2QgPT09IGIubWV0aG9kICYmIGEudmFsdWUgJiYgYi52YWx1ZSk7XG5cdFx0fVxuXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIGlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KGlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkZWZpbmVfZChkZWx0YUpzKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ01vZGlmeScgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnQWRkJyAgICAgICAgICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ0ZvcmJpZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdVcGRhdGUnICAgICAgICAgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PlxuXHRcdG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbihbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGlzRGVmaW5lZCwgaW5kZW50LCBvbmNlUGVyLCBvLCBncmFwaERlc2NlbmRhbnRzfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZV9Nb2RpZnkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lX0NvbnRhaW5lclByb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vQ29udGFpbmVyUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0fSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdEZWx0YU1vZGVsJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdGRlZmluZV9Db250YWluZXJQcm94eShkZWx0YUpzKTtcblxuXG5cdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGNsYXNzIERlbHRhTW9kZWwgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0ZXF1YWxzKG90aGVyKSB7XG5cdFx0XHR2YXIgZzEgPSB0aGlzIC5ncmFwaC50cmFuc2l0aXZlUmVkdWN0aW9uKCk7XG5cdFx0XHR2YXIgZzIgPSBvdGhlci5ncmFwaC50cmFuc2l0aXZlUmVkdWN0aW9uKCk7XG5cdFx0XHR2YXIgcmVzdWx0ID0gdHJ1ZTtcblx0XHRcdGcxLmVhY2hWZXJ0ZXgoKG4xLCBkMSkgPT4ge1xuXHRcdFx0XHRpZiAoZzIudmVydGV4VmFsdWUobjEpLmVxdWFscyhkMSkpIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKCFyZXN1bHQpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdGcyLmVhY2hWZXJ0ZXgoKG4yLCBkMikgPT4ge1xuXHRcdFx0XHRpZiAoZzEudmVydGV4VmFsdWUobjIpLmVxdWFscyhkMikpIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKCFyZXN1bHQpIHsgcmV0dXJuIGZhbHNlIH1cblx0XHRcdGcxLmVhY2hFZGdlKChuMUZyb20sIG4xVG8pID0+IHtcblx0XHRcdFx0aWYgKGcyLmhhc0VkZ2UobjFGcm9tLCBuMVRvKSkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGZhbHNlO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIXJlc3VsdCkgeyByZXR1cm4gZmFsc2UgfVxuXHRcdFx0ZzEuZWFjaEVkZ2UoKG4yRnJvbSwgbjJUbykgPT4ge1xuXHRcdFx0XHRpZiAoZzEuaGFzRWRnZShuMkZyb20sIG4yVG8pKSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7IC8vIFRPRE86IG1vdmUgJ2VxdWFscycgbWV0aG9kIHRvIHRoZSBqcy1ncmFwaCBsaWJyYXJ5IChhbmQgbWFrZSBtb3JlIGVmZmljaWVudClcblx0XHR9XG5cblx0XHRfYXNzZXJ0Tm9VbnJlc29sdmVkQ29uZmxpY3RzKCkge1xuXHRcdFx0dmFyIGNvbmZsaWN0cyA9IHRoaXMuY29uZmxpY3RzKCk7XG5cdFx0XHRjb25mbGljdHMuZm9yRWFjaCgoY29uZmxpY3RJbmZvKSA9PiB7XG5cdFx0XHRcdGlmIChjb25mbGljdEluZm8uY29uZmxpY3RSZXNvbHZpbmdEZWx0YXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0KGNvbmZsaWN0SW5mby5jb25mbGljdGluZ0RlbHRhcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHRocm93IGFuIGV4Y2VwdGlvbiBpZiB0aGVyZSBhcmUgdW5yZXNvbHZlZCBjb25mbGljdHMgKi9cblx0XHRcdHRoaXMuX2Fzc2VydE5vVW5yZXNvbHZlZENvbmZsaWN0cygpO1xuXG5cdFx0XHQvKiBubyB1bnJlc29sdmVkIGNvbmZsaWN0czogYXBwbHkgdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0Y29uZmxpY3RzKCkge1xuXHRcdFx0LyogY2xvbmUgdGhlIGdyYXBoICovXG5cdFx0XHR2YXIgZyA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblxuXHRcdFx0Lyogc291cmNlIGFuZCBzaW5rIGtleXMgKi9cblx0XHRcdHZhciBzaW5rID0gJyhzaW5rKSc7XG5cdFx0XHR3aGlsZSAoZy5oYXNWZXJ0ZXgoc2luaykpIHsgc2luayA9IGAke3Npbmt9J2AgfVxuXG5cdFx0XHQvKiBjcmVhdGUgc2luayB2ZXJ0ZXgsIGNvbm5lY3QgaXQgdG8gYWxsIG90aGVyIHZlcnRpY2VzICovXG5cdFx0XHRnLmFkZE5ld1ZlcnRleChzaW5rLCBudWxsKTtcblx0XHRcdGcuZWFjaFZlcnRleCgobmFtZSkgPT4ge1xuXHRcdFx0XHRnLnNldFZlcnRleChuYW1lLCBudWxsKTtcblx0XHRcdFx0aWYgKG5hbWUgIT09IHNpbmspIHsgZy5lbnN1cmVFZGdlKG5hbWUsIHNpbmspIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiB0cmFuc2l0aXZlIHJlZHVjdGlvbiAqL1xuXHRcdFx0ZyA9IGcudHJhbnNpdGl2ZVJlZHVjdGlvbigpO1xuXG5cdFx0XHQvKiBmaW5kIGFsbCBwYWlycyBvZiAnaW5jb21wYXJhYmxlJyBkZWx0YXMsIHBsdXMgdGhlIGNsb3Nlc3QgZGVsdGFzIHRoYXQgYXJlICdncmVhdGVyJyB0aGFuIGJvdGggKi9cblx0XHRcdHZhciByZXNvbHV0aW9ucyA9IHt9OyAvLyBmaXJzdCAtPiBzZWNvbmQgLT4gcG9zc2libGUtcmVzb2x2aW5nLWRlbHRhIC0+IHRydWVcblx0XHRcdHZhciBnZXRSZXNvbHV0aW9uc0luID0gKG5hbWUpID0+IHtcblx0XHRcdFx0aWYgKGcudmVydGV4VmFsdWUobmFtZSkpIHsgcmV0dXJuIH1cblx0XHRcdFx0dmFyIGFuY2VzdG9ycyA9IHt9O1xuXHRcdFx0XHRnLnByZWRlY2Vzc29ycyhuYW1lKS5mb3JFYWNoKChwcmVkKSA9PiB7XG5cdFx0XHRcdFx0Z2V0UmVzb2x1dGlvbnNJbihwcmVkKTtcblx0XHRcdFx0XHRhbmNlc3RvcnNbcHJlZF0gPSB7IFtwcmVkXTogdHJ1ZSB9O1xuXHRcdFx0XHRcdHZhciBwcmVkQW5jZXN0b3JzID0gZy52ZXJ0ZXhWYWx1ZShwcmVkKTtcblx0XHRcdFx0XHRleHRlbmQoYW5jZXN0b3JzW3ByZWRdLCAuLi5PYmplY3Qua2V5cyhwcmVkQW5jZXN0b3JzKS5tYXAocHByZWQgPT4gcHJlZEFuY2VzdG9yc1twcHJlZF0pKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGcuc2V0VmVydGV4KG5hbWUsIGFuY2VzdG9ycyk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGFuY2VzdG9ycykuZm9yRWFjaCgocHJlZDEpID0+IHtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhhbmNlc3RvcnMpLmZvckVhY2goKHByZWQyKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocHJlZDEgPj0gcHJlZDIpIHsgcmV0dXJuIH0gLy8gbWFrZSBzdXJlIHByZWQxIDwgcHJlZDJcblx0XHRcdFx0XHRcdHZhciBhbmNzMSA9IGV4dGVuZCh7fSwgYW5jZXN0b3JzW3ByZWQxXSk7XG5cdFx0XHRcdFx0XHR2YXIgYW5jczIgPSBleHRlbmQoe30sIGFuY2VzdG9yc1twcmVkMl0pO1xuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoYW5jczEpLmZvckVhY2goKGFuYzEpID0+IHtcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoYW5jczIpLmZvckVhY2goKGFuYzIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoYW5jMSA9PT0gYW5jMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGFuY3MxW2FuYzFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGFuY3MyW2FuYzJdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGFuY3MxKS5mb3JFYWNoKChhbmMxKSA9PiB7XG5cdFx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGFuY3MyKS5mb3JFYWNoKChhbmMyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0byhyZXNvbHV0aW9ucywgLi4uW2FuYzEsIGFuYzJdLnNvcnQoKSlbbmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHRnZXRSZXNvbHV0aW9uc0luKHNpbmspO1xuXG5cdFx0XHQvKiBvdXQgb2YgdGhlIGluY29tcGFyYWJsZSBkZWx0YXMsIGZpbmQgdGhvc2UgdGhhdCBhcmUgYWN0dWFsbHkgaW4gY29uZmxpY3QsIGFuZCBmaW5kIGFueSAqL1xuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0T2JqZWN0LmtleXMocmVzb2x1dGlvbnMpLmZvckVhY2goKGZpcnN0KSA9PiB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHJlc29sdXRpb25zW2ZpcnN0XSkuZm9yRWFjaCgoc2Vjb25kKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHggPSB0aGlzLmdyYXBoLnZlcnRleFZhbHVlKGZpcnN0KTtcblx0XHRcdFx0XHR2YXIgeSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUoc2Vjb25kKTtcblx0XHRcdFx0XHRpZiAoIXguY29tbXV0ZXNXaXRoKHkpKSB7XG5cdFx0XHRcdFx0XHR2YXIgY29uZmxpY3RJbmZvID0ge1xuXHRcdFx0XHRcdFx0XHRjb25mbGljdGluZ0RlbHRhczogICAgICAgW2ZpcnN0LCBzZWNvbmRdLFxuXHRcdFx0XHRcdFx0XHRjb25mbGljdFJlc29sdmluZ0RlbHRhczogW11cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhyZXNvbHV0aW9uc1tmaXJzdF1bc2Vjb25kXSkuZm9yRWFjaCgocmVzb2x2ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0Z3JhcGhEZXNjZW5kYW50cyhnLCByZXNvbHZlcikuZm9yRWFjaCgocmVzb2x2ZXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgeiA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUocmVzb2x2ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXNvbHZlciAhPT0gc2luaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHoucmVzb2x2ZXMoeCwgeSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmxpY3RJbmZvLmNvbmZsaWN0UmVzb2x2aW5nRGVsdGFzLnB1c2gocmVzb2x2ZXIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGNvbmZsaWN0SW5mbyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGNvbmZsaWN0IHJlc3VsdHMgKi9cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0sIGNsYXNzIERlbHRhTW9kZWxQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgICAgICAgICAgICAgICAvLyBrZXkgLT4gb3B0aW9uc1xuXHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnMgPSB7fTsgLy8ga2V5IC0+IGFwcGxpY2F0aW9uLWNvbmRpdGlvblxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBuYW1lLCAuLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBuYW1lIGFuZC9vciBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBvcHRpb25zIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuRGVsdGFNb2RlbCBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm5hbWUpIHsgb3B0aW9ucy5uYW1lID0gYXJnICAgfVxuXHRcdFx0XHRcdGVsc2UgICAgICAgICAgICAgICB7IG9wdGlvbnMucGF0aCA9IGFyZyAgIH1cblx0XHRcdFx0fSBlbHNlICAgICAgICAgICAgICAgICB7IGV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGggfHwgIW9wdGlvbnMubmFtZSk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHt7cGF0aDogUGF0aCwgbmFtZTogc3RyaW5nLCBmZWF0dXJlOiBib29sZWFufX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRoLCBuYW1lLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIGNyZWF0ZSBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsIGVwb255bW91cyBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHRsZXQgYXBwQ29uZDtcblx0XHRcdFx0aWYgKGZlYXR1cmUpIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBleHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChpc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHsgZmVhdHVyZTogZmFsc2UgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRGVmaW5lZChvcHRpb25zWydyZXF1aXJlcyddKSkge1xuXHRcdFx0XHRcdGFwcENvbmQuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZmVhdHVyZSB8fCBhcHBDb25kLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSBhcHBDb25kO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdID0gYXBwQ29uZDtcblx0XHRcdH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zLCB7IG5hbWU6IHVuZGVmaW5lZCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSBvcHRpb25zICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0gPSBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5jbGVhcigpO1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGxldCBvcHRpb25zID0gdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8qIGRlbHRhIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzLmNoaWxkRGVsdGEobmFtZSk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGEpO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIG9yZGVyICovXG5cdFx0XHRcdFsgIC4uLm9wdGlvbnNbJ3Jlc29sdmVzJ118fFtdLCAgLi4ub3B0aW9uc1snYWZ0ZXInXXx8W10sICAuLi5vcHRpb25zWydyZXF1aXJlcyddfHxbXSAgXS5mb3JFYWNoKChzdWJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmNyZWF0ZUVkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5ncmFwaC5oYXNDeWNsZSgpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEFwcGxpY2F0aW9uT3JkZXJDeWNsZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlIHx8IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsXG5cdCksIHRydWUpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGEsIGFzc2VydCwgaXNVbmRlZmluZWQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignZmVhdHVyZXMnLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0b25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnZmVhdHVyZXMnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0ZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRcdGFzc2VydChpc1VuZGVmaW5lZCh0aGlzLmZlYXR1cmVzW25hbWVdKSxcblx0XHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdFx0cmV0dXJuIHRoaXMuZmVhdHVyZXNbbmFtZV0gPSBuZXcgdGhpcy5GZWF0dXJlKG5hbWUsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdGEoX2lmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoZGlzanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFNlbGVjdHMoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0dmFyIF9vbmx5SWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgY29uanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChjb25qdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRhKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZE9ubHlJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIHNldHRsaW5nIHJlbGF0aW9ucyBiZXR3ZWVuIGZlYXR1cmVzICovXG5cdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRpZiAoIV9jb25kaXRpb25zVW5zZXR0bGVkKSB7IHJldHVybiB9XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0ZG8ge1xuXHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRpZiAoaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IGNsYXNzIEZlYXR1cmUge1xuXHRcdGNvbnN0cnVjdG9yKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH1cblx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICB9XG5cdFx0Z2V0IGNvbmRpdGlvbmFsKCkgeyByZXR1cm4gYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfVxuXHRcdGdldCByZXN0cmljdGVkKCkgIHsgcmV0dXJuIGEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH1cblx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHR9O1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmXSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgIF0sIC8vIGVycm9yIGlmIHRoaXMgYnV0IG5vdCBvdGhlclxuXHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHNdICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkT25seUlmXSBdICAvLyBpZiBhbmQgb25seUlmXG5cdF07XG5cdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGUuYWRkT3B0aW9uID0gZnVuY3Rpb24gKG9wdGlvbk5hbWUsIHZhbHVlKSB7XG5cdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbY29ubmVjdGlvbk5hbWUsIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRpZiAob3B0aW9uTmFtZSA9PT0gY29ubmVjdGlvbk5hbWUpIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhTW9kZWwgZnJvbSAnLi9EZWx0YU1vZGVsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCd2YXJpYXRpb24gcG9pbnRzJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ3ZhcmlhdGlvbiBwb2ludHMnLCAoKSA9PiB7XG5cblx0XHRkZWZpbmVfRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHRcdGV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHRcdCAqL1xuXHRcdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0XHR0aGlzLl9kZWx0YU1vZGVsUHJveHkuZGVsdGEoKS5hcHBseVRvKHJvb3QsIHtcblx0XHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgcHJveHkgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIHByb3h5IHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbFByb3h5LmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5fZGVsdGFNb2RlbFByb3h5ID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpLmRvKCk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YXJpYXRpb25Qb2ludHMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7ZXh0ZW5kLCBpc1VuZGVmaW5lZCwgb25jZVBlcn0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdhcHBsaWNhdGlvbiBjb25kaXRpb25zJywgKGRlbHRhSnMpID0+IHtcblxuXG5cdG9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoKSA9PiB7XG5cblx0XHRleHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHRleHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdHNldCBhcHBsaWNhdGlvbkNvbmRpdGlvbihhYykgeyB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFjIH0sXG5cdFx0Z2V0IHNlbGVjdGVkKCkgeyByZXR1cm4gaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZCB9XG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIGEsIGlzVW5kZWZpbmVkLCBvbmNlUGVyfSBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZV9PdmVybG9hZGVkICAgICAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZV9Qcm94eSAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcbmltcG9ydCB7TXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3J9ICAgICAgZnJvbSAnLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignQ29udGFpbmVyUHJveHknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX1Byb3h5KGRlbHRhSnMpO1xuXG5cblx0LyogYSBQcm94eSBjbGFzcyBmb3IgY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyBsaWtlIE1vZGlmeSBhbmQgRGVsdGFNb2RlbCAqL1xuXHRkZWx0YUpzLkNvbnRhaW5lclByb3h5ID0gY2xhc3MgQ29udGFpbmVyUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHtcblxuXHRcdC8vIEEgUHJveHkgaW5zdGFuY2UgZXhwb3NlcyBvcGVyYXRpb24gbWV0aG9kcyBkaXJlY3RseS4gQXJndW1lbnRzXG5cdFx0Ly8gdG8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gYmUgcHJlLXN1cHBsaWVkIHRocm91Z2ggdGhlIGBkb2AgbWV0aG9kLlxuXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRcdHRoaXMuX2RvQXJncyAgICAgICA9IFtdO1xuXHRcdFx0dGhpcy5fb3JpZ2luYWwgICAgID0gdGhpcztcblx0XHRcdHRoaXMuX2NoaWxkcmVuICAgICA9IHt9OyAvLyBrZXkgLT4gW3Byb3hpZXNdXG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnNcblx0XHR9XG5cblxuXHRcdGRlYWN0aXZhdGUoKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY2hpbGRQcm94eShrZXkpLmRlYWN0aXZhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0c3VwZXIuZGVhY3RpdmF0ZSgpO1xuXHRcdH1cblxuXG5cdFx0YWRkQ2hpbGRQcm94eShrZXksIGRlbHRhKSB7XG5cdFx0XHQvKiBnZXQgdGhlIGN1cnJlbnQgcHJveHkgZm9yIHRoZSBnaXZlbiBrZXkgKi9cblx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5jaGlsZFByb3h5KGtleSk7XG5cblx0XHRcdC8qIGdldCAvIGNyZWF0ZSBkZWx0YSBwcm94eSAqL1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSBkZWx0YS5jb25zdHJ1Y3Rvci5Qcm94eSB8fCBkZWx0YUpzLlByb3h5O1xuXHRcdFx0dmFyIHByb3h5ID0gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YSwgcGFyZW50OiB0aGlzIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGN1cnJlbnQgcHJveHkgaWYgaXQsIGFuZCB0aGUgY3VycmVudCBwcm94eSwgYXJlIGJvdGggTW9kaWZ5LlByb3h5ICovXG5cdFx0XHRpZiAoY3VycmVudCBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5ICYmXG5cdFx0XHRcdHByb3h5ICAgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSkgeyByZXR1cm4gY3VycmVudCB9XG5cblx0XHRcdC8qIHdlIG5lZWQgYSBuZXcgcHJveHksIHNvIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgb25lICovXG5cdFx0XHRpZiAoY3VycmVudCkgeyBjdXJyZW50LmRlYWN0aXZhdGUoKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBhIG5ldyBQcm94eSBvZiB0aGUgcmlnaHQgY2xhc3MsIHJlbWVtYmVyIGl0IGFuZCByZXR1cm4gaXQgKi9cblx0XHRcdHRoaXMuX2NoaWxkcmVuW2tleV0ucHVzaChwcm94eSk7XG5cdFx0XHRyZXR1cm4gcHJveHk7XG5cdFx0fVxuXG5cblx0XHRjaGlsZEtleXMoKSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikgfVxuXG5cblx0XHRjaGlsZFByb3hpZXMoa2V5KSB7IHJldHVybiBhKHRoaXMuX2NoaWxkcmVuLCBrZXkpIH1cblxuXG5cdFx0Y2hpbGRQcm94eShrZXkpIHsgcmV0dXJuIGEodGhpcy5fY2hpbGRyZW4sIGtleSlbdGhpcy5fY2hpbGRyZW5ba2V5XS5sZW5ndGgtMV0gfVxuXG5cblx0XHRjaGlsZERlbHRhKGtleSkge1xuXHRcdFx0cmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQoXG5cdFx0XHRcdC4uLnRoaXMuY2hpbGRQcm94aWVzKGtleSkubWFwKHByb3h5ID0+IHByb3h5LmRlbHRhKCkpXG5cdFx0XHQpO1xuXHRcdH1cblxuXG5cdFx0ZG8oLi4uZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiByZXR1cm4gYSB2ZXJzaW9uIG9mIHRoaXMgUHJveHkgd2l0aCBleHRyYSBwcmVsb2FkZWQgYXJncyAqL1xuXHRcdFx0Ly8gbm90ZSB0aGF0IHRoaXMgbWl4ZXMgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlXG5cdFx0XHQvLyBpbnRvIHRoZSBleGlzdGluZyBjbGFzc2ljYWwgaW5oZXJpdGFuY2Ugc2NoZW1lXG5cdFx0XHR2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcblx0XHRcdHJlc3VsdC5fZG9BcmdzICAgPSBbLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3NdO1xuXHRcdFx0cmVzdWx0Ll9vcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0X2RvKG1ldGhvZCwgZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiBjb250YWluZXItc3BlY2lmaWMgcHJvY2Vzc2luZyBvZiBhcmd1bWVudHMgKi9cblx0XHRcdHZhciB7b3B0aW9ucywgYXJnc30gPSB0aGlzLnByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi50aGlzLl9kb0FyZ3MsIC4uLmRvQXJncyk7XG5cblx0XHRcdC8qIGlmIHRoZSBvcHRpb25zIGNvbnRhaW4gYSBwYXRoLCByZWlmeSBpdCAqL1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLnBhdGggPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdG9wdGlvbnMucGF0aCA9IG5ldyBQYXRoKG9wdGlvbnMucGF0aCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHRoZSBhcmd1bWVudCBsaXN0IGlzIGZpbmlzaGVkOyBjcmVhdGUgYSBuZXcgZGVsdGEgYW5kIHB1dCBpdCBpbiB0aGUgcmlnaHQgcGxhY2UgKi9cblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmdzKTtcblx0XHRcdHZhciBwcm94eSA9IHRoaXMuYWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSByaWdodCBQcm94eSBpbnN0YW5jZSBmb3IgY2hhaW5pbmcgKi9cblx0XHRcdHJldHVybiAocHJveHkgaW5zdGFuY2VvZiBkZWx0YUpzLkNvbnRhaW5lclByb3h5KSA/IHByb3h5IDogdGhpcztcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGV4dHJhY3QgYW5cblx0XHQgKiBvcHRpb25zIG9iamVjdCwgcGF0aCBhbmQgZmluYWwgYXJndW1lbnQgbGlzdCBmcm9tIGEgZ2l2ZW4gJ3JhdycgYXJndW1lbnQgbGlzdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19XG5cdFx0ICogQHJldHVybiB7e29wdGlvbnM6IE9iamVjdCwgYXJnczogWypdfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdwcm9jZXNzUHJveHlBcmd1bWVudHMnIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBhZGQgYSBnaXZlbiBkZWx0YVxuXHRcdCAqIHVuZGVyIGEgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLCBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIFByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ2FkZE9wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBDcmVhdGUgYSBkZWx0YSBiYXNlZCBvbiBhIG1ldGhvZC1uYW1lIGFuZCBhcmd1bWVudC1saXN0LlxuXHRcdCAqIElmIHRoZSBtZXRob2QtbmFtZSBpcyBvdmVybG9hZGVkLCB5b3UnbGwgYXV0b21hdGljYWxseSBnZXRcblx0XHQgKiBhbiBgRGVsdGEuT3ZlcmxvYWRlZGAgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFyZ3MgICB7WypdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0c3RhdGljIF9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IGRlbHRhSnMuQ29udGFpbmVyUHJveHkuX21ldGhvZEhhbmRsZXJzW21ldGhvZF0ubWFwKGhhbmRsZXIgPT4gaGFuZGxlciguLi5hcmdzKSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0ZGVmaW5lX092ZXJsb2FkZWQoZGVsdGFKcyk7XG5cdFx0XHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKG5ld0RlbHRhcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdFx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKSB7XG5cblx0XHRcdC8qIGF1dG9tYXRpY2FsbHkgcG9wdWxhdGUgdGhlIFByb3h5IGNsYXNzIHdpdGggbmV3IG9wZXJhdGlvbiBtZXRob2QgKi9cblx0XHRcdGlmIChpc1VuZGVmaW5lZChkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdKSkge1xuXHRcdFx0XHRkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZG8obWV0aG9kLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyogcmVnaXN0ZXIgaGFuZGxlcnMgZm9yIGVhY2ggbWV0aG9kICovXG5cdFx0XHRhKGRlbHRhSnMuQ29udGFpbmVyUHJveHksICdfbWV0aG9kSGFuZGxlcnMnLCBtZXRob2QpLnB1c2goaGFuZGxlcik7XG5cblx0XHR9XG5cblxuXHR9O1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvQ29udGFpbmVyUHJveHkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCB7aW5kZW50LCBvbmNlUGVyLCBhcnJheXNFcXVhbH0gZnJvbSAnLi91dGlsLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCBvbmNlUGVyKCdDb21wb3NlZCcsIChkZWx0YUpzKSA9PiB7XG5cblxuXHQvLyBOT1RFOiBOb3QgaW1wb3J0aW5nIHRoZSBjaXJjdWxhciBkZXBlbmRlbmN5IGRlbHRhSnMuRGVsdGEgaGVyZS5cblx0Ly8gICAgICAgVGhhdCBmaWxlIHdpbGwgaW1wb3J0IHRoaXMgb25lIGF0IHRoZSBwcm9wZXIgdGltZS5cblxuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQ29tcG9zZWQnLCBjbGFzcyBDb21wb3NlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jb21wb25lbnRzID0gdGhpcy5hcmcgfHwgW107XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5fY29tcG9uZW50cyA9IHRoaXMuX2NvbXBvbmVudHMubWFwKChkZWx0YSkgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGVxdWFscyhvdGhlcikge1xuXHRcdFx0cmV0dXJuIGFycmF5c0VxdWFsKHRoaXMuX2NvbXBvbmVudHMsIG90aGVyLl9jb21wb25lbnRzLCAoZDEsIGQyKSA9PiBkMS5lcXVhbHMoZDIpKTtcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLl9jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudHMpID0+IHtcblx0XHRcdFx0Y29tcG9uZW50cy5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuX2NvbXBvbmVudHMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYOKAoiAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBpbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0aWYgKHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoID09PSAwKSB7IHJldHVybiB0cnVlIH1cblx0XHRcdHJldHVybiB0aGlzLl9jb21wb25lbnRzWzBdLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdH1cblxuXHRcdF9jb2xsYXBzZSgpIHtcblx0XHRcdC8qIGZsYXR0ZW4gQ29tcG9zZWQgdGhhdCBhcmUgaW5zaWRlIENvbXBvc2VkICovXG5cdFx0XHR0aGlzLl9jb21wb25lbnRzID0gKCgpID0+IHtcblx0XHRcdFx0bGV0IG5ld0NvbXBvbmVudHMgPSBbXTtcblx0XHRcdFx0dGhpcy5fY29tcG9uZW50cy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGlmIChkZWx0YSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLl9jb2xsYXBzZSgpO1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKC4uLmRlbHRhLl9jb21wb25lbnRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gbmV3Q29tcG9uZW50cztcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIGNvbXBvc2UgbmVpZ2hib3VyaW5nIHBhaXJzIHdoZXJlIHBvc3NpYmxlICovXG5cdFx0XHRsZXQgY2hhbmdlZDtcblx0XHRcdGRvIHtcblx0XHRcdFx0Y2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9jb21wb25lbnRzID0gKCgpID0+IHtcblx0XHRcdFx0XHRsZXQgbmV3Q29tcG9uZW50cyA9IFtdO1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY29tcG9uZW50cy5sZW5ndGggLSAxOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdGxldCBjb21wb3NlZFBhaXIgPSB0aGlzLl9jb21wb25lbnRzW2ldLmNvbXBvc2VkV2l0aCh0aGlzLl9jb21wb25lbnRzW2krMV0pO1xuXHRcdFx0XHRcdFx0aWYgKGNvbXBvc2VkUGFpciBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQpIHtcblx0XHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKHRoaXMuX2NvbXBvbmVudHNbaV0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bmV3Q29tcG9uZW50cy5wdXNoKGNvbXBvc2VkUGFpcik7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRpICs9IDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpID09PSB0aGlzLl9jb21wb25lbnRzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHRcdG5ld0NvbXBvbmVudHMucHVzaCh0aGlzLl9jb21wb25lbnRzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0NvbXBvbmVudHM7XG5cdFx0XHRcdH0pKCk7XG5cdFx0XHR9IHdoaWxlIChjaGFuZ2VkKTtcblx0XHR9XG5cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblxuXHR9KTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZFxuXHQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2VkID8gZDEuX2NvbXBvbmVudHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NlZCA/IGQyLl9jb21wb25lbnRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuQ29tcG9zZWQoWy4uLkQxLCAuLi5EMl0pO1xuXHRcdHJlc3VsdC5fY29sbGFwc2UoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0NvbXBvc2VkLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IHtleHRlbmQsIG9uY2VQZXJ9IGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgZGVmaW5lX0RlbHRhICAgICAgZnJvbSAnLi9EZWx0YV9jbGFzcy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgb25jZVBlcignUHJveHknLCAoZGVsdGFKcykgPT4ge1xuXG5cblx0ZGVmaW5lX0RlbHRhKGRlbHRhSnMpO1xuXG5cblx0ZGVsdGFKcy5Qcm94eSA9IGNsYXNzIFByb3h5IHtcblx0XHRjb25zdHJ1Y3Rvcih7cGFyZW50LCBkZWx0YX0gPSB7fSkge1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RlbHRhID0gZGVsdGE7XG5cdFx0fVxuXHRcdGRlbHRhKCkgeyByZXR1cm4gdGhpcy5fZGVsdGE7IH1cblx0XHRnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlIH1cblx0XHRkZWFjdGl2YXRlKCkgeyB0aGlzLl9hY3RpdmUgPSBmYWxzZSB9XG5cdH07XG5cblxuXHRleHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gYXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yLlByb3h5O1xuXHRcdFx0aWYgKCFQcm94eUNsYXNzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyAnZG8nIG9uIGRlbHRhIHR5cGUgJyR7dGhpcy50eXBlfScsIHdoaWNoIGhhcyBubyBQcm94eSBpbnRlcmZhY2UuYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YTogdGhpcyB9KS5kbyguLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9Qcm94eS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=