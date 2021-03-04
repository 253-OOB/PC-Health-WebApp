<template>
  <div id="main">
    <h1>Display all leafs here</h1>
    <LeafSummary v-bind:metrics="metrics[1]" />
    <component v-bind:is="cmpName"/>
  </div>
</template>

<script>
import LeafSummary from '../components/LeafSummary'

export default {
  name: "Overview",
  data() {
    return{
      metrics: ['Leaf1', 'Leaf2', 'x', 'e'],
      cmpName: ''
    }
  },
  components: {
    LeafSummary,
  },
  methods: {
    createLeafSummarys() {
      for (let index = 0; index < this.metrics.length; index++) {
        this.cmpName = 'LeafSummary';
      }
    }
  },
  mounted() {
    this.createLeafSummarys();
  }
};
</script>

<style scoped>
</style>