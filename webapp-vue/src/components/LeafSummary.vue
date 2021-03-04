<template>
  <div id="leaf-wrapper">
    <span id="title" v-for="title in metrics" v-bind:key="title">{{ title }}</span>
    <div id="leaf-info">Tags ON</div>
  </div>
</template>

<script>
export default {
  name: "LeafSummary",
  props: {
      metrics: String
  },
};
</script>

<style scoped>
#leaf-wrapper {
  border: solid black 1px;
  width: fit-content;
  height: fit-content;
  text-align: start;
  margin: 30px;
}

#title {
  font-size: 17px;
  font-weight: bold;
}

#leaf-info {
  padding: 10px 7px 2px 15px;
  background-color: grey;
}
</style>