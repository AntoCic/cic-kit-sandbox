<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn } from 'cic-kit'
import { ref, computed } from 'vue'
import { useDebounce } from 'cic-kit'

// --------------------------------------------------
// DEMO 1: input debounce (classico search)
// --------------------------------------------------
const d1_delay = ref<number>(500)
const d1_input = ref<string>('')
const d1_rawCount = ref<number>(0)
const d1_debouncedCount = ref<number>(0)
const d1_lastValue = ref<string>('')

const debouncedInput = useDebounce((v: string) => {
    d1_debouncedCount.value++
    d1_lastValue.value = v
}, d1_delay.value)

// attenzione: se cambia delay, ricreiamo la fn
function recreateDebounced() {
    debouncedInputRef.value = useDebounce((v: string) => {
        d1_debouncedCount.value++
        d1_lastValue.value = v
    }, d1_delay.value)
}

const debouncedInputRef = ref(debouncedInput)

function onInput(v: string) {
    d1_rawCount.value++
    debouncedInputRef.value(v)
}

// --------------------------------------------------
// DEMO 2: button spam
// --------------------------------------------------
const d2_delay = ref<number>(800)
const d2_rawClicks = ref<number>(0)
const d2_debouncedClicks = ref<number>(0)

const debouncedClick = ref(
    useDebounce(() => {
        d2_debouncedClicks.value++
    }, d2_delay.value)
)

function recreateDebouncedClick() {
    debouncedClick.value = useDebounce(() => {
        d2_debouncedClicks.value++
    }, d2_delay.value)
}

function onSpamClick() {
    d2_rawClicks.value++
    debouncedClick.value()
}

// --------------------------------------------------
// DEMO 3: resize (simulato)
// --------------------------------------------------
const d3_delay = ref<number>(300)
const d3_raw = ref<number>(0)
const d3_debounced = ref<number>(0)

const debouncedResize = ref(
    useDebounce(() => {
        d3_debounced.value++
    }, d3_delay.value)
)

function recreateResize() {
    debouncedResize.value = useDebounce(() => {
        d3_debounced.value++
    }, d3_delay.value)
}

function simulateResizeBurst() {
    for (let i = 0; i < 10; i++) {
        d3_raw.value++
        debouncedResize.value()
    }
}

// --------------------------------------------------
// helpers
// --------------------------------------------------
const ratioInput = computed(() =>
    d1_rawCount.value
        ? (d1_debouncedCount.value / d1_rawCount.value).toFixed(2)
        : '—'
)
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>useDebounce</h1>
                <p class="text-body-secondary mb-0">
                    Rinvía l’esecuzione di una funzione finché l’utente smette di chiamarla.
                </p>
            </div>

            <!-- DEMO 1 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Debounce su input</h2>
                <p class="text-body-secondary mb-2">
                    Classico caso: search / autocomplete.
                </p>

                <CodeBlock class="my-2" ts>
                    {{
                        `const debounced = useDebounce((v) => {
                    // chiamata pesante
                    }, ${d1_delay})

                    <input @input="debounced" />`
                    }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-8">
                        <label class="form-label mb-1">Scrivi qualcosa</label>
                        <input class="form-control" :value="d1_input"
                            @input="e => { d1_input = (e.target as HTMLInputElement).value; onInput(d1_input) }"
                            placeholder="Digita velocemente…" />
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label mb-1">delay (ms)</label>
                        <div class="input-group">
                            <input v-model.number="d1_delay" type="number" min="0" class="form-control" />
                            <Btn color="secondary" variant="outline" icon="restart_alt" @click="recreateDebounced">
                                Applica
                            </Btn>
                        </div>
                    </div>
                </div>

                <div class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="row g-3">
                        <div class="col-12 col-md-4">
                            <div class="small text-body-secondary">Raw calls</div>
                            <div class="display-6">{{ d1_rawCount }}</div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="small text-body-secondary">Debounced calls</div>
                            <div class="display-6">{{ d1_debouncedCount }}</div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="small text-body-secondary">Ratio</div>
                            <div class="display-6">{{ ratioInput }}</div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <div class="small text-body-secondary">Ultimo valore processato</div>
                        <div class="fw-semibold">{{ d1_lastValue || '—' }}</div>
                    </div>
                </div>
            </div>

            <!-- DEMO 2 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Debounce su button (anti-spam)</h2>

                <CodeBlock class="my-2" ts>
                    {{ `const onClick = useDebounce(fn, ${d2_delay})` }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-6">
                        <label class="form-label mb-1">delay (ms)</label>
                        <div class="input-group">
                            <input v-model.number="d2_delay" type="number" min="0" class="form-control" />
                            <Btn color="secondary" variant="outline" icon="restart_alt" @click="recreateDebouncedClick">
                                Applica
                            </Btn>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 d-flex gap-2">
                        <Btn color="primary" variant="solid" icon="ads_click" class="flex-fill" @click="onSpamClick">
                            Click ripetuto
                        </Btn>
                    </div>
                </div>

                <div class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="small text-body-secondary">Raw clicks</div>
                            <div class="display-6">{{ d2_rawClicks }}</div>
                        </div>
                        <div class="col-6">
                            <div class="small text-body-secondary">Debounced</div>
                            <div class="display-6">{{ d2_debouncedClicks }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO 3 -->
            <div class="col-12">
                <h2 class="h4 mb-1">Resize / eventi burst</h2>
                <p class="text-body-secondary mb-2">
                    Simula 10 eventi consecutivi (come <code>resize</code>).
                </p>

                <CodeBlock class="my-2" ts>
                    {{ `window.addEventListener('resize', useDebounce(onResize, ${d3_delay}))` }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-6">
                        <label class="form-label mb-1">delay (ms)</label>
                        <div class="input-group">
                            <input v-model.number="d3_delay" type="number" min="0" class="form-control" />
                            <Btn color="secondary" variant="outline" icon="restart_alt" @click="recreateResize">
                                Applica
                            </Btn>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <Btn color="primary" variant="outline" icon="open_with" class="w-100"
                            @click="simulateResizeBurst">
                            Simula resize burst
                        </Btn>
                    </div>
                </div>

                <div class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="small text-body-secondary">Resize events</div>
                            <div class="display-6">{{ d3_raw }}</div>
                        </div>
                        <div class="col-6">
                            <div class="small text-body-secondary">Debounced calls</div>
                            <div class="display-6">{{ d3_debounced }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
