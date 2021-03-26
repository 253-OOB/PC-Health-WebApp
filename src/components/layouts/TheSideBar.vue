<template>
  <div id="TheSidebar">
    <!-- Overview -->
    <router-link
      to="/TheContainer/Overview"
      class="sidebar-item flex-aligned"
      v-on:click.native="btnClick(0)"
    >
      <font-awesome-icon icon="th" class="icons" />
      <p class="text">Overview</p>
    </router-link>

    <!-- METRICS -->
    <router-link
      to="/TheContainer/Details"
      class="sidebar-item flex-aligned"
      v-on:click.native="btnClick(1)"
    >
      <font-awesome-icon icon="info-circle" class="icons" />
      <p class="text">Metrics</p>
    </router-link>

    <!-- GRAPHS -->
    <router-link
      to="/TheContainer/Graphs"
      class="sidebar-item flex-aligned"
      v-on:click.native="btnClick(2)"
    >
      <font-awesome-icon icon="chart-line" class="icons" />
      <p class="text">Graphs</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TheSideBar",
  data() {
    return {
      lastBtnClicked: 0,
    };
  },
  methods: {
    btnClick(btn_num) {
      if (btn_num != this.lastBtnClicked) {
        var lastBtn = document.getElementsByClassName("sidebar-item")[
          this.lastBtnClicked
        ];
        lastBtn.style.boxShadow = "";
        lastBtn.style.webkitBoxShadow = "";
      }
      this.lastBtnClicked = btn_num;
      var btn = document.getElementsByClassName("sidebar-item")[btn_num];
      btn.style["boxShadow"] = "inset 0px 0px 10px black";
      btn.style.webkitBoxShadow = "inset 0px 0px 10px black";
    },
  },
  mounted() {
    this.btnClick(0);
  },
};
</script>

<style scoped>
#TheSidebar {
  background: #636f83;
  display: flex;
  padding: 10px;
  width: fit-content;
  flex-direction: column;
}

.sidebar-item {
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 30px;
  justify-content: space-around;
  background-color: white;
  outline: none;
  font: inherit;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  color: #636f83;
}
.sidebar-item:hover {
  cursor: pointer;
}

.icons {
  margin-right: 5px;
}

.text {
  margin: 0px;
}

/* .sidebar-item :nth-child(1) {
  color: grey;
  font-size: 1.33em;
}
.sidebar-item :nth-child(2) {
  color: grey;
  margin-left: 20px;
} */
</style>