<template>
    <div id="details">
        <b-table
            fixed
            striped
            hover
            :items="realData"
            :filter="keyword"
            :per-page="perPage"
            :current-page="currentPage"
            :busy="isBusy"
        >
        </b-table>

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
export default {
    name: "Details",

    props: {
        keyword: String,
    },

    data() {
        return {
            // used for pagination
            perPage: 8,
            currentPage: 1,
            realData: [],
            isBusy: true,
        };
    },

    computed: {
        rows() {
            return this.realData.length;
        },
    },

    methods: {
        async getMetrics() {
            const orgID = this.$store.state.organizationID;
            const page = this.currentPage - 1;
            const perpage = this.perPage;
            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;

            try {
                const response = await fetch(
                    process.env.VUE_APP_API_GET_METRICS +
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
                return await response.json();
            } catch (err) {
                console.error("Error fetching metrics: " + err);
            }
        },

        async parseMetrics() {
            this.isBusy = true;
            let metrics = await this.getMetrics();
            metrics = metrics["leafdata"];

            metrics.forEach((leaf) => {
                //get total cpu percent processor time
                let totalPerProcUsed = 0;
                leaf["data"][0]["data"][0]["Cores"].forEach((core) => {
                    totalPerProcUsed += core["PercentProcessorTime"];
                });

                this.realData.push({
                    AssignedName: leaf["ComputerName"],
                    CPUused: totalPerProcUsed + " %",
                    Drive: leaf["data"][1]["data"][0]["Name"],
                    DiskSize:
                        parseFloat(
                            leaf["data"][1]["data"][0]["Size"] -
                                leaf["data"][1]["data"][0]["FreeSpace"]
                        ).toFixed(3) +
                        " GB/ " +
                        parseFloat(leaf["data"][1]["data"][0]["Size"]).toFixed(
                            3
                        ) +
                        " GB",
                    DiskIO:
                        leaf["data"][1]["data"][0]["DiskBytesPersec"] + "B/s",
                    RAM:
                        parseFloat(
                            leaf["data"][2]["data"][0]["TotalMemory"] -
                                leaf["data"][2]["data"][0]["AvailableMBytes"]
                        ).toFixed(3) +
                        " GB/ " +
                        parseInt(leaf["data"][2]["data"][0]["TotalMemory"]) +
                        " GB",
                });
            });
            this.isBusy = false;
        },
    },

    mounted() {
        this.parseMetrics();
    },
};
// methods: {
//   async getLeafData() {
//     await this.$http
//       .get(this.url)
//       .then((response) => {this.leafData = response["data"]["0"]; console.log(response);})
//       .catch((err) => console.log(err));
//     console.log(this.leafData);
//   },
// },
// created() {
//   this.getLeafData();
//   this.interval = setInterval(this.getLeafData, 4000);
// },
//   beforeDestroy() {
//     if (this.interval) {
//       clearInterval(this.interval);
//       this.interval = undefined;
//     }
//   },
</script>

<style scoped>
#details {
    color: black;
    background-color: white;
    border: solid black 1px;
    height: 95%;
}

#clear-btn {
    background-color: #636f83;
}
</style>
