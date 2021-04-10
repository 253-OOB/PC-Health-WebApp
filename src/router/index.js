import Vue from 'vue'
import VueRouter from 'vue-router'

const TheContainer = () => import('../components/layouts/TheContainer.vue')
// const Page404 = () => import('../views/pages/Page404.vue')

const Overview = () => import('../views/Overview.vue')
const Details = () => import('../views/Details.vue')
const Graphs = () => import("../views/Graphs.vue");

const Login = () => import('../views/pages/Login.vue');

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/overview",
            name: "TheContainer",
            component: TheContainer,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "overview",
                    name: "Overview",
                    component: Overview,
                },
                {
                    path: "details",
                    name: "Details",
                    component: Details,
                },
                {
                    path: "graphs",
                    name: "Graphs",
                    component: Graphs,
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                
            }
        }
    ],
});

