import Vue from 'vue'
import axios from './http'
import store from './store/store'
import router from './router'
import App from './App.vue'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial);

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
