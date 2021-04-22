<template>
    <div id="overview">
        <component
            v-for="(component, index) in JSONcomponentLists"
            v-bind:index="index"
            v-bind:metrics="component"
            :key="index"
            :is="componentName"
        ></component>
    </div>
</template>

<script>
import LeafSummary from "@/components/LeafSummary";
import FleafDataJ from "@/components/json/formattedMLD.json";

export default {
    name: "Overview",

    data() {
        return {
            componentName: LeafSummary,
            JSONcomponentLists: FleafDataJ,
        };
    },
    components: {
        LeafSummary,
    },
};
</script>

<style scoped>
#overview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: repeat(auto-fill, 100px);
    justify-items: center;
    align-items: center;
    overflow-y: scroll;
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
