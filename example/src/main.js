import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './components/Home.vue'
import Demo from './components/Demo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/demo', component: Demo },
]
const router = new VueRouter({
  mode: 'history',
  routes
})

import FireText from './FireText.vue'
import FireHtml from './FireHtml.vue'
import FireImage from './FireImage.vue'
// import { FireText, FireHtml, FireImage } from 'firecomponent';

Vue.component('fire-text', FireText);
Vue.component('fire-html', FireHtml);
Vue.component('fire-image', FireImage);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
