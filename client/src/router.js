import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'question',
          component: () => import('./components/ListQuestion.vue')
        },
        {
          path: '/addQuestion',
          name: 'addQuestion',
          component: () => import('./components/AddQuestion.vue')
        },
        {
          path: '/edit/question/:id',
          name: 'editQuestion',
          component: () => import('./components/EditQuestion.vue')
        },
        {
          path: '/question/:id',
          name: 'detailQuestion',
          props: true,
          component: () => import('./components/DetailQuestion.vue'),
          children: [
            {
              path: '/edit/answer/:id',
              name: 'editAnswer',
              component: () => import('./components/EditAnswer.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
