<template>
  <div id="details">
    <!-- Searchbar -->
    <b-input-group size="lg">
      <b-form-input
        v-model="keyword"
        placeholder="Type to Search..."
        type="text"
      ></b-form-input>
      <b-input-group-append>
        <b-button id="clear-btn" :disabled="!keyword" @click="keyword = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>

    <div id="table-container">
      <b-table
        sticky-header="100%"
        fixed
        striped
        hover
        :items="leafData"
        :fields="fields"
        :filter="keyword"
      >
      </b-table>
    </div>
  </div>
</template>

<script>
import FleafDataJ from "../components/json/formattedMLD.json";

export default {
  data() {
    return {
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
}

#table-container {
  background-color: white;
  border: solid black 1px;
  height: 95%;
}

#clear-btn{
  background-color: #636f83;
}
</style>
