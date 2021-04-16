<template>
  <header class="header flex-aligned">
    <h1 id="title">PC Health</h1>
    <div id="TheNavbar">
      <!-- Overview -->
      <router-link
        to="/overview"
        class="navbar-item flex-aligned"
        v-on:click.native="navSwitch(0)"
      >
        <font-awesome-icon icon="th" class="icons" />
        <p class="text">Overview</p>
      </router-link>

      <!-- METRICS -->
      <router-link
        to="/details"
        class="navbar-item flex-aligned"
        v-on:click.native="navSwitch(1)"
      >
        <font-awesome-icon icon="info-circle" class="icons" />
        <p class="text">Metrics</p>
      </router-link>

      <!-- GRAPHS -->
      <router-link
        to="/graphs"
        class="navbar-item flex-aligned"
        v-on:click.native="navSwitch(2)"
      >
        <font-awesome-icon icon="chart-line" class="icons" />
        <p class="text">Graphs</p>
      </router-link>

      <!-- NOTIFICATIONS -->
      <router-link
        to="/notifications"
        class="navbar-item flex-aligned"
        v-on:click.native="navSwitch(3)"
      >
        <font-awesome-icon icon="bell" class="icons" />
        <p class="text">Notifications</p>
      </router-link>
      
      <!-- SETTINGS -->
      <router-link
        to="/settings"
        class="navbar-item flex-aligned"
        v-on:click.native="navSwitch(4)"
      >
        <font-awesome-icon icon="cog" class="icons" />
        <p class="text">Settings</p>
      </router-link>


    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      lastnavSwitched: 0,
    };
  },
  methods: {
    navSwitch(btn_num) {
      if (btn_num != this.lastnavSwitched) {
        var lastBtn = document.getElementsByClassName("navbar-item")[
          this.lastnavSwitched
        ];
        lastBtn.style.boxShadow = "";
        lastBtn.style.webkitBoxShadow = "";
      }
      this.lastnavSwitched = btn_num;
      var btn = document.getElementsByClassName("navbar-item")[btn_num];
      btn.style["boxShadow"] = "inset 0px 0px 5px black";
      btn.style.webkitBoxShadow = "inset 0px 0px 5px black";
    },
  },
  mounted() {
    this.navSwitch(0);
  },
};
</script>

<style scoped>
.header {
  height: 8%;
  border-bottom: solid 1px var(--spacer-color);
}

#title {
  font-weight: 600;
  flex: 1;
  margin: 0;
}

#TheNavbar {
  flex: 2;
  display: flex;
  justify-content: space-around;
  padding: 5px;
}

.navbar-item {
  border: none;
  border-radius: 30px;
  padding: 10px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  color: var(--background-color);
}
.navbar-item:hover {
  cursor: pointer;
}

.icons {
  margin-right: 10px;
}

.text {
  margin: 0px;
}
</style>
