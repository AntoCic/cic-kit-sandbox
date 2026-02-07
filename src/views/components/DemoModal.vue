<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "@src/utils/CodeBlock.vue";
import { Btn, toast } from "cic-kit";
import Modal from "./Modal.vue";

// =======================
// Stato demo
// =======================
const basicOpen = ref(false);

type Item = { id: number; name: string };
const items = ref<Item[]>([
    { id: 1, name: "Documento A" },
    { id: 2, name: "Documento B" },
    { id: 3, name: "Documento C" },
]);

const toRemove = ref<Item | null>(null);
const confirmOpen = ref(false);

const liveState = computed(() =>
    JSON.stringify(
        {
            basicOpen: basicOpen.value,
            confirmOpen: confirmOpen.value,
            toRemove: toRemove.value,
            items: items.value,
        },
        null,
        2
    )
); 

// =======================
// Azioni (run)
// =======================
function runOpenBasic() {
    basicOpen.value = true;
    toast.info("Apro la modal base");
}
function runCloseBasic() {
    basicOpen.value = false;
    toast.info("Chiudo la modal base");
}

function askRemove(item: Item) {
    toRemove.value = item;
    confirmOpen.value = true;
}
function runAskRemoveSecond() {
    const item = items.value[1];
    if (!item) return;
    askRemove(item);
    toast.warning(`Conferma rimozione: ${item.name}`);
}

async function onConfirmRemove() {
    if (!toRemove.value) return;

    // simulazione async (API)
    await new Promise((r) => setTimeout(r, 350));

    items.value = items.value.filter((x) => x.id !== toRemove.value!.id);
    toast.success(`Rimosso: ${toRemove.value.name}`);
    toRemove.value = null;
}

// =======================
// Snippet per CodeBlock
// (NO <script> / <template> nel codice)
// =======================
const code_script_basic = `import { ref } from "vue";
import { toast } from "cic-kit";
import Modal from "cic-kit";

const basicOpen = ref(false);

function openBasic() {
  basicOpen.value = true;
  toast.info("Apro la modal base");
}

function closeBasic() {
  basicOpen.value = false;
  toast.info("Chiudo la modal base");
}`;

const code_template_basic = `<Btn color="primary" @click="openBasic">Apri modal</Btn>

<Modal
  v-model="basicOpen"
  title="Modal base"
  okText="OK"
  cancelText="Annulla"
  @shown="toast.success('shown')"
  @hidden="toast.info('hidden')"
>
  <div class="small text-muted">
    Questa è una modal base con footer di default (OK/Annulla).
  </div>
</Modal>`;

const code_script_remove = `import { ref } from "vue";
import { toast } from "cic-kit";
import Modal from "cic-kit";

type Item = { id: number; name: string };

const items = ref<Item[]>([
  { id: 1, name: "Documento A" },
  { id: 2, name: "Documento B" },
]);

const toRemove = ref<Item | null>(null);
const confirmOpen = ref(false);

function askRemove(item: Item) {
  toRemove.value = item;
  confirmOpen.value = true;
}

async function onConfirmRemove() {
  if (!toRemove.value) return;

  await new Promise((r) => setTimeout(r, 350));
  items.value = items.value.filter((x) => x.id !== toRemove.value!.id);

  toast.success(\`Rimosso: \${toRemove.value.name}\`);
  toRemove.value = null;
}`;

const code_template_remove = `<div class="d-flex flex-wrap gap-2">
  <Btn
    v-for="it in items"
    :key="it.id"
    color="danger"
    variant="outline"
    icon="delete"
    @click="askRemove(it)"
  >
    Remove {{ it.name }}
  </Btn>
</div>

<Modal
  v-model="confirmOpen"
  :title="\`Rimuovere \${toRemove?.name ?? ''}?\`"
  okText="Rimuovi"
  cancelText="Annulla"
  okColor="danger"
  okVariant="solid"
  cancelVariant="ghost"
  backdrop="static"
  :onOk="onConfirmRemove"
>
  <div class="fw-semibold mb-2">Conferma eliminazione</div>
  <div class="small text-muted">
    L'azione è irreversibile. Vuoi davvero rimuovere questo elemento?
  </div>
</Modal>`;
</script>

<template>
    <div class="container py-3">
        <h2 class="mb-1">Modal</h2>
        <div class="text-muted mb-3">
            Esempi rapidi: apertura via v-model, eventi Bootstrap, e conferma “Remove”.
        </div>

        <!-- Stato live -->
        <div class="border rounded p-3 bg-light mb-3">
            <div class="fw-semibold mb-2">Stato live</div>
            <pre class="mb-0 small">{{ liveState }}</pre>
        </div>

        <!-- ESEMPIO 1 -->
        <div class="border rounded p-3 mb-3">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div class="fw-semibold">Esempio 1 — Modal base</div>
                <div class="d-flex gap-2">
                    <Btn color="primary" @click="runOpenBasic">Apri</Btn>
                    <Btn variant="outline" @click="runCloseBasic">Chiudi</Btn>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-12 col-lg-6">
                    <div class="small text-muted mb-2">Script</div>
                    <CodeBlock lang="ts" :code="code_script_basic" @run="runOpenBasic" />
                </div>
                <div class="col-12 col-lg-6">
                    <div class="small text-muted mb-2">Template</div>
                    <CodeBlock :code="code_template_basic" />
                </div>
            </div>

            <Modal v-model="basicOpen" title="Modal base" okText="OK" cancelText="Annulla"
                @shown="toast.success('shown')" @hidden="toast.info('hidden')">
                <div class="small text-muted">
                    Questa è una modal base con footer di default (OK/Annulla).
                </div>
            </Modal>
        </div>

        <!-- ESEMPIO 2 -->
        <div class="border rounded p-3">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
                <div class="fw-semibold">Esempio 2 — Confirm “Remove”</div>
                <Btn color="danger" variant="outline" icon="delete" @click="runAskRemoveSecond">
                    Test: remove 2°
                </Btn>
            </div>

            <div class="d-flex flex-wrap gap-2 mb-3">
                <Btn v-for="it in items" :key="it.id" color="danger" variant="outline" icon="delete"
                    @click="askRemove(it)">
                    Remove {{ it.name }}
                </Btn>
            </div>

            <div class="row g-3">
                <div class="col-12 col-lg-6">
                    <div class="small text-muted mb-2">Script</div>
                    <CodeBlock lang="ts" :code="code_script_remove" @run="runAskRemoveSecond" />
                </div>
                <div class="col-12 col-lg-6">
                    <div class="small text-muted mb-2">Template</div>
                    <CodeBlock :code="code_template_remove" />
                </div>
            </div>

            <Modal v-model="confirmOpen" :title="`Rimuovere ${toRemove?.name ?? ''}?`" okText="Rimuovi"
                cancelText="Annulla" okColor="danger" okVariant="solid" cancelVariant="ghost" backdrop="static"
                :onOk="onConfirmRemove">
                <div class="fw-semibold mb-2">Conferma eliminazione</div>
                <div class="small text-muted">
                    L'azione è irreversibile. Vuoi davvero rimuovere questo elemento?
                </div>
            </Modal>
        </div>
    </div>
</template>
