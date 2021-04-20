<template>
    <div class="metrics">
        <!--       -->
        <!-- Tools -->
        <!--       -->
        <b-input-group size="lg">
            <!-- Dropdown Select -->
            <b-form-select
                class="dropdowns"
                id="tags"
                v-model="tagSelected"
                :options="tagOptions"
            >
                <template #first>
                    <b-form-select-option :value="null" disabled
                        >-- Select Tag --</b-form-select-option
                    >
                </template>
            </b-form-select>
            <!-- Searchbar -->
            <b-form-input
                v-model="keyword"
                placeholder="Type to Search..."
                type="text"
            ></b-form-input>
            <!-- Clear Button -->
            <b-input-group-append>
                <b-button
                    id="clear-btn"
                    :disabled="!keyword"
                    @click="keyword = ''"
                >
                    Clear
                </b-button>
            </b-input-group-append>
        </b-input-group>

        <!--      -->
        <!-- Tabs -->
        <!--      -->
        <div class="tab-group">
            <router-link
                class="tab"
                to="/metrics/overview"
                v-on:click.native="activetab = 1"
                v-bind:class="[activetab === 1 ? 'active' : '']"
            >
                Overview
            </router-link>

            <router-link
                class="tab"
                to="/metrics/details"
                v-on:click.native="activetab = 2"
                v-bind:class="[activetab === 2 ? 'active' : '']"
            >
                Details
            </router-link>
        </div>

        <!-- Tab Content -->
        <div class="content-group">
            <div v-if="activetab === 1" class="tabcontent">
                <!-- overview -->
                <router-view class="sub-content" />
            </div>
            <div v-if="activetab === 2" class="tabcontent">
                <!-- details -->
                <router-view :keyword="this.keyword" class="sub-content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Metrics",

    data() {
        return {
            keyword: "",
            organizationId: null,
            organizationName: "",

            // Used for tabs
            activetab: 1,

            // Used for form select
            tagSelected: null,
            tagOptions: [
                { value: "a", text: "Tag 1" },
                { value: "b", text: "Tag 2" },
            ],
        };
    },

    methods: {
        getCookie(cname) {
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
        },

        getOrgs() {
            const AccToken = this.getCookie("AccessToken");
            const RefToken = this.$session.RefreshToken;

            if (AccToken.length === 0)
                console.error("Missing Cookie Access Token");
            else if (RefToken === null) console.error("Missing Refresh Token");
            else {
                fetch(process.env.VUE_APP_API_GET_ORGS, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((orgsData) => {
                        console.log("Fetched ORGANIZATIONS");
                        const organization = orgsData["organisations"][0];
                        this.organizationId = organization["OrganisationID"];
                        this.organizationName =
                            organization["OrganisationName"];
                        return organization["OrganisationID"];
                    })
                    .catch((err) => {
                        console.error("Error fetching ORGANIZATIONS:\n" + err);
                    });
            }
        },

        getTags(orgID) {
            fetch(process.env.VUE_APP_API_GET_TAGS + orgID, {
                method: "GET",
            })
                .then((tagData) => {
                    console.log("Fetched TAGS");
                    console.log(tagData);
                })
                .catch((err) => {
                    console.error("Error fetching TAGS:\n" + err);
                });
        },

        main() {
            this.getTags(this.getOrgs());
        },
    },

    mounted() {
        // this.main();
    },
};
</script>

<style scoped>
.metrics {
    position: relative;
    top: -2%;
}

.tools {
    display: flex;
    background-color: var(--background-color);
}
</style>
