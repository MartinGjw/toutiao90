import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import login from '../views/login'
import layout from '../components'

Vue.use(VueRouter)
Vue.use(layout)

const routes = [
  { path: '/',
    redirect: '/Home' },
  {
    path: '/Home',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
