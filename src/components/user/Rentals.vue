<template>
 <div>
   <div class="container mt-5">
     <div class="row justify-content-center">
       <h5>Rental Records</h5>
       <p>Here are your records</p>
       <div class="card mt-4 p-5">
         <div class="d-flex justify-content-end mb-4">
           <a href="/" class="btn btn-primary rounded-pill">New Rental</a>
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
                <th scope="col" class="text-nowrap">Car Type</th>
                <th scope="col" class="text-nowrap">Pick Up Date</th>
                <th scope="col" class="text-nowrap">Drop Off Date</th>
                <th scope="col" class="text-nowrap">With Driver</th>
                <th scope="col" class="text-nowrap">Payment Type</th>
                <th scope="col" class="text-nowrap">Total Payment</th>
                <th scope="col">Additional Instructions</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rent, i) in rentals" :key="i">
                <td class="text-nowrap">{{rent.car.brand.brand}} {{rent.car.model}}</td>
                <td>{{rent.pickup_date}}</td>
                <td>{{rent.dropoff_date}}</td>
                <td>{{rent.with_driver == 0 ? 'No' : 'Yes'}}</td>
                <td>{{rent.payment.type}}</td>
                <td>{{formatCurrency(rent.total_payment)}}</td>
                <td>{{rent.additional_instructions}}</td>
                <td class="text-nowrap">{{rent.status}}</td>
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
export default {
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