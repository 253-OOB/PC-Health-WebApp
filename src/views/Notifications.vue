<template>
  <div class="notifications">
    <div class="tab-container">
      <div class="tabs">
        <router-link to="/notifications/overview">
          <a
            v-on:click="activetab = 1"
            v-bind:class="[activetab === 1 ? 'active' : '']"
          >
            Overview
          </a>
        </router-link>

        <a
          v-on:click="activetab = 2"
          v-bind:class="[activetab === 2 ? 'active' : '']"
          >Tab 2</a
        >
      </div>

      <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
          <router-view />
        </div>
        <div v-if="activetab === 2" class="tabcontent">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activetab: 1,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Tab & Tab Content CONTAINER */
.tab-container {
  min-width: 420px;
  height: 100%;
  width: 100%;
}

.tabs {
  height: 4%;
  overflow: hidden;
  background-color: #f1f1f1;
}

.tabs a {
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
.tabs > a:first-of-type {
  border-left: none;
}

/* Non Active Tab */
.tabs > a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Active Tab */
.tabs > a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

.content {
  height: 96%;
  width: 100%;
}

.tabcontent {
  height: 100%;
  width: 100%;
  padding: 30px;
  background-color: white;
}
</style>
