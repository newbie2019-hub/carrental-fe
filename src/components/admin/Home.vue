<template>
  <div>
   <Sidenav />
   <Navbar />
   <div class="content-container">
    <router-view name="adminDashboard"/>
    <router-view name="cars"/>
    <router-view name="clients"/>
    <router-view name="inquiries"/>
    <router-view name="adminRentals"/>
   </div>
  </div>
</template>
<script>
import Sidenav from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default { 
  async mounted() {
    document.title = 'Admin Dashboard'
    await this.$store.dispatch('auth/checkAdminUser')
  },
  components: {Sidenav, Navbar}
}
</script>