import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../components/Home.vue'
import Demo from '../components/Demo.vue'
import Text from '../components/Text.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/demo', component: Demo },
  { path: '/text', component: Text },
]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
