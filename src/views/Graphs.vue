<template>
  <div class="graph-container flex-aligned">
    <CChartBar
      class="chart"
      :datasets="[
        {
          label: 'CPU Used',
          backgroundColor: 'rgb(0,0,255,0.9)',
          data: cpuUsed,
        },
      ]"
      :options="{ maintainAspectRatio: true }"
    />
    <CChartBar
      class="chart"
      :datasets="[
        {
          label: 'Memory Used [GB]',
          backgroundColor: 'rgb(255,0,0,0.9)',
          data: memUsed,
        },
      ]"
      :options="{ maintainAspectRatio: true }"
    />
    <CChartBar
      class="chart"
      :datasets="[
        {
          label: 'Disk Used [GB]',
          backgroundColor: 'rgb(0,255,0,0.9)',
          data: diskUsed,
        },
      ]"
      :options="{ maintainAspectRatio: true }"
    />
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
.graph-container {
  justify-content: space-around;
  flex-wrap: wrap;
}

.chart {
  background-color: white;
  min-width: 300px;
  max-width: 700px;
  width: 60%;
  border-radius: 5px;
  box-shadow: 3px 5px 15px black;
}
</style>