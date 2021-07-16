import API from '../../base/'

export default {
  namespaced: true,
  state: {
    message: '',
    clients: {},
    paymenttypes: [],
    rentals: {},
  },
  getters: {
    GET_MESSAGES(state) {
      return state.message;
    }
  },
  mutations: {
   SET_CLIENTS(state, data) {
    state.clients = data
   },
   REMOVE_CLIENT(state, id){
    state.clients.data = state.clients.data.filter(patient => {
     return patient.id !== id;
    });
   },
   SET_PAYMENT_TYPES(state, data){
     state.paymenttypes = data
   },
   SET_RENTAL_RECORDS(state, data){
     state.rentals = data
   }
  },
  actions: {
    async sendMessage({commit}, payload){
      const res = await API.post('send/inquiry', payload).then(res => {

        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getClients({commit}, page){
     const res = await API.get(`/admin/clients?page=${page}`).then(res => {
       commit('SET_CLIENTS', res.data)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
    async searchClient({commit}, {data, page}){
     const res = await API.post(`/admin/search/client?page=${page}`, data).then(res => {
       commit('SET_CLIENTS', res.data)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
    async deleteClient({commit}, id){
     const res = await API.delete(`/admin/client/${id}`).then(res => {
       commit('REMOVE_CLIENT', id)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
   async getPaymentTypes({commit}){
    const res = await API.get(`/paymenttypes`).then(res => {
      commit('SET_PAYMENT_TYPES',res.data)

      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
   },
   async payRental({commit}, data){
    const res = await API.post(`/user/checkout`, data).then(res => {

      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
   },
   async getRentals({commit}){
    const res = await API.get(`/user/rentals`).then(res => {
       commit('SET_RENTAL_RECORDS', res.data)
      return res;
     }).catch(err => {
       return err.response;
     })

     return res;
    },
    async updatePayment({commit}, data){
      const res = await API.put(`/admin/update/rental/${data.rental_id}`, data).then(res => {
       return res;
      }).catch(err => {
        return err.response;
      })
  
      return res;
     }
  },
  
}