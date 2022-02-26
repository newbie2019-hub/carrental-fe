<template>
  <div class="home">
    <nav :class="scrollpx >= 200 ? 'scrolled' : ''">
      <div>
        <h5 class="company">Car Rental</h5>
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <router-link to="/#cars">Cars</router-link>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
        <li v-if="user == '' || user.info.first_name == ''">
          <router-link to="/login">Sign-in</router-link>
        </li>
        <li v-else>
          <router-link to="/user/dashboard">Account</router-link>
        </li>
      </ul>
    </nav>
    <div class="container" style="height: 100vh">
      <div class="d-flex flex-column h-100 align-items-center justify-content-center">
        <h1 class="w-75 heading text-white text-center">Roads were made for journeys, not destinations</h1>
        <p class="text-white mt-3 mb-3">your Budget-Friendly Car Rental</p>
        <button class="btn btn-primary rounded-pill mt-5">Learn More</button>
      </div>
      <div class="credit">
        <img src="@/assets/images/credit_card.png" alt="">
        <p>Credit Card Payments Accepted</p>
      </div>
    </div>

    <div id="reservation" class="container pb-5 pt-5">
      <div class="row justify-content-center text-center">
        <h3>Car Rental</h3>
        <p>Please read carefully the terms and conditions</p>
      </div>
      <div class="row justify-content-center mt-5">
       <div class="col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6">
        <div class="ps-5 pe-5 pt-5 pb-5">
         <h5 class="fw-bold">Car Use Policy</h5>
         <p class="mt-4">The vehicle should be used only within Region VIII and shall not be used for any illegal purposes.</p>
         <p class="mt-3">The vehicle will have a full tank and should be returned in full tank as well.</p>
         <h5 class="mt-5 fw-bold">Self-drive Requirements</h5>
         <p class="mt-4">1. Driver's License</p>
         <p class="">2. Valid Government Issued ID (Philippine Resident), Passport (Foreign Resident), National ID.</p>
         <p class="">3. PHP 5,000 Security Deposit. You will provide this when you get the car. This will be given back to you in full upon returning the car and there are no damages.</p>
        </div>
       </div>
       <div class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-4 mt-2 ">
         <div class="card  p-3">
            <img :src="'https://be-aclc-carrental.herokuapp.com/uploads/' + selectedcar.image" class="card-img-top" alt="...">
            <div class="card-body mt-3">
              <h5 class="card-title">{{selectedcar.brand.brand}} {{selectedcar.model}}</h5>
              <p class="mt-3">Transmission: {{selectedcar.transmission.type}}</p>
              <p>Year Released: {{selectedcar.year}}</p>
              <p>Seating Capacity: {{selectedcar.seats}}</p>
              <p class="card-text mt-4">{{selectedcar.description}}</p>
              <p class="mt-3 mb-3 fw-bold">Rate</p>
              <p class="">Rate per Day: {{formatCurrency(selectedcar.rate.per_day)}}</p>
              <p class="">Rate per Week: {{formatCurrency(selectedcar.rate.per_week)}}</p>
              <p class="">Rate per Month: {{formatCurrency(selectedcar.rate.per_month)}}</p>
              <p class="mt-3">With Driver: {{formatCurrency(selectedcar.rate.with_driver)}}</p>
              <router-link to="/#cars" class="btn btn-primary mt-3">Change</router-link>
           </div>
         </div>
       </div>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-11 col-sm-11 col-md-8 col-lg-7 col-xl-5 mt-5">
         <div class="card p-5">
          <h3 class="text-center">Rental Form</h3>
          <p class="text-center mb-4">All fields are required</p>
          <p>Pick-Up Date</p>
          <date-picker @change="dateDifference" :confirm="true" v-model="date.pickup" class="w-100" :disabled-date="disabledBeforeToday" value-type="format" :format="'YYYY-MM-DD'" type="date"></date-picker>
          <p class="mt-2">Return Date</p>
          <date-picker @change="dateDifference" :confirm="true" v-model="date.dropoff" class="w-100"  :disabled-date="disabledBeforeToday" value-type="format" :format="'YYYY-MM-DD'" type="date"></date-picker>
          <p class="mt-2">Payment Type</p>
          <select class="form-select" v-model="card.payment_type">
           <option :value="type.id" v-for="(type, i) in paymenttypes" :key="i">{{type.type}}</option>
          </select>
          <p class="mt-2">Additional Instruction</p>
          <textarea v-model="card.additionalinstruction" row="3" class="form-control"></textarea>
          <div class="form-check" >
            <input v-model="withdriver" class="form-check-input" type="checkbox" value="" id="withdriver">
            <label class="form-check-label" for="withdriver">
              With Driver
            </label>
          </div>
          <div v-if="card.payment_type == 1">
           <h6 class="mt-4">Credit card payment</h6>
           <p class="mt-2">Name on card</p>
           <input v-model="card.name" class="form-control">
           <p class="">Card Number</p>
           <input v-model="card.number" class="form-control" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx">
           <div class="row mt-2">
            <div class="col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">
             <p>CVC</p>
             <input v-model="card.cvc" class="form-control" inputmode="numeric" type="text" pattern="[0-9\s]" placeholder="e.g 425" maxlength="3">
            </div>
            <div class="col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">
             <p>Exp Month</p>
             <input v-model="card.exp_month" class="form-control" type="number" placeholder="MM">
            </div>
            <div class="col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">
             <p>Exp Year</p>
             <input v-model="card.exp_year" class="form-control" type="number" placeholder="YYYY">
            </div>
           </div>
          </div>
          <p class="mt-3">Total Payment: {{formatCurrency(total)}}</p>
           <a type="button" href="" class="text-decoration-none" @click.prevent="$bvModal.show('viewReservationModal')">View Rental Info</a>
           <button class="btn btn-primary mt-3" v-on:click.prevent="reserve" :disabled="isLoading">Proceed</button>
         </div>
        </div>
      </div>
    </div>

    <div id="contact" class="container pt-5">
      <div class="row justify-content-center text-center mb-5">
        <h3>Got Questions?</h3>
        <p>Send us a message and we'll reply to it immediately</p>
      </div>
      <div class="row justify-content-center ">
        <div class="col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6 mt-2 p-4">
          <h4>Contact Us</h4>
          <p class="mt-3">If you got any questions, please do not hesitate to send us a message. We reply within 24 hours!</p>
          <h4 class="mt-5">Email</h4>
          <p class="mt-2">emailaddress@gmail.com</p>
        </div>
        <div class="col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6 mt-2 p-4">
          <div class="pe-3 ps-3">
            <h6>Full Name</h6>
            <input v-model="data.name" class="form-control mt-2">
            <h6 class="mt-2">Contact/Email</h6>
            <input v-model="data.email" class="form-control mt-2">
            <h6 class="mt-2">Message</h6>
            <textarea v-model="data.message" class="form-control mt-2" row="4"></textarea>
            <button class="btn btn-primary mt-4" v-on:click.prevent="sendMessage" :disabled="isLoading">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>© 2021 Car Rental</p>
    </div>

    <!-- VIEW RESERVATION INFO -->
    <b-modal id="viewReservationModal" centered title="Reservation Info">
      <h6 class="fw-bold mb-2">Car Info</h6>
      <p>Car Model: {{selectedcar.model}}</p>
      <p>Description: {{selectedcar.description}}</p>
      <p>Branch: {{selectedcar.branch.name}}</p>
      <h6 class="fw-bold mb-2 mt-2">Car Rate</h6>
      <p>Per day: {{formatCurrency(selectedcar.rate.per_day)}}</p>
      <p>Per week: {{formatCurrency(selectedcar.rate.per_week)}}</p>
      <p>Per month: {{formatCurrency(selectedcar.rate.per_month)}}</p>
      <h6 class="fw-bold mb-2 mt-2">Rental Info</h6>
      <p>Total Days: {{totalDays}}</p>
      <p>Total Payment: {{formatCurrency(total)}}</p>
      <template #modal-footer = {cancel} >
        <b-button variant="primary" size="sm" @click="cancel()" :disabled="isLoading"> Close </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment'
export default {
  name: 'Home',
  data(){
    return {
      scrollpx: 0,
      data: {
        email: '',
        name: '',
        message: '',
      },
      date: {
       pickup: '',
       dropoff:'',
      },
      initialLoading: false,
      isLoading: false,
      card: {
       name: '',
       additionalinstruction: '',
       cvc: '',
       number:'',
       exp_month: '',
       exp_year: '',
       payment_type: '',
      },
      withdriver: false,
      total: 0,
      totalDays: 0,
    }
  },
  components: {
    DatePicker
  },
  methods: {
    handleScroll() {
      this.scrollpx = window.scrollY;
    },
    async reserve(){
      let data = {
       name: this.card.name,
       number: this.card.number,
       cvc: this.card.cvc,
       exp_month: this.card.exp_month,
       exp_year: this.card.exp_year,
       pickup: this.date.pickup,
       dropoff: this.date.dropoff,
       user_id: this.user.id,
       payment_type: this.card.payment_type,
       additionalinstruction: this.card.additionalinstruction,
       payment_fee: this.total,
       with_driver: this.withdriver,
       car_id: this.selectedcar.id
      }
      if(this.date.pickup == '' || this.date.pickup == null) return this.$toast.error('Pick up date is required')
      if(this.date.dropoff == '' || this.date.dropoff == null) return this.$toast.error('Drop off date is required')
      if(this.card.payment_type == 1){
        if(this.card.name == '') return this.$toast.error('Card name is required')
        if(this.card.number == '') return this.$toast.error('Card number is required')
        if(this.card.cvc == '') return this.$toast.error('CVC is required')
        if(this.card.exp_month == '') return this.$toast.error('Expiration Month is required')
        if(this.card.exp_year == '') return this.$toast.error('Expiration Year is required')
        this.isLoading = true

        const res = await this.$store.dispatch('client/payRental', data)
        if(res.status == 200){
         this.$toast.success('Payment successful')
         window.open(res.data.res.receipt_url, '_blank')
         this.$router.push('/')
         setTimeout(() => {
           this.$toast.success('You can check your transactions on your account')
         }, 2500)
        }
        else {
         console.log(res.data.msg)
         this.$toast.error(res.data.msg);
        }
        this.isLoading = false

      }
      else {
        this.isLoading = true

        const res = await this.$store.dispatch('client/payRental', data)
        if(res.status == 200){
         this.$toast.success('Rental successful\nPlease proceed to the branch for the payment')
         this.$router.push('/')
        }
        else {
         this.$toast.error('Something went wrong');
        }
        this.isLoading = false
      }
      this.isLoading = false
    },
    disabledBeforeToday(date){
      let d = new Date()
      d.setDate(d.getDate() + 1)
      return date < new Date(d.setHours(0, 0, 0, 0));
    },
    dateDifference(){
      var start = moment(this.date.pickup, "YYYY-MM-DD");
      var end = moment(this.date.dropoff, "YYYY-MM-DD");

      //GET DAYS 
      const days = moment.duration(end.diff(start)).asDays()
      this.totalDays = days

      if(this.date.pickup != '' && this.date.dropoff != ''){
       if(days >= 30){
         this.total = parseFloat(this.total) + parseFloat(this.selectedcar.rate.per_month * (days / 30).toFixed(0))
         console.log(`Initial total for a month: ${this.total}\nDays remaining: ${days % 30}`)
         if((days % 30) >= 7){
          this.total = parseFloat(this.total) + parseFloat(this.selectedcar.rate.per_week * ((days % 30) / 7).toFixed(0))
          console.log(`Initial total for a week: ${this.total}`)
          this.total = parseFloat(this.total) + parseFloat(((days % 30) % 7) * this.selectedcar.rate.per_day)
          console.log(`Total for the remaining days: ${this.total}`)
         }
         else {
           console.log('Hi')
          this.total = parseFloat(this.total) + ((days % 30) * this.selectedcar.rate.per_day)
         }
       }
       else if(days >= 7 && days <= 30){
         this.total = (this.selectedcar.rate.per_week * (days / 7).toFixed(0))
         this.total = parseFloat(this.total) + ((days % 7) * this.selectedcar.rate.per_day)
       }
       else {
         this.total = parseFloat(this.selectedcar.rate.per_day * days)
       }
      }
    },
    async sendMessage() {
      if(this.data.name == '') return this.$toast.error('Name is required')
      if(this.data.email == '') return this.$toast.error('Email is required')
      if(this.data.message == '') return this.$toast.error('Message is required')
      this.isLoading = true
      const res = await this.$store.dispatch('client/sendMessage', this.data)
      if(res.status == 200){
        this.$toast.success('Message sent successfully!')
        this.data.message = ''
        this.data.name = ''
        this.data.email = ''
      }
      this.isLoading = false
    },
    formatCurrency(data){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
      return formatter.format(data);
    },
  },
  async mounted() {
    this.initialLoading = true
    document.title = "ACLC Car Rental"
    await this.$store.dispatch('auth/checkAuthUser')
    await this.$store.dispatch('cars/getHomeCars')
    await this.$store.dispatch('client/getPaymentTypes')
    this.total = this.selectedcar.rate.per_day
    this.initialLoading = false
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    if(this.selectedcar == '') {
      this.$router.push('/')
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
   ...mapState('cars', ['homecars', 'selectedcar']),
   ...mapState('auth', ['user']),
   ...mapState('client', ['paymenttypes']),
  },
  watch: {
   withdriver(before, after){
    if(this.withdriver){
     this.total = (parseFloat(this.total) + parseFloat(this.selectedcar.rate.with_driver))
    }
    else {
     this.total = (parseFloat(this.total) - parseFloat(this.selectedcar.rate.with_driver))
    }
   },

  }
}
</script>
<style>
.mx-time-column .mx-time-list {
  display: flex;
  flex-direction: column;
}
</style>
