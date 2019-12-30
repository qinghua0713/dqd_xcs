import Vue from 'vue'
import Router from 'vue-router'
 const login = () => import ('@/pages/login')
 const index = () => import ('@/pages/index')
 const resetPasswords = () => import ("@/pages/resetPasswords")
 const dateils = () => import ('@/pages/dateils')
Vue.use(Router)

const router = new Router({
  routes: [
    { 
      path:"/index", 
      name:"index",
       component:index
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:"/resetPasswords",
      name:'resetPasswords',
      component:resetPasswords
    },
    {
      path:"/dateils",
      name:'dateils',
      component:dateils
    }

  ]
})
export default router

