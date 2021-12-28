import API from '../../base/'

export default {
  namespaced: true,
  state: {
    branch: [],
    user: [],
  },
  getters: {

  },
  mutations: {
   SET_BRANCHES(state, data) {
    state.branch = data.branch
    state.user = data.user
   },
  },
  actions: {
  async getBranch({commit}, page){
    const res = await API.get(`/admin/branch`).then(res => {
      commit('SET_BRANCHES', res.data)
      return res;
    }).catch(err => {
     return err.response;
    })
    return res;
  },
  async saveBranch({commit}, data){
    const res = await API.post(`/admin/branch`, data).then(res => {
      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
  },
  async updateBranch({commit}, data){
    const res = await API.put(`/admin/branch/${data.id}`, data).then(res => {
      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
  },
  async deleteBranch({commit}, data){
    const res = await API.delete(`/admin/branch/${data.id}`).then(res => {
      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
  },

 },
}