import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App'
import Login from './components/LogIn.vue'
import Signup from './components/SignUp.vue'
import Welcome from './components/Welcome.vue'
import Profile from './components/Profile.vue'
import Bhistory from './components/BHistory.vue'
import Books from './components/BookS.vue'
import Bookr from './components/BookR.vue'
import Bookdetails from './components/BookSV.vue'
import Bookdetailr from './components/BookRV.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup
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
    path: '/bhistory',
    name: 'Bhistory',
    component: Bhistory
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/bookr',
    name: 'Bookr',
    component: Bookr
  },
  {
    path: '/bookdetails',
    name: 'Bookdetails',
    component: Bookdetails
  },
  {
    path: '/bookdetailr',
    name: 'Bookdetailr',
    component: Bookdetailr
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
