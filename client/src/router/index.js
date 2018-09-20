import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import PreviewPanel from '@/components/Blocks/PreviewPanel'
import PerformancePanel from '@/components/Blocks/PerformancePanel'
import AccomplishmentPanel from '@/components/Blocks/AccomplishmentPanel'
import MilestonePanel from '@/components/Blocks/MilestonePanel'
import RiskPanel from '@/components/Blocks/RiskPanel'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/kpi',
      name: 'kpi',
      component: PerformancePanel
    },
    {
      path: '/accomplishment',
      name: 'accomplishment',
      component: AccomplishmentPanel
    },
    {
      path: '/risk',
      name: 'risk',
      component: RiskPanel
    },
    {
      path: '/milestone',
      name: 'milestone',
      component: MilestonePanel
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewPanel
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    // {
    //   path: '/songs/create',
    //   name: 'songs-create',
    //   component: CreateSongs
    // },
    // {
    //   path: '/song/:songID',
    //   name: 'song',
    //   component: ViewSong
    // },
    // {
    //   path: '/song/:songID/edit',
    //   name: 'song-edit',
    //   component: EditSong
    // },
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
