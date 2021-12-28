<template>
  <div>
   <div class="navigation" v-if="user.info">
    <div class="d-flex w-100 justify-content-between">
      <div class="d-flex align-items-center">
        <avatar v-if="user.info" class="ms-4" :username="user.info.first_name + ' ' + user.info.last_name" :rounded="true" :size="40" :color="'#fff'" :lighten="100"></avatar>
        <div class="d-flex flex-column lh-0">
          <p class="text-dark username" v-if="user">Welcome, {{user.info.first_name}} {{user.info.last_name}}!</p>
          <p class="text-muted username mt-2" v-if="user"><small>{{user.email}}</small></p>
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
import Avatar from 'vue-avatar' 
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Avatar
  },
  async mounted(){
    await this.checkAdminUser()
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
   ...mapActions('auth', ['checkAdminUser']),
   toggleSideNav(){
     const sideNav = document.getElementById('sidenav')
     sideNav.classList.toggle('toggleNav')
   }
  }
}
</script>