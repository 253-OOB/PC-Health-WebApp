<template>
    
    <div class="login-form">
        
        <h2 class="login-heading">Login</h2>

        <form action="#" @submit.prevent="login">

            <div class="form-control">
                <label for="email">Username/Email</label>
                <input type="email" name="username" id="username" class="login-input" v-model="username">
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit-login">Login</button>
            </div>

        </form>

    </div>


</template>

<script>

    export default {

        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {

            login() {

                const url = "https://pchealth-login.azurewebsites.net/api/fLoginAdmin?" + this.constructQueryString();

                fetch( url ).then( (res) => {

                    if(res.status == 200) {
                        return res.json();
                    }

                }).then( (json) => {

                    this.$session.RefreshToken = json.refreshToken;
                    this.$session.LoggedIn = true;
                    document.cookie = `AccessToken=${json.accessToken}`;

                    if( "redirect" in this.$route.redirect ) {
                        this.$router.push(this.$route.redirect);
                    } else {
                        this.$router.push("/");
                    }

                }).catch( (err) => {

                    // Handle the cases for errors.
                    console.log(err);
                });

            },
            constructQueryString() {
                if ( this.username.includes("@") ) {
                    return `Email=${this.username}&Password=${this.password}`;
                } else {
                    return `Username=${this.username}&Password=${this.password}`;
                }
            }

        }

    }

</script>

<style scoped>
    
</style>