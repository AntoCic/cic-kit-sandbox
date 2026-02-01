<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn, generaColoreEsadecimale, generaColoreDarkenHex, copyToClipboard } from 'cic-kit'
import { computed, ref } from 'vue'

const hexRegex = /^#([0-9a-fA-F]{6})$/

// DEMO 1: random hex
const d1_res = ref<string>('')

// DEMO 2: darken
const d2_hex = ref<string>('#3B82F6')
const d2_percent = ref<number>(20)
const d2_res = ref<string>('')

const isHexValid = computed(() => hexRegex.test(d2_hex.value.trim()))
const normalizedHex = computed(() => d2_hex.value.trim().toUpperCase())

function runRandom() {
    d1_res.value = generaColoreEsadecimale()
}

function runDarken() {
    const hex = normalizedHex.value
    if (!hexRegex.test(hex)) {
        d2_res.value = 'Errore: inserisci un HEX valido nel formato #RRGGBB.'
        return
    }
    d2_res.value = generaColoreDarkenHex(hex, Number(d2_percent.value ?? 20))
}

function useRandomAsInput() {
    const rnd = generaColoreEsadecimale()
    d2_hex.value = rnd
    d2_res.value = ''
}

const darkenPreview = computed(() => {
    if (!isHexValid.value) return null
    return generaColoreDarkenHex(normalizedHex.value, Number(d2_percent.value ?? 20)).toUpperCase()
})
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>Color Utils</h1>
                <p class="text-body-secondary mb-0">
                    Genera un HEX casuale e calcola la variante “darkened” di un colore.
                </p>
            </div>

            <!-- DEMO 1 -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaColoreEsadecimale</code></h2>

                <CodeBlock class="my-2" ts>
                    {{ `generaColoreEsadecimale();` }}
                </CodeBlock>

                <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runRandom">
                        Genera
                    </Btn>

                    <Btn color="secondary" variant="outline" icon="content_copy" :disabled="!d1_res"
                        @click="d1_res && copyToClipboard(d1_res)">
                        Copia
                    </Btn>

                    <Btn color="secondary" variant="outline" icon="south_east" :disabled="!d1_res"
                        @click="d1_res && (d2_hex = d1_res, d2_res = '')">
                        Usa come input
                    </Btn>
                </div>

                <div v-if="d1_res" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex align-items-center gap-3">
                        <div class="rounded border border-secondary" style="width: 44px; height: 44px;"
                            :style="{ backgroundColor: d1_res }" aria-label="Preview colore generato" />
                        <div>
                            <div class="small text-body-secondary">HEX</div>
                            <div class="fw-semibold">{{ d1_res }}</div>
                        </div>
                    </div>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">palette</span>
                        <div class="fw-semibold">Nessun colore generato</div>
                        <div class="small text-body-secondary">Premi <b>Genera</b> per ottenere un HEX casuale.</div>
                    </div>
                </div>
            </div>

            <!-- DEMO 2 -->
            <div class="col-12 mb-2">
                <h2 class="h4 mb-1">Function: <code>generaColoreDarkenHex</code></h2>
                <p class="mb-0"><code>hex: string</code></p>
                <p class="mb-0"><code>percent = 20</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `generaColoreDarkenHex('${normalizedHex}', ${d2_percent});` }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-5">
                        <label class="form-label mb-1">HEX input</label>
                        <input v-model="d2_hex" class="form-control" :class="{
                            'is-valid': isHexValid,
                            'is-invalid': d2_hex && !isHexValid
                        }" placeholder="#RRGGBB" />
                        <div class="invalid-feedback">
                            Formato richiesto: <code>#RRGGBB</code> (6 cifre esadecimali).
                        </div>
                    </div>

                    <div class="col-12 col-md-5">
                        <label class="form-label mb-1">Percent darken: <b>{{ d2_percent }}%</b></label>
                        <input v-model.number="d2_percent" type="range" class="form-range" min="0" max="95" step="1" />
                        <div class="d-flex justify-content-between small text-body-secondary">
                            <span>0%</span><span>95%</span>
                        </div>
                    </div>

                    <div class="col-12 col-md-2 d-flex gap-2">
                        <Btn color="primary" variant="outline" icon="motion_play" class="w-100" @click="runDarken">
                            Esegui
                        </Btn>
                    </div>
                </div>

                <!-- Preview live -->
                <div class="card border-0 shadow-sm mb-2">
                    <div class="card-body">
                        <div class="d-flex flex-wrap align-items-center gap-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded border border-secondary" style="width: 42px; height: 42px;"
                                    :style="{ backgroundColor: isHexValid ? normalizedHex : 'transparent' }" />
                                <div>
                                    <div class="small text-body-secondary">Input</div>
                                    <div class="fw-semibold">{{ isHexValid ? normalizedHex : '—' }}</div>
                                </div>
                            </div>

                            <span class="text-body-secondary">→</span>

                            <div class="d-flex align-items-center gap-2">
                                <div class="rounded border border-secondary" style="width: 42px; height: 42px;"
                                    :style="{ backgroundColor: darkenPreview ?? 'transparent' }" />
                                <div>
                                    <div class="small text-body-secondary">Darkened</div>
                                    <div class="fw-semibold">{{ darkenPreview ?? '—' }}</div>
                                </div>
                            </div>

                            <div class="ms-auto d-flex flex-wrap gap-2">
                                <Btn color="secondary" variant="outline" icon="casino" @click="useRandomAsInput">
                                    Random input
                                </Btn>
                                <Btn color="secondary" variant="outline" icon="content_copy" :disabled="!darkenPreview"
                                    @click="darkenPreview && copyToClipboard(darkenPreview)">
                                    Copia output
                                </Btn>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Output esecuzione -->
                <div v-if="d2_res" class="text-bg-dark p-3 rounded border border-secondary">
                    <div v-if="hexRegex.test(d2_res)" class="d-flex align-items-center gap-3">
                        <div class="rounded border border-secondary" style="width: 44px; height: 44px;"
                            :style="{ backgroundColor: d2_res.toUpperCase() }" />
                        <div class="flex-grow-1">
                            <div class="small text-body-secondary">Risultato</div>
                            <div class="fw-semibold">{{ d2_res.toUpperCase() }}</div>
                        </div>

                        <Btn color="secondary" variant="ghost" icon="swap_horiz" :disabled="!isHexValid"
                            @click="d2_res && hexRegex.test(d2_res) && (d2_hex = d2_res.toUpperCase(), d2_res = '')">
                            Usa come input
                        </Btn>
                    </div>

                    <pre v-else class="mb-0" style="white-space: pre-wrap;">{{ d2_res }}</pre>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">dark_mode</span>
                        <div class="fw-semibold">Nessun risultato</div>
                        <div class="small text-body-secondary">
                            Inserisci un HEX valido e premi <b>Esegui</b>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
