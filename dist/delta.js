(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["js-graph"], factory);
	else if(typeof exports === 'object')
		exports["DeltaJs"] = factory(require("js-graph"));
	else
		root["DeltaJs"] = factory(root["JsGraph"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U, JsGraph) {
	  'use strict';
	  var DeltaJs = U.newClass(function DeltaJs() {
	    var $__0 = this;
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
	      $__0.onNewOperationType((function(cls) {
	        (cls.meta && cls.meta.methods || []).forEach((function(method) {
	          if (U.isUndefined(operationMethods[method])) {
	            operationMethods[method] = function() {
	              for (var args = [],
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	              return thisDeltaJs.facade((newDelta instanceof CompositeDelta) ? newDelta : this.delta);
	            };
	          }
	        }));
	      }));
	      $__0.facade = function facade(delta) {
	        var fcd = function() {
	          for (var args = [],
	              $__2 = 0; $__2 < arguments.length; $__2++)
	            args[$__2] = arguments[$__2];
	          var result = facade(delta);
	          result._args = fcd._args.concat(args);
	          return result;
	        };
	        fcd._args = [];
	        U.extend(fcd, operationMethods, {
	          _applyOperationMethod: function(method) {
	            for (var finalArgs = [],
	                $__3 = 1; $__3 < arguments.length; $__3++)
	              finalArgs[$__3 - 1] = arguments[$__3];
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
	            throw new Error("This overloaded delta has no overloads, " + ("so cannot apply to the value: " + target.value));
	          } else if (errors.length === 1) {
	            throw errors[0];
	          } else {
	            throw new Error(("None of the delta types " + this.type.join(',') + " ") + ("apply to the value: " + target.value + "\n") + errors.map((function(e) {
	              return e.message;
	            })).join('\n'));
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
	        throw new Error(errors.map((function(e) {
	          return e.message;
	        })).join('\n'));
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
	        var $__1 = this;
	        var result = thisDeltaJs.Delta.prototype.clone.call(this, this.arg, this.meta);
	        Object.keys(this.deltas).forEach((function(prop) {
	          result.deltas[prop] = $__1.deltas[prop].clone();
	        }));
	        return result;
	      },
	      precondition: function(target) {
	        return target.value instanceof Object;
	      },
	      applyTo: function(target) {
	        var $__1 = this;
	        U.assert(U.isDefined(target.value), "The 'Modify' operation expects the property to be defined.");
	        U.assert(target.value instanceof Object, "The 'Modify' operation expects the property to be an Object.");
	        Object.keys(this.deltas).forEach((function(prop) {
	          $__1.deltas[prop].applyTo(wt(target.value, prop));
	        }));
	      },
	      toString: function(options) {
	        var $__1 = this;
	        var str = Delta.prototype.toString.call(this, options);
	        if (Object.keys(this.deltas).length > 0) {
	          var deltas = Object.keys(this.deltas).map((function(p) {
	            return $__1.deltas[p].toString(options);
	          })).join('\n');
	          str += '\n' + U.indent(deltas, 4);
	        }
	        return str;
	      },
	      operation: function(method) {
	        var pathOrOptions = arguments[1] !== (void 0) ? arguments[1] : {};
	        var arg = arguments[2];
	        var options = thisDeltaJs._processOptions(pathOrOptions);
	        var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	        return this._addOperation(options, delta);
	      },
	      _addOperation: function(options, delta) {
	        var path = options.path;
	        if (path.rest) {
	          return this.operation('modify', path.prop)._addOperation(U.extend({}, options, {path: path.rest}), delta);
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
	    _processOptions: function(pathOrOptions) {
	      if (typeof pathOrOptions === 'string') {
	        return {path: new Path(pathOrOptions)};
	      } else if (pathOrOptions instanceof Object) {
	        pathOrOptions.path = new Path(pathOrOptions.path);
	        return pathOrOptions;
	      } else {
	        throw new Error("The options argument on a delta operation " + "a should be a path string or an options object.");
	      }
	    },
	    _getDeltaByMethod: function(method, arg) {
	      var $__0 = this;
	      var newDeltas = this.overloads[method].map((function(type) {
	        return new $__0.operations[type](arg, {method: method});
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
	        if (judgment instanceof Error) {
	          return judgment;
	        } else if (typeof judgment === 'string') {
	          return new TypeError(judgment);
	        } else if (!judgment) {
	          return new TypeError(("The value '" + target.value + "' does not satisfy ") + ("the precondition of the '" + delta.type + "' operation."));
	        }
	      }
	      return true;
	    },
	    newOperationType: function(Superclass, name, prototype) {
	      var $__4;
	      var $__0 = this;
	      if (typeof Superclass === 'string') {
	        ($__4 = [undefined, Superclass, name], Superclass = $__4[0], name = $__4[1], prototype = $__4[2], $__4);
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
	        if (!Array.isArray($__0.overloads[method])) {
	          $__0.overloads[method] = [];
	        }
	        $__0.overloads[method].push(name);
	      }));
	      this._onNewOperationTypeListeners.forEach((function(fn) {
	        fn(cls);
	      }));
	      return cls;
	    },
	    onNewOperationType: function(fn) {
	      var $__0 = this;
	      this._onNewOperationTypeListeners.push(fn);
	      Object.keys(this.operations).forEach((function(name) {
	        fn($__0.operations[name]);
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
	      var success = this.compositions.some((function($__4) {
	        var $__5 = $__4,
	            precondition = $__5.precondition,
	            fn = $__5.compose;
	        if (precondition(d1, d2)) {
	          composeFn = fn;
	          return true;
	        }
	      }));
	      U.assert(success, ("A '" + d1.type + "' operation cannot be followed by a '" + d2.type + "' operation."));
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
	      })]].forEach((function($__4) {
	        var $__5 = $__4,
	            Type = $__5[0],
	            type = $__5[1],
	            pre = $__5[2];
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
	            U.assert(result.deltasToApplyToArg.reduce((function(d1, d2) {
	              return thisDeltaJs.composed(d1, d2);
	            })).precondition(wt(result, 'arg')) === true, ("The given '" + delta.type + "' operation does not apply to the '" + type + "'ed value."));
	            return result;
	          },
	          toString: function(options) {
	            var $__0 = this;
	            var str = thisDeltaJs.Delta.prototype.toString.call(this, options);
	            if (Object.keys(this.deltasToApplyToArg).length > 0) {
	              var deltas = Object.keys(this.deltasToApplyToArg).map((function(p) {
	                return $__0.deltasToApplyToArg[p].toString(options);
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
	      this.newComposition(t('Remove', 'Add'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Remove', 'Forbid'), d('Remove'));
	      this.newComposition(t('Forbid', 'Add'), d('Add', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Forbid', 'Forbid'), d('Forbid'));
	      this.newComposition(t('Modify', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Add', 'Replace'), d('Add', (function($__4) {
	        var p2 = $__4.p2;
	        return p2;
	      })));
	      this.newComposition(t('Replace', 'Modify'), (function(d1, d2) {
	        return d1.afterApplying(d2);
	      }));
	      this.newComposition(t('Replace', 'Remove'), d('Remove'));
	      this.newComposition(t('Replace', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
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
	      this.newComposition(t('Add', 'PutIntoArray'), (function(d1, d2) {
	        return d1.afterApplying(d2);
	      }));
	      this.newComposition(t('Replace', 'PutIntoArray'), (function(d1, d2) {
	        return d1.afterApplying(d2);
	      }));
	      this.newComposition(t('PutIntoArray', 'Remove'), d('Remove'));
	      this.newComposition(t('PutIntoArray', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
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
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              var $__0 = this;
	              var result;
	              newFn._DeltaJs_functions.forEach((function(fn) {
	                result = fn.apply($__0, args);
	              }));
	              return result;
	            };
	            newFn._DeltaJs_functions = [function() {
	              for (var args = [],
	                  $__3 = 0; $__3 < arguments.length; $__3++)
	                args[$__3] = arguments[$__3];
	              originalFn.apply(this, args);
	            }];
	            target.value = newFn;
	          }
	          var arr = target.value._DeltaJs_functions;
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
	      this.newComposition(t('Add', 'PutIntoFunction'), (function(d1, d2) {
	        return d1.afterApplying(d2);
	      }));
	      this.newComposition(t('Replace', 'PutIntoFunction'), (function(d1, d2) {
	        return d1.afterApplying(d2);
	      }));
	      this.newComposition(t('PutIntoFunction', 'Remove'), d('Remove'));
	      this.newComposition(t('PutIntoFunction', 'Replace'), d('Replace', (function($__4) {
	        var p2 = $__4.p2;
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
	        operation: function(method, name, pathOrOptions, arg) {
	          var options = thisDeltaJs._processOptions(pathOrOptions);
	          var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	          return this._addOperation(name, options, delta);
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
	        _addOperation: function(name, options, delta) {
	          var $__0 = this;
	          var $__4 = options,
	              path = $__4.path,
	              before = $__4.before;
	          var deltaBase = delta;
	          if (path.prop) {
	            deltaBase = new thisDeltaJs.operations['Modify']();
	            deltaBase._addOperation(options, delta);
	          }
	          U.assert(!this.graph.vertexValue(name), ("A delta by the name “" + name + "” is already in this delta model."));
	          this.graph.addVertex(name, deltaBase);
	          (before || []).forEach((function(subordinateName) {
	            $__0.graph.createEdge(subordinateName, name);
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
	  var Path = DeltaJs.Path = U.newClass(function() {
	    var str = arguments[0] !== (void 0) ? arguments[0] : "";
	    var match = str.match(/^([.#]?)(\w*|\(\w+\))(.*)$/);
	    U.assert(match, ("The path string '" + str + "' is not well formed."));
	    var $__4 = match,
	        lead = $__4[1],
	        prop = $__4[2],
	        rest = $__4[3];
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
	  var ReadableTarget = DeltaJs.ReadableTarget = U.newClass(function(value) {
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
	    },
	    chain: function(prop) {
	      U.assert(this.value instanceof Object, "The ReadableTarget.prototype.chain method expects the target value to be an Object.");
	      return new WritableTarget(this.value, prop);
	    }
	  });
	  var WritableTarget = DeltaJs.WritableTarget = U.newSubclass(ReadableTarget, (function(superFn) {
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
	  function wt(obj, prop) {
	    return new WritableTarget(obj, prop);
	  }
	  return DeltaJs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
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
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1NDc5NzdhNzYxYWU1NTRiZGUyNiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBUVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTs7QUFHckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixRQUFHLDZCQUE2QixFQUFJLEdBQUMsQ0FBQztBQUdsQyxnQkFBTyxFQUFJLEdBQUM7QUFDWixh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QSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR25ELFVBQUssQ0FBTCxVQUFPLEVBQUMsQ0FBRyxJQUFFLENBQUc7QUFBRSxZQUFPLElBQUksTUFBSyxDQUFDLEVBQUMsRUFBRSxHQUFDLEtBQU0sQ0FBQyxHQUFFLENBQUM7S0FBRTtBQUduRCxVQUFLLENBQUwsVUFBTyxHQUFFLENBQUcsT0FBaUIsQ0FBRztTQUFaLEtBQUcsNkNBQUksSUFBRTtBQUM1QixZQUFPLElBQUUsUUFBUyxDQUFDLGFBQVksQ0FBRyxTQUFRLENBQUMsTUFBSyxDQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUM7S0FDMUQ7QUFBQSxHQUNELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFKc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDU0Nzk3N2E3NjFhZTU1NGJkZTI2XG4gKiovIiwiZGVmaW5lKFsnLi9taXNjLmpzJywgJ2pzLWdyYXBoJ10sIGZ1bmN0aW9uIChVLCBKc0dyYXBoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qKiB7QGNsYXNzIERlbHRhSnN9XG5cdCAqIFRoaXMgY2xhc3Mgb2ZmZXJzIGV2ZXJ5IGZ1bmN0aW9uYWxpdHkgeW91IG5lZWQgZnJvbSBkZWx0YSBtb2RlbGluZy5cblx0ICogRWFjaCBpbnN0YW5jZSBvZmZlcnMgaXRzIG93biBvcGVyYXRpb24gdHlwZXMgYW5kIHZhcmlhdGlvbiBwb2ludHMuXG5cdCAqIFlvdSB3aWxsIHVzdWFsbHkgbmVlZCBvbmx5IG9uZSBpbnN0YW5jZSBwZXIgYXBwbGljYXRpb24uXG5cdCAqL1xuXHR2YXIgRGVsdGFKcyA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gRGVsdGFKcygpIHtcblxuXHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHQvKiB0aGUgdGhpbmdzIGluc3RhbmNlcyBvZiAnRGVsdGFKcycga2VlcHMgdHJhY2sgb2YgKi9cblx0XHR0aGlzLm9wZXJhdGlvbnMgPSB7fTsgICAvLyBwcm9wZXJ0eSAtPiBEZWx0YS1zdWJjbGFzc1xuXHRcdHRoaXMuY29tcG9zaXRpb25zID0gW107IC8vIFt7cHJlY29uZGl0aW9uLCBjb21wb3NlRm59XVxuXHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycyA9IFtdO1xuXG5cdFx0LyogRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YSAqL1xuXHRcdHZhciBuZXh0VVVJRCA9IDE7XG5cdFx0dmFyIERlbHRhID0gdGhpcy5EZWx0YSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0dGhpcy5hcmcgPSBhcmc7XG5cdFx0XHR0aGlzLm1ldGEgPSBVLmV4dGVuZCh7fSwgbWV0YSB8fCB7fSwgeyB1dWlkOiBuZXh0VVVJRCsrIH0pO1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnLCB0aGlzLm1ldGEpIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gIHZhbHVlIHsqfSAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdFx0ICogQHJldHVybiB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdFx0ICovXG5cdFx0XHRhcHBsaWVkVG8odmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSB9XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJykpO1xuXHRcdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIHRoaXNEZWx0YUpzLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucyA9IHt9KSB7XG5cdFx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdGlmICh0aGlzLm1ldGEudGFyZ2V0UHJvcCkgIHsgc3RyICs9IGAg4oC5JHt0aGlzLm1ldGEudGFyZ2V0UHJvcH3igLpgIH1cblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuYXJnKSkgeyBzdHIgKz0gYDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmFyZyl9YCB9XG5cdFx0XHRcdGlmIChvcHRpb25zLmRlYnVnKSAgICAgICAgIHsgc3RyICs9IGAgKCR7dGhpcy5tZXRhLnV1aWR9KWAgfVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblxuXG5cdFx0LyogQ29tcG9zaXRlRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBDb21wb3NpdGVEZWx0YSAqL1xuXHRcdHZhciBDb21wb3NpdGVEZWx0YSA9IHRoaXMub3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YSA9IFUubmV3U3ViY2xhc3MoRGVsdGEsIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfVxuXHRcdFx0ICogSW1wbGVtZW50IHRoaXMgaW4gc3ViY2xhc3NlcyB0byBwcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHRcdCAqL1xuXHRcdFx0b3BlcmF0aW9uKCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEEgQ29tcG9zaXRlRGVsdGEgc3ViY2xhc3MgbmVlZHMgdG8gaW1wbGVtZW50IHRoZSAnb3BlcmF0aW9uJyBtZXRob2QuYCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0KCgpID0+IHtcblx0XHRcdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdFx0XHR0aGlzLm9uTmV3T3BlcmF0aW9uVHlwZSgoY2xzKSA9PiB7XG5cdFx0XHRcdChjbHMubWV0YSAmJiBjbHMubWV0YS5tZXRob2RzIHx8IFtdKS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcGVyYXRpb25NZXRob2RzW21ldGhvZF0pKSB7XG5cdFx0XHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHR2YXIgbmV3RGVsdGEgPSB0aGlzLl9hcHBseU9wZXJhdGlvbk1ldGhvZC5hcHBseSh0aGlzLCBbbWV0aG9kXS5jb25jYXQoYXJncykpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpc0RlbHRhSnMuZmFjYWRlKFxuXHRcdFx0XHRcdFx0XHRcdChuZXdEZWx0YSBpbnN0YW5jZW9mIENvbXBvc2l0ZURlbHRhKSA/IG5ld0RlbHRhIDogdGhpcy5kZWx0YVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZCBEZWx0YUpzI2ZhY2FkZX17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gZGVsdGEge0RlbHRhSnMjb3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLmZhY2FkZSA9IGZ1bmN0aW9uIGZhY2FkZShkZWx0YSkge1xuXHRcdFx0XHQvKiB0aGUgZmFjYWRlIGl0c2VsZiAqL1xuXHRcdFx0XHQvLyBUaGUgZmFjYWRlIG9iamVjdCBleHBvc2VzIG9wZXJhdGlvbnMgbWV0aG9kcyBkaXJlY3RseSwgYnV0IGFyZ3VtZW50cyB0b1xuXHRcdFx0XHQvLyB0aG9zZSBvcGVyYXRpb25zIGNhbiBwYXJ0bHkgYmUgZ2l2ZW4gdGhyb3VnaCBmdW5jdGlvbi1jYWxsIG5vdGF0aW9uLlxuXHRcdFx0XHQvLyBUaGVyZWZvcmUsIGEgZmFjYWRlIGlzIGEgZnVuY3Rpb24sIHN0b3JpbmcgYXJndW1lbnRzIHRoYXQgYXJlIGFscmVhZHkgZ2l2ZW4uXG5cdFx0XHRcdHZhciBmY2QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSBmYWNhZGUoZGVsdGEpO1xuXHRcdFx0XHRcdHJlc3VsdC5fYXJncyA9IGZjZC5fYXJncy5jb25jYXQoYXJncyk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fTtcblx0XHRcdFx0ZmNkLl9hcmdzID0gW107XG5cdFx0XHRcdFUuZXh0ZW5kKGZjZCwgb3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRcdF9hcHBseU9wZXJhdGlvbk1ldGhvZChtZXRob2QsIC4uLmZpbmFsQXJncykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRlbHRhLm9wZXJhdGlvbi5hcHBseShkZWx0YSwgW21ldGhvZF0uY29uY2F0KGZjZC5fYXJncykuY29uY2F0KGZpbmFsQXJncykpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZGVsdGE6IGRlbHRhXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gZmNkO1xuXHRcdFx0fTtcblxuXHRcdH0pKCk7XG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2QgRGVsdGFKcyNmYWNhZGV9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdCAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIHRoZSBmYWNhZGUgdG8gdGhpcyBkZWx0YSwgZm9yIGVhc2lseSBhZGRpbmcgb3BlcmF0aW9uc1xuXHRcdCAqL1xuXHRcdENvbXBvc2l0ZURlbHRhLnByb3RvdHlwZS5mYWNhZGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzRGVsdGFKcy5mYWNhZGUodGhpcykgfTtcblxuXG5cdFx0LyogT3ZlcmxvYWRlZERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE92ZXJsb2FkZWREZWx0YSAqL1xuXHRcdHRoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHR2YXIgT3ZlcmxvYWRlZERlbHRhID0gdGhpcy5vcGVyYXRpb25zWydPdmVybG9hZGVkRGVsdGEnXSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSBbXTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuT3ZlcmxvYWRlZERlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoaXMgb3ZlcmxvYWRlZCBkZWx0YSBoYXMgbm8gb3ZlcmxvYWRzLCBgICtcblx0XHRcdFx0XHRcdFx0YHNvIGNhbm5vdCBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfWBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YE5vbmUgb2YgdGhlIGRlbHRhIHR5cGVzICR7dGhpcy50eXBlLmpvaW4oJywnKX0gYCArXG5cdFx0XHRcdFx0XHRcdGBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfVxcbmAgICAgICAgICAgICtcblx0XHRcdFx0XHRcdFx0ZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdHZhciBvdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoKGRlbHRhKSA9PiBkZWx0YS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KG92ZXJsb2FkcywgNCk7XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T3ZlcmxvYWRlZERlbHRhLnR5cGUgPSBPdmVybG9hZGVkRGVsdGEucHJvdG90eXBlLnR5cGUgPSAnT3ZlcmxvYWRlZERlbHRhJztcblx0XHRPdmVybG9hZGVkRGVsdGEubWV0YSA9IE92ZXJsb2FkZWREZWx0YS5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRcdG1ldGhvZHM6IFtdXG5cdFx0fTtcblx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSB8fCBkMiBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSksIChkMSwgZDIpID0+IHtcblx0XHRcdHZhciBEMSA9IGQxIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhID8gZDEub3ZlcmxvYWRzIDogW2QxXTtcblx0XHRcdHZhciBEMiA9IGQyIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhID8gZDIub3ZlcmxvYWRzIDogW2QyXTtcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgT3ZlcmxvYWRlZERlbHRhKCk7XG5cdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHREMS5mb3JFYWNoKChkZWx0YTEpID0+IHtcblx0XHRcdFx0RDIuZm9yRWFjaCgoZGVsdGEyKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHsgcmVzdWx0Lm92ZXJsb2Fkcy5wdXNoKGRlbHRhMS5jb21wb3NlZFdpdGgoZGVsdGEyKSkgfVxuXHRcdFx0XHRcdGNhdGNoIChlcnJvcikgeyBlcnJvcnMucHVzaChlcnJvcikgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHJlc3VsdC5vdmVybG9hZHMubGVuZ3RoID09PSAwKSB7IHRocm93IG5ldyBFcnJvcihlcnJvcnMubWFwKGUgPT4gZS5tZXNzYWdlKS5qb2luKCdcXG4nKSkgfVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9KTtcblxuXG5cdFx0LyogTW9kaWZ5ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE1vZGlmeSAqL1xuXHRcdHZhciBNb2RpZnkgPSB0aGlzLm9wZXJhdGlvbnNbJ01vZGlmeSddID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGVEZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChfXywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIF9fLCBtZXRhKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0XHQgKi9cblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpLFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdFx0VS5hc3NlcnQodGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIHN0ciA9IERlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2YXIgZGVsdGFzID0gT2JqZWN0LmtleXModGhpcy5kZWx0YXMpLm1hcCgocCkgPT4gdGhpcy5kZWx0YXNbcF0udG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHRcdCAqIEBwYXJhbSBtZXRob2Qge1N0cmluZ30gICAgICAgICAgICAgICAtIHRoZSB0eXBlIG9mIG9wZXJhdGlvbiAoZS5nLiwgJ2FkZCcsICdyZW1vdmUnLCBldGMuKVxuXHRcdFx0ICogQHBhcmFtIHBhdGhPck9wdGlvbnMge09iamVjdHxTdHJpbmd9IC0gdGhlIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uLCBvciBqdXN0IHRoZSBwYXRoXG5cdFx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZGVsdGEgcmVzdWx0aW5nIGZyb20gdGhlIG9wZXJhdGlvblxuXHRcdFx0ICovXG5cdFx0XHRvcGVyYXRpb24obWV0aG9kLCBwYXRoT3JPcHRpb25zID0ge30sIGFyZyA9IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXNEZWx0YUpzLl9wcm9jZXNzT3B0aW9ucyhwYXRoT3JPcHRpb25zKTtcblx0XHRcdFx0dmFyIGRlbHRhID0gdGhpc0RlbHRhSnMuX2dldERlbHRhQnlNZXRob2QobWV0aG9kLCBhcmcpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIGRlbHRhKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgZGVsdGEpIHtcblx0XHRcdFx0dmFyIHtwYXRofSA9IG9wdGlvbnM7XG5cblx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhIGxvbmdlciBjaGFpbiwgY2FsbCB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSAqL1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbignbW9kaWZ5JywgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiBwYXRoLnJlc3QgfSksIGRlbHRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ubWV0YS50YXJnZXRQcm9wID0gcGF0aC5wcm9wO1xuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgQ29tcG9zaXRlRGVsdGEpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE1vZGlmeS50eXBlID0gTW9kaWZ5LnByb3RvdHlwZS50eXBlID0gJ01vZGlmeSc7XG5cdFx0TW9kaWZ5Lm1ldGEgPSBNb2RpZnkucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRtZXRob2RzOiBbJ21vZGlmeSddXG5cdFx0fTtcblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oTW9kaWZ5KSB9KTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10pKSB7IHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXSA9IFtdIH1cblx0XHR0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10ucHVzaCgnTW9kaWZ5Jyk7XG5cblxuXHRcdC8qIHN0YW5kYXJkIG9wZXJhdGlvbnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIHN0YW5kYXJkIG9wZXJhdGlvbnMgKi9cblx0XHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YUpzLnByb3RvdHlwZSAqL1xuXG5cdFx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly8gKlxuXHRcdC8vICovXG5cdFx0Ly92cCh2cE5hbWUsIHZhbCkge1xuXHRcdC8vXHQvLyBUT0RPXG5cdFx0Ly99LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcGF0aE9yT3B0aW9ucyB7U3RyaW5nfHtwYXRoOiBTdHJpbmd9fVxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfcHJvY2Vzc09wdGlvbnMocGF0aE9yT3B0aW9ucykge1xuXHRcdFx0aWYgKHR5cGVvZiBwYXRoT3JPcHRpb25zID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiBuZXcgUGF0aChwYXRoT3JPcHRpb25zKSB9O1xuXHRcdFx0fSBlbHNlIGlmIChwYXRoT3JPcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cdFx0XHRcdHBhdGhPck9wdGlvbnMucGF0aCA9IG5ldyBQYXRoKHBhdGhPck9wdGlvbnMucGF0aCk7XG5cdFx0XHRcdHJldHVybiBwYXRoT3JPcHRpb25zO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdGBUaGUgb3B0aW9ucyBhcmd1bWVudCBvbiBhIGRlbHRhIG9wZXJhdGlvbiBgICtcblx0XHRcdFx0XHRgYSBzaG91bGQgYmUgYSBwYXRoIHN0cmluZyBvciBhbiBvcHRpb25zIG9iamVjdC5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IHRoaXMub3ZlcmxvYWRzW21ldGhvZF1cblx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLm9wZXJhdGlvbnNbdHlwZV0oYXJnLCB7IG1ldGhvZCB9KSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMub3BlcmF0aW9uc1snT3ZlcmxvYWRlZERlbHRhJ10oYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqL1xuXHRcdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGRlbHRhLnByZWNvbmRpdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGp1ZGdtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVHlwZUVycm9yKGp1ZGdtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoZSB2YWx1ZSAnJHt0YXJnZXQudmFsdWV9JyBkb2VzIG5vdCBzYXRpc2Z5IGAgK1xuXHRcdFx0XHRcdFx0XHRgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgJyR7ZGVsdGEudHlwZX0nIG9wZXJhdGlvbi5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIHByb3RvdHlwZSB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUoU3VwZXJjbGFzcywgbmFtZSwgcHJvdG90eXBlKSB7XG5cdFx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gdGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3QpIHsgdGhpcy5jb25zdHJ1Y3QoKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKHRoaXMsIHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7IHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0KSB9XG5cdFx0XHRcdH1cblx0XHRcdH0pKTtcblx0XHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRcdGNscy5tZXRhID0gY2xzLnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHRcdH07XG5cblx0XHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdFx0Y2xzLm1ldGEubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3ZlcmxvYWRzW21ldGhvZF0pKSB7IHRoaXMub3ZlcmxvYWRzW21ldGhvZF0gPSBbXSB9XG5cdFx0XHRcdHRoaXMub3ZlcmxvYWRzW21ldGhvZF0ucHVzaChuYW1lKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBub3RpZnkgbGlzdGVuZXJzICovXG5cdFx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oY2xzKSB9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBmbiB7KEZ1bmN0aW9uKSA9PiB1bmRlZmluZWR9IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc3ViY2xhc3Mgb2YgYERlbHRhSnMjRGVsdGFgXG5cdFx0ICovXG5cdFx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMucHVzaChmbik7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdFx0Zm4odGhpcy5vcGVyYXRpb25zW25hbWVdKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdFx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMub3BlcmF0aW9uc1snTm9PcCddKCkgfVxuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMub3BlcmF0aW9uc1snTm9PcCddKCkgfVxuXG5cdFx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLmNvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0XHRVLmFzc2VydChzdWNjZXNzLFxuXHRcdFx0XHRcdGBBICcke2QxLnR5cGV9JyBvcGVyYXRpb24gY2Fubm90IGJlIGZvbGxvd2VkIGJ5IGEgJyR7ZDIudHlwZX0nIG9wZXJhdGlvbi5gKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRcdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyAodGhpc0RlbHRhSnMub3BlcmF0aW9uc1t0eXBlXSkoZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdFx0Ly8gIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmVcblx0XHRcdHZhciBOb09wID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJyk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmUuXG5cdFx0XHRbXG5cdFx0XHRcdFsnQWRkJyAgICAsICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRcdFx0WydSZXBsYWNlJywgJ3JlcGxhY2UnLCAodGFyZ2V0KSA9PiBVLmlzRGVmaW5lZCAgKHRhcmdldC52YWx1ZSldXG5cdFx0XHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0XHRcdC8vIEluIHRoZSBsaW5lIGRpcmVjdGx5IGJlbG93LCAndGhpcycgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiB0cmFjZXVyOlxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3RyYWNldXItY29tcGlsZXIvaXNzdWVzLzE2MzFcblx0XHRcdFx0dGhpc0RlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0KCkgICAgICAgICAgeyB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhcHBseVRvKHRhcmdldCkgICAgICB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9LFxuXHRcdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucHVzaChkZWx0YSk7XG5cdFx0XHRcdFx0XHRVLmFzc2VydChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiB0aGlzRGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0XHRcdCAgICAgICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpID09PSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGBUaGUgZ2l2ZW4gJyR7ZGVsdGEudHlwZX0nIG9wZXJhdGlvbiBkb2VzIG5vdCBhcHBseSB0byB0aGUgJyR7dHlwZX0nZWQgdmFsdWUuYCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHRcdFx0dmFyIHN0ciA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpc0RlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydQdXRJbnRvQXJyYXknXSgpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbJ1B1dEludG9GdW5jdGlvbiddKCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvLy8qIGRlY2xhcmluZyB0aGUgJ0RlbHRhTW9kZWwnIHR5cGUgKi9cblx0XHRcdHZhciBEZWx0YU1vZGVsID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKHRoaXMub3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHRcdFx0XHQvL3RoaXMuX2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZSgobWV0aG9kLCBbbmFtZSwgcGF0aE9yT3B0aW9ucywgYXJnXSkgPT4ge1xuXHRcdFx0XHRcdC8vfSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHRcdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgICAgICAgICAgICAgIC0gdGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChlLmcuLCAnYWRkJywgJ3JlbW92ZScsIGV0Yy4pXG5cdFx0XHRcdCAqIEBwYXJhbSBuYW1lIHtTdHJpbmd9ICAgICAgICAgICAgICAgICAtIHRoZSBuYW1lIG9mIHRoZSBkZWx0YSBpbnNpZGUgdGhlIGRlbHRhIG1vZGVsXG5cdFx0XHRcdCAqIEBwYXJhbSBwYXRoT3JPcHRpb25zIHtPYmplY3R8U3RyaW5nfSAtIHRoZSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvbiwgb3IganVzdCB0aGUgcGF0aFxuXHRcdFx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAgICAgICAgICAgICAgLSB0aGUgYXJndW1lbnQgdG8gdGhlIG9wZXJhdGlvblxuXHRcdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRvcGVyYXRpb24obWV0aG9kLCBuYW1lLCBwYXRoT3JPcHRpb25zLCBhcmcpIHtcblx0XHRcdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXNEZWx0YUpzLl9wcm9jZXNzT3B0aW9ucyhwYXRoT3JPcHRpb25zKTtcblx0XHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzRGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBkZWx0YSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdFx0ICovXG5cdFx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0XHR2YXIgc3RyID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZ3JhcGgudmVydGV4Q291bnQoKSA+IDApIHtcblx0XHRcdFx0XHRcdHZhciBkZWx0YXMgPSAnJztcblx0XHRcdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRcdFx0ZGVsdGFzICs9IGBbJHtuYW1lfV0gJHtkZWx0YS50b1N0cmluZyhvcHRpb25zKX1cXG5gO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgZGVsdGEpIHtcblx0XHRcdFx0XHR2YXIge3BhdGgsIGJlZm9yZX0gPSBvcHRpb25zO1xuXG5cdFx0XHRcdFx0dmFyIGRlbHRhQmFzZSA9IGRlbHRhO1xuXG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhaW4gb2YgZGVsdGFzICovXG5cdFx0XHRcdFx0aWYgKHBhdGgucHJvcCkge1xuXHRcdFx0XHRcdFx0ZGVsdGFCYXNlID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbJ01vZGlmeSddKCk7XG5cdFx0XHRcdFx0XHRkZWx0YUJhc2UuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBkZWx0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogYSBkZWx0YSBieSB0aGlzIG5hbWUgY2Fubm90IGFscmVhZHkgYmUgaW4gdGhlIGdyYXBoICovXG5cdFx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuZ3JhcGgudmVydGV4VmFsdWUobmFtZSksXG5cdFx0XHRcdFx0XHRgQSBkZWx0YSBieSB0aGUgbmFtZSDigJwke25hbWV94oCdIGlzIGFscmVhZHkgaW4gdGhpcyBkZWx0YSBtb2RlbC5gKTtcblxuXHRcdFx0XHRcdC8qIGFkZCB0aGUgbmV3IGRlbHRhIHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGguYWRkVmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdFx0XHQvKiBjb25uZWN0IGl0IHRvIHRoZSBwYXJ0aWFsIG9yZGVyICovXG5cdFx0XHRcdFx0Ly8gVE9ETzogb3B0aW9ucywgcGFydGlhbCBvcmRlciwgZXRjLi4uXG5cdFx0XHRcdFx0KGJlZm9yZSB8fCBbXSkuZm9yRWFjaCgoc3Vib3JkaW5hdGVOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmdyYXBoLmNyZWF0ZUVkZ2Uoc3Vib3JkaW5hdGVOYW1lLCBuYW1lKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBUT0RPOiBhZGQgcHJlY29uZGl0aW9uIG1ldGhvZCB3aGljaCBjaGVja3MgJ3NvdXJjZScgZGVsdGFzXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRGVsdGFNb2RlbCcgKi9cblx0XHRcdC8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdFx0XHQvLyB3aXRob3V0IGFueSBjb21wb3NhYmlsaXR5IGNoZWNrczsgaW4gdGhlIGZ1dHVyZSwgdGhpcyBtYXkgYmVjb21lIG1vcmUgY2xldmVyXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKChkMSwgZDIpID0+IChkMSBpbnN0YW5jZW9mIERlbHRhTW9kZWwgfHwgZDIgaW5zdGFuY2VvZiBEZWx0YU1vZGVsKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld1ZlcnRleCgxLCBkMSk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMiwgZDIpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHR9XG5cblx0fSk7XG5cblxuXHQvKiB0aGUgUGF0aCBjbGFzcyAqL1xuXHQvLyBUT0RPOiBpbXBsZW1lbnQgdGhhdCB0aGUgYC4oaW5zdGFuY2UpLmAgbWVtYmVycyBhcmUgYWN0dWFsbHkgaW5jbHVkZWQgaW4gaW5zdGFuY2VzXG5cdHZhciBQYXRoID0gRGVsdGFKcy5QYXRoID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoc3RyID0gXCJcIikge1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICAxMTExMSAgMjIyMjIyMjIyMjIgIDMzICAvL1xuXHRcdHZhciBtYXRjaCA9IHN0ci5tYXRjaCgvXihbLiNdPykoXFx3KnxcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0VS5hc3NlcnQobWF0Y2gsIGBUaGUgcGF0aCBzdHJpbmcgJyR7c3RyfScgaXMgbm90IHdlbGwgZm9ybWVkLmApO1xuXHRcdHZhciBbLCBsZWFkLCBwcm9wLCByZXN0XSA9IG1hdGNoO1xuXHRcdGlmIChsZWFkID09PSAnIycpIHtcblx0XHRcdC8vIFRoZSAjIHNlcGFyYXRvciBpcyB1c2VkIGluIHRoZSBKc0RvYyBzZW5zZSwgYW5kIGlzIHRyYW5zbGF0ZWQgdG8gJy4oaW5zdGFuY2UpLidcblx0XHRcdHRoaXMuc2V0KG5ldyBQYXRoKGAuKGluc3RhbmNlKS4ke3Byb3B9JHtyZXN0fWApKTtcblx0XHR9IGVsc2UgaWYgKHByb3AgIT09ICcnKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0XHRcdGlmIChyZXN0ICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLl9yZXN0ID0gbmV3IFBhdGgocmVzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0c2V0KG90aGVyKSB7XG5cdFx0XHR0aGlzLl9wcm9wID0gb3RoZXIuX3Byb3A7XG5cdFx0XHR0aGlzLl9yZXN0ID0gb3RoZXIuX3Jlc3Q7XG5cdFx0fSxcblx0XHRnZXQgcHJvcCgpIHsgcmV0dXJuIHRoaXMuX3Byb3AgfSxcblx0XHRnZXQgcmVzdCgpIHsgcmV0dXJuIHRoaXMuX3Jlc3QgfVxuXHR9KTtcblxuXG5cdC8qIHRoZSBSZWFkYWJsZVRhcmdldCBjbGFzcyAqL1xuXHR2YXIgUmVhZGFibGVUYXJnZXQgPSBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0ID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAodmFsdWUpIHtcblx0XHR0aGlzLl92YWwgPSB2YWx1ZTtcblx0fSwge1xuXHRcdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsIH0sXG5cdFx0Z2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpIH0sXG5cdFx0c2V0IHZhbHVlKHYpIHsgdGhpcy5zZXRWYWx1ZSh2KSB9LFxuXHRcdGNoYWluKHByb3ApIHtcblx0XHRcdFUuYXNzZXJ0KHRoaXMudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0YFRoZSBSZWFkYWJsZVRhcmdldC5wcm90b3R5cGUuY2hhaW4gbWV0aG9kIGV4cGVjdHMgdGhlIHRhcmdldCB2YWx1ZSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdFx0XHRyZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KHRoaXMudmFsdWUsIHByb3ApO1xuXHRcdH1cblx0fSk7XG5cdC8vZnVuY3Rpb24gcnQodmFsdWUpIHsgcmV0dXJuIG5ldyBEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0KHZhbHVlKSB9XG5cblxuXHQvKiB0aGUgV3JpdGFibGVUYXJnZXQgY2xhc3MgKi9cblx0dmFyIFdyaXRhYmxlVGFyZ2V0ID0gRGVsdGFKcy5Xcml0YWJsZVRhcmdldCA9IFUubmV3U3ViY2xhc3MoUmVhZGFibGVUYXJnZXQsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG5cdFx0dGhpcy5fb2JqICA9IG9iajtcblx0XHR0aGlzLl9wcm9wID0gcHJvcDtcblx0fSwge1xuXHRcdGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH0sXG5cdFx0c2V0VmFsdWUodikgeyB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gPSB2IH0sXG5cdFx0ZGVsZXRlKCkgeyBkZWxldGUgdGhpcy5fb2JqW3RoaXMuX3Byb3BdIH1cblx0fSk7XG5cdGZ1bmN0aW9uIHd0KG9iaiwgcHJvcCkgeyByZXR1cm4gbmV3IFdyaXRhYmxlVGFyZ2V0KG9iaiwgcHJvcCkgfVxuXG5cblx0LyogZXhwb3J0IHRoZSBtYWluIGNsYXNzICovXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHRcdH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0XHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdFx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0XHRyZXR1cm4gbmV3X29iajtcblx0XHR9LFxuXG5cdFx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHRcdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdFx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=