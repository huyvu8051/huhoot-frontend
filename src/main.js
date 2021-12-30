// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'

import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import EventBus from "@/EventBus"
import VueConfig from "@/vue.config"
import resize from "vue-element-resize-detector";
import VueExcelXlsx from "vue-excel-xlsx";


// sweet
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);


Vue.use(VueExcelXlsx);
Vue.use(resize)

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.prototype.$backendUrl = VueConfig.backendUrl
Vue.prototype.$socketUrl = VueConfig.socketUrl

Vue.use(Vuelidate)
Vue.prototype.$eventBus = EventBus;

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
