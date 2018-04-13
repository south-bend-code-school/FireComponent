import FireImage from './components/FireImage.vue';
import FireInput from './components/FireInput.vue';
import ImageEditor from './components/ImageEditor.vue';
import InlineEditor from './components/InlineEditor.vue';
import ImageBus from './components/ImageBus';
import FireMessenger from './components/FireMessanger';

// Install the components
export function install (Vue, firebase) {
  if (typeof firebase === 'object') {
    Vue.prototype.$firebase = firebase;
  } else {
    console.error('You must add your firebase configuration object to the firecomponent library');
    return;
  }

  Vue.prototype.$imageBus = new ImageBus(Vue);
  Vue.prototype.$messenger = new FireMessenger(Vue);
  // Add a accessor for getting the unique id of the component
  Object.defineProperty(Vue.prototype, '$uniqId', {
    get () {
      return this._uid;
    },
  })

  var editorID = 'firecomponent--image-editor';
  var insertElem = window.document.createElement("div");
  insertElem.id = editorID;
  window.document.body.appendChild(insertElem);
  new Vue({
    el: '#'+editorID,
    render: h => h(ImageEditor)
  });

  Vue.component('fire-image', FireImage);
  Vue.component('fire-input', FireInput);
  Vue.component('fire-inline-editor', InlineEditor);
}

// Expose the components
export {
  FireImage,
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
