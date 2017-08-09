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
    if (options === undefined || options.databaseURL === undefined) {
      console.error('You must add your firebase configuration object to the firecomponent library')
      return;
    }

    firebase.initializeApp(options)

    addFirebaseComputedValue(FireText, firebase)
    addFirebaseComputedValue(FireHtml, firebase)
    addFirebaseComputedValue(FireImage, firebase)

    Vue.component('fire-text', FireText);
    Vue.component('fire-html', FireHtml);
    Vue.component('fire-image', FireImage);
  }
};

export default FireComponent;
