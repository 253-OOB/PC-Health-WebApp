<template>
  <div id="details">
      <b-table
        fixed
        striped
        hover
        :items="leafData"
        :fields="fields"
        :filter="keyword"
        :per-page="perPage"
        :current-page="currentPage"
      >
      </b-table>

      <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      ></b-pagination>
    </div>
</template>

<script>
import FleafDataJ from "@/components/json/formattedMLD.json";

export default {
  data() {
    return {
      // used for pagination
      perPage: 12,
      currentPage: 1,
      // url: process.env.VUE_APP_POSTMAN_BASE_URL,
      keyword: "",
      fields: [
        {
          label: "Names",
          key: "LeafNames",
          sortable: true,
        },
        {
          label: "RAM",
          key: "RAM",
          sortable: true,
        },
        {
          label: "Drive",
          key: "Name1",
          sortable: true,
        },
        {
          label: "Total Size",
          key: "Size1",
          sortable: true,
        },
        {
          label: "Free Space",
          key: "FreeSpace1",
          sortable: true,
        },
        {
          label: "Load%",
          key: "CurrentLoadPercentage",
          sortable: true,
        },
      ],
      leafData: FleafDataJ,
    };
  },
  computed: {
    rows() {
      return this.leafData.length
    }
  }
};
// watch: {
//   obj(newValue) {
//     this.leafData = newValue;
//   },
// },
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
