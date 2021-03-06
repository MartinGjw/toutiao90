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
      path: 'material',
      component: () => import('../views/material')
    },
    {
      path: 'comment',
      component: () => import('../views/commit')
    },
    {
      path: 'articles',
      component: () => import('../views/articles')
    },
    {
      path: 'publish',
      component: () => import('../views/publish')
    },
    {
      path: 'publish/:articleid',
      component: () => import('../views/publish')
    },
    {
      path: 'userinfo',
      component: () => import('../views/userinfo')
    },
    {
      path: 'picture',
      component: () => import('../views/picture')
    }
    ]
  }, {
    path: '/login',
    component: login
  },
  {
    path: '*',
    component: () => import('../views/404')
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
