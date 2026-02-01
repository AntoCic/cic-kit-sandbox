<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn, copyToClipboard, randomInt } from 'cic-kit'
import { computed, ref } from 'vue'

// ------------------------------------
// DEMO 1: singolo numero
// ------------------------------------
const d1_min = ref<number>(0)
const d1_max = ref<number>(100)
const d1_res = ref<number | null>(null)
const d1_err = ref<string>('')

function runOne() {
    d1_err.value = ''
    d1_res.value = null

    try {
        d1_res.value = randomInt(Number(d1_min.value), Number(d1_max.value))
    } catch (e) {
        d1_err.value = e instanceof Error ? e.message : String(e)
    }
}

// ------------------------------------
// DEMO 2: bulk + stats
// ------------------------------------
const bulk_qty = ref<number>(20)
const bulk_min = ref<number>(0)
const bulk_max = ref<number>(100)
const bulk_res = ref<number[]>([])
const bulk_err = ref<string>('')

function runBulk() {
    bulk_err.value = ''
    bulk_res.value = []

    try {
        const qty = Math.max(0, Math.floor(Number(bulk_qty.value ?? 0)))
        const min = Number(bulk_min.value)
        const max = Number(bulk_max.value)

        const arr: number[] = []
        for (let i = 0; i < qty; i++) arr.push(randomInt(min, max))
        bulk_res.value = arr
    } catch (e) {
        bulk_err.value = e instanceof Error ? e.message : String(e)
    }
}

function clearBulk() {
    bulk_res.value = []
    bulk_err.value = ''
}

const bulkStats = computed(() => {
    if (!bulk_res.value.length) return null
    const arr = bulk_res.value
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    const avg = arr.reduce((s, n) => s + n, 0) / arr.length
    return { min, max, avg }
})

// ------------------------------------
// helpers
// ------------------------------------
const isD1Invalid = computed(() => Math.ceil(d1_min.value) > Math.floor(d1_max.value))
const isBulkInvalid = computed(() => Math.ceil(bulk_min.value) > Math.floor(bulk_max.value))
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>Random Int</h1>
                <p class="text-body-secondary mb-0">
                    Genera un intero casuale compreso tra <code>min</code> e <code>max</code> (inclusi).
                </p>
            </div>

            <!-- DEMO 1 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>randomInt</code></h2>
                <p class="mb-0"><code>min: number = 0</code></p>
                <p class="mb-0"><code>max: number = 100</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `randomInt(${d1_min}, ${d1_max});` }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-5">
                        <label class="form-label mb-1">min</label>
                        <input v-model.number="d1_min" type="number" class="form-control"
                            :class="{ 'is-invalid': isD1Invalid }" />
                    </div>

                    <div class="col-12 col-md-5">
                        <label class="form-label mb-1">max</label>
                        <input v-model.number="d1_max" type="number" class="form-control"
                            :class="{ 'is-invalid': isD1Invalid }" />
                        <div v-if="isD1Invalid" class="invalid-feedback">
                            <code>min</code> non può essere maggiore di <code>max</code>.
                        </div>
                    </div>

                    <div class="col-12 col-md-2 d-flex gap-2">
                        <Btn color="primary" variant="outline" icon="motion_play" class="w-100" @click="runOne">
                            Esegui
                        </Btn>
                    </div>
                </div>

                <div v-if="d1_err" class="alert alert-danger border mb-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">error</span>
                        <div><b>Errore:</b> {{ d1_err }}</div>
                    </div>
                </div>

                <div v-else-if="d1_res !== null" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex align-items-center justify-content-between gap-3">
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
                            Imposta <b>min</b> e <b>max</b>, poi premi <b>Esegui</b>.
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO 2 -->
            <div class="col-12">
                <h2 class="h4 mb-1">Bulk generator</h2>
                <p class="text-body-secondary mb-2">
                    Genera una lista di numeri per testare dataset, grafici o distribuzioni.
                </p>

                <CodeBlock class="my-2" ts>
                    {{`Array.from({ length: ${bulk_qty} }, () => randomInt(${bulk_min}, ${bulk_max}))`}}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-3">
                        <label class="form-label mb-1">qty</label>
                        <input v-model.number="bulk_qty" type="number" min="0" class="form-control" />
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label mb-1">min</label>
                        <input v-model.number="bulk_min" type="number" class="form-control"
                            :class="{ 'is-invalid': isBulkInvalid }" />
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label mb-1">max</label>
                        <input v-model.number="bulk_max" type="number" class="form-control"
                            :class="{ 'is-invalid': isBulkInvalid }" />
                        <div v-if="isBulkInvalid" class="invalid-feedback">
                            <code>min</code> non può essere maggiore di <code>max</code>.
                        </div>
                    </div>

                    <div class="col-12 col-md-3 d-flex gap-2">
                        <Btn color="primary" variant="outline" icon="motion_play" class="w-100" @click="runBulk">
                            Genera
                        </Btn>
                        <Btn color="secondary" variant="outline" icon="delete" class="w-100" @click="clearBulk">
                            Pulisci
                        </Btn>
                    </div>
                </div>

                <div v-if="bulk_err" class="alert alert-danger border mb-2">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">error</span>
                        <div><b>Errore:</b> {{ bulk_err }}</div>
                    </div>
                </div>

                <div v-else-if="bulk_res.length" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                        <div class="small text-body-secondary">
                            Risultati: <b>{{ bulk_res.length }}</b>
                            <span v-if="bulkStats">
                                — min: <b>{{ bulkStats.min }}</b>, max: <b>{{ bulkStats.max }}</b>, avg: <b>{{
                                    bulkStats.avg.toFixed(2) }}</b>
                            </span>
                        </div>

                        <div class="d-flex gap-2">
                            <Btn color="secondary" variant="outline" icon="content_copy"
                                @click="copyToClipboard(JSON.stringify(bulk_res))">
                                Copia array
                            </Btn>
                            <Btn color="secondary" variant="ghost" icon="replay" @click="runBulk">
                                Riprova
                            </Btn>
                        </div>
                    </div>

                    <pre class="mb-0" style="white-space: pre-wrap;">{{ JSON.stringify(bulk_res, null, 2) }}</pre>
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
