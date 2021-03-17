<template>
  <div id="leaf-wrapper">
    <div class="title flex-aligned">
      <span>{{ metrics.LeafNames }}</span>
    </div>
    <div id="leaf-info">Lorem ipsum</div>
  </div>
</template>

<script>
export default {
  name: "LeafSummary",
  props: {
    metrics: Object,
    index: Number
  },
  methods: {
    checkOffline(index) {
      let elem = document.getElementsByClassName("title")[index];
      if (!this.metrics.isOnline) {
        elem.style.backgroundColor = "rgb(157, 165, 177)"; //red
      } else {
        elem.style.backgroundColor = "rgb(36, 255, 54)"; //blue
      }
    },
  },
  mounted() {
    this.checkOffline(this.index);
  },
};
</script>

<style scoped>
#leaf-wrapper {
  border: solid 2px #ced2d8;
  width: 150px;
  height: 70%;
  text-align: start;
  margin: 30px;
  border-radius: 5px;
  box-shadow: 3px 5px 15px black;
  background-color: white;
}

#title {
  color: white;
  font-size: 17px;
  font-weight: bold;
  height: 30%;
}

#leaf-info {
  padding: 10px 7px 2px 5px;
  height: 70%;
}
</style>