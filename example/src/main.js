import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import FireText from './FireText.vue'
import FireHtml from './FireHtml.vue'
import FireImage from './FireImage.vue'
// import { FireText, FireHtml, FireImage } from 'firecomponent';

Vue.component('fire-text', FireText);
Vue.component('fire-html', FireHtml);
Vue.component('fire-image', FireImage);

new Vue({
  el: '#app',
  render: h => h(App)
})
