<template>
 <div>
  <div class="container">
   <h5 class="text-primary pt-4">Rental Records</h5>
   <p class="text-muted">Here are the list of your rentals</p>
   <div class="row g-0 mt-3">
    <div class="card p-5 mb-4">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">Car Rentals</h5>
         <p class="mb-4"><small>Manage your rental records below</small></p>
       </div>
     </div>
     <div class="d-flex justify-content-end mt-2">
       <div class="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-3">
         <div class="input-group mb-3">
           <input type="text" v-model="search" class="form-control" id="floatingSearch" placeholder="Search here">
           <button @click.prevent="" class="btn btn-primary"><i class="bi bi-search"></i></button>
         </div>
       </div>
     </div>
     <div class="table-responsive">
      <b-skeleton-table v-if="initialLoading"
        :rows="4"
        :columns="8"
        :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table> 
      <table class="table table-hover" v-if="!initialLoading">
        <thead>
          <tr>
            <th scope="col" class="text-nowrap">Client</th>
            <th scope="col" class="text-nowrap">Car Type</th>
            <th scope="col" class="text-nowrap">Pick Up Date</th>
            <th scope="col" class="text-nowrap">Drop Off Date</th>
            <th scope="col" class="text-nowrap">With Driver</th>
            <th scope="col" class="text-nowrap">Payment Type</th>
            <th scope="col" class="text-nowrap">Total Payment</th>
            <th scope="col" class="text-nowrap">Additional Instructions</th>
            <th scope="col">Status</th>
            <th scope="col" >Transaction Date</th>
            <th scope="col" >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rent, i) in rentals.data" :key="i">
            <td class="text-nowrap">{{rent.user.info.first_name}} {{rent.user.info.last_name}}</td>
            <td class="text-nowrap">{{rent.car.brand.brand}} {{rent.car.model}}</td>
            <td>{{rent.pickup_date}}</td>
            <td>{{rent.dropoff_date}}</td>
            <td>{{rent.with_driver == 0 ? 'No' : 'Yes'}}</td>
            <td>{{rent.payment.type}}</td>
            <td>{{formatCurrency(rent.total_payment)}}</td>
            <td >{{rent.additional_instructions}}</td>
            <td class="text-nowrap">{{rent.status}}</td>
            <td class="text-nowrap">{{rent.created_at | moment}}</td>
            <td v-if="rent.status != 'Paid'">
              <a href="" class="btn btn-primary btn-sm rounded-pill" v-on:click.prevent="data = rent; $bvModal.show('receivePaymentModal')">Payment</a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
     <div class="row mt-3" v-if="rentals.data">
       <pagination :showDisabled="true" :align="'right'" :data="rentals" @pagination-change-page="rentalSearch">
         <span slot="prev-nav">&laquo;</span>
         <span slot="next-nav">&raquo;</span>
       </pagination>
     </div>
    </div>
   </div>

   <div class="row g-0 mt-3">
    <div class="card p-5 mb-4">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">On Branch Payments</h5>
         <p class="mb-4"><small>View all the branch transactions below</small></p>
       </div>
     </div>

     <div class="table-responsive">
      <b-skeleton-table v-if="initialLoading"
        :rows="4"
        :columns="8"
        :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table> 
      <table class="table table-hover" v-if="!initialLoading">
        <thead>
          <tr>
            <th scope="col" class="text-nowrap">Client</th>
            <th scope="col" class="text-nowrap">Cash Received</th>
            <th scope="col" class="text-nowrap">Total Amount</th>
            <th scope="col" class="text-nowrap">Change</th>
            <th scope="col" class="text-nowrap">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, i) in payments" :key="i">
            <td class="text-nowrap">{{payment.rental.user.info.first_name}} {{payment.rental.user.info.last_name}}</td>
            <td class="text-nowrap">{{formatCurrency(payment.cash_received)}}</td>
            <td>{{formatCurrency(payment.total_payment)}}</td>
            <td>{{formatCurrency(payment.change)}}</td>
            <td>{{payment.created_at | moment}}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
   </div>
  </div>

  <b-modal id="receivePaymentModal" scrollable centered title="Update Payment">
   <div class="row pe-3 ps-3">
     <div class="col mt-2">
      <label for="cashreceived" >Amount Received</label>
      <input v-model="cash_received" id="cashreceived" type="number" class="form-control" placeholder="" aria-label="Cash Received">
      <p class="mt-3">Total Payment: {{formatCurrency(data.total_payment)}}</p>
     </div>
   </div>

   <template #modal-footer = {cancel} >
     <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" size="sm" v-on:click.prevent="updatePayment" :disabled="isLoading">
       Proceed
     </b-button>
   </template>
  </b-modal>
 </div>
</template>
<script>
import {mapState} from 'vuex';
import moment from 'moment'
export default {
  filters: {
     moment: function (date) {
      return moment(date).format('MMMM DD, YYYY');
    }
  },
  data(){
   return {
     isLoading: false,
     initialLoading: false,
     search: '',
     data: {
      
     },
     cash_received: ''
   }
  },
  async mounted(){
    this.initialLoading = true
    await this.$store.dispatch('auth/checkAdminUser')
    await this.$store.dispatch('rental/getPayments')
    await this.$store.dispatch('rental/getRentals', 1);
    this.initialLoading = false
  },
  methods: {
    async rentalSearch(){
      if(this.searchcar == ""){
        this.getRentals()
      }
      else {
        this.searchRental()
      }
    },
    async searchRental(page = 1){
      let data = {
        search: this.search
      }

      this.isSearching = true
      await this.$store.dispatch('rental/searchRental', {data: data, page: page})
      this.isSearching = false
    },

    async getRentals(page = 1){
      const res = await this.$store.dispatch('rental/getRentals', page)
    },
    showError(data){
     for (const key of Object.keys(data)) {
       this.$toast.error(data[key][0]); 
     }
    },
    formatCurrency(data){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
      return formatter.format(data);
    },
    async updatePayment(){
      if(this.cash_received == '') return this.$toast.error('Received amount is empty')
      if(this.cash_received < this.data.total_payment) return this.$toast.error('Insufficient amount received')
      this.isLoading = true
      let data = {
        rental_id: this.data.id,
        total_payment: this.data.total_payment,
        cash_received: this.cash_received,
        change: (parseFloat(this.cash_received) - parseFloat(this.data.total_payment))
      }
      const res = await this.$store.dispatch('client/updatePayment', data)
      if(res.status == 200){
        this.$toast.success(res.data.msg)
        this.rentalSearch()
        this.$bvModal.hide('receivePaymentModal')
      }
      else {
        this.$toast.error('Something went wrong')
      }
      this.isLoading = true
    }

  },
  computed: {
   ...mapState('rental', ['rentals', 'payments'])
  },
  watch: {
   search(before, after){
      this.rentalSearch()
   },
  }
}
</script>