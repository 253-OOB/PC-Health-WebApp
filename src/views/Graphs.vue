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
      cpuUsed: [],
      memUsed: [],
      diskUsed: [],
    };
  },
  methods: {
    setCpuUsed() {
      var processList = [];
      for (let dataPoint of this.$graphData["cpu"]) {
        let summ = 0;
        for (let core of JSON.parse(dataPoint["processors"]["data"])[0][
          "Cores"
        ]) {
          summ += core["PercentProcessorTime"];
        }
        processList.push(summ);
      }
      this.cpuUsed = processList;
    },

    setMemUsed() {
      this.memUsed = this.$graphData["memory"].map(
        (dataPoint) =>
          JSON.parse(dataPoint["memory"]["data"])[0].TotalMemory -
          JSON.parse(dataPoint["memory"]["data"])[0].AvailableMBytes
      );
    },

    setDiskUsed() {
      this.diskUsed = this.$graphData["disk"].map(
        (dataPoint) =>
          JSON.parse(dataPoint["logical_disks"]["data"])[0].Size -
          JSON.parse(dataPoint["logical_disks"]["data"])[0].FreeSpace
      );
    },
  },
  mounted() {
    this.setCpuUsed();
    this.setMemUsed();
    this.setDiskUsed();
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
