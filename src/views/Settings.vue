<template>
    <div class="settings">
        <!--      -->
        <!-- Tabs -->
        <!--      -->
        <div class="tab-group">
            <router-link
                class="tab"
                to="/settings/app"
                v-on:click.native="activetab = 1"
                v-bind:class="[activetab === 1 ? 'active' : '']"
            >
                Monitoring App
            </router-link>

            <div
                class="tab"
                to="/settings/tags"
                v-on:click="activetab = 2"
                v-bind:class="[activetab === 2 ? 'active' : '']"
            >
                Tags
            </div>
        </div>

        <!-- Tab Content -->
        <div class="content-group">
            <div v-if="activetab === 1" class="tabcontent">
                <!-- Monitoring App -->
                <router-view class="sub-content" />
            </div>
            <div v-if="activetab === 2" class="tabcontent">
                <!-- tags -->
                <router-view class="sub-content" />
            </div>
        </div>

        <!-- Organization Modal Login -->
        <b-modal
            ref="orgLogin"
            title="Organization Login"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <form @submit.stop.prevent="handleSubmit">
                <!-- Username -->
                <b-form-group
                    label="Username"
                    label-for="username-input"
                    invalid-feedback="Username is required"
                    :state="nameState"
                >
                    <b-form-input
                        ref="username"
                        id="username-input"
                        v-model="username"
                        :state="nameState"
                        required
                    ></b-form-input>
                </b-form-group>

                <!-- password -->
                <b-form-group
                    label="Password"
                    label-for="password-input"
                    invalid-feedback="Password is required"
                    :state="passState"
                >
                    <b-form-input
                        ref="password"
                        id="password-input"
                        v-model="password"
                        :state="passState"
                        required
                    ></b-form-input>
                </b-form-group>
                <p v-if="invalid" style="color: red; text-align: center">
                    Invalid Login Credentials
                </p>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Settings",

    data() {
        return {
            //tabs
            activetab: 1,

            //Modal info
            username: "",
            nameState: null,
            password: "",
            passState: null,
            submittedInfo: [],
            invalid: false,
        };
    },

    methods: {
        // Modal is reset everytime it opens/closes
        resetModal() {
            this.username = "";
            this.nameState = null;
            this.password = "";
            this.passState = null;
            this.invalid = false;
        },
        // Cancel -> revert
        handleCancel() {
            this.invalid = false;
            this.activetab = 1;
        },
        // OK -> check if valid ? submit : revert
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // hide previous invalid msg
            this.invalid = false;
            // Trigger submit handler
            this.handleSubmit();
        },
        //check if input is correct
        checkFormValidity() {
            const nvalid = this.$refs.username.checkValidity();
            const pvalid = this.$refs.password.checkValidity();
            this.nameState = nvalid;
            this.passState = pvalid;
            return nvalid && pvalid;
        },
        // decides what to do if the data is valid or invalid
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                this.activetab = 1;
                return;
            }
            fetch(
                process.env.VUE_APP_ORG_LOGIN +
                    `Email=${this.username}&Password=${this.password}`,
                {
                    method: "GET",
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        this.activetab = 1;
                        this.invalid = true;
                        return;
                    } else {
                        // Login Succeeded
                        this.$LoggedInOrg = true;
                        this.$nextTick(() => {
                            this.$refs["orgLogin"].hide();
                        });

                        //redirect to tag page
                        this.$router.push("/settings/tags");
                    }
                })
                .catch((err) => {
                    console.log("Unexpected Error!\n" + err);
                });
        },
    },

    watch: {
        //ask for login if first time opening tag settings or login didnt work
        activetab(newValue) {
            if (newValue === 2 && !this.$LoggedInOrg) {
                this.$refs["orgLogin"].show();
            } else if (newValue === 2 && this.$LoggedInOrg) {
                //case where user has logged in before in the session
                this.$router.push("/settings/tags");
            }
        },

        submittedInfo(newValue) {
            console.log("User auth: " + newValue);
        },
    },
};
</script>

<style scoped>
</style>
