<template>
 <div>
   <div class="container mt-5">
     <div class="row g-0 justify-content-center">
       <div class="card mt-5 p-5 mb-5">
       <h5>Rentals</h5>
       <p>Here are your rental records</p>
         <div class="d-flex justify-content-end mb-4">
           <router-link to="/" class="btn btn-primary">New Rental</router-link>
         </div>
         <div class="d-flex justify-content-end mt-2">
          <div class="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3">
            <div class="input-group mb-3">
              <input  type="search" v-model="search" class="form-control" id="floatingSearch" placeholder="Search here">
              <button @click.prevent="" class="btn btn-primary"><i class="bi bi-search"></i></button>
            </div>
          </div>
         </div>
         <div class="table-responsive">
          <b-table :busy="initialLoading" striped hover :items="rentals" :fields="fields" :filter="search" :current-page="currentPage" :per-page="perPage" :filter-included-fields="[]" show-empty>
            <template #cell(rental_status)="data">
              <b-badge class="rounded-pill" :class="data.item.rental_status == 'on-going' ? 'bg-primary' : 'bg-success'">
                {{data.item.rental_status}}
              </b-badge>
            </template>
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(pickup_date)="data">
              {{data.item.pickup_date | moment}}
            </template>
            <template #cell(dropoff_date)="data">
              {{data.item.dropoff_date | moment}}
            </template>
            <template #cell(with_driver)="data">
              {{data.item.with_driver ? 'Yes' : 'No'}}
            </template>
            <template #cell(total_payment)="data">
              {{formatCurrency(data.item.total_payment)}}
            </template>
            <template #cell(rent_status)="data">
              <b-badge class="rounded-pill" :class="data.item.status == 'Paid' ? 'bg-success' : 'bg-secondary'">
                    <i class="bi bi-check2"></i> {{data.item.status}} 
                  </b-badge>
            </template>
          </b-table>
          <!-- <table class="table table-hover" v-if="!initialLoading">
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
          </table> -->
         </div>
         <div class="row">
           <b-pagination
              v-model="currentPage"
              :total-rows="rentals.length"
              :per-page="perPage"
              align="end"
              class="my-0"
            ></b-pagination>
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
     search: null,
     isLoading: false,
     currentPage: 1,
     perPage: 10,
     initialLoading: false,
     fields: [
       {
         key: 'rental_status',
         label: 'Rental Status',
         class: 'text-nowrap'
       },
       {
         key: 'car.brand.brand',
         label: 'Car Type',
         class: 'text-nowrap'
       },
       {
         key: 'pickup_date',
         class: 'text-nowrap',
         label: 'Pick Up Date'
       },
       {
         key: 'dropoff_date',
         label: 'Return Date',
         class: 'text-nowrap'
       },
       {
         key: 'with_driver',
         label: 'With Driver',
         class: 'text-nowrap'
       },
       {
         key: 'payment.type',
         label: 'Payment Type',
         class: 'text-nowrap'
       },
       {
         key: 'total_payment',
         label: 'Total Payment',
         class: 'text-nowrap'
       },
       {
         key: 'additional_instructions',
         label: 'Additional Instruction',
         class: 'text-nowrap'
       },
       {
         key: 'rent_status',
         label: 'Status'
       }
     ]
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