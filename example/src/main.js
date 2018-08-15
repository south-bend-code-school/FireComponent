import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp({
  apiKey: "AIzaSyDLzB9l-EhojB4ibze5ryw5Sp-v36_ZElE",
  authDomain: "testing-out-firestore.firebaseapp.com",
  databaseURL: "https://testing-out-firestore.firebaseio.com",
  projectId: "testing-out-firestore",
  storageBucket: "testing-out-firestore.appspot.com",
  messagingSenderId: "925460159146"
})

Vue.config.devtools = true

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import router from './router'

import VueFire from 'vuefire'
Vue.use(VueFire)

import FireComponent from 'fire-component'
Vue.use(FireComponent, firebase)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
