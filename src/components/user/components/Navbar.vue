<template>
 <div>
  <div class="navigation">
   <div class="d-flex w-100 justify-content-between">
    <div class="d-flex align-items-center">
      <b-avatar variant="info" :src="`http://127.0.0.1:8000/uploads/${user.info.image}`"></b-avatar>
      <div class="d-flex flex-column ms-2 lh-0">
      <h6>{{user.info.first_name}} {{user.info.last_name}}</h6>
      <p><small>{{user.email}}</small></p>
      </div>
    </div>
    <div>
      <button class="btn btn-toggle" id="btn-toggle" @click.prevent="toggleSideNav">
        <i class="bi bi-list bi-2x"></i>
      </button>
    </div>
   </div>
  </div>
 </div>
</template>
<script>
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
   toggleSideNav(){
     const sideNav = document.getElementById('sidenav')
     sideNav.classList.toggle('toggleNav')
   },
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