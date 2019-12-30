// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   console.log(to.path )
//   if (sessionStorage.getItem("toke") && to.path == '/') {
//     next({
//       path: '/index',
      
//     })
//   } 
//   // next()
// })