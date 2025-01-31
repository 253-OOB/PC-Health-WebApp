import Vue from "vue";
import VueRouter from "vue-router";

//Layouts || full pages
const TheContainer = () => import("@/layouts/TheContainer.vue");
// const Page404 = () => import('../views/pages/Page404.vue')

//Views
const Metrics = () => import("@/views/Metrics.vue");
const Graphs = () => import("@/views/Graphs.vue");
const Notifications = () => import("@/views/Notifications.vue");
const Settings = () => import("@/views/Settings.vue");

//Nested Views
const Overview = () => import("@/views/nestedViews/Overview.vue");
const Details = () => import("@/views/nestedViews/Details.vue");
const Tags = () => import("@/views/nestedViews/SettingsTags.vue");
const MonitoringApp = () => import("@/views/nestedViews/MonitoringApp.vue");

const Login = () => import("@/pages/Login.vue");

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "TheContainer",
            redirect: "/metrics/overview",
            component: TheContainer,
            meta: {
                title: "Nightingale",
                requiresAuth: true,
            },
            children: [
                {
                    path: "metrics",
                    redirect: "/metrics/overview",
                    name: "Metrics",
                    component: Metrics,
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
                    ],
                },
                {
                    path: "graphs",
                    name: "Graphs",
                    component: Graphs,
                },
                {
                    path: "notifications",
                    name: "Notifications",
                    component: Notifications,
                },
                {
                    path: "settings",
                    redirect: "settings/app",
                    name: "Settings",
                    component: Settings,
                    children: [
                        {
                            path: "app",
                            name: "app",
                            component: MonitoringApp,
                        },
                        {
                            path: "tags",
                            name: "Tags",
                            component: Tags,
                        },
                    ],
                },
            ],
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            meta: {
                title: "Nightingale",
            },
        },
    ],
});
