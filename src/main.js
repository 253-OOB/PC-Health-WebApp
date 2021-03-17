import Vue from "vue";
import App from "./App.vue";
import router from "./router";  // Router

import { library } from "@fortawesome/fontawesome-svg-core";  // FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // FontAwesomeIcon
import { faInfoCircle, faTh } from "@fortawesome/free-solid-svg-icons"; // FontAwesomeIcon
library.add(faInfoCircle, faTh);  // FontAwesomeIcon
Vue.component("font-awesome-icon", FontAwesomeIcon);  // FontAwesomeIcon

import { BootstrapVue } from "bootstrap-vue"; // BootstrapVue
import "bootstrap/dist/css/bootstrap.css";  // BootstrapVue
import "bootstrap-vue/dist/bootstrap-vue.css";  // BootstrapVue
Vue.use(BootstrapVue);  // BootstrapVue


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
