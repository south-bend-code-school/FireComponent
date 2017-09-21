import FireHtml from './components/FireHtml.vue';
import FireText from './components/FireText.vue';
import FireImage from './components/FireImage.vue';

import firebase from 'firebase';
import VueProgressiveImage from 'vue-progressive-image';

// Install the components
export function install (Vue, options) {
  if (typeof options === 'object') {
    // @param options can be either a firebase object itself
    // or otherwise a firebase config object
    if (options.databaseURL !== undefined) {
      firebase.initializeApp(options);
      Vue.prototype.$firebase = firebase;
    } else {
      Vue.prototype.$firebase = options;
    }
  } else {
    console.error('You must add your firebase configuration object to the firecomponent library');
    return;
  }

  Vue.use(VueProgressiveImage);

  Vue.component('fire-text', FireText);
  Vue.component('fire-html', FireHtml);
  Vue.component('fire-image', FireImage);
}

// Expose the components
export {
  FireHtml,
  FireText,
  FireImage
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
