import API from '../../base/'

export default {
  namespaced: true,
  state: {
    rentals: {},
    payments: {},
    summary: '',
  },
  getters: {
   
  },
  mutations: {
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
    async getRentals({commit}, page){
      const res = await API.get(`/admin/rentals?page=${page}`).then(res => {
       commit('SET_RENTALS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getPayments({commit}){
      const res = await API.get(`/admin/payments`).then(res => {
       commit('SET_PAYMENTS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getSummary({commit}){
      const res = await API.get(`/admin/summary`).then(res => {
       commit('SET_SUMMARY', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async searchRental({commit}, {page, data}){
      const res = await API.post(`/admin/search/rentals?page=${page}`, data).then(res => {
       commit('SET_RENTALS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
   
  },
}