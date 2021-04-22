<template>
    <div
        @click="showModal"
        @contextmenu.prevent="$refs.menu.open"
        id="leaf-wrapper"
    >
        <div class="title flex-aligned">
            <span>{{ metrics.LeafNames }}</span>
        </div>
        <div id="leaf-info">Lorem ipsum</div>

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
                <!-- TODO make tag list from endpoint -->
                <a href="#" @click.prevent="onClick($event.target.innerText)"
                    >Tag A</a
                >
            </li>
            <li>
                <a href="#" @click.prevent="onClick($event.target.innerText)"
                    >Tag B</a
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

            //Context Menu
            sharedState: { active: false },
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
    },
    mounted() {
        this.checkOffline(this.index);
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

#leaf-info {
    padding: 10px 7px 2px 5px;
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