<template>
    <div class="NotificationItem">
        <h2>{{ notif.Title }}</h2>
        <p>{{ notif.Content }} <br /></p>
        <p class="timestamp">{{ notif.TimeStamp }}</p>
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
    margin: 2px 0px;
    border-radius: 40px;
}
.timestamp {
    text-align: end;
    margin: 0 25px 0 0;
}
</style>
