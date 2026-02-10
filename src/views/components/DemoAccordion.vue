<script setup lang="ts">
import CodeBlock from "@src/utils/CodeBlock.vue";
import { Accordion, Btn } from "cic-kit";
import { computed, ref } from "vue";

type LogItem = { at: string; msg: string };

const title = ref("Accordion base");
const baseId = ref("demoAccordionBase");
const disabled = ref(false);

const title2 = ref("Accordion con header slot");
const customId = ref("demoAccordionCustom");

const logs = ref<LogItem[]>([]);

function clearLogs() {
    logs.value = [];
}

const usageBase = computed(() => `<Accordion
  id="${baseId.value}"
  title="${title.value}"
  :disabled="${disabled.value}"
  @open="(ev) => onOpen('Base', ev)"
>
  <p class="mb-0">
    Contenuto dello slot default: puoi metterci testo, liste, bottoni, ecc.
  </p>
</Accordion>`);

const usageCustomHeader = computed(() => `<Accordion
  id="${customId.value}"
  title="${title2.value}"
  @open="(ev) => onOpen('Custom header', ev)"
>
  <template #header>
    <div class="d-flex align-items-center gap-2 w-100">
      <span class="material-symbols-outlined">auto_awesome</span>
      <span class="fw-semibold">Header custom</span>
      <span class="ms-auto badge text-bg-primary">slot</span>
    </div>
  </template>

  <div class="vstack gap-2">
    <div class="fw-semibold">Contenuto “ricco”</div>
    <ul class="mb-0">
      <li>Liste</li>
      <li>Componenti</li>
      <li>HTML a piacere</li>
    </ul>
  </div>
</Accordion>`);
</script>

<template>
    <div class="container py-3">
        <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap">
            <div>
                <h2 class="mb-1">Demo Accordion</h2>
                <div class="text-body-secondary">
                    Props, slot, disabled, warning “no content”, e evento <code>open</code>.
                </div>
            </div>

            <Btn color="secondary" variant="outline" icon="delete" @click="clearLogs">
                Clear log
            </Btn>
        </div>

        <!-- CONTROLLI -->
        <div class="row g-3 my-3">
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Controlli (Accordion base)</div>

                    <div class="mb-2">
                        <label class="form-label">Title</label>
                        <input v-model="title" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label class="form-label">Id</label>
                        <input v-model="baseId" class="form-control" />
                        <div class="form-text">
                            Importante: id univoco per evitare collisioni su <code>data-bs-parent</code>.
                        </div>
                    </div>

                    <div class="form-check">
                        <input id="disabled" v-model="disabled" class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="disabled">Disabled</label>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Log eventi</div>

                    <div v-if="!logs.length" class="text-body-secondary small">
                        Nessun evento ancora. Clicca un header per vedere <code>@open</code>.
                    </div>

                    <div v-else class="vstack gap-2">
                        <div v-for="(l, i) in logs.slice(0, 8)" :key="i"
                            class="border rounded px-2 py-1 small bg-body-tertiary">
                            <span class="text-body-secondary me-2">{{ l.at }}</span>
                            <span class="font-monospace">{{ l.msg }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DEMO LIVE -->
        <div class="row g-3">
            <!-- Accordion base -->
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="fw-semibold">1) Base (props + contenuto)</div>
                        <span class="badge text-bg-secondary">props</span>
                    </div>

                    <Accordion :id="baseId" :title="title" :disabled="disabled" class="mb-3">
                        <div class="vstack gap-2">
                            <div class="fw-semibold">Contenuto nello slot default</div>
                            <div class="text-body-secondary">
                                Qui puoi inserire qualunque markup: card, liste, form, ecc.
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <Btn icon="check" color="primary" variant="solid">Azione primaria</Btn>
                                <Btn icon="info" color="secondary" variant="outline">Secondaria</Btn>
                            </div>
                        </div>
                    </Accordion>

                    <div class="text-body-secondary small mb-2">Esempio d’uso:</div>
                    <CodeBlock :code="usageBase" />
                </div>
            </div>

            <!-- Accordion custom header slot -->
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="fw-semibold">2) Header slot (custom)</div>
                        <span class="badge text-bg-primary">slot</span>
                    </div>

                    <Accordion :id="customId" :title="title2" class="mb-3">
                        <template #header>
                            <div class="d-flex align-items-center gap-2 w-100">
                                <span class="material-symbols-outlined">auto_awesome</span>
                                <span class="fw-semibold">Header custom</span>
                                <span class="ms-auto badge text-bg-primary">slot</span>
                            </div>
                        </template>

                        <div class="vstack gap-2">
                            <div class="fw-semibold">Contenuto “ricco”</div>

                            <div class="row g-2">
                                <div class="col-12 col-md-6">
                                    <div class="border rounded p-2">
                                        <div class="small text-body-secondary">Esempio</div>
                                        <div class="fw-semibold">Box A</div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="border rounded p-2">
                                        <div class="small text-body-secondary">Esempio</div>
                                        <div class="fw-semibold">Box B</div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex gap-2 flex-wrap">
                                <Btn icon="bolt" color="warning" variant="solid">CTA</Btn>
                                <Btn icon="open_in_new" color="secondary" variant="ghost">Link</Btn>
                            </div>
                        </div>
                    </Accordion>

                    <div class="text-body-secondary small mb-2">Esempio d’uso:</div>
                    <CodeBlock :code="usageCustomHeader" />
                </div>
            </div>

            <!-- Accordion senza slot default (warning) -->
            <div class="col-12">
                <div class="border rounded p-3 shadow-sm">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="fw-semibold">3) Caso “nessun contenuto” (warning built-in)</div>
                        <span class="badge text-bg-warning">empty</span>
                    </div>

                    <Accordion id="demoAccordionEmpty" title="Accordion vuoto" />
                    <div class="form-text mt-2">
                        Qui lo slot default è vuoto: si vede il tuo placeholder con l’icona warning.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
