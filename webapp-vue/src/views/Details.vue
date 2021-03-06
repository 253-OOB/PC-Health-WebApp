<template>
  <div class="details">
    <div class="container">
      <div class="row align-items-center no-gutters">
        <div class="col">
          {{ leafData["timestamp"] }}
        </div>
        <div class="col">
          {{ leafData["LeafNames"][0] }}
        </div>
        <div class="col">
          {{ leafData["Disk"][0][0] }}
        </div>
        <div class="col">
          {{ leafData["Disk"][0][1] }}
        </div>
        <div class="col">
          {{ leafData["RAM"][0][0] }}
        </div>
        <div class="col">
          {{ leafData["CurrentLoadPercentage"][0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["obj"],
  watch: {
    obj(newValue) {this.leafData = newValue},
  },
  data() {
    return {
      leafData: undefined,
    };
  },
};
</script>

<style scoped>
.details {
  color: black;
}

.col {
  border: solid 1px black;
}
</style>
