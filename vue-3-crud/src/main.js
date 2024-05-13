import { createApp } from 'vue'
import App from './App.vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'
// Vue.use(BootstrapVue)
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


createApp(App).component('Datepicker', Datepicker).use(router).mount('#app')
 