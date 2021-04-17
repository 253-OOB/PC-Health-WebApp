<template>
  <div class="metrics">
      
    <div class="tools">
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
      <b-button id="clear-btn" :disabled="!keyword" @click="keyword = ''">
        Clear
      </b-button>
    </div>

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
        <router-view class="sub-content" />
      </div>
      <div v-if="activetab === 2" class="tabcontent">
        <router-view class="sub-content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
