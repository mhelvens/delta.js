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
	        appliedAfter: {get: function() {
	            return [].concat(options['appliedAfter'] || [], options['expects'] || [], options['resolves'] || [], options['requires'] || []);
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
	      this.appliedAfter.forEach((function(otherDeltaName) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMjk3N2NiOGY0NmI3MjdmZTcyZCIsIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taXNjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVksd0JBQVcsQ0FBRywwQ0FBVSxPQUFNLENBQUc7QUFDcEQsY0FBVyxDQUFDO0FBT1IsZUFBUSxJQUFJLFNBQUMsQ0FBSyxHQUFDLEVBQUM7QUFDcEIsZ0JBQVMsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsV0FBVyxDQUFFLEVBQUMsRUFBSSxHQUFDO0dBQUUsRUFBQztBQUNyRCw2QkFBc0IsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtBQUFFLE1BQUMsUUFBUyxD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aXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YU1vZGVsXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhTW9kZWxcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjI5NzdjYjhmNDZiNzI3ZmU3MmRcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvdyAqL1xuXHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdHZhciBrZWVwU2Vjb25kID0gKGQxLCBwLCBkMikgPT4geyBkMS5vcGVyYXRpb25zW3BdID0gZDIgfTtcblx0dmFyIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlID0gKGQxLCBwLCBkMikgPT4geyBkMi5hcHBseVRvKGQxLm9wZXJhdGlvbnNbcF0sICd2YWx1ZScpIH07XG5cblx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydCh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGEgZnVuY3Rpb24uYCk7XG5cdH1cblxuXHRmdW5jdGlvbiBhc3NlcnREZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydFVuZGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodmFsKSxcblx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgdW5kZWZpbmVkLmApO1xuXHR9XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0Ly8gdGhlIGRlbHRhLW1vZGVsIGNsYXNzLCB3aGljaCBpcyB0aGUgY29udGFpbmVyIG9mIGFsbCBvcGVyYXRpb24gdHlwZXMsXG5cdC8vIGFsbCBkZWx0YXMsIHRoZWlyIG9yZGVyaW5nIGFuZCBydWxlc1xuXHR2YXIgRGVsdGFNb2RlbCA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gQWNjdW11bGF0ZWQgZGF0YSBmb3IgdGhlIGF2YWlsYWJsZSBkZWx0YSBvcGVyYXRpb24gdHlwZXNcblx0XHR2YXIgX29wVHlwZXMgPSB7fTsgLy8gdGhlIG5hbWUgYW5kIGRlbHRhIGNsYXNzZXNcblx0XHR2YXIgX2NvbXBvc2VGbnMgPSBbXTsgLy8gdGhlIGNhc2UgZGlzdGluY3Rpb25zIG9mIGRlbHRhIGNvbXBvc2l0aW9uXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZnVsbHkgZGVmaW5lIGEgbmV3IGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uVHlwZSh7bmFtZSwgY29uc3RydWN0b3IsIGFwcGx5VG8sIHByb3RvdHlwZSwgbWV0aG9kfSkge1xuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhLlxuXHRcdFx0XHQvLyBJdCBpcyBwdXQgb24gYSB0ZW1wb3Jhcnkgb2JqZWN0XG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdERlbHRhOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIHNwZWNpZmljIERlbHRhIGNsYXNzXG5cdFx0XHRcdFUuZXh0ZW5kKF9vcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdFx0YXBwbHlUbzogYXBwbHlUb1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGFcblx0XHRcdFx0Ly8gKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyB0aGUgZmlyc3QgZGVsdGEgdHlwZSB0byBiZSBkZWZpbmVkKVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID1cblx0XHRcdFx0XHRcdFUuaXNEZWZpbmVkKG1ldGhvZCkgPyBtZXRob2QgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbbmFtZV0sIHByb3BlcnR5LCB2YWx1ZXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBnaXZlIGEgbmV3IG5hbWUgdG8gKGEgdmFyaWF0aW9uIG9mKSBhbiBleGlzdGluZyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvbkFsaWFzKHtuYW1lLCB0YXJnZXQsIHRyYW5zZm9ybX0pIHtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW3RhcmdldF0sIHByb3BlcnR5LCB0cmFuc2Zvcm0odmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID0gX29wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBhIG5ldyB2YWxpZCBjYXNlIGRpc3RpbmN0aW9uIGZvciBkZWx0YSBjb21wb3NpdGlvblxuXHRcdFx0X2FkZENvbXBvc2l0aW9uUnVsZShvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4pIHtcblx0XHRcdFx0X2NvbXBvc2VGbnMucHVzaCh7IG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbiB9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIGdldCBhIG5ldyBkZWx0YSBvZiBhIGdpdmVuIHR5cGUsIGNvbnN0cnVjdGVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuXHRcdFx0X25ld0RlbHRhKHR5cGUsIC4uLnZhbHVlcykge1xuXHRcdFx0XHRyZXR1cm4gVS5hcHBseUNvbnN0cnVjdG9yKF9vcFR5cGVzW3R5cGVdLkRlbHRhLCB2YWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gdGhlIG1vZGlmeSBvcGVyYXRpb24gKE1VU1QgQkUgVEhFIEZJUlNUIE9QRVJBVElPTiBUWVBFIFRPIEJFIERFRklORUQpXG5cdFx0dmFyIHRoaXNETSA9IHRoaXM7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnbW9kaWZ5Jyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBNb2RpZnkoZGVsdGFEZXNjcmlwdGlvbiA9IHt9LCBvcGVyYXRpb25zID0ge30pIHtcblx0XHRcdFx0dGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcblx0XHRcdFx0Ly8gcHJvY2VzcyBwb3NzaWJsZSBkZWx0YSBkZXNjcmlwdGlvblxuXHRcdFx0XHRPYmplY3Qua2V5cyhkZWx0YURlc2NyaXB0aW9uKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBrZXkubWF0Y2goL14oXFx3KylcXHMrKFtcXHdcXC5dKykkLyk7XG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0XHR2YXIgb3BlcmF0aW9uID0gbWF0Y2hbMV07XG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBtYXRjaFsyXTtcblx0XHRcdFx0XHRcdFUuYXNzZXJ0KG9wZXJhdGlvbiBpbiBfb3BUeXBlcyxcblx0XHRcdFx0XHRcdFx0XHRgSSBkb24ndCBrbm93IHRoZSAnJHtvcGVyYXRpb259JyBvcGVyYXRpb24uYCk7XG5cdFx0XHRcdFx0XHR0aGlzW29wZXJhdGlvbl0ocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb25ba2V5XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKHByb3BlcnR5KSkge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBwYXNzZWQsIGFwcGx5IHRoaXMgZGVsdGEgdG8gYG9ialtwcm9wZXJ0eV1gXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqW3Byb3BlcnR5XSksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqW3Byb3BlcnR5XSwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMub3BlcmF0aW9ucykuZm9yRWFjaCgoc3ViUHJvcGVydHkpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHByb3RvdHlwZToge1xuXHRcdFx0XHRzZWxlY3RpdmVseUFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSkge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpgXG5cdFx0XHRcdFx0VS5hc3NlcnQoVS5pc0RlZmluZWQob2JqKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYWxyZWFkeSBkZWZpbmVkLmApO1xuXHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y29tcG9zZShwcm9wZXJ0eSwgb3AyKSB7XG5cdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQob3AyKSkgeyByZXR1cm4gdGhpcyB9XG5cdFx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRcdF9jb21wb3NlRm5zLnNvbWUoKHtvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm59KSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XS50eXBlID09PSBvcDFUeXBlICYmIG9wMi50eXBlID09PSBvcDJUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoZm91bmRDb21wb3NlRm4pIHtcblx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuKHRoaXMsIHByb3BlcnR5LCBvcDIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgZXJyID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdGBZb3UgY2Fubm90IGZvbGxvdyBhICcke3RoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0udHlwZX0nIG9wZXJhdGlvbiBgICtcblx0XHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRlcnIub3AxID0gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XS50eXBlO1xuXHRcdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3BlcnR5LCB2YWx1ZXMpIHtcblx0XHRcdFx0XHR2YXIgZG90SW5kZXggPSBwcm9wZXJ0eS5pbmRleE9mKCcuJyk7XG5cdFx0XHRcdFx0aWYgKGRvdEluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gdGhlIHByb3BlcnR5IGlzIGEgZG90LXNlcGFyYXRlZCBwYXRoOyByZWN1cnNpdmVseSBjcmVhdGUgYSBtb2RpZnktY2hhaW5cblx0XHRcdFx0XHRcdHZhciBhY3R1YWxQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKDAsIGRvdEluZGV4KTtcblx0XHRcdFx0XHRcdHZhciByZXN0T2ZQcm9wZXJ0eSA9IHByb3BlcnR5LnNsaWNlKGRvdEluZGV4ICsgMSk7XG5cdFx0XHRcdFx0XHR2YXIgbmV3TW9kaWZ5RGVsdGEgPSB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBhY3R1YWxQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3TW9kaWZ5RGVsdGFbb3BUeXBlLm5hbWVdLmFwcGx5KG5ld01vZGlmeURlbHRhLCBbcmVzdE9mUHJvcGVydHldLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcHJvcGVydHkgaXMgYSBzaW5nbGUgbmFtZTsgYWRkIHRoZSBuZXcgZGVsdGEgZGlyZWN0bHlcblx0XHRcdFx0XHRcdHZhciBfbmV3RGVsdGEgPSB0aGlzRE0uX25ld0RlbHRhLmFwcGx5KHRoaXNETSwgW29wVHlwZS5uYW1lXS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcGVyYXRpb25zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBVLmlzRGVmaW5lZCh0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmNvbXBvc2UocHJvcGVydHksIF9uZXdEZWx0YSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbcHJvcGVydHldID0gX25ld0RlbHRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bWV0aG9kKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbJ21vZGlmeSddLCBwcm9wZXJ0eSwgW2RlbHRhRGVzY3JpcHRpb25dKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZGQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFkZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnRVbmRlZmluZWQob2JqW3Byb3BlcnR5XSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZXBsYWNlJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBSZXBsYWNlKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlcGxhY2UnKTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IHRoaXMudmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7IC8vIFRPRE86IGRvY3VtZW50IHRoaXMgb3BlcmF0aW9uXG5cdFx0XHRuYW1lOiAncmVwbGFjZUFyb3VuZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVwbGFjZUFyb3VuZCh2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWUgfSxcblx0XHRcdGFwcGx5VG8ob2JqLCBwcm9wZXJ0eSkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdyZXBsYWNlQXJvdW5kJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlKG9ialtwcm9wZXJ0eV0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlbW92ZScsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gUmVtb3ZlKCkge30sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVtb3ZlJyk7XG5cdFx0XHRcdGRlbGV0ZSBvYmpbcHJvcGVydHldO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2ZvcmJpZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gRm9yYmlkKCkge30sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHsgYXNzZXJ0VW5kZWZpbmVkKG9ialtwcm9wZXJ0eV0sICdmb3JiaWQnKSB9XG5cdFx0fSk7XG5cblxuXHRcdC8vIGNvbXBvc2l0aW9uIG9mIHRoZSBzdGFuZGFyZCBvcGVyYXRpb24gdHlwZXNcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZXBsYWNlJywgKGQxLCBwLCBkMikgPT4geyBkMS5vcGVyYXRpb25zW3BdID0gRGVsdGFNb2RlbC5fbmV3RGVsdGEoJ2FkZCcsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdtb2RpZnknLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVtb3ZlJywgKGQxLCBwKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnZm9yYmlkJykgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblxuXHRcdC8vdGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVwbGFjZUFyb3VuZCcsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTsgLy8gdG9vIHRyaWNreSByaWdodCBub3c7IG11c3QgcmVmYWN0b3Jcblx0XHQvL3RoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZUFyb3VuZCcsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0Ly90aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2VBcm91bmQnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdC8vdGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlQXJvdW5kJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdC8vdGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlQXJvdW5kJywgJ3JlcGxhY2VBcm91bmQnLCBrZWVwU2Vjb25kKTtcblxuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdtb2RpZnknLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRPYmplY3Qua2V5cyhkMi5vcGVyYXRpb25zKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0XHRcdGQxLmNvbXBvc2UocHJvcCwgZDIub3BlcmF0aW9uc1twcm9wXSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdhZGQnLCAoZDEsIHAsIGQyKSA9PiB7IGQxLm9wZXJhdGlvbnNbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgncmVwbGFjZScsIGQyLnZhbHVlKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlbW92ZScsICdmb3JiaWQnLCBrZWVwRmlyc3QpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2FkZCcsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnZm9yYmlkJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cblxuXHRcdC8vICdhbHRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhbHRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWx0ZXIodmFsdWUsIGFsaWFzKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBbXTtcblx0XHRcdFx0dGhpcy5hbGlhcyA9IGFsaWFzIHx8ICdhbHRlcic7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sIHRoaXMuYWxpYXMpO1xuXHRcdFx0XHR0aGlzLnZhbHVlLmZvckVhY2goKHN1Yk9wKSA9PiB7XG5cdFx0XHRcdFx0dmFyIHBhcnRPbmUgPSBvYmpbcHJvcGVydHldO1xuXHRcdFx0XHRcdHZhciBwYXJ0VHdvID0gc3ViT3AudmFsdWU7XG5cdFx0XHRcdFx0aWYgKHN1Yk9wLnR5cGUgPT09ICdwcmVwZW5kJykge1xuXHRcdFx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0XHRcdHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdHBhcnRPbmUuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0gZWxzZSB7IC8qICdhcHBlbmQnIG9yICdpbnNlcnQnICovXG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FsdGVyJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0W10ucHVzaC5hcHBseShkMS5vcGVyYXRpb25zW3BdLnZhbHVlLCBkMi52YWx1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDEub3BlcmF0aW9uc1twXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsIGQyLmFsaWFzKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ2FsdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgZDIuYWxpYXMpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gdGhlICdwcmVwZW5kJywgJ2luc2VydCcgYW5kICdhcHBlbmQnIG9wZXJhdGlvbiB0eXBlIGFsaWFzZXNcblx0XHRbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddLmZvckVhY2goKG9wVHlwZSkgPT4ge1xuXHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uQWxpYXMoe1xuXHRcdFx0XHRuYW1lOiBvcFR5cGUsXG5cdFx0XHRcdHRhcmdldDogJ2FsdGVyJyxcblx0XHRcdFx0dHJhbnNmb3JtOiAoYXJncykgPT4gW1t7IHR5cGU6IG9wVHlwZSwgdmFsdWU6IGFyZ3NbMF0gfV0sIG9wVHlwZV1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblx0XHQvLyAnYWZ0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnYWZ0ZXInLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFmdGVyKHZhbHVlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KHR5cGVvZiByZXNvbHZlUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBCZWZvcmUgY3JlYXRpbmcgYW4gJ2FmdGVyJyBvcGVyYXRpb24sIHlvdSBtdXN0IHJlZ2lzdGVyIGEgcHJvbWlzZSByZXNvbHZlciB3aXRoIGRlbHRhLmpzLmApO1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sICdhZnRlcicpO1xuXHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdHZhciBwYXJ0VHdvID0gdGhpcy52YWx1ZTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmVQcm9taXNlKHBhcnRPbmUuYXBwbHkodGhpcywgYXJncykpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDEub3BlcmF0aW9uc1twXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxLm9wZXJhdGlvbnNbcF0udmFsdWUsICdhZnRlcicpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2luc2VydCcsICdhZnRlcicsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ2luc2VydCcsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHQvKiBUT0RPOiB0aGUgYWJvdmUgY29tcG9zaXRpb25zIG9mICdpbnNlcnQnIGFuZCAnYWZ0ZXInIGFyZSBub3QgYWN0dWFsbHkgY29ycmVjdCAoZS5nLiwgbm90IGFzc29jaWF0aXZlKS4gKi9cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHR2YXIgX2dyYXBoID0gbmV3IEpzR3JhcGgoKTsgLyogZGVsdGFzIGluIGEgc3RyaWN0IHBhcnRpYWwgb3JkZXIgKi9cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBnZXQgdGhlIGdyYXBoIG9mIGRlbHRhc1xuXHRcdFx0Z3JhcGgoKSB7IHJldHVybiBfZ3JhcGggfVxuXHRcdH0pO1xuXG5cdFx0dmFyIF9kZWx0YUNvbmRpdGlvbnMgPSB7fTsgLyogYXJyYXlzIG9mIGFycmF5czogZGlzanVuY3RpdmUgbm9ybWFsIGZvcm1zICovXG5cdFx0dmFyIF9zZXR0bGVkRGVsdGFDb25kaXRpb25zID0ge307IC8qIEJvb2xlYW5zICovXG5cdFx0dmFyIF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cblx0XHRmdW5jdGlvbiBfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIGRpc2p1bmN0KSB7XG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoZGlzanVuY3QgPT09IHRydWUpIHtcblx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKGRpc2p1bmN0ID09PSBmYWxzZSkge1xuXHRcdFx0XHQvLyBjaGFuZ2Ugbm90aGluZ1xuXHRcdFx0fSBlbHNlIGlmIChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gIT09IHRydWUpIHtcblx0XHRcdFx0VS5hcnJheShfZGVsdGFDb25kaXRpb25zLCBkZWx0YU5hbWUpLnB1c2goZGlzanVuY3QpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXR0bGVDb25kaXRpb25zKCkge1xuXHRcdFx0aWYgKF9jb25kaXRpb25zVW5zZXR0bGVkKSB7XG5cdFx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gZmFsc2U7XG5cdFx0XHRcdHZhciBzb21ldGhpbmdDaGFuZ2VkO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChkZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0pKSB7IHJldHVybiB9XG5cdFx0XHRcdFx0XHRpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdLnNvbWUoKGRpc2p1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNqdW5jdC5ldmVyeSgoY29uanVuY3QpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tjb25qdW5jdF0pKSkge1xuXHRcdFx0XHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0c29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gd2hpbGUgKHNvbWV0aGluZ0NoYW5nZWQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cdFx0Ly8gYSBjbGFzcyBvZiBhIHN0YW5kYXJkIG5hbWVkIGRlbHRhIHdpdGggbWV0YS1kYXRhIHRoYXQgaXMgcmVnaXN0ZXJlZCBpbnRvIHRoZSBkZWx0YSBtb2RlbFxuXHRcdHRoaXMuRGVsdGEgPSBVLm5ld1N1YmNsYXNzKF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YSwgZnVuY3Rpb24gRGVsdGEoc3VwZXJGbiwgZGVsdGFOYW1lLCBvcHRpb25zID0ge30pIHtcblx0XHRcdC8vIGNhbGwgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSAnbW9kaWZ5JyBkZWx0YVxuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBwZXJmb3JtIHNhbml0eSBjaGVja3Ncblx0XHRcdFUuYXNzZXJ0KG9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0YEEgZGVsdGEgc2hvdWxkIGJlIGdpdmVuIGFzIGFuIG9iamVjdC5gKTtcblx0XHRcdC8vIFRPRE86IGNoZWNrIHVuaXF1ZW5lc3Mgb2YgYGRlbHRhTmFtZWBcblxuXHRcdFx0Ly8vLyBtYWtlIHRoaXMgZGVsdGEgYSBNb2RpZnlEZWx0YSwgc28gcnVuIGl0cyBjb25zdHJ1Y3RvclxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLCBvcHRpb25zKTtcblx0XHRcdC8vX29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBjcmVhdGUgZGVsdGEgcHJvcGVydGllc1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0XHRuYW1lOiB7IGdldCgpIHsgcmV0dXJuIGRlbHRhTmFtZSB9IH0sXG5cdFx0XHRcdG1hbnVhbGx5U2VsZWN0YWJsZToge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydtYW51YWxseVNlbGVjdGFibGUnXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhb3B0aW9uc1snbWFudWFsbHlTZWxlY3RhYmxlJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pICYmIG9wdGlvbnNbJ3Jlc29sdmVzJ10ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdGVkOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdHJldHVybiAhIV9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpZjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydpZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2lmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ2lmJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ2lmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snaWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogZmFsc2UgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0b25seUlmOiB7XG5cdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ29ubHlJZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ29ubHlJZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zWydvbmx5SWYnXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9uc1snb25seUlmJ10gfHwgb3B0aW9uc1snaWZmJ10gfHwgb3B0aW9uc1snZXhwZWN0cyddIHx8ICBvcHRpb25zWydyZXNvbHZlcyddKSB7IC8qIGFycmF5IG9mIG5hbWVzICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydvbmx5SWYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGxpZWRBZnRlcjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snYXBwbGllZEFmdGVyJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVxdWlyZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlbGVjdHM6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3NlbGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHVwZGF0ZSBjb25kaXRpb25zXG5cdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5pZikpIHsgX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0aGlzLmlmKSB9XG5cdFx0XHR0aGlzLnNlbGVjdHMuZm9yRWFjaCgob3RoZXJEZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3Qob3RoZXJEZWx0YU5hbWUsIFtkZWx0YU5hbWVdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyB1cGRhdGUgdGhlIGdyYXBoXG5cdFx0XHRfZ3JhcGguYWRkVmVydGV4KGRlbHRhTmFtZSwgdGhpcyk7XG5cdFx0XHR0aGlzLmFwcGxpZWRBZnRlci5mb3JFYWNoKChvdGhlckRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRfZ3JhcGguY3JlYXRlRWRnZShvdGhlckRlbHRhTmFtZSwgZGVsdGFOYW1lKTtcblx0XHRcdH0pO1xuXHRcdFx0VS5hc3NlcnQoIV9ncmFwaC5oYXNDeWNsZSgpLFxuXHRcdFx0XHRcdGBUaGUgZGVsdGEgJHtkZWx0YU5hbWV9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHR9KTtcblxuXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gc2VsZWN0IGEgbnVtYmVyIG9mIGRlbHRhcyBieSBuYW1lLCBzbyB0aGV5IHdpbGwgYmUgYXBwbGllZCB3aGVuIGFwcGxpY2FibGVcblx0XHRcdHNlbGVjdCguLi5kZWx0YU5hbWVzKSB7XG5cdFx0XHRcdGRlbHRhTmFtZXMuZm9yRWFjaCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyByZWdpc3RlciBhIG5hbWVkIHZhcmlhdGlvbiBwb2ludCBpbiB0aGUgY29kZS1iYXNlXG5cdFx0XHQvLyAoaS5lLiwgYXBwbHkgYWxsIHJlZ2lzdGVyZWQgZGVsdGFzIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSlcblx0XHRcdHZwKHZwTmFtZSwgdmFsKSB7XG5cblx0XHRcdFx0Ly8gYSB0ZW1wb3Jhcnkgb2JqZWN0IHRvIGhvbGQgdGhlIHZhbHVlIHdoaWxlIGl0IGlzIHVuZGVyZ29pbmcgY2hhbmdlXG5cdFx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdFx0b2JqW3ZwTmFtZV0gPSB2YWw7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYW55ICdvbmx5SWYnIGNvbmRpdGlvbnMgYXJlIGJlaW5nIHZpb2xhdGVkXG5cdFx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRcdF9ncmFwaC5lYWNoVmVydGV4KChuYW1lLCBkZWx0YSkgPT4ge1xuXHRcdFx0XHRcdFUuYXNzZXJ0KCFkZWx0YS5zZWxlY3RlZCB8fCBkZWx0YS5vbmx5SWYgPT09IHRydWUgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBfZ3JhcGgudmVydGV4VmFsdWUoZCkuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdvbmx5SWYnIGNvbmRpdGlvbiBvZiBkZWx0YSAnJHtkZWx0YS5uYW1lfScgd2FzIHZpb2xhdGVkLmApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgcHJvcGVyIGRlbHRhc1xuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRpZiAoZGVsdGEuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLnNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIHZwTmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyByZXR1cm4gdGhlIHRyYW5zZm9ybWVkIHZhbHVlXG5cdFx0XHRcdHJldHVybiBvYmpbdnBOYW1lXTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdHZhciByZXNvbHZlUHJvbWlzZSA9IG51bGw7XG5cdFUuZXh0ZW5kKERlbHRhTW9kZWwsIHtcblx0XHRyZWdpc3RlclByb21pc2VSZXNvbHZlcihwcm9taXNlUmVzb2x2ZXJGbikge1xuXHRcdFx0cmVzb2x2ZVByb21pc2UgPSBwcm9taXNlUmVzb2x2ZXJGbjtcblx0XHR9XG5cdH0pO1xuXG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdC8qIHJldHVybiB0aGUgbWFpbiBkZWx0YSBtb2RlbCBjbGFzcyAqL1xuXHRyZXR1cm4gRGVsdGFNb2RlbDtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkpzR3JhcGhcIixcImNvbW1vbmpzMlwiOlwianMtZ3JhcGhcIixcImNvbW1vbmpzXCI6XCJqcy1ncmFwaFwiLFwiYW1kXCI6XCJqcy1ncmFwaFwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSkge1xuXHRcdFx0cHJvdG90eXBlID0gcHJvdG90eXBlIHx8IHt9O1xuXHRcdFx0dmFyIGNscyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IHN1YmNsYXNzLCBnaXZlbiBhIHN1cGVyY2xhc3MsIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdTdWJjbGFzcyhzdXBlckNsYXNzLCBjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgW3N1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yXS5jb25jYXQoYXJncykpO1xuXHRcdFx0fTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGV4dGVuZCB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzXG5cdFx0Ly8gb2YgdGhlIG90aGVyIG9iamVjdHMsIGZyb20gbGVmdCB0byByaWdodCwgYW5kIHJldHVybnNcblx0XHQvLyB0aGUgZmlyc3QgcGFzc2VkIG9iamVjdFxuXHRcdGV4dGVuZChvYmoxLCAuLi5yZXN0KSB7XG5cdFx0XHRyZXN0LmZvckVhY2goKG9iaikgPT4ge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRvYmoxW2tleV0gPSBvYmpba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9XG5cdH07XG5cblx0cmV0dXJuIFU7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21pc2MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJkZWx0YS5qcyJ9