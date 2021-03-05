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
        {
          name: "LeafSummary",
          title: "Leaf 11",
        },
        {
          name: "LeafSummary",
          title: "Leaf 12",
        },
        {
          name: "LeafSummary",
          title: "Leaf 13",
        },
        {
          name: "LeafSummary",
          title: "Leaf 14",
        },
        {
          name: "LeafSummary",
          title: "Leaf 15",
        },
        {
          name: "LeafSummary",
          title: "Leaf 16",
        },
        {
          name: "LeafSummary",
          title: "Leaf 17",
        },
        {
          name: "LeafSummary",
          title: "Leaf 18",
        },
        {
          name: "LeafSummary",
          title: "Leaf 19",
        },
        {
          name: "LeafSummary",
          title: "Leaf 20",
        },
        {
          name: "LeafSummary",
          title: "Leaf 21",
        },
        {
          name: "LeafSummary",
          title: "Leaf 22",
        },
        {
          name: "LeafSummary",
          title: "Leaf 23",
        },
        {
          name: "LeafSummary",
          title: "Leaf 24",
        },
        {
          name: "LeafSummary",
          title: "Leaf 25",
        },
        {
          name: "LeafSummary",
          title: "Leaf 26",
        },
        {
          name: "LeafSummary",
          title: "Leaf 27",
        },
        {
          name: "LeafSummary",
          title: "Leaf 28",
        },
        {
          name: "LeafSummary",
          title: "Leaf 29",
        },
        {
          name: "LeafSummary",
          title: "Leaf 30",
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
  overflow-y: scroll ;
}
::-webkit-scrollbar {
  width: 20px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(212, 212, 212);
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background-color: grey;
}

</style>