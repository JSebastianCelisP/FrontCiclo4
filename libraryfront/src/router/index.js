import { createRouter, createWebHashHistory } from 'vue-router'

import LogIn from '../components/LogIn.vue'
import SingUp from '../components/SingUp.vue'
import Welcome from '../components/Welcome.vue'
import Profile from '../components/Profile.vue'
import RHistory from '../components/RHistory.vue'
import BHistory from '../components/BHistory.vue'
import BookS from '../components/BookS.vue'
import BookR from '../components/BookR.vue'


const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/singup',
    name: 'SingUp',
    component: SingUp
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/rhistory',
    name: 'RHistory',
    component: RHistory
  },
  {
    path: '/bhistory',
    name: 'BHistory',
    component: BHistory
  },
  {
    path: '/books',
    name: 'BookS',
    component: BookS
  },
  {
    path: '/bookr',
    name: 'BookR',
    component: BookR
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
