import { createApp } from "vue";
import App from "./App.vue";
// import * as bootstrap from 'bootstrap';
import { router } from "./router";
import "./main.scss";
import { setupFirebase, initAuth, _CurrentUser } from "cic-kit";
import { firebaseConfig, VAPID_PUBLIC_KEY } from "./firebase-config";

setupFirebase(firebaseConfig, VAPID_PUBLIC_KEY);
export const Auth = initAuth(_CurrentUser);

const app = createApp(App);
app.use(router);
app.mount("#app");
