<template>
  <div id="main-wrapper">
    <router-view id="main" />
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
};
</script>

<style scoped>
#main-wrapper {
  display: flex;
  height: 100%;
}

#main {
  flex: 1;
}
</style>