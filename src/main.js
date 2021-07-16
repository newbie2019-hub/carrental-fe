import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Toast from "vue-toastification";
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import "vue-toastification/dist/index.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  position: "top-right",
  hideProgressBar: true,
});
new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')
