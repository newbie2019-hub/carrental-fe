<template>
  <div>
    <div class="hero ">
     <div class="d-flex justify-content-center align-items-center h-100">
      <div class="col-11 col-sm-8 col-md-5 col-lg-4 col-xl-4">
       <div class="card p-5">
         <h4 class="mb-3 mt-2">Login</h4>
         <p class="mb-4"><small>Welcome! Please fill in your email and password to sign-in.</small></p>
         <div class="form-floating mb-3">
          <input v-model="data.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
         </div>
         <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
         </div>
         <p><small>Don't have an account? <router-link to="/register" class="text-decoration-none">Register</router-link></small></p>         
         <div class="form-check form-switch mt-2">
           <input v-model="adminlogin" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
           <label class="form-check-label" for="flexSwitchCheckDefault">Admin Login</label>
         </div>
         <div class="d-flex justify-content-center mt-4">
          <div class="col-12">
           <button href="" v-on:click.prevent="login" class="btn btn-primary btn-100" :disabled="isLoading">Sign-in <i class="bi bi-arrow-right-circle"></i></button>
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
        email: '',
        password: ''
      },
      adminlogin: false,
      isLoading: false,
    }
  },
  mounted() {
   document.title ="Car Rental - Please Login"
  },
  methods: {
    //From Vuex - Vuex is a statemanagement for VueJS
    ...mapActions('auth', ['loginAdminAccount', 'loginUserAccount']),
    async login(){
      if(this.adminlogin){
        this.isLoading = true
        await this.loginAdminAccount(this.data).then(res => {
          if(res.status == 200)
          {
            this .$toast.success(`Welcome, ${res.data.user.info.first_name} ${res.data.user.info.last_name}`);
            this.$router.push('/admin/dashboard');
          }
          else 
          {
            this.$toast.error('Invalid Credentials')
          }
        })
        this.isLoading = false
      }
      else {
        this.isLoading = true
        await this.loginUserAccount(this.data).then(res => {
          if(res.status == 200)
          {
            this.$router.push('/');
          }
          else 
          {
            this.$toast.error('Invalid Credentials')
          }
        }) 
        this.isLoading = false
      }

    }
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