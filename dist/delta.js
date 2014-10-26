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
	    Object.defineProperty(this, 'ModifyDelta', {get: function() {
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
	  });
	  var PartiallyOrderedDM = U.newSubclass(ExtendedDM, function() {
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
	    U.extend(this, {
	      Delta: function(deltaName, options) {
	        U.assert(options instanceof Object, "A delta should be given as an object.");
	        this.ModifyDelta.apply(this, options);
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
	      },
	      select: function() {
	        for (var deltaNames = [],
	            $__1 = 0; $__1 < arguments.length; $__1++)
	          deltaNames[$__1] = arguments[$__1];
	        deltaNames.forEach((function(deltaName) {
	          _registerDisjunct(deltaName, true);
	        }));
	      },
	      vp: function(vpName, val) {
	        var obj = {};
	        obj[vpName] = val;
	        _settleConditions();
	        _graph.eachVertex((function(name, delta) {
	          U.assert(!delta.selected || delta.onlyIf.every((function(d) {
	            return _graph.vertexValue(d).selected;
	          })), ("The 'onlyIf' condition of delta '" + delta.name + "' was violated."));
	        }));
	        _graph.topologically((function(name, delta) {
	          if (delta.selected) {
	            delta.selectivelyApplyTo(obj, name);
	          }
	        }));
	        return obj[vpName];
	      }
	    });
	  });
	  var resolvePromise = null;
	  U.extend(PartiallyOrderedDM, {registerPromiseResolver: function(promiseResolverFn) {
	      resolvePromise = promiseResolverFn;
	    }});
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
	


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkY2I5YjU1ZGVhZWI2ZmFkYjUzMSIsIndlYnBhY2s6Ly8vL3NvdXJjZS9kZWx0YS5qcyIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMCIsIndlYnBhY2s6Ly8vL3NvdXJjZS9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9Iiwid2VicGFjazovLy8vc291cmNlL21pc2MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBWSx3QkFBVyxDQUFHLDBDQUFVLE9BQU0sQ0FBRztBQUNwRCxjQUFXLENBQUM7QUFNUixZQUFLLEVBQUksV0FBVSxDQUFDLFNBQVU7QUFHN0IsZ0JBQU8sRUFBSSxHQUFDLENBQUM7QUFFYixtQkFBVSxFQUFJLEdBQUMsQ0FBQztBQUdwQixZQUFRLENBQUMsSUFBRyxDQUFHO0FBR2QsdUJBQWdCLENBQWhCLFVBQWtCLElBQThDOztBQUE3QyxnQkFBRztBQUFHLHVCQUFVO0FBQUcsbUJB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Q0FBQyxHQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRyxLQUFHLENBQUM7S0FBRTtBQUkxRCxvQkFBZSxDQUFmLFVBQWlCLGFBQVksQ0FBRyxLQUFHLENBQUc7QUFDakMsMEJBQWUsRUFBSSxjQUFZLEtBQUssTUFBTyxDQUFDLGFBQVksQ0FBRyxFQUFDLElBQUcsQ0FBQyxPQUFRLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztBQUNuRixZQUFPLElBQUksaUJBQWdCLEVBQUMsQ0FBQztLQUM5QjtBQUlBLFVBQUssQ0FBTCxVQUFPLFNBQVEsQ0FBRyxRQUFNLENBQUc7QUFDMUIsVUFBSSxDQUFDLFNBQVEsQ0FBRztBQUFFLGFBQU0sSUFBSSxNQUFLLENBQUMsT0FBTSxHQUFLLG1CQUFpQixDQUFDO09BQUU7QUFBQSxLQUNsRTtBQUdBLGVBQVUsQ0FBVixVQUFZLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBR3JELGFBQVEsQ0FBUixVQUFVLEdBQUUsQ0FBRztBQUFFLFlBQU8sT0FBTyxJQUFFLElBQU0sWUFBVTtLQUFFO0FBQUEsR0FDcEQsQ0FBQztBQUVELFFBQU8sR0FBQztBQUNULHdKQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcy1ncmFwaFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcy1ncmFwaFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJEZWx0YUpzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianMtZ3JhcGhcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRlbHRhSnNcIl0gPSBmYWN0b3J5KHJvb3RbXCJKc0dyYXBoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGNiOWI1NWRlYWViNmZhZGI1MzFcbiAqKi8iLCJkZWZpbmUoWydqcy1ncmFwaCcsICcuL21pc2MuanMnXSwgZnVuY3Rpb24gKEpzR3JhcGgsIFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0Ly8gdGhlIGRlbHRhLW1vZGVsIGNsYXNzLCB3aGljaCBpcyB0aGUgY29udGFpbmVyIG9mIGFsbCBvcGVyYXRpb24gdHlwZXMsXG5cdC8vIGFsbCBkZWx0YXMsIHRoZWlyIG9yZGVyaW5nIGFuZCBydWxlc1xuXHR2YXIgQ29yZURNID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBBY2N1bXVsYXRlZCBkYXRhIGZvciB0aGUgYXZhaWxhYmxlIGRlbHRhIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHZhciBfb3BUeXBlcyA9IHt9O1xuXHRcdC8qIHRoZSBuYW1lIGFuZCBkZWx0YSBjbGFzc2VzICovXG5cdFx0dmFyIF9jb21wb3NlRm5zID0gW107XG5cdFx0LyogdGhlIGNhc2UgZGlzdGluY3Rpb25zIG9mIGRlbHRhIGNvbXBvc2l0aW9uICovXG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cblx0XHRcdC8vIGEgZnVuY3Rpb24gdG8gZnVsbHkgZGVmaW5lIGEgbmV3IGRlbHRhIG9wZXJhdGlvbiB0eXBlXG5cdFx0XHRfYWRkT3BlcmF0aW9uVHlwZSh7bmFtZSwgY29uc3RydWN0b3IsIGFwcGx5VG8sIHByb3RvdHlwZSwgbWV0aG9kfSkge1xuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhLlxuXHRcdFx0XHQvLyBJdCBpcyBwdXQgb24gYSB0ZW1wb3Jhcnkgb2JqZWN0XG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cblx0XHRcdFx0Ly8gZGVmaW5lIHRoZSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0XHRfb3BUeXBlc1tuYW1lXSA9IHtcblx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdERlbHRhOiBjb25zdHJ1Y3Rvcixcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIHNwZWNpZmljIERlbHRhIGNsYXNzXG5cdFx0XHRcdFUuZXh0ZW5kKF9vcFR5cGVzW25hbWVdLkRlbHRhLnByb3RvdHlwZSwgcHJvdG90eXBlLCB7XG5cdFx0XHRcdFx0Y29uc3RydWN0b3I6IGNvbnN0cnVjdG9yLFxuXHRcdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdFx0YXBwbHlUbzogYXBwbHlUbyxcblx0XHRcdFx0XHRjb21wb3NlKHByb3BlcnR5LCBvcDIpIHtcblx0XHRcdFx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9wMikpIHsgcmV0dXJuIHRoaXMgfVxuXHRcdFx0XHRcdFx0dmFyIGZvdW5kQ29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0X2NvbXBvc2VGbnMuc29tZSgoe29wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbn0pID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMudHlwZSA9PT0gb3AxVHlwZSAmJiBvcDIudHlwZSA9PT0gb3AyVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvdW5kQ29tcG9zZUZuID0gY29tcG9zZUZuO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChmb3VuZENvbXBvc2VGbikge1xuXHRcdFx0XHRcdFx0XHRmb3VuZENvbXBvc2VGbih0aGlzLCBwcm9wZXJ0eSwgb3AyKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRgWW91IGNhbm5vdCBmb2xsb3cgYSAnJHt0aGlzLnR5cGV9JyBvcGVyYXRpb24gYCArXG5cdFx0XHRcdFx0XHRcdFx0XHRgd2l0aCBhICcke29wMi50eXBlfScgb3BlcmF0aW9uIG9uIHRoZSBzYW1lIHByb3BlcnR5LmBcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMSA9IHRoaXMudHlwZTtcblx0XHRcdFx0XHRcdFx0ZXJyLm9wMiA9IG9wMi50eXBlO1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGFcblx0XHRcdFx0Ly8gKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyB0aGUgZmlyc3QgZGVsdGEgdHlwZSB0byBiZSBkZWZpbmVkKVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID1cblx0XHRcdFx0XHRcdFUuaXNEZWZpbmVkKG1ldGhvZCkgPyBtZXRob2QgOlxuXHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uIChwcm9wZXJ0eSwgLi4udmFsdWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hZGRPcGVyYXRpb24oX29wVHlwZXNbbmFtZV0sIHByb3BlcnR5LCB2YWx1ZXMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gYSBmdW5jdGlvbiB0byBnaXZlIGEgbmV3IG5hbWUgdG8gKGEgdmFyaWF0aW9uIG9mKSBhbiBleGlzdGluZyBkZWx0YSBvcGVyYXRpb24gdHlwZVxuXHRcdFx0X2FkZE9wZXJhdGlvbkFsaWFzKHtuYW1lLCB0YXJnZXQsIHRyYW5zZm9ybX0pIHtcblxuXHRcdFx0XHQvLyBkZWZpbmUgdGhlIG1ldGhvZCBmb3IgYWRkaW5nIHRoZSBuZXcgb3BlcmF0aW9uIHRvIGEgTW9kaWZ5IGRlbHRhXG5cdFx0XHRcdHZhciBvYmplY3RXaXRoTWV0aG9kID0ge307XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3RXaXRoTWV0aG9kLCBuYW1lLCB7XG5cdFx0XHRcdFx0dmFsdWUocHJvcGVydHksIC4uLnZhbHVlcykge1xuXHRcdFx0XHRcdFx0dGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzW3RhcmdldF0sIHByb3BlcnR5LCB0cmFuc2Zvcm0odmFsdWVzKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGRlZmluZSB0aGUgb3BlcmF0aW9uIHR5cGVcblx0XHRcdFx0X29wVHlwZXNbbmFtZV0gPSB7XG5cdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRtZXRob2Q6IG9iamVjdFdpdGhNZXRob2RbbmFtZV1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBtYWtlIHRoZSBvcGVyYXRpb24gbWV0aG9kIGF2YWlsYWJsZSBvbiB0aGUgJ21vZGlmeScgZGVsdGEgKGFzc3VtZXMgdGhhdCAnbW9kaWZ5JyBpcyBkZWZpbmVkIGZpcnN0KVxuXHRcdFx0XHRfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEucHJvdG90eXBlW25hbWVdID0gX29wVHlwZXNbbmFtZV0ubWV0aG9kO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBhIGZ1bmN0aW9uIHRvIGFkZCBhIG5ldyB2YWxpZCBjYXNlIGRpc3RpbmN0aW9uIGZvciBkZWx0YSBjb21wb3NpdGlvblxuXHRcdFx0X2FkZENvbXBvc2l0aW9uUnVsZShvcDFUeXBlLCBvcDJUeXBlLCBjb21wb3NlRm4pIHtcblx0XHRcdFx0X2NvbXBvc2VGbnMucHVzaCh7IG9wMVR5cGUsIG9wMlR5cGUsIGNvbXBvc2VGbiB9KTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIGdldCBhIG5ldyBkZWx0YSBvZiBhIGdpdmVuIHR5cGUsIGNvbnN0cnVjdGVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuXHRcdFx0X25ld0RlbHRhKHR5cGUsIC4uLnZhbHVlcykge1xuXHRcdFx0XHRyZXR1cm4gVS5hcHBseUNvbnN0cnVjdG9yKF9vcFR5cGVzW3R5cGVdLkRlbHRhLCB2YWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gYW4gZWFzeSB3YXkgdG8gZ2V0IHRoZSAnbW9kaWZ5JyBkZWx0YSBjb25zdHJ1Y3RvclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnTW9kaWZ5RGVsdGEnLCB7XG5cdFx0XHRnZXQoKSB7IHJldHVybiBfb3BUeXBlc1snbW9kaWZ5J10uRGVsdGEgfVxuXHRcdH0pO1xuXG5cdFx0Ly8gdGhlIG1vZGlmeSBvcGVyYXRpb24gKE1VU1QgQkUgVEhFIEZJUlNUIE9QRVJBVElPTiBUWVBFIFRPIEJFIERFRklORUQpXG5cdFx0dmFyIHRoaXNETSA9IHRoaXM7XG5cdFx0dGhpcy5fYWRkT3BlcmF0aW9uVHlwZSh7XG5cdFx0XHRuYW1lOiAnbW9kaWZ5Jyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBNb2RpZnkoZGVsdGFEZXNjcmlwdGlvbiwgb3BlcmF0aW9ucykge1xuXHRcdFx0XHQvLyBub3JtYWxpemUgdGhpbmdzXG5cdFx0XHRcdGRlbHRhRGVzY3JpcHRpb24gPSBkZWx0YURlc2NyaXB0aW9uIHx8IHt9O1xuXHRcdFx0XHR0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zIHx8IHt9O1xuXG5cdFx0XHRcdC8vIHByb2Nlc3MgcG9zc2libGUgZGVsdGEgZGVzY3JpcHRpb25cblx0XHRcdFx0T2JqZWN0LmtleXMoZGVsdGFEZXNjcmlwdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoID0ga2V5Lm1hdGNoKC9eKFxcdyspXFxzKyhbXFx3XFwuXSspJC8pO1xuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0dmFyIG9wZXJhdGlvbiA9IG1hdGNoWzFdO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gbWF0Y2hbMl07XG5cdFx0XHRcdFx0XHRVLmFzc2VydChvcGVyYXRpb24gaW4gX29wVHlwZXMsXG5cdFx0XHRcdFx0XHRcdFx0YEkgZG9uJ3Qga25vdyB0aGUgJyR7b3BlcmF0aW9ufScgb3BlcmF0aW9uLmApO1xuXHRcdFx0XHRcdFx0dGhpc1tvcGVyYXRpb25dKHByb3BlcnR5LCBkZWx0YURlc2NyaXB0aW9uW2tleV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZChwcm9wZXJ0eSkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgcGFzc2VkLCBhcHBseSB0aGlzIGRlbHRhIHRvIGBvYmpbcHJvcGVydHldYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9ialtwcm9wZXJ0eV0pLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdtb2RpZnknIG9wZXJhdGlvbiBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBhbHJlYWR5IGRlZmluZWQuYCk7XG5cdFx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5vcGVyYXRpb25zKS5mb3JFYWNoKChzdWJQcm9wZXJ0eSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XS5hcHBseVRvKG9ialtwcm9wZXJ0eV0sIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9wZXJhdGlvbnMpLmZvckVhY2goKHN1YlByb3BlcnR5KSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wZXJhdGlvbnNbc3ViUHJvcGVydHldLmFwcGx5VG8ob2JqLCBzdWJQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRwcm90b3R5cGU6IHtcblx0XHRcdFx0c2VsZWN0aXZlbHlBcHBseVRvKG9iaiwgc3ViUHJvcGVydHkpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYFxuXHRcdFx0XHRcdFUuYXNzZXJ0KFUuaXNEZWZpbmVkKG9iaiksXG5cdFx0XHRcdFx0XHRcdGBUaGUgJ21vZGlmeScgb3BlcmF0aW9uIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIGFscmVhZHkgZGVmaW5lZC5gKTtcblx0XHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodGhpcy5vcGVyYXRpb25zW3N1YlByb3BlcnR5XSkpIHtcblx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1tzdWJQcm9wZXJ0eV0uYXBwbHlUbyhvYmosIHN1YlByb3BlcnR5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdF9hZGRPcGVyYXRpb24ob3BUeXBlLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XG5cdFx0XHRcdFx0dmFyIGRvdEluZGV4ID0gcHJvcGVydHkuaW5kZXhPZignLicpO1xuXHRcdFx0XHRcdGlmIChkb3RJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIGRvdC1zZXBhcmF0ZWQgcGF0aDsgcmVjdXJzaXZlbHkgY3JlYXRlIGEgbW9kaWZ5LWNoYWluXG5cdFx0XHRcdFx0XHR2YXIgYWN0dWFsUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZSgwLCBkb3RJbmRleCk7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdE9mUHJvcGVydHkgPSBwcm9wZXJ0eS5zbGljZShkb3RJbmRleCArIDEpO1xuXHRcdFx0XHRcdFx0dmFyIG5ld01vZGlmeURlbHRhID0gdGhpcy5fYWRkT3BlcmF0aW9uKF9vcFR5cGVzWydtb2RpZnknXSwgYWN0dWFsUHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ld01vZGlmeURlbHRhW29wVHlwZS5uYW1lXS5hcHBseShuZXdNb2RpZnlEZWx0YSwgW3Jlc3RPZlByb3BlcnR5XS5jb25jYXQodmFsdWVzKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIHRoZSBwcm9wZXJ0eSBpcyBhIHNpbmdsZSBuYW1lOyBhZGQgdGhlIG5ldyBkZWx0YSBkaXJlY3RseVxuXHRcdFx0XHRcdFx0dmFyIF9uZXdEZWx0YSA9IHRoaXNETS5fbmV3RGVsdGEuYXBwbHkodGhpc0RNLCBbb3BUeXBlLm5hbWVdLmNvbmNhdCh2YWx1ZXMpKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wZXJhdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIFUuaXNEZWZpbmVkKHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0pKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShwcm9wZXJ0eSwgX25ld0RlbHRhKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMub3BlcmF0aW9uc1twcm9wZXJ0eV0gPSBfbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcGVyYXRpb25zW3Byb3BlcnR5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtZXRob2QocHJvcGVydHksIGRlbHRhRGVzY3JpcHRpb24pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2FkZE9wZXJhdGlvbihfb3BUeXBlc1snbW9kaWZ5J10sIHByb3BlcnR5LCBbZGVsdGFEZXNjcmlwdGlvbl0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIGNvbnZlbmllbmNlIGRlZmluaXRpb25zIGZvciB0aGUgYXBwbGljYXRpb24gYW5kIGNvbXBvc2l0aW9uIGZ1bmN0aW9ucyBiZWxvd1xuXHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdHZhciBrZWVwU2Vjb25kID0gKGQxLCBwLCBkMikgPT4geyBkMVtwXSA9IGQyIH07XG5cdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMVtwXSwgJ3ZhbHVlJykgfTtcblxuXHRmdW5jdGlvbiBhc3NlcnRGdW5jdGlvbih2YWwsIG9wVHlwZSkge1xuXHRcdFUuYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydERlZmluZWQodmFsLCBvcFR5cGUpIHtcblx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSBkZWZpbmVkLmApO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0VS5hc3NlcnQoVS5pc1VuZGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSB0byBiZSB1bmRlZmluZWQuYCk7XG5cdH1cblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBhIGRlbHRhIG1vZGVsIGNsYXNzIHdpdGggYSBudW1iZXIgb2YgY29tbW9uIG9wZXJhdGlvbnMgYWxyZWFkeSBhZGRlZCBpblxuXHR2YXIgRXh0ZW5kZWRETSA9IFUubmV3U3ViY2xhc3MoQ29yZURNLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gdGhlIG90aGVyIHN0YW5kYXJkIG9wZXJhdGlvbiB0eXBlc1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FkZCcsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWRkKHZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZSB9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnYWRkJyk7XG5cdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSB0aGlzLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ3JlcGxhY2UnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlcGxhY2UodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RGVmaW5lZChvYmpbcHJvcGVydHldLCAncmVwbGFjZScpO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gdGhpcy52YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdyZW1vdmUnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIFJlbW92ZSgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7XG5cdFx0XHRcdGFzc2VydERlZmluZWQob2JqW3Byb3BlcnR5XSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3Byb3BlcnR5XTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdmb3JiaWQnLFxuXHRcdFx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uIEZvcmJpZCgpIHt9LFxuXHRcdFx0YXBwbHlUbyhvYmosIHByb3BlcnR5KSB7IGFzc2VydFVuZGVmaW5lZChvYmpbcHJvcGVydHldLCAnZm9yYmlkJykgfVxuXHRcdH0pO1xuXG5cblx0XHQvLyBjb21wb3NpdGlvbiBvZiB0aGUgc3RhbmRhcmQgb3BlcmF0aW9uIHR5cGVzXG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAncmVwbGFjZScsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdhZGQnLCBkMi52YWx1ZSkgfSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnbW9kaWZ5JywgYXBwbHlTZWNvbmRUb0ZpcnN0VmFsdWUpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWRkJywgJ3JlbW92ZScsIChkMSwgcCkgPT4geyBkMVtwXSA9IENvcmVETS5fbmV3RGVsdGEoJ2ZvcmJpZCcpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdyZXBsYWNlJywgJ21vZGlmeScsIGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ3JlcGxhY2UnLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdtb2RpZnknLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdE9iamVjdC5rZXlzKGQyLm9wZXJhdGlvbnMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0ZDEuY29tcG9zZShwcm9wLCBkMi5vcGVyYXRpb25zW3Byb3BdKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnbW9kaWZ5JywgJ3JlbW92ZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2FkZCcsIChkMSwgcCwgZDIpID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdyZXBsYWNlJywgZDIudmFsdWUpIH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVtb3ZlJywgJ2ZvcmJpZCcsIGtlZXBGaXJzdCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnYWRkJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdmb3JiaWQnLCAnZm9yYmlkJywga2VlcEZpcnN0KTtcblxuXG5cdFx0Ly8gJ2FsdGVyJyBvcGVyYXRpb24gdHlwZVxuXHRcdHRoaXMuX2FkZE9wZXJhdGlvblR5cGUoe1xuXHRcdFx0bmFtZTogJ2FsdGVyJyxcblx0XHRcdGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBBbHRlcih2YWx1ZSwgYWxpYXMpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbHVlIHx8IFtdO1xuXHRcdFx0XHR0aGlzLmFsaWFzID0gYWxpYXMgfHwgJ2FsdGVyJztcblx0XHRcdH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgdGhpcy5hbGlhcyk7XG5cdFx0XHRcdHRoaXMudmFsdWUuZm9yRWFjaCgoc3ViT3ApID0+IHtcblx0XHRcdFx0XHR2YXIgcGFydE9uZSA9IG9ialtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0dmFyIHBhcnRUd28gPSBzdWJPcC52YWx1ZTtcblx0XHRcdFx0XHRpZiAoc3ViT3AudHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG5cdFx0XHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRcdFx0cGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0cGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSBlbHNlIHsgLyogJ2FwcGVuZCcgb3IgJ2luc2VydCcgKi9cblx0XHRcdFx0XHRcdG9ialtwcm9wZXJ0eV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRcdFx0XHRwYXJ0T25lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRwYXJ0VHdvLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWx0ZXInLCAnYWx0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRbXS5wdXNoLmFwcGx5KGQxW3BdLnZhbHVlLCBkMi52YWx1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZXBsYWNlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhbHRlcicsICdyZW1vdmUnLCAoZDEsIHApID0+IHsgZDFbcF0gPSBDb3JlRE0uX25ld0RlbHRhKCdmb3JiaWQnKSB9KTtcblx0XHR0aGlzLl9hZGRDb21wb3NpdGlvblJ1bGUoJ2FkZCcsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhbHRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCBkMi5hbGlhcyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXG5cblx0XHQvLyB0aGUgJ3ByZXBlbmQnLCAnaW5zZXJ0JyBhbmQgJ2FwcGVuZCcgb3BlcmF0aW9uIHR5cGUgYWxpYXNlc1xuXHRcdFsncHJlcGVuZCcsICdpbnNlcnQnLCAnYXBwZW5kJ10uZm9yRWFjaCgob3BUeXBlKSA9PiB7XG5cdFx0XHR0aGlzLl9hZGRPcGVyYXRpb25BbGlhcyh7XG5cdFx0XHRcdG5hbWU6IG9wVHlwZSxcblx0XHRcdFx0dGFyZ2V0OiAnYWx0ZXInLFxuXHRcdFx0XHR0cmFuc2Zvcm06IChhcmdzKSA9PiBbW3sgdHlwZTogb3BUeXBlLCB2YWx1ZTogYXJnc1swXSB9XSwgb3BUeXBlXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdC8vICdhZnRlcicgb3BlcmF0aW9uIHR5cGVcblx0XHR0aGlzLl9hZGRPcGVyYXRpb25UeXBlKHtcblx0XHRcdG5hbWU6ICdhZnRlcicsXG5cdFx0XHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24gQWZ0ZXIodmFsdWUpIHsgdGhpcy52YWx1ZSA9IHZhbHVlIH0sXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcGVydHkpIHtcblx0XHRcdFx0YXNzZXJ0RnVuY3Rpb24ob2JqW3Byb3BlcnR5XSwgJ2FmdGVyJyk7XG5cdFx0XHRcdHZhciBwYXJ0T25lID0gb2JqW3Byb3BlcnR5XTtcblx0XHRcdFx0dmFyIHBhcnRUd28gPSB0aGlzLnZhbHVlO1xuXHRcdFx0XHRvYmpbcHJvcGVydHldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZVByb21pc2UocGFydE9uZS5hcHBseSh0aGlzLCBhcmdzKSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGFydFR3by5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVwbGFjZScsIGtlZXBTZWNvbmQpO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgnYWZ0ZXInLCAncmVtb3ZlJywga2VlcFNlY29uZCk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZGQnLCAnYWZ0ZXInLCAoZDEsIHAsIGQyKSA9PiB7XG5cdFx0XHRhc3NlcnRGdW5jdGlvbihkMVtwXS52YWx1ZSwgJ2FmdGVyJyk7XG5cdFx0XHRhcHBseVNlY29uZFRvRmlyc3RWYWx1ZShkMSwgcCwgZDIpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2FkZENvbXBvc2l0aW9uUnVsZSgncmVwbGFjZScsICdhZnRlcicsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdGFzc2VydEZ1bmN0aW9uKGQxW3BdLnZhbHVlLCAnYWZ0ZXInKTtcblx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0fSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdpbnNlcnQnLCAnYWZ0ZXInLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0dGhpcy5fYWRkQ29tcG9zaXRpb25SdWxlKCdhZnRlcicsICdpbnNlcnQnLCBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSk7XG5cdFx0LyogVE9ETzogdGhlIGFib3ZlIGNvbXBvc2l0aW9ucyBvZiAnaW5zZXJ0JyBhbmQgJ2FmdGVyJyBhcmUgbm90IGFjdHVhbGx5IGNvcnJlY3QgKGUuZy4sIG5vdCBhc3NvY2lhdGl2ZSkuICovXG5cdH0pO1xuXG5cblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBhIGRlbHRhIG1vZGVsIGNsYXNzIHdpdGggY29tbW9uIG9wZXJhdGlvbnMgYW5kIGEgcGFydGlhbGx5IG9yZGVyZWQgc2V0IG9mIGRlbHRhc1xuXHR2YXIgUGFydGlhbGx5T3JkZXJlZERNID0gVS5uZXdTdWJjbGFzcyhFeHRlbmRlZERNLCBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF9ncmFwaCA9IG5ldyBKc0dyYXBoKCk7IC8qIGRlbHRhcyBpbiBhIHN0cmljdCBwYXJ0aWFsIG9yZGVyICovXG5cdFx0VS5leHRlbmQodGhpcywge1xuXHRcdFx0Ly8gZ2V0IHRoZSBncmFwaCBvZiBkZWx0YXNcblx0XHRcdGdyYXBoKCkgeyByZXR1cm4gX2dyYXBoIH1cblx0XHR9KTtcblxuXHRcdHZhciBfZGVsdGFDb25kaXRpb25zID0ge307IC8qIGFycmF5cyBvZiBhcnJheXM6IGRpc2p1bmN0aXZlIG5vcm1hbCBmb3JtcyAqL1xuXHRcdHZhciBfc2V0dGxlZERlbHRhQ29uZGl0aW9ucyA9IHt9OyAvKiBCb29sZWFucyAqL1xuXHRcdHZhciBfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXG5cdFx0ZnVuY3Rpb24gX3JlZ2lzdGVyRGlzanVuY3QoZGVsdGFOYW1lLCBkaXNqdW5jdCkge1xuXHRcdFx0X2NvbmRpdGlvbnNVbnNldHRsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKGRpc2p1bmN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZXR0bGVkRGVsdGFDb25kaXRpb25zW2RlbHRhTmFtZV0gPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChkaXNqdW5jdCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0Ly8gY2hhbmdlIG5vdGhpbmdcblx0XHRcdH0gZWxzZSBpZiAoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdICE9PSB0cnVlKSB7XG5cdFx0XHRcdFUuYXJyYXkoX2RlbHRhQ29uZGl0aW9ucywgZGVsdGFOYW1lKS5wdXNoKGRpc2p1bmN0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0dGxlQ29uZGl0aW9ucygpIHtcblx0XHRcdGlmIChfY29uZGl0aW9uc1Vuc2V0dGxlZCkge1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgc29tZXRoaW5nQ2hhbmdlZDtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgoZGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKFUuaXNVbmRlZmluZWQoX2RlbHRhQ29uZGl0aW9uc1tkZWx0YU5hbWVdKSkgeyByZXR1cm4gfVxuXHRcdFx0XHRcdFx0aWYgKF9kZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXS5zb21lKChkaXNqdW5jdCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzanVuY3QuZXZlcnkoKGNvbmp1bmN0KSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbY29uanVuY3RdKSkpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IHdoaWxlIChzb21ldGhpbmdDaGFuZ2VkKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRVLmV4dGVuZCh0aGlzLCB7XG5cdFx0XHQvLyBhIGNvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIG5ldyBkZWx0YSBhbmQgcmVnaXN0ZXIgaXQgaW50byB0aGUgZGVsdGEgbW9kZWxcblx0XHRcdERlbHRhKGRlbHRhTmFtZSwgb3B0aW9ucykge1xuXG5cdFx0XHRcdC8vIHBlcmZvcm0gc2FuaXR5IGNoZWNrc1xuXHRcdFx0XHRVLmFzc2VydChvcHRpb25zIGluc3RhbmNlb2YgT2JqZWN0LFxuXHRcdFx0XHRcdFx0YEEgZGVsdGEgc2hvdWxkIGJlIGdpdmVuIGFzIGFuIG9iamVjdC5gKTtcblx0XHRcdFx0Ly8gVE9ETzogY2hlY2sgdW5pcXVlbmVzcyBvZiBgZGVsdGFOYW1lYFxuXG5cdFx0XHRcdC8vIG1ha2UgdGhpcyBkZWx0YSBhIE1vZGlmeURlbHRhLCBzbyBydW4gaXRzIGNvbnN0cnVjdG9yXG5cdFx0XHRcdHRoaXMuTW9kaWZ5RGVsdGEuYXBwbHkodGhpcywgb3B0aW9ucyk7XG5cblx0XHRcdFx0Ly8gY3JlYXRlIGRlbHRhIHByb3BlcnRpZXNcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuXHRcdFx0XHRcdG5hbWU6IHsgZ2V0KCkgeyByZXR1cm4gZGVsdGFOYW1lIH0gfSxcblx0XHRcdFx0XHRtYW51YWxseVNlbGVjdGFibGU6IHtcblx0XHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ21hbnVhbGx5U2VsZWN0YWJsZSddKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAhIW9wdGlvbnNbJ21hbnVhbGx5U2VsZWN0YWJsZSddO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKG9wdGlvbnNbJ3Jlc29sdmVzJ10pICYmIG9wdGlvbnNbJ3Jlc29sdmVzJ10ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2VsZWN0ZWQ6IHtcblx0XHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdFx0X3NldHRsZUNvbmRpdGlvbnMoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuICEhX3NldHRsZWREZWx0YUNvbmRpdGlvbnNbZGVsdGFOYW1lXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGlmOiB7XG5cdFx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zWydpZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ2lmJ10gPT09IGZhbHNlKSB7IC8qIGxpdGVyYWwgJ3RydWUnIG9yICdmYWxzZScgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uc1snaWYnXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zWydpZiddIHx8IG9wdGlvbnNbJ2lmZiddIHx8IG9wdGlvbnNbJ3Jlc29sdmVzJ10pIHsgLyogYXJyYXkgb2YgbmFtZXMgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZmYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1sncmVzb2x2ZXMnXSB8fCBbXVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7IC8qIGRlZmF1bHQ6IGZhbHNlICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbmx5SWY6IHtcblx0XHRcdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnNbJ29ubHlJZiddID09PSB0cnVlIHx8IG9wdGlvbnNbJ29ubHlJZiddID09PSBmYWxzZSkgeyAvKiBsaXRlcmFsICd0cnVlJyBvciAnZmFsc2UnICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnNbJ29ubHlJZiddO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnNbJ29ubHlJZiddIHx8IG9wdGlvbnNbJ2lmZiddIHx8IG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCAgb3B0aW9uc1sncmVzb2x2ZXMnXSkgeyAvKiBhcnJheSBvZiBuYW1lcyAqL1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ29ubHlJZiddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydpZmYnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snZXhwZWN0cyddIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXNvbHZlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHsgLyogZGVmYXVsdDogdHJ1ZSAqL1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZnRlcjoge1xuXHRcdFx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gW10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9uc1snYWZ0ZXInXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ2V4cGVjdHMnXSB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnNbJ3Jlc29sdmVzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZWxlY3RzOiB7XG5cdFx0XHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydzZWxlY3RzJ10gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zWydyZXF1aXJlcyddIHx8IFtdXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyB1cGRhdGUgY29uZGl0aW9uc1xuXHRcdFx0XHRfY29uZGl0aW9uc1Vuc2V0dGxlZCA9IHRydWU7XG5cdFx0XHRcdGlmIChVLmlzRGVmaW5lZCh0aGlzLmlmKSkgeyBfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIHRoaXMuaWYpIH1cblx0XHRcdFx0dGhpcy5zZWxlY3RzLmZvckVhY2goKG90aGVyRGVsdGFOYW1lKSA9PiB7XG5cdFx0XHRcdFx0X3JlZ2lzdGVyRGlzanVuY3Qob3RoZXJEZWx0YU5hbWUsIFtkZWx0YU5hbWVdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gdXBkYXRlIHRoZSBncmFwaFxuXHRcdFx0XHRfZ3JhcGguYWRkVmVydGV4KGRlbHRhTmFtZSwgdGhpcyk7XG5cdFx0XHRcdHRoaXMuYWZ0ZXIuZm9yRWFjaCgob3RoZXJEZWx0YU5hbWUpID0+IHtcblx0XHRcdFx0XHRfZ3JhcGguY3JlYXRlRWRnZShvdGhlckRlbHRhTmFtZSwgZGVsdGFOYW1lKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFUuYXNzZXJ0KCFfZ3JhcGguaGFzQ3ljbGUoKSxcblx0XHRcdFx0XHRcdGBUaGUgZGVsdGEgJHtkZWx0YU5hbWV9IGludHJvZHVjZWQgYSBjeWNsZSBpbiB0aGUgYXBwbGljYXRpb24gb3JkZXIuYCk7XG5cblx0XHRcdH0sXG5cblx0XHRcdC8vIHNlbGVjdCBhIG51bWJlciBvZiBkZWx0YXMgYnkgbmFtZSwgc28gdGhleSB3aWxsIGJlIGFwcGxpZWQgd2hlbiBhcHBsaWNhYmxlXG5cdFx0XHRzZWxlY3QoLi4uZGVsdGFOYW1lcykge1xuXHRcdFx0XHRkZWx0YU5hbWVzLmZvckVhY2goKGRlbHRhTmFtZSkgPT4geyBfcmVnaXN0ZXJEaXNqdW5jdChkZWx0YU5hbWUsIHRydWUpIH0pO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gcmVnaXN0ZXIgYSBuYW1lZCB2YXJpYXRpb24gcG9pbnQgaW4gdGhlIGNvZGUtYmFzZVxuXHRcdFx0Ly8gKGkuZS4sIGFwcGx5IGFsbCByZWdpc3RlcmVkIGRlbHRhcyBhbmQgcmV0dXJuIHRoZSByZXN1bHRpbmcgdmFsdWUpXG5cdFx0XHR2cCh2cE5hbWUsIHZhbCkge1xuXG5cdFx0XHRcdC8vIGEgdGVtcG9yYXJ5IG9iamVjdCB0byBob2xkIHRoZSB2YWx1ZSB3aGlsZSBpdCBpcyB1bmRlcmdvaW5nIGNoYW5nZVxuXHRcdFx0XHR2YXIgb2JqID0ge307XG5cdFx0XHRcdG9ialt2cE5hbWVdID0gdmFsO1xuXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFueSAnb25seUlmJyBjb25kaXRpb25zIGFyZSBiZWluZyB2aW9sYXRlZFxuXHRcdFx0XHRfc2V0dGxlQ29uZGl0aW9ucygpO1xuXHRcdFx0XHRfZ3JhcGguZWFjaFZlcnRleCgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRVLmFzc2VydCghZGVsdGEuc2VsZWN0ZWQgfHwgZGVsdGEub25seUlmLmV2ZXJ5KChkKSA9PiBfZ3JhcGgudmVydGV4VmFsdWUoZCkuc2VsZWN0ZWQpLFxuXHRcdFx0XHRcdFx0XHRgVGhlICdvbmx5SWYnIGNvbmRpdGlvbiBvZiBkZWx0YSAnJHtkZWx0YS5uYW1lfScgd2FzIHZpb2xhdGVkLmApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBhcHBseSB0aGUgcHJvcGVyIGRlbHRhc1xuXHRcdFx0XHRfZ3JhcGgudG9wb2xvZ2ljYWxseSgobmFtZSwgZGVsdGEpID0+IHtcblx0XHRcdFx0XHRpZiAoZGVsdGEuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGRlbHRhLnNlbGVjdGl2ZWx5QXBwbHlUbyhvYmosIG5hbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gcmV0dXJuIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZVxuXHRcdFx0XHRyZXR1cm4gb2JqW3ZwTmFtZV07XG5cblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTtcblxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0dmFyIHJlc29sdmVQcm9taXNlID0gbnVsbDtcblx0Ly9ub2luc3BlY3Rpb24gSlNVbnVzZWRHbG9iYWxTeW1ib2xzXG5cdFUuZXh0ZW5kKFBhcnRpYWxseU9yZGVyZWRETSwge1xuXHRcdHJlZ2lzdGVyUHJvbWlzZVJlc29sdmVyKHByb21pc2VSZXNvbHZlckZuKSB7XG5cdFx0XHRyZXNvbHZlUHJvbWlzZSA9IHByb21pc2VSZXNvbHZlckZuO1xuXHRcdH1cblx0fSk7XG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIHJldHVybiB0aGUgbWFpbiBkZWx0YSBtb2RlbCBjbGFzc1xuXHRyZXR1cm4gUGFydGlhbGx5T3JkZXJlZERNO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvZGVsdGEuanNcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gJF9fcGxhY2Vob2xkZXJfXzI7XG4gICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fcGxhY2Vob2xkZXJfXzQrKylcbiAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzVbJF9fcGxhY2Vob2xkZXJfXzYgLSAkX19wbGFjZWhvbGRlcl9fN10gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzhdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJcbiAgICAgICAgICAgIGZvciAodmFyICRfX3BsYWNlaG9sZGVyX18wID0gW10sICRfX3BsYWNlaG9sZGVyX18xID0gMDtcbiAgICAgICAgICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX19wbGFjZWhvbGRlcl9fMysrKVxuICAgICAgICAgICAgICAkX19wbGFjZWhvbGRlcl9fNFskX19wbGFjZWhvbGRlcl9fNV0gPSBhcmd1bWVudHNbJF9fcGxhY2Vob2xkZXJfXzZdO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9zb3VyY2UvQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiSnNHcmFwaFwiLFwiY29tbW9uanMyXCI6XCJqcy1ncmFwaFwiLFwiY29tbW9uanNcIjpcImpzLWdyYXBoXCIsXCJhbWRcIjpcImpzLWdyYXBoXCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKCgpID0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBVID0ge1xuXG5cdFx0Ly8gY3JlYXRlIGEgbmV3IGNsYXNzLCBnaXZlbiBhIGNvbnN0cnVjdG9yIGFuZCBwb3NzaWJsZSBwcm90b3R5cGVcblx0XHRuZXdDbGFzcyhjb25zdHJ1Y3RvciwgcHJvdG90eXBlKSB7XG5cdFx0XHRwcm90b3R5cGUgPSBwcm90b3R5cGUgfHwge307XG5cdFx0XHR2YXIgY2xzID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcblx0XHRcdGNscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjbHM7XG5cdFx0XHRyZXR1cm4gY2xzO1xuXHRcdH0sXG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgc3ViY2xhc3MsIGdpdmVuIGEgc3VwZXJjbGFzcywgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld1N1YmNsYXNzKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yLCBwcm90b3R5cGUpIHtcblx0XHRcdHByb3RvdHlwZSA9IHByb3RvdHlwZSB8fCB7fTtcblx0XHRcdHZhciBjbHMgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0Y29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHR9O1xuXHRcdFx0Y2xzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdG9iajFba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gb2JqMTtcblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHRoZSBhcnJheSBgb2JqW25hbWVdYDsgaWYgYG9ialtuYW1lXWAgaXMgbm90XG5cdFx0Ly8gYW4gYXJyYXksIG1ha2UgaXQgYW4gZW1wdHkgYXJyYXkgZmlyc3Rcblx0XHRhcnJheShvYmosIG5hbWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHsgb2JqW25hbWVdID0gW10gfVxuXHRcdFx0cmV0dXJuIG9ialtuYW1lXTtcblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH1cblx0fTtcblxuXHRyZXR1cm4gVTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL3NvdXJjZS9taXNjLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZGVsdGEuanMifQ==