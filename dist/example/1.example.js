webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(U) {
	  'use strict';
	  var DeltaJs = U.newClass(function DeltaJs() {
	    var thisDeltaJs = this;
	    this.operations = {};
	    this.compositions = {};
	    this.operations.Delta = U.newClass(function() {});
	    this.compositions['modify'] = {'modify': []};
	    this.operations['modify'] = U.newSubclass(this.operations.Delta, (function(superFn) {
	      return function() {
	        superFn();
	        this.deltas = {};
	      };
	    }), {
	      type: 'modify',
	      applyTo: function(obj, prop) {
	        var $__0 = this;
	        if (U.isDefined(prop)) {
	          U.assert(obj[prop] instanceof Object, "The 'modify' operation expects the property to be an already defined Object.");
	          Object.keys(this.deltas).forEach((function(subProp) {
	            $__0.deltas[subProp].applyTo(obj[prop], subProp);
	          }));
	        } else {
	          U.assert(obj instanceof Object, "The 'modify' operation expects the property to be an already defined Object.");
	          Object.keys(this.deltas).forEach((function(subProp) {
	            $__0.deltas[subProp].applyTo(obj, subProp);
	          }));
	        }
	      },
	      compose: function(prop, other) {
	        var $__0 = this;
	        if (other) {
	          var thisDelta = this.deltas[prop];
	          var success = thisDeltaJs.compositions[thisDelta.type][other.type].some((function(comp) {
	            try {
	              comp($__0, prop, other);
	              return true;
	            } catch (__) {}
	            return false;
	          }));
	          U.assert(success, ("No composition is defined between '" + thisDelta.type + "' and '" + other.type + "'."));
	        }
	        return this;
	      },
	      modify: function(prop) {
	        return this._addOperation('modify', prop, []);
	      },
	      _addOperation: function(opType, prop, args) {
	        var $__0 = this;
	        var match = prop.match(/^([.#]?)(\w+|\(\w+\))(.*)$/);
	        U.assert(match, ("The path string '" + prop + "' is not well formed."));
	        if (match[1] === '#') {
	          return this._addOperation(opType, (".(instance)." + match[2] + match[3]), args);
	        }
	        var resultDelta;
	        if (match[3] === '') {
	          ((function(newDelta) {
	            if ($__0.deltas[match[2]]) {
	              $__0.compose(match[2], newDelta);
	            } else {
	              $__0.deltas[match[2]] = newDelta;
	            }
	          }))(U.applyConstructor(thisDeltaJs.operations[opType], [match[2]].concat(args)));
	          resultDelta = this.deltas[match[2]];
	        } else {
	          resultDelta = this.modify(match[2])._addOperation(opType, match[3], args);
	        }
	        return opType === 'modify' ? resultDelta : this;
	      },
	      toString: function() {
	        var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	        var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	        var $__0 = this;
	        return (U.repeat(indentLvl, '    ') + "modify '" + prop + "'\n") + Object.keys(this.deltas).map((function(p) {
	          return $__0.deltas[p].toString(indentLvl + 1, p);
	        })).join('\n');
	      }
	    });
	    this._defineStandardOperationTypes();
	  }, {
	    newOperationType: function(name, applyTo) {
	      var $__0 = this;
	      U.assert(!this.operations[name], ("The '" + name + "' operation type already exists."));
	      this.operations.modify.prototype[name] = function(prop) {
	        for (var args = [],
	            $__1 = 1; $__1 < arguments.length; $__1++)
	          args[$__1 - 1] = arguments[$__1];
	        return this._addOperation(name, prop, args);
	      };
	      this.compositions[name] = {};
	      Object.keys(this.compositions).forEach((function(type) {
	        U.assert(!$__0.compositions[type][name]);
	        U.assert(!$__0.compositions[name][type]);
	        $__0.compositions[type][name] = [];
	        $__0.compositions[name][type] = [];
	      }));
	      this.operations[name] = U.newSubclass(this.operations.Delta, (function(superFn) {
	        return function() {
	          for (var args = [],
	              $__2 = 0; $__2 < arguments.length; $__2++)
	            args[$__2] = arguments[$__2];
	          superFn();
	          this.a = args;
	        };
	      }), {
	        type: name,
	        applyTo: applyTo,
	        toString: function() {
	          var indentLvl = arguments[0] !== (void 0) ? arguments[0] : 0;
	          var prop = arguments[1] !== (void 0) ? arguments[1] : '(root)';
	          return ("" + U.repeat(0 + indentLvl, '    ') + name + " '" + prop + "': " + JSON.stringify(this.a).slice(1, -1));
	        }
	      });
	    },
	    newComposition: function(type1, type2, compose) {
	      this.compositions[type1][type2].push(compose);
	    },
	    _defineStandardOperationTypes: function() {
	      var keepFirst = (function() {});
	      var keepSecond = (function(d1, p, d2) {
	        d1.deltas[p] = d2;
	      });
	      var applySecondToFirstValue = (function(d1, p, d2) {
	        d2.applyTo(d1.deltas[p].a, 0);
	      });
	      function assertFunction(val, opType) {
	        U.assert(typeof val === 'function', ("The operation '" + opType + "' expects the property it acts on to be a function."));
	      }
	      function assertObject(val, opType) {
	        U.assert(val instanceof Object, ("The operation '" + opType + "' expects the property it acts on to be an Object."));
	      }
	      function assertDefined(val, opType) {
	        U.assert(U.isDefined(val), ("The operation '" + opType + "' expects the property to be defined."));
	      }
	      function assertUndefined(val, opType) {
	        U.assert(U.isUndefined(val), ("The operation '" + opType + "' expects the property to be undefined."));
	      }
	      this.newComposition('modify', 'modify', (function(d1, p, d2) {
	        Object.keys(d2.deltas).forEach((function(prop) {
	          d1.compose(prop, d2.deltas[prop]);
	        }));
	      }));
	      this.newOperationType('add', function applyTo(obj, prop) {
	        assertUndefined(obj[prop], 'add');
	        obj[prop] = this.a[0];
	      });
	      this.newComposition('add', 'modify', (function(d1, p, d2) {
	        assertObject(d1.deltas[p].a[0], 'modify');
	        applySecondToFirstValue(d1, p, d2);
	      }));
	      this.newOperationType('remove', function applyTo(obj, p) {
	        assertDefined(obj[p], 'remove');
	        delete obj[p];
	      });
	      this.newComposition('modify', 'remove', keepSecond);
	      this.newComposition('add', 'remove', keepSecond);
	      this.newComposition('remove', 'add', (function(d1, p, d2) {}));
	    }
	  });
	  return DeltaJs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global, factory) {
	  if (typeof module === "object" && typeof module.exports === "object") {
	    module.exports = global.document ? factory(global, true) : function(w) {
	      if (!w.document) {
	        throw new Error("jQuery requires a window with a document");
	      }
	      return factory(w);
	    };
	  } else {
	    factory(global);
	  }
	}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	  var arr = [];
	  var slice = arr.slice;
	  var concat = arr.concat;
	  var push = arr.push;
	  var indexOf = arr.indexOf;
	  var class2type = {};
	  var toString = class2type.toString;
	  var hasOwn = class2type.hasOwnProperty;
	  var support = {};
	  var document = window.document,
	      version = "2.1.1",
	      jQuery = function(selector, context) {
	        return new jQuery.fn.init(selector, context);
	      },
	      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      rmsPrefix = /^-ms-/,
	      rdashAlpha = /-([\da-z])/gi,
	      fcamelCase = function(all, letter) {
	        return letter.toUpperCase();
	      };
	  jQuery.fn = jQuery.prototype = {
	    jquery: version,
	    constructor: jQuery,
	    selector: "",
	    length: 0,
	    toArray: function() {
	      return slice.call(this);
	    },
	    get: function(num) {
	      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
	    },
	    pushStack: function(elems) {
	      var ret = jQuery.merge(this.constructor(), elems);
	      ret.prevObject = this;
	      ret.context = this.context;
	      return ret;
	    },
	    each: function(callback, args) {
	      return jQuery.each(this, callback, args);
	    },
	    map: function(callback) {
	      return this.pushStack(jQuery.map(this, function(elem, i) {
	        return callback.call(elem, i, elem);
	      }));
	    },
	    slice: function() {
	      return this.pushStack(slice.apply(this, arguments));
	    },
	    first: function() {
	      return this.eq(0);
	    },
	    last: function() {
	      return this.eq(-1);
	    },
	    eq: function(i) {
	      var len = this.length,
	          j = +i + (i < 0 ? len : 0);
	      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	    },
	    end: function() {
	      return this.prevObject || this.constructor(null);
	    },
	    push: push,
	    sort: arr.sort,
	    splice: arr.splice
	  };
	  jQuery.extend = jQuery.fn.extend = function() {
	    var options,
	        name,
	        src,
	        copy,
	        copyIsArray,
	        clone,
	        target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false;
	    if (typeof target === "boolean") {
	      deep = target;
	      target = arguments[i] || {};
	      i++;
	    }
	    if (typeof target !== "object" && !jQuery.isFunction(target)) {
	      target = {};
	    }
	    if (i === length) {
	      target = this;
	      i--;
	    }
	    for (; i < length; i++) {
	      if ((options = arguments[i]) != null) {
	        for (name in options) {
	          src = target[name];
	          copy = options[name];
	          if (target === copy) {
	            continue;
	          }
	          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
	            if (copyIsArray) {
	              copyIsArray = false;
	              clone = src && jQuery.isArray(src) ? src : [];
	            } else {
	              clone = src && jQuery.isPlainObject(src) ? src : {};
	            }
	            target[name] = jQuery.extend(deep, clone, copy);
	          } else if (copy !== undefined) {
	            target[name] = copy;
	          }
	        }
	      }
	    }
	    return target;
	  };
	  jQuery.extend({
	    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
	    isReady: true,
	    error: function(msg) {
	      throw new Error(msg);
	    },
	    noop: function() {},
	    isFunction: function(obj) {
	      return jQuery.type(obj) === "function";
	    },
	    isArray: Array.isArray,
	    isWindow: function(obj) {
	      return obj != null && obj === obj.window;
	    },
	    isNumeric: function(obj) {
	      return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
	    },
	    isPlainObject: function(obj) {
	      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
	        return false;
	      }
	      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
	        return false;
	      }
	      return true;
	    },
	    isEmptyObject: function(obj) {
	      var name;
	      for (name in obj) {
	        return false;
	      }
	      return true;
	    },
	    type: function(obj) {
	      if (obj == null) {
	        return obj + "";
	      }
	      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
	    },
	    globalEval: function(code) {
	      var script,
	          indirect = eval;
	      code = jQuery.trim(code);
	      if (code) {
	        if (code.indexOf("use strict") === 1) {
	          script = document.createElement("script");
	          script.text = code;
	          document.head.appendChild(script).parentNode.removeChild(script);
	        } else {
	          indirect(code);
	        }
	      }
	    },
	    camelCase: function(string) {
	      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	    },
	    nodeName: function(elem, name) {
	      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	    },
	    each: function(obj, callback, args) {
	      var value,
	          i = 0,
	          length = obj.length,
	          isArray = isArraylike(obj);
	      if (args) {
	        if (isArray) {
	          for (; i < length; i++) {
	            value = callback.apply(obj[i], args);
	            if (value === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            value = callback.apply(obj[i], args);
	            if (value === false) {
	              break;
	            }
	          }
	        }
	      } else {
	        if (isArray) {
	          for (; i < length; i++) {
	            value = callback.call(obj[i], i, obj[i]);
	            if (value === false) {
	              break;
	            }
	          }
	        } else {
	          for (i in obj) {
	            value = callback.call(obj[i], i, obj[i]);
	            if (value === false) {
	              break;
	            }
	          }
	        }
	      }
	      return obj;
	    },
	    trim: function(text) {
	      return text == null ? "" : (text + "").replace(rtrim, "");
	    },
	    makeArray: function(arr, results) {
	      var ret = results || [];
	      if (arr != null) {
	        if (isArraylike(Object(arr))) {
	          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
	        } else {
	          push.call(ret, arr);
	        }
	      }
	      return ret;
	    },
	    inArray: function(elem, arr, i) {
	      return arr == null ? -1 : indexOf.call(arr, elem, i);
	    },
	    merge: function(first, second) {
	      var len = +second.length,
	          j = 0,
	          i = first.length;
	      for (; j < len; j++) {
	        first[i++] = second[j];
	      }
	      first.length = i;
	      return first;
	    },
	    grep: function(elems, callback, invert) {
	      var callbackInverse,
	          matches = [],
	          i = 0,
	          length = elems.length,
	          callbackExpect = !invert;
	      for (; i < length; i++) {
	        callbackInverse = !callback(elems[i], i);
	        if (callbackInverse !== callbackExpect) {
	          matches.push(elems[i]);
	        }
	      }
	      return matches;
	    },
	    map: function(elems, callback, arg) {
	      var value,
	          i = 0,
	          length = elems.length,
	          isArray = isArraylike(elems),
	          ret = [];
	      if (isArray) {
	        for (; i < length; i++) {
	          value = callback(elems[i], i, arg);
	          if (value != null) {
	            ret.push(value);
	          }
	        }
	      } else {
	        for (i in elems) {
	          value = callback(elems[i], i, arg);
	          if (value != null) {
	            ret.push(value);
	          }
	        }
	      }
	      return concat.apply([], ret);
	    },
	    guid: 1,
	    proxy: function(fn, context) {
	      var tmp,
	          args,
	          proxy;
	      if (typeof context === "string") {
	        tmp = fn[context];
	        context = fn;
	        fn = tmp;
	      }
	      if (!jQuery.isFunction(fn)) {
	        return undefined;
	      }
	      args = slice.call(arguments, 2);
	      proxy = function() {
	        return fn.apply(context || this, args.concat(slice.call(arguments)));
	      };
	      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	      return proxy;
	    },
	    now: Date.now,
	    support: support
	  });
	  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	  });
	  function isArraylike(obj) {
	    var length = obj.length,
	        type = jQuery.type(obj);
	    if (type === "function" || jQuery.isWindow(obj)) {
	      return false;
	    }
	    if (obj.nodeType === 1 && length) {
	      return true;
	    }
	    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
	  }
	  var Sizzle = (function(window) {
	    var i,
	        support,
	        Expr,
	        getText,
	        isXML,
	        tokenize,
	        compile,
	        select,
	        outermostContext,
	        sortInput,
	        hasDuplicate,
	        setDocument,
	        document,
	        docElem,
	        documentIsHTML,
	        rbuggyQSA,
	        rbuggyMatches,
	        matches,
	        contains,
	        expando = "sizzle" + -(new Date()),
	        preferredDoc = window.document,
	        dirruns = 0,
	        done = 0,
	        classCache = createCache(),
	        tokenCache = createCache(),
	        compilerCache = createCache(),
	        sortOrder = function(a, b) {
	          if (a === b) {
	            hasDuplicate = true;
	          }
	          return 0;
	        },
	        strundefined = typeof undefined,
	        MAX_NEGATIVE = 1 << 31,
	        hasOwn = ({}).hasOwnProperty,
	        arr = [],
	        pop = arr.pop,
	        push_native = arr.push,
	        push = arr.push,
	        slice = arr.slice,
	        indexOf = arr.indexOf || function(elem) {
	          var i = 0,
	              len = this.length;
	          for (; i < len; i++) {
	            if (this[i] === elem) {
	              return i;
	            }
	          }
	          return -1;
	        },
	        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	        whitespace = "[\\x20\\t\\r\\n\\f]",
	        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	        identifier = characterEncoding.replace("w", "w#"),
	        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	        pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
	        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
	        rpseudo = new RegExp(pseudos),
	        ridentifier = new RegExp("^" + identifier + "$"),
	        matchExpr = {
	          "ID": new RegExp("^#(" + characterEncoding + ")"),
	          "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
	          "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
	          "ATTR": new RegExp("^" + attributes),
	          "PSEUDO": new RegExp("^" + pseudos),
	          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
	          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
	          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	        },
	        rinputs = /^(?:input|select|textarea|button)$/i,
	        rheader = /^h\d$/i,
	        rnative = /^[^{]+\{\s*\[native \w/,
	        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	        rsibling = /[+~]/,
	        rescape = /'|\\/g,
	        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
	        funescape = function(_, escaped, escapedWhitespace) {
	          var high = "0x" + escaped - 0x10000;
	          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	        };
	    try {
	      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
	      arr[preferredDoc.childNodes.length].nodeType;
	    } catch (e) {
	      push = {apply: arr.length ? function(target, els) {
	          push_native.apply(target, slice.call(els));
	        } : function(target, els) {
	          var j = target.length,
	              i = 0;
	          while ((target[j++] = els[i++])) {}
	          target.length = j - 1;
	        }};
	    }
	    function Sizzle(selector, context, results, seed) {
	      var match,
	          elem,
	          m,
	          nodeType,
	          i,
	          groups,
	          old,
	          nid,
	          newContext,
	          newSelector;
	      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
	        setDocument(context);
	      }
	      context = context || document;
	      results = results || [];
	      if (!selector || typeof selector !== "string") {
	        return results;
	      }
	      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
	        return [];
	      }
	      if (documentIsHTML && !seed) {
	        if ((match = rquickExpr.exec(selector))) {
	          if ((m = match[1])) {
	            if (nodeType === 9) {
	              elem = context.getElementById(m);
	              if (elem && elem.parentNode) {
	                if (elem.id === m) {
	                  results.push(elem);
	                  return results;
	                }
	              } else {
	                return results;
	              }
	            } else {
	              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
	                results.push(elem);
	                return results;
	              }
	            }
	          } else if (match[2]) {
	            push.apply(results, context.getElementsByTagName(selector));
	            return results;
	          } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
	            push.apply(results, context.getElementsByClassName(m));
	            return results;
	          }
	        }
	        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
	          nid = old = expando;
	          newContext = context;
	          newSelector = nodeType === 9 && selector;
	          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
	            groups = tokenize(selector);
	            if ((old = context.getAttribute("id"))) {
	              nid = old.replace(rescape, "\\$&");
	            } else {
	              context.setAttribute("id", nid);
	            }
	            nid = "[id='" + nid + "'] ";
	            i = groups.length;
	            while (i--) {
	              groups[i] = nid + toSelector(groups[i]);
	            }
	            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
	            newSelector = groups.join(",");
	          }
	          if (newSelector) {
	            try {
	              push.apply(results, newContext.querySelectorAll(newSelector));
	              return results;
	            } catch (qsaError) {} finally {
	              if (!old) {
	                context.removeAttribute("id");
	              }
	            }
	          }
	        }
	      }
	      return select(selector.replace(rtrim, "$1"), context, results, seed);
	    }
	    function createCache() {
	      var keys = [];
	      function cache(key, value) {
	        if (keys.push(key + " ") > Expr.cacheLength) {
	          delete cache[keys.shift()];
	        }
	        return (cache[key + " "] = value);
	      }
	      return cache;
	    }
	    function markFunction(fn) {
	      fn[expando] = true;
	      return fn;
	    }
	    function assert(fn) {
	      var div = document.createElement("div");
	      try {
	        return !!fn(div);
	      } catch (e) {
	        return false;
	      } finally {
	        if (div.parentNode) {
	          div.parentNode.removeChild(div);
	        }
	        div = null;
	      }
	    }
	    function addHandle(attrs, handler) {
	      var arr = attrs.split("|"),
	          i = attrs.length;
	      while (i--) {
	        Expr.attrHandle[arr[i]] = handler;
	      }
	    }
	    function siblingCheck(a, b) {
	      var cur = b && a,
	          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
	      if (diff) {
	        return diff;
	      }
	      if (cur) {
	        while ((cur = cur.nextSibling)) {
	          if (cur === b) {
	            return -1;
	          }
	        }
	      }
	      return a ? 1 : -1;
	    }
	    function createInputPseudo(type) {
	      return function(elem) {
	        var name = elem.nodeName.toLowerCase();
	        return name === "input" && elem.type === type;
	      };
	    }
	    function createButtonPseudo(type) {
	      return function(elem) {
	        var name = elem.nodeName.toLowerCase();
	        return (name === "input" || name === "button") && elem.type === type;
	      };
	    }
	    function createPositionalPseudo(fn) {
	      return markFunction(function(argument) {
	        argument = +argument;
	        return markFunction(function(seed, matches) {
	          var j,
	              matchIndexes = fn([], seed.length, argument),
	              i = matchIndexes.length;
	          while (i--) {
	            if (seed[(j = matchIndexes[i])]) {
	              seed[j] = !(matches[j] = seed[j]);
	            }
	          }
	        });
	      });
	    }
	    function testContext(context) {
	      return context && typeof context.getElementsByTagName !== strundefined && context;
	    }
	    support = Sizzle.support = {};
	    isXML = Sizzle.isXML = function(elem) {
	      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	      return documentElement ? documentElement.nodeName !== "HTML" : false;
	    };
	    setDocument = Sizzle.setDocument = function(node) {
	      var hasCompare,
	          doc = node ? node.ownerDocument || node : preferredDoc,
	          parent = doc.defaultView;
	      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
	        return document;
	      }
	      document = doc;
	      docElem = doc.documentElement;
	      documentIsHTML = !isXML(doc);
	      if (parent && parent !== parent.top) {
	        if (parent.addEventListener) {
	          parent.addEventListener("unload", function() {
	            setDocument();
	          }, false);
	        } else if (parent.attachEvent) {
	          parent.attachEvent("onunload", function() {
	            setDocument();
	          });
	        }
	      }
	      support.attributes = assert(function(div) {
	        div.className = "i";
	        return !div.getAttribute("className");
	      });
	      support.getElementsByTagName = assert(function(div) {
	        div.appendChild(doc.createComment(""));
	        return !div.getElementsByTagName("*").length;
	      });
	      support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
	        div.innerHTML = "<div class='a'></div><div class='a i'></div>";
	        div.firstChild.className = "i";
	        return div.getElementsByClassName("i").length === 2;
	      });
	      support.getById = assert(function(div) {
	        docElem.appendChild(div).id = expando;
	        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
	      });
	      if (support.getById) {
	        Expr.find["ID"] = function(id, context) {
	          if (typeof context.getElementById !== strundefined && documentIsHTML) {
	            var m = context.getElementById(id);
	            return m && m.parentNode ? [m] : [];
	          }
	        };
	        Expr.filter["ID"] = function(id) {
	          var attrId = id.replace(runescape, funescape);
	          return function(elem) {
	            return elem.getAttribute("id") === attrId;
	          };
	        };
	      } else {
	        delete Expr.find["ID"];
	        Expr.filter["ID"] = function(id) {
	          var attrId = id.replace(runescape, funescape);
	          return function(elem) {
	            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
	            return node && node.value === attrId;
	          };
	        };
	      }
	      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
	        if (typeof context.getElementsByTagName !== strundefined) {
	          return context.getElementsByTagName(tag);
	        }
	      } : function(tag, context) {
	        var elem,
	            tmp = [],
	            i = 0,
	            results = context.getElementsByTagName(tag);
	        if (tag === "*") {
	          while ((elem = results[i++])) {
	            if (elem.nodeType === 1) {
	              tmp.push(elem);
	            }
	          }
	          return tmp;
	        }
	        return results;
	      };
	      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
	        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
	          return context.getElementsByClassName(className);
	        }
	      };
	      rbuggyMatches = [];
	      rbuggyQSA = [];
	      if ((support.qsa = rnative.test(doc.querySelectorAll))) {
	        assert(function(div) {
	          div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
	          if (div.querySelectorAll("[msallowclip^='']").length) {
	            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
	          }
	          if (!div.querySelectorAll("[selected]").length) {
	            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
	          }
	          if (!div.querySelectorAll(":checked").length) {
	            rbuggyQSA.push(":checked");
	          }
	        });
	        assert(function(div) {
	          var input = doc.createElement("input");
	          input.setAttribute("type", "hidden");
	          div.appendChild(input).setAttribute("name", "D");
	          if (div.querySelectorAll("[name=d]").length) {
	            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
	          }
	          if (!div.querySelectorAll(":enabled").length) {
	            rbuggyQSA.push(":enabled", ":disabled");
	          }
	          div.querySelectorAll("*,:x");
	          rbuggyQSA.push(",.*:");
	        });
	      }
	      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
	        assert(function(div) {
	          support.disconnectedMatch = matches.call(div, "div");
	          matches.call(div, "[s!='']:x");
	          rbuggyMatches.push("!=", pseudos);
	        });
	      }
	      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
	      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
	      hasCompare = rnative.test(docElem.compareDocumentPosition);
	      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
	        var adown = a.nodeType === 9 ? a.documentElement : a,
	            bup = b && b.parentNode;
	        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
	      } : function(a, b) {
	        if (b) {
	          while ((b = b.parentNode)) {
	            if (b === a) {
	              return true;
	            }
	          }
	        }
	        return false;
	      };
	      sortOrder = hasCompare ? function(a, b) {
	        if (a === b) {
	          hasDuplicate = true;
	          return 0;
	        }
	        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	        if (compare) {
	          return compare;
	        }
	        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
	        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
	          if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
	            return -1;
	          }
	          if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
	            return 1;
	          }
	          return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
	        }
	        return compare & 4 ? -1 : 1;
	      } : function(a, b) {
	        if (a === b) {
	          hasDuplicate = true;
	          return 0;
	        }
	        var cur,
	            i = 0,
	            aup = a.parentNode,
	            bup = b.parentNode,
	            ap = [a],
	            bp = [b];
	        if (!aup || !bup) {
	          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0;
	        } else if (aup === bup) {
	          return siblingCheck(a, b);
	        }
	        cur = a;
	        while ((cur = cur.parentNode)) {
	          ap.unshift(cur);
	        }
	        cur = b;
	        while ((cur = cur.parentNode)) {
	          bp.unshift(cur);
	        }
	        while (ap[i] === bp[i]) {
	          i++;
	        }
	        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
	      };
	      return doc;
	    };
	    Sizzle.matches = function(expr, elements) {
	      return Sizzle(expr, null, null, elements);
	    };
	    Sizzle.matchesSelector = function(elem, expr) {
	      if ((elem.ownerDocument || elem) !== document) {
	        setDocument(elem);
	      }
	      expr = expr.replace(rattributeQuotes, "='$1']");
	      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
	        try {
	          var ret = matches.call(elem, expr);
	          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
	            return ret;
	          }
	        } catch (e) {}
	      }
	      return Sizzle(expr, document, null, [elem]).length > 0;
	    };
	    Sizzle.contains = function(context, elem) {
	      if ((context.ownerDocument || context) !== document) {
	        setDocument(context);
	      }
	      return contains(context, elem);
	    };
	    Sizzle.attr = function(elem, name) {
	      if ((elem.ownerDocument || elem) !== document) {
	        setDocument(elem);
	      }
	      var fn = Expr.attrHandle[name.toLowerCase()],
	          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
	      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	    };
	    Sizzle.error = function(msg) {
	      throw new Error("Syntax error, unrecognized expression: " + msg);
	    };
	    Sizzle.uniqueSort = function(results) {
	      var elem,
	          duplicates = [],
	          j = 0,
	          i = 0;
	      hasDuplicate = !support.detectDuplicates;
	      sortInput = !support.sortStable && results.slice(0);
	      results.sort(sortOrder);
	      if (hasDuplicate) {
	        while ((elem = results[i++])) {
	          if (elem === results[i]) {
	            j = duplicates.push(i);
	          }
	        }
	        while (j--) {
	          results.splice(duplicates[j], 1);
	        }
	      }
	      sortInput = null;
	      return results;
	    };
	    getText = Sizzle.getText = function(elem) {
	      var node,
	          ret = "",
	          i = 0,
	          nodeType = elem.nodeType;
	      if (!nodeType) {
	        while ((node = elem[i++])) {
	          ret += getText(node);
	        }
	      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
	        if (typeof elem.textContent === "string") {
	          return elem.textContent;
	        } else {
	          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	            ret += getText(elem);
	          }
	        }
	      } else if (nodeType === 3 || nodeType === 4) {
	        return elem.nodeValue;
	      }
	      return ret;
	    };
	    Expr = Sizzle.selectors = {
	      cacheLength: 50,
	      createPseudo: markFunction,
	      match: matchExpr,
	      attrHandle: {},
	      find: {},
	      relative: {
	        ">": {
	          dir: "parentNode",
	          first: true
	        },
	        " ": {dir: "parentNode"},
	        "+": {
	          dir: "previousSibling",
	          first: true
	        },
	        "~": {dir: "previousSibling"}
	      },
	      preFilter: {
	        "ATTR": function(match) {
	          match[1] = match[1].replace(runescape, funescape);
	          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
	          if (match[2] === "~=") {
	            match[3] = " " + match[3] + " ";
	          }
	          return match.slice(0, 4);
	        },
	        "CHILD": function(match) {
	          match[1] = match[1].toLowerCase();
	          if (match[1].slice(0, 3) === "nth") {
	            if (!match[3]) {
	              Sizzle.error(match[0]);
	            }
	            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
	            match[5] = +((match[7] + match[8]) || match[3] === "odd");
	          } else if (match[3]) {
	            Sizzle.error(match[0]);
	          }
	          return match;
	        },
	        "PSEUDO": function(match) {
	          var excess,
	              unquoted = !match[6] && match[2];
	          if (matchExpr["CHILD"].test(match[0])) {
	            return null;
	          }
	          if (match[3]) {
	            match[2] = match[4] || match[5] || "";
	          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
	            match[0] = match[0].slice(0, excess);
	            match[2] = unquoted.slice(0, excess);
	          }
	          return match.slice(0, 3);
	        }
	      },
	      filter: {
	        "TAG": function(nodeNameSelector) {
	          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
	          return nodeNameSelector === "*" ? function() {
	            return true;
	          } : function(elem) {
	            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
	          };
	        },
	        "CLASS": function(className) {
	          var pattern = classCache[className + " "];
	          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
	            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
	          });
	        },
	        "ATTR": function(name, operator, check) {
	          return function(elem) {
	            var result = Sizzle.attr(elem, name);
	            if (result == null) {
	              return operator === "!=";
	            }
	            if (!operator) {
	              return true;
	            }
	            result += "";
	            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
	          };
	        },
	        "CHILD": function(type, what, argument, first, last) {
	          var simple = type.slice(0, 3) !== "nth",
	              forward = type.slice(-4) !== "last",
	              ofType = what === "of-type";
	          return first === 1 && last === 0 ? function(elem) {
	            return !!elem.parentNode;
	          } : function(elem, context, xml) {
	            var cache,
	                outerCache,
	                node,
	                diff,
	                nodeIndex,
	                start,
	                dir = simple !== forward ? "nextSibling" : "previousSibling",
	                parent = elem.parentNode,
	                name = ofType && elem.nodeName.toLowerCase(),
	                useCache = !xml && !ofType;
	            if (parent) {
	              if (simple) {
	                while (dir) {
	                  node = elem;
	                  while ((node = node[dir])) {
	                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
	                      return false;
	                    }
	                  }
	                  start = dir = type === "only" && !start && "nextSibling";
	                }
	                return true;
	              }
	              start = [forward ? parent.firstChild : parent.lastChild];
	              if (forward && useCache) {
	                outerCache = parent[expando] || (parent[expando] = {});
	                cache = outerCache[type] || [];
	                nodeIndex = cache[0] === dirruns && cache[1];
	                diff = cache[0] === dirruns && cache[2];
	                node = nodeIndex && parent.childNodes[nodeIndex];
	                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
	                  if (node.nodeType === 1 && ++diff && node === elem) {
	                    outerCache[type] = [dirruns, nodeIndex, diff];
	                    break;
	                  }
	                }
	              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
	                diff = cache[1];
	              } else {
	                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
	                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
	                    if (useCache) {
	                      (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
	                    }
	                    if (node === elem) {
	                      break;
	                    }
	                  }
	                }
	              }
	              diff -= last;
	              return diff === first || (diff % first === 0 && diff / first >= 0);
	            }
	          };
	        },
	        "PSEUDO": function(pseudo, argument) {
	          var args,
	              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
	          if (fn[expando]) {
	            return fn(argument);
	          }
	          if (fn.length > 1) {
	            args = [pseudo, pseudo, "", argument];
	            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
	              var idx,
	                  matched = fn(seed, argument),
	                  i = matched.length;
	              while (i--) {
	                idx = indexOf.call(seed, matched[i]);
	                seed[idx] = !(matches[idx] = matched[i]);
	              }
	            }) : function(elem) {
	              return fn(elem, 0, args);
	            };
	          }
	          return fn;
	        }
	      },
	      pseudos: {
	        "not": markFunction(function(selector) {
	          var input = [],
	              results = [],
	              matcher = compile(selector.replace(rtrim, "$1"));
	          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
	            var elem,
	                unmatched = matcher(seed, null, xml, []),
	                i = seed.length;
	            while (i--) {
	              if ((elem = unmatched[i])) {
	                seed[i] = !(matches[i] = elem);
	              }
	            }
	          }) : function(elem, context, xml) {
	            input[0] = elem;
	            matcher(input, null, xml, results);
	            return !results.pop();
	          };
	        }),
	        "has": markFunction(function(selector) {
	          return function(elem) {
	            return Sizzle(selector, elem).length > 0;
	          };
	        }),
	        "contains": markFunction(function(text) {
	          return function(elem) {
	            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
	          };
	        }),
	        "lang": markFunction(function(lang) {
	          if (!ridentifier.test(lang || "")) {
	            Sizzle.error("unsupported lang: " + lang);
	          }
	          lang = lang.replace(runescape, funescape).toLowerCase();
	          return function(elem) {
	            var elemLang;
	            do {
	              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
	                elemLang = elemLang.toLowerCase();
	                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
	              }
	            } while ((elem = elem.parentNode) && elem.nodeType === 1);
	            return false;
	          };
	        }),
	        "target": function(elem) {
	          var hash = window.location && window.location.hash;
	          return hash && hash.slice(1) === elem.id;
	        },
	        "root": function(elem) {
	          return elem === docElem;
	        },
	        "focus": function(elem) {
	          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
	        },
	        "enabled": function(elem) {
	          return elem.disabled === false;
	        },
	        "disabled": function(elem) {
	          return elem.disabled === true;
	        },
	        "checked": function(elem) {
	          var nodeName = elem.nodeName.toLowerCase();
	          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
	        },
	        "selected": function(elem) {
	          if (elem.parentNode) {
	            elem.parentNode.selectedIndex;
	          }
	          return elem.selected === true;
	        },
	        "empty": function(elem) {
	          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
	            if (elem.nodeType < 6) {
	              return false;
	            }
	          }
	          return true;
	        },
	        "parent": function(elem) {
	          return !Expr.pseudos["empty"](elem);
	        },
	        "header": function(elem) {
	          return rheader.test(elem.nodeName);
	        },
	        "input": function(elem) {
	          return rinputs.test(elem.nodeName);
	        },
	        "button": function(elem) {
	          var name = elem.nodeName.toLowerCase();
	          return name === "input" && elem.type === "button" || name === "button";
	        },
	        "text": function(elem) {
	          var attr;
	          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
	        },
	        "first": createPositionalPseudo(function() {
	          return [0];
	        }),
	        "last": createPositionalPseudo(function(matchIndexes, length) {
	          return [length - 1];
	        }),
	        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
	          return [argument < 0 ? argument + length : argument];
	        }),
	        "even": createPositionalPseudo(function(matchIndexes, length) {
	          var i = 0;
	          for (; i < length; i += 2) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "odd": createPositionalPseudo(function(matchIndexes, length) {
	          var i = 1;
	          for (; i < length; i += 2) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
	          var i = argument < 0 ? argument + length : argument;
	          for (; --i >= 0; ) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        }),
	        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
	          var i = argument < 0 ? argument + length : argument;
	          for (; ++i < length; ) {
	            matchIndexes.push(i);
	          }
	          return matchIndexes;
	        })
	      }
	    };
	    Expr.pseudos["nth"] = Expr.pseudos["eq"];
	    for (i in {
	      radio: true,
	      checkbox: true,
	      file: true,
	      password: true,
	      image: true
	    }) {
	      Expr.pseudos[i] = createInputPseudo(i);
	    }
	    for (i in {
	      submit: true,
	      reset: true
	    }) {
	      Expr.pseudos[i] = createButtonPseudo(i);
	    }
	    function setFilters() {}
	    setFilters.prototype = Expr.filters = Expr.pseudos;
	    Expr.setFilters = new setFilters();
	    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
	      var matched,
	          match,
	          tokens,
	          type,
	          soFar,
	          groups,
	          preFilters,
	          cached = tokenCache[selector + " "];
	      if (cached) {
	        return parseOnly ? 0 : cached.slice(0);
	      }
	      soFar = selector;
	      groups = [];
	      preFilters = Expr.preFilter;
	      while (soFar) {
	        if (!matched || (match = rcomma.exec(soFar))) {
	          if (match) {
	            soFar = soFar.slice(match[0].length) || soFar;
	          }
	          groups.push((tokens = []));
	        }
	        matched = false;
	        if ((match = rcombinators.exec(soFar))) {
	          matched = match.shift();
	          tokens.push({
	            value: matched,
	            type: match[0].replace(rtrim, " ")
	          });
	          soFar = soFar.slice(matched.length);
	        }
	        for (type in Expr.filter) {
	          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
	            matched = match.shift();
	            tokens.push({
	              value: matched,
	              type: type,
	              matches: match
	            });
	            soFar = soFar.slice(matched.length);
	          }
	        }
	        if (!matched) {
	          break;
	        }
	      }
	      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
	    };
	    function toSelector(tokens) {
	      var i = 0,
	          len = tokens.length,
	          selector = "";
	      for (; i < len; i++) {
	        selector += tokens[i].value;
	      }
	      return selector;
	    }
	    function addCombinator(matcher, combinator, base) {
	      var dir = combinator.dir,
	          checkNonElements = base && dir === "parentNode",
	          doneName = done++;
	      return combinator.first ? function(elem, context, xml) {
	        while ((elem = elem[dir])) {
	          if (elem.nodeType === 1 || checkNonElements) {
	            return matcher(elem, context, xml);
	          }
	        }
	      } : function(elem, context, xml) {
	        var oldCache,
	            outerCache,
	            newCache = [dirruns, doneName];
	        if (xml) {
	          while ((elem = elem[dir])) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              if (matcher(elem, context, xml)) {
	                return true;
	              }
	            }
	          }
	        } else {
	          while ((elem = elem[dir])) {
	            if (elem.nodeType === 1 || checkNonElements) {
	              outerCache = elem[expando] || (elem[expando] = {});
	              if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
	                return (newCache[2] = oldCache[2]);
	              } else {
	                outerCache[dir] = newCache;
	                if ((newCache[2] = matcher(elem, context, xml))) {
	                  return true;
	                }
	              }
	            }
	          }
	        }
	      };
	    }
	    function elementMatcher(matchers) {
	      return matchers.length > 1 ? function(elem, context, xml) {
	        var i = matchers.length;
	        while (i--) {
	          if (!matchers[i](elem, context, xml)) {
	            return false;
	          }
	        }
	        return true;
	      } : matchers[0];
	    }
	    function multipleContexts(selector, contexts, results) {
	      var i = 0,
	          len = contexts.length;
	      for (; i < len; i++) {
	        Sizzle(selector, contexts[i], results);
	      }
	      return results;
	    }
	    function condense(unmatched, map, filter, context, xml) {
	      var elem,
	          newUnmatched = [],
	          i = 0,
	          len = unmatched.length,
	          mapped = map != null;
	      for (; i < len; i++) {
	        if ((elem = unmatched[i])) {
	          if (!filter || filter(elem, context, xml)) {
	            newUnmatched.push(elem);
	            if (mapped) {
	              map.push(i);
	            }
	          }
	        }
	      }
	      return newUnmatched;
	    }
	    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	      if (postFilter && !postFilter[expando]) {
	        postFilter = setMatcher(postFilter);
	      }
	      if (postFinder && !postFinder[expando]) {
	        postFinder = setMatcher(postFinder, postSelector);
	      }
	      return markFunction(function(seed, results, context, xml) {
	        var temp,
	            i,
	            elem,
	            preMap = [],
	            postMap = [],
	            preexisting = results.length,
	            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
	            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
	            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
	        if (matcher) {
	          matcher(matcherIn, matcherOut, context, xml);
	        }
	        if (postFilter) {
	          temp = condense(matcherOut, postMap);
	          postFilter(temp, [], context, xml);
	          i = temp.length;
	          while (i--) {
	            if ((elem = temp[i])) {
	              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
	            }
	          }
	        }
	        if (seed) {
	          if (postFinder || preFilter) {
	            if (postFinder) {
	              temp = [];
	              i = matcherOut.length;
	              while (i--) {
	                if ((elem = matcherOut[i])) {
	                  temp.push((matcherIn[i] = elem));
	                }
	              }
	              postFinder(null, (matcherOut = []), temp, xml);
	            }
	            i = matcherOut.length;
	            while (i--) {
	              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
	                seed[temp] = !(results[temp] = elem);
	              }
	            }
	          }
	        } else {
	          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
	          if (postFinder) {
	            postFinder(null, results, matcherOut, xml);
	          } else {
	            push.apply(results, matcherOut);
	          }
	        }
	      });
	    }
	    function matcherFromTokens(tokens) {
	      var checkContext,
	          matcher,
	          j,
	          len = tokens.length,
	          leadingRelative = Expr.relative[tokens[0].type],
	          implicitRelative = leadingRelative || Expr.relative[" "],
	          i = leadingRelative ? 1 : 0,
	          matchContext = addCombinator(function(elem) {
	            return elem === checkContext;
	          }, implicitRelative, true),
	          matchAnyContext = addCombinator(function(elem) {
	            return indexOf.call(checkContext, elem) > -1;
	          }, implicitRelative, true),
	          matchers = [function(elem, context, xml) {
	            return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
	          }];
	      for (; i < len; i++) {
	        if ((matcher = Expr.relative[tokens[i].type])) {
	          matchers = [addCombinator(elementMatcher(matchers), matcher)];
	        } else {
	          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
	          if (matcher[expando]) {
	            j = ++i;
	            for (; j < len; j++) {
	              if (Expr.relative[tokens[j].type]) {
	                break;
	              }
	            }
	            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
	          }
	          matchers.push(matcher);
	        }
	      }
	      return elementMatcher(matchers);
	    }
	    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	      var bySet = setMatchers.length > 0,
	          byElement = elementMatchers.length > 0,
	          superMatcher = function(seed, context, xml, results, outermost) {
	            var elem,
	                j,
	                matcher,
	                matchedCount = 0,
	                i = "0",
	                unmatched = seed && [],
	                setMatched = [],
	                contextBackup = outermostContext,
	                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
	                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
	                len = elems.length;
	            if (outermost) {
	              outermostContext = context !== document && context;
	            }
	            for (; i !== len && (elem = elems[i]) != null; i++) {
	              if (byElement && elem) {
	                j = 0;
	                while ((matcher = elementMatchers[j++])) {
	                  if (matcher(elem, context, xml)) {
	                    results.push(elem);
	                    break;
	                  }
	                }
	                if (outermost) {
	                  dirruns = dirrunsUnique;
	                }
	              }
	              if (bySet) {
	                if ((elem = !matcher && elem)) {
	                  matchedCount--;
	                }
	                if (seed) {
	                  unmatched.push(elem);
	                }
	              }
	            }
	            matchedCount += i;
	            if (bySet && i !== matchedCount) {
	              j = 0;
	              while ((matcher = setMatchers[j++])) {
	                matcher(unmatched, setMatched, context, xml);
	              }
	              if (seed) {
	                if (matchedCount > 0) {
	                  while (i--) {
	                    if (!(unmatched[i] || setMatched[i])) {
	                      setMatched[i] = pop.call(results);
	                    }
	                  }
	                }
	                setMatched = condense(setMatched);
	              }
	              push.apply(results, setMatched);
	              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
	                Sizzle.uniqueSort(results);
	              }
	            }
	            if (outermost) {
	              dirruns = dirrunsUnique;
	              outermostContext = contextBackup;
	            }
	            return unmatched;
	          };
	      return bySet ? markFunction(superMatcher) : superMatcher;
	    }
	    compile = Sizzle.compile = function(selector, match) {
	      var i,
	          setMatchers = [],
	          elementMatchers = [],
	          cached = compilerCache[selector + " "];
	      if (!cached) {
	        if (!match) {
	          match = tokenize(selector);
	        }
	        i = match.length;
	        while (i--) {
	          cached = matcherFromTokens(match[i]);
	          if (cached[expando]) {
	            setMatchers.push(cached);
	          } else {
	            elementMatchers.push(cached);
	          }
	        }
	        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
	        cached.selector = selector;
	      }
	      return cached;
	    };
	    select = Sizzle.select = function(selector, context, results, seed) {
	      var i,
	          tokens,
	          token,
	          type,
	          find,
	          compiled = typeof selector === "function" && selector,
	          match = !seed && tokenize((selector = compiled.selector || selector));
	      results = results || [];
	      if (match.length === 1) {
	        tokens = match[0] = match[0].slice(0);
	        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
	          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
	          if (!context) {
	            return results;
	          } else if (compiled) {
	            context = context.parentNode;
	          }
	          selector = selector.slice(tokens.shift().value.length);
	        }
	        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
	        while (i--) {
	          token = tokens[i];
	          if (Expr.relative[(type = token.type)]) {
	            break;
	          }
	          if ((find = Expr.find[type])) {
	            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
	              tokens.splice(i, 1);
	              selector = seed.length && toSelector(tokens);
	              if (!selector) {
	                push.apply(results, seed);
	                return results;
	              }
	              break;
	            }
	          }
	        }
	      }
	      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
	      return results;
	    };
	    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
	    support.detectDuplicates = !!hasDuplicate;
	    setDocument();
	    support.sortDetached = assert(function(div1) {
	      return div1.compareDocumentPosition(document.createElement("div")) & 1;
	    });
	    if (!assert(function(div) {
	      div.innerHTML = "<a href='#'></a>";
	      return div.firstChild.getAttribute("href") === "#";
	    })) {
	      addHandle("type|href|height|width", function(elem, name, isXML) {
	        if (!isXML) {
	          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
	        }
	      });
	    }
	    if (!support.attributes || !assert(function(div) {
	      div.innerHTML = "<input/>";
	      div.firstChild.setAttribute("value", "");
	      return div.firstChild.getAttribute("value") === "";
	    })) {
	      addHandle("value", function(elem, name, isXML) {
	        if (!isXML && elem.nodeName.toLowerCase() === "input") {
	          return elem.defaultValue;
	        }
	      });
	    }
	    if (!assert(function(div) {
	      return div.getAttribute("disabled") == null;
	    })) {
	      addHandle(booleans, function(elem, name, isXML) {
	        var val;
	        if (!isXML) {
	          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	        }
	      });
	    }
	    return Sizzle;
	  })(window);
	  jQuery.find = Sizzle;
	  jQuery.expr = Sizzle.selectors;
	  jQuery.expr[":"] = jQuery.expr.pseudos;
	  jQuery.unique = Sizzle.uniqueSort;
	  jQuery.text = Sizzle.getText;
	  jQuery.isXMLDoc = Sizzle.isXML;
	  jQuery.contains = Sizzle.contains;
	  var rneedsContext = jQuery.expr.match.needsContext;
	  var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	  var risSimple = /^.[^:#\[\.,]*$/;
	  function winnow(elements, qualifier, not) {
	    if (jQuery.isFunction(qualifier)) {
	      return jQuery.grep(elements, function(elem, i) {
	        return !!qualifier.call(elem, i, elem) !== not;
	      });
	    }
	    if (qualifier.nodeType) {
	      return jQuery.grep(elements, function(elem) {
	        return (elem === qualifier) !== not;
	      });
	    }
	    if (typeof qualifier === "string") {
	      if (risSimple.test(qualifier)) {
	        return jQuery.filter(qualifier, elements, not);
	      }
	      qualifier = jQuery.filter(qualifier, elements);
	    }
	    return jQuery.grep(elements, function(elem) {
	      return (indexOf.call(qualifier, elem) >= 0) !== not;
	    });
	  }
	  jQuery.filter = function(expr, elems, not) {
	    var elem = elems[0];
	    if (not) {
	      expr = ":not(" + expr + ")";
	    }
	    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
	      return elem.nodeType === 1;
	    }));
	  };
	  jQuery.fn.extend({
	    find: function(selector) {
	      var i,
	          len = this.length,
	          ret = [],
	          self = this;
	      if (typeof selector !== "string") {
	        return this.pushStack(jQuery(selector).filter(function() {
	          for (i = 0; i < len; i++) {
	            if (jQuery.contains(self[i], this)) {
	              return true;
	            }
	          }
	        }));
	      }
	      for (i = 0; i < len; i++) {
	        jQuery.find(selector, self[i], ret);
	      }
	      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
	      ret.selector = this.selector ? this.selector + " " + selector : selector;
	      return ret;
	    },
	    filter: function(selector) {
	      return this.pushStack(winnow(this, selector || [], false));
	    },
	    not: function(selector) {
	      return this.pushStack(winnow(this, selector || [], true));
	    },
	    is: function(selector) {
	      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
	    }
	  });
	  var rootjQuery,
	      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	      init = jQuery.fn.init = function(selector, context) {
	        var match,
	            elem;
	        if (!selector) {
	          return this;
	        }
	        if (typeof selector === "string") {
	          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
	            match = [null, selector, null];
	          } else {
	            match = rquickExpr.exec(selector);
	          }
	          if (match && (match[1] || !context)) {
	            if (match[1]) {
	              context = context instanceof jQuery ? context[0] : context;
	              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
	              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
	                for (match in context) {
	                  if (jQuery.isFunction(this[match])) {
	                    this[match](context[match]);
	                  } else {
	                    this.attr(match, context[match]);
	                  }
	                }
	              }
	              return this;
	            } else {
	              elem = document.getElementById(match[2]);
	              if (elem && elem.parentNode) {
	                this.length = 1;
	                this[0] = elem;
	              }
	              this.context = document;
	              this.selector = selector;
	              return this;
	            }
	          } else if (!context || context.jquery) {
	            return (context || rootjQuery).find(selector);
	          } else {
	            return this.constructor(context).find(selector);
	          }
	        } else if (selector.nodeType) {
	          this.context = this[0] = selector;
	          this.length = 1;
	          return this;
	        } else if (jQuery.isFunction(selector)) {
	          return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
	        }
	        if (selector.selector !== undefined) {
	          this.selector = selector.selector;
	          this.context = selector.context;
	        }
	        return jQuery.makeArray(selector, this);
	      };
	  init.prototype = jQuery.fn;
	  rootjQuery = jQuery(document);
	  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	      guaranteedUnique = {
	        children: true,
	        contents: true,
	        next: true,
	        prev: true
	      };
	  jQuery.extend({
	    dir: function(elem, dir, until) {
	      var matched = [],
	          truncate = until !== undefined;
	      while ((elem = elem[dir]) && elem.nodeType !== 9) {
	        if (elem.nodeType === 1) {
	          if (truncate && jQuery(elem).is(until)) {
	            break;
	          }
	          matched.push(elem);
	        }
	      }
	      return matched;
	    },
	    sibling: function(n, elem) {
	      var matched = [];
	      for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== elem) {
	          matched.push(n);
	        }
	      }
	      return matched;
	    }
	  });
	  jQuery.fn.extend({
	    has: function(target) {
	      var targets = jQuery(target, this),
	          l = targets.length;
	      return this.filter(function() {
	        var i = 0;
	        for (; i < l; i++) {
	          if (jQuery.contains(this, targets[i])) {
	            return true;
	          }
	        }
	      });
	    },
	    closest: function(selectors, context) {
	      var cur,
	          i = 0,
	          l = this.length,
	          matched = [],
	          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
	      for (; i < l; i++) {
	        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
	          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
	            matched.push(cur);
	            break;
	          }
	        }
	      }
	      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
	    },
	    index: function(elem) {
	      if (!elem) {
	        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
	      }
	      if (typeof elem === "string") {
	        return indexOf.call(jQuery(elem), this[0]);
	      }
	      return indexOf.call(this, elem.jquery ? elem[0] : elem);
	    },
	    add: function(selector, context) {
	      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
	    },
	    addBack: function(selector) {
	      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
	    }
	  });
	  function sibling(cur, dir) {
	    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
	    return cur;
	  }
	  jQuery.each({
	    parent: function(elem) {
	      var parent = elem.parentNode;
	      return parent && parent.nodeType !== 11 ? parent : null;
	    },
	    parents: function(elem) {
	      return jQuery.dir(elem, "parentNode");
	    },
	    parentsUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "parentNode", until);
	    },
	    next: function(elem) {
	      return sibling(elem, "nextSibling");
	    },
	    prev: function(elem) {
	      return sibling(elem, "previousSibling");
	    },
	    nextAll: function(elem) {
	      return jQuery.dir(elem, "nextSibling");
	    },
	    prevAll: function(elem) {
	      return jQuery.dir(elem, "previousSibling");
	    },
	    nextUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "nextSibling", until);
	    },
	    prevUntil: function(elem, i, until) {
	      return jQuery.dir(elem, "previousSibling", until);
	    },
	    siblings: function(elem) {
	      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
	    },
	    children: function(elem) {
	      return jQuery.sibling(elem.firstChild);
	    },
	    contents: function(elem) {
	      return elem.contentDocument || jQuery.merge([], elem.childNodes);
	    }
	  }, function(name, fn) {
	    jQuery.fn[name] = function(until, selector) {
	      var matched = jQuery.map(this, fn, until);
	      if (name.slice(-5) !== "Until") {
	        selector = until;
	      }
	      if (selector && typeof selector === "string") {
	        matched = jQuery.filter(selector, matched);
	      }
	      if (this.length > 1) {
	        if (!guaranteedUnique[name]) {
	          jQuery.unique(matched);
	        }
	        if (rparentsprev.test(name)) {
	          matched.reverse();
	        }
	      }
	      return this.pushStack(matched);
	    };
	  });
	  var rnotwhite = (/\S+/g);
	  var optionsCache = {};
	  function createOptions(options) {
	    var object = optionsCache[options] = {};
	    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
	      object[flag] = true;
	    });
	    return object;
	  }
	  jQuery.Callbacks = function(options) {
	    options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
	    var memory,
	        fired,
	        firing,
	        firingStart,
	        firingLength,
	        firingIndex,
	        list = [],
	        stack = !options.once && [],
	        fire = function(data) {
	          memory = options.memory && data;
	          fired = true;
	          firingIndex = firingStart || 0;
	          firingStart = 0;
	          firingLength = list.length;
	          firing = true;
	          for (; list && firingIndex < firingLength; firingIndex++) {
	            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
	              memory = false;
	              break;
	            }
	          }
	          firing = false;
	          if (list) {
	            if (stack) {
	              if (stack.length) {
	                fire(stack.shift());
	              }
	            } else if (memory) {
	              list = [];
	            } else {
	              self.disable();
	            }
	          }
	        },
	        self = {
	          add: function() {
	            if (list) {
	              var start = list.length;
	              (function add(args) {
	                jQuery.each(args, function(_, arg) {
	                  var type = jQuery.type(arg);
	                  if (type === "function") {
	                    if (!options.unique || !self.has(arg)) {
	                      list.push(arg);
	                    }
	                  } else if (arg && arg.length && type !== "string") {
	                    add(arg);
	                  }
	                });
	              })(arguments);
	              if (firing) {
	                firingLength = list.length;
	              } else if (memory) {
	                firingStart = start;
	                fire(memory);
	              }
	            }
	            return this;
	          },
	          remove: function() {
	            if (list) {
	              jQuery.each(arguments, function(_, arg) {
	                var index;
	                while ((index = jQuery.inArray(arg, list, index)) > -1) {
	                  list.splice(index, 1);
	                  if (firing) {
	                    if (index <= firingLength) {
	                      firingLength--;
	                    }
	                    if (index <= firingIndex) {
	                      firingIndex--;
	                    }
	                  }
	                }
	              });
	            }
	            return this;
	          },
	          has: function(fn) {
	            return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
	          },
	          empty: function() {
	            list = [];
	            firingLength = 0;
	            return this;
	          },
	          disable: function() {
	            list = stack = memory = undefined;
	            return this;
	          },
	          disabled: function() {
	            return !list;
	          },
	          lock: function() {
	            stack = undefined;
	            if (!memory) {
	              self.disable();
	            }
	            return this;
	          },
	          locked: function() {
	            return !stack;
	          },
	          fireWith: function(context, args) {
	            if (list && (!fired || stack)) {
	              args = args || [];
	              args = [context, args.slice ? args.slice() : args];
	              if (firing) {
	                stack.push(args);
	              } else {
	                fire(args);
	              }
	            }
	            return this;
	          },
	          fire: function() {
	            self.fireWith(this, arguments);
	            return this;
	          },
	          fired: function() {
	            return !!fired;
	          }
	        };
	    return self;
	  };
	  jQuery.extend({
	    Deferred: function(func) {
	      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
	          state = "pending",
	          promise = {
	            state: function() {
	              return state;
	            },
	            always: function() {
	              deferred.done(arguments).fail(arguments);
	              return this;
	            },
	            then: function() {
	              var fns = arguments;
	              return jQuery.Deferred(function(newDefer) {
	                jQuery.each(tuples, function(i, tuple) {
	                  var fn = jQuery.isFunction(fns[i]) && fns[i];
	                  deferred[tuple[1]](function() {
	                    var returned = fn && fn.apply(this, arguments);
	                    if (returned && jQuery.isFunction(returned.promise)) {
	                      returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
	                    } else {
	                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
	                    }
	                  });
	                });
	                fns = null;
	              }).promise();
	            },
	            promise: function(obj) {
	              return obj != null ? jQuery.extend(obj, promise) : promise;
	            }
	          },
	          deferred = {};
	      promise.pipe = promise.then;
	      jQuery.each(tuples, function(i, tuple) {
	        var list = tuple[2],
	            stateString = tuple[3];
	        promise[tuple[1]] = list.add;
	        if (stateString) {
	          list.add(function() {
	            state = stateString;
	          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
	        }
	        deferred[tuple[0]] = function() {
	          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
	          return this;
	        };
	        deferred[tuple[0] + "With"] = list.fireWith;
	      });
	      promise.promise(deferred);
	      if (func) {
	        func.call(deferred, deferred);
	      }
	      return deferred;
	    },
	    when: function(subordinate) {
	      var i = 0,
	          resolveValues = slice.call(arguments),
	          length = resolveValues.length,
	          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
	          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	          updateFunc = function(i, contexts, values) {
	            return function(value) {
	              contexts[i] = this;
	              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
	              if (values === progressValues) {
	                deferred.notifyWith(contexts, values);
	              } else if (!(--remaining)) {
	                deferred.resolveWith(contexts, values);
	              }
	            };
	          },
	          progressValues,
	          progressContexts,
	          resolveContexts;
	      if (length > 1) {
	        progressValues = new Array(length);
	        progressContexts = new Array(length);
	        resolveContexts = new Array(length);
	        for (; i < length; i++) {
	          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
	            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
	          } else {
	            --remaining;
	          }
	        }
	      }
	      if (!remaining) {
	        deferred.resolveWith(resolveContexts, resolveValues);
	      }
	      return deferred.promise();
	    }
	  });
	  var readyList;
	  jQuery.fn.ready = function(fn) {
	    jQuery.ready.promise().done(fn);
	    return this;
	  };
	  jQuery.extend({
	    isReady: false,
	    readyWait: 1,
	    holdReady: function(hold) {
	      if (hold) {
	        jQuery.readyWait++;
	      } else {
	        jQuery.ready(true);
	      }
	    },
	    ready: function(wait) {
	      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
	        return;
	      }
	      jQuery.isReady = true;
	      if (wait !== true && --jQuery.readyWait > 0) {
	        return;
	      }
	      readyList.resolveWith(document, [jQuery]);
	      if (jQuery.fn.triggerHandler) {
	        jQuery(document).triggerHandler("ready");
	        jQuery(document).off("ready");
	      }
	    }
	  });
	  function completed() {
	    document.removeEventListener("DOMContentLoaded", completed, false);
	    window.removeEventListener("load", completed, false);
	    jQuery.ready();
	  }
	  jQuery.ready.promise = function(obj) {
	    if (!readyList) {
	      readyList = jQuery.Deferred();
	      if (document.readyState === "complete") {
	        setTimeout(jQuery.ready);
	      } else {
	        document.addEventListener("DOMContentLoaded", completed, false);
	        window.addEventListener("load", completed, false);
	      }
	    }
	    return readyList.promise(obj);
	  };
	  jQuery.ready.promise();
	  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
	    var i = 0,
	        len = elems.length,
	        bulk = key == null;
	    if (jQuery.type(key) === "object") {
	      chainable = true;
	      for (i in key) {
	        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
	      }
	    } else if (value !== undefined) {
	      chainable = true;
	      if (!jQuery.isFunction(value)) {
	        raw = true;
	      }
	      if (bulk) {
	        if (raw) {
	          fn.call(elems, value);
	          fn = null;
	        } else {
	          bulk = fn;
	          fn = function(elem, key, value) {
	            return bulk.call(jQuery(elem), value);
	          };
	        }
	      }
	      if (fn) {
	        for (; i < len; i++) {
	          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
	        }
	      }
	    }
	    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	  };
	  jQuery.acceptData = function(owner) {
	    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
	  };
	  function Data() {
	    Object.defineProperty(this.cache = {}, 0, {get: function() {
	        return {};
	      }});
	    this.expando = jQuery.expando + Math.random();
	  }
	  Data.uid = 1;
	  Data.accepts = jQuery.acceptData;
	  Data.prototype = {
	    key: function(owner) {
	      if (!Data.accepts(owner)) {
	        return 0;
	      }
	      var descriptor = {},
	          unlock = owner[this.expando];
	      if (!unlock) {
	        unlock = Data.uid++;
	        try {
	          descriptor[this.expando] = {value: unlock};
	          Object.defineProperties(owner, descriptor);
	        } catch (e) {
	          descriptor[this.expando] = unlock;
	          jQuery.extend(owner, descriptor);
	        }
	      }
	      if (!this.cache[unlock]) {
	        this.cache[unlock] = {};
	      }
	      return unlock;
	    },
	    set: function(owner, data, value) {
	      var prop,
	          unlock = this.key(owner),
	          cache = this.cache[unlock];
	      if (typeof data === "string") {
	        cache[data] = value;
	      } else {
	        if (jQuery.isEmptyObject(cache)) {
	          jQuery.extend(this.cache[unlock], data);
	        } else {
	          for (prop in data) {
	            cache[prop] = data[prop];
	          }
	        }
	      }
	      return cache;
	    },
	    get: function(owner, key) {
	      var cache = this.cache[this.key(owner)];
	      return key === undefined ? cache : cache[key];
	    },
	    access: function(owner, key, value) {
	      var stored;
	      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
	        stored = this.get(owner, key);
	        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
	      }
	      this.set(owner, key, value);
	      return value !== undefined ? value : key;
	    },
	    remove: function(owner, key) {
	      var i,
	          name,
	          camel,
	          unlock = this.key(owner),
	          cache = this.cache[unlock];
	      if (key === undefined) {
	        this.cache[unlock] = {};
	      } else {
	        if (jQuery.isArray(key)) {
	          name = key.concat(key.map(jQuery.camelCase));
	        } else {
	          camel = jQuery.camelCase(key);
	          if (key in cache) {
	            name = [key, camel];
	          } else {
	            name = camel;
	            name = name in cache ? [name] : (name.match(rnotwhite) || []);
	          }
	        }
	        i = name.length;
	        while (i--) {
	          delete cache[name[i]];
	        }
	      }
	    },
	    hasData: function(owner) {
	      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
	    },
	    discard: function(owner) {
	      if (owner[this.expando]) {
	        delete this.cache[owner[this.expando]];
	      }
	    }
	  };
	  var data_priv = new Data();
	  var data_user = new Data();
	  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	      rmultiDash = /([A-Z])/g;
	  function dataAttr(elem, key, data) {
	    var name;
	    if (data === undefined && elem.nodeType === 1) {
	      name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
	      data = elem.getAttribute(name);
	      if (typeof data === "string") {
	        try {
	          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
	        } catch (e) {}
	        data_user.set(elem, key, data);
	      } else {
	        data = undefined;
	      }
	    }
	    return data;
	  }
	  jQuery.extend({
	    hasData: function(elem) {
	      return data_user.hasData(elem) || data_priv.hasData(elem);
	    },
	    data: function(elem, name, data) {
	      return data_user.access(elem, name, data);
	    },
	    removeData: function(elem, name) {
	      data_user.remove(elem, name);
	    },
	    _data: function(elem, name, data) {
	      return data_priv.access(elem, name, data);
	    },
	    _removeData: function(elem, name) {
	      data_priv.remove(elem, name);
	    }
	  });
	  jQuery.fn.extend({
	    data: function(key, value) {
	      var i,
	          name,
	          data,
	          elem = this[0],
	          attrs = elem && elem.attributes;
	      if (key === undefined) {
	        if (this.length) {
	          data = data_user.get(elem);
	          if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
	            i = attrs.length;
	            while (i--) {
	              if (attrs[i]) {
	                name = attrs[i].name;
	                if (name.indexOf("data-") === 0) {
	                  name = jQuery.camelCase(name.slice(5));
	                  dataAttr(elem, name, data[name]);
	                }
	              }
	            }
	            data_priv.set(elem, "hasDataAttrs", true);
	          }
	        }
	        return data;
	      }
	      if (typeof key === "object") {
	        return this.each(function() {
	          data_user.set(this, key);
	        });
	      }
	      return access(this, function(value) {
	        var data,
	            camelKey = jQuery.camelCase(key);
	        if (elem && value === undefined) {
	          data = data_user.get(elem, key);
	          if (data !== undefined) {
	            return data;
	          }
	          data = data_user.get(elem, camelKey);
	          if (data !== undefined) {
	            return data;
	          }
	          data = dataAttr(elem, camelKey, undefined);
	          if (data !== undefined) {
	            return data;
	          }
	          return;
	        }
	        this.each(function() {
	          var data = data_user.get(this, camelKey);
	          data_user.set(this, camelKey, value);
	          if (key.indexOf("-") !== -1 && data !== undefined) {
	            data_user.set(this, key, value);
	          }
	        });
	      }, null, value, arguments.length > 1, null, true);
	    },
	    removeData: function(key) {
	      return this.each(function() {
	        data_user.remove(this, key);
	      });
	    }
	  });
	  jQuery.extend({
	    queue: function(elem, type, data) {
	      var queue;
	      if (elem) {
	        type = (type || "fx") + "queue";
	        queue = data_priv.get(elem, type);
	        if (data) {
	          if (!queue || jQuery.isArray(data)) {
	            queue = data_priv.access(elem, type, jQuery.makeArray(data));
	          } else {
	            queue.push(data);
	          }
	        }
	        return queue || [];
	      }
	    },
	    dequeue: function(elem, type) {
	      type = type || "fx";
	      var queue = jQuery.queue(elem, type),
	          startLength = queue.length,
	          fn = queue.shift(),
	          hooks = jQuery._queueHooks(elem, type),
	          next = function() {
	            jQuery.dequeue(elem, type);
	          };
	      if (fn === "inprogress") {
	        fn = queue.shift();
	        startLength--;
	      }
	      if (fn) {
	        if (type === "fx") {
	          queue.unshift("inprogress");
	        }
	        delete hooks.stop;
	        fn.call(elem, next, hooks);
	      }
	      if (!startLength && hooks) {
	        hooks.empty.fire();
	      }
	    },
	    _queueHooks: function(elem, type) {
	      var key = type + "queueHooks";
	      return data_priv.get(elem, key) || data_priv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
	          data_priv.remove(elem, [type + "queue", key]);
	        })});
	    }
	  });
	  jQuery.fn.extend({
	    queue: function(type, data) {
	      var setter = 2;
	      if (typeof type !== "string") {
	        data = type;
	        type = "fx";
	        setter--;
	      }
	      if (arguments.length < setter) {
	        return jQuery.queue(this[0], type);
	      }
	      return data === undefined ? this : this.each(function() {
	        var queue = jQuery.queue(this, type, data);
	        jQuery._queueHooks(this, type);
	        if (type === "fx" && queue[0] !== "inprogress") {
	          jQuery.dequeue(this, type);
	        }
	      });
	    },
	    dequeue: function(type) {
	      return this.each(function() {
	        jQuery.dequeue(this, type);
	      });
	    },
	    clearQueue: function(type) {
	      return this.queue(type || "fx", []);
	    },
	    promise: function(type, obj) {
	      var tmp,
	          count = 1,
	          defer = jQuery.Deferred(),
	          elements = this,
	          i = this.length,
	          resolve = function() {
	            if (!(--count)) {
	              defer.resolveWith(elements, [elements]);
	            }
	          };
	      if (typeof type !== "string") {
	        obj = type;
	        type = undefined;
	      }
	      type = type || "fx";
	      while (i--) {
	        tmp = data_priv.get(elements[i], type + "queueHooks");
	        if (tmp && tmp.empty) {
	          count++;
	          tmp.empty.add(resolve);
	        }
	      }
	      resolve();
	      return defer.promise(obj);
	    }
	  });
	  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	  var cssExpand = ["Top", "Right", "Bottom", "Left"];
	  var isHidden = function(elem, el) {
	    elem = el || elem;
	    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	  };
	  var rcheckableType = (/^(?:checkbox|radio)$/i);
	  (function() {
	    var fragment = document.createDocumentFragment(),
	        div = fragment.appendChild(document.createElement("div")),
	        input = document.createElement("input");
	    input.setAttribute("type", "radio");
	    input.setAttribute("checked", "checked");
	    input.setAttribute("name", "t");
	    div.appendChild(input);
	    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
	    div.innerHTML = "<textarea>x</textarea>";
	    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	  })();
	  var strundefined = typeof undefined;
	  support.focusinBubbles = "onfocusin" in window;
	  var rkeyEvent = /^key/,
	      rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	      rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	      rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	  function returnTrue() {
	    return true;
	  }
	  function returnFalse() {
	    return false;
	  }
	  function safeActiveElement() {
	    try {
	      return document.activeElement;
	    } catch (err) {}
	  }
	  jQuery.event = {
	    global: {},
	    add: function(elem, types, handler, data, selector) {
	      var handleObjIn,
	          eventHandle,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = data_priv.get(elem);
	      if (!elemData) {
	        return;
	      }
	      if (handler.handler) {
	        handleObjIn = handler;
	        handler = handleObjIn.handler;
	        selector = handleObjIn.selector;
	      }
	      if (!handler.guid) {
	        handler.guid = jQuery.guid++;
	      }
	      if (!(events = elemData.events)) {
	        events = elemData.events = {};
	      }
	      if (!(eventHandle = elemData.handle)) {
	        eventHandle = elemData.handle = function(e) {
	          return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
	        };
	      }
	      types = (types || "").match(rnotwhite) || [""];
	      t = types.length;
	      while (t--) {
	        tmp = rtypenamespace.exec(types[t]) || [];
	        type = origType = tmp[1];
	        namespaces = (tmp[2] || "").split(".").sort();
	        if (!type) {
	          continue;
	        }
	        special = jQuery.event.special[type] || {};
	        type = (selector ? special.delegateType : special.bindType) || type;
	        special = jQuery.event.special[type] || {};
	        handleObj = jQuery.extend({
	          type: type,
	          origType: origType,
	          data: data,
	          handler: handler,
	          guid: handler.guid,
	          selector: selector,
	          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
	          namespace: namespaces.join(".")
	        }, handleObjIn);
	        if (!(handlers = events[type])) {
	          handlers = events[type] = [];
	          handlers.delegateCount = 0;
	          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
	            if (elem.addEventListener) {
	              elem.addEventListener(type, eventHandle, false);
	            }
	          }
	        }
	        if (special.add) {
	          special.add.call(elem, handleObj);
	          if (!handleObj.handler.guid) {
	            handleObj.handler.guid = handler.guid;
	          }
	        }
	        if (selector) {
	          handlers.splice(handlers.delegateCount++, 0, handleObj);
	        } else {
	          handlers.push(handleObj);
	        }
	        jQuery.event.global[type] = true;
	      }
	    },
	    remove: function(elem, types, handler, selector, mappedTypes) {
	      var j,
	          origCount,
	          tmp,
	          events,
	          t,
	          handleObj,
	          special,
	          handlers,
	          type,
	          namespaces,
	          origType,
	          elemData = data_priv.hasData(elem) && data_priv.get(elem);
	      if (!elemData || !(events = elemData.events)) {
	        return;
	      }
	      types = (types || "").match(rnotwhite) || [""];
	      t = types.length;
	      while (t--) {
	        tmp = rtypenamespace.exec(types[t]) || [];
	        type = origType = tmp[1];
	        namespaces = (tmp[2] || "").split(".").sort();
	        if (!type) {
	          for (type in events) {
	            jQuery.event.remove(elem, type + types[t], handler, selector, true);
	          }
	          continue;
	        }
	        special = jQuery.event.special[type] || {};
	        type = (selector ? special.delegateType : special.bindType) || type;
	        handlers = events[type] || [];
	        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
	        origCount = j = handlers.length;
	        while (j--) {
	          handleObj = handlers[j];
	          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
	            handlers.splice(j, 1);
	            if (handleObj.selector) {
	              handlers.delegateCount--;
	            }
	            if (special.remove) {
	              special.remove.call(elem, handleObj);
	            }
	          }
	        }
	        if (origCount && !handlers.length) {
	          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
	            jQuery.removeEvent(elem, type, elemData.handle);
	          }
	          delete events[type];
	        }
	      }
	      if (jQuery.isEmptyObject(events)) {
	        delete elemData.handle;
	        data_priv.remove(elem, "events");
	      }
	    },
	    trigger: function(event, data, elem, onlyHandlers) {
	      var i,
	          cur,
	          tmp,
	          bubbleType,
	          ontype,
	          handle,
	          special,
	          eventPath = [elem || document],
	          type = hasOwn.call(event, "type") ? event.type : event,
	          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
	      cur = tmp = elem = elem || document;
	      if (elem.nodeType === 3 || elem.nodeType === 8) {
	        return;
	      }
	      if (rfocusMorph.test(type + jQuery.event.triggered)) {
	        return;
	      }
	      if (type.indexOf(".") >= 0) {
	        namespaces = type.split(".");
	        type = namespaces.shift();
	        namespaces.sort();
	      }
	      ontype = type.indexOf(":") < 0 && "on" + type;
	      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
	      event.isTrigger = onlyHandlers ? 2 : 3;
	      event.namespace = namespaces.join(".");
	      event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
	      event.result = undefined;
	      if (!event.target) {
	        event.target = elem;
	      }
	      data = data == null ? [event] : jQuery.makeArray(data, [event]);
	      special = jQuery.event.special[type] || {};
	      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
	        return;
	      }
	      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
	        bubbleType = special.delegateType || type;
	        if (!rfocusMorph.test(bubbleType + type)) {
	          cur = cur.parentNode;
	        }
	        for (; cur; cur = cur.parentNode) {
	          eventPath.push(cur);
	          tmp = cur;
	        }
	        if (tmp === (elem.ownerDocument || document)) {
	          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
	        }
	      }
	      i = 0;
	      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
	        event.type = i > 1 ? bubbleType : special.bindType || type;
	        handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
	        if (handle) {
	          handle.apply(cur, data);
	        }
	        handle = ontype && cur[ontype];
	        if (handle && handle.apply && jQuery.acceptData(cur)) {
	          event.result = handle.apply(cur, data);
	          if (event.result === false) {
	            event.preventDefault();
	          }
	        }
	      }
	      event.type = type;
	      if (!onlyHandlers && !event.isDefaultPrevented()) {
	        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
	          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
	            tmp = elem[ontype];
	            if (tmp) {
	              elem[ontype] = null;
	            }
	            jQuery.event.triggered = type;
	            elem[type]();
	            jQuery.event.triggered = undefined;
	            if (tmp) {
	              elem[ontype] = tmp;
	            }
	          }
	        }
	      }
	      return event.result;
	    },
	    dispatch: function(event) {
	      event = jQuery.event.fix(event);
	      var i,
	          j,
	          ret,
	          matched,
	          handleObj,
	          handlerQueue = [],
	          args = slice.call(arguments),
	          handlers = (data_priv.get(this, "events") || {})[event.type] || [],
	          special = jQuery.event.special[event.type] || {};
	      args[0] = event;
	      event.delegateTarget = this;
	      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
	        return;
	      }
	      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
	      i = 0;
	      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
	        event.currentTarget = matched.elem;
	        j = 0;
	        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
	          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
	            event.handleObj = handleObj;
	            event.data = handleObj.data;
	            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
	            if (ret !== undefined) {
	              if ((event.result = ret) === false) {
	                event.preventDefault();
	                event.stopPropagation();
	              }
	            }
	          }
	        }
	      }
	      if (special.postDispatch) {
	        special.postDispatch.call(this, event);
	      }
	      return event.result;
	    },
	    handlers: function(event, handlers) {
	      var i,
	          matches,
	          sel,
	          handleObj,
	          handlerQueue = [],
	          delegateCount = handlers.delegateCount,
	          cur = event.target;
	      if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
	        for (; cur !== this; cur = cur.parentNode || this) {
	          if (cur.disabled !== true || event.type !== "click") {
	            matches = [];
	            for (i = 0; i < delegateCount; i++) {
	              handleObj = handlers[i];
	              sel = handleObj.selector + " ";
	              if (matches[sel] === undefined) {
	                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
	              }
	              if (matches[sel]) {
	                matches.push(handleObj);
	              }
	            }
	            if (matches.length) {
	              handlerQueue.push({
	                elem: cur,
	                handlers: matches
	              });
	            }
	          }
	        }
	      }
	      if (delegateCount < handlers.length) {
	        handlerQueue.push({
	          elem: this,
	          handlers: handlers.slice(delegateCount)
	        });
	      }
	      return handlerQueue;
	    },
	    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	    fixHooks: {},
	    keyHooks: {
	      props: "char charCode key keyCode".split(" "),
	      filter: function(event, original) {
	        if (event.which == null) {
	          event.which = original.charCode != null ? original.charCode : original.keyCode;
	        }
	        return event;
	      }
	    },
	    mouseHooks: {
	      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
	      filter: function(event, original) {
	        var eventDoc,
	            doc,
	            body,
	            button = original.button;
	        if (event.pageX == null && original.clientX != null) {
	          eventDoc = event.target.ownerDocument || document;
	          doc = eventDoc.documentElement;
	          body = eventDoc.body;
	          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	        }
	        if (!event.which && button !== undefined) {
	          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
	        }
	        return event;
	      }
	    },
	    fix: function(event) {
	      if (event[jQuery.expando]) {
	        return event;
	      }
	      var i,
	          prop,
	          copy,
	          type = event.type,
	          originalEvent = event,
	          fixHook = this.fixHooks[type];
	      if (!fixHook) {
	        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
	      }
	      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
	      event = new jQuery.Event(originalEvent);
	      i = copy.length;
	      while (i--) {
	        prop = copy[i];
	        event[prop] = originalEvent[prop];
	      }
	      if (!event.target) {
	        event.target = document;
	      }
	      if (event.target.nodeType === 3) {
	        event.target = event.target.parentNode;
	      }
	      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
	    },
	    special: {
	      load: {noBubble: true},
	      focus: {
	        trigger: function() {
	          if (this !== safeActiveElement() && this.focus) {
	            this.focus();
	            return false;
	          }
	        },
	        delegateType: "focusin"
	      },
	      blur: {
	        trigger: function() {
	          if (this === safeActiveElement() && this.blur) {
	            this.blur();
	            return false;
	          }
	        },
	        delegateType: "focusout"
	      },
	      click: {
	        trigger: function() {
	          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
	            this.click();
	            return false;
	          }
	        },
	        _default: function(event) {
	          return jQuery.nodeName(event.target, "a");
	        }
	      },
	      beforeunload: {postDispatch: function(event) {
	          if (event.result !== undefined && event.originalEvent) {
	            event.originalEvent.returnValue = event.result;
	          }
	        }}
	    },
	    simulate: function(type, elem, event, bubble) {
	      var e = jQuery.extend(new jQuery.Event(), event, {
	        type: type,
	        isSimulated: true,
	        originalEvent: {}
	      });
	      if (bubble) {
	        jQuery.event.trigger(e, null, elem);
	      } else {
	        jQuery.event.dispatch.call(elem, e);
	      }
	      if (e.isDefaultPrevented()) {
	        event.preventDefault();
	      }
	    }
	  };
	  jQuery.removeEvent = function(elem, type, handle) {
	    if (elem.removeEventListener) {
	      elem.removeEventListener(type, handle, false);
	    }
	  };
	  jQuery.Event = function(src, props) {
	    if (!(this instanceof jQuery.Event)) {
	      return new jQuery.Event(src, props);
	    }
	    if (src && src.type) {
	      this.originalEvent = src;
	      this.type = src.type;
	      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
	    } else {
	      this.type = src;
	    }
	    if (props) {
	      jQuery.extend(this, props);
	    }
	    this.timeStamp = src && src.timeStamp || jQuery.now();
	    this[jQuery.expando] = true;
	  };
	  jQuery.Event.prototype = {
	    isDefaultPrevented: returnFalse,
	    isPropagationStopped: returnFalse,
	    isImmediatePropagationStopped: returnFalse,
	    preventDefault: function() {
	      var e = this.originalEvent;
	      this.isDefaultPrevented = returnTrue;
	      if (e && e.preventDefault) {
	        e.preventDefault();
	      }
	    },
	    stopPropagation: function() {
	      var e = this.originalEvent;
	      this.isPropagationStopped = returnTrue;
	      if (e && e.stopPropagation) {
	        e.stopPropagation();
	      }
	    },
	    stopImmediatePropagation: function() {
	      var e = this.originalEvent;
	      this.isImmediatePropagationStopped = returnTrue;
	      if (e && e.stopImmediatePropagation) {
	        e.stopImmediatePropagation();
	      }
	      this.stopPropagation();
	    }
	  };
	  jQuery.each({
	    mouseenter: "mouseover",
	    mouseleave: "mouseout",
	    pointerenter: "pointerover",
	    pointerleave: "pointerout"
	  }, function(orig, fix) {
	    jQuery.event.special[orig] = {
	      delegateType: fix,
	      bindType: fix,
	      handle: function(event) {
	        var ret,
	            target = this,
	            related = event.relatedTarget,
	            handleObj = event.handleObj;
	        if (!related || (related !== target && !jQuery.contains(target, related))) {
	          event.type = handleObj.origType;
	          ret = handleObj.handler.apply(this, arguments);
	          event.type = fix;
	        }
	        return ret;
	      }
	    };
	  });
	  if (!support.focusinBubbles) {
	    jQuery.each({
	      focus: "focusin",
	      blur: "focusout"
	    }, function(orig, fix) {
	      var handler = function(event) {
	        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
	      };
	      jQuery.event.special[fix] = {
	        setup: function() {
	          var doc = this.ownerDocument || this,
	              attaches = data_priv.access(doc, fix);
	          if (!attaches) {
	            doc.addEventListener(orig, handler, true);
	          }
	          data_priv.access(doc, fix, (attaches || 0) + 1);
	        },
	        teardown: function() {
	          var doc = this.ownerDocument || this,
	              attaches = data_priv.access(doc, fix) - 1;
	          if (!attaches) {
	            doc.removeEventListener(orig, handler, true);
	            data_priv.remove(doc, fix);
	          } else {
	            data_priv.access(doc, fix, attaches);
	          }
	        }
	      };
	    });
	  }
	  jQuery.fn.extend({
	    on: function(types, selector, data, fn, one) {
	      var origFn,
	          type;
	      if (typeof types === "object") {
	        if (typeof selector !== "string") {
	          data = data || selector;
	          selector = undefined;
	        }
	        for (type in types) {
	          this.on(type, selector, data, types[type], one);
	        }
	        return this;
	      }
	      if (data == null && fn == null) {
	        fn = selector;
	        data = selector = undefined;
	      } else if (fn == null) {
	        if (typeof selector === "string") {
	          fn = data;
	          data = undefined;
	        } else {
	          fn = data;
	          data = selector;
	          selector = undefined;
	        }
	      }
	      if (fn === false) {
	        fn = returnFalse;
	      } else if (!fn) {
	        return this;
	      }
	      if (one === 1) {
	        origFn = fn;
	        fn = function(event) {
	          jQuery().off(event);
	          return origFn.apply(this, arguments);
	        };
	        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
	      }
	      return this.each(function() {
	        jQuery.event.add(this, types, fn, data, selector);
	      });
	    },
	    one: function(types, selector, data, fn) {
	      return this.on(types, selector, data, fn, 1);
	    },
	    off: function(types, selector, fn) {
	      var handleObj,
	          type;
	      if (types && types.preventDefault && types.handleObj) {
	        handleObj = types.handleObj;
	        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
	        return this;
	      }
	      if (typeof types === "object") {
	        for (type in types) {
	          this.off(type, selector, types[type]);
	        }
	        return this;
	      }
	      if (selector === false || typeof selector === "function") {
	        fn = selector;
	        selector = undefined;
	      }
	      if (fn === false) {
	        fn = returnFalse;
	      }
	      return this.each(function() {
	        jQuery.event.remove(this, types, fn, selector);
	      });
	    },
	    trigger: function(type, data) {
	      return this.each(function() {
	        jQuery.event.trigger(type, data, this);
	      });
	    },
	    triggerHandler: function(type, data) {
	      var elem = this[0];
	      if (elem) {
	        return jQuery.event.trigger(type, data, elem, true);
	      }
	    }
	  });
	  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      rtagName = /<([\w:]+)/,
	      rhtml = /<|&#?\w+;/,
	      rnoInnerhtml = /<(?:script|style|link)/i,
	      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      rscriptType = /^$|\/(?:java|ecma)script/i,
	      rscriptTypeMasked = /^true\/(.*)/,
	      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	      wrapMap = {
	        option: [1, "<select multiple='multiple'>", "</select>"],
	        thead: [1, "<table>", "</table>"],
	        col: [2, "<table><colgroup>", "</colgroup></table>"],
	        tr: [2, "<table><tbody>", "</tbody></table>"],
	        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	        _default: [0, "", ""]
	      };
	  wrapMap.optgroup = wrapMap.option;
	  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	  wrapMap.th = wrapMap.td;
	  function manipulationTarget(elem, content) {
	    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	  }
	  function disableScript(elem) {
	    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	    return elem;
	  }
	  function restoreScript(elem) {
	    var match = rscriptTypeMasked.exec(elem.type);
	    if (match) {
	      elem.type = match[1];
	    } else {
	      elem.removeAttribute("type");
	    }
	    return elem;
	  }
	  function setGlobalEval(elems, refElements) {
	    var i = 0,
	        l = elems.length;
	    for (; i < l; i++) {
	      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
	    }
	  }
	  function cloneCopyEvent(src, dest) {
	    var i,
	        l,
	        type,
	        pdataOld,
	        pdataCur,
	        udataOld,
	        udataCur,
	        events;
	    if (dest.nodeType !== 1) {
	      return;
	    }
	    if (data_priv.hasData(src)) {
	      pdataOld = data_priv.access(src);
	      pdataCur = data_priv.set(dest, pdataOld);
	      events = pdataOld.events;
	      if (events) {
	        delete pdataCur.handle;
	        pdataCur.events = {};
	        for (type in events) {
	          for (i = 0, l = events[type].length; i < l; i++) {
	            jQuery.event.add(dest, type, events[type][i]);
	          }
	        }
	      }
	    }
	    if (data_user.hasData(src)) {
	      udataOld = data_user.access(src);
	      udataCur = jQuery.extend({}, udataOld);
	      data_user.set(dest, udataCur);
	    }
	  }
	  function getAll(context, tag) {
	    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
	    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	  }
	  function fixInput(src, dest) {
	    var nodeName = dest.nodeName.toLowerCase();
	    if (nodeName === "input" && rcheckableType.test(src.type)) {
	      dest.checked = src.checked;
	    } else if (nodeName === "input" || nodeName === "textarea") {
	      dest.defaultValue = src.defaultValue;
	    }
	  }
	  jQuery.extend({
	    clone: function(elem, dataAndEvents, deepDataAndEvents) {
	      var i,
	          l,
	          srcElements,
	          destElements,
	          clone = elem.cloneNode(true),
	          inPage = jQuery.contains(elem.ownerDocument, elem);
	      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
	        destElements = getAll(clone);
	        srcElements = getAll(elem);
	        for (i = 0, l = srcElements.length; i < l; i++) {
	          fixInput(srcElements[i], destElements[i]);
	        }
	      }
	      if (dataAndEvents) {
	        if (deepDataAndEvents) {
	          srcElements = srcElements || getAll(elem);
	          destElements = destElements || getAll(clone);
	          for (i = 0, l = srcElements.length; i < l; i++) {
	            cloneCopyEvent(srcElements[i], destElements[i]);
	          }
	        } else {
	          cloneCopyEvent(elem, clone);
	        }
	      }
	      destElements = getAll(clone, "script");
	      if (destElements.length > 0) {
	        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
	      }
	      return clone;
	    },
	    buildFragment: function(elems, context, scripts, selection) {
	      var elem,
	          tmp,
	          tag,
	          wrap,
	          contains,
	          j,
	          fragment = context.createDocumentFragment(),
	          nodes = [],
	          i = 0,
	          l = elems.length;
	      for (; i < l; i++) {
	        elem = elems[i];
	        if (elem || elem === 0) {
	          if (jQuery.type(elem) === "object") {
	            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
	          } else if (!rhtml.test(elem)) {
	            nodes.push(context.createTextNode(elem));
	          } else {
	            tmp = tmp || fragment.appendChild(context.createElement("div"));
	            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	            wrap = wrapMap[tag] || wrapMap._default;
	            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
	            j = wrap[0];
	            while (j--) {
	              tmp = tmp.lastChild;
	            }
	            jQuery.merge(nodes, tmp.childNodes);
	            tmp = fragment.firstChild;
	            tmp.textContent = "";
	          }
	        }
	      }
	      fragment.textContent = "";
	      i = 0;
	      while ((elem = nodes[i++])) {
	        if (selection && jQuery.inArray(elem, selection) !== -1) {
	          continue;
	        }
	        contains = jQuery.contains(elem.ownerDocument, elem);
	        tmp = getAll(fragment.appendChild(elem), "script");
	        if (contains) {
	          setGlobalEval(tmp);
	        }
	        if (scripts) {
	          j = 0;
	          while ((elem = tmp[j++])) {
	            if (rscriptType.test(elem.type || "")) {
	              scripts.push(elem);
	            }
	          }
	        }
	      }
	      return fragment;
	    },
	    cleanData: function(elems) {
	      var data,
	          elem,
	          type,
	          key,
	          special = jQuery.event.special,
	          i = 0;
	      for (; (elem = elems[i]) !== undefined; i++) {
	        if (jQuery.acceptData(elem)) {
	          key = elem[data_priv.expando];
	          if (key && (data = data_priv.cache[key])) {
	            if (data.events) {
	              for (type in data.events) {
	                if (special[type]) {
	                  jQuery.event.remove(elem, type);
	                } else {
	                  jQuery.removeEvent(elem, type, data.handle);
	                }
	              }
	            }
	            if (data_priv.cache[key]) {
	              delete data_priv.cache[key];
	            }
	          }
	        }
	        delete data_user.cache[elem[data_user.expando]];
	      }
	    }
	  });
	  jQuery.fn.extend({
	    text: function(value) {
	      return access(this, function(value) {
	        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
	          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	            this.textContent = value;
	          }
	        });
	      }, null, value, arguments.length);
	    },
	    append: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	          var target = manipulationTarget(this, elem);
	          target.appendChild(elem);
	        }
	      });
	    },
	    prepend: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
	          var target = manipulationTarget(this, elem);
	          target.insertBefore(elem, target.firstChild);
	        }
	      });
	    },
	    before: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.parentNode) {
	          this.parentNode.insertBefore(elem, this);
	        }
	      });
	    },
	    after: function() {
	      return this.domManip(arguments, function(elem) {
	        if (this.parentNode) {
	          this.parentNode.insertBefore(elem, this.nextSibling);
	        }
	      });
	    },
	    remove: function(selector, keepData) {
	      var elem,
	          elems = selector ? jQuery.filter(selector, this) : this,
	          i = 0;
	      for (; (elem = elems[i]) != null; i++) {
	        if (!keepData && elem.nodeType === 1) {
	          jQuery.cleanData(getAll(elem));
	        }
	        if (elem.parentNode) {
	          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
	            setGlobalEval(getAll(elem, "script"));
	          }
	          elem.parentNode.removeChild(elem);
	        }
	      }
	      return this;
	    },
	    empty: function() {
	      var elem,
	          i = 0;
	      for (; (elem = this[i]) != null; i++) {
	        if (elem.nodeType === 1) {
	          jQuery.cleanData(getAll(elem, false));
	          elem.textContent = "";
	        }
	      }
	      return this;
	    },
	    clone: function(dataAndEvents, deepDataAndEvents) {
	      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
	      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	      return this.map(function() {
	        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
	      });
	    },
	    html: function(value) {
	      return access(this, function(value) {
	        var elem = this[0] || {},
	            i = 0,
	            l = this.length;
	        if (value === undefined && elem.nodeType === 1) {
	          return elem.innerHTML;
	        }
	        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
	          value = value.replace(rxhtmlTag, "<$1></$2>");
	          try {
	            for (; i < l; i++) {
	              elem = this[i] || {};
	              if (elem.nodeType === 1) {
	                jQuery.cleanData(getAll(elem, false));
	                elem.innerHTML = value;
	              }
	            }
	            elem = 0;
	          } catch (e) {}
	        }
	        if (elem) {
	          this.empty().append(value);
	        }
	      }, null, value, arguments.length);
	    },
	    replaceWith: function() {
	      var arg = arguments[0];
	      this.domManip(arguments, function(elem) {
	        arg = this.parentNode;
	        jQuery.cleanData(getAll(this));
	        if (arg) {
	          arg.replaceChild(elem, this);
	        }
	      });
	      return arg && (arg.length || arg.nodeType) ? this : this.remove();
	    },
	    detach: function(selector) {
	      return this.remove(selector, true);
	    },
	    domManip: function(args, callback) {
	      args = concat.apply([], args);
	      var fragment,
	          first,
	          scripts,
	          hasScripts,
	          node,
	          doc,
	          i = 0,
	          l = this.length,
	          set = this,
	          iNoClone = l - 1,
	          value = args[0],
	          isFunction = jQuery.isFunction(value);
	      if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
	        return this.each(function(index) {
	          var self = set.eq(index);
	          if (isFunction) {
	            args[0] = value.call(this, index, self.html());
	          }
	          self.domManip(args, callback);
	        });
	      }
	      if (l) {
	        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
	        first = fragment.firstChild;
	        if (fragment.childNodes.length === 1) {
	          fragment = first;
	        }
	        if (first) {
	          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
	          hasScripts = scripts.length;
	          for (; i < l; i++) {
	            node = fragment;
	            if (i !== iNoClone) {
	              node = jQuery.clone(node, true, true);
	              if (hasScripts) {
	                jQuery.merge(scripts, getAll(node, "script"));
	              }
	            }
	            callback.call(this[i], node, i);
	          }
	          if (hasScripts) {
	            doc = scripts[scripts.length - 1].ownerDocument;
	            jQuery.map(scripts, restoreScript);
	            for (i = 0; i < hasScripts; i++) {
	              node = scripts[i];
	              if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
	                if (node.src) {
	                  if (jQuery._evalUrl) {
	                    jQuery._evalUrl(node.src);
	                  }
	                } else {
	                  jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
	                }
	              }
	            }
	          }
	        }
	      }
	      return this;
	    }
	  });
	  jQuery.each({
	    appendTo: "append",
	    prependTo: "prepend",
	    insertBefore: "before",
	    insertAfter: "after",
	    replaceAll: "replaceWith"
	  }, function(name, original) {
	    jQuery.fn[name] = function(selector) {
	      var elems,
	          ret = [],
	          insert = jQuery(selector),
	          last = insert.length - 1,
	          i = 0;
	      for (; i <= last; i++) {
	        elems = i === last ? this : this.clone(true);
	        jQuery(insert[i])[original](elems);
	        push.apply(ret, elems.get());
	      }
	      return this.pushStack(ret);
	    };
	  });
	  var iframe,
	      elemdisplay = {};
	  function actualDisplay(name, doc) {
	    var style,
	        elem = jQuery(doc.createElement(name)).appendTo(doc.body),
	        display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
	    elem.detach();
	    return display;
	  }
	  function defaultDisplay(nodeName) {
	    var doc = document,
	        display = elemdisplay[nodeName];
	    if (!display) {
	      display = actualDisplay(nodeName, doc);
	      if (display === "none" || !display) {
	        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
	        doc = iframe[0].contentDocument;
	        doc.write();
	        doc.close();
	        display = actualDisplay(nodeName, doc);
	        iframe.detach();
	      }
	      elemdisplay[nodeName] = display;
	    }
	    return display;
	  }
	  var rmargin = (/^margin/);
	  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	  var getStyles = function(elem) {
	    return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	  };
	  function curCSS(elem, name, computed) {
	    var width,
	        minWidth,
	        maxWidth,
	        ret,
	        style = elem.style;
	    computed = computed || getStyles(elem);
	    if (computed) {
	      ret = computed.getPropertyValue(name) || computed[name];
	    }
	    if (computed) {
	      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
	        ret = jQuery.style(elem, name);
	      }
	      if (rnumnonpx.test(ret) && rmargin.test(name)) {
	        width = style.width;
	        minWidth = style.minWidth;
	        maxWidth = style.maxWidth;
	        style.minWidth = style.maxWidth = style.width = ret;
	        ret = computed.width;
	        style.width = width;
	        style.minWidth = minWidth;
	        style.maxWidth = maxWidth;
	      }
	    }
	    return ret !== undefined ? ret + "" : ret;
	  }
	  function addGetHookIf(conditionFn, hookFn) {
	    return {get: function() {
	        if (conditionFn()) {
	          delete this.get;
	          return;
	        }
	        return (this.get = hookFn).apply(this, arguments);
	      }};
	  }
	  (function() {
	    var pixelPositionVal,
	        boxSizingReliableVal,
	        docElem = document.documentElement,
	        container = document.createElement("div"),
	        div = document.createElement("div");
	    if (!div.style) {
	      return;
	    }
	    div.style.backgroundClip = "content-box";
	    div.cloneNode(true).style.backgroundClip = "";
	    support.clearCloneStyle = div.style.backgroundClip === "content-box";
	    container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
	    container.appendChild(div);
	    function computePixelPositionAndBoxSizingReliable() {
	      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
	      div.innerHTML = "";
	      docElem.appendChild(container);
	      var divStyle = window.getComputedStyle(div, null);
	      pixelPositionVal = divStyle.top !== "1%";
	      boxSizingReliableVal = divStyle.width === "4px";
	      docElem.removeChild(container);
	    }
	    if (window.getComputedStyle) {
	      jQuery.extend(support, {
	        pixelPosition: function() {
	          computePixelPositionAndBoxSizingReliable();
	          return pixelPositionVal;
	        },
	        boxSizingReliable: function() {
	          if (boxSizingReliableVal == null) {
	            computePixelPositionAndBoxSizingReliable();
	          }
	          return boxSizingReliableVal;
	        },
	        reliableMarginRight: function() {
	          var ret,
	              marginDiv = div.appendChild(document.createElement("div"));
	          marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
	          marginDiv.style.marginRight = marginDiv.style.width = "0";
	          div.style.width = "1px";
	          docElem.appendChild(container);
	          ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
	          docElem.removeChild(container);
	          return ret;
	        }
	      });
	    }
	  })();
	  jQuery.swap = function(elem, options, callback, args) {
	    var ret,
	        name,
	        old = {};
	    for (name in options) {
	      old[name] = elem.style[name];
	      elem.style[name] = options[name];
	    }
	    ret = callback.apply(elem, args || []);
	    for (name in options) {
	      elem.style[name] = old[name];
	    }
	    return ret;
	  };
	  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	      rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
	      rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
	      cssShow = {
	        position: "absolute",
	        visibility: "hidden",
	        display: "block"
	      },
	      cssNormalTransform = {
	        letterSpacing: "0",
	        fontWeight: "400"
	      },
	      cssPrefixes = ["Webkit", "O", "Moz", "ms"];
	  function vendorPropName(style, name) {
	    if (name in style) {
	      return name;
	    }
	    var capName = name[0].toUpperCase() + name.slice(1),
	        origName = name,
	        i = cssPrefixes.length;
	    while (i--) {
	      name = cssPrefixes[i] + capName;
	      if (name in style) {
	        return name;
	      }
	    }
	    return origName;
	  }
	  function setPositiveNumber(elem, value, subtract) {
	    var matches = rnumsplit.exec(value);
	    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
	  }
	  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
	        val = 0;
	    for (; i < 4; i += 2) {
	      if (extra === "margin") {
	        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
	      }
	      if (isBorderBox) {
	        if (extra === "content") {
	          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	        }
	        if (extra !== "margin") {
	          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	        }
	      } else {
	        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
	        if (extra !== "padding") {
	          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
	        }
	      }
	    }
	    return val;
	  }
	  function getWidthOrHeight(elem, name, extra) {
	    var valueIsBorderBox = true,
	        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
	        styles = getStyles(elem),
	        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
	    if (val <= 0 || val == null) {
	      val = curCSS(elem, name, styles);
	      if (val < 0 || val == null) {
	        val = elem.style[name];
	      }
	      if (rnumnonpx.test(val)) {
	        return val;
	      }
	      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
	      val = parseFloat(val) || 0;
	    }
	    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
	  }
	  function showHide(elements, show) {
	    var display,
	        elem,
	        hidden,
	        values = [],
	        index = 0,
	        length = elements.length;
	    for (; index < length; index++) {
	      elem = elements[index];
	      if (!elem.style) {
	        continue;
	      }
	      values[index] = data_priv.get(elem, "olddisplay");
	      display = elem.style.display;
	      if (show) {
	        if (!values[index] && display === "none") {
	          elem.style.display = "";
	        }
	        if (elem.style.display === "" && isHidden(elem)) {
	          values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
	        }
	      } else {
	        hidden = isHidden(elem);
	        if (display !== "none" || !hidden) {
	          data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
	        }
	      }
	    }
	    for (index = 0; index < length; index++) {
	      elem = elements[index];
	      if (!elem.style) {
	        continue;
	      }
	      if (!show || elem.style.display === "none" || elem.style.display === "") {
	        elem.style.display = show ? values[index] || "" : "none";
	      }
	    }
	    return elements;
	  }
	  jQuery.extend({
	    cssHooks: {opacity: {get: function(elem, computed) {
	          if (computed) {
	            var ret = curCSS(elem, "opacity");
	            return ret === "" ? "1" : ret;
	          }
	        }}},
	    cssNumber: {
	      "columnCount": true,
	      "fillOpacity": true,
	      "flexGrow": true,
	      "flexShrink": true,
	      "fontWeight": true,
	      "lineHeight": true,
	      "opacity": true,
	      "order": true,
	      "orphans": true,
	      "widows": true,
	      "zIndex": true,
	      "zoom": true
	    },
	    cssProps: {"float": "cssFloat"},
	    style: function(elem, name, value, extra) {
	      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
	        return;
	      }
	      var ret,
	          type,
	          hooks,
	          origName = jQuery.camelCase(name),
	          style = elem.style;
	      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
	      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	      if (value !== undefined) {
	        type = typeof value;
	        if (type === "string" && (ret = rrelNum.exec(value))) {
	          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
	          type = "number";
	        }
	        if (value == null || value !== value) {
	          return;
	        }
	        if (type === "number" && !jQuery.cssNumber[origName]) {
	          value += "px";
	        }
	        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
	          style[name] = "inherit";
	        }
	        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
	          style[name] = value;
	        }
	      } else {
	        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
	          return ret;
	        }
	        return style[name];
	      }
	    },
	    css: function(elem, name, extra, styles) {
	      var val,
	          num,
	          hooks,
	          origName = jQuery.camelCase(name);
	      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
	      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
	      if (hooks && "get" in hooks) {
	        val = hooks.get(elem, true, extra);
	      }
	      if (val === undefined) {
	        val = curCSS(elem, name, styles);
	      }
	      if (val === "normal" && name in cssNormalTransform) {
	        val = cssNormalTransform[name];
	      }
	      if (extra === "" || extra) {
	        num = parseFloat(val);
	        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
	      }
	      return val;
	    }
	  });
	  jQuery.each(["height", "width"], function(i, name) {
	    jQuery.cssHooks[name] = {
	      get: function(elem, computed, extra) {
	        if (computed) {
	          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
	            return getWidthOrHeight(elem, name, extra);
	          }) : getWidthOrHeight(elem, name, extra);
	        }
	      },
	      set: function(elem, value, extra) {
	        var styles = extra && getStyles(elem);
	        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
	      }
	    };
	  });
	  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
	    if (computed) {
	      return jQuery.swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
	    }
	  });
	  jQuery.each({
	    margin: "",
	    padding: "",
	    border: "Width"
	  }, function(prefix, suffix) {
	    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
	        var i = 0,
	            expanded = {},
	            parts = typeof value === "string" ? value.split(" ") : [value];
	        for (; i < 4; i++) {
	          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
	        }
	        return expanded;
	      }};
	    if (!rmargin.test(prefix)) {
	      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	    }
	  });
	  jQuery.fn.extend({
	    css: function(name, value) {
	      return access(this, function(elem, name, value) {
	        var styles,
	            len,
	            map = {},
	            i = 0;
	        if (jQuery.isArray(name)) {
	          styles = getStyles(elem);
	          len = name.length;
	          for (; i < len; i++) {
	            map[name[i]] = jQuery.css(elem, name[i], false, styles);
	          }
	          return map;
	        }
	        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
	      }, name, value, arguments.length > 1);
	    },
	    show: function() {
	      return showHide(this, true);
	    },
	    hide: function() {
	      return showHide(this);
	    },
	    toggle: function(state) {
	      if (typeof state === "boolean") {
	        return state ? this.show() : this.hide();
	      }
	      return this.each(function() {
	        if (isHidden(this)) {
	          jQuery(this).show();
	        } else {
	          jQuery(this).hide();
	        }
	      });
	    }
	  });
	  function Tween(elem, options, prop, end, easing) {
	    return new Tween.prototype.init(elem, options, prop, end, easing);
	  }
	  jQuery.Tween = Tween;
	  Tween.prototype = {
	    constructor: Tween,
	    init: function(elem, options, prop, end, easing, unit) {
	      this.elem = elem;
	      this.prop = prop;
	      this.easing = easing || "swing";
	      this.options = options;
	      this.start = this.now = this.cur();
	      this.end = end;
	      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	    },
	    cur: function() {
	      var hooks = Tween.propHooks[this.prop];
	      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
	    },
	    run: function(percent) {
	      var eased,
	          hooks = Tween.propHooks[this.prop];
	      if (this.options.duration) {
	        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
	      } else {
	        this.pos = eased = percent;
	      }
	      this.now = (this.end - this.start) * eased + this.start;
	      if (this.options.step) {
	        this.options.step.call(this.elem, this.now, this);
	      }
	      if (hooks && hooks.set) {
	        hooks.set(this);
	      } else {
	        Tween.propHooks._default.set(this);
	      }
	      return this;
	    }
	  };
	  Tween.prototype.init.prototype = Tween.prototype;
	  Tween.propHooks = {_default: {
	      get: function(tween) {
	        var result;
	        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
	          return tween.elem[tween.prop];
	        }
	        result = jQuery.css(tween.elem, tween.prop, "");
	        return !result || result === "auto" ? 0 : result;
	      },
	      set: function(tween) {
	        if (jQuery.fx.step[tween.prop]) {
	          jQuery.fx.step[tween.prop](tween);
	        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
	          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
	        } else {
	          tween.elem[tween.prop] = tween.now;
	        }
	      }
	    }};
	  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
	      if (tween.elem.nodeType && tween.elem.parentNode) {
	        tween.elem[tween.prop] = tween.now;
	      }
	    }};
	  jQuery.easing = {
	    linear: function(p) {
	      return p;
	    },
	    swing: function(p) {
	      return 0.5 - Math.cos(p * Math.PI) / 2;
	    }
	  };
	  jQuery.fx = Tween.prototype.init;
	  jQuery.fx.step = {};
	  var fxNow,
	      timerId,
	      rfxtypes = /^(?:toggle|show|hide)$/,
	      rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
	      rrun = /queueHooks$/,
	      animationPrefilters = [defaultPrefilter],
	      tweeners = {"*": [function(prop, value) {
	          var tween = this.createTween(prop, value),
	              target = tween.cur(),
	              parts = rfxnum.exec(value),
	              unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
	              start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
	              scale = 1,
	              maxIterations = 20;
	          if (start && start[3] !== unit) {
	            unit = unit || start[3];
	            parts = parts || [];
	            start = +target || 1;
	            do {
	              scale = scale || ".5";
	              start = start / scale;
	              jQuery.style(tween.elem, prop, start + unit);
	            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
	          }
	          if (parts) {
	            start = tween.start = +start || +target || 0;
	            tween.unit = unit;
	            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
	          }
	          return tween;
	        }]};
	  function createFxNow() {
	    setTimeout(function() {
	      fxNow = undefined;
	    });
	    return (fxNow = jQuery.now());
	  }
	  function genFx(type, includeWidth) {
	    var which,
	        i = 0,
	        attrs = {height: type};
	    includeWidth = includeWidth ? 1 : 0;
	    for (; i < 4; i += 2 - includeWidth) {
	      which = cssExpand[i];
	      attrs["margin" + which] = attrs["padding" + which] = type;
	    }
	    if (includeWidth) {
	      attrs.opacity = attrs.width = type;
	    }
	    return attrs;
	  }
	  function createTween(value, prop, animation) {
	    var tween,
	        collection = (tweeners[prop] || []).concat(tweeners["*"]),
	        index = 0,
	        length = collection.length;
	    for (; index < length; index++) {
	      if ((tween = collection[index].call(animation, prop, value))) {
	        return tween;
	      }
	    }
	  }
	  function defaultPrefilter(elem, props, opts) {
	    var prop,
	        value,
	        toggle,
	        tween,
	        hooks,
	        oldfire,
	        display,
	        checkDisplay,
	        anim = this,
	        orig = {},
	        style = elem.style,
	        hidden = elem.nodeType && isHidden(elem),
	        dataShow = data_priv.get(elem, "fxshow");
	    if (!opts.queue) {
	      hooks = jQuery._queueHooks(elem, "fx");
	      if (hooks.unqueued == null) {
	        hooks.unqueued = 0;
	        oldfire = hooks.empty.fire;
	        hooks.empty.fire = function() {
	          if (!hooks.unqueued) {
	            oldfire();
	          }
	        };
	      }
	      hooks.unqueued++;
	      anim.always(function() {
	        anim.always(function() {
	          hooks.unqueued--;
	          if (!jQuery.queue(elem, "fx").length) {
	            hooks.empty.fire();
	          }
	        });
	      });
	    }
	    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
	      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
	      display = jQuery.css(elem, "display");
	      checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
	      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
	        style.display = "inline-block";
	      }
	    }
	    if (opts.overflow) {
	      style.overflow = "hidden";
	      anim.always(function() {
	        style.overflow = opts.overflow[0];
	        style.overflowX = opts.overflow[1];
	        style.overflowY = opts.overflow[2];
	      });
	    }
	    for (prop in props) {
	      value = props[prop];
	      if (rfxtypes.exec(value)) {
	        delete props[prop];
	        toggle = toggle || value === "toggle";
	        if (value === (hidden ? "hide" : "show")) {
	          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
	            hidden = true;
	          } else {
	            continue;
	          }
	        }
	        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
	      } else {
	        display = undefined;
	      }
	    }
	    if (!jQuery.isEmptyObject(orig)) {
	      if (dataShow) {
	        if ("hidden" in dataShow) {
	          hidden = dataShow.hidden;
	        }
	      } else {
	        dataShow = data_priv.access(elem, "fxshow", {});
	      }
	      if (toggle) {
	        dataShow.hidden = !hidden;
	      }
	      if (hidden) {
	        jQuery(elem).show();
	      } else {
	        anim.done(function() {
	          jQuery(elem).hide();
	        });
	      }
	      anim.done(function() {
	        var prop;
	        data_priv.remove(elem, "fxshow");
	        for (prop in orig) {
	          jQuery.style(elem, prop, orig[prop]);
	        }
	      });
	      for (prop in orig) {
	        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
	        if (!(prop in dataShow)) {
	          dataShow[prop] = tween.start;
	          if (hidden) {
	            tween.end = tween.start;
	            tween.start = prop === "width" || prop === "height" ? 1 : 0;
	          }
	        }
	      }
	    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
	      style.display = display;
	    }
	  }
	  function propFilter(props, specialEasing) {
	    var index,
	        name,
	        easing,
	        value,
	        hooks;
	    for (index in props) {
	      name = jQuery.camelCase(index);
	      easing = specialEasing[name];
	      value = props[index];
	      if (jQuery.isArray(value)) {
	        easing = value[1];
	        value = props[index] = value[0];
	      }
	      if (index !== name) {
	        props[name] = value;
	        delete props[index];
	      }
	      hooks = jQuery.cssHooks[name];
	      if (hooks && "expand" in hooks) {
	        value = hooks.expand(value);
	        delete props[name];
	        for (index in value) {
	          if (!(index in props)) {
	            props[index] = value[index];
	            specialEasing[index] = easing;
	          }
	        }
	      } else {
	        specialEasing[name] = easing;
	      }
	    }
	  }
	  function Animation(elem, properties, options) {
	    var result,
	        stopped,
	        index = 0,
	        length = animationPrefilters.length,
	        deferred = jQuery.Deferred().always(function() {
	          delete tick.elem;
	        }),
	        tick = function() {
	          if (stopped) {
	            return false;
	          }
	          var currentTime = fxNow || createFxNow(),
	              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
	              temp = remaining / animation.duration || 0,
	              percent = 1 - temp,
	              index = 0,
	              length = animation.tweens.length;
	          for (; index < length; index++) {
	            animation.tweens[index].run(percent);
	          }
	          deferred.notifyWith(elem, [animation, percent, remaining]);
	          if (percent < 1 && length) {
	            return remaining;
	          } else {
	            deferred.resolveWith(elem, [animation]);
	            return false;
	          }
	        },
	        animation = deferred.promise({
	          elem: elem,
	          props: jQuery.extend({}, properties),
	          opts: jQuery.extend(true, {specialEasing: {}}, options),
	          originalProperties: properties,
	          originalOptions: options,
	          startTime: fxNow || createFxNow(),
	          duration: options.duration,
	          tweens: [],
	          createTween: function(prop, end) {
	            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
	            animation.tweens.push(tween);
	            return tween;
	          },
	          stop: function(gotoEnd) {
	            var index = 0,
	                length = gotoEnd ? animation.tweens.length : 0;
	            if (stopped) {
	              return this;
	            }
	            stopped = true;
	            for (; index < length; index++) {
	              animation.tweens[index].run(1);
	            }
	            if (gotoEnd) {
	              deferred.resolveWith(elem, [animation, gotoEnd]);
	            } else {
	              deferred.rejectWith(elem, [animation, gotoEnd]);
	            }
	            return this;
	          }
	        }),
	        props = animation.props;
	    propFilter(props, animation.opts.specialEasing);
	    for (; index < length; index++) {
	      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
	      if (result) {
	        return result;
	      }
	    }
	    jQuery.map(props, createTween, animation);
	    if (jQuery.isFunction(animation.opts.start)) {
	      animation.opts.start.call(elem, animation);
	    }
	    jQuery.fx.timer(jQuery.extend(tick, {
	      elem: elem,
	      anim: animation,
	      queue: animation.opts.queue
	    }));
	    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	  }
	  jQuery.Animation = jQuery.extend(Animation, {
	    tweener: function(props, callback) {
	      if (jQuery.isFunction(props)) {
	        callback = props;
	        props = ["*"];
	      } else {
	        props = props.split(" ");
	      }
	      var prop,
	          index = 0,
	          length = props.length;
	      for (; index < length; index++) {
	        prop = props[index];
	        tweeners[prop] = tweeners[prop] || [];
	        tweeners[prop].unshift(callback);
	      }
	    },
	    prefilter: function(callback, prepend) {
	      if (prepend) {
	        animationPrefilters.unshift(callback);
	      } else {
	        animationPrefilters.push(callback);
	      }
	    }
	  });
	  jQuery.speed = function(speed, easing, fn) {
	    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
	      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
	      duration: speed,
	      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
	    };
	    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
	    if (opt.queue == null || opt.queue === true) {
	      opt.queue = "fx";
	    }
	    opt.old = opt.complete;
	    opt.complete = function() {
	      if (jQuery.isFunction(opt.old)) {
	        opt.old.call(this);
	      }
	      if (opt.queue) {
	        jQuery.dequeue(this, opt.queue);
	      }
	    };
	    return opt;
	  };
	  jQuery.fn.extend({
	    fadeTo: function(speed, to, easing, callback) {
	      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
	    },
	    animate: function(prop, speed, easing, callback) {
	      var empty = jQuery.isEmptyObject(prop),
	          optall = jQuery.speed(speed, easing, callback),
	          doAnimation = function() {
	            var anim = Animation(this, jQuery.extend({}, prop), optall);
	            if (empty || data_priv.get(this, "finish")) {
	              anim.stop(true);
	            }
	          };
	      doAnimation.finish = doAnimation;
	      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
	    },
	    stop: function(type, clearQueue, gotoEnd) {
	      var stopQueue = function(hooks) {
	        var stop = hooks.stop;
	        delete hooks.stop;
	        stop(gotoEnd);
	      };
	      if (typeof type !== "string") {
	        gotoEnd = clearQueue;
	        clearQueue = type;
	        type = undefined;
	      }
	      if (clearQueue && type !== false) {
	        this.queue(type || "fx", []);
	      }
	      return this.each(function() {
	        var dequeue = true,
	            index = type != null && type + "queueHooks",
	            timers = jQuery.timers,
	            data = data_priv.get(this);
	        if (index) {
	          if (data[index] && data[index].stop) {
	            stopQueue(data[index]);
	          }
	        } else {
	          for (index in data) {
	            if (data[index] && data[index].stop && rrun.test(index)) {
	              stopQueue(data[index]);
	            }
	          }
	        }
	        for (index = timers.length; index--; ) {
	          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
	            timers[index].anim.stop(gotoEnd);
	            dequeue = false;
	            timers.splice(index, 1);
	          }
	        }
	        if (dequeue || !gotoEnd) {
	          jQuery.dequeue(this, type);
	        }
	      });
	    },
	    finish: function(type) {
	      if (type !== false) {
	        type = type || "fx";
	      }
	      return this.each(function() {
	        var index,
	            data = data_priv.get(this),
	            queue = data[type + "queue"],
	            hooks = data[type + "queueHooks"],
	            timers = jQuery.timers,
	            length = queue ? queue.length : 0;
	        data.finish = true;
	        jQuery.queue(this, type, []);
	        if (hooks && hooks.stop) {
	          hooks.stop.call(this, true);
	        }
	        for (index = timers.length; index--; ) {
	          if (timers[index].elem === this && timers[index].queue === type) {
	            timers[index].anim.stop(true);
	            timers.splice(index, 1);
	          }
	        }
	        for (index = 0; index < length; index++) {
	          if (queue[index] && queue[index].finish) {
	            queue[index].finish.call(this);
	          }
	        }
	        delete data.finish;
	      });
	    }
	  });
	  jQuery.each(["toggle", "show", "hide"], function(i, name) {
	    var cssFn = jQuery.fn[name];
	    jQuery.fn[name] = function(speed, easing, callback) {
	      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
	    };
	  });
	  jQuery.each({
	    slideDown: genFx("show"),
	    slideUp: genFx("hide"),
	    slideToggle: genFx("toggle"),
	    fadeIn: {opacity: "show"},
	    fadeOut: {opacity: "hide"},
	    fadeToggle: {opacity: "toggle"}
	  }, function(name, props) {
	    jQuery.fn[name] = function(speed, easing, callback) {
	      return this.animate(props, speed, easing, callback);
	    };
	  });
	  jQuery.timers = [];
	  jQuery.fx.tick = function() {
	    var timer,
	        i = 0,
	        timers = jQuery.timers;
	    fxNow = jQuery.now();
	    for (; i < timers.length; i++) {
	      timer = timers[i];
	      if (!timer() && timers[i] === timer) {
	        timers.splice(i--, 1);
	      }
	    }
	    if (!timers.length) {
	      jQuery.fx.stop();
	    }
	    fxNow = undefined;
	  };
	  jQuery.fx.timer = function(timer) {
	    jQuery.timers.push(timer);
	    if (timer()) {
	      jQuery.fx.start();
	    } else {
	      jQuery.timers.pop();
	    }
	  };
	  jQuery.fx.interval = 13;
	  jQuery.fx.start = function() {
	    if (!timerId) {
	      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
	    }
	  };
	  jQuery.fx.stop = function() {
	    clearInterval(timerId);
	    timerId = null;
	  };
	  jQuery.fx.speeds = {
	    slow: 600,
	    fast: 200,
	    _default: 400
	  };
	  jQuery.fn.delay = function(time, type) {
	    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	    type = type || "fx";
	    return this.queue(type, function(next, hooks) {
	      var timeout = setTimeout(next, time);
	      hooks.stop = function() {
	        clearTimeout(timeout);
	      };
	    });
	  };
	  (function() {
	    var input = document.createElement("input"),
	        select = document.createElement("select"),
	        opt = select.appendChild(document.createElement("option"));
	    input.type = "checkbox";
	    support.checkOn = input.value !== "";
	    support.optSelected = opt.selected;
	    select.disabled = true;
	    support.optDisabled = !opt.disabled;
	    input = document.createElement("input");
	    input.value = "t";
	    input.type = "radio";
	    support.radioValue = input.value === "t";
	  })();
	  var nodeHook,
	      boolHook,
	      attrHandle = jQuery.expr.attrHandle;
	  jQuery.fn.extend({
	    attr: function(name, value) {
	      return access(this, jQuery.attr, name, value, arguments.length > 1);
	    },
	    removeAttr: function(name) {
	      return this.each(function() {
	        jQuery.removeAttr(this, name);
	      });
	    }
	  });
	  jQuery.extend({
	    attr: function(elem, name, value) {
	      var hooks,
	          ret,
	          nType = elem.nodeType;
	      if (!elem || nType === 3 || nType === 8 || nType === 2) {
	        return;
	      }
	      if (typeof elem.getAttribute === strundefined) {
	        return jQuery.prop(elem, name, value);
	      }
	      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
	        name = name.toLowerCase();
	        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
	      }
	      if (value !== undefined) {
	        if (value === null) {
	          jQuery.removeAttr(elem, name);
	        } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
	          return ret;
	        } else {
	          elem.setAttribute(name, value + "");
	          return value;
	        }
	      } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
	        return ret;
	      } else {
	        ret = jQuery.find.attr(elem, name);
	        return ret == null ? undefined : ret;
	      }
	    },
	    removeAttr: function(elem, value) {
	      var name,
	          propName,
	          i = 0,
	          attrNames = value && value.match(rnotwhite);
	      if (attrNames && elem.nodeType === 1) {
	        while ((name = attrNames[i++])) {
	          propName = jQuery.propFix[name] || name;
	          if (jQuery.expr.match.bool.test(name)) {
	            elem[propName] = false;
	          }
	          elem.removeAttribute(name);
	        }
	      }
	    },
	    attrHooks: {type: {set: function(elem, value) {
	          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
	            var val = elem.value;
	            elem.setAttribute("type", value);
	            if (val) {
	              elem.value = val;
	            }
	            return value;
	          }
	        }}}
	  });
	  boolHook = {set: function(elem, value, name) {
	      if (value === false) {
	        jQuery.removeAttr(elem, name);
	      } else {
	        elem.setAttribute(name, name);
	      }
	      return name;
	    }};
	  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
	    var getter = attrHandle[name] || jQuery.find.attr;
	    attrHandle[name] = function(elem, name, isXML) {
	      var ret,
	          handle;
	      if (!isXML) {
	        handle = attrHandle[name];
	        attrHandle[name] = ret;
	        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
	        attrHandle[name] = handle;
	      }
	      return ret;
	    };
	  });
	  var rfocusable = /^(?:input|select|textarea|button)$/i;
	  jQuery.fn.extend({
	    prop: function(name, value) {
	      return access(this, jQuery.prop, name, value, arguments.length > 1);
	    },
	    removeProp: function(name) {
	      return this.each(function() {
	        delete this[jQuery.propFix[name] || name];
	      });
	    }
	  });
	  jQuery.extend({
	    propFix: {
	      "for": "htmlFor",
	      "class": "className"
	    },
	    prop: function(elem, name, value) {
	      var ret,
	          hooks,
	          notxml,
	          nType = elem.nodeType;
	      if (!elem || nType === 3 || nType === 8 || nType === 2) {
	        return;
	      }
	      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
	      if (notxml) {
	        name = jQuery.propFix[name] || name;
	        hooks = jQuery.propHooks[name];
	      }
	      if (value !== undefined) {
	        return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
	      } else {
	        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
	      }
	    },
	    propHooks: {tabIndex: {get: function(elem) {
	          return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
	        }}}
	  });
	  if (!support.optSelected) {
	    jQuery.propHooks.selected = {get: function(elem) {
	        var parent = elem.parentNode;
	        if (parent && parent.parentNode) {
	          parent.parentNode.selectedIndex;
	        }
	        return null;
	      }};
	  }
	  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
	    jQuery.propFix[this.toLowerCase()] = this;
	  });
	  var rclass = /[\t\r\n\f]/g;
	  jQuery.fn.extend({
	    addClass: function(value) {
	      var classes,
	          elem,
	          cur,
	          clazz,
	          j,
	          finalValue,
	          proceed = typeof value === "string" && value,
	          i = 0,
	          len = this.length;
	      if (jQuery.isFunction(value)) {
	        return this.each(function(j) {
	          jQuery(this).addClass(value.call(this, j, this.className));
	        });
	      }
	      if (proceed) {
	        classes = (value || "").match(rnotwhite) || [];
	        for (; i < len; i++) {
	          elem = this[i];
	          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
	          if (cur) {
	            j = 0;
	            while ((clazz = classes[j++])) {
	              if (cur.indexOf(" " + clazz + " ") < 0) {
	                cur += clazz + " ";
	              }
	            }
	            finalValue = jQuery.trim(cur);
	            if (elem.className !== finalValue) {
	              elem.className = finalValue;
	            }
	          }
	        }
	      }
	      return this;
	    },
	    removeClass: function(value) {
	      var classes,
	          elem,
	          cur,
	          clazz,
	          j,
	          finalValue,
	          proceed = arguments.length === 0 || typeof value === "string" && value,
	          i = 0,
	          len = this.length;
	      if (jQuery.isFunction(value)) {
	        return this.each(function(j) {
	          jQuery(this).removeClass(value.call(this, j, this.className));
	        });
	      }
	      if (proceed) {
	        classes = (value || "").match(rnotwhite) || [];
	        for (; i < len; i++) {
	          elem = this[i];
	          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
	          if (cur) {
	            j = 0;
	            while ((clazz = classes[j++])) {
	              while (cur.indexOf(" " + clazz + " ") >= 0) {
	                cur = cur.replace(" " + clazz + " ", " ");
	              }
	            }
	            finalValue = value ? jQuery.trim(cur) : "";
	            if (elem.className !== finalValue) {
	              elem.className = finalValue;
	            }
	          }
	        }
	      }
	      return this;
	    },
	    toggleClass: function(value, stateVal) {
	      var type = typeof value;
	      if (typeof stateVal === "boolean" && type === "string") {
	        return stateVal ? this.addClass(value) : this.removeClass(value);
	      }
	      if (jQuery.isFunction(value)) {
	        return this.each(function(i) {
	          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
	        });
	      }
	      return this.each(function() {
	        if (type === "string") {
	          var className,
	              i = 0,
	              self = jQuery(this),
	              classNames = value.match(rnotwhite) || [];
	          while ((className = classNames[i++])) {
	            if (self.hasClass(className)) {
	              self.removeClass(className);
	            } else {
	              self.addClass(className);
	            }
	          }
	        } else if (type === strundefined || type === "boolean") {
	          if (this.className) {
	            data_priv.set(this, "__className__", this.className);
	          }
	          this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
	        }
	      });
	    },
	    hasClass: function(selector) {
	      var className = " " + selector + " ",
	          i = 0,
	          l = this.length;
	      for (; i < l; i++) {
	        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
	          return true;
	        }
	      }
	      return false;
	    }
	  });
	  var rreturn = /\r/g;
	  jQuery.fn.extend({val: function(value) {
	      var hooks,
	          ret,
	          isFunction,
	          elem = this[0];
	      if (!arguments.length) {
	        if (elem) {
	          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
	          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
	            return ret;
	          }
	          ret = elem.value;
	          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
	        }
	        return;
	      }
	      isFunction = jQuery.isFunction(value);
	      return this.each(function(i) {
	        var val;
	        if (this.nodeType !== 1) {
	          return;
	        }
	        if (isFunction) {
	          val = value.call(this, i, jQuery(this).val());
	        } else {
	          val = value;
	        }
	        if (val == null) {
	          val = "";
	        } else if (typeof val === "number") {
	          val += "";
	        } else if (jQuery.isArray(val)) {
	          val = jQuery.map(val, function(value) {
	            return value == null ? "" : value + "";
	          });
	        }
	        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
	        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
	          this.value = val;
	        }
	      });
	    }});
	  jQuery.extend({valHooks: {
	      option: {get: function(elem) {
	          var val = jQuery.find.attr(elem, "value");
	          return val != null ? val : jQuery.trim(jQuery.text(elem));
	        }},
	      select: {
	        get: function(elem) {
	          var value,
	              option,
	              options = elem.options,
	              index = elem.selectedIndex,
	              one = elem.type === "select-one" || index < 0,
	              values = one ? null : [],
	              max = one ? index + 1 : options.length,
	              i = index < 0 ? max : one ? index : 0;
	          for (; i < max; i++) {
	            option = options[i];
	            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
	              value = jQuery(option).val();
	              if (one) {
	                return value;
	              }
	              values.push(value);
	            }
	          }
	          return values;
	        },
	        set: function(elem, value) {
	          var optionSet,
	              option,
	              options = elem.options,
	              values = jQuery.makeArray(value),
	              i = options.length;
	          while (i--) {
	            option = options[i];
	            if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
	              optionSet = true;
	            }
	          }
	          if (!optionSet) {
	            elem.selectedIndex = -1;
	          }
	          return values;
	        }
	      }
	    }});
	  jQuery.each(["radio", "checkbox"], function() {
	    jQuery.valHooks[this] = {set: function(elem, value) {
	        if (jQuery.isArray(value)) {
	          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
	        }
	      }};
	    if (!support.checkOn) {
	      jQuery.valHooks[this].get = function(elem) {
	        return elem.getAttribute("value") === null ? "on" : elem.value;
	      };
	    }
	  });
	  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
	    jQuery.fn[name] = function(data, fn) {
	      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
	    };
	  });
	  jQuery.fn.extend({
	    hover: function(fnOver, fnOut) {
	      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	    },
	    bind: function(types, data, fn) {
	      return this.on(types, null, data, fn);
	    },
	    unbind: function(types, fn) {
	      return this.off(types, null, fn);
	    },
	    delegate: function(selector, types, data, fn) {
	      return this.on(types, selector, data, fn);
	    },
	    undelegate: function(selector, types, fn) {
	      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	    }
	  });
	  var nonce = jQuery.now();
	  var rquery = (/\?/);
	  jQuery.parseJSON = function(data) {
	    return JSON.parse(data + "");
	  };
	  jQuery.parseXML = function(data) {
	    var xml,
	        tmp;
	    if (!data || typeof data !== "string") {
	      return null;
	    }
	    try {
	      tmp = new DOMParser();
	      xml = tmp.parseFromString(data, "text/xml");
	    } catch (e) {
	      xml = undefined;
	    }
	    if (!xml || xml.getElementsByTagName("parsererror").length) {
	      jQuery.error("Invalid XML: " + data);
	    }
	    return xml;
	  };
	  var ajaxLocParts,
	      ajaxLocation,
	      rhash = /#.*$/,
	      rts = /([?&])_=[^&]*/,
	      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	      rnoContent = /^(?:GET|HEAD)$/,
	      rprotocol = /^\/\//,
	      rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	      prefilters = {},
	      transports = {},
	      allTypes = "*/".concat("*");
	  try {
	    ajaxLocation = location.href;
	  } catch (e) {
	    ajaxLocation = document.createElement("a");
	    ajaxLocation.href = "";
	    ajaxLocation = ajaxLocation.href;
	  }
	  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	  function addToPrefiltersOrTransports(structure) {
	    return function(dataTypeExpression, func) {
	      if (typeof dataTypeExpression !== "string") {
	        func = dataTypeExpression;
	        dataTypeExpression = "*";
	      }
	      var dataType,
	          i = 0,
	          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
	      if (jQuery.isFunction(func)) {
	        while ((dataType = dataTypes[i++])) {
	          if (dataType[0] === "+") {
	            dataType = dataType.slice(1) || "*";
	            (structure[dataType] = structure[dataType] || []).unshift(func);
	          } else {
	            (structure[dataType] = structure[dataType] || []).push(func);
	          }
	        }
	      }
	    };
	  }
	  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
	    var inspected = {},
	        seekingTransport = (structure === transports);
	    function inspect(dataType) {
	      var selected;
	      inspected[dataType] = true;
	      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
	        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
	        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
	          options.dataTypes.unshift(dataTypeOrTransport);
	          inspect(dataTypeOrTransport);
	          return false;
	        } else if (seekingTransport) {
	          return !(selected = dataTypeOrTransport);
	        }
	      });
	      return selected;
	    }
	    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	  }
	  function ajaxExtend(target, src) {
	    var key,
	        deep,
	        flatOptions = jQuery.ajaxSettings.flatOptions || {};
	    for (key in src) {
	      if (src[key] !== undefined) {
	        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
	      }
	    }
	    if (deep) {
	      jQuery.extend(true, target, deep);
	    }
	    return target;
	  }
	  function ajaxHandleResponses(s, jqXHR, responses) {
	    var ct,
	        type,
	        finalDataType,
	        firstDataType,
	        contents = s.contents,
	        dataTypes = s.dataTypes;
	    while (dataTypes[0] === "*") {
	      dataTypes.shift();
	      if (ct === undefined) {
	        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
	      }
	    }
	    if (ct) {
	      for (type in contents) {
	        if (contents[type] && contents[type].test(ct)) {
	          dataTypes.unshift(type);
	          break;
	        }
	      }
	    }
	    if (dataTypes[0] in responses) {
	      finalDataType = dataTypes[0];
	    } else {
	      for (type in responses) {
	        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
	          finalDataType = type;
	          break;
	        }
	        if (!firstDataType) {
	          firstDataType = type;
	        }
	      }
	      finalDataType = finalDataType || firstDataType;
	    }
	    if (finalDataType) {
	      if (finalDataType !== dataTypes[0]) {
	        dataTypes.unshift(finalDataType);
	      }
	      return responses[finalDataType];
	    }
	  }
	  function ajaxConvert(s, response, jqXHR, isSuccess) {
	    var conv2,
	        current,
	        conv,
	        tmp,
	        prev,
	        converters = {},
	        dataTypes = s.dataTypes.slice();
	    if (dataTypes[1]) {
	      for (conv in s.converters) {
	        converters[conv.toLowerCase()] = s.converters[conv];
	      }
	    }
	    current = dataTypes.shift();
	    while (current) {
	      if (s.responseFields[current]) {
	        jqXHR[s.responseFields[current]] = response;
	      }
	      if (!prev && isSuccess && s.dataFilter) {
	        response = s.dataFilter(response, s.dataType);
	      }
	      prev = current;
	      current = dataTypes.shift();
	      if (current) {
	        if (current === "*") {
	          current = prev;
	        } else if (prev !== "*" && prev !== current) {
	          conv = converters[prev + " " + current] || converters["* " + current];
	          if (!conv) {
	            for (conv2 in converters) {
	              tmp = conv2.split(" ");
	              if (tmp[1] === current) {
	                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
	                if (conv) {
	                  if (conv === true) {
	                    conv = converters[conv2];
	                  } else if (converters[conv2] !== true) {
	                    current = tmp[0];
	                    dataTypes.unshift(tmp[1]);
	                  }
	                  break;
	                }
	              }
	            }
	          }
	          if (conv !== true) {
	            if (conv && s["throws"]) {
	              response = conv(response);
	            } else {
	              try {
	                response = conv(response);
	              } catch (e) {
	                return {
	                  state: "parsererror",
	                  error: conv ? e : "No conversion from " + prev + " to " + current
	                };
	              }
	            }
	          }
	        }
	      }
	    }
	    return {
	      state: "success",
	      data: response
	    };
	  }
	  jQuery.extend({
	    active: 0,
	    lastModified: {},
	    etag: {},
	    ajaxSettings: {
	      url: ajaxLocation,
	      type: "GET",
	      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
	      global: true,
	      processData: true,
	      async: true,
	      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	      accepts: {
	        "*": allTypes,
	        text: "text/plain",
	        html: "text/html",
	        xml: "application/xml, text/xml",
	        json: "application/json, text/javascript"
	      },
	      contents: {
	        xml: /xml/,
	        html: /html/,
	        json: /json/
	      },
	      responseFields: {
	        xml: "responseXML",
	        text: "responseText",
	        json: "responseJSON"
	      },
	      converters: {
	        "* text": String,
	        "text html": true,
	        "text json": jQuery.parseJSON,
	        "text xml": jQuery.parseXML
	      },
	      flatOptions: {
	        url: true,
	        context: true
	      }
	    },
	    ajaxSetup: function(target, settings) {
	      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
	    },
	    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	    ajaxTransport: addToPrefiltersOrTransports(transports),
	    ajax: function(url, options) {
	      if (typeof url === "object") {
	        options = url;
	        url = undefined;
	      }
	      options = options || {};
	      var transport,
	          cacheURL,
	          responseHeadersString,
	          responseHeaders,
	          timeoutTimer,
	          parts,
	          fireGlobals,
	          i,
	          s = jQuery.ajaxSetup({}, options),
	          callbackContext = s.context || s,
	          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
	          deferred = jQuery.Deferred(),
	          completeDeferred = jQuery.Callbacks("once memory"),
	          statusCode = s.statusCode || {},
	          requestHeaders = {},
	          requestHeadersNames = {},
	          state = 0,
	          strAbort = "canceled",
	          jqXHR = {
	            readyState: 0,
	            getResponseHeader: function(key) {
	              var match;
	              if (state === 2) {
	                if (!responseHeaders) {
	                  responseHeaders = {};
	                  while ((match = rheaders.exec(responseHeadersString))) {
	                    responseHeaders[match[1].toLowerCase()] = match[2];
	                  }
	                }
	                match = responseHeaders[key.toLowerCase()];
	              }
	              return match == null ? null : match;
	            },
	            getAllResponseHeaders: function() {
	              return state === 2 ? responseHeadersString : null;
	            },
	            setRequestHeader: function(name, value) {
	              var lname = name.toLowerCase();
	              if (!state) {
	                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
	                requestHeaders[name] = value;
	              }
	              return this;
	            },
	            overrideMimeType: function(type) {
	              if (!state) {
	                s.mimeType = type;
	              }
	              return this;
	            },
	            statusCode: function(map) {
	              var code;
	              if (map) {
	                if (state < 2) {
	                  for (code in map) {
	                    statusCode[code] = [statusCode[code], map[code]];
	                  }
	                } else {
	                  jqXHR.always(map[jqXHR.status]);
	                }
	              }
	              return this;
	            },
	            abort: function(statusText) {
	              var finalText = statusText || strAbort;
	              if (transport) {
	                transport.abort(finalText);
	              }
	              done(0, finalText);
	              return this;
	            }
	          };
	      deferred.promise(jqXHR).complete = completeDeferred.add;
	      jqXHR.success = jqXHR.done;
	      jqXHR.error = jqXHR.fail;
	      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
	      s.type = options.method || options.type || s.method || s.type;
	      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
	      if (s.crossDomain == null) {
	        parts = rurl.exec(s.url.toLowerCase());
	        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
	      }
	      if (s.data && s.processData && typeof s.data !== "string") {
	        s.data = jQuery.param(s.data, s.traditional);
	      }
	      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
	      if (state === 2) {
	        return jqXHR;
	      }
	      fireGlobals = s.global;
	      if (fireGlobals && jQuery.active++ === 0) {
	        jQuery.event.trigger("ajaxStart");
	      }
	      s.type = s.type.toUpperCase();
	      s.hasContent = !rnoContent.test(s.type);
	      cacheURL = s.url;
	      if (!s.hasContent) {
	        if (s.data) {
	          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
	          delete s.data;
	        }
	        if (s.cache === false) {
	          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
	        }
	      }
	      if (s.ifModified) {
	        if (jQuery.lastModified[cacheURL]) {
	          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
	        }
	        if (jQuery.etag[cacheURL]) {
	          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
	        }
	      }
	      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
	        jqXHR.setRequestHeader("Content-Type", s.contentType);
	      }
	      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
	      for (i in s.headers) {
	        jqXHR.setRequestHeader(i, s.headers[i]);
	      }
	      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
	        return jqXHR.abort();
	      }
	      strAbort = "abort";
	      for (i in {
	        success: 1,
	        error: 1,
	        complete: 1
	      }) {
	        jqXHR[i](s[i]);
	      }
	      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
	      if (!transport) {
	        done(-1, "No Transport");
	      } else {
	        jqXHR.readyState = 1;
	        if (fireGlobals) {
	          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
	        }
	        if (s.async && s.timeout > 0) {
	          timeoutTimer = setTimeout(function() {
	            jqXHR.abort("timeout");
	          }, s.timeout);
	        }
	        try {
	          state = 1;
	          transport.send(requestHeaders, done);
	        } catch (e) {
	          if (state < 2) {
	            done(-1, e);
	          } else {
	            throw e;
	          }
	        }
	      }
	      function done(status, nativeStatusText, responses, headers) {
	        var isSuccess,
	            success,
	            error,
	            response,
	            modified,
	            statusText = nativeStatusText;
	        if (state === 2) {
	          return;
	        }
	        state = 2;
	        if (timeoutTimer) {
	          clearTimeout(timeoutTimer);
	        }
	        transport = undefined;
	        responseHeadersString = headers || "";
	        jqXHR.readyState = status > 0 ? 4 : 0;
	        isSuccess = status >= 200 && status < 300 || status === 304;
	        if (responses) {
	          response = ajaxHandleResponses(s, jqXHR, responses);
	        }
	        response = ajaxConvert(s, response, jqXHR, isSuccess);
	        if (isSuccess) {
	          if (s.ifModified) {
	            modified = jqXHR.getResponseHeader("Last-Modified");
	            if (modified) {
	              jQuery.lastModified[cacheURL] = modified;
	            }
	            modified = jqXHR.getResponseHeader("etag");
	            if (modified) {
	              jQuery.etag[cacheURL] = modified;
	            }
	          }
	          if (status === 204 || s.type === "HEAD") {
	            statusText = "nocontent";
	          } else if (status === 304) {
	            statusText = "notmodified";
	          } else {
	            statusText = response.state;
	            success = response.data;
	            error = response.error;
	            isSuccess = !error;
	          }
	        } else {
	          error = statusText;
	          if (status || !statusText) {
	            statusText = "error";
	            if (status < 0) {
	              status = 0;
	            }
	          }
	        }
	        jqXHR.status = status;
	        jqXHR.statusText = (nativeStatusText || statusText) + "";
	        if (isSuccess) {
	          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
	        } else {
	          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
	        }
	        jqXHR.statusCode(statusCode);
	        statusCode = undefined;
	        if (fireGlobals) {
	          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
	        }
	        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
	        if (fireGlobals) {
	          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
	          if (!(--jQuery.active)) {
	            jQuery.event.trigger("ajaxStop");
	          }
	        }
	      }
	      return jqXHR;
	    },
	    getJSON: function(url, data, callback) {
	      return jQuery.get(url, data, callback, "json");
	    },
	    getScript: function(url, callback) {
	      return jQuery.get(url, undefined, callback, "script");
	    }
	  });
	  jQuery.each(["get", "post"], function(i, method) {
	    jQuery[method] = function(url, data, callback, type) {
	      if (jQuery.isFunction(data)) {
	        type = type || callback;
	        callback = data;
	        data = undefined;
	      }
	      return jQuery.ajax({
	        url: url,
	        type: method,
	        dataType: type,
	        data: data,
	        success: callback
	      });
	    };
	  });
	  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
	    jQuery.fn[type] = function(fn) {
	      return this.on(type, fn);
	    };
	  });
	  jQuery._evalUrl = function(url) {
	    return jQuery.ajax({
	      url: url,
	      type: "GET",
	      dataType: "script",
	      async: false,
	      global: false,
	      "throws": true
	    });
	  };
	  jQuery.fn.extend({
	    wrapAll: function(html) {
	      var wrap;
	      if (jQuery.isFunction(html)) {
	        return this.each(function(i) {
	          jQuery(this).wrapAll(html.call(this, i));
	        });
	      }
	      if (this[0]) {
	        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
	        if (this[0].parentNode) {
	          wrap.insertBefore(this[0]);
	        }
	        wrap.map(function() {
	          var elem = this;
	          while (elem.firstElementChild) {
	            elem = elem.firstElementChild;
	          }
	          return elem;
	        }).append(this);
	      }
	      return this;
	    },
	    wrapInner: function(html) {
	      if (jQuery.isFunction(html)) {
	        return this.each(function(i) {
	          jQuery(this).wrapInner(html.call(this, i));
	        });
	      }
	      return this.each(function() {
	        var self = jQuery(this),
	            contents = self.contents();
	        if (contents.length) {
	          contents.wrapAll(html);
	        } else {
	          self.append(html);
	        }
	      });
	    },
	    wrap: function(html) {
	      var isFunction = jQuery.isFunction(html);
	      return this.each(function(i) {
	        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
	      });
	    },
	    unwrap: function() {
	      return this.parent().each(function() {
	        if (!jQuery.nodeName(this, "body")) {
	          jQuery(this).replaceWith(this.childNodes);
	        }
	      }).end();
	    }
	  });
	  jQuery.expr.filters.hidden = function(elem) {
	    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	  };
	  jQuery.expr.filters.visible = function(elem) {
	    return !jQuery.expr.filters.hidden(elem);
	  };
	  var r20 = /%20/g,
	      rbracket = /\[\]$/,
	      rCRLF = /\r?\n/g,
	      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	      rsubmittable = /^(?:input|select|textarea|keygen)/i;
	  function buildParams(prefix, obj, traditional, add) {
	    var name;
	    if (jQuery.isArray(obj)) {
	      jQuery.each(obj, function(i, v) {
	        if (traditional || rbracket.test(prefix)) {
	          add(prefix, v);
	        } else {
	          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
	        }
	      });
	    } else if (!traditional && jQuery.type(obj) === "object") {
	      for (name in obj) {
	        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
	      }
	    } else {
	      add(prefix, obj);
	    }
	  }
	  jQuery.param = function(a, traditional) {
	    var prefix,
	        s = [],
	        add = function(key, value) {
	          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
	          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	        };
	    if (traditional === undefined) {
	      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	    }
	    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
	      jQuery.each(a, function() {
	        add(this.name, this.value);
	      });
	    } else {
	      for (prefix in a) {
	        buildParams(prefix, a[prefix], traditional, add);
	      }
	    }
	    return s.join("&").replace(r20, "+");
	  };
	  jQuery.fn.extend({
	    serialize: function() {
	      return jQuery.param(this.serializeArray());
	    },
	    serializeArray: function() {
	      return this.map(function() {
	        var elements = jQuery.prop(this, "elements");
	        return elements ? jQuery.makeArray(elements) : this;
	      }).filter(function() {
	        var type = this.type;
	        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
	      }).map(function(i, elem) {
	        var val = jQuery(this).val();
	        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
	          return {
	            name: elem.name,
	            value: val.replace(rCRLF, "\r\n")
	          };
	        }) : {
	          name: elem.name,
	          value: val.replace(rCRLF, "\r\n")
	        };
	      }).get();
	    }
	  });
	  jQuery.ajaxSettings.xhr = function() {
	    try {
	      return new XMLHttpRequest();
	    } catch (e) {}
	  };
	  var xhrId = 0,
	      xhrCallbacks = {},
	      xhrSuccessStatus = {
	        0: 200,
	        1223: 204
	      },
	      xhrSupported = jQuery.ajaxSettings.xhr();
	  if (window.ActiveXObject) {
	    jQuery(window).on("unload", function() {
	      for (var key in xhrCallbacks) {
	        xhrCallbacks[key]();
	      }
	    });
	  }
	  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
	  support.ajax = xhrSupported = !!xhrSupported;
	  jQuery.ajaxTransport(function(options) {
	    var callback;
	    if (support.cors || xhrSupported && !options.crossDomain) {
	      return {
	        send: function(headers, complete) {
	          var i,
	              xhr = options.xhr(),
	              id = ++xhrId;
	          xhr.open(options.type, options.url, options.async, options.username, options.password);
	          if (options.xhrFields) {
	            for (i in options.xhrFields) {
	              xhr[i] = options.xhrFields[i];
	            }
	          }
	          if (options.mimeType && xhr.overrideMimeType) {
	            xhr.overrideMimeType(options.mimeType);
	          }
	          if (!options.crossDomain && !headers["X-Requested-With"]) {
	            headers["X-Requested-With"] = "XMLHttpRequest";
	          }
	          for (i in headers) {
	            xhr.setRequestHeader(i, headers[i]);
	          }
	          callback = function(type) {
	            return function() {
	              if (callback) {
	                delete xhrCallbacks[id];
	                callback = xhr.onload = xhr.onerror = null;
	                if (type === "abort") {
	                  xhr.abort();
	                } else if (type === "error") {
	                  complete(xhr.status, xhr.statusText);
	                } else {
	                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {text: xhr.responseText} : undefined, xhr.getAllResponseHeaders());
	                }
	              }
	            };
	          };
	          xhr.onload = callback();
	          xhr.onerror = callback("error");
	          callback = xhrCallbacks[id] = callback("abort");
	          try {
	            xhr.send(options.hasContent && options.data || null);
	          } catch (e) {
	            if (callback) {
	              throw e;
	            }
	          }
	        },
	        abort: function() {
	          if (callback) {
	            callback();
	          }
	        }
	      };
	    }
	  });
	  jQuery.ajaxSetup({
	    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
	    contents: {script: /(?:java|ecma)script/},
	    converters: {"text script": function(text) {
	        jQuery.globalEval(text);
	        return text;
	      }}
	  });
	  jQuery.ajaxPrefilter("script", function(s) {
	    if (s.cache === undefined) {
	      s.cache = false;
	    }
	    if (s.crossDomain) {
	      s.type = "GET";
	    }
	  });
	  jQuery.ajaxTransport("script", function(s) {
	    if (s.crossDomain) {
	      var script,
	          callback;
	      return {
	        send: function(_, complete) {
	          script = jQuery("<script>").prop({
	            async: true,
	            charset: s.scriptCharset,
	            src: s.url
	          }).on("load error", callback = function(evt) {
	            script.remove();
	            callback = null;
	            if (evt) {
	              complete(evt.type === "error" ? 404 : 200, evt.type);
	            }
	          });
	          document.head.appendChild(script[0]);
	        },
	        abort: function() {
	          if (callback) {
	            callback();
	          }
	        }
	      };
	    }
	  });
	  var oldCallbacks = [],
	      rjsonp = /(=)\?(?=&|$)|\?\?/;
	  jQuery.ajaxSetup({
	    jsonp: "callback",
	    jsonpCallback: function() {
	      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
	      this[callback] = true;
	      return callback;
	    }
	  });
	  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
	    var callbackName,
	        overwritten,
	        responseContainer,
	        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
	    if (jsonProp || s.dataTypes[0] === "jsonp") {
	      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
	      if (jsonProp) {
	        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
	      } else if (s.jsonp !== false) {
	        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
	      }
	      s.converters["script json"] = function() {
	        if (!responseContainer) {
	          jQuery.error(callbackName + " was not called");
	        }
	        return responseContainer[0];
	      };
	      s.dataTypes[0] = "json";
	      overwritten = window[callbackName];
	      window[callbackName] = function() {
	        responseContainer = arguments;
	      };
	      jqXHR.always(function() {
	        window[callbackName] = overwritten;
	        if (s[callbackName]) {
	          s.jsonpCallback = originalSettings.jsonpCallback;
	          oldCallbacks.push(callbackName);
	        }
	        if (responseContainer && jQuery.isFunction(overwritten)) {
	          overwritten(responseContainer[0]);
	        }
	        responseContainer = overwritten = undefined;
	      });
	      return "script";
	    }
	  });
	  jQuery.parseHTML = function(data, context, keepScripts) {
	    if (!data || typeof data !== "string") {
	      return null;
	    }
	    if (typeof context === "boolean") {
	      keepScripts = context;
	      context = false;
	    }
	    context = context || document;
	    var parsed = rsingleTag.exec(data),
	        scripts = !keepScripts && [];
	    if (parsed) {
	      return [context.createElement(parsed[1])];
	    }
	    parsed = jQuery.buildFragment([data], context, scripts);
	    if (scripts && scripts.length) {
	      jQuery(scripts).remove();
	    }
	    return jQuery.merge([], parsed.childNodes);
	  };
	  var _load = jQuery.fn.load;
	  jQuery.fn.load = function(url, params, callback) {
	    if (typeof url !== "string" && _load) {
	      return _load.apply(this, arguments);
	    }
	    var selector,
	        type,
	        response,
	        self = this,
	        off = url.indexOf(" ");
	    if (off >= 0) {
	      selector = jQuery.trim(url.slice(off));
	      url = url.slice(0, off);
	    }
	    if (jQuery.isFunction(params)) {
	      callback = params;
	      params = undefined;
	    } else if (params && typeof params === "object") {
	      type = "POST";
	    }
	    if (self.length > 0) {
	      jQuery.ajax({
	        url: url,
	        type: type,
	        dataType: "html",
	        data: params
	      }).done(function(responseText) {
	        response = arguments;
	        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
	      }).complete(callback && function(jqXHR, status) {
	        self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
	      });
	    }
	    return this;
	  };
	  jQuery.expr.filters.animated = function(elem) {
	    return jQuery.grep(jQuery.timers, function(fn) {
	      return elem === fn.elem;
	    }).length;
	  };
	  var docElem = window.document.documentElement;
	  function getWindow(elem) {
	    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	  }
	  jQuery.offset = {setOffset: function(elem, options, i) {
	      var curPosition,
	          curLeft,
	          curCSSTop,
	          curTop,
	          curOffset,
	          curCSSLeft,
	          calculatePosition,
	          position = jQuery.css(elem, "position"),
	          curElem = jQuery(elem),
	          props = {};
	      if (position === "static") {
	        elem.style.position = "relative";
	      }
	      curOffset = curElem.offset();
	      curCSSTop = jQuery.css(elem, "top");
	      curCSSLeft = jQuery.css(elem, "left");
	      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
	      if (calculatePosition) {
	        curPosition = curElem.position();
	        curTop = curPosition.top;
	        curLeft = curPosition.left;
	      } else {
	        curTop = parseFloat(curCSSTop) || 0;
	        curLeft = parseFloat(curCSSLeft) || 0;
	      }
	      if (jQuery.isFunction(options)) {
	        options = options.call(elem, i, curOffset);
	      }
	      if (options.top != null) {
	        props.top = (options.top - curOffset.top) + curTop;
	      }
	      if (options.left != null) {
	        props.left = (options.left - curOffset.left) + curLeft;
	      }
	      if ("using" in options) {
	        options.using.call(elem, props);
	      } else {
	        curElem.css(props);
	      }
	    }};
	  jQuery.fn.extend({
	    offset: function(options) {
	      if (arguments.length) {
	        return options === undefined ? this : this.each(function(i) {
	          jQuery.offset.setOffset(this, options, i);
	        });
	      }
	      var docElem,
	          win,
	          elem = this[0],
	          box = {
	            top: 0,
	            left: 0
	          },
	          doc = elem && elem.ownerDocument;
	      if (!doc) {
	        return;
	      }
	      docElem = doc.documentElement;
	      if (!jQuery.contains(docElem, elem)) {
	        return box;
	      }
	      if (typeof elem.getBoundingClientRect !== strundefined) {
	        box = elem.getBoundingClientRect();
	      }
	      win = getWindow(doc);
	      return {
	        top: box.top + win.pageYOffset - docElem.clientTop,
	        left: box.left + win.pageXOffset - docElem.clientLeft
	      };
	    },
	    position: function() {
	      if (!this[0]) {
	        return;
	      }
	      var offsetParent,
	          offset,
	          elem = this[0],
	          parentOffset = {
	            top: 0,
	            left: 0
	          };
	      if (jQuery.css(elem, "position") === "fixed") {
	        offset = elem.getBoundingClientRect();
	      } else {
	        offsetParent = this.offsetParent();
	        offset = this.offset();
	        if (!jQuery.nodeName(offsetParent[0], "html")) {
	          parentOffset = offsetParent.offset();
	        }
	        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
	        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
	      }
	      return {
	        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
	        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
	      };
	    },
	    offsetParent: function() {
	      return this.map(function() {
	        var offsetParent = this.offsetParent || docElem;
	        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
	          offsetParent = offsetParent.offsetParent;
	        }
	        return offsetParent || docElem;
	      });
	    }
	  });
	  jQuery.each({
	    scrollLeft: "pageXOffset",
	    scrollTop: "pageYOffset"
	  }, function(method, prop) {
	    var top = "pageYOffset" === prop;
	    jQuery.fn[method] = function(val) {
	      return access(this, function(elem, method, val) {
	        var win = getWindow(elem);
	        if (val === undefined) {
	          return win ? win[prop] : elem[method];
	        }
	        if (win) {
	          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
	        } else {
	          elem[method] = val;
	        }
	      }, method, val, arguments.length, null);
	    };
	  });
	  jQuery.each(["top", "left"], function(i, prop) {
	    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
	      if (computed) {
	        computed = curCSS(elem, prop);
	        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
	      }
	    });
	  });
	  jQuery.each({
	    Height: "height",
	    Width: "width"
	  }, function(name, type) {
	    jQuery.each({
	      padding: "inner" + name,
	      content: type,
	      "": "outer" + name
	    }, function(defaultExtra, funcName) {
	      jQuery.fn[funcName] = function(margin, value) {
	        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
	            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
	        return access(this, function(elem, type, value) {
	          var doc;
	          if (jQuery.isWindow(elem)) {
	            return elem.document.documentElement["client" + name];
	          }
	          if (elem.nodeType === 9) {
	            doc = elem.documentElement;
	            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
	          }
	          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
	        }, type, chainable ? margin : undefined, chainable, null);
	      };
	    });
	  });
	  jQuery.fn.size = function() {
	    return this.length;
	  };
	  jQuery.fn.andSelf = jQuery.fn.addBack;
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return jQuery;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  var _jQuery = window.jQuery,
	      _$ = window.$;
	  jQuery.noConflict = function(deep) {
	    if (window.$ === jQuery) {
	      window.$ = _$;
	    }
	    if (deep && window.jQuery === jQuery) {
	      window.jQuery = _jQuery;
	    }
	    return jQuery;
	  };
	  if (typeof noGlobal === strundefined) {
	    window.jQuery = window.$ = jQuery;
	  }
	  return jQuery;
	}));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/delta.js/node_modules/css-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/sass-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/traceur-loader/index.js?script!/home/mhelvens/Projects/delta.js/src/example/example.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/delta.js/node_modules/css-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/sass-loader/index.js!/home/mhelvens/Projects/delta.js/node_modules/traceur-loader/index.js?script!/home/mhelvens/Projects/delta.js/src/example/example.scss");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	exports.push([module.id, "", ""]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var U = {
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      var cls = constructor;
	      cls.prototype = prototype;
	      cls.prototype.constructor = cls;
	      return cls;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
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
	    },
	    repeat: function(nr, str) {
	      return new Array(nr + 1).join(str);
	    }
	  };
	  return U;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  var list = [];
	  list.toString = function toString() {
	    var result = [];
	    for (var i = 0; i < this.length; i++) {
	      var item = this[i];
	      if (item[2]) {
	        result.push("@media " + item[2] + "{" + item[1] + "}");
	      } else {
	        result.push(item[1]);
	      }
	    }
	    return result.join("");
	  };
	  return list;
	};
	
	//# sourceMappingURL=<compileOutput>


/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGVsdGEuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9ib3dlcl9jb21wb25lbnRzL2pxdWVyeS9kaXN0L2pxdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXhhbXBsZS9leGFtcGxlLnNjc3M/YWRiYiIsIndlYnBhY2s6Ly8vLi9zcmMvZXhhbXBsZS9leGFtcGxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztpRUFBQSxpQ0FBUSx1QkFBVyxDQUFHLDBDQUFVO0FBQy9CLGNBQVcsQ0FBQztBQU1SLGFBQU0sRUFBSSxXQUFVLENBQUMsUUFBUyxRQUFNLENBQUU7QUFFckMsbUJBQVUsRUFBSSxLQUFHLENBQUM7QUFHdEIsUUFBRyxXQUFXLEVBQUksR0FBQyxDQUFDO0FBQ3BCLFFBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUd0QixRQUFHLFdBQVcsTUFBTSxFQUFJLFdBQVUsQ0FBQyxTQUFVLENBQUUsR0FBQyxDQUFDLENBQUM7QUFHbEQsUUFBRyxhQUFhLENBQUUsUUFBTyxDQUFDLEVBQUksRUFBRSxRQUFPLENBQUcsR0FBQyxDQUFFLENBQUM7QUFJOUMsUUFBRyxXQUFXLENBQUUsUUFBTyxDQUFDLEVBQUksY0FBYSxDQUFDLElBQUcsV0FBVyxNQUFNLEdBQUcsU0FBQyxPQUFNO1lBQU0sVUFBVSxDQUFFO0FBQ3pGLGVBQU8sRUFBQyxDQUFDO0FBQ1QsWUFBRyxPQUFPLEVBQUksR0FBQyxDQUFDO09BQ2pCO0tBQUEsRUFBRztBQUVGLFVBQUcs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ZWZpbmUoWycuL21pc2MuanMnXSwgZnVuY3Rpb24gKFUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyoqIHtAY2xhc3MgRGVsdGFKc31cblx0ICpcblx0ICovXG5cdHZhciBEZWx0YUpzID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBEZWx0YUpzKCkge1xuXG5cdFx0dmFyIHRoaXNEZWx0YUpzID0gdGhpcztcblxuXHRcdC8qIHRoZSB0aGluZ3MgaW5zdGFuY2VzIG9mICdEZWx0YUpzJyBrZWVwcyB0cmFjayBvZiAqL1xuXHRcdHRoaXMub3BlcmF0aW9ucyA9IHt9OyAgIC8vIHByb3BlcnR5IC0+IERlbHRhXG5cdFx0dGhpcy5jb21wb3NpdGlvbnMgPSB7fTsgLy8gdHlwZTEgLT4gdHlwZTIgLT4gW2NvbXBvc2VGbl1cblxuXHRcdC8qIGRlZmluZSB0aGUgYmFzZSAnRGVsdGEnIGNsYXNzICovXG5cdFx0dGhpcy5vcGVyYXRpb25zLkRlbHRhID0gVS5uZXdDbGFzcyhmdW5jdGlvbiAoKSB7fSk7XG5cblx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0dGhpcy5jb21wb3NpdGlvbnNbJ21vZGlmeSddID0geyAnbW9kaWZ5JzogW10gfTtcblxuXHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cdFx0LyogZGVmaW5lIHRoZSBmdW5kYW1lbnRhbCAnbW9kaWZ5JyBkZWx0YSAqL1xuXHRcdHRoaXMub3BlcmF0aW9uc1snbW9kaWZ5J10gPSBVLm5ld1N1YmNsYXNzKHRoaXMub3BlcmF0aW9ucy5EZWx0YSwgKHN1cGVyRm4pID0+IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN1cGVyRm4oKTtcblx0XHRcdHRoaXMuZGVsdGFzID0ge307XG5cdFx0fSwge1xuXG5cdFx0XHR0eXBlOiAnbW9kaWZ5JyxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvYmogIHtPYmplY3R9XG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRhcHBseVRvKG9iaiwgcHJvcCkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQocHJvcCkpIHtcblx0XHRcdFx0XHQvKiBpZiBhIHByb3BlcnR5IGlzIHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqW3Byb3BdYCAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KG9ialtwcm9wXSBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYWxyZWFkeSBkZWZpbmVkIE9iamVjdC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbc3ViUHJvcF0uYXBwbHlUbyhvYmpbcHJvcF0sIHN1YlByb3ApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGlmIGEgcHJvcGVydHkgaXMgbm90IHBhc3NlZCwgYXBwbHkgdGhpcyBkZWx0YSB0byBgb2JqYCAqL1xuXHRcdFx0XHRcdFUuYXNzZXJ0KG9iaiBpbnN0YW5jZW9mIE9iamVjdCxcblx0XHRcdFx0XHRcdFx0YFRoZSAnbW9kaWZ5JyBvcGVyYXRpb24gZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgYW4gYWxyZWFkeSBkZWZpbmVkIE9iamVjdC5gKTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykuZm9yRWFjaCgoc3ViUHJvcCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbc3ViUHJvcF0uYXBwbHlUbyhvYmosIHN1YlByb3ApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHByb3AgIHtTdHJpbmd9XG5cdFx0XHQgKiBAcGFyYW0gb3RoZXIge0RlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YX1cblx0XHRcdCAqL1xuXHRcdFx0Y29tcG9zZShwcm9wLCBvdGhlcikge1xuXG5cdFx0XHRcdGlmIChvdGhlcikge1xuXHRcdFx0XHRcdHZhciB0aGlzRGVsdGEgPSB0aGlzLmRlbHRhc1twcm9wXTtcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHRoaXNEZWx0YUpzLmNvbXBvc2l0aW9uc1t0aGlzRGVsdGEudHlwZV1bb3RoZXIudHlwZV0uc29tZSgoY29tcCkgPT4ge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0Y29tcCh0aGlzLCBwcm9wLCBvdGhlcik7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoX18pIHt9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0VS5hc3NlcnQoc3VjY2Vzcyxcblx0XHRcdFx0XHRcdFx0YE5vIGNvbXBvc2l0aW9uIGlzIGRlZmluZWQgYmV0d2VlbiAnJHt0aGlzRGVsdGEudHlwZX0nIGFuZCAnJHtvdGhlci50eXBlfScuYCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gcHJvcCB7U3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRtb2RpZnkocHJvcCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKCdtb2RpZnknLCBwcm9wLCBbXSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBvcFR5cGUge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBwcm9wICAge1N0cmluZ31cblx0XHRcdCAqIEBwYXJhbSBhcmdzICAge1sqXX1cblx0XHRcdCAqL1xuXHRcdFx0X2FkZE9wZXJhdGlvbihvcFR5cGUsIHByb3AsIGFyZ3MpIHtcblxuXHRcdFx0XHQvKiBkaXNzZWN0IHRoZSAncHJvcCcgc3RyaW5nICovXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAgMTExMTEgIDIyMjIyMjIyMjIyICAzMyAgLy9cblx0XHRcdFx0dmFyIG1hdGNoID0gcHJvcC5tYXRjaCgvXihbLiNdPykoXFx3K3xcXChcXHcrXFwpKSguKikkLyk7XG5cdFx0XHRcdFUuYXNzZXJ0KG1hdGNoLCBgVGhlIHBhdGggc3RyaW5nICcke3Byb3B9JyBpcyBub3Qgd2VsbCBmb3JtZWQuYCk7XG5cblx0XHRcdFx0LyogaWYgJ3Byb3AnIGhhcyBhIGxlYWRpbmcgJyMnIGNoYXJhY3RlciwgdHJhbnNmb3JtIGl0IGFuZCByZWNhbGwgdGhpcyBtZXRob2QgKi9cblx0XHRcdFx0aWYgKG1hdGNoWzFdID09PSAnIycpIHtcblx0XHRcdFx0XHQvLyB0aGUgIyBzZXBhcmF0b3IgZXhwZWN0cyB0aGUgY3VycmVudCBvYmplY3QgdG8gYmUgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbixcblx0XHRcdFx0XHQvLyBhbmQgeWllbGRzIGEgZGVsdGEgdG8gbW9kaWZ5IG5ldyBpbnN0YW5jZXMgb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2xhc3Ncblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgYC4oaW5zdGFuY2UpLiR7bWF0Y2hbMl19JHttYXRjaFszXX1gLCBhcmdzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qIGNyZWF0ZSB0aGUgcmVzdWx0aW5nIGRlbHRhLCBwb3NzaWJseSBjYWxsaW5nIHRoaXMgbWV0aG9kIHJlY3Vyc2l2ZWx5IGZvciBhIGxvbmdlciBjaGFpbiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0RGVsdGE7XG5cdFx0XHRcdGlmIChtYXRjaFszXSA9PT0gJycpIHtcblx0XHRcdFx0XHQoKG5ld0RlbHRhKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5kZWx0YXNbbWF0Y2hbMl1dKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29tcG9zZShtYXRjaFsyXSwgbmV3RGVsdGEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5kZWx0YXNbbWF0Y2hbMl1dID0gbmV3RGVsdGE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkoVS5hcHBseUNvbnN0cnVjdG9yKHRoaXNEZWx0YUpzLm9wZXJhdGlvbnNbb3BUeXBlXSwgW21hdGNoWzJdXS5jb25jYXQoYXJncykpKTtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMuZGVsdGFzW21hdGNoWzJdXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHREZWx0YSA9IHRoaXMubW9kaWZ5KG1hdGNoWzJdKS5fYWRkT3BlcmF0aW9uKG9wVHlwZSwgbWF0Y2hbM10sIGFyZ3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyogaWYgdGhpcyBvcGVyYXRpb24gd2FzIGEgbW9kaWZpY2F0aW9uLCByZXR1cm4gdGhlIG5ldyBkZWx0YTsgb3RoZXJ3aXNlLCByZXR1cm4gdGhpcyBkZWx0YSAqL1xuXHRcdFx0XHRyZXR1cm4gb3BUeXBlID09PSAnbW9kaWZ5JyA/IHJlc3VsdERlbHRhIDogdGhpcztcblxuXHRcdFx0fSxcblxuXHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSBpbmRlbnRMdmwge051bWJlcj99XG5cdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0ICovXG5cdFx0XHR0b1N0cmluZyhpbmRlbnRMdmwgPSAwLCBwcm9wID0gJyhyb290KScpIHtcblx0XHRcdFx0cmV0dXJuIGAke1UucmVwZWF0KGluZGVudEx2bCwgJyAgICAnKX1tb2RpZnkgJyR7cHJvcH0nXFxuYCArXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmRlbHRhcykubWFwKChwKSA9PiB0aGlzLmRlbHRhc1twXS50b1N0cmluZyhpbmRlbnRMdmwgKyAxLCBwKSkuam9pbignXFxuJyk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXG5cblx0XHQvKiBkZWZpbmUgc3RhbmRhcmQgb3BlcmF0aW9ucyAqL1xuXHRcdHRoaXMuX2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKTtcblxuXG5cdH0sIC8qKiBAbGVuZHMgRGVsdGFKcy5wcm90b3R5cGUgKi8gIHtcblxuXHRcdC8qKiB7QHB1YmxpY317QG1ldGhvZH1cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBuYW1lICAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGFwcGx5VG8geyhEZWx0YUpzI29wZXJhdGlvbnMuRGVsdGEsIE9iamVjdCwgU3RyaW5nKSA9PiB1bmRlZmluZWR9XG5cdFx0ICovXG5cdFx0bmV3T3BlcmF0aW9uVHlwZShuYW1lLCBhcHBseVRvKSB7XG5cblx0XHRcdC8qIHNhbml0eSBjaGVja3MgKi9cblx0XHRcdFUuYXNzZXJ0KCF0aGlzLm9wZXJhdGlvbnNbbmFtZV0sXG5cdFx0XHRcdFx0YFRoZSAnJHtuYW1lfScgb3BlcmF0aW9uIHR5cGUgYWxyZWFkeSBleGlzdHMuYCk7XG5cblx0XHRcdC8qIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBtZXRob2QgaW4gdGhlICdtb2RpZnknIGRlbHRhICovXG5cdFx0XHR0aGlzLm9wZXJhdGlvbnMubW9kaWZ5LnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uIChwcm9wLCAuLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hZGRPcGVyYXRpb24obmFtZSwgcHJvcCwgYXJncyk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBwdXQgdGhlIHJpZ2h0IGZvdW5kYXRpb24gaW4gJ3RoaXMuY29tcG9zaXRpb24nICovXG5cdFx0XHR0aGlzLmNvbXBvc2l0aW9uc1tuYW1lXSA9IHt9O1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5jb21wb3NpdGlvbnMpLmZvckVhY2goKHR5cGUpID0+IHtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW3R5cGVdW25hbWVdKTtcblx0XHRcdFx0VS5hc3NlcnQoIXRoaXMuY29tcG9zaXRpb25zW25hbWVdW3R5cGVdKTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZV1bbmFtZV0gPSBbXTtcblx0XHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbbmFtZV1bdHlwZV0gPSBbXTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblx0XHRcdC8qIGNyZWF0ZSB0aGUgRGVsdGEgc3VwZXJjbGFzcyByZXByZXNlbnRpbmcgdGhpcyBvcGVyYXRpb24gdHlwZSAqL1xuXHRcdFx0dGhpcy5vcGVyYXRpb25zW25hbWVdID0gVS5uZXdTdWJjbGFzcyh0aGlzLm9wZXJhdGlvbnMuRGVsdGEsIChzdXBlckZuKSA9PiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRzdXBlckZuKCk7XG5cdFx0XHRcdHRoaXMuYSA9IGFyZ3M7XG5cdFx0XHR9LCB7XG5cdFx0XHRcdHR5cGU6IG5hbWUsXG5cdFx0XHRcdGFwcGx5VG86IGFwcGx5VG8sXG5cblx0XHRcdFx0LyoqIHtAcHVibGljfXtAbWV0aG9kfVxuXHRcdFx0XHQgKiBAcGFyYW0gaW5kZW50THZsIHtOdW1iZXI/fVxuXHRcdFx0XHQgKiBAcGFyYW0gcHJvcGVydHkgIHtTdHJpbmc/fVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dG9TdHJpbmcoaW5kZW50THZsID0gMCwgcHJvcCA9ICcocm9vdCknKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGAke1UucmVwZWF0KDAgKyBpbmRlbnRMdmwsICcgICAgJyl9JHtuYW1lfSAnJHtwcm9wfSc6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5hKS5zbGljZSgxLCAtMSl9YDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vXG5cblxuXHRcdH0sXG5cblx0XHQvKioge0BwdWJsaWN9e0BtZXRob2R9XG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gdHlwZTEgICB7U3RyaW5nfVxuXHRcdCAqIEBwYXJhbSB0eXBlMiAgIHtTdHJpbmd9XG5cdFx0ICogQHBhcmFtIGNvbXBvc2UgeyhEZWx0YUpzI29wZXJhdGlvbnMubW9kaWZ5LCBTdHJpbmcsIERlbHRhSnMjb3BlcmF0aW9ucy5EZWx0YSkgPT4gdW5kZWZpbmVkfVxuXHRcdCAqL1xuXHRcdG5ld0NvbXBvc2l0aW9uKHR5cGUxLCB0eXBlMiwgY29tcG9zZSkge1xuXHRcdFx0dGhpcy5jb21wb3NpdGlvbnNbdHlwZTFdW3R5cGUyXS5wdXNoKGNvbXBvc2UpO1xuXHRcdH0sXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvKioge0Bwcml2YXRlfXtAbWV0aG9kfVxuXHRcdCAqXG5cdFx0ICovXG5cdFx0X2RlZmluZVN0YW5kYXJkT3BlcmF0aW9uVHlwZXMoKSB7XG5cblx0XHRcdC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy9cblxuXHRcdFx0LyogY29udmVuaWVuY2UgZGVmaW5pdGlvbnMgZm9yIHRoZSBhcHBsaWNhdGlvbiBhbmQgY29tcG9zaXRpb24gZnVuY3Rpb25zIGJlbG93ICovXG5cdFx0XHR2YXIga2VlcEZpcnN0ID0gKCkgPT4ge307XG5cdFx0XHR2YXIga2VlcFNlY29uZCA9IChkMSwgcCwgZDIpID0+IHsgZDEuZGVsdGFzW3BdID0gZDIgfTtcblx0XHRcdHZhciBhcHBseVNlY29uZFRvRmlyc3RWYWx1ZSA9IChkMSwgcCwgZDIpID0+IHsgZDIuYXBwbHlUbyhkMS5kZWx0YXNbcF0uYSwgMCkgfTtcblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RnVuY3Rpb24odmFsLCBvcFR5cGUpIHtcblx0XHRcdFx0VS5hc3NlcnQodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IGl0IGFjdHMgb24gdG8gYmUgYSBmdW5jdGlvbi5gKTtcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIGFzc2VydE9iamVjdCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydCh2YWwgaW5zdGFuY2VvZiBPYmplY3QsXG5cdFx0XHRcdFx0XHRgVGhlIG9wZXJhdGlvbiAnJHtvcFR5cGV9JyBleHBlY3RzIHRoZSBwcm9wZXJ0eSBpdCBhY3RzIG9uIHRvIGJlIGFuIE9iamVjdC5gKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZCh2YWwsIG9wVHlwZSkge1xuXHRcdFx0XHRVLmFzc2VydChVLmlzRGVmaW5lZCh2YWwpLFxuXHRcdFx0XHRcdFx0YFRoZSBvcGVyYXRpb24gJyR7b3BUeXBlfScgZXhwZWN0cyB0aGUgcHJvcGVydHkgdG8gYmUgZGVmaW5lZC5gKTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYXNzZXJ0VW5kZWZpbmVkKHZhbCwgb3BUeXBlKSB7XG5cdFx0XHRcdFUuYXNzZXJ0KFUuaXNVbmRlZmluZWQodmFsKSxcblx0XHRcdFx0XHRcdGBUaGUgb3BlcmF0aW9uICcke29wVHlwZX0nIGV4cGVjdHMgdGhlIHByb3BlcnR5IHRvIGJlIHVuZGVmaW5lZC5gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvLyAgLy8gIC8vICAvL1xuXG5cdFx0XHR0aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnbW9kaWZ5JywgKGQxLCBwLCBkMikgPT4ge1xuXHRcdFx0XHRPYmplY3Qua2V5cyhkMi5kZWx0YXMpLmZvckVhY2goKHByb3ApID0+IHtcblx0XHRcdFx0XHRkMS5jb21wb3NlKHByb3AsIGQyLmRlbHRhc1twcm9wXSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMubmV3T3BlcmF0aW9uVHlwZSgnYWRkJywgZnVuY3Rpb24gYXBwbHlUbyhvYmosIHByb3ApIHtcblx0XHRcdFx0YXNzZXJ0VW5kZWZpbmVkKG9ialtwcm9wXSwgJ2FkZCcpO1xuXHRcdFx0XHRvYmpbcHJvcF0gPSB0aGlzLmFbMF07XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly90aGlzLm5ld0NvbXBvc2l0aW9uKCdtb2RpZnknLCAnYWRkJywgKGQxLCBwLCBkMikgPT4geyBlcnJvciB9KTtcblxuXHRcdFx0dGhpcy5uZXdDb21wb3NpdGlvbignYWRkJywgJ21vZGlmeScsIChkMSwgcCwgZDIpID0+IHtcblx0XHRcdFx0YXNzZXJ0T2JqZWN0KGQxLmRlbHRhc1twXS5hWzBdLCAnbW9kaWZ5Jyk7XG5cdFx0XHRcdGFwcGx5U2Vjb25kVG9GaXJzdFZhbHVlKGQxLCBwLCBkMik7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5uZXdPcGVyYXRpb25UeXBlKCdyZW1vdmUnLCBmdW5jdGlvbiBhcHBseVRvKG9iaiwgcCkge1xuXHRcdFx0XHRhc3NlcnREZWZpbmVkKG9ialtwXSwgJ3JlbW92ZScpO1xuXHRcdFx0XHRkZWxldGUgb2JqW3BdO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ21vZGlmeScsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ2FkZCcsICdyZW1vdmUnLCBrZWVwU2Vjb25kKTtcblx0XHRcdC8vdGhpcy5uZXdDb21wb3NpdGlvbigncmVtb3ZlJywgJ21vZGlmeScsIGVycm9yKTtcblx0XHRcdHRoaXMubmV3Q29tcG9zaXRpb24oJ3JlbW92ZScsICdhZGQnLCAoZDEsIHAsIGQyKSA9PiB7ICB9KTsgLy8gVE9ETzogcmVwbGFjZVxuXG5cblx0XHR9XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0fSk7XG5cblxuXHRyZXR1cm4gRGVsdGFKcztcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlbHRhLmpzXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wXG4gKiovIiwibnVsbFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8xXG4gKiovIiwiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYyLjEuMVxuICogaHR0cDovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCAyMDA1LCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTQtMDUtMDFUMTc6MTFaXG4gKi9cblxuKGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG5cblx0aWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHQvLyBGb3IgQ29tbW9uSlMgYW5kIENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHdoZXJlIGEgcHJvcGVyIHdpbmRvdyBpcyBwcmVzZW50LFxuXHRcdC8vIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnlcblx0XHQvLyBGb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IGluaGVyZW50bHkgcG9zc2VzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFxuXHRcdC8vIChzdWNoIGFzIE5vZGUuanMpLCBleHBvc2UgYSBqUXVlcnktbWFraW5nIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHNcblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIHdpbmRvd1xuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xuXHRcdFx0ZmFjdG9yeSggZ2xvYmFsLCB0cnVlICkgOlxuXHRcdFx0ZnVuY3Rpb24oIHcgKSB7XG5cdFx0XHRcdGlmICggIXcuZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWN0b3J5KCB3ICk7XG5cdFx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZhY3RvcnkoIGdsb2JhbCApO1xuXHR9XG5cbi8vIFBhc3MgdGhpcyBpZiB3aW5kb3cgaXMgbm90IGRlZmluZWQgeWV0XG59KHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiggd2luZG93LCBub0dsb2JhbCApIHtcblxuLy8gQ2FuJ3QgZG8gdGhpcyBiZWNhdXNlIHNldmVyYWwgYXBwcyBpbmNsdWRpbmcgQVNQLk5FVCB0cmFjZVxuLy8gdGhlIHN0YWNrIHZpYSBhcmd1bWVudHMuY2FsbGVyLmNhbGxlZSBhbmQgRmlyZWZveCBkaWVzIGlmXG4vLyB5b3UgdHJ5IHRvIHRyYWNlIHRocm91Z2ggXCJ1c2Ugc3RyaWN0XCIgY2FsbCBjaGFpbnMuICgjMTMzMzUpXG4vLyBTdXBwb3J0OiBGaXJlZm94IDE4K1xuLy9cblxudmFyIGFyciA9IFtdO1xuXG52YXIgc2xpY2UgPSBhcnIuc2xpY2U7XG5cbnZhciBjb25jYXQgPSBhcnIuY29uY2F0O1xuXG52YXIgcHVzaCA9IGFyci5wdXNoO1xuXG52YXIgaW5kZXhPZiA9IGFyci5pbmRleE9mO1xuXG52YXIgY2xhc3MydHlwZSA9IHt9O1xuXG52YXIgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nO1xuXG52YXIgaGFzT3duID0gY2xhc3MydHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIHN1cHBvcnQgPSB7fTtcblxuXG5cbnZhclxuXHQvLyBVc2UgdGhlIGNvcnJlY3QgZG9jdW1lbnQgYWNjb3JkaW5nbHkgd2l0aCB3aW5kb3cgYXJndW1lbnQgKHNhbmRib3gpXG5cdGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50LFxuXG5cdHZlcnNpb24gPSBcIjIuMS4xXCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMVxuXHQvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1Bcblx0cnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csXG5cblx0Ly8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXG5cdHJtc1ByZWZpeCA9IC9eLW1zLS8sXG5cdHJkYXNoQWxwaGEgPSAvLShbXFxkYS16XSkvZ2ksXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBTdGFydCB3aXRoIGFuIGVtcHR5IHNlbGVjdG9yXG5cdHNlbGVjdG9yOiBcIlwiLFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblx0XHRyZXR1cm4gbnVtICE9IG51bGwgP1xuXG5cdFx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0XHQoIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF0gKSA6XG5cblx0XHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRcdHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBUYWtlIGFuIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBwdXNoIGl0IG9udG8gdGhlIHN0YWNrXG5cdC8vIChyZXR1cm5pbmcgdGhlIG5ldyBtYXRjaGVkIGVsZW1lbnQgc2V0KVxuXHRwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblxuXHRcdC8vIEJ1aWxkIGEgbmV3IGpRdWVyeSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5cdFx0dmFyIHJldCA9IGpRdWVyeS5tZXJnZSggdGhpcy5jb25zdHJ1Y3RvcigpLCBlbGVtcyApO1xuXG5cdFx0Ly8gQWRkIHRoZSBvbGQgb2JqZWN0IG9udG8gdGhlIHN0YWNrIChhcyBhIHJlZmVyZW5jZSlcblx0XHRyZXQucHJldk9iamVjdCA9IHRoaXM7XG5cdFx0cmV0LmNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cblx0XHQvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Ly8gRXhlY3V0ZSBhIGNhbGxiYWNrIGZvciBldmVyeSBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldC5cblx0Ly8gKFlvdSBjYW4gc2VlZCB0aGUgYXJndW1lbnRzIHdpdGggYW4gYXJyYXkgb2YgYXJncywgYnV0IHRoaXMgaXNcblx0Ly8gb25seSB1c2VkIGludGVybmFsbHkuKVxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjaywgYXJncyApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCh0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSkpO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbal0gXSA6IFtdICk7XG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IobnVsbCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbih0YXJnZXQpICkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Ly8gZXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG5cdGlmICggaSA9PT0gbGVuZ3RoICkge1xuXHRcdHRhcmdldCA9IHRoaXM7XG5cdFx0aS0tO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAoIHRhcmdldCA9PT0gY29weSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KGNvcHkpKSApICkge1xuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHQvLyBTZWUgdGVzdC91bml0L2NvcmUuanMgZm9yIGRldGFpbHMgY29uY2VybmluZyBpc0Z1bmN0aW9uLlxuXHQvLyBTaW5jZSB2ZXJzaW9uIDEuMywgRE9NIG1ldGhvZHMgYW5kIGZ1bmN0aW9ucyBsaWtlIGFsZXJ0XG5cdC8vIGFyZW4ndCBzdXBwb3J0ZWQuIFRoZXkgcmV0dXJuIGZhbHNlIG9uIElFICgjMjk2OCkuXG5cdGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChudWxsfHRydWV8ZmFsc2V8XCJcIilcblx0XHQvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG5cdFx0Ly8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG5cdFx0cmV0dXJuICFqUXVlcnkuaXNBcnJheSggb2JqICkgJiYgb2JqIC0gcGFyc2VGbG9hdCggb2JqICkgPj0gMDtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdC8vIE5vdCBwbGFpbiBvYmplY3RzOlxuXHRcdC8vIC0gQW55IG9iamVjdCBvciB2YWx1ZSB3aG9zZSBpbnRlcm5hbCBbW0NsYXNzXV0gcHJvcGVydHkgaXMgbm90IFwiW29iamVjdCBPYmplY3RdXCJcblx0XHQvLyAtIERPTSBub2Rlc1xuXHRcdC8vIC0gd2luZG93XG5cdFx0aWYgKCBqUXVlcnkudHlwZSggb2JqICkgIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKCBvYmouY29uc3RydWN0b3IgJiZcblx0XHRcdFx0IWhhc093bi5jYWxsKCBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIiApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBmdW5jdGlvbiBoYXNuJ3QgcmV0dXJuZWQgYWxyZWFkeSwgd2UncmUgY29uZmlkZW50IHRoYXRcblx0XHQvLyB8b2JqfCBpcyBhIHBsYWluIG9iamVjdCwgY3JlYXRlZCBieSB7fSBvciBjb25zdHJ1Y3RlZCB3aXRoIG5ldyBPYmplY3Rcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHRpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHZhciBuYW1lO1xuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHR0eXBlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdGlmICggb2JqID09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gb2JqICsgXCJcIjtcblx0XHR9XG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8IDQuMCwgaU9TIDwgNiAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKG9iaikgXSB8fCBcIm9iamVjdFwiIDpcblx0XHRcdHR5cGVvZiBvYmo7XG5cdH0sXG5cblx0Ly8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG5cdFx0dmFyIHNjcmlwdCxcblx0XHRcdGluZGlyZWN0ID0gZXZhbDtcblxuXHRcdGNvZGUgPSBqUXVlcnkudHJpbSggY29kZSApO1xuXG5cdFx0aWYgKCBjb2RlICkge1xuXHRcdFx0Ly8gSWYgdGhlIGNvZGUgaW5jbHVkZXMgYSB2YWxpZCwgcHJvbG9ndWUgcG9zaXRpb25cblx0XHRcdC8vIHN0cmljdCBtb2RlIHByYWdtYSwgZXhlY3V0ZSBjb2RlIGJ5IGluamVjdGluZyBhXG5cdFx0XHQvLyBzY3JpcHQgdGFnIGludG8gdGhlIGRvY3VtZW50LlxuXHRcdFx0aWYgKCBjb2RlLmluZGV4T2YoXCJ1c2Ugc3RyaWN0XCIpID09PSAxICkge1xuXHRcdFx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdC8vIE90aGVyd2lzZSwgYXZvaWQgdGhlIERPTSBub2RlIGNyZWF0aW9uLCBpbnNlcnRpb25cblx0XHRcdC8vIGFuZCByZW1vdmFsIGJ5IHVzaW5nIGFuIGluZGlyZWN0IGdsb2JhbCBldmFsXG5cdFx0XHRcdGluZGlyZWN0KCBjb2RlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0bm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9LFxuXG5cdC8vIGFyZ3MgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0ZWFjaDogZnVuY3Rpb24oIG9iaiwgY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdFx0dmFyIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoLFxuXHRcdFx0aXNBcnJheSA9IGlzQXJyYXlsaWtlKCBvYmogKTtcblxuXHRcdGlmICggYXJncyApIHtcblx0XHRcdGlmICggaXNBcnJheSApIHtcblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjay5hcHBseSggb2JqWyBpIF0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmFwcGx5KCBvYmpbIGkgXSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEEgc3BlY2lhbCwgZmFzdCwgY2FzZSBmb3IgdGhlIG1vc3QgY29tbW9uIHVzZSBvZiBlYWNoXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggaXNBcnJheSApIHtcblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKTtcblxuXHRcdFx0XHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4xXG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlsaWtlKCBPYmplY3QoYXJyKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRpc0FycmF5ID0gaXNBcnJheWxpa2UoIGVsZW1zICksXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCB0cmFuc2xhdGluZyBlYWNoIG9mIHRoZSBpdGVtcyB0byB0aGVpciBuZXcgdmFsdWVzXG5cdFx0aWYgKCBpc0FycmF5ICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSk7XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbmZ1bmN0aW9uIGlzQXJyYXlsaWtlKCBvYmogKSB7XG5cdHZhciBsZW5ndGggPSBvYmoubGVuZ3RoLFxuXHRcdHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cblx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgalF1ZXJ5LmlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIG9iai5ub2RlVHlwZSA9PT0gMSAmJiBsZW5ndGggKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjEuMTAuMTlcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMTMgalF1ZXJ5IEZvdW5kYXRpb24sIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNC0wNC0xOFxuICovXG4oZnVuY3Rpb24oIHdpbmRvdyApIHtcblxudmFyIGksXG5cdHN1cHBvcnQsXG5cdEV4cHIsXG5cdGdldFRleHQsXG5cdGlzWE1MLFxuXHR0b2tlbml6ZSxcblx0Y29tcGlsZSxcblx0c2VsZWN0LFxuXHRvdXRlcm1vc3RDb250ZXh0LFxuXHRzb3J0SW5wdXQsXG5cdGhhc0R1cGxpY2F0ZSxcblxuXHQvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG5cdHNldERvY3VtZW50LFxuXHRkb2N1bWVudCxcblx0ZG9jRWxlbSxcblx0ZG9jdW1lbnRJc0hUTUwsXG5cdHJidWdneVFTQSxcblx0cmJ1Z2d5TWF0Y2hlcyxcblx0bWF0Y2hlcyxcblx0Y29udGFpbnMsXG5cblx0Ly8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuXHRleHBhbmRvID0gXCJzaXp6bGVcIiArIC0obmV3IERhdGUoKSksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBHZW5lcmFsLXB1cnBvc2UgY29uc3RhbnRzXG5cdHN0cnVuZGVmaW5lZCA9IHR5cGVvZiB1bmRlZmluZWQsXG5cdE1BWF9ORUdBVElWRSA9IDEgPDwgMzEsXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGlmIHdlIGNhbid0IHVzZSBhIG5hdGl2ZSBvbmVcblx0aW5kZXhPZiA9IGFyci5pbmRleE9mIHx8IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCB0aGlzW2ldID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBXaGl0ZXNwYWNlIGNoYXJhY3RlcnMgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2Vcblx0d2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zeW50YXgvI2NoYXJhY3RlcnNcblx0Y2hhcmFjdGVyRW5jb2RpbmcgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcXFx4MDAtXFxcXHhhMF0pK1wiLFxuXG5cdC8vIExvb3NlbHkgbW9kZWxlZCBvbiBDU1MgaWRlbnRpZmllciBjaGFyYWN0ZXJzXG5cdC8vIEFuIHVucXVvdGVkIHZhbHVlIHNob3VsZCBiZSBhIENTUyBpZGVudGlmaWVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG5cdC8vIFByb3BlciBzeW50YXg6IGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuXHRpZGVudGlmaWVyID0gY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZSggXCJ3XCIsIFwidyNcIiApLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBPcGVyYXRvciAoY2FwdHVyZSAyKVxuXHRcdFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcblx0XHRcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCIqXFxcXF1cIixcblxuXHRwc2V1ZG9zID0gXCI6KFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIikoPzpcXFxcKChcIiArXG5cdFx0Ly8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcblx0XHQvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcblx0XHRcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcblx0XHQvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcblx0XHRcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG5cdFx0Ly8gMy4gYW55dGhpbmcgZWxzZSAoY2FwdHVyZSAyKVxuXHRcdFwiLipcIiArXG5cdFx0XCIpXFxcXCl8KVwiLFxuXG5cdC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcblx0cnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgKyB3aGl0ZXNwYWNlICsgXCIrJFwiLCBcImdcIiApLFxuXG5cdHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXHRyY29tYmluYXRvcnMgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiooWz4rfl18XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblxuXHRyYXR0cmlidXRlUXVvdGVzID0gbmV3IFJlZ0V4cCggXCI9XCIgKyB3aGl0ZXNwYWNlICsgXCIqKFteXFxcXF0nXFxcIl0qPylcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLCBcImdcIiApLFxuXG5cdHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG5cdHJpZGVudGlmaWVyID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIgKSxcblxuXHRtYXRjaEV4cHIgPSB7XG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIilcIiApLFxuXHRcdFwiQ0xBU1NcIjogbmV3IFJlZ0V4cCggXCJeXFxcXC4oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZSggXCJ3XCIsIFwidypcIiApICsgXCIpXCIgKSxcblx0XHRcIkFUVFJcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBhdHRyaWJ1dGVzICksXG5cdFx0XCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcblx0XHRcImJvb2xcIjogbmV3IFJlZ0V4cCggXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIgKSxcblx0XHQvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcblx0XHQvLyBXZSB1c2UgdGhpcyBmb3IgUE9TIG1hdGNoaW5nIGluIGBzZWxlY3RgXG5cdFx0XCJuZWVkc0NvbnRleHRcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIgKVxuXHR9LFxuXG5cdHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyaGVhZGVyID0gL15oXFxkJC9pLFxuXG5cdHJuYXRpdmUgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFxuXG5cdC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuXHRycXVpY2tFeHByID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sXG5cblx0cnNpYmxpbmcgPSAvWyt+XS8sXG5cdHJlc2NhcGUgPSAvJ3xcXFxcL2csXG5cblx0Ly8gQ1NTIGVzY2FwZXMgaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xuXHRydW5lc2NhcGUgPSBuZXcgUmVnRXhwKCBcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiICsgd2hpdGVzcGFjZSArIFwiP3woXCIgKyB3aGl0ZXNwYWNlICsgXCIpfC4pXCIsIFwiaWdcIiApLFxuXHRmdW5lc2NhcGUgPSBmdW5jdGlvbiggXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UgKSB7XG5cdFx0dmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGVkIC0gMHgxMDAwMDtcblx0XHQvLyBOYU4gbWVhbnMgbm9uLWNvZGVwb2ludFxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjRcblx0XHQvLyBXb3JrYXJvdW5kIGVycm9uZW91cyBudW1lcmljIGludGVycHJldGF0aW9uIG9mICtcIjB4XCJcblx0XHRyZXR1cm4gaGlnaCAhPT0gaGlnaCB8fCBlc2NhcGVkV2hpdGVzcGFjZSA/XG5cdFx0XHRlc2NhcGVkIDpcblx0XHRcdGhpZ2ggPCAwID9cblx0XHRcdFx0Ly8gQk1QIGNvZGVwb2ludFxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcblx0XHRcdFx0Ly8gU3VwcGxlbWVudGFsIFBsYW5lIGNvZGVwb2ludCAoc3Vycm9nYXRlIHBhaXIpXG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCApO1xuXHR9O1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxudHJ5IHtcblx0cHVzaC5hcHBseShcblx0XHQoYXJyID0gc2xpY2UuY2FsbCggcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMgKSksXG5cdFx0cHJlZmVycmVkRG9jLmNoaWxkTm9kZXNcblx0KTtcblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0Ly8gRGV0ZWN0IHNpbGVudGx5IGZhaWxpbmcgcHVzaC5hcHBseVxuXHRhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xufSBjYXRjaCAoIGUgKSB7XG5cdHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cblxuXHRcdC8vIExldmVyYWdlIHNsaWNlIGlmIHBvc3NpYmxlXG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0cHVzaF9uYXRpdmUuYXBwbHkoIHRhcmdldCwgc2xpY2UuY2FsbChlbHMpICk7XG5cdFx0fSA6XG5cblx0XHQvLyBTdXBwb3J0OiBJRTw5XG5cdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZCBkaXJlY3RseVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHZhciBqID0gdGFyZ2V0Lmxlbmd0aCxcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHQvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcblx0XHRcdHdoaWxlICggKHRhcmdldFtqKytdID0gZWxzW2krK10pICkge31cblx0XHRcdHRhcmdldC5sZW5ndGggPSBqIC0gMTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBtYXRjaCwgZWxlbSwgbSwgbm9kZVR5cGUsXG5cdFx0Ly8gUVNBIHZhcnNcblx0XHRpLCBncm91cHMsIG9sZCwgbmlkLCBuZXdDb250ZXh0LCBuZXdTZWxlY3RvcjtcblxuXHRpZiAoICggY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblxuXHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0aWYgKCAhc2VsZWN0b3IgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0aWYgKCAobm9kZVR5cGUgPSBjb250ZXh0Lm5vZGVUeXBlKSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRpZiAoIGRvY3VtZW50SXNIVE1MICYmICFzZWVkICkge1xuXG5cdFx0Ly8gU2hvcnRjdXRzXG5cdFx0aWYgKCAobWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICkpICkge1xuXHRcdFx0Ly8gU3BlZWQtdXA6IFNpenpsZShcIiNJRFwiKVxuXHRcdFx0aWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApO1xuXHRcdFx0XHRcdC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG5cdFx0XHRcdFx0Ly8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAoalF1ZXJ5ICM2OTYzKVxuXHRcdFx0XHRcdGlmICggZWxlbSAmJiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUsIE9wZXJhLCBhbmQgV2Via2l0IHJldHVybiBpdGVtc1xuXHRcdFx0XHRcdFx0Ly8gYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIENvbnRleHQgaXMgbm90IGEgZG9jdW1lbnRcblx0XHRcdFx0XHRpZiAoIGNvbnRleHQub3duZXJEb2N1bWVudCAmJiAoZWxlbSA9IGNvbnRleHQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbSApKSAmJlxuXHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJiBlbGVtLmlkID09PSBtICkge1xuXHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gU3BlZWQtdXA6IFNpenpsZShcIlRBR1wiKVxuXHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIuQ0xBU1NcIilcblx0XHRcdH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFFTQSBwYXRoXG5cdFx0aWYgKCBzdXBwb3J0LnFzYSAmJiAoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xuXHRcdFx0bmlkID0gb2xkID0gZXhwYW5kbztcblx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0bmV3U2VsZWN0b3IgPSBub2RlVHlwZSA9PT0gOSAmJiBzZWxlY3RvcjtcblxuXHRcdFx0Ly8gcVNBIHdvcmtzIHN0cmFuZ2VseSBvbiBFbGVtZW50LXJvb3RlZCBxdWVyaWVzXG5cdFx0XHQvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XG5cdFx0XHQvLyBhbmQgd29ya2luZyB1cCBmcm9tIHRoZXJlIChUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhlIHRlY2huaXF1ZSlcblx0XHRcdC8vIElFIDggZG9lc24ndCB3b3JrIG9uIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gMSAmJiBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRcdGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXG5cdFx0XHRcdGlmICggKG9sZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKFwiaWRcIikpICkge1xuXHRcdFx0XHRcdG5pZCA9IG9sZC5yZXBsYWNlKCByZXNjYXBlLCBcIlxcXFwkJlwiICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgbmlkICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bmlkID0gXCJbaWQ9J1wiICsgbmlkICsgXCInXSBcIjtcblxuXHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0Z3JvdXBzW2ldID0gbmlkICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHQ7XG5cdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oXCIsXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG5ld1NlbGVjdG9yICkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9IGNhdGNoKHFzYUVycm9yKSB7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0aWYgKCAhb2xkICkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge0Z1bmN0aW9uKHN0cmluZywgT2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBkaXYgYW5kIGV4cGVjdHMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBkaXYgKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGRpdi5wYXJlbnROb2RlICkge1xuXHRcdFx0ZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXHRcdH1cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGRpdiA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdEV4cHIuYXR0ckhhbmRsZVsgYXJyW2ldIF0gPSBoYW5kbGVyO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG5cdHZhciBjdXIgPSBiICYmIGEsXG5cdFx0ZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdCggfmIuc291cmNlSW5kZXggfHwgTUFYX05FR0FUSVZFICkgLVxuXHRcdFx0KCB+YS5zb3VyY2VJbmRleCB8fCBNQVhfTkVHQVRJVkUgKTtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdHZhciBqLFxuXHRcdFx0XHRtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuXHRcdFx0XHRpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCBzZWVkWyAoaiA9IG1hdGNoSW5kZXhlc1tpXSkgXSApIHtcblx0XHRcdFx0XHRzZWVkW2pdID0gIShtYXRjaGVzW2pdID0gc2VlZFtqXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IHN0cnVuZGVmaW5lZCAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3Rcblx0Ly8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG5cdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuXHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYyxcblx0XHRwYXJlbnQgPSBkb2MuZGVmYXVsdFZpZXc7XG5cblx0Ly8gSWYgbm8gZG9jdW1lbnQgYW5kIGRvY3VtZW50RWxlbWVudCBpcyBhdmFpbGFibGUsIHJldHVyblxuXHRpZiAoIGRvYyA9PT0gZG9jdW1lbnQgfHwgZG9jLm5vZGVUeXBlICE9PSA5IHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50ICkge1xuXHRcdHJldHVybiBkb2N1bWVudDtcblx0fVxuXG5cdC8vIFNldCBvdXIgZG9jdW1lbnRcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5cdC8vIFN1cHBvcnQgdGVzdHNcblx0ZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvYyApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPjhcblx0Ly8gSWYgaWZyYW1lIGRvY3VtZW50IGlzIGFzc2lnbmVkIHRvIFwiZG9jdW1lbnRcIiB2YXJpYWJsZSBhbmQgaWYgaWZyYW1lIGhhcyBiZWVuIHJlbG9hZGVkLFxuXHQvLyBJRSB3aWxsIHRocm93IFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIGFjY2Vzc2luZyBcImRvY3VtZW50XCIgdmFyaWFibGUsIHNlZSBqUXVlcnkgIzEzOTM2XG5cdC8vIElFNi04IGRvIG5vdCBzdXBwb3J0IHRoZSBkZWZhdWx0VmlldyBwcm9wZXJ0eSBzbyBwYXJlbnQgd2lsbCBiZSB1bmRlZmluZWRcblx0aWYgKCBwYXJlbnQgJiYgcGFyZW50ICE9PSBwYXJlbnQudG9wICkge1xuXHRcdC8vIElFMTEgZG9lcyBub3QgaGF2ZSBhdHRhY2hFdmVudCwgc28gYWxsIG11c3Qgc3VmZmVyXG5cdFx0aWYgKCBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2V0RG9jdW1lbnQoKTtcblx0XHRcdH0sIGZhbHNlICk7XG5cdFx0fSBlbHNlIGlmICggcGFyZW50LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0cGFyZW50LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZXREb2N1bWVudCgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXMgKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWRpdi5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG5cdH0pO1xuXG5cdC8qIGdldEVsZW1lbnQocylCeSpcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdGRpdi5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcblx0XHRyZXR1cm4gIWRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIGNhbiBiZSB0cnVzdGVkXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSAmJiBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdhJz48L2Rpdj48ZGl2IGNsYXNzPSdhIGknPjwvZGl2PlwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogU2FmYXJpPDRcblx0XHQvLyBDYXRjaCBjbGFzcyBvdmVyLWNhY2hpbmdcblx0XHRkaXYuZmlyc3RDaGlsZC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHQvLyBTdXBwb3J0OiBPcGVyYTwxMFxuXHRcdC8vIENhdGNoIGdFQkNOIGZhaWx1cmUgdG8gZmluZCBub24tbGVhZGluZyBjbGFzc2VzXG5cdFx0cmV0dXJuIGRpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaVwiKS5sZW5ndGggPT09IDI7XG5cdH0pO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtYXRpY2FsbHktc2V0IG5hbWVzLFxuXHQvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3Rcblx0c3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZGl2ICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jLmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2MuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIElEIGZpbmQgYW5kIGZpbHRlclxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IHN0cnVuZGVmaW5lZCAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIG0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXHRcdFx0XHQvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xuXHRcdFx0XHQvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICM2OTYzXG5cdFx0XHRcdHJldHVybiBtICYmIG0ucGFyZW50Tm9kZSA/IFsgbSBdIDogW107XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0Ly8gU3VwcG9ydDogSUU2Lzdcblx0XHQvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgcmVsaWFibGUgYXMgYSBmaW5kIHNob3J0Y3V0XG5cdFx0ZGVsZXRlIEV4cHIuZmluZFtcIklEXCJdO1xuXG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9ICBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBzdHJ1bmRlZmluZWQgJiYgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG5cdFx0XHRcdHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0fVxuXG5cdC8vIFRhZ1xuXHRFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuXHRcdFx0aWYgKCB0YWcgPT09IFwiKlwiICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHR0bXAucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0bXA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9O1xuXG5cdC8vIENsYXNzXG5cdEV4cHIuZmluZFtcIkNMQVNTXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICE9PSBzdHJ1bmRlZmluZWQgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvYy5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcblx0XHRcdC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2Vcblx0XHRcdC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuXHRcdFx0Ly8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG5cdFx0XHQvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuXHRcdFx0Ly8gaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBcIjxzZWxlY3QgbXNhbGxvd2NsaXA9Jyc+PG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuXHRcdFx0aWYgKCBkaXYucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2xpcF49JyddXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCI6Y2hlY2tlZFwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRcdFx0Ly8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG5cdFx0XHQvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcblx0XHRcdHZhciBpbnB1dCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFkaXYucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBkaXYsIFwiZGl2XCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBkaXYsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgZG9lcyBub3QgaW1wbGVtZW50IGluY2x1c2l2ZSBkZXNjZW5kZW50XG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkpO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHRpZiAoIGEgPT09IGRvYyB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGIgPT09IGRvYyB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBhICkgLSBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcblx0fSA6XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXVwID0gYS5wYXJlbnROb2RlLFxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxuXHRcdFx0YXAgPSBbIGEgXSxcblx0XHRcdGJwID0gWyBiIF07XG5cblx0XHQvLyBQYXJlbnRsZXNzIG5vZGVzIGFyZSBlaXRoZXIgZG9jdW1lbnRzIG9yIGRpc2Nvbm5lY3RlZFxuXHRcdGlmICggIWF1cCB8fCAhYnVwICkge1xuXHRcdFx0cmV0dXJuIGEgPT09IGRvYyA/IC0xIDpcblx0XHRcdFx0YiA9PT0gZG9jID8gMSA6XG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZi5jYWxsKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHQvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuXHRcdH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG5cdFx0Y3VyID0gYTtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRhcC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cdFx0Y3VyID0gYjtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRicC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cblx0XHQvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuXHRcdHdoaWxlICggYXBbaV0gPT09IGJwW2ldICkge1xuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdHJldHVybiBpID9cblx0XHRcdC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuXHRcdFx0c2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuXHRcdFx0YXBbaV0gPT09IHByZWZlcnJlZERvYyA/IC0xIDpcblx0XHRcdGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcblx0XHRcdDA7XG5cdH07XG5cblx0cmV0dXJuIGRvYztcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHQvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcblx0ZXhwciA9IGV4cHIucmVwbGFjZSggcmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIiApO1xuXG5cdGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHQoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG5cdFx0KCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuXHRcdFx0Ly8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuXHRcdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG5cdFx0XHRcdFx0Ly8gZnJhZ21lbnQgaW4gSUUgOVxuXHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaChlKSB7fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0ICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHR2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xuICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXG4gKi9cbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbm9kZSxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGkgPSAwLFxuXHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRpZiAoICFub2RlVHlwZSApIHtcblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKG5vZGUgPSBlbGVtW2krK10pICkge1xuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRyZXQgKz0gZ2V0VGV4dCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHR9XG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxuXHRcdFx0bWF0Y2hbM10gPSAoIG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzJdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWzNdID0gXCIgXCIgKyBtYXRjaFszXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzFdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cdFx0XHRcdC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XG5cdFx0XHRcdGlmICggIW1hdGNoWzNdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWzVdID0gKyggKCBtYXRjaFs3XSArIG1hdGNoWzhdICkgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKTtcblxuXHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdHZhciBleGNlc3MsXG5cdFx0XHRcdHVucXVvdGVkID0gIW1hdGNoWzZdICYmIG1hdGNoWzJdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0bWF0Y2hbMl0gPSBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cdFx0XHRcdC8vIEdldCBleGNlc3MgZnJvbSB0b2tlbml6ZSAocmVjdXJzaXZlbHkpXG5cdFx0XHRcdChleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSkgJiZcblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGgpICkge1xuXG5cdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG5cdFx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsyXSA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIG9ubHkgY2FwdHVyZXMgbmVlZGVkIGJ5IHRoZSBwc2V1ZG8gZmlsdGVyIG1ldGhvZCAodHlwZSBhbmQgYXJndW1lbnQpXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyOiB7XG5cblx0XHRcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcblx0XHRcdHZhciBub2RlTmFtZSA9IG5vZGVOYW1lU2VsZWN0b3IucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5vZGVOYW1lU2VsZWN0b3IgPT09IFwiKlwiID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQocGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkpICYmXG5cdFx0XHRcdGNsYXNzQ2FjaGUoIGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdCggdHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gc3RydW5kZWZpbmVkICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIiApO1xuXHRcdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0ICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIGRpZmYsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9IG5vZGVbIGRpciBdKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID8gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDogbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gcGFyZW50WyBleHBhbmRvIF0gfHwgKHBhcmVudFsgZXhwYW5kbyBdID0ge30pO1xuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IG91dGVyQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbMF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbMV07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBjYWNoZVswXSA9PT0gZGlycnVucyAmJiBjYWNoZVsyXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB1c2VDYWNoZSAmJiAoY2FjaGUgPSAoZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSkpWyB0eXBlIF0pICYmIGNhY2hlWzBdID09PSBkaXJydW5zICkge1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gY2FjaGVbMV07XG5cblx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLikgb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgPyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOiBub2RlLm5vZGVUeXBlID09PSAxICkgJiYgKytkaWZmICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0KG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pKVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZi5jYWxsKCBzZWVkLCBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkW2ldICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cdFx0Ly8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG5cdFx0XCJub3RcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG5cdFx0XHQvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuXHRcdFx0Ly8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG5cdFx0XHR2YXIgaW5wdXQgPSBbXSxcblx0XHRcdFx0cmVzdWx0cyA9IFtdLFxuXHRcdFx0XHRtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cblx0XHRcdHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuXHRcdFx0XHRtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSB1bm1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRzZWVkW2ldID0gIShtYXRjaGVzW2ldID0gZWxlbSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG5cdFx0Ly8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcblx0XHQvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxuXHRcdC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG5cdFx0Ly8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXG5cdFx0Ly8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cblx0XHRcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcblx0XHRcdC8vIGxhbmcgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcblx0XHRcdGlmICggIXJpZGVudGlmaWVyLnRlc3QobGFuZyB8fCBcIlwiKSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIGxhbmc6IFwiICsgbGFuZyApO1xuXHRcdFx0fVxuXHRcdFx0bGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgZWxlbUxhbmc7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtTGFuZyA9IGRvY3VtZW50SXNIVE1MID9cblx0XHRcdFx0XHRcdGVsZW0ubGFuZyA6XG5cdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZShcInhtbDpsYW5nXCIpIHx8IGVsZW0uZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSkgKSB7XG5cblx0XHRcdFx0XHRcdGVsZW1MYW5nID0gZWxlbUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKCBsYW5nICsgXCItXCIgKSA9PT0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKCAoZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSkgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gTWlzY2VsbGFuZW91c1xuXHRcdFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cdFx0XHRyZXR1cm4gaGFzaCAmJiBoYXNoLnNsaWNlKCAxICkgPT09IGVsZW0uaWQ7XG5cdFx0fSxcblxuXHRcdFwicm9vdFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2NFbGVtO1xuXHRcdH0sXG5cblx0XHRcImZvY3VzXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4KTtcblx0XHR9LFxuXG5cdFx0Ly8gQm9vbGVhbiBwcm9wZXJ0aWVzXG5cdFx0XCJlbmFibGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlO1xuXHRcdH0sXG5cblx0XHRcImRpc2FibGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XG5cdFx0fSxcblxuXHRcdFwic2VsZWN0ZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XG5cdFx0XHQvLyBvcHRpb25zIGluIFNhZmFyaSB3b3JrIHByb3Blcmx5XG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBDb250ZW50c1xuXHRcdFwiZW1wdHlcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xuXHRcdFx0Ly8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxuXHRcdFx0Ly8gICBidXQgbm90IGJ5IG90aGVycyAoY29tbWVudDogODsgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbjogNzsgZXRjLilcblx0XHRcdC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdFwicGFyZW50XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbXCJlbXB0eVwiXSggZWxlbSApO1xuXHRcdH0sXG5cblx0XHQvLyBFbGVtZW50L2lucHV0IHR5cGVzXG5cdFx0XCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmhlYWRlci50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiaW5wdXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmlucHV0cy50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiYnV0dG9uXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xuXHRcdH0sXG5cblx0XHRcInRleHRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgYXR0cjtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiAmJlxuXHRcdFx0XHRlbGVtLnR5cGUgPT09IFwidGV4dFwiICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUU8OFxuXHRcdFx0XHQvLyBOZXcgSFRNTDUgYXR0cmlidXRlIHZhbHVlcyAoZS5nLiwgXCJzZWFyY2hcIikgYXBwZWFyIHdpdGggZWxlbS50eXBlID09PSBcInRleHRcIlxuXHRcdFx0XHQoIChhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKSA9PSBudWxsIHx8IGF0dHIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0ZXh0XCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUG9zaXRpb24taW4tY29sbGVjdGlvblxuXHRcdFwiZmlyc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIDAgXTtcblx0XHR9KSxcblxuXHRcdFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHJldHVybiBbIGxlbmd0aCAtIDEgXTtcblx0XHR9KSxcblxuXHRcdFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0cmV0dXJuIFsgYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJldmVuXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDE7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImx0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgLS1pID49IDA7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwiZ3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyArK2kgPCBsZW5ndGg7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KVxuXHR9XG59O1xuXG5FeHByLnBzZXVkb3NbXCJudGhcIl0gPSBFeHByLnBzZXVkb3NbXCJlcVwiXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbmZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XG59XG5mb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCByZXNldDogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyggaSApO1xufVxuXG4vLyBFYXN5IEFQSSBmb3IgY3JlYXRpbmcgbmV3IHNldEZpbHRlcnNcbmZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxuc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XG5FeHByLnNldEZpbHRlcnMgPSBuZXcgc2V0RmlsdGVycygpO1xuXG50b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuXHR2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcblx0XHRzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoIGNhY2hlZCApIHtcblx0XHRyZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuXHR9XG5cblx0c29GYXIgPSBzZWxlY3Rvcjtcblx0Z3JvdXBzID0gW107XG5cdHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuXHR3aGlsZSAoIHNvRmFyICkge1xuXG5cdFx0Ly8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuXHRcdGlmICggIW1hdGNoZWQgfHwgKG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0aWYgKCBtYXRjaCApIHtcblx0XHRcdFx0Ly8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICkgfHwgc29GYXI7XG5cdFx0XHR9XG5cdFx0XHRncm91cHMucHVzaCggKHRva2VucyA9IFtdKSApO1xuXHRcdH1cblxuXHRcdG1hdGNoZWQgPSBmYWxzZTtcblxuXHRcdC8vIENvbWJpbmF0b3JzXG5cdFx0aWYgKCAobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxuXHRcdFx0XHR0eXBlOiBtYXRjaFswXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuXHRcdFx0fSk7XG5cdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZpbHRlcnNcblx0XHRmb3IgKCB0eXBlIGluIEV4cHIuZmlsdGVyICkge1xuXHRcdFx0aWYgKCAobWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApKSAmJiAoIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxuXHRcdFx0XHQobWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkpKSApIHtcblx0XHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdG1hdGNoZXM6IG1hdGNoXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIW1hdGNoZWQgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3Ncblx0Ly8gaWYgd2UncmUganVzdCBwYXJzaW5nXG5cdC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuXHRyZXR1cm4gcGFyc2VPbmx5ID9cblx0XHRzb0Zhci5sZW5ndGggOlxuXHRcdHNvRmFyID9cblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG5cdFx0XHQvLyBDYWNoZSB0aGUgdG9rZW5zXG5cdFx0XHR0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0c2VsZWN0b3IgPSBcIlwiO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRzZWxlY3RvciArPSB0b2tlbnNbaV0udmFsdWU7XG5cdH1cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBhZGRDb21iaW5hdG9yKCBtYXRjaGVyLCBjb21iaW5hdG9yLCBiYXNlICkge1xuXHR2YXIgZGlyID0gY29tYmluYXRvci5kaXIsXG5cdFx0Y2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYgZGlyID09PSBcInBhcmVudE5vZGVcIixcblx0XHRkb25lTmFtZSA9IGRvbmUrKztcblxuXHRyZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBjbG9zZXN0IGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBvbGRDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGRpciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KTtcblx0XHRcdFx0XHRcdGlmICggKG9sZENhY2hlID0gb3V0ZXJDYWNoZVsgZGlyIF0pICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChuZXdDYWNoZVsgMiBdID0gb2xkQ2FjaGVbIDIgXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGVbIGRpciBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG5cdHJldHVybiBtYXRjaGVycy5sZW5ndGggPiAxID9cblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAhbWF0Y2hlcnNbaV0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbMF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbaV0sIHJlc3VsdHMgKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcblx0dmFyIGVsZW0sXG5cdFx0bmV3VW5tYXRjaGVkID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcblx0XHRtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cblx0XHRcdC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuXHRcdFx0bWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0ZWxlbXMsXG5cblx0XHRcdG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcblx0XHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIChtYXRjaGVyT3V0ID0gW10pLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICYmXG5cdFx0XHRcdFx0XHQodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mLmNhbGwoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFtpXSkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFt0ZW1wXSA9ICEocmVzdWx0c1t0ZW1wXSA9IGVsZW0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuXHR2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0bGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbXCIgXCJdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0cmV0dXJuICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbaV0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbaV0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1tqXS50eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNldE1hdGNoZXIoXG5cdFx0XHRcdFx0aSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG5cdFx0XHRcdFx0aSA+IDEgJiYgdG9TZWxlY3Rvcihcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG5cdFx0XHRcdFx0XHR0b2tlbnMuc2xpY2UoIDAsIGkgLSAxICkuY29uY2F0KHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9KVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKHRva2VucyA9IHRva2Vucy5zbGljZSggaiApKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcblx0dmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG5cdFx0XHR2YXIgZWxlbSwgaiwgbWF0Y2hlcixcblx0XHRcdFx0bWF0Y2hlZENvdW50ID0gMCxcblx0XHRcdFx0aSA9IFwiMFwiLFxuXHRcdFx0XHR1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuXHRcdFx0XHRzZXRNYXRjaGVkID0gW10sXG5cdFx0XHRcdGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kW1wiVEFHXCJdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cdFx0XHRcdC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG5cdFx0XHRcdGRpcnJ1bnNVbmlxdWUgPSAoZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEpLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCAhPT0gZG9jdW1lbnQgJiYgY29udGV4dDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcblx0XHRcdC8vIEtlZXAgYGlgIGEgc3RyaW5nIGlmIHRoZXJlIGFyZSBubyBlbGVtZW50cyBzbyBgbWF0Y2hlZENvdW50YCB3aWxsIGJlIFwiMDBcIiBiZWxvd1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmIChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcblx0XHRcdFx0aWYgKCBieVNldCApIHtcblx0XHRcdFx0XHQvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0pICkge1xuXHRcdFx0XHRcdFx0bWF0Y2hlZENvdW50LS07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuXHRcdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHRcdHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cdFx0XHRpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBzZXRNYXRjaGVyc1tqKytdKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhKHVubWF0Y2hlZFtpXSB8fCBzZXRNYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRNYXRjaGVkW2ldID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG5cdFx0XHRcdFx0c2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuXHRcdFx0XHQvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcblx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cblx0XHRcdFx0XHRTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVubWF0Y2hlZDtcblx0XHR9O1xuXG5cdHJldHVybiBieVNldCA/XG5cdFx0bWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG5cdFx0c3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1hdGNoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHR2YXIgaSxcblx0XHRzZXRNYXRjaGVycyA9IFtdLFxuXHRcdGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoICFjYWNoZWQgKSB7XG5cdFx0Ly8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG5cdFx0aWYgKCAhbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdH1cblx0XHRpID0gbWF0Y2gubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0Y2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoIG1hdGNoW2ldICk7XG5cdFx0XHRpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlKCBzZWxlY3RvciwgbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkgKTtcblxuXHRcdC8vIFNhdmUgc2VsZWN0b3IgYW5kIHRva2VuaXphdGlvblxuXHRcdGNhY2hlZC5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHR9XG5cdHJldHVybiBjYWNoZWQ7XG59O1xuXG4vKipcbiAqIEEgbG93LWxldmVsIHNlbGVjdGlvbiBmdW5jdGlvbiB0aGF0IHdvcmtzIHdpdGggU2l6emxlJ3MgY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzZWxlY3RvciBBIHNlbGVjdG9yIG9yIGEgcHJlLWNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb24gYnVpbHQgd2l0aCBTaXp6bGUuY29tcGlsZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZXh0XG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0c11cbiAqIEBwYXJhbSB7QXJyYXl9IFtzZWVkXSBBIHNldCBvZiBlbGVtZW50cyB0byBtYXRjaCBhZ2FpbnN0XG4gKi9cbnNlbGVjdCA9IFNpenpsZS5zZWxlY3QgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBpLCB0b2tlbnMsIHRva2VuLCB0eXBlLCBmaW5kLFxuXHRcdGNvbXBpbGVkID0gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgc2VsZWN0b3IsXG5cdFx0bWF0Y2ggPSAhc2VlZCAmJiB0b2tlbml6ZSggKHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IpICk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgbm8gc2VlZCBhbmQgb25seSBvbmUgZ3JvdXBcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBUYWtlIGEgc2hvcnRjdXQgYW5kIHNldCB0aGUgY29udGV4dCBpZiB0aGUgcm9vdCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICh0b2tlbiA9IHRva2Vuc1swXSkudHlwZSA9PT0gXCJJRFwiICYmXG5cdFx0XHRcdHN1cHBvcnQuZ2V0QnlJZCAmJiBjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0XHRcdEV4cHIucmVsYXRpdmVbIHRva2Vuc1sxXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFtcIklEXCJdKCB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLCBjb250ZXh0ICkgfHwgW10gKVswXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbaV07XG5cblx0XHRcdC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3Jcblx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgKHR5cGUgPSB0b2tlbi50eXBlKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xuXHRcdFx0XHRpZiAoIChzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG5cdFx0XHRcdFx0cnNpYmxpbmcudGVzdCggdG9rZW5zWzBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHRcdFx0XHQpKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdChcIlwiKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKFwiXCIpID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWU8MTRcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYxICkge1xuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGRpdjEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKSAmIDE7XG59KTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRkaXYuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIiA7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRkaXYuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZGl2LmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydChmdW5jdGlvbiggZGl2ICkge1xuXHRyZXR1cm4gZGl2LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09IG51bGw7XG59KSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9KTtcbn1cblxucmV0dXJuIFNpenpsZTtcblxufSkoIHdpbmRvdyApO1xuXG5cblxualF1ZXJ5LmZpbmQgPSBTaXp6bGU7XG5qUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XG5qUXVlcnkuZXhwcltcIjpcIl0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcblxuXG5cbnZhciBybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0O1xuXG52YXIgcnNpbmdsZVRhZyA9ICgvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8pO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdC8qIGpzaGludCAtVzAxOCAqL1xuXHRcdFx0cmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuXHRcdH0pO1xuXG5cdH1cblxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSk7XG5cblx0fVxuXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0XHR9XG5cblx0XHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID49IDAgKSAhPT0gbm90O1xuXHR9KTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdHJldHVybiBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSA/XG5cdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdIDpcblx0XHRqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdFx0fSkpO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCBzZWxmWyBpIF0sIHRoaXMgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkgKTtcblx0XHR9XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdC8vIE5lZWRlZCBiZWNhdXNlICQoIHNlbGVjdG9yLCBjb250ZXh0ICkgYmVjb21lcyAkKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKVxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZSggcmV0ICkgOiByZXQgKTtcblx0XHRyZXQuc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3RvciArIFwiIFwiICsgc2VsZWN0b3IgOiBzZWxlY3Rvcjtcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UpICk7XG5cdH0sXG5cdG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0pO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKikpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclswXSA9PT0gXCI8XCIgJiYgc2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiYgc2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAobWF0Y2hbMV0gfHwgIWNvbnRleHQpICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWzFdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFswXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG5cdFx0XHRcdFx0XHRtYXRjaFsxXSxcblx0XHRcdFx0XHRcdGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG5cdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0KSApO1xuXG5cdFx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuXHRcdFx0XHRcdGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsxXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuXHRcdFx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJCgjaWQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsyXSApO1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgcGFyZW50Tm9kZSB0byBjYXRjaCB3aGVuIEJsYWNrYmVycnkgNC42IHJldHVybnNcblx0XHRcdFx0XHQvLyBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIGRvY3VtZW50ICM2OTYzXG5cdFx0XHRcdFx0aWYgKCBlbGVtICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0XHR0aGlzWzBdID0gZWxlbTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3RqUXVlcnkgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSB0aGlzWzBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiB0eXBlb2Ygcm9vdGpRdWVyeS5yZWFkeSAhPT0gXCJ1bmRlZmluZWRcIiA/XG5cdFx0XHRcdHJvb3RqUXVlcnkucmVhZHkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yLnNlbGVjdG9yICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3Iuc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSBzZWxlY3Rvci5jb250ZXh0O1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cdC8vIG1ldGhvZHMgZ3VhcmFudGVlZCB0byBwcm9kdWNlIGEgdW5pcXVlIHNldCB3aGVuIHN0YXJ0aW5nIGZyb20gYSB1bmlxdWUgc2V0XG5cdGd1YXJhbnRlZWRVbmlxdWUgPSB7XG5cdFx0Y2hpbGRyZW46IHRydWUsXG5cdFx0Y29udGVudHM6IHRydWUsXG5cdFx0bmV4dDogdHJ1ZSxcblx0XHRwcmV2OiB0cnVlXG5cdH07XG5cbmpRdWVyeS5leHRlbmQoe1xuXHRkaXI6IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHRcdHZhciBtYXRjaGVkID0gW10sXG5cdFx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaGVkO1xuXHR9LFxuXG5cdHNpYmxpbmc6IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHRcdHZhciBtYXRjaGVkID0gW107XG5cblx0XHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVkO1xuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzW2ldICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRjbG9zZXN0OiBmdW5jdGlvbiggc2VsZWN0b3JzLCBjb250ZXh0ICkge1xuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdG1hdGNoZWQgPSBbXSxcblx0XHRcdHBvcyA9IHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgfHwgdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3JzLCBjb250ZXh0IHx8IHRoaXMuY29udGV4dCApIDpcblx0XHRcdFx0MDtcblxuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGZvciAoIGN1ciA9IHRoaXNbaV07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAocG9zID9cblx0XHRcdFx0XHRwb3MuaW5kZXgoY3VyKSA+IC0xIDpcblxuXHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKGN1ciwgc2VsZWN0b3JzKSkgKSB7XG5cblx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlKCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpblxuXHQvLyB0aGUgbWF0Y2hlZCBzZXQgb2YgZWxlbWVudHNcblx0aW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuXHRcdH1cblxuXHRcdC8vIGluZGV4IGluIHNlbGVjdG9yXG5cdFx0aWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGpRdWVyeSggZWxlbSApLCB0aGlzWyAwIF0gKTtcblx0XHR9XG5cblx0XHQvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcblx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCB0aGlzLFxuXG5cdFx0XHQvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcblx0XHRcdGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuXHRcdFx0alF1ZXJ5LnVuaXF1ZShcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKHNlbGVjdG9yKVxuXHRcdCk7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoY3VyID0gY3VyW2Rpcl0pICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKHtcblx0cGFyZW50OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG5cdH0sXG5cdHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0c2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuc2libGluZyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG5cdH0sXG5cdGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnNpYmxpbmcoIGVsZW0uZmlyc3RDaGlsZCApO1xuXHR9LFxuXHRjb250ZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0uY29udGVudERvY3VtZW50IHx8IGpRdWVyeS5tZXJnZSggW10sIGVsZW0uY2hpbGROb2RlcyApO1xuXHR9XG59LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcblx0XHR2YXIgbWF0Y2hlZCA9IGpRdWVyeS5tYXAoIHRoaXMsIGZuLCB1bnRpbCApO1xuXG5cdFx0aWYgKCBuYW1lLnNsaWNlKCAtNSApICE9PSBcIlVudGlsXCIgKSB7XG5cdFx0XHRzZWxlY3RvciA9IHVudGlsO1xuXHRcdH1cblxuXHRcdGlmICggc2VsZWN0b3IgJiYgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0bWF0Y2hlZCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBtYXRjaGVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlKCBtYXRjaGVkICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXG5cdFx0XHRpZiAoIHJwYXJlbnRzcHJldi50ZXN0KCBuYW1lICkgKSB7XG5cdFx0XHRcdG1hdGNoZWQucmV2ZXJzZSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZCApO1xuXHR9O1xufSk7XG52YXIgcm5vdHdoaXRlID0gKC9cXFMrL2cpO1xuXG5cblxuLy8gU3RyaW5nIHRvIE9iamVjdCBvcHRpb25zIGZvcm1hdCBjYWNoZVxudmFyIG9wdGlvbnNDYWNoZSA9IHt9O1xuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lcyBhbmQgc3RvcmUgaW4gY2FjaGVcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XG5cdHZhciBvYmplY3QgPSBvcHRpb25zQ2FjaGVbIG9wdGlvbnMgXSA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSk7XG5cdHJldHVybiBvYmplY3Q7XG59XG5cbi8qXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqXG4gKlx0b3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xuICpcdFx0XHR0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XG4gKlxuICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcbiAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQb3NzaWJsZSBvcHRpb25zOlxuICpcbiAqXHRvbmNlOlx0XHRcdHdpbGwgZW5zdXJlIHRoZSBjYWxsYmFjayBsaXN0IGNhbiBvbmx5IGJlIGZpcmVkIG9uY2UgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0bWVtb3J5Olx0XHRcdHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqXHRcdFx0XHRcdGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqXHRcdFx0XHRcdHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHR1bmlxdWU6XHRcdFx0d2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXG4gKlxuICpcdHN0b3BPbkZhbHNlOlx0aW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gKlxuICovXG5qUXVlcnkuQ2FsbGJhY2tzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0Ly8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxuXHQvLyAod2UgY2hlY2sgaW4gY2FjaGUgZmlyc3QpXG5cdG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0KCBvcHRpb25zQ2FjaGVbIG9wdGlvbnMgXSB8fCBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gTGFzdCBmaXJlIHZhbHVlIChmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzKVxuXHRcdG1lbW9yeSxcblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCB3YXMgYWxyZWFkeSBmaXJlZFxuXHRcdGZpcmVkLFxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cdFx0Ly8gRmlyc3QgY2FsbGJhY2sgdG8gZmlyZSAodXNlZCBpbnRlcm5hbGx5IGJ5IGFkZCBhbmQgZmlyZVdpdGgpXG5cdFx0ZmlyaW5nU3RhcnQsXG5cdFx0Ly8gRW5kIG9mIHRoZSBsb29wIHdoZW4gZmlyaW5nXG5cdFx0ZmlyaW5nTGVuZ3RoLFxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IHJlbW92ZSBpZiBuZWVkZWQpXG5cdFx0ZmlyaW5nSW5kZXgsXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cdFx0Ly8gU3RhY2sgb2YgZmlyZSBjYWxscyBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHN0YWNrID0gIW9wdGlvbnMub25jZSAmJiBbXSxcblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbiggZGF0YSApIHtcblx0XHRcdG1lbW9yeSA9IG9wdGlvbnMubWVtb3J5ICYmIGRhdGE7XG5cdFx0XHRmaXJlZCA9IHRydWU7XG5cdFx0XHRmaXJpbmdJbmRleCA9IGZpcmluZ1N0YXJ0IHx8IDA7XG5cdFx0XHRmaXJpbmdTdGFydCA9IDA7XG5cdFx0XHRmaXJpbmdMZW5ndGggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdGZpcmluZyA9IHRydWU7XG5cdFx0XHRmb3IgKCA7IGxpc3QgJiYgZmlyaW5nSW5kZXggPCBmaXJpbmdMZW5ndGg7IGZpcmluZ0luZGV4KysgKSB7XG5cdFx0XHRcdGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggZGF0YVsgMCBdLCBkYXRhWyAxIF0gKSA9PT0gZmFsc2UgJiYgb3B0aW9ucy5zdG9wT25GYWxzZSApIHtcblx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTsgLy8gVG8gcHJldmVudCBmdXJ0aGVyIGNhbGxzIHVzaW5nIGFkZFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0aWYgKCBzdGFjayApIHtcblx0XHRcdFx0XHRpZiAoIHN0YWNrLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdGZpcmUoIHN0YWNrLnNoaWZ0KCkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoIG1lbW9yeSApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2VsZi5kaXNhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG5cdFx0c2VsZiA9IHtcblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHQvLyBGaXJzdCwgd2Ugc2F2ZSB0aGUgY3VycmVudCBsZW5ndGhcblx0XHRcdFx0XHR2YXIgc3RhcnQgPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHQoZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0eXBlID0galF1ZXJ5LnR5cGUoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHQvLyBEbyB3ZSBuZWVkIHRvIGFkZCB0aGUgY2FsbGJhY2tzIHRvIHRoZVxuXHRcdFx0XHRcdC8vIGN1cnJlbnQgZmlyaW5nIGJhdGNoP1xuXHRcdFx0XHRcdGlmICggZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0Ly8gV2l0aCBtZW1vcnksIGlmIHdlJ3JlIG5vdCBmaXJpbmcgdGhlblxuXHRcdFx0XHRcdC8vIHdlIHNob3VsZCBjYWxsIHJpZ2h0IGF3YXlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdTdGFydCA9IHN0YXJ0O1xuXHRcdFx0XHRcdFx0ZmlyZSggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdFx0aWYgKCBmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdMZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaXJpbmdMZW5ndGgtLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cblx0XHRcdC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuXHRcdFx0aGFzOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdHJldHVybiBmbiA/IGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOiAhISggbGlzdCAmJiBsaXN0Lmxlbmd0aCApO1xuXHRcdFx0fSxcblx0XHRcdC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3Rcblx0XHRcdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHRmaXJpbmdMZW5ndGggPSAwO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBIYXZlIHRoZSBsaXN0IGRvIG5vdGhpbmcgYW55bW9yZVxuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxpc3QgPSBzdGFjayA9IG1lbW9yeSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSXMgaXQgZGlzYWJsZWQ/XG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cdFx0XHQvLyBMb2NrIHRoZSBsaXN0IGluIGl0cyBjdXJyZW50IHN0YXRlXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c3RhY2sgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdGlmICggIW1lbW9yeSApIHtcblx0XHRcdFx0XHRzZWxmLmRpc2FibGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBJcyBpdCBsb2NrZWQ/XG5cdFx0XHRsb2NrZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIXN0YWNrO1xuXHRcdFx0fSxcblx0XHRcdC8vIENhbGwgYWxsIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcmd1bWVudHNcblx0XHRcdGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcblx0XHRcdFx0aWYgKCBsaXN0ICYmICggIWZpcmVkIHx8IHN0YWNrICkgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdHN0YWNrLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlyZSggYXJncyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cblxualF1ZXJ5LmV4dGVuZCh7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cdFx0XHRcdC8vIGFjdGlvbiwgYWRkIGxpc3RlbmVyLCBsaXN0ZW5lciBsaXN0LCBmaW5hbCBzdGF0ZVxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlc29sdmVkXCIgXSxcblx0XHRcdFx0WyBcInJlamVjdFwiLCBcImZhaWxcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLCBcInJlamVjdGVkXCIgXSxcblx0XHRcdFx0WyBcIm5vdGlmeVwiLCBcInByb2dyZXNzXCIsIGpRdWVyeS5DYWxsYmFja3MoXCJtZW1vcnlcIikgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0aGVuOiBmdW5jdGlvbiggLyogZm5Eb25lLCBmbkZhaWwsIGZuUHJvZ3Jlc3MgKi8gKSB7XG5cdFx0XHRcdFx0dmFyIGZucyA9IGFyZ3VtZW50cztcblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdFx0XHRcdFx0dmFyIGZuID0galF1ZXJ5LmlzRnVuY3Rpb24oIGZuc1sgaSBdICkgJiYgZm5zWyBpIF07XG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gZm9yIGZvcndhcmRpbmcgYWN0aW9ucyB0byBuZXdEZWZlclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbMV0gXShmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQgPSBmbiAmJiBmbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCAmJiBqUXVlcnkuaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZhaWwoIG5ld0RlZmVyLnJlamVjdCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gcHJvbWlzZSA/IG5ld0RlZmVyLnByb21pc2UoKSA6IHRoaXMsIGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9KS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIEdldCBhIHByb21pc2UgZm9yIHRoaXMgZGVmZXJyZWRcblx0XHRcdFx0Ly8gSWYgb2JqIGlzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSBhc3BlY3QgaXMgYWRkZWQgdG8gdGhlIG9iamVjdFxuXHRcdFx0XHRwcm9taXNlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0XHRcdHJldHVybiBvYmogIT0gbnVsbCA/IGpRdWVyeS5leHRlbmQoIG9iaiwgcHJvbWlzZSApIDogcHJvbWlzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlZmVycmVkID0ge307XG5cblx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0cHJvbWlzZS5waXBlID0gcHJvbWlzZS50aGVuO1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgMyBdO1xuXG5cdFx0XHQvLyBwcm9taXNlWyBkb25lIHwgZmFpbCB8IHByb2dyZXNzIF0gPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbMV0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIHN0YXRlID0gWyByZXNvbHZlZCB8IHJlamVjdGVkIF1cblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlU3RyaW5nO1xuXG5cdFx0XHRcdC8vIFsgcmVqZWN0X2xpc3QgfCByZXNvbHZlX2xpc3QgXS5kaXNhYmxlOyBwcm9ncmVzc19saXN0LmxvY2tcblx0XHRcdFx0fSwgdHVwbGVzWyBpIF4gMSBdWyAyIF0uZGlzYWJsZSwgdHVwbGVzWyAyIF1bIDIgXS5sb2NrICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGRlZmVycmVkWyByZXNvbHZlIHwgcmVqZWN0IHwgbm90aWZ5IF1cblx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gcHJvbWlzZSA6IHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH07XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbMF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9KTtcblxuXHRcdC8vIE1ha2UgdGhlIGRlZmVycmVkIGEgcHJvbWlzZVxuXHRcdHByb21pc2UucHJvbWlzZSggZGVmZXJyZWQgKTtcblxuXHRcdC8vIENhbGwgZ2l2ZW4gZnVuYyBpZiBhbnlcblx0XHRpZiAoIGZ1bmMgKSB7XG5cdFx0XHRmdW5jLmNhbGwoIGRlZmVycmVkLCBkZWZlcnJlZCApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBkb25lIVxuXHRcdHJldHVybiBkZWZlcnJlZDtcblx0fSxcblxuXHQvLyBEZWZlcnJlZCBoZWxwZXJcblx0d2hlbjogZnVuY3Rpb24oIHN1Ym9yZGluYXRlIC8qICwgLi4uLCBzdWJvcmRpbmF0ZU4gKi8gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0cmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXHRcdFx0bGVuZ3RoID0gcmVzb2x2ZVZhbHVlcy5sZW5ndGgsXG5cblx0XHRcdC8vIHRoZSBjb3VudCBvZiB1bmNvbXBsZXRlZCBzdWJvcmRpbmF0ZXNcblx0XHRcdHJlbWFpbmluZyA9IGxlbmd0aCAhPT0gMSB8fCAoIHN1Ym9yZGluYXRlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBzdWJvcmRpbmF0ZS5wcm9taXNlICkgKSA/IGxlbmd0aCA6IDAsXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWQuIElmIHJlc29sdmVWYWx1ZXMgY29uc2lzdCBvZiBvbmx5IGEgc2luZ2xlIERlZmVycmVkLCBqdXN0IHVzZSB0aGF0LlxuXHRcdFx0ZGVmZXJyZWQgPSByZW1haW5pbmcgPT09IDEgPyBzdWJvcmRpbmF0ZSA6IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG5cdFx0XHQvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIGJvdGggcmVzb2x2ZSBhbmQgcHJvZ3Jlc3MgdmFsdWVzXG5cdFx0XHR1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGksIGNvbnRleHRzLCB2YWx1ZXMgKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0Y29udGV4dHNbIGkgXSA9IHRoaXM7XG5cdFx0XHRcdFx0dmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYgKCB2YWx1ZXMgPT09IHByb2dyZXNzVmFsdWVzICkge1xuXHRcdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggY29udGV4dHMsIHZhbHVlcyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cblx0XHRcdHByb2dyZXNzVmFsdWVzLCBwcm9ncmVzc0NvbnRleHRzLCByZXNvbHZlQ29udGV4dHM7XG5cblx0XHQvLyBhZGQgbGlzdGVuZXJzIHRvIERlZmVycmVkIHN1Ym9yZGluYXRlczsgdHJlYXQgb3RoZXJzIGFzIHJlc29sdmVkXG5cdFx0aWYgKCBsZW5ndGggPiAxICkge1xuXHRcdFx0cHJvZ3Jlc3NWYWx1ZXMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0cHJvZ3Jlc3NDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRyZXNvbHZlQ29udGV4dHMgPSBuZXcgQXJyYXkoIGxlbmd0aCApO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXNvbHZlVmFsdWVzWyBpIF0ucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlKClcblx0XHRcdFx0XHRcdC5kb25lKCB1cGRhdGVGdW5jKCBpLCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKSApXG5cdFx0XHRcdFx0XHQuZmFpbCggZGVmZXJyZWQucmVqZWN0IClcblx0XHRcdFx0XHRcdC5wcm9ncmVzcyggdXBkYXRlRnVuYyggaSwgcHJvZ3Jlc3NDb250ZXh0cywgcHJvZ3Jlc3NWYWx1ZXMgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC0tcmVtYWluaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gaWYgd2UncmUgbm90IHdhaXRpbmcgb24gYW55dGhpbmcsIHJlc29sdmUgdGhlIG1hc3RlclxuXHRcdGlmICggIXJlbWFpbmluZyApIHtcblx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXHR9XG59KTtcblxuXG4vLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcbnZhciByZWFkeUxpc3Q7XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblx0Ly8gQWRkIHRoZSBjYWxsYmFja1xuXHRqUXVlcnkucmVhZHkucHJvbWlzZSgpLmRvbmUoIGZuICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0Ly8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cblx0aXNSZWFkeTogZmFsc2UsXG5cblx0Ly8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxuXHQvLyB0aGUgcmVhZHkgZXZlbnQgZmlyZXMuIFNlZSAjNjc4MVxuXHRyZWFkeVdhaXQ6IDEsXG5cblx0Ly8gSG9sZCAob3IgcmVsZWFzZSkgdGhlIHJlYWR5IGV2ZW50XG5cdGhvbGRSZWFkeTogZnVuY3Rpb24oIGhvbGQgKSB7XG5cdFx0aWYgKCBob2xkICkge1xuXHRcdFx0alF1ZXJ5LnJlYWR5V2FpdCsrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkucmVhZHkoIHRydWUgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gSGFuZGxlIHdoZW4gdGhlIERPTSBpcyByZWFkeVxuXHRyZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XG5cblx0XHQvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG5cdFx0aWYgKCB3YWl0ID09PSB0cnVlID8gLS1qUXVlcnkucmVhZHlXYWl0IDogalF1ZXJ5LmlzUmVhZHkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XG5cdFx0alF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG5cdFx0Ly8gSWYgYSBub3JtYWwgRE9NIFJlYWR5IGV2ZW50IGZpcmVkLCBkZWNyZW1lbnQsIGFuZCB3YWl0IGlmIG5lZWQgYmVcblx0XHRpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGVyZSBhcmUgZnVuY3Rpb25zIGJvdW5kLCB0byBleGVjdXRlXG5cdFx0cmVhZHlMaXN0LnJlc29sdmVXaXRoKCBkb2N1bWVudCwgWyBqUXVlcnkgXSApO1xuXG5cdFx0Ly8gVHJpZ2dlciBhbnkgYm91bmQgcmVhZHkgZXZlbnRzXG5cdFx0aWYgKCBqUXVlcnkuZm4udHJpZ2dlckhhbmRsZXIgKSB7XG5cdFx0XHRqUXVlcnkoIGRvY3VtZW50ICkudHJpZ2dlckhhbmRsZXIoIFwicmVhZHlcIiApO1xuXHRcdFx0alF1ZXJ5KCBkb2N1bWVudCApLm9mZiggXCJyZWFkeVwiICk7XG5cdFx0fVxuXHR9XG59KTtcblxuLyoqXG4gKiBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuICovXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQsIGZhbHNlICk7XG5cdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXHRqUXVlcnkucmVhZHkoKTtcbn1cblxualF1ZXJ5LnJlYWR5LnByb21pc2UgPSBmdW5jdGlvbiggb2JqICkge1xuXHRpZiAoICFyZWFkeUxpc3QgKSB7XG5cblx0XHRyZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuXHRcdC8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuXHRcdC8vIHdlIG9uY2UgdHJpZWQgdG8gdXNlIHJlYWR5U3RhdGUgXCJpbnRlcmFjdGl2ZVwiIGhlcmUsIGJ1dCBpdCBjYXVzZWQgaXNzdWVzIGxpa2UgdGhlIG9uZVxuXHRcdC8vIGRpc2NvdmVyZWQgYnkgQ2hyaXNTIGhlcmU6IGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjgyI2NvbW1lbnQ6MTVcblx0XHRpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcblx0XHRcdC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuXHRcdFx0c2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkLCBmYWxzZSApO1xuXG5cdFx0XHQvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQsIGZhbHNlICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZWFkeUxpc3QucHJvbWlzZSggb2JqICk7XG59O1xuXG4vLyBLaWNrIG9mZiB0aGUgRE9NIHJlYWR5IGNoZWNrIGV2ZW4gaWYgdGhlIHVzZXIgZG9lcyBub3RcbmpRdWVyeS5yZWFkeS5wcm9taXNlKCk7XG5cblxuXG5cbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxuLy8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG52YXIgYWNjZXNzID0galF1ZXJ5LmFjY2VzcyA9IGZ1bmN0aW9uKCBlbGVtcywgZm4sIGtleSwgdmFsdWUsIGNoYWluYWJsZSwgZW1wdHlHZXQsIHJhdyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGVsZW1zLmxlbmd0aCxcblx0XHRidWxrID0ga2V5ID09IG51bGw7XG5cblx0Ly8gU2V0cyBtYW55IHZhbHVlc1xuXHRpZiAoIGpRdWVyeS50eXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXHRcdGZvciAoIGkgaW4ga2V5ICkge1xuXHRcdFx0alF1ZXJ5LmFjY2VzcyggZWxlbXMsIGZuLCBpLCBrZXlbaV0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcblx0XHR9XG5cblx0Ly8gU2V0cyBvbmUgdmFsdWVcblx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICggYnVsayApIHtcblx0XHRcdC8vIEJ1bGsgb3BlcmF0aW9ucyBydW4gYWdhaW5zdCB0aGUgZW50aXJlIHNldFxuXHRcdFx0aWYgKCByYXcgKSB7XG5cdFx0XHRcdGZuLmNhbGwoIGVsZW1zLCB2YWx1ZSApO1xuXHRcdFx0XHRmbiA9IG51bGw7XG5cblx0XHRcdC8vIC4uLmV4Y2VwdCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvbiB2YWx1ZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1bGsgPSBmbjtcblx0XHRcdFx0Zm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gYnVsay5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdmFsdWUgKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGZuKCBlbGVtc1tpXSwga2V5LCByYXcgPyB2YWx1ZSA6IHZhbHVlLmNhbGwoIGVsZW1zW2ldLCBpLCBmbiggZWxlbXNbaV0sIGtleSApICkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY2hhaW5hYmxlID9cblx0XHRlbGVtcyA6XG5cblx0XHQvLyBHZXRzXG5cdFx0YnVsayA/XG5cdFx0XHRmbi5jYWxsKCBlbGVtcyApIDpcblx0XHRcdGxlbiA/IGZuKCBlbGVtc1swXSwga2V5ICkgOiBlbXB0eUdldDtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gb2JqZWN0IGNhbiBoYXZlIGRhdGFcbiAqL1xualF1ZXJ5LmFjY2VwdERhdGEgPSBmdW5jdGlvbiggb3duZXIgKSB7XG5cdC8vIEFjY2VwdHMgb25seTpcblx0Ly8gIC0gTm9kZVxuXHQvLyAgICAtIE5vZGUuRUxFTUVOVF9OT0RFXG5cdC8vICAgIC0gTm9kZS5ET0NVTUVOVF9OT0RFXG5cdC8vICAtIE9iamVjdFxuXHQvLyAgICAtIEFueVxuXHQvKiBqc2hpbnQgLVcwMTggKi9cblx0cmV0dXJuIG93bmVyLm5vZGVUeXBlID09PSAxIHx8IG93bmVyLm5vZGVUeXBlID09PSA5IHx8ICEoICtvd25lci5ub2RlVHlwZSApO1xufTtcblxuXG5mdW5jdGlvbiBEYXRhKCkge1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDwgNCxcblx0Ly8gT2xkIFdlYktpdCBkb2VzIG5vdCBoYXZlIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucy9mcmVlemUgbWV0aG9kLFxuXHQvLyByZXR1cm4gbmV3IGVtcHR5IG9iamVjdCBpbnN0ZWFkIHdpdGggbm8gW1tzZXRdXSBhY2Nlc3NvclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMuY2FjaGUgPSB7fSwgMCwge1xuXHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9KTtcblxuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIE1hdGgucmFuZG9tKCk7XG59XG5cbkRhdGEudWlkID0gMTtcbkRhdGEuYWNjZXB0cyA9IGpRdWVyeS5hY2NlcHREYXRhO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblx0a2V5OiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHQvLyBBbHdheXMgcmV0dXJuIHRoZSBrZXkgZm9yIGEgZnJvemVuIG9iamVjdC5cblx0XHRpZiAoICFEYXRhLmFjY2VwdHMoIG93bmVyICkgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgZGVzY3JpcHRvciA9IHt9LFxuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIG93bmVyIG9iamVjdCBhbHJlYWR5IGhhcyBhIGNhY2hlIGtleVxuXHRcdFx0dW5sb2NrID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0Ly8gSWYgbm90LCBjcmVhdGUgb25lXG5cdFx0aWYgKCAhdW5sb2NrICkge1xuXHRcdFx0dW5sb2NrID0gRGF0YS51aWQrKztcblxuXHRcdFx0Ly8gU2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUsIG5vbi13cml0YWJsZSBwcm9wZXJ0eVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGVzY3JpcHRvclsgdGhpcy5leHBhbmRvIF0gPSB7IHZhbHVlOiB1bmxvY2sgfTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIG93bmVyLCBkZXNjcmlwdG9yICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPCA0XG5cdFx0XHQvLyBGYWxsYmFjayB0byBhIGxlc3Mgc2VjdXJlIGRlZmluaXRpb25cblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRkZXNjcmlwdG9yWyB0aGlzLmV4cGFuZG8gXSA9IHVubG9jaztcblx0XHRcdFx0alF1ZXJ5LmV4dGVuZCggb3duZXIsIGRlc2NyaXB0b3IgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBFbnN1cmUgdGhlIGNhY2hlIG9iamVjdFxuXHRcdGlmICggIXRoaXMuY2FjaGVbIHVubG9jayBdICkge1xuXHRcdFx0dGhpcy5jYWNoZVsgdW5sb2NrIF0gPSB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdW5sb2NrO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHQvLyBUaGVyZSBtYXkgYmUgYW4gdW5sb2NrIGFzc2lnbmVkIHRvIHRoaXMgbm9kZSxcblx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIGVudHJ5IGZvciB0aGlzIFwib3duZXJcIiwgY3JlYXRlIG9uZSBpbmxpbmVcblx0XHRcdC8vIGFuZCBzZXQgdGhlIHVubG9jayBhcyB0aG91Z2ggYW4gb3duZXIgZW50cnkgaGFkIGFsd2F5cyBleGlzdGVkXG5cdFx0XHR1bmxvY2sgPSB0aGlzLmtleSggb3duZXIgKSxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZVsgdW5sb2NrIF07XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBkYXRhIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEZyZXNoIGFzc2lnbm1lbnRzIGJ5IG9iamVjdCBhcmUgc2hhbGxvdyBjb3BpZWRcblx0XHRcdGlmICggalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5leHRlbmQoIHRoaXMuY2FjaGVbIHVubG9jayBdLCBkYXRhICk7XG5cdFx0XHQvLyBPdGhlcndpc2UsIGNvcHkgdGhlIHByb3BlcnRpZXMgb25lLWJ5LW9uZSB0byB0aGUgY2FjaGUgb2JqZWN0XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBwcm9wIGluIGRhdGEgKSB7XG5cdFx0XHRcdFx0Y2FjaGVbIHByb3AgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0Ly8gRWl0aGVyIGEgdmFsaWQgY2FjaGUgaXMgZm91bmQsIG9yIHdpbGwgYmUgY3JlYXRlZC5cblx0XHQvLyBOZXcgY2FjaGVzIHdpbGwgYmUgY3JlYXRlZCBhbmQgdGhlIHVubG9jayByZXR1cm5lZCxcblx0XHQvLyBhbGxvd2luZyBkaXJlY3QgYWNjZXNzIHRvIHRoZSBuZXdseSBjcmVhdGVkXG5cdFx0Ly8gZW1wdHkgZGF0YSBvYmplY3QuIEEgdmFsaWQgb3duZXIgb2JqZWN0IG11c3QgYmUgcHJvdmlkZWQuXG5cdFx0dmFyIGNhY2hlID0gdGhpcy5jYWNoZVsgdGhpcy5rZXkoIG93bmVyICkgXTtcblxuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRjYWNoZSA6IGNhY2hlWyBrZXkgXTtcblx0fSxcblx0YWNjZXNzOiBmdW5jdGlvbiggb3duZXIsIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIHN0b3JlZDtcblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoKGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSApIHtcblxuXHRcdFx0c3RvcmVkID0gdGhpcy5nZXQoIG93bmVyLCBrZXkgKTtcblxuXHRcdFx0cmV0dXJuIHN0b3JlZCAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0c3RvcmVkIDogdGhpcy5nZXQoIG93bmVyLCBqUXVlcnkuY2FtZWxDYXNlKGtleSkgKTtcblx0XHR9XG5cblx0XHQvLyBbKl1XaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGNhbWVsLFxuXHRcdFx0dW5sb2NrID0gdGhpcy5rZXkoIG93bmVyICksXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGVbIHVubG9jayBdO1xuXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXMuY2FjaGVbIHVubG9jayBdID0ge307XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIGtleSApICkge1xuXHRcdFx0XHQvLyBJZiBcIm5hbWVcIiBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG5cdFx0XHRcdC8vIFdoZW4gZGF0YSBpcyBpbml0aWFsbHkgY3JlYXRlZCwgdmlhIChcImtleVwiLCBcInZhbFwiKSBzaWduYXR1cmUsXG5cdFx0XHRcdC8vIGtleXMgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gY2FtZWxDYXNlLlxuXHRcdFx0XHQvLyBTaW5jZSB0aGVyZSBpcyBubyB3YXkgdG8gdGVsbCBfaG93XyBhIGtleSB3YXMgYWRkZWQsIHJlbW92ZVxuXHRcdFx0XHQvLyBib3RoIHBsYWluIGtleSBhbmQgY2FtZWxDYXNlIGtleS4gIzEyNzg2XG5cdFx0XHRcdC8vIFRoaXMgd2lsbCBvbmx5IHBlbmFsaXplIHRoZSBhcnJheSBhcmd1bWVudCBwYXRoLlxuXHRcdFx0XHRuYW1lID0ga2V5LmNvbmNhdCgga2V5Lm1hcCggalF1ZXJ5LmNhbWVsQ2FzZSApICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYW1lbCA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXHRcdFx0XHQvLyBUcnkgdGhlIHN0cmluZyBhcyBhIGtleSBiZWZvcmUgYW55IG1hbmlwdWxhdGlvblxuXHRcdFx0XHRpZiAoIGtleSBpbiBjYWNoZSApIHtcblx0XHRcdFx0XHRuYW1lID0gWyBrZXksIGNhbWVsIF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0bmFtZSA9IGNhbWVsO1xuXHRcdFx0XHRcdG5hbWUgPSBuYW1lIGluIGNhY2hlID9cblx0XHRcdFx0XHRcdFsgbmFtZSBdIDogKCBuYW1lLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBuYW1lLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIG5hbWVbIGkgXSBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHJldHVybiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoXG5cdFx0XHR0aGlzLmNhY2hlWyBvd25lclsgdGhpcy5leHBhbmRvIF0gXSB8fCB7fVxuXHRcdCk7XG5cdH0sXG5cdGRpc2NhcmQ6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHRpZiAoIG93bmVyWyB0aGlzLmV4cGFuZG8gXSApIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNhY2hlWyBvd25lclsgdGhpcy5leHBhbmRvIF0gXTtcblx0XHR9XG5cdH1cbn07XG52YXIgZGF0YV9wcml2ID0gbmV3IERhdGEoKTtcblxudmFyIGRhdGFfdXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vKlxuXHRJbXBsZW1lbnRhdGlvbiBTdW1tYXJ5XG5cblx0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuXHQyLiBJbXByb3ZlIHRoZSBtb2R1bGUncyBtYWludGFpbmFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIHN0b3JhZ2Vcblx0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG5cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG5cdDQuIF9OZXZlcl8gZXhwb3NlIFwicHJpdmF0ZVwiIGRhdGEgdG8gdXNlciBjb2RlIChUT0RPOiBEcm9wIF9kYXRhLCBfcmVtb3ZlRGF0YSlcblx0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG5cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuKi9cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvKFtBLVpdKS9nO1xuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJDFcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGRhdGEgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6XG5cdFx0XHRcdFx0ZGF0YSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOlxuXHRcdFx0XHRcdGRhdGEgPT09IFwibnVsbFwiID8gbnVsbCA6XG5cdFx0XHRcdFx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0XHRcdFx0XHQrZGF0YSArIFwiXCIgPT09IGRhdGEgPyArZGF0YSA6XG5cdFx0XHRcdFx0cmJyYWNlLnRlc3QoIGRhdGEgKSA/IGpRdWVyeS5wYXJzZUpTT04oIGRhdGEgKSA6XG5cdFx0XHRcdFx0ZGF0YTtcblx0XHRcdH0gY2F0Y2goIGUgKSB7fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgd2Ugc2V0IHRoZSBkYXRhIHNvIGl0IGlzbid0IGNoYW5nZWQgbGF0ZXJcblx0XHRcdGRhdGFfdXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCh7XG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkYXRhX3VzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFfcHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFfdXNlci5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhX3VzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YV9wcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIG5hbWUsIGRhdGEgKTtcblx0fSxcblxuXHRfcmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YV9wcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFfdXNlci5nZXQoIGVsZW0gKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgIWRhdGFfcHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRTExK1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSg1KSApO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFBdHRyKCBlbGVtLCBuYW1lLCBkYXRhWyBuYW1lIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhX3ByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhX3VzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBkYXRhLFxuXHRcdFx0XHRjYW1lbEtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHQvLyBUaGUgY2FsbGluZyBqUXVlcnkgb2JqZWN0IChlbGVtZW50IG1hdGNoZXMpIGlzIG5vdCBlbXB0eVxuXHRcdFx0Ly8gKGFuZCB0aGVyZWZvcmUgaGFzIGFuIGVsZW1lbnQgYXBwZWFycyBhdCB0aGlzWyAwIF0pIGFuZCB0aGVcblx0XHRcdC8vIGB2YWx1ZWAgcGFyYW1ldGVyIHdhcyBub3QgdW5kZWZpbmVkLiBBbiBlbXB0eSBqUXVlcnkgb2JqZWN0XG5cdFx0XHQvLyB3aWxsIHJlc3VsdCBpbiBgdW5kZWZpbmVkYCBmb3IgZWxlbSA9IHRoaXNbIDAgXSB3aGljaCB3aWxsXG5cdFx0XHQvLyB0aHJvdyBhbiBleGNlcHRpb24gaWYgYW4gYXR0ZW1wdCB0byByZWFkIGEgZGF0YSBjYWNoZSBpcyBtYWRlLlxuXHRcdFx0aWYgKCBlbGVtICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gd2l0aCB0aGUga2V5IGFzLWlzXG5cdFx0XHRcdGRhdGEgPSBkYXRhX3VzZXIuZ2V0KCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIHdpdGggdGhlIGtleSBjYW1lbGl6ZWRcblx0XHRcdFx0ZGF0YSA9IGRhdGFfdXNlci5nZXQoIGVsZW0sIGNhbWVsS2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBcImRpc2NvdmVyXCIgdGhlIGRhdGEgaW5cblx0XHRcdFx0Ly8gSFRNTDUgY3VzdG9tIGRhdGEtKiBhdHRyc1xuXHRcdFx0XHRkYXRhID0gZGF0YUF0dHIoIGVsZW0sIGNhbWVsS2V5LCB1bmRlZmluZWQgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIEZpcnN0LCBhdHRlbXB0IHRvIHN0b3JlIGEgY29weSBvciByZWZlcmVuY2Ugb2YgYW55XG5cdFx0XHRcdC8vIGRhdGEgdGhhdCBtaWdodCd2ZSBiZWVuIHN0b3JlIHdpdGggYSBjYW1lbENhc2VkIGtleS5cblx0XHRcdFx0dmFyIGRhdGEgPSBkYXRhX3VzZXIuZ2V0KCB0aGlzLCBjYW1lbEtleSApO1xuXG5cdFx0XHRcdC8vIEZvciBIVE1MNSBkYXRhLSogYXR0cmlidXRlIGludGVyb3AsIHdlIGhhdmUgdG9cblx0XHRcdFx0Ly8gc3RvcmUgcHJvcGVydHkgbmFtZXMgd2l0aCBkYXNoZXMgaW4gYSBjYW1lbENhc2UgZm9ybS5cblx0XHRcdFx0Ly8gVGhpcyBtaWdodCBub3QgYXBwbHkgdG8gYWxsIHByb3BlcnRpZXMuLi4qXG5cdFx0XHRcdGRhdGFfdXNlci5zZXQoIHRoaXMsIGNhbWVsS2V5LCB2YWx1ZSApO1xuXG5cdFx0XHRcdC8vICouLi4gSW4gdGhlIGNhc2Ugb2YgcHJvcGVydGllcyB0aGF0IG1pZ2h0IF9hY3R1YWxseV9cblx0XHRcdFx0Ly8gaGF2ZSBkYXNoZXMsIHdlIG5lZWQgdG8gYWxzbyBzdG9yZSBhIGNvcHkgb2YgdGhhdFxuXHRcdFx0XHQvLyB1bmNoYW5nZWQgcHJvcGVydHkuXG5cdFx0XHRcdGlmICgga2V5LmluZGV4T2YoXCItXCIpICE9PSAtMSAmJiBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0ZGF0YV91c2VyLnNldCggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRkYXRhX3VzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9KTtcblx0fVxufSk7XG5cblxualF1ZXJ5LmV4dGVuZCh7XG5cdHF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgcXVldWU7XG5cblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHR0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xuXHRcdFx0cXVldWUgPSBkYXRhX3ByaXYuZ2V0KCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoZGF0YSkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBub3QgaW50ZW5kZWQgZm9yIHB1YmxpYyBjb25zdW1wdGlvbiAtIGdlbmVyYXRlcyBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm5zIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4gZGF0YV9wcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YV9wcml2LmFjY2VzcyggZWxlbSwga2V5LCB7XG5cdFx0XHRlbXB0eTogalF1ZXJ5LkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLmFkZChmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YV9wcml2LnJlbW92ZSggZWxlbSwgWyB0eXBlICsgXCJxdWV1ZVwiLCBrZXkgXSApO1xuXHRcdFx0fSlcblx0XHR9KTtcblx0fVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRxdWV1ZTogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHNldHRlciA9IDI7XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZGF0YSA9IHR5cGU7XG5cdFx0XHR0eXBlID0gXCJmeFwiO1xuXHRcdFx0c2V0dGVyLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5xdWV1ZSggdGhpc1swXSwgdHlwZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcyA6XG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgZGF0YSApO1xuXG5cdFx0XHRcdC8vIGVuc3VyZSBhIGhvb2tzIGZvciB0aGlzIHF1ZXVlXG5cdFx0XHRcdGpRdWVyeS5fcXVldWVIb29rcyggdGhpcywgdHlwZSApO1xuXG5cdFx0XHRcdGlmICggdHlwZSA9PT0gXCJmeFwiICYmIHF1ZXVlWzBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fSxcblx0ZGVxdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhX3ByaXYuZ2V0KCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcblx0XHRcdGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcblx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0dG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXNvbHZlKCk7XG5cdFx0cmV0dXJuIGRlZmVyLnByb21pc2UoIG9iaiApO1xuXHR9XG59KTtcbnZhciBwbnVtID0gKC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvKS5zb3VyY2U7XG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXHRcdC8vIGlzSGlkZGVuIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG5cdFx0Ly8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG5cdFx0ZWxlbSA9IGVsIHx8IGVsZW07XG5cdFx0cmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwibm9uZVwiIHx8ICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXHR9O1xuXG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoL14oPzpjaGVja2JveHxyYWRpbykkL2kpO1xuXG5cblxuKGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gIzExMjE3IC0gV2ViS2l0IGxvc2VzIGNoZWNrIHdoZW4gdGhlIG5hbWUgaXMgYWZ0ZXIgdGhlIGNoZWNrZWQgYXR0cmlidXRlXG5cdC8vIFN1cHBvcnQ6IFdpbmRvd3MgV2ViIEFwcHMgKFdXQSlcblx0Ly8gYG5hbWVgIGFuZCBgdHlwZWAgbmVlZCAuc2V0QXR0cmlidXRlIGZvciBXV0Fcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaSA1LjEsIGlPUyA1LjEsIEFuZHJvaWQgNC54LCBBbmRyb2lkIDIuM1xuXHQvLyBvbGQgV2ViS2l0IGRvZXNuJ3QgY2xvbmUgY2hlY2tlZCBzdGF0ZSBjb3JyZWN0bHkgaW4gZnJhZ21lbnRzXG5cdHN1cHBvcnQuY2hlY2tDbG9uZSA9IGRpdi5jbG9uZU5vZGUoIHRydWUgKS5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuY2hlY2tlZDtcblxuXHQvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuXHQvLyBTdXBwb3J0OiBJRTktSUUxMStcblx0ZGl2LmlubmVySFRNTCA9IFwiPHRleHRhcmVhPng8L3RleHRhcmVhPlwiO1xuXHRzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkID0gISFkaXYuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmRlZmF1bHRWYWx1ZTtcbn0pKCk7XG52YXIgc3RydW5kZWZpbmVkID0gdHlwZW9mIHVuZGVmaW5lZDtcblxuXG5cbnN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudSl8Y2xpY2svLFxuXHRyZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkkLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaGFuZGxlciBoYXMgYSB1bmlxdWUgSUQsIHVzZWQgdG8gZmluZC9yZW1vdmUgaXQgbGF0ZXJcblx0XHRpZiAoICFoYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRoYW5kbGVyLmd1aWQgPSBqUXVlcnkuZ3VpZCsrO1xuXHRcdH1cblxuXHRcdC8vIEluaXQgdGhlIGVsZW1lbnQncyBldmVudCBzdHJ1Y3R1cmUgYW5kIG1haW4gaGFuZGxlciwgaWYgdGhpcyBpcyB0aGUgZmlyc3Rcblx0XHRpZiAoICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUpICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0Ly8gRGlzY2FyZCB0aGUgc2Vjb25kIGV2ZW50IG9mIGEgalF1ZXJ5LmV2ZW50LnRyaWdnZXIoKSBhbmRcblx0XHRcdFx0Ly8gd2hlbiBhbiBldmVudCBpcyBjYWxsZWQgYWZ0ZXIgYSBwYWdlIGhhcyB1bmxvYWRlZFxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIGpRdWVyeSAhPT0gc3RydW5kZWZpbmVkICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoe1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRvcmlnVHlwZTogb3JpZ1R5cGUsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuZWVkc0NvbnRleHQ6IHNlbGVjdG9yICYmIGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoaGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUsIGZhbHNlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YV9wcml2Lmhhc0RhdGEoIGVsZW0gKSAmJiBkYXRhX3ByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cykgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1t0XSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWzFdO1xuXHRcdFx0bmFtZXNwYWNlcyA9ICggdG1wWzJdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsyXSAmJiBuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKFwiXFxcXC4oPzouKlxcXFwufClcIikgKyBcIihcXFxcLnwkKVwiICk7XG5cblx0XHRcdC8vIFJlbW92ZSBtYXRjaGluZyBldmVudHNcblx0XHRcdG9yaWdDb3VudCA9IGogPSBoYW5kbGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGogXTtcblxuXHRcdFx0XHRpZiAoICggbWFwcGVkVHlwZXMgfHwgb3JpZ1R5cGUgPT09IGhhbmRsZU9iai5vcmlnVHlwZSApICYmXG5cdFx0XHRcdFx0KCAhaGFuZGxlciB8fCBoYW5kbGVyLmd1aWQgPT09IGhhbmRsZU9iai5ndWlkICkgJiZcblx0XHRcdFx0XHQoICF0bXAgfHwgdG1wLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApICYmXG5cdFx0XHRcdFx0KCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8IHNwZWNpYWwudGVhcmRvd24uY2FsbCggZWxlbSwgbmFtZXNwYWNlcywgZWxlbURhdGEuaGFuZGxlICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRlbGV0ZSBlbGVtRGF0YS5oYW5kbGU7XG5cdFx0XHRkYXRhX3ByaXYucmVtb3ZlKCBlbGVtLCBcImV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG5cdFx0dmFyIGksIGN1ciwgdG1wLCBidWJibGVUeXBlLCBvbnR5cGUsIGhhbmRsZSwgc3BlY2lhbCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChcIi5cIikgOiBbXTtcblxuXHRcdGN1ciA9IHRtcCA9IGVsZW0gPSBlbGVtIHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gRG9uJ3QgZG8gZXZlbnRzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb2N1cy9ibHVyIG1vcnBocyB0byBmb2N1c2luL291dDsgZW5zdXJlIHdlJ3JlIG5vdCBmaXJpbmcgdGhlbSByaWdodCBub3dcblx0XHRpZiAoIHJmb2N1c01vcnBoLnRlc3QoIHR5cGUgKyBqUXVlcnkuZXZlbnQudHJpZ2dlcmVkICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlLmluZGV4T2YoXCIuXCIpID49IDAgKSB7XG5cdFx0XHQvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG5cdFx0XHRuYW1lc3BhY2VzID0gdHlwZS5zcGxpdChcIi5cIik7XG5cdFx0XHR0eXBlID0gbmFtZXNwYWNlcy5zaGlmdCgpO1xuXHRcdFx0bmFtZXNwYWNlcy5zb3J0KCk7XG5cdFx0fVxuXHRcdG9udHlwZSA9IHR5cGUuaW5kZXhPZihcIjpcIikgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihcIi5cIik7XG5cdFx0ZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIgKSA6XG5cdFx0XHRudWxsO1xuXG5cdFx0Ly8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG5cdFx0ZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGVsZW07XG5cdFx0fVxuXG5cdFx0Ly8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuXHRcdGRhdGEgPSBkYXRhID09IG51bGwgP1xuXHRcdFx0WyBldmVudCBdIDpcblx0XHRcdGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuXHRcdC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0YnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG5cdFx0XHRpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuXHRcdFx0XHR0bXAgPSBjdXI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuXHRcdFx0aWYgKCB0bXAgPT09IChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKGN1ciA9IGV2ZW50UGF0aFtpKytdKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0ZXZlbnQudHlwZSA9IGkgPiAxID9cblx0XHRcdFx0YnViYmxlVHlwZSA6XG5cdFx0XHRcdHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuXHRcdFx0Ly8galF1ZXJ5IGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9ICggZGF0YV9wcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmIGRhdGFfcHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBqUXVlcnkuYWNjZXB0RGF0YSggY3VyICkgKSB7XG5cdFx0XHRcdGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cblx0XHRcdGlmICggKCFzcGVjaWFsLl9kZWZhdWx0IHx8IHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSkgJiZcblx0XHRcdFx0alF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHR0bXAgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0ZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YV9wcml2LmdldCggdGhpcywgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSB8fCBbXSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZXZlbnQudHlwZSBdIHx8IHt9O1xuXG5cdFx0Ly8gVXNlIHRoZSBmaXgtZWQgalF1ZXJ5LkV2ZW50IHJhdGhlciB0aGFuIHRoZSAocmVhZC1vbmx5KSBuYXRpdmUgZXZlbnRcblx0XHRhcmdzWzBdID0gZXZlbnQ7XG5cdFx0ZXZlbnQuZGVsZWdhdGVUYXJnZXQgPSB0aGlzO1xuXG5cdFx0Ly8gQ2FsbCB0aGUgcHJlRGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlLCBhbmQgbGV0IGl0IGJhaWwgaWYgZGVzaXJlZFxuXHRcdGlmICggc3BlY2lhbC5wcmVEaXNwYXRjaCAmJiBzcGVjaWFsLnByZURpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBoYW5kbGVyc1xuXHRcdGhhbmRsZXJRdWV1ZSA9IGpRdWVyeS5ldmVudC5oYW5kbGVycy5jYWxsKCB0aGlzLCBldmVudCwgaGFuZGxlcnMgKTtcblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAobWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0pICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoIChoYW5kbGVPYmogPSBtYXRjaGVkLmhhbmRsZXJzWyBqKysgXSkgJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvclxuXHRcdFx0XHQvLyAyKSBoYXZlIG5hbWVzcGFjZShzKSBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQubmFtZXNwYWNlX3JlIHx8IGV2ZW50Lm5hbWVzcGFjZV9yZS50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSB7XG5cblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cdFx0XHRcdFx0ZXZlbnQuZGF0YSA9IGhhbmRsZU9iai5kYXRhO1xuXG5cdFx0XHRcdFx0cmV0ID0gKCAoalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9KS5oYW5kbGUgfHwgaGFuZGxlT2JqLmhhbmRsZXIgKVxuXHRcdFx0XHRcdFx0XHQuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKGV2ZW50LnJlc3VsdCA9IHJldCkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgbWF0Y2hlcywgc2VsLCBoYW5kbGVPYmosXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXSxcblx0XHRcdGRlbGVnYXRlQ291bnQgPSBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LFxuXHRcdFx0Y3VyID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0Ly8gRmluZCBkZWxlZ2F0ZSBoYW5kbGVyc1xuXHRcdC8vIEJsYWNrLWhvbGUgU1ZHIDx1c2U+IGluc3RhbmNlIHRyZWVzICgjMTMxODApXG5cdFx0Ly8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmIGN1ci5ub2RlVHlwZSAmJiAoIWV2ZW50LmJ1dHRvbiB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIpICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBwcm9jZXNzIGNsaWNrcyBvbiBkaXNhYmxlZCBlbGVtZW50cyAoIzY5MTEsICM4MTY1LCAjMTEzODIsICMxMTc2NClcblx0XHRcdFx0aWYgKCBjdXIuZGlzYWJsZWQgIT09IHRydWUgfHwgZXZlbnQudHlwZSAhPT0gXCJjbGlja1wiICkge1xuXHRcdFx0XHRcdG1hdGNoZXMgPSBbXTtcblx0XHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGRlbGVnYXRlQ291bnQ7IGkrKyApIHtcblx0XHRcdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBpIF07XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGNvbmZsaWN0IHdpdGggT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzICgjMTMyMDMpXG5cdFx0XHRcdFx0XHRzZWwgPSBoYW5kbGVPYmouc2VsZWN0b3IgKyBcIiBcIjtcblxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVzWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzWyBzZWwgXSA9IGhhbmRsZU9iai5uZWVkc0NvbnRleHQgP1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeSggc2VsLCB0aGlzICkuaW5kZXgoIGN1ciApID49IDAgOlxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kKCBzZWwsIHRoaXMsIG51bGwsIFsgY3VyIF0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXNbIHNlbCBdICkge1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZXMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVzIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IHRoaXMsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0Ly8gSW5jbHVkZXMgc29tZSBldmVudCBwcm9wcyBzaGFyZWQgYnkgS2V5RXZlbnQgYW5kIE1vdXNlRXZlbnRcblx0cHJvcHM6IFwiYWx0S2V5IGJ1YmJsZXMgY2FuY2VsYWJsZSBjdHJsS2V5IGN1cnJlbnRUYXJnZXQgZXZlbnRQaGFzZSBtZXRhS2V5IHJlbGF0ZWRUYXJnZXQgc2hpZnRLZXkgdGFyZ2V0IHRpbWVTdGFtcCB2aWV3IHdoaWNoXCIuc3BsaXQoXCIgXCIpLFxuXG5cdGZpeEhvb2tzOiB7fSxcblxuXHRrZXlIb29rczoge1xuXHRcdHByb3BzOiBcImNoYXIgY2hhckNvZGUga2V5IGtleUNvZGVcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRcdGlmICggZXZlbnQud2hpY2ggPT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnQud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXZlbnQ7XG5cdFx0fVxuXHR9LFxuXG5cdG1vdXNlSG9va3M6IHtcblx0XHRwcm9wczogXCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIHNjcmVlblggc2NyZWVuWSB0b0VsZW1lbnRcIi5zcGxpdChcIiBcIiksXG5cdFx0ZmlsdGVyOiBmdW5jdGlvbiggZXZlbnQsIG9yaWdpbmFsICkge1xuXHRcdFx0dmFyIGV2ZW50RG9jLCBkb2MsIGJvZHksXG5cdFx0XHRcdGJ1dHRvbiA9IG9yaWdpbmFsLmJ1dHRvbjtcblxuXHRcdFx0Ly8gQ2FsY3VsYXRlIHBhZ2VYL1kgaWYgbWlzc2luZyBhbmQgY2xpZW50WC9ZIGF2YWlsYWJsZVxuXHRcdFx0aWYgKCBldmVudC5wYWdlWCA9PSBudWxsICYmIG9yaWdpbmFsLmNsaWVudFggIT0gbnVsbCApIHtcblx0XHRcdFx0ZXZlbnREb2MgPSBldmVudC50YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcblx0XHRcdFx0ZG9jID0gZXZlbnREb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0XHRib2R5ID0gZXZlbnREb2MuYm9keTtcblxuXHRcdFx0XHRldmVudC5wYWdlWCA9IG9yaWdpbmFsLmNsaWVudFggKyAoIGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwICkgLSAoIGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwICk7XG5cdFx0XHRcdGV2ZW50LnBhZ2VZID0gb3JpZ2luYWwuY2xpZW50WSArICggZG9jICYmIGRvYy5zY3JvbGxUb3AgIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgIHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRUb3AgIHx8IGJvZHkgJiYgYm9keS5jbGllbnRUb3AgIHx8IDAgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHdoaWNoIGZvciBjbGljazogMSA9PT0gbGVmdDsgMiA9PT0gbWlkZGxlOyAzID09PSByaWdodFxuXHRcdFx0Ly8gTm90ZTogYnV0dG9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyBkb24ndCB1c2UgaXRcblx0XHRcdGlmICggIWV2ZW50LndoaWNoICYmIGJ1dHRvbiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRldmVudC53aGljaCA9ICggYnV0dG9uICYgMSA/IDEgOiAoIGJ1dHRvbiAmIDIgPyAzIDogKCBidXR0b24gJiA0ID8gMiA6IDAgKSApICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0aWYgKCBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSApIHtcblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYSB3cml0YWJsZSBjb3B5IG9mIHRoZSBldmVudCBvYmplY3QgYW5kIG5vcm1hbGl6ZSBzb21lIHByb3BlcnRpZXNcblx0XHR2YXIgaSwgcHJvcCwgY29weSxcblx0XHRcdHR5cGUgPSBldmVudC50eXBlLFxuXHRcdFx0b3JpZ2luYWxFdmVudCA9IGV2ZW50LFxuXHRcdFx0Zml4SG9vayA9IHRoaXMuZml4SG9va3NbIHR5cGUgXTtcblxuXHRcdGlmICggIWZpeEhvb2sgKSB7XG5cdFx0XHR0aGlzLmZpeEhvb2tzWyB0eXBlIF0gPSBmaXhIb29rID1cblx0XHRcdFx0cm1vdXNlRXZlbnQudGVzdCggdHlwZSApID8gdGhpcy5tb3VzZUhvb2tzIDpcblx0XHRcdFx0cmtleUV2ZW50LnRlc3QoIHR5cGUgKSA/IHRoaXMua2V5SG9va3MgOlxuXHRcdFx0XHR7fTtcblx0XHR9XG5cdFx0Y29weSA9IGZpeEhvb2sucHJvcHMgPyB0aGlzLnByb3BzLmNvbmNhdCggZml4SG9vay5wcm9wcyApIDogdGhpcy5wcm9wcztcblxuXHRcdGV2ZW50ID0gbmV3IGpRdWVyeS5FdmVudCggb3JpZ2luYWxFdmVudCApO1xuXG5cdFx0aSA9IGNvcHkubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0cHJvcCA9IGNvcHlbIGkgXTtcblx0XHRcdGV2ZW50WyBwcm9wIF0gPSBvcmlnaW5hbEV2ZW50WyBwcm9wIF07XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQ29yZG92YSAyLjUgKFdlYktpdCkgKCMxMzI1NSlcblx0XHQvLyBBbGwgZXZlbnRzIHNob3VsZCBoYXZlIGEgdGFyZ2V0OyBDb3Jkb3ZhIGRldmljZXJlYWR5IGRvZXNuJ3Rcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBkb2N1bWVudDtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgNi4wKywgQ2hyb21lIDwgMjhcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdGlmICggZXZlbnQudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZpeEhvb2suZmlsdGVyID8gZml4SG9vay5maWx0ZXIoIGV2ZW50LCBvcmlnaW5hbEV2ZW50ICkgOiBldmVudDtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXHRcdGZvY3VzOiB7XG5cdFx0XHQvLyBGaXJlIG5hdGl2ZSBldmVudCBpZiBwb3NzaWJsZSBzbyBibHVyL2ZvY3VzIHNlcXVlbmNlIGlzIGNvcnJlY3Rcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgIT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5mb2N1cyApIHtcblx0XHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3VzaW5cIlxuXHRcdH0sXG5cdFx0Ymx1cjoge1xuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyA9PT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmJsdXIgKSB7XG5cdFx0XHRcdFx0dGhpcy5ibHVyKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZWdhdGVUeXBlOiBcImZvY3Vzb3V0XCJcblx0XHR9LFxuXHRcdGNsaWNrOiB7XG5cdFx0XHQvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayAmJiBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2soKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCwgYnViYmxlICkge1xuXHRcdC8vIFBpZ2d5YmFjayBvbiBhIGRvbm9yIGV2ZW50IHRvIHNpbXVsYXRlIGEgZGlmZmVyZW50IG9uZS5cblx0XHQvLyBGYWtlIG9yaWdpbmFsRXZlbnQgdG8gYXZvaWQgZG9ub3IncyBzdG9wUHJvcGFnYXRpb24sIGJ1dCBpZiB0aGVcblx0XHQvLyBzaW11bGF0ZWQgZXZlbnQgcHJldmVudHMgZGVmYXVsdCB0aGVuIHdlIGRvIHRoZSBzYW1lIG9uIHRoZSBkb25vci5cblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWUsXG5cdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IHt9XG5cdFx0XHR9XG5cdFx0KTtcblx0XHRpZiAoIGJ1YmJsZSApIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5jYWxsKCBlbGVtLCBlICk7XG5cdFx0fVxuXHRcdGlmICggZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSwgZmFsc2UgKTtcblx0fVxufTtcblxualF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcblx0XHRcdFx0c3JjLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDwgNC4wXG5cdFx0XHRcdHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0cmV0dXJuVHJ1ZSA6XG5cdFx0XHRyZXR1cm5GYWxzZTtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgZS5wcmV2ZW50RGVmYXVsdCApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiBlLnN0b3BQcm9wYWdhdGlvbiApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gU3VwcG9ydDogQ2hyb21lIDE1K1xualF1ZXJ5LmVhY2goe1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZW50ZXIvbGVhdmUgY2FsbCB0aGUgaGFuZGxlciBpZiByZWxhdGVkIGlzIG91dHNpZGUgdGhlIHRhcmdldC5cblx0XHRcdC8vIE5COiBObyByZWxhdGVkVGFyZ2V0IGlmIHRoZSBtb3VzZSBsZWZ0L2VudGVyZWQgdGhlIGJyb3dzZXIgd2luZG93XG5cdFx0XHRpZiAoICFyZWxhdGVkIHx8IChyZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkpICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0pO1xuXG4vLyBDcmVhdGUgXCJidWJibGluZ1wiIGZvY3VzIGFuZCBibHVyIGV2ZW50c1xuLy8gU3VwcG9ydDogRmlyZWZveCwgQ2hyb21lLCBTYWZhcmlcbmlmICggIXN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgKSB7XG5cdGpRdWVyeS5lYWNoKHsgZm9jdXM6IFwiZm9jdXNpblwiLCBibHVyOiBcImZvY3Vzb3V0XCIgfSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblxuXHRcdC8vIEF0dGFjaCBhIHNpbmdsZSBjYXB0dXJpbmcgaGFuZGxlciBvbiB0aGUgZG9jdW1lbnQgd2hpbGUgc29tZW9uZSB3YW50cyBmb2N1c2luL2ZvY3Vzb3V0XG5cdFx0dmFyIGhhbmRsZXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICksIHRydWUgKTtcblx0XHRcdH07XG5cblx0XHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFfcHJpdi5hY2Nlc3MoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhX3ByaXYuYWNjZXNzKCBkb2MsIGZpeCwgKCBhdHRhY2hlcyB8fCAwICkgKyAxICk7XG5cdFx0XHR9LFxuXHRcdFx0dGVhcmRvd246IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG5cdFx0XHRcdFx0YXR0YWNoZXMgPSBkYXRhX3ByaXYuYWNjZXNzKCBkb2MsIGZpeCApIC0gMTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHRcdGRhdGFfcHJpdi5yZW1vdmUoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRhX3ByaXYuYWNjZXNzKCBkb2MsIGZpeCwgYXR0YWNoZXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIC8qSU5URVJOQUwqLyBvbmUgKSB7XG5cdFx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHRcdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcblx0XHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRcdGRhdGEgPSBkYXRhIHx8IHNlbGVjdG9yO1xuXHRcdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub24oIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdGlmICggZGF0YSA9PSBudWxsICYmIGZuID09IG51bGwgKSB7XG5cdFx0XHQvLyAoIHR5cGVzLCBmbiApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSBpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0Ly8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcblx0XHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gKCB0eXBlcywgZGF0YSwgZm4gKVxuXHRcdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRcdGRhdGEgPSBzZWxlY3Rvcjtcblx0XHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9IGVsc2UgaWYgKCAhZm4gKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRpZiAoIG9uZSA9PT0gMSApIHtcblx0XHRcdG9yaWdGbiA9IGZuO1xuXHRcdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0XHRqUXVlcnkoKS5vZmYoIGV2ZW50ICk7XG5cdFx0XHRcdHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0fTtcblx0XHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0XHRmbi5ndWlkID0gb3JpZ0ZuLmd1aWQgfHwgKCBvcmlnRm4uZ3VpZCA9IGpRdWVyeS5ndWlkKysgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCB0eXBlcywgZm4sIGRhdGEsIHNlbGVjdG9yICk7XG5cdFx0fSk7XG5cdH0sXG5cdG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXHRcdFx0Ly8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuXHRcdFx0aGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuXHRcdFx0alF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcblx0XHRcdFx0aGFuZGxlT2JqLm5hbWVzcGFjZSA/IGhhbmRsZU9iai5vcmlnVHlwZSArIFwiLlwiICsgaGFuZGxlT2JqLm5hbWVzcGFjZSA6IGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRcdC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG5cdFx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0XHR0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdC8vICggdHlwZXMgWywgZm5dIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuXHRcdH0pO1xuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0pO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWzBdO1xuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuXHRcdH1cblx0fVxufSk7XG5cblxudmFyXG5cdHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxcblx0cnRhZ05hbWUgPSAvPChbXFx3Ol0rKS8sXG5cdHJodG1sID0gLzx8JiM/XFx3KzsvLFxuXHRybm9Jbm5lcmh0bWwgPSAvPCg/OnNjcmlwdHxzdHlsZXxsaW5rKS9pLFxuXHQvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcblx0cmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuXHRyc2NyaXB0VHlwZSA9IC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2ksXG5cdHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG5cdHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxcblxuXHQvLyBXZSBoYXZlIHRvIGNsb3NlIHRoZXNlIHRhZ3MgdG8gc3VwcG9ydCBYSFRNTCAoIzEzMjAwKVxuXHR3cmFwTWFwID0ge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOVxuXHRcdG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuXG5cdFx0dGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuXHRcdGNvbDogWyAyLCBcIjx0YWJsZT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG5cdFx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHRcdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuXHRcdF9kZWZhdWx0OiBbIDAsIFwiXCIsIFwiXCIgXVxuXHR9O1xuXG4vLyBTdXBwb3J0OiBJRSA5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuLy8gU3VwcG9ydDogMS54IGNvbXBhdGliaWxpdHlcbi8vIE1hbmlwdWxhdGluZyB0YWJsZXMgcmVxdWlyZXMgYSB0Ym9keVxuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRyZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSA/XG5cblx0XHRlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF0gfHxcblx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIikgKSA6XG5cdFx0ZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSAhPT0gbnVsbCkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoXCJ0eXBlXCIpO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YV9wcml2LnNldChcblx0XHRcdGVsZW1zWyBpIF0sIFwiZ2xvYmFsRXZhbFwiLCAhcmVmRWxlbWVudHMgfHwgZGF0YV9wcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YV9wcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YV9wcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhX3ByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhX3VzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhX3VzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YV91c2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblx0dmFyIHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKSA6XG5cdFx0XHRjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApIDpcblx0XHRcdFtdO1xuXG5cdHJldHVybiB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSA/XG5cdFx0alF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICkgOlxuXHRcdHJldDtcbn1cblxuLy8gU3VwcG9ydDogSUUgPj0gOVxuZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcblx0dmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuXHRpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHRkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuXHQvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG5cdFx0ZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuXHR9XG59XG5cbmpRdWVyeS5leHRlbmQoe1xuXHRjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdHZhciBpLCBsLCBzcmNFbGVtZW50cywgZGVzdEVsZW1lbnRzLFxuXHRcdFx0Y2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApLFxuXHRcdFx0aW5QYWdlID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFID49IDlcblx0XHQvLyBGaXggQ2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcblx0XHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcblx0XHRcdHNyY0VsZW1lbnRzID0gZ2V0QWxsKCBlbGVtICk7XG5cblx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmaXhJbnB1dCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG5cdFx0aWYgKCBkYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0aWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdFx0c3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcblx0XHRcdFx0ZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRjbG9uZUNvcHlFdmVudCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcblx0XHRpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9LFxuXG5cdGJ1aWxkRnJhZ21lbnQ6IGZ1bmN0aW9uKCBlbGVtcywgY29udGV4dCwgc2NyaXB0cywgc2VsZWN0aW9uICkge1xuXHRcdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgY29udGFpbnMsIGosXG5cdFx0XHRmcmFnbWVudCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdFx0bm9kZXMgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0XHRpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuXHRcdFx0XHQvLyBBZGQgbm9kZXMgZGlyZWN0bHlcblx0XHRcdFx0aWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFF0V2ViS2l0XG5cdFx0XHRcdFx0Ly8galF1ZXJ5Lm1lcmdlIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93c1xuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudChcImRpdlwiKSApO1xuXG5cdFx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBlbGVtLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXRcblx0XHRcdFx0XHQvLyBqUXVlcnkubWVyZ2UgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzXG5cdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgdG1wLmNoaWxkTm9kZXMgKTtcblxuXHRcdFx0XHRcdC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyXG5cdFx0XHRcdFx0dG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHRcdC8vIEZpeGVzICMxMjM0NlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFdlYmtpdCwgSUVcblx0XHRcdFx0XHR0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuXHRcdGZyYWdtZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKGVsZW0gPSBub2Rlc1sgaSsrIF0pICkge1xuXG5cdFx0XHQvLyAjNDA4NyAtIElmIG9yaWdpbiBhbmQgZGVzdGluYXRpb24gZWxlbWVudHMgYXJlIHRoZSBzYW1lLCBhbmQgdGhpcyBpc1xuXHRcdFx0Ly8gdGhhdCBlbGVtZW50LCBkbyBub3QgZG8gYW55dGhpbmdcblx0XHRcdGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSAhPT0gLTEgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHRcdC8vIEFwcGVuZCB0byBmcmFnbWVudFxuXHRcdFx0dG1wID0gZ2V0QWxsKCBmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApLCBcInNjcmlwdFwiICk7XG5cblx0XHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRcdGlmICggY29udGFpbnMgKSB7XG5cdFx0XHRcdHNldEdsb2JhbEV2YWwoIHRtcCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYXB0dXJlIGV4ZWN1dGFibGVzXG5cdFx0XHRpZiAoIHNjcmlwdHMgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gdG1wWyBqKysgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBlbGVtLnR5cGUgfHwgXCJcIiApICkge1xuXHRcdFx0XHRcdFx0c2NyaXB0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZyYWdtZW50O1xuXHR9LFxuXG5cdGNsZWFuRGF0YTogZnVuY3Rpb24oIGVsZW1zICkge1xuXHRcdHZhciBkYXRhLCBlbGVtLCB0eXBlLCBrZXksXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKGVsZW0gPSBlbGVtc1sgaSBdKSAhPT0gdW5kZWZpbmVkOyBpKysgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGtleSA9IGVsZW1bIGRhdGFfcHJpdi5leHBhbmRvIF07XG5cblx0XHRcdFx0aWYgKCBrZXkgJiYgKGRhdGEgPSBkYXRhX3ByaXYuY2FjaGVbIGtleSBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0Zm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBkYXRhX3ByaXYuY2FjaGVbIGtleSBdICkge1xuXHRcdFx0XHRcdFx0Ly8gRGlzY2FyZCBhbnkgcmVtYWluaW5nIGBwcml2YXRlYCBkYXRhXG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YV9wcml2LmNhY2hlWyBrZXkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIERpc2NhcmQgYW55IHJlbWFpbmluZyBgdXNlcmAgZGF0YVxuXHRcdFx0ZGVsZXRlIGRhdGFfdXNlci5jYWNoZVsgZWxlbVsgZGF0YV91c2VyLmV4cGFuZG8gXSBdO1xuXHRcdH1cblx0fVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZG9tTWFuaXAoIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRwcmVwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kb21NYW5pcCggYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBzZWxlY3Rvciwga2VlcERhdGEgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdFx0dmFyIGVsZW0sXG5cdFx0XHRlbGVtcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIHRoaXMgKSA6IHRoaXMsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCAha2VlcERhdGEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtICkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoZWxlbSA9IHRoaXNbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcblx0XHR9KTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgYXJnID0gYXJndW1lbnRzWyAwIF07XG5cblx0XHQvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcblx0XHR0aGlzLmRvbU1hbmlwKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0YXJnID0gdGhpcy5wYXJlbnROb2RlO1xuXG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuXG5cdFx0XHRpZiAoIGFyZyApIHtcblx0XHRcdFx0YXJnLnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRm9yY2UgcmVtb3ZhbCBpZiB0aGVyZSB3YXMgbm8gbmV3IGNvbnRlbnQgKGUuZy4sIGZyb20gZW1wdHkgYXJndW1lbnRzKVxuXHRcdHJldHVybiBhcmcgJiYgKGFyZy5sZW5ndGggfHwgYXJnLm5vZGVUeXBlKSA/IHRoaXMgOiB0aGlzLnJlbW92ZSgpO1xuXHR9LFxuXG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnJlbW92ZSggc2VsZWN0b3IsIHRydWUgKTtcblx0fSxcblxuXHRkb21NYW5pcDogZnVuY3Rpb24oIGFyZ3MsIGNhbGxiYWNrICkge1xuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cblx0XHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHNldCA9IHRoaXMsXG5cdFx0XHRpTm9DbG9uZSA9IGwgLSAxLFxuXHRcdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0XHRpZiAoIGlzRnVuY3Rpb24gfHxcblx0XHRcdFx0KCBsID4gMSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0XHQhc3VwcG9ydC5jaGVja0Nsb25lICYmIHJjaGVja2VkLnRlc3QoIHZhbHVlICkgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGluZGV4ICkge1xuXHRcdFx0XHR2YXIgc2VsZiA9IHNldC5lcSggaW5kZXggKTtcblx0XHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRcdGFyZ3NbIDAgXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGYuZG9tTWFuaXAoIGFyZ3MsIGNhbGxiYWNrICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIGwgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGpRdWVyeS5idWlsZEZyYWdtZW50KCBhcmdzLCB0aGlzWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIHRoaXMgKTtcblx0XHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0aWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdFx0ZnJhZ21lbnQgPSBmaXJzdDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBmaXJzdCApIHtcblx0XHRcdFx0c2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuXHRcdFx0XHRoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cblx0XHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbSBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcblx0XHRcdFx0Ly8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cblx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdG5vZGUgPSBmcmFnbWVudDtcblxuXHRcdFx0XHRcdGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG5cdFx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHRcdC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cblx0XHRcdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUXRXZWJLaXRcblx0XHRcdFx0XHRcdFx0Ly8galF1ZXJ5Lm1lcmdlIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93c1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCggdGhpc1sgaSBdLCBub2RlLCBpICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cdFx0XHRcdFx0ZG9jID0gc2NyaXB0c1sgc2NyaXB0cy5sZW5ndGggLSAxIF0ub3duZXJEb2N1bWVudDtcblxuXHRcdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0XHRqUXVlcnkubWFwKCBzY3JpcHRzLCByZXN0b3JlU2NyaXB0ICk7XG5cblx0XHRcdFx0XHQvLyBFdmFsdWF0ZSBleGVjdXRhYmxlIHNjcmlwdHMgb24gZmlyc3QgZG9jdW1lbnQgaW5zZXJ0aW9uXG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gc2NyaXB0c1sgaSBdO1xuXHRcdFx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBub2RlLnR5cGUgfHwgXCJcIiApICYmXG5cdFx0XHRcdFx0XHRcdCFkYXRhX3ByaXYuYWNjZXNzKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmIGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLnNyYyApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZ2xvYmFsRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZWFjaCh7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFF0V2ViS2l0XG5cdFx0XHQvLyAuZ2V0KCkgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzXG5cdFx0XHRwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcblx0fTtcbn0pO1xuXG5cbnZhciBpZnJhbWUsXG5cdGVsZW1kaXNwbGF5ID0ge307XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGFjdHVhbCBkaXNwbGF5IG9mIGEgZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgbm9kZU5hbWUgb2YgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkb2MgRG9jdW1lbnQgb2JqZWN0XG4gKi9cbi8vIENhbGxlZCBvbmx5IGZyb20gd2l0aGluIGRlZmF1bHREaXNwbGF5XG5mdW5jdGlvbiBhY3R1YWxEaXNwbGF5KCBuYW1lLCBkb2MgKSB7XG5cdHZhciBzdHlsZSxcblx0XHRlbGVtID0galF1ZXJ5KCBkb2MuY3JlYXRlRWxlbWVudCggbmFtZSApICkuYXBwZW5kVG8oIGRvYy5ib2R5ICksXG5cblx0XHQvLyBnZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSBtaWdodCBiZSByZWxpYWJseSB1c2VkIG9ubHkgb24gYXR0YWNoZWQgZWxlbWVudFxuXHRcdGRpc3BsYXkgPSB3aW5kb3cuZ2V0RGVmYXVsdENvbXB1dGVkU3R5bGUgJiYgKCBzdHlsZSA9IHdpbmRvdy5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZSggZWxlbVsgMCBdICkgKSA/XG5cblx0XHRcdC8vIFVzZSBvZiB0aGlzIG1ldGhvZCBpcyBhIHRlbXBvcmFyeSBmaXggKG1vcmUgbGlrZSBvcHRtaXphdGlvbikgdW50aWwgc29tZXRoaW5nIGJldHRlciBjb21lcyBhbG9uZyxcblx0XHRcdC8vIHNpbmNlIGl0IHdhcyByZW1vdmVkIGZyb20gc3BlY2lmaWNhdGlvbiBhbmQgc3VwcG9ydGVkIG9ubHkgaW4gRkZcblx0XHRcdHN0eWxlLmRpc3BsYXkgOiBqUXVlcnkuY3NzKCBlbGVtWyAwIF0sIFwiZGlzcGxheVwiICk7XG5cblx0Ly8gV2UgZG9uJ3QgaGF2ZSBhbnkgZGF0YSBzdG9yZWQgb24gdGhlIGVsZW1lbnQsXG5cdC8vIHNvIHVzZSBcImRldGFjaFwiIG1ldGhvZCBhcyBmYXN0IHdheSB0byBnZXQgcmlkIG9mIHRoZSBlbGVtZW50XG5cdGVsZW0uZGV0YWNoKCk7XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG5cbi8qKlxuICogVHJ5IHRvIGRldGVybWluZSB0aGUgZGVmYXVsdCBkaXNwbGF5IHZhbHVlIG9mIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZVxuICovXG5mdW5jdGlvbiBkZWZhdWx0RGlzcGxheSggbm9kZU5hbWUgKSB7XG5cdHZhciBkb2MgPSBkb2N1bWVudCxcblx0XHRkaXNwbGF5ID0gZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF07XG5cblx0aWYgKCAhZGlzcGxheSApIHtcblx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXG5cdFx0Ly8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsIHJlYWQgZnJvbSBpbnNpZGUgYW4gaWZyYW1lXG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiB8fCAhZGlzcGxheSApIHtcblxuXHRcdFx0Ly8gVXNlIHRoZSBhbHJlYWR5LWNyZWF0ZWQgaWZyYW1lIGlmIHBvc3NpYmxlXG5cdFx0XHRpZnJhbWUgPSAoaWZyYW1lIHx8IGpRdWVyeSggXCI8aWZyYW1lIGZyYW1lYm9yZGVyPScwJyB3aWR0aD0nMCcgaGVpZ2h0PScwJy8+XCIgKSkuYXBwZW5kVG8oIGRvYy5kb2N1bWVudEVsZW1lbnQgKTtcblxuXHRcdFx0Ly8gQWx3YXlzIHdyaXRlIGEgbmV3IEhUTUwgc2tlbGV0b24gc28gV2Via2l0IGFuZCBGaXJlZm94IGRvbid0IGNob2tlIG9uIHJldXNlXG5cdFx0XHRkb2MgPSBpZnJhbWVbIDAgXS5jb250ZW50RG9jdW1lbnQ7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFXG5cdFx0XHRkb2Mud3JpdGUoKTtcblx0XHRcdGRvYy5jbG9zZSgpO1xuXG5cdFx0XHRkaXNwbGF5ID0gYWN0dWFsRGlzcGxheSggbm9kZU5hbWUsIGRvYyApO1xuXHRcdFx0aWZyYW1lLmRldGFjaCgpO1xuXHRcdH1cblxuXHRcdC8vIFN0b3JlIHRoZSBjb3JyZWN0IGRlZmF1bHQgZGlzcGxheVxuXHRcdGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdID0gZGlzcGxheTtcblx0fVxuXG5cdHJldHVybiBkaXNwbGF5O1xufVxudmFyIHJtYXJnaW4gPSAoL15tYXJnaW4vKTtcblxudmFyIHJudW1ub25weCA9IG5ldyBSZWdFeHAoIFwiXihcIiArIHBudW0gKyBcIikoPyFweClbYS16JV0rJFwiLCBcImlcIiApO1xuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtLCBudWxsICk7XG5cdH07XG5cblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFOVxuXHQvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG9ubHkgbmVlZGVkIGZvciAuY3NzKCdmaWx0ZXInKSBpbiBJRTksIHNlZSAjMTI1Mzdcblx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRyZXQgPSBjb21wdXRlZC5nZXRQcm9wZXJ0eVZhbHVlKCBuYW1lICkgfHwgY29tcHV0ZWRbIG5hbWUgXTtcblx0fVxuXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IGlPUyA8IDZcblx0XHQvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG5cdFx0Ly8gaU9TIDwgNiAoYXQgbGVhc3QpIHJldHVybnMgcGVyY2VudGFnZSBmb3IgYSBsYXJnZXIgc2V0IG9mIHZhbHVlcywgYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVsc1xuXHRcdC8vIHRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzogaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG5cdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0bWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcblx0XHRcdG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cblx0XHRcdC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG5cdFx0XHQvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkID9cblx0XHQvLyBTdXBwb3J0OiBJRVxuXHRcdC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG5cdFx0cmV0ICsgXCJcIiA6XG5cdFx0cmV0O1xufVxuXG5cbmZ1bmN0aW9uIGFkZEdldEhvb2tJZiggY29uZGl0aW9uRm4sIGhvb2tGbiApIHtcblx0Ly8gRGVmaW5lIHRoZSBob29rLCB3ZSdsbCBjaGVjayBvbiB0aGUgZmlyc3QgcnVuIGlmIGl0J3MgcmVhbGx5IG5lZWRlZC5cblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBjb25kaXRpb25GbigpICkge1xuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWUgdG8gbWlzc2luZyBkZXBlbmRlbmN5KSxcblx0XHRcdFx0Ly8gcmVtb3ZlIGl0LlxuXHRcdFx0XHQvLyBTaW5jZSB0aGVyZSBhcmUgbm8gb3RoZXIgaG9va3MgZm9yIG1hcmdpblJpZ2h0LCByZW1vdmUgdGhlIHdob2xlIG9iamVjdC5cblx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhvb2sgbmVlZGVkOyByZWRlZmluZSBpdCBzbyB0aGF0IHRoZSBzdXBwb3J0IHRlc3QgaXMgbm90IGV4ZWN1dGVkIGFnYWluLlxuXG5cdFx0XHRyZXR1cm4gKHRoaXMuZ2V0ID0gaG9va0ZuKS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fVxuXHR9O1xufVxuXG5cbihmdW5jdGlvbigpIHtcblx0dmFyIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLFxuXHRcdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuXHRpZiAoICFkaXYuc3R5bGUgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweDttYXJnaW4tdG9wOjFweDtcIiArXG5cdFx0XCJwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlUGl4ZWxQb3NpdGlvbkFuZEJveFNpemluZ1JlbGlhYmxlKCkge1xuXHRcdGRpdi5zdHlsZS5jc3NUZXh0ID1cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG5cdFx0XHQvLyBWZW5kb3ItcHJlZml4IGJveC1zaXppbmdcblx0XHRcdFwiLXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuXHRcdFx0XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7ZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjElO3RvcDoxJTtcIiArXG5cdFx0XHRcImJvcmRlcjoxcHg7cGFkZGluZzoxcHg7d2lkdGg6NHB4O3Bvc2l0aW9uOmFic29sdXRlXCI7XG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHR2YXIgZGl2U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZGl2LCBudWxsICk7XG5cdFx0cGl4ZWxQb3NpdGlvblZhbCA9IGRpdlN0eWxlLnRvcCAhPT0gXCIxJVwiO1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGggPT09IFwiNHB4XCI7XG5cblx0XHRkb2NFbGVtLnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IG5vZGUuanMganNkb21cblx0Ly8gRG9uJ3QgYXNzdW1lIHRoYXQgZ2V0Q29tcHV0ZWRTdHlsZSBpcyBhIHByb3BlcnR5IG9mIHRoZSBnbG9iYWwgb2JqZWN0XG5cdGlmICggd2luZG93LmdldENvbXB1dGVkU3R5bGUgKSB7XG5cdFx0alF1ZXJ5LmV4dGVuZCggc3VwcG9ydCwge1xuXHRcdFx0cGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFRoaXMgdGVzdCBpcyBleGVjdXRlZCBvbmx5IG9uY2UgYnV0IHdlIHN0aWxsIGRvIG1lbW9pemluZ1xuXHRcdFx0XHQvLyBzaW5jZSB3ZSBjYW4gdXNlIHRoZSBib3hTaXppbmdSZWxpYWJsZSBwcmUtY29tcHV0aW5nLlxuXHRcdFx0XHQvLyBObyBuZWVkIHRvIGNoZWNrIGlmIHRoZSB0ZXN0IHdhcyBhbHJlYWR5IHBlcmZvcm1lZCwgdGhvdWdoLlxuXHRcdFx0XHRjb21wdXRlUGl4ZWxQb3NpdGlvbkFuZEJveFNpemluZ1JlbGlhYmxlKCk7XG5cdFx0XHRcdHJldHVybiBwaXhlbFBvc2l0aW9uVmFsO1xuXHRcdFx0fSxcblx0XHRcdGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBib3hTaXppbmdSZWxpYWJsZVZhbCA9PSBudWxsICkge1xuXHRcdFx0XHRcdGNvbXB1dGVQaXhlbFBvc2l0aW9uQW5kQm94U2l6aW5nUmVsaWFibGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG5cdFx0XHR9LFxuXHRcdFx0cmVsaWFibGVNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG5cdFx0XHRcdC8vIENoZWNrIGlmIGRpdiB3aXRoIGV4cGxpY2l0IHdpZHRoIGFuZCBubyBtYXJnaW4tcmlnaHQgaW5jb3JyZWN0bHlcblx0XHRcdFx0Ly8gZ2V0cyBjb21wdXRlZCBtYXJnaW4tcmlnaHQgYmFzZWQgb24gd2lkdGggb2YgY29udGFpbmVyLiAoIzMzMzMpXG5cdFx0XHRcdC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuXHRcdFx0XHQvLyBUaGlzIHN1cHBvcnQgZnVuY3Rpb24gaXMgb25seSBleGVjdXRlZCBvbmNlIHNvIG5vIG1lbW9pemluZyBpcyBuZWVkZWQuXG5cdFx0XHRcdHZhciByZXQsXG5cdFx0XHRcdFx0bWFyZ2luRGl2ID0gZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBSZXNldCBDU1M6IGJveC1zaXppbmc7IGRpc3BsYXk7IG1hcmdpbjsgYm9yZGVyOyBwYWRkaW5nXG5cdFx0XHRcdG1hcmdpbkRpdi5zdHlsZS5jc3NUZXh0ID0gZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjksIEFuZHJvaWQgMi4zXG5cdFx0XHRcdFx0Ly8gVmVuZG9yLXByZWZpeCBib3gtc2l6aW5nXG5cdFx0XHRcdFx0XCItd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O1wiICtcblx0XHRcdFx0XHRcImJveC1zaXppbmc6Y29udGVudC1ib3g7ZGlzcGxheTpibG9jazttYXJnaW46MDtib3JkZXI6MDtwYWRkaW5nOjBcIjtcblx0XHRcdFx0bWFyZ2luRGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gbWFyZ2luRGl2LnN0eWxlLndpZHRoID0gXCIwXCI7XG5cdFx0XHRcdGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XG5cdFx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0XHRcdHJldCA9ICFwYXJzZUZsb2F0KCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggbWFyZ2luRGl2LCBudWxsICkubWFyZ2luUmlnaHQgKTtcblxuXHRcdFx0XHRkb2NFbGVtLnJlbW92ZUNoaWxkKCBjb250YWluZXIgKTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KSgpO1xuXG5cbi8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnMuXG5qUXVlcnkuc3dhcCA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncyApIHtcblx0dmFyIHJldCwgbmFtZSxcblx0XHRvbGQgPSB7fTtcblxuXHQvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcblx0fVxuXG5cdHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XG5cblx0Ly8gUmV2ZXJ0IHRoZSBvbGQgdmFsdWVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvbGRbIG5hbWUgXTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cbnZhclxuXHQvLyBzd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBzZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXHRybnVtc3BsaXQgPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKC4qKSRcIiwgXCJpXCIgKSxcblx0cnJlbE51bSA9IG5ldyBSZWdFeHAoIFwiXihbKy1dKT0oXCIgKyBwbnVtICsgXCIpXCIsIFwiaVwiICksXG5cblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiT1wiLCBcIk1velwiLCBcIm1zXCIgXTtcblxuLy8gcmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBuYW1lICkge1xuXG5cdC8vIHNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBzdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIGNoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLFxuXHRcdG9yaWdOYW1lID0gbmFtZSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3JpZ05hbWU7XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cdHZhciBtYXRjaGVzID0gcm51bXNwbGl0LmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAxIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAyIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG5cdHZhciBpID0gZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSA/XG5cdFx0Ly8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG5cdFx0NCA6XG5cdFx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHRcdG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXG5cdFx0dmFsID0gMDtcblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cdFx0Ly8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0JvcmRlckJveCApIHtcblx0XHRcdC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuXHRcdFx0aWYgKCBleHRyYSA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBhdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcblx0dmFyIHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxuXHRcdHZhbCA9IG5hbWUgPT09IFwid2lkdGhcIiA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodCxcblx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cblx0Ly8gc29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG5cdC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuXHQvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2Njhcblx0aWYgKCB2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHQvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3Nhcnlcblx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdGlmICggdmFsIDwgMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdHZhbCA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuXHRcdGlmICggcm51bW5vbnB4LnRlc3QodmFsKSApIHtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXG5cdFx0Ly8gd2UgbmVlZCB0aGUgY2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0XHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmXG5cdFx0XHQoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG5cdFx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHRcdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cdH1cblxuXHQvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0ZWxlbSxcblx0XHRcdG5hbWUsXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdFx0c3R5bGVzXG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG5cdHZhciBkaXNwbGF5LCBlbGVtLCBoaWRkZW4sXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFsdWVzWyBpbmRleCBdID0gZGF0YV9wcml2LmdldCggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKTtcblx0XHRkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5O1xuXHRcdGlmICggc2hvdyApIHtcblx0XHRcdC8vIFJlc2V0IHRoZSBpbmxpbmUgZGlzcGxheSBvZiB0aGlzIGVsZW1lbnQgdG8gbGVhcm4gaWYgaXQgaXNcblx0XHRcdC8vIGJlaW5nIGhpZGRlbiBieSBjYXNjYWRlZCBydWxlcyBvciBub3Rcblx0XHRcdGlmICggIXZhbHVlc1sgaW5kZXggXSAmJiBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGVsZW1lbnRzIHdoaWNoIGhhdmUgYmVlbiBvdmVycmlkZGVuIHdpdGggZGlzcGxheTogbm9uZVxuXHRcdFx0Ly8gaW4gYSBzdHlsZXNoZWV0IHRvIHdoYXRldmVyIHRoZSBkZWZhdWx0IGJyb3dzZXIgc3R5bGUgaXNcblx0XHRcdC8vIGZvciBzdWNoIGFuIGVsZW1lbnRcblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGRhdGFfcHJpdi5hY2Nlc3MoIGVsZW0sIFwib2xkZGlzcGxheVwiLCBkZWZhdWx0RGlzcGxheShlbGVtLm5vZGVOYW1lKSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRoaWRkZW4gPSBpc0hpZGRlbiggZWxlbSApO1xuXG5cdFx0XHRpZiAoIGRpc3BsYXkgIT09IFwibm9uZVwiIHx8ICFoaWRkZW4gKSB7XG5cdFx0XHRcdGRhdGFfcHJpdi5zZXQoIGVsZW0sIFwib2xkZGlzcGxheVwiLCBoaWRkZW4gPyBkaXNwbGF5IDogalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgZGlzcGxheSBvZiBtb3N0IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wXG5cdC8vIHRvIGF2b2lkIHRoZSBjb25zdGFudCByZWZsb3dcblx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG5cdFx0aWYgKCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRpZiAoICFzaG93IHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/IHZhbHVlc1sgaW5kZXggXSB8fCBcIlwiIDogXCJub25lXCI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblx0Ly8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG5cdC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuXHRjc3NIb29rczoge1xuXHRcdG9wYWNpdHk6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG5cdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcblx0Y3NzTnVtYmVyOiB7XG5cdFx0XCJjb2x1bW5Db3VudFwiOiB0cnVlLFxuXHRcdFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcImZsZXhHcm93XCI6IHRydWUsXG5cdFx0XCJmbGV4U2hyaW5rXCI6IHRydWUsXG5cdFx0XCJmb250V2VpZ2h0XCI6IHRydWUsXG5cdFx0XCJsaW5lSGVpZ2h0XCI6IHRydWUsXG5cdFx0XCJvcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJvcmRlclwiOiB0cnVlLFxuXHRcdFwib3JwaGFuc1wiOiB0cnVlLFxuXHRcdFwid2lkb3dzXCI6IHRydWUsXG5cdFx0XCJ6SW5kZXhcIjogdHJ1ZSxcblx0XHRcInpvb21cIjogdHJ1ZVxuXHR9LFxuXG5cdC8vIEFkZCBpbiBwcm9wZXJ0aWVzIHdob3NlIG5hbWVzIHlvdSB3aXNoIHRvIGZpeCBiZWZvcmVcblx0Ly8gc2V0dGluZyBvciBnZXR0aW5nIHRoZSB2YWx1ZVxuXHRjc3NQcm9wczoge1xuXHRcdC8vIG5vcm1hbGl6ZSBmbG9hdCBjc3MgcHJvcGVydHlcblx0XHRcImZsb2F0XCI6IFwiY3NzRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8ICggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBvcmlnTmFtZSApICk7XG5cblx0XHQvLyBnZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uXG5cdFx0Ly8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdFx0Ly8gY29udmVydCByZWxhdGl2ZSBudW1iZXIgc3RyaW5ncyAoKz0gb3IgLT0pIHRvIHJlbGF0aXZlIG51bWJlcnMuICM3MzQ1XG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHJldCA9IHJyZWxOdW0uZXhlYyggdmFsdWUgKSkgKSB7XG5cdFx0XHRcdHZhbHVlID0gKCByZXRbMV0gKyAxICkgKiByZXRbMl0gKyBwYXJzZUZsb2F0KCBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICkgKTtcblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQuIFNlZTogIzcxMTZcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBudW1iZXIgd2FzIHBhc3NlZCBpbiwgYWRkICdweCcgdG8gdGhlIChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgJiYgIWpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gKSB7XG5cdFx0XHRcdHZhbHVlICs9IFwicHhcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRml4ZXMgIzg5MDgsIGl0IGNhbiBiZSBkb25lIG1vcmUgY29ycmVjdGx5IGJ5IHNwZWNpZnlpbmcgc2V0dGVycyBpbiBjc3NIb29rcyxcblx0XHRcdC8vIGJ1dCBpdCB3b3VsZCBtZWFuIHRvIGRlZmluZSBlaWdodCAoZm9yIGV2ZXJ5IHByb2JsZW1hdGljIHByb3BlcnR5KSBpZGVudGljYWwgZnVuY3Rpb25zXG5cdFx0XHRpZiAoICFzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSAmJiB2YWx1ZSA9PT0gXCJcIiAmJiBuYW1lLmluZGV4T2YoIFwiYmFja2dyb3VuZFwiICkgPT09IDAgKSB7XG5cdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSBcImluaGVyaXRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCwgdXNlIHRoYXQgdmFsdWUsIG90aGVyd2lzZSBqdXN0IHNldCB0aGUgc3BlY2lmaWVkIHZhbHVlXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8ICh2YWx1ZSA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIGV4dHJhICkpICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHwgKCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggZWxlbS5zdHlsZSwgb3JpZ05hbWUgKSApO1xuXG5cdFx0Ly8gZ2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvblxuXHRcdC8vIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG5cdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly9jb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiwgY29udmVydGluZyB0byBudW1iZXIgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcblx0XHRpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgalF1ZXJ5LmlzTnVtZXJpYyggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHQvLyBjZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cblx0XHRcdFx0Ly8gaG93ZXZlciwgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdCBmcm9tIHRoaXNcblx0XHRcdFx0cmV0dXJuIHJkaXNwbGF5c3dhcC50ZXN0KCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICkgJiYgZWxlbS5vZmZzZXRXaWR0aCA9PT0gMCA/XG5cdFx0XHRcdFx0alF1ZXJ5LnN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcblx0XHRcdHZhciBzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIGV4dHJhID9cblx0XHRcdFx0YXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCkgOiAwXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBBbmRyb2lkIDIuM1xualF1ZXJ5LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQsXG5cdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0Ly8gV2ViS2l0IEJ1ZyAxMzM0MyAtIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyB3cm9uZyB2YWx1ZSBmb3IgbWFyZ2luLXJpZ2h0XG5cdFx0XHQvLyBXb3JrIGFyb3VuZCBieSB0ZW1wb3JhcmlseSBzZXR0aW5nIGVsZW1lbnQgZGlzcGxheSB0byBpbmxpbmUtYmxvY2tcblx0XHRcdHJldHVybiBqUXVlcnkuc3dhcCggZWxlbSwgeyBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIiB9LFxuXHRcdFx0XHRjdXJDU1MsIFsgZWxlbSwgXCJtYXJnaW5SaWdodFwiIF0gKTtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKHtcblx0bWFyZ2luOiBcIlwiLFxuXHRwYWRkaW5nOiBcIlwiLFxuXHRib3JkZXI6IFwiV2lkdGhcIlxufSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdID0ge1xuXHRcdGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGkgPSAwLFxuXHRcdFx0XHRleHBhbmRlZCA9IHt9LFxuXG5cdFx0XHRcdC8vIGFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuXHRcdFx0XHRwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KFwiIFwiKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcblx0fVxufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdFx0bGVuID0gbmFtZS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0bWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0fSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cdHNob3c6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcywgdHJ1ZSApO1xuXHR9LFxuXHRoaWRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcblx0fSxcblx0dG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBpc0hpZGRlbiggdGhpcyApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5cbmZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcblx0cmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdCggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKTtcbn1cbmpRdWVyeS5Ud2VlbiA9IFR3ZWVuO1xuXG5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUd2Vlbixcblx0aW5pdDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nLCB1bml0ICkge1xuXHRcdHRoaXMuZWxlbSA9IGVsZW07XG5cdFx0dGhpcy5wcm9wID0gcHJvcDtcblx0XHR0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBcInN3aW5nXCI7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuXHRcdHRoaXMuZW5kID0gZW5kO1xuXHRcdHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdH0sXG5cdGN1cjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuXHRcdFx0aG9va3MuZ2V0KCB0aGlzICkgOlxuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuXHR9LFxuXHRydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuXHRcdHZhciBlYXNlZCxcblx0XHRcdGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG5cdFx0XHRcdHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG5cdFx0fVxuXHRcdHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG5cdFx0XHRob29rcy5zZXQoIHRoaXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG5cdF9kZWZhdWx0OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHRpZiAoIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSAhPSBudWxsICYmXG5cdFx0XHRcdCghdHdlZW4uZWxlbS5zdHlsZSB8fCB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCkgKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhc3NpbmcgYW4gZW1wdHkgc3RyaW5nIGFzIGEgM3JkIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxuXHRcdFx0Ly8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlsc1xuXHRcdFx0Ly8gc28sIHNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0LlxuXHRcdFx0Ly8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcyBpcy5cblx0XHRcdHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIFwiXCIgKTtcblx0XHRcdC8vIEVtcHR5IHN0cmluZ3MsIG51bGwsIHVuZGVmaW5lZCBhbmQgXCJhdXRvXCIgYXJlIGNvbnZlcnRlZCB0byAwLlxuXHRcdFx0cmV0dXJuICFyZXN1bHQgfHwgcmVzdWx0ID09PSBcImF1dG9cIiA/IDAgOiByZXN1bHQ7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRcdC8vIHVzZSBzdGVwIGhvb2sgZm9yIGJhY2sgY29tcGF0IC0gdXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlIC0gdXNlIC5zdHlsZSBpZiBpdHNcblx0XHRcdC8vIGF2YWlsYWJsZSBhbmQgdXNlIHBsYWluIHByb3BlcnRpZXMgd2hlcmUgYXZhaWxhYmxlXG5cdFx0XHRpZiAoIGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0gKSB7XG5cdFx0XHRcdGpRdWVyeS5meC5zdGVwWyB0d2Vlbi5wcm9wIF0oIHR3ZWVuICk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0d2Vlbi5lbGVtLnN0eWxlICYmICggdHdlZW4uZWxlbS5zdHlsZVsgalF1ZXJ5LmNzc1Byb3BzWyB0d2Vlbi5wcm9wIF0gXSAhPSBudWxsIHx8IGpRdWVyeS5jc3NIb29rc1sgdHdlZW4ucHJvcCBdICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgdHdlZW4ubm93ICsgdHdlZW4udW5pdCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuLy8gU3VwcG9ydDogSUU5XG4vLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblxuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmVhc2luZyA9IHtcblx0bGluZWFyOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gcDtcblx0fSxcblx0c3dpbmc6IGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiAwLjUgLSBNYXRoLmNvcyggcCAqIE1hdGguUEkgKSAvIDI7XG5cdH1cbn07XG5cbmpRdWVyeS5meCA9IFR3ZWVuLnByb3RvdHlwZS5pbml0O1xuXG4vLyBCYWNrIENvbXBhdCA8MS44IGV4dGVuc2lvbiBwb2ludFxualF1ZXJ5LmZ4LnN0ZXAgPSB7fTtcblxuXG5cblxudmFyXG5cdGZ4Tm93LCB0aW1lcklkLFxuXHRyZnh0eXBlcyA9IC9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxcblx0cmZ4bnVtID0gbmV3IFJlZ0V4cCggXCJeKD86KFsrLV0pPXwpKFwiICsgcG51bSArIFwiKShbYS16JV0qKSRcIiwgXCJpXCIgKSxcblx0cnJ1biA9IC9xdWV1ZUhvb2tzJC8sXG5cdGFuaW1hdGlvblByZWZpbHRlcnMgPSBbIGRlZmF1bHRQcmVmaWx0ZXIgXSxcblx0dHdlZW5lcnMgPSB7XG5cdFx0XCIqXCI6IFsgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKSxcblx0XHRcdFx0dGFyZ2V0ID0gdHdlZW4uY3VyKCksXG5cdFx0XHRcdHBhcnRzID0gcmZ4bnVtLmV4ZWMoIHZhbHVlICksXG5cdFx0XHRcdHVuaXQgPSBwYXJ0cyAmJiBwYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0XHRcdC8vIFN0YXJ0aW5nIHZhbHVlIGNvbXB1dGF0aW9uIGlzIHJlcXVpcmVkIGZvciBwb3RlbnRpYWwgdW5pdCBtaXNtYXRjaGVzXG5cdFx0XHRcdHN0YXJ0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICt0YXJnZXQgKSAmJlxuXHRcdFx0XHRcdHJmeG51bS5leGVjKCBqUXVlcnkuY3NzKCB0d2Vlbi5lbGVtLCBwcm9wICkgKSxcblx0XHRcdFx0c2NhbGUgPSAxLFxuXHRcdFx0XHRtYXhJdGVyYXRpb25zID0gMjA7XG5cblx0XHRcdGlmICggc3RhcnQgJiYgc3RhcnRbIDMgXSAhPT0gdW5pdCApIHtcblx0XHRcdFx0Ly8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuXHRcdFx0XHR1bml0ID0gdW5pdCB8fCBzdGFydFsgMyBdO1xuXG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cblx0XHRcdFx0cGFydHMgPSBwYXJ0cyB8fCBbXTtcblxuXHRcdFx0XHQvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuXHRcdFx0XHRzdGFydCA9ICt0YXJnZXQgfHwgMTtcblxuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0Ly8gSWYgcHJldmlvdXMgaXRlcmF0aW9uIHplcm9lZCBvdXQsIGRvdWJsZSB1bnRpbCB3ZSBnZXQgKnNvbWV0aGluZypcblx0XHRcdFx0XHQvLyBVc2UgYSBzdHJpbmcgZm9yIGRvdWJsaW5nIGZhY3RvciBzbyB3ZSBkb24ndCBhY2NpZGVudGFsbHkgc2VlIHNjYWxlIGFzIHVuY2hhbmdlZCBiZWxvd1xuXHRcdFx0XHRcdHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHRcdFx0Ly8gQWRqdXN0IGFuZCBhcHBseVxuXHRcdFx0XHRcdHN0YXJ0ID0gc3RhcnQgLyBzY2FsZTtcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHByb3AsIHN0YXJ0ICsgdW5pdCApO1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG5cdFx0XHRcdC8vIEFuZCBicmVha2luZyB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoXG5cdFx0XHRcdH0gd2hpbGUgKCBzY2FsZSAhPT0gKHNjYWxlID0gdHdlZW4uY3VyKCkgLyB0YXJnZXQpICYmIHNjYWxlICE9PSAxICYmIC0tbWF4SXRlcmF0aW9ucyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgdHdlZW4gcHJvcGVydGllc1xuXHRcdFx0aWYgKCBwYXJ0cyApIHtcblx0XHRcdFx0c3RhcnQgPSB0d2Vlbi5zdGFydCA9ICtzdGFydCB8fCArdGFyZ2V0IHx8IDA7XG5cdFx0XHRcdHR3ZWVuLnVuaXQgPSB1bml0O1xuXHRcdFx0XHQvLyBJZiBhICs9Ly09IHRva2VuIHdhcyBwcm92aWRlZCwgd2UncmUgZG9pbmcgYSByZWxhdGl2ZSBhbmltYXRpb25cblx0XHRcdFx0dHdlZW4uZW5kID0gcGFydHNbIDEgXSA/XG5cdFx0XHRcdFx0c3RhcnQgKyAoIHBhcnRzWyAxIF0gKyAxICkgKiBwYXJ0c1sgMiBdIDpcblx0XHRcdFx0XHQrcGFydHNbIDIgXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH0gXVxuXHR9O1xuXG4vLyBBbmltYXRpb25zIGNyZWF0ZWQgc3luY2hyb25vdXNseSB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XG5mdW5jdGlvbiBjcmVhdGVGeE5vdygpIHtcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRmeE5vdyA9IHVuZGVmaW5lZDtcblx0fSk7XG5cdHJldHVybiAoIGZ4Tm93ID0galF1ZXJ5Lm5vdygpICk7XG59XG5cbi8vIEdlbmVyYXRlIHBhcmFtZXRlcnMgdG8gY3JlYXRlIGEgc3RhbmRhcmQgYW5pbWF0aW9uXG5mdW5jdGlvbiBnZW5GeCggdHlwZSwgaW5jbHVkZVdpZHRoICkge1xuXHR2YXIgd2hpY2gsXG5cdFx0aSA9IDAsXG5cdFx0YXR0cnMgPSB7IGhlaWdodDogdHlwZSB9O1xuXG5cdC8vIGlmIHdlIGluY2x1ZGUgd2lkdGgsIHN0ZXAgdmFsdWUgaXMgMSB0byBkbyBhbGwgY3NzRXhwYW5kIHZhbHVlcyxcblx0Ly8gaWYgd2UgZG9uJ3QgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuXHRpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcblx0Zm9yICggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcblx0XHR3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuXHRcdGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuXHR9XG5cblx0aWYgKCBpbmNsdWRlV2lkdGggKSB7XG5cdFx0YXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcblx0fVxuXG5cdHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHdlZW4oIHZhbHVlLCBwcm9wLCBhbmltYXRpb24gKSB7XG5cdHZhciB0d2Vlbixcblx0XHRjb2xsZWN0aW9uID0gKCB0d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCB0d2VlbmVyc1sgXCIqXCIgXSApLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoICh0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApKSApIHtcblxuXHRcdFx0Ly8gd2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cblx0dmFyIHByb3AsIHZhbHVlLCB0b2dnbGUsIHR3ZWVuLCBob29rcywgb2xkZmlyZSwgZGlzcGxheSwgY2hlY2tEaXNwbGF5LFxuXHRcdGFuaW0gPSB0aGlzLFxuXHRcdG9yaWcgPSB7fSxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0aGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbiggZWxlbSApLFxuXHRcdGRhdGFTaG93ID0gZGF0YV9wcml2LmdldCggZWxlbSwgXCJmeHNob3dcIiApO1xuXG5cdC8vIGhhbmRsZSBxdWV1ZTogZmFsc2UgcHJvbWlzZXNcblx0aWYgKCAhb3B0cy5xdWV1ZSApIHtcblx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgXCJmeFwiICk7XG5cdFx0aWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xuXHRcdFx0aG9va3MudW5xdWV1ZWQgPSAwO1xuXHRcdFx0b2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG5cdFx0XHRob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggIWhvb2tzLnVucXVldWVkICkge1xuXHRcdFx0XHRcdG9sZGZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aG9va3MudW5xdWV1ZWQrKztcblxuXHRcdGFuaW0uYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gZG9pbmcgdGhpcyBtYWtlcyBzdXJlIHRoYXQgdGhlIGNvbXBsZXRlIGhhbmRsZXIgd2lsbCBiZSBjYWxsZWRcblx0XHRcdC8vIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuXHRcdFx0YW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGhvb2tzLnVucXVldWVkLS07XG5cdFx0XHRcdGlmICggIWpRdWVyeS5xdWV1ZSggZWxlbSwgXCJmeFwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBoZWlnaHQvd2lkdGggb3ZlcmZsb3cgcGFzc1xuXHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcImhlaWdodFwiIGluIHByb3BzIHx8IFwid2lkdGhcIiBpbiBwcm9wcyApICkge1xuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IG5vdGhpbmcgc25lYWtzIG91dFxuXHRcdC8vIFJlY29yZCBhbGwgMyBvdmVyZmxvdyBhdHRyaWJ1dGVzIGJlY2F1c2UgSUU5LTEwIGRvIG5vdFxuXHRcdC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxuXHRcdC8vIG92ZXJmbG93WSBhcmUgc2V0IHRvIHRoZSBzYW1lIHZhbHVlXG5cdFx0b3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cblx0XHQvLyBTZXQgZGlzcGxheSBwcm9wZXJ0eSB0byBpbmxpbmUtYmxvY2sgZm9yIGhlaWdodC93aWR0aFxuXHRcdC8vIGFuaW1hdGlvbnMgb24gaW5saW5lIGVsZW1lbnRzIHRoYXQgYXJlIGhhdmluZyB3aWR0aC9oZWlnaHQgYW5pbWF0ZWRcblx0XHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblxuXHRcdC8vIFRlc3QgZGVmYXVsdCBkaXNwbGF5IGlmIGRpc3BsYXkgaXMgY3VycmVudGx5IFwibm9uZVwiXG5cdFx0Y2hlY2tEaXNwbGF5ID0gZGlzcGxheSA9PT0gXCJub25lXCIgP1xuXHRcdFx0ZGF0YV9wcml2LmdldCggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKSB8fCBkZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApIDogZGlzcGxheTtcblxuXHRcdGlmICggY2hlY2tEaXNwbGF5ID09PSBcImlubGluZVwiICYmIGpRdWVyeS5jc3MoIGVsZW0sIFwiZmxvYXRcIiApID09PSBcIm5vbmVcIiApIHtcblx0XHRcdHN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuXHRcdH1cblx0fVxuXG5cdGlmICggb3B0cy5vdmVyZmxvdyApIHtcblx0XHRzdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cdFx0YW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRzdHlsZS5vdmVyZmxvdyA9IG9wdHMub3ZlcmZsb3dbIDAgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbIDEgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WSA9IG9wdHMub3ZlcmZsb3dbIDIgXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIHNob3cvaGlkZSBwYXNzXG5cdGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG5cdFx0dmFsdWUgPSBwcm9wc1sgcHJvcCBdO1xuXHRcdGlmICggcmZ4dHlwZXMuZXhlYyggdmFsdWUgKSApIHtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xuXHRcdFx0dG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgZGF0YVNob3cgbGVmdCBvdmVyIGZyb20gYSBzdG9wcGVkIGhpZGUgb3Igc2hvdyBhbmQgd2UgYXJlIGdvaW5nIHRvIHByb2NlZWQgd2l0aCBzaG93LCB3ZSBzaG91bGQgcHJldGVuZCB0byBiZSBoaWRkZW5cblx0XHRcdFx0aWYgKCB2YWx1ZSA9PT0gXCJzaG93XCIgJiYgZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XG5cblx0XHQvLyBBbnkgbm9uLWZ4IHZhbHVlIHN0b3BzIHVzIGZyb20gcmVzdG9yaW5nIHRoZSBvcmlnaW5hbCBkaXNwbGF5IHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpc3BsYXkgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcblx0XHRpZiAoIGRhdGFTaG93ICkge1xuXHRcdFx0aWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuXHRcdFx0XHRoaWRkZW4gPSBkYXRhU2hvdy5oaWRkZW47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGFTaG93ID0gZGF0YV9wcml2LmFjY2VzcyggZWxlbSwgXCJmeHNob3dcIiwge30gKTtcblx0XHR9XG5cblx0XHQvLyBzdG9yZSBzdGF0ZSBpZiBpdHMgdG9nZ2xlIC0gZW5hYmxlcyAuc3RvcCgpLnRvZ2dsZSgpIHRvIFwicmV2ZXJzZVwiXG5cdFx0aWYgKCB0b2dnbGUgKSB7XG5cdFx0XHRkYXRhU2hvdy5oaWRkZW4gPSAhaGlkZGVuO1xuXHRcdH1cblx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdGpRdWVyeSggZWxlbSApLnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YW5pbS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0YW5pbS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByb3A7XG5cblx0XHRcdGRhdGFfcHJpdi5yZW1vdmUoIGVsZW0sIFwiZnhzaG93XCIgKTtcblx0XHRcdGZvciAoIHByb3AgaW4gb3JpZyApIHtcblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBvcmlnWyBwcm9wIF0gKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHR0d2VlbiA9IGNyZWF0ZVR3ZWVuKCBoaWRkZW4gPyBkYXRhU2hvd1sgcHJvcCBdIDogMCwgcHJvcCwgYW5pbSApO1xuXG5cdFx0XHRpZiAoICEoIHByb3AgaW4gZGF0YVNob3cgKSApIHtcblx0XHRcdFx0ZGF0YVNob3dbIHByb3AgXSA9IHR3ZWVuLnN0YXJ0O1xuXHRcdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0XHR0d2Vlbi5lbmQgPSB0d2Vlbi5zdGFydDtcblx0XHRcdFx0XHR0d2Vlbi5zdGFydCA9IHByb3AgPT09IFwid2lkdGhcIiB8fCBwcm9wID09PSBcImhlaWdodFwiID8gMSA6IDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0Ly8gSWYgdGhpcyBpcyBhIG5vb3AgbGlrZSAuaGlkZSgpLmhpZGUoKSwgcmVzdG9yZSBhbiBvdmVyd3JpdHRlbiBkaXNwbGF5IHZhbHVlXG5cdH0gZWxzZSBpZiAoIChkaXNwbGF5ID09PSBcIm5vbmVcIiA/IGRlZmF1bHREaXNwbGF5KCBlbGVtLm5vZGVOYW1lICkgOiBkaXNwbGF5KSA9PT0gXCJpbmxpbmVcIiApIHtcblx0XHRzdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblx0fVxufVxuXG5mdW5jdGlvbiBwcm9wRmlsdGVyKCBwcm9wcywgc3BlY2lhbEVhc2luZyApIHtcblx0dmFyIGluZGV4LCBuYW1lLCBlYXNpbmcsIHZhbHVlLCBob29rcztcblxuXHQvLyBjYW1lbENhc2UsIHNwZWNpYWxFYXNpbmcgYW5kIGV4cGFuZCBjc3NIb29rIHBhc3Ncblx0Zm9yICggaW5kZXggaW4gcHJvcHMgKSB7XG5cdFx0bmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIGluZGV4ICk7XG5cdFx0ZWFzaW5nID0gc3BlY2lhbEVhc2luZ1sgbmFtZSBdO1xuXHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG5cdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdGVhc2luZyA9IHZhbHVlWyAxIF07XG5cdFx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcblx0XHR9XG5cblx0XHRpZiAoIGluZGV4ICE9PSBuYW1lICkge1xuXHRcdFx0cHJvcHNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuXHRcdH1cblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF07XG5cdFx0aWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsdWUgPSBob29rcy5leHBhbmQoIHZhbHVlICk7XG5cdFx0XHRkZWxldGUgcHJvcHNbIG5hbWUgXTtcblxuXHRcdFx0Ly8gbm90IHF1aXRlICQuZXh0ZW5kLCB0aGlzIHdvbnQgb3ZlcndyaXRlIGtleXMgYWxyZWFkeSBwcmVzZW50LlxuXHRcdFx0Ly8gYWxzbyAtIHJldXNpbmcgJ2luZGV4JyBmcm9tIGFib3ZlIGJlY2F1c2Ugd2UgaGF2ZSB0aGUgY29ycmVjdCBcIm5hbWVcIlxuXHRcdFx0Zm9yICggaW5kZXggaW4gdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggISggaW5kZXggaW4gcHJvcHMgKSApIHtcblx0XHRcdFx0XHRwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyBpbmRleCBdO1xuXHRcdFx0XHRcdHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3BlY2lhbEVhc2luZ1sgbmFtZSBdID0gZWFzaW5nO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBBbmltYXRpb24oIGVsZW0sIHByb3BlcnRpZXMsIG9wdGlvbnMgKSB7XG5cdHZhciByZXN1bHQsXG5cdFx0c3RvcHBlZCxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gYW5pbWF0aW9uUHJlZmlsdGVycy5sZW5ndGgsXG5cdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gZG9uJ3QgbWF0Y2ggZWxlbSBpbiB0aGUgOmFuaW1hdGVkIHNlbGVjdG9yXG5cdFx0XHRkZWxldGUgdGljay5lbGVtO1xuXHRcdH0pLFxuXHRcdHRpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdFx0cmVtYWluaW5nID0gTWF0aC5tYXgoIDAsIGFuaW1hdGlvbi5zdGFydFRpbWUgKyBhbmltYXRpb24uZHVyYXRpb24gLSBjdXJyZW50VGltZSApLFxuXHRcdFx0XHQvLyBhcmNoYWljIGNyYXNoIGJ1ZyB3b24ndCBhbGxvdyB1cyB0byB1c2UgMSAtICggMC41IHx8IDAgKSAoIzEyNDk3KVxuXHRcdFx0XHR0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gdGVtcCxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuXHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSk7XG5cblx0XHRcdGlmICggcGVyY2VudCA8IDEgJiYgbGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gcmVtYWluaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uIF0gKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSh7XG5cdFx0XHRlbGVtOiBlbGVtLFxuXHRcdFx0cHJvcHM6IGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wZXJ0aWVzICksXG5cdFx0XHRvcHRzOiBqUXVlcnkuZXh0ZW5kKCB0cnVlLCB7IHNwZWNpYWxFYXNpbmc6IHt9IH0sIG9wdGlvbnMgKSxcblx0XHRcdG9yaWdpbmFsUHJvcGVydGllczogcHJvcGVydGllcyxcblx0XHRcdG9yaWdpbmFsT3B0aW9uczogb3B0aW9ucyxcblx0XHRcdHN0YXJ0VGltZTogZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuXHRcdFx0dHdlZW5zOiBbXSxcblx0XHRcdGNyZWF0ZVR3ZWVuOiBmdW5jdGlvbiggcHJvcCwgZW5kICkge1xuXHRcdFx0XHR2YXIgdHdlZW4gPSBqUXVlcnkuVHdlZW4oIGVsZW0sIGFuaW1hdGlvbi5vcHRzLCBwcm9wLCBlbmQsXG5cdFx0XHRcdFx0XHRhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nWyBwcm9wIF0gfHwgYW5pbWF0aW9uLm9wdHMuZWFzaW5nICk7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnMucHVzaCggdHdlZW4gKTtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdFx0fSxcblx0XHRcdHN0b3A6IGZ1bmN0aW9uKCBnb3RvRW5kICkge1xuXHRcdFx0XHR2YXIgaW5kZXggPSAwLFxuXHRcdFx0XHRcdC8vIGlmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuXHRcdFx0XHRcdC8vIG90aGVyd2lzZSB3ZSBza2lwIHRoaXMgcGFydFxuXHRcdFx0XHRcdGxlbmd0aCA9IGdvdG9FbmQgPyBhbmltYXRpb24udHdlZW5zLmxlbmd0aCA6IDA7XG5cdFx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9wcGVkID0gdHJ1ZTtcblx0XHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWVcblx0XHRcdFx0Ly8gb3RoZXJ3aXNlLCByZWplY3Rcblx0XHRcdFx0aWYgKCBnb3RvRW5kICkge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0pLFxuXHRcdHByb3BzID0gYW5pbWF0aW9uLnByb3BzO1xuXG5cdHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XG5cblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0cmVzdWx0ID0gYW5pbWF0aW9uUHJlZmlsdGVyc1sgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIGVsZW0sIHByb3BzLCBhbmltYXRpb24ub3B0cyApO1xuXHRcdGlmICggcmVzdWx0ICkge1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFuaW1hdGlvbi5vcHRzLnN0YXJ0ICkgKSB7XG5cdFx0YW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG5cdH1cblxuXHRqUXVlcnkuZngudGltZXIoXG5cdFx0alF1ZXJ5LmV4dGVuZCggdGljaywge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdGFuaW06IGFuaW1hdGlvbixcblx0XHRcdHF1ZXVlOiBhbmltYXRpb24ub3B0cy5xdWV1ZVxuXHRcdH0pXG5cdCk7XG5cblx0Ly8gYXR0YWNoIGNhbGxiYWNrcyBmcm9tIG9wdGlvbnNcblx0cmV0dXJuIGFuaW1hdGlvbi5wcm9ncmVzcyggYW5pbWF0aW9uLm9wdHMucHJvZ3Jlc3MgKVxuXHRcdC5kb25lKCBhbmltYXRpb24ub3B0cy5kb25lLCBhbmltYXRpb24ub3B0cy5jb21wbGV0ZSApXG5cdFx0LmZhaWwoIGFuaW1hdGlvbi5vcHRzLmZhaWwgKVxuXHRcdC5hbHdheXMoIGFuaW1hdGlvbi5vcHRzLmFsd2F5cyApO1xufVxuXG5qUXVlcnkuQW5pbWF0aW9uID0galF1ZXJ5LmV4dGVuZCggQW5pbWF0aW9uLCB7XG5cblx0dHdlZW5lcjogZnVuY3Rpb24oIHByb3BzLCBjYWxsYmFjayApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBwcm9wcyApICkge1xuXHRcdFx0Y2FsbGJhY2sgPSBwcm9wcztcblx0XHRcdHByb3BzID0gWyBcIipcIiBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm9wcyA9IHByb3BzLnNwbGl0KFwiIFwiKTtcblx0XHR9XG5cblx0XHR2YXIgcHJvcCxcblx0XHRcdGluZGV4ID0gMCxcblx0XHRcdGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdFx0cHJvcCA9IHByb3BzWyBpbmRleCBdO1xuXHRcdFx0dHdlZW5lcnNbIHByb3AgXSA9IHR3ZWVuZXJzWyBwcm9wIF0gfHwgW107XG5cdFx0XHR0d2VlbmVyc1sgcHJvcCBdLnVuc2hpZnQoIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9LFxuXG5cdHByZWZpbHRlcjogZnVuY3Rpb24oIGNhbGxiYWNrLCBwcmVwZW5kICkge1xuXHRcdGlmICggcHJlcGVuZCApIHtcblx0XHRcdGFuaW1hdGlvblByZWZpbHRlcnMudW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YW5pbWF0aW9uUHJlZmlsdGVycy5wdXNoKCBjYWxsYmFjayApO1xuXHRcdH1cblx0fVxufSk7XG5cbmpRdWVyeS5zcGVlZCA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBmbiApIHtcblx0dmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoIHt9LCBzcGVlZCApIDoge1xuXHRcdGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG5cdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggc3BlZWQgKSAmJiBzcGVlZCxcblx0XHRkdXJhdGlvbjogc3BlZWQsXG5cdFx0ZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgJiYgZWFzaW5nXG5cdH07XG5cblx0b3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID8gb3B0LmR1cmF0aW9uIDpcblx0XHRvcHQuZHVyYXRpb24gaW4galF1ZXJ5LmZ4LnNwZWVkcyA/IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdIDogalF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcblxuXHQvLyBub3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcblx0aWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG5cdFx0b3B0LnF1ZXVlID0gXCJmeFwiO1xuXHR9XG5cblx0Ly8gUXVldWVpbmdcblx0b3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcblxuXHRvcHQuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG5cdFx0XHRvcHQub2xkLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdC5xdWV1ZSApIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIG9wdDtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBzaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuICkuY3NzKCBcIm9wYWNpdHlcIiwgMCApLnNob3coKVxuXG5cdFx0XHQvLyBhbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcblx0XHRcdC5lbmQoKS5hbmltYXRlKHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fSxcblx0YW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wICksXG5cdFx0XHRvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG5cdFx0XHRkb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuXHRcdFx0XHR2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cblx0XHRcdFx0Ly8gRW1wdHkgYW5pbWF0aW9ucywgb3IgZmluaXNoaW5nIHJlc29sdmVzIGltbWVkaWF0ZWx5XG5cdFx0XHRcdGlmICggZW1wdHkgfHwgZGF0YV9wcml2LmdldCggdGhpcywgXCJmaW5pc2hcIiApICkge1xuXHRcdFx0XHRcdGFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9BbmltYXRpb24uZmluaXNoID0gZG9BbmltYXRpb247XG5cblx0XHRyZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG5cdFx0XHR0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuXHRcdFx0dGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcblx0XHR2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuXHRcdFx0dmFyIHN0b3AgPSBob29rcy5zdG9wO1xuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRzdG9wKCBnb3RvRW5kICk7XG5cdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRnb3RvRW5kID0gY2xlYXJRdWV1ZTtcblx0XHRcdGNsZWFyUXVldWUgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkZXF1ZXVlID0gdHJ1ZSxcblx0XHRcdFx0aW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRkYXRhID0gZGF0YV9wcml2LmdldCggdGhpcyApO1xuXG5cdFx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICkge1xuXHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpbmRleCBpbiBkYXRhICkge1xuXHRcdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgJiYgcnJ1bi50ZXN0KCBpbmRleCApICkge1xuXHRcdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiYgKHR5cGUgPT0gbnVsbCB8fCB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUpICkge1xuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcblx0XHRcdFx0XHRkZXF1ZXVlID0gZmFsc2U7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBzdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkXG5cdFx0XHQvLyB0aW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoIHdpbGwgZGVxdWV1ZVxuXHRcdFx0Ly8gYnV0IG9ubHkgaWYgdGhleSB3ZXJlIGdvdG9FbmRcblx0XHRcdGlmICggZGVxdWV1ZSB8fCAhZ290b0VuZCApIHtcblx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0ZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4LFxuXHRcdFx0XHRkYXRhID0gZGF0YV9wcml2LmdldCggdGhpcyApLFxuXHRcdFx0XHRxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcblx0XHRcdFx0aG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0bGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG5cdFx0XHQvLyBlbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG5cdFx0XHRkYXRhLmZpbmlzaCA9IHRydWU7XG5cblx0XHRcdC8vIGVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuXHRcdFx0alF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG5cdFx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG5cdFx0XHRcdGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBsb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gbG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuXHRcdFx0XHRcdHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gdHVybiBvZmYgZmluaXNoaW5nIGZsYWdcblx0XHRcdGRlbGV0ZSBkYXRhLmZpbmlzaDtcblx0XHR9KTtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbmpRdWVyeS5lYWNoKHtcblx0c2xpZGVEb3duOiBnZW5GeChcInNob3dcIiksXG5cdHNsaWRlVXA6IGdlbkZ4KFwiaGlkZVwiKSxcblx0c2xpZGVUb2dnbGU6IGdlbkZ4KFwidG9nZ2xlXCIpLFxuXHRmYWRlSW46IHsgb3BhY2l0eTogXCJzaG93XCIgfSxcblx0ZmFkZU91dDogeyBvcGFjaXR5OiBcImhpZGVcIiB9LFxuXHRmYWRlVG9nZ2xlOiB7IG9wYWNpdHk6IFwidG9nZ2xlXCIgfVxufSwgZnVuY3Rpb24oIG5hbWUsIHByb3BzICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5hbmltYXRlKCBwcm9wcywgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fTtcbn0pO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0aSA9IDAsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycztcblxuXHRmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblx0XHQvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxuXHRmeE5vdyA9IHVuZGVmaW5lZDtcbn07XG5cbmpRdWVyeS5meC50aW1lciA9IGZ1bmN0aW9uKCB0aW1lciApIHtcblx0alF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApO1xuXHRpZiAoIHRpbWVyKCkgKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0YXJ0KCk7XG5cdH0gZWxzZSB7XG5cdFx0alF1ZXJ5LnRpbWVycy5wb3AoKTtcblx0fVxufTtcblxualF1ZXJ5LmZ4LmludGVydmFsID0gMTM7XG5cbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoICF0aW1lcklkICkge1xuXHRcdHRpbWVySWQgPSBzZXRJbnRlcnZhbCggalF1ZXJ5LmZ4LnRpY2ssIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRjbGVhckludGVydmFsKCB0aW1lcklkICk7XG5cdHRpbWVySWQgPSBudWxsO1xufTtcblxualF1ZXJ5LmZ4LnNwZWVkcyA9IHtcblx0c2xvdzogNjAwLFxuXHRmYXN0OiAyMDAsXG5cdC8vIERlZmF1bHQgc3BlZWRcblx0X2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCBuZXh0LCB0aW1lICk7XG5cdFx0aG9va3Muc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0fTtcblx0fSk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcblx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICksXG5cdFx0c2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJzZWxlY3RcIiApLFxuXHRcdG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJvcHRpb25cIiApICk7XG5cblx0aW5wdXQudHlwZSA9IFwiY2hlY2tib3hcIjtcblxuXHQvLyBTdXBwb3J0OiBpT1MgNS4xLCBBbmRyb2lkIDQueCwgQW5kcm9pZCAyLjNcblx0Ly8gQ2hlY2sgdGhlIGRlZmF1bHQgY2hlY2tib3gvcmFkaW8gdmFsdWUgKFwiXCIgb24gb2xkIFdlYktpdDsgXCJvblwiIGVsc2V3aGVyZSlcblx0c3VwcG9ydC5jaGVja09uID0gaW5wdXQudmFsdWUgIT09IFwiXCI7XG5cblx0Ly8gTXVzdCBhY2Nlc3MgdGhlIHBhcmVudCB0byBtYWtlIGFuIG9wdGlvbiBzZWxlY3QgcHJvcGVybHlcblx0Ly8gU3VwcG9ydDogSUU5LCBJRTEwXG5cdHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIG9wdGlvbnMgaW5zaWRlIGRpc2FibGVkIHNlbGVjdHMgYXJlbid0IG1hcmtlZCBhcyBkaXNhYmxlZFxuXHQvLyAoV2ViS2l0IG1hcmtzIHRoZW0gYXMgZGlzYWJsZWQpXG5cdHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdHN1cHBvcnQub3B0RGlzYWJsZWQgPSAhb3B0LmRpc2FibGVkO1xuXG5cdC8vIENoZWNrIGlmIGFuIGlucHV0IG1haW50YWlucyBpdHMgdmFsdWUgYWZ0ZXIgYmVjb21pbmcgYSByYWRpb1xuXHQvLyBTdXBwb3J0OiBJRTksIElFMTBcblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSkoKTtcblxuXG52YXIgbm9kZUhvb2ssIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGF0dHI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkuYXR0ciwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCB0aGlzLCBuYW1lICk7XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciBob29rcywgcmV0LFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gZG9uJ3QgZ2V0L3NldCBhdHRyaWJ1dGVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSA9PT0gc3RydW5kZWZpbmVkICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBhdHRyaWJ1dGVzIGFyZSBsb3dlcmNhc2Vcblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lIF0gfHxcblx0XHRcdFx0KCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSA/IGJvb2xIb29rIDogbm9kZUhvb2sgKTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0Ly8gTm9uLWV4aXN0ZW50IGF0dHJpYnV0ZXMgcmV0dXJuIG51bGwsIHdlIG5vcm1hbGl6ZSB0byB1bmRlZmluZWRcblx0XHRcdHJldHVybiByZXQgPT0gbnVsbCA/XG5cdFx0XHRcdHVuZGVmaW5lZCA6XG5cdFx0XHRcdHJldDtcblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLCBwcm9wTmFtZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3R3aGl0ZSApO1xuXG5cdFx0aWYgKCBhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdHdoaWxlICggKG5hbWUgPSBhdHRyTmFtZXNbaSsrXSkgKSB7XG5cdFx0XHRcdHByb3BOYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXG5cdFx0XHRcdC8vIEJvb2xlYW4gYXR0cmlidXRlcyBnZXQgc3BlY2lhbCB0cmVhdG1lbnQgKCMxMDg3MClcblx0XHRcdFx0aWYgKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0XHQvLyBTZXQgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSB0byBmYWxzZVxuXHRcdFx0XHRcdGVsZW1bIHByb3BOYW1lIF0gPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0Ly8gU2V0dGluZyB0aGUgdHlwZSBvbiBhIHJhZGlvIGJ1dHRvbiBhZnRlciB0aGUgdmFsdWUgcmVzZXRzIHRoZSB2YWx1ZSBpbiBJRTYtOVxuXHRcdFx0XHRcdC8vIFJlc2V0IHZhbHVlIHRvIGRlZmF1bHQgaW4gY2FzZSB0eXBlIGlzIHNldCBhZnRlciB2YWx1ZSBkdXJpbmcgY3JlYXRpb25cblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBIb29rcyBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcblx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcbmpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG5cdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgcmV0LCBoYW5kbGU7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHQvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIGJ5IHRlbXBvcmFyaWx5IHJlbW92aW5nIHRoaXMgZnVuY3Rpb24gZnJvbSB0aGUgZ2V0dGVyXG5cdFx0XHRoYW5kbGUgPSBhdHRySGFuZGxlWyBuYW1lIF07XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSByZXQ7XG5cdFx0XHRyZXQgPSBnZXR0ZXIoIGVsZW0sIG5hbWUsIGlzWE1MICkgIT0gbnVsbCA/XG5cdFx0XHRcdG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBuYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59KTtcblxuXG5cblxudmFyIHJmb2N1c2FibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0cHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuXHRcdH0pO1xuXHR9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdHByb3BGaXg6IHtcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcblx0fSxcblxuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsIG5vdHhtbCxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIGRvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5vdHhtbCA9IG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKTtcblxuXHRcdGlmICggbm90eG1sICkge1xuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmIChyZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkpICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyZXQgOlxuXHRcdFx0XHQoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApKSAhPT0gbnVsbCA/XG5cdFx0XHRcdHJldCA6XG5cdFx0XHRcdGVsZW1bIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0cHJvcEhvb2tzOiB7XG5cdFx0dGFiSW5kZXg6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmhhc0F0dHJpYnV0ZSggXCJ0YWJpbmRleFwiICkgfHwgcmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgZWxlbS5ocmVmID9cblx0XHRcdFx0XHRlbGVtLnRhYkluZGV4IDpcblx0XHRcdFx0XHQtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTkrXG4vLyBTZWxlY3RlZG5lc3MgZm9yIGFuIG9wdGlvbiBpbiBhbiBvcHRncm91cCBjYW4gYmUgaW5hY2N1cmF0ZVxuaWYgKCAhc3VwcG9ydC5vcHRTZWxlY3RlZCApIHtcblx0alF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9O1xufVxuXG5qUXVlcnkuZWFjaChbXG5cdFwidGFiSW5kZXhcIixcblx0XCJyZWFkT25seVwiLFxuXHRcIm1heExlbmd0aFwiLFxuXHRcImNlbGxTcGFjaW5nXCIsXG5cdFwiY2VsbFBhZGRpbmdcIixcblx0XCJyb3dTcGFuXCIsXG5cdFwiY29sU3BhblwiLFxuXHRcInVzZU1hcFwiLFxuXHRcImZyYW1lQm9yZGVyXCIsXG5cdFwiY29udGVudEVkaXRhYmxlXCJcbl0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xufSk7XG5cblxuXG5cbnZhciByY2xhc3MgPSAvW1xcdFxcclxcblxcZl0vZztcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGFkZENsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRwcm9jZWVkID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgdGhpcy5jbGFzc05hbWUgKSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCBwcm9jZWVkICkge1xuXHRcdFx0Ly8gVGhlIGRpc2p1bmN0aW9uIGhlcmUgaXMgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSByZW1vdmVDbGFzcylcblx0XHRcdGNsYXNzZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5tYXRjaCggcm5vdHdoaXRlICkgfHwgW107XG5cblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRlbGVtID0gdGhpc1sgaSBdO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggZWxlbS5jbGFzc05hbWUgP1xuXHRcdFx0XHRcdCggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApIDpcblx0XHRcdFx0XHRcIiBcIlxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcblx0XHRcdFx0XHRcdGlmICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0Y3VyICs9IGNsYXp6ICsgXCIgXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0galF1ZXJ5LnRyaW0oIGN1ciApO1xuXHRcdFx0XHRcdGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdHByb2NlZWQgPSBhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuID0gdGhpcy5sZW5ndGg7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lICkgKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAoIHByb2NlZWQgKSB7XG5cdFx0XHRjbGFzc2VzID0gKCB2YWx1ZSB8fCBcIlwiICkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXTtcblx0XHRcdFx0Ly8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIGVsZW0uY2xhc3NOYW1lID9cblx0XHRcdFx0XHQoIFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIiApLnJlcGxhY2UoIHJjbGFzcywgXCIgXCIgKSA6XG5cdFx0XHRcdFx0XCJcIlxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKGNsYXp6ID0gY2xhc3Nlc1tqKytdKSApIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSAqYWxsKiBpbnN0YW5jZXNcblx0XHRcdFx0XHRcdHdoaWxlICggY3VyLmluZGV4T2YoIFwiIFwiICsgY2xhenogKyBcIiBcIiApID49IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciA9IGN1ci5yZXBsYWNlKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIsIFwiIFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gb25seSBhc3NpZ24gaWYgZGlmZmVyZW50IHRvIGF2b2lkIHVubmVlZGVkIHJlbmRlcmluZy5cblx0XHRcdFx0XHRmaW5hbFZhbHVlID0gdmFsdWUgPyBqUXVlcnkudHJpbSggY3VyICkgOiBcIlwiO1xuXHRcdFx0XHRcdGlmICggZWxlbS5jbGFzc05hbWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmNsYXNzTmFtZSA9IGZpbmFsVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyggdmFsdWUuY2FsbCh0aGlzLCBpLCB0aGlzLmNsYXNzTmFtZSwgc3RhdGVWYWwpLCBzdGF0ZVZhbCApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0Ly8gdG9nZ2xlIGluZGl2aWR1YWwgY2xhc3MgbmFtZXNcblx0XHRcdFx0dmFyIGNsYXNzTmFtZSxcblx0XHRcdFx0XHRpID0gMCxcblx0XHRcdFx0XHRzZWxmID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdFx0Y2xhc3NOYW1lcyA9IHZhbHVlLm1hdGNoKCBybm90d2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0XHR3aGlsZSAoIChjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSkgKSB7XG5cdFx0XHRcdFx0Ly8gY2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHR5cGUgPT09IHN0cnVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdFx0aWYgKCB0aGlzLmNsYXNzTmFtZSApIHtcblx0XHRcdFx0XHQvLyBzdG9yZSBjbGFzc05hbWUgaWYgc2V0XG5cdFx0XHRcdFx0ZGF0YV9wcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIHRoaXMuY2xhc3NOYW1lICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBcImZhbHNlXCIsXG5cdFx0XHRcdC8vIHRoZW4gcmVtb3ZlIHRoZSB3aG9sZSBjbGFzc25hbWUgKGlmIHRoZXJlIHdhcyBvbmUsIHRoZSBhYm92ZSBzYXZlZCBpdCkuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXG5cdFx0XHRcdC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cblx0XHRcdFx0dGhpcy5jbGFzc05hbWUgPSB0aGlzLmNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgPyBcIlwiIDogZGF0YV9wcml2LmdldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIgKSB8fCBcIlwiO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSA9IFwiIFwiICsgc2VsZWN0b3IgKyBcIiBcIixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGlmICggdGhpc1tpXS5ub2RlVHlwZSA9PT0gMSAmJiAoXCIgXCIgKyB0aGlzW2ldLmNsYXNzTmFtZSArIFwiIFwiKS5yZXBsYWNlKHJjbGFzcywgXCIgXCIpLmluZGV4T2YoIGNsYXNzTmFtZSApID49IDAgKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1swXTtcblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0Ly8gaGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRcdHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpIDpcblx0XHRcdFx0XHQvLyBoYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0XHRyZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0dmFyIHZhbDtcblxuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHR2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoXCJzZXRcIiBpbiBob29rcykgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0dmFsSG9va3M6IHtcblx0XHRvcHRpb246IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInZhbHVlXCIgKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAhPSBudWxsID9cblx0XHRcdFx0XHR2YWwgOlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFMTAtMTErXG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdGpRdWVyeS50cmltKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIiB8fCBpbmRleCA8IDAsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoLFxuXHRcdFx0XHRcdGkgPSBpbmRleCA8IDAgP1xuXHRcdFx0XHRcdFx0bWF4IDpcblx0XHRcdFx0XHRcdG9uZSA/IGluZGV4IDogMDtcblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIElFNi05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXHRcdFx0XHRcdFx0XHQvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHRcdFx0XHRcdCggc3VwcG9ydC5vcHREaXNhYmxlZCA/ICFvcHRpb24uZGlzYWJsZWQgOiBvcHRpb24uZ2V0QXR0cmlidXRlKCBcImRpc2FibGVkXCIgKSA9PT0gbnVsbCApICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8ICFqUXVlcnkubm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cdFx0XHRcdFx0aWYgKCAob3B0aW9uLnNlbGVjdGVkID0galF1ZXJ5LmluQXJyYXkoIG9wdGlvbi52YWx1ZSwgdmFsdWVzICkgPj0gMCkgKSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoZWxlbSkudmFsKCksIHZhbHVlICkgPj0gMCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0aWYgKCAhc3VwcG9ydC5jaGVja09uICkge1xuXHRcdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLmdldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gU3VwcG9ydDogV2Via2l0XG5cdFx0XHQvLyBcIlwiIGlzIHJldHVybmVkIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgdmFsdWUgaXNuJ3Qgc3BlY2lmaWVkXG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG5cdFx0fTtcblx0fVxufSk7XG5cblxuXG5cbi8vIFJldHVybiBqUXVlcnkgZm9yIGF0dHJpYnV0ZXMtb25seSBpbmNsdXNpb25cblxuXG5qUXVlcnkuZWFjaCggKFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgXCIgK1xuXHRcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcblx0XCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGVycm9yIGNvbnRleHRtZW51XCIpLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cblx0Ly8gSGFuZGxlIGV2ZW50IGJpbmRpbmdcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID9cblx0XHRcdHRoaXMub24oIG5hbWUsIG51bGwsIGRhdGEsIGZuICkgOlxuXHRcdFx0dGhpcy50cmlnZ2VyKCBuYW1lICk7XG5cdH07XG59KTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fSxcblxuXHRiaW5kOiBmdW5jdGlvbiggdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgbnVsbCwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5iaW5kOiBmdW5jdGlvbiggdHlwZXMsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XG5cdH0sXG5cblx0ZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGZuICkge1xuXHRcdC8vICggbmFtZXNwYWNlICkgb3IgKCBzZWxlY3RvciwgdHlwZXMgWywgZm5dIClcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHRoaXMub2ZmKCBzZWxlY3RvciwgXCIqKlwiICkgOiB0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcblx0fVxufSk7XG5cblxudmFyIG5vbmNlID0galF1ZXJ5Lm5vdygpO1xuXG52YXIgcnF1ZXJ5ID0gKC9cXD8vKTtcblxuXG5cbi8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zXG4vLyBXb3JrYXJvdW5kIGZhaWx1cmUgdG8gc3RyaW5nLWNhc3QgbnVsbCBpbnB1dFxualF1ZXJ5LnBhcnNlSlNPTiA9IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRyZXR1cm4gSlNPTi5wYXJzZSggZGF0YSArIFwiXCIgKTtcbn07XG5cblxuLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xualF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHZhciB4bWwsIHRtcDtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFOVxuXHR0cnkge1xuXHRcdHRtcCA9IG5ldyBET01QYXJzZXIoKTtcblx0XHR4bWwgPSB0bXAucGFyc2VGcm9tU3RyaW5nKCBkYXRhLCBcInRleHQveG1sXCIgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0eG1sID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKCAheG1sIHx8IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJwYXJzZXJlcnJvclwiICkubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5lcnJvciggXCJJbnZhbGlkIFhNTDogXCIgKyBkYXRhICk7XG5cdH1cblx0cmV0dXJuIHhtbDtcbn07XG5cblxudmFyXG5cdC8vIERvY3VtZW50IGxvY2F0aW9uXG5cdGFqYXhMb2NQYXJ0cyxcblx0YWpheExvY2F0aW9uLFxuXG5cdHJoYXNoID0gLyMuKiQvLFxuXHRydHMgPSAvKFs/Jl0pXz1bXiZdKi8sXG5cdHJoZWFkZXJzID0gL14oLio/KTpbIFxcdF0qKFteXFxyXFxuXSopJC9tZyxcblx0Ly8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXG5cdHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sXG5cdHJub0NvbnRlbnQgPSAvXig/OkdFVHxIRUFEKSQvLFxuXHRycHJvdG9jb2wgPSAvXlxcL1xcLy8sXG5cdHJ1cmwgPSAvXihbXFx3ListXSs6KSg/OlxcL1xcLyg/OlteXFwvPyNdKkB8KShbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpLyxcblxuXHQvKiBQcmVmaWx0ZXJzXG5cdCAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG5cdCAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG5cdCAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcblx0ICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuXHQgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHByZWZpbHRlcnMgPSB7fSxcblxuXHQvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG5cdCAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHRyYW5zcG9ydHMgPSB7fSxcblxuXHQvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cblx0YWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KFwiKlwiKTtcblxuLy8gIzgxMzgsIElFIG1heSB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBhY2Nlc3Npbmdcbi8vIGEgZmllbGQgZnJvbSB3aW5kb3cubG9jYXRpb24gaWYgZG9jdW1lbnQuZG9tYWluIGhhcyBiZWVuIHNldFxudHJ5IHtcblx0YWpheExvY2F0aW9uID0gbG9jYXRpb24uaHJlZjtcbn0gY2F0Y2goIGUgKSB7XG5cdC8vIFVzZSB0aGUgaHJlZiBhdHRyaWJ1dGUgb2YgYW4gQSBlbGVtZW50XG5cdC8vIHNpbmNlIElFIHdpbGwgbW9kaWZ5IGl0IGdpdmVuIGRvY3VtZW50LmxvY2F0aW9uXG5cdGFqYXhMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG5cdGFqYXhMb2NhdGlvbi5ocmVmID0gXCJcIjtcblx0YWpheExvY2F0aW9uID0gYWpheExvY2F0aW9uLmhyZWY7XG59XG5cbi8vIFNlZ21lbnQgbG9jYXRpb24gaW50byBwYXJ0c1xuYWpheExvY1BhcnRzID0gcnVybC5leGVjKCBhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSApIHx8IFtdO1xuXG4vLyBCYXNlIFwiY29uc3RydWN0b3JcIiBmb3IgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIgYW5kIGpRdWVyeS5hamF4VHJhbnNwb3J0XG5mdW5jdGlvbiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHN0cnVjdHVyZSApIHtcblxuXHQvLyBkYXRhVHlwZUV4cHJlc3Npb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIFwiKlwiXG5cdHJldHVybiBmdW5jdGlvbiggZGF0YVR5cGVFeHByZXNzaW9uLCBmdW5jICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YVR5cGVFeHByZXNzaW9uICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZnVuYyA9IGRhdGFUeXBlRXhwcmVzc2lvbjtcblx0XHRcdGRhdGFUeXBlRXhwcmVzc2lvbiA9IFwiKlwiO1xuXHRcdH1cblxuXHRcdHZhciBkYXRhVHlwZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZGF0YVR5cGVzID0gZGF0YVR5cGVFeHByZXNzaW9uLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFtdO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0d2hpbGUgKCAoZGF0YVR5cGUgPSBkYXRhVHlwZXNbaSsrXSkgKSB7XG5cdFx0XHRcdC8vIFByZXBlbmQgaWYgcmVxdWVzdGVkXG5cdFx0XHRcdGlmICggZGF0YVR5cGVbMF0gPT09IFwiK1wiICkge1xuXHRcdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGUuc2xpY2UoIDEgKSB8fCBcIipcIjtcblx0XHRcdFx0XHQoc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdKS51bnNoaWZ0KCBmdW5jICk7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdChzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10pLnB1c2goIGZ1bmMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICkge1xuXG5cdHZhciBpbnNwZWN0ZWQgPSB7fSxcblx0XHRzZWVraW5nVHJhbnNwb3J0ID0gKCBzdHJ1Y3R1cmUgPT09IHRyYW5zcG9ydHMgKTtcblxuXHRmdW5jdGlvbiBpbnNwZWN0KCBkYXRhVHlwZSApIHtcblx0XHR2YXIgc2VsZWN0ZWQ7XG5cdFx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblx0XHRqUXVlcnkuZWFjaCggc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdLCBmdW5jdGlvbiggXywgcHJlZmlsdGVyT3JGYWN0b3J5ICkge1xuXHRcdFx0dmFyIGRhdGFUeXBlT3JUcmFuc3BvcnQgPSBwcmVmaWx0ZXJPckZhY3RvcnkoIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKTtcblx0XHRcdGlmICggdHlwZW9mIGRhdGFUeXBlT3JUcmFuc3BvcnQgPT09IFwic3RyaW5nXCIgJiYgIXNlZWtpbmdUcmFuc3BvcnQgJiYgIWluc3BlY3RlZFsgZGF0YVR5cGVPclRyYW5zcG9ydCBdICkge1xuXHRcdFx0XHRvcHRpb25zLmRhdGFUeXBlcy51bnNoaWZ0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdGluc3BlY3QoIGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggc2Vla2luZ1RyYW5zcG9ydCApIHtcblx0XHRcdFx0cmV0dXJuICEoIHNlbGVjdGVkID0gZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcblx0fVxuXG5cdHJldHVybiBpbnNwZWN0KCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdICkgfHwgIWluc3BlY3RlZFsgXCIqXCIgXSAmJiBpbnNwZWN0KCBcIipcIiApO1xufVxuXG4vLyBBIHNwZWNpYWwgZXh0ZW5kIGZvciBhamF4IG9wdGlvbnNcbi8vIHRoYXQgdGFrZXMgXCJmbGF0XCIgb3B0aW9ucyAobm90IHRvIGJlIGRlZXAgZXh0ZW5kZWQpXG4vLyBGaXhlcyAjOTg4N1xuZnVuY3Rpb24gYWpheEV4dGVuZCggdGFyZ2V0LCBzcmMgKSB7XG5cdHZhciBrZXksIGRlZXAsXG5cdFx0ZmxhdE9wdGlvbnMgPSBqUXVlcnkuYWpheFNldHRpbmdzLmZsYXRPcHRpb25zIHx8IHt9O1xuXG5cdGZvciAoIGtleSBpbiBzcmMgKSB7XG5cdFx0aWYgKCBzcmNbIGtleSBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQoIGZsYXRPcHRpb25zWyBrZXkgXSA/IHRhcmdldCA6ICggZGVlcCB8fCAoZGVlcCA9IHt9KSApIClbIGtleSBdID0gc3JjWyBrZXkgXTtcblx0XHR9XG5cdH1cblx0aWYgKCBkZWVwICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRydWUsIHRhcmdldCwgZGVlcCApO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyogSGFuZGxlcyByZXNwb25zZXMgdG8gYW4gYWpheCByZXF1ZXN0OlxuICogLSBmaW5kcyB0aGUgcmlnaHQgZGF0YVR5cGUgKG1lZGlhdGVzIGJldHdlZW4gY29udGVudC10eXBlIGFuZCBleHBlY3RlZCBkYXRhVHlwZSlcbiAqIC0gcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByZXNwb25zZVxuICovXG5mdW5jdGlvbiBhamF4SGFuZGxlUmVzcG9uc2VzKCBzLCBqcVhIUiwgcmVzcG9uc2VzICkge1xuXG5cdHZhciBjdCwgdHlwZSwgZmluYWxEYXRhVHlwZSwgZmlyc3REYXRhVHlwZSxcblx0XHRjb250ZW50cyA9IHMuY29udGVudHMsXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXM7XG5cblx0Ly8gUmVtb3ZlIGF1dG8gZGF0YVR5cGUgYW5kIGdldCBjb250ZW50LXR5cGUgaW4gdGhlIHByb2Nlc3Ncblx0d2hpbGUgKCBkYXRhVHlwZXNbIDAgXSA9PT0gXCIqXCIgKSB7XG5cdFx0ZGF0YVR5cGVzLnNoaWZ0KCk7XG5cdFx0aWYgKCBjdCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Y3QgPSBzLm1pbWVUeXBlIHx8IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKFwiQ29udGVudC1UeXBlXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuXHRpZiAoIGN0ICkge1xuXHRcdGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XG5cdFx0XHRpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuXHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcblx0aWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG5cdFx0ZmluYWxEYXRhVHlwZSA9IGRhdGFUeXBlc1sgMCBdO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWzBdIF0gKSB7XG5cdFx0XHRcdGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggIWZpcnN0RGF0YVR5cGUgKSB7XG5cdFx0XHRcdGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBPciBqdXN0IHVzZSBmaXJzdCBvbmVcblx0XHRmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xuXHR9XG5cblx0Ly8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxuXHQvLyBXZSBhZGQgdGhlIGRhdGFUeXBlIHRvIHRoZSBsaXN0IGlmIG5lZWRlZFxuXHQvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG5cdGlmICggZmluYWxEYXRhVHlwZSApIHtcblx0XHRpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuXHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIGZpbmFsRGF0YVR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xuXHR9XG59XG5cbi8qIENoYWluIGNvbnZlcnNpb25zIGdpdmVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgb3JpZ2luYWwgcmVzcG9uc2VcbiAqIEFsc28gc2V0cyB0aGUgcmVzcG9uc2VYWFggZmllbGRzIG9uIHRoZSBqcVhIUiBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKSB7XG5cdHZhciBjb252MiwgY3VycmVudCwgY29udiwgdG1wLCBwcmV2LFxuXHRcdGNvbnZlcnRlcnMgPSB7fSxcblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKTtcblxuXHQvLyBDcmVhdGUgY29udmVydGVycyBtYXAgd2l0aCBsb3dlcmNhc2VkIGtleXNcblx0aWYgKCBkYXRhVHlwZXNbIDEgXSApIHtcblx0XHRmb3IgKCBjb252IGluIHMuY29udmVydGVycyApIHtcblx0XHRcdGNvbnZlcnRlcnNbIGNvbnYudG9Mb3dlckNhc2UoKSBdID0gcy5jb252ZXJ0ZXJzWyBjb252IF07XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudCA9IGRhdGFUeXBlcy5zaGlmdCgpO1xuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlXG5cdHdoaWxlICggY3VycmVudCApIHtcblxuXHRcdGlmICggcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdICkge1xuXHRcdFx0anFYSFJbIHMucmVzcG9uc2VGaWVsZHNbIGN1cnJlbnQgXSBdID0gcmVzcG9uc2U7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgdGhlIGRhdGFGaWx0ZXIgaWYgcHJvdmlkZWRcblx0XHRpZiAoICFwcmV2ICYmIGlzU3VjY2VzcyAmJiBzLmRhdGFGaWx0ZXIgKSB7XG5cdFx0XHRyZXNwb25zZSA9IHMuZGF0YUZpbHRlciggcmVzcG9uc2UsIHMuZGF0YVR5cGUgKTtcblx0XHR9XG5cblx0XHRwcmV2ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0XHRpZiAoIGN1cnJlbnQgKSB7XG5cblx0XHQvLyBUaGVyZSdzIG9ubHkgd29yayB0byBkbyBpZiBjdXJyZW50IGRhdGFUeXBlIGlzIG5vbi1hdXRvXG5cdFx0XHRpZiAoIGN1cnJlbnQgPT09IFwiKlwiICkge1xuXG5cdFx0XHRcdGN1cnJlbnQgPSBwcmV2O1xuXG5cdFx0XHQvLyBDb252ZXJ0IHJlc3BvbnNlIGlmIHByZXYgZGF0YVR5cGUgaXMgbm9uLWF1dG8gYW5kIGRpZmZlcnMgZnJvbSBjdXJyZW50XG5cdFx0XHR9IGVsc2UgaWYgKCBwcmV2ICE9PSBcIipcIiAmJiBwcmV2ICE9PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdC8vIFNlZWsgYSBkaXJlY3QgY29udmVydGVyXG5cdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyBjdXJyZW50IF0gfHwgY29udmVydGVyc1sgXCIqIFwiICsgY3VycmVudCBdO1xuXG5cdFx0XHRcdC8vIElmIG5vbmUgZm91bmQsIHNlZWsgYSBwYWlyXG5cdFx0XHRcdGlmICggIWNvbnYgKSB7XG5cdFx0XHRcdFx0Zm9yICggY29udjIgaW4gY29udmVydGVycyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSWYgY29udjIgb3V0cHV0cyBjdXJyZW50XG5cdFx0XHRcdFx0XHR0bXAgPSBjb252Mi5zcGxpdCggXCIgXCIgKTtcblx0XHRcdFx0XHRcdGlmICggdG1wWyAxIF0gPT09IGN1cnJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgcHJldiBjYW4gYmUgY29udmVydGVkIHRvIGFjY2VwdGVkIGlucHV0XG5cdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBwcmV2ICsgXCIgXCIgKyB0bXBbIDAgXSBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyc1sgXCIqIFwiICsgdG1wWyAwIF0gXTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjb252ICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudCA9IHRtcFsgMCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG5cdFx0XHRcdGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuXHRcdFx0XHRcdC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cblx0XHRcdFx0XHRpZiAoIGNvbnYgJiYgc1sgXCJ0aHJvd3NcIiBdICkge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBjb252KCByZXNwb25zZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHsgc3RhdGU6IFwicGFyc2VyZXJyb3JcIiwgZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50IH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblxuXHQvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcblx0YWN0aXZlOiAwLFxuXG5cdC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3Rcblx0bGFzdE1vZGlmaWVkOiB7fSxcblx0ZXRhZzoge30sXG5cblx0YWpheFNldHRpbmdzOiB7XG5cdFx0dXJsOiBhamF4TG9jYXRpb24sXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBhamF4TG9jUGFydHNbIDEgXSApLFxuXHRcdGdsb2JhbDogdHJ1ZSxcblx0XHRwcm9jZXNzRGF0YTogdHJ1ZSxcblx0XHRhc3luYzogdHJ1ZSxcblx0XHRjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcblx0XHQvKlxuXHRcdHRpbWVvdXQ6IDAsXG5cdFx0ZGF0YTogbnVsbCxcblx0XHRkYXRhVHlwZTogbnVsbCxcblx0XHR1c2VybmFtZTogbnVsbCxcblx0XHRwYXNzd29yZDogbnVsbCxcblx0XHRjYWNoZTogbnVsbCxcblx0XHR0aHJvd3M6IGZhbHNlLFxuXHRcdHRyYWRpdGlvbmFsOiBmYWxzZSxcblx0XHRoZWFkZXJzOiB7fSxcblx0XHQqL1xuXG5cdFx0YWNjZXB0czoge1xuXHRcdFx0XCIqXCI6IGFsbFR5cGVzLFxuXHRcdFx0dGV4dDogXCJ0ZXh0L3BsYWluXCIsXG5cdFx0XHRodG1sOiBcInRleHQvaHRtbFwiLFxuXHRcdFx0eG1sOiBcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixcblx0XHRcdGpzb246IFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0XCJcblx0XHR9LFxuXG5cdFx0Y29udGVudHM6IHtcblx0XHRcdHhtbDogL3htbC8sXG5cdFx0XHRodG1sOiAvaHRtbC8sXG5cdFx0XHRqc29uOiAvanNvbi9cblx0XHR9LFxuXG5cdFx0cmVzcG9uc2VGaWVsZHM6IHtcblx0XHRcdHhtbDogXCJyZXNwb25zZVhNTFwiLFxuXHRcdFx0dGV4dDogXCJyZXNwb25zZVRleHRcIixcblx0XHRcdGpzb246IFwicmVzcG9uc2VKU09OXCJcblx0XHR9LFxuXG5cdFx0Ly8gRGF0YSBjb252ZXJ0ZXJzXG5cdFx0Ly8gS2V5cyBzZXBhcmF0ZSBzb3VyY2UgKG9yIGNhdGNoYWxsIFwiKlwiKSBhbmQgZGVzdGluYXRpb24gdHlwZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxuXHRcdGNvbnZlcnRlcnM6IHtcblxuXHRcdFx0Ly8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG5cdFx0XHRcIiogdGV4dFwiOiBTdHJpbmcsXG5cblx0XHRcdC8vIFRleHQgdG8gaHRtbCAodHJ1ZSA9IG5vIHRyYW5zZm9ybWF0aW9uKVxuXHRcdFx0XCJ0ZXh0IGh0bWxcIjogdHJ1ZSxcblxuXHRcdFx0Ly8gRXZhbHVhdGUgdGV4dCBhcyBhIGpzb24gZXhwcmVzc2lvblxuXHRcdFx0XCJ0ZXh0IGpzb25cIjogalF1ZXJ5LnBhcnNlSlNPTixcblxuXHRcdFx0Ly8gUGFyc2UgdGV4dCBhcyB4bWxcblx0XHRcdFwidGV4dCB4bWxcIjogalF1ZXJ5LnBhcnNlWE1MXG5cdFx0fSxcblxuXHRcdC8vIEZvciBvcHRpb25zIHRoYXQgc2hvdWxkbid0IGJlIGRlZXAgZXh0ZW5kZWQ6XG5cdFx0Ly8geW91IGNhbiBhZGQgeW91ciBvd24gY3VzdG9tIG9wdGlvbnMgaGVyZSBpZlxuXHRcdC8vIGFuZCB3aGVuIHlvdSBjcmVhdGUgb25lIHRoYXQgc2hvdWxkbid0IGJlXG5cdFx0Ly8gZGVlcCBleHRlbmRlZCAoc2VlIGFqYXhFeHRlbmQpXG5cdFx0ZmxhdE9wdGlvbnM6IHtcblx0XHRcdHVybDogdHJ1ZSxcblx0XHRcdGNvbnRleHQ6IHRydWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ3JlYXRlcyBhIGZ1bGwgZmxlZGdlZCBzZXR0aW5ncyBvYmplY3QgaW50byB0YXJnZXRcblx0Ly8gd2l0aCBib3RoIGFqYXhTZXR0aW5ncyBhbmQgc2V0dGluZ3MgZmllbGRzLlxuXHQvLyBJZiB0YXJnZXQgaXMgb21pdHRlZCwgd3JpdGVzIGludG8gYWpheFNldHRpbmdzLlxuXHRhamF4U2V0dXA6IGZ1bmN0aW9uKCB0YXJnZXQsIHNldHRpbmdzICkge1xuXHRcdHJldHVybiBzZXR0aW5ncyA/XG5cblx0XHRcdC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG5cdFx0XHRhamF4RXh0ZW5kKCBhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKSwgc2V0dGluZ3MgKSA6XG5cblx0XHRcdC8vIEV4dGVuZGluZyBhamF4U2V0dGluZ3Ncblx0XHRcdGFqYXhFeHRlbmQoIGpRdWVyeS5hamF4U2V0dGluZ3MsIHRhcmdldCApO1xuXHR9LFxuXG5cdGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuXHRhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuXHQvLyBNYWluIG1ldGhvZFxuXHRhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcblx0XHRpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRvcHRpb25zID0gdXJsO1xuXHRcdFx0dXJsID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHR2YXIgdHJhbnNwb3J0LFxuXHRcdFx0Ly8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuXHRcdFx0Y2FjaGVVUkwsXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cdFx0XHQvLyB0aW1lb3V0IGhhbmRsZVxuXHRcdFx0dGltZW91dFRpbWVyLFxuXHRcdFx0Ly8gQ3Jvc3MtZG9tYWluIGRldGVjdGlvbiB2YXJzXG5cdFx0XHRwYXJ0cyxcblx0XHRcdC8vIFRvIGtub3cgaWYgZ2xvYmFsIGV2ZW50cyBhcmUgdG8gYmUgZGlzcGF0Y2hlZFxuXHRcdFx0ZmlyZUdsb2JhbHMsXG5cdFx0XHQvLyBMb29wIHZhcmlhYmxlXG5cdFx0XHRpLFxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaW5hbCBvcHRpb25zIG9iamVjdFxuXHRcdFx0cyA9IGpRdWVyeS5hamF4U2V0dXAoIHt9LCBvcHRpb25zICksXG5cdFx0XHQvLyBDYWxsYmFja3MgY29udGV4dFxuXHRcdFx0Y2FsbGJhY2tDb250ZXh0ID0gcy5jb250ZXh0IHx8IHMsXG5cdFx0XHQvLyBDb250ZXh0IGZvciBnbG9iYWwgZXZlbnRzIGlzIGNhbGxiYWNrQ29udGV4dCBpZiBpdCBpcyBhIERPTSBub2RlIG9yIGpRdWVyeSBjb2xsZWN0aW9uXG5cdFx0XHRnbG9iYWxFdmVudENvbnRleHQgPSBzLmNvbnRleHQgJiYgKCBjYWxsYmFja0NvbnRleHQubm9kZVR5cGUgfHwgY2FsbGJhY2tDb250ZXh0LmpxdWVyeSApID9cblx0XHRcdFx0alF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG5cdFx0XHRcdGpRdWVyeS5ldmVudCxcblx0XHRcdC8vIERlZmVycmVkc1xuXHRcdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGNvbXBsZXRlRGVmZXJyZWQgPSBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksXG5cdFx0XHQvLyBTdGF0dXMtZGVwZW5kZW50IGNhbGxiYWNrc1xuXHRcdFx0c3RhdHVzQ29kZSA9IHMuc3RhdHVzQ29kZSB8fCB7fSxcblx0XHRcdC8vIEhlYWRlcnMgKHRoZXkgYXJlIHNlbnQgYWxsIGF0IG9uY2UpXG5cdFx0XHRyZXF1ZXN0SGVhZGVycyA9IHt9LFxuXHRcdFx0cmVxdWVzdEhlYWRlcnNOYW1lcyA9IHt9LFxuXHRcdFx0Ly8gVGhlIGpxWEhSIHN0YXRlXG5cdFx0XHRzdGF0ZSA9IDAsXG5cdFx0XHQvLyBEZWZhdWx0IGFib3J0IG1lc3NhZ2Vcblx0XHRcdHN0ckFib3J0ID0gXCJjYW5jZWxlZFwiLFxuXHRcdFx0Ly8gRmFrZSB4aHJcblx0XHRcdGpxWEhSID0ge1xuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcblx0XHRcdFx0Z2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXHRcdFx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICFyZXNwb25zZUhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVycyA9IHt9O1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaCA9IHJoZWFkZXJzLmV4ZWMoIHJlc3BvbnNlSGVhZGVyc1N0cmluZyApKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnNbIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgXSA9IG1hdGNoWyAyIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1hdGNoID0gcmVzcG9uc2VIZWFkZXJzWyBrZXkudG9Mb3dlckNhc2UoKSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2ggPT0gbnVsbCA/IG51bGwgOiBtYXRjaDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlID09PSAyID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWNoZXMgdGhlIGhlYWRlclxuXHRcdFx0XHRzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0dmFyIGxuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0bmFtZSA9IHJlcXVlc3RIZWFkZXJzTmFtZXNbIGxuYW1lIF0gPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRcdHN0YXR1c0NvZGU6IGZ1bmN0aW9uKCBtYXAgKSB7XG5cdFx0XHRcdFx0dmFyIGNvZGU7XG5cdFx0XHRcdFx0aWYgKCBtYXAgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRcdFx0Zm9yICggY29kZSBpbiBtYXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFjayBpbiBhIHdheSB0aGF0IHByZXNlcnZlcyBvbGQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c0NvZGVbIGNvZGUgXSA9IFsgc3RhdHVzQ29kZVsgY29kZSBdLCBtYXBbIGNvZGUgXSBdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3Ncblx0XHRcdFx0XHRcdFx0anFYSFIuYWx3YXlzKCBtYXBbIGpxWEhSLnN0YXR1cyBdICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0dmFyIGZpbmFsVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG5cdFx0XHRcdFx0aWYgKCB0cmFuc3BvcnQgKSB7XG5cdFx0XHRcdFx0XHR0cmFuc3BvcnQuYWJvcnQoIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkb25lKCAwLCBmaW5hbFRleHQgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdC8vIEF0dGFjaCBkZWZlcnJlZHNcblx0XHRkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApLmNvbXBsZXRlID0gY29tcGxldGVEZWZlcnJlZC5hZGQ7XG5cdFx0anFYSFIuc3VjY2VzcyA9IGpxWEhSLmRvbmU7XG5cdFx0anFYSFIuZXJyb3IgPSBqcVhIUi5mYWlsO1xuXG5cdFx0Ly8gUmVtb3ZlIGhhc2ggY2hhcmFjdGVyICgjNzUzMTogYW5kIHN0cmluZyBwcm9tb3Rpb24pXG5cdFx0Ly8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAocHJlZmlsdGVycyBtaWdodCBleHBlY3QgaXQpXG5cdFx0Ly8gSGFuZGxlIGZhbHN5IHVybCBpbiB0aGUgc2V0dGluZ3Mgb2JqZWN0ICgjMTAwOTM6IGNvbnNpc3RlbmN5IHdpdGggb2xkIHNpZ25hdHVyZSlcblx0XHQvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcblx0XHRzLnVybCA9ICggKCB1cmwgfHwgcy51cmwgfHwgYWpheExvY2F0aW9uICkgKyBcIlwiICkucmVwbGFjZSggcmhhc2gsIFwiXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJwcm90b2NvbCwgYWpheExvY1BhcnRzWyAxIF0gKyBcIi8vXCIgKTtcblxuXHRcdC8vIEFsaWFzIG1ldGhvZCBvcHRpb24gdG8gdHlwZSBhcyBwZXIgdGlja2V0ICMxMjAwNFxuXHRcdHMudHlwZSA9IG9wdGlvbnMubWV0aG9kIHx8IG9wdGlvbnMudHlwZSB8fCBzLm1ldGhvZCB8fCBzLnR5cGU7XG5cblx0XHQvLyBFeHRyYWN0IGRhdGFUeXBlcyBsaXN0XG5cdFx0cy5kYXRhVHlwZXMgPSBqUXVlcnkudHJpbSggcy5kYXRhVHlwZSB8fCBcIipcIiApLnRvTG93ZXJDYXNlKCkubWF0Y2goIHJub3R3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG5cdFx0Ly8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHdlIGhhdmUgYSBwcm90b2NvbDpob3N0OnBvcnQgbWlzbWF0Y2hcblx0XHRpZiAoIHMuY3Jvc3NEb21haW4gPT0gbnVsbCApIHtcblx0XHRcdHBhcnRzID0gcnVybC5leGVjKCBzLnVybC50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHRzLmNyb3NzRG9tYWluID0gISEoIHBhcnRzICYmXG5cdFx0XHRcdCggcGFydHNbIDEgXSAhPT0gYWpheExvY1BhcnRzWyAxIF0gfHwgcGFydHNbIDIgXSAhPT0gYWpheExvY1BhcnRzWyAyIF0gfHxcblx0XHRcdFx0XHQoIHBhcnRzWyAzIF0gfHwgKCBwYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyBcIjgwXCIgOiBcIjQ0M1wiICkgKSAhPT1cblx0XHRcdFx0XHRcdCggYWpheExvY1BhcnRzWyAzIF0gfHwgKCBhamF4TG9jUGFydHNbIDEgXSA9PT0gXCJodHRwOlwiID8gXCI4MFwiIDogXCI0NDNcIiApICkgKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdGZpcmVHbG9iYWxzID0gcy5nbG9iYWw7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcblx0XHR9XG5cblx0XHQvLyBVcHBlcmNhc2UgdGhlIHR5cGVcblx0XHRzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG5cdFx0cy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cblx0XHQvLyBTYXZlIHRoZSBVUkwgaW4gY2FzZSB3ZSdyZSB0b3lpbmcgd2l0aCB0aGUgSWYtTW9kaWZpZWQtU2luY2Vcblx0XHQvLyBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIgbGF0ZXIgb25cblx0XHRjYWNoZVVSTCA9IHMudXJsO1xuXG5cdFx0Ly8gTW9yZSBvcHRpb25zIGhhbmRsaW5nIGZvciByZXF1ZXN0cyB3aXRoIG5vIGNvbnRlbnRcblx0XHRpZiAoICFzLmhhc0NvbnRlbnQgKSB7XG5cblx0XHRcdC8vIElmIGRhdGEgaXMgYXZhaWxhYmxlLCBhcHBlbmQgZGF0YSB0byB1cmxcblx0XHRcdGlmICggcy5kYXRhICkge1xuXHRcdFx0XHRjYWNoZVVSTCA9ICggcy51cmwgKz0gKCBycXVlcnkudGVzdCggY2FjaGVVUkwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YSApO1xuXHRcdFx0XHQvLyAjOTY4MjogcmVtb3ZlIGRhdGEgc28gdGhhdCBpdCdzIG5vdCB1c2VkIGluIGFuIGV2ZW50dWFsIHJldHJ5XG5cdFx0XHRcdGRlbGV0ZSBzLmRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBhbnRpLWNhY2hlIGluIHVybCBpZiBuZWVkZWRcblx0XHRcdGlmICggcy5jYWNoZSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdHMudXJsID0gcnRzLnRlc3QoIGNhY2hlVVJMICkgP1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhICdfJyBwYXJhbWV0ZXIsIHNldCBpdHMgdmFsdWVcblx0XHRcdFx0XHRjYWNoZVVSTC5yZXBsYWNlKCBydHMsIFwiJDFfPVwiICsgbm9uY2UrKyApIDpcblxuXHRcdFx0XHRcdC8vIE90aGVyd2lzZSBhZGQgb25lIHRvIHRoZSBlbmRcblx0XHRcdFx0XHRjYWNoZVVSTCArICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyBub25jZSsrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gP1xuXHRcdFx0XHRzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gKyAoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJiAoIHMuYmVmb3JlU2VuZC5jYWxsKCBjYWxsYmFja0NvbnRleHQsIGpxWEhSLCBzICkgPT09IGZhbHNlIHx8IHN0YXRlID09PSAyICkgKSB7XG5cdFx0XHQvLyBBYm9ydCBpZiBub3QgZG9uZSBhbHJlYWR5IGFuZCByZXR1cm5cblx0XHRcdHJldHVybiBqcVhIUi5hYm9ydCgpO1xuXHRcdH1cblxuXHRcdC8vIGFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuXHRcdHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG5cdFx0Zm9yICggaSBpbiB7IHN1Y2Nlc3M6IDEsIGVycm9yOiAxLCBjb21wbGV0ZTogMSB9ICkge1xuXHRcdFx0anFYSFJbIGkgXSggc1sgaSBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGpxWEhSLmFib3J0KFwidGltZW91dFwiKTtcblx0XHRcdFx0fSwgcy50aW1lb3V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN0YXRlID0gMTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0Ly8gUHJvcGFnYXRlIGV4Y2VwdGlvbiBhcyBlcnJvciBpZiBub3QgZG9uZVxuXHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRkb25lKCAtMSwgZSApO1xuXHRcdFx0XHQvLyBTaW1wbHkgcmV0aHJvdyBvdGhlcndpc2Vcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG5cdFx0ZnVuY3Rpb24gZG9uZSggc3RhdHVzLCBuYXRpdmVTdGF0dXNUZXh0LCByZXNwb25zZXMsIGhlYWRlcnMgKSB7XG5cdFx0XHR2YXIgaXNTdWNjZXNzLCBzdWNjZXNzLCBlcnJvciwgcmVzcG9uc2UsIG1vZGlmaWVkLFxuXHRcdFx0XHRzdGF0dXNUZXh0ID0gbmF0aXZlU3RhdHVzVGV4dDtcblxuXHRcdFx0Ly8gQ2FsbGVkIG9uY2Vcblx0XHRcdGlmICggc3RhdGUgPT09IDIgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdGUgaXMgXCJkb25lXCIgbm93XG5cdFx0XHRzdGF0ZSA9IDI7XG5cblx0XHRcdC8vIENsZWFyIHRpbWVvdXQgaWYgaXQgZXhpc3RzXG5cdFx0XHRpZiAoIHRpbWVvdXRUaW1lciApIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lb3V0VGltZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVyZWZlcmVuY2UgdHJhbnNwb3J0IGZvciBlYXJseSBnYXJiYWdlIGNvbGxlY3Rpb25cblx0XHRcdC8vIChubyBtYXR0ZXIgaG93IGxvbmcgdGhlIGpxWEhSIG9iamVjdCB3aWxsIGJlIHVzZWQpXG5cdFx0XHR0cmFuc3BvcnQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdC8vIENhY2hlIHJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyA9IGhlYWRlcnMgfHwgXCJcIjtcblxuXHRcdFx0Ly8gU2V0IHJlYWR5U3RhdGVcblx0XHRcdGpxWEhSLnJlYWR5U3RhdGUgPSBzdGF0dXMgPiAwID8gNCA6IDA7XG5cblx0XHRcdC8vIERldGVybWluZSBpZiBzdWNjZXNzZnVsXG5cdFx0XHRpc1N1Y2Nlc3MgPSBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcblxuXHRcdFx0Ly8gR2V0IHJlc3BvbnNlIGRhdGFcblx0XHRcdGlmICggcmVzcG9uc2VzICkge1xuXHRcdFx0XHRyZXNwb25zZSA9IGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCBubyBtYXR0ZXIgd2hhdCAodGhhdCB3YXkgcmVzcG9uc2VYWFggZmllbGRzIGFyZSBhbHdheXMgc2V0KVxuXHRcdFx0cmVzcG9uc2UgPSBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKTtcblxuXHRcdFx0Ly8gSWYgc3VjY2Vzc2Z1bCwgaGFuZGxlIHR5cGUgY2hhaW5pbmdcblx0XHRcdGlmICggaXNTdWNjZXNzICkge1xuXG5cdFx0XHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0XHRcdGlmICggcy5pZk1vZGlmaWVkICkge1xuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMYXN0LU1vZGlmaWVkXCIpO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkubGFzdE1vZGlmaWVkWyBjYWNoZVVSTCBdID0gbW9kaWZpZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJldGFnXCIpO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gV2UgZXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHRcblx0XHRcdFx0Ly8gdGhlbiBub3JtYWxpemUgc3RhdHVzVGV4dCBhbmQgc3RhdHVzIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuXHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxuXHRcdFx0XHRpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ganFYSFI7XG5cdH0sXG5cblx0Z2V0SlNPTjogZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgZGF0YSwgY2FsbGJhY2ssIFwianNvblwiICk7XG5cdH0sXG5cblx0Z2V0U2NyaXB0OiBmdW5jdGlvbiggdXJsLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCB1bmRlZmluZWQsIGNhbGxiYWNrLCBcInNjcmlwdFwiICk7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuXHRqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG5cdFx0Ly8gc2hpZnQgYXJndW1lbnRzIGlmIGRhdGEgYXJndW1lbnQgd2FzIG9taXR0ZWRcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBkYXRhICkgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcblx0XHRcdGNhbGxiYWNrID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpRdWVyeS5hamF4KHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0dHlwZTogbWV0aG9kLFxuXHRcdFx0ZGF0YVR5cGU6IHR5cGUsXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0c3VjY2VzczogY2FsbGJhY2tcblx0XHR9KTtcblx0fTtcbn0pO1xuXG4vLyBBdHRhY2ggYSBidW5jaCBvZiBmdW5jdGlvbnMgZm9yIGhhbmRsaW5nIGNvbW1vbiBBSkFYIGV2ZW50c1xualF1ZXJ5LmVhY2goIFsgXCJhamF4U3RhcnRcIiwgXCJhamF4U3RvcFwiLCBcImFqYXhDb21wbGV0ZVwiLCBcImFqYXhFcnJvclwiLCBcImFqYXhTdWNjZXNzXCIsIFwiYWpheFNlbmRcIiBdLCBmdW5jdGlvbiggaSwgdHlwZSApIHtcblx0alF1ZXJ5LmZuWyB0eXBlIF0gPSBmdW5jdGlvbiggZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGUsIGZuICk7XG5cdH07XG59KTtcblxuXG5qUXVlcnkuX2V2YWxVcmwgPSBmdW5jdGlvbiggdXJsICkge1xuXHRyZXR1cm4galF1ZXJ5LmFqYXgoe1xuXHRcdHVybDogdXJsLFxuXHRcdHR5cGU6IFwiR0VUXCIsXG5cdFx0ZGF0YVR5cGU6IFwic2NyaXB0XCIsXG5cdFx0YXN5bmM6IGZhbHNlLFxuXHRcdGdsb2JhbDogZmFsc2UsXG5cdFx0XCJ0aHJvd3NcIjogdHJ1ZVxuXHR9KTtcbn07XG5cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdHdyYXBBbGw6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciB3cmFwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaHRtbC5jYWxsKHRoaXMsIGkpICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXNbIDAgXSApIHtcblxuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcblx0XHRcdHdyYXAgPSBqUXVlcnkoIGh0bWwsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50ICkuZXEoIDAgKS5jbG9uZSggdHJ1ZSApO1xuXG5cdFx0XHRpZiAoIHRoaXNbIDAgXS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR3cmFwLmluc2VydEJlZm9yZSggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXAubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9KS5hcHBlbmQoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHR3cmFwSW5uZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBJbm5lciggaHRtbC5jYWxsKHRoaXMsIGkpICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0Y29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cblx0XHRcdGlmICggY29udGVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRjb250ZW50cy53cmFwQWxsKCBodG1sICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCBodG1sICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0d3JhcDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiggaSApIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwodGhpcywgaSkgOiBodG1sICk7XG5cdFx0fSk7XG5cdH0sXG5cblx0dW53cmFwOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImJvZHlcIiApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0XHR9XG5cdFx0fSkuZW5kKCk7XG5cdH1cbn0pO1xuXG5cbmpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIFN1cHBvcnQ6IE9wZXJhIDw9IDEyLjEyXG5cdC8vIE9wZXJhIHJlcG9ydHMgb2Zmc2V0V2lkdGhzIGFuZCBvZmZzZXRIZWlnaHRzIGxlc3MgdGhhbiB6ZXJvIG9uIHNvbWUgZWxlbWVudHNcblx0cmV0dXJuIGVsZW0ub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtLm9mZnNldEhlaWdodCA8PSAwO1xufTtcbmpRdWVyeS5leHByLmZpbHRlcnMudmlzaWJsZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4gIWpRdWVyeS5leHByLmZpbHRlcnMuaGlkZGVuKCBlbGVtICk7XG59O1xuXG5cblxuXG52YXIgcjIwID0gLyUyMC9nLFxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBvYmogKSApIHtcblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXG5cdFx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgPyBpIDogXCJcIiApICsgXCJdXCIsIHYsIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgalF1ZXJ5LnR5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHJldHVybiBpdHMgdmFsdWVcblx0XHRcdHZhbHVlID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgPyB2YWx1ZSgpIDogKCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gU2V0IHRyYWRpdGlvbmFsIHRvIHRydWUgZm9yIGpRdWVyeSA8PSAxLjMuMiBiZWhhdmlvci5cblx0aWYgKCB0cmFkaXRpb25hbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHRyYWRpdGlvbmFsID0galF1ZXJ5LmFqYXhTZXR0aW5ncyAmJiBqUXVlcnkuYWpheFNldHRpbmdzLnRyYWRpdGlvbmFsO1xuXHR9XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblx0XHQvLyBTZXJpYWxpemUgdGhlIGZvcm0gZWxlbWVudHNcblx0XHRqUXVlcnkuZWFjaCggYSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRhZGQoIHRoaXMubmFtZSwgdGhpcy52YWx1ZSApO1xuXHRcdH0pO1xuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcblx0XHQvLyBkaWQgaXQpLCBvdGhlcndpc2UgZW5jb2RlIHBhcmFtcyByZWN1cnNpdmVseS5cblx0XHRmb3IgKCBwcmVmaXggaW4gYSApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXgsIGFbIHByZWZpeCBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSByZXN1bHRpbmcgc2VyaWFsaXphdGlvblxuXHRyZXR1cm4gcy5qb2luKCBcIiZcIiApLnJlcGxhY2UoIHIyMCwgXCIrXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gQ2FuIGFkZCBwcm9wSG9vayBmb3IgXCJlbGVtZW50c1wiIHRvIGZpbHRlciBvciBhZGQgZm9ybSBlbGVtZW50c1xuXHRcdFx0dmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AoIHRoaXMsIFwiZWxlbWVudHNcIiApO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSlcblx0XHQuZmlsdGVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9KVxuXHRcdC5tYXAoZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdHJldHVybiB2YWwgPT0gbnVsbCA/XG5cdFx0XHRcdG51bGwgOlxuXHRcdFx0XHRqUXVlcnkuaXNBcnJheSggdmFsICkgP1xuXHRcdFx0XHRcdGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdFx0fSkgOlxuXHRcdFx0XHRcdHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9KS5nZXQoKTtcblx0fVxufSk7XG5cblxualF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdH0gY2F0Y2goIGUgKSB7fVxufTtcblxudmFyIHhocklkID0gMCxcblx0eGhyQ2FsbGJhY2tzID0ge30sXG5cdHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cdFx0Ly8gZmlsZSBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyBjb2RlIDAsIGFzc3VtZSAyMDBcblx0XHQwOiAyMDAsXG5cdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbi8vIFN1cHBvcnQ6IElFOVxuLy8gT3BlbiByZXF1ZXN0cyBtdXN0IGJlIG1hbnVhbGx5IGFib3J0ZWQgb24gdW5sb2FkICgjNTI4MClcbmlmICggd2luZG93LkFjdGl2ZVhPYmplY3QgKSB7XG5cdGpRdWVyeSggd2luZG93ICkub24oIFwidW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuXHRcdGZvciAoIHZhciBrZXkgaW4geGhyQ2FsbGJhY2tzICkge1xuXHRcdFx0eGhyQ2FsbGJhY2tzWyBrZXkgXSgpO1xuXHRcdH1cblx0fSk7XG59XG5cbnN1cHBvcnQuY29ycyA9ICEheGhyU3VwcG9ydGVkICYmICggXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQgKTtcbnN1cHBvcnQuYWpheCA9IHhoclN1cHBvcnRlZCA9ICEheGhyU3VwcG9ydGVkO1xuXG5qUXVlcnkuYWpheFRyYW5zcG9ydChmdW5jdGlvbiggb3B0aW9ucyApIHtcblx0dmFyIGNhbGxiYWNrO1xuXG5cdC8vIENyb3NzIGRvbWFpbiBvbmx5IGFsbG93ZWQgaWYgc3VwcG9ydGVkIHRocm91Z2ggWE1MSHR0cFJlcXVlc3Rcblx0aWYgKCBzdXBwb3J0LmNvcnMgfHwgeGhyU3VwcG9ydGVkICYmICFvcHRpb25zLmNyb3NzRG9tYWluICkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggaGVhZGVycywgY29tcGxldGUgKSB7XG5cdFx0XHRcdHZhciBpLFxuXHRcdFx0XHRcdHhociA9IG9wdGlvbnMueGhyKCksXG5cdFx0XHRcdFx0aWQgPSArK3hocklkO1xuXG5cdFx0XHRcdHhoci5vcGVuKCBvcHRpb25zLnR5cGUsIG9wdGlvbnMudXJsLCBvcHRpb25zLmFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkICk7XG5cblx0XHRcdFx0Ly8gQXBwbHkgY3VzdG9tIGZpZWxkcyBpZiBwcm92aWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdGZvciAoIGkgaW4gb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0XHR4aHJbIGkgXSA9IG9wdGlvbnMueGhyRmllbGRzWyBpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gT3ZlcnJpZGUgbWltZSB0eXBlIGlmIG5lZWRlZFxuXHRcdFx0XHRpZiAoIG9wdGlvbnMubWltZVR5cGUgJiYgeGhyLm92ZXJyaWRlTWltZVR5cGUgKSB7XG5cdFx0XHRcdFx0eGhyLm92ZXJyaWRlTWltZVR5cGUoIG9wdGlvbnMubWltZVR5cGUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFgtUmVxdWVzdGVkLVdpdGggaGVhZGVyXG5cdFx0XHRcdC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcblx0XHRcdFx0Ly8gYWtpbiB0byBhIGppZ3NhdyBwdXp6bGUsIHdlIHNpbXBseSBuZXZlciBzZXQgaXQgdG8gYmUgc3VyZS5cblx0XHRcdFx0Ly8gKGl0IGNhbiBhbHdheXMgYmUgc2V0IG9uIGEgcGVyLXJlcXVlc3QgYmFzaXMgb3IgZXZlbiB1c2luZyBhamF4U2V0dXApXG5cdFx0XHRcdC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuXHRcdFx0XHRpZiAoICFvcHRpb25zLmNyb3NzRG9tYWluICYmICFoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSApIHtcblx0XHRcdFx0XHRoZWFkZXJzW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCBoZWFkZXJzXG5cdFx0XHRcdGZvciAoIGkgaW4gaGVhZGVycyApIHtcblx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlciggaSwgaGVhZGVyc1sgaSBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSB4aHJDYWxsYmFja3NbIGlkIF07XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0geGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiYWJvcnRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJlcnJvclwiICkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gZmlsZTogcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgMDsgc2VlICM4NjA1LCAjMTQyMDdcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHJTdWNjZXNzU3RhdHVzWyB4aHIuc3RhdHVzIF0gfHwgeGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0LFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUU5XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBBY2Nlc3NpbmcgYmluYXJ5LWRhdGEgcmVzcG9uc2VUZXh0IHRocm93cyBhbiBleGNlcHRpb25cblx0XHRcdFx0XHRcdFx0XHRcdC8vICgjMTE0MjYpXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCA9PT0gXCJzdHJpbmdcIiA/IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGV4dDogeGhyLnJlc3BvbnNlVGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0fSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIExpc3RlbiB0byBldmVudHNcblx0XHRcdFx0eGhyLm9ubG9hZCA9IGNhbGxiYWNrKCk7XG5cdFx0XHRcdHhoci5vbmVycm9yID0gY2FsbGJhY2soXCJlcnJvclwiKTtcblxuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIGFib3J0IGNhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0geGhyQ2FsbGJhY2tzWyBpZCBdID0gY2FsbGJhY2soXCJhYm9ydFwiKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIERvIHNlbmQgdGhlIHJlcXVlc3QgKHRoaXMgbWF5IHJhaXNlIGFuIGV4Y2VwdGlvbilcblx0XHRcdFx0XHR4aHIuc2VuZCggb3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSB8fCBudWxsICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdC8vICMxNDY4MzogT25seSByZXRocm93IGlmIHRoaXMgaGFzbid0IGJlZW4gbm90aWZpZWQgYXMgYW4gZXJyb3IgeWV0XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pO1xuXG5cblxuXG4vLyBJbnN0YWxsIHNjcmlwdCBkYXRhVHlwZVxualF1ZXJ5LmFqYXhTZXR1cCh7XG5cdGFjY2VwdHM6IHtcblx0XHRzY3JpcHQ6IFwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIlxuXHR9LFxuXHRjb250ZW50czoge1xuXHRcdHNjcmlwdDogLyg/OmphdmF8ZWNtYSlzY3JpcHQvXG5cdH0sXG5cdGNvbnZlcnRlcnM6IHtcblx0XHRcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0alF1ZXJ5Lmdsb2JhbEV2YWwoIHRleHQgKTtcblx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdH1cblx0fVxufSk7XG5cbi8vIEhhbmRsZSBjYWNoZSdzIHNwZWNpYWwgY2FzZSBhbmQgY3Jvc3NEb21haW5cbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblx0aWYgKCBzLmNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cy5jYWNoZSA9IGZhbHNlO1xuXHR9XG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblx0XHRzLnR5cGUgPSBcIkdFVFwiO1xuXHR9XG59KTtcblxuLy8gQmluZCBzY3JpcHQgdGFnIGhhY2sgdHJhbnNwb3J0XG5qUXVlcnkuYWpheFRyYW5zcG9ydCggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cdC8vIFRoaXMgdHJhbnNwb3J0IG9ubHkgZGVhbHMgd2l0aCBjcm9zcyBkb21haW4gcmVxdWVzdHNcblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHZhciBzY3JpcHQsIGNhbGxiYWNrO1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggXywgY29tcGxldGUgKSB7XG5cdFx0XHRcdHNjcmlwdCA9IGpRdWVyeShcIjxzY3JpcHQ+XCIpLnByb3Aoe1xuXHRcdFx0XHRcdGFzeW5jOiB0cnVlLFxuXHRcdFx0XHRcdGNoYXJzZXQ6IHMuc2NyaXB0Q2hhcnNldCxcblx0XHRcdFx0XHRzcmM6IHMudXJsXG5cdFx0XHRcdH0pLm9uKFxuXHRcdFx0XHRcdFwibG9hZCBlcnJvclwiLFxuXHRcdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIGV2dCApIHtcblx0XHRcdFx0XHRcdHNjcmlwdC5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdGNhbGxiYWNrID0gbnVsbDtcblx0XHRcdFx0XHRcdGlmICggZXZ0ICkge1xuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggZXZ0LnR5cGUgPT09IFwiZXJyb3JcIiA/IDQwNCA6IDIwMCwgZXZ0LnR5cGUgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdFsgMCBdICk7XG5cdFx0XHR9LFxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59KTtcblxuXG5cblxudmFyIG9sZENhbGxiYWNrcyA9IFtdLFxuXHRyanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xuXG4vLyBEZWZhdWx0IGpzb25wIHNldHRpbmdzXG5qUXVlcnkuYWpheFNldHVwKHtcblx0anNvbnA6IFwiY2FsbGJhY2tcIixcblx0anNvbnBDYWxsYmFjazogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNhbGxiYWNrID0gb2xkQ2FsbGJhY2tzLnBvcCgpIHx8ICggalF1ZXJ5LmV4cGFuZG8gKyBcIl9cIiArICggbm9uY2UrKyApICk7XG5cdFx0dGhpc1sgY2FsbGJhY2sgXSA9IHRydWU7XG5cdFx0cmV0dXJuIGNhbGxiYWNrO1xuXHR9XG59KTtcblxuLy8gRGV0ZWN0LCBub3JtYWxpemUgb3B0aW9ucyBhbmQgaW5zdGFsbCBjYWxsYmFja3MgZm9yIGpzb25wIHJlcXVlc3RzXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJqc29uIGpzb25wXCIsIGZ1bmN0aW9uKCBzLCBvcmlnaW5hbFNldHRpbmdzLCBqcVhIUiApIHtcblxuXHR2YXIgY2FsbGJhY2tOYW1lLCBvdmVyd3JpdHRlbiwgcmVzcG9uc2VDb250YWluZXIsXG5cdFx0anNvblByb3AgPSBzLmpzb25wICE9PSBmYWxzZSAmJiAoIHJqc29ucC50ZXN0KCBzLnVybCApID9cblx0XHRcdFwidXJsXCIgOlxuXHRcdFx0dHlwZW9mIHMuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJiAhKCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpICYmIHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxuXHRcdCk7XG5cblx0Ly8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxuXHRpZiAoIGpzb25Qcm9wIHx8IHMuZGF0YVR5cGVzWyAwIF0gPT09IFwianNvbnBcIiApIHtcblxuXHRcdC8vIEdldCBjYWxsYmFjayBuYW1lLCByZW1lbWJlcmluZyBwcmVleGlzdGluZyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggaXRcblx0XHRjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuXHRcdFx0cy5qc29ucENhbGxiYWNrKCkgOlxuXHRcdFx0cy5qc29ucENhbGxiYWNrO1xuXG5cdFx0Ly8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuXHRcdGlmICgganNvblByb3AgKSB7XG5cdFx0XHRzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuXHRcdH0gZWxzZSBpZiAoIHMuanNvbnAgIT09IGZhbHNlICkge1xuXHRcdFx0cy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcblx0XHR9XG5cblx0XHQvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXG5cdFx0cy5jb252ZXJ0ZXJzW1wic2NyaXB0IGpzb25cIl0gPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggIXJlc3BvbnNlQ29udGFpbmVyICkge1xuXHRcdFx0XHRqUXVlcnkuZXJyb3IoIGNhbGxiYWNrTmFtZSArIFwiIHdhcyBub3QgY2FsbGVkXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZUNvbnRhaW5lclsgMCBdO1xuXHRcdH07XG5cblx0XHQvLyBmb3JjZSBqc29uIGRhdGFUeXBlXG5cdFx0cy5kYXRhVHlwZXNbIDAgXSA9IFwianNvblwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja1xuXHRcdG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcblx0XHR3aW5kb3dbIGNhbGxiYWNrTmFtZSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IGFyZ3VtZW50cztcblx0XHR9O1xuXG5cdFx0Ly8gQ2xlYW4tdXAgZnVuY3Rpb24gKGZpcmVzIGFmdGVyIGNvbnZlcnRlcnMpXG5cdFx0anFYSFIuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gUmVzdG9yZSBwcmVleGlzdGluZyB2YWx1ZVxuXHRcdFx0d2luZG93WyBjYWxsYmFja05hbWUgXSA9IG92ZXJ3cml0dGVuO1xuXG5cdFx0XHQvLyBTYXZlIGJhY2sgYXMgZnJlZVxuXHRcdFx0aWYgKCBzWyBjYWxsYmFja05hbWUgXSApIHtcblx0XHRcdFx0Ly8gbWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG5cdFx0XHRcdHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuXHRcdFx0XHQvLyBzYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG5cdFx0XHRcdG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FsbCBpZiBpdCB3YXMgYSBmdW5jdGlvbiBhbmQgd2UgaGF2ZSBhIHJlc3BvbnNlXG5cdFx0XHRpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBvdmVyd3JpdHRlbiApICkge1xuXHRcdFx0XHRvdmVyd3JpdHRlbiggcmVzcG9uc2VDb250YWluZXJbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXG5cdFx0Ly8gRGVsZWdhdGUgdG8gc2NyaXB0XG5cdFx0cmV0dXJuIFwic2NyaXB0XCI7XG5cdH1cbn0pO1xuXG5cblxuXG4vLyBkYXRhOiBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LCBkZWZhdWx0cyB0byBkb2N1bWVudFxuLy8ga2VlcFNjcmlwdHMgKG9wdGlvbmFsKTogSWYgdHJ1ZSwgd2lsbCBpbmNsdWRlIHNjcmlwdHMgcGFzc2VkIGluIHRoZSBodG1sIHN0cmluZ1xualF1ZXJ5LnBhcnNlSFRNTCA9IGZ1bmN0aW9uKCBkYXRhLCBjb250ZXh0LCBrZWVwU2NyaXB0cyApIHtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG5cdFx0Y29udGV4dCA9IGZhbHNlO1xuXHR9XG5cdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdHZhciBwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKSxcblx0XHRzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG5cdC8vIFNpbmdsZSB0YWdcblx0aWYgKCBwYXJzZWQgKSB7XG5cdFx0cmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbMV0gKSBdO1xuXHR9XG5cblx0cGFyc2VkID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbi8vIEtlZXAgYSBjb3B5IG9mIHRoZSBvbGQgbG9hZCBtZXRob2RcbnZhciBfbG9hZCA9IGpRdWVyeS5mbi5sb2FkO1xuXG4vKipcbiAqIExvYWQgYSB1cmwgaW50byBhIHBhZ2VcbiAqL1xualF1ZXJ5LmZuLmxvYWQgPSBmdW5jdGlvbiggdXJsLCBwYXJhbXMsIGNhbGxiYWNrICkge1xuXHRpZiAoIHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIgJiYgX2xvYWQgKSB7XG5cdFx0cmV0dXJuIF9sb2FkLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0fVxuXG5cdHZhciBzZWxlY3RvciwgdHlwZSwgcmVzcG9uc2UsXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0b2ZmID0gdXJsLmluZGV4T2YoXCIgXCIpO1xuXG5cdGlmICggb2ZmID49IDAgKSB7XG5cdFx0c2VsZWN0b3IgPSBqUXVlcnkudHJpbSggdXJsLnNsaWNlKCBvZmYgKSApO1xuXHRcdHVybCA9IHVybC5zbGljZSggMCwgb2ZmICk7XG5cdH1cblxuXHQvLyBJZiBpdCdzIGEgZnVuY3Rpb25cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcGFyYW1zICkgKSB7XG5cblx0XHQvLyBXZSBhc3N1bWUgdGhhdCBpdCdzIHRoZSBjYWxsYmFja1xuXHRcdGNhbGxiYWNrID0gcGFyYW1zO1xuXHRcdHBhcmFtcyA9IHVuZGVmaW5lZDtcblxuXHQvLyBPdGhlcndpc2UsIGJ1aWxkIGEgcGFyYW0gc3RyaW5nXG5cdH0gZWxzZSBpZiAoIHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zID09PSBcIm9iamVjdFwiICkge1xuXHRcdHR5cGUgPSBcIlBPU1RcIjtcblx0fVxuXG5cdC8vIElmIHdlIGhhdmUgZWxlbWVudHMgdG8gbW9kaWZ5LCBtYWtlIHRoZSByZXF1ZXN0XG5cdGlmICggc2VsZi5sZW5ndGggPiAwICkge1xuXHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdHVybDogdXJsLFxuXG5cdFx0XHQvLyBpZiBcInR5cGVcIiB2YXJpYWJsZSBpcyB1bmRlZmluZWQsIHRoZW4gXCJHRVRcIiBtZXRob2Qgd2lsbCBiZSB1c2VkXG5cdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0ZGF0YVR5cGU6IFwiaHRtbFwiLFxuXHRcdFx0ZGF0YTogcGFyYW1zXG5cdFx0fSkuZG9uZShmdW5jdGlvbiggcmVzcG9uc2VUZXh0ICkge1xuXG5cdFx0XHQvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcblx0XHRcdHJlc3BvbnNlID0gYXJndW1lbnRzO1xuXG5cdFx0XHRzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuXHRcdFx0XHQvLyBJZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWQsIGxvY2F0ZSB0aGUgcmlnaHQgZWxlbWVudHMgaW4gYSBkdW1teSBkaXZcblx0XHRcdFx0Ly8gRXhjbHVkZSBzY3JpcHRzIHRvIGF2b2lkIElFICdQZXJtaXNzaW9uIERlbmllZCcgZXJyb3JzXG5cdFx0XHRcdGpRdWVyeShcIjxkaXY+XCIpLmFwcGVuZCggalF1ZXJ5LnBhcnNlSFRNTCggcmVzcG9uc2VUZXh0ICkgKS5maW5kKCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UgdXNlIHRoZSBmdWxsIHJlc3VsdFxuXHRcdFx0XHRyZXNwb25zZVRleHQgKTtcblxuXHRcdH0pLmNvbXBsZXRlKCBjYWxsYmFjayAmJiBmdW5jdGlvbigganFYSFIsIHN0YXR1cyApIHtcblx0XHRcdHNlbGYuZWFjaCggY2FsbGJhY2ssIHJlc3BvbnNlIHx8IFsganFYSFIucmVzcG9uc2VUZXh0LCBzdGF0dXMsIGpxWEhSIF0gKTtcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuXG5cblxualF1ZXJ5LmV4cHIuZmlsdGVycy5hbmltYXRlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdHJldHVybiBlbGVtID09PSBmbi5lbGVtO1xuXHR9KS5sZW5ndGg7XG59O1xuXG5cblxuXG52YXIgZG9jRWxlbSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbi8qKlxuICogR2V0cyBhIHdpbmRvdyBmcm9tIGFuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmlzV2luZG93KCBlbGVtICkgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuXHRzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuXHRcdHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG5cdFx0XHRwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuXHRcdFx0Y3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuXHRcdFx0cHJvcHMgPSB7fTtcblxuXHRcdC8vIFNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cblx0XHRpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0XHR9XG5cblx0XHRjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuXHRcdGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcblx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcblx0XHRjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcblx0XHRcdCggY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCApLmluZGV4T2YoXCJhdXRvXCIpID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlciB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuXHRcdFx0Y3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdGlvbnMgKSApIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGN1ck9mZnNldCApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG5cdFx0fVxuXHRcdGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcblx0XHR9XG5cblx0XHRpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuXHRcdFx0b3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHRoaXMgOlxuXHRcdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5Lm9mZnNldC5zZXRPZmZzZXQoIHRoaXMsIG9wdGlvbnMsIGkgKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dmFyIGRvY0VsZW0sIHdpbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRib3ggPSB7IHRvcDogMCwgbGVmdDogMCB9LFxuXHRcdFx0ZG9jID0gZWxlbSAmJiBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cblx0XHRpZiAoICFkb2MgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHQvLyBNYWtlIHN1cmUgaXQncyBub3QgYSBkaXNjb25uZWN0ZWQgRE9NIG5vZGVcblx0XHRpZiAoICFqUXVlcnkuY29udGFpbnMoIGRvY0VsZW0sIGVsZW0gKSApIHtcblx0XHRcdHJldHVybiBib3g7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZG9uJ3QgaGF2ZSBnQkNSLCBqdXN0IHVzZSAwLDAgcmF0aGVyIHRoYW4gZXJyb3Jcblx0XHQvLyBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IHN0cnVuZGVmaW5lZCApIHtcblx0XHRcdGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0fVxuXHRcdHdpbiA9IGdldFdpbmRvdyggZG9jICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogYm94LnRvcCArIHdpbi5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wLFxuXHRcdFx0bGVmdDogYm94LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnRcblx0XHR9O1xuXHR9LFxuXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWyAwIF0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cblx0XHQvLyBGaXhlZCBlbGVtZW50cyBhcmUgb2Zmc2V0IGZyb20gd2luZG93IChwYXJlbnRPZmZzZXQgPSB7dG9wOjAsIGxlZnQ6IDB9LCBiZWNhdXNlIGl0IGlzIGl0cyBvbmx5IG9mZnNldCBwYXJlbnRcblx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG5cdFx0XHQvLyBXZSBhc3N1bWUgdGhhdCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgYXZhaWxhYmxlIHdoZW4gY29tcHV0ZWQgcG9zaXRpb24gaXMgZml4ZWRcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gR2V0ICpyZWFsKiBvZmZzZXRQYXJlbnRcblx0XHRcdG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50KCk7XG5cblx0XHRcdC8vIEdldCBjb3JyZWN0IG9mZnNldHNcblx0XHRcdG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG5cdFx0XHRpZiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudFsgMCBdLCBcImh0bWxcIiApICkge1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xuXHRcdFx0cGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG5cdFx0XHRwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuXHRcdH1cblxuXHRcdC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcblx0XHRcdGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSApXG5cdFx0fTtcblx0fSxcblxuXHRvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCB8fCBkb2NFbGVtO1xuXG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudCwgXCJodG1sXCIgKSAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkgKSB7XG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlbTtcblx0XHR9KTtcblx0fVxufSk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG5cdGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcblx0XHRcdHZhciB3aW4gPSBnZXRXaW5kb3coIGVsZW0gKTtcblxuXHRcdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHdpbiA/IHdpblsgcHJvcCBdIDogZWxlbVsgbWV0aG9kIF07XG5cdFx0XHR9XG5cblx0XHRcdGlmICggd2luICkge1xuXHRcdFx0XHR3aW4uc2Nyb2xsVG8oXG5cdFx0XHRcdFx0IXRvcCA/IHZhbCA6IHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHR0b3AgPyB2YWwgOiB3aW5kb3cucGFnZVlPZmZzZXRcblx0XHRcdFx0KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbVsgbWV0aG9kIF0gPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSwgbWV0aG9kLCB2YWwsIGFyZ3VtZW50cy5sZW5ndGgsIG51bGwgKTtcblx0fTtcbn0pO1xuXG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgcGVyY2VudCB3aGVuIHNwZWNpZmllZCBmb3IgdG9wL2xlZnQvYm90dG9tL3JpZ2h0XG4vLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwgd2UganVzdCBjaGVjayBmb3IgaXQgaGVyZVxualF1ZXJ5LmVhY2goIFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oIGksIHByb3AgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnBpeGVsUG9zaXRpb24sXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Y29tcHV0ZWQgPSBjdXJDU1MoIGVsZW0sIHByb3AgKTtcblx0XHRcdFx0Ly8gaWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XG5cdFx0XHRcdHJldHVybiBybnVtbm9ucHgudGVzdCggY29tcHV0ZWQgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDpcblx0XHRcdFx0XHRjb21wdXRlZDtcblx0XHRcdH1cblx0XHR9XG5cdCk7XG59KTtcblxuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LCBmdW5jdGlvbiggZGVmYXVsdEV4dHJhLCBmdW5jTmFtZSApIHtcblx0XHQvLyBtYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcblx0XHRqUXVlcnkuZm5bIGZ1bmNOYW1lIF0gPSBmdW5jdGlvbiggbWFyZ2luLCB2YWx1ZSApIHtcblx0XHRcdHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmICggZGVmYXVsdEV4dHJhIHx8IHR5cGVvZiBtYXJnaW4gIT09IFwiYm9vbGVhblwiICksXG5cdFx0XHRcdGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcblxuXHRcdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cdFx0XHRcdFx0Ly8gQXMgb2YgNS84LzIwMTIgdGhpcyB3aWxsIHlpZWxkIGluY29ycmVjdCByZXN1bHRzIGZvciBNb2JpbGUgU2FmYXJpLCBidXQgdGhlcmVcblx0XHRcdFx0XHQvLyBpc24ndCBhIHdob2xlIGxvdCB3ZSBjYW4gZG8uIFNlZSBwdWxsIHJlcXVlc3QgYXQgdGhpcyBVUkwgZm9yIGRpc2N1c3Npb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC83NjRcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgZXh0cmEgKSA6XG5cblx0XHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcblx0XHRcdH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlLCBudWxsICk7XG5cdFx0fTtcblx0fSk7XG59KTtcblxuXG4vLyBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldFxualF1ZXJ5LmZuLnNpemUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubGVuZ3RoO1xufTtcblxualF1ZXJ5LmZuLmFuZFNlbGYgPSBqUXVlcnkuZm4uYWRkQmFjaztcblxuXG5cblxuLy8gUmVnaXN0ZXIgYXMgYSBuYW1lZCBBTUQgbW9kdWxlLCBzaW5jZSBqUXVlcnkgY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoIG90aGVyXG4vLyBmaWxlcyB0aGF0IG1heSB1c2UgZGVmaW5lLCBidXQgbm90IHZpYSBhIHByb3BlciBjb25jYXRlbmF0aW9uIHNjcmlwdCB0aGF0XG4vLyB1bmRlcnN0YW5kcyBhbm9ueW1vdXMgQU1EIG1vZHVsZXMuIEEgbmFtZWQgQU1EIGlzIHNhZmVzdCBhbmQgbW9zdCByb2J1c3Rcbi8vIHdheSB0byByZWdpc3Rlci4gTG93ZXJjYXNlIGpxdWVyeSBpcyB1c2VkIGJlY2F1c2UgQU1EIG1vZHVsZSBuYW1lcyBhcmVcbi8vIGRlcml2ZWQgZnJvbSBmaWxlIG5hbWVzLCBhbmQgalF1ZXJ5IGlzIG5vcm1hbGx5IGRlbGl2ZXJlZCBpbiBhIGxvd2VyY2FzZVxuLy8gZmlsZSBuYW1lLiBEbyB0aGlzIGFmdGVyIGNyZWF0aW5nIHRoZSBnbG9iYWwgc28gdGhhdCBpZiBhbiBBTUQgbW9kdWxlIHdhbnRzXG4vLyB0byBjYWxsIG5vQ29uZmxpY3QgdG8gaGlkZSB0aGlzIHZlcnNpb24gb2YgalF1ZXJ5LCBpdCB3aWxsIHdvcmsuXG5cbi8vIE5vdGUgdGhhdCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgbGlicmFyaWVzIHRoYXQgYXJlIG5vdCBqUXVlcnkgc2hvdWxkXG4vLyBkZWNsYXJlIHRoZW1zZWx2ZXMgYXMgYW5vbnltb3VzIG1vZHVsZXMsIGFuZCBhdm9pZCBzZXR0aW5nIGEgZ2xvYmFsIGlmIGFuXG4vLyBBTUQgbG9hZGVyIGlzIHByZXNlbnQuIGpRdWVyeSBpcyBhIHNwZWNpYWwgY2FzZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pyYnVya2UvcmVxdWlyZWpzL3dpa2kvVXBkYXRpbmctZXhpc3RpbmctbGlicmFyaWVzI3dpa2ktYW5vblxuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIFwianF1ZXJ5XCIsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5O1xuXHR9KTtcbn1cblxuXG5cblxudmFyXG5cdC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcblxuXHQvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfJCA9IHdpbmRvdy4kO1xuXG5qUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuXHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LiQgPSBfJDtcblx0fVxuXG5cdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5O1xufTtcblxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpblxuLy8gQU1EICgjNzEwMiNjb21tZW50OjEwLCBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzU1Nylcbi8vIGFuZCBDb21tb25KUyBmb3IgYnJvd3NlciBlbXVsYXRvcnMgKCMxMzU2NilcbmlmICggdHlwZW9mIG5vR2xvYmFsID09PSBzdHJ1bmRlZmluZWQgKSB7XG5cdHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcbn1cblxuXG5cblxucmV0dXJuIGpRdWVyeTtcblxufSkpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9ib3dlcl9jb21wb25lbnRzL2pxdWVyeS9kaXN0L2pxdWVyeS5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9kZWx0YS5qcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9kZWx0YS5qcy9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9kZWx0YS5qcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL3RyYWNldXItbG9hZGVyL2luZGV4LmpzP3NjcmlwdCEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9kZWx0YS5qcy9zcmMvZXhhbXBsZS9leGFtcGxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2RlbHRhLmpzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2RlbHRhLmpzL25vZGVfbW9kdWxlcy90cmFjZXVyLWxvYWRlci9pbmRleC5qcz9zY3JpcHQhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvc3JjL2V4YW1wbGUvZXhhbXBsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2RlbHRhLmpzL25vZGVfbW9kdWxlcy90cmFjZXVyLWxvYWRlci9pbmRleC5qcz9zY3JpcHQhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvc3JjL2V4YW1wbGUvZXhhbXBsZS5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXTtcblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZXhhbXBsZS9leGFtcGxlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvZGVsdGEuanMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvY3NzVG9TdHJpbmcuanNcIikoKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiXSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vYXV0b3ByZWZpeGVyLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi9+L3RyYWNldXItbG9hZGVyP3NjcmlwdCEuL3NyYy9leGFtcGxlL2V4YW1wbGUuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImRlZmluZSgoKSA9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgVSA9IHtcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBjbGFzcywgZ2l2ZW4gYSBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3Q2xhc3MoY29uc3RydWN0b3IsIHByb3RvdHlwZSA9IHt9KSB7XG5cdFx0XHR2YXIgY2xzID0gY29uc3RydWN0b3I7XG5cdFx0XHRjbHMucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y2xzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNscztcblx0XHRcdHJldHVybiBjbHM7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjbHMgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcblx0XHRcdGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcblx0XHRcdFUuZXh0ZW5kKGNscy5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjbHMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2xzO1xuXHRcdFx0cmV0dXJuIGNscztcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgYXJyYXkgYG9ialtuYW1lXWA7IGlmIGBvYmpbbmFtZV1gIGlzIG5vdFxuXHRcdC8vIGFuIGFycmF5LCBtYWtlIGl0IGFuIGVtcHR5IGFycmF5IGZpcnN0XG5cdFx0YXJyYXkob2JqLCBuYW1lKSB7XG5cdFx0XHRpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7IG9ialtuYW1lXSA9IFtdIH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IHRha2luZyBhbiBhcnJheSBsaWtlIGBGdW5jdGlvbi5hcHBseWAgZG9lc1xuXHRcdGJpbmRBKGZuLCBjdHgsIGFyZ3MpIHsgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSkgfSxcblxuXHRcdC8vIGBGdW5jdGlvbi5iaW5kYCwgYnV0IG9ubHkgaGF2aW5nIHRvIHNwZWNpZnkgdGhlIGNvbnRleHQtb2JqZWN0IG9uY2Vcblx0XHRiaW5kKG9iaiwgbSwgLi4uYXJncykgeyByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncykgfSxcblxuXHRcdC8vIGFsbG93cyB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3IgdG8gYmUgdXNlZFxuXHRcdC8vIHdpdGggYW4gYXJyYXkgb2YgZm9ybWFsIHBhcmFtZXRlcnNcblx0XHRhcHBseUNvbnN0cnVjdG9yKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcblx0XHRcdHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuXHRcdFx0cmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG5cdFx0fSxcblxuXHRcdC8vIGEgc2ltcGxlIGBhc3NlcnRgIGZ1bmN0aW9uLCB0byBleHByZXNzIGFcblx0XHQvLyBjb25kaXRpb24gdGhhdCBpcyBleHBlY3RlZCB0byBiZSB0cnVlXG5cdFx0YXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuXHRcdFx0aWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpIH1cblx0XHR9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGB1bmRlZmluZWRgXG5cdFx0aXNVbmRlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gdGVzdCBpZiBhIHZhbHVlIGlzIGRlZmluZWQgKG5vdCBgdW5kZWZpbmVkYClcblx0XHRpc0RlZmluZWQodmFsKSB7IHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyB9LFxuXG5cdFx0Ly8gcmVwZWF0IGEgc3RyaW5nIGEgZ2l2ZW4gbnVtYmVyIG9mIHRpbWVzXG5cdFx0cmVwZWF0KG5yLCBzdHIpIHsgcmV0dXJuIG5ldyBBcnJheShucisxKS5qb2luKHN0cikgfVxuXHR9O1xuXG5cdHJldHVybiBVO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9taXNjLmpzXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcyk7XHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0Ly8gdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLyosIHNvdXJjZU1hcDogc291cmNlTWFwKi99O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24obmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAvKiYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAqLylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdC8vIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHQvLyBObyBicm93c2VyIHN1cHBvcnRcclxuXHQvLyBpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0Ly8gdHJ5IHtcclxuXHRcdFx0Ly8gY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0Ly8gfSBjYXRjaChlKSB7fVxyXG5cdC8vIH1cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG5cclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6IjEuZXhhbXBsZS5qcyJ9