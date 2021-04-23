<template>
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

        <!--                               -->
        <!-- Modal for Notification Config -->
        <!--                               -->
        <b-modal centered ref="config" :title="modalTitle">
            <form @submit.stop.prevent="handleSubmit">
                <!-- Title -->
                <b-form-group label="Title">
                    <b-form-input required></b-form-input>
                </b-form-group>

                <!-- Content -->
                <b-form-group label="Content">
                    <b-form-input required></b-form-input>
                </b-form-group>

                <!-- Dropdowns -->
                <div class="flex-aligned" style="justify-content: space-around">
                    <!-- Metric -->
                    <b-form-select
                        id="metric"
                        class="modal-dropdown"
                        v-model="metricSelected"
                        :options="metricOptions"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled
                                >-- Metric --</b-form-select-option
                            >
                        </template>
                    </b-form-select>
                    <!-- Operator -->
                    <b-form-select
                        id="operator"
                        class="modal-dropdown"
                        v-model="operatorSelected"
                        :options="operatorOptions"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled
                                >-- Operator --</b-form-select-option
                            >
                        </template>
                    </b-form-select>
                    <!-- Value -->
                    <b-form-input
                        id="value"
                        class="modal-dropdown"
                        v-model="valueSelected"
                        placeholder="-- Value --"
                    >
                    </b-form-input>
                </div>
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
                    @click.prevent="onClick(tag['TagID'])"
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
            //Modal Menu
            modalTitle: "",
            metricSelected: null,
            metricOptions: [
                { value: 1, text: "Percent Processor Time (%)" },
                { value: 2, text: "I/O Disk (B/s)" },
                { value: 3, text: "Available Disk Space (GB)" },
                { value: 3, text: "Available RAM (MB)" },
            ],
            operatorSelected: null,
            operatorOptions: [
                { value: 1, text: "=" },
                { value: 2, text: ">" },
                { value: 3, text: "<" },
            ],
            valueSelected: null,

            //Tags
            assignedTagNames: [],
        };
    },
    methods: {
        //Modal Menu
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
                "Notification Configuration for " + this.metrics.LeafNames;
            this.$refs["config"].show();
        },

        // Context Menu
        onclick(text) {
            alert(`You clicked ${text}!`);
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

        //Tags
        getAssignedTagNames() {
            try {
                const tagNames = [];
                const allTags = this.$store.state.tags;
                this.metrics.tags.forEach((tag) => {
                    if (tag["TagID"] == allTags[tag["TagID"] - 1]["TagID"]) {
                        tagNames.push(allTags[tag["TagID"] - 1]["TagName"]);
                    }
                });
                this.assignedTagNames = tagNames;
            } catch (err) {
                return;
            }
        },
    },
    created() {
        //track if tags update so we can redisplay other leafs
        this.unsubscribe = this.$store.subscribe((mutation) => {
            if (mutation.type === "updateTags") {
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
#leaf-wrapper {
    border: solid 2px #ced2d8;
    width: 150px;
    height: 70%;
    text-align: start;
    margin: 30px;
    border-radius: 5px;
    box-shadow: 3px 5px 15px black;
    background-color: white;
}

#title {
    color: white;
    font-size: 17px;
    font-weight: bold;
    height: 30%;
}

.leaf-tags-grp {
    display: flex;
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
.modal-dropdown {
    text-align: center;
}
#metric {
    width: 50%;
}
#operator {
    width: 20%;
}
#value {
    width: 20%;
}
</style>