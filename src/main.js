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

Vue.use(VueExcelXlsx);
Vue.use(resize)

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.prototype.$backendUrl = VueConfig.backendUrl

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
