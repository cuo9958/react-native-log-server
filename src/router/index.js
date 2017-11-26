import Vue from 'vue'
import Router from 'vue-router'
/**
 * 页面
 */
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
