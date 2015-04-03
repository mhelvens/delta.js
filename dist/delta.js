(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["DeltaJs"] = factory();
	else
		root["DeltaJs"] = factory();
})(this, function() {
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
	
	var _TargetEs6Js = __webpack_require__(3);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var WritableTarget = _TargetEs6Js.WritableTarget;
	
	extend(DeltaJs, { ReadableTarget: ReadableTarget, WritableTarget: WritableTarget });
	
	/* make Path classes available under the DeltaJs symbol */
	
	var Path = _interopRequire(__webpack_require__(4));
	
	extend(DeltaJs, { Path: Path });
	
	/* make Error classes available under the DeltaJs symbol */
	
	var _ErrorEs6Js = __webpack_require__(5);
	
	var ApplicationError = _ErrorEs6Js.ApplicationError;
	var PreconditionFailure = _ErrorEs6Js.PreconditionFailure;
	var MultipleOverloadsApplicationError = _ErrorEs6Js.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorEs6Js.NoOverloadsApplicationError;
	var CompositionError = _ErrorEs6Js.CompositionError;
	var MultipleOverloadsCompositionError = _ErrorEs6Js.MultipleOverloadsCompositionError;
	var ConstraintFailure = _ErrorEs6Js.ConstraintFailure;
	var ApplicationOrderCycle = _ErrorEs6Js.ApplicationOrderCycle;
	var UnresolvedDeltaConflict = _ErrorEs6Js.UnresolvedDeltaConflict;
	var MultipleActiveProxiesError = _ErrorEs6Js.MultipleActiveProxiesError;
	
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(17));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var assert = _utilEs6Js.assert;
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var _TargetEs6Js = __webpack_require__(3);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var WritableTarget = _TargetEs6Js.WritableTarget;
	var rt = _TargetEs6Js.rt;
	var wt = _TargetEs6Js.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(6));
	
	var define_Overloaded = _interopRequire(__webpack_require__(7));
	
	var define_Modify = _interopRequire(__webpack_require__(8));
	
	var define_basicOperations = _interopRequire(__webpack_require__(9));
	
	var define_PutIntoArray = _interopRequire(__webpack_require__(10));
	
	var define_PutIntoFunction = _interopRequire(__webpack_require__(11));
	
	var define_DeltaModel = _interopRequire(__webpack_require__(12));
	
	var define_features = _interopRequire(__webpack_require__(13));
	
	var define_variationPoints = _interopRequire(__webpack_require__(14));
	
	var define_applicationConditions = _interopRequire(__webpack_require__(15));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(16));
	
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
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	exports.wt = wt;
	exports.rt = rt;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
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
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _utilEs6Js = __webpack_require__(1);
	
	var assert = _utilEs6Js.assert;
	var isDefined = _utilEs6Js.isDefined;
	
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
		function ApplicationError() {
			_classCallCheck(this, ApplicationError);
	
			if (_Error != null) {
				_Error.apply(this, arguments);
			}
		}
	
		_inherits(ApplicationError, _Error);
	
		return ApplicationError;
	})(Error);
	
	var PreconditionFailure = exports.PreconditionFailure = (function (_ApplicationError) {
		function PreconditionFailure(delta, value) {
			_classCallCheck(this, PreconditionFailure);
	
			_get(Object.getPrototypeOf(PreconditionFailure.prototype), "constructor", this).call(this);
			this.name = "PreconditionFailure";
			this.message = "This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.";
			this.delta = delta;
			this.value = value;
		}
	
		_inherits(PreconditionFailure, _ApplicationError);
	
		return PreconditionFailure;
	})(ApplicationError);
	
	var MultipleOverloadsApplicationError = exports.MultipleOverloadsApplicationError = (function (_PreconditionFailure) {
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
	
		_inherits(MultipleOverloadsApplicationError, _PreconditionFailure);
	
		return MultipleOverloadsApplicationError;
	})(PreconditionFailure);
	
	var NoOverloadsApplicationError = exports.NoOverloadsApplicationError = (function (_PreconditionFailure2) {
		function NoOverloadsApplicationError(delta, value) {
			_classCallCheck(this, NoOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(NoOverloadsApplicationError.prototype), "constructor", this).call(this, delta, value);
			this.name = "NoOverloadsApplicationError";
			this.message = "This delta of type '" + delta.type + "' has no specific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".";
		}
	
		_inherits(NoOverloadsApplicationError, _PreconditionFailure2);
	
		return NoOverloadsApplicationError;
	})(PreconditionFailure);
	
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
	
	var UnresolvedDeltaConflict = exports.UnresolvedDeltaConflict = (function (_ApplicationError2) {
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
	
		_inherits(UnresolvedDeltaConflict, _ApplicationError2);
	
		return UnresolvedDeltaConflict;
	})(ApplicationError);
	
	var MultipleActiveProxiesError = exports.MultipleActiveProxiesError = (function (_Error5) {
		function MultipleActiveProxiesError() {
			_classCallCheck(this, MultipleActiveProxiesError);
	
			_get(Object.getPrototypeOf(MultipleActiveProxiesError.prototype), "constructor", this).call(this);
			this.name = "MultipleActiveProxiesError";
			this.message = "Only one Proxy per path can be active at any given time.";
		}
	
		_inherits(MultipleActiveProxiesError, _Error5);
	
		return MultipleActiveProxiesError;
	})(Error);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	
	var _TargetEs6Js = __webpack_require__(3);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var wt = _TargetEs6Js.wt;
	
	var _ErrorEs6Js = __webpack_require__(5);
	
	var PreconditionFailure = _ErrorEs6Js.PreconditionFailure;
	var CompositionError = _ErrorEs6Js.CompositionError;
	
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
					}
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
									return new deltaJs.Delta.Composed([d1, d2]);
								};
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
	
		/* define deltaJs.Delta.Composed for use in compositions */
		define_Composed(deltaJs);
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var define_Delta = _interopRequire(__webpack_require__(6));
	
	var _utilEs6Js = __webpack_require__(1);
	
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var _ErrorEs6Js = __webpack_require__(5);
	
	var MultipleOverloadsApplicationError = _ErrorEs6Js.MultipleOverloadsApplicationError;
	var NoOverloadsApplicationError = _ErrorEs6Js.NoOverloadsApplicationError;
	var MultipleOverloadsCompositionError = _ErrorEs6Js.MultipleOverloadsCompositionError;
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
	
					/** {@public}{@method}{@nosideeffects}
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
				equals: {
					value: function equals(other) {
						return arraysEqual(this.overloads, other.overloads, function (d1, d2) {
							return d1.equals(d2);
						});
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var indent = _utilEs6Js.indent;
	var t = _utilEs6Js.t;
	var oncePer = _utilEs6Js.oncePer;
	var objectsEqual = _utilEs6Js.objectsEqual;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var wt = __webpack_require__(3).wt;
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(16));
	
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
	
			_createClass(Modify, {
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
					}
				},
				equals: {
					value: function equals(other) {
						return objectsEqual(this.subDeltas, other.subDeltas, function (d1, d2) {
							return d1.equals(d2);
						});
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	
	var _TargetEs6Js = __webpack_require__(3);
	
	var WritableTarget = _TargetEs6Js.WritableTarget;
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var rt = _TargetEs6Js.rt;
	var wt = _TargetEs6Js.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(6));
	
	var define_Modify = _interopRequire(__webpack_require__(8));
	
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	var arraysHaveSameElements = _utilEs6Js.arraysHaveSameElements;
	var customIndexOf = _utilEs6Js.customIndexOf;
	
	var define_Modify = _interopRequire(__webpack_require__(8));
	
	var define_basicOperations = _interopRequire(__webpack_require__(9));
	
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
	
			_createClass(PutIntoArray, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoArray.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					}
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
	
	var _utilEs6Js = __webpack_require__(1);
	
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var WritableTarget = __webpack_require__(3).WritableTarget;
	
	var define_Modify = _interopRequire(__webpack_require__(8));
	
	var define_BasicOperations = _interopRequire(__webpack_require__(9));
	
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
	
			_createClass(PutIntoFunction, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(PutIntoFunction.prototype), "clone", this).call(this);
						result.values = [].concat(_toConsumableArray(this.values));
						return result;
					}
				},
				equals: {
					value: function equals(other) {
						return arraysEqual(this.values, other.values, function (a, b) {
							return a.method === b.method && a.value && b.value;
						});
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(17));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var isDefined = _utilEs6Js.isDefined;
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var o = _utilEs6Js.o;
	var graphDescendants = _utilEs6Js.graphDescendants;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var define_Modify = _interopRequire(__webpack_require__(8));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(16));
	
	var _ErrorEs6Js = __webpack_require__(5);
	
	var ApplicationOrderCycle = _ErrorEs6Js.ApplicationOrderCycle;
	var UnresolvedDeltaConflict = _ErrorEs6Js.UnresolvedDeltaConflict;
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
					}
				},
				_assertNoUnresolvedConflicts: {
					value: function _assertNoUnresolvedConflicts() {
						var conflicts = this.conflicts();
						conflicts.forEach(function (conflictInfo) {
							if (conflictInfo.conflictResolvingDeltas.length === 0) {
								throw new UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
							}
						});
					}
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var a = _utilEs6Js.a;
	var assert = _utilEs6Js.assert;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	
	var define_DeltaModel = _interopRequire(__webpack_require__(12));
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(17));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var a = _utilEs6Js.a;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
	
	var Path = _interopRequire(__webpack_require__(4));
	
	var define_Overloaded = _interopRequire(__webpack_require__(7));
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Utility /////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	var Callbacks = (function () {
		function Callbacks() {
			_classCallCheck(this, Callbacks);
	
			this._callbacks = [];
		}
	
		_createClass(Callbacks, {
			add: {
				value: function add(fn) {
					var _this = this;
	
					if (this._callbacks.indexOf(fn) === -1) {
						this._callbacks.push(fn);
					}
					return function () {
						var index = _this._callbacks.indexOf(fn);
						if (index !== -1) {
							_this._callbacks.splice(index, 1);
						}
					};
				}
			},
			fire: {
				value: function fire() {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					this._callbacks.forEach(function (fn) {
						fn.apply(undefined, args);
					});
				}
			}
		});
	
		return Callbacks;
	})();
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	var JsGraph = (function () {
		function JsGraph() {
			_classCallCheck(this, JsGraph);
	
			this._vertices = {}; // key -> value
			this._edges = {}; // from -> to -> value
			this._reverseEdges = {}; // to -> from -> null (_edges contains the values)
			this._vertexCount = 0;
			this._edgeCount = 0;
			this._addVertexCallbacks = new Callbacks();
			this._removeVertexCallbacks = new Callbacks();
			this._addEdgeCallbacks = new Callbacks();
			this._removeEdgeCallbacks = new Callbacks();
		}
	
		_createComputedClass(JsGraph, [{
			key: "onAddVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			value: function onAddVertex(fn) {
				return this._addVertexCallbacks.add(fn);
			}
		}, {
			key: "onRemoveVertex",
			value: function onRemoveVertex(fn) {
				return this._removeVertexCallbacks.add(fn);
			}
		}, {
			key: "addNewVertex",
	
			//// creating them ////
	
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new JsGraph.VertexExistsError(key, this._vertices[key]);
				}
				this._vertices[key] = value;
				this._edges[key] = {};
				this._reverseEdges[key] = {};
				this._vertexCount += 1;
				this._addVertexCallbacks.fire(key, value);
			}
		}, {
			key: "setVertex",
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this._vertices[key] = value;
			}
		}, {
			key: "ensureVertex",
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "addVertex",
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "removeExistingVertex",
	
			//// removing them ////
	
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				if (Object.keys(this._edges[key]).length) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				if (Object.keys(this._reverseEdges[key]).length) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				var valueOfRemovedVertex = this._vertices[key];
				delete this._vertices[key];
				this._vertexCount -= 1;
				this._removeVertexCallbacks.fire(key, valueOfRemovedVertex);
			}
		}, {
			key: "destroyExistingVertex",
			value: function destroyExistingVertex(key) {
				var _this = this;
	
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this.eachVertexFrom(key, function (to) {
					_this.removeEdge(key, to);
				});
				this.eachVertexTo(key, function (from) {
					_this.removeEdge(from, key);
				});
				this.removeExistingVertex(key);
			}
		}, {
			key: "removeVertex",
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
		}, {
			key: "destroyVertex",
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
		}, {
			key: "vertexCount",
	
			//// querying them ////
	
			value: function vertexCount() {
				return this._vertexCount;
			}
		}, {
			key: "hasVertex",
			value: function hasVertex(key) {
				return key in this._vertices;
			}
		}, {
			key: "vertexValue",
			value: function vertexValue(key) {
				return this._vertices[key];
			}
		}, {
			key: "onAddEdge",
	
			///////////////////////////
			////////// Edges //////////
			///////////////////////////
	
			value: function onAddEdge(fn) {
				return this._addEdgeCallbacks.add(fn);
			}
		}, {
			key: "onRemoveEdge",
			value: function onRemoveEdge(fn) {
				return this._removeEdgeCallbacks.add(fn);
			}
		}, {
			key: "addNewEdge",
			value: function addNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(from);
					} else {
						throw new JsGraph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				this._edges[from][to] = value;
				this._reverseEdges[to][from] = null;
				this._edgeCount += 1;
				this._addEdgeCallbacks.fire(from, to, value);
			}
		}, {
			key: "createNewEdge",
			value: function createNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new JsGraph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
		}, {
			key: "setEdge",
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges[from][to] = value;
			}
		}, {
			key: "spanEdge",
			value: function spanEdge(from, to, value) {
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new JsGraph.VertexNotExistsError(from);
					} else {
						throw new JsGraph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				if (!this.hasEdge(from, to)) {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "addEdge",
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "ensureEdge",
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "createEdge",
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "removeExistingEdge",
	
			//// removing them ////
	
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				var valueOfRemovedEdge = this._edges[from][to];
				delete this._edges[from][to];
				delete this._reverseEdges[to][from];
				this._edgeCount -= 1;
				this._removeEdgeCallbacks.fire(from, to, valueOfRemovedEdge);
			}
		}, {
			key: "removeEdge",
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
		}, {
			key: "edgeCount",
	
			//// querying them ////
	
			value: function edgeCount() {
				return this._edgeCount;
			}
		}, {
			key: "hasEdge",
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && from in this._edges && to in this._edges[from];
			}
		}, {
			key: "edgeValue",
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges[from][to] : undefined;
			}
		}, {
			key: "successors",
	
			//////////////////////////
			////////// More //////////
			//////////////////////////
	
			value: function successors(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return Object.keys(this._edges[from]);
			}
		}, {
			key: "predecessors",
			value: function predecessors(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return Object.keys(this._reverseEdges[to]);
			}
		}, {
			key: "eachVertex",
	
			///////////////////////////////
			////////// Iteration //////////
			///////////////////////////////
	
			value: function eachVertex(handler) {
				var _this = this;
	
				Object.keys(this._vertices).every(function (key) {
					var r = handler(key, _this._vertices[key]);
					return r !== false;
				});
			}
		}, {
			key: "eachVertexFrom",
			value: function eachVertexFrom(from, handler) {
				var _this = this;
	
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				Object.keys(this._edges[from]).every(function (to) {
					var r = handler(to, _this.vertexValue(to), _this.edgeValue(from, to));
					return r !== false;
				});
			}
		}, {
			key: "eachVertexTo",
			value: function eachVertexTo(to, handler) {
				var _this = this;
	
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				Object.keys(this._reverseEdges[to]).every(function (from) {
					var r = handler(from, _this.vertexValue(from), _this.edgeValue(from, to));
					return r !== false;
				});
			}
		}, {
			key: "eachEdge",
			value: function eachEdge(handler) {
				var _this = this;
	
				Object.keys(this._edges).every(function (from) {
					return Object.keys(_this._edges[from]).every(function (to) {
						var r = handler(from, to, _this._edges[from][to]);
						return r !== false;
					});
				});
			}
		}, {
			key: "topologically",
			value: function topologically(handler) {
				var _this = this;
	
				var visited = [];
				var handled = {};
	
				var visit = function (a) {
					visited.push(a);
					var i = visited.indexOf(a);
					if (i !== visited.length - 1) {
						var cycle = visited.slice(i + 1).reverse();
						throw new JsGraph.CycleError(cycle);
					}
					if (!handled[a]) {
						_this.eachVertexTo(a, visit);
						handled[a] = { returned: handler(a, _this.vertexValue(a)) };
					}
					visited.pop();
				};
	
				this.eachVertex(function (a) {
					if (!handled[a]) {
						visit(a);
					}
				});
			}
		}, {
			key: Symbol.iterator,
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			value: function () {
				return this.vertices();
			}
		}, {
			key: "vertices",
			value: regeneratorRuntime.mark(function vertices() {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._vertices)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							key = _step.value;
	
							if (!_this.hasVertex(key)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [key, _this._vertices[key]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t0 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t0;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, vertices, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "edges",
			value: regeneratorRuntime.mark(function edges() {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._edges)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 37;
								break;
							}
	
							from = _step.value;
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							context$2$0.prev = 10;
							_iterator2 = Object.keys(_this._edges[from])[Symbol.iterator]();
	
						case 12:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								context$2$0.next = 20;
								break;
							}
	
							to = _step2.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 17;
								break;
							}
	
							context$2$0.next = 17;
							return [from, to, _this._edges[from][to]];
	
						case 17:
							_iteratorNormalCompletion2 = true;
							context$2$0.next = 12;
							break;
	
						case 20:
							context$2$0.next = 26;
							break;
	
						case 22:
							context$2$0.prev = 22;
							context$2$0.t1 = context$2$0["catch"](10);
							_didIteratorError2 = true;
							_iteratorError2 = context$2$0.t1;
	
						case 26:
							context$2$0.prev = 26;
							context$2$0.prev = 27;
	
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
	
						case 29:
							context$2$0.prev = 29;
	
							if (!_didIteratorError2) {
								context$2$0.next = 32;
								break;
							}
	
							throw _iteratorError2;
	
						case 32:
							return context$2$0.finish(29);
	
						case 33:
							return context$2$0.finish(26);
	
						case 34:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 37:
							context$2$0.next = 43;
							break;
	
						case 39:
							context$2$0.prev = 39;
							context$2$0.t2 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t2;
	
						case 43:
							context$2$0.prev = 43;
							context$2$0.prev = 44;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 46:
							context$2$0.prev = 46;
	
							if (!_didIteratorError) {
								context$2$0.next = 49;
								break;
							}
	
							throw _iteratorError;
	
						case 49:
							return context$2$0.finish(46);
	
						case 50:
							return context$2$0.finish(43);
	
						case 51:
						case "end":
							return context$2$0.stop();
					}
				}, edges, this, [[3, 39, 43, 51], [10, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
			})
		}, {
			key: "verticesFrom",
			value: function verticesFrom(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return this._verticesFrom(from);
			}
		}, {
			key: "_verticesFrom",
			value: regeneratorRuntime.mark(function _verticesFrom(from) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._edges[from])[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							to = _step.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [to, _this._vertices[to], _this._edges[from][to]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t3 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t3;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesFrom, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "verticesTo",
			value: function verticesTo(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return this._verticesTo(to);
			}
		}, {
			key: "_verticesTo",
			value: regeneratorRuntime.mark(function _verticesTo(to) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = Object.keys(_this._reverseEdges[to])[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 13;
								break;
							}
	
							from = _step.value;
	
							if (!_this.hasEdge(from, to)) {
								context$2$0.next = 10;
								break;
							}
	
							context$2$0.next = 10;
							return [from, _this._vertices[from], _this._edges[from][to]];
	
						case 10:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 13:
							context$2$0.next = 19;
							break;
	
						case 15:
							context$2$0.prev = 15;
							context$2$0.t4 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t4;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.prev = 20;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 22:
							context$2$0.prev = 22;
	
							if (!_didIteratorError) {
								context$2$0.next = 25;
								break;
							}
	
							throw _iteratorError;
	
						case 25:
							return context$2$0.finish(22);
	
						case 26:
							return context$2$0.finish(19);
	
						case 27:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesTo, this, [[3, 15, 19, 27], [20,, 22, 26]]);
			})
		}, {
			key: "vertices_topologically",
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var _this2 = this;
	
				var visit = regeneratorRuntime.mark(function visit(a) {
					var i, cycle, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, b;
	
					return regeneratorRuntime.wrap(function visit$(context$3$0) {
						while (1) switch (context$3$0.prev = context$3$0.next) {
							case 0:
								visited.push(a);
								i = visited.indexOf(a);
	
								if (!(i !== visited.length - 1)) {
									context$3$0.next = 5;
									break;
								}
	
								cycle = visited.slice(i + 1).reverse();
								throw new JsGraph.CycleError(cycle);
	
							case 5:
								if (handled[a]) {
									context$3$0.next = 36;
									break;
								}
	
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								context$3$0.prev = 9;
								_iterator = _this.verticesTo(a)[Symbol.iterator]();
	
							case 11:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									context$3$0.next = 18;
									break;
								}
	
								_step$value = _slicedToArray(_step.value, 1);
								b = _step$value[0];
								return context$3$0.delegateYield(visit(b), "t5", 15);
	
							case 15:
								_iteratorNormalCompletion = true;
								context$3$0.next = 11;
								break;
	
							case 18:
								context$3$0.next = 24;
								break;
	
							case 20:
								context$3$0.prev = 20;
								context$3$0.t6 = context$3$0["catch"](9);
								_didIteratorError = true;
								_iteratorError = context$3$0.t6;
	
							case 24:
								context$3$0.prev = 24;
								context$3$0.prev = 25;
	
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
	
							case 27:
								context$3$0.prev = 27;
	
								if (!_didIteratorError) {
									context$3$0.next = 30;
									break;
								}
	
								throw _iteratorError;
	
							case 30:
								return context$3$0.finish(27);
	
							case 31:
								return context$3$0.finish(24);
	
							case 32:
								if (!_this.hasVertex(a)) {
									context$3$0.next = 35;
									break;
								}
	
								context$3$0.next = 35;
								return [a, _this._vertices[a]];
	
							case 35:
								handled[a] = true;
	
							case 36:
								visited.pop();
	
							case 37:
							case "end":
								return context$3$0.stop();
						}
					}, visit, this, [[9, 20, 24, 32], [25,, 27, 31]]);
				});
	
				var visited, handled, _this, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visited = [];
							handled = {};
							_this = _this2;
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 6;
							_iterator = _this2.vertices()[Symbol.iterator]();
	
						case 8:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 16;
								break;
							}
	
							_step$value = _slicedToArray(_step.value, 1);
							a = _step$value[0];
	
							if (handled[a]) {
								context$2$0.next = 13;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t7", 13);
	
						case 13:
							_iteratorNormalCompletion = true;
							context$2$0.next = 8;
							break;
	
						case 16:
							context$2$0.next = 22;
							break;
	
						case 18:
							context$2$0.prev = 18;
							context$2$0.t8 = context$2$0["catch"](6);
							_didIteratorError = true;
							_iteratorError = context$2$0.t8;
	
						case 22:
							context$2$0.prev = 22;
							context$2$0.prev = 23;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 25:
							context$2$0.prev = 25;
	
							if (!_didIteratorError) {
								context$2$0.next = 28;
								break;
							}
	
							throw _iteratorError;
	
						case 28:
							return context$2$0.finish(25);
	
						case 29:
							return context$2$0.finish(22);
	
						case 30:
						case "end":
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[6, 18, 22, 30], [23,, 25, 29]]);
			})
		}, {
			key: "clearEdges",
	
			//////////////////////////////
			////////// Clearing //////////
			//////////////////////////////
	
			value: function clearEdges() {
				var _this = this;
	
				this.eachEdge(function (from, to) {
					_this.removeEdge(from, to);
				});
			}
		}, {
			key: "clear",
			value: function clear() {
				var _this = this;
	
				this.eachVertex(function (v) {
					_this.destroyVertex(v);
				});
			}
		}, {
			key: "hasCycle",
	
			//////////////////////////////////////
			////////// Advanced Queries //////////
			//////////////////////////////////////
	
			value: function hasCycle() {
				var _this = this;
	
				var visited = {};
				var handled = {};
	
				var cycleFound = false;
	
				var visit = function (a) {
					/* if a cycle is found, record it and return */
					if (visited[a]) {
						cycleFound = true;
						return;
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled[a]) {
						return;
					}
					handled[a] = true;
	
					/* recursively visit successors to check for cycles */
					visited[a] = true;
					_this.eachVertexFrom(a, function (b) {
						visit(b);
						if (cycleFound) {
							return false;
						}
					});
					visited[a] = false;
				};
	
				this.eachVertex(function (a) {
					visit(a);
					if (cycleFound) {
						return false;
					}
				});
	
				return cycleFound;
			}
		}, {
			key: "hasPath",
			value: function hasPath(from, to) {
				var _this = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return false;
				}
	
				var visited = {};
	
				/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
				var hasPathAux = function (current) {
					if (_this.hasEdge(current, to)) {
						return true;
					}
					visited[current] = true;
					var found = false;
					_this.eachVertexFrom(current, function (next) {
						if (!found && !visited[next] && hasPathAux(next)) {
							found = true;
						}
					});
					delete visited[current];
					return found;
				};
	
				return hasPathAux(from);
			}
		}, {
			key: "clone",
	
			/////////////////////////////
			////////// Cloning //////////
			/////////////////////////////
	
			value: function clone() {
				var result = new JsGraph();
				this.eachVertex(function (key, val) {
					result.addVertex(key, val);
				});
				this.eachEdge(function (from, to, val) {
					result.addEdge(from, to, val);
				});
				return result;
			}
		}, {
			key: "transitiveReduction",
			value: function transitiveReduction() {
				var result = this.clone();
				result.eachVertex(function (x) {
					result.eachVertex(function (y) {
						if (result.hasEdge(x, y)) {
							result.eachVertex(function (z) {
								if (result.hasPath(y, z)) {
									result.removeEdge(x, z);
								}
							});
						}
					});
				});
				return result;
			}
		}]);
	
		return JsGraph;
	})();
	
	module.exports = JsGraph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	JsGraph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			this.vertices = {};
			this.v(key, value);
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, {
			v: {
				value: function v(key, value) {
					this.vertices[key] = value;
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
					this.message = "This graph has " + aVertices + " '" + Object.keys(this.vertices).join("', '") + "'";
				}
			}
		});
	
		return VertexExistsError;
	})(Error);
	
	JsGraph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			this.vertices = {};
			this.v(key);
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, {
			v: {
				value: function v(key) {
					this.vertices[key] = undefined;
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices === 1 ? "a vertex" : "vertices";
					this.message = "This graph does not have " + aVertices + " '" + Object.keys(this.vertices).join("', '") + "'";
				}
			}
		});
	
		return VertexNotExistError;
	})(Error);
	
	JsGraph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			this.edges = {};
			this.e(from, to, value);
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, {
			e: {
				value: function e(from, to, value) {
					this.edges[from] = _defineProperty({}, to, value);
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var _this = this;
	
					var edges = [];
					Object.keys(this.edges).forEach(function (from) {
						Object.keys(_this.edges[from]).forEach(function (to) {
							edges.push("('" + from + "', '" + to + "')");
						});
					});
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph has " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeExistsError;
	})(Error);
	
	JsGraph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistError(from, to) {
			_classCallCheck(this, EdgeNotExistError);
	
			this.edges = {};
			this.e(from, to);
		}
	
		_inherits(EdgeNotExistError, _Error4);
	
		_createClass(EdgeNotExistError, {
			e: {
				value: function e(from, to) {
					this.edges[from] = _defineProperty({}, to, undefined);
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var _this = this;
	
					var edges = [];
					Object.keys(this.edges).forEach(function (from) {
						Object.keys(_this.edges[from]).forEach(function (to) {
							edges.push("('" + from + "', '" + to + "')");
						});
					});
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeNotExistError;
	})(Error);
	
	JsGraph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			this.message = "The '" + key + "' vertex has connected edges";
			this.key = key;
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	JsGraph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			this.message = "This graph contains a cycle: " + cycle;
			this.cycle = cycle;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
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
	
			_createClass(Composed, {
				clone: {
					value: function clone() {
						var result = _get(Object.getPrototypeOf(Composed.prototype), "clone", this).call(this);
						result._components = this._components.map(function (delta) {
							return delta.clone();
						});
						return result;
					}
				},
				equals: {
					value: function equals(other) {
						return arraysEqual(this._components, other._components, function (d1, d2) {
							return d1.equals(d2);
						});
					}
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						this._components.forEach(function (components) {
							components.applyTo(target, options);
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
	
						var str = _get(Object.getPrototypeOf(Composed.prototype), "toString", this).call(this, options);
						if (this._components.length > 0) {
							var deltas = "";
							this._components.forEach(function (delta) {
								deltas += "• " + delta.toString(options) + "\n";
							});
							str += "\n" + indent(deltas, 4);
						}
						return str;
					}
				},
				precondition: {
					value: function precondition(target) {
						if (this._components.length === 0) {
							return true;
						}
						return this._components[0].precondition(target);
					}
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
					}
				},
				methods: {
					get: function () {
						return [];
					}
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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(17));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(1);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	
	var define_Delta = _interopRequire(__webpack_require__(6));
	
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
//# sourceMappingURL=delta.js.map