import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import adminDashboard from '../components/admin/Dashboard.vue'
import Client from '../components/admin/Clients.vue'
import Cars from '../components/admin/Cars.vue'
import Inquiries from '../components/admin/Inquiries.vue'
import adminRentals from '../components/admin/Bookings.vue'

import userRentals from '../components/user/Rentals.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { hasUser: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { hasUser: true},
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    meta: { },
    component: () => import(/* webpackChunkName: "about" */ '../views/Reservation.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { isAdmin: true, requiresLogin: true },
    component: () => import(/* webpackChunkName: "about" */ '../components/admin/Home.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'adminDashboard',
        components: {
          adminDashboard: adminDashboard
        }
      },
      {
        path: 'clients',
        name: 'clients',
        components: {
          clients: Client
        }
      },
      {
        path: 'cars',
        name: 'cars',
        components: {
          cars: Cars
        }
      },
      {
        path: 'inquiries',
        name: 'inquiries',
        components: {
          inquiries: Inquiries
        }
      },
      {
        path: 'rentals',
        name: 'adminRentals',
        components: {
          adminRentals: adminRentals
        }
      },
      {
        path: '',
        redirect: 'dashboard'
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    meta: { isUser: true, requiresLogin: true },
    component: () => import(/* webpackChunkName: "about" */ '../components/user/Home.vue'),
    children: [
      {
        path: 'rentals',
        name: 'rentals',
        components: {
          userRentals: userRentals
        }
      },
      {
        path: '',
        redirect: 'rentals'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresLogin) && !localStorage.getItem('auth')){
    next({name: 'Login'})
  }
  else if (to.matched.some((record) => record.meta.hasUser) && localStorage.getItem('auth') && localStorage.getItem('isAdmin')) {
      next({ name: "Admin" });
	} 
  else if (to.matched.some((record) => record.meta.hasUser) && localStorage.getItem('auth') && localStorage.getItem('isUser')) {
      next({ name: "User" });
	} 
  else if (to.matched.some((record) => record.meta.isAdmin) && localStorage.getItem('auth') && localStorage.getItem('isUser')) {
      next({ name: "User" });
	} 
  else if (to.matched.some((record) => record.meta.isUser) && !localStorage.getItem('auth') && !localStorage.getItem('isUser')) {
      next({ name: "Home" });
	} 
  else if (to.matched.some((record) => record.meta.isUser) && localStorage.getItem('auth') && localStorage.getItem('isAdmin')) {
      next({ name: "Admin" });
	} else {
		next();
	}
});

export default router
