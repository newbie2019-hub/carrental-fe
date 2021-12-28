<template>
 <div>
   <div class="container">
    <div class="row justify-content-center">
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4  mt-3">
        <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-question-circle bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <h1>{{summary.inquiry}}</h1>
              <p>INQUIRIES</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-3">
        <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-calendar-plus bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
             <h1>{{summary.rental}}</h1>
             <p>RENTALS</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4  mt-3">
        <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-cash-stack bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
             <h1>{{summary.payment}}</h1>
             <p>PAYMENTS</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-3">
        <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-globe bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
             <h1>{{summary.brand}}</h1>
             <p>BRANDS</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-3">
        <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-person-circle bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
             <h1>{{summary.client}}</h1>
             <p>CLIENTS</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-sm-6 col-md-4 col-lg-4 col-xl-4 mt-3">
       <div class="card p-3">
          <div class="row justify-content-center">
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
              <i class="bi bi-peace bi-card"></i>
            </div>
            <div class="col-6 d-flex align-items-center flex-column justify-content-center">
             <h1>{{summary.car}}</h1>
             <p>CARS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
 </div>
</template>
<script>
import { mapState } from 'vuex'
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
    await this.$store.dispatch('rental/getSummary')
    this.initialLoading = false
  },
  methods: {

  },
  computed: {
    ...mapState('rental', ['summary'])
  }
}
</script>
<style>
.bi-card {
  font-size: 5rem;
}
</style>