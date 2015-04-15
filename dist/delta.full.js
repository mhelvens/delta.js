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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	/* import utilities */
	
	var extend = __webpack_require__(4).extend;
	
	/* import the DeltaJs class */
	
	var DeltaJs = _interopRequire(__webpack_require__(5));
	
	/* make Target classes available under the DeltaJs symbol */
	
	var _TargetEs6Js = __webpack_require__(6);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var WritableTarget = _TargetEs6Js.WritableTarget;
	
	extend(DeltaJs, { ReadableTarget: ReadableTarget, WritableTarget: WritableTarget });
	
	/* make Path classes available under the DeltaJs symbol */
	
	var Path = _interopRequire(__webpack_require__(7));
	
	extend(DeltaJs, { Path: Path });
	
	/* make Error classes available under the DeltaJs symbol */
	
	var _ErrorEs6Js = __webpack_require__(8);
	
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/*  extend the first passed object with the properties     */
	/*  of the other objects, from left to right, and returns  */
	/*  the first passed object                                */
	exports.extend = extend;
	exports.o = o;
	exports.a = a;
	exports.m = m;
	exports.s = s;
	
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
	exports.mapEqual = mapEqual;
	exports.customIndexOf = customIndexOf;
	exports.arraysEqual = arraysEqual;
	exports.arraysHaveSameElements = arraysHaveSameElements;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function extend(obj1) {
		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}
	
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = rest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var obj = _step.value;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var key = _step2.value;
	
						Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return obj1;
	}
	
	var _default = function (ds) {
		return function (object) {
			for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				rest[_key - 1] = arguments[_key];
			}
	
			var keys = rest.slice(0, -1);
			var def = rest[rest.length - 1];
			if (keys.length === 0) {
				return object;
			}
			var last = ds.apply(undefined, [object].concat(_toConsumableArray(keys.slice(0, -1))));
			if (last instanceof Map) {
				if (isUndefined(last.get(keys[keys.length - 1]))) {
					last.set(keys[keys.length - 1], def);
				}
				return last.get(keys[keys.length - 1]);
			} else {
				if (isUndefined(last[keys[keys.length - 1]])) {
					last[keys[keys.length - 1]] = def;
				}
				return last[keys[keys.length - 1]];
			}
		};
	};
	
	function o(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return _default(o).apply(undefined, [object].concat(keys, [{}]));
	}
	
	function a(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return _default(o).apply(undefined, [object].concat(keys, [[]]));
	}
	
	function m(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return _default(m).apply(undefined, [object].concat(keys, [new Map()]));
	}
	
	function s(object) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}
	
		return _default(m).apply(undefined, [object].concat(keys, [new Set()]));
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
		var opFn = function (obj) {
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
	
			return opFn;
		} else {
			return opFn(obj);
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
	
	function mapEqual(a, b) {
		var eq = arguments[2] === undefined ? function (x, y) {
			return x === y;
		} : arguments[2];
	
		if (a.size !== b.size) {
			return false;
		}
		var aKeys = [].concat(_toConsumableArray(a.keys())).sort();
		var bKeys = [].concat(_toConsumableArray(b.keys())).sort();
		for (var i = 0; i < aKeys.length; ++i) {
			if (aKeys[i] !== bKeys[i]) {
				return false;
			}
			if (!eq(a.get(aKeys[i]), b.get(bKeys[i]))) {
				return false;
			}
		}
		return true;
	}
	
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(22));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var assert = _utilEs6Js.assert;
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var Path = _interopRequire(__webpack_require__(7));
	
	var _TargetEs6Js = __webpack_require__(6);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var WritableTarget = _TargetEs6Js.WritableTarget;
	var rt = _TargetEs6Js.rt;
	var wt = _TargetEs6Js.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(9));
	
	var define_Overloaded = _interopRequire(__webpack_require__(10));
	
	var define_Modify = _interopRequire(__webpack_require__(11));
	
	var define_basicOperations = _interopRequire(__webpack_require__(12));
	
	var define_PutIntoArray = _interopRequire(__webpack_require__(13));
	
	var define_PutIntoFunction = _interopRequire(__webpack_require__(14));
	
	var define_DeltaModel = _interopRequire(__webpack_require__(15));
	
	var define_features = _interopRequire(__webpack_require__(16));
	
	var define_variationPoints = _interopRequire(__webpack_require__(17));
	
	var define_applicationConditions = _interopRequire(__webpack_require__(18));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(19));
	
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
	
				/**
	    * @param name       {string}   - name of the new operation type
	    * @param DeltaClass {Function} - the new operation class
	    * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	    */
	
				value: function newOperationType(name, DeltaClass) {
					var ProxyClass = arguments[2] === undefined ? null : arguments[2];
	
					/* sanity checks */
					assert(name[0] === name[0].toUpperCase(), "Delta operation classes must have a name starting with a capital letter - '" + name + "' does not.");
					assert(isUndefined(this.Delta[name]), "The '" + name + "' operation type already exists.");
	
					/* store the operation class */
					this.Delta[name] = DeltaClass;
	
					/* set the (optional) Proxy class */
					DeltaClass.Proxy = ProxyClass;
	
					/* fetch certain given methods (if they exist) that need to be slightly augmented */
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
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = (DeltaClass.prototype.methods || [lowercaseName])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var method = _step.value;
	
							this.ContainerProxy.newProxyMethod(method, function () {
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}
	
								return _applyConstructor(DeltaClass, args);
							});
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _utilEs6Js = __webpack_require__(4);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
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
			deltaNames = [].concat(_toConsumableArray(deltaNames));
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	var isDefined = _utilEs6Js.isDefined;
	var isUndefined = _utilEs6Js.isUndefined;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var _TargetEs6Js = __webpack_require__(6);
	
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var wt = _TargetEs6Js.wt;
	
	var _ErrorEs6Js = __webpack_require__(8);
	
	var PreconditionFailure = _ErrorEs6Js.PreconditionFailure;
	var CompositionError = _ErrorEs6Js.CompositionError;
	
	var define_Composed = _interopRequire(__webpack_require__(23));
	
	module.exports = oncePer("Delta", function (deltaJs) {
	
		//
		//oncePer(deltaJs.constructor, 'Delta', () => {
		//
		//	extend(deltaJs.constructor.prototype, {
		//		newCommutation(precondition, predicate) {
		//			this.Delta.newCommutation(precondition, predicate);
		//		}
		//	});
		//
		//});
	
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
				toString: {
	
					///**
					// * @public
					// * @method
					// * @nosideeffects
					// */
					//commutesWith(other) { return deltaJs.Delta.commute(this, other) }
	
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
	
					///**
					// * @public
					// * @static
					// * @method
					// *
					// */
					//static newCommutation(precondition, predicate) {
					//	deltaJs.Delta._commutations.push({precondition, predicate});
					//}
	
					///**
					// *
					// */
					//static commute(d1, d2, {weak} = {}) {
					//	for (let {precondition, predicate} of deltaJs.Delta._commutations) {
					//		if (precondition(d1, d2)) {
					//			return predicate(d1, d2);
					//		} else if (precondition(d2, d1)) {
					//			return predicate(d2, d1);
					//		}
					//	}
					//	return d1.composedWith(d2).equals(d2.composedWith(d1));
					//}
	
				}
			});
	
			return Delta;
		})();
		deltaJs.Delta._nextID = 0;
		//deltaJs.Delta._commutations = []; // [{precondition, predicate}]
	
		var _multiDispatchOptions = new Map();
	
		/**
	  * To create new 'multiple dispatch' functions for mixed types of deltas.
	  * Any number of candidate functions can be created,
	  * which are then selected based on their precondition predicates.
	  * @private
	  * @param name             {String}
	  * @param staticMethodName {String}
	  * @param methodName       {String}
	  * @param onTrue           {Function=undefined}
	  * @param onFalse          {Function=undefined}
	  * @param onDefault        {Function|Boolean=false}
	  * @param commutative      {Boolean}
	  */
		function newMultiDispatch(name, staticMethodName, methodName) {
			var _ref = arguments[3] === undefined ? {} : arguments[3];
	
			var onTrue = _ref.onTrue;
			var onFalse = _ref.onFalse;
			var onDefault = _ref.onDefault;
			var commutative = _ref.commutative;
	
			/* store the options */
			_multiDispatchOptions.set(name, { commutative: commutative });
	
			/* convenience variables */
			var creationMethodName = "new" + name[0].toUpperCase() + "" + name.slice(1);
			var privateVarName = "_multiDispatch_" + name;
	
			/* set defaults */
			if (!onTrue) {
				onTrue = function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					return args;
				};
			}
			if (!onFalse) {
				onFalse = function () {
					throw new Error("Failure in finding a " + name + "!");
				};
			}
			if (onDefault === "onTrue") {
				onDefault = onTrue;
			}
			if (onDefault === "onFalse" || !onDefault) {
				onDefault = onFalse;
			}
	
			/* set static Delta members */
			extend(deltaJs.Delta, (function () {
				var _extend = {};
	
				_defineProperty(_extend, privateVarName, []);
	
				_defineProperty(_extend, creationMethodName, function (precondition, value) {
					deltaJs.Delta[privateVarName].push({ precondition: precondition, value: value });
				});
	
				_defineProperty(_extend, staticMethodName, function (d1, d2, d3) {
					/* use the first composition function for which these deltas satisfy the precondition */
					var fn = function () {};
					var found = false;
					var commuting = false;
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = deltaJs.Delta[privateVarName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _step.value;
							var precondition = _step$value.precondition;
							var value = _step$value.value;
	
							if (precondition(d1, d2, d3)) {
								fn = value;
								found = true;
								break;
							} else if (commutative && (isDefined(d3) && precondition(d1, d3, d2) || isUndefined(d3) && precondition(d2, d1))) {
								fn = value;
								found = true;
								commuting = true;
								break;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					/* if no function was found, set the proper function */
					if (!found) {
						fn = onDefault;
					} else if (fn === false) {
						fn = onFalse;
					} else if (fn === true) {
						fn = onTrue;
					}
					/* return the result */
					if (commuting) {
						if (isDefined(d3)) {
							return fn(d1, d3, d2);
						} else {
							return fn(d2, d1);
						}
					} else {
						return fn(d1, d2, d3);
					}
				});
	
				return _extend;
			})());
	
			extend(deltaJs.Delta.prototype, _defineProperty({}, methodName, function () {
				var _deltaJs$Delta;
	
				for (var _len = arguments.length, others = Array(_len), _key = 0; _key < _len; _key++) {
					others[_key] = arguments[_key];
				}
	
				return (_deltaJs$Delta = deltaJs.Delta)[staticMethodName].apply(_deltaJs$Delta, [this].concat(others));
			}));
	
			oncePer(deltaJs.constructor, "multiDispatch:" + name, function () {
				extend(deltaJs.constructor.prototype, _defineProperty({}, creationMethodName, function (precondition, fn) {
					return this.Delta[creationMethodName](precondition, fn);
				}));
			});
		}
	
		function customMultiDispatchGiven(name, d1, d2, d3) {
			var privateVarName = "_multiDispatch_" + name;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = deltaJs.Delta[privateVarName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _step.value;
					var precondition = _step$value.precondition;
					var value = _step$value.value;
	
					if (precondition(d1, d2, d3)) {
						return typeof value === "function";
					} else if (_multiDispatchOptions.get(name).commutative && (isDefined(d3) && precondition(d1, d3, d2) || isUndefined(d3) && precondition(d2, d1))) {
						return typeof value === "function";
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch("composition", "_binaryComposed", "composedWith", {
			onTrue: function (d1, d2) {
				return new deltaJs.Delta.Composed([d1, d2]);
			},
			onFalse: function (d1, d2) {
				throw new CompositionError(d1, d2);
			},
			onDefault: "onFalse"
		});
		deltaJs.Delta.composed = function composed() {
			for (var _len = arguments.length, deltas = Array(_len), _key = 0; _key < _len; _key++) {
				deltas[_key] = arguments[_key];
			}
	
			return deltas.map(function (d) {
				return d || new deltaJs.Delta.NoOp();
			}).reduce(deltaJs.Delta._binaryComposed, new deltaJs.Delta.NoOp());
		};
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch("commutation", "commute", "commutesWith", {
			onTrue: function (d1, d2) {
				return true;
			},
			onFalse: function (d1, d2) {
				return false;
			},
			onDefault: function (d1, d2) {
				return d1.composedWith(d2).equals(d2.composedWith(d1));
			},
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch("refinement", "refines", "refines", {
			onTrue: function (d1, d2) {
				return true;
			},
			onFalse: function (d1, d2) {
				return false;
			},
			onDefault: function (d1, d2) {
				return d1.equals(d2);
			}
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch("equality", "equal", "equals", {
			onTrue: function (d1, d2) {
				return true;
			},
			onFalse: function (d1, d2) {
				return false;
			},
			onDefault: function (d1, d2) {
				if (customMultiDispatchGiven("refinement", d1, d2)) {
					return d1.refines(d2) && d2.refines(d1);
				} else {
					return d1.type === d2.type && arraysEqual(d1.args, d2.args);
				}
			},
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch("resolution", "resolves", "resolves", {
			onTrue: function (d1, d2, d3) {
				return true;
			},
			onFalse: function (d1, d2, d3) {
				return false;
			},
			onDefault: function (d1, d2, d3) {
				return deltaJs.Delta.composed(d2, d3, d1).equals(deltaJs.Delta.composed(d3, d2, d1));
			},
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
	
		/* define deltaJs.Delta.Composed for use in compositions */
		define_Composed(deltaJs);
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	var t = _utilEs6Js.t;
	
	var define_Delta = _interopRequire(__webpack_require__(9));
	
	var _ErrorEs6Js = __webpack_require__(8);
	
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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = D1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var delta1 = _step.value;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = D2[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var delta2 = _step2.value;
	
							try {
								result.overloads.push(delta1.composedWith(delta2));
							} catch (error) {
								errors.push(error);
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			if (result.overloads.length === 0) {
				throw new MultipleOverloadsCompositionError(d1, d2, errors);
			}
			return result;
		});
	
		/* equality */
		deltaJs.newEquality(t("Overloaded", "Overloaded"), function (d1, d2) {
			return arraysEqual(d1.overloads, d2.overloads, function (x, y) {
				return x.equals(y);
			});
		});
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var indent = _utilEs6Js.indent;
	var t = _utilEs6Js.t;
	var oncePer = _utilEs6Js.oncePer;
	var mapEqual = _utilEs6Js.mapEqual;
	
	var Path = _interopRequire(__webpack_require__(7));
	
	var wt = __webpack_require__(6).wt;
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(19));
	
	module.exports = oncePer("Modify", function (deltaJs) {
	
		define_ContainerProxy(deltaJs);
	
		//noinspection JSUnusedLocalSymbols
		deltaJs.newOperationType("Modify", (function (_deltaJs$Delta) {
			function Modify() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Modify);
	
				_get(Object.getPrototypeOf(Modify.prototype), "constructor", this).apply(this, args);
				this.subDeltas = new Map(this.arg && Object.keys(this.arg).map(function (key) {
					return [key, _this.arg[key]];
				}));
			}
	
			_inherits(Modify, _deltaJs$Delta);
	
			_createClass(Modify, {
				clone: {
	
					/** {@public}{@method}{@nosideeffects}
	     * @return {DeltaJs#Delta.Modify} - a clone of this delta
	     */
	
					value: function clone() {
						var result = _get(Object.getPrototypeOf(Modify.prototype), "clone", this).call(this);
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.subDeltas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _slicedToArray(_step.value, 2);
	
								var key = _step$value[0];
								var delta = _step$value[1];
	
								result.subDeltas.set(key, delta.clone());
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
	
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
						var options = arguments[1] === undefined ? {} : arguments[1];
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.subDeltas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _slicedToArray(_step.value, 2);
	
								var prop = _step$value[0];
								var delta = _step$value[1];
	
								if (!options.restrictToProperty || options.restrictToProperty === prop) {
									delta.applyTo(wt(target.value, prop), extend({}, options, { restrictToProperty: null }));
								}
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
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
	
						var str = _get(Object.getPrototypeOf(Modify.prototype), "toString", this).call(this, options);
						if (this.subDeltas.size > 0) {
							var deltas = this.subDeltas.entries().map(function (_ref) {
								var _ref2 = _slicedToArray(_ref, 2);
	
								var prop = _ref2[0];
								var delta = _ref2[1];
								return delta.toString(extend({}, options, { targetProp: prop }));
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
						var result = _get(Object.getPrototypeOf(ModifyProxy.prototype), "delta", this).call(this);
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.childKeys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var prop = _step.value;
	
								result.subDeltas.set(prop, this.childDelta(prop));
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
	
						return result;
					}
				}
			});
	
			return ModifyProxy;
		})(deltaJs.ContainerProxy));
	
		/* composition - introducing 'Modify' ***********************************************/
		deltaJs.newComposition(t("Modify", "Modify"), function (d1, d2) {
			var result = d1.clone();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = d2.subDeltas.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var prop = _step.value;
	
					result.subDeltas.set(prop, deltaJs.Delta.composed(result.subDeltas.get(prop), d2.subDeltas.get(prop)));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			return result;
		});
	
		/* equality ***********************************************/
		deltaJs.newEquality(t("Modify", "Modify"), function (d1, d2) {
			return mapEqual(d1.subDeltas, d2.subDeltas, function (x, y) {
				return x.equals(y);
			});
		});
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	
	var _TargetEs6Js = __webpack_require__(6);
	
	var WritableTarget = _TargetEs6Js.WritableTarget;
	var ReadableTarget = _TargetEs6Js.ReadableTarget;
	var rt = _TargetEs6Js.rt;
	var wt = _TargetEs6Js.wt;
	
	var define_Delta = _interopRequire(__webpack_require__(9));
	
	var define_Modify = _interopRequire(__webpack_require__(11));
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	var arraysHaveSameElements = _utilEs6Js.arraysHaveSameElements;
	var customIndexOf = _utilEs6Js.customIndexOf;
	
	var define_Modify = _interopRequire(__webpack_require__(11));
	
	var define_basicOperations = _interopRequire(__webpack_require__(12));
	
	var define_Proxy = _interopRequire(__webpack_require__(24));
	
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
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _step.value;
								var method = _step$value.method;
								var value = _step$value.value;
	
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
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
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
	
		/* refinement *******************************************************************************/
		deltaJs.newRefinement(t("PutIntoArray", "PutIntoArray"), function (d1, d2) {
			/* define operation equality */
			var eq = function (x, y) {
				return x.method === y.method && x.value === y.value;
			};
	
			/* both need to at least have the same operations (not necessarily in the same order) */
			if (!arraysHaveSameElements(d1.values, d2.values, eq)) {
				return false;
			}
	
			/* appensions and prepensions need to be in the same order */
			if (!arraysEqual(d1.values.filter(function (v) {
				return v.method === "append";
			}), d2.values.filter(function (v) {
				return v.method === "append";
			}), eq)) {
				return false;
			}
			if (!arraysEqual(d1.values.filter(function (v) {
				return v.method === "prepend";
			}), d2.values.filter(function (v) {
				return v.method === "prepend";
			}), eq)) {
				return false;
			}
	
			/* insertions in 'd1' cannot come later than their counterparts in 'd2', */
			/* in the sense of appensions and prepensions that have come before it        */
			var appensionsAndPrepensionsSeen = [];
			for (var i = 0; i < d1.values.length; ++i) {
				if (d1.values[i].method === "insert") {
					var ind = customIndexOf(d2.values, d1.values[i], eq);
					var appensionsAndPrepensionsToGo = [].concat(appensionsAndPrepensionsSeen);
					for (var j = 0; j <= ind; ++j) {
						var indd = customIndexOf(appensionsAndPrepensionsToGo, d2.values[j], eq);
						if (indd > -1) {
							appensionsAndPrepensionsToGo.splice(indd, 1);
						}
					}
					if (appensionsAndPrepensionsToGo.length > 0) {
						return false;
					}
				} else {
					appensionsAndPrepensionsSeen.push(d1.values[i]);
				}
			}
	
			/* OK, it's a refinement */
			return true;
		});
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var isUndefined = _utilEs6Js.isUndefined;
	var isDefined = _utilEs6Js.isDefined;
	var t = _utilEs6Js.t;
	var define_d = _utilEs6Js.define_d;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	
	var WritableTarget = __webpack_require__(6).WritableTarget;
	
	var define_Modify = _interopRequire(__webpack_require__(11));
	
	var define_BasicOperations = _interopRequire(__webpack_require__(12));
	
	var define_Proxy = _interopRequire(__webpack_require__(24));
	
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
								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
									args[_key] = arguments[_key];
								}
	
								var result = undefined;
								var _iteratorNormalCompletion = true;
								var _didIteratorError = false;
								var _iteratorError = undefined;
	
								try {
									for (var _iterator = newFn._DeltaJs_functions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										var fn = _step.value;
	
										result = fn.apply(this, args);
									}
								} catch (err) {
									_didIteratorError = true;
									_iteratorError = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion && _iterator["return"]) {
											_iterator["return"]();
										}
									} finally {
										if (_didIteratorError) {
											throw _iteratorError;
										}
									}
								}
	
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
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _step.value;
								var method = _step$value.method;
								var value = _step$value.value;
	
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
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
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
	
		/* equality */
		// TODO: refinement function instead of equals function (look at PutIntoArray.es6.js)
		deltaJs.newEquality(t("PutIntoFunction", "PutIntoFunction"), function (d1, d2) {
			return arraysEqual(d1.values, d2.values, function (a, b) {
				return a.method === b.method && a.value && b.value;
			});
		});
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(22));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var isDefined = _utilEs6Js.isDefined;
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var s = _utilEs6Js.s;
	var t = _utilEs6Js.t;
	
	var Path = _interopRequire(__webpack_require__(7));
	
	var define_Modify = _interopRequire(__webpack_require__(11));
	
	var define_ContainerProxy = _interopRequire(__webpack_require__(19));
	
	var _ErrorEs6Js = __webpack_require__(8);
	
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
						result.graph = this.graph.clone(function (d) {
							return d.clone();
						});
						return result;
					}
				},
				_assertNoUnresolvedConflicts: {
					value: function _assertNoUnresolvedConflicts() {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.conflicts()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var conflictInfo = _step.value;
	
								if (conflictInfo.conflictResolvingDeltas.size === 0) {
									throw new UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
								}
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					}
				},
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
	
						/* throw an exception if there are unresolved conflicts */
						this._assertNoUnresolvedConflicts();
	
						/* no unresolved conflicts: apply the delta model */
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.graph.vertices_topologically()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _slicedToArray(_step.value, 2);
	
								var subDelta = _step$value[1];
	
								subDelta.applyTo(target, options);
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					}
				},
				toString: {
					value: function toString() {
						var options = arguments[0] === undefined ? {} : arguments[0];
	
						var str = _get(Object.getPrototypeOf(DeltaModel.prototype), "toString", this).call(this, options);
						if (this.graph.vertexCount() > 0) {
							var deltas = "";
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
	
							try {
								for (var _iterator = this.graph.vertices_topologically()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var _step$value = _slicedToArray(_step.value, 2);
	
									var _name = _step$value[0];
									var delta = _step$value[1];
	
									deltas += "[" + _name + "] " + delta.toString(options) + "\n";
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator["return"]) {
										_iterator["return"]();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
	
							str += "\n" + indent(deltas, 4);
						}
						return str;
					}
				},
				conflicts: {
					value: function conflicts() {
						/* clone the graph */
						var g = this.graph.clone();
	
						/* source and sink keys */
						var sink = "(sink)";
						while (g.hasVertex(sink)) {
							sink = "" + sink + "'";
						}
	
						/* create sink vertex, connect it to all other vertices */
						g.addNewVertex(sink, null);
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = g.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _step$value = _slicedToArray(_step.value, 1);
	
								var _name = _step$value[0];
	
								g.setVertex(_name, null);
								if (_name !== sink) {
									g.ensureEdge(_name, sink);
								}
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
	
						/* transitive reduction */
						g = g.transitiveReduction();
	
						/* find all pairs of 'incomparable' deltas, plus the closest deltas that are 'greater' than both */
						var resolutions = new Map(); // first -> second -> Set<possible-resolving-delta>
						var getResolutionsIn = function (name) {
							if (g.vertexValue(name)) {
								return;
							}
							var ancestors = new Map(); // pred -> Set<ancestors-inc-pred>
							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;
	
							try {
								for (var _iterator2 = g.verticesTo(name)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var _step2$value = _slicedToArray(_step2.value, 1);
	
									var pred = _step2$value[0];
	
									getResolutionsIn(pred);
									var additionalAncestors = new Set([pred]);
									var _iteratorNormalCompletion3 = true;
									var _didIteratorError3 = false;
									var _iteratorError3 = undefined;
	
									try {
										for (var _iterator3 = g.vertexValue(pred).values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
											var ancSet = _step3.value;
											var _iteratorNormalCompletion4 = true;
											var _didIteratorError4 = false;
											var _iteratorError4 = undefined;
	
											try {
												for (var _iterator4 = ancSet.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
													var anc = _step4.value;
	
													additionalAncestors.add(anc);
												}
											} catch (err) {
												_didIteratorError4 = true;
												_iteratorError4 = err;
											} finally {
												try {
													if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
														_iterator4["return"]();
													}
												} finally {
													if (_didIteratorError4) {
														throw _iteratorError4;
													}
												}
											}
										}
									} catch (err) {
										_didIteratorError3 = true;
										_iteratorError3 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
												_iterator3["return"]();
											}
										} finally {
											if (_didIteratorError3) {
												throw _iteratorError3;
											}
										}
									}
	
									ancestors.set(pred, additionalAncestors);
								}
							} catch (err) {
								_didIteratorError2 = true;
								_iteratorError2 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
										_iterator2["return"]();
									}
								} finally {
									if (_didIteratorError2) {
										throw _iteratorError2;
									}
								}
							}
	
							g.setVertex(name, ancestors);
							var _iteratorNormalCompletion5 = true;
							var _didIteratorError5 = false;
							var _iteratorError5 = undefined;
	
							try {
								for (var _iterator5 = ancestors.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
									var pred1 = _step5.value;
									var _iteratorNormalCompletion6 = true;
									var _didIteratorError6 = false;
									var _iteratorError6 = undefined;
	
									try {
										for (var _iterator6 = ancestors.keys()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
											var pred2 = _step6.value;
	
											if (pred1 < pred2) {
												var ancs1 = new Set(ancestors.get(pred1));
												var ancs2 = new Set(ancestors.get(pred2));
												var _iteratorNormalCompletion7 = true;
												var _didIteratorError7 = false;
												var _iteratorError7 = undefined;
	
												try {
													for (var _iterator7 = ancs1[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
														var anc1 = _step7.value;
														var _iteratorNormalCompletion8 = true;
														var _didIteratorError8 = false;
														var _iteratorError8 = undefined;
	
														try {
															for (var _iterator8 = ancs2[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
																var anc2 = _step8.value;
	
																if (anc1 === anc2) {
																	ancs1["delete"](anc1);
																	ancs2["delete"](anc2);
																}
															}
														} catch (err) {
															_didIteratorError8 = true;
															_iteratorError8 = err;
														} finally {
															try {
																if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
																	_iterator8["return"]();
																}
															} finally {
																if (_didIteratorError8) {
																	throw _iteratorError8;
																}
															}
														}
													}
												} catch (err) {
													_didIteratorError7 = true;
													_iteratorError7 = err;
												} finally {
													try {
														if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
															_iterator7["return"]();
														}
													} finally {
														if (_didIteratorError7) {
															throw _iteratorError7;
														}
													}
												}
	
												var _iteratorNormalCompletion9 = true;
												var _didIteratorError9 = false;
												var _iteratorError9 = undefined;
	
												try {
													for (var _iterator9 = ancs1[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
														var anc1 = _step9.value;
														var _iteratorNormalCompletion10 = true;
														var _didIteratorError10 = false;
														var _iteratorError10 = undefined;
	
														try {
															for (var _iterator10 = ancs2[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
																var anc2 = _step10.value;
	
																s.apply(undefined, [resolutions].concat(_toConsumableArray([anc1, anc2].sort()))).add(name);
															}
														} catch (err) {
															_didIteratorError10 = true;
															_iteratorError10 = err;
														} finally {
															try {
																if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
																	_iterator10["return"]();
																}
															} finally {
																if (_didIteratorError10) {
																	throw _iteratorError10;
																}
															}
														}
													}
												} catch (err) {
													_didIteratorError9 = true;
													_iteratorError9 = err;
												} finally {
													try {
														if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
															_iterator9["return"]();
														}
													} finally {
														if (_didIteratorError9) {
															throw _iteratorError9;
														}
													}
												}
											}
										}
									} catch (err) {
										_didIteratorError6 = true;
										_iteratorError6 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
												_iterator6["return"]();
											}
										} finally {
											if (_didIteratorError6) {
												throw _iteratorError6;
											}
										}
									}
								}
							} catch (err) {
								_didIteratorError5 = true;
								_iteratorError5 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
										_iterator5["return"]();
									}
								} finally {
									if (_didIteratorError5) {
										throw _iteratorError5;
									}
								}
							}
						};
						getResolutionsIn(sink);
	
						/* out of the incomparable deltas, find those that are actually in conflict, and find any */
						var result = new Set();
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = resolutions.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var first = _step2.value;
								var _iteratorNormalCompletion3 = true;
								var _didIteratorError3 = false;
								var _iteratorError3 = undefined;
	
								try {
									for (var _iterator3 = resolutions.get(first).keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
										var second = _step3.value;
	
										var x = this.graph.vertexValue(first);
										var y = this.graph.vertexValue(second);
										if (!x.commutesWith(y)) {
											var conflictInfo = {
												conflictingDeltas: new Set([first, second]),
												conflictResolvingDeltas: new Set()
											};
											var _iteratorNormalCompletion4 = true;
											var _didIteratorError4 = false;
											var _iteratorError4 = undefined;
	
											try {
												for (var _iterator4 = resolutions.get(first).get(second)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
													var nearestResolver = _step4.value;
													var _iteratorNormalCompletion5 = true;
													var _didIteratorError5 = false;
													var _iteratorError5 = undefined;
	
													try {
														for (var _iterator5 = [[nearestResolver]].concat(_toConsumableArray(g.verticesWithPathFrom(nearestResolver)))[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
															var _step5$value = _slicedToArray(_step5.value, 1);
	
															var resolver = _step5$value[0];
	
															var z = this.graph.vertexValue(resolver);
															if (resolver !== sink && z.resolves(x, y)) {
																conflictInfo.conflictResolvingDeltas.add(resolver);
															}
														}
													} catch (err) {
														_didIteratorError5 = true;
														_iteratorError5 = err;
													} finally {
														try {
															if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
																_iterator5["return"]();
															}
														} finally {
															if (_didIteratorError5) {
																throw _iteratorError5;
															}
														}
													}
												}
											} catch (err) {
												_didIteratorError4 = true;
												_iteratorError4 = err;
											} finally {
												try {
													if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
														_iterator4["return"]();
													}
												} finally {
													if (_didIteratorError4) {
														throw _iteratorError4;
													}
												}
											}
	
											result.add(conflictInfo);
										}
									}
								} catch (err) {
									_didIteratorError3 = true;
									_iteratorError3 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
											_iterator3["return"]();
										}
									} finally {
										if (_didIteratorError3) {
											throw _iteratorError3;
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
									_iterator2["return"]();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
	
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
				this._childOptions = new Map(); // key -> options
				this._childApplicationConditions = new Map(); // key -> application-condition
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
						if (!this._childApplicationConditions.has(name)) {
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
							this._childApplicationConditions.set(name, appCond);
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
						if (!this._childOptions.has(name)) {
							this._childOptions.set(name, options);
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
						var result = _get(Object.getPrototypeOf(DeltaModelProxy.prototype), "delta", this).call(this);
						result.graph.clear();
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this.childKeys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var _name = _step.value;
	
								var options = this._childOptions.get(_name);
	
								/* delta in the graph */
								var delta = this.childDelta(_name);
								result.graph.addVertex(_name, delta);
	
								/* application order */
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;
	
								try {
									for (var _iterator2 = [].concat(_toConsumableArray(options.resolves || []), _toConsumableArray(options.after || []), _toConsumableArray(options.requires || []))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
										var subName = _step2.value;
	
										result.graph.createEdge(subName, _name);
										if (result.graph.hasCycle()) {
											result.graph.removeExistingEdge(subName, _name);
											throw new ApplicationOrderCycle(subName, _name);
										}
									}
								} catch (err) {
									_didIteratorError2 = true;
									_iteratorError2 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
											_iterator2["return"]();
										}
									} finally {
										if (_didIteratorError2) {
											throw _iteratorError2;
										}
									}
								}
	
								/* application condition */
								if (options.feature || this._childApplicationConditions.get(_name).conditional) {
									delta.applicationCondition = this._childApplicationConditions.get(_name);
								}
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
	
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
	
		/* equality */
		deltaJs.newEquality(t("DeltaModel", "DeltaModel"), function (d1, d2) {
			var g1 = d1.graph.transitiveReduction();
			var g2 = d2.graph.transitiveReduction();
			return g1.equals(g2, function (x, y) {
				return x.equals(y);
			});
		});
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var a = _utilEs6Js.a;
	var assert = _utilEs6Js.assert;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
	
	var ConstraintFailure = __webpack_require__(8).ConstraintFailure;
	
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
		var _if = new Map(); // feature -> (arrays of arrays; disjunctive normal form)
		var _selected = new Map(); // feature -> Boolean
		function _addIf(feature) {
			var disjunct = arguments[1] === undefined ? [] : arguments[1];
	
			_conditionsUnsettled = true;
			if (disjunct === true) {
				_selected.set(feature, true);
			} else if (disjunct === false) {} else if (_if.get(feature) !== true) {
				a(_if, feature).push(_normalizeClause(disjunct));
			}
		}
		function _addSelects(feature, otherFeatures) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = _normalizeClause(otherFeatures)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var other = _step.value;
	
					_addIf(other, feature);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		/* code for constraints between features (enforced by errors) */
		var _onlyIf = new Map(); // feature -> (arrays of arrays; conjunctive normal form)
		var _allowed = new Map(); // feature -> Boolean
		function _addOnlyIf(feature) {
			var conjunct = arguments[1] === undefined ? [] : arguments[1];
	
			_conditionsUnsettled = true;
			if (conjunct === false) {
				_allowed.set(feature, false);
			} else if (conjunct === true) {} else if (_onlyIf.get(feature) !== false) {
				a(_onlyIf, feature).push(_normalizeClause(conjunct));
			}
		}
		function _addRequiredBy(feature, otherFeatures) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = _normalizeClause(otherFeatures)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var other = _step.value;
	
					_addOnlyIf(other, feature);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
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
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = Object.keys(deltaJs.features)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var featureName = _step.value;
	
						if (!_selected.get(featureName)) {
							/* if there are 'if' disjuncts that are selected, this feature is selected */
							if (_selected.has(featureName)) {
								_selected.set(featureName, false);
							}
							if ((_if.get(featureName) || []).some(function (disj) {
								return disj.every(function (conj) {
									return _selected.get(conj);
								});
							})) {
								_selected.set(featureName, true);
								somethingChanged = true;
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			} while (somethingChanged);
	
			/* computation of allowed features */
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = Object.keys(deltaJs.features)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var featureName = _step2.value;
	
					/* if there are 'onlyIf' conjuncts that are excluded, this feature is excluded */
					_allowed.set(featureName, (_onlyIf.get(featureName) || []).every(function (conj) {
						return conj.some(function (disj) {
							return _selected.get(disj);
						});
					}));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
						_iterator2["return"]();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	
		/** {@public}{@class DeltaJs#Feature}
	  *
	  */
		deltaJs.Feature = (function () {
			function Feature(name) {
				var options = arguments[1] === undefined ? {} : arguments[1];
	
				_classCallCheck(this, Feature);
	
				/* set basic fields */
				this.name = name;
				this.options = options;
	
				/* update conditions */
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var option = _step.value;
	
						this.addOption(option, options[option]);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
	
			_createClass(Feature, {
				selected: {
					get: function () {
						_settleConditions();
						if (_selected.get(this.name) && !_allowed.get(this.name)) {
							throw new ConstraintFailure(this);
						}
						return _selected.get(this.name);
					}
				},
				condition: {
					get: function () {
						return _if.get(this.name);
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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = FEATURE_CONNECTIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2);
	
					var connectionName = _step$value[0];
					var methods = _step$value[1];
	
					if (optionName === connectionName) {
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = methods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var method = _step2.value;
								method(this.name, value);
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
									_iterator2["return"]();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator["return"]) {
						_iterator["return"]();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = FEATURE_CONNECTIONS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value;
	
				(function () {
					_step$value = _slicedToArray(_step.value, 1);
					var name = _step$value[0];
	
					deltaJs.Feature.prototype[name] = function (value) {
						this.addOption(name, value);
					};
				})();
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator["return"]) {
					_iterator["return"]();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		/* the features belonging to this DeltaJs instance */
		deltaJs.features = {}; // name -> Feature
	});
	
	// change nothing

	// change nothing

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	
	var define_DeltaModel = _interopRequire(__webpack_require__(15));
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
	module.exports = oncePer("application conditions", function (deltaJs) {
	
		oncePer(deltaJs.constructor, "application conditions", function () {
	
			extend(deltaJs.constructor.prototype, {
				select: function select() {
					for (var _len = arguments.length, features = Array(_len), _key = 0; _key < _len; _key++) {
						features[_key] = arguments[_key];
					}
	
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var feature = _step.value;
	
							if (Array.isArray(feature)) {
								this.select.apply(this, _toConsumableArray(feature));
							} else {
								this.features[feature].select();
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(22));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var a = _utilEs6Js.a;
	var isUndefined = _utilEs6Js.isUndefined;
	var oncePer = _utilEs6Js.oncePer;
	
	var Path = _interopRequire(__webpack_require__(7));
	
	var define_Overloaded = _interopRequire(__webpack_require__(10));
	
	var define_Proxy = _interopRequire(__webpack_require__(24));
	
	var MultipleActiveProxiesError = __webpack_require__(8).MultipleActiveProxiesError;
	
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
				this._children = new Map(); // key -> [proxies]
			}
	
			_inherits(ContainerProxy, _deltaJs$Proxy);
	
			_createClass(ContainerProxy, {
				deactivate: {
					value: function deactivate() {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this._children.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var key = _step.value;
	
								this.childProxy(key).deactivate();
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
	
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
						this._children.get(key).push(proxy);
						return proxy;
					}
				},
				childKeys: {
					value: function childKeys() {
						return [].concat(_toConsumableArray(this._children.keys()));
					}
				},
				childProxies: { // TODO: Is an iterable a good return value?
	
					value: function childProxies(key) {
						return a(this._children, key);
					}
				},
				childProxy: {
					value: function childProxy(key) {
						if (!this._children.has(key)) {
							this._children.set(key, []);
						}
						return this._children.get(key)[this._children.get(key).length - 1];
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Core.js 0.6.1
	 * https://github.com/zloirock/core-js
	 * License: http://rock.mit-license.org
	 * © 2015 Denis Pushkarev
	 */
	!function(global, framework, undefined){
	'use strict';
	
	/******************************************************************************
	 * Module : common                                                            *
	 ******************************************************************************/
	
	  // Shortcuts for [[Class]] & property names
	var OBJECT          = 'Object'
	  , FUNCTION        = 'Function'
	  , ARRAY           = 'Array'
	  , STRING          = 'String'
	  , NUMBER          = 'Number'
	  , REGEXP          = 'RegExp'
	  , DATE            = 'Date'
	  , MAP             = 'Map'
	  , SET             = 'Set'
	  , WEAKMAP         = 'WeakMap'
	  , WEAKSET         = 'WeakSet'
	  , SYMBOL          = 'Symbol'
	  , PROMISE         = 'Promise'
	  , MATH            = 'Math'
	  , ARGUMENTS       = 'Arguments'
	  , PROTOTYPE       = 'prototype'
	  , CONSTRUCTOR     = 'constructor'
	  , TO_STRING       = 'toString'
	  , TO_STRING_TAG   = TO_STRING + 'Tag'
	  , TO_LOCALE       = 'toLocaleString'
	  , HAS_OWN         = 'hasOwnProperty'
	  , FOR_EACH        = 'forEach'
	  , ITERATOR        = 'iterator'
	  , FF_ITERATOR     = '@@' + ITERATOR
	  , PROCESS         = 'process'
	  , CREATE_ELEMENT  = 'createElement'
	  // Aliases global objects and prototypes
	  , Function        = global[FUNCTION]
	  , Object          = global[OBJECT]
	  , Array           = global[ARRAY]
	  , String          = global[STRING]
	  , Number          = global[NUMBER]
	  , RegExp          = global[REGEXP]
	  , Date            = global[DATE]
	  , Map             = global[MAP]
	  , Set             = global[SET]
	  , WeakMap         = global[WEAKMAP]
	  , WeakSet         = global[WEAKSET]
	  , Symbol          = global[SYMBOL]
	  , Math            = global[MATH]
	  , TypeError       = global.TypeError
	  , RangeError      = global.RangeError
	  , setTimeout      = global.setTimeout
	  , setImmediate    = global.setImmediate
	  , clearImmediate  = global.clearImmediate
	  , parseInt        = global.parseInt
	  , isFinite        = global.isFinite
	  , process         = global[PROCESS]
	  , nextTick        = process && process.nextTick
	  , document        = global.document
	  , html            = document && document.documentElement
	  , navigator       = global.navigator
	  , define          = global.define
	  , console         = global.console || {}
	  , ArrayProto      = Array[PROTOTYPE]
	  , ObjectProto     = Object[PROTOTYPE]
	  , FunctionProto   = Function[PROTOTYPE]
	  , Infinity        = 1 / 0
	  , DOT             = '.';
	
	// http://jsperf.com/core-js-isobject
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	// Native function?
	var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);
	
	// Object internal [[Class]] or toStringTag
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
	var toString = ObjectProto[TO_STRING];
	function setToStringTag(it, tag, stat){
	  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
	}
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	function classof(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[SYMBOL_TAG]) == 'string' ? T : cof(O);
	}
	
	// Function
	var call  = FunctionProto.call
	  , apply = FunctionProto.apply
	  , REFERENCE_GET;
	// Partial apply
	function part(/* ...args */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , args   = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , i = 0, j = 0, _args;
	    if(!holder && !_length)return invoke(fn, args, that);
	    _args = args.slice();
	    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
	    while(_length > j)_args.push(arguments[j++]);
	    return invoke(fn, _args, that);
	  }
	}
	// Optional / simple context binding
	function ctx(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    }
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    }
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    }
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	  }
	}
	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	function invoke(fn, args, that){
	  var un = that === undefined;
	  switch(args.length | 0){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	}
	
	// Object:
	var create           = Object.create
	  , getPrototypeOf   = Object.getPrototypeOf
	  , setPrototypeOf   = Object.setPrototypeOf
	  , defineProperty   = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , getOwnDescriptor = Object.getOwnPropertyDescriptor
	  , getKeys          = Object.keys
	  , getNames         = Object.getOwnPropertyNames
	  , getSymbols       = Object.getOwnPropertySymbols
	  , isFrozen         = Object.isFrozen
	  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
	  // Dummy, fix for not array-like ES3 string in es5 module
	  , ES5Object        = Object
	  , Dict;
	function toObject(it){
	  return ES5Object(assertDefined(it));
	}
	function returnIt(it){
	  return it;
	}
	function returnThis(){
	  return this;
	}
	function get(object, key){
	  if(has(object, key))return object[key];
	}
	function ownKeys(it){
	  assertObject(it);
	  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
	}
	// 19.1.2.1 Object.assign(target, source, ...)
	var assign = Object.assign || function(target, source){
	  var T = Object(assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	}
	function keyOf(object, el){
	  var O      = toObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	}
	
	// Array
	// array('str1,str2,str3') => ['str1', 'str2', 'str3']
	function array(it){
	  return String(it).split(',');
	}
	var push    = ArrayProto.push
	  , unshift = ArrayProto.unshift
	  , slice   = ArrayProto.slice
	  , splice  = ArrayProto.splice
	  , indexOf = ArrayProto.indexOf
	  , forEach = ArrayProto[FOR_EACH];
	/*
	 * 0 -> forEach
	 * 1 -> map
	 * 2 -> filter
	 * 3 -> some
	 * 4 -> every
	 * 5 -> find
	 * 6 -> findIndex
	 */
	function createArrayMethod(type){
	  var isMap       = type == 1
	    , isFilter    = type == 2
	    , isSome      = type == 3
	    , isEvery     = type == 4
	    , isFindIndex = type == 6
	    , noholes     = type == 5 || isFindIndex;
	  return function(callbackfn/*, that = undefined */){
	    var O      = Object(assertDefined(this))
	      , that   = arguments[1]
	      , self   = ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = isMap ? Array(length) : isFilter ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(noholes || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(type){
	        if(isMap)result[index] = res;             // map
	        else if(res)switch(type){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(isEvery)return false;           // every
	      }
	    }
	    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
	  }
	}
	function createArrayContains(isContains){
	  return function(el /*, fromIndex = 0 */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = toIndex(arguments[1], length);
	    if(isContains && el != el){
	      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
	    } else for(;length > index; index++)if(isContains || index in O){
	      if(O[index] === el)return isContains || index;
	    } return !isContains && -1;
	  }
	}
	function generic(A, B){
	  // strange IE quirks mode bug -> use typeof vs isFunction
	  return typeof A == 'function' ? A : B;
	}
	
	// Math
	var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
	  , pow    = Math.pow
	  , abs    = Math.abs
	  , ceil   = Math.ceil
	  , floor  = Math.floor
	  , max    = Math.max
	  , min    = Math.min
	  , random = Math.random
	  , trunc  = Math.trunc || function(it){
	      return (it > 0 ? floor : ceil)(it);
	    }
	// 20.1.2.4 Number.isNaN(number)
	function sameNaN(number){
	  return number != number;
	}
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it) ? 0 : trunc(it);
	}
	// 7.1.15 ToLength
	function toLength(it){
	  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
	}
	function toIndex(index, length){
	  var index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	}
	function lz(num){
	  return num > 9 ? num : '0' + num;
	}
	
	function createReplacer(regExp, replace, isStatic){
	  var replacer = isObject(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  }
	}
	function createPointAt(toString){
	  return function(pos){
	    var s = String(assertDefined(this))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return toString ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? toString ? s.charAt(i) : a
	      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  }
	}
	
	// Assertion & errors
	var REDUCE_ERROR = 'Reduce of empty object with no initial value';
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError('Function called on null or undefined');
	  return it;
	}
	function assertFunction(it){
	  assert(isFunction(it), it, ' is not a function!');
	  return it;
	}
	function assertObject(it){
	  assert(isObject(it), it, ' is not an object!');
	  return it;
	}
	function assertInstance(it, Constructor, name){
	  assert(it instanceof Constructor, name, ": use the 'new' operator!");
	}
	
	// Property descriptors & Symbol
	function descriptor(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  }
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return defineProperty(object, key, descriptor(bitmap, value));
	  } : simpleSet;
	}
	function uid(key){
	  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
	}
	function getWellKnownSymbol(name, setter){
	  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
	}
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	      try {
	        return defineProperty({}, 'a', {get: function(){ return 2 }}).a == 2;
	      } catch(e){}
	    }()
	  , sid    = 0
	  , hidden = createDefiner(1)
	  , set    = Symbol ? simpleSet : hidden
	  , safeSymbol = Symbol || uid;
	function assignHidden(target, src){
	  for(var key in src)hidden(target, key, src[key]);
	  return target;
	}
	
	var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
	  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
	  , SYMBOL_TAG         = getWellKnownSymbol(TO_STRING_TAG)
	  , SYMBOL_SPECIES     = getWellKnownSymbol('species')
	  , SYMBOL_ITERATOR;
	function setSpecies(C){
	  if(DESC && (framework || !isNative(C)))defineProperty(C, SYMBOL_SPECIES, {
	    configurable: true,
	    get: returnThis
	  });
	}
	
	/******************************************************************************
	 * Module : common.export                                                     *
	 ******************************************************************************/
	
	var NODE = cof(process) == PROCESS
	  , core = {}
	  , path = framework ? global : core
	  , old  = global.core
	  , exportGlobal
	  // type bitmap
	  , FORCED = 1
	  , GLOBAL = 2
	  , STATIC = 4
	  , PROTO  = 8
	  , BIND   = 16
	  , WRAP   = 32;
	function $define(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & GLOBAL
	    , target   = isGlobal ? global : (type & STATIC)
	        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // there is a similar native
	    own = !(type & FORCED) && target && key in target
	      && (!isFunction(target[key]) || isNative(target[key]));
	    // export native or passed
	    out = (own ? target : source)[key];
	    // prevent global pollution for namespaces
	    if(!framework && isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & BIND && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & WRAP && !framework && target[key] == out){
	      exp = function(param){
	        return this instanceof out ? new out(param) : out(param);
	      }
	      exp[PROTOTYPE] = out[PROTOTYPE];
	    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
	    // extend global
	    if(framework && target && !own){
	      if(isGlobal)target[key] = out;
	      else delete target[key] && hidden(target, key, out);
	    }
	    // export
	    if(exports[key] != out)hidden(exports, key, exp);
	  }
	}
	// CommonJS export
	if(typeof module != 'undefined' && module.exports)module.exports = core;
	// RequireJS export
	else if(isFunction(define) && define.amd)define(function(){return core});
	// Export to global object
	else exportGlobal = true;
	if(exportGlobal || framework){
	  core.noConflict = function(){
	    global.core = old;
	    return core;
	  }
	  global.core = core;
	}
	
	/******************************************************************************
	 * Module : common.iterators                                                  *
	 ******************************************************************************/
	
	SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR);
	var ITER  = safeSymbol('iter')
	  , KEY   = 1
	  , VALUE = 2
	  , Iterators = {}
	  , IteratorPrototype = {}
	    // Safari has byggy iterators w/o `next`
	  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, returnThis);
	function setIterator(O, value){
	  hidden(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  FF_ITERATOR in ArrayProto && hidden(O, FF_ITERATOR, value);
	}
	function createIterator(Constructor, NAME, next, proto){
	  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	}
	function defineIterator(Constructor, NAME, value, DEFAULT){
	  var proto = Constructor[PROTOTYPE]
	    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
	  if(framework){
	    // Define iterator
	    setIterator(proto, iter);
	    if(iter !== value){
	      var iterProto = getPrototypeOf(iter.call(new Constructor));
	      // Set @@toStringTag to native iterators
	      setToStringTag(iterProto, NAME + ' Iterator', true);
	      // FF fix
	      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
	    }
	  }
	  // Plug for library
	  Iterators[NAME] = iter;
	  // FF & v8 fix
	  Iterators[NAME + ' Iterator'] = returnThis;
	  return iter;
	}
	function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
	  function createIter(kind){
	    return function(){
	      return new Constructor(this, kind);
	    }
	  }
	  createIterator(Constructor, NAME, next);
	  var entries = createIter(KEY+VALUE)
	    , values  = createIter(VALUE);
	  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
	  else entries = defineIterator(Base, NAME, entries, 'entries');
	  if(DEFAULT){
	    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
	      entries: entries,
	      keys: IS_SET ? values : createIter(KEY),
	      values: values
	    });
	  }
	}
	function iterResult(done, value){
	  return {value: value, done: !!done};
	}
	function isIterable(it){
	  var O      = Object(it)
	    , Symbol = global[SYMBOL]
	    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
	  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
	}
	function getIterator(it){
	  var Symbol  = global[SYMBOL]
	    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
	    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
	  return assertObject(getIter.call(it));
	}
	function stepCall(fn, value, entries){
	  return entries ? invoke(fn, value) : fn(value);
	}
	function checkDangerIterClosing(fn){
	  var danger = true;
	  var O = {
	    next: function(){ throw 1 },
	    'return': function(){ danger = false }
	  };
	  O[SYMBOL_ITERATOR] = returnThis;
	  try {
	    fn(O);
	  } catch(e){}
	  return danger;
	}
	function closeIterator(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)ret.call(iterator);
	}
	function safeIterClose(exec, iterator){
	  try {
	    exec(iterator);
	  } catch(e){
	    closeIterator(iterator);
	    throw e;
	  }
	}
	function forOf(iterable, entries, fn, that){
	  safeIterClose(function(iterator){
	    var f = ctx(fn, that, entries ? 2 : 1)
	      , step;
	    while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false){
	      return closeIterator(iterator);
	    }
	  }, getIterator(iterable));
	}
	
	/******************************************************************************
	 * Module : es6.symbol                                                        *
	 ******************************************************************************/
	
	// ECMAScript 6 symbols shim
	!function(TAG, SymbolRegistry, AllSymbols, setter){
	  // 19.4.1.1 Symbol([description])
	  if(!isNative(Symbol)){
	    Symbol = function(description){
	      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
	      var tag = uid(description)
	        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
	      AllSymbols[tag] = sym;
	      DESC && setter && defineProperty(ObjectProto, tag, {
	        configurable: true,
	        set: function(value){
	          hidden(this, tag, value);
	        }
	      });
	      return sym;
	    }
	    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
	      return this[TAG];
	    });
	  }
	  $define(GLOBAL + WRAP, {Symbol: Symbol});
	  
	  var symbolStatics = {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function(key){
	      return has(SymbolRegistry, key += '')
	        ? SymbolRegistry[key]
	        : SymbolRegistry[key] = Symbol(key);
	    },
	    // 19.4.2.4 Symbol.iterator
	    iterator: SYMBOL_ITERATOR || getWellKnownSymbol(ITERATOR),
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: part.call(keyOf, SymbolRegistry),
	    // 19.4.2.10 Symbol.species
	    species: SYMBOL_SPECIES,
	    // 19.4.2.13 Symbol.toStringTag
	    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
	    // 19.4.2.14 Symbol.unscopables
	    unscopables: SYMBOL_UNSCOPABLES,
	    pure: safeSymbol,
	    set: set,
	    useSetter: function(){setter = true},
	    useSimple: function(){setter = false}
	  };
	  // 19.4.2.2 Symbol.hasInstance
	  // 19.4.2.3 Symbol.isConcatSpreadable
	  // 19.4.2.6 Symbol.match
	  // 19.4.2.8 Symbol.replace
	  // 19.4.2.9 Symbol.search
	  // 19.4.2.11 Symbol.split
	  // 19.4.2.12 Symbol.toPrimitive
	  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
	    function(it){
	      symbolStatics[it] = getWellKnownSymbol(it);
	    }
	  );
	  $define(STATIC, SYMBOL, symbolStatics);
	  
	  setToStringTag(Symbol, SYMBOL);
	  
	  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
	      return result;
	    },
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
	      return result;
	    }
	  });
	  
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, MATH, true);
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	}(safeSymbol('tag'), {}, {}, true);
	
	/******************************************************************************
	 * Module : es6.object.statics                                                *
	 ******************************************************************************/
	
	!function(){
	  var objectStatic = {
	    // 19.1.3.1 Object.assign(target, source)
	    assign: assign,
	    // 19.1.3.10 Object.is(value1, value2)
	    is: function(x, y){
	      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	    }
	  };
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  // Works with __proto__ only. Old v8 can't works with null proto objects.
	  '__proto__' in ObjectProto && function(buggy, set){
	    try {
	      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
	      set({}, ArrayProto);
	    } catch(e){ buggy = true }
	    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
	      assertObject(O);
	      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
	      if(buggy)O.__proto__ = proto;
	      else set(O, proto);
	      return O;
	    }
	  }();
	  $define(STATIC, OBJECT, objectStatic);
	}();
	
	/******************************************************************************
	 * Module : es6.object.prototype                                              *
	 ******************************************************************************/
	
	!function(tmp){
	  // 19.1.3.6 Object.prototype.toString()
	  tmp[SYMBOL_TAG] = DOT;
	  if(cof(tmp) != DOT)hidden(ObjectProto, TO_STRING, function(){
	    return '[object ' + classof(this) + ']';
	  });
	}({});
	
	/******************************************************************************
	 * Module : es6.object.statics-accept-primitives                              *
	 ******************************************************************************/
	
	!function(){
	  // Object static methods accept primitives
	  function wrapObjectMethod(key, MODE){
	    var fn  = Object[key]
	      , exp = core[OBJECT][key]
	      , f   = 0
	      , o   = {};
	    if(!exp || isNative(exp)){
	      o[key] = MODE == 1 ? function(it){
	        return isObject(it) ? fn(it) : it;
	      } : MODE == 2 ? function(it){
	        return isObject(it) ? fn(it) : true;
	      } : MODE == 3 ? function(it){
	        return isObject(it) ? fn(it) : false;
	      } : MODE == 4 ? function(it, key){
	        return fn(toObject(it), key);
	      } : function(it){
	        return fn(toObject(it));
	      };
	      try { fn(DOT) }
	      catch(e){ f = 1 }
	      $define(STATIC + FORCED * f, OBJECT, o);
	    }
	  }
	  wrapObjectMethod('freeze', 1);
	  wrapObjectMethod('seal', 1);
	  wrapObjectMethod('preventExtensions', 1);
	  wrapObjectMethod('isFrozen', 2);
	  wrapObjectMethod('isSealed', 2);
	  wrapObjectMethod('isExtensible', 3);
	  wrapObjectMethod('getOwnPropertyDescriptor', 4);
	  wrapObjectMethod('getPrototypeOf');
	  wrapObjectMethod('keys');
	  wrapObjectMethod('getOwnPropertyNames');
	}();
	
	/******************************************************************************
	 * Module : es6.function                                                      *
	 ******************************************************************************/
	
	!function(NAME){
	  // 19.2.4.2 name
	  NAME in FunctionProto || (DESC && defineProperty(FunctionProto, NAME, {
	    configurable: true,
	    get: function(){
	      var match = String(this).match(/^\s*function ([^ (]*)/)
	        , name  = match ? match[1] : '';
	      has(this, NAME) || defineProperty(this, NAME, descriptor(5, name));
	      return name;
	    },
	    set: function(value){
	      has(this, NAME) || defineProperty(this, NAME, descriptor(0, value));
	    }
	  }));
	}('name');
	
	/******************************************************************************
	 * Module : es6.number.constructor                                            *
	 ******************************************************************************/
	
	Number('0o1') && Number('0b1') || function(_Number, NumberProto){
	  function toNumber(it){
	    if(isObject(it))it = toPrimitive(it);
	    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	      var binary = false;
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : binary = true;
	        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	      }
	    } return +it;
	  }
	  function toPrimitive(it){
	    var fn, val;
	    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	    if(isFunction(fn = it[TO_STRING]) && !isObject(val = fn.call(it)))return val;
	    throw TypeError("Can't convert object to number");
	  }
	  Number = function Number(it){
	    return this instanceof Number ? new _Number(toNumber(it)) : toNumber(it);
	  }
	  forEach.call(DESC ? getNames(_Number)
	  : array('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY'), function(key){
	    key in Number || defineProperty(Number, key, getOwnDescriptor(_Number, key));
	  });
	  Number[PROTOTYPE] = NumberProto;
	  NumberProto[CONSTRUCTOR] = Number;
	  hidden(global, NUMBER, Number);
	}(Number, Number[PROTOTYPE]);
	
	/******************************************************************************
	 * Module : es6.number.statics                                                *
	 ******************************************************************************/
	
	!function(isInteger){
	  $define(STATIC, NUMBER, {
	    // 20.1.2.1 Number.EPSILON
	    EPSILON: pow(2, -52),
	    // 20.1.2.2 Number.isFinite(number)
	    isFinite: function(it){
	      return typeof it == 'number' && isFinite(it);
	    },
	    // 20.1.2.3 Number.isInteger(number)
	    isInteger: isInteger,
	    // 20.1.2.4 Number.isNaN(number)
	    isNaN: sameNaN,
	    // 20.1.2.5 Number.isSafeInteger(number)
	    isSafeInteger: function(number){
	      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	    },
	    // 20.1.2.6 Number.MAX_SAFE_INTEGER
	    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	    // 20.1.2.10 Number.MIN_SAFE_INTEGER
	    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	    // 20.1.2.12 Number.parseFloat(string)
	    parseFloat: parseFloat,
	    // 20.1.2.13 Number.parseInt(string, radix)
	    parseInt: parseInt
	  });
	// 20.1.2.3 Number.isInteger(number)
	}(Number.isInteger || function(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	});
	
	/******************************************************************************
	 * Module : es6.math                                                          *
	 ******************************************************************************/
	
	// ECMAScript 6 shim
	!function(){
	  // 20.2.2.28 Math.sign(x)
	  var E    = Math.E
	    , exp  = Math.exp
	    , log  = Math.log
	    , sqrt = Math.sqrt
	    , sign = Math.sign || function(x){
	        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	      };
	  
	  // 20.2.2.5 Math.asinh(x)
	  function asinh(x){
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	  }
	  // 20.2.2.14 Math.expm1(x)
	  function expm1(x){
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	  }
	    
	  $define(STATIC, MATH, {
	    // 20.2.2.3 Math.acosh(x)
	    acosh: function(x){
	      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	    },
	    // 20.2.2.5 Math.asinh(x)
	    asinh: asinh,
	    // 20.2.2.7 Math.atanh(x)
	    atanh: function(x){
	      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	    },
	    // 20.2.2.9 Math.cbrt(x)
	    cbrt: function(x){
	      return sign(x = +x) * pow(abs(x), 1 / 3);
	    },
	    // 20.2.2.11 Math.clz32(x)
	    clz32: function(x){
	      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
	    },
	    // 20.2.2.12 Math.cosh(x)
	    cosh: function(x){
	      return (exp(x = +x) + exp(-x)) / 2;
	    },
	    // 20.2.2.14 Math.expm1(x)
	    expm1: expm1,
	    // 20.2.2.16 Math.fround(x)
	    // TODO: fallback for IE9-
	    fround: function(x){
	      return new Float32Array([x])[0];
	    },
	    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	    hypot: function(value1, value2){
	      var sum  = 0
	        , len1 = arguments.length
	        , len2 = len1
	        , args = Array(len1)
	        , larg = -Infinity
	        , arg;
	      while(len1--){
	        arg = args[len1] = +arguments[len1];
	        if(arg == Infinity || arg == -Infinity)return Infinity;
	        if(arg > larg)larg = arg;
	      }
	      larg = arg || 1;
	      while(len2--)sum += pow(args[len2] / larg, 2);
	      return larg * sqrt(sum);
	    },
	    // 20.2.2.18 Math.imul(x, y)
	    imul: function(x, y){
	      var UInt16 = 0xffff
	        , xn = +x
	        , yn = +y
	        , xl = UInt16 & xn
	        , yl = UInt16 & yn;
	      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	    },
	    // 20.2.2.20 Math.log1p(x)
	    log1p: function(x){
	      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	    },
	    // 20.2.2.21 Math.log10(x)
	    log10: function(x){
	      return log(x) / Math.LN10;
	    },
	    // 20.2.2.22 Math.log2(x)
	    log2: function(x){
	      return log(x) / Math.LN2;
	    },
	    // 20.2.2.28 Math.sign(x)
	    sign: sign,
	    // 20.2.2.30 Math.sinh(x)
	    sinh: function(x){
	      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	    },
	    // 20.2.2.33 Math.tanh(x)
	    tanh: function(x){
	      var a = expm1(x = +x)
	        , b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    },
	    // 20.2.2.34 Math.trunc(x)
	    trunc: trunc
	  });
	}();
	
	/******************************************************************************
	 * Module : es6.string                                                        *
	 ******************************************************************************/
	
	!function(fromCharCode){
	  function assertNotRegExp(it){
	    if(cof(it) == REGEXP)throw TypeError();
	  }
	  
	  $define(STATIC, STRING, {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function(x){
	      var res = []
	        , len = arguments.length
	        , i   = 0
	        , code
	      while(len > i){
	        code = +arguments[i++];
	        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000
	          ? fromCharCode(code)
	          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	        );
	      } return res.join('');
	    },
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function(callSite){
	      var raw = toObject(callSite.raw)
	        , len = toLength(raw.length)
	        , sln = arguments.length
	        , res = []
	        , i   = 0;
	      while(len > i){
	        res.push(String(raw[i++]));
	        if(i < sln)res.push(String(arguments[i]));
	      } return res.join('');
	    }
	  });
	  
	  $define(PROTO, STRING, {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: createPointAt(false),
	    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	    endsWith: function(searchString /*, endPosition = @length */){
	      assertNotRegExp(searchString);
	      var that = String(assertDefined(this))
	        , endPosition = arguments[1]
	        , len = toLength(that.length)
	        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
	      searchString += '';
	      return that.slice(end - searchString.length, end) === searchString;
	    },
	    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	    includes: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
	    },
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: function(count){
	      var str = String(assertDefined(this))
	        , res = ''
	        , n   = toInteger(count);
	      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
	      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	      return res;
	    },
	    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	    startsWith: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      var that  = String(assertDefined(this))
	        , index = toLength(min(arguments[1], that.length));
	      searchString += '';
	      return that.slice(index, index + searchString.length) === searchString;
	    }
	  });
	}(String.fromCharCode);
	
	/******************************************************************************
	 * Module : es6.array.statics                                                 *
	 ******************************************************************************/
	
	!function(){
	  $define(STATIC + FORCED * checkDangerIterClosing(Array.from), ARRAY, {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	      var O       = Object(assertDefined(arrayLike))
	        , mapfn   = arguments[1]
	        , mapping = mapfn !== undefined
	        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	        , index   = 0
	        , length, result, step;
	      if(isIterable(O)){
	        result = new (generic(this, Array));
	        safeIterClose(function(iterator){
	          for(; !(step = iterator.next()).done; index++){
	            result[index] = mapping ? f(step.value, index) : step.value;
	          }
	        }, getIterator(O));
	      } else {
	        result = new (generic(this, Array))(length = toLength(O.length));
	        for(; length > index; index++){
	          result[index] = mapping ? f(O[index], index) : O[index];
	        }
	      }
	      result.length = index;
	      return result;
	    }
	  });
	  
	  $define(STATIC, ARRAY, {
	    // 22.1.2.3 Array.of( ...items)
	    of: function(/* ...args */){
	      var index  = 0
	        , length = arguments.length
	        , result = new (generic(this, Array))(length);
	      while(length > index)result[index] = arguments[index++];
	      result.length = length;
	      return result;
	    }
	  });
	  
	  setSpecies(Array);
	}();
	
	/******************************************************************************
	 * Module : es6.array.prototype                                               *
	 ******************************************************************************/
	
	!function(){
	  $define(PROTO, ARRAY, {
	    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
	      var O     = Object(assertDefined(this))
	        , len   = toLength(O.length)
	        , to    = toIndex(target, len)
	        , from  = toIndex(start, len)
	        , end   = arguments[2]
	        , fin   = end === undefined ? len : toIndex(end, len)
	        , count = min(fin - from, len - to)
	        , inc   = 1;
	      if(from < to && to < from + count){
	        inc  = -1;
	        from = from + count - 1;
	        to   = to + count - 1;
	      }
	      while(count-- > 0){
	        if(from in O)O[to] = O[from];
	        else delete O[to];
	        to += inc;
	        from += inc;
	      } return O;
	    },
	    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	    fill: function(value /*, start = 0, end = @length */){
	      var O      = Object(assertDefined(this))
	        , length = toLength(O.length)
	        , index  = toIndex(arguments[1], length)
	        , end    = arguments[2]
	        , endPos = end === undefined ? length : toIndex(end, length);
	      while(endPos > index)O[index++] = value;
	      return O;
	    },
	    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	    find: createArrayMethod(5),
	    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	    findIndex: createArrayMethod(6)
	  });
	  
	  if(framework){
	    // 22.1.3.31 Array.prototype[@@unscopables]
	    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
	      ArrayUnscopables[it] = true;
	    });
	    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
	  }
	}();
	
	/******************************************************************************
	 * Module : es6.iterators                                                     *
	 ******************************************************************************/
	
	!function(at){
	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  defineStdIterators(Array, ARRAY, function(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , kind  = iter.k
	      , index = iter.i++;
	    if(!O || index >= O.length){
	      iter.o = undefined;
	      return iterResult(1);
	    }
	    if(kind == KEY)  return iterResult(0, index);
	    if(kind == VALUE)return iterResult(0, O[index]);
	                     return iterResult(0, [index, O[index]]);
	  }, VALUE);
	  
	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators[ARGUMENTS] = Iterators[ARRAY];
	  
	  // 21.1.3.27 String.prototype[@@iterator]()
	  defineStdIterators(String, STRING, function(iterated){
	    set(this, ITER, {o: String(iterated), i: 0});
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , index = iter.i
	      , point;
	    if(index >= O.length)return iterResult(1);
	    point = at.call(O, index);
	    iter.i += point.length;
	    return iterResult(0, point);
	  });
	}(createPointAt(true));
	
	/******************************************************************************
	 * Module : es6.regexp                                                        *
	 ******************************************************************************/
	
	DESC && !function(RegExpProto, _RegExp){  
	  // RegExp allows a regex with flags as the pattern
	  if(!function(){try{return RegExp(/a/g, 'i') == '/a/i'}catch(e){}}()){
	    RegExp = function RegExp(pattern, flags){
	      return new _RegExp(cof(pattern) == REGEXP && flags !== undefined
	        ? pattern.source : pattern, flags);
	    }
	    forEach.call(getNames(_RegExp), function(key){
	      key in RegExp || defineProperty(RegExp, key, {
	        configurable: true,
	        get: function(){ return _RegExp[key] },
	        set: function(it){ _RegExp[key] = it }
	      });
	    });
	    RegExpProto[CONSTRUCTOR] = RegExp;
	    RegExp[PROTOTYPE] = RegExpProto;
	    hidden(global, REGEXP, RegExp);
	  }
	  
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')defineProperty(RegExpProto, 'flags', {
	    configurable: true,
	    get: createReplacer(/^.*\/(\w*)$/, '$1')
	  });
	  
	  setSpecies(RegExp);
	}(RegExp[PROTOTYPE], RegExp);
	
	/******************************************************************************
	 * Module : web.immediate                                                     *
	 ******************************************************************************/
	
	// setImmediate shim
	// Node.js 0.9+ & IE10+ has setImmediate, else:
	isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
	  var postMessage      = global.postMessage
	    , addEventListener = global.addEventListener
	    , MessageChannel   = global.MessageChannel
	    , counter          = 0
	    , queue            = {}
	    , defer, channel, port;
	  setImmediate = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    }
	    defer(counter);
	    return counter;
	  }
	  clearImmediate = function(id){
	    delete queue[id];
	  }
	  function run(id){
	    if(has(queue, id)){
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  }
	  function listner(event){
	    run(event.data);
	  }
	  // Node.js 0.8-
	  if(NODE){
	    defer = function(id){
	      nextTick(part.call(run, id));
	    }
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    }
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
	    defer = function(id){
	      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run(id);
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(run, 0, id);
	    }
	  }
	}('onreadystatechange');
	$define(GLOBAL + BIND, {
	  setImmediate:   setImmediate,
	  clearImmediate: clearImmediate
	});
	
	/******************************************************************************
	 * Module : es6.promise                                                       *
	 ******************************************************************************/
	
	// ES6 promises shim
	// Based on https://github.com/getify/native-promise-only/
	!function(Promise, test){
	  isFunction(Promise) && isFunction(Promise.resolve)
	  && Promise.resolve(test = new Promise(function(){})) == test
	  || function(asap, RECORD){
	    function isThenable(it){
	      var then;
	      if(isObject(it))then = it.then;
	      return isFunction(then) ? then : false;
	    }
	    function handledRejectionOrHasOnRejected(promise){
	      var record = promise[RECORD]
	        , chain  = record.c
	        , i      = 0
	        , react;
	      if(record.h)return true;
	      while(chain.length > i){
	        react = chain[i++];
	        if(react.fail || handledRejectionOrHasOnRejected(react.P))return true;
	      }
	    }
	    function notify(record, reject){
	      var chain = record.c;
	      if(reject || chain.length)asap(function(){
	        var promise = record.p
	          , value   = record.v
	          , ok      = record.s == 1
	          , i       = 0;
	        if(reject && !handledRejectionOrHasOnRejected(promise)){
	          setTimeout(function(){
	            if(!handledRejectionOrHasOnRejected(promise)){
	              if(NODE){
	                if(!process.emit('unhandledRejection', value, promise)){
	                  // default node.js behavior
	                }
	              } else if(isFunction(console.error)){
	                console.error('Unhandled promise rejection', value);
	              }
	            }
	          }, 1e3);
	        } else while(chain.length > i)!function(react){
	          var cb = ok ? react.ok : react.fail
	            , ret, then;
	          try {
	            if(cb){
	              if(!ok)record.h = true;
	              ret = cb === true ? value : cb(value);
	              if(ret === react.P){
	                react.rej(TypeError(PROMISE + '-chain cycle'));
	              } else if(then = isThenable(ret)){
	                then.call(ret, react.res, react.rej);
	              } else react.res(ret);
	            } else react.rej(value);
	          } catch(err){
	            react.rej(err);
	          }
	        }(chain[i++]);
	        chain.length = 0;
	      });
	    }
	    function resolve(value){
	      var record = this
	        , then, wrapper;
	      if(record.d)return;
	      record.d = true;
	      record = record.r || record; // unwrap
	      try {
	        if(then = isThenable(value)){
	          wrapper = {r: record, d: false}; // wrap
	          then.call(value, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
	        } else {
	          record.v = value;
	          record.s = 1;
	          notify(record);
	        }
	      } catch(err){
	        reject.call(wrapper || {r: record, d: false}, err); // wrap
	      }
	    }
	    function reject(value){
	      var record = this;
	      if(record.d)return;
	      record.d = true;
	      record = record.r || record; // unwrap
	      record.v = value;
	      record.s = 2;
	      notify(record, true);
	    }
	    function getConstructor(C){
	      var S = assertObject(C)[SYMBOL_SPECIES];
	      return S != undefined ? S : C;
	    }
	    // 25.4.3.1 Promise(executor)
	    Promise = function(executor){
	      assertFunction(executor);
	      assertInstance(this, Promise, PROMISE);
	      var record = {
	        p: this,      // promise
	        c: [],        // chain
	        s: 0,         // state
	        d: false,     // done
	        v: undefined, // value
	        h: false      // handled rejection
	      };
	      hidden(this, RECORD, record);
	      try {
	        executor(ctx(resolve, record, 1), ctx(reject, record, 1));
	      } catch(err){
	        reject.call(record, err);
	      }
	    }
	    assignHidden(Promise[PROTOTYPE], {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function(onFulfilled, onRejected){
	        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
	        var react = {
	          ok:   isFunction(onFulfilled) ? onFulfilled : true,
	          fail: isFunction(onRejected)  ? onRejected  : false
	        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
	          react.res = assertFunction(resolve);
	          react.rej = assertFunction(reject);
	        }), record = this[RECORD];
	        record.c.push(react);
	        record.s && notify(record);
	        return P;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function(onRejected){
	        return this.then(undefined, onRejected);
	      }
	    });
	    assignHidden(Promise, {
	      // 25.4.4.1 Promise.all(iterable)
	      all: function(iterable){
	        var Promise = getConstructor(this)
	          , values  = [];
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, push, values);
	          var remaining = values.length
	            , results   = Array(remaining);
	          if(remaining)forEach.call(values, function(promise, index){
	            Promise.resolve(promise).then(function(value){
	              results[index] = value;
	              --remaining || resolve(results);
	            }, reject);
	          });
	          else resolve(results);
	        });
	      },
	      // 25.4.4.4 Promise.race(iterable)
	      race: function(iterable){
	        var Promise = getConstructor(this);
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, function(promise){
	            Promise.resolve(promise).then(resolve, reject);
	          });
	        });
	      },
	      // 25.4.4.5 Promise.reject(r)
	      reject: function(r){
	        return new (getConstructor(this))(function(resolve, reject){
	          reject(r);
	        });
	      },
	      // 25.4.4.6 Promise.resolve(x)
	      resolve: function(x){
	        return isObject(x) && RECORD in x && getPrototypeOf(x) === this[PROTOTYPE]
	          ? x : new (getConstructor(this))(function(resolve, reject){
	            resolve(x);
	          });
	      }
	    });
	  }(nextTick || setImmediate, safeSymbol('record'));
	  setToStringTag(Promise, PROMISE);
	  setSpecies(Promise);
	  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
	}(global[PROMISE]);
	
	/******************************************************************************
	 * Module : es6.collections                                                   *
	 ******************************************************************************/
	
	// ECMAScript 6 collections shim
	!function(){
	  var UID   = safeSymbol('uid')
	    , O1    = safeSymbol('O1')
	    , WEAK  = safeSymbol('weak')
	    , LEAK  = safeSymbol('leak')
	    , LAST  = safeSymbol('last')
	    , FIRST = safeSymbol('first')
	    , SIZE  = DESC ? safeSymbol('size') : 'size'
	    , uid   = 0
	    , tmp   = {};
	  
	  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
	    var ADDER = isMap ? 'set' : 'add'
	      , proto = C && C[PROTOTYPE]
	      , O     = {};
	    function initFromIterable(that, iterable){
	      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
	      return that;
	    }
	    function fixSVZ(key, chain){
	      var method = proto[key];
	      if(framework)proto[key] = function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      };
	    }
	    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
	      // create collection constructor
	      C = isWeak
	        ? function(iterable){
	            assertInstance(this, C, NAME);
	            set(this, UID, uid++);
	            initFromIterable(this, iterable);
	          }
	        : function(iterable){
	            var that = this;
	            assertInstance(that, C, NAME);
	            set(that, O1, create(null));
	            set(that, SIZE, 0);
	            set(that, LAST, undefined);
	            set(that, FIRST, undefined);
	            initFromIterable(that, iterable);
	          };
	      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
	      isWeak || !DESC || defineProperty(C[PROTOTYPE], 'size', {get: function(){
	        return assertDefined(this[SIZE]);
	      }});
	    } else {
	      var Native = C
	        , inst   = new C
	        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
	        , buggyZero;
	      // wrap to init collections from iterable
	      if(checkDangerIterClosing(function(O){ new C(O) })){
	        C = function(iterable){
	          assertInstance(this, C, NAME);
	          return initFromIterable(new Native, iterable);
	        }
	        C[PROTOTYPE] = proto;
	        if(framework)proto[CONSTRUCTOR] = C;
	      }
	      isWeak || inst[FOR_EACH](function(val, key){
	        buggyZero = 1 / key === -Infinity;
	      });
	      // fix converting -0 key to +0
	      if(buggyZero){
	        fixSVZ('delete');
	        fixSVZ('has');
	        isMap && fixSVZ('get');
	      }
	      // + fix .add & .set for chaining
	      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
	    }
	    setToStringTag(C, NAME);
	    setSpecies(C);
	    
	    O[NAME] = C;
	    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
	    
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return iterResult(1);
	      }
	      // return step by kind
	      if(kind == KEY)  return iterResult(0, entry.k);
	      if(kind == VALUE)return iterResult(0, entry.v);
	                       return iterResult(0, [entry.k, entry.v]);   
	    }, isMap ? KEY+VALUE : VALUE, !isMap);
	    
	    return C;
	  }
	  
	  function fastKey(it, create){
	    // return primitive with prefix
	    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	    // can't set id to frozen object
	    if(isFrozen(it))return 'F';
	    if(!has(it, UID)){
	      // not necessary to add id
	      if(!create)return 'E';
	      // add missing object id
	      hidden(it, UID, ++uid);
	    // return object id with prefix
	    } return 'O' + it[UID];
	  }
	  function getEntry(that, key){
	    // fast case
	    var index = fastKey(key), entry;
	    if(index != 'F')return that[O1][index];
	    // frozen object case
	    for(entry = that[FIRST]; entry; entry = entry.n){
	      if(entry.k == key)return entry;
	    }
	  }
	  function def(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry)entry.v = value;
	    // create new entry
	    else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  }
	
	  var collectionMethods = {
	    // 23.1.3.1 Map.prototype.clear()
	    // 23.2.3.2 Set.prototype.clear()
	    clear: function(){
	      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	        entry.r = true;
	        if(entry.p)entry.p = entry.p.n = undefined;
	        delete data[entry.i];
	      }
	      that[FIRST] = that[LAST] = undefined;
	      that[SIZE] = 0;
	    },
	    // 23.1.3.3 Map.prototype.delete(key)
	    // 23.2.3.4 Set.prototype.delete(value)
	    'delete': function(key){
	      var that  = this
	        , entry = getEntry(that, key);
	      if(entry){
	        var next = entry.n
	          , prev = entry.p;
	        delete that[O1][entry.i];
	        entry.r = true;
	        if(prev)prev.n = next;
	        if(next)next.p = prev;
	        if(that[FIRST] == entry)that[FIRST] = next;
	        if(that[LAST] == entry)that[LAST] = prev;
	        that[SIZE]--;
	      } return !!entry;
	    },
	    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	    forEach: function(callbackfn /*, that = undefined */){
	      var f = ctx(callbackfn, arguments[1], 3)
	        , entry;
	      while(entry = entry ? entry.n : this[FIRST]){
	        f(entry.v, entry.k, this);
	        // revert to the last existing entry
	        while(entry && entry.r)entry = entry.p;
	      }
	    },
	    // 23.1.3.7 Map.prototype.has(key)
	    // 23.2.3.7 Set.prototype.has(value)
	    has: function(key){
	      return !!getEntry(this, key);
	    }
	  }
	  
	  // 23.1 Map Objects
	  Map = getCollection(Map, MAP, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function(key){
	      var entry = getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function(key, value){
	      return def(this, key === 0 ? 0 : key, value);
	    }
	  }, collectionMethods, true);
	  
	  // 23.2 Set Objects
	  Set = getCollection(Set, SET, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function(value){
	      return def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, collectionMethods);
	  
	  function defWeak(that, key, value){
	    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
	    else {
	      has(key, WEAK) || hidden(key, WEAK, {});
	      key[WEAK][that[UID]] = value;
	    } return that;
	  }
	  function leakStore(that){
	    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
	  }
	  
	  var weakMethods = {
	    // 23.3.3.2 WeakMap.prototype.delete(key)
	    // 23.4.3.3 WeakSet.prototype.delete(value)
	    'delete': function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this)['delete'](key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
	    },
	    // 23.3.3.4 WeakMap.prototype.has(key)
	    // 23.4.3.4 WeakSet.prototype.has(value)
	    has: function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this).has(key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]);
	    }
	  };
	  
	  // 23.3 WeakMap Objects
	  WeakMap = getCollection(WeakMap, WEAKMAP, {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function(key){
	      if(isObject(key)){
	        if(isFrozen(key))return leakStore(this).get(key);
	        if(has(key, WEAK))return key[WEAK][this[UID]];
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function(key, value){
	      return defWeak(this, key, value);
	    }
	  }, weakMethods, true, true);
	  
	  // IE11 WeakMap frozen keys fix
	  if(framework && new WeakMap().set(Object.freeze(tmp), 7).get(tmp) != 7){
	    forEach.call(array('delete,has,get,set'), function(key){
	      var method = WeakMap[PROTOTYPE][key];
	      WeakMap[PROTOTYPE][key] = function(a, b){
	        // store frozen objects on leaky map
	        if(isObject(a) && isFrozen(a)){
	          var result = leakStore(this)[key](a, b);
	          return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	        } return method.call(this, a, b);
	      };
	    });
	  }
	  
	  // 23.4 WeakSet Objects
	  WeakSet = getCollection(WeakSet, WEAKSET, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function(value){
	      return defWeak(this, value, true);
	    }
	  }, weakMethods, false, true);
	}();
	
	/******************************************************************************
	 * Module : es6.reflect                                                       *
	 ******************************************************************************/
	
	!function(){
	  function Enumerate(iterated){
	    var keys = [], key;
	    for(key in iterated)keys.push(key);
	    set(this, ITER, {o: iterated, a: keys, i: 0});
	  }
	  createIterator(Enumerate, OBJECT, function(){
	    var iter = this[ITER]
	      , keys = iter.a
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!((key = keys[iter.i++]) in iter.o));
	    return iterResult(0, key);
	  });
	  
	  function wrap(fn){
	    return function(it){
	      assertObject(it);
	      try {
	        return fn.apply(undefined, arguments), true;
	      } catch(e){
	        return false;
	      }
	    }
	  }
	  
	  function reflectGet(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc)return has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getPrototypeOf(target))
	      ? reflectGet(proto, propertyKey, receiver)
	      : undefined;
	  }
	  function reflectSet(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = getOwnDescriptor(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getPrototypeOf(target))){
	        return reflectSet(proto, propertyKey, V, receiver);
	      }
	      ownDesc = descriptor(0);
	    }
	    if(has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
	      existingDescriptor.value = V;
	      return defineProperty(receiver, propertyKey, existingDescriptor), true;
	    }
	    return ownDesc.set === undefined
	      ? false
	      : (ownDesc.set.call(receiver, V), true);
	  }
	  var isExtensible = Object.isExtensible || returnIt;
	  
	  var reflect = {
	    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	    apply: ctx(call, apply, 3),
	    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	    construct: function(target, argumentsList /*, newTarget*/){
	      var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
	        , instance = create(isObject(proto) ? proto : ObjectProto)
	        , result   = apply.call(target, instance, argumentsList);
	      return isObject(result) ? result : instance;
	    },
	    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	    defineProperty: wrap(defineProperty),
	    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	    deleteProperty: function(target, propertyKey){
	      var desc = getOwnDescriptor(assertObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    },
	    // 26.1.5 Reflect.enumerate(target)
	    enumerate: function(target){
	      return new Enumerate(assertObject(target));
	    },
	    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	    get: reflectGet,
	    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	    getOwnPropertyDescriptor: function(target, propertyKey){
	      return getOwnDescriptor(assertObject(target), propertyKey);
	    },
	    // 26.1.8 Reflect.getPrototypeOf(target)
	    getPrototypeOf: function(target){
	      return getPrototypeOf(assertObject(target));
	    },
	    // 26.1.9 Reflect.has(target, propertyKey)
	    has: function(target, propertyKey){
	      return propertyKey in target;
	    },
	    // 26.1.10 Reflect.isExtensible(target)
	    isExtensible: function(target){
	      return !!isExtensible(assertObject(target));
	    },
	    // 26.1.11 Reflect.ownKeys(target)
	    ownKeys: ownKeys,
	    // 26.1.12 Reflect.preventExtensions(target)
	    preventExtensions: wrap(Object.preventExtensions || returnIt),
	    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	    set: reflectSet
	  }
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
	    return setPrototypeOf(assertObject(target), proto), true;
	  };
	  
	  $define(GLOBAL, {Reflect: {}});
	  $define(STATIC, 'Reflect', reflect);
	}();
	
	/******************************************************************************
	 * Module : es7.proposals                                                     *
	 ******************************************************************************/
	
	!function(){
	  $define(PROTO, ARRAY, {
	    // https://github.com/domenic/Array.prototype.includes
	    includes: createArrayContains(true)
	  });
	  $define(PROTO, STRING, {
	    // https://github.com/mathiasbynens/String.prototype.at
	    at: createPointAt(true)
	  });
	  
	  function createObjectToArray(isEntries){
	    return function(object){
	      var O      = toObject(object)
	        , keys   = getKeys(object)
	        , length = keys.length
	        , i      = 0
	        , result = Array(length)
	        , key;
	      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	      else while(length > i)result[i] = O[keys[i++]];
	      return result;
	    }
	  }
	  $define(STATIC, OBJECT, {
	    // https://gist.github.com/WebReflection/9353781
	    getOwnPropertyDescriptors: function(object){
	      var O      = toObject(object)
	        , result = {};
	      forEach.call(ownKeys(O), function(key){
	        defineProperty(result, key, descriptor(0, getOwnDescriptor(O, key)));
	      });
	      return result;
	    },
	    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
	    values:  createObjectToArray(false),
	    entries: createObjectToArray(true)
	  });
	  $define(STATIC, REGEXP, {
	    // https://gist.github.com/kangax/9698100
	    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	  });
	}();
	
	/******************************************************************************
	 * Module : es7.abstract-refs                                                 *
	 ******************************************************************************/
	
	// https://github.com/zenparsing/es-abstract-refs
	!function(REFERENCE){
	  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
	  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
	    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
	  
	  $define(STATIC, SYMBOL, {
	    referenceGet: REFERENCE_GET,
	    referenceSet: REFERENCE_SET,
	    referenceDelete: REFERENCE_DELETE
	  });
	  
	  hidden(FunctionProto, REFERENCE_GET, returnThis);
	  
	  function setMapMethods(Constructor){
	    if(Constructor){
	      var MapProto = Constructor[PROTOTYPE];
	      hidden(MapProto, REFERENCE_GET, MapProto.get);
	      hidden(MapProto, REFERENCE_SET, MapProto.set);
	      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
	    }
	  }
	  setMapMethods(Map);
	  setMapMethods(WeakMap);
	}('reference');
	
	/******************************************************************************
	 * Module : js.array.statics                                                  *
	 ******************************************************************************/
	
	// JavaScript 1.6 / Strawman array statics shim
	!function(arrayStatics){
	  function setArrayStatics(keys, length){
	    forEach.call(array(keys), function(key){
	      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
	    });
	  }
	  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
	  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	                  'reduce,reduceRight,copyWithin,fill,turn');
	  $define(STATIC, ARRAY, arrayStatics);
	}({});
	
	/******************************************************************************
	 * Module : web.dom.itarable                                                  *
	 ******************************************************************************/
	
	!function(NodeList){
	  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
	    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
	  }
	  Iterators.NodeList = Iterators[ARRAY];
	}(global.NodeList);
	}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), true);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    return new Generator(innerFn, outerFn, self || null, tryLocsList || []);
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    return new Promise(function(resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator.next);
	      var callThrow = step.bind(generator["throw"]);
	
	      function step(arg) {
	        var record = tryCatch(this, null, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }
	
	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }
	
	      callNext();
	    });
	  };
	
	  function Generator(innerFn, outerFn, self, tryLocsList) {
	    var generator = outerFn ? Object.create(outerFn.prototype) : this;
	    var context = new Context(tryLocsList);
	    var state = GenStateSuspendedStart;
	
	    function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedStart &&
	              typeof arg !== "undefined") {
	            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	            throw new TypeError(
	              "attempt to send " + JSON.stringify(arg) + " to newborn generator"
	            );
	          }
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	
	          if (method === "next") {
	            context.dispatchException(record.arg);
	          } else {
	            arg = record.arg;
	          }
	        }
	      }
	    }
	
	    generator.next = invoke.bind(generator, "next");
	    generator["throw"] = invoke.bind(generator, "throw");
	    generator["return"] = invoke.bind(generator, "return");
	
	    return generator;
	  }
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName;
	           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
	           ++tempIndex) {
	        this[tempName] = null;
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg < finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          return this.complete(entry.completion, entry.afterLoc);
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // JsGraph class ///////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @public
	 * @class JsGraph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 */
	
	var JsGraph = (function () {
		function JsGraph() {
			_classCallCheck(this, JsGraph);
	
			this._vertices = new Map(); // Map.< string, * >
			this._edges = new Map(); // Map.< string, Map.<string, *> >
			this._reverseEdges = new Map(); // Map.< string, Set.<*> >
			this._vertexCount = 0;
			this._edgeCount = 0;
		}
	
		_createComputedClass(JsGraph, [{
			key: "addNewVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			////////// creating them //////////
	
			/**
	   * Add a new vertex to this graph.
	   * @throws {JsGraph.VertexExistsError} if a vertex with this key already exists
	   * @param key   {string} the key with which to refer to this new vertex
	   * @param value {*}      the value to store in this new vertex
	   */
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new JsGraph.VertexExistsError(key, this._vertices.get(key));
				}
				this._vertices.set(key, value);
				this._edges.set(key, new Map());
				this._reverseEdges.set(key, new Set());
				this._vertexCount += 1;
			}
		}, {
			key: "setVertex",
	
			/**
	   * Set the value of an existing vertex in this graph.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key   {string} the key belonging to the vertex
	   * @param value {*}      the value to store in this vertex
	   */
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
			}
		}, {
			key: "ensureVertex",
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	   * If it does not yet exist, a new vertex is added with the given value.
	   * @param key   {string} the key for the vertex
	   * @param value {*}      the value to store if a new vertex is added
	   */
			value: function ensureVertex(key, value) {
				if (!this.hasVertex(key)) {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "addVertex",
	
			/**
	   * Add a new vertex to this graph. If a vertex with this key already exists,
	   * the value of that vertex is overwritten.
	   * @param key   {string} the key with which to refer to this new vertex
	   * @param value {*}      the value to store in this new vertex
	   */
			value: function addVertex(key, value) {
				if (this.hasVertex(key)) {
					this.setVertex(key, value);
				} else {
					this.addNewVertex(key, value);
				}
			}
		}, {
			key: "removeExistingVertex",
	
			////////// removing them //////////
	
			/**
	   * Remove an existing vertex from this graph.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
					throw new JsGraph.HasConnectedEdgesError(key);
				}
				this._vertices["delete"](key);
				this._vertexCount -= 1;
			}
		}, {
			key: "destroyExistingVertex",
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new JsGraph.VertexNotExistsError(key);
				}
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.verticesFrom(key)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var to = _step$value[0];
	
						this.removeEdge(key, to);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.verticesTo(key)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 1);
	
						var from = _step2$value[0];
	
						this.removeEdge(from, key);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				this.removeExistingVertex(key);
			}
		}, {
			key: "removeVertex",
	
			/**
	   * Remove an existing vertex from this graph.
	   * If a vertex with this key does not exist, nothing happens.
	   * @throws {JsGraph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeVertex(key) {
				if (this.hasVertex(key)) {
					this.removeExistingVertex(key);
				}
			}
		}, {
			key: "destroyVertex",
	
			/**
	   * Remove a vertex from this graph, as well as all edges connected to it.
	   * If a vertex with this key does not exist, nothing happens.
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyVertex(key) {
				if (this.hasVertex(key)) {
					this.destroyExistingVertex(key);
				}
			}
		}, {
			key: "vertexCount",
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of vertices in the whole graph
	   */
			value: function vertexCount() {
				return this._vertexCount;
			}
		}, {
			key: "hasVertex",
	
			/**
	   * Ask whether a vertex with a given key exists.
	   * @param key {string} the key to query
	   * @returns {boolean} whether there is a vertex with the given key
	   */
			value: function hasVertex(key) {
				return this._vertices.has(key);
			}
		}, {
			key: "vertexValue",
	
			/**
	   * Get the value associated with the vertex of a given key.
	   * @param key {string} the key to query
	   * @returns {*} the value associated with the vertex of the given key.
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such vertex, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link JsGraph#hasVertex} to distinguish these cases.
	   */
			value: function vertexValue(key) {
				return this._vertices.get(key);
			}
		}, {
			key: "addNewEdge",
	
			///////////////////////////
			////////// Edges //////////
			///////////////////////////
	
			////////// adding them //////////
	
			/**
	   * Add a new edge to this graph.
	   * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
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
				this._edges.get(from).set(to, value);
				this._reverseEdges.get(to).add(from);
				this._edgeCount += 1;
			}
		}, {
			key: "createNewEdge",
	
			/**
	   * Add a new edge to this graph. If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @throws {JsGraph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
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
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {JsGraph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this edge
	   */
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from).set(to, value);
			}
		}, {
			key: "spanEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
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
	
			/**
	   * Add a new edge to this graph. If an edge between `from` and `to` already exists,
	   * the value of that edge is overwritten.
	   * @throws {JsGraph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store in this new edge
	   */
			value: function addEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.addNewEdge(from, to, value);
				}
			}
		}, {
			key: "ensureEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices exists in this graph.
	   * If it already exists, nothing is done.
	   * If it does not yet exist, a new edge is added with the given value.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
			value: function ensureEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "createEdge",
	
			/**
	   * Add a new edge to this graph. If an edge between the `from` and `to`
	   * vertices already exists, the value of that edge is overwritten.
	   * If the `from` and/or `to` vertices do not yet exist
	   * in the graph, they are implicitly added with an `undefined` value.
	   * @param from  {string} the key for the originating vertex
	   * @param to    {string} the key for the terminating vertex
	   * @param value {*}      the value to store if a new edge is added
	   */
			value: function createEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					this.setEdge(from, to, value);
				} else {
					this.createNewEdge(from, to, value);
				}
			}
		}, {
			key: "removeExistingEdge",
	
			////////// removing them //////////
	
			/**
	   * Remove an existing edge from this graph.
	   * @throws {JsGraph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new JsGraph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from)["delete"](to);
				this._reverseEdges.get(to)["delete"](from);
				this._edgeCount -= 1;
			}
		}, {
			key: "removeEdge",
	
			/**
	   * Remove an edge from this graph.
	   * If an edge between the `from` and `to` vertices doesn't exist, nothing happens.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeEdge(from, to) {
				if (this.hasEdge(from, to)) {
					this.removeExistingEdge(from, to);
				}
			}
		}, {
			key: "edgeCount",
	
			////////// querying them //////////
	
			/**
	   * @returns {number} the number of edges in the whole graph
	   */
			value: function edgeCount() {
				return this._edgeCount;
			}
		}, {
			key: "hasEdge",
	
			/**
	   * Ask whether an edge between given `from` and `to` vertices exist.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {boolean} whether there is an edge between the given `from` and `to` vertices
	   */
			value: function hasEdge(from, to) {
				return this.hasVertex(from) && this.hasVertex(to) && this._edges.has(from) && this._edges.get(from).has(to);
			}
		}, {
			key: "edgeValue",
	
			/**
	   * Get the value associated with the edge between given `from` and `to` vertices.
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   * @returns {*} the value associated with the edge between the given `from` and `to` vertices
	   * Note that a return value of `undefined` can mean
	   *
	   * 1. that there is no such edge, or
	   * 2. that the stored value is actually `undefined`.
	   *
	   * Use {@link JsGraph#hasEdge} to distinguish these cases.
	   */
			value: function edgeValue(from, to) {
				return this.hasEdge(from, to) ? this._edges.get(from).get(to) : undefined;
			}
		}, {
			key: "vertices",
	
			///////////////////////////////////////////////
			//////////// ES6 Iterable interfaces //////////
			///////////////////////////////////////////////
	
			/**
	   * Iterate over all vertices of the graph, in no particular order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.vertices(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link JsGraph#@@iterator}
	   */
			value: regeneratorRuntime.mark(function vertices() {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._vertices[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step$value = _slicedToArray(_step.value, 2);
							key = _step$value[0];
							value = _step$value[1];
	
							if (!(_this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError;
	
						case 29:
							return context$2$0.finish(26);
	
						case 30:
							return context$2$0.finish(23);
	
						case 31:
						case "end":
							return context$2$0.stop();
					}
				}, vertices, this, [[4, 19, 23, 31], [24,, 26, 30]]);
			})
		}, {
			key: Symbol.iterator,
	
			/**
	   * A {@link JsGraph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	   * @method JsGraph#@@iterator
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (let [key, value] of jsGraph) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link JsGraph#vertices}
	   */
			value: function () {
				return this.vertices();
			}
		}, {
			key: "edges",
	
			/**
	   * Iterate over all edges of the graph, in no particular order.
	   * @returns { Iterator.<string, string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.edges(), fromToVal = it.next(); !it.done;) {
	   *     var from  = fromToVal[0],
	   *         to    = fromToVal[1],
	   *         value = fromToVal[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of jsGraph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
			value: regeneratorRuntime.mark(function edges() {
				var _this = this;
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._edges.keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step.value;
	
							if (!done.has(from)) {
								done.set(from, new Set());
							}
							_iteratorNormalCompletion2 = true;
							_didIteratorError2 = false;
							_iteratorError2 = undefined;
							context$2$0.prev = 12;
							_iterator2 = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step2.value;
	
							if (!(_this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, _this._edges.get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion2 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t1 = context$2$0["catch"](12);
							_didIteratorError2 = true;
							_iteratorError2 = context$2$0.t1;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError2) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError2;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t2 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t2;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError;
	
						case 52:
							return context$2$0.finish(49);
	
						case 53:
							return context$2$0.finish(46);
	
						case 54:
						case "end":
							return context$2$0.stop();
					}
				}, edges, this, [[4, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
			})
		}, {
			key: "verticesFrom",
	
			/**
	   * Iterate over the outgoing edges of a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	   *     var to          = toVertexEdge[0],
	   *         vertexValue = toVertexEdge[1],
	   *         edgeValue   = toVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of jsGraph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
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
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, _this._vertices.get(to), _this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t3 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t3;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesFrom, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesTo",
	
			/**
	   * Iterate over the incoming edges of a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	   *     var from        = fromVertexEdge[0],
	   *         vertexValue = fromVertexEdge[1],
	   *         edgeValue   = fromVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of jsGraph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
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
	
				var done, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 4;
							_iterator = _this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, _this._vertices.get(from), _this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t4 = context$2$0["catch"](4);
							_didIteratorError = true;
							_iteratorError = context$2$0.t4;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesTo, this, [[4, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesWithPathFrom",
	
			/**
	   * Iterate over all vertices reachable from a given vertex in the graph, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
			value: function verticesWithPathFrom(from) {
				if (!this.hasVertex(from)) {
					throw new JsGraph.VertexNotExistsError(from);
				}
				return this._verticesWithPathFrom(from, new Set());
			}
		}, {
			key: "_verticesWithPathFrom",
			value: regeneratorRuntime.mark(function _verticesWithPathFrom(from, done) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to;
	
				return regeneratorRuntime.wrap(function _verticesWithPathFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = _this._edges.get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, _this._vertices.get(to)];
	
						case 11:
							return context$2$0.delegateYield(_this._verticesWithPathFrom(to, done), "t5", 12);
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t6 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t6;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesWithPathFrom, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "verticesWithPathTo",
	
			/**
	   * Iterate over all vertices from which a given vertex in the graph can be reached, in no particular order.
	   * @throws {JsGraph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
			value: function verticesWithPathTo(to) {
				if (!this.hasVertex(to)) {
					throw new JsGraph.VertexNotExistsError(to);
				}
				return this._verticesWithPathTo(to, new Set());
			}
		}, {
			key: "_verticesWithPathTo",
			value: regeneratorRuntime.mark(function _verticesWithPathTo(to, done) {
				var _this = this;
	
				var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, from;
	
				return regeneratorRuntime.wrap(function _verticesWithPathTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion = true;
							_didIteratorError = false;
							_iteratorError = undefined;
							context$2$0.prev = 3;
							_iterator = _this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step.value;
	
							if (!(_this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, _this._vertices.get(from)];
	
						case 11:
							return context$2$0.delegateYield(_this._verticesWithPathTo(from, done), "t7", 12);
	
						case 12:
							_iteratorNormalCompletion = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t8 = context$2$0["catch"](3);
							_didIteratorError = true;
							_iteratorError = context$2$0.t8;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError;
	
						case 27:
							return context$2$0.finish(24);
	
						case 28:
							return context$2$0.finish(21);
	
						case 29:
						case "end":
							return context$2$0.stop();
					}
				}, _verticesWithPathTo, this, [[3, 17, 21, 29], [22,, 24, 28]]);
			})
		}, {
			key: "vertices_topologically",
	
			/**
	   * Iterate over all vertices of the graph in topological order.
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = jsGraph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of jsGraph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
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
								if (handled.has(a)) {
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
								return context$3$0.delegateYield(visit(b), "t9", 15);
	
							case 15:
								_iteratorNormalCompletion = true;
								context$3$0.next = 11;
								break;
	
							case 18:
								context$3$0.next = 24;
								break;
	
							case 20:
								context$3$0.prev = 20;
								context$3$0.t10 = context$3$0["catch"](9);
								_didIteratorError = true;
								_iteratorError = context$3$0.t10;
	
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
								return [a, _this._vertices.get(a)];
	
							case 35:
								handled.add(a);
	
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
							handled = new Set();
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
	
							if (handled.has(a)) {
								context$2$0.next = 13;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t11", 13);
	
						case 13:
							_iteratorNormalCompletion = true;
							context$2$0.next = 8;
							break;
	
						case 16:
							context$2$0.next = 22;
							break;
	
						case 18:
							context$2$0.prev = 18;
							context$2$0.t12 = context$2$0["catch"](6);
							_didIteratorError = true;
							_iteratorError = context$2$0.t12;
	
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
	
			/**
	   * Remove all edges from the graph, but leave the vertices intact.
	   */
			value: function clearEdges() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.edges()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var from = _step$value[0];
						var to = _step$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "clear",
	
			/**
	   * Remove all edges and vertices from the graph, putting it back in its initial state.
	   */
			value: function clear() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var v = _step$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "equals",
	
			////////////////////////////////////////
			////////// (Advanced) Queries //////////
			////////////////////////////////////////
	
			/**
	   * Ask whether this graph and another graph are equal.
	   * Two graphs are equal if they have the same vertices and the same edges.
	   * @param other {JsGraph} the other graph to compare this one to
	   * @param [eq] {function(*, *, string, ?string): boolean}
	   *     a custom equality function for stored values; defaults to `===`
	   *     comparison; The first two arguments are the two values to compare.
	   *     If they are vertex values, the third argument is the vertex key.
	   *     If they are edge values, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {boolean} `true` if the two graphs are equal; `false` otherwise
	   */
			value: function equals() {
				var other = arguments[0] === undefined ? undefined : arguments[0];
				var eq = arguments[1] === undefined ? function (x, y, from, to) {
					return x === y;
				} : arguments[1];
	
				if (!(other instanceof JsGraph)) {
					return false;
				}
				if (this.vertexCount() !== other.vertexCount()) {
					return false;
				}
				if (this.edgeCount() !== other.edgeCount()) {
					return false;
				}
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var value = _step$value[1];
	
						if (!other.hasVertex(key)) {
							return false;
						}
						if (!eq(value, other.vertexValue(key), key)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.edges()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 3);
	
						var from = _step2$value[0];
						var to = _step2$value[1];
						var value = _step2$value[2];
	
						if (!other.hasEdge(from, to)) {
							return false;
						}
						if (!eq(value, other.edgeValue(from, to), from, to)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				return true;
			}
		}, {
			key: "hasCycle",
	
			/**
	   * Test whether the graph contains a directed cycle.
	   * @returns {boolean} `false`, if there is no cycle; a truthy value if there *is* a cycle
	   *                    (not necessarily `true`; future versions of the library might return
	   *                     a description of the cycle)
	   */
			value: function hasCycle() {
				var _this = this;
	
				var visited = new Set();
				var handled = new Set();
	
				var visit = function (a) {
					/* if a cycle is found, record it and return */
					if (visited.has(a)) {
						return true;
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled.has(a)) {
						return false;
					}
					handled.add(a);
	
					/* recursively visit successors to check for cycles */
					visited.add(a);
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = _this.verticesFrom(a)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 1);
	
							var b = _step$value[0];
	
							if (visit(b)) {
								return true;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					visited["delete"](a);
				};
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var a = _step$value[0];
	
						if (visit(a)) {
							return true;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				return false;
			}
		}, {
			key: "hasPath",
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {boolean} `false`, if there is no such path; a truthy value if there *is* such a path
	   *                    (not necessarily `true`; future versions of the library might return
	   *                     a description of the path)
	   */
			value: function hasPath(from, to) {
				var _this = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return false;
				}
	
				var visited = new Set();
	
				/* Recursive auxiliary function: Is there a path from 'current' to 'to'? */
				var hasPathAux = function (current) {
					if (_this.hasEdge(current, to)) {
						return true;
					}
					visited.add(current);
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = _this.verticesFrom(current)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 1);
	
							var next = _step$value[0];
	
							if (!visited.has(next) && hasPathAux(next)) {
								return true;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					visited["delete"](current);
					return false;
				};
	
				return hasPathAux(from);
			}
		}, {
			key: "clone",
	
			/////////////////////////////
			////////// Cloning //////////
			/////////////////////////////
	
			/**
	   * Create a clone of this graph.
	   * @param [tr] {function(*, string, ?string): *}
	   *     a custom transformation function for stored values; defaults to
	   *     the identity function; The first argument is the value to clone.
	   *     If it is a vertex value, the third argument is the vertex key.
	   *     If it is an edge value, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {JsGraph} a clone of this graph
	   */
			value: function clone() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = new JsGraph();
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2);
	
						var key = _step$value[0];
						var val = _step$value[1];
	
						result.addVertex(key, tr(val, key));
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.edges()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 3);
	
						var from = _step2$value[0];
						var to = _step2$value[1];
						var val = _step2$value[2];
	
						result.addEdge(from, to, tr(val, from, to));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
							_iterator2["return"]();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
	
				return result;
			}
		}, {
			key: "transitiveReduction",
	
			/**
	   * Create a clone of this graph, but without any transitive edges.
	   * @param [tr] {function(*, string, ?string): *}
	   *     a custom transformation function for stored values; defaults to
	   *     the identity function; The first argument is the value to clone.
	   *     If it is a vertex value, the third argument is the vertex key.
	   *     If it is an edge value, the third and fourth argument are the
	   *     `from` and `to` keys respectively. (So you can test the fourth
	   *     argument to distinguish the two cases.)
	   * @returns {JsGraph} a clone of this graph
	   */
			value: function transitiveReduction() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = this.clone(tr);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.vertices()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 1);
	
						var x = _step$value[0];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = this.vertices()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var _step2$value = _slicedToArray(_step2.value, 1);
	
								var y = _step2$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion3 = true;
									var _didIteratorError3 = false;
									var _iteratorError3 = undefined;
	
									try {
										for (var _iterator3 = this.vertices()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
											var _step3$value = _slicedToArray(_step3.value, 1);
	
											var z = _step3$value[0];
	
											if (result.hasPath(y, z)) {
												result.removeEdge(x, z);
											}
										}
									} catch (err) {
										_didIteratorError3 = true;
										_iteratorError3 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
												_iterator3["return"]();
											}
										} finally {
											if (_didIteratorError3) {
												throw _iteratorError3;
											}
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
									_iterator2["return"]();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				return result;
			}
		}]);
	
		return JsGraph;
	})();
	
	module.exports = JsGraph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	 * @extends Error
	 */
	JsGraph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof JsGraph.VertexExistsError
	   * @instance
	   * @type {Set.<{ key: string, value }>}
	   */
			this.vertices = new Set();
			this.v(key, value);
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, {
			v: {
				value: function v(key, value) {
					this.vertices.add({ key: key, value: value });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
					this.message = "This graph has " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
						return v.key;
					}).join("', '") + "'";
				}
			}
		});
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	JsGraph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof JsGraph.VertexNotExistsError
	   * @instance
	   * @type {Set.<{ key: string }>}
	   */
			this.vertices = new Set();
			this.v(key);
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, {
			v: {
				value: function v(key) {
					this.vertices.add({ key: key });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
					this.message = "This graph does not have " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
						return v.key;
					}).join("', '") + "'";
				}
			}
		});
	
		return VertexNotExistError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	JsGraph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof JsGraph.EdgeExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string, value }>}
	   */
			this.edges = new Set();
			this.e(from, to, value);
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, {
			e: {
				value: function e(from, to, value) {
					this.edges.add({ from: from, to: to, value: value });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var edges = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _step.value;
							var from = _step$value.from;
							var to = _step$value.to;
	
							edges.push("('" + from + "', '" + to + "')");
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph has " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	JsGraph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistsError(from, to) {
			_classCallCheck(this, EdgeNotExistsError);
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof JsGraph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string }>}
	   */
			this.edges = new Set();
			this.e(from, to);
		}
	
		_inherits(EdgeNotExistsError, _Error4);
	
		_createClass(EdgeNotExistsError, {
			e: {
				value: function e(from, to) {
					this.edges.add({ from: from, to: to });
					this._refreshMessage();
					return this;
				}
			},
			_refreshMessage: {
				value: function _refreshMessage() {
					var edges = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _step.value;
							var from = _step$value.from;
							var to = _step$value.to;
	
							edges.push("('" + from + "', '" + to + "')");
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					var anEdges = edges.length === 1 ? "an edge" : "edges";
					this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
				}
			}
		});
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
	 * @extends Error
	 */
	JsGraph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			/**
	   * the key of the relevant vertex
	   * @public
	   * @constant key
	   * @memberof JsGraph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			this.key = key;
			this.message = "The '" + key + "' vertex has connected edges";
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	JsGraph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			/**
	   * the vertices involved in the cycle
	   * @public
	   * @constant cycle
	   * @memberof JsGraph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			this.cycle = cycle;
			this.message = "This graph contains a cycle: " + cycle;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);
	// stack

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var indent = _utilEs6Js.indent;
	var oncePer = _utilEs6Js.oncePer;
	var arraysEqual = _utilEs6Js.arraysEqual;
	var t = _utilEs6Js.t;
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
				applyTo: {
					value: function applyTo(target) {
						var options = arguments[1] === undefined ? {} : arguments[1];
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = this._components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var delta = _step.value;
	
								delta.applyTo(target, options);
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
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
	
						var str = _get(Object.getPrototypeOf(Composed.prototype), "toString", this).call(this, options);
						if (this._components.length > 0) {
							var deltas = "";
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
	
							try {
								for (var _iterator = this._components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var delta = _step.value;
	
									deltas += "• " + delta.toString(options) + "\n";
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator["return"]) {
										_iterator["return"]();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
	
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
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
	
							try {
								for (var _iterator = _this._components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var delta = _step.value;
	
									if (delta instanceof deltaJs.Delta.Composed) {
										delta._collapse();
										newComponents.push.apply(newComponents, _toConsumableArray(delta._components));
									} else {
										newComponents.push(delta);
									}
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator["return"]) {
										_iterator["return"]();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
	
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
	
		/* equality */
		deltaJs.newEquality(t("Composed", "Composed"), function (d1, d2) {
			return arraysEqual(d1._components, d2._components, function (x, y) {
				return x.equals(y);
			});
		});
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/* import external libraries */
	
	var JsGraph = _interopRequire(__webpack_require__(22));
	
	/* import internal stuff */
	
	var _utilEs6Js = __webpack_require__(4);
	
	var extend = _utilEs6Js.extend;
	var oncePer = _utilEs6Js.oncePer;
	
	var define_Delta = _interopRequire(__webpack_require__(9));
	
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
//# sourceMappingURL=delta.full.js.map