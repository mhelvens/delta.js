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
	var Path = ($__Path_46_js__ = __webpack_require__(4), $__Path_46_js__ && $__Path_46_js__.__esModule && $__Path_46_js__ || {default: $__Path_46_js__}).default;
	var $__4 = ($__Error_46_js__ = __webpack_require__(5), $__Error_46_js__ && $__Error_46_js__.__esModule && $__Error_46_js__ || {default: $__Error_46_js__}),
	    ApplicationError = $__4.ApplicationError,
	    MultipleOverloadsApplicationError = $__4.MultipleOverloadsApplicationError,
	    NoOverloadsApplicationError = $__4.NoOverloadsApplicationError,
	    DeltaArgApplicationError = $__4.DeltaArgApplicationError,
	    CompositionError = $__4.CompositionError,
	    MultipleOverloadsCompositionError = $__4.MultipleOverloadsCompositionError;
	U.extend(DeltaJs, {
	  WritableTarget: WritableTarget,
	  ReadableTarget: ReadableTarget,
	  Path: Path,
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
	    $__Target_46_js__,
	    $__Path_46_js__,
	    $__Error_46_js__;
	var JsGraph = ($__js_45_graph__ = __webpack_require__(6), $__js_45_graph__ && $__js_45_graph__.__esModule && $__js_45_graph__ || {default: $__js_45_graph__}).default;
	var U = ($__misc_46_js__ = __webpack_require__(1), $__misc_46_js__ && $__misc_46_js__.__esModule && $__misc_46_js__ || {default: $__misc_46_js__}).default;
	var $__2 = ($__Target_46_js__ = __webpack_require__(3), $__Target_46_js__ && $__Target_46_js__.__esModule && $__Target_46_js__ || {default: $__Target_46_js__}),
	    ReadableTarget = $__2.ReadableTarget,
	    WritableTarget = $__2.WritableTarget,
	    rt = $__2.rt,
	    wt = $__2.wt;
	var Path = ($__Path_46_js__ = __webpack_require__(4), $__Path_46_js__ && $__Path_46_js__.__esModule && $__Path_46_js__ || {default: $__Path_46_js__}).default;
	var $__4 = ($__Error_46_js__ = __webpack_require__(5), $__Error_46_js__ && $__Error_46_js__.__esModule && $__Error_46_js__ || {default: $__Error_46_js__}),
	    ApplicationError = $__4.ApplicationError,
	    MultipleOverloadsApplicationError = $__4.MultipleOverloadsApplicationError,
	    NoOverloadsApplicationError = $__4.NoOverloadsApplicationError,
	    DeltaArgApplicationError = $__4.DeltaArgApplicationError,
	    CompositionError = $__4.CompositionError,
	    MultipleOverloadsCompositionError = $__4.MultipleOverloadsCompositionError;
	var $__default = U.newClass(function DeltaJs() {
	  var $__5 = this;
	  var thisDeltaJs = this;
	  this.operations = {};
	  this.compositions = [];
	  this._onNewOperationTypeListeners = [];
	  var nextUUID = 1;
	  var Delta = this.Delta = U.newClass(function(arg, meta) {
	    this.arg = arg;
	    this.meta = U.extend({}, meta || {}, {uuid: nextUUID++});
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
	      return thisDeltaJs.composed(this, other);
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
	  var CompositeDelta = this.operations.CompositeDelta = U.newSubclass(Delta, {operation: function() {
	      throw new Error("A CompositeDelta subclass needs to implement the 'operation' method.");
	    }});
	  ((function() {
	    var operationMethods = {};
	    $__5.onNewOperationType((function(cls) {
	      (cls.meta && cls.meta.methods || []).forEach((function(method) {
	        if (U.isUndefined(operationMethods[method])) {
	          operationMethods[method] = function() {
	            for (var args = [],
	                $__7 = 0; $__7 < arguments.length; $__7++)
	              args[$__7] = arguments[$__7];
	            var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	            return thisDeltaJs.facade((newDelta instanceof CompositeDelta) ? newDelta : this.delta);
	          };
	        }
	      }));
	    }));
	    $__5.facade = function facade(delta) {
	      var fcd = function() {
	        for (var args = [],
	            $__7 = 0; $__7 < arguments.length; $__7++)
	          args[$__7] = arguments[$__7];
	        var result = facade(delta);
	        result._args = fcd._args.concat(args);
	        return result;
	      };
	      fcd._args = [];
	      U.extend(fcd, operationMethods, {
	        _applyOperationMethod: function(method) {
	          for (var finalArgs = [],
	              $__8 = 1; $__8 < arguments.length; $__8++)
	            finalArgs[$__8 - 1] = arguments[$__8];
	          return delta.operation.apply(delta, [method].concat(fcd._args).concat(finalArgs));
	        },
	        delta: delta
	      });
	      return fcd;
	    };
	  }))();
	  CompositeDelta.prototype.facade = function() {
	    return thisDeltaJs.facade(this);
	  };
	  this.overloads = {};
	  var OverloadedDelta = this.operations['OverloadedDelta'] = U.newSubclass(this.Delta, (function(superFn) {
	    return function(arg, meta) {
	      superFn.call(this, arg, meta);
	      this.overloads = [];
	    };
	  }), {
	    clone: function() {
	      var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      result.overloads = this.overloads.map((function(delta) {
	        return delta.clone();
	      }));
	      return result;
	    },
	    applyTo: function(target) {
	      var errors = [];
	      var success = this.overloads.some((function(delta) {
	        var judgment = thisDeltaJs._evaluatePrecondition(delta, target);
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
	      var str = Delta.prototype.toString.call(this, options);
	      var overloads = this.overloads.map((function(delta) {
	        return delta.toString(options);
	      })).join('\n');
	      str += '\n' + U.indent(overloads, 4);
	      return str;
	    }
	  });
	  OverloadedDelta.type = OverloadedDelta.prototype.type = 'OverloadedDelta';
	  OverloadedDelta.meta = OverloadedDelta.prototype.meta = {methods: []};
	  this.newComposition((function(d1, d2) {
	    return (d1 instanceof OverloadedDelta || d2 instanceof OverloadedDelta);
	  }), (function(d1, d2) {
	    var D1 = d1 instanceof OverloadedDelta ? d1.overloads : [d1];
	    var D2 = d2 instanceof OverloadedDelta ? d2.overloads : [d2];
	    var result = new OverloadedDelta();
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
	  var Modify = this.operations['Modify'] = U.newSubclass(CompositeDelta, (function(superFn) {
	    return function(__, meta) {
	      superFn.call(this, __, meta);
	      this.deltas = {};
	    };
	  }), {
	    clone: function() {
	      var $__6 = this;
	      var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	      Object.keys(this.deltas).forEach((function(prop) {
	        result.deltas[prop] = $__6.deltas[prop].clone();
	      }));
	      return result;
	    },
	    precondition: function(target) {
	      return target.value instanceof Object;
	    },
	    applyTo: function(target) {
	      var $__6 = this;
	      Object.keys(this.deltas).forEach((function(prop) {
	        $__6.deltas[prop].applyTo(wt(target.value, prop));
	      }));
	    },
	    toString: function(options) {
	      var $__6 = this;
	      var str = Delta.prototype.toString.call(this, options);
	      if (Object.keys(this.deltas).length > 0) {
	        var deltas = Object.keys(this.deltas).map((function(p) {
	          return $__6.deltas[p].toString(options);
	        })).join('\n');
	        str += '\n' + U.indent(deltas, 4);
	      }
	      return str;
	    },
	    operation: function(method, options, path, arg) {
	      var $__9;
	      if (typeof options === 'string') {
	        ($__9 = [{}, options, path], options = $__9[0], path = $__9[1], arg = $__9[2], $__9);
	      }
	      var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	      return this._addOperation(options, new Path(path), delta);
	    },
	    _addOperation: function(options, path, delta) {
	      if (path.rest) {
	        return this.operation('modify', path.prop)._addOperation(options, path.rest, delta);
	      }
	      this.deltas[path.prop] = this.deltas[path.prop] ? this.deltas[path.prop].composedWith(delta) : delta;
	      this.deltas[path.prop].meta.targetProp = path.prop;
	      return (this.deltas[path.prop] instanceof CompositeDelta) ? this.deltas[path.prop] : delta;
	    }
	  });
	  Modify.type = Modify.prototype.type = 'Modify';
	  Modify.meta = Modify.prototype.meta = {methods: ['modify']};
	  this._onNewOperationTypeListeners.forEach((function(fn) {
	    fn(Modify);
	  }));
	  if (!Array.isArray(this.overloads['modify'])) {
	    this.overloads['modify'] = [];
	  }
	  this.overloads['modify'].push('Modify');
	  this._defineStandardOperationTypes();
	}, {
	  _getDeltaByMethod: function(method, arg) {
	    var $__5 = this;
	    var newDeltas = this.overloads[method].map((function(type) {
	      return new $__5.operations[type](arg, {method: method});
	    }));
	    if (newDeltas.length === 1) {
	      return newDeltas[0];
	    } else {
	      var delta = new this.operations['OverloadedDelta'](arg, {method: method});
	      delta.overloads = newDeltas;
	      return delta;
	    }
	  },
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
	    var $__9;
	    var $__5 = this;
	    if (typeof Superclass === 'string') {
	      ($__9 = [undefined, Superclass, name], Superclass = $__9[0], name = $__9[1], prototype = $__9[2], $__9);
	    }
	    prototype = prototype || {};
	    var thisDeltaJs = this;
	    U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	    var cls = this.operations[name] = U.newSubclass(Superclass || this.Delta, (function(superFn) {
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
	      if (!Array.isArray($__5.overloads[method])) {
	        $__5.overloads[method] = [];
	      }
	      $__5.overloads[method].push(name);
	    }));
	    this._onNewOperationTypeListeners.forEach((function(fn) {
	      fn(cls);
	    }));
	    return cls;
	  },
	  onNewOperationType: function(fn) {
	    var $__5 = this;
	    this._onNewOperationTypeListeners.push(fn);
	    Object.keys(this.operations).forEach((function(name) {
	      fn($__5.operations[name]);
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
	      d1 = new this.operations['NoOp']();
	    }
	    if (U.isUndefined(d2)) {
	      d2 = new this.operations['NoOp']();
	    }
	    var composeFn = (function() {});
	    var success = this.compositions.some((function($__9) {
	      var $__10 = $__9,
	          precondition = $__10.precondition,
	          fn = $__10.compose;
	      if (precondition(d1, d2)) {
	        composeFn = fn;
	        return true;
	      }
	    }));
	    if (!success) {
	      throw new CompositionError(d1, d2);
	    }
	    return composeFn(d1, d2);
	  },
	  _defineStandardOperationTypes: function() {
	    var thisDeltaJs = this;
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
	        return new (thisDeltaJs.operations[type])(fn && fn({
	          d1: d1,
	          d2: d2,
	          p1: d1.arg,
	          p2: d2.arg
	        }));
	      });
	    }
	    var NoOp = this.newOperationType('NoOp');
	    this.newComposition((function(d1, d2) {
	      return d1 instanceof NoOp;
	    }), (function(d1, d2) {
	      return d2.clone();
	    }));
	    this.newComposition((function(d1, d2) {
	      return d2 instanceof NoOp;
	    }), (function(d1, d2) {
	      return d1.clone();
	    }));
	    [['Add', 'add', (function(target) {
	      return U.isUndefined(target.value);
	    })], ['Replace', 'replace', (function(target) {
	      return U.isDefined(target.value);
	    })]].forEach((function($__9) {
	      var $__10 = $__9,
	          Type = $__10[0],
	          type = $__10[1],
	          pre = $__10[2];
	      thisDeltaJs.newOperationType(Type, {
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
	          var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	          result.deltasToApplyToArg = this.deltasToApplyToArg.map((function(d) {
	            return d;
	          }));
	          return result;
	        },
	        afterApplying: function(delta) {
	          var result = this.clone();
	          result.deltasToApplyToArg.push(delta);
	          if (result.deltasToApplyToArg.reduce((function(d1, d2) {
	            return thisDeltaJs.composed(d1, d2);
	          })).precondition(wt(result, 'arg')) !== true) {
	            throw new DeltaArgApplicationError(delta, this);
	          }
	          return result;
	        },
	        toString: function(options) {
	          var $__5 = this;
	          var str = thisDeltaJs.Delta.prototype.toString.call(this, options);
	          if (Object.keys(this.deltasToApplyToArg).length > 0) {
	            var deltas = Object.keys(this.deltasToApplyToArg).map((function(p) {
	              return $__5.deltasToApplyToArg[p].toString(options);
	            })).join('\n');
	            str += '\n' + U.indent(deltas, 4);
	          }
	          return str;
	        }
	      });
	    }));
	    this.newOperationType('Remove', {
	      precondition: function(target) {
	        return target instanceof WritableTarget && U.isDefined(target.value);
	      },
	      applyTo: function(target) {
	        target.delete();
	      }
	    });
	    this.newOperationType('Forbid', {precondition: function(target) {
	        return U.isUndefined(target.value);
	      }});
	    this.newComposition(t('Modify', 'Modify'), (function(d1, d2) {
	      var result = d1.clone();
	      Object.keys(d2.deltas).forEach((function(prop) {
	        result.deltas[prop] = thisDeltaJs.composed(result.deltas[prop], d2.deltas[prop]);
	      }));
	      return result;
	    }));
	    this.newComposition(t('Add', 'Modify'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('Modify', 'Remove'), d('Remove'));
	    this.newComposition(t('Add', 'Remove'), d('Forbid'));
	    this.newComposition(t('Remove', 'Add'), d('Replace', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('Remove', 'Forbid'), d('Remove'));
	    this.newComposition(t('Forbid', 'Add'), d('Add', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('Forbid', 'Forbid'), d('Forbid'));
	    this.newComposition(t('Modify', 'Replace'), d('Replace', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('Add', 'Replace'), d('Add', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('Replace', 'Modify'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('Replace', 'Remove'), d('Remove'));
	    this.newComposition(t('Replace', 'Replace'), d('Replace', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newOperationType('PutIntoArray', {
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
	        var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
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
	        this.values.forEach((function($__9) {
	          var $__10 = $__9,
	              method = $__10.method,
	              value = $__10.value;
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
	    this.newComposition(t('Add', 'PutIntoArray'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('Replace', 'PutIntoArray'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('PutIntoArray', 'Remove'), d('Remove'));
	    this.newComposition(t('PutIntoArray', 'Replace'), d('Replace', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('PutIntoArray', 'PutIntoArray'), (function(d1, d2) {
	      var result = new thisDeltaJs.operations['PutIntoArray']();
	      result.values = (d1.values).concat(d2.values);
	      return result;
	    }));
	    this.newOperationType('PutIntoFunction', {
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
	        var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
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
	                $__7 = 0; $__7 < arguments.length; $__7++)
	              args[$__7] = arguments[$__7];
	            var $__5 = this;
	            var result;
	            newFn._DeltaJs_functions.forEach((function(fn) {
	              result = fn.apply($__5, args);
	            }));
	            return result;
	          };
	          newFn._DeltaJs_functions = [function() {
	            for (var args = [],
	                $__8 = 0; $__8 < arguments.length; $__8++)
	              args[$__8] = arguments[$__8];
	            originalFn.apply(this, args);
	          }];
	          target.value = newFn;
	        }
	        var arr = target.value._DeltaJs_functions;
	        this.values.forEach((function($__9) {
	          var $__10 = $__9,
	              method = $__10.method,
	              value = $__10.value;
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
	    this.newComposition(t('Add', 'PutIntoFunction'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('Replace', 'PutIntoFunction'), (function(d1, d2) {
	      return d1.afterApplying(d2);
	    }));
	    this.newComposition(t('PutIntoFunction', 'Remove'), d('Remove'));
	    this.newComposition(t('PutIntoFunction', 'Replace'), d('Replace', (function($__9) {
	      var p2 = $__9.p2;
	      return p2;
	    })));
	    this.newComposition(t('PutIntoFunction', 'PutIntoFunction'), (function(d1, d2) {
	      var result = new thisDeltaJs.operations['PutIntoFunction']();
	      result.values = (d1.values).concat(d2.values);
	      return result;
	    }));
	    var DeltaModel = this.newOperationType(this.operations.CompositeDelta, 'DeltaModel', {
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
	        var $__9;
	        if (typeof options === 'string') {
	          ($__9 = [{}, options, path], options = $__9[0], path = $__9[1], arg = $__9[2], $__9);
	        }
	        var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	        return this._addOperation(name, options, new Path(path), delta);
	      },
	      toString: function(options) {
	        var str = thisDeltaJs.Delta.prototype.toString.call(this, options);
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
	        var before = options.before;
	        var deltaBase = delta;
	        if (path.prop) {
	          deltaBase = new thisDeltaJs.operations['Modify']();
	          deltaBase._addOperation(options, path, delta);
	        }
	        U.assert(!this.graph.vertexValue(name), ("A delta by the name “" + name + "” is already in this delta model."));
	        this.graph.addVertex(name, deltaBase);
	        (before || []).forEach((function(subordinateName) {
	          $__5.graph.createEdge(subordinateName, name);
	        }));
	        return delta;
	      }
	    });
	    this.newComposition((function(d1, d2) {
	      return (d1 instanceof DeltaModel || d2 instanceof DeltaModel);
	    }), (function(d1, d2) {
	      var result = new DeltaModel();
	      result.graph.addNewVertex(1, d1);
	      result.graph.addNewVertex(2, d2);
	      result.graph.addNewEdge(1, 2);
	      return result;
	    }));
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZmNmNmJjM2ZiMTcwYzlkMWVlMSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83Iiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNSIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvNiIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzAiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvOCIsIndlYnBhY2s6Ly8vQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RlbHRhSnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RhcmdldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXJyb3IuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUssS0FBSyxFQUFDLElBQUUsRUFBQyxDQUFDO0FBQzNILFFBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixRQUFHLE9BQU8sRUFBSSxPQUFLLENBQUM7R0FDckI7QUFBQSxHQUFDLENBQUM7QUFFUyxxQ0FBZ0MsRUFBSSxjQUFhLENBQUMsZ0JBQWUsR0FBRyxTQUFDLE9BQU07UUFBTSxTQUFTLGtDQUFnQyxDQUFFLE1BQUssQ0FBRyxPQUFrQjtPQUFWLE9BQUssNkNBQUksR0FBQztBQUNoSyxXQUFNLEtBQU0sQ0FBQyxJQUFHLENBQUcsT0FBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBQ2xDLFFBQUcsT0FBTyxFQUFJLE9BQUssQ0FBQztBQUNwQixRQUFHLFFBQVEsRUFBSSwwREFBd0QsRUFBQyxPQUFLLEtBQUssRUFBQyxvQ0FBbUMsRUFBQyxPQUFLLEtBQUssRUFBQyxLQUFHLEdBQ3JJLE9BQUssSUFBSyxFQUFDO2NBQUssT0FBTyxFQUFDLFVBQVE7S0FBRSxFQUFDLEtBQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztHQUM5QztBQUFBLEdBQUMsQ0FBQztBQUNGOzs7Ozs7OztBQ3RDQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjZmNmNmJjM2ZiMTcwYzlkMWVlMVxuICoqLyIsIi8qIGltcG9ydCB1dGlsaXRpZXMgKi9cbmltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cblxuLyogaW1wb3J0IHRoZSBEZWx0YUpzIGNsYXNzICovXG5pbXBvcnQgRGVsdGFKcyBmcm9tICcuL0RlbHRhSnMuanMnO1xuXG5cbi8qIGltcG9ydCB0aGUgb3RoZXIgc3R1ZmYgKi9cbmltcG9ydCB7IFJlYWRhYmxlVGFyZ2V0LCBXcml0YWJsZVRhcmdldCB9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBQYXRoIGZyb20gJy4vUGF0aC5qcyc7XG5pbXBvcnQge1xuXHRBcHBsaWNhdGlvbkVycm9yLFxuXHRNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRDb21wb3NpdGlvbkVycm9yLFxuXHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3IgfSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG4vKiBtYWtlIHRoZXNlIGF2YWlsYWJsZSB1bmRlciB0aGUgRGVsdGFKcyBzeW1ib2wgKi9cblUuZXh0ZW5kKERlbHRhSnMsIHtcblx0V3JpdGFibGVUYXJnZXQsXG5cdFJlYWRhYmxlVGFyZ2V0LFxuXHRQYXRoLFxuXHRBcHBsaWNhdGlvbkVycm9yLFxuXHRNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IsXG5cdE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0RGVsdGFBcmdBcHBsaWNhdGlvbkVycm9yLFxuXHRDb21wb3NpdGlvbkVycm9yLFxuXHRNdWx0aXBsZU92ZXJsb2Fkc0NvbXBvc2l0aW9uRXJyb3Jcbn0pO1xuXG5cbi8qIGV4cG9ydCB0aGUgbWFpbiBjbGFzcyAqL1xuZXhwb3J0IGRlZmF1bHQgRGVsdGFKcztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci83XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci81XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8yXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci82XG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwidmFyIFUgPSB7XG5cblx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0fVxuXG5cdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHR9XG5cblx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG9iajE7XG5cdH0sXG5cblx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdHJldHVybiBuZXdfb2JqO1xuXHR9LFxuXG5cdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0fSxcblxuXHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0Lyogc2hpZnQgZXZlcnkgbGluZSBpbiBhIHN0cmluZyByaWdodCBieSBhIGdpdmVuIG51bWJlciBvZiBzcGFjZXMgKi9cblx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzhcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzlcbiAqKi8iLCIvKiBpbXBvcnQgZXh0ZXJuYWwgbGlicmFyaWVzICovXG5pbXBvcnQgSnNHcmFwaCBmcm9tICdqcy1ncmFwaCc7XG5cblxuLyogaW1wb3J0IGludGVybmFsIHN0dWZmICovXG5pbXBvcnQgVSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4vbWlzYy5qcyc7XG5pbXBvcnQgeyBSZWFkYWJsZVRhcmdldCwgV3JpdGFibGVUYXJnZXQsIHJ0LCB3dCB9IGZyb20gJy4vVGFyZ2V0LmpzJztcbmltcG9ydCBQYXRoICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi9QYXRoLmpzJztcbmltcG9ydCB7XG5cdEFwcGxpY2F0aW9uRXJyb3IsXG5cdE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcixcblx0Tm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yLFxuXHREZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IsXG5cdENvbXBvc2l0aW9uRXJyb3IsXG5cdE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvclxufSBmcm9tICcuL0Vycm9yLmpzJztcblxuXG4vKioge0BjbGFzc31cbiAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cbiAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdC8qICd0aGlzJyBhbGlhcyAqL1xuXHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHR0aGlzLm9wZXJhdGlvbnMgPSB7fTsgICAvLyBwcm9wZXJ0eSAtPiBEZWx0YS1zdWJjbGFzc1xuXHR0aGlzLmNvbXBvc2l0aW9ucyA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzID0gW107XG5cblx0LyogRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YSAqL1xuXHR2YXIgbmV4dFVVSUQgPSAxO1xuXHR2YXIgRGVsdGEgPSB0aGlzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0dGhpcy5hcmcgPSBhcmc7XG5cdFx0dGhpcy5tZXRhID0gVS5leHRlbmQoe30sIG1ldGEgfHwge30sIHsgdXVpZDogbmV4dFVVSUQrKyB9KTtcblx0fSwge1xuXHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gYSBjbG9uZSBvZiB0aGlzIGRlbHRhXG5cdFx0ICovXG5cdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKSB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gIHZhbHVlIHsqfSAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdCAqIEByZXR1cm4gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHQgKi9cblx0XHRhcHBsaWVkVG8odmFsdWUpIHtcblx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSB7IHZhbHVlID0gdmFsdWUudmFsdWUgfVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlLmNsb25lKCkgfVxuXHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpKTtcblx0XHRcdHJldHVybiBvYmoudmFsdWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHBhcmFtIG90aGVyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBvdGhlciBkZWx0YSB0byBjb21wb3NlIHdpdGhcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkV2l0aChvdGhlcikgeyByZXR1cm4gdGhpc0RlbHRhSnMuY29tcG9zZWQodGhpcywgb3RoZXIpIH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0ICovXG5cdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0aWYgKHRoaXMubWV0YS50YXJnZXRQcm9wKSAgeyBzdHIgKz0gYCDigLkke3RoaXMubWV0YS50YXJnZXRQcm9wfeKAumAgfVxuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9XG5cdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgICB7IHN0ciArPSBgICgke3RoaXMubWV0YS51dWlkfSlgIH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblx0fSk7XG5cblxuXHQvKiBDb21wb3NpdGVEZWx0YSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIENvbXBvc2l0ZURlbHRhICovXG5cdHZhciBDb21wb3NpdGVEZWx0YSA9IHRoaXMub3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YSA9IFUubmV3U3ViY2xhc3MoRGVsdGEsIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHQgKiBJbXBsZW1lbnQgdGhpcyBpbiBzdWJjbGFzc2VzIHRvIHByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24oKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgQ29tcG9zaXRlRGVsdGEgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnb3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0fVxuXHR9KTtcblx0KCgpID0+IHtcblx0XHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXHRcdHRoaXMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRcdChjbHMubWV0YSAmJiBjbHMubWV0YS5tZXRob2RzIHx8IFtdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRcdG9wZXJhdGlvbk1ldGhvZHNbbWV0aG9kXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHR2YXIgbmV3RGVsdGEgPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZC5hcHBseSh0aGlzLCBbbWV0aG9kXS5jb25jYXQoYXJncykpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YUpzLmZhY2FkZShcblx0XHRcdFx0XHRcdFx0KG5ld0RlbHRhIGluc3RhbmNlb2YgQ29tcG9zaXRlRGVsdGEpID8gbmV3RGVsdGEgOiB0aGlzLmRlbHRhXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kIERlbHRhSnMjZmFjYWRlfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcGFyYW0gZGVsdGEge0RlbHRhSnMjb3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHR0aGlzLmZhY2FkZSA9IGZ1bmN0aW9uIGZhY2FkZShkZWx0YSkge1xuXHRcdFx0LyogdGhlIGZhY2FkZSBpdHNlbGYgKi9cblx0XHRcdC8vIFRoZSBmYWNhZGUgb2JqZWN0IGV4cG9zZXMgb3BlcmF0aW9ucyBtZXRob2RzIGRpcmVjdGx5LCBidXQgYXJndW1lbnRzIHRvXG5cdFx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdFx0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHRcdFx0dmFyIGZjZCA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBmYWNhZGUoZGVsdGEpO1xuXHRcdFx0XHRyZXN1bHQuX2FyZ3MgPSBmY2QuX2FyZ3MuY29uY2F0KGFyZ3MpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHRcdGZjZC5fYXJncyA9IFtdO1xuXHRcdFx0VS5leHRlbmQoZmNkLCBvcGVyYXRpb25NZXRob2RzLCB7XG5cdFx0XHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHRcdFx0XHRcdHJldHVybiBkZWx0YS5vcGVyYXRpb24uYXBwbHkoZGVsdGEsIFttZXRob2RdLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGVsdGE6IGRlbHRhXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBmY2Q7XG5cdFx0fTtcblxuXHR9KSgpO1xuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZCBEZWx0YUpzI2ZhY2FkZX17QG5vc2lkZWVmZmVjdHN9XG5cdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHQgKi9cblx0Q29tcG9zaXRlRGVsdGEucHJvdG90eXBlLmZhY2FkZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXNEZWx0YUpzLmZhY2FkZSh0aGlzKSB9O1xuXG5cblx0LyogT3ZlcmxvYWRlZERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE92ZXJsb2FkZWREZWx0YSAqL1xuXHR0aGlzLm92ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdHZhciBPdmVybG9hZGVkRGVsdGEgPSB0aGlzLm9wZXJhdGlvbnNbJ092ZXJsb2FkZWREZWx0YSddID0gVS5uZXdTdWJjbGFzcyh0aGlzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdHRoaXMub3ZlcmxvYWRzID0gW107XG5cdH0sIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0cmVzdWx0Lm92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcChkZWx0YSA9PiBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdCAqL1xuXHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMub3ZlcmxvYWRzLnNvbWUoKGRlbHRhKSA9PiB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0ZXJyb3JzLnB1c2goanVkZ21lbnQpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWx0YS5hcHBseVRvKHRhcmdldCk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHQvKiBpZiBub25lIGFwcGx5LCB0aHJvdyBhbiBhcHByb3ByaWF0ZSBlcnJvciAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcih0aGlzLCB0YXJnZXQudmFsdWUsIGVycm9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmc/fVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBEZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9XG5cdH0pO1xuXHRPdmVybG9hZGVkRGVsdGEudHlwZSA9IE92ZXJsb2FkZWREZWx0YS5wcm90b3R5cGUudHlwZSA9ICdPdmVybG9hZGVkRGVsdGEnO1xuXHRPdmVybG9hZGVkRGVsdGEubWV0YSA9IE92ZXJsb2FkZWREZWx0YS5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRtZXRob2RzOiBbXVxuXHR9O1xuXHR0aGlzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSB8fCBkMiBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSksIChkMSwgZDIpID0+IHtcblx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdHZhciByZXN1bHQgPSBuZXcgT3ZlcmxvYWRlZERlbHRhKCk7XG5cdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvcihkMSwgZDIsIGVycm9ycykgfVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pO1xuXG5cblx0LyogTW9kaWZ5ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE1vZGlmeSAqL1xuXHR2YXIgTW9kaWZ5ID0gdGhpcy5vcGVyYXRpb25zWydNb2RpZnknXSA9IFUubmV3U3ViY2xhc3MoQ29tcG9zaXRlRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoX18sIG1ldGEpIHtcblx0XHRzdXBlckZuLmNhbGwodGhpcywgX18sIG1ldGEpO1xuXHRcdHRoaXMuZGVsdGFzID0ge307XG5cdH0sIHtcblx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHQgKi9cblx0XHRjbG9uZSgpIHtcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0T2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHsqfVxuXHRcdCAqL1xuXHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuV3JpdGFibGVUYXJnZXR9XG5cdFx0ICovXG5cdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmc/fVxuXHRcdCAqL1xuXHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdHZhciBzdHIgPSBEZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9ICAgICAgICAgICAgICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHQgKiBAcGFyYW0gcGF0aE9yT3B0aW9ucyB7T2JqZWN0fFN0cmluZ30gLSB0aGUgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb24sIG9yIGp1c3QgdGhlIHBhdGhcblx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHQgKi9cblx0XHRvcGVyYXRpb24obWV0aG9kLCBvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHsgW29wdGlvbnMsIHBhdGgsIGFyZ10gPSBbe30sIG9wdGlvbnMsIHBhdGhdIH1cblx0XHRcdHZhciBkZWx0YSA9IHRoaXNEZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdCAqIEBwYXJhbSBkZWx0YSAgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb24oJ21vZGlmeScsIHBhdGgucHJvcClcblx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdH1cblxuXHRcdFx0Lyogc3RvcmUgdGhlIG5ldyBkZWx0YSwgcG9zc2libHkgY29tcG9zZWQgd2l0aCBhbiBleGlzdGluZyBvbmUgKi9cblx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdLm1ldGEudGFyZ2V0UHJvcCA9IHBhdGgucHJvcDtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgQ29tcG9zaXRlRGVsdGEpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdH1cblx0fSk7XG5cdE1vZGlmeS50eXBlID0gTW9kaWZ5LnByb3RvdHlwZS50eXBlID0gJ01vZGlmeSc7XG5cdE1vZGlmeS5tZXRhID0gTW9kaWZ5LnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdG1ldGhvZHM6IFsnbW9kaWZ5J11cblx0fTtcblx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKE1vZGlmeSkgfSk7XG5cblx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10pKSB7IHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXSA9IFtdIH1cblx0dGhpcy5vdmVybG9hZHNbJ21vZGlmeSddLnB1c2goJ01vZGlmeScpO1xuXG5cblx0Lyogc3RhbmRhcmQgb3BlcmF0aW9ucyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxufSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyB7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGFKcy5wcm90b3R5cGUgKi9cblxuXHQvLy8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0Ly8gKlxuXHQvLyAqL1xuXHQvL3ZwKHZwTmFtZSwgdmFsKSB7XG5cdC8vXHQvLyBUT0RPXG5cdC8vfSxcblxuXHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9XG5cdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9XG5cdCAqL1xuXHRfZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZykge1xuXHRcdHZhciBuZXdEZWx0YXMgPSB0aGlzLm92ZXJsb2Fkc1ttZXRob2RdXG5cdFx0XHQubWFwKHR5cGUgPT4gbmV3IHRoaXMub3BlcmF0aW9uc1t0eXBlXShhcmcsIHsgbWV0aG9kIH0pKTtcblx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0cmV0dXJuIG5ld0RlbHRhc1swXTtcblx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMub3BlcmF0aW9uc1snT3ZlcmxvYWRlZERlbHRhJ10oYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdGRlbHRhLm92ZXJsb2FkcyA9IG5ld0RlbHRhcztcblx0XHRcdHJldHVybiBkZWx0YTtcblx0XHR9XG5cdH0sXG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5SZWFkYWJsZVRhcmdldH1cblx0ICogQHJldHVybiB7Qm9vbGVhbnxBcHBsaWNhdGlvbkVycm9yfSAtIGB0cnVlYCBpZiB0aGUgcHJlY29uZGl0aW9uIGlzIHNhdGlzZmllZCwgb3RoZXJ3aXNlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZmFsc2VgIG9yIGFuIGluc3RhbmNlIG9mIGBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3JgXG5cdCAqL1xuXHRfZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCkge1xuXHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdGlmIChqdWRnbWVudCBpbnN0YW5jZW9mIEFwcGxpY2F0aW9uRXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIGp1ZGdtZW50O1xuXHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB0YXJnZXQudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdCAqIEBwYXJhbSBuYW1lICAgICAge1N0cmluZ31cblx0ICogQHBhcmFtIHByb3RvdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0bmV3T3BlcmF0aW9uVHlwZShTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGUpIHtcblx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0VS5hc3NlcnQoIXRoaXMub3BlcmF0aW9uc1tuYW1lXSxcblx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0LyogRGVsdGEgc3ViY2xhc3MgKi9cblx0XHR2YXIgY2xzID0gdGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3RvdHlwZS5hcHBseVRvKSkgeyBwcm90b3R5cGUuYXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCkgfVxuXHRcdFx0fVxuXHRcdH0pKTtcblx0XHRjbHMudHlwZSA9IGNscy5wcm90b3R5cGUudHlwZSA9IG5hbWU7XG5cdFx0Y2xzLm1ldGEgPSBjbHMucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0bWV0aG9kczogcHJvdG90eXBlLm1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdXG5cdFx0fTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGNscy5tZXRhLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5vdmVybG9hZHNbbWV0aG9kXSkpIHsgdGhpcy5vdmVybG9hZHNbbWV0aG9kXSA9IFtdIH1cblx0XHRcdHRoaXMub3ZlcmxvYWRzW21ldGhvZF0ucHVzaChuYW1lKTtcblx0XHR9KTtcblxuXHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oY2xzKSB9KTtcblxuXHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0cmV0dXJuIGNscztcblxuXHR9LFxuXG5cdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0ICogQHBhcmFtIGZuIHsoRnVuY3Rpb24pID0+IHVuZGVmaW5lZH0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdWJjbGFzcyBvZiBgRGVsdGFKcyNEZWx0YWBcblx0ICovXG5cdG9uTmV3T3BlcmF0aW9uVHlwZShmbikge1xuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5wdXNoKGZuKTtcblx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdGZuKHRoaXMub3BlcmF0aW9uc1tuYW1lXSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHQgKi9cblx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0dGhpcy5jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdH0sXG5cblx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdCAqIEBwYXJhbSBkMiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgc2Vjb25kIGRlbHRhXG5cdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdCAqL1xuXHRjb21wb3NlZChkMSwgZDIpIHtcblx0XHQvKiBoYW5kbGUgdGhlIGNhc2VzIHdoZXJlIG9uZSBvciBib3RoIGFyZ3VtZW50cyBhcmUgdW5kZWZpbmVkICovXG5cdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMub3BlcmF0aW9uc1snTm9PcCddKCkgfVxuXHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLm9wZXJhdGlvbnNbJ05vT3AnXSgpIH1cblxuXHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdHZhciBzdWNjZXNzID0gdGhpcy5jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyogdGhyb3cgYW4gZXJyb3Igb24gZmFpbHVyZSAqL1xuXHRcdGlmICghc3VjY2VzcykgeyB0aHJvdyBuZXcgQ29tcG9zaXRpb25FcnJvcihkMSwgZDIpIH1cblxuXHRcdC8qIHJldHVybiB0aGUgcmVzdWx0IG9uIHN1Y2Nlc3MgKi9cblx0XHRyZXR1cm4gY29tcG9zZUZuKGQxLCBkMik7XG5cdH0sXG5cblx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0ICpcblx0ICovXG5cdF9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCkge1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHRcdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0XHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0XHRpZiAodHlwZW9mIGZuID09PSAnc3RyaW5nJykgeyBmbiA9ICgodikgPT4gKG8pID0+IG9bdl0pKGZuKSB9XG5cdFx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3ICh0aGlzRGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHRcdH1cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdC8vICBhbmQgaXMgZGVmaW5lZCBhYm92ZSByYXRoZXIgdGhhbiBoZXJlXG5cdFx0dmFyIE5vT3AgPSB0aGlzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMiBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQxLmNsb25lKCkgKTtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLCBhbmQgaXMgZGVmaW5lZCBhYm92ZSByYXRoZXIgdGhhbiBoZXJlLlxuXHRcdFtcblx0XHRcdFsnQWRkJyAgICAsICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRcdFsnUmVwbGFjZScsICdyZXBsYWNlJywgKHRhcmdldCkgPT4gVS5pc0RlZmluZWQgICh0YXJnZXQudmFsdWUpXVxuXHRcdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHRcdFx0Ly8gSW4gdGhlIGxpbmUgZGlyZWN0bHkgYmVsb3csICd0aGlzJyBjYW5ub3QgYmUgdXNlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRyYWNldXI6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdFx0XHR0aGlzRGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBwcmUodGFyZ2V0KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZnRlckFwcGx5aW5nKGRlbHRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiB0aGlzRGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0XHRcdC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHRcdFx0dmFyIHN0ciA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdSZW1vdmUnLCB7XG5cdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHRcdH0pO1xuXHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHR9KTtcblxuXHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gZDEuY2xvbmUoKTtcblx0XHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpc0RlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblxuXHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0FkZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnUmVtb3ZlJyksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0ZvcmJpZCcgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0ZvcmJpZCcpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICk7XG5cblx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIHtcblx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0aWYgKHRoaXMubWV0YS5tZXRob2QpIHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5hcmdcblx0XHRcdFx0XHR9XTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHRcdH0pO1xuXG5cdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydQdXRJbnRvQXJyYXknXSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0XHRcdFx0XHRcdG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdH1dO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0XHRyZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0XHR9KTtcblxuXHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydQdXRJbnRvRnVuY3Rpb24nXSgpO1xuXHRcdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblx0XHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLyogZGVjbGFyaW5nIHRoZSAnRGVsdGFNb2RlbCcgdHlwZSAqL1xuXHRcdHZhciBEZWx0YU1vZGVsID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKHRoaXMub3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdFx0XHQvL3RoaXMuX2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZSgobWV0aG9kLCBbbmFtZSwgcGF0aE9yT3B0aW9ucywgYXJnXSkgPT4ge1xuXHRcdFx0XHQvL30pO1xuXHRcdFx0fSxcblx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHRcdCAqIEBwYXJhbSBuYW1lIHtTdHJpbmd9ICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9IC0gdGhlIChvcHRpb25hbCkgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb25cblx0XHRcdCAqIEBwYXJhbSBwYXRoIHtTdHJpbmd9ICAgIC0gdGhlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdFx0ICovXG5cdFx0XHRvcGVyYXRpb24obWV0aG9kLCBuYW1lLCBvcHRpb25zLCBwYXRoLCBhcmcpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykgeyBbb3B0aW9ucywgcGF0aCwgYXJnXSA9IFt7fSwgb3B0aW9ucywgcGF0aF0gfVxuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzRGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgbmV3IFBhdGgocGF0aCksIGRlbHRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBzdHIgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0XHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cblx0XHRcdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgcGF0aCwgZGVsdGEpIHtcblx0XHRcdFx0dmFyIHtiZWZvcmV9ID0gb3B0aW9ucztcblxuXHRcdFx0XHR2YXIgZGVsdGFCYXNlID0gZGVsdGE7XG5cblx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0XHRkZWx0YUJhc2UgPSBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9uc1snTW9kaWZ5J10oKTtcblx0XHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBhIGRlbHRhIGJ5IHRoaXMgbmFtZSBjYW5ub3QgYWxyZWFkeSBiZSBpbiB0aGUgZ3JhcGggKi9cblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSksXG5cdFx0XHRcdFx0YEEgZGVsdGEgYnkgdGhlIG5hbWUg4oCcJHtuYW1lfeKAnSBpcyBhbHJlYWR5IGluIHRoaXMgZGVsdGEgbW9kZWwuYCk7XG5cblx0XHRcdFx0LyogYWRkIHRoZSBuZXcgZGVsdGEgdG8gdGhlIGRlbHRhIG1vZGVsICovXG5cdFx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuXHRcdFx0XHQvLyBUT0RPOiBvcHRpb25zLCBwYXJ0aWFsIG9yZGVyLCBldGMuLi5cblx0XHRcdFx0KGJlZm9yZSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHRcdC8vIFRPRE86IGFkZCBwcmVjb25kaXRpb24gbWV0aG9kIHdoaWNoIGNoZWNrcyAnc291cmNlJyBkZWx0YXNcblx0XHR9KTtcblxuXHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdFx0Ly8gdG8gY29tcG9zZSBkZWx0YSBtb2RlbHMsIHdlIHNpbXBseSBoYXZlIG9uZSBhcHBseSBhZnRlciB0aGUgb3RoZXJcblx0XHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdFZGdlKDEsIDIpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvRGVsdGFKcy5qc1xuICoqLyIsImltcG9ydCBVIGZyb20gJy4vbWlzYy5qcyc7XG5cbmV4cG9ydCB2YXIgUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHR0aGlzLl92YWwgPSB2YWx1ZTtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfVxufSk7XG5cbmV4cG9ydCB2YXIgV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHR0aGlzLl9vYmogID0gb2JqO1xuXHR0aGlzLl9wcm9wID0gcHJvcDtcbn0sIHtcblx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG59KTtcblxuUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gY2hhaW4ocHJvcCkge1xuXHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuZXhwb3J0IGZ1bmN0aW9uIHJ0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFJlYWRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvVGFyZ2V0LmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuXG52YXIgUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gIDExMTExICAyMjIyMjIyMjIyMiAgMzMgIC8vXG5cdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0dmFyIFssIGxlYWQsIHByb3AsIHJlc3RdID0gbWF0Y2g7XG5cdGlmIChsZWFkID09PSAnIycpIHtcblx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0dGhpcy5zZXQobmV3IFBhdGgoYC4oaW5zdGFuY2UpLiR7cHJvcH0ke3Jlc3R9YCkpO1xuXHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0fVxuXHR9XG59LCB7XG5cdHNldChvdGhlcikge1xuXHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdH0sXG5cdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfVxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0aDtcblxuXG4vLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9QYXRoLmpzXG4gKiovIiwiaW1wb3J0IFUgZnJvbSAnLi9taXNjLmpzJztcblxuZXhwb3J0IHZhciBBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhFcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYCk7XG5cdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhBcHBsaWNhdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKGRlbHRhLCB2YWx1ZSwgZXJyb3JzID0gW10pIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHR0aGlzLm1lc3NhZ2UgPSBgTm9uZSBvZiB0aGVzZSBkZWx0YXMgb2YgdHlwZXMgJHtkZWx0YS5vdmVybG9hZHMubWFwKGQgPT4gXCInXCIrZC50eXBlK1wiJ1wiKS5qb2luKCcsJyl9IGNhbiBhcHBseSB0byB0aGlzIHZhbHVlIG9mIHR5cGUgJyR7dHlwZW9mIHZhbHVlfS5gICtcblx0ZXJyb3JzLm1hcChlID0+IGBcXG4tLSAke2UubWVzc2FnZX1gKS5qb2luKCcnKTtcbn0pO1xuXG5leHBvcnQgdmFyIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIE5vT3ZlcmxvYWRzQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdHRoaXMubWVzc2FnZSA9IGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEudHlwZX0nIGhhcyBubyBzcGNpZmljIGRlbHRhcyBhc3NpZ25lZCB0byBpdCwgc28gaXQgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmA7XG59KTtcblxuZXhwb3J0IHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIGJhc2VEZWx0YSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGEsIGJhc2VEZWx0YS5hcmcpO1xuXHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhlIHR5cGUtJyR7dHlwZW9mIGJhc2VEZWx0YS5hcmd9Jy12YWx1ZSBvZiB0aGlzIGJhc2UgZGVsdGEgb2YgdHlwZSAnJHtiYXNlRGVsdGEudHlwZX0nLmA7XG5cdHRoaXMuYmFzZURlbHRhID0gYmFzZURlbHRhO1xufSk7XG5cbmV4cG9ydCB2YXIgQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdHN1cGVyRm4uY2FsbCh0aGlzLCBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhMS50eXBlfScgY2Fubm90IGJlIGNvbXBvc2VkIHdpdGggdGhpcyBvdGhlciBkZWx0YSBvZiB0eXBlICcke2RlbHRhMi50eXBlfS5gKTtcblx0dGhpcy5kZWx0YTEgPSBkZWx0YTE7XG5cdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xufSk7XG5cbmV4cG9ydCB2YXIgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRzdXBlckZuLmNhbGwodGhpcywgZGVsdGExLCBkZWx0YTIpO1xuXHR0aGlzLmVycm9ycyA9IGVycm9ycztcblx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRlcnJvcnMubWFwKGUgPT4gYFxcbi0tICR7ZS5tZXNzYWdlfWApLmpvaW4oJycpO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9FcnJvci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9