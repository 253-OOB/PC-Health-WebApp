<template>
    <div class="wrapper">
        <h1 class="title">PC Health</h1>

        <div class="login-main">
            <h2 class="login-heading">Login</h2>
            <!-- Username -->
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
                <!-- Password -->
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
            </form>
            <!-- Submit Button -->
            <button type="submit" v-on:click="hideMsg(), login()">Login</button>
            <!-- lOADING ICON -->
            <div id="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <!-- ERROR MSG -->
            <h2 id="err-msg">Invalid Login</h2>
        </div>
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
                process.env.VUE_APP_ADMIN_LOGIN + this.constructQueryString();

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
                    this.$router.push("/");
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
            //hide err
            document.getElementById("err-msg").style.display = "none";
            //show load
            document.getElementById("lds-ring").style.display = "block";
        },

        showMsg() {
            //show err
            document.getElementById("err-msg").style.display = "block";
            //hide load
            document.getElementById("lds-ring").style.display = "none";
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

.login-main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-heading {
    text-align: center;
    margin-bottom: 30px;
}

form {
    width: 500px;
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

button {
    margin: 30px;
    padding: 5px 100px;
    border-radius: 10px;
}

/* error message */
#err-msg {
    display: none;
    color: rgb(160, 1, 1);
}

/* Loading icon */
#lds-ring {
    display: none;
    width: 80px;
    height: 80px;
}

#lds-ring > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid black;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: black transparent transparent transparent;
}
#lds-ring > div:nth-child(1) {
    animation-delay: -0.45s;
}
#lds-ring > div:nth-child(2) {
    animation-delay: -0.3s;
}
#lds-ring > div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
