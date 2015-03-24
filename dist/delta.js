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
	      * @param compose      {(DeltaJs#Delta, DeltaJs#Delta) => DeltaJs#Delta} - should be side-effect free
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
	
								/* throw an error on failure */
								if (!success) {
									throw new CompositionError(d1, d2);
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
						//constructor(...args) { super(...args) }
	
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
	
			/* composition - introducing 'Remove' ***********************************************/
			deltaJs.newComposition(t("Modify", "Remove"), d("Remove"));
			deltaJs.newComposition(t("Add", "Remove"), d("Forbid"));
			deltaJs.newComposition(t("Remove", "Add"), d("Replace", function (_ref) {
				var p2 = _ref.p2;
				return p2;
			}));
	
			/* composition - introducing 'Forbid' ***********************************************/
			deltaJs.newComposition(t("Remove", "Forbid"), d("Remove"));
			deltaJs.newComposition(t("Forbid", "Add"), d("Add", function (_ref) {
				var p2 = _ref.p2;
				return p2;
			}));
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
			deltaJs.newComposition(t("Replace", "Modify"), d("Replace", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("Replace", "Remove"), d("Remove"));
			deltaJs.newComposition(t("Replace", "Replace"), d("Replace", function (_ref) {
				var p2 = _ref.p2;
				return p2;
			}));
	
			/* composition - introducing 'Update' ***********************************************/
			deltaJs.newComposition(t("Add", "Update"), d("Add", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("Replace", "Update"), d("Replace", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("Update", "Remove"), d("Remove"));
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
			// TODO: allow more kinds of compositions with Update
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
			deltaJs.newComposition(t("Add", "PutIntoArray"), d("Add", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("Replace", "PutIntoArray"), d("Replace", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("PutIntoArray", "Remove"), d("Remove"));
			deltaJs.newComposition(t("PutIntoArray", "Replace"), d("Replace", function (_ref) {
				var p2 = _ref.p2;
				return p2;
			}));
			deltaJs.newComposition(t("PutIntoArray", "PutIntoArray"), function (d1, d2) {
				return new deltaJs.Delta.PutIntoArray([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
			});
	
			// TODO: composition with Update
	
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
			deltaJs.newComposition(t("Add", "PutIntoFunction"), d("Add", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("Replace", "PutIntoFunction"), d("Replace", function (_ref) {
				var d2 = _ref.d2;
				var p1 = _ref.p1;
				return d2.appliedTo(p1);
			}));
			deltaJs.newComposition(t("PutIntoFunction", "Remove"), d("Remove"));
			deltaJs.newComposition(t("PutIntoFunction", "Replace"), d("Replace", function (_ref) {
				var p2 = _ref.p2;
				return p2;
			}));
			deltaJs.newComposition(t("PutIntoFunction", "PutIntoFunction"), function (d1, d2) {
				return new deltaJs.Delta.PutIntoFunction([].concat(_toConsumableArray(d1.values), _toConsumableArray(d2.values)));
			});
	
			// TODO: composition with Update
	
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
			}, function (d1, d2) {
				var result = new deltaJs.Delta.DeltaModel();
				result.graph.addNewVertex(1, d1);
				result.graph.addNewVertex(2, d2);
				result.graph.addNewEdge(1, 2);
				return result;
			});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkNTY1ZTViZGM3Y2RiYzVmMWZiZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7Ozs7O0tDckNPLENBQUMsdUNBQU0sQ0FBVzs7OztLQUlsQixPQUFPLHVDQUFNLENBQWM7Ozs7cUNBSVcsQ0FBYTs7S0FBbEQsY0FBYyxhQUFkLGNBQWM7S0FBRSxjQUFjLGFBQWQsY0FBYzs7QUFDdEMsRUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQWQsY0FBYyxFQUFFLGNBQWMsRUFBZCxjQUFjLEVBQUUsQ0FBQyxDQUFDOzs7O0tBSS9DLElBQUksdUNBQU0sQ0FBVzs7QUFDNUIsRUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUMsQ0FBQzs7OztvQ0FRYSxDQUFZOztLQUo3QyxnQkFBZ0IsWUFBaEIsZ0JBQWdCO0tBQUUsaUNBQWlDLFlBQWpDLGlDQUFpQztLQUN6RCwyQkFBMkIsWUFBM0IsMkJBQTJCO0tBQUUsZ0JBQWdCLFlBQWhCLGdCQUFnQjtLQUN2QyxpQ0FBaUMsWUFBakMsaUNBQWlDO0tBQUUsaUJBQWlCLFlBQWpCLGlCQUFpQjtLQUNwRCxxQkFBcUIsWUFBckIscUJBQXFCO0tBQUUsdUJBQXVCLFlBQXZCLHVCQUF1QjtLQUM5QywwQkFBMEIsWUFBMUIsMEJBQTBCOztBQUNsQyxFQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixFQUFoQixnQkFBZ0IsRUFBRSxpQ0FBaUMsRUFBakMsaUNBQWlDO0FBQ25ELGdEQUEyQixFQUEzQiwyQkFBMkIsRUFBRSxnQkFBZ0IsRUFBaEIsZ0JBQWdCO0FBQzdDLHNEQUFpQyxFQUFqQyxpQ0FBaUMsRUFBRSxpQkFBaUIsRUFBakIsaUJBQWlCO0FBQ3BELDBDQUFxQixFQUFyQixxQkFBcUIsRUFBRSx1QkFBdUIsRUFBdkIsdUJBQXVCO0FBQzlDLCtDQUEwQixFQUExQiwwQkFBMEIsRUFBRSxDQUFDLENBQUM7OztrQkFJbkMsT0FBTyxDOzs7Ozs7Ozs7O0FDaEN0QixLQUFJLENBQUMsR0FBRzs7O0FBR1AsVUFBUSxzQkFBbUM7T0FBbEMsV0FBVyxnQ0FBRyxFQUFFO09BQUUsU0FBUyxnQ0FBRyxFQUFFOzs7QUFHeEMsT0FBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7QUFDdEMsYUFBUyxHQUFHLFdBQVcsQ0FBQztBQUN4QixlQUFXLEdBQUcsWUFBWSxFQUFFLENBQUM7SUFDN0I7OztBQUdELE9BQUksR0FBRyxHQUFHLFdBQVcsQ0FBQztBQUN0QixNQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixNQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDaEMsVUFBTyxHQUFHLENBQUM7R0FFWDs7O0FBR0QsYUFBVyx1QkFBQyxVQUFVLEVBQXlDO09BQXZDLGdCQUFnQixnQ0FBRyxFQUFFO09BQUUsU0FBUyxnQ0FBRyxFQUFFOzs7QUFHNUQsT0FBSSxPQUFPLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtBQUMzQyxhQUFTLEdBQUcsZ0JBQWdCLENBQUM7QUFDN0Isb0JBQWdCLEdBQUcsVUFBQyxPQUFPO1lBQUssWUFBbUI7d0NBQU4sSUFBSTtBQUFKLFdBQUk7OztBQUFJLGFBQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztNQUFFO0tBQUEsQ0FBQztJQUNqRjs7O0FBR0QsT0FBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3RCxNQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BELElBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNuQyxNQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDaEMsVUFBTyxHQUFHLENBQUM7R0FFWDs7Ozs7QUFLRCxRQUFNLGtCQUFDLElBQUksRUFBVztxQ0FBTixJQUFJO0FBQUosUUFBSTs7O0FBQ25CLE9BQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDckIsU0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDcEIsU0FBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzVCLFlBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDNUU7S0FDRDtJQUNELENBQUMsQ0FBQztBQUNILFVBQU8sSUFBSSxDQUFDO0dBQ1o7O0FBRUQsYUFBTyxrQkFBQyxNQUFNLEVBQVc7cUNBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUN0QixPQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLE9BQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFBRSxXQUFPLE1BQU07SUFBRTtBQUN4QyxPQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFILENBQUMsR0FBRyxNQUFNLDRCQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQztBQUM3QyxPQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3QyxRQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDaEM7QUFDRCxVQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2pDOztBQUVELEdBQUMsYUFBQyxNQUFNLEVBQVc7cUNBQU4sSUFBSTtBQUFKLFFBQUk7OztBQUFJLFVBQU8sQ0FBQyxpQkFBUSxDQUFULENBQUMsR0FBUyxNQUFNLFNBQUssSUFBSSxHQUFFLEVBQUUsR0FBQztHQUFFOztBQUU1RCxHQUFDLGFBQUMsTUFBTSxFQUFXO3FDQUFOLElBQUk7QUFBSixRQUFJOzs7QUFBSSxVQUFPLENBQUMsaUJBQVEsQ0FBVCxDQUFDLEdBQVMsTUFBTSxTQUFLLElBQUksR0FBRSxFQUFFLEdBQUM7R0FBRTs7O0FBRzVELFFBQU0sa0JBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUMxQixPQUFJLENBQUMsU0FBUyxFQUFFO0FBQUUsVUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksa0JBQWtCLENBQUM7SUFBRTtHQUNsRTs7O0FBR0QsYUFBVyx1QkFBQyxHQUFHLEVBQUU7QUFBRSxVQUFPLE9BQU8sR0FBRyxLQUFLLFdBQVc7R0FBRTs7O0FBR3RELFdBQVMscUJBQUMsR0FBRyxFQUFFO0FBQUUsVUFBTyxPQUFPLEdBQUcsS0FBSyxXQUFXO0dBQUU7OztBQUdwRCxRQUFNLGtCQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7QUFBRSxVQUFPLElBQUksS0FBSyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0dBQUU7OztBQUdwRCxRQUFNLGtCQUFDLEdBQUcsRUFBRSxNQUFNLEVBQWM7T0FBWixJQUFJLGdDQUFHLEdBQUc7O0FBQzdCLFVBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztHQUMxRDs7O0FBR0QsU0FBTyxtQkFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtBQUNyQixPQUFJLENBQUMsbUJBQWlCLEdBQUssQ0FBQztBQUM1QixPQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUFFLFdBQU07SUFBRTtBQUN0QixNQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2QsVUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztHQUN6QjtFQUNELENBQUM7O2tCQUVhLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDN0ZULE9BQU8sdUNBQU0sQ0FBVTs7OztLQUl2QixDQUFDLHVDQUE2QyxDQUFXOztLQUN6RCxJQUFJLHVDQUEwQyxDQUFXOztxQ0FDWCxDQUFhOztLQUExRCxjQUFjLGFBQWQsY0FBYztLQUFFLGNBQWMsYUFBZCxjQUFjO0tBQUUsRUFBRSxhQUFGLEVBQUU7S0FBRSxFQUFFLGFBQUYsRUFBRTs7S0FDdkMsV0FBVyx1Q0FBbUMsQ0FBdUI7O0tBQ3JFLGdCQUFnQix1Q0FBOEIsQ0FBNEI7O0tBQzFFLFlBQVksdUNBQWtDLENBQXdCOztLQUN0RSxxQkFBcUIsdUNBQXlCLEVBQWlDOztLQUMvRSxrQkFBa0IsdUNBQTRCLEVBQThCOztLQUM1RSxxQkFBcUIsdUNBQXlCLEVBQWlDOztLQUMvRSxnQkFBZ0IsdUNBQThCLEVBQTRCOztLQUMxRSxjQUFjLHVDQUFnQyxFQUFlOztLQUM3RCxxQkFBcUIsdUNBQXlCLEVBQXNCOztLQUNwRSwyQkFBMkIsdUNBQW1CLEVBQTRCOztLQUMxRSxXQUFXLHVDQUFtQyxFQUF1Qjs7Ozs7Ozs7Ozs7S0FXdkQsT0FBTztBQUVoQixXQUZTLE9BQU87eUJBQVAsT0FBTzs7QUFHMUIsY0FBVyxDQUFpQixJQUFJLENBQUMsQ0FBQztBQUNsQyxjQUFXLENBQWlCLElBQUksQ0FBQyxDQUFDO0FBQ2xDLG1CQUFnQixDQUFZLElBQUksQ0FBQyxDQUFDO0FBQ2xDLGVBQVksQ0FBZ0IsSUFBSSxDQUFDLENBQUM7QUFDbEMsd0JBQXFCLENBQU8sSUFBSSxDQUFDLENBQUM7QUFDbEMscUJBQWtCLENBQVUsSUFBSSxDQUFDLENBQUM7QUFDbEMsd0JBQXFCLENBQU8sSUFBSSxDQUFDLENBQUM7QUFDbEMsbUJBQWdCLENBQVksSUFBSSxDQUFDLENBQUM7QUFDbEMsaUJBQWMsQ0FBYyxJQUFJLENBQUMsQ0FBQztBQUNsQyx3QkFBcUIsQ0FBTyxJQUFJLENBQUMsQ0FBQztBQUNsQyw4QkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNsQzs7dUJBZG1CLE9BQU87QUFzQjNCLG1CQUFnQjs7Ozs7Ozs7V0FBQSwwQkFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTs7OztBQUU5QyxNQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLGtGQUNxQyxJQUFJLGlCQUFjLENBQUM7QUFDbEcsTUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFDL0IsSUFBSSxzQ0FBbUMsQ0FBQzs7O0FBR2pELFNBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDOzs7QUFHOUIsZUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7OztBQUc5QixTQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSyxZQUFJLEVBQUcsQ0FBQzs7O0FBRzVELE1BQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtBQUM5QixhQUFPLG1CQUFDLE1BQU0sRUFBZ0I7V0FBZCxPQUFPLGdDQUFHLEVBQUU7OztBQUUzQixXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUFFLGVBQU07UUFBRTs7O0FBRzlCLFdBQUksRUFBRSxNQUFNLFlBQVksT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2hELGNBQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUM7OztBQUdELFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCxXQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFBRSxjQUFNLFFBQVE7UUFBRTs7O0FBR3pDLG1CQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDekM7QUFDRCxVQUFJLEVBQUUsSUFBSTtNQUNWLENBQUMsQ0FBQzs7O0FBR0gsU0FBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsTUFBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUNyRSxZQUFLLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO3lDQUFJLElBQUk7QUFBSixZQUFJOzs7Z0NBQVMsVUFBVSxFQUFJLElBQUk7T0FBQyxDQUFDLENBQUM7TUFDakYsQ0FBQyxDQUFDOzs7QUFHSCxZQUFPLFVBQVUsQ0FBQztLQUNsQjs7OztBQU9ELGlCQUFjOzs7Ozs7O1dBQUEsd0JBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUMvQixTQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEQ7Ozs7OztTQTVFbUIsT0FBTzs7O2tCQUFQLE9BQU8sQzs7Ozs7Ozs7OztTQ0paLEVBQUUsR0FBRixFQUFFO1NBQ0YsRUFBRSxHQUFGLEVBQUU7O0tBMUJYLENBQUMsdUNBQU0sQ0FBVzs7QUFFbEIsS0FBSSxjQUFjLFdBQWQsY0FBYyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDdkQsTUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7RUFDbEIsMEJBQUU7QUFDRixVQUFRLHNCQUFHO0FBQUUsVUFBTyxJQUFJLENBQUMsSUFBSTtHQUFFLEVBRy9CO0FBREksT0FBSztRQURBLFlBQUc7QUFBRSxXQUFPLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFBRTtRQUM3QixVQUFDLENBQUMsRUFBRTtBQUFFLFFBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQUU7Ozs7SUFDaEMsQ0FBQzs7QUFFSSxLQUFJLGNBQWMsV0FBZCxjQUFjLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsVUFBQyxPQUFPO1NBQUssVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzNGLE9BQUksQ0FBQyxJQUFJLEdBQUksR0FBRyxDQUFDO0FBQ2pCLE9BQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0dBQ2xCO0VBQUEsRUFBRTtBQUNGLFVBQVEsc0JBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztHQUFFO0FBQzNDLFVBQVEsb0JBQUMsQ0FBQyxFQUFFO0FBQUUsT0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFFO0FBQ3pDLFlBQU0sbUJBQUc7QUFBRSxVQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztHQUFFO0VBQ3pDLENBQUMsQ0FBQzs7QUFFSCxlQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUU7QUFDckQsR0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLE1BQU0sd0ZBQ2tELENBQUM7QUFDeEYsU0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzVDLENBQUM7O0FBRUssVUFBUyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUFFLFNBQU8sSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztFQUFFOztBQUMvRCxVQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQUUsU0FBTyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0VBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDMUIvRCxDQUFDLHVDQUFNLENBQVc7O0tBR0osSUFBSTtBQUViLFdBRlMsSUFBSTtPQUVaLEdBQUcsZ0NBQUcsRUFBRTs7eUJBRkEsSUFBSTs7O0FBSXZCLE9BQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUNwRCxJQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssd0JBQXNCLEdBQUcsMkJBQXdCLENBQUM7OytCQUNyQyxLQUFLOztPQUF6QixJQUFJO09BQUUsSUFBSTtPQUFFLElBQUk7O0FBQ3ZCLE9BQUksSUFBSSxLQUFLLEdBQUcsRUFBRTs7QUFFakIsUUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksa0JBQWdCLElBQUksUUFBRyxJQUFJLENBQUcsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtBQUNoQixTQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQ0Q7R0FDRDs7dUJBaEJtQixJQUFJO0FBa0J4QixNQUFHO1dBQUEsYUFBQyxLQUFLLEVBQUU7QUFDVixTQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDekIsU0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3pCOzs7O0FBRUcsT0FBSTtTQUFBLFlBQUc7QUFBRSxZQUFPLElBQUksQ0FBQyxLQUFLO0tBQUU7OztBQUU1QixPQUFJO1NBQUEsWUFBRztBQUFFLFlBQU8sSUFBSSxDQUFDLEtBQUs7S0FBRTs7O0FBRWhDLFdBQVE7V0FBQSxvQkFBRztBQUNWLFNBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixTQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNCLFlBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3BCLFVBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDM0IsYUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQ3JDO01BQ0Q7QUFDRCxZQUFPLE1BQU0sQ0FBQztLQUNkOzs7Ozs7U0FwQ21CLElBQUk7OztrQkFBSixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O0tDSFosZ0JBQWdCLFdBQWhCLGdCQUFnQixjQUFTLEtBQUs7QUFDL0IsV0FEQyxnQkFBZ0IsQ0FDaEIsS0FBSyxFQUFFLEtBQUs7eUJBRFosZ0JBQWdCOztBQUUzQiw4QkFGVyxnQkFBZ0IsNkNBRW5CO0FBQ1IsT0FBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUMvQixPQUFJLENBQUMsT0FBTyw0QkFBMEIsS0FBSyxDQUFDLElBQUksOENBQXlDLE9BQU8sS0FBSyxPQUFJLENBQUM7QUFDMUcsT0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsT0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7R0FDbkI7O1lBUFcsZ0JBQWdCLEVBQVMsS0FBSzs7U0FBOUIsZ0JBQWdCO0lBQVMsS0FBSzs7S0FVOUIsaUNBQWlDLFdBQWpDLGlDQUFpQyxjQUFTLGdCQUFnQjtBQUMzRCxXQURDLGlDQUFpQyxDQUNqQyxLQUFLLEVBQUUsS0FBSztPQUFFLE1BQU0sZ0NBQUcsRUFBRTs7eUJBRHpCLGlDQUFpQzs7QUFFNUMsOEJBRlcsaUNBQWlDLDZDQUV0QyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ3BCLE9BQUksQ0FBQyxJQUFJLEdBQUcsbUNBQW1DLENBQUM7QUFDaEQsT0FBSSxDQUFDLE9BQU8sR0FBRyw2QkFBMkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBQztXQUFJLEdBQUcsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEdBQUc7SUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQ0FBcUMsT0FBTyxLQUFLLFVBQzdJLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBQztxQkFBWSxDQUFDLENBQUMsT0FBTztJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7R0FDckI7O1lBUFcsaUNBQWlDLEVBQVMsZ0JBQWdCOztTQUExRCxpQ0FBaUM7SUFBUyxnQkFBZ0I7O0tBVTFELDJCQUEyQixXQUEzQiwyQkFBMkIsY0FBUyxnQkFBZ0I7QUFDckQsV0FEQywyQkFBMkIsQ0FDM0IsS0FBSyxFQUFFLEtBQUs7eUJBRFosMkJBQTJCOztBQUV0Qyw4QkFGVywyQkFBMkIsNkNBRWhDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEIsT0FBSSxDQUFDLElBQUksR0FBRyw2QkFBNkIsQ0FBQztBQUMxQyxPQUFJLENBQUMsT0FBTyw0QkFBMEIsS0FBSyxDQUFDLElBQUksMEZBQXFGLE9BQU8sS0FBSyxNQUFHLENBQUM7R0FDcko7O1lBTFcsMkJBQTJCLEVBQVMsZ0JBQWdCOztTQUFwRCwyQkFBMkI7SUFBUyxnQkFBZ0I7O0tBUXBELGdCQUFnQixXQUFoQixnQkFBZ0IsY0FBUyxLQUFLO0FBQy9CLFdBREMsZ0JBQWdCLENBQ2hCLE1BQU0sRUFBRSxNQUFNO3lCQURkLGdCQUFnQjs7QUFFM0IsOEJBRlcsZ0JBQWdCLDZDQUVuQjtBQUNSLE9BQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFDL0IsT0FBSSxDQUFDLE9BQU8sNEJBQTBCLE1BQU0sQ0FBQyxJQUFJLDREQUF1RCxNQUFNLENBQUMsSUFBSSxPQUFJLENBQUM7QUFDeEgsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7R0FDckI7O1lBUFcsZ0JBQWdCLEVBQVMsS0FBSzs7U0FBOUIsZ0JBQWdCO0lBQVMsS0FBSzs7S0FVOUIsaUNBQWlDLFdBQWpDLGlDQUFpQyxjQUFTLGdCQUFnQjtBQUMzRCxXQURDLGlDQUFpQyxDQUNqQyxNQUFNLEVBQUUsTUFBTTtPQUFFLE1BQU0sZ0NBQUcsRUFBRTs7eUJBRDNCLGlDQUFpQzs7QUFFNUMsOEJBRlcsaUNBQWlDLDZDQUV0QyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3RCLE9BQUksQ0FBQyxJQUFJLEdBQUcsbUNBQW1DLENBQUM7QUFDaEQsT0FBSSxDQUFDLE9BQU8sR0FBRywyREFBeUQsTUFBTSxDQUFDLElBQUkseUNBQW9DLE1BQU0sQ0FBQyxJQUFJLFVBQ2xJLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBQztxQkFBWSxDQUFDLENBQUMsT0FBTztJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7R0FDckI7O1lBUFcsaUNBQWlDLEVBQVMsZ0JBQWdCOztTQUExRCxpQ0FBaUM7SUFBUyxnQkFBZ0I7O0tBVTFELGlCQUFpQixXQUFqQixpQkFBaUIsY0FBUyxLQUFLO0FBQ2hDLFdBREMsaUJBQWlCLENBQ2pCLE9BQU87eUJBRFAsaUJBQWlCOztBQUU1Qiw4QkFGVyxpQkFBaUIsNkNBRXBCO0FBQ1IsT0FBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztBQUNoQyxPQUFJLENBQUMsT0FBTyxxQkFBbUIsT0FBTyxDQUFDLElBQUksd0RBQXFELENBQUM7QUFDakcsT0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7R0FDdkI7O1lBTlcsaUJBQWlCLEVBQVMsS0FBSzs7U0FBL0IsaUJBQWlCO0lBQVMsS0FBSzs7S0FTL0IscUJBQXFCLFdBQXJCLHFCQUFxQixjQUFTLEtBQUs7QUFDcEMsV0FEQyxxQkFBcUIsQ0FDckIsSUFBSSxFQUFFLEVBQUU7eUJBRFIscUJBQXFCOztBQUVoQyw4QkFGVyxxQkFBcUIsNkNBRXhCO0FBQ1IsT0FBSSxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztBQUNwQyxPQUFJLENBQUMsT0FBTywwQ0FBd0MsSUFBSSxhQUFRLEVBQUUsc0JBQW1CLENBQUM7QUFDdEYsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsT0FBSSxDQUFDLEVBQUUsR0FBSyxFQUFFLENBQUM7R0FDZjs7WUFQVyxxQkFBcUIsRUFBUyxLQUFLOztTQUFuQyxxQkFBcUI7SUFBUyxLQUFLOztLQVVuQyx1QkFBdUIsV0FBdkIsdUJBQXVCLGNBQVMsS0FBSztBQUN0QyxXQURDLHVCQUF1QixDQUN2QixNQUFNO3lCQUROLHVCQUF1Qjs7QUFFbEMsOEJBRlcsdUJBQXVCLDZDQUUxQjtBQUNSLE9BQUksQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7QUFDdEMsT0FBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDO2lCQUFRLENBQUMsQ0FBQyxJQUFJO0lBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxRCxPQUFJLENBQUMsT0FBTyx1REFBcUQsVUFBVSxNQUFHLENBQUM7QUFDL0UsT0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7R0FDckI7O1lBUFcsdUJBQXVCLEVBQVMsS0FBSzs7U0FBckMsdUJBQXVCO0lBQVMsS0FBSzs7S0FVckMsMEJBQTBCLFdBQTFCLDBCQUEwQixjQUFTLEtBQUs7QUFDekMsV0FEQywwQkFBMEI7eUJBQTFCLDBCQUEwQjs7QUFFckMsOEJBRlcsMEJBQTBCLDZDQUU3QjtBQUNSLE9BQUksQ0FBQyxJQUFJLEdBQUcsNEJBQTRCLENBQUM7QUFDekMsT0FBSSxDQUFDLE9BQU8sNkRBQTZELENBQUM7R0FDMUU7O1lBTFcsMEJBQTBCLEVBQVMsS0FBSzs7U0FBeEMsMEJBQTBCO0lBQVMsS0FBSzs7Ozs7Ozs7OztBQzdFckQsZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7S0NDTyxDQUFDLHVDQUF5QyxDQUFZOztxQ0FDWixDQUFjOztLQUF2RCxjQUFjLGFBQWQsY0FBYztLQUFFLEVBQUUsYUFBRixFQUFFOztLQUNuQiwyQkFBMkIsdUNBQWUsRUFBNkI7O29DQUM3QixDQUFhOztLQUF0RCxnQkFBZ0IsWUFBaEIsZ0JBQWdCO0tBQUUsZ0JBQWdCLFlBQWhCLGdCQUFnQjs7a0JBRzNCLFVBQUMsT0FBTyxFQUFLO0FBQzNCLEdBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFNOztBQUVqQyxVQUFPLENBQUMsS0FBSztBQUVELGFBRlUsS0FBSzt1Q0FFWCxJQUFJO0FBQUosVUFBSTs7OzJCQUZFLEtBQUs7O0FBR3pCLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2pCOzt5QkFMb0IsS0FBSztBQXlFbkIsbUJBQWM7Ozs7Ozs7YUFBQSx3QkFBQyxZQUFZLEVBQUUsT0FBTyxFQUFFO0FBQzVDLGNBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBWixZQUFZLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBQyxDQUFDLENBQUM7T0FDMUQ7Ozs7QUFPTSxhQUFROzs7Ozs7O2FBQUEsb0JBQVk7eUNBQVIsTUFBTTtBQUFOLGNBQU07OztBQUN4QixXQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRXRDLGFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDekIsWUFBSSxFQUFFLEdBQUcsTUFBTTtZQUNYLEVBQUUsR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHM0MsWUFBSSxTQUFTLEdBQUcsWUFBSSxFQUFFLENBQUM7QUFDdkIsWUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWlDO2FBQS9CLFlBQVksUUFBWixZQUFZO2FBQVcsRUFBRSxRQUFYLE9BQU87O0FBQzdELGFBQUksWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN6QixtQkFBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLGlCQUFPLElBQUksQ0FBQztVQUNaO1NBQ0QsQ0FBQyxDQUFDOzs7QUFHSCxZQUFJLENBQUMsT0FBTyxFQUFFO0FBQUUsZUFBTSxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FBRTs7O0FBR3BELGNBQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTNCLENBQUMsQ0FBQzs7QUFFSCxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7OztBQW5HRyxRQUFHO1dBREEsWUFBSTtBQUFFLGNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7T0FBRTtXQUMzQixVQUFDLENBQUMsRUFBRTtBQUFFLFdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztPQUFFOzs7QUFNL0IsVUFBSzs7Ozs7OzthQUFBLGlCQUFHO0FBQUUsY0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUFFOzs7O0FBUWpELHlCQUFvQjs7Ozs7Ozs7YUFBQSw4QkFBQyxNQUFNLEVBQUU7QUFDNUIsV0FBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3RCLFlBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsWUFBSSxRQUFRLFlBQVksZ0JBQWdCLEVBQUU7QUFDekMsZ0JBQU8sUUFBUSxDQUFDO1NBQ2hCLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNyQixnQkFBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEQ7UUFDRDtBQUNELGNBQU8sSUFBSSxDQUFDO09BQ1o7Ozs7QUFRRCxjQUFTOzs7Ozs7OzthQUFBLG1CQUFDLEtBQUssRUFBZ0I7V0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQzVCLFdBQUksS0FBSyxZQUFZLGNBQWMsRUFBSTtBQUFFLGFBQUssR0FBRyxLQUFLLENBQUMsS0FBSztRQUFJO0FBQ2hFLFdBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTtBQUFFLGFBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFO1FBQUU7QUFDaEUsV0FBSSxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUM7QUFDcEIsV0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLGNBQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztPQUNqQjs7OztBQU9ELGlCQUFZOzs7Ozs7O2FBQUEsc0JBQUMsS0FBSyxFQUFFO0FBQUUsY0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO09BQUU7Ozs7QUFPbEUsYUFBUTs7Ozs7OzthQUFBLG9CQUFlO1dBQWQsT0FBTyxnQ0FBRyxFQUFFOztBQUNwQixXQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3BCLFdBQUksT0FBTyxDQUFDLFVBQVUsRUFBSTtBQUFFLFdBQUcsV0FBUyxPQUFPLENBQUMsVUFBVSxNQUFHO1FBQWdDO0FBQzdGLFdBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQUUsV0FBRyxXQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztnQkFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHO1FBQUU7QUFDN0YsV0FBSSxPQUFPLENBQUMsS0FBSyxFQUFTO0FBQUUsV0FBRyxXQUFTLElBQUksQ0FBQyxFQUFFLE1BQUc7UUFBMkM7QUFDN0YsY0FBTyxHQUFHLENBQUM7T0FDWDs7Ozs7O1dBbEVvQixLQUFLO09BOEcxQixDQUFDO0FBQ0YsVUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLFVBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFJLEVBQUUsQ0FBQztHQUVsQyxDQUFDLENBQUM7QUFDSCxHQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFlBQU07O0FBRTdDLElBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQU12QyxrQkFBYywwQkFBQyxZQUFZLEVBQUUsT0FBTyxFQUFFO0FBQ3JDLFNBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNqRDs7SUFFRCxDQUFDLENBQUM7R0FFSCxDQUFDLENBQUM7RUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQzNJTSxDQUFDLHVDQUFNLENBQVk7O0tBQ25CLFdBQVcsdUNBQU0sQ0FBWTs7b0NBR00sQ0FBYTs7S0FGL0MsaUNBQWlDLFlBQWpDLGlDQUFpQztLQUN2QywyQkFBMkIsWUFBM0IsMkJBQTJCO0tBQzNCLGlDQUFpQyxZQUFqQyxpQ0FBaUM7O2tCQUdwQixVQUFDLE9BQU87U0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBTTs7QUFFbEUsY0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVyQixVQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWTtBQUV6QixhQUZpQyxVQUFVO3VDQUV2QyxJQUFJO0FBQUosVUFBSTs7OzJCQUZ5QixVQUFVOztBQUdyRCxnQ0FIMkMsVUFBVSw4Q0FHNUMsSUFBSSxFQUFFO0FBQ2YsU0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztLQUNoQzs7Y0FMMkMsVUFBVTs7eUJBQVYsVUFBVTtBQVd0RCxVQUFLOzs7Ozs7YUFBQSxpQkFBRztBQUNQLFdBQUksTUFBTSw4QkFaaUMsVUFBVSxzQ0FZM0IsQ0FBQztBQUMzQixhQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQUs7ZUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1FBQUEsQ0FBQyxDQUFDO0FBQzlELGNBQU8sTUFBTSxDQUFDO09BQ2Q7Ozs7QUFPRCxZQUFPOzs7Ozs7O2FBQUEsaUJBQUMsTUFBTSxFQUFnQjtXQUFkLE9BQU8sZ0NBQUcsRUFBRTs7O0FBRTNCLFdBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixXQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBSztBQUM1QyxZQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsWUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQ3RCLGVBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsZ0JBQU8sS0FBSyxDQUFDO1NBQ2I7QUFDRCxhQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMvQixlQUFPLElBQUksQ0FBQztRQUNaLENBQUMsQ0FBQzs7QUFFSCxXQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2IsWUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN4QixlQUFNLElBQUksMkJBQTJCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRCxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDL0IsZUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEIsTUFBTTtBQUNOLGVBQU0sSUFBSSxpQ0FBaUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4RTtRQUNEO09BQ0Q7Ozs7QUFPRCxhQUFROzs7Ozs7O2FBQUEsb0JBQWU7V0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ3BCLFdBQUksR0FBRyw4QkFwRG9DLFVBQVUsMENBb0Q1QixPQUFPLENBQUMsQ0FBQztBQUNsQyxXQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUs7ZUFBSyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEYsVUFBRyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyQyxjQUFPLEdBQUcsQ0FBQztPQUNYOzs7Ozs7V0F4RDJDLFVBQVU7TUFBUyxPQUFPLENBQUMsS0FBSyxFQTBEM0UsQ0FBQzs7QUFHSCxVQUFPLENBQUMsY0FBYyxDQUFDLFVBQUMsRUFBRSxFQUFFLEVBQUU7V0FDOUIsRUFBRSxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUN0QyxFQUFFLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVO0lBQ3JDLEVBQUUsVUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFLO0FBQ2QsUUFBSSxFQUFFLEdBQUcsRUFBRSxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0RSxRQUFJLEVBQUUsR0FBRyxFQUFFLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFLFFBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QyxRQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsTUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUN0QixPQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ3RCLFVBQUk7QUFBRSxhQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQUUsQ0FDMUQsT0FBTyxLQUFLLEVBQUU7QUFBRSxhQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztPQUFFO01BQ3BDLENBQUMsQ0FBQztLQUNILENBQUMsQ0FBQztBQUNILFFBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQUUsV0FBTSxJQUFJLGlDQUFpQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDO0tBQUU7QUFDbEcsV0FBTyxNQUFNLENBQUM7SUFDZCxDQUFDLENBQUM7R0FFSCxDQUFDO0VBQUEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0MxRkssQ0FBQyx1Q0FBZ0IsQ0FBWTs7S0FDN0IsSUFBSSx1Q0FBYSxDQUFZOztLQUM1QixFQUFFLHVCQUFjLENBQWMsRUFBOUIsRUFBRTs7S0FDSCxXQUFXLHVDQUFNLEVBQVk7O2tCQUdyQixVQUFDLE9BQU87U0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBTTs7QUFFOUQsY0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVyQixVQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUTtBQUVyQixhQUY2QixNQUFNO3VDQUUvQixJQUFJO0FBQUosVUFBSTs7OzJCQUZxQixNQUFNOztBQUc3QyxnQ0FIdUMsTUFBTSw4Q0FHcEMsSUFBSSxFQUFFO0FBQ2YsU0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7S0FDekM7O2NBTnVDLE1BQU07O3lCQUFOLE1BQU07QUFZOUMsVUFBSzs7Ozs7O2FBQUEsaUJBQUc7OztBQUNQLFdBQUksTUFBTSw4QkFiNkIsTUFBTSxzQ0FhbkIsQ0FBQztBQUMzQixhQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDN0MsY0FBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0RCxDQUFDLENBQUM7QUFDSCxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7O0FBTUQsaUJBQVk7Ozs7OzthQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUFFLGNBQU8sTUFBTSxDQUFDLEtBQUssWUFBWSxNQUFNO09BQUU7Ozs7QUFPOUQsWUFBTzs7Ozs7OzthQUFBLGlCQUFDLE1BQU0sRUFBZ0I7OztXQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFDM0IsYUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzdDLFlBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksT0FBTyxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtBQUN2RSxlQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQ2pELENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2RDtRQUNELENBQUMsQ0FBQztPQUNIOzs7O0FBT0QsYUFBUTs7Ozs7OzthQUFBLG9CQUFlOzs7V0FBZCxPQUFPLGdDQUFHLEVBQUU7O0FBQ3BCLFdBQUksR0FBRyw4QkE5Q2dDLE1BQU0sMENBOENwQixPQUFPLENBQUMsQ0FBQztBQUNsQyxXQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDM0MsWUFBSSxNQUFNLEdBQUcsTUFBTSxDQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNwQixHQUFHLENBQUMsVUFBQyxDQUFDO2dCQUFLLE1BQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUFBLENBQUMsQ0FDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsV0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQztBQUNELGNBQU8sR0FBRyxDQUFDO09BQ1g7Ozs7OztXQXZEdUMsTUFBTTtNQUFTLE9BQU8sQ0FBQyxLQUFLO2FBMEQ1RCxXQUFXOzJCQUFYLFdBQVc7Ozs7Ozs7Y0FBWCxXQUFXOzt5QkFBWCxXQUFXO0FBT25CLDBCQUFxQjs7Ozs7Ozs7YUFBQSxpQ0FBYTt5Q0FBVCxPQUFPO0FBQVAsZUFBTzs7Ozs7QUFHL0IsV0FBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFVBQUc7QUFDRixZQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQUUsZUFBTSxJQUFJLEtBQUssbUVBQW1FO1NBQUU7QUFDaEgsWUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFCLFlBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQUUsZ0JBQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRztTQUFNLE1BQzFCO0FBQUUsVUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQUU7UUFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDeEIsY0FBTyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO09BQ2xDOzs7O0FBUUQsaUJBQVk7Ozs7Ozs7O2FBQUEsc0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtXQUN2QixJQUFJLEdBQUksT0FBTyxDQUFmLElBQUk7O0FBQ1QsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFBRSxjQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDO1FBQUU7OztBQUdsRyxXQUFJLFlBQVksQ0FBQztBQUNqQixXQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDZCxZQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDNUQsWUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLG9CQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDMUQsTUFBTTtBQUNOLG9CQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BEOzs7OztBQUtELGNBQU8sWUFBWSxDQUFDO09BQ3BCOzs7O0FBUUQsVUFBSzs7Ozs7Ozs7YUFBQSxpQkFBRzs7O0FBQ1AsV0FBSSxNQUFNLDhCQXJESCxXQUFXLHNDQXFEUSxDQUFDO0FBQzNCLGFBQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLFdBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDbEMsY0FBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUM7QUFDSCxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7Ozs7V0EzRE8sV0FBVztNQUFTLE9BQU8sQ0FBQyxjQUFjLEVBNkRqRCxDQUFDOzs7QUFJSCxZQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQUUsV0FBTyxVQUFDLEVBQUUsRUFBRSxFQUFFO1lBQU0sRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLO0tBQUM7SUFBRTtBQUN4RixVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsVUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFLO0FBQzFELFFBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixVQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0MsV0FBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM1RixDQUFDLENBQUM7QUFDSCxXQUFPLE1BQU0sQ0FBQztJQUNkLENBQUMsQ0FBQztHQUVILENBQUM7RUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQzlJSyxDQUFDLHVDQUE2QyxDQUFZOztxQ0FDWixDQUFjOztLQUEzRCxjQUFjLGFBQWQsY0FBYztLQUFFLGNBQWMsYUFBZCxjQUFjO0tBQUUsRUFBRSxhQUFGLEVBQUU7S0FBRSxFQUFFLGFBQUYsRUFBRTs7S0FDdkMsV0FBVyx1Q0FBbUMsQ0FBWTs7S0FDMUQsWUFBWSx1Q0FBa0MsQ0FBYTs7a0JBR25ELFVBQUMsT0FBTztTQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFlBQU07O0FBRXhFLGNBQVcsQ0FBRSxPQUFPLENBQUMsQ0FBQztBQUN0QixlQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7OztBQUd0QixZQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQUUsV0FBTyxVQUFDLEVBQUUsRUFBRSxFQUFFO1lBQU0sRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxLQUFLO0tBQUM7SUFBRTtBQUN4RixZQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO0FBQ3BCLFFBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxFQUFFO0FBQUUsT0FBRSxHQUFHLENBQUMsVUFBQyxDQUFDO2FBQUssVUFBQyxDQUFDO2NBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUFBO09BQUEsQ0FBRSxFQUFFLENBQUM7S0FBRTtBQUM3RCxXQUFPLFVBQUMsRUFBRSxFQUFFLEVBQUU7WUFBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRixFQUFFLEVBQUUsRUFBRSxFQUFGLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7S0FBQSxDQUFDO0lBQ3ZGOzs7QUFHRCxVQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTTthQUFRLElBQUk7MkJBQUosSUFBSTs7Ozs7OztjQUFKLElBQUk7O1dBQUosSUFBSTtNQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUksQ0FBQztBQUN0RSxVQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSzthQUFRLEdBQUc7MkJBQUgsR0FBRzs7Ozs7OztjQUFILEdBQUc7O3lCQUFILEdBQUc7QUFFeEMsaUJBQVk7OzthQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUFFLGNBQU8sTUFBTSxZQUFZLGNBQWMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7T0FBRTs7OztBQUMvRixZQUFPO2FBQUEsaUJBQUMsTUFBTSxFQUFFO0FBQUUsYUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRztPQUFFOzs7Ozs7V0FITixHQUFHO01BQVMsT0FBTyxDQUFDLEtBQUssRUFJN0QsQ0FBQztBQUNILFVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRO2FBQVEsTUFBTTsyQkFBTixNQUFNOzs7Ozs7O2NBQU4sTUFBTTs7eUJBQU4sTUFBTTtBQUM5QyxpQkFBWTthQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUFFLGNBQU8sTUFBTSxZQUFZLGNBQWMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7T0FBRTs7OztBQUM3RixZQUFPO2FBQUEsaUJBQUMsTUFBTSxFQUFFO0FBQUUsYUFBTSxVQUFPLEVBQUU7T0FBRTs7Ozs7O1dBRkssTUFBTTtNQUFTLE9BQU8sQ0FBQyxLQUFLLEVBR25FLENBQUM7QUFDSCxVQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUTthQUFRLE1BQU07MkJBQU4sTUFBTTs7Ozs7OztjQUFOLE1BQU07O3lCQUFOLE1BQU07QUFDOUMsaUJBQVk7YUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFBRSxjQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUFFOzs7Ozs7V0FEbkIsTUFBTTtNQUFTLE9BQU8sQ0FBQyxLQUFLLEVBRW5FLENBQUM7QUFDSCxVQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUzthQUFRLE9BQU87MkJBQVAsT0FBTzs7Ozs7OztjQUFQLE9BQU87O3lCQUFQLE9BQU87QUFDaEQsaUJBQVk7YUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFBRSxjQUFPLE1BQU0sWUFBWSxjQUFjLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO09BQUU7Ozs7QUFDN0YsWUFBTzthQUFBLGlCQUFDLE1BQU0sRUFBRTtBQUFFLGFBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUc7T0FBRTs7Ozs7O1dBRkYsT0FBTztNQUFTLE9BQU8sQ0FBQyxLQUFLLEVBR3JFLENBQUM7QUFDSCxVQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUTthQUFRLE1BQU07MkJBQU4sTUFBTTs7Ozs7OztjQUFOLE1BQU07O3lCQUFOLE1BQU07QUFDOUMsaUJBQVk7YUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFBRSxjQUFPLE1BQU0sWUFBWSxjQUFjLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO09BQUU7Ozs7QUFDN0YsWUFBTzthQUFBLGlCQUFDLE1BQU0sRUFBRTtBQUFFLGFBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO09BQUU7Ozs7OztXQUZqQixNQUFNO01BQVMsT0FBTyxDQUFDLEtBQUssRUFHbkUsQ0FBQzs7O0FBR0gsVUFBTyxDQUFDLGNBQWMsQ0FBRSxVQUFDLEVBQUUsRUFBRSxFQUFFO1dBQUssRUFBRSxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSTtJQUFBLEVBQUUsVUFBQyxFQUFFLEVBQUUsRUFBRTtXQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUU7SUFBQSxDQUFFLENBQUM7QUFDL0YsVUFBTyxDQUFDLGNBQWMsQ0FBRSxVQUFDLEVBQUUsRUFBRSxFQUFFO1dBQUssRUFBRSxZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSTtJQUFBLEVBQUUsVUFBQyxFQUFFLEVBQUUsRUFBRTtXQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUU7SUFBQSxDQUFFLENBQUM7OztBQUcvRixVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDOzs7QUFHdkYsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBaUIsQ0FBQztBQUM1RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUssUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFpQixDQUFDO0FBQzVFLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFO0lBQUEsQ0FBQyxDQUFFLENBQUM7OztBQUc1RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFhLENBQUM7QUFDeEUsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtXQUFNLEVBQUU7SUFBQSxDQUFDLENBQUUsQ0FBQztBQUN4RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFhLENBQUM7OztBQUd4RSxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRTtJQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU0sU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRTtJQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQW1DLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtXQUFNLEVBQUU7SUFBQSxDQUFDLENBQW9CLENBQUM7OztBQUdoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQU0sUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtXQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQUEsQ0FBQyxDQUFFLENBQUM7QUFDaEcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsUUFBUSxFQUFHLFFBQVEsQ0FBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBbUMsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRTtJQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUNoRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUcsUUFBUSxDQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRztRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxXQUFDO1lBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBO0lBQUEsQ0FBQyxDQUFJLENBQUM7O0dBR2hHLENBQUM7RUFBQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDekVLLENBQUMsdUNBQTZDLENBQVk7O3FDQUNaLENBQWM7O0tBQTNELGNBQWMsYUFBZCxjQUFjO0tBQUUsY0FBYyxhQUFkLGNBQWM7S0FBRSxFQUFFLGFBQUYsRUFBRTtLQUFFLEVBQUUsYUFBRixFQUFFOztLQUN2QyxxQkFBcUIsdUNBQXlCLEVBQXNCOztLQUNwRSxXQUFXLHVDQUFtQyxFQUFZOztrQkFHbEQsVUFBQyxPQUFPO1NBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQU07O0FBRXBFLHdCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGNBQVcsQ0FBVyxPQUFPLENBQUMsQ0FBQzs7O0FBSS9CLFlBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFBRSxXQUFPLFVBQUMsRUFBRSxFQUFFLEVBQUU7WUFBTSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUs7S0FBQztJQUFFO0FBQ3hGLFlBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDcEIsUUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7QUFBRSxPQUFFLEdBQUcsQ0FBQyxVQUFDLENBQUM7YUFBSyxVQUFDLENBQUM7Y0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQUE7T0FBQSxDQUFFLEVBQUUsQ0FBQztLQUFFO0FBQzdELFdBQU8sVUFBQyxFQUFFLEVBQUUsRUFBRTtZQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFGLEVBQUUsRUFBRSxFQUFFLEVBQUYsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztLQUFBLENBQUM7SUFDdkY7OztBQUlELFVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzNCLGFBRG1DLFlBQVk7dUNBQzNDLElBQUk7QUFBSixVQUFJOzs7MkJBRDJCLFlBQVk7O0FBRXpELGdDQUY2QyxZQUFZLDhDQUVoRCxJQUFJLEVBQUU7QUFDZixTQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxFQUFFLENBQUM7S0FDaEY7O2NBSjZDLFlBQVk7O3lCQUFaLFlBQVk7QUFLMUQsVUFBSzthQUFBLGlCQUFHO0FBQ1AsV0FBSSxNQUFNLDhCQU5tQyxZQUFZLHNDQU0vQixDQUFDO0FBQzNCLGFBQU0sQ0FBQyxNQUFNLGdDQUFPLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQztBQUNqQyxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7O0FBQ0QsaUJBQVk7YUFBQSxzQkFBQyxNQUFNLEVBQUU7QUFBRSxjQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUFFOzs7O0FBQ3hGLFlBQU87YUFBQSxpQkFBQyxNQUFNLEVBQUU7QUFDZixXQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLFdBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFxQjtZQUFuQixNQUFNLFFBQU4sTUFBTTtZQUFFLEtBQUssUUFBTCxLQUFLOztBQUNsQyxnQkFBUSxNQUFNO0FBQ2QsY0FBSyxTQUFTO0FBQUU7QUFDZixjQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQ2xCLE1BQU07QUFDUixjQUFLLFFBQVE7QUFBRTs7OztBQUlkLGVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxjQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FDOUIsTUFBTTtBQUNSLGNBQUssUUFBUTtBQUFFO0FBQ2QsY0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUNmLE1BQU07QUFBQSxTQUNQO1FBQ0QsQ0FBQyxDQUFDO09BQ0g7Ozs7QUFDRyxZQUFPO1dBQUEsWUFBRztBQUFFLGNBQU8sRUFBRTtPQUFFOzs7OztXQS9CbUIsWUFBWTtNQUFTLE9BQU8sQ0FBQyxLQUFLLEVBZ0MvRSxDQUFDOzs7QUFJSCxVQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQUs7V0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUM7SUFBQSxDQUFDLENBQUM7QUFDM0csVUFBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUcsVUFBQyxLQUFLO1dBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDO0lBQUEsQ0FBQyxDQUFDO0FBQzNHLFVBQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFHLFVBQUMsS0FBSztXQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFHLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBQzs7O0FBSTNHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBVyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFNO1FBQUUsRUFBRSxRQUFGLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtXQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0lBQUEsQ0FBQyxDQUFFLENBQUM7QUFDMUcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsU0FBUyxFQUFPLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFBQSxDQUFDLENBQUUsQ0FBQztBQUMxRyxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFtQyxDQUFDO0FBQzFHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFO0lBQUEsQ0FBQyxDQUFvQixDQUFDO0FBQzFHLFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsRUFBRSxVQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUs7QUFDdEUsV0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSw4QkFBSyxFQUFFLENBQUMsTUFBTSxzQkFBSyxFQUFFLENBQUMsTUFBTSxHQUFFLENBQUM7SUFDcEUsQ0FBQyxDQUFDOzs7OztHQU1ILENBQUM7RUFBQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDM0VLLENBQUMsdUNBQTBCLENBQVk7O0tBQ3RDLGNBQWMsdUJBQVksQ0FBYyxFQUF4QyxjQUFjOztLQUNmLHFCQUFxQix1Q0FBTSxFQUFzQjs7S0FDakQsV0FBVyx1Q0FBZ0IsRUFBWTs7a0JBRy9CLFVBQUMsT0FBTztTQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQU07O0FBR3ZFLHdCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGNBQVcsQ0FBVyxPQUFPLENBQUMsQ0FBQzs7O0FBSS9CLFlBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFBRSxXQUFPLFVBQUMsRUFBRSxFQUFFLEVBQUU7WUFBTSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUs7S0FBQztJQUFFO0FBQ3hGLFlBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDcEIsUUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7QUFBRSxPQUFFLEdBQUcsQ0FBQyxVQUFDLENBQUM7YUFBSyxVQUFDLENBQUM7Y0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQUE7T0FBQSxDQUFFLEVBQUUsQ0FBQztLQUFFO0FBQzdELFdBQU8sVUFBQyxFQUFFLEVBQUUsRUFBRTtZQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsRUFBRSxFQUFGLEVBQUUsRUFBRSxFQUFFLEVBQUYsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztLQUFBLENBQUM7SUFDdkY7OztBQUlELFVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUI7QUFDOUIsYUFEc0MsZUFBZTt1Q0FDakQsSUFBSTtBQUFKLFVBQUk7OzsyQkFEOEIsZUFBZTs7QUFFL0QsZ0NBRmdELGVBQWUsOENBRXRELElBQUksRUFBRTtBQUNmLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFJLEVBQUUsQ0FBQztLQUNoRjs7Y0FKZ0QsZUFBZTs7eUJBQWYsZUFBZTtBQUtoRSxVQUFLO2FBQUEsaUJBQUc7QUFDUCxXQUFJLE1BQU0sOEJBTnNDLGVBQWUsc0NBTXJDLENBQUM7QUFDM0IsYUFBTSxDQUFDLE1BQU0sZ0NBQU8sSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO0FBQ2pDLGNBQU8sTUFBTSxDQUFDO09BQ2Q7Ozs7QUFDRCxpQkFBWTthQUFBLHNCQUFDLE1BQU0sRUFBRTtBQUNwQixjQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLEtBQ3BFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLE1BQU0sWUFBWSxjQUFjLENBQUMsQ0FBQztPQUNwRjs7OztBQUNELFlBQU87YUFBQSxpQkFBQyxNQUFNLEVBQUU7QUFDZixXQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO0FBQ25ELFlBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDOUIsWUFBSSxLQUFLOzs7Ozs7Ozs7O1dBQUcsWUFBbUI7OzsyQ0FBTixJQUFJO0FBQUosY0FBSTs7O0FBQzVCLGFBQUksTUFBTSxDQUFDO0FBQ1gsY0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUUsRUFBSztBQUN4QyxnQkFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLFFBQU8sSUFBSSxDQUFDLENBQUM7VUFDOUIsQ0FBQyxDQUFDOztBQUVILGdCQUFPLE1BQU0sQ0FBQztTQUNkLEVBQUM7QUFDRixhQUFLLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxZQUFtQjsyQ0FBTixJQUFJO0FBQUosY0FBSTs7O0FBQUksbUJBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztTQUFFLENBQUMsQ0FBQztBQUNqRixjQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQjtBQUNELFdBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7QUFDMUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQXFCO1lBQW5CLE1BQU0sUUFBTixNQUFNO1lBQUUsS0FBSyxRQUFMLEtBQUs7O0FBQ2xDLGdCQUFRLE1BQU07QUFDYixjQUFLLFNBQVM7QUFBRTtBQUNmLGNBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDbEIsTUFBTTtBQUNSLGNBQUssUUFBUTtBQUFFOzs7O0FBSWQsZUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELGNBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztXQUM5QixNQUFNO0FBQ1IsY0FBSyxRQUFRO0FBQUU7QUFDZCxjQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQ2YsTUFBTTtBQUFBLFNBQ1I7UUFDRCxDQUFDLENBQUM7T0FDSDs7OztBQUNHLFlBQU87V0FBQSxZQUFHO0FBQUUsY0FBTyxFQUFFO09BQUU7Ozs7O1dBL0NzQixlQUFlO01BQVMsT0FBTyxDQUFDLEtBQUssRUFnRHJGLENBQUM7OztBQUlILFVBQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBSztXQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBQztBQUM5RyxVQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRyxVQUFDLEtBQUs7V0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRyxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUM7SUFBQSxDQUFDLENBQUM7QUFDOUcsVUFBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUcsVUFBQyxLQUFLO1dBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUcsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDO0lBQUEsQ0FBQyxDQUFDOzs7QUFJOUcsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFjLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBTTtRQUFFLEVBQUUsUUFBRixFQUFFO1FBQUUsRUFBRSxRQUFGLEVBQUU7V0FBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUFBLENBQUMsQ0FBRSxDQUFDO0FBQ2hILFVBQU8sQ0FBQyxjQUFjLENBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBVSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFBRSxFQUFFLFFBQUYsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFBQSxDQUFDLENBQUUsQ0FBQztBQUNoSCxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQW1DLENBQUM7QUFDaEgsVUFBTyxDQUFDLGNBQWMsQ0FBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUFFLEVBQUUsUUFBRixFQUFFO1dBQU0sRUFBRTtJQUFBLENBQUMsQ0FBb0IsQ0FBQztBQUNoSCxVQUFPLENBQUMsY0FBYyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLFVBQUMsRUFBRSxFQUFFLEVBQUUsRUFBSztBQUM1RSxXQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLDhCQUFLLEVBQUUsQ0FBQyxNQUFNLHNCQUFLLEVBQUUsQ0FBQyxNQUFNLEdBQUUsQ0FBQztJQUN2RSxDQUFDLENBQUM7Ozs7O0dBTUgsQ0FBQztFQUFBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0M1RkssT0FBTyx1Q0FBTSxDQUFVOzs7O0tBR3ZCLENBQUMsdUNBQTRCLENBQVk7O0tBQ3pDLElBQUksdUNBQXlCLENBQVk7O0tBQ3pDLFlBQVksdUNBQWlCLENBQWE7O0tBQzFDLFdBQVcsdUNBQWtCLEVBQVk7O0tBQ3hDLHFCQUFxQix1QkFBTyxDQUFhLEVBQXpDLHFCQUFxQjs7a0JBR2QsVUFBQyxPQUFPO1NBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQU07O0FBRWxFLGVBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QixjQUFXLENBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXRCLFVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZO0FBRXpCLGFBRmlDLFVBQVU7dUNBRXZDLElBQUk7QUFBSixVQUFJOzs7MkJBRnlCLFVBQVU7O0FBR3JELGdDQUgyQyxVQUFVLDhDQUc1QyxJQUFJLEVBQUU7QUFDZixTQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7S0FDM0I7O2NBTDJDLFVBQVU7O3lCQUFWLFVBQVU7QUFPdEQsVUFBSzthQUFBLGlCQUFHO0FBQ1AsV0FBSSxNQUFNLDhCQVJpQyxVQUFVLHNDQVEzQixDQUFDO0FBQzNCLGFBQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNsQyxhQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUs7QUFDdEMsY0FBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQztBQUNILGNBQU8sTUFBTSxDQUFDO09BQ2Q7Ozs7QUFFRCxZQUFPO2FBQUEsaUJBQUMsTUFBTSxFQUFnQjtXQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFDM0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFLO0FBQzVDLGdCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7T0FDSDs7OztBQU1ELGFBQVE7Ozs7Ozs7YUFBQSxvQkFBZTtXQUFkLE9BQU8sZ0NBQUcsRUFBRTs7QUFDcEIsV0FBSSxHQUFHLDhCQTNCb0MsVUFBVSwwQ0EyQjVCLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLFdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDakMsWUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFlBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBSztBQUN6QyxlQUFNLFVBQVEsSUFBSSxVQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQUksQ0FBQztTQUNuRCxDQUFDLENBQUM7QUFDSCxXQUFHLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDO0FBQ0QsY0FBTyxHQUFHLENBQUM7T0FDWDs7OztBQUFBOzs7Ozs7V0FwQzJDLFVBQVU7TUFBUyxPQUFPLENBQUMsS0FBSztBQTBDakUsYUFGSCxlQUFlO3VDQUVSLElBQUk7QUFBSixVQUFJOzs7MkJBRlgsZUFBZTs7QUFHdEIsZ0NBSE8sZUFBZSw4Q0FHYixJQUFJLEVBQUU7QUFDZixTQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN4QixTQUFJLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDO0tBQ3RDOztjQU5PLGVBQWU7O3lCQUFmLGVBQWU7QUFZdkIsMEJBQXFCOzs7Ozs7O2FBQUEsaUNBQWE7eUNBQVQsT0FBTztBQUFQLGVBQU87Ozs7O0FBRy9CLFdBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixVQUFHO0FBQ0YsWUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUFFLGVBQU0sSUFBSSxLQUFLLHdFQUF3RTtTQUFFO0FBQ3JILFlBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixZQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtBQUM1QixhQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUFFLGlCQUFPLENBQUMsSUFBSSxHQUFHLEdBQUc7VUFBTSxNQUMxQjtBQUFFLGlCQUFPLENBQUMsSUFBSSxHQUFHLEdBQUc7VUFBTTtTQUM3QyxNQUFzQjtBQUFFLFVBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztTQUFFO1FBQ2pELFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUN6QyxjQUFPLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDbEM7Ozs7QUFPRCxpQkFBWTs7Ozs7Ozs7YUFBQSxzQkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1dBQ3ZCLElBQUksR0FBbUIsT0FBTyxDQUE5QixJQUFJO1dBQUUsSUFBSSxHQUFhLE9BQU8sQ0FBeEIsSUFBSTtXQUFFLE9BQU8sR0FBSSxPQUFPLENBQWxCLE9BQU87OztBQUd4QixXQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzVDLFlBQUksT0FBTyxhQUFDO0FBQ1osWUFBSSxPQUFPLEVBQUU7QUFBRSxnQkFBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUcsSUFBSSxFQUFhLE9BQU8sQ0FBOEI7U0FBRSxNQUN6RjtBQUFFLGdCQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsYUFBWSxJQUFJLEVBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBRTtTQUFFO0FBQ3RHLFlBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLFNBQVksQ0FBQyxFQUFFO0FBQ3JDLGdCQUFPLE1BQUcsQ0FBQyxPQUFPLFNBQVksQ0FBQyxDQUFDO0FBQ2hDLGdCQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDcEQ7QUFDRCxZQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxTQUFZLENBQUMsRUFBRTtBQUNyQyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFNBQVksQ0FBQyxDQUFDO1NBQ3JDO0FBQ0QsWUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtBQUNuQyxjQUFLLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDO1NBQ3JDO0FBQ0QsWUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNqRDs7O0FBR0QsV0FBSSxZQUFZLENBQUM7QUFDakIsV0FBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2QsWUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDNUQsWUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDdEUsb0JBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRCxNQUFNO0FBQ04sb0JBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQzs7O0FBR0QsV0FBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDOUIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkM7OztBQUdELGNBQU8sWUFBWSxDQUFDO09BQ3BCOzs7O0FBT0QsVUFBSzs7Ozs7Ozs7YUFBQSxpQkFBRzs7O0FBQ1AsV0FBSSxNQUFNLDhCQTlFSCxlQUFlLHNDQThFSSxDQUFDO0FBQzNCLGFBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckIsV0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUNsQyxZQUFJLE9BQU8sR0FBRyxNQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR3ZDLFlBQUksS0FBSyxHQUFHLE1BQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLGNBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs7O0FBR3BDLHFDQUFLLE9BQU8sU0FBWSxJQUFFLEVBQUUsc0JBQUssT0FBTyxNQUFTLElBQUUsRUFBRSxzQkFBSyxPQUFPLFNBQVksSUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ3hHLGVBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2QyxhQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7QUFDNUIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGdCQUFNLElBQUkscUJBQXFCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1VBQy9DO1NBQ0QsQ0FBQyxDQUFDOzs7QUFHSCxZQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBSywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7QUFDMUUsY0FBSyxDQUFDLG9CQUFvQixHQUFHLE1BQUssMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEU7UUFFRCxDQUFDLENBQUM7QUFDSCxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7Ozs7V0F2R08sZUFBZTtNQUFTLE9BQU8sQ0FBQyxjQUFjLEVBeUdyRCxDQUFDOzs7OztBQU1ILFVBQU8sQ0FBQyxjQUFjLENBQUMsVUFBQyxFQUFFLEVBQUUsRUFBRTtXQUM3QixFQUFFLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQ3RDLEVBQUUsWUFBWSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVU7SUFDdEMsRUFBRSxVQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUs7QUFDZCxRQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUMsVUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLFVBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqQyxVQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUIsV0FBTyxNQUFNLENBQUM7SUFDZCxDQUFDLENBQUM7R0FFSCxDQUFDO0VBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDakxLLENBQUMsdUNBQU0sQ0FBVzs7S0FDakIsaUJBQWlCLHVCQUFPLENBQVksRUFBcEMsaUJBQWlCOztrQkFFVixVQUFDLE9BQU8sRUFBSztBQUMzQixHQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBTTs7O0FBR3BDLFlBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQ2hDLFNBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLFNBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQUk7WUFBSSxJQUFJLFlBQVksT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7S0FBQSxDQUFDLENBQUM7QUFDOUUsV0FBTyxLQUFLLENBQUM7SUFDYjs7O0FBSUQsT0FBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsT0FBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFlBQVMsTUFBTSxDQUFDLE9BQU8sRUFBaUI7UUFBZixRQUFRLGdDQUFHLEVBQUU7O0FBQ3JDLHdCQUFvQixHQUFHLElBQUksQ0FBQztBQUM1QixRQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDdEIsY0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztLQUMxQixNQUFNLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRSxFQUU5QixNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtBQUNqQyxNQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNEO0FBQ0QsWUFBUyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRTtBQUM1QyxvQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDbEQsV0FBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7SUFDSDs7O0FBSUQsT0FBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLE9BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixZQUFTLFVBQVUsQ0FBQyxPQUFPLEVBQWlCO1FBQWYsUUFBUSxnQ0FBRyxFQUFFOztBQUN6Qyx3QkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDNUIsUUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLGFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDMUIsTUFBTSxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsRUFFN0IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEMsTUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDdkQ7SUFDRDtBQUNELFlBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUU7QUFDL0Msb0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ2xELGVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0IsQ0FBQyxDQUFDO0lBQ0g7OztBQUlELE9BQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQ2pDLFlBQVMsaUJBQWlCLEdBQUc7QUFDNUIsUUFBSSxDQUFDLG9CQUFvQixFQUFFO0FBQUUsWUFBTTtLQUFFO0FBQ3JDLHdCQUFvQixHQUFHLEtBQUssQ0FBQzs7O0FBRzdCLFFBQUksZ0JBQWdCLENBQUM7QUFDckIsT0FBRztBQUNGLHFCQUFnQixHQUFHLEtBQUssQ0FBQztBQUN6QixXQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXLEVBQUs7QUFDdEQsVUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTs7QUFFNUIsV0FBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQUUsaUJBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLO1FBQUU7QUFDN0UsV0FBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQUk7ZUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQUk7Z0JBQUksU0FBUyxDQUFDLElBQUksQ0FBQztTQUFBLENBQUM7UUFBQSxDQUFDLEVBQUU7QUFDL0UsaUJBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDOUIsd0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCO09BQ0Q7TUFDRCxDQUFDLENBQUM7S0FDSCxRQUFRLGdCQUFnQixFQUFFOzs7QUFHM0IsVUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBVyxFQUFLOztBQUV0RCxhQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxjQUFJO2FBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFJO2NBQUksU0FBUyxDQUFDLElBQUksQ0FBQztPQUFBLENBQUM7TUFBQSxDQUFDLENBQUM7S0FDdkcsQ0FBQyxDQUFDO0lBQ0g7Ozs7O0FBTUQsVUFBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsT0FBTyxDQUFDLElBQUksRUFBZ0I7OztRQUFkLE9BQU8sZ0NBQUcsRUFBRTs7O0FBRy9ELFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7QUFHdkIsVUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFDeEMsV0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3hDLENBQUMsQ0FBQztJQUVILDBCQUFFO0FBV0YsVUFBTSxvQkFBRztBQUFFLFNBQUksTUFBRyxDQUFDLElBQUksQ0FBQztLQUFFO0lBQzFCO0FBWEksWUFBUTtVQUFBLFlBQUc7QUFDZCx1QkFBaUIsRUFBRSxDQUFDO0FBQ3BCLFVBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDakQsYUFBTSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2xDO0FBQ0QsYUFBTyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzVCOzs7O0FBQ0csYUFBUztVQUFBLFlBQUs7QUFBRSxhQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQXNCOzs7O0FBQzNELGVBQVc7VUFBQSxZQUFHO0FBQUUsYUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7TUFBRTs7OztBQUMzRCxjQUFVO1VBQUEsWUFBSTtBQUFFLGFBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO01BQUU7Ozs7TUFFOUQsQ0FBQzs7O0FBSUgsT0FBTSxtQkFBbUIsR0FBRyxDQUMzQixDQUFFLElBQUksRUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBYztBQUN0RCxJQUFFLFFBQVEsRUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUEwQjtBQUN0RCxJQUFFLFNBQVMsRUFBSyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBYTtBQUN0RCxJQUFFLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFzQjtBQUN0RCxJQUFFLEtBQUssRUFBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUU7SUFDdEQsQ0FBQztBQUNGLFVBQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUU7OztBQUM1RCx1QkFBbUIsQ0FBQyxPQUFPLENBQUMsZ0JBQWtCOzs7U0FBaEIsQ0FBQztTQUFFLE9BQU87O0FBQ3ZDLFNBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtBQUNmLGFBQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFBRSxhQUFNLENBQUMsTUFBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO09BQUUsQ0FBQyxDQUFDO01BQzFEO0tBQ0QsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztBQUNGLHNCQUFtQixDQUFDLE9BQU8sQ0FBQyxnQkFBWTs7O1FBQVYsSUFBSTs7QUFDakMsV0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDbEQsU0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDNUIsQ0FBQztJQUNGLENBQUMsQ0FBQzs7O0FBSUgsVUFBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7R0FFdEIsQ0FBQyxDQUFDO0FBQ0gsR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFNOztBQUVoRCxJQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFOzs7Ozs7QUFNdkMsY0FBVSxzQkFBQyxJQUFJLEVBQWdCO1NBQWQsT0FBTyxnQ0FBRyxFQUFFOzs7QUFFNUIsTUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsZ0NBQ2IsSUFBSSx1QkFBb0IsQ0FBQzs7O0FBR3ZELFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsQ0FBQyxDQUFDO0dBRUgsQ0FBQyxDQUFDO0VBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQzlKTSxDQUFDLHVDQUFNLENBQVc7O0tBQ2xCLGdCQUFnQix1Q0FBTSxFQUE0Qjs7a0JBRTFDLFVBQUMsT0FBTyxFQUFLO0FBQzNCLEdBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFlBQU07O0FBRTVDLG1CQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUxQixVQUFPLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFHLEVBQUUsQ0FBQztHQUUvRCxDQUFDLENBQUM7QUFDSCxHQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsWUFBTTs7QUFFeEQsSUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTs7Ozs7Ozs7QUFRdkMsTUFBRSxjQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDYixTQUFJLElBQUksdUJBQU0sSUFBSSxFQUFHLEdBQUcsQ0FBRSxDQUFDO0FBQzNCLFNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQzNDLHdCQUFrQixFQUFFLElBQUk7TUFDeEIsQ0FBQyxDQUFDO0FBQ0gsWUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEI7Ozs7Ozs7Ozs7QUFVRCxVQUFFLGVBQVU7Ozt1Q0FBTixJQUFJO0FBQUosVUFBSTs7O0FBQ1QsWUFBTyx3QkFBSSxDQUFDLGdCQUFnQixhQUFHLG9CQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFLLElBQUksRUFBQyxDQUFDO0tBQzVEOztJQUVELENBQUMsQ0FBQztHQUVILENBQUMsQ0FBQztFQUNILEM7Ozs7Ozs7Ozs7Ozs7O0tDNUNNLENBQUMsdUNBQU0sQ0FBVzs7a0JBR1YsVUFBQyxPQUFPLEVBQUs7QUFDM0IsR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsWUFBTTs7QUFFbEQsSUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsMEJBQUUsRUFTakM7QUFOSSx3QkFBb0I7VUFEQSxZQUFHO0FBQUUsYUFBTyxJQUFJLENBQUMscUJBQXFCO01BQUU7VUFDeEMsVUFBQyxFQUFFLEVBQUU7QUFBRSxVQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRTtNQUFFOzs7O0FBRTVELFlBQVE7VUFBQSxZQUFHO0FBQ2QsYUFBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7TUFDdEY7Ozs7TUFFQSxDQUFDO0dBRUgsQ0FBQyxDQUFDO0FBQ0gsR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLHdCQUF3QixFQUFFLFlBQU07O0FBRTlELElBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7O0FBRXZDLFVBQU0sb0JBQWM7Ozt1Q0FBVixRQUFRO0FBQVIsY0FBUTs7O0FBQ2pCLGFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDN0IsVUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7QUFDM0Isc0JBQUssTUFBTSxnQ0FBSSxPQUFPLEVBQUMsQ0FBQztPQUN4QixNQUFNO0FBQ04sYUFBSyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7T0FDaEM7TUFDRCxDQUFDLENBQUM7S0FDSDs7SUFFRCxDQUFDLENBQUM7R0FFSCxDQUFDLENBQUM7RUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDbkNNLE9BQU8sdUNBQU0sQ0FBVTs7OztLQUl2QixDQUFDLHVDQUFpQyxDQUFZOztLQUM5QyxJQUFJLHVDQUE4QixDQUFZOztLQUM5QyxXQUFXLHVDQUF1QixDQUFZOztLQUM5QyxnQkFBZ0IsdUNBQWtCLENBQWlCOztLQUNsRCwwQkFBMEIsdUJBQU8sQ0FBYSxFQUE5QywwQkFBMEI7Ozs7Ozs7O2tCQVVuQixVQUFDLE9BQU87U0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBTTs7QUFFN0QsY0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVyQixVQUFPLENBQUMsS0FBSztBQUVELGFBRlUsS0FBSzs2Q0FFSSxFQUFFOztTQUFuQixNQUFNLFFBQU4sTUFBTTtTQUFFLEtBQUssUUFBTCxLQUFLOzsyQkFGTCxLQUFLOztBQUd6QixTQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixTQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNwQjs7eUJBTm9CLEtBQUs7QUFRMUIsVUFBSzthQUFBLGlCQUFHO0FBQUUsY0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO09BQUU7Ozs7QUFFM0IsV0FBTTtXQUFBLFlBQUc7QUFBRSxjQUFPLElBQUksQ0FBQyxPQUFPO09BQUU7OztBQUVwQyxlQUFVO2FBQUEsc0JBQUc7QUFBRSxXQUFJLENBQUMsT0FBTyxHQUFHLEtBQUs7T0FBRTs7Ozs7O1dBWmhCLEtBQUs7T0FjMUIsQ0FBQzs7Ozs7O09BT0ksVUFBVTthQUFWLFVBQVU7MkJBQVYsVUFBVTs7Ozs7OztjQUFWLFVBQVU7O1dBQVYsVUFBVTtNQUFTLE9BQU8sQ0FBQyxLQUFLOztBQUN0QyxVQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7Ozs7QUFPaEMsVUFBTyxDQUFDLGNBQWM7Ozs7O0FBS1YsYUFMbUIsY0FBYztTQUtoQyxPQUFPLGdDQUFHLEVBQUU7OzJCQUxNLGNBQWM7O0FBTTNDLGdDQU42QixjQUFjLDZDQU1yQyxPQUFPLEVBQUU7QUFDZixTQUFJLENBQUMsT0FBTyxHQUFTLEVBQUUsQ0FBQztBQUN4QixTQUFJLENBQUMsU0FBUyxHQUFPLElBQUksQ0FBQztBQUMxQixTQUFJLENBQUMsU0FBUyxHQUFPLEVBQUUsQ0FBQztBQUN4QixTQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUN4Qjs7Y0FYNkIsY0FBYzs7eUJBQWQsY0FBYztBQWtJckMsc0JBQWlCOzs7Ozs7Ozs7Ozs7YUFBQSwyQkFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3RDLHVCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLFdBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBTztlQUFJLE9BQU8scUNBQUksSUFBSSxFQUFDO1FBQUEsQ0FBQyxDQUFDO0FBQ2hHLFdBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDM0IsZUFBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsTUFBTTs7QUFDTixlQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0M7T0FDRDs7OztBQU9NLG1CQUFjOzs7Ozs7O2FBQUEsd0JBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTs7O0FBR3RDLFdBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQzVELGVBQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFlBQW1COzJDQUFOLElBQUk7QUFBSixjQUFJOzs7QUFDM0QsZ0JBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUIsQ0FBQztRQUNGOzs7QUFHRCxRQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BRXJFOzs7OztBQS9JRCxlQUFVO2FBQUEsc0JBQUc7OztBQUNaLGFBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUM1QyxlQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUM7QUFDSCxrQ0FsQjZCLGNBQWMsNENBa0J4QjtPQUNuQjs7OztBQUdELGtCQUFhO2FBQUEsdUJBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTs7QUFFekIsV0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR25DLFdBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDL0QsV0FBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7QUFHcEQsV0FBSSxPQUFPLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUNoRCxLQUFLLFlBQWMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQUUsZUFBTyxPQUFPO1FBQUU7OztBQUdsRSxXQUFJLE9BQU8sRUFBRTtBQUFFLGVBQU8sQ0FBQyxVQUFVLEVBQUU7UUFBRTs7O0FBR3JDLFdBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLGNBQU8sS0FBSyxDQUFDO09BQ2I7Ozs7QUFHRCxjQUFTO2FBQUEscUJBQUc7QUFBRSxjQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztPQUFFOzs7O0FBR2xELGlCQUFZO2FBQUEsc0JBQUMsR0FBRyxFQUFFO0FBQUUsY0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO09BQUU7Ozs7QUFHckQsZUFBVTthQUFBLG9CQUFDLEdBQUcsRUFBRTtBQUFFLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztPQUFFOzs7O0FBR2pGLGVBQVU7YUFBQSxvQkFBQyxHQUFHLEVBQUU7OztBQUNmLGNBQU8seUJBQU8sQ0FBQyxLQUFLLEVBQUMsUUFBUSwwQ0FDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBSztlQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7UUFBQSxDQUFDLEVBQ3JELENBQUM7T0FDRjs7Ozs7YUFHQyxlQUFZO3lDQUFSLE1BQU07QUFBTixjQUFNOzs7O0FBRVgsV0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFBRSxjQUFNLElBQUksMEJBQTBCLEVBQUU7UUFBRTs7Ozs7QUFLNUQsV0FBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxhQUFNLENBQUMsT0FBTyxnQ0FBUyxJQUFJLENBQUMsT0FBTyxHQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELGFBQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNsQyxjQUFPLE1BQU0sQ0FBQztPQUNkOzs7O0FBR0QsUUFBRzthQUFBLGFBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTs7OztBQUVuQixXQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUFFLGNBQU0sSUFBSSwwQkFBMEIsRUFBRTtRQUFFOzs7OzBDQUd0QyxZQUFJLEVBQUMscUJBQXFCLGdDQUFJLElBQUksQ0FBQyxPQUFPLDRCQUFLLE1BQU0sR0FBQzs7V0FBdkUsT0FBTyxnQ0FBUCxPQUFPO1dBQUUsSUFBSSxnQ0FBSixJQUFJOzs7QUFHbEIsV0FBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQ3JDLGVBQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDOzs7QUFHRCxXQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRSxXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzlDLGNBQVEsS0FBSyxZQUFZLE9BQU8sQ0FBQyxjQUFjLEdBQUksS0FBSyxHQUFHLElBQUksQ0FBQztPQUNoRTs7OztBQVdELDBCQUFxQjs7Ozs7Ozs7Ozs7YUFBQSxpQ0FBRztBQUN2QixhQUFNLElBQUksS0FBSyxzRkFBc0YsQ0FBQztPQUN0Rzs7OztBQVlELGlCQUFZOzs7Ozs7Ozs7Ozs7YUFBQSx3QkFBRztBQUNkLGFBQU0sSUFBSSxLQUFLLDZFQUE2RSxDQUFDO09BQzdGOzs7Ozs7V0F0SDZCLGNBQWM7TUFBUyxPQUFPLENBQUMsS0FBSyxDQStKbEUsQ0FBQzs7OztBQUlGLElBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7OztBQU1qQyxVQUFFLGVBQVU7Ozt1Q0FBTixJQUFJO0FBQUosVUFBSTs7O0FBQ1QsU0FBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDeEMsU0FBSSxDQUFDLFVBQVUsRUFBRTtBQUNoQixZQUFNLElBQUksS0FBSyxrQ0FBZ0MsSUFBSSxDQUFDLElBQUksc0NBQW1DLENBQUM7TUFDNUY7QUFDRCxZQUFPLFlBQUksVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQUcsT0FBSSxJQUFJLENBQUMsQ0FBQztLQUNuRDs7SUFFRCxDQUFDLENBQUM7R0FFSCxDQUFDO0VBQUEsQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkNTY1ZTViZGM3Y2RiYzVmMWZiZFxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLCBDb25zdHJhaW50RmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkRGVsdGFDb25mbGljdCxcbiAgICAgICAgICAgICAgICAgICAgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJ2YXIgVSA9IHtcblxuXHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqMTtcblx0fSxcblxuXHRkZWZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHRcdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdFx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdFx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHRcdHZhciBsYXN0ID0gVS5vKG9iamVjdCwgLi4ua2V5cy5zbGljZSgwLCAtMSkpO1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHRcdH1cblx0XHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcblx0fSxcblxuXHRvKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywge30pIH0sXG5cblx0YShvYmplY3QsIC4uLmtleXMpIHsgcmV0dXJuIFUuZGVmYXVsdChvYmplY3QsIC4uLmtleXMsIFtdKSB9LFxuXG5cdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0fSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0Lyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cblx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0fSxcblxuXHQvKiBydW4gYSBmdW5jdGlvbiBvbmx5IG9uY2UgcGVyIG9iaitzdHJpbmcgY29tYm8gKi9cblx0b25jZVBlcihvYmosIGtleSwgZm4pIHtcblx0XHR2YXIgcCA9IGBfb25jZSBwZXI6ICR7a2V5fWA7XG5cdFx0aWYgKG9ialtwXSkgeyByZXR1cm4gfVxuXHRcdG9ialtwXSA9IHRydWU7IC8vIFRPRE86IG1ha2Ugbm9uLWVudW1lcmF0YWJsZSwgb3IgdXNlIEVTNiBTeW1ib2xcblx0XHRyZXR1cm4gZm4uY2FsbChvYmosIG9iaik7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGEuanMnO1xuaW1wb3J0IGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgICAgIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQcm94eSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Qcm94eS5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3N9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50c1xuICogYW5kIGFjdHMgYXMgYSBmYWNhZGUgKGFzIGluIGRlc2lnbiBwYXR0ZXJuKSB0byB0aGUgbW9yZSBzcGVjaWZpY1xuICogc3Vic3lzdGVtcyBvZiBkZWx0YS5qcy5cbiAqXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgRGVsdGFKcyBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbHRhSnMge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVQcm94eSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICAgIHtzdHJpbmd9ICAgLSBuYW1lIG9mIHRoZSBuZXcgb3BlcmF0aW9uIHR5cGVcblx0ICogQHBhcmFtIERlbHRhQ2xhc3MgIHtGdW5jdGlvbn0gLSB0aGUgbmV3IG9wZXJhdGlvbiBjbGFzc1xuXHQgKiBAcGFyYW0gUHJveHlDbGFzcyB7P0Z1bmN0aW9ufSAtIHRoZSBvcHRpb25hbCBjdXN0b20gUHJveHkgc3ViY2xhc3MgZm9yIHRoaXMgb3BlcmF0aW9uLXR5cGVcblx0ICovXG5cdG5ld09wZXJhdGlvblR5cGUobmFtZSwgRGVsdGFDbGFzcywgUHJveHlDbGFzcykge1xuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9uIGNsYXNzZXMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh0aGlzLkRlbHRhW25hbWVdKSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0Lyogc3RvcmUgdGhlIG9wZXJhdGlvbiBjbGFzcyAqL1xuXHRcdHRoaXMuRGVsdGFbbmFtZV0gPSBEZWx0YUNsYXNzO1xuXG5cdFx0Lyogc2V0IHRoZSAob3B0aW9uYWwpIFByb3h5IGNsYXNzICovXG5cdFx0RGVsdGFDbGFzcy5Qcm94eSA9IFByb3h5Q2xhc3M7XG5cblx0XHQvKiBmZXRjaCB0aGUgZ2l2ZW4gYXBwbHlUbyBmdW5jdGlvbiAoaWYgYW55KSB3aGljaCB3aWxsIGJlIHNsaWdodGx5IG1vZGlmaWVkICovXG5cdFx0dmFyIGdpdmVuQXBwbHlUbyA9IERlbHRhQ2xhc3MucHJvdG90eXBlLmFwcGx5VG8gfHwgKCgpPT57fSk7XG5cblx0XHQvKiBhdWdtZW50IHRoZSBjbGFzcyBwcm90b3R5cGUgKi9cblx0XHRVLmV4dGVuZChEZWx0YUNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGlmIHRoZSB0YXJnZXQgaXMgbm90IGFscmVhZHkgaW4gVGFyZ2V0IGZvcm0sIG1ha2UgaXQgc28gbm93ICovXG5cdFx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERlbHRhSnMuUmVhZGFibGVUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGFyZ2V0ID0gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodGFyZ2V0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzLmV2YWx1YXRlUHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0Z2l2ZW5BcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0sXG5cdFx0XHR0eXBlOiBuYW1lXG5cdFx0fSk7XG5cblx0XHQvKiBjcmVhdGUgYW55IGdpdmVuIG1ldGhvZHMgd2l0aCBkZWZhdWx0IGhhbmRsZXIgKi9cblx0XHR2YXIgbG93ZXJjYXNlTmFtZSA9IG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpO1xuXHRcdChEZWx0YUNsYXNzLnByb3RvdHlwZS5tZXRob2RzIHx8IFtsb3dlcmNhc2VOYW1lXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgKC4uLmFyZ3MpID0+IG5ldyBEZWx0YUNsYXNzKC4uLmFyZ3MpKTtcblx0XHR9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIERlbHRhQ2xhc3M7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdCAqL1xuXHRuZXdQcm94eU1ldGhvZChtZXRob2QsIGhhbmRsZXIpIHtcblx0XHR0aGlzLkNvbnRhaW5lclByb3h5Lm5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcik7XG5cdH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBSZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHRoaXMuX3ZhbCA9IHZhbHVlO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfSxcblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59KTtcblxuZXhwb3J0IHZhciBXcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdHRoaXMuX29iaiAgPSBvYmo7XG5cdHRoaXMuX3Byb3AgPSBwcm9wO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfSxcblx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cbn0pO1xuXG5SZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiBjaGFpbihwcm9wKSB7XG5cdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQodGhpcy52YWx1ZSwgcHJvcCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5leHBvcnQgZnVuY3Rpb24gcnQob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgUmVhZGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYXJnZXQuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuXG5cdGNvbnN0cnVjdG9yKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH1cblxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfVxuXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG5cblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG59XG5cbi8vIFRPRE86IGltcGxlbWVudCB0aGF0IHRoZSBgLihpbnN0YW5jZSkuYCBtZW1iZXJzIGFyZSBhY3R1YWxseSBpbmNsdWRlZCBpbiBpbnN0YW5jZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhdGguanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHRcdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGUgZGVsdGEtdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSkge1xuXHRcdHN1cGVyKGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0XHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0XHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgQ29tcG9zaXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyKGRlbHRhMSwgZGVsdGEyKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdFx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0XHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQ29uc3RyYWludEZhaWx1cmUgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGZlYXR1cmUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHRcdHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZnJvbSwgdG8pIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdFx0dGhpcy5mcm9tID0gZnJvbTtcblx0XHR0aGlzLnRvICAgPSB0bztcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhcykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ1VucmVzb2x2ZWREZWx0YUNvbmZsaWN0Jztcblx0XHR2YXIgZGVsdGFOYW1lcyA9IGRlbHRhcy5tYXAoZCA9PiBgJyR7ZC5uYW1lfSdgKS5qb2luKCcsJyk7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGlzIGFuIHVucmVzb2x2ZWQgY29uZmxpY3QgYmV0d2VlbiBkZWx0YXMgJHtkZWx0YU5hbWVzfS5gO1xuXHRcdHRoaXMuZGVsdGFzID0gZGVsdGFzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBPbmx5IG9uZSBQcm94eSBwZXIgcGF0aCBjYW4gYmUgYWN0aXZlIGF0IGFueSBnaXZlbiB0aW1lLmA7XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgICAgICAgICAgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdFUub25jZVBlcihkZWx0YUpzLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRkZWx0YUpzLkRlbHRhID0gY2xhc3MgRGVsdGEge1xuXG5cdFx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRcdHRoaXMuaWQgPSArK0RlbHRhLl9uZXh0SUQ7XG5cdFx0XHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdFx0XHR9XG5cblx0XHRcdGdldCBhcmcoKSAgeyByZXR1cm4gdGhpcy5hcmdzWzBdIH1cblx0XHRcdHNldCBhcmcodikgeyB0aGlzLmFyZ3NbMF0gPSB2IH1cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcpIH1cblxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0XHRcdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0XHRcdCAqL1xuXHRcdFx0ZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRcdGlmICh0aGlzLnByZWNvbmRpdGlvbikge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSAgdmFsdWUgICB7Kn0gICAgICAgLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0XHQgKi9cblx0XHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQodGhpcywgb3RoZXIpIH1cblxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdGlmIChvcHRpb25zLnRhcmdldFByb3ApICAgeyBzdHIgKz0gYCDigLkke29wdGlvbnMudGFyZ2V0UHJvcH3igLpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0aWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7IHN0ciArPSBgOiAke3RoaXMuYXJncy5tYXAoKGEpID0+IEpTT04uc3RyaW5naWZ5KGEpKS5qb2luKCcsJyl9YCB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdFx0ICovXG5cdFx0XHRzdGF0aWMgbmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRcdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0XHRcdH1cblxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gZGVsdGFzIHtbRGVsdGFKcyNEZWx0YV19IC0gdGhlIGRlbHRhcyB0byBjb21wb3NlXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRzdGF0aWMgY29tcG9zZWQoLi4uZGVsdGFzKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5Ob09wKCk7XG5cblx0XHRcdFx0ZGVsdGFzLmZvckVhY2goKGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0dmFyIGQxID0gcmVzdWx0LFxuXHRcdFx0XHRcdCAgICBkMiA9IGRlbHRhIHx8IG5ldyBkZWx0YUpzLkRlbHRhLk5vT3AoKTtcblxuXHRcdFx0XHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHRcdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0XHRcdHZhciBzdWNjZXNzID0gRGVsdGEuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdFx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0XHRcdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHRcdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdFx0XHRcdHJlc3VsdCA9IGNvbXBvc2VGbihkMSwgZDIpO1xuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cblxuXHRcdH07XG5cdFx0ZGVsdGFKcy5EZWx0YS5fbmV4dElEID0gMDtcblx0XHRkZWx0YUpzLkRlbHRhLl9jb21wb3NpdGlvbnMgID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXG5cdH0pO1xuXHRVLm9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ0RlbHRhJywgKCkgPT4ge1xuXG5cdFx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHRcdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0XHR0aGlzLkRlbHRhLm5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdPdmVybG9hZGVkJywgKCkgPT4ge1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnT3ZlcmxvYWRlZCcsIGNsYXNzIE92ZXJsb2FkZWQgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSB0aGlzLmFyZyB8fCBbXTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk92ZXJsb2FkZWR9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoXG5cdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8XG5cdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnTW9kaWZ5JywgKCkgPT4ge1xuXG5cdGRlZmluZVByb3h5KGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTW9kaWZ5JywgY2xhc3MgTW9kaWZ5IGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuc3ViRGVsdGFzID0ge307XG5cdFx0XHRVLmV4dGVuZCh0aGlzLnN1YkRlbHRhcywgdGhpcy5hcmcgfHwge30pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuc3ViRGVsdGFzW3Byb3BdID0gdGhpcy5zdWJEZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJEZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHRcdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5zdWJEZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdFxuXHRcdFx0XHRcdFx0LmtleXModGhpcy5zdWJEZWx0YXMpXG5cdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLnN1YkRlbHRhc1twXS50b1N0cmluZyhVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyB0YXJnZXRQcm9wOiBwIH0pKSlcblx0XHRcdFx0XHRcdC5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cblx0fSwgY2xhc3MgTW9kaWZ5UHJveHkgZXh0ZW5kcyBkZWx0YUpzLkNvbnRhaW5lclByb3h5IHtcblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHJhd0FyZ3MgeypbXX1cblx0XHQgKiBAcmV0dXJuIHs/eyBvcHRpb25zOiBPYmplY3QsIGFyZ3M6ICpbXSB9fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cyguLi5yYXdBcmdzKSB7XG5cdFx0XHQvLyByYXdBcmdzIGlzIHBhcnNlZCBhcyAoLi4ub3B0aW9ucywgcGF0aCwgLi4uYXJncyksXG5cdFx0XHQvLyB0aG91Z2ggcGF0aCBtYXkgYWxzbyBiZSBwYXNzZWQgYXMgYW4gb3B0aW9uIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuUHJveHkgbWV0aG9kIGlzIGluc3VmZmljaWVudC5gKSB9XG5cdFx0XHRcdHZhciBhcmcgPSByYXdBcmdzLnNoaWZ0KCk7XG5cdFx0XHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykgeyBvcHRpb25zLnBhdGggPSBhcmcgICAgIH1cblx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICB7IFUuZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fSAtIHRoZSBkZWVwZXN0IHByb3h5IGNyZWF0ZWQgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKGRlbHRhLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIge3BhdGh9ID0gb3B0aW9ucztcblx0XHRcdGlmICghcGF0aC5wcm9wKSB7IHRocm93IG5ldyBFcnJvcignT3BlcmF0aW9ucyBvbiBhIE1vZGlmeS5Qcm94eSBuZWVkIHRvIGhhdmUgYSBub24tZW1wdHkgcGF0aC4nKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHBhdGg6IHBhdGgucmVzdCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkocGF0aC5wcm9wLCBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKSk7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IGNoaWxkUHJveHkuYWRkT3BlcmF0aW9uKGRlbHRhLCBuZXdPcHRpb25zKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZXBlc3RQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTk9URTogTW9kaWZ5IG9wZXJhdGlvbnMgZG8gbm90ICh5ZXQpIHVzZSBhbnkgb3B0aW9uc1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBEeW5hbWljYWxseSBjb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHlcblx0XHQgKi9cblx0XHRkZWx0YSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5kZWx0YSgpO1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhcyA9IHt9O1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLmNoaWxkRGVsdGEocHJvcCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5zdWJEZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0sIGQyLnN1YkRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn0pO1xuXG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfSAvLyBUT0RPOiByZXBsYWNlIGFsbCB0aGlzIHRocm91Z2ggdGhlIG5ldyBQcm94eSByZWZhY3RvcmluZ1xuLy8gKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG4vLyAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gYW55IG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG4vLyAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBvcGVyYXRpb25cbi8vICogQHBhcmFtIGFyZ3Mge1sqXX0gICAgICAgLSB0aGUgYXJndW1lbnRzIHRvIHRoZSBvcGVyYXRpb25cbi8vICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuLy8gKi9cbi8vb3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpIHtcbi8vXHR2YXIgYXJnc3MgPSBbLi4uYXJndW1lbnRzXTtcbi8vXHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuLy9cdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG4vL1x0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcbi8vXHR9XG4vL1x0cGF0aCA9IGFyZ3NzLnNoaWZ0KCk7XG4vL1x0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCAuLi5hcmdzcyk7XG4vL1x0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuLy99XG4vLy8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG4vLyAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG4vLyAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG4vLyAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuLy8gKi9cbi8vX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuLy9cdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuLy9cdGlmIChwYXRoLnJlc3QpIHtcbi8vXHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbih7IG1ldGhvZDogJ21vZGlmeScgfSwgcGF0aC5wcm9wKVxuLy9cdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG4vL1x0dGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcbi8vXG4vL1x0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuLy9cdHJldHVybiAodGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSA/IHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcbi8vfVxuXG4vLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cbi8vICogR2V0IHRoZSBkZWVwZXN0IGV4aXN0aW5nIE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIGEgcmVsYXRpdmUgcGF0aC5cbi8vICogQHBhcmFtIHBhdGgge1BhdGh9IC0gYSBwYXRoIHJlbGF0aXZlIHRvIHRoaXMgZGVsdGFcbi8vICogQHJldHVybiB7eyBkZWx0YTogRGVsdGFKcyNEZWx0YS5Nb2RpZnksIHJlc3Q6IFBhdGggfX0gLSB0aGUgZGVlcGVzdCBNb2RpZnkgZGVsdGEgY29ycmVzcG9uZGluZyB0byB0aGUgcGF0aCxcbi8vICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHVudXNlZCByZXN0IG9mIHRoZSBwYXRoXG4vLyAqL1xuLy9kZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aCkgeyAvLyBUT0RPOiBub3QgbmVlZGVkIGFueW1vcmUsIHJpZ2h0P1xuLy9cdGlmIChVLmlzVW5kZWZpbmVkKHBhdGgucHJvcCkgfHwgdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXS50eXBlICE9PSAnTW9kaWZ5Jykge1xuLy9cdFx0cmV0dXJuIHsgZGVsdGE6IHRoaXMsIHJlc3Q6IHBhdGggfTtcbi8vXHR9XG4vL1x0cmV0dXJuIHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0uZGVlcGVzdE1vZGlmeURlbHRhQnlQYXRoKHBhdGgucmVzdCB8fCBuZXcgUGF0aCgpKTtcbi8vfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ2Jhc2ljIG9wZXJhdGlvbnMnLCAoKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGEgKGRlbHRhSnMpO1xuXHRkZWZpbmVNb2RpZnkoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICoqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJywgY2xhc3MgTm9PcCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge30pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0FkZCcsIGNsYXNzIEFkZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdC8vY29uc3RydWN0b3IoLi4uYXJncykgeyBzdXBlciguLi5hcmdzKSB9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIGNsYXNzIEZvcmJpZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlcGxhY2UnLCBjbGFzcyBSZXBsYWNlIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5hcmcgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdVcGRhdGUnLCBjbGFzcyBVcGRhdGUgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTm9PcCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIGQoJ0FkZCcsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1VwZGF0ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnVXBkYXRlJyApLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1VwZGF0ZScgKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnVXBkYXRlJyAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1VwZGF0ZScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdVcGRhdGUnICwgJ1VwZGF0ZScgKSwgZCgnVXBkYXRlJywgICh7cDEsIHAyfSkgPT4gdiA9PiBwMihwMSh2KSkpICAgKTtcblx0Ly8gVE9ETzogYWxsb3cgbW9yZSBraW5kcyBvZiBjb21wb3NpdGlvbnMgd2l0aCBVcGRhdGVcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnUHV0SW50b0FycmF5JywgKCkgPT4ge1xuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCBjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgICAgICAnUHV0SW50b0FycmF5JyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAgICAgICdQdXRJbnRvQXJyYXknKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlbW92ZScgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVwbGFjZScgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSk7XG5cdH0pO1xuXG5cdC8vIFRPRE86IGNvbXBvc2l0aW9uIHdpdGggVXBkYXRlXG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ1B1dEludG9GdW5jdGlvbicsICgpID0+IHtcblxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIGNsYXNzIFB1dEludG9GdW5jdGlvbiBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLmFyZyA/IChBcnJheS5pc0FycmF5KHRoaXMuYXJnKSA/IHRoaXMuYXJnIDogW3RoaXMuYXJnXSkgOiBbXTtcblx0XHR9XG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbLi4udGhpcy52YWx1ZXNdO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHQoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Z2V0IG1ldGhvZHMoKSB7IHJldHVybiBbXSB9XG5cdH0pO1xuXG5cblx0LyogUHJveHkgbWV0aG9kcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdwcmVwZW5kJywgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdwcmVwZW5kJywgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdpbnNlcnQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdpbnNlcnQnLCAgdmFsdWUgfSkpO1xuXHRkZWx0YUpzLm5ld1Byb3h5TWV0aG9kKCdhcHBlbmQnLCAgKHZhbHVlKSA9PiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oeyBtZXRob2Q6ICdhcHBlbmQnLCAgdmFsdWUgfSkpO1xuXG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdBZGQnLCAgICAgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKFsuLi5kMS52YWx1ZXMsIC4uLmQyLnZhbHVlc10pO1xuXHR9KTtcblxuXHQvLyBUT0RPOiBjb21wb3NpdGlvbiB3aXRoIFVwZGF0ZVxuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgZnJvbSAnLi9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgIGZyb20gJy4vUHJveHkuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdEZWx0YU1vZGVsJywgKCkgPT4ge1xuXG5cdGRlZmluZU1vZGlmeShkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRGVsdGFNb2RlbCcsIGNsYXNzIERlbHRhTW9kZWwgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fVxuXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHN1cGVyLnRvU3RyaW5nKG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0sIGNsYXNzIERlbHRhTW9kZWxQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnMtb2YtZmlyc3Qtb2NjdXJyZW5jZVxuXHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnMgPSB7fTsgLy8ga2V5IC0+IGFwcGxpY2F0aW9uLWNvbmRpdGlvblxuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBuYW1lLCAuLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBuYW1lIGFuZC9vciBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBvcHRpb25zIGRpcmVjdGx5XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHt9O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocmF3QXJncy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGBUaGUgYXJndW1lbnQgbGlzdCBmb3IgdGhpcyBNb2RpZnkuRGVsdGFNb2RlbCBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm5hbWUpIHsgb3B0aW9ucy5uYW1lID0gYXJnICAgICB9XG5cdFx0XHRcdFx0ZWxzZSAgICAgICAgICAgICAgIHsgb3B0aW9ucy5wYXRoID0gYXJnICAgICB9XG5cdFx0XHRcdH0gZWxzZSAgICAgICAgICAgICAgICAgeyBVLmV4dGVuZChvcHRpb25zLCBhcmcpIH1cblx0XHRcdH0gd2hpbGUgKCFvcHRpb25zLnBhdGggfHwgIW9wdGlvbnMubmFtZSk7XG5cdFx0XHRyZXR1cm4geyBvcHRpb25zLCBhcmdzOiByYXdBcmdzIH07XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aCwgbmFtZSwgZmVhdHVyZX0gPSBvcHRpb25zO1xuXG5cdFx0XHQvKiBjcmVhdGUgYXBwbGljYXRpb24gY29uZGl0aW9uIGFuZCBvcHRpb25hbCBlcG9ueW1vdXMgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdGlmICghdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0pIHtcblx0XHRcdFx0bGV0IGFwcENvbmQ7XG5cdFx0XHRcdGlmIChmZWF0dXJlKSB7IGFwcENvbmQgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgeyBhcHBDb25kID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0XHRvcHRpb25zID0gVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgZmVhdHVyZTogZmFsc2UgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG5cdFx0XHRcdFx0YXBwQ29uZC5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmZWF0dXJlIHx8IGFwcENvbmQuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFwcENvbmQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0gPSBhcHBDb25kO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBjcmVhdGUgcHJveGllcyAqL1xuXHRcdFx0dmFyIGRlZXBlc3RQcm94eTtcblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0bGV0IG5ld09wdGlvbnMgPSBVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBuYW1lOiB1bmRlZmluZWQgfSk7XG5cdFx0XHRcdGxldCBjaGlsZFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KG5hbWUsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgb3B0aW9ucyAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0pIHtcblx0XHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zW25hbWVdID0gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0LyogcmV0dXJuIHRoZSBkZWVwZXN0IGNyZWF0ZWQgcHJveHkgKi9cblx0XHRcdHJldHVybiBkZWVwZXN0UHJveHk7XG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguY2xlYXIoKTtcblx0XHRcdHRoaXMuY2hpbGRLZXlzKCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXTtcblxuXHRcdFx0XHQvKiBkZWx0YSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFx0dmFyIGRlbHRhID0gdGhpcy5jaGlsZERlbHRhKG5hbWUpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhKTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBvcmRlciAqL1xuXHRcdFx0XHRbIC4uLm9wdGlvbnNbJ3Jlc29sdmVzJ118fFtdLCAuLi5vcHRpb25zWydhZnRlciddfHxbXSwgLi4ub3B0aW9uc1sncmVxdWlyZXMnXXx8W10gXS5mb3JFYWNoKChzdWJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoLmNyZWF0ZUVkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5ncmFwaC5oYXNDeWNsZSgpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEFwcGxpY2F0aW9uT3JkZXJDeWNsZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlIHx8IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbGljYXRpb25Db25kaXRpb24gPSB0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogY29tcG9zaXRpb24gKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0XHRkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCB8fFxuXHRcdGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsXG5cdCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfSAvLyBUT0RPOiByZWRvIHRoaXMgc3R1ZmYgd2l0aCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG4vLyAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuLy8gKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cbi8vICogQHBhcmFtIGFyZ3Mge1sqXX0gICAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCAuLi5hcmdzKSB7XG4vL1x0dmFyIGFyZ3NzID0gWy4uLmFyZ3VtZW50c107XG4vL1x0dmFyIGFsbE9wdGlvbnMgPSB7fTtcbi8vXHR3aGlsZSAodHlwZW9mIGFyZ3NzWzBdID09PSAnb2JqZWN0Jykge1xuLy9cdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJnc3Muc2hpZnQoKSk7XG4vL1x0fVxuLy9cdG5hbWUgPSBhcmdzcy5zaGlmdCgpO1xuLy9cdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG4vL1x0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcbi8vXHR9XG4vL1x0cGF0aCA9IGFyZ3NzLnNoaWZ0KCk7XG4vL1x0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCAuLi5hcmdzcyk7XG4vL1x0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuLy99XG4vL1xuLy9cbi8vX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuLy9cdHZhciBkZWx0YUJhc2U7XG4vL1xuLy9cdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cbi8vXHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG4vL1xuLy9cbi8vXG4vL1x0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpICYmIGV4aXN0aW5nRGVsdGEudHlwZSA9PT0gJ01vZGlmeScgJiYgVS5pc0RlZmluZWQocGF0aC5yZXN0KSkge1xuLy9cdFx0cmV0dXJuIGV4aXN0aW5nRGVsdGEuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cbi8vXHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cbi8vXHRpZiAocGF0aC5wcm9wKSB7XG4vL1x0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcbi8vXHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcbi8vXHR9XG4vL1xuLy9cdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuLy9cdGlmIChVLmlzRGVmaW5lZChleGlzdGluZ0RlbHRhKSkge1xuLy9cdFx0ZGVsdGFCYXNlID0gZXhpc3RpbmdEZWx0YS5jb21wb3NlZFdpdGgoZGVsdGFCYXNlKTtcbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuLy9cdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcbi8vXHRcdHRoaXMuZ3JhcGguc2V0VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1x0fSBlbHNlIHtcbi8vXG4vL1x0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cbi8vXHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcbi8vXHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG4vL1xuLy9cdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuLy9cdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG4vL1x0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuLy9cdFx0XHRpZiAodGhpcy5ncmFwaC5oYXNDeWNsZSgpKSB7XG4vL1x0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcbi8vXHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG4vL1x0XHRcdH1cbi8vXHRcdH0pO1xuLy9cbi8vXHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuLy9cdFx0dmFyIGRlbHRhRmVhdHVyZTtcbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUpIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSwgICAgICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cbi8vXHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cbi8vXHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG4vL1x0XHRcdGRlbHRhQmFzZS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGRlbHRhRmVhdHVyZTtcbi8vXHRcdH1cbi8vXG4vL1x0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG4vL1x0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcbi8vXHRcdFx0ZGVsdGFGZWF0dXJlLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuLy9cdFx0fVxuLy9cbi8vXHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuLy9cdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3JlcXVpcmVzJ10pKSB7XG4vL1x0XHRcdGRlbHRhRmVhdHVyZS5zZWxlY3RzKG9wdGlvbnNbJ3JlcXVpcmVzJ10pO1xuLy9cdFx0fVxuLy9cdH1cbi8vXG4vL1x0cmV0dXJuIGRlbHRhO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge0NvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0VS5vbmNlUGVyKGRlbHRhSnMsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdFx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdFx0cmV0dXJuIGlucHV0O1xuXHRcdH1cblxuXG5cdFx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0XHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHRcdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdFx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXHRcdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0XHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0XHR2YXIgX2FsbG93ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdFx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoY29uanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0XHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHRcdC8qIGZpeGVkIHBvaW50IGNvbXB1dGF0aW9uIG9mIHNlbGVjdGVkIGZlYXR1cmVzIChpLmUuLCBwcm9wYWdhdGUgdGhlbSB1bnRpbCB0aGVyZSBpcyBubyBjaGFuZ2UpICovXG5cdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdGRvIHtcblx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdpZicgZGlzanVuY3RzIHRoYXQgYXJlIHNlbGVjdGVkLCB0aGlzIGZlYXR1cmUgaXMgc2VsZWN0ZWQgKi9cblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdFx0LyogY29tcHV0YXRpb24gb2YgYWxsb3dlZCBmZWF0dXJlcyAqL1xuXHRcdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVOYW1lXSA9IChfb25seUlmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuZXZlcnkoY29uaiA9PiBjb25qLnNvbWUoZGlzaiA9PiBfc2VsZWN0ZWRbZGlzal0pKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0XHR9KTtcblxuXHRcdH0sIHtcblx0XHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHRcdH0pO1xuXG5cblx0XHQvKiByZXN0cmljdGlvbnMgYW5kIGNvbm5lY3Rpb25zICovXG5cdFx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFx0WyAnb25seUlmJywgICAgIFtfYWRkT25seUlmXSAgICAgICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiB0aGlzIGJ1dCBub3Qgb3RoZXJcblx0XHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHMsIF9hZGRPbmx5SWZdICAgICAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRcdFsgJ2lmZicsICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeSwgX2FkZE9ubHlJZl0gXSAgLy8gaWYgYW5kIG9ubHlJZlxuXHRcdF07XG5cdFx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW24sIG1ldGhvZHNdKSA9PiB7XG5cdFx0XHRcdGlmIChuYW1lID09PSBuKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXHRcdEZFQVRVUkVfQ09OTkVDVElPTlMuZm9yRWFjaCgoW25hbWVdKSA9PiB7XG5cdFx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHRcdH07XG5cdFx0fSk7XG5cblxuXHRcdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdFx0ZGVsdGFKcy5mZWF0dXJlcyA9IHt9OyAvLyBuYW1lIC0+IEZlYXR1cmVcblxuXHR9KTtcblx0VS5vbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdmZWF0dXJlcycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICovXG5cdFx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mZWF0dXJlcy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0VS5vbmNlUGVyKGRlbHRhSnMsICd2YXJpYXRpb24gcG9pbnRzJywgKCkgPT4ge1xuXG5cdFx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHRcdGRlbHRhSnMuX2RlbHRhTW9kZWxQcm94eSA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKS5kbygpO1xuXG5cdH0pO1xuXHRVLm9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ3ZhcmlhdGlvbiBwb2ludHMnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHRcdCAqL1xuXHRcdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0XHR0aGlzLl9kZWx0YU1vZGVsUHJveHkuZGVsdGEoKS5hcHBseVRvKHJvb3QsIHtcblx0XHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgcHJveHkgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIHByb3h5IHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHRcdCAqL1xuXHRcdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbFByb3h5LmRvKHsgZmVhdHVyZTogdHJ1ZSB9LCAuLi5hcmdzKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRVLm9uY2VQZXIoZGVsdGFKcywgJ2FwcGxpY2F0aW9uIGNvbmRpdGlvbnMnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0XHRyZXR1cm4gVS5pc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG5cdFUub25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnYXBwbGljYXRpb24gY29uZGl0aW9ucycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRcdHNlbGVjdCguLi5mZWF0dXJlcykge1xuXHRcdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0KC4uLmZlYXR1cmUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgICBmcm9tICcuL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IHtNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbi8vIFRPRE86IEJha2UgaW4gZGVsdGEgbW9kZWwgZnVuY3Rpb25hbGl0eVxuLy8gRE9ORTogJ29uZSBQcm94eSBhY3RpdmUgYXQgYSB0aW1lJyAoY2Fubm90IHVzZSBlYXJsaWVyIG9uZXMgYWZ0ZXIgbmV3IG9uZXMgaGF2ZSBiZWVuIHVzZWQpXG4vLyBUT0RPOiBCYXNpYyBhcHBsaWNhdGlvbiBvZiBkZWx0YXNcbi8vIFRPRE86IENvbXBvc2l0aW9uIGluIG9yZGVyIHRvIGdlbmVyYXRlIGVycm9yIG1lc3NhZ2VzXG4vLyBUT0RPOiBFcnJvciBtZXNzYWdlcyBiYXNlZCBvbiBzeW50YWN0aWMgY29uZmxpY3RzIGluIGRlbHRhIG1vZGVsc1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ1Byb3h5JywgKCkgPT4ge1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMuUHJveHkgPSBjbGFzcyBQcm94eSB7XG5cblx0XHRjb25zdHJ1Y3Rvcih7cGFyZW50LCBkZWx0YX0gPSB7fSkge1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5fYWN0aXZlID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RlbHRhID0gZGVsdGE7XG5cdFx0fVxuXG5cdFx0ZGVsdGEoKSB7IHJldHVybiB0aGlzLl9kZWx0YTsgfVxuXG5cdFx0Z2V0IGFjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZSB9XG5cblx0XHRkZWFjdGl2YXRlKCkgeyB0aGlzLl9hY3RpdmUgPSBmYWxzZSB9XG5cblx0fTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBhIFByb3h5IGNsYXNzIGZvciBub24tY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyAqL1xuXHRjbGFzcyBCYXNpY1Byb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7fVxuXHRkZWx0YUpzLkJhc2ljUHJveHkgPSBCYXNpY1Byb3h5O1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIGNvbnRhaW5lciBvcGVyYXRpb24gdHlwZXMgbGlrZSBNb2RpZnkgYW5kIERlbHRhTW9kZWwgKi9cblx0ZGVsdGFKcy5Db250YWluZXJQcm94eSA9IGNsYXNzIENvbnRhaW5lclByb3h5IGV4dGVuZHMgZGVsdGFKcy5Qcm94eSB7XG5cblx0XHQvLyBBIFByb3h5IGluc3RhbmNlIGV4cG9zZXMgb3BlcmF0aW9uIG1ldGhvZHMgZGlyZWN0bHkuIEFyZ3VtZW50c1xuXHRcdC8vIHRvIHRob3NlIG9wZXJhdGlvbnMgY2FuIGJlIHByZS1zdXBwbGllZCB0aHJvdWdoIHRoZSBgZG9gIG1ldGhvZC5cblxuXHRcdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9kb0FyZ3MgICAgICAgPSBbXTtcblx0XHRcdHRoaXMuX29yaWdpbmFsICAgICA9IHRoaXM7XG5cdFx0XHR0aGlzLl9jaGlsZHJlbiAgICAgPSB7fTsgLy8ga2V5IC0+IFtwcm94aWVzXVxuXHRcdFx0dGhpcy5fY2hpbGRPcHRpb25zID0ge307IC8vIGtleSAtPiBvcHRpb25zXG5cdFx0fVxuXG5cblx0XHRkZWFjdGl2YXRlKCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5fY2hpbGRyZW4pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNoaWxkUHJveHkoa2V5KS5kZWFjdGl2YXRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdHN1cGVyLmRlYWN0aXZhdGUoKTtcblx0XHR9XG5cblxuXHRcdGFkZENoaWxkUHJveHkoa2V5LCBkZWx0YSkge1xuXHRcdFx0LyogZ2V0IHRoZSBjdXJyZW50IHByb3h5IGZvciB0aGUgZ2l2ZW4ga2V5ICovXG5cdFx0XHR2YXIgY3VycmVudCA9IHRoaXMuY2hpbGRQcm94eShrZXkpO1xuXG5cdFx0XHQvKiBnZXQgLyBjcmVhdGUgZGVsdGEgcHJveHkgKi9cblx0XHRcdHZhciBQcm94eUNsYXNzID0gZGVsdGEuY29uc3RydWN0b3IuUHJveHkgfHwgZGVsdGFKcy5CYXNpY1Byb3h5O1xuXHRcdFx0dmFyIHByb3h5ID0gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YSwgcGFyZW50OiB0aGlzIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGN1cnJlbnQgcHJveHkgaWYgaXQsIGFuZCB0aGUgY3VycmVudCBwcm94eSwgYXJlIGJvdGggTW9kaWZ5LlByb3h5ICovXG5cdFx0XHRpZiAoY3VycmVudCBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5ICYmXG5cdFx0XHRcdHByb3h5ICAgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk1vZGlmeS5Qcm94eSkgeyByZXR1cm4gY3VycmVudCB9XG5cblx0XHRcdC8qIHdlIG5lZWQgYSBuZXcgcHJveHksIHNvIGRlYWN0aXZhdGUgdGhlIGN1cnJlbnQgb25lICovXG5cdFx0XHRpZiAoY3VycmVudCkgeyBjdXJyZW50LmRlYWN0aXZhdGUoKSB9XG5cblx0XHRcdC8qIGNyZWF0ZSBhIG5ldyBQcm94eSBvZiB0aGUgcmlnaHQgY2xhc3MsIHJlbWVtYmVyIGl0IGFuZCByZXR1cm4gaXQgKi9cblx0XHRcdHRoaXMuX2NoaWxkcmVuW2tleV0ucHVzaChwcm94eSk7XG5cdFx0XHRyZXR1cm4gcHJveHk7XG5cdFx0fVxuXG5cblx0XHRjaGlsZEtleXMoKSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikgfVxuXG5cblx0XHRjaGlsZFByb3hpZXMoa2V5KSB7IHJldHVybiBVLmEodGhpcy5fY2hpbGRyZW4sIGtleSkgfVxuXG5cblx0XHRjaGlsZFByb3h5KGtleSkgeyByZXR1cm4gVS5hKHRoaXMuX2NoaWxkcmVuLCBrZXkpW3RoaXMuX2NoaWxkcmVuW2tleV0ubGVuZ3RoLTFdIH1cblxuXG5cdFx0Y2hpbGREZWx0YShrZXkpIHtcblx0XHRcdHJldHVybiBkZWx0YUpzLkRlbHRhLmNvbXBvc2VkKFxuXHRcdFx0XHQuLi50aGlzLmNoaWxkUHJveGllcyhrZXkpLm1hcChwcm94eSA9PiBwcm94eS5kZWx0YSgpKVxuXHRcdFx0KTtcblx0XHR9XG5cblxuXHRcdGRvKC4uLmRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogcmV0dXJuIGEgdmVyc2lvbiBvZiB0aGlzIFByb3h5IHdpdGggZXh0cmEgcHJlbG9hZGVkIGFyZ3MgKi9cblx0XHRcdC8vIG5vdGUgdGhhdCB0aGlzIG1peGVzIHByb3RvdHlwaWNhbCBpbmhlcml0YW5jZVxuXHRcdFx0Ly8gaW50byB0aGUgZXhpc3RpbmcgY2xhc3NpY2FsIGluaGVyaXRhbmNlIHNjaGVtZVxuXHRcdFx0dmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG5cdFx0XHRyZXN1bHQuX2RvQXJncyAgID0gWy4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzXTtcblx0XHRcdHJlc3VsdC5fb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHRfZG8obWV0aG9kLCBkb0FyZ3MpIHtcblx0XHRcdC8qIGlzIHRoaXMgcHJveHkgYWN0aXZlPyAqL1xuXHRcdFx0aWYgKCF0aGlzLmFjdGl2ZSkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVQcm94aWVzRXJyb3IoKSB9XG5cblx0XHRcdC8qIGNvbnRhaW5lci1zcGVjaWZpYyBwcm9jZXNzaW5nIG9mIGFyZ3VtZW50cyAqL1xuXHRcdFx0dmFyIHtvcHRpb25zLCBhcmdzfSA9IHRoaXMucHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnRoaXMuX2RvQXJncywgLi4uZG9BcmdzKTtcblxuXHRcdFx0LyogaWYgdGhlIG9wdGlvbnMgY29udGFpbiBhIHBhdGgsIHJlaWZ5IGl0ICovXG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMucGF0aCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0b3B0aW9ucy5wYXRoID0gbmV3IFBhdGgob3B0aW9ucy5wYXRoKTtcblx0XHRcdH1cblxuXHRcdFx0LyogdGhlIGFyZ3VtZW50IGxpc3QgaXMgZmluaXNoZWQ7IGNyZWF0ZSBhIG5ldyBkZWx0YSBhbmQgcHV0IGl0IGluIHRoZSByaWdodCBwbGFjZSAqL1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpO1xuXHRcdFx0dmFyIHByb3h5ID0gdGhpcy5hZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJpZ2h0IFByb3h5IGluc3RhbmNlIGZvciBjaGFpbmluZyAqL1xuXHRcdFx0cmV0dXJuIChwcm94eSBpbnN0YW5jZW9mIGRlbHRhSnMuQ29udGFpbmVyUHJveHkpID8gcHJveHkgOiB0aGlzO1xuXHRcdH1cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGV4dHJhY3QgYW5cblx0XHQgKiBvcHRpb25zIG9iamVjdCwgcGF0aCBhbmQgZmluYWwgYXJndW1lbnQgbGlzdCBmcm9tIGEgZ2l2ZW4gJ3JhdycgYXJndW1lbnQgbGlzdC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBhcmdzIHtbKl19XG5cdFx0ICogQHJldHVybiB7e29wdGlvbnM6IE9iamVjdCwgYXJnczogWypdfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgJ0NvbnRhaW5lclByb3h5JyBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdwcm9jZXNzUHJveHlBcmd1bWVudHMnIG1ldGhvZC5gKTtcblx0XHR9XG5cblxuXHRcdC8vbm9pbnNwZWN0aW9uIEpTQ29tbWVudE1hdGNoZXNTaWduYXR1cmVcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBTdWJjbGFzc2VzIG9mIGBDb250YWluZXJQcm94eWAgc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byBhZGQgYSBnaXZlbiBkZWx0YVxuXHRcdCAqIHVuZGVyIGEgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLCBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIFByb3h5LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ2FkZE9wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogQ3JlYXRlIGEgZGVsdGEgYmFzZWQgb24gYSBtZXRob2QtbmFtZSBhbmQgYXJndW1lbnQtbGlzdC5cblx0XHQgKiBJZiB0aGUgbWV0aG9kLW5hbWUgaXMgb3ZlcmxvYWRlZCwgeW91J2xsIGF1dG9tYXRpY2FsbHkgZ2V0XG5cdFx0ICogYW4gYERlbHRhLk92ZXJsb2FkZWRgIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdHN0YXRpYyBfbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZ3MpIHtcblx0XHRcdGRlZmluZU92ZXJsb2FkZWQoZGVsdGFKcyk7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gZGVsdGFKcy5Db250YWluZXJQcm94eS5fbWV0aG9kSGFuZGxlcnNbbWV0aG9kXS5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKC4uLmFyZ3MpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHRyZXR1cm4gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZChuZXdEZWx0YXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2QgIHtzdHJpbmd9ICAgLSBtZXRob2QgbmFtZVxuXHRcdCAqIEBwYXJhbSBoYW5kbGVyIHtGdW5jdGlvbn0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbWV0aG9kIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBuZXcgYERlbHRhSnMjRGVsdGFgIGluc3RhbmNlXG5cdFx0ICovXG5cdFx0c3RhdGljIG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXG5cdFx0XHQvKiBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBQcm94eSBjbGFzcyB3aXRoIG5ldyBvcGVyYXRpb24gbWV0aG9kICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdKSkge1xuXHRcdFx0XHRkZWx0YUpzLkNvbnRhaW5lclByb3h5LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZG8obWV0aG9kLCBhcmdzKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyogcmVnaXN0ZXIgaGFuZGxlcnMgZm9yIGVhY2ggbWV0aG9kICovXG5cdFx0XHRVLmEoZGVsdGFKcy5Db250YWluZXJQcm94eSwgJ19tZXRob2RIYW5kbGVycycsIG1ldGhvZCkucHVzaChoYW5kbGVyKTtcblxuXHRcdH1cblxuXHR9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gYXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yLlByb3h5O1xuXHRcdFx0aWYgKCFQcm94eUNsYXNzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyAnZG8nIG9uIGRlbHRhIHR5cGUgJyR7dGhpcy50eXBlfScsIHdoaWNoIGhhcyBubyBQcm94eSBpbnRlcmZhY2UuYCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb3h5Q2xhc3MoeyBkZWx0YTogdGhpcyB9KS5kbyguLi5hcmdzKTtcblx0XHR9XG5cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Qcm94eS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=