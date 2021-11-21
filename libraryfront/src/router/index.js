import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import LogIn from '../components/LogIn.vue'
import SingIn from '../components/SingIn.vue'
import Profile from '../components/Profile.vue'
import RHistory from '../components/RHistory.vue'
import BHistory from '../components/BHistory.vue'
import BookS from '../components/BookS.vue'
import BookR from '../components/BookR.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/singin',
    name: 'SingIn',
    component: SingIn
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
