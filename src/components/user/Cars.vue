<template>
 <div>
  <div class="container">
   <div class="row g-0 mt-4">
    <div class="card p-5 mb-4 mt-5">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">Cars</h5>
         <p class="mb-4"><small>Manage your cars below</small></p>
       </div>
       <div class="d-flex flex-column mt-2">
         <button v-on:click.prevent="$bvModal.show('newCarModal')" class="btn btn-primary"><i class="bi bi-plus"></i> Car</button>
       </div>
     </div>
     <div class="d-flex justify-content-end mt-2">
       <div class="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3">
         <div class="input-group mb-3">
           <input type="text" v-model="searchcar" class="form-control" id="floatingSearch" placeholder="Search here">
           <button @click.prevent="" class="btn btn-primary"><i class="bi bi-search"></i></button>
         </div>
       </div>
     </div>
     <div class="table-responsive mt-4">
      <b-skeleton-table
         v-if="initialLoading"
         :rows="4"
         :columns="6"
         :table-props="{ bordered: false, striped: false }"
       ></b-skeleton-table>
      <table v-if="!initialLoading" class="table table-hover table-striped">
        <caption>Showing {{cars.from}} to {{cars.to}} out of {{cars.total}} car records</caption>
        <thead>
          <tr >
            <th scope="col">Image</th>
            <th scope="col">For Rent</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col" class="text-nowrap" style="min-width: 200px">Description</th>
            <th scope="col" class="text-nowrap">Transmission</th>
            <th scope="col">Year</th>
            <th scope="col">Seats</th>
            <th scope="col">Branch</th>
            <th scope="col" class="text-nowrap">Is Approved</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cars.data.length == 0">
            <td colspan="11" class="text-center">
              No data found
            </td>
          </tr>
          <tr v-for="(car, i) in cars.data" :key="i">
            <td>
             <img :src="'https://be-aclc-carrental.herokuapp.com/uploads/'+ car.image" class="w-75" alt="">
            </td>
            <td>
              <b-badge class="rounded-pill" :class="car.status == 'available' ? 'bg-success' : 'bg-danger'">
                {{car.status}}
              </b-badge>
            </td>
            <td>{{car.brand.brand}}</td>
            <td class="text-nowrap">{{car.model}}</td>
            <td class="w-75">{{car.description}}</td>
            <td class="text-nowrap">{{car.transmission.type}}</td>
            <td>{{car.year}}</td>
            <td>{{car.seats}}</td>
            <td>{{car.branch.name}}</td>
            <td> <b-badge class="rounded-pill" :class="car.approval_status == 'Approved' ? 'bg-success' : 'bg-danger'">
                {{car.approval_status}}
              </b-badge></td>
            <td class="text-nowrap">
             <a v-on:click.prevent="$bvModal.show('updateCarModal'); id = car.id; carupdate = JSON.parse(JSON.stringify(car));" class="btn btn-primary btn-sm me-2" href="">Update</a>
             <a v-on:click.prevent="$bvModal.show('carRateModal'); id = car.id; carupdate = JSON.parse(JSON.stringify(car));" class="btn btn-primary btn-sm me-2" href="">Rates</a>
             <a v-on:click.prevent="id = car.id; $bvModal.show('deleteCarModal')" class="btn btn-danger btn-sm" href="">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
     </div>
     <div class="row mt-3" v-if="cars.data">
       <pagination :showDisabled="true" :align="'right'" :data="cars" @pagination-change-page="carSearch">
         <span slot="prev-nav">&laquo;</span>
         <span slot="next-nav">&raquo;</span>
       </pagination>
     </div>
    </div>
   </div>
  </div>

  <!-- CAR --->
  <b-modal id="newCarModal"  scrollable centered title="New Car">
   <div class="ps-4 pe-4">
    <label for="brand">Image</label>
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
    <label for="brand">Select Brand</label>
    <select id="brand" v-model="car.brand" class="form-select">
      <option :value="brand.id" v-for="(brand, i) in allbrands" :key="i">{{brand.brand}}</option>
    </select>
    <label for="transmission">Transmission</label>
    <select id="transmission" v-model="car.transmission_type" class="form-select">
      <option :value="trans.id" v-for="(trans, i) in transmission" :key="i">{{trans.type}}</option>
    </select>
    <label for="branch">Branch</label>
    <select id="branch" v-model="car.branch_id" class="form-select">
      <option :value="b.id" v-for="(b, i) in branch" :key="i">{{b.name}}</option>
    </select>
    <p>Car Model</p>
    <input v-model="car.model" id="carmodel" type="text" class="form-control" placeholder="" aria-label="Car">
    <p>Description</p>
    <textarea v-model="car.description" id="cardesc" type="text" class="form-control" placeholder="" aria-label="Car" row = "3"></textarea>
    <div class="row">
      <div class="col-6">
        <p>Year</p>
        <input v-model="car.year" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Year">
      </div>
      <div class="col-6">
        <p>Seats</p>
        <input v-model="car.seats" id="carseats" type="number" class="form-control" placeholder="" aria-label="Seats">
      </div>
    </div>
    <div class="row">
      <p class="mb-2 mt-2">Rates</p>
      <div class="col-6">
        <p>Per Day</p>
        <input v-model="car.per_day" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Day">
      </div>
      <div class="col-6">
        <p>Per Week</p>
        <input v-model="car.per_week" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Week">
      </div>
      <div class="col-6">
        <p>Per Month</p>
        <input v-model="car.per_month" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Month">
      </div>
      <div class="col-6">
        <p>With Driver</p>
        <input v-model="car.with_driver" id="withdriver" type="number" class="form-control" placeholder="" aria-label="With Driver Rate">
      </div>
    </div>
   </div>
   <template #modal-footer = {cancel} >
     <b-button variant="primary" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" v-on:click.prevent="saveCar" :disabled="isLoading">
       Save Car
     </b-button>
   </template>
  </b-modal>

  <!-- UPDATE CAR --->
  <b-modal id="updateCarModal"  scrollable centered title="Update Car">
   <div class="ps-5 pe-5">
    <label for="brand">New Image</label>
    <p class="text-muted"><small>Leave blank if you dont want any changes</small></p>
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
              size: 'Image should not exceed 5MB in size',
            }"
            v-model="fileRecords"
          ></VueFileAgent>
    <label for="brand" class="mt-3">Select Brand</label>
    <select id="brand" v-model="carupdate.car_brand_id" class="form-select">
      <option :value="brand.id" v-for="(brand, i) in allbrands" :key="i">{{brand.brand}}</option>
    </select>
    <label for="transmission">Transmission</label>
    <select id="transmission" v-model="carupdate.transmission_type_id" class="form-select">
      <option :value="trans.id" v-for="(trans, i) in transmission" :key="i">{{trans.type}}</option>
    </select>
    <p>Car Model</p>
    <input v-model="carupdate.model" id="carmodel" type="text" class="form-control" placeholder="" aria-label="Car">
    <p>Description</p>
    <textarea v-model="carupdate.description" id="cardesc" type="text" class="form-control" placeholder="" aria-label="Car" row = "3"></textarea>
    <div class="row">
      <div class="col-6">
        <p>Year</p>
        <input v-model="carupdate.year" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Year">
      </div>
      <div class="col-6">
        <p>Seats</p>
        <input v-model="carupdate.seats" id="carseats" type="number" class="form-control" placeholder="" aria-label="Seats">
      </div>
    </div>
    <label for="branch">Branch</label>
    <select id="branch" v-model="carupdate.branch_id" class="form-select">
      <option :value="b.id" v-for="(b, i) in branch" :key="i">{{b.name}}</option>
    </select>
    <div class="row">
      <p class="mb-2 mt-2">Rates</p>
      <div class="col-6">
        <p>Per Day</p>
        <input v-model="carupdate.rate.per_day" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Day">
      </div>
      <div class="col-6">
        <p>Per Week</p>
        <input v-model="carupdate.rate.per_week" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Week">
      </div>
      <div class="col-6">
        <p>Per Month</p>
        <input v-model="carupdate.rate.per_month" id="carmodel" type="number" class="form-control" placeholder="" aria-label="Month">
      </div>
      <div class="col-6">
        <p>With Driver</p>
        <input v-model="carupdate.rate.with_driver" id="carseats" type="number" class="form-control" placeholder="" aria-label="Seats">
      </div>
    </div>
   </div>
   <template #modal-footer = {cancel} >
     <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
     <b-button variant="success" size="sm" v-on:click.prevent="updateCar" :disabled="isLoading">
       Update Car
     </b-button>
   </template>
  </b-modal>

  <!-- CAR RATE MODAL --->
  <b-modal id="carRateModal" centered title="Car Rate">
    <p class="">Per Day: {{formatCurrency(carupdate.rate.per_day)}}</p>
    <p class="">Per Week: {{formatCurrency(carupdate.rate.per_week)}}</p>
    <p class="">Per Month: {{formatCurrency(carupdate.rate.per_month)}}</p>
    <p class="">With Driver: +{{formatCurrency(carupdate.rate.with_driver)}}</p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()"> Close </b-button>
    </template>
   </b-modal>

  <!-- DELETE CAR MODAL --->
  <b-modal id="deleteCarModal" centered title="Confirm Delete">
    <p class="">Deleting a car will also delete its record. Are you sure you want to delete this?</p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()"> Cancel </b-button>
      <b-button variant="danger" size="sm" v-on:click.prevent="deleteCar">
        Delete
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
     carbrand: {
       brand: '',
     },
     updatecarbrand: '',
     isLoading: false,
     initialLoading: false,
     searchbrand: '',
     searchcar: '',
     id: '',
     isSearching: false,
     car: {
       brand: '',
       model: '',
       branch_id: '',
       description: '',
       transmission_type: '',
       year: '',
       seats: '',
       image: '',
       per_day: '',
       per_week: '',
       per_month: '',
       with_driver: '',
     },
     fileRecords: [],
     fileRecordsForUpload: [],
     carupdate: {
       rate: {
         per_day: '',
         with_driver: '',
       }
     },
   }
  },
  async mounted(){
    this.initialLoading = true
    await this.$store.dispatch('auth/checkAuthUser')
    this.getCars()
    await this.$store.dispatch('cars/getAllCarBrands');
    await this.$store.dispatch('branch/getBranch');
    await this.$store.dispatch('cars/getTransmissions');
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
    async saveCar(){
      if (this.fileRecordsForUpload.length == 0) return this.$toast.error("An Image is required");
      if(this.car.brand == '') return this.$toast.error('Car Brand is required')
      if(this.car.model == '') return this.$toast.error('Car model is required')
      if(this.car.description == '') return this.$toast.error('Description is required')
      if(this.car.transmission_type == '') return this.$toast.error('Transmission Type is required')
      if(this.car.year == '') return this.$toast.error('Year is required')
      if(this.car.with_driver == '') return this.$toast.error('Rate for with driver is required')
      if(this.car.per_day == '') return this.$toast.error('Rate per day is required')
      if(this.car.seats == '') return this.$toast.error('Seats is required')

      const img = await this.$refs.vueFileAgent.upload(
         `https://be-aclc-carrental.herokuapp.com/api/user/uploadFeaturedImage?token=` + localStorage.getItem("auth"), 
         {'X-Requested-With' : 'XMLHttpRequest'}, this.fileRecordsForUpload
      );

      this.car.image = img[0].data

      this.isLoading = true

      const res = await this.$store.dispatch('usercars/saveCar', this.car)
      if(res.status == 200){
        this.$toast.success('Car saved successfully!');
        this.$bvModal.hide('newCarModal')
        this.fileRecordsForUpload = [];
        this.fileRecords = [];
        this.car = {
          brand: '',
          model: '',
          description: '',
          transmission_type: '',
          year: '',
          seats: '',
          image: '',
          rate: {
            per_day: '',
            with_driver: '',
          }
        },
        this.getCars()
      }
      this.isLoading = false
    },
    async updateCar(){
      if(this.carupdate.car_brand_id == '') return this.$toast.error('Car Brand is required')
      if(this.carupdate.model == '') return this.$toast.error('Car model is required')
      if(this.carupdate.description == '') return this.$toast.error('Description is required')
      if(this.carupdate.transmission_type_id == '') return this.$toast.error('Transmission Type is required')
      if(this.carupdate.year == '') return this.$toast.error('Year is required')
      if(this.carupdate.seats == '') return this.$toast.error('Seats is required')
      if(this.carupdate.rate.per_day == '') return this.$toast.error('Rate per day is required')
      if(this.carupdate.rate.with_driver == '') return this.$toast.error('Rate with driver is required')

      this.isLoading = true
      let data = {
        brand: this.carupdate.car_brand_id,
        model: this.carupdate.model,
        description: this.carupdate.description,
        transmission_type: this.carupdate.transmission_type_id,
        year: this.carupdate.year,
        seats: this.carupdate.seats,
        per_day: this.carupdate.rate.per_day,
        with_driver: this.carupdate.rate.with_driver,
        image: ''
      }

      if(this.fileRecordsForUpload.length > 0){
        const img = await this.$refs.vueFileAgent.upload(
           `https://be-aclc-carrental.herokuapp.com/api/user/uploadFeaturedImage?token=` + localStorage.getItem("auth"), 
           {'X-Requested-With' : 'XMLHttpRequest'}, this.fileRecordsForUpload
        );
  
        data.image = img[0].data
      }

      const res = await this.$store.dispatch('usercars/updateCar', {id: this.id, data: data})
      if(res.status == 200){
        this.$toast.success('Car updated successfully!');
        this.$bvModal.hide('updateCarModal')
        this.fileRecordsForUpload = [];
        this.fileRecords = [];
        this.getCars()
      }

      this.isLoading = false
    },
    async getCars(page = 1){
      await this.$store.dispatch('usercars/getCars', page)
    },
    async deleteCar(){
      const res = await this.$store.dispatch('usercars/deleteCar', this.id)
      if(res.status == 200) {
        this.$toast.success('Car deleted successfully!')
        this.$bvModal.hide('deleteCarModal')
      }
    },
    async searchCar(page = 1){
      let data = {
        search: this.searchcar
      }

      this.isSearching = true
      await this.$store.dispatch('usercars/searchCar', {data: data, page: page})
      this.isSearching = false
    },
    async carSearch(){
      if(this.searchcar == ""){
        this.getCars()
      }
      else {
        this.searchCar()
      }
    },
    async getCarBrands(page = 1){
      const res = await this.$store.dispatch('usercars/getCarBrands', page)
    },
    
    showError(data){
     for (const key of Object.keys(data)) {
       this.$toast.error(data[key][0]); 
     }
   },
  },
  computed: {
   ...mapState('usercars', ['cars', ]),
   ...mapState('cars', ['brands', 'allbrands', 'transmission']),
   ...mapState('branch', ['branch'])
  },
  watch: {
   searchbrand(before, after){
      this.brandSearch()
   },
   searchcar(before, after){
      this.carSearch()
   },
  }
}
</script>