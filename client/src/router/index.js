import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import PreviewPanel from '@/components/Blocks/PreviewPanel'
import BlockPanel from '@/components/Blocks/BlockPanel'
import Admin from '@/components/Admin/Admin'
import Profile from '@/components/Profile/Profile'
import User from '@/components/Admin/User'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blocks/:blockName',
      name: 'blocks',
      component: BlockPanel,
      props: true
    },
    {
      path: '/preview',
      name: '/preview',
      component: PreviewPanel
    },
    {
      path: '/admin',
      name: '/admin',
      component: Admin
    },
    {
      path: '/user/:userId',
      name: '/manageUser',
      component: User
    },
    {
      path: '/',
      name: '/home',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
