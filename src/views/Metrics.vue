<template>
    <div class="metrics">
        <!--       -->
        <!-- Tools -->
        <!--       -->
        <b-input-group style="display: flex" size="lg">
            <!-- Dropdown Select -->
            <b-form-select
                style="max-width: 300px; width: 20%"
                class="dropdowns"
                id="tags"
                v-on:click.native="checkForNewTags"
                v-model="tagSelected"
                :options="tagOptions"
            >
                <template #first>
                    <b-form-select-option :value="null"
                        >-- Select Tag --</b-form-select-option
                    >
                </template>
            </b-form-select>
            <!-- Searchbar -->
            <b-form-input
                style="flex: 1"
                v-model="keyword"
                placeholder="Type to Search..."
                type="text"
            ></b-form-input>
            <!-- Search Button -->
            <b-input-group-append>
                <b-button
                    style="border-right: 2px solid white"
                    :disabled="!keyword"
                    @click="searchLeafs(keyword)"
                >
                    Search
                </b-button>
            </b-input-group-append>
            <!-- Clear Button -->
            <b-input-group-append>
                <b-button
                    id="clear-btn"
                    :disabled="!keyword"
                    @click="(keyword = ''), searchLeafs(keyword)"
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

        <!--             -->
        <!-- Tab Content -->
        <!--             -->
        <div class="content-group">
            <div v-if="activetab === 1" class="tabcontent">
                <!-- overview -->
                <router-view :keyword="this.keyword" class="sub-content" />
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
            tagTriggered: false,
            tagSelected: null,
            tagOptions: [],
        };
    },

    methods: {
        checkForNewTags() {
            this.tagTriggered = !this.tagTriggered;
        },

        searchLeafs(keyword) {
            this.$store.commit("updateSearchWord", keyword);
        },
    },

    watch: {
        //When the user wants to see what tags are available it will fetch the most recent tags
        tagTriggered() {
            try {
                if (this.$store.state.tags === null) {
                    throw new Error("No Org");
                } else if (this.$store.state.tags.length < 1) {
                    throw new Error("0 Tags");
                } else {
                    let tempList = [];
                    this.$store.state.tags.forEach((tag) => {
                        tempList.push({
                            value: tag["TagID"],
                            text: tag["TagName"],
                        });
                    });
                    this.tagOptions = tempList;
                }
            } catch (err) {
                if (err.message === "No Org") {
                    alert("Select an Organization first");
                } else if (err.message === "0 Tags") {
                    alert("Add Tags first (in Settings Page)");
                }
            }
        },

        //When a tag is selected in the dropdown
        tagSelected(newValue) {
            this.$store.commit("updateSelectedTag", newValue);
        },
    },
};
</script>

<style scoped>
.metrics {
    position: relative;
    top: -2%;
}
</style>
