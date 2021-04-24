<template>
    <div class="SettingsTags">
        <div class="form">
            <h3>Create a Tag</h3>
            <b-form-group
                label="Tag Name:"
                label-cols="auto"
                label-size="lg"
                label-for="Ctag-input"
                description="The created tag will be available to all PCs in the selected organiazation"
                :invalid-feedback="createInvalidMsg"
            >
                <b-form-input
                    id="Ctag-input"
                    v-model="createTagName"
                    trim
                    required
                    :state="createState"
                ></b-form-input>
            </b-form-group>
            <button v-on:click="createTag">Create Tag</button>
        </div>

        <div id="divider"></div>

        <div class="form">
            <h3>Delete a Tag</h3>
            <b-form-group
                label="Tag Name:"
                label-cols="auto"
                label-size="lg"
                label-for="Dtag-select"
                description="The tag will be removed as an option from all PCs in the selected organization"
            >
                <b-form-select
                    id="Dtag-select"
                    v-model="deleteTagName"
                    :options="deleteTagOptions"
                    required
                    ><template #first>
                        <b-form-select-option :value="null" disabled
                            >-- Tags --</b-form-select-option
                        >
                    </template>
                </b-form-select>
            </b-form-group>
            <button v-on:click="deleteTag">Delete Tag</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingsTags",
    data() {
        return {
            createTagName: "",
            deleteTagName: null,
            createInvalidMsg: "",
            deleteTagOptions: [],
            createState: null,
        };
    },

    methods: {
        createTag() {
            //reset form

            // validate form
            if (this.createTagName === "") {
                this.createState = false;
                this.createInvalidMsg = "Tag Name Required";
            }

            const orgToken = this.$store.state.organizationToken;
            const tagName = this.createTagName;
            fetch(process.env.VUE_APP_API_ADD_TAG + tagName, {
                method: "POST",
                body: JSON.stringify({
                    organisationToken: orgToken,
                }),
            })
                .then((response) => {
                    if (response.status === 500) {
                        //Tag already exists
                        this.createState = false;
                        this.createInvalidMsg = "Tag Name already exists";
                        return;
                    }
                    //if form is valid:
                    this.$getTags(); //add new tag to the rest
                    //tag was added succesfully
                    this.createTagName = "";
                    this.createState = true;
                })
                .catch((err) => {
                    console.error("Error Creating Tag: " + err);
                    return;
                });
        },

        deleteTag() {
            if (this.deleteTagName === null) {
                return;
            }
        },
    },
};
</script>

<style scopped>
.SettingsTags {
    height: 100%;
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: white;
}

#divider {
    border-bottom: 1px solid var(--spacer-color);
}

.form {
    padding: 10px;
}
</style>