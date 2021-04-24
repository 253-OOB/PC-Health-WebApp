<template>
    <div id="overview">
        <component
            v-for="(component, index) in JSONcomponentLists"
            v-bind:index="index"
            v-bind:metrics="component"
            :key="index"
            :is="componentName"
        ></component>
    </div>
</template>

<script>
import LeafSummary from "@/components/LeafSummary";
import FleafDataJ from "@/components/json/formattedMLD.json";

export default {
    name: "Overview",

    data() {
        return {
            componentName: LeafSummary,
            JSONcomponentLists: null,
        };
    },
    components: {
        LeafSummary,
    },

    methods: {
        getLeafs(orgID) {
            this.$store.dispatch("fetchTokens");
            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;

            fetch(
                process.env.VUE_APP_API_GET_LEAFS + "?OrganisationID=" + orgID,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((LeafData) => {
                    this.JSONcomponentLists = LeafData.leaves;
                })
                .catch((err) => console.log("Error fetching Leafs: " + err));
        },
    },
    created() {
        //track if organization selected is changed and display other leafs
        if (this.$store.state.organizationID === null) {
            this.unsubscribe = this.$store.subscribe((mutation, state) => {
                if (mutation.type === "updateOrgID") {
                    this.selectedOrg = state.organizationID;
                    if (this.$store.state.useDummyData) {
                        this.JSONcomponentLists = FleafDataJ;
                    } else {
                        this.getLeafs(this.selectedOrg);
                    }
                }
            });
        } else {
            //The leaf has already been loaded in the session
            this.getLeafs(this.$store.state.organizationID);
        }
    },
    beforeDestroy() {
        this.unsubscribe();
    },
};
</script>

<style scoped>
#overview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(100px,));
    justify-items: center;
    align-items: center;
    overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 20px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-color: rgb(212, 212, 212);
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
    background-color: grey;
}
</style>
