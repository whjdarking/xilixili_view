import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/video/:videoID',
            name: 'showVideo',
            component: () => import(/* webpackChunkName: "about" */ './views/ShowVideo.vue')
        },
        {
            path: '/postvideo',
            name: 'postVideo',
            component: () => import(/* webpackChunkName: "about" */ './views/PostVideo.vue')
        },
        {
            path: '/userlogin',
            name: 'userLogin',
            component: () => import(/* webpackChunkName: "about" */ './views/UserLogin.vue')
        }
    ]
})
