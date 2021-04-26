<template>
    <div class="notifications">
        <NotificationItem
            v-for="(notif, index) in this.notificationData"
            v-bind:notif="notif"
            :key="index"
        ></NotificationItem>

        <b-pagination
            class="flex-aligned"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
        ></b-pagination>
    </div>
</template>

<script>
import NotificationItem from "@/components/NotificationItem.vue";

export default {
    name: "notifications",
    components: {
        NotificationItem,
    },

    computed: {
        rows() {
            return this.notificationData.length;
        },
    },

    data() {
        return {
            perPage: 5,
            currentPage: 1,

            notificationData: [
                {
                    title: "Computer is die",
                    body:
                        "Your memory is 16000/8000\nYour cpu ra7\nmen el ekher buy a new one",
                    timestamp: "04:49:42 18/04/2021",
                    isAlive: false,
                },
                {
                    title: "Computer is die",
                    body:
                        "Your memory is 16000/8000\nYour cpu ra7\nmen el ekher buy a new one",
                    timestamp: "04:49:42 18/04/2021",
                    isAlive: false,
                },
            ],
        };
    },

    methods: {
        async getNotifications() {
            const orgID = this.$store.state.organizationID;
            const page = this.currentPage - 1;
            const perpage = this.perPage;

            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;

            const response = await fetch(
                process.env.VUE_APP_GET_NOTIF +
                    "OrganisationID=" +
                    orgID +
                    "&Page=" +
                    page +
                    "&Amount=" +
                    perpage,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                }
            );

            const notifJSON = await response.json();
            this.notificationData = notifJSON["notifications"];
        },
    },

    mounted() {
        this.getNotifications();
    },
};
</script>

<style></style>
