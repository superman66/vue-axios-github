/**
 * Created by superman on 17/2/16.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import * as types from './store/types'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '/',
        component(resolve){
            require.ensure(['./index.vue'], () => {
                resolve(require('./index.vue'))
            })
        }
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,
        },
        component(resolve){
            require.ensure(['./repository.vue'], () => {
                resolve(require('./repository.vue'))
            })
        }
    },
    {
        path: '/login',
        name: 'login',
        component(resolve){
            require.ensure(['./login.vue'], () => {
                resolve(require('./login.vue'))
            })
        }
    }
];


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;