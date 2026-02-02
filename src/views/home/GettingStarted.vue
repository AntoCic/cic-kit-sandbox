<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue';

const mainCode = `import { createApp } from "vue";
import App from "./App.vue";
import * as bootstrap from 'bootstrap';
import { router } from "./router";
import "./main.scss";
import { setupFirebase } from "cic-kit";
import { firebaseConfig } from "./firebase-config";

setupFirebase(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount("#app");
`;

const appScriptCode = `import { RouterView } from 'vue-router';
import HeaderApp from './layout/HeaderApp.vue'
import FooterApp from './layout/FooterApp.vue'
import { onMounted } from 'vue';
import { loading } from './components/loading/loadingController';
import LoaderCmp from './components/loading/LoaderCmp.vue';
import { currentUserStore } from './stores/currentUserStore';
import ToastCmp from './components/toast/ToastCmp.vue';
import ModalDev from './components/ModalDev/ModalDev.vue';
import { UserPermission } from './enum/UserPermission';
import { store } from './stores/store';
import RegisterSW from './components/RegisterSW.vue';

onMounted(() => {
  document.getElementsByClassName('starter-loader')?.[0]?.remove();
})`;
const appTemplateCode = `<template>
  <LoaderCmp v-if="currentUserStore.isLoginChecked ? loading.state : false" />
  <ToastCmp />
  <template v-if="currentUserStore.isLoginChecked">
    <HeaderApp />
    <main>
      <RouterView />
    </main>
    <FooterApp />
  </template>
<ModalDev v-if="currentUserStore.user?.hasPermission(UserPermission.MODAL_DEV_ON) && store.debugMod" />
<RegisterSW />
</template>

<style scoped lang="scss"></style>
`;

</script>

<template>
    <div class="container my-5">
        <!-- Header -->
        <header class="mb-5 text-center">
            <h1 class="fw-bold">Getting Started</h1>
            <p class="text-muted">
                Guida rapida per installare e configurare <strong>cic-kit</strong> con
                Vue 3, Vite e TypeScript
            </p>
        </header>

        <!-- Installazione -->
        <section class="mb-5">
            <h2 class="h4 mb-3">📦 Installazione</h2>

            <CodeBlock lang="bash">
                npm i cic-kit
            </CodeBlock>
        </section>

        <!-- Peer Dependencies -->
        <section class="mb-5">
            <h2 class="h4 mb-3">📚 Peer Dependencies</h2>
            <p class="text-muted">
                Queste dipendenze sono richieste da <strong>cic-kit</strong> e devono
                essere installate nel progetto.
            </p>

            <CodeBlock lang="bash">
                npm i @tiptap/core @tiptap/extension-code-block @tiptap/extension-heading \
                @tiptap/extension-link @tiptap/extension-placeholder \
                @tiptap/starter-kit @tiptap/vue-3 \
                bootstrap firebase vue vue-router vee-validate yup
            </CodeBlock>

            <CodeBlock lang="json">
                {
                "@tiptap/core": "^3.18.0",
                "@tiptap/extension-code-block": "^3.18.0",
                "@tiptap/extension-heading": "^3.18.0",
                "@tiptap/extension-link": "^3.18.0",
                "@tiptap/extension-placeholder": "^3.18.0",
                "@tiptap/starter-kit": "^3.18.0",
                "@tiptap/vue-3": "^3.18.0",
                "bootstrap": "^5.3.7",
                "firebase": "^12.0.0",
                "vue": "^3.3.0",
                "vue-router": "^4.0.0",
                "vee-validate": "^4.15.1",
                "yup": "^1.7.1"
                }
            </CodeBlock>
        </section>

        <!-- Dev Dependencies -->
        <section class="mb-5">
            <h2 class="h4 mb-3">🛠 Dev Dependencies</h2>

            <CodeBlock lang="bash">
                npm i -D @types/bootstrap @types/node @vitejs/plugin-vue \
                @vue/tsconfig firebase-secrets-cli sass typescript \
                vite vue-tsc
            </CodeBlock>

            <CodeBlock lang="json">
                {
                "@types/bootstrap": "^5.2.10",
                "@types/node": "^24.10.1",
                "@vitejs/plugin-vue": "^6.0.1",
                "@vue/tsconfig": "^0.8.1",
                "firebase-secrets-cli": "^1.0.2",
                "sass": "^1.77.0",
                "typescript": "~5.9.3",
                "vite": "^7.2.4",
                "vue-tsc": "^3.1.4"
                }
            </CodeBlock>
        </section>

        <!-- main.scss -->
        <section class="mb-5">
            <h2 class="h4 mb-3">🎨 Configurazione main.scss</h2>

            <CodeBlock lang="scss">
                @use "bootstrap/scss/bootstrap";
                @use "cic-kit/style";
            </CodeBlock>
        </section>

        <!-- main.ts -->
        <section class="mb-5">
            <h2 class="h4 mb-3">🔥 Configurazione Firebase (main.ts)</h2>

            <CodeBlock :code="mainCode" ts />
        </section>

        <!-- App.vue -->
        <section class="mb-5">
            <h2 class="h4 mb-3">🧩 Struttura base App.vue</h2>
            <CodeBlock :code="appScriptCode" ts />
            <CodeBlock :code="appTemplateCode" />
        </section>
    </div>
</template>
