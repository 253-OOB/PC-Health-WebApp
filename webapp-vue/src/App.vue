<template>
  <div id="app">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from './components/layouts/Header';
import Content from './components/layouts/Content';

export default {
  name: 'App',
  components: {
    Header,
    Content,
  }
}
</script>

<style>
*{
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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
