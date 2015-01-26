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
/******/ 	return __webpack_require__(0).default;
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__,
	    $__DeltaJs_46_js__,
	    $__Target_46_js__,
	    $__Path_46_js__,
	    $__Error_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var DeltaJs = ($__DeltaJs_46_js__ = __webpack_require__(2), $__DeltaJs_46_js__ && $__DeltaJs_46_js__.__esModule && $__DeltaJs_46_js__ || {default: $__DeltaJs_46_js__}).default;
	var $__2 = ($__Target_46_js__ = __webpack_require__(3), $__Target_46_js__ && $__Target_46_js__.__esModule && $__Target_46_js__ || {default: $__Target_46_js__}),
	    ReadableTarget = $__2.ReadableTarget,
	    WritableTarget = $__2.WritableTarget;
	U.extend(DeltaJs, {
	  ReadableTarget: ReadableTarget,
	  WritableTarget: WritableTarget
	});
	var Path = ($__Path_46_js__ = __webpack_require__(4), $__Path_46_js__ && $__Path_46_js__.__esModule && $__Path_46_js__ || {default: $__Path_46_js__}).default;
	U.extend(DeltaJs, {Path: Path});
	var $__4 = ($__Error_46_js__ = __webpack_require__(5), $__Error_46_js__ && $__Error_46_js__.__esModule && $__Error_46_js__ || {default: $__Error_46_js__}),
	    ApplicationError = $__4.ApplicationError,
	    MultipleOverloadsApplicationError = $__4.MultipleOverloadsApplicationError,
	    NoOverloadsApplicationError = $__4.NoOverloadsApplicationError,
	    DeltaArgApplicationError = $__4.DeltaArgApplicationError,
	    CompositionError = $__4.CompositionError,
	    MultipleOverloadsCompositionError = $__4.MultipleOverloadsCompositionError,
	    ConstraintFailure = $__4.ConstraintFailure;
	U.extend(DeltaJs, {
	  ApplicationError: ApplicationError,
	  MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError,
	  DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError,
	  MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure
	});
	var $__default = DeltaJs;
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var U = {
	  newClass: function() {
	    var constructor = arguments[0] !== (void 0) ? arguments[0] : {};
	    var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	    if (typeof constructor !== 'function') {
	      prototype = constructor;
	      constructor = function() {};
	    }
	    var cls = constructor;
	    cls.prototype = prototype;
	    cls.prototype.constructor = cls;
	    return cls;
	  },
	  newSubclass: function(superClass) {
	    var constructorMaker = arguments[1] !== (void 0) ? arguments[1] : {};
	    var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	    if (typeof constructorMaker !== 'function') {
	      prototype = constructorMaker;
	      constructorMaker = (function(superFn) {
	        return function() {
	          for (var args = [],
	              $__0 = 0; $__0 < arguments.length; $__0++)
	            args[$__0] = arguments[$__0];
	          superFn.apply(this, args);
	        };
	      });
	    }
	    var cls = constructorMaker(superClass.prototype.constructor);
	    cls.prototype = Object.create(superClass.prototype);
	    U.extend(cls.prototype, prototype);
	    cls.prototype.constructor = cls;
	    return cls;
	  },
	  extend: function(obj1) {
	    for (var rest = [],
	        $__0 = 1; $__0 < arguments.length; $__0++)
	      rest[$__0 - 1] = arguments[$__0];
	    rest.forEach((function(obj) {
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
	        }
	      }
	    }));
	    return obj1;
	  },
	  default: function(object) {
	    for (var rest = [],
	        $__1 = 1; $__1 < arguments.length; $__1++)
	      rest[$__1 - 1] = arguments[$__1];
	    var keys = rest.slice(0, -1);
	    var def = rest[rest.length - 1];
	    if (keys.length === 0) {
	      return object;
	    }
	    var last = U.o.apply(null, [object].concat(keys.slice(0, -1)));
	    if (U.isUndefined(last[keys[keys.length - 1]])) {
	      last[keys[keys.length - 1]] = def;
	    }
	    return last[keys[keys.length - 1]];
	  },
	  o: function(object) {
	    for (var keys = [],
	        $__2 = 1; $__2 < arguments.length; $__2++)
	      keys[$__2 - 1] = arguments[$__2];
	    return U.default.apply(null, [object].concat(keys).concat([{}]));
	  },
	  a: function(object) {
	    for (var keys = [],
	        $__3 = 1; $__3 < arguments.length; $__3++)
	      keys[$__3 - 1] = arguments[$__3];
	    return U.default.apply(null, [object].concat(keys).concat([[]]));
	  },
	  applyConstructor: function(ConstructorFn, args) {
	    var new_obj = Object.create(ConstructorFn.prototype);
	    ConstructorFn.apply(new_obj, args);
	    return new_obj;
	  },
	  assert: function(condition, message) {
	    if (!condition) {
	      throw new Error(message || "Assertion failed");
	    }
	  },
	  isUndefined: function(val) {
	    return typeof val === 'undefined';
	  },
	  isDefined: function(val) {
	    return typeof val !== 'undefined';
	  },
	  repeat: function(nr, str) {
	    return new Array(nr + 1).join(str);
	  },
	  indent: function(str, amount) {
	    var char = arguments[2] !== (void 0) ? arguments[2] : ' ';
	    return str.replace(/^(?!\s*$)/mg, U.repeat(amount, char));
	  }
	};
	var $__default = U;
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__js_45_graph__,
	    $__misc_46_js__,
	    $__Path_46_js__,
	    $__Target_46_js__,
	    $__Error_46_js__,
	    $__operations_47_Delta_46_js__,
	    $__operations_47_Composite_46_js__,
	    $__operations_47_Overloaded_46_js__,
	    $__operations_47_Modify_46_js__,
	    $__operations_47_basicOperations_46_js__,
	    $__operations_47_PutIntoArray_46_js__,
	    $__operations_47_PutIntoFunction_46_js__,
	    $__operations_47_DeltaModel_46_js__,
	    $__features_46_js__,
	    $__variationPoints_46_js__;
	var JsGraph = ($__js_45_graph__ = __webpack_require__(6), $__js_45_graph__ && $__js_45_graph__.__esModule && $__js_45_graph__ || {default: $__js_45_graph__}).default;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var Path = ($__Path_46_js__ = __webpack_require__(4), $__Path_46_js__ && $__Path_46_js__.__esModule && $__Path_46_js__ || {default: $__Path_46_js__}).default;
	var $__3 = ($__Target_46_js__ = __webpack_require__(3), $__Target_46_js__ && $__Target_46_js__.__esModule && $__Target_46_js__ || {default: $__Target_46_js__}),
	    ReadableTarget = $__3.ReadableTarget,
	    WritableTarget = $__3.WritableTarget,
	    rt = $__3.rt,
	    wt = $__3.wt;
	var $__4 = ($__Error_46_js__ = __webpack_require__(5), $__Error_46_js__ && $__Error_46_js__.__esModule && $__Error_46_js__ || {default: $__Error_46_js__}),
	    ApplicationError = $__4.ApplicationError,
	    MultipleOverloadsApplicationError = $__4.MultipleOverloadsApplicationError,
	    NoOverloadsApplicationError = $__4.NoOverloadsApplicationError,
	    DeltaArgApplicationError = $__4.DeltaArgApplicationError,
	    CompositionError = $__4.CompositionError,
	    MultipleOverloadsCompositionError = $__4.MultipleOverloadsCompositionError;
	var defineDelta = ($__operations_47_Delta_46_js__ = __webpack_require__(7), $__operations_47_Delta_46_js__ && $__operations_47_Delta_46_js__.__esModule && $__operations_47_Delta_46_js__ || {default: $__operations_47_Delta_46_js__}).default;
	var defineComposite = ($__operations_47_Composite_46_js__ = __webpack_require__(8), $__operations_47_Composite_46_js__ && $__operations_47_Composite_46_js__.__esModule && $__operations_47_Composite_46_js__ || {default: $__operations_47_Composite_46_js__}).default;
	var defineOverloaded = ($__operations_47_Overloaded_46_js__ = __webpack_require__(9), $__operations_47_Overloaded_46_js__ && $__operations_47_Overloaded_46_js__.__esModule && $__operations_47_Overloaded_46_js__ || {default: $__operations_47_Overloaded_46_js__}).default;
	var defineModify = ($__operations_47_Modify_46_js__ = __webpack_require__(10), $__operations_47_Modify_46_js__ && $__operations_47_Modify_46_js__.__esModule && $__operations_47_Modify_46_js__ || {default: $__operations_47_Modify_46_js__}).default;
	var defineBasicOperations = ($__operations_47_basicOperations_46_js__ = __webpack_require__(11), $__operations_47_basicOperations_46_js__ && $__operations_47_basicOperations_46_js__.__esModule && $__operations_47_basicOperations_46_js__ || {default: $__operations_47_basicOperations_46_js__}).default;
	var definePutIntoArray = ($__operations_47_PutIntoArray_46_js__ = __webpack_require__(12), $__operations_47_PutIntoArray_46_js__ && $__operations_47_PutIntoArray_46_js__.__esModule && $__operations_47_PutIntoArray_46_js__ || {default: $__operations_47_PutIntoArray_46_js__}).default;
	var definePutIntoFunction = ($__operations_47_PutIntoFunction_46_js__ = __webpack_require__(13), $__operations_47_PutIntoFunction_46_js__ && $__operations_47_PutIntoFunction_46_js__.__esModule && $__operations_47_PutIntoFunction_46_js__ || {default: $__operations_47_PutIntoFunction_46_js__}).default;
	var defineDeltaModel = ($__operations_47_DeltaModel_46_js__ = __webpack_require__(14), $__operations_47_DeltaModel_46_js__ && $__operations_47_DeltaModel_46_js__.__esModule && $__operations_47_DeltaModel_46_js__ || {default: $__operations_47_DeltaModel_46_js__}).default;
	var defineFeatures = ($__features_46_js__ = __webpack_require__(15), $__features_46_js__ && $__features_46_js__.__esModule && $__features_46_js__ || {default: $__features_46_js__}).default;
	var defineVariationPoints = ($__variationPoints_46_js__ = __webpack_require__(16), $__variationPoints_46_js__ && $__variationPoints_46_js__.__esModule && $__variationPoints_46_js__ || {default: $__variationPoints_46_js__}).default;
	var $__default = U.newClass(function DeltaJs() {
	  this._compositions = [];
	  this._overloads = {};
	  this._onNewOperationTypeListeners = [];
	  defineDelta(this);
	  defineComposite(this);
	  defineOverloaded(this);
	  defineModify(this);
	  defineBasicOperations(this);
	  definePutIntoArray(this);
	  definePutIntoFunction(this);
	  defineDeltaModel(this);
	  defineFeatures(this);
	  defineVariationPoints(this);
	}, {
	  _evaluatePrecondition: function(delta, target) {
	    if (typeof delta.precondition === 'function') {
	      var judgment = delta.precondition(target);
	      if (judgment instanceof ApplicationError) {
	        return judgment;
	      } else if (!judgment) {
	        return new ApplicationError(delta, target.value);
	      }
	    }
	    return true;
	  },
	  newOperationType: function(Superclass, name, prototype) {
	    var $__16;
	    var $__15 = this;
	    if (typeof Superclass === 'string') {
	      ($__16 = [undefined, Superclass, name], Superclass = $__16[0], name = $__16[1], prototype = $__16[2], $__16);
	    }
	    prototype = prototype || {};
	    var thisDeltaJs = this;
	    U.assert(name[0] === name[0].toUpperCase(), ("Delta operations must have a name starting with a capital letter -- '" + name + "' does not."));
	    U.assert(!this.Delta[name], ("The '" + name + "' operation type already exists."));
	    var cls = this.Delta[name] = U.newSubclass(Superclass || this.Delta, (function(superFn) {
	      return function(arg, meta) {
	        superFn.call(this, arg, meta);
	        if (this.construct) {
	          this.construct();
	        }
	      };
	    }), U.extend({}, prototype, {applyTo: function(target) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        if (options.restrictToProperty && this.meta.targetProp && options.restrictToProperty !== this.meta.targetProp) {
	          return;
	        }
	        if (!this.selected) {
	          return;
	        }
	        var judgment = thisDeltaJs._evaluatePrecondition(this, target);
	        if (judgment !== true) {
	          throw judgment;
	        }
	        if (U.isDefined(prototype.applyTo)) {
	          prototype.applyTo.call(this, target, (!!this.meta.targetProp ? U.extend({}, options, {restrictToProperty: null}) : options));
	        }
	      }}));
	    cls.type = cls.prototype.type = name;
	    cls.meta = cls.prototype.meta = {methods: prototype.methods || [name[0].toLowerCase() + name.slice(1)]};
	    cls.meta.methods.forEach((function(method) {
	      U.a($__15._overloads, method).push(name);
	    }));
	    this._onNewOperationTypeListeners.forEach((function(fn) {
	      fn(cls);
	    }));
	    return cls;
	  },
	  onNewOperationType: function(fn) {
	    var $__15 = this;
	    this._onNewOperationTypeListeners.push(fn);
	    Object.keys(this.Delta).forEach((function(name) {
	      if (name[0] === name[0].toUpperCase()) {
	        fn($__15.Delta[name]);
	      }
	    }));
	  },
	  newComposition: function(precondition, compose) {
	    this._compositions.push({
	      precondition: precondition,
	      compose: compose
	    });
	  },
	  composed: function(d1, d2) {
	    if (U.isUndefined(d1)) {
	      d1 = new this.Delta.NoOp();
	    }
	    if (U.isUndefined(d2)) {
	      d2 = new this.Delta.NoOp();
	    }
	    var composeFn = (function() {});
	    var success = this._compositions.some((function($__16) {
	      var $__17 = $__16,
	          precondition = $__17.precondition,
	          fn = $__17.compose;
	      if (precondition(d1, d2)) {
	        composeFn = fn;
	        return true;
	      }
	    }));
	    if (!success) {
	      throw new CompositionError(d1, d2);
	    }
	    return composeFn(d1, d2);
	  }
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  ReadableTarget: {get: function() {
	      return ReadableTarget;
	    }},
	  WritableTarget: {get: function() {
	      return WritableTarget;
	    }},
	  wt: {get: function() {
	      return wt;
	    }},
	  rt: {get: function() {
	      return rt;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var ReadableTarget = U.newClass(function(value) {
	  this._val = value;
	}, {
	  getValue: function() {
	    return this._val;
	  },
	  get value() {
	    return this.getValue();
	  },
	  set value(v) {
	    this.setValue(v);
	  }
	});
	var WritableTarget = U.newSubclass(ReadableTarget, (function(superFn) {
	  return function(obj, prop) {
	    this._obj = obj;
	    this._prop = prop;
	  };
	}), {
	  getValue: function() {
	    return this._obj[this._prop];
	  },
	  setValue: function(v) {
	    this._obj[this._prop] = v;
	  },
	  delete: function() {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var Path = U.newClass(function() {
	  var str = arguments[0] !== (void 0) ? arguments[0] : "";
	  var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
	  U.assert(match, ("The path string '" + str + "' is not well formed."));
	  var $__1 = match,
	      lead = $__1[1],
	      prop = $__1[2],
	      rest = $__1[3];
	  if (lead === '#') {
	    this.set(new Path((".(instance)." + prop + rest)));
	  } else if (prop !== '') {
	    this._prop = prop;
	    if (rest !== '') {
	      this._rest = new Path(rest);
	    }
	  }
	}, {
	  set: function(other) {
	    this._prop = other._prop;
	    this._rest = other._rest;
	  },
	  get prop() {
	    return this._prop;
	  },
	  get rest() {
	    return this._rest;
	  }
	});
	var $__default = Path;
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  ApplicationError: {get: function() {
	      return ApplicationError;
	    }},
	  MultipleOverloadsApplicationError: {get: function() {
	      return MultipleOverloadsApplicationError;
	    }},
	  NoOverloadsApplicationError: {get: function() {
	      return NoOverloadsApplicationError;
	    }},
	  DeltaArgApplicationError: {get: function() {
	      return DeltaArgApplicationError;
	    }},
	  CompositionError: {get: function() {
	      return CompositionError;
	    }},
	  MultipleOverloadsCompositionError: {get: function() {
	      return MultipleOverloadsCompositionError;
	    }},
	  ConstraintFailure: {get: function() {
	      return ConstraintFailure;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var ApplicationError = U.newSubclass(Error, (function(superFn) {
	  return function ApplicationError(delta, value) {
	    superFn.call(this);
	    this.name = 'ApplicationError';
	    this.message = ("This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "'.");
	    this.delta = delta;
	    this.value = value;
	  };
	}));
	var MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function MultipleOverloadsApplicationError(delta, value) {
	    var errors = arguments[2] !== (void 0) ? arguments[2] : [];
	    superFn.call(this, delta, value);
	    this.name = 'MultipleOverloadsApplicationError';
	    this.message = ("None of these deltas of types " + delta.overloads.map((function(d) {
	      return "'" + d.type + "'";
	    })).join(',') + " can apply to this value of type '" + typeof value + ".") + errors.map((function(e) {
	      return ("\n-- " + e.message);
	    })).join('');
	    this.errors = errors;
	  };
	}));
	var NoOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function NoOverloadsApplicationError(delta, value) {
	    superFn.call(this, delta, value);
	    this.name = 'NoOverloadsApplicationError';
	    this.message = ("This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".");
	  };
	}));
	var DeltaArgApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function DeltaArgApplicationError(delta, baseDelta) {
	    superFn.call(this, delta, baseDelta.arg);
	    this.name = 'DeltaArgApplicationError';
	    this.message = ("This delta of type '" + delta.type + "' cannot apply to the type-'" + typeof baseDelta.arg + "'-value of this base delta of type '" + baseDelta.type + "'.");
	    this.baseDelta = baseDelta;
	  };
	}));
	var CompositionError = U.newSubclass(Error, (function(superFn) {
	  return function CompositionError(delta1, delta2) {
	    superFn.call(this);
	    this.name = 'CompositionError';
	    this.message = ("This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "'.");
	    this.delta1 = delta1;
	    this.delta2 = delta2;
	  };
	}));
	var MultipleOverloadsCompositionError = U.newSubclass(CompositionError, (function(superFn) {
	  return function MultipleOverloadsCompositionError(delta1, delta2) {
	    var errors = arguments[2] !== (void 0) ? arguments[2] : [];
	    superFn.call(this, delta1, delta2);
	    this.name = 'MultipleOverloadsCompositionError';
	    this.message = ("There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'.") + errors.map((function(e) {
	      return ("\n-- " + e.message);
	    })).join('');
	    this.errors = errors;
	  };
	}));
	var ConstraintFailure = U.newSubclass(Error, (function(superFn) {
	  return function ConstraintFailure(feature) {
	    superFn.call(this);
	    this.name = 'ConstraintFailure';
	    this.message = ("The feature '" + feature.name + "' is both selected and excluded by its constraints.");
	    this.feature = feature;
	  };
	}));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $___46__46__47_Target_46_js__,
	    $___46__46__47_applicationConditions_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var $__1 = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}),
	    ReadableTarget = $__1.ReadableTarget,
	    wt = $__1.wt;
	var defineApplicationConditions = ($___46__46__47_applicationConditions_46_js__ = __webpack_require__(17), $___46__46__47_applicationConditions_46_js__ && $___46__46__47_applicationConditions_46_js__.__esModule && $___46__46__47_applicationConditions_46_js__ || {default: $___46__46__47_applicationConditions_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta)) {
	    return;
	  }
	  deltaJs._nextDeltaUUID = 0;
	  deltaJs.Delta = U.newClass(function Delta(arg, meta) {
	    this.arg = arg;
	    this.meta = U.extend({}, meta || {}, {uuid: deltaJs._nextDeltaUUID++});
	    defineApplicationConditions(deltaJs, this);
	  }, {
	    clone: function() {
	      return new this.constructor(this.arg, this.meta);
	    },
	    appliedTo: function(value) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      if (value instanceof ReadableTarget) {
	        value = value.value;
	      }
	      if (typeof value.clone === 'function') {
	        value = value.clone();
	      }
	      var obj = {value: value};
	      this.applyTo(wt(obj, 'value'), options);
	      return obj.value;
	    },
	    composedWith: function(other) {
	      return deltaJs.composed(this, other);
	    },
	    toString: function() {
	      var options = arguments[0] !== (void 0) ? arguments[0] : {};
	      var str = this.type;
	      if (this.meta.targetProp) {
	        str += (" ‹" + this.meta.targetProp + "›");
	      }
	      if (U.isDefined(this.arg)) {
	        str += (": " + JSON.stringify(this.arg));
	      }
	      if (options.debug) {
	        str += (" (" + this.meta.uuid + ")");
	      }
	      return str;
	    }
	  });
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $__Delta_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var defineDelta = ($__Delta_46_js__ = __webpack_require__(7), $__Delta_46_js__ && $__Delta_46_js__.__esModule && $__Delta_46_js__ || {default: $__Delta_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.Composite)) {
	    return;
	  }
	  defineDelta(deltaJs);
	  U.extend(deltaJs.constructor.prototype, {_getDeltaByMethod: function(method, arg) {
	      var $__2 = this;
	      var newDeltas = this._overloads[method].map((function(type) {
	        return new $__2.Delta[type](arg, {method: method});
	      }));
	      if (newDeltas.length === 1) {
	        return newDeltas[0];
	      } else {
	        var delta = new this.Delta.Overloaded(arg, {method: method});
	        delta.overloads = newDeltas;
	        return delta;
	      }
	    }});
	  deltaJs.Delta.Composite = U.newSubclass(deltaJs.Delta, (function(superFn) {
	    return function Composite() {
	      for (var args = [],
	          $__3 = 0; $__3 < arguments.length; $__3++)
	        args[$__3] = arguments[$__3];
	      superFn.apply(this, args);
	    };
	  }), {
	    operation: function() {
	      throw new Error("A Delta.Composite subclass needs to implement the 'operation' method.");
	    },
	    get facade() {
	      var thisDelta = this;
	      var fcd = function() {
	        for (var args = [],
	            $__3 = 0; $__3 < arguments.length; $__3++)
	          args[$__3] = arguments[$__3];
	        var result = thisDelta.facade;
	        result._args = fcd._args.concat(args);
	        return result;
	      };
	      fcd._args = [];
	      U.extend(fcd, operationMethods, {
	        _applyOperationMethod: function(method) {
	          for (var finalArgs = [],
	              $__4 = 1; $__4 < arguments.length; $__4++)
	            finalArgs[$__4 - 1] = arguments[$__4];
	          return thisDelta.operation.apply(thisDelta, [method].concat(fcd._args).concat(finalArgs));
	        },
	        delta: thisDelta
	      });
	      return fcd;
	    }
	  });
	  var operationMethods = {};
	  deltaJs.onNewOperationType((function(cls) {
	    (cls.meta && cls.meta.methods || []).forEach((function(method) {
	      if (U.isUndefined(operationMethods[method])) {
	        operationMethods[method] = function() {
	          for (var args = [],
	              $__3 = 0; $__3 < arguments.length; $__3++)
	            args[$__3] = arguments[$__3];
	          var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	          return (newDelta instanceof deltaJs.Delta.Composite ? newDelta : this.delta).facade;
	        };
	      }
	    }));
	  }));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $__Delta_46_js__,
	    $___46__46__47_Error_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var defineDelta = ($__Delta_46_js__ = __webpack_require__(7), $__Delta_46_js__ && $__Delta_46_js__.__esModule && $__Delta_46_js__ || {default: $__Delta_46_js__}).default;
	var $__2 = ($___46__46__47_Error_46_js__ = __webpack_require__(5), $___46__46__47_Error_46_js__ && $___46__46__47_Error_46_js__.__esModule && $___46__46__47_Error_46_js__ || {default: $___46__46__47_Error_46_js__}),
	    MultipleOverloadsApplicationError = $__2.MultipleOverloadsApplicationError,
	    NoOverloadsApplicationError = $__2.NoOverloadsApplicationError,
	    MultipleOverloadsCompositionError = $__2.MultipleOverloadsCompositionError;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.Overloaded)) {
	    return;
	  }
	  defineDelta(deltaJs);
	  deltaJs.newOperationType(deltaJs.Delta, 'Overloaded', {
	    construct: function() {
	      this.overloads = [];
	    },
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      result.overloads = this.overloads.map((function(delta) {
	        return delta.clone();
	      }));
	      return result;
	    },
	    applyTo: function(target) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      var errors = [];
	      var success = this.overloads.some((function(delta) {
	        var judgment = deltaJs._evaluatePrecondition(delta, target);
	        if (judgment !== true) {
	          errors.push(judgment);
	          return false;
	        }
	        delta.applyTo(target, options);
	        return true;
	      }));
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
	    toString: function(options) {
	      var str = deltaJs.Delta.prototype.toString.call(this, options);
	      var overloads = this.overloads.map((function(delta) {
	        return delta.toString(options);
	      })).join('\n');
	      str += '\n' + U.indent(overloads, 4);
	      return str;
	    }
	  });
	  deltaJs.newComposition((function(d1, d2) {
	    return (d1 instanceof deltaJs.Delta.Overloaded || d2 instanceof deltaJs.Delta.Overloaded);
	  }), (function(d1, d2) {
	    var D1 = d1 instanceof deltaJs.Delta.Overloaded ? d1.overloads : [d1];
	    var D2 = d2 instanceof deltaJs.Delta.Overloaded ? d2.overloads : [d2];
	    var result = new deltaJs.Delta.Overloaded();
	    var errors = [];
	    D1.forEach((function(delta1) {
	      D2.forEach((function(delta2) {
	        try {
	          result.overloads.push(delta1.composedWith(delta2));
	        } catch (error) {
	          errors.push(error);
	        }
	      }));
	    }));
	    if (result.overloads.length === 0) {
	      throw new MultipleOverloadsCompositionError(d1, d2, errors);
	    }
	    return result;
	  }));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $___46__46__47_Path_46_js__,
	    $___46__46__47_Target_46_js__,
	    $__Composite_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var Path = ($___46__46__47_Path_46_js__ = __webpack_require__(4), $___46__46__47_Path_46_js__ && $___46__46__47_Path_46_js__.__esModule && $___46__46__47_Path_46_js__ || {default: $___46__46__47_Path_46_js__}).default;
	var wt = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}).wt;
	var defineComposite = ($__Composite_46_js__ = __webpack_require__(8), $__Composite_46_js__ && $__Composite_46_js__.__esModule && $__Composite_46_js__ || {default: $__Composite_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.Modify)) {
	    return;
	  }
	  defineComposite(deltaJs);
	  deltaJs.newOperationType(deltaJs.Delta.Composite, 'Modify', {
	    construct: function() {
	      this.deltas = {};
	    },
	    clone: function() {
	      var $__4 = this;
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      Object.keys(this.deltas).forEach((function(prop) {
	        result.deltas[prop] = $__4.deltas[prop].clone();
	      }));
	      return result;
	    },
	    precondition: function(target) {
	      return target.value instanceof Object;
	    },
	    applyTo: function(target) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      var $__4 = this;
	      Object.keys(this.deltas).forEach((function(prop) {
	        $__4.deltas[prop].applyTo(wt(target.value, prop), options);
	      }));
	    },
	    toString: function(options) {
	      var $__4 = this;
	      var str = deltaJs.Delta.prototype.toString.call(this, options);
	      if (Object.keys(this.deltas).length > 0) {
	        var deltas = Object.keys(this.deltas).map((function(p) {
	          return $__4.deltas[p].toString(options);
	        })).join('\n');
	        str += '\n' + U.indent(deltas, 4);
	      }
	      return str;
	    },
	    operation: function(method, options, path, arg) {
	      var $__5;
	      if (typeof options === 'string') {
	        ($__5 = [{}, options, path], options = $__5[0], path = $__5[1], arg = $__5[2], $__5);
	      }
	      var delta = deltaJs._getDeltaByMethod(method, arg);
	      return this._addOperation(options, new Path(path), delta);
	    },
	    _addOperation: function(options, path, delta) {
	      if (path.rest) {
	        return this.operation('modify', path.prop)._addOperation(options, path.rest, delta);
	      }
	      this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
	      this.deltas[path.prop].meta.targetProp = path.prop;
	      return (this.deltas[path.prop] instanceof deltaJs.Delta.Composite) ? this.deltas[path.prop] : delta;
	    }
	  });
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $___46__46__47_Target_46_js__,
	    $___46__46__47_Error_46_js__,
	    $__Delta_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var $__1 = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}),
	    WritableTarget = $__1.WritableTarget,
	    ReadableTarget = $__1.ReadableTarget,
	    rt = $__1.rt,
	    wt = $__1.wt;
	var DeltaArgApplicationError = ($___46__46__47_Error_46_js__ = __webpack_require__(5), $___46__46__47_Error_46_js__ && $___46__46__47_Error_46_js__.__esModule && $___46__46__47_Error_46_js__ || {default: $___46__46__47_Error_46_js__}).DeltaArgApplicationError;
	var defineDelta = ($__Delta_46_js__ = __webpack_require__(7), $__Delta_46_js__ && $__Delta_46_js__.__esModule && $__Delta_46_js__ || {default: $__Delta_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs._basicOperationsDefined)) {
	    return;
	  }
	  deltaJs._basicOperationsDefined = true;
	  defineDelta(deltaJs);
	  function t(type1, type2) {
	    return (function(d1, d2) {
	      return (d1.type === type1 && d2.type === type2);
	    });
	  }
	  function d(type, fn) {
	    if (typeof fn === 'string') {
	      fn = ((function(v) {
	        return (function(o) {
	          return o[v];
	        });
	      }))(fn);
	    }
	    return (function(d1, d2) {
	      return new deltaJs.Delta[type](fn && fn({
	        d1: d1,
	        d2: d2,
	        p1: d1.arg,
	        p2: d2.arg
	      }));
	    });
	  }
	  var NoOp = deltaJs.newOperationType('NoOp');
	  deltaJs.newComposition((function(d1, d2) {
	    return d1 instanceof NoOp;
	  }), (function(d1, d2) {
	    return d2.clone();
	  }));
	  deltaJs.newComposition((function(d1, d2) {
	    return d2 instanceof NoOp;
	  }), (function(d1, d2) {
	    return d1.clone();
	  }));
	  [['Add', 'add', (function(target) {
	    return U.isUndefined(target.value);
	  })], ['Replace', 'replace', (function(target) {
	    return U.isDefined(target.value);
	  })]].forEach((function($__5) {
	    var $__6 = $__5,
	        Type = $__6[0],
	        type = $__6[1],
	        pre = $__6[2];
	    deltaJs.newOperationType(Type, {
	      construct: function() {
	        this.deltasToApplyToArg = [];
	      },
	      precondition: function(target) {
	        return target instanceof WritableTarget && pre(target);
	      },
	      applyTo: function(target) {
	        target.value = this.deltasToApplyToArg.reduce((function(v, d) {
	          return d.appliedTo(v);
	        }), this.arg);
	      },
	      clone: function() {
	        var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	        result.deltasToApplyToArg = this.deltasToApplyToArg.map((function(d) {
	          return d;
	        }));
	        return result;
	      },
	      afterApplying: function(delta) {
	        var result = this.clone();
	        result.deltasToApplyToArg.push(delta);
	        if (result.deltasToApplyToArg.reduce((function(d1, d2) {
	          return deltaJs.composed(d1, d2);
	        })).precondition(wt(result, 'arg')) !== true) {
	          throw new DeltaArgApplicationError(delta, this);
	        }
	        return result;
	      },
	      toString: function(options) {
	        var $__4 = this;
	        var str = deltaJs.Delta.prototype.toString.call(this, options);
	        if (Object.keys(this.deltasToApplyToArg).length > 0) {
	          var deltas = Object.keys(this.deltasToApplyToArg).map((function(p) {
	            return $__4.deltasToApplyToArg[p].toString(options);
	          })).join('\n');
	          str += '\n' + U.indent(deltas, 4);
	        }
	        return str;
	      }
	    });
	  }));
	  deltaJs.newOperationType('Remove', {
	    precondition: function(target) {
	      return target instanceof WritableTarget && U.isDefined(target.value);
	    },
	    applyTo: function(target) {
	      target.delete();
	    }
	  });
	  deltaJs.newOperationType('Forbid', {precondition: function(target) {
	      return U.isUndefined(target.value);
	    }});
	  deltaJs.newComposition(t('Modify', 'Modify'), (function(d1, d2) {
	    var result = d1.clone();
	    Object.keys(d2.deltas).forEach((function(prop) {
	      result.deltas[prop] = deltaJs.composed(result.deltas[prop], d2.deltas[prop]);
	    }));
	    return result;
	  }));
	  deltaJs.newComposition(t('Add', 'Modify'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('Modify', 'Remove'), d('Remove'));
	  deltaJs.newComposition(t('Add', 'Remove'), d('Forbid'));
	  deltaJs.newComposition(t('Remove', 'Add'), d('Replace', (function($__5) {
	    var p2 = $__5.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('Remove', 'Forbid'), d('Remove'));
	  deltaJs.newComposition(t('Forbid', 'Add'), d('Add', (function($__5) {
	    var p2 = $__5.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('Forbid', 'Forbid'), d('Forbid'));
	  deltaJs.newComposition(t('Modify', 'Replace'), d('Replace', (function($__5) {
	    var p2 = $__5.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('Add', 'Replace'), d('Add', (function($__5) {
	    var p2 = $__5.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('Replace', 'Modify'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('Replace', 'Remove'), d('Remove'));
	  deltaJs.newComposition(t('Replace', 'Replace'), d('Replace', (function($__5) {
	    var p2 = $__5.p2;
	    return p2;
	  })));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $___46__46__47_Target_46_js__,
	    $___46__46__47_Error_46_js__,
	    $__basicOperations_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var $__1 = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}),
	    WritableTarget = $__1.WritableTarget,
	    ReadableTarget = $__1.ReadableTarget,
	    rt = $__1.rt,
	    wt = $__1.wt;
	var DeltaArgApplicationError = ($___46__46__47_Error_46_js__ = __webpack_require__(5), $___46__46__47_Error_46_js__ && $___46__46__47_Error_46_js__.__esModule && $___46__46__47_Error_46_js__ || {default: $___46__46__47_Error_46_js__}).DeltaArgApplicationError;
	var defineBasicOperations = ($__basicOperations_46_js__ = __webpack_require__(11), $__basicOperations_46_js__ && $__basicOperations_46_js__.__esModule && $__basicOperations_46_js__ || {default: $__basicOperations_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.PutIntoArray)) {
	    return;
	  }
	  defineBasicOperations(deltaJs);
	  function t(type1, type2) {
	    return (function(d1, d2) {
	      return (d1.type === type1 && d2.type === type2);
	    });
	  }
	  function d(type, fn) {
	    if (typeof fn === 'string') {
	      fn = ((function(v) {
	        return (function(o) {
	          return o[v];
	        });
	      }))(fn);
	    }
	    return (function(d1, d2) {
	      return new deltaJs.Delta[type](fn && fn({
	        d1: d1,
	        d2: d2,
	        p1: d1.arg,
	        p2: d2.arg
	      }));
	    });
	  }
	  deltaJs.newOperationType('PutIntoArray', {
	    construct: function() {
	      this.values = this.meta.method ? [{
	        method: this.meta.method,
	        value: this.arg
	      }] : [];
	    },
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      result.values = [];
	      this.values.forEach((function(v) {
	        result.values.push(v);
	      }));
	      return result;
	    },
	    precondition: function(target) {
	      return U.isDefined(target.value) && Array.isArray(target.value);
	    },
	    applyTo: function(target) {
	      var arr = target.value;
	      this.values.forEach((function($__4) {
	        var $__5 = $__4,
	            method = $__5.method,
	            value = $__5.value;
	        switch (method) {
	          case 'prepend':
	            {
	              arr.unshift(value);
	            }
	            break;
	          case 'insert':
	            {
	              var position = Math.floor(Math.random() * (arr.length + 1));
	              arr.splice(position, 0, value);
	            }
	            break;
	          case 'append':
	            {
	              arr.push(value);
	            }
	            break;
	        }
	      }));
	    },
	    methods: ['prepend', 'insert', 'append']
	  });
	  deltaJs.newComposition(t('Add', 'PutIntoArray'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('Replace', 'PutIntoArray'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('PutIntoArray', 'Remove'), d('Remove'));
	  deltaJs.newComposition(t('PutIntoArray', 'Replace'), d('Replace', (function($__4) {
	    var p2 = $__4.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('PutIntoArray', 'PutIntoArray'), (function(d1, d2) {
	    var result = new deltaJs.Delta.PutIntoArray();
	    result.values = (d1.values).concat(d2.values);
	    return result;
	  }));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $___46__46__47_misc_46_js__,
	    $___46__46__47_Target_46_js__,
	    $__basicOperations_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var WritableTarget = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}).WritableTarget;
	var defineBasicOperations = ($__basicOperations_46_js__ = __webpack_require__(11), $__basicOperations_46_js__ && $__basicOperations_46_js__.__esModule && $__basicOperations_46_js__ || {default: $__basicOperations_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.PutIntoFunction)) {
	    return;
	  }
	  defineBasicOperations(deltaJs);
	  function t(type1, type2) {
	    return (function(d1, d2) {
	      return (d1.type === type1 && d2.type === type2);
	    });
	  }
	  function d(type, fn) {
	    if (typeof fn === 'string') {
	      fn = ((function(v) {
	        return (function(o) {
	          return o[v];
	        });
	      }))(fn);
	    }
	    return (function(d1, d2) {
	      return new deltaJs.Delta[type](fn && fn({
	        d1: d1,
	        d2: d2,
	        p1: d1.arg,
	        p2: d2.arg
	      }));
	    });
	  }
	  deltaJs.newOperationType('PutIntoFunction', {
	    construct: function() {
	      if (this.meta.method) {
	        this.values = [{
	          method: this.meta.method,
	          value: this.arg
	        }];
	      } else {
	        this.values = [];
	      }
	    },
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      result.values = [];
	      this.values.forEach((function(v) {
	        result.values.push(v);
	      }));
	      return result;
	    },
	    precondition: function(target) {
	      return U.isDefined(target.value) && typeof target.value === 'function' && (U.isDefined(target.value._DeltaJs_functions) || target instanceof WritableTarget);
	    },
	    applyTo: function(target) {
	      if (U.isUndefined(target.value._DeltaJs_functions)) {
	        var originalFn = target.value;
	        var newFn = function() {
	          for (var args = [],
	              $__4 = 0; $__4 < arguments.length; $__4++)
	            args[$__4] = arguments[$__4];
	          var $__3 = this;
	          var result;
	          newFn._DeltaJs_functions.forEach((function(fn) {
	            result = fn.apply($__3, args);
	          }));
	          return result;
	        };
	        newFn._DeltaJs_functions = [function() {
	          for (var args = [],
	              $__5 = 0; $__5 < arguments.length; $__5++)
	            args[$__5] = arguments[$__5];
	          originalFn.apply(this, args);
	        }];
	        target.value = newFn;
	      }
	      var arr = target.value._DeltaJs_functions;
	      this.values.forEach((function($__6) {
	        var $__7 = $__6,
	            method = $__7.method,
	            value = $__7.value;
	        switch (method) {
	          case 'prepend':
	            {
	              arr.unshift(value);
	            }
	            break;
	          case 'insert':
	            {
	              var position = Math.floor(Math.random() * (arr.length + 1));
	              arr.splice(position, 0, value);
	            }
	            break;
	          case 'append':
	            {
	              arr.push(value);
	            }
	            break;
	        }
	      }));
	    },
	    methods: ['prepend', 'insert', 'append']
	  });
	  deltaJs.newComposition(t('Add', 'PutIntoFunction'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('Replace', 'PutIntoFunction'), (function(d1, d2) {
	    return d1.afterApplying(d2);
	  }));
	  deltaJs.newComposition(t('PutIntoFunction', 'Remove'), d('Remove'));
	  deltaJs.newComposition(t('PutIntoFunction', 'Replace'), d('Replace', (function($__6) {
	    var p2 = $__6.p2;
	    return p2;
	  })));
	  deltaJs.newComposition(t('PutIntoFunction', 'PutIntoFunction'), (function(d1, d2) {
	    var result = new deltaJs.Delta.PutIntoFunction();
	    result.values = (d1.values).concat(d2.values);
	    return result;
	  }));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__js_45_graph__,
	    $___46__46__47_misc_46_js__,
	    $___46__46__47_Path_46_js__,
	    $__Composite_46_js__;
	var JsGraph = ($__js_45_graph__ = __webpack_require__(6), $__js_45_graph__ && $__js_45_graph__.__esModule && $__js_45_graph__ || {default: $__js_45_graph__}).default;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var Path = ($___46__46__47_Path_46_js__ = __webpack_require__(4), $___46__46__47_Path_46_js__ && $___46__46__47_Path_46_js__.__esModule && $___46__46__47_Path_46_js__ || {default: $___46__46__47_Path_46_js__}).default;
	var defineComposite = ($__Composite_46_js__ = __webpack_require__(8), $__Composite_46_js__ && $__Composite_46_js__.__esModule && $__Composite_46_js__ || {default: $__Composite_46_js__}).default;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.DeltaModel)) {
	    return;
	  }
	  defineComposite(deltaJs);
	  var DeltaModel = deltaJs.newOperationType(deltaJs.Delta.Composite, 'DeltaModel', {
	    construct: function() {
	      this.graph = new JsGraph();
	    },
	    clone: function() {
	      var result = new DeltaModel();
	      result.graph = this.graph.clone();
	      result.graph.eachVertex((function(id, delta) {
	        result.graph.setVertex(id, delta.clone());
	      }));
	      return result;
	    },
	    applyTo: function(target) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      this.graph.topologically((function(name, subDelta) {
	        subDelta.applyTo(target, options);
	      }));
	    },
	    operation: function(method, name, options, path, arg) {
	      var $__5;
	      if (typeof options === 'string') {
	        ($__5 = [{}, options, path], options = $__5[0], path = $__5[1], arg = $__5[2], $__5);
	      }
	      var delta = deltaJs._getDeltaByMethod(method, arg);
	      return this._addOperation(name, options, new Path(path), delta);
	    },
	    toString: function(options) {
	      var str = deltaJs.Delta.prototype.toString.call(this, options);
	      if (this.graph.vertexCount() > 0) {
	        var deltas = '';
	        this.graph.topologically((function(name, delta) {
	          deltas += ("[" + name + "] " + delta.toString(options) + "\n");
	        }));
	        str += '\n' + U.indent(deltas, 4);
	      }
	      return str;
	    },
	    _addOperation: function(name, options, path, delta) {
	      var $__4 = this;
	      var $__5 = options,
	          after = $__5.after,
	          feature = $__5.feature;
	      var deltaBase = delta;
	      if (path.prop) {
	        deltaBase = new deltaJs.Delta.Modify();
	        deltaBase._addOperation(options, path, delta);
	      }
	      U.assert(!this.graph.vertexValue(name), ("A delta by the name “" + name + "” is already in this delta model."));
	      deltaBase.meta.name = name;
	      this.graph.addVertex(name, deltaBase);
	      (after || []).forEach((function(subordinateName) {
	        $__4.graph.createEdge(subordinateName, name);
	      }));
	      var deltaFeature;
	      if (feature) {
	        deltaFeature = deltaJs.newFeature(name, options);
	      } else {
	        deltaFeature = deltaJs.newFeature(("delta__" + name), U.extend({hidden: true}, options));
	      }
	      if (feature || deltaFeature.conditional) {
	        deltaBase.applicationCondition = deltaFeature;
	      }
	      return delta;
	    }
	  });
	  deltaJs.newComposition((function(d1, d2) {
	    return (d1 instanceof DeltaModel || d2 instanceof DeltaModel);
	  }), (function(d1, d2) {
	    var result = new DeltaModel();
	    result.graph.addNewVertex(1, d1);
	    result.graph.addNewVertex(2, d2);
	    result.graph.addNewEdge(1, 2);
	    return result;
	  }));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__,
	    $__Error_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var ConstraintFailure = ($__Error_46_js__ = __webpack_require__(5), $__Error_46_js__ && $__Error_46_js__.__esModule && $__Error_46_js__ || {default: $__Error_46_js__}).ConstraintFailure;
	var $__default = (function(deltaJs) {
	  if (deltaJs._featuresImplemented) {
	    return;
	  }
	  deltaJs._featuresImplemented = true;
	  function _normalizeClause(input) {
	    input = Array.isArray(input) ? input : [input];
	    input = input.map((function(conj) {
	      return conj instanceof deltaJs.Feature ? conj.name : conj;
	    }));
	    return input;
	  }
	  var _if = {};
	  var _selected = {};
	  function _addIf(feature) {
	    var disjunct = arguments[1] !== (void 0) ? arguments[1] : [];
	    _conditionsUnsettled = true;
	    if (disjunct === true) {
	      _selected[feature] = true;
	    } else if (disjunct === false) {} else if (_if[feature] !== true) {
	      U.a(_if, feature).push(_normalizeClause(disjunct));
	    }
	  }
	  function _addSelects(feature, otherFeatures) {
	    _normalizeClause(otherFeatures).forEach((function(other) {
	      _addIf(other, feature);
	    }));
	  }
	  var _onlyIf = {};
	  var _allowed = {};
	  function _addOnlyIf(feature) {
	    var conjunct = arguments[1] !== (void 0) ? arguments[1] : [];
	    _conditionsUnsettled = true;
	    if (conjunct === false) {
	      _allowed[feature] = false;
	    } else if (conjunct === true) {} else if (_onlyIf[feature] !== false) {
	      U.a(_onlyIf, feature).push(_normalizeClause(conjunct));
	    }
	  }
	  var _conditionsUnsettled = false;
	  function _settleConditions() {
	    if (!_conditionsUnsettled) {
	      return;
	    }
	    _conditionsUnsettled = false;
	    var somethingChanged;
	    do {
	      somethingChanged = false;
	      Object.keys(deltaJs.features).forEach((function(featureName) {
	        if (!_selected[featureName]) {
	          if (U.isUndefined(_selected[featureName])) {
	            _selected[featureName] = false;
	          }
	          if ((_if[featureName] || []).some((function(disj) {
	            return disj.every((function(conj) {
	              return _selected[conj];
	            }));
	          }))) {
	            _selected[featureName] = true;
	            somethingChanged = true;
	          }
	        }
	      }));
	    } while (somethingChanged);
	    Object.keys(deltaJs.features).forEach((function(featureName) {
	      _allowed[featureName] = (_onlyIf[featureName] || []).every((function(conj) {
	        return conj.some((function(disj) {
	          return _selected[disj];
	        }));
	      }));
	    }));
	  }
	  deltaJs.Feature = U.newClass(function Feature(name) {
	    var options = arguments[1] !== (void 0) ? arguments[1] : {};
	    var $__2 = this;
	    this.name = name;
	    this.options = options;
	    Object.keys(options).forEach((function(option) {
	      $__2.addOption(option, options[option]);
	    }));
	  }, {
	    get selected() {
	      _settleConditions();
	      if (_selected[this.name] && !_allowed[this.name]) {
	        throw new ConstraintFailure(this);
	      }
	      return _selected[this.name];
	    },
	    get conditional() {
	      return U.a(_if, this.name).length > 0;
	    },
	    get condition() {
	      return _if[this.name];
	    },
	    get restricted() {
	      return U.a(_onlyIf, this.name).length > 0;
	    },
	    addOption: function(name, value) {
	      switch (name) {
	        case 'if':
	          {
	            _addIf(this.name, value);
	          }
	          break;
	        case 'onlyIf':
	          {
	            _addOnlyIf(this.name, value);
	          }
	          break;
	        case 'iff':
	          {
	            _addOnlyIf(this.name, value);
	            _addIf(this.name, value);
	          }
	          break;
	        case 'selects':
	          {
	            _addSelects(this.name, value);
	          }
	          break;
	        case 'requires':
	          {
	            _addSelects(this.name, value);
	            _addOnlyIf(this.name, value);
	          }
	          break;
	      }
	    },
	    if: function(disjunct) {
	      this.addOption('if', disjunct);
	    },
	    onlyIf: function(conjunct) {
	      this.addOption('onlyIf', conjunct);
	    },
	    iff: function(features) {
	      this.addOption('iff', features);
	    },
	    selects: function(features) {
	      this.addOption('selects', features);
	    },
	    requires: function(features) {
	      this.addOption('requires', features);
	    },
	    select: function() {
	      this.if(true);
	    }
	  });
	  deltaJs.features = {};
	  if (U.isDefined(deltaJs.constructor._featuresImplemented)) {
	    return;
	  }
	  deltaJs.constructor._featuresImplemented = true;
	  U.extend(deltaJs.constructor.prototype, {newFeature: function(name) {
	      var options = arguments[1] !== (void 0) ? arguments[1] : {};
	      U.assert(U.isUndefined(this.features[name]), ("A feature with the name '" + name + "' already exists."));
	      return this.features[name] = new this.Feature(name, options);
	    }});
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__,
	    $__Target_46_js__,
	    $__operations_47_DeltaModel_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var rt = ($__Target_46_js__ = __webpack_require__(3), $__Target_46_js__ && $__Target_46_js__.__esModule && $__Target_46_js__ || {default: $__Target_46_js__}).rt;
	var defineDeltaModel = ($__operations_47_DeltaModel_46_js__ = __webpack_require__(14), $__operations_47_DeltaModel_46_js__ && $__operations_47_DeltaModel_46_js__.__esModule && $__operations_47_DeltaModel_46_js__ || {default: $__operations_47_DeltaModel_46_js__}).default;
	var $__default = (function(deltaJs) {
	  var $__3;
	  defineDeltaModel(deltaJs);
	  if (deltaJs._variationPointsImplemented) {
	    return;
	  }
	  deltaJs._variationPointsImplemented = true;
	  deltaJs._deltaModel = new deltaJs.Delta.DeltaModel();
	  if (U.isDefined(deltaJs.constructor._variationPointsImplemented)) {
	    return;
	  }
	  deltaJs.constructor._variationPointsImplemented = true;
	  U.extend(deltaJs.constructor.prototype, ($__3 = {}, Object.defineProperty($__3, "vp", {
	    value: function(name, val) {
	      var $__3;
	      var root = ($__3 = {}, Object.defineProperty($__3, name, {
	        value: val,
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }), $__3);
	      this._deltaModel.applyTo(rt(root), {restrictToProperty: name});
	      return root[name];
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__3, "operation", {
	    value: function(method, name, options, path, arg) {
	      return this._deltaModel.operation(method, name, options, path, arg);
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__3, "facade", {
	    get: function() {
	      return this._deltaModel.facade;
	    },
	    configurable: true,
	    enumerable: true
	  }), $__3));
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperties(exports, {
	  default: {get: function() {
	      return $__default;
	    }},
	  __esModule: {value: true}
	});
	var $__misc_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var $__default = (function(deltaJs, delta) {
	  if (delta._applicationConditionsImplemented) {
	    return;
	  }
	  delta._applicationConditionsImplemented = true;
	  if (deltaJs._applicationConditionsImplemented) {
	    return;
	  }
	  deltaJs._applicationConditionsImplemented = true;
	  U.extend(deltaJs.Delta.prototype, {
	    get applicationCondition() {
	      return this._applicationCondition;
	    },
	    set applicationCondition(ac) {
	      this._applicationCondition = ac;
	    },
	    get selected() {
	      return U.isUndefined(this.applicationCondition) || this.applicationCondition.selected;
	    }
	  });
	  if (U.isDefined(deltaJs.constructor._applicationConditionsImplemented)) {
	    return;
	  }
	  deltaJs.constructor._applicationConditionsImplemented = true;
	  U.extend(deltaJs.constructor.prototype, {select: function(features) {
	      var $__1 = this;
	      features.forEach((function(feature) {
	        $__1.features[feature].select();
	      }));
	    }});
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4YjFiMDU0Yjc2ZDFhMTc2ZmMxMCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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QUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7QUNEMUcsY0FBUyxJbUJJRSxTQUFDLE9BQU0sQ0FBRyxNQUFJO0FBRTVCLE1BQUksS0FBSSxrQ0FBa0MsQ0FBRztBQUFFLFdBQUs7R0FBRTtBQUN0RCxPQUFJLGtDQUFrQyxFQUFJLEtBQUcsQ0FBQztBQVE5QyxNQUFJLE9BQU0sa0NBQWtDLENBQUc7QUFBRSxXQUFLO0dBQUU7QUFDeEQsU0FBTSxrQ0FBa0MsRUFBSSxLQUFHLENBQUM7QUFJaEQsVUFBUSxDQUFDLE9BQU0sTUFBTSxVQUFVLENBQUc7QUFFakMsT0FBSSxxQkFBbUIsRUFBSTtBQUFFLFlBQU8sS0FBRyxzQkFBc0I7S0FBRTtBQUMvRCxPQUFJLHFCQUFtQixDQUFFLEVBQUMsQ0FBRztBQUFFLFVBQUcsc0JBQXNCLEVBQUksR0FBQztLQUFFO0FBRS9ELE9BQUksU0FBTyxFQUFJO0FBQ2QsWUFBTyxjQUFhLENBQUMsSUFBRyxxQkFBcUIsQ0FBQyxHQUFLLEtBQUcscUJBQXFCLFNBQVMsQ0FBQztLQUN0RjtBQUFBLEdBRUQsQ0FBQyxDQUFDO0FBSUYsTUFBSSxXQUFXLENBQUMsT0FBTSxZQUFZLGtDQUFrQyxDQUFDLENBQUc7QUFBRSxXQUFLO0dBQUU7QUFDakYsU0FBTSxZQUFZLGtDQUFrQyxFQUFJLEtBQUcsQ0FBQztBQUk1RCxVQUFRLENBQUMsT0FBTSxZQUFZLFVBQVUsQ0FBRyxFQUV2QyxNQUFLLENBQUwsVUFBTyxRQUFPOztBQUNiLGNBQU8sUUFBUyxFQUFDLFNBQUMsT0FBTSxDQUFNO0FBQzdCLHFCQUFZLENBQUUsT0FBTSxDQUFDLE9BQVEsRUFBQyxDQUFDO09BQ2hDLEVBQUMsQ0FBQztLQUNILENBRUQsQ0FBQyxDQUFDO0FBSUgsRW5CbERpQztBbUJtRGpDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhiMWIwNTRiNzZkMWExNzZmYzEwXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuXHRcdENvbnN0cmFpbnRGYWlsdXJlfSBmcm9tICcuL0Vycm9yLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgQXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb25zdHJhaW50RmFpbHVyZSB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvN1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNVxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvM1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8uYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMuc2xpY2UoMCwgLTEpKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsge30gXSkpO1xuXHR9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsgW10gXSkpO1xuXHR9LFxuXG5cdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRyZXR1cm4gbmV3X29iajtcblx0fSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci84XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85XG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHMuXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0dGhpcy5fY29tcG9zaXRpb25zID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHR0aGlzLl9vdmVybG9hZHMgPSB7fTsgLy8gbWV0aG9kIC0+IFtkZWx0YS1jbGFzc2VzXVxuXHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXHRkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cbn0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8geyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIERlbHRhSnMucHJvdG90eXBlICovXG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdCAqL1xuXHRfZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCkge1xuXHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAge3N0cmluZ31cblx0ICogQHBhcmFtIHByb3RvdHlwZSB7b2JqZWN0fVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGUpIHtcblx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbnMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLS0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KCF0aGlzLkRlbHRhW25hbWVdLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSB0aGlzLkRlbHRhW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIHByb3BlcnR5IG9uIHRoZSB0YXJnZXQgb2JqZWN0PyAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgJiZcblx0XHRcdFx0XHR0aGlzLm1ldGEudGFyZ2V0UHJvcCAmJlxuXHRcdFx0XHRcdG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ICE9PSB0aGlzLm1ldGEudGFyZ2V0UHJvcCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXG5cdFx0XHRcdC8qIE9LLCB0aGVuIGFwcGx5IGl0IGlmIGEgbWV0aG9kIHRvIGRvIHNvIHdhcyBpbmNsdWRlZCBpbiB0aGUgb3BlcmF0aW9uICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm90b3R5cGUuYXBwbHlUbykpIHtcblx0XHRcdFx0XHRwcm90b3R5cGUuYXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCwgKFxuXHRcdFx0XHRcdFx0XHQhIXRoaXMubWV0YS50YXJnZXRQcm9wID9cblx0XHRcdFx0XHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pIDpcblx0XHRcdFx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0XHRcdCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9KSk7XG5cdFx0Y2xzLnR5cGUgPSBjbHMucHJvdG90eXBlLnR5cGUgPSBuYW1lO1xuXHRcdGNscy5tZXRhID0gY2xzLnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdFx0Ly8gaWYgbm8gbWV0aG9kcyBhcmUgcHJvdmlkZWQsIHVzZSB0aGUgb3BlcmF0aW9uIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGxvd2VyY2FzZSBsZXR0ZXJcblx0XHRcdG1ldGhvZHM6IHByb3RvdHlwZS5tZXRob2RzIHx8IFsgbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSkgXVxuXHRcdH07XG5cblx0XHQvKiBhZGQgdGhpcyBuZXcgdHlwZSB0byB0aGUgbGlzdCBvZiB0eXBlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBtZXRob2QgKi9cblx0XHRjbHMubWV0YS5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBVLmEodGhpcy5fb3ZlcmxvYWRzLCBtZXRob2QpLnB1c2gobmFtZSkgfSk7XG5cblx0XHQvKiBub3RpZnkgbGlzdGVuZXJzICovXG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKGNscykgfSk7XG5cblx0XHQvKiByZXR1cm4gdGhlIG5ldyBjbGFzcyAqL1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBmbiB7KEZ1bmN0aW9uKSA9PiB1bmRlZmluZWR9IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc3ViY2xhc3Mgb2YgYERlbHRhSnMjRGVsdGFgXG5cdCAqL1xuXHRvbk5ld09wZXJhdGlvblR5cGUoZm4pIHtcblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMucHVzaChmbik7XG5cdFx0T2JqZWN0LmtleXModGhpcy5EZWx0YSkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0aWYgKG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSkge1xuXHRcdFx0XHRmbih0aGlzLkRlbHRhW25hbWVdKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdCAqL1xuXHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHR0aGlzLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdCAqIEBwYXJhbSBkMiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgc2Vjb25kIGRlbHRhXG5cdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdCAqL1xuXHRjb21wb3NlZChkMSwgZDIpIHtcblx0XHQvKiBoYW5kbGUgdGhlIGNhc2VzIHdoZXJlIG9uZSBvciBib3RoIGFyZ3VtZW50cyBhcmUgdW5kZWZpbmVkICovXG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMikpIHsgZDIgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXG5cdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyogdGhyb3cgYW4gZXJyb3Igb24gZmFpbHVyZSAqL1xuXHRcdGlmICghc3VjY2VzcykgeyB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihkMSwgZDIpIH1cblxuXHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRyZXR1cm4gY29tcG9zZUZuKGQxLCBkMik7XG5cdH1cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBSZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHRoaXMuX3ZhbCA9IHZhbHVlO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfSxcblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59KTtcblxuZXhwb3J0IHZhciBXcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdHRoaXMuX29iaiAgPSBvYmo7XG5cdHRoaXMuX3Byb3AgPSBwcm9wO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfSxcblx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cbn0pO1xuXG5SZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiBjaGFpbihwcm9wKSB7XG5cdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQodGhpcy52YWx1ZSwgcHJvcCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5leHBvcnQgZnVuY3Rpb24gcnQob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgUmVhZGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYXJnZXQuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbnZhciBQYXRoID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoc3RyID0gXCJcIikge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0dmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFsuI10/KShcXHcqfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0aWYgKGxlYWQgPT09ICcjJykge1xuXHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdH0gZWxzZSBpZiAocHJvcCAhPT0gJycpIHtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdHRoaXMuX3Jlc3QgPSBuZXcgUGF0aChyZXN0KTtcblx0XHR9XG5cdH1cbn0sIHtcblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fSxcblx0Z2V0IHByb3AoKSB7IHJldHVybiB0aGlzLl9wcm9wIH0sXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCBQYXRoO1xuXG5cbi8vIFRPRE86IGltcGxlbWVudCB0aGF0IHRoZSBgLihpbnN0YW5jZSkuYCBtZW1iZXJzIGFyZSBhY3R1YWxseSBpbmNsdWRlZCBpbiBpbnN0YW5jZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhdGguanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIEFwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYDtcblx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHR0aGlzLnZhbHVlID0gdmFsdWU7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZXNlIGRlbHRhcyBvZiB0eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmAgK1xuXHQgICAgICAgICAgICAgICBlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcbn0pO1xuXG5leHBvcnQgdmFyIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCBiYXNlRGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTtcblx0dGhpcy5uYW1lID0gJ0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGUgdHlwZS0nJHt0eXBlb2YgYmFzZURlbHRhLmFyZ30nLXZhbHVlIG9mIHRoaXMgYmFzZSBkZWx0YSBvZiB0eXBlICcke2Jhc2VEZWx0YS50eXBlfScuYDtcblx0dGhpcy5iYXNlRGVsdGEgPSBiYXNlRGVsdGE7XG59KTtcblxuZXhwb3J0IHZhciBDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKENvbXBvc2l0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YTEsIGRlbHRhMik7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29uc3RyYWludEZhaWx1cmUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29uc3RyYWludEZhaWx1cmUoZmVhdHVyZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhKSkgeyByZXR1cm4gfVxuXG5cdGRlbHRhSnMuX25leHREZWx0YVVVSUQgPSAwO1xuXG5cdC8qKiB7QGNsYXNzfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGEoYXJnLCBtZXRhKSB7XG5cdFx0dGhpcy5hcmcgPSBhcmc7XG5cdFx0dGhpcy5tZXRhID0gVS5leHRlbmQoe30sIG1ldGEgfHwge30sIHsgdXVpZDogZGVsdGFKcy5fbmV4dERlbHRhVVVJRCsrIH0pO1xuXHRcdGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyhkZWx0YUpzLCB0aGlzKTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm1ldGEudGFyZ2V0UHJvcCkgIHsgc3RyICs9IGAg4oC5JHt0aGlzLm1ldGEudGFyZ2V0UHJvcH3igLpgICAgIH1cblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLm1ldGEudXVpZH0pYCAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXJnICAgIHsqfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2dldERlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLl9vdmVybG9hZHNbbWV0aG9kXVxuXHRcdFx0XHRcdC5tYXAodHlwZSA9PiBuZXcgdGhpcy5EZWx0YVt0eXBlXShhcmcsIHsgbWV0aG9kIH0pKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5EZWx0YS5PdmVybG9hZGVkKGFyZywgeyBtZXRob2QgfSk7XG5cdFx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0LyoqIHtAY2xhc3N9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSA9IFUubmV3U3ViY2xhc3MoZGVsdGFKcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0ZSguLi5hcmdzKSB7XG5cdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIEltcGxlbWVudCB0aGlzIG1ldGhvZCBpbiBzdWJjbGFzc2VzIHRvIHByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgRGVsdGEuQ29tcG9zaXRlIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ29wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRnZXQgZmFjYWRlKCkge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhLmZhY2FkZTtcblx0XHRcdFx0cmVzdWx0Ll9hcmdzID0gZmNkLl9hcmdzLmNvbmNhdChhcmdzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0XHRmY2QuX2FyZ3MgPSBbXTtcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLm9wZXJhdGlvbi5hcHBseSh0aGlzRGVsdGEsIFttZXRob2RdLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH0sXG5cdH0pO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHQoY2xzLm1ldGEgJiYgY2xzLm1ldGEubWV0aG9kcyB8fCBbXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcGVyYXRpb25NZXRob2RzW21ldGhvZF0pKSB7XG5cdFx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYXBwbHlPcGVyYXRpb25NZXRob2QuYXBwbHkodGhpcywgW21ldGhvZF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdFx0XHRyZXR1cm4gKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUgPyBuZXdEZWx0YSA6IHRoaXMuZGVsdGEpLmZhY2FkZTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHQvLyAqIEBwYXJhbSBkZWx0YSB7Q29tcG9zaXRlfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0Ly8gKiBAcmV0dXJuIHtDb21wb3NpdGV9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdC8vICovXG5cdC8vZGVsdGFKcy5mYWNhZGUgPSBmdW5jdGlvbiBmYWNhZGUoZGVsdGEpIHtcblx0Ly9cdC8qIHRoZSBmYWNhZGUgaXRzZWxmICovXG5cdC8vXHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHQvL1x0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0Ly9cdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0Ly9cdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHQvL1x0XHR2YXIgcmVzdWx0ID0gZmFjYWRlKGRlbHRhKTtcblx0Ly9cdFx0cmVzdWx0Ll9hcmdzID0gZmNkLl9hcmdzLmNvbmNhdChhcmdzKTtcblx0Ly9cdFx0cmV0dXJuIHJlc3VsdDtcblx0Ly9cdH07XG5cdC8vXHRmY2QuX2FyZ3MgPSBbXTtcblx0Ly9cdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHQvL1x0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0Ly9cdFx0XHRyZXR1cm4gZGVsdGEub3BlcmF0aW9uLmFwcGx5KGRlbHRhLCBbbWV0aG9kXS5jb25jYXQoZmNkLl9hcmdzKS5jb25jYXQoZmluYWxBcmdzKSk7XG5cdC8vXHRcdH0sXG5cdC8vXHRcdGRlbHRhXG5cdC8vXHR9KTtcblx0Ly9cdHJldHVybiBmY2Q7XG5cdC8vfTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLCAnT3ZlcmxvYWRlZCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMub3ZlcmxvYWRzID0gW10gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk92ZXJsb2FkZWR9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblx0fSk7XG5cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHwgZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCgpO1xuXHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZDEsIGQyLCBlcnJvcnMpIH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Nb2RpZnkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ01vZGlmeScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMuZGVsdGFzID0ge30gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpcy5kZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0Ly9pZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdC8vXHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdC8vXHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0Ly99XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9ICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAgLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihtZXRob2QsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgeyBbb3B0aW9ucywgcGF0aCwgYXJnXSA9IFt7fSwgb3B0aW9ucywgcGF0aF0gfVxuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gcGF0aCAgICB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb24oJ21vZGlmeScsIHBhdGgucHJvcClcblx0XHRcdFx0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ubWV0YS50YXJnZXRQcm9wID0gcGF0aC5wcm9wO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG5cdFx0XHRyZXR1cm4gKHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdIDogZGVsdGE7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvTW9kaWZ5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYmFzaWNPcGVyYXRpb25zRGVmaW5lZCA9IHRydWU7XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICoqKioqKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBuby1vcCB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIE5vT3AgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDEgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMi5jbG9uZSgpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFtcblx0XHRbJ0FkZCcsICAgICAnYWRkJywgICAgICh0YXJnZXQpID0+IFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKV0sXG5cdFx0WydSZXBsYWNlJywgJ3JlcGxhY2UnLCAodGFyZ2V0KSA9PiBVLmlzRGVmaW5lZCAgKHRhcmdldC52YWx1ZSldXG5cdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHQvLyBJbiB0aGUgbGluZSBkaXJlY3RseSBiZWxvdywgJ3RoaXMnIGNhbm5vdCBiZSB1c2VkIGJlY2F1c2Ugb2YgYSBidWcgaW4gdHJhY2V1cjpcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3RyYWNldXItY29tcGlsZXIvaXNzdWVzLzE2MzFcblx0XHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoVHlwZSwge1xuXHRcdFx0Y29uc3RydWN0KCkgICAgICAgICAgeyB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIHByZSh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkgICAgICB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9LFxuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRhZnRlckFwcGx5aW5nKGRlbHRhKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmNsb25lKCk7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucHVzaChkZWx0YSk7XG5cdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiBkZWx0YUpzLmNvbXBvc2VkKGQxLCBkMikpXG5cdFx0XHRcdFx0XHQgICAgLnByZWNvbmRpdGlvbih3dChyZXN1bHQsICdhcmcnKSkgIT09IHRydWUpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0aGlzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0Lm1hcCgocCkgPT4gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmdbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cdFx0fSk7XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHsgdGFyZ2V0LmRlbGV0ZSgpIH1cblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlKSB9XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IGRlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgLCAnUmVtb3ZlJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnRm9yYmlkJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlcGxhY2UnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMudmFsdWVzID0gdGhpcy5tZXRhLm1ldGhvZCA/XG5cdFx0XHRcdFt7IG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCwgdmFsdWU6IHRoaXMuYXJnIH1dIDpcblx0XHRcdFx0W107XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9BcnJheSgpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldH0gICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdCAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0ICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuYXJnXG4gICAgICAgICAgICAgICB9XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHQgICAgICAgKFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0Z1bmN0aW9uKCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qc1xuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0dmFyIERlbHRhTW9kZWwgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdEZWx0YU1vZGVsJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ30gICAtIHRoZSB0eXBlIG9mIG9wZXJhdGlvbiAoZS5nLiwgJ2FkZCcsICdyZW1vdmUnLCBldGMuKVxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAgLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihtZXRob2QsIG5hbWUsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgeyBbb3B0aW9ucywgcGF0aCwgYXJnXSA9IFt7fSwgb3B0aW9ucywgcGF0aF0gfVxuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0dmFyIHthZnRlciwgZmVhdHVyZX0gPSBvcHRpb25zO1xuXG5cdFx0XHR2YXIgZGVsdGFCYXNlID0gZGVsdGE7XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcblx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBhIGRlbHRhIGJ5IHRoaXMgbmFtZSBjYW5ub3QgYWxyZWFkeSBiZSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpLFxuXHRcdFx0XHRcdGBBIGRlbHRhIGJ5IHRoZSBuYW1lIOKAnCR7bmFtZX3igJ0gaXMgYWxyZWFkeSBpbiB0aGlzIGRlbHRhIG1vZGVsLmApO1xuXG5cdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdGRlbHRhQmFzZS5tZXRhLm5hbWUgPSBuYW1lO1xuXHRcdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblxuXHRcdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuXHRcdFx0KGFmdGVyIHx8IFtdKS5mb3JFYWNoKChzdWJvcmRpbmF0ZU5hbWUpID0+IHtcblx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY2hlY2sgaWYgdGhlcmUgc2hvdWxkIGJlIGFuIGVwb255bW91cywgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdHZhciBkZWx0YUZlYXR1cmU7XG5cdFx0XHRpZiAoZmVhdHVyZSkgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lICAgICAgICAgICAsIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0ZWxzZSAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdGlmIChmZWF0dXJlIHx8IGRlbHRhRmVhdHVyZS5jb25kaXRpb25hbCkge1xuXHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkZWx0YTtcblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdGZ1bmN0aW9uIF9ub3JtYWxpemVDbGF1c2UoaW5wdXQpIHtcblx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cdC8qIGNvZGUgZm9yIHRoZSBtdXR1YWwgc2VsZWN0aW9uIG9mIGZlYXR1cmVzICovXG5cdHZhciBfaWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgZGlzanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfc2VsZWN0ZWQgPSB7fTsgLy8gZmVhdHVyZSAtPiBCb29sZWFuXG5cdGZ1bmN0aW9uIF9hZGRJZihmZWF0dXJlLCBkaXNqdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0X3NlbGVjdGVkW2ZlYXR1cmVdID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9pZltmZWF0dXJlXSAhPT0gdHJ1ZSkge1xuXHRcdFx0VS5hKF9pZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGRpc2p1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRTZWxlY3RzKGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkSWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkZlYXR1cmUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHR9KTtcblxuXHR9LCB7XG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdGlmIChfc2VsZWN0ZWRbdGhpcy5uYW1lXSAmJiAhX2FsbG93ZWRbdGhpcy5uYW1lXSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3NlbGVjdGVkW3RoaXMubmFtZV07XG5cdFx0fSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmICAgICwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IGNvbmRpdGlvbigpICAgeyByZXR1cm4gX2lmW3RoaXMubmFtZV0gfSxcblx0XHRnZXQgcmVzdHJpY3RlZCgpICB7IHJldHVybiBVLmEoX29ubHlJZiwgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0YWRkT3B0aW9uKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRzd2l0Y2ggKG5hbWUpIHtcblx0XHRcdGNhc2UgJ2lmJzogICAgICAgeyBfYWRkSWYodGhpcy5uYW1lLCB2YWx1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcblx0XHRcdGNhc2UgJ29ubHlJZic6ICAgeyBfYWRkT25seUlmKHRoaXMubmFtZSwgdmFsdWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcblx0XHRcdGNhc2UgJ2lmZic6ICAgICAgeyBfYWRkT25seUlmKHRoaXMubmFtZSwgdmFsdWUpOyBfYWRkSWYodGhpcy5uYW1lLCB2YWx1ZSk7ICAgICAgfSBicmVhaztcblx0XHRcdGNhc2UgJ3NlbGVjdHMnOiAgeyBfYWRkU2VsZWN0cyh0aGlzLm5hbWUsIHZhbHVlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcblx0XHRcdGNhc2UgJ3JlcXVpcmVzJzogeyBfYWRkU2VsZWN0cyh0aGlzLm5hbWUsIHZhbHVlKTsgX2FkZE9ubHlJZih0aGlzLm5hbWUsIHZhbHVlKTsgfSBicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXHRcdGlmICAgICAgKGRpc2p1bmN0KSB7IHRoaXMuYWRkT3B0aW9uKCdpZicsICAgICAgIGRpc2p1bmN0KSB9LFxuXHRcdG9ubHlJZiAgKGNvbmp1bmN0KSB7IHRoaXMuYWRkT3B0aW9uKCdvbmx5SWYnLCAgIGNvbmp1bmN0KSB9LFxuXHRcdGlmZiAgICAgKGZlYXR1cmVzKSB7IHRoaXMuYWRkT3B0aW9uKCdpZmYnLCAgICAgIGZlYXR1cmVzKSB9LFxuXHRcdHNlbGVjdHMgKGZlYXR1cmVzKSB7IHRoaXMuYWRkT3B0aW9uKCdzZWxlY3RzJywgIGZlYXR1cmVzKSB9LFxuXHRcdHJlcXVpcmVzKGZlYXR1cmVzKSB7IHRoaXMuYWRkT3B0aW9uKCdyZXF1aXJlcycsIGZlYXR1cmVzKSB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtzdHJpbmd9ICAtIHRoZSBuYW1lIG9mIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRmVhdHVyZX0gLSB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKi9cblx0XHRuZXdGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Lyogc2FuaXR5IGNoZWNrKi9cblx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodGhpcy5mZWF0dXJlc1tuYW1lXSksXG5cdFx0XHRcdGBBIGZlYXR1cmUgd2l0aCB0aGUgbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgbmV3IGZlYXR1cmUgKi9cblx0XHRcdHJldHVybiB0aGlzLmZlYXR1cmVzW25hbWVdID0gbmV3IHRoaXMuRmVhdHVyZShuYW1lLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaW5kaWNhdGVzIGEgdmFyaWF0aW9uIHBvaW50LlxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludCBhZnRlciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgZGVsdGFzXG5cdFx0ICovXG5cdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHR2YXIgcm9vdCA9IHsgW25hbWVdOiB2YWwgfTtcblx0XHRcdHRoaXMuX2RlbHRhTW9kZWwuYXBwbHlUbyhydChyb290KSwge1xuXHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IGFkZHMgYSBuZXcgb3BlcmF0aW9uIHRvIGl0LlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ30gICAtIHRoZSB0eXBlIG9mIG9wZXJhdGlvbiAoZS5nLiwgJ2FkZCcsICdyZW1vdmUnLCBldGMuKVxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAgLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihtZXRob2QsIG5hbWUsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwub3BlcmF0aW9uKG1ldGhvZCwgbmFtZSwgb3B0aW9ucywgcGF0aCwgYXJnKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIHByb3BlcnR5IGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBwcm9wZXJ0eSBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgb2JqZWN0IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0Z2V0IGZhY2FkZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsLmZhY2FkZTtcblx0XHR9LFxuXG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcywgZGVsdGEpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YS5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0Ly9kZWx0YS5fYXBwbGljYXRpb25Db25kaXRpb24gPSBbXTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0cmV0dXJuIFUuaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRzZWxlY3QoZmVhdHVyZXMpIHtcblx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==