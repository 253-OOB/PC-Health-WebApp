<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&display=swap");

* {
    /* global variables */
    --background-color: #636f83;
    --spacer-color: #ced2d8;
    --font-color: #3c4b64;
    --font-barlow: "Barlow", sans-serif;

    /* padding/margin/box-sizing */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

    /* global font color */
    color: var(--font-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* global font */
    font-family: var(--font-barlow);
}

/* This class can be used anywhere to center objects */
.flex-aligned {
    display: flex;
    align-items: center;
    justify-content: center;
}


/********************************/
/********************************/
/*       Styling for tabs       */
/********************************/
/********************************/
.tab-group {
    height: 4%;
    overflow: hidden;
    background-color: #f1f1f1;
}

.tab {
    height: 100%;
    width: 50%;
    float: left;
    cursor: pointer;
    padding-top: 5px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    border-top: none;
    background-color: #d1d1d1;
    font-weight: bold;
    text-decoration: none;
    color: #484848;
}

/* First tab */
.tab:first-of-type {
    border-left: none;
}

/* Non Active Tab that is hovered over */
.tab:hover {
    background-color: #aaa;
    color: #fff;
    text-decoration: none;
}

/* Active Tab */
.tab.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

.content-group {
    height: 96%;
    width: 100%;
}

.tabcontent {
    height: 100%;
    width: 100%;
    background-color: var(--background-color);
    overflow: hidden;
}
</style>
