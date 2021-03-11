<template>
  <div id="TheContainer">
    <TheHeader id="TheHeader" />
    <div id="main-content">
      <router-view id="main" />
      <TheSideBar id="TheSideBar" />
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheSideBar from "./TheSideBar";

export default {
  name: "TheContainer",
  components: {
    TheHeader,
    TheSideBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*This class can be used on any element to center it*/
.flex-aligned {
  display: flex;
  align-items: center;
  justify-content: center;
}

#TheContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  color: black;
}

#TheHeader {
  height: 5%;
  background-color: grey;
}

#main-content {
  display: flex;
  height: 95%;
}

#main {
  margin: 50px 25px 50px 25px;
  flex: 1;
}

#TheSideBar {
  display: flex;
  padding: 20px;
  width: fit-content;
  border-left: solid black 1px;
  flex-direction: column;
}
</style>