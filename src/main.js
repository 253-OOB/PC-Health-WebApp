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
        tags: null, //list of tags per organizationID
        tagSelected: null, //tag selected in dropdown
        organizations: null, //list of organizations
        organizationID: null, //organization select in dropdown
        LoggedInOrg: false, //keep you logged in settings for org
        AccessToken: null,
        RefreshToken: null,
        
        useDummyData: false,
    },
    getters: {
        //might be able to use filters https://blog.pusher.com/getting-started-vuex-state-management-vuejs/
        organizationID: (state) => state.organizationID,
    },
    mutations: {
        updateOrgID(state, organizationID) {
            Vue.set(state, "organizationID", organizationID);
        },
        updateTags(state, tags) {
            Vue.set(state, "tags", tags);
        },
        updateAccTok(state, token) {
            Vue.set(state, "AccessToken", token);
        },
        updateRefTok(state, token) {
            Vue.set(state, "RefreshToken", token);
        },
    },
    actions: {
        fetchTokens() {
            const AccToken = getCookie("AccessToken");
            const RefToken = session.RefreshToken;
            this.commit("updateAccTok", AccToken);
            this.commit("updateRefTok", RefToken);
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
