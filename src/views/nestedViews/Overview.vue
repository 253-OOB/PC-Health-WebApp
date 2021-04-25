<template>
    <div id="overview">
        <component
            v-for="(component, index) in LeafComponent"
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

    props: {
        keyword: String,
    },

    data() {
        return {
            componentName: LeafSummary,
            LeafComponent: [],
        };
    },
    components: {
        LeafSummary,
    },

    methods: {
        //filter leaves by name or tag or both and assign it as the leafcomponet
        async getFilteredLeaves() {
            //Use Dummy Data
            if (this.$store.state.useDummyData) {
                return FleafDataJ; //no filtering for dummy data
            }

            //Use Real Data

            // tries to call on current org selected, if it is null (like as soon as app loads)
            // it will throw an error which will be caught in the catch clause.
            // the subscribe in the catch (which watches the orgID change) will rerender the leafs
            try {
                this.LeafComponent = await this.getLeafs(
                    this.$store.state.organizationID
                );
            } catch (e) {
                // Triggered at initial call and org change
                this.unsubscribe = this.$store.subscribe(
                    async (mutation, state) => {
                        if (
                            mutation.type === "updateOrgID" ||
                            mutation.type === "updateSelectedTag"
                        ) {
                            const leafList = await this.getLeafs(
                                state.organizationID
                            );
                            const nameFilter = this.keyword;
                            const tagFilter = state.tagSelected;
                            console.log(nameFilter + " | " + tagFilter);

                            if (tagFilter === null && nameFilter !== "") {
                                //filter by name only
                                this.LeafComponent = leafList.filter(
                                    (leaf) => leaf.AssignedName === nameFilter
                                );
                            } else if (
                                tagFilter !== null &&
                                nameFilter === ""
                            ) {
                                //filter by tag only
                                this.LeafComponent = leafList.filter((leaf) => {
                                    let flag = false;
                                    leaf["tags"].forEach((tag) => {
                                        if (tag["TagID"] === tagFilter) {
                                            flag = true;
                                        }
                                    });
                                    return flag;
                                });
                            } else if (
                                tagFilter !== null &&
                                nameFilter !== ""
                            ) {
                                //filter by tag and name
                                this.LeafComponent = leafList.filter(
                                    (leaf) =>
                                        leaf.AssignedName === nameFilter &&
                                        leaf.tags.contains(nameFilter)
                                );
                            } else {
                                //no filter
                                this.LeafComponent = leafList;
                            }
                        }
                    }
                );
            }
        },

        async getLeafs(orgID) {
            this.$store.dispatch("fetchTokens");
            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;
            let leafs = null;

            const response = await fetch(
                process.env.VUE_APP_API_GET_LEAFS + "?OrganisationID=" + orgID,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                }
            );
            const leafData = await response.json();
            leafs = leafData.leaves;

            return leafs;
        },
    },
    mounted() {
        this.getFilteredLeaves();
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
    grid-template-rows: repeat(auto-fill, minmax(100px));
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
