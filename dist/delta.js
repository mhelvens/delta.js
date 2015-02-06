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
	    ApplicationOrderCycle = $__4.ApplicationOrderCycle;
	U.extend(DeltaJs, {
	  ApplicationError: ApplicationError,
	  MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError,
	  DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError,
	  MultipleOverloadsCompositionError: MultipleOverloadsCompositionError,
	  ConstraintFailure: ConstraintFailure,
	  ApplicationOrderCycle: ApplicationOrderCycle
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjOWVmODFkNTM3Mzg3NWEyM2MwMCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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c0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGM5ZWY4MWQ1MzczODc1YTIzYzAwXG4gKiovIiwiLyogaW1wb3J0IHV0aWxpdGllcyAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG4vKiBpbXBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmltcG9ydCBEZWx0YUpzIGZyb20gJy4vRGVsdGFKcy5qcyc7XG5cblxuLyogbWFrZSBUYXJnZXQgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQgfSk7XG5cblxuLyogbWFrZSBQYXRoIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IFBhdGggZnJvbSAnLi9QYXRoLmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUGF0aCB9KTtcblxuXG4vKiBtYWtlIEVycm9yIGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yLFxuXHRcdENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGV9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbnN0cmFpbnRGYWlsdXJlLCBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzdcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzVcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzJcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzZcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJ2YXIgVSA9IHtcblxuXHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqMTtcblx0fSxcblxuXHRkZWZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHRcdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdFx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdFx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHRcdHZhciBsYXN0ID0gVS5vLmFwcGx5KG51bGwsIFtvYmplY3RdLmNvbmNhdChrZXlzLnNsaWNlKDAsIC0xKSkpO1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHRcdH1cblx0XHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcblx0fSxcblxuXHRvKG9iamVjdCwgLi4ua2V5cykge1xuXHRcdHJldHVybiBVLmRlZmF1bHQuYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMpLmNvbmNhdChbIHt9IF0pKTtcblx0fSxcblxuXHRhKG9iamVjdCwgLi4ua2V5cykge1xuXHRcdHJldHVybiBVLmRlZmF1bHQuYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMpLmNvbmNhdChbIFtdIF0pKTtcblx0fSxcblxuXHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHR2YXIgbmV3X29iaiA9IE9iamVjdC5jcmVhdGUoQ29uc3RydWN0b3JGbi5wcm90b3R5cGUpO1xuXHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0cmV0dXJuIG5ld19vYmo7XG5cdH0sXG5cblx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHR9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOVxuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Db21wb3NpdGUuanMnO1xuaW1wb3J0IGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHMuXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0dGhpcy5fY29tcG9zaXRpb25zID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHR0aGlzLl9vdmVybG9hZHMgPSB7fTsgLy8gbWV0aG9kIC0+IFtkZWx0YS1jbGFzc2VzXVxuXHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXHRkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblxufSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyB7XG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdCAqL1xuXHRfZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCkge1xuXHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAge3N0cmluZ31cblx0ICogQHBhcmFtIHByb3RvdHlwZSB7b2JqZWN0fVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGUpIHtcblx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbnMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLS0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KCF0aGlzLkRlbHRhW25hbWVdLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSB0aGlzLkRlbHRhW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBvcHRpb25zKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIHByb3BlcnR5IG9uIHRoZSB0YXJnZXQgb2JqZWN0PyAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgJiYgIHRoaXMub3B0aW9ucy50YXJnZXRQcm9wICYmXG5cdFx0XHRcdFx0b3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgIT09IHRoaXMub3B0aW9ucy50YXJnZXRQcm9wKSB7IHJldHVybiB9XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgc2VsZWN0aW9uPyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuc2VsZWN0ZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBkb2VzIHRoZSB0YXJnZXQgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uIG9mIHRoZSBkZWx0YT8gKi9cblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKHRoaXMsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3RvdHlwZS5hcHBseVRvKSkge1xuXHRcdFx0XHRcdHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCAoXG5cdFx0XHRcdFx0XHRcdCEhdGhpcy5vcHRpb25zLnRhcmdldFByb3AgP1xuXHRcdFx0XHRcdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkgOlxuXHRcdFx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdFx0KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHRjbHMudHlwZSA9IGNscy5wcm90b3R5cGUudHlwZSA9IG5hbWU7XG5cdFx0Y2xzLm9wdGlvbnMgPSBjbHMucHJvdG90eXBlLm9wdGlvbnMgPSB7IC8vIFRPRE86IGRvbid0IHB1dCB0aGlzIGluIHByb3RvdHlwZSBhbnltb3JlXG5cdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0bWV0aG9kczogcHJvdG90eXBlLm1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdXG5cdFx0fTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGNscy5vcHRpb25zLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IFUuYSh0aGlzLl9vdmVybG9hZHMsIG1ldGhvZCkucHVzaChuYW1lKSB9KTtcblxuXHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oY2xzKSB9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGZuIHsoRnVuY3Rpb24pID0+IHVuZGVmaW5lZH0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdWJjbGFzcyBvZiBgRGVsdGFKcyNEZWx0YWBcblx0ICovXG5cdG9uTmV3T3BlcmF0aW9uVHlwZShmbikge1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5wdXNoKGZuKTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLkRlbHRhKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRpZiAobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpKSB7XG5cdFx0XHRcdGZuKHRoaXMuRGVsdGFbbmFtZV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0ICovXG5cdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdHRoaXMuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkMSB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZmlyc3QgZGVsdGFcblx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0ICovXG5cdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdC8qIGhhbmRsZSB0aGUgY2FzZXMgd2hlcmUgb25lIG9yIGJvdGggYXJndW1lbnRzIGFyZSB1bmRlZmluZWQgKi9cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMSkpIHsgZDEgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cblx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHR2YXIgc3VjY2VzcyA9IHRoaXMuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdHJldHVybiBjb21wb3NlRm4oZDEsIGQyKTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlc2UgZGVsdGFzIG9mIHR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBDb25zdHJhaW50RmFpbHVyZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb25zdHJhaW50RmFpbHVyZShmZWF0dXJlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25PcmRlckN5Y2xlID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uT3JkZXJDeWNsZShmcm9tLCB0bykge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbk9yZGVyQ3ljbGUnO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlIG5ldyBhcHBsaWNhdGlvbiBvcmRlciBiZXR3ZWVuICR7ZnJvbX0gYW5kICR7dG99IGNyZWF0ZWQgYSBjeWNsZS5gO1xuXHR0aGlzLmZyb20gPSBmcm9tO1xuXHR0aGlzLnRvICAgPSB0bztcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhKSkgeyByZXR1cm4gfVxuXG5cdGRlbHRhSnMuX25leHREZWx0YUlEID0gMDtcblxuXHQvKioge0BjbGFzcyBEZWx0YX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhKGFyZywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5hcmcgID0gYXJnO1xuXHRcdHRoaXMuaWQgPSBkZWx0YUpzLl9uZXh0RGVsdGFJRCsrO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH0sIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5vcHRpb25zKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCkgeyBzdHIgKz0gYCDigLkke3RoaXMub3B0aW9ucy50YXJnZXRQcm9wfeKAumAgfVxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgICB7IHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0fSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cblx0XHQgKiBAcGFyYW0gYXJnICAgICB7Kn1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9uZXdEZWx0YUJ5TWV0aG9kKG9wdGlvbnMsIGFyZykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IHRoaXMuX292ZXJsb2Fkc1tvcHRpb25zLm1ldGhvZF1cblx0XHRcdFx0XHQubWFwKHR5cGUgPT4gbmV3IHRoaXMuRGVsdGFbdHlwZV0oYXJnLCBvcHRpb25zKSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMuRGVsdGEuT3ZlcmxvYWRlZChhcmcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkZWx0YS5vdmVybG9hZHMgPSBuZXdEZWx0YXM7XG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8qKiB7QGNsYXNzfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUgPSBVLm5ld1N1YmNsYXNzKGRlbHRhSnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGUoLi4uYXJncykge1xuXHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJncyk7XG5cdH0sIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBJbXBsZW1lbnQgdGhpcyBtZXRob2QgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIERlbHRhLkNvbXBvc2l0ZSBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZG8oLi4uZmlyc3RBcmdzKSB7XG5cdFx0XHR2YXIgdGhpc0RlbHRhID0gdGhpcztcblx0XHRcdC8vIFRoZSBmYWNhZGUgb2JqZWN0IGV4cG9zZXMgb3BlcmF0aW9ucyBtZXRob2RzIGRpcmVjdGx5LCBidXQgYXJndW1lbnRzIHRvXG5cdFx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdFx0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHRcdFx0dmFyIGZjZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzRGVsdGEuZG8uYXBwbHkodGhpc0RlbHRhLCBmY2QuX2FyZ3MuY29uY2F0KGFyZ3MpKTtcblx0XHRcdH07XG5cdFx0XHRmY2QuX2FyZ3MgPSBmaXJzdEFyZ3M7XG5cdFx0XHRVLmV4dGVuZChmY2QsIG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdFx0X2FwcGx5T3BlcmF0aW9uTWV0aG9kKG1ldGhvZCwgLi4uZmluYWxBcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdG5ld0RlbHRhOiB0aGlzRGVsdGEub3BlcmF0aW9uLmFwcGx5KHRoaXNEZWx0YSwgW3ttZXRob2R9XS5jb25jYXQoZmNkLl9hcmdzKS5jb25jYXQoZmluYWxBcmdzKSksXG5cdFx0XHRcdFx0XHRmY2RBcmdzOiAgZmNkLl9hcmdzXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH0sXG5cdH0pO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRpZiAoY2xzID09PSBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgeyByZXR1cm4gfVxuXHRcdChjbHMub3B0aW9ucy5tZXRob2RzIHx8IFtdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSkpIHtcblx0XHRcdFx0b3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIge25ld0RlbHRhLCBmY2RBcmdzfSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kLmFwcGx5KHRoaXMsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRcdFx0aWYgKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdEZWx0YS5kbygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kZWx0YS5kby5hcHBseSh0aGlzLmRlbHRhLCBmY2RBcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEsICdPdmVybG9hZGVkJywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5vdmVybG9hZHMgPSBbXSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXHR9KTtcblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fCBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnTW9kaWZ5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5kZWx0YXMgPSB7fSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHQgKi9cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHQvL2lmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0Ly9cdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0Ly9cdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHQvL31cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IC0gYW55IG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0W3BhdGgsIGFyZ10gPSBhcmdzO1xuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fbmV3RGVsdGFCeU1ldGhvZChhbGxPcHRpb25zLCBhcmcpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihhbGxPcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhICdyZXN0JyB0byB0aGUgcGF0aCwgc2V0IGEgbGluayBpbiB0aGUgY2hhaW4gKi9cblx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKHsgbWV0aG9kOiAnbW9kaWZ5JyB9LCBwYXRoLnByb3ApXG5cdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdLm9wdGlvbnMudGFyZ2V0UHJvcCA9IHBhdGgucHJvcDtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQgPSB0cnVlO1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqKioqKiovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgbm8tb3AgdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBOb09wID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRbXG5cdFx0WydBZGQnLCAgICAgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFsnUmVwbGFjZScsICdyZXBsYWNlJywgKHRhcmdldCkgPT4gVS5pc0RlZmluZWQgICh0YXJnZXQudmFsdWUpXVxuXHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0Ly8gSW4gdGhlIGxpbmUgZGlyZWN0bHkgYmVsb3csICd0aGlzJyBjYW5ub3QgYmUgdXNlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRyYWNldXI6XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS90cmFjZXVyLWNvbXBpbGVyL2lzc3Vlcy8xNjMxXG5cdFx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdGNvbnN0cnVjdCgpICAgICAgICAgIHsgdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBwcmUodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0YXBwbHlUbyh0YXJnZXQpICAgICAgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKHYsIGQpID0+IGQuYXBwbGllZFRvKHYpLCB0aGlzLmFyZykgfSxcblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRpZiAocmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKGQxLCBkMikgPT4gZGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0ICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSBkZWx0YUpzLmNvbXBvc2VkKHJlc3VsdC5kZWx0YXNbcHJvcF0sIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMub3B0aW9ucy5tZXRob2QgPyBbeyBtZXRob2Q6IHRoaXMub3B0aW9ucy5tZXRob2QsIHZhbHVlOiB0aGlzLmFyZyB9XSA6IFtdO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9BcnJheScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbikpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5tZXRob2QpIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHQgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMub3B0aW9ucy5tZXRob2QsXG5cdCAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmFyZ1xuICAgICAgICAgICAgICAgfV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0ICAgICAgIChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbigpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5pbXBvcnQge0FwcGxpY2F0aW9uT3JkZXJDeWNsZX0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0dmFyIERlbHRhTW9kZWwgPSBkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdEZWx0YU1vZGVsJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIHN1YkRlbHRhKSA9PiB7XG5cdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0LCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMSB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBuYW1lYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBuYW1lIHtzdHJpbmd9ICAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zMiB7b2JqZWN0P30gLSBhbnkgKG9wdGlvbmFsKSBvcHRpb25zOyB0aGVyZSBtYXkgYmUgYW55IG51bWJlciBvZiB0aGVzZSBiZWZvcmUgdGhlIGBwYXRoYCBhcmd1bWVudFxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byBwZXJmb3JtIHRoaXMgb3BlcmF0aW9uIG9uXG5cdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihvcHRpb25zMSwgbmFtZSwgb3B0aW9uczIsIHBhdGgsIGFyZykge1xuXHRcdFx0dmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0XHR2YXIgYWxsT3B0aW9ucyA9IHt9O1xuXHRcdFx0d2hpbGUgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRVLmV4dGVuZChhbGxPcHRpb25zLCBhcmdzLnNoaWZ0KCkpO1xuXHRcdFx0fVxuXHRcdFx0bmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRcdHdoaWxlICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0VS5leHRlbmQoYWxsT3B0aW9ucywgYXJncy5zaGlmdCgpKTtcblx0XHRcdH1cblx0XHRcdFtwYXRoLCBhcmddID0gYXJncztcblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QoYWxsT3B0aW9ucywgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgYWxsT3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cblx0XHRcdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cblx0XHRcdHZhciBhbHJlYWR5RXhpc3RzID0gVS5pc0RlZmluZWQodGhpcy5ncmFwaC52ZXJ0ZXhWYWx1ZShuYW1lKSk7XG5cblx0XHRcdC8qIHN0YXJ0aW5nIHRvIGRlZmluZSB0aGUgZGVsdGEgdGhhdCBnb2VzIGRpcmVjdGx5IGluIHRoZSBncmFwaCAqL1xuXHRcdFx0dmFyIGRlbHRhQmFzZSA9IGRlbHRhO1xuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0ZGVsdGFCYXNlID0gbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCk7XG5cdFx0XHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRlbHRhIHdpdGggdGhpcyBuYW1lLCBjb21wb3NlIHRoZW0gYW5kIHJldHVybiBgZGVsdGFgIGVhcmx5ICovXG5cdFx0XHRpZiAoYWxyZWFkeUV4aXN0cykge1xuXHRcdFx0XHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IGV4aXN0aW5nRGVsdGEuY29tcG9zZWRXaXRoKGRlbHRhQmFzZSk7XG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuXHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBleGlzdGluZ0RlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnNldFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0LyogYWRkIHRoZSBuZXcgZGVsdGEgdG8gdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcblx0XHRcdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblxuXHRcdFx0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG5cdFx0XHRcdChvcHRpb25zWydjb21iaW5lcyddIHx8IFtdKS5jb25jYXQob3B0aW9uc1snYWZ0ZXInXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZ3JhcGguaGFzQ3ljbGUoKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5ncmFwaC5yZW1vdmVFeGlzdGluZ0VkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBBcHBsaWNhdGlvbk9yZGVyQ3ljbGUoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlKSB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydjb21iaW5lcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5pZihvcHRpb25zWydjb21iaW5lcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblxuXHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdH0pO1xuXG5cdH0sIHtcblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHQgKi9cblx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0dGhpcy5fZGVsdGFNb2RlbC5hcHBseVRvKHJ0KHJvb3QpLCB7XG5cdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgYWRkcyBhIG5ldyBvcGVyYXRpb24gdG8gaXQuXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMxIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYG5hbWVgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMyIHtvYmplY3Q/fSAtIGFueSAob3B0aW9uYWwpIG9wdGlvbnM7IHRoZXJlIG1heSBiZSBhbnkgbnVtYmVyIG9mIHRoZXNlIGJlZm9yZSB0aGUgYHBhdGhgIGFyZ3VtZW50XG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG9wdGlvbnMxLCBuYW1lLCBvcHRpb25zMiwgcGF0aCwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5vcGVyYXRpb24uYXBwbHkodGhpcy5fZGVsdGFNb2RlbCwgYXJndW1lbnRzKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgcmV0dXJucyB0aGUgZmFjYWRlIHRoYXQgYWxsb3dzIG5ldyBkZWx0YSBvcGVyYXRpb25zXG5cdFx0ICogdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuIEl0IHByZXNldHMgdGhlICdmZWF0dXJlJyBvcHRpb24gdG8gJ3RydWUnLCBidXQgdGhpcyBjYW4gYmVcblx0XHQgKiBvdmVyd3JpdHRlbiBtYW51YWxseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRkbyguLi5hcmdzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5kby5hcHBseSh0aGlzLl9kZWx0YU1vZGVsLFxuXHRcdFx0XHRcdFt7IGZlYXR1cmU6IHRydWUgfV0gLy8gZnJvbSB0aGUgY29yZSBkZWx0YSBtb2RlbCwgZGVsdGFzIGFyZSBmZWF0dXJlcyBieSBkZWZhdWx0XG5cdFx0XHRcdFx0XHRcdC5jb25jYXQoYXJncykpO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFyaWF0aW9uUG9pbnRzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLkRlbHRhLnByb3RvdHlwZSwge1xuXG5cdFx0Z2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKCkgeyByZXR1cm4gdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gfSxcblx0XHRzZXQgYXBwbGljYXRpb25Db25kaXRpb24oYWMpIHsgdGhpcy5fYXBwbGljYXRpb25Db25kaXRpb24gPSBhYyB9LFxuXG5cdFx0Z2V0IHNlbGVjdGVkKCkge1xuXHRcdFx0cmV0dXJuIFUuaXNVbmRlZmluZWQodGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbikgfHwgdGhpcy5hcHBsaWNhdGlvbkNvbmRpdGlvbi5zZWxlY3RlZDtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cblx0XHRzZWxlY3QoLi4uZmVhdHVyZXMpIHtcblx0XHRcdGZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZmVhdHVyZSkpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdC5hcHBseSh0aGlzLCBmZWF0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=