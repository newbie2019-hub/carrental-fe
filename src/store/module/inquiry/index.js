import API from '../../base/'

export default {
  namespaced: true,
  state: {
    inquiry: {},
  },
  getters: {
   
  },
  mutations: {
   SET_INQUIRY(state, data) {
    state.inquiry = data
   },

  },
  actions: {
    async getInquiry({commit}, page){
      const res = await API.get(`/admin/inquiry?page=${page}`).then(res => {
       commit('SET_INQUIRY', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
   
  },
}