<template>
  <div id="sidenav" class="sidenav">
   <p class="mt-5 mb-4 text-white text-center fw-bolder">MANAGEMENT</p>
   <router-link to="/admin/dashboard"><i class="bi bi-bookmarks"></i> Dashboard</router-link>
   <router-link to="/admin/clients"><i class="bi bi-people"></i> Clients</router-link>
   <router-link to="/admin/branch"><i class="bi bi-diagram-2"></i>Branch</router-link>
   <router-link to="/admin/cars"><i class="bi bi-plus-circle"></i>Cars</router-link>
   <router-link to="/admin/rentals"><i class="bi bi-calendar-plus"></i> Rentals</router-link>
   <router-link to="/admin/inquiries"><i class="bi bi-question-circle"></i> Queries</router-link>
   <a href="" v-on:click.prevent="setValues(); $bvModal.show('settingsModal')" ><i class="bi bi-tools"></i> Settings</a>
   <a href="" v-on:click.prevent="$bvModal.show('logoutModal')"><i class="bi bi-x-circle"></i> Log-out</a>

   <b-modal id="logoutModal" centered title="Logout">
    <p class="">Are you sure you want to log-out?</p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
      <b-button size="sm" variant="danger" v-on:click.prevent="logout">
        Logout
      </b-button>
    </template>
   </b-modal>

  <b-modal id="settingsModal" centered title="Account Settings">
   <div class="row pe-4 ps-4 pt-2 pb-2">
    <div class="col">
       <label for="item">Profile Image</label>
     <VueFileAgent
            ref="vueFileAgent"
            @select="filesSelected($event)"
            :multiple="false"
            :maxSize="'3MB'"
            :deletable="true"
            :accept="'image/*,'"
            :theme="'list'"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            :errorText="{
              type: 'Invalid file type. Only image file is allowed',
              size: 'Image should not exceed 3MB in size',
            }"
            v-model="fileRecords"
          ></VueFileAgent>
     <label class="d-block"><small class="text-muted">This will replace your existing image if you have</small></label>
     <label for="item">First Name</label>
     <input v-model="data.first_name" id="item" type="text" class="form-control" placeholder="" aria-label="First Name">
     
     <label for="remarks">Middle Name</label>
     <input v-model="data.middle_name" id="remarks" type="text" class="form-control" placeholder="" aria-label="Middle Name">

     <label for="remarks">Last Name</label>
     <input v-model="data.last_name" id="remarks" type="text" class="form-control" placeholder="" aria-label="Last Name">

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

   <div id="closenav" class="closenav" @click.prevent="toggleSideNav">
    <p>X</p>
   </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex';
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
      fileRecordsForUpload: [],
      fileRecords: [],
      isLoading: false,
    }
  },
  filters: {
     moment: function (date) {
      return moment(date).format('MMMM DD, YYYY');
    }
  },
  mounted(){
    this.setValues()
  },
  methods: {
   ...mapActions('auth', ['logoutAdminUser']),
   filesSelected: function(fileRecordsNewlySelected) {
     var validFileRecords = fileRecordsNewlySelected.filter(
       (fileRecord) => !fileRecord.error
     );
     this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
       validFileRecords
     );
    },
    fileDeleted: function(fileRecord) {
       var i = this.fileRecordsForUpload.indexOf(fileRecord);
       if (i !== -1) {
         this.fileRecordsForUpload.splice(i, 1);
       }
    },
    onBeforeDelete: function(fileRecord) {
       var i = this.fileRecordsForUpload.indexOf(fileRecord);
       if (i !== -1) {
         this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
         if (k !== -1) this.fileRecords.splice(k, 1);
       }
    },
   toggleSideNav(){
     const sideNav = document.getElementById('sidenav')
     sideNav.classList.toggle('toggleNav')
   },
   async logout(){
     const res = await this.logoutAdminUser()
     if(res.status == 200){
       this.$router.push('/')
     }
   },
   setValues(){
     this.data.id = this.user.id
     this.data.first_name = this.user.info.first_name
     this.data.middle_name = this.user.info.middle_name
     this.data.last_name = this.user.info.last_name
     this.data.gender = this.user.info.gender
     this.data.email = this.user.email
   },
   async updateAccount(){
     if(this.fileRecordsForUpload.length > 0){
       const img = await this.$refs.vueFileAgent.upload(
           `https://be-aclc-carrental.herokuapp.com/api/admin/uploadFeaturedImage?token=` + localStorage.getItem("auth"), 
           {'X-Requested-With' : 'XMLHttpRequest'}, this.fileRecordsForUpload
       );

       this.data.img = img[0].data
     }
     const res = await this.$store.dispatch('auth/updateAdminAccount', this.data)
     if(res.status == 200){
       await this.$store.dispatch('auth/checkAdminUser')
       this.$bvModal.hide('settingsModal')
       this.$toast.success('Account Info updated successfully!')
     }
   }
  },
  computed: {
    ...mapState("auth", ["user"]),
   getRoute: function(){
      return this.$route.path
    }
  }
}
</script>