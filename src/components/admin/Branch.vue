<template>
 <div>
  <div class="container">
   <div class="row g-0 mt-5">
    <div class="card p-5 mb-4 mt-5">
     <div class="d-flex align-items-center">
       <div class="d-flex flex-column me-auto mt-2">
         <h5 class="text-violet fw-bold">Car Rental Branch</h5>
         <p class="mb-4"><small>Manage your car rental branches below</small></p>
       </div>
       <div class="d-flex flex-column mt-2">
         <button v-on:click.prevent="$bvModal.show('addBranchModal'); data = {name: '', user_id: '', address: ''}" class="btn btn-primary border-0"> New Branch <i class="bi bi-plus"></i></button>
       </div>
     </div>
     <div class="d-flex justify-content-end mt-2">
       <div class="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-3">
         <div class="input-group mb-3">
           <input type="text" v-model="filterLogs" class="form-control" placeholder="Search here">
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
      <b-table id="branchTable" @filtered="onFiltered" :filter="filterLogs" hover :items="branch" :fields="fields" :per-page="10" :filter-included-fields="[]"  show-empty :current-page="currentPage" striped>
        <template #table-caption>Car rental branch records</template>
        <template #cell(branch_name)="row">
          <div class="text-nowrap cursor-pointer">
            {{row.item.name}}
          </div>
        </template>
        <!-- <template #cell(manager)="row">
          <div class="text-nowrap cursor-pointer">
            {{row.item.user.info.first_name}} {{row.item.user.info.last_name}}
          </div>
        </template> -->
        <template #cell(options)="row">
          <div class="text-nowrap d-block">
            <button class="btn btn-primary me-2 btn-sm  " @click.prevent="data = JSON.parse(JSON.stringify(row.item)); $bvModal.show('updateBranchModal')">Update</button>
            <button class="btn btn-danger btn-sm" @click.prevent="delete_data.id = row.item.id; $bvModal.show('deleteBranchModal')">Delete</button>
          </div>
        </template>
      </b-table>
     </div>
     <div class="d-flex justify-content-end">
      <b-pagination
        class="mt-1"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="10"
        aria-controls="branchTable"
      ></b-pagination>
    </div>
    </div>
   </div>
  </div>

  <!-- ADD BRANCH MODAL --->
  <b-modal id="addBranchModal" centered title="Add Branch">
    <div class="row pe-3 ps-3">
     <p class="text-muted">Please fill-in all the fields</p>
     <div class="mt-2">
      <label for="branchname">Branch Name</label>
      <input v-model="data.name" id="branchname" type="text" class="form-control" placeholder="" aria-label="Branch Name">
     </div>
     <div class="mt-1">
      <label for="address">Address</label>
      <textarea v-model="data.address" id="address" type="text" class="form-control" placeholder="" aria-label="Address"/>
     </div>
     <!-- <div class="mt-2">
      <label for="middlename">Manager</label>
      <select v-model="data.user_id" id="manager" type="text" class="form-select" placeholder="" aria-label="Branch Manager">
        <option :value="usr.id" v-for="(usr, i) in user" :key="i">{{usr.info.first_name}} {{usr.info.last_name}}</option>
      </select>
     </div> -->
    </div>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" @click="cancel()" :disabled="isLoading"> Cancel </b-button>
      <b-button variant="success" v-on:click.prevent="saveBranch" :disabled="isLoading">
        Save Branch
      </b-button>
    </template>
  </b-modal>

  <!-- UPDATE BRANCH MODAL --->
  <b-modal id="updateBranchModal" centered title="Update Branch">
    <div class="row pe-3 ps-3">
     <p class="text-muted">Please fill-in all the fields</p>
     <div class="mt-2">
      <label for="firstname">Branch Name</label>
      <input v-model="data.name" id="branchname" type="text" class="form-control" placeholder="" aria-label="Branch Name">
     </div>
     <div class="mt-2">
      <label for="middlename">Address</label>
      <textarea v-model="data.address" id="address" type="text" class="form-control" placeholder="" aria-label="Address" />
     </div>
     <!-- <div class="mt-2">
      <label for="middlename">Manager</label>
      <select v-model="data.user_id" id="manager" type="text" class="form-select" placeholder="" aria-label="Branch Manager">
        <option :value="usr.id" v-for="(usr, i) in user" :key="i">{{usr.info.first_name}} {{usr.info.last_name}}</option>
      </select>
     </div> -->
    </div>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" @click="cancel()" :disabled="isLoading"> Cancel </b-button>
      <b-button variant="success" v-on:click.prevent="updateBranch" :disabled="isLoading">
        Update Branch
      </b-button>
    </template>
  </b-modal>

  <!-- DELETE BRANCH MODAL --->
  <b-modal id="deleteBranchModal" centered title="Confirm Delete">
    <p class="">Are you sure you want to delete this branch? <span class="text-danger">Deleting a branch will also delete the data under it.</span></p>
    <template #modal-footer = {cancel} >
      <b-button variant="primary" size="sm" @click="cancel()" :disabled="isLoading"> Cancel </b-button>
      <b-button variant="danger" size="sm" v-on:click.prevent="deleteBranch" :disabled="isLoading">
        Delete
      </b-button>
    </template>
  </b-modal>
 </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
 data(){
  return {
    data: {
      name: '',
      address: '',
      user_id: '',
    },
    delete_data: {
      id: ''
    },
    filterLogs: null,
    currentPage: 1,
    initialLoading: false,
    totalRows: '',
    search: '',
    isLoading: false,
    fields: [
      {
        key: 'branch_name'
      }, 
      // {
      //   key: 'manager'
      // },
      {
       key: 'address'
      }, 
      {
        key: 'options'
      }
    ]
  }
 },
 async mounted(){
  this.getBranch()
 },
 computed: {
  ...mapState('branch', ['branch', 'user'])
 },
 methods: {
  onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentLogsPage = 1
  }, 
  async getBranch(){
    await this.$store.dispatch('branch/getBranch')
    this.totalRows = this.branch.length
  },
  async saveBranch(){
    this.isLoading = true

    const {status, data} = await this.$store.dispatch('branch/saveBranch', this.data)
    if(status == 200){
      this.$bvModal.hide('addBranchModal')
      this.$toast.success(data.msg)
      this.getBranch()
    } 
    else {
      this.$toast.success('Something went wrong')
    }
    this.isLoading = false
  },
  async updateBranch(){
    this.isLoading = true
    const {status, data} = await this.$store.dispatch('branch/updateBranch', this.data)
    if(status == 200){
      this.$bvModal.hide('updateBranchModal')
      this.$toast.success(data.msg)
      this.getBranch()
    } 
    else {
      this.$toast.success('Something went wrong')
    }
    this.isLoading = false
  },
  async deleteBranch(){
    this.isLoading = true

    const {status} = await this.$store.dispatch('branch/deleteBranch', this.delete_data)

    if(status == 200){
      this.$bvModal.hide('deleteBranchModal')
      this.$toast.success('Data deleted successfully!')
      this.getBranch()
    } 
    else {
      this.$toast.success('Something went wrong')
    }

    this.isLoading = false
  },
 }
}
</script>