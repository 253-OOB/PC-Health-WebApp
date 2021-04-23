<template>
    <div class="TheHeader">
        <!--                -->
        <!-- Title + NavBar -->
        <!--                -->
        <header class="header flex-aligned">
            <h1 id="title">PC Health</h1>
            <div id="TheNavbar">
                <!-- METRICS -->
                <router-link
                    to="/metrics"
                    class="navbar-item flex-aligned"
                    v-on:click.native="navSwitch(0)"
                >
                    <font-awesome-icon icon="info-circle" class="icons" />
                    <p class="text">Metrics</p>
                </router-link>

                <!-- GRAPHS -->
                <router-link
                    to="/graphs"
                    class="navbar-item flex-aligned"
                    v-on:click.native="navSwitch(1)"
                >
                    <font-awesome-icon icon="chart-line" class="icons" />
                    <p class="text">Graphs</p>
                </router-link>

                <!-- NOTIFICATIONS -->
                <router-link
                    to="/notifications"
                    class="navbar-item flex-aligned"
                    v-on:click.native="navSwitch(2)"
                >
                    <font-awesome-icon icon="bell" class="icons" />
                    <p class="text">Notifications</p>
                </router-link>

                <!-- SETTINGS -->
                <router-link
                    to="/settings"
                    class="navbar-item flex-aligned"
                    v-on:click.native="navSwitch(3)"
                >
                    <font-awesome-icon icon="cog" class="icons" />
                    <p class="text">Settings</p>
                </router-link>
            </div>
        </header>

        <!--                    -->
        <!-- Organization Select -->
        <!--                     -->
        <b-form-select
            id="organizations"
            v-model="orgSelected"
            :options="orgOptions"
        >
            <template #first>
                <b-form-select-option :value="null" disabled
                    >-- Select Organization --</b-form-select-option
                >
            </template>
        </b-form-select>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    data() {
        return {
            lastnavSwitched: 0,
            orgSelected: null,
            orgOptions: [],
        };
    },

    mounted() {
        this.navSwitch(0);
        this.callGetOrgs();
    },

    watch: {
        //Set selected org as global organizationID
        orgSelected(newVal) {
            this.getTags(newVal);
        },
    },

    methods: {
        async callGetOrgs() {
            await this.getOrgs();
        },

        // Called everytime a new nav bar button is clicked
        // Switches pages and gives an effect to show which page is selected
        navSwitch(btn_num) {
            if (btn_num != this.lastnavSwitched) {
                var lastBtn = document.getElementsByClassName("navbar-item")[
                    this.lastnavSwitched
                ];
                lastBtn.style.boxShadow = "";
                lastBtn.style.webkitBoxShadow = "";
            }
            this.lastnavSwitched = btn_num;
            var btn = document.getElementsByClassName("navbar-item")[btn_num];
            btn.style["boxShadow"] = "inset 0px 0px 5px black";
            btn.style.webkitBoxShadow = "inset 0px 0px 5px black";
        },

        // Called as soon as app loads because everthing depends on orgs
        // sets the orgs in orgOptions taken from api
        async getOrgs() {
            this.$store.state.organizations = [];
            this.$store.dispatch("fetchTokens");
            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;

            if (AccToken.length === 0)
                console.error("Missing Cookie Access Token");
            else if (RefToken === null) console.error("Missing Refresh Token");
            else {
                try {
                    const response = await fetch(
                        process.env.VUE_APP_API_GET_ORGS,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                AccessToken: AccToken,
                                RefreshToken: RefToken,
                            }),
                        }
                    );
                    const orgsData = await response.json();
                    console.log("Fetched ORGANIZATIONS");
                    //Add all organisations to orgOptions
                    orgsData["organisations"].forEach((org) => {
                        this.$store.state.organizations.push({
                            value: org.OrganisationID,
                            text: org.OrganisationName,
                        });
                        this.orgOptions.push({
                            value: org.OrganisationID,
                            text: org.OrganisationName,
                        });
                        if (this.$store.state.organizationsID === null)
                            this.orgSelected = org.OrganisationID;
                    });
                } catch (err) {
                    console.error("Error fetching ORGANIZATIONS:\n" + err);
                }
            }
        },

        // Called when an organisation is selected
        // gets all the tags for the selected org and saves them in tagOptions
        async getTags(newVal) {
            this.$store.commit("updateOrgID", newVal);
            this.$store.state.tags = [];
            //Api Call
            const response = await fetch(
                process.env.VUE_APP_API_GET_TAGS +
                    this.$store.state.organizationsID,
                {
                    method: "GET",
                }
            );

            try {
                if (!response.ok) {
                    throw new Error("Invalid Organization Selected");
                } else {
                    const tagJson = await response.json();

                    //Add all tags to tagOptions
                    tagJson["tags"].forEach((tag) => {
                        this.$store.state.tags.push({
                            OrganisationID: tag["OrganisationID"],
                            TagID: tag["TagID"],
                            TagName: tag["TagName"],
                        });
                    });

                    console.log("Fetched TAGS");
                }
            } catch (err) {
                console.error("Error fetching TAGS:\n" + err);
            }
        },
    },
};
</script>

<style scoped>
.header {
    height: 8%;
    border-bottom: solid 1px var(--spacer-color);
}

#title {
    font-weight: 600;
    flex: 1;
    margin: 0;
}

#TheNavbar {
    flex: 2;
    display: flex;
    justify-content: space-around;
    padding: 5px;
}

.navbar-item {
    border: none;
    border-radius: 30px;
    padding: 10px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease 0s;
    color: var(--background-color);
}
.navbar-item:hover {
    cursor: pointer;
}

.icons {
    margin-right: 10px;
}

.text {
    margin: 0px;
}

#organizations {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 30%;
    display: block;
}
</style>
