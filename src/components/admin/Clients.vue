<template>
 <div>
  <div class="container">
   <h5 class="text-primary pt-4">Client Management</h5>
   <p class="text-muted">Here are the list of your clients</p>
   <div class="row g-0 mt-5">
    <div class="card p-5 mb-4">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">Records</h5>
         <p class="mb-4"><small>Manage your client records below</small></p>
       </div>
       <div class="d-flex flex-column mt-2">
         <button v-on:click.prevent="$bvModal.show('newClientModal')" class="btn btn-primary"><i class="bi bi-plus"></i> Client</button>
       </div>
     </div>
     <div class="d-flex justify-content-end mt-2">
       <div class="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-3">
         <div class="input-group mb-3">
           <input type="text" v-model="search" class="form-control" id="floatingSearch" placeholder="Search here">
           <button @click.prevent="clientSearch" class="btn btn-primary"><i class="bi bi-search"></i></button>
         </div>
       </div>
     </div>
     <div class="table-responsive mt-4">
      <b-skeleton-table
         v-if="initialLoading"
         :rows="4"
         :columns="6"
         :table-props="{ bordered: false, striped: false }"
       ></b-skeleton-table>
      <table v-if="clients != 0 && !initialLoading" class="table table-hover">
        <caption>Total Clients: {{clients.total}}</caption>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" class="text-nowrap">First Name</th>
            <th scope="col" class="text-nowrap">Middle Name</th>
            <th scope="col" class="text-nowrap">Last Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col" class="text-nowrap">Contact Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, i) in clients.data" :key="i">
            <td>
             <avatar v-if="client != 0" class=" mr-4" :username="client.info.first_name + ' ' + client.info.last_name" :rounded="true" :size="40" :color="'#fff'" :lighten="100"></avatar>
            </td>
            <td >{{client.info.first_name}}</td>
            <td>{{client.info.middle_name}}</td>
            <td>{{client.info.last_name}}</td>
            <td>{{client.info.gender}}</td>
            <td>{{client.email}}</td>
            <td>{{client.info.contact_number}}</td>
            <td class="text-nowrap">
             <a v-on:click.prevent="$bvModal.show('updateClientModal'); id=client.id; update_data = JSON.parse(JSON.stringify(client));" class="btn btn-primary btn-sm me-2" href=""><i class="bi bi-pencil"></i> Update</a>
             <a v-on:click.prevent="id = client.id; $bvModal.show('deleteModal')" class="btn btn-danger btn-sm" href=""><i class="bi bi-x"></i> Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
     </div>
     <div class="row mt-3" v-if="clients.data">
       <pagination :showDisabled="true" :align="'right'" :data="clients" @pagination-change-page="clientSearch">
         <span slot="prev-nav">&laquo;</span>
         <span slot="next-nav">&raquo;</span>
       </pagination>
     </div>
    </div>
   </div>
  </div>

  <b-modal id="newClientModal"  scrollable centered title="New Client">
   <div class="row pe-3 ps-3">
     <h5 class="">Client's Info</h5>
     <p class="text-muted">Client's personal Info</p>
     <div class="col mt-2">
      <label for="firstname">First Name</label>
      <input v-model="data.first_name" id="firstname" type="text" class="form-control" placeholder="" aria-label="First name">
     </div>
     <div class="col mt-2">
      <label for="middlename">Middle Name</label>
      <input v-model="data.middle_name" id="middlename" type="text" class="form-control" placeholder="" aria-label="Middle name">
     </div>
   </div>
   <div class="row pe-3 ps-3">
    <div class="col mt-3">
      <label for="height">Last Name</label>
      <input v-model="data.last_name" id="lastname" type="text" class="form-control" placeholder="" aria-label="Last name">
     </div>
    <div class="col mt-3">
     <label for="gender">Select Gender</label>
     <select id="gender" v-model="data.gender" class="form-select">
      <option value="" disabled selected>Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
     </select>
    </div>
   </div>
   <div class="row pe-3 ps-3">
    <div class="col mt-3">
      <label for="contactnumber">Contact Number</label>
      <input v-model="data.contact_number" id="contactnumber" type="number" class="form-control" placeholder="" aria-label="Contact number">
    </div>
    <div class="col mt-3">
    </div>
   </div>

   <div class="row pe-3 ps-3">
     <h5 class="mt-3">Login Credentials</h5>
     <p class="text-muted">Client's Login Info</p>
     <div class="col mt-2">
      <label for="email">Email</label>
      <input v-model="data.email" id="email" type="text" class="form-control" placeholder="" aria-label="Email">
     </div>
     <div class="col mt-2">
      <label for="password">Password</label>
      <input v-model="data.password" id="password" type="password" class="form-control" placeholder="" aria-label="Password">
     </div>
   </div>
   <template #modal-footer = {cancel} >
     <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" size="sm" v-on:click.prevent="saveClient" :disabled="isLoading">
       Save Client
     </b-button>
   </template>
  </b-modal>

  <b-modal id="updateClientModal"  scrollable centered title="Update Client">
   <div class="row pe-3 ps-3">
     <h5 class="">Client's Info</h5>
     <p class="text-muted">Client's personal Info</p>
     <div class="col mt-2">
      <label for="firstname">First Name</label>
      <input v-model="update_data.info.first_name" id="firstname" type="text" class="form-control" placeholder="" aria-label="First name">
     </div>
     <div class="col mt-2">
      <label for="middlename">Middle Name</label>
      <input v-model="update_data.info.middle_name" id="middlename" type="text" class="form-control" placeholder="" aria-label="Middle name">
     </div>
   </div>
   <div class="row pe-3 ps-3">
    <div class="col mt-3">
      <label for="height">Last Name</label>
      <input v-model="update_data.info.last_name" id="lastname" type="text" class="form-control" placeholder="" aria-label="Last name">
     </div>
    <div class="col mt-3">
     <label for="gender">Select Gender</label>
     <select id="gender" v-model="update_data.info.gender" class="form-select">
      <option value="" disabled selected>Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
     </select>
    </div>
   </div>
   <div class="row pe-3 ps-3">
    <div class="col mt-3">
      <label for="contactnumber">Contact Number</label>
      <input v-model="update_data.info.contact_number" id="contactnumber" type="number" class="form-control" placeholder="" aria-label="Contact number">
    </div>
    <div class="col mt-3">
    </div>
   </div>

   <div class="row pe-3 ps-3">
     <h5 class="mt-3">Login Credentials</h5>
     <p class="text-muted">Client's Login Info</p>
     <div class="col mt-2">
      <label for="email">Email</label>
      <input v-model="update_data.email" id="email" type="text" class="form-control" placeholder="" aria-label="Email">
     </div>
     <div class="col mt-2">
     
     </div>
   </div>
   <template #modal-footer = {cancel} >
     <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" size="sm" v-on:click.prevent="updateClient" :disabled="isLoading">
       Update Client
     </b-button>
   </template>
  </b-modal>


   <!-- DELETE MODAL --->
  <b-modal id="deleteModal" centered title="Confirm Delete">
    <p class="">Deleting a client will also delete its record. Are you sure you want to delete this?</p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
      <b-button variant="danger" size="sm" v-on:click.prevent="deleteClient" :disabled="isLoading">
        Delete
      </b-button>
    </template>
   </b-modal>

 </div>
</template>
<script>
import Avatar from 'vue-avatar'
import { mapState } from 'vuex'
export default {
   components: {Avatar},
  data() {
   return {
    isLoading: false,
    data: {
     first_name: '',
     middle_name: '',
     last_name: '',
     gender: '',
     contact_number: '',
     email: '',
     password: '',
    },
    update_data: {
     email: '',
     info: {
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      contact_number: ''
     }
    },
    id: '',
    search: '',
    isSearching: false,
    initialLoading: false
   }
  },
  async mounted(){
   this.initialLoading = true
   document.title = 'Client Management'
   await this.$store.dispatch('auth/checkAdminUser')
   await this.getAllClients()
   this.initialLoading = false

  },
  methods: {
   async getAllClients(page = 1){
     await this.$store.dispatch('client/getClients', page)
   },
   async searchClient(page = 1){
    let data = {
     search: this.search
    }

    this.isSearching = true
    await this.$store.dispatch('client/searchClient', {page: page, data: data})
    this.isSearching = false
   },
   async clientSearch(){
    if(this.search == ""){
     this.getAllClients()
    }
    else {
     this.searchClient()
    }
   },
   async saveClient(){

    if(this.data.first_name.trim() == '') return this.$toast.error('First Name')
    if(this.data.last_name.trim() == '') return this.$toast.error('Last Name')
    if(this.data.gender == '') return this.$toast.error('Gender is required')
    if(this.data.contact_number == '') return this.$toast.error('Contact Number is required')
    if(this.data.email == '') return this.$toast.error('Email is required')
    if(this.data.password == '') return this.$toast.error('Password is required')
    this.isLoading = true

    const res = await this.$store.dispatch('auth/createAccount', this.data)
    if(res.status == 200){
     this.getAllClients()
     this.$bvModal.hide('newClientModal')
     this.$toast.success('Client added successfully!')
    }
    else {
      this.showError(res.data.errors)
      this.$bvModal.hide('newClientModal')
    }
    this.isLoading = false

    this.clearData()
   },
   async updateClient(){
    
    if(this.update_data.info.first_name == '') return this.$toast.error('First Name')
    if(this.update_data.info.last_name == '') return this.$toast.error('Last Name')
    if(this.update_data.info.contact_number == '') return this.$toast.error('Contact Number is required')
    if(this.update_data.email == '') return this.$toast.error('Email is required')

    this.isLoading = true
    let data =  {
     first_name: this.update_data.info.first_name,
     middle_name: this.update_data.info.middle_name,
     last_name: this.update_data.info.last_name,
     gender: this.update_data.info.gender,
     contact_number: this.update_data.info.contact_number,
     email: this.update_data.email,
    };

    const res = await this.$store.dispatch('auth/updateAccount', {id: this.id, payload: data})
    if(res.status == 200){
     this.clientSearch()
     this.$bvModal.hide('updateClientModal')
     this.$toast.success('Client Information updated successfully!');

    }
    this.isLoading = false
   },
   async deleteClient(){
    this.isLoading = true
    const res = await this.$store.dispatch('client/deleteClient', this.id)
    if(res.status == 200) {
     this.$toast.error('Client deleted successfully!')
     this.$bvModal.hide('deleteModal')
    }
    this.isLoading = false
   },
   showError(data){
     for (const key of Object.keys(data)) {
       this.$toast.error(data[key][0]); 
     }
   },
   clearData(){ 
    this.data =  {
     first_name: '',
     middle_name: '',
     last_name: '',
     gender: '',
     contact_number: '',
     email: '',
     password: '',
    }
   }
  },
  computed: {
   ...mapState('client', ['clients'])
  },
  watch: {
   search(before, after){
      this.clientSearch()
    },
  }

}
</script>