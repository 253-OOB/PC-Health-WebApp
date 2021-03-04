<template>
  <div id="app">
    <Header />
    <MainContent />
  </div>
</template>

<script>
import Header from './components/layouts/Header';
import MainContent from './components/layouts/MainContent';

export default {
  name: 'App',
  components: {
    Header,
    MainContent,
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
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #FFFFFF;
  background-color: #F7F7F7;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>