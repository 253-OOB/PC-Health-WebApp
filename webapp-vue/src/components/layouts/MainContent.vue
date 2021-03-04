<template>
  <div id="main-wrapper">
      <div id="main">

      </div>
      <RightSideBar id="sidebar"/>
  </div>
</template>

<script>
import RightSideBar from "./RightSideBar";

export default {
  name: "MainContent",
  components: {
      RightSideBar
  }
};
</script>

<style scoped>
#main-wrapper{
    display: flex;
    height: 100%;
}

#main{
    flex: 1;
}


</style>