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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(JsGraph, U) {
	  'use strict';
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
	          applyTo: applyTo,
	          compose: function(property, op2) {
	            var $__0 = this;
	            if (U.isUndefined(op2)) {
	              return this;
	            }
	            var foundComposeFn;
	            _composeFns.some((function($__5) {
	              var $__6 = $__5,
	                  op1Type = $__6.op1Type,
	                  op2Type = $__6.op2Type,
	                  composeFn = $__6.composeFn;
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
	      d1[p] = DeltaModel._newDelta('add', d2.value);
	    }));
	    this._addCompositionRule('add', 'modify', applySecondToFirstValue);
	    this._addCompositionRule('add', 'remove', (function(d1, p) {
	      d1[p] = DeltaModel._newDelta('forbid');
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
	      d1[p] = DeltaModel._newDelta('replace', d2.value);
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
	      [].push.apply(d1[p].value, d2.value);
	    }));
	    this._addCompositionRule('alter', 'replace', keepSecond);
	    this._addCompositionRule('alter', 'remove', (function(d1, p) {
	      d1[p] = DeltaModel._newDelta('forbid');
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
	      assertFunction(d1[p].value, 'after');
	      applySecondToFirstValue(d1, p, d2);
	    }));
	    this._addCompositionRule('replace', 'after', (function(d1, p, d2) {
	      assertFunction(d1[p].value, 'after');
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
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkM2Q1ODYwMjViZmYwOTgxYTc5NyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9kZWx0YS5qcyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8vc291cmNlL21pc2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBWSx3QkFBVyxDQUFHLDBDQUFVLE9BQU0sQ0FBRztBQUNwRCxjQUFXLENBQUM7QUFPUixlQUFRLElBQUksU0FBQyxDQUFLLEdBQUMsRUFBQztBQUNwQixnQkFBUyxJQUFJLFNBQUMsRUFBQyxDQUFHLEdBQUcsR0FBQyxDQUFNO0FBQUUsTUFBQyxDQUFFLEVBQUMsRUFBSSxHQUFDO0dBQUUsRUFBQztBQUMxQyw2QkFBc0IsSUFBSSxTQUFDLEVBQUMsQ0FBRyxHQUFHLEdBQUMsQ0FBTTtB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Q0FBRyxLQUFHLENBQUM7S0FBRTtBQUkxRCxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsMEJBQWUsRUFBSSxjQUFZLEtBQUssTUFBTyxDQUFDLGFBQVksQ0FBRyxFQUFDLElBQUcsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUNuRixZQUFPLElBQUksaUJBQWdCLEVBQUMsQ0FBQztLQUM5QjtBQUlBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBQUEsR0FDcEQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZDNkNTg2MDI1YmZmMDk4MWE3OTdcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvd1xuXHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdHZhciBrZWVwU2Vjb25kID0gKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IGQyIH07XG5cdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMVtwXSwgJ3ZhbHVlJykgfTtcblxuXHRmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdH1cblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyB0aGUgZGVsdGEtbW9kZWwgY2xhc3MsIHdoaWNoIGlzIHRoZSBjb250YWluZXIgb2YgYWxsIG9wZXJhdGlvbiB0eXBlcyxcblx0Ly8gYWxsIGRlbHRhcywgdGhlaXIgb3JkZXJpbmcgYW5kIHJ1bGVzXG5cdHZhciBEZWx0YU1vZGVsID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHZhciBfb3BUeXBlcyA9IHt9O1xuXHRcdC8qIHRoZSBuYW1lIGFuZCBkZWx0YSBjbGFzc2VzICovXG5cdFx0dmFyIF9jb21wb3NlRm5zID0gW107XG5cdFx0LyogdGhlIGNhc2UgZGlzdGluY3Rpb25zIG9mIGRlbHRhIGNvbXBvc2l0aW9uICovXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZnVsbHkgZGVmaW5lIGEgbmV3IGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uVHlwZSh7bmFtZSwgY29uc3RydWN0b3IsIGFwcGx5VG8sIHByb3RvdHlwZSwgbWV0aG9kfSkge1xuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhLlxuXHRcdFx0XHQvLyBJdCBpcyBwdXQgb24gYSB0ZW1wb3Jhcnkgb2JqZWN0XG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdERlbHRhOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIHNwZWNpZmljIERlbHRhIGNsYXNzXG5cdFx0XHRcdFUuZXh0ZW5kKF9vcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdFx0YXBwbHlUbzogYXBwbHlUbyxcblx0XHRcdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wMikpIHsgcmV0dXJuIHRoaXMgfVxuXHRcdFx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0X2NvbXBvc2VGbnMuc29tZSgoe29wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbn0pID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gb3AxVHlwZSAmJiBvcDIudHlwZSA9PT0gb3AyVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChmb3VuZENvbXBvc2VGbikge1xuXHRcdFx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbih0aGlzLCBwcm9wZXJ0eSwgb3AyKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRgWW91IGNhbm5vdCBmb2xsb3cgYSAnJHt0aGlzLnR5cGV9JyBvcGVyYXRpb24gYCArXG5cdFx0XHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMSA9IHRoaXMudHlwZTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGFcblx0XHRcdFx0Ly8gKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyB0aGUgZmlyc3QgZGVsdGEgdHlwZSB0byBiZSBkZWZpbmVkKVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID1cblx0XHRcdFx0XHRcdFUuaXNEZWZpbmVkKG1ldGhvZCkgPyBtZXRob2QgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbbmFtZV0sIHByb3BlcnR5LCB2YWx1ZXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBnaXZlIGEgbmV3IG5hbWUgdG8gKGEgdmFyaWF0aW9uIG9mKSBhbiBleGlzdGluZyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvbkFsaWFzKHtuYW1lLCB0YXJnZXQsIHRyYW5zZm9ybX0pIHtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW3RhcmdldF0sIHByb3BlcnR5LCB0cmFuc2Zvcm0odmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID0gX29wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBhIG5ldyB2YWxpZCBjYXNlIGRpc3RpbmN0aW9uIGZvciBkZWx0YSBjb21wb3NpdGlvblxuXHRcdFx0X2FkZENvbXBvc2l0aW9uUnVsZShvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4pIHtcblx0XHRcdFx0X2NvbXBvc2VGbnMucHVzaCh7IG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbiB9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIGdldCBhIG5ldyBkZWx0YSBvZiBhIGdpdmVuIHR5cGUsIGNvbnN0cnVjdGVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuXHRcdFx0X25ld0RlbHRhKHR5cGUsIC4uLnZhbHVlcykge1xuXHRcdFx0XHRyZXR1cm4gVS5hcHBseUNvbnN0cnVjdG9yKF9vcFR5cGVzW3R5cGVdLkRlbHRhLCB2YWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gdGhlIG1vZGlmeSBvcGVyYXRpb24gKE1VU1QgQkUgVEhFIEZJUlNUIE9QRVJBVElPTiBUWVBFIFRPIEJFIERFRklORUQpXG5cdFx0dmFyIHRoaXNETSA9IHRoaXM7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnbW9kaWZ5Jyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBNb2RpZnkoZGVsdGFEZXNjcmlwdGlvbiwgb3BlcmF0aW9ucykge1xuXHRcdFx0XHQvLyBub3JtYWxpemUgdGhpbmdzXG5cdFx0XHRcdGRlbHRhRGVzY3JpcHRpb24gPSBkZWx0YURlc2NyaXB0aW9uIHx8IHt9O1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zIHx8IHt9O1xuXG5cdFx0XHRcdC8vIHByb2Nlc3MgcG9zc2libGUgZGVsdGEgZGVzY3JpcHRpb25cblx0XHRcdFx0T2JqZWN0LmtleXMoZGVsdGFEZXNjcmlwdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoID0ga2V5Lm1hdGNoKC9eKFxcdyspXFxzKyhbXFx3XFwuXSspJC8pO1xuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0dmFyIG9wZXJhdGlvbiA9IG1hdGNoWzFdO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gbWF0Y2hbMl07XG5cdFx0XHRcdFx0XHRVLmFzc2VydChvcGVyYXRpb24gaW4gX29wVHlwZXMsXG5cdFx0XHRcdFx0XHRcdFx0YEkgZG9uJ3Qga25vdyB0aGUgJyR7b3BlcmF0aW9ufScgb3BlcmF0aW9uLmApO1xuXHRcdFx0XHRcdFx0dGhpc1tvcGVyYXRpb25dKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uW2tleV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wZXJ0eSkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpbcHJvcGVydHldYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9ialtwcm9wZXJ0eV0sIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwcm90b3R5cGU6IHtcblx0XHRcdFx0c2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XSkpIHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0dmFyIGRvdEluZGV4ID0gcHJvcGVydHkuaW5kZXhPZignLicpO1xuXHRcdFx0XHRcdGlmIChkb3RJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIGRvdC1zZXBhcmF0ZWQgcGF0aDsgcmVjdXJzaXZlbHkgY3JlYXRlIGEgbW9kaWZ5LWNoYWluXG5cdFx0XHRcdFx0XHR2YXIgYWN0dWFsUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZSgwLCBkb3RJbmRleCk7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdE9mUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZShkb3RJbmRleCArIDEpO1xuXHRcdFx0XHRcdFx0dmFyIG5ld01vZGlmeURlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzWydtb2RpZnknXSwgYWN0dWFsUHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld01vZGlmeURlbHRhW29wVHlwZS5uYW1lXS5hcHBseShuZXdNb2RpZnlEZWx0YSwgW3Jlc3RPZlByb3BlcnR5XS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIHNpbmdsZSBuYW1lOyBhZGQgdGhlIG5ldyBkZWx0YSBkaXJlY3RseVxuXHRcdFx0XHRcdFx0dmFyIF9uZXdEZWx0YSA9IHRoaXNETS5fbmV3RGVsdGEuYXBwbHkodGhpc0RNLCBbb3BUeXBlLm5hbWVdLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShwcm9wZXJ0eSwgX25ld0RlbHRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0gPSBfbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZXRob2QocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb24pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIHByb3BlcnR5LCBbZGVsdGFEZXNjcmlwdGlvbl0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FkZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWRkKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnYWRkJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlcGxhY2UnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlcGxhY2UodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVwbGFjZScpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZW1vdmUnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlbW92ZSgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3Byb3BlcnR5XTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdmb3JiaWQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEZvcmJpZCgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7IGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnZm9yYmlkJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvLyBjb21wb3NpdGlvbiBvZiB0aGUgc3RhbmRhcmQgb3BlcmF0aW9uIHR5cGVzXG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVwbGFjZScsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnYWRkJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnZm9yYmlkJykgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ21vZGlmeScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0T2JqZWN0LmtleXMoZDIub3BlcmF0aW9ucykuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdFx0XHRkMS5jb21wb3NlKHByb3AsIGQyLm9wZXJhdGlvbnNbcHJvcF0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZW1vdmUnLCAnYWRkJywgKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IERlbHRhTW9kZWwuX25ld0RlbHRhKCdyZXBsYWNlJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnYWRkJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblxuXG5cdFx0Ly8gJ2FsdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FsdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBbHRlcih2YWx1ZSwgYWxpYXMpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXHRcdFx0XHR0aGlzLmFsaWFzID0gYWxpYXMgfHwgJ2FsdGVyJztcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgdGhpcy5hbGlhcyk7XG5cdFx0XHRcdHRoaXMudmFsdWUuZm9yRWFjaCgoc3ViT3ApID0+IHtcblx0XHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHBhcnRUd28gPSBzdWJPcC52YWx1ZTtcblx0XHRcdFx0XHRpZiAoc3ViT3AudHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSBlbHNlIHsgLyogJ2FwcGVuZCcgb3IgJ2luc2VydCcgKi9cblx0XHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRbXS5wdXNoLmFwcGx5KGQxW3BdLnZhbHVlLCBkMi52YWx1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBEZWx0YU1vZGVsLl9uZXdEZWx0YSgnZm9yYmlkJykgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgZDIuYWxpYXMpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgZDIuYWxpYXMpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblxuXG5cdFx0Ly8gdGhlICdwcmVwZW5kJywgJ2luc2VydCcgYW5kICdhcHBlbmQnIG9wZXJhdGlvbiB0eXBlIGFsaWFzZXNcblx0XHRbJ3ByZXBlbmQnLCAnaW5zZXJ0JywgJ2FwcGVuZCddLmZvckVhY2goKG9wVHlwZSkgPT4ge1xuXHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uQWxpYXMoe1xuXHRcdFx0XHRuYW1lOiBvcFR5cGUsXG5cdFx0XHRcdHRhcmdldDogJ2FsdGVyJyxcblx0XHRcdFx0dHJhbnNmb3JtOiAoYXJncykgPT4gW1t7IHR5cGU6IG9wVHlwZSwgdmFsdWU6IGFyZ3NbMF0gfV0sIG9wVHlwZV1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblx0XHQvLyAnYWZ0ZXInIG9wZXJhdGlvbiB0eXBlXG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnYWZ0ZXInLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEFmdGVyKHZhbHVlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KHR5cGVvZiByZXNvbHZlUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBCZWZvcmUgY3JlYXRpbmcgYW4gJ2FmdGVyJyBvcGVyYXRpb24sIHlvdSBtdXN0IHJlZ2lzdGVyIGEgcHJvbWlzZSByZXNvbHZlciB3aXRoIGRlbHRhLmpzLmApO1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydEZ1bmN0aW9uKG9ialtwcm9wZXJ0eV0sICdhZnRlcicpO1xuXHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdHZhciBwYXJ0VHdvID0gdGhpcy52YWx1ZTtcblx0XHRcdFx0b2JqW3Byb3BlcnR5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc29sdmVQcm9taXNlKHBhcnRPbmUuYXBwbHkodGhpcywgYXJncykpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcnRUd28uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlcGxhY2UnLCBrZWVwU2Vjb25kKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FmdGVyJywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ2FmdGVyJywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0YXNzZXJ0RnVuY3Rpb24oZDFbcF0udmFsdWUsICdhZnRlcicpO1xuXHRcdFx0YXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUoZDEsIHAsIGQyKTtcblx0XHR9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnaW5zZXJ0JywgJ2FmdGVyJywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAnaW5zZXJ0JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdC8qIFRPRE86IHRoZSBhYm92ZSBjb21wb3NpdGlvbnMgb2YgJ2luc2VydCcgYW5kICdhZnRlcicgYXJlIG5vdCBhY3R1YWxseSBjb3JyZWN0IChlLmcuLCBub3QgYXNzb2NpYXRpdmUpLiAqL1xuXG5cblx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHRcdHZhciBfZ3JhcGggPSBuZXcgSnNHcmFwaCgpOyAvKiBkZWx0YXMgaW4gYSBzdHJpY3QgcGFydGlhbCBvcmRlciAqL1xuXHRcdFUuZXh0ZW5kKHRoaXMsIHtcblx0XHRcdC8vIGdldCB0aGUgZ3JhcGggb2YgZGVsdGFzXG5cdFx0XHRncmFwaCgpIHsgcmV0dXJuIF9ncmFwaCB9XG5cdFx0fSk7XG5cblx0XHR2YXIgX2RlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBhcnJheXMgb2YgYXJyYXlzOiBkaXNqdW5jdGl2ZSBub3JtYWwgZm9ybXMgKi9cblx0XHR2YXIgX3NldHRsZWREZWx0YUNvbmRpdGlvbnMgPSB7fTsgLyogQm9vbGVhbnMgKi9cblx0XHR2YXIgX2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblxuXHRcdGZ1bmN0aW9uIF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgZGlzanVuY3QpIHtcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChkaXNqdW5jdCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoZGlzanVuY3QgPT09IGZhbHNlKSB7XG5cdFx0XHRcdC8vIGNoYW5nZSBub3RoaW5nXG5cdFx0XHR9IGVsc2UgaWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSAhPT0gdHJ1ZSkge1xuXHRcdFx0XHRVLmFycmF5KF9kZWx0YUNvbmRpdGlvbnMsIGRlbHRhTmFtZSkucHVzaChkaXNqdW5jdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX3NldHRsZUNvbmRpdGlvbnMoKSB7XG5cdFx0XHRpZiAoX2NvbmRpdGlvbnNVbnNldHRsZWQpIHtcblx0XHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSBmYWxzZTtcblx0XHRcdFx0dmFyIHNvbWV0aGluZ0NoYW5nZWQ7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG5cdFx0XHRcdFx0X2dyYXBoLmVhY2hWZXJ0ZXgoKGRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0pIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkpIHsgcmV0dXJuIH1cblx0XHRcdFx0XHRcdGlmIChfZGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0uc29tZSgoZGlzanVuY3QpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRpc2p1bmN0LmV2ZXJ5KChjb25qdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2Nvbmp1bmN0XSkpKSB7XG5cdFx0XHRcdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSB3aGlsZSAoc29tZXRoaW5nQ2hhbmdlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHQvLyBhIGNsYXNzIG9mIGEgc3RhbmRhcmQgbmFtZWQgZGVsdGEgd2l0aCBtZXRhLWRhdGEgdGhhdCBpcyByZWdpc3RlcmVkIGludG8gdGhlIGRlbHRhIG1vZGVsXG5cdFx0dGhpcy5EZWx0YSA9IFUubmV3U3ViY2xhc3MoX29wVHlwZXNbJ21vZGlmeSddLkRlbHRhLCBmdW5jdGlvbiBEZWx0YShzdXBlckZuLCBkZWx0YU5hbWUsIG9wdGlvbnMpIHtcblx0XHRcdC8vIGNhbGwgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSAnbW9kaWZ5JyBkZWx0YVxuXHRcdFx0c3VwZXJGbi5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG5cdFx0XHQvLyBwZXJmb3JtIHNhbml0eSBjaGVja3Ncblx0XHRcdFUuYXNzZXJ0KG9wdGlvbnMgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0YEEgZGVsdGEgc2hvdWxkIGJlIGdpdmVuIGFzIGFuIG9iamVjdC5gKTtcblx0XHRcdC8vIFRPRE86IGNoZWNrIHVuaXF1ZW5lc3Mgb2YgYGRlbHRhTmFtZWBcblxuXHRcdFx0Ly8gbWFrZSB0aGlzIGRlbHRhIGEgTW9kaWZ5RGVsdGEsIHNvIHJ1biBpdHMgY29uc3RydWN0b3Jcblx0XHRcdF9vcFR5cGVzWydtb2RpZnknXS5EZWx0YS5hcHBseSh0aGlzLCBvcHRpb25zKTtcblxuXHRcdFx0Ly8gY3JlYXRlIGRlbHRhIHByb3BlcnRpZXNcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcblx0XHRcdFx0bmFtZTogeyBnZXQoKSB7IHJldHVybiBkZWx0YU5hbWUgfSB9LFxuXHRcdFx0XHRtYW51YWxseVNlbGVjdGFibGU6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQob3B0aW9uc1snbWFudWFsbHlTZWxlY3RhYmxlJ10pKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAhIW9wdGlvbnNbJ21hbnVhbGx5U2VsZWN0YWJsZSddO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChVLmlzRGVmaW5lZChvcHRpb25zWydyZXNvbHZlcyddKSAmJiBvcHRpb25zWydyZXNvbHZlcyddLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWxlY3RlZDoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdF9zZXR0bGVDb25kaXRpb25zKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gISFfc2V0dGxlZERlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0aWY6IHtcblx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9uc1snaWYnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydpZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zWydpZiddO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zWydpZiddIHx8IG9wdGlvbnNbJ2lmZiddIHx8IG9wdGlvbnNbJ3Jlc29sdmVzJ10pIHsgLyogYXJyYXkgb2YgbmFtZXMgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIFtdLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2lmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZmYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8qIGRlZmF1bHQ6IGZhbHNlICovXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9ubHlJZjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydvbmx5SWYnXSA9PT0gdHJ1ZSB8fCBvcHRpb25zWydvbmx5SWYnXSA9PT0gZmFsc2UpIHsgLyogbGl0ZXJhbCAndHJ1ZScgb3IgJ2ZhbHNlJyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uc1snb25seUlmJ107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ29ubHlJZiddIHx8IG9wdGlvbnNbJ2lmZiddIHx8IG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCAgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snb25seUlmJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZmYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7IC8qIGRlZmF1bHQ6IHRydWUgKi9cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhZnRlcjoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snYWZ0ZXInXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydleHBlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2VsZWN0czoge1xuXHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snc2VsZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3JlcXVpcmVzJ10gfHwgW11cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gdXBkYXRlIGNvbmRpdGlvbnNcblx0XHRcdF9jb25kaXRpb25zVW5zZXR0bGVkID0gdHJ1ZTtcblx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmlmKSkgeyBfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIHRoaXMuaWYpIH1cblx0XHRcdHRoaXMuc2VsZWN0cy5mb3JFYWNoKChvdGhlckRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRfcmVnaXN0ZXJEaXNqdW5jdChvdGhlckRlbHRhTmFtZSwgW2RlbHRhTmFtZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHVwZGF0ZSB0aGUgZ3JhcGhcblx0XHRcdF9ncmFwaC5hZGRWZXJ0ZXgoZGVsdGFOYW1lLCB0aGlzKTtcblx0XHRcdHRoaXMuYWZ0ZXIuZm9yRWFjaCgob3RoZXJEZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0X2dyYXBoLmNyZWF0ZUVkZ2Uob3RoZXJEZWx0YU5hbWUsIGRlbHRhTmFtZSk7XG5cdFx0XHR9KTtcblx0XHRcdFUuYXNzZXJ0KCFfZ3JhcGguaGFzQ3ljbGUoKSxcblx0XHRcdFx0XHRgVGhlIGRlbHRhICR7ZGVsdGFOYW1lfSBpbnRyb2R1Y2VkIGEgY3ljbGUgaW4gdGhlIGFwcGxpY2F0aW9uIG9yZGVyLmApO1xuXG5cdFx0fSk7XG5cblxuXHRcdFUuZXh0ZW5kKHRoaXMsIHtcblx0XHRcdC8vIHNlbGVjdCBhIG51bWJlciBvZiBkZWx0YXMgYnkgbmFtZSwgc28gdGhleSB3aWxsIGJlIGFwcGxpZWQgd2hlbiBhcHBsaWNhYmxlXG5cdFx0XHRzZWxlY3QoLi4uZGVsdGFOYW1lcykge1xuXHRcdFx0XHRkZWx0YU5hbWVzLmZvckVhY2goKGRlbHRhTmFtZSkgPT4ge1xuXHRcdFx0XHRcdF9yZWdpc3RlckRpc2p1bmN0KGRlbHRhTmFtZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gcmVnaXN0ZXIgYSBuYW1lZCB2YXJpYXRpb24gcG9pbnQgaW4gdGhlIGNvZGUtYmFzZVxuXHRcdFx0Ly8gKGkuZS4sIGFwcGx5IGFsbCByZWdpc3RlcmVkIGRlbHRhcyBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgdmFsdWUpXG5cdFx0XHR2cCh2cE5hbWUsIHZhbCkge1xuXG5cdFx0XHRcdC8vIGEgdGVtcG9yYXJ5IG9iamVjdCB0byBob2xkIHRoZSB2YWx1ZSB3aGlsZSBpdCBpcyB1bmRlcmdvaW5nIGNoYW5nZVxuXHRcdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRcdG9ialt2cE5hbWVdID0gdmFsO1xuXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFueSAnb25seUlmJyBjb25kaXRpb25zIGFyZSBiZWluZyB2aW9sYXRlZFxuXHRcdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRVLmFzc2VydCghZGVsdGEuc2VsZWN0ZWQgfHwgZGVsdGEub25seUlmID09PSB0cnVlIHx8IGRlbHRhLm9ubHlJZi5ldmVyeSgoZCkgPT4gX2dyYXBoLnZlcnRleFZhbHVlKGQpLnNlbGVjdGVkKSxcblx0XHRcdFx0XHRcdFx0YFRoZSAnb25seUlmJyBjb25kaXRpb24gb2YgZGVsdGEgJyR7ZGVsdGEubmFtZX0nIHdhcyB2aW9sYXRlZC5gKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gYXBwbHkgdGhlIHByb3BlciBkZWx0YXNcblx0XHRcdFx0X2dyYXBoLnRvcG9sb2dpY2FsbHkoKG5hbWUsIGRlbHRhKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGRlbHRhLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRkZWx0YS5zZWxlY3RpdmVseUFwcGx5VG8ob2JqLCB2cE5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gcmV0dXJuIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZVxuXHRcdFx0XHRyZXR1cm4gb2JqW3ZwTmFtZV07XG5cblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHR2YXIgcmVzb2x2ZVByb21pc2UgPSBudWxsO1xuXHQvL25vaW5zcGVjdGlvbiBKU1VudXNlZEdsb2JhbFN5bWJvbHNcblx0VS5leHRlbmQoRGVsdGFNb2RlbCwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cblx0Ly8gcmV0dXJuIHRoZSBtYWluIGRlbHRhIG1vZGVsIGNsYXNzXG5cdHJldHVybiBEZWx0YU1vZGVsO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvZGVsdGEuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBbc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3JdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9taXNjLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==