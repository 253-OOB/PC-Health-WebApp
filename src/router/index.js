import Vue from 'vue'
import VueRouter from 'vue-router'

const TheContainer = () => import('../components/layouts/TheContainer.vue')
// const Page404 = () => import('../views/pages/Page404.vue')

const Overview = () => import('../views/Overview.vue')
const Details = () => import('../views/Details.vue')


Vue.use(VueRouter)

export default new VueRouter({

    routes: [{
            path: '/',
            redirect: '/TheContainer/Overview',
            name: 'TheContainer',
            component: TheContainer,
            children: [{
                    path: 'TheContainer/Overview',
                    name: 'Overview',
                    component: Overview
                },
                {
                    path: 'TheContainer/Details',
                    name: 'Details',
                    component: Details
                }
            ]
        }
//         {
//             path: '/pages',
//             redirect: '/pages/404',
//             name: 'Pages',
//             component: {
//                 render(c) {
//                     return c('router-view')
//                 }
//             },
//             children: [{
//                 path: '404',
//                 name: 'Page404',
//                 component: Page404
//             }, ],
//         }
    ]
})
