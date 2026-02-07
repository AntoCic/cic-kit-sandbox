<script setup lang="ts">
import { ref } from "vue";
import CodeBlock from "@src/utils/CodeBlock.vue";
import { cicKitStore, Logo } from "cic-kit";

const demoLoading = ref(false);

const code_basic = `<Logo src="/img/logo/logo.png" />`;

const code_sizes = `<div class="d-flex flex-wrap align-items-center gap-3">
  <Logo src="/img/logo/logo.png" size="sm" />
  <Logo src="/img/logo/logo.png" size="md" />
  <Logo src="/img/logo/logo.png" size="lg" />
</div>`;

const code_shapes = `<div class="d-flex flex-wrap align-items-center gap-3">
  <Logo src="/img/logo/logo.png" logoShape="circle" />
  <Logo src="/img/logo/logo.png" logoShape="square" />
</div>`;

const code_loading = `<Logo src="/img/logo/logo.png" :loading="true" />`;

const code_backTo = `<Logo
  src="/img/logo/logo.png"
  :backTo="{ name: 'Getting started' }"
/>`;

const code_store_loading = `// forza loading globale (usato anche internamente da Logo)
cicKitStore.logoLoading = true;
setTimeout(() => (cicKitStore.logoLoading = false), 1200);`;

function toggleLoading() {
    demoLoading.value = !demoLoading.value;
}

function runStoreLoading() {
    cicKitStore.logoLoading = true;
    setTimeout(() => (cicKitStore.logoLoading = false), 1200);
    // toast?.info?.("logoLoading true per 1.2s");
}
</script>

<template>
    <div class="container py-3">
        <h2 class="mb-1">Logo</h2>
        <div class="text-muted mb-3">
            Esempi rapidi per: <b>src</b>, <b>size</b>, <b>logoShape</b>, <b>loading</b>, <b>backTo</b> e loading
            globale via
            <code>cicKitStore.logoLoading</code>.
        </div>

        <!-- BASE -->
        <div class="border rounded p-3 mb-3">
            <div class="fw-semibold mb-2">Base</div>

            <div class="d-flex align-items-center gap-3 mb-3">
                <Logo src="/img/logo/logo.png" />
            </div>

            <CodeBlock :code="code_basic" />
        </div>

        <!-- SIZE -->
        <div class="border rounded p-3 mb-3">
            <div class="fw-semibold mb-2">Size</div>

            <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
                <Logo src="/img/logo/logo.png" size="sm" />
                <Logo src="/img/logo/logo.png" size="md" />
                <Logo src="/img/logo/logo.png" size="lg" />
            </div>

            <CodeBlock :code="code_sizes" />
        </div>

        <!-- SHAPE -->
        <div class="border rounded p-3 mb-3">
            <div class="fw-semibold mb-2">logoShape</div>

            <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
                <div class="text-center">
                    <div class="small text-muted mb-1">circle</div>
                    <Logo src="/img/logo/logo.png" logoShape="circle" />
                </div>

                <div class="text-center">
                    <div class="small text-muted mb-1">square</div>
                    <Logo src="/img/logo/logo.png" logoShape="square" />
                </div>
            </div>

            <CodeBlock :code="code_shapes" />
        </div>

        <!-- LOADING -->
        <div class="border rounded p-3 mb-3">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div class="fw-semibold">loading</div>
                <Btn color="primary" variant="outline" icon="sync" @click="toggleLoading">
                    Toggle
                </Btn>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
                <div class="text-center">
                    <div class="small text-muted mb-1">static true</div>
                    <Logo src="/img/logo/logo.png" :loading="true" />
                </div>

                <div class="text-center">
                    <div class="small text-muted mb-1">demo state</div>
                    <Logo src="/img/logo/logo.png" :loading="demoLoading" />
                </div>
            </div>

            <CodeBlock :code="code_loading" />
        </div>

        <!-- BACK TO -->
        <div class="border rounded p-3 mb-3">
            <div class="fw-semibold mb-2">backTo</div>

            <div class="d-flex align-items-center gap-3 mb-3">
                <Logo src="/img/logo/logo.png" :backTo="{ name: 'Getting started' }" />
                <div class="small text-muted">
                    Se non sei in <code>/</code>, cliccando farà <code>router.push(backTo)</code>.
                    Se <code>backTo</code> non è passato, farà <code>router.back()</code>.
                    Se sei in home, ricarica la pagina.
                </div>
            </div>

            <CodeBlock :code="code_backTo" />
        </div>

        <!-- STORE LOADING -->
        <div class="border rounded p-3">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div class="fw-semibold">cicKitStore.logoLoading (globale)</div>
                <Btn color="secondary" variant="outline" icon="hourglass" @click="runStoreLoading">
                    Test 1.2s
                </Btn>
            </div>

            <div class="d-flex align-items-center gap-3 mb-3">
                <Logo src="/img/logo/logo.png" />
                <div class="small text-muted">
                    Il componente calcola <code>_loading</code> come
                    <code>props.loading || cicKitStore.logoLoading</code>.
                </div>
            </div>

            <CodeBlock lang="ts" :code="code_store_loading" @run="runStoreLoading" />
        </div>
    </div>
</template>
