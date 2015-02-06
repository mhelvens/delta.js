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
	  U.extend(deltaJs.constructor.prototype, {_newDeltaByMethod: function(method, arg, options) {
	      var $__2 = this;
	      var newDeltas = this._overloads[method].map((function(type) {
	        return new $__2.Delta[type](arg, U.extend({method: method}, options));
	      }));
	      if (newDeltas.length === 1) {
	        return newDeltas[0];
	      } else {
	        var delta = new this.Delta.Overloaded(arg, U.extend({method: method}, options));
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
	    facade: function() {
	      for (var firstArgs = [],
	          $__3 = 0; $__3 < arguments.length; $__3++)
	        firstArgs[$__3] = arguments[$__3];
	      var thisDelta = this;
	      var fcd = function() {
	        for (var args = [],
	            $__4 = 0; $__4 < arguments.length; $__4++)
	          args[$__4] = arguments[$__4];
	        return thisDelta.facade.apply(thisDelta, fcd._args.concat(args));
	      };
	      fcd._args = firstArgs;
	      U.extend(fcd, operationMethods, {
	        _applyOperationMethod: function(method) {
	          for (var finalArgs = [],
	              $__5 = 1; $__5 < arguments.length; $__5++)
	            finalArgs[$__5 - 1] = arguments[$__5];
	          return {
	            newDelta: thisDelta.operation.apply(thisDelta, [method].concat(fcd._args).concat(finalArgs)),
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
	            return newDelta.facade();
	          } else {
	            return this.delta.facade.apply(this.delta, fcdArgs);
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
	    operation: function(method, options, path, arg) {
	      var $__5;
	      if (typeof options === 'string') {
	        ($__5 = [{}, options, path], options = $__5[0], path = $__5[1], arg = $__5[2], $__5);
	      }
	      var delta = deltaJs._newDeltaByMethod(method, arg, options);
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
	      var delta = deltaJs._newDeltaByMethod(method, arg, options);
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
	      var alreadyExists = this.graph.hasVertex(name);
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
	          $__4.graph.createEdge(subordinateName, name);
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
	    value: function(method, name, options, path, arg) {
	      return this._deltaModel.operation(method, name, options, path, arg);
	    },
	    configurable: true,
	    enumerable: true,
	    writable: true
	  }), Object.defineProperty($__3, "facade", {
	    value: function() {
	      for (var args = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        args[$__4] = arguments[$__4];
	      return this._deltaModel.facade.apply(this._deltaModel, args);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNzU5ZTcyMWYzZmE5MTA1MzVjNyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhcmlhdGlvblBvaW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwbGljYXRpb25Db25kaXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3JDQTtBQ0RBLE1BQUssaUJBQWtCLENBQUMsT0FBTTtVQ0E5QixFQUFDLEdBQUUsWUNBcUI7QUFBRSx3QkFBd0I7S0RBNUIsQ0FBQztBRUF2QixZQUFTLENDQVQsRUFBQyxLQUFJLENEQU8sS0NBWSxDQUFDO0VKQXlCLENBQUM7Ozs7OztHREM1QyxJTURQLEVBQUMsaUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLG1CQUFxQiwyQkFBMkIsbUJBQXFCLEdBQUssRUFBQyxPQUFNLGlCQUFtQixDQUFDLENBQUM7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QyxPQUFNO0FBRXJCLE1BQUksT0FBTSxrQ0FBa0MsQ0FBRztBQUFFLFdBQUs7R0FBRTtBQUN4RCxTQUFNLGtDQUFrQyxFQUFJLEtBQUcsQ0FBQztBQUloRCxVQUFRLENBQUMsT0FBTSxNQUFNLFVBQVUsQ0FBRztBQUVqQyxPQUFJLHFCQUFtQixFQUFJO0FBQUUsWUFBTyxLQUFHLHNCQUFzQjtLQUFFO0FBQy9ELE9BQUkscUJBQW1CLENBQUUsRUFBQyxDQUFHO0FBQUUsVUFBRyxzQkFBc0IsRUFBSSxHQUFDO0tBQUU7QUFFL0QsT0FBSSxTQUFPLEVBQUk7QUFDZCxZQUFPLGNBQWEsQ0FBQyxJQUFHLHFCQUFxQixDQUFDLEdBQUssS0FBRyxxQkFBcUIsU0FBUyxDQUFDO0tBQ3RGO0FBQUEsR0FFRCxDQUFDLENBQUM7QUFJRixNQUFJLFdBQVcsQ0FBQyxPQUFNLFlBQVksa0NBQWtDLENBQUMsQ0FBRztBQUFFLFdBQUs7R0FBRTtBQUNqRixTQUFNLFlBQVksa0NBQWtDLEVBQUksS0FBRyxDQUFDO0FBSTVELFVBQVEsQ0FBQyxPQUFNLFlBQVksVUFBVSxDQUFHLEVBRXZDLE1BQUssQ0FBTCxVQUFPLFFBQU87O0FBQ2IsY0FBTyxRQUFTLEVBQUMsU0FBQyxPQUFNLENBQU07QUFDN0IscUJBQVksQ0FBRSxPQUFNLENBQUMsT0FBUSxFQUFDLENBQUM7T0FDaEMsRUFBQyxDQUFDO0tBQ0gsQ0FFRCxDQUFDLENBQUM7QUFJSCxFbkJ6Q2lDO0FtQjBDakMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDc1OWU3MjFmM2ZhOTEwNTM1YzdcbiAqKi8iLCIvKiBpbXBvcnQgdXRpbGl0aWVzICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbi8qIGltcG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuaW1wb3J0IERlbHRhSnMgZnJvbSAnLi9EZWx0YUpzLmpzJztcblxuXG4vKiBtYWtlIFRhcmdldCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7UmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9KTtcblxuXG4vKiBtYWtlIFBhdGggY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQgUGF0aCBmcm9tICcuL1BhdGguanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBQYXRoIH0pO1xuXG5cbi8qIG1ha2UgRXJyb3IgY2xhc3NlcyBhdmFpbGFibGUgdW5kZXIgdGhlIERlbHRhSnMgc3ltYm9sICovXG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcblx0XHRDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG5cdFx0Q29uc3RyYWludEZhaWx1cmV9IGZyb20gJy4vRXJyb3IuanMnO1xuVS5leHRlbmQoRGVsdGFKcywgeyBBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgICBDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbnN0cmFpbnRGYWlsdXJlIH0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgRGVsdGFKcyBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwidmFyIFUgPSB7XG5cblx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9iajE7XG5cdH0sXG5cblx0ZGVmYXVsdChvYmplY3QsIC4uLnJlc3QpIHtcblx0XHR2YXIga2V5cyA9IHJlc3Quc2xpY2UoMCwgLTEpO1xuXHRcdHZhciBkZWYgPSByZXN0W3Jlc3QubGVuZ3RoLTFdO1xuXHRcdGlmIChrZXlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gb2JqZWN0IH1cblx0XHR2YXIgbGFzdCA9IFUuby5hcHBseShudWxsLCBbb2JqZWN0XS5jb25jYXQoa2V5cy5zbGljZSgwLCAtMSkpKTtcblx0XHRpZiAoVS5pc1VuZGVmaW5lZChsYXN0W2tleXNba2V5cy5sZW5ndGgtMV1dKSkge1xuXHRcdFx0bGFzdFtrZXlzW2tleXMubGVuZ3RoLTFdXSA9IGRlZjtcblx0XHR9XG5cdFx0cmV0dXJuIGxhc3Rba2V5c1trZXlzLmxlbmd0aC0xXV07XG5cdH0sXG5cblx0byhvYmplY3QsIC4uLmtleXMpIHtcblx0XHRyZXR1cm4gVS5kZWZhdWx0LmFwcGx5KG51bGwsIFtvYmplY3RdLmNvbmNhdChrZXlzKS5jb25jYXQoWyB7fSBdKSk7XG5cdH0sXG5cblx0YShvYmplY3QsIC4uLmtleXMpIHtcblx0XHRyZXR1cm4gVS5kZWZhdWx0LmFwcGx5KG51bGwsIFtvYmplY3RdLmNvbmNhdChrZXlzKS5jb25jYXQoWyBbXSBdKSk7XG5cdH0sXG5cblx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdHJldHVybiBuZXdfb2JqO1xuXHR9LFxuXG5cdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0fSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0Lyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cblx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzhcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzlcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQge0FwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcixcblx0XHRDb21wb3NpdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3J9IGZyb20gJy4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGEuanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvQ29tcG9zaXRlLmpzJztcbmltcG9ydCBkZWZpbmVPdmVybG9hZGVkICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL092ZXJsb2FkZWQuanMnO1xuaW1wb3J0IGRlZmluZU1vZGlmeSAgICAgICAgICAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvTW9kaWZ5LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL2Jhc2ljT3BlcmF0aW9ucy5qcyc7XG5pbXBvcnQgZGVmaW5lUHV0SW50b0FycmF5ICAgICAgICAgIGZyb20gJy4vb3BlcmF0aW9ucy9QdXRJbnRvQXJyYXkuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9GdW5jdGlvbiAgICAgICBmcm9tICcuL29wZXJhdGlvbnMvUHV0SW50b0Z1bmN0aW9uLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAgZnJvbSAnLi9vcGVyYXRpb25zL0RlbHRhTW9kZWwuanMnO1xuaW1wb3J0IGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICBmcm9tICcuL2ZlYXR1cmVzLmpzJztcbmltcG9ydCBkZWZpbmVWYXJpYXRpb25Qb2ludHMgICAgICAgZnJvbSAnLi92YXJpYXRpb25Qb2ludHMuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qcyc7XG5cblxuLyoqIHtAcHVibGljfXtAY2xhc3MgRGVsdGFKc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdHRoaXMuX2NvbXBvc2l0aW9ucyA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblx0dGhpcy5fb3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzID0gW107XG5cblx0ZGVmaW5lRGVsdGEgICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVDb21wb3NpdGUgICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZU92ZXJsb2FkZWQgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lTW9kaWZ5ICAgICAgICAgICAgICAgKHRoaXMpO1xuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAodGhpcyk7XG5cdGRlZmluZVB1dEludG9BcnJheSAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0Z1bmN0aW9uICAgICAgKHRoaXMpO1xuXHRkZWZpbmVEZWx0YU1vZGVsICAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUZlYXR1cmVzICAgICAgICAgICAgICh0aGlzKTtcblx0ZGVmaW5lVmFyaWF0aW9uUG9pbnRzICAgICAgKHRoaXMpO1xuXHRkZWZpbmVBcHBsaWNhdGlvbkNvbmRpdGlvbnModGhpcyk7XG5cbn0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8ge1xuXG5cdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBkZWx0YSAge0RlbHRhSnMjRGVsdGF9XG5cdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuUmVhZGFibGVUYXJnZXR9XG5cdCAqIEByZXR1cm4ge0Jvb2xlYW58QXBwbGljYXRpb25FcnJvcn0gLSBgdHJ1ZWAgaWYgdGhlIHByZWNvbmRpdGlvbiBpcyBzYXRpc2ZpZWQsIG90aGVyd2lzZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCBvciBhbiBpbnN0YW5jZSBvZiBgRGVsdGFKcy5BcHBsaWNhdGlvbkVycm9yYFxuXHQgKi9cblx0X2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpIHtcblx0XHRpZiAodHlwZW9mIGRlbHRhLnByZWNvbmRpdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGEucHJlY29uZGl0aW9uKHRhcmdldCk7XG5cdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBBcHBsaWNhdGlvbkVycm9yKSB7XG5cdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdH0gZWxzZSBpZiAoIWp1ZGdtZW50KSB7XG5cdFx0XHRcdHJldHVybiBuZXcgQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbmFtZSAgICAgIHtzdHJpbmd9XG5cdCAqIEBwYXJhbSBwcm90b3R5cGUge29iamVjdH1cblx0ICovXG5cdG5ld09wZXJhdGlvblR5cGUoU3VwZXJjbGFzcywgbmFtZSwgcHJvdG90eXBlKSB7XG5cdFx0aWYgKHR5cGVvZiBTdXBlcmNsYXNzID09PSAnc3RyaW5nJykgeyBbU3VwZXJjbGFzcywgbmFtZSwgcHJvdG90eXBlXSA9IFt1bmRlZmluZWQsIFN1cGVyY2xhc3MsIG5hbWVdIH1cblx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cblx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0Lyogc2FuaXR5IGNoZWNrcyAqL1xuXHRcdFUuYXNzZXJ0KG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSxcblx0XHRcdGBEZWx0YSBvcGVyYXRpb25zIG11c3QgaGF2ZSBhIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGNhcGl0YWwgbGV0dGVyIC0tICcke25hbWV9JyBkb2VzIG5vdC5gKTtcblx0XHRVLmFzc2VydCghdGhpcy5EZWx0YVtuYW1lXSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0LyogRGVsdGEgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gdGhpcy5EZWx0YVtuYW1lXSA9IFUubmV3U3ViY2xhc3MoU3VwZXJjbGFzcyB8fCB0aGlzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgb3B0aW9ucykge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgb3B0aW9ucyk7XG5cdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3QpIHsgdGhpcy5jb25zdHJ1Y3QoKSB9XG5cdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBwcm9wZXJ0eSBvbiB0aGUgdGFyZ2V0IG9iamVjdD8gKi9cblx0XHRcdFx0aWYgKG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ICYmICB0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCAmJlxuXHRcdFx0XHRcdG9wdGlvbnMucmVzdHJpY3RUb1Byb3BlcnR5ICE9PSB0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCkgeyByZXR1cm4gfVxuXG5cdFx0XHRcdC8qIHNob3VsZCB0aGlzIGRlbHRhIG9ubHkgYmUgYXBwbGllZCBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIHNlbGVjdGlvbj8gKi9cblx0XHRcdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7IHJldHVybiB9XG5cblx0XHRcdFx0LyogZG9lcyB0aGUgdGFyZ2V0IHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgZGVsdGE/ICovXG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXG5cdFx0XHRcdC8qIE9LLCB0aGVuIGFwcGx5IGl0IGlmIGEgbWV0aG9kIHRvIGRvIHNvIHdhcyBpbmNsdWRlZCBpbiB0aGUgb3BlcmF0aW9uICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm90b3R5cGUuYXBwbHlUbykpIHtcblx0XHRcdFx0XHRwcm90b3R5cGUuYXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCwgKFxuXHRcdFx0XHRcdFx0XHQhIXRoaXMub3B0aW9ucy50YXJnZXRQcm9wID9cblx0XHRcdFx0XHRcdFx0VS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcmVzdHJpY3RUb1Byb3BlcnR5OiBudWxsIH0pIDpcblx0XHRcdFx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0XHRcdCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9KSk7XG5cdFx0Y2xzLnR5cGUgPSBjbHMucHJvdG90eXBlLnR5cGUgPSBuYW1lO1xuXHRcdGNscy5vcHRpb25zID0gY2xzLnByb3RvdHlwZS5vcHRpb25zID0geyAvLyBUT0RPOiBkb24ndCBwdXQgdGhpcyBpbiBwcm90b3R5cGUgYW55bW9yZVxuXHRcdFx0Ly8gaWYgbm8gbWV0aG9kcyBhcmUgcHJvdmlkZWQsIHVzZSB0aGUgb3BlcmF0aW9uIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGxvd2VyY2FzZSBsZXR0ZXJcblx0XHRcdG1ldGhvZHM6IHByb3RvdHlwZS5tZXRob2RzIHx8IFsgbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSkgXVxuXHRcdH07XG5cblx0XHQvKiBhZGQgdGhpcyBuZXcgdHlwZSB0byB0aGUgbGlzdCBvZiB0eXBlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBtZXRob2QgKi9cblx0XHRjbHMub3B0aW9ucy5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4geyBVLmEodGhpcy5fb3ZlcmxvYWRzLCBtZXRob2QpLnB1c2gobmFtZSkgfSk7XG5cblx0XHQvKiBub3RpZnkgbGlzdGVuZXJzICovXG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKGNscykgfSk7XG5cblx0XHQvKiByZXR1cm4gdGhlIG5ldyBjbGFzcyAqL1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBmbiB7KEZ1bmN0aW9uKSA9PiB1bmRlZmluZWR9IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc3ViY2xhc3Mgb2YgYERlbHRhSnMjRGVsdGFgXG5cdCAqL1xuXHRvbk5ld09wZXJhdGlvblR5cGUoZm4pIHtcblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMucHVzaChmbik7XG5cdFx0T2JqZWN0LmtleXModGhpcy5EZWx0YSkuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0aWYgKG5hbWVbMF0gPT09IG5hbWVbMF0udG9VcHBlckNhc2UoKSkge1xuXHRcdFx0XHRmbih0aGlzLkRlbHRhW25hbWVdKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdCAqL1xuXHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHR0aGlzLl9jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdCAqIEBwYXJhbSBkMiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgc2Vjb25kIGRlbHRhXG5cdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdCAqL1xuXHRjb21wb3NlZChkMSwgZDIpIHtcblx0XHQvKiBoYW5kbGUgdGhlIGNhc2VzIHdoZXJlIG9uZSBvciBib3RoIGFyZ3VtZW50cyBhcmUgdW5kZWZpbmVkICovXG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMikpIHsgZDIgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXG5cdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLl9jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyogdGhyb3cgYW4gZXJyb3Igb24gZmFpbHVyZSAqL1xuXHRcdGlmICghc3VjY2VzcykgeyB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihkMSwgZDIpIH1cblxuXHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRyZXR1cm4gY29tcG9zZUZuKGQxLCBkMik7XG5cdH1cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9EZWx0YUpzLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBSZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHRoaXMuX3ZhbCA9IHZhbHVlO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfSxcblx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9XG59KTtcblxuZXhwb3J0IHZhciBXcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdHRoaXMuX29iaiAgPSBvYmo7XG5cdHRoaXMuX3Byb3AgPSBwcm9wO1xufSwge1xuXHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfSxcblx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cbn0pO1xuXG5SZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gPSBmdW5jdGlvbiBjaGFpbihwcm9wKSB7XG5cdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQodGhpcy52YWx1ZSwgcHJvcCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5leHBvcnQgZnVuY3Rpb24gcnQob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgUmVhZGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9UYXJnZXQuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5cbnZhciBQYXRoID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoc3RyID0gXCJcIikge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0dmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFsuI10/KShcXHcqfFxcKFxcdytcXCkpKC4qKSQvKTtcblx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0aWYgKGxlYWQgPT09ICcjJykge1xuXHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdH0gZWxzZSBpZiAocHJvcCAhPT0gJycpIHtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdHRoaXMuX3Jlc3QgPSBuZXcgUGF0aChyZXN0KTtcblx0XHR9XG5cdH1cbn0sIHtcblx0c2V0KG90aGVyKSB7XG5cdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0fSxcblx0Z2V0IHByb3AoKSB7IHJldHVybiB0aGlzLl9wcm9wIH0sXG5cdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCBQYXRoO1xuXG5cbi8vIFRPRE86IGltcGxlbWVudCB0aGF0IHRoZSBgLihpbnN0YW5jZSkuYCBtZW1iZXJzIGFyZSBhY3R1YWxseSBpbmNsdWRlZCBpbiBpbnN0YW5jZXNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1BhdGguanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIEFwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfScuYDtcblx0dGhpcy5kZWx0YSA9IGRlbHRhO1xuXHR0aGlzLnZhbHVlID0gdmFsdWU7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIHZhbHVlKTtcblx0dGhpcy5uYW1lID0gJ011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZXNlIGRlbHRhcyBvZiB0eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmAgK1xuXHQgICAgICAgICAgICAgICBlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcbn0pO1xuXG5leHBvcnQgdmFyIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubmFtZSA9ICdOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCBiYXNlRGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTtcblx0dGhpcy5uYW1lID0gJ0RlbHRhQXJnQXBwbGljYXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGNhbm5vdCBhcHBseSB0byB0aGUgdHlwZS0nJHt0eXBlb2YgYmFzZURlbHRhLmFyZ30nLXZhbHVlIG9mIHRoaXMgYmFzZSBkZWx0YSBvZiB0eXBlICcke2Jhc2VEZWx0YS50eXBlfScuYDtcblx0dGhpcy5iYXNlRGVsdGEgPSBiYXNlRGVsdGE7XG59KTtcblxuZXhwb3J0IHZhciBDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIENvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMpO1xuXHR0aGlzLm5hbWUgPSAnQ29tcG9zaXRpb25FcnJvcic7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gO1xuXHR0aGlzLmRlbHRhMSA9IGRlbHRhMTtcblx0dGhpcy5kZWx0YTIgPSBkZWx0YTI7XG59KTtcblxuZXhwb3J0IHZhciBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKENvbXBvc2l0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZGVsdGExLCBkZWx0YTIsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YTEsIGRlbHRhMik7XG5cdHRoaXMubmFtZSA9ICdNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3InO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhlcmUgYXJlIG5vIG92ZXJsb2FkcyB0byBjb21wb3NlIHRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfScuYCArXG5cdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29uc3RyYWludEZhaWx1cmUgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29uc3RyYWludEZhaWx1cmUoZmVhdHVyZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcyk7XG5cdHRoaXMubmFtZSA9ICdDb25zdHJhaW50RmFpbHVyZSc7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGUgZmVhdHVyZSAnJHtmZWF0dXJlLm5hbWV9JyBpcyBib3RoIHNlbGVjdGVkIGFuZCBleGNsdWRlZCBieSBpdHMgY29uc3RyYWludHMuYDtcblx0dGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgd3R9ICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUFwcGxpY2F0aW9uQ29uZGl0aW9ucyBmcm9tICcuLi9hcHBsaWNhdGlvbkNvbmRpdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhKSkgeyByZXR1cm4gfVxuXG5cdGRlbHRhSnMuX25leHREZWx0YUlEID0gMDtcblxuXHQvKioge0BjbGFzcyBEZWx0YX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhKGFyZywgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5hcmcgID0gYXJnO1xuXHRcdHRoaXMuaWQgPSBkZWx0YUpzLl9uZXh0RGVsdGFJRCsrO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH0sIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5vcHRpb25zKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlICAgeyp9ICAgICAgIC0gYW55IGdpdmVuIHZhbHVlXG5cdFx0ICogQHBhcmFtICBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgZGVsdGEgYXBwbGljYXRpb25cblx0XHQgKiBAcmV0dXJuIHsqfSAtIHRoZSB2YWx1ZSByZXN1bHRpbmcgaW4gdGhpcyBkZWx0YSBiZWluZyBhcHBsaWVkIHRvIHRoZSBnaXZlbiBgdmFsdWVgXG5cdFx0ICovXG5cdFx0YXBwbGllZFRvKHZhbHVlLCBvcHRpb25zID0ge30pIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSwgb3B0aW9ucyk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMudGFyZ2V0UHJvcCkgeyBzdHIgKz0gYCDigLkke3RoaXMub3B0aW9ucy50YXJnZXRQcm9wfeKAumAgfVxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgICB7IHN0ciArPSBgOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuYXJnKX1gIH1cblx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLmlkfSlgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0fSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblx0XHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfbmV3RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZywgb3B0aW9ucykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IHRoaXMuX292ZXJsb2Fkc1ttZXRob2RdXG5cdFx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLkRlbHRhW3R5cGVdKGFyZywgVS5leHRlbmQoeyBtZXRob2QgfSwgb3B0aW9ucykpKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5EZWx0YS5PdmVybG9hZGVkKGFyZywgVS5leHRlbmQoeyBtZXRob2QgfSwgb3B0aW9ucykpO1xuXHRcdFx0XHRkZWx0YS5vdmVybG9hZHMgPSBuZXdEZWx0YXM7XG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8qKiB7QGNsYXNzfVxuXHQgKlxuXHQgKi9cblx0ZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUgPSBVLm5ld1N1YmNsYXNzKGRlbHRhSnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGUoLi4uYXJncykge1xuXHRcdHN1cGVyRm4uYXBwbHkodGhpcywgYXJncyk7XG5cdH0sIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBJbXBsZW1lbnQgdGhpcyBtZXRob2QgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIERlbHRhLkNvbXBvc2l0ZSBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAcHJvcGVydHl9XG5cdFx0ICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnMgdG8gYmUgYWRkZWQgbW9yZSBlYXNpbHkuXG5cdFx0ICogQHJldHVybiB7ZnVuY3Rpb259IC0gdGhlIGZhY2FkZSB0byB0aGlzIGRlbHRhLCBmb3IgZWFzaWx5IGFkZGluZyBvcGVyYXRpb25zXG5cdFx0ICovXG5cdFx0ZmFjYWRlKC4uLmZpcnN0QXJncykge1xuXHRcdFx0dmFyIHRoaXNEZWx0YSA9IHRoaXM7XG5cdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhLmZhY2FkZS5hcHBseSh0aGlzRGVsdGEsIGZjZC5fYXJncy5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGZjZC5fYXJncyA9IGZpcnN0QXJncztcblx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0bmV3RGVsdGE6IHRoaXNEZWx0YS5vcGVyYXRpb24uYXBwbHkodGhpc0RlbHRhLCBbbWV0aG9kXS5jb25jYXQoZmNkLl9hcmdzKS5jb25jYXQoZmluYWxBcmdzKSksXG5cdFx0XHRcdFx0XHRmY2RBcmdzOiAgZmNkLl9hcmdzXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IHRoaXNEZWx0YVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZmNkO1xuXHRcdH0sXG5cdH0pO1xuXG5cdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdGRlbHRhSnMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRpZiAoY2xzID09PSBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgeyByZXR1cm4gfVxuXHRcdChjbHMub3B0aW9ucy5tZXRob2RzIHx8IFtdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSkpIHtcblx0XHRcdFx0b3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIge25ld0RlbHRhLCBmY2RBcmdzfSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kLmFwcGx5KHRoaXMsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRcdFx0aWYgKG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdEZWx0YS5mYWNhZGUoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZGVsdGEuZmFjYWRlLmFwcGx5KHRoaXMuZGVsdGEsIGZjZEFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL0NvbXBvc2l0ZS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGEgZnJvbSAnLi9EZWx0YS5qcyc7XG5pbXBvcnQge011bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0XHROb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0TXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuLi9FcnJvci5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCkpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YSwgJ092ZXJsb2FkZWQnLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLm92ZXJsb2FkcyA9IFtdIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5PdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMub3B0aW9ucyk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCAge0RlbHRhLldyaXRhYmxlVGFyZ2V0fSAtIHRoZSB0YXJnZXQgdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBkZWx0YVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAgICAgICAgICAgICAgLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIGRlbHRhIGFwcGxpY2F0aW9uXG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cdH0pO1xuXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkIHx8IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQoKTtcblx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL092ZXJsb2FkZWQuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQgUGF0aCAgICAgICAgICAgIGZyb20gJy4uL1BhdGguanMnO1xuaW1wb3J0IHt3dH0gICAgICAgICAgICBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IGRlZmluZUNvbXBvc2l0ZSBmcm9tICcuL0NvbXBvc2l0ZS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuTW9kaWZ5KSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZUNvbXBvc2l0ZShkZWx0YUpzKTtcblxuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUsICdNb2RpZnknLCB7XG5cdFx0Y29uc3RydWN0KCkgeyB0aGlzLmRlbHRhcyA9IHt9IH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YS5Nb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQgIHtEZWx0YS5Xcml0YWJsZVRhcmdldH0gLSB0aGUgdGFyZ2V0IHRvIHdoaWNoIHRvIGFwcGx5IHRoaXMgZGVsdGFcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gICAgICAgICAgICAgIC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBkZWx0YSBhcHBsaWNhdGlvblxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0LCBvcHRpb25zID0ge30pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdC8vaWYgKCFvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSB8fCBvcHRpb25zLnJlc3RyaWN0VG9Qcm9wZXJ0eSA9PT0gcHJvcCkge1xuXHRcdFx0XHQvL1x0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApLFxuXHRcdFx0XHQvL1x0XHRcdFUuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHJlc3RyaWN0VG9Qcm9wZXJ0eTogbnVsbCB9KSk7XG5cdFx0XHRcdC8vfVxuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCksIG9wdGlvbnMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfSAgIC0gdGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChlLmcuLCAnYWRkJywgJ3JlbW92ZScsIGV0Yy4pXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAgICAgLSB0aGUgcmVsYXRpdmUgcGF0aCB0byB3aGljaCB0byBhcHBseSB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gIC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24obWV0aG9kLCBvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHsgW29wdGlvbnMsIHBhdGgsIGFyZ10gPSBbe30sIG9wdGlvbnMsIHBhdGhdIH1cblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XG5cdFx0ICogQHBhcmFtIHBhdGggICAge3N0cmluZ31cblx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhICdyZXN0JyB0byB0aGUgcGF0aCwgc2V0IGEgbGluayBpbiB0aGUgY2hhaW4gKi9cblx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uKCdtb2RpZnknLCBwYXRoLnByb3ApXG5cdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdLm9wdGlvbnMudGFyZ2V0UHJvcCA9IHBhdGgucHJvcDtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL01vZGlmeS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1dyaXRhYmxlVGFyZ2V0LCBSZWFkYWJsZVRhcmdldCwgcnQsIHd0fSBmcm9tICcuLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3J9ICAgICAgICAgICAgICAgZnJvbSAnLi4vRXJyb3IuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9EZWx0YS5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQpKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2Jhc2ljT3BlcmF0aW9uc0RlZmluZWQgPSB0cnVlO1xuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqKioqKiovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgbm8tb3AgdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdHZhciBOb09wID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJyk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRbXG5cdFx0WydBZGQnLCAgICAgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFsnUmVwbGFjZScsICdyZXBsYWNlJywgKHRhcmdldCkgPT4gVS5pc0RlZmluZWQgICh0YXJnZXQudmFsdWUpXVxuXHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0Ly8gSW4gdGhlIGxpbmUgZGlyZWN0bHkgYmVsb3csICd0aGlzJyBjYW5ub3QgYmUgdXNlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRyYWNldXI6XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS90cmFjZXVyLWNvbXBpbGVyL2lzc3Vlcy8xNjMxXG5cdFx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdGNvbnN0cnVjdCgpICAgICAgICAgIHsgdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcgPSBbXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBwcmUodGFyZ2V0KSAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0YXBwbHlUbyh0YXJnZXQpICAgICAgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKHYsIGQpID0+IGQuYXBwbGllZFRvKHYpLCB0aGlzLmFyZykgfSxcblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRpZiAocmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKGQxLCBkMikgPT4gZGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0ICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fVxuXHRcdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSBkZWx0YUpzLmNvbXBvc2VkKHJlc3VsdC5kZWx0YXNbcHJvcF0sIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMub3B0aW9ucy5tZXRob2QgPyBbeyBtZXRob2Q6IHRoaXMub3B0aW9ucy5tZXRob2QsIHZhbHVlOiB0aGlzLmFyZyB9XSA6IFtdO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9BcnJheScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vcGVyYXRpb25zL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbikpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5tZXRob2QpIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHQgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMub3B0aW9ucy5tZXRob2QsXG5cdCAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmFyZ1xuICAgICAgICAgICAgICAgfV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5vcHRpb25zKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0ICAgICAgIChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbigpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdHZhciBEZWx0YU1vZGVsID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCwgb3B0aW9ucyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtzdHJpbmd9ICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gbmFtZSB7c3RyaW5nfSAgICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3Q/fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0ICogQHBhcmFtIHBhdGgge3N0cmluZ30gICAgIC0gdGhlIHJlbGF0aXZlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gIC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24obWV0aG9kLCBuYW1lLCBvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHsgW29wdGlvbnMsIHBhdGgsIGFyZ10gPSBbe30sIG9wdGlvbnMsIHBhdGhdIH1cblx0XHRcdHZhciBkZWx0YSA9IGRlbHRhSnMuX25ld0RlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcsIG9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge29iamVjdD99XG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9ICcnO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblxuXHRcdFx0Ly8vKiBhIGRlbHRhIGJ5IHRoaXMgbmFtZSBjYW5ub3QgYWxyZWFkeSBiZSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdC8vVS5hc3NlcnQoIXRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSksXG5cdFx0XHQvL1x0YEEgZGVsdGEgYnkgdGhlIG5hbWUg4oCcJHtuYW1lfeKAnSBpcyBhbHJlYWR5IGluIHRoaXMgZGVsdGEgbW9kZWwuYCk7XG5cblx0XHRcdC8qIGNoZWNrIGlmIGEgZGVsdGEgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHMgKi9cblx0XHRcdHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy5ncmFwaC5oYXNWZXJ0ZXgobmFtZSk7XG5cblx0XHRcdC8qIHN0YXJ0aW5nIHRvIGRlZmluZSB0aGUgZGVsdGEgdGhhdCBnb2VzIGRpcmVjdGx5IGluIHRoZSBncmFwaCAqL1xuXHRcdFx0dmFyIGRlbHRhQmFzZSA9IGRlbHRhO1xuXG5cdFx0XHQvKiBpZiB0aGVyZSBpcyBhIHBhdGgsIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBjaGFpbiBvZiBkZWx0YXMgKi9cblx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0ZGVsdGFCYXNlID0gbmV3IGRlbHRhSnMuRGVsdGEuTW9kaWZ5KCk7XG5cdFx0XHRcdGRlbHRhQmFzZS5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0LyogaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRlbHRhIHdpdGggdGhpcyBuYW1lLCBjb21wb3NlIHRoZW0gYW5kIHJldHVybiBgZGVsdGFgIGVhcmx5ICovXG5cdFx0XHRpZiAoYWxyZWFkeUV4aXN0cykge1xuXHRcdFx0XHR2YXIgZXhpc3RpbmdEZWx0YSA9IHRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSk7XG5cdFx0XHRcdGRlbHRhQmFzZSA9IGV4aXN0aW5nRGVsdGEuY29tcG9zZWRXaXRoKGRlbHRhQmFzZSk7XG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gZXhpc3RpbmdEZWx0YS5uYW1lO1xuXHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBleGlzdGluZ0RlbHRhLmFwcGxpY2F0aW9uQ29uZGl0aW9uO1xuXHRcdFx0XHR0aGlzLmdyYXBoLnNldFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0LyogYWRkIHRoZSBuZXcgZGVsdGEgdG8gdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHRcdGRlbHRhQmFzZS5uYW1lID0gbmFtZTtcblx0XHRcdFx0dGhpcy5ncmFwaC5hZGRWZXJ0ZXgobmFtZSwgZGVsdGFCYXNlKTtcblxuXHRcdFx0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG5cdFx0XHRcdChvcHRpb25zWydjb21iaW5lcyddIHx8IFtdKS5jb25jYXQob3B0aW9uc1snYWZ0ZXInXSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qIGFwcGxpY2F0aW9uIGNvbmRpdGlvbiBhbmQgb3B0aW9uYWxseSwgYW4gZXBvbnltb3VzLCBsaW5rZWQgZmVhdHVyZSAqL1xuXHRcdFx0XHR2YXIgZGVsdGFGZWF0dXJlO1xuXHRcdFx0XHRpZiAob3B0aW9ucy5mZWF0dXJlKSB7IGRlbHRhRmVhdHVyZSA9IGRlbHRhSnMubmV3RmVhdHVyZSggIG5hbWUsICAgICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB9XG5cdFx0XHRcdGVsc2UgICAgICAgICAgICAgICAgIHsgZGVsdGFGZWF0dXJlID0gZGVsdGFKcy5uZXdGZWF0dXJlKCBgZGVsdGFfXyR7bmFtZX1gLCBVLmV4dGVuZCh7IGhpZGRlbjogdHJ1ZSB9LCBvcHRpb25zKSApIH1cblx0XHRcdFx0aWYgKG9wdGlvbnMuZmVhdHVyZSB8fCBkZWx0YUZlYXR1cmUuY29uZGl0aW9uYWwpIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UuYXBwbGljYXRpb25Db25kaXRpb24gPSBkZWx0YUZlYXR1cmU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBleHRyYWN0ICdpZicgZnJvbSBjb21wb3VuZCBvcHRpb25zICovXG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydjb21iaW5lcyddKSkge1xuXHRcdFx0XHRcdGRlbHRhRmVhdHVyZS5pZihvcHRpb25zWydjb21iaW5lcyddKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb3BlcmF0aW9ucy9EZWx0YU1vZGVsLmpzXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IHtDb25zdHJhaW50RmFpbHVyZX0gZnJvbSAnLi9FcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChkZWx0YUpzLl9mZWF0dXJlc0ltcGxlbWVudGVkKSB7IHJldHVybiB9XG5cdGRlbHRhSnMuX2ZlYXR1cmVzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogZ2l2ZW4gYSAndXNlciBpbnB1dCcgY2xhdXNlLCBub3JtYWxpemUgaXQgKi9cblx0ZnVuY3Rpb24gX25vcm1hbGl6ZUNsYXVzZShpbnB1dCkge1xuXHRcdGlucHV0ID0gQXJyYXkuaXNBcnJheShpbnB1dCkgPyBpbnB1dCA6IFtpbnB1dF07XG5cdFx0aW5wdXQgPSBpbnB1dC5tYXAoY29uaiA9PiBjb25qIGluc3RhbmNlb2YgZGVsdGFKcy5GZWF0dXJlID8gY29uai5uYW1lIDogY29uaik7XG5cdFx0cmV0dXJuIGlucHV0O1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciB0aGUgbXV0dWFsIHNlbGVjdGlvbiBvZiBmZWF0dXJlcyAqL1xuXHR2YXIgX2lmID0ge307IC8vIGZlYXR1cmUgLT4gKGFycmF5cyBvZiBhcnJheXM7IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtKVxuXHR2YXIgX3NlbGVjdGVkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkSWYoZmVhdHVyZSwgZGlzanVuY3QgPSBbXSkge1xuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlXSA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0fSBlbHNlIGlmIChfaWZbZmVhdHVyZV0gIT09IHRydWUpIHtcblx0XHRcdFUuYShfaWYsIGZlYXR1cmUpLnB1c2goX25vcm1hbGl6ZUNsYXVzZShkaXNqdW5jdCkpO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBfYWRkU2VsZWN0cyhmZWF0dXJlLCBvdGhlckZlYXR1cmVzKSB7XG5cdFx0X25vcm1hbGl6ZUNsYXVzZShvdGhlckZlYXR1cmVzKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuXHRcdFx0X2FkZElmKG90aGVyLCBmZWF0dXJlKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyogY29kZSBmb3IgY29uc3RyYWludHMgYmV0d2VlbiBmZWF0dXJlcyAoZW5mb3JjZWQgYnkgZXJyb3JzKSAqL1xuXHR2YXIgX29ubHlJZiA9IHt9OyAvLyBmZWF0dXJlIC0+IChhcnJheXMgb2YgYXJyYXlzOyBjb25qdW5jdGl2ZSBub3JtYWwgZm9ybSlcblx0dmFyIF9hbGxvd2VkID0ge307IC8vIGZlYXR1cmUgLT4gQm9vbGVhblxuXHRmdW5jdGlvbiBfYWRkT25seUlmKGZlYXR1cmUsIGNvbmp1bmN0ID0gW10pIHtcblx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0aWYgKGNvbmp1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0X2FsbG93ZWRbZmVhdHVyZV0gPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKGNvbmp1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdH0gZWxzZSBpZiAoX29ubHlJZltmZWF0dXJlXSAhPT0gZmFsc2UpIHtcblx0XHRcdFUuYShfb25seUlmLCBmZWF0dXJlKS5wdXNoKF9ub3JtYWxpemVDbGF1c2UoY29uanVuY3QpKTtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gX2FkZFJlcXVpcmVkQnkoZmVhdHVyZSwgb3RoZXJGZWF0dXJlcykge1xuXHRcdF9ub3JtYWxpemVDbGF1c2Uob3RoZXJGZWF0dXJlcykuZm9yRWFjaCgob3RoZXIpID0+IHtcblx0XHRcdF9hZGRPbmx5SWYob3RoZXIsIGZlYXR1cmUpO1xuXHRcdH0pO1xuXHR9XG5cblxuXHQvKiBjb2RlIGZvciBzZXR0bGluZyByZWxhdGlvbnMgYmV0d2VlbiBmZWF0dXJlcyAqL1xuXHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0aWYgKCFfY29uZGl0aW9uc1Vuc2V0dGxlZCkgeyByZXR1cm4gfVxuXHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHQvKiBmaXhlZCBwb2ludCBjb21wdXRhdGlvbiBvZiBzZWxlY3RlZCBmZWF0dXJlcyAoaS5lLiwgcHJvcGFnYXRlIHRoZW0gdW50aWwgdGhlcmUgaXMgbm8gY2hhbmdlKSAqL1xuXHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdGRvIHtcblx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdE9iamVjdC5rZXlzKGRlbHRhSnMuZmVhdHVyZXMpLmZvckVhY2goKGZlYXR1cmVOYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGFyZSAnaWYnIGRpc2p1bmN0cyB0aGF0IGFyZSBzZWxlY3RlZCwgdGhpcyBmZWF0dXJlIGlzIHNlbGVjdGVkICovXG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSkpIHsgX3NlbGVjdGVkW2ZlYXR1cmVOYW1lXSA9IGZhbHNlIH1cblx0XHRcdFx0XHRpZiAoKF9pZltmZWF0dXJlTmFtZV0gfHwgW10pLnNvbWUoZGlzaiA9PiBkaXNqLmV2ZXJ5KGNvbmogPT4gX3NlbGVjdGVkW2NvbmpdKSkpIHtcblx0XHRcdFx0XHRcdF9zZWxlY3RlZFtmZWF0dXJlTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblxuXHRcdC8qIGNvbXB1dGF0aW9uIG9mIGFsbG93ZWQgZmVhdHVyZXMgKi9cblx0XHRPYmplY3Qua2V5cyhkZWx0YUpzLmZlYXR1cmVzKS5mb3JFYWNoKChmZWF0dXJlTmFtZSkgPT4ge1xuXHRcdFx0LyogaWYgdGhlcmUgYXJlICdvbmx5SWYnIGNvbmp1bmN0cyB0aGF0IGFyZSBleGNsdWRlZCwgdGhpcyBmZWF0dXJlIGlzIGV4Y2x1ZGVkICovXG5cdFx0XHRfYWxsb3dlZFtmZWF0dXJlTmFtZV0gPSAoX29ubHlJZltmZWF0dXJlTmFtZV0gfHwgW10pLmV2ZXJ5KGNvbmogPT4gY29uai5zb21lKGRpc2ogPT4gX3NlbGVjdGVkW2Rpc2pdKSk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKiB7QHB1YmxpY317QGNsYXNzIERlbHRhSnMjRmVhdHVyZX1cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRmVhdHVyZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblxuXHRcdC8qIHNldCBiYXNpYyBmaWVsZHMgKi9cblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHQvKiB1cGRhdGUgY29uZGl0aW9ucyAqL1xuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdFx0dGhpcy5hZGRPcHRpb24ob3B0aW9uLCBvcHRpb25zW29wdGlvbl0pO1xuXHRcdH0pO1xuXG5cdH0sIHtcblx0XHRnZXQgc2VsZWN0ZWQoKSB7XG5cdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0aWYgKF9zZWxlY3RlZFt0aGlzLm5hbWVdICYmICFfYWxsb3dlZFt0aGlzLm5hbWVdKSB7XG5cdFx0XHRcdHRocm93IG5ldyBDb25zdHJhaW50RmFpbHVyZSh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfc2VsZWN0ZWRbdGhpcy5uYW1lXTtcblx0XHR9LFxuXHRcdGdldCBjb25kaXRpb24oKSAgIHsgcmV0dXJuIF9pZlt0aGlzLm5hbWVdICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRnZXQgY29uZGl0aW9uYWwoKSB7IHJldHVybiBVLmEoX2lmLCAgICAgdGhpcy5uYW1lKS5sZW5ndGggPiAwIH0sXG5cdFx0Z2V0IHJlc3RyaWN0ZWQoKSAgeyByZXR1cm4gVS5hKF9vbmx5SWYsIHRoaXMubmFtZSkubGVuZ3RoID4gMCB9LFxuXHRcdHNlbGVjdCgpIHsgdGhpcy5pZih0cnVlKSB9XG5cdH0pO1xuXG5cblx0LyogcmVzdHJpY3Rpb25zIGFuZCBjb25uZWN0aW9ucyAqL1xuXHRjb25zdCBGRUFUVVJFX0NPTk5FQ1RJT05TID0gW1xuXHRcdFsgJ2lmJywgICAgICAgICBbX2FkZElmLCBfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgXSwgLy8gdGhpcyBzZWxlY3RlZCBieSBvdGhlclxuXHRcdFsgJ29ubHlJZicsICAgICBbX2FkZE9ubHlJZl0gICAgICAgICAgICAgICAgICAgICAgICAgXSwgLy8gZXJyb3IgaWYgdGhpcyBidXQgbm90IG90aGVyXG5cdFx0WyAnc2VsZWN0cycsICAgIFtfYWRkU2VsZWN0cywgX2FkZE9ubHlJZl0gICAgICAgICAgICBdLCAvLyBvdGhlciBzZWxlY3RlZCBieSB0aGlzXG5cdFx0WyAncmVxdWlyZWRCeScsIFtfYWRkUmVxdWlyZWRCeV0gICAgICAgICAgICAgICAgICAgICBdLCAvLyBlcnJvciBpZiBvdGhlciBidXQgbm90IHRoaXNcblx0XHRbICdpZmYnLCAgICAgICAgW19hZGRJZiwgX2FkZFJlcXVpcmVkQnksIF9hZGRPbmx5SWZdIF0gIC8vIGlmIGFuZCBvbmx5SWZcblx0XTtcblx0ZGVsdGFKcy5GZWF0dXJlLnByb3RvdHlwZS5hZGRPcHRpb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuLCBtZXRob2RzXSkgPT4ge1xuXHRcdFx0aWYgKG5hbWUgPT09IG4pIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHsgbWV0aG9kKHRoaXMubmFtZSwgdmFsdWUpIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXHRGRUFUVVJFX0NPTk5FQ1RJT05TLmZvckVhY2goKFtuYW1lXSkgPT4ge1xuXHRcdGRlbHRhSnMuRmVhdHVyZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHRoaXMuYWRkT3B0aW9uKG5hbWUsIHZhbHVlKTtcblx0XHR9O1xuXHR9KTtcblxuXG5cdC8qIHRoZSBmZWF0dXJlcyBiZWxvbmdpbmcgdG8gdGhpcyBEZWx0YUpzIGluc3RhbmNlICovXG5cdGRlbHRhSnMuZmVhdHVyZXMgPSB7fTsgLy8gbmFtZSAtPiBGZWF0dXJlXG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fZmVhdHVyZXNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7c3RyaW5nfSAgLSB0aGUgbmFtZSBvZiB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGUgbmV3IGZlYXR1cmVcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0ZlYXR1cmV9IC0gdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG5ldyBmZWF0dXJlXG5cdFx0ICovXG5cdFx0bmV3RmVhdHVyZShuYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8qIHNhbml0eSBjaGVjayovXG5cdFx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHRoaXMuZmVhdHVyZXNbbmFtZV0pLFxuXHRcdFx0XHRgQSBmZWF0dXJlIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBjcmVhdGUgdGhlIG5ldyBmZWF0dXJlICovXG5cdFx0XHRyZXR1cm4gdGhpcy5mZWF0dXJlc1tuYW1lXSA9IG5ldyB0aGlzLkZlYXR1cmUobmFtZSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmVhdHVyZXMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQge3J0fSBmcm9tICcuL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCBmcm9tICcuL29wZXJhdGlvbnMvRGVsdGFNb2RlbC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cblx0ZGVmaW5lRGVsdGFNb2RlbChkZWx0YUpzKTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXHRkZWx0YUpzLl9kZWx0YU1vZGVsID0gbmV3IGRlbHRhSnMuRGVsdGEuRGVsdGFNb2RlbCgpO1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLmNvbnN0cnVjdG9yLl92YXJpYXRpb25Qb2ludHNJbXBsZW1lbnRlZCkpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5jb25zdHJ1Y3Rvci5fdmFyaWF0aW9uUG9pbnRzSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBUaGlzIG1ldGhvZCBpbmRpY2F0ZXMgYSB2YXJpYXRpb24gcG9pbnQuXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gLSBhIGhvb2sgYnkgd2hpY2ggb3BlcmF0aW9ucyBmcm9tIHRoZSBjb3JlIGRlbHRhIG1vZGVsIGNhbiBiZSBhcHBsaWVkXG5cdFx0ICogQHBhcmFtIHZhbCAgeyp9ICAgICAgLSB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGlzIHZhcmlhdGlvbiBwb2ludFxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIG9mIHRoaXMgdmFyaWF0aW9uIHBvaW50IGFmdGVyIGFwcGx5aW5nIHRoZSBhcHByb3ByaWF0ZSBkZWx0YXNcblx0XHQgKi9cblx0XHR2cChuYW1lLCB2YWwpIHtcblx0XHRcdHZhciByb290ID0geyBbbmFtZV06IHZhbCB9O1xuXHRcdFx0dGhpcy5fZGVsdGFNb2RlbC5hcHBseVRvKHJ0KHJvb3QpLCB7XG5cdFx0XHRcdHJlc3RyaWN0VG9Qcm9wZXJ0eTogbmFtZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcm9vdFtuYW1lXTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEEge0RlbHRhSnN9IGluc3RhbmNlIGhhcyBvbmUgZnVuZGFtZW50YWwge0RlbHRhSnMjRGVsdGFNb2RlbH0gaW5zdGFuY2UsIHdoaWNoIGlzIGFwcGxpZWRcblx0XHQgKiB0byBhbnkgdmFyaWF0aW9uIHBvaW50cyB0aGF0IGFyZSBlbmNvdW50ZXJlZC4gVGhpcyBtZXRob2QgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIG1ldGhvZCBvbiB0aGF0ICdyb290JyBkZWx0YSBtb2RlbC4gSXQgYWRkcyBhIG5ldyBvcGVyYXRpb24gdG8gaXQuXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7c3RyaW5nfSAgIC0gdGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChlLmcuLCAnYWRkJywgJ3JlbW92ZScsIGV0Yy4pXG5cdFx0ICogQHBhcmFtIG5hbWUge3N0cmluZ30gICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0P30gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9ICAgICAtIHRoZSByZWxhdGl2ZSBwYXRoIHRvIHBlcmZvcm0gdGhpcyBvcGVyYXRpb24gb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9ICAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG1ldGhvZCwgbmFtZSwgb3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGVsdGFNb2RlbC5vcGVyYXRpb24obWV0aG9kLCBuYW1lLCBvcHRpb25zLCBwYXRoLCBhcmcpO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0Bwcm9wZXJ0eX1cblx0XHQgKiBBIHtEZWx0YUpzfSBpbnN0YW5jZSBoYXMgb25lIGZ1bmRhbWVudGFsIHtEZWx0YUpzI0RlbHRhTW9kZWx9IGluc3RhbmNlLCB3aGljaCBpcyBhcHBsaWVkXG5cdFx0ICogdG8gYW55IHZhcmlhdGlvbiBwb2ludHMgdGhhdCBhcmUgZW5jb3VudGVyZWQuIFRoaXMgcHJvcGVydHkgaXMgYW4gYWxpYXMgdG8gdGhlIGVwb255bW91c1xuXHRcdCAqIHByb3BlcnR5IG9uIHRoYXQgJ3Jvb3QnIGRlbHRhIG1vZGVsLiBJdCByZXR1cm5zIHRoZSBvYmplY3QgdGhhdCBhbGxvd3MgbmV3IGRlbHRhIG9wZXJhdGlvbnNcblx0XHQgKiB0byBiZSBhZGRlZCBtb3JlIGVhc2lseS5cblx0XHQgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRmYWNhZGUoLi4uYXJncykge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RlbHRhTW9kZWwuZmFjYWRlLmFwcGx5KHRoaXMuX2RlbHRhTW9kZWwsIGFyZ3MpO1xuXHRcdH0sXG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ZhcmlhdGlvblBvaW50cy5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRpZiAoZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQpIHsgcmV0dXJuIH1cblx0ZGVsdGFKcy5fYXBwbGljYXRpb25Db25kaXRpb25zSW1wbGVtZW50ZWQgPSB0cnVlO1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0VS5leHRlbmQoZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUsIHtcblxuXHRcdGdldCBhcHBsaWNhdGlvbkNvbmRpdGlvbigpIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uIH0sXG5cdFx0c2V0IGFwcGxpY2F0aW9uQ29uZGl0aW9uKGFjKSB7IHRoaXMuX2FwcGxpY2F0aW9uQ29uZGl0aW9uID0gYWMgfSxcblxuXHRcdGdldCBzZWxlY3RlZCgpIHtcblx0XHRcdHJldHVybiBVLmlzVW5kZWZpbmVkKHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24pIHx8IHRoaXMuYXBwbGljYXRpb25Db25kaXRpb24uc2VsZWN0ZWQ7XG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuY29uc3RydWN0b3IuX2FwcGxpY2F0aW9uQ29uZGl0aW9uc0ltcGxlbWVudGVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLmNvbnN0cnVjdG9yLl9hcHBsaWNhdGlvbkNvbmRpdGlvbnNJbXBsZW1lbnRlZCA9IHRydWU7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRVLmV4dGVuZChkZWx0YUpzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuXG5cdFx0c2VsZWN0KGZlYXR1cmVzKSB7XG5cdFx0XHRmZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiB7XG5cdFx0XHRcdHRoaXMuZmVhdHVyZXNbZmVhdHVyZV0uc2VsZWN0KCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcGxpY2F0aW9uQ29uZGl0aW9ucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=