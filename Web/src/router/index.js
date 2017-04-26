import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/main/Main.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/content/home/Home.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/login/Login.vue'], resolve)
        },
        {
            path: '/about',
            component: resolve => require(['../components/other/About.vue'], resolve)
        },
        {
            path: '/mission',
            component: resolve => require(['../components/other/Mission.vue'], resolve)
        }
    ]
})
