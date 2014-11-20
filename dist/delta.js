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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYzUyYTM3OWNiZDYzZDRkNTgzOCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVksd0JBQVcsQ0FBRywwQ0FBVSxPQUFNLENBQUc7QUFDcEQsY0FBVyxDQUFDO0FBT1IsZUFBUSxJQUFJLFNBQUMsQ0FBSyxHQUFDLEVBQUM7QUFDcEIsZ0JBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxHQUFDO0dBQUUsRUFBQztBQUNyRCw2QkFBc0IsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsUUFBUyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsQ0FBRyxRQUFNLENBQUM7R0FBRSxFQUFDO0FBRXRGLFVBQVMsZUFBYSxDQUFFLEdBQUUsQ0FBRyxPQUFLLENBQUc7QUFDcEMsWUFBUSxDQUFDLE1BQU8sSUFBRSxJQUFNLFdBQVMsR0FDL0IsaUJBQWlCLEVBQUMsT0FBSyxFQUFDLHNEQUFvRCxFQUFDLENBQUM7R0FDakY7QUFFQSxVQUFTLGNBQVksQ0FBRSxHQUFFLENBQUcsT0FBSyxDQUFHO0FBQ25DLFlBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRSxDQUFDLEdBQ3RCLGlCQUFpQixFQUFDLE9BQUssRUFBQyx3Q0FBc0MsRUFBQyxDQUFDO0dBQ25FO0FBRUEsVUFBUyxnQkFBYyxDQUFFLEdBQUUsQ0FBRyxPQUFLLENBQUc7QUFDckMsWUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFFLENBQUMsR0FDeEIsaUJBQWlCLEVBQUMsT0FBSyxFQUFDLDBDQUF3QyxFQUFDLENBQUM7R0FDckU7QUFRSSxnQkFBUyxFQUFJLFdBQVUsQ0FBQyxTQUFVOztBQUdqQyxnQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUNiLG1CQUFVLEVBQUksR0FBQyxDQUFDO0FBRXBCLFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFHZCx1QkFBZ0IsQ0FBaEIsVUFBa0IsSUFBOEM7O0FBQTdDLGdCQUFHO0FBQUcsdUJBQVU7QUFBRyxtQkFBTTtBQUFHLHFCQUFRO0FBQUcsa0JBQUs7QUFHMUQsNEJBQWUsRUFBSSxHQUFDLENBQUM7QUFHekIsZ0JBQU8sQ0FBRSxJQUFHLENBQUMsRUFBSTtBQUNoQixjQUFHLENBQUcsS0FBRztBQUNULGVBQUksQ0FBRyxZQUFVO0FBQ2pCLGdCQUFLLENBQUcsaUJBQWUsQ0FBRSxJQUFHLENBQUM7QUFBQSxTQUM5QixDQUFDO0FBR0QsZ0JBQVEsQ0FBQyxRQUFPLENBQUUsSUFBRyxDQUFDLE1BQU0sVUFBVSxDQUFHLFVBQVEsQ0FBRztBQUNuRCxxQkFBVSxDQUFHLFlBQVU7QUFDdkIsY0FBRyxDQUFHLEtBQUc7QUFDVCxpQkFBTSxDQUFHLFFBQU07QUFBQSxTQUNoQixDQUFDLENBQUM7QUFJRixnQkFBTyxDQUFFLFFBQU8sQ0FBQyxNQUFNLFVBQVUsQ0FBRSxJQUFHLENBQUMsRUFDckMsWUFBVyxDQUFDLE1BQUssQ0FBQyxFQUFJLE9BQUssRUFDekIsVUFBVSxRQUFrQixDQUFHO0FDaEUzQixlQUFTLFlBQW9CLEdBQUM7QUFBRyxzQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsbUJBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxjRCtEekYsY0FBZSxDQUFDLFFBQU8sQ0FBRSxJQUFHLENBQUMsQ0FBRyxTQUFPLENBQUcsT0FBSyxDQUFDLENBQUM7QUFDcEQsZ0JBQU8sS0FBRyxDQUFDO1NBQ1osQ0FBQztPQUVOO0FBR0Esd0JBQWlCLENBQWpCLFVBQW1CLElBQXdCOztBQUF2QixnQkFBRztBQUFHLGtCQUFLO0FBQUcscUJBQVE7QUFHckMsNEJBQWUsRUFBSSxHQUFDLENBQUM7QUFDekIsY0FBSyxlQUFnQixDQUFDLGdCQUFlLENBQUcsS0FBRyxDQUFHLEVBQzdDLEtBQUksQ0FBSixVQUFNLFFBQWtCLENBQUc7QUM3RXBCLGlCQUFTLFlBQW9CLEdBQUM7QUFBRyx3QkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QscUJBQWtCLFFBQW9DLENBQUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxnQkQ0RTVGLGNBQWUsQ0FBQyxRQUFPLENBQUUsTUFBSyxDQUFDLENBQUcsU0FBTyxDQUFHLFVBQVMsQ0FBQyxNQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLGtCQUFPLEtBQUcsQ0FBQztXQUNaLENBQ0QsQ0FBQyxDQUFDO0FBR0YsZ0JBQU8sQ0FBRSxJQUFHLENBQUMsRUFBSTtBQUNoQixjQUFHLENBQUcsS0FBRztBQUNULGdCQUFLLENBQUcsaUJBQWUsQ0FBRSxJQUFHLENBQUM7QUFBQSxTQUM5QixDQUFDO0FBR0QsZ0JBQU8sQ0FBRSxRQUFPLENBQUMsTUFBTSxVQUFVLENBQUUsSUFBRyxDQUFDLEVBQUksU0FBTyxDQUFFLElBQUcsQ0FBQyxPQUFPLENBQUM7T0FFakU7QUFHQSx5QkFBa0IsQ0FBbEIsVUFBb0IsT0FBTSxDQUFHLFFBQU0sQ0FBRyxVQUFRLENBQUc7QUFDaEQsbUJBQVUsS0FBTSxDQUFDO0FBQUUsaUJBQU0sQ0FBTixRQUFNO0FBQUcsaUJBQU0sQ0FBTixRQUFNO0FBQUcsbUJBQVEsQ0FBUixVQUFRO0FBQUEsU0FBRSxDQUFDLENBQUM7T0FDbEQ7QUFHQSxlQUFRLENBQVIsVUFBVSxJQUFjLENBQUc7QUNwR2xCLGFBQVMsWUFBb0IsR0FBQztBQUFHLG9CQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxpQkFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLGNEbUcxRixtQkFBa0IsQ0FBQyxRQUFPLENBQUUsSUFBRyxDQUFDLE1BQU0sQ0FBRyxPQUFLLENBQUMsQ0FBQztPQUN4RDtBQUFBLEtBQ0QsQ0FBQyxDQUFDO0FBR0UsY0FBSyxFQUFJLEtBQUcsQ0FBQztBQUNqQixRQUFHLGtCQUFtQixDQUFDO0FBQ3RCLFVBQUcsQ0FBRyxTQUFPO0FBQ2IsaUJBQVUsQ0FBRyxTQUFTLE9BQUssQ0FBRSxnQkFBZSxDQUFHLFdBQVM7O0FBRXZELHdCQUFlLEVBQUksaUJBQWUsR0FBSyxHQUFDLENBQUM7QUFDekMsWUFBRyxXQUFXLEVBQUksV0FBUyxHQUFLLEdBQUMsQ0FBQztBQUdsQyxjQUFLLEtBQU0sQ0FBQyxnQkFBZSxDQUFDLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUMxQyxtQkFBSSxFQUFJLElBQUUsTUFBTyxDQUFDLHFCQUFvQixDQUFDLENBQUM7QUFDNUMsY0FBSSxLQUFJLENBQUc7QUFDTix5QkFBUSxFQUFJLE1BQUksQ0FBRSxFQUFDLENBQUM7QUFDcEIsd0JBQU8sRUFBSSxNQUFJLENBQUUsRUFBQyxDQUFDO0FBQ3ZCLG9CQUFRLENBQUMsU0FBUSxHQUFLLFNBQU8sR0FDM0Isb0JBQW9CLEVBQUMsVUFBUSxFQUFDLGVBQWEsRUFBQyxDQUFDO0FBQy9DLGlCQUFLLFNBQVEsQ0FBRSxDQUFDLFFBQU8sQ0FBRyxpQkFBZSxDQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7V0FDakQ7QUFBQSxTQUNELEVBQUMsQ0FBQztPQUNIO0FBQ0EsYUFBTSxDQUFOLFVBQVEsR0FBRSxDQUFHLFNBQU87O0FBQ25CLFlBQUksV0FBVyxDQUFDLFFBQU8sQ0FBQyxDQUFHO0FBRTFCLGtCQUFRLENBQUMsV0FBVyxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBQyxDQUNoQyxxRUFBbUUsQ0FBQyxDQUFDO0FBQ3ZFLGdCQUFLLEtBQU0sQ0FBQyxJQUFHLFdBQVcsQ0FBQyxRQUFTLEVBQUMsU0FBQyxXQUFVLENBQU07QUFDckQsMkJBQWMsQ0FBRSxXQUFVLENBQUMsUUFBUyxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxZQUFVLENBQUMsQ0FBQztXQUNqRSxFQUFDLENBQUM7U0FDSCxLQUFPO0FBRU4sa0JBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRSxDQUFDLENBQ3RCLHFFQUFtRSxDQUFDLENBQUM7QUFDdkUsZ0JBQUssS0FBTSxDQUFDLElBQUcsV0FBVyxDQUFDLFFBQVMsRUFBQyxTQUFDLFdBQVUsQ0FBTTtBQUNyRCwyQkFBYyxDQUFFLFdBQVUsQ0FBQyxRQUFTLENBQUMsR0FBRSxDQUFHLFlBQVUsQ0FBQyxDQUFDO1dBQ3ZELEVBQUMsQ0FBQztTQUNIO0FBQUEsT0FDRDtBQUNBLGVBQVEsQ0FBRztBQUNWLDBCQUFpQixDQUFqQixVQUFtQixHQUFFLENBQUcsWUFBVSxDQUFHO0FBRXBDLGtCQUFRLENBQUMsV0FBVyxDQUFDLEdBQUUsQ0FBQyxDQUN0QixxRUFBbUUsQ0FBQyxDQUFDO0FBQ3ZFLGNBQUksV0FBVyxDQUFDLElBQUcsV0FBVyxDQUFFLFdBQVUsQ0FBQyxDQUFDLENBQUc7QUFDOUMsZ0JBQUcsV0FBVyxDQUFFLFdBQVUsQ0FBQyxRQUFTLENBQUMsR0FBRSxDQUFHLFlBQVUsQ0FBQyxDQUFDO1dBQ3ZEO0FBQUEsU0FDRDtBQUNBLGVBQU0sQ0FBTixVQUFRLFFBQU8sQ0FBRyxJQUFFOztBQUNuQixjQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUMsQ0FBRztBQUFFLGtCQUFPLEtBQUc7V0FBRTtBQUNsQyw0QkFBYSxDQUFDO0FBQ2xCLHFCQUFVLEtBQU0sRUFBQyxTQUFDLElBQTRCOztBQUEzQix1QkFBTTtBQUFHLHVCQUFNO0FBQUcseUJBQVE7QUFDNUMsZ0JBQUksZUFBYyxDQUFFLFFBQU8sQ0FBQyxLQUFLLElBQU0sUUFBTSxHQUFLLElBQUUsS0FBSyxJQUFNLFFBQU0sQ0FBRztBQUN2RSw0QkFBYSxFQUFJLFVBQVEsQ0FBQztBQUMxQixvQkFBTyxLQUFHLENBQUM7YUFDWjtBQUFBLFdBQ0QsRUFBQyxDQUFDO0FBQ0YsY0FBSSxjQUFhLENBQUc7QUFDbkIsMEJBQWMsQ0FBQyxJQUFHLENBQUcsU0FBTyxDQUFHLElBQUUsQ0FBQyxDQUFDO1dBQ3BDLEtBQU87QUFDRixtQkFBRSxFQUFJLElBQUksTUFBSyxDQUNqQix3QkFBdUIsRUFBQyxLQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsS0FBSyxFQUFDLGVBQWEsS0FDbkUsVUFBVSxFQUFDLElBQUUsS0FBSyxFQUFDLG9DQUFrQyxFQUN2RCxDQUFDO0FBQ0QsZUFBRSxJQUFJLEVBQUksS0FBRyxXQUFXLENBQUUsUUFBTyxDQUFDLEtBQUssQ0FBQztBQUN4QyxlQUFFLElBQUksRUFBSSxJQUFFLEtBQUssQ0FBQztBQUNsQixpQkFBTSxJQUFFLENBQUM7V0FDVjtBQUFBLFNBQ0Q7QUFDQSxxQkFBWSxDQUFaLFVBQWMsTUFBSyxDQUFHLFNBQU8sQ0FBRyxPQUFLLENBQUc7QUFDbkMsc0JBQU8sRUFBSSxTQUFPLFFBQVMsQ0FBQyxHQUFFLENBQUMsQ0FBQztBQUNwQyxjQUFJLFFBQU8sSUFBTSxFQUFDLEVBQUc7QUFFaEIsOEJBQWEsRUFBSSxTQUFPLE1BQU8sQ0FBQyxFQUFHLFNBQU8sQ0FBQyxDQUFDO0FBQzVDLDhCQUFhLEVBQUksU0FBTyxNQUFPLENBQUMsUUFBTyxFQUFJLEdBQUMsQ0FBQztBQUM3Qyw4QkFBYSxFQUFJLEtBQUcsY0FBZSxDQUFDLFFBQU8sQ0FBRSxRQUFPLENBQUMsQ0FBRyxlQUFhLENBQUMsQ0FBQztBQUMzRSxrQkFBTyxlQUFhLENBQUUsTUFBSyxLQUFLLENBQUMsTUFBTyxDQUFDLGNBQWEsQ0FBRyxFQUFDLGNBQWEsQ0FBQyxPQUFRLENBQUMsTUFBSyxDQUFDLENBQUMsQ0FBQztXQUMxRixLQUFPO0FBRUYseUJBQVEsRUFBSSxPQUFLLFVBQVUsTUFBTyxDQUFDLE1BQUssQ0FBRyxFQUFDLE1BQUssS0FBSyxDQUFDLE9BQVEsQ0FBQyxNQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzVFLGdCQUFJLElBQUcsV0FBVyxlQUFnQixDQUFDLFFBQU8sQ0FBQyxHQUFLLFlBQVcsQ0FBQyxJQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsQ0FBQyxDQUFHO0FBQ3ZGLGtCQUFHLFFBQVMsQ0FBQyxRQUFPLENBQUcsVUFBUSxDQUFDLENBQUM7YUFDbEMsS0FBTztBQUNOLGtCQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsRUFBSSxVQUFRLENBQUM7YUFDdEM7QUFDQSxrQkFBTyxLQUFHLFdBQVcsQ0FBRSxRQUFPLENBQUMsQ0FBQztXQUNqQztBQUFBLFNBQ0Q7QUFBQSxPQUNEO0FBQ0EsWUFBSyxDQUFMLFVBQU8sUUFBTyxDQUFHLGlCQUFlLENBQUc7QUFDbEMsY0FBTyxLQUFHLGNBQWUsQ0FBQyxRQUFPLENBQUUsUUFBTyxDQUFDLENBQUcsU0FBTyxDQUFHLEVBQUMsZ0JBQWUsQ0FBQyxDQUFDLENBQUM7T0FDNUU7QUFBQSxLQUNELENBQUMsQ0FBQztBQU1GLFFBQUcsa0JBQW1CLENBQUM7QUFDdEIsVUFBRyxDQUFHLE1BQUk7QUFDVixpQkFBVSxDQUFHLFNBQVMsSUFBRSxDQUFFLEtBQUksQ0FBRztBQUFFLFlBQUcsTUFBTSxFQUFJLE1BQUk7T0FBRTtBQUN0RCxhQUFNLENBQU4sVUFBUSxHQUFFLENBQUcsU0FBTyxDQUFHO0FBQ3RCLHVCQUFlLENBQUMsR0FBRSxDQUFFLFFBQU8sQ0FBQyxDQUFHLE1BQUksQ0FBQyxDQUFDO0FBQ3JDLFdBQUUsQ0FBRSxRQUFPLENBQUMsRUFBSSxLQUFHLE1BQU0sQ0FBQztPQUMzQjtBQUFBLEtBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxrQkFBbUIsQ0FBQztBQUN0QixVQUFHLENBQUcsVUFBUTtBQUNkLGlCQUFVLENBQUcsU0FBUyxRQUFNLENBQUUsS0FBSSxDQUFHO0FBQUUsWUFBRyxNQUFNLEVBQUksTUFBSTtPQUFFO0FBQzFELGFBQU0sQ0FBTixVQUFRLEdBQUUsQ0FBRyxTQUFPLENBQUc7QUFDdEIscUJBQWEsQ0FBQyxHQUFFLENBQUUsUUFBTyxDQUFDLENBQUcsVUFBUSxDQUFDLENBQUM7QUFDdkMsV0FBRSxDQUFFLFFBQU8sQ0FBQyxFQUFJLEtBQUcsTUFBTSxDQUFDO09BQzNCO0FBQUEsS0FDRCxDQUFDLENBQUM7QUFDRixRQUFHLGtCQUFtQixDQUFDO0FBQ3RCLFVBQUcsQ0FBRyxTQUFPO0FBQ2IsaUJBQVUsQ0FBRyxTQUFTLE9BQUssQ0FBRSxDQUFFLEdBQUM7QUFDaEMsYUFBTSxDQUFOLFVBQVEsR0FBRSxDQUFHLFNBQU8sQ0FBRztBQUN0QixxQkFBYSxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxTQUFPLENBQUMsQ0FBQztBQUN0QyxjQUFPLElBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBQztPQUNyQjtBQUFBLEtBQ0QsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxrQkFBbUIsQ0FBQztBQUN0QixVQUFHLENBQUcsU0FBTztBQUNiLGlCQUFVLENBQUcsU0FBUyxPQUFLLENBQUUsQ0FBRSxHQUFDO0FBQ2hDLGFBQU0sQ0FBTixVQUFRLEdBQUUsQ0FBRyxTQUFPLENBQUc7QUFBRSx1QkFBZSxDQUFDLEdBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBRyxTQUFPLENBQUM7T0FBRTtBQUFBLEtBQ25FLENBQUMsQ0FBQztBQUlGLFFBQUcsb0JBQXFCLENBQUMsS0FBSSxDQUFHLFVBQVEsR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLFFBQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxXQUFTLFVBQVcsQ0FBQyxLQUFJLENBQUcsR0FBQyxNQUFNLENBQUM7S0FBRSxFQUFDLENBQUM7QUFDdkgsUUFBRyxvQkFBcUIsQ0FBQyxLQUFJLENBQUcsU0FBTyxDQUFHLHdCQUFzQixDQUFDLENBQUM7QUFDbEUsUUFBRyxvQkFBcUIsQ0FBQyxLQUFJLENBQUcsU0FBTyxHQUFHLFNBQUMsRUFBQyxDQUFHLEdBQU07QUFBRSxRQUFDLFdBQVcsQ0FBRSxFQUFDLEVBQUksV0FBUyxVQUFXLENBQUMsUUFBTyxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQzNHLFFBQUcsb0JBQXFCLENBQUMsU0FBUSxDQUFHLFVBQVEsQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUMxRCxRQUFHLG9CQUFxQixDQUFDLFNBQVEsQ0FBRyxTQUFPLENBQUcsd0JBQXNCLENBQUMsQ0FBQztBQUN0RSxRQUFHLG9CQUFxQixDQUFDLFNBQVEsQ0FBRyxTQUFPLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDekQsUUFBRyxvQkFBcUIsQ0FBQyxRQUFPLENBQUcsVUFBUSxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3pELFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFNBQU8sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUM7QUFDckQsWUFBSyxLQUFNLENBQUMsRUFBQyxXQUFXLENBQUMsUUFBUyxFQUFDLFNBQUMsSUFBRyxDQUFNO0FBQzVDLFVBQUMsUUFBUyxDQUFDLElBQUcsQ0FBRyxHQUFDLFdBQVcsQ0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDO09BQ3RDLEVBQUMsQ0FBQztLQUNILEVBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBRyxXQUFTLENBQUMsQ0FBQztBQUN4RCxRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxNQUFJLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFBRSxRQUFDLFdBQVcsQ0FBRSxFQUFDLEVBQUksV0FBUyxVQUFXLENBQUMsU0FBUSxDQUFHLEdBQUMsTUFBTSxDQUFDO0tBQUUsRUFBQyxDQUFDO0FBQzFILFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFNBQU8sQ0FBRyxVQUFRLENBQUMsQ0FBQztBQUN2RCxRQUFHLG9CQUFxQixDQUFDLFFBQU8sQ0FBRyxNQUFJLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDckQsUUFBRyxvQkFBcUIsQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBSXZELFFBQUcsa0JBQW1CLENBQUM7QUFDdEIsVUFBRyxDQUFHLFFBQU07QUFDWixpQkFBVSxDQUFHLFNBQVMsTUFBSSxDQUFFLEtBQUksQ0FBRyxNQUFJLENBQUc7QUFDekMsWUFBRyxNQUFNLEVBQUksTUFBSSxHQUFLLEdBQUMsQ0FBQztBQUN4QixZQUFHLE1BQU0sRUFBSSxNQUFJLEdBQUssUUFBTSxDQUFDO09BQzlCO0FBQ0EsYUFBTSxDQUFOLFVBQVEsR0FBRSxDQUFHLFNBQU87QUFDbkIsc0JBQWMsQ0FBQyxHQUFFLENBQUUsUUFBTyxDQUFDLENBQUcsS0FBRyxNQUFNLENBQUMsQ0FBQztBQUN6QyxZQUFHLE1BQU0sUUFBUyxFQUFDLFNBQUMsS0FBSTtBQUNuQixxQkFBTSxFQUFJLElBQUUsQ0FBRSxRQUFPLENBQUMsQ0FBQztBQUN2QixxQkFBTSxFQUFJLE1BQUksTUFBTSxDQUFDO0FBQ3pCLGNBQUksS0FBSSxLQUFLLElBQU0sVUFBUSxDQUFHO0FBQzdCLGVBQUUsQ0FBRSxRQUFPLENBQUMsRUFBSSxVQUFnQixDQUFHO0FFMVE3QixtQkFBUyxVQUFvQixHQUFDO0FBQUcsd0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELDBCQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLHFCRnlRcEUsTUFBTyxDQUFDLElBQUcsQ0FBRyxLQUFHLENBQUMsQ0FBQztBQUN6QixxQkFBTSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO2FBQzFCLENBQUM7V0FDRixLQUFPO0FBQ04sZUFBRSxDQUFFLFFBQU8sQ0FBQyxFQUFJLFVBQWdCLENBQUc7QUUvUTdCLG1CQUFTLFVBQW9CLEdBQUM7QUFBRyx3QkFBb0IsR0FDaEQsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsMEJBQW1DLEVBQUksVUFBUSxNQUFtQixDQUFDO0FBQUEscUJGOFFwRSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQ3pCLHFCQUFNLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7YUFDMUIsQ0FBQztXQUNGO0FBQUEsU0FDRCxFQUFDLENBQUM7T0FDSDtLQUNELENBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsT0FBTSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUN6RCxRQUFDLEtBQUssTUFBTyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsTUFBTSxDQUFHLEdBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEQsRUFBQyxDQUFDO0FBQ0YsUUFBRyxvQkFBcUIsQ0FBQyxPQUFNLENBQUcsVUFBUSxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3hELFFBQUcsb0JBQXFCLENBQUMsT0FBTSxDQUFHLFNBQU8sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFNO0FBQUUsUUFBQyxXQUFXLENBQUUsRUFBQyxFQUFJLFdBQVMsVUFBVyxDQUFDLFFBQU8sQ0FBQztLQUFFLEVBQUMsQ0FBQztBQUM3RyxRQUFHLG9CQUFxQixDQUFDLEtBQUksQ0FBRyxRQUFNLEdBQUcsU0FBQyxFQUFDLENBQUcsR0FBRyxHQUFDLENBQU07QUFDdkQsb0JBQWMsQ0FBQyxFQUFDLFdBQVcsQ0FBRSxFQUFDLE1BQU0sQ0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hELDZCQUF1QixDQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO0tBQ25DLEVBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsU0FBUSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUMzRCxvQkFBYyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsTUFBTSxDQUFHLEdBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEQsNkJBQXVCLENBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFDLENBQUM7S0FDbkMsRUFBQyxDQUFDO0FBSUYsS0FBQyxTQUFRLENBQUcsU0FBTyxDQUFHLFNBQU8sQ0FBQyxRQUFTLEVBQUMsU0FBQyxNQUFLO0FBQzdDLDZCQUF1QixDQUFDO0FBQ3ZCLFlBQUcsQ0FBRyxPQUFLO0FBQ1gsY0FBSyxDQUFHLFFBQU07QUFDZCxpQkFBUSxHQUFHLFNBQUMsSUFBRztnQkFBTSxFQUFDLENBQUM7QUFBRSxnQkFBRyxDQUFHLE9BQUs7QUFBRyxpQkFBSSxDQUFHLEtBQUcsQ0FBRSxFQUFDO0FBQUEsV0FBRSxDQUFDLENBQUcsT0FBSyxDQUFDO1NBQUE7T0FDakUsQ0FBQyxDQUFDO0tBQ0gsRUFBQyxDQUFDO0FBSUYsUUFBRyxrQkFBbUIsQ0FBQztBQUN0QixVQUFHLENBQUcsUUFBTTtBQUNaLGlCQUFVLENBQUcsU0FBUyxNQUFJLENBQUUsS0FBSSxDQUFHO0FBQ2xDLGdCQUFRLENBQUMsTUFBTyxlQUFhLElBQU0sV0FBUyxDQUMxQyw0RkFBMEYsQ0FBQyxDQUFDO0FBQzlGLFlBQUcsTUFBTSxFQUFJLE1BQUksQ0FBQztPQUNuQjtBQUNBLGFBQU0sQ0FBTixVQUFRLEdBQUUsQ0FBRyxTQUFPO0FBQ25CLHNCQUFjLENBQUMsR0FBRSxDQUFFLFFBQU8sQ0FBQyxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQ2xDLG1CQUFNLEVBQUksSUFBRSxDQUFFLFFBQU8sQ0FBQyxDQUFDO0FBQ3ZCLG1CQUFNLEVBQUksS0FBRyxNQUFNLENBQUM7QUFDeEIsV0FBRSxDQUFFLFFBQU8sQ0FBQyxFQUFJLFVBQWdCLENBQUc7QUU1VDNCLGVBQVMsVUFBb0IsR0FBQztBQUFHLG9CQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxzQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxnQkYyVHJFLGVBQWMsQ0FBQyxPQUFNLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUMsS0FBTSxDQUFDLFNBQVUsQ0FBRTtBQUNqRSxrQkFBTyxRQUFNLE1BQU8sQ0FBQyxJQUFHLENBQUcsS0FBRyxDQUFDLENBQUM7V0FDakMsS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7U0FDZCxDQUFDO09BQ0Y7S0FDRCxDQUFDLENBQUM7QUFDRixRQUFHLG9CQUFxQixDQUFDLE9BQU0sQ0FBRyxVQUFRLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDeEQsUUFBRyxvQkFBcUIsQ0FBQyxPQUFNLENBQUcsU0FBTyxDQUFHLFdBQVMsQ0FBQyxDQUFDO0FBQ3ZELFFBQUcsb0JBQXFCLENBQUMsS0FBSSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUN2RCxvQkFBYyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsTUFBTSxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQy9DLDZCQUF1QixDQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO0tBQ25DLEVBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsU0FBUSxDQUFHLFFBQU0sR0FBRyxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUMzRCxvQkFBYyxDQUFDLEVBQUMsV0FBVyxDQUFFLEVBQUMsTUFBTSxDQUFHLFFBQU0sQ0FBQyxDQUFDO0FBQy9DLDZCQUF1QixDQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDO0tBQ25DLEVBQUMsQ0FBQztBQUNGLFFBQUcsb0JBQXFCLENBQUMsUUFBTyxDQUFHLFFBQU0sQ0FBRyx3QkFBc0IsQ0FBQyxDQUFDO0FBQ3BFLFFBQUcsb0JBQXFCLENBQUMsT0FBTSxDQUFHLFNBQU8sQ0FBRyx3QkFBc0IsQ0FBQyxDQUFDO0FBT2hFLGNBQUssRUFBSSxJQUFJLFFBQU8sRUFBQyxDQUFDO0FBQzFCLFlBQVEsQ0FBQyxJQUFHLENBQUcsRUFFZCxLQUFJLENBQUosVUFBTSxDQUFFO0FBQUUsY0FBTyxPQUFLO09BQUUsQ0FDekIsQ0FBQyxDQUFDO0FBRUUsd0JBQWUsRUFBSSxHQUFDLENBQUM7QUFDckIsK0JBQXNCLEVBQUksR0FBQyxDQUFDO0FBQzVCLDRCQUFtQixFQUFJLE1BQUksQ0FBQztBQUVoQyxZQUFTLGtCQUFnQixDQUFFLFNBQVEsQ0FBRyxTQUFPLENBQUc7QUFDL0MsMEJBQW1CLEVBQUksS0FBRyxDQUFDO0FBQzNCLFVBQUksUUFBTyxJQUFNLEtBQUcsQ0FBRztBQUN0QiwrQkFBc0IsQ0FBRSxTQUFRLENBQUMsRUFBSSxLQUFHLENBQUM7T0FDMUMsS0FBTyxLQUFJLFFBQU8sSUFBTSxNQUFJLENBQUcsR0FFL0IsS0FBTyxLQUFJLGdCQUFlLENBQUUsU0FBUSxDQUFDLElBQU0sS0FBRyxDQUFHO0FBQ2hELGVBQU8sQ0FBQyxnQkFBZSxDQUFHLFVBQVEsQ0FBQyxLQUFNLENBQUMsUUFBTyxDQUFDLENBQUM7T0FDcEQ7QUFBQSxLQUNEO0FBRUEsWUFBUyxrQkFBZ0IsQ0FBRTtBQUMxQixVQUFJLG9CQUFtQixDQUFHO0FBQ3pCLDRCQUFtQixFQUFJLE1BQUksQ0FBQztBQUN4Qiw0QkFBZSxDQUFDO0FBQ3BCLFVBQUc7QUFDRiwwQkFBZSxFQUFJLE1BQUksQ0FBQztBQUN4QixnQkFBSyxXQUFZLEVBQUMsU0FBQyxTQUFRO0FBQzFCLGdCQUFJLHVCQUFzQixDQUFFLFNBQVEsQ0FBQyxDQUFHO0FBQUUscUJBQUs7YUFBRTtBQUNqRCxnQkFBSSxhQUFhLENBQUMsZ0JBQWUsQ0FBRSxTQUFRLENBQUMsQ0FBQyxDQUFHO0FBQUUscUJBQUs7YUFBRTtBQUN6RCxnQkFBSSxnQkFBZSxDQUFFLFNBQVEsQ0FBQyxLQUFNLEVBQUMsU0FBQyxRQUFPO29CQUN6QyxTQUFPLE1BQU8sRUFBQyxTQUFDLFFBQU87c0JBQ3JCLHdCQUFzQixDQUFFLFFBQU8sQ0FBQztlQUFBLEVBQUM7YUFBQSxFQUFDLENBQUc7QUFDMUMscUNBQXNCLENBQUUsU0FBUSxDQUFDLEVBQUksS0FBRyxDQUFDO0FBQ3pDLDhCQUFlLEVBQUksS0FBRyxDQUFDO2FBQ3hCO0FBQUEsV0FDRCxFQUFDLENBQUM7U0FDSCxRQUFTLGdCQUFlLEVBQUU7T0FDM0I7QUFBQSxLQUNEO0FBSUEsUUFBRyxNQUFNLEVBQUksY0FBYSxDQUFDLFFBQU8sQ0FBRSxRQUFPLENBQUMsTUFBTSxDQUFHLFNBQVMsTUFBSSxDQUFFLE9BQU0sQ0FBRyxVQUFRLENBQUcsUUFBTTtBQUU3RixhQUFNLEtBQU0sQ0FBQyxJQUFHLENBQUcsUUFBTSxDQUFDLENBQUM7QUFHM0IsY0FBUSxDQUFDLE9BQU0sV0FBYSxPQUFLLENBQy9CLHdDQUFzQyxDQUFDLENBQUM7QUFJMUMsY0FBTyxDQUFFLFFBQU8sQ0FBQyxNQUFNLE1BQU8sQ0FBQyxJQUFHLENBQUcsUUFBTSxDQUFDLENBQUM7QUFHN0MsWUFBSyxpQkFBa0IsQ0FBQyxJQUFHLENBQUc7QUFDN0IsWUFBRyxDQUFHLEVBQUUsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUFFLGtCQUFPLFVBQVE7V0FBRSxDQUFFO0FBQ25DLDBCQUFpQixDQUFHLEVBQ25CLEdBQUUsQ0FBRixVQUFJLENBQUU7QUFDTCxnQkFBSSxXQUFXLENBQUMsT0FBTSxDQUFFLG9CQUFtQixDQUFDLENBQUMsQ0FBRztBQUMvQyxvQkFBTyxFQUFDLENBQUMsT0FBTSxDQUFFLG9CQUFtQixDQUFDLENBQUM7YUFDdkMsS0FBTyxLQUFJLFdBQVcsQ0FBQyxPQUFNLENBQUUsVUFBUyxDQUFDLENBQUMsR0FBSyxRQUFNLENBQUUsVUFBUyxDQUFDLE9BQU8sRUFBSSxHQUFHO0FBQzlFLG9CQUFPLE1BQUksQ0FBQzthQUNiLEtBQU87QUFDTixvQkFBTyxLQUFHLENBQUM7YUFDWjtBQUFBLFdBQ0QsQ0FDRDtBQUNBLGdCQUFPLENBQUcsRUFDVCxHQUFFLENBQUYsVUFBSSxDQUFFO0FBQ0wsNkJBQWlCLEVBQUMsQ0FBQztBQUNuQixrQkFBTyxFQUFDLENBQUMsdUJBQXNCLENBQUUsU0FBUSxDQUFDLENBQUM7V0FDNUMsQ0FDRDtBQUNBLFVBQUMsQ0FBRyxFQUNILEdBQUUsQ0FBRixVQUFJLENBQUU7QUFDTCxnQkFBSSxPQUFNLENBQUUsSUFBRyxDQUFDLElBQU0sS0FBRyxHQUFLLFFBQU0sQ0FBRSxJQUFHLENBQUMsSUFBTSxNQUFJLENBQUc7QUFDdEQsb0JBQU8sUUFBTSxDQUFFLElBQUcsQ0FBQyxDQUFDO2FBQ3JCLEtBQU8sS0FBSSxPQUFNLENBQUUsSUFBRyxDQUFDLEdBQUssUUFBTSxDQUFFLEtBQUksQ0FBQyxHQUFLLFFBQU0sQ0FBRSxVQUFTLENBQUMsQ0FBRztBQUNsRSxvQkFBTyxHQUFDLE9BQVEsQ0FDZCxPQUFNLENBQUUsSUFBRyxDQUFDLEdBQUssR0FBQyxDQUNsQixRQUFNLENBQUUsS0FBSSxDQUFDLEdBQUssR0FBQyxDQUNuQixRQUFNLENBQUUsVUFBUyxDQUFDLEdBQUssR0FBQyxDQUMxQixDQUFDO2FBQ0YsS0FBTztBQUNOLG9CQUFPLE1BQUksQ0FBQzthQUNiO0FBQUEsV0FDRCxDQUNEO0FBQ0EsY0FBSyxDQUFHLEVBQ1AsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUNMLGdCQUFJLE9BQU0sQ0FBRSxRQUFPLENBQUMsSUFBTSxLQUFHLEdBQUssUUFBTSxDQUFFLFFBQU8sQ0FBQyxJQUFNLE1BQUksQ0FBRztBQUM5RCxvQkFBTyxRQUFNLENBQUUsUUFBTyxDQUFDLENBQUM7YUFDekIsS0FBTyxLQUFJLE9BQU0sQ0FBRSxRQUFPLENBQUMsR0FBSyxRQUFNLENBQUUsS0FBSSxDQUFDLEdBQUssUUFBTSxDQUFFLFNBQVEsQ0FBQyxHQUFNLFFBQU0sQ0FBRSxVQUFTLENBQUMsQ0FBRztBQUM3RixvQkFBTyxHQUFDLE9BQVEsQ0FDZCxPQUFNLENBQUUsUUFBTyxDQUFDLEdBQUssR0FBQyxDQUN0QixRQUFNLENBQUUsS0FBSSxDQUFDLEdBQUssR0FBQyxDQUNuQixRQUFNLENBQUUsU0FBUSxDQUFDLEdBQUssR0FBQyxDQUN2QixRQUFNLENBQUUsVUFBUyxDQUFDLEdBQUssR0FBQyxDQUMxQixDQUFDO2FBQ0YsS0FBTztBQUNOLG9CQUFPLEtBQUcsQ0FBQzthQUNaO0FBQUEsV0FDRCxDQUNEO0FBQ0EsYUFBSSxDQUFHLEVBQ04sR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUNMLGtCQUFPLEdBQUMsT0FBUSxDQUNkLE9BQU0sQ0FBRSxPQUFNLENBQUMsR0FBSyxHQUFDLENBQ3JCLFFBQU0sQ0FBRSxTQUFRLENBQUMsR0FBSyxHQUFDLENBQ3ZCLFFBQU0sQ0FBRSxVQUFTLENBQUMsR0FBSyxHQUFDLENBQ3hCLFFBQU0sQ0FBRSxVQUFTLENBQUMsR0FBSyxHQUFDLENBQzFCLENBQUM7V0FDRixDQUNEO0FBQ0EsZUFBTSxDQUFHLEVBQ1IsR0FBRSxDQUFGLFVBQUksQ0FBRTtBQUNMLGtCQUFPLEdBQUMsT0FBUSxDQUNkLE9BQU0sQ0FBRSxTQUFRLENBQUMsR0FBSyxHQUFDLENBQ3ZCLFFBQU0sQ0FBRSxVQUFTLENBQUMsR0FBSyxHQUFDLENBQzFCLENBQUM7V0FDRixDQUNEO0FBQUEsT0FDRCxDQUFDLENBQUM7QUFHRiwwQkFBbUIsRUFBSSxLQUFHLENBQUM7QUFDM0IsVUFBSSxXQUFXLENBQUMsSUFBRyxHQUFHLENBQUMsQ0FBRztBQUFFLHlCQUFpQixDQUFDLFNBQVEsQ0FBRyxLQUFHLEdBQUcsQ0FBQztPQUFFO0FBQ2xFLFVBQUcsUUFBUSxRQUFTLEVBQUMsU0FBQyxjQUFhLENBQU07QUFDeEMseUJBQWlCLENBQUMsY0FBYSxDQUFHLEVBQUMsU0FBUSxDQUFDLENBQUMsQ0FBQztPQUMvQyxFQUFDLENBQUM7QUFHRixZQUFLLFVBQVcsQ0FBQyxTQUFRLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDakMsVUFBRyxNQUFNLFFBQVMsRUFBQyxTQUFDLGNBQWEsQ0FBTTtBQUN0QyxjQUFLLFdBQVksQ0FBQyxjQUFhLENBQUcsVUFBUSxDQUFDLENBQUM7T0FDN0MsRUFBQyxDQUFDO0FBQ0YsY0FBUSxDQUFDLENBQUMsTUFBSyxTQUFVLEVBQUMsR0FDeEIsWUFBWSxFQUFDLFVBQVEsRUFBQyxnREFBOEMsRUFBQyxDQUFDO0tBRXpFLENBQUMsQ0FBQztBQUdGLFlBQVEsQ0FBQyxJQUFHLENBQUc7QUFFZCxZQUFLLENBQUwsVUFBbUI7QUV2ZVYsYUFBUyxnQkFBb0IsR0FBQztBQUFHLGtCQUFvQixHQUNoRCxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCwwQkFBbUMsRUFBSSxVQUFRLE1BQW1CLENBQUM7QUFBQSxrQkZzZXBFLFFBQVMsRUFBQyxTQUFDLFNBQVEsQ0FBTTtBQUNqQywyQkFBaUIsQ0FBQyxTQUFRLENBQUcsS0FBRyxDQUFDLENBQUM7U0FDbkMsRUFBQyxDQUFDO09BQ0g7QUFJQSxRQUFDLENBQUQsVUFBRyxNQUFLLENBQUcsSUFBRTtBQUdSLGVBQUUsRUFBSSxHQUFDLENBQUM7QUFDWixXQUFFLENBQUUsTUFBSyxDQUFDLEVBQUksSUFBRSxDQUFDO0FBR2pCLHlCQUFpQixFQUFDLENBQUM7QUFDbkIsY0FBSyxXQUFZLEVBQUMsU0FBQyxJQUFHLENBQUcsTUFBSTtBQUM1QixrQkFBUSxDQUFDLENBQUMsS0FBSSxTQUFTLEdBQUssTUFBSSxPQUFPLElBQU0sS0FBRyxHQUFLLE1BQUksT0FBTyxNQUFPLEVBQUMsU0FBQztrQkFBTSxPQUFLLFlBQWEsQ0FBQyxFQUFDLFNBQVM7V0FBQSxFQUFDLEdBQzNHLG1DQUFtQyxFQUFDLE1BQUksS0FBSyxFQUFDLGtCQUFnQixFQUFDLENBQUM7U0FDbkUsRUFBQyxDQUFDO0FBR0YsY0FBSyxjQUFlLEVBQUMsU0FBQyxJQUFHLENBQUcsTUFBSSxDQUFNO0FBQ3JDLGNBQUksS0FBSSxTQUFTLENBQUc7QUFDbkIsaUJBQUksbUJBQW9CLENBQUMsR0FBRSxDQUFHLE9BQUssQ0FBQyxDQUFDO1dBQ3RDO0FBQUEsU0FDRCxFQUFDLENBQUM7QUFHRixjQUFPLElBQUUsQ0FBRSxNQUFLLENBQUMsQ0FBQztPQUVuQjtLQUNELENBQUMsQ0FBQztHQUVILENBQUMsQ0FBQztBQU1FLG9CQUFhLEVBQUksS0FBRyxDQUFDO0FBQ3pCLFVBQVEsQ0FBQyxVQUFTLENBQUcsRUFDcEIsdUJBQXNCLENBQXRCLFVBQXdCLGlCQUFnQixDQUFHO0FBQzFDLG9CQUFhLEVBQUksa0JBQWdCLENBQUM7S0FDbkMsQ0FDRCxDQUFDLENBQUM7QUFPRixRQUFPLFdBQVMsQ0FBQztBQUdsQixFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FHaGlCQSxnRDs7Ozs7O21DQ0FBLGtDQUFPLFFBQUM7QUFDUCxjQUFXLENBQUM7QUFFUixTQUFJO0FBR1AsWUFBTyxDQUFQLFVBQVMsV0FBVSxDQUFHLFVBQVE7QUFDN0IsZUFBUSxFQUFJLFVBQVEsR0FBSyxHQUFDLENBQUM7QUFDdkIsYUFBRSxFQUFJLFVBQWdCLENBQUc7QUZQcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLG1CRU1uRSxNQUFPLENBQUMsSUFBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO09BQzlCLENBQUM7QUFDRCxTQUFFLFVBQVUsRUFBSSxVQUFRLENBQUM7QUFDekIsU0FBRSxVQUFVLFlBQVksRUFBSSxJQUFFLENBQUM7QUFDL0IsWUFBTyxJQUFFLENBQUM7S0FDWDtBQUdBLGVBQVUsQ0FBVixVQUFZLFVBQVMsQ0FBRyxZQUFVLENBQUcsVUFBUTtBQUM1QyxlQUFRLEVBQUksVUFBUSxHQUFLLEdBQUMsQ0FBQztBQUN2QixhQUFFLEVBQUksVUFBZ0IsQ0FBRztBRmxCcEIsYUFBUyxVQUFvQixHQUFDO0FBQUcsa0JBQW9CLEdBQ2hELE9BQW9CLFVBQVEsT0FBTyxDQUFHLE9BQWtCO0FBQzNELG9CQUFtQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLG1CRWlCbkUsTUFBTyxDQUFDLElBQUcsQ0FBRyxFQUFDLFVBQVMsVUFBVSxZQUFZLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7T0FDekUsQ0FBQztBQUNELFNBQUUsVUFBVSxFQUFJLE9BQUssT0FBUSxDQUFDLFVBQVMsVUFBVSxDQUFHLFVBQVEsQ0FBQyxDQUFDO0FBQzlELFNBQUUsVUFBVSxZQUFZLEVBQUksSUFBRSxDQUFDO0FBQy9CLFlBQU8sSUFBRSxDQUFDO0tBQ1g7QUFLQSxVQUFLLENBQUwsVUFBTyxJQUFZO0FIN0JULFdBQVMsVUFBb0IsR0FBQztBQUFHLGtCQUFvQyxDQUNoRSxPQUFvQixVQUFRLE9BQU8sQ0FBRyxPQUFrQjtBQUMzRCxhQUFrQixRQUFvQyxDQUFDLEVBQUksVUFBUSxNQUFtQixDQUFDO0FBQUEsVUc0Qi9GLFFBQVMsRUFBQyxTQUFDLEdBQUUsQ0FBTTtBQUNyQixhQUFTLE9BQUUsR0FBSyxJQUFFLENBQUc7QUFDcEIsY0FBSSxHQUFFLGVBQWdCLENBQUMsR0FBRSxDQUFDLENBQUc7QUFDNUIsZ0JBQUcsQ0FBRSxHQUFFLENBQUMsRUFBSSxJQUFFLENBQUUsR0FBRSxDQUFDLENBQUM7V0FDckI7QUFBQSxTQUNEO0FBQUEsT0FDRCxFQUFDLENBQUM7QUFDRixZQUFPLEtBQUcsQ0FBQztLQUNaO0FBSUEsU0FBSSxDQUFKLFVBQU0sR0FBRSxDQUFHLEtBQUcsQ0FBRztBQUNoQixVQUFJLGFBQWEsQ0FBQyxHQUFFLENBQUUsSUFBRyxDQUFDLENBQUMsQ0FBRztBQUFFLFdBQUUsQ0FBRSxJQUFHLENBQUMsRUFBSSxHQUFDO09BQUU7QUFDL0MsWUFBTyxJQUFFLENBQUUsSUFBRyxDQUFDLENBQUM7S0FDakI7QUFHQSxTQUFJLENBQUosVUFBTSxFQUFDLENBQUcsSUFBRSxDQUFHLEtBQUcsQ0FBRztBQUFFLFlBQU8sR0FBQyxLQUFLLE1BQU8sQ0FBQyxFQUFDLENBQUcsRUFBQyxHQUFFLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDO0tBQUU7QUFHcEUsUUFBRyxDQUFILFVBQUssR0FBRSxDQUFHLEVBQVMsQ0FBRztBSG5EWixXQUFTLFVBQW9CLEdBQUM7QUFBRyxrQkFBb0MsQ0FDaEUsT0FBb0IsVUFBUSxPQUFPLENBQUcsT0FBa0I7QUFDM0QsYUFBa0IsUUFBb0MsQ0FBQyxFQUFJLFVBQVEsTUFBbUIsQ0FBQztBQUFBLFlHaURwRSxRQUFPLENBQUMsR0FBRSxDQUFFLEVBQUMsQ0FBRyxJQUFFLENBQUcsS0FBRyxDQUFDO0tBQUU7QUFJMUQsb0JBQWUsQ0FBZixVQUFpQixhQUFZLENBQUcsS0FBRyxDQUFHO0FBQ2pDLDBCQUFlLEVBQUksY0FBWSxLQUFLLE1BQU8sQ0FBQyxhQUFZLENBQUcsRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkYsWUFBTyxJQUFJLGlCQUFnQixFQUFDLENBQUM7S0FDOUI7QUFJQSxVQUFLLENBQUwsVUFBTyxTQUFRLENBQUcsUUFBTSxDQUFHO0FBQzFCLFVBQUksQ0FBQyxTQUFRLENBQUc7QUFBRSxhQUFNLElBQUksTUFBSyxDQUFDLE9BQU0sR0FBSyxtQkFBaUIsQ0FBQztPQUFFO0FBQUEsS0FDbEU7QUFHQSxlQUFVLENBQVYsVUFBWSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUdyRCxhQUFRLENBQVIsVUFBVSxHQUFFLENBQUc7QUFBRSxZQUFPLE9BQU8sSUFBRSxJQUFNLFlBQVU7S0FBRTtBQUFBLEdBQ3BELENBQUM7QUFFRCxRQUFPLEdBQUM7QUFDVCx3SkFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianMtZ3JhcGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRGVsdGFNb2RlbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImpzLWdyYXBoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJEZWx0YU1vZGVsXCJdID0gZmFjdG9yeShyb290W1wiSnNHcmFwaFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJjNTJhMzc5Y2JkNjNkNGQ1ODM4XG4gKiovIiwiZGVmaW5lKFsnanMtZ3JhcGgnLCAnLi9taXNjLmpzJ10sIGZ1bmN0aW9uIChKc0dyYXBoLCBVKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHQvKiBjb252ZW5pZW5jZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFwcGxpY2F0aW9uIGFuZCBjb21wb3NpdGlvbiBmdW5jdGlvbnMgYmVsb3cgKi9cblx0dmFyIGtlZXBGaXJzdCA9ICgpID0+IHt9O1xuXHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IGQyIH07XG5cdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMS5vcGVyYXRpb25zW3BdLCAndmFsdWUnKSB9O1xuXG5cdGZ1bmN0aW9uIGFzc2VydEZ1bmN0aW9uKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgaXQgYWN0cyBvbiB0byBiZSBhIGZ1bmN0aW9uLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKHZhbCksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGRlZmluZWQuYCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NlcnRVbmRlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzVW5kZWZpbmVkKHZhbCksXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIHVuZGVmaW5lZC5gKTtcblx0fVxuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8vIHRoZSBkZWx0YS1tb2RlbCBjbGFzcywgd2hpY2ggaXMgdGhlIGNvbnRhaW5lciBvZiBhbGwgb3BlcmF0aW9uIHR5cGVzLFxuXHQvLyBhbGwgZGVsdGFzLCB0aGVpciBvcmRlcmluZyBhbmQgcnVsZXNcblx0dmFyIERlbHRhTW9kZWwgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIEFjY3VtdWxhdGVkIGRhdGEgZm9yIHRoZSBhdmFpbGFibGUgZGVsdGEgb3BlcmF0aW9uIHR5cGVzXG5cdFx0dmFyIF9vcFR5cGVzID0ge307IC8vIHRoZSBuYW1lIGFuZCBkZWx0YSBjbGFzc2VzXG5cdFx0dmFyIF9jb21wb3NlRm5zID0gW107IC8vIHRoZSBjYXNlIGRpc3RpbmN0aW9ucyBvZiBkZWx0YSBjb21wb3NpdGlvblxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGZ1bGx5IGRlZmluZSBhIG5ldyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvblR5cGUoe25hbWUsIGNvbnN0cnVjdG9yLCBhcHBseVRvLCBwcm90b3R5cGUsIG1ldGhvZH0pIHtcblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YS5cblx0XHRcdFx0Ly8gSXQgaXMgcHV0IG9uIGEgdGVtcG9yYXJ5IG9iamVjdFxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHREZWx0YTogY29uc3RydWN0b3IsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBzcGVjaWZpYyBEZWx0YSBjbGFzc1xuXHRcdFx0XHRVLmV4dGVuZChfb3BUeXBlc1tuYW1lXS5EZWx0YS5wcm90b3R5cGUsIHByb3RvdHlwZSwge1xuXHRcdFx0XHRcdGNvbnN0cnVjdG9yOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHR0eXBlOiBuYW1lLFxuXHRcdFx0XHRcdGFwcGx5VG86IGFwcGx5VG9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhXG5cdFx0XHRcdC8vIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgdGhlIGZpcnN0IGRlbHRhIHR5cGUgdG8gYmUgZGVmaW5lZClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9XG5cdFx0XHRcdFx0XHRVLmlzRGVmaW5lZChtZXRob2QpID8gbWV0aG9kIDpcblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbiAocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW25hbWVdLCBwcm9wZXJ0eSwgdmFsdWVzKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZ2l2ZSBhIG5ldyBuYW1lIHRvIChhIHZhcmlhdGlvbiBvZikgYW4gZXhpc3RpbmcgZGVsdGEgb3BlcmF0aW9uIHR5cGVcblx0XHRcdF9hZGRPcGVyYXRpb25BbGlhcyh7bmFtZSwgdGFyZ2V0LCB0cmFuc2Zvcm19KSB7XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBtZXRob2QgZm9yIGFkZGluZyB0aGUgbmV3IG9wZXJhdGlvbiB0byBhIE1vZGlmeSBkZWx0YVxuXHRcdFx0XHR2YXIgb2JqZWN0V2l0aE1ldGhvZCA9IHt9O1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0V2l0aE1ldGhvZCwgbmFtZSwge1xuXHRcdFx0XHRcdHZhbHVlKHByb3BlcnR5LCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1t0YXJnZXRdLCBwcm9wZXJ0eSwgdHJhbnNmb3JtKHZhbHVlcykpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRcdF9vcFR5cGVzW25hbWVdID0ge1xuXHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0bWV0aG9kOiBvYmplY3RXaXRoTWV0aG9kW25hbWVdXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gbWFrZSB0aGUgb3BlcmF0aW9uIG1ldGhvZCBhdmFpbGFibGUgb24gdGhlICdtb2RpZnknIGRlbHRhIChhc3N1bWVzIHRoYXQgJ21vZGlmeScgaXMgZGVmaW5lZCBmaXJzdClcblx0XHRcdFx0X29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZVtuYW1lXSA9IF9vcFR5cGVzW25hbWVdLm1ldGhvZDtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBhZGQgYSBuZXcgdmFsaWQgY2FzZSBkaXN0aW5jdGlvbiBmb3IgZGVsdGEgY29tcG9zaXRpb25cblx0XHRcdF9hZGRDb21wb3NpdGlvblJ1bGUob3AxVHlwZSwgb3AyVHlwZSwgY29tcG9zZUZuKSB7XG5cdFx0XHRcdF9jb21wb3NlRm5zLnB1c2goeyBvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4gfSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBnZXQgYSBuZXcgZGVsdGEgb2YgYSBnaXZlbiB0eXBlLCBjb25zdHJ1Y3RlZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcblx0XHRcdF9uZXdEZWx0YSh0eXBlLCAuLi52YWx1ZXMpIHtcblx0XHRcdFx0cmV0dXJuIFUuYXBwbHlDb25zdHJ1Y3Rvcihfb3BUeXBlc1t0eXBlXS5EZWx0YSwgdmFsdWVzKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIHRoZSBtb2RpZnkgb3BlcmF0aW9uIChNVVNUIEJFIFRIRSBGSVJTVCBPUEVSQVRJT04gVFlQRSBUTyBCRSBERUZJTkVEKVxuXHRcdHZhciB0aGlzRE0gPSB0aGlzO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ21vZGlmeScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gTW9kaWZ5KGRlbHRhRGVzY3JpcHRpb24sIG9wZXJhdGlvbnMpIHtcblx0XHRcdFx0Ly8gbm9ybWFsaXplIHRoaW5nc1xuXHRcdFx0XHRkZWx0YURlc2NyaXB0aW9uID0gZGVsdGFEZXNjcmlwdGlvbiB8fCB7fTtcblx0XHRcdFx0dGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucyB8fCB7fTtcblxuXHRcdFx0XHQvLyBwcm9jZXNzIHBvc3NpYmxlIGRlbHRhIGRlc2NyaXB0aW9uXG5cdFx0XHRcdE9iamVjdC5rZXlzKGRlbHRhRGVzY3JpcHRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdFx0XHRcdHZhciBtYXRjaCA9IGtleS5tYXRjaCgvXihcXHcrKVxccysoW1xcd1xcLl0rKSQvKTtcblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdHZhciBvcGVyYXRpb24gPSBtYXRjaFsxXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eSA9IG1hdGNoWzJdO1xuXHRcdFx0XHRcdFx0VS5hc3NlcnQob3BlcmF0aW9uIGluIF9vcFR5cGVzLFxuXHRcdFx0XHRcdFx0XHRcdGBJIGRvbid0IGtub3cgdGhlICcke29wZXJhdGlvbn0nIG9wZXJhdGlvbi5gKTtcblx0XHRcdFx0XHRcdHRoaXNbb3BlcmF0aW9uXShwcm9wZXJ0eSwgZGVsdGFEZXNjcmlwdGlvbltrZXldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BlcnR5XWBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmpbcHJvcGVydHldKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmpbcHJvcGVydHldLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cHJvdG90eXBlOiB7XG5cdFx0XHRcdHNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9iamBcblx0XHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZChvYmopLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvcDIpKSB7IHJldHVybiB0aGlzIH1cblx0XHRcdFx0XHR2YXIgZm91bmRDb21wb3NlRm47XG5cdFx0XHRcdFx0X2NvbXBvc2VGbnMuc29tZSgoe29wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbn0pID0+IHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldLnR5cGUgPT09IG9wMVR5cGUgJiYgb3AyLnR5cGUgPT09IG9wMlR5cGUpIHtcblx0XHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4gPSBjb21wb3NlRm47XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChmb3VuZENvbXBvc2VGbikge1xuXHRcdFx0XHRcdFx0Zm91bmRDb21wb3NlRm4odGhpcywgcHJvcGVydHksIG9wMik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0YFlvdSBjYW5ub3QgZm9sbG93IGEgJyR7dGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XS50eXBlfScgb3BlcmF0aW9uIGAgK1xuXHRcdFx0XHRcdFx0XHRcdGB3aXRoIGEgJyR7b3AyLnR5cGV9JyBvcGVyYXRpb24gb24gdGhlIHNhbWUgcHJvcGVydHkuYFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGVyci5vcDEgPSB0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldLnR5cGU7XG5cdFx0XHRcdFx0XHRlcnIub3AyID0gb3AyLnR5cGU7XG5cdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRfYWRkT3BlcmF0aW9uKG9wVHlwZSwgcHJvcGVydHksIHZhbHVlcykge1xuXHRcdFx0XHRcdHZhciBkb3RJbmRleCA9IHByb3BlcnR5LmluZGV4T2YoJy4nKTtcblx0XHRcdFx0XHRpZiAoZG90SW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBkb3Qtc2VwYXJhdGVkIHBhdGg7IHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG1vZGlmeS1jaGFpblxuXHRcdFx0XHRcdFx0dmFyIGFjdHVhbFByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoMCwgZG90SW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIHJlc3RPZlByb3BlcnR5ID0gcHJvcGVydHkuc2xpY2UoZG90SW5kZXggKyAxKTtcblx0XHRcdFx0XHRcdHZhciBuZXdNb2RpZnlEZWx0YSA9IHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIGFjdHVhbFByb3BlcnR5KTtcblx0XHRcdFx0XHRcdHJldHVybiBuZXdNb2RpZnlEZWx0YVtvcFR5cGUubmFtZV0uYXBwbHkobmV3TW9kaWZ5RGVsdGEsIFtyZXN0T2ZQcm9wZXJ0eV0uY29uY2F0KHZhbHVlcykpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBzaW5nbGUgbmFtZTsgYWRkIHRoZSBuZXcgZGVsdGEgZGlyZWN0bHlcblx0XHRcdFx0XHRcdHZhciBfbmV3RGVsdGEgPSB0aGlzRE0uX25ld0RlbHRhLmFwcGx5KHRoaXNETSwgW29wVHlwZS5uYW1lXS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UocHJvcGVydHksIF9uZXdEZWx0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldID0gX25ld0RlbHRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWV0aG9kKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBwcm9wZXJ0eSwgW2RlbHRhRGVzY3JpcHRpb25dKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZGQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFkZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZXBsYWNlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlcGxhY2UnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAncmVtb3ZlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZW1vdmUoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZW1vdmUnKTtcblx0XHRcdFx0ZGVsZXRlIG9ialtwcm9wZXJ0eV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnZm9yYmlkJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBGb3JiaWQoKSB7fSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkgeyBhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2ZvcmJpZCcpIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gY29tcG9zaXRpb24gb2YgdGhlIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlcGxhY2UnLCAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnYWRkJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdtb2RpZnknLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRPYmplY3Qua2V5cyhkMi5vcGVyYXRpb25zKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGQxLmNvbXBvc2UocHJvcCwgZDIub3BlcmF0aW9uc1twcm9wXSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdhZGQnLCAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgncmVwbGFjZScsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2FkZCcsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cblxuXHRcdC8vICdhbHRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhbHRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWx0ZXIodmFsdWUsIGFsaWFzKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBbXTtcblx0XHRcdFx0dGhpcy5hbGlhcyA9IGFsaWFzIHx8ICdhbHRlcic7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sIHRoaXMuYWxpYXMpO1xuXHRcdFx0XHR0aGlzLnZhbHVlLmZvckVhY2goKHN1Yk9wKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHRcdHZhciBwYXJ0VHdvID0gc3ViT3AudmFsdWU7XG5cdFx0XHRcdFx0aWYgKHN1Yk9wLnR5cGUgPT09ICdwcmVwZW5kJykge1xuXHRcdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8qICdhcHBlbmQnIG9yICdpbnNlcnQnICovXG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0W10ucHVzaC5hcHBseShkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCBkMi52YWx1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgZDIuYWxpYXMpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gdGhlICdwcmVwZW5kJywgJ2luc2VydCcgYW5kICdhcHBlbmQnIG9wZXJhdGlvbiB0eXBlIGFsaWFzZXNcblx0XHRbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddLmZvckVhY2goKG9wVHlwZSkgPT4ge1xuXHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uQWxpYXMoe1xuXHRcdFx0XHRuYW1lOiBvcFR5cGUsXG5cdFx0XHRcdHRhcmdldDogJ2FsdGVyJyxcblx0XHRcdFx0dHJhbnNmb3JtOiAoYXJncykgPT4gW1t7IHR5cGU6IG9wVHlwZSwgdmFsdWU6IGFyZ3NbMF0gfV0sIG9wVHlwZV1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblx0XHQvLyAnYWZ0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnYWZ0ZXInLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFmdGVyKHZhbHVlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KHR5cGVvZiByZXNvbHZlUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBCZWZvcmUgY3JlYXRpbmcgYW4gJ2FmdGVyJyBvcGVyYXRpb24sIHlvdSBtdXN0IHJlZ2lzdGVyIGEgcHJvbWlzZSByZXNvbHZlciB3aXRoIGRlbHRhLmpzLmApO1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sICdhZnRlcicpO1xuXHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdHZhciBwYXJ0VHdvID0gdGhpcy52YWx1ZTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmVQcm9taXNlKHBhcnRPbmUuYXBwbHkodGhpcywgYXJncykpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsICdhZnRlcicpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2luc2VydCcsICdhZnRlcicsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ2luc2VydCcsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHQvKiBUT0RPOiB0aGUgYWJvdmUgY29tcG9zaXRpb25zIG9mICdpbnNlcnQnIGFuZCAnYWZ0ZXInIGFyZSBub3QgYWN0dWFsbHkgY29ycmVjdCAoZS5nLiwgbm90IGFzc29jaWF0aXZlKS4gKi9cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHR2YXIgX2dyYXBoID0gbmV3IEpzR3JhcGgoKTsgLyogZGVsdGFzIGluIGEgc3RyaWN0IHBhcnRpYWwgb3JkZXIgKi9cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBnZXQgdGhlIGdyYXBoIG9mIGRlbHRhc1xuXHRcdFx0Z3JhcGgoKSB7IHJldHVybiBfZ3JhcGggfVxuXHRcdH0pO1xuXG5cdFx0dmFyIF9kZWx0YUNvbmRpdGlvbnMgPSB7fTsgLyogYXJyYXlzIG9mIGFycmF5czogZGlzanVuY3RpdmUgbm9ybWFsIGZvcm1zICovXG5cdFx0dmFyIF9zZXR0bGVkRGVsdGFDb25kaXRpb25zID0ge307IC8qIEJvb2xlYW5zICovXG5cdFx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHRmdW5jdGlvbiBfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIGRpc2p1bmN0KSB7XG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdFx0fSBlbHNlIGlmIChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gIT09IHRydWUpIHtcblx0XHRcdFx0VS5hcnJheShfZGVsdGFDb25kaXRpb25zLCBkZWx0YU5hbWUpLnB1c2goZGlzanVuY3QpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdFx0aWYgKF9jb25kaXRpb25zVW5zZXR0bGVkKSB7XG5cdFx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdFx0XHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChkZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0pKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0XHRpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdLnNvbWUoKGRpc2p1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNqdW5jdC5ldmVyeSgoY29uanVuY3QpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tjb25qdW5jdF0pKSkge1xuXHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0Ly8gYSBjbGFzcyBvZiBhIHN0YW5kYXJkIG5hbWVkIGRlbHRhIHdpdGggbWV0YS1kYXRhIHRoYXQgaXMgcmVnaXN0ZXJlZCBpbnRvIHRoZSBkZWx0YSBtb2RlbFxuXHRcdHRoaXMuRGVsdGEgPSBVLm5ld1N1YmNsYXNzKF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YSwgZnVuY3Rpb24gRGVsdGEoc3VwZXJGbiwgZGVsdGFOYW1lLCBvcHRpb25zKSB7XG5cdFx0XHQvLyBjYWxsIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgJ21vZGlmeScgZGVsdGFcblx0XHRcdHN1cGVyRm4uY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuXHRcdFx0Ly8gcGVyZm9ybSBzYW5pdHkgY2hlY2tzXG5cdFx0XHRVLmFzc2VydChvcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdGBBIGRlbHRhIHNob3VsZCBiZSBnaXZlbiBhcyBhbiBvYmplY3QuYCk7XG5cdFx0XHQvLyBUT0RPOiBjaGVjayB1bmlxdWVuZXNzIG9mIGBkZWx0YU5hbWVgXG5cblx0XHRcdC8vIG1ha2UgdGhpcyBkZWx0YSBhIE1vZGlmeURlbHRhLCBzbyBydW4gaXRzIGNvbnN0cnVjdG9yXG5cdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEuYXBwbHkodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdC8vIGNyZWF0ZSBkZWx0YSBwcm9wZXJ0aWVzXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG5cdFx0XHRcdG5hbWU6IHsgZ2V0KCkgeyByZXR1cm4gZGVsdGFOYW1lIH0gfSxcblx0XHRcdFx0bWFudWFsbHlTZWxlY3RhYmxlOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ21hbnVhbGx5U2VsZWN0YWJsZSddKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gISFvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoVS5pc0RlZmluZWQob3B0aW9uc1sncmVzb2x2ZXMnXSkgJiYgb3B0aW9uc1sncmVzb2x2ZXMnXS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2VsZWN0ZWQ6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0XHRcdFx0cmV0dXJuICEhX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ2lmJ10gPT09IHRydWUgfHwgb3B0aW9uc1snaWYnXSA9PT0gZmFsc2UpIHsgLyogbGl0ZXJhbCAndHJ1ZScgb3IgJ2ZhbHNlJyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uc1snaWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snaWYnXSB8fCBvcHRpb25zWydpZmYnXSB8fCBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWZmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvKiBkZWZhdWx0OiBmYWxzZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbmx5SWY6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9uc1snb25seUlmJ10gPT09IHRydWUgfHwgb3B0aW9uc1snb25seUlmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ29ubHlJZiddO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zWydvbmx5SWYnXSB8fCBvcHRpb25zWydpZmYnXSB8fCBvcHRpb25zWydleHBlY3RzJ10gfHwgIG9wdGlvbnNbJ3Jlc29sdmVzJ10pIHsgLyogYXJyYXkgb2YgbmFtZXMgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ29ubHlJZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWZmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydleHBlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgeyAvKiBkZWZhdWx0OiB0cnVlICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0YWZ0ZXI6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2FmdGVyJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdHM6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3NlbGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHVwZGF0ZSBjb25kaXRpb25zXG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5pZikpIHsgX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0aGlzLmlmKSB9XG5cdFx0XHR0aGlzLnNlbGVjdHMuZm9yRWFjaCgob3RoZXJEZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3Qob3RoZXJEZWx0YU5hbWUsIFtkZWx0YU5hbWVdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgdGhlIGdyYXBoXG5cdFx0XHRfZ3JhcGguYWRkVmVydGV4KGRlbHRhTmFtZSwgdGhpcyk7XG5cdFx0XHR0aGlzLmFmdGVyLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdF9ncmFwaC5jcmVhdGVFZGdlKG90aGVyRGVsdGFOYW1lLCBkZWx0YU5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0XHRVLmFzc2VydCghX2dyYXBoLmhhc0N5Y2xlKCksXG5cdFx0XHRcdFx0YFRoZSBkZWx0YSAke2RlbHRhTmFtZX0gaW50cm9kdWNlZCBhIGN5Y2xlIGluIHRoZSBhcHBsaWNhdGlvbiBvcmRlci5gKTtcblxuXHRcdH0pO1xuXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBzZWxlY3QgYSBudW1iZXIgb2YgZGVsdGFzIGJ5IG5hbWUsIHNvIHRoZXkgd2lsbCBiZSBhcHBsaWVkIHdoZW4gYXBwbGljYWJsZVxuXHRcdFx0c2VsZWN0KC4uLmRlbHRhTmFtZXMpIHtcblx0XHRcdFx0ZGVsdGFOYW1lcy5mb3JFYWNoKChkZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0XHRfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIHJlZ2lzdGVyIGEgbmFtZWQgdmFyaWF0aW9uIHBvaW50IGluIHRoZSBjb2RlLWJhc2Vcblx0XHRcdC8vIChpLmUuLCBhcHBseSBhbGwgcmVnaXN0ZXJlZCBkZWx0YXMgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIHZhbHVlKVxuXHRcdFx0dnAodnBOYW1lLCB2YWwpIHtcblxuXHRcdFx0XHQvLyBhIHRlbXBvcmFyeSBvYmplY3QgdG8gaG9sZCB0aGUgdmFsdWUgd2hpbGUgaXQgaXMgdW5kZXJnb2luZyBjaGFuZ2Vcblx0XHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0XHRvYmpbdnBOYW1lXSA9IHZhbDtcblxuXHRcdFx0XHQvLyBjaGVjayBpZiBhbnkgJ29ubHlJZicgY29uZGl0aW9ucyBhcmUgYmVpbmcgdmlvbGF0ZWRcblx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0X2dyYXBoLmVhY2hWZXJ0ZXgoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0VS5hc3NlcnQoIWRlbHRhLnNlbGVjdGVkIHx8IGRlbHRhLm9ubHlJZiA9PT0gdHJ1ZSB8fCBkZWx0YS5vbmx5SWYuZXZlcnkoKGQpID0+IF9ncmFwaC52ZXJ0ZXhWYWx1ZShkKS5zZWxlY3RlZCksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ29ubHlJZicgY29uZGl0aW9uIG9mIGRlbHRhICcke2RlbHRhLm5hbWV9JyB3YXMgdmlvbGF0ZWQuYCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGFwcGx5IHRoZSBwcm9wZXIgZGVsdGFzXG5cdFx0XHRcdF9ncmFwaC50b3BvbG9naWNhbGx5KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdGlmIChkZWx0YS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0ZGVsdGEuc2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgdnBOYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIHJldHVybiB0aGUgdHJhbnNmb3JtZWQgdmFsdWVcblx0XHRcdFx0cmV0dXJuIG9ialt2cE5hbWVdO1xuXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0dmFyIHJlc29sdmVQcm9taXNlID0gbnVsbDtcblx0VS5leHRlbmQoRGVsdGFNb2RlbCwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0LyogcmV0dXJuIHRoZSBtYWluIGRlbHRhIG1vZGVsIGNsYXNzICovXG5cdHJldHVybiBEZWx0YU1vZGVsO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVsdGEuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWlzYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImRlbHRhLmpzIn0=