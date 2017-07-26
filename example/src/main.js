import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true

import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

// import { FireText } from 'firecomponent';
import FireText from './FireText.vue'
import FireHtml from './FireHtml.vue'

Vue.component('fire-text', FireText);
Vue.component('fire-html', FireHtml);

new Vue({
  el: '#app',
  render: h => h(App)
})
