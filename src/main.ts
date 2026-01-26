import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./main.scss";
import { setupFirebase } from "cic-kit";
import { firebaseConfig } from "./firebase-config";

setupFirebase(firebaseConfig);
const app = createApp(App);

app.use(router);
app.mount("#app");
