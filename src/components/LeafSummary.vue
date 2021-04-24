<template>
    <div class="LeafSummary">
        <div
            @click="showModal"
            @contextmenu.prevent="$refs.menu.open"
            @click.right="checkIfTagsExist"
            id="leaf-wrapper"
        >
            <div class="title flex-aligned">
                <span>{{ metrics.AssignedName }}</span>
            </div>
            <div class="leaf-tags-grp">
                <div
                    class="leaf-tag"
                    v-for="(tag, index) in assignedTagNames"
                    :key="index"
                >
                    {{ tag }}
                </div>
            </div>
        </div>

        <!--                               -->
        <!-- Modal for Notification Config -->
        <!--                               -->
        <b-modal
            centered
            ref="config"
            :title="modalTitle"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form @submit.stop.prevent="handleSubmit">
                <!-- Title -->
                <b-form-group
                    label="Title"
                    label-for="title-input"
                    invalid-feedback="Title is required"
                >
                    <b-form-input
                        ref="notifTitle"
                        id="title-input"
                        v-model="notifTitle"
                        :state="titleState"
                        required
                    ></b-form-input>
                </b-form-group>

                <!-- Content -->
                <b-form-group
                    label="Content"
                    label-for="content-input"
                    invalid-feedback="Content is required"
                >
                    <b-form-input
                        ref="notifContent"
                        id="content-input"
                        v-model="notifContent"
                        :state="contentState"
                        required
                    >
                    </b-form-input>
                </b-form-group>

                <!-- Dropdowns -->
                <div class="flex-aligned" style="justify-content: space-around">
                    <!-- Metric -->
                    <b-form-group
                        id="metric-wrapper"
                        invalid-feedback="Metric is required"
                    >
                        <b-form-select
                            ref="notifMetric"
                            v-model="notifMetric"
                            :options="metricOptions"
                            :state="metricState"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled
                                    >-- Metric --</b-form-select-option
                                >
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <!-- Operator -->
                    <b-form-group
                        id="operator-wrapper"
                        invalid-feedback="Operator is required"
                    >
                        <b-form-select
                            ref="notifOperator"
                            v-model="notifOperator"
                            :options="operatorOptions"
                            :state="operatorState"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled
                                    >-- Operator --</b-form-select-option
                                >
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <!-- Value -->
                    <b-form-group
                        id="value-wrapper"
                        invalid-feedback="Value is required"
                    >
                        <b-form-input
                            ref="notifValue"
                            v-model="notifValue"
                            :state="valueState"
                            required
                            placeholder="-- Value --"
                        >
                        </b-form-input>
                    </b-form-group>
                </div>
                <p v-if="invalidNotif" style="color: red; text-align: center">
                    Invalid Information Entered
                </p>
            </form>
        </b-modal>

        <!--                       -->
        <!-- Context Menu for Tags -->
        <!--                       -->
        <vue-context ref="menu">
            <li>
                <a
                    v-for="(tag, index) in this.$store.state.tags"
                    :key="index"
                    href="#"
                    @click.prevent="onTagClick(tag)"
                >
                    {{ tag["TagName"] }}</a
                >
            </li>
        </vue-context>
    </div>
</template>

<script>
import VueContext from "vue-context";
import "vue-context/dist/css/vue-context.css";

export default {
    name: "LeafSummary",
    components: {
        VueContext,
    },
    props: {
        metrics: Object,
        index: Number,
    },
    data() {
        return {
            // ---------- //
            // Modal Menu //
            // ---------- //
            // Modal meta info
            modalTitle: "",
            titleState: null,
            contentState: null,
            valueState: null,
            metricState: null,
            operatorState: null,
            // Modal content
            notifTitle: "",
            notifContent: "",
            notifMetric: null,
            notifOperator: null,
            notifValue: "",
            metricOptions: [
                { value: 1, text: "Percent Processor Time (%)" },
                { value: 2, text: "I/O Disk (B/s)" },
                { value: 3, text: "Available Disk Space (GB)" },
                { value: 3, text: "Available RAM (MB)" },
            ],
            operatorOptions: [
                { value: 1, text: "=" },
                { value: 2, text: ">" },
                { value: 3, text: "<" },
            ],
            invalidNotif: false,

            // ---- //
            // Tags //
            // -----//
            assignedTagNames: [],
        };
    },
    methods: {
        // ----------- //
        // Notif Modal //
        // ----------- //
        checkOffline(index) {
            let elem = document.getElementsByClassName("title")[index];
            if (!this.metrics.isOnline) {
                elem.style.backgroundColor = "rgb(157, 165, 177)"; //red
            } else {
                elem.style.backgroundColor = "rgb(36, 255, 54)"; //blue
            }
        },
        showModal() {
            this.modalTitle =
                "Notification Configuration for " + this.metrics.AssignedName;
            this.$refs["config"].show();
        },
        resetModal() {
            // Modal is reset everytime it opens/closes
            (this.notifTitle = ""),
                (this.notifContent = ""),
                (this.notifMetric = null);
            this.notifOperator = null;
            this.notifValue = "";

            (this.titleState = null),
                (this.contentState = null),
                (this.metricState = null);
            this.operatorState = null;
            this.valueState = null;
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault(); // Prevent modal from closing
            this.handleSubmit();
        },
        checkFormValidity() {
            //check if input is correct
            this.titleState = this.$refs.notifTitle.checkValidity();
            this.contentState = this.$refs.notifContent.checkValidity();
            this.metricState = this.notifMetric !== null;
            this.operatorState = this.notifOperator !== null;
            this.valueState = this.$refs.notifValue.checkValidity();
            return (
                this.titleState &&
                this.contentState &&
                this.metricState &&
                this.operatorState &&
                this.valueState
            );
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Submit post request if form is valid
            fetch(
                process.env.VUE_APP_CREATE_NOTIF +
                    "LeafID=" +
                    this.metrics.LeafID,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: this.$store.state.AccessToken,
                        RefreshToken: this.$store.state.RefreshToken,
                        notification: {
                            "this.notifMetric": {
                                Title: this.notifTitle,
                                Content: this.notifContent,
                                Comparison: {
                                    operator: this.notifOperator,
                                    value: this.notifValue,
                                },
                            },
                        },
                    }),
                }
            )
                .then((response) => {
                    if (response.status === 201) {
                        // Notification Creation Succeeded
                        this.invalidNotif = false;
                        this.$nextTick(() => {
                            this.$refs["config"].hide();
                        });
                        return;
                    } else {
                        this.invalidNotif = true;
                    }
                })
                .catch((err) => {
                    this.invalidNotif = true;
                    console.log("Error Creating Notification\n" + err);
                });
        },

        // ------------ //
        // Context Menu //
        // ------------ //
        onTagClick(tag) {
            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;
            const leafID = this.metrics["LeafID"];
            const tagID = tag["TagID"];
            fetch(
                process.env.VUE_APP_API_ASSIGN_TAG +
                    "LeafID=" +
                    leafID +
                    "&TagID=" +
                    tagID,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error();
                    }
                    this.$getTags();
                    this.$forceUpdate();
                })
                .catch(() => {
                    alert(`Tag ${tag["TagName"]} is already assigned!`);
                });
        },
        checkIfTagsExist() {
            try {
                if (this.$store.state.tags === null) {
                    throw new Error("No Org");
                } else if (this.$store.state.tags.length < 1) {
                    throw new Error("0 Tags");
                }
            } catch (err) {
                if (err.message === "No Org") {
                    alert("Select an Organization first");
                } else if (err.message === "0 Tags") {
                    alert("Add Tags first (in Settings Page)");
                }
            }
        },

        // ---- //
        // Tags //
        // ---- //
        getAssignedTagNames() {
            try {
                const tagsToBeDisplayed = [];
                const allTags = this.$store.state.tags; //tags for the org
                this.metrics.tags.forEach((leafTag) => {
                    allTags.forEach((orgTag) => {
                        if (leafTag["TagID"] == orgTag["TagID"]) {
                            tagsToBeDisplayed.push(orgTag["TagName"]);
                        }
                    });
                });
                tagsToBeDisplayed.sort();
                this.assignedTagNames = tagsToBeDisplayed;
            } catch (err) {
                return;
            }
        },
    },
    created() {
        //track if tags update so we can redisplay other leafs
        this.unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === "updateTags") {
                console.log("New tag added detected");
                this.getAssignedTagNames();
            }
        });
    },
    beforeDestroy() {
        this.unsubscribe();
    },
    mounted() {
        this.checkOffline(this.index);
        this.getAssignedTagNames();
    },
};
</script>

<style scoped>
.LeafSummary {
    border: solid 2px #ced2d8;
    width: fit-content;
    text-align: start;
    margin: 30px;
    border-radius: 5px;
    box-shadow: 3px 5px 15px black;
    background-color: white;
}

#leaf-wrapper {
    width: 100%;
    height: 100%;
}

#title {
    color: white;
    font-size: 17px;
    font-weight: bold;
    height: 30%;
}

.leaf-tags-grp {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
}
.leaf-tag {
    border: solid 2px var(--spacer-color);
    border-radius: 10px;
    padding: 2px;
    margin: 10px 2px 0 0;
    height: 70%;
}

/* inside modal */
#metric-wrapper {
    width: 45%;
}
#operator-wrapper {
    width: 25%;
}
#value-wrapper {
    width: 20%;
}
</style>