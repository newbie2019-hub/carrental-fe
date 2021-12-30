<template>
  <div class="home">
    <nav :class="scrollpx >= 200 ? 'scrolled' : ''">
      <div>
        <h5 class="company">Car Rental</h5>
      </div>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#cars">Cars</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
        <li v-if="user == '' || user.info.first_name == ''">
          <router-link to="/login">Sign-in</router-link>
        </li>
        <li v-else>
          <router-link to="/user/rentals">Account</router-link>
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

    <div id="services" class="container mb-5 pt-5">
      <div class="row justify-content-center text-center mt-5">
        <h3>Choose Us</h3>
        <p>We've got the best services for you</p>
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col-10 col-sm-10 col-md-4 col-lg-3 col-xl-3 mt-2">
          <div class="card p-3">
            <div class="card-img">
              <i class="bi bi-gem"></i>
            </div>
            <h5 class="text-center">Services</h5>
            <p class="p-3 text-center">We make sure to offer our 100% customer satisfaction</p>
          </div>
        </div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-3 col-xl-3 mt-2">
          <div class="card p-3">
            <div class="card-img">
              <i class="bi bi-calendar2-check"></i>
            </div>
            <h5 class="text-center">Reservation</h5>
            <p class="p-3 text-center">Select from our wide-variety of cars and reserve now!</p>
          </div>
        </div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-3 col-xl-3 mt-2">
          <div class="card p-3">
            <div class="card-img">
              <i class="bi bi-question-circle"></i>
            </div>
            <h5 class="text-center">Inquiries</h5>
            <p class="p-3 text-center">Feel free to contact us and we’ll assist you immediately!</p>
          </div>
        </div>
        <div class="col-10 col-sm-10 col-md-4 col-lg-3 col-xl-3 mt-2">
          <div class="card p-3">
            <div class="card-img">
              <i class="bi bi-cash-coin"></i>
            </div>
            <h5 class="text-center">Budget-Friendly</h5>
            <p class="p-3 text-center">We've got the best selection of cars for the most affordable price</p>
          </div>
        </div>
      </div>
    </div>

    <div id="cars" class="container pb-5 pt-5">
      <div class="row justify-content-center text-center">
        <h3>Our Cars</h3>
        <p>We've got the best services for you</p>
      </div>
      <div class="d-flex justify-content-end mt-5">
        <div class="col-10 col-sm-9 col-md-5 col-lg-3">
          <label for="branch">Filter Branch</label>
          <select id="branch" v-model="branch_selected" class="form-select">
            <option value="All Branch">All Branch</option>
            <option :value="b.id" v-for="(b, i) in branch" :key="i">{{b.name}}</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-center align-items-stretch mt-5">
        <div v-if="homecars.length == 0">
          <h6 class="text-center mt-5 mb-5">It appears that there are no available cars for rental. <br/>Sorry for the inconvenience :(</h6>
        </div>
        <div class="col-10 col-sm-10 col-md-6 col-lg-5 col-xl-4 mt-2 " v-for="(car, i) in filteredBranch" :key="i">
          <div class="card h-100 p-3">
             <img :src="'https://be-aclc-carrental.herokuapp.com/uploads/' + car.image" class="card-img-top" alt="Car Image">
             <div class="card-body mt-3">
               <h5 class="card-title">{{car.brand.brand}} {{car.model}}</h5>
               <p class="text-muted">{{car.branch.name}}</p>
               <p class="text-muted">Owned by: {{car.owner ? car.owner.info.first_name + ' ' + car.owner.info.last_name : 'Management'}}</p>
               <p class="mt-3">Transmission: {{car.transmission.type}}</p>
               <p>Year Released: {{car.year}}</p>
               <p>Seating Capacity: {{car.seats}}</p>
               <p class="mt-3 mb-3 fw-bold">Rates</p>
               <p class="">With Driver: + {{formatCurrency(car.rate.with_driver)}}</p>
               <p class="">Rate per day: {{formatCurrency(car.rate.per_day)}}</p>
               <p class="">Rate per week: {{formatCurrency(car.rate.per_week)}}</p>
               <p class="">Rate per month: {{formatCurrency(car.rate.per_month)}}</p>
               <p class="card-text mt-4">{{car.description}}</p>
               <a href="#" class="btn btn-primary mt-3" v-on:click.prevent="selectedcar = car; reserve()">Reserve</a>
            </div>
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
            <h6 class="mt-2">Contact or Email</h6>
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
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
      branch_selected: 'All Branch',
      initialLoading: false,
      isLoading: false,
      selectedcar: ''
    }
  },
  components: {
    
  },
  methods: {
    handleScroll() {
      this.scrollpx = window.scrollY;
    },
    async reserve(){
      if(this.user == '' || this.user.info.first_name == ''){
        this.$toast.success('Please login or register an account first')
        this.$router.push('/login')
        this.$store.commit('cars/SET_SELECTED_CAR', this.selectedcar)
      }
      else {
        this.$store.commit('cars/SET_SELECTED_CAR', this.selectedcar)
        this.$router.push('/reservation#reservation')
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
    document.title = "Car Rental"
    await this.$store.dispatch('branch/getBranch')
    await this.$store.dispatch('auth/checkAuthUser')
    await this.$store.dispatch('cars/getHomeCars')
    this.initialLoading = false
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
   ...mapState('cars', ['homecars']),
   ...mapState('auth', ['user']),
   ...mapState('branch', ['branch']),

   filteredBranch(){
      if(this.branch_selected != 'All Branch'){
        return this.homecars.filter((car)=> {
          return (car.branch_id == this.branch_selected)
        })
      }
      else {
        return this.homecars
      }
    }
  },
  watch: {
    
  }
}
</script>
