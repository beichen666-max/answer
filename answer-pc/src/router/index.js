import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/album',
        name: 'Album',
        component: () =>
            import ('../views/Album.vue')
    },
    {
        path: '/chooseIdentity',
        name: 'ChooseIdentity',
        component: () =>
            import ('../views/ChooseIdentity.vue')
    },
    {
        path: '/register/:id',
        name: 'Register',
        component: () =>
            import ('../views/Register.vue')
    },
    //workbench
    {
        path: '/workbench',
        name: 'Workbench',
        component: () =>
            import ('../views/workbench/Index.vue'),
        redirect: '/workbench/dashboard',
        meta: {
            title: '工作台',
            // icon: 'lock',
        },
        children: [{
                path: 'dashboard', //仪表盘
                name: 'Dashboard',
                component: () =>
                    import ('../views/workbench/Dashboard.vue'),
                meta: {
                    title: '仪表盘',
                    icon: "la la-home",
                }
            },
            {
                path: 'my-tasks',
                name: 'MyTasks',
                component: () =>
                    import ('../views/workbench/MyTasks.vue'),
                meta: {
                    title: '我的任务',
                    icon: "qingmeng-icon icon-my-projects-line-gray",
                }
            },
            // 404 page must be placed at the end !!!
            // { path: '*', redirect: '/404', hidden: true },
            {
                path: '*',
                name: 'Error',
                hidden: true,
                component: () =>
                    import ('../views/Error.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router