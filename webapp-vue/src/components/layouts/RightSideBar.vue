<template>
  <div id="sidebar">
    <button class="sidebar-item" @click="btnClick(0)">
      <span> <font-awesome-icon icon="th" class="icons" /> </span>
      <p>Overview</p>
    </button>
    <button class="sidebar-item" @click="btnClick(1)">
      <span> <font-awesome-icon icon="info-circle" class="icons" /> </span>
      <p>Metrics</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "RightSideBar",
  data() {
    return {
      lastBtnClicked: -1,
    };
  },
  methods: {
    btnClick(btn_num) {
      if (btn_num != this.lastBtnClicked && this.lastBtnClicked != -1) {
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
};
</script>

<style scoped>
#sidebar {
  height: 100%;
  width: fit-content;
  border-left: solid black 1px;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

button {
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
button:hover {
  box-shadow: 0px 15px 20px grey;
}
button:active,
button:focus {
  /* -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1; */
  outline: none;
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