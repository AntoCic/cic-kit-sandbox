<script setup lang="ts">
import { computed, ref } from "vue";
import { Btn, ContainerSub } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";

type LogItem = { at: string; msg: string };

const title = ref("Impostazioni profilo");
const useCustomGoBack = ref(true);

// per mostrare l'effetto "history length"
const mockHistoryLength = ref(2);

const logs = ref<LogItem[]>([]);

function log(msg: string) {
    logs.value.unshift({ at: new Date().toLocaleTimeString(), msg });
}
function clearLogs() {
    logs.value = [];
}

/**
 * goBack custom: qui NON navighiamo davvero, così la demo resta stabile.
 * (In un'app reale potresti fare router.push(...) o altro.)
 */
function customGoBack() {
    log("goBack custom chiamato → (demo) router.push('/demo')");
    // esempio reale:
    // router.push("/demo");
}

/**
 * Spiegazione del defaultGoBack del componente:
 * - se history.length > 1 → router.back()
 * - altrimenti → router.push('/')
 *
 * Qui lo simuliamo a log, per far capire cosa succede.
 */
function simulateDefaultGoBack() {
    if (mockHistoryLength.value > 1) log("defaultGoBack → router.back()");
    else log("defaultGoBack → router.push('/')");
}

const usage = computed(() => `<ContainerSub
  title="${title.value}"
  ${useCustomGoBack.value ? ':goBack="customGoBack"' : ""}
>
  <div>Contenuto nello slot…</div>
</ContainerSub>`);
</script>

<template>
    <div class="container py-3">
        <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap">
            <div>
                <h2 class="mb-1">Demo ContainerSub</h2>
                <div class="text-body-secondary">
                    Layout “sub page” con bottone indietro, titolo e card con slot.
                </div>
            </div>

            <div class="d-flex gap-2">
                <Btn icon="delete" color="secondary" variant="outline" @click="clearLogs">Clear log</Btn>
                <Btn icon="help" color="secondary" variant="ghost" @click="simulateDefaultGoBack">
                    Simula defaultGoBack
                </Btn>
            </div>
        </div>

        <!-- CONTROLLI -->
        <div class="row g-3 my-3">
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Controlli</div>

                    <div class="mb-2">
                        <label class="form-label">Title</label>
                        <input v-model="title" class="form-control" placeholder="Titolo pagina..." />
                        <div class="form-text">
                            Se <code>title</code> è vuoto, a destra non viene mostrato nulla.
                        </div>
                    </div>

                    <div class="form-check mb-2">
                        <input id="useCustom" v-model="useCustomGoBack" class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="useCustom">
                            Usa <code>goBack</code> custom (override)
                        </label>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <div class="text-body-secondary small">Simula <code>window.history.length</code>:</div>
                        <Btn icon="remove" color="secondary" variant="outline"
                            @click="mockHistoryLength = Math.max(0, mockHistoryLength - 1)" />
                        <span class="fw-semibold">{{ mockHistoryLength }}</span>
                        <Btn icon="add" color="secondary" variant="outline" @click="mockHistoryLength++" />
                    </div>

                    <div class="form-text mt-2">
                        Il componente vero usa <code>window.history.length</code>. Qui lo simuliamo per spiegare.
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Log eventi</div>

                    <div v-if="!logs.length" class="text-body-secondary small">
                        Premi “Simula defaultGoBack” oppure clicca il pulsante indietro nel container.
                    </div>

                    <div v-else class="vstack gap-2">
                        <div v-for="(l, i) in logs.slice(0, 10)" :key="i"
                            class="border rounded px-2 py-1 small bg-body-tertiary">
                            <span class="text-body-secondary me-2">{{ l.at }}</span>
                            <span class="font-monospace">{{ l.msg }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DEMO LIVE -->
        <div class="border rounded shadow-sm overflow-hidden" style="height: 520px">
            <!--
        IMPORTANTE:
        ContainerSub usa "container pb-t overflow-auto h-100" quindi lo mettiamo in un box con altezza fissa,
        così si vede bene lo scroll interno.
      -->
            <ContainerSub :title="title"
                :goBack="useCustomGoBack ? (() => { log('click: indietro → goBack custom'); customGoBack(); }) : undefined">
                <div class="vstack gap-3">
                    <div>
                        <div class="fw-semibold">Contenuto nello slot</div>
                        <div class="text-body-secondary">
                            Questo sta dentro <code>.card-body</code> e riceve anche gli <code>attrs</code> passati al
                            componente.
                        </div>
                    </div>

                    <div class="row g-2">
                        <div class="col-12 col-md-6">
                            <label class="form-label">Nome</label>
                            <input class="form-control" placeholder="Mario" />
                        </div>
                        <div class="col-12 col-md-6">
                            <label class="form-label">Cognome</label>
                            <input class="form-control" placeholder="Rossi" />
                        </div>
                        <div class="col-12">
                            <label class="form-label">Bio</label>
                            <textarea class="form-control" rows="3" placeholder="Qualcosa su di te..."></textarea>
                        </div>
                    </div>

                    <div class="d-flex gap-2 flex-wrap">
                        <Btn icon="save" color="primary" variant="solid" @click="log('click: Salva')">Salva</Btn>
                        <Btn icon="refresh" color="secondary" variant="outline" @click="log('click: Reset')">Reset</Btn>
                        <Btn icon="open_in_new" color="secondary" variant="ghost"
                            @click="log('click: Azione secondaria')">
                            Azione secondaria
                        </Btn>
                    </div>

                    <div class="alert alert-info mb-0">
                        <div class="fw-semibold">Tip</div>
                        <div class="small">
                            Se vuoi testare davvero il comportamento <code>router.back()</code>, usa questa demo dentro
                            una route
                            e naviga qui da un’altra pagina.
                        </div>
                    </div>

                    <!-- filler per vedere lo scroll -->
                    <div class="border rounded p-2 bg-body-tertiary">
                        <div class="fw-semibold">Scroll demo</div>
                        <div class="small text-body-secondary">
                            Aggiungo contenuto extra così vedi l’<code>overflow-auto</code> del container.
                        </div>
                        <div class="mt-2" v-for="n in 12" :key="n">
                            <span class="text-body-secondary small">Riga {{ n }}</span>
                        </div>
                    </div>
                </div>
            </ContainerSub>
        </div>

        <!-- ESEMPIO CODICE -->
        <div class="mt-3">
            <div class="text-body-secondary small mb-2">Esempio d’uso:</div>
            <CodeBlock :code="usage" />
        </div>

        <!-- NOTE TECNICHE -->
        <div class="mt-3 text-body-secondary small">
            <div class="fw-semibold text-body">Cosa sta dimostrando questa demo</div>
            <ul class="mb-0">
                <li>
                    Il bottone “indietro” usa <code>goBack</code> se fornito, altrimenti usa la logica interna
                    (history/router).
                </li>
                <li>
                    <code>title</code> compare solo se non vuoto.
                </li>
                <li>
                    Lo slot viene renderizzato dentro una card centrata (layout responsive già pronto).
                </li>
            </ul>
        </div>
    </div>
</template>
