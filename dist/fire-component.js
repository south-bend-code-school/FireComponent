/*!
 * fire-component v1.0.0
 * (c) 2019 David Mattia
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FireComponent"] = factory();
	else
		root["FireComponent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    path: {
      required: true,
      validator: function validator() {
        throw new Error('NOT IMPLEMENTED');
      }
    },
    customTag: {
      type: String,
      default: 'div'
    }
  },
  data: function data() {
    return {
      componentEditable: false,
      isEditing: false,
      shownVal: this.value,
      sourceChanged: false,
      updating: false,
      isBlurring: false,
      showEditableIndicator: false
    };
  },
  created: function created() {
    this.$fc_permission.bus.$on('permissionChange', this.editableMixinPermissionChange);
  },
  beforeDestroy: function beforeDestroy() {
    this.$fc_permission.bus.$off('permissionChange', this.editableMixinPermissionChange);
  },

  watch: {
    content: function content(val, old) {
      if (!this.isEditing && old === this.shownVal || !this.componentEditable) {
        this.shownVal = val;
      }
    },

    reference: {
      handler: function handler(val) {
        var _this = this;

        if (val) {
          this.loading = true;
          this.loadData(val).catch(function () {
            // TODO: Display error
          }).then(function () {
            _this.loading = false;
            _this.shownVal = _this.content;
          });
        }
      },

      immediate: true
    },
    shownVal: function shownVal(val) {
      var _this2 = this;

      this.$nextTick(function () {
        if (_this2.$refs.editElement) {
          _this2.$refs.editElement.innerText = val;
        }
      });
    }
  },
  computed: {
    reference: function reference() {
      throw new Error('NOT IMPLEMENTED');
    }
  },
  methods: {
    editableMixinPermissionChange: function editableMixinPermissionChange(permission) {
      this.componentEditable = !!permission;
    },
    editableOnFocus: function editableOnFocus() {
      this.isEditing = true;
      this.isBlurring = false;
    },
    editableOnBlur: function editableOnBlur() {
      var _this3 = this;

      this.isBlurring = true;
      setTimeout(function () {
        _this3.isEditing = !_this3.isBlurring;
      }, 10);
    },
    editableOnInput: function editableOnInput(e) {
      this.shownVal = e.target.textContent;
    },
    editableOnSave: function editableOnSave() {
      var _this4 = this;

      this.updating = true;
      this.shownVal = this.$refs.editElement.textContent;
      this.updateData(this.shownVal).then(function () {
        _this4.updating = false;
      });
    },
    editableOnCancel: function editableOnCancel() {
      this.shownVal = this.content;
    },
    loadData: function loadData() {
      throw new Error('NOT IMPLEMENTED');
    },
    updateData: function updateData() {
      throw new Error('NOT IMPLEMENTED');
    },
    editableOnMouseOver: function editableOnMouseOver() {
      this.showEditableIndicator = true;
    },
    editableOnMouseLeave: function editableOnMouseLeave() {
      this.showEditableIndicator = false;
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Valid path for a Firestore DocumentReference
var VALID_DOC_PATH = exports.VALID_DOC_PATH = /^\/?[A-Za-z0-9_]+\/[A-Za-z0-9_]+(\/[A-Za-z0-9_]+\/[A-Za-z0-9_]+)*\/?$/;

// Valid path for a Firestore CollectionReference
var VALID_COLL_PATH = exports.VALID_COLL_PATH = /^\/?[A-Za-z0-9_]+(\/[A-Za-z0-9_]+\/[A-Za-z0-9_]+)*\/?$/;

// Valid path for a Firestore DocumentSnapshot Field
var VALID_FIELD_PATH = exports.VALID_FIELD_PATH = /^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)*$/;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EditableManager;
function EditableManager(_Vue) {
  this.bus = new _Vue();

  this.permissionChange = function () {
    var _bus;

    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    (_bus = this.bus).$emit.apply(_bus, ['permissionChange'].concat(params));
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FireMessenger;
function FireMessenger(_Vue) {
  this.bus = new _Vue();
  this.send = function (message) {
    this.bus.$emit(message);
  };
  this.save = function () {
    this.send('save');
  };
  this.reset = function () {
    this.send('reset');
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ImageBus;
function ImageBus(_Vue) {
  this.bus = new _Vue();

  this.newUpload = function () {
    var _bus;

    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    (_bus = this.bus).$emit.apply(_bus, ['newUpload'].concat(params));
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(37),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2ca2147c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/FireInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FireInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ca2147c", Component.options)
  } else {
    hotAPI.reload("data-v-2ca2147c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(39),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6bca1b64",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/InlineEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] InlineEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bca1b64", Component.options)
  } else {
    hotAPI.reload("data-v-6bca1b64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(38),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2d7d06d5",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/firestore/Number.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Number.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d7d06d5", Component.options)
  } else {
    hotAPI.reload("data-v-2d7d06d5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(36),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1f05abb9",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/firestore/Text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f05abb9", Component.options)
  } else {
    hotAPI.reload("data-v-1f05abb9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(41),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-bc5945b8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/rtdb/Text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bc5945b8", Component.options)
  } else {
    hotAPI.reload("data-v-bc5945b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(25)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/storage/Editor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Editor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1acc222e", Component.options)
  } else {
    hotAPI.reload("data-v-1acc222e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(30)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(40),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b6463ee2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/brich/apps/sbcs/FireComponent/src/components/storage/Image.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Image.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6463ee2", Component.options)
  } else {
    hotAPI.reload("data-v-b6463ee2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'fire-input',
  props: {
    'path': {
      required: true,
      type: [String]
    },
    'editable': {
      required: true,
      type: [Boolean]
    },
    'useTransaction': {
      type: [Boolean],
      default: false
    },
    'customTag': {
      type: [String],
      default: 'span'
    },
    'editorStyle': {
      type: [Object],
      default: function _default() {
        return Object.create(null);
      }
    }
  },
  data: function data() {
    return {
      content: null,
      snapshotVal: null,
      editableContentSnapshot: null,
      unsub: null,
      hasChanges: false,
      saving: false,
      error: null,
      startTime: null,
      isLoaded: false,
      firebaseRef: this.$firebase.database().ref(this.path),
      editorKey: 'editor-' + Math.random().toString(36).substring(4)
    };
  },

  watch: {
    'editable': function editable(val) {
      if (!val) {
        this.updateContent();
      }
    },
    'snapshotVal': function snapshotVal(val) {
      if (!this.editable || !this.isLoaded) {
        this.isLoaded = true;
        this.updateContent();
      }
    }
  },
  methods: {
    updateContent: function updateContent() {
      this.hasChanges = false;
      this.content = this.snapshotVal;
      this.editableContentSnapshot = this.snapshotVal;
    },
    finished: function finished() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.error) {
          _this.reset();
        }
        _this.saving = false;
      });
    },
    save: function save() {
      var _this2 = this;

      this.saving = true;

      if (this.useTransaction && typeof this.snapshotVal === 'number') {
        this.firebaseRef.transaction(function (value) {
          var diff = _this2.snapshotVal.constructor(_this2.editableContentSnapshot) - _this2.content;
          return value + diff;
        }, function (err, committed, snapshot) {
          if (err) {
            _this2.error = err;
          } else if (!committed) {
            _this2.error = 'Did not save.';
          }

          _this2.finished();
        }, false);
      } else {
        this.firebaseRef.set(this.snapshotVal.constructor(this.editableContentSnapshot)).catch(function (err) {
          _this2.error = err;
        }).then(this.finished);
      }
    },
    reset: function reset() {
      var _this3 = this;

      this.updateContent();

      this.$nextTick(function () {
        if (_this3.$refs.editor.innerText !== _this3.editableContentSnapshot) {
          _this3.$refs.editor.innerText = _this3.editableContentSnapshot;
        }
      });
    },
    contentChangeEventHandler: function contentChangeEventHandler(e) {
      this.editableContentSnapshot = e.target.innerText;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.isLoaded = false;

    this.unsub = this.firebaseRef.on('value', function (snapshot) {
      _this4.hasChanges = true;
      _this4.snapshotVal = snapshot.exists() ? snapshot.val() : null;
    });

    this.$fc_messenger.bus.$on('save', this.save);
    this.$fc_messenger.bus.$on('reset', this.reset);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.unsub) {
      this.firebaseRef.off('value', this.unsub);
    }
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'FireComponentInlineEditor',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    editable: {
      required: true,
      type: [Boolean]
    },
    customTag: {
      type: [String],
      default: 'span'
    },
    editorStyle: {
      type: [Object],
      default: function _default() {
        return Object.create(null);
      }
    }
  },
  data: function data() {
    return {
      uniqueKey: 'firecomponent--inline-editor--' + this.$uniqId,
      isEditing: false
    };
  },

  computed: {
    title: function title() {
      if (this.editable) {
        return 'Click to Edit';
      }
      return null;
    }
  },
  methods: {
    contentChangeEventHandler: function contentChangeEventHandler(e) {
      this.$emit('input', e);
    },
    startEdit: function startEdit(e) {
      this.isEditing = this.editable;
    },
    stopEdit: function stopEdit(e) {
      this.isEditing = false;
    },
    attemptStop: function attemptStop(e) {
      this.isEditing = this.$refs.editor === document.activeElement;
    }
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditableMixin = __webpack_require__(2);

var _EditableMixin2 = _interopRequireDefault(_EditableMixin);

var _firestore = __webpack_require__(3);

var FirestoreHelpers = _interopRequireWildcard(_firestore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_EditableMixin2.default],
  name: 'FireComponent-Firestore-Number',
  props: {
    path: {
      required: true,
      validator: function validator(path) {
        return path.hasOwnProperty('firestore') && path.hasOwnProperty('collection') || FirestoreHelpers.VALID_DOC_PATH.test(path);
      }
    },
    fieldPath: {
      type: Array,
      required: true,
      validator: function validator(fieldPath) {
        return fieldPath.reduce(function (p, c) {
          return p && c.constructor === String;
        });
      }
    }
  },
  data: function data() {
    return {
      document: null
    };
  },

  computed: {
    content: function content() {
      try {
        return this.fieldPath.reduce(function (path, step) {
          return path[step];
        }, this.document) || 0;
      } catch (e) {
        return 0;
      }
    },
    reference: function reference() {
      if (typeof this.path === 'string') {
        return this.$firebase.firestore().doc(this.path);
      }

      return this.path;
    }
  },
  methods: {
    loadData: function loadData(path) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.$bindAsObject('document', path, reject, resolve);
      });
    },
    updateData: function updateData(val) {
      return this.reference.update(this.fieldPath.join('.'), val);
    },
    editableOnInput: function editableOnInput(e) {
      this.shownVal = Number(e.target.textContent.replace(/[^0-9\.]/g, ''));
    }
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditableMixin = __webpack_require__(2);

var _EditableMixin2 = _interopRequireDefault(_EditableMixin);

var _firestore = __webpack_require__(3);

var FirestoreHelpers = _interopRequireWildcard(_firestore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_EditableMixin2.default],
  name: 'FireComponent-Firestore-Text',
  props: {
    path: {
      required: true,
      validator: function validator(path) {
        return path.hasOwnProperty('firestore') && path.hasOwnProperty('collection') || FirestoreHelpers.VALID_DOC_PATH.test(path);
      }
    },
    fieldPath: {
      type: Array,
      required: true,
      validator: function validator(fieldPath) {
        return fieldPath.reduce(function (p, c) {
          return p && c.constructor === String;
        });
      }
    }
  },
  data: function data() {
    return {
      document: null
    };
  },

  computed: {
    content: function content() {
      try {
        return this.fieldPath.reduce(function (path, step) {
          return path[step];
        }, this.document) || '';
      } catch (e) {
        return '';
      }
    },
    reference: function reference() {
      if (typeof this.path === 'string') {
        return this.$firebase.firestore().doc(this.path);
      }

      return this.path;
    }
  },
  methods: {
    loadData: function loadData(path) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.$bindAsObject('document', path, reject, resolve);
      });
    },
    updateData: function updateData(val) {
      return this.reference.update(this.fieldPath.join('.'), val);
    }
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditableMixin = __webpack_require__(2);

var _EditableMixin2 = _interopRequireDefault(_EditableMixin);

var _rtdb = __webpack_require__(21);

var RTDBHelpers = _interopRequireWildcard(_rtdb);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_EditableMixin2.default],
  name: 'FireComponent-RTDB-Text',
  props: {
    path: {
      required: true,
      validator: function validator(path) {
        return path.hasOwnProperty('root') || RTDBHelpers.VALID_PATH.test(path);
      }
    }
  },
  data: function data() {
    return {
      json: null
    };
  },

  computed: {
    content: function content() {
      try {
        return this.json['.value'] || '';
      } catch (e) {
        return '';
      }
    },
    reference: function reference() {
      return this.$firebase.database().ref(this.path);
    }
  },
  methods: {
    loadData: function loadData(path) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.$bindAsObject('json', path, reject, resolve);
      });
    },
    updateData: function updateData(val) {
      return this.reference.set(val);
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _croppie = __webpack_require__(24);

var _croppie2 = _interopRequireDefault(_croppie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'FireImageEditor',
  data: function data() {
    return {
      event: null,
      croppie: null,
      location: null,
      task: null,
      config: null,
      tasks: {},
      uploading: false,
      watchers: {}
    };
  },
  created: function created() {
    this.$fc_image.bus.$on('newUpload', this.handleUpload);
  },

  computed: {
    storageRef: function storageRef() {
      return this.$firebase.storage().refFromURL(this.location || '');
    },
    fileURL: function fileURL() {
      return this.files.length ? window.URL.createObjectURL(this.files[0]) : '';
    },
    files: function files() {
      return this.event ? this.event.target.files : [];
    },
    viewport: function viewport() {
      if (!this.config) {
        return null;
      }
      var base = this.boundary.width * 0.8;
      var viewport = {
        type: this.config.circle ? 'circle' : 'square'
      };
      if (this.config.aspectRatio > 1) {
        viewport.width = base;
        viewport.height = base / this.config.aspectRatio;
      } else {
        viewport.width = base / this.config.aspectRatio;
        viewport.height = base;
      }
      return viewport;
    },
    boundary: function boundary() {
      var maxWidth = window.innerWidth * 0.8;
      var maxHeight = window.innerHeight * 0.5;
      var chosen = Math.min(maxWidth, maxHeight);
      return {
        width: chosen,
        height: chosen
      };
    },
    imageFormat: function imageFormat() {
      if (!this.config) {
        return null;
      }
      return this.config.circle ? 'png' : this.config.format;
    },
    allowOrientation: function allowOrientation() {
      return this.config ? this.config.enableOrientation : false;
    }
  },
  methods: {
    initializeCroppie: function initializeCroppie() {
      var _this = this;

      this.$nextTick(function () {
        _this.croppie = new window.Croppie(_this.$refs.croppie, {
          enforceBoundary: _this.config.enforceBoundary,
          enableOrientation: _this.config.enableOrientation,
          viewport: _this.viewport,
          boundary: _this.boundary
        });
        _this.croppie.bind({
          url: _this.fileURL
        });
      });
    },
    handleUpload: function handleUpload(location, e, config) {
      if (this.event || e.target.files.length <= 0) {
        return this.$fc_image.bus.$emit(location + '-cancelled', e);
      }
      this.event = e;
      this.location = location;
      this.config = config;
      this.initializeCroppie();
    },
    rotate: function rotate(degrees) {
      if (this.croppie && this.allowOrientation) {
        this.croppie.rotate(degrees);
      }
    },
    cancel: function cancel() {
      this.$fc_image.bus.$emit(this.location + '-cancelled', this.e);
      var tasks = this.tasks[this.location];
      if (tasks && tasks.length) {
        tasks.forEach(function (task) {
          task.cancel();
        });
      }
      this.teardown();
    },
    teardown: function teardown() {
      this.destroyCroppie();
      this.location = null;
      this.event = null;
      this.config = null;
    },
    destroyCroppie: function destroyCroppie() {
      if (this.croppie) {
        this.croppie.destroy();
        this.croppie = null;
      }
    },
    upload: function upload() {
      var _this2 = this;

      var locationCopy = this.location;
      var eventCopy = this.event;
      this.tasks[locationCopy] = [];
      this.uploading = true;
      Promise.all(this.config.widths.map(function (width, index) {
        var ref = _this2.storageRef.child(index + '');
        return _this2.getCroppedImage(width).then(function (image) {
          return _this2.uploadToCloudStorage(image, ref);
        });
      })).then(function (snapshots) {
        if (locationCopy === _this2.location) {
          _this2.teardown();
          _this2.uploading = false;
        }
        _this2.tasks[locationCopy] = null;
        _this2.$fc_image.bus.$emit(locationCopy + '-completed', eventCopy, snapshots.map(function (ss) {
          return ss.downloadURL;
        }));
      });
    },
    getCroppedImage: function getCroppedImage(width) {
      return this.croppie.result({
        type: 'blob',
        size: {
          width: width
        },
        format: this.imageFormat,
        circle: this.config.circle,
        quality: this.config.quality || 1
      });
    },
    uploadToCloudStorage: function uploadToCloudStorage(image, ref) {
      var task = ref.put(image);
      this.tasks[this.location].push(task);
      return task;
    },
    continueWithoutWaiting: function continueWithoutWaiting() {
      this.teardown();
      this.uploading = false;
    }
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = __webpack_require__(22);

var StorageHelpers = _interopRequireWildcard(_storage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  name: 'fire-image',
  props: {
    path: {
      type: [Object, String],
      required: true,
      validator: function validator(path) {
        return !!path.bucket && typeof path.bucket === 'string' || StorageHelpers.VALID_PATH.test(path);
      }
    },
    editable: {
      type: [Boolean],
      default: function _default() {
        return false;
      }
    },
    aspectRatio: {
      type: [Number],
      default: function _default() {
        return 1.0;
      }
    },
    widths: {
      type: [Array],
      default: function _default() {
        return [320, 500];
      }
    },
    quality: {
      type: [Number],
      default: function _default() {
        return 1.0;
      }
    },
    circle: {
      type: [Boolean],
      default: function _default() {
        return false;
      }
    },
    enforceBoundary: {
      type: [Boolean],
      default: function _default() {
        return true;
      }
    },
    allowRotations: {
      type: [Boolean],
      default: function _default() {
        return true;
      }
    },
    bgColor: {
      type: [String],
      default: 'inherit'
    },
    noImageText: {
      type: [String],
      default: 'No Image'
    },
    textColor: {
      type: [String],
      default: '#909090'
    }
  },

  data: function data() {
    return {
      newUpload: false,
      index: null,
      imageURL: '',
      showEdit: false,
      width: 0,
      height: 0,
      loading: true
    };
  },

  computed: {
    /**
     * A unique id for this fire-image component
     */
    showEditBtn: function showEditBtn() {
      return this.editable && this.showEdit;
    },
    uniqueName: function uniqueName() {
      return Math.random().toString(36).substring(4);
    },
    padding: function padding() {
      return 1 / this.aspectRatio;
    },
    format: function format() {
      if (this.quality < 1) {
        return 'jpeg';
      }
      return 'png';
    },
    reference: function reference() {
      if (this.path) {
        try {
          return typeof this.path === 'string' ? this.$firebase.storage().ref(this.path) : this.$firebase.storage().refFromURL(this.path.toString());
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    },
    displayURL: function displayURL() {
      return this.imageURL || '"data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'' + 50 / this.aspectRatio + 'px\' width=\'50px\'><text text-anchor=\'middle\' x=\'25\' y=\'' + 25 / this.aspectRatio + '\' fill=\'' + this.textColor + '\' font-size=\'5\'>' + (this.loading ? 'Loading...' : this.noImageText) + '</text></svg>"';
    }
  },
  watch: {
    reference: {
      handler: function handler(val) {
        var _this = this;

        this.$nextTick(function () {
          if (val) {
            _this.loadFromStorage(val);
          }
        });
      },

      immediate: true
    }
  },
  methods: {
    loadFromStorage: function loadFromStorage(reference) {
      var _this2 = this;

      this.loading = true;
      this.imageURL = '';
      reference = reference.child('' + this.getIndexToDisplay());
      reference.getDownloadURL().then(function (url) {
        if (reference.parent.toString() !== _this2.reference.toString()) {
          return;
        }
        _this2.imageURL = url;
      }).catch(function (err) {
        if (true) {
          console.error(err);
        }
      }).then(function () {
        _this2.loading = false;
      });
    },
    getIndexToDisplay: function getIndexToDisplay() {
      var displaySize = this.$refs.root.clientWidth;
      var min = {
        index: 0,
        offset: null
      };
      this.widths.forEach(function (width, i) {
        var offset = Math.abs(width - displaySize);
        if (min.offset === null || offset < min.offset) {
          min = {
            index: i,
            offset: offset
          };
        }
      });
      this.index = min.index;
      return min.index;
    },
    imageUploaded: function imageUploaded(e) {
      var location = this.reference.toString();
      var config = {
        widths: this.widths,
        aspectRatio: this.aspectRatio,
        enforceBoundary: this.enforceBoundary,
        allowRotations: this.allowRotations,
        circle: this.circle,
        format: this.format
      };
      this.$fc_image.bus.$on(location + '-cancelled', this.newCancelledCallback(location));
      this.$fc_image.bus.$on(location + '-completed', this.newCompletedCallback(location));
      this.$fc_image.newUpload(location, e, config);
    },
    newCancelledCallback: function newCancelledCallback(location) {
      var _this3 = this;

      var callback = function callback() {
        _this3.$fc_image.bus.$off(location + '-cancelled', callback);
      };
      return callback;
    },
    newCompletedCallback: function newCompletedCallback(location) {
      var _this4 = this;

      var callback = function callback(e, urls) {
        _this4.$fc_image.bus.$off(location + '-completed', callback);
        var index = _this4.getIndexToDisplay();
        if (!urls[index]) {
          _this4.loadFromStorage(_this4.reference);
        } else {
          _this4.imageURL = urls[index];
        }
      };
      return callback;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var VALID_PATH = exports.VALID_PATH = /^\/?[A-Za-z0-9_]+(\/[A-Za-z0-9_]+)*\/?$/;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Valid path for a Firebase Storage Reference
var VALID_PATH = exports.VALID_PATH = /^\/?[A-Za-z0-9_]+(\/[A-Za-z0-9_]+)*\/?$/;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireInput = exports.StorageImage = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Legacy


// New


exports.install = install;

var _FireInput = __webpack_require__(7);

var _FireInput2 = _interopRequireDefault(_FireInput);

var _InlineEditor = __webpack_require__(8);

var _InlineEditor2 = _interopRequireDefault(_InlineEditor);

var _Number = __webpack_require__(9);

var _Number2 = _interopRequireDefault(_Number);

var _Text = __webpack_require__(10);

var _Text2 = _interopRequireDefault(_Text);

var _Text3 = __webpack_require__(11);

var _Text4 = _interopRequireDefault(_Text3);

var _Editor = __webpack_require__(12);

var _Editor2 = _interopRequireDefault(_Editor);

var _Image = __webpack_require__(13);

var _Image2 = _interopRequireDefault(_Image);

var _EditableManager = __webpack_require__(4);

var _EditableManager2 = _interopRequireDefault(_EditableManager);

var _ImageBus = __webpack_require__(6);

var _ImageBus2 = _interopRequireDefault(_ImageBus);

var _FireMessenger = __webpack_require__(5);

var _FireMessenger2 = _interopRequireDefault(_FireMessenger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installBuses(_Vue) {
  _Vue.prototype.$fc_image = new _ImageBus2.default(_Vue);
  _Vue.prototype.$fc_messenger = new _FireMessenger2.default(_Vue);
  _Vue.prototype.$fc_permission = new _EditableManager2.default(_Vue);
}

function installProperties(_Vue) {
  // Add a accessor for getting the unique id of the component
  Object.defineProperty(_Vue.prototype, '$uniqId', {
    get: function get() {
      return this._uid;
    }
  });
}

function insertComponent(_Vue, _Component, anchorId, tag) {
  var insertElem = window.document.createElement(tag || "div");
  insertElem.id = anchorId;
  window.document.body.appendChild(insertElem);
  new _Vue({
    el: '#' + anchorId,
    render: function render(h) {
      return h(_Component);
    }
  });
}

function insertSingularComponents(_Vue) {
  insertComponent(_Vue, _Editor2.default, 'firecomponent--image-editor', 'div');
}

function registerGlobalComponents(_Vue) {
  // Legacy
  _Vue.component('fire-image', _Image2.default);
  _Vue.component('fire-input', _FireInput2.default);
  _Vue.component('fire-text', _Text4.default);
  _Vue.component('fire-inline-editor', _InlineEditor2.default);

  // New
  _Vue.component('rtdb-text', _Text4.default);
  _Vue.component('firestore-text', _Text2.default);
  _Vue.component('firestore-number', _Number2.default);
  _Vue.component('storage-image', _Image2.default);
}

// Install the Package
function install(Vue, firebase) {
  if ((typeof firebase === 'undefined' ? 'undefined' : _typeof(firebase)) === 'object') {
    Vue.prototype.$firebase = firebase;
  } else {
    console.error('You must add your firebase configuration object to the firecomponent library');
    return;
  }

  installBuses(Vue);
  installProperties(Vue);
  insertSingularComponents(Vue);
  registerGlobalComponents(Vue);
}

// Expose the components
exports.StorageImage = _Image2.default;
exports.FireInput = _FireInput2.default;

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin

var plugin = {
  /* eslint-disable no-undef */
  install: install
};

exports.default = plugin;

// Auto-install

var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.initializeApp = function (config) {
    Vue.use(plugin, config);
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*************************
 * Croppie
 * Copyright 2018
 * Foliotek
 * Version: 2.6.2
 *************************/
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {

    /* Polyfills */
    if (typeof Promise !== 'function') {
        /*! promise-polyfill 3.1.0 */
        !function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void k(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"===typeof a||"function"===typeof a)){var c=a.then;if("function"===typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"===typeof a?a:null,this.onRejected="function"===typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=setTimeout,k="function"===typeof setImmediate&&setImmediate||function(a){j(a,1)},l=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&l(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"===typeof g||"function"===typeof g)){var h=g.then;if("function"===typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"===typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){k=a},"undefined"!==typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);
    }

    if ( typeof window.CustomEvent !== "function" ) {
        (function(){
            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }
            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        }());
    }

    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
                var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

                for (var i=0; i<len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            }
        });
    }
    /* End Polyfills */

    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = document.createElement('div').style,
        EXIF_NORM = [1,8,3,6],
        EXIF_FLIP = [2,7,4,5],
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');

    function getExifOffset(ornt, rotate) {
        var arr = EXIF_NORM.indexOf(ornt) > -1 ? EXIF_NORM : EXIF_FLIP,
            index = arr.indexOf(ornt),
            offset = (rotate / 90) % arr.length;// 180 = 2%4 = 2 shift exif by 2 indexes

        return arr[(arr.length + index + (offset % arr.length)) % arr.length];
    }

    // Credits to : Andrew Dupont - http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
    function deepExtend(destination, source) {
        destination = destination || {};
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function clone(object) {
        return deepExtend({}, object);
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    function addClass(el, c) {
        if (el.classList) {
            el.classList.add(c);
        }
        else {
            el.className += ' ' + c;
        }
    }

    function removeClass(el, c) {
        if (el.classList) {
            el.classList.remove(c);
        }
        else {
            el.className = el.className.replace(c, '');
        }
    }

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function num(v) {
        return parseInt(v, 10);
    }

    /* Utilities */
    function loadImage(src, doExif) {
        var img = new Image();
        img.style.opacity = 0;
        return new Promise(function (resolve) {
            function _resolve() {
                img.style.opacity = 1;
                setTimeout(function () {
                    resolve(img);
                }, 1);
            }

            img.removeAttribute('crossOrigin');
            if (src.match(/^https?:\/\/|^\/\//)) {
                img.setAttribute('crossOrigin', 'anonymous');
            }

            img.onload = function () {
                if (doExif) {
                    EXIF.getData(img, function () {
                        _resolve();
                    });
                }
                else {
                    _resolve();
                }
            };
            img.src = src;
        });
    }

    function naturalImageDimensions(img, ornt) {
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var orient = ornt || getExifOrientation(img);
        if (orient && orient >= 5) {
            var x= w;
            w = h;
            h = x;
        }
        return { width: w, height: h };
    }

    /* CSS Transform Prototype */
    var TRANSLATE_OPTS = {
        'translate3d': {
            suffix: ', 0px'
        },
        'translate': {
            suffix: ''
        }
    };
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(num(vals[4]), num(vals[5]), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(Croppie.globals.translate.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    };

    Transform.prototype.toString = function () {
        var suffix = TRANSLATE_OPTS[Croppie.globals.translate].suffix || '';
        return Croppie.globals.translate + '(' + this.x + 'px, ' + this.y + 'px' + suffix + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    function getExifOrientation (img) {
        return img.exifdata ? img.exifdata.Orientation : 1;
    }

    function drawCanvas(canvas, img, orientation) {
        var width = img.width,
            height = img.height,
            ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();
        switch (orientation) {
          case 2:
             ctx.translate(width, 0);
             ctx.scale(-1, 1);
             break;

          case 3:
              ctx.translate(width, height);
              ctx.rotate(180*Math.PI/180);
              break;

          case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;

          case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.scale(1, -1);
              break;

          case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.translate(0, -height);
              break;

          case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(-90*Math.PI/180);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;

          case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(-90*Math.PI/180);
              break;
        }
        ctx.drawImage(img, 0,0, width, height);
        ctx.restore();
    }

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = 'croppie-container',
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
            boundary, img, viewport, overlay, bw, bh;

        self.options.useCanvas = self.options.enableOrientation || _hasExif.call(self);
        // Properties on class
        self.data = {};
        self.elements = {};

        boundary = self.elements.boundary = document.createElement('div');
        viewport = self.elements.viewport = document.createElement('div');
        img = self.elements.img = document.createElement('img');
        overlay = self.elements.overlay = document.createElement('div');

        if (self.options.useCanvas) {
            self.elements.canvas = document.createElement('canvas');
            self.elements.preview = self.elements.canvas;
        }
        else {
            self.elements.preview = self.elements.img;
        }

        addClass(boundary, 'cr-boundary');
        boundary.setAttribute('aria-dropeffect', 'none');
        bw = self.options.boundary.width;
        bh = self.options.boundary.height;
        css(boundary, {
            width: (bw + (isNaN(bw) ? '' : 'px')),
            height: (bh + (isNaN(bh) ? '' : 'px'))
        });

        addClass(viewport, 'cr-viewport');
        if (customViewportClass) {
            addClass(viewport, customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });
        viewport.setAttribute('tabindex', 0);

        addClass(self.elements.preview, 'cr-image');
        setAttributes(self.elements.preview, { 'alt': 'preview', 'aria-grabbed': 'false' });
        addClass(overlay, 'cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(self.elements.preview);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        addClass(self.element, contClass);
        if (self.options.customClass) {
            addClass(self.element, self.options.customClass);
        }

        _initDraggable.call(this);

        if (self.options.enableZoom) {
            _initializeZoom.call(self);
        }

        // if (self.options.enableOrientation) {
        //     _initRotationControls.call(self);
        // }

        if (self.options.enableResize) {
            _initializeResize.call(self);
        }
    }

    // function _initRotationControls () {
    //     var self = this,
    //         wrap, btnLeft, btnRight, iLeft, iRight;

    //     wrap = document.createElement('div');
    //     self.elements.orientationBtnLeft = btnLeft = document.createElement('button');
    //     self.elements.orientationBtnRight = btnRight = document.createElement('button');

    //     wrap.appendChild(btnLeft);
    //     wrap.appendChild(btnRight);

    //     iLeft = document.createElement('i');
    //     iRight = document.createElement('i');
    //     btnLeft.appendChild(iLeft);
    //     btnRight.appendChild(iRight);

    //     addClass(wrap, 'cr-rotate-controls');
    //     addClass(btnLeft, 'cr-rotate-l');
    //     addClass(btnRight, 'cr-rotate-r');

    //     self.elements.boundary.appendChild(wrap);

    //     btnLeft.addEventListener('click', function () {
    //         self.rotate(-90);
    //     });
    //     btnRight.addEventListener('click', function () {
    //         self.rotate(90);
    //     });
    // }

    function _hasExif() {
        return this.options.enableExif && window.EXIF;
    }

    function _initializeResize () {
        var self = this;
        var wrap = document.createElement('div');
        var isDragging = false;
        var direction;
        var originalX;
        var originalY;
        var minSize = 50;
        var maxWidth;
        var maxHeight;
        var vr;
        var hr;

        addClass(wrap, 'cr-resizer');
        css(wrap, {
            width: this.options.viewport.width + 'px',
            height: this.options.viewport.height + 'px'
        });

        if (this.options.resizeControls.height) {
            vr = document.createElement('div');
            addClass(vr, 'cr-resizer-vertical');
            wrap.appendChild(vr);
        }

        if (this.options.resizeControls.width) {
            hr = document.createElement('div');
            addClass(hr, 'cr-resizer-horisontal');
            wrap.appendChild(hr);
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) {
                return;
            }

            var overlayRect = self.elements.overlay.getBoundingClientRect();

            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            direction = ev.currentTarget.className.indexOf('vertical') !== -1 ? 'v' : 'h';
            maxWidth = overlayRect.width;
            maxHeight = overlayRect.height;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }

            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
        }

        function mouseMove(ev) {
            var pageX = ev.pageX;
            var pageY = ev.pageY;

            ev.preventDefault();

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX;
            var deltaY = pageY - originalY;
            var newHeight = self.options.viewport.height + deltaY;
            var newWidth = self.options.viewport.width + deltaX;

            if (direction === 'v' && newHeight >= minSize && newHeight <= maxHeight) {
                css(wrap, {
                    height: newHeight + 'px'
                });

                self.options.boundary.height += deltaY;
                css(self.elements.boundary, {
                    height: self.options.boundary.height + 'px'
                });

                self.options.viewport.height += deltaY;
                css(self.elements.viewport, {
                    height: self.options.viewport.height + 'px'
                });
            }
            else if (direction === 'h' && newWidth >= minSize && newWidth <= maxWidth) {
                css(wrap, {
                    width: newWidth + 'px'
                });

                self.options.boundary.width += deltaX;
                css(self.elements.boundary, {
                    width: self.options.boundary.width + 'px'
                });

                self.options.viewport.width += deltaX;
                css(self.elements.viewport, {
                    width: self.options.viewport.width + 'px'
                });
            }

            _updateOverlay.call(self);
            _updateZoomLimits.call(self);
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
        }

        if (vr) {
            vr.addEventListener('mousedown', mouseDown);
            vr.addEventListener('touchstart', mouseDown);
        }

        if (hr) {
            hr.addEventListener('mousedown', mouseDown);
            hr.addEventListener('touchstart', mouseDown);
        }

        this.elements.boundary.appendChild(wrap);
    }

    function _setZoomerVal(v) {
        if (this.options.enableZoom) {
            var z = this.elements.zoomer,
                val = fix(v, 4);

            z.value = Math.max(z.min, Math.min(z.max, val));
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = self.elements.zoomerWrap = document.createElement('div'),
            zoomer = self.elements.zoomer = document.createElement('input');

        addClass(wrap, 'cr-slider-wrap');
        addClass(zoomer, 'cr-slider');
        zoomer.type = 'range';
        zoomer.step = '0.0001';
        zoomer.value = 1;
        zoomer.style.display = self.options.showZoomer ? '' : 'none';
        zoomer.setAttribute('aria-label', 'zoom');

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: new TransformOrigin(self.elements.preview),
                viewportRect: self.elements.viewport.getBoundingClientRect(),
                transform: Transform.parse(self.elements.preview)
            });
        }

        function scroll(ev) {
            var delta, targetZoom;

            if(self.options.mouseWheelZoom === 'ctrl' && ev.ctrlKey !== true){
              return 0; 
            } else if (ev.wheelDelta) {
                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
            } else if (ev.deltaY) {
                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
            } else if (ev.detail) {
                delta = ev.detail / -60; //delta min: -3 max: 3 // max x 10 x 2
            } else {
                delta = 0;
            }

            targetZoom = self._currentZoom + (delta * self._currentZoom);

            ev.preventDefault();
            _setZoomerVal.call(self, targetZoom);
            change.call(self);
        }

        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.elements.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.elements.boundary.addEventListener('mousewheel', scroll);
            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui ? ui.transform : Transform.parse(self.elements.preview),
            vpRect = ui ? ui.viewportRect : self.elements.viewport.getBoundingClientRect(),
            origin = ui ? ui.origin : new TransformOrigin(self.elements.preview);

        function applyCss() {
            var transCss = {};
            transCss[CSS_TRANSFORM] = transform.toString();
            transCss[CSS_TRANS_ORG] = origin.toString();
            css(self.elements.preview, transCss);
        }

        self._currentZoom = ui ? ui.value : self._currentZoom;
        transform.scale = self._currentZoom;
        self.elements.zoomer.setAttribute('aria-valuenow', self._currentZoom);
        applyCss();

        if (self.options.enforceBoundary) {
            var boundaries = _getVirtualBoundaries.call(self, vpRect),
                transBoundaries = boundaries.translate,
                oBoundaries = boundaries.origin;

            if (transform.x >= transBoundaries.maxX) {
                origin.x = oBoundaries.minX;
                transform.x = transBoundaries.maxX;
            }

            if (transform.x <= transBoundaries.minX) {
                origin.x = oBoundaries.maxX;
                transform.x = transBoundaries.minX;
            }

            if (transform.y >= transBoundaries.maxY) {
                origin.y = oBoundaries.minY;
                transform.y = transBoundaries.maxY;
            }

            if (transform.y <= transBoundaries.minY) {
                origin.y = oBoundaries.maxY;
                transform.y = transBoundaries.minY;
            }
        }
        applyCss();
        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.elements.boundary.clientWidth / 2,
            centerFromBoundaryY = self.elements.boundary.clientHeight / 2,
            imgRect = self.elements.preview.getBoundingClientRect(),
            curImgWidth = imgRect.width,
            curImgHeight = imgRect.height,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;

        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint() {
        var self = this,
            scale = self._currentZoom,
            data = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.elements.preview.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.elements.preview),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        center.y = top / scale;
        center.x = left / scale;

        adj.y = (center.y - pc.y) * (1 - scale);
        adj.x = (center.x - pc.x) * (1 - scale);

        transform.x -= adj.x;
        transform.y -= adj.y;

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.elements.preview, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect,
            transform;

        function assignTransformCoordinates(deltaX, deltaY) {
            var imgRect = self.elements.preview.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX;

            if (self.options.enforceBoundary) {
                if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                    transform.y = top;
                }

                if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                    transform.x = left;
                }
            }
            else {
                transform.y = top;
                transform.x = left;
            }
        }

        function toggleGrabState(isDragging) {
          self.elements.preview.setAttribute('aria-grabbed', isDragging);
          self.elements.boundary.setAttribute('aria-dropeffect', isDragging? 'move': 'none');
        }

        function keyDown(ev) {
            var LEFT_ARROW  = 37,
                UP_ARROW    = 38,
                RIGHT_ARROW = 39,
                DOWN_ARROW  = 40;

            if (ev.shiftKey && (ev.keyCode === UP_ARROW || ev.keyCode === DOWN_ARROW)) {
                var zoom = 0.0;
                if (ev.keyCode === UP_ARROW) {
                    zoom = parseFloat(self.elements.zoomer.value, 10) + parseFloat(self.elements.zoomer.step, 10)
                }
                else {
                    zoom = parseFloat(self.elements.zoomer.value, 10) - parseFloat(self.elements.zoomer.step, 10)
                }
                self.setZoom(zoom);
            }
            else if (self.options.enableKeyMovement && (ev.keyCode >= 37 && ev.keyCode <= 40)) {
                ev.preventDefault();
                var movement = parseKeyDown(ev.keyCode);

                transform = Transform.parse(self.elements.preview);
                document.body.style[CSS_USERSELECT] = 'none';
                vpRect = self.elements.viewport.getBoundingClientRect();
                keyMove(movement);
            }

            function parseKeyDown(key) {
                switch (key) {
                    case LEFT_ARROW:
                        return [1, 0];
                    case UP_ARROW:
                        return [0, 1];
                    case RIGHT_ARROW:
                        return [-1, 0];
                    case DOWN_ARROW:
                        return [0, -1];
                }
            }
        }

        function keyMove(movement) {
            var deltaX = movement[0],
                deltaY = movement[1],
                newCss = {};

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }
            toggleGrabState(isDragging);
            transform = Transform.parse(self.elements.preview);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.elements.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX,
                pageY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                newCss = {};

            if (ev.type === 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    _setZoomerVal.call(self, scale);
                    dispatchChange(self.elements.zoomer);
                    return;
                }
            }

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            toggleGrabState(isDragging);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.elements.overlay.addEventListener('mousedown', mouseDown);
        self.elements.viewport.addEventListener('keydown', keyDown);
        self.elements.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        if (!this.elements) return; // since this is debounced, it can be fired after destroy
        var self = this,
            boundRect = self.elements.boundary.getBoundingClientRect(),
            imgData = self.elements.preview.getBoundingClientRect();

        css(self.elements.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this,
            data = self.get(),
            ev;

        if (!_isVisible.call(self)) {
            return;
        }

        self.options.update.call(self, data);
        if (self.$ && typeof Prototype === 'undefined') {
            self.$(self.element).trigger('update.croppie', data);
        }
        else {
            var ev;
            if (window.CustomEvent) {
                ev = new CustomEvent('update', { detail: data });
            } else {
                ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('update', true, true, data);
            }

            self.element.dispatchEvent(ev);
        }
    }

    function _isVisible() {
        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
    }

    function _updatePropertiesFromImage() {
        var self = this,
            initialZoom = 1,
            cssReset = {},
            img = self.elements.preview,
            imgData = null,
            transformReset = new Transform(0, 0, initialZoom),
            originReset = new TransformOrigin(),
            isVisible = _isVisible.call(self);

        if (!isVisible || self.data.bound) {// if the croppie isn't visible or it doesn't need binding
            return;
        }

        self.data.bound = true;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        cssReset[CSS_TRANS_ORG] = originReset.toString();
        cssReset['opacity'] = 1;
        css(img, cssReset);

        imgData = self.elements.preview.getBoundingClientRect();

        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;
        self.data.orientation = getExifOrientation(self.elements.img);

        if (self.options.enableZoom) {
            _updateZoomLimits.call(self, true);
        }
        else {
            self._currentZoom = initialZoom;
        }

        transformReset.scale = self._currentZoom;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        css(img, cssReset);

        if (self.data.points.length) {
            _bindPoints.call(self, self.data.points);
        }
        else {
            _centerImage.call(self);
        }

        _updateCenterPoint.call(self);
        _updateOverlay.call(self);
    }

    function _updateZoomLimits (initial) {
        var self = this,
            minZoom = 0,
            maxZoom = self.options.maxZoom || 1.5,
            initialZoom,
            defaultInitialZoom,
            zoomer = self.elements.zoomer,
            scale = parseFloat(zoomer.value),
            boundaryData = self.elements.boundary.getBoundingClientRect(),
            imgData = naturalImageDimensions(self.elements.img, self.data.orientation),
            vpData = self.elements.viewport.getBoundingClientRect(),
            minW,
            minH;
        if (self.options.enforceBoundary) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);
        }

        if (minZoom >= maxZoom) {
            maxZoom = minZoom + 1;
        }

        zoomer.min = fix(minZoom, 4);
        zoomer.max = fix(maxZoom, 4);
        
        if (!initial && (scale < zoomer.min || scale > zoomer.max)) {
            _setZoomerVal.call(self, scale < zoomer.min ? zoomer.min : zoomer.max);
        }
        else if (initial) {
            defaultInitialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
            initialZoom = self.data.boundZoom !== null ? self.data.boundZoom : defaultInitialZoom;
            _setZoomerVal.call(self, initialZoom);
        }

        dispatchChange(zoomer);
    }

    function _bindPoints(points) {
        if (points.length !== 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.elements.viewport.getBoundingClientRect(),
            boundRect = self.elements.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.elements.preview, newCss);

        _setZoomerVal.call(self, scale);
        self._currentZoom = scale;
    }

    function _centerImage() {
        var self = this,
            imgDim = self.elements.preview.getBoundingClientRect(),
            vpDim = self.elements.viewport.getBoundingClientRect(),
            boundDim = self.elements.boundary.getBoundingClientRect(),
            vpLeft = vpDim.left - boundDim.left,
            vpTop = vpDim.top - boundDim.top,
            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
            h = vpTop - ((imgDim.height - vpDim.height) / 2),
            transform = new Transform(w, h, self._currentZoom);

        css(self.elements.preview, CSS_TRANSFORM, transform.toString());
    }

    function _transferImageToCanvas(customOrientation) {
        var self = this,
            canvas = self.elements.canvas,
            img = self.elements.img,
            ctx = canvas.getContext('2d'),
            exif = _hasExif.call(self),
            customOrientation = self.options.enableOrientation && customOrientation;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;

        if (exif && !customOrientation) {
            var orientation = getExifOrientation(img);
            drawCanvas(canvas, img, num(orientation || 0, 10));
        }
        else if (customOrientation) {
            drawCanvas(canvas, img, customOrientation);
        }
    }

    function _getCanvas(data) {
        var self = this,
            points = data.points,
            left = num(points[0]),
            top = num(points[1]),
            right = num(points[2]),
            bottom = num(points[3]),
            width = right-left,
            height = bottom-top,
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            startX = 0,
            startY = 0,
            canvasWidth = data.outputWidth || width,
            canvasHeight = data.outputHeight || height,
            customDimensions = (data.outputWidth && data.outputHeight),
            outputWidthRatio = 1,
            outputHeightRatio = 1;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        if (data.backgroundColor) {
            ctx.fillStyle = data.backgroundColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        if (self.options.enforceBoundary !== false) {
            width = Math.min(width, self._originalImageWidth);
            height = Math.min(height, self._originalImageHeight);
        }
    
        // console.table({ left, right, top, bottom, canvasWidth, canvasHeight });
        ctx.drawImage(this.elements.preview, left, top, width, height, startX, startY, canvasWidth, canvasHeight);
        if (circle) {
            ctx.fillStyle = '#fff';
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return canvas;
    }

    function _getHtmlResult(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];

        addClass(div, 'croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
        });
        img.src = data.url;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function _getBase64Result(data) {
        return _getCanvas.call(this, data).toDataURL(data.format, data.quality);
    }

    function _getBlobResult(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            _getCanvas.call(self, data).toBlob(function (blob) {
                resolve(blob);
            }, data.format, data.quality);
        });
    }

    function _replaceImage(img) {
        if (this.elements.img.parentNode) {
            Array.prototype.forEach.call(this.elements.img.classList, function(c) { img.classList.add(c); });
            this.elements.img.parentNode.replaceChild(img, this.elements.img);
            this.elements.preview = img; // if the img is attached to the DOM, they're not using the canvas
        }
        this.elements.img = img;
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [],
            zoom = null,
            hasExif = _hasExif.call(self);

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else if (Array.isArray(options)) {
            points = options.slice();
        }
        else if (typeof (options) === 'undefined' && self.data.url) { //refreshing
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            return null;
        }
        else {
            url = options.url;
            points = options.points || [];
            zoom = typeof(options.zoom) === 'undefined' ? null : options.zoom;
        }

        self.data.bound = false;
        self.data.url = url || self.data.url;
        self.data.boundZoom = zoom;

        return loadImage(url, hasExif).then(function (img) {
            _replaceImage.call(self, img);
            if (!points.length) {
                var natDim = naturalImageDimensions(img);
                var rect = self.elements.viewport.getBoundingClientRect();
                var aspectRatio = rect.width / rect.height;
                var imgAspectRatio = natDim.width / natDim.height;
                var width, height;

                if (imgAspectRatio > aspectRatio) {
                    height = natDim.height;
                    width = height * aspectRatio;
                }
                else {
                    width = natDim.width;
                    height = natDim.height / aspectRatio;
                }

                var x0 = (natDim.width - width) / 2;
                var y0 = (natDim.height - height) / 2;
                var x1 = x0 + width;
                var y1 = y0 + height;
                self.data.points = [x0, y0, x1, y1];
            }
            else if (self.options.relative) {
                points = [
                    points[0] * img.naturalWidth / 100,
                    points[1] * img.naturalHeight / 100,
                    points[2] * img.naturalWidth / 100,
                    points[3] * img.naturalHeight / 100
                ];
            }

            self.data.points = points.map(function (p) {
                return parseFloat(p);
            });
            if (self.options.useCanvas) {
                _transferImageToCanvas.call(self, options.orientation || 1);
            }
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            cb && cb();
        }).catch(function (err) {
            console.error("Croppie:" + err);
        });
    }

    function fix(v, decimalPoints) {
        return parseFloat(v).toFixed(decimalPoints || 0);
    }

    function _get() {
        var self = this,
            imgData = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            widthDiff = (vpData.width - self.elements.viewport.offsetWidth) / 2, //border
            heightDiff = (vpData.height - self.elements.viewport.offsetHeight) / 2,
            x2 = x1 + self.elements.viewport.offsetWidth + widthDiff,
            y2 = y1 + self.elements.viewport.offsetHeight + heightDiff,
            scale = self._currentZoom;

        if (scale === Infinity || isNaN(scale)) {
            scale = 1;
        }

        var max = self.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
        x1 = Math.max(max, x1 / scale);
        y1 = Math.max(max, y1 / scale);
        x2 = Math.max(max, x2 / scale);
        y2 = Math.max(max, y2 / scale);

        return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale,
            orientation: self.data.orientation
        };
    }

    var RESULT_DEFAULTS = {
            type: 'canvas',
            format: 'png',
            quality: 1
        },
        RESULT_FORMATS = ['jpeg', 'webp', 'png'];

    function _result(options) {
        var self = this,
            data = _get.call(self),
            opts = deepExtend(clone(RESULT_DEFAULTS), clone(options)),
            resultType = (typeof (options) === 'string' ? options : (opts.type || 'base64')),
            size = opts.size || 'viewport',
            format = opts.format,
            quality = opts.quality,
            backgroundColor = opts.backgroundColor,
            circle = typeof opts.circle === 'boolean' ? opts.circle : (self.options.viewport.type === 'circle'),
            vpRect = self.elements.viewport.getBoundingClientRect(),
            ratio = vpRect.width / vpRect.height,
            prom;

        if (size === 'viewport') {
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
        } else if (typeof size === 'object') {
            if (size.width && size.height) {
                data.outputWidth = size.width;
                data.outputHeight = size.height;
            } else if (size.width) {
                data.outputWidth = size.width;
                data.outputHeight = size.width / ratio;
            } else if (size.height) {
                data.outputWidth = size.height * ratio;
                data.outputHeight = size.height;
            }
        }

        if (RESULT_FORMATS.indexOf(format) > -1) {
            data.format = 'image/' + format;
            data.quality = quality;
        }

        data.circle = circle;
        data.url = self.data.url;
        data.backgroundColor = backgroundColor;

        prom = new Promise(function (resolve, reject) {
            switch(resultType.toLowerCase())
            {
                case 'rawcanvas':
                    resolve(_getCanvas.call(self, data));
                    break;
                case 'canvas':
                case 'base64':
                    resolve(_getBase64Result.call(self, data));
                    break;
                case 'blob':
                    _getBlobResult.call(self, data).then(resolve);
                    break;
                default:
                    resolve(_getHtmlResult.call(self, data));
                    break;
            }
        });
        return prom;
    }

    function _refresh() {
        _updatePropertiesFromImage.call(this);
    }

    function _rotate(deg) {
        if (!this.options.useCanvas || !this.options.enableOrientation) {
            throw 'Croppie: Cannot rotate without enableOrientation && EXIF.js included';
        }

        var self = this,
            canvas = self.elements.canvas,
            ornt;

        self.data.orientation = getExifOffset(self.data.orientation, deg);
        drawCanvas(canvas, self.elements.img, self.data.orientation);
        _updateZoomLimits.call(self);
        _onZoom.call(self);
        copy = null;
    }

    function _destroy() {
        var self = this;
        self.element.removeChild(self.elements.boundary);
        removeClass(self.element, 'croppie-container');
        if (self.options.enableZoom) {
            self.element.removeChild(self.elements.zoomerWrap);
        }
        delete self.elements;
    }

    if (window.jQuery) {
        var $ = window.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }
                else if (opts === 'bind') {
                    return singleInst.bind.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                        if (opts === 'destroy') {
                            $(this).removeData('croppie');
                        }
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    i.$ = $;
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        if (element.className.indexOf('croppie-container') > -1) {
            throw new Error("Croppie: Can't initialize croppie more than once");
        }
        this.element = element;
        this.options = deepExtend(clone(Croppie.defaults), opts);

        if (this.element.tagName.toLowerCase() === 'img') {
            var origImage = this.element;
            addClass(origImage, 'cr-original-image');
            setAttributes(origImage, {'aria-hidden' : 'true', 'alt' : '' });
            var replacementDiv = document.createElement('div');
            this.element.parentNode.appendChild(replacementDiv);
            replacementDiv.appendChild(origImage);
            this.element = replacementDiv;
            this.options.url = this.options.url || origImage.src;
        }

        _create.call(this);
        if (this.options.url) {
            var bindOpts = {
                url: this.options.url,
                points: this.options.points
            };
            delete this.options['url'];
            delete this.options['points'];
            _bind.call(this, bindOpts);
        }
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: { },
        orientationControls: {
            enabled: true,
            leftClass: '',
            rightClass: ''
        },
        resizeControls: {
            width: true,
            height: true
        },
        customClass: '',
        showZoomer: true,
        enableZoom: true,
        enableResize: false,
        mouseWheelZoom: true,
        enableExif: false,
        enforceBoundary: true,
        enableOrientation: false,
        enableKeyMovement: true,
        update: function () { }
    };

    Croppie.globals = {
        translate: 'translate3d'
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            var data = _get.call(this);
            var points = data.points;
            if (this.options.relative) {
                points[0] /= this.elements.img.naturalWidth / 100;
                points[1] /= this.elements.img.naturalHeight / 100;
                points[2] /= this.elements.img.naturalWidth / 100;
                points[3] /= this.elements.img.naturalHeight / 100;
            }
            return data;
        },
        result: function (type) {
            return _result.call(this, type);
        },
        refresh: function () {
            return _refresh.call(this);
        },
        setZoom: function (v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer);
        },
        rotate: function (deg) {
            _rotate.call(this, deg);
        },
        destroy: function () {
            return _destroy.call(this);
        }
    });

    exports.Croppie = window.Croppie = Croppie;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34).setImmediate))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(32)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(33);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.event),
      expression: "event"
    }],
    ref: "root",
    staticClass: "firecomponent--image-editor--container"
  }, [_c('div', {
    staticClass: "firecomponent--image-editor--vertical-aligner"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.uploading),
      expression: "!uploading"
    }]
  }, [_vm._t("croppie-header", [_c('h1', {
    staticClass: "firecomponent--image-editor--header"
  }, [_vm._v("Crop Photo")])]), _vm._v(" "), _c('div', {
    staticClass: "firecomponent--image-editor--croppie-wrapper"
  }, [_c('div', {
    ref: "croppie"
  })]), _vm._v(" "), _c('div', {
    staticClass: "firecomponent--image-editor--controls"
  }, [_vm._t("croppie-controls", [(_vm.allowOrientation) ? _c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": function($event) {
        _vm.rotate(-90)
      }
    }
  }, [_vm._v("Rotate Left")]) : _vm._e(), _vm._v(" "), (_vm.allowOrientation) ? _c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": function($event) {
        _vm.rotate(90)
      }
    }
  }, [_vm._v("Rotate Right")]) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": _vm.upload
    }
  }, [_vm._v("Complete")])], {
    rotate: _vm.rotate,
    cancel: _vm.cancel,
    upload: _vm.upload
  })], 2)], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.uploading),
      expression: "uploading"
    }],
    staticClass: "firecomponent--image-editor--uploading-controls"
  }, [_vm._t("uploading", [_c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("Cancel Upload")]), _vm._v(" "), _c('button', {
    staticClass: "firecomponent--button",
    on: {
      "click": _vm.continueWithoutWaiting
    }
  }, [_vm._v("Continue Without Waiting")])], {
    cancel: _vm.cancel,
    noWait: _vm.continueWithoutWaiting
  })], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1acc222e", module.exports)
  }
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.customTag, {
    tag: "component",
    staticClass: "firecomponent--editable-root",
    class: {
      'firecomponent--editing': _vm.isEditing, 'firecomponent--editable-indicator': (_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing
    },
    on: {
      "mouseover": _vm.editableOnMouseOver,
      "mouseleave": _vm.editableOnMouseLeave,
      "focusin": _vm.editableOnFocus,
      "focusout": _vm.editableOnBlur
    }
  }, [((_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing) ? _c('div', {
    ref: "editElement",
    attrs: {
      "contenteditable": "true"
    },
    on: {
      "change": _vm.editableOnInput
    }
  }, [_vm._v(_vm._s(_vm.shownVal))]) : (_vm.shownVal) ? [_vm._v(_vm._s(_vm.shownVal))] : _c('span', {
    staticClass: "firecomponent-editable-placeholder"
  }, [_vm._v("placeholder")]), (_vm.updating) ? _c('div', {
    staticClass: "firecomponent--loader-container"
  }, [_c('div', {
    staticClass: "firecomponent--loader"
  })]) : _vm._e(), (_vm.isEditing) ? _c('div', {
    staticClass: "firecomponent--editable-controls"
  }, [_c('button', {
    staticClass: "firecomponent--btn firecomponent--save-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnSave($event)
      }
    }
  }, [_vm._v("Save")]), _c('button', {
    staticClass: "firecomponent--btn firecomponent--cancel-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnCancel($event)
      }
    }
  }, [_vm._v("Cancel")])]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f05abb9", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.customTag, {
    tag: "component"
  }, [(_vm.editable) ? _c('span', {
    key: _vm.editorKey,
    ref: "editor",
    staticClass: "editor",
    style: (_vm.editorStyle),
    attrs: {
      "contenteditable": "true"
    },
    on: {
      "input": _vm.contentChangeEventHandler
    }
  }, [_vm._v("\n    " + _vm._s(_vm.content) + "\n  ")]) : _vm._t("display", [_vm._v("\n    " + _vm._s(_vm.content) + "\n  ")], {
    content: _vm.content
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ca2147c", module.exports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.customTag, {
    tag: "component",
    staticClass: "firecomponent--editable-root",
    class: {
      'firecomponent--editing': _vm.isEditing, 'firecomponent--editable-indicator': (_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing
    },
    on: {
      "mouseover": _vm.editableOnMouseOver,
      "mouseleave": _vm.editableOnMouseLeave,
      "focusin": _vm.editableOnFocus,
      "focusout": _vm.editableOnBlur
    }
  }, [((_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing) ? _c('div', {
    ref: "editElement",
    attrs: {
      "contenteditable": "true"
    },
    on: {
      "change": _vm.editableOnInput
    }
  }, [_vm._v(_vm._s(_vm.shownVal))]) : (_vm.shownVal) ? [_vm._v(_vm._s(_vm.shownVal))] : _c('span', {
    staticClass: "firecomponent-editable-placeholder"
  }, [_vm._v("placeholder")]), (_vm.updating) ? _c('div', {
    staticClass: "firecomponent--loader-container"
  }, [_c('div', {
    staticClass: "firecomponent--loader"
  })]) : _vm._e(), (_vm.isEditing) ? _c('div', {
    staticClass: "firecomponent--editable-controls"
  }, [_c('button', {
    staticClass: "firecomponent--btn firecomponent--save-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnSave($event)
      }
    }
  }, [_vm._v("Save")]), _c('button', {
    staticClass: "firecomponent--btn firecomponent--cancel-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnCancel($event)
      }
    }
  }, [_vm._v("Cancel")])]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d7d06d5", module.exports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.customTag, {
    tag: "component",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "title": _vm.title
    },
    on: {
      "mouseover": _vm.startEdit,
      "mouseleave": _vm.attemptStop
    }
  }, [(_vm.isEditing) ? _c('div', {
    key: _vm.uniqueKey,
    ref: "editor",
    staticClass: "firecomponent--inline-editor",
    style: (_vm.editorStyle),
    attrs: {
      "contenteditable": "true"
    },
    on: {
      "blur": _vm.stopEdit,
      "input": _vm.contentChangeEventHandler
    }
  }, [_vm._v("\n    " + _vm._s(_vm.value) + "\n  ")]) : _vm._t("display", [_vm._v("\n    " + _vm._s(_vm.value) + "\n  ")], {
    content: _vm.value
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6bca1b64", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "root",
    staticClass: "firecomponent--fire-image--container",
    on: {
      "mouseover": function($event) {
        _vm.showEdit = true
      },
      "mouseleave": function($event) {
        _vm.showEdit = false
      }
    }
  }, [_vm._t("display", [_c('div', {
    staticClass: "firecomponent--fire-image--display"
  }, [_c('div', {
    staticClass: "firecomponent--fire-image--ratio-enforcer",
    style: ({
      paddingTop: _vm.padding * 100 + '%'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "firecomponent--fire-image--content",
    style: ({
      backgroundImage: 'url(' + _vm.displayURL + ')',
      backgroundColor: _vm.bgColor
    })
  })])], {
    src: _vm.displayURL
  }), _vm._v(" "), (_vm.editable) ? _c('div', {
    staticClass: "firecomponent--fire-image--edit-controller",
    class: {
      'firecomponent--fire-image--hide-on-desktop': !_vm.showEditBtn
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return (function () {})($event)
      }
    }
  }, [_vm._t("edit-controller", [_c('label', {
    staticClass: "firecomponent--button firecomponent--fire-image-change-label",
    attrs: {
      "for": _vm.uniqueName,
      "title": "Click to upload new image"
    }
  }, [_vm._v("\n        Change\n      ")])], {
    for: _vm.uniqueName
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "file",
      "id": _vm.uniqueName
    },
    on: {
      "change": _vm.imageUploaded
    }
  })], 2) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6463ee2", module.exports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.customTag, {
    tag: "component",
    staticClass: "firecomponent--editable-root",
    class: {
      'firecomponent--editing': _vm.isEditing, 'firecomponent--editable-indicator': (_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing
    },
    on: {
      "mouseover": _vm.editableOnMouseOver,
      "mouseleave": _vm.editableOnMouseLeave,
      "focusin": _vm.editableOnFocus,
      "focusout": _vm.editableOnBlur
    }
  }, [((_vm.showEditableIndicator && _vm.componentEditable) || _vm.isEditing) ? _c('div', {
    ref: "editElement",
    attrs: {
      "contenteditable": "true"
    },
    on: {
      "change": _vm.editableOnInput
    }
  }, [_vm._v(_vm._s(_vm.shownVal))]) : (_vm.shownVal) ? [_vm._v(_vm._s(_vm.shownVal))] : _c('span', {
    staticClass: "firecomponent-editable-placeholder"
  }, [_vm._v("placeholder")]), (_vm.updating) ? _c('div', {
    staticClass: "firecomponent--loader-container"
  }, [_c('div', {
    staticClass: "firecomponent--loader"
  })]) : _vm._e(), (_vm.isEditing) ? _c('div', {
    staticClass: "firecomponent--editable-controls"
  }, [_c('button', {
    staticClass: "firecomponent--btn firecomponent--save-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnSave($event)
      }
    }
  }, [_vm._v("Save")]), _c('button', {
    staticClass: "firecomponent--btn firecomponent--cancel-btn",
    attrs: {
      "tabindex": "0"
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.editableOnCancel($event)
      }
    }
  }, [_vm._v("Cancel")])]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bc5945b8", module.exports)
  }
}

/***/ })
/******/ ]);
});