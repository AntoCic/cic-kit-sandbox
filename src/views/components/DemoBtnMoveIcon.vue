<script setup lang="ts">
import { computed, ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { Btn, BtnMoveIcon, type ShareLink } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";

type LogItem = { at: string; msg: string };

const label = ref("Condividi / Naviga");
const icon = ref("share"); // Material Symbols name (string)
const disabled = ref(false);
const loading = ref(false);

// type scelto dall'utente per test
const type = ref<"button" | "submit" | "reset">("button");

// route "to" demo
const useTo = ref(false);
const to = ref<RouteLocationRaw>({ name: "home" }); // adatta alle tue route

// share demo
const useShare = ref(true);
const shareTitle = ref("Titolo demo");
const shareText = ref("Testo di condivisione generato dalla demo.");
const shareUrl = ref("https://example.com");

// log
const logs = ref<LogItem[]>([]);
function log(msg: string) {
    logs.value.unshift({ at: new Date().toLocaleTimeString(), msg });
}
function clearLogs() {
    logs.value = [];
}

// simuliamo submit del form
function onSubmit() {
    log("✅ FORM SUBMIT (se vedi questo: il click non è stato prevenuto)");
}

const share = computed<ShareLink | undefined>(() => {
    if (!useShare.value) return undefined;
    return {
        title: shareTitle.value,
        text: shareText.value,
        url: shareUrl.value,
    };
});

const resolvedTo = computed<RouteLocationRaw | undefined>(() =>
    useTo.value ? to.value : undefined
);

const usageBasic = computed(() => `<BtnMoveIcon
  icon="${icon.value}"
  :disabled="${disabled.value}"
  :loading="${loading.value}"
  type="${type.value}"
  ${useTo.value ? ':to="{ name: \'home\' }"' : ""}
  ${useShare.value ? ':share="{ title: ..., text: ..., url: ... }"' : ""}
  @click="onClick"
>
  ${label.value}
</BtnMoveIcon>`);

const usageInsideForm = computed(() => `<form @submit.prevent="onSubmit">
  <!-- Se passi "to", il componente forza type='button' -->
  <BtnMoveIcon type="submit" :to="{ name: 'home' }" icon="arrow_forward">
    Vai (no submit)
  </BtnMoveIcon>

  <!-- Senza "to", type=submit rimane submit -->
  <BtnMoveIcon type="submit" icon="done">
    Submit (fa submit)
  </BtnMoveIcon>
</form>`);
</script>

<template>
    <div class="container py-3">
        <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap">
            <div>
                <h2 class="mb-1">Demo BtnMoveIcon</h2>
                <div class="text-body-secondary">
                    Icona Material Symbols, animazione hover/loading, shareLink, routeTo e gestione disabled/submit.
                </div>
            </div>

            <div class="d-flex gap-2">
                <Btn icon="delete" color="secondary" variant="outline" @click="clearLogs">Clear log</Btn>
                <Btn :icon="loading ? 'pause' : 'play_arrow'" color="secondary" variant="outline"
                    @click="loading = !loading">
                    Toggle loading
                </Btn>
            </div>
        </div>

        <!-- CONTROLLI -->
        <div class="row g-3 my-3">
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Props live</div>

                    <div class="mb-2">
                        <label class="form-label">Label</label>
                        <input v-model="label" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label class="form-label">Icon (Material Symbols name)</label>
                        <input v-model="icon" class="form-control" placeholder="share / home / add / ..." />
                        <div class="form-text">
                            Passi una stringa: il componente renderizza
                            <code>{{ `<span class="material-symbols-outlined">...</span>` }}</code>.
                        </div>
                    </div>

                    <div class="row g-2">
                        <div class="col-6">
                            <div class="form-check">
                                <input id="disabled" v-model="disabled" class="form-check-input" type="checkbox" />
                                <label class="form-check-label" for="disabled">disabled</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-check">
                                <input id="loading" v-model="loading" class="form-check-input" type="checkbox" />
                                <label class="form-check-label" for="loading">loading</label>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2">
                        <label class="form-label">type</label>
                        <select v-model="type" class="form-select">
                            <option value="button">button</option>
                            <option value="submit">submit</option>
                            <option value="reset">reset</option>
                        </select>
                        <div class="form-text">
                            Nota: se passi <code>to</code>, il componente forza <code>type='button'</code>.
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Integrazioni</div>

                    <div class="form-check mb-2">
                        <input id="useTo" v-model="useTo" class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="useTo">Usa <code>to</code> (routeTo)</label>
                    </div>

                    <div v-if="useTo" class="border rounded p-2 mb-3">
                        <div class="small text-body-secondary mb-1">RouteLocationRaw (demo)</div>
                        <div class="d-flex gap-2 flex-wrap">
                            <Btn icon="home" color="secondary" variant="outline"
                                @click="to = { name: 'home' }; log('to = { name: home }')">
                                name: home
                            </Btn>
                            <Btn icon="link" color="secondary" variant="outline" @click="to = '/'; log('to = /')">
                                to = "/"
                            </Btn>
                            <Btn icon="settings" color="secondary" variant="outline"
                                @click="to = { path: '/settings' }; log('to = { path: /settings }')">
                                path: /settings
                            </Btn>
                        </div>
                        <div class="form-text mt-2">
                            Devi avere queste route nel router, altrimenti ovviamente non naviga.
                        </div>
                    </div>

                    <div class="form-check mb-2">
                        <input id="useShare" v-model="useShare" class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="useShare">Usa <code>share</code> (shareLink)</label>
                    </div>

                    <div v-if="useShare" class="border rounded p-2">
                        <div class="row g-2">
                            <div class="col-12">
                                <label class="form-label">share.title</label>
                                <input v-model="shareTitle" class="form-control" />
                            </div>
                            <div class="col-12">
                                <label class="form-label">share.text</label>
                                <input v-model="shareText" class="form-control" />
                            </div>
                            <div class="col-12">
                                <label class="form-label">share.url</label>
                                <input v-model="shareUrl" class="form-control" />
                            </div>
                        </div>
                        <div class="form-text mt-2">
                            Se il browser non supporta Web Share API, <code>shareLink</code> potrebbe fare fallback
                            (dipende da cic-kit).
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DEMO LIVE -->
        <div class="row g-3">
            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="fw-semibold">Demo live</div>
                        <span class="badge text-bg-secondary">hover + loading</span>
                    </div>

                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <BtnMoveIcon :icon="icon" :disabled="disabled" :loading="loading" :type="type" :to="resolvedTo"
                            :share="share" @click="(_) => log(`click event emesso (button tag)`)">
                            {{ label }}
                        </BtnMoveIcon>

                        <span class="text-body-secondary small">
                            Prova hover: l’icona va al centro e il testo scompare.
                        </span>
                    </div>

                    <div class="text-body-secondary small mt-3 mb-2">Esempio d’uso:</div>
                    <CodeBlock :code="usageBasic" />
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <div class="fw-semibold">Test dentro form</div>
                        <span class="badge text-bg-warning">submit safety</span>
                    </div>

                    <form @submit.prevent="onSubmit" class="vstack gap-2">
                        <div class="text-body-secondary small">
                            1) Con <code>to</code>: anche se imposti <code>type="submit"</code>, il componente forza
                            <code>type="button"</code> → niente submit.
                        </div>

                        <BtnMoveIcon icon="arrow_forward" type="submit" :to="{ name: 'home' }"
                            @click="() => log('click: submit+to → prevented submit + routeTo()')">
                            Vai (submit + to)
                        </BtnMoveIcon>

                        <hr class="my-2" />

                        <div class="text-body-secondary small">
                            2) Senza <code>to</code>: <code>type="submit"</code> resta submit → submit del form.
                        </div>

                        <BtnMoveIcon icon="done" type="submit"
                            @click="() => log('click: submit senza to → lascia submit')">
                            Submit (senza to)
                        </BtnMoveIcon>
                    </form>

                    <div class="text-body-secondary small mt-3 mb-2">Esempio d’uso:</div>
                    <CodeBlock :code="usageInsideForm" />
                </div>
            </div>

            <!-- LOG -->
            <div class="col-12">
                <div class="border rounded p-3 shadow-sm">
                    <div class="fw-semibold mb-2">Log</div>

                    <div v-if="!logs.length" class="text-body-secondary small">
                        Nessun evento. Clicca i bottoni sopra.
                    </div>

                    <div v-else class="vstack gap-2">
                        <div v-for="(l, i) in logs.slice(0, 12)" :key="i"
                            class="border rounded px-2 py-1 small bg-body-tertiary">
                            <span class="text-body-secondary me-2">{{ l.at }}</span>
                            <span class="font-monospace">{{ l.msg }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- NOTE -->
        <div class="mt-3 text-body-secondary small">
            <div class="fw-semibold text-body">Cosa dimostra la demo</div>
            <ul class="mb-0">
                <li>
                    Se <code>disabled</code> o <code>loading</code> → blocca click (preventDefault + stopPropagation).
                </li>
                <li>
                    Emette sempre <code>click</code> prima di fare <code>shareLink</code> e/o <code>routeTo</code>.
                </li>
                <li>
                    Se c’è <code>to</code> e <code>type="submit"</code> → previene submit per sicurezza.
                </li>
                <li>
                    Se c’è <code>to</code> → type effettivo è forzato a <code>button</code>.
                </li>
            </ul>
        </div>
    </div>
</template>
