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
	  deltaJs.Delta = U.newClass(function Delta(arg) {
	    var options = arguments[1] !== (void 0) ? arguments[1] : {};
	    this.arg = arg;
	    this.uuid = deltaJs._nextDeltaUUID++;
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
	        str += (" (" + this.options.uuid + ")");
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
	    if (cls === deltaJs.Delta.Composite) {
	      return;
	    }
	    (cls.options.methods || []).forEach((function(method) {
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
	      deltaBase.options.name = name;
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
	        case 'selects':
	          {
	            _addSelects(this.name, value);
	          }
	          break;
	        case 'iff':
	          {
	            this.if(value);
	            this.onlyIf(value);
	          }
	          break;
	        case 'requires':
	          {
	            this.selects(value);
	            this.onlyIf(value);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxZTM1ZmFiNmY0NTYzNmU0MDUyMCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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VCxFQUFDLEtBQUksQ0RBTyxLQ0FZLENBQUM7RUpBeUIsQ0FBQzs7R3lCQzVDLElwQkRQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7QUNEMUcsY0FBUyxJbUJJRSxTQUFDLE9BQU07QUFFckIsTUFBSSxPQUFNLGtDQUFrQyxDQUFHO0FBQUUsV0FBSztHQUFFO0FBQ3hELFNBQU0sa0NBQWtDLEVBQUksS0FBRyxDQUFDO0FBSWhELFVBQVEsQ0FBQyxPQUFNLE1BQU0sVUFBVSxDQUFHO0FBRWpDLE9BQUkscUJBQW1CLEVBQUk7QUFBRSxZQUFPLEtBQUcsc0JBQXNCO0tBQUU7QUFDL0QsT0FBSSxxQkFBbUIsQ0FBRSxFQUFDLENBQUc7QUFBRSxVQUFHLHNCQUFzQixFQUFJLEdBQUM7S0FBRTtBQUUvRCxPQUFJLFNBQU8sRUFBSTtBQUNkLFlBQU8sY0FBYSxDQUFDLElBQUcscUJBQXFCLENBQUMsR0FBSyxLQUFHLHFCQUFxQixTQUFTLENBQUM7S0FDdEY7QUFBQSxHQUVELENBQUMsQ0FBQztBQUlGLE1BQUksV0FBVyxDQUFDLE9BQU0sWUFBWSxrQ0FBa0MsQ0FBQyxDQUFHO0FBQUUsV0FBSztHQUFFO0FBQ2pGLFNBQU0sWUFBWSxrQ0FBa0MsRUFBSSxLQUFHLENBQUM7QUFJNUQsVUFBUSxDQUFDLE9BQU0sWUFBWSxVQUFVLENBQUcsRUFFdkMsTUFBSyxDQUFMLFVBQU8sUUFBTzs7QUFDYixjQUFPLFFBQVMsRUFBQyxTQUFDLE9BQU0sQ0FBTTtBQUM3QixxQkFBWSxDQUFFLE9BQU0sQ0FBQyxPQUFRLEVBQUMsQ0FBQztPQUNoQyxFQUFDLENBQUM7S0FDSCxDQUVELENBQUMsQ0FBQztBQUlILEVuQnpDaUM7QW1CMENqQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxZTM1ZmFiNmY0NTYzNmU0MDUyMFxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcblx0XHRDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgQ29uc3RyYWludEZhaWx1cmUgfSk7XG5cblxuLyogZXhwb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5leHBvcnQgZGVmYXVsdCBEZWx0YUpzO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzdcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzVcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzJcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzZcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJ2YXIgVSA9IHtcblxuXHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqMTtcblx0fSxcblxuXHRkZWZhdWx0KG9iamVjdCwgLi4ucmVzdCkge1xuXHRcdHZhciBrZXlzID0gcmVzdC5zbGljZSgwLCAtMSk7XG5cdFx0dmFyIGRlZiA9IHJlc3RbcmVzdC5sZW5ndGgtMV07XG5cdFx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBvYmplY3QgfVxuXHRcdHZhciBsYXN0ID0gVS5vLmFwcGx5KG51bGwsIFtvYmplY3RdLmNvbmNhdChrZXlzLnNsaWNlKDAsIC0xKSkpO1xuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV0pKSB7XG5cdFx0XHRsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dID0gZGVmO1xuXHRcdH1cblx0XHRyZXR1cm4gbGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXTtcblx0fSxcblxuXHRvKG9iamVjdCwgLi4ua2V5cykge1xuXHRcdHJldHVybiBVLmRlZmF1bHQuYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMpLmNvbmNhdChbIHt9IF0pKTtcblx0fSxcblxuXHRhKG9iamVjdCwgLi4ua2V5cykge1xuXHRcdHJldHVybiBVLmRlZmF1bHQuYXBwbHkobnVsbCwgW29iamVjdF0uY29uY2F0KGtleXMpLmNvbmNhdChbIFtdIF0pKTtcblx0fSxcblxuXHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHR2YXIgbmV3X29iaiA9IE9iamVjdC5jcmVhdGUoQ29uc3RydWN0b3JGbi5wcm90b3R5cGUpO1xuXHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0cmV0dXJuIG5ld19vYmo7XG5cdH0sXG5cblx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHR9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRpbmRlbnQoc3RyLCBhbW91bnQsIGNoYXIgPSAnICcpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOVxuICoqLyIsIi8qIGltcG9ydCBleHRlcm5hbCBsaWJyYXJpZXMgKi9cbmltcG9ydCBKc0dyYXBoIGZyb20gJ2pzLWdyYXBoJztcblxuXG4vKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9EZWx0YS5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Db21wb3NpdGUuanMnO1xuaW1wb3J0IGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyc7XG5pbXBvcnQgZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9Nb2RpZnkuanMnO1xuaW1wb3J0IGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvQXJyYXkgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5pbXBvcnQgZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgIGZyb20gJy4vZmVhdHVyZXMuanMnO1xuaW1wb3J0IGRlZmluZVZhcmlhdGlvblBvaW50cyAgICAgICBmcm9tICcuL3ZhcmlhdGlvblBvaW50cy5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4vYXBwbGljYXRpb25Db25kaXRpb25zLmpzJztcblxuXG4vKioge0BwdWJsaWN9e0BjbGFzcyBEZWx0YUpzfVxuICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHMuXG4gKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0dGhpcy5fY29tcG9zaXRpb25zID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHR0aGlzLl9vdmVybG9hZHMgPSB7fTsgLy8gbWV0aG9kIC0+IFtkZWx0YS1jbGFzc2VzXVxuXHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXHRkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVNb2RpZnkgICAgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24gICAgICAodGhpcyk7XG5cdGRlZmluZURlbHRhTW9kZWwgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lRmVhdHVyZXMgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAodGhpcyk7XG5cdGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyh0aGlzKTtcblxufSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyB7XG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdCAqL1xuXHRfZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCkge1xuXHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAge3N0cmluZ31cblx0ICogQHBhcmFtIHByb3RvdHlwZSB7b2JqZWN0fVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGUpIHtcblx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0YERlbHRhIG9wZXJhdGlvbnMgbXVzdCBoYXZlIGEgbmFtZSBzdGFydGluZyB3aXRoIGEgY2FwaXRhbCBsZXR0ZXIgLS0gJyR7bmFtZX0nIGRvZXMgbm90LmApO1xuXHRcdFUuYXNzZXJ0KCF0aGlzLkRlbHRhW25hbWVdLFxuXHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSB0aGlzLkRlbHRhW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBvcHRpb25zKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIHByb3BlcnR5IG9uIHRoZSB0YXJnZXQgb2JqZWN0PyAqL1xuXHRcdFx0XHRpZiAob3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgJiYgIHRoaXMub3B0aW9ucy50YXJnZXRQcm9wICYmXG5cdFx0XHRcdFx0b3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgIT09IHRoaXMub3B0aW9ucy50YXJnZXRQcm9wKSB7IHJldHVybiB9XG5cblx0XHRcdFx0Lyogc2hvdWxkIHRoaXMgZGVsdGEgb25seSBiZSBhcHBsaWVkIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgc2VsZWN0aW9uPyAqL1xuXHRcdFx0XHRpZiAoIXRoaXMuc2VsZWN0ZWQpIHsgcmV0dXJuIH1cblxuXHRcdFx0XHQvKiBkb2VzIHRoZSB0YXJnZXQgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uIG9mIHRoZSBkZWx0YT8gKi9cblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKHRoaXMsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cblx0XHRcdFx0LyogT0ssIHRoZW4gYXBwbHkgaXQgaWYgYSBtZXRob2QgdG8gZG8gc28gd2FzIGluY2x1ZGVkIGluIHRoZSBvcGVyYXRpb24gKi9cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3RvdHlwZS5hcHBseVRvKSkge1xuXHRcdFx0XHRcdHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0LCAoXG5cdFx0XHRcdFx0XHRcdCEhdGhpcy5vcHRpb25zLnRhcmdldFByb3AgP1xuXHRcdFx0XHRcdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkgOlxuXHRcdFx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdFx0KSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHRjbHMudHlwZSA9IGNscy5wcm90b3R5cGUudHlwZSA9IG5hbWU7XG5cdFx0Y2xzLm9wdGlvbnMgPSBjbHMucHJvdG90eXBlLm9wdGlvbnMgPSB7IC8vIFRPRE86IGRvbid0IHB1dCB0aGlzIGluIHByb3RvdHlwZSBhbnltb3JlXG5cdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0bWV0aG9kczogcHJvdG90eXBlLm1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdXG5cdFx0fTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGNscy5vcHRpb25zLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7IFUuYSh0aGlzLl9vdmVybG9hZHMsIG1ldGhvZCkucHVzaChuYW1lKSB9KTtcblxuXHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oY2xzKSB9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGZuIHsoRnVuY3Rpb24pID0+IHVuZGVmaW5lZH0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdWJjbGFzcyBvZiBgRGVsdGFKcyNEZWx0YWBcblx0ICovXG5cdG9uTmV3T3BlcmF0aW9uVHlwZShmbikge1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5wdXNoKGZuKTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLkRlbHRhKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRpZiAobmFtZVswXSA9PT0gbmFtZVswXS50b1VwcGVyQ2FzZSgpKSB7XG5cdFx0XHRcdGZuKHRoaXMuRGVsdGFbbmFtZV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0ICovXG5cdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdHRoaXMuX2NvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkMSB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZmlyc3QgZGVsdGFcblx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0ICovXG5cdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdC8qIGhhbmRsZSB0aGUgY2FzZXMgd2hlcmUgb25lIG9yIGJvdGggYXJndW1lbnRzIGFyZSB1bmRlZmluZWQgKi9cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMSkpIHsgZDEgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLkRlbHRhLk5vT3AoKSB9XG5cblx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHR2YXIgc3VjY2VzcyA9IHRoaXMuX2NvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdHJldHVybiBjb21wb3NlRm4oZDEsIGQyKTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9Jy5gO1xuXHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm5hbWUgPSAnTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlc2UgZGVsdGFzIG9mIHR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ05vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm5hbWUgPSAnRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb21wb3NpdGlvbkVycm9yJztcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmA7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ICAgICAgICAgICAgICAgZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG59KTtcblxuZXhwb3J0IHZhciBDb25zdHJhaW50RmFpbHVyZSA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb25zdHJhaW50RmFpbHVyZShmZWF0dXJlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzKTtcblx0dGhpcy5uYW1lID0gJ0NvbnN0cmFpbnRGYWlsdXJlJztcblx0dGhpcy5tZXNzYWdlID0gYFRoZSBmZWF0dXJlICcke2ZlYXR1cmUubmFtZX0nIGlzIGJvdGggc2VsZWN0ZWQgYW5kIGV4Y2x1ZGVkIGJ5IGl0cyBjb25zdHJhaW50cy5gO1xuXHR0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCB3dH0gICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQXBwbGljYXRpb25Db25kaXRpb25zIGZyb20gJy4uL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEpKSB7IHJldHVybiB9XG5cblx0ZGVsdGFKcy5fbmV4dERlbHRhVVVJRCA9IDA7XG5cblx0LyoqIHtAY2xhc3MgRGVsdGF9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YShhcmcsIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuYXJnICA9IGFyZztcblx0XHR0aGlzLnV1aWQgPSBkZWx0YUpzLl9uZXh0RGVsdGFVVUlEKys7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5vcHRpb25zKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCkgIHsgc3RyICs9IGAg4oC5JHt0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcH3igLpgICAgIH1cblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLm9wdGlvbnMudXVpZH0pYCAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gYXJnICAgIHsqfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2dldERlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLl9vdmVybG9hZHNbbWV0aG9kXVxuXHRcdFx0XHRcdC5tYXAodHlwZSA9PiBuZXcgdGhpcy5EZWx0YVt0eXBlXShhcmcsIHsgbWV0aG9kIH0pKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5EZWx0YS5PdmVybG9hZGVkKGFyZywgeyBtZXRob2QgfSk7XG5cdFx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdFx0cmV0dXJuIGRlbHRhO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0LyoqIHtAY2xhc3N9XG5cdCAqXG5cdCAqL1xuXHRkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSA9IFUubmV3U3ViY2xhc3MoZGVsdGFKcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0ZSguLi5hcmdzKSB7XG5cdFx0c3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdCAqIEltcGxlbWVudCB0aGlzIG1ldGhvZCBpbiBzdWJjbGFzc2VzIHRvIHByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgRGVsdGEuQ29tcG9zaXRlIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ29wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRnZXQgZmFjYWRlKCkge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhLmZhY2FkZTtcblx0XHRcdFx0cmVzdWx0Ll9hcmdzID0gZmNkLl9hcmdzLmNvbmNhdChhcmdzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH07XG5cdFx0XHRmY2QuX2FyZ3MgPSBbXTtcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLm9wZXJhdGlvbi5hcHBseSh0aGlzRGVsdGEsIFttZXRob2RdLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH0sXG5cdH0pO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRpZiAoY2xzID09PSBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgeyByZXR1cm4gfVxuXHRcdChjbHMub3B0aW9ucy5tZXRob2RzIHx8IFtdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSkpIHtcblx0XHRcdFx0b3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgbmV3RGVsdGEgPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZC5hcHBseSh0aGlzLCBbbWV0aG9kXS5jb25jYXQoYXJncykpO1xuXHRcdFx0XHRcdHJldHVybiAobmV3RGVsdGEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSA/IG5ld0RlbHRhIDogdGhpcy5kZWx0YSkuZmFjYWRlO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdC8vICogQHBhcmFtIGRlbHRhIHtDb21wb3NpdGV9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHQvLyAqIEByZXR1cm4ge0NvbXBvc2l0ZX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0Ly8gKi9cblx0Ly9kZWx0YUpzLmZhY2FkZSA9IGZ1bmN0aW9uIGZhY2FkZShkZWx0YSkge1xuXHQvL1x0LyogdGhlIGZhY2FkZSBpdHNlbGYgKi9cblx0Ly9cdC8vIFRoZSBmYWNhZGUgb2JqZWN0IGV4cG9zZXMgb3BlcmF0aW9ucyBtZXRob2RzIGRpcmVjdGx5LCBidXQgYXJndW1lbnRzIHRvXG5cdC8vXHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHQvL1x0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHQvL1x0dmFyIGZjZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdC8vXHRcdHZhciByZXN1bHQgPSBmYWNhZGUoZGVsdGEpO1xuXHQvL1x0XHRyZXN1bHQuX2FyZ3MgPSBmY2QuX2FyZ3MuY29uY2F0KGFyZ3MpO1xuXHQvL1x0XHRyZXR1cm4gcmVzdWx0O1xuXHQvL1x0fTtcblx0Ly9cdGZjZC5fYXJncyA9IFtdO1xuXHQvL1x0VS5leHRlbmQoZmNkLCBvcGVyYXRpb25NZXRob2RzLCB7XG5cdC8vXHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHQvL1x0XHRcdHJldHVybiBkZWx0YS5vcGVyYXRpb24uYXBwbHkoZGVsdGEsIFttZXRob2RdLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0Ly9cdFx0fSxcblx0Ly9cdFx0ZGVsdGFcblx0Ly9cdH0pO1xuXHQvL1x0cmV0dXJuIGZjZDtcblx0Ly99O1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEsICdPdmVybG9hZGVkJywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5vdmVybG9hZHMgPSBbXSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuT3ZlcmxvYWRlZH0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm9wdGlvbnMpOyAvLyBzdXBlcigpXG5cdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXHR9KTtcblxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCB8fCBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9PdmVybG9hZGVkLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCB7d3R9ICAgICAgICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk1vZGlmeSkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVDb21wb3NpdGUoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnTW9kaWZ5Jywge1xuXHRcdGNvbnN0cnVjdCgpIHsgdGhpcy5kZWx0YXMgPSB7fSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGEuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHQgKi9cblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgfSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0ICB7RGVsdGEuV3JpdGFibGVUYXJnZXR9IC0gdGhlIHRhcmdldCB0byB3aGljaCB0byBhcHBseSB0aGlzIGRlbHRhXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99ICAgICAgICAgICAgICAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKi9cblx0XHRhcHBseVRvKHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHQvL2lmICghb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgfHwgb3B0aW9ucy5yZXN0cmljdFRvUHJvcGVydHkgPT09IHByb3ApIHtcblx0XHRcdFx0Ly9cdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSxcblx0XHRcdFx0Ly9cdFx0XHRVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyByZXN0cmljdFRvUHJvcGVydHk6IG51bGwgfSkpO1xuXHRcdFx0XHQvL31cblx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLCBvcHRpb25zKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEBwYXJhbSBtZXRob2Qge3N0cmluZ30gICAtIHRoZSB0eXBlIG9mIG9wZXJhdGlvbiAoZS5nLiwgJ2FkZCcsICdyZW1vdmUnLCBldGMuKVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9ICAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG1ldGhvZCwgb3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7IFtvcHRpb25zLCBwYXRoLCBhcmddID0gW3t9LCBvcHRpb25zLCBwYXRoXSB9XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBwYXRoICAgIHtzdHJpbmd9XG5cdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0ICovXG5cdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRpZiAocGF0aC5yZXN0KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbignbW9kaWZ5JywgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0Ll9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aC5yZXN0LCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdID0gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0uY29tcG9zZWRXaXRoKGRlbHRhKSA6IGRlbHRhO1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5vcHRpb25zLnRhcmdldFByb3AgPSBwYXRoLnByb3A7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdHJldHVybiAodGhpcy5kZWx0YXNbcGF0aC5wcm9wXSBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkID0gdHJ1ZTtcblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIG5vLW9wIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgTm9PcCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0W1xuXHRcdFsnQWRkJywgICAgICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XS5mb3JFYWNoKChbVHlwZSwgdHlwZSwgcHJlXSkgPT4ge1xuXHRcdC8vIEluIHRoZSBsaW5lIGRpcmVjdGx5IGJlbG93LCAndGhpcycgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiB0cmFjZXVyOlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZyA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLm1hcChkID0+IGQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0aWYgKHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKChkMSwgZDIpID0+IGRlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdCAgICAucHJlY29uZGl0aW9uKHd0KHJlc3VsdCwgJ2FyZycpKSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0fSk7XG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdGb3JiaWQnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnTW9kaWZ5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0T2JqZWN0LmtleXMoZDIuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gZGVsdGFKcy5jb21wb3NlZChyZXN1bHQuZGVsdGFzW3Byb3BdLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXQsIFJlYWRhYmxlVGFyZ2V0LCBydCwgd3R9IGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQge0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcn0gICAgICAgICAgICAgICBmcm9tICcuLi9FcnJvci5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zICAgICAgICAgICAgICAgICAgICBmcm9tICcuL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyhkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0ZnVuY3Rpb24gdCh0eXBlMSwgdHlwZTIpIHsgcmV0dXJuIChkMSwgZDIpID0+IChkMS50eXBlID09PSB0eXBlMSAmJiBkMi50eXBlID09PSB0eXBlMikgfVxuXHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdHJldHVybiAoZDEsIGQyKSA9PiBuZXcgZGVsdGFKcy5EZWx0YVt0eXBlXShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHR9XG5cblx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy52YWx1ZXMgPSB0aGlzLm9wdGlvbnMubWV0aG9kID8gW3sgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLCB2YWx1ZTogdGhpcy5hcmcgfV0gOiBbXTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvQXJyYXknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuUHV0SW50b0FycmF5KCk7XG5cdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0fSAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24pKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubWV0aG9kKSB7XG5cdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0ICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm9wdGlvbnMubWV0aG9kLFxuXHQgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5hcmdcbiAgICAgICAgICAgICAgIH1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdCAgICAgICAoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvRnVuY3Rpb24oKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzXG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5EZWx0YU1vZGVsKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHR2YXIgRGVsdGFNb2RlbCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0dGhpcy5ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0fSxcblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmVhY2hWZXJ0ZXgoKGlkLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfSAgIC0gdGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChlLmcuLCAnYWRkJywgJ3JlbW92ZScsIGV0Yy4pXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9ICAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG1ldGhvZCwgbmFtZSwgb3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7IFtvcHRpb25zLCBwYXRoLCBhcmddID0gW3t9LCBvcHRpb25zLCBwYXRoXSB9XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHR2YXIge2FmdGVyLCBmZWF0dXJlfSA9IG9wdGlvbnM7XG5cblx0XHRcdHZhciBkZWx0YUJhc2UgPSBkZWx0YTtcblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRpZiAocGF0aC5wcm9wKSB7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyBkZWx0YUpzLkRlbHRhLk1vZGlmeSgpO1xuXHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGEgZGVsdGEgYnkgdGhpcyBuYW1lIGNhbm5vdCBhbHJlYWR5IGJlIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0VS5hc3NlcnQoIXRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSksXG5cdFx0XHRcdFx0YEEgZGVsdGEgYnkgdGhlIG5hbWUg4oCcJHtuYW1lfeKAnSBpcyBhbHJlYWR5IGluIHRoaXMgZGVsdGEgbW9kZWwuYCk7XG5cblx0XHRcdC8qIGFkZCB0aGUgbmV3IGRlbHRhIHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0ZGVsdGFCYXNlLm9wdGlvbnMubmFtZSA9IG5hbWU7IC8vIFRPRE86IHB1dCBkaXJlY3RseSBvbiB0aGUgZGVsdGFcblx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdC8qIGNvbm5lY3QgaXQgdG8gdGhlIHBhcnRpYWwgb3JkZXIgKi9cblx0XHRcdChhZnRlciB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNoZWNrIGlmIHRoZXJlIHNob3VsZCBiZSBhbiBlcG9ueW1vdXMsIGxpbmtlZCBmZWF0dXJlICovXG5cdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0aWYgKGZlYXR1cmUpIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCAgbmFtZSAgICAgICAgICAgLCBvcHRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIH1cblx0XHRcdGVsc2UgICAgICAgICB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggYGRlbHRhX18ke25hbWV9YCwgVS5leHRlbmQoeyBoaWRkZW46IHRydWUgfSwgb3B0aW9ucykgKSB9XG5cdFx0XHRpZiAoZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0ZGVsdGFCYXNlLmFwcGxpY2F0aW9uQ29uZGl0aW9uID0gZGVsdGFGZWF0dXJlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdC8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcbmltcG9ydCB7Q29uc3RyYWludEZhaWx1cmV9IGZyb20gJy4vRXJyb3IuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fZmVhdHVyZXNJbXBsZW1lbnRlZCkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHQvKiBnaXZlbiBhICd1c2VyIGlucHV0JyBjbGF1c2UsIG5vcm1hbGl6ZSBpdCAqL1xuXHRmdW5jdGlvbiBfbm9ybWFsaXplQ2xhdXNlKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBBcnJheS5pc0FycmF5KGlucHV0KSA/IGlucHV0IDogW2lucHV0XTtcblx0XHRpbnB1dCA9IGlucHV0Lm1hcChjb25qID0+IGNvbmogaW5zdGFuY2VvZiBkZWx0YUpzLkZlYXR1cmUgPyBjb25qLm5hbWUgOiBjb25qKTtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qIGNvZGUgZm9yIGNvbnN0cmFpbnRzIGJldHdlZW4gZmVhdHVyZXMgKGVuZm9yY2VkIGJ5IGVycm9ycykgKi9cblx0dmFyIF9vbmx5SWYgPSB7fTsgLy8gZmVhdHVyZSAtPiAoYXJyYXlzIG9mIGFycmF5czsgY29uanVuY3RpdmUgbm9ybWFsIGZvcm0pXG5cdHZhciBfYWxsb3dlZCA9IHt9OyAvLyBmZWF0dXJlIC0+IEJvb2xlYW5cblx0ZnVuY3Rpb24gX2FkZE9ubHlJZihmZWF0dXJlLCBjb25qdW5jdCA9IFtdKSB7XG5cdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdGlmIChjb25qdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdF9hbGxvd2VkW2ZlYXR1cmVdID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChjb25qdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHR9IGVsc2UgaWYgKF9vbmx5SWZbZmVhdHVyZV0gIT09IGZhbHNlKSB7XG5cdFx0XHRVLmEoX29ubHlJZiwgZmVhdHVyZSkucHVzaChfbm9ybWFsaXplQ2xhdXNlKGNvbmp1bmN0KSk7XG5cdFx0fVxuXHR9XG5cblx0LyogY29kZSBmb3Igc2V0dGxpbmcgcmVsYXRpb25zIGJldHdlZW4gZmVhdHVyZXMgKi9cblx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdGlmICghX2NvbmRpdGlvbnNVbnNldHRsZWQpIHsgcmV0dXJuIH1cblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0LyogZml4ZWQgcG9pbnQgY29tcHV0YXRpb24gb2Ygc2VsZWN0ZWQgZmVhdHVyZXMgKGkuZS4sIHByb3BhZ2F0ZSB0aGVtIHVudGlsIHRoZXJlIGlzIG5vIGNoYW5nZSkgKi9cblx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRkbyB7XG5cdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0XHRpZiAoIV9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBhcmUgJ2lmJyBkaXNqdW5jdHMgdGhhdCBhcmUgc2VsZWN0ZWQsIHRoaXMgZmVhdHVyZSBpcyBzZWxlY3RlZCAqL1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0pKSB7IF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSBmYWxzZSB9XG5cdFx0XHRcdFx0aWYgKChfaWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5zb21lKGRpc2ogPT4gZGlzai5ldmVyeShjb25qID0+IF9zZWxlY3RlZFtjb25qXSkpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZWN0ZWRbZmVhdHVyZU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cblx0XHQvKiBjb21wdXRhdGlvbiBvZiBhbGxvd2VkIGZlYXR1cmVzICovXG5cdFx0T2JqZWN0LmtleXMoZGVsdGFKcy5mZWF0dXJlcykuZm9yRWFjaCgoZmVhdHVyZU5hbWUpID0+IHtcblx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnb25seUlmJyBjb25qdW5jdHMgdGhhdCBhcmUgZXhjbHVkZWQsIHRoaXMgZmVhdHVyZSBpcyBleGNsdWRlZCAqL1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZU5hbWVdID0gKF9vbmx5SWZbZmVhdHVyZU5hbWVdIHx8IFtdKS5ldmVyeShjb25qID0+IGNvbmouc29tZShkaXNqID0+IF9zZWxlY3RlZFtkaXNqXSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKcyNGZWF0dXJlfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5GZWF0dXJlID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBGZWF0dXJlKG5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0Lyogc2V0IGJhc2ljIGZpZWxkcyAqL1xuXHRcdHRoaXMubmFtZSA9IG5hbWU7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuXHRcdC8qIHVwZGF0ZSBjb25kaXRpb25zICovXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0XHR0aGlzLmFkZE9wdGlvbihvcHRpb24sIG9wdGlvbnNbb3B0aW9uXSk7XG5cdFx0fSk7XG5cblx0fSwge1xuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRpZiAoX3NlbGVjdGVkW3RoaXMubmFtZV0gJiYgIV9hbGxvd2VkW3RoaXMubmFtZV0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IENvbnN0cmFpbnRGYWlsdXJlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9zZWxlY3RlZFt0aGlzLm5hbWVdO1xuXHRcdH0sXG5cdFx0Z2V0IGNvbmRpdGlvbmFsKCkgeyByZXR1cm4gVS5hKF9pZiAgICAsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdGFkZE9wdGlvbihuYW1lLCB2YWx1ZSkge1xuXHRcdFx0c3dpdGNoIChuYW1lKSB7XG5cblx0XHRcdFx0Y2FzZSAnaWYnOiAgICAgICB7IF9hZGRJZiAgICAgKHRoaXMubmFtZSwgdmFsdWUpIH0gYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ29ubHlJZic6ICAgeyBfYWRkT25seUlmICh0aGlzLm5hbWUsIHZhbHVlKSB9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzZWxlY3RzJzogIHsgX2FkZFNlbGVjdHModGhpcy5uYW1lLCB2YWx1ZSkgfSBicmVhaztcblxuXHRcdFx0XHRjYXNlICdpZmYnOiAgICAgIHsgdGhpcy5pZiAgICAgKHZhbHVlKTsgdGhpcy5vbmx5SWYodmFsdWUpOyB9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyZXF1aXJlcyc6IHsgdGhpcy5zZWxlY3RzKHZhbHVlKTsgdGhpcy5vbmx5SWYodmFsdWUpOyB9IGJyZWFrO1xuXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpZiAgICAgIChkaXNqdW5jdCkgeyB0aGlzLmFkZE9wdGlvbignaWYnLCAgICAgICBkaXNqdW5jdCkgfSxcblx0XHRvbmx5SWYgIChjb25qdW5jdCkgeyB0aGlzLmFkZE9wdGlvbignb25seUlmJywgICBjb25qdW5jdCkgfSxcblx0XHRpZmYgICAgIChmZWF0dXJlcykgeyB0aGlzLmFkZE9wdGlvbignaWZmJywgICAgICBmZWF0dXJlcykgfSxcblx0XHRzZWxlY3RzIChmZWF0dXJlcykgeyB0aGlzLmFkZE9wdGlvbignc2VsZWN0cycsICBmZWF0dXJlcykgfSxcblx0XHRyZXF1aXJlcyhmZWF0dXJlcykgeyB0aGlzLmFkZE9wdGlvbigncmVxdWlyZXMnLCBmZWF0dXJlcykgfSxcblx0XHRzZWxlY3QoKSB7IHRoaXMuaWYodHJ1ZSkgfVxuXHR9KTtcblxuXHQvKiB0aGUgZmVhdHVyZXMgYmVsb25naW5nIHRvIHRoaXMgRGVsdGFKcyBpbnN0YW5jZSAqL1xuXHRkZWx0YUpzLmZlYXR1cmVzID0ge307IC8vIG5hbWUgLT4gRmVhdHVyZVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9mZWF0dXJlc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZlYXR1cmVzLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtydH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhTW9kZWwgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXG5cdGRlZmluZURlbHRhTW9kZWwoZGVsdGFKcyk7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblx0ZGVsdGFKcy5fZGVsdGFNb2RlbCA9IG5ldyBkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwoKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuY29uc3RydWN0b3IuX3ZhcmlhdGlvblBvaW50c0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFRoaXMgbWV0aG9kIGluZGljYXRlcyBhIHZhcmlhdGlvbiBwb2ludC5cblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAtIGEgaG9vayBieSB3aGljaCBvcGVyYXRpb25zIGZyb20gdGhlIGNvcmUgZGVsdGEgbW9kZWwgY2FuIGJlIGFwcGxpZWRcblx0XHQgKiBAcGFyYW0gdmFsICB7Kn0gICAgICAtIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50XG5cdFx0ICogQHJldHVybiB7Kn0gLSB0aGUgdmFsdWUgb2YgdGhpcyB2YXJpYXRpb24gcG9pbnQgYWZ0ZXIgYXBwbHlpbmcgdGhlIGFwcHJvcHJpYXRlIGRlbHRhc1xuXHRcdCAqL1xuXHRcdHZwKG5hbWUsIHZhbCkge1xuXHRcdFx0dmFyIHJvb3QgPSB7IFtuYW1lXTogdmFsIH07XG5cdFx0XHR0aGlzLl9kZWx0YU1vZGVsLmFwcGx5VG8ocnQocm9vdCksIHtcblx0XHRcdFx0cmVzdHJpY3RUb1Byb3BlcnR5OiBuYW1lXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByb290W25hbWVdO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQSB7RGVsdGFKc30gaW5zdGFuY2UgaGFzIG9uZSBmdW5kYW1lbnRhbCB7RGVsdGFKcyNEZWx0YU1vZGVsfSBpbnN0YW5jZSwgd2hpY2ggaXMgYXBwbGllZFxuXHRcdCAqIHRvIGFueSB2YXJpYXRpb24gcG9pbnRzIHRoYXQgYXJlIGVuY291bnRlcmVkLiBUaGlzIG1ldGhvZCBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogbWV0aG9kIG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCBhZGRzIGEgbmV3IG9wZXJhdGlvbiB0byBpdC5cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9ICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gIC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24obWV0aG9kLCBuYW1lLCBvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdHJldHVybiB0aGlzLl9kZWx0YU1vZGVsLm9wZXJhdGlvbihtZXRob2QsIG5hbWUsIG9wdGlvbnMsIHBhdGgsIGFyZyk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QHByb3BlcnR5fVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhbGlhcyB0byB0aGUgZXBvbnltb3VzXG5cdFx0ICogcHJvcGVydHkgb24gdGhhdCAncm9vdCcgZGVsdGEgbW9kZWwuIEl0IHJldHVybnMgdGhlIG9iamVjdCB0aGF0IGFsbG93cyBuZXcgZGVsdGEgb3BlcmF0aW9uc1xuXHRcdCAqIHRvIGJlIGFkZGVkIG1vcmUgZWFzaWx5LlxuXHRcdCAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdGdldCBmYWNhZGUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5mYWNhZGU7XG5cdFx0fSxcblxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YXJpYXRpb25Qb2ludHMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkID0gdHJ1ZTtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFUuZXh0ZW5kKGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLCB7XG5cblx0XHRnZXQgYXBwbGljYXRpb25Db25kaXRpb24oKSB7IHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiB9LFxuXHRcdHNldCBhcHBsaWNhdGlvbkNvbmRpdGlvbihhYykgeyB0aGlzLl9hcHBsaWNhdGlvbkNvbmRpdGlvbiA9IGFjIH0sXG5cblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gVS5pc1VuZGVmaW5lZCh0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uKSB8fCB0aGlzLmFwcGxpY2F0aW9uQ29uZGl0aW9uLnNlbGVjdGVkO1xuXHRcdH1cblxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdHNlbGVjdChmZWF0dXJlcykge1xuXHRcdFx0ZmVhdHVyZXMuZm9yRWFjaCgoZmVhdHVyZSkgPT4ge1xuXHRcdFx0XHR0aGlzLmZlYXR1cmVzW2ZlYXR1cmVdLnNlbGVjdCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9