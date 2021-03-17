<template>
  <div id="TheContainer">
    <TheHeader />
    <div id="main-content">
      <router-view id="main" />
      <TheSideBar />
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
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Barlow', sans-serif;
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
  color: #3c4b64;
}

#main-content {
  display: flex;
  height: 90%;
}

#main {
  margin: 50px 25px 50px 25px;
  border: 1px solid #ced2d8;
  flex: 1;
  background-color:#636f83;
}

</style>