import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import PDFTEST from '@/components/pdftest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PDFTEST',
      component: PDFTEST
    }
  ]
})
