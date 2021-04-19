<template>
    <div class="NotificationItem">
        <h1>{{ notif.title }}</h1>
        <p>
            {{ notif.body }} <br />
            {{ notif.isAlive }}
        </p>
        <p style="text-align: end">{{ notif.timestamp }}</p>
    </div>
</template>

<script>
export default {
    name: "NotificationItem",
    props: {
        notif: Object,
    },
};
</script>

<style scoped>
.NotificationItem {
    background-color: white;
    margin: 5px 0px;
    padding: 5px 10px;
    border-radius: 50px;
}
</style>
