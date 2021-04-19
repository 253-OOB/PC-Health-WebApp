<template>
    <div class="graphs">
        <div class="chart-container">
            <CChartBar
                :datasets="[
                    {
                        label: 'CPU Used',
                        backgroundColor: 'rgb(0,0,255,0.9)',
                        data: cpuUsed,
                    },
                ]"
                :options="{ responsive: true }"
            />
        </div>

        <div class="chart-container">
            <CChartBar
                :datasets="[
                    {
                        label: 'Memory Used [GB]',
                        backgroundColor: 'rgb(255,0,0,0.9)',
                        data: memUsed,
                    },
                ]"
                :options="{ responsive: true }"
            />
        </div>

        <div class="chart-container">
            <CChartBar
                :datasets="[
                    {
                        label: 'Disk Used [GB]',
                        backgroundColor: 'rgb(0,255,0,0.9)',
                        data: diskUsed,
                    },
                ]"
                :options="{ responsive: true }"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keepUpdating: false,
            fetchFreq: 100,
            cpuUsed: [],
            memUsed: [],
            diskUsed: [],
        };
    },
    methods: {
        fetchData() {
            //Main method that manages the other api calls
            if (
                this.cpuUsed.length === 0 ||
                this.memUsed.length === 0 ||
                this.diskUsed.length === 0
            ) {
                // Initial call on app load
                this.setCpuUsed();
                this.setMemUsed();
                this.setDiskUsed();
            } else if (this.keepUpdating) {
                // Frequently fetch data
                //TODO the three set methods will be called n every fetchFreq
            }
        },

        setCpuUsed() {
            // fetches data from endpoint and stores it as json
            fetch(process.env.VUE_APP_API_GET_CPU)
                .then((response) => response.json())
                .then((cpuData) => {
                    //parses the cpu data for pc0 and stores it in cpuUsed
                    var processList = [];
                    for (let dataPoint of cpuData) {
                        let summ = 0;
                        for (let core of JSON.parse(
                            dataPoint["processors"]["data"]
                        )[0]["Cores"]) {
                            summ += core["PercentProcessorTime"];
                        }
                        processList.push(summ);
                    }
                    this.cpuUsed = processList;
                })
                .catch((err) => {
                    console.error("Error fetching CPU:\n" + err);
                });

            //Success
            console.log("Fetched CPU data");
        },

        setMemUsed() {
            // fetches data from endpoint and stores it as json
            fetch(process.env.VUE_APP_API_GET_MEMORY)
                .then((response) => response.json())
                .then((memData) => {
                    //parses the disk data for pc0 and stores it in cpuUsed
                    this.memUsed = memData.map(
                        (dataPoint) =>
                            JSON.parse(dataPoint["memory"]["data"])[0]
                                .TotalMemory -
                            JSON.parse(dataPoint["memory"]["data"])[0]
                                .AvailableMBytes
                    );
                })
                .catch((err) => {
                    console.error("Error fetching MEMORY:\n" + err);
                });

            //Success
            console.log("Fetched MEMORY data");
        },

        setDiskUsed() {
            // fetches data from endpoint and stores it as json
            fetch(process.env.VUE_APP_API_GET_LOGIC_DISK)
                .then((response) => response.json())
                .then((diskData) => {
                    //parses the disk data for pc0 and stores it in cpuUsed
                    this.diskUsed = diskData.map(
                        (dataPoint) =>
                            JSON.parse(dataPoint["logical_disks"]["data"])[0]
                                .Size -
                            JSON.parse(dataPoint["logical_disks"]["data"])[0]
                                .FreeSpace
                    );
                })
                .catch((err) => {
                    console.error("Error fetching DISK:\n" + err);
                });

            //Success
            console.log("Fetched DISK data");
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
.graphs {
    display: flex;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

.chart-container {
    width: 50%;
    max-width: 450px;
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 3px 5px 15px black;
}
</style>
