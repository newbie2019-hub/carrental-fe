<template>
  <div>
    <div class="hero ">
     <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col-11 col-sm-11 col-md-10 col-lg-8 col-xl-8">
       <div class="card p-5">
         <h4 class=" mt-2">Create Account</h4>
         <p class="mb-3"><small>Welcome! We need some of your informations</small></p>
         <div class="row">
          <div class="col-4">
           <div class="form-floating mb-3">
            <input v-model="data.first_name" type="text" class="form-control" id="floatingFirstName" placeholder="name@example.com">
            <label for="floatingFirstName">First Name</label>
           </div>
          </div>
          <div class="col-4">
           <div class="form-floating">
              <input v-model="data.middle_name" type="text" class="form-control" id="floatingMiddleName" placeholder="Password">
              <label for="floatingMiddleName">Middle Name</label>
           </div>
          </div>
          <div class="col-4">
           <div class="form-floating">
              <input v-model="data.last_name" type="text" class="form-control" id="floatingLastName" placeholder="Password">
              <label for="floatingLastName">Last Name</label>
           </div>
          </div>
         </div>
         <div class="row">
          <div class="col-6">
           <div class="form-floating mb-3">
             <select id="gender" v-model="data.gender" class="form-select">
              <option value="" disabled selected>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
             </select>
            <label for="floatingInput">Gender</label>
           </div>
          </div>
          <div class="col-6">
           <div class="form-floating">
              <input v-model="data.contact_number" type="text" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Contact Number</label>
           </div>
          </div>
         </div>
         <div class="row">
          <h5 class="">Login Credentials</h5>
          <p class="mb-3"><small>Please remember your login credentials</small></p>
          <div class="col-6">
           <div class="form-floating mb-3">
            <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
           </div>
          </div>
          <div class="col-6">
           <div class="form-floating">
              <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Password</label>
           </div>
          </div>
         </div>
         <p><small>Already have an account? <router-link to="/login" class="text-decoration-none">Login</router-link></small></p>         
        
         <div class="d-flex justify-content-center mt-4">
          <div class="col-12">
           <button href="" v-on:click.prevent="createAccount" class="btn rounded-pill btn-primary btn-100" :disabled="isLoading">Sign-up <i class="bi bi-arrow-right-circle"></i></button>
          </div>
         </div>
       </div>
      </div>
     </div>
    </div>
    
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      data: {
       first_name: '',
       middle_name: '',
       last_name: '',
       gender: '',
       contact_number: '',
       email: '',
       password: '',
      },
      adminlogin: false,
      isLoading: false,
    }
  },
  mounted() {
   document.title ="Car Rental - Please Login"
  },
  methods: {
    async createAccount(){
       if(this.data.first_name.trim() == '') return this.$toast.error('First Name')
       if(this.data.last_name.trim() == '') return this.$toast.error('Last Name')
       if(this.data.gender == '') return this.$toast.error('Gender is required')
       if(this.data.contact_number == '') return this.$toast.error('Contact Number is required')
       if(this.data.email == '') return this.$toast.error('Email is required')
       if(this.data.password == '') return this.$toast.error('Password is required')
       this.isLoading = true

       const res = await this.$store.dispatch('auth/createAccount', this.data)
       if(res.status == 200){
        this.$toast.success('Account created successfully!')
        this.$router.push('/login')
        setTimeout(() => {
         this.$toast.success('You can now login to your account')
        }, 1500)
        this.clearData()
       }
       else {
         this.showError(res.data.errors)
         this.clearData()
         this.$bvModal.hide('newClientModal')
       }
       this.isLoading = false

       this.clearData()
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
    },
    showError(data){
     for (const key of Object.keys(data)) {
       this.$toast.error(data[key][0]); 
     }
   },
  }
}
</script>
<style scoped>
.hero {
 height: 100vh;
 background: linear-gradient(to right, rgba(3, 39, 87, 0.733), rgba(3, 10, 49, 0.747)), url('~@/assets/images/bg-hero.jpg');
 background-attachment: fixed;
 background-repeat: no-repeat;
 background-size: cover;
 background-position: center;
 position: absolute;
 width: 100%;
}

.form-control:focus {
 box-shadow: 0 0 0 0.1rem rgb(13 110 253 / 25%) !important;
}

.register-button {
 position: absolute;
 right: 12%;
 top: 5%;
}

.btn-register {
 color: black;
 border-bottom: 0px solid #000;
 transition: all 250ms ease;
}

.btn-register:hover {
 color: rgb(55, 137, 214);
 
}


</style>