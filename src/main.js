////////////////////////////////////
//////////// LIBRARIES /////////////
////////////////////////////////////
import dotenv from "dotenv";
dotenv.config();

import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // Router

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
    Vue.prototype.$LoggedInOrg = false;
    Vue.prototype.$organizationID = null;
    Vue.prototype.$showModal = false;

    // Loads in vue app
    new Vue({
        router,
        render: (h) => h(App),
    }).$mount("#app");
}

launchVueApp();
