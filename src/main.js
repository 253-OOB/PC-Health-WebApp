////////////////////////////////////
//////////// LIBRARIES /////////////
////////////////////////////////////
import dotenv from "dotenv";
dotenv.config();

import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // Router

// VueX
import "es6-promise/auto";
import Vuex from "vuex";
Vue.use(Vuex);
// https://vuex.vuejs.org/guide/#the-simplest-store
const store = new Vuex.Store({
    state: {
        tags: null,
        tagSelected: null,
        organizations: null,
        organizationsID: null,

        LoggedInOrg: false,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
});

// FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faInfoCircle,
    faTh,
    faChartLine,
    faBell,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
library.add(faInfoCircle, faTh, faChartLine, faBell, faCog);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// BootstrapVue
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// CoreuiChartjsVue
import CoreuiVueCharts from "@coreui/vue-chartjs";
Vue.use(CoreuiVueCharts);

// Vue context
import VueContext from "vue-context";
Vue.use(VueContext);

////////////////////////////////////
///////////// GLOBALS //////////////
////////////////////////////////////
let session = {
    LoggedIn: false,
    RefreshToken: undefined,
};

////////////////////////////////////
///////////// METHODS //////////////
////////////////////////////////////
Vue.config.productionTip = false;

// Configure Route Permissions
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!session.LoggedIn) {
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

async function launchVueApp() {
    Vue.prototype.$session = session;
    // Vue.prototype.$organizationID = null;
    Vue.prototype.$tags = null;

    // Loads in vue app
    new Vue({
        router,
        store: store,
        render: (h) => h(App),
    }).$mount("#app");
}

launchVueApp();
