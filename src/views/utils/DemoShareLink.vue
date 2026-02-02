<script setup lang="ts">
import { computed, ref } from "vue";
import { copyToClipboard, shareLink, toast, type ShareLink } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";

const demoUrl = ref("https://example.com/cic-kit");
const demoTitle = ref("Condividi cic-kit");
const demoText = ref("Dai un occhio a cic-kit 🚀");

// payload “live”
const payload = computed<ShareLink>(() => ({
    url: demoUrl.value,
    title: demoTitle.value,
    text: demoText.value,
}));

const payloadJson = computed(() => JSON.stringify(payload.value, null, 2));

// snippet “docs”
const example = `import { shareLink, type ShareLink } from "cic-kit";

const payload: ShareLink = {
  url: "https://example.com/cic-kit",
  title: "Condividi cic-kit",
  text: "Dai un occhio a cic-kit 🚀",
};

await shareLink(payload);
`;

// runnabile
async function runShare() {
    await shareLink(payload.value);
}

const code_runShare = `await shareLink({
  url: demoUrl,
  title: demoTitle,
  text: demoText,
});`;

// nota: questo snippet è “descrittivo” (non serve run)
const snippetBehavior = `// Comportamento:
// - Se navigator.share è disponibile: apre il native share
//   - Se l'utente annulla o fallisce: copia url negli appunti + toast "Link copiato..."
// - Se navigator.share NON è disponibile: copia url negli appunti + toast`;
</script>

<template>
    <div class="p-3 border rounded">
        <h5 class="mb-2">shareLink — Web Share API con fallback</h5>

        <p class="text-muted mb-3">
            <strong>shareLink</strong> prova la <code>Web Share API</code> (se disponibile).
            In fallback copia l’URL negli appunti e mostra un <strong>toast</strong>.
        </p>

        <div class="row g-3">
            <div class="col-12 col-lg-6">
                <label class="form-label mb-1">URL</label>
                <input v-model="demoUrl" type="text" class="form-control" />
            </div>

            <div class="col-12 col-lg-3">
                <label class="form-label mb-1">Title</label>
                <input v-model="demoTitle" type="text" class="form-control" />
            </div>

            <div class="col-12 col-lg-3">
                <label class="form-label mb-1">Text</label>
                <input v-model="demoText" type="text" class="form-control" />
            </div>
        </div>

        <div class="border rounded p-2 bg-light mt-3">
            <div class="small text-muted mb-1">Payload (ShareLink)</div>
            <pre class="mb-0 small">{{ payloadJson }}</pre>
        </div>

        <div class="mt-3">
            <CodeBlock lang="ts" :code="example" />
        </div>

        <p class="mb-0 mt-3">Prova (run)</p>
        <CodeBlock lang="ts" :code="code_runShare" @run="runShare" class="mt-2" />

        <div class="mt-3">
            <CodeBlock lang="ts" :code="snippetBehavior" />
        </div>

        <div class="d-flex flex-wrap gap-2 mt-3">
            <Btn color="primary" variant="solid" @click="runShare" icon="share">Condividi</Btn>
            <Btn color="secondary" variant="outline" icon="content_copy"
                @click="async () => { copyToClipboard(demoUrl); toast.success('Link copiato negli appunti'); }">
                Copia URL
            </Btn>
        </div>

        <small class="text-muted d-block mt-2">
            💡 Su desktop spesso non esiste <code>navigator.share</code>: vedrai direttamente il fallback “copia negli
            appunti”.
            Su mobile compatibili, invece, si apre il pannello di condivisione.
        </small>
    </div>
</template>
