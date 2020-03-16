import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/memo',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Memo/Memo.vue'),
    children: [
      {
        path: 'new',
        name: 'memo-new',
        component: () =>
          import(/* webpackChunkName: "memo-new" */ '../views/Memo/MemoNew.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
