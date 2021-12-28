<template>
  <div>
   <Sidebar />
   <Navbar />
    <div class="content-container">
    <router-view name="userRentals"/>
    <router-view name="userRents"/>
    <router-view name="userCars"/>
    </div>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default { 
  async mounted() {
    document.title = 'User Dashboard'
    await this.$store.dispatch('auth/checkAuthUser')
  },
  components: {Navbar, Sidebar}
}
</script>