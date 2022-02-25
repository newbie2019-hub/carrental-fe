<template>
 <div>
  <div class="container">
   <div class="row g-0 mt-3">
    <div class="card p-5 mb-4 mt-5">
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
        <caption>Total Payment: {{formatCurrency(total)}}</caption>
        <thead>
          <tr>
            <th scope="col" class="text-nowrap">Rental Status</th>
            <th scope="col" class="text-nowrap">Client</th>
            <th scope="col" class="text-nowrap">Car Type</th>
            <th scope="col" class="text-nowrap">Pick Up Date</th>
            <th scope="col" class="text-nowrap">Return Date</th>
            <th scope="col" class="text-nowrap">With Driver</th>
            <th scope="col" class="text-nowrap">Payment Type</th>
            <th scope="col" class="text-nowrap">Total Payment</th>
            <th scope="col" class="text-nowrap" style="min-width: 180px">Instructions</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-nowrap">Transaction Date</th>
            <th scope="col" >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rent, i) in rentals.data" :key="i">
            <td>
              <b-badge class="rounded-pill text-center" :class="rent.rental_status == 'finished' ? 'bg-success' : 'bg-secondary'">
                {{rent.rental_status}}
              </b-badge>
            </td>
            <td class="text-nowrap">{{rent.user.info.first_name}} {{rent.user.info.last_name}}</td>
            <td class="text-nowrap">{{rent.car.brand.brand}} {{rent.car.model}}</td>
            <td class="text-nowrap">{{rent.pickup_date | moment}}</td>
            <td class="text-nowrap">{{rent.dropoff_date | moment}}</td>
            <td>{{rent.with_driver == 0 ? 'No' : 'Yes'}}</td>
            <td>{{rent.payment.type}}</td>
            <td>{{formatCurrency(rent.total_payment)}}</td>
            <td >{{rent.additional_instructions}}</td>
            <td class="text-nowrap">
              <b-badge class="rounded-pill" :class="rent.status == 'Paid' ? 'bg-success' : 'bg-secondary'">
                <i class="bi bi-check2"></i> {{rent.status}} 
              </b-badge>
            </td>
            <td class="text-nowrap">{{rent.created_at | moment}}</td>
            <td>
              <div class="d-block">
                <a v-if="rent.status != 'Paid'" href="" class="btn btn-primary btn-sm rounded-pill" v-on:click.prevent="data = rent; $bvModal.show('receivePaymentModal')">Payment</a>
                <a v-if="rent.rental_status == 'on-going'" href="" class="btn btn-primary btn-sm" v-on:click.prevent="data = rent; $bvModal.show('returnedCarModal')">Returned</a>
              </div>
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

  <b-modal id="returnedCarModal" scrollable centered title="Booking Finished">
  <label for="cashreceived">Are you sure you want to mark this booking as returned or finished?</label>
   <template #modal-footer = {cancel} >
     <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" size="sm" v-on:click.prevent="returnedCar" :disabled="isLoading">
       Proceed
     </b-button>
   </template>
  </b-modal>

  <b-modal id="receivePaymentModal" scrollable centered title="Update Payment">
   <div class="row pe-3 ps-3">
     <div class="col mt-2">
      <label for="cashreceived">Amount Received</label>
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
     cash_received: '',
     total: 0,
   }
  },
  async mounted(){
    this.initialLoading = true
    await this.$store.dispatch('auth/checkAdminUser')
    await this.$store.dispatch('rental/getPayments')
    await this.$store.dispatch('rental/getRentals', 1);
    this.initialLoading = false
    this.totalAmount()
  },
  methods: {
    totalAmount(){
      let total = 0
      console.log('hi')
      this.rentals.data.forEach((data, i) => {
        total += parseFloat(data.total_payment)
        console.log(data)
      })
      this.total = total
    },
    async returnedCar(){
      this.isLoading = true
      const {status, data} = await this.$store.dispatch('rental/returnedCar', this.data)
      await this.$store.dispatch('rental/getRentals', 1);
      this.$bvModal.hide('returnedCarModal')
      this.isLoading = false
      if(status == 200) return this.$toast.success('Booking has been marked as done')
      if(status != 200) return this.$toast.success('Something went wrong')
    },
    rentalStatus(date){
      const returnDate = new Date(date);
      if(returnDate >= Date.now()){
        return 'on-going'
      }
      else {
        return 'finished'
      }
    },
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
      console.log('hi')
      const res = await this.$store.dispatch('rental/getRentals', page)
      this.totalAmount()
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