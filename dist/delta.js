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
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var indent = U.repeat(indentLvl, '    ');
	        var str = ("" + indent + this.type);
	        if (prop) {
	          str += (" '" + prop + "'");
	        }
	        if (U.isDefined(this.arg)) {
	          str += (": " + JSON.stringify(this.arg));
	        }
	        return str;
	      },
	      _createOperationInterface: ((function() {
	        var operationMethods = {};
	        $__0.onNewOperationType((function(cls) {
	          cls.meta.methods.forEach((function(method) {
	            if (U.isUndefined(operationMethods[method])) {
	              operationMethods[method] = function() {
	                for (var args = [],
	                    $__2 = 0; $__2 < arguments.length; $__2++)
	                  args[$__2] = arguments[$__2];
	                var newDelta = this._applyOperationMethod(method, args);
	                return newDelta.operations || this;
	              };
	            }
	          }));
	        }));
	        return function _createOperationInterface(handleOperation) {
	          Object.defineProperty(this, 'operations', {value: Object.create(operationMethods, {
	              _applyOperationMethod: {value: handleOperation},
	              delta: {value: this}
	            })});
	        };
	      }))()
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
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var str = Delta.prototype.toString.call(this, indentLvl, prop);
	        str += '\n' + this.overloads.map((function(delta) {
	          return delta.toString(indentLvl + 1, null);
	        })).join('\n');
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
	    var Modify = this.operations['Modify'] = U.newSubclass(this.Delta, (function(superFn) {
	      return function(__, meta) {
	        var $__1 = this;
	        superFn.call(this, __, meta);
	        this.deltas = {};
	        this._createOperationInterface((function(method, $__4) {
	          var $__5 = $__4,
	              pathOrOptions = $__5[0],
	              arg = $__5[1];
	          var options = thisDeltaJs._processOptions(pathOrOptions);
	          var delta = thisDeltaJs._getDeltaByMethod(method, arg);
	          var newDelta = $__1._addOperation(options, delta);
	          return newDelta.operations ? newDelta : delta;
	        }));
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
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__1 = this;
	        var str = Delta.prototype.toString.call(this, indentLvl, prop);
	        if (Object.keys(this.deltas).length > 0) {
	          str += '\n' + Object.keys(this.deltas).map((function(p) {
	            return $__1.deltas[p].toString(indentLvl + 1, p);
	          })).join('\n');
	        }
	        return str;
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
	        if (typeof pathOrOptions.path === 'string') {
	          pathOrOptions.path = new Path(pathOrOptions.path);
	        }
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
	    newOperationType: function(name) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      var $__0 = this;
	      var thisDeltaJs = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      var cls = this.operations[name] = U.newSubclass(this.Delta, (function(superFn) {
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
	    } else {
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
	    }
	  };
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlMDYxMDA2MDg3NzBiODhkNDY0MCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQWEsd0JBQVUsQ0FBRywwQ0FBVSxFQUFHLFFBQU07QUFDcEQsY0FBVyxDQUFDO0FBUVIsYUFBTSxFQUFJLFdBQVUsQ0FBQyxRQUFTLFFBQU0sQ0FBRTs7QUFHckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixRQUFHLDZCQUE2QixFQUFJLEdBQUMsQ0FBQztBQUlsQyxhQUFJLEVBQUksS0FBRyxNQUFNLEVB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QUFMLFVBQU8sU0FBUSxDQUFHLFFBQU0sQ0FBRztBQUMxQixVQUFJLENBQUMsU0FBUSxDQUFHO0FBQUUsYUFBTSxJQUFJLE1BQUssQ0FBQyxPQUFNLEdBQUssbUJBQWlCLENBQUM7T0FBRTtBQUFBLEtBQ2xFO0FBR0EsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHckQsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHbkQsVUFBSyxDQUFMLFVBQU8sRUFBQyxDQUFHLElBQUUsQ0FBRztBQUFFLFlBQU8sSUFBSSxNQUFLLENBQUMsRUFBQyxFQUFFLEdBQUMsS0FBTSxDQUFDLEdBQUUsQ0FBQztLQUFFO0FBQUEsR0FDcEQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTA2MTAwNjA4NzcwYjg4ZDQ2NDBcbiAqKi8iLCJkZWZpbmUoWycuL21pc2MuanMnLCAnanMtZ3JhcGgnXSwgZnVuY3Rpb24gKFUsIEpzR3JhcGgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICogVGhpcyBjbGFzcyBvZmZlcnMgZXZlcnkgZnVuY3Rpb25hbGl0eSB5b3UgbmVlZCBmcm9tIGRlbHRhIG1vZGVsaW5nLlxuXHQgKiBFYWNoIGluc3RhbmNlIG9mZmVycyBpdHMgb3duIG9wZXJhdGlvbiB0eXBlcyBhbmQgdmFyaWF0aW9uIHBvaW50cy5cblx0ICogWW91IHdpbGwgdXN1YWxseSBuZWVkIG9ubHkgb25lIGluc3RhbmNlIHBlciBhcHBsaWNhdGlvbi5cblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHRcdHRoaXMub3BlcmF0aW9ucyA9IHt9OyAgIC8vIHByb3BlcnR5IC0+IERlbHRhLXN1YmNsYXNzXG5cdFx0dGhpcy5jb21wb3NpdGlvbnMgPSBbXTsgLy8gW3twcmVjb25kaXRpb24sIGNvbXBvc2VGbn1dXG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzID0gW107XG5cblxuXHRcdC8qIERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGEgKi9cblx0XHR2YXIgRGVsdGEgPSB0aGlzLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoYXJnLCBtZXRhKSB7XG5cdFx0XHR0aGlzLmFyZyA9IGFyZztcblx0XHRcdHRoaXMubWV0YSA9IFUuZXh0ZW5kKHt9LCBtZXRhIHx8IHt9KTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcndyaXR0ZW4gYnkgc3ViY2xhc3NlcyB0byBtYWtlIGEgY2xvbmUgb2YgJ3RoaXMnIGRlbHRhLlxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7IHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmFyZywgdGhpcy5tZXRhKSB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHBhcmFtICB2YWx1ZSB7Kn0gLSBhbnkgZ2l2ZW4gdmFsdWVcblx0XHRcdCAqIEByZXR1cm4gdGhlIHZhbHVlIHJlc3VsdGluZyBpbiB0aGlzIGRlbHRhIGJlaW5nIGFwcGxpZWQgdG8gdGhlIGdpdmVuIGB2YWx1ZWBcblx0XHRcdCAqL1xuXHRcdFx0YXBwbGllZFRvKHZhbHVlKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlYWRhYmxlVGFyZ2V0KSB7IHZhbHVlID0gdmFsdWUudmFsdWUgfVxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nKSB7IHZhbHVlID0gdmFsdWUuY2xvbmUoKSB9XG5cdFx0XHRcdHZhciBvYmogPSB7IHZhbHVlIH07XG5cdFx0XHRcdHRoaXMuYXBwbHlUbyh3dChvYmosICd2YWx1ZScpKTtcblx0XHRcdFx0cmV0dXJuIG9iai52YWx1ZTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIG90aGVyIGRlbHRhIHRvIGNvbXBvc2Ugd2l0aFxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgY29tcG9zZWQgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y29tcG9zZWRXaXRoKG90aGVyKSB7IHJldHVybiB0aGlzRGVsdGFKcy5jb21wb3NlZCh0aGlzLCBvdGhlcikgfSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGluZGVudEx2bCB7TnVtYmVyP31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAge1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKGluZGVudEx2bCA9IDAsIHByb3AgPSAnKHJvb3QpJykge1xuXHRcdFx0XHR2YXIgaW5kZW50ID0gVS5yZXBlYXQoaW5kZW50THZsLCAnICAgICcpO1xuXHRcdFx0XHR2YXIgc3RyID0gYCR7aW5kZW50fSR7dGhpcy50eXBlfWA7XG5cdFx0XHRcdGlmIChwcm9wKSAgICAgICAgICAgICAgICAgIHsgc3RyICs9IGAgJyR7cHJvcH0nYCB9XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmFyZykpIHsgc3RyICs9IGA6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hcmcpfWAgfVxuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fSxcblxuXHRcdFx0LyogYSBwcm90ZWN0ZWQgRGVsdGEgbWV0aG9kIHRvIGNyZWF0ZSBhbiBpbnRlcmZhY2Ugd2l0aCBvcGVyYXRpb24gbWV0aG9kcyAqL1xuXHRcdFx0LyoqIHtAcHJvdGVjdGVkfXtAbWV0aG9kfVxuXHRcdFx0ICogVG8gY3JlYXRlIGFuICdvcGVyYXRpb25zJyBwcm9wZXJ0eSBvbiB0aGlzIGRlbHRhIHdpdGggb3BlcmF0aW9uIG1ldGhvZHMuXG5cdFx0XHQgKiBAcGFyYW0gaGFuZGxlT3BlcmF0aW9uIHtmdW5jdGlvbihTdHJpbmcsICopOiBEZWx0YUpzI0RlbHRhfSAtIGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIGEgZGVsdGEgb3BlcmF0aW9uXG5cdFx0XHQgKi9cblx0XHRcdF9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2U6ICgoKSA9PiB7XG5cdFx0XHRcdHZhciBvcGVyYXRpb25NZXRob2RzID0ge307XG5cdFx0XHRcdHRoaXMub25OZXdPcGVyYXRpb25UeXBlKChjbHMpID0+IHtcblx0XHRcdFx0XHRjbHMubWV0YS5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3BlcmF0aW9uTWV0aG9kc1ttZXRob2RdKSkge1xuXHRcdFx0XHRcdFx0XHRvcGVyYXRpb25NZXRob2RzW21ldGhvZF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FwcGx5T3BlcmF0aW9uTWV0aG9kKG1ldGhvZCwgYXJncyk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLm9wZXJhdGlvbnMgfHwgdGhpcztcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiBfY3JlYXRlT3BlcmF0aW9uSW50ZXJmYWNlKGhhbmRsZU9wZXJhdGlvbikge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnb3BlcmF0aW9ucycsIHtcblx0XHRcdFx0XHRcdHZhbHVlOiBPYmplY3QuY3JlYXRlKG9wZXJhdGlvbk1ldGhvZHMsIHtcblx0XHRcdFx0XHRcdFx0X2FwcGx5T3BlcmF0aW9uTWV0aG9kOiB7IHZhbHVlOiBoYW5kbGVPcGVyYXRpb24gfSxcblx0XHRcdFx0XHRcdFx0ZGVsdGE6ICAgICAgICAgICAgICAgICB7IHZhbHVlOiB0aGlzICAgICAgICAgICAgfVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pKClcblx0XHR9KTtcblxuXG5cdFx0LyogT3ZlcmxvYWRlZERlbHRhICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIE92ZXJsb2FkZWREZWx0YSAqL1xuXHRcdHRoaXMub3ZlcmxvYWRzID0ge307IC8vIG1ldGhvZCAtPiBbZGVsdGEtY2xhc3Nlc11cblx0XHR2YXIgT3ZlcmxvYWRlZERlbHRhID0gdGhpcy5vcGVyYXRpb25zWydPdmVybG9hZGVkRGVsdGEnXSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBhcmcsIG1ldGEpO1xuXHRcdFx0dGhpcy5vdmVybG9hZHMgPSBbXTtcblx0XHR9LCB7XG5cdFx0XHQvKioge0BwdWJsaWN9e0BhYnN0cmFjdH17QG1ldGhvZH17QG5vc2lkZWVmZmVjdHN9XG5cdFx0XHQgKiBAcmV0dXJuIHtEZWx0YUpzI29wZXJhdGlvbnMuT3ZlcmxvYWRlZERlbHRhfSAtIGEgY2xvbmUgb2YgdGhpcyBkZWx0YVxuXHRcdFx0ICovXG5cdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdHJlc3VsdC5vdmVybG9hZHMgPSB0aGlzLm92ZXJsb2Fkcy5tYXAoZGVsdGEgPT4gZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHQvKiBhcHBseSB0aGUgZmlyc3Qgb3ZlcmxvYWQgdGhhdCBhcHBsaWVzIHRvIHRoZSB0YXJnZXQ7IGdhdGhlciBhbnkgZXJyb3JzICovXG5cdFx0XHRcdHZhciBlcnJvcnMgPSBbXTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0aGlzLm92ZXJsb2Fkcy5zb21lKChkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdHZhciBqdWRnbWVudCA9IHRoaXNEZWx0YUpzLl9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KTtcblx0XHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKGp1ZGdtZW50KTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVsdGEuYXBwbHlUbyh0YXJnZXQpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0LyogaWYgbm9uZSBhcHBseSwgdGhyb3cgYW4gYXBwcm9wcmlhdGUgZXJyb3IgKi9cblx0XHRcdFx0aWYgKCFzdWNjZXNzKSB7XG5cdFx0XHRcdFx0aWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoaXMgb3ZlcmxvYWRlZCBkZWx0YSBoYXMgbm8gb3ZlcmxvYWRzLCBgICtcblx0XHRcdFx0XHRcdFx0YHNvIGNhbm5vdCBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfWBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0YE5vbmUgb2YgdGhlIGRlbHRhIHR5cGVzICR7dGhpcy50eXBlLmpvaW4oJywnKX0gYCArXG5cdFx0XHRcdFx0XHRcdGBhcHBseSB0byB0aGUgdmFsdWU6ICR7dGFyZ2V0LnZhbHVlfVxcbmAgICAgICAgICAgICtcblx0XHRcdFx0XHRcdFx0ZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJylcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0ICogQHBhcmFtIHByb3AgICAgICB7U3RyaW5nP31cblx0XHRcdCAqL1xuXHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdHZhciBzdHIgPSBEZWx0YS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLCBpbmRlbnRMdmwsIHByb3ApO1xuXHRcdFx0XHRzdHIgKz0gJ1xcbicgKyB0aGlzLm92ZXJsb2Fkc1xuXHRcdFx0XHRcdFx0Lm1hcCgoZGVsdGEpID0+IGRlbHRhLnRvU3RyaW5nKGluZGVudEx2bCArIDEsIG51bGwpKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpO1xuXHRcdFx0XHRyZXR1cm4gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE92ZXJsb2FkZWREZWx0YS50eXBlID0gT3ZlcmxvYWRlZERlbHRhLnByb3RvdHlwZS50eXBlID0gJ092ZXJsb2FkZWREZWx0YSc7XG5cdFx0T3ZlcmxvYWRlZERlbHRhLm1ldGEgPSBPdmVybG9hZGVkRGVsdGEucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRtZXRob2RzOiBbXVxuXHRcdH07XG5cdFx0dGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEgfHwgZDIgaW5zdGFuY2VvZiBPdmVybG9hZGVkRGVsdGEpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHR2YXIgRDEgPSBkMSBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSA/IGQxLm92ZXJsb2FkcyA6IFtkMV07XG5cdFx0XHR2YXIgRDIgPSBkMiBpbnN0YW5jZW9mIE92ZXJsb2FkZWREZWx0YSA/IGQyLm92ZXJsb2FkcyA6IFtkMl07XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3IE92ZXJsb2FkZWREZWx0YSgpO1xuXHRcdFx0dmFyIGVycm9ycyA9IFtdO1xuXHRcdFx0RDEuZm9yRWFjaCgoZGVsdGExKSA9PiB7XG5cdFx0XHRcdEQyLmZvckVhY2goKGRlbHRhMikgPT4ge1xuXHRcdFx0XHRcdHRyeSB7IHJlc3VsdC5vdmVybG9hZHMucHVzaChkZWx0YTEuY29tcG9zZWRXaXRoKGRlbHRhMikpIH1cblx0XHRcdFx0XHRjYXRjaCAoZXJyb3IpIHsgZXJyb3JzLnB1c2goZXJyb3IpIH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChyZXN1bHQub3ZlcmxvYWRzLmxlbmd0aCA9PT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoZXJyb3JzLm1hcChlID0+IGUubWVzc2FnZSkuam9pbignXFxuJykpIH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSk7XG5cblxuXHRcdC8qIE1vZGlmeSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBNb2RpZnkgKi9cblx0XHR2YXIgTW9kaWZ5ID0gdGhpcy5vcGVyYXRpb25zWydNb2RpZnknXSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChfXywgbWV0YSkge1xuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIF9fLCBtZXRhKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0XHR0aGlzLl9jcmVhdGVPcGVyYXRpb25JbnRlcmZhY2UoKG1ldGhvZCwgW3BhdGhPck9wdGlvbnMsIGFyZ10pID0+IHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzRGVsdGFKcy5fcHJvY2Vzc09wdGlvbnMocGF0aE9yT3B0aW9ucyk7XG5cdFx0XHRcdHZhciBkZWx0YSA9IHRoaXNEZWx0YUpzLl9nZXREZWx0YUJ5TWV0aG9kKG1ldGhvZCwgYXJnKTtcblx0XHRcdFx0dmFyIG5ld0RlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKG9wdGlvbnMsIGRlbHRhKTtcblx0XHRcdFx0cmV0dXJuIG5ld0RlbHRhLm9wZXJhdGlvbnMgPyBuZXdEZWx0YSA6IGRlbHRhO1xuXHRcdFx0fSk7XG5cdFx0fSwge1xuXHRcdFx0LyoqIHtAcHVibGljfXtAYWJzdHJhY3R9e0BtZXRob2R9e0Bub3NpZGVlZmZlY3RzfVxuXHRcdFx0ICogQHJldHVybiB7RGVsdGFKcyNvcGVyYXRpb25zLk1vZGlmeX0gLSBhIGNsb25lIG9mIHRoaXMgZGVsdGFcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHJlc3VsdC5kZWx0YXNbcHJvcF0gPSB0aGlzLmRlbHRhc1twcm9wXS5jbG9uZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqIEBwYXJhbSB0YXJnZXQgeyp9XG5cdFx0XHQgKi9cblx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldC52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCB9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLldyaXRhYmxlVGFyZ2V0fVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUpLFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdFx0VS5hc3NlcnQodGFyZ2V0LnZhbHVlIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdFx0YFRoZSAnTW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gT2JqZWN0LmApO1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuZGVsdGFzW3Byb3BdLmFwcGx5VG8od3QodGFyZ2V0LnZhbHVlLCBwcm9wKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICogQHBhcmFtIGluZGVudEx2bCB7TnVtYmVyP31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAgICAge1N0cmluZz99XG5cdFx0XHQgKi9cblx0XHRcdHRvU3RyaW5nKGluZGVudEx2bCA9IDAsIHByb3AgPSAnKHJvb3QpJykge1xuXHRcdFx0XHR2YXIgc3RyID0gRGVsdGEucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcywgaW5kZW50THZsLCBwcm9wKTtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMuZGVsdGFzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0c3RyICs9ICdcXG4nICsgT2JqZWN0LmtleXModGhpcy5kZWx0YXMpXG5cdFx0XHRcdFx0XHRcdC5tYXAoKHApID0+IHRoaXMuZGVsdGFzW3BdLnRvU3RyaW5nKGluZGVudEx2bCArIDEsIHApKVxuXHRcdFx0XHRcdFx0XHQuam9pbignXFxuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0cjtcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0XHQgKiBAcGFyYW0gb3B0aW9ucyB7T2JqZWN0fVxuXHRcdFx0ICogQHBhcmFtIGRlbHRhICAge0RlbHRhSnMjRGVsdGF9XG5cdFx0XHQgKi9cblx0XHRcdF9hZGRPcGVyYXRpb24ob3B0aW9ucywgZGVsdGEpIHtcblx0XHRcdFx0dmFyIHtwYXRofSA9IG9wdGlvbnM7XG5cblx0XHRcdFx0LyogaWYgdGhlcmUgaXMgYSAncmVzdCcgdG8gdGhlIHBhdGgsIHNldCBhIGxpbmsgaW4gdGhlIGNoYWluICovXG5cdFx0XHRcdGlmIChwYXRoLnJlc3QpIHtcblx0XHRcdFx0XHQvKiBpZiB0aGVyZSBpcyBhIGxvbmdlciBjaGFpbiwgY2FsbCB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSAqL1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbnMubW9kaWZ5KHBhdGgucHJvcCkuZGVsdGFcblx0XHRcdFx0XHRcdFx0Ll9hZGRPcGVyYXRpb24oVS5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogcGF0aC5yZXN0IH0pLCBkZWx0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiBzdG9yZSB0aGUgbmV3IGRlbHRhLCBwb3NzaWJseSBjb21wb3NlZCB3aXRoIGFuIGV4aXN0aW5nIG9uZSAqL1xuXHRcdFx0XHR0aGlzLmRlbHRhc1twYXRoLnByb3BdID0gdGhpc0RlbHRhSnMuY29tcG9zZWQodGhpcy5kZWx0YXNbcGF0aC5wcm9wXSwgZGVsdGEpO1xuXG5cdFx0XHRcdC8qIHJldHVybiB0aGUgY29tcG9zZWQgZGVsdGEgaWYgaXQgaGFzIGFuIG9wZXJhdGlvbnMgaW50ZXJmYWNlOyBvdGhlcndpc2UsIHJldHVybiB0aGUgZ2l2ZW4gZGVsdGEgKi9cblx0XHRcdFx0cmV0dXJuIHRoaXMuZGVsdGFzW3BhdGgucHJvcF0ub3BlcmF0aW9ucyA/IHRoaXMuZGVsdGFzW3BhdGgucHJvcF0gOiBkZWx0YTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRNb2RpZnkudHlwZSA9IE1vZGlmeS5wcm90b3R5cGUudHlwZSA9ICdNb2RpZnknO1xuXHRcdE1vZGlmeS5tZXRhID0gTW9kaWZ5LnByb3RvdHlwZS5tZXRhID0ge1xuXHRcdFx0bWV0aG9kczogWydtb2RpZnknXVxuXHRcdH07XG5cdFx0dGhpcy5fb25OZXdPcGVyYXRpb25UeXBlTGlzdGVuZXJzLmZvckVhY2goKGZuKSA9PiB7IGZuKE1vZGlmeSkgfSk7XG5cblx0XHQvKiBhZGQgdGhpcyBuZXcgdHlwZSB0byB0aGUgbGlzdCBvZiB0eXBlcyBhc3NvY2lhdGVkIHdpdGggZWFjaCBtZXRob2QgKi9cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5vdmVybG9hZHNbJ21vZGlmeSddKSkgeyB0aGlzLm92ZXJsb2Fkc1snbW9kaWZ5J10gPSBbXSB9XG5cdFx0dGhpcy5vdmVybG9hZHNbJ21vZGlmeSddLnB1c2goJ01vZGlmeScpO1xuXG5cblx0XHQvKiBzdGFuZGFyZCBvcGVyYXRpb25zICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBzdGFuZGFyZCBvcGVyYXRpb25zICovXG5cdFx0dGhpcy5fZGVmaW5lU3RhbmRhcmRPcGVyYXRpb25UeXBlcygpO1xuXG5cblx0fSwgLyoqIEBsZW5kcyBEZWx0YUpzLnByb3RvdHlwZSAqLyAgeyAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRGVsdGFKcy5wcm90b3R5cGUgKi9cblxuXHRcdC8vLyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdC8vICpcblx0XHQvLyAqL1xuXHRcdC8vdnAodnBOYW1lLCB2YWwpIHtcblx0XHQvL1x0Ly8gVE9ET1xuXHRcdC8vfSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIHBhdGhPck9wdGlvbnMge1N0cmluZ3x7cGF0aDogU3RyaW5nfX1cblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0X3Byb2Nlc3NPcHRpb25zKHBhdGhPck9wdGlvbnMpIHtcblx0XHRcdGlmICh0eXBlb2YgcGF0aE9yT3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmV0dXJuIHsgcGF0aDogbmV3IFBhdGgocGF0aE9yT3B0aW9ucykgfTtcblx0XHRcdH0gZWxzZSBpZiAocGF0aE9yT3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHBhdGhPck9wdGlvbnMucGF0aCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRwYXRoT3JPcHRpb25zLnBhdGggPSBuZXcgUGF0aChwYXRoT3JPcHRpb25zLnBhdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBwYXRoT3JPcHRpb25zO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdGBUaGUgb3B0aW9ucyBhcmd1bWVudCBvbiBhIGRlbHRhIG9wZXJhdGlvbiBgICtcblx0XHRcdFx0XHRgYSBzaG91bGQgYmUgYSBwYXRoIHN0cmluZyBvciBhbiBvcHRpb25zIG9iamVjdC5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIG1ldGhvZCB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcmcgICAgeyp9XG5cdFx0ICogQHJldHVybiB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKi9cblx0XHRfZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZykge1xuXHRcdFx0dmFyIG5ld0RlbHRhcyA9IHRoaXMub3ZlcmxvYWRzW21ldGhvZF1cblx0XHRcdFx0Lm1hcCh0eXBlID0+IG5ldyB0aGlzLm9wZXJhdGlvbnNbdHlwZV0oYXJnLCB7IG1ldGhvZCB9KSk7XG5cdFx0XHRpZiAobmV3RGVsdGFzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3RGVsdGFzWzBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gbmV3RGVsdGFzLmxlbmd0aCA+IDFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMub3BlcmF0aW9uc1snT3ZlcmxvYWRlZERlbHRhJ10oYXJnLCB7IG1ldGhvZCB9KTtcblx0XHRcdFx0ZGVsdGEub3ZlcmxvYWRzID0gbmV3RGVsdGFzO1xuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGRlbHRhICB7RGVsdGFKcyNEZWx0YX1cblx0XHQgKiBAcGFyYW0gdGFyZ2V0IHtEZWx0YUpzLlJlYWRhYmxlVGFyZ2V0fVxuXHRcdCAqL1xuXHRcdF9ldmFsdWF0ZVByZWNvbmRpdGlvbihkZWx0YSwgdGFyZ2V0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGRlbHRhLnByZWNvbmRpdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR2YXIganVkZ21lbnQgPSBkZWx0YS5wcmVjb25kaXRpb24odGFyZ2V0KTtcblx0XHRcdFx0aWYgKGp1ZGdtZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4ganVkZ21lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGp1ZGdtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVHlwZUVycm9yKGp1ZGdtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmICghanVkZ21lbnQpIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0XHRcdFx0YFRoZSB2YWx1ZSAnJHt0YXJnZXQudmFsdWV9JyBkb2VzIG5vdCBzYXRpc2Z5IGAgK1xuXHRcdFx0XHRcdFx0XHRgdGhlIHByZWNvbmRpdGlvbiBvZiB0aGUgJyR7ZGVsdGEudHlwZX0nIG9wZXJhdGlvbi5gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gbmFtZSAgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSBhcHBseVRvIHsoRGVsdGFKcy5Xcml0YWJsZVRhcmdldCkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld09wZXJhdGlvblR5cGUobmFtZSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBzYW5pdHkgY2hlY2tzICovXG5cdFx0XHRVLmFzc2VydCghdGhpcy5vcGVyYXRpb25zW25hbWVdLFxuXHRcdFx0XHRcdGBUaGUgJyR7bmFtZX0nIG9wZXJhdGlvbiB0eXBlIGFscmVhZHkgZXhpc3RzLmApO1xuXG5cdFx0XHQvKiBEZWx0YSBzdWJjbGFzcyAqL1xuXHRcdFx0dmFyIGNscyA9IHRoaXMub3BlcmF0aW9uc1tuYW1lXSA9IFUubmV3U3ViY2xhc3ModGhpcy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChhcmcsIG1ldGEpIHtcblx0XHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIGFyZywgbWV0YSk7XG5cdFx0XHRcdGlmICh0aGlzLmNvbnN0cnVjdCkgeyB0aGlzLmNvbnN0cnVjdCgpIH1cblx0XHRcdH0sIFUuZXh0ZW5kKHt9LCBwcm90b3R5cGUsIHtcblx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpIHtcblx0XHRcdFx0XHR2YXIganVkZ21lbnQgPSB0aGlzRGVsdGFKcy5fZXZhbHVhdGVQcmVjb25kaXRpb24odGhpcywgdGFyZ2V0KTtcblx0XHRcdFx0XHRpZiAoanVkZ21lbnQgIT09IHRydWUpIHsgdGhyb3cganVkZ21lbnQgfVxuXHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm90b3R5cGUuYXBwbHlUbykpIHsgcHJvdG90eXBlLmFwcGx5VG8uY2FsbCh0aGlzLCB0YXJnZXQpIH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpO1xuXHRcdFx0Y2xzLnR5cGUgPSBjbHMucHJvdG90eXBlLnR5cGUgPSBuYW1lO1xuXHRcdFx0Y2xzLm1ldGEgPSBjbHMucHJvdG90eXBlLm1ldGEgPSB7XG5cdFx0XHRcdC8vIGlmIG5vIG1ldGhvZHMgYXJlIHByb3ZpZGVkLCB1c2UgdGhlIG9wZXJhdGlvbiBuYW1lIHN0YXJ0aW5nIHdpdGggYSBsb3dlcmNhc2UgbGV0dGVyXG5cdFx0XHRcdG1ldGhvZHM6IHByb3RvdHlwZS5tZXRob2RzIHx8IFsgbmFtZVswXS50b0xvd2VyQ2FzZSgpK25hbWUuc2xpY2UoMSkgXVxuXHRcdFx0fTtcblxuXHRcdFx0LyogYWRkIHRoaXMgbmV3IHR5cGUgdG8gdGhlIGxpc3Qgb2YgdHlwZXMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbWV0aG9kICovXG5cdFx0XHRjbHMubWV0YS5tZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuXHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5vdmVybG9hZHNbbWV0aG9kXSkpIHsgdGhpcy5vdmVybG9hZHNbbWV0aG9kXSA9IFtdIH1cblx0XHRcdFx0dGhpcy5vdmVybG9hZHNbbWV0aG9kXS5wdXNoKG5hbWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qIG5vdGlmeSBsaXN0ZW5lcnMgKi9cblx0XHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5mb3JFYWNoKChmbikgPT4geyBmbihjbHMpIH0pO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIG5ldyBjbGFzcyAqL1xuXHRcdFx0cmV0dXJuIGNscztcblxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICogQHBhcmFtIGZuIHsoRnVuY3Rpb24pID0+IHVuZGVmaW5lZH0gLSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdWJjbGFzcyBvZiBgRGVsdGFKcyNEZWx0YWBcblx0XHQgKi9cblx0XHRvbk5ld09wZXJhdGlvblR5cGUoZm4pIHtcblx0XHRcdHRoaXMuX29uTmV3T3BlcmF0aW9uVHlwZUxpc3RlbmVycy5wdXNoKGZuKTtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdFx0XHRmbih0aGlzLm9wZXJhdGlvbnNbbmFtZV0pO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKiBAcGFyYW0gcHJlY29uZGl0aW9uIHsoRGVsdGFKcyNEZWx0YSwgRGVsdGFKcyNEZWx0YSkgPT4gQm9vbGVhbn0gLSBjYW4gdGhlc2UgZGVsdGFzIGJlIGNvbXBvc2VkIHRoaXMgd2F5P1xuXHRcdCAqIEBwYXJhbSBjb21wb3NlICAgICAgeyhEZWx0YUpzI0RlbHRhLCBEZWx0YUpzI0RlbHRhKSA9PiBEZWx0YUpzI0RlbHRhfSAtIHNob3VsZCBiZSBzaWRlLWVmZmVjdCBmcmVlXG5cdFx0ICovXG5cdFx0bmV3Q29tcG9zaXRpb24ocHJlY29uZGl0aW9uLCBjb21wb3NlKSB7XG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9ucy5wdXNoKHtwcmVjb25kaXRpb24sIGNvbXBvc2V9KTtcblx0XHR9LFxuXG5cdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdCAqIEBwYXJhbSBkMSB7RGVsdGFKcyNEZWx0YX0gLSB0aGUgZmlyc3QgZGVsdGFcblx0XHQgKiBAcGFyYW0gZDIge0RlbHRhSnMjRGVsdGF9IC0gdGhlIHNlY29uZCBkZWx0YVxuXHRcdCAqIEByZXR1cm4ge0RlbHRhSnMjRGVsdGF9IC0gdGhlIGNvbXBvc2VkIGRlbHRhXG5cdFx0ICovXG5cdFx0Y29tcG9zZWQoZDEsIGQyKSB7XG5cdFx0XHQvKiBoYW5kbGUgdGhlIGNhc2VzIHdoZXJlIG9uZSBvciBib3RoIGFyZ3VtZW50cyBhcmUgdW5kZWZpbmVkICovXG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMSkpIHsgZDEgPSBuZXcgdGhpcy5vcGVyYXRpb25zWydOb09wJ10oKSB9XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChkMikpIHsgZDIgPSBuZXcgdGhpcy5vcGVyYXRpb25zWydOb09wJ10oKSB9XG5cblx0XHRcdC8qIHVzZSB0aGUgZmlyc3QgY29tcG9zaXRpb24gZnVuY3Rpb24gZm9yIHdoaWNoIHRoZXNlIGRlbHRhcyBzYXRpc2Z5IHRoZSBwcmVjb25kaXRpb24gKi9cblx0XHRcdHZhciBjb21wb3NlRm4gPSAoKT0+e307XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXMuY29tcG9zaXRpb25zLnNvbWUoKHtwcmVjb25kaXRpb24sIGNvbXBvc2U6IGZufSkgPT4ge1xuXHRcdFx0XHRpZiAocHJlY29uZGl0aW9uKGQxLCBkMikpIHtcblx0XHRcdFx0XHRjb21wb3NlRm4gPSBmbjtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gc3VjY2VzczsgYnJlYWsgdGhlIGxvb3Bcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHRocm93IGFuIGVycm9yIG9uIGZhaWx1cmUgKi9cblx0XHRcdFUuYXNzZXJ0KHN1Y2Nlc3MsXG5cdFx0XHRcdFx0YEEgJyR7ZDEudHlwZX0nIG9wZXJhdGlvbiBjYW5ub3QgYmUgZm9sbG93ZWQgYnkgYSAnJHtkMi50eXBlfScgb3BlcmF0aW9uLmApO1xuXG5cdFx0XHQvKiByZXR1cm4gdGhlIHJlc3VsdCBvbiBzdWNjZXNzICovXG5cdFx0XHRyZXR1cm4gY29tcG9zZUZuKGQxLCBkMik7XG5cdFx0fSxcblxuXHRcdC8qKiB7QHByaXZhdGV9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKi9cblx0XHRfZGVmaW5lU3RhbmRhcmRPcGVyYXRpb25UeXBlcygpIHtcblxuXHRcdFx0LyogJ3RoaXMnIGFsaWFzICovXG5cdFx0XHR2YXIgdGhpc0RlbHRhSnMgPSB0aGlzO1xuXG5cdFx0XHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0XHRcdGZ1bmN0aW9uIHQodHlwZTEsIHR5cGUyKSB7IHJldHVybiAoZDEsIGQyKSA9PiAoZDEudHlwZSA9PT0gdHlwZTEgJiYgZDIudHlwZSA9PT0gdHlwZTIpIH1cblx0XHRcdGZ1bmN0aW9uIGQodHlwZSwgZm4pIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBmbiA9PT0gJ3N0cmluZycpIHsgZm4gPSAoKHYpID0+IChvKSA9PiBvW3ZdKShmbikgfVxuXHRcdFx0XHRyZXR1cm4gKGQxLCBkMikgPT4gbmV3ICh0aGlzRGVsdGFKcy5vcGVyYXRpb25zW3R5cGVdKShmbiAmJiBmbih7ZDEsIGQyLCBwMTogZDEuYXJnLCBwMjogZDIuYXJnfSkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgYmFzaWMgb3BlcmF0aW9uIHR5cGVzICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHQvLyAnTW9kaWZ5JyBpcyB0aGUgbW9zdCBmdW5kYW1lbnRhbCBvcGVyYXRpb24sXG5cdFx0XHQvLyAgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZVxuXHRcdFx0dmFyIE5vT3AgPSB0aGlzLm5ld09wZXJhdGlvblR5cGUoJ05vT3AnKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIChkMSwgZDIpID0+IGQxIGluc3RhbmNlb2YgTm9PcCwgKGQxLCBkMikgPT4gZDIuY2xvbmUoKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggKGQxLCBkMikgPT4gZDIgaW5zdGFuY2VvZiBOb09wLCAoZDEsIGQyKSA9PiBkMS5jbG9uZSgpICk7XG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBiYXNpYyBvcGVyYXRpb24gdHlwZXMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdC8vICdNb2RpZnknIGlzIHRoZSBtb3N0IGZ1bmRhbWVudGFsIG9wZXJhdGlvbiwgYW5kIGlzIGRlZmluZWQgYWJvdmUgcmF0aGVyIHRoYW4gaGVyZS5cblx0XHRcdFtcblx0XHRcdFx0WydBZGQnICAgICwgJ2FkZCcsICAgICAodGFyZ2V0KSA9PiBVLmlzVW5kZWZpbmVkKHRhcmdldC52YWx1ZSldLFxuXHRcdFx0XHRbJ1JlcGxhY2UnLCAncmVwbGFjZScsICh0YXJnZXQpID0+IFUuaXNEZWZpbmVkICAodGFyZ2V0LnZhbHVlKV1cblx0XHRcdF0uZm9yRWFjaCgoW1R5cGUsIHR5cGUsIHByZV0pID0+IHtcblx0XHRcdFx0Ly8gSW4gdGhlIGxpbmUgZGlyZWN0bHkgYmVsb3csICd0aGlzJyBjYW5ub3QgYmUgdXNlZCBiZWNhdXNlIG9mIGEgYnVnIGluIHRyYWNldXI6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvdHJhY2V1ci1jb21waWxlci9pc3N1ZXMvMTYzMVxuXHRcdFx0XHR0aGlzRGVsdGFKcy5uZXdPcGVyYXRpb25UeXBlKFR5cGUsIHtcblx0XHRcdFx0XHRjb25zdHJ1Y3QoKSAgICAgICAgICB7IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnID0gW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHRcdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFdyaXRhYmxlVGFyZ2V0ICYmIHByZSh0YXJnZXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cdFx0XHRcdFx0YXBwbHlUbyh0YXJnZXQpICAgICAgeyB0YXJnZXQudmFsdWUgPSB0aGlzLmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKHYsIGQpID0+IGQuYXBwbGllZFRvKHYpLCB0aGlzLmFyZykgfSxcblx0XHRcdFx0XHRjbG9uZSgpIHtcblx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzRGVsdGFKcy5EZWx0YS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCB0aGlzLmFyZywgdGhpcy5tZXRhKTsgLy8gc3VwZXIoKVxuXHRcdFx0XHRcdFx0cmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZyA9IHRoaXMuZGVsdGFzVG9BcHBseVRvQXJnLm1hcChkID0+IGQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFmdGVyQXBwbHlpbmcoZGVsdGEpIHtcblx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmNsb25lKCk7XG5cdFx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzVG9BcHBseVRvQXJnLnB1c2goZGVsdGEpO1xuXHRcdFx0XHRcdFx0VS5hc3NlcnQocmVzdWx0LmRlbHRhc1RvQXBwbHlUb0FyZy5yZWR1Y2UoKGQxLCBkMikgPT4gdGhpc0RlbHRhSnMuY29tcG9zZWQoZDEsIGQyKSlcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgICAucHJlY29uZGl0aW9uKHd0KHJlc3VsdCwgJ2FyZycpKSA9PT0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRgVGhlIGdpdmVuICcke2RlbHRhLnR5cGV9JyBvcGVyYXRpb24gZG9lcyBub3QgYXBwbHkgdG8gdGhlICcke3R5cGV9J2VkIHZhbHVlLmApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ1JlbW92ZScsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgV3JpdGFibGVUYXJnZXQgJiYgVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSB9LFxuXHRcdFx0XHRhcHBseVRvKHRhcmdldCkgeyB0YXJnZXQuZGVsZXRlKCkgfVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLm5ld09wZXJhdGlvblR5cGUoJ0ZvcmJpZCcsIHtcblx0XHRcdFx0cHJlY29uZGl0aW9uKHRhcmdldCkgeyByZXR1cm4gVS5pc1VuZGVmaW5lZCh0YXJnZXQudmFsdWUpIH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb21wb3NpdGlvbiAtIGludHJvZHVjaW5nICdNb2RpZnknICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnTW9kaWZ5JywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBkMS5jbG9uZSgpO1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRyZXN1bHQuZGVsdGFzW3Byb3BdID0gdGhpc0RlbHRhSnMuY29tcG9zZWQocmVzdWx0LmRlbHRhc1twcm9wXSwgZDIuZGVsdGFzW3Byb3BdKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnQWRkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcsICdNb2RpZnknKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVtb3ZlJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScsICdSZW1vdmUnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ0FkZCcgICAsICdSZW1vdmUnKSwgZCgnRm9yYmlkJykgICAgICAgICAgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdBZGQnICAgKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnRm9yYmlkJyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlbW92ZScsICdGb3JiaWQnKSwgZCgnUmVtb3ZlJykgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnRm9yYmlkJywgJ0FkZCcgICApLCBkKCdBZGQnLCAoe3AyfSkgPT4gcDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdGb3JiaWQnLCAnRm9yYmlkJyksIGQoJ0ZvcmJpZCcpICAgICAgICAgICAgKTtcblxuXHRcdFx0LyogY29tcG9zaXRpb24gLSBpbnRyb2R1Y2luZyAnUmVwbGFjZScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ01vZGlmeScgLCAnUmVwbGFjZScpLCBkKCdSZXBsYWNlJywgKHtwMn0pID0+IHAyKSAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnQWRkJyAgICAsICdSZXBsYWNlJyksIGQoJ0FkZCcsICAgICAoe3AyfSkgPT4gcDIpICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ01vZGlmeScpLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUmVwbGFjZScsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJywgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0LyogZGVjbGFyaW5nIHRoZSBhcnJheSBvcGVyYXRpb24gdHlwZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0FycmF5Jywge1xuXHRcdFx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMubWV0YS5tZXRob2QpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiB0aGlzLm1ldGEubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5hcmdcblx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHsgcmV0dXJuIFUuaXNEZWZpbmVkKHRhcmdldC52YWx1ZSkgJiYgQXJyYXkuaXNBcnJheSh0YXJnZXQudmFsdWUpIH0sXG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFx0dmFyIGFyciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9BcnJheScgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICwgJ1B1dEludG9BcnJheScgICAgKSwgKGQxLCBkMikgPT4gZDEuYWZ0ZXJBcHBseWluZyhkMikgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1JlcGxhY2UnLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiBkMS5hZnRlckFwcGx5aW5nKGQyKSApO1xuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbiggdCgnUHV0SW50b0FycmF5JyAgICAsICdSZW1vdmUnICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvQXJyYXknICAgICwgJ1JlcGxhY2UnKSwgZCgnUmVwbGFjZScsICh7cDJ9KSA9PiBwMikgICAgICAgKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oIHQoJ1B1dEludG9BcnJheScgICAgLCAnUHV0SW50b0FycmF5JyAgICApLCAoZDEsIGQyKSA9PiB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBuZXcgdGhpc0RlbHRhSnMub3BlcmF0aW9uc1snUHV0SW50b0FycmF5J10oKTtcblx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IChkMS52YWx1ZXMpLmNvbmNhdChkMi52YWx1ZXMpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSk7XG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8qIGRlY2xhcmluZyB0aGUgZnVuY3Rpb24gb3BlcmF0aW9uIHR5cGUgKi9cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnUHV0SW50b0Z1bmN0aW9uJywge1xuXHRcdFx0XHRjb25zdHJ1Y3QoKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMubWV0YS5tZXRob2QpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWVzID0gW3tcblx0XHRcdFx0XHRcdFx0bWV0aG9kOiB0aGlzLm1ldGEubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5hcmdcblx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xvbmUoKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdCA9IHRoaXNEZWx0YUpzLkRlbHRhLnByb3RvdHlwZS5jbG9uZS5jYWxsKHRoaXMsIHRoaXMuYXJnLCB0aGlzLm1ldGEpOyAvLyBzdXBlcigpXG5cdFx0XHRcdFx0cmVzdWx0LnZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdHRoaXMudmFsdWVzLmZvckVhY2goKHYpID0+IHsgcmVzdWx0LnZhbHVlcy5wdXNoKHYpIH0pO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHByZWNvbmRpdGlvbih0YXJnZXQpIHtcblx0XHRcdFx0XHRyZXR1cm4gVS5pc0RlZmluZWQodGFyZ2V0LnZhbHVlKSAmJiB0eXBlb2YgdGFyZ2V0LnZhbHVlID09PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdFx0XHRcdChVLmlzRGVmaW5lZCh0YXJnZXQudmFsdWUuX0RlbHRhSnNfZnVuY3Rpb25zKSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBXcml0YWJsZVRhcmdldCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGx5VG8odGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQodGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucykpIHtcblx0XHRcdFx0XHRcdHZhciBvcmlnaW5hbEZuID0gdGFyZ2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0dmFyIG5ld0ZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRcdFx0bmV3Rm4uX0RlbHRhSnNfZnVuY3Rpb25zLmZvckVhY2goKGZuKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEFzc2lnbm1lbnRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRuZXdGbi5fRGVsdGFKc19mdW5jdGlvbnMgPSBbZnVuY3Rpb24gKC4uLmFyZ3MpIHsgb3JpZ2luYWxGbi5hcHBseSh0aGlzLCBhcmdzKSB9XTtcblx0XHRcdFx0XHRcdHRhcmdldC52YWx1ZSA9IG5ld0ZuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgYXJyID0gdGFyZ2V0LnZhbHVlLl9EZWx0YUpzX2Z1bmN0aW9ucztcblx0XHRcdFx0XHR0aGlzLnZhbHVlcy5mb3JFYWNoKCh7bWV0aG9kLCB2YWx1ZX0pID0+IHtcblx0XHRcdFx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgJ3ByZXBlbmQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyLnVuc2hpZnQodmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9IGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlICdpbnNlcnQnOiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gJ2luc2VydCcgZG9lc24ndCAqaGF2ZSogdG8gdXNlIGEgcmFuZG9tIHBvc2l0aW9uLiBBbnkgcG9zaXRpb24gd2lsbCBkby5cblx0XHRcdFx0XHRcdFx0XHQvLyAgRS5nLiwgaXRzIGltcGxlbWVudGF0aW9uIGNvdWxkIGp1c3QgYmUgdGhlIHNhbWUgYXMgZm9yICdhcHBlbmQnLlxuXHRcdFx0XHRcdFx0XHRcdC8vICBOb25ldGhlbGVzcywgd2UgdXNlIGEgcmFuZG9tIHBvc2l0aW9uIHRvIGZvcmNlIHRoZSB0ZXN0cyB0byBiZSBwZXJtaXNzaXZlLlxuXHRcdFx0XHRcdFx0XHRcdHZhciBwb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChhcnIubGVuZ3RoICsgMSkpO1xuXHRcdFx0XHRcdFx0XHRcdGFyci5zcGxpY2UocG9zaXRpb24sIDAsIHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAnYXBwZW5kJzoge1xuXHRcdFx0XHRcdFx0XHRcdGFyci5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fSBicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdFx0bWV0aG9kczogWydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ1B1dEludG9GdW5jdGlvbicgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdBZGQnICAgICAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdSZXBsYWNlJyAgICAgICAgLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IGQxLmFmdGVyQXBwbHlpbmcoZDIpICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVtb3ZlJyAgICAgICAgICksIGQoJ1JlbW92ZScpICAgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUmVwbGFjZScgICAgICAgICksIGQoJ1JlcGxhY2UnLCAoe3AyfSkgPT4gcDIpICAgICAgICk7XG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCB0KCdQdXRJbnRvRnVuY3Rpb24nLCAnUHV0SW50b0Z1bmN0aW9uJyksIChkMSwgZDIpID0+IHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IG5ldyB0aGlzRGVsdGFKcy5vcGVyYXRpb25zWydQdXRJbnRvRnVuY3Rpb24nXSgpO1xuXHRcdFx0XHRyZXN1bHQudmFsdWVzID0gKGQxLnZhbHVlcykuY29uY2F0KGQyLnZhbHVlcyk7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KTtcblx0XHRcdC8vIFRPRE86IENoYW5nZSAnYXBwZW5kJyBhbmQgJ3ByZXBlbmQnIHRvIGZvbGxvdyBhbnkgdW5kZXJseWluZyBwYXJ0aWFsIG9yZGVyIChkZWx0YSBtb2RlbClcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0Ly8vKiBkZWNsYXJpbmcgdGhlICdEZWx0YU1vZGVsJyB0eXBlICovXG5cdFx0XHQvL3ZhciBEZWx0YU1vZGVsID0gdGhpcy5uZXdPcGVyYXRpb25UeXBlKCdEZWx0YU1vZGVsJywge1xuXHRcdFx0Ly9cdGNvbnN0cnVjdCgpIHtcblx0XHRcdC8vXHRcdHRoaXMuZ3JhcGggPSBuZXcgSnNHcmFwaCgpO1xuXHRcdFx0Ly9cdFx0dGhpcy5fY3JlYXRlT3BlcmF0aW9uSW50ZXJmYWNlKChtZXRob2QsIFtwYXRoT3JPcHRpb25zLCBhcmddKSA9PiB7XG5cdFx0XHQvL1x0XHRcdHZhciBvcHRpb25zID0gdGhpc0RlbHRhSnMuX3Byb2Nlc3NPcHRpb25zKHBhdGhPck9wdGlvbnMpO1xuXHRcdFx0Ly9cdFx0XHR2YXIgZGVsdGEgPSB0aGlzRGVsdGFKcy5fZ2V0RGVsdGFCeU1ldGhvZChtZXRob2QsIGFyZyk7XG5cdFx0XHQvL1x0XHRcdHZhciBuZXdEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihvcHRpb25zLCBkZWx0YSk7XG5cdFx0XHQvL1x0XHRcdHJldHVybiBuZXdEZWx0YS5vcGVyYXRpb25zID8gbmV3RGVsdGEgOiBkZWx0YTtcblx0XHRcdC8vXHRcdH0pO1xuXHRcdFx0Ly9cdH0sXG5cdFx0XHQvL1x0Y2xvbmUoKSB7XG5cdFx0XHQvL1x0XHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdC8vXHRcdHJlc3VsdC5ncmFwaCA9IHRoaXMuZ3JhcGguY2xvbmUoKTtcblx0XHRcdC8vXHRcdHJlc3VsdC5ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdC8vXHRcdFx0cmVzdWx0LmdyYXBoLnNldFZlcnRleChpZCwgZGVsdGEuY2xvbmUoKSk7XG5cdFx0XHQvL1x0XHR9KTtcblx0XHRcdC8vXHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHQvL1x0fSxcblx0XHRcdC8vXHRhcHBseVRvKHRhcmdldCkge1xuXHRcdFx0Ly9cdFx0dGhpcy5ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBzdWJEZWx0YSkgPT4ge1xuXHRcdFx0Ly9cdFx0XHRzdWJEZWx0YS5hcHBseVRvKHRhcmdldCk7XG5cdFx0XHQvL1x0XHR9KTtcblx0XHRcdC8vXHR9LFxuXHRcdFx0Ly9cdF9hZGRPcGVyYXRpb24obmFtZSwgb3B0aW9ucywgZGVsdGEpIHtcblx0XHRcdC8vXHRcdHZhciB7cGF0aH0gPSBvcHRpb25zO1xuXHRcdFx0Ly9cblx0XHRcdC8vXHRcdC8qIGlmIHRoZXJlIGlzIGEgJ3Jlc3QnIHRvIHRoZSBwYXRoLCBzZXQgYSBsaW5rIGluIHRoZSBjaGFpbiAqL1xuXHRcdFx0Ly9cdFx0aWYgKHBhdGgucmVzdCkge1xuXHRcdFx0Ly9cdFx0XHQvKiBpZiB0aGVyZSBpcyBhIGxvbmdlciBjaGFpbiwgY2FsbCB0aGlzIG1ldGhvZCByZWN1cnNpdmVseSAqL1xuXHRcdFx0Ly9cdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zLm1vZGlmeShwYXRoLnByb3ApLmRlbHRhXG5cdFx0XHQvL1x0XHRcdFx0XHQuX2FkZE9wZXJhdGlvbihVLmV4dGVuZCh7fSwgb3B0aW9ucywgeyBwYXRoOiBwYXRoLnJlc3QgfSksIGRlbHRhKTtcblx0XHRcdC8vXHRcdH1cblx0XHRcdC8vXG5cdFx0XHQvL1x0XHQvLyBUT0RPXG5cdFx0XHQvL1xuXHRcdFx0Ly9cdFx0LyogYWRkIGl0IHRvIHRoZSBkZWx0YSBtb2RlbCAqL1xuXHRcdFx0Ly9cdFx0dGhpcy5ncmFwaC5hZGROZXdWZXJ0ZXgobmFtZSwgZGVsdGEpOyAvLyBUT0RPOiBzaG91bGQgYmUgZGVsdGEgY2hhaW4gYmFzZWQgb24gcGF0aFxuXHRcdFx0Ly9cblx0XHRcdC8vXHRcdHJldHVybiBkZWx0YTtcblx0XHRcdC8vXHR9XG5cdFx0XHQvL1x0Ly8gVE9ETzogYWRkIHByZWNvbmRpdGlvbiBtZXRob2Qgd2hpY2ggY2hlY2tzICdzb3VyY2UnIGRlbHRhc1xuXHRcdFx0Ly99KTtcblx0XHRcdC8vXG5cdFx0XHQvLy8qIGNvbXBvc2l0aW9uIC0gaW50cm9kdWNpbmcgJ0RlbHRhTW9kZWwnICovXG5cdFx0XHQvLy8vIHRvIGNvbXBvc2UgZGVsdGEgbW9kZWxzLCB3ZSBzaW1wbHkgaGF2ZSBvbmUgYXBwbHkgYWZ0ZXIgdGhlIG90aGVyXG5cdFx0XHQvLy8vIHdpdGhvdXQgYW55IGNvbXBvc2FiaWxpdHkgY2hlY2tzOyBpbiB0aGUgZnV0dXJlLCB0aGlzIG1heSBiZWNvbWUgbW9yZSBjbGV2ZXJcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbigoZDEsIGQyKSA9PiAoZDEgaW5zdGFuY2VvZiBEZWx0YU1vZGVsIHx8IGQyIGluc3RhbmNlb2YgRGVsdGFNb2RlbCksIChkMSwgZDIpID0+IHtcblx0XHRcdC8vXHR2YXIgcmVzdWx0ID0gbmV3IERlbHRhTW9kZWwoKTtcblx0XHRcdC8vXHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDEsIGQxKTtcblx0XHRcdC8vXHRyZXN1bHQuZ3JhcGguYWRkTmV3VmVydGV4KDIsIGQyKTtcblx0XHRcdC8vXHRyZXN1bHQuZ3JhcGguYWRkTmV3RWRnZSgxLCAyKTtcblx0XHRcdC8vXHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0Ly99KTtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0fVxuXG5cdH0pO1xuXG5cblx0LyogdGhlIFBhdGggY2xhc3MgKi9cblx0Ly8gVE9ETzogaW1wbGVtZW50IHRoYXQgdGhlIGAuKGluc3RhbmNlKS5gIG1lbWJlcnMgYXJlIGFjdHVhbGx5IGluY2x1ZGVkIGluIGluc3RhbmNlc1xuXHR2YXIgUGF0aCA9IERlbHRhSnMuUGF0aCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKHN0ciA9IFwiXCIpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHR2YXIgbWF0Y2ggPSBzdHIubWF0Y2goL14oWy4jXT8pKFxcdyp8XFwoXFx3K1xcKSkoLiopJC8pO1xuXHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3N0cn0nIGlzIG5vdCB3ZWxsIGZvcm1lZC5gKTtcblx0XHR2YXIgWywgbGVhZCwgcHJvcCwgcmVzdF0gPSBtYXRjaDtcblx0XHRpZiAobGVhZCA9PT0gJyMnKSB7XG5cdFx0XHQvLyBUaGUgIyBzZXBhcmF0b3IgaXMgdXNlZCBpbiB0aGUgSnNEb2Mgc2Vuc2UsIGFuZCBpcyB0cmFuc2xhdGVkIHRvICcuKGluc3RhbmNlKS4nXG5cdFx0XHR0aGlzLnNldChuZXcgUGF0aChgLihpbnN0YW5jZSkuJHtwcm9wfSR7cmVzdH1gKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHRcdFx0aWYgKHJlc3QgIT09ICcnKSB7XG5cdFx0XHRcdHRoaXMuX3Jlc3QgPSBuZXcgUGF0aChyZXN0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRzZXQob3RoZXIpIHtcblx0XHRcdHRoaXMuX3Byb3AgPSBvdGhlci5fcHJvcDtcblx0XHRcdHRoaXMuX3Jlc3QgPSBvdGhlci5fcmVzdDtcblx0XHR9LFxuXHRcdGdldCBwcm9wKCkgeyByZXR1cm4gdGhpcy5fcHJvcCB9LFxuXHRcdGdldCByZXN0KCkgeyByZXR1cm4gdGhpcy5fcmVzdCB9XG5cdH0pO1xuXG5cblx0LyogdGhlIFJlYWRhYmxlVGFyZ2V0IGNsYXNzICovXG5cdHZhciBSZWFkYWJsZVRhcmdldCA9IERlbHRhSnMuUmVhZGFibGVUYXJnZXQgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHRoaXMuX3ZhbCA9IHZhbHVlO1xuXHR9LCB7XG5cdFx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWwgfSxcblx0XHRnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmdldFZhbHVlKCkgfSxcblx0XHRzZXQgdmFsdWUodikgeyB0aGlzLnNldFZhbHVlKHYpIH0sXG5cdFx0Y2hhaW4ocHJvcCkge1xuXHRcdFx0VS5hc3NlcnQodGhpcy52YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRgVGhlIFJlYWRhYmxlVGFyZ2V0LnByb3RvdHlwZS5jaGFpbiBtZXRob2QgZXhwZWN0cyB0aGUgdGFyZ2V0IHZhbHVlIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0XHRcdHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQodGhpcy52YWx1ZSwgcHJvcCk7XG5cdFx0fVxuXHR9KTtcblx0Ly9mdW5jdGlvbiBydCh2YWx1ZSkgeyByZXR1cm4gbmV3IERlbHRhSnMuUmVhZGFibGVUYXJnZXQodmFsdWUpIH1cblxuXG5cdC8qIHRoZSBXcml0YWJsZVRhcmdldCBjbGFzcyAqL1xuXHR2YXIgV3JpdGFibGVUYXJnZXQgPSBEZWx0YUpzLldyaXRhYmxlVGFyZ2V0ID0gVS5uZXdTdWJjbGFzcyhSZWFkYWJsZVRhcmdldCwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcblx0XHR0aGlzLl9vYmogID0gb2JqO1xuXHRcdHRoaXMuX3Byb3AgPSBwcm9wO1xuXHR9LCB7XG5cdFx0Z2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfSxcblx0XHRzZXRWYWx1ZSh2KSB7IHRoaXMuX29ialt0aGlzLl9wcm9wXSA9IHYgfSxcblx0XHRkZWxldGUoKSB7IGRlbGV0ZSB0aGlzLl9vYmpbdGhpcy5fcHJvcF0gfVxuXHR9KTtcblx0ZnVuY3Rpb24gd3Qob2JqLCBwcm9wKSB7IHJldHVybiBuZXcgV3JpdGFibGVUYXJnZXQob2JqLCBwcm9wKSB9XG5cblxuXHQvKiBleHBvcnQgdGhlIG1haW4gY2xhc3MgKi9cblx0cmV0dXJuIERlbHRhSnM7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWx0YS5qc1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJKc0dyYXBoXCIsXCJjb21tb25qczJcIjpcImpzLWdyYXBoXCIsXCJjb21tb25qc1wiOlwianMtZ3JhcGhcIixcImFtZFwiOlwianMtZ3JhcGhcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoKCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yID0ge30sIHByb3RvdHlwZSA9IHt9KSB7XG5cblx0XHRcdC8qIGFsbG93IGZvciBubyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSBwYXNzZWQgKi9cblx0XHRcdGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0cHJvdG90eXBlID0gY29uc3RydWN0b3I7XG5cdFx0XHRcdGNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkge307XG5cdFx0XHR9XG5cblx0XHRcdC8qIGRlZmluZSB0aGUgY2xhc3MgKi9cblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblxuXHRcdH0sXG5cblx0XHQvKiBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZSAqL1xuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIgPSB7fSwgcHJvdG90eXBlID0ge30pIHtcblxuXHRcdFx0LyogYWxsb3cgZm9yIG5vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHBhc3NlZCAqL1xuXHRcdFx0aWYgKHR5cGVvZiBjb25zdHJ1Y3Rvck1ha2VyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yTWFrZXI7XG5cdFx0XHRcdGNvbnN0cnVjdG9yTWFrZXIgPSAoc3VwZXJGbikgPT4gZnVuY3Rpb24gKC4uLmFyZ3MpIHsgc3VwZXJGbi5hcHBseSh0aGlzLCBhcmdzKSB9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBkZWZpbmUgdGhlIHN1YmNsYXNzICovXG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjbHMucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cblx0XHR9LFxuXG5cdFx0LyogIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzICAgICAqL1xuXHRcdC8qICBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJucyAgKi9cblx0XHQvKiAgdGhlIGZpcnN0IHBhc3NlZCBvYmplY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8qIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZCB3aXRoIGFuIGFycmF5IG9mIGZvcm1hbCBwYXJhbWV0ZXJzICovXG5cdFx0YXBwbHlDb25zdHJ1Y3RvcihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG5cdFx0XHR2YXIgbmV3X29iaiA9IE9iamVjdC5jcmVhdGUoQ29uc3RydWN0b3JGbi5wcm90b3R5cGUpO1xuXHRcdFx0Q29uc3RydWN0b3JGbi5hcHBseShuZXdfb2JqLCBhcmdzKTtcblx0XHRcdHJldHVybiBuZXdfb2JqO1xuXHRcdH0sXG5cblx0XHQvKiBhIHNpbXBsZSBgYXNzZXJ0YCBmdW5jdGlvbiwgdG8gZXhwcmVzcyBhIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWUgKi9cblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGAgKi9cblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvKiB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKSAqL1xuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvKiByZXBlYXQgYSBzdHJpbmcgYSBnaXZlbiBudW1iZXIgb2YgdGltZXMgKi9cblx0XHRyZXBlYXQobnIsIHN0cikgeyByZXR1cm4gbmV3IEFycmF5KG5yKzEpLmpvaW4oc3RyKSB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9