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
import { faInfoCircle, faTh, faChartLine, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

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
let graphData = new Object(); //dictionary for the graph data

let session = {
    LoggedIn: false,
    RefreshToken: undefined
};

////////////////////////////////////
///////////// METHODS //////////////
////////////////////////////////////
Vue.config.productionTip = false;

// method to make http get requests
async function getReq(url) {

    let response = await fetch(url);
    let data = await response.json();
    return data;

}

// Configure Route Permissions
router.beforeEach( (to, from, next) => {
    
    if ( to.matched.some(record => record.meta.requiresAuth) ) {

        if ( ! session.LoggedIn ) {

            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });

        } else {
            next();
        }

    } else {
        next();
    }

});

async function launchVueApp() {
  // Put calls that need to be dont before anything HERE

    Vue.prototype.$session = session;
    
    // CPU Call
    await getReq(process.env.VUE_APP_API_GET_CPU_RE).then((response) => {
        graphData["cpu"] = response;
        console.log("Fetched cpu data from API");
        Vue.prototype.$graphData = graphData;
    });

    // Memory Call
    await getReq(process.env.VUE_APP_API_GET_MEMORY_RE).then((response) => {
        graphData["memory"] = response;
        console.log("Fetched memory data from API");
        Vue.prototype.$graphData = graphData;
    });

    // Disk Call
    await getReq(process.env.VUE_APP_API_GET_LOGIC_DISK_RE).then((response) => {
        graphData["disk"] = response;
        console.log("Fetched disk data from API");
        Vue.prototype.$graphData = graphData;
    });

    // Loads in vue app
    new Vue({
        router,
        render: (h) => h(App),
    }).$mount("#app");

}

launchVueApp();
