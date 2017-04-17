import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dashboard',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/example/Readme.vue'], resolve)
                },
                {
                    path: 'userlist',
                    component: resolve => require(['../components/user/UserList.vue'], resolve)
                },
                {
                    path: 'sortlist',
                    component: resolve => require(['../components/sort/SortList.vue'], resolve)
                },
                {
                    path: 'postlist',
                    component: resolve => require(['../components/post/Postlist.vue'], resolve)
                },
                {
                    path: 'commentlist',
                    component: resolve => require(['../components/comment/Commentlist.vue'], resolve)
                }
            ]
        },
        {
            path: '/example',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: 'basetable',
                    component: resolve => require(['../components/example/BaseTable.vue'], resolve)
                },
                {
                    path: 'vuetable',
                    component: resolve => require(['../components/example/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: 'baseform',
                    component: resolve => require(['../components/example/BaseForm.vue'], resolve)
                },
                {
                    path: 'vueeditor',
                    component: resolve => require(['../components/example/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: 'markdown',
                    component: resolve => require(['../components/example/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: 'upload',
                    component: resolve => require(['../components/example/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: 'basecharts',
                    component: resolve => require(['../components/example/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: 'mixcharts',
                    component: resolve => require(['../components/example/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/login/Login.vue'], resolve)
        },
    ]
})
