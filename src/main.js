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
} from "@fortawesome/free-solid-svg-icons";
library.add(faInfoCircle, faTh, faChartLine);
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
let graphData = null;

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

async function launchVueApp() {
  // Put calls that need to be dont before anything HERE
  await getReq(process.env.VUE_APP_API_GET_MEMORY_RE).then((response) => {
    graphData = response;
    console.log("Fetched memory data from API");
    Vue.prototype.$graphData = graphData;
  });

  // Loads in vue app
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}


launchVueApp();
