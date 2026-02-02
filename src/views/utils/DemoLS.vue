<script setup lang="ts">
import { computed } from "vue";
import { LS, toast } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";


const KEY = LS.defaultKey.test;

// stato “live” del valore salvato
const currentValue = computed(() => LS.getParsed(KEY));
const currentJson = computed(() => JSON.stringify(currentValue.value ?? null, null, 2));

const example = `import { LS } from '@/utils/localStorage/LS'

const KEY = LS.defaultKey.appConfig

// salva in modo safe (JSON.stringify + try/catch)
LS.set(KEY, { featureFlag: true })

// legge in modo safe (JSON.parse + toast su errore)
const val = LS.getParsed(KEY)
console.log('val', val)
`

// piccole azioni da runnare nei CodeBlock
function runSetOk() {
    const val = { featureFlag: true, updatedAt: new Date().toISOString() };
    LS.set(KEY, val);
    toast.success("Salvato " + KEY);
}
const code_runSetOk = `
const val = { featureFlag: true, updatedAt: new Date().toISOString() };
LS.set(KEY, val);
toast.success("Salvato " + KEY);
    `

function runUpdate() {
    LS.update(KEY, { theme: "dark" });
    toast.info("Aggiornato " + KEY + " con theme=dark");
}
const code_runUpdate = `
LS.update(KEY, { theme: "dark" });
toast.info("Aggiornato " + KEY + " con theme=dark");
`

function runCorruptJson() {
    // scrivo volutamente una stringa NON JSON -> getParsed scatena safeParse + toast.logError
    localStorage.setItem(KEY, "{not valid json");
    toast.warning("Corrotto " + KEY + " (JSON invalido)");
    LS.getParsed(KEY); // trigger errore con toast.logError
}
const code_runCorruptJson = `
// scrivo volutamente una stringa NON JSON -> getParsed scatena safeParse + toast.logError
localStorage.setItem(KEY, "{not valid json");
toast.warning("Corrotto " + KEY + " (JSON invalido)");
LS.getParsed(KEY); // trigger errore con toast.logError
`

function runClearExcept() {
    LS.set(LS.defaultKey.isDev, true);
    LS.set(LS.defaultKey.debugMod, false);
    LS.clear([LS.defaultKey.isDev]); // preserva solo isDev
    toast.info("clear() eseguito (preservato solo " + LS.defaultKey.isDev);
}
const code_runClearExcept = `
LS.set(LS.defaultKey.isDev, true);
LS.set(LS.defaultKey.debugMod, false);
LS.clear([LS.defaultKey.isDev]); // preserva solo isDev
toast.info("clear() eseguito (preservato solo " + LS.defaultKey.isDev);
`
</script>

<template>
    <div class="p-3 border rounded">
        <h5 class="mb-2">LS — LocalStorage safe (demo run)</h5>

        <p class="text-muted mb-3">
            <strong>LS</strong> è un helper per localStorage con <code>JSON.stringify</code>/<code>JSON.parse</code>
            sicuri e <strong>toast</strong> automatici in caso di errori.
        </p>

        <div class="row g-3">
            <div class="col-12 ">
                <div class="border rounded p-2 bg-light h-100">
                    <div class="small text-muted mb-1">Chiave demo</div>
                    <div class="fw-semibold mb-2"><code>{{ KEY }}</code></div>

                    <div class="small text-muted mb-1">Valore attuale (LS.getParsed)</div>
                    <pre class="mb-0 small">{{ currentJson }}</pre>
                </div>
            </div>
        </div>

        <CodeBlock lang="ts" :code="example" class="mt-3" />

        <p class="mb-0">set OK</p>
        <CodeBlock lang="ts" :code="code_runSetOk" @run="runSetOk" class="mt-3" />

        <p class="mb-0">update</p>
        <CodeBlock lang="ts" :code="code_runUpdate" @run="runUpdate" class="mt-3" />

        <p class="mb-0">corrompi JSON</p>
        <CodeBlock lang="ts" :code="code_runCorruptJson" @run="runCorruptJson" class="mt-3" />

        <p class="mb-0">clear (except isDev)</p>
        <CodeBlock lang="ts" :code="code_runClearExcept" @run="runClearExcept" class="mt-3" />
    </div>
</template>
