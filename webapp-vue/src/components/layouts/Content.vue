<template>
  <div id="main-wrapper">
    <router-view id="main" :obj="leafData" v-if="leafData" />
    <RightSideBar id="sidebar" />
  </div>
</template>

<script>
import RightSideBar from "./RightSideBar";

export default {
  name: "Content",
  components: {
    RightSideBar,
  },
  props: ["data"],
  data() {
    return {
      leafData: undefined,
    };
  },
  // watch will check if the data prop is being updated
  watch: {
    data(newValue) {
      this.leafData = newValue;
    },
  },
};
</script>

<style scoped>
#main-wrapper {
  display: flex;
  height: 95%;
}

#main {
  flex: 1;
  margin: 50px 25px 50px 25px;
  border: solid black 1px;
}
</style>