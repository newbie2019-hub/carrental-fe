import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth'
import client from './module/client'
import cars from './module/cars'
import inquiry from './module/inquiry'
import rental from './module/rental'

Vue.use(Vuex);

export default new Vuex.Store({
 modules: {
  auth, client, cars, inquiry,
  rental
 }
})

