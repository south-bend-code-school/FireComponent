import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import router from './router'

import FireComponent from 'firecomponent'
Vue.use(FireComponent, {
  apiKey: "AIzaSyB1Xz49dpWzkyBG-n2SL7_6FDpkncR6Ioo",
  authDomain: "firevue-test.firebaseapp.com",
  databaseURL: "https://firevue-test.firebaseio.com",
  projectId: "firevue-test",
  storageBucket: "firevue-test.appspot.com",
  messagingSenderId: "276471204872"
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
