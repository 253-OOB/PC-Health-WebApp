<template>
  <header class="header flex-aligned">
    <h1 id="header-title">
      <p>PC Health</p>
      PC Health
    </h1>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    headerEffect() {
      const header = document.getElementsByClassName("header")[0];
      const headerHeight = header.offsetHeight;
      const HeaderWidth = header.offsetWidth;
      const title = document.getElementById("header-title");
      title.onmousemove = function (e) {
        let x = e.pageX - HeaderWidth / 2;
        let y = e.pageY - headerHeight / 2;
        let rad = Math.atan2(y, x).toFixed(2);
        let length = Math.round(
          Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 10
        );
        let x_shadow = Math.round(length * Math.cos(rad));
        let y_shadow = Math.round(length * Math.sin(rad));
        title.style.setProperty("--x-shadow", -x_shadow + "px");
        title.style.setProperty("--y-shadow", -y_shadow + "px");
      };
    },
  },
  mounted() {
    this.headerEffect();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0px 20px 0px;
  height: 10%;
  border-bottom: solid 1px #ced2d8;
}

#header-title {
  font-weight: 600;
  --x-shadow: 0;
  --y-shadow: 0;
  --x: 50%;
  --y: 50%;
  transition: all 0.2s ease;
  position: relative;
  padding: 2rem;
}

.header #header-title:hover {
  transition: all 0.2s ease;
  text-shadow: var(--x-shadow) var(--y-shadow) 10px #1a1a1a;
}
.header #header-title p {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-image: radial-gradient(
    circle closest-side,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  background-position: var(--x) var(--y);
  background-repeat: no-repeat;
  text-shadow: none;
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: transparent;
  transition: all 0.1s ease;
}
</style>