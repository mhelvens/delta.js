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
			deltaJs.newOperationType("Replace", (function (_deltaJs$Delta3) {
				function Replace() {
					_classCallCheck(this, Replace);
	
					if (_deltaJs$Delta3 != null) {
						_deltaJs$Delta3.apply(this, arguments);
					}
				}
	
				_inherits(Replace, _deltaJs$Delta3);
	
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
			deltaJs.newOperationType("Remove", (function (_deltaJs$Delta4) {
				function Remove() {
					_classCallCheck(this, Remove);
	
					if (_deltaJs$Delta4 != null) {
						_deltaJs$Delta4.apply(this, arguments);
					}
				}
	
				_inherits(Remove, _deltaJs$Delta4);
	
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
			deltaJs.newOperationType("Forbid", (function (_deltaJs$Delta5) {
				function Forbid() {
					_classCallCheck(this, Forbid);
	
					if (_deltaJs$Delta5 != null) {
						_deltaJs$Delta5.apply(this, arguments);
					}
				}
	
				_inherits(Forbid, _deltaJs$Delta5);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MDFhYzhlM2YzZjU4MTc1YjE1YiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvUHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFB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QUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25FLFdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7QUFHOUMsY0FBUSxLQUFLLFlBQVksT0FBTyxDQUFDLGNBQWMsR0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO09BQ2hFOzs7O0FBV0QsMEJBQXFCOzs7Ozs7Ozs7OzthQUFBLGlDQUFHO0FBQ3ZCLGFBQU0sSUFBSSxLQUFLLHNGQUFzRixDQUFDO09BQ3RHOzs7O0FBWUQsaUJBQVk7Ozs7Ozs7Ozs7OzthQUFBLHdCQUFHO0FBQ2QsYUFBTSxJQUFJLEtBQUssNkVBQTZFLENBQUM7T0FDN0Y7Ozs7OztXQXRINkIsY0FBYztNQUFTLE9BQU8sQ0FBQyxLQUFLLENBK0psRSxDQUFDOzs7O0FBSUYsSUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7O0FBTWpDLFVBQUUsZUFBVTs7O3VDQUFOLElBQUk7QUFBSixVQUFJOzs7QUFDVCxTQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4QyxTQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2hCLFlBQU0sSUFBSSxLQUFLLGtDQUFnQyxJQUFJLENBQUMsSUFBSSxzQ0FBbUMsQ0FBQztNQUM1RjtBQUNELFlBQU8sWUFBSSxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBRyxPQUFJLElBQUksQ0FBQyxDQUFDO0tBQ25EOztJQUVELENBQUMsQ0FBQztHQUVILENBQUM7RUFBQSxDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQwMWFjOGUzZjNmNTgxNzViMTViXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsIENvbnN0cmFpbnRGYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWREZWx0YUNvbmZsaWN0LFxuICAgICAgICAgICAgICAgICAgICBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8ob2JqZWN0LCAuLi5rZXlzLnNsaWNlKDAsIC0xKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7IHJldHVybiBVLmRlZmF1bHQob2JqZWN0LCAuLi5rZXlzLCB7fSkgfSxcblxuXHRhKG9iamVjdCwgLi4ua2V5cykgeyByZXR1cm4gVS5kZWZhdWx0KG9iamVjdCwgLi4ua2V5cywgW10pIH0sXG5cblx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHR9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHR9LFxuXG5cdC8qIHJ1biBhIGZ1bmN0aW9uIG9ubHkgb25jZSBwZXIgb2JqK3N0cmluZyBjb21ibyAqL1xuXHRvbmNlUGVyKG9iaiwga2V5LCBmbikge1xuXHRcdHZhciBwID0gYF9vbmNlIHBlcjogJHtrZXl9YDtcblx0XHRpZiAob2JqW3BdKSB7IHJldHVybiB9XG5cdFx0b2JqW3BdID0gdHJ1ZTsgLy8gVE9ETzogbWFrZSBub24tZW51bWVyYXRhYmxlLCBvciB1c2UgRVM2IFN5bWJvbFxuXHRcdHJldHVybiBmbi5jYWxsKG9iaiwgb2JqKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi92YXJpYXRpb25Qb2ludHMuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyAgICAgICAgICAgICAgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1Byb3h5LmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzXG4gKiBhbmQgYWN0cyBhcyBhIGZhY2FkZSAoYXMgaW4gZGVzaWduIHBhdHRlcm4pIHRvIHRoZSBtb3JlIHNwZWNpZmljXG4gKiBzdWJzeXN0ZW1zIG9mIGRlbHRhLmpzLlxuICpcbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBEZWx0YUpzIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsdGFKcyB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZVByb3h5ICAgICAgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0XHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdFx0ZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgKHRoaXMpO1xuXHRcdGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbmFtZSAgICAgICAge3N0cmluZ30gICAtIG5hbWUgb2YgdGhlIG5ldyBvcGVyYXRpb24gdHlwZVxuXHQgKiBAcGFyYW0gRGVsdGFDbGFzcyAge0Z1bmN0aW9ufSAtIHRoZSBuZXcgb3BlcmF0aW9uIGNsYXNzXG5cdCAqIEBwYXJhbSBQcm94eUNsYXNzIHs/RnVuY3Rpb259IC0gdGhlIG9wdGlvbmFsIGN1c3RvbSBQcm94eSBzdWJjbGFzcyBmb3IgdGhpcyBvcGVyYXRpb24tdHlwZVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBEZWx0YUNsYXNzLCBQcm94eUNsYXNzKSB7XG5cdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFUuYXNzZXJ0KG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSxcblx0XHRcdGBEZWx0YSBvcGVyYXRpb24gY2xhc3NlcyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtICcke25hbWV9JyBkb2VzIG5vdC5gKTtcblx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuRGVsdGFbbmFtZV0pLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBzdG9yZSB0aGUgb3BlcmF0aW9uIGNsYXNzICovXG5cdFx0dGhpcy5EZWx0YVtuYW1lXSA9IERlbHRhQ2xhc3M7XG5cblx0XHQvKiBzZXQgdGhlIChvcHRpb25hbCkgUHJveHkgY2xhc3MgKi9cblx0XHREZWx0YUNsYXNzLlByb3h5ID0gUHJveHlDbGFzcztcblxuXHRcdC8qIGZldGNoIHRoZSBnaXZlbiBhcHBseVRvIGZ1bmN0aW9uIChpZiBhbnkpIHdoaWNoIHdpbGwgYmUgc2xpZ2h0bHkgbW9kaWZpZWQgKi9cblx0XHR2YXIgZ2l2ZW5BcHBseVRvID0gRGVsdGFDbGFzcy5wcm90b3R5cGUuYXBwbHlUbyB8fCAoKCk9Pnt9KTtcblxuXHRcdC8qIGF1Z21lbnQgdGhlIGNsYXNzIHByb3RvdHlwZSAqL1xuXHRcdFUuZXh0ZW5kKERlbHRhQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogaWYgdGhlIHRhcmdldCBpcyBub3QgYWxyZWFkeSBpbiBUYXJnZXQgZm9ybSwgbWFrZSBpdCBzbyBub3cgKi9cblx0XHRcdFx0aWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCkpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBuZXcgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCh0YXJnZXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXMuZXZhbHVhdGVQcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRnaXZlbkFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSxcblx0XHRcdHR5cGU6IG5hbWVcblx0XHR9KTtcblxuXHRcdC8qIGNyZWF0ZSBhbnkgZ2l2ZW4gbWV0aG9kcyB3aXRoIGRlZmF1bHQgaGFuZGxlciAqL1xuXHRcdHZhciBsb3dlcmNhc2VOYW1lID0gbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSk7XG5cdFx0KERlbHRhQ2xhc3MucHJvdG90eXBlLm1ldGhvZHMgfHwgW2xvd2VyY2FzZU5hbWVdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCAoLi4uYXJncykgPT4gbmV3IERlbHRhQ2xhc3MoLi4uYXJncykpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gRGVsdGFDbGFzcztcblx0fVxuXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kICB7c3RyaW5nfSAgIC0gbWV0aG9kIG5hbWVcblx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0ICovXG5cdG5ld1Byb3h5TWV0aG9kKG1ldGhvZCwgaGFuZGxlcikge1xuXHRcdHRoaXMuQ29udGFpbmVyUHJveHkubmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKTtcblx0fVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG5cblx0Y29uc3RydWN0b3Ioc3RyID0gXCJcIikge1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0XHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fVxuXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9XG5cblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblxuXHR0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5wcm9wKSkge1xuXHRcdFx0cmVzdWx0ICs9IHRoaXMucHJvcDtcblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLnJlc3QpKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBcIi5cIiArIHRoaXMucmVzdC50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cbn1cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdFx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG5cdGNvbnN0cnVjdG9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0XHRzdXBlcihkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZSBkZWx0YS10eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXIoZGVsdGEsIHZhbHVlKTtcblx0XHR0aGlzLm5hbWUgPSAnTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihkZWx0YTEsIGRlbHRhMikge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHRcdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHRcdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgZXh0ZW5kcyBDb21wb3NpdGlvbkVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdFx0c3VwZXIoZGVsdGExLCBkZWx0YTIpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0XHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBDb25zdHJhaW50RmFpbHVyZSBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZmVhdHVyZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlIGZlYXR1cmUgJyR7ZmVhdHVyZS5uYW1lfScgaXMgYm90aCBzZWxlY3RlZCBhbmQgZXhjbHVkZWQgYnkgaXRzIGNvbnN0cmFpbnRzLmA7XG5cdFx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25PcmRlckN5Y2xlIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZSBuZXcgYXBwbGljYXRpb24gb3JkZXIgYmV0d2VlbiAke2Zyb219IGFuZCAke3RvfSBjcmVhdGVkIGEgY3ljbGUuYDtcblx0XHR0aGlzLmZyb20gPSBmcm9tO1xuXHRcdHRoaXMudG8gICA9IHRvO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnJlc29sdmVkRGVsdGFDb25mbGljdCBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IoZGVsdGFzKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLm5hbWUgPSAnVW5yZXNvbHZlZERlbHRhQ29uZmxpY3QnO1xuXHRcdHZhciBkZWx0YU5hbWVzID0gZGVsdGFzLm1hcChkID0+IGAnJHtkLm5hbWV9J2ApLmpvaW4oJywnKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke2RlbHRhTmFtZXN9LmA7XG5cdFx0dGhpcy5kZWx0YXMgPSBkZWx0YXM7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubmFtZSA9ICdNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcic7XG5cdFx0dGhpcy5tZXNzYWdlID0gYE9ubHkgb25lIFByb3h5IHBlciBwYXRoIGNhbiBiZSBhY3RpdmUgYXQgYW55IGdpdmVuIHRpbWUuYDtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICAgICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyAgICAgICAgICBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0VS5vbmNlUGVyKGRlbHRhSnMsICdEZWx0YScsICgpID0+IHtcblxuXHRcdGRlbHRhSnMuRGVsdGEgPSBjbGFzcyBEZWx0YSB7XG5cblx0XHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdFx0dGhpcy5pZCA9ICsrRGVsdGEuX25leHRJRDtcblx0XHRcdFx0dGhpcy5hcmdzID0gYXJncztcblx0XHRcdH1cblxuXHRcdFx0Z2V0IGFyZygpICB7IHJldHVybiB0aGlzLmFyZ3NbMF0gfVxuXHRcdFx0c2V0IGFyZyh2KSB7IHRoaXMuYXJnc1swXSA9IHYgfVxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZykgfVxuXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdFx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdFx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCBvciBhbiBpbnN0YW5jZSBvZiBgRGVsdGFKcy5BcHBsaWNhdGlvbkVycm9yYFxuXHRcdFx0ICovXG5cdFx0XHRldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdFx0aWYgKHRoaXMucHJlY29uZGl0aW9uKSB7XG5cdFx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpcy5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBBcHBsaWNhdGlvbkVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHRcdCAqL1xuXHRcdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpICAgeyB2YWx1ZSA9IHZhbHVlLnZhbHVlICAgfVxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpLCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHRcdH1cblxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gZGVsdGFKcy5EZWx0YS5jb21wb3NlZCh0aGlzLCBvdGhlcikgfVxuXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdFx0aWYgKG9wdGlvbnMudGFyZ2V0UHJvcCkgICB7IHN0ciArPSBgIOKAuSR7b3B0aW9ucy50YXJnZXRQcm9wfeKAumAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHsgc3RyICs9IGA6ICR7dGhpcy5hcmdzLm1hcCgoYSkgPT4gSlNPTi5zdHJpbmdpZnkoYSkpLmpvaW4oJywnKX1gIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICB7IHN0ciArPSBgICgke3RoaXMuaWR9KWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyoqIHtAcHVibGljfXtAc3RhdGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHRcdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0XHQgKi9cblx0XHRcdHN0YXRpYyBuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdFx0ZGVsdGFKcy5EZWx0YS5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QHN0YXRpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBkZWx0YXMge1tEZWx0YUpzI0RlbHRhXX0gLSB0aGUgZGVsdGFzIHRvIGNvbXBvc2Vcblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0XHQgKi9cblx0XHRcdHN0YXRpYyBjb21wb3NlZCguLi5kZWx0YXMpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk5vT3AoKTtcblxuXHRcdFx0XHRkZWx0YXMuZm9yRWFjaCgoZGVsdGEpID0+IHtcblx0XHRcdFx0XHR2YXIgZDEgPSByZXN1bHQsXG5cdFx0XHRcdFx0ICAgIGQyID0gZGVsdGEgfHwgbmV3IGRlbHRhSnMuRGVsdGEuTm9PcCgpO1xuXG5cdFx0XHRcdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdFx0XHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSBEZWx0YS5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRcdFx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHRcdFx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0XHRcdFx0cmVzdWx0ID0gY29tcG9zZUZuKGQxLCBkMik7XG5cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblxuXG5cdFx0fTtcblx0XHRkZWx0YUpzLkRlbHRhLl9uZXh0SUQgPSAwO1xuXHRcdGRlbHRhSnMuRGVsdGEuX2NvbXBvc2l0aW9ucyAgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cblx0fSk7XG5cdFUub25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAnRGVsdGEnLCAoKSA9PiB7XG5cblx0XHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHRcdFx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0XHRcdCAqL1xuXHRcdFx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHRcdHRoaXMuRGVsdGEubmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ092ZXJsb2FkZWQnLCAoKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdPdmVybG9hZGVkJywgY2xhc3MgT3ZlcmxvYWRlZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLm92ZXJsb2FkcyA9IHRoaXMuYXJnIHx8IFtdO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5ldmFsdWF0ZVByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0fSk7XG5cblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChcblx0ZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHxcblx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWRcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVQcm94eSBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdNb2RpZnknLCAoKSA9PiB7XG5cblx0ZGVmaW5lUHJveHkoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdNb2RpZnknLCBjbGFzcyBNb2RpZnkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblxuXHRcdGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXHRcdFx0dGhpcy5zdWJEZWx0YXMgPSB7fTtcblx0XHRcdFUuZXh0ZW5kKHRoaXMuc3ViRGVsdGFzLCB0aGlzLmFyZyB8fCB7fSk7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuY2xvbmUoKTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5zdWJEZWx0YXNbcHJvcF0gPSB0aGlzLnN1YkRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuc3ViRGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGlmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0XHR0aGlzLnN1YkRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSBzdXBlci50b1N0cmluZyhvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLnN1YkRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0XG5cdFx0XHRcdFx0XHQua2V5cyh0aGlzLnN1YkRlbHRhcylcblx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuc3ViRGVsdGFzW3BdLnRvU3RyaW5nKFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHRhcmdldFByb3A6IHAgfSkpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblxuXHR9LCBjbGFzcyBNb2RpZnlQcm94eSBleHRlbmRzIGRlbHRhSnMuQ29udGFpbmVyUHJveHkge1xuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNNZXRob2RDYW5CZVN0YXRpY1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcmF3QXJncyB7KltdfVxuXHRcdCAqIEByZXR1cm4gez97IG9wdGlvbnM6IE9iamVjdCwgYXJnczogKltdIH19XG5cdFx0ICovXG5cdFx0cHJvY2Vzc1Byb3h5QXJndW1lbnRzKC4uLnJhd0FyZ3MpIHtcblx0XHRcdC8vIHJhd0FyZ3MgaXMgcGFyc2VkIGFzICguLi5vcHRpb25zLCBwYXRoLCAuLi5hcmdzKSxcblx0XHRcdC8vIHRob3VnaCBwYXRoIG1heSBhbHNvIGJlIHBhc3NlZCBhcyBhbiBvcHRpb24gZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5Qcm94eSBtZXRob2QgaXMgaW5zdWZmaWNpZW50LmApIH1cblx0XHRcdFx0dmFyIGFyZyA9IHJhd0FyZ3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7IG9wdGlvbnMucGF0aCA9IGFyZyAgICAgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICAgICAgICAgIHsgVS5leHRlbmQob3B0aW9ucywgYXJnKSB9XG5cdFx0XHR9IHdoaWxlICghb3B0aW9ucy5wYXRoKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9IC0gdGhlIGRlZXBlc3QgcHJveHkgY3JlYXRlZCBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRhZGRPcGVyYXRpb24oZGVsdGEsIG9wdGlvbnMpIHtcblx0XHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXHRcdFx0aWYgKCFwYXRoLnByb3ApIHsgdGhyb3cgbmV3IEVycm9yKCdPcGVyYXRpb25zIG9uIGEgTW9kaWZ5LlByb3h5IG5lZWQgdG8gaGF2ZSBhIG5vbi1lbXB0eSBwYXRoLicpIH1cblxuXHRcdFx0LyogY3JlYXRlIHByb3hpZXMgKi9cblx0XHRcdHZhciBkZWVwZXN0UHJveHk7XG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdGxldCBuZXdPcHRpb25zID0gVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogcGF0aC5yZXN0IH0pO1xuXHRcdFx0XHRsZXQgY2hpbGRQcm94eSA9IHRoaXMuYWRkQ2hpbGRQcm94eShwYXRoLnByb3AsIG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpKTtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gY2hpbGRQcm94eS5hZGRPcGVyYXRpb24oZGVsdGEsIG5ld09wdGlvbnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVlcGVzdFByb3h5ID0gdGhpcy5hZGRDaGlsZFByb3h5KHBhdGgucHJvcCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOT1RFOiBNb2RpZnkgb3BlcmF0aW9ucyBkbyBub3QgKHlldCkgdXNlIGFueSBvcHRpb25zXG5cblx0XHRcdC8qIHJldHVybiB0aGUgZGVlcGVzdCBjcmVhdGVkIHByb3h5ICovXG5cdFx0XHRyZXR1cm4gZGVlcGVzdFByb3h5O1xuXHRcdH1cblxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIER5bmFtaWNhbGx5IGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZGVsdGEgYmVsb25naW5nIHRvIHRoaXMgcHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eVxuXHRcdCAqL1xuXHRcdGRlbHRhKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmRlbHRhKCk7XG5cdFx0XHRyZXN1bHQuc3ViRGVsdGFzID0ge307XG5cdFx0XHR0aGlzLmNoaWxkS2V5cygpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IHRoaXMuY2hpbGREZWx0YShwcm9wKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLnN1YkRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LnN1YkRlbHRhc1twcm9wXSA9IGRlbHRhSnMuRGVsdGEuY29tcG9zZWQocmVzdWx0LnN1YkRlbHRhc1twcm9wXSwgZDIuc3ViRGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufSk7XG5cblxuLy8vKioge0BwdWJsaWN9e0BtZXRob2R9IC8vIFRPRE86IHJlcGxhY2UgYWxsIHRoaXMgdGhyb3VnaCB0aGUgbmV3IFByb3h5IHJlZmFjdG9yaW5nXG4vLyAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH0gLSBhbnkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcbi8vICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuLy8gKiBAcGFyYW0gYXJncyB7WypdfSAgICAgICAtIHRoZSBhcmd1bWVudHMgdG8gdGhlIG9wZXJhdGlvblxuLy8gKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG4vLyAqL1xuLy9vcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgLi4uYXJncykge1xuLy9cdHZhciBhcmdzcyA9IFsuLi5hcmd1bWVudHNdO1xuLy9cdHZhciBhbGxPcHRpb25zID0ge307XG4vL1x0d2hpbGUgKHR5cGVvZiBhcmdzc1swXSA9PT0gJ29iamVjdCcpIHtcbi8vXHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3NzLnNoaWZ0KCkpO1xuLy9cdH1cbi8vXHRwYXRoID0gYXJnc3Muc2hpZnQoKTtcbi8vXHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIC4uLmFyZ3NzKTtcbi8vXHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG4vL31cbi8vLyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cbi8vICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cbi8vICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cbi8vICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG4vLyAqL1xuLy9fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG4vL1x0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG4vL1x0aWYgKHBhdGgucmVzdCkge1xuLy9cdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKHsgbWV0aG9kOiAnbW9kaWZ5JyB9LCBwYXRoLnByb3ApXG4vL1x0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuLy9cdH1cbi8vXG4vL1x0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cbi8vXHR0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuc3ViRGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuLy9cbi8vXHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG4vL1x0cmV0dXJuICh0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuLy99XG5cbi8vLyoqIHtAcHVibGljfXtAbWV0aG9kfVxuLy8gKiBHZXQgdGhlIGRlZXBlc3QgZXhpc3RpbmcgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gYSByZWxhdGl2ZSBwYXRoLlxuLy8gKiBAcGFyYW0gcGF0aCB7UGF0aH0gLSBhIHBhdGggcmVsYXRpdmUgdG8gdGhpcyBkZWx0YVxuLy8gKiBAcmV0dXJuIHt7IGRlbHRhOiBEZWx0YUpzI0RlbHRhLk1vZGlmeSwgcmVzdDogUGF0aCB9fSAtIHRoZSBkZWVwZXN0IE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwYXRoLFxuLy8gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgdW51c2VkIHJlc3Qgb2YgdGhlIHBhdGhcbi8vICovXG4vL2RlZXBlc3RNb2RpZnlEZWx0YUJ5UGF0aChwYXRoKSB7IC8vIFRPRE86IG5vdCBuZWVkZWQgYW55bW9yZSwgcmlnaHQ/XG4vL1x0aWYgKFUuaXNVbmRlZmluZWQocGF0aC5wcm9wKSB8fCB0aGlzLnN1YkRlbHRhc1twYXRoLnByb3BdLnR5cGUgIT09ICdNb2RpZnknKSB7XG4vL1x0XHRyZXR1cm4geyBkZWx0YTogdGhpcywgcmVzdDogcGF0aCB9O1xuLy9cdH1cbi8vXHRyZXR1cm4gdGhpcy5zdWJEZWx0YXNbcGF0aC5wcm9wXS5kZWVwZXN0TW9kaWZ5RGVsdGFCeVBhdGgocGF0aC5yZXN0IHx8IG5ldyBQYXRoKCkpO1xuLy99XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnYmFzaWMgb3BlcmF0aW9ucycsICgpID0+IHtcblxuXHRkZWZpbmVEZWx0YSAoZGVsdGFKcyk7XG5cdGRlZmluZU1vZGlmeShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnLCBjbGFzcyBOb09wIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnQWRkJywgY2xhc3MgQWRkIGV4dGVuZHMgZGVsdGFKcy5EZWx0YSB7XG5cdFx0Ly9jb25zdHJ1Y3RvciguLi5hcmdzKSB7IHN1cGVyKC4uLmFyZ3MpIH1cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC52YWx1ZSA9IHRoaXMuYXJnIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVwbGFjZScsIGNsYXNzIFJlcGxhY2UgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmFyZyB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIGNsYXNzIFJlbW92ZSBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIGNsYXNzIEZvcmJpZCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ05vT3AnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Ob09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCBkKCdBZGQnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknICksIGQoJ1JlcGxhY2UnLCAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnUHV0SW50b0FycmF5JywgKCkgPT4ge1xuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblx0ZGVmaW5lUHJveHkgICAgICAgICAgKGRlbHRhSnMpO1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCBjbGFzcyBQdXRJbnRvQXJyYXkgZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH1cblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRnZXQgbWV0aG9kcygpIHsgcmV0dXJuIFtdIH1cblx0fSk7XG5cblxuXHQvKiBQcm94eSBtZXRob2RzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ3ByZXBlbmQnLCAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ3ByZXBlbmQnLCB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2luc2VydCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2luc2VydCcsICB2YWx1ZSB9KSk7XG5cdGRlbHRhSnMubmV3UHJveHlNZXRob2QoJ2FwcGVuZCcsICAodmFsdWUpID0+IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSh7IG1ldGhvZDogJ2FwcGVuZCcsICB2YWx1ZSB9KSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgICAgICAnUHV0SW50b0FycmF5JyksIGQoJ0FkZCcsICAgICAoe2QyLCBwMX0pID0+IGQyLmFwcGxpZWRUbyhwMSkpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAgICAgICdQdXRJbnRvQXJyYXknKSwgZCgnUmVwbGFjZScsICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JywgJ1JlbW92ZScgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknLCAnUmVwbGFjZScgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScsICdQdXRJbnRvQXJyYXknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoWy4uLmQxLnZhbHVlcywgLi4uZDIudmFsdWVzXSk7XG5cdH0pO1xuXG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVByb3h5ICAgICAgICAgICBmcm9tICcuL1Byb3h5LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4gVS5vbmNlUGVyKGRlbHRhSnMsICdQdXRJbnRvRnVuY3Rpb24nLCAoKSA9PiB7XG5cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cdGRlZmluZVByb3h5ICAgICAgICAgIChkZWx0YUpzKTtcblxuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCBjbGFzcyBQdXRJbnRvRnVuY3Rpb24gZXh0ZW5kcyBkZWx0YUpzLkRlbHRhIHtcblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5hcmcgPyAoQXJyYXkuaXNBcnJheSh0aGlzLmFyZykgPyB0aGlzLmFyZyA6IFt0aGlzLmFyZ10pIDogW107XG5cdFx0fVxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQudmFsdWVzID0gWy4uLnRoaXMudmFsdWVzXTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9XG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGdldCBtZXRob2RzKCkgeyByZXR1cm4gW10gfVxuXHR9KTtcblxuXG5cdC8qIFByb3h5IG1ldGhvZHMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgncHJlcGVuZCcsICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAncHJlcGVuZCcsIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnaW5zZXJ0JywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnaW5zZXJ0JywgIHZhbHVlIH0pKTtcblx0ZGVsdGFKcy5uZXdQcm94eU1ldGhvZCgnYXBwZW5kJywgICh2YWx1ZSkgPT4gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKHsgbWV0aG9kOiAnYXBwZW5kJywgIHZhbHVlIH0pKTtcblxuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgZCgnQWRkJywgICAgICh7ZDIsIHAxfSkgPT4gZDIuYXBwbGllZFRvKHAxKSkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCBkKCdSZXBsYWNlJywgKHtkMiwgcDF9KSA9PiBkMi5hcHBsaWVkVG8ocDEpKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbihbLi4uZDEudmFsdWVzLCAuLi5kMi52YWx1ZXNdKTtcblx0fSk7XG5cblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICBmcm9tICcuL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lUHJveHkgICAgICAgICAgICAgZnJvbSAnLi9Qcm94eS5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiBVLm9uY2VQZXIoZGVsdGFKcywgJ0RlbHRhTW9kZWwnLCAoKSA9PiB7XG5cblx0ZGVmaW5lTW9kaWZ5KGRlbHRhSnMpO1xuXHRkZWZpbmVQcm94eSAoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdEZWx0YU1vZGVsJywgY2xhc3MgRGVsdGFNb2RlbCBleHRlbmRzIGRlbHRhSnMuRGVsdGEge1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJncykge1xuXHRcdFx0c3VwZXIoLi4uYXJncyk7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9XG5cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBzdXBlci5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gc3VwZXIudG9TdHJpbmcob3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSwgY2xhc3MgRGVsdGFNb2RlbFByb3h5IGV4dGVuZHMgZGVsdGFKcy5Db250YWluZXJQcm94eSB7XG5cblx0XHRjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG5cdFx0XHRzdXBlciguLi5hcmdzKTtcblx0XHRcdHRoaXMuX2NoaWxkT3B0aW9ucyA9IHt9OyAvLyBrZXkgLT4gb3B0aW9ucy1vZi1maXJzdC1vY2N1cnJlbmNlXG5cdFx0XHR0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9ucyA9IHt9OyAvLyBrZXkgLT4gYXBwbGljYXRpb24tY29uZGl0aW9uXG5cdFx0fVxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSByYXdBcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7P3sgb3B0aW9uczogT2JqZWN0LCBhcmdzOiAqW10gfX1cblx0XHQgKi9cblx0XHRwcm9jZXNzUHJveHlBcmd1bWVudHMoLi4ucmF3QXJncykge1xuXHRcdFx0Ly8gcmF3QXJncyBpcyBwYXJzZWQgYXMgKC4uLm9wdGlvbnMsIG5hbWUsIC4uLm9wdGlvbnMsIHBhdGgsIC4uLmFyZ3MpLFxuXHRcdFx0Ly8gdGhvdWdoIG5hbWUgYW5kL29yIHBhdGggbWF5IGFsc28gYmUgcGFzc2VkIGFzIG9wdGlvbnMgZGlyZWN0bHlcblx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChyYXdBcmdzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhcmd1bWVudCBsaXN0IGZvciB0aGlzIE1vZGlmeS5EZWx0YU1vZGVsIG1ldGhvZCBpcyBpbnN1ZmZpY2llbnQuYCkgfVxuXHRcdFx0XHR2YXIgYXJnID0gcmF3QXJncy5zaGlmdCgpO1xuXHRcdFx0XHRpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMubmFtZSkgeyBvcHRpb25zLm5hbWUgPSBhcmcgICAgIH1cblx0XHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgeyBvcHRpb25zLnBhdGggPSBhcmcgICAgIH1cblx0XHRcdFx0fSBlbHNlICAgICAgICAgICAgICAgICB7IFUuZXh0ZW5kKG9wdGlvbnMsIGFyZykgfVxuXHRcdFx0fSB3aGlsZSAoIW9wdGlvbnMucGF0aCB8fCAhb3B0aW9ucy5uYW1lKTtcblx0XHRcdHJldHVybiB7IG9wdGlvbnMsIGFyZ3M6IHJhd0FyZ3MgfTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI1Byb3h5fVxuXHRcdCAqL1xuXHRcdGFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucykge1xuXHRcdFx0dmFyIHtwYXRoLCBuYW1lLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdC8qIGNyZWF0ZSBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsIGVwb255bW91cyBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHRsZXQgYXBwQ29uZDtcblx0XHRcdFx0aWYgKGZlYXR1cmUpIHsgYXBwQ29uZCA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICB7IGFwcENvbmQgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoIGBkZWx0YV9fJHtuYW1lfWAsIFUuZXh0ZW5kKHsgaGlkZGVuOiB0cnVlIH0sIG9wdGlvbnMpICkgfVxuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLmlmKG9wdGlvbnNbJ3Jlc29sdmVzJ10pO1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBmZWF0dXJlOiBmYWxzZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcblx0XHRcdFx0XHRhcHBDb25kLnNlbGVjdHMob3B0aW9uc1sncmVxdWlyZXMnXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGZlYXR1cmUgfHwgYXBwQ29uZC5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRcdGRlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gYXBwQ29uZDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9jaGlsZEFwcGxpY2F0aW9uQ29uZGl0aW9uc1tuYW1lXSA9IGFwcENvbmQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGNyZWF0ZSBwcm94aWVzICovXG5cdFx0XHR2YXIgZGVlcGVzdFByb3h5O1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRsZXQgbmV3T3B0aW9ucyA9IFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IG5hbWU6IHVuZGVmaW5lZCB9KTtcblx0XHRcdFx0bGV0IGNoaWxkUHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCkpO1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSBjaGlsZFByb3h5LmFkZE9wZXJhdGlvbihkZWx0YSwgbmV3T3B0aW9ucyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWVwZXN0UHJveHkgPSB0aGlzLmFkZENoaWxkUHJveHkobmFtZSwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSBvcHRpb25zICovXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkT3B0aW9uc1tuYW1lXSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnNbbmFtZV0gPSBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGRlZXBlc3QgY3JlYXRlZCBwcm94eSAqL1xuXHRcdFx0cmV0dXJuIGRlZXBlc3RQcm94eTtcblx0XHR9XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogRHluYW1pY2FsbHkgY29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBkZWx0YSBiZWxvbmdpbmcgdG8gdGhpcyBwcm94eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4gdGhlIGRlbHRhIGJlbG9uZ2luZyB0byB0aGlzIHByb3h5XG5cdFx0ICovXG5cdFx0ZGVsdGEoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gc3VwZXIuZGVsdGEoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5jbGVhcigpO1xuXHRcdFx0dGhpcy5jaGlsZEtleXMoKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGxldCBvcHRpb25zID0gdGhpcy5fY2hpbGRPcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8qIGRlbHRhIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzLmNoaWxkRGVsdGEobmFtZSk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGEpO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIG9yZGVyICovXG5cdFx0XHRcdFsgLi4ub3B0aW9uc1sncmVzb2x2ZXMnXXx8W10sIC4uLm9wdGlvbnNbJ2FmdGVyJ118fFtdLCAuLi5vcHRpb25zWydyZXF1aXJlcyddfHxbXSBdLmZvckVhY2goKHN1Yk5hbWUpID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguY3JlYXRlRWRnZShzdWJOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRpZiAocmVzdWx0LmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3ViTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Yk5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyogYXBwbGljYXRpb24gY29uZGl0aW9uICovXG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgdGhpcy5fY2hpbGRBcHBsaWNhdGlvbkNvbmRpdGlvbnNbbmFtZV0uY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IHRoaXMuX2NoaWxkQXBwbGljYXRpb25Db25kaXRpb25zW25hbWVdO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiBjb21wb3NpdGlvbiAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKFxuXHRcdGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsIHx8XG5cdFx0ZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWxcblx0KSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKCk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn0pO1xuXG5cblxuLy8vKioge0BwdWJsaWN9e0BtZXRob2R9IC8vIFRPRE86IHJlZG8gdGhpcyBzdHVmZiB3aXRoIHRoZSBuZXcgUHJveHkgcmVmYWN0b3Jpbmdcbi8vICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuLy8gKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcbi8vICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG4vLyAqIEBwYXJhbSBvcHRpb25zMiB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuLy8gKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuLy8gKiBAcGFyYW0gYXJncyB7WypdfSAgICAgICAgIC0gdGhlIGFyZ3VtZW50cyB0byB0aGUgb3BlcmF0aW9uXG4vLyAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cbi8vICovXG4vL29wZXJhdGlvbihvcHRpb25zMSwgbmFtZSwgb3B0aW9uczIsIHBhdGgsIC4uLmFyZ3MpIHtcbi8vXHR2YXIgYXJnc3MgPSBbLi4uYXJndW1lbnRzXTtcbi8vXHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuLy9cdHdoaWxlICh0eXBlb2YgYXJnc3NbMF0gPT09ICdvYmplY3QnKSB7XG4vL1x0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzcy5zaGlmdCgpKTtcbi8vXHR9XG4vL1x0bmFtZSA9IGFyZ3NzLnNoaWZ0KCk7XG4vL1x0d2hpbGUgKHR5cGVvZiBhcmdzc1swXSA9PT0gJ29iamVjdCcpIHtcbi8vXHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3NzLnNoaWZ0KCkpO1xuLy9cdH1cbi8vXHRwYXRoID0gYXJnc3Muc2hpZnQoKTtcbi8vXHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIC4uLmFyZ3NzKTtcbi8vXHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG4vL31cbi8vXG4vL1xuLy9fYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG4vL1x0dmFyIGRlbHRhQmFzZTtcbi8vXG4vL1x0LyogY2hlY2sgaWYgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyAqL1xuLy9cdHZhciBleGlzdGluZ0RlbHRhID0gdGhpcy5ncmFwaC52ZXJ0ZXhWYWx1ZShuYW1lKTtcbi8vXG4vL1xuLy9cbi8vXHRpZiAoVS5pc0RlZmluZWQoZXhpc3RpbmdEZWx0YSkgJiYgZXhpc3RpbmdEZWx0YS50eXBlID09PSAnTW9kaWZ5JyAmJiBVLmlzRGVmaW5lZChwYXRoLnJlc3QpKSB7XG4vL1x0XHRyZXR1cm4gZXhpc3RpbmdEZWx0YS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuLy9cdH1cbi8vXG4vL1xuLy9cdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuLy9cdGlmIChwYXRoLnByb3ApIHtcbi8vXHRcdGRlbHRhQmFzZSA9IG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpO1xuLy9cdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuLy9cdH1cbi8vXG4vL1x0LyogaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRlbHRhIHdpdGggdGhpcyBuYW1lLCBjb21wb3NlIHRoZW0gYW5kIHJldHVybiBgZGVsdGFgIGVhcmx5ICovXG4vL1x0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpKSB7XG4vL1x0XHRkZWx0YUJhc2UgPSBleGlzdGluZ0RlbHRhLmNvbXBvc2VkV2l0aChkZWx0YUJhc2UpO1xuLy9cdFx0ZGVsdGFCYXNlLm5hbWUgPSBleGlzdGluZ0RlbHRhLm5hbWU7XG4vL1x0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBleGlzdGluZ0RlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uO1xuLy9cdFx0dGhpcy5ncmFwaC5zZXRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcbi8vXHR9IGVsc2Uge1xuLy9cbi8vXHRcdC8qIGFkZCB0aGUgbmV3IGRlbHRhIHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuLy9cdFx0ZGVsdGFCYXNlLm5hbWUgPSBuYW1lO1xuLy9cdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcbi8vXG4vL1x0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG4vL1x0XHQob3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXSkuY29uY2F0KG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdKS5mb3JFYWNoKChzdWJvcmRpbmF0ZU5hbWUpID0+IHtcbi8vXHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG4vL1x0XHRcdGlmICh0aGlzLmdyYXBoLmhhc0N5Y2xlKCkpIHtcbi8vXHRcdFx0XHR0aGlzLmdyYXBoLnJlbW92ZUV4aXN0aW5nRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuLy9cdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcbi8vXHRcdFx0fVxuLy9cdFx0fSk7XG4vL1xuLy9cdFx0LyogYXBwbGljYXRpb24gY29uZGl0aW9uIGFuZCBvcHRpb25hbGx5LCBhbiBlcG9ueW1vdXMsIGxpbmtlZCBmZWF0dXJlICovXG4vL1x0XHR2YXIgZGVsdGFGZWF0dXJlO1xuLy9cdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSkgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuLy9cdFx0ZWxzZSAgICAgICAgICAgICAgICAgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoIGBkZWx0YV9fJHtuYW1lfWAsIFUuZXh0ZW5kKHsgaGlkZGVuOiB0cnVlIH0sIG9wdGlvbnMpICkgfVxuLy9cdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcbi8vXHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZGVsdGFGZWF0dXJlO1xuLy9cdFx0fVxuLy9cbi8vXHRcdC8qIGV4dHJhY3QgJ2lmJyBmcm9tIGNvbXBvdW5kIG9wdGlvbnMgKi9cbi8vXHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuLy9cdFx0XHRkZWx0YUZlYXR1cmUuaWYob3B0aW9uc1sncmVzb2x2ZXMnXSk7XG4vL1x0XHR9XG4vL1xuLy9cdFx0LyogZXh0cmFjdCAnc2VsZWN0cycgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG4vL1x0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcbi8vXHRcdFx0ZGVsdGFGZWF0dXJlLnNlbGVjdHMob3B0aW9uc1sncmVxdWlyZXMnXSk7XG4vL1x0XHR9XG4vL1x0fVxuLy9cbi8vXHRyZXR1cm4gZGVsdGE7XG4vL31cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRVLm9uY2VQZXIoZGVsdGFKcywgJ2ZlYXR1cmVzJywgKCkgPT4ge1xuXG5cdFx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0XHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0XHRyZXR1cm4gaW5wdXQ7XG5cdFx0fVxuXG5cblx0XHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHRcdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdFx0dmFyIF9zZWxlY3RlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0XHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFx0VS5hKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cdFx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHRcdHZhciBfb25seUlmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGNvbmp1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHRcdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0XHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHRcdH0gZWxzZSBpZiAoY29uanVuY3QgPT09IHRydWUpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0VS5hKF9vbmx5SWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShjb25qdW5jdCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmdW5jdGlvbiBfYWRkUmVxdWlyZWRCeShmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblx0XHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCFfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdKSB7XG5cdFx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRcdGlmICgoX2lmW2ZlYXR1cmVOYW1lXSB8fCBbXSkuc29tZShkaXNqID0+IGRpc2ouZXZlcnkoY29uaiA9PiBfc2VsZWN0ZWRbY29ual0pKSkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXG5cdFx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ29ubHlJZicgY29uanVuY3RzIHRoYXQgYXJlIGV4Y2x1ZGVkLCB0aGlzIGZlYXR1cmUgaXMgZXhjbHVkZWQgKi9cblx0XHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRkZWx0YUpzLkZlYXR1cmUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHRcdH0pO1xuXG5cdFx0fSwge1xuXHRcdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdFx0fSxcblx0XHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdGdldCBjb25kaXRpb25hbCgpIHsgcmV0dXJuIFUuYShfaWYsICAgICB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRcdGdldCByZXN0cmljdGVkKCkgIHsgcmV0dXJuIFUuYShfb25seUlmLCB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8qIHJlc3RyaWN0aW9ucyBhbmQgY29ubmVjdGlvbnMgKi9cblx0XHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFx0WyAnaWYnLCAgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICBdLCAvLyB0aGlzIHNlbGVjdGVkIGJ5IG90aGVyXG5cdFx0XHRbICdvbmx5SWYnLCAgICAgW19hZGRPbmx5SWZdICAgICAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIHRoaXMgYnV0IG5vdCBvdGhlclxuXHRcdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0XHRbICdyZXF1aXJlZEJ5JywgW19hZGRSZXF1aXJlZEJ5XSAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIG90aGVyIGJ1dCBub3QgdGhpc1xuXHRcdFx0WyAnaWZmJywgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5LCBfYWRkT25seUlmXSBdICAvLyBpZiBhbmQgb25seUlmXG5cdFx0XTtcblx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlLmFkZE9wdGlvbiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbiwgbWV0aG9kc10pID0+IHtcblx0XHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0XHRtZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBtZXRob2QodGhpcy5uYW1lLCB2YWx1ZSkgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbmFtZV0pID0+IHtcblx0XHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0dGhpcy5hZGRPcHRpb24obmFtZSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0XHR9KTtcblxuXG5cdFx0LyogdGhlIGZlYXR1cmVzIGJlbG9uZ2luZyB0byB0aGlzIERlbHRhSnMgaW5zdGFuY2UgKi9cblx0XHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cdH0pO1xuXHRVLm9uY2VQZXIoZGVsdGFKcy5jb25zdHJ1Y3RvciwgJ2ZlYXR1cmVzJywgKCkgPT4ge1xuXG5cdFx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0XHQgKi9cblx0XHRcdG5ld0ZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdFx0cmV0dXJuIHRoaXMuZmVhdHVyZXNbbmFtZV0gPSBuZXcgdGhpcy5GZWF0dXJlKG5hbWUsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRVLm9uY2VQZXIoZGVsdGFKcywgJ3ZhcmlhdGlvbiBwb2ludHMnLCAoKSA9PiB7XG5cblx0XHRkZWZpbmVEZWx0YU1vZGVsKGRlbHRhSnMpO1xuXG5cdFx0ZGVsdGFKcy5fZGVsdGFNb2RlbFByb3h5ID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpLmRvKCk7XG5cblx0fSk7XG5cdFUub25jZVBlcihkZWx0YUpzLmNvbnN0cnVjdG9yLCAndmFyaWF0aW9uIHBvaW50cycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdFx0ICovXG5cdFx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHRcdHRoaXMuX2RlbHRhTW9kZWxQcm94eS5kZWx0YSgpLmFwcGx5VG8ocm9vdCwge1xuXHRcdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCByZXR1cm5zIHRoZSBwcm94eSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHRcdCAqIG92ZXJ3cml0dGVuIG1hbnVhbGx5LlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX0gLSB0aGUgcHJveHkgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdFx0ICovXG5cdFx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsUHJveHkuZG8oeyBmZWF0dXJlOiB0cnVlIH0sIC4uLmFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdFUub25jZVBlcihkZWx0YUpzLCAnYXBwbGljYXRpb24gY29uZGl0aW9ucycsICgpID0+IHtcblxuXHRcdFUuZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cblx0XHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRcdHJldHVybiBVLmlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQ7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcblx0VS5vbmNlUGVyKGRlbHRhSnMuY29uc3RydWN0b3IsICdhcHBsaWNhdGlvbiBjb25kaXRpb25zJywgKCkgPT4ge1xuXG5cdFx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShmZWF0dXJlKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3QoLi4uZmVhdHVyZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAgIGZyb20gJy4vT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQge011bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuLy8gVE9ETzogQmFrZSBpbiBkZWx0YSBtb2RlbCBmdW5jdGlvbmFsaXR5XG4vLyBET05FOiAnb25lIFByb3h5IGFjdGl2ZSBhdCBhIHRpbWUnIChjYW5ub3QgdXNlIGVhcmxpZXIgb25lcyBhZnRlciBuZXcgb25lcyBoYXZlIGJlZW4gdXNlZClcbi8vIFRPRE86IEJhc2ljIGFwcGxpY2F0aW9uIG9mIGRlbHRhc1xuLy8gVE9ETzogQ29tcG9zaXRpb24gaW4gb3JkZXIgdG8gZ2VuZXJhdGUgZXJyb3IgbWVzc2FnZXNcbi8vIFRPRE86IEVycm9yIG1lc3NhZ2VzIGJhc2VkIG9uIHN5bnRhY3RpYyBjb25mbGljdHMgaW4gZGVsdGEgbW9kZWxzXG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IFUub25jZVBlcihkZWx0YUpzLCAnUHJveHknLCAoKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5Qcm94eSA9IGNsYXNzIFByb3h5IHtcblxuXHRcdGNvbnN0cnVjdG9yKHtwYXJlbnQsIGRlbHRhfSA9IHt9KSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5fZGVsdGEgPSBkZWx0YTtcblx0XHR9XG5cblx0XHRkZWx0YSgpIHsgcmV0dXJuIHRoaXMuX2RlbHRhOyB9XG5cblx0XHRnZXQgYWN0aXZlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlIH1cblxuXHRcdGRlYWN0aXZhdGUoKSB7IHRoaXMuX2FjdGl2ZSA9IGZhbHNlIH1cblxuXHR9O1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGEgUHJveHkgY2xhc3MgZm9yIG5vbi1jb250YWluZXIgb3BlcmF0aW9uIHR5cGVzICovXG5cdGNsYXNzIEJhc2ljUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHt9XG5cdGRlbHRhSnMuQmFzaWNQcm94eSA9IEJhc2ljUHJveHk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogYSBQcm94eSBjbGFzcyBmb3IgY29udGFpbmVyIG9wZXJhdGlvbiB0eXBlcyBsaWtlIE1vZGlmeSBhbmQgRGVsdGFNb2RlbCAqL1xuXHRkZWx0YUpzLkNvbnRhaW5lclByb3h5ID0gY2xhc3MgQ29udGFpbmVyUHJveHkgZXh0ZW5kcyBkZWx0YUpzLlByb3h5IHtcblxuXHRcdC8vIEEgUHJveHkgaW5zdGFuY2UgZXhwb3NlcyBvcGVyYXRpb24gbWV0aG9kcyBkaXJlY3RseS4gQXJndW1lbnRzXG5cdFx0Ly8gdG8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gYmUgcHJlLXN1cHBsaWVkIHRocm91Z2ggdGhlIGBkb2AgbWV0aG9kLlxuXG5cdFx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRcdHRoaXMuX2RvQXJncyAgICAgICA9IFtdO1xuXHRcdFx0dGhpcy5fb3JpZ2luYWwgICAgID0gdGhpcztcblx0XHRcdHRoaXMuX2NoaWxkcmVuICAgICA9IHt9OyAvLyBrZXkgLT4gW3Byb3hpZXNdXG5cdFx0XHR0aGlzLl9jaGlsZE9wdGlvbnMgPSB7fTsgLy8ga2V5IC0+IG9wdGlvbnNcblx0XHR9XG5cblxuXHRcdGRlYWN0aXZhdGUoKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLl9jaGlsZHJlbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY2hpbGRQcm94eShrZXkpLmRlYWN0aXZhdGUoKTtcblx0XHRcdH0pO1xuXHRcdFx0c3VwZXIuZGVhY3RpdmF0ZSgpO1xuXHRcdH1cblxuXG5cdFx0YWRkQ2hpbGRQcm94eShrZXksIGRlbHRhKSB7XG5cdFx0XHQvKiBnZXQgdGhlIGN1cnJlbnQgcHJveHkgZm9yIHRoZSBnaXZlbiBrZXkgKi9cblx0XHRcdHZhciBjdXJyZW50ID0gdGhpcy5jaGlsZFByb3h5KGtleSk7XG5cblx0XHRcdC8qIGdldCAvIGNyZWF0ZSBkZWx0YSBwcm94eSAqL1xuXHRcdFx0dmFyIFByb3h5Q2xhc3MgPSBkZWx0YS5jb25zdHJ1Y3Rvci5Qcm94eSB8fCBkZWx0YUpzLkJhc2ljUHJveHk7XG5cdFx0XHR2YXIgcHJveHkgPSBuZXcgUHJveHlDbGFzcyh7IGRlbHRhLCBwYXJlbnQ6IHRoaXMgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY3VycmVudCBwcm94eSBpZiBpdCwgYW5kIHRoZSBjdXJyZW50IHByb3h5LCBhcmUgYm90aCBNb2RpZnkuUHJveHkgKi9cblx0XHRcdGlmIChjdXJyZW50IGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Nb2RpZnkuUHJveHkgJiZcblx0XHRcdFx0cHJveHkgICBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuTW9kaWZ5LlByb3h5KSB7IHJldHVybiBjdXJyZW50IH1cblxuXHRcdFx0Lyogd2UgbmVlZCBhIG5ldyBwcm94eSwgc28gZGVhY3RpdmF0ZSB0aGUgY3VycmVudCBvbmUgKi9cblx0XHRcdGlmIChjdXJyZW50KSB7IGN1cnJlbnQuZGVhY3RpdmF0ZSgpIH1cblxuXHRcdFx0LyogY3JlYXRlIGEgbmV3IFByb3h5IG9mIHRoZSByaWdodCBjbGFzcywgcmVtZW1iZXIgaXQgYW5kIHJldHVybiBpdCAqL1xuXHRcdFx0dGhpcy5fY2hpbGRyZW5ba2V5XS5wdXNoKHByb3h5KTtcblx0XHRcdHJldHVybiBwcm94eTtcblx0XHR9XG5cblxuXHRcdGNoaWxkS2V5cygpIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKSB9XG5cblxuXHRcdGNoaWxkUHJveGllcyhrZXkpIHsgcmV0dXJuIFUuYSh0aGlzLl9jaGlsZHJlbiwga2V5KSB9XG5cblxuXHRcdGNoaWxkUHJveHkoa2V5KSB7IHJldHVybiBVLmEodGhpcy5fY2hpbGRyZW4sIGtleSlbdGhpcy5fY2hpbGRyZW5ba2V5XS5sZW5ndGgtMV0gfVxuXG5cblx0XHRjaGlsZERlbHRhKGtleSkge1xuXHRcdFx0cmV0dXJuIGRlbHRhSnMuRGVsdGEuY29tcG9zZWQoXG5cdFx0XHRcdC4uLnRoaXMuY2hpbGRQcm94aWVzKGtleSkubWFwKHByb3h5ID0+IHByb3h5LmRlbHRhKCkpXG5cdFx0XHQpO1xuXHRcdH1cblxuXG5cdFx0ZG8oLi4uZG9BcmdzKSB7XG5cdFx0XHQvKiBpcyB0aGlzIHByb3h5IGFjdGl2ZT8gKi9cblx0XHRcdGlmICghdGhpcy5hY3RpdmUpIHsgdGhyb3cgbmV3IE11bHRpcGxlQWN0aXZlUHJveGllc0Vycm9yKCkgfVxuXG5cdFx0XHQvKiByZXR1cm4gYSB2ZXJzaW9uIG9mIHRoaXMgUHJveHkgd2l0aCBleHRyYSBwcmVsb2FkZWQgYXJncyAqL1xuXHRcdFx0Ly8gbm90ZSB0aGF0IHRoaXMgbWl4ZXMgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlXG5cdFx0XHQvLyBpbnRvIHRoZSBleGlzdGluZyBjbGFzc2ljYWwgaW5oZXJpdGFuY2Ugc2NoZW1lXG5cdFx0XHR2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcblx0XHRcdHJlc3VsdC5fZG9BcmdzICAgPSBbLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3NdO1xuXHRcdFx0cmVzdWx0Ll9vcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblxuXHRcdF9kbyhtZXRob2QsIGRvQXJncykge1xuXHRcdFx0LyogaXMgdGhpcyBwcm94eSBhY3RpdmU/ICovXG5cdFx0XHRpZiAoIXRoaXMuYWN0aXZlKSB7IHRocm93IG5ldyBNdWx0aXBsZUFjdGl2ZVByb3hpZXNFcnJvcigpIH1cblxuXHRcdFx0LyogY29udGFpbmVyLXNwZWNpZmljIHByb2Nlc3Npbmcgb2YgYXJndW1lbnRzICovXG5cdFx0XHR2YXIge29wdGlvbnMsIGFyZ3N9ID0gdGhpcy5wcm9jZXNzUHJveHlBcmd1bWVudHMoLi4udGhpcy5fZG9BcmdzLCAuLi5kb0FyZ3MpO1xuXG5cdFx0XHQvKiBpZiB0aGUgb3B0aW9ucyBjb250YWluIGEgcGF0aCwgcmVpZnkgaXQgKi9cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5wYXRoID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRvcHRpb25zLnBhdGggPSBuZXcgUGF0aChvcHRpb25zLnBhdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiB0aGUgYXJndW1lbnQgbGlzdCBpcyBmaW5pc2hlZDsgY3JlYXRlIGEgbmV3IGRlbHRhIGFuZCBwdXQgaXQgaW4gdGhlIHJpZ2h0IHBsYWNlICovXG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncyk7XG5cdFx0XHR2YXIgcHJveHkgPSB0aGlzLmFkZE9wZXJhdGlvbihkZWx0YSwgb3B0aW9ucyk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgcmlnaHQgUHJveHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nICovXG5cdFx0XHRyZXR1cm4gKHByb3h5IGluc3RhbmNlb2YgZGVsdGFKcy5Db250YWluZXJQcm94eSkgPyBwcm94eSA6IHRoaXM7XG5cdFx0fVxuXG5cblx0XHQvL25vaW5zcGVjdGlvbiBKU0NvbW1lbnRNYXRjaGVzU2lnbmF0dXJlXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogU3ViY2xhc3NlcyBvZiBgQ29udGFpbmVyUHJveHlgIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gZXh0cmFjdCBhblxuXHRcdCAqIG9wdGlvbnMgb2JqZWN0LCBwYXRoIGFuZCBmaW5hbCBhcmd1bWVudCBsaXN0IGZyb20gYSBnaXZlbiAncmF3JyBhcmd1bWVudCBsaXN0LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGFyZ3Mge1sqXX1cblx0XHQgKiBAcmV0dXJuIHt7b3B0aW9uczogT2JqZWN0LCBhcmdzOiBbKl19fVxuXHRcdCAqL1xuXHRcdHByb2Nlc3NQcm94eUFyZ3VtZW50cygpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSAnQ29udGFpbmVyUHJveHknIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ3Byb2Nlc3NQcm94eUFyZ3VtZW50cycgbWV0aG9kLmApO1xuXHRcdH1cblxuXG5cdFx0Ly9ub2luc3BlY3Rpb24gSlNDb21tZW50TWF0Y2hlc1NpZ25hdHVyZVxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIFN1YmNsYXNzZXMgb2YgYENvbnRhaW5lclByb3h5YCBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGFkZCBhIGdpdmVuIGRlbHRhXG5cdFx0ICogdW5kZXIgYSBnaXZlbiBwYXRoIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMsIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgUHJveHkuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjUHJveHl9XG5cdFx0ICovXG5cdFx0YWRkT3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBICdDb250YWluZXJQcm94eScgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnYWRkT3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBDcmVhdGUgYSBkZWx0YSBiYXNlZCBvbiBhIG1ldGhvZC1uYW1lIGFuZCBhcmd1bWVudC1saXN0LlxuXHRcdCAqIElmIHRoZSBtZXRob2QtbmFtZSBpcyBvdmVybG9hZGVkLCB5b3UnbGwgYXV0b21hdGljYWxseSBnZXRcblx0XHQgKiBhbiBgRGVsdGEuT3ZlcmxvYWRlZGAgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFyZ3MgICB7WypdfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0c3RhdGljIF9uZXdEZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJncykge1xuXHRcdFx0ZGVmaW5lT3ZlcmxvYWRlZChkZWx0YUpzKTtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSBkZWx0YUpzLkNvbnRhaW5lclByb3h5Ll9tZXRob2RIYW5kbGVyc1ttZXRob2RdLm1hcChoYW5kbGVyID0+IGhhbmRsZXIoLi4uYXJncykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHJldHVybiBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKG5ld0RlbHRhcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvKioge0BwdWJsaWN9e0BzdGF0aWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCAge3N0cmluZ30gICAtIG1ldGhvZCBuYW1lXG5cdFx0ICogQHBhcmFtIGhhbmRsZXIge0Z1bmN0aW9ufSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBtZXRob2QgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIG5ldyBgRGVsdGFKcyNEZWx0YWAgaW5zdGFuY2Vcblx0XHQgKi9cblx0XHRzdGF0aWMgbmV3UHJveHlNZXRob2QobWV0aG9kLCBoYW5kbGVyKSB7XG5cblx0XHRcdC8qIGF1dG9tYXRpY2FsbHkgcG9wdWxhdGUgdGhlIFByb3h5IGNsYXNzIHdpdGggbmV3IG9wZXJhdGlvbiBtZXRob2QgKi9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0pKSB7XG5cdFx0XHRcdGRlbHRhSnMuQ29udGFpbmVyUHJveHkucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9kbyhtZXRob2QsIGFyZ3MpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiByZWdpc3RlciBoYW5kbGVycyBmb3IgZWFjaCBtZXRob2QgKi9cblx0XHRcdFUuYShkZWx0YUpzLkNvbnRhaW5lclByb3h5LCAnX21ldGhvZEhhbmRsZXJzJywgbWV0aG9kKS5wdXNoKGhhbmRsZXIpO1xuXG5cdFx0fVxuXG5cdH07XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBhcmdzIHsqW119XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNQcm94eX1cblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHR2YXIgUHJveHlDbGFzcyA9IHRoaXMuY29uc3RydWN0b3IuUHJveHk7XG5cdFx0XHRpZiAoIVByb3h5Q2xhc3MpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nICdkbycgb24gZGVsdGEgdHlwZSAnJHt0aGlzLnR5cGV9Jywgd2hpY2ggaGFzIG5vIFByb3h5IGludGVyZmFjZS5gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJveHlDbGFzcyh7IGRlbHRhOiB0aGlzIH0pLmRvKC4uLmFyZ3MpO1xuXHRcdH1cblxuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1Byb3h5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==