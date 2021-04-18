<template>
  <div class="notifications">
    Coming Soon
    <NotificationItem v-bind:notif="notificationData[0]"/>
    <NotificationItem v-bind:notif="notificationData[1]"/>
  </div>
</template>

<script>
import NotificationItem from "@/components/NotificationItem.vue";

export default {
  name: "notifications",
  components: {
    NotificationItem,
  },
  data() {
    return {
      notificationData: [
        {
          title: "Computer is die",
          body: "Your memory is 16000/8000\nYour cpu ra7\nmen el ekher buy a new one",
          timestamp: "04:49:42 18/04/2021",
          isAlive: false,
        },
        {
          title: "Computer is die",
          body: "Your memory is 16000/8000\nYour cpu ra7\nmen el ekher buy a new one",
          timestamp: "04:49:42 18/04/2021",
          isAlive: false,
        },
      ],
    };
  },
};
</script>

<style></style>
