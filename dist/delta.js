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
		},
	
		/* run a function only once per obj+string combo */
		oncePer: function oncePer(obj, key, fn) {
			var p = "_once per: " + key;
			if (obj[p]) {
				return;
			}
			obj[p] = true; // TODO: make non-enumeratable, or use ES6 Symbol
			return fn.call(obj, obj);
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
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var U = _interopRequire(__webpack_require__(1));
	
	var Path = (function () {
		function Path() {
			var str = arguments[0] === undefined ? "" : arguments[0];
	
			_classCallCheck(this, Path);
	
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
					if (U.isDefined(this.prop)) {
						result += this.prop;
						if (U.isDefined(this.rest)) {
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
	
	var U = _interopRequire(__webpack_require__(1));
	
	var _TargetJs = __webpack_require__(3);
	
	var ReadableTarget = _TargetJs.ReadableTarget;
	var wt = _TargetJs.wt;
	
	var defineApplicationConditions = _interopRequire(__webpack_require__(16));
	
	var _ErrorJs = __webpack_require__(5);
	
	var ApplicationError = _ErrorJs.ApplicationError;
	var CompositionError = _ErrorJs.CompositionError;
	
	module.exports = function (deltaJs) {
		U.oncePer(deltaJs, "Delta", function () {
	
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
		U.oncePer(deltaJs.constructor, "Delta", function () {
	
			U.extend(deltaJs.constructor.prototype, {
	
				/** {@public}{@method}
	    * @param precondition {(DeltaJs#Delta, DeltaJs#Delta) => Boolean} - can these deltas be composed this way?
	    * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
	    */
				newComposition: function newComposition(precondition, compose) {
					this.Delta.newComposition(precondition, compose);
				}
	
			});
		});
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
		return U.oncePer(deltaJs, "Overloaded", function () {
	
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
		return U.oncePer(deltaJs, "Modify", function () {
	
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
									U.extend(options, arg);
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
								var newOptions = U.extend({}, options, { path: path.rest });
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
		return U.oncePer(deltaJs, "basic operations", function () {
	
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
							return U.isUndefined(target.value);
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
							return target instanceof WritableTarget && U.isDefined(target.value);
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
			deltaJs.newComposition(t("Update", "Add"), true /* if Update leaves 'undefined'*/);
			deltaJs.newComposition(t("Update", "Remove"), d("Remove"));
			deltaJs.newComposition(t("Update", "Forbid"), true /* if Update leaves 'undefined'*/);
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
		return U.oncePer(deltaJs, "PutIntoArray", function () {
	
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
		return U.oncePer(deltaJs, "PutIntoFunction", function () {
	
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
		return U.oncePer(deltaJs, "DeltaModel", function () {
	
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
									U.extend(options, arg);
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
									appCond = deltaJs.newFeature("delta__" + name, U.extend({ hidden: true }, options));
								}
								if (U.isDefined(options.resolves)) {
									appCond["if"](options.resolves);
									options = U.extend({}, options, { feature: false });
								}
								if (U.isDefined(options.requires)) {
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
								var newOptions = U.extend({}, options, { name: undefined });
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
		U.oncePer(deltaJs, "features", function () {
	
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
		});
		U.oncePer(deltaJs.constructor, "features", function () {
	
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
		});
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
	
	var defineDeltaModel = _interopRequire(__webpack_require__(13));
	
	module.exports = function (deltaJs) {
		U.oncePer(deltaJs, "variation points", function () {
	
			defineDeltaModel(deltaJs);
	
			deltaJs._deltaModelProxy = new deltaJs.Delta.DeltaModel()["do"]();
		});
		U.oncePer(deltaJs.constructor, "variation points", function () {
	
			U.extend(deltaJs.constructor.prototype, {
	
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
		U.oncePer(deltaJs, "application conditions", function () {
	
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
		});
		U.oncePer(deltaJs.constructor, "application conditions", function () {
	
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
		});
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
		return U.oncePer(deltaJs, "Proxy", function () {
	
			defineDelta(deltaJs);
	
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
		});
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkOWM4ZjZlYWJhMmY5YjRkNjA1ZiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFB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QUFJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRTtJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzVFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLENBQXVCLENBQUM7OztBQUc1RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFtQixDQUFDO0FBQ3hFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBSyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQW1CLENBQUM7QUFDeEUsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBYSxDQUFDO0FBQ3hFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLENBQW1CLENBQUM7QUFDeEUsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtXQUFNLEVBQUU7SUFBQSxDQUFDLENBQUUsQ0FBQztBQUN4RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFtQixDQUFDO0FBQ3hFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQWEsQ0FBQzs7O0FBR3hFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFO0lBQUEsQ0FBQyxDQUFvQixDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFNO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFO0lBQUEsQ0FBQyxDQUFvQixDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFNBQVMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUssRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFFLEVBQUUsS0FBSyxDQUF5QyxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFO0lBQUEsQ0FBQyxDQUFvQixDQUFDOzs7QUFHaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU0sUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLElBQUksQ0FBMEMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRyxRQUFRLENBQUUsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLEtBQUssQ0FBSyxFQUFFLElBQUksbUNBQTBDLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsSUFBSSxtQ0FBMEMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxR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M0csVUFBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUcsVUFBQyxLQUFLO1dBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDO0lBQUEsQ0FBQyxDQUFDOzs7QUFJM0csVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQVcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxLQUFLLENBQXlDLENBQUM7QUFDMUcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFRLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQU8sY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQzFHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBUSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQTBDLENBQUM7QUFDMUcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBTyxFQUFFLEtBQUssQ0FBeUMsQ0FBQztBQUMxRyxVQUFPLENB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LEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQUcsT0FBSSxJQUFJLENBQUMsQ0FBQztLQUNuRDs7SUFFRCxDQUFDLENBQUM7R0FFSCxDQUFDO0VBQUEsQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkOWM4ZjZlYWJhMmY5YjRkNjA1ZlxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJ2YXIgVSA9IHtcblxuXHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqMTtcblx0fSxcblxuXHRkZWZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHRcdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdFx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdFx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHRcdHZhciBsYXN0ID0gVS5vKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHRcdH1cblx0XHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcblx0fSxcblxuXHRvKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywge30pIH0sXG5cblx0YShvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIFtdKSB9LFxuXG5cdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0fSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0Lyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cblx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0fSxcblxuXHQvKiBydW4gYSBmdW5jdGlvbiBvbmx5IG9uY2UgcGVyIG9iaitzdHJpbmcgY29tYm8gKi9cblx0b25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0XHR2YXIgcCA9IGBfb25jZSBwZXI6ICR7a2V5fWA7XG5cdFx0aWYgKG9ialtwXSkgeyByZXR1cm4gfVxuXHRcdG9ialtwXSA9IHRydWU7IC8vIFRPRE86IG1ha2Ugbm9uLWVudW1lcmF0YWJsZSwgb3IgdXNlIEVTNiBTeW1ib2xcblx0XHRyZXR1cm4gZm4uY2FsbChvYmosIG9iaik7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGEuanMnO1xuaW1wb3J0IGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgICAgIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQcm94eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Qcm94eS5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3N9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50c1xuICogYW5kIGFjdHMgYXMgYSBmYWNhZGUgKGFzIGluIGRlc2lnbiBwYXR0ZXJuKSB0byB0aGUgbW9yZSBzcGVjaWZpY1xuICogc3Vic3lzdGVtcyBvZiBkZWx0YS5qcy5cbiAqXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgRGVsdGFKcyBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhSnMge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVQcm94eSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICAgIHtzdHJpbmd9ICAgLSBuYW1lIG9mIHRoZSBuZXcgb3BlcmF0aW9uIHR5cGVcblx0ICogQHBhcmFtIERlbHRhQ2xhc3MgIHtGdW5jdGlvbn0gLSB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKiBAcGFyYW0gUHJveHlDbGFzcyB7P0Z1bmN0aW9ufSAtIHRoZSBvcHRpb25hbCBjdXN0b20gUHJveHkgc3ViY2xhc3MgZm9yIHRoaXMgb3BlcmF0aW9uLXR5cGVcblx0ICovXG5cdG5ld09wZXJhdGlvblR5cGUobmFtZSwgRGVsdGFDbGFzcywgUHJveHlDbGFzcykge1xuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9uIGNsYXNzZXMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh0aGlzLkRlbHRhW25hbWVdKSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0Lyogc3RvcmUgdGhlIG9wZXJhdGlvbiBjbGFzcyAqL1xuXHRcdHRoaXMuRGVsdGFbbmFtZV0gPSBEZWx0YUNsYXNzO1xuXG5cdFx0Lyogc2V0IHRoZSAob3B0aW9uYWwpIFByb3h5IGNsYXNzICovXG5cdFx0RGVsdGFDbGFzcy5Qcm94eSA9IFByb3h5Q2xhc3M7XG5cblx0XHQvKiBmZXRjaCB0aGUgZ2l2ZW4gYXBwbHlUbyBmdW5jdGlvbiAoaWYgYW55KSB3aGljaCB3aWxsIGJlIHNsaWdodGx5IG1vZGlmaWVkICovXG5cdFx0dmFyIGdpdmVuQXBwbHlUbyA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmFwcGx5VG8gfHwgKCgpPT57fSk7XG5cblx0XHQvKiBhdWdtZW50IHRoZSBjbGFzcyBwcm90b3R5cGUgKi9cblx0XHRVLmV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChEZWx0YUNsYXNzLnByb3RvdHlwZS5tZXRob2RzIHx8IFtsb3dlcmNhc2VOYW1lXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBEZWx0YUNsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIERlbHRhQ2xhc3M7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcik7XG5cdH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBSZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHRoaXMuX3ZhbCA9IHZhbHVlO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfSxcblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59KTtcblxuZXhwb3J0IHZhciBXcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdHRoaXMuX29iaiAgPSBvYmo7XG5cdHRoaXMuX3Byb3AgPSBwcm9wO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfSxcblx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cbn0pO1xuXG5SZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiBjaGFpbihwcm9wKSB7XG5cdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQodGhpcy52YWx1ZSwgcHJvcCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5leHBvcnQgZnVuY3Rpb24gcnQob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgUmVhZGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYXJnZXQuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuXG5cdGNvbnN0cnVjdG9yKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH1cblxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfVxuXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG59XG5cbi8vIFRPRE86IGltcGxlbWVudCB0aGF0IHRoZSBgLihpbnN0YW5jZSkuYCBtZW1iZXJzIGFyZSBhY3R1YWxseSBpbmNsdWRlZCBpbiBpbnN0YW5jZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhdGguanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHRcdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0XHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0XHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgQ29tcG9zaXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhMSwgZGVsdGEyKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29uc3RyYWludEZhaWx1cmUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZlYXR1cmUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHRcdHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZnJvbSwgdG8pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdFx0dGhpcy5mcm9tID0gZnJvbTtcblx0XHR0aGlzLnRvICAgPSB0bztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhcykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ1VucmVzb2x2ZWREZWx0YUNvbmZsaWN0Jztcblx0XHR2YXIgZGVsdGFOYW1lcyA9IGRlbHRhcy5tYXAoZCA9PiBgJyR7ZC5uYW1lfSdgKS5qb2luKCcsJyk7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHRcdHRoaXMuZGVsdGFzID0gZGVsdGFzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBPbmx5IG9uZSBQcm94eSBwZXIgcGF0aCBjYW4gYmUgYWN0aXZlIGF0IGFueSBnaXZlbiB0aW1lLmA7XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdFUub25jZVBlcihkZWx0YUpzLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRkZWx0YUpzLkRlbHRhID0gY2xhc3MgRGVsdGEge1xuXG5cdFx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRcdHRoaXMuaWQgPSArK0RlbHRhLl9uZXh0SUQ7XG5cdFx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0XHR9XG5cblx0XHRcdGdldCBhcmcoKSAgeyByZXR1cm4gdGhpcy5hcmdzWzBdIH1cblx0XHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcpIH1cblxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0XHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0XHRcdCAqL1xuXHRcdFx0ZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRcdGlmICh0aGlzLnByZWNvbmRpdGlvbikge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSAgdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0XHQgKi9cblx0XHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQodGhpcywgb3RoZXIpIH1cblxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdGlmIChvcHRpb25zLnRhcmdldFByb3ApICAgeyBzdHIgKz0gYCDigLkke29wdGlvbnMudGFyZ2V0UHJvcH3igLpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSB7Qm9vbGVhbnwoKERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGEpfSAtIGZhbHNlLCBvciBhIHNpZGUtZWZmZWN0IGZyZWUgZnVuY3Rpb25cblx0XHRcdCAqL1xuXHRcdFx0c3RhdGljIG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0XHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGRlbHRhcyB7W0RlbHRhSnMjRGVsdGFdfSAtIHRoZSBkZWx0YXMgdG8gY29tcG9zZVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0c3RhdGljIGNvbXBvc2VkKC4uLmRlbHRhcykge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRcdGRlbHRhcy5mb3JFYWNoKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdHZhciBkMSA9IHJlc3VsdCxcblx0XHRcdFx0XHQgICAgZDIgPSBkZWx0YSB8fCBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdFx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0XHRcdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IERlbHRhLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyogdGhyb3cgYW4gZXJyb3IgaWYgJ2ZhbHNlJyB3YXMgZm91bmQgcmF0aGVyIHRoYW4gYSBmdW5jdGlvbiovXG5cdFx0XHRcdFx0aWYgKGNvbXBvc2VGbiA9PT0gZmFsc2UgfHwgIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHRcdFx0XHQvKiAgaWYgbm8gY29tcG9zaXRpb24gZnVuY3Rpb24gaXMgZm91bmQsIHVzZSBhIGxpbmVhciBkZWx0YSBtb2RlbCAgKi9cblx0XHRcdFx0XHQvKiAgdG8gJ25haXZlbHknIGhhdmUgb25lIGRlbHRhIGFwcGx5IGFmdGVyIGFub3RoZXIgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0XHRpZiAoY29tcG9zZUZuID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRjb21wb3NlRm4gPSAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0Ly8gVE9ETzogbWFrZSBhIG5ldyBkZWRpY2F0ZWQgZGVsdGEgdHlwZSBmb3IgdGhpczsgRGVsdGFNb2RlbCBpcyBvdmVya2lsbFxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRcdFx0XHRyZXN1bHQgPSBjb21wb3NlRm4oZDEsIGQyKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblxuXG5cdFx0fTtcblx0XHRkZWx0YUpzLkRlbHRhLl9uZXh0SUQgPSAwO1xuXHRcdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cblx0fSk7XG5cdFUub25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHRcdFx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0XHRcdCAqL1xuXHRcdFx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRcdHRoaXMuRGVsdGEubmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ092ZXJsb2FkZWQnLCAoKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdPdmVybG9hZGVkJywgY2xhc3MgT3ZlcmxvYWRlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLm92ZXJsb2FkcyA9IHRoaXMuYXJnIHx8IFtdO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5ldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHxcblx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWRcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVQcm94eSBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdNb2RpZnknLCAoKSA9PiB7XG5cblx0ZGVmaW5lUHJveHkoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdNb2RpZnknLCBjbGFzcyBNb2RpZnkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdFUuZXh0ZW5kKHRoaXMuc3ViRGVsdGFzLCB0aGlzLmFyZyB8fCB7fSk7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLnN1YkRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGlmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0XHR0aGlzLnN1YkRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0XG5cdFx0XHRcdFx0XHQua2V5cyh0aGlzLnN1YkRlbHRhcylcblx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuc3ViRGVsdGFzW3BdLnRvU3RyaW5nKFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHRhcmdldFByb3A6IHAgfSkpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblxuXHR9LCBjbGFzcyBNb2RpZnlQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBhbiBvcHRpb24gZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5Qcm94eSBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7IG9wdGlvbnMucGF0aCA9IGFyZyAgICAgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIHsgVS5leHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghb3B0aW9ucy5wYXRoKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIGRlZXBlc3QgcHJveHkgY3JlYXRlZCBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXHRcdFx0aWYgKCFwYXRoLnByb3ApIHsgdGhyb3cgbmV3IEVycm9yKCdPcGVyYXRpb25zIG9uIGEgTW9kaWZ5LlByb3h5IG5lZWQgdG8gaGF2ZSBhIG5vbi1lbXB0eSBwYXRoLicpIH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogcGF0aC5yZXN0IH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOT1RFOiBNb2RpZnkgb3BlcmF0aW9ucyBkbyBub3QgKHlldCkgdXNlIGFueSBvcHRpb25zXG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzID0ge307XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuY2hpbGREZWx0YShwcm9wKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IGRlbHRhSnMuRGVsdGEuY29tcG9zZWQocmVzdWx0LnN1YkRlbHRhc1twcm9wXSwgZDIuc3ViRGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufSk7XG5cblxuLy8vKioge0BwdWJsaWN9e0BtZXRob2R9IC8vIFRPRE86IHJlcGxhY2UgYWxsIHRoaXMgdGhyb3VnaCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBhbnkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuLy8gKiBAcGFyYW0gYXJncyB7WypdfSAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgLi4uYXJncykge1xuLy9cdHZhciBhcmdzcyA9IFsuLi5hcmd1bWVudHNdO1xuLy9cdHZhciBhbGxPcHRpb25zID0ge307XG4vL1x0d2hpbGUgKHR5cGVvZiBhcmdzc1swXSA9PT0gJ29iamVjdCcpIHtcbi8vXHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3NzLnNoaWZ0KCkpO1xuLy9cdH1cbi8vXHRwYXRoID0gYXJnc3Muc2hpZnQoKTtcbi8vXHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIC4uLmFyZ3NzKTtcbi8vXHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG4vL31cbi8vLyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cbi8vICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cbi8vICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG4vLyAqL1xuLy9fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG4vL1x0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG4vL1x0aWYgKHBhdGgucmVzdCkge1xuLy9cdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKHsgbWV0aG9kOiAnbW9kaWZ5JyB9LCBwYXRoLnByb3ApXG4vL1x0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuLy9cdH1cbi8vXG4vL1x0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cbi8vXHR0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuLy9cbi8vXHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG4vL1x0cmV0dXJuICh0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuLy99XG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfVxuLy8gKiBHZXQgdGhlIGRlZXBlc3QgZXhpc3RpbmcgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gYSByZWxhdGl2ZSBwYXRoLlxuLy8gKiBAcGFyYW0gcGF0aCB7UGF0aH0gLSBhIHBhdGggcmVsYXRpdmUgdG8gdGhpcyBkZWx0YVxuLy8gKiBAcmV0dXJuIHt7IGRlbHRhOiBEZWx0YUpzI0RlbHRhLk1vZGlmeSwgcmVzdDogUGF0aCB9fSAtIHRoZSBkZWVwZXN0IE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXRoLFxuLy8gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgdW51c2VkIHJlc3Qgb2YgdGhlIHBhdGhcbi8vICovXG4vL2RlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoKSB7IC8vIFRPRE86IG5vdCBuZWVkZWQgYW55bW9yZSwgcmlnaHQ/XG4vL1x0aWYgKFUuaXNVbmRlZmluZWQocGF0aC5wcm9wKSB8fCB0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdLnR5cGUgIT09ICdNb2RpZnknKSB7XG4vL1x0XHRyZXR1cm4geyBkZWx0YTogdGhpcywgcmVzdDogcGF0aCB9O1xuLy9cdH1cbi8vXHRyZXR1cm4gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXS5kZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aC5yZXN0IHx8IG5ldyBQYXRoKCkpO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnYmFzaWMgb3BlcmF0aW9ucycsICgpID0+IHtcblxuXHRkZWZpbmVEZWx0YSAoZGVsdGFKcyk7XG5cdGRlZmluZU1vZGlmeShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnLCBjbGFzcyBOb09wIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywgY2xhc3MgQWRkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIGNsYXNzIEZvcmJpZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCBjbGFzcyBSZXBsYWNlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdVcGRhdGUnLCBjbGFzcyBVcGRhdGUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTm9PcCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIGQoJ0FkZCcsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ0FkZCcpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdBZGQnICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnTW9kaWZ5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdGb3JiaWQnKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnRm9yYmlkJyksIGZhbHNlICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdNb2RpZnknKSwgZmFsc2UgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ1JlbW92ZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJyAsICdSZXBsYWNlJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgLCAnUmVwbGFjZScpLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdBZGQnICAgICksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ0ZvcmJpZCcgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnVXBkYXRlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnVXBkYXRlJyApLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICwgJ1VwZGF0ZScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJyAsICdVcGRhdGUnICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnVXBkYXRlJyApLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ01vZGlmeScgKSwgdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdBZGQnICAgICksIHRydWUgICAgLyogaWYgVXBkYXRlIGxlYXZlcyAndW5kZWZpbmVkJyovICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ0ZvcmJpZCcgKSwgdHJ1ZSAgICAvKiBpZiBVcGRhdGUgbGVhdmVzICd1bmRlZmluZWQnKi8gICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnVXBkYXRlJyApLCBkKCdVcGRhdGUnLCAgKHtwMSwgcDJ9KSA9PiB2ID0+IHAyKHAxKHYpKSkgICApO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdQdXRJbnRvQXJyYXknLCAoKSA9PiB7XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXHRkZWZpbmVQcm94eSAgICAgICAgICAoZGVsdGFKcyk7XG5cblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIGNsYXNzIFB1dEludG9BcnJheSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAsICdQdXRJbnRvQXJyYXknKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICwgJ1B1dEludG9BcnJheScpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgLCAnUHV0SW50b0FycmF5JyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdNb2RpZnknICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ0FkZCcgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVtb3ZlJyAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdGb3JiaWQnICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlcGxhY2UnICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnVXBkYXRlJyAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSk7XG5cdH0pO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdQdXRJbnRvRnVuY3Rpb24nLCAoKSA9PiB7XG5cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZVByb3h5ICAgICAgICAgIChkZWx0YUpzKTtcblxuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCBjbGFzcyBQdXRJbnRvRnVuY3Rpb24gZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdNb2RpZnknICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ0FkZCcgICAgICAgICAgICApLCBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdGb3JiaWQnICAgICAgICAgKSwgZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnVXBkYXRlJyAgICAgICAgICksIHRydWUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSk7XG5cdH0pO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdEZWx0YU1vZGVsJywgKCkgPT4ge1xuXG5cdGRlZmluZU1vZGlmeShkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGNsYXNzIERlbHRhTW9kZWwgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0sIGNsYXNzIERlbHRhTW9kZWxQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnMtb2YtZmlyc3Qtb2NjdXJyZW5jZVxuXHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnMgPSB7fTsgLy8ga2V5IC0+IGFwcGxpY2F0aW9uLWNvbmRpdGlvblxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBuYW1lLCAuLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBuYW1lIGFuZC9vciBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBvcHRpb25zIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuRGVsdGFNb2RlbCBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm5hbWUpIHsgb3B0aW9ucy5uYW1lID0gYXJnICAgICB9XG5cdFx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgICB9XG5cdFx0XHRcdH0gZWxzZSAgICAgICAgICAgICAgICAgeyBVLmV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGggfHwgIW9wdGlvbnMubmFtZSk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aCwgbmFtZSwgZmVhdHVyZX0gPSBvcHRpb25zO1xuXG5cdFx0XHQvKiBjcmVhdGUgYXBwbGljYXRpb24gY29uZGl0aW9uIGFuZCBvcHRpb25hbCBlcG9ueW1vdXMgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdGlmICghdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0pIHtcblx0XHRcdFx0bGV0IGFwcENvbmQ7XG5cdFx0XHRcdGlmIChmZWF0dXJlKSB7IGFwcENvbmQgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0XHRvcHRpb25zID0gVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgZmVhdHVyZTogZmFsc2UgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmZWF0dXJlIHx8IGFwcENvbmQuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFwcENvbmQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0gPSBhcHBDb25kO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBuYW1lOiB1bmRlZmluZWQgfSk7XG5cdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgb3B0aW9ucyAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0pIHtcblx0XHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zW25hbWVdID0gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0LyogcmV0dXJuIHRoZSBkZWVwZXN0IGNyZWF0ZWQgcHJveHkgKi9cblx0XHRcdHJldHVybiBkZWVwZXN0UHJveHk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguY2xlYXIoKTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvKiBkZWx0YSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFx0dmFyIGRlbHRhID0gdGhpcy5jaGlsZERlbHRhKG5hbWUpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhKTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBvcmRlciAqL1xuXHRcdFx0XHRbIC4uLm9wdGlvbnNbJ3Jlc29sdmVzJ118fFtdLCAuLi5vcHRpb25zWydhZnRlciddfHxbXSwgLi4ub3B0aW9uc1sncmVxdWlyZXMnXXx8W10gXS5mb3JFYWNoKChzdWJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmNyZWF0ZUVkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5ncmFwaC5oYXNDeWNsZSgpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEFwcGxpY2F0aW9uT3JkZXJDeWNsZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlIHx8IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsXG5cdCksIHRydWUpO1xuXG59KTtcblxuXG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfSAvLyBUT0RPOiByZWRvIHRoaXMgc3R1ZmYgd2l0aCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG4vLyAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuLy8gKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cbi8vICogQHBhcmFtIGFyZ3Mge1sqXX0gICAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCAuLi5hcmdzKSB7XG4vL1x0dmFyIGFyZ3NzID0gWy4uLmFyZ3VtZW50c107XG4vL1x0dmFyIGFsbE9wdGlvbnMgPSB7fTtcbi8vXHR3aGlsZSAodHlwZW9mIGFyZ3NzWzBdID09PSAnb2JqZWN0Jykge1xuLy9cdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJnc3Muc2hpZnQoKSk7XG4vL1x0fVxuLy9cdG5hbWUgPSBhcmdzcy5zaGlmdCgpO1xuLy9cdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG4vL1x0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcbi8vXHR9XG4vL1x0cGF0aCA9IGFyZ3NzLnNoaWZ0KCk7XG4vL1x0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCAuLi5hcmdzcyk7XG4vL1x0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuLy99XG4vL1xuLy9cbi8vX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuLy9cdHZhciBkZWx0YUJhc2U7XG4vL1xuLy9cdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cbi8vXHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG4vL1xuLy9cbi8vXG4vL1x0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpICYmIGV4aXN0aW5nRGVsdGEudHlwZSA9PT0gJ01vZGlmeScgJiYgVS5pc0RlZmluZWQocGF0aC5yZXN0KSkge1xuLy9cdFx0cmV0dXJuIGV4aXN0aW5nRGVsdGEuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cbi8vXHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cbi8vXHRpZiAocGF0aC5wcm9wKSB7XG4vL1x0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcbi8vXHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuLy9cdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSkge1xuLy9cdFx0ZGVsdGFCYXNlID0gZXhpc3RpbmdEZWx0YS5jb21wb3NlZFdpdGgoZGVsdGFCYXNlKTtcbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuLy9cdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcbi8vXHRcdHRoaXMuZ3JhcGguc2V0VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1x0fSBlbHNlIHtcbi8vXG4vL1x0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcbi8vXHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1xuLy9cdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuLy9cdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG4vL1x0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuLy9cdFx0XHRpZiAodGhpcy5ncmFwaC5oYXNDeWNsZSgpKSB7XG4vL1x0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcbi8vXHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG4vL1x0XHRcdH1cbi8vXHRcdH0pO1xuLy9cbi8vXHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuLy9cdFx0dmFyIGRlbHRhRmVhdHVyZTtcbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUpIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cbi8vXHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG4vL1x0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGRlbHRhRmVhdHVyZTtcbi8vXHRcdH1cbi8vXG4vL1x0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG4vL1x0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcbi8vXHRcdFx0ZGVsdGFGZWF0dXJlLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuLy9cdFx0fVxuLy9cbi8vXHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuLy9cdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG4vL1x0XHRcdGRlbHRhRmVhdHVyZS5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuLy9cdFx0fVxuLy9cdH1cbi8vXG4vL1x0cmV0dXJuIGRlbHRhO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0VS5vbmNlUGVyKGRlbHRhSnMsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdFx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdFx0cmV0dXJuIGlucHV0O1xuXHRcdH1cblxuXG5cdFx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0XHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHRcdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdFx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXHRcdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0XHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0XHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdFx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0XHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdGRvIHtcblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0XHR9KTtcblxuXHRcdH0sIHtcblx0XHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdFx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHMsIF9hZGRPbmx5SWZdICAgICAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRcdF07XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRcdGlmIChuYW1lID09PSBuKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHRcdH07XG5cdFx0fSk7XG5cblxuXHRcdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdFx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXHR9KTtcblx0VS5vbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0VS5vbmNlUGVyKGRlbHRhSnMsICd2YXJpYXRpb24gcG9pbnRzJywgKCkgPT4ge1xuXG5cdFx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHRcdGRlbHRhSnMuX2RlbHRhTW9kZWxQcm94eSA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKS5kbygpO1xuXG5cdH0pO1xuXHRVLm9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ3ZhcmlhdGlvbiBwb2ludHMnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHRcdCAqL1xuXHRcdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0XHR0aGlzLl9kZWx0YU1vZGVsUHJveHkuZGVsdGEoKS5hcHBseVRvKHJvb3QsIHtcblx0XHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgcHJveHkgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIHByb3h5IHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbFByb3h5LmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRVLm9uY2VQZXIoZGVsdGFKcywgJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0XHRyZXR1cm4gVS5pc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG5cdFUub25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnYXBwbGljYXRpb24gY29uZGl0aW9ucycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IHtNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbi8vIFRPRE86IEJha2UgaW4gZGVsdGEgbW9kZWwgZnVuY3Rpb25hbGl0eVxuLy8gRE9ORTogJ29uZSBQcm94eSBhY3RpdmUgYXQgYSB0aW1lJyAoY2Fubm90IHVzZSBlYXJsaWVyIG9uZXMgYWZ0ZXIgbmV3IG9uZXMgaGF2ZSBiZWVuIHVzZWQpXG4vLyBUT0RPOiBCYXNpYyBhcHBsaWNhdGlvbiBvZiBkZWx0YXNcbi8vIFRPRE86IENvbXBvc2l0aW9uIGluIG9yZGVyIHRvIGdlbmVyYXRlIGVycm9yIG1lc3NhZ2VzXG4vLyBUT0RPOiBFcnJvciBtZXNzYWdlcyBiYXNlZCBvbiBzeW50YWN0aWMgY29uZmxpY3RzIGluIGRlbHRhIG1vZGVsc1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ1Byb3h5JywgKCkgPT4ge1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMuUHJveHkgPSBjbGFzcyBQcm94eSB7XG5cblx0XHRjb25zdHJ1Y3Rvcih7cGFyZW50LCBkZWx0YX0gPSB7fSkge1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RlbHRhID0gZGVsdGE7XG5cdFx0fVxuXG5cdFx0ZGVsdGEoKSB7IHJldHVybiB0aGlzLl9kZWx0YTsgfVxuXG5cdFx0Z2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZSB9XG5cblx0XHRkZWFjdGl2YXRlKCkgeyB0aGlzLl9hY3RpdmUgPSBmYWxzZSB9XG5cblx0fTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBhIFByb3h5IGNsYXNzIGZvciBub24tY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyAqL1xuXHRjbGFzcyBCYXNpY1Byb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7fVxuXHRkZWx0YUpzLkJhc2ljUHJveHkgPSBCYXNpY1Byb3h5O1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIGNvbnRhaW5lciBvcGVyYXRpb24gdHlwZXMgbGlrZSBNb2RpZnkgYW5kIERlbHRhTW9kZWwgKi9cblx0ZGVsdGFKcy5Db250YWluZXJQcm94eSA9IGNsYXNzIENvbnRhaW5lclByb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7XG5cblx0XHQvLyBBIFByb3h5IGluc3RhbmNlIGV4cG9zZXMgb3BlcmF0aW9uIG1ldGhvZHMgZGlyZWN0bHkuIEFyZ3VtZW50c1xuXHRcdC8vIHRvIHRob3NlIG9wZXJhdGlvbnMgY2FuIGJlIHByZS1zdXBwbGllZCB0aHJvdWdoIHRoZSBgZG9gIG1ldGhvZC5cblxuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9kb0FyZ3MgICAgICAgPSBbXTtcblx0XHRcdHRoaXMuX29yaWdpbmFsICAgICA9IHRoaXM7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiAgICAgPSB7fTsgLy8ga2V5IC0+IFtwcm94aWVzXVxuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zXG5cdFx0fVxuXG5cblx0XHRkZWFjdGl2YXRlKCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNoaWxkUHJveHkoa2V5KS5kZWFjdGl2YXRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdHN1cGVyLmRlYWN0aXZhdGUoKTtcblx0XHR9XG5cblxuXHRcdGFkZENoaWxkUHJveHkoa2V5LCBkZWx0YSkge1xuXHRcdFx0LyogZ2V0IHRoZSBjdXJyZW50IHByb3h5IGZvciB0aGUgZ2l2ZW4ga2V5ICovXG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY2hpbGRQcm94eShrZXkpO1xuXG5cdFx0XHQvKiBnZXQgLyBjcmVhdGUgZGVsdGEgcHJveHkgKi9cblx0XHRcdHZhciBQcm94eUNsYXNzID0gZGVsdGEuY29uc3RydWN0b3IuUHJveHkgfHwgZGVsdGFKcy5CYXNpY1Byb3h5O1xuXHRcdFx0dmFyIHByb3h5ID0gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YSwgcGFyZW50OiB0aGlzIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGN1cnJlbnQgcHJveHkgaWYgaXQsIGFuZCB0aGUgY3VycmVudCBwcm94eSwgYXJlIGJvdGggTW9kaWZ5LlByb3h5ICovXG5cdFx0XHRpZiAoY3VycmVudCBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5ICYmXG5cdFx0XHRcdHByb3h5ICAgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSkgeyByZXR1cm4gY3VycmVudCB9XG5cblx0XHRcdC8qIHdlIG5lZWQgYSBuZXcgcHJveHksIHNvIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgb25lICovXG5cdFx0XHRpZiAoY3VycmVudCkgeyBjdXJyZW50LmRlYWN0aXZhdGUoKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBhIG5ldyBQcm94eSBvZiB0aGUgcmlnaHQgY2xhc3MsIHJlbWVtYmVyIGl0IGFuZCByZXR1cm4gaXQgKi9cblx0XHRcdHRoaXMuX2NoaWxkcmVuW2tleV0ucHVzaChwcm94eSk7XG5cdFx0XHRyZXR1cm4gcHJveHk7XG5cdFx0fVxuXG5cblx0XHRjaGlsZEtleXMoKSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikgfVxuXG5cblx0XHRjaGlsZFByb3hpZXMoa2V5KSB7IHJldHVybiBVLmEodGhpcy5fY2hpbGRyZW4sIGtleSkgfVxuXG5cblx0XHRjaGlsZFByb3h5KGtleSkgeyByZXR1cm4gVS5hKHRoaXMuX2NoaWxkcmVuLCBrZXkpW3RoaXMuX2NoaWxkcmVuW2tleV0ubGVuZ3RoLTFdIH1cblxuXG5cdFx0Y2hpbGREZWx0YShrZXkpIHtcblx0XHRcdHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKFxuXHRcdFx0XHQuLi50aGlzLmNoaWxkUHJveGllcyhrZXkpLm1hcChwcm94eSA9PiBwcm94eS5kZWx0YSgpKVxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdGRvKC4uLmRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogcmV0dXJuIGEgdmVyc2lvbiBvZiB0aGlzIFByb3h5IHdpdGggZXh0cmEgcHJlbG9hZGVkIGFyZ3MgKi9cblx0XHRcdC8vIG5vdGUgdGhhdCB0aGlzIG1peGVzIHByb3RvdHlwaWNhbCBpbmhlcml0YW5jZVxuXHRcdFx0Ly8gaW50byB0aGUgZXhpc3RpbmcgY2xhc3NpY2FsIGluaGVyaXRhbmNlIHNjaGVtZVxuXHRcdFx0dmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG5cdFx0XHRyZXN1bHQuX2RvQXJncyAgID0gWy4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzXTtcblx0XHRcdHJlc3VsdC5fb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHRfZG8obWV0aG9kLCBkb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIGNvbnRhaW5lci1zcGVjaWZpYyBwcm9jZXNzaW5nIG9mIGFyZ3VtZW50cyAqL1xuXHRcdFx0dmFyIHtvcHRpb25zLCBhcmdzfSA9IHRoaXMucHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzKTtcblxuXHRcdFx0LyogaWYgdGhlIG9wdGlvbnMgY29udGFpbiBhIHBhdGgsIHJlaWZ5IGl0ICovXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMucGF0aCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0b3B0aW9ucy5wYXRoID0gbmV3IFBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGhlIGFyZ3VtZW50IGxpc3QgaXMgZmluaXNoZWQ7IGNyZWF0ZSBhIG5ldyBkZWx0YSBhbmQgcHV0IGl0IGluIHRoZSByaWdodCBwbGFjZSAqL1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpO1xuXHRcdFx0dmFyIHByb3h5ID0gdGhpcy5hZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJpZ2h0IFByb3h5IGluc3RhbmNlIGZvciBjaGFpbmluZyAqL1xuXHRcdFx0cmV0dXJuIChwcm94eSBpbnN0YW5jZW9mIGRlbHRhSnMuQ29udGFpbmVyUHJveHkpID8gcHJveHkgOiB0aGlzO1xuXHRcdH1cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGV4dHJhY3QgYW5cblx0XHQgKiBvcHRpb25zIG9iamVjdCwgcGF0aCBhbmQgZmluYWwgYXJndW1lbnQgbGlzdCBmcm9tIGEgZ2l2ZW4gJ3JhdycgYXJndW1lbnQgbGlzdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19XG5cdFx0ICogQHJldHVybiB7e29wdGlvbnM6IE9iamVjdCwgYXJnczogWypdfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdwcm9jZXNzUHJveHlBcmd1bWVudHMnIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBhZGQgYSBnaXZlbiBkZWx0YVxuXHRcdCAqIHVuZGVyIGEgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLCBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIFByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ2FkZE9wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogQ3JlYXRlIGEgZGVsdGEgYmFzZWQgb24gYSBtZXRob2QtbmFtZSBhbmQgYXJndW1lbnQtbGlzdC5cblx0XHQgKiBJZiB0aGUgbWV0aG9kLW5hbWUgaXMgb3ZlcmxvYWRlZCwgeW91J2xsIGF1dG9tYXRpY2FsbHkgZ2V0XG5cdFx0ICogYW4gYERlbHRhLk92ZXJsb2FkZWRgIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBfbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpIHtcblx0XHRcdGRlZmluZU92ZXJsb2FkZWQoZGVsdGFKcyk7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbWV0aG9kSGFuZGxlcnNbbWV0aG9kXS5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKC4uLmFyZ3MpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZChuZXdEZWx0YXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2QgIHtzdHJpbmd9ICAgLSBtZXRob2QgbmFtZVxuXHRcdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXG5cdFx0XHQvKiBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBQcm94eSBjbGFzcyB3aXRoIG5ldyBvcGVyYXRpb24gbWV0aG9kICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdKSkge1xuXHRcdFx0XHRkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZG8obWV0aG9kLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyogcmVnaXN0ZXIgaGFuZGxlcnMgZm9yIGVhY2ggbWV0aG9kICovXG5cdFx0XHRVLmEoZGVsdGFKcy5Db250YWluZXJQcm94eSwgJ19tZXRob2RIYW5kbGVycycsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gYXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yLlByb3h5O1xuXHRcdFx0aWYgKCFQcm94eUNsYXNzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyAnZG8nIG9uIGRlbHRhIHR5cGUgJyR7dGhpcy50eXBlfScsIHdoaWNoIGhhcyBubyBQcm94eSBpbnRlcmZhY2UuYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YTogdGhpcyB9KS5kbyguLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Qcm94eS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=