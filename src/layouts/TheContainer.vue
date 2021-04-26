<template>
    <div id="TheContainer">
        <TheHeader @changeTags="setTagOptions($event)" />
        <router-view id="main" v-bind:tags="this.tagOptions" />
    </div>
</template>

<script>
import TheHeader from "./TheHeader";

export default {
    name: "TheContainer",
    components: {
        TheHeader,
    },

    data() {
        return {
            tagOptions: null,
        };
    },

    methods: {
        setTagOptions(tags) {
            this.tagOptions = tags;
        },
    },
};
</script>

<style scoped>
#TheContainer {
    color: var(--font-color);
    text-align: center;
    height: 100vh;
    width: 100vw;
}

#main {
    height: 80%;
    margin: 50px 25px 50px 25px;
    border: 1px solid var(--spacer-color);
    flex: 1;
    background-color: var(--background-color);
}
</style>
