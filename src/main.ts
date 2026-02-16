import { createApp } from "vue";
import App from "./App.vue";
// import * as bootstrap from 'bootstrap';
import { router } from "./router";
import "./main.scss";
import { setupFirebase, initAuth, _CurrentUser, initCicKitStore } from "cic-kit";
import { firebaseConfig, VAPID_PUBLIC_KEY } from "./firebase-config";
import pkg from '../package.json';

setupFirebase(firebaseConfig, VAPID_PUBLIC_KEY);
export const Auth = initAuth(_CurrentUser);
initCicKitStore({packageJson:pkg})

const app = createApp(App);
app.use(router);
app.mount("#app");
