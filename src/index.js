import FireHtml from './components/FireHtml.vue';
import FireText from './components/FireText.vue';
import FireImage from './components/FireImage.vue';
import FireInput from './components/FireInput.vue';
import ImageEditor from './components/ImageEditor.vue';
import { newImageBus } from './components/ImageBus';
import { newFireMessenger } from './components/FireMessanger';

// Install the components
export function install (Vue, firebase) {
  if (typeof firebase === 'object') {
    Vue.prototype.$firebase = firebase;
  } else {
    console.error('You must add your firebase configuration object to the firecomponent library');
    return;
  }

  Vue.prototype.$imageBus = newImageBus(Vue)
  Vue.prototype.$messenger = newFireMessenger(Vue)
  // Add a accessor for getting the unique id of the component
  Object.defineProperty(Vue.prototype, '$uniqId', {
    get () {
      return this._uid
    },
  })

  var editorID = 'firecomponent--image-editor'
  var insertElem = window.document.createElement("div")
  insertElem.id = editorID
  window.document.body.appendChild(insertElem)
  new Vue({
    el: '#'+editorID,
    render: h => h(ImageEditor)
  })

  Vue.component('fire-text', FireText);
  Vue.component('fire-html', FireHtml);
  Vue.component('fire-image', FireImage);
  Vue.component('fire-input', FireInput);
}

// Expose the components
export {
  FireHtml,
  FireText,
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
