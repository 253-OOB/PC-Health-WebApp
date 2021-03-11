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
        <b-button :disabled="!keyword" @click="keyword = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>

    <div id="table-container">
      <!-- Bootstrap Table -->
      <b-table
        sticky-header="100%"
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
          key: "LeafNames",
          sortable: true,
        },
        {
          key: "RAM",
          sortable: true,
        },
        {
          key: "Name1",
          sortable: true,
        },
        {
          key: "Size1",
          sortable: true,
        },
        {
          key: "Free",
          sortable: true,
        },
        {
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
  border: solid black 1px;
  max-height: 90%;
  overflow: scroll;
}
</style>
