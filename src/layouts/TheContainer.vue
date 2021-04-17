<template>
  <div id="TheContainer">
    <TheHeader />
    <router-view id="main" />
  </div>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
  name: "TheContainer",
  components: {
    TheHeader,
  },
};
</script>

<style scoped>
#TheContainer {
  text-align: center;
  height: 100vh;
  width: 100vw;
}

#main {
  height: 80%;
  margin: 50px 25px 50px 25px;
  border: 1px solid var(--spacer-color);
  flex: 1;
  background-color: var(--background-color);
}
</style>
