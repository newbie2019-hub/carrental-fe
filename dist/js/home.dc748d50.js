(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{7702:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Sidenav"),a("Navbar"),a("div",{staticClass:"content-container"},[a("router-view",{attrs:{name:"adminDashboard"}}),a("router-view",{attrs:{name:"cars"}}),a("router-view",{attrs:{name:"clients"}}),a("router-view",{attrs:{name:"branch"}}),a("router-view",{attrs:{name:"inquiries"}}),a("router-view",{attrs:{name:"adminRentals"}})],1)],1)},r=[],n=a("1da1"),i=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sidenav",attrs:{id:"sidenav"}},[a("p",{staticClass:"mt-5 mb-4 text-white text-center fw-bolder"},[e._v("MANAGEMENT")]),a("router-link",{attrs:{to:"/admin/dashboard"}},[a("i",{staticClass:"bi bi-bookmarks"}),e._v(" Dashboard")]),a("router-link",{attrs:{to:"/admin/clients"}},[a("i",{staticClass:"bi bi-people"}),e._v(" Clients")]),a("router-link",{attrs:{to:"/admin/branch"}},[a("i",{staticClass:"bi bi-diagram-2"}),e._v("Branch")]),a("router-link",{attrs:{to:"/admin/cars"}},[a("i",{staticClass:"bi bi-plus-circle"}),e._v("Cars")]),a("router-link",{attrs:{to:"/admin/rentals"}},[a("i",{staticClass:"bi bi-calendar-plus"}),e._v(" Rentals")]),a("router-link",{attrs:{to:"/admin/inquiries"}},[a("i",{staticClass:"bi bi-question-circle"}),e._v(" Queries")]),a("a",{attrs:{href:""},on:{click:function(t){t.preventDefault(),e.setValues(),e.$bvModal.show("settingsModal")}}},[a("i",{staticClass:"bi bi-tools"}),e._v(" Settings")]),a("a",{attrs:{href:""},on:{click:function(t){return t.preventDefault(),e.$bvModal.show("logoutModal")}}},[a("i",{staticClass:"bi bi-x-circle"}),e._v(" Log-out")]),a("b-modal",{attrs:{id:"logoutModal",centered:"",title:"Logout"},scopedSlots:e._u([{key:"modal-footer",fn:function(t){var s=t.cancel;return[a("b-button",{attrs:{variant:"primary",size:"sm"},on:{click:function(e){return s()}}},[e._v(" Cancel ")]),a("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(t){return t.preventDefault(),e.logout.apply(null,arguments)}}},[e._v(" Logout ")])]}}])},[a("p",{},[e._v("Are you sure you want to log-out?")])]),a("b-modal",{attrs:{id:"settingsModal",centered:"",title:"Account Settings"},scopedSlots:e._u([{key:"modal-footer",fn:function(t){var s=t.cancel;return[a("b-button",{attrs:{variant:"primary",size:"sm",disabled:e.isLoading},on:{click:function(e){return s()}}},[e._v(" Cancel ")]),a("b-button",{attrs:{variant:"success",size:"sm",disabled:e.isLoading},on:{click:function(t){return t.preventDefault(),e.updateAccount.apply(null,arguments)}}},[e._v(" Update ")])]}}])},[a("div",{staticClass:"row pe-4 ps-4 pt-2 pb-2"},[a("div",{staticClass:"col"},[a("label",{attrs:{for:"item"}},[e._v("Profile Image")]),a("VueFileAgent",{ref:"vueFileAgent",attrs:{multiple:!1,maxSize:"3MB",deletable:!0,accept:"image/*,",theme:"list",errorText:{type:"Invalid file type. Only image file is allowed",size:"Image should not exceed 3MB in size"}},on:{select:function(t){return e.filesSelected(t)},beforedelete:function(t){return e.onBeforeDelete(t)},delete:function(t){return e.fileDeleted(t)}},model:{value:e.fileRecords,callback:function(t){e.fileRecords=t},expression:"fileRecords"}}),a("label",{staticClass:"d-block"},[a("small",{staticClass:"text-muted"},[e._v("This will replace your existing image if you have")])]),a("label",{attrs:{for:"item"}},[e._v("First Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.first_name,expression:"data.first_name"}],staticClass:"form-control",attrs:{id:"item",type:"text",placeholder:"","aria-label":"First Name"},domProps:{value:e.data.first_name},on:{input:function(t){t.target.composing||e.$set(e.data,"first_name",t.target.value)}}}),a("label",{attrs:{for:"remarks"}},[e._v("Middle Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.middle_name,expression:"data.middle_name"}],staticClass:"form-control",attrs:{id:"remarks",type:"text",placeholder:"","aria-label":"Middle Name"},domProps:{value:e.data.middle_name},on:{input:function(t){t.target.composing||e.$set(e.data,"middle_name",t.target.value)}}}),a("label",{attrs:{for:"remarks"}},[e._v("Last Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.last_name,expression:"data.last_name"}],staticClass:"form-control",attrs:{id:"remarks",type:"text",placeholder:"","aria-label":"Last Name"},domProps:{value:e.data.last_name},on:{input:function(t){t.target.composing||e.$set(e.data,"last_name",t.target.value)}}}),a("label",{attrs:{for:"gender"}},[e._v("Select Gender")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.data.gender,expression:"data.gender"}],staticClass:"form-select",attrs:{id:"gender"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.data,"gender",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"",disabled:"",selected:""}},[e._v("Select Gender")]),a("option",{attrs:{value:"Male"}},[e._v("Male")]),a("option",{attrs:{value:"Female"}},[e._v("Female")])]),a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.email,expression:"data.email"}],staticClass:"form-control",attrs:{id:"email",type:"text",placeholder:"","aria-label":"Email"},domProps:{value:e.data.email},on:{input:function(t){t.target.composing||e.$set(e.data,"email",t.target.value)}}}),a("label",{attrs:{for:"password"}},[e._v("Password ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.data.password,expression:"data.password"}],staticClass:"form-control",attrs:{id:"password",type:"password",placeholder:"","aria-label":"Password"},domProps:{value:e.data.password},on:{input:function(t){t.target.composing||e.$set(e.data,"password",t.target.value)}}}),a("label",{staticClass:"text-muted"},[a("small",[e._v("Leave empty if you dont want to make changes")])])],1)])]),a("div",{staticClass:"closenav",attrs:{id:"closenav"},on:{click:function(t){return t.preventDefault(),e.toggleSideNav.apply(null,arguments)}}},[a("p",[e._v("X")])])],1)}),o=[],l=a("5530"),c=(a("4de4"),a("99af"),a("a434"),a("c1df")),d=a.n(c),u=a("2f62"),m={data:function(){return{data:{id:"",first_name:"",middle_name:"",last_name:"",gender:"",email:"",password:""},fileRecordsForUpload:[],fileRecords:[],isLoading:!1}},filters:{moment:function(e){return d()(e).format("MMMM DD, YYYY")}},mounted:function(){this.setValues()},methods:Object(l["a"])(Object(l["a"])({},Object(u["b"])("auth",["logoutAdminUser"])),{},{filesSelected:function(e){var t=e.filter((function(e){return!e.error}));this.fileRecordsForUpload=this.fileRecordsForUpload.concat(t)},fileDeleted:function(e){var t=this.fileRecordsForUpload.indexOf(e);-1!==t&&this.fileRecordsForUpload.splice(t,1)},onBeforeDelete:function(e){var t=this.fileRecordsForUpload.indexOf(e);if(-1!==t){this.fileRecordsForUpload.splice(t,1);var a=this.fileRecords.indexOf(e);-1!==a&&this.fileRecords.splice(a,1)}},toggleSideNav:function(){var e=document.getElementById("sidenav");e.classList.toggle("toggleNav")},logout:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.logoutAdminUser();case 2:a=t.sent,200==a.status&&e.$router.push("/");case 4:case"end":return t.stop()}}),t)})))()},setValues:function(){this.data.id=this.user.id,this.data.first_name=this.user.info.first_name,this.data.middle_name=this.user.info.middle_name,this.data.last_name=this.user.info.last_name,this.data.gender=this.user.info.gender,this.data.email=this.user.email},updateAccount:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.fileRecordsForUpload.length>0)){t.next=5;break}return t.next=3,e.$refs.vueFileAgent.upload("https://be-aclc-carrental.herokuapp.com/api/admin/uploadFeaturedImage?token="+localStorage.getItem("auth"),{"X-Requested-With":"XMLHttpRequest"},e.fileRecordsForUpload);case 3:a=t.sent,e.data.img=a[0].data;case 5:return t.next=7,e.$store.dispatch("auth/updateAdminAccount",e.data);case 7:if(s=t.sent,200!=s.status){t.next=13;break}return t.next=11,e.$store.dispatch("auth/checkAdminUser");case 11:e.$bvModal.hide("settingsModal"),e.$toast.success("Account Info updated successfully!");case 13:case"end":return t.stop()}}),t)})))()}}),computed:Object(l["a"])(Object(l["a"])({},Object(u["c"])("auth",["user"])),{},{getRoute:function(){return this.$route.path}})},f=m,p=a("2877"),v=Object(p["a"])(f,i,o,!1,null,null,null),b=v.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.user.info?a("div",{staticClass:"navigation"},[a("div",{staticClass:"d-flex w-100 justify-content-between"},[a("div",{staticClass:"d-flex align-items-center"},[e.user.info?a("avatar",{staticClass:"ms-4",attrs:{username:e.user.info.first_name+" "+e.user.info.last_name,rounded:!0,size:40,color:"#fff",lighten:100}}):e._e(),a("div",{staticClass:"d-flex flex-column lh-0"},[e.user?a("p",{staticClass:"text-dark username"},[e._v("Welcome, "+e._s(e.user.info.first_name)+" "+e._s(e.user.info.last_name)+"!")]):e._e(),e.user?a("p",{staticClass:"text-muted username mt-2"},[a("small",[e._v(e._s(e.user.email))])]):e._e()])],1),a("div",[a("button",{staticClass:"btn btn-toggle",attrs:{id:"btn-toggle"},on:{click:function(t){return t.preventDefault(),e.toggleSideNav.apply(null,arguments)}}},[a("i",{staticClass:"bi bi-list bi-2x"})])])])]):e._e()])},h=[],_=a("4a89"),w=a.n(_),x={components:{Avatar:w.a},mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.checkAdminUser();case 2:case"end":return t.stop()}}),t)})))()},computed:Object(l["a"])({},Object(u["c"])("auth",["user"])),methods:Object(l["a"])(Object(l["a"])({},Object(u["b"])("auth",["checkAdminUser"])),{},{toggleSideNav:function(){var e=document.getElementById("sidenav");e.classList.toggle("toggleNav")}})},k=x,C=Object(p["a"])(k,g,h,!1,null,null,null),y=C.exports,R={mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return document.title="Admin Dashboard",t.next=3,e.$store.dispatch("auth/checkAdminUser");case 3:case"end":return t.stop()}}),t)})))()},components:{Sidenav:b,Navbar:y}},N=R,O=Object(p["a"])(N,s,r,!1,null,null,null);t["default"]=O.exports}}]);
//# sourceMappingURL=home.dc748d50.js.map