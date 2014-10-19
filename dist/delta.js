(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["js-graph"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("js-graph")) : factory(root["JsGraph"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(JsGraph, P, U) {
	  'use strict';
	  var CoreDM = U.newClass(function() {
	    var _opTypes = {};
	    var _composeFns = [];
	    U.extend(this, {
	      _addOperationType: function($__3) {
	        var $__4 = $__3,
	            name = $__4.name,
	            constructor = $__4.constructor,
	            applyTo = $__4.applyTo,
	            prototype = $__4.prototype,
	            method = $__4.method;
	        var objectWithMethod = {};
	        _opTypes[name] = {
	          name: name,
	          Delta: constructor,
	          method: objectWithMethod[name]
	        };
	        U.extend(_opTypes[name].Delta.prototype, prototype, {
	          constructor: constructor,
	          type: name,
	          applyTo: applyTo,
	          compose: function(property, op2) {
	            var $__0 = this;
	            if (U.isUndefined(op2)) {
	              return this;
	            }
	            var foundComposeFn;
	            _composeFns.some((function($__4) {
	              var $__5 = $__4,
	                  op1Type = $__5.op1Type,
	                  op2Type = $__5.op2Type,
	                  composeFn = $__5.composeFn;
	              if ($__0.type === op1Type && op2.type === op2Type) {
	                foundComposeFn = composeFn;
	                return true;
	              }
	            }));
	            if (foundComposeFn) {
	              foundComposeFn(this, property, op2);
	            } else {
	              var err = new Error(("You cannot follow a '" + this.type + "' operation ") + ("with a '" + op2.type + "' operation on the same property."));
	              err.op1 = this.type;
	              err.op2 = op2.type;
	              throw err;
	            }
	          }
	        });
	        _opTypes['modify'].Delta.prototype[name] = U.isDefined(method) ? method : function(property) {
	          for (var values = [],
	              $__1 = 1; $__1 < arguments.length; $__1++)
	            values[$__1 - 1] = arguments[$__1];
	          this._addOperation(_opTypes[name], property, values);
	          return this;
	        };
	      },
	      _addOperationAlias: function($__3) {
	        var $__4 = $__3,
	            name = $__4.name,
	            target = $__4.target,
	            transform = $__4.transform;
	        var objectWithMethod = {};
	        Object.defineProperty(objectWithMethod, name, {value: function(property) {
	            for (var values = [],
	                $__1 = 1; $__1 < arguments.length; $__1++)
	              values[$__1 - 1] = arguments[$__1];
	            this._addOperation(_opTypes[target], property, transform(values));
	            return this;
	          }});
	        _opTypes[name] = {
	          name: name,
	          method: objectWithMethod[name]
	        };
	        _opTypes['modify'].Delta.prototype[name] = _opTypes[name].method;
	      },
	      _addCompositionRule: function(op1Type, op2Type, composeFn) {
	        _composeFns.push({
	          op1Type: op1Type,
	          op2Type: op2Type,
	          composeFn: composeFn
	        });
	      },
	      _newDelta: function(type) {
	        for (var values = [],
	            $__1 = 1; $__1 < arguments.length; $__1++)
	          values[$__1 - 1] = arguments[$__1];
	        return U.applyConstructor(_opTypes[type].Delta, values);
	      }
	    });
	    Object.defineProperty(this, 'Delta', {get: function() {
	        return _opTypes['modify'].Delta;
	      }});
	    var thisDM = this;
	    this._addOperationType({
	      name: 'modify',
	      constructor: function Modify(deltaDescription, operations) {
	        var $__0 = this;
	        deltaDescription = deltaDescription || {};
	        this.operations = operations || {};
	        Object.keys(deltaDescription).forEach((function(key) {
	          var match = key.match(/^(\w+)\s+([\w\.]+)$/);
	          if (match) {
	            var operation = match[1];
	            var property = match[2];
	            U.assert(operation in _opTypes, ("I don't know the '" + operation + "' operation."));
	            $__0[operation](property, deltaDescription[key]);
	          }
	        }));
	      },
	      applyTo: function(obj, property) {
	        var $__0 = this;
	        if (U.isDefined(property)) {
	          U.assert(U.isDefined(obj[property]), "The 'modify' operation expects the property to be already defined.");
	          Object.keys(this.operations).forEach((function(subProperty) {
	            $__0.operations[subProperty].applyTo(obj[property], subProperty);
	          }));
	        } else {
	          U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
	          Object.keys(this.operations).forEach((function(subProperty) {
	            $__0.operations[subProperty].applyTo(obj, subProperty);
	          }));
	        }
	      },
	      prototype: {
	        selectivelyApplyTo: function(obj, subProperty) {
	          U.assert(U.isDefined(obj), "The 'modify' operation expects the property to be already defined.");
	          if (U.isDefined(this.operations[subProperty])) {
	            this.operations[subProperty].applyTo(obj, subProperty);
	          }
	        },
	        _addOperation: function(opType, property, values) {
	          var dotIndex = property.indexOf('.');
	          if (dotIndex !== -1) {
	            var actualProperty = property.slice(0, dotIndex);
	            var restOfProperty = property.slice(dotIndex + 1);
	            var newModifyDelta = this._addOperation(_opTypes['modify'], actualProperty);
	            return newModifyDelta[opType.name].apply(newModifyDelta, [restOfProperty].concat(values));
	          } else {
	            var _newDelta = thisDM._newDelta.apply(thisDM, [opType.name].concat(values));
	            if (this.operations.hasOwnProperty(property) && U.isDefined(this.operations[property])) {
	              this.compose(property, _newDelta);
	            } else {
	              this.operations[property] = _newDelta;
	            }
	            return this.operations[property];
	          }
	        }
	      },
	      method: function(property, deltaDescription) {
	        return this._addOperation(_opTypes['modify'], property, [deltaDescription]);
	      }
	    });
	  });
	  var keepFirst = (function() {});
	  var keepSecond = (function(d1, p, d2) {
	    d1[p] = d2;
	  });
	  var applySecondToFirstValue = (function(d1, p, d2) {
	    d2.applyTo(d1[p], 'value');
	  });
	  function assertFunction(val, opType) {
	    U.assert(typeof val === 'function', ("The operation '" + opType + "' expects the property it acts on to be a function."));
	  }
	  function assertDefined(val, opType) {
	    U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	  }
	  function assertUndefined(val, opType) {
	    U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	  }
	  var ExtendedDM = U.newSubclass(CoreDM, function() {
	    var $__0 = this;
	    this._addOperationType({
	      name: 'add',
	      constructor: function Add(value) {
	        this.value = value;
	      },
	      applyTo: function(obj, property) {
	        assertUndefined(obj[property], 'add');
	        obj[property] = this.value;
	      }
	    });
	    this._addOperationType({
	      name: 'replace',
	      constructor: function Replace(value) {
	        this.value = value;
	      },
	      applyTo: function(obj, property) {
	        assertDefined(obj[property], 'replace');
	        obj[property] = this.value;
	      }
	    });
	    this._addOperationType({
	      name: 'remove',
	      constructor: function Remove() {},
	      applyTo: function(obj, property) {
	        assertDefined(obj[property], 'remove');
	        delete obj[property];
	      }
	    });
	    this._addOperationType({
	      name: 'forbid',
	      constructor: function Forbid() {},
	      applyTo: function(obj, property) {
	        assertUndefined(obj[property], 'forbid');
	      }
	    });
	    this._addCompositionRule('add', 'replace', (function(d1, p, d2) {
	      d1[p] = CoreDM._newDelta('add', d2.value);
	    }));
	    this._addCompositionRule('add', 'modify', applySecondToFirstValue);
	    this._addCompositionRule('add', 'remove', (function(d1, p) {
	      d1[p] = CoreDM._newDelta('forbid');
	    }));
	    this._addCompositionRule('replace', 'replace', keepSecond);
	    this._addCompositionRule('replace', 'modify', applySecondToFirstValue);
	    this._addCompositionRule('replace', 'remove', keepSecond);
	    this._addCompositionRule('modify', 'replace', keepSecond);
	    this._addCompositionRule('modify', 'modify', (function(d1, p, d2) {
	      Object.keys(d2.operations).forEach((function(prop) {
	        d1.compose(prop, d2.operations[prop]);
	      }));
	    }));
	    this._addCompositionRule('modify', 'remove', keepSecond);
	    this._addCompositionRule('remove', 'add', (function(d1, p, d2) {
	      d1[p] = CoreDM._newDelta('replace', d2.value);
	    }));
	    this._addCompositionRule('remove', 'forbid', keepFirst);
	    this._addCompositionRule('forbid', 'add', keepSecond);
	    this._addCompositionRule('forbid', 'forbid', keepFirst);
	    this._addOperationType({
	      name: 'alter',
	      constructor: function Alter(value, alias) {
	        this.value = value || [];
	        this.alias = alias || 'alter';
	      },
	      applyTo: function(obj, property) {
	        assertFunction(obj[property], this.alias);
	        this.value.forEach((function(subOp) {
	          var partOne = obj[property];
	          var partTwo = subOp.value;
	          if (subOp.type === 'prepend') {
	            obj[property] = function() {
	              for (var args = [],
	                  $__1 = 0; $__1 < arguments.length; $__1++)
	                args[$__1] = arguments[$__1];
	              partTwo.apply(this, args);
	              partOne.apply(this, args);
	            };
	          } else {
	            obj[property] = function() {
	              for (var args = [],
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              partOne.apply(this, args);
	              partTwo.apply(this, args);
	            };
	          }
	        }));
	      }
	    });
	    this._addCompositionRule('alter', 'alter', (function(d1, p, d2) {
	      [].push.apply(d1[p].value, d2.value);
	    }));
	    this._addCompositionRule('alter', 'replace', keepSecond);
	    this._addCompositionRule('alter', 'remove', (function(d1, p) {
	      d1[p] = CoreDM._newDelta('forbid');
	    }));
	    this._addCompositionRule('add', 'alter', (function(d1, p, d2) {
	      assertFunction(d1[p].value, d2.alias);
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'alter', (function(d1, p, d2) {
	      assertFunction(d1[p].value, d2.alias);
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    ['prepend', 'insert', 'append'].forEach((function(opType) {
	      $__0._addOperationAlias({
	        name: opType,
	        target: 'alter',
	        transform: (function(args) {
	          return [[{
	            type: opType,
	            value: args[0]
	          }], opType];
	        })
	      });
	    }));
	    this._addOperationType({
	      name: 'after',
	      constructor: function After(value) {
	        this.value = value;
	      },
	      applyTo: function(obj, property) {
	        assertFunction(obj[property], 'after');
	        var partOne = obj[property];
	        var partTwo = this.value;
	        obj[property] = function() {
	          for (var args = [],
	              $__1 = 0; $__1 < arguments.length; $__1++)
	            args[$__1] = arguments[$__1];
	          return P.resolve(partOne.apply(this, args)).then(function() {
	            return partTwo.apply(this, args);
	          }.bind(this));
	        };
	      }
	    });
	    this._addCompositionRule('after', 'replace', keepSecond);
	    this._addCompositionRule('after', 'remove', keepSecond);
	    this._addCompositionRule('add', 'after', (function(d1, p, d2) {
	      assertFunction(d1[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'after', (function(d1, p, d2) {
	      assertFunction(d1[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('insert', 'after', applySecondToFirstValue);
	    this._addCompositionRule('after', 'insert', applySecondToFirstValue);
	  });
	  var PartiallyOrderedDM = U.newSubclass(ExtendedDM, function() {
	    var _graph = new JsGraph();
	    U.extend(this, {graph: function() {
	        return _graph;
	      }});
	    var _deltaConditions = {};
	    var _settledDeltaConditions = {};
	    var _conditionsUnsettled = false;
	    function _registerDisjunct(id, disjunct) {
	      if (disjunct === true) {
	        _settledDeltaConditions[id] = true;
	      } else if (_deltaConditions[id] !== true) {
	        U.array(_deltaConditions, 'id').push(disjunct);
	      }
	    }
	    function _settleConditions() {
	      if (_conditionsUnsettled) {
	        _conditionsUnsettled = false;
	        var somethingChanged;
	        do {
	          somethingChanged = false;
	          _graph.eachVertex((function(id) {
	            if (_settledDeltaConditions[id]) {
	              return;
	            }
	            if (U.isUndefined(_deltaConditions[id])) {
	              return;
	            }
	            if (_deltaConditions[id].some((function(disjunct) {
	              return disjunct.every((function(conjunct) {
	                return _settledDeltaConditions[conjunct];
	              }));
	            }))) {
	              _settledDeltaConditions[id] = true;
	              somethingChanged = true;
	            }
	          }));
	        } while (somethingChanged);
	      }
	    }
	    U.extend(this, {
	      register: function(config) {
	        U.assert(config instanceof Object, "A delta should be given as an object.");
	        U.assert(typeof config.id === 'string', "A delta should have a unique 'id'.");
	        if (config.resolves && config.resolves.length > 0) {
	          config.manuallySelectable = false;
	        }
	        [['manuallySelectable', true], ['onlyIf', []], ['after', []], ['selects', []], ['expects', []], ['requires', []]].forEach((function(prop, def) {
	          if (U.isUndefined(config[prop])) {
	            config[prop] = def;
	          }
	        }));
	        var delta = new this.Delta();
	        Object.defineProperties(delta, {
	          id: {get: function() {
	              return config.id;
	            }},
	          manuallySelectable: {get: function() {
	              return !!config.manuallySelectable;
	            }},
	          selected: {get: function() {
	              _settleConditions();
	              return !!_settledDeltaConditions[config.id];
	            }},
	          if: {get: function() {
	              if (config.if === true) {
	                return true;
	              } else if (config.if || config.iff || config.resolves) {
	                return [].concat(config.if || [], config.iff || [], config.resolves || []);
	              } else {
	                return undefined;
	              }
	            }},
	          onlyIf: {get: function() {
	              return [].concat(config.onlyIf || [], config.iff || [], config.expects || [], config.resolves || []);
	            }},
	          after: {get: function() {
	              return [].concat(config.after || [], config.expects || [], config.resolves || [], config.requires || []);
	            }},
	          selects: {get: function() {
	              return [].concat(config.selects || [], config.requires || []);
	            }}
	        });
	        _conditionsUnsettled = true;
	        _registerDisjunct(delta.id, delta.if);
	        delta.selects.forEach((function(id) {
	          _registerDisjunct(id, [delta.id]);
	        }));
	        _graph.addVertex(delta.id, delta);
	        delta.after.forEach((function(id) {
	          _graph.createEdge(id, delta.id);
	        }));
	        U.assert(!_graph.hasCycle(), ("The delta " + delta.id + " introduced a cycle in the application order."));
	        return delta;
	      },
	      select: function() {
	        for (var ids = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          ids[$__1] = arguments[$__1];
	        ids.forEach((function(id) {
	          _registerDisjunct(id, true);
	        }));
	      },
	      vp: function(name, val) {
	        var obj = {};
	        obj[name] = val;
	        _graph.eachVertex((function(id, delta) {
	          U.assert(!delta.selected || delta.onlyIf.every((function(d) {
	            return d.selected;
	          })), ("The 'onlyIf' condition of delta '" + delta.id + "' was violated."));
	        }));
	        _graph.topologically((function(id, delta) {
	          delta.selectivelyApplyTo(obj, name);
	        }));
	        return obj[name];
	      }
	    });
	  });
	  return PartiallyOrderedDM;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


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
	    newClass: function(constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        constructor.apply(this, args);
	      };
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass, constructor, prototype) {
	      prototype = prototype || {};
	      var cls = function() {
	        for (var args = [],
	            $__0 = 0; $__0 < arguments.length; $__0++)
	          args[$__0] = arguments[$__0];
	        superClass.prototype.constructor.apply(this, args);
	        constructor.apply(this, args);
	      };
	      cls.prototype = Object.create(superClass.prototype, prototype);
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
	            obj1[key] = obj[key];
	          }
	        }
	      }));
	      return obj1;
	    },
	    array: function(obj, name) {
	      if (U.isUndefined(obj[name])) {
	        obj[name] = [];
	      }
	      return obj[name];
	    },
	    bindA: function(fn, ctx, args) {
	      return fn.bind.apply(fn, [ctx].concat(args));
	    },
	    bind: function(obj, m) {
	      for (var args = [],
	          $__1 = 2; $__1 < arguments.length; $__1++)
	        args[$__1 - 2] = arguments[$__1];
	      return U.bindA(obj[m], obj, args);
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	      return new NewConstructorFn();
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
	    }
	  };
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var Promise = __webpack_require__(4)();
	module.exports = Promise;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict(bluebird) {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	module.exports = function() {
	var util = __webpack_require__(5);
	var async = __webpack_require__(6);
	var errors = __webpack_require__(7);
	
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {e: null};
	
	var cast = __webpack_require__(8)(Promise, INTERNAL);
	var PromiseArray = __webpack_require__(9)(Promise, INTERNAL, cast);
	var CapturedTrace = __webpack_require__(10)();
	var CatchFilter = __webpack_require__(11)(NEXT_FILTER);
	var PromiseResolver = __webpack_require__(12);
	
	var isArray = util.isArray;
	
	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var tryCatch2 = util.tryCatch2;
	var tryCatchApply = util.tryCatchApply;
	var RangeError = errors.RangeError;
	var TypeError = errors.TypeError;
	var CancellationError = errors.CancellationError;
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var originatesFromRejection = errors.originatesFromRejection;
	var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
	var canAttach = errors.canAttach;
	var thrower = util.thrower;
	var apiRejection = __webpack_require__(13)(Promise);
	
	
	var makeSelfResolutionError = function Promise$_makeSelfResolutionError() {
	    return new TypeError("circular promise resolution chain");
	};
	
	function Promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("the promise constructor requires a resolver function");
	    }
	    if (this.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly");
	    }
	    this._bitField = 0;
	    this._fulfillmentHandler0 = void 0;
	    this._rejectionHandler0 = void 0;
	    this._promise0 = void 0;
	    this._receiver0 = void 0;
	    this._settledValue = void 0;
	    this._boundTo = void 0;
	    if (resolver !== INTERNAL) this._resolveFromResolver(resolver);
	}
	
	function returnFirstElement(elements) {
	    return elements[0];
	}
	
	Promise.prototype.bind = function Promise$bind(thisArg) {
	    var maybePromise = cast(thisArg, void 0);
	    var ret = new Promise(INTERNAL);
	    if (maybePromise instanceof Promise) {
	        var binder = maybePromise.then(function(thisArg) {
	            ret._setBoundTo(thisArg);
	        });
	        var p = Promise.all([this, binder]).then(returnFirstElement);
	        ret._follow(p);
	    } else {
	        ret._follow(this);
	        ret._setBoundTo(thisArg);
	    }
	    ret._propagateFrom(this, 2 | 1);
	    return ret;
	};
	
	Promise.prototype.toString = function Promise$toString() {
	    return "[object Promise]";
	};
	
	Promise.prototype.caught = Promise.prototype["catch"] =
	function Promise$catch(fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (typeof item === "function") {
	                catchInstances[j++] = item;
	            } else {
	                var catchFilterTypeError =
	                    new TypeError(
	                        "A catch filter must be an error constructor "
	                        + "or a filter function");
	
	                this._attachExtraTrace(catchFilterTypeError);
	                return Promise.reject(catchFilterTypeError);
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];
	
	        this._resetTrace();
	        var catchFilter = new CatchFilter(catchInstances, fn, this);
	        return this._then(void 0, catchFilter.doFilter, void 0,
	            catchFilter, void 0);
	    }
	    return this._then(void 0, fn, void 0, void 0, void 0);
	};
	
	function reflect() {
	    return new Promise.PromiseInspection(this);
	}
	
	Promise.prototype.reflect = function Promise$reflect() {
	    return this._then(reflect, reflect, void 0, this, void 0);
	};
	
	Promise.prototype.then =
	function Promise$then(didFulfill, didReject, didProgress) {
	    return this._then(didFulfill, didReject, didProgress,
	        void 0, void 0);
	};
	
	
	Promise.prototype.done =
	function Promise$done(didFulfill, didReject, didProgress) {
	    var promise = this._then(didFulfill, didReject, didProgress,
	        void 0, void 0);
	    promise._setIsFinal();
	};
	
	Promise.prototype.spread = function Promise$spread(didFulfill, didReject) {
	    return this._then(didFulfill, didReject, void 0,
	        APPLY, void 0);
	};
	
	Promise.prototype.isCancellable = function Promise$isCancellable() {
	    return !this.isResolved() &&
	        this._cancellable();
	};
	
	Promise.prototype.toJSON = function Promise$toJSON() {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: void 0,
	        rejectionReason: void 0
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this._settledValue;
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this._settledValue;
	        ret.isRejected = true;
	    }
	    return ret;
	};
	
	Promise.prototype.all = function Promise$all() {
	    return new PromiseArray(this).promise();
	};
	
	
	Promise.is = function Promise$Is(val) {
	    return val instanceof Promise;
	};
	
	Promise.all = function Promise$All(promises) {
	    return new PromiseArray(promises).promise();
	};
	
	Promise.prototype.error = function Promise$_error(fn) {
	    return this.caught(originatesFromRejection, fn);
	};
	
	Promise.prototype._resolveFromSyncValue =
	function Promise$_resolveFromSyncValue(value) {
	    if (value === errorObj) {
	        this._cleanValues();
	        this._setRejected();
	        this._settledValue = value.e;
	        this._ensurePossibleRejectionHandled();
	    } else {
	        var maybePromise = cast(value, void 0);
	        if (maybePromise instanceof Promise) {
	            this._follow(maybePromise);
	        } else {
	            this._cleanValues();
	            this._setFulfilled();
	            this._settledValue = value;
	        }
	    }
	};
	
	Promise.method = function Promise$_Method(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function");
	    }
	    return function Promise$_method() {
	        var value;
	        switch(arguments.length) {
	        case 0: value = tryCatch1(fn, this, void 0); break;
	        case 1: value = tryCatch1(fn, this, arguments[0]); break;
	        case 2: value = tryCatch2(fn, this, arguments[0], arguments[1]); break;
	        default:
	            var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	            value = tryCatchApply(fn, args, this); break;
	        }
	        var ret = new Promise(INTERNAL);
	        ret._setTrace(void 0);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};
	
	Promise.attempt = Promise["try"] = function Promise$_Try(fn, args, ctx) {
	    if (typeof fn !== "function") {
	        return apiRejection("fn must be a function");
	    }
	    var value = isArray(args)
	        ? tryCatchApply(fn, args, ctx)
	        : tryCatch1(fn, ctx, args);
	
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};
	
	Promise.defer = Promise.pending = function Promise$Defer() {
	    var promise = new Promise(INTERNAL);
	    promise._setTrace(void 0);
	    return new PromiseResolver(promise);
	};
	
	Promise.bind = function Promise$Bind(thisArg) {
	    var maybePromise = cast(thisArg, void 0);
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	
	    if (maybePromise instanceof Promise) {
	        var p = maybePromise.then(function(thisArg) {
	            ret._setBoundTo(thisArg);
	        });
	        ret._follow(p);
	    } else {
	        ret._setBoundTo(thisArg);
	        ret._setFulfilled();
	    }
	    return ret;
	};
	
	Promise.cast = function Promise$_Cast(obj) {
	    var ret = cast(obj, void 0);
	    if (!(ret instanceof Promise)) {
	        var val = ret;
	        ret = new Promise(INTERNAL);
	        ret._setTrace(void 0);
	        ret._setFulfilled();
	        ret._cleanValues();
	        ret._settledValue = val;
	    }
	    return ret;
	};
	
	Promise.resolve = Promise.fulfilled = Promise.cast;
	
	Promise.reject = Promise.rejected = function Promise$Reject(reason) {
	    var ret = new Promise(INTERNAL);
	    ret._setTrace(void 0);
	    markAsOriginatingFromRejection(reason);
	    ret._cleanValues();
	    ret._setRejected();
	    ret._settledValue = reason;
	    if (!canAttach(reason)) {
	        var trace = new Error(reason + "");
	        ret._setCarriedStackTrace(trace);
	    }
	    ret._ensurePossibleRejectionHandled();
	    return ret;
	};
	
	Promise.onPossiblyUnhandledRejection =
	function Promise$OnPossiblyUnhandledRejection(fn) {
	        CapturedTrace.possiblyUnhandledRejection = typeof fn === "function"
	                                                    ? fn : void 0;
	};
	
	var unhandledRejectionHandled;
	Promise.onUnhandledRejectionHandled =
	function Promise$onUnhandledRejectionHandled(fn) {
	    unhandledRejectionHandled = typeof fn === "function" ? fn : void 0;
	};
	
	var debugging = false || !!(
	    typeof process !== "undefined" &&
	    typeof process.execPath === "string" &&
	    typeof process.env === "object" &&
	    (process.env["BLUEBIRD_DEBUG"] ||
	        process.env["NODE_ENV"] === "development")
	);
	
	
	Promise.longStackTraces = function Promise$LongStackTraces() {
	    if (async.haveItemsQueued() &&
	        debugging === false
	   ) {
	        throw new Error("cannot enable long stack traces after promises have been created");
	    }
	    debugging = CapturedTrace.isSupported();
	};
	
	Promise.hasLongStackTraces = function Promise$HasLongStackTraces() {
	    return debugging && CapturedTrace.isSupported();
	};
	
	Promise.prototype._then =
	function Promise$_then(
	    didFulfill,
	    didReject,
	    didProgress,
	    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== void 0;
	    var ret = haveInternalData ? internalData : new Promise(INTERNAL);
	
	    if (!haveInternalData) {
	        if (debugging) {
	            var haveSameContext = this._peekContext() === this._traceParent;
	            ret._traceParent = haveSameContext ? this._traceParent : this;
	        }
	        ret._propagateFrom(this, 7);
	    }
	
	    var callbackIndex =
	        this._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);
	
	    if (this.isResolved()) {
	        async.invoke(this._queueSettleAt, this, callbackIndex);
	    }
	
	    return ret;
	};
	
	Promise.prototype._length = function Promise$_length() {
	    return this._bitField & 262143;
	};
	
	Promise.prototype._isFollowingOrFulfilledOrRejected =
	function Promise$_isFollowingOrFulfilledOrRejected() {
	    return (this._bitField & 939524096) > 0;
	};
	
	Promise.prototype._isFollowing = function Promise$_isFollowing() {
	    return (this._bitField & 536870912) === 536870912;
	};
	
	Promise.prototype._setLength = function Promise$_setLength(len) {
	    this._bitField = (this._bitField & -262144) |
	        (len & 262143);
	};
	
	Promise.prototype._setFulfilled = function Promise$_setFulfilled() {
	    this._bitField = this._bitField | 268435456;
	};
	
	Promise.prototype._setRejected = function Promise$_setRejected() {
	    this._bitField = this._bitField | 134217728;
	};
	
	Promise.prototype._setFollowing = function Promise$_setFollowing() {
	    this._bitField = this._bitField | 536870912;
	};
	
	Promise.prototype._setIsFinal = function Promise$_setIsFinal() {
	    this._bitField = this._bitField | 33554432;
	};
	
	Promise.prototype._isFinal = function Promise$_isFinal() {
	    return (this._bitField & 33554432) > 0;
	};
	
	Promise.prototype._cancellable = function Promise$_cancellable() {
	    return (this._bitField & 67108864) > 0;
	};
	
	Promise.prototype._setCancellable = function Promise$_setCancellable() {
	    this._bitField = this._bitField | 67108864;
	};
	
	Promise.prototype._unsetCancellable = function Promise$_unsetCancellable() {
	    this._bitField = this._bitField & (~67108864);
	};
	
	Promise.prototype._setRejectionIsUnhandled =
	function Promise$_setRejectionIsUnhandled() {
	    this._bitField = this._bitField | 2097152;
	};
	
	Promise.prototype._unsetRejectionIsUnhandled =
	function Promise$_unsetRejectionIsUnhandled() {
	    this._bitField = this._bitField & (~2097152);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};
	
	Promise.prototype._isRejectionUnhandled =
	function Promise$_isRejectionUnhandled() {
	    return (this._bitField & 2097152) > 0;
	};
	
	Promise.prototype._setUnhandledRejectionIsNotified =
	function Promise$_setUnhandledRejectionIsNotified() {
	    this._bitField = this._bitField | 524288;
	};
	
	Promise.prototype._unsetUnhandledRejectionIsNotified =
	function Promise$_unsetUnhandledRejectionIsNotified() {
	    this._bitField = this._bitField & (~524288);
	};
	
	Promise.prototype._isUnhandledRejectionNotified =
	function Promise$_isUnhandledRejectionNotified() {
	    return (this._bitField & 524288) > 0;
	};
	
	Promise.prototype._setCarriedStackTrace =
	function Promise$_setCarriedStackTrace(capturedTrace) {
	    this._bitField = this._bitField | 1048576;
	    this._fulfillmentHandler0 = capturedTrace;
	};
	
	Promise.prototype._unsetCarriedStackTrace =
	function Promise$_unsetCarriedStackTrace() {
	    this._bitField = this._bitField & (~1048576);
	    this._fulfillmentHandler0 = void 0;
	};
	
	Promise.prototype._isCarryingStackTrace =
	function Promise$_isCarryingStackTrace() {
	    return (this._bitField & 1048576) > 0;
	};
	
	Promise.prototype._getCarriedStackTrace =
	function Promise$_getCarriedStackTrace() {
	    return this._isCarryingStackTrace()
	        ? this._fulfillmentHandler0
	        : void 0;
	};
	
	Promise.prototype._receiverAt = function Promise$_receiverAt(index) {
	    var ret = index === 0
	        ? this._receiver0
	        : this[(index << 2) + index - 5 + 4];
	    if (this._isBound() && ret === void 0) {
	        return this._boundTo;
	    }
	    return ret;
	};
	
	Promise.prototype._promiseAt = function Promise$_promiseAt(index) {
	    return index === 0
	        ? this._promise0
	        : this[(index << 2) + index - 5 + 3];
	};
	
	Promise.prototype._fulfillmentHandlerAt =
	function Promise$_fulfillmentHandlerAt(index) {
	    return index === 0
	        ? this._fulfillmentHandler0
	        : this[(index << 2) + index - 5 + 0];
	};
	
	Promise.prototype._rejectionHandlerAt =
	function Promise$_rejectionHandlerAt(index) {
	    return index === 0
	        ? this._rejectionHandler0
	        : this[(index << 2) + index - 5 + 1];
	};
	
	Promise.prototype._addCallbacks = function Promise$_addCallbacks(
	    fulfill,
	    reject,
	    progress,
	    promise,
	    receiver
	) {
	    var index = this._length();
	
	    if (index >= 262143 - 5) {
	        index = 0;
	        this._setLength(0);
	    }
	
	    if (index === 0) {
	        this._promise0 = promise;
	        if (receiver !== void 0) this._receiver0 = receiver;
	        if (typeof fulfill === "function" && !this._isCarryingStackTrace())
	            this._fulfillmentHandler0 = fulfill;
	        if (typeof reject === "function") this._rejectionHandler0 = reject;
	        if (typeof progress === "function") this._progressHandler0 = progress;
	    } else {
	        var base = (index << 2) + index - 5;
	        this[base + 3] = promise;
	        this[base + 4] = receiver;
	        this[base + 0] = typeof fulfill === "function"
	                                            ? fulfill : void 0;
	        this[base + 1] = typeof reject === "function"
	                                            ? reject : void 0;
	        this[base + 2] = typeof progress === "function"
	                                            ? progress : void 0;
	    }
	    this._setLength(index + 1);
	    return index;
	};
	
	Promise.prototype._setProxyHandlers =
	function Promise$_setProxyHandlers(receiver, promiseSlotValue) {
	    var index = this._length();
	
	    if (index >= 262143 - 5) {
	        index = 0;
	        this._setLength(0);
	    }
	    if (index === 0) {
	        this._promise0 = promiseSlotValue;
	        this._receiver0 = receiver;
	    } else {
	        var base = (index << 2) + index - 5;
	        this[base + 3] = promiseSlotValue;
	        this[base + 4] = receiver;
	        this[base + 0] =
	        this[base + 1] =
	        this[base + 2] = void 0;
	    }
	    this._setLength(index + 1);
	};
	
	Promise.prototype._proxyPromiseArray =
	function Promise$_proxyPromiseArray(promiseArray, index) {
	    this._setProxyHandlers(promiseArray, index);
	};
	
	Promise.prototype._proxyPromise = function Promise$_proxyPromise(promise) {
	    promise._setProxied();
	    this._setProxyHandlers(promise, -15);
	};
	
	Promise.prototype._setBoundTo = function Promise$_setBoundTo(obj) {
	    if (obj !== void 0) {
	        this._bitField = this._bitField | 8388608;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~8388608);
	    }
	};
	
	Promise.prototype._isBound = function Promise$_isBound() {
	    return (this._bitField & 8388608) === 8388608;
	};
	
	Promise.prototype._resolveFromResolver =
	function Promise$_resolveFromResolver(resolver) {
	    var promise = this;
	    this._setTrace(void 0);
	    this._pushContext();
	
	    function Promise$_resolver(val) {
	        if (promise._tryFollow(val)) {
	            return;
	        }
	        promise._fulfill(val);
	    }
	    function Promise$_rejecter(val) {
	        var trace = canAttach(val) ? val : new Error(val + "");
	        promise._attachExtraTrace(trace);
	        markAsOriginatingFromRejection(val);
	        promise._reject(val, trace === val ? void 0 : trace);
	    }
	    var r = tryCatch2(resolver, void 0, Promise$_resolver, Promise$_rejecter);
	    this._popContext();
	
	    if (r !== void 0 && r === errorObj) {
	        var e = r.e;
	        var trace = canAttach(e) ? e : new Error(e + "");
	        promise._reject(e, trace);
	    }
	};
	
	Promise.prototype._spreadSlowCase =
	function Promise$_spreadSlowCase(targetFn, promise, values, boundTo) {
	    var promiseForAll = new PromiseArray(values).promise();
	    var promise2 = promiseForAll._then(function() {
	        return targetFn.apply(boundTo, arguments);
	    }, void 0, void 0, APPLY, void 0);
	    promise._follow(promise2);
	};
	
	Promise.prototype._callSpread =
	function Promise$_callSpread(handler, promise, value) {
	    var boundTo = this._boundTo;
	    if (isArray(value)) {
	        for (var i = 0, len = value.length; i < len; ++i) {
	            if (cast(value[i], void 0) instanceof Promise) {
	                this._spreadSlowCase(handler, promise, value, boundTo);
	                return;
	            }
	        }
	    }
	    promise._pushContext();
	    return tryCatchApply(handler, value, boundTo);
	};
	
	Promise.prototype._callHandler =
	function Promise$_callHandler(
	    handler, receiver, promise, value) {
	    var x;
	    if (receiver === APPLY && !this.isRejected()) {
	        x = this._callSpread(handler, promise, value);
	    } else {
	        promise._pushContext();
	        x = tryCatch1(handler, receiver, value);
	    }
	    promise._popContext();
	    return x;
	};
	
	Promise.prototype._settlePromiseFromHandler =
	function Promise$_settlePromiseFromHandler(
	    handler, receiver, value, promise
	) {
	    if (!(promise instanceof Promise)) {
	        handler.call(receiver, value, promise);
	        return;
	    }
	    var x = this._callHandler(handler, receiver, promise, value);
	    if (promise._isFollowing()) return;
	
	    if (x === errorObj || x === promise || x === NEXT_FILTER) {
	        var err = x === promise
	                    ? makeSelfResolutionError()
	                    : x.e;
	        var trace = canAttach(err) ? err : new Error(err + "");
	        if (x !== NEXT_FILTER) promise._attachExtraTrace(trace);
	        promise._rejectUnchecked(err, trace);
	    } else {
	        var castValue = cast(x, promise);
	        if (castValue instanceof Promise) {
	            if (castValue.isRejected() &&
	                !castValue._isCarryingStackTrace() &&
	                !canAttach(castValue._settledValue)) {
	                var trace = new Error(castValue._settledValue + "");
	                promise._attachExtraTrace(trace);
	                castValue._setCarriedStackTrace(trace);
	            }
	            promise._follow(castValue);
	            promise._propagateFrom(castValue, 1);
	        } else {
	            promise._fulfillUnchecked(x);
	        }
	    }
	};
	
	Promise.prototype._follow =
	function Promise$_follow(promise) {
	    this._setFollowing();
	
	    if (promise.isPending()) {
	        this._propagateFrom(promise, 1);
	        promise._proxyPromise(this);
	    } else if (promise.isFulfilled()) {
	        this._fulfillUnchecked(promise._settledValue);
	    } else {
	        this._rejectUnchecked(promise._settledValue,
	            promise._getCarriedStackTrace());
	    }
	
	    if (promise._isRejectionUnhandled()) promise._unsetRejectionIsUnhandled();
	
	    if (debugging &&
	        promise._traceParent == null) {
	        promise._traceParent = this;
	    }
	};
	
	Promise.prototype._tryFollow =
	function Promise$_tryFollow(value) {
	    if (this._isFollowingOrFulfilledOrRejected() ||
	        value === this) {
	        return false;
	    }
	    var maybePromise = cast(value, void 0);
	    if (!(maybePromise instanceof Promise)) {
	        return false;
	    }
	    this._follow(maybePromise);
	    return true;
	};
	
	Promise.prototype._resetTrace = function Promise$_resetTrace() {
	    if (debugging) {
	        this._trace = new CapturedTrace(this._peekContext() === void 0);
	    }
	};
	
	Promise.prototype._setTrace = function Promise$_setTrace(parent) {
	    if (debugging) {
	        var context = this._peekContext();
	        this._traceParent = context;
	        var isTopLevel = context === void 0;
	        if (parent !== void 0 &&
	            parent._traceParent === context) {
	            this._trace = parent._trace;
	        } else {
	            this._trace = new CapturedTrace(isTopLevel);
	        }
	    }
	    return this;
	};
	
	Promise.prototype._attachExtraTrace =
	function Promise$_attachExtraTrace(error) {
	    if (debugging) {
	        var promise = this;
	        var stack = error.stack;
	        stack = typeof stack === "string" ? stack.split("\n") : [];
	        CapturedTrace.protectErrorMessageNewlines(stack);
	        var headerLineCount = 1;
	        var combinedTraces = 1;
	        while(promise != null &&
	            promise._trace != null) {
	            stack = CapturedTrace.combine(
	                stack,
	                promise._trace.stack.split("\n")
	            );
	            promise = promise._traceParent;
	            combinedTraces++;
	        }
	
	        var stackTraceLimit = Error.stackTraceLimit || 10;
	        var max = (stackTraceLimit + headerLineCount) * combinedTraces;
	        var len = stack.length;
	        if (len > max) {
	            stack.length = max;
	        }
	
	        if (len > 0)
	            stack[0] = stack[0].split("\u0002\u0000\u0001").join("\n");
	
	        if (stack.length <= headerLineCount) {
	            error.stack = "(No stack trace)";
	        } else {
	            error.stack = stack.join("\n");
	        }
	    }
	};
	
	Promise.prototype._cleanValues = function Promise$_cleanValues() {
	    if (this._cancellable()) {
	        this._cancellationParent = void 0;
	    }
	};
	
	Promise.prototype._propagateFrom =
	function Promise$_propagateFrom(parent, flags) {
	    if ((flags & 1) > 0 && parent._cancellable()) {
	        this._setCancellable();
	        this._cancellationParent = parent;
	    }
	    if ((flags & 4) > 0) {
	        this._setBoundTo(parent._boundTo);
	    }
	    if ((flags & 2) > 0) {
	        this._setTrace(parent);
	    }
	};
	
	Promise.prototype._fulfill = function Promise$_fulfill(value) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._fulfillUnchecked(value);
	};
	
	Promise.prototype._reject =
	function Promise$_reject(reason, carriedStackTrace) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._rejectUnchecked(reason, carriedStackTrace);
	};
	
	Promise.prototype._settlePromiseAt = function Promise$_settlePromiseAt(index) {
	    var handler = this.isFulfilled()
	        ? this._fulfillmentHandlerAt(index)
	        : this._rejectionHandlerAt(index);
	
	    var value = this._settledValue;
	    var receiver = this._receiverAt(index);
	    var promise = this._promiseAt(index);
	
	    if (typeof handler === "function") {
	        this._settlePromiseFromHandler(handler, receiver, value, promise);
	    } else {
	        var done = false;
	        var isFulfilled = this.isFulfilled();
	        if (receiver !== void 0) {
	            if (receiver instanceof Promise &&
	                receiver._isProxied()) {
	                receiver._unsetProxied();
	
	                if (isFulfilled) receiver._fulfillUnchecked(value);
	                else receiver._rejectUnchecked(value,
	                    this._getCarriedStackTrace());
	                done = true;
	            } else if (receiver instanceof PromiseArray) {
	                if (isFulfilled) receiver._promiseFulfilled(value, promise);
	                else receiver._promiseRejected(value, promise);
	                done = true;
	            }
	        }
	
	        if (!done) {
	            if (isFulfilled) promise._fulfill(value);
	            else promise._reject(value, this._getCarriedStackTrace());
	        }
	    }
	
	    if (index >= 4) {
	        this._queueGC();
	    }
	};
	
	Promise.prototype._isProxied = function Promise$_isProxied() {
	    return (this._bitField & 4194304) === 4194304;
	};
	
	Promise.prototype._setProxied = function Promise$_setProxied() {
	    this._bitField = this._bitField | 4194304;
	};
	
	Promise.prototype._unsetProxied = function Promise$_unsetProxied() {
	    this._bitField = this._bitField & (~4194304);
	};
	
	Promise.prototype._isGcQueued = function Promise$_isGcQueued() {
	    return (this._bitField & -1073741824) === -1073741824;
	};
	
	Promise.prototype._setGcQueued = function Promise$_setGcQueued() {
	    this._bitField = this._bitField | -1073741824;
	};
	
	Promise.prototype._unsetGcQueued = function Promise$_unsetGcQueued() {
	    this._bitField = this._bitField & (~-1073741824);
	};
	
	Promise.prototype._queueGC = function Promise$_queueGC() {
	    if (this._isGcQueued()) return;
	    this._setGcQueued();
	    async.invokeLater(this._gc, this, void 0);
	};
	
	Promise.prototype._gc = function Promise$gc() {
	    var len = this._length() * 5 - 5;
	    for (var i = 0; i < len; i++) {
	        delete this[i];
	    }
	    this._clearFirstHandlerData();
	    this._setLength(0);
	    this._unsetGcQueued();
	};
	
	Promise.prototype._clearFirstHandlerData =
	function Promise$_clearFirstHandlerData() {
	    this._fulfillmentHandler0 = void 0;
	    this._rejectionHandler0 = void 0;
	    this._promise0 = void 0;
	    this._receiver0 = void 0;
	};
	
	Promise.prototype._queueSettleAt = function Promise$_queueSettleAt(index) {
	    if (this._isRejectionUnhandled()) this._unsetRejectionIsUnhandled();
	    async.invoke(this._settlePromiseAt, this, index);
	};
	
	Promise.prototype._fulfillUnchecked =
	function Promise$_fulfillUnchecked(value) {
	    if (!this.isPending()) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err, void 0);
	    }
	    this._cleanValues();
	    this._setFulfilled();
	    this._settledValue = value;
	    var len = this._length();
	
	    if (len > 0) {
	        async.invoke(this._settlePromises, this, len);
	    }
	};
	
	Promise.prototype._rejectUncheckedCheckError =
	function Promise$_rejectUncheckedCheckError(reason) {
	    var trace = canAttach(reason) ? reason : new Error(reason + "");
	    this._rejectUnchecked(reason, trace === reason ? void 0 : trace);
	};
	
	Promise.prototype._rejectUnchecked =
	function Promise$_rejectUnchecked(reason, trace) {
	    if (!this.isPending()) return;
	    if (reason === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._rejectUnchecked(err);
	    }
	    this._cleanValues();
	    this._setRejected();
	    this._settledValue = reason;
	
	    if (this._isFinal()) {
	        async.invokeLater(thrower, void 0, trace === void 0 ? reason : trace);
	        return;
	    }
	    var len = this._length();
	
	    if (trace !== void 0) this._setCarriedStackTrace(trace);
	
	    if (len > 0) {
	        async.invoke(this._rejectPromises, this, null);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};
	
	Promise.prototype._rejectPromises = function Promise$_rejectPromises() {
	    this._settlePromises();
	    this._unsetCarriedStackTrace();
	};
	
	Promise.prototype._settlePromises = function Promise$_settlePromises() {
	    var len = this._length();
	    for (var i = 0; i < len; i++) {
	        this._settlePromiseAt(i);
	    }
	};
	
	Promise.prototype._ensurePossibleRejectionHandled =
	function Promise$_ensurePossibleRejectionHandled() {
	    this._setRejectionIsUnhandled();
	    if (CapturedTrace.possiblyUnhandledRejection !== void 0) {
	        async.invokeLater(this._notifyUnhandledRejection, this, void 0);
	    }
	};
	
	Promise.prototype._notifyUnhandledRejectionIsHandled =
	function Promise$_notifyUnhandledRejectionIsHandled() {
	    if (typeof unhandledRejectionHandled === "function") {
	        async.invokeLater(unhandledRejectionHandled, void 0, this);
	    }
	};
	
	Promise.prototype._notifyUnhandledRejection =
	function Promise$_notifyUnhandledRejection() {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue;
	        var trace = this._getCarriedStackTrace();
	
	        this._setUnhandledRejectionIsNotified();
	
	        if (trace !== void 0) {
	            this._unsetCarriedStackTrace();
	            reason = trace;
	        }
	        if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
	            CapturedTrace.possiblyUnhandledRejection(reason, this);
	        }
	    }
	};
	
	var contextStack = [];
	Promise.prototype._peekContext = function Promise$_peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return void 0;
	
	};
	
	Promise.prototype._pushContext = function Promise$_pushContext() {
	    if (!debugging) return;
	    contextStack.push(this);
	};
	
	Promise.prototype._popContext = function Promise$_popContext() {
	    if (!debugging) return;
	    contextStack.pop();
	};
	
	Promise.noConflict = function Promise$NoConflict() {
	    return noConflict(Promise);
	};
	
	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function");
	    async._schedule = fn;
	};
	
	if (!CapturedTrace.isSupported()) {
	    Promise.longStackTraces = function(){};
	    debugging = false;
	}
	
	Promise._makeSelfResolutionError = makeSelfResolutionError;
	__webpack_require__(14)(Promise, NEXT_FILTER, cast);
	__webpack_require__(15)(Promise);
	__webpack_require__(16)(Promise);
	__webpack_require__(17)(Promise, PromiseArray, cast, INTERNAL);
	Promise.RangeError = RangeError;
	Promise.CancellationError = CancellationError;
	Promise.TimeoutError = TimeoutError;
	Promise.TypeError = TypeError;
	Promise.OperationalError = OperationalError;
	Promise.RejectionError = OperationalError;
	Promise.AggregateError = errors.AggregateError;
	
	util.toFastProperties(Promise);
	util.toFastProperties(Promise.prototype);
	Promise.Promise = Promise;
	__webpack_require__(18)(Promise,INTERNAL,cast);
	__webpack_require__(19)(Promise,INTERNAL,cast);
	__webpack_require__(20)(Promise);
	__webpack_require__(21)(Promise,apiRejection,INTERNAL,cast);
	__webpack_require__(22)(Promise,PromiseArray,apiRejection,cast,INTERNAL);
	__webpack_require__(23)(Promise);
	__webpack_require__(24)(Promise,INTERNAL);
	__webpack_require__(25)(Promise,PromiseArray,cast);
	__webpack_require__(26)(Promise,PromiseArray,apiRejection,cast,INTERNAL);
	__webpack_require__(27)(Promise,PromiseArray);
	__webpack_require__(28)(Promise,PromiseArray,apiRejection);
	__webpack_require__(29)(Promise,PromiseArray);
	__webpack_require__(30)(Promise,INTERNAL);
	__webpack_require__(31)(Promise,INTERNAL);
	__webpack_require__(32)(Promise,PromiseArray);
	__webpack_require__(33)(Promise,INTERNAL);
	__webpack_require__(34)(Promise,apiRejection,cast);
	
	Promise.prototype = Promise.prototype;
	return Promise;
	
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var es5 = __webpack_require__(36);
	var haveGetters = (function(){
	    try {
	        var o = {};
	        es5.defineProperty(o, "f", {
	            get: function () {
	                return 3;
	            }
	        });
	        return o.f === 3;
	    }
	    catch (e) {
	        return false;
	    }
	
	})();
	var canEvaluate = typeof navigator == "undefined";
	var errorObj = {e: {}};
	function tryCatch1(fn, receiver, arg) {
	    try { return fn.call(receiver, arg); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	function tryCatch2(fn, receiver, arg, arg2) {
	    try { return fn.call(receiver, arg, arg2); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	function tryCatch3(fn, receiver, arg, arg2, arg3) {
	    try { return fn.call(receiver, arg, arg2, arg3); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	function tryCatch4(fn, receiver, arg, arg2, arg3, arg4) {
	    try { return fn.call(receiver, arg, arg2, arg3, arg4); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	function tryCatchApply(fn, args, receiver) {
	    try { return fn.apply(receiver, args); }
	    catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;
	
	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};
	
	function asString(val) {
	    return typeof val === "string" ? val : ("" + val);
	}
	
	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";
	
	}
	
	function isObject(value) {
	    return !isPrimitive(value);
	}
	
	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;
	
	    return new Error(asString(maybeError));
	}
	
	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}
	
	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);
	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
	    }
	}
	
	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}
	
	
	var wrapsPrimitiveReceiver = (function() {
	    return this !== "string";
	}).call("string");
	
	function thrower(r) {
	    throw r;
	}
	
	var inheritedDataKeys = (function() {
	    if (es5.isES5) {
	        return function(obj, opts) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            var getKeys = Object(opts).includeHidden
	                ? Object.getOwnPropertyNames
	                : Object.keys;
	            while (obj != null) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        return function(obj) {
	            var ret = [];
	            /*jshint forin:false */
	            for (var key in obj) {
	                ret.push(key);
	            }
	            return ret;
	        };
	    }
	
	})();
	
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.keys(fn.prototype);
	            return keys.length > 0 &&
	                   !(keys.length === 1 && keys[0] === "constructor");
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}
	
	function toFastProperties(obj) {
	    /*jshint -W027*/
	    function f() {}
	    f.prototype = obj;
	    return f;
	    eval(obj);
	}
	
	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}
	
	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}
	
	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    haveGetters: haveGetters,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch1: tryCatch1,
	    tryCatch2: tryCatch2,
	    tryCatch3: tryCatch3,
	    tryCatch4: tryCatch4,
	    tryCatchApply: tryCatchApply,
	    inherits: inherits,
	    withAppended: withAppended,
	    asString: asString,
	    maybeWrapAsError: maybeWrapAsError,
	    wrapsPrimitiveReceiver: wrapsPrimitiveReceiver,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange
	};
	
	module.exports = ret;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var schedule = __webpack_require__(37);
	var Queue = __webpack_require__(38);
	var errorObj = __webpack_require__(5).errorObj;
	var tryCatch1 = __webpack_require__(5).tryCatch1;
	var _process = typeof process !== "undefined" ? process : void 0;
	
	function Async() {
	    this._isTickUsed = false;
	    this._schedule = schedule;
	    this._length = 0;
	    this._lateBuffer = new Queue(16);
	    this._functionBuffer = new Queue(65536);
	    var self = this;
	    this.consumeFunctionBuffer = function Async$consumeFunctionBuffer() {
	        self._consumeFunctionBuffer();
	    };
	}
	
	Async.prototype.haveItemsQueued = function Async$haveItemsQueued() {
	    return this._length > 0;
	};
	
	Async.prototype.invokeLater = function Async$invokeLater(fn, receiver, arg) {
	    if (_process !== void 0 &&
	        _process.domain != null &&
	        !fn.domain) {
	        fn = _process.domain.bind(fn);
	    }
	    this._lateBuffer.push(fn, receiver, arg);
	    this._queueTick();
	};
	
	Async.prototype.invoke = function Async$invoke(fn, receiver, arg) {
	    if (_process !== void 0 &&
	        _process.domain != null &&
	        !fn.domain) {
	        fn = _process.domain.bind(fn);
	    }
	    var functionBuffer = this._functionBuffer;
	    functionBuffer.push(fn, receiver, arg);
	    this._length = functionBuffer.length();
	    this._queueTick();
	};
	
	Async.prototype._consumeFunctionBuffer =
	function Async$_consumeFunctionBuffer() {
	    var functionBuffer = this._functionBuffer;
	    while (functionBuffer.length() > 0) {
	        var fn = functionBuffer.shift();
	        var receiver = functionBuffer.shift();
	        var arg = functionBuffer.shift();
	        fn.call(receiver, arg);
	    }
	    this._reset();
	    this._consumeLateBuffer();
	};
	
	Async.prototype._consumeLateBuffer = function Async$_consumeLateBuffer() {
	    var buffer = this._lateBuffer;
	    while(buffer.length() > 0) {
	        var fn = buffer.shift();
	        var receiver = buffer.shift();
	        var arg = buffer.shift();
	        var res = tryCatch1(fn, receiver, arg);
	        if (res === errorObj) {
	            this._queueTick();
	            if (fn.domain != null) {
	                fn.domain.emit("error", res.e);
	            } else {
	                throw res.e;
	            }
	        }
	    }
	};
	
	Async.prototype._queueTick = function Async$_queue() {
	    if (!this._isTickUsed) {
	        this._schedule(this.consumeFunctionBuffer);
	        this._isTickUsed = true;
	    }
	};
	
	Async.prototype._reset = function Async$_reset() {
	    this._isTickUsed = false;
	    this._length = 0;
	};
	
	module.exports = new Async();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var Objectfreeze = __webpack_require__(36).freeze;
	var util = __webpack_require__(5);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;
	
	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}
	
	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof OperationalError) ||
	        e["isOperational"] === true);
	}
	
	function isError(obj) {
	    return obj instanceof Error;
	}
	
	function canAttach(obj) {
	    return isError(obj);
	}
	
	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        this.message = typeof message === "string" ? message : defaultMessage;
	        this.name = nameProperty;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}
	
	var _TypeError, _RangeError;
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}
	
	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
	
	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}
	
	AggregateError.prototype.length = 0;
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};
	
	function OperationalError(message) {
	    this.name = "OperationalError";
	    this.message = message;
	    this.cause = message;
	    this["isOperational"] = true;
	
	    if (message instanceof Error) {
	        this.message = message.message;
	        this.stack = message.stack;
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }
	
	}
	inherits(OperationalError, Error);
	
	var key = "__BluebirdErrorTypes__";
	var errorTypes = Error[key];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    notEnumerableProp(Error, key, errorTypes);
	}
	
	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    canAttach: canAttach
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(5);
	var canAttach = __webpack_require__(7).canAttach;
	var errorObj = util.errorObj;
	var isObject = util.isObject;
	
	function getThen(obj) {
	    try {
	        return obj.then;
	    }
	    catch(e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	
	function Promise$_Cast(obj, originalPromise) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) {
	            return obj;
	        }
	        else if (isAnyBluebirdPromise(obj)) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            obj._then(
	                ret._fulfillUnchecked,
	                ret._rejectUncheckedCheckError,
	                ret._progressUnchecked,
	                ret,
	                null
	            );
	            ret._setFollowing();
	            return ret;
	        }
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (originalPromise !== void 0 && canAttach(then.e)) {
	                originalPromise._attachExtraTrace(then.e);
	            }
	            return Promise.reject(then.e);
	        } else if (typeof then === "function") {
	            return Promise$_doThenable(obj, then, originalPromise);
	        }
	    }
	    return obj;
	}
	
	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    return hasProp.call(obj, "_promise0");
	}
	
	function Promise$_doThenable(x, then, originalPromise) {
	    var resolver = Promise.defer();
	    var called = false;
	    try {
	        then.call(
	            x,
	            Promise$_resolveFromThenable,
	            Promise$_rejectFromThenable,
	            Promise$_progressFromThenable
	        );
	    } catch(e) {
	        if (!called) {
	            called = true;
	            var trace = canAttach(e) ? e : new Error(e + "");
	            if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(trace);
	            }
	            resolver.promise._reject(e, trace);
	        }
	    }
	    return resolver.promise;
	
	    function Promise$_resolveFromThenable(y) {
	        if (called) return;
	        called = true;
	
	        if (x === y) {
	            var e = Promise._makeSelfResolutionError();
	            if (originalPromise !== void 0) {
	                originalPromise._attachExtraTrace(e);
	            }
	            resolver.promise._reject(e, void 0);
	            return;
	        }
	        resolver.resolve(y);
	    }
	
	    function Promise$_rejectFromThenable(r) {
	        if (called) return;
	        called = true;
	        var trace = canAttach(r) ? r : new Error(r + "");
	        if (originalPromise !== void 0) {
	            originalPromise._attachExtraTrace(trace);
	        }
	        resolver.promise._reject(r, trace);
	    }
	
	    function Promise$_progressFromThenable(v) {
	        if (called) return;
	        var promise = resolver.promise;
	        if (typeof promise._progress === "function") {
	            promise._progress(v);
	        }
	    }
	}
	
	return Promise$_Cast;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL, cast) {
	var canAttach = __webpack_require__(7).canAttach;
	var util = __webpack_require__(5);
	var isArray = util.isArray;
	
	function toResolutionValue(val) {
	    switch(val) {
	    case -1: return void 0;
	    case -2: return [];
	    case -3: return {};
	    }
	}
	
	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    var parent = void 0;
	    if (values instanceof Promise) {
	        parent = values;
	        promise._propagateFrom(parent, 1 | 4);
	    }
	    promise._setTrace(parent);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(void 0, -2);
	}
	PromiseArray.prototype.length = function PromiseArray$length() {
	    return this._length;
	};
	
	PromiseArray.prototype.promise = function PromiseArray$promise() {
	    return this._promise;
	};
	
	PromiseArray.prototype._init =
	function PromiseArray$_init(_, resolveValueIfEmpty) {
	    var values = cast(this._values, void 0);
	    if (values instanceof Promise) {
	        this._values = values;
	        values._setBoundTo(this._promise._boundTo);
	        if (values.isFulfilled()) {
	            values = values._settledValue;
	            if (!isArray(values)) {
	                var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	                this.__hardReject__(err);
	                return;
	            }
	        } else if (values.isPending()) {
	            values._then(
	                PromiseArray$_init,
	                this._reject,
	                void 0,
	                this,
	                resolveValueIfEmpty
	           );
	            return;
	        } else {
	            values._unsetRejectionIsUnhandled();
	            this._reject(values._settledValue);
	            return;
	        }
	    } else if (!isArray(values)) {
	        var err = new Promise.TypeError("expecting an array, a promise or a thenable");
	        this.__hardReject__(err);
	        return;
	    }
	
	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    var len = this.getActualLength(values.length);
	    var newLen = len;
	    var newValues = this.shouldCopyValues() ? new Array(len) : this._values;
	    var isDirectScanNeeded = false;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = cast(values[i], void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                maybePromise._proxyPromiseArray(this, i);
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                isDirectScanNeeded = true;
	            }
	        } else {
	            isDirectScanNeeded = true;
	        }
	        newValues[i] = maybePromise;
	    }
	    this._values = newValues;
	    this._length = newLen;
	    if (isDirectScanNeeded) {
	        this._scanDirectValues(len);
	    }
	};
	
	PromiseArray.prototype._settlePromiseAt =
	function PromiseArray$_settlePromiseAt(index) {
	    var value = this._values[index];
	    if (!(value instanceof Promise)) {
	        this._promiseFulfilled(value, index);
	    } else if (value.isFulfilled()) {
	        this._promiseFulfilled(value._settledValue, index);
	    } else if (value.isRejected()) {
	        this._promiseRejected(value._settledValue, index);
	    }
	};
	
	PromiseArray.prototype._scanDirectValues =
	function PromiseArray$_scanDirectValues(len) {
	    for (var i = 0; i < len; ++i) {
	        if (this._isResolved()) {
	            break;
	        }
	        this._settlePromiseAt(i);
	    }
	};
	
	PromiseArray.prototype._isResolved = function PromiseArray$_isResolved() {
	    return this._values === null;
	};
	
	PromiseArray.prototype._resolve = function PromiseArray$_resolve(value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};
	
	PromiseArray.prototype.__hardReject__ =
	PromiseArray.prototype._reject = function PromiseArray$_reject(reason) {
	    this._values = null;
	    var trace = canAttach(reason) ? reason : new Error(reason + "");
	    this._promise._attachExtraTrace(trace);
	    this._promise._reject(reason, trace);
	};
	
	PromiseArray.prototype._promiseProgressed =
	function PromiseArray$_promiseProgressed(progressValue, index) {
	    if (this._isResolved()) return;
	    this._promise._progress({
	        index: index,
	        value: progressValue
	    });
	};
	
	
	PromiseArray.prototype._promiseFulfilled =
	function PromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};
	
	PromiseArray.prototype._promiseRejected =
	function PromiseArray$_promiseRejected(reason, index) {
	    if (this._isResolved()) return;
	    this._totalResolved++;
	    this._reject(reason);
	};
	
	PromiseArray.prototype.shouldCopyValues =
	function PromiseArray$_shouldCopyValues() {
	    return true;
	};
	
	PromiseArray.prototype.getActualLength =
	function PromiseArray$getActualLength(len) {
	    return len;
	};
	
	return PromiseArray;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function() {
	var inherits = __webpack_require__(5).inherits;
	var defineProperty = __webpack_require__(36).defineProperty;
	
	var rignore = new RegExp(
	    "\\b(?:[a-zA-Z0-9.]+\\$_\\w+|" +
	    "tryCatch(?:1|2|3|4|Apply)|new \\w*PromiseArray|" +
	    "\\w*PromiseArray\\.\\w*PromiseArray|" +
	    "setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|" +
	    "process._tickCallback|nextTick|Async\\$\\w+)\\b"
	);
	
	var rtraceline = null;
	var formatStack = null;
	
	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj.toString();
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {
	
	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}
	
	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}
	
	function CapturedTrace(ignoreUntil, isTopLevel) {
	    this.captureStackTrace(CapturedTrace, isTopLevel);
	
	}
	inherits(CapturedTrace, Error);
	
	CapturedTrace.prototype.captureStackTrace =
	function CapturedTrace$captureStackTrace(ignoreUntil, isTopLevel) {
	    captureStackTrace(this, ignoreUntil, isTopLevel);
	};
	
	CapturedTrace.possiblyUnhandledRejection =
	function CapturedTrace$PossiblyUnhandledRejection(reason) {
	    if (typeof console === "object") {
	        var message;
	        if (typeof reason === "object" || typeof reason === "function") {
	            var stack = reason.stack;
	            message = "Possibly unhandled " + formatStack(stack, reason);
	        } else {
	            message = "Possibly unhandled " + String(reason);
	        }
	        if (typeof console.error === "function" ||
	            typeof console.error === "object") {
	            console.error(message);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	};
	
	CapturedTrace.combine = function CapturedTrace$Combine(current, prev) {
	    var curLast = current.length - 1;
	    for (var i = prev.length - 1; i >= 0; --i) {
	        var line = prev[i];
	        if (current[curLast] === line) {
	            current.pop();
	            curLast--;
	        } else {
	            break;
	        }
	    }
	
	    current.push("From previous event:");
	    var lines = current.concat(prev);
	
	    var ret = [];
	
	    for (var i = 0, len = lines.length; i < len; ++i) {
	
	        if (((rignore.test(lines[i]) && rtraceline.test(lines[i])) ||
	            (i > 0 && !rtraceline.test(lines[i])) &&
	            lines[i] !== "From previous event:")
	       ) {
	            continue;
	        }
	        ret.push(lines[i]);
	    }
	    return ret;
	};
	
	CapturedTrace.protectErrorMessageNewlines = function(stack) {
	    for (var i = 0; i < stack.length; ++i) {
	        if (rtraceline.test(stack[i])) {
	            break;
	        }
	    }
	
	    if (i <= 1) return;
	
	    var errorMessageLines = [];
	    for (var j = 0; j < i; ++j) {
	        errorMessageLines.push(stack.shift());
	    }
	    stack.unshift(errorMessageLines.join("\u0002\u0000\u0001"));
	};
	
	CapturedTrace.isSupported = function CapturedTrace$IsSupported() {
	    return typeof captureStackTrace === "function";
	};
	
	var captureStackTrace = (function stackDetection() {
	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        rtraceline = /^\s*at\s*/;
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;
	
	            if (error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	
	
	        };
	        var captureStackTrace = Error.captureStackTrace;
	        return function CapturedTrace$_captureStackTrace(
	            receiver, ignoreUntil) {
	            captureStackTrace(receiver, ignoreUntil);
	        };
	    }
	    var err = new Error();
	
	    if (typeof err.stack === "string" &&
	        typeof "".startsWith === "function" &&
	        (err.stack.startsWith("stackDetection@")) &&
	        stackDetection.name === "stackDetection") {
	
	        defineProperty(Error, "stackTraceLimit", {
	            writable: true,
	            enumerable: false,
	            configurable: false,
	            value: 25
	        });
	        rtraceline = /@/;
	        var rline = /[@\n]/;
	
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") {
	                return (error.name + ". " + error.message + "\n" + stack);
	            }
	
	            if (error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };
	
	        return function captureStackTrace(o) {
	            var stack = new Error().stack;
	            var split = stack.split(rline);
	            var len = split.length;
	            var ret = "";
	            for (var i = 0; i < len; i += 2) {
	                ret += split[i];
	                ret += "@";
	                ret += split[i + 1];
	                ret += "\n";
	            }
	            o.stack = ret;
	        };
	    } else {
	        formatStack = function(stack, error) {
	            if (typeof stack === "string") return stack;
	
	            if ((typeof error === "object" ||
	                typeof error === "function") &&
	                error.name !== void 0 &&
	                error.message !== void 0) {
	                return error.name + ". " + error.message;
	            }
	            return formatNonError(error);
	        };
	
	        return null;
	    }
	})();
	
	return CapturedTrace;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(5);
	var errors = __webpack_require__(7);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	var keys = __webpack_require__(36).keys;
	var TypeError = errors.TypeError;
	
	function CatchFilter(instances, callback, promise) {
	    this._instances = instances;
	    this._callback = callback;
	    this._promise = promise;
	}
	
	function CatchFilter$_safePredicate(predicate, e) {
	    var safeObject = {};
	    var retfilter = tryCatch1(predicate, safeObject, e);
	
	    if (retfilter === errorObj) return retfilter;
	
	    var safeKeys = keys(safeObject);
	    if (safeKeys.length) {
	        errorObj.e = new TypeError(
	            "Catch filter must inherit from Error "
	          + "or be a simple predicate function");
	        return errorObj;
	    }
	    return retfilter;
	}
	
	CatchFilter.prototype.doFilter = function CatchFilter$_doFilter(e) {
	    var cb = this._callback;
	    var promise = this._promise;
	    var boundTo = promise._boundTo;
	    for (var i = 0, len = this._instances.length; i < len; ++i) {
	        var item = this._instances[i];
	        var itemIsErrorType = item === Error ||
	            (item != null && item.prototype instanceof Error);
	
	        if (itemIsErrorType && e instanceof item) {
	            var ret = tryCatch1(cb, boundTo, e);
	            if (ret === errorObj) {
	                NEXT_FILTER.e = ret.e;
	                return NEXT_FILTER;
	            }
	            return ret;
	        } else if (typeof item === "function" && !itemIsErrorType) {
	            var shouldHandle = CatchFilter$_safePredicate(item, e);
	            if (shouldHandle === errorObj) {
	                var trace = errors.canAttach(errorObj.e)
	                    ? errorObj.e
	                    : new Error(errorObj.e + "");
	                this._promise._attachExtraTrace(trace);
	                e = errorObj.e;
	                break;
	            } else if (shouldHandle) {
	                var ret = tryCatch1(cb, boundTo, e);
	                if (ret === errorObj) {
	                    NEXT_FILTER.e = ret.e;
	                    return NEXT_FILTER;
	                }
	                return ret;
	            }
	        }
	    }
	    NEXT_FILTER.e = e;
	    return NEXT_FILTER;
	};
	
	return CatchFilter;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var util = __webpack_require__(5);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(7);
	var TimeoutError = errors.TimeoutError;
	var OperationalError = errors.OperationalError;
	var async = __webpack_require__(6);
	var haveGetters = util.haveGetters;
	var es5 = __webpack_require__(36);
	
	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}
	
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	    } else {
	        ret = obj;
	    }
	    errors.markAsOriginatingFromRejection(ret);
	    return ret;
	}
	
	function nodebackForPromise(promise) {
	    function PromiseResolver$_callback(err, value) {
	        if (promise === null) return;
	
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (arguments.length > 2) {
	            var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	            promise._fulfill(args);
	        } else {
	            promise._fulfill(value);
	        }
	
	        promise = null;
	    }
	    return PromiseResolver$_callback;
	}
	
	
	var PromiseResolver;
	if (!haveGetters) {
	    PromiseResolver = function PromiseResolver(promise) {
	        this.promise = promise;
	        this.asCallback = nodebackForPromise(promise);
	        this.callback = this.asCallback;
	    };
	}
	else {
	    PromiseResolver = function PromiseResolver(promise) {
	        this.promise = promise;
	    };
	}
	if (haveGetters) {
	    var prop = {
	        get: function() {
	            return nodebackForPromise(this.promise);
	        }
	    };
	    es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
	    es5.defineProperty(PromiseResolver.prototype, "callback", prop);
	}
	
	PromiseResolver._nodebackForPromise = nodebackForPromise;
	
	PromiseResolver.prototype.toString = function PromiseResolver$toString() {
	    return "[object PromiseResolver]";
	};
	
	PromiseResolver.prototype.resolve =
	PromiseResolver.prototype.fulfill = function PromiseResolver$resolve(value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }
	
	    var promise = this.promise;
	    if (promise._tryFollow(value)) {
	        return;
	    }
	    async.invoke(promise._fulfill, promise, value);
	};
	
	PromiseResolver.prototype.reject = function PromiseResolver$reject(reason) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }
	
	    var promise = this.promise;
	    errors.markAsOriginatingFromRejection(reason);
	    var trace = errors.canAttach(reason) ? reason : new Error(reason + "");
	    promise._attachExtraTrace(trace);
	    async.invoke(promise._reject, promise, reason);
	    if (trace !== reason) {
	        async.invoke(this._setCarriedStackTrace, this, trace);
	    }
	};
	
	PromiseResolver.prototype.progress =
	function PromiseResolver$progress(value) {
	    if (!(this instanceof PromiseResolver)) {
	        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
	    }
	    async.invoke(this.promise._progress, this.promise, value);
	};
	
	PromiseResolver.prototype.cancel = function PromiseResolver$cancel() {
	    async.invoke(this.promise.cancel, this.promise, void 0);
	};
	
	PromiseResolver.prototype.timeout = function PromiseResolver$timeout() {
	    this.reject(new TimeoutError("timeout"));
	};
	
	PromiseResolver.prototype.isResolved = function PromiseResolver$isResolved() {
	    return this.promise.isResolved();
	};
	
	PromiseResolver.prototype.toJSON = function PromiseResolver$toJSON() {
	    return this.promise.toJSON();
	};
	
	PromiseResolver.prototype._setCarriedStackTrace =
	function PromiseResolver$_setCarriedStackTrace(trace) {
	    if (this.promise.isRejected()) {
	        this.promise._setCarriedStackTrace(trace);
	    }
	};
	
	module.exports = PromiseResolver;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var TypeError = __webpack_require__(7).TypeError;
	
	function apiRejection(msg) {
	    var error = new TypeError(msg);
	    var ret = Promise.rejected(error);
	    var parent = ret._peekContext();
	    if (parent != null) {
	        parent._attachExtraTrace(error);
	    }
	    return ret;
	}
	
	return apiRejection;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, NEXT_FILTER, cast) {
	var util = __webpack_require__(5);
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	var isPrimitive = util.isPrimitive;
	var thrower = util.thrower;
	
	function returnThis() {
	    return this;
	}
	function throwThis() {
	    throw this;
	}
	function return$(r) {
	    return function Promise$_returner() {
	        return r;
	    };
	}
	function throw$(r) {
	    return function Promise$_thrower() {
	        throw r;
	    };
	}
	function promisedFinally(ret, reasonOrValue, isFulfilled) {
	    var then;
	    if (wrapsPrimitiveReceiver && isPrimitive(reasonOrValue)) {
	        then = isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue);
	    } else {
	        then = isFulfilled ? returnThis : throwThis;
	    }
	    return ret._then(then, thrower, void 0, reasonOrValue, void 0);
	}
	
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;
	
	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo)
	                    : handler();
	
	    if (ret !== void 0) {
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            return promisedFinally(maybePromise, reasonOrValue,
	                                    promise.isFulfilled());
	        }
	    }
	
	    if (promise.isRejected()) {
	        NEXT_FILTER.e = reasonOrValue;
	        return NEXT_FILTER;
	    } else {
	        return reasonOrValue;
	    }
	}
	
	function tapHandler(value) {
	    var promise = this.promise;
	    var handler = this.handler;
	
	    var ret = promise._isBound()
	                    ? handler.call(promise._boundTo, value)
	                    : handler(value);
	
	    if (ret !== void 0) {
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            return promisedFinally(maybePromise, value, true);
	        }
	    }
	    return value;
	}
	
	Promise.prototype._passThroughHandler =
	function Promise$_passThroughHandler(handler, isFinally) {
	    if (typeof handler !== "function") return this.then();
	
	    var promiseAndHandler = {
	        promise: this,
	        handler: handler
	    };
	
	    return this._then(
	            isFinally ? finallyHandler : tapHandler,
	            isFinally ? finallyHandler : void 0, void 0,
	            promiseAndHandler, void 0);
	};
	
	Promise.prototype.lastly =
	Promise.prototype["finally"] = function Promise$finally(handler) {
	    return this._passThroughHandler(handler, true);
	};
	
	Promise.prototype.tap = function Promise$tap(handler) {
	    return this._passThroughHandler(handler, false);
	};
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var util = __webpack_require__(5);
	var isPrimitive = util.isPrimitive;
	var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
	
	module.exports = function(Promise) {
	var returner = function Promise$_returner() {
	    return this;
	};
	var thrower = function Promise$_thrower() {
	    throw this;
	};
	
	var wrapper = function Promise$_wrapper(value, action) {
	    if (action === 1) {
	        return function Promise$_thrower() {
	            throw value;
	        };
	    } else if (action === 2) {
	        return function Promise$_returner() {
	            return value;
	        };
	    }
	};
	
	
	Promise.prototype["return"] =
	Promise.prototype.thenReturn =
	function Promise$thenReturn(value) {
	    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
	        return this._then(
	            wrapper(value, 2),
	            void 0,
	            void 0,
	            void 0,
	            void 0
	       );
	    }
	    return this._then(returner, void 0, void 0, value, void 0);
	};
	
	Promise.prototype["throw"] =
	Promise.prototype.thenThrow =
	function Promise$thenThrow(reason) {
	    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
	        return this._then(
	            wrapper(reason, 1),
	            void 0,
	            void 0,
	            void 0,
	            void 0
	       );
	    }
	    return this._then(thrower, void 0, void 0, reason, void 0);
	};
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== void 0) {
	        this._bitField = promise._bitField;
	        this._settledValue = promise.isResolved()
	            ? promise._settledValue
	            : void 0;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValue = void 0;
	    }
	}
	
	PromiseInspection.prototype.isFulfilled =
	Promise.prototype.isFulfilled = function Promise$isFulfilled() {
	    return (this._bitField & 268435456) > 0;
	};
	
	PromiseInspection.prototype.isRejected =
	Promise.prototype.isRejected = function Promise$isRejected() {
	    return (this._bitField & 134217728) > 0;
	};
	
	PromiseInspection.prototype.isPending =
	Promise.prototype.isPending = function Promise$isPending() {
	    return (this._bitField & 402653184) === 0;
	};
	
	PromiseInspection.prototype.value =
	Promise.prototype.value = function Promise$value() {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");
	    }
	    return this._settledValue;
	};
	
	PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason =
	Promise.prototype.reason = function Promise$reason() {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise");
	    }
	    return this._settledValue;
	};
	
	PromiseInspection.prototype.isResolved =
	Promise.prototype.isResolved = function Promise$isResolved() {
	    return (this._bitField & 402653184) > 0;
	};
	
	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	function(Promise, PromiseArray, cast, INTERNAL) {
	var util = __webpack_require__(5);
	var canEvaluate = util.canEvaluate;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	
	
	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };
	
	    var caller = function(count) {
	        var values = [];
	        for (var i = 1; i <= count; ++i) values.push("holder.p" + i);
	        return new Function("holder", "                                      \n\
	            'use strict';                                                    \n\
	            var callback = holder.fn;                                        \n\
	            return callback(values);                                         \n\
	            ".replace(/values/g, values.join(", ")));
	    };
	    var thenCallbacks = [];
	    var callers = [void 0];
	    for (var i = 1; i <= 5; ++i) {
	        thenCallbacks.push(thenCallback(i));
	        callers.push(caller(i));
	    }
	
	    var Holder = function(total, fn) {
	        this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = null;
	        this.fn = fn;
	        this.total = total;
	        this.now = 0;
	    };
	
	    Holder.prototype.callers = callers;
	    Holder.prototype.checkFulfillment = function(promise) {
	        var now = this.now;
	        now++;
	        var total = this.total;
	        if (now >= total) {
	            var handler = this.callers[total];
	            var ret = tryCatch1(handler, void 0, this);
	            if (ret === errorObj) {
	                promise._rejectUnchecked(ret.e);
	            } else if (!promise._tryFollow(ret)) {
	                promise._fulfillUnchecked(ret);
	            }
	        } else {
	            this.now = now;
	        }
	    };
	}
	
	
	
	
	Promise.join = function Promise$Join() {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (last < 6 && canEvaluate) {
	            var ret = new Promise(INTERNAL);
	            ret._setTrace(void 0);
	            var holder = new Holder(last, fn);
	            var reject = ret._reject;
	            var callbacks = thenCallbacks;
	            for (var i = 0; i < last; ++i) {
	                var maybePromise = cast(arguments[i], void 0);
	                if (maybePromise instanceof Promise) {
	                    if (maybePromise.isPending()) {
	                        maybePromise._then(callbacks[i], reject,
	                                           void 0, ret, holder);
	                    } else if (maybePromise.isFulfilled()) {
	                        callbacks[i].call(ret,
	                                          maybePromise._settledValue, holder);
	                    } else {
	                        ret._reject(maybePromise._settledValue);
	                        maybePromise._unsetRejectionIsUnhandled();
	                    }
	                } else {
	                    callbacks[i].call(ret, maybePromise, holder);
	                }
	            }
	            return ret;
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
	    var ret = new PromiseArray(args).promise();
	    return fn !== void 0 ? ret.spread(fn) : ret;
	};
	
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var _setTimeout = function(fn, ms) {
	    var len = arguments.length;
	    var arg0 = arguments[2];
	    var arg1 = arguments[3];
	    var arg2 = len >= 5 ? arguments[4] : void 0;
	    setTimeout(function() {
	        fn(arg0, arg1, arg2);
	    }, ms|0);
	};
	
	module.exports = function(Promise, INTERNAL, cast) {
	var util = __webpack_require__(5);
	var errors = __webpack_require__(7);
	var apiRejection = __webpack_require__(13)(Promise);
	var TimeoutError = Promise.TimeoutError;
	
	var afterTimeout = function Promise$_afterTimeout(promise, message, ms) {
	    if (!promise.isPending()) return;
	    if (typeof message !== "string") {
	        message = "operation timed out after" + " " + ms + " ms"
	    }
	    var err = new TimeoutError(message);
	    errors.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._cancel(err);
	};
	
	var afterDelay = function Promise$_afterDelay(value, promise) {
	    promise._fulfill(value);
	};
	
	var delay = Promise.delay = function Promise$Delay(value, ms) {
	    if (ms === void 0) {
	        ms = value;
	        value = void 0;
	    }
	    ms = +ms;
	    var maybePromise = cast(value, void 0);
	    var promise = new Promise(INTERNAL);
	
	    if (maybePromise instanceof Promise) {
	        promise._propagateFrom(maybePromise, 7);
	        promise._follow(maybePromise);
	        return promise.then(function(value) {
	            return Promise.delay(value, ms);
	        });
	    } else {
	        promise._setTrace(void 0);
	        _setTimeout(afterDelay, ms, value, promise);
	    }
	    return promise;
	};
	
	Promise.prototype.delay = function Promise$delay(ms) {
	    return delay(this, ms);
	};
	
	Promise.prototype.timeout = function Promise$timeout(ms, message) {
	    ms = +ms;
	
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 7);
	    ret._follow(this);
	    _setTimeout(afterTimeout, ms, ret, message, ms);
	    return ret.cancellable();
	};
	
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL, cast) {
	var apiRejection = __webpack_require__(13)(Promise);
	var isArray = __webpack_require__(5).isArray;
	
	var raceLater = function Promise$_raceLater(promise) {
	    return promise.then(function(array) {
	        return Promise$_Race(array, promise);
	    });
	};
	
	var hasOwn = {}.hasOwnProperty;
	function Promise$_Race(promises, parent) {
	    var maybePromise = cast(promises, void 0);
	
	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else if (!isArray(promises)) {
	        return apiRejection("expecting an array, a promise or a thenable");
	    }
	
	    var ret = new Promise(INTERNAL);
	    if (parent !== void 0) {
	        ret._propagateFrom(parent, 7);
	    } else {
	        ret._setTrace(void 0);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];
	
	        if (val === void 0 && !(hasOwn.call(promises, i))) {
	            continue;
	        }
	
	        Promise.cast(val)._then(fulfill, reject, void 0, ret, null);
	    }
	    return ret;
	}
	
	Promise.race = function Promise$Race(promises) {
	    return Promise$_Race(promises, void 0);
	};
	
	Promise.prototype.race = function Promise$race() {
	    return Promise$_Race(this, void 0);
	};
	
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}
	
	module.exports = function(Promise) {
	var util = __webpack_require__(5);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;
	
	function makeMethodCaller (methodName) {
	    return new Function("obj", "                                             \n\
	        'use strict'                                                         \n\
	        var len = this.length;                                               \n\
	        switch(len) {                                                        \n\
	            case 1: return obj.methodName(this[0]);                          \n\
	            case 2: return obj.methodName(this[0], this[1]);                 \n\
	            case 3: return obj.methodName(this[0], this[1], this[2]);        \n\
	            case 0: return obj.methodName();                                 \n\
	            default: return obj.methodName.apply(obj, this);                 \n\
	        }                                                                    \n\
	        ".replace(/methodName/g, methodName));
	}
	
	function makeGetter (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	}
	
	function getCompiled(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	}
	
	function getMethodCaller(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	}
	
	function getGetter(name) {
	    return getCompiled(name, makeGetter, getterCache);
	}
	
	function caller(obj) {
	    return obj[this.pop()].apply(obj, this);
	}
	Promise.prototype.call = function Promise$call(methodName) {
	    var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
	    if (canEvaluate) {
	        var maybeCaller = getMethodCaller(methodName);
	        if (maybeCaller !== null) {
	            return this._then(maybeCaller, void 0, void 0, args, void 0);
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, void 0, void 0, args, void 0);
	};
	
	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    return obj[this];
	}
	Promise.prototype.get = function Promise$get(propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, void 0, void 0, propertyName, void 0);
	};
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, apiRejection, INTERNAL, cast) {
	var errors = __webpack_require__(7);
	var TypeError = errors.TypeError;
	var deprecated = __webpack_require__(5).deprecated;
	var util = __webpack_require__(5);
	var errorObj = util.errorObj;
	var tryCatch1 = util.tryCatch1;
	var yieldHandlers = [];
	
	function promiseFromYieldHandler(value, yieldHandlers) {
	    var _errorObj = errorObj;
	    var _Promise = Promise;
	    var len = yieldHandlers.length;
	    for (var i = 0; i < len; ++i) {
	        var result = tryCatch1(yieldHandlers[i], void 0, value);
	        if (result === _errorObj) {
	            return _Promise.reject(_errorObj.e);
	        }
	        var maybePromise = cast(result, promiseFromYieldHandler);
	        if (maybePromise instanceof _Promise) return maybePromise;
	    }
	    return null;
	}
	
	function PromiseSpawn(generatorFunction, receiver, yieldHandler) {
	    var promise = this._promise = new Promise(INTERNAL);
	    promise._setTrace(void 0);
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = void 0;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	}
	
	PromiseSpawn.prototype.promise = function PromiseSpawn$promise() {
	    return this._promise;
	};
	
	PromiseSpawn.prototype._run = function PromiseSpawn$_run() {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = void 0;
	    this._next(void 0);
	};
	
	PromiseSpawn.prototype._continue = function PromiseSpawn$_continue(result) {
	    if (result === errorObj) {
	        this._generator = void 0;
	        var trace = errors.canAttach(result.e)
	            ? result.e : new Error(result.e + "");
	        this._promise._attachExtraTrace(trace);
	        this._promise._reject(result.e, trace);
	        return;
	    }
	
	    var value = result.value;
	    if (result.done === true) {
	        this._generator = void 0;
	        if (!this._promise._tryFollow(value)) {
	            this._promise._fulfill(value);
	        }
	    } else {
	        var maybePromise = cast(value, void 0);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise, this._yieldHandlers);
	            if (maybePromise === null) {
	                this._throw(new TypeError("A value was yielded that could not be treated as a promise"));
	                return;
	            }
	        }
	        maybePromise._then(
	            this._next,
	            this._throw,
	            void 0,
	            this,
	            null
	       );
	    }
	};
	
	PromiseSpawn.prototype._throw = function PromiseSpawn$_throw(reason) {
	    if (errors.canAttach(reason))
	        this._promise._attachExtraTrace(reason);
	    this._continue(
	        tryCatch1(this._generator["throw"], this._generator, reason)
	   );
	};
	
	PromiseSpawn.prototype._next = function PromiseSpawn$_next(value) {
	    this._continue(
	        tryCatch1(this._generator.next, this._generator, value)
	   );
	};
	
	Promise.coroutine =
	function Promise$Coroutine(generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler);
	        spawn._generator = generator;
	        spawn._next(void 0);
	        return spawn.promise();
	    };
	};
	
	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") throw new TypeError("fn must be a function");
	    yieldHandlers.push(fn);
	};
	
	Promise.spawn = function Promise$Spawn(generatorFunction) {
	    deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	var util = __webpack_require__(5);
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	var PENDING = {};
	var EMPTY_ARRAY = [];
	
	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._callback = fn;
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
	    this._init$(void 0, -2);
	}
	util.inherits(MappingPromiseArray, PromiseArray);
	
	MappingPromiseArray.prototype._init = function MappingPromiseArray$_init() {};
	
	MappingPromiseArray.prototype._promiseFulfilled =
	function MappingPromiseArray$_promiseFulfilled(value, index) {
	    var values = this._values;
	    if (values === null) return;
	
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;
	    if (values[index] === PENDING) {
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;
	
	        var callback = this._callback;
	        var receiver = this._promise._boundTo;
	        var ret = tryCatch3(callback, receiver, value, index, length);
	        if (ret === errorObj) return this._reject(ret.e);
	
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = PENDING;
	                return maybePromise._proxyPromiseArray(this, index);
	            } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	
	    }
	};
	
	MappingPromiseArray.prototype._drainQueue =
	function MappingPromiseArray$_drainQueue() {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};
	
	MappingPromiseArray.prototype._filter =
	function MappingPromiseArray$_filter(booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};
	
	MappingPromiseArray.prototype.preservedValues =
	function MappingPromiseArray$preserveValues() {
	    return this._preservedValues;
	};
	
	function map(promises, fn, options, _filter) {
	    var limit = typeof options === "object" && options !== null
	        ? options.concurrency
	        : 0;
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter);
	}
	
	Promise.prototype.map = function Promise$map(fn, options) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");
	
	    return map(this, fn, options, null).promise();
	};
	
	Promise.map = function Promise$Map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");
	    return map(promises, fn, options, _filter).promise();
	};
	
	
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(5);
	var async = __webpack_require__(6);
	var tryCatch2 = util.tryCatch2;
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	
	function thrower(r) {
	    throw r;
	}
	
	function Promise$_spreadAdapter(val, receiver) {
	    if (!util.isArray(val)) return Promise$_successAdapter(val, receiver);
	    var ret = util.tryCatchApply(this, [null].concat(val), receiver);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}
	
	function Promise$_successAdapter(val, receiver) {
	    var nodeback = this;
	    var ret = val === void 0
	        ? tryCatch1(nodeback, receiver, null)
	        : tryCatch2(nodeback, receiver, null, val);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}
	function Promise$_errorAdapter(reason, receiver) {
	    var nodeback = this;
	    var ret = tryCatch1(nodeback, receiver, reason);
	    if (ret === errorObj) {
	        async.invokeLater(thrower, void 0, ret.e);
	    }
	}
	
	Promise.prototype.nodeify = function Promise$nodeify(nodeback, options) {
	    if (typeof nodeback == "function") {
	        var adapter = Promise$_successAdapter;
	        if (options !== void 0 && Object(options).spread) {
	            adapter = Promise$_spreadAdapter;
	        }
	        this._then(
	            adapter,
	            Promise$_errorAdapter,
	            void 0,
	            nodeback,
	            this._boundTo
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(5);
	var nodebackForPromise = __webpack_require__(12)
	    ._nodebackForPromise;
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(7).TypeError;
	var defaultSuffix = "Async";
	var defaultFilter = function(name, func) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        !util.isClass(func);
	};
	var defaultPromisified = {__isPromisified__: true};
	
	
	function escapeIdentRegex(str) {
	    return str.replace(/([$])/, "\\$");
	}
	
	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}
	
	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API " +
	                        "that has normal methods with '"+suffix+"'-suffix");
	                }
	            }
	        }
	    }
	}
	
	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}
	
	function switchCaseArgumentOrder(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 5);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        if (i === likelyArgumentCount) continue;
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 5; ++i) {
	        ret.push(i);
	    }
	    return ret;
	}
	
	function argumentSequence(argumentCount) {
	    return util.filledRange(argumentCount, "arguments[", "]");
	}
	
	function parameterDeclaration(parameterCount) {
	    return util.filledRange(parameterCount, "_arg", "");
	}
	
	function parameterCount(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	}
	
	function generatePropertyAccess(key) {
	    if (util.isIdentifier(key)) {
	        return "." + key;
	    }
	    else return "['" + key.replace(/(['\\])/g, "\\$1") + "']";
	}
	
	function makeNodePromisifiedEval(callback, receiver, originalName, fn, suffix) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var callbackName =
	        (typeof originalName === "string" && util.isIdentifier(originalName)
	            ? originalName + suffix
	            : "promisified");
	
	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (typeof callback === "string") {
	            ret = "                                                          \n\
	                this.method({{args}}, fn);                                   \n\
	                break;                                                       \n\
	            ".replace(".method", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            ret =  "                                                         \n\
	                callback.call(this, {{args}}, fn);                           \n\
	                break;                                                       \n\
	            ";
	        } else if (receiver !== void 0) {
	            ret =  "                                                         \n\
	                callback.call(receiver, {{args}}, fn);                       \n\
	                break;                                                       \n\
	            ";
	        } else {
	            ret =  "                                                         \n\
	                callback({{args}}, fn);                                      \n\
	                break;                                                       \n\
	            ";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }
	
	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for(var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }
	        var codeForCall;
	        if (typeof callback === "string") {
	            codeForCall = "                                                  \n\
	                this.property.apply(this, args);                             \n\
	            "
	                .replace(".property", generatePropertyAccess(callback));
	        } else if (receiver === THIS) {
	            codeForCall = "                                                  \n\
	                callback.apply(this, args);                                  \n\
	            ";
	        } else {
	            codeForCall = "                                                  \n\
	                callback.apply(receiver, args);                              \n\
	            ";
	        }
	
	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = fn;                                                    \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", codeForCall);
	        return ret;
	    }
	
	    return new Function("Promise",
	                        "callback",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "INTERNAL","                                         \n\
	        var ret = function FunctionName(Parameters) {                        \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._setTrace(void 0);                                       \n\
	            var fn = nodebackForPromise(promise);                            \n\
	            try {                                                            \n\
	                switch(len) {                                                \n\
	                    [CodeForSwitchCase]                                      \n\
	                }                                                            \n\
	            } catch (e) {                                                    \n\
	                var wrapped = maybeWrapAsError(e);                           \n\
	                promise._attachExtraTrace(wrapped);                          \n\
	                promise._reject(wrapped);                                    \n\
	            }                                                                \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        ret.__isPromisified__ = true;                                        \n\
	        return ret;                                                          \n\
	        "
	        .replace("FunctionName", callbackName)
	        .replace("Parameters", parameterDeclaration(newParameterCount))
	        .replace("[CodeForSwitchCase]", generateArgumentSwitchCase()))(
	            Promise,
	            callback,
	            receiver,
	            withAppended,
	            maybeWrapAsError,
	            nodebackForPromise,
	            INTERNAL
	        );
	}
	
	function makeNodePromisifiedClosure(callback, receiver) {
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        if (typeof callback === "string") {
	            callback = _receiver[callback];
	        }
	        var promise = new Promise(INTERNAL);
	        promise._setTrace(void 0);
	        var fn = nodebackForPromise(promise);
	        try {
	            callback.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            var wrapped = maybeWrapAsError(e);
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        }
	        return promise;
	    }
	    promisified.__isPromisified__ = true;
	    return promisified;
	}
	
	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;
	
	function promisifyAll(obj, suffix, filter, promisifier) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);
	
	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        obj[promisifiedKey] = promisifier === makeNodePromisified
	                ? makeNodePromisified(key, THIS, key, fn, suffix)
	                : promisifier(fn);
	    }
	    util.toFastProperties(obj);
	    return obj;
	}
	
	function promisify(callback, receiver) {
	    return makeNodePromisified(callback, receiver, void 0, callback);
	}
	
	Promise.promisify = function Promise$Promisify(fn, receiver) {
	    if (typeof fn !== "function") {
	        throw new TypeError("fn must be a function");
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    return promisify(fn, arguments.length < 2 ? THIS : receiver);
	};
	
	Promise.promisifyAll = function Promise$PromisifyAll(target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function");
	    }
	    options = Object(options);
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;
	
	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier");
	    }
	
	    var keys = util.inheritedDataKeys(target, {includeHidden: true});
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier);
	            promisifyAll(value, suffix, filter, promisifier);
	        }
	    }
	
	    return promisifyAll(target, suffix, filter, promisifier);
	};
	};
	


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, cast) {
	var util = __webpack_require__(5);
	var apiRejection = __webpack_require__(13)(Promise);
	var isObject = util.isObject;
	var es5 = __webpack_require__(36);
	
	function PropertiesPromiseArray(obj) {
	    var keys = es5.keys(obj);
	    var len = keys.length;
	    var values = new Array(len * 2);
	    for (var i = 0; i < len; ++i) {
	        var key = keys[i];
	        values[i] = obj[key];
	        values[i + len] = key;
	    }
	    this.constructor$(values);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);
	
	PropertiesPromiseArray.prototype._init =
	function PropertiesPromiseArray$_init() {
	    this._init$(void 0, -3) ;
	};
	
	PropertiesPromiseArray.prototype._promiseFulfilled =
	function PropertiesPromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val = {};
	        var keyOffset = this.length();
	        for (var i = 0, len = this.length(); i < len; ++i) {
	            val[this._values[i + keyOffset]] = this._values[i];
	        }
	        this._resolve(val);
	    }
	};
	
	PropertiesPromiseArray.prototype._promiseProgressed =
	function PropertiesPromiseArray$_promiseProgressed(value, index) {
	    if (this._isResolved()) return;
	
	    this._promise._progress({
	        key: this._values[index + this.length()],
	        value: value
	    });
	};
	
	PropertiesPromiseArray.prototype.shouldCopyValues =
	function PropertiesPromiseArray$_shouldCopyValues() {
	    return false;
	};
	
	PropertiesPromiseArray.prototype.getActualLength =
	function PropertiesPromiseArray$getActualLength(len) {
	    return len >> 1;
	};
	
	function Promise$_Props(promises) {
	    var ret;
	    var castValue = cast(promises, void 0);
	
	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(Promise.props, void 0, void 0, void 0, void 0);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }
	
	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 4);
	    }
	    return ret;
	}
	
	Promise.prototype.props = function Promise$props() {
	    return Promise$_Props(this);
	};
	
	Promise.props = function Promise$Props(promises) {
	    return Promise$_Props(promises);
	};
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
	var util = __webpack_require__(5);
	var tryCatch4 = util.tryCatch4;
	var tryCatch3 = util.tryCatch3;
	var errorObj = util.errorObj;
	function ReductionPromiseArray(promises, fn, accum, _each) {
	    this.constructor$(promises);
	    this._preservedValues = _each === INTERNAL ? [] : null;
	    this._zerothIsAccum = (accum === void 0);
	    this._gotAccum = false;
	    this._reducingIndex = (this._zerothIsAccum ? 1 : 0);
	    this._valuesPhase = undefined;
	
	    var maybePromise = cast(accum, void 0);
	    var rejected = false;
	    var isPromise = maybePromise instanceof Promise;
	    if (isPromise) {
	        if (maybePromise.isPending()) {
	            maybePromise._proxyPromiseArray(this, -1);
	        } else if (maybePromise.isFulfilled()) {
	            accum = maybePromise.value();
	            this._gotAccum = true;
	        } else {
	            maybePromise._unsetRejectionIsUnhandled();
	            this._reject(maybePromise.reason());
	            rejected = true;
	        }
	    }
	    if (!(isPromise || this._zerothIsAccum)) this._gotAccum = true;
	    this._callback = fn;
	    this._accum = accum;
	    if (!rejected) this._init$(void 0, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);
	
	ReductionPromiseArray.prototype._init =
	function ReductionPromiseArray$_init() {};
	
	ReductionPromiseArray.prototype._resolveEmptyArray =
	function ReductionPromiseArray$_resolveEmptyArray() {
	    if (this._gotAccum || this._zerothIsAccum) {
	        this._resolve(this._preservedValues !== null
	                        ? [] : this._accum);
	    }
	};
	
	ReductionPromiseArray.prototype._promiseFulfilled =
	function ReductionPromiseArray$_promiseFulfilled(value, index) {
	    var values = this._values;
	    if (values === null) return;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var isEach = preservedValues !== null;
	    var gotAccum = this._gotAccum;
	    var valuesPhase = this._valuesPhase;
	    var valuesPhaseIndex;
	    if (!valuesPhase) {
	        valuesPhase = this._valuesPhase = Array(length);
	        for (valuesPhaseIndex=0; valuesPhaseIndex<length; ++valuesPhaseIndex) {
	            valuesPhase[valuesPhaseIndex] = 0;
	        }
	    }
	    valuesPhaseIndex = valuesPhase[index];
	
	    if (index === 0 && this._zerothIsAccum) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	        valuesPhase[index] = ((valuesPhaseIndex === 0)
	            ? 1 : 2);
	    } else if (index === -1) {
	        if (!gotAccum) {
	            this._accum = value;
	            this._gotAccum = gotAccum = true;
	        }
	    } else {
	        if (valuesPhaseIndex === 0) {
	            valuesPhase[index] = 1;
	        }
	        else {
	            valuesPhase[index] = 2;
	            if (gotAccum) {
	                this._accum = value;
	            }
	        }
	    }
	    if (!gotAccum) return;
	
	    var callback = this._callback;
	    var receiver = this._promise._boundTo;
	    var ret;
	
	    for (var i = this._reducingIndex; i < length; ++i) {
	        valuesPhaseIndex = valuesPhase[i];
	        if (valuesPhaseIndex === 2) {
	            this._reducingIndex = i + 1;
	            continue;
	        }
	        if (valuesPhaseIndex !== 1) return;
	
	        value = values[i];
	        if (value instanceof Promise) {
	            if (value.isFulfilled()) {
	                value = value._settledValue;
	            } else if (value.isPending()) {
	                return;
	            } else {
	                value._unsetRejectionIsUnhandled();
	                return this._reject(value.reason());
	            }
	        }
	
	        if (isEach) {
	            preservedValues.push(value);
	            ret = tryCatch3(callback, receiver, value, i, length);
	        }
	        else {
	            ret = tryCatch4(callback, receiver, this._accum, value, i, length);
	        }
	
	        if (ret === errorObj) return this._reject(ret.e);
	
	        var maybePromise = cast(ret, void 0);
	        if (maybePromise instanceof Promise) {
	            if (maybePromise.isPending()) {
	                valuesPhase[i] = 4;
	                return maybePromise._proxyPromiseArray(this, i);
	            } else if (maybePromise.isFulfilled()) {
	                ret = maybePromise.value();
	            } else {
	                maybePromise._unsetRejectionIsUnhandled();
	                return this._reject(maybePromise.reason());
	            }
	        }
	
	        this._reducingIndex = i + 1;
	        this._accum = ret;
	    }
	
	    if (this._reducingIndex < length) return;
	    this._resolve(isEach ? preservedValues : this._accum);
	};
	
	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") return apiRejection("fn must be a function");
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}
	
	Promise.prototype.reduce = function Promise$reduce(fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};
	
	Promise.reduce = function Promise$Reduce(promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	    function(Promise, PromiseArray) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(5);
	
	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);
	
	SettledPromiseArray.prototype._promiseResolved =
	function SettledPromiseArray$_promiseResolved(index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	    }
	};
	
	SettledPromiseArray.prototype._promiseFulfilled =
	function SettledPromiseArray$_promiseFulfilled(value, index) {
	    if (this._isResolved()) return;
	    var ret = new PromiseInspection();
	    ret._bitField = 268435456;
	    ret._settledValue = value;
	    this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected =
	function SettledPromiseArray$_promiseRejected(reason, index) {
	    if (this._isResolved()) return;
	    var ret = new PromiseInspection();
	    ret._bitField = 134217728;
	    ret._settledValue = reason;
	    this._promiseResolved(index, ret);
	};
	
	Promise.settle = function Promise$Settle(promises) {
	    return new SettledPromiseArray(promises).promise();
	};
	
	Promise.prototype.settle = function Promise$settle() {
	    return new SettledPromiseArray(this).promise();
	};
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(5);
	var RangeError = __webpack_require__(7).RangeError;
	var AggregateError = __webpack_require__(7).AggregateError;
	var isArray = util.isArray;
	
	
	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);
	
	SomePromiseArray.prototype._init = function SomePromiseArray$_init() {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(void 0, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};
	
	SomePromiseArray.prototype.init = function SomePromiseArray$init() {
	    this._initialized = true;
	    this._init();
	};
	
	SomePromiseArray.prototype.setUnwrap = function SomePromiseArray$setUnwrap() {
	    this._unwrap = true;
	};
	
	SomePromiseArray.prototype.howMany = function SomePromiseArray$howMany() {
	    return this._howMany;
	};
	
	SomePromiseArray.prototype.setHowMany =
	function SomePromiseArray$setHowMany(count) {
	    if (this._isResolved()) return;
	    this._howMany = count;
	};
	
	SomePromiseArray.prototype._promiseFulfilled =
	function SomePromiseArray$_promiseFulfilled(value) {
	    if (this._isResolved()) return;
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	    }
	
	};
	SomePromiseArray.prototype._promiseRejected =
	function SomePromiseArray$_promiseRejected(reason) {
	    if (this._isResolved()) return;
	    this._addRejected(reason);
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            e.push(this._values[i]);
	        }
	        this._reject(e);
	    }
	};
	
	SomePromiseArray.prototype._fulfilled = function SomePromiseArray$_fulfilled() {
	    return this._totalResolved;
	};
	
	SomePromiseArray.prototype._rejected = function SomePromiseArray$_rejected() {
	    return this._values.length - this.length();
	};
	
	SomePromiseArray.prototype._addRejected =
	function SomePromiseArray$_addRejected(reason) {
	    this._values.push(reason);
	};
	
	SomePromiseArray.prototype._addFulfilled =
	function SomePromiseArray$_addFulfilled(value) {
	    this._values[this._totalResolved++] = value;
	};
	
	SomePromiseArray.prototype._canPossiblyFulfill =
	function SomePromiseArray$_canPossiblyFulfill() {
	    return this.length() - this._rejected();
	};
	
	SomePromiseArray.prototype._getRangeError =
	function SomePromiseArray$_getRangeError(count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};
	
	SomePromiseArray.prototype._resolveEmptyArray =
	function SomePromiseArray$_resolveEmptyArray() {
	    this._reject(this._getRangeError(0));
	};
	
	function Promise$_Some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}
	
	Promise.some = function Promise$Some(promises, howMany) {
	    return Promise$_Some(promises, howMany);
	};
	
	Promise.prototype.some = function Promise$some(howMany) {
	    return Promise$_Some(this, howMany);
	};
	
	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, PromiseArray) {
	var util = __webpack_require__(5);
	var async = __webpack_require__(6);
	var errors = __webpack_require__(7);
	var tryCatch1 = util.tryCatch1;
	var errorObj = util.errorObj;
	
	Promise.prototype.progressed = function Promise$progressed(handler) {
	    return this._then(void 0, void 0, handler, void 0, void 0);
	};
	
	Promise.prototype._progress = function Promise$_progress(progressValue) {
	    if (this._isFollowingOrFulfilledOrRejected()) return;
	    this._progressUnchecked(progressValue);
	
	};
	
	Promise.prototype._clearFirstHandlerData$Base =
	Promise.prototype._clearFirstHandlerData;
	Promise.prototype._clearFirstHandlerData =
	function Promise$_clearFirstHandlerData() {
	    this._clearFirstHandlerData$Base();
	    this._progressHandler0 = void 0;
	};
	
	Promise.prototype._progressHandlerAt =
	function Promise$_progressHandlerAt(index) {
	    return index === 0
	        ? this._progressHandler0
	        : this[(index << 2) + index - 5 + 2];
	};
	
	Promise.prototype._doProgressWith =
	function Promise$_doProgressWith(progression) {
	    var progressValue = progression.value;
	    var handler = progression.handler;
	    var promise = progression.promise;
	    var receiver = progression.receiver;
	
	    var ret = tryCatch1(handler, receiver, progressValue);
	    if (ret === errorObj) {
	        if (ret.e != null &&
	            ret.e.name !== "StopProgressPropagation") {
	            var trace = errors.canAttach(ret.e)
	                ? ret.e : new Error(ret.e + "");
	            promise._attachExtraTrace(trace);
	            promise._progress(ret.e);
	        }
	    } else if (ret instanceof Promise) {
	        ret._then(promise._progress, null, null, promise, void 0);
	    } else {
	        promise._progress(ret);
	    }
	};
	
	
	Promise.prototype._progressUnchecked =
	function Promise$_progressUnchecked(progressValue) {
	    if (!this.isPending()) return;
	    var len = this._length();
	    var progress = this._progress;
	    for (var i = 0; i < len; i++) {
	        var handler = this._progressHandlerAt(i);
	        var promise = this._promiseAt(i);
	        if (!(promise instanceof Promise)) {
	            var receiver = this._receiverAt(i);
	            if (typeof handler === "function") {
	                handler.call(receiver, progressValue, promise);
	            } else if (receiver instanceof Promise && receiver._isProxied()) {
	                receiver._progressUnchecked(progressValue);
	            } else if (receiver instanceof PromiseArray) {
	                receiver._promiseProgressed(progressValue, promise);
	            }
	            continue;
	        }
	
	        if (typeof handler === "function") {
	            async.invoke(this._doProgressWith, this, {
	                handler: handler,
	                promise: promise,
	                receiver: this._receiverAt(i),
	                value: progressValue
	            });
	        } else {
	            async.invoke(progress, promise, progressValue);
	        }
	    }
	};
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var errors = __webpack_require__(7);
	var canAttach = errors.canAttach;
	var async = __webpack_require__(6);
	var CancellationError = errors.CancellationError;
	
	Promise.prototype._cancel = function Promise$_cancel(reason) {
	    if (!this.isCancellable()) return this;
	    var parent;
	    var promiseToReject = this;
	    while ((parent = promiseToReject._cancellationParent) !== void 0 &&
	        parent.isCancellable()) {
	        promiseToReject = parent;
	    }
	    promiseToReject._attachExtraTrace(reason);
	    promiseToReject._rejectUnchecked(reason);
	};
	
	Promise.prototype.cancel = function Promise$cancel(reason) {
	    if (!this.isCancellable()) return this;
	    reason = reason !== void 0
	        ? (canAttach(reason) ? reason : new Error(reason + ""))
	        : new CancellationError();
	    async.invokeLater(this._cancel, this, reason);
	    return this;
	};
	
	Promise.prototype.cancellable = function Promise$cancellable() {
	    if (this._cancellable()) return this;
	    this._setCancellable();
	    this._cancellationParent = void 0;
	    return this;
	};
	
	Promise.prototype.uncancellable = function Promise$uncancellable() {
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 2 | 4);
	    ret._follow(this);
	    ret._unsetCancellable();
	    return ret;
	};
	
	Promise.prototype.fork =
	function Promise$fork(didFulfill, didReject, didProgress) {
	    var ret = this._then(didFulfill, didReject, didProgress,
	                         void 0, void 0);
	
	    ret._setCancellable();
	    ret._cancellationParent = void 0;
	    return ret;
	};
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;
	
	Promise.prototype.filter = function Promise$filter(fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};
	
	Promise.filter = function Promise$Filter(promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function Promise$_Any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    if (promise.isRejected()) {
	        return promise;
	    }
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}
	
	Promise.any = function Promise$Any(promises) {
	    return Promise$_Any(promises);
	};
	
	Promise.prototype.any = function Promise$any() {
	    return Promise$_Any(this);
	};
	
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	
	Promise.prototype.each = function Promise$each(fn) {
	    return PromiseReduce(this, fn, null, INTERNAL);
	};
	
	Promise.each = function Promise$Each(promises, fn) {
	    return PromiseReduce(promises, fn, null, INTERNAL);
	};
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	module.exports = function (Promise, apiRejection, cast) {
	    var TypeError = __webpack_require__(7).TypeError;
	    var inherits = __webpack_require__(5).inherits;
	    var PromiseInspection = Promise.PromiseInspection;
	
	    function inspectionMapper(inspections) {
	        var len = inspections.length;
	        for (var i = 0; i < len; ++i) {
	            var inspection = inspections[i];
	            if (inspection.isRejected()) {
	                return Promise.reject(inspection.error());
	            }
	            inspections[i] = inspection.value();
	        }
	        return inspections;
	    }
	
	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }
	
	    function castPreservingDisposable(thenable) {
	        var maybePromise = cast(thenable, void 0);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = Promise.defer();
	        function iterator() {
	            if (i >= len) return ret.resolve();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = cast(maybePromise._getDisposer()
	                                        .tryDispose(inspection), void 0);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret.promise;
	    }
	
	    function disposerSuccess(value) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = value;
	        inspection._bitField = 268435456;
	        return dispose(this, inspection).thenReturn(value);
	    }
	
	    function disposerFail(reason) {
	        var inspection = new PromiseInspection();
	        inspection._settledValue = reason;
	        inspection._bitField = 134217728;
	        return dispose(this, inspection).thenThrow(reason);
	    }
	
	    function Disposer(data, promise) {
	        this._data = data;
	        this._promise = promise;
	    }
	
	    Disposer.prototype.data = function Disposer$data() {
	        return this._data;
	    };
	
	    Disposer.prototype.promise = function Disposer$promise() {
	        return this._promise;
	    };
	
	    Disposer.prototype.resource = function Disposer$resource() {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return null;
	    };
	
	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var ret = resource !== null
	            ? this.doDispose(resource, inspection) : null;
	        this._promise._unsetDisposable();
	        this._data = this._promise = null;
	        return ret;
	    };
	
	    Disposer.isDisposer = function Disposer$isDisposer(d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };
	
	    function FunctionDisposer(fn, promise) {
	        this.constructor$(fn, promise);
	    }
	    inherits(FunctionDisposer, Disposer);
	
	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };
	
	    Promise.using = function Promise$using() {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") return apiRejection("fn must be a function");
	        len--;
	        var resources = new Array(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = arguments[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            }
	            resources[i] = resource;
	        }
	
	        return Promise.settle(resources)
	            .then(inspectionMapper)
	            .spread(fn)
	            ._then(disposerSuccess, disposerFail, void 0, resources, void 0);
	    };
	
	    Promise.prototype._setDisposable =
	    function Promise$_setDisposable(disposer) {
	        this._bitField = this._bitField | 262144;
	        this._disposer = disposer;
	    };
	
	    Promise.prototype._isDisposable = function Promise$_isDisposable() {
	        return (this._bitField & 262144) > 0;
	    };
	
	    Promise.prototype._getDisposer = function Promise$_getDisposer() {
	        return this._disposer;
	    };
	
	    Promise.prototype._unsetDisposable = function Promise$_unsetDisposable() {
	        this._bitField = this._bitField & (~262144);
	        this._disposer = void 0;
	    };
	
	    Promise.prototype.disposer = function Promise$disposer(fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this);
	        }
	        throw new TypeError();
	    };
	
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	}
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	var isES5 = (function(){
	    "use strict";
	    return this === void 0;
	})();
	
	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        keys: Object.keys,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;
	
	    var ObjectKeys = function ObjectKeys(o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    }
	
	    var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    }
	
	    var ObjectFreeze = function ObjectFreeze(obj) {
	        return obj;
	    }
	
	    var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    }
	
	    var ArrayIsArray = function ArrayIsArray(obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    }
	
	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5
	    };
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	var schedule;
	var _MutationObserver;
	if (typeof process === "object" && typeof process.version === "string") {
	    schedule = function Promise$_Scheduler(fn) {
	        process.nextTick(fn);
	    };
	}
	else if ((typeof MutationObserver !== "undefined" &&
	         (_MutationObserver = MutationObserver)) ||
	         (typeof WebKitMutationObserver !== "undefined" &&
	         (_MutationObserver = WebKitMutationObserver))) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var queuedFn = void 0;
	        var observer = new _MutationObserver(
	            function Promise$_Scheduler() {
	                var fn = queuedFn;
	                queuedFn = void 0;
	                fn();
	            }
	       );
	        observer.observe(div, {
	            attributes: true
	        });
	        return function Promise$_Scheduler(fn) {
	            queuedFn = fn;
	            div.classList.toggle("foo");
	        };
	
	    })();
	}
	else if (typeof setTimeout !== "undefined") {
	    schedule = function Promise$_Scheduler(fn) {
	        setTimeout(fn, 0);
	    };
	}
	else throw new Error("no async scheduler available");
	module.exports = schedule;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The MIT License (MIT)
	 * 
	 * Copyright (c) 2014 Petka Antonov
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 * 
	 */
	"use strict";
	function arrayCopy(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	    }
	}
	
	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	    this._makeCapacity();
	}
	
	Queue.prototype._willBeOverCapacity =
	function Queue$_willBeOverCapacity(size) {
	    return this._capacity < size;
	};
	
	Queue.prototype._pushOne = function Queue$_pushOne(arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};
	
	Queue.prototype.push = function Queue$push(fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};
	
	Queue.prototype.shift = function Queue$shift() {
	    var front = this._front,
	        ret = this[front];
	
	    this[front] = void 0;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};
	
	Queue.prototype.length = function Queue$length() {
	    return this._length;
	};
	
	Queue.prototype._makeCapacity = function Queue$_makeCapacity() {
	    var len = this._capacity;
	    for (var i = 0; i < len; ++i) {
	        this[i] = void 0;
	    }
	};
	
	Queue.prototype._checkCapacity = function Queue$_checkCapacity(size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 3);
	    }
	};
	
	Queue.prototype._resizeTo = function Queue$_resizeTo(capacity) {
	    var oldFront = this._front;
	    var oldCapacity = this._capacity;
	    var oldQueue = new Array(oldCapacity);
	    var length = this.length();
	
	    arrayCopy(this, 0, oldQueue, 0, oldCapacity);
	    this._capacity = capacity;
	    this._makeCapacity();
	    this._front = 0;
	    if (oldFront + length <= oldCapacity) {
	        arrayCopy(oldQueue, oldFront, this, 0, length);
	    } else {        var lengthBeforeWrapping =
	            length - ((oldFront + length) & (oldCapacity - 1));
	
	        arrayCopy(oldQueue, oldFront, this, 0, lengthBeforeWrapping);
	        arrayCopy(oldQueue, 0, this, lengthBeforeWrapping,
	                    length - lengthBeforeWrapping);
	    }
	};
	
	module.exports = Queue;


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNGJjMzFhNGMyNTI1OWIxZTVhNCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9kZWx0YS5qcyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8vc291cmNlL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL2JsdWViaXJkLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi91dGlsLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9hc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vZXJyb3JzLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi90aGVuYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL3Byb21pc2VfYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL2NhcHR1cmVkX3RyYWNlLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9jYXRjaF9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL3Byb21pc2VfcmVzb2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL2Vycm9yc19hcGlfcmVqZWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9maW5hbGx5LmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9kaXJlY3RfcmVzb2x2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vc3luY2hyb25vdXNfaW5zcGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vam9pbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vdGltZXJzLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9yYWNlLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9jYWxsX2dldC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vZ2VuZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vbWFwLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9ub2RlaWZ5LmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9wcm9taXNpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL3Byb3BzLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vc29tZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL2NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vZmlsdGVyLmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9hbnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL2VhY2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9ibHVlYmlyZC9qcy9tYWluL3VzaW5nLmpzIiwid2VicGFjazovLy8od2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vZXM1LmpzIiwid2VicGFjazovLy8uL34vYmx1ZWJpcmQvanMvbWFpbi9zY2hlZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JsdWViaXJkL2pzL21haW4vcXVldWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBWSx3QkFBWSx3QkFBVyxDQUFHLDBDQUFVLE9BQU0sQ0FBRyxHQUFHO0FBQ25FLGNBQVcsQ0FBQztBQU1SLFlBQUssRUFBSSxXQUFVLENBQUMsU0FBVTtBQUc3QixnQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUViLG1CQUFVLEVBQUksR0FBQyxDQUFDO0FBR3BCLFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFHZCx1QkFBZ0IsQ0FBaEIsVUFBa0IsSUFBOEM7O0FBQTdDLGdCQUFHO0FBQUcsdUJBQVU7QUFBRyxtQkFBTTtBQUFHLHFCQUFRO0FBQUcsa0JBQUs7QUFHMUQsNEJBQWUsRUFBSSxHQUFDLENBQUM7QUFHekIsZ0JBQU8sQ0FBRSxJQUFHLENBQUMsRUFBSTtBQUNoQixjQUFHLENBQUcsS0FBRztBQUNULGVBQUksQ0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQjs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUyx5Q0FBeUM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRDtBQUNwRCwyREFBMEQ7QUFDMUQseUVBQXdFO0FBQ3hFO0FBQ0EsMENBQXlDLDRCQUE0QixpQkFBaUIsYUFBYSxTQUFTO0FBQzVHLG1EQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQzdqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQztBQUNEO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0EsVUFBUywrQkFBK0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVMscUNBQXFDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTLDJDQUEyQztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUyxpREFBaUQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVMsaUNBQWlDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxrQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxnQ0FBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQWtCLFdBQVc7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzdRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQSx3QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzNNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXVDLFNBQVM7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7Ozs7OztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCwwQ0FBeUMsZ0NBQWdDLGlCQUFpQixhQUFhLFNBQVM7QUFDaEg7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QixtQ0FBa0M7QUFDbEMsMkNBQTBDO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF1QixZQUFZO0FBQ25DO0FBQ0EsMEJBQXlCO0FBQ3pCLHNDQUFxQztBQUNyQyxxQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixVQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLDRCQUE0QixpQkFBaUIsYUFBYSxTQUFTO0FBQ3BHO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLFNBQVM7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQThCO0FBQzlCLHNCQUFxQjtBQUNyQixvREFBbUQ7QUFDbkQsNkRBQTREO0FBQzVELHNFQUFxRTtBQUNyRSw2Q0FBNEM7QUFDNUMsNkRBQTREO0FBQzVELFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckIsaUNBQWdDO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyxnQ0FBZ0MsaUJBQWlCLGFBQWEsU0FBUztBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7OztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjs7O0FBRzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGdCQUFnQjtBQUMz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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFNBQVM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyx5QkFBeUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXFDLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMseUJBQXlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUE4QixTQUFTO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvTEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOzs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELGlCQUFnQjtBQUNoQixpQkFBZ0I7QUFDaEIsbUJBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyxPQUFPO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzRiYzMxYTRjMjUyNTliMWU1YTRcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICdibHVlYmlyZCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFAsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0Ly8gdGhlIGRlbHRhLW1vZGVsIGNsYXNzLCB3aGljaCBpcyB0aGUgY29udGFpbmVyIG9mIGFsbCBvcGVyYXRpb24gdHlwZXMsXG5cdC8vIGFsbCBkZWx0YXMsIHRoZWlyIG9yZGVyaW5nIGFuZCBydWxlc1xuXHR2YXIgQ29yZURNID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHZhciBfb3BUeXBlcyA9IHt9O1xuXHRcdC8qIHRoZSBuYW1lIGFuZCBkZWx0YSBjbGFzc2VzICovXG5cdFx0dmFyIF9jb21wb3NlRm5zID0gW107XG5cdFx0LyogdGhlIGNhc2UgZGlzdGluY3Rpb25zIG9mIGRlbHRhIGNvbXBvc2l0aW9uICovXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZnVsbHkgZGVmaW5lIGEgbmV3IGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uVHlwZSh7bmFtZSwgY29uc3RydWN0b3IsIGFwcGx5VG8sIHByb3RvdHlwZSwgbWV0aG9kfSkge1xuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhLlxuXHRcdFx0XHQvLyBJdCBpcyBwdXQgb24gYSB0ZW1wb3Jhcnkgb2JqZWN0XG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdERlbHRhOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIHNwZWNpZmljIERlbHRhIGNsYXNzXG5cdFx0XHRcdFUuZXh0ZW5kKF9vcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdFx0YXBwbHlUbzogYXBwbHlUbyxcblx0XHRcdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wMikpIHsgcmV0dXJuIHRoaXMgfVxuXHRcdFx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0X2NvbXBvc2VGbnMuc29tZSgoe29wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbn0pID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gb3AxVHlwZSAmJiBvcDIudHlwZSA9PT0gb3AyVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChmb3VuZENvbXBvc2VGbikge1xuXHRcdFx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbih0aGlzLCBwcm9wZXJ0eSwgb3AyKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRgWW91IGNhbm5vdCBmb2xsb3cgYSAnJHt0aGlzLnR5cGV9JyBvcGVyYXRpb24gYCArXG5cdFx0XHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMSA9IHRoaXMudHlwZTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGFcblx0XHRcdFx0Ly8gKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyB0aGUgZmlyc3QgZGVsdGEgdHlwZSB0byBiZSBkZWZpbmVkKVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID1cblx0XHRcdFx0XHRcdFUuaXNEZWZpbmVkKG1ldGhvZCkgPyBtZXRob2QgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbbmFtZV0sIHByb3BlcnR5LCB2YWx1ZXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBnaXZlIGEgbmV3IG5hbWUgdG8gKGEgdmFyaWF0aW9uIG9mKSBhbiBleGlzdGluZyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvbkFsaWFzKHtuYW1lLCB0YXJnZXQsIHRyYW5zZm9ybX0pIHtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW3RhcmdldF0sIHByb3BlcnR5LCB0cmFuc2Zvcm0odmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID0gX29wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBhIG5ldyB2YWxpZCBjYXNlIGRpc3RpbmN0aW9uIGZvciBkZWx0YSBjb21wb3NpdGlvblxuXHRcdFx0X2FkZENvbXBvc2l0aW9uUnVsZShvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4pIHtcblx0XHRcdFx0X2NvbXBvc2VGbnMucHVzaCh7IG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbiB9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIGdldCBhIG5ldyBkZWx0YSBvZiBhIGdpdmVuIHR5cGUsIGNvbnN0cnVjdGVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuXHRcdFx0X25ld0RlbHRhKHR5cGUsIC4uLnZhbHVlcykge1xuXHRcdFx0XHRyZXR1cm4gVS5hcHBseUNvbnN0cnVjdG9yKF9vcFR5cGVzW3R5cGVdLkRlbHRhLCB2YWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gYW4gZWFzeSB3YXkgdG8gZ2V0IHRoZSAnbW9kaWZ5JyBkZWx0YSBjb25zdHJ1Y3RvclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnRGVsdGEnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEgfVxuXHRcdH0pO1xuXG5cdFx0Ly8gdGhlIG1vZGlmeSBvcGVyYXRpb24gKE1VU1QgQkUgVEhFIEZJUlNUIE9QRVJBVElPTiBUWVBFIFRPIEJFIERFRklORUQpXG5cdFx0dmFyIHRoaXNETSA9IHRoaXM7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnbW9kaWZ5Jyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBNb2RpZnkoZGVsdGFEZXNjcmlwdGlvbiwgb3BlcmF0aW9ucykge1xuXHRcdFx0XHQvLyBub3JtYWxpemUgdGhpbmdzXG5cdFx0XHRcdGRlbHRhRGVzY3JpcHRpb24gPSBkZWx0YURlc2NyaXB0aW9uIHx8IHt9O1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zIHx8IHt9O1xuXG5cdFx0XHRcdC8vIHByb2Nlc3MgcG9zc2libGUgZGVsdGEgZGVzY3JpcHRpb25cblx0XHRcdFx0T2JqZWN0LmtleXMoZGVsdGFEZXNjcmlwdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoID0ga2V5Lm1hdGNoKC9eKFxcdyspXFxzKyhbXFx3XFwuXSspJC8pO1xuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0dmFyIG9wZXJhdGlvbiA9IG1hdGNoWzFdO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gbWF0Y2hbMl07XG5cdFx0XHRcdFx0XHRVLmFzc2VydChvcGVyYXRpb24gaW4gX29wVHlwZXMsXG5cdFx0XHRcdFx0XHRcdFx0YEkgZG9uJ3Qga25vdyB0aGUgJyR7b3BlcmF0aW9ufScgb3BlcmF0aW9uLmApO1xuXHRcdFx0XHRcdFx0dGhpc1tvcGVyYXRpb25dKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uW2tleV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wZXJ0eSkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpbcHJvcGVydHldYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9ialtwcm9wZXJ0eV0sIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwcm90b3R5cGU6IHtcblx0XHRcdFx0c2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XSkpIHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0dmFyIGRvdEluZGV4ID0gcHJvcGVydHkuaW5kZXhPZignLicpO1xuXHRcdFx0XHRcdGlmIChkb3RJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIGRvdC1zZXBhcmF0ZWQgcGF0aDsgcmVjdXJzaXZlbHkgY3JlYXRlIGEgbW9kaWZ5LWNoYWluXG5cdFx0XHRcdFx0XHR2YXIgYWN0dWFsUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZSgwLCBkb3RJbmRleCk7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdE9mUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZShkb3RJbmRleCArIDEpO1xuXHRcdFx0XHRcdFx0dmFyIG5ld01vZGlmeURlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzWydtb2RpZnknXSwgYWN0dWFsUHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld01vZGlmeURlbHRhW29wVHlwZS5uYW1lXS5hcHBseShuZXdNb2RpZnlEZWx0YSwgW3Jlc3RPZlByb3BlcnR5XS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIHNpbmdsZSBuYW1lOyBhZGQgdGhlIG5ldyBkZWx0YSBkaXJlY3RseVxuXHRcdFx0XHRcdFx0dmFyIF9uZXdEZWx0YSA9IHRoaXNETS5fbmV3RGVsdGEuYXBwbHkodGhpc0RNLCBbb3BUeXBlLm5hbWVdLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShwcm9wZXJ0eSwgX25ld0RlbHRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0gPSBfbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZXRob2QocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb24pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIHByb3BlcnR5LCBbZGVsdGFEZXNjcmlwdGlvbl0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvd1xuXHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdHZhciBrZWVwU2Vjb25kID0gKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IGQyIH07XG5cdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMVtwXSwgJ3ZhbHVlJykgfTtcblxuXHRmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdH1cblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBhIGRlbHRhIG1vZGVsIGNsYXNzIHdpdGggYSBudW1iZXIgb2YgY29tbW9uIG9wZXJhdGlvbnMgYWxyZWFkeSBhZGRlZCBpblxuXHR2YXIgRXh0ZW5kZWRETSA9IFUubmV3U3ViY2xhc3MoQ29yZURNLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gdGhlIG90aGVyIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FkZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWRkKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnYWRkJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlcGxhY2UnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlcGxhY2UodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVwbGFjZScpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZW1vdmUnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlbW92ZSgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3Byb3BlcnR5XTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdmb3JiaWQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEZvcmJpZCgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7IGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnZm9yYmlkJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvLyBjb21wb3NpdGlvbiBvZiB0aGUgc3RhbmRhcmQgb3BlcmF0aW9uIHR5cGVzXG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVwbGFjZScsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdhZGQnLCBkMi52YWx1ZSkgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlbW92ZScsIChkMSwgcCkgPT4geyBkMVtwXSA9IENvcmVETS5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdyZXBsYWNlJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnYWRkJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblxuXG5cdFx0Ly8gJ2FsdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FsdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBbHRlcih2YWx1ZSwgYWxpYXMpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXHRcdFx0XHR0aGlzLmFsaWFzID0gYWxpYXMgfHwgJ2FsdGVyJztcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgdGhpcy5hbGlhcyk7XG5cdFx0XHRcdHRoaXMudmFsdWUuZm9yRWFjaCgoc3ViT3ApID0+IHtcblx0XHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHBhcnRUd28gPSBzdWJPcC52YWx1ZTtcblx0XHRcdFx0XHRpZiAoc3ViT3AudHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSBlbHNlIHsgLyogJ2FwcGVuZCcgb3IgJ2luc2VydCcgKi9cblx0XHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRbXS5wdXNoLmFwcGx5KGQxW3BdLnZhbHVlLCBkMi52YWx1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXG5cblx0XHQvLyB0aGUgJ3ByZXBlbmQnLCAnaW5zZXJ0JyBhbmQgJ2FwcGVuZCcgb3BlcmF0aW9uIHR5cGUgYWxpYXNlc1xuXHRcdFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ10uZm9yRWFjaCgob3BUeXBlKSA9PiB7XG5cdFx0XHR0aGlzLl9hZGRPcGVyYXRpb25BbGlhcyh7XG5cdFx0XHRcdG5hbWU6IG9wVHlwZSxcblx0XHRcdFx0dGFyZ2V0OiAnYWx0ZXInLFxuXHRcdFx0XHR0cmFuc2Zvcm06IChhcmdzKSA9PiBbW3sgdHlwZTogb3BUeXBlLCB2YWx1ZTogYXJnc1swXSB9XSwgb3BUeXBlXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdC8vICdhZnRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZnRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWZ0ZXIodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgJ2FmdGVyJyk7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gUC5yZXNvbHZlKHBhcnRPbmUuYXBwbHkodGhpcywgYXJncykpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsICdhZnRlcicpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnaW5zZXJ0JywgJ2FmdGVyJywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAnaW5zZXJ0JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdC8qIFRPRE86IHRoZSBhYm92ZSBjb21wb3NpdGlvbnMgb2YgJ2luc2VydCcgYW5kICdhZnRlcicgYXJlIG5vdCBhY3R1YWxseSBjb3JyZWN0IChlLmcuLCBub3QgYXNzb2NpYXRpdmUpLiAqL1xuXHR9KTtcblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBhIGRlbHRhIG1vZGVsIGNsYXNzIHdpdGggY29tbW9uIG9wZXJhdGlvbnMgYW5kIGEgcGFydGlhbGx5IG9yZGVyZWQgc2V0IG9mIGRlbHRhc1xuXHR2YXIgUGFydGlhbGx5T3JkZXJlZERNID0gVS5uZXdTdWJjbGFzcyhFeHRlbmRlZERNLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9ncmFwaCA9IG5ldyBKc0dyYXBoKCk7XG5cdFx0LyogZGVsdGFzIGluIGEgc3RyaWN0IHBhcnRpYWwgb3JkZXIgKi9cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBnZXQgdGhlIGdyYXBoIG9mIGRlbHRhc1xuXHRcdFx0Z3JhcGgoKSB7IHJldHVybiBfZ3JhcGggfVxuXHRcdH0pO1xuXG5cdFx0dmFyIF9kZWx0YUNvbmRpdGlvbnMgPSB7fTtcblx0XHQvKiBhcnJheXMgb2YgYXJyYXlzOiBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybXMgKi9cblx0XHR2YXIgX3NldHRsZWREZWx0YUNvbmRpdGlvbnMgPSB7fTtcblx0XHQvKiBCb29sZWFucyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyRGlzanVuY3QoaWQsIGRpc2p1bmN0KSB7XG5cdFx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbaWRdID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoX2RlbHRhQ29uZGl0aW9uc1tpZF0gIT09IHRydWUpIHtcblx0XHRcdFx0VS5hcnJheShfZGVsdGFDb25kaXRpb25zLCAnaWQnKS5wdXNoKGRpc2p1bmN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmIChfY29uZGl0aW9uc1Vuc2V0dGxlZCkge1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgoaWQpID0+IHtcblx0XHRcdFx0XHRcdGlmIChfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tpZF0pIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9kZWx0YUNvbmRpdGlvbnNbaWRdKSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKF9kZWx0YUNvbmRpdGlvbnNbaWRdLnNvbWUoKGRpc2p1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNqdW5jdC5ldmVyeSgoY29uanVuY3QpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tjb25qdW5jdF0pKSkge1xuXHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tpZF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gcmVnaXN0ZXIgYSBuZXcgZGVsdGEgaW50byB0aGUgZGVsdGEgbW9kZWxcblx0XHRcdHJlZ2lzdGVyKGNvbmZpZykge1xuXG5cdFx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0XHRVLmFzc2VydChjb25maWcgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgQSBkZWx0YSBzaG91bGQgYmUgZ2l2ZW4gYXMgYW4gb2JqZWN0LmApO1xuXHRcdFx0XHRVLmFzc2VydCh0eXBlb2YgY29uZmlnLmlkID09PSAnc3RyaW5nJyxcblx0XHRcdFx0XHRcdGBBIGRlbHRhIHNob3VsZCBoYXZlIGEgdW5pcXVlICdpZCcuYCk7XG5cblx0XHRcdFx0Ly8gbm9ybWFsaXplIGNvbmZpZ3VyYXRpb25cblx0XHRcdFx0aWYgKGNvbmZpZy5yZXNvbHZlcyAmJiBjb25maWcucmVzb2x2ZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGNvbmZpZy5tYW51YWxseVNlbGVjdGFibGUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0WydtYW51YWxseVNlbGVjdGFibGUnLCB0cnVlXSxcblx0XHRcdFx0XHRbJ29ubHlJZicsIFtdXSxcblx0XHRcdFx0XHRbJ2FmdGVyJywgW11dLFxuXHRcdFx0XHRcdFsnc2VsZWN0cycsIFtdXSxcblx0XHRcdFx0XHRbJ2V4cGVjdHMnLCBbXV0sXG5cdFx0XHRcdFx0WydyZXF1aXJlcycsIFtdXVxuXHRcdFx0XHRdLmZvckVhY2goKHByb3AsIGRlZikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChjb25maWdbcHJvcF0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uZmlnW3Byb3BdID0gZGVmO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBjcmVhdGUgZGVsdGFcblx0XHRcdFx0dmFyIGRlbHRhID0gbmV3IHRoaXMuRGVsdGEoKTtcblxuXHRcdFx0XHQvLyBjcmVhdGUgZGVsdGEgcHJvcGVydGllc1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhkZWx0YSwge1xuXHRcdFx0XHRcdGlkOiB7IGdldCgpIHsgcmV0dXJuIGNvbmZpZy5pZCB9IH0sXG5cdFx0XHRcdFx0bWFudWFsbHlTZWxlY3RhYmxlOiB7IGdldCgpIHsgcmV0dXJuICEhY29uZmlnLm1hbnVhbGx5U2VsZWN0YWJsZSB9IH0sXG5cdFx0XHRcdFx0c2VsZWN0ZWQ6IHtcblx0XHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbY29uZmlnLmlkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGlmOiB7XG5cdFx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChjb25maWcuaWYgPT09IHRydWUpIHsgLyogbGl0ZXJhbCAndHJ1ZScgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChjb25maWcuaWYgfHwgY29uZmlnLmlmZiB8fCBjb25maWcucmVzb2x2ZXMpIHsgLyogYXJyYXkgb2YgaWRzICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLmlmIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuaWZmIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25maWcucmVzb2x2ZXMgfHwgW11cblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgeyAvKiBubyBpZiBjbGF1c2UgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbmx5SWY6IHtcblx0XHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5vbmx5SWYgfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuaWZmIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLmV4cGVjdHMgfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcucmVzb2x2ZXMgfHwgW11cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGFmdGVyOiB7XG5cdFx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuYWZ0ZXIgfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcuZXhwZWN0cyB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5yZXNvbHZlcyB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdGNvbmZpZy5yZXF1aXJlcyB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VsZWN0czoge1xuXHRcdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uZmlnLnNlbGVjdHMgfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25maWcucmVxdWlyZXMgfHwgW11cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHVwZGF0ZSBjb25kaXRpb25zXG5cdFx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3QoZGVsdGEuaWQsIGRlbHRhLmlmKTtcblx0XHRcdFx0ZGVsdGEuc2VsZWN0cy5mb3JFYWNoKChpZCkgPT4geyBfcmVnaXN0ZXJEaXNqdW5jdChpZCwgW2RlbHRhLmlkXSk7IH0pO1xuXG5cdFx0XHRcdC8vIHVwZGF0ZSB0aGUgZ3JhcGhcblx0XHRcdFx0X2dyYXBoLmFkZFZlcnRleChkZWx0YS5pZCwgZGVsdGEpO1xuXHRcdFx0XHRkZWx0YS5hZnRlci5mb3JFYWNoKChpZCkgPT4ge1xuXHRcdFx0XHRcdF9ncmFwaC5jcmVhdGVFZGdlKGlkLCBkZWx0YS5pZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRVLmFzc2VydCghX2dyYXBoLmhhc0N5Y2xlKCksXG5cdFx0XHRcdFx0XHRgVGhlIGRlbHRhICR7ZGVsdGEuaWR9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHRcdFx0Ly8gcmV0dXJuIHRoZSBkZWx0YSwgc28gYWRkaXRpb25hbCBvcGVyYXRpb25zIGNhbiBiZSBhZGRlZCB0byBpdFxuXHRcdFx0XHRyZXR1cm4gZGVsdGE7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIHNlbGVjdCBhIG51bWJlciBvZiBkZWx0YXMgYnkgaWQsIHNvIHRoZXkgd2lsbCBiZSBhcHBsaWVkIHdoZW4gdGhpcyBkZWx0YSBtb2RlbCBpcyBhcHBsaWVkXG5cdFx0XHRzZWxlY3QoLi4uaWRzKSB7XG5cdFx0XHRcdC8vIHByb2Nlc3Mgc2luZ2xlIHBsdWdpbiBuYW1lIGJ5IG1ha2luZyBpdHMgY29uZGl0aW9uICd0cnVlJ1xuXHRcdFx0XHRpZHMuZm9yRWFjaCgoaWQpID0+IHsgX3JlZ2lzdGVyRGlzanVuY3QoaWQsIHRydWUpIH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gcmVnaXN0ZXIgYSBuYW1lZCB2YXJpYXRpb24gcG9pbnQgaW4gdGhlIGNvZGUtYmFzZVxuXHRcdFx0Ly8gKGkuZS4sIGFwcGx5IGFsbCByZWdpc3RlcmVkIGRlbHRhcyBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgdmFsdWUpXG5cdFx0XHR2cChuYW1lLCB2YWwpIHtcblxuXHRcdFx0XHQvLyBhIHRlbXBvcmFyeSBvYmplY3QgdG8gaG9sZCB0aGUgdmFsdWUgd2hpbGUgaXQgaXMgdW5kZXJnb2luZyBjaGFuZ2Vcblx0XHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWw7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYW55ICdvbmx5SWYnIGNvbmRpdGlvbnMgYXJlIGJlaW5nIHZpb2xhdGVkXG5cdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChpZCwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRVLmFzc2VydCghZGVsdGEuc2VsZWN0ZWQgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBkLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnb25seUlmJyBjb25kaXRpb24gb2YgZGVsdGEgJyR7ZGVsdGEuaWR9JyB3YXMgdmlvbGF0ZWQuYCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGFwcGx5IHRoZSBkZWx0YVxuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgoaWQsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0ZGVsdGEuc2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgbmFtZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHJldHVybiB0aGUgdHJhbnNmb3JtZWQgdmFsdWVcblx0XHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIHJldHVybiB0aGUgbWFpbiBvYmplY3Rcblx0cmV0dXJuIFBhcnRpYWxseU9yZGVyZWRETTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL2RlbHRhLmpzXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9ICRfX3BsYWNlaG9sZGVyX18yO1xuICAgICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfX3BsYWNlaG9sZGVyX180KyspXG4gICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX181WyRfX3BsYWNlaG9sZGVyX182IC0gJF9fcGxhY2Vob2xkZXJfXzddID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX184XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwiXG4gICAgICAgICAgICBmb3IgKHZhciAkX19wbGFjZWhvbGRlcl9fMCA9IFtdLCAkX19wbGFjZWhvbGRlcl9fMSA9IDA7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzMrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzRbJF9fcGxhY2Vob2xkZXJfXzVdID0gYXJndW1lbnRzWyRfX3BsYWNlaG9sZGVyX182XTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvc291cmNlL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0c3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvbWlzYy5qc1xuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIFByb21pc2UgPSByZXF1aXJlKFwiLi9wcm9taXNlLmpzXCIpKCk7XG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2U7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9ibHVlYmlyZC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIG9sZDtcbmlmICh0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIikgb2xkID0gUHJvbWlzZTtcbmZ1bmN0aW9uIG5vQ29uZmxpY3QoYmx1ZWJpcmQpIHtcbiAgICB0cnkgeyBpZiAoUHJvbWlzZSA9PT0gYmx1ZWJpcmQpIFByb21pc2UgPSBvbGQ7IH1cbiAgICBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gYmx1ZWJpcmQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGFzeW5jID0gcmVxdWlyZShcIi4vYXN5bmMuanNcIik7XG52YXIgZXJyb3JzID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpO1xuXG52YXIgSU5URVJOQUwgPSBmdW5jdGlvbigpe307XG52YXIgQVBQTFkgPSB7fTtcbnZhciBORVhUX0ZJTFRFUiA9IHtlOiBudWxsfTtcblxudmFyIGNhc3QgPSByZXF1aXJlKFwiLi90aGVuYWJsZXMuanNcIikoUHJvbWlzZSwgSU5URVJOQUwpO1xudmFyIFByb21pc2VBcnJheSA9IHJlcXVpcmUoXCIuL3Byb21pc2VfYXJyYXkuanNcIikoUHJvbWlzZSwgSU5URVJOQUwsIGNhc3QpO1xudmFyIENhcHR1cmVkVHJhY2UgPSByZXF1aXJlKFwiLi9jYXB0dXJlZF90cmFjZS5qc1wiKSgpO1xudmFyIENhdGNoRmlsdGVyID0gcmVxdWlyZShcIi4vY2F0Y2hfZmlsdGVyLmpzXCIpKE5FWFRfRklMVEVSKTtcbnZhciBQcm9taXNlUmVzb2x2ZXIgPSByZXF1aXJlKFwiLi9wcm9taXNlX3Jlc29sdmVyLmpzXCIpO1xuXG52YXIgaXNBcnJheSA9IHV0aWwuaXNBcnJheTtcblxudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciB0cnlDYXRjaDEgPSB1dGlsLnRyeUNhdGNoMTtcbnZhciB0cnlDYXRjaDIgPSB1dGlsLnRyeUNhdGNoMjtcbnZhciB0cnlDYXRjaEFwcGx5ID0gdXRpbC50cnlDYXRjaEFwcGx5O1xudmFyIFJhbmdlRXJyb3IgPSBlcnJvcnMuUmFuZ2VFcnJvcjtcbnZhciBUeXBlRXJyb3IgPSBlcnJvcnMuVHlwZUVycm9yO1xudmFyIENhbmNlbGxhdGlvbkVycm9yID0gZXJyb3JzLkNhbmNlbGxhdGlvbkVycm9yO1xudmFyIFRpbWVvdXRFcnJvciA9IGVycm9ycy5UaW1lb3V0RXJyb3I7XG52YXIgT3BlcmF0aW9uYWxFcnJvciA9IGVycm9ycy5PcGVyYXRpb25hbEVycm9yO1xudmFyIG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uID0gZXJyb3JzLm9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uO1xudmFyIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbiA9IGVycm9ycy5tYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb247XG52YXIgY2FuQXR0YWNoID0gZXJyb3JzLmNhbkF0dGFjaDtcbnZhciB0aHJvd2VyID0gdXRpbC50aHJvd2VyO1xudmFyIGFwaVJlamVjdGlvbiA9IHJlcXVpcmUoXCIuL2Vycm9yc19hcGlfcmVqZWN0aW9uXCIpKFByb21pc2UpO1xuXG5cbnZhciBtYWtlU2VsZlJlc29sdXRpb25FcnJvciA9IGZ1bmN0aW9uIFByb21pc2UkX21ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiY2lyY3VsYXIgcHJvbWlzZSByZXNvbHV0aW9uIGNoYWluXCIpO1xufTtcblxuZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGhlIHByb21pc2UgY29uc3RydWN0b3IgcmVxdWlyZXMgYSByZXNvbHZlciBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgIT09IFByb21pc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRoZSBwcm9taXNlIGNvbnN0cnVjdG9yIGNhbm5vdCBiZSBpbnZva2VkIGRpcmVjdGx5XCIpO1xuICAgIH1cbiAgICB0aGlzLl9iaXRGaWVsZCA9IDA7XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHZvaWQgMDtcbiAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9IHZvaWQgMDtcbiAgICB0aGlzLl9wcm9taXNlMCA9IHZvaWQgMDtcbiAgICB0aGlzLl9yZWNlaXZlcjAgPSB2b2lkIDA7XG4gICAgdGhpcy5fc2V0dGxlZFZhbHVlID0gdm9pZCAwO1xuICAgIHRoaXMuX2JvdW5kVG8gPSB2b2lkIDA7XG4gICAgaWYgKHJlc29sdmVyICE9PSBJTlRFUk5BTCkgdGhpcy5fcmVzb2x2ZUZyb21SZXNvbHZlcihyZXNvbHZlcik7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZpcnN0RWxlbWVudChlbGVtZW50cykge1xuICAgIHJldHVybiBlbGVtZW50c1swXTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIFByb21pc2UkYmluZCh0aGlzQXJnKSB7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodGhpc0FyZywgdm9pZCAwKTtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhciBiaW5kZXIgPSBtYXliZVByb21pc2UudGhlbihmdW5jdGlvbih0aGlzQXJnKSB7XG4gICAgICAgICAgICByZXQuX3NldEJvdW5kVG8odGhpc0FyZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcCA9IFByb21pc2UuYWxsKFt0aGlzLCBiaW5kZXJdKS50aGVuKHJldHVybkZpcnN0RWxlbWVudCk7XG4gICAgICAgIHJldC5fZm9sbG93KHApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5fZm9sbG93KHRoaXMpO1xuICAgICAgICByZXQuX3NldEJvdW5kVG8odGhpc0FyZyk7XG4gICAgfVxuICAgIHJldC5fcHJvcGFnYXRlRnJvbSh0aGlzLCAyIHwgMSk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gUHJvbWlzZSR0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYXVnaHQgPSBQcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID1cbmZ1bmN0aW9uIFByb21pc2UkY2F0Y2goZm4pIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobGVuID4gMSkge1xuICAgICAgICB2YXIgY2F0Y2hJbnN0YW5jZXMgPSBuZXcgQXJyYXkobGVuIC0gMSksXG4gICAgICAgICAgICBqID0gMCwgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbiAtIDE7ICsraSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNhdGNoSW5zdGFuY2VzW2orK10gPSBpdGVtO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2F0Y2hGaWx0ZXJUeXBlRXJyb3IgPVxuICAgICAgICAgICAgICAgICAgICBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIGNhdGNoIGZpbHRlciBtdXN0IGJlIGFuIGVycm9yIGNvbnN0cnVjdG9yIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwib3IgYSBmaWx0ZXIgZnVuY3Rpb25cIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2hFeHRyYVRyYWNlKGNhdGNoRmlsdGVyVHlwZUVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY2F0Y2hGaWx0ZXJUeXBlRXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoSW5zdGFuY2VzLmxlbmd0aCA9IGo7XG4gICAgICAgIGZuID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0VHJhY2UoKTtcbiAgICAgICAgdmFyIGNhdGNoRmlsdGVyID0gbmV3IENhdGNoRmlsdGVyKGNhdGNoSW5zdGFuY2VzLCBmbiwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVuKHZvaWQgMCwgY2F0Y2hGaWx0ZXIuZG9GaWx0ZXIsIHZvaWQgMCxcbiAgICAgICAgICAgIGNhdGNoRmlsdGVyLCB2b2lkIDApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGhlbih2b2lkIDAsIGZuLCB2b2lkIDAsIHZvaWQgMCwgdm9pZCAwKTtcbn07XG5cbmZ1bmN0aW9uIHJlZmxlY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uKHRoaXMpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5yZWZsZWN0ID0gZnVuY3Rpb24gUHJvbWlzZSRyZWZsZWN0KCkge1xuICAgIHJldHVybiB0aGlzLl90aGVuKHJlZmxlY3QsIHJlZmxlY3QsIHZvaWQgMCwgdGhpcywgdm9pZCAwKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnRoZW4gPVxuZnVuY3Rpb24gUHJvbWlzZSR0aGVuKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgZGlkUHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIGRpZFByb2dyZXNzLFxuICAgICAgICB2b2lkIDAsIHZvaWQgMCk7XG59O1xuXG5cblByb21pc2UucHJvdG90eXBlLmRvbmUgPVxuZnVuY3Rpb24gUHJvbWlzZSRkb25lKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgZGlkUHJvZ3Jlc3MpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3RoZW4oZGlkRnVsZmlsbCwgZGlkUmVqZWN0LCBkaWRQcm9ncmVzcyxcbiAgICAgICAgdm9pZCAwLCB2b2lkIDApO1xuICAgIHByb21pc2UuX3NldElzRmluYWwoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnNwcmVhZCA9IGZ1bmN0aW9uIFByb21pc2Ukc3ByZWFkKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCkge1xuICAgIHJldHVybiB0aGlzLl90aGVuKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgdm9pZCAwLFxuICAgICAgICBBUFBMWSwgdm9pZCAwKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmlzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbiBQcm9taXNlJGlzQ2FuY2VsbGFibGUoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzUmVzb2x2ZWQoKSAmJlxuICAgICAgICB0aGlzLl9jYW5jZWxsYWJsZSgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gUHJvbWlzZSR0b0pTT04oKSB7XG4gICAgdmFyIHJldCA9IHtcbiAgICAgICAgaXNGdWxmaWxsZWQ6IGZhbHNlLFxuICAgICAgICBpc1JlamVjdGVkOiBmYWxzZSxcbiAgICAgICAgZnVsZmlsbG1lbnRWYWx1ZTogdm9pZCAwLFxuICAgICAgICByZWplY3Rpb25SZWFzb246IHZvaWQgMFxuICAgIH07XG4gICAgaWYgKHRoaXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICByZXQuZnVsZmlsbG1lbnRWYWx1ZSA9IHRoaXMuX3NldHRsZWRWYWx1ZTtcbiAgICAgICAgcmV0LmlzRnVsZmlsbGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZWplY3RlZCgpKSB7XG4gICAgICAgIHJldC5yZWplY3Rpb25SZWFzb24gPSB0aGlzLl9zZXR0bGVkVmFsdWU7XG4gICAgICAgIHJldC5pc1JlamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmFsbCA9IGZ1bmN0aW9uIFByb21pc2UkYWxsKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZUFycmF5KHRoaXMpLnByb21pc2UoKTtcbn07XG5cblxuUHJvbWlzZS5pcyA9IGZ1bmN0aW9uIFByb21pc2UkSXModmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIFByb21pc2U7XG59O1xuXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uIFByb21pc2UkQWxsKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlQXJyYXkocHJvbWlzZXMpLnByb21pc2UoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gUHJvbWlzZSRfZXJyb3IoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5jYXVnaHQob3JpZ2luYXRlc0Zyb21SZWplY3Rpb24sIGZuKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbVN5bmNWYWx1ZSA9XG5mdW5jdGlvbiBQcm9taXNlJF9yZXNvbHZlRnJvbVN5bmNWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgdGhpcy5fY2xlYW5WYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5fc2V0UmVqZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5fc2V0dGxlZFZhbHVlID0gdmFsdWUuZTtcbiAgICAgICAgdGhpcy5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodmFsdWUsIHZvaWQgMCk7XG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2xsb3cobWF5YmVQcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuVmFsdWVzKCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRGdWxmaWxsZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5tZXRob2QgPSBmdW5jdGlvbiBQcm9taXNlJF9NZXRob2QoZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFByb21pc2UkX21ldGhvZCgpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6IHZhbHVlID0gdHJ5Q2F0Y2gxKGZuLCB0aGlzLCB2b2lkIDApOyBicmVhaztcbiAgICAgICAgY2FzZSAxOiB2YWx1ZSA9IHRyeUNhdGNoMShmbiwgdGhpcywgYXJndW1lbnRzWzBdKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogdmFsdWUgPSB0cnlDYXRjaDIoZm4sIHRoaXMsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgJF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoO3ZhciBhcmdzID0gbmV3IEFycmF5KCRfbGVuKTsgZm9yKHZhciAkX2kgPSAwOyAkX2kgPCAkX2xlbjsgKyskX2kpIHthcmdzWyRfaV0gPSBhcmd1bWVudHNbJF9pXTt9XG4gICAgICAgICAgICB2YWx1ZSA9IHRyeUNhdGNoQXBwbHkoZm4sIGFyZ3MsIHRoaXMpOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICByZXQuX3NldFRyYWNlKHZvaWQgMCk7XG4gICAgICAgIHJldC5fcmVzb2x2ZUZyb21TeW5jVmFsdWUodmFsdWUpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG59O1xuXG5Qcm9taXNlLmF0dGVtcHQgPSBQcm9taXNlW1widHJ5XCJdID0gZnVuY3Rpb24gUHJvbWlzZSRfVHJ5KGZuLCBhcmdzLCBjdHgpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGFwaVJlamVjdGlvbihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gaXNBcnJheShhcmdzKVxuICAgICAgICA/IHRyeUNhdGNoQXBwbHkoZm4sIGFyZ3MsIGN0eClcbiAgICAgICAgOiB0cnlDYXRjaDEoZm4sIGN0eCwgYXJncyk7XG5cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fc2V0VHJhY2Uodm9pZCAwKTtcbiAgICByZXQuX3Jlc29sdmVGcm9tU3luY1ZhbHVlKHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5kZWZlciA9IFByb21pc2UucGVuZGluZyA9IGZ1bmN0aW9uIFByb21pc2UkRGVmZXIoKSB7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgcHJvbWlzZS5fc2V0VHJhY2Uodm9pZCAwKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2VSZXNvbHZlcihwcm9taXNlKTtcbn07XG5cblByb21pc2UuYmluZCA9IGZ1bmN0aW9uIFByb21pc2UkQmluZCh0aGlzQXJnKSB7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodGhpc0FyZywgdm9pZCAwKTtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fc2V0VHJhY2Uodm9pZCAwKTtcblxuICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHZhciBwID0gbWF5YmVQcm9taXNlLnRoZW4oZnVuY3Rpb24odGhpc0FyZykge1xuICAgICAgICAgICAgcmV0Ll9zZXRCb3VuZFRvKHRoaXNBcmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0Ll9mb2xsb3cocCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0Ll9zZXRCb3VuZFRvKHRoaXNBcmcpO1xuICAgICAgICByZXQuX3NldEZ1bGZpbGxlZCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5jYXN0ID0gZnVuY3Rpb24gUHJvbWlzZSRfQ2FzdChvYmopIHtcbiAgICB2YXIgcmV0ID0gY2FzdChvYmosIHZvaWQgMCk7XG4gICAgaWYgKCEocmV0IGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgdmFyIHZhbCA9IHJldDtcbiAgICAgICAgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICByZXQuX3NldFRyYWNlKHZvaWQgMCk7XG4gICAgICAgIHJldC5fc2V0RnVsZmlsbGVkKCk7XG4gICAgICAgIHJldC5fY2xlYW5WYWx1ZXMoKTtcbiAgICAgICAgcmV0Ll9zZXR0bGVkVmFsdWUgPSB2YWw7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5Qcm9taXNlLnJlc29sdmUgPSBQcm9taXNlLmZ1bGZpbGxlZCA9IFByb21pc2UuY2FzdDtcblxuUHJvbWlzZS5yZWplY3QgPSBQcm9taXNlLnJlamVjdGVkID0gZnVuY3Rpb24gUHJvbWlzZSRSZWplY3QocmVhc29uKSB7XG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICByZXQuX3NldFRyYWNlKHZvaWQgMCk7XG4gICAgbWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKHJlYXNvbik7XG4gICAgcmV0Ll9jbGVhblZhbHVlcygpO1xuICAgIHJldC5fc2V0UmVqZWN0ZWQoKTtcbiAgICByZXQuX3NldHRsZWRWYWx1ZSA9IHJlYXNvbjtcbiAgICBpZiAoIWNhbkF0dGFjaChyZWFzb24pKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IG5ldyBFcnJvcihyZWFzb24gKyBcIlwiKTtcbiAgICAgICAgcmV0Ll9zZXRDYXJyaWVkU3RhY2tUcmFjZSh0cmFjZSk7XG4gICAgfVxuICAgIHJldC5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2Uub25Qb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiA9XG5mdW5jdGlvbiBQcm9taXNlJE9uUG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24oZm4pIHtcbiAgICAgICAgQ2FwdHVyZWRUcmFjZS5wb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiA9IHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmbiA6IHZvaWQgMDtcbn07XG5cbnZhciB1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkO1xuUHJvbWlzZS5vblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRvblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQoZm4pIHtcbiAgICB1bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVkID0gdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgPyBmbiA6IHZvaWQgMDtcbn07XG5cbnZhciBkZWJ1Z2dpbmcgPSBmYWxzZSB8fCAhIShcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLmV4ZWNQYXRoID09PSBcInN0cmluZ1wiICYmXG4gICAgdHlwZW9mIHByb2Nlc3MuZW52ID09PSBcIm9iamVjdFwiICYmXG4gICAgKHByb2Nlc3MuZW52W1wiQkxVRUJJUkRfREVCVUdcIl0gfHxcbiAgICAgICAgcHJvY2Vzcy5lbnZbXCJOT0RFX0VOVlwiXSA9PT0gXCJkZXZlbG9wbWVudFwiKVxuKTtcblxuXG5Qcm9taXNlLmxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uIFByb21pc2UkTG9uZ1N0YWNrVHJhY2VzKCkge1xuICAgIGlmIChhc3luYy5oYXZlSXRlbXNRdWV1ZWQoKSAmJlxuICAgICAgICBkZWJ1Z2dpbmcgPT09IGZhbHNlXG4gICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGVuYWJsZSBsb25nIHN0YWNrIHRyYWNlcyBhZnRlciBwcm9taXNlcyBoYXZlIGJlZW4gY3JlYXRlZFwiKTtcbiAgICB9XG4gICAgZGVidWdnaW5nID0gQ2FwdHVyZWRUcmFjZS5pc1N1cHBvcnRlZCgpO1xufTtcblxuUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbiBQcm9taXNlJEhhc0xvbmdTdGFja1RyYWNlcygpIHtcbiAgICByZXR1cm4gZGVidWdnaW5nICYmIENhcHR1cmVkVHJhY2UuaXNTdXBwb3J0ZWQoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl90aGVuID1cbmZ1bmN0aW9uIFByb21pc2UkX3RoZW4oXG4gICAgZGlkRnVsZmlsbCxcbiAgICBkaWRSZWplY3QsXG4gICAgZGlkUHJvZ3Jlc3MsXG4gICAgcmVjZWl2ZXIsXG4gICAgaW50ZXJuYWxEYXRhXG4pIHtcbiAgICB2YXIgaGF2ZUludGVybmFsRGF0YSA9IGludGVybmFsRGF0YSAhPT0gdm9pZCAwO1xuICAgIHZhciByZXQgPSBoYXZlSW50ZXJuYWxEYXRhID8gaW50ZXJuYWxEYXRhIDogbmV3IFByb21pc2UoSU5URVJOQUwpO1xuXG4gICAgaWYgKCFoYXZlSW50ZXJuYWxEYXRhKSB7XG4gICAgICAgIGlmIChkZWJ1Z2dpbmcpIHtcbiAgICAgICAgICAgIHZhciBoYXZlU2FtZUNvbnRleHQgPSB0aGlzLl9wZWVrQ29udGV4dCgpID09PSB0aGlzLl90cmFjZVBhcmVudDtcbiAgICAgICAgICAgIHJldC5fdHJhY2VQYXJlbnQgPSBoYXZlU2FtZUNvbnRleHQgPyB0aGlzLl90cmFjZVBhcmVudCA6IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0Ll9wcm9wYWdhdGVGcm9tKHRoaXMsIDcpO1xuICAgIH1cblxuICAgIHZhciBjYWxsYmFja0luZGV4ID1cbiAgICAgICAgdGhpcy5fYWRkQ2FsbGJhY2tzKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgZGlkUHJvZ3Jlc3MsIHJldCwgcmVjZWl2ZXIpO1xuXG4gICAgaWYgKHRoaXMuaXNSZXNvbHZlZCgpKSB7XG4gICAgICAgIGFzeW5jLmludm9rZSh0aGlzLl9xdWV1ZVNldHRsZUF0LCB0aGlzLCBjYWxsYmFja0luZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2xlbmd0aCA9IGZ1bmN0aW9uIFByb21pc2UkX2xlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0RmllbGQgJiAyNjIxNDM7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGb2xsb3dpbmdPckZ1bGZpbGxlZE9yUmVqZWN0ZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfaXNGb2xsb3dpbmdPckZ1bGZpbGxlZE9yUmVqZWN0ZWQoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDkzOTUyNDA5NikgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzRm9sbG93aW5nID0gZnVuY3Rpb24gUHJvbWlzZSRfaXNGb2xsb3dpbmcoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDUzNjg3MDkxMikgPT09IDUzNjg3MDkxMjtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRMZW5ndGggPSBmdW5jdGlvbiBQcm9taXNlJF9zZXRMZW5ndGgobGVuKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSAodGhpcy5fYml0RmllbGQgJiAtMjYyMTQ0KSB8XG4gICAgICAgIChsZW4gJiAyNjIxNDMpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEZ1bGZpbGxlZCA9IGZ1bmN0aW9uIFByb21pc2UkX3NldEZ1bGZpbGxlZCgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjY4NDM1NDU2O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFJlamVjdGVkID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0UmVqZWN0ZWQoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDEzNDIxNzcyODtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRGb2xsb3dpbmcgPSBmdW5jdGlvbiBQcm9taXNlJF9zZXRGb2xsb3dpbmcoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDUzNjg3MDkxMjtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRJc0ZpbmFsID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0SXNGaW5hbCgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMzM1NTQ0MzI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGaW5hbCA9IGZ1bmN0aW9uIFByb21pc2UkX2lzRmluYWwoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDMzNTU0NDMyKSA+IDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsbGFibGUgPSBmdW5jdGlvbiBQcm9taXNlJF9jYW5jZWxsYWJsZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNjcxMDg4NjQpID4gMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRDYW5jZWxsYWJsZSA9IGZ1bmN0aW9uIFByb21pc2UkX3NldENhbmNlbGxhYmxlKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCA2NzEwODg2NDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldENhbmNlbGxhYmxlID0gZnVuY3Rpb24gUHJvbWlzZSRfdW5zZXRDYW5jZWxsYWJsZSgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH42NzEwODg2NCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDIwOTcxNTI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCA9XG5mdW5jdGlvbiBQcm9taXNlJF91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjIwOTcxNTIpO1xuICAgIGlmICh0aGlzLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkKCkpIHtcbiAgICAgICAgdGhpcy5fdW5zZXRVbmhhbmRsZWRSZWplY3Rpb25Jc05vdGlmaWVkKCk7XG4gICAgICAgIHRoaXMuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbklzSGFuZGxlZCgpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1JlamVjdGlvblVuaGFuZGxlZCA9XG5mdW5jdGlvbiBQcm9taXNlJF9pc1JlamVjdGlvblVuaGFuZGxlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMjA5NzE1MikgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCgpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNTI0Mjg4O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCA9XG5mdW5jdGlvbiBQcm9taXNlJF91bnNldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+NTI0Mjg4KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkID1cbmZ1bmN0aW9uIFByb21pc2UkX2lzVW5oYW5kbGVkUmVqZWN0aW9uTm90aWZpZWQoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDUyNDI4OCkgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldENhcnJpZWRTdGFja1RyYWNlID1cbmZ1bmN0aW9uIFByb21pc2UkX3NldENhcnJpZWRTdGFja1RyYWNlKGNhcHR1cmVkVHJhY2UpIHtcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMTA0ODU3NjtcbiAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwID0gY2FwdHVyZWRUcmFjZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl91bnNldENhcnJpZWRTdGFja1RyYWNlID1cbmZ1bmN0aW9uIFByb21pc2UkX3Vuc2V0Q2FycmllZFN0YWNrVHJhY2UoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+MTA0ODU3Nik7XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHZvaWQgMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9pc0NhcnJ5aW5nU3RhY2tUcmFjZSA9XG5mdW5jdGlvbiBQcm9taXNlJF9pc0NhcnJ5aW5nU3RhY2tUcmFjZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTA0ODU3NikgPiAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2dldENhcnJpZWRTdGFja1RyYWNlID1cbmZ1bmN0aW9uIFByb21pc2UkX2dldENhcnJpZWRTdGFja1RyYWNlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0NhcnJ5aW5nU3RhY2tUcmFjZSgpXG4gICAgICAgID8gdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMFxuICAgICAgICA6IHZvaWQgMDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWNlaXZlckF0ID0gZnVuY3Rpb24gUHJvbWlzZSRfcmVjZWl2ZXJBdChpbmRleCkge1xuICAgIHZhciByZXQgPSBpbmRleCA9PT0gMFxuICAgICAgICA/IHRoaXMuX3JlY2VpdmVyMFxuICAgICAgICA6IHRoaXNbKGluZGV4IDw8IDIpICsgaW5kZXggLSA1ICsgNF07XG4gICAgaWYgKHRoaXMuX2lzQm91bmQoKSAmJiByZXQgPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRUbztcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQXQgPSBmdW5jdGlvbiBQcm9taXNlJF9wcm9taXNlQXQoaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDBcbiAgICAgICAgPyB0aGlzLl9wcm9taXNlMFxuICAgICAgICA6IHRoaXNbKGluZGV4IDw8IDIpICsgaW5kZXggLSA1ICsgM107XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbG1lbnRIYW5kbGVyQXQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfZnVsZmlsbG1lbnRIYW5kbGVyQXQoaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDBcbiAgICAgICAgPyB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwXG4gICAgICAgIDogdGhpc1soaW5kZXggPDwgMikgKyBpbmRleCAtIDUgKyAwXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZWplY3Rpb25IYW5kbGVyQXQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfcmVqZWN0aW9uSGFuZGxlckF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ID09PSAwXG4gICAgICAgID8gdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjBcbiAgICAgICAgOiB0aGlzWyhpbmRleCA8PCAyKSArIGluZGV4IC0gNSArIDFdO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2FkZENhbGxiYWNrcyA9IGZ1bmN0aW9uIFByb21pc2UkX2FkZENhbGxiYWNrcyhcbiAgICBmdWxmaWxsLFxuICAgIHJlamVjdCxcbiAgICBwcm9ncmVzcyxcbiAgICBwcm9taXNlLFxuICAgIHJlY2VpdmVyXG4pIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9sZW5ndGgoKTtcblxuICAgIGlmIChpbmRleCA+PSAyNjIxNDMgLSA1KSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xuICAgIH1cblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9wcm9taXNlMCA9IHByb21pc2U7XG4gICAgICAgIGlmIChyZWNlaXZlciAhPT0gdm9pZCAwKSB0aGlzLl9yZWNlaXZlcjAgPSByZWNlaXZlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBmdWxmaWxsID09PSBcImZ1bmN0aW9uXCIgJiYgIXRoaXMuX2lzQ2FycnlpbmdTdGFja1RyYWNlKCkpXG4gICAgICAgICAgICB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwID0gZnVsZmlsbDtcbiAgICAgICAgaWYgKHR5cGVvZiByZWplY3QgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSByZWplY3Q7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvZ3Jlc3MgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5fcHJvZ3Jlc3NIYW5kbGVyMCA9IHByb2dyZXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBiYXNlID0gKGluZGV4IDw8IDIpICsgaW5kZXggLSA1O1xuICAgICAgICB0aGlzW2Jhc2UgKyAzXSA9IHByb21pc2U7XG4gICAgICAgIHRoaXNbYmFzZSArIDRdID0gcmVjZWl2ZXI7XG4gICAgICAgIHRoaXNbYmFzZSArIDBdID0gdHlwZW9mIGZ1bGZpbGwgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZ1bGZpbGwgOiB2b2lkIDA7XG4gICAgICAgIHRoaXNbYmFzZSArIDFdID0gdHlwZW9mIHJlamVjdCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcmVqZWN0IDogdm9pZCAwO1xuICAgICAgICB0aGlzW2Jhc2UgKyAyXSA9IHR5cGVvZiBwcm9ncmVzcyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcHJvZ3Jlc3MgOiB2b2lkIDA7XG4gICAgfVxuICAgIHRoaXMuX3NldExlbmd0aChpbmRleCArIDEpO1xuICAgIHJldHVybiBpbmRleDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRQcm94eUhhbmRsZXJzID1cbmZ1bmN0aW9uIFByb21pc2UkX3NldFByb3h5SGFuZGxlcnMocmVjZWl2ZXIsIHByb21pc2VTbG90VmFsdWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9sZW5ndGgoKTtcblxuICAgIGlmIChpbmRleCA+PSAyNjIxNDMgLSA1KSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZTAgPSBwcm9taXNlU2xvdFZhbHVlO1xuICAgICAgICB0aGlzLl9yZWNlaXZlcjAgPSByZWNlaXZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYmFzZSA9IChpbmRleCA8PCAyKSArIGluZGV4IC0gNTtcbiAgICAgICAgdGhpc1tiYXNlICsgM10gPSBwcm9taXNlU2xvdFZhbHVlO1xuICAgICAgICB0aGlzW2Jhc2UgKyA0XSA9IHJlY2VpdmVyO1xuICAgICAgICB0aGlzW2Jhc2UgKyAwXSA9XG4gICAgICAgIHRoaXNbYmFzZSArIDFdID1cbiAgICAgICAgdGhpc1tiYXNlICsgMl0gPSB2b2lkIDA7XG4gICAgfVxuICAgIHRoaXMuX3NldExlbmd0aChpbmRleCArIDEpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Byb3h5UHJvbWlzZUFycmF5ID1cbmZ1bmN0aW9uIFByb21pc2UkX3Byb3h5UHJvbWlzZUFycmF5KHByb21pc2VBcnJheSwgaW5kZXgpIHtcbiAgICB0aGlzLl9zZXRQcm94eUhhbmRsZXJzKHByb21pc2VBcnJheSwgaW5kZXgpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Byb3h5UHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UkX3Byb3h5UHJvbWlzZShwcm9taXNlKSB7XG4gICAgcHJvbWlzZS5fc2V0UHJveGllZCgpO1xuICAgIHRoaXMuX3NldFByb3h5SGFuZGxlcnMocHJvbWlzZSwgLTE1KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXRCb3VuZFRvID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0Qm91bmRUbyhvYmopIHtcbiAgICBpZiAob2JqICE9PSB2b2lkIDApIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDgzODg2MDg7XG4gICAgICAgIHRoaXMuX2JvdW5kVG8gPSBvYmo7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCAmICh+ODM4ODYwOCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQm91bmQgPSBmdW5jdGlvbiBQcm9taXNlJF9pc0JvdW5kKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA4Mzg4NjA4KSA9PT0gODM4ODYwODtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbVJlc29sdmVyID1cbmZ1bmN0aW9uIFByb21pc2UkX3Jlc29sdmVGcm9tUmVzb2x2ZXIocmVzb2x2ZXIpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdGhpcy5fc2V0VHJhY2Uodm9pZCAwKTtcbiAgICB0aGlzLl9wdXNoQ29udGV4dCgpO1xuXG4gICAgZnVuY3Rpb24gUHJvbWlzZSRfcmVzb2x2ZXIodmFsKSB7XG4gICAgICAgIGlmIChwcm9taXNlLl90cnlGb2xsb3codmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHByb21pc2UuX2Z1bGZpbGwodmFsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gUHJvbWlzZSRfcmVqZWN0ZXIodmFsKSB7XG4gICAgICAgIHZhciB0cmFjZSA9IGNhbkF0dGFjaCh2YWwpID8gdmFsIDogbmV3IEVycm9yKHZhbCArIFwiXCIpO1xuICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlKTtcbiAgICAgICAgbWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKHZhbCk7XG4gICAgICAgIHByb21pc2UuX3JlamVjdCh2YWwsIHRyYWNlID09PSB2YWwgPyB2b2lkIDAgOiB0cmFjZSk7XG4gICAgfVxuICAgIHZhciByID0gdHJ5Q2F0Y2gyKHJlc29sdmVyLCB2b2lkIDAsIFByb21pc2UkX3Jlc29sdmVyLCBQcm9taXNlJF9yZWplY3Rlcik7XG4gICAgdGhpcy5fcG9wQ29udGV4dCgpO1xuXG4gICAgaWYgKHIgIT09IHZvaWQgMCAmJiByID09PSBlcnJvck9iaikge1xuICAgICAgICB2YXIgZSA9IHIuZTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2FuQXR0YWNoKGUpID8gZSA6IG5ldyBFcnJvcihlICsgXCJcIik7XG4gICAgICAgIHByb21pc2UuX3JlamVjdChlLCB0cmFjZSk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NwcmVhZFNsb3dDYXNlID1cbmZ1bmN0aW9uIFByb21pc2UkX3NwcmVhZFNsb3dDYXNlKHRhcmdldEZuLCBwcm9taXNlLCB2YWx1ZXMsIGJvdW5kVG8pIHtcbiAgICB2YXIgcHJvbWlzZUZvckFsbCA9IG5ldyBQcm9taXNlQXJyYXkodmFsdWVzKS5wcm9taXNlKCk7XG4gICAgdmFyIHByb21pc2UyID0gcHJvbWlzZUZvckFsbC5fdGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldEZuLmFwcGx5KGJvdW5kVG8sIGFyZ3VtZW50cyk7XG4gICAgfSwgdm9pZCAwLCB2b2lkIDAsIEFQUExZLCB2b2lkIDApO1xuICAgIHByb21pc2UuX2ZvbGxvdyhwcm9taXNlMik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FsbFNwcmVhZCA9XG5mdW5jdGlvbiBQcm9taXNlJF9jYWxsU3ByZWFkKGhhbmRsZXIsIHByb21pc2UsIHZhbHVlKSB7XG4gICAgdmFyIGJvdW5kVG8gPSB0aGlzLl9ib3VuZFRvO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdmFsdWUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjYXN0KHZhbHVlW2ldLCB2b2lkIDApIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwcmVhZFNsb3dDYXNlKGhhbmRsZXIsIHByb21pc2UsIHZhbHVlLCBib3VuZFRvKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcbiAgICByZXR1cm4gdHJ5Q2F0Y2hBcHBseShoYW5kbGVyLCB2YWx1ZSwgYm91bmRUbyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FsbEhhbmRsZXIgPVxuZnVuY3Rpb24gUHJvbWlzZSRfY2FsbEhhbmRsZXIoXG4gICAgaGFuZGxlciwgcmVjZWl2ZXIsIHByb21pc2UsIHZhbHVlKSB7XG4gICAgdmFyIHg7XG4gICAgaWYgKHJlY2VpdmVyID09PSBBUFBMWSAmJiAhdGhpcy5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgeCA9IHRoaXMuX2NhbGxTcHJlYWQoaGFuZGxlciwgcHJvbWlzZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XG4gICAgICAgIHggPSB0cnlDYXRjaDEoaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG4gICAgcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xuICAgIHJldHVybiB4O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2VGcm9tSGFuZGxlciA9XG5mdW5jdGlvbiBQcm9taXNlJF9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIoXG4gICAgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlXG4pIHtcbiAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHggPSB0aGlzLl9jYWxsSGFuZGxlcihoYW5kbGVyLCByZWNlaXZlciwgcHJvbWlzZSwgdmFsdWUpO1xuICAgIGlmIChwcm9taXNlLl9pc0ZvbGxvd2luZygpKSByZXR1cm47XG5cbiAgICBpZiAoeCA9PT0gZXJyb3JPYmogfHwgeCA9PT0gcHJvbWlzZSB8fCB4ID09PSBORVhUX0ZJTFRFUikge1xuICAgICAgICB2YXIgZXJyID0geCA9PT0gcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICA/IG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKClcbiAgICAgICAgICAgICAgICAgICAgOiB4LmU7XG4gICAgICAgIHZhciB0cmFjZSA9IGNhbkF0dGFjaChlcnIpID8gZXJyIDogbmV3IEVycm9yKGVyciArIFwiXCIpO1xuICAgICAgICBpZiAoeCAhPT0gTkVYVF9GSUxURVIpIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UodHJhY2UpO1xuICAgICAgICBwcm9taXNlLl9yZWplY3RVbmNoZWNrZWQoZXJyLCB0cmFjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNhc3RWYWx1ZSA9IGNhc3QoeCwgcHJvbWlzZSk7XG4gICAgICAgIGlmIChjYXN0VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBpZiAoY2FzdFZhbHVlLmlzUmVqZWN0ZWQoKSAmJlxuICAgICAgICAgICAgICAgICFjYXN0VmFsdWUuX2lzQ2FycnlpbmdTdGFja1RyYWNlKCkgJiZcbiAgICAgICAgICAgICAgICAhY2FuQXR0YWNoKGNhc3RWYWx1ZS5fc2V0dGxlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFjZSA9IG5ldyBFcnJvcihjYXN0VmFsdWUuX3NldHRsZWRWYWx1ZSArIFwiXCIpO1xuICAgICAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UodHJhY2UpO1xuICAgICAgICAgICAgICAgIGNhc3RWYWx1ZS5fc2V0Q2FycmllZFN0YWNrVHJhY2UodHJhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvbWlzZS5fZm9sbG93KGNhc3RWYWx1ZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKGNhc3RWYWx1ZSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsVW5jaGVja2VkKHgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2ZvbGxvdyA9XG5mdW5jdGlvbiBQcm9taXNlJF9mb2xsb3cocHJvbWlzZSkge1xuICAgIHRoaXMuX3NldEZvbGxvd2luZygpO1xuXG4gICAgaWYgKHByb21pc2UuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRlRnJvbShwcm9taXNlLCAxKTtcbiAgICAgICAgcHJvbWlzZS5fcHJveHlQcm9taXNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAocHJvbWlzZS5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgIHRoaXMuX2Z1bGZpbGxVbmNoZWNrZWQocHJvbWlzZS5fc2V0dGxlZFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZWplY3RVbmNoZWNrZWQocHJvbWlzZS5fc2V0dGxlZFZhbHVlLFxuICAgICAgICAgICAgcHJvbWlzZS5fZ2V0Q2FycmllZFN0YWNrVHJhY2UoKSk7XG4gICAgfVxuXG4gICAgaWYgKHByb21pc2UuX2lzUmVqZWN0aW9uVW5oYW5kbGVkKCkpIHByb21pc2UuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcblxuICAgIGlmIChkZWJ1Z2dpbmcgJiZcbiAgICAgICAgcHJvbWlzZS5fdHJhY2VQYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICBwcm9taXNlLl90cmFjZVBhcmVudCA9IHRoaXM7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3RyeUZvbGxvdyA9XG5mdW5jdGlvbiBQcm9taXNlJF90cnlGb2xsb3codmFsdWUpIHtcbiAgICBpZiAodGhpcy5faXNGb2xsb3dpbmdPckZ1bGZpbGxlZE9yUmVqZWN0ZWQoKSB8fFxuICAgICAgICB2YWx1ZSA9PT0gdGhpcykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0KHZhbHVlLCB2b2lkIDApO1xuICAgIGlmICghKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fZm9sbG93KG1heWJlUHJvbWlzZSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVzZXRUcmFjZSA9IGZ1bmN0aW9uIFByb21pc2UkX3Jlc2V0VHJhY2UoKSB7XG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICB0aGlzLl90cmFjZSA9IG5ldyBDYXB0dXJlZFRyYWNlKHRoaXMuX3BlZWtDb250ZXh0KCkgPT09IHZvaWQgMCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFRyYWNlID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0VHJhY2UocGFyZW50KSB7XG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX3BlZWtDb250ZXh0KCk7XG4gICAgICAgIHRoaXMuX3RyYWNlUGFyZW50ID0gY29udGV4dDtcbiAgICAgICAgdmFyIGlzVG9wTGV2ZWwgPSBjb250ZXh0ID09PSB2b2lkIDA7XG4gICAgICAgIGlmIChwYXJlbnQgIT09IHZvaWQgMCAmJlxuICAgICAgICAgICAgcGFyZW50Ll90cmFjZVBhcmVudCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UgPSBwYXJlbnQuX3RyYWNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2UgPSBuZXcgQ2FwdHVyZWRUcmFjZShpc1RvcExldmVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlID1cbmZ1bmN0aW9uIFByb21pc2UkX2F0dGFjaEV4dHJhVHJhY2UoZXJyb3IpIHtcbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcztcbiAgICAgICAgdmFyIHN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgICAgIHN0YWNrID0gdHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiID8gc3RhY2suc3BsaXQoXCJcXG5cIikgOiBbXTtcbiAgICAgICAgQ2FwdHVyZWRUcmFjZS5wcm90ZWN0RXJyb3JNZXNzYWdlTmV3bGluZXMoc3RhY2spO1xuICAgICAgICB2YXIgaGVhZGVyTGluZUNvdW50ID0gMTtcbiAgICAgICAgdmFyIGNvbWJpbmVkVHJhY2VzID0gMTtcbiAgICAgICAgd2hpbGUocHJvbWlzZSAhPSBudWxsICYmXG4gICAgICAgICAgICBwcm9taXNlLl90cmFjZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdGFjayA9IENhcHR1cmVkVHJhY2UuY29tYmluZShcbiAgICAgICAgICAgICAgICBzdGFjayxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl90cmFjZS5zdGFjay5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlLl90cmFjZVBhcmVudDtcbiAgICAgICAgICAgIGNvbWJpbmVkVHJhY2VzKys7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhY2tUcmFjZUxpbWl0ID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0IHx8IDEwO1xuICAgICAgICB2YXIgbWF4ID0gKHN0YWNrVHJhY2VMaW1pdCArIGhlYWRlckxpbmVDb3VudCkgKiBjb21iaW5lZFRyYWNlcztcbiAgICAgICAgdmFyIGxlbiA9IHN0YWNrLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+IG1heCkge1xuICAgICAgICAgICAgc3RhY2subGVuZ3RoID0gbWF4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlbiA+IDApXG4gICAgICAgICAgICBzdGFja1swXSA9IHN0YWNrWzBdLnNwbGl0KFwiXFx1MDAwMlxcdTAwMDBcXHUwMDAxXCIpLmpvaW4oXCJcXG5cIik7XG5cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA8PSBoZWFkZXJMaW5lQ291bnQpIHtcbiAgICAgICAgICAgIGVycm9yLnN0YWNrID0gXCIoTm8gc3RhY2sgdHJhY2UpXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvci5zdGFjayA9IHN0YWNrLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fY2xlYW5WYWx1ZXMgPSBmdW5jdGlvbiBQcm9taXNlJF9jbGVhblZhbHVlcygpIHtcbiAgICBpZiAodGhpcy5fY2FuY2VsbGFibGUoKSkge1xuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25QYXJlbnQgPSB2b2lkIDA7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPVxuZnVuY3Rpb24gUHJvbWlzZSRfcHJvcGFnYXRlRnJvbShwYXJlbnQsIGZsYWdzKSB7XG4gICAgaWYgKChmbGFncyAmIDEpID4gMCAmJiBwYXJlbnQuX2NhbmNlbGxhYmxlKCkpIHtcbiAgICAgICAgdGhpcy5fc2V0Q2FuY2VsbGFibGUoKTtcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gcGFyZW50O1xuICAgIH1cbiAgICBpZiAoKGZsYWdzICYgNCkgPiAwKSB7XG4gICAgICAgIHRoaXMuX3NldEJvdW5kVG8ocGFyZW50Ll9ib3VuZFRvKTtcbiAgICB9XG4gICAgaWYgKChmbGFncyAmIDIpID4gMCkge1xuICAgICAgICB0aGlzLl9zZXRUcmFjZShwYXJlbnQpO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9mdWxmaWxsID0gZnVuY3Rpb24gUHJvbWlzZSRfZnVsZmlsbCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9pc0ZvbGxvd2luZ09yRnVsZmlsbGVkT3JSZWplY3RlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fZnVsZmlsbFVuY2hlY2tlZCh2YWx1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0ID1cbmZ1bmN0aW9uIFByb21pc2UkX3JlamVjdChyZWFzb24sIGNhcnJpZWRTdGFja1RyYWNlKSB7XG4gICAgaWYgKHRoaXMuX2lzRm9sbG93aW5nT3JGdWxmaWxsZWRPclJlamVjdGVkKCkpIHJldHVybjtcbiAgICB0aGlzLl9yZWplY3RVbmNoZWNrZWQocmVhc29uLCBjYXJyaWVkU3RhY2tUcmFjZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZUF0ID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0dGxlUHJvbWlzZUF0KGluZGV4KSB7XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmlzRnVsZmlsbGVkKClcbiAgICAgICAgPyB0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXJBdChpbmRleClcbiAgICAgICAgOiB0aGlzLl9yZWplY3Rpb25IYW5kbGVyQXQoaW5kZXgpO1xuXG4gICAgdmFyIHZhbHVlID0gdGhpcy5fc2V0dGxlZFZhbHVlO1xuICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaW5kZXgpO1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGluZGV4KTtcblxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2VGcm9tSGFuZGxlcihoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUsIHByb21pc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHZhciBpc0Z1bGZpbGxlZCA9IHRoaXMuaXNGdWxmaWxsZWQoKTtcbiAgICAgICAgaWYgKHJlY2VpdmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFByb21pc2UgJiZcbiAgICAgICAgICAgICAgICByZWNlaXZlci5faXNQcm94aWVkKCkpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlci5fdW5zZXRQcm94aWVkKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNGdWxmaWxsZWQpIHJlY2VpdmVyLl9mdWxmaWxsVW5jaGVja2VkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBlbHNlIHJlY2VpdmVyLl9yZWplY3RVbmNoZWNrZWQodmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldENhcnJpZWRTdGFja1RyYWNlKCkpO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFByb21pc2VBcnJheSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bGZpbGxlZCkgcmVjZWl2ZXIuX3Byb21pc2VGdWxmaWxsZWQodmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmVjZWl2ZXIuX3Byb21pc2VSZWplY3RlZCh2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRvbmUpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bGZpbGxlZCkgcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XG4gICAgICAgICAgICBlbHNlIHByb21pc2UuX3JlamVjdCh2YWx1ZSwgdGhpcy5fZ2V0Q2FycmllZFN0YWNrVHJhY2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPj0gNCkge1xuICAgICAgICB0aGlzLl9xdWV1ZUdDKCk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzUHJveGllZCA9IGZ1bmN0aW9uIFByb21pc2UkX2lzUHJveGllZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNDE5NDMwNCkgPT09IDQxOTQzMDQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0UHJveGllZCA9IGZ1bmN0aW9uIFByb21pc2UkX3NldFByb3hpZWQoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDQxOTQzMDQ7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fdW5zZXRQcm94aWVkID0gZnVuY3Rpb24gUHJvbWlzZSRfdW5zZXRQcm94aWVkKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjQxOTQzMDQpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2lzR2NRdWV1ZWQgPSBmdW5jdGlvbiBQcm9taXNlJF9pc0djUXVldWVkKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAtMTA3Mzc0MTgyNCkgPT09IC0xMDczNzQxODI0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEdjUXVldWVkID0gZnVuY3Rpb24gUHJvbWlzZSRfc2V0R2NRdWV1ZWQoKSB7XG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IC0xMDczNzQxODI0O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0R2NRdWV1ZWQgPSBmdW5jdGlvbiBQcm9taXNlJF91bnNldEdjUXVldWVkKCkge1xuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofi0xMDczNzQxODI0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9xdWV1ZUdDID0gZnVuY3Rpb24gUHJvbWlzZSRfcXVldWVHQygpIHtcbiAgICBpZiAodGhpcy5faXNHY1F1ZXVlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fc2V0R2NRdWV1ZWQoKTtcbiAgICBhc3luYy5pbnZva2VMYXRlcih0aGlzLl9nYywgdGhpcywgdm9pZCAwKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9nYyA9IGZ1bmN0aW9uIFByb21pc2UkZ2MoKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMuX2xlbmd0aCgpICogNSAtIDU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZWxldGUgdGhpc1tpXTtcbiAgICB9XG4gICAgdGhpcy5fY2xlYXJGaXJzdEhhbmRsZXJEYXRhKCk7XG4gICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xuICAgIHRoaXMuX3Vuc2V0R2NRdWV1ZWQoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9jbGVhckZpcnN0SGFuZGxlckRhdGEgPVxuZnVuY3Rpb24gUHJvbWlzZSRfY2xlYXJGaXJzdEhhbmRsZXJEYXRhKCkge1xuICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjAgPSB2b2lkIDA7XG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSB2b2lkIDA7XG4gICAgdGhpcy5fcHJvbWlzZTAgPSB2b2lkIDA7XG4gICAgdGhpcy5fcmVjZWl2ZXIwID0gdm9pZCAwO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3F1ZXVlU2V0dGxlQXQgPSBmdW5jdGlvbiBQcm9taXNlJF9xdWV1ZVNldHRsZUF0KGluZGV4KSB7XG4gICAgaWYgKHRoaXMuX2lzUmVqZWN0aW9uVW5oYW5kbGVkKCkpIHRoaXMuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcbiAgICBhc3luYy5pbnZva2UodGhpcy5fc2V0dGxlUHJvbWlzZUF0LCB0aGlzLCBpbmRleCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbFVuY2hlY2tlZCA9XG5mdW5jdGlvbiBQcm9taXNlJF9mdWxmaWxsVW5jaGVja2VkKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmlzUGVuZGluZygpKSByZXR1cm47XG4gICAgaWYgKHZhbHVlID09PSB0aGlzKSB7XG4gICAgICAgIHZhciBlcnIgPSBtYWtlU2VsZlJlc29sdXRpb25FcnJvcigpO1xuICAgICAgICB0aGlzLl9hdHRhY2hFeHRyYVRyYWNlKGVycik7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWplY3RVbmNoZWNrZWQoZXJyLCB2b2lkIDApO1xuICAgIH1cbiAgICB0aGlzLl9jbGVhblZhbHVlcygpO1xuICAgIHRoaXMuX3NldEZ1bGZpbGxlZCgpO1xuICAgIHRoaXMuX3NldHRsZWRWYWx1ZSA9IHZhbHVlO1xuICAgIHZhciBsZW4gPSB0aGlzLl9sZW5ndGgoKTtcblxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGFzeW5jLmludm9rZSh0aGlzLl9zZXR0bGVQcm9taXNlcywgdGhpcywgbGVuKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0VW5jaGVja2VkQ2hlY2tFcnJvciA9XG5mdW5jdGlvbiBQcm9taXNlJF9yZWplY3RVbmNoZWNrZWRDaGVja0Vycm9yKHJlYXNvbikge1xuICAgIHZhciB0cmFjZSA9IGNhbkF0dGFjaChyZWFzb24pID8gcmVhc29uIDogbmV3IEVycm9yKHJlYXNvbiArIFwiXCIpO1xuICAgIHRoaXMuX3JlamVjdFVuY2hlY2tlZChyZWFzb24sIHRyYWNlID09PSByZWFzb24gPyB2b2lkIDAgOiB0cmFjZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0VW5jaGVja2VkID1cbmZ1bmN0aW9uIFByb21pc2UkX3JlamVjdFVuY2hlY2tlZChyZWFzb24sIHRyYWNlKSB7XG4gICAgaWYgKCF0aGlzLmlzUGVuZGluZygpKSByZXR1cm47XG4gICAgaWYgKHJlYXNvbiA9PT0gdGhpcykge1xuICAgICAgICB2YXIgZXJyID0gbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IoKTtcbiAgICAgICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZShlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0VW5jaGVja2VkKGVycik7XG4gICAgfVxuICAgIHRoaXMuX2NsZWFuVmFsdWVzKCk7XG4gICAgdGhpcy5fc2V0UmVqZWN0ZWQoKTtcbiAgICB0aGlzLl9zZXR0bGVkVmFsdWUgPSByZWFzb247XG5cbiAgICBpZiAodGhpcy5faXNGaW5hbCgpKSB7XG4gICAgICAgIGFzeW5jLmludm9rZUxhdGVyKHRocm93ZXIsIHZvaWQgMCwgdHJhY2UgPT09IHZvaWQgMCA/IHJlYXNvbiA6IHRyYWNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbGVuID0gdGhpcy5fbGVuZ3RoKCk7XG5cbiAgICBpZiAodHJhY2UgIT09IHZvaWQgMCkgdGhpcy5fc2V0Q2FycmllZFN0YWNrVHJhY2UodHJhY2UpO1xuXG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgYXN5bmMuaW52b2tlKHRoaXMuX3JlamVjdFByb21pc2VzLCB0aGlzLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lbnN1cmVQb3NzaWJsZVJlamVjdGlvbkhhbmRsZWQoKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0UHJvbWlzZXMgPSBmdW5jdGlvbiBQcm9taXNlJF9yZWplY3RQcm9taXNlcygpIHtcbiAgICB0aGlzLl9zZXR0bGVQcm9taXNlcygpO1xuICAgIHRoaXMuX3Vuc2V0Q2FycmllZFN0YWNrVHJhY2UoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlcyA9IGZ1bmN0aW9uIFByb21pc2UkX3NldHRsZVByb21pc2VzKCkge1xuICAgIHZhciBsZW4gPSB0aGlzLl9sZW5ndGgoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2VBdChpKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkID1cbmZ1bmN0aW9uIFByb21pc2UkX2Vuc3VyZVBvc3NpYmxlUmVqZWN0aW9uSGFuZGxlZCgpIHtcbiAgICB0aGlzLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgIGlmIChDYXB0dXJlZFRyYWNlLnBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICAgICAgYXN5bmMuaW52b2tlTGF0ZXIodGhpcy5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uLCB0aGlzLCB2b2lkIDApO1xuICAgIH1cbn07XG5cblByb21pc2UucHJvdG90eXBlLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb25Jc0hhbmRsZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uSXNIYW5kbGVkKCkge1xuICAgIGlmICh0eXBlb2YgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGFzeW5jLmludm9rZUxhdGVyKHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQsIHZvaWQgMCwgdGhpcyk7XG4gICAgfVxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX25vdGlmeVVuaGFuZGxlZFJlamVjdGlvbiA9XG5mdW5jdGlvbiBQcm9taXNlJF9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVqZWN0aW9uVW5oYW5kbGVkKCkpIHtcbiAgICAgICAgdmFyIHJlYXNvbiA9IHRoaXMuX3NldHRsZWRWYWx1ZTtcbiAgICAgICAgdmFyIHRyYWNlID0gdGhpcy5fZ2V0Q2FycmllZFN0YWNrVHJhY2UoKTtcblxuICAgICAgICB0aGlzLl9zZXRVbmhhbmRsZWRSZWplY3Rpb25Jc05vdGlmaWVkKCk7XG5cbiAgICAgICAgaWYgKHRyYWNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIHRoaXMuX3Vuc2V0Q2FycmllZFN0YWNrVHJhY2UoKTtcbiAgICAgICAgICAgIHJlYXNvbiA9IHRyYWNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgQ2FwdHVyZWRUcmFjZS5wb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBDYXB0dXJlZFRyYWNlLnBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uKHJlYXNvbiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgY29udGV4dFN0YWNrID0gW107XG5Qcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQgPSBmdW5jdGlvbiBQcm9taXNlJF9wZWVrQ29udGV4dCgpIHtcbiAgICB2YXIgbGFzdEluZGV4ID0gY29udGV4dFN0YWNrLmxlbmd0aCAtIDE7XG4gICAgaWYgKGxhc3RJbmRleCA+PSAwKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0U3RhY2tbbGFzdEluZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcblxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX3B1c2hDb250ZXh0ID0gZnVuY3Rpb24gUHJvbWlzZSRfcHVzaENvbnRleHQoKSB7XG4gICAgaWYgKCFkZWJ1Z2dpbmcpIHJldHVybjtcbiAgICBjb250ZXh0U3RhY2sucHVzaCh0aGlzKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0ID0gZnVuY3Rpb24gUHJvbWlzZSRfcG9wQ29udGV4dCgpIHtcbiAgICBpZiAoIWRlYnVnZ2luZykgcmV0dXJuO1xuICAgIGNvbnRleHRTdGFjay5wb3AoKTtcbn07XG5cblByb21pc2Uubm9Db25mbGljdCA9IGZ1bmN0aW9uIFByb21pc2UkTm9Db25mbGljdCgpIHtcbiAgICByZXR1cm4gbm9Db25mbGljdChQcm9taXNlKTtcbn07XG5cblByb21pc2Uuc2V0U2NoZWR1bGVyID0gZnVuY3Rpb24oZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJmbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgYXN5bmMuX3NjaGVkdWxlID0gZm47XG59O1xuXG5pZiAoIUNhcHR1cmVkVHJhY2UuaXNTdXBwb3J0ZWQoKSkge1xuICAgIFByb21pc2UubG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24oKXt9O1xuICAgIGRlYnVnZ2luZyA9IGZhbHNlO1xufVxuXG5Qcm9taXNlLl9tYWtlU2VsZlJlc29sdXRpb25FcnJvciA9IG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yO1xucmVxdWlyZShcIi4vZmluYWxseS5qc1wiKShQcm9taXNlLCBORVhUX0ZJTFRFUiwgY2FzdCk7XG5yZXF1aXJlKFwiLi9kaXJlY3RfcmVzb2x2ZS5qc1wiKShQcm9taXNlKTtcbnJlcXVpcmUoXCIuL3N5bmNocm9ub3VzX2luc3BlY3Rpb24uanNcIikoUHJvbWlzZSk7XG5yZXF1aXJlKFwiLi9qb2luLmpzXCIpKFByb21pc2UsIFByb21pc2VBcnJheSwgY2FzdCwgSU5URVJOQUwpO1xuUHJvbWlzZS5SYW5nZUVycm9yID0gUmFuZ2VFcnJvcjtcblByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IgPSBDYW5jZWxsYXRpb25FcnJvcjtcblByb21pc2UuVGltZW91dEVycm9yID0gVGltZW91dEVycm9yO1xuUHJvbWlzZS5UeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5Qcm9taXNlLk9wZXJhdGlvbmFsRXJyb3IgPSBPcGVyYXRpb25hbEVycm9yO1xuUHJvbWlzZS5SZWplY3Rpb25FcnJvciA9IE9wZXJhdGlvbmFsRXJyb3I7XG5Qcm9taXNlLkFnZ3JlZ2F0ZUVycm9yID0gZXJyb3JzLkFnZ3JlZ2F0ZUVycm9yO1xuXG51dGlsLnRvRmFzdFByb3BlcnRpZXMoUHJvbWlzZSk7XG51dGlsLnRvRmFzdFByb3BlcnRpZXMoUHJvbWlzZS5wcm90b3R5cGUpO1xuUHJvbWlzZS5Qcm9taXNlID0gUHJvbWlzZTtcbnJlcXVpcmUoJy4vdGltZXJzLmpzJykoUHJvbWlzZSxJTlRFUk5BTCxjYXN0KTtcbnJlcXVpcmUoJy4vcmFjZS5qcycpKFByb21pc2UsSU5URVJOQUwsY2FzdCk7XG5yZXF1aXJlKCcuL2NhbGxfZ2V0LmpzJykoUHJvbWlzZSk7XG5yZXF1aXJlKCcuL2dlbmVyYXRvcnMuanMnKShQcm9taXNlLGFwaVJlamVjdGlvbixJTlRFUk5BTCxjYXN0KTtcbnJlcXVpcmUoJy4vbWFwLmpzJykoUHJvbWlzZSxQcm9taXNlQXJyYXksYXBpUmVqZWN0aW9uLGNhc3QsSU5URVJOQUwpO1xucmVxdWlyZSgnLi9ub2RlaWZ5LmpzJykoUHJvbWlzZSk7XG5yZXF1aXJlKCcuL3Byb21pc2lmeS5qcycpKFByb21pc2UsSU5URVJOQUwpO1xucmVxdWlyZSgnLi9wcm9wcy5qcycpKFByb21pc2UsUHJvbWlzZUFycmF5LGNhc3QpO1xucmVxdWlyZSgnLi9yZWR1Y2UuanMnKShQcm9taXNlLFByb21pc2VBcnJheSxhcGlSZWplY3Rpb24sY2FzdCxJTlRFUk5BTCk7XG5yZXF1aXJlKCcuL3NldHRsZS5qcycpKFByb21pc2UsUHJvbWlzZUFycmF5KTtcbnJlcXVpcmUoJy4vc29tZS5qcycpKFByb21pc2UsUHJvbWlzZUFycmF5LGFwaVJlamVjdGlvbik7XG5yZXF1aXJlKCcuL3Byb2dyZXNzLmpzJykoUHJvbWlzZSxQcm9taXNlQXJyYXkpO1xucmVxdWlyZSgnLi9jYW5jZWwuanMnKShQcm9taXNlLElOVEVSTkFMKTtcbnJlcXVpcmUoJy4vZmlsdGVyLmpzJykoUHJvbWlzZSxJTlRFUk5BTCk7XG5yZXF1aXJlKCcuL2FueS5qcycpKFByb21pc2UsUHJvbWlzZUFycmF5KTtcbnJlcXVpcmUoJy4vZWFjaC5qcycpKFByb21pc2UsSU5URVJOQUwpO1xucmVxdWlyZSgnLi91c2luZy5qcycpKFByb21pc2UsYXBpUmVqZWN0aW9uLGNhc3QpO1xuXG5Qcm9taXNlLnByb3RvdHlwZSA9IFByb21pc2UucHJvdG90eXBlO1xucmV0dXJuIFByb21pc2U7XG5cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL3Byb21pc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciBlczUgPSByZXF1aXJlKFwiLi9lczUuanNcIik7XG52YXIgaGF2ZUdldHRlcnMgPSAoZnVuY3Rpb24oKXtcbiAgICB0cnkge1xuICAgICAgICB2YXIgbyA9IHt9O1xuICAgICAgICBlczUuZGVmaW5lUHJvcGVydHkobywgXCJmXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG8uZiA9PT0gMztcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufSkoKTtcbnZhciBjYW5FdmFsdWF0ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBlcnJvck9iaiA9IHtlOiB7fX07XG5mdW5jdGlvbiB0cnlDYXRjaDEoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB0cnkgeyByZXR1cm4gZm4uY2FsbChyZWNlaXZlciwgYXJnKTsgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cnlDYXRjaDIoZm4sIHJlY2VpdmVyLCBhcmcsIGFyZzIpIHtcbiAgICB0cnkgeyByZXR1cm4gZm4uY2FsbChyZWNlaXZlciwgYXJnLCBhcmcyKTsgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cnlDYXRjaDMoZm4sIHJlY2VpdmVyLCBhcmcsIGFyZzIsIGFyZzMpIHtcbiAgICB0cnkgeyByZXR1cm4gZm4uY2FsbChyZWNlaXZlciwgYXJnLCBhcmcyLCBhcmczKTsgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cnlDYXRjaDQoZm4sIHJlY2VpdmVyLCBhcmcsIGFyZzIsIGFyZzMsIGFyZzQpIHtcbiAgICB0cnkgeyByZXR1cm4gZm4uY2FsbChyZWNlaXZlciwgYXJnLCBhcmcyLCBhcmczLCBhcmc0KTsgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cnlDYXRjaEFwcGx5KGZuLCBhcmdzLCByZWNlaXZlcikge1xuICAgIHRyeSB7IHJldHVybiBmbi5hcHBseShyZWNlaXZlciwgYXJncyk7IH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iai5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH1cbn1cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24oQ2hpbGQsIFBhcmVudCkge1xuICAgIHZhciBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgICBmdW5jdGlvbiBUKCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IkID0gUGFyZW50O1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gUGFyZW50LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChQYXJlbnQucHJvdG90eXBlLCBwcm9wZXJ0eU5hbWUpICYmXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lLmNoYXJBdChwcm9wZXJ0eU5hbWUubGVuZ3RoLTEpICE9PSBcIiRcIlxuICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZSArIFwiJFwiXSA9IFBhcmVudC5wcm90b3R5cGVbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBULnByb3RvdHlwZSA9IFBhcmVudC5wcm90b3R5cGU7XG4gICAgQ2hpbGQucHJvdG90eXBlID0gbmV3IFQoKTtcbiAgICByZXR1cm4gQ2hpbGQucHJvdG90eXBlO1xufTtcblxuZnVuY3Rpb24gYXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgPyB2YWwgOiAoXCJcIiArIHZhbCk7XG59XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT0gbnVsbCB8fCB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZSB8fFxuICAgICAgICB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCI7XG5cbn1cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gIWlzUHJpbWl0aXZlKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWF5YmVXcmFwQXNFcnJvcihtYXliZUVycm9yKSB7XG4gICAgaWYgKCFpc1ByaW1pdGl2ZShtYXliZUVycm9yKSkgcmV0dXJuIG1heWJlRXJyb3I7XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKGFzU3RyaW5nKG1heWJlRXJyb3IpKTtcbn1cblxuZnVuY3Rpb24gd2l0aEFwcGVuZGVkKHRhcmdldCwgYXBwZW5kZWUpIHtcbiAgICB2YXIgbGVuID0gdGFyZ2V0Lmxlbmd0aDtcbiAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGxlbiArIDEpO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICByZXRbaV0gPSB0YXJnZXRbaV07XG4gICAgfVxuICAgIHJldFtpXSA9IGFwcGVuZGVlO1xuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdChvYmosIGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKGVzNS5pc0VTNSkge1xuICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzYyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gZGVzYy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSA/IG9ialtrZXldIDogdm9pZCAwO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbm90RW51bWVyYWJsZVByb3Aob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChpc1ByaW1pdGl2ZShvYmopKSByZXR1cm4gb2JqO1xuICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfTtcbiAgICBlczUuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5cbnZhciB3cmFwc1ByaW1pdGl2ZVJlY2VpdmVyID0gKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzICE9PSBcInN0cmluZ1wiO1xufSkuY2FsbChcInN0cmluZ1wiKTtcblxuZnVuY3Rpb24gdGhyb3dlcihyKSB7XG4gICAgdGhyb3cgcjtcbn1cblxudmFyIGluaGVyaXRlZERhdGFLZXlzID0gKGZ1bmN0aW9uKCkge1xuICAgIGlmIChlczUuaXNFUzUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgb3B0cykge1xuICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICAgICAgdmFyIHZpc2l0ZWRLZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICAgIHZhciBnZXRLZXlzID0gT2JqZWN0KG9wdHMpLmluY2x1ZGVIaWRkZW5cbiAgICAgICAgICAgICAgICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cztcbiAgICAgICAgICAgIHdoaWxlIChvYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlzO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBnZXRLZXlzKG9iaik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkS2V5c1trZXldKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaXRlZEtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9IG51bGwgJiYgZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IGVzNS5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgICAgICAvKmpzaGludCBmb3JpbjpmYWxzZSAqL1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9O1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gaXNDbGFzcyhmbikge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBlczUua2V5cyhmbi5wcm90b3R5cGUpO1xuICAgICAgICAgICAgcmV0dXJuIGtleXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICEoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gXCJjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b0Zhc3RQcm9wZXJ0aWVzKG9iaikge1xuICAgIC8qanNoaW50IC1XMDI3Ki9cbiAgICBmdW5jdGlvbiBmKCkge31cbiAgICBmLnByb3RvdHlwZSA9IG9iajtcbiAgICByZXR1cm4gZjtcbiAgICBldmFsKG9iaik7XG59XG5cbnZhciByaWRlbnQgPSAvXlthLXokX11bYS16JF8wLTldKiQvaTtcbmZ1bmN0aW9uIGlzSWRlbnRpZmllcihzdHIpIHtcbiAgICByZXR1cm4gcmlkZW50LnRlc3Qoc3RyKTtcbn1cblxuZnVuY3Rpb24gZmlsbGVkUmFuZ2UoY291bnQsIHByZWZpeCwgc3VmZml4KSB7XG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShjb3VudCk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgcmV0W2ldID0gcHJlZml4ICsgaSArIHN1ZmZpeDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxudmFyIHJldCA9IHtcbiAgICBpc0NsYXNzOiBpc0NsYXNzLFxuICAgIGlzSWRlbnRpZmllcjogaXNJZGVudGlmaWVyLFxuICAgIGluaGVyaXRlZERhdGFLZXlzOiBpbmhlcml0ZWREYXRhS2V5cyxcbiAgICBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQ6IGdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdCxcbiAgICB0aHJvd2VyOiB0aHJvd2VyLFxuICAgIGlzQXJyYXk6IGVzNS5pc0FycmF5LFxuICAgIGhhdmVHZXR0ZXJzOiBoYXZlR2V0dGVycyxcbiAgICBub3RFbnVtZXJhYmxlUHJvcDogbm90RW51bWVyYWJsZVByb3AsXG4gICAgaXNQcmltaXRpdmU6IGlzUHJpbWl0aXZlLFxuICAgIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgICBjYW5FdmFsdWF0ZTogY2FuRXZhbHVhdGUsXG4gICAgZXJyb3JPYmo6IGVycm9yT2JqLFxuICAgIHRyeUNhdGNoMTogdHJ5Q2F0Y2gxLFxuICAgIHRyeUNhdGNoMjogdHJ5Q2F0Y2gyLFxuICAgIHRyeUNhdGNoMzogdHJ5Q2F0Y2gzLFxuICAgIHRyeUNhdGNoNDogdHJ5Q2F0Y2g0LFxuICAgIHRyeUNhdGNoQXBwbHk6IHRyeUNhdGNoQXBwbHksXG4gICAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICAgIHdpdGhBcHBlbmRlZDogd2l0aEFwcGVuZGVkLFxuICAgIGFzU3RyaW5nOiBhc1N0cmluZyxcbiAgICBtYXliZVdyYXBBc0Vycm9yOiBtYXliZVdyYXBBc0Vycm9yLFxuICAgIHdyYXBzUHJpbWl0aXZlUmVjZWl2ZXI6IHdyYXBzUHJpbWl0aXZlUmVjZWl2ZXIsXG4gICAgdG9GYXN0UHJvcGVydGllczogdG9GYXN0UHJvcGVydGllcyxcbiAgICBmaWxsZWRSYW5nZTogZmlsbGVkUmFuZ2Vcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmV0O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi91dGlsLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgc2NoZWR1bGUgPSByZXF1aXJlKFwiLi9zY2hlZHVsZS5qc1wiKTtcbnZhciBRdWV1ZSA9IHJlcXVpcmUoXCIuL3F1ZXVlLmpzXCIpO1xudmFyIGVycm9yT2JqID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKS5lcnJvck9iajtcbnZhciB0cnlDYXRjaDEgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpLnRyeUNhdGNoMTtcbnZhciBfcHJvY2VzcyA9IHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiID8gcHJvY2VzcyA6IHZvaWQgMDtcblxuZnVuY3Rpb24gQXN5bmMoKSB7XG4gICAgdGhpcy5faXNUaWNrVXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3NjaGVkdWxlID0gc2NoZWR1bGU7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXRlQnVmZmVyID0gbmV3IFF1ZXVlKDE2KTtcbiAgICB0aGlzLl9mdW5jdGlvbkJ1ZmZlciA9IG5ldyBRdWV1ZSg2NTUzNik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuY29uc3VtZUZ1bmN0aW9uQnVmZmVyID0gZnVuY3Rpb24gQXN5bmMkY29uc3VtZUZ1bmN0aW9uQnVmZmVyKCkge1xuICAgICAgICBzZWxmLl9jb25zdW1lRnVuY3Rpb25CdWZmZXIoKTtcbiAgICB9O1xufVxuXG5Bc3luYy5wcm90b3R5cGUuaGF2ZUl0ZW1zUXVldWVkID0gZnVuY3Rpb24gQXN5bmMkaGF2ZUl0ZW1zUXVldWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGggPiAwO1xufTtcblxuQXN5bmMucHJvdG90eXBlLmludm9rZUxhdGVyID0gZnVuY3Rpb24gQXN5bmMkaW52b2tlTGF0ZXIoZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICBpZiAoX3Byb2Nlc3MgIT09IHZvaWQgMCAmJlxuICAgICAgICBfcHJvY2Vzcy5kb21haW4gIT0gbnVsbCAmJlxuICAgICAgICAhZm4uZG9tYWluKSB7XG4gICAgICAgIGZuID0gX3Byb2Nlc3MuZG9tYWluLmJpbmQoZm4pO1xuICAgIH1cbiAgICB0aGlzLl9sYXRlQnVmZmVyLnB1c2goZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufTtcblxuQXN5bmMucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIEFzeW5jJGludm9rZShmbiwgcmVjZWl2ZXIsIGFyZykge1xuICAgIGlmIChfcHJvY2VzcyAhPT0gdm9pZCAwICYmXG4gICAgICAgIF9wcm9jZXNzLmRvbWFpbiAhPSBudWxsICYmXG4gICAgICAgICFmbi5kb21haW4pIHtcbiAgICAgICAgZm4gPSBfcHJvY2Vzcy5kb21haW4uYmluZChmbik7XG4gICAgfVxuICAgIHZhciBmdW5jdGlvbkJ1ZmZlciA9IHRoaXMuX2Z1bmN0aW9uQnVmZmVyO1xuICAgIGZ1bmN0aW9uQnVmZmVyLnB1c2goZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgIHRoaXMuX2xlbmd0aCA9IGZ1bmN0aW9uQnVmZmVyLmxlbmd0aCgpO1xuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xufTtcblxuQXN5bmMucHJvdG90eXBlLl9jb25zdW1lRnVuY3Rpb25CdWZmZXIgPVxuZnVuY3Rpb24gQXN5bmMkX2NvbnN1bWVGdW5jdGlvbkJ1ZmZlcigpIHtcbiAgICB2YXIgZnVuY3Rpb25CdWZmZXIgPSB0aGlzLl9mdW5jdGlvbkJ1ZmZlcjtcbiAgICB3aGlsZSAoZnVuY3Rpb25CdWZmZXIubGVuZ3RoKCkgPiAwKSB7XG4gICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uQnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIHZhciByZWNlaXZlciA9IGZ1bmN0aW9uQnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIHZhciBhcmcgPSBmdW5jdGlvbkJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICBmbi5jYWxsKHJlY2VpdmVyLCBhcmcpO1xuICAgIH1cbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHRoaXMuX2NvbnN1bWVMYXRlQnVmZmVyKCk7XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX2NvbnN1bWVMYXRlQnVmZmVyID0gZnVuY3Rpb24gQXN5bmMkX2NvbnN1bWVMYXRlQnVmZmVyKCkge1xuICAgIHZhciBidWZmZXIgPSB0aGlzLl9sYXRlQnVmZmVyO1xuICAgIHdoaWxlKGJ1ZmZlci5sZW5ndGgoKSA+IDApIHtcbiAgICAgICAgdmFyIGZuID0gYnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIHZhciByZWNlaXZlciA9IGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICB2YXIgYXJnID0gYnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIHZhciByZXMgPSB0cnlDYXRjaDEoZm4sIHJlY2VpdmVyLCBhcmcpO1xuICAgICAgICBpZiAocmVzID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgdGhpcy5fcXVldWVUaWNrKCk7XG4gICAgICAgICAgICBpZiAoZm4uZG9tYWluICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmbi5kb21haW4uZW1pdChcImVycm9yXCIsIHJlcy5lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgcmVzLmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX3F1ZXVlVGljayA9IGZ1bmN0aW9uIEFzeW5jJF9xdWV1ZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzVGlja1VzZWQpIHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGUodGhpcy5jb25zdW1lRnVuY3Rpb25CdWZmZXIpO1xuICAgICAgICB0aGlzLl9pc1RpY2tVc2VkID0gdHJ1ZTtcbiAgICB9XG59O1xuXG5Bc3luYy5wcm90b3R5cGUuX3Jlc2V0ID0gZnVuY3Rpb24gQXN5bmMkX3Jlc2V0KCkge1xuICAgIHRoaXMuX2lzVGlja1VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgQXN5bmMoKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vYXN5bmMuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciBPYmplY3RmcmVlemUgPSByZXF1aXJlKFwiLi9lczUuanNcIikuZnJlZXplO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGluaGVyaXRzID0gdXRpbC5pbmhlcml0cztcbnZhciBub3RFbnVtZXJhYmxlUHJvcCA9IHV0aWwubm90RW51bWVyYWJsZVByb3A7XG5cbmZ1bmN0aW9uIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AoZSwgXCJpc09wZXJhdGlvbmFsXCIsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaChpZ25vcmUpIHt9XG59XG5cbmZ1bmN0aW9uIG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uKGUpIHtcbiAgICBpZiAoZSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICgoZSBpbnN0YW5jZW9mIE9wZXJhdGlvbmFsRXJyb3IpIHx8XG4gICAgICAgIGVbXCJpc09wZXJhdGlvbmFsXCJdID09PSB0cnVlKTtcbn1cblxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3I7XG59XG5cbmZ1bmN0aW9uIGNhbkF0dGFjaChvYmopIHtcbiAgICByZXR1cm4gaXNFcnJvcihvYmopO1xufVxuXG5mdW5jdGlvbiBzdWJFcnJvcihuYW1lUHJvcGVydHksIGRlZmF1bHRNZXNzYWdlKSB7XG4gICAgZnVuY3Rpb24gU3ViRXJyb3IobWVzc2FnZSkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU3ViRXJyb3IpKSByZXR1cm4gbmV3IFN1YkVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIiA/IG1lc3NhZ2UgOiBkZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVByb3BlcnR5O1xuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaGVyaXRzKFN1YkVycm9yLCBFcnJvcik7XG4gICAgcmV0dXJuIFN1YkVycm9yO1xufVxuXG52YXIgX1R5cGVFcnJvciwgX1JhbmdlRXJyb3I7XG52YXIgQ2FuY2VsbGF0aW9uRXJyb3IgPSBzdWJFcnJvcihcIkNhbmNlbGxhdGlvbkVycm9yXCIsIFwiY2FuY2VsbGF0aW9uIGVycm9yXCIpO1xudmFyIFRpbWVvdXRFcnJvciA9IHN1YkVycm9yKFwiVGltZW91dEVycm9yXCIsIFwidGltZW91dCBlcnJvclwiKTtcbnZhciBBZ2dyZWdhdGVFcnJvciA9IHN1YkVycm9yKFwiQWdncmVnYXRlRXJyb3JcIiwgXCJhZ2dyZWdhdGUgZXJyb3JcIik7XG50cnkge1xuICAgIF9UeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gICAgX1JhbmdlRXJyb3IgPSBSYW5nZUVycm9yO1xufSBjYXRjaChlKSB7XG4gICAgX1R5cGVFcnJvciA9IHN1YkVycm9yKFwiVHlwZUVycm9yXCIsIFwidHlwZSBlcnJvclwiKTtcbiAgICBfUmFuZ2VFcnJvciA9IHN1YkVycm9yKFwiUmFuZ2VFcnJvclwiLCBcInJhbmdlIGVycm9yXCIpO1xufVxuXG52YXIgbWV0aG9kcyA9IChcImpvaW4gcG9wIHB1c2ggc2hpZnQgdW5zaGlmdCBzbGljZSBmaWx0ZXIgZm9yRWFjaCBzb21lIFwiICtcbiAgICBcImV2ZXJ5IG1hcCBpbmRleE9mIGxhc3RJbmRleE9mIHJlZHVjZSByZWR1Y2VSaWdodCBzb3J0IHJldmVyc2VcIikuc3BsaXQoXCIgXCIpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZVttZXRob2RzW2ldXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZVttZXRob2RzW2ldXSA9IEFycmF5LnByb3RvdHlwZVttZXRob2RzW2ldXTtcbiAgICB9XG59XG5cbkFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZS5sZW5ndGggPSAwO1xuQWdncmVnYXRlRXJyb3IucHJvdG90eXBlW1wiaXNPcGVyYXRpb25hbFwiXSA9IHRydWU7XG52YXIgbGV2ZWwgPSAwO1xuQWdncmVnYXRlRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZGVudCA9IEFycmF5KGxldmVsICogNCArIDEpLmpvaW4oXCIgXCIpO1xuICAgIHZhciByZXQgPSBcIlxcblwiICsgaW5kZW50ICsgXCJBZ2dyZWdhdGVFcnJvciBvZjpcIiArIFwiXFxuXCI7XG4gICAgbGV2ZWwrKztcbiAgICBpbmRlbnQgPSBBcnJheShsZXZlbCAqIDQgKyAxKS5qb2luKFwiIFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHN0ciA9IHRoaXNbaV0gPT09IHRoaXMgPyBcIltDaXJjdWxhciBBZ2dyZWdhdGVFcnJvcl1cIiA6IHRoaXNbaV0gKyBcIlwiO1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGluZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIGxpbmVzW2pdID0gaW5kZW50ICsgbGluZXNbal07XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gbGluZXMuam9pbihcIlxcblwiKTtcbiAgICAgICAgcmV0ICs9IHN0ciArIFwiXFxuXCI7XG4gICAgfVxuICAgIGxldmVsLS07XG4gICAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIE9wZXJhdGlvbmFsRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubmFtZSA9IFwiT3BlcmF0aW9uYWxFcnJvclwiO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5jYXVzZSA9IG1lc3NhZ2U7XG4gICAgdGhpc1tcImlzT3BlcmF0aW9uYWxcIl0gPSB0cnVlO1xuXG4gICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlLm1lc3NhZ2U7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBtZXNzYWdlLnN0YWNrO1xuICAgIH0gZWxzZSBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuXG59XG5pbmhlcml0cyhPcGVyYXRpb25hbEVycm9yLCBFcnJvcik7XG5cbnZhciBrZXkgPSBcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIjtcbnZhciBlcnJvclR5cGVzID0gRXJyb3Jba2V5XTtcbmlmICghZXJyb3JUeXBlcykge1xuICAgIGVycm9yVHlwZXMgPSBPYmplY3RmcmVlemUoe1xuICAgICAgICBDYW5jZWxsYXRpb25FcnJvcjogQ2FuY2VsbGF0aW9uRXJyb3IsXG4gICAgICAgIFRpbWVvdXRFcnJvcjogVGltZW91dEVycm9yLFxuICAgICAgICBPcGVyYXRpb25hbEVycm9yOiBPcGVyYXRpb25hbEVycm9yLFxuICAgICAgICBSZWplY3Rpb25FcnJvcjogT3BlcmF0aW9uYWxFcnJvcixcbiAgICAgICAgQWdncmVnYXRlRXJyb3I6IEFnZ3JlZ2F0ZUVycm9yXG4gICAgfSk7XG4gICAgbm90RW51bWVyYWJsZVByb3AoRXJyb3IsIGtleSwgZXJyb3JUeXBlcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEVycm9yOiBFcnJvcixcbiAgICBUeXBlRXJyb3I6IF9UeXBlRXJyb3IsXG4gICAgUmFuZ2VFcnJvcjogX1JhbmdlRXJyb3IsXG4gICAgQ2FuY2VsbGF0aW9uRXJyb3I6IGVycm9yVHlwZXMuQ2FuY2VsbGF0aW9uRXJyb3IsXG4gICAgT3BlcmF0aW9uYWxFcnJvcjogZXJyb3JUeXBlcy5PcGVyYXRpb25hbEVycm9yLFxuICAgIFRpbWVvdXRFcnJvcjogZXJyb3JUeXBlcy5UaW1lb3V0RXJyb3IsXG4gICAgQWdncmVnYXRlRXJyb3I6IGVycm9yVHlwZXMuQWdncmVnYXRlRXJyb3IsXG4gICAgb3JpZ2luYXRlc0Zyb21SZWplY3Rpb246IG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uLFxuICAgIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbjogbWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uLFxuICAgIGNhbkF0dGFjaDogY2FuQXR0YWNoXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9lcnJvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBjYW5BdHRhY2ggPSByZXF1aXJlKFwiLi9lcnJvcnMuanNcIikuY2FuQXR0YWNoO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBpc09iamVjdCA9IHV0aWwuaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGdldFRoZW4ob2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG9iai50aGVuO1xuICAgIH1cbiAgICBjYXRjaChlKSB7XG4gICAgICAgIGVycm9yT2JqLmUgPSBlO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBQcm9taXNlJF9DYXN0KG9iaiwgb3JpZ2luYWxQcm9taXNlKSB7XG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNBbnlCbHVlYmlyZFByb21pc2Uob2JqKSkge1xuICAgICAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICAgICAgICAgIHJldC5fc2V0VHJhY2Uodm9pZCAwKTtcbiAgICAgICAgICAgIG9iai5fdGhlbihcbiAgICAgICAgICAgICAgICByZXQuX2Z1bGZpbGxVbmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgcmV0Ll9yZWplY3RVbmNoZWNrZWRDaGVja0Vycm9yLFxuICAgICAgICAgICAgICAgIHJldC5fcHJvZ3Jlc3NVbmNoZWNrZWQsXG4gICAgICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXQuX3NldEZvbGxvd2luZygpO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGhlbiA9IGdldFRoZW4ob2JqKTtcbiAgICAgICAgaWYgKHRoZW4gPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxQcm9taXNlICE9PSB2b2lkIDAgJiYgY2FuQXR0YWNoKHRoZW4uZSkpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UodGhlbi5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh0aGVuLmUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlJF9kb1RoZW5hYmxlKG9iaiwgdGhlbiwgb3JpZ2luYWxQcm9taXNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG52YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuZnVuY3Rpb24gaXNBbnlCbHVlYmlyZFByb21pc2Uob2JqKSB7XG4gICAgcmV0dXJuIGhhc1Byb3AuY2FsbChvYmosIFwiX3Byb21pc2UwXCIpO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlJF9kb1RoZW5hYmxlKHgsIHRoZW4sIG9yaWdpbmFsUHJvbWlzZSkge1xuICAgIHZhciByZXNvbHZlciA9IFByb21pc2UuZGVmZXIoKTtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgdGhlbi5jYWxsKFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIFByb21pc2UkX3Jlc29sdmVGcm9tVGhlbmFibGUsXG4gICAgICAgICAgICBQcm9taXNlJF9yZWplY3RGcm9tVGhlbmFibGUsXG4gICAgICAgICAgICBQcm9taXNlJF9wcm9ncmVzc0Zyb21UaGVuYWJsZVxuICAgICAgICApO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGNhbkF0dGFjaChlKSA/IGUgOiBuZXcgRXJyb3IoZSArIFwiXCIpO1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsUHJvbWlzZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxQcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmVyLnByb21pc2UuX3JlamVjdChlLCB0cmFjZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmVyLnByb21pc2U7XG5cbiAgICBmdW5jdGlvbiBQcm9taXNlJF9yZXNvbHZlRnJvbVRoZW5hYmxlKHkpIHtcbiAgICAgICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgICB2YXIgZSA9IFByb21pc2UuX21ha2VTZWxmUmVzb2x1dGlvbkVycm9yKCk7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxQcm9taXNlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlci5wcm9taXNlLl9yZWplY3QoZSwgdm9pZCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlci5yZXNvbHZlKHkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFByb21pc2UkX3JlamVjdEZyb21UaGVuYWJsZShyKSB7XG4gICAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2FuQXR0YWNoKHIpID8gciA6IG5ldyBFcnJvcihyICsgXCJcIik7XG4gICAgICAgIGlmIChvcmlnaW5hbFByb21pc2UgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxQcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlci5wcm9taXNlLl9yZWplY3QociwgdHJhY2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIFByb21pc2UkX3Byb2dyZXNzRnJvbVRoZW5hYmxlKHYpIHtcbiAgICAgICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHJlc29sdmVyLnByb21pc2U7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvbWlzZS5fcHJvZ3Jlc3MgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcHJvbWlzZS5fcHJvZ3Jlc3Modik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnJldHVybiBQcm9taXNlJF9DYXN0O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vdGhlbmFibGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCBjYXN0KSB7XG52YXIgY2FuQXR0YWNoID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpLmNhbkF0dGFjaDtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBpc0FycmF5ID0gdXRpbC5pc0FycmF5O1xuXG5mdW5jdGlvbiB0b1Jlc29sdXRpb25WYWx1ZSh2YWwpIHtcbiAgICBzd2l0Y2godmFsKSB7XG4gICAgY2FzZSAtMTogcmV0dXJuIHZvaWQgMDtcbiAgICBjYXNlIC0yOiByZXR1cm4gW107XG4gICAgY2FzZSAtMzogcmV0dXJuIHt9O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gUHJvbWlzZUFycmF5KHZhbHVlcykge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICB2YXIgcGFyZW50ID0gdm9pZCAwO1xuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHBhcmVudCA9IHZhbHVlcztcbiAgICAgICAgcHJvbWlzZS5fcHJvcGFnYXRlRnJvbShwYXJlbnQsIDEgfCA0KTtcbiAgICB9XG4gICAgcHJvbWlzZS5fc2V0VHJhY2UocGFyZW50KTtcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkID0gMDtcbiAgICB0aGlzLl9pbml0KHZvaWQgMCwgLTIpO1xufVxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiBQcm9taXNlQXJyYXkkbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlQXJyYXkkcHJvbWlzZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9pbml0KF8sIHJlc29sdmVWYWx1ZUlmRW1wdHkpIHtcbiAgICB2YXIgdmFsdWVzID0gY2FzdCh0aGlzLl92YWx1ZXMsIHZvaWQgMCk7XG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB2YWx1ZXMuX3NldEJvdW5kVG8odGhpcy5fcHJvbWlzZS5fYm91bmRUbyk7XG4gICAgICAgIGlmICh2YWx1ZXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLl9zZXR0bGVkVmFsdWU7XG4gICAgICAgICAgICBpZiAoIWlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgUHJvbWlzZS5UeXBlRXJyb3IoXCJleHBlY3RpbmcgYW4gYXJyYXksIGEgcHJvbWlzZSBvciBhIHRoZW5hYmxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19oYXJkUmVqZWN0X18oZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVzLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICB2YWx1ZXMuX3RoZW4oXG4gICAgICAgICAgICAgICAgUHJvbWlzZUFycmF5JF9pbml0LFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlamVjdCxcbiAgICAgICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICByZXNvbHZlVmFsdWVJZkVtcHR5XG4gICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCh2YWx1ZXMuX3NldHRsZWRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBQcm9taXNlLlR5cGVFcnJvcihcImV4cGVjdGluZyBhbiBhcnJheSwgYSBwcm9taXNlIG9yIGEgdGhlbmFibGVcIik7XG4gICAgICAgIHRoaXMuX19oYXJkUmVqZWN0X18oZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChyZXNvbHZlVmFsdWVJZkVtcHR5ID09PSAtNSkge1xuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZUVtcHR5QXJyYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodG9SZXNvbHV0aW9uVmFsdWUocmVzb2x2ZVZhbHVlSWZFbXB0eSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGxlbiA9IHRoaXMuZ2V0QWN0dWFsTGVuZ3RoKHZhbHVlcy5sZW5ndGgpO1xuICAgIHZhciBuZXdMZW4gPSBsZW47XG4gICAgdmFyIG5ld1ZhbHVlcyA9IHRoaXMuc2hvdWxkQ29weVZhbHVlcygpID8gbmV3IEFycmF5KGxlbikgOiB0aGlzLl92YWx1ZXM7XG4gICAgdmFyIGlzRGlyZWN0U2Nhbk5lZWRlZCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodmFsdWVzW2ldLCB2b2lkIDApO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZS5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHlQcm9taXNlQXJyYXkodGhpcywgaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgICAgICAgICAgICAgIGlzRGlyZWN0U2Nhbk5lZWRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc0RpcmVjdFNjYW5OZWVkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG5ld1ZhbHVlc1tpXSA9IG1heWJlUHJvbWlzZTtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWVzID0gbmV3VmFsdWVzO1xuICAgIHRoaXMuX2xlbmd0aCA9IG5ld0xlbjtcbiAgICBpZiAoaXNEaXJlY3RTY2FuTmVlZGVkKSB7XG4gICAgICAgIHRoaXMuX3NjYW5EaXJlY3RWYWx1ZXMobGVuKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlQXQgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9zZXR0bGVQcm9taXNlQXQoaW5kZXgpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLl92YWx1ZXNbaW5kZXhdO1xuICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZSwgaW5kZXgpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLl9zZXR0bGVkVmFsdWUsIGluZGV4KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICB0aGlzLl9wcm9taXNlUmVqZWN0ZWQodmFsdWUuX3NldHRsZWRWYWx1ZSwgaW5kZXgpO1xuICAgIH1cbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3NjYW5EaXJlY3RWYWx1ZXMgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9zY2FuRGlyZWN0VmFsdWVzKGxlbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZUF0KGkpO1xuICAgIH1cbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX2lzUmVzb2x2ZWQgPSBmdW5jdGlvbiBQcm9taXNlQXJyYXkkX2lzUmVzb2x2ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcyA9PT0gbnVsbDtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmUgPSBmdW5jdGlvbiBQcm9taXNlQXJyYXkkX3Jlc29sdmUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHRoaXMuX3Byb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fX2hhcmRSZWplY3RfXyA9XG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZWplY3QgPSBmdW5jdGlvbiBQcm9taXNlQXJyYXkkX3JlamVjdChyZWFzb24pIHtcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xuICAgIHZhciB0cmFjZSA9IGNhbkF0dGFjaChyZWFzb24pID8gcmVhc29uIDogbmV3IEVycm9yKHJlYXNvbiArIFwiXCIpO1xuICAgIHRoaXMuX3Byb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UodHJhY2UpO1xuICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdChyZWFzb24sIHRyYWNlKTtcbn07XG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VQcm9ncmVzc2VkID1cbmZ1bmN0aW9uIFByb21pc2VBcnJheSRfcHJvbWlzZVByb2dyZXNzZWQocHJvZ3Jlc3NWYWx1ZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fcHJvbWlzZS5fcHJvZ3Jlc3Moe1xuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIHZhbHVlOiBwcm9ncmVzc1ZhbHVlXG4gICAgfSk7XG59O1xuXG5cblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLCBpbmRleCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICB9XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlUmVqZWN0ZWQgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9wcm9taXNlUmVqZWN0ZWQocmVhc29uLCBpbmRleCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkKys7XG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG59O1xuXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnNob3VsZENvcHlWYWx1ZXMgPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JF9zaG91bGRDb3B5VmFsdWVzKCkge1xuICAgIHJldHVybiB0cnVlO1xufTtcblxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5nZXRBY3R1YWxMZW5ndGggPVxuZnVuY3Rpb24gUHJvbWlzZUFycmF5JGdldEFjdHVhbExlbmd0aChsZW4pIHtcbiAgICByZXR1cm4gbGVuO1xufTtcblxucmV0dXJuIFByb21pc2VBcnJheTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL3Byb21pc2VfYXJyYXkuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpLmluaGVyaXRzO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZXM1LmpzXCIpLmRlZmluZVByb3BlcnR5O1xuXG52YXIgcmlnbm9yZSA9IG5ldyBSZWdFeHAoXG4gICAgXCJcXFxcYig/OlthLXpBLVowLTkuXStcXFxcJF9cXFxcdyt8XCIgK1xuICAgIFwidHJ5Q2F0Y2goPzoxfDJ8M3w0fEFwcGx5KXxuZXcgXFxcXHcqUHJvbWlzZUFycmF5fFwiICtcbiAgICBcIlxcXFx3KlByb21pc2VBcnJheVxcXFwuXFxcXHcqUHJvbWlzZUFycmF5fFwiICtcbiAgICBcInNldFRpbWVvdXR8Q2F0Y2hGaWx0ZXJcXFxcJF9cXFxcdyt8bWFrZU5vZGVQcm9taXNpZmllZHxwcm9jZXNzSW1tZWRpYXRlfFwiICtcbiAgICBcInByb2Nlc3MuX3RpY2tDYWxsYmFja3xuZXh0VGlja3xBc3luY1xcXFwkXFxcXHcrKVxcXFxiXCJcbik7XG5cbnZhciBydHJhY2VsaW5lID0gbnVsbDtcbnZhciBmb3JtYXRTdGFjayA9IG51bGw7XG5cbmZ1bmN0aW9uIGZvcm1hdE5vbkVycm9yKG9iaikge1xuICAgIHZhciBzdHI7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBzdHIgPSBcIltmdW5jdGlvbiBcIiArXG4gICAgICAgICAgICAob2JqLm5hbWUgfHwgXCJhbm9ueW1vdXNcIikgK1xuICAgICAgICAgICAgXCJdXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gb2JqLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBydXNlbGVzc1RvU3RyaW5nID0gL1xcW29iamVjdCBbYS16QS1aMC05JF9dK1xcXS87XG4gICAgICAgIGlmIChydXNlbGVzc1RvU3RyaW5nLnRlc3Qoc3RyKSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3U3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgICAgICAgICBzdHIgPSBuZXdTdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc3RyID0gXCIoZW1wdHkgYXJyYXkpXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChcIig8XCIgKyBzbmlwKHN0cikgKyBcIj4sIG5vIHN0YWNrIHRyYWNlKVwiKTtcbn1cblxuZnVuY3Rpb24gc25pcChzdHIpIHtcbiAgICB2YXIgbWF4Q2hhcnMgPSA0MTtcbiAgICBpZiAoc3RyLmxlbmd0aCA8IG1heENoYXJzKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIG1heENoYXJzIC0gMykgKyBcIi4uLlwiO1xufVxuXG5mdW5jdGlvbiBDYXB0dXJlZFRyYWNlKGlnbm9yZVVudGlsLCBpc1RvcExldmVsKSB7XG4gICAgdGhpcy5jYXB0dXJlU3RhY2tUcmFjZShDYXB0dXJlZFRyYWNlLCBpc1RvcExldmVsKTtcblxufVxuaW5oZXJpdHMoQ2FwdHVyZWRUcmFjZSwgRXJyb3IpO1xuXG5DYXB0dXJlZFRyYWNlLnByb3RvdHlwZS5jYXB0dXJlU3RhY2tUcmFjZSA9XG5mdW5jdGlvbiBDYXB0dXJlZFRyYWNlJGNhcHR1cmVTdGFja1RyYWNlKGlnbm9yZVVudGlsLCBpc1RvcExldmVsKSB7XG4gICAgY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgaWdub3JlVW50aWwsIGlzVG9wTGV2ZWwpO1xufTtcblxuQ2FwdHVyZWRUcmFjZS5wb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiA9XG5mdW5jdGlvbiBDYXB0dXJlZFRyYWNlJFBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgbWVzc2FnZTtcbiAgICAgICAgaWYgKHR5cGVvZiByZWFzb24gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHJlYXNvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSByZWFzb24uc3RhY2s7XG4gICAgICAgICAgICBtZXNzYWdlID0gXCJQb3NzaWJseSB1bmhhbmRsZWQgXCIgKyBmb3JtYXRTdGFjayhzdGFjaywgcmVhc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlBvc3NpYmx5IHVuaGFuZGxlZCBcIiArIFN0cmluZyhyZWFzb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUubG9nID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNhcHR1cmVkVHJhY2UuY29tYmluZSA9IGZ1bmN0aW9uIENhcHR1cmVkVHJhY2UkQ29tYmluZShjdXJyZW50LCBwcmV2KSB7XG4gICAgdmFyIGN1ckxhc3QgPSBjdXJyZW50Lmxlbmd0aCAtIDE7XG4gICAgZm9yICh2YXIgaSA9IHByZXYubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBwcmV2W2ldO1xuICAgICAgICBpZiAoY3VycmVudFtjdXJMYXN0XSA9PT0gbGluZSkge1xuICAgICAgICAgICAgY3VycmVudC5wb3AoKTtcbiAgICAgICAgICAgIGN1ckxhc3QtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3VycmVudC5wdXNoKFwiRnJvbSBwcmV2aW91cyBldmVudDpcIik7XG4gICAgdmFyIGxpbmVzID0gY3VycmVudC5jb25jYXQocHJldik7XG5cbiAgICB2YXIgcmV0ID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcblxuICAgICAgICBpZiAoKChyaWdub3JlLnRlc3QobGluZXNbaV0pICYmIHJ0cmFjZWxpbmUudGVzdChsaW5lc1tpXSkpIHx8XG4gICAgICAgICAgICAoaSA+IDAgJiYgIXJ0cmFjZWxpbmUudGVzdChsaW5lc1tpXSkpICYmXG4gICAgICAgICAgICBsaW5lc1tpXSAhPT0gXCJGcm9tIHByZXZpb3VzIGV2ZW50OlwiKVxuICAgICAgICkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LnB1c2gobGluZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuQ2FwdHVyZWRUcmFjZS5wcm90ZWN0RXJyb3JNZXNzYWdlTmV3bGluZXMgPSBmdW5jdGlvbihzdGFjaykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHJ0cmFjZWxpbmUudGVzdChzdGFja1tpXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkgPD0gMSkgcmV0dXJuO1xuXG4gICAgdmFyIGVycm9yTWVzc2FnZUxpbmVzID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBpOyArK2opIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlTGluZXMucHVzaChzdGFjay5zaGlmdCgpKTtcbiAgICB9XG4gICAgc3RhY2sudW5zaGlmdChlcnJvck1lc3NhZ2VMaW5lcy5qb2luKFwiXFx1MDAwMlxcdTAwMDBcXHUwMDAxXCIpKTtcbn07XG5cbkNhcHR1cmVkVHJhY2UuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBDYXB0dXJlZFRyYWNlJElzU3VwcG9ydGVkKCkge1xuICAgIHJldHVybiB0eXBlb2YgY2FwdHVyZVN0YWNrVHJhY2UgPT09IFwiZnVuY3Rpb25cIjtcbn07XG5cbnZhciBjYXB0dXJlU3RhY2tUcmFjZSA9IChmdW5jdGlvbiBzdGFja0RldGVjdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICB0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBydHJhY2VsaW5lID0gL15cXHMqYXRcXHMqLztcbiAgICAgICAgZm9ybWF0U3RhY2sgPSBmdW5jdGlvbihzdGFjaywgZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdGFjaztcblxuICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09IHZvaWQgMCAmJlxuICAgICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvci5uYW1lICsgXCIuIFwiICsgZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3JtYXROb25FcnJvcihlcnJvcik7XG5cblxuICAgICAgICB9O1xuICAgICAgICB2YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIENhcHR1cmVkVHJhY2UkX2NhcHR1cmVTdGFja1RyYWNlKFxuICAgICAgICAgICAgcmVjZWl2ZXIsIGlnbm9yZVVudGlsKSB7XG4gICAgICAgICAgICBjYXB0dXJlU3RhY2tUcmFjZShyZWNlaXZlciwgaWdub3JlVW50aWwpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG5cbiAgICBpZiAodHlwZW9mIGVyci5zdGFjayA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICB0eXBlb2YgXCJcIi5zdGFydHNXaXRoID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgKGVyci5zdGFjay5zdGFydHNXaXRoKFwic3RhY2tEZXRlY3Rpb25AXCIpKSAmJlxuICAgICAgICBzdGFja0RldGVjdGlvbi5uYW1lID09PSBcInN0YWNrRGV0ZWN0aW9uXCIpIHtcblxuICAgICAgICBkZWZpbmVQcm9wZXJ0eShFcnJvciwgXCJzdGFja1RyYWNlTGltaXRcIiwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMjVcbiAgICAgICAgfSk7XG4gICAgICAgIHJ0cmFjZWxpbmUgPSAvQC87XG4gICAgICAgIHZhciBybGluZSA9IC9bQFxcbl0vO1xuXG4gICAgICAgIGZvcm1hdFN0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGVycm9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChlcnJvci5uYW1lICsgXCIuIFwiICsgZXJyb3IubWVzc2FnZSArIFwiXFxuXCIgKyBzdGFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5uYW1lICE9PSB2b2lkIDAgJiZcbiAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IubmFtZSArIFwiLiBcIiArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0Tm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjYXB0dXJlU3RhY2tUcmFjZShvKSB7XG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcbiAgICAgICAgICAgIHZhciBzcGxpdCA9IHN0YWNrLnNwbGl0KHJsaW5lKTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmV0ID0gXCJcIjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICByZXQgKz0gc3BsaXRbaV07XG4gICAgICAgICAgICAgICAgcmV0ICs9IFwiQFwiO1xuICAgICAgICAgICAgICAgIHJldCArPSBzcGxpdFtpICsgMV07XG4gICAgICAgICAgICAgICAgcmV0ICs9IFwiXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnN0YWNrID0gcmV0O1xuICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdFN0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGVycm9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YWNrID09PSBcInN0cmluZ1wiKSByZXR1cm4gc3RhY2s7XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIGVycm9yID09PSBcImZ1bmN0aW9uXCIpICYmXG4gICAgICAgICAgICAgICAgZXJyb3IubmFtZSAhPT0gdm9pZCAwICYmXG4gICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yLm5hbWUgKyBcIi4gXCIgKyBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59KSgpO1xuXG5yZXR1cm4gQ2FwdHVyZWRUcmFjZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL2NhcHR1cmVkX3RyYWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihORVhUX0ZJTFRFUikge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoXCIuL2Vycm9ycy5qc1wiKTtcbnZhciB0cnlDYXRjaDEgPSB1dGlsLnRyeUNhdGNoMTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIga2V5cyA9IHJlcXVpcmUoXCIuL2VzNS5qc1wiKS5rZXlzO1xudmFyIFR5cGVFcnJvciA9IGVycm9ycy5UeXBlRXJyb3I7XG5cbmZ1bmN0aW9uIENhdGNoRmlsdGVyKGluc3RhbmNlcywgY2FsbGJhY2ssIHByb21pc2UpIHtcbiAgICB0aGlzLl9pbnN0YW5jZXMgPSBpbnN0YW5jZXM7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLl9wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gQ2F0Y2hGaWx0ZXIkX3NhZmVQcmVkaWNhdGUocHJlZGljYXRlLCBlKSB7XG4gICAgdmFyIHNhZmVPYmplY3QgPSB7fTtcbiAgICB2YXIgcmV0ZmlsdGVyID0gdHJ5Q2F0Y2gxKHByZWRpY2F0ZSwgc2FmZU9iamVjdCwgZSk7XG5cbiAgICBpZiAocmV0ZmlsdGVyID09PSBlcnJvck9iaikgcmV0dXJuIHJldGZpbHRlcjtcblxuICAgIHZhciBzYWZlS2V5cyA9IGtleXMoc2FmZU9iamVjdCk7XG4gICAgaWYgKHNhZmVLZXlzLmxlbmd0aCkge1xuICAgICAgICBlcnJvck9iai5lID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgIFwiQ2F0Y2ggZmlsdGVyIG11c3QgaW5oZXJpdCBmcm9tIEVycm9yIFwiXG4gICAgICAgICAgKyBcIm9yIGJlIGEgc2ltcGxlIHByZWRpY2F0ZSBmdW5jdGlvblwiKTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xuICAgIH1cbiAgICByZXR1cm4gcmV0ZmlsdGVyO1xufVxuXG5DYXRjaEZpbHRlci5wcm90b3R5cGUuZG9GaWx0ZXIgPSBmdW5jdGlvbiBDYXRjaEZpbHRlciRfZG9GaWx0ZXIoZSkge1xuICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZTtcbiAgICB2YXIgYm91bmRUbyA9IHByb21pc2UuX2JvdW5kVG87XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2luc3RhbmNlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2luc3RhbmNlc1tpXTtcbiAgICAgICAgdmFyIGl0ZW1Jc0Vycm9yVHlwZSA9IGl0ZW0gPT09IEVycm9yIHx8XG4gICAgICAgICAgICAoaXRlbSAhPSBudWxsICYmIGl0ZW0ucHJvdG90eXBlIGluc3RhbmNlb2YgRXJyb3IpO1xuXG4gICAgICAgIGlmIChpdGVtSXNFcnJvclR5cGUgJiYgZSBpbnN0YW5jZW9mIGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciByZXQgPSB0cnlDYXRjaDEoY2IsIGJvdW5kVG8sIGUpO1xuICAgICAgICAgICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgICAgICAgICBORVhUX0ZJTFRFUi5lID0gcmV0LmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5FWFRfRklMVEVSO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiICYmICFpdGVtSXNFcnJvclR5cGUpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGRIYW5kbGUgPSBDYXRjaEZpbHRlciRfc2FmZVByZWRpY2F0ZShpdGVtLCBlKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRIYW5kbGUgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYWNlID0gZXJyb3JzLmNhbkF0dGFjaChlcnJvck9iai5lKVxuICAgICAgICAgICAgICAgICAgICA/IGVycm9yT2JqLmVcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgRXJyb3IoZXJyb3JPYmouZSArIFwiXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UodHJhY2UpO1xuICAgICAgICAgICAgICAgIGUgPSBlcnJvck9iai5lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzaG91bGRIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2gxKGNiLCBib3VuZFRvLCBlKTtcbiAgICAgICAgICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICAgICAgICAgICAgICBORVhUX0ZJTFRFUi5lID0gcmV0LmU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBORVhUX0ZJTFRFUjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBORVhUX0ZJTFRFUi5lID0gZTtcbiAgICByZXR1cm4gTkVYVF9GSUxURVI7XG59O1xuXG5yZXR1cm4gQ2F0Y2hGaWx0ZXI7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9jYXRjaF9maWx0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG52YXIgbWF5YmVXcmFwQXNFcnJvciA9IHV0aWwubWF5YmVXcmFwQXNFcnJvcjtcbnZhciBlcnJvcnMgPSByZXF1aXJlKFwiLi9lcnJvcnMuanNcIik7XG52YXIgVGltZW91dEVycm9yID0gZXJyb3JzLlRpbWVvdXRFcnJvcjtcbnZhciBPcGVyYXRpb25hbEVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XG52YXIgYXN5bmMgPSByZXF1aXJlKFwiLi9hc3luYy5qc1wiKTtcbnZhciBoYXZlR2V0dGVycyA9IHV0aWwuaGF2ZUdldHRlcnM7XG52YXIgZXM1ID0gcmVxdWlyZShcIi4vZXM1LmpzXCIpO1xuXG5mdW5jdGlvbiBpc1VudHlwZWRFcnJvcihvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3IgJiZcbiAgICAgICAgZXM1LmdldFByb3RvdHlwZU9mKG9iaikgPT09IEVycm9yLnByb3RvdHlwZTtcbn1cblxuZnVuY3Rpb24gd3JhcEFzT3BlcmF0aW9uYWxFcnJvcihvYmopIHtcbiAgICB2YXIgcmV0O1xuICAgIGlmIChpc1VudHlwZWRFcnJvcihvYmopKSB7XG4gICAgICAgIHJldCA9IG5ldyBPcGVyYXRpb25hbEVycm9yKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gb2JqO1xuICAgIH1cbiAgICBlcnJvcnMubWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKHJldCk7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gbm9kZWJhY2tGb3JQcm9taXNlKHByb21pc2UpIHtcbiAgICBmdW5jdGlvbiBQcm9taXNlUmVzb2x2ZXIkX2NhbGxiYWNrKGVyciwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHByb21pc2UgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlZCA9IHdyYXBBc09wZXJhdGlvbmFsRXJyb3IobWF5YmVXcmFwQXNFcnJvcihlcnIpKTtcbiAgICAgICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2Uod3JhcHBlZCk7XG4gICAgICAgICAgICBwcm9taXNlLl9yZWplY3Qod3JhcHBlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgIHZhciAkX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7dmFyIGFyZ3MgPSBuZXcgQXJyYXkoJF9sZW4gLSAxKTsgZm9yKHZhciAkX2kgPSAxOyAkX2kgPCAkX2xlbjsgKyskX2kpIHthcmdzWyRfaSAtIDFdID0gYXJndW1lbnRzWyRfaV07fVxuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbChhcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlUmVzb2x2ZXIkX2NhbGxiYWNrO1xufVxuXG5cbnZhciBQcm9taXNlUmVzb2x2ZXI7XG5pZiAoIWhhdmVHZXR0ZXJzKSB7XG4gICAgUHJvbWlzZVJlc29sdmVyID0gZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyKHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgdGhpcy5hc0NhbGxiYWNrID0gbm9kZWJhY2tGb3JQcm9taXNlKHByb21pc2UpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gdGhpcy5hc0NhbGxiYWNrO1xuICAgIH07XG59XG5lbHNlIHtcbiAgICBQcm9taXNlUmVzb2x2ZXIgPSBmdW5jdGlvbiBQcm9taXNlUmVzb2x2ZXIocHJvbWlzZSkge1xuICAgICAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIH07XG59XG5pZiAoaGF2ZUdldHRlcnMpIHtcbiAgICB2YXIgcHJvcCA9IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlYmFja0ZvclByb21pc2UodGhpcy5wcm9taXNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZXM1LmRlZmluZVByb3BlcnR5KFByb21pc2VSZXNvbHZlci5wcm90b3R5cGUsIFwiYXNDYWxsYmFja1wiLCBwcm9wKTtcbiAgICBlczUuZGVmaW5lUHJvcGVydHkoUHJvbWlzZVJlc29sdmVyLnByb3RvdHlwZSwgXCJjYWxsYmFja1wiLCBwcm9wKTtcbn1cblxuUHJvbWlzZVJlc29sdmVyLl9ub2RlYmFja0ZvclByb21pc2UgPSBub2RlYmFja0ZvclByb21pc2U7XG5cblByb21pc2VSZXNvbHZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiBQcm9taXNlUmVzb2x2ZXIkdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBQcm9taXNlUmVzb2x2ZXJdXCI7XG59O1xuXG5Qcm9taXNlUmVzb2x2ZXIucHJvdG90eXBlLnJlc29sdmUgPVxuUHJvbWlzZVJlc29sdmVyLnByb3RvdHlwZS5mdWxmaWxsID0gZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyJHJlc29sdmUodmFsdWUpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZVJlc29sdmVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSWxsZWdhbCBpbnZvY2F0aW9uLCByZXNvbHZlciByZXNvbHZlL3JlamVjdCBtdXN0IGJlIGNhbGxlZCB3aXRoaW4gYSByZXNvbHZlciBjb250ZXh0LiBDb25zaWRlciB1c2luZyB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvciBpbnN0ZWFkLlwiKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcbiAgICBpZiAocHJvbWlzZS5fdHJ5Rm9sbG93KHZhbHVlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGFzeW5jLmludm9rZShwcm9taXNlLl9mdWxmaWxsLCBwcm9taXNlLCB2YWx1ZSk7XG59O1xuXG5Qcm9taXNlUmVzb2x2ZXIucHJvdG90eXBlLnJlamVjdCA9IGZ1bmN0aW9uIFByb21pc2VSZXNvbHZlciRyZWplY3QocmVhc29uKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VSZXNvbHZlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIklsbGVnYWwgaW52b2NhdGlvbiwgcmVzb2x2ZXIgcmVzb2x2ZS9yZWplY3QgbXVzdCBiZSBjYWxsZWQgd2l0aGluIGEgcmVzb2x2ZXIgY29udGV4dC4gQ29uc2lkZXIgdXNpbmcgdGhlIHByb21pc2UgY29uc3RydWN0b3IgaW5zdGVhZC5cIik7XG4gICAgfVxuXG4gICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgZXJyb3JzLm1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihyZWFzb24pO1xuICAgIHZhciB0cmFjZSA9IGVycm9ycy5jYW5BdHRhY2gocmVhc29uKSA/IHJlYXNvbiA6IG5ldyBFcnJvcihyZWFzb24gKyBcIlwiKTtcbiAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlKTtcbiAgICBhc3luYy5pbnZva2UocHJvbWlzZS5fcmVqZWN0LCBwcm9taXNlLCByZWFzb24pO1xuICAgIGlmICh0cmFjZSAhPT0gcmVhc29uKSB7XG4gICAgICAgIGFzeW5jLmludm9rZSh0aGlzLl9zZXRDYXJyaWVkU3RhY2tUcmFjZSwgdGhpcywgdHJhY2UpO1xuICAgIH1cbn07XG5cblByb21pc2VSZXNvbHZlci5wcm90b3R5cGUucHJvZ3Jlc3MgPVxuZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyJHByb2dyZXNzKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VSZXNvbHZlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIklsbGVnYWwgaW52b2NhdGlvbiwgcmVzb2x2ZXIgcmVzb2x2ZS9yZWplY3QgbXVzdCBiZSBjYWxsZWQgd2l0aGluIGEgcmVzb2x2ZXIgY29udGV4dC4gQ29uc2lkZXIgdXNpbmcgdGhlIHByb21pc2UgY29uc3RydWN0b3IgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIGFzeW5jLmludm9rZSh0aGlzLnByb21pc2UuX3Byb2dyZXNzLCB0aGlzLnByb21pc2UsIHZhbHVlKTtcbn07XG5cblByb21pc2VSZXNvbHZlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyJGNhbmNlbCgpIHtcbiAgICBhc3luYy5pbnZva2UodGhpcy5wcm9taXNlLmNhbmNlbCwgdGhpcy5wcm9taXNlLCB2b2lkIDApO1xufTtcblxuUHJvbWlzZVJlc29sdmVyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyJHRpbWVvdXQoKSB7XG4gICAgdGhpcy5yZWplY3QobmV3IFRpbWVvdXRFcnJvcihcInRpbWVvdXRcIikpO1xufTtcblxuUHJvbWlzZVJlc29sdmVyLnByb3RvdHlwZS5pc1Jlc29sdmVkID0gZnVuY3Rpb24gUHJvbWlzZVJlc29sdmVyJGlzUmVzb2x2ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZS5pc1Jlc29sdmVkKCk7XG59O1xuXG5Qcm9taXNlUmVzb2x2ZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIFByb21pc2VSZXNvbHZlciR0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZS50b0pTT04oKTtcbn07XG5cblByb21pc2VSZXNvbHZlci5wcm90b3R5cGUuX3NldENhcnJpZWRTdGFja1RyYWNlID1cbmZ1bmN0aW9uIFByb21pc2VSZXNvbHZlciRfc2V0Q2FycmllZFN0YWNrVHJhY2UodHJhY2UpIHtcbiAgICBpZiAodGhpcy5wcm9taXNlLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICB0aGlzLnByb21pc2UuX3NldENhcnJpZWRTdGFja1RyYWNlKHRyYWNlKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2VSZXNvbHZlcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vcHJvbWlzZV9yZXNvbHZlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIFR5cGVFcnJvciA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJykuVHlwZUVycm9yO1xuXG5mdW5jdGlvbiBhcGlSZWplY3Rpb24obXNnKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IFR5cGVFcnJvcihtc2cpO1xuICAgIHZhciByZXQgPSBQcm9taXNlLnJlamVjdGVkKGVycm9yKTtcbiAgICB2YXIgcGFyZW50ID0gcmV0Ll9wZWVrQ29udGV4dCgpO1xuICAgIGlmIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICBwYXJlbnQuX2F0dGFjaEV4dHJhVHJhY2UoZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5yZXR1cm4gYXBpUmVqZWN0aW9uO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZXJyb3JzX2FwaV9yZWplY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIE5FWFRfRklMVEVSLCBjYXN0KSB7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG52YXIgd3JhcHNQcmltaXRpdmVSZWNlaXZlciA9IHV0aWwud3JhcHNQcmltaXRpdmVSZWNlaXZlcjtcbnZhciBpc1ByaW1pdGl2ZSA9IHV0aWwuaXNQcmltaXRpdmU7XG52YXIgdGhyb3dlciA9IHV0aWwudGhyb3dlcjtcblxuZnVuY3Rpb24gcmV0dXJuVGhpcygpIHtcbiAgICByZXR1cm4gdGhpcztcbn1cbmZ1bmN0aW9uIHRocm93VGhpcygpIHtcbiAgICB0aHJvdyB0aGlzO1xufVxuZnVuY3Rpb24gcmV0dXJuJChyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFByb21pc2UkX3JldHVybmVyKCkge1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xufVxuZnVuY3Rpb24gdGhyb3ckKHIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gUHJvbWlzZSRfdGhyb3dlcigpIHtcbiAgICAgICAgdGhyb3cgcjtcbiAgICB9O1xufVxuZnVuY3Rpb24gcHJvbWlzZWRGaW5hbGx5KHJldCwgcmVhc29uT3JWYWx1ZSwgaXNGdWxmaWxsZWQpIHtcbiAgICB2YXIgdGhlbjtcbiAgICBpZiAod3JhcHNQcmltaXRpdmVSZWNlaXZlciAmJiBpc1ByaW1pdGl2ZShyZWFzb25PclZhbHVlKSkge1xuICAgICAgICB0aGVuID0gaXNGdWxmaWxsZWQgPyByZXR1cm4kKHJlYXNvbk9yVmFsdWUpIDogdGhyb3ckKHJlYXNvbk9yVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoZW4gPSBpc0Z1bGZpbGxlZCA/IHJldHVyblRoaXMgOiB0aHJvd1RoaXM7XG4gICAgfVxuICAgIHJldHVybiByZXQuX3RoZW4odGhlbiwgdGhyb3dlciwgdm9pZCAwLCByZWFzb25PclZhbHVlLCB2b2lkIDApO1xufVxuXG5mdW5jdGlvbiBmaW5hbGx5SGFuZGxlcihyZWFzb25PclZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cbiAgICB2YXIgcmV0ID0gcHJvbWlzZS5faXNCb3VuZCgpXG4gICAgICAgICAgICAgICAgICAgID8gaGFuZGxlci5jYWxsKHByb21pc2UuX2JvdW5kVG8pXG4gICAgICAgICAgICAgICAgICAgIDogaGFuZGxlcigpO1xuXG4gICAgaWYgKHJldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0KHJldCwgdm9pZCAwKTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlZEZpbmFsbHkobWF5YmVQcm9taXNlLCByZWFzb25PclZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5pc0Z1bGZpbGxlZCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9taXNlLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICBORVhUX0ZJTFRFUi5lID0gcmVhc29uT3JWYWx1ZTtcbiAgICAgICAgcmV0dXJuIE5FWFRfRklMVEVSO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZWFzb25PclZhbHVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGFwSGFuZGxlcih2YWx1ZSkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xuICAgIHZhciBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXG4gICAgdmFyIHJldCA9IHByb21pc2UuX2lzQm91bmQoKVxuICAgICAgICAgICAgICAgICAgICA/IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFRvLCB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgOiBoYW5kbGVyKHZhbHVlKTtcblxuICAgIGlmIChyZXQgIT09IHZvaWQgMCkge1xuICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gY2FzdChyZXQsIHZvaWQgMCk7XG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZWRGaW5hbGx5KG1heWJlUHJvbWlzZSwgdmFsdWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuX3Bhc3NUaHJvdWdoSGFuZGxlciA9XG5mdW5jdGlvbiBQcm9taXNlJF9wYXNzVGhyb3VnaEhhbmRsZXIoaGFuZGxlciwgaXNGaW5hbGx5KSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0aGlzLnRoZW4oKTtcblxuICAgIHZhciBwcm9taXNlQW5kSGFuZGxlciA9IHtcbiAgICAgICAgcHJvbWlzZTogdGhpcyxcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgIGlzRmluYWxseSA/IGZpbmFsbHlIYW5kbGVyIDogdGFwSGFuZGxlcixcbiAgICAgICAgICAgIGlzRmluYWxseSA/IGZpbmFsbHlIYW5kbGVyIDogdm9pZCAwLCB2b2lkIDAsXG4gICAgICAgICAgICBwcm9taXNlQW5kSGFuZGxlciwgdm9pZCAwKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmxhc3RseSA9XG5Qcm9taXNlLnByb3RvdHlwZVtcImZpbmFsbHlcIl0gPSBmdW5jdGlvbiBQcm9taXNlJGZpbmFsbHkoaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl9wYXNzVGhyb3VnaEhhbmRsZXIoaGFuZGxlciwgdHJ1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiBQcm9taXNlJHRhcChoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoSGFuZGxlcihoYW5kbGVyLCBmYWxzZSk7XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZmluYWxseS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBpc1ByaW1pdGl2ZSA9IHV0aWwuaXNQcmltaXRpdmU7XG52YXIgd3JhcHNQcmltaXRpdmVSZWNlaXZlciA9IHV0aWwud3JhcHNQcmltaXRpdmVSZWNlaXZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgcmV0dXJuZXIgPSBmdW5jdGlvbiBQcm9taXNlJF9yZXR1cm5lcigpIHtcbiAgICByZXR1cm4gdGhpcztcbn07XG52YXIgdGhyb3dlciA9IGZ1bmN0aW9uIFByb21pc2UkX3Rocm93ZXIoKSB7XG4gICAgdGhyb3cgdGhpcztcbn07XG5cbnZhciB3cmFwcGVyID0gZnVuY3Rpb24gUHJvbWlzZSRfd3JhcHBlcih2YWx1ZSwgYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbiA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gUHJvbWlzZSRfdGhyb3dlcigpIHtcbiAgICAgICAgICAgIHRocm93IHZhbHVlO1xuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBQcm9taXNlJF9yZXR1cm5lcigpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cblByb21pc2UucHJvdG90eXBlW1wicmV0dXJuXCJdID1cblByb21pc2UucHJvdG90eXBlLnRoZW5SZXR1cm4gPVxuZnVuY3Rpb24gUHJvbWlzZSR0aGVuUmV0dXJuKHZhbHVlKSB7XG4gICAgaWYgKHdyYXBzUHJpbWl0aXZlUmVjZWl2ZXIgJiYgaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVuKFxuICAgICAgICAgICAgd3JhcHBlcih2YWx1ZSwgMiksXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICB2b2lkIDBcbiAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdGhlbihyZXR1cm5lciwgdm9pZCAwLCB2b2lkIDAsIHZhbHVlLCB2b2lkIDApO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGVbXCJ0aHJvd1wiXSA9XG5Qcm9taXNlLnByb3RvdHlwZS50aGVuVGhyb3cgPVxuZnVuY3Rpb24gUHJvbWlzZSR0aGVuVGhyb3cocmVhc29uKSB7XG4gICAgaWYgKHdyYXBzUHJpbWl0aXZlUmVjZWl2ZXIgJiYgaXNQcmltaXRpdmUocmVhc29uKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihcbiAgICAgICAgICAgIHdyYXBwZXIocmVhc29uLCAxKSxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIHZvaWQgMFxuICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90aGVuKHRocm93ZXIsIHZvaWQgMCwgdm9pZCAwLCByZWFzb24sIHZvaWQgMCk7XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZGlyZWN0X3Jlc29sdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcbmZ1bmN0aW9uIFByb21pc2VJbnNwZWN0aW9uKHByb21pc2UpIHtcbiAgICBpZiAocHJvbWlzZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XG4gICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZSA9IHByb21pc2UuaXNSZXNvbHZlZCgpXG4gICAgICAgICAgICA/IHByb21pc2UuX3NldHRsZWRWYWx1ZVxuICAgICAgICAgICAgOiB2b2lkIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IDA7XG4gICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZSA9IHZvaWQgMDtcbiAgICB9XG59XG5cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc0Z1bGZpbGxlZCA9XG5Qcm9taXNlLnByb3RvdHlwZS5pc0Z1bGZpbGxlZCA9IGZ1bmN0aW9uIFByb21pc2UkaXNGdWxmaWxsZWQoKSB7XG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2ODQzNTQ1NikgPiAwO1xufTtcblxuUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVqZWN0ZWQgPVxuUHJvbWlzZS5wcm90b3R5cGUuaXNSZWplY3RlZCA9IGZ1bmN0aW9uIFByb21pc2UkaXNSZWplY3RlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTM0MjE3NzI4KSA+IDA7XG59O1xuXG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNQZW5kaW5nID1cblByb21pc2UucHJvdG90eXBlLmlzUGVuZGluZyA9IGZ1bmN0aW9uIFByb21pc2UkaXNQZW5kaW5nKCkge1xuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA0MDI2NTMxODQpID09PSAwO1xufTtcblxuUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLnZhbHVlID1cblByb21pc2UucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gUHJvbWlzZSR2YWx1ZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2Fubm90IGdldCBmdWxmaWxsbWVudCB2YWx1ZSBvZiBhIG5vbi1mdWxmaWxsZWQgcHJvbWlzZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZTtcbn07XG5cblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5lcnJvciA9XG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUucmVhc29uID1cblByb21pc2UucHJvdG90eXBlLnJlYXNvbiA9IGZ1bmN0aW9uIFByb21pc2UkcmVhc29uKCkge1xuICAgIGlmICghdGhpcy5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgcmVqZWN0aW9uIHJlYXNvbiBvZiBhIG5vbi1yZWplY3RlZCBwcm9taXNlXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2V0dGxlZFZhbHVlO1xufTtcblxuUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVzb2x2ZWQgPVxuUHJvbWlzZS5wcm90b3R5cGUuaXNSZXNvbHZlZCA9IGZ1bmN0aW9uIFByb21pc2UkaXNSZXNvbHZlZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNDAyNjUzMTg0KSA+IDA7XG59O1xuXG5Qcm9taXNlLlByb21pc2VJbnNwZWN0aW9uID0gUHJvbWlzZUluc3BlY3Rpb247XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9zeW5jaHJvbm91c19pbnNwZWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPVxuZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBjYXN0LCBJTlRFUk5BTCkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGNhbkV2YWx1YXRlID0gdXRpbC5jYW5FdmFsdWF0ZTtcbnZhciB0cnlDYXRjaDEgPSB1dGlsLnRyeUNhdGNoMTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG5cblxuaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgdmFyIHRoZW5DYWxsYmFjayA9IGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInZhbHVlXCIsIFwiaG9sZGVyXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgaG9sZGVyLnBJbmRleCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgaG9sZGVyLmNoZWNrRnVsZmlsbG1lbnQodGhpcyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgXCIucmVwbGFjZSgvSW5kZXgvZywgaSkpO1xuICAgIH07XG5cbiAgICB2YXIgY2FsbGVyID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBjb3VudDsgKytpKSB2YWx1ZXMucHVzaChcImhvbGRlci5wXCIgKyBpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImhvbGRlclwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGhvbGRlci5mbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh2YWx1ZXMpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiLnJlcGxhY2UoL3ZhbHVlcy9nLCB2YWx1ZXMuam9pbihcIiwgXCIpKSk7XG4gICAgfTtcbiAgICB2YXIgdGhlbkNhbGxiYWNrcyA9IFtdO1xuICAgIHZhciBjYWxsZXJzID0gW3ZvaWQgMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNTsgKytpKSB7XG4gICAgICAgIHRoZW5DYWxsYmFja3MucHVzaCh0aGVuQ2FsbGJhY2soaSkpO1xuICAgICAgICBjYWxsZXJzLnB1c2goY2FsbGVyKGkpKTtcbiAgICB9XG5cbiAgICB2YXIgSG9sZGVyID0gZnVuY3Rpb24odG90YWwsIGZuKSB7XG4gICAgICAgIHRoaXMucDEgPSB0aGlzLnAyID0gdGhpcy5wMyA9IHRoaXMucDQgPSB0aGlzLnA1ID0gbnVsbDtcbiAgICAgICAgdGhpcy5mbiA9IGZuO1xuICAgICAgICB0aGlzLnRvdGFsID0gdG90YWw7XG4gICAgICAgIHRoaXMubm93ID0gMDtcbiAgICB9O1xuXG4gICAgSG9sZGVyLnByb3RvdHlwZS5jYWxsZXJzID0gY2FsbGVycztcbiAgICBIb2xkZXIucHJvdG90eXBlLmNoZWNrRnVsZmlsbG1lbnQgPSBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBub3cgPSB0aGlzLm5vdztcbiAgICAgICAgbm93Kys7XG4gICAgICAgIHZhciB0b3RhbCA9IHRoaXMudG90YWw7XG4gICAgICAgIGlmIChub3cgPj0gdG90YWwpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5jYWxsZXJzW3RvdGFsXTtcbiAgICAgICAgICAgIHZhciByZXQgPSB0cnlDYXRjaDEoaGFuZGxlciwgdm9pZCAwLCB0aGlzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0VW5jaGVja2VkKHJldC5lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXByb21pc2UuX3RyeUZvbGxvdyhyZXQpKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbFVuY2hlY2tlZChyZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3cgPSBub3c7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuXG5Qcm9taXNlLmpvaW4gPSBmdW5jdGlvbiBQcm9taXNlJEpvaW4oKSB7XG4gICAgdmFyIGxhc3QgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB2YXIgZm47XG4gICAgaWYgKGxhc3QgPiAwICYmIHR5cGVvZiBhcmd1bWVudHNbbGFzdF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBmbiA9IGFyZ3VtZW50c1tsYXN0XTtcbiAgICAgICAgaWYgKGxhc3QgPCA2ICYmIGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgICAgICAgICAgcmV0Ll9zZXRUcmFjZSh2b2lkIDApO1xuICAgICAgICAgICAgdmFyIGhvbGRlciA9IG5ldyBIb2xkZXIobGFzdCwgZm4pO1xuICAgICAgICAgICAgdmFyIHJlamVjdCA9IHJldC5fcmVqZWN0O1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoZW5DYWxsYmFja3M7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3Q7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0KGFyZ3VtZW50c1tpXSwgdm9pZCAwKTtcbiAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3RoZW4oY2FsbGJhY2tzW2ldLCByZWplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCAwLCByZXQsIGhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF5YmVQcm9taXNlLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5jYWxsKHJldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fc2V0dGxlZFZhbHVlLCBob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0Ll9yZWplY3QobWF5YmVQcm9taXNlLl9zZXR0bGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChyZXQsIG1heWJlUHJvbWlzZSwgaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciAkX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7dmFyIGFyZ3MgPSBuZXcgQXJyYXkoJF9sZW4pOyBmb3IodmFyICRfaSA9IDA7ICRfaSA8ICRfbGVuOyArKyRfaSkge2FyZ3NbJF9pXSA9IGFyZ3VtZW50c1skX2ldO31cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2VBcnJheShhcmdzKS5wcm9taXNlKCk7XG4gICAgcmV0dXJuIGZuICE9PSB2b2lkIDAgPyByZXQuc3ByZWFkKGZuKSA6IHJldDtcbn07XG5cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL2pvaW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX3NldFRpbWVvdXQgPSBmdW5jdGlvbihmbiwgbXMpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgYXJnMCA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgYXJnMSA9IGFyZ3VtZW50c1szXTtcbiAgICB2YXIgYXJnMiA9IGxlbiA+PSA1ID8gYXJndW1lbnRzWzRdIDogdm9pZCAwO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZuKGFyZzAsIGFyZzEsIGFyZzIpO1xuICAgIH0sIG1zfDApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCwgY2FzdCkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoXCIuL2Vycm9ycy5qc1wiKTtcbnZhciBhcGlSZWplY3Rpb24gPSByZXF1aXJlKFwiLi9lcnJvcnNfYXBpX3JlamVjdGlvblwiKShQcm9taXNlKTtcbnZhciBUaW1lb3V0RXJyb3IgPSBQcm9taXNlLlRpbWVvdXRFcnJvcjtcblxudmFyIGFmdGVyVGltZW91dCA9IGZ1bmN0aW9uIFByb21pc2UkX2FmdGVyVGltZW91dChwcm9taXNlLCBtZXNzYWdlLCBtcykge1xuICAgIGlmICghcHJvbWlzZS5pc1BlbmRpbmcoKSkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBtZXNzYWdlID0gXCJvcGVyYXRpb24gdGltZWQgb3V0IGFmdGVyXCIgKyBcIiBcIiArIG1zICsgXCIgbXNcIlxuICAgIH1cbiAgICB2YXIgZXJyID0gbmV3IFRpbWVvdXRFcnJvcihtZXNzYWdlKTtcbiAgICBlcnJvcnMubWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKGVycik7XG4gICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShlcnIpO1xuICAgIHByb21pc2UuX2NhbmNlbChlcnIpO1xufTtcblxudmFyIGFmdGVyRGVsYXkgPSBmdW5jdGlvbiBQcm9taXNlJF9hZnRlckRlbGF5KHZhbHVlLCBwcm9taXNlKSB7XG4gICAgcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XG59O1xuXG52YXIgZGVsYXkgPSBQcm9taXNlLmRlbGF5ID0gZnVuY3Rpb24gUHJvbWlzZSREZWxheSh2YWx1ZSwgbXMpIHtcbiAgICBpZiAobXMgPT09IHZvaWQgMCkge1xuICAgICAgICBtcyA9IHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IHZvaWQgMDtcbiAgICB9XG4gICAgbXMgPSArbXM7XG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodmFsdWUsIHZvaWQgMCk7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG5cbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKG1heWJlUHJvbWlzZSwgNyk7XG4gICAgICAgIHByb21pc2UuX2ZvbGxvdyhtYXliZVByb21pc2UpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5kZWxheSh2YWx1ZSwgbXMpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlLl9zZXRUcmFjZSh2b2lkIDApO1xuICAgICAgICBfc2V0VGltZW91dChhZnRlckRlbGF5LCBtcywgdmFsdWUsIHByb21pc2UpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gUHJvbWlzZSRkZWxheShtcykge1xuICAgIHJldHVybiBkZWxheSh0aGlzLCBtcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gUHJvbWlzZSR0aW1lb3V0KG1zLCBtZXNzYWdlKSB7XG4gICAgbXMgPSArbXM7XG5cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fcHJvcGFnYXRlRnJvbSh0aGlzLCA3KTtcbiAgICByZXQuX2ZvbGxvdyh0aGlzKTtcbiAgICBfc2V0VGltZW91dChhZnRlclRpbWVvdXQsIG1zLCByZXQsIG1lc3NhZ2UsIG1zKTtcbiAgICByZXR1cm4gcmV0LmNhbmNlbGxhYmxlKCk7XG59O1xuXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi90aW1lcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCBjYXN0KSB7XG52YXIgYXBpUmVqZWN0aW9uID0gcmVxdWlyZShcIi4vZXJyb3JzX2FwaV9yZWplY3Rpb24uanNcIikoUHJvbWlzZSk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIikuaXNBcnJheTtcblxudmFyIHJhY2VMYXRlciA9IGZ1bmN0aW9uIFByb21pc2UkX3JhY2VMYXRlcihwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbihhcnJheSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZSRfUmFjZShhcnJheSwgcHJvbWlzZSk7XG4gICAgfSk7XG59O1xuXG52YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBQcm9taXNlJF9SYWNlKHByb21pc2VzLCBwYXJlbnQpIHtcbiAgICB2YXIgbWF5YmVQcm9taXNlID0gY2FzdChwcm9taXNlcywgdm9pZCAwKTtcblxuICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiByYWNlTGF0ZXIobWF5YmVQcm9taXNlKTtcbiAgICB9IGVsc2UgaWYgKCFpc0FycmF5KHByb21pc2VzKSkge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGFuIGFycmF5LCBhIHByb21pc2Ugb3IgYSB0aGVuYWJsZVwiKTtcbiAgICB9XG5cbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIGlmIChwYXJlbnQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXQuX3Byb3BhZ2F0ZUZyb20ocGFyZW50LCA3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQuX3NldFRyYWNlKHZvaWQgMCk7XG4gICAgfVxuICAgIHZhciBmdWxmaWxsID0gcmV0Ll9mdWxmaWxsO1xuICAgIHZhciByZWplY3QgPSByZXQuX3JlamVjdDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcHJvbWlzZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIHZhbCA9IHByb21pc2VzW2ldO1xuXG4gICAgICAgIGlmICh2YWwgPT09IHZvaWQgMCAmJiAhKGhhc093bi5jYWxsKHByb21pc2VzLCBpKSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgUHJvbWlzZS5jYXN0KHZhbCkuX3RoZW4oZnVsZmlsbCwgcmVqZWN0LCB2b2lkIDAsIHJldCwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cblByb21pc2UucmFjZSA9IGZ1bmN0aW9uIFByb21pc2UkUmFjZShwcm9taXNlcykge1xuICAgIHJldHVybiBQcm9taXNlJF9SYWNlKHByb21pc2VzLCB2b2lkIDApO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUucmFjZSA9IGZ1bmN0aW9uIFByb21pc2UkcmFjZSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZSRfUmFjZSh0aGlzLCB2b2lkIDApO1xufTtcblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vcmFjZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciBjciA9IE9iamVjdC5jcmVhdGU7XG5pZiAoY3IpIHtcbiAgICB2YXIgY2FsbGVyQ2FjaGUgPSBjcihudWxsKTtcbiAgICB2YXIgZ2V0dGVyQ2FjaGUgPSBjcihudWxsKTtcbiAgICBjYWxsZXJDYWNoZVtcIiBzaXplXCJdID0gZ2V0dGVyQ2FjaGVbXCIgc2l6ZVwiXSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGNhbkV2YWx1YXRlID0gdXRpbC5jYW5FdmFsdWF0ZTtcbnZhciBpc0lkZW50aWZpZXIgPSB1dGlsLmlzSWRlbnRpZmllcjtcblxuZnVuY3Rpb24gbWFrZU1ldGhvZENhbGxlciAobWV0aG9kTmFtZSkge1xuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJvYmpcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAndXNlIHN0cmljdCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSk7ICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7ICAgICAgICBcXG5cXFxuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG9iai5tZXRob2ROYW1lLmFwcGx5KG9iaiwgdGhpcyk7ICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxuICAgICAgICBcIi5yZXBsYWNlKC9tZXRob2ROYW1lL2csIG1ldGhvZE5hbWUpKTtcbn1cblxuZnVuY3Rpb24gbWFrZUdldHRlciAocHJvcGVydHlOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIm9ialwiLCBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIHJldHVybiBvYmoucHJvcGVydHlOYW1lOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIFwiLnJlcGxhY2UoXCJwcm9wZXJ0eU5hbWVcIiwgcHJvcGVydHlOYW1lKSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBpbGVkKG5hbWUsIGNvbXBpbGVyLCBjYWNoZSkge1xuICAgIHZhciByZXQgPSBjYWNoZVtuYW1lXTtcbiAgICBpZiAodHlwZW9mIHJldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmICghaXNJZGVudGlmaWVyKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXQgPSBjb21waWxlcihuYW1lKTtcbiAgICAgICAgY2FjaGVbbmFtZV0gPSByZXQ7XG4gICAgICAgIGNhY2hlW1wiIHNpemVcIl0rKztcbiAgICAgICAgaWYgKGNhY2hlW1wiIHNpemVcIl0gPiA1MTIpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoY2FjaGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkgZGVsZXRlIGNhY2hlW2tleXNbaV1dO1xuICAgICAgICAgICAgY2FjaGVbXCIgc2l6ZVwiXSA9IGtleXMubGVuZ3RoIC0gMjU2O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGdldE1ldGhvZENhbGxlcihuYW1lKSB7XG4gICAgcmV0dXJuIGdldENvbXBpbGVkKG5hbWUsIG1ha2VNZXRob2RDYWxsZXIsIGNhbGxlckNhY2hlKTtcbn1cblxuZnVuY3Rpb24gZ2V0R2V0dGVyKG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0Q29tcGlsZWQobmFtZSwgbWFrZUdldHRlciwgZ2V0dGVyQ2FjaGUpO1xufVxuXG5mdW5jdGlvbiBjYWxsZXIob2JqKSB7XG4gICAgcmV0dXJuIG9ialt0aGlzLnBvcCgpXS5hcHBseShvYmosIHRoaXMpO1xufVxuUHJvbWlzZS5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIFByb21pc2UkY2FsbChtZXRob2ROYW1lKSB7XG4gICAgdmFyICRfbGVuID0gYXJndW1lbnRzLmxlbmd0aDt2YXIgYXJncyA9IG5ldyBBcnJheSgkX2xlbiAtIDEpOyBmb3IodmFyICRfaSA9IDE7ICRfaSA8ICRfbGVuOyArKyRfaSkge2FyZ3NbJF9pIC0gMV0gPSBhcmd1bWVudHNbJF9pXTt9XG4gICAgaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgICAgIHZhciBtYXliZUNhbGxlciA9IGdldE1ldGhvZENhbGxlcihtZXRob2ROYW1lKTtcbiAgICAgICAgaWYgKG1heWJlQ2FsbGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGhlbihtYXliZUNhbGxlciwgdm9pZCAwLCB2b2lkIDAsIGFyZ3MsIHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXJncy5wdXNoKG1ldGhvZE5hbWUpO1xuICAgIHJldHVybiB0aGlzLl90aGVuKGNhbGxlciwgdm9pZCAwLCB2b2lkIDAsIGFyZ3MsIHZvaWQgMCk7XG59O1xuXG5mdW5jdGlvbiBuYW1lZEdldHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqW3RoaXNdO1xufVxuZnVuY3Rpb24gaW5kZXhlZEdldHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqW3RoaXNdO1xufVxuUHJvbWlzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gUHJvbWlzZSRnZXQocHJvcGVydHlOYW1lKSB7XG4gICAgdmFyIGlzSW5kZXggPSAodHlwZW9mIHByb3BlcnR5TmFtZSA9PT0gXCJudW1iZXJcIik7XG4gICAgdmFyIGdldHRlcjtcbiAgICBpZiAoIWlzSW5kZXgpIHtcbiAgICAgICAgaWYgKGNhbkV2YWx1YXRlKSB7XG4gICAgICAgICAgICB2YXIgbWF5YmVHZXR0ZXIgPSBnZXRHZXR0ZXIocHJvcGVydHlOYW1lKTtcbiAgICAgICAgICAgIGdldHRlciA9IG1heWJlR2V0dGVyICE9PSBudWxsID8gbWF5YmVHZXR0ZXIgOiBuYW1lZEdldHRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldHRlciA9IG5hbWVkR2V0dGVyO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0dGVyID0gaW5kZXhlZEdldHRlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oZ2V0dGVyLCB2b2lkIDAsIHZvaWQgMCwgcHJvcGVydHlOYW1lLCB2b2lkIDApO1xufTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL2NhbGxfZ2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBhcGlSZWplY3Rpb24sIElOVEVSTkFMLCBjYXN0KSB7XG52YXIgZXJyb3JzID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpO1xudmFyIFR5cGVFcnJvciA9IGVycm9ycy5UeXBlRXJyb3I7XG52YXIgZGVwcmVjYXRlZCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIikuZGVwcmVjYXRlZDtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG52YXIgdHJ5Q2F0Y2gxID0gdXRpbC50cnlDYXRjaDE7XG52YXIgeWllbGRIYW5kbGVycyA9IFtdO1xuXG5mdW5jdGlvbiBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcih2YWx1ZSwgeWllbGRIYW5kbGVycykge1xuICAgIHZhciBfZXJyb3JPYmogPSBlcnJvck9iajtcbiAgICB2YXIgX1Byb21pc2UgPSBQcm9taXNlO1xuICAgIHZhciBsZW4gPSB5aWVsZEhhbmRsZXJzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaDEoeWllbGRIYW5kbGVyc1tpXSwgdm9pZCAwLCB2YWx1ZSk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IF9lcnJvck9iaikge1xuICAgICAgICAgICAgcmV0dXJuIF9Qcm9taXNlLnJlamVjdChfZXJyb3JPYmouZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QocmVzdWx0LCBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcik7XG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBfUHJvbWlzZSkgcmV0dXJuIG1heWJlUHJvbWlzZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIFByb21pc2VTcGF3bihnZW5lcmF0b3JGdW5jdGlvbiwgcmVjZWl2ZXIsIHlpZWxkSGFuZGxlcikge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcbiAgICBwcm9taXNlLl9zZXRUcmFjZSh2b2lkIDApO1xuICAgIHRoaXMuX2dlbmVyYXRvckZ1bmN0aW9uID0gZ2VuZXJhdG9yRnVuY3Rpb247XG4gICAgdGhpcy5fcmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0aGlzLl9nZW5lcmF0b3IgPSB2b2lkIDA7XG4gICAgdGhpcy5feWllbGRIYW5kbGVycyA9IHR5cGVvZiB5aWVsZEhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IFt5aWVsZEhhbmRsZXJdLmNvbmNhdCh5aWVsZEhhbmRsZXJzKVxuICAgICAgICA6IHlpZWxkSGFuZGxlcnM7XG59XG5cblByb21pc2VTcGF3bi5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2VTcGF3biRwcm9taXNlKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gUHJvbWlzZVNwYXduJF9ydW4oKSB7XG4gICAgdGhpcy5fZ2VuZXJhdG9yID0gdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24uY2FsbCh0aGlzLl9yZWNlaXZlcik7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPVxuICAgICAgICB0aGlzLl9nZW5lcmF0b3JGdW5jdGlvbiA9IHZvaWQgMDtcbiAgICB0aGlzLl9uZXh0KHZvaWQgMCk7XG59O1xuXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIFByb21pc2VTcGF3biRfY29udGludWUocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgdGhpcy5fZ2VuZXJhdG9yID0gdm9pZCAwO1xuICAgICAgICB2YXIgdHJhY2UgPSBlcnJvcnMuY2FuQXR0YWNoKHJlc3VsdC5lKVxuICAgICAgICAgICAgPyByZXN1bHQuZSA6IG5ldyBFcnJvcihyZXN1bHQuZSArIFwiXCIpO1xuICAgICAgICB0aGlzLl9wcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHRyYWNlKTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcmVqZWN0KHJlc3VsdC5lLCB0cmFjZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRvciA9IHZvaWQgMDtcbiAgICAgICAgaWYgKCF0aGlzLl9wcm9taXNlLl90cnlGb2xsb3codmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlLl9mdWxmaWxsKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0KHZhbHVlLCB2b2lkIDApO1xuICAgICAgICBpZiAoIShtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlID1cbiAgICAgICAgICAgICAgICBwcm9taXNlRnJvbVlpZWxkSGFuZGxlcihtYXliZVByb21pc2UsIHRoaXMuX3lpZWxkSGFuZGxlcnMpO1xuICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Rocm93KG5ldyBUeXBlRXJyb3IoXCJBIHZhbHVlIHdhcyB5aWVsZGVkIHRoYXQgY291bGQgbm90IGJlIHRyZWF0ZWQgYXMgYSBwcm9taXNlXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWF5YmVQcm9taXNlLl90aGVuKFxuICAgICAgICAgICAgdGhpcy5fbmV4dCxcbiAgICAgICAgICAgIHRoaXMuX3Rocm93LFxuICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICApO1xuICAgIH1cbn07XG5cblByb21pc2VTcGF3bi5wcm90b3R5cGUuX3Rocm93ID0gZnVuY3Rpb24gUHJvbWlzZVNwYXduJF90aHJvdyhyZWFzb24pIHtcbiAgICBpZiAoZXJyb3JzLmNhbkF0dGFjaChyZWFzb24pKVxuICAgICAgICB0aGlzLl9wcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XG4gICAgdGhpcy5fY29udGludWUoXG4gICAgICAgIHRyeUNhdGNoMSh0aGlzLl9nZW5lcmF0b3JbXCJ0aHJvd1wiXSwgdGhpcy5fZ2VuZXJhdG9yLCByZWFzb24pXG4gICApO1xufTtcblxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uIFByb21pc2VTcGF3biRfbmV4dCh2YWx1ZSkge1xuICAgIHRoaXMuX2NvbnRpbnVlKFxuICAgICAgICB0cnlDYXRjaDEodGhpcy5fZ2VuZXJhdG9yLm5leHQsIHRoaXMuX2dlbmVyYXRvciwgdmFsdWUpXG4gICApO1xufTtcblxuUHJvbWlzZS5jb3JvdXRpbmUgPVxuZnVuY3Rpb24gUHJvbWlzZSRDb3JvdXRpbmUoZ2VuZXJhdG9yRnVuY3Rpb24sIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIGdlbmVyYXRvckZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImdlbmVyYXRvckZ1bmN0aW9uIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgdmFyIHlpZWxkSGFuZGxlciA9IE9iamVjdChvcHRpb25zKS55aWVsZEhhbmRsZXI7XG4gICAgdmFyIFByb21pc2VTcGF3biQgPSBQcm9taXNlU3Bhd247XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGdlbmVyYXRvckZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBzcGF3biA9IG5ldyBQcm9taXNlU3Bhd24kKHZvaWQgMCwgdm9pZCAwLCB5aWVsZEhhbmRsZXIpO1xuICAgICAgICBzcGF3bi5fZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuICAgICAgICBzcGF3bi5fbmV4dCh2b2lkIDApO1xuICAgICAgICByZXR1cm4gc3Bhd24ucHJvbWlzZSgpO1xuICAgIH07XG59O1xuXG5Qcm9taXNlLmNvcm91dGluZS5hZGRZaWVsZEhhbmRsZXIgPSBmdW5jdGlvbihmbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB5aWVsZEhhbmRsZXJzLnB1c2goZm4pO1xufTtcblxuUHJvbWlzZS5zcGF3biA9IGZ1bmN0aW9uIFByb21pc2UkU3Bhd24oZ2VuZXJhdG9yRnVuY3Rpb24pIHtcbiAgICBkZXByZWNhdGVkKFwiUHJvbWlzZS5zcGF3biBpcyBkZXByZWNhdGVkLiBVc2UgUHJvbWlzZS5jb3JvdXRpbmUgaW5zdGVhZC5cIik7XG4gICAgaWYgKHR5cGVvZiBnZW5lcmF0b3JGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJnZW5lcmF0b3JGdW5jdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHZhciBzcGF3biA9IG5ldyBQcm9taXNlU3Bhd24oZ2VuZXJhdG9yRnVuY3Rpb24sIHRoaXMpO1xuICAgIHZhciByZXQgPSBzcGF3bi5wcm9taXNlKCk7XG4gICAgc3Bhd24uX3J1bihQcm9taXNlLnNwYXduKTtcbiAgICByZXR1cm4gcmV0O1xufTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL2dlbmVyYXRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uLCBjYXN0LCBJTlRFUk5BTCkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIHRyeUNhdGNoMyA9IHV0aWwudHJ5Q2F0Y2gzO1xudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcbnZhciBQRU5ESU5HID0ge307XG52YXIgRU1QVFlfQVJSQVkgPSBbXTtcblxuZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheShwcm9taXNlcywgZm4sIGxpbWl0LCBfZmlsdGVyKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQocHJvbWlzZXMpO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gZm47XG4gICAgdGhpcy5fcHJlc2VydmVkVmFsdWVzID0gX2ZpbHRlciA9PT0gSU5URVJOQUxcbiAgICAgICAgPyBuZXcgQXJyYXkodGhpcy5sZW5ndGgoKSlcbiAgICAgICAgOiBudWxsO1xuICAgIHRoaXMuX2xpbWl0ID0gbGltaXQ7XG4gICAgdGhpcy5faW5GbGlnaHQgPSAwO1xuICAgIHRoaXMuX3F1ZXVlID0gbGltaXQgPj0gMSA/IFtdIDogRU1QVFlfQVJSQVk7XG4gICAgdGhpcy5faW5pdCQodm9pZCAwLCAtMik7XG59XG51dGlsLmluaGVyaXRzKE1hcHBpbmdQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheSRfaW5pdCgpIHt9O1xuXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9XG5mdW5jdGlvbiBNYXBwaW5nUHJvbWlzZUFycmF5JF9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLCBpbmRleCkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgdmFyIHByZXNlcnZlZFZhbHVlcyA9IHRoaXMuX3ByZXNlcnZlZFZhbHVlcztcbiAgICB2YXIgbGltaXQgPSB0aGlzLl9saW1pdDtcbiAgICBpZiAodmFsdWVzW2luZGV4XSA9PT0gUEVORElORykge1xuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIGlmIChsaW1pdCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9pbkZsaWdodC0tO1xuICAgICAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxpbWl0ID49IDEgJiYgdGhpcy5faW5GbGlnaHQgPj0gbGltaXQpIHtcbiAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGwpIHByZXNlcnZlZFZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdmFyIHJlY2VpdmVyID0gdGhpcy5fcHJvbWlzZS5fYm91bmRUbztcbiAgICAgICAgdmFyIHJldCA9IHRyeUNhdGNoMyhjYWxsYmFjaywgcmVjZWl2ZXIsIHZhbHVlLCBpbmRleCwgbGVuZ3RoKTtcbiAgICAgICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHJldHVybiB0aGlzLl9yZWplY3QocmV0LmUpO1xuXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0KHJldCwgdm9pZCAwKTtcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobGltaXQgPj0gMSkgdGhpcy5faW5GbGlnaHQrKztcbiAgICAgICAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gUEVORElORztcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl9wcm94eVByb21pc2VBcnJheSh0aGlzLCBpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1heWJlUHJvbWlzZS5pc0Z1bGZpbGxlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0ID0gbWF5YmVQcm9taXNlLnZhbHVlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWplY3QobWF5YmVQcm9taXNlLnJlYXNvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gcmV0O1xuICAgIH1cbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcbiAgICBpZiAodG90YWxSZXNvbHZlZCA+PSBsZW5ndGgpIHtcbiAgICAgICAgaWYgKHByZXNlcnZlZFZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyKHZhbHVlcywgcHJlc2VydmVkVmFsdWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgfVxufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2RyYWluUXVldWUgPVxuZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheSRfZHJhaW5RdWV1ZSgpIHtcbiAgICB2YXIgcXVldWUgPSB0aGlzLl9xdWV1ZTtcbiAgICB2YXIgbGltaXQgPSB0aGlzLl9saW1pdDtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwICYmIHRoaXMuX2luRmxpZ2h0IDwgbGltaXQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcXVldWUucG9wKCk7XG4gICAgICAgIHRoaXMuX3Byb21pc2VGdWxmaWxsZWQodmFsdWVzW2luZGV4XSwgaW5kZXgpO1xuICAgIH1cbn07XG5cbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLl9maWx0ZXIgPVxuZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheSRfZmlsdGVyKGJvb2xlYW5zLCB2YWx1ZXMpIHtcbiAgICB2YXIgbGVuID0gdmFsdWVzLmxlbmd0aDtcbiAgICB2YXIgcmV0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgdmFyIGogPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKGJvb2xlYW5zW2ldKSByZXRbaisrXSA9IHZhbHVlc1tpXTtcbiAgICB9XG4gICAgcmV0Lmxlbmd0aCA9IGo7XG4gICAgdGhpcy5fcmVzb2x2ZShyZXQpO1xufTtcblxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUucHJlc2VydmVkVmFsdWVzID1cbmZ1bmN0aW9uIE1hcHBpbmdQcm9taXNlQXJyYXkkcHJlc2VydmVWYWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZXNlcnZlZFZhbHVlcztcbn07XG5cbmZ1bmN0aW9uIG1hcChwcm9taXNlcywgZm4sIG9wdGlvbnMsIF9maWx0ZXIpIHtcbiAgICB2YXIgbGltaXQgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zICE9PSBudWxsXG4gICAgICAgID8gb3B0aW9ucy5jb25jdXJyZW5jeVxuICAgICAgICA6IDA7XG4gICAgbGltaXQgPSB0eXBlb2YgbGltaXQgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgaXNGaW5pdGUobGltaXQpICYmIGxpbWl0ID49IDEgPyBsaW1pdCA6IDA7XG4gICAgcmV0dXJuIG5ldyBNYXBwaW5nUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgbGltaXQsIF9maWx0ZXIpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiBQcm9taXNlJG1hcChmbiwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGFwaVJlamVjdGlvbihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcblxuICAgIHJldHVybiBtYXAodGhpcywgZm4sIG9wdGlvbnMsIG51bGwpLnByb21pc2UoKTtcbn07XG5cblByb21pc2UubWFwID0gZnVuY3Rpb24gUHJvbWlzZSRNYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZm4gbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIHJldHVybiBtYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKS5wcm9taXNlKCk7XG59O1xuXG5cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL21hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGFzeW5jID0gcmVxdWlyZShcIi4vYXN5bmMuanNcIik7XG52YXIgdHJ5Q2F0Y2gyID0gdXRpbC50cnlDYXRjaDI7XG52YXIgdHJ5Q2F0Y2gxID0gdXRpbC50cnlDYXRjaDE7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuXG5mdW5jdGlvbiB0aHJvd2VyKHIpIHtcbiAgICB0aHJvdyByO1xufVxuXG5mdW5jdGlvbiBQcm9taXNlJF9zcHJlYWRBZGFwdGVyKHZhbCwgcmVjZWl2ZXIpIHtcbiAgICBpZiAoIXV0aWwuaXNBcnJheSh2YWwpKSByZXR1cm4gUHJvbWlzZSRfc3VjY2Vzc0FkYXB0ZXIodmFsLCByZWNlaXZlcik7XG4gICAgdmFyIHJldCA9IHV0aWwudHJ5Q2F0Y2hBcHBseSh0aGlzLCBbbnVsbF0uY29uY2F0KHZhbCksIHJlY2VpdmVyKTtcbiAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICBhc3luYy5pbnZva2VMYXRlcih0aHJvd2VyLCB2b2lkIDAsIHJldC5lKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIFByb21pc2UkX3N1Y2Nlc3NBZGFwdGVyKHZhbCwgcmVjZWl2ZXIpIHtcbiAgICB2YXIgbm9kZWJhY2sgPSB0aGlzO1xuICAgIHZhciByZXQgPSB2YWwgPT09IHZvaWQgMFxuICAgICAgICA/IHRyeUNhdGNoMShub2RlYmFjaywgcmVjZWl2ZXIsIG51bGwpXG4gICAgICAgIDogdHJ5Q2F0Y2gyKG5vZGViYWNrLCByZWNlaXZlciwgbnVsbCwgdmFsKTtcbiAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xuICAgICAgICBhc3luYy5pbnZva2VMYXRlcih0aHJvd2VyLCB2b2lkIDAsIHJldC5lKTtcbiAgICB9XG59XG5mdW5jdGlvbiBQcm9taXNlJF9lcnJvckFkYXB0ZXIocmVhc29uLCByZWNlaXZlcikge1xuICAgIHZhciBub2RlYmFjayA9IHRoaXM7XG4gICAgdmFyIHJldCA9IHRyeUNhdGNoMShub2RlYmFjaywgcmVjZWl2ZXIsIHJlYXNvbik7XG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcbiAgICAgICAgYXN5bmMuaW52b2tlTGF0ZXIodGhyb3dlciwgdm9pZCAwLCByZXQuZSk7XG4gICAgfVxufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5ub2RlaWZ5ID0gZnVuY3Rpb24gUHJvbWlzZSRub2RlaWZ5KG5vZGViYWNrLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlYmFjayA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdmFyIGFkYXB0ZXIgPSBQcm9taXNlJF9zdWNjZXNzQWRhcHRlcjtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT09IHZvaWQgMCAmJiBPYmplY3Qob3B0aW9ucykuc3ByZWFkKSB7XG4gICAgICAgICAgICBhZGFwdGVyID0gUHJvbWlzZSRfc3ByZWFkQWRhcHRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aGVuKFxuICAgICAgICAgICAgYWRhcHRlcixcbiAgICAgICAgICAgIFByb21pc2UkX2Vycm9yQWRhcHRlcixcbiAgICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICAgIG5vZGViYWNrLFxuICAgICAgICAgICAgdGhpcy5fYm91bmRUb1xuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9ub2RlaWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIFRISVMgPSB7fTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBub2RlYmFja0ZvclByb21pc2UgPSByZXF1aXJlKFwiLi9wcm9taXNlX3Jlc29sdmVyLmpzXCIpXG4gICAgLl9ub2RlYmFja0ZvclByb21pc2U7XG52YXIgd2l0aEFwcGVuZGVkID0gdXRpbC53aXRoQXBwZW5kZWQ7XG52YXIgbWF5YmVXcmFwQXNFcnJvciA9IHV0aWwubWF5YmVXcmFwQXNFcnJvcjtcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XG52YXIgVHlwZUVycm9yID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpLlR5cGVFcnJvcjtcbnZhciBkZWZhdWx0U3VmZml4ID0gXCJBc3luY1wiO1xudmFyIGRlZmF1bHRGaWx0ZXIgPSBmdW5jdGlvbihuYW1lLCBmdW5jKSB7XG4gICAgcmV0dXJuIHV0aWwuaXNJZGVudGlmaWVyKG5hbWUpICYmXG4gICAgICAgIG5hbWUuY2hhckF0KDApICE9PSBcIl9cIiAmJlxuICAgICAgICAhdXRpbC5pc0NsYXNzKGZ1bmMpO1xufTtcbnZhciBkZWZhdWx0UHJvbWlzaWZpZWQgPSB7X19pc1Byb21pc2lmaWVkX186IHRydWV9O1xuXG5cbmZ1bmN0aW9uIGVzY2FwZUlkZW50UmVnZXgoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWyRdKS8sIFwiXFxcXCRcIik7XG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzaWZpZWQoZm4pIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4uX19pc1Byb21pc2lmaWVkX18gPT09IHRydWU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc1Byb21pc2lmaWVkKG9iaiwga2V5LCBzdWZmaXgpIHtcbiAgICB2YXIgdmFsID0gdXRpbC5nZXREYXRhUHJvcGVydHlPckRlZmF1bHQob2JqLCBrZXkgKyBzdWZmaXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9taXNpZmllZCk7XG4gICAgcmV0dXJuIHZhbCA/IGlzUHJvbWlzaWZpZWQodmFsKSA6IGZhbHNlO1xufVxuZnVuY3Rpb24gY2hlY2tWYWxpZChyZXQsIHN1ZmZpeCwgc3VmZml4UmVnZXhwKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgdmFyIGtleSA9IHJldFtpXTtcbiAgICAgICAgaWYgKHN1ZmZpeFJlZ2V4cC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgIHZhciBrZXlXaXRob3V0QXN5bmNTdWZmaXggPSBrZXkucmVwbGFjZShzdWZmaXhSZWdleHAsIFwiXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXQubGVuZ3RoOyBqICs9IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0W2pdID09PSBrZXlXaXRob3V0QXN5bmNTdWZmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBwcm9taXNpZnkgYW4gQVBJIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGhhdCBoYXMgbm9ybWFsIG1ldGhvZHMgd2l0aCAnXCIrc3VmZml4K1wiJy1zdWZmaXhcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9taXNpZmlhYmxlTWV0aG9kcyhvYmosIHN1ZmZpeCwgc3VmZml4UmVnZXhwLCBmaWx0ZXIpIHtcbiAgICB2YXIga2V5cyA9IHV0aWwuaW5oZXJpdGVkRGF0YUtleXMob2JqKTtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAhaXNQcm9taXNpZmllZCh2YWx1ZSkgJiZcbiAgICAgICAgICAgICFoYXNQcm9taXNpZmllZChvYmosIGtleSwgc3VmZml4KSAmJlxuICAgICAgICAgICAgZmlsdGVyKGtleSwgdmFsdWUsIG9iaikpIHtcbiAgICAgICAgICAgIHJldC5wdXNoKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrVmFsaWQocmV0LCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCk7XG4gICAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gc3dpdGNoQ2FzZUFyZ3VtZW50T3JkZXIobGlrZWx5QXJndW1lbnRDb3VudCkge1xuICAgIHZhciByZXQgPSBbbGlrZWx5QXJndW1lbnRDb3VudF07XG4gICAgdmFyIG1pbiA9IE1hdGgubWF4KDAsIGxpa2VseUFyZ3VtZW50Q291bnQgLSAxIC0gNSk7XG4gICAgZm9yKHZhciBpID0gbGlrZWx5QXJndW1lbnRDb3VudCAtIDE7IGkgPj0gbWluOyAtLWkpIHtcbiAgICAgICAgaWYgKGkgPT09IGxpa2VseUFyZ3VtZW50Q291bnQpIGNvbnRpbnVlO1xuICAgICAgICByZXQucHVzaChpKTtcbiAgICB9XG4gICAgZm9yKHZhciBpID0gbGlrZWx5QXJndW1lbnRDb3VudCArIDE7IGkgPD0gNTsgKytpKSB7XG4gICAgICAgIHJldC5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBhcmd1bWVudFNlcXVlbmNlKGFyZ3VtZW50Q291bnQpIHtcbiAgICByZXR1cm4gdXRpbC5maWxsZWRSYW5nZShhcmd1bWVudENvdW50LCBcImFyZ3VtZW50c1tcIiwgXCJdXCIpO1xufVxuXG5mdW5jdGlvbiBwYXJhbWV0ZXJEZWNsYXJhdGlvbihwYXJhbWV0ZXJDb3VudCkge1xuICAgIHJldHVybiB1dGlsLmZpbGxlZFJhbmdlKHBhcmFtZXRlckNvdW50LCBcIl9hcmdcIiwgXCJcIik7XG59XG5cbmZ1bmN0aW9uIHBhcmFtZXRlckNvdW50KGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmbi5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGZuLmxlbmd0aCwgMTAyMyArIDEpLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUHJvcGVydHlBY2Nlc3Moa2V5KSB7XG4gICAgaWYgKHV0aWwuaXNJZGVudGlmaWVyKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIFwiLlwiICsga2V5O1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBcIlsnXCIgKyBrZXkucmVwbGFjZSgvKFsnXFxcXF0pL2csIFwiXFxcXCQxXCIpICsgXCInXVwiO1xufVxuXG5mdW5jdGlvbiBtYWtlTm9kZVByb21pc2lmaWVkRXZhbChjYWxsYmFjaywgcmVjZWl2ZXIsIG9yaWdpbmFsTmFtZSwgZm4sIHN1ZmZpeCkge1xuICAgIHZhciBuZXdQYXJhbWV0ZXJDb3VudCA9IE1hdGgubWF4KDAsIHBhcmFtZXRlckNvdW50KGZuKSAtIDEpO1xuICAgIHZhciBhcmd1bWVudE9yZGVyID0gc3dpdGNoQ2FzZUFyZ3VtZW50T3JkZXIobmV3UGFyYW1ldGVyQ291bnQpO1xuICAgIHZhciBjYWxsYmFja05hbWUgPVxuICAgICAgICAodHlwZW9mIG9yaWdpbmFsTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB1dGlsLmlzSWRlbnRpZmllcihvcmlnaW5hbE5hbWUpXG4gICAgICAgICAgICA/IG9yaWdpbmFsTmFtZSArIHN1ZmZpeFxuICAgICAgICAgICAgOiBcInByb21pc2lmaWVkXCIpO1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChjb3VudCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50U2VxdWVuY2UoY291bnQpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgdmFyIGNvbW1hID0gY291bnQgPiAwID8gXCIsIFwiIDogXCJcIjtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0ID0gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZCh7e2FyZ3N9fSwgZm4pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiLnJlcGxhY2UoXCIubWV0aG9kXCIsIGdlbmVyYXRlUHJvcGVydHlBY2Nlc3MoY2FsbGJhY2spKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNlaXZlciA9PT0gVEhJUykge1xuICAgICAgICAgICAgcmV0ID0gIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHt7YXJnc319LCBmbik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHJlY2VpdmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIHJldCA9ICBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChyZWNlaXZlciwge3thcmdzfX0sIGZuKTsgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9ICBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soe3thcmdzfX0sIGZuKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0LnJlcGxhY2UoXCJ7e2FyZ3N9fVwiLCBhcmdzKS5yZXBsYWNlKFwiLCBcIiwgY29tbWEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlQXJndW1lbnRTd2l0Y2hDYXNlKCkge1xuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50T3JkZXIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJldCArPSBcImNhc2UgXCIgKyBhcmd1bWVudE9yZGVyW2ldICtcIjpcIiArXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChhcmd1bWVudE9yZGVyW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29kZUZvckNhbGw7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvZGVGb3JDYWxsID0gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eS5hcHBseSh0aGlzLCBhcmdzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwiLnByb3BlcnR5XCIsIGdlbmVyYXRlUHJvcGVydHlBY2Nlc3MoY2FsbGJhY2spKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWNlaXZlciA9PT0gVEhJUykge1xuICAgICAgICAgICAgY29kZUZvckNhbGwgPSBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZUZvckNhbGwgPSBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShyZWNlaXZlciwgYXJncyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0ICs9IFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsZW4gKyAxKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB2YXIgaSA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBhcmdzW2ldID0gZm47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBbQ29kZUZvckNhbGxdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgICAgICBicmVhazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXG4gICAgICAgIFwiLnJlcGxhY2UoXCJbQ29kZUZvckNhbGxdXCIsIGNvZGVGb3JDYWxsKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiUHJvbWlzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWxsYmFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNlaXZlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoQXBwZW5kZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF5YmVXcmFwQXNFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub2RlYmFja0ZvclByb21pc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiSU5URVJOQUxcIixcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgdmFyIHJldCA9IGZ1bmN0aW9uIEZ1bmN0aW9uTmFtZShQYXJhbWV0ZXJzKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHByb21pc2UuX3NldFRyYWNlKHZvaWQgMCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHZhciBmbiA9IG5vZGViYWNrRm9yUHJvbWlzZShwcm9taXNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHRyeSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICAgICAgW0NvZGVGb3JTd2l0Y2hDYXNlXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlZCA9IG1heWJlV3JhcEFzRXJyb3IoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHdyYXBwZWQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9yZWplY3Qod3JhcHBlZCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0Ll9faXNQcm9taXNpZmllZF9fID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgcmV0dXJuIHJldDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcbiAgICAgICAgXCJcbiAgICAgICAgLnJlcGxhY2UoXCJGdW5jdGlvbk5hbWVcIiwgY2FsbGJhY2tOYW1lKVxuICAgICAgICAucmVwbGFjZShcIlBhcmFtZXRlcnNcIiwgcGFyYW1ldGVyRGVjbGFyYXRpb24obmV3UGFyYW1ldGVyQ291bnQpKVxuICAgICAgICAucmVwbGFjZShcIltDb2RlRm9yU3dpdGNoQ2FzZV1cIiwgZ2VuZXJhdGVBcmd1bWVudFN3aXRjaENhc2UoKSkpKFxuICAgICAgICAgICAgUHJvbWlzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgcmVjZWl2ZXIsXG4gICAgICAgICAgICB3aXRoQXBwZW5kZWQsXG4gICAgICAgICAgICBtYXliZVdyYXBBc0Vycm9yLFxuICAgICAgICAgICAgbm9kZWJhY2tGb3JQcm9taXNlLFxuICAgICAgICAgICAgSU5URVJOQUxcbiAgICAgICAgKTtcbn1cblxuZnVuY3Rpb24gbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmUoY2FsbGJhY2ssIHJlY2VpdmVyKSB7XG4gICAgZnVuY3Rpb24gcHJvbWlzaWZpZWQoKSB7XG4gICAgICAgIHZhciBfcmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgaWYgKHJlY2VpdmVyID09PSBUSElTKSBfcmVjZWl2ZXIgPSB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IF9yZWNlaXZlcltjYWxsYmFja107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XG4gICAgICAgIHByb21pc2UuX3NldFRyYWNlKHZvaWQgMCk7XG4gICAgICAgIHZhciBmbiA9IG5vZGViYWNrRm9yUHJvbWlzZShwcm9taXNlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KF9yZWNlaXZlciwgd2l0aEFwcGVuZGVkKGFyZ3VtZW50cywgZm4pKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlZCA9IG1heWJlV3JhcEFzRXJyb3IoZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHdyYXBwZWQpO1xuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHdyYXBwZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBwcm9taXNpZmllZC5fX2lzUHJvbWlzaWZpZWRfXyA9IHRydWU7XG4gICAgcmV0dXJuIHByb21pc2lmaWVkO1xufVxuXG52YXIgbWFrZU5vZGVQcm9taXNpZmllZCA9IGNhbkV2YWx1YXRlXG4gICAgPyBtYWtlTm9kZVByb21pc2lmaWVkRXZhbFxuICAgIDogbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmU7XG5cbmZ1bmN0aW9uIHByb21pc2lmeUFsbChvYmosIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllcikge1xuICAgIHZhciBzdWZmaXhSZWdleHAgPSBuZXcgUmVnRXhwKGVzY2FwZUlkZW50UmVnZXgoc3VmZml4KSArIFwiJFwiKTtcbiAgICB2YXIgbWV0aG9kcyA9XG4gICAgICAgIHByb21pc2lmaWFibGVNZXRob2RzKG9iaiwgc3VmZml4LCBzdWZmaXhSZWdleHAsIGZpbHRlcik7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsZW47IGkrPSAyKSB7XG4gICAgICAgIHZhciBrZXkgPSBtZXRob2RzW2ldO1xuICAgICAgICB2YXIgZm4gPSBtZXRob2RzW2krMV07XG4gICAgICAgIHZhciBwcm9taXNpZmllZEtleSA9IGtleSArIHN1ZmZpeDtcbiAgICAgICAgb2JqW3Byb21pc2lmaWVkS2V5XSA9IHByb21pc2lmaWVyID09PSBtYWtlTm9kZVByb21pc2lmaWVkXG4gICAgICAgICAgICAgICAgPyBtYWtlTm9kZVByb21pc2lmaWVkKGtleSwgVEhJUywga2V5LCBmbiwgc3VmZml4KVxuICAgICAgICAgICAgICAgIDogcHJvbWlzaWZpZXIoZm4pO1xuICAgIH1cbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMob2JqKTtcbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBwcm9taXNpZnkoY2FsbGJhY2ssIHJlY2VpdmVyKSB7XG4gICAgcmV0dXJuIG1ha2VOb2RlUHJvbWlzaWZpZWQoY2FsbGJhY2ssIHJlY2VpdmVyLCB2b2lkIDAsIGNhbGxiYWNrKTtcbn1cblxuUHJvbWlzZS5wcm9taXNpZnkgPSBmdW5jdGlvbiBQcm9taXNlJFByb21pc2lmeShmbiwgcmVjZWl2ZXIpIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgaWYgKGlzUHJvbWlzaWZpZWQoZm4pKSB7XG4gICAgICAgIHJldHVybiBmbjtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2lmeShmbiwgYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBUSElTIDogcmVjZWl2ZXIpO1xufTtcblxuUHJvbWlzZS5wcm9taXNpZnlBbGwgPSBmdW5jdGlvbiBQcm9taXNlJFByb21pc2lmeUFsbCh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRoZSB0YXJnZXQgb2YgcHJvbWlzaWZ5QWxsIG11c3QgYmUgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3Qob3B0aW9ucyk7XG4gICAgdmFyIHN1ZmZpeCA9IG9wdGlvbnMuc3VmZml4O1xuICAgIGlmICh0eXBlb2Ygc3VmZml4ICE9PSBcInN0cmluZ1wiKSBzdWZmaXggPSBkZWZhdWx0U3VmZml4O1xuICAgIHZhciBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyO1xuICAgIHZhciBwcm9taXNpZmllciA9IG9wdGlvbnMucHJvbWlzaWZpZXI7XG4gICAgaWYgKHR5cGVvZiBwcm9taXNpZmllciAhPT0gXCJmdW5jdGlvblwiKSBwcm9taXNpZmllciA9IG1ha2VOb2RlUHJvbWlzaWZpZWQ7XG5cbiAgICBpZiAoIXV0aWwuaXNJZGVudGlmaWVyKHN1ZmZpeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJzdWZmaXggbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcIik7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSB1dGlsLmluaGVyaXRlZERhdGFLZXlzKHRhcmdldCwge2luY2x1ZGVIaWRkZW46IHRydWV9KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGFyZ2V0W2tleXNbaV1dO1xuICAgICAgICBpZiAoa2V5c1tpXSAhPT0gXCJjb25zdHJ1Y3RvclwiICYmXG4gICAgICAgICAgICB1dGlsLmlzQ2xhc3ModmFsdWUpKSB7XG4gICAgICAgICAgICBwcm9taXNpZnlBbGwodmFsdWUucHJvdG90eXBlLCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIpO1xuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2lmeUFsbCh0YXJnZXQsIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllcik7XG59O1xufTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9wcm9taXNpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgY2FzdCkge1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xudmFyIGFwaVJlamVjdGlvbiA9IHJlcXVpcmUoXCIuL2Vycm9yc19hcGlfcmVqZWN0aW9uXCIpKFByb21pc2UpO1xudmFyIGlzT2JqZWN0ID0gdXRpbC5pc09iamVjdDtcbnZhciBlczUgPSByZXF1aXJlKFwiLi9lczUuanNcIik7XG5cbmZ1bmN0aW9uIFByb3BlcnRpZXNQcm9taXNlQXJyYXkob2JqKSB7XG4gICAgdmFyIGtleXMgPSBlczUua2V5cyhvYmopO1xuICAgIHZhciBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbiAqIDIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXldO1xuICAgICAgICB2YWx1ZXNbaSArIGxlbl0gPSBrZXk7XG4gICAgfVxuICAgIHRoaXMuY29uc3RydWN0b3IkKHZhbHVlcyk7XG59XG51dGlsLmluaGVyaXRzKFByb3BlcnRpZXNQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID1cbmZ1bmN0aW9uIFByb3BlcnRpZXNQcm9taXNlQXJyYXkkX2luaXQoKSB7XG4gICAgdGhpcy5faW5pdCQodm9pZCAwLCAtMykgO1xufTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPVxuZnVuY3Rpb24gUHJvcGVydGllc1Byb21pc2VBcnJheSRfcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZSwgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgIHZhciB0b3RhbFJlc29sdmVkID0gKyt0aGlzLl90b3RhbFJlc29sdmVkO1xuICAgIGlmICh0b3RhbFJlc29sdmVkID49IHRoaXMuX2xlbmd0aCkge1xuICAgICAgICB2YXIgdmFsID0ge307XG4gICAgICAgIHZhciBrZXlPZmZzZXQgPSB0aGlzLmxlbmd0aCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5sZW5ndGgoKTsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YWxbdGhpcy5fdmFsdWVzW2kgKyBrZXlPZmZzZXRdXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXNvbHZlKHZhbCk7XG4gICAgfVxufTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VQcm9ncmVzc2VkID1cbmZ1bmN0aW9uIFByb3BlcnRpZXNQcm9taXNlQXJyYXkkX3Byb21pc2VQcm9ncmVzc2VkKHZhbHVlLCBpbmRleCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcblxuICAgIHRoaXMuX3Byb21pc2UuX3Byb2dyZXNzKHtcbiAgICAgICAga2V5OiB0aGlzLl92YWx1ZXNbaW5kZXggKyB0aGlzLmxlbmd0aCgpXSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG59O1xuXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID1cbmZ1bmN0aW9uIFByb3BlcnRpZXNQcm9taXNlQXJyYXkkX3Nob3VsZENvcHlWYWx1ZXMoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuZ2V0QWN0dWFsTGVuZ3RoID1cbmZ1bmN0aW9uIFByb3BlcnRpZXNQcm9taXNlQXJyYXkkZ2V0QWN0dWFsTGVuZ3RoKGxlbikge1xuICAgIHJldHVybiBsZW4gPj4gMTtcbn07XG5cbmZ1bmN0aW9uIFByb21pc2UkX1Byb3BzKHByb21pc2VzKSB7XG4gICAgdmFyIHJldDtcbiAgICB2YXIgY2FzdFZhbHVlID0gY2FzdChwcm9taXNlcywgdm9pZCAwKTtcblxuICAgIGlmICghaXNPYmplY3QoY2FzdFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiY2Fubm90IGF3YWl0IHByb3BlcnRpZXMgb2YgYSBub24tb2JqZWN0XCIpO1xuICAgIH0gZWxzZSBpZiAoY2FzdFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXQgPSBjYXN0VmFsdWUuX3RoZW4oUHJvbWlzZS5wcm9wcywgdm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgdm9pZCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBuZXcgUHJvcGVydGllc1Byb21pc2VBcnJheShjYXN0VmFsdWUpLnByb21pc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoY2FzdFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXQuX3Byb3BhZ2F0ZUZyb20oY2FzdFZhbHVlLCA0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUucHJvcHMgPSBmdW5jdGlvbiBQcm9taXNlJHByb3BzKCkge1xuICAgIHJldHVybiBQcm9taXNlJF9Qcm9wcyh0aGlzKTtcbn07XG5cblByb21pc2UucHJvcHMgPSBmdW5jdGlvbiBQcm9taXNlJFByb3BzKHByb21pc2VzKSB7XG4gICAgcmV0dXJuIFByb21pc2UkX1Byb3BzKHByb21pc2VzKTtcbn07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9wcm9wcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIGNhc3QsIElOVEVSTkFMKSB7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG52YXIgdHJ5Q2F0Y2g0ID0gdXRpbC50cnlDYXRjaDQ7XG52YXIgdHJ5Q2F0Y2gzID0gdXRpbC50cnlDYXRjaDM7XG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xuZnVuY3Rpb24gUmVkdWN0aW9uUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgYWNjdW0sIF9lYWNoKSB7XG4gICAgdGhpcy5jb25zdHJ1Y3RvciQocHJvbWlzZXMpO1xuICAgIHRoaXMuX3ByZXNlcnZlZFZhbHVlcyA9IF9lYWNoID09PSBJTlRFUk5BTCA/IFtdIDogbnVsbDtcbiAgICB0aGlzLl96ZXJvdGhJc0FjY3VtID0gKGFjY3VtID09PSB2b2lkIDApO1xuICAgIHRoaXMuX2dvdEFjY3VtID0gZmFsc2U7XG4gICAgdGhpcy5fcmVkdWNpbmdJbmRleCA9ICh0aGlzLl96ZXJvdGhJc0FjY3VtID8gMSA6IDApO1xuICAgIHRoaXMuX3ZhbHVlc1BoYXNlID0gdW5kZWZpbmVkO1xuXG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QoYWNjdW0sIHZvaWQgMCk7XG4gICAgdmFyIHJlamVjdGVkID0gZmFsc2U7XG4gICAgdmFyIGlzUHJvbWlzZSA9IG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2U7XG4gICAgaWYgKGlzUHJvbWlzZSkge1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICBtYXliZVByb21pc2UuX3Byb3h5UHJvbWlzZUFycmF5KHRoaXMsIC0xKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXliZVByb21pc2UuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgYWNjdW0gPSBtYXliZVByb21pc2UudmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMuX2dvdEFjY3VtID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVqZWN0KG1heWJlUHJvbWlzZS5yZWFzb24oKSk7XG4gICAgICAgICAgICByZWplY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEoaXNQcm9taXNlIHx8IHRoaXMuX3plcm90aElzQWNjdW0pKSB0aGlzLl9nb3RBY2N1bSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBmbjtcbiAgICB0aGlzLl9hY2N1bSA9IGFjY3VtO1xuICAgIGlmICghcmVqZWN0ZWQpIHRoaXMuX2luaXQkKHZvaWQgMCwgLTUpO1xufVxudXRpbC5pbmhlcml0cyhSZWR1Y3Rpb25Qcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPVxuZnVuY3Rpb24gUmVkdWN0aW9uUHJvbWlzZUFycmF5JF9pbml0KCkge307XG5cblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmVFbXB0eUFycmF5ID1cbmZ1bmN0aW9uIFJlZHVjdGlvblByb21pc2VBcnJheSRfcmVzb2x2ZUVtcHR5QXJyYXkoKSB7XG4gICAgaWYgKHRoaXMuX2dvdEFjY3VtIHx8IHRoaXMuX3plcm90aElzQWNjdW0pIHtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl9wcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgID8gW10gOiB0aGlzLl9hY2N1bSk7XG4gICAgfVxufTtcblxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9XG5mdW5jdGlvbiBSZWR1Y3Rpb25Qcm9taXNlQXJyYXkkX3Byb21pc2VGdWxmaWxsZWQodmFsdWUsIGluZGV4KSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICBpZiAodmFsdWVzID09PSBudWxsKSByZXR1cm47XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgdmFyIHByZXNlcnZlZFZhbHVlcyA9IHRoaXMuX3ByZXNlcnZlZFZhbHVlcztcbiAgICB2YXIgaXNFYWNoID0gcHJlc2VydmVkVmFsdWVzICE9PSBudWxsO1xuICAgIHZhciBnb3RBY2N1bSA9IHRoaXMuX2dvdEFjY3VtO1xuICAgIHZhciB2YWx1ZXNQaGFzZSA9IHRoaXMuX3ZhbHVlc1BoYXNlO1xuICAgIHZhciB2YWx1ZXNQaGFzZUluZGV4O1xuICAgIGlmICghdmFsdWVzUGhhc2UpIHtcbiAgICAgICAgdmFsdWVzUGhhc2UgPSB0aGlzLl92YWx1ZXNQaGFzZSA9IEFycmF5KGxlbmd0aCk7XG4gICAgICAgIGZvciAodmFsdWVzUGhhc2VJbmRleD0wOyB2YWx1ZXNQaGFzZUluZGV4PGxlbmd0aDsgKyt2YWx1ZXNQaGFzZUluZGV4KSB7XG4gICAgICAgICAgICB2YWx1ZXNQaGFzZVt2YWx1ZXNQaGFzZUluZGV4XSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsdWVzUGhhc2VJbmRleCA9IHZhbHVlc1BoYXNlW2luZGV4XTtcblxuICAgIGlmIChpbmRleCA9PT0gMCAmJiB0aGlzLl96ZXJvdGhJc0FjY3VtKSB7XG4gICAgICAgIGlmICghZ290QWNjdW0pIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY3VtID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9nb3RBY2N1bSA9IGdvdEFjY3VtID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZXNQaGFzZVtpbmRleF0gPSAoKHZhbHVlc1BoYXNlSW5kZXggPT09IDApXG4gICAgICAgICAgICA/IDEgOiAyKTtcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBpZiAoIWdvdEFjY3VtKSB7XG4gICAgICAgICAgICB0aGlzLl9hY2N1bSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZ290QWNjdW0gPSBnb3RBY2N1bSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsdWVzUGhhc2VJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsdWVzUGhhc2VbaW5kZXhdID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlc1BoYXNlW2luZGV4XSA9IDI7XG4gICAgICAgICAgICBpZiAoZ290QWNjdW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2N1bSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZ290QWNjdW0pIHJldHVybjtcblxuICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2NhbGxiYWNrO1xuICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3Byb21pc2UuX2JvdW5kVG87XG4gICAgdmFyIHJldDtcblxuICAgIGZvciAodmFyIGkgPSB0aGlzLl9yZWR1Y2luZ0luZGV4OyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFsdWVzUGhhc2VJbmRleCA9IHZhbHVlc1BoYXNlW2ldO1xuICAgICAgICBpZiAodmFsdWVzUGhhc2VJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5fcmVkdWNpbmdJbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlc1BoYXNlSW5kZXggIT09IDEpIHJldHVybjtcblxuICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLl9zZXR0bGVkVmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWplY3QodmFsdWUucmVhc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRWFjaCkge1xuICAgICAgICAgICAgcHJlc2VydmVkVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgcmV0ID0gdHJ5Q2F0Y2gzKGNhbGxiYWNrLCByZWNlaXZlciwgdmFsdWUsIGksIGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXQgPSB0cnlDYXRjaDQoY2FsbGJhY2ssIHJlY2VpdmVyLCB0aGlzLl9hY2N1bSwgdmFsdWUsIGksIGxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikgcmV0dXJuIHRoaXMuX3JlamVjdChyZXQuZSk7XG5cbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QocmV0LCB2b2lkIDApO1xuICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZS5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlc1BoYXNlW2ldID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl9wcm94eVByb21pc2VBcnJheSh0aGlzLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF5YmVQcm9taXNlLmlzRnVsZmlsbGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBtYXliZVByb21pc2UudmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl91bnNldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdChtYXliZVByb21pc2UucmVhc29uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVkdWNpbmdJbmRleCA9IGkgKyAxO1xuICAgICAgICB0aGlzLl9hY2N1bSA9IHJldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVkdWNpbmdJbmRleCA8IGxlbmd0aCkgcmV0dXJuO1xuICAgIHRoaXMuX3Jlc29sdmUoaXNFYWNoID8gcHJlc2VydmVkVmFsdWVzIDogdGhpcy5fYWNjdW0pO1xufTtcblxuZnVuY3Rpb24gcmVkdWNlKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGFwaVJlamVjdGlvbihcImZuIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICB2YXIgYXJyYXkgPSBuZXcgUmVkdWN0aW9uUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCk7XG4gICAgcmV0dXJuIGFycmF5LnByb21pc2UoKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gUHJvbWlzZSRyZWR1Y2UoZm4sIGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiByZWR1Y2UodGhpcywgZm4sIGluaXRpYWxWYWx1ZSwgbnVsbCk7XG59O1xuXG5Qcm9taXNlLnJlZHVjZSA9IGZ1bmN0aW9uIFByb21pc2UkUmVkdWNlKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xuICAgIHJldHVybiByZWR1Y2UocHJvbWlzZXMsIGZuLCBpbml0aWFsVmFsdWUsIF9lYWNoKTtcbn07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9yZWR1Y2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9XG4gICAgZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5KSB7XG52YXIgUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xuXG5mdW5jdGlvbiBTZXR0bGVkUHJvbWlzZUFycmF5KHZhbHVlcykge1xuICAgIHRoaXMuY29uc3RydWN0b3IkKHZhbHVlcyk7XG59XG51dGlsLmluaGVyaXRzKFNldHRsZWRQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XG5cblNldHRsZWRQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlUmVzb2x2ZWQgPVxuZnVuY3Rpb24gU2V0dGxlZFByb21pc2VBcnJheSRfcHJvbWlzZVJlc29sdmVkKGluZGV4LCBpbnNwZWN0aW9uKSB7XG4gICAgdGhpcy5fdmFsdWVzW2luZGV4XSA9IGluc3BlY3Rpb247XG4gICAgdmFyIHRvdGFsUmVzb2x2ZWQgPSArK3RoaXMuX3RvdGFsUmVzb2x2ZWQ7XG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzKTtcbiAgICB9XG59O1xuXG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9XG5mdW5jdGlvbiBTZXR0bGVkUHJvbWlzZUFycmF5JF9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLCBpbmRleCkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2VJbnNwZWN0aW9uKCk7XG4gICAgcmV0Ll9iaXRGaWVsZCA9IDI2ODQzNTQ1NjtcbiAgICByZXQuX3NldHRsZWRWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3Byb21pc2VSZXNvbHZlZChpbmRleCwgcmV0KTtcbn07XG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID1cbmZ1bmN0aW9uIFNldHRsZWRQcm9taXNlQXJyYXkkX3Byb21pc2VSZWplY3RlZChyZWFzb24sIGluZGV4KSB7XG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZUluc3BlY3Rpb24oKTtcbiAgICByZXQuX2JpdEZpZWxkID0gMTM0MjE3NzI4O1xuICAgIHJldC5fc2V0dGxlZFZhbHVlID0gcmVhc29uO1xuICAgIHRoaXMuX3Byb21pc2VSZXNvbHZlZChpbmRleCwgcmV0KTtcbn07XG5cblByb21pc2Uuc2V0dGxlID0gZnVuY3Rpb24gUHJvbWlzZSRTZXR0bGUocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gbmV3IFNldHRsZWRQcm9taXNlQXJyYXkocHJvbWlzZXMpLnByb21pc2UoKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnNldHRsZSA9IGZ1bmN0aW9uIFByb21pc2Ukc2V0dGxlKCkge1xuICAgIHJldHVybiBuZXcgU2V0dGxlZFByb21pc2VBcnJheSh0aGlzKS5wcm9taXNlKCk7XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vc2V0dGxlLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPVxuZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24pIHtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBSYW5nZUVycm9yID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpLlJhbmdlRXJyb3I7XG52YXIgQWdncmVnYXRlRXJyb3IgPSByZXF1aXJlKFwiLi9lcnJvcnMuanNcIikuQWdncmVnYXRlRXJyb3I7XG52YXIgaXNBcnJheSA9IHV0aWwuaXNBcnJheTtcblxuXG5mdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5KHZhbHVlcykge1xuICAgIHRoaXMuY29uc3RydWN0b3IkKHZhbHVlcyk7XG4gICAgdGhpcy5faG93TWFueSA9IDA7XG4gICAgdGhpcy5fdW53cmFwID0gZmFsc2U7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbn1cbnV0aWwuaW5oZXJpdHMoU29tZVByb21pc2VBcnJheSwgUHJvbWlzZUFycmF5KTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5JF9pbml0KCkge1xuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5faG93TWFueSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9yZXNvbHZlKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pbml0JCh2b2lkIDAsIC01KTtcbiAgICB2YXIgaXNBcnJheVJlc29sdmVkID0gaXNBcnJheSh0aGlzLl92YWx1ZXMpO1xuICAgIGlmICghdGhpcy5faXNSZXNvbHZlZCgpICYmXG4gICAgICAgIGlzQXJyYXlSZXNvbHZlZCAmJlxuICAgICAgICB0aGlzLl9ob3dNYW55ID4gdGhpcy5fY2FuUG9zc2libHlGdWxmaWxsKCkpIHtcbiAgICAgICAgdGhpcy5fcmVqZWN0KHRoaXMuX2dldFJhbmdlRXJyb3IodGhpcy5sZW5ndGgoKSkpO1xuICAgIH1cbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5JGluaXQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2luaXQoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLnNldFVud3JhcCA9IGZ1bmN0aW9uIFNvbWVQcm9taXNlQXJyYXkkc2V0VW53cmFwKCkge1xuICAgIHRoaXMuX3Vud3JhcCA9IHRydWU7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5ob3dNYW55ID0gZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRob3dNYW55KCkge1xuICAgIHJldHVybiB0aGlzLl9ob3dNYW55O1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuc2V0SG93TWFueSA9XG5mdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5JHNldEhvd01hbnkoY291bnQpIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdGhpcy5faG93TWFueSA9IGNvdW50O1xufTtcblxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPVxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRfcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcbiAgICB0aGlzLl9hZGRGdWxmaWxsZWQodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mdWxmaWxsZWQoKSA9PT0gdGhpcy5ob3dNYW55KCkpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aCA9IHRoaXMuaG93TWFueSgpO1xuICAgICAgICBpZiAodGhpcy5ob3dNYW55KCkgPT09IDEgJiYgdGhpcy5fdW53cmFwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlc1swXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID1cbmZ1bmN0aW9uIFNvbWVQcm9taXNlQXJyYXkkX3Byb21pc2VSZWplY3RlZChyZWFzb24pIHtcbiAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XG4gICAgdGhpcy5fYWRkUmVqZWN0ZWQocmVhc29uKTtcbiAgICBpZiAodGhpcy5ob3dNYW55KCkgPiB0aGlzLl9jYW5Qb3NzaWJseUZ1bGZpbGwoKSkge1xuICAgICAgICB2YXIgZSA9IG5ldyBBZ2dyZWdhdGVFcnJvcigpO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGgoKTsgaSA8IHRoaXMuX3ZhbHVlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZS5wdXNoKHRoaXMuX3ZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVqZWN0KGUpO1xuICAgIH1cbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9mdWxmaWxsZWQgPSBmdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5JF9mdWxmaWxsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVzb2x2ZWQ7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVqZWN0ZWQgPSBmdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5JF9yZWplY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzLmxlbmd0aCAtIHRoaXMubGVuZ3RoKCk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fYWRkUmVqZWN0ZWQgPVxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRfYWRkUmVqZWN0ZWQocmVhc29uKSB7XG4gICAgdGhpcy5fdmFsdWVzLnB1c2gocmVhc29uKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hZGRGdWxmaWxsZWQgPVxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRfYWRkRnVsZmlsbGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWVzW3RoaXMuX3RvdGFsUmVzb2x2ZWQrK10gPSB2YWx1ZTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9jYW5Qb3NzaWJseUZ1bGZpbGwgPVxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRfY2FuUG9zc2libHlGdWxmaWxsKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aCgpIC0gdGhpcy5fcmVqZWN0ZWQoKTtcbn07XG5cblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9nZXRSYW5nZUVycm9yID1cbmZ1bmN0aW9uIFNvbWVQcm9taXNlQXJyYXkkX2dldFJhbmdlRXJyb3IoY291bnQpIHtcbiAgICB2YXIgbWVzc2FnZSA9IFwiSW5wdXQgYXJyYXkgbXVzdCBjb250YWluIGF0IGxlYXN0IFwiICtcbiAgICAgICAgICAgIHRoaXMuX2hvd01hbnkgKyBcIiBpdGVtcyBidXQgY29udGFpbnMgb25seSBcIiArIGNvdW50ICsgXCIgaXRlbXNcIjtcbiAgICByZXR1cm4gbmV3IFJhbmdlRXJyb3IobWVzc2FnZSk7XG59O1xuXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVzb2x2ZUVtcHR5QXJyYXkgPVxuZnVuY3Rpb24gU29tZVByb21pc2VBcnJheSRfcmVzb2x2ZUVtcHR5QXJyYXkoKSB7XG4gICAgdGhpcy5fcmVqZWN0KHRoaXMuX2dldFJhbmdlRXJyb3IoMCkpO1xufTtcblxuZnVuY3Rpb24gUHJvbWlzZSRfU29tZShwcm9taXNlcywgaG93TWFueSkge1xuICAgIGlmICgoaG93TWFueSB8IDApICE9PSBob3dNYW55IHx8IGhvd01hbnkgPCAwKSB7XG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBwb3NpdGl2ZSBpbnRlZ2VyXCIpO1xuICAgIH1cbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICBpZiAocHJvbWlzZS5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHJldC5zZXRIb3dNYW55KGhvd01hbnkpO1xuICAgIHJldC5pbml0KCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cblByb21pc2Uuc29tZSA9IGZ1bmN0aW9uIFByb21pc2UkU29tZShwcm9taXNlcywgaG93TWFueSkge1xuICAgIHJldHVybiBQcm9taXNlJF9Tb21lKHByb21pc2VzLCBob3dNYW55KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnNvbWUgPSBmdW5jdGlvbiBQcm9taXNlJHNvbWUoaG93TWFueSkge1xuICAgIHJldHVybiBQcm9taXNlJF9Tb21lKHRoaXMsIGhvd01hbnkpO1xufTtcblxuUHJvbWlzZS5fU29tZVByb21pc2VBcnJheSA9IFNvbWVQcm9taXNlQXJyYXk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmx1ZWJpcmQvanMvbWFpbi9zb21lLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXkpIHtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoXCIuL2FzeW5jLmpzXCIpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoXCIuL2Vycm9ycy5qc1wiKTtcbnZhciB0cnlDYXRjaDEgPSB1dGlsLnRyeUNhdGNoMTtcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XG5cblByb21pc2UucHJvdG90eXBlLnByb2dyZXNzZWQgPSBmdW5jdGlvbiBQcm9taXNlJHByb2dyZXNzZWQoaGFuZGxlcikge1xuICAgIHJldHVybiB0aGlzLl90aGVuKHZvaWQgMCwgdm9pZCAwLCBoYW5kbGVyLCB2b2lkIDAsIHZvaWQgMCk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvZ3Jlc3MgPSBmdW5jdGlvbiBQcm9taXNlJF9wcm9ncmVzcyhwcm9ncmVzc1ZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX2lzRm9sbG93aW5nT3JGdWxmaWxsZWRPclJlamVjdGVkKCkpIHJldHVybjtcbiAgICB0aGlzLl9wcm9ncmVzc1VuY2hlY2tlZChwcm9ncmVzc1ZhbHVlKTtcblxufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NsZWFyRmlyc3RIYW5kbGVyRGF0YSRCYXNlID1cblByb21pc2UucHJvdG90eXBlLl9jbGVhckZpcnN0SGFuZGxlckRhdGE7XG5Qcm9taXNlLnByb3RvdHlwZS5fY2xlYXJGaXJzdEhhbmRsZXJEYXRhID1cbmZ1bmN0aW9uIFByb21pc2UkX2NsZWFyRmlyc3RIYW5kbGVyRGF0YSgpIHtcbiAgICB0aGlzLl9jbGVhckZpcnN0SGFuZGxlckRhdGEkQmFzZSgpO1xuICAgIHRoaXMuX3Byb2dyZXNzSGFuZGxlcjAgPSB2b2lkIDA7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvZ3Jlc3NIYW5kbGVyQXQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfcHJvZ3Jlc3NIYW5kbGVyQXQoaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDBcbiAgICAgICAgPyB0aGlzLl9wcm9ncmVzc0hhbmRsZXIwXG4gICAgICAgIDogdGhpc1soaW5kZXggPDwgMikgKyBpbmRleCAtIDUgKyAyXTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLl9kb1Byb2dyZXNzV2l0aCA9XG5mdW5jdGlvbiBQcm9taXNlJF9kb1Byb2dyZXNzV2l0aChwcm9ncmVzc2lvbikge1xuICAgIHZhciBwcm9ncmVzc1ZhbHVlID0gcHJvZ3Jlc3Npb24udmFsdWU7XG4gICAgdmFyIGhhbmRsZXIgPSBwcm9ncmVzc2lvbi5oYW5kbGVyO1xuICAgIHZhciBwcm9taXNlID0gcHJvZ3Jlc3Npb24ucHJvbWlzZTtcbiAgICB2YXIgcmVjZWl2ZXIgPSBwcm9ncmVzc2lvbi5yZWNlaXZlcjtcblxuICAgIHZhciByZXQgPSB0cnlDYXRjaDEoaGFuZGxlciwgcmVjZWl2ZXIsIHByb2dyZXNzVmFsdWUpO1xuICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7XG4gICAgICAgIGlmIChyZXQuZSAhPSBudWxsICYmXG4gICAgICAgICAgICByZXQuZS5uYW1lICE9PSBcIlN0b3BQcm9ncmVzc1Byb3BhZ2F0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGVycm9ycy5jYW5BdHRhY2gocmV0LmUpXG4gICAgICAgICAgICAgICAgPyByZXQuZSA6IG5ldyBFcnJvcihyZXQuZSArIFwiXCIpO1xuICAgICAgICAgICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZSh0cmFjZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9wcm9ncmVzcyhyZXQuZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJldCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0Ll90aGVuKHByb21pc2UuX3Byb2dyZXNzLCBudWxsLCBudWxsLCBwcm9taXNlLCB2b2lkIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb21pc2UuX3Byb2dyZXNzKHJldCk7XG4gICAgfVxufTtcblxuXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvZ3Jlc3NVbmNoZWNrZWQgPVxuZnVuY3Rpb24gUHJvbWlzZSRfcHJvZ3Jlc3NVbmNoZWNrZWQocHJvZ3Jlc3NWYWx1ZSkge1xuICAgIGlmICghdGhpcy5pc1BlbmRpbmcoKSkgcmV0dXJuO1xuICAgIHZhciBsZW4gPSB0aGlzLl9sZW5ndGgoKTtcbiAgICB2YXIgcHJvZ3Jlc3MgPSB0aGlzLl9wcm9ncmVzcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5fcHJvZ3Jlc3NIYW5kbGVyQXQoaSk7XG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGkpO1xuICAgICAgICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChyZWNlaXZlciwgcHJvZ3Jlc3NWYWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUHJvbWlzZSAmJiByZWNlaXZlci5faXNQcm94aWVkKCkpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlci5fcHJvZ3Jlc3NVbmNoZWNrZWQocHJvZ3Jlc3NWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUHJvbWlzZUFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIuX3Byb21pc2VQcm9ncmVzc2VkKHByb2dyZXNzVmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgYXN5bmMuaW52b2tlKHRoaXMuX2RvUHJvZ3Jlc3NXaXRoLCB0aGlzLCB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICAgICAgICAgIHJlY2VpdmVyOiB0aGlzLl9yZWNlaXZlckF0KGkpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9ncmVzc1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFzeW5jLmludm9rZShwcm9ncmVzcywgcHJvbWlzZSwgcHJvZ3Jlc3NWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vcHJvZ3Jlc3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XG52YXIgZXJyb3JzID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpO1xudmFyIGNhbkF0dGFjaCA9IGVycm9ycy5jYW5BdHRhY2g7XG52YXIgYXN5bmMgPSByZXF1aXJlKFwiLi9hc3luYy5qc1wiKTtcbnZhciBDYW5jZWxsYXRpb25FcnJvciA9IGVycm9ycy5DYW5jZWxsYXRpb25FcnJvcjtcblxuUHJvbWlzZS5wcm90b3R5cGUuX2NhbmNlbCA9IGZ1bmN0aW9uIFByb21pc2UkX2NhbmNlbChyZWFzb24pIHtcbiAgICBpZiAoIXRoaXMuaXNDYW5jZWxsYWJsZSgpKSByZXR1cm4gdGhpcztcbiAgICB2YXIgcGFyZW50O1xuICAgIHZhciBwcm9taXNlVG9SZWplY3QgPSB0aGlzO1xuICAgIHdoaWxlICgocGFyZW50ID0gcHJvbWlzZVRvUmVqZWN0Ll9jYW5jZWxsYXRpb25QYXJlbnQpICE9PSB2b2lkIDAgJiZcbiAgICAgICAgcGFyZW50LmlzQ2FuY2VsbGFibGUoKSkge1xuICAgICAgICBwcm9taXNlVG9SZWplY3QgPSBwYXJlbnQ7XG4gICAgfVxuICAgIHByb21pc2VUb1JlamVjdC5fYXR0YWNoRXh0cmFUcmFjZShyZWFzb24pO1xuICAgIHByb21pc2VUb1JlamVjdC5fcmVqZWN0VW5jaGVja2VkKHJlYXNvbik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiBQcm9taXNlJGNhbmNlbChyZWFzb24pIHtcbiAgICBpZiAoIXRoaXMuaXNDYW5jZWxsYWJsZSgpKSByZXR1cm4gdGhpcztcbiAgICByZWFzb24gPSByZWFzb24gIT09IHZvaWQgMFxuICAgICAgICA/IChjYW5BdHRhY2gocmVhc29uKSA/IHJlYXNvbiA6IG5ldyBFcnJvcihyZWFzb24gKyBcIlwiKSlcbiAgICAgICAgOiBuZXcgQ2FuY2VsbGF0aW9uRXJyb3IoKTtcbiAgICBhc3luYy5pbnZva2VMYXRlcih0aGlzLl9jYW5jZWwsIHRoaXMsIHJlYXNvbik7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5jYW5jZWxsYWJsZSA9IGZ1bmN0aW9uIFByb21pc2UkY2FuY2VsbGFibGUoKSB7XG4gICAgaWYgKHRoaXMuX2NhbmNlbGxhYmxlKCkpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuX3NldENhbmNlbGxhYmxlKCk7XG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gdm9pZCAwO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUudW5jYW5jZWxsYWJsZSA9IGZ1bmN0aW9uIFByb21pc2UkdW5jYW5jZWxsYWJsZSgpIHtcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xuICAgIHJldC5fcHJvcGFnYXRlRnJvbSh0aGlzLCAyIHwgNCk7XG4gICAgcmV0Ll9mb2xsb3codGhpcyk7XG4gICAgcmV0Ll91bnNldENhbmNlbGxhYmxlKCk7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZvcmsgPVxuZnVuY3Rpb24gUHJvbWlzZSRmb3JrKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgZGlkUHJvZ3Jlc3MpIHtcbiAgICB2YXIgcmV0ID0gdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIGRpZFByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgMCwgdm9pZCAwKTtcblxuICAgIHJldC5fc2V0Q2FuY2VsbGFibGUoKTtcbiAgICByZXQuX2NhbmNlbGxhdGlvblBhcmVudCA9IHZvaWQgMDtcbiAgICByZXR1cm4gcmV0O1xufTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL2NhbmNlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcbnZhciBQcm9taXNlTWFwID0gUHJvbWlzZS5tYXA7XG5cblByb21pc2UucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIFByb21pc2UkZmlsdGVyKGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFByb21pc2VNYXAodGhpcywgZm4sIG9wdGlvbnMsIElOVEVSTkFMKTtcbn07XG5cblByb21pc2UuZmlsdGVyID0gZnVuY3Rpb24gUHJvbWlzZSRGaWx0ZXIocHJvbWlzZXMsIGZuLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFByb21pc2VNYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBJTlRFUk5BTCk7XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZmlsdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XG52YXIgU29tZVByb21pc2VBcnJheSA9IFByb21pc2UuX1NvbWVQcm9taXNlQXJyYXk7XG5mdW5jdGlvbiBQcm9taXNlJF9BbnkocHJvbWlzZXMpIHtcbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcbiAgICBpZiAocHJvbWlzZS5pc1JlamVjdGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIHJldC5zZXRIb3dNYW55KDEpO1xuICAgIHJldC5zZXRVbndyYXAoKTtcbiAgICByZXQuaW5pdCgpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5Qcm9taXNlLmFueSA9IGZ1bmN0aW9uIFByb21pc2UkQW55KHByb21pc2VzKSB7XG4gICAgcmV0dXJuIFByb21pc2UkX0FueShwcm9taXNlcyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbiBQcm9taXNlJGFueSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZSRfQW55KHRoaXMpO1xufTtcblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vYW55LmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xudmFyIFByb21pc2VSZWR1Y2UgPSBQcm9taXNlLnJlZHVjZTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIFByb21pc2UkZWFjaChmbikge1xuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHRoaXMsIGZuLCBudWxsLCBJTlRFUk5BTCk7XG59O1xuXG5Qcm9taXNlLmVhY2ggPSBmdW5jdGlvbiBQcm9taXNlJEVhY2gocHJvbWlzZXMsIGZuKSB7XG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UocHJvbWlzZXMsIGZuLCBudWxsLCBJTlRFUk5BTCk7XG59O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZWFjaC5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgUGV0a2EgQW50b25vdlxuICogXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6PC9wPlxuICogXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiBcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICovXG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFByb21pc2UsIGFwaVJlamVjdGlvbiwgY2FzdCkge1xuICAgIHZhciBUeXBlRXJyb3IgPSByZXF1aXJlKFwiLi9lcnJvcnMuanNcIikuVHlwZUVycm9yO1xuICAgIHZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIikuaW5oZXJpdHM7XG4gICAgdmFyIFByb21pc2VJbnNwZWN0aW9uID0gUHJvbWlzZS5Qcm9taXNlSW5zcGVjdGlvbjtcblxuICAgIGZ1bmN0aW9uIGluc3BlY3Rpb25NYXBwZXIoaW5zcGVjdGlvbnMpIHtcbiAgICAgICAgdmFyIGxlbiA9IGluc3BlY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIGluc3BlY3Rpb24gPSBpbnNwZWN0aW9uc1tpXTtcbiAgICAgICAgICAgIGlmIChpbnNwZWN0aW9uLmlzUmVqZWN0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChpbnNwZWN0aW9uLmVycm9yKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zcGVjdGlvbnNbaV0gPSBpbnNwZWN0aW9uLnZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3BlY3Rpb25zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRocm93ZXIoZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhyb3cgZTt9LCAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXN0UHJlc2VydmluZ0Rpc3Bvc2FibGUodGhlbmFibGUpIHtcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IGNhc3QodGhlbmFibGUsIHZvaWQgMCk7XG4gICAgICAgIGlmIChtYXliZVByb21pc2UgIT09IHRoZW5hYmxlICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhlbmFibGUuX2lzRGlzcG9zYWJsZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhlbmFibGUuX2dldERpc3Bvc2VyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgIHRoZW5hYmxlLl9pc0Rpc3Bvc2FibGUoKSkge1xuICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9zZXREaXNwb3NhYmxlKHRoZW5hYmxlLl9nZXREaXNwb3NlcigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwb3NlKHJlc291cmNlcywgaW5zcGVjdGlvbikge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHZhciBsZW4gPSByZXNvdXJjZXMubGVuZ3RoO1xuICAgICAgICB2YXIgcmV0ID0gUHJvbWlzZS5kZWZlcigpO1xuICAgICAgICBmdW5jdGlvbiBpdGVyYXRvcigpIHtcbiAgICAgICAgICAgIGlmIChpID49IGxlbikgcmV0dXJuIHJldC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHJlc291cmNlc1tpKytdKTtcbiAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlICYmXG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9pc0Rpc3Bvc2FibGUoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IGNhc3QobWF5YmVQcm9taXNlLl9nZXREaXNwb3NlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyeURpc3Bvc2UoaW5zcGVjdGlvbiksIHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dlcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1heWJlUHJvbWlzZS5fdGhlbihpdGVyYXRvciwgdGhyb3dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVyYXRvcigpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZXJhdG9yKCk7XG4gICAgICAgIHJldHVybiByZXQucHJvbWlzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwb3NlclN1Y2Nlc3ModmFsdWUpIHtcbiAgICAgICAgdmFyIGluc3BlY3Rpb24gPSBuZXcgUHJvbWlzZUluc3BlY3Rpb24oKTtcbiAgICAgICAgaW5zcGVjdGlvbi5fc2V0dGxlZFZhbHVlID0gdmFsdWU7XG4gICAgICAgIGluc3BlY3Rpb24uX2JpdEZpZWxkID0gMjY4NDM1NDU2O1xuICAgICAgICByZXR1cm4gZGlzcG9zZSh0aGlzLCBpbnNwZWN0aW9uKS50aGVuUmV0dXJuKHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwb3NlckZhaWwocmVhc29uKSB7XG4gICAgICAgIHZhciBpbnNwZWN0aW9uID0gbmV3IFByb21pc2VJbnNwZWN0aW9uKCk7XG4gICAgICAgIGluc3BlY3Rpb24uX3NldHRsZWRWYWx1ZSA9IHJlYXNvbjtcbiAgICAgICAgaW5zcGVjdGlvbi5fYml0RmllbGQgPSAxMzQyMTc3Mjg7XG4gICAgICAgIHJldHVybiBkaXNwb3NlKHRoaXMsIGluc3BlY3Rpb24pLnRoZW5UaHJvdyhyZWFzb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIERpc3Bvc2VyKGRhdGEsIHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBwcm9taXNlO1xuICAgIH1cblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24gRGlzcG9zZXIkZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5wcm9taXNlID0gZnVuY3Rpb24gRGlzcG9zZXIkcHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uIERpc3Bvc2VyJHJlc291cmNlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9taXNlKCkuaXNGdWxmaWxsZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZSgpLnZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS50cnlEaXNwb3NlID0gZnVuY3Rpb24oaW5zcGVjdGlvbikge1xuICAgICAgICB2YXIgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlKCk7XG4gICAgICAgIHZhciByZXQgPSByZXNvdXJjZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyB0aGlzLmRvRGlzcG9zZShyZXNvdXJjZSwgaW5zcGVjdGlvbikgOiBudWxsO1xuICAgICAgICB0aGlzLl9wcm9taXNlLl91bnNldERpc3Bvc2FibGUoKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX3Byb21pc2UgPSBudWxsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBEaXNwb3Nlci5pc0Rpc3Bvc2VyID0gZnVuY3Rpb24gRGlzcG9zZXIkaXNEaXNwb3NlcihkKSB7XG4gICAgICAgIHJldHVybiAoZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQucmVzb3VyY2UgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBkLnRyeURpc3Bvc2UgPT09IFwiZnVuY3Rpb25cIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIEZ1bmN0aW9uRGlzcG9zZXIoZm4sIHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciQoZm4sIHByb21pc2UpO1xuICAgIH1cbiAgICBpbmhlcml0cyhGdW5jdGlvbkRpc3Bvc2VyLCBEaXNwb3Nlcik7XG5cbiAgICBGdW5jdGlvbkRpc3Bvc2VyLnByb3RvdHlwZS5kb0Rpc3Bvc2UgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGluc3BlY3Rpb24pIHtcbiAgICAgICAgdmFyIGZuID0gdGhpcy5kYXRhKCk7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHJlc291cmNlLCByZXNvdXJjZSwgaW5zcGVjdGlvbik7XG4gICAgfTtcblxuICAgIFByb21pc2UudXNpbmcgPSBmdW5jdGlvbiBQcm9taXNlJHVzaW5nKCkge1xuICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA8IDIpIHJldHVybiBhcGlSZWplY3Rpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBcInlvdSBtdXN0IHBhc3MgYXQgbGVhc3QgMiBhcmd1bWVudHMgdG8gUHJvbWlzZS51c2luZ1wiKTtcbiAgICAgICAgdmFyIGZuID0gYXJndW1lbnRzW2xlbiAtIDFdO1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBhcGlSZWplY3Rpb24oXCJmbiBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIGxlbi0tO1xuICAgICAgICB2YXIgcmVzb3VyY2VzID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChEaXNwb3Nlci5pc0Rpc3Bvc2VyKHJlc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHZhciBkaXNwb3NlciA9IHJlc291cmNlO1xuICAgICAgICAgICAgICAgIHJlc291cmNlID0gcmVzb3VyY2UucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIHJlc291cmNlLl9zZXREaXNwb3NhYmxlKGRpc3Bvc2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc291cmNlc1tpXSA9IHJlc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2Uuc2V0dGxlKHJlc291cmNlcylcbiAgICAgICAgICAgIC50aGVuKGluc3BlY3Rpb25NYXBwZXIpXG4gICAgICAgICAgICAuc3ByZWFkKGZuKVxuICAgICAgICAgICAgLl90aGVuKGRpc3Bvc2VyU3VjY2VzcywgZGlzcG9zZXJGYWlsLCB2b2lkIDAsIHJlc291cmNlcywgdm9pZCAwKTtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3NldERpc3Bvc2FibGUgPVxuICAgIGZ1bmN0aW9uIFByb21pc2UkX3NldERpc3Bvc2FibGUoZGlzcG9zZXIpIHtcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDI2MjE0NDtcbiAgICAgICAgdGhpcy5fZGlzcG9zZXIgPSBkaXNwb3NlcjtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX2lzRGlzcG9zYWJsZSA9IGZ1bmN0aW9uIFByb21pc2UkX2lzRGlzcG9zYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2MjE0NCkgPiAwO1xuICAgIH07XG5cbiAgICBQcm9taXNlLnByb3RvdHlwZS5fZ2V0RGlzcG9zZXIgPSBmdW5jdGlvbiBQcm9taXNlJF9nZXREaXNwb3NlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VyO1xuICAgIH07XG5cbiAgICBQcm9taXNlLnByb3RvdHlwZS5fdW5zZXREaXNwb3NhYmxlID0gZnVuY3Rpb24gUHJvbWlzZSRfdW5zZXREaXNwb3NhYmxlKCkge1xuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH4yNjIxNDQpO1xuICAgICAgICB0aGlzLl9kaXNwb3NlciA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuZGlzcG9zZXIgPSBmdW5jdGlvbiBQcm9taXNlJGRpc3Bvc2VyKGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkRpc3Bvc2VyKGZuLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgfTtcblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vdXNpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cbnZhciBpc0VTNSA9IChmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiB0aGlzID09PSB2b2lkIDA7XG59KSgpO1xuXG5pZiAoaXNFUzUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAgICAgZnJlZXplOiBPYmplY3QuZnJlZXplLFxuICAgICAgICBkZWZpbmVQcm9wZXJ0eTogT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAgICAgICBrZXlzOiBPYmplY3Qua2V5cyxcbiAgICAgICAgZ2V0UHJvdG90eXBlT2Y6IE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgICAgICAgaXNBcnJheTogQXJyYXkuaXNBcnJheSxcbiAgICAgICAgaXNFUzU6IGlzRVM1XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgdmFyIGhhcyA9IHt9Lmhhc093blByb3BlcnR5O1xuICAgIHZhciBzdHIgPSB7fS50b1N0cmluZztcbiAgICB2YXIgcHJvdG8gPSB7fS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbiAgICB2YXIgT2JqZWN0S2V5cyA9IGZ1bmN0aW9uIE9iamVjdEtleXMobykge1xuICAgICAgICB2YXIgcmV0ID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwobywga2V5KSkge1xuICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICB2YXIgT2JqZWN0RGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBPYmplY3REZWZpbmVQcm9wZXJ0eShvLCBrZXksIGRlc2MpIHtcbiAgICAgICAgb1trZXldID0gZGVzYy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgdmFyIE9iamVjdEZyZWV6ZSA9IGZ1bmN0aW9uIE9iamVjdEZyZWV6ZShvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICB2YXIgT2JqZWN0R2V0UHJvdG90eXBlT2YgPSBmdW5jdGlvbiBPYmplY3RHZXRQcm90b3R5cGVPZihvYmopIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qob2JqKS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBBcnJheUlzQXJyYXkgPSBmdW5jdGlvbiBBcnJheUlzQXJyYXkob2JqKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgICBpc0FycmF5OiBBcnJheUlzQXJyYXksXG4gICAgICAgIGtleXM6IE9iamVjdEtleXMsXG4gICAgICAgIGRlZmluZVByb3BlcnR5OiBPYmplY3REZWZpbmVQcm9wZXJ0eSxcbiAgICAgICAgZnJlZXplOiBPYmplY3RGcmVlemUsXG4gICAgICAgIGdldFByb3RvdHlwZU9mOiBPYmplY3RHZXRQcm90b3R5cGVPZixcbiAgICAgICAgaXNFUzU6IGlzRVM1XG4gICAgfTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vZXM1LmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNCBQZXRrYSBBbnRvbm92XG4gKiBcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczo8L3A+XG4gKiBcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqIFxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiAgSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICogXG4gKi9cblwidXNlIHN0cmljdFwiO1xudmFyIHNjaGVkdWxlO1xudmFyIF9NdXRhdGlvbk9ic2VydmVyO1xuaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm9jZXNzLnZlcnNpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICBzY2hlZHVsZSA9IGZ1bmN0aW9uIFByb21pc2UkX1NjaGVkdWxlcihmbikge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZuKTtcbiAgICB9O1xufVxuZWxzZSBpZiAoKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAoX011dGF0aW9uT2JzZXJ2ZXIgPSBNdXRhdGlvbk9ic2VydmVyKSkgfHxcbiAgICAgICAgICh0eXBlb2YgV2ViS2l0TXV0YXRpb25PYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgKF9NdXRhdGlvbk9ic2VydmVyID0gV2ViS2l0TXV0YXRpb25PYnNlcnZlcikpKSB7XG4gICAgc2NoZWR1bGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgcXVldWVkRm4gPSB2b2lkIDA7XG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBfTXV0YXRpb25PYnNlcnZlcihcbiAgICAgICAgICAgIGZ1bmN0aW9uIFByb21pc2UkX1NjaGVkdWxlcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZWRGbjtcbiAgICAgICAgICAgICAgICBxdWV1ZWRGbiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZGl2LCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gUHJvbWlzZSRfU2NoZWR1bGVyKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZWRGbiA9IGZuO1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC50b2dnbGUoXCJmb29cIik7XG4gICAgICAgIH07XG5cbiAgICB9KSgpO1xufVxuZWxzZSBpZiAodHlwZW9mIHNldFRpbWVvdXQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzY2hlZHVsZSA9IGZ1bmN0aW9uIFByb21pc2UkX1NjaGVkdWxlcihmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufVxuZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJubyBhc3luYyBzY2hlZHVsZXIgYXZhaWxhYmxlXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBzY2hlZHVsZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JsdWViaXJkL2pzL21haW4vc2NoZWR1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE0IFBldGthIEFudG9ub3ZcbiAqIFxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOjwvcD5cbiAqIFxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKiBcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBhcnJheUNvcHkoc3JjLCBzcmNJbmRleCwgZHN0LCBkc3RJbmRleCwgbGVuKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW47ICsraikge1xuICAgICAgICBkc3RbaiArIGRzdEluZGV4XSA9IHNyY1tqICsgc3JjSW5kZXhdO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gUXVldWUoY2FwYWNpdHkpIHtcbiAgICB0aGlzLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgIHRoaXMuX2xlbmd0aCA9IDA7XG4gICAgdGhpcy5fZnJvbnQgPSAwO1xuICAgIHRoaXMuX21ha2VDYXBhY2l0eSgpO1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuX3dpbGxCZU92ZXJDYXBhY2l0eSA9XG5mdW5jdGlvbiBRdWV1ZSRfd2lsbEJlT3ZlckNhcGFjaXR5KHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FwYWNpdHkgPCBzaXplO1xufTtcblxuUXVldWUucHJvdG90eXBlLl9wdXNoT25lID0gZnVuY3Rpb24gUXVldWUkX3B1c2hPbmUoYXJnKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgdGhpcy5fY2hlY2tDYXBhY2l0eShsZW5ndGggKyAxKTtcbiAgICB2YXIgaSA9ICh0aGlzLl9mcm9udCArIGxlbmd0aCkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKTtcbiAgICB0aGlzW2ldID0gYXJnO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbmd0aCArIDE7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIFF1ZXVlJHB1c2goZm4sIHJlY2VpdmVyLCBhcmcpIHtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKSArIDM7XG4gICAgaWYgKHRoaXMuX3dpbGxCZU92ZXJDYXBhY2l0eShsZW5ndGgpKSB7XG4gICAgICAgIHRoaXMuX3B1c2hPbmUoZm4pO1xuICAgICAgICB0aGlzLl9wdXNoT25lKHJlY2VpdmVyKTtcbiAgICAgICAgdGhpcy5fcHVzaE9uZShhcmcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBqID0gdGhpcy5fZnJvbnQgKyBsZW5ndGggLSAzO1xuICAgIHRoaXMuX2NoZWNrQ2FwYWNpdHkobGVuZ3RoKTtcbiAgICB2YXIgd3JhcE1hc2sgPSB0aGlzLl9jYXBhY2l0eSAtIDE7XG4gICAgdGhpc1soaiArIDApICYgd3JhcE1hc2tdID0gZm47XG4gICAgdGhpc1soaiArIDEpICYgd3JhcE1hc2tdID0gcmVjZWl2ZXI7XG4gICAgdGhpc1soaiArIDIpICYgd3JhcE1hc2tdID0gYXJnO1xuICAgIHRoaXMuX2xlbmd0aCA9IGxlbmd0aDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5zaGlmdCA9IGZ1bmN0aW9uIFF1ZXVlJHNoaWZ0KCkge1xuICAgIHZhciBmcm9udCA9IHRoaXMuX2Zyb250LFxuICAgICAgICByZXQgPSB0aGlzW2Zyb250XTtcblxuICAgIHRoaXNbZnJvbnRdID0gdm9pZCAwO1xuICAgIHRoaXMuX2Zyb250ID0gKGZyb250ICsgMSkgJiAodGhpcy5fY2FwYWNpdHkgLSAxKTtcbiAgICB0aGlzLl9sZW5ndGgtLTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuUXVldWUucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uIFF1ZXVlJGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xufTtcblxuUXVldWUucHJvdG90eXBlLl9tYWtlQ2FwYWNpdHkgPSBmdW5jdGlvbiBRdWV1ZSRfbWFrZUNhcGFjaXR5KCkge1xuICAgIHZhciBsZW4gPSB0aGlzLl9jYXBhY2l0eTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHRoaXNbaV0gPSB2b2lkIDA7XG4gICAgfVxufTtcblxuUXVldWUucHJvdG90eXBlLl9jaGVja0NhcGFjaXR5ID0gZnVuY3Rpb24gUXVldWUkX2NoZWNrQ2FwYWNpdHkoc2l6ZSkge1xuICAgIGlmICh0aGlzLl9jYXBhY2l0eSA8IHNpemUpIHtcbiAgICAgICAgdGhpcy5fcmVzaXplVG8odGhpcy5fY2FwYWNpdHkgPDwgMyk7XG4gICAgfVxufTtcblxuUXVldWUucHJvdG90eXBlLl9yZXNpemVUbyA9IGZ1bmN0aW9uIFF1ZXVlJF9yZXNpemVUbyhjYXBhY2l0eSkge1xuICAgIHZhciBvbGRGcm9udCA9IHRoaXMuX2Zyb250O1xuICAgIHZhciBvbGRDYXBhY2l0eSA9IHRoaXMuX2NhcGFjaXR5O1xuICAgIHZhciBvbGRRdWV1ZSA9IG5ldyBBcnJheShvbGRDYXBhY2l0eSk7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cbiAgICBhcnJheUNvcHkodGhpcywgMCwgb2xkUXVldWUsIDAsIG9sZENhcGFjaXR5KTtcbiAgICB0aGlzLl9jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgIHRoaXMuX21ha2VDYXBhY2l0eSgpO1xuICAgIHRoaXMuX2Zyb250ID0gMDtcbiAgICBpZiAob2xkRnJvbnQgKyBsZW5ndGggPD0gb2xkQ2FwYWNpdHkpIHtcbiAgICAgICAgYXJyYXlDb3B5KG9sZFF1ZXVlLCBvbGRGcm9udCwgdGhpcywgMCwgbGVuZ3RoKTtcbiAgICB9IGVsc2UgeyAgICAgICAgdmFyIGxlbmd0aEJlZm9yZVdyYXBwaW5nID1cbiAgICAgICAgICAgIGxlbmd0aCAtICgob2xkRnJvbnQgKyBsZW5ndGgpICYgKG9sZENhcGFjaXR5IC0gMSkpO1xuXG4gICAgICAgIGFycmF5Q29weShvbGRRdWV1ZSwgb2xkRnJvbnQsIHRoaXMsIDAsIGxlbmd0aEJlZm9yZVdyYXBwaW5nKTtcbiAgICAgICAgYXJyYXlDb3B5KG9sZFF1ZXVlLCAwLCB0aGlzLCBsZW5ndGhCZWZvcmVXcmFwcGluZyxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoIC0gbGVuZ3RoQmVmb3JlV3JhcHBpbmcpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ibHVlYmlyZC9qcy9tYWluL3F1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=