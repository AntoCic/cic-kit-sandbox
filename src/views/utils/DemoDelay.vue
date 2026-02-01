<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn } from 'cic-kit'
import { ref, computed } from 'vue'
import { delay } from 'cic-kit'

// --------------------------------------------------
// DEMO 1: await delay
// --------------------------------------------------
const d1_ms = ref<number>(1000)
const d1_running = ref<boolean>(false)
const d1_done = ref<boolean>(false)
const d1_log = ref<string[]>([])

async function runDelay() {
    d1_running.value = true
    d1_done.value = false
    d1_log.value.push(`⏳ start (${d1_ms.value} ms)`)

    const t0 = performance.now()
    await delay(d1_ms.value)
    const elapsed = Math.round(performance.now() - t0)

    d1_log.value.push(`✅ done after ${elapsed} ms`)
    d1_running.value = false
    d1_done.value = true
}

// --------------------------------------------------
// DEMO 2: fake progress
// --------------------------------------------------
const p_ms = ref<number>(2000)
const p_running = ref<boolean>(false)
const p_progress = ref<number>(0)

async function runProgress() {
    p_running.value = true
    p_progress.value = 0

    const steps = 20
    const stepMs = Math.floor(p_ms.value / steps)

    for (let i = 1; i <= steps; i++) {
        await delay(stepMs)
        p_progress.value = Math.round((i / steps) * 100)
    }

    p_running.value = false
}

// --------------------------------------------------
// DEMO 3: chain async
// --------------------------------------------------
const chain_log = ref<string[]>([])
const chain_running = ref<boolean>(false)

async function runChain() {
    chain_running.value = true
    chain_log.value = []

    chain_log.value.push('Step 1')
    await delay(500)

    chain_log.value.push('Step 2')
    await delay(800)

    chain_log.value.push('Step 3')
    await delay(400)

    chain_log.value.push('✔️ Chain completed')
    chain_running.value = false
}

// --------------------------------------------------
// DEMO 4: bulk test
// --------------------------------------------------
const bulk_qty = ref<number>(5)
const bulk_ms = ref<number>(300)
const bulk_running = ref<boolean>(false)
const bulk_log = ref<string[]>([])

async function runBulk() {
    bulk_running.value = true
    bulk_log.value = []

    for (let i = 1; i <= bulk_qty.value; i++) {
        bulk_log.value.push(`Task ${i}…`)
        await delay(bulk_ms.value)
        bulk_log.value.push(`Task ${i} done`)
    }

    bulk_running.value = false
}

// --------------------------------------------------
// helpers
// --------------------------------------------------
const canRun = computed(() => d1_ms.value >= 0)
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>delay</h1>
                <p class="text-body-secondary mb-0">
                    Rallenta funzioni async per testare loading, progress e sequencing.
                </p>
            </div>

            <!-- DEMO 1 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Await semplice</h2>

                <CodeBlock class="my-2" ts>
                    {{ `await delay(${d1_ms});` }}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">ms</span>
                    <input v-model.number="d1_ms" type="number" min="0" class="form-control" />
                    <Btn color="primary" variant="outline" icon="motion_play" :disabled="d1_running || !canRun"
                        @click="runDelay">
                        Esegui
                    </Btn>
                </div>

                <div v-if="d1_running" class="alert alert-info border mb-2">
                    <span class="material-symbols-outlined align-middle me-1">hourglass_top</span>
                    In attesa…
                </div>

                <div v-if="d1_done" class="alert alert-success border mb-2">
                    <span class="material-symbols-outlined align-middle me-1">check_circle</span>
                    Delay completato
                </div>

                <pre v-if="d1_log.length" class="text-bg-dark p-3 rounded border border-secondary mb-0"
                    style="white-space: pre-wrap;">{{ d1_log.join('\n') }}</pre>
            </div>

            <!-- DEMO 2 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Fake progress</h2>

                <CodeBlock class="my-2" ts>
                    {{ `for (...) { await delay(stepMs) }` }}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">durata ms</span>
                    <input v-model.number="p_ms" type="number" min="0" class="form-control" />
                    <Btn color="primary" variant="outline" icon="motion_play" :disabled="p_running"
                        @click="runProgress">
                        Avvia
                    </Btn>
                </div>

                <div class="progress mb-2" style="height: 22px;">
                    <div class="progress-bar" role="progressbar" :style="{ width: p_progress + '%' }"
                        :aria-valuenow="p_progress" aria-valuemin="0" aria-valuemax="100">
                        {{ p_progress }}%
                    </div>
                </div>
            </div>

            <!-- DEMO 3 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Async chain</h2>

                <CodeBlock class="my-2" ts>
                    {{ `await delay(500); await delay(800); await delay(400);` }}
                </CodeBlock>

                <div class="d-flex gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" :disabled="chain_running"
                        @click="runChain">
                        Avvia chain
                    </Btn>
                </div>

                <pre v-if="chain_log.length"
                    class="text-bg-dark p-3 rounded border border-secondary mb-0">{{ chain_log.join('\n') }}</pre>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <span class="material-symbols-outlined">timeline</span>
                    <div class="small text-body-secondary">Nessuna chain eseguita</div>
                </div>
            </div>

            <!-- DEMO 4 -->
            <div class="col-12">
                <h2 class="h4 mb-1">Bulk async test</h2>

                <CodeBlock class="my-2" ts>
                    {{ `for (let i=0;i<n;i++) await delay(ms)` }} </CodeBlock>

                        <div class="row g-2 align-items-end mb-2">
                            <div class="col-6">
                                <label class="form-label mb-1">qty</label>
                                <input v-model.number="bulk_qty" type="number" min="0" class="form-control" />
                            </div>
                            <div class="col-6">
                                <label class="form-label mb-1">ms</label>
                                <input v-model.number="bulk_ms" type="number" min="0" class="form-control" />
                            </div>
                        </div>

                        <div class="d-flex gap-2 mb-2">
                            <Btn color="primary" variant="outline" icon="motion_play" :disabled="bulk_running"
                                @click="runBulk">
                                Avvia bulk
                            </Btn>
                        </div>

                        <pre v-if="bulk_log.length" class="text-bg-dark p-3 rounded border border-secondary mb-0"
                            style="white-space: pre-wrap;">{{ bulk_log.join('\n') }}</pre>

                        <div v-else class="alert alert-secondary border mb-0 text-center">
                            <span class="material-symbols-outlined">dataset</span>
                            <div class="small text-body-secondary">Nessun bulk eseguito</div>
                        </div>
            </div>
        </div>
    </div>
</template>
