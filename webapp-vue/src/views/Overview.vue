<template>
  <div id="main">
    <component
      v-for="(component, index) in componentLists"
      :key="index"
      :is="component.name"
      v-bind:metrics="component.title"
    ></component>
  </div>
</template>

<script>
import LeafSummary from "../components/LeafSummary";

export default {
  name: "Overview",
  data() {
    return {
      componentLists: [
        {
          name: "LeafSummary",
          title: "Leaf 1",
        },
        {
          name: "LeafSummary",
          title: "Leaf 2",
        },
        {
          name: "LeafSummary",
          title: "Leaf 3",
        },
        {
          name: "LeafSummary",
          title: "Leaf 4",
        },
        {
          name: "LeafSummary",
          title: "Leaf 5",
        },
        {
          name: "LeafSummary",
          title: "Leaf 6",
        },
        {
          name: "LeafSummary",
          title: "Leaf 7",
        },
        {
          name: "LeafSummary",
          title: "Leaf 8",
        },
        {
          name: "LeafSummary",
          title: "Leaf 9",
        },
        {
          name: "LeafSummary",
          title: "Leaf 10",
        },
      ],
    };
  },
  components: {
    LeafSummary,
  },
};
</script>

<style scoped>
#main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 200px));
  grid-template-rows: repeat(auto-fill, 100px);
  justify-items: center;
  align-items: center;
}

</style>