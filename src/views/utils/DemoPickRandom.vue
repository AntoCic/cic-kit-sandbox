<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn } from 'cic-kit'
import { computed, ref } from 'vue'
import { pickRandom, copyToClipboard } from 'cic-kit'

// ------------------------------------
// dataset demo (editabile)
// ------------------------------------
const itemsText = ref<string>(`apple
banana
cherry
date
fig
grape`)

const items = computed(() =>
    itemsText.value
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
)

// exclude controls
const excludeEnabled = ref<boolean>(false)
const excludeValue = ref<string>('')

// result
const d1_res = ref<string | undefined>(undefined)

// bulk
const bulk_qty = ref<number>(50)
const bulk_res = ref<string[]>([])
const bulk_counts = ref<Record<string, number>>({})

// derived
const uniqueItems = computed(() => Array.from(new Set(items.value)))

const filteredItems = computed(() => {
    if (!excludeEnabled.value) return items.value
    if (!excludeValue.value) return items.value
    return items.value.filter(v => v !== excludeValue.value)
})

const isEmpty = computed(() => items.value.length === 0)
const isAllExcluded = computed(() => excludeEnabled.value && items.value.length > 0 && filteredItems.value.length === 0)

// ------------------------------------
// actions
// ------------------------------------
function runOne() {
    const ex = excludeEnabled.value ? (excludeValue.value || undefined) : undefined
    d1_res.value = pickRandom(items.value, ex)
}

function clearOne() {
    d1_res.value = undefined
}

function runBulk() {
    const ex = excludeEnabled.value ? (excludeValue.value || undefined) : undefined
    const qty = Math.max(0, Math.floor(Number(bulk_qty.value ?? 0)))

    const out: string[] = []
    const counts: Record<string, number> = {}

    for (let i = 0; i < qty; i++) {
        const v = pickRandom(items.value, ex)
        if (v === undefined) break
        out.push(v)
        counts[v] = (counts[v] ?? 0) + 1
    }

    bulk_res.value = out
    bulk_counts.value = counts
}

function clearBulk() {
    bulk_res.value = []
    bulk_counts.value = {}
}

function resetSample() {
    itemsText.value = `apple
banana
cherry
date
fig
grape`
    excludeEnabled.value = false
    excludeValue.value = ''
    clearOne()
    clearBulk()
}

function setExcludeFromResult() {
    if (!d1_res.value) return
    excludeEnabled.value = true
    excludeValue.value = d1_res.value
}

const topCounts = computed(() => {
    const entries = Object.entries(bulk_counts.value)
        .sort((a, b) => b[1] - a[1])
    return entries
})
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>pickRandom</h1>
                <p class="text-body-secondary mb-0">
                    Estrae un elemento casuale da un array, con possibilità di escludere un valore.
                </p>
            </div>

            <!-- INPUT ITEMS -->
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                            <div>
                                <h2 class="h5 mb-1">Items</h2>
                                <p class="mb-0 text-body-secondary">Uno per riga (stringhe).</p>
                            </div>

                            <div class="d-flex gap-2">
                                <Btn color="secondary" variant="outline" icon="restart_alt" @click="resetSample">
                                    Reset sample
                                </Btn>
                            </div>
                        </div>

                        <textarea v-model="itemsText" class="form-control" rows="6" placeholder="Uno per riga…" />

                        <div class="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
                            <small class="text-body-secondary">
                                Totale: <b>{{ items.length }}</b> — Unici: <b>{{ uniqueItems.length }}</b>
                                <span v-if="excludeEnabled && excludeValue" class="ms-2">
                                    — Filtrati: <b>{{ filteredItems.length }}</b>
                                </span>
                            </small>

                            <div class="form-check form-switch m-0">
                                <input id="exEn" v-model="excludeEnabled" class="form-check-input" type="checkbox"
                                    role="switch">
                                <label class="form-check-label" for="exEn">Exclude</label>
                            </div>
                        </div>

                        <div v-if="excludeEnabled" class="mt-2">
                            <label class="form-label mb-1">exclude</label>
                            <select v-model="excludeValue" class="form-select">
                                <option value="">(nessuno)</option>
                                <option v-for="v in uniqueItems" :key="v" :value="v">
                                    {{ v }}
                                </option>
                            </select>

                            <div v-if="isAllExcluded" class="alert alert-warning border mt-2 mb-0">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="material-symbols-outlined">warning</span>
                                    <div>
                                        Hai escluso l’unico valore disponibile (o tutti risultano uguali). Risultato:
                                        <code>undefined</code>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO 1 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>pickRandom</code></h2>
                <p class="mb-0"><code>items: readonly T[]</code></p>
                <p class="mb-0"><code>exclude?: T</code></p>

                <CodeBlock class="my-2" ts>
                    {{
                        `pickRandom(items${excludeEnabled ? `, ${excludeValue ? `'${excludeValue}'` : 'undefined'}` : ''});`
                    }}
                </CodeBlock>

                <div class="d-flex flex-wrap gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runOne">
                        Estrai
                    </Btn>
                    <Btn color="secondary" variant="outline" icon="delete" @click="clearOne">
                        Pulisci
                    </Btn>
                    <Btn color="secondary" variant="outline" icon="block" :disabled="!d1_res"
                        @click="setExcludeFromResult">
                        Escludi risultato
                    </Btn>
                </div>

                <div v-if="isEmpty" class="alert alert-warning border mb-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">warning</span>
                        <div>Array vuoto: la funzione ritorna <code>undefined</code>.</div>
                    </div>
                </div>

                <div v-else-if="d1_res !== undefined" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex justify-content-between align-items-center gap-3">
                        <div>
                            <div class="small text-body-secondary">Risultato</div>
                            <div class="display-6 mb-0">{{ d1_res }}</div>
                        </div>

                        <div class="d-flex gap-2">
                            <Btn color="secondary" variant="outline" icon="content_copy"
                                @click="copyToClipboard(String(d1_res))">
                                Copia
                            </Btn>
                            <Btn color="secondary" variant="outline" icon="replay" @click="runOne">
                                Riprova
                            </Btn>
                        </div>
                    </div>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">casino</span>
                        <div class="fw-semibold">Nessun risultato</div>
                        <div class="small text-body-secondary">
                            Premi <b>Estrai</b> per ottenere un valore casuale.
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO 2: BULK -->
            <div class="col-12">
                <h2 class="h4 mb-1">Bulk generator</h2>
                <p class="text-body-secondary mb-2">
                    Estrazioni multiple con conteggio occorrenze (utile per vedere la distribuzione).
                </p>

                <CodeBlock class="my-2" ts>
                    {{`Array.from({ length: ${bulk_qty} }, () => pickRandom(items${excludeEnabled ? `, ${excludeValue ?
                        `'${excludeValue}'` : 'undefined'}` : ''}))`}}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">qty</span>
                    <input v-model.number="bulk_qty" type="number" min="0" class="form-control" />
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runBulk">
                        Genera
                    </Btn>
                    <Btn color="secondary" variant="outline" icon="delete" @click="clearBulk">
                        Pulisci
                    </Btn>
                </div>

                <div v-if="bulk_res.length" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                        <div class="small text-body-secondary">
                            Estrazioni: <b>{{ bulk_res.length }}</b>
                            <span v-if="excludeEnabled && excludeValue" class="ms-2">
                                (exclude: <b>{{ excludeValue }}</b>)
                            </span>
                        </div>

                        <div class="d-flex gap-2">
                            <Btn color="secondary" variant="outline" icon="content_copy"
                                @click="copyToClipboard(JSON.stringify(bulk_res, null, 2))">
                                Copia array
                            </Btn>
                            <Btn color="secondary" variant="outline" icon="content_copy"
                                @click="copyToClipboard(JSON.stringify(bulk_counts, null, 2))">
                                Copia counts
                            </Btn>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-12 col-lg-7">
                            <div class="small text-body-secondary mb-1">Array</div>
                            <pre class="mb-0"
                                style="white-space: pre-wrap;">{{ JSON.stringify(bulk_res, null, 2) }}</pre>
                        </div>

                        <div class="col-12 col-lg-5">
                            <div class="small text-body-secondary mb-1">Conteggi</div>
                            <div class="table-responsive">
                                <table class="table table-sm table-dark table-striped align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Valore</th>
                                            <th class="text-end">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="[k, v] in topCounts" :key="k">
                                            <td>{{ k }}</td>
                                            <td class="text-end"><b>{{ v }}</b></td>
                                        </tr>
                                        <tr v-if="!topCounts.length">
                                            <td colspan="2" class="text-center text-body-secondary">—</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">dataset</span>
                        <div class="fw-semibold">Nessuna lista generata</div>
                        <div class="small text-body-secondary">
                            Imposta <b>qty</b> e premi <b>Genera</b>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
