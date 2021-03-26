<template>
  <div class="graph-container flex-aligned">
    <CChartBar
      class="chart"
      :datasets="[
        {
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          backgroundColor: '#E55353',
          label: 'Sales',
        },
      ]"
      :labels="months"
      :options="{ maintainAspectRatio: true }"
    />
    <CChartLine
      class="chart"
      :datasets="[
        {
          label: 'Data One',
          backgroundColor: 'rgb(228,102,81,0.9)',
          data: [30, 39, 10, 50, 30, 70, 35],
        },
        {
          label: 'Data Two',
          backgroundColor: 'rgb(0,216,255,0.9)',
          data: [39, 80, 40, 35, 40, 20, 45],
        },
      ]"
      :labels="months"
      :options="{ maintainAspectRatio: true }"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.graph-container {
  flex-direction: column;
  justify-content: space-around;
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