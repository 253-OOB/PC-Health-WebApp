<template>
    <div id="overview">
        <b-spinner
            v-if="loading"
            class="loading"
            label="Loading..."
            variant="light"
        ></b-spinner>
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
            loading: true,
            allLeafs: [],
            filteredLeafs: [],
        };
    },
    components: {
        LeafSummary,
    },

    methods: {
        //filter leaves by name or tag or both and assign it as the leafcomponet
        async getFilteredLeaves() {
            //Use Dummy Data
            if (this.$store.state.useDummyData === null) {
                return FleafDataJ; //no filtering for dummy data
            }

            //Use Real Data

            // tries to call on current org selected, if it is null (like as soon as app loads)
            // it will throw an error which will be caught in the catch clause.
            // the subscribe in the catch (which watches the orgID change) will rerender the leafs
            try {
                if (this.$store.state.organizationID === null) {
                    throw new Error("Not loaded yet");
                }

                //if leafs have been previously fetched before and no filter is being applied
                this.allLeafs = await this.getLeafs(
                    this.$store.state.organizationID
                );
                this.filteredLeafs = this.allLeafs;
                this.LeafComponent = this.filteredLeafs;
            } catch (e) {
                // Triggered at initial call and tag/keyword change
                this.unsubscribe = this.$store.subscribe(
                    async (mutation, state) => {
                        if (mutation.type === "updateOrgID") {
                            this.loading = true;
                            //when org changes refetch all keys
                            this.allLeafs = await this.getLeafs(
                                state.organizationID
                            );
                            this.filteredLeafs = this.allLeafs;
                            this.LeafComponent = this.filteredLeafs;
                            this.loading = false;
                        } else if (
                            mutation.type === "updateSelectedTag" ||
                            mutation.type === "updateSearchWord"
                        ) {
                            this.loading = true;
                            this.filteredLeafs = this.allLeafs; //start filteredLeafs with all leafs in it
                            const nameFilter = state.searchWord;
                            const tagFilter = state.tagSelected;

                            //filter by name
                            if (nameFilter !== "") {
                                this.filteredLeafs = this.filteredLeafs.filter(
                                    (leaf) =>
                                        leaf.AssignedName.toLowerCase().includes(
                                            nameFilter.toLowerCase()
                                        )
                                );
                            }

                            //filter by tag
                            if (tagFilter !== null) {
                                this.filteredLeafs = this.filteredLeafs.filter(
                                    (leaf) => {
                                        let flag = false;
                                        leaf["tags"].forEach((tag) => {
                                            if (tag["TagID"] === tagFilter) {
                                                flag = true;
                                            }
                                        });
                                        return flag;
                                    }
                                );
                            }

                            this.LeafComponent = this.filteredLeafs;
                            this.filteredLeafs = this.allLeafs; //reset filteredLeafs to contain all leafs
                            this.loading = false;
                        }
                    }
                );
            }
            this.loading = false;
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
        this.loading = true;
        this.getFilteredLeaves();
    },

    // beforeDestroy() {
    //     this.unsubscribe();
    // },
};
</script>

<style scoped>
#overview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, 1fr);
    justify-items: center;
    align-items: center;
    overflow-y: scroll;
}

.loading {
    position: absolute;
    left: 50%;
    top: 50%;
}
</style>
