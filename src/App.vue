<template>
  <div id="app">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from "./components/layouts/Header";
import Content from "./components/layouts/Content";

export default {
  name: "App",
  components: {
    Header,
    Content,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  height: 100vh; /*very weird*/
  width: 100%;
}

/*This class can be used on any element to center it*/
.flex-aligned {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
