import { createApp } from "vue";
import App from "./App.vue";
// import * as bootstrap from 'bootstrap';
import { router } from "./router";
import "./main.scss";
import { setupFirebase, initAuth, _CurrentUser } from "cic-kit";
import { firebaseConfig } from "./firebase-config";

setupFirebase(firebaseConfig);
export const Auth = initAuth(_CurrentUser);

const app = createApp(App);
app.use(router);
app.mount("#app");
