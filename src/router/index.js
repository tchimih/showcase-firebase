import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/auth/Register.vue'
import Signin from '@/components/auth/Signin.vue'
import About  from '@/views/About.vue'
import store from '../store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Signin
    },
    {
      path: '/about',
      component: About,
      meta: {
        requireAuth: true
      }
    }
  ]
})


router.beforeEach((to, from, next)=> {

  if(to.matched.some(record => record.meta.requireAuth)){
    
    if(!store.getters.user){
      
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      // logged in
      next()
    }
  }else{
    next()
  }
})

export default router

