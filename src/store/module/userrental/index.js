import API from '../../base/'

export default {
  namespaced: true,
  state: {
    rentals: {},
    payments: {},
    summary: '',
    rentalssummary: [],
  },
  getters: {
   
  },
  mutations: {
   SET_RENTALS_SUMMARY(state, data) {
    state.rentalssummary = data
   },
   SET_RENTALS(state, data) {
    state.rentals = data
   },
   SET_PAYMENTS(state, data) {
    state.payments = data
   },
   SET_SUMMARY(state, data) {
    state.summary = data
   },

  },
  actions: {
    async returnedCar({commit}, data){
      const res = await API.put(`/user/rentals/${data.id}`, data).then(res => {
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getRentalsSummary({commit}, page){
      const res = await API.get(`/user/rentalSummary?token=${localStorage.getItem('auth')}`).then(res => {
       commit('SET_RENTALS_SUMMARY', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getRentals({commit}, page){
      const res = await API.get(`/user/car/rentals?page=${page}`).then(res => {
       commit('SET_RENTALS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getPayments({commit}){
      const res = await API.get(`/user/payments`).then(res => {
       commit('SET_PAYMENTS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async searchRental({commit}, {page, data}){
      const res = await API.post(`/user/search/car/rentals?page=${page}`, data).then(res => {
       commit('SET_RENTALS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
   
  },
}