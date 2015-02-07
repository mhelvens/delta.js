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
	    ConstraintFailure = $__4.ConstraintFailure,
	    ApplicationOrderCycle = $__4.ApplicationOrderCycle,
	    UnresolvedConflict = $__4.UnresolvedConflict;
	U.extend(DeltaJs, {
	  ApplicationError: ApplicationError,
	  MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError,
	  DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError,
	  MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure,
	  ApplicationOrderCycle: ApplicationOrderCycle,
	  UnresolvedConflict: UnresolvedConflict
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
	    $__variationPoints_46_js__,
	    $__applicationConditions_46_js__;
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
	var defineApplicationConditions = ($__applicationConditions_46_js__ = __webpack_require__(17), $__applicationConditions_46_js__ && $__applicationConditions_46_js__.__esModule && $__applicationConditions_46_js__ || {default: $__applicationConditions_46_js__}).default;
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
	  defineApplicationConditions(this);
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
	    var $__17;
	    var $__16 = this;
	    if (typeof Superclass === 'string') {
	      ($__17 = [undefined, Superclass, name], Superclass = $__17[0], name = $__17[1], prototype = $__17[2], $__17);
	    }
	    prototype = prototype || {};
	    var thisDeltaJs = this;
	    U.assert(name[0] === name[0].toUpperCase(), ("Delta operations must have a name starting with a capital letter -- '" + name + "' does not."));
	    U.assert(!this.Delta[name], ("The '" + name + "' operation type already exists."));
	    var cls = this.Delta[name] = U.newSubclass(Superclass || this.Delta, (function(superFn) {
	      return function(arg, options) {
	        superFn.call(this, arg, options);
	        if (this.construct) {
	          this.construct();
	        }
	      };
	    }), U.extend({}, prototype, {applyTo: function(target) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        if (options.restrictToProperty && this.options.targetProp && options.restrictToProperty !== this.options.targetProp) {
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
	          prototype.applyTo.call(this, target, (!!this.options.targetProp ? U.extend({}, options, {restrictToProperty: null}) : options));
	        }
	      }}));
	    cls.type = cls.prototype.type = name;
	    cls.options = cls.prototype.options = {methods: prototype.methods || [name[0].toLowerCase() + name.slice(1)]};
	    cls.options.methods.forEach((function(method) {
	      U.a($__16._overloads, method).push(name);
	    }));
	    this._onNewOperationTypeListeners.forEach((function(fn) {
	      fn(cls);
	    }));
	    return cls;
	  },
	  onNewOperationType: function(fn) {
	    var $__16 = this;
	    this._onNewOperationTypeListeners.push(fn);
	    Object.keys(this.Delta).forEach((function(name) {
	      if (name[0] === name[0].toUpperCase()) {
	        fn($__16.Delta[name]);
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
	    var success = this._compositions.some((function($__17) {
	      var $__18 = $__17,
	          precondition = $__18.precondition,
	          fn = $__18.compose;
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
	  ApplicationOrderCycle: {get: function() {
	      return ApplicationOrderCycle;
	    }},
	  DeltaConflict: {get: function() {
	      return DeltaConflict;
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
	var ApplicationOrderCycle = U.newSubclass(Error, (function(superFn) {
	  return function ApplicationOrderCycle(from, to) {
	    superFn.call(this);
	    this.name = 'ApplicationOrderCycle';
	    this.message = ("The new application order between " + from + " and " + to + " created a cycle.");
	    this.from = from;
	    this.to = to;
	  };
	}));
	var DeltaConflict = U.newSubclass(Error, (function(superFn) {
	  return function DeltaConflict(deltas) {
	    superFn.call(this);
	    this.name = 'DeltaConflict';
	    var deltaNames = deltas.map((function(d) {
	      return ("'" + d.name + "'");
	    })).join(',');
	    this.message = ("There is an unresolved conflict between deltas " + deltaNames + ".");
	    this.deltas = deltas;
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
	  deltaJs._nextDeltaID = 0;
	  deltaJs.Delta = U.newClass(function Delta(arg) {
	    var options = arguments[1] !== (void 0) ? arguments[1] : {};
	    this.arg = arg;
	    this.id = deltaJs._nextDeltaID++;
	    this.options = options;
	  }, {
	    clone: function() {
	      return new this.constructor(this.arg, this.options);
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
	      if (this.options.targetProp) {
	        str += (" ‹" + this.options.targetProp + "›");
	      }
	      if (U.isDefined(this.arg)) {
	        str += (": " + JSON.stringify(this.arg));
	      }
	      if (options.debug) {
	        str += (" (" + this.id + ")");
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
	  U.extend(deltaJs.constructor.prototype, {_newDeltaByMethod: function(options, arg) {
	      var $__2 = this;
	      var newDeltas = this._overloads[options.method].map((function(type) {
	        return new $__2.Delta[type](arg, options);
	      }));
	      if (newDeltas.length === 1) {
	        return newDeltas[0];
	      } else {
	        var delta = new this.Delta.Overloaded(arg, options);
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
	    do: function() {
	      for (var firstArgs = [],
	          $__3 = 0; $__3 < arguments.length; $__3++)
	        firstArgs[$__3] = arguments[$__3];
	      var thisDelta = this;
	      var fcd = function() {
	        for (var args = [],
	            $__4 = 0; $__4 < arguments.length; $__4++)
	          args[$__4] = arguments[$__4];
	        return thisDelta.do.apply(thisDelta, fcd._args.concat(args));
	      };
	      fcd._args = firstArgs;
	      U.extend(fcd, operationMethods, {
	        _applyOperationMethod: function(method) {
	          for (var finalArgs = [],
	              $__5 = 1; $__5 < arguments.length; $__5++)
	            finalArgs[$__5 - 1] = arguments[$__5];
	          return {
	            newDelta: thisDelta.operation.apply(thisDelta, [{method: method}].concat(fcd._args).concat(finalArgs)),
	            fcdArgs: fcd._args
	          };
	        },
	        delta: thisDelta
	      });
	      return fcd;
	    }
	  });
	  var operationMethods = {};
	  deltaJs.onNewOperationType((function(cls) {
	    if (cls === deltaJs.Delta.Composite) {
	      return;
	    }
	    (cls.options.methods || []).forEach((function(method) {
	      if (U.isUndefined(operationMethods[method])) {
	        operationMethods[method] = function() {
	          for (var args = [],
	              $__4 = 0; $__4 < arguments.length; $__4++)
	            args[$__4] = arguments[$__4];
	          var $__6 = this._applyOperationMethod.apply(this, [method].concat(args)),
	              newDelta = $__6.newDelta,
	              fcdArgs = $__6.fcdArgs;
	          if (newDelta instanceof deltaJs.Delta.Composite) {
	            return newDelta.do();
	          } else {
	            return this.delta.do.apply(this.delta, fcdArgs);
	          }
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
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options);
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
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options);
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
	    operation: function(options, path, arg) {
	      var $__5;
	      var args = [].slice.call(arguments, 0);
	      var allOptions = {};
	      while (typeof args[0] === 'object') {
	        U.extend(allOptions, args.shift());
	      }
	      ($__5 = args, path = $__5[0], arg = $__5[1], $__5);
	      var delta = deltaJs._newDeltaByMethod(allOptions, arg);
	      return this._addOperation(allOptions, new Path(path), delta);
	    },
	    _addOperation: function(options, path, delta) {
	      if (path.rest) {
	        return this.operation({method: 'modify'}, path.prop)._addOperation(options, path.rest, delta);
	      }
	      this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
	      this.deltas[path.prop].options.targetProp = path.prop;
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
	        var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options);
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
	      this.values = this.options.method ? [{
	        method: this.options.method,
	        value: this.arg
	      }] : [];
	    },
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options);
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
	      if (this.options.method) {
	        this.values = [{
	          method: this.options.method,
	          value: this.arg
	        }];
	      } else {
	        this.values = [];
	      }
	    },
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.options);
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
	    $___46__46__47_Error_46_js__,
	    $___46__46__47_misc_46_js__,
	    $___46__46__47_Path_46_js__,
	    $__Composite_46_js__;
	var JsGraph = ($__js_45_graph__ = __webpack_require__(6), $__js_45_graph__ && $__js_45_graph__.__esModule && $__js_45_graph__ || {default: $__js_45_graph__}).default;
	var ApplicationOrderCycle = ($___46__46__47_Error_46_js__ = __webpack_require__(5), $___46__46__47_Error_46_js__ && $___46__46__47_Error_46_js__.__esModule && $___46__46__47_Error_46_js__ || {default: $___46__46__47_Error_46_js__}).ApplicationOrderCycle;
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
	    operation: function(options1, name, options2, path, arg) {
	      var $__6;
	      var args = [].slice.call(arguments);
	      var allOptions = {};
	      while (typeof args[0] === 'object') {
	        U.extend(allOptions, args.shift());
	      }
	      name = args.shift();
	      while (typeof args[0] === 'object') {
	        U.extend(allOptions, args.shift());
	      }
	      ($__6 = args, path = $__6[0], arg = $__6[1], $__6);
	      var delta = deltaJs._newDeltaByMethod(allOptions, arg);
	      return this._addOperation(name, allOptions, new Path(path), delta);
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
	      var $__5 = this;
	      var alreadyExists = U.isDefined(this.graph.vertexValue(name));
	      var deltaBase = delta;
	      if (path.prop) {
	        deltaBase = new deltaJs.Delta.Modify();
	        deltaBase._addOperation(options, path, delta);
	      }
	      if (alreadyExists) {
	        var existingDelta = this.graph.vertexValue(name);
	        deltaBase = existingDelta.composedWith(deltaBase);
	        deltaBase.name = existingDelta.name;
	        deltaBase.applicationCondition = existingDelta.applicationCondition;
	        this.graph.setVertex(name, deltaBase);
	      } else {
	        deltaBase.name = name;
	        this.graph.addVertex(name, deltaBase);
	        (options['combines'] || []).concat(options['after'] || []).forEach((function(subordinateName) {
	          $__5.graph.createEdge(subordinateName, name);
	          if ($__5.graph.hasCycle()) {
	            $__5.graph.removeExistingEdge(subordinateName, name);
	            throw new ApplicationOrderCycle(subordinateName, name);
	          }
	        }));
	        var deltaFeature;
	        if (options.feature) {
	          deltaFeature = deltaJs.newFeature(name, options);
	        } else {
	          deltaFeature = deltaJs.newFeature(("delta__" + name), U.extend({hidden: true}, options));
	        }
	        if (options.feature || deltaFeature.conditional) {
	          deltaBase.applicationCondition = deltaFeature;
	        }
	        if (U.isDefined(options['combines'])) {
	          deltaFeature.if(options['combines']);
	        }
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
	  function _addRequiredBy(feature, otherFeatures) {
	    _normalizeClause(otherFeatures).forEach((function(other) {
	      _addOnlyIf(other, feature);
	    }));
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
	    get condition() {
	      return _if[this.name];
	    },
	    get conditional() {
	      return U.a(_if, this.name).length > 0;
	    },
	    get restricted() {
	      return U.a(_onlyIf, this.name).length > 0;
	    },
	    select: function() {
	      this.if(true);
	    }
	  });
	  var FEATURE_CONNECTIONS = [['if', [_addIf, _addRequiredBy]], ['onlyIf', [_addOnlyIf]], ['selects', [_addSelects, _addOnlyIf]], ['requiredBy', [_addRequiredBy]], ['iff', [_addIf, _addRequiredBy, _addOnlyIf]]];
	  deltaJs.Feature.prototype.addOption = function(name, value) {
	    var $__2 = this;
	    FEATURE_CONNECTIONS.forEach((function($__3) {
	      var $__4 = $__3,
	          n = $__4[0],
	          methods = $__4[1];
	      if (name === n) {
	        methods.forEach((function(method) {
	          method($__2.name, value);
	        }));
	      }
	    }));
	  };
	  FEATURE_CONNECTIONS.forEach((function($__3) {
	    var name = $__3[0];
	    deltaJs.Feature.prototype[name] = function(value) {
	      this.addOption(name, value);
	    };
	  }));
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
	    value: function(options1, name, options2, path, arg) {
	      return this._deltaModel.operation.apply(this._deltaModel, arguments);
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__3, "do", {
	    value: function() {
	      for (var args = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        args[$__4] = arguments[$__4];
	      return this._deltaModel.do.apply(this._deltaModel, [{feature: true}].concat(args));
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
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
	var $__default = (function(deltaJs) {
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
	  U.extend(deltaJs.constructor.prototype, {select: function() {
	      for (var features = [],
	          $__2 = 0; $__2 < arguments.length; $__2++)
	        features[$__2] = arguments[$__2];
	      var $__1 = this;
	      features.forEach((function(feature) {
	        if (Array.isArray(feature)) {
	          $__1.select.apply($__1, feature);
	        } else {
	          $__1.features[feature].select();
	        }
	      }));
	    }});
	});
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNjg3NmIyMTQ4NDZmMDZjZDkyZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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LEVBQUksS0FBRyxDQUFDO0FBSTVELFVBQVEsQ0FBQyxPQUFNLFlBQVksVUFBVSxDQUFHLEVBRXZDLE1BQUssQ0FBTCxVQUFpQjtBakI5QlAsV0FBUyxjQUFvQixHQUFDO0FBQUcsZ0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELHNCQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBO0FpQjZCOUUsY0FBTyxRQUFTLEVBQUMsU0FBQyxPQUFNLENBQU07QUFDN0IsWUFBSSxLQUFJLFFBQVMsQ0FBQyxPQUFNLENBQUMsQ0FBRztBQUMzQixxQkFBVSxNQUFPLE1BQU8sUUFBTSxDQUFDLENBQUM7U0FDakMsS0FBTztBQUNOLHVCQUFZLENBQUUsT0FBTSxDQUFDLE9BQVEsRUFBQyxDQUFDO1NBQ2hDO0FBQUEsT0FDRCxFQUFDLENBQUM7S0FDSCxDQUVELENBQUMsQ0FBQztBQUlILEVuQjdDaUM7QW1COENqQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAyNjg3NmIyMTQ4NDZmMDZjZDkyZFxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcblx0XHRDb25zdHJhaW50RmFpbHVyZSwgQXBwbGljYXRpb25PcmRlckN5Y2xlLCBVbnJlc29sdmVkQ29uZmxpY3R9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsIFVucmVzb2x2ZWRDb25mbGljdCB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvN1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNVxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvM1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8uYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMuc2xpY2UoMCwgLTEpKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsge30gXSkpO1xuXHR9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsgW10gXSkpO1xuXHR9LFxuXG5cdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRyZXR1cm4gbmV3X29iajtcblx0fSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci84XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85XG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnN9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHR0aGlzLl9jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdHRoaXMuX292ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycyA9IFtdO1xuXG5cdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXG59LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHtcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKHR5cGVvZiBkZWx0YS5wcmVjb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICB7c3RyaW5nfVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlIHtvYmplY3R9XG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdW5kZWZpbmVkLCBTdXBlcmNsYXNzLCBuYW1lXSB9XG5cdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IHRoaXMuRGVsdGFbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKFN1cGVyY2xhc3MgfHwgdGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgcHJvcGVydHkgb24gdGhlIHRhcmdldCBvYmplY3Q/ICovXG5cdFx0XHRcdGlmIChvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAmJiAgdGhpcy5vcHRpb25zLnRhcmdldFByb3AgJiZcblx0XHRcdFx0XHRvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAhPT0gdGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7XG5cdFx0XHRcdFx0cHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIChcblx0XHRcdFx0XHRcdFx0ISF0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCA/XG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSA6XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRjbHMub3B0aW9ucyA9IGNscy5wcm90b3R5cGUub3B0aW9ucyA9IHsgLy8gVE9ETzogZG9uJ3QgcHV0IHRoaXMgaW4gcHJvdG90eXBlIGFueW1vcmVcblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHR9O1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0Y2xzLm9wdGlvbnMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgVS5hKHRoaXMuX292ZXJsb2FkcywgbWV0aG9kKS5wdXNoKG5hbWUpIH0pO1xuXG5cdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHQgKi9cblx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuRGVsdGEpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0Zm4odGhpcy5EZWx0YVtuYW1lXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHQgKi9cblx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGVzZSBkZWx0YXMgb2YgdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm5hbWUgPSAnTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcbn0pO1xuXG5leHBvcnQgdmFyIERlbHRhQXJnQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgYmFzZURlbHRhKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgYmFzZURlbHRhLmFyZyk7XG5cdHRoaXMubmFtZSA9ICdEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhlIHR5cGUtJyR7dHlwZW9mIGJhc2VEZWx0YS5hcmd9Jy12YWx1ZSBvZiB0aGlzIGJhc2UgZGVsdGEgb2YgdHlwZSAnJHtiYXNlRGVsdGEudHlwZX0nLmA7XG5cdHRoaXMuYmFzZURlbHRhID0gYmFzZURlbHRhO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGExLCBkZWx0YTIpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHQgICAgICAgICAgICAgICBlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcbn0pO1xuXG5leHBvcnQgdmFyIENvbnN0cmFpbnRGYWlsdXJlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbnN0cmFpbnRGYWlsdXJlKGZlYXR1cmUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIGZlYXR1cmUgJyR7ZmVhdHVyZS5uYW1lfScgaXMgYm90aCBzZWxlY3RlZCBhbmQgZXhjbHVkZWQgYnkgaXRzIGNvbnN0cmFpbnRzLmA7XG5cdHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG59KTtcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXBwbGljYXRpb25PcmRlckN5Y2xlKGZyb20sIHRvKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdHRoaXMuZnJvbSA9IGZyb207XG5cdHRoaXMudG8gICA9IHRvO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFDb25mbGljdCA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUNvbmZsaWN0KGRlbHRhcykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdEZWx0YUNvbmZsaWN0Jztcblx0dmFyIGRlbHRhTmFtZXMgPSBkZWx0YXMubWFwKGQgPT4gYCcke2QubmFtZX0nYCkuam9pbignLCcpO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke2RlbHRhTmFtZXN9LmA7XG5cdHRoaXMuZGVsdGFzID0gZGVsdGFzO1xufSk7XG5cblxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0Vycm9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIHd0fSAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YSkpIHsgcmV0dXJuIH1cblxuXHRkZWx0YUpzLl9uZXh0RGVsdGFJRCA9IDA7XG5cblx0LyoqIHtAY2xhc3MgRGVsdGF9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YShhcmcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuYXJnICA9IGFyZztcblx0XHR0aGlzLmlkID0gZGVsdGFKcy5fbmV4dERlbHRhSUQrKztcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHR9LCB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YmNsYXNzZXMgdG8gbWFrZSBhIGNsb25lIG9mICd0aGlzJyBkZWx0YS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkgeyByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcmcsIHRoaXMub3B0aW9ucykgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtICB2YWx1ZSAgIHsqfSAgICAgICAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAgb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdCAqL1xuXHRcdGFwcGxpZWRUbyh2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRpZiAodmFsdWUgaW5zdGFuY2VvZiBSZWFkYWJsZVRhcmdldCkgICB7IHZhbHVlID0gdmFsdWUudmFsdWUgICB9XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHR2YXIgb2JqID0geyB2YWx1ZSB9O1xuXHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJyksIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiBkZWx0YUpzLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zID0ge30pIHtcblx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgc3RyICs9IGAg4oC5JHt0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcH3igLpgIH1cblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpICAgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5pZH0pYCAgICAgICAgICAgICAgICAgfVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIGFyZyAgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfbmV3RGVsdGFCeU1ldGhvZChvcHRpb25zLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLl9vdmVybG9hZHNbb3B0aW9ucy5tZXRob2RdXG5cdFx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLkRlbHRhW3R5cGVdKGFyZywgb3B0aW9ucykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHZhciBkZWx0YSA9IG5ldyB0aGlzLkRlbHRhLk92ZXJsb2FkZWQoYXJnLCBvcHRpb25zKTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKioge0BjbGFzc31cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlID0gVS5uZXdTdWJjbGFzcyhkZWx0YUpzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRlKC4uLmFyZ3MpIHtcblx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9LCB7XG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogSW1wbGVtZW50IHRoaXMgbWV0aG9kIGluIHN1YmNsYXNzZXMgdG8gcHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSBEZWx0YS5Db21wb3NpdGUgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnb3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LlxuXHRcdCAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGRvKC4uLmZpcnN0QXJncykge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLmRvLmFwcGx5KHRoaXNEZWx0YSwgZmNkLl9hcmdzLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0ZmNkLl9hcmdzID0gZmlyc3RBcmdzO1xuXHRcdFx0VS5leHRlbmQoZmNkLCBvcGVyYXRpb25NZXRob2RzLCB7XG5cdFx0XHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRuZXdEZWx0YTogdGhpc0RlbHRhLm9wZXJhdGlvbi5hcHBseSh0aGlzRGVsdGEsIFt7bWV0aG9kfV0uY29uY2F0KGZjZC5fYXJncykuY29uY2F0KGZpbmFsQXJncykpLFxuXHRcdFx0XHRcdFx0ZmNkQXJnczogIGZjZC5fYXJnc1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRlbHRhOiB0aGlzRGVsdGFcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGZjZDtcblx0XHR9LFxuXHR9KTtcblxuXHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXHRkZWx0YUpzLm9uTmV3T3BlcmF0aW9uVHlwZSgoY2xzKSA9PiB7XG5cdFx0aWYgKGNscyA9PT0gZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHsgcmV0dXJuIH1cblx0XHQoY2xzLm9wdGlvbnMubWV0aG9kcyB8fCBbXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcGVyYXRpb25NZXRob2RzW21ldGhvZF0pKSB7XG5cdFx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHtuZXdEZWx0YSwgZmNkQXJnc30gPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZC5hcHBseSh0aGlzLCBbbWV0aG9kXS5jb25jYXQoYXJncykpO1xuXHRcdFx0XHRcdGlmIChuZXdEZWx0YSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3RGVsdGEuZG8oKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZGVsdGEuZG8uYXBwbHkodGhpcy5kZWx0YSwgZmNkQXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLCAnT3ZlcmxvYWRlZCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMub3ZlcmxvYWRzID0gW10gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk92ZXJsb2FkZWR9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9KTtcblx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRpZiAoIXN1Y2Nlc3MpIHtcblx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSwgZXJyb3JzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH1cblx0fSk7XG5cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHwgZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCgpO1xuXHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZDEsIGQyLCBlcnJvcnMpIH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Nb2RpZnkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ01vZGlmeScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7IHRoaXMuZGVsdGFzID0ge30gfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpcy5kZWx0YXNbcHJvcF0uY2xvbmUoKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0ICovXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0Ly9pZiAoIW9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5IHx8IG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ID09PSBwcm9wKSB7XG5cdFx0XHRcdC8vXHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksXG5cdFx0XHRcdC8vXHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pKTtcblx0XHRcdFx0Ly99XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fSAtIGFueSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXHRcdFx0dmFyIGFsbE9wdGlvbnMgPSB7fTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdFtwYXRoLCBhcmddID0gYXJncztcblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QoYWxsT3B0aW9ucywgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oYWxsT3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbih7IG1ldGhvZDogJ21vZGlmeScgfSwgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0Ll9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5vcHRpb25zLnRhcmdldFByb3AgPSBwYXRoLnByb3A7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdHJldHVybiAodGhpcy5kZWx0YXNbcGF0aC5wcm9wXSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkID0gdHJ1ZTtcblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIG5vLW9wIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgTm9PcCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0W1xuXHRcdFsnQWRkJywgICAgICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XS5mb3JFYWNoKChbVHlwZSwgdHlwZSwgcHJlXSkgPT4ge1xuXHRcdC8vIEluIHRoZSBsaW5lIGRpcmVjdGx5IGJlbG93LCAndGhpcycgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiB0cmFjZXVyOlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZyA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLm1hcChkID0+IGQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKChkMSwgZDIpID0+IGRlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdCAgICAucHJlY29uZGl0aW9uKHd0KHJlc3VsdCwgJ2FyZycpKSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gZGVsdGFKcy5jb21wb3NlZChyZXN1bHQuZGVsdGFzW3Byb3BdLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLm9wdGlvbnMubWV0aG9kID8gW3sgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLCB2YWx1ZTogdGhpcy5hcmcgfV0gOiBbXTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvQXJyYXknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24pKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubWV0aG9kKSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0ICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLFxuXHQgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdcbiAgICAgICAgICAgICAgIH1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdCAgICAgICAoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdHZhciBEZWx0YU1vZGVsID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCBhcmcpIHtcblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0dmFyIGFsbE9wdGlvbnMgPSB7fTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRbcGF0aCwgYXJnXSA9IGFyZ3M7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXG5cdFx0XHQvKiBjaGVjayBpZiBhIGRlbHRhIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzICovXG5cdFx0XHR2YXIgYWxyZWFkeUV4aXN0cyA9IFUuaXNEZWZpbmVkKHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSkpO1xuXG5cdFx0XHQvKiBzdGFydGluZyB0byBkZWZpbmUgdGhlIGRlbHRhIHRoYXQgZ29lcyBkaXJlY3RseSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdHZhciBkZWx0YUJhc2UgPSBkZWx0YTtcblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpO1xuXHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuXHRcdFx0aWYgKGFscmVhZHlFeGlzdHMpIHtcblx0XHRcdFx0dmFyIGV4aXN0aW5nRGVsdGEgPSB0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpO1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBleGlzdGluZ0RlbHRhLmNvbXBvc2VkV2l0aChkZWx0YUJhc2UpO1xuXHRcdFx0XHRkZWx0YUJhc2UubmFtZSA9IGV4aXN0aW5nRGVsdGEubmFtZTtcblx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZXhpc3RpbmdEZWx0YS5hcHBsaWNhdGlvbkNvbmRpdGlvbjtcblx0XHRcdFx0dGhpcy5ncmFwaC5zZXRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8qIGFkZCB0aGUgbmV3IGRlbHRhIHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0XHRkZWx0YUJhc2UubmFtZSA9IG5hbWU7XG5cdFx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuXHRcdFx0XHQob3B0aW9uc1snY29tYmluZXMnXSB8fCBbXSkuY29uY2F0KG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10pLmZvckVhY2goKHN1Ym9yZGluYXRlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmdyYXBoLmhhc0N5Y2xlKCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuZ3JhcGgucmVtb3ZlRXhpc3RpbmdFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgQXBwbGljYXRpb25PcmRlckN5Y2xlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKiBhcHBsaWNhdGlvbiBjb25kaXRpb24gYW5kIG9wdGlvbmFsbHksIGFuIGVwb255bW91cywgbGlua2VkIGZlYXR1cmUgKi9cblx0XHRcdFx0dmFyIGRlbHRhRmVhdHVyZTtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSkgeyBkZWx0YUZlYXR1cmUgPSBkZWx0YUpzLm5ld0ZlYXR1cmUoICBuYW1lLCAgICAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgfVxuXHRcdFx0XHRlbHNlICAgICAgICAgICAgICAgICB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggYGRlbHRhX18ke25hbWV9YCwgVS5leHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmZlYXR1cmUgfHwgZGVsdGFGZWF0dXJlLmNvbmRpdGlvbmFsKSB7XG5cdFx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogZXh0cmFjdCAnaWYnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1snY29tYmluZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuaWYob3B0aW9uc1snY29tYmluZXMnXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRlbHRhO1xuXG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGdpdmVuIGEgJ3VzZXIgaW5wdXQnIGNsYXVzZSwgbm9ybWFsaXplIGl0ICovXG5cdGZ1bmN0aW9uIF9ub3JtYWxpemVDbGF1c2UoaW5wdXQpIHtcblx0XHRpbnB1dCA9IEFycmF5LmlzQXJyYXkoaW5wdXQpID8gaW5wdXQgOiBbaW5wdXRdO1xuXHRcdGlucHV0ID0gaW5wdXQubWFwKGNvbmogPT4gY29uaiBpbnN0YW5jZW9mIGRlbHRhSnMuRmVhdHVyZSA/IGNvbmoubmFtZSA6IGNvbmopO1xuXHRcdHJldHVybiBpbnB1dDtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgdGhlIG11dHVhbCBzZWxlY3Rpb24gb2YgZmVhdHVyZXMgKi9cblx0dmFyIF9pZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9zZWxlY3RlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZElmKGZlYXR1cmUsIGRpc2p1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZV0gPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX2lmW2ZlYXR1cmVdICE9PSB0cnVlKSB7XG5cdFx0XHRVLmEoX2lmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoZGlzanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFNlbGVjdHMoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRJZihvdGhlciwgZmVhdHVyZSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0dmFyIF9vbmx5SWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgY29uanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChjb25qdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRVLmEoX29ubHlJZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGNvbmp1bmN0KSk7XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIF9hZGRSZXF1aXJlZEJ5KGZlYXR1cmUsIG90aGVyRmVhdHVyZXMpIHtcblx0XHRfbm9ybWFsaXplQ2xhdXNlKG90aGVyRmVhdHVyZXMpLmZvckVhY2goKG90aGVyKSA9PiB7XG5cdFx0XHRfYWRkT25seUlmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRkbyB7XG5cdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIV9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKChfaWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5zb21lKGRpc2ogPT4gZGlzai5ldmVyeShjb25qID0+IF9zZWxlY3RlZFtjb25qXSkpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cblx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnb25seUlmJyBjb25qdW5jdHMgdGhhdCBhcmUgZXhjbHVkZWQsIHRoaXMgZmVhdHVyZSBpcyBleGNsdWRlZCAqL1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzI0ZlYXR1cmV9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkZlYXR1cmUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIEZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHQvKiBzZXQgYmFzaWMgZmllbGRzICovXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0LyogdXBkYXRlIGNvbmRpdGlvbnMgKi9cblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG9wdGlvbiwgb3B0aW9uc1tvcHRpb25dKTtcblx0XHR9KTtcblxuXHR9LCB7XG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdGlmIChfc2VsZWN0ZWRbdGhpcy5uYW1lXSAmJiAhX2FsbG93ZWRbdGhpcy5uYW1lXSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgQ29uc3RyYWludEZhaWx1cmUodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3NlbGVjdGVkW3RoaXMubmFtZV07XG5cdFx0fSxcblx0XHRnZXQgY29uZGl0aW9uKCkgICB7IHJldHVybiBfaWZbdGhpcy5uYW1lXSAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0Z2V0IGNvbmRpdGlvbmFsKCkgeyByZXR1cm4gVS5hKF9pZiwgICAgIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdGdldCByZXN0cmljdGVkKCkgIHsgcmV0dXJuIFUuYShfb25seUlmLCB0aGlzLm5hbWUpLmxlbmd0aCA+IDAgfSxcblx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHR9KTtcblxuXG5cdC8qIHJlc3RyaWN0aW9ucyBhbmQgY29ubmVjdGlvbnMgKi9cblx0Y29uc3QgRkVBVFVSRV9DT05ORUNUSU9OUyA9IFtcblx0XHRbICdpZicsICAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgIF0sIC8vIHRoaXMgc2VsZWN0ZWQgYnkgb3RoZXJcblx0XHRbICdvbmx5SWYnLCAgICAgW19hZGRPbmx5SWZdICAgICAgICAgICAgICAgICAgICAgICAgIF0sIC8vIGVycm9yIGlmIHRoaXMgYnV0IG5vdCBvdGhlclxuXHRcdFsgJ3NlbGVjdHMnLCAgICBbX2FkZFNlbGVjdHMsIF9hZGRPbmx5SWZdICAgICAgICAgICAgXSwgLy8gb3RoZXIgc2VsZWN0ZWQgYnkgdGhpc1xuXHRcdFsgJ3JlcXVpcmVkQnknLCBbX2FkZFJlcXVpcmVkQnldICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgb3RoZXIgYnV0IG5vdCB0aGlzXG5cdFx0WyAnaWZmJywgICAgICAgIFtfYWRkSWYsIF9hZGRSZXF1aXJlZEJ5LCBfYWRkT25seUlmXSBdICAvLyBpZiBhbmQgb25seUlmXG5cdF07XG5cdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGUuYWRkT3B0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbiwgbWV0aG9kc10pID0+IHtcblx0XHRcdGlmIChuYW1lID09PSBuKSB7XG5cdFx0XHRcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IG1ldGhvZCh0aGlzLm5hbWUsIHZhbHVlKSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblx0RkVBVFVSRV9DT05ORUNUSU9OUy5mb3JFYWNoKChbbmFtZV0pID0+IHtcblx0XHRkZWx0YUpzLkZlYXR1cmUucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihuYW1lLCB2YWx1ZSk7XG5cdFx0fTtcblx0fSk7XG5cblxuXHQvKiB0aGUgZmVhdHVyZXMgYmVsb25naW5nIHRvIHRoaXMgRGVsdGFKcyBpbnN0YW5jZSAqL1xuXHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG5hbWUgICAge3N0cmluZ30gIC0gdGhlIG5hbWUgb2YgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNGZWF0dXJlfSAtIHRoZSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXcgZmVhdHVyZVxuXHRcdCAqL1xuXHRcdG5ld0ZlYXR1cmUobmFtZSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHQvKiBzYW5pdHkgY2hlY2sqL1xuXHRcdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh0aGlzLmZlYXR1cmVzW25hbWVdKSxcblx0XHRcdFx0YEEgZmVhdHVyZSB3aXRoIHRoZSBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdFx0LyogY3JlYXRlIHRoZSBuZXcgZmVhdHVyZSAqL1xuXHRcdFx0cmV0dXJuIHRoaXMuZmVhdHVyZXNbbmFtZV0gPSBuZXcgdGhpcy5GZWF0dXJlKG5hbWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtydH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXG5cdGRlZmluZURlbHRhTW9kZWwoZGVsdGFKcyk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblx0ZGVsdGFKcy5fZGVsdGFNb2RlbCA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogVGhpcyBtZXRob2QgaW5kaWNhdGVzIGEgdmFyaWF0aW9uIHBvaW50LlxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9IC0gYSBob29rIGJ5IHdoaWNoIG9wZXJhdGlvbnMgZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCBjYW4gYmUgYXBwbGllZFxuXHRcdCAqIEBwYXJhbSB2YWwgIHsqfSAgICAgIC0gdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnRcblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludCBhZnRlciBhcHBseWluZyB0aGUgYXBwcm9wcmlhdGUgZGVsdGFzXG5cdFx0ICovXG5cdFx0dnAobmFtZSwgdmFsKSB7XG5cdFx0XHR2YXIgcm9vdCA9IHsgW25hbWVdOiB2YWwgfTtcblx0XHRcdHRoaXMuX2RlbHRhTW9kZWwuYXBwbHlUbyhydChyb290KSwge1xuXHRcdFx0XHRyZXN0cmljdFRvUHJvcGVydHk6IG5hbWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJvb3RbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IGFkZHMgYSBuZXcgb3BlcmF0aW9uIHRvIGl0LlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMSB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBuYW1lYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMiB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zMSwgbmFtZSwgb3B0aW9uczIsIHBhdGgsIGFyZykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwub3BlcmF0aW9uLmFwcGx5KHRoaXMuX2RlbHRhTW9kZWwsIGFyZ3VtZW50cyk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgbWV0aG9kIGlzIGFuIGFsaWFzIHRvIHRoZSBlcG9ueW1vdXNcblx0XHQgKiBtZXRob2Qgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIGZhY2FkZSB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LiBJdCBwcmVzZXRzIHRoZSAnZmVhdHVyZScgb3B0aW9uIHRvICd0cnVlJywgYnV0IHRoaXMgY2FuIGJlXG5cdFx0ICogb3ZlcndyaXR0ZW4gbWFudWFsbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uYXJncykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwuZG8uYXBwbHkodGhpcy5fZGVsdGFNb2RlbCxcblx0XHRcdFx0XHRbeyBmZWF0dXJlOiB0cnVlIH1dIC8vIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwsIGRlbHRhcyBhcmUgZmVhdHVyZXMgYnkgZGVmYXVsdFxuXHRcdFx0XHRcdFx0XHQuY29uY2F0KGFyZ3MpKTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdHJldHVybiBVLmlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0c2VsZWN0KC4uLmZlYXR1cmVzKSB7XG5cdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGZlYXR1cmUpKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3QuYXBwbHkodGhpcywgZmVhdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mZWF0dXJlc1tmZWF0dXJlXS5zZWxlY3QoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9