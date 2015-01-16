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
	    var Delta = this.Delta = U.newClass(function(arg, meta) {
	      this.arg = arg;
	      this.meta = U.extend({}, meta || {});
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
	        var prop = arguments[0] !== (void 0) ? arguments[0] : '(root)';
	        var str = this.type;
	        if (prop) {
	          str += (" '" + prop + "'");
	        }
	        if (U.isDefined(this.arg)) {
	          str += (": " + JSON.stringify(this.arg));
	        }
	        return str;
	      }
	    });
	    var InterfaceDelta = this.operations.InterfaceDelta = U.newSubclass(Delta, (function(superFn) {
	      return function(arg, meta) {
	        superFn.call(this, arg, meta);
	        this._createOperationInterface();
	      };
	    }), {
	      _createOperationInterface: ((function() {
	        var operationMethods = {};
	        $__0.onNewOperationType((function(cls) {
	          cls.meta.methods.forEach((function(method) {
	            if (U.isUndefined(operationMethods[method])) {
	              operationMethods[method] = function() {
	                for (var args = [],
	                    $__2 = 0; $__2 < arguments.length; $__2++)
	                  args[$__2] = arguments[$__2];
	                var newDelta = this._applyOperationMethod.apply(this, [method].concat(args));
	                return (newDelta instanceof InterfaceDelta) ? newDelta.operations : this;
	              };
	            }
	          }));
	        }));
	        return function _createOperationInterface() {
	          Object.defineProperty(this, 'operations', {value: Object.create(operationMethods, {
	              _applyOperationMethod: {value: this.operation.bind(this)},
	              delta: {value: this}
	            })});
	        };
	      }))(),
	      operation: function() {
	        throw new Error("An InterfaceDelta subclass needs to implement the 'operation' method.");
	      }
	    });
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
	      toString: function() {
	        var prop = arguments[0] !== (void 0) ? arguments[0] : '(root)';
	        var str = Delta.prototype.toString.call(this, prop);
	        var overloads = this.overloads.map((function(delta) {
	          return delta.toString(null);
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
	    var Modify = this.operations['Modify'] = U.newSubclass(InterfaceDelta, (function(superFn) {
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
	      toString: function() {
	        var prop = arguments[0] !== (void 0) ? arguments[0] : '(root)';
	        var $__1 = this;
	        var str = Delta.prototype.toString.call(this, prop);
	        if (Object.keys(this.deltas).length > 0) {
	          var deltas = Object.keys(this.deltas).map((function(p) {
	            return $__1.deltas[p].toString(p);
	          })).join('\n');
	          str += '\n' + U.indent(deltas, 4);
	        }
	        return str;
	      },
	      operation: function(method, pathOrOptions, arg) {
	        var options = thisDeltaJs._processOptions(pathOrOptions);
	        var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	        return this._addOperation(options, delta);
	      },
	      _addOperation: function(options, delta) {
	        var path = options.path;
	        if (path.rest) {
	          return this.operations.modify(path.prop).delta._addOperation(U.extend({}, options, {path: path.rest}), delta);
	        }
	        this.deltas[path.prop] = thisDeltaJs.composed(this.deltas[path.prop], delta);
	        return this.deltas[path.prop].operations ? this.deltas[path.prop] : delta;
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
	          toString: function() {
	            var prop = arguments[0] !== (void 0) ? arguments[0] : '(root)';
	            var $__0 = this;
	            var str = thisDeltaJs.Delta.prototype.toString.call(this, prop);
	            if (Object.keys(this.deltasToApplyToArg).length > 0) {
	              var deltas = Object.keys(this.deltasToApplyToArg).map((function(p) {
	                return $__0.deltasToApplyToArg[p].toString(null);
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
	      var DeltaModel = this.newOperationType(this.operations.InterfaceDelta, 'DeltaModel', {
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
	        toString: function() {
	          var prop = arguments[0] !== (void 0) ? arguments[0] : '(root)';
	          var str = thisDeltaJs.Delta.prototype.toString.call(this, prop);
	          if (this.graph.vertexCount() > 0) {
	            var deltas = '';
	            this.graph.topologically((function(name, delta) {
	              deltas += ("'" + name + "' ↦ " + delta.toString(null) + "\n");
	            }));
	            str += '\n' + U.indent(deltas, 4);
	          }
	          return str;
	        },
	        _addOperation: function(name, options, delta) {
	          var path = options.path;
	          var deltaBase = delta;
	          if (path.prop) {
	            deltaBase = new thisDeltaJs.operations['Modify']();
	            deltaBase._addOperation(options, delta);
	          }
	          this.graph.addNewVertex(name, deltaBase);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MTJkYzEzYWUyZDE1MWRiMTM5MSIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBUVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTs7QUFHckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixRQUFHLDZCQUE2QixFQUFJLEdBQUMsQ0FBQztBQUlsQyxhQUFJLEVBQUksS0FBRyxNQUFNLEVB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LE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUduRCxVQUFLLENBQUwsVUFBTyxFQUFDLENBQUcsSUFBRSxDQUFHO0FBQUUsWUFBTyxJQUFJLE1BQUssQ0FBQyxFQUFDLEVBQUUsR0FBQyxLQUFNLENBQUMsR0FBRSxDQUFDO0tBQUU7QUFHbkQsVUFBSyxDQUFMLFVBQU8sR0FBRSxDQUFHLE9BQWlCLENBQUc7U0FBWixLQUFHLDZDQUFJLElBQUU7QUFDNUIsWUFBTyxJQUFFLFFBQVMsQ0FBQyxhQUFZLENBQUcsU0FBUSxDQUFDLE1BQUssQ0FBRyxLQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzFEO0FBQUEsR0FDRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFKc1wiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4MTJkYzEzYWUyZDE1MWRiMTM5MVxuICoqLyIsImRlZmluZShbJy4vbWlzYy5qcycsICdqcy1ncmFwaCddLCBmdW5jdGlvbiAoVSwgSnNHcmFwaCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvKioge0BjbGFzcyBEZWx0YUpzfVxuXHQgKiBUaGlzIGNsYXNzIG9mZmVycyBldmVyeSBmdW5jdGlvbmFsaXR5IHlvdSBuZWVkIGZyb20gZGVsdGEgbW9kZWxpbmcuXG5cdCAqIEVhY2ggaW5zdGFuY2Ugb2ZmZXJzIGl0cyBvd24gb3BlcmF0aW9uIHR5cGVzIGFuZCB2YXJpYXRpb24gcG9pbnRzLlxuXHQgKiBZb3Ugd2lsbCB1c3VhbGx5IG5lZWQgb25seSBvbmUgaW5zdGFuY2UgcGVyIGFwcGxpY2F0aW9uLlxuXHQgKi9cblx0dmFyIERlbHRhSnMgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIERlbHRhSnMoKSB7XG5cblx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0LyogdGhlIHRoaW5ncyBpbnN0YW5jZXMgb2YgJ0RlbHRhSnMnIGtlZXBzIHRyYWNrIG9mICovXG5cdFx0dGhpcy5vcGVyYXRpb25zID0ge307ICAgLy8gcHJvcGVydHkgLT4gRGVsdGEtc3ViY2xhc3Ncblx0XHR0aGlzLmNvbXBvc2l0aW9ucyA9IFtdOyAvLyBbe3ByZWNvbmRpdGlvbiwgY29tcG9zZUZufV1cblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMgPSBbXTtcblxuXG5cdFx0LyogRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YSAqL1xuXHRcdHZhciBEZWx0YSA9IHRoaXMuRGVsdGEgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHRoaXMuYXJnID0gYXJnO1xuXHRcdFx0dGhpcy5tZXRhID0gVS5leHRlbmQoe30sIG1ldGEgfHwge30pO1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHB1YmxpY317QGFic3RyYWN0fXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBieSBzdWJjbGFzc2VzIHRvIG1ha2UgYSBjbG9uZSBvZiAndGhpcycgZGVsdGEuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHsgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuYXJnLCB0aGlzLm1ldGEpIH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gIHZhbHVlIHsqfSAtIGFueSBnaXZlbiB2YWx1ZVxuXHRcdFx0ICogQHJldHVybiB0aGUgdmFsdWUgcmVzdWx0aW5nIGluIHRoaXMgZGVsdGEgYmVpbmcgYXBwbGllZCB0byB0aGUgZ2l2ZW4gYHZhbHVlYFxuXHRcdFx0ICovXG5cdFx0XHRhcHBsaWVkVG8odmFsdWUpIHtcblx0XHRcdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUmVhZGFibGVUYXJnZXQpIHsgdmFsdWUgPSB2YWx1ZS52YWx1ZSB9XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUuY2xvbmUgPT09ICdmdW5jdGlvbicpIHsgdmFsdWUgPSB2YWx1ZS5jbG9uZSgpIH1cblx0XHRcdFx0dmFyIG9iaiA9IHsgdmFsdWUgfTtcblx0XHRcdFx0dGhpcy5hcHBseVRvKHd0KG9iaiwgJ3ZhbHVlJykpO1xuXHRcdFx0XHRyZXR1cm4gb2JqLnZhbHVlO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfXtAbm9zaWRlZWZmZWN0c31cblx0XHRcdCAqIEBwYXJhbSBvdGhlciB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgb3RoZXIgZGVsdGEgdG8gY29tcG9zZSB3aXRoXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjb21wb3NlZFdpdGgob3RoZXIpIHsgcmV0dXJuIHRoaXNEZWx0YUpzLmNvbXBvc2VkKHRoaXMsIG90aGVyKSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcocHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBzdHIgPSB0aGlzLnR5cGU7XG5cdFx0XHRcdGlmIChwcm9wKSAgICAgICAgICAgICAgICAgIHsgc3RyICs9IGAgJyR7cHJvcH0nYCB9XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblx0XHR9KTtcblxuXG5cdFx0LyogSW50ZXJmYWNlRGVsdGEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBJbnRlcmZhY2VEZWx0YSAqL1xuXHRcdHZhciBJbnRlcmZhY2VEZWx0YSA9IHRoaXMub3BlcmF0aW9ucy5JbnRlcmZhY2VEZWx0YSA9IFUubmV3U3ViY2xhc3MoRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgYXJnLCBtZXRhKTtcblx0XHRcdHRoaXMuX2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZSgpO1xuXHRcdH0sIHtcblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBUbyBjcmVhdGUgYW4gJ29wZXJhdGlvbnMnIHByb3BlcnR5IG9uIHRoaXMgZGVsdGEgd2l0aCBvcGVyYXRpb24gbWV0aG9kcy5cblx0XHRcdCAqIEBwYXJhbSBoYW5kbGVPcGVyYXRpb24ge2Z1bmN0aW9uKFN0cmluZywgKik6IERlbHRhSnMjRGVsdGF9IC0gYSBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgYSBkZWx0YSBvcGVyYXRpb25cblx0XHRcdCAqL1xuXHRcdFx0X2NyZWF0ZU9wZXJhdGlvbkludGVyZmFjZTogKCgpID0+IHtcblxuXHRcdFx0XHR2YXIgb3BlcmF0aW9uTWV0aG9kcyA9IHt9O1xuXG5cdFx0XHRcdHRoaXMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRcdFx0XHRjbHMubWV0YS5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kLmFwcGx5KHRoaXMsIFttZXRob2RdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChuZXdEZWx0YSBpbnN0YW5jZW9mIEludGVyZmFjZURlbHRhKSA/IG5ld0RlbHRhLm9wZXJhdGlvbnMgOiB0aGlzO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2UoKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdvcGVyYXRpb25zJywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IE9iamVjdC5jcmVhdGUob3BlcmF0aW9uTWV0aG9kcywge1xuXHRcdFx0XHRcdFx0XHRfYXBwbHlPcGVyYXRpb25NZXRob2Q6IHsgdmFsdWU6IHRoaXMub3BlcmF0aW9uLmJpbmQodGhpcykgfSxcblx0XHRcdFx0XHRcdFx0ZGVsdGE6ICAgICAgICAgICAgICAgICB7IHZhbHVlOiB0aGlzICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KSgpLFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH1cblx0XHRcdCAqIEltcGxlbWVudCB0aGlzIGluIHN1YmNsYXNzZXMgdG8gcHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBkZWx0YSByZXN1bHRpbmcgZnJvbSB0aGUgb3BlcmF0aW9uXG5cdFx0XHQgKi9cblx0XHRcdG9wZXJhdGlvbigpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBbiBJbnRlcmZhY2VEZWx0YSBzdWJjbGFzcyBuZWVkcyB0byBpbXBsZW1lbnQgdGhlICdvcGVyYXRpb24nIG1ldGhvZC5gKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0LyogT3ZlcmxvYWRlZERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE92ZXJsb2FkZWREZWx0YSAqL1xuXHRcdHRoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHR2YXIgT3ZlcmxvYWRlZERlbHRhID0gdGhpcy5vcGVyYXRpb25zWydPdmVybG9hZGVkRGVsdGEnXSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSBbXTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuT3ZlcmxvYWRlZERlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoaXMgb3ZlcmxvYWRlZCBkZWx0YSBoYXMgbm8gb3ZlcmxvYWRzLCBgICtcblx0XHRcdFx0XHRcdFx0YHNvIGNhbm5vdCBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfWBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YE5vbmUgb2YgdGhlIGRlbHRhIHR5cGVzICR7dGhpcy50eXBlLmpvaW4oJywnKX0gYCArXG5cdFx0XHRcdFx0XHRcdGBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfVxcbmAgICAgICAgICAgICtcblx0XHRcdFx0XHRcdFx0ZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcocHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBEZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBwcm9wKTtcblx0XHRcdFx0dmFyIG92ZXJsb2FkcyA9IHRoaXMub3ZlcmxvYWRzLm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKG51bGwpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQob3ZlcmxvYWRzLCA0KTtcblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPdmVybG9hZGVkRGVsdGEudHlwZSA9IE92ZXJsb2FkZWREZWx0YS5wcm90b3R5cGUudHlwZSA9ICdPdmVybG9hZGVkRGVsdGEnO1xuXHRcdE92ZXJsb2FkZWREZWx0YS5tZXRhID0gT3ZlcmxvYWRlZERlbHRhLnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdFx0bWV0aG9kczogW11cblx0XHR9O1xuXHRcdHRoaXMubmV3Q29tcG9zaXRpb24oKGQxLCBkMikgPT4gKGQxIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhIHx8IGQyIGluc3RhbmNlb2YgT3ZlcmxvYWRlZERlbHRhKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0dmFyIEQxID0gZDEgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEgPyBkMS5vdmVybG9hZHMgOiBbZDFdO1xuXHRcdFx0dmFyIEQyID0gZDIgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEgPyBkMi5vdmVybG9hZHMgOiBbZDJdO1xuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBPdmVybG9hZGVkRGVsdGEoKTtcblx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdEQxLmZvckVhY2goKGRlbHRhMSkgPT4ge1xuXHRcdFx0XHREMi5mb3JFYWNoKChkZWx0YTIpID0+IHtcblx0XHRcdFx0XHR0cnkgeyByZXN1bHQub3ZlcmxvYWRzLnB1c2goZGVsdGExLmNvbXBvc2VkV2l0aChkZWx0YTIpKSB9XG5cdFx0XHRcdFx0Y2F0Y2ggKGVycm9yKSB7IGVycm9ycy5wdXNoKGVycm9yKSB9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAocmVzdWx0Lm92ZXJsb2Fkcy5sZW5ndGggPT09IDApIHsgdGhyb3cgbmV3IEVycm9yKGVycm9ycy5tYXAoZSA9PiBlLm1lc3NhZ2UpLmpvaW4oJ1xcbicpKSB9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0pO1xuXG5cblx0XHQvKiBNb2RpZnkgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogTW9kaWZ5ICovXG5cdFx0dmFyIE1vZGlmeSA9IHRoaXMub3BlcmF0aW9uc1snTW9kaWZ5J10gPSBVLm5ld1N1YmNsYXNzKEludGVyZmFjZURlbHRhLCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKF9fLCBtZXRhKSB7XG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgX18sIG1ldGEpO1xuXHRcdFx0dGhpcy5kZWx0YXMgPSB7fTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuTW9kaWZ5fSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1twcm9wXSA9IHRoaXMuZGVsdGFzW3Byb3BdLmNsb25lKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCB7Kn1cblx0XHRcdCAqL1xuXHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0IH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQge0RlbHRhSnMuV3JpdGFibGVUYXJnZXR9XG5cdFx0XHQgKi9cblx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSksXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHRcdFx0XHRVLmFzc2VydCh0YXJnZXQudmFsdWUgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlICdNb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbiBPYmplY3QuYCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5kZWx0YXNbcHJvcF0uYXBwbHlUbyh3dCh0YXJnZXQudmFsdWUsIHByb3ApKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcocHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBEZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBwcm9wKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKHApKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRzdHIgKz0gJ1xcbicgKyBVLmluZGVudChkZWx0YXMsIDQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBQcmVwYXJlIGEgc3BlY2lmaWMgZGVsdGEgb3BlcmF0aW9uIHdpdGggdGhpcyBNb2RpZnkgZGVsdGEgYXMgdGhlIGJhc2UuXG5cdFx0XHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9ICAgICAgICAgICAgICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHRcdCAqIEBwYXJhbSBwYXRoT3JPcHRpb25zIHtPYmplY3R8U3RyaW5nfSAtIHRoZSBvcHRpb25zIGZvciB0aGlzIG9wZXJhdGlvbiwgb3IganVzdCB0aGUgcGF0aFxuXHRcdFx0ICogQHBhcmFtIGFyZyB7Kn0gICAgICAgICAgICAgICAgICAgICAgIC0gdGhlIGFyZ3VtZW50IHRvIHRoZSBvcGVyYXRpb25cblx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHRcdCAqL1xuXHRcdFx0b3BlcmF0aW9uKG1ldGhvZCwgcGF0aE9yT3B0aW9ucywgYXJnKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gdGhpc0RlbHRhSnMuX3Byb2Nlc3NPcHRpb25zKHBhdGhPck9wdGlvbnMpO1xuXHRcdFx0XHR2YXIgZGVsdGEgPSB0aGlzRGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgZGVsdGEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSBvcHRpb25zIHtPYmplY3R9XG5cdFx0XHQgKiBAcGFyYW0gZGVsdGEgICB7RGVsdGFKcyNEZWx0YX1cblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcHRpb25zLCBkZWx0YSkge1xuXHRcdFx0XHR2YXIge3BhdGh9ID0gb3B0aW9ucztcblxuXHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhICdyZXN0JyB0byB0aGUgcGF0aCwgc2V0IGEgbGluayBpbiB0aGUgY2hhaW4gKi9cblx0XHRcdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0XHRcdC8qIGlmIHRoZXJlIGlzIGEgbG9uZ2VyIGNoYWluLCBjYWxsIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5ICovXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9ucy5tb2RpZnkocGF0aC5wcm9wKS5kZWx0YVxuXHRcdFx0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiBwYXRoLnJlc3QgfSksIGRlbHRhKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIHN0b3JlIHRoZSBuZXcgZGVsdGEsIHBvc3NpYmx5IGNvbXBvc2VkIHdpdGggYW4gZXhpc3Rpbmcgb25lICovXG5cdFx0XHRcdHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gPSB0aGlzRGVsdGFKcy5jb21wb3NlZCh0aGlzLmRlbHRhc1twYXRoLnByb3BdLCBkZWx0YSk7XG5cblx0XHRcdFx0LyogcmV0dXJuIHRoZSBjb21wb3NlZCBkZWx0YSBpZiBpdCBoYXMgYW4gb3BlcmF0aW9ucyBpbnRlcmZhY2U7IG90aGVyd2lzZSwgcmV0dXJuIHRoZSBnaXZlbiBkZWx0YSAqL1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXS5vcGVyYXRpb25zID8gdGhpcy5kZWx0YXNbcGF0aC5wcm9wXSA6IGRlbHRhO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE1vZGlmeS50eXBlID0gTW9kaWZ5LnByb3RvdHlwZS50eXBlID0gJ01vZGlmeSc7XG5cdFx0TW9kaWZ5Lm1ldGEgPSBNb2RpZnkucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRtZXRob2RzOiBbJ21vZGlmeSddXG5cdFx0fTtcblx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oTW9kaWZ5KSB9KTtcblxuXHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10pKSB7IHRoaXMub3ZlcmxvYWRzWydtb2RpZnknXSA9IFtdIH1cblx0XHR0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10ucHVzaCgnTW9kaWZ5Jyk7XG5cblxuXHRcdC8qIHN0YW5kYXJkIG9wZXJhdGlvbnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIHN0YW5kYXJkIG9wZXJhdGlvbnMgKi9cblx0XHR0aGlzLl9kZWZpbmVTdGFuZGFyZE9wZXJhdGlvblR5cGVzKCk7XG5cblxuXHR9LCAvKiogQGxlbmRzIERlbHRhSnMucHJvdG90eXBlICovIHsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBEZWx0YUpzLnByb3RvdHlwZSAqL1xuXG5cdFx0Ly8vKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0Ly8gKlxuXHRcdC8vICovXG5cdFx0Ly92cCh2cE5hbWUsIHZhbCkge1xuXHRcdC8vXHQvLyBUT0RPXG5cdFx0Ly99LFxuXG5cdFx0LyoqIHtAcHJpdmF0ZX17QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcGF0aE9yT3B0aW9ucyB7U3RyaW5nfHtwYXRoOiBTdHJpbmd9fVxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRfcHJvY2Vzc09wdGlvbnMocGF0aE9yT3B0aW9ucykge1xuXHRcdFx0aWYgKHR5cGVvZiBwYXRoT3JPcHRpb25zID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRyZXR1cm4geyBwYXRoOiBuZXcgUGF0aChwYXRoT3JPcHRpb25zKSB9O1xuXHRcdFx0fSBlbHNlIGlmIChwYXRoT3JPcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cdFx0XHRcdHBhdGhPck9wdGlvbnMucGF0aCA9IG5ldyBQYXRoKHBhdGhPck9wdGlvbnMucGF0aCk7XG5cdFx0XHRcdHJldHVybiBwYXRoT3JPcHRpb25zO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdGBUaGUgb3B0aW9ucyBhcmd1bWVudCBvbiBhIGRlbHRhIG9wZXJhdGlvbiBgICtcblx0XHRcdFx0XHRgYSBzaG91bGQgYmUgYSBwYXRoIHN0cmluZyBvciBhbiBvcHRpb25zIG9iamVjdC5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IHRoaXMub3ZlcmxvYWRzW21ldGhvZF1cblx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLm9wZXJhdGlvbnNbdHlwZV0oYXJnLCB7IG1ldGhvZCB9KSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMub3BlcmF0aW9uc1snT3ZlcmxvYWRlZERlbHRhJ10oYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqL1xuXHRcdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGRlbHRhLnByZWNvbmRpdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGp1ZGdtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVHlwZUVycm9yKGp1ZGdtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoZSB2YWx1ZSAnJHt0YXJnZXQudmFsdWV9JyBkb2VzIG5vdCBzYXRpc2Z5IGAgK1xuXHRcdFx0XHRcdFx0XHRgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgJyR7ZGVsdGEudHlwZX0nIG9wZXJhdGlvbi5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIHByb3RvdHlwZSB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUoU3VwZXJjbGFzcywgbmFtZSwgcHJvdG90eXBlKSB7XG5cdFx0XHRpZiAodHlwZW9mIFN1cGVyY2xhc3MgPT09ICdzdHJpbmcnKSB7IFtTdXBlcmNsYXNzLCBuYW1lLCBwcm90b3R5cGVdID0gW3VuZGVmaW5lZCwgU3VwZXJjbGFzcywgbmFtZV0gfVxuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXG5cdFx0XHQvKiAndGhpcycgYWxpYXMgKi9cblx0XHRcdHZhciB0aGlzRGVsdGFKcyA9IHRoaXM7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIERlbHRhIHN1YmNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gdGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyhTdXBlcmNsYXNzIHx8IHRoaXMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0XHRpZiAodGhpcy5jb25zdHJ1Y3QpIHsgdGhpcy5jb25zdHJ1Y3QoKSB9XG5cdFx0XHR9LCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFx0dmFyIGp1ZGdtZW50ID0gdGhpc0RlbHRhSnMuX2V2YWx1YXRlUHJlY29uZGl0aW9uKHRoaXMsIHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGp1ZGdtZW50ICE9PSB0cnVlKSB7IHRocm93IGp1ZGdtZW50IH1cblx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvdG90eXBlLmFwcGx5VG8pKSB7IHByb3RvdHlwZS5hcHBseVRvLmNhbGwodGhpcywgdGFyZ2V0KSB9XG5cdFx0XHRcdH1cblx0XHRcdH0pKTtcblx0XHRcdGNscy50eXBlID0gY2xzLnByb3RvdHlwZS50eXBlID0gbmFtZTtcblx0XHRcdGNscy5tZXRhID0gY2xzLnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdFx0XHQvLyBpZiBubyBtZXRob2RzIGFyZSBwcm92aWRlZCwgdXNlIHRoZSBvcGVyYXRpb24gbmFtZSBzdGFydGluZyB3aXRoIGEgbG93ZXJjYXNlIGxldHRlclxuXHRcdFx0XHRtZXRob2RzOiBwcm90b3R5cGUubWV0aG9kcyB8fCBbIG5hbWVbMF0udG9Mb3dlckNhc2UoKStuYW1lLnNsaWNlKDEpIF1cblx0XHRcdH07XG5cblx0XHRcdC8qIGFkZCB0aGlzIG5ldyB0eXBlIHRvIHRoZSBsaXN0IG9mIHR5cGVzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1ldGhvZCAqL1xuXHRcdFx0Y2xzLm1ldGEubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3ZlcmxvYWRzW21ldGhvZF0pKSB7IHRoaXMub3ZlcmxvYWRzW21ldGhvZF0gPSBbXSB9XG5cdFx0XHRcdHRoaXMub3ZlcmxvYWRzW21ldGhvZF0ucHVzaChuYW1lKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBub3RpZnkgbGlzdGVuZXJzICovXG5cdFx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHsgZm4oY2xzKSB9KTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSBuZXcgY2xhc3MgKi9cblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBmbiB7KEZ1bmN0aW9uKSA9PiB1bmRlZmluZWR9IC0gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgc3ViY2xhc3Mgb2YgYERlbHRhSnMjRGVsdGFgXG5cdFx0ICovXG5cdFx0b25OZXdPcGVyYXRpb25UeXBlKGZuKSB7XG5cdFx0XHR0aGlzLl9vbk5ld09wZXJhdGlvblR5cGVMaXN0ZW5lcnMucHVzaChmbik7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRcdFx0Zm4odGhpcy5vcGVyYXRpb25zW25hbWVdKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHByZWNvbmRpdGlvbiB7KERlbHRhSnMjRGVsdGEsIERlbHRhSnMjRGVsdGEpID0+IEJvb2xlYW59IC0gY2FuIHRoZXNlIGRlbHRhcyBiZSBjb21wb3NlZCB0aGlzIHdheT9cblx0XHQgKiBAcGFyYW0gY29tcG9zZSAgICAgIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gRGVsdGFKcyNEZWx0YX0gLSBzaG91bGQgYmUgc2lkZS1lZmZlY3QgZnJlZVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHByZWNvbmRpdGlvbiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnMucHVzaCh7cHJlY29uZGl0aW9uLCBjb21wb3NlfSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gZDEge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGZpcnN0IGRlbHRhXG5cdFx0ICogQHBhcmFtIGQyIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBzZWNvbmQgZGVsdGFcblx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI0RlbHRhfSAtIHRoZSBjb21wb3NlZCBkZWx0YVxuXHRcdCAqL1xuXHRcdGNvbXBvc2VkKGQxLCBkMikge1xuXHRcdFx0LyogaGFuZGxlIHRoZSBjYXNlcyB3aGVyZSBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIHVuZGVmaW5lZCAqL1xuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZDEpKSB7IGQxID0gbmV3IHRoaXMub3BlcmF0aW9uc1snTm9PcCddKCkgfVxuXHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoZDIpKSB7IGQyID0gbmV3IHRoaXMub3BlcmF0aW9uc1snTm9PcCddKCkgfVxuXG5cdFx0XHQvKiB1c2UgdGhlIGZpcnN0IGNvbXBvc2l0aW9uIGZ1bmN0aW9uIGZvciB3aGljaCB0aGVzZSBkZWx0YXMgc2F0aXNmeSB0aGUgcHJlY29uZGl0aW9uICovXG5cdFx0XHR2YXIgY29tcG9zZUZuID0gKCk9Pnt9O1xuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLmNvbXBvc2l0aW9ucy5zb21lKCh7cHJlY29uZGl0aW9uLCBjb21wb3NlOiBmbn0pID0+IHtcblx0XHRcdFx0aWYgKHByZWNvbmRpdGlvbihkMSwgZDIpKSB7XG5cdFx0XHRcdFx0Y29tcG9zZUZuID0gZm47XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIHN1Y2Nlc3M7IGJyZWFrIHRoZSBsb29wXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiB0aHJvdyBhbiBlcnJvciBvbiBmYWlsdXJlICovXG5cdFx0XHRVLmFzc2VydChzdWNjZXNzLFxuXHRcdFx0XHRcdGBBICcke2QxLnR5cGV9JyBvcGVyYXRpb24gY2Fubm90IGJlIGZvbGxvd2VkIGJ5IGEgJyR7ZDIudHlwZX0nIG9wZXJhdGlvbi5gKTtcblxuXHRcdFx0LyogcmV0dXJuIHRoZSByZXN1bHQgb24gc3VjY2VzcyAqL1xuXHRcdFx0cmV0dXJuIGNvbXBvc2VGbihkMSwgZDIpO1xuXHRcdH0sXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdC8qICd0aGlzJyBhbGlhcyAqL1xuXHRcdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHRmdW5jdGlvbiB0KHR5cGUxLCB0eXBlMikgeyByZXR1cm4gKGQxLCBkMikgPT4gKGQxLnR5cGUgPT09IHR5cGUxICYmIGQyLnR5cGUgPT09IHR5cGUyKSB9XG5cdFx0XHRmdW5jdGlvbiBkKHR5cGUsIGZuKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZm4gPT09ICdzdHJpbmcnKSB7IGZuID0gKCh2KSA9PiAobykgPT4gb1t2XSkoZm4pIH1cblx0XHRcdFx0cmV0dXJuIChkMSwgZDIpID0+IG5ldyAodGhpc0RlbHRhSnMub3BlcmF0aW9uc1t0eXBlXSkoZm4gJiYgZm4oe2QxLCBkMiwgcDE6IGQxLmFyZywgcDI6IGQyLmFyZ30pKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGJhc2ljIG9wZXJhdGlvbiB0eXBlcyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0Ly8gJ01vZGlmeScgaXMgdGhlIG1vc3QgZnVuZGFtZW50YWwgb3BlcmF0aW9uLFxuXHRcdFx0Ly8gIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmVcblx0XHRcdHZhciBOb09wID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKCdOb09wJyk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCAoZDEsIGQyKSA9PiBkMSBpbnN0YW5jZW9mIE5vT3AsIChkMSwgZDIpID0+IGQyLmNsb25lKCkgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQyIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDEuY2xvbmUoKSApO1xuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sIGFuZCBpcyBkZWZpbmVkIGFib3ZlIHJhdGhlciB0aGFuIGhlcmUuXG5cdFx0XHRbXG5cdFx0XHRcdFsnQWRkJyAgICAsICdhZGQnLCAgICAgKHRhcmdldCkgPT4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpXSxcblx0XHRcdFx0WydSZXBsYWNlJywgJ3JlcGxhY2UnLCAodGFyZ2V0KSA9PiBVLmlzRGVmaW5lZCAgKHRhcmdldC52YWx1ZSldXG5cdFx0XHRdLmZvckVhY2goKFtUeXBlLCB0eXBlLCBwcmVdKSA9PiB7XG5cdFx0XHRcdC8vIEluIHRoZSBsaW5lIGRpcmVjdGx5IGJlbG93LCAndGhpcycgY2Fubm90IGJlIHVzZWQgYmVjYXVzZSBvZiBhIGJ1ZyBpbiB0cmFjZXVyOlxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL3RyYWNldXItY29tcGlsZXIvaXNzdWVzLzE2MzFcblx0XHRcdFx0dGhpc0RlbHRhSnMubmV3T3BlcmF0aW9uVHlwZShUeXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0KCkgICAgICAgICAgeyB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZyA9IFtdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0XHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgcHJlKHRhcmdldCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhcHBseVRvKHRhcmdldCkgICAgICB7IHRhcmdldC52YWx1ZSA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgodiwgZCkgPT4gZC5hcHBsaWVkVG8odiksIHRoaXMuYXJnKSB9LFxuXHRcdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnID0gdGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcubWFwKGQgPT4gZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YWZ0ZXJBcHBseWluZyhkZWx0YSkge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXMuY2xvbmUoKTtcblx0XHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNUb0FwcGx5VG9BcmcucHVzaChkZWx0YSk7XG5cdFx0XHRcdFx0XHRVLmFzc2VydChyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnJlZHVjZSgoZDEsIGQyKSA9PiB0aGlzRGVsdGFKcy5jb21wb3NlZChkMSwgZDIpKVxuXHRcdFx0XHRcdFx0XHRcdCAgICAgICAgIC5wcmVjb25kaXRpb24od3QocmVzdWx0LCAnYXJnJykpID09PSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdGBUaGUgZ2l2ZW4gJyR7ZGVsdGEudHlwZX0nIG9wZXJhdGlvbiBkb2VzIG5vdCBhcHBseSB0byB0aGUgJyR7dHlwZX0nZWQgdmFsdWUuYCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdFx0ICogQHBhcmFtIHByb3Age1N0cmluZz99XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dG9TdHJpbmcocHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3RyID0gdGhpc0RlbHRhSnMuRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgcHJvcCk7XG5cdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcy5kZWx0YXNUb0FwcGx5VG9BcmcpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlbHRhcyA9IE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnKVxuXHRcdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnW3BdLnRvU3RyaW5nKG51bGwpKS5qb2luKCdcXG4nKTtcblx0XHRcdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgVS5pbmRlbnQoZGVsdGFzLCA0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUmVtb3ZlJywge1xuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCAmJiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpIH0sXG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7IHRhcmdldC5kZWxldGUoKSB9XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnRm9yYmlkJywge1xuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSkgfVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ01vZGlmeScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdNb2RpZnknLCAnTW9kaWZ5JyksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGQxLmNsb25lKCk7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGQyLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzRGVsdGFKcy5jb21wb3NlZChyZXN1bHQuZGVsdGFzW3Byb3BdLCBkMi5kZWx0YXNbcHJvcF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdBZGQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZW1vdmUnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ1JlbW92ZScpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICwgJ1JlbW92ZScpLCBkKCdGb3JiaWQnKSAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0FkZCcgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSApO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdGb3JiaWQnICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVtb3ZlJywgJ0ZvcmJpZCcpLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnQWRkJyAgICksIGQoJ0FkZCcsICh7cDJ9KSA9PiBwMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0ZvcmJpZCcsICdGb3JiaWQnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICApO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdSZXBsYWNlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JyAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAgLCAnUmVwbGFjZScpLCBkKCdBZGQnLCAgICAgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICk7XG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYXJyYXkgb3BlcmF0aW9uIHR5cGUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9BcnJheScsIHtcblx0XHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm1ldGEubWV0aG9kKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRoaXMuYXJnXG5cdFx0XHRcdFx0XHR9XTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7IHJldHVybiBVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpICYmIEFycmF5LmlzQXJyYXkodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdHZhciBhcnIgPSB0YXJnZXQudmFsdWU7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvQXJyYXknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdQdXRJbnRvQXJyYXknICAgICksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUmVtb3ZlJyApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZXBsYWNlJyksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4ge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gbmV3IHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbJ1B1dEludG9BcnJheSddKCk7XG5cdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSAoZDEudmFsdWVzKS5jb25jYXQoZDIudmFsdWVzKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0pO1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHQvKiBkZWNsYXJpbmcgdGhlIGZ1bmN0aW9uIG9wZXJhdGlvbiB0eXBlICovXG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1B1dEludG9GdW5jdGlvbicsIHtcblx0XHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm1ldGEubWV0aG9kKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFt7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogdGhpcy5tZXRhLm1ldGhvZCxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRoaXMuYXJnXG5cdFx0XHRcdFx0XHR9XTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsb25lKCkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRcdHJlc3VsdC52YWx1ZXMgPSBbXTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh2KSA9PiB7IHJlc3VsdC52YWx1ZXMucHVzaCh2KSB9KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwcmVjb25kaXRpb24odGFyZ2V0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgdHlwZW9mIHRhcmdldC52YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRcdFx0XHQoVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykgfHwgdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnMpKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3JpZ2luYWxGbiA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHRcdHZhciBuZXdGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdG5ld0ZuLl9EZWx0YUpzX2Z1bmN0aW9ucy5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRBc3NpZ25tZW50XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zID0gW2Z1bmN0aW9uICguLi5hcmdzKSB7IG9yaWdpbmFsRm4uYXBwbHkodGhpcywgYXJncykgfV07XG5cdFx0XHRcdFx0XHR0YXJnZXQudmFsdWUgPSBuZXdGbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZS5fRGVsdGFKc19mdW5jdGlvbnM7XG5cdFx0XHRcdFx0dGhpcy52YWx1ZXMuZm9yRWFjaCgoe21ldGhvZCwgdmFsdWV9KSA9PiB7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlICdwcmVwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci51bnNoaWZ0KHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnaW5zZXJ0Jzoge1xuXHRcdFx0XHRcdFx0XHRcdC8vICdpbnNlcnQnIGRvZXNuJ3QgKmhhdmUqIHRvIHVzZSBhIHJhbmRvbSBwb3NpdGlvbi4gQW55IHBvc2l0aW9uIHdpbGwgZG8uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gIEUuZy4sIGl0cyBpbXBsZW1lbnRhdGlvbiBjb3VsZCBqdXN0IGJlIHRoZSBzYW1lIGFzIGZvciAnYXBwZW5kJy5cblx0XHRcdFx0XHRcdFx0XHQvLyAgTm9uZXRoZWxlc3MsIHdlIHVzZSBhIHJhbmRvbSBwb3NpdGlvbiB0byBmb3JjZSB0aGUgdGVzdHMgdG8gYmUgcGVybWlzc2l2ZS5cblx0XHRcdFx0XHRcdFx0XHR2YXIgcG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYXJyLmxlbmd0aCArIDEpKTtcblx0XHRcdFx0XHRcdFx0XHRhcnIuc3BsaWNlKHBvc2l0aW9uLCAwLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ2FwcGVuZCc6IHtcblx0XHRcdFx0XHRcdFx0XHRhcnIucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0gYnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG1ldGhvZHM6IFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ11cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdQdXRJbnRvRnVuY3Rpb24nICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScgICAgICAgICwgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlbW92ZScgICAgICAgICApLCBkKCdSZW1vdmUnKSAgICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1JlcGxhY2UnICAgICAgICApLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0Z1bmN0aW9uJywgJ1B1dEludG9GdW5jdGlvbicpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9uc1snUHV0SW50b0Z1bmN0aW9uJ10oKTtcblx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBUT0RPOiBDaGFuZ2UgJ2FwcGVuZCcgYW5kICdwcmVwZW5kJyB0byBmb2xsb3cgYW55IHVuZGVybHlpbmcgcGFydGlhbCBvcmRlciAoZGVsdGEgbW9kZWwpXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8vLyogZGVjbGFyaW5nIHRoZSAnRGVsdGFNb2RlbCcgdHlwZSAqL1xuXHRcdFx0dmFyIERlbHRhTW9kZWwgPSB0aGlzLm5ld09wZXJhdGlvblR5cGUodGhpcy5vcGVyYXRpb25zLkludGVyZmFjZURlbHRhLCAnRGVsdGFNb2RlbCcsIHtcblx0XHRcdFx0Y29uc3RydWN0KCkge1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdFx0XHRcdC8vdGhpcy5fY3JlYXRlT3BlcmF0aW9uSW50ZXJmYWNlKChtZXRob2QsIFtuYW1lLCBwYXRoT3JPcHRpb25zLCBhcmddKSA9PiB7XG5cdFx0XHRcdFx0Ly99KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRcdFx0cmVzdWx0LmdyYXBoID0gdGhpcy5ncmFwaC5jbG9uZSgpO1xuXHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRcdHJlc3VsdC5ncmFwaC5zZXRWZXJ0ZXgoaWQsIGRlbHRhLmNsb25lKCkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFx0c3ViRGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdFx0ICogUHJlcGFyZSBhIHNwZWNpZmljIGRlbHRhIG9wZXJhdGlvbiB3aXRoIHRoaXMgTW9kaWZ5IGRlbHRhIGFzIHRoZSBiYXNlLlxuXHRcdFx0XHQgKiBAcGFyYW0gbWV0aG9kIHtTdHJpbmd9ICAgICAgICAgICAgICAgLSB0aGUgdHlwZSBvZiBvcGVyYXRpb24gKGUuZy4sICdhZGQnLCAncmVtb3ZlJywgZXRjLilcblx0XHRcdFx0ICogQHBhcmFtIG5hbWUge1N0cmluZ30gICAgICAgICAgICAgICAgIC0gdGhlIG5hbWUgb2YgdGhlIGRlbHRhIGluc2lkZSB0aGUgZGVsdGEgbW9kZWxcblx0XHRcdFx0ICogQHBhcmFtIHBhdGhPck9wdGlvbnMge09iamVjdHxTdHJpbmd9IC0gdGhlIG9wdGlvbnMgZm9yIHRoaXMgb3BlcmF0aW9uLCBvciBqdXN0IHRoZSBwYXRoXG5cdFx0XHRcdCAqIEBwYXJhbSBhcmcgeyp9ICAgICAgICAgICAgICAgICAgICAgICAtIHRoZSBhcmd1bWVudCB0byB0aGUgb3BlcmF0aW9uXG5cdFx0XHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGRlbHRhIHJlc3VsdGluZyBmcm9tIHRoZSBvcGVyYXRpb25cblx0XHRcdFx0ICovXG5cdFx0XHRcdG9wZXJhdGlvbihtZXRob2QsIG5hbWUsIHBhdGhPck9wdGlvbnMsIGFyZykge1xuXHRcdFx0XHRcdHZhciBvcHRpb25zID0gdGhpc0RlbHRhSnMuX3Byb2Nlc3NPcHRpb25zKHBhdGhPck9wdGlvbnMpO1xuXHRcdFx0XHRcdHZhciBkZWx0YSA9IHRoaXNEZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG5hbWUsIG9wdGlvbnMsIGRlbHRhKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHRcdCAqIEBwYXJhbSBwcm9wIHtTdHJpbmc/fVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dG9TdHJpbmcocHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdFx0dmFyIHN0ciA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMsIHByb3ApO1xuXHRcdFx0XHRcdGlmICh0aGlzLmdyYXBoLnZlcnRleENvdW50KCkgPiAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGVsdGFzID0gJyc7XG5cdFx0XHRcdFx0XHR0aGlzLmdyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGRlbHRhcyArPSBgJyR7bmFtZX0nIOKGpiAke2RlbHRhLnRvU3RyaW5nKG51bGwpfVxcbmA7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHN0ciArPSAnXFxuJyArIFUuaW5kZW50KGRlbHRhcywgNCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBzdHI7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0X2FkZE9wZXJhdGlvbihuYW1lLCBvcHRpb25zLCBkZWx0YSkge1xuXHRcdFx0XHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXG5cdFx0XHRcdFx0dmFyIGRlbHRhQmFzZSA9IGRlbHRhO1xuXG5cdFx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSBwYXRoLCBjcmVhdGUgYSBsaW5rICAqL1xuXHRcdFx0XHRcdGlmIChwYXRoLnByb3ApIHtcblx0XHRcdFx0XHRcdGRlbHRhQmFzZSA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydNb2RpZnknXSgpO1xuXHRcdFx0XHRcdFx0ZGVsdGFCYXNlLl9hZGRPcGVyYXRpb24ob3B0aW9ucywgZGVsdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFRPRE86IG9wdGlvbnMsIHBhcnRpYWwgb3JkZXIsIGV0Yy4uLlxuXG5cdFx0XHRcdFx0LyogYWRkIGl0IHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0XHRcdHRoaXMuZ3JhcGguYWRkTmV3VmVydGV4KG5hbWUsIGRlbHRhQmFzZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdFx0XHQvLyB0byBjb21wb3NlIGRlbHRhIG1vZGVscywgd2Ugc2ltcGx5IGhhdmUgb25lIGFwcGx5IGFmdGVyIHRoZSBvdGhlclxuXHRcdFx0Ly8gd2l0aG91dCBhbnkgY29tcG9zYWJpbGl0eSBjaGVja3M7IGluIHRoZSBmdXR1cmUsIHRoaXMgbWF5IGJlY29tZSBtb3JlIGNsZXZlclxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBEZWx0YU1vZGVsKCk7XG5cdFx0XHRcdHJlc3VsdC5ncmFwaC5hZGROZXdWZXJ0ZXgoMSwgZDEpO1xuXHRcdFx0XHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdFx0cmVzdWx0LmdyYXBoLmFkZE5ld0VkZ2UoMSwgMik7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogdGhlIFBhdGggY2xhc3MgKi9cblx0Ly8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXHR2YXIgUGF0aCA9IERlbHRhSnMuUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIGlmIChwcm9wICE9PSAnJykge1xuXHRcdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdFx0XHRpZiAocmVzdCAhPT0gJycpIHtcblx0XHRcdFx0dGhpcy5fcmVzdCA9IG5ldyBQYXRoKHJlc3QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdHNldChvdGhlcikge1xuXHRcdFx0dGhpcy5fcHJvcCA9IG90aGVyLl9wcm9wO1xuXHRcdFx0dGhpcy5fcmVzdCA9IG90aGVyLl9yZXN0O1xuXHRcdH0sXG5cdFx0Z2V0IHByb3AoKSB7IHJldHVybiB0aGlzLl9wcm9wIH0sXG5cdFx0Z2V0IHJlc3QoKSB7IHJldHVybiB0aGlzLl9yZXN0IH1cblx0fSk7XG5cblxuXHQvKiB0aGUgUmVhZGFibGVUYXJnZXQgY2xhc3MgKi9cblx0dmFyIFJlYWRhYmxlVGFyZ2V0ID0gRGVsdGFKcy5SZWFkYWJsZVRhcmdldCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0dGhpcy5fdmFsID0gdmFsdWU7XG5cdH0sIHtcblx0XHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbCB9LFxuXHRcdGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKSB9LFxuXHRcdHNldCB2YWx1ZSh2KSB7IHRoaXMuc2V0VmFsdWUodikgfSxcblx0XHRjaGFpbihwcm9wKSB7XG5cdFx0XHRVLmFzc2VydCh0aGlzLnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdGBUaGUgUmVhZGFibGVUYXJnZXQucHJvdG90eXBlLmNoYWluIG1ldGhvZCBleHBlY3RzIHRoZSB0YXJnZXQgdmFsdWUgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRcdFx0cmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldCh0aGlzLnZhbHVlLCBwcm9wKTtcblx0XHR9XG5cdH0pO1xuXHQvL2Z1bmN0aW9uIHJ0KHZhbHVlKSB7IHJldHVybiBuZXcgRGVsdGFKcy5SZWFkYWJsZVRhcmdldCh2YWx1ZSkgfVxuXG5cblx0LyogdGhlIFdyaXRhYmxlVGFyZ2V0IGNsYXNzICovXG5cdHZhciBXcml0YWJsZVRhcmdldCA9IERlbHRhSnMuV3JpdGFibGVUYXJnZXQgPSBVLm5ld1N1YmNsYXNzKFJlYWRhYmxlVGFyZ2V0LCAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuXHRcdHRoaXMuX29iaiAgPSBvYmo7XG5cdFx0dGhpcy5fcHJvcCA9IHByb3A7XG5cdH0sIHtcblx0XHRnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9LFxuXHRcdHNldFZhbHVlKHYpIHsgdGhpcy5fb2JqW3RoaXMuX3Byb3BdID0gdiB9LFxuXHRcdGRlbGV0ZSgpIHsgZGVsZXRlIHRoaXMuX29ialt0aGlzLl9wcm9wXSB9XG5cdH0pO1xuXHRmdW5jdGlvbiB3dChvYmosIHByb3ApIHsgcmV0dXJuIG5ldyBXcml0YWJsZVRhcmdldChvYmosIHByb3ApIH1cblxuXG5cdC8qIGV4cG9ydCB0aGUgbWFpbiBjbGFzcyAqL1xuXHRyZXR1cm4gRGVsdGFKcztcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8qIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdFx0Y29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdH1cblxuXHRcdFx0LyogZGVmaW5lIHRoZSBjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IGNvbnN0cnVjdG9yO1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXG5cdFx0fSxcblxuXHRcdC8qIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlICovXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciA9IHt9LCBwcm90b3R5cGUgPSB7fSkge1xuXG5cdFx0XHQvKiBhbGxvdyBmb3Igbm8gY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgcGFzc2VkICovXG5cdFx0XHRpZiAodHlwZW9mIGNvbnN0cnVjdG9yTWFrZXIgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3JNYWtlcjtcblx0XHRcdFx0Y29uc3RydWN0b3JNYWtlciA9IChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykgeyBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3MpIH07XG5cdFx0XHR9XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgc3ViY2xhc3MgKi9cblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblxuXHRcdH0sXG5cblx0XHQvKiAgZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgICAgICovXG5cdFx0LyogIG9mIHRoZSBvdGhlciBvYmplY3RzLCBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5zICAqL1xuXHRcdC8qICB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRleHRlbmQob2JqMSwgLi4ucmVzdCkge1xuXHRcdFx0cmVzdC5mb3JFYWNoKChvYmopID0+IHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0LyogYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnMgKi9cblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBuZXdfb2JqID0gT2JqZWN0LmNyZWF0ZShDb25zdHJ1Y3RvckZuLnByb3RvdHlwZSk7XG5cdFx0XHRDb25zdHJ1Y3RvckZuLmFwcGx5KG5ld19vYmosIGFyZ3MpO1xuXHRcdFx0cmV0dXJuIG5ld19vYmo7XG5cdFx0fSxcblxuXHRcdC8qIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGEgY29uZGl0aW9uIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgdHJ1ZSAqL1xuXHRcdGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcblx0XHRcdGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKSB9XG5cdFx0fSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCAqL1xuXHRcdGlzVW5kZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHRlc3QgaWYgYSB2YWx1ZSBpcyBkZWZpbmVkIChub3QgYHVuZGVmaW5lZGApICovXG5cdFx0aXNEZWZpbmVkKHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgfSxcblxuXHRcdC8qIHJlcGVhdCBhIHN0cmluZyBhIGdpdmVuIG51bWJlciBvZiB0aW1lcyAqL1xuXHRcdHJlcGVhdChuciwgc3RyKSB7IHJldHVybiBuZXcgQXJyYXkobnIrMSkuam9pbihzdHIpIH0sXG5cblx0XHQvKiBzaGlmdCBldmVyeSBsaW5lIGluIGEgc3RyaW5nIHJpZ2h0IGJ5IGEgZ2l2ZW4gbnVtYmVyIG9mIHNwYWNlcyAqL1xuXHRcdGluZGVudChzdHIsIGFtb3VudCwgY2hhciA9ICcgJykge1xuXHRcdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eKD8hXFxzKiQpL21nLCBVLnJlcGVhdChhbW91bnQsIGNoYXIpKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9