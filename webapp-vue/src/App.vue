<template>
  <div id="app">
    <Header />
    <Content :data="leafData" v-if="leafData" />
  </div>
</template>

<script>
import Header from "./components/layouts/Header";
import Content from "./components/layouts/Content";
import axios from 'axios';

export default {
  name: "App",
  components: {
    Header,
    Content,
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL, 
      leafData: null,
      interval: undefined,
    };
  },
  methods: {
    async getLeafData() {
      await axios.get(this.url)
      // .then(response => this.leafData = response['data'])
      .then(response => this.leafData = response['data'])
      .catch(err => console.log(err));
    }
  },
  created() {
    this.getLeafData();
    this.interval = setInterval(this.getLeafData, 2000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }
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
