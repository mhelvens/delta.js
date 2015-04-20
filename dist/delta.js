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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	                    value: true
	});
	/* import utilities */
	
	var _extend = __webpack_require__(3);
	
	/* import the DeltaJs class */
	
	var _DeltaJs = __webpack_require__(4);
	
	var _DeltaJs2 = _interopRequireWildcard(_DeltaJs);
	
	/* make Target classes available under the DeltaJs symbol */
	
	var _ReadableTarget$WritableTarget = __webpack_require__(5);
	
	/* make Path classes available under the DeltaJs symbol */
	
	var _Path = __webpack_require__(6);
	
	var _Path2 = _interopRequireWildcard(_Path);
	
	/* make Error classes available under the DeltaJs symbol */
	
	var _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError = __webpack_require__(7);
	
	_extend.extend(_DeltaJs2['default'], { ReadableTarget: _ReadableTarget$WritableTarget.ReadableTarget, WritableTarget: _ReadableTarget$WritableTarget.WritableTarget });
	_extend.extend(_DeltaJs2['default'], { Path: _Path2['default'] });
	_extend.extend(_DeltaJs2['default'], { ApplicationError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.ApplicationError, PreconditionFailure: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.PreconditionFailure, MultipleOverloadsApplicationError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.MultipleOverloadsApplicationError,
	                    NoOverloadsApplicationError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.NoOverloadsApplicationError, CompositionError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.CompositionError,
	                    MultipleOverloadsCompositionError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.MultipleOverloadsCompositionError, ConstraintFailure: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.ConstraintFailure,
	                    ApplicationOrderCycle: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.ApplicationOrderCycle, UnresolvedDeltaConflict: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.UnresolvedDeltaConflict,
	                    MultipleActiveProxiesError: _ApplicationError$PreconditionFailure$MultipleOverloadsApplicationError$NoOverloadsApplicationError$CompositionError$MultipleOverloadsCompositionError$ConstraintFailure$ApplicationOrderCycle$UnresolvedDeltaConflict$MultipleActiveProxiesError.MultipleActiveProxiesError });
	
	/* export the DeltaJs class */
	exports['default'] = _DeltaJs2['default'];
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
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
	exports.oncePer = oncePer;
	exports.mapEqual = mapEqual;
	exports.customIndexOf = customIndexOf;
	exports.arraysEqual = arraysEqual;
	exports.arraysHaveSameElements = arraysHaveSameElements;
	exports.swapLastTwo = swapLastTwo;
	
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
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
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
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return obj1;
	}
	
	var _default = function _default(ds) {
		return function (object) {
			for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				rest[_key2 - 1] = arguments[_key2];
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
		for (var _len3 = arguments.length, keys = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
			keys[_key3 - 1] = arguments[_key3];
		}
	
		return _default(o).apply(undefined, [object].concat(keys, [{}]));
	}
	
	function a(object) {
		for (var _len4 = arguments.length, keys = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
			keys[_key4 - 1] = arguments[_key4];
		}
	
		return _default(o).apply(undefined, [object].concat(keys, [[]]));
	}
	
	function m(object) {
		for (var _len5 = arguments.length, keys = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
			keys[_key5 - 1] = arguments[_key5];
		}
	
		return _default(m).apply(undefined, [object].concat(keys, [new Map()]));
	}
	
	function s(object) {
		for (var _len6 = arguments.length, keys = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
			keys[_key6 - 1] = arguments[_key6];
		}
	
		return _default(m).apply(undefined, [object].concat(keys, [new Set()]));
	}
	
	function assert(condition, message) {
		if (!condition) {
			throw new Error(message || 'Assertion failed');
		}
	}
	
	function isUndefined(val) {
		return typeof val === 'undefined';
	}
	
	function isDefined(val) {
		return typeof val !== 'undefined';
	}
	
	function repeat(nr, str) {
		return new Array(nr + 1).join(str);
	}
	
	function indent(str, amount) {
		var char = arguments[2] === undefined ? ' ' : arguments[2];
	
		return str.replace(/^(?!\s*$)/mg, repeat(amount, char));
	}
	
	/* run a function only once per obj+string combo */
	var _oncePerSymbols = {};
	
	function oncePer(obj, key, fn) {
		var opFn = function opFn(obj) {
			if (!_oncePerSymbols[key]) {
				_oncePerSymbols[key] = Symbol('once per:' + key);
			}
			if (obj[_oncePerSymbols[key]]) {
				return;
			}
			obj[_oncePerSymbols[key]] = true;
			return fn.call(obj, obj);
		};
		if (typeof obj === 'string') {
			var _ref = [obj, key];
			key = _ref[0];
			fn = _ref[1];
	
			return opFn;
		} else {
			return opFn(obj);
		}
	}
	
	/* shorthand specifier for composition preconditions */
	var t = function t(type1, type2) {
		return function (d1, d2) {
			return d1.type === type1 && d2.type === type2;
		};
	};
	
	exports.t = t;
	/* shorthand specifier for composition implementations */
	var define_d = function define_d(deltaJs) {
		return function (type, fn) {
			if (typeof fn === 'string') {
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
	
	function swapLastTwo(a) {
		return a.slice(0, -2).concat([a[a.length - 1], a[a.length - 2]]);
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _bind = Function.prototype.bind;
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$assert$isUndefined$isDefined$arraysEqual = __webpack_require__(3);
	
	var _Path = __webpack_require__(6);
	
	var _Path2 = _interopRequireWildcard(_Path);
	
	var _ReadableTarget$WritableTarget$rt$wt = __webpack_require__(5);
	
	var _define_Delta = __webpack_require__(9);
	
	var _define_Delta2 = _interopRequireWildcard(_define_Delta);
	
	var _define_Overloaded = __webpack_require__(10);
	
	var _define_Overloaded2 = _interopRequireWildcard(_define_Overloaded);
	
	var _define_Modify = __webpack_require__(11);
	
	var _define_Modify2 = _interopRequireWildcard(_define_Modify);
	
	var _define_basicOperations = __webpack_require__(12);
	
	var _define_basicOperations2 = _interopRequireWildcard(_define_basicOperations);
	
	var _define_PutIntoArray = __webpack_require__(13);
	
	var _define_PutIntoArray2 = _interopRequireWildcard(_define_PutIntoArray);
	
	var _define_PutIntoFunction = __webpack_require__(14);
	
	var _define_PutIntoFunction2 = _interopRequireWildcard(_define_PutIntoFunction);
	
	var _define_DeltaModel = __webpack_require__(15);
	
	var _define_DeltaModel2 = _interopRequireWildcard(_define_DeltaModel);
	
	var _define_features = __webpack_require__(16);
	
	var _define_features2 = _interopRequireWildcard(_define_features);
	
	var _define_variationPoints = __webpack_require__(17);
	
	var _define_variationPoints2 = _interopRequireWildcard(_define_variationPoints);
	
	var _define_applicationConditions = __webpack_require__(18);
	
	var _define_applicationConditions2 = _interopRequireWildcard(_define_applicationConditions);
	
	var _define_ContainerProxy = __webpack_require__(19);
	
	var _define_ContainerProxy2 = _interopRequireWildcard(_define_ContainerProxy);
	
	/**
	 * This class offers every functionality you need from delta modeling.
	 * Each instance offers its own operation types and variation points
	 * and acts as a facade (as in design pattern) to the more specific
	 * subsystems of delta.js.
	 *
	 * You will usually need only one DeltaJs instance per application.
	 * @public
	 * @class DeltaJs
	 */
	
	var DeltaJs = (function () {
		function DeltaJs() {
			_classCallCheck(this, DeltaJs);
	
			_define_ContainerProxy2['default'](this);
			_define_Delta2['default'](this);
			_define_Overloaded2['default'](this);
			_define_Modify2['default'](this);
			_define_basicOperations2['default'](this);
			_define_PutIntoArray2['default'](this);
			_define_PutIntoFunction2['default'](this);
			_define_DeltaModel2['default'](this);
			_define_features2['default'](this);
			_define_variationPoints2['default'](this);
			_define_applicationConditions2['default'](this);
		}
	
		_createClass(DeltaJs, [{
			key: 'newOperationType',
	
			/**
	   * @param name       {string}   - name of the new operation type
	   * @param DeltaClass {Function} - the new operation class
	   * @param ProxyClass {?Function} - the optional custom Proxy subclass for this operation-type
	   */
			value: function newOperationType(name, DeltaClass) {
				var ProxyClass = arguments[2] === undefined ? null : arguments[2];
	
				/* sanity checks */
				_extend$assert$isUndefined$isDefined$arraysEqual.assert(name[0] === name[0].toUpperCase(), 'Delta operation classes must have a name starting with a capital letter - \'' + name + '\' does not.');
				_extend$assert$isUndefined$isDefined$arraysEqual.assert(_extend$assert$isUndefined$isDefined$arraysEqual.isUndefined(this.Delta[name]), 'The \'' + name + '\' operation type already exists.');
	
				/* store the operation class */
				this.Delta[name] = DeltaClass;
	
				/* set the (optional) Proxy class */
				DeltaClass.Proxy = ProxyClass;
	
				/* fetch certain given methods (if they exist) that need to be slightly augmented */
				var givenApplyTo = DeltaClass.prototype.applyTo || function () {};
	
				/* augment the class prototype */
				_extend$assert$isUndefined$isDefined$arraysEqual.extend(DeltaClass.prototype, {
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
	
						/* option defaults */
						if (_extend$assert$isUndefined$isDefined$arraysEqual.isUndefined(options.weak)) {
							options.weak = false;
						}
	
						/* does the target satisfy the precondition of the delta? */
						var judgment = this.evaluatePrecondition(target, options);
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
	
							return new (_bind.apply(DeltaClass, [null].concat(args)))();
						});
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
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
		}, {
			key: 'newProxyMethod',
	
			/**
	   * @public
	   * @method
	   * @param method  {string}   - method name
	   * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	   */
			value: function newProxyMethod(method, handler) {
				this.ContainerProxy.newProxyMethod(method, handler);
			}
		}]);
	
		return DeltaJs;
	})();
	
	exports['default'] = DeltaJs;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.wt = wt;
	exports.rt = rt;
	
	var ReadableTarget = (function () {
		function ReadableTarget(value) {
			_classCallCheck(this, ReadableTarget);
	
			this._val = value;
		}
	
		_createClass(ReadableTarget, [{
			key: "getValue",
			value: function getValue() {
				return this._val;
			}
		}, {
			key: "value",
			get: function () {
				return this.getValue();
			},
			set: function (v) {
				this.setValue(v);
			}
		}]);
	
		return ReadableTarget;
	})();
	
	exports.ReadableTarget = ReadableTarget;
	
	var WritableTarget = (function (_ReadableTarget) {
		function WritableTarget(obj, prop) {
			_classCallCheck(this, WritableTarget);
	
			_get(Object.getPrototypeOf(WritableTarget.prototype), "constructor", this).call(this);
			this._obj = obj;
			this._prop = prop;
		}
	
		_inherits(WritableTarget, _ReadableTarget);
	
		_createClass(WritableTarget, [{
			key: "getValue",
			value: function getValue() {
				return this._obj[this._prop];
			}
		}, {
			key: "setValue",
			value: function setValue(v) {
				this._obj[this._prop] = v;
			}
		}, {
			key: "delete",
			value: function _delete() {
				delete this._obj[this._prop];
			}
		}]);
	
		return WritableTarget;
	})(ReadableTarget);
	
	exports.WritableTarget = WritableTarget;
	
	function wt(obj, prop) {
		return new WritableTarget(obj, prop);
	}
	
	function rt(obj, prop) {
		return new ReadableTarget(obj, prop);
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _assert$isDefined = __webpack_require__(3);
	
	var Path = (function () {
		function Path() {
			var str = arguments[0] === undefined ? '' : arguments[0];
	
			_classCallCheck(this, Path);
	
			///////////////////////  11111  22222222222  33  //
			var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
			_assert$isDefined.assert(match, 'The path string \'' + str + '\' is not well formed.');
	
			var _match = _slicedToArray(match, 4);
	
			var lead = _match[1];
			var prop = _match[2];
			var rest = _match[3];
	
			if (lead === '#') {
				// The # separator is used in the JsDoc sense, and is translated to '.(instance).'
				this.set(new Path('.(instance).' + prop + '' + rest));
			} else if (prop !== '') {
				this._prop = prop;
				if (rest !== '') {
					this._rest = new Path(rest);
				}
			}
		}
	
		_createClass(Path, [{
			key: 'set',
			value: function set(other) {
				this._prop = other._prop;
				this._rest = other._rest;
			}
		}, {
			key: 'prop',
			get: function () {
				return this._prop;
			}
		}, {
			key: 'rest',
			get: function () {
				return this._rest;
			}
		}, {
			key: 'toString',
			value: function toString() {
				var result = '';
				if (_assert$isDefined.isDefined(this.prop)) {
					result += this.prop;
					if (_assert$isDefined.isDefined(this.rest)) {
						result += '.' + this.rest.toString();
					}
				}
				return result;
			}
		}]);
	
		return Path;
	})();
	
	exports['default'] = Path;
	module.exports = exports['default'];

	// TODO: implement that the `.(instance).` members are actually included in instances

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _bind = Function.prototype.bind;
	var _slice = Array.prototype.slice;
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var ApplicationError = (function (_Error) {
		function ApplicationError() {
			_classCallCheck(this, ApplicationError);
	
			if (_Error != null) {
				var _this = new (_bind.apply(_Error, [null].concat(_slice.call(arguments))))();
	
				_this.__proto__ = ApplicationError.prototype;
				return _this;
			}
	
			return _this;
		}
	
		_inherits(ApplicationError, _Error);
	
		return ApplicationError;
	})(Error);
	
	exports.ApplicationError = ApplicationError;
	
	var PreconditionFailure = (function (_ApplicationError) {
		function PreconditionFailure(delta, value) {
			_classCallCheck(this, PreconditionFailure);
	
			_get(Object.getPrototypeOf(PreconditionFailure.prototype), 'constructor', this).call(this);
			this.name = 'PreconditionFailure';
			this.message = 'This delta of type \'' + delta.type + '\' cannot apply to this value of type \'' + typeof value + '\'.';
			this.delta = delta;
			this.value = value;
		}
	
		_inherits(PreconditionFailure, _ApplicationError);
	
		return PreconditionFailure;
	})(ApplicationError);
	
	exports.PreconditionFailure = PreconditionFailure;
	
	var MultipleOverloadsApplicationError = (function (_PreconditionFailure) {
		function MultipleOverloadsApplicationError(delta, value) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			_classCallCheck(this, MultipleOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(MultipleOverloadsApplicationError.prototype), 'constructor', this).call(this, delta, value);
			this.name = 'MultipleOverloadsApplicationError';
			this.message = 'None of the delta-types ' + delta.overloads.map(function (d) {
				return '\'' + d.type + '\'';
			}).join(',') + ' can apply to this value of type \'' + typeof value + '\'.' + errors.map(function (e) {
				return '\n-- ' + e.message;
			}).join('');
			this.errors = errors;
		}
	
		_inherits(MultipleOverloadsApplicationError, _PreconditionFailure);
	
		return MultipleOverloadsApplicationError;
	})(PreconditionFailure);
	
	exports.MultipleOverloadsApplicationError = MultipleOverloadsApplicationError;
	
	var NoOverloadsApplicationError = (function (_PreconditionFailure2) {
		function NoOverloadsApplicationError(delta, value) {
			_classCallCheck(this, NoOverloadsApplicationError);
	
			_get(Object.getPrototypeOf(NoOverloadsApplicationError.prototype), 'constructor', this).call(this, delta, value);
			this.name = 'NoOverloadsApplicationError';
			this.message = 'This delta of type \'' + delta.type + '\' has no specific deltas assigned to it, so it cannot apply to this value of type \'' + typeof value + '.';
		}
	
		_inherits(NoOverloadsApplicationError, _PreconditionFailure2);
	
		return NoOverloadsApplicationError;
	})(PreconditionFailure);
	
	exports.NoOverloadsApplicationError = NoOverloadsApplicationError;
	
	var CompositionError = (function (_Error2) {
		function CompositionError(delta1, delta2) {
			_classCallCheck(this, CompositionError);
	
			var _this2 = new _Error2();
	
			_this2.__proto__ = CompositionError.prototype;
	
			_this2.name = 'CompositionError';
			_this2.message = 'This delta of type \'' + delta1.type + '\' cannot be composed with this other delta of type \'' + delta2.type + '\'.';
			_this2.delta1 = delta1;
			_this2.delta2 = delta2;
			return _this2;
		}
	
		_inherits(CompositionError, _Error2);
	
		return CompositionError;
	})(Error);
	
	exports.CompositionError = CompositionError;
	
	var MultipleOverloadsCompositionError = (function (_CompositionError) {
		function MultipleOverloadsCompositionError(delta1, delta2) {
			var errors = arguments[2] === undefined ? [] : arguments[2];
	
			_classCallCheck(this, MultipleOverloadsCompositionError);
	
			_get(Object.getPrototypeOf(MultipleOverloadsCompositionError.prototype), 'constructor', this).call(this, delta1, delta2);
			this.name = 'MultipleOverloadsCompositionError';
			this.message = 'There are no overloads to compose this delta of type \'' + delta1.type + '\' with this other delta of type \'' + delta2.type + '\'.' + errors.map(function (e) {
				return '\n-- ' + e.message;
			}).join('');
			this.errors = errors;
		}
	
		_inherits(MultipleOverloadsCompositionError, _CompositionError);
	
		return MultipleOverloadsCompositionError;
	})(CompositionError);
	
	exports.MultipleOverloadsCompositionError = MultipleOverloadsCompositionError;
	
	var ConstraintFailure = (function (_Error3) {
		function ConstraintFailure(feature) {
			_classCallCheck(this, ConstraintFailure);
	
			var _this3 = new _Error3();
	
			_this3.__proto__ = ConstraintFailure.prototype;
	
			_this3.name = 'ConstraintFailure';
			_this3.message = 'The feature \'' + feature.name + '\' is both selected and excluded by its constraints.';
			_this3.feature = feature;
			return _this3;
		}
	
		_inherits(ConstraintFailure, _Error3);
	
		return ConstraintFailure;
	})(Error);
	
	exports.ConstraintFailure = ConstraintFailure;
	
	var ApplicationOrderCycle = (function (_Error4) {
		function ApplicationOrderCycle(cycle) {
			_classCallCheck(this, ApplicationOrderCycle);
	
			var _this4 = new _Error4();
	
			_this4.__proto__ = ApplicationOrderCycle.prototype;
	
			_this4.name = 'ApplicationOrderCycle';
			_this4.message = 'The new application order created a cycle: ' + cycle + '}';
			_this4.cycle = cycle;
			return _this4;
		}
	
		_inherits(ApplicationOrderCycle, _Error4);
	
		return ApplicationOrderCycle;
	})(Error);
	
	exports.ApplicationOrderCycle = ApplicationOrderCycle;
	
	var UnresolvedDeltaConflict = (function (_ApplicationError2) {
		function UnresolvedDeltaConflict(deltaNames) {
			_classCallCheck(this, UnresolvedDeltaConflict);
	
			_get(Object.getPrototypeOf(UnresolvedDeltaConflict.prototype), 'constructor', this).call(this);
			this.name = 'UnresolvedDeltaConflict';
			deltaNames = [].concat(_toConsumableArray(deltaNames));
			var nameList = deltaNames.slice(0, -1).map(function (name) {
				return '\'' + name + '\'';
			}).join(',');
			this.message = 'There is an unresolved conflict between deltas ' + nameList + ' and \'' + deltaNames[deltaNames.length - 1] + '\'.';
			this.deltaNames = deltaNames;
		}
	
		_inherits(UnresolvedDeltaConflict, _ApplicationError2);
	
		return UnresolvedDeltaConflict;
	})(ApplicationError);
	
	exports.UnresolvedDeltaConflict = UnresolvedDeltaConflict;
	
	var MultipleActiveProxiesError = (function (_Error5) {
		function MultipleActiveProxiesError() {
			_classCallCheck(this, MultipleActiveProxiesError);
	
			var _this5 = new _Error5();
	
			_this5.__proto__ = MultipleActiveProxiesError.prototype;
	
			_this5.name = 'MultipleActiveProxiesError';
			_this5.message = 'Only one Proxy per path can be active at any given time.';
			return _this5;
		}
	
		_inherits(MultipleActiveProxiesError, _Error5);
	
		return MultipleActiveProxiesError;
	})(Error);
	
	exports.MultipleActiveProxiesError = MultipleActiveProxiesError;

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo = __webpack_require__(3);
	
	var _ReadableTarget$wt = __webpack_require__(5);
	
	var _PreconditionFailure$CompositionError = __webpack_require__(7);
	
	var _define_Composed = __webpack_require__(21);
	
	var _define_Composed2 = _interopRequireWildcard(_define_Composed);
	
	exports['default'] = _extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.oncePer('Delta', function (deltaJs) {
	
		deltaJs.Delta = (function () {
			function Delta() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Delta);
	
				this.id = ++deltaJs.Delta._nextID;
				this.args = args;
			}
	
			_createClass(Delta, [{
				key: 'arg',
				get: function () {
					return this.args[0];
				},
				set: function (v) {
					this.args[0] = v;
				}
			}, {
				key: 'clone',
	
				/**
	    * This method should be overwritten by subclasses to make a clone of 'this' delta.
	    * @public
	    * @abstract
	    * @method
	    * @nosideeffects
	    * @return {DeltaJs#Delta} - a clone of this delta
	    */
				value: function clone() {
					return new this.constructor(this.arg);
				}
			}, {
				key: 'evaluatePrecondition',
	
				/**
	    * @private
	    * @method
	    * @param target                        {DeltaJs.ReadableTarget}
	    * @param options                       {object}
	    * @param options.skipWeakPreconditions {boolean}
	    * @return {Boolean|PreconditionFailure} - `true` if the precondition is satisfied, otherwise
	    *                                        `false` or an instance of `DeltaJs.PreconditionFailure`
	    */
				value: function evaluatePrecondition(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
					var weak = options.weak;
	
					if (this.precondition) {
						var judgment = this.precondition(target, options);
						if (judgment instanceof _PreconditionFailure$CompositionError.PreconditionFailure) {
							return judgment;
						} else if (!judgment) {
							return new _PreconditionFailure$CompositionError.PreconditionFailure(this, target.value);
						}
					}
					return true;
				}
			}, {
				key: 'appliedTo',
	
				/**
	    * @public
	    * @method
	    * @nosideeffects
	    * @param value   {*}       - any given value
	    * @param options {object?} - the (optional) options for this delta application
	    * @return {*} - the value resulting in this delta being applied to the given `value`
	    */
				value: function appliedTo(value) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					if (value instanceof _ReadableTarget$wt.ReadableTarget) {
						value = value.value;
					}
					if (typeof value.clone === 'function') {
						value = value.clone();
					}
					var obj = { value: value };
					this.applyTo(_ReadableTarget$wt.wt(obj, 'value'), options);
					return obj.value;
				}
			}, {
				key: 'toString',
	
				/**
	    * @public
	    * @method
	    * @param options {object?}
	    * @return {string}
	    */
				value: function toString() {
					var options = arguments[0] === undefined ? {} : arguments[0];
	
					var str = this.type;
					if (options.targetProp) {
						str += ' ‹' + options.targetProp + '›';
					}
					if (this.args.length > 0) {
						str += ': ' + this.args.map(function (a) {
							return JSON.stringify(a);
						}).join(',');
					}
					if (options.debug) {
						str += ' (' + this.id + ')';
					}
					return str;
				}
			}]);
	
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
	  * @param name                {string}
	  * @param staticMethodName    {string}
	  * @param methodName          {string}
	  * @param options             {object}
	  * @param options.onTrue      {function=undefined}
	  * @param options.onFalse     {function=undefined}
	  * @param options.onDefault   {function|boolean=false}
	  * @param options.commutative {boolean=false}
	  * @param options.arity       {number=2}
	  */
		function newMultiDispatch(name, staticMethodName, methodName) {
			var _extend;
	
			var options = arguments[3] === undefined ? {} : arguments[3];
	
			/* set option defaults */
			if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.commutative)) {
				options.commutative = false;
			}
			if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.arity)) {
				options.arity = 2;
			}
			if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.onTrue)) {
				options.onTrue = function () {
					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}
	
					return args.slice(0, options.arity);
				};
			}
			if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.onFalse)) {
				options.onFalse = function () {
					throw new Error('Failure in finding a ' + name + '!');
				};
			}
			if (options.onDefault === 'onTrue') {
				options.onDefault = options.onTrue;
			} else if (options.onDefault === 'onFalse' || _extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.onDefault)) {
				options.onDefault = options.onFalse;
			}
	
			/* augment the options and store them */
			_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.extend(options, {
				name: name, staticMethodName: staticMethodName, methodName: methodName,
				creationMethodName: 'new' + name[0].toUpperCase() + '' + name.slice(1),
				storageSymbol: Symbol('multiDispatch:' + name)
			});
			_multiDispatchOptions.set(name, options);
	
			/* short names for all relevant options */
			var creationMethodName = options.creationMethodName;
			var storageSymbol = options.storageSymbol;
			var onTrue = options.onTrue;
			var onFalse = options.onFalse;
			var onDefault = options.onDefault;
			var commutative = options.commutative;
			var arity = options.arity;
	
			/* set static Delta members */
			_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.extend(deltaJs.Delta, (_extend = {}, _defineProperty(_extend, storageSymbol, []), _defineProperty(_extend, creationMethodName, function (precondition, value) {
				var options = arguments[2] === undefined ? {} : arguments[2];
	
				if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(options.weak)) {
					options.weak = false;
				}
				if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(deltaJs.Delta[storageSymbol])) {
					deltaJs.Delta[storageSymbol] = [];
				} // TODO: investigate why this is sometimes necessary
				deltaJs.Delta[storageSymbol].push({ precondition: precondition, value: value, options: options });
			}), _defineProperty(_extend, staticMethodName, function () {
				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}
	
				var deltas = args.slice(0, arity),
				    callOptions = args[arity] || {};
	
				/* defaults */
				if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(callOptions.weak)) {
					callOptions.weak = false;
				}
	
				/* use the first composition function for which these deltas satisfy the precondition */
				var fn = function fn() {},
				    found = false,
				    commuting = false;
				if (_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.isUndefined(deltaJs.Delta[storageSymbol])) {
					deltaJs.Delta[storageSymbol] = [];
				} // TODO: investigate why this is sometimes necessary
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = deltaJs.Delta[storageSymbol][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _step.value;
						var precondition = _step$value.precondition;
						var value = _step$value.value;
						var _options = _step$value.options;
	
						if (_options.weak && !callOptions.weak) {
							continue;
						} // only test weak rules when doing weak invocation
						if (precondition.apply(undefined, _toConsumableArray(deltas))) {
							fn = value;
							found = true;
							break;
						} else if (commutative && precondition.apply(undefined, _toConsumableArray(_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.swapLastTwo(deltas)))) {
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
						if (!_iteratorNormalCompletion && _iterator['return']) {
							_iterator['return']();
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
					return fn.apply(undefined, _toConsumableArray(_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.swapLastTwo(deltas)).concat([callOptions]));
				} else {
					return fn.apply(undefined, _toConsumableArray(deltas).concat([callOptions]));
				}
			}), _extend));
	
			/* set instance Delta members */
			_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.extend(deltaJs.Delta.prototype, _defineProperty({}, methodName, function () {
				var _deltaJs$Delta;
	
				for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
					args[_key4] = arguments[_key4];
				}
	
				return (_deltaJs$Delta = deltaJs.Delta)[staticMethodName].apply(_deltaJs$Delta, [this].concat(args));
			}));
	
			/* set static DeltaJs members */
			_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.oncePer(deltaJs.constructor, 'multiDispatch:' + name, function () {
				_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.extend(deltaJs.constructor.prototype, _defineProperty({}, creationMethodName, function (precondition, value) {
					var options = arguments[2] === undefined ? {} : arguments[2];
	
					return this.Delta[creationMethodName](precondition, value, options);
				}));
			});
		}
	
		function customMultiDispatchGiven(name) {
			for (var _len5 = arguments.length, deltas = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
				deltas[_key5 - 1] = arguments[_key5];
			}
	
			var _multiDispatchOptions$get = _multiDispatchOptions.get(name);
	
			var storageSymbol = _multiDispatchOptions$get.storageSymbol;
			var commutative = _multiDispatchOptions$get.commutative;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = deltaJs.Delta[storageSymbol][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _step2$value = _step2.value;
					var precondition = _step2$value.precondition;
					var value = _step2$value.value;
	
					if (precondition.apply(undefined, deltas) || commutative && precondition.apply(undefined, _toConsumableArray(_extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.swapLastTwo(deltas)))) {
						return typeof value === 'function';
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
	
			return false;
		}
	
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch('composition', '_binaryComposed', 'composedWith', {
			onTrue: function onTrue(d1, d2, opt) {
				return new deltaJs.Delta.Composed([d1, d2], opt);
			},
			onFalse: function onFalse(d1, d2) {
				throw new _PreconditionFailure$CompositionError.CompositionError(d1, d2);
			},
			onDefault: 'onFalse'
		});
		deltaJs.Delta.composed = function composed() {
			for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
				args[_key6] = arguments[_key6];
			}
	
			/* separate arguments */
			var options = undefined,
			    deltas = undefined;
			if (!(args[args.length - 1] instanceof deltaJs.Delta) && typeof args[args.length - 1] !== 'undefined') {
				deltas = args.slice(0, args.length - 1);
				options = args[args.length - 1];
			} else {
				deltas = args;
				options = {};
			}
			/* compose the list of deltas, and pass the options to each binary composition */
			return deltas.map(function (d) {
				return d || new deltaJs.Delta.NoOp();
			}).reduce(function (d1, d2) {
				return deltaJs.Delta._binaryComposed(d1, d2, options);
			}, new deltaJs.Delta.NoOp());
		};
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch('refinement', 'refines', 'refines', {
			onTrue: function onTrue(d1, d2) {
				return true;
			},
			onFalse: function onFalse(d1, d2) {
				return false;
			},
			onDefault: function onDefault(d1, d2, opt) {
				return d1.equals(d2, opt);
			}
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch('equality', 'equal', 'equals', {
			onTrue: function onTrue(d1, d2) {
				return true;
			},
			onFalse: function onFalse(d1, d2) {
				return false;
			},
			onDefault: function onDefault(d1, d2, opt) {
				if (customMultiDispatchGiven('refinement', d1, d2)) {
					return d1.refines(d2, opt) && d2.refines(d1, opt);
				} else {
					return d1.type === d2.type && _extend$oncePer$isDefined$isUndefined$arraysEqual$swapLastTwo.arraysEqual(d1.args, d2.args);
				}
			},
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch('commutation', 'commute', 'commutesWith', {
			onTrue: function onTrue(d1, d2) {
				return true;
			},
			onFalse: function onFalse(d1, d2) {
				return false;
			},
			onDefault: function onDefault(d1, d2, opt) {
				return d1.composedWith(d2, opt).equals(d2.composedWith(d1, opt), opt);
			},
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
		newMultiDispatch('resolution', 'resolves', 'resolves', {
			onTrue: function onTrue(d1, d2, d3) {
				return true;
			},
			onFalse: function onFalse(d1, d2, d3) {
				return false;
			},
			onDefault: function onDefault(d1, d2, d3, opt) {
				return deltaJs.Delta.composed(d2, d3, d1, opt).equals(deltaJs.Delta.composed(d3, d2, d1, opt), opt);
			},
			arity: 3,
			commutative: true
		});
		////////////////////////////////////////////////////////////////////////////////
	
		/* define deltaJs.Delta.Composed for use in compositions */
		_define_Composed2['default'](deltaJs);
	});
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _indent$oncePer$arraysEqual$t = __webpack_require__(3);
	
	var _define_Delta = __webpack_require__(9);
	
	var _define_Delta2 = _interopRequireWildcard(_define_Delta);
	
	var _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError = __webpack_require__(7);
	
	exports['default'] = _indent$oncePer$arraysEqual$t.oncePer('Overloaded', function (deltaJs) {
	
		_define_Delta2['default'](deltaJs);
	
		deltaJs.newOperationType('Overloaded', (function (_deltaJs$Delta) {
			function Overloaded() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Overloaded);
	
				_get(Object.getPrototypeOf(Overloaded.prototype), 'constructor', this).apply(this, args);
				this.overloads = this.arg || [];
			}
	
			_inherits(Overloaded, _deltaJs$Delta);
	
			_createClass(Overloaded, [{
				key: 'clone',
	
				/** {@public}{@method}{@nosideeffects}
	    * @return {DeltaJs#Delta.Overloaded} - a clone of this delta
	    */
				value: function clone() {
					var result = _get(Object.getPrototypeOf(Overloaded.prototype), 'clone', this).call(this);
					result.overloads = this.overloads.map(function (delta) {
						return delta.clone();
					});
					return result;
				}
			}, {
				key: 'precondition',
				value: function precondition(target, options) {
					/* find any overload with a precondition satisfied by the target; gather any errors */
					var errors = [];
					var success = this.overloads.some(function (delta) {
						var judgment = delta.evaluatePrecondition(target, options);
						if (judgment !== true) {
							errors.push(judgment);
							return false;
						}
						return true;
					});
					/* if none are satisfied, return the appropriate error */
					if (!success) {
						if (errors.length === 0) {
							return new _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError.NoOverloadsApplicationError(this, target.value);
						} else if (errors.length === 1) {
							return errors[0];
						} else {
							return new _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError.MultipleOverloadsApplicationError(this, target.value, errors);
						}
					}
					/* otherwise, return true */
					return true;
				}
			}, {
				key: 'applyTo',
	
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
							throw new _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError.NoOverloadsApplicationError(this, target.value);
						} else if (errors.length === 1) {
							throw errors[0];
						} else {
							throw new _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError.MultipleOverloadsApplicationError(this, target.value, errors);
						}
					}
				}
			}, {
				key: 'toString',
	
				/** {@public}{@method}
	    * @param options {object?}
	    * @return {string}
	    */
				value: function toString() {
					var options = arguments[0] === undefined ? {} : arguments[0];
	
					var str = _get(Object.getPrototypeOf(Overloaded.prototype), 'toString', this).call(this, options);
					var overloads = this.overloads.map(function (delta) {
						return delta.toString(options);
					}).join('\n');
					str += '\n' + _indent$oncePer$arraysEqual$t.indent(overloads, 4);
					return str;
				}
			}]);
	
			return Overloaded;
		})(deltaJs.Delta));
	
		/* composition */
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.Overloaded || d2 instanceof deltaJs.Delta.Overloaded;
		}, function (d1, d2, opt) {
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
								result.overloads.push(delta1.composedWith(delta2, opt));
							} catch (error) {
								errors.push(error);
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
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
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			if (result.overloads.length === 0) {
				throw new _MultipleOverloadsApplicationError$NoOverloadsApplicationError$MultipleOverloadsCompositionError.MultipleOverloadsCompositionError(d1, d2, errors);
			}
			return result;
		});
	
		/* equality */
		deltaJs.newEquality(_indent$oncePer$arraysEqual$t.t('Overloaded', 'Overloaded'), function (d1, d2, opt) {
			return _indent$oncePer$arraysEqual$t.arraysEqual(d1.overloads, d2.overloads, function (x, y) {
				return x.equals(y, opt);
			});
		});
	
		/* commutation ***********************************************/
		deltaJs.newCommutation(_indent$oncePer$arraysEqual$t.t('Overloaded', 'Overloaded'), function (d1, d2, opt) {
			for (var i = 0; i < d1.overloads.length; ++i) {
				if (!d1.overloads[i].commutesWith(d2.overloads[i], opt)) {
					return false;
				}
			}
			// TODO: the above is a hack; fix it properly
			return true;
		});
	});
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$indent$t$oncePer$mapEqual = __webpack_require__(3);
	
	var _Path = __webpack_require__(6);
	
	var _Path2 = _interopRequireWildcard(_Path);
	
	var _wt = __webpack_require__(5);
	
	var _define_ContainerProxy = __webpack_require__(19);
	
	var _define_ContainerProxy2 = _interopRequireWildcard(_define_ContainerProxy);
	
	exports['default'] = _extend$indent$t$oncePer$mapEqual.oncePer('Modify', function (deltaJs) {
	
		_define_ContainerProxy2['default'](deltaJs);
	
		//noinspection JSUnusedLocalSymbols
		deltaJs.newOperationType('Modify', (function (_deltaJs$Delta) {
			function Modify() {
				var _this = this;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Modify);
	
				_get(Object.getPrototypeOf(Modify.prototype), 'constructor', this).apply(this, args);
				this.subDeltas = new Map(this.arg && Object.keys(this.arg).map(function (key) {
					return [key, _this.arg[key]];
				}));
			}
	
			_inherits(Modify, _deltaJs$Delta);
	
			_createClass(Modify, [{
				key: 'clone',
	
				/**
	    * @public
	    * @method
	    * @nosideeffects
	    * @return {DeltaJs#Delta.Modify} - a clone of this delta
	    */
				value: function clone() {
					var result = _get(Object.getPrototypeOf(Modify.prototype), 'clone', this).call(this);
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
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					return result;
				}
			}, {
				key: 'precondition',
	
				/**
	    * @public
	    * @method
	    * @param target {*}
	    * @param options {object}
	    */
				value: function precondition(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					if (!(target.value instanceof Object)) {
						return false;
					}
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = this.subDeltas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _step2$value = _slicedToArray(_step2.value, 2);
	
							var prop = _step2$value[0];
							var delta = _step2$value[1];
	
							if (!options.restrictToProperty || options.restrictToProperty === prop) {
								var judgment = delta.evaluatePrecondition(_wt.wt(target.value, prop), _extend$indent$t$oncePer$mapEqual.extend({}, options, { restrictToProperty: null }));
								if (judgment !== true) {
									return judgment;
								}
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
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
				key: 'applyTo',
	
				/**
	    * @public
	    * @method
	    * @param target  {Delta.WritableTarget} - the target to which to apply this delta
	    * @param options {object?}              - the (optional) options for this delta application
	    */
				value: function applyTo(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;
	
					try {
						for (var _iterator3 = this.subDeltas[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var _step3$value = _slicedToArray(_step3.value, 2);
	
							var prop = _step3$value[0];
							var delta = _step3$value[1];
	
							if (!options.restrictToProperty || options.restrictToProperty === prop) {
								delta.applyTo(_wt.wt(target.value, prop), _extend$indent$t$oncePer$mapEqual.extend({}, options, { restrictToProperty: null }));
							}
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3['return']) {
								_iterator3['return']();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
			}, {
				key: 'toString',
	
				/**
	    * @public
	    * @method
	    * @param options {object?}
	    * @return {string}
	    */
				value: function toString() {
					var options = arguments[0] === undefined ? {} : arguments[0];
	
					var str = _get(Object.getPrototypeOf(Modify.prototype), 'toString', this).call(this, options);
					if (this.subDeltas.size > 0) {
						var deltas = this.subDeltas.entries().map(function (_ref) {
							var _ref2 = _slicedToArray(_ref, 2);
	
							var prop = _ref2[0];
							var delta = _ref2[1];
							return delta.toString(_extend$indent$t$oncePer$mapEqual.extend({}, options, { targetProp: prop }));
						}).join('\n');
						str += '\n' + _extend$indent$t$oncePer$mapEqual.indent(deltas, 4);
					}
					return str;
				}
			}]);
	
			return Modify;
		})(deltaJs.Delta), (function (_deltaJs$ContainerProxy) {
			function ModifyProxy() {
				_classCallCheck(this, ModifyProxy);
	
				if (_deltaJs$ContainerProxy != null) {
					_deltaJs$ContainerProxy.apply(this, arguments);
				}
			}
	
			_inherits(ModifyProxy, _deltaJs$ContainerProxy);
	
			_createClass(ModifyProxy, [{
				key: 'processProxyArguments',
	
				//noinspection JSMethodCanBeStatic
				/**
	    * @public
	    * @method
	    * @param rawArgs {*[]}
	    * @return {?{ options: Object, args: *[] }}
	    */
				value: function processProxyArguments() {
					for (var _len2 = arguments.length, rawArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						rawArgs[_key2] = arguments[_key2];
					}
	
					// rawArgs is parsed as (...options, path, ...args),
					// though path may also be passed as an option directly
					var options = {};
					do {
						if (rawArgs.length === 0) {
							throw new Error('The argument list for this Modify.Proxy method is insufficient.');
						}
						var arg = rawArgs.shift();
						if (typeof arg === 'string') {
							options.path = arg;
						} else {
							_extend$indent$t$oncePer$mapEqual.extend(options, arg);
						}
					} while (!options.path);
					return { options: options, args: rawArgs };
				}
			}, {
				key: 'addOperation',
	
				/**
	    * @public
	    * @method
	    * @param delta   {DeltaJs#Delta}
	    * @param options {{path: Path}}
	    * @return {DeltaJs#Proxy} - the deepest proxy created for this operation
	    */
				value: function addOperation(delta, options) {
					var path = options.path;
	
					if (!path.prop) {
						throw new Error('Operations on a Modify.Proxy need to have a non-empty path.');
					}
	
					/* create proxies */
					var deepestProxy;
					if (path.rest) {
						var newOptions = _extend$indent$t$oncePer$mapEqual.extend({}, options, { path: path.rest });
						var childProxy = this.addChildProxy(path.prop, new deltaJs.Delta.Modify());
						deepestProxy = childProxy.addOperation(delta, newOptions);
					} else {
						deepestProxy = this.addChildProxy(path.prop, delta);
					}
	
					// NOTE: Modify operations do not (yet) use any options
	
					/* return the deepest created proxy */
					return deepestProxy;
				}
			}, {
				key: 'delta',
	
				/**
	    * Dynamically compute and return the delta belonging to this proxy.
	    * @public
	    * @method
	    * @return the delta belonging to this proxy
	    */
				value: function delta() {
					var result = _get(Object.getPrototypeOf(ModifyProxy.prototype), 'delta', this).call(this);
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;
	
					try {
						for (var _iterator4 = this.childKeys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var prop = _step4.value;
	
							result.subDeltas.set(prop, this.childDelta(prop));
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4['return']) {
								_iterator4['return']();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
	
					return result;
				}
			}]);
	
			return ModifyProxy;
		})(deltaJs.ContainerProxy));
	
		/* composition - introducing 'Modify' ***********************************************/
		deltaJs.newComposition(_extend$indent$t$oncePer$mapEqual.t('Modify', 'Modify'), function (d1, d2, opt) {
			var result = d1.clone();
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;
	
			try {
				for (var _iterator5 = d2.subDeltas.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var prop = _step5.value;
	
					result.subDeltas.set(prop, deltaJs.Delta.composed(result.subDeltas.get(prop), d2.subDeltas.get(prop), opt));
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5['return']) {
						_iterator5['return']();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}
	
			return result;
		});
	
		/* equality ***********************************************/
		deltaJs.newEquality(_extend$indent$t$oncePer$mapEqual.t('Modify', 'Modify'), function (d1, d2) {
			return _extend$indent$t$oncePer$mapEqual.mapEqual(d1.subDeltas, d2.subDeltas, function (x, y) {
				return x.equals(y);
			});
		});
	
		/* commutation ***********************************************/
		deltaJs.newCommutation(_extend$indent$t$oncePer$mapEqual.t('Modify', 'Modify'), function (d1, d2, opt) {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;
	
			try {
				for (var _iterator6 = d1.subDeltas.keys()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var prop = _step6.value;
	
					if (d2.subDeltas.has(prop)) {
						var sub1 = d1.subDeltas.get(prop);
						var sub2 = d2.subDeltas.get(prop);
						if (!sub1.commutesWith(sub2, opt)) {
							return false;
						}
					}
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6['return']) {
						_iterator6['return']();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}
	
			return true;
		});
	});
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _isUndefined$isDefined$t$define_d$oncePer = __webpack_require__(3);
	
	var _WritableTarget$ReadableTarget$rt$wt = __webpack_require__(5);
	
	var _define_Delta = __webpack_require__(9);
	
	var _define_Delta2 = _interopRequireWildcard(_define_Delta);
	
	var _define_Modify = __webpack_require__(11);
	
	var _define_Modify2 = _interopRequireWildcard(_define_Modify);
	
	exports['default'] = _isUndefined$isDefined$t$define_d$oncePer.oncePer('basic operations', function (deltaJs) {
	
		_define_Delta2['default'](deltaJs);
		_define_Modify2['default'](deltaJs);
	
		/* declaring the basic operation types **********************************************/
		deltaJs.newOperationType('NoOp', (function (_deltaJs$Delta) {
			function NoOp() {
				_classCallCheck(this, NoOp);
	
				if (_deltaJs$Delta != null) {
					_deltaJs$Delta.apply(this, arguments);
				}
			}
	
			_inherits(NoOp, _deltaJs$Delta);
	
			return NoOp;
		})(deltaJs.Delta));
		deltaJs.newOperationType('Add', (function (_deltaJs$Delta2) {
			function Add() {
				_classCallCheck(this, Add);
	
				if (_deltaJs$Delta2 != null) {
					_deltaJs$Delta2.apply(this, arguments);
				}
			}
	
			_inherits(Add, _deltaJs$Delta2);
	
			_createClass(Add, [{
				key: 'precondition',
				value: function precondition(target, _ref) {
					var weak = _ref.weak;
					return target instanceof _WritableTarget$ReadableTarget$rt$wt.WritableTarget && (weak || _isUndefined$isDefined$t$define_d$oncePer.isUndefined(target.value));
				}
			}, {
				key: 'applyTo',
				value: function applyTo(target) {
					target.value = this.arg;
				}
			}]);
	
			return Add;
		})(deltaJs.Delta));
		deltaJs.newOperationType('Remove', (function (_deltaJs$Delta3) {
			function Remove() {
				_classCallCheck(this, Remove);
	
				if (_deltaJs$Delta3 != null) {
					_deltaJs$Delta3.apply(this, arguments);
				}
			}
	
			_inherits(Remove, _deltaJs$Delta3);
	
			_createClass(Remove, [{
				key: 'precondition',
				value: function precondition(target, _ref2) {
					var weak = _ref2.weak;
					return target instanceof _WritableTarget$ReadableTarget$rt$wt.WritableTarget && (weak || _isUndefined$isDefined$t$define_d$oncePer.isDefined(target.value));
				}
			}, {
				key: 'applyTo',
				value: function applyTo(target) {
					target['delete']();
				}
			}]);
	
			return Remove;
		})(deltaJs.Delta));
		deltaJs.newOperationType('Forbid', (function (_deltaJs$Delta4) {
			function Forbid() {
				_classCallCheck(this, Forbid);
	
				if (_deltaJs$Delta4 != null) {
					_deltaJs$Delta4.apply(this, arguments);
				}
			}
	
			_inherits(Forbid, _deltaJs$Delta4);
	
			_createClass(Forbid, [{
				key: 'precondition',
				value: function precondition(target, _ref3) {
					var weak = _ref3.weak;
					return weak || _isUndefined$isDefined$t$define_d$oncePer.isUndefined(target.value);
				}
			}]);
	
			return Forbid;
		})(deltaJs.Delta));
		deltaJs.newOperationType('Replace', (function (_deltaJs$Delta5) {
			function Replace() {
				_classCallCheck(this, Replace);
	
				if (_deltaJs$Delta5 != null) {
					_deltaJs$Delta5.apply(this, arguments);
				}
			}
	
			_inherits(Replace, _deltaJs$Delta5);
	
			_createClass(Replace, [{
				key: 'precondition',
				value: function precondition(target, _ref4) {
					var weak = _ref4.weak;
					return target instanceof _WritableTarget$ReadableTarget$rt$wt.WritableTarget && (weak || _isUndefined$isDefined$t$define_d$oncePer.isDefined(target.value));
				}
			}, {
				key: 'applyTo',
				value: function applyTo(target) {
					target.value = this.arg;
				}
			}]);
	
			return Replace;
		})(deltaJs.Delta));
		deltaJs.newOperationType('Update', (function (_deltaJs$Delta6) {
			function Update() {
				_classCallCheck(this, Update);
	
				if (_deltaJs$Delta6 != null) {
					_deltaJs$Delta6.apply(this, arguments);
				}
			}
	
			_inherits(Update, _deltaJs$Delta6);
	
			_createClass(Update, [{
				key: 'precondition',
				value: function precondition(target, _ref5) {
					var weak = _ref5.weak;
					return target instanceof _WritableTarget$ReadableTarget$rt$wt.WritableTarget && (weak || _isUndefined$isDefined$t$define_d$oncePer.isDefined(target.value));
				}
			}, {
				key: 'applyTo',
				value: function applyTo(target) {
					target.value = this.arg(target.value);
				}
			}]);
	
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
		var d = _isUndefined$isDefined$t$define_d$oncePer.define_d(deltaJs);
	
		/* composition - introducing 'Add' **************************************************/
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Modify'), d('Add', function (_ref6) {
			var d2 = _ref6.d2;
			var p1 = _ref6.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Modify', 'Add'), false);
		deltaJs.newComposition(function (d1, d2) {
			return d2.type === 'Add';
		}, d('Add', function (_ref7) {
			var p2 = _ref7.p2;
			return p2;
		}), { weak: true });
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Add'), false);
	
		/* composition - introducing 'Remove' ***********************************************/
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Modify', 'Remove'), d('Remove'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Remove'), d('Forbid'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Modify'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Add'), d('Replace', function (_ref8) {
			var p2 = _ref8.p2;
			return p2;
		}));
		deltaJs.newComposition(function (d1, d2) {
			return d2.type === 'Remove';
		}, d('Remove'), { weak: true });
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Remove'), false);
	
		/* composition - introducing 'Forbid' ***********************************************/
		deltaJs.newComposition(function (d1, d2) {
			return d1.type === 'Forbid';
		}, function (d1, d2) {
			return d2.clone();
		}, { weak: true }); // TODO: test
		deltaJs.newComposition(function (d1, d2) {
			return d2.type === 'Forbid';
		}, function (d1, d2) {
			return d1.clone();
		}, { weak: true }); // TODO: test
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Modify', 'Forbid'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Forbid'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Forbid'), d('Remove'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Modify'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Add'), d('Add', function (_ref9) {
			var p2 = _ref9.p2;
			return p2;
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Remove'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Forbid'), d('Forbid'));
	
		/* composition - introducing 'Replace' **********************************************/
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Modify', 'Replace'), d('Replace', function (_ref10) {
			var p2 = _ref10.p2;
			return p2;
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Replace'), d('Add', function (_ref11) {
			var p2 = _ref11.p2;
			return p2;
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Replace'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Replace'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Modify'), d('Replace', function (_ref12) {
			var d2 = _ref12.d2;
			var p1 = _ref12.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Add'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Remove'), d('Remove'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Forbid'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Replace'), d('Replace', function (_ref13) {
			var p2 = _ref13.p2;
			return p2;
		}));
	
		/* composition - introducing 'Update' ***********************************************/
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Modify', 'Update'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Add', 'Update'), d('Add', function (_ref14) {
			var d2 = _ref14.d2;
			var p1 = _ref14.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Remove', 'Update'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Forbid', 'Update'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Replace', 'Update'), d('Replace', function (_ref15) {
			var d2 = _ref15.d2;
			var p1 = _ref15.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Modify'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Add'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Remove'), d('Remove'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Forbid'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Replace'), d('Replace', function (_ref16) {
			var p2 = _ref16.p2;
			return p2;
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer.t('Update', 'Update'), d('Update', function (_ref17) {
			var p1 = _ref17.p1;
			var p2 = _ref17.p2;
			return function (v) {
				return p2(p1(v));
			};
		}));
	});
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf = __webpack_require__(3);
	
	var _define_Modify = __webpack_require__(11);
	
	var _define_Modify2 = _interopRequireWildcard(_define_Modify);
	
	var _define_basicOperations = __webpack_require__(12);
	
	var _define_basicOperations2 = _interopRequireWildcard(_define_basicOperations);
	
	var _define_Proxy = __webpack_require__(22);
	
	var _define_Proxy2 = _interopRequireWildcard(_define_Proxy);
	
	exports['default'] = _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.oncePer('PutIntoArray', function (deltaJs) {
	
		_define_Modify2['default'](deltaJs);
		_define_basicOperations2['default'](deltaJs);
		_define_Proxy2['default'](deltaJs);
	
		/* declaring the array operation type ***********************************************/
		deltaJs.newOperationType('PutIntoArray', (function (_deltaJs$Delta) {
			function PutIntoArray() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, PutIntoArray);
	
				_get(Object.getPrototypeOf(PutIntoArray.prototype), 'constructor', this).apply(this, args);
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : [];
			}
	
			_inherits(PutIntoArray, _deltaJs$Delta);
	
			_createClass(PutIntoArray, [{
				key: 'clone',
				value: function clone() {
					var result = _get(Object.getPrototypeOf(PutIntoArray.prototype), 'clone', this).call(this);
					result.values = [].concat(_toConsumableArray(this.values));
					return result;
				}
			}, {
				key: 'precondition',
				value: function precondition(target, _ref) {
					var weak = _ref.weak;
					return weak || _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.isDefined(target.value) && Array.isArray(target.value);
				}
			}, {
				key: 'applyTo',
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
								case 'prepend':
									{
										arr.unshift(value);
									}break;
								case 'insert':
									{
										// 'insert' doesn't *have* to use a random position. Any position will do.
										//  E.g., its implementation could just be the same as for 'append'.
										//  Nonetheless, we use a random position to force the tests to be permissive.
										var position = Math.floor(Math.random() * (arr.length + 1));
										arr.splice(position, 0, value);
									}break;
								case 'append':
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
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
			}, {
				key: 'methods',
				get: function () {
					return [];
				}
			}]);
	
			return PutIntoArray;
		})(deltaJs.Delta));
	
		/* Proxy methods ****************************************************************************/
		deltaJs.newProxyMethod('prepend', function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: 'prepend', value: value });
		});
		deltaJs.newProxyMethod('insert', function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: 'insert', value: value });
		});
		deltaJs.newProxyMethod('append', function (value) {
			return new deltaJs.Delta.PutIntoArray({ method: 'append', value: value });
		});
	
		/* composition *******************************************************************************/
		var d = _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.define_d(deltaJs);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Modify', 'PutIntoArray'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Add', 'PutIntoArray'), d('Add', function (_ref2) {
			var d2 = _ref2.d2;
			var p1 = _ref2.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Remove', 'PutIntoArray'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Forbid', 'PutIntoArray'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Replace', 'PutIntoArray'), d('Replace', function (_ref3) {
			var d2 = _ref3.d2;
			var p1 = _ref3.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('Update', 'PutIntoArray'), true);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Modify'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Add'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Remove'), d('Remove'));
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Forbid'), false);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Replace'), d('Replace', function (_ref4) {
			var p2 = _ref4.p2;
			return p2;
		}));
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'Update'), true);
		deltaJs.newComposition(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'PutIntoArray'), function (d1, d2) {
			return new deltaJs.Delta.PutIntoArray([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
		});
	
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	
		/* refinement *******************************************************************************/
		deltaJs.newRefinement(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'PutIntoArray'), function (d1, d2) {
			/* define operation equality */
			var eq = function eq(x, y) {
				return x.method === y.method && x.value === y.value;
			};
	
			/* both need to at least have the same operations (not necessarily in the same order) */
			if (!_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.arraysHaveSameElements(d1.values, d2.values, eq)) {
				return false;
			}
	
			/* appensions and prepensions need to be in the same order */
			if (!_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.arraysEqual(d1.values.filter(function (v) {
				return v.method === 'append';
			}), d2.values.filter(function (v) {
				return v.method === 'append';
			}), eq)) {
				return false;
			}
			if (!_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.arraysEqual(d1.values.filter(function (v) {
				return v.method === 'prepend';
			}), d2.values.filter(function (v) {
				return v.method === 'prepend';
			}), eq)) {
				return false;
			}
	
			/* insertions in 'd1' cannot come later than their counterparts in 'd2', */
			/* in the sense of appensions and prepensions that have come before it        */
			var appensionsAndPrepensionsSeen = [];
			for (var i = 0; i < d1.values.length; ++i) {
				if (d1.values[i].method === 'insert') {
					var ind = _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.customIndexOf(d2.values, d1.values[i], eq);
					var appensionsAndPrepensionsToGo = [].concat(appensionsAndPrepensionsSeen);
					for (var j = 0; j <= ind; ++j) {
						var indd = _isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.customIndexOf(appensionsAndPrepensionsToGo, d2.values[j], eq);
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
	
		/* weak commutation - allow two PutIntoFunction deltas to always commute in a weak context*/
		deltaJs.newCommutation(_isDefined$t$define_d$oncePer$arraysEqual$arraysHaveSameElements$customIndexOf.t('PutIntoArray', 'PutIntoArray'), function (d1, d2, opt) {
			return true;
		}, { weak: true });
	});
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _isUndefined$isDefined$t$define_d$oncePer$arraysEqual = __webpack_require__(3);
	
	var _WritableTarget = __webpack_require__(5);
	
	var _define_Modify = __webpack_require__(11);
	
	var _define_Modify2 = _interopRequireWildcard(_define_Modify);
	
	var _define_BasicOperations = __webpack_require__(12);
	
	var _define_BasicOperations2 = _interopRequireWildcard(_define_BasicOperations);
	
	var _define_Proxy = __webpack_require__(22);
	
	var _define_Proxy2 = _interopRequireWildcard(_define_Proxy);
	
	exports['default'] = _isUndefined$isDefined$t$define_d$oncePer$arraysEqual.oncePer('PutIntoFunction', function (deltaJs) {
	
		_define_Modify2['default'](deltaJs);
		_define_BasicOperations2['default'](deltaJs);
		_define_Proxy2['default'](deltaJs);
	
		/* a symbol under which function parts can be stored in public functions */
		var functionPartsSymbol = Symbol('DeltaJs:function-parts');
	
		/* declaring the function operation type */
		deltaJs.newOperationType('PutIntoFunction', (function (_deltaJs$Delta) {
			function PutIntoFunction() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, PutIntoFunction);
	
				_get(Object.getPrototypeOf(PutIntoFunction.prototype), 'constructor', this).apply(this, args);
				this.values = this.arg ? Array.isArray(this.arg) ? this.arg : [this.arg] : [];
			}
	
			_inherits(PutIntoFunction, _deltaJs$Delta);
	
			_createClass(PutIntoFunction, [{
				key: 'clone',
				value: function clone() {
					var result = _get(Object.getPrototypeOf(PutIntoFunction.prototype), 'clone', this).call(this);
					result.values = [].concat(_toConsumableArray(this.values));
					return result;
				}
			}, {
				key: 'precondition',
				value: function precondition(target) {
					return _isUndefined$isDefined$t$define_d$oncePer$arraysEqual.isDefined(target.value) && typeof target.value === 'function' && (_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.isDefined(target.value[functionPartsSymbol]) || target instanceof _WritableTarget.WritableTarget);
				}
			}, {
				key: 'applyTo',
				value: function applyTo(target) {
					if (_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.isUndefined(target.value[functionPartsSymbol])) {
						var originalFn = target.value;
						var newFn = (function (_newFn) {
							function newFn(_x) {
								return _newFn.apply(this, arguments);
							}
	
							newFn.toString = function () {
								return _newFn.toString();
							};
	
							return newFn;
						})(function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}
	
							var result = undefined;
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;
	
							try {
								for (var _iterator = newFn[functionPartsSymbol][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var fn = _step.value;
	
									result = fn.apply(this, args);
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator['return']) {
										_iterator['return']();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
	
							return result;
						});
						newFn[functionPartsSymbol] = [function () {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
								args[_key3] = arguments[_key3];
							}
	
							originalFn.apply(this, args);
						}];
						target.value = newFn;
					}
					var arr = target.value[functionPartsSymbol];
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = this.values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _step2$value = _step2.value;
							var method = _step2$value.method;
							var value = _step2$value.value;
	
							switch (method) {
								case 'prepend':
									{
										arr.unshift(value);
									}break;
								case 'insert':
									{
										// 'insert' doesn't *have* to use a random position. Any position will do.
										//  E.g., its implementation could just be the same as for 'append'.
										//  Nonetheless, we use a random position to force the tests to be permissive.
										var position = Math.floor(Math.random() * (arr.length + 1));
										arr.splice(position, 0, value);
									}break;
								case 'append':
									{
										arr.push(value);
									}break;
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			}, {
				key: 'methods',
				get: function () {
					return [];
				}
			}]);
	
			return PutIntoFunction;
		})(deltaJs.Delta));
	
		/* Proxy methods ****************************************************************************/
		deltaJs.newProxyMethod('prepend', function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: 'prepend', value: value });
		});
		deltaJs.newProxyMethod('insert', function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: 'insert', value: value });
		});
		deltaJs.newProxyMethod('append', function (value) {
			return new deltaJs.Delta.PutIntoFunction({ method: 'append', value: value });
		});
	
		/* composition - introducing 'PutIntoFunction' **************************************************/
		var d = _isUndefined$isDefined$t$define_d$oncePer$arraysEqual.define_d(deltaJs);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Modify', 'PutIntoFunction'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Add', 'PutIntoFunction'), d('Add', function (_ref) {
			var d2 = _ref.d2;
			var p1 = _ref.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Remove', 'PutIntoFunction'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Forbid', 'PutIntoFunction'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Replace', 'PutIntoFunction'), d('Replace', function (_ref2) {
			var d2 = _ref2.d2;
			var p1 = _ref2.p1;
			return d2.appliedTo(p1);
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('Update', 'PutIntoFunction'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Modify'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Add'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Remove'), d('Remove'));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Forbid'), false);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Replace'), d('Replace', function (_ref3) {
			var p2 = _ref3.p2;
			return p2;
		}));
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'Update'), true);
		deltaJs.newComposition(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'PutIntoFunction'), function (d1, d2) {
			return new deltaJs.Delta.PutIntoFunction([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
		});
	
		// TODO: Change 'append' and 'prepend' to follow any underlying partial order (delta model)
	
		/* equality */
		// TODO: refinement function instead of equals function (look at PutIntoArray.es6.js)
		deltaJs.newEquality(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'PutIntoFunction'), function (d1, d2) {
			return _isUndefined$isDefined$t$define_d$oncePer$arraysEqual.arraysEqual(d1.values, d2.values, function (a, b) {
				return a.method === b.method && a.value && b.value;
			});
		});
	
		/* weak commutation - allow two PutIntoFunction deltas to always commute in a weak context*/
		deltaJs.newCommutation(_isUndefined$isDefined$t$define_d$oncePer$arraysEqual.t('PutIntoFunction', 'PutIntoFunction'), function (d1, d2) {
			return true;
		}, { weak: true });
	});
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import external libraries */
	
	var _Graph = __webpack_require__(23);
	
	var _Graph2 = _interopRequireWildcard(_Graph);
	
	/* import internal stuff */
	
	var _extend$isDefined$indent$oncePer$s$t = __webpack_require__(3);
	
	var _Path = __webpack_require__(6);
	
	var _Path2 = _interopRequireWildcard(_Path);
	
	var _define_Modify = __webpack_require__(11);
	
	var _define_Modify2 = _interopRequireWildcard(_define_Modify);
	
	var _define_ContainerProxy = __webpack_require__(19);
	
	var _define_ContainerProxy2 = _interopRequireWildcard(_define_ContainerProxy);
	
	var _ApplicationOrderCycle$UnresolvedDeltaConflict = __webpack_require__(7);
	
	exports['default'] = _extend$isDefined$indent$oncePer$s$t.oncePer('DeltaModel', function (deltaJs) {
	
		_define_ContainerProxy2['default'](deltaJs);
	
		//noinspection JSUnusedLocalSymbols
		deltaJs.newOperationType('DeltaModel', (function (_deltaJs$Delta) {
			function DeltaModel() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, DeltaModel);
	
				_get(Object.getPrototypeOf(DeltaModel.prototype), 'constructor', this).apply(this, args);
				this.graph = new _Graph2['default']();
			}
	
			_inherits(DeltaModel, _deltaJs$Delta);
	
			_createClass(DeltaModel, [{
				key: 'clone',
				value: function clone() {
					var result = _get(Object.getPrototypeOf(DeltaModel.prototype), 'clone', this).call(this);
					result.graph = this.graph.clone(function (d) {
						return d.clone();
					});
					return result;
				}
			}, {
				key: '_assertNoUnresolvedConflicts',
				value: function _assertNoUnresolvedConflicts() {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.conflicts()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var conflictInfo = _step.value;
	
							if (conflictInfo.conflictResolvingDeltas.size === 0) {
								throw new _ApplicationOrderCycle$UnresolvedDeltaConflict.UnresolvedDeltaConflict(conflictInfo.conflictingDeltas);
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
			}, {
				key: 'precondition',
				value: function precondition(target, options) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;
	
					try {
						for (var _iterator2 = this.graph.vertices()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _step2$value = _slicedToArray(_step2.value, 2);
	
							var _name = _step2$value[0];
							var delta = _step2$value[1];
	
							if ([].concat(_toConsumableArray(this.graph.verticesTo(_name))).length === 0) {
								// source vertices
								var judgment = delta.evaluatePrecondition(target, options);
								if (judgment !== true) {
									return judgment;
								}
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2['return']) {
								_iterator2['return']();
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
				key: 'applyTo',
				value: function applyTo(target) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					/* throw an exception if there are unresolved conflicts */
					this._assertNoUnresolvedConflicts();
	
					/* no unresolved conflicts: apply the delta model */
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;
	
					try {
						for (var _iterator3 = this.graph.vertices_topologically()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var _step3$value = _slicedToArray(_step3.value, 2);
	
							var subDelta = _step3$value[1];
	
							subDelta.applyTo(target, _extend$isDefined$indent$oncePer$s$t.extend({}, options, { weak: true }));
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3['return']) {
								_iterator3['return']();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
			}, {
				key: 'toString',
				value: function toString() {
					var options = arguments[0] === undefined ? {} : arguments[0];
	
					var str = _get(Object.getPrototypeOf(DeltaModel.prototype), 'toString', this).call(this, options);
					if (this.graph.vertexCount() > 0) {
						var deltas = '';
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;
	
						try {
							for (var _iterator4 = this.graph.vertices_topologically()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var _step4$value = _slicedToArray(_step4.value, 2);
	
								var _name2 = _step4$value[0];
								var delta = _step4$value[1];
	
								deltas += '[' + _name2 + '] ' + delta.toString(options) + '\n';
							}
						} catch (err) {
							_didIteratorError4 = true;
							_iteratorError4 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion4 && _iterator4['return']) {
									_iterator4['return']();
								}
							} finally {
								if (_didIteratorError4) {
									throw _iteratorError4;
								}
							}
						}
	
						str += '\n' + _extend$isDefined$indent$oncePer$s$t.indent(deltas, 4);
					}
					return str;
				}
			}, {
				key: 'conflicts',
				value: function conflicts() {
					/* clone the graph */
					var g = this.graph.clone();
	
					/* source and sink keys */
					var sink = '(sink)';
					while (g.hasVertex(sink)) {
						sink = '' + sink + '\'';
					}
	
					/* create sink vertex, connect it to all other vertices */
					g.addNewVertex(sink, null);
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;
	
					try {
						for (var _iterator5 = g.vertices()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var _step5$value = _slicedToArray(_step5.value, 1);
	
							var _name3 = _step5$value[0];
	
							g.setVertex(_name3, null);
							if (_name3 !== sink) {
								g.ensureEdge(_name3, sink);
							}
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5['return']) {
								_iterator5['return']();
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5;
							}
						}
					}
	
					/* transitive reduction */
					g = g.transitiveReduction();
	
					/* find all pairs of 'incomparable' deltas, plus the closest deltas that are 'greater' than both */
					var resolutions = new Map(); // first -> second -> Set<possible-resolving-delta>
					var getResolutionsIn = (function (_getResolutionsIn) {
						function getResolutionsIn(_x) {
							return _getResolutionsIn.apply(this, arguments);
						}
	
						getResolutionsIn.toString = function () {
							return _getResolutionsIn.toString();
						};
	
						return getResolutionsIn;
					})(function (name) {
						if (g.vertexValue(name)) {
							return;
						}
						var ancestors = new Map(); // pred -> Set<ancestors-inc-pred>
						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;
	
						try {
							for (var _iterator6 = g.verticesTo(name)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var _step6$value = _slicedToArray(_step6.value, 1);
	
								var pred = _step6$value[0];
	
								getResolutionsIn(pred);
								var additionalAncestors = new Set([pred]);
								var _iteratorNormalCompletion8 = true;
								var _didIteratorError8 = false;
								var _iteratorError8 = undefined;
	
								try {
									for (var _iterator8 = g.vertexValue(pred).values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
										var ancSet = _step8.value;
										var _iteratorNormalCompletion9 = true;
										var _didIteratorError9 = false;
										var _iteratorError9 = undefined;
	
										try {
											for (var _iterator9 = ancSet.values()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
												var anc = _step9.value;
	
												additionalAncestors.add(anc);
											}
										} catch (err) {
											_didIteratorError9 = true;
											_iteratorError9 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion9 && _iterator9['return']) {
													_iterator9['return']();
												}
											} finally {
												if (_didIteratorError9) {
													throw _iteratorError9;
												}
											}
										}
									}
								} catch (err) {
									_didIteratorError8 = true;
									_iteratorError8 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion8 && _iterator8['return']) {
											_iterator8['return']();
										}
									} finally {
										if (_didIteratorError8) {
											throw _iteratorError8;
										}
									}
								}
	
								ancestors.set(pred, additionalAncestors);
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6['return']) {
									_iterator6['return']();
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6;
								}
							}
						}
	
						g.setVertex(name, ancestors);
						var _iteratorNormalCompletion7 = true;
						var _didIteratorError7 = false;
						var _iteratorError7 = undefined;
	
						try {
							for (var _iterator7 = ancestors.keys()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
								var pred1 = _step7.value;
								var _iteratorNormalCompletion10 = true;
								var _didIteratorError10 = false;
								var _iteratorError10 = undefined;
	
								try {
									for (var _iterator10 = ancestors.keys()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
										var pred2 = _step10.value;
	
										if (pred1 < pred2) {
											var ancs1 = new Set(ancestors.get(pred1));
											var ancs2 = new Set(ancestors.get(pred2));
											var _iteratorNormalCompletion11 = true;
											var _didIteratorError11 = false;
											var _iteratorError11 = undefined;
	
											try {
												for (var _iterator11 = ancs1[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
													var anc1 = _step11.value;
													var _iteratorNormalCompletion13 = true;
													var _didIteratorError13 = false;
													var _iteratorError13 = undefined;
	
													try {
														for (var _iterator13 = ancs2[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
															var anc2 = _step13.value;
	
															if (anc1 === anc2) {
																ancs1['delete'](anc1);
																ancs2['delete'](anc2);
															}
														}
													} catch (err) {
														_didIteratorError13 = true;
														_iteratorError13 = err;
													} finally {
														try {
															if (!_iteratorNormalCompletion13 && _iterator13['return']) {
																_iterator13['return']();
															}
														} finally {
															if (_didIteratorError13) {
																throw _iteratorError13;
															}
														}
													}
												}
											} catch (err) {
												_didIteratorError11 = true;
												_iteratorError11 = err;
											} finally {
												try {
													if (!_iteratorNormalCompletion11 && _iterator11['return']) {
														_iterator11['return']();
													}
												} finally {
													if (_didIteratorError11) {
														throw _iteratorError11;
													}
												}
											}
	
											var _iteratorNormalCompletion12 = true;
											var _didIteratorError12 = false;
											var _iteratorError12 = undefined;
	
											try {
												for (var _iterator12 = ancs1[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
													var anc1 = _step12.value;
													var _iteratorNormalCompletion14 = true;
													var _didIteratorError14 = false;
													var _iteratorError14 = undefined;
	
													try {
														for (var _iterator14 = ancs2[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
															var anc2 = _step14.value;
	
															_extend$isDefined$indent$oncePer$s$t.s.apply(undefined, [resolutions].concat(_toConsumableArray([anc1, anc2].sort()))).add(name);
														}
													} catch (err) {
														_didIteratorError14 = true;
														_iteratorError14 = err;
													} finally {
														try {
															if (!_iteratorNormalCompletion14 && _iterator14['return']) {
																_iterator14['return']();
															}
														} finally {
															if (_didIteratorError14) {
																throw _iteratorError14;
															}
														}
													}
												}
											} catch (err) {
												_didIteratorError12 = true;
												_iteratorError12 = err;
											} finally {
												try {
													if (!_iteratorNormalCompletion12 && _iterator12['return']) {
														_iterator12['return']();
													}
												} finally {
													if (_didIteratorError12) {
														throw _iteratorError12;
													}
												}
											}
										}
									}
								} catch (err) {
									_didIteratorError10 = true;
									_iteratorError10 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion10 && _iterator10['return']) {
											_iterator10['return']();
										}
									} finally {
										if (_didIteratorError10) {
											throw _iteratorError10;
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError7 = true;
							_iteratorError7 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion7 && _iterator7['return']) {
									_iterator7['return']();
								}
							} finally {
								if (_didIteratorError7) {
									throw _iteratorError7;
								}
							}
						}
					});
					getResolutionsIn(sink);
	
					/* out of the incomparable deltas, find those that are actually in conflict, and find any */
					var result = new Set();
					var _iteratorNormalCompletion15 = true;
					var _didIteratorError15 = false;
					var _iteratorError15 = undefined;
	
					try {
						for (var _iterator15 = resolutions.keys()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
							var first = _step15.value;
							var _iteratorNormalCompletion16 = true;
							var _didIteratorError16 = false;
							var _iteratorError16 = undefined;
	
							try {
								for (var _iterator16 = resolutions.get(first).keys()[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
									var second = _step16.value;
	
									var x = this.graph.vertexValue(first);
									var y = this.graph.vertexValue(second);
									if (!x.commutesWith(y, { weak: true })) {
										var conflictInfo = {
											conflictingDeltas: new Set([first, second]),
											conflictResolvingDeltas: new Set()
										};
										var _iteratorNormalCompletion17 = true;
										var _didIteratorError17 = false;
										var _iteratorError17 = undefined;
	
										try {
											for (var _iterator17 = resolutions.get(first).get(second)[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
												var nearestResolver = _step17.value;
	
												var _arr = [[nearestResolver]].concat(_toConsumableArray(g.verticesWithPathFrom(nearestResolver)));
	
												for (var _i = 0; _i < _arr.length; _i++) {
													var _arr$_i = _slicedToArray(_arr[_i], 1);
	
													var resolver = _arr$_i[0];
	
													var z = this.graph.vertexValue(resolver);
													if (resolver !== sink && z.resolves(x, y, { weak: true })) {
														conflictInfo.conflictResolvingDeltas.add(resolver);
													}
												}
											}
										} catch (err) {
											_didIteratorError17 = true;
											_iteratorError17 = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion17 && _iterator17['return']) {
													_iterator17['return']();
												}
											} finally {
												if (_didIteratorError17) {
													throw _iteratorError17;
												}
											}
										}
	
										result.add(conflictInfo);
									}
								}
							} catch (err) {
								_didIteratorError16 = true;
								_iteratorError16 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion16 && _iterator16['return']) {
										_iterator16['return']();
									}
								} finally {
									if (_didIteratorError16) {
										throw _iteratorError16;
									}
								}
							}
						}
					} catch (err) {
						_didIteratorError15 = true;
						_iteratorError15 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion15 && _iterator15['return']) {
								_iterator15['return']();
							}
						} finally {
							if (_didIteratorError15) {
								throw _iteratorError15;
							}
						}
					}
	
					/* return the conflict results */
					return result;
				}
			}]);
	
			return DeltaModel;
		})(deltaJs.Delta), (function (_deltaJs$ContainerProxy) {
			function DeltaModelProxy() {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}
	
				_classCallCheck(this, DeltaModelProxy);
	
				_get(Object.getPrototypeOf(DeltaModelProxy.prototype), 'constructor', this).apply(this, args);
				this._childOptions = new Map(); // key -> options
				this._childApplicationConditions = new Map(); // key -> application-condition
			}
	
			_inherits(DeltaModelProxy, _deltaJs$ContainerProxy);
	
			_createClass(DeltaModelProxy, [{
				key: 'processProxyArguments',
	
				/**
	    * @public
	    * @method
	    * @param rawArgs {*[]}
	    * @return {?{ options: Object, args: *[] }}
	    */
				value: function processProxyArguments() {
					for (var _len3 = arguments.length, rawArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
						rawArgs[_key3] = arguments[_key3];
					}
	
					// rawArgs is parsed as (...options, name, ...options, path, ...args),
					// though name and/or path may also be passed as options directly
					var options = {};
					do {
						if (rawArgs.length === 0) {
							throw new Error('The argument list for this Modify.DeltaModel method is insufficient.');
						}
						var arg = rawArgs.shift();
						if (typeof arg === 'string') {
							if (!options.name) {
								options.name = arg;
							} else {
								options.path = arg;
							}
						} else {
							_extend$isDefined$indent$oncePer$s$t.extend(options, arg);
						}
					} while (!options.path || !options.name);
					return { options: options, args: rawArgs };
				}
			}, {
				key: 'addOperation',
	
				/**
	    * @public
	    * @method
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
							appCond = deltaJs.newFeature('delta__' + name, _extend$isDefined$indent$oncePer$s$t.extend({ hidden: true }, options));
						}
						if (_extend$isDefined$indent$oncePer$s$t.isDefined(options.resolves)) {
							appCond['if'](options.resolves);
							options = _extend$isDefined$indent$oncePer$s$t.extend({}, options, { feature: false });
						}
						if (_extend$isDefined$indent$oncePer$s$t.isDefined(options.requires)) {
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
						var newOptions = _extend$isDefined$indent$oncePer$s$t.extend({}, options, { name: undefined });
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
			}, {
				key: 'delta',
	
				/**
	    * Dynamically compute and return the delta belonging to this proxy.
	    * @public
	    * @method
	    * @return the delta belonging to this proxy
	    */
				value: function delta() {
					var result = _get(Object.getPrototypeOf(DeltaModelProxy.prototype), 'delta', this).call(this);
					result.graph.clear();
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = this.childKeys()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _name4 = _step18.value;
	
							var options = this._childOptions.get(_name4);
	
							/* delta in the graph */
							var delta = this.childDelta(_name4);
							result.graph.addVertex(_name4, delta);
	
							/* application order */
	
							var _arr2 = [].concat(_toConsumableArray(options.resolves || []), _toConsumableArray(options.after || []), _toConsumableArray(options.requires || []));
	
							for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
								var subName = _arr2[_i2];
								result.graph.createEdge(subName, _name4);
								var cycle = result.graph.cycle();
								if (cycle) {
									result.graph.removeExistingEdge(subName, _name4);
									throw new _ApplicationOrderCycle$UnresolvedDeltaConflict.ApplicationOrderCycle(cycle);
								}
							}
	
							/* application condition */
							if (options.feature || this._childApplicationConditions.get(_name4).conditional) {
								delta.applicationCondition = this._childApplicationConditions.get(_name4);
							}
						}
					} catch (err) {
						_didIteratorError18 = true;
						_iteratorError18 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion18 && _iterator18['return']) {
								_iterator18['return']();
							}
						} finally {
							if (_didIteratorError18) {
								throw _iteratorError18;
							}
						}
					}
	
					return result;
				}
			}]);
	
			return DeltaModelProxy;
		})(deltaJs.ContainerProxy));
	
		/* composition */
		// to compose delta models, we simply have one apply after the other
		// without any composability checks; in the future, this may become more clever
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.DeltaModel || d2 instanceof deltaJs.Delta.DeltaModel;
		}, true);
	
		/* equality */
		deltaJs.newEquality(_extend$isDefined$indent$oncePer$s$t.t('DeltaModel', 'DeltaModel'), function (d1, d2) {
			var g1 = d1.graph.transitiveReduction();
			var g2 = d2.graph.transitiveReduction();
			return g1.equals(g2, function (x, y) {
				return x.equals(y);
			});
		});
	});
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$a$assert$isUndefined$oncePer = __webpack_require__(3);
	
	var _ConstraintFailure = __webpack_require__(7);
	
	exports['default'] = _extend$a$assert$isUndefined$oncePer.oncePer('features', function (deltaJs) {
	
		_extend$a$assert$isUndefined$oncePer.oncePer(deltaJs.constructor, 'features', function () {
	
			_extend$a$assert$isUndefined$oncePer.extend(deltaJs.constructor.prototype, {
				/** {@public}{@method}
	    * @param name    {string}  - the name of the new feature
	    * @param options {object?} - the (optional) options for the new feature
	    * @return {DeltaJs#Feature} - the object representing the new feature
	    */
				newFeature: function newFeature(name) {
					var options = arguments[1] === undefined ? {} : arguments[1];
	
					/* sanity check*/
					_extend$a$assert$isUndefined$oncePer.assert(_extend$a$assert$isUndefined$oncePer.isUndefined(this.features[name]), 'A feature with the name \'' + name + '\' already exists.');
	
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
				_extend$a$assert$isUndefined$oncePer.a(_if, feature).push(_normalizeClause(disjunct));
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
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
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
				_extend$a$assert$isUndefined$oncePer.a(_onlyIf, feature).push(_normalizeClause(conjunct));
			}
		}
		function _addRequiredBy(feature, otherFeatures) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = _normalizeClause(otherFeatures)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var other = _step2.value;
	
					_addOnlyIf(other, feature);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2['return']) {
						_iterator2['return']();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
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
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = Object.keys(deltaJs.features)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var featureName = _step3.value;
	
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
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3['return']) {
							_iterator3['return']();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			} while (somethingChanged);
	
			/* computation of allowed features */
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;
	
			try {
				for (var _iterator4 = Object.keys(deltaJs.features)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var featureName = _step4.value;
	
					/* if there are 'onlyIf' conjuncts that are excluded, this feature is excluded */
					_allowed.set(featureName, (_onlyIf.get(featureName) || []).every(function (conj) {
						return conj.some(function (disj) {
							return _selected.get(disj);
						});
					}));
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4['return']) {
						_iterator4['return']();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
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
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;
	
				try {
					for (var _iterator5 = Object.keys(options)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var option = _step5.value;
	
						this.addOption(option, options[option]);
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5['return']) {
							_iterator5['return']();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}
			}
	
			_createClass(Feature, [{
				key: 'selected',
				get: function () {
					_settleConditions();
					if (_selected.get(this.name) && !_allowed.get(this.name)) {
						throw new _ConstraintFailure.ConstraintFailure(this);
					}
					return _selected.get(this.name);
				}
			}, {
				key: 'condition',
				get: function () {
					return _if.get(this.name);
				}
			}, {
				key: 'conditional',
				get: function () {
					return _extend$a$assert$isUndefined$oncePer.a(_if, this.name).length > 0;
				}
			}, {
				key: 'restricted',
				get: function () {
					return _extend$a$assert$isUndefined$oncePer.a(_onlyIf, this.name).length > 0;
				}
			}, {
				key: 'select',
				value: function select() {
					this['if'](true);
				}
			}]);
	
			return Feature;
		})();
	
		/* restrictions and connections */
		var FEATURE_CONNECTIONS = [['if', [_addIf]], // this selected by other
		['onlyIf', [_addOnlyIf]], // error if this but not other
		['selects', [_addSelects]], // other selected by this
		['requiredBy', [_addRequiredBy]], // error if other but not this
		['iff', [_addIf, _addOnlyIf]] // if and onlyIf
		];
		deltaJs.Feature.prototype.addOption = function (optionName, value) {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;
	
			try {
				for (var _iterator6 = FEATURE_CONNECTIONS[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var _step6$value = _slicedToArray(_step6.value, 2);
	
					var connectionName = _step6$value[0];
					var methods = _step6$value[1];
	
					if (optionName === connectionName) {
						var _iteratorNormalCompletion7 = true;
						var _didIteratorError7 = false;
						var _iteratorError7 = undefined;
	
						try {
							for (var _iterator7 = methods[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
								var method = _step7.value;
								method(this.name, value);
							}
						} catch (err) {
							_didIteratorError7 = true;
							_iteratorError7 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion7 && _iterator7['return']) {
									_iterator7['return']();
								}
							} finally {
								if (_didIteratorError7) {
									throw _iteratorError7;
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
					if (!_iteratorNormalCompletion6 && _iterator6['return']) {
						_iterator6['return']();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}
		};
		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;
	
		try {
			var _loop = function () {
				_step8$value = _slicedToArray(_step8.value, 1);
				var name = _step8$value[0];
	
				deltaJs.Feature.prototype[name] = function (value) {
					this.addOption(name, value);
				};
			};
	
			for (var _iterator8 = FEATURE_CONNECTIONS[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var _step8$value;
	
				_loop();
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8['return']) {
					_iterator8['return']();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}
	
		/* the features belonging to this DeltaJs instance */
		deltaJs.features = {}; // name -> Feature
	});
	module.exports = exports['default'];

	// change nothing

	// change nothing

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$oncePer = __webpack_require__(3);
	
	var _define_DeltaModel = __webpack_require__(15);
	
	var _define_DeltaModel2 = _interopRequireWildcard(_define_DeltaModel);
	
	exports['default'] = _extend$oncePer.oncePer('variation points', function (deltaJs) {
	
		_extend$oncePer.oncePer(deltaJs.constructor, 'variation points', function () {
	
			_define_DeltaModel2['default'](deltaJs);
	
			_extend$oncePer.extend(deltaJs.constructor.prototype, {
	
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
				'do': function _do() {
					var _deltaModelProxy;
	
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}
	
					return (_deltaModelProxy = this._deltaModelProxy)['do'].apply(_deltaModelProxy, [{ feature: true }].concat(args));
				}
	
			});
		});
	
		deltaJs._deltaModelProxy = new deltaJs.Delta.DeltaModel()['do']();
	});
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$isUndefined$oncePer = __webpack_require__(3);
	
	exports['default'] = _extend$isUndefined$oncePer.oncePer('application conditions', function (deltaJs) {
	
		_extend$isUndefined$oncePer.oncePer(deltaJs.constructor, 'application conditions', function () {
	
			_extend$isUndefined$oncePer.extend(deltaJs.constructor.prototype, {
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
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
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
	
		_extend$isUndefined$oncePer.extend(deltaJs.Delta.prototype, Object.defineProperties({}, {
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
					return _extend$isUndefined$oncePer.isUndefined(this.applicationCondition) || this.applicationCondition.selected;
				},
				configurable: true,
				enumerable: true
			}
		}));
	});
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$a$isUndefined$oncePer = __webpack_require__(3);
	
	var _Path = __webpack_require__(6);
	
	var _Path2 = _interopRequireWildcard(_Path);
	
	var _define_Overloaded = __webpack_require__(10);
	
	var _define_Overloaded2 = _interopRequireWildcard(_define_Overloaded);
	
	var _define_Proxy = __webpack_require__(22);
	
	var _define_Proxy2 = _interopRequireWildcard(_define_Proxy);
	
	var _MultipleActiveProxiesError = __webpack_require__(7);
	
	exports['default'] = _extend$a$isUndefined$oncePer.oncePer('ContainerProxy', function (deltaJs) {
	
		_define_Proxy2['default'](deltaJs);
	
		/* a Proxy class for container operation types like Modify and DeltaModel */
		deltaJs.ContainerProxy = (function (_deltaJs$Proxy) {
	
			// A Proxy instance exposes operation methods directly. Arguments
			// to those operations can be pre-supplied through the `do` method.
	
			function ContainerProxy() {
				var options = arguments[0] === undefined ? {} : arguments[0];
	
				_classCallCheck(this, ContainerProxy);
	
				_get(Object.getPrototypeOf(ContainerProxy.prototype), 'constructor', this).call(this, options);
				this._doArgs = [];
				this._original = this;
				this._children = new Map(); // key -> [proxies]
			}
	
			_inherits(ContainerProxy, _deltaJs$Proxy);
	
			_createClass(ContainerProxy, [{
				key: 'deactivate',
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
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
	
					_get(Object.getPrototypeOf(ContainerProxy.prototype), 'deactivate', this).call(this);
				}
			}, {
				key: 'addChildProxy',
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
			}, {
				key: 'childKeys',
				value: function childKeys() {
					return [].concat(_toConsumableArray(this._children.keys()));
				}
			}, {
				key: 'childProxies',
				// TODO: Is an iterable a good return value?
	
				value: function childProxies(key) {
					return _extend$a$isUndefined$oncePer.a(this._children, key);
				}
			}, {
				key: 'childProxy',
				value: function childProxy(key) {
					if (!this._children.has(key)) {
						this._children.set(key, []);
					}
					return this._children.get(key)[this._children.get(key).length - 1];
				}
			}, {
				key: 'childDelta',
				value: function childDelta(key) {
					var _deltaJs$Delta;
	
					var result = (_deltaJs$Delta = deltaJs.Delta).composed.apply(_deltaJs$Delta, _toConsumableArray(this.childProxies(key).map(function (proxy) {
						return proxy.delta();
					})));
					return result;
				}
			}, {
				key: 'do',
				value: function _do() {
					for (var _len = arguments.length, doArgs = Array(_len), _key = 0; _key < _len; _key++) {
						doArgs[_key] = arguments[_key];
					}
	
					/* is this proxy active? */
					if (!this.active) {
						throw new _MultipleActiveProxiesError.MultipleActiveProxiesError();
					}
	
					/* return a version of this Proxy with extra preloaded args */
					// note that this mixes prototypical inheritance
					// into the existing classical inheritance scheme
					var result = Object.create(this);
					result._doArgs = [].concat(_toConsumableArray(this._doArgs), doArgs);
					result._original = this._original;
					return result;
				}
			}, {
				key: '_do',
	
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
				value: function _do(method, doArgs) {
					/* is this proxy active? */
					if (!this.active) {
						throw new _MultipleActiveProxiesError.MultipleActiveProxiesError();
					}
	
					/* container-specific processing of arguments */
	
					var _processProxyArguments$apply = this.processProxyArguments.apply(this, _toConsumableArray(this._doArgs).concat(_toConsumableArray(doArgs)));
	
					var options = _processProxyArguments$apply.options;
					var args = _processProxyArguments$apply.args;
	
					/* if the options contain a path, reify it */
					if (typeof options.path === 'string') {
						options.path = new _Path2['default'](options.path);
					}
	
					/* the argument list is finished; create a new delta and put it in the right place */
					var delta = deltaJs.ContainerProxy._newDeltaByMethod(method, args);
					var proxy = this.addOperation(delta, options);
	
					/* return the right Proxy instance for chaining */
					return proxy instanceof deltaJs.ContainerProxy ? proxy : this;
				}
			}, {
				key: 'processProxyArguments',
	
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
					throw new Error('A \'ContainerProxy\' subclass needs to implement the \'processProxyArguments\' method.');
				}
			}, {
				key: 'addOperation',
	
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
					throw new Error('A \'ContainerProxy\' subclass needs to implement the \'addOperation\' method.');
				}
			}], [{
				key: '_newDeltaByMethod',
	
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
						_define_Overloaded2['default'](deltaJs);
						return new deltaJs.Delta.Overloaded(newDeltas);
					}
				}
			}, {
				key: 'newProxyMethod',
	
				/** {@public}{@static}{@method}
	    * @param method  {string}   - method name
	    * @param handler {Function} - a function that takes method arguments, and returns a new `DeltaJs#Delta` instance
	    */
				value: function newProxyMethod(method, handler) {
	
					/* automatically populate the Proxy class with new operation method */
					if (_extend$a$isUndefined$oncePer.isUndefined(deltaJs.ContainerProxy.prototype[method])) {
						deltaJs.ContainerProxy.prototype[method] = function () {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
								args[_key2] = arguments[_key2];
							}
	
							return this._do(method, args);
						};
					}
	
					/* register handlers for each method */
					_extend$a$isUndefined$oncePer.a(deltaJs.ContainerProxy, '_methodHandlers', method).push(handler);
				}
			}]);
	
			return ContainerProxy;
		})(deltaJs.Proxy);
	});
	module.exports = exports['default'];

/***/ },
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _indent$oncePer$arraysEqual$t = __webpack_require__(3);
	
	exports['default'] = _indent$oncePer$arraysEqual$t.oncePer('Composed', function (deltaJs) {
	
		// NOTE: Not importing the circular dependency deltaJs.Delta here.
		//       That file will import this one at the proper time.
	
		deltaJs.newOperationType('Composed', (function (_deltaJs$Delta) {
			function Composed() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				_classCallCheck(this, Composed);
	
				_get(Object.getPrototypeOf(Composed.prototype), 'constructor', this).apply(this, args);
				this._components = this.arg || [];
				this.options = args[1] || {};
			}
	
			_inherits(Composed, _deltaJs$Delta);
	
			_createClass(Composed, [{
				key: 'clone',
				value: function clone() {
					var result = _get(Object.getPrototypeOf(Composed.prototype), 'clone', this).call(this);
					result._components = this._components.map(function (delta) {
						return delta.clone();
					});
					return result;
				}
			}, {
				key: 'applyTo',
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
							if (!_iteratorNormalCompletion && _iterator['return']) {
								_iterator['return']();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
			}, {
				key: 'toString',
	
				/**
	    * @public
	    * @method
	    * @param options {object?}
	    * @return {string}
	    */
				value: function toString() {
					var options = arguments[0] === undefined ? {} : arguments[0];
	
					var str = _get(Object.getPrototypeOf(Composed.prototype), 'toString', this).call(this, options);
					if (this._components.length > 0) {
						var deltas = '';
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;
	
						try {
							for (var _iterator2 = this._components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var delta = _step2.value;
	
								deltas += '• ' + delta.toString(options) + '\n';
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2['return']) {
									_iterator2['return']();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
	
						str += '\n' + _indent$oncePer$arraysEqual$t.indent(deltas, 4);
					}
					return str;
				}
			}, {
				key: 'precondition',
				value: function precondition(target, options) {
					if (this._components.length === 0) {
						return true;
					}
					return this._components[0].precondition(target, options);
				}
			}, {
				key: '_collapse',
				value: function _collapse() {
					var _this = this;
	
					/* flatten Composed that are inside Composed */
					this._components = (function () {
						var newComponents = [];
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;
	
						try {
							for (var _iterator3 = _this._components[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var delta = _step3.value;
	
								if (delta instanceof deltaJs.Delta.Composed) {
									delta._collapse();
									newComponents.push.apply(newComponents, _toConsumableArray(delta._components));
								} else {
									newComponents.push(delta);
								}
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3['return']) {
									_iterator3['return']();
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3;
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
								var composedPair = _this._components[i].composedWith(_this._components[i + 1], _this.options);
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
			}, {
				key: 'methods',
				get: function () {
					return [];
				}
			}]);
	
			return Composed;
		})(deltaJs.Delta));
	
		/* composition */
		deltaJs.newComposition(function (d1, d2) {
			return d1 instanceof deltaJs.Delta.Composed || d2 instanceof deltaJs.Delta.Composed;
		}, function (d1, d2, opt) {
			var D1 = d1 instanceof deltaJs.Delta.Composed ? d1._components : [d1];
			var D2 = d2 instanceof deltaJs.Delta.Composed ? d2._components : [d2];
			var result = new deltaJs.Delta.Composed([].concat(_toConsumableArray(D1), _toConsumableArray(D2)), opt);
			result._collapse();
			return result;
		});
	
		/* equality */
		deltaJs.newEquality(_indent$oncePer$arraysEqual$t.t('Composed', 'Composed'), function (d1, d2) {
			return _indent$oncePer$arraysEqual$t.arraysEqual(d1._components, d2._components, function (x, y) {
				return x.equals(y);
			});
		});
	});
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* import internal stuff */
	
	var _extend$oncePer = __webpack_require__(3);
	
	var _define_Delta = __webpack_require__(9);
	
	var _define_Delta2 = _interopRequireWildcard(_define_Delta);
	
	exports['default'] = _extend$oncePer.oncePer('Proxy', function (deltaJs) {
	
		_define_Delta2['default'](deltaJs);
	
		deltaJs.Proxy = (function () {
			function Proxy() {
				var _ref2 = arguments[0] === undefined ? {} : arguments[0];
	
				var parent = _ref2.parent;
				var delta = _ref2.delta;
	
				_classCallCheck(this, Proxy);
	
				this._parent = parent;
				this._active = true;
				this._delta = delta;
			}
	
			_createClass(Proxy, [{
				key: 'delta',
				value: function delta() {
					return this._delta;
				}
			}, {
				key: 'active',
				get: function () {
					return this._active;
				}
			}, {
				key: 'deactivate',
				value: function deactivate() {
					this._active = false;
				}
			}]);
	
			return Proxy;
		})();
	
		_extend$oncePer.extend(deltaJs.Delta.prototype, {
	
			/** {@public}{@method}
	   * @param args {*[]}
	   * @return {DeltaJs#Proxy}
	   */
			'do': function _do() {
				var _ref;
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				var ProxyClass = this.constructor.Proxy;
				if (!ProxyClass) {
					throw new Error('Calling \'do\' on delta type \'' + this.type + '\', which has no Proxy interface.');
				}
				return (_ref = new ProxyClass({ delta: this }))['do'].apply(_ref, args);
			}
	
		});
	});
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	"use strict";
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Graph class /////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @public
	 * @class Graph
	 * @classdesc The main class of this library, to be used for representing a mathematical (di)graph.
	 */
	
	var Graph = (function () {
		function Graph() {
			_classCallCheck(this, Graph);
	
			this._vertices = new Map(); // Map.< string, * >
			this._edges = new Map(); // Map.< string, Map.<string, *> >
			this._reverseEdges = new Map(); // Map.< string, Set.<*> >
			this._vertexCount = 0;
			this._edgeCount = 0;
		}
	
		_createClass(Graph, [{
			key: "addNewVertex",
	
			//////////////////////////////
			////////// Vertices //////////
			//////////////////////////////
	
			////////// creating them //////////
	
			/**
	   * Add a new vertex to this graph.
	   * @throws {Graph.VertexExistsError} if a vertex with this key already exists
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
	   */
			value: function addNewVertex(key, value) {
				if (this.hasVertex(key)) {
					throw new Graph.VertexExistsError(key, this._vertices.get(key));
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param  key    {string} the key belonging to the vertex
	   * @param [value] {*}      the value to store in this vertex
	   */
			value: function setVertex(key, value) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				this._vertices.set(key, value);
			}
		}, {
			key: "ensureVertex",
	
			/**
	   * Make sure a vertex with a specific key exists in this graph. If it already exists, nothing is done.
	   * If it does not yet exist, a new vertex is added with the given value.
	   * @param  key    {string} the key for the vertex
	   * @param [value] {*}      the value to store if a new vertex is added
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
	   * @param  key    {string} the key with which to refer to this new vertex
	   * @param [value] {*}      the value to store in this new vertex
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
	   * @param key {string} the key of the vertex to remove
	   */
			value: function removeExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
				}
				if (this._edges.get(key).size > 0 || this._reverseEdges.get(key).size > 0) {
					throw new Graph.HasConnectedEdgesError(key);
				}
				this._vertices["delete"](key);
				this._vertexCount -= 1;
			}
		}, {
			key: "destroyExistingVertex",
	
			/**
	   * Remove an existing vertex from this graph, as well as all edges connected to it.
	   * @throws {Graph.VertexNotExistsError} if a vertex with this key does not exist
	   * @param key {string} the key of the vertex to remove
	   */
			value: function destroyExistingVertex(key) {
				if (!this.hasVertex(key)) {
					throw new Graph.VertexNotExistsError(key);
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
	   * @throws {Graph.HasConnectedEdgesError} if there are still edges connected to this vertex
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
	   * Use {@link Graph#hasVertex} to distinguish these cases.
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
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function addNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
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
	   * @throws {Graph.EdgeExistsError} if an edge between `from` and `to` already exists
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
	   */
			value: function createNewEdge(from, to, value) {
				if (this.hasEdge(from, to)) {
					throw new Graph.EdgeExistsError(from, to, this.edgeValue(from, to));
				}
				this.ensureVertex(from);
				this.ensureVertex(to);
				this.addNewEdge(from, to, value);
			}
		}, {
			key: "setEdge",
	
			/**
	   * Set the value of an existing edge in this graph.
	   * @throws {Graph.EdgeNotExistsError} if an edge between `from` and `to` does not yet exist
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this edge
	   */
			value: function setEdge(from, to, value) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
				}
				this._edges.get(from).set(to, value);
			}
		}, {
			key: "spanEdge",
	
			/**
	   * Make sure an edge between the `from` and `to` vertices in this graph.
	   * If one already exists, nothing is done.
	   * If one does not yet exist, a new edge is added with the given value.
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
	   */
			value: function spanEdge(from, to, value) {
				if (!this.hasVertex(from)) {
					if (this.hasVertex(to)) {
						throw new Graph.VertexNotExistsError(from);
					} else {
						throw new Graph.VertexNotExistsError(from).v(to);
					}
				} else if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
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
	   * @throws {Graph.VertexNotExistsError} if the `from` and/or `to` vertices do not yet exist in the graph
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store in this new edge
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
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
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
	   * @param  from   {string} the key for the originating vertex
	   * @param  to     {string} the key for the terminating vertex
	   * @param [value] {*}      the value to store if a new edge is added
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
	   * @throws {Graph.EdgeNotExistsError} if an edge between the `from` and `to` vertices doesn't exist
	   * @param from {string} the key for the originating vertex
	   * @param to   {string} the key for the terminating vertex
	   */
			value: function removeExistingEdge(from, to) {
				if (!this.hasEdge(from, to)) {
					throw new Graph.EdgeNotExistsError(from, to);
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
	   * Use {@link Graph#hasEdge} to distinguish these cases.
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
	   * for (var it = graph.vertices(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices()) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#@@iterator}
	   */
			value: regeneratorRuntime.mark(function vertices() {
				var done, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, key, value;
	
				return regeneratorRuntime.wrap(function vertices$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion3 = true;
							_didIteratorError3 = false;
							_iteratorError3 = undefined;
							context$2$0.prev = 4;
							_iterator3 = this._vertices[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
								context$2$0.next = 17;
								break;
							}
	
							_step3$value = _slicedToArray(_step3.value, 2);
							key = _step3$value[0];
							value = _step3$value[1];
	
							if (!(this.hasVertex(key) && !done.has(key))) {
								context$2$0.next = 14;
								break;
							}
	
							done.add(key);
							context$2$0.next = 14;
							return [key, value];
	
						case 14:
							_iteratorNormalCompletion3 = true;
							context$2$0.next = 6;
							break;
	
						case 17:
							context$2$0.next = 23;
							break;
	
						case 19:
							context$2$0.prev = 19;
							context$2$0.t0 = context$2$0["catch"](4);
							_didIteratorError3 = true;
							_iteratorError3 = context$2$0.t0;
	
						case 23:
							context$2$0.prev = 23;
							context$2$0.prev = 24;
	
							if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
								_iterator3["return"]();
							}
	
						case 26:
							context$2$0.prev = 26;
	
							if (!_didIteratorError3) {
								context$2$0.next = 29;
								break;
							}
	
							throw _iteratorError3;
	
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
	   * A {@link Graph} object is itself {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol|iterable},
	   * and serves as a short notation in ECMAScript 6 to iterate over all vertices in the graph, in no particular order.
	   * @method Graph#@@iterator
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (let [key, value] of graph) {
	   *     // iterates over all vertices of the graph
	   * }
	   * @see {@link Graph#vertices}
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
	   * for (var it = graph.edges(), fromToVal = it.next(); !it.done;) {
	   *     var from  = fromToVal[0],
	   *         to    = fromToVal[1],
	   *         value = fromToVal[2];
	   *     // iterates over all edges of the graph
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, to, value] of graph.edges()) {
	   *     // iterates over all vertices of the graph
	   * }
	   */
			value: regeneratorRuntime.mark(function edges() {
				var done, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, from, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, to;
	
				return regeneratorRuntime.wrap(function edges$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Map();
							_iteratorNormalCompletion4 = true;
							_didIteratorError4 = false;
							_iteratorError4 = undefined;
							context$2$0.prev = 4;
							_iterator4 = this._edges.keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
								context$2$0.next = 40;
								break;
							}
	
							from = _step4.value;
	
							if (!done.has(from)) {
								done.set(from, new Set());
							}
							_iteratorNormalCompletion5 = true;
							_didIteratorError5 = false;
							_iteratorError5 = undefined;
							context$2$0.prev = 12;
							_iterator5 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 14:
							if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
								context$2$0.next = 23;
								break;
							}
	
							to = _step5.value;
	
							if (!(this.hasEdge(from, to) && !done.get(from).has(to))) {
								context$2$0.next = 20;
								break;
							}
	
							done.get(from).add(to);
							context$2$0.next = 20;
							return [from, to, this._edges.get(from).get(to)];
	
						case 20:
							_iteratorNormalCompletion5 = true;
							context$2$0.next = 14;
							break;
	
						case 23:
							context$2$0.next = 29;
							break;
	
						case 25:
							context$2$0.prev = 25;
							context$2$0.t1 = context$2$0["catch"](12);
							_didIteratorError5 = true;
							_iteratorError5 = context$2$0.t1;
	
						case 29:
							context$2$0.prev = 29;
							context$2$0.prev = 30;
	
							if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
								_iterator5["return"]();
							}
	
						case 32:
							context$2$0.prev = 32;
	
							if (!_didIteratorError5) {
								context$2$0.next = 35;
								break;
							}
	
							throw _iteratorError5;
	
						case 35:
							return context$2$0.finish(32);
	
						case 36:
							return context$2$0.finish(29);
	
						case 37:
							_iteratorNormalCompletion4 = true;
							context$2$0.next = 6;
							break;
	
						case 40:
							context$2$0.next = 46;
							break;
	
						case 42:
							context$2$0.prev = 42;
							context$2$0.t2 = context$2$0["catch"](4);
							_didIteratorError4 = true;
							_iteratorError4 = context$2$0.t2;
	
						case 46:
							context$2$0.prev = 46;
							context$2$0.prev = 47;
	
							if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
								_iterator4["return"]();
							}
	
						case 49:
							context$2$0.prev = 49;
	
							if (!_didIteratorError4) {
								context$2$0.next = 52;
								break;
							}
	
							throw _iteratorError4;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the outgoing edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesFrom(from), toVertexEdge = it.next(); !it.done;) {
	   *     var to          = toVertexEdge[0],
	   *         vertexValue = toVertexEdge[1],
	   *         edgeValue   = toVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [to, vertexValue, edgeValue] of graph.verticesFrom(from)) {
	   *     // iterates over all outgoing edges of the `from` vertex
	   * }
	   */
			value: function verticesFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesFrom(from);
			}
		}, {
			key: "_verticesFrom",
			value: regeneratorRuntime.mark(function _verticesFrom(from) {
				var done, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, to;
	
				return regeneratorRuntime.wrap(function _verticesFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							context$2$0.prev = 4;
							_iterator6 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step6.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 12;
							return [to, this._vertices.get(to), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion6 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t3 = context$2$0["catch"](4);
							_didIteratorError6 = true;
							_iteratorError6 = context$2$0.t3;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
								_iterator6["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError6) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError6;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the incoming edges from
	   * @returns { Iterator.<string, *, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesTo(to), fromVertexEdge = it.next(); !it.done;) {
	   *     var from        = fromVertexEdge[0],
	   *         vertexValue = fromVertexEdge[1],
	   *         edgeValue   = fromVertexEdge[2];
	   *     // iterates over all outgoing vertices of the `from` vertex
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [from, vertexValue, edgeValue] of graph.verticesTo(to)) {
	   *     // iterates over all incoming edges of the `to` vertex
	   * }
	   */
			value: function verticesTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesTo(to);
			}
		}, {
			key: "_verticesTo",
			value: regeneratorRuntime.mark(function _verticesTo(to) {
				var done, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, from;
	
				return regeneratorRuntime.wrap(function _verticesTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							done = new Set();
							_iteratorNormalCompletion7 = true;
							_didIteratorError7 = false;
							_iteratorError7 = undefined;
							context$2$0.prev = 4;
							_iterator7 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 6:
							if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step7.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 12;
							return [from, this._vertices.get(from), this._edges.get(from).get(to)];
	
						case 12:
							_iteratorNormalCompletion7 = true;
							context$2$0.next = 6;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t4 = context$2$0["catch"](4);
							_didIteratorError7 = true;
							_iteratorError7 = context$2$0.t4;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
								_iterator7["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError7) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError7;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `from` key does not exist
	   * @param from {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathFrom(from), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices reachable from `from`
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathFrom(from)) {
	   *     // iterates over all vertices reachable from `from`
	   * }
	   */
			value: function verticesWithPathFrom(from) {
				if (!this.hasVertex(from)) {
					throw new Graph.VertexNotExistsError(from);
				}
				return this._verticesWithPathFrom(from, new Set());
			}
		}, {
			key: "_verticesWithPathFrom",
			value: regeneratorRuntime.mark(function _verticesWithPathFrom(from, done) {
				var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, to;
	
				return regeneratorRuntime.wrap(function _verticesWithPathFrom$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion8 = true;
							_didIteratorError8 = false;
							_iteratorError8 = undefined;
							context$2$0.prev = 3;
							_iterator8 = this._edges.get(from).keys()[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							to = _step8.value;
	
							if (!(this.hasEdge(from, to) && !done.has(to))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(to);
							context$2$0.next = 11;
							return [to, this._vertices.get(to)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathFrom(to, done), "t5", 12);
	
						case 12:
							_iteratorNormalCompletion8 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t6 = context$2$0["catch"](3);
							_didIteratorError8 = true;
							_iteratorError8 = context$2$0.t6;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
								_iterator8["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError8) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError8;
	
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
	   * @throws {Graph.VertexNotExistsError} if a vertex with the given `to` key does not exist
	   * @param to {string} the key of the vertex to take the reachable vertices from
	   * @returns { Iterator.<string, *> } an object conforming to the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol|ES6 iterator protocol}
	   * @example
	   * for (var it = graph.verticesWithPathTo(to), keyValue = it.next(); !it.done;) {
	   *     var key   = keyValue[0],
	   *         value = keyValue[1];
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.verticesWithPathTo(to)) {
	   *     // iterates over all vertices from which `to` can be reached
	   * }
	   */
			value: function verticesWithPathTo(to) {
				if (!this.hasVertex(to)) {
					throw new Graph.VertexNotExistsError(to);
				}
				return this._verticesWithPathTo(to, new Set());
			}
		}, {
			key: "_verticesWithPathTo",
			value: regeneratorRuntime.mark(function _verticesWithPathTo(to, done) {
				var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, from;
	
				return regeneratorRuntime.wrap(function _verticesWithPathTo$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							_iteratorNormalCompletion9 = true;
							_didIteratorError9 = false;
							_iteratorError9 = undefined;
							context$2$0.prev = 3;
							_iterator9 = this._reverseEdges.get(to)[Symbol.iterator]();
	
						case 5:
							if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
								context$2$0.next = 15;
								break;
							}
	
							from = _step9.value;
	
							if (!(this.hasEdge(from, to) && !done.has(from))) {
								context$2$0.next = 12;
								break;
							}
	
							done.add(from);
							context$2$0.next = 11;
							return [from, this._vertices.get(from)];
	
						case 11:
							return context$2$0.delegateYield(this._verticesWithPathTo(from, done), "t7", 12);
	
						case 12:
							_iteratorNormalCompletion9 = true;
							context$2$0.next = 5;
							break;
	
						case 15:
							context$2$0.next = 21;
							break;
	
						case 17:
							context$2$0.prev = 17;
							context$2$0.t8 = context$2$0["catch"](3);
							_didIteratorError9 = true;
							_iteratorError9 = context$2$0.t8;
	
						case 21:
							context$2$0.prev = 21;
							context$2$0.prev = 22;
	
							if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
								_iterator9["return"]();
							}
	
						case 24:
							context$2$0.prev = 24;
	
							if (!_didIteratorError9) {
								context$2$0.next = 27;
								break;
							}
	
							throw _iteratorError9;
	
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
	   * for (var it = graph.vertices_topologically(), keyVal = it.next(); !it.done;) {
	   *     var key   = keyVal[0],
	   *         value = keyVal[1];
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   * @example
	   * // in ECMAScript 6, you can use a for..of loop
	   * for (let [key, value] of graph.vertices_topologically()) {
	   *     // iterates over all vertices of the graph in topological order
	   * }
	   */
			value: regeneratorRuntime.mark(function vertices_topologically() {
				var marked2$0, visited, handled, _this, visit, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _step11$value, a;
	
				return regeneratorRuntime.wrap(function vertices_topologically$(context$2$0) {
					while (1) switch (context$2$0.prev = context$2$0.next) {
						case 0:
							visit = function visit(a) {
								var i, cycle, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _step10$value, b;
	
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
											throw new Graph.CycleError(cycle);
	
										case 5:
											if (handled.has(a)) {
												context$3$0.next = 36;
												break;
											}
	
											_iteratorNormalCompletion10 = true;
											_didIteratorError10 = false;
											_iteratorError10 = undefined;
											context$3$0.prev = 9;
											_iterator10 = _this.verticesTo(a)[Symbol.iterator]();
	
										case 11:
											if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
												context$3$0.next = 18;
												break;
											}
	
											_step10$value = _slicedToArray(_step10.value, 1);
											b = _step10$value[0];
											return context$3$0.delegateYield(visit(b), "t9", 15);
	
										case 15:
											_iteratorNormalCompletion10 = true;
											context$3$0.next = 11;
											break;
	
										case 18:
											context$3$0.next = 24;
											break;
	
										case 20:
											context$3$0.prev = 20;
											context$3$0.t10 = context$3$0["catch"](9);
											_didIteratorError10 = true;
											_iteratorError10 = context$3$0.t10;
	
										case 24:
											context$3$0.prev = 24;
											context$3$0.prev = 25;
	
											if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
												_iterator10["return"]();
											}
	
										case 27:
											context$3$0.prev = 27;
	
											if (!_didIteratorError10) {
												context$3$0.next = 30;
												break;
											}
	
											throw _iteratorError10;
	
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
								}, marked2$0[0], this, [[9, 20, 24, 32], [25,, 27, 31]]);
							};
	
							marked2$0 = [visit].map(regeneratorRuntime.mark);
							visited = [];
							handled = new Set();
							_this = this;
							_iteratorNormalCompletion11 = true;
							_didIteratorError11 = false;
							_iteratorError11 = undefined;
							context$2$0.prev = 8;
							_iterator11 = this.vertices()[Symbol.iterator]();
	
						case 10:
							if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
								context$2$0.next = 18;
								break;
							}
	
							_step11$value = _slicedToArray(_step11.value, 1);
							a = _step11$value[0];
	
							if (handled.has(a)) {
								context$2$0.next = 15;
								break;
							}
	
							return context$2$0.delegateYield(visit(a), "t11", 15);
	
						case 15:
							_iteratorNormalCompletion11 = true;
							context$2$0.next = 10;
							break;
	
						case 18:
							context$2$0.next = 24;
							break;
	
						case 20:
							context$2$0.prev = 20;
							context$2$0.t12 = context$2$0["catch"](8);
							_didIteratorError11 = true;
							_iteratorError11 = context$2$0.t12;
	
						case 24:
							context$2$0.prev = 24;
							context$2$0.prev = 25;
	
							if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
								_iterator11["return"]();
							}
	
						case 27:
							context$2$0.prev = 27;
	
							if (!_didIteratorError11) {
								context$2$0.next = 30;
								break;
							}
	
							throw _iteratorError11;
	
						case 30:
							return context$2$0.finish(27);
	
						case 31:
							return context$2$0.finish(24);
	
						case 32:
						case "end":
							return context$2$0.stop();
					}
				}, vertices_topologically, this, [[8, 20, 24, 32], [25,, 27, 31]]);
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
				var _iteratorNormalCompletion12 = true;
				var _didIteratorError12 = false;
				var _iteratorError12 = undefined;
	
				try {
					for (var _iterator12 = this.edges()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
						var _step12$value = _slicedToArray(_step12.value, 2);
	
						var from = _step12$value[0];
						var to = _step12$value[1];
						this.removeEdge(from, to);
					}
				} catch (err) {
					_didIteratorError12 = true;
					_iteratorError12 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
							_iterator12["return"]();
						}
					} finally {
						if (_didIteratorError12) {
							throw _iteratorError12;
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
				var _iteratorNormalCompletion13 = true;
				var _didIteratorError13 = false;
				var _iteratorError13 = undefined;
	
				try {
					for (var _iterator13 = this.vertices()[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
						var _step13$value = _slicedToArray(_step13.value, 1);
	
						var v = _step13$value[0];
						this.destroyVertex(v);
					}
				} catch (err) {
					_didIteratorError13 = true;
					_iteratorError13 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
							_iterator13["return"]();
						}
					} finally {
						if (_didIteratorError13) {
							throw _iteratorError13;
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
	   * @param other {Graph} the other graph to compare this one to
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
	
				if (!(other instanceof Graph)) {
					return false;
				}
				if (this.vertexCount() !== other.vertexCount()) {
					return false;
				}
				if (this.edgeCount() !== other.edgeCount()) {
					return false;
				}
				var _iteratorNormalCompletion14 = true;
				var _didIteratorError14 = false;
				var _iteratorError14 = undefined;
	
				try {
					for (var _iterator14 = this.vertices()[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
						var _step14$value = _slicedToArray(_step14.value, 2);
	
						var key = _step14$value[0];
						var value = _step14$value[1];
	
						if (!other.hasVertex(key)) {
							return false;
						}
						if (!eq(value, other.vertexValue(key), key)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError14 = true;
					_iteratorError14 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
							_iterator14["return"]();
						}
					} finally {
						if (_didIteratorError14) {
							throw _iteratorError14;
						}
					}
				}
	
				var _iteratorNormalCompletion15 = true;
				var _didIteratorError15 = false;
				var _iteratorError15 = undefined;
	
				try {
					for (var _iterator15 = this.edges()[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
						var _step15$value = _slicedToArray(_step15.value, 3);
	
						var from = _step15$value[0];
						var to = _step15$value[1];
						var value = _step15$value[2];
	
						if (!other.hasEdge(from, to)) {
							return false;
						}
						if (!eq(value, other.edgeValue(from, to), from, to)) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError15 = true;
					_iteratorError15 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
							_iterator15["return"]();
						}
					} finally {
						if (_didIteratorError15) {
							throw _iteratorError15;
						}
					}
				}
	
				return true;
			}
		}, {
			key: "cycle",
	
			/**
	   * Find any directed cycle in this graph.
	   * @returns {?array} an array with the keys of a cycle in order;
	   *                   `null`, if there is no cycle
	   */
			value: function cycle() {
				var _this7 = this;
	
				var visited = []; // stack
				var handled = new Set();
	
				var visit = (function (_visit) {
					function visit(_x) {
						return _visit.apply(this, arguments);
					}
	
					visit.toString = function () {
						return _visit.toString();
					};
	
					return visit;
				})(function (a) {
					/* if a cycle is found, record it and return */
					var i = visited.indexOf(a);
					if (i >= 0) {
						return visited.slice(i);
					}
	
					/* if this vertex was already handled, no cycle can be found here */
					if (handled.has(a)) {
						return null;
					}
					handled.add(a);
	
					/* recursively visit successors to check for cycles */
					visited.push(a);
					var _iteratorNormalCompletion16 = true;
					var _didIteratorError16 = false;
					var _iteratorError16 = undefined;
	
					try {
						for (var _iterator16 = _this7.verticesFrom(a)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
							var _step16$value = _slicedToArray(_step16.value, 1);
	
							var b = _step16$value[0];
	
							var result = visit(b);
							if (result) {
								return result;
							}
						}
					} catch (err) {
						_didIteratorError16 = true;
						_iteratorError16 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
								_iterator16["return"]();
							}
						} finally {
							if (_didIteratorError16) {
								throw _iteratorError16;
							}
						}
					}
	
					visited.pop();
				});
	
				var _iteratorNormalCompletion17 = true;
				var _didIteratorError17 = false;
				var _iteratorError17 = undefined;
	
				try {
					for (var _iterator17 = this.vertices()[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
						var _step17$value = _slicedToArray(_step17.value, 1);
	
						var a = _step17$value[0];
	
						var result = visit(a);
						if (result) {
							return result;
						}
					}
				} catch (err) {
					_didIteratorError17 = true;
					_iteratorError17 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
							_iterator17["return"]();
						}
					} finally {
						if (_didIteratorError17) {
							throw _iteratorError17;
						}
					}
				}
	
				return null;
			}
		}, {
			key: "hasCycle",
	
			/**
	   * Test whether this graph contains a directed cycle.
	   * @returns {boolean} whether this graph contains a directed cycle
	   */
			value: function hasCycle() {
				return !!this.cycle();
			}
		}, {
			key: "path",
	
			/**
	   * Find any path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {?array} an array with the keys of the path found between the two vertices,
	   *                   including those two vertices themselves; `null` if no such path exists
	   */
			value: function path(from, to) {
				var _this8 = this;
	
				if (!this.hasVertex(from) || !this.hasVertex(to)) {
					return null;
				}
	
				var visited = [];
	
				/* recursive auxiliary function: find a path from 'current' to 'to' */
				var hasPathAux = (function (_hasPathAux) {
					function hasPathAux(_x2) {
						return _hasPathAux.apply(this, arguments);
					}
	
					hasPathAux.toString = function () {
						return _hasPathAux.toString();
					};
	
					return hasPathAux;
				})(function (current) {
					visited.push(current);
					if (_this8.hasEdge(current, to)) {
						return [].concat(visited, [to]);
					}
					var _iteratorNormalCompletion18 = true;
					var _didIteratorError18 = false;
					var _iteratorError18 = undefined;
	
					try {
						for (var _iterator18 = _this8.verticesFrom(current)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
							var _step18$value = _slicedToArray(_step18.value, 1);
	
							var next = _step18$value[0];
	
							if (visited.indexOf(next) === -1) {
								var result = hasPathAux(next);
								if (result) {
									return result;
								}
							}
						}
					} catch (err) {
						_didIteratorError18 = true;
						_iteratorError18 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
								_iterator18["return"]();
							}
						} finally {
							if (_didIteratorError18) {
								throw _iteratorError18;
							}
						}
					}
	
					visited.pop();
					return null;
				});
	
				return hasPathAux(from);
			}
		}, {
			key: "hasPath",
	
			/**
	   * Test whether there is a directed path between a given pair of keys.
	   * @param from {string} the originating vertex
	   * @param to   {string} the terminating vertex
	   * @returns {boolean} whether such a path exists
	   */
			value: function hasPath(from, to) {
				return !!this.path(from, to);
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
	   * @returns {Graph} a clone of this graph
	   */
			value: function clone() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = new Graph();
				var _iteratorNormalCompletion19 = true;
				var _didIteratorError19 = false;
				var _iteratorError19 = undefined;
	
				try {
					for (var _iterator19 = this.vertices()[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
						var _step19$value = _slicedToArray(_step19.value, 2);
	
						var key = _step19$value[0];
						var val = _step19$value[1];
	
						result.addVertex(key, tr(val, key));
					}
				} catch (err) {
					_didIteratorError19 = true;
					_iteratorError19 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
							_iterator19["return"]();
						}
					} finally {
						if (_didIteratorError19) {
							throw _iteratorError19;
						}
					}
				}
	
				var _iteratorNormalCompletion20 = true;
				var _didIteratorError20 = false;
				var _iteratorError20 = undefined;
	
				try {
					for (var _iterator20 = this.edges()[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
						var _step20$value = _slicedToArray(_step20.value, 3);
	
						var from = _step20$value[0];
						var to = _step20$value[1];
						var val = _step20$value[2];
	
						result.addEdge(from, to, tr(val, from, to));
					}
				} catch (err) {
					_didIteratorError20 = true;
					_iteratorError20 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
							_iterator20["return"]();
						}
					} finally {
						if (_didIteratorError20) {
							throw _iteratorError20;
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
	   * @returns {Graph} a clone of this graph
	   */
			value: function transitiveReduction() {
				var tr = arguments[0] === undefined ? function (v) {
					return v;
				} : arguments[0];
	
				var result = this.clone(tr);
				var _iteratorNormalCompletion21 = true;
				var _didIteratorError21 = false;
				var _iteratorError21 = undefined;
	
				try {
					for (var _iterator21 = this.vertices()[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
						var _step21$value = _slicedToArray(_step21.value, 1);
	
						var x = _step21$value[0];
						var _iteratorNormalCompletion22 = true;
						var _didIteratorError22 = false;
						var _iteratorError22 = undefined;
	
						try {
							for (var _iterator22 = this.vertices()[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
								var _step22$value = _slicedToArray(_step22.value, 1);
	
								var y = _step22$value[0];
	
								if (result.hasEdge(x, y)) {
									var _iteratorNormalCompletion23 = true;
									var _didIteratorError23 = false;
									var _iteratorError23 = undefined;
	
									try {
										for (var _iterator23 = this.vertices()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
											var _step23$value = _slicedToArray(_step23.value, 1);
	
											var z = _step23$value[0];
	
											if (result.hasPath(y, z)) {
												result.removeEdge(x, z);
											}
										}
									} catch (err) {
										_didIteratorError23 = true;
										_iteratorError23 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
												_iterator23["return"]();
											}
										} finally {
											if (_didIteratorError23) {
												throw _iteratorError23;
											}
										}
									}
								}
							}
						} catch (err) {
							_didIteratorError22 = true;
							_iteratorError22 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
									_iterator22["return"]();
								}
							} finally {
								if (_didIteratorError22) {
									throw _iteratorError22;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError21 = true;
					_iteratorError21 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
							_iterator21["return"]();
						}
					} finally {
						if (_didIteratorError21) {
							throw _iteratorError21;
						}
					}
				}
	
				return result;
			}
		}]);
	
		return Graph;
	})();
	
	exports["default"] = Graph;
	
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	//  // Errors //////////////////////////////////////////////////////////////////////////////////////
	//  ////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.VertexExistsError = (function (_Error) {
		function VertexExistsError(key, value) {
			_classCallCheck(this, VertexExistsError);
	
			var _this = new _Error();
	
			_this.__proto__ = VertexExistsError.prototype;
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexExistsError
	   * @instance
	   * @type {Set.<{ key: string, value }>}
	   */
			_this.vertices = new Set();
			_this.v(key, value);
			return _this;
		}
	
		_inherits(VertexExistsError, _Error);
	
		_createClass(VertexExistsError, [{
			key: "v",
			value: function v(key, value) {
				this.vertices.add({ key: key, value: value });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
				this.message = "This graph has " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
					return v.key;
				}).join("', '") + "'";
			}
		}]);
	
		return VertexExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific vertices are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.VertexNotExistsError = (function (_Error2) {
		function VertexNotExistError(key) {
			_classCallCheck(this, VertexNotExistError);
	
			var _this2 = new _Error2();
	
			_this2.__proto__ = VertexNotExistError.prototype;
	
			/**
	   * the set of relevant vertices
	   * @public
	   * @constant vertices
	   * @memberof Graph.VertexNotExistsError
	   * @instance
	   * @type {Set.<{ key: string }>}
	   */
			_this2.vertices = new Set();
			_this2.v(key);
			return _this2;
		}
	
		_inherits(VertexNotExistError, _Error2);
	
		_createClass(VertexNotExistError, [{
			key: "v",
			value: function v(key) {
				this.vertices.add({ key: key });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var aVertices = this.vertices.size === 1 ? "a vertex" : "vertices";
				this.message = "This graph does not have " + aVertices + " '" + [].concat(_toConsumableArray(this.vertices)).map(function (v) {
					return v.key;
				}).join("', '") + "'";
			}
		}]);
	
		return VertexNotExistError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected not to exist, but do.
	 * @extends Error
	 */
	Graph.EdgeExistsError = (function (_Error3) {
		function EdgeExistsError(from, to, value) {
			_classCallCheck(this, EdgeExistsError);
	
			var _this3 = new _Error3();
	
			_this3.__proto__ = EdgeExistsError.prototype;
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string, value }>}
	   */
			_this3.edges = new Set();
			_this3.e(from, to, value);
			return _this3;
		}
	
		_inherits(EdgeExistsError, _Error3);
	
		_createClass(EdgeExistsError, [{
			key: "e",
			value: function e(from, to, value) {
				this.edges.add({ from: from, to: to, value: value });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var edges = [];
				var _iteratorNormalCompletion24 = true;
				var _didIteratorError24 = false;
				var _iteratorError24 = undefined;
	
				try {
					for (var _iterator24 = this.edges[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
						var _step24$value = _step24.value;
						var from = _step24$value.from;
						var to = _step24$value.to;
	
						edges.push("('" + from + "', '" + to + "')");
					}
				} catch (err) {
					_didIteratorError24 = true;
					_iteratorError24 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
							_iterator24["return"]();
						}
					} finally {
						if (_didIteratorError24) {
							throw _iteratorError24;
						}
					}
				}
	
				var anEdges = edges.length === 1 ? "an edge" : "edges";
				this.message = "This graph has " + anEdges + " " + edges.join(", ");
			}
		}]);
	
		return EdgeExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when specific edges are expected to exist, but don't.
	 * @extends Error
	 */
	Graph.EdgeNotExistsError = (function (_Error4) {
		function EdgeNotExistsError(from, to) {
			_classCallCheck(this, EdgeNotExistsError);
	
			var _this4 = new _Error4();
	
			_this4.__proto__ = EdgeNotExistsError.prototype;
	
			/**
	   * the set of relevant edges
	   * @public
	   * @constant edges
	   * @memberof Graph.EdgeNotExistsError
	   * @instance
	   * @type {Set.<{ from: string, to: string }>}
	   */
			_this4.edges = new Set();
			_this4.e(from, to);
			return _this4;
		}
	
		_inherits(EdgeNotExistsError, _Error4);
	
		_createClass(EdgeNotExistsError, [{
			key: "e",
			value: function e(from, to) {
				this.edges.add({ from: from, to: to });
				this._refreshMessage();
				return this;
			}
		}, {
			key: "_refreshMessage",
			value: function _refreshMessage() {
				var edges = [];
				var _iteratorNormalCompletion25 = true;
				var _didIteratorError25 = false;
				var _iteratorError25 = undefined;
	
				try {
					for (var _iterator25 = this.edges[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
						var _step25$value = _step25.value;
						var from = _step25$value.from;
						var to = _step25$value.to;
	
						edges.push("('" + from + "', '" + to + "')");
					}
				} catch (err) {
					_didIteratorError25 = true;
					_iteratorError25 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
							_iterator25["return"]();
						}
					} finally {
						if (_didIteratorError25) {
							throw _iteratorError25;
						}
					}
				}
	
				var anEdges = edges.length === 1 ? "an edge" : "edges";
				this.message = "This graph does not have " + anEdges + " " + edges.join(", ");
			}
		}]);
	
		return EdgeNotExistsError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a vertex is expected not to have connected edges, but does.
	 * @extends Error
	 */
	Graph.HasConnectedEdgesError = (function (_Error5) {
		function HasConnectedEdgesError(key) {
			_classCallCheck(this, HasConnectedEdgesError);
	
			var _this5 = new _Error5();
	
			_this5.__proto__ = HasConnectedEdgesError.prototype;
	
			/**
	   * the key of the relevant vertex
	   * @public
	   * @constant key
	   * @memberof Graph.HasConnectedEdgesError
	   * @instance
	   * @type {string}
	   */
			_this5.key = key;
			_this5.message = "The '" + key + "' vertex has connected edges";
			return _this5;
		}
	
		_inherits(HasConnectedEdgesError, _Error5);
	
		return HasConnectedEdgesError;
	})(Error);
	
	/**
	 * @class
	 * @classdesc This type of error is thrown when a graph is expected not to have a directed cycle, but does.
	 * @extends Error
	 */
	Graph.CycleError = (function (_Error6) {
		function CycleError(cycle) {
			_classCallCheck(this, CycleError);
	
			var _this6 = new _Error6();
	
			_this6.__proto__ = CycleError.prototype;
	
			/**
	   * the vertices involved in the cycle
	   * @public
	   * @constant cycle
	   * @memberof Graph.CycleError
	   * @instance
	   * @type {Array.<string>}
	   */
			_this6.cycle = cycle;
			_this6.message = "This graph contains a cycle: " + cycle;
			return _this6;
		}
	
		_inherits(CycleError, _Error6);
	
		return CycleError;
	})(Error);
	module.exports = exports["default"];
	// stack

/***/ }
/******/ ])
});
;
//# sourceMappingURL=delta.js.map