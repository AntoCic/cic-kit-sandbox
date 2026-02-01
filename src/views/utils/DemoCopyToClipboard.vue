<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn } from 'cic-kit'
import { computed, ref } from 'vue'
import { copyToClipboard } from 'cic-kit'

// ------------------------------------
// input
// ------------------------------------
const text = ref<string>('Hello world 👋')
const copied = ref<boolean>(false)
const error = ref<string>('')

// auto-reset feedback
let t: number | null = null
function setCopied() {
    copied.value = true
    if (t) window.clearTimeout(t)
    t = window.setTimeout(() => (copied.value = false), 1500)
}

// ------------------------------------
// actions
// ------------------------------------
async function runCopy() {
    error.value = ''
    try {
        copyToClipboard(text.value)
        setCopied()
    } catch (e) {
        error.value = e instanceof Error ? e.message : String(e)
    }
}

function clear() {
    text.value = ''
    copied.value = false
    error.value = ''
}

// ------------------------------------
// helpers demo
// ------------------------------------
const lengthInfo = computed(() => ({
    chars: text.value.length,
    lines: text.value ? text.value.split('\n').length : 0,
}))

// bulk examples
const bulkSamples = [
    'Lorem ipsum dolor sit amet',
    JSON.stringify({ id: 1, name: 'Mario Rossi' }, null, 2),
    'https://example.com',
    'user@example.com',
]
function copySample(v: string) {
    text.value = v
    runCopy()
}
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>copyToClipboard</h1>
                <p class="text-body-secondary mb-0">
                    Copia una stringa negli appunti usando <code>navigator.clipboard</code>.
                </p>
            </div>

            <!-- DEMO -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>copyToClipboard</code></h2>
                <p class="mb-0"><code>text: string</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `copyToClipboard(text);` }}
                </CodeBlock>

                <label class="form-label mb-1">Testo da copiare</label>
                <textarea v-model="text" class="form-control" rows="5" placeholder="Scrivi qualcosa…" />

                <div class="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
                    <small class="text-body-secondary">
                        Caratteri: <b>{{ lengthInfo.chars }}</b>
                        <span v-if="lengthInfo.lines"> — Righe: <b>{{ lengthInfo.lines }}</b></span>
                    </small>

                    <div class="d-flex gap-2">
                        <Btn color="primary" variant="outline" icon="content_copy" :disabled="!text" @click="runCopy">
                            Copia
                        </Btn>
                        <Btn color="secondary" variant="outline" icon="delete" @click="clear">
                            Pulisci
                        </Btn>
                    </div>
                </div>

                <!-- FEEDBACK -->
                <div v-if="copied" class="alert alert-success border mt-2 mb-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">check_circle</span>
                        <div>Testo copiato negli appunti ✅</div>
                    </div>
                </div>

                <div v-if="error" class="alert alert-danger border mt-2 mb-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">error</span>
                        <div><b>Errore:</b> {{ error }}</div>
                    </div>
                </div>
            </div>

            <!-- QUICK SAMPLES -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Esempi rapidi</h2>
                <p class="text-body-secondary mb-2">
                    Un click → copia immediata (utile per testare JSON, URL, email, ecc.).
                </p>

                <div class="row g-2">
                    <div v-for="(v, i) in bulkSamples" :key="i" class="col-12 col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body d-flex flex-column gap-2">
                                <pre class="mb-0 flex-grow-1 text-bg-dark p-2 rounded"
                                    style="white-space: pre-wrap;">{{ v }}</pre>

                                <Btn color="primary" variant="outline" icon="content_copy" @click="copySample(v)">
                                    Copia esempio
                                </Btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- NOTE -->
            <div class="col-12">
                <div class="alert alert-light border mb-0">
                    <div class="d-flex align-items-start gap-2">
                        <span class="material-symbols-outlined">info</span>
                        <div>
                            <div class="fw-semibold">Note tecniche</div>
                            <ul class="mb-0 ps-3">
                                <li>Funziona solo in contesti <b>secure</b> (HTTPS o localhost).</li>
                                <li>Su browser vecchi o permessi negati, può lanciare errore.</li>
                                <li>La utility è volutamente minimale: il feedback è gestito dalla UI.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
