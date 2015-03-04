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
	    UnresolvedConflict = $__4.UnresolvedConflict,
	    MultipleActiveFacadesError = $__4.MultipleActiveFacadesError;
	U.extend(DeltaJs, {
	  ApplicationError: ApplicationError,
	  MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError,
	  DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError,
	  MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure,
	  ApplicationOrderCycle: ApplicationOrderCycle,
	  UnresolvedConflict: UnresolvedConflict,
	  MultipleActiveFacadesError: MultipleActiveFacadesError
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
	  },
	  toString: function() {
	    var result = "";
	    if (U.isDefined(this.prop)) {
	      result += this.prop;
	      if (U.isDefined(this.rest)) {
	        result += "." + this.rest.toString();
	      }
	    }
	    return result;
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
	  MultipleActiveFacadesError: {get: function() {
	      return MultipleActiveFacadesError;
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
	var MultipleActiveFacadesError = U.newSubclass(Error, (function(superFn) {
	  return function MultipleActiveFacadesError(delta) {
	    superFn.call(this);
	    this.name = 'MultipleActiveFacadesError';
	    this.delta = delta;
	    this.message = ("Only one 'do' interface can be active per '" + delta.type + "' delta.");
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
	    $__Delta_46_js__,
	    $___46__46__47_Error_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var defineDelta = ($__Delta_46_js__ = __webpack_require__(7), $__Delta_46_js__ && $__Delta_46_js__.__esModule && $__Delta_46_js__ || {default: $__Delta_46_js__}).default;
	var MultipleActiveFacadesError = ($___46__46__47_Error_46_js__ = __webpack_require__(5), $___46__46__47_Error_46_js__ && $___46__46__47_Error_46_js__.__esModule && $___46__46__47_Error_46_js__ || {default: $___46__46__47_Error_46_js__}).MultipleActiveFacadesError;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta.Composite)) {
	    return;
	  }
	  defineDelta(deltaJs);
	  U.extend(deltaJs.constructor.prototype, {_newDeltaByMethod: function(options, arg) {
	      var $__3 = this;
	      var newDeltas = this._overloads[options.method].map((function(type) {
	        return new $__3.Delta[type](arg, options);
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
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        args[$__4] = arguments[$__4];
	      superFn.apply(this, args);
	    };
	  }), {
	    operation: function() {
	      throw new Error(("A Delta.Composite subclass (in this case: " + this.type + ") needs to implement the 'operation' method."));
	    },
	    do: function() {
	      for (var firstArgs = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        firstArgs[$__4] = arguments[$__4];
	      var thisDelta = this;
	      var fcd = (function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        return thisDelta.do.apply(thisDelta, fcd._args.concat(args));
	      });
	      fcd._args = firstArgs;
	      U.extend(fcd, operationMethods, {
	        _applyOperationMethod: function(method) {
	          for (var finalArgs = [],
	              $__6 = 1; $__6 < arguments.length; $__6++)
	            finalArgs[$__6 - 1] = arguments[$__6];
	          return thisDelta.operation.apply(thisDelta, [{method: method}].concat(fcd._args).concat(finalArgs));
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
	              $__5 = 0; $__5 < arguments.length; $__5++)
	            args[$__5] = arguments[$__5];
	          if (this._facadeDisabled) {
	            throw new MultipleActiveFacadesError(this);
	          }
	          var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	          if (newDelta instanceof deltaJs.Delta.Composite) {
	            var activeSubFacade = this._activeSubFacade;
	            while (activeSubFacade) {
	              activeSubFacade._facadeDisabled = true;
	              activeSubFacade = activeSubFacade._activeSubFacade;
	            }
	            return this._activeSubFacade = newDelta.do();
	          } else {
	            return this;
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
	    deepestModifyDeltaByPath: function(path) {
	      if (U.isUndefined(path.prop) || this.deltas[path.prop].type !== 'Modify') {
	        return {
	          delta: this,
	          rest: path
	        };
	      }
	      return this.deltas[path.prop].deepestModifyDeltaByPath(path.rest || new Path());
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
	      var deltaBase;
	      var existingDelta = this.graph.vertexValue(name);
	      if (U.isDefined(existingDelta) && existingDelta.type === 'Modify' && U.isDefined(path.rest)) {
	        return existingDelta._addOperation(options, path.rest, delta);
	      }
	      if (path.prop) {
	        deltaBase = new deltaJs.Delta.Modify();
	        deltaBase._addOperation(options, path, delta);
	      }
	      if (U.isDefined(existingDelta)) {
	        deltaBase = existingDelta.composedWith(deltaBase);
	        deltaBase.name = existingDelta.name;
	        deltaBase.applicationCondition = existingDelta.applicationCondition;
	        this.graph.setVertex(name, deltaBase);
	      } else {
	        deltaBase.name = name;
	        this.graph.addVertex(name, deltaBase);
	        (options['resolves'] || []).concat(options['after'] || []).concat(options['requires'] || []).forEach((function(subordinateName) {
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
	        if (U.isDefined(options['resolves'])) {
	          deltaFeature.if(options['resolves']);
	        }
	        if (U.isDefined(options['requires'])) {
	          deltaFeature.selects(options['requires']);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMDYyNjUwN2U3NmRmYjhmY2M3NSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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OlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMwNjI2NTA3ZTc2ZGZiOGZjYzc1XG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuXHRcdENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUsXG5cdFx0VW5yZXNvbHZlZENvbmZsaWN0LCBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludEZhaWx1cmUsIEFwcGxpY2F0aW9uT3JkZXJDeWNsZSxcbiAgICAgICAgICAgICAgICAgICAgVW5yZXNvbHZlZENvbmZsaWN0LCBNdWx0aXBsZUFjdGl2ZUZhY2FkZXNFcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvN1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNVxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvM1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdGRlZmF1bHQob2JqZWN0LCAuLi5yZXN0KSB7XG5cdFx0dmFyIGtleXMgPSByZXN0LnNsaWNlKDAsIC0xKTtcblx0XHR2YXIgZGVmID0gcmVzdFtyZXN0Lmxlbmd0aC0xXTtcblx0XHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHsgcmV0dXJuIG9iamVjdCB9XG5cdFx0dmFyIGxhc3QgPSBVLm8uYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMuc2xpY2UoMCwgLTEpKSk7XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQobGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSkpIHtcblx0XHRcdGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0gPSBkZWY7XG5cdFx0fVxuXHRcdHJldHVybiBsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dO1xuXHR9LFxuXG5cdG8ob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsge30gXSkpO1xuXHR9LFxuXG5cdGEob2JqZWN0LCAuLi5rZXlzKSB7XG5cdFx0cmV0dXJuIFUuZGVmYXVsdC5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cykuY29uY2F0KFsgW10gXSkpO1xuXHR9LFxuXG5cdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRyZXR1cm4gbmV3X29iajtcblx0fSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci84XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85XG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzJztcbmltcG9ydCBkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAgZnJvbSAnLi9mZWF0dXJlcy5qcyc7XG5pbXBvcnQgZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgIGZyb20gJy4vdmFyaWF0aW9uUG9pbnRzLmpzJztcbmltcG9ydCBkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnMgZnJvbSAnLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbi8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnN9XG4gKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG4gKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cbiAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHR0aGlzLl9jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdHRoaXMuX292ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycyA9IFtdO1xuXG5cdGRlZmluZURlbHRhICAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICh0aGlzKTtcblx0ZGVmaW5lRGVsdGFNb2RlbCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVGZWF0dXJlcyAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICh0aGlzKTtcblx0ZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zKHRoaXMpO1xuXG59LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHtcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKHR5cGVvZiBkZWx0YS5wcmVjb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICB7c3RyaW5nfVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlIHtvYmplY3R9XG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdW5kZWZpbmVkLCBTdXBlcmNsYXNzLCBuYW1lXSB9XG5cdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IHRoaXMuRGVsdGFbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKFN1cGVyY2xhc3MgfHwgdGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgcHJvcGVydHkgb24gdGhlIHRhcmdldCBvYmplY3Q/ICovXG5cdFx0XHRcdGlmIChvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAmJiAgdGhpcy5vcHRpb25zLnRhcmdldFByb3AgJiZcblx0XHRcdFx0XHRvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSAhPT0gdGhpcy5vcHRpb25zLnRhcmdldFByb3ApIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBzaG91bGQgdGhpcyBkZWx0YSBvbmx5IGJlIGFwcGxpZWQgZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBzZWxlY3Rpb24/ICovXG5cdFx0XHRcdGlmICghdGhpcy5zZWxlY3RlZCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIGRvZXMgdGhlIHRhcmdldCBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gb2YgdGhlIGRlbHRhPyAqL1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblxuXHRcdFx0XHQvKiBPSywgdGhlbiBhcHBseSBpdCBpZiBhIG1ldGhvZCB0byBkbyBzbyB3YXMgaW5jbHVkZWQgaW4gdGhlIG9wZXJhdGlvbiAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7XG5cdFx0XHRcdFx0cHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQsIChcblx0XHRcdFx0XHRcdFx0ISF0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCA/XG5cdFx0XHRcdFx0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSA6XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnNcblx0XHRcdFx0XHQpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRjbHMub3B0aW9ucyA9IGNscy5wcm90b3R5cGUub3B0aW9ucyA9IHsgLy8gVE9ETzogZG9uJ3QgcHV0IHRoaXMgaW4gcHJvdG90eXBlIGFueW1vcmVcblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHR9O1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0Y2xzLm9wdGlvbnMubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgVS5hKHRoaXMuX292ZXJsb2FkcywgbWV0aG9kKS5wdXNoKG5hbWUpIH0pO1xuXG5cdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHQgKi9cblx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuRGVsdGEpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0Zm4odGhpcy5EZWx0YVtuYW1lXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5fY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHQgKi9cblx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5fY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRpZiAoIXN1Y2Nlc3MpIHsgdGhyb3cgbmV3IENvbXBvc2l0aW9uRXJyb3IoZDEsIGQyKSB9XG5cblx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfSxcblx0dG9TdHJpbmcoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFwiXCI7XG5cdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMucHJvcCkpIHtcblx0XHRcdHJlc3VsdCArPSB0aGlzLnByb3A7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5yZXN0KSkge1xuXHRcdFx0XHRyZXN1bHQgKz0gXCIuXCIgKyB0aGlzLnJlc3QudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0nLmA7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGVzZSBkZWx0YXMgb2YgdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm5hbWUgPSAnTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcbn0pO1xuXG5leHBvcnQgdmFyIERlbHRhQXJnQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgYmFzZURlbHRhKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgYmFzZURlbHRhLmFyZyk7XG5cdHRoaXMubmFtZSA9ICdEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhlIHR5cGUtJyR7dHlwZW9mIGJhc2VEZWx0YS5hcmd9Jy12YWx1ZSBvZiB0aGlzIGJhc2UgZGVsdGEgb2YgdHlwZSAnJHtiYXNlRGVsdGEudHlwZX0nLmA7XG5cdHRoaXMuYmFzZURlbHRhID0gYmFzZURlbHRhO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYDtcblx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGExLCBkZWx0YTIpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHQgICAgICAgICAgICAgICBlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcbn0pO1xuXG5leHBvcnQgdmFyIENvbnN0cmFpbnRGYWlsdXJlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbnN0cmFpbnRGYWlsdXJlKGZlYXR1cmUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQ29uc3RyYWludEZhaWx1cmUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIGZlYXR1cmUgJyR7ZmVhdHVyZS5uYW1lfScgaXMgYm90aCBzZWxlY3RlZCBhbmQgZXhjbHVkZWQgYnkgaXRzIGNvbnN0cmFpbnRzLmA7XG5cdHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG59KTtcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXBwbGljYXRpb25PcmRlckN5Y2xlKGZyb20sIHRvKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0FwcGxpY2F0aW9uT3JkZXJDeWNsZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgbmV3IGFwcGxpY2F0aW9uIG9yZGVyIGJldHdlZW4gJHtmcm9tfSBhbmQgJHt0b30gY3JlYXRlZCBhIGN5Y2xlLmA7XG5cdHRoaXMuZnJvbSA9IGZyb207XG5cdHRoaXMudG8gICA9IHRvO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFDb25mbGljdCA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUNvbmZsaWN0KGRlbHRhcykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdEZWx0YUNvbmZsaWN0Jztcblx0dmFyIGRlbHRhTmFtZXMgPSBkZWx0YXMubWFwKGQgPT4gYCcke2QubmFtZX0nYCkuam9pbignLCcpO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgaXMgYW4gdW5yZXNvbHZlZCBjb25mbGljdCBiZXR3ZWVuIGRlbHRhcyAke2RlbHRhTmFtZXN9LmA7XG5cdHRoaXMuZGVsdGFzID0gZGVsdGFzO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IoZGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3InO1xuXHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdHRoaXMubWVzc2FnZSA9IGBPbmx5IG9uZSAnZG8nIGludGVyZmFjZSBjYW4gYmUgYWN0aXZlIHBlciAnJHtkZWx0YS50eXBlfScgZGVsdGEuYDtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhKSkgeyByZXR1cm4gfVxuXG5cdGRlbHRhSnMuX25leHREZWx0YUlEID0gMDtcblxuXHQvKioge0BjbGFzcyBEZWx0YX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhKGFyZywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5hcmcgID0gYXJnO1xuXHRcdHRoaXMuaWQgPSBkZWx0YUpzLl9uZXh0RGVsdGFJRCsrO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH0sIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5vcHRpb25zKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCkgeyBzdHIgKz0gYCDigLkke3RoaXMub3B0aW9ucy50YXJnZXRQcm9wfeKAumAgfVxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgICB7IHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0fSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgICBmcm9tICcuL0RlbHRhLmpzJztcbmltcG9ydCB7TXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3J9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIGFyZyAgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfbmV3RGVsdGFCeU1ldGhvZChvcHRpb25zLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLl9vdmVybG9hZHNbb3B0aW9ucy5tZXRob2RdXG5cdFx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLkRlbHRhW3R5cGVdKGFyZywgb3B0aW9ucykpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHZhciBkZWx0YSA9IG5ldyB0aGlzLkRlbHRhLk92ZXJsb2FkZWQoYXJnLCBvcHRpb25zKTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKioge0BjbGFzc31cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlID0gVS5uZXdTdWJjbGFzcyhkZWx0YUpzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRlKC4uLmFyZ3MpIHtcblx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9LCB7XG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogSW1wbGVtZW50IHRoaXMgbWV0aG9kIGluIHN1YmNsYXNzZXMgdG8gcHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbigpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQSBEZWx0YS5Db21wb3NpdGUgc3ViY2xhc3MgKGluIHRoaXMgY2FzZTogJHt0aGlzLnR5cGV9KSBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LlxuXHRcdCAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGRvKC4uLmZpcnN0QXJncykge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSAoLi4uYXJncykgPT4gdGhpc0RlbHRhLmRvLmFwcGx5KHRoaXNEZWx0YSwgZmNkLl9hcmdzLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRmY2QuX2FyZ3MgPSBmaXJzdEFyZ3M7XG5cdFx0XHRVLmV4dGVuZChmY2QsIG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdFx0X2FwcGx5T3BlcmF0aW9uTWV0aG9kKG1ldGhvZCwgLi4uZmluYWxBcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YS5vcGVyYXRpb24uYXBwbHkodGhpc0RlbHRhLCBbe21ldGhvZH1dLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH1cblx0fSk7XG5cblx0dmFyIG9wZXJhdGlvbk1ldGhvZHMgPSB7fTtcblx0ZGVsdGFKcy5vbk5ld09wZXJhdGlvblR5cGUoKGNscykgPT4ge1xuXHRcdGlmIChjbHMgPT09IGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSB7IHJldHVybiB9XG5cdFx0KGNscy5vcHRpb25zLm1ldGhvZHMgfHwgW10pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9mYWNhZGVEaXNhYmxlZCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVBY3RpdmVGYWNhZGVzRXJyb3IodGhpcykgfVxuXHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kLmFwcGx5KHRoaXMsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRcdFx0aWYgKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHtcblx0XHRcdFx0XHRcdHZhciBhY3RpdmVTdWJGYWNhZGUgPSB0aGlzLl9hY3RpdmVTdWJGYWNhZGU7XG5cdFx0XHRcdFx0XHR3aGlsZSAoYWN0aXZlU3ViRmFjYWRlKSB7XG5cdFx0XHRcdFx0XHRcdGFjdGl2ZVN1YkZhY2FkZS5fZmFjYWRlRGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhY3RpdmVTdWJGYWNhZGUgPSBhY3RpdmVTdWJGYWNhZGUuX2FjdGl2ZVN1YkZhY2FkZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hY3RpdmVTdWJGYWNhZGUgPSBuZXdEZWx0YS5kbygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEsICdPdmVybG9hZGVkJywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5vdmVybG9hZHMgPSBbXSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXHR9KTtcblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fCBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnTW9kaWZ5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5kZWx0YXMgPSB7fSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHQgKi9cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHQvL2lmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0Ly9cdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0Ly9cdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHQvL31cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gYW55IG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0W3BhdGgsIGFyZ10gPSBhcmdzO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCBhcmcpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogR2V0IHRoZSBkZWVwZXN0IGV4aXN0aW5nIE1vZGlmeSBkZWx0YSBjb3JyZXNwb25kaW5nIHRvIGEgcmVsYXRpdmUgcGF0aC5cblx0XHQgKiBAcGFyYW0gcGF0aCB7UGF0aH0gLSBhIHBhdGggcmVsYXRpdmUgdG8gdGhpcyBkZWx0YVxuXHRcdCAqIEByZXR1cm4ge3sgZGVsdGE6IERlbHRhSnMjRGVsdGEuTW9kaWZ5LCByZXN0OiBQYXRoIH19IC0gdGhlIGRlZXBlc3QgTW9kaWZ5IGRlbHRhIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhdGgsXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIHVudXNlZCByZXN0IG9mIHRoZSBwYXRoXG5cdFx0ICovXG5cdFx0ZGVlcGVzdE1vZGlmeURlbHRhQnlQYXRoKHBhdGgpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHBhdGgucHJvcCkgfHwgdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS50eXBlICE9PSAnTW9kaWZ5Jykge1xuXHRcdFx0XHRyZXR1cm4geyBkZWx0YTogdGhpcywgcmVzdDogcGF0aCB9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uZGVlcGVzdE1vZGlmeURlbHRhQnlQYXRoKHBhdGgucmVzdCB8fCBuZXcgUGF0aCgpKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbih7IG1ldGhvZDogJ21vZGlmeScgfSwgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0Ll9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5vcHRpb25zLnRhcmdldFByb3AgPSBwYXRoLnByb3A7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdHJldHVybiAodGhpcy5kZWx0YXNbcGF0aC5wcm9wXSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkID0gdHJ1ZTtcblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIG5vLW9wIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgTm9PcCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0W1xuXHRcdFsnQWRkJywgICAgICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XS5mb3JFYWNoKChbVHlwZSwgdHlwZSwgcHJlXSkgPT4ge1xuXHRcdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZyA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLm1hcChkID0+IGQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTsgLy8gZG9uJ3QgY2xvbmUsIGFzIHRoYXQgd291bGQgYnJlYWsgYW55IGZhY2FkZXNcblx0XHRcdFx0aWYgKHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKChkMSwgZDIpID0+IGRlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdCAgICAucHJlY29uZGl0aW9uKHd0KHJlc3VsdCwgJ2FyZycpKSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gZGVsdGFKcy5jb21wb3NlZChyZXN1bHQuZGVsdGFzW3Byb3BdLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLm9wdGlvbnMubWV0aG9kID8gW3sgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLCB2YWx1ZTogdGhpcy5hcmcgfV0gOiBbXTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvQXJyYXknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24pKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubWV0aG9kKSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0ICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLFxuXHQgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdcbiAgICAgICAgICAgICAgIH1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdCAgICAgICAoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4uL0Vycm9yLmpzJztcblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdHZhciBEZWx0YU1vZGVsID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gb3B0aW9uczEge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgbmFtZWAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9uczIge29iamVjdD99IC0gYW55IChvcHRpb25hbCkgb3B0aW9uczsgdGhlcmUgbWF5IGJlIGFueSBudW1iZXIgb2YgdGhlc2UgYmVmb3JlIHRoZSBgcGF0aGAgYXJndW1lbnRcblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24ob3B0aW9uczEsIG5hbWUsIG9wdGlvbnMyLCBwYXRoLCBhcmcpIHtcblx0XHRcdHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdFx0dmFyIGFsbE9wdGlvbnMgPSB7fTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdG5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0XHR3aGlsZSAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFUuZXh0ZW5kKGFsbE9wdGlvbnMsIGFyZ3Muc2hpZnQoKSk7XG5cdFx0XHR9XG5cdFx0XHRbcGF0aCwgYXJnXSA9IGFyZ3M7XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9uZXdEZWx0YUJ5TWV0aG9kKGFsbE9wdGlvbnMsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIGFsbE9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5ncmFwaC52ZXJ0ZXhDb3VudCgpID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRkZWx0YXMgKz0gYFske25hbWV9XSAke2RlbHRhLnRvU3RyaW5nKG9wdGlvbnMpfVxcbmA7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXG5cdFx0XHR2YXIgZGVsdGFCYXNlO1xuXG5cdFx0XHQvKiBjaGVjayBpZiBhIGRlbHRhIHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzICovXG5cdFx0XHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG5cblxuXG5cdFx0XHRpZiAoVS5pc0RlZmluZWQoZXhpc3RpbmdEZWx0YSkgJiYgZXhpc3RpbmdEZWx0YS50eXBlID09PSAnTW9kaWZ5JyAmJiBVLmlzRGVmaW5lZChwYXRoLnJlc3QpKSB7XG5cdFx0XHRcdHJldHVybiBleGlzdGluZ0RlbHRhLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpO1xuXHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBkZWx0YSB3aXRoIHRoaXMgbmFtZSwgY29tcG9zZSB0aGVtIGFuZCByZXR1cm4gYGRlbHRhYCBlYXJseSAqL1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKGV4aXN0aW5nRGVsdGEpKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IGV4aXN0aW5nRGVsdGEuY29tcG9zZWRXaXRoKGRlbHRhQmFzZSk7XG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuXHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBleGlzdGluZ0RlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnNldFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdFx0ZGVsdGFCYXNlLm5hbWUgPSBuYW1lO1xuXHRcdFx0XHR0aGlzLmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXG5cdFx0XHRcdC8qIGNvbm5lY3QgaXQgdG8gdGhlIHBhcnRpYWwgb3JkZXIgKi9cblx0XHRcdFx0KG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10pLmNvbmNhdChvcHRpb25zWydhZnRlciddIHx8IFtdKS5jb25jYXQob3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlKSB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5pZihvcHRpb25zWydyZXNvbHZlcyddKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGV4dHJhY3QgJ3NlbGVjdHMnIGZyb20gY29tcG91bmQgb3B0aW9ucyAqL1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVxdWlyZXMnXSkpIHtcblx0XHRcdFx0XHRkZWx0YUZlYXR1cmUuc2VsZWN0cyhvcHRpb25zWydyZXF1aXJlcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblxuXHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdH0pO1xuXG5cdH0sIHtcblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHQgKi9cblx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0dGhpcy5fZGVsdGFNb2RlbC5hcHBseVRvKHJ0KHJvb3QpLCB7XG5cdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgYWRkcyBhIG5ldyBvcGVyYXRpb24gdG8gaXQuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5vcGVyYXRpb24uYXBwbHkodGhpcy5fZGVsdGFNb2RlbCwgYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgZmFjYWRlIHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5kby5hcHBseSh0aGlzLl9kZWx0YU1vZGVsLFxuXHRcdFx0XHRcdFt7IGZlYXR1cmU6IHRydWUgfV0gLy8gZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCwgZGVsdGFzIGFyZSBmZWF0dXJlcyBieSBkZWZhdWx0XG5cdFx0XHRcdFx0XHRcdC5jb25jYXQoYXJncykpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0cmV0dXJuIFUuaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5hcHBseSh0aGlzLCBmZWF0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=