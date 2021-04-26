<template>
    <div class="MonitoringApp">
        <div class="instructions">
            <h1>Instructions for Installing Leaf App:</h1>
            <p>Clicking on "INSTALL APP" will download two files:</p>
            <ul>
                <li>leafapp.zip</li>
                <li>leaf.json</li>
            </ul>
            <p>
                After extracting leafapp.zip, <br />
                copy and paste the leaf.json file in the "config" folder
            </p>
        </div>
        <button class="btn" v-on:click="installApp()">Install App</button>
    </div>
</template>

<script>
export default {
    name: "MonitoringApp",

    methods: {
        installApp() {
            // window.open(process.env.VUE_APP_API_INSTALL, "_blank");
            fetch(process.env.VUE_APP_API_INSTALL)
                .then((response) => {
                    return response.blob();
                })
                .then((response) => {
                    let binarydata = [];
                    console.log(response);
                    binarydata.push(response);

                    const a = document.createElement("a");
                    a.href = window.URL.createObjectURL(
                        new Blob(binarydata, {
                            type: "application/octet-stream",
                        })
                    );
                    // Give filename you wish to download
                    a.download = "leafapp.zip";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                })
                .catch((err) => {
                    console.error("Error downloading leafapp: " + err);
                });

            const AccToken = this.$store.state.AccessToken;
            const RefToken = this.$store.state.RefreshToken;
            fetch(
                process.env.VUE_APP_API_INSTALL_CONFIG +
                    this.$store.state.organizationID,
                {
                    method: "POST",
                    body: JSON.stringify({
                        AccessToken: AccToken,
                        RefreshToken: RefToken,
                    }),
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    let binarydata = [];
                    binarydata.push(response["initFile"]);

                    const a = document.createElement("a");
                    a.href = window.URL.createObjectURL(
                        new Blob(binarydata, { type: "application/json" })
                    );
                    // Give filename you wish to download
                    a.download = "leaf.json";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                })
                .catch((err) => {
                    console.error("Error downloading config file: " + err);
                });
        },
    },
};
</script>

<style scopped>
.instructions {
    color: white;
    /* text-align: center; */
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.btn {
    border: none;
    border-radius: 30px;
    padding: 10px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease 0s;
    background-color: white;
    color: var(--background-color);
}
.btn:hover {
    cursor: pointer;
    background-color: var(--font-color);
    background-color: var(--spacer-color);
}
</style>