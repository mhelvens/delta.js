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
	      operation: function(method, options, path, arg) {
	        var $__4;
	        if (typeof options === 'string') {
	          ($__4 = [{}, options, path], options = $__4[0], path = $__4[1], arg = $__4[2], $__4);
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
	        } else if (!judgment) {
	          return new ApplicationError(delta, target.value);
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
	            if (result.deltasToApplyToArg.reduce((function(d1, d2) {
	              return thisDeltaJs.composed(d1, d2);
	            })).precondition(wt(result, 'arg')) !== true) {
	              throw new DeltaArgApplicationError(delta, this);
	            }
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
	        operation: function(method, name, options, path, arg) {
	          var $__4;
	          if (typeof options === 'string') {
	            ($__4 = [{}, options, path], options = $__4[0], path = $__4[1], arg = $__4[2], $__4);
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
	          var $__0 = this;
	          var before = options.before;
	          var deltaBase = delta;
	          if (path.prop) {
	            deltaBase = new thisDeltaJs.operations['Modify']();
	            deltaBase._addOperation(options, path, delta);
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
	  var ApplicationError = DeltaJs.ApplicationError = U.newSubclass(Error, (function(superFn) {
	    return function ApplicationError(delta, value) {
	      superFn.call(this, ("This delta of type '" + delta.type + "' cannot apply to this value of type '" + typeof value + "."));
	      this.delta = delta;
	      this.value = value;
	    };
	  }));
	  var MultipleOverloadsApplicationError = DeltaJs.MultipleOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
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
	  var NoOverloadsApplicationError = DeltaJs.NoOverloadsApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	    return function NoOverloadsApplicationError(delta, value) {
	      superFn.call(this, delta, value);
	      this.message = ("This delta of type '" + delta.type + "' has no spcific deltas assigned to it, so it cannot apply to this value of type '" + typeof value + ".");
	    };
	  }));
	  var DeltaArgApplicationError = DeltaJs.DeltaArgApplicationError = U.newSubclass(ApplicationError, (function(superFn) {
	    return function DeltaArgApplicationError(delta, baseDelta) {
	      superFn.call(this, delta, baseDelta.arg);
	      this.message = ("This delta of type '" + delta.type + "' cannot apply to the type-'" + typeof baseDelta.arg + "'-value of this base delta of type '" + baseDelta.type + "'.");
	      this.baseDelta = baseDelta;
	    };
	  }));
	  var CompositionError = DeltaJs.CompositionError = U.newSubclass(Error, (function(superFn) {
	    return function CompositionError(delta1, delta2) {
	      superFn.call(this, ("This delta of type '" + delta1.type + "' cannot be composed with this other delta of type '" + delta2.type + "."));
	      this.delta1 = delta1;
	      this.delta2 = delta2;
	    };
	  }));
	  var MultipleOverloadsCompositionError = DeltaJs.MultipleOverloadsCompositionError = U.newSubclass(CompositionError, (function(superFn) {
	    return function MultipleOverloadsCompositionError(delta1, delta2) {
	      var errors = arguments[2] !== (void 0) ? arguments[2] : [];
	      superFn.call(this, delta1, delta2);
	      this.errors = errors;
	      this.message = ("There are no overloads to compose this delta of type '" + delta1.type + "' with this other delta of type '" + delta2.type + "'.") + errors.map((function(e) {
	        return ("\n-- " + e.message);
	      })).join('');
	    };
	  }));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0YjU1ZGUxNzcyMDgzMjM2ZDc4MiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBUVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTs7QUFHckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixRQUFHLDZCQUE2QixFQUFJLEdBQUMsQ0FBQztBQUdsQyxnQkFBTyxFQUFJLEdBQUM7QUFDWixh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O0tBQzFEO0FBQUEsR0FDRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0YjU1ZGUxNzcyMDgzMjM2ZDc4MlxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcycsICdqcy1ncmFwaCddLCBmdW5jdGlvbiAoVSwgSnNHcmFwaCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BjbGFzcyBEZWx0YUpzfVxuXHQgKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG5cdCAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuXHQgKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuXHQgKi9cblx0dmFyIERlbHRhSnMgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGEtc3ViY2xhc3Ncblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXHRcdC8qIERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGEgKi9cblx0XHR2YXIgbmV4dFVVSUQgPSAxO1xuXHRcdHZhciBEZWx0YSA9IHRoaXMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHRoaXMuYXJnID0gYXJnO1xuXHRcdFx0dGhpcy5tZXRhID0gVS5leHRlbmQoe30sIG1ldGEgfHwge30sIHsgdXVpZDogbmV4dFVVSUQrKyB9KTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtICB2YWx1ZSB7Kn0gLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHRcdCAqIEByZXR1cm4gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHRcdCAqL1xuXHRcdFx0YXBwbGllZFRvKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSB7IHZhbHVlID0gdmFsdWUudmFsdWUgfVxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpKTtcblx0XHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiB0aGlzRGVsdGFKcy5jb21wb3NlZCh0aGlzLCBvdGhlcikgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR2YXIgc3RyID0gdGhpcy50eXBlO1xuXHRcdFx0XHRpZiAodGhpcy5tZXRhLnRhcmdldFByb3ApICB7IHN0ciArPSBgIOKAuSR7dGhpcy5tZXRhLnRhcmdldFByb3B94oC6YCB9XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0XHRpZiAob3B0aW9ucy5kZWJ1ZykgICAgICAgICB7IHN0ciArPSBgICgke3RoaXMubWV0YS51dWlkfSlgIH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cdFx0fSk7XG5cblxuXHRcdC8qIENvbXBvc2l0ZURlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogQ29tcG9zaXRlRGVsdGEgKi9cblx0XHR2YXIgQ29tcG9zaXRlRGVsdGEgPSB0aGlzLm9wZXJhdGlvbnMuQ29tcG9zaXRlRGVsdGEgPSBVLm5ld1N1YmNsYXNzKERlbHRhLCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHRcdCAqIEltcGxlbWVudCB0aGlzIGluIHN1YmNsYXNzZXMgdG8gcHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKi9cblx0XHRcdG9wZXJhdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBIENvbXBvc2l0ZURlbHRhIHN1YmNsYXNzIG5lZWRzIHRvIGltcGxlbWVudCB0aGUgJ29wZXJhdGlvbicgbWV0aG9kLmApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCgoKSA9PiB7XG5cdFx0XHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXHRcdFx0dGhpcy5vbk5ld09wZXJhdGlvblR5cGUoKGNscykgPT4ge1xuXHRcdFx0XHQoY2xzLm1ldGEgJiYgY2xzLm1ldGEubWV0aG9kcyB8fCBbXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRcdFx0b3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYXBwbHlPcGVyYXRpb25NZXRob2QuYXBwbHkodGhpcywgW21ldGhvZF0uY29uY2F0KGFyZ3MpKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXNEZWx0YUpzLmZhY2FkZShcblx0XHRcdFx0XHRcdFx0XHQobmV3RGVsdGEgaW5zdGFuY2VvZiBDb21wb3NpdGVEZWx0YSkgPyBuZXdEZWx0YSA6IHRoaXMuZGVsdGFcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2QgRGVsdGFKcyNmYWNhZGV9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtIGRlbHRhIHtEZWx0YUpzI29wZXJhdGlvbnMuQ29tcG9zaXRlRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5mYWNhZGUgPSBmdW5jdGlvbiBmYWNhZGUoZGVsdGEpIHtcblx0XHRcdFx0LyogdGhlIGZhY2FkZSBpdHNlbGYgKi9cblx0XHRcdFx0Ly8gVGhlIGZhY2FkZSBvYmplY3QgZXhwb3NlcyBvcGVyYXRpb25zIG1ldGhvZHMgZGlyZWN0bHksIGJ1dCBhcmd1bWVudHMgdG9cblx0XHRcdFx0Ly8gdGhvc2Ugb3BlcmF0aW9ucyBjYW4gcGFydGx5IGJlIGdpdmVuIHRocm91Z2ggZnVuY3Rpb24tY2FsbCBub3RhdGlvbi5cblx0XHRcdFx0Ly8gVGhlcmVmb3JlLCBhIGZhY2FkZSBpcyBhIGZ1bmN0aW9uLCBzdG9yaW5nIGFyZ3VtZW50cyB0aGF0IGFyZSBhbHJlYWR5IGdpdmVuLlxuXHRcdFx0XHR2YXIgZmNkID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gZmFjYWRlKGRlbHRhKTtcblx0XHRcdFx0XHRyZXN1bHQuX2FyZ3MgPSBmY2QuX2FyZ3MuY29uY2F0KGFyZ3MpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGZjZC5fYXJncyA9IFtdO1xuXHRcdFx0XHRVLmV4dGVuZChmY2QsIG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2QobWV0aG9kLCAuLi5maW5hbEFyZ3MpIHtcblx0XHRcdFx0XHRcdHJldHVybiBkZWx0YS5vcGVyYXRpb24uYXBwbHkoZGVsdGEsIFttZXRob2RdLmNvbmNhdChmY2QuX2FyZ3MpLmNvbmNhdChmaW5hbEFyZ3MpKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRlbHRhOiBkZWx0YVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGZjZDtcblx0XHRcdH07XG5cblx0XHR9KSgpO1xuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kIERlbHRhSnMjZmFjYWRlfXtAbm9zaWRlZWZmZWN0c31cblx0XHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSB0aGUgZmFjYWRlIHRvIHRoaXMgZGVsdGEsIGZvciBlYXNpbHkgYWRkaW5nIG9wZXJhdGlvbnNcblx0XHQgKi9cblx0XHRDb21wb3NpdGVEZWx0YS5wcm90b3R5cGUuZmFjYWRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpc0RlbHRhSnMuZmFjYWRlKHRoaXMpIH07XG5cblxuXHRcdC8qIE92ZXJsb2FkZWREZWx0YSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBPdmVybG9hZGVkRGVsdGEgKi9cblx0XHR0aGlzLm92ZXJsb2FkcyA9IHt9OyAvLyBtZXRob2QgLT4gW2RlbHRhLWNsYXNzZXNdXG5cdFx0dmFyIE92ZXJsb2FkZWREZWx0YSA9IHRoaXMub3BlcmF0aW9uc1snT3ZlcmxvYWRlZERlbHRhJ10gPSBVLm5ld1N1YmNsYXNzKHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdHRoaXMub3ZlcmxvYWRzID0gW107XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk92ZXJsb2FkZWREZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRyZXN1bHQub3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKGRlbHRhID0+IGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCB7RGVsdGFKcy5Xcml0YWJsZVRhcmdldH1cblx0XHRcdCAqL1xuXHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0LyogYXBwbHkgdGhlIGZpcnN0IG92ZXJsb2FkIHRoYXQgYXBwbGllcyB0byB0aGUgdGFyZ2V0OyBnYXRoZXIgYW55IGVycm9ycyAqL1xuXHRcdFx0XHR2YXIgZXJyb3JzID0gW107XG5cdFx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5vdmVybG9hZHMuc29tZSgoZGVsdGEpID0+IHtcblx0XHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24oZGVsdGEsIHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRlcnJvcnMucHVzaChqdWRnbWVudCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlbHRhLmFwcGx5VG8odGFyZ2V0KTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8qIGlmIG5vbmUgYXBwbHksIHRocm93IGFuIGFwcHJvcHJpYXRlIGVycm9yICovXG5cdFx0XHRcdGlmICghc3VjY2Vzcykge1xuXHRcdFx0XHRcdGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yKHRoaXMsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IodGhpcywgdGFyZ2V0LnZhbHVlLCBlcnJvcnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIHN0ciA9IERlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHR2YXIgb3ZlcmxvYWRzID0gdGhpcy5vdmVybG9hZHMubWFwKChkZWx0YSkgPT4gZGVsdGEudG9TdHJpbmcob3B0aW9ucykpLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChvdmVybG9hZHMsIDQpO1xuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE92ZXJsb2FkZWREZWx0YS50eXBlID0gT3ZlcmxvYWRlZERlbHRhLnByb3RvdHlwZS50eXBlID0gJ092ZXJsb2FkZWREZWx0YSc7XG5cdFx0T3ZlcmxvYWRlZERlbHRhLm1ldGEgPSBPdmVybG9hZGVkRGVsdGEucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRtZXRob2RzOiBbXVxuXHRcdH07XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEgfHwgZDIgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IE92ZXJsb2FkZWREZWx0YSgpO1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGQxLCBkMiwgZXJyb3JzKSB9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0pO1xuXG5cblx0XHQvKiBNb2RpZnkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogTW9kaWZ5ICovXG5cdFx0dmFyIE1vZGlmeSA9IHRoaXMub3BlcmF0aW9uc1snTW9kaWZ5J10gPSBVLm5ld1N1YmNsYXNzKENvbXBvc2l0ZURlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKF9fLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgX18sIG1ldGEpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHRcdCAqL1xuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuV3JpdGFibGVUYXJnZXR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHR2YXIgc3RyID0gRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgICAgICAgICAgICAgIC0gdGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChlLmcuLCAnYWRkJywgJ3JlbW92ZScsIGV0Yy4pXG5cdFx0XHQgKiBAcGFyYW0gcGF0aE9yT3B0aW9ucyB7T2JqZWN0fFN0cmluZ30gLSB0aGUgb3B0aW9ucyBmb3IgdGhpcyBvcGVyYXRpb24sIG9yIGp1c3QgdGhlIHBhdGhcblx0XHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKi9cblx0XHRcdG9wZXJhdGlvbihtZXRob2QsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7IFtvcHRpb25zLCBwYXRoLCBhcmddID0gW3t9LCBvcHRpb25zLCBwYXRoXSB9XG5cdFx0XHRcdHZhciBkZWx0YSA9IHRoaXNEZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLCBkZWx0YSkge1xuXHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhICdyZXN0JyB0byB0aGUgcGF0aCwgc2V0IGEgbGluayBpbiB0aGUgY2hhaW4gKi9cblx0XHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbignbW9kaWZ5JywgcGF0aC5wcm9wKVxuXHRcdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBwYXRoLnJlc3QsIGRlbHRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzLmRlbHRhc1twYXRoLnByb3BdID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5jb21wb3NlZFdpdGgoZGVsdGEpIDogZGVsdGE7XG5cdFx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ubWV0YS50YXJnZXRQcm9wID0gcGF0aC5wcm9wO1xuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdFx0cmV0dXJuICh0aGlzLmRlbHRhc1twYXRoLnByb3BdIGluc3RhbmNlb2YgQ29tcG9zaXRlRGVsdGEpID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE1vZGlmeS50eXBlID0gTW9kaWZ5LnByb3RvdHlwZS50eXBlID0gJ01vZGlmeSc7XG5cdFx0TW9kaWZ5Lm1ldGEgPSBNb2RpZnkucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRtZXRob2RzOiBbJ21vZGlmeSddXG5cdFx0fTtcblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oTW9kaWZ5KSB9KTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10pKSB7IHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXSA9IFtdIH1cblx0XHR0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10ucHVzaCgnTW9kaWZ5Jyk7XG5cblxuXHRcdC8qIHN0YW5kYXJkIG9wZXJhdGlvbnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIHN0YW5kYXJkIG9wZXJhdGlvbnMgKi9cblx0XHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YUpzLnByb3RvdHlwZSAqL1xuXG5cdFx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly8gKlxuXHRcdC8vICovXG5cdFx0Ly92cCh2cE5hbWUsIHZhbCkge1xuXHRcdC8vXHQvLyBUT0RPXG5cdFx0Ly99LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFyZyAgICB7Kn1cblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqL1xuXHRcdF9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKSB7XG5cdFx0XHR2YXIgbmV3RGVsdGFzID0gdGhpcy5vdmVybG9hZHNbbWV0aG9kXVxuXHRcdFx0XHQubWFwKHR5cGUgPT4gbmV3IHRoaXMub3BlcmF0aW9uc1t0eXBlXShhcmcsIHsgbWV0aG9kIH0pKTtcblx0XHRcdGlmIChuZXdEZWx0YXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiBuZXdEZWx0YXNbMF07XG5cdFx0XHR9IGVsc2UgeyAvLyBuZXdEZWx0YXMubGVuZ3RoID4gMVxuXHRcdFx0XHR2YXIgZGVsdGEgPSBuZXcgdGhpcy5vcGVyYXRpb25zWydPdmVybG9hZGVkRGVsdGEnXShhcmcsIHsgbWV0aG9kIH0pO1xuXHRcdFx0XHRkZWx0YS5vdmVybG9hZHMgPSBuZXdEZWx0YXM7XG5cdFx0XHRcdHJldHVybiBkZWx0YTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZGVsdGEgIHtEZWx0YUpzI0RlbHRhfVxuXHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuUmVhZGFibGVUYXJnZXR9XG5cdFx0ICovXG5cdFx0X2V2YWx1YXRlUHJlY29uZGl0aW9uKGRlbHRhLCB0YXJnZXQpIHtcblx0XHRcdGlmICh0eXBlb2YgZGVsdGEucHJlY29uZGl0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHZhciBqdWRnbWVudCA9IGRlbHRhLnByZWNvbmRpdGlvbih0YXJnZXQpO1xuXHRcdFx0XHRpZiAoanVkZ21lbnQgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBqdWRnbWVudDtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IEFwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRhcmdldC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG5hbWUgICAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBwcm90b3R5cGUge09iamVjdH1cblx0XHQgKi9cblx0XHRuZXdPcGVyYXRpb25UeXBlKFN1cGVyY2xhc3MsIG5hbWUsIHByb3RvdHlwZSkge1xuXHRcdFx0aWYgKHR5cGVvZiBTdXBlcmNsYXNzID09PSAnc3RyaW5nJykgeyBbU3VwZXJjbGFzcywgbmFtZSwgcHJvdG90eXBlXSA9IFt1bmRlZmluZWQsIFN1cGVyY2xhc3MsIG5hbWVdIH1cblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblxuXHRcdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5vcGVyYXRpb25zW25hbWVdLFxuXHRcdFx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3MoU3VwZXJjbGFzcyB8fCB0aGlzLkRlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKGFyZywgbWV0YSkge1xuXHRcdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdFx0aWYgKHRoaXMuY29uc3RydWN0KSB7IHRoaXMuY29uc3RydWN0KCkgfVxuXHRcdFx0fSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge1xuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbih0aGlzLCB0YXJnZXQpO1xuXHRcdFx0XHRcdGlmIChqdWRnbWVudCAhPT0gdHJ1ZSkgeyB0aHJvdyBqdWRnbWVudCB9XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3RvdHlwZS5hcHBseVRvKSkgeyBwcm90b3R5cGUuYXBwbHlUby5jYWxsKHRoaXMsIHRhcmdldCkgfVxuXHRcdFx0XHR9XG5cdFx0XHR9KSk7XG5cdFx0XHRjbHMudHlwZSA9IGNscy5wcm90b3R5cGUudHlwZSA9IG5hbWU7XG5cdFx0XHRjbHMubWV0YSA9IGNscy5wcm90b3R5cGUubWV0YSA9IHtcblx0XHRcdFx0Ly8gaWYgbm8gbWV0aG9kcyBhcmUgcHJvdmlkZWQsIHVzZSB0aGUgb3BlcmF0aW9uIG5hbWUgc3RhcnRpbmcgd2l0aCBhIGxvd2VyY2FzZSBsZXR0ZXJcblx0XHRcdFx0bWV0aG9kczogcHJvdG90eXBlLm1ldGhvZHMgfHwgWyBuYW1lWzBdLnRvTG93ZXJDYXNlKCkrbmFtZS5zbGljZSgxKSBdXG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhZGQgdGhpcyBuZXcgdHlwZSB0byB0aGUgbGlzdCBvZiB0eXBlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBtZXRob2QgKi9cblx0XHRcdGNscy5tZXRhLm1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1ttZXRob2RdKSkgeyB0aGlzLm92ZXJsb2Fkc1ttZXRob2RdID0gW10gfVxuXHRcdFx0XHR0aGlzLm92ZXJsb2Fkc1ttZXRob2RdLnB1c2gobmFtZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Lyogbm90aWZ5IGxpc3RlbmVycyAqL1xuXHRcdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKGNscykgfSk7XG5cblx0XHRcdC8qIHJldHVybiB0aGUgbmV3IGNsYXNzICovXG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZm4geyhGdW5jdGlvbikgPT4gdW5kZWZpbmVkfSAtIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHN1YmNsYXNzIG9mIGBEZWx0YUpzI0RlbHRhYFxuXHRcdCAqL1xuXHRcdG9uTmV3T3BlcmF0aW9uVHlwZShmbikge1xuXHRcdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLnB1c2goZm4pO1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdGZuKHRoaXMub3BlcmF0aW9uc1tuYW1lXSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBwcmVjb25kaXRpb24geyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBCb29sZWFufSAtIGNhbiB0aGVzZSBkZWx0YXMgYmUgY29tcG9zZWQgdGhpcyB3YXk/XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgICAgICB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IERlbHRhSnMjRGVsdGF9IC0gc2hvdWxkIGJlIHNpZGUtZWZmZWN0IGZyZWVcblx0XHQgKi9cblx0XHRuZXdDb21wb3NpdGlvbihwcmVjb25kaXRpb24sIGNvbXBvc2UpIHtcblx0XHRcdHRoaXMuY29tcG9zaXRpb25zLnB1c2goe3ByZWNvbmRpdGlvbiwgY29tcG9zZX0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGQxIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBmaXJzdCBkZWx0YVxuXHRcdCAqIEBwYXJhbSBkMiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgc2Vjb25kIGRlbHRhXG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHQgKi9cblx0XHRjb21wb3NlZChkMSwgZDIpIHtcblx0XHRcdC8qIGhhbmRsZSB0aGUgY2FzZXMgd2hlcmUgb25lIG9yIGJvdGggYXJndW1lbnRzIGFyZSB1bmRlZmluZWQgKi9cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGQxKSkgeyBkMSA9IG5ldyB0aGlzLm9wZXJhdGlvbnNbJ05vT3AnXSgpIH1cblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKGQyKSkgeyBkMiA9IG5ldyB0aGlzLm9wZXJhdGlvbnNbJ05vT3AnXSgpIH1cblxuXHRcdFx0LyogdXNlIHRoZSBmaXJzdCBjb21wb3NpdGlvbiBmdW5jdGlvbiBmb3Igd2hpY2ggdGhlc2UgZGVsdGFzIHNhdGlzZnkgdGhlIHByZWNvbmRpdGlvbiAqL1xuXHRcdFx0dmFyIGNvbXBvc2VGbiA9ICgpPT57fTtcblx0XHRcdHZhciBzdWNjZXNzID0gdGhpcy5jb21wb3NpdGlvbnMuc29tZSgoe3ByZWNvbmRpdGlvbiwgY29tcG9zZTogZm59KSA9PiB7XG5cdFx0XHRcdGlmIChwcmVjb25kaXRpb24oZDEsIGQyKSkge1xuXHRcdFx0XHRcdGNvbXBvc2VGbiA9IGZuO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlOyAvLyBzdWNjZXNzOyBicmVhayB0aGUgbG9vcFxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogdGhyb3cgYW4gZXJyb3Igb24gZmFpbHVyZSAqL1xuXHRcdFx0aWYgKCFzdWNjZXNzKSB7IHRocm93IG5ldyBDb21wb3NpdGlvbkVycm9yKGQxLCBkMikgfVxuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0XHRyZXR1cm4gY29tcG9zZUZuKGQxLCBkMik7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lU3RhbmRhcmRPcGVyYXRpb25UeXBlcygpIHtcblxuXHRcdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3ICh0aGlzRGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sXG5cdFx0XHQvLyAgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZVxuXHRcdFx0dmFyIE5vT3AgPSB0aGlzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdC8vICdNb2RpZnknIGlzIHRoZSBtb3N0IGZ1bmRhbWVudGFsIG9wZXJhdGlvbiwgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZS5cblx0XHRcdFtcblx0XHRcdFx0WydBZGQnICAgICwgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XHRcdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHRcdFx0Ly8gSW4gdGhlIGxpbmUgZGlyZWN0bHkgYmVsb3csICd0aGlzJyBjYW5ub3QgYmUgdXNlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRyYWNldXI6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdFx0XHR0aGlzRGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBwcmUodGFyZ2V0KTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSAgICAgIHsgdGFyZ2V0LnZhbHVlID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcucmVkdWNlKCh2LCBkKSA9PiBkLmFwcGxpZWRUbyh2KSwgdGhpcy5hcmcpIH0sXG5cdFx0XHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5tYXAoZCA9PiBkKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZnRlckFwcGx5aW5nKGRlbHRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpcy5jbG9uZSgpO1xuXHRcdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5wdXNoKGRlbHRhKTtcblx0XHRcdFx0XHRcdGlmIChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiB0aGlzRGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0XHRcdC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHRoaXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dG9TdHJpbmcob3B0aW9ucykge1xuXHRcdFx0XHRcdFx0dmFyIHN0ciA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZWx0YXMgPSBPYmplY3Qua2V5cyh0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZylcblx0XHRcdFx0XHRcdFx0XHQubWFwKChwKSA9PiB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZ1twXS50b1N0cmluZyhvcHRpb25zKSkuam9pbignXFxuJyk7XG5cdFx0XHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpc0RlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1JlcGxhY2UnKSwgZCgnQWRkJywgICAgICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICApO1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGFycmF5IG9wZXJhdGlvbiB0eXBlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvQXJyYXknLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiBBcnJheS5pc0FycmF5KHRhcmdldC52YWx1ZSkgfSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0FycmF5JyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlbW92ZScgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydQdXRJbnRvQXJyYXknXSgpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBmdW5jdGlvbiBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdQdXRJbnRvRnVuY3Rpb24nLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5tZXRhLm1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbe1xuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHRoaXMubWV0YS5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmFyZ1xuXHRcdFx0XHRcdFx0fV07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgdGhpcy5hcmcsIHRoaXMubWV0YSk7IC8vIHN1cGVyKClcblx0XHRcdFx0XHRyZXN1bHQudmFsdWVzID0gW107XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgodikgPT4geyByZXN1bHQudmFsdWVzLnB1c2godikgfSk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fSxcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkge1xuXHRcdFx0XHRcdHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIHR5cGVvZiB0YXJnZXQudmFsdWUgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHRcdFx0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpIHx8IHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSkge1xuXHRcdFx0XHRcdFx0dmFyIG9yaWdpbmFsRm4gPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0XHR2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdC8vbm9pbnNwZWN0aW9uIEpTVW51c2VkQXNzaWdubWVudFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucyA9IFtmdW5jdGlvbiAoLi4uYXJncykgeyBvcmlnaW5hbEZuLmFwcGx5KHRoaXMsIGFyZ3MpIH1dO1xuXHRcdFx0XHRcdFx0dGFyZ2V0LnZhbHVlID0gbmV3Rm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHttZXRob2QsIHZhbHVlfSkgPT4ge1xuXHRcdFx0XHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0XHRcdFx0Y2FzZSAncHJlcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIudW5zaGlmdCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2luc2VydCc6IHtcblx0XHRcdFx0XHRcdFx0XHQvLyAnaW5zZXJ0JyBkb2Vzbid0ICpoYXZlKiB0byB1c2UgYSByYW5kb20gcG9zaXRpb24uIEFueSBwb3NpdGlvbiB3aWxsIGRvLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBFLmcuLCBpdHMgaW1wbGVtZW50YXRpb24gY291bGQganVzdCBiZSB0aGUgc2FtZSBhcyBmb3IgJ2FwcGVuZCcuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIE5vbmV0aGVsZXNzLCB3ZSB1c2UgYSByYW5kb20gcG9zaXRpb24gdG8gZm9yY2UgdGhlIHRlc3RzIHRvIGJlIHBlcm1pc3NpdmUuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHBvc2l0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGFyci5sZW5ndGggKyAxKSk7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnNwbGljZShwb3NpdGlvbiwgMCwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRtZXRob2RzOiBbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUHV0SW50b0Z1bmN0aW9uJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnICAgICAgICAsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZW1vdmUnICAgICAgICAgKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdSZXBsYWNlJyAgICAgICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9GdW5jdGlvbicsICdQdXRJbnRvRnVuY3Rpb24nKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbJ1B1dEludG9GdW5jdGlvbiddKCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gVE9ETzogQ2hhbmdlICdhcHBlbmQnIGFuZCAncHJlcGVuZCcgdG8gZm9sbG93IGFueSB1bmRlcmx5aW5nIHBhcnRpYWwgb3JkZXIgKGRlbHRhIG1vZGVsKVxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvLy8qIGRlY2xhcmluZyB0aGUgJ0RlbHRhTW9kZWwnIHR5cGUgKi9cblx0XHRcdHZhciBEZWx0YU1vZGVsID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKHRoaXMub3BlcmF0aW9ucy5Db21wb3NpdGVEZWx0YSwgJ0RlbHRhTW9kZWwnLCB7XG5cdFx0XHRcdGNvbnN0cnVjdCgpIHtcblx0XHRcdFx0XHR0aGlzLmdyYXBoID0gbmV3IEpzR3JhcGgoKTtcblx0XHRcdFx0XHQvL3RoaXMuX2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZSgobWV0aG9kLCBbbmFtZSwgcGF0aE9yT3B0aW9ucywgYXJnXSkgPT4ge1xuXHRcdFx0XHRcdC8vfSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgRGVsdGFNb2RlbCgpO1xuXHRcdFx0XHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguZWFjaFZlcnRleCgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZ3JhcGguc2V0VmVydGV4KGlkLCBkZWx0YS5jbG9uZSgpKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgc3ViRGVsdGEpID0+IHtcblx0XHRcdFx0XHRcdHN1YkRlbHRhLmFwcGx5VG8odGFyZ2V0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdCAqIFByZXBhcmUgYSBzcGVjaWZpYyBkZWx0YSBvcGVyYXRpb24gd2l0aCB0aGlzIE1vZGlmeSBkZWx0YSBhcyB0aGUgYmFzZS5cblx0XHRcdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfSAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHRcdFx0ICogQHBhcmFtIG5hbWUge1N0cmluZ30gICAgLSB0aGUgbmFtZSBvZiB0aGUgZGVsdGEgaW5zaWRlIHRoZSBkZWx0YSBtb2RlbFxuXHRcdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fSAtIHRoZSAob3B0aW9uYWwpIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uXG5cdFx0XHRcdCAqIEBwYXJhbSBwYXRoIHtTdHJpbmd9ICAgIC0gdGhlIHBhdGggdG8gcGVyZm9ybSB0aGlzIG9wZXJhdGlvbiBvblxuXHRcdFx0XHQgKiBAcGFyYW0gYXJnIHsqfSAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHRcdFx0ICovXG5cdFx0XHRcdG9wZXJhdGlvbihtZXRob2QsIG5hbWUsIG9wdGlvbnMsIHBhdGgsIGFyZykge1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHsgW29wdGlvbnMsIHBhdGgsIGFyZ10gPSBbe30sIG9wdGlvbnMsIHBhdGhdIH1cblx0XHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzRGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBuZXcgUGF0aChwYXRoKSwgZGVsdGEpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0b1N0cmluZyhvcHRpb25zKSB7XG5cdFx0XHRcdFx0dmFyIHN0ciA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGRlbHRhcyArPSBgWyR7bmFtZX1dICR7ZGVsdGEudG9TdHJpbmcob3B0aW9ucyl9XFxuYDtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHRfYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIHBhdGgsIGRlbHRhKSB7XG5cdFx0XHRcdFx0dmFyIHtiZWZvcmV9ID0gb3B0aW9ucztcblxuXHRcdFx0XHRcdHZhciBkZWx0YUJhc2UgPSBkZWx0YTtcblxuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgcGF0aCwgY3JlYXRlIHRoZSBjb3JyZXNwb25kaW5nIGNoYWluIG9mIGRlbHRhcyAqL1xuXHRcdFx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydNb2RpZnknXSgpO1xuXHRcdFx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgcGF0aCwgZGVsdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIGEgZGVsdGEgYnkgdGhpcyBuYW1lIGNhbm5vdCBhbHJlYWR5IGJlIGluIHRoZSBncmFwaCAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KCF0aGlzLmdyYXBoLnZlcnRleFZhbHVlKG5hbWUpLFxuXHRcdFx0XHRcdFx0YEEgZGVsdGEgYnkgdGhlIG5hbWUg4oCcJHtuYW1lfeKAnSBpcyBhbHJlYWR5IGluIHRoaXMgZGVsdGEgbW9kZWwuYCk7XG5cblx0XHRcdFx0XHQvKiBhZGQgdGhlIG5ldyBkZWx0YSB0byB0aGUgZGVsdGEgbW9kZWwgKi9cblx0XHRcdFx0XHR0aGlzLmdyYXBoLmFkZFZlcnRleChuYW1lLCBkZWx0YUJhc2UpO1xuXG5cdFx0XHRcdFx0LyogY29ubmVjdCBpdCB0byB0aGUgcGFydGlhbCBvcmRlciAqL1xuXHRcdFx0XHRcdC8vIFRPRE86IG9wdGlvbnMsIHBhcnRpYWwgb3JkZXIsIGV0Yy4uLlxuXHRcdFx0XHRcdChiZWZvcmUgfHwgW10pLmZvckVhY2goKHN1Ym9yZGluYXRlTmFtZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5ncmFwaC5jcmVhdGVFZGdlKHN1Ym9yZGluYXRlTmFtZSwgbmFtZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdFx0XHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogdGhlIFBhdGggY2xhc3MgKi9cblx0Ly8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXHR2YXIgUGF0aCA9IERlbHRhSnMuUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdHNldChvdGhlcikge1xuXHRcdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHRcdH0sXG5cdFx0Z2V0IHByb3AoKSB7IHJldHVybiB0aGlzLl9wcm9wIH0sXG5cdFx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblx0fSk7XG5cblxuXHQvKiB0aGUgUmVhZGFibGVUYXJnZXQgY2xhc3MgKi9cblx0dmFyIFJlYWRhYmxlVGFyZ2V0ID0gRGVsdGFKcy5SZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0dGhpcy5fdmFsID0gdmFsdWU7XG5cdH0sIHtcblx0XHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRcdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRcdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfSxcblx0XHRjaGFpbihwcm9wKSB7XG5cdFx0XHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRcdFx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcblx0XHR9XG5cdH0pO1xuXHQvL2Z1bmN0aW9uIHJ0KHZhbHVlKSB7IHJldHVybiBuZXcgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCh2YWx1ZSkgfVxuXG5cblx0LyogdGhlIFdyaXRhYmxlVGFyZ2V0IGNsYXNzICovXG5cdHZhciBXcml0YWJsZVRhcmdldCA9IERlbHRhSnMuV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHRcdHRoaXMuX29iaiAgPSBvYmo7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdH0sIHtcblx0XHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRcdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRcdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG5cdH0pO1xuXHRmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cdC8qIEVycm9yIHN1YmNsYXNzZXMgKi9cblx0dmFyIEFwcGxpY2F0aW9uRXJyb3IgPSBEZWx0YUpzLkFwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gQXBwbGljYXRpb25FcnJvcihkZWx0YSwgdmFsdWUpIHtcblx0XHRzdXBlckZuLmNhbGwodGhpcywgYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgY2Fubm90IGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmApO1xuXHRcdHRoaXMuZGVsdGEgPSBkZWx0YTtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH0pO1xuXHR2YXIgTXVsdGlwbGVPdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gRGVsdGFKcy5NdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBNdWx0aXBsZU92ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YSwgdmFsdWUpO1xuXHRcdHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuXHRcdHRoaXMubWVzc2FnZSA9IGBOb25lIG9mIHRoZXNlIGRlbHRhcyBvZiB0eXBlcyAke2RlbHRhLm92ZXJsb2Fkcy5tYXAoZCA9PiBcIidcIitkLnR5cGUrXCInXCIpLmpvaW4oJywnKX0gY2FuIGFwcGx5IHRvIHRoaXMgdmFsdWUgb2YgdHlwZSAnJHt0eXBlb2YgdmFsdWV9LmAgK1xuXHRcdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdH0pO1xuXHR2YXIgTm9PdmVybG9hZHNBcHBsaWNhdGlvbkVycm9yID0gRGVsdGFKcy5Ob092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IgPSBVLm5ld1N1YmNsYXNzKEFwcGxpY2F0aW9uRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBOb092ZXJsb2Fkc0FwcGxpY2F0aW9uRXJyb3IoZGVsdGEsIHZhbHVlKSB7XG5cdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCB2YWx1ZSk7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoaXMgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YS50eXBlfScgaGFzIG5vIHNwY2lmaWMgZGVsdGFzIGFzc2lnbmVkIHRvIGl0LCBzbyBpdCBjYW5ub3QgYXBwbHkgdG8gdGhpcyB2YWx1ZSBvZiB0eXBlICcke3R5cGVvZiB2YWx1ZX0uYDtcblx0fSk7XG5cdHZhciBEZWx0YUFyZ0FwcGxpY2F0aW9uRXJyb3IgPSBEZWx0YUpzLkRlbHRhQXJnQXBwbGljYXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoQXBwbGljYXRpb25FcnJvciwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIERlbHRhQXJnQXBwbGljYXRpb25FcnJvcihkZWx0YSwgYmFzZURlbHRhKSB7XG5cdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGRlbHRhLCBiYXNlRGVsdGEuYXJnKTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBgVGhpcyBkZWx0YSBvZiB0eXBlICcke2RlbHRhLnR5cGV9JyBjYW5ub3QgYXBwbHkgdG8gdGhlIHR5cGUtJyR7dHlwZW9mIGJhc2VEZWx0YS5hcmd9Jy12YWx1ZSBvZiB0aGlzIGJhc2UgZGVsdGEgb2YgdHlwZSAnJHtiYXNlRGVsdGEudHlwZX0nLmA7XG5cdFx0dGhpcy5iYXNlRGVsdGEgPSBiYXNlRGVsdGE7XG5cdH0pO1xuXHR2YXIgQ29tcG9zaXRpb25FcnJvciA9IERlbHRhSnMuQ29tcG9zaXRpb25FcnJvciA9IFUubmV3U3ViY2xhc3MoRXJyb3IsIChzdXBlckZuKSA9PiBmdW5jdGlvbiBDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyKSB7XG5cdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGBUaGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyBjYW5ub3QgYmUgY29tcG9zZWQgd2l0aCB0aGlzIG90aGVyIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGEyLnR5cGV9LmApO1xuXHRcdHRoaXMuZGVsdGExID0gZGVsdGExO1xuXHRcdHRoaXMuZGVsdGEyID0gZGVsdGEyO1xuXHR9KTtcblx0dmFyIE11bHRpcGxlT3ZlcmxvYWRzQ29tcG9zaXRpb25FcnJvciA9IERlbHRhSnMuTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yID0gVS5uZXdTdWJjbGFzcyhDb21wb3NpdGlvbkVycm9yLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gTXVsdGlwbGVPdmVybG9hZHNDb21wb3NpdGlvbkVycm9yKGRlbHRhMSwgZGVsdGEyLCBlcnJvcnMgPSBbXSkge1xuXHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBkZWx0YTEsIGRlbHRhMik7XG5cdFx0dGhpcy5lcnJvcnMgPSBlcnJvcnM7XG5cdFx0dGhpcy5tZXNzYWdlID0gYFRoZXJlIGFyZSBubyBvdmVybG9hZHMgdG8gY29tcG9zZSB0aGlzIGRlbHRhIG9mIHR5cGUgJyR7ZGVsdGExLnR5cGV9JyB3aXRoIHRoaXMgb3RoZXIgZGVsdGEgb2YgdHlwZSAnJHtkZWx0YTIudHlwZX0nLmAgK1xuXHRcdCAgICAgICAgICAgICAgIGVycm9ycy5tYXAoZSA9PiBgXFxuLS0gJHtlLm1lc3NhZ2V9YCkuam9pbignJyk7XG5cdH0pO1xuXG5cblx0LyogZXhwb3J0IHRoZSBtYWluIGNsYXNzICovXG5cdHJldHVybiBEZWx0YUpzO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0LyogY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0XHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIGNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyogY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGUgKi9cblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3JNYWtlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvck1ha2VyO1xuXHRcdFx0XHRjb25zdHJ1Y3Rvck1ha2VyID0gKHN1cGVyRm4pID0+IGZ1bmN0aW9uICguLi5hcmdzKSB7IHN1cGVyRm4uYXBwbHkodGhpcywgYXJncykgfTtcblx0XHRcdH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBzdWJjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuXHRcdFx0VS5leHRlbmQoY2xzLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qICBleHRlbmQgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyAgICAgKi9cblx0XHQvKiAgb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnMgICovXG5cdFx0LyogIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBvYmoxO1xuXHRcdH0sXG5cblx0XHQvKiBhbGxvd3MgdGhlIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVycyAqL1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIG5ld19vYmogPSBPYmplY3QuY3JlYXRlKENvbnN0cnVjdG9yRm4ucHJvdG90eXBlKTtcblx0XHRcdENvbnN0cnVjdG9yRm4uYXBwbHkobmV3X29iaiwgYXJncyk7XG5cdFx0XHRyZXR1cm4gbmV3X29iajtcblx0XHR9LFxuXG5cdFx0LyogYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYSBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlICovXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgICovXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYCkgKi9cblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0LyogcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzICovXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfSxcblxuXHRcdC8qIHNoaWZ0IGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcgcmlnaHQgYnkgYSBnaXZlbiBudW1iZXIgb2Ygc3BhY2VzICovXG5cdFx0aW5kZW50KHN0ciwgYW1vdW50LCBjaGFyID0gJyAnKSB7XG5cdFx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL14oPyFcXHMqJCkvbWcsIFUucmVwZWF0KGFtb3VudCwgY2hhcikpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=