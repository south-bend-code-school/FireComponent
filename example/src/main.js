import Vue from 'vue'
import App from './App.vue'

// import { FireText } from 'firecomponent';
import FireText from './Firetext.vue'
Vue.component('fire-text', FireText);

new Vue({
  el: '#app',
  render: h => h(App)
})
