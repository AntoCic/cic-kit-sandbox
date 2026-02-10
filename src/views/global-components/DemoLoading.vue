<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "@src/utils/CodeBlock.vue";
import { Btn, loading } from "cic-kit";

// se vuoi, puoi tipizzare il risultato che “fingi” di caricare
type FakeResult = { ok: true; ts: number };

function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Questa funzione è quella che passi a CodeBlock con @run
 * e garantisce che il loader resti visibile almeno 5s.
 */
async function runDemo() {
    const res = await loading.run<FakeResult>(
        async () => {
            await sleep(5000); // <-- almeno 5 secondi
            return { ok: true, ts: Date.now() };
        },
        "Demo: caricamento forzato 5s…"
    );

    // esempio: potresti fare qualcosa col risultato
    console.log("FakeResult:", res);
}
const isOn = computed(() => loading.state);

const codeOn = `
loading.on('keyTest');
loading.on('keyTest','Caricamento');

loading.off('keyTest');
`

const codeRun = `
async function runDemo() {
  await loading.run(async () => {
    await sleep(5000) // minimo 5 secondi
  }, "Demo: caricamento forzato 5s…")
}
`


const defaultMsg = computed(() =>
    JSON.stringify(loading.defaultMsg, null, 2)
);

</script>

<template>
    <div class="p-3 border rounded">
        <h5 class="mb-2">Demo loading reactive</h5>

        <div v-if="isOn" class="alert alert-info d-flex align-items-center gap-2 mb-3" role="alert">
            <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
            <div class="fw-semibold">{{ loading.msg }}</div>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-3">
            <Btn color="primary" variant="solid"
                @click="loading.on('test','Se vuoi chiudere il loader devi aggiornare la pagina')">loading.on()</Btn>
            <Btn color="secondary" variant="outline" @click="loading.off('test')">loading.off()</Btn>
            <Btn color="success" variant="solid" @click="runDemo()">loading.run() (5s)</Btn>
        </div>

        <p class="mb-0">loading.defaultMsg</p>
        <CodeBlock lang="json" :code="defaultMsg">
        </CodeBlock>

        <CodeBlock ts @run="runDemo" class="mt-3">
            {{ codeOn }}
        </CodeBlock>
        <CodeBlock ts @run="runDemo" class="mt-3">
            {{ codeRun }}
        </CodeBlock>
    </div>
</template>
