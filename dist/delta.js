(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-graph"));
	else if(typeof define === 'function' && define.amd)
		define(["js-graph"], factory);
	else if(typeof exports === 'object')
		exports["DeltaModel"] = factory(require("js-graph"));
	else
		root["DeltaModel"] = factory(root["JsGraph"]);
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(JsGraph, U) {
	  'use strict';
	  var keepFirst = (function() {});
	  var keepSecond = (function(d1, p, d2) {
	    d1.operations[p] = d2;
	  });
	  var applySecondToFirstValue = (function(d1, p, d2) {
	    d2.applyTo(d1.operations[p], 'value');
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
	  var DeltaModel = U.newClass(function() {
	    var $__0 = this;
	    var _opTypes = {};
	    var _composeFns = [];
	    U.extend(this, {
	      _addOperationType: function($__4) {
	        var $__5 = $__4,
	            name = $__5.name,
	            constructor = $__5.constructor,
	            applyTo = $__5.applyTo,
	            prototype = $__5.prototype,
	            method = $__5.method;
	        var objectWithMethod = {};
	        _opTypes[name] = {
	          name: name,
	          Delta: constructor,
	          method: objectWithMethod[name]
	        };
	        U.extend(_opTypes[name].Delta.prototype, prototype, {
	          constructor: constructor,
	          type: name,
	          applyTo: applyTo
	        });
	        _opTypes['modify'].Delta.prototype[name] = U.isDefined(method) ? method : function(property) {
	          for (var values = [],
	              $__1 = 1; $__1 < arguments.length; $__1++)
	            values[$__1 - 1] = arguments[$__1];
	          this._addOperation(_opTypes[name], property, values);
	          return this;
	        };
	      },
	      _addOperationAlias: function($__4) {
	        var $__5 = $__4,
	            name = $__5.name,
	            target = $__5.target,
	            transform = $__5.transform;
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
	    var thisDM = this;
	    this._addOperationType({
	      name: 'modify',
	      constructor: function Modify() {
	        var deltaDescription = arguments[0] !== (void 0) ? arguments[0] : {};
	        var operations = arguments[1] !== (void 0) ? arguments[1] : {};
	        var $__0 = this;
	        this.operations = operations;
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
	            if ($__0.operations[property].type === op1Type && op2.type === op2Type) {
	              foundComposeFn = composeFn;
	              return true;
	            }
	          }));
	          if (foundComposeFn) {
	            foundComposeFn(this, property, op2);
	          } else {
	            var err = new Error(("You cannot follow a '" + this.operations[property].type + "' operation ") + ("with a '" + op2.type + "' operation on the same property."));
	            err.op1 = this.operations[property].type;
	            err.op2 = op2.type;
	            throw err;
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
	      name: 'replaceAround',
	      constructor: function ReplaceAround(value) {
	        this.value = value;
	      },
	      applyTo: function(obj, property) {
	        assertDefined(obj[property], 'replaceAround');
	        obj[property] = this.value(obj[property]);
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
	      d1.operations[p] = DeltaModel._newDelta('add', d2.value);
	    }));
	    this._addCompositionRule('add', 'modify', applySecondToFirstValue);
	    this._addCompositionRule('add', 'remove', (function(d1, p) {
	      d1.operations[p] = DeltaModel._newDelta('forbid');
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
	      d1.operations[p] = DeltaModel._newDelta('replace', d2.value);
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
	                  $__2 = 0; $__2 < arguments.length; $__2++)
	                args[$__2] = arguments[$__2];
	              partTwo.apply(this, args);
	              partOne.apply(this, args);
	            };
	          } else {
	            obj[property] = function() {
	              for (var args = [],
	                  $__3 = 0; $__3 < arguments.length; $__3++)
	                args[$__3] = arguments[$__3];
	              partOne.apply(this, args);
	              partTwo.apply(this, args);
	            };
	          }
	        }));
	      }
	    });
	    this._addCompositionRule('alter', 'alter', (function(d1, p, d2) {
	      [].push.apply(d1.operations[p].value, d2.value);
	    }));
	    this._addCompositionRule('alter', 'replace', keepSecond);
	    this._addCompositionRule('alter', 'remove', (function(d1, p) {
	      d1.operations[p] = DeltaModel._newDelta('forbid');
	    }));
	    this._addCompositionRule('add', 'alter', (function(d1, p, d2) {
	      assertFunction(d1.operations[p].value, d2.alias);
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'alter', (function(d1, p, d2) {
	      assertFunction(d1.operations[p].value, d2.alias);
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
	        U.assert(typeof resolvePromise === 'function', "Before creating an 'after' operation, you must register a promise resolver with delta.js.");
	        this.value = value;
	      },
	      applyTo: function(obj, property) {
	        assertFunction(obj[property], 'after');
	        var partOne = obj[property];
	        var partTwo = this.value;
	        obj[property] = function() {
	          for (var args = [],
	              $__2 = 0; $__2 < arguments.length; $__2++)
	            args[$__2] = arguments[$__2];
	          return resolvePromise(partOne.apply(this, args)).then(function() {
	            return partTwo.apply(this, args);
	          }.bind(this));
	        };
	      }
	    });
	    this._addCompositionRule('after', 'replace', keepSecond);
	    this._addCompositionRule('after', 'remove', keepSecond);
	    this._addCompositionRule('add', 'after', (function(d1, p, d2) {
	      assertFunction(d1.operations[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'after', (function(d1, p, d2) {
	      assertFunction(d1.operations[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('insert', 'after', applySecondToFirstValue);
	    this._addCompositionRule('after', 'insert', applySecondToFirstValue);
	    var _graph = new JsGraph();
	    U.extend(this, {graph: function() {
	        return _graph;
	      }});
	    var _deltaConditions = {};
	    var _settledDeltaConditions = {};
	    var _conditionsUnsettled = false;
	    function _registerDisjunct(deltaName, disjunct) {
	      _conditionsUnsettled = true;
	      if (disjunct === true) {
	        _settledDeltaConditions[deltaName] = true;
	      } else if (disjunct === false) {} else if (_deltaConditions[deltaName] !== true) {
	        U.array(_deltaConditions, deltaName).push(disjunct);
	      }
	    }
	    function _settleConditions() {
	      if (_conditionsUnsettled) {
	        _conditionsUnsettled = false;
	        var somethingChanged;
	        do {
	          somethingChanged = false;
	          _graph.eachVertex((function(deltaName) {
	            if (_settledDeltaConditions[deltaName]) {
	              return;
	            }
	            if (U.isUndefined(_deltaConditions[deltaName])) {
	              return;
	            }
	            if (_deltaConditions[deltaName].some((function(disjunct) {
	              return disjunct.every((function(conjunct) {
	                return _settledDeltaConditions[conjunct];
	              }));
	            }))) {
	              _settledDeltaConditions[deltaName] = true;
	              somethingChanged = true;
	            }
	          }));
	        } while (somethingChanged);
	      }
	    }
	    this.Delta = U.newSubclass(_opTypes['modify'].Delta, function Delta(superFn, deltaName) {
	      var options = arguments[2] !== (void 0) ? arguments[2] : {};
	      superFn.call(this, options);
	      U.assert(options instanceof Object, "A delta should be given as an object.");
	      Object.defineProperties(this, {
	        name: {get: function() {
	            return deltaName;
	          }},
	        manuallySelectable: {get: function() {
	            if (U.isDefined(options['manuallySelectable'])) {
	              return !!options['manuallySelectable'];
	            } else if (U.isDefined(options['resolves']) && options['resolves'].length > 0) {
	              return false;
	            } else {
	              return true;
	            }
	          }},
	        selected: {get: function() {
	            _settleConditions();
	            return !!_settledDeltaConditions[deltaName];
	          }},
	        if: {get: function() {
	            if (options['if'] === true || options['if'] === false) {
	              return options['if'];
	            } else if (options['if'] || options['iff'] || options['resolves']) {
	              return [].concat(options['if'] || [], options['iff'] || [], options['resolves'] || []);
	            } else {
	              return false;
	            }
	          }},
	        onlyIf: {get: function() {
	            if (options['onlyIf'] === true || options['onlyIf'] === false) {
	              return options['onlyIf'];
	            } else if (options['onlyIf'] || options['iff'] || options['expects'] || options['resolves']) {
	              return [].concat(options['onlyIf'] || [], options['iff'] || [], options['expects'] || [], options['resolves'] || []);
	            } else {
	              return true;
	            }
	          }},
	        after: {get: function() {
	            return [].concat(options['after'] || [], options['expects'] || [], options['resolves'] || [], options['requires'] || []);
	          }},
	        selects: {get: function() {
	            return [].concat(options['selects'] || [], options['requires'] || []);
	          }}
	      });
	      _conditionsUnsettled = true;
	      if (U.isDefined(this.if)) {
	        _registerDisjunct(deltaName, this.if);
	      }
	      this.selects.forEach((function(otherDeltaName) {
	        _registerDisjunct(otherDeltaName, [deltaName]);
	      }));
	      _graph.addVertex(deltaName, this);
	      this.after.forEach((function(otherDeltaName) {
	        _graph.createEdge(otherDeltaName, deltaName);
	      }));
	      U.assert(!_graph.hasCycle(), ("The delta " + deltaName + " introduced a cycle in the application order."));
	    });
	    U.extend(this, {
	      select: function() {
	        for (var deltaNames = [],
	            $__2 = 0; $__2 < arguments.length; $__2++)
	          deltaNames[$__2] = arguments[$__2];
	        deltaNames.forEach((function(deltaName) {
	          _registerDisjunct(deltaName, true);
	        }));
	      },
	      vp: function(vpName, val) {
	        var obj = {};
	        obj[vpName] = val;
	        _settleConditions();
	        _graph.eachVertex((function(name, delta) {
	          U.assert(!delta.selected || delta.onlyIf === true || delta.onlyIf.every((function(d) {
	            return _graph.vertexValue(d).selected;
	          })), ("The 'onlyIf' condition of delta '" + delta.name + "' was violated."));
	        }));
	        _graph.topologically((function(name, delta) {
	          if (delta.selected) {
	            delta.selectivelyApplyTo(obj, vpName);
	          }
	        }));
	        return obj[vpName];
	      }
	    });
	  });
	  var resolvePromise = null;
	  U.extend(DeltaModel, {registerPromiseResolver: function(promiseResolverFn) {
	      resolvePromise = promiseResolverFn;
	    }});
	  return DeltaModel;
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
	        constructor.apply(this, [superClass.prototype.constructor].concat(args));
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
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzOGY0NjlhZjBkM2YxMjY0MzVkMCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVksd0JBQVcsQ0FBRywwQ0FBVSxPQUFNLENBQUc7QUFDcEQsY0FBVyxDQUFDO0FBT1IsZUFBUSxJQUFJLFNBQUMsQ0FBSyxHQUFDLEVBQUM7QUFDcEIsZ0JBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxHQUFDO0dBQUUsRUFBQztBQUNyRCw2QkFBc0IsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsUUFBUyxD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dGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhTW9kZWxcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFNb2RlbFwiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzOGY0NjlhZjBkM2YxMjY0MzVkMFxuICoqLyIsImRlZmluZShbJ2pzLWdyYXBoJywgJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoSnNHcmFwaCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdHZhciBrZWVwRmlyc3QgPSAoKSA9PiB7fTtcblx0dmFyIGtlZXBTZWNvbmQgPSAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBkMiB9O1xuXHR2YXIgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUgPSAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5VG8oZDEub3BlcmF0aW9uc1twXSwgJ3ZhbHVlJykgfTtcblxuXHRmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdH1cblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvLyB0aGUgZGVsdGEtbW9kZWwgY2xhc3MsIHdoaWNoIGlzIHRoZSBjb250YWluZXIgb2YgYWxsIG9wZXJhdGlvbiB0eXBlcyxcblx0Ly8gYWxsIGRlbHRhcywgdGhlaXIgb3JkZXJpbmcgYW5kIHJ1bGVzXG5cdHZhciBEZWx0YU1vZGVsID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHZhciBfb3BUeXBlcyA9IHt9OyAvLyB0aGUgbmFtZSBhbmQgZGVsdGEgY2xhc3Nlc1xuXHRcdHZhciBfY29tcG9zZUZucyA9IFtdOyAvLyB0aGUgY2FzZSBkaXN0aW5jdGlvbnMgb2YgZGVsdGEgY29tcG9zaXRpb25cblxuXHRcdFUuZXh0ZW5kKHRoaXMsIHtcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBmdWxseSBkZWZpbmUgYSBuZXcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0XHRcdF9hZGRPcGVyYXRpb25UeXBlKHtuYW1lLCBjb25zdHJ1Y3RvciwgYXBwbHlUbywgcHJvdG90eXBlLCBtZXRob2R9KSB7XG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgbWV0aG9kIGZvciBhZGRpbmcgdGhlIG5ldyBvcGVyYXRpb24gdG8gYSBNb2RpZnkgZGVsdGEuXG5cdFx0XHRcdC8vIEl0IGlzIHB1dCBvbiBhIHRlbXBvcmFyeSBvYmplY3Rcblx0XHRcdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRcdF9vcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0RGVsdGE6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgc3BlY2lmaWMgRGVsdGEgY2xhc3Ncblx0XHRcdFx0VS5leHRlbmQoX29wVHlwZXNbbmFtZV0uRGVsdGEucHJvdG90eXBlLCBwcm90b3R5cGUsIHtcblx0XHRcdFx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3IsXG5cdFx0XHRcdFx0dHlwZTogbmFtZSxcblx0XHRcdFx0XHRhcHBseVRvOiBhcHBseVRvXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YVxuXHRcdFx0XHQvLyAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIHRoZSBmaXJzdCBkZWx0YSB0eXBlIHRvIGJlIGRlZmluZWQpXG5cdFx0XHRcdF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPVxuXHRcdFx0XHRcdFx0VS5pc0RlZmluZWQobWV0aG9kKSA/IG1ldGhvZCA6XG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1tuYW1lXSwgcHJvcGVydHksIHZhbHVlcyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGdpdmUgYSBuZXcgbmFtZSB0byAoYSB2YXJpYXRpb24gb2YpIGFuIGV4aXN0aW5nIGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uQWxpYXMoe25hbWUsIHRhcmdldCwgdHJhbnNmb3JtfSkge1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgbWV0aG9kIGZvciBhZGRpbmcgdGhlIG5ldyBvcGVyYXRpb24gdG8gYSBNb2RpZnkgZGVsdGFcblx0XHRcdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdFdpdGhNZXRob2QsIG5hbWUsIHtcblx0XHRcdFx0XHR2YWx1ZShwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbdGFyZ2V0XSwgcHJvcGVydHksIHRyYW5zZm9ybSh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YSAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIGRlZmluZWQgZmlyc3QpXG5cdFx0XHRcdF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPSBfb3BUeXBlc1tuYW1lXS5tZXRob2Q7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gYWRkIGEgbmV3IHZhbGlkIGNhc2UgZGlzdGluY3Rpb24gZm9yIGRlbHRhIGNvbXBvc2l0aW9uXG5cdFx0XHRfYWRkQ29tcG9zaXRpb25SdWxlKG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbikge1xuXHRcdFx0XHRfY29tcG9zZUZucy5wdXNoKHsgb3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuIH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gZ2V0IGEgbmV3IGRlbHRhIG9mIGEgZ2l2ZW4gdHlwZSwgY29uc3RydWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG5cdFx0XHRfbmV3RGVsdGEodHlwZSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdHJldHVybiBVLmFwcGx5Q29uc3RydWN0b3IoX29wVHlwZXNbdHlwZV0uRGVsdGEsIHZhbHVlcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyB0aGUgbW9kaWZ5IG9wZXJhdGlvbiAoTVVTVCBCRSBUSEUgRklSU1QgT1BFUkFUSU9OIFRZUEUgVE8gQkUgREVGSU5FRClcblx0XHR2YXIgdGhpc0RNID0gdGhpcztcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdtb2RpZnknLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIE1vZGlmeShkZWx0YURlc2NyaXB0aW9uID0ge30sIG9wZXJhdGlvbnMgPSB7fSkge1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuXHRcdFx0XHQvLyBwcm9jZXNzIHBvc3NpYmxlIGRlbHRhIGRlc2NyaXB0aW9uXG5cdFx0XHRcdE9iamVjdC5rZXlzKGRlbHRhRGVzY3JpcHRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoW1xcd1xcLl0rKSQvKTtcblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdHZhciBvcGVyYXRpb24gPSBtYXRjaFsxXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0VS5hc3NlcnQob3BlcmF0aW9uIGluIF9vcFR5cGVzLFxuXHRcdFx0XHRcdFx0XHRcdGBJIGRvbid0IGtub3cgdGhlICcke29wZXJhdGlvbn0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0XHRcdHRoaXNbb3BlcmF0aW9uXShwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbltrZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BlcnR5XWBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmpbcHJvcGVydHldLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRcdHNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0XHR2YXIgZm91bmRDb21wb3NlRm47XG5cdFx0XHRcdFx0X2NvbXBvc2VGbnMuc29tZSgoe29wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbn0pID0+IHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldLnR5cGUgPT09IG9wMVR5cGUgJiYgb3AyLnR5cGUgPT09IG9wMlR5cGUpIHtcblx0XHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4gPSBjb21wb3NlRm47XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChmb3VuZENvbXBvc2VGbikge1xuXHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4odGhpcywgcHJvcGVydHksIG9wMik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgZm9sbG93IGEgJyR7dGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XS50eXBlfScgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdFx0XHRcdGB3aXRoIGEgJyR7b3AyLnR5cGV9JyBvcGVyYXRpb24gb24gdGhlIHNhbWUgcHJvcGVydHkuYFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGVyci5vcDEgPSB0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldLnR5cGU7XG5cdFx0XHRcdFx0XHRlcnIub3AyID0gb3AyLnR5cGU7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcGVydHksIHZhbHVlcykge1xuXHRcdFx0XHRcdHZhciBkb3RJbmRleCA9IHByb3BlcnR5LmluZGV4T2YoJy4nKTtcblx0XHRcdFx0XHRpZiAoZG90SW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBkb3Qtc2VwYXJhdGVkIHBhdGg7IHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG1vZGlmeS1jaGFpblxuXHRcdFx0XHRcdFx0dmFyIGFjdHVhbFByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoMCwgZG90SW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIHJlc3RPZlByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoZG90SW5kZXggKyAxKTtcblx0XHRcdFx0XHRcdHZhciBuZXdNb2RpZnlEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIGFjdHVhbFByb3BlcnR5KTtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdNb2RpZnlEZWx0YVtvcFR5cGUubmFtZV0uYXBwbHkobmV3TW9kaWZ5RGVsdGEsIFtyZXN0T2ZQcm9wZXJ0eV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIHNpbmdsZSBuYW1lOyBhZGQgdGhlIG5ldyBkZWx0YSBkaXJlY3RseVxuXHRcdFx0XHRcdFx0dmFyIF9uZXdEZWx0YSA9IHRoaXNETS5fbmV3RGVsdGEuYXBwbHkodGhpc0RNLCBbb3BUeXBlLm5hbWVdLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShwcm9wZXJ0eSwgX25ld0RlbHRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0gPSBfbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZXRob2QocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb24pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIHByb3BlcnR5LCBbZGVsdGFEZXNjcmlwdGlvbl0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FkZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWRkKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnYWRkJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlcGxhY2UnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlcGxhY2UodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVwbGFjZScpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHsgLy8gVE9ETzogZG9jdW1lbnQgdGhpcyBvcGVyYXRpb25cblx0XHRcdG5hbWU6ICdyZXBsYWNlQXJvdW5kJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlQXJvdW5kKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlcGxhY2VBcm91bmQnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWUob2JqW3Byb3BlcnR5XSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAncmVtb3ZlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZW1vdmUoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZW1vdmUnKTtcblx0XHRcdFx0ZGVsZXRlIG9ialtwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnZm9yYmlkJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBGb3JiaWQoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkgeyBhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2ZvcmJpZCcpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gY29tcG9zaXRpb24gb2YgdGhlIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlcGxhY2UnLCAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnYWRkJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXG5cdFx0Ly90aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZXBsYWNlQXJvdW5kJywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpOyAvLyB0b28gdHJpY2t5IHJpZ2h0IG5vdzsgbXVzdCByZWZhY3RvclxuXHRcdC8vdGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlQXJvdW5kJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHQvL3RoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZUFyb3VuZCcsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0Ly90aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2VBcm91bmQnLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0Ly90aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2VBcm91bmQnLCAncmVwbGFjZUFyb3VuZCcsIGtlZXBTZWNvbmQpO1xuXG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsIChkMSwgcCwgZDIpID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdyZXBsYWNlJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnYWRkJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblxuXG5cdFx0Ly8gJ2FsdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FsdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBbHRlcih2YWx1ZSwgYWxpYXMpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXHRcdFx0XHR0aGlzLmFsaWFzID0gYWxpYXMgfHwgJ2FsdGVyJztcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgdGhpcy5hbGlhcyk7XG5cdFx0XHRcdHRoaXMudmFsdWUuZm9yRWFjaCgoc3ViT3ApID0+IHtcblx0XHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHBhcnRUd28gPSBzdWJPcC52YWx1ZTtcblx0XHRcdFx0XHRpZiAoc3ViT3AudHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSBlbHNlIHsgLyogJ2FwcGVuZCcgb3IgJ2luc2VydCcgKi9cblx0XHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRbXS5wdXNoLmFwcGx5KGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsIGQyLnZhbHVlKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ3JlbW92ZScsIChkMSwgcCkgPT4geyBkMS5vcGVyYXRpb25zW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgZDIuYWxpYXMpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXG5cblx0XHQvLyB0aGUgJ3ByZXBlbmQnLCAnaW5zZXJ0JyBhbmQgJ2FwcGVuZCcgb3BlcmF0aW9uIHR5cGUgYWxpYXNlc1xuXHRcdFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ10uZm9yRWFjaCgob3BUeXBlKSA9PiB7XG5cdFx0XHR0aGlzLl9hZGRPcGVyYXRpb25BbGlhcyh7XG5cdFx0XHRcdG5hbWU6IG9wVHlwZSxcblx0XHRcdFx0dGFyZ2V0OiAnYWx0ZXInLFxuXHRcdFx0XHR0cmFuc2Zvcm06IChhcmdzKSA9PiBbW3sgdHlwZTogb3BUeXBlLCB2YWx1ZTogYXJnc1swXSB9XSwgb3BUeXBlXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdC8vICdhZnRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZnRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWZ0ZXIodmFsdWUpIHtcblx0XHRcdFx0VS5hc3NlcnQodHlwZW9mIHJlc29sdmVQcm9taXNlID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0XHRcdFx0YEJlZm9yZSBjcmVhdGluZyBhbiAnYWZ0ZXInIG9wZXJhdGlvbiwgeW91IG11c3QgcmVnaXN0ZXIgYSBwcm9taXNlIHJlc29sdmVyIHdpdGggZGVsdGEuanMuYCk7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgJ2FmdGVyJyk7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZVByb21pc2UocGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCAnYWZ0ZXInKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnaW5zZXJ0JywgJ2FmdGVyJywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAnaW5zZXJ0JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdC8qIFRPRE86IHRoZSBhYm92ZSBjb21wb3NpdGlvbnMgb2YgJ2luc2VydCcgYW5kICdhZnRlcicgYXJlIG5vdCBhY3R1YWxseSBjb3JyZWN0IChlLmcuLCBub3QgYXNzb2NpYXRpdmUpLiAqL1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdHZhciBfZ3JhcGggPSBuZXcgSnNHcmFwaCgpOyAvKiBkZWx0YXMgaW4gYSBzdHJpY3QgcGFydGlhbCBvcmRlciAqL1xuXHRcdFUuZXh0ZW5kKHRoaXMsIHtcblx0XHRcdC8vIGdldCB0aGUgZ3JhcGggb2YgZGVsdGFzXG5cdFx0XHRncmFwaCgpIHsgcmV0dXJuIF9ncmFwaCB9XG5cdFx0fSk7XG5cblx0XHR2YXIgX2RlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBhcnJheXMgb2YgYXJyYXlzOiBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybXMgKi9cblx0XHR2YXIgX3NldHRsZWREZWx0YUNvbmRpdGlvbnMgPSB7fTsgLyogQm9vbGVhbnMgKi9cblx0XHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdGZ1bmN0aW9uIF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgZGlzanVuY3QpIHtcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0XHR9IGVsc2UgaWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRVLmFycmF5KF9kZWx0YUNvbmRpdGlvbnMsIGRlbHRhTmFtZSkucHVzaChkaXNqdW5jdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0XHRpZiAoX2NvbmRpdGlvbnNVbnNldHRsZWQpIHtcblx0XHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0XHRcdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdFx0X2dyYXBoLmVhY2hWZXJ0ZXgoKGRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0pIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkpIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRcdGlmIChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0uc29tZSgoZGlzanVuY3QpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpc2p1bmN0LmV2ZXJ5KChjb25qdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2Nvbmp1bmN0XSkpKSB7XG5cdFx0XHRcdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvLyBhIGNsYXNzIG9mIGEgc3RhbmRhcmQgbmFtZWQgZGVsdGEgd2l0aCBtZXRhLWRhdGEgdGhhdCBpcyByZWdpc3RlcmVkIGludG8gdGhlIGRlbHRhIG1vZGVsXG5cdFx0dGhpcy5EZWx0YSA9IFUubmV3U3ViY2xhc3MoX29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLCBmdW5jdGlvbiBEZWx0YShzdXBlckZuLCBkZWx0YU5hbWUsIG9wdGlvbnMgPSB7fSkge1xuXHRcdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3Igb2YgdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0VS5hc3NlcnQob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRgQSBkZWx0YSBzaG91bGQgYmUgZ2l2ZW4gYXMgYW4gb2JqZWN0LmApO1xuXHRcdFx0Ly8gVE9ETzogY2hlY2sgdW5pcXVlbmVzcyBvZiBgZGVsdGFOYW1lYFxuXG5cdFx0XHQvLy8vIG1ha2UgdGhpcyBkZWx0YSBhIE1vZGlmeURlbHRhLCBzbyBydW4gaXRzIGNvbnN0cnVjdG9yXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMsIG9wdGlvbnMpO1xuXHRcdFx0Ly9fb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIGNyZWF0ZSBkZWx0YSBwcm9wZXJ0aWVzXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRcdG5hbWU6IHsgZ2V0KCkgeyByZXR1cm4gZGVsdGFOYW1lIH0gfSxcblx0XHRcdFx0bWFudWFsbHlTZWxlY3RhYmxlOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ21hbnVhbGx5U2VsZWN0YWJsZSddKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gISFvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkgJiYgb3B0aW9uc1sncmVzb2x2ZXMnXS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2VsZWN0ZWQ6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0XHRcdFx0cmV0dXJuICEhX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ2lmJ10gPT09IHRydWUgfHwgb3B0aW9uc1snaWYnXSA9PT0gZmFsc2UpIHsgLyogbGl0ZXJhbCAndHJ1ZScgb3IgJ2ZhbHNlJyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uc1snaWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snaWYnXSB8fCBvcHRpb25zWydpZmYnXSB8fCBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWZmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvKiBkZWZhdWx0OiBmYWxzZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbmx5SWY6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9uc1snb25seUlmJ10gPT09IHRydWUgfHwgb3B0aW9uc1snb25seUlmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ29ubHlJZiddO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zWydvbmx5SWYnXSB8fCBvcHRpb25zWydpZmYnXSB8fCBvcHRpb25zWydleHBlY3RzJ10gfHwgIG9wdGlvbnNbJ3Jlc29sdmVzJ10pIHsgLyogYXJyYXkgb2YgbmFtZXMgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ29ubHlJZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWZmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydleHBlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvKiBkZWZhdWx0OiB0cnVlICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0YWZ0ZXI6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdHM6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3NlbGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHVwZGF0ZSBjb25kaXRpb25zXG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5pZikpIHsgX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0aGlzLmlmKSB9XG5cdFx0XHR0aGlzLnNlbGVjdHMuZm9yRWFjaCgob3RoZXJEZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3Qob3RoZXJEZWx0YU5hbWUsIFtkZWx0YU5hbWVdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgdGhlIGdyYXBoXG5cdFx0XHRfZ3JhcGguYWRkVmVydGV4KGRlbHRhTmFtZSwgdGhpcyk7XG5cdFx0XHR0aGlzLmFmdGVyLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdF9ncmFwaC5jcmVhdGVFZGdlKG90aGVyRGVsdGFOYW1lLCBkZWx0YU5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0XHRVLmFzc2VydCghX2dyYXBoLmhhc0N5Y2xlKCksXG5cdFx0XHRcdFx0YFRoZSBkZWx0YSAke2RlbHRhTmFtZX0gaW50cm9kdWNlZCBhIGN5Y2xlIGluIHRoZSBhcHBsaWNhdGlvbiBvcmRlci5gKTtcblxuXHRcdH0pO1xuXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBzZWxlY3QgYSBudW1iZXIgb2YgZGVsdGFzIGJ5IG5hbWUsIHNvIHRoZXkgd2lsbCBiZSBhcHBsaWVkIHdoZW4gYXBwbGljYWJsZVxuXHRcdFx0c2VsZWN0KC4uLmRlbHRhTmFtZXMpIHtcblx0XHRcdFx0ZGVsdGFOYW1lcy5mb3JFYWNoKChkZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0XHRfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIHJlZ2lzdGVyIGEgbmFtZWQgdmFyaWF0aW9uIHBvaW50IGluIHRoZSBjb2RlLWJhc2Vcblx0XHRcdC8vIChpLmUuLCBhcHBseSBhbGwgcmVnaXN0ZXJlZCBkZWx0YXMgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIHZhbHVlKVxuXHRcdFx0dnAodnBOYW1lLCB2YWwpIHtcblxuXHRcdFx0XHQvLyBhIHRlbXBvcmFyeSBvYmplY3QgdG8gaG9sZCB0aGUgdmFsdWUgd2hpbGUgaXQgaXMgdW5kZXJnb2luZyBjaGFuZ2Vcblx0XHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0XHRvYmpbdnBOYW1lXSA9IHZhbDtcblxuXHRcdFx0XHQvLyBjaGVjayBpZiBhbnkgJ29ubHlJZicgY29uZGl0aW9ucyBhcmUgYmVpbmcgdmlvbGF0ZWRcblx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0X2dyYXBoLmVhY2hWZXJ0ZXgoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0VS5hc3NlcnQoIWRlbHRhLnNlbGVjdGVkIHx8IGRlbHRhLm9ubHlJZiA9PT0gdHJ1ZSB8fCBkZWx0YS5vbmx5SWYuZXZlcnkoKGQpID0+IF9ncmFwaC52ZXJ0ZXhWYWx1ZShkKS5zZWxlY3RlZCksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ29ubHlJZicgY29uZGl0aW9uIG9mIGRlbHRhICcke2RlbHRhLm5hbWV9JyB3YXMgdmlvbGF0ZWQuYCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGFwcGx5IHRoZSBwcm9wZXIgZGVsdGFzXG5cdFx0XHRcdF9ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGlmIChkZWx0YS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0ZGVsdGEuc2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgdnBOYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHJldHVybiB0aGUgdHJhbnNmb3JtZWQgdmFsdWVcblx0XHRcdFx0cmV0dXJuIG9ialt2cE5hbWVdO1xuXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0dmFyIHJlc29sdmVQcm9taXNlID0gbnVsbDtcblx0VS5leHRlbmQoRGVsdGFNb2RlbCwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogcmV0dXJuIHRoZSBtYWluIGRlbHRhIG1vZGVsIGNsYXNzICovXG5cdHJldHVybiBEZWx0YU1vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=