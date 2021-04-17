<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&display=swap");

* {
  /* global variables */
  --background-color: #636f83;
  --spacer-color: #ced2d8;
  --font-color: #3c4b64;
  --font-barlow: "Barlow", sans-serif;

  /* padding/margin/box-sizing */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  /* global font color */
  color: var(--font-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* global font */
  font-family: var(--font-barlow);
}

/* This class can be used anywhere to center objects */
.flex-aligned {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
