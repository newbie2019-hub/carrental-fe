<template>
 <div>
   <div class="container mt-5">
     <div class="row g-0 justify-content-center">
       <div class="card mt-5 p-5">
       <h5>Rentals</h5>
       <p>Here are your rental records</p>
         <div class="d-flex justify-content-end mb-4">
           <router-link to="/" class="btn btn-primary">New Rental</router-link>
         </div>
         <div class="table-responsive">
          <b-skeleton-table v-if="initialLoading"
            :rows="4"
            :columns="8"
            :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table> 
          <table class="table table-hover" v-if="!initialLoading">
            <caption>Shown on the table are your rentals record</caption>
            <thead>
              <tr>
                <th scope="col" class="text-nowrap">Rental Status</th>
                <th scope="col" class="text-nowrap">Car Type</th>
                <th scope="col" class="text-nowrap">Pick Up Date</th>
                <th scope="col" class="text-nowrap">Return Date</th>
                <th scope="col" class="text-nowrap">With Driver</th>
                <th scope="col" class="text-nowrap">Payment Type</th>
                <th scope="col" class="text-nowrap">Total Payment</th>
                <th scope="col" class="text-nowrap">Additional Instructions</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="rentals.length == 0">
                <td colspan="11" class="text-center">
                  No data found
                </td>
              </tr>
              <tr v-for="(rent, i) in rentals" :key="i">
                <td class="text-nowrap">
                  <b-badge class="rounded-pill" :class="rent.rental_status == 'on-going' ? 'bg-primary' : 'bg-secondary'">
                    {{rent.rental_status}}
                  </b-badge>
                </td>
                <td class="text-nowrap">{{rent.car.brand.brand}} {{rent.car.model}}</td>
                <td class="text-nowrap">{{rent.pickup_date | moment}}</td>
                <td class="text-nowrap">{{rent.dropoff_date | moment}}</td>
                <td>{{rent.with_driver == 0 ? 'No' : 'Yes'}}</td>
                <td>{{rent.payment.type}}</td>
                <td>{{formatCurrency(rent.total_payment)}}</td>
                <td>{{rent.additional_instructions}}</td>
                <td class="text-nowrap">
                  <b-badge class="rounded-pill" :class="rent.status == 'Paid' ? 'bg-success' : 'bg-secondary'">
                    <i class="bi bi-check2"></i> {{rent.status}} 
                  </b-badge>
                </td>
              </tr>
            </tbody>
          </table>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script>
import { mapState } from 'vuex'
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
   }
  },
  async mounted() {
    this.initialLoading = true
    document.title = 'User Dashboard'
    await this.$store.dispatch('auth/checkAuthUser')
    await this.$store.dispatch('client/getRentals')
    this.initialLoading = false
  },
  methods: {
    formatCurrency(data){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
      return formatter.format(data);
    },
  },
  computed: {
    ...mapState('client', ['rentals'])
  }
}
</script>