import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import login from '../views/login'
import layout from '../components'
import home2 from '../views/home/home.vue'
// import commit from '../views/commit'

Vue.use(VueRouter)
Vue.use(layout)

const routes = [
  { path: '/',
    redirect: '/login' },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: home2
    },
    {
      path: 'comment',
      component: () => import('../views/commit')
    }]
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
