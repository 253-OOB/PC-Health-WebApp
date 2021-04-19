<template>
    <div class="metrics">
        <b-input-group size="lg">
            <!-- Dropdown Select 1 -->
            <b-form-select
                class="dropdowns"
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
            <!-- Dropdown Select 2 -->
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

        <!-- Tabs -->
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

            // Used for tabs
            activetab: 1,

            // Used for form select
            orgSelected: null,
            orgOptions: [
                { value: "a", text: "Organization 1" },
                { value: "b", text: "Organization 2" },
            ],
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

        // getTags() {
        //     fetch(process.env.VUE_APP_API_GET_TAGS, {
        //         method: "GET",
        //         body: JSON.stringify(/*insert data here*/),
        //     })
        //         .then((response) => response.json())
        //         .then((tagData) => {
        //             console.log("Fetched TAGS");
        //             console.log(tagData);
        //         })
        //         .catch((err) => {
        //             console.error("Error fetching TAGS:\n" + err);
        //         });
        // },

        getOrgs() {
            const AccToken = this.getCookie("AccessToken");
            const RefToken = this.$session.RefreshToken;

            if (AccToken.length === 0)
                console.error("Missing Cookie Access Token");
            else if (RefToken === null) console.error("Missing Refresh Token");
            else {
                fetch(process.env.VUE_APP_API_GET_ORGS, {
                    method: "POST",
                    body: {
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((orgsData) => {
                        console.log(orgsData.json());
                        console.log("Fetched ORGANIZATIONS");
                    })
                    .catch((err) => {
                        console.error("Error fetching ORGANIZATIONS:\n" + err);
                    });
            }
        },
    },

    mounted() {
        // this.getTags();
        this.getOrgs();
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

.tab-group {
    height: 4%;
    overflow: hidden;
    background-color: #f1f1f1;
}

.tab {
    height: 100%;
    width: 50%;
    float: left;
    cursor: pointer;
    padding-top: 5px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    border-top: none;
    background-color: #f1f1f1;
    font-weight: bold;
    text-decoration: none;
    color: #484848;
}

/* First tab */
.tab:first-of-type {
    border-left: none;
}

/* Non Active Tab */
.tab:hover {
    background-color: #aaa;
    color: #fff;
}

/* Active Tab */
.tab.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

.content-group {
    height: 96%;
    width: 100%;
}

.tabcontent {
    height: 100%;
    width: 100%;
    background-color: var(--background-color);
    overflow: hidden;
}
</style>
