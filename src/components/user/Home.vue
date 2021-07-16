<template>
  <div>
   <Navbar />
   <div class="p-5">
    <router-view name="userRentals"/>
   </div>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default { 
  async mounted() {
    document.title = 'User Dashboard'
    await this.$store.dispatch('auth/checkAuthUser')
  },
  components: {Navbar}
}
</script>