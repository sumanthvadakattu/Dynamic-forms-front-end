import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import registration from '@/components/registration'
import home from '@/components/Home'
import index from '@/components/index'
import mainform from '@/components/MainForm'
import output from '@/components/formdataoutput'
import enduser from '@/components/enduserdata'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/registration',
      name: 'registration',
      component: registration
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/mainform',
      name: 'mainform',
      component: mainform
    },
    {
      path: '/output',
      name: 'output',
      component: output
    },
    // end user path
    {
      path: '/data',
      name: 'enduser',
      component: enduser
    }
  ]
})
