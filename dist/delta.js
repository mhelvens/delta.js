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
	            err.op1 = this.type;
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
	    this.Delta = U.newSubclass(_opTypes['modify'].Delta, function Delta(superFn, deltaName, options) {
	      superFn.call(this, options);
	      U.assert(options instanceof Object, "A delta should be given as an object.");
	      _opTypes['modify'].Delta.apply(this, options);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMTA1ZTczNzhlMGMyOThkMjUzYiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVksd0JBQVcsQ0FBRywwQ0FBVSxPQUFNLENBQUc7QUFDcEQsY0FBVyxDQUFDO0FBT1IsZUFBUSxJQUFJLFNBQUMsQ0FBSyxHQUFDLEVBQUM7QUFDcEIsZ0JBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxHQUFDO0dBQUUsRUFBQztBQUNyRCw2QkFBc0IsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsUUFBUyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUM7R0FBRSxFQUFDO0FBRXRGLFVBQVMsZUFBYSxDQUFFLEdBQUUsQ0FBRyxPQUFLLENBQUc7QUFDcEMsWUFBUSxDQUFDLE1BQU8sSUFBRSxJQUFNLFdBQVMsR0FDL0IsaUJBQWlCLEVBQUMsT0FBSyxFQUFDLHNEQUFvRCxFQUFDLENBQUM7R0FDakY7QUFFQSxVQUFTLGNBQVksQ0FBRSxHQUFFLENBQUcsT0FBSyxDQUFHO0FBQ25DLFlBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRSxDQUFDLEdBQ3RCLGlCQUFpQixFQUFDLE9BQUssRUFBQyx3Q0FBc0MsRUFBQyxDQUFDO0dBQ25FO0FBRUEsVUFBUyxnQkFBYyxDQUFFLEdBQUUsQ0FBRyxPQUFLLENBQUc7QUFDckMsWUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFFLENBQUMsR0FDeEIsaUJBQWlCLEVBQUMsT0FBSyxFQUFDLDBDQUF3QyxFQUFDLENBQUM7R0FDckU7QUFRSSxnQkFBUyxFQUFJLFdBQVUsQ0FBQyxTQUFVOztBQUdqQyxnQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUNiLG1CQUFVLEVBQUksR0FBQyxDQUFDO0FBRXBCLFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFHZCx1QkFBZ0IsQ0FBaEIsVUFBa0IsSUFBOEM7O0FBQTdDLGdCQUFHO0FBQUcsdUJBQVU7QUFBRyxtQkFBTTtBQUFHLHFCQUFRO0FBQUcsa0JBQUs7QUFHMUQsNEJBQWUsRUFBSSxHQUFDLENBQUM7QUFHekIsZ0JBQU8sQ0FBRSxJQUFHLENBQUMsRUFBSTtBQUNoQixjQUFHLENBQUcsS0FBRztBQUNULGVBQUksQ0FBRyxZQUFVO0FBQ2pCLGdCQUFLLENBQUcsaUJBQWUsQ0FBRSxJQUFHLENBQUM7QUFBQSxTQUM5QixDQUFDO0FBR0QsZ0JBQVEsQ0FBQyxRQUFPLENBQUUsSUFBRyxDQUFDLE1BQU0sVUFBVSxDQUFHLFVBQVEsQ0FBRztBQUNuRCxxQkFBVSxDQUFHLFlBQVU7QUFDdkIsY0FBRyxDQUFHLEtBQUc7QUFDVCxpQkFBTSxDQUFHLFFBQU07QUFBQSxTQUNoQixDQUFDLENBQUM7QUFJRixnQkFBTyxDQUFFLFFBQU8sQ0FBQyxNQUFNLFVBQVUsQ0FBRSxJQUFHLENBQUMsRUFDckMsWUFBVyxDQUFDLE1BQUssQ0FBQyxFQUFJLE9BQUssRUFDekIsVUFBVSxRQUFrQixDQUFHO0FDaEUzQixlQUFTLFlBQW9CLEdBQUM7QUFBRyxzQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsbUJBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxjRCtEekYsY0FBZSxDQUFDLFFBQU8sQ0FBRSxJQUFHLENBQUMsQ0FBRyxTQUFPLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDcEQsZ0JBQU8sS0FBRyxDQUFDO1NBQ1osQ0FBQztPQUVOO0FBR0Esd0JBQWlCLENBQWpCLFVBQW1CLElBQXdCOztBQUF2QixnQkFBRztBQUFHLGtCQUFLO0FBQUcscUJBQVE7QUFHckMsNEJBQWUsRUFBSSxHQUFDLENBQUM7QUFDekIsY0FBSyxlQUFnQixDQUFDLGdCQUFlLENBQUcsS0FBRyxDQUFHLEVBQzdDLEtBQUksQ0FBSixVQUFNLFFBQWtCLENBQUc7QUM3RXBCLGlCQUFTLFlBQW9CLEdBQUM7QUFBRyx3QkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QscUJBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxnQkQ0RTVGLGNBQWUsQ0FBQyxRQUFPLENBQUUsTUFBSyxDQUFDLENBQUcsU0FBTyxDQUFHLFVBQVMsQ0FBQyxNQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLGtCQUFPLEtBQUcsQ0FBQztXQUNaLENBQ0QsQ0FBQyxDQUFDO0FBR0YsZ0JBQU8sQ0FBRSxJQUFHLENBQUMsRUFBSTtBQUNoQixjQUFHLENBQUcsS0FBRztBQUNULGdCQUFLLENBQUcsaUJBQWUsQ0FBRSxJQUFHLENBQUM7QUFBQSxTQUM5QixDQUFDO0FBR0QsZ0JBQU8sQ0FBRSxRQUFPLENBQUMsTUFBTSxVQUFVLENBQUUsSUFBRyxDQUFDLEVBQUksU0FBTyxDQUFFLElBQUcsQ0FBQyxPQUFPLENBQUM7T0FFakU7QUFHQSx5QkFBa0IsQ0FBbEIsVUFBb0IsT0FBTSxDQUFHLFFBQU0sQ0FBRyxVQUFRLENBQUc7QUFDaEQsbUJBQVUsS0FBTSxDQUFDO0FBQUUsaUJBQU0sQ0FBTixRQUFNO0FBQUcsaUJBQU0sQ0FBTixRQUFNO0FBQUcsbUJBQVEsQ0FBUixVQUFRO0FBQUEsU0FBRSxDQUFDLENBQUM7T0FDbEQ7QUFHQSxlQUFRLENBQVIsVUFBVSxJQUFjLENBQUc7QUNwR2xCLGFBQVMsWUFBb0IsR0FBQztBQUFHLG9CQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxpQkFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLGNEbUcxRixtQkFBa0IsQ0FBQyxRQUFPLENBQUUsSUFBRyxDQUFDLE1BQU0sQ0FBRyxPQUFLLENBQUMsQ0FBQztPQUN4RDtBQUFBLEtBQ0QsQ0FBQyxDQUFDO0FBR0UsY0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNqQixRQUFHLGtCQUFtQixDQUFDO0FBQ3RCLFVBQUcsQ0FBRyxTQUFPO0FBQ2IsaUJBQVUsQ0FBRyxTQUFTLE9BQUssQ0FBRSxnQkFBZSxDQUFHLFdBQVM7O0FBRXZELHdCQUFlLEVBQUksaUJBQWUsR0FBSyxHQUFDLENBQUM7QUFDekMsWUFBRyxXQUFXLEVBQUksV0FBUyxHQUFLLEdBQUMsQ0FBQztBQUdsQyxjQUFLLEtBQU0sQ0FBQyxnQkFBZSxDQUFDLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUMxQyxtQkFBSSxFQUFJLElBQUUsTUFBTyxDQUFDLHFCQUFvQixDQUFDLENBQUM7QUFDNUMsY0FBSSxLQUFJLENBQUc7QUFDTix5QkFBUSxFQUFJLE1BQUksQ0FBRSxFQUFDLENBQUM7QUFDcEIsd0JBQU8sRUFBSSxNQUFJLENBQUUsRUFBQyxDQUFDO0FBQ3ZCLG9CQUFRLENBQUMsU0FBUSxHQUFLLFNBQU8sR0FDM0Isb0JBQW9CLEVBQUMsVUFBUSxFQUFDLGVBQWEsRUFBQyxDQUFDO0FBQy9DLGlCQUFLLFNBQVEsQ0FBRSxDQUFDLFFBQU8sQ0FBRyxpQkFBZSxDQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7V0FDakQ7QUFBQSxTQUNELEVBQUMsQ0FBQztPQUNIO0FBQ0EsYUFBTSxDQUFOLFVBQVEsR0FBRSxDQUFHLFNBQU87O0FBQ25CLFlBQUksV0FBVyxDQUFDLFFBQU8sQ0FBQyxDQUFHO0FBRTFCLGtCQUFRLENBQUMsV0FBVyxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBQyxDQUNoQyxxRUFBbUUsQ0FBQyxDQUFDO0FBQ3ZFLGdCQUFLLEtBQU0sQ0FBQyxJQUFHLFdBQVcsQ0FBQyxRQUFTLEVBQUMsU0FBQyxXQUFVLENBQU07QUFDckQsMkJBQWMsQ0FBRSxXQUFVLENBQUMsUUFBUyxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxZQUFVLENBQUMsQ0FBQztXQUNqRSxFQUFDLENBQUM7U0FDSCxLQUFPO0FBRU4sa0JBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRSxDQUFDLENBQ3RCLHFFQUFtRSxDQUFDLENBQUM7QUFDdkUsZ0JBQUssS0FBTSxDQUFDLElBQUcsV0FBVyxDQUFDLFFBQVMsRUFBQyxTQUFDLFdBQVUsQ0FBTTtBQUNyRCwyQkFBYyxDQUFFLFdBQVUsQ0FBQyxRQUFTLENBQUMsR0FBRSxDQUFHLFlBQVUsQ0FBQyxDQUFDO1dBQ3ZELEVBQUMsQ0FBQztTQUNIO0FBQUEsT0FDRDtBQUNBLGVBQVEsQ0FBRztBQUNWLDBCQUFpQixDQUFqQixVQUFtQixHQUFFLENBQUcsWUFBVSxDQUFHO0FBRXBDLGtCQUFRLENBQUMsV0FBVyxDQUFDLEdBQUUsQ0FBQyxDQUN0QixxRUFBbUUsQ0FBQyxDQUFDO0FBQ3ZFLGNBQUksV0FBVyxDQUFDLElBQUcsV0FBVyxDQUFFLFdBQVUsQ0FBQyxDQUFDLENBQUc7QUFDOUMsZ0JBQUcsV0FBVyxDQUFFLFdBQVUsQ0FBQyxRQUFTLENBQUMsR0FBRSxDQUFHLFlBQVUsQ0FBQyxDQUFDO1dBQ3ZEO0FBQUEsU0FDRDtBQUNBLGVBQU0sQ0FBTixVQUFRLFFBQU8sQ0FBRyxJQUFFOztBQUNuQixjQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUFFLGtCQUFPLEtBQUc7V0FBRTtBQUNsQyw0QkFBYSxDQUFDO0FBQ2xCLHFCQUFVLEtBQU0sRUFBQyxTQUFDLElBQTRCOztBQUEzQix1QkFBTTtBQUFHLHVCQUFNO0FBQUcseUJBQVE7QUFDNUMsZ0JBQUksZUFBYyxDQUFFLFFBQU8sQ0FBQyxLQUFLLElBQU0sUUFBTSxHQUFLLElBQUUsS0FBSyxJQUFNLFFBQU0sQ0FBRztBQUN2RSw0QkFBYSxFQUFJLFVBQVEsQ0FBQztBQUMxQixvQkFBTyxLQUFHLENBQUM7YUFDWjtBQUFBLFdBQ0QsRUFBQyxDQUFDO0FBQ0YsY0FBSSxjQUFhLENBQUc7QUFDbkIsMEJBQWMsQ0FBQyxJQUFHLENBQUcsU0FBTyxDQUFHLElBQUUsQ0FBQyxDQUFDO1dBQ3BDLEtBQU87QUFDRixtQkFBRSxFQUFJLElBQUksTUFBSyxDQUNqQix3QkFBdUIsRUFBQyxLQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsS0FBSyxFQUFDLGVBQWEsS0FDbkUsVUFBVSxFQUFDLElBQUUsS0FBSyxFQUFDLG9DQUFrQyxFQUN2RCxDQUFDO0FBQ0QsZUFBRSxJQUFJLEVBQUksS0FBRyxLQUFLLENBQUM7QUFDbkIsZUFBRSxJQUFJLEVBQUksSUFBRSxLQUFLLENBQUM7QUFDbEIsaUJBQU0sSUFBRSxDQUFDO1dBQ1Y7QUFBQSxTQUNEO0FBQ0EscUJBQVksQ0FBWixVQUFjLE1BQUssQ0FBRyxTQUFPLENBQUcsT0FBSyxDQUFHO0FBQ25DLHNCQUFPLEVBQUksU0FBTyxRQUFTLENBQUMsR0FBRSxDQUFDLENBQUM7QUFDcEMsY0FBSSxRQUFPLElBQU0sRUFBQyxFQUFHO0FBRWhCLDhCQUFhLEVBQUksU0FBTyxNQUFPLENBQUMsRUFBRyxTQUFPLENBQUMsQ0FBQztBQUM1Qyw4QkFBYSxFQUFJLFNBQU8sTUFBTyxDQUFDLFFBQU8sRUFBSSxHQUFDLENBQUM7QUFDN0MsOEJBQWEsRUFBSSxLQUFHLGNBQWUsQ0FBQyxRQUFPLENBQUUsUUFBTyxDQUFDLENBQUcsZUFBYSxDQUFDLENBQUM7QUFDM0Usa0JBQU8sZUFBYSxDQUFFLE1BQUssS0FBSyxDQUFDLE1BQU8sQ0FBQyxjQUFhLENBQUcsRUFBQyxjQUFhLENBQUMsT0FBUSxDQUFDLE1BQUssQ0FBQyxDQUFDLENBQUM7V0FDMUYsS0FBTztBQUVGLHlCQUFRLEVBQUksT0FBSyxVQUFVLE1BQU8sQ0FBQyxNQUFLLENBQUcsRUFBQyxNQUFLLEtBQUssQ0FBQyxPQUFRLENBQUMsTUFBSyxDQUFDLENBQUMsQ0FBQztBQUM1RSxnQkFBSSxJQUFHLFdBQVcsZUFBZ0IsQ0FBQyxRQUFPLENBQUMsR0FBSyxZQUFXLENBQUMsSUFBRyxXQUFXLENBQUUsUUFBTyxDQUFDLENBQUMsQ0FBRztBQUN2RixrQkFBRyxRQUFTLENBQUMsUUFBTyxDQUFHLFVBQVEsQ0FBQyxDQUFDO2FBQ2xDLEtBQU87QUFDTixrQkFBRyxXQUFXLENBQUUsUUFBTyxDQUFDLEVBQUksVUFBUSxDQUFDO2FBQ3RDO0FBQ0Esa0JBQU8sS0FBRyxXQUFXLENBQUUsUUFBTyxDQUFDLENBQUM7V0FDakM7QUFBQSxTQUNEO0FBQUEsT0FDRDtBQUNBLFlBQUssQ0FBTCxVQUFPLFFBQU8sQ0FBRyxpQkFBZSxDQUFHO0FBQ2xDLGNBQU8sS0FBRyxjQUFlLENBQUMsUUFBTyxDQUFFLFFBQU8sQ0FBQyxDQUFHLFNBQU8sQ0FBRyxFQUFDLGdCQUFlLENBQUMsQ0FBQyxDQUFDO09BQzVFO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFNRixRQUFHLGtCQUFtQixDQUFDO0FBQ3RCLFVBQUcsQ0FBRyxNQUFJO0FBQ1YsaUJBQVUsQ0FBRyxTQUFTLElBQUUsQ0FBRSxLQUFJLENBQUc7QUFBRSxZQUFHLE1BQU0sRUFBSSxNQUFJO09BQUU7QUFDdEQsYUFBTSxDQUFOLFVBQVEsR0FBRSxDQUFHLFNBQU8sQ0FBRztBQUN0Qix1QkFBZSxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQUNyQyxXQUFFLENBQUUsUUFBTyxDQUFDLEVBQUksS0FBRyxNQUFNLENBQUM7T0FDM0I7QUFBQSxLQUNELENBQUMsQ0FBQztBQUNGLFFBQUcsa0JBQW1CLENBQUM7QUFDdEIsVUFBRyxDQUFHLFVBQVE7QUFDZCxpQkFBVSxDQUFHLFNBQVMsUUFBTSxDQUFFLEtBQUksQ0FBRztBQUFFLFlBQUcsTUFBTSxFQUFJLE1BQUk7T0FBRTtBQUMxRCxhQUFNLENBQU4sVUFBUSxHQUFFLENBQUcsU0FBTyxDQUFHO0FBQ3RCLHFCQUFhLENBQUMsR0FBRSxDQUFFLFFBQU8sQ0FBQyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQ3ZDLFdBQUUsQ0FBRSxRQUFPLENBQUMsRUFBSSxLQUFHLE1BQU0sQ0FBQztPQUMzQjtBQUFBLEtBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxrQkFBbUIsQ0FBQztBQUN0QixVQUFHLENBQUcsU0FBTztBQUNiLGlCQUFVLENBQUcsU0FBUyxPQUFLLENBQUUsQ0FBRSxHQUFDO0FBQ2hDLGFBQU0sQ0FBTixVQUFRLEdBQUUsQ0FBRyxTQUFPLENBQUc7QUFDdEIscUJBQWEsQ0FBQyxHQUFFLENBQUUsUUFBTyxDQUFDLENBQUcsU0FBTyxDQUFDLENBQUM7QUFDdEMsY0FBTyxJQUFFLENBQUUsUUFBTyxDQUFDLENBQUM7T0FDckI7QUFBQSxLQUNELENBQUMsQ0FBQztBQUNGLFFBQUcsa0JBQW1CLENBQUM7QUFDdEIsVUFBRyxDQUFHLFNBQU87QUFDYixpQkFBVSxDQUFHLFNBQVMsT0FBSyxDQUFFLENBQUUsR0FBQztBQUNoQyxhQUFNLENBQU4sVUFBUSxHQUFFLENBQUcsU0FBTyxDQUFHO0FBQUUsdUJBQWUsQ0FBQyxHQUFFLENBQUUsUUFBTyxDQUFDLENBQUcsU0FBTyxDQUFDO09BQUU7QUFBQSxLQUNuRSxDQUFDLENBQUM7QUFJRixRQUFHLG9CQUFxQixDQUFDLEtBQUksQ0FBRyxVQUFRLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFBRSxRQUFDLFdBQVcsQ0FBRSxFQUFDLEVBQUksV0FBUyxVQUFXLENBQUMsS0FBSSxDQUFHLEdBQUMsTUFBTSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQ3ZILFFBQUcsb0JBQXFCLENBQUMsS0FBSSxDQUFHLFNBQU8sQ0FBRyx3QkFBc0IsQ0FBQyxDQUFDO0FBQ2xFLFFBQUcsb0JBQXFCLENBQUMsS0FBSSxDQUFHLFNBQU8sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFNO0FBQUUsUUFBQyxXQUFXLENBQUUsRUFBQyxFQUFJLFdBQVMsVUFBVyxDQUFDLFFBQU8sQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUMzRyxRQUFHLG9CQUFxQixDQUFDLFNBQVEsQ0FBRyxVQUFRLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDMUQsUUFBRyxvQkFBcUIsQ0FBQyxTQUFRLENBQUcsU0FBTyxDQUFHLHdCQUFzQixDQUFDLENBQUM7QUFDdEUsUUFBRyxvQkFBcUIsQ0FBQyxTQUFRLENBQUcsU0FBTyxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3pELFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFVBQVEsQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUN6RCxRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxTQUFPLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDO0FBQ3JELFlBQUssS0FBTSxDQUFDLEVBQUMsV0FBVyxDQUFDLFFBQVMsRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUM1QyxVQUFDLFFBQVMsQ0FBQyxJQUFHLENBQUcsR0FBQyxXQUFXLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQztPQUN0QyxFQUFDLENBQUM7S0FDSCxFQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxTQUFPLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDeEQsUUFBRyxvQkFBcUIsQ0FBQyxRQUFPLENBQUcsTUFBSSxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQUUsUUFBQyxXQUFXLENBQUUsRUFBQyxFQUFJLFdBQVMsVUFBVyxDQUFDLFNBQVEsQ0FBRyxHQUFDLE1BQU0sQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUMxSCxRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxTQUFPLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDdkQsUUFBRyxvQkFBcUIsQ0FBQyxRQUFPLENBQUcsTUFBSSxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3JELFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUl2RCxRQUFHLGtCQUFtQixDQUFDO0FBQ3RCLFVBQUcsQ0FBRyxRQUFNO0FBQ1osaUJBQVUsQ0FBRyxTQUFTLE1BQUksQ0FBRSxLQUFJLENBQUcsTUFBSSxDQUFHO0FBQ3pDLFlBQUcsTUFBTSxFQUFJLE1BQUksR0FBSyxHQUFDLENBQUM7QUFDeEIsWUFBRyxNQUFNLEVBQUksTUFBSSxHQUFLLFFBQU0sQ0FBQztPQUM5QjtBQUNBLGFBQU0sQ0FBTixVQUFRLEdBQUUsQ0FBRyxTQUFPO0FBQ25CLHNCQUFjLENBQUMsR0FBRSxDQUFFLFFBQU8sQ0FBQyxDQUFHLEtBQUcsTUFBTSxDQUFDLENBQUM7QUFDekMsWUFBRyxNQUFNLFFBQVMsRUFBQyxTQUFDLEtBQUk7QUFDbkIscUJBQU0sRUFBSSxJQUFFLENBQUUsUUFBTyxDQUFDLENBQUM7QUFDdkIscUJBQU0sRUFBSSxNQUFJLE1BQU0sQ0FBQztBQUN6QixjQUFJLEtBQUksS0FBSyxJQUFNLFVBQVEsQ0FBRztBQUM3QixlQUFFLENBQUUsUUFBTyxDQUFDLEVBQUksVUFBZ0IsQ0FBRztBRTFRN0IsbUJBQVMsVUFBb0IsR0FBQztBQUFHLHdCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCwwQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxxQkZ5UXBFLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDekIscUJBQU0sTUFBTyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQzthQUMxQixDQUFDO1dBQ0YsS0FBTztBQUNOLGVBQUUsQ0FBRSxRQUFPLENBQUMsRUFBSSxVQUFnQixDQUFHO0FFL1E3QixtQkFBUyxVQUFvQixHQUFDO0FBQUcsd0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELDBCQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLHFCRjhRcEUsTUFBTyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUN6QixxQkFBTSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO2FBQzFCLENBQUM7V0FDRjtBQUFBLFNBQ0QsRUFBQyxDQUFDO09BQ0g7S0FDRCxDQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLE9BQU0sQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDekQsUUFBQyxLQUFLLE1BQU8sQ0FBQyxFQUFDLFdBQVcsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hELEVBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsT0FBTSxDQUFHLFVBQVEsQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUN4RCxRQUFHLG9CQUFxQixDQUFDLE9BQU0sQ0FBRyxTQUFPLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBTTtBQUFFLFFBQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxXQUFTLFVBQVcsQ0FBQyxRQUFPLENBQUM7S0FBRSxFQUFDLENBQUM7QUFDN0csUUFBRyxvQkFBcUIsQ0FBQyxLQUFJLENBQUcsUUFBTSxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQ3ZELG9CQUFjLENBQUMsRUFBQyxXQUFXLENBQUUsRUFBQyxNQUFNLENBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCw2QkFBdUIsQ0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQUMsQ0FBQztLQUNuQyxFQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLFNBQVEsQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDM0Qsb0JBQWMsQ0FBQyxFQUFDLFdBQVcsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELDZCQUF1QixDQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO0tBQ25DLEVBQUMsQ0FBQztBQUlGLEtBQUMsU0FBUSxDQUFHLFNBQU8sQ0FBRyxTQUFPLENBQUMsUUFBUyxFQUFDLFNBQUMsTUFBSztBQUM3Qyw2QkFBdUIsQ0FBQztBQUN2QixZQUFHLENBQUcsT0FBSztBQUNYLGNBQUssQ0FBRyxRQUFNO0FBQ2QsaUJBQVEsR0FBRyxTQUFDLElBQUc7Z0JBQU0sRUFBQyxDQUFDO0FBQUUsZ0JBQUcsQ0FBRyxPQUFLO0FBQUcsaUJBQUksQ0FBRyxLQUFHLENBQUUsRUFBQztBQUFBLFdBQUUsQ0FBQyxDQUFHLE9BQUssQ0FBQztTQUFBO09BQ2pFLENBQUMsQ0FBQztLQUNILEVBQUMsQ0FBQztBQUlGLFFBQUcsa0JBQW1CLENBQUM7QUFDdEIsVUFBRyxDQUFHLFFBQU07QUFDWixpQkFBVSxDQUFHLFNBQVMsTUFBSSxDQUFFLEtBQUksQ0FBRztBQUNsQyxnQkFBUSxDQUFDLE1BQU8sZUFBYSxJQUFNLFdBQVMsQ0FDMUMsNEZBQTBGLENBQUMsQ0FBQztBQUM5RixZQUFHLE1BQU0sRUFBSSxNQUFJLENBQUM7T0FDbkI7QUFDQSxhQUFNLENBQU4sVUFBUSxHQUFFLENBQUcsU0FBTztBQUNuQixzQkFBYyxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUNsQyxtQkFBTSxFQUFJLElBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBQztBQUN2QixtQkFBTSxFQUFJLEtBQUcsTUFBTSxDQUFDO0FBQ3hCLFdBQUUsQ0FBRSxRQUFPLENBQUMsRUFBSSxVQUFnQixDQUFHO0FFNVQzQixlQUFTLFVBQW9CLEdBQUM7QUFBRyxvQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0Qsc0JBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FBQUEsZ0JGMlRyRSxlQUFjLENBQUMsT0FBTSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDLEtBQU0sQ0FBQyxTQUFVLENBQUU7QUFDakUsa0JBQU8sUUFBTSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO1dBQ2pDLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2QsQ0FBQztPQUNGO0tBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxvQkFBcUIsQ0FBQyxPQUFNLENBQUcsVUFBUSxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3hELFFBQUcsb0JBQXFCLENBQUMsT0FBTSxDQUFHLFNBQU8sQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUN2RCxRQUFHLG9CQUFxQixDQUFDLEtBQUksQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDdkQsb0JBQWMsQ0FBQyxFQUFDLFdBQVcsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUMvQyw2QkFBdUIsQ0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQUMsQ0FBQztLQUNuQyxFQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLFNBQVEsQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDM0Qsb0JBQWMsQ0FBQyxFQUFDLFdBQVcsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxRQUFNLENBQUMsQ0FBQztBQUMvQyw2QkFBdUIsQ0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQUMsQ0FBQztLQUNuQyxFQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxRQUFNLENBQUcsd0JBQXNCLENBQUMsQ0FBQztBQUNwRSxRQUFHLG9CQUFxQixDQUFDLE9BQU0sQ0FBRyxTQUFPLENBQUcsd0JBQXNCLENBQUMsQ0FBQztBQU9oRSxjQUFLLEVBQUksSUFBSSxRQUFPLEVBQUMsQ0FBQztBQUMxQixZQUFRLENBQUMsSUFBRyxDQUFHLEVBRWQsS0FBSSxDQUFKLFVBQU0sQ0FBRTtBQUFFLGNBQU8sT0FBSztPQUFFLENBQ3pCLENBQUMsQ0FBQztBQUVFLHdCQUFlLEVBQUksR0FBQyxDQUFDO0FBQ3JCLCtCQUFzQixFQUFJLEdBQUMsQ0FBQztBQUM1Qiw0QkFBbUIsRUFBSSxNQUFJLENBQUM7QUFFaEMsWUFBUyxrQkFBZ0IsQ0FBRSxTQUFRLENBQUcsU0FBTyxDQUFHO0FBQy9DLDBCQUFtQixFQUFJLEtBQUcsQ0FBQztBQUMzQixVQUFJLFFBQU8sSUFBTSxLQUFHLENBQUc7QUFDdEIsK0JBQXNCLENBQUUsU0FBUSxDQUFDLEVBQUksS0FBRyxDQUFDO09BQzFDLEtBQU8sS0FBSSxRQUFPLElBQU0sTUFBSSxDQUFHLEdBRS9CLEtBQU8sS0FBSSxnQkFBZSxDQUFFLFNBQVEsQ0FBQyxJQUFNLEtBQUcsQ0FBRztBQUNoRCxlQUFPLENBQUMsZ0JBQWUsQ0FBRyxVQUFRLENBQUMsS0FBTSxDQUFDLFFBQU8sQ0FBQyxDQUFDO09BQ3BEO0FBQUEsS0FDRDtBQUVBLFlBQVMsa0JBQWdCLENBQUU7QUFDMUIsVUFBSSxvQkFBbUIsQ0FBRztBQUN6Qiw0QkFBbUIsRUFBSSxNQUFJLENBQUM7QUFDeEIsNEJBQWUsQ0FBQztBQUNwQixVQUFHO0FBQ0YsMEJBQWUsRUFBSSxNQUFJLENBQUM7QUFDeEIsZ0JBQUssV0FBWSxFQUFDLFNBQUMsU0FBUTtBQUMxQixnQkFBSSx1QkFBc0IsQ0FBRSxTQUFRLENBQUMsQ0FBRztBQUFFLHFCQUFLO2FBQUU7QUFDakQsZ0JBQUksYUFBYSxDQUFDLGdCQUFlLENBQUUsU0FBUSxDQUFDLENBQUMsQ0FBRztBQUFFLHFCQUFLO2FBQUU7QUFDekQsZ0JBQUksZ0JBQWUsQ0FBRSxTQUFRLENBQUMsS0FBTSxFQUFDLFNBQUMsUUFBTztvQkFDekMsU0FBTyxNQUFPLEVBQUMsU0FBQyxRQUFPO3NCQUNyQix3QkFBc0IsQ0FBRSxRQUFPLENBQUM7ZUFBQSxFQUFDO2FBQUEsRUFBQyxDQUFHO0FBQzFDLHFDQUFzQixDQUFFLFNBQVEsQ0FBQyxFQUFJLEtBQUcsQ0FBQztBQUN6Qyw4QkFBZSxFQUFJLEtBQUcsQ0FBQzthQUN4QjtBQUFBLFdBQ0QsRUFBQyxDQUFDO1NBQ0gsUUFBUyxnQkFBZSxFQUFFO09BQzNCO0FBQUEsS0FDRDtBQUlBLFFBQUcsTUFBTSxFQUFJLGNBQWEsQ0FBQyxRQUFPLENBQUUsUUFBTyxDQUFDLE1BQU0sQ0FBRyxTQUFTLE1BQUksQ0FBRSxPQUFNLENBQUcsVUFBUSxDQUFHLFFBQU07QUFFN0YsYUFBTSxLQUFNLENBQUMsSUFBRyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBRzNCLGNBQVEsQ0FBQyxPQUFNLFdBQWEsT0FBSyxDQUMvQix3Q0FBc0MsQ0FBQyxDQUFDO0FBSTFDLGNBQU8sQ0FBRSxRQUFPLENBQUMsTUFBTSxNQUFPLENBQUMsSUFBRyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBRzdDLFlBQUssaUJBQWtCLENBQUMsSUFBRyxDQUFHO0FBQzdCLFlBQUcsQ0FBRyxFQUFFLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFBRSxrQkFBTyxVQUFRO1dBQUUsQ0FBRTtBQUNuQywwQkFBaUIsQ0FBRyxFQUNuQixHQUFFLENBQUYsVUFBSSxDQUFFO0FBQ0wsZ0JBQUksV0FBVyxDQUFDLE9BQU0sQ0FBRSxvQkFBbUIsQ0FBQyxDQUFDLENBQUc7QUFDL0Msb0JBQU8sRUFBQyxDQUFDLE9BQU0sQ0FBRSxvQkFBbUIsQ0FBQyxDQUFDO2FBQ3ZDLEtBQU8sS0FBSSxXQUFXLENBQUMsT0FBTSxDQUFFLFVBQVMsQ0FBQyxDQUFDLEdBQUssUUFBTSxDQUFFLFVBQVMsQ0FBQyxPQUFPLEVBQUksR0FBRztBQUM5RSxvQkFBTyxNQUFJLENBQUM7YUFDYixLQUFPO0FBQ04sb0JBQU8sS0FBRyxDQUFDO2FBQ1o7QUFBQSxXQUNELENBQ0Q7QUFDQSxnQkFBTyxDQUFHLEVBQ1QsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUNMLDZCQUFpQixFQUFDLENBQUM7QUFDbkIsa0JBQU8sRUFBQyxDQUFDLHVCQUFzQixDQUFFLFNBQVEsQ0FBQyxDQUFDO1dBQzVDLENBQ0Q7QUFDQSxVQUFDLENBQUcsRUFDSCxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQ0wsZ0JBQUksT0FBTSxDQUFFLElBQUcsQ0FBQyxJQUFNLEtBQUcsR0FBSyxRQUFNLENBQUUsSUFBRyxDQUFDLElBQU0sTUFBSSxDQUFHO0FBQ3RELG9CQUFPLFFBQU0sQ0FBRSxJQUFHLENBQUMsQ0FBQzthQUNyQixLQUFPLEtBQUksT0FBTSxDQUFFLElBQUcsQ0FBQyxHQUFLLFFBQU0sQ0FBRSxLQUFJLENBQUMsR0FBSyxRQUFNLENBQUUsVUFBUyxDQUFDLENBQUc7QUFDbEUsb0JBQU8sR0FBQyxPQUFRLENBQ2QsT0FBTSxDQUFFLElBQUcsQ0FBQyxHQUFLLEdBQUMsQ0FDbEIsUUFBTSxDQUFFLEtBQUksQ0FBQyxHQUFLLEdBQUMsQ0FDbkIsUUFBTSxDQUFFLFVBQVMsQ0FBQyxHQUFLLEdBQUMsQ0FDMUIsQ0FBQzthQUNGLEtBQU87QUFDTixvQkFBTyxNQUFJLENBQUM7YUFDYjtBQUFBLFdBQ0QsQ0FDRDtBQUNBLGNBQUssQ0FBRyxFQUNQLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFDTCxnQkFBSSxPQUFNLENBQUUsUUFBTyxDQUFDLElBQU0sS0FBRyxHQUFLLFFBQU0sQ0FBRSxRQUFPLENBQUMsSUFBTSxNQUFJLENBQUc7QUFDOUQsb0JBQU8sUUFBTSxDQUFFLFFBQU8sQ0FBQyxDQUFDO2FBQ3pCLEtBQU8sS0FBSSxPQUFNLENBQUUsUUFBTyxDQUFDLEdBQUssUUFBTSxDQUFFLEtBQUksQ0FBQyxHQUFLLFFBQU0sQ0FBRSxTQUFRLENBQUMsR0FBTSxRQUFNLENBQUUsVUFBUyxDQUFDLENBQUc7QUFDN0Ysb0JBQU8sR0FBQyxPQUFRLENBQ2QsT0FBTSxDQUFFLFFBQU8sQ0FBQyxHQUFLLEdBQUMsQ0FDdEIsUUFBTSxDQUFFLEtBQUksQ0FBQyxHQUFLLEdBQUMsQ0FDbkIsUUFBTSxDQUFFLFNBQVEsQ0FBQyxHQUFLLEdBQUMsQ0FDdkIsUUFBTSxDQUFFLFVBQVMsQ0FBQyxHQUFLLEdBQUMsQ0FDMUIsQ0FBQzthQUNGLEtBQU87QUFDTixvQkFBTyxLQUFHLENBQUM7YUFDWjtBQUFBLFdBQ0QsQ0FDRDtBQUNBLGFBQUksQ0FBRyxFQUNOLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFDTCxrQkFBTyxHQUFDLE9BQVEsQ0FDZCxPQUFNLENBQUUsT0FBTSxDQUFDLEdBQUssR0FBQyxDQUNyQixRQUFNLENBQUUsU0FBUSxDQUFDLEdBQUssR0FBQyxDQUN2QixRQUFNLENBQUUsVUFBUyxDQUFDLEdBQUssR0FBQyxDQUN4QixRQUFNLENBQUUsVUFBUyxDQUFDLEdBQUssR0FBQyxDQUMxQixDQUFDO1dBQ0YsQ0FDRDtBQUNBLGVBQU0sQ0FBRyxFQUNSLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFDTCxrQkFBTyxHQUFDLE9BQVEsQ0FDZCxPQUFNLENBQUUsU0FBUSxDQUFDLEdBQUssR0FBQyxDQUN2QixRQUFNLENBQUUsVUFBUyxDQUFDLEdBQUssR0FBQyxDQUMxQixDQUFDO1dBQ0YsQ0FDRDtBQUFBLE9BQ0QsQ0FBQyxDQUFDO0FBR0YsMEJBQW1CLEVBQUksS0FBRyxDQUFDO0FBQzNCLFVBQUksV0FBVyxDQUFDLElBQUcsR0FBRyxDQUFDLENBQUc7QUFBRSx5QkFBaUIsQ0FBQyxTQUFRLENBQUcsS0FBRyxHQUFHLENBQUM7T0FBRTtBQUNsRSxVQUFHLFFBQVEsUUFBUyxFQUFDLFNBQUMsY0FBYSxDQUFNO0FBQ3hDLHlCQUFpQixDQUFDLGNBQWEsQ0FBRyxFQUFDLFNBQVEsQ0FBQyxDQUFDLENBQUM7T0FDL0MsRUFBQyxDQUFDO0FBR0YsWUFBSyxVQUFXLENBQUMsU0FBUSxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ2pDLFVBQUcsTUFBTSxRQUFTLEVBQUMsU0FBQyxjQUFhLENBQU07QUFDdEMsY0FBSyxXQUFZLENBQUMsY0FBYSxDQUFHLFVBQVEsQ0FBQyxDQUFDO09BQzdDLEVBQUMsQ0FBQztBQUNGLGNBQVEsQ0FBQyxDQUFDLE1BQUssU0FBVSxFQUFDLEdBQ3hCLFlBQVksRUFBQyxVQUFRLEVBQUMsZ0RBQThDLEVBQUMsQ0FBQztLQUV6RSxDQUFDLENBQUM7QUFHRixZQUFRLENBQUMsSUFBRyxDQUFHO0FBRWQsWUFBSyxDQUFMLFVBQW1CO0FFdmVWLGFBQVMsZ0JBQW9CLEdBQUM7QUFBRyxrQkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsMEJBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FBQUEsa0JGc2VwRSxRQUFTLEVBQUMsU0FBQyxTQUFRLENBQU07QUFDakMsMkJBQWlCLENBQUMsU0FBUSxDQUFHLEtBQUcsQ0FBQyxDQUFDO1NBQ25DLEVBQUMsQ0FBQztPQUNIO0FBSUEsUUFBQyxDQUFELFVBQUcsTUFBSyxDQUFHLElBQUU7QUFHUixlQUFFLEVBQUksR0FBQyxDQUFDO0FBQ1osV0FBRSxDQUFFLE1BQUssQ0FBQyxFQUFJLElBQUUsQ0FBQztBQUdqQix5QkFBaUIsRUFBQyxDQUFDO0FBQ25CLGNBQUssV0FBWSxFQUFDLFNBQUMsSUFBRyxDQUFHLE1BQUk7QUFDNUIsa0JBQVEsQ0FBQyxDQUFDLEtBQUksU0FBUyxHQUFLLE1BQUksT0FBTyxJQUFNLEtBQUcsR0FBSyxNQUFJLE9BQU8sTUFBTyxFQUFDLFNBQUM7a0JBQU0sT0FBSyxZQUFhLENBQUMsRUFBQyxTQUFTO1dBQUEsRUFBQyxHQUMzRyxtQ0FBbUMsRUFBQyxNQUFJLEtBQUssRUFBQyxrQkFBZ0IsRUFBQyxDQUFDO1NBQ25FLEVBQUMsQ0FBQztBQUdGLGNBQUssY0FBZSxFQUFDLFNBQUMsSUFBRyxDQUFHLE1BQUksQ0FBTTtBQUNyQyxjQUFJLEtBQUksU0FBUyxDQUFHO0FBQ25CLGlCQUFJLG1CQUFvQixDQUFDLEdBQUUsQ0FBRyxPQUFLLENBQUMsQ0FBQztXQUN0QztBQUFBLFNBQ0QsRUFBQyxDQUFDO0FBR0YsY0FBTyxJQUFFLENBQUUsTUFBSyxDQUFDLENBQUM7T0FFbkI7S0FDRCxDQUFDLENBQUM7R0FFSCxDQUFDLENBQUM7QUFNRSxvQkFBYSxFQUFJLEtBQUcsQ0FBQztBQUN6QixVQUFRLENBQUMsVUFBUyxDQUFHLEVBQ3BCLHVCQUFzQixDQUF0QixVQUF3QixpQkFBZ0IsQ0FBRztBQUMxQyxvQkFBYSxFQUFJLGtCQUFnQixDQUFDO0tBQ25DLENBQ0QsQ0FBQyxDQUFDO0FBT0YsUUFBTyxXQUFTLENBQUM7QUFHbEIsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBR2hpQkEsZ0Q7Ozs7OzttQ0NBQSxrQ0FBTyxRQUFDO0FBQ1AsY0FBVyxDQUFDO0FBRVIsU0FBSTtBQUdQLFlBQU8sQ0FBUCxVQUFTLFdBQVUsQ0FBRyxVQUFRO0FBQzdCLGVBQVEsRUFBSSxVQUFRLEdBQUssR0FBQyxDQUFDO0FBQ3ZCLGFBQUUsRUFBSSxVQUFnQixDQUFHO0FGUHBCLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxtQkVNbkUsTUFBTyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztPQUM5QixDQUFDO0FBQ0QsU0FBRSxVQUFVLEVBQUksVUFBUSxDQUFDO0FBQ3pCLFNBQUUsVUFBVSxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQy9CLFlBQU8sSUFBRSxDQUFDO0tBQ1g7QUFHQSxlQUFVLENBQVYsVUFBWSxVQUFTLENBQUcsWUFBVSxDQUFHLFVBQVE7QUFDNUMsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUZsQnBCLGFBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxvQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxtQkVpQm5FLE1BQU8sQ0FBQyxJQUFHLENBQUcsRUFBQyxVQUFTLFVBQVUsWUFBWSxDQUFDLE9BQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO09BQ3pFLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxPQUFLLE9BQVEsQ0FBQyxVQUFTLFVBQVUsQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUM5RCxTQUFFLFVBQVUsWUFBWSxFQUFJLElBQUUsQ0FBQztBQUMvQixZQUFPLElBQUUsQ0FBQztLQUNYO0FBS0EsVUFBSyxDQUFMLFVBQU8sSUFBWTtBSDdCVCxXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLFVHNEIvRixRQUFTLEVBQUMsU0FBQyxHQUFFLENBQU07QUFDckIsYUFBUyxPQUFFLEdBQUssSUFBRSxDQUFHO0FBQ3BCLGNBQUksR0FBRSxlQUFnQixDQUFDLEdBQUUsQ0FBQyxDQUFHO0FBQzVCLGdCQUFHLENBQUUsR0FBRSxDQUFDLEVBQUksSUFBRSxDQUFFLEdBQUUsQ0FBQyxDQUFDO1dBQ3JCO0FBQUEsU0FDRDtBQUFBLE9BQ0QsRUFBQyxDQUFDO0FBQ0YsWUFBTyxLQUFHLENBQUM7S0FDWjtBQUlBLFNBQUksQ0FBSixVQUFNLEdBQUUsQ0FBRyxLQUFHLENBQUc7QUFDaEIsVUFBSSxhQUFhLENBQUMsR0FBRSxDQUFFLElBQUcsQ0FBQyxDQUFDLENBQUc7QUFBRSxXQUFFLENBQUUsSUFBRyxDQUFDLEVBQUksR0FBQztPQUFFO0FBQy9DLFlBQU8sSUFBRSxDQUFFLElBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBR0EsU0FBSSxDQUFKLFVBQU0sRUFBQyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUc7QUFBRSxZQUFPLEdBQUMsS0FBSyxNQUFPLENBQUMsRUFBQyxDQUFHLEVBQUMsR0FBRSxDQUFDLE9BQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQztLQUFFO0FBR3BFLFFBQUcsQ0FBSCxVQUFLLEdBQUUsQ0FBRyxFQUFTLENBQUc7QUhuRFosV0FBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9DLENBQ2hFLE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELGFBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxZR2lEcEUsUUFBTyxDQUFDLEdBQUUsQ0FBRSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBQztLQUFFO0FBSTFELG9CQUFlLENBQWYsVUFBaUIsYUFBWSxDQUFHLEtBQUcsQ0FBRztBQUNqQywwQkFBZSxFQUFJLGNBQVksS0FBSyxNQUFPLENBQUMsYUFBWSxDQUFHLEVBQUMsSUFBRyxDQUFDLE9BQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25GLFlBQU8sSUFBSSxpQkFBZ0IsRUFBQyxDQUFDO0tBQzlCO0FBSUEsVUFBSyxDQUFMLFVBQU8sU0FBUSxDQUFHLFFBQU0sQ0FBRztBQUMxQixVQUFJLENBQUMsU0FBUSxDQUFHO0FBQUUsYUFBTSxJQUFJLE1BQUssQ0FBQyxPQUFNLEdBQUssbUJBQWlCLENBQUM7T0FBRTtBQUFBLEtBQ2xFO0FBR0EsZUFBVSxDQUFWLFVBQVksR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFHckQsYUFBUSxDQUFSLFVBQVUsR0FBRSxDQUFHO0FBQUUsWUFBTyxPQUFPLElBQUUsSUFBTSxZQUFVO0tBQUU7QUFBQSxHQUNwRCxDQUFDO0FBRUQsUUFBTyxHQUFDO0FBQ1Qsd0pBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpzLWdyYXBoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRlbHRhTW9kZWxcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiRGVsdGFNb2RlbFwiXSA9IGZhY3Rvcnkocm9vdFtcIkpzR3JhcGhcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkMTA1ZTczNzhlMGMyOThkMjUzYlxuICoqLyIsImRlZmluZShbJ2pzLWdyYXBoJywgJy4vbWlzYy5qcyddLCBmdW5jdGlvbiAoSnNHcmFwaCwgVSkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdHZhciBrZWVwRmlyc3QgPSAoKSA9PiB7fTtcblx0dmFyIGtlZXBTZWNvbmQgPSAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBkMiB9O1xuXHR2YXIgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUgPSAoZDEsIHAsIGQyKSA9PiB7IGQyLmFwcGx5VG8oZDEub3BlcmF0aW9uc1twXSwgJ3ZhbHVlJykgfTtcblxuXHRmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdH1cblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvLyB0aGUgZGVsdGEtbW9kZWwgY2xhc3MsIHdoaWNoIGlzIHRoZSBjb250YWluZXIgb2YgYWxsIG9wZXJhdGlvbiB0eXBlcyxcblx0Ly8gYWxsIGRlbHRhcywgdGhlaXIgb3JkZXJpbmcgYW5kIHJ1bGVzXG5cdHZhciBEZWx0YU1vZGVsID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHZhciBfb3BUeXBlcyA9IHt9OyAvLyB0aGUgbmFtZSBhbmQgZGVsdGEgY2xhc3Nlc1xuXHRcdHZhciBfY29tcG9zZUZucyA9IFtdOyAvLyB0aGUgY2FzZSBkaXN0aW5jdGlvbnMgb2YgZGVsdGEgY29tcG9zaXRpb25cblxuXHRcdFUuZXh0ZW5kKHRoaXMsIHtcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBmdWxseSBkZWZpbmUgYSBuZXcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0XHRcdF9hZGRPcGVyYXRpb25UeXBlKHtuYW1lLCBjb25zdHJ1Y3RvciwgYXBwbHlUbywgcHJvdG90eXBlLCBtZXRob2R9KSB7XG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgbWV0aG9kIGZvciBhZGRpbmcgdGhlIG5ldyBvcGVyYXRpb24gdG8gYSBNb2RpZnkgZGVsdGEuXG5cdFx0XHRcdC8vIEl0IGlzIHB1dCBvbiBhIHRlbXBvcmFyeSBvYmplY3Rcblx0XHRcdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRcdF9vcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0RGVsdGE6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgc3BlY2lmaWMgRGVsdGEgY2xhc3Ncblx0XHRcdFx0VS5leHRlbmQoX29wVHlwZXNbbmFtZV0uRGVsdGEucHJvdG90eXBlLCBwcm90b3R5cGUsIHtcblx0XHRcdFx0XHRjb25zdHJ1Y3RvcjogY29uc3RydWN0b3IsXG5cdFx0XHRcdFx0dHlwZTogbmFtZSxcblx0XHRcdFx0XHRhcHBseVRvOiBhcHBseVRvXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YVxuXHRcdFx0XHQvLyAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIHRoZSBmaXJzdCBkZWx0YSB0eXBlIHRvIGJlIGRlZmluZWQpXG5cdFx0XHRcdF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPVxuXHRcdFx0XHRcdFx0VS5pc0RlZmluZWQobWV0aG9kKSA/IG1ldGhvZCA6XG5cdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1tuYW1lXSwgcHJvcGVydHksIHZhbHVlcyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGdpdmUgYSBuZXcgbmFtZSB0byAoYSB2YXJpYXRpb24gb2YpIGFuIGV4aXN0aW5nIGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uQWxpYXMoe25hbWUsIHRhcmdldCwgdHJhbnNmb3JtfSkge1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgbWV0aG9kIGZvciBhZGRpbmcgdGhlIG5ldyBvcGVyYXRpb24gdG8gYSBNb2RpZnkgZGVsdGFcblx0XHRcdFx0dmFyIG9iamVjdFdpdGhNZXRob2QgPSB7fTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdFdpdGhNZXRob2QsIG5hbWUsIHtcblx0XHRcdFx0XHR2YWx1ZShwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbdGFyZ2V0XSwgcHJvcGVydHksIHRyYW5zZm9ybSh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdG1ldGhvZDogb2JqZWN0V2l0aE1ldGhvZFtuYW1lXVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIG1ha2UgdGhlIG9wZXJhdGlvbiBtZXRob2QgYXZhaWxhYmxlIG9uIHRoZSAnbW9kaWZ5JyBkZWx0YSAoYXNzdW1lcyB0aGF0ICdtb2RpZnknIGlzIGRlZmluZWQgZmlyc3QpXG5cdFx0XHRcdF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YS5wcm90b3R5cGVbbmFtZV0gPSBfb3BUeXBlc1tuYW1lXS5tZXRob2Q7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gYWRkIGEgbmV3IHZhbGlkIGNhc2UgZGlzdGluY3Rpb24gZm9yIGRlbHRhIGNvbXBvc2l0aW9uXG5cdFx0XHRfYWRkQ29tcG9zaXRpb25SdWxlKG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbikge1xuXHRcdFx0XHRfY29tcG9zZUZucy5wdXNoKHsgb3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuIH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gZ2V0IGEgbmV3IGRlbHRhIG9mIGEgZ2l2ZW4gdHlwZSwgY29uc3RydWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG5cdFx0XHRfbmV3RGVsdGEodHlwZSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdHJldHVybiBVLmFwcGx5Q29uc3RydWN0b3IoX29wVHlwZXNbdHlwZV0uRGVsdGEsIHZhbHVlcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyB0aGUgbW9kaWZ5IG9wZXJhdGlvbiAoTVVTVCBCRSBUSEUgRklSU1QgT1BFUkFUSU9OIFRZUEUgVE8gQkUgREVGSU5FRClcblx0XHR2YXIgdGhpc0RNID0gdGhpcztcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdtb2RpZnknLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIE1vZGlmeShkZWx0YURlc2NyaXB0aW9uLCBvcGVyYXRpb25zKSB7XG5cdFx0XHRcdC8vIG5vcm1hbGl6ZSB0aGluZ3Ncblx0XHRcdFx0ZGVsdGFEZXNjcmlwdGlvbiA9IGRlbHRhRGVzY3JpcHRpb24gfHwge307XG5cdFx0XHRcdHRoaXMub3BlcmF0aW9ucyA9IG9wZXJhdGlvbnMgfHwge307XG5cblx0XHRcdFx0Ly8gcHJvY2VzcyBwb3NzaWJsZSBkZWx0YSBkZXNjcmlwdGlvblxuXHRcdFx0XHRPYmplY3Qua2V5cyhkZWx0YURlc2NyaXB0aW9uKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBrZXkubWF0Y2goL14oXFx3KylcXHMrKFtcXHdcXC5dKykkLyk7XG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3BlcmF0aW9uID0gbWF0Y2hbMV07XG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBtYXRjaFsyXTtcblx0XHRcdFx0XHRcdFUuYXNzZXJ0KG9wZXJhdGlvbiBpbiBfb3BUeXBlcyxcblx0XHRcdFx0XHRcdFx0XHRgSSBkb24ndCBrbm93IHRoZSAnJHtvcGVyYXRpb259JyBvcGVyYXRpb24uYCk7XG5cdFx0XHRcdFx0XHR0aGlzW29wZXJhdGlvbl0ocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb25ba2V5XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3BlcnR5KSkge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9ialtwcm9wZXJ0eV1gXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqW3Byb3BlcnR5XSwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHByb3RvdHlwZToge1xuXHRcdFx0XHRzZWxlY3RpdmVseUFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y29tcG9zZShwcm9wZXJ0eSwgb3AyKSB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3AyKSkgeyByZXR1cm4gdGhpcyB9XG5cdFx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRcdF9jb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XS50eXBlID09PSBvcDFUeXBlICYmIG9wMi50eXBlID09PSBvcDJUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuKHRoaXMsIHByb3BlcnR5LCBvcDIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdGBZb3UgY2Fubm90IGZvbGxvdyBhICcke3RoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0udHlwZX0nIG9wZXJhdGlvbiBgICtcblx0XHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRlcnIub3AxID0gdGhpcy50eXBlO1xuXHRcdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3BlcnR5LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHR2YXIgZG90SW5kZXggPSBwcm9wZXJ0eS5pbmRleE9mKCcuJyk7XG5cdFx0XHRcdFx0aWYgKGRvdEluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gdGhlIHByb3BlcnR5IGlzIGEgZG90LXNlcGFyYXRlZCBwYXRoOyByZWN1cnNpdmVseSBjcmVhdGUgYSBtb2RpZnktY2hhaW5cblx0XHRcdFx0XHRcdHZhciBhY3R1YWxQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKDAsIGRvdEluZGV4KTtcblx0XHRcdFx0XHRcdHZhciByZXN0T2ZQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKGRvdEluZGV4ICsgMSk7XG5cdFx0XHRcdFx0XHR2YXIgbmV3TW9kaWZ5RGVsdGEgPSB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBhY3R1YWxQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3TW9kaWZ5RGVsdGFbb3BUeXBlLm5hbWVdLmFwcGx5KG5ld01vZGlmeURlbHRhLCBbcmVzdE9mUHJvcGVydHldLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gdGhlIHByb3BlcnR5IGlzIGEgc2luZ2xlIG5hbWU7IGFkZCB0aGUgbmV3IGRlbHRhIGRpcmVjdGx5XG5cdFx0XHRcdFx0XHR2YXIgX25ld0RlbHRhID0gdGhpc0RNLl9uZXdEZWx0YS5hcHBseSh0aGlzRE0sIFtvcFR5cGUubmFtZV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3BlcmF0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkgJiYgVS5pc0RlZmluZWQodGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XSkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jb21wb3NlKHByb3BlcnR5LCBfbmV3RGVsdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XSA9IF9uZXdEZWx0YTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdG1ldGhvZChwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzWydtb2RpZnknXSwgcHJvcGVydHksIFtkZWx0YURlc2NyaXB0aW9uXSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnYWRkJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZGQodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdhZGQnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAncmVwbGFjZScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVwbGFjZSh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZXBsYWNlJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlbW92ZScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVtb3ZlKCkge30sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVtb3ZlJyk7XG5cdFx0XHRcdGRlbGV0ZSBvYmpbcHJvcGVydHldO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2ZvcmJpZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gRm9yYmlkKCkge30sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHsgYXNzZXJ0VW5kZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdmb3JiaWQnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vIGNvbXBvc2l0aW9uIG9mIHRoZSBzdGFuZGFyZCBvcGVyYXRpb24gdHlwZXNcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZXBsYWNlJywgKGQxLCBwLCBkMikgPT4geyBkMS5vcGVyYXRpb25zW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2FkZCcsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnZm9yYmlkJykgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0T2JqZWN0LmtleXMoZDIub3BlcmF0aW9ucykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRkMS5jb21wb3NlKHByb3AsIGQyLm9wZXJhdGlvbnNbcHJvcF0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZW1vdmUnLCAnYWRkJywgKGQxLCBwLCBkMikgPT4geyBkMS5vcGVyYXRpb25zW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ3JlcGxhY2UnLCBkMi52YWx1ZSkgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZW1vdmUnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2ZvcmJpZCcsICdhZGQnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2ZvcmJpZCcsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXG5cblx0XHQvLyAnYWx0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnYWx0ZXInLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFsdGVyKHZhbHVlLCBhbGlhcykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWUgfHwgW107XG5cdFx0XHRcdHRoaXMuYWxpYXMgPSBhbGlhcyB8fCAnYWx0ZXInO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRGdW5jdGlvbihvYmpbcHJvcGVydHldLCB0aGlzLmFsaWFzKTtcblx0XHRcdFx0dGhpcy52YWx1ZS5mb3JFYWNoKChzdWJPcCkgPT4ge1xuXHRcdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0XHR2YXIgcGFydFR3byA9IHN1Yk9wLnZhbHVlO1xuXHRcdFx0XHRcdGlmIChzdWJPcC50eXBlID09PSAncHJlcGVuZCcpIHtcblx0XHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9IGVsc2UgeyAvKiAnYXBwZW5kJyBvciAnaW5zZXJ0JyAqL1xuXHRcdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFtdLnB1c2guYXBwbHkoZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgZDIudmFsdWUpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnZm9yYmlkJykgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cblxuXHRcdC8vIHRoZSAncHJlcGVuZCcsICdpbnNlcnQnIGFuZCAnYXBwZW5kJyBvcGVyYXRpb24gdHlwZSBhbGlhc2VzXG5cdFx0WydwcmVwZW5kJywgJ2luc2VydCcsICdhcHBlbmQnXS5mb3JFYWNoKChvcFR5cGUpID0+IHtcblx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbkFsaWFzKHtcblx0XHRcdFx0bmFtZTogb3BUeXBlLFxuXHRcdFx0XHR0YXJnZXQ6ICdhbHRlcicsXG5cdFx0XHRcdHRyYW5zZm9ybTogKGFyZ3MpID0+IFtbeyB0eXBlOiBvcFR5cGUsIHZhbHVlOiBhcmdzWzBdIH1dLCBvcFR5cGVdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gJ2FmdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FmdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBZnRlcih2YWx1ZSkge1xuXHRcdFx0XHRVLmFzc2VydCh0eXBlb2YgcmVzb2x2ZVByb21pc2UgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdFx0XHRgQmVmb3JlIGNyZWF0aW5nIGFuICdhZnRlcicgb3BlcmF0aW9uLCB5b3UgbXVzdCByZWdpc3RlciBhIHByb21pc2UgcmVzb2x2ZXIgd2l0aCBkZWx0YS5qcy5gKTtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRGdW5jdGlvbihvYmpbcHJvcGVydHldLCAnYWZ0ZXInKTtcblx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHR2YXIgcGFydFR3byA9IHRoaXMudmFsdWU7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdHJldHVybiByZXNvbHZlUHJvbWlzZShwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsICdhZnRlcicpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCAnYWZ0ZXInKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAnYWZ0ZXInLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0LyogVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5IGNvcnJlY3QgKGUuZy4sIG5vdCBhc3NvY2lhdGl2ZSkuICovXG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0dmFyIF9ncmFwaCA9IG5ldyBKc0dyYXBoKCk7IC8qIGRlbHRhcyBpbiBhIHN0cmljdCBwYXJ0aWFsIG9yZGVyICovXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gZ2V0IHRoZSBncmFwaCBvZiBkZWx0YXNcblx0XHRcdGdyYXBoKCkgeyByZXR1cm4gX2dyYXBoIH1cblx0XHR9KTtcblxuXHRcdHZhciBfZGVsdGFDb25kaXRpb25zID0ge307IC8qIGFycmF5cyBvZiBhcnJheXM6IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtcyAqL1xuXHRcdHZhciBfc2V0dGxlZERlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBCb29sZWFucyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCBkaXNqdW5jdCkge1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYXJyYXkoX2RlbHRhQ29uZGl0aW9ucywgZGVsdGFOYW1lKS5wdXNoKGRpc2p1bmN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmIChfY29uZGl0aW9uc1Vuc2V0dGxlZCkge1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXS5zb21lKChkaXNqdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzanVuY3QuZXZlcnkoKGNvbmp1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbY29uanVuY3RdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdC8vIGEgY2xhc3Mgb2YgYSBzdGFuZGFyZCBuYW1lZCBkZWx0YSB3aXRoIG1ldGEtZGF0YSB0aGF0IGlzIHJlZ2lzdGVyZWQgaW50byB0aGUgZGVsdGEgbW9kZWxcblx0XHR0aGlzLkRlbHRhID0gVS5uZXdTdWJjbGFzcyhfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEsIGZ1bmN0aW9uIERlbHRhKHN1cGVyRm4sIGRlbHRhTmFtZSwgb3B0aW9ucykge1xuXHRcdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3Igb2YgdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRzdXBlckZuLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0VS5hc3NlcnQob3B0aW9ucyBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRgQSBkZWx0YSBzaG91bGQgYmUgZ2l2ZW4gYXMgYW4gb2JqZWN0LmApO1xuXHRcdFx0Ly8gVE9ETzogY2hlY2sgdW5pcXVlbmVzcyBvZiBgZGVsdGFOYW1lYFxuXG5cdFx0XHQvLyBtYWtlIHRoaXMgZGVsdGEgYSBNb2RpZnlEZWx0YSwgc28gcnVuIGl0cyBjb25zdHJ1Y3RvclxuXHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLmFwcGx5KHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBjcmVhdGUgZGVsdGEgcHJvcGVydGllc1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0XHRuYW1lOiB7IGdldCgpIHsgcmV0dXJuIGRlbHRhTmFtZSB9IH0sXG5cdFx0XHRcdG1hbnVhbGx5U2VsZWN0YWJsZToge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhb3B0aW9uc1snbWFudWFsbHlTZWxlY3RhYmxlJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pICYmIG9wdGlvbnNbJ3Jlc29sdmVzJ10ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdGVkOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdHJldHVybiAhIV9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpZjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydpZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2lmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ2lmJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ2lmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogZmFsc2UgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0b25seUlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ29ubHlJZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ29ubHlJZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zWydvbmx5SWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snb25seUlmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1snZXhwZWN0cyddIHx8ICBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydvbmx5SWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFmdGVyOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydhZnRlciddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWxlY3RzOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydzZWxlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgY29uZGl0aW9uc1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMuaWYpKSB7IF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgdGhpcy5pZikgfVxuXHRcdFx0dGhpcy5zZWxlY3RzLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdF9yZWdpc3RlckRpc2p1bmN0KG90aGVyRGVsdGFOYW1lLCBbZGVsdGFOYW1lXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gdXBkYXRlIHRoZSBncmFwaFxuXHRcdFx0X2dyYXBoLmFkZFZlcnRleChkZWx0YU5hbWUsIHRoaXMpO1xuXHRcdFx0dGhpcy5hZnRlci5mb3JFYWNoKChvdGhlckRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRfZ3JhcGguY3JlYXRlRWRnZShvdGhlckRlbHRhTmFtZSwgZGVsdGFOYW1lKTtcblx0XHRcdH0pO1xuXHRcdFx0VS5hc3NlcnQoIV9ncmFwaC5oYXNDeWNsZSgpLFxuXHRcdFx0XHRcdGBUaGUgZGVsdGEgJHtkZWx0YU5hbWV9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHR9KTtcblxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gc2VsZWN0IGEgbnVtYmVyIG9mIGRlbHRhcyBieSBuYW1lLCBzbyB0aGV5IHdpbGwgYmUgYXBwbGllZCB3aGVuIGFwcGxpY2FibGVcblx0XHRcdHNlbGVjdCguLi5kZWx0YU5hbWVzKSB7XG5cdFx0XHRcdGRlbHRhTmFtZXMuZm9yRWFjaCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyByZWdpc3RlciBhIG5hbWVkIHZhcmlhdGlvbiBwb2ludCBpbiB0aGUgY29kZS1iYXNlXG5cdFx0XHQvLyAoaS5lLiwgYXBwbHkgYWxsIHJlZ2lzdGVyZWQgZGVsdGFzIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSlcblx0XHRcdHZwKHZwTmFtZSwgdmFsKSB7XG5cblx0XHRcdFx0Ly8gYSB0ZW1wb3Jhcnkgb2JqZWN0IHRvIGhvbGQgdGhlIHZhbHVlIHdoaWxlIGl0IGlzIHVuZGVyZ29pbmcgY2hhbmdlXG5cdFx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdFx0b2JqW3ZwTmFtZV0gPSB2YWw7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYW55ICdvbmx5SWYnIGNvbmRpdGlvbnMgYXJlIGJlaW5nIHZpb2xhdGVkXG5cdFx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFUuYXNzZXJ0KCFkZWx0YS5zZWxlY3RlZCB8fCBkZWx0YS5vbmx5SWYgPT09IHRydWUgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBfZ3JhcGgudmVydGV4VmFsdWUoZCkuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdvbmx5SWYnIGNvbmRpdGlvbiBvZiBkZWx0YSAnJHtkZWx0YS5uYW1lfScgd2FzIHZpb2xhdGVkLmApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgcHJvcGVyIGRlbHRhc1xuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRpZiAoZGVsdGEuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLnNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHZwTmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyByZXR1cm4gdGhlIHRyYW5zZm9ybWVkIHZhbHVlXG5cdFx0XHRcdHJldHVybiBvYmpbdnBOYW1lXTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdHZhciByZXNvbHZlUHJvbWlzZSA9IG51bGw7XG5cdFUuZXh0ZW5kKERlbHRhTW9kZWwsIHtcblx0XHRyZWdpc3RlclByb21pc2VSZXNvbHZlcihwcm9taXNlUmVzb2x2ZXJGbikge1xuXHRcdFx0cmVzb2x2ZVByb21pc2UgPSBwcm9taXNlUmVzb2x2ZXJGbjtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIHJldHVybiB0aGUgbWFpbiBkZWx0YSBtb2RlbCBjbGFzcyAqL1xuXHRyZXR1cm4gRGVsdGFNb2RlbDtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW3N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9