import gql from "graphql-tag";
import { createRouter, createWebHashHistory } from 'vue-router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

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
    redirect: "login",
    meta: { requiresAuth : false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth : false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: Signup,
    meta: { requiresAuth : false }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiresAuth : true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth : true }
  },
  {
    path: '/bhistory',
    name: 'Bhistory',
    component: Bhistory,
    meta: { requiresAuth : true }
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta: { requiresAuth : true }
  },
  {
    path: '/bookr',
    name: 'Bookr',
    component: Bookr,
    meta: { requiresAuth : true }
  },
  {
    path: '/bookdetails/:id',
    name: 'Bookdetails',
    component: Bookdetails,
    meta: { requiresAuth : true }
  },
  {
    path: '/bookdetailr/:id',
    name: 'Bookdetailr',
    component: Bookdetailr,
    meta: { requiresAuth : true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'https://libreriaapigateway.herokuapp.com/' }),
  cache: new InMemoryCache()
})

async function isAuth() {
  if (localStorage.getItem("tokenAccess") === null ||  localStorage.getItem("tokenRefresh") === null) {
    return false;
  }

  try {
    var result = await apolloClient.mutate({
      mutation: gql `
        mutation ($refresh: String!) {
          refreshToken(refresh: $refresh) {
          access
        }
      }
      `,
      variables: {
        refresh: localStorage.getItem("tokenRefresh"),
      },
    })

    localStorage.setItem("tokenAccess", result.data.refreshToken.access);
    return true;

  }
  
  catch {
    localStorage.clear();
    alert("Your session expired, please login again");
    return false;
  }
}

router.beforeEach(async(to, from) => {
  var is_auth = await isAuth();

  if (is_auth == to.meta.requiresAuth) return true
  if (is_auth) return { name: "Welcome" };
  return { name: "Login" };
})

export default router
