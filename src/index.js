// Legacy
import FireInput from './components/FireInput.vue';
import InlineEditor from './components/InlineEditor.vue';

// New
import FirestoreNumber from './components/firestore/Number.vue';
import FirestoreText from './components/firestore/Text.vue';

import RTDBText from './components/rtdb/Text.vue';

import StorageEditor from './components/storage/Editor.vue';
import StorageImage from './components/storage/Image.vue';

import PermissionBus from './buses/EditableManager';
import ImageBus from './buses/ImageBus';
import MessengerBus from './buses/FireMessanger';

function installBuses (_Vue) {
  _Vue.prototype.$fc_image = new ImageBus(_Vue);
  _Vue.prototype.$fc_messenger = new MessengerBus(_Vue);
  _Vue.prototype.$fc_permission = new PermissionBus(_Vue);
}

function installProperties (_Vue) {
  // Add a accessor for getting the unique id of the component
  Object.defineProperty(_Vue.prototype, '$uniqId', {
    get () {
      return this._uid;
    },
  })
}

function insertComponent (_Vue, _Component, anchorId, tag) {
  var insertElem = window.document.createElement(tag || "div");
  insertElem.id = anchorId;
  window.document.body.appendChild(insertElem);
  new _Vue({
    el: '#'+anchorId,
    render: h => h(_Component)
  });
}

function insertSingularComponents (_Vue) {
  insertComponent(_Vue, StorageEditor, 'firecomponent--image-editor', 'div');
}

function registerGlobalComponents (_Vue) {
  // Legacy
  _Vue.component('fire-image', StorageImage);
  _Vue.component('fire-input', FireInput);
  _Vue.component('fire-text', RTDBText);
  _Vue.component('fire-inline-editor', InlineEditor);

  // New
  _Vue.component('rtdb-text', RTDBText);
  _Vue.component('firestore-text', FirestoreText);
  _Vue.component('firestore-number', FirestoreNumber);
  _Vue.component('storage-image', StorageImage);
}

// Install the Package
export function install (Vue, firebase) {
  if (typeof firebase === 'object') {
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
export {
  StorageImage,
  FireInput
};

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
var plugin = {
  /* eslint-disable no-undef */
  install: install
};

export default plugin;

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
