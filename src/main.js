import Vue from "vue";
import App from "./App.vue";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faInfoCircle, faTh } from "@fortawesome/free-solid-svg-icons";
library.add(faInfoCircle, faTh);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// Router
import router from "./router";

// Bootstrap vue
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
