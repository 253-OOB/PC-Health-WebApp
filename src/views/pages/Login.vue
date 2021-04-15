<template>
  <div class="wrapper">
    <h1 class="title">PC Health</h1>

    <div class="login-form">
      <h2 class="login-heading">Login</h2>

      <form action="#" @submit.prevent="login">
        <div class="form-control">
          <label for="email">Username/Email</label>
          <input
            type="email"
            name="username"
            id="username"
            class="login-input"
            v-model="username"
          />
        </div>

        <div class="form-control mb-more">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            class="login-input"
            v-model="password"
          />
        </div>

        <div class="form-control">
          <button type="submit" class="btn-submit-login" v-on:click="hideMsg()">
            Login
          </button>
        </div>
      </form>
    </div>

    <h2 id="err-msg">Invalid Login</h2>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const url =
        "https://pchealth-login.azurewebsites.net/api/fLoginAdmin?" +
        this.constructQueryString();

      fetch(url)
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((json) => {
          this.$session.RefreshToken = json.refreshToken;
          this.$session.LoggedIn = true;
          document.cookie = `AccessToken=${json.accessToken}`;

          if ("redirect" in this.$route.query) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          // Handle the cases for errors.
          console.log(err);
          this.showMsg();
        });
    },

    constructQueryString() {
      if (this.username.includes("@")) {
        return `Email=${this.username}&Password=${this.password}`;
      } else {
        return `Username=${this.username}&Password=${this.password}`;
      }
    },

    hideMsg() {
      document.getElementById("err-msg").style.display = "none";
    },

    showMsg() {
      document.getElementById("err-msg").style.display = "block";
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Barlow", sans-serif;
  color: black;
}

.title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

form {
  width: 500px;
}

.login-heading {
  text-align: center;
  margin-bottom: 30px;
}

.form-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border: 3px solid #ced2d8;
}

.form-control > input {
  border: 2px solid #8f9092;
}

.form-control:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.form-control:last-child > button {
  margin-top: 30px;
  padding: 5px 100px;
  border-radius: 10px;
}

#err-msg {
  display: none;
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  color: rgb(160, 1, 1);
}
</style>
