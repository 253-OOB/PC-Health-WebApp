<template>
  <div id="leaf-wrapper">
    <div id="title">
      <span v-for="(title, index) in metrics" v-bind:key="index">{{ title }}</span>
    </div>
    <div id="leaf-info">
      Tags ON
    </div>
  </div>
</template>

<script>
export default {
  name: "LeafSummary",
  props: {
    metrics: String,
  },
};
</script>

<style scoped>
#leaf-wrapper {
  border: solid black 1px;
  width: 150px;
  height: 70%;
  text-align: start;
  margin: 30px;
}

#title {
  font-size: 17px;
  font-weight: bold;
  height: 30%;
}

#leaf-info {
  padding: 10px 7px 2px 15px;
  background-color: grey;
  height: 70%;
}
</style>