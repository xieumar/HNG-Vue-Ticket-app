import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import TicketList from '../components/TicketList.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Logout from '../components/Logout.vue'
import TicketDetails from '../components/TicketDetails.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/tickets',
    name: 'TicketList',
    component: TicketList,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets/:id',
    name: 'TicketDetails',
    component: TicketDetails,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedInUser')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
