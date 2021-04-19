<template>
    <div class="settings">
        <button v-on:click="installApp()">Install App</button>
    </div>
</template>

<script>
export default {
    methods: {
        installApp() {
            window.open(process.env.VUE_APP_API_INSTALL, "_blank");
        },
    },
};
</script>

<style></style>
