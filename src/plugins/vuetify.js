import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuetify, {
    iconfont: 'md'
})

export default new Vuetify({
    theme: { dark: false },
})