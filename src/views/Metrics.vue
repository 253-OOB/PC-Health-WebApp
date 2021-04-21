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
