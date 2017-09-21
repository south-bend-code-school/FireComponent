import FireText from './FireText.vue'
import FireHtml from './FireHtml.vue'
import FireImage from './FireImage.vue'

import firebase from 'firebase'

var addFirebaseComputedValue = function(component, firebaseInstance) {
  component.computed._firebase = () => firebaseInstance
  component.computed._database = () => firebaseInstance.database()
  component.computed._storage = () => firebaseInstance.storage()
};

var FireComponent = {
  install: function(Vue, options) {
    var appInstance = null;

    if (options) {
      try {
        appInstance = firebase.initializeApp(options, '__firecomponent')
      } catch (e) {
        throw new Error('Must pass a valid Firebase Options.')
      }
    } else {
      try {
        appInstance = firebase.app()
      } catch (e) {
        throw new Error('No Firebase App located. Please initialize before installing FireComponent, or pass a valid Firebase Options object.')
      }
    }

    addFirebaseComputedValue(FireText, appInstance)
    addFirebaseComputedValue(FireHtml, appInstance)
    addFirebaseComputedValue(FireImage, appInstance)

    Vue.component('fire-text', FireText);
    Vue.component('fire-html', FireHtml);
    Vue.component('fire-image', FireImage);
  }
};

export default FireComponent;
