import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth'
import client from './module/client'
import cars from './module/cars'
import branch from './module/branch'
import inquiry from './module/inquiry'
import rental from './module/rental'

import usercars from './module/usercar'
import userrental from './module/userrental'

Vue.use(Vuex);

export default new Vuex.Store({
 modules: {
  auth, client, cars, usercars, inquiry,
  rental, branch, userrental
 }
})

