import Vue from 'vue'
import axios from './http'
import store from './store/store'
import router from './router'
import App from './App.vue'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial);

new Vue({
    el: '#app',
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
