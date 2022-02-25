<template>
 <div>
  <div class="container pt-5">
   <div class="row g-0 mt-3">
    <div class="card p-5 mb-4">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">Client Queries</h5>
         <p class="mb-4"><small>Here are the list of your client queries </small></p>
       </div>
     </div>
     <div class="table-responsive mt-4">
      <b-skeleton-table
         v-if="initialLoading"
         :rows="4"
         :columns="6"
         :table-props="{ bordered: false, striped: false }"
       ></b-skeleton-table>
      <table v-if="!initialLoading" class="table table-hover">
        <caption>Showing {{inquiry.from ? inquiry.from : '0'}} to {{inquiry.to ? inquiry.to : '0'}} out of {{inquiry.total}} inquiry</caption>
        <thead>
          <tr>
            <th scope="col" >Full Name</th>
            <th scope="col">Email or Contact</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="inquiry.data.length == 0">
            <td colspan="12" class="text-center pt-3 pb-3">
              No data found
            </td>
          </tr>
          <tr v-for="(inq, i) in inquiry.data" :key="i">
            <td>{{inq.name}}</td>
            <td>{{inq.email}}</td>
            <td>{{inq.message}}</td>
            <td class="text-nowrap">
            </td>
          </tr>
        </tbody>
      </table>
     </div>
     <div class="row mt-3" v-if="inquiry.data">
       <pagination :showDisabled="true" :align="'right'" :data="inquiry" @pagination-change-page="getInquiry">
         <span slot="prev-nav">&laquo;</span>
         <span slot="next-nav">&raquo;</span>
       </pagination>
     </div>
    </div>
   </div>
  </div>

 </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data(){
   return {
     isLoading: false,
     initialLoading: false,
     
   }
  },
  async mounted(){
    this.initialLoading = true
    await this.$store.dispatch('auth/checkAdminUser')
    document.title = "Client Inquiries"
    this.getInquiry()
    this.initialLoading = false
  },
  methods: {
    async getInquiry(page = 1){
      await this.$store.dispatch('inquiry/getInquiry', page)
    },
  },
  computed: {
   ...mapState('inquiry', ['inquiry'])
  },
  watch: {

  }
}
</script>