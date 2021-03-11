<template>
  <div>
    <router-link
      to="/TheContainer/Overview"
      class="router sidebar-item"
      v-on:click.native="btnClick(0)"
    >
      <span> <font-awesome-icon icon="th" class="icons" /> </span>
      <p>Overview</p>
    </router-link>
    <router-link
      to="/TheContainer/Details"
      class="router sidebar-item"
      v-on:click.native="btnClick(1)"
    >
      <span> <font-awesome-icon icon="info-circle" class="icons" /> </span>
      <p>Metrics</p>
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
      btn.style["boxShadow"] = "inset 0px 0px 5px #c1c1c1";
      btn.style.webkitBoxShadow = "inset 0px 0px 5px #c1c1c1";
    },
  },
  mounted() {
    this.btnClick(0);
  },
};
</script>

<style scoped>
.router {
  text-decoration: none;
  padding: 10px;
  font: inherit;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 8px 15px grey;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}
.router:hover {
  box-shadow: 0px 15px 20px grey;
}

.sidebar-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.sidebar-item :nth-child(1) {
  color: grey;
  font-size: 1.33em;
}
.sidebar-item :nth-child(2) {
  color: grey;
  margin-left: 20px;
}
</style>