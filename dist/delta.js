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
	    MultipleOverloadsCompositionError = $__4.MultipleOverloadsCompositionError;
	U.extend(DeltaJs, {
	  ApplicationError: ApplicationError,
	  MultipleOverloadsApplicationError: MultipleOverloadsApplicationError,
	  NoOverloadsApplicationError: NoOverloadsApplicationError,
	  DeltaArgApplicationError: DeltaArgApplicationError,
	  CompositionError: CompositionError,
	  MultipleOverloadsCompositionError: MultipleOverloadsCompositionError
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
	    $__classes_47_Delta_46_js__,
	    $__classes_47_Composite_46_js__,
	    $__classes_47_Overloaded_46_js__,
	    $__classes_47_Modify_46_js__,
	    $__classes_47_basicOperations_46_js__,
	    $__classes_47_PutIntoArray_46_js__,
	    $__classes_47_PutIntoFunction_46_js__,
	    $__classes_47_DeltaModel_46_js__;
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
	var defineDelta = ($__classes_47_Delta_46_js__ = __webpack_require__(7), $__classes_47_Delta_46_js__ && $__classes_47_Delta_46_js__.__esModule && $__classes_47_Delta_46_js__ || {default: $__classes_47_Delta_46_js__}).default;
	var defineComposite = ($__classes_47_Composite_46_js__ = __webpack_require__(8), $__classes_47_Composite_46_js__ && $__classes_47_Composite_46_js__.__esModule && $__classes_47_Composite_46_js__ || {default: $__classes_47_Composite_46_js__}).default;
	var defineOverloaded = ($__classes_47_Overloaded_46_js__ = __webpack_require__(9), $__classes_47_Overloaded_46_js__ && $__classes_47_Overloaded_46_js__.__esModule && $__classes_47_Overloaded_46_js__ || {default: $__classes_47_Overloaded_46_js__}).default;
	var defineModify = ($__classes_47_Modify_46_js__ = __webpack_require__(10), $__classes_47_Modify_46_js__ && $__classes_47_Modify_46_js__.__esModule && $__classes_47_Modify_46_js__ || {default: $__classes_47_Modify_46_js__}).default;
	var defineBasicOperations = ($__classes_47_basicOperations_46_js__ = __webpack_require__(11), $__classes_47_basicOperations_46_js__ && $__classes_47_basicOperations_46_js__.__esModule && $__classes_47_basicOperations_46_js__ || {default: $__classes_47_basicOperations_46_js__}).default;
	var definePutIntoArray = ($__classes_47_PutIntoArray_46_js__ = __webpack_require__(12), $__classes_47_PutIntoArray_46_js__ && $__classes_47_PutIntoArray_46_js__.__esModule && $__classes_47_PutIntoArray_46_js__ || {default: $__classes_47_PutIntoArray_46_js__}).default;
	var definePutIntoFunction = ($__classes_47_PutIntoFunction_46_js__ = __webpack_require__(13), $__classes_47_PutIntoFunction_46_js__ && $__classes_47_PutIntoFunction_46_js__.__esModule && $__classes_47_PutIntoFunction_46_js__ || {default: $__classes_47_PutIntoFunction_46_js__}).default;
	var defineDeltaModel = ($__classes_47_DeltaModel_46_js__ = __webpack_require__(14), $__classes_47_DeltaModel_46_js__ && $__classes_47_DeltaModel_46_js__.__esModule && $__classes_47_DeltaModel_46_js__ || {default: $__classes_47_DeltaModel_46_js__}).default;
	var $__default = U.newClass(function DeltaJs() {
	  this.compositions = [];
	  this._onNewOperationTypeListeners = [];
	  defineDelta(this);
	  defineComposite(this);
	  defineOverloaded(this);
	  defineModify(this);
	  defineBasicOperations(this);
	  definePutIntoArray(this);
	  definePutIntoFunction(this);
	  defineDeltaModel(this);
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
	    var $__14;
	    var $__13 = this;
	    if (typeof Superclass === 'string') {
	      ($__14 = [undefined, Superclass, name], Superclass = $__14[0], name = $__14[1], prototype = $__14[2], $__14);
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
	        var judgment = thisDeltaJs._evaluatePrecondition(this, target);
	        if (judgment !== true) {
	          throw judgment;
	        }
	        if (U.isDefined(prototype.applyTo)) {
	          prototype.applyTo.call(this, target);
	        }
	      }}));
	    cls.type = cls.prototype.type = name;
	    cls.meta = cls.prototype.meta = {methods: prototype.methods || [name[0].toLowerCase() + name.slice(1)]};
	    cls.meta.methods.forEach((function(method) {
	      if (!Array.isArray($__13.overloads[method])) {
	        $__13.overloads[method] = [];
	      }
	      $__13.overloads[method].push(name);
	    }));
	    this._onNewOperationTypeListeners.forEach((function(fn) {
	      fn(cls);
	    }));
	    return cls;
	  },
	  onNewOperationType: function(fn) {
	    var $__13 = this;
	    this._onNewOperationTypeListeners.push(fn);
	    Object.keys(this.Delta).forEach((function(name) {
	      if (name[0] === name[0].toUpperCase()) {
	        fn($__13.Delta[name]);
	      }
	    }));
	  },
	  newComposition: function(precondition, compose) {
	    this.compositions.push({
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
	    var success = this.compositions.some((function($__14) {
	      var $__15 = $__14,
	          precondition = $__15.precondition,
	          fn = $__15.compose;
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
	  __esModule: {value: true}
	});
	var $__misc_46_js__;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var ApplicationError = U.newSubclass(Error, (function(superFn) {
	  return function ApplicationError(delta, value) {
	    superFn.call(this, ("This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "."));
	    this.delta = delta;
	    this.value = value;
	  };
	}));
	var MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function MultipleOverloadsApplicationError(delta, value) {
	    var errors = arguments[2] !== (void 0) ? arguments[2] : [];
	    superFn.call(this, delta, value);
	    this.errors = errors;
	    this.message = ("None of these deltas of types " + delta.overloads.map((function(d) {
	      return "'" + d.type + "'";
	    })).join(',') + " can apply to this value of type '" + typeof value + ".") + errors.map((function(e) {
	      return ("\n-- " + e.message);
	    })).join('');
	  };
	}));
	var NoOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function NoOverloadsApplicationError(delta, value) {
	    superFn.call(this, delta, value);
	    this.message = ("This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".");
	  };
	}));
	var DeltaArgApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	  return function DeltaArgApplicationError(delta, baseDelta) {
	    superFn.call(this, delta, baseDelta.arg);
	    this.message = ("This delta of type '" + delta.type + "' cannot apply to the type-'" + typeof baseDelta.arg + "'-value of this base delta of type '" + baseDelta.type + "'.");
	    this.baseDelta = baseDelta;
	  };
	}));
	var CompositionError = U.newSubclass(Error, (function(superFn) {
	  return function CompositionError(delta1, delta2) {
	    superFn.call(this, ("This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "."));
	    this.delta1 = delta1;
	    this.delta2 = delta2;
	  };
	}));
	var MultipleOverloadsCompositionError = U.newSubclass(CompositionError, (function(superFn) {
	  return function MultipleOverloadsCompositionError(delta1, delta2) {
	    var errors = arguments[2] !== (void 0) ? arguments[2] : [];
	    superFn.call(this, delta1, delta2);
	    this.errors = errors;
	    this.message = ("There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'.") + errors.map((function(e) {
	      return ("\n-- " + e.message);
	    })).join('');
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
	    $___46__46__47_Target_46_js__;
	var U = ($___46__46__47_misc_46_js__ = __webpack_require__(1), $___46__46__47_misc_46_js__ && $___46__46__47_misc_46_js__.__esModule && $___46__46__47_misc_46_js__ || {default: $___46__46__47_misc_46_js__}).default;
	var $__1 = ($___46__46__47_Target_46_js__ = __webpack_require__(3), $___46__46__47_Target_46_js__ && $___46__46__47_Target_46_js__.__esModule && $___46__46__47_Target_46_js__ || {default: $___46__46__47_Target_46_js__}),
	    ReadableTarget = $__1.ReadableTarget,
	    wt = $__1.wt;
	var $__default = (function(deltaJs) {
	  if (U.isDefined(deltaJs.Delta)) {
	    return;
	  }
	  deltaJs._nextDeltaUUID = 0;
	  deltaJs.Delta = U.newClass(function Delta(arg, meta) {
	    this.arg = arg;
	    this.meta = U.extend({}, meta || {}, {uuid: deltaJs._nextDeltaUUID++});
	  }, {
	    clone: function() {
	      return new this.constructor(this.arg, this.meta);
	    },
	    appliedTo: function(value) {
	      if (value instanceof ReadableTarget) {
	        value = value.value;
	      }
	      if (typeof value.clone === 'function') {
	        value = value.clone();
	      }
	      var obj = {value: value};
	      this.applyTo(wt(obj, 'value'));
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
	      var newDeltas = this.overloads[method].map((function(type) {
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
	    facade: function() {
	      return deltaJs.facade(this);
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
	          return deltaJs.facade((newDelta instanceof deltaJs.Delta.Composite) ? newDelta : this.delta);
	        };
	      }
	    }));
	  }));
	  deltaJs.facade = function facade(delta) {
	    var fcd = function() {
	      for (var args = [],
	          $__3 = 0; $__3 < arguments.length; $__3++)
	        args[$__3] = arguments[$__3];
	      var result = facade(delta);
	      result._args = fcd._args.concat(args);
	      return result;
	    };
	    fcd._args = [];
	    U.extend(fcd, operationMethods, {
	      _applyOperationMethod: function(method) {
	        for (var finalArgs = [],
	            $__4 = 1; $__4 < arguments.length; $__4++)
	          finalArgs[$__4 - 1] = arguments[$__4];
	        return delta.operation.apply(delta, [method].concat(fcd._args).concat(finalArgs));
	      },
	      delta: delta
	    });
	    return fcd;
	  };
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
	  deltaJs.overloads = {};
	  deltaJs.Delta.Overloaded = U.newSubclass(deltaJs.Delta, (function(superFn) {
	    return function Overloaded(arg, meta) {
	      superFn.call(this, arg, meta);
	      this.overloads = [];
	    };
	  }), {
	    clone: function() {
	      var result = deltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      result.overloads = this.overloads.map((function(delta) {
	        return delta.clone();
	      }));
	      return result;
	    },
	    applyTo: function(target) {
	      var errors = [];
	      var success = this.overloads.some((function(delta) {
	        var judgment = deltaJs._evaluatePrecondition(delta, target);
	        if (judgment !== true) {
	          errors.push(judgment);
	          return false;
	        }
	        delta.applyTo(target);
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
	  deltaJs.Delta.Overloaded.type = deltaJs.Delta.Overloaded.prototype.type = 'Overloaded';
	  deltaJs.Delta.Overloaded.meta = deltaJs.Delta.Overloaded.prototype.meta = {methods: []};
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
	  deltaJs.Delta.Modify = U.newSubclass(deltaJs.Delta.Composite, (function(superFn) {
	    return function Modify(__, meta) {
	      superFn.call(this, __, meta);
	      this.deltas = {};
	    };
	  }), {
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
	      var $__4 = this;
	      Object.keys(this.deltas).forEach((function(prop) {
	        $__4.deltas[prop].applyTo(wt(target.value, prop));
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
	  deltaJs.Delta.Modify.type = deltaJs.Delta.Modify.prototype.type = 'Modify';
	  deltaJs.Delta.Modify.meta = deltaJs.Delta.Modify.prototype.meta = {methods: ['modify']};
	  deltaJs._onNewOperationTypeListeners.forEach((function(fn) {
	    fn(deltaJs.Delta.Modify);
	  }));
	  if (!Array.isArray(deltaJs.overloads['modify'])) {
	    deltaJs.overloads['modify'] = [];
	  }
	  deltaJs.overloads['modify'].push('Modify');
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
	      this.graph.topologically((function(name, subDelta) {
	        subDelta.applyTo(target);
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
	      var before = options.before;
	      var deltaBase = delta;
	      if (path.prop) {
	        deltaBase = new deltaJs.Delta.Modify();
	        deltaBase._addOperation(options, path, delta);
	      }
	      U.assert(!this.graph.vertexValue(name), ("A delta by the name “" + name + "” is already in this delta model."));
	      this.graph.addVertex(name, deltaBase);
	      (before || []).forEach((function(subordinateName) {
	        $__4.graph.createEdge(subordinateName, name);
	      }));
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


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZmNmMTQyNGJmNzM5NjkwMjBhNSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9EZWx0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9Db21wb3NpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvT3ZlcmxvYWRlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9Nb2RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFzaWNPcGVyYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL1B1dEludG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9QdXRJbnRvRnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvRGVsdGFNb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUNyQ0E7QUNEQSxNQUFLLGlCQUFrQixDQUFDLE9BQU07VUNBOUIsRUFBQyxHQUFFLFlDQXFCO0FBQUUsd0JBQXdCO0tEQTVCLENBQUM7QUVBdkIsWUFBUyxDQ0FULEVBQUMsS0FBSSxDREFPLEtDQVksQ0FBQztFSkF5QixDQUFDOzs7Ozs7R0RDNUMsSU1EUCxFQUFDLGlCQUFvQixxQkFBTyxFQUFrQixDQUN0QyxtQkFBcUIsMkJBQTJCLG1CQUFxQixHQUFLLEVBQUMsT0FBTSxpQkFBbUIsQ0FBQyxDQUFDO0dOSXZHLFFBQU0sRU1MYixFQUFDLG9CQUFvQixxQkFBTyxFQUFrQixDQUN0QyxzQkFBcUIsOEJBQTJCLHNCQUFxQixHQUFLLEVBQUMsT0FBTSxvQkFBbUIsQ0FBQyxDQUFDO1VBRDlHLEVBQUMsbUJBQW9CLHFCQUFPLEVBQWtCLENBQ3RDLHFC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LE9BQUssQ0FBQztHQUNkLEVBQUMsQ0FBQztBQUVILEVoQnhHaUM7QWdCeUdqQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZmNmMTQyNGJmNzM5NjkwMjBhNVxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIG1ha2UgVGFyZ2V0IGNsYXNzZXMgYXZhaWxhYmxlIHVuZGVyIHRoZSBEZWx0YUpzIHN5bWJvbCAqL1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXR9IGZyb20gJy4vVGFyZ2V0LmpzJztcblUuZXh0ZW5kKERlbHRhSnMsIHsgUmVhZGFibGVUYXJnZXQsIFdyaXRhYmxlVGFyZ2V0IH0pO1xuXG5cbi8qIG1ha2UgUGF0aCBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IFBhdGggfSk7XG5cblxuLyogbWFrZSBFcnJvciBjbGFzc2VzIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cbmltcG9ydCB7QXBwbGljYXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciwgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRcdENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi9FcnJvci5qcyc7XG5VLmV4dGVuZChEZWx0YUpzLCB7IEFwcGxpY2F0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICAgICAgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIENvbXBvc2l0aW9uRXJyb3IsIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciB9KTtcblxuXG4vKiBleHBvcnQgdGhlIERlbHRhSnMgY2xhc3MgKi9cbmV4cG9ydCBkZWZhdWx0IERlbHRhSnM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvN1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNVxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvM1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNlxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMVxuICoqLyIsInZhciBVID0ge1xuXG5cdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH1cblxuXHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdHJldHVybiBjbHM7XG5cblx0fSxcblxuXHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmoxO1xuXHR9LFxuXG5cdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRyZXR1cm4gbmV3X29iajtcblx0fSxcblxuXHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdH0sXG5cblx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9LFxuXG5cdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvXig/IVxccyokKS9tZywgVS5yZXBlYXQoYW1vdW50LCBjaGFyKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci84XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci85XG4gKiovIiwiLyogaW1wb3J0IGV4dGVybmFsIGxpYnJhcmllcyAqL1xuaW1wb3J0IEpzR3JhcGggZnJvbSAnanMtZ3JhcGgnO1xuXG5cbi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICBmcm9tICcuL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICBmcm9tICcuL1BhdGguanMnO1xuaW1wb3J0IHtSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi9UYXJnZXQuanMnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkVycm9yLCBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLCBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Q29tcG9zaXRpb25FcnJvciwgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yfSBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgZnJvbSAnLi9jbGFzc2VzL0RlbHRhLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgICAgICAgZnJvbSAnLi9jbGFzc2VzL0NvbXBvc2l0ZS5qcyc7XG5pbXBvcnQgZGVmaW5lT3ZlcmxvYWRlZCAgICAgIGZyb20gJy4vY2xhc3Nlcy9PdmVybG9hZGVkLmpzJztcbmltcG9ydCBkZWZpbmVNb2RpZnkgICAgICAgICAgZnJvbSAnLi9jbGFzc2VzL01vZGlmeS5qcyc7XG5pbXBvcnQgZGVmaW5lQmFzaWNPcGVyYXRpb25zIGZyb20gJy4vY2xhc3Nlcy9iYXNpY09wZXJhdGlvbnMuanMnO1xuaW1wb3J0IGRlZmluZVB1dEludG9BcnJheSAgICBmcm9tICcuL2NsYXNzZXMvUHV0SW50b0FycmF5LmpzJztcbmltcG9ydCBkZWZpbmVQdXRJbnRvRnVuY3Rpb24gZnJvbSAnLi9jbGFzc2VzL1B1dEludG9GdW5jdGlvbi5qcyc7XG5pbXBvcnQgZGVmaW5lRGVsdGFNb2RlbCAgICAgIGZyb20gJy4vY2xhc3Nlcy9EZWx0YU1vZGVsLmpzJztcblxuXG4vKioge0BjbGFzc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdHRoaXMuY29tcG9zaXRpb25zID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXHRkZWZpbmVEZWx0YSAgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUNvbXBvc2l0ZSAgICAgICh0aGlzKTtcblx0ZGVmaW5lT3ZlcmxvYWRlZCAgICAgKHRoaXMpO1xuXHRkZWZpbmVNb2RpZnkgICAgICAgICAodGhpcyk7XG5cdGRlZmluZUJhc2ljT3BlcmF0aW9ucyh0aGlzKTtcblx0ZGVmaW5lUHV0SW50b0FycmF5ICAgKHRoaXMpO1xuXHRkZWZpbmVQdXRJbnRvRnVuY3Rpb24odGhpcyk7XG5cdGRlZmluZURlbHRhTW9kZWwgICAgICh0aGlzKTtcblxufSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyB7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGFKcy5wcm90b3R5cGUgKi9cblxuXHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0Ly8gKlxuXHQvLyAqL1xuXHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdC8vXHQvLyBUT0RPXG5cdC8vfSxcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHQgKiBAcmV0dXJuIHtCb29sZWFufEFwcGxpY2F0aW9uRXJyb3J9IC0gYHRydWVgIGlmIHRoZSBwcmVjb25kaXRpb24gaXMgc2F0aXNmaWVkLCBvdGhlcndpc2Vcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgb3IgYW4gaW5zdGFuY2Ugb2YgYERlbHRhSnMuQXBwbGljYXRpb25FcnJvcmBcblx0ICovXG5cdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0aWYgKHR5cGVvZiBkZWx0YS5wcmVjb25kaXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25FcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKCFqdWRnbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIG5hbWUgICAgICB7U3RyaW5nfVxuXHQgKiBAcGFyYW0gcHJvdG90eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdGlmICh0eXBlb2YgU3VwZXJjbGFzcyA9PT0gJ3N0cmluZycpIHsgW1N1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZV0gPSBbdW5kZWZpbmVkLCBTdXBlcmNsYXNzLCBuYW1lXSB9XG5cdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRVLmFzc2VydChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRgRGVsdGEgb3BlcmF0aW9ucyBtdXN0IGhhdmUgYSBuYW1lIHN0YXJ0aW5nIHdpdGggYSBjYXBpdGFsIGxldHRlciAtLSAnJHtuYW1lfScgZG9lcyBub3QuYCk7XG5cdFx0VS5hc3NlcnQoIXRoaXMuRGVsdGFbbmFtZV0sXG5cdFx0XHRgVGhlICcke25hbWV9JyBvcGVyYXRpb24gdHlwZSBhbHJlYWR5IGV4aXN0cy5gKTtcblxuXHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IHRoaXMuRGVsdGFbbmFtZV0gPSBVLm5ld1N1YmNsYXNzKFN1cGVyY2xhc3MgfHwgdGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7IHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0KSB9XG5cdFx0XHR9XG5cdFx0fSkpO1xuXHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRjbHMubWV0YSA9IGNscy5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHR9O1xuXG5cdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0Y2xzLm1ldGEubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1ttZXRob2RdKSkgeyB0aGlzLm92ZXJsb2Fkc1ttZXRob2RdID0gW10gfVxuXHRcdFx0dGhpcy5vdmVybG9hZHNbbWV0aG9kXS5wdXNoKG5hbWUpO1xuXHRcdH0pO1xuXG5cdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRyZXR1cm4gY2xzO1xuXG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHQgKi9cblx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdE9iamVjdC5rZXlzKHRoaXMuRGVsdGEpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcblx0XHRcdFx0Zm4odGhpcy5EZWx0YVtuYW1lXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdCAqIEBwYXJhbSBkMiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgc2Vjb25kIGRlbHRhXG5cdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdCAqL1xuXHRjb21wb3NlZChkMSwgZDIpIHtcblx0XHQvKiBoYW5kbGUgdGhlIGNhc2VzIHdoZXJlIG9uZSBvciBib3RoIGFyZ3VtZW50cyBhcmUgdW5kZWZpbmVkICovXG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMuRGVsdGEuTm9PcCgpIH1cblx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMikpIHsgZDIgPSBuZXcgdGhpcy5EZWx0YS5Ob09wKCkgfVxuXG5cdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLmNvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdHJldHVybiBjb21wb3NlRm4oZDEsIGQyKTtcblx0fVxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL0RlbHRhSnMuanNcbiAqKi8iLCJpbXBvcnQgVSBmcm9tICcuL21pc2MuanMnO1xuXG5leHBvcnQgdmFyIFJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0dGhpcy5fdmFsID0gdmFsdWU7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH1cbn0pO1xuXG5leHBvcnQgdmFyIFdyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0dGhpcy5fb2JqICA9IG9iajtcblx0dGhpcy5fcHJvcCA9IHByb3A7XG59LCB7XG5cdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxufSk7XG5cblJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIGNoYWluKHByb3ApIHtcblx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cbmV4cG9ydCBmdW5jdGlvbiBydChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBSZWFkYWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL1RhcmdldC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxudmFyIFBhdGggPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChzdHIgPSBcIlwiKSB7XG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRVLmFzc2VydChtYXRjaCwgYFRoZSBwYXRoIHN0cmluZyAnJHtzdHJ9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0Ly8gVGhlICMgc2VwYXJhdG9yIGlzIHVzZWQgaW4gdGhlIEpzRG9jIHNlbnNlLCBhbmQgaXMgdHJhbnNsYXRlZCB0byAnLihpbnN0YW5jZSkuJ1xuXHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdH1cblx0fVxufSwge1xuXHRzZXQob3RoZXIpIHtcblx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHR9LFxuXHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG5cblxuLy8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvUGF0aC5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmApO1xuXHR0aGlzLmRlbHRhID0gZGVsdGE7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUsIGVycm9ycyA9IFtdKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0dGhpcy5tZXNzYWdlID0gYE5vbmUgb2YgdGhlc2UgZGVsdGFzIG9mIHR5cGVzICR7ZGVsdGEub3ZlcmxvYWRzLm1hcChkID0+IFwiJ1wiK2QudHlwZStcIidcIikuam9pbignLCcpfSBjYW4gYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYCArXG5cdGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG59KTtcblxuZXhwb3J0IHZhciBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBoYXMgbm8gc3BjaWZpYyBkZWx0YXMgYXNzaWduZWQgdG8gaXQsIHNvIGl0IGNhbm5vdCBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gO1xufSk7XG5cbmV4cG9ydCB2YXIgRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gRGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCBiYXNlRGVsdGEpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTtcblx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoZSB0eXBlLScke3R5cGVvZiBiYXNlRGVsdGEuYXJnfSctdmFsdWUgb2YgdGhpcyBiYXNlIGRlbHRhIG9mIHR5cGUgJyR7YmFzZURlbHRhLnR5cGV9Jy5gO1xuXHR0aGlzLmJhc2VEZWx0YSA9IGJhc2VEZWx0YTtcbn0pO1xuXG5leHBvcnQgdmFyIENvbXBvc2l0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMikge1xuXHRzdXBlckZuLmNhbGwodGhpcywgYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTEudHlwZX0nIGNhbm5vdCBiZSBjb21wb3NlZCB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0uYCk7XG5cdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHR0aGlzLmRlbHRhMiA9IGRlbHRhMjtcbn0pO1xuXG5leHBvcnQgdmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkZWx0YTEsIGRlbHRhMiwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhMSwgZGVsdGEyKTtcblx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGVyZSBhcmUgbm8gb3ZlcmxvYWRzIHRvIGNvbXBvc2UgdGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9Jy5gICtcblx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRXJyb3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbWlzYy5qcyc7XG5pbXBvcnQge1JlYWRhYmxlVGFyZ2V0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YSkpIHsgcmV0dXJuIH1cblxuXHRkZWx0YUpzLl9uZXh0RGVsdGFVVUlEID0gMDtcblxuXHQvKioge0BjbGFzc31cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhKGFyZywgbWV0YSkge1xuXHRcdHRoaXMuYXJnID0gYXJnO1xuXHRcdHRoaXMubWV0YSA9IFUuZXh0ZW5kKHt9LCBtZXRhIHx8IHt9LCB7IHV1aWQ6IGRlbHRhSnMuX25leHREZWx0YVVVSUQrKyB9KTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlIHsqfSAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEByZXR1cm4geyp9IC0gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHQgKi9cblx0XHRhcHBsaWVkVG8odmFsdWUpIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSAgIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSAgIH1cblx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHR0aGlzLmFwcGx5VG8od3Qob2JqLCAndmFsdWUnKSk7XG5cdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIGRlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdD99XG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0dmFyIHN0ciA9IHRoaXMudHlwZTtcblx0XHRcdGlmICh0aGlzLm1ldGEudGFyZ2V0UHJvcCkgIHsgc3RyICs9IGAg4oC5JHt0aGlzLm1ldGEudGFyZ2V0UHJvcH3igLpgIH1cblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0aWYgKG9wdGlvbnMuZGVidWcpICAgICAgICAgeyBzdHIgKz0gYCAoJHt0aGlzLm1ldGEudXVpZH0pYCB9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cdH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzZXMvRGVsdGEuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSBmcm9tICcuL0RlbHRhLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgKGRlbHRhSnMpID0+IHtcblx0aWYgKFUuaXNEZWZpbmVkKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlKSkgeyByZXR1cm4gfVxuXG5cdGRlZmluZURlbHRhKGRlbHRhSnMpO1xuXG5cblxuXHQvKioge0Bwcm90ZWN0ZWR9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBtZXRob2Qge1N0cmluZ31cblx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0ICovXG5cdFUuZXh0ZW5kKGRlbHRhSnMuY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG5cdFx0X2dldERlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcpIHtcblx0XHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLm92ZXJsb2Fkc1ttZXRob2RdXG5cdFx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLkRlbHRhW3R5cGVdKGFyZywgeyBtZXRob2QgfSkpO1xuXHRcdFx0aWYgKG5ld0RlbHRhcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHRcdH0gZWxzZSB7IC8vIG5ld0RlbHRhcy5sZW5ndGggPiAxXG5cdFx0XHRcdHZhciBkZWx0YSA9IG5ldyB0aGlzLkRlbHRhLk92ZXJsb2FkZWQoYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvKioge0BjbGFzc31cblx0ICpcblx0ICovXG5cdGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlID0gVS5uZXdTdWJjbGFzcyhkZWx0YUpzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQ29tcG9zaXRlKC4uLmFyZ3MpIHtcblx0XHRzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9LCB7XG5cdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9XG5cdFx0ICogSW1wbGVtZW50IHRoaXMgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIERlbHRhLkNvbXBvc2l0ZSBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRmYWNhZGUoKSB7IHJldHVybiBkZWx0YUpzLmZhY2FkZSh0aGlzKSB9LFxuXHR9KTtcblxuXHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXHRkZWx0YUpzLm9uTmV3T3BlcmF0aW9uVHlwZSgoY2xzKSA9PiB7XG5cdFx0KGNscy5tZXRhICYmIGNscy5tZXRhLm1ldGhvZHMgfHwgW10pLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kLmFwcGx5KHRoaXMsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRcdFx0cmV0dXJuIGRlbHRhSnMuZmFjYWRlKFxuXHRcdFx0XHRcdFx0KG5ld0RlbHRhIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5Db21wb3NpdGUpID8gbmV3RGVsdGEgOiB0aGlzLmRlbHRhXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0ICogQHBhcmFtIGRlbHRhIHtDb21wb3NpdGV9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHQgKiBAcmV0dXJuIHtDb21wb3NpdGV9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdCAqL1xuXHRkZWx0YUpzLmZhY2FkZSA9IGZ1bmN0aW9uIGZhY2FkZShkZWx0YSkge1xuXHRcdC8qIHRoZSBmYWNhZGUgaXRzZWxmICovXG5cdFx0Ly8gVGhlIGZhY2FkZSBvYmplY3QgZXhwb3NlcyBvcGVyYXRpb25zIG1ldGhvZHMgZGlyZWN0bHksIGJ1dCBhcmd1bWVudHMgdG9cblx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdC8vIFRoZXJlZm9yZSwgYSBmYWNhZGUgaXMgYSBmdW5jdGlvbiwgc3RvcmluZyBhcmd1bWVudHMgdGhhdCBhcmUgYWxyZWFkeSBnaXZlbi5cblx0XHR2YXIgZmNkID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdHZhciByZXN1bHQgPSBmYWNhZGUoZGVsdGEpO1xuXHRcdFx0cmVzdWx0Ll9hcmdzID0gZmNkLl9hcmdzLmNvbmNhdChhcmdzKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblx0XHRmY2QuX2FyZ3MgPSBbXTtcblx0XHRVLmV4dGVuZChmY2QsIG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHRcdFx0XHRyZXR1cm4gZGVsdGEub3BlcmF0aW9uLmFwcGx5KGRlbHRhLCBbbWV0aG9kXS5jb25jYXQoZmNkLl9hcmdzKS5jb25jYXQoZmluYWxBcmdzKSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsdGFcblx0XHR9KTtcblx0XHRyZXR1cm4gZmNkO1xuXHR9O1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3Nlcy9Db21wb3NpdGUuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IGRlZmluZURlbHRhIGZyb20gJy4vRGVsdGEuanMnO1xuaW1wb3J0IHtNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdFx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHRcdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcn0gZnJvbSAnLi4vRXJyb3IuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lRGVsdGEoZGVsdGFKcyk7XG5cblx0ZGVsdGFKcy5vdmVybG9hZHMgPSB7fTsgLy8gbWV0aG9kIC0+IFtkZWx0YS1jbGFzc2VzXVxuXG5cdGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCA9IFUubmV3U3ViY2xhc3MoZGVsdGFKcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE92ZXJsb2FkZWQoYXJnLCBtZXRhKSB7XG5cdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0dGhpcy5vdmVybG9hZHMgPSBbXTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtPdmVybG9hZGVkfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdCAqL1xuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHRhcmdldCB7V3JpdGFibGVUYXJnZXR9XG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdC8qIGFwcGx5IHRoZSBmaXJzdCBvdmVybG9hZCB0aGF0IGFwcGxpZXMgdG8gdGhlIHRhcmdldDsgZ2F0aGVyIGFueSBlcnJvcnMgKi9cblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gZGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fVxuXHR9KTtcblxuXHRkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQudHlwZSA9IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZC5wcm90b3R5cGUudHlwZSA9ICdPdmVybG9hZGVkJztcblx0ZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkLm1ldGEgPSBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQucHJvdG90eXBlLm1ldGEgPSB7IG1ldGhvZHM6IFtdIH07XG5cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgfHwgZDIgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLk92ZXJsb2FkZWQgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgZGVsdGFKcy5EZWx0YS5PdmVybG9hZGVkID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHR2YXIgcmVzdWx0ID0gbmV3IGRlbHRhSnMuRGVsdGEuT3ZlcmxvYWRlZCgpO1xuXHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IoZDEsIGQyLCBlcnJvcnMpIH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzZXMvT3ZlcmxvYWRlZC5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgZnJvbSAnLi4vUGF0aC5qcyc7XG5pbXBvcnQge3d0fSAgICAgICAgICAgIGZyb20gJy4uL1RhcmdldC5qcyc7XG5pbXBvcnQgZGVmaW5lQ29tcG9zaXRlIGZyb20gJy4vQ29tcG9zaXRlLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5Nb2RpZnkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdGRlbHRhSnMuRGVsdGEuTW9kaWZ5ID0gVS5uZXdTdWJjbGFzcyhkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE1vZGlmeShfXywgbWV0YSkge1xuXHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBfXywgbWV0YSk7XG5cdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtNb2RpZnl9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQge1dyaXRhYmxlVGFyZ2V0fVxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHR0aGlzLmRlbHRhc1twcm9wXS5hcHBseVRvKHd0KHRhcmdldC52YWx1ZSwgcHJvcCkpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0P31cblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0dmFyIHN0ciA9IGRlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fSAtIHRoZSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBwYXRoIHtTdHJpbmd9ICAgIC0gdGhlIHBhdGggdG8gd2hpY2ggdG8gYXBwbHkgdGhpcyBvcGVyYXRpb25cblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdCAqL1xuXHRcdG9wZXJhdGlvbihtZXRob2QsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgeyBbb3B0aW9ucywgcGF0aCwgYXJnXSA9IFt7fSwgb3B0aW9ucywgcGF0aF0gfVxuXHRcdFx0dmFyIGRlbHRhID0gZGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIG5ldyBQYXRoKHBhdGgpLCBkZWx0YSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH1cblx0XHQgKiBAcGFyYW0gcGF0aCAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb24oJ21vZGlmeScsIHBhdGgucHJvcClcblx0XHRcdFx0XHRcdC5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIHBhdGgucmVzdCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0dGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA9IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdLmNvbXBvc2VkV2l0aChkZWx0YSkgOiBkZWx0YTtcblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ubWV0YS50YXJnZXRQcm9wID0gcGF0aC5wcm9wO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIGNvbXBvc2VkIGRlbHRhIGlmIGl0IGhhcyBhbiBvcGVyYXRpb25zIGludGVyZmFjZTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhlIGdpdmVuIGRlbHRhICovXG5cdFx0XHRyZXR1cm4gKHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gaW5zdGFuY2VvZiBkZWx0YUpzLkRlbHRhLkNvbXBvc2l0ZSkgPyB0aGlzLmRlbHRhc1twYXRoLnByb3BdIDogZGVsdGE7XG5cdFx0fVxuXHR9KTtcblx0ZGVsdGFKcy5EZWx0YS5Nb2RpZnkudHlwZSA9IGRlbHRhSnMuRGVsdGEuTW9kaWZ5LnByb3RvdHlwZS50eXBlID0gJ01vZGlmeSc7XG5cdGRlbHRhSnMuRGVsdGEuTW9kaWZ5Lm1ldGEgPSBkZWx0YUpzLkRlbHRhLk1vZGlmeS5wcm90b3R5cGUubWV0YSA9IHsgbWV0aG9kczogWydtb2RpZnknXSB9O1xuXHRkZWx0YUpzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oZGVsdGFKcy5EZWx0YS5Nb2RpZnkpIH0pO1xuXG5cdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoZGVsdGFKcy5vdmVybG9hZHNbJ21vZGlmeSddKSkgeyBkZWx0YUpzLm92ZXJsb2Fkc1snbW9kaWZ5J10gPSBbXSB9XG5cdGRlbHRhSnMub3ZlcmxvYWRzWydtb2RpZnknXS5wdXNoKCdNb2RpZnknKTtcblxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3Nlcy9Nb2RpZnkuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVEZWx0YSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vRGVsdGEuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkKSkgeyByZXR1cm4gfVxuXHRkZWx0YUpzLl9iYXNpY09wZXJhdGlvbnNEZWZpbmVkID0gdHJ1ZTtcblxuXHRkZWZpbmVEZWx0YShkZWx0YUpzKTtcblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKioqKioqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIG5vLW9wIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHR2YXIgTm9PcCA9IGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZSgnTm9PcCcpO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0W1xuXHRcdFsnQWRkJywgICAgICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XS5mb3JFYWNoKChbVHlwZSwgdHlwZSwgcHJlXSkgPT4ge1xuXHRcdC8vIEluIHRoZSBsaW5lIGRpcmVjdGx5IGJlbG93LCAndGhpcycgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiB0cmFjZXVyOlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdGRlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCk7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyh0YXJnZXQpICAgICAgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKHYsIGQpID0+IGQuYXBwbGllZFRvKHYpLCB0aGlzLmFyZykgfSxcblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRpZiAocmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKGQxLCBkMikgPT4gZGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0ICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdGhpcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3Q/fVxuXHRcdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBkZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG9wdGlvbnMpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9KTtcblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdH0pO1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSBkZWx0YUpzLmNvbXBvc2VkKHJlc3VsdC5kZWx0YXNbcHJvcF0sIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1JlbW92ZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZW1vdmUnLCAnQWRkJyAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICk7XG5cblx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdBZGQnICAgKSwgZCgnQWRkJywgKHtwMn0pID0+IHAyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3Nlcy9iYXNpY09wZXJhdGlvbnMuanNcbiAqKi8iLCIvKiBpbXBvcnQgaW50ZXJuYWwgc3R1ZmYgKi9cbmltcG9ydCBVICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IHtXcml0YWJsZVRhcmdldCwgUmVhZGFibGVUYXJnZXQsIHJ0LCB3dH0gZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCB7RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yfSAgICAgICAgICAgICAgIGZyb20gJy4uL0Vycm9yLmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vYmFzaWNPcGVyYXRpb25zLmpzJztcblxuXG5leHBvcnQgZGVmYXVsdCAoZGVsdGFKcykgPT4ge1xuXHRpZiAoVS5pc0RlZmluZWQoZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQmFzaWNPcGVyYXRpb25zKGRlbHRhSnMpO1xuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyBkZWx0YUpzLkRlbHRhW3R5cGVdKGZuICYmIGZuKHtkMSwgZDIsIHAxOiBkMS5hcmcsIHAyOiBkMi5hcmd9KSk7XG5cdH1cblxuXHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRkZWx0YUpzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLnZhbHVlcyA9IHRoaXMubWV0YS5tZXRob2QgP1xuXHRcdFx0XHRbeyBtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsIHZhbHVlOiB0aGlzLmFyZyB9XSA6XG5cdFx0XHRcdFtdO1xuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9BcnJheScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdHZhciByZXN1bHQgPSBuZXcgZGVsdGFKcy5EZWx0YS5QdXRJbnRvQXJyYXkoKTtcblx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzc2VzL1B1dEludG9BcnJheS5qc1xuICoqLyIsIi8qIGltcG9ydCBpbnRlcm5hbCBzdHVmZiAqL1xuaW1wb3J0IFUgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9taXNjLmpzJztcbmltcG9ydCB7V3JpdGFibGVUYXJnZXR9ICAgICAgZnJvbSAnLi4vVGFyZ2V0LmpzJztcbmltcG9ydCBkZWZpbmVCYXNpY09wZXJhdGlvbnMgZnJvbSAnLi9iYXNpY09wZXJhdGlvbnMuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbikpIHsgcmV0dXJuIH1cblxuXHRkZWZpbmVCYXNpY09wZXJhdGlvbnMoZGVsdGFKcyk7XG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0ZnVuY3Rpb24gZCh0eXBlLCBmbikge1xuXHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3IGRlbHRhSnMuRGVsdGFbdHlwZV0oZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0fVxuXG5cdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0ZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0aWYgKHRoaXMubWV0YS5tZXRob2QpIHtcblx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHQgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdCAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmFyZ1xuICAgICAgICAgICAgICAgfV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y2xvbmUoKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0ICAgICAgIChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0fSxcblx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdH1cblx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdH0pO1xuXG5cdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRkZWx0YUpzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0ZGVsdGFKcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBkZWx0YUpzLkRlbHRhLlB1dEludG9GdW5jdGlvbigpO1xuXHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9KTtcblx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3Nlcy9QdXRJbnRvRnVuY3Rpb24uanNcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgIGZyb20gJy4uL21pc2MuanMnO1xuaW1wb3J0IFBhdGggICAgICAgICAgICBmcm9tICcuLi9QYXRoLmpzJztcbmltcG9ydCBkZWZpbmVDb21wb3NpdGUgZnJvbSAnLi9Db21wb3NpdGUuanMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IChkZWx0YUpzKSA9PiB7XG5cdGlmIChVLmlzRGVmaW5lZChkZWx0YUpzLkRlbHRhLkRlbHRhTW9kZWwpKSB7IHJldHVybiB9XG5cblx0ZGVmaW5lQ29tcG9zaXRlKGRlbHRhSnMpO1xuXG5cdHZhciBEZWx0YU1vZGVsID0gZGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKGRlbHRhSnMuRGVsdGEuQ29tcG9zaXRlLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHR9LFxuXHRcdGNsb25lKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGggPSB0aGlzLmdyYXBoLmNsb25lKCk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gbmFtZSB7U3RyaW5nfSAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0ICogQHBhcmFtIG9wdGlvbnMge09iamVjdH0gLSB0aGUgKG9wdGlvbmFsKSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvblxuXHRcdCAqIEBwYXJhbSBwYXRoIHtTdHJpbmd9ICAgIC0gdGhlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0ICovXG5cdFx0b3BlcmF0aW9uKG1ldGhvZCwgbmFtZSwgb3B0aW9ucywgcGF0aCwgYXJnKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7IFtvcHRpb25zLCBwYXRoLCBhcmddID0gW3t9LCBvcHRpb25zLCBwYXRoXSB9XG5cdFx0XHR2YXIgZGVsdGEgPSBkZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3Q/fVxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHR2YXIgc3RyID0gZGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cblx0XHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHR2YXIge2JlZm9yZX0gPSBvcHRpb25zO1xuXG5cdFx0XHR2YXIgZGVsdGFCYXNlID0gZGVsdGE7XG5cblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgZGVsdGFKcy5EZWx0YS5Nb2RpZnkoKTtcblx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBhIGRlbHRhIGJ5IHRoaXMgbmFtZSBjYW5ub3QgYWxyZWFkeSBiZSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpLFxuXHRcdFx0XHRcdGBBIGRlbHRhIGJ5IHRoZSBuYW1lIOKAnCR7bmFtZX3igJ0gaXMgYWxyZWFkeSBpbiB0aGlzIGRlbHRhIG1vZGVsLmApO1xuXG5cdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdC8qIGNvbm5lY3QgaXQgdG8gdGhlIHBhcnRpYWwgb3JkZXIgKi9cblx0XHRcdC8vIFRPRE86IG9wdGlvbnMsIHBhcnRpYWwgb3JkZXIsIGV0Yy4uLlxuXHRcdFx0KGJlZm9yZSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdHRoaXMuZ3JhcGguY3JlYXRlRWRnZShzdWJvcmRpbmF0ZU5hbWUsIG5hbWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBkZWx0YTtcblx0XHR9XG5cdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXHR9KTtcblxuXHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdEZWx0YU1vZGVsJyAqL1xuXHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdGRlbHRhSnMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgRGVsdGFNb2RlbCB8fCBkMiBpbnN0YW5jZW9mIERlbHRhTW9kZWwpLCAoZDEsIGQyKSA9PiB7XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgyLCBkMik7XG5cdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSk7XG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzc2VzL0RlbHRhTW9kZWwuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9