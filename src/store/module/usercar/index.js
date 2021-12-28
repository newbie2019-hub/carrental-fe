import API from '../../base/'

export default {
  namespaced: true,
  state: {
    brands: {},
    allbrands: {},
    cars: {},
    transmission: {},
    homecars: {},
    selectedcar: '',
  },
  getters: {

  },
  mutations: {
   SET_CARS(state, data) {
    state.cars = data
   },
   SET_HOMECARS(state, data) {
    state.homecars = data
   },
   SET_CARBRANDS(state, data) {
    state.brands = data
   },
   REMOVE_CAR(state, id){
    state.cars.data = state.cars.data.filter(car => {
     return car.id !== id;
    });
   },
   SET_SELECTED_CAR(state, data){
    state.selectedcar = data
   },
   REMOVE_CAR_BRAND(state, id){
    state.brands.data = state.brands.data.filter(brand => {
     return brand.id !== id;
    });
   },
   SET_ALL_CARBRANDS(state, data){
    state.allbrands = data
   },
   SET_TRANSMISSION(state, data){
    state.transmission = data
   }

  },
  actions: {
    async getHomeCars({commit}, page){
     const res = await API.get(`/cars`).then(res => {
       commit('SET_HOMECARS', res.data)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
    async getCars({commit}, page){
     const res = await API.get(`/user/cars?page=${page}`).then(res => {
       commit('SET_CARS', res.data)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
   async searchCar({commit}, {data, page}){
     const res = await API.post(`/user/search/car?page=${page}`, data).then(res => {
       commit('SET_CARS', res.data)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
   async deleteCar({commit}, id){
     const res = await API.delete(`/user/cars/${id}`).then(res => {
       commit('REMOVE_CAR', id)

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
   async saveCar({commit}, data){
     const res = await API.post(`/user/cars`, data).then(res => {

       return res;
     }).catch(err => {
      return err.response;
     })

     return res;
   },
   async updateCar({commit}, {id, data}){
    const res = await API.put(`/user/cars/${id}`, data).then(res => {
      return res;
    }).catch(err => {
     return err.response;
    })

    return res;
  },

  //TRANSMISSION
  async getTransmissions({commit}){
   const res = await API.get(`/user/transmission`).then(res => {
     commit('SET_TRANSMISSION', res.data)

     return res;
   }).catch(err => {
    return err.response;
   })

   return res;
 },
 },
}