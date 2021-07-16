<template>
 <div>
  <div class="user-navbar">
   <div class="d-flex align-items-center">
    <avatar v-if="user.info" class="ms-4" :username="user.info.first_name + ' ' + user.info.last_name" :rounded="true" :size="40" :color="'#fff'" :lighten="100"></avatar>
    <div class="d-flex flex-column ms-2 lh-sm text-white">
     <h6>{{user.info.first_name}} {{user.info.last_name}}</h6>
     <p><small>{{user.email}}</small></p>
    </div>
   </div>
   <ul>
    <li><a href="/">Home</a></li>
     <li><a href="/user/rentals">Rentals</a></li>
     <li><a href="" v-on:click.prevent="$bvModal.show('settingsModal')">Settings</a></li>
     <li><a href="" v-on:click.prevent="$bvModal.show('logoutModal')">Log-out</a></li>
   </ul>
  </div>

  <b-modal id="logoutModal" centered title="Logout">
    <p class="my-4">Are you sure you want to log-out?</p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
      <b-button size="sm" variant="danger" v-on:click.prevent="logout" :disabled="isLoading">
        Logout
      </b-button>
    </template>
   </b-modal>

   <b-modal id="settingsModal" centered title="Account Settings">
   <div class="row pe-4 ps-4 pt-2 pb-2">
    <div class="col">
     <label for="item">First Name</label>
     <input v-model="data.first_name" id="item" type="text" class="form-control" placeholder="" aria-label="First Name">
     
     <label for="remarks">Middle Name</label>
     <input v-model="data.middle_name" id="remarks" type="text" class="form-control" placeholder="" aria-label="Middle Name">

     <label for="remarks">Last Name</label>
     <input v-model="data.last_name" id="remarks" type="text" class="form-control" placeholder="" aria-label="Last Name">
     
     <label for="remarks">Contact Number</label>
     <input v-model="data.contact_number" id="remarks" type="text" class="form-control" placeholder="" aria-label="Last Name">

     <label for="gender">Select Gender</label>
     <select id="gender" v-model="data.gender" class="form-select">
      <option value="" disabled selected>Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
     </select>
     
     <label for="email">Email</label>
     <input v-model="data.email" id="email" type="text" class="form-control" placeholder="" aria-label="Email">

     <label for="password">Password </label>
     <input v-model="data.password" id="password" type="password" class="form-control" placeholder="" aria-label="Password">
     <label class="text-muted"><small>Leave empty if you dont want to make changes</small></label>
    </div>
   </div>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()" :disabled="isLoading"> Cancel </b-button>
      <b-button variant="success" size="sm" v-on:click.prevent="updateAccount" :disabled="isLoading">
        Update
      </b-button>
    </template>
   </b-modal>
 </div>
</template>
<script>
import Avatar from 'vue-avatar'
import {mapState,mapActions} from 'vuex'
export default {
  data(){
   return {
    data:{
        id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: '',
        email: '',
        password: '',
      },
      isLoading: false,
   }
  },
  async mounted(){
    await this.checkAuthUser()
    this.setValues()
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
   ...mapActions('auth', ['checkAuthUser']),
   ...mapActions('auth', ['logoutAuthUser']),
   async logout(){
    this.isLoading = true
    const res = await this.logoutAuthUser()
    if(res.status == 200){
      this.$router.push('/')
    }
    this.isLoading = false

   },
   setValues(){
     this.data.id = this.user.id
     this.data.first_name = this.user.info.first_name
     this.data.middle_name = this.user.info.middle_name
     this.data.last_name = this.user.info.last_name
     this.data.contact_number = this.user.info.contact_number
     this.data.gender = this.user.info.gender
     this.data.email = this.user.email
   },
   async updateAccount(){
     this.isLoading = true
     const res = await this.$store.dispatch('auth/updateUserAccount', this.data)
     if(res.status == 200){
       await this.$store.dispatch('auth/checkAuthUser')
       this.$bvModal.hide('settingsModal')
       this.$toast.success('Account Info updated successfully!')
     }
     this.isLoading = false
   }
  },
  components:{ Avatar }
}
</script>
<style>
.user-navbar {
 width: 100%;
 height: 60px;
 background-image: linear-gradient(to left, #183B96, #2883B7);
 box-shadow: 0px 0px 10px #183c967e;
 display: flex;
 justify-content: space-between;
 padding: 1rem 2rem;
 position: fixed;
 z-index: 2;
}

.user-navbar ul {
  position: relative;
 display: flex;
 text-decoration: none;
 list-style: none;
 align-items: center;
 height: 100%;
}

.user-navbar ul li {
 align-items: center;
}

.user-navbar ul li a{
 text-decoration: none;
 padding: .5rem 1.2rem;
 color: white;
 align-items: center;
 display: flex;
 transition: all 150ms ease-in;
 margin-left: 2px;
}

.user-navbar ul li a:hover {
 background: rgb(32, 133, 228);
 border-radius: 20px;
 color: rgb(240, 240, 240);
}

</style>