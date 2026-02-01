<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn } from 'cic-kit'
import { computed, ref } from 'vue'
import { _testoSorgente, testoXCaratteri, testoXParole } from 'cic-kit'

type SourceMode = 'default' | 'custom'

const sourceMode = ref<SourceMode>('default')
const customSource = ref<string>('')

// --- DEMO 1: testoXCaratteri ---
const d1_maxChars = ref<number>(160)
const d1_res = ref<string>('')

// --- DEMO 2: testoXParole ---
const d2_maxWords = ref<number>(25)
const d2_res = ref<string>('')

const activeSource = computed(() => {
  const src = sourceMode.value === 'custom' ? customSource.value : _testoSorgente
  return (src ?? '').trim()
})

const sourcePreview = computed(() => {
  if (!activeSource.value) return ''
  return activeSource.value.length > 500 ? `${activeSource.value.slice(0, 500)}…` : activeSource.value
})

function runChars() {
  const max = Number(d1_maxChars.value ?? 0)
  d1_res.value = testoXCaratteri(Math.max(0, max), activeSource.value || _testoSorgente)
}

function runWords() {
  const max = Number(d2_maxWords.value ?? 0)
  d2_res.value = testoXParole(Math.max(0, max), activeSource.value || _testoSorgente)
}

function clearResults() {
  d1_res.value = ''
  d2_res.value = ''
}

function useDefaultSource() {
  sourceMode.value = 'default'
  customSource.value = ''
  clearResults()
}
</script>

<template>
  <div class="container">
    <div class="row pt-3 pb-4">
      <div class="col-12 text-center mb-3">
        <h1>Genera Testo</h1>
        <p class="text-body-secondary mb-0">
          Genera testo casuale a partire da un testo sorgente: per <b>caratteri</b> o per <b>parole</b>.
        </p>
      </div>

      <!-- SORGENTE -->
      <div class="col-12 mb-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
              <div>
                <h2 class="h5 mb-1">Testo sorgente</h2>
                <p class="mb-0 text-body-secondary">
                  Scegli se usare <code>_testoSorgente</code> o un testo personalizzato.
                </p>
              </div>

              <div class="btn-group" role="group" aria-label="Source mode">
                <input id="src-default" class="btn-check" type="radio" name="source" value="default"
                  v-model="sourceMode" />
                <label class="btn btn-outline-primary" for="src-default">
                  Default
                </label>

                <input id="src-custom" class="btn-check" type="radio" name="source" value="custom"
                  v-model="sourceMode" />
                <label class="btn btn-outline-primary" for="src-custom">
                  Custom
                </label>
              </div>
            </div>

            <div v-if="sourceMode === 'custom'" class="mb-2">
              <label class="form-label mb-1">Incolla un testo (opzionale)</label>
              <textarea v-model="customSource" class="form-control" rows="5"
                placeholder="Incolla qui il testo sorgente…" />
              <div class="d-flex align-items-center justify-content-between mt-2">
                <small class="text-body-secondary">
                  Lunghezza: <b>{{ activeSource.length }}</b> caratteri
                </small>
                <Btn color="secondary" variant="outline" icon="restart_alt" @click="useDefaultSource">
                  Ripristina default
                </Btn>
              </div>
            </div>

            <div v-else class="alert alert-light border mb-0">
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="material-symbols-outlined">description</span>
                <b>_testoSorgente</b>
                <span class="text-body-secondary ms-1">({{ _testoSorgente.length }} caratteri)</span>
              </div>
              <p class="mb-0 small text-body-secondary" style="white-space: pre-wrap;">
                {{ sourcePreview }}
              </p>
            </div>

            <div v-if="sourceMode === 'custom' && !activeSource" class="alert alert-warning mt-2 mb-0">
              <div class="d-flex align-items-center gap-2">
                <span class="material-symbols-outlined">warning</span>
                <span>
                  Testo custom vuoto: userò automaticamente <code>_testoSorgente</code>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DEMO 1 -->
      <div class="col-12 mb-4">
        <h2 class="h4 mb-1">Function: <code>testoXCaratteri</code></h2>
        <p class="mb-0"><code>maxLunghezzaCaratteri: number</code></p>
        <p class="mb-0"><code>testoSorgente: string = _testoSorgente</code></p>

        <CodeBlock class="my-2" ts>
          {{ `testoXCaratteri(${d1_maxChars}, source);` }}
        </CodeBlock>

        <div class="input-group mb-2">
          <span class="input-group-text">Arg(1)</span>
          <input type="number" v-model.number="d1_maxChars" min="0" class="form-control" placeholder="es. 160"
            aria-label="maxLunghezzaCaratteri" />
          <Btn color="primary" variant="outline" icon="motion_play" @click="runChars">
            Esegui
          </Btn>
        </div>

        <div v-if="d1_res" class="mt-2">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <small class="text-body-secondary">
              Output: <b>{{ d1_res.length }}</b> caratteri
            </small>
            <Btn color="secondary" variant="ghost" icon="delete" @click="d1_res = ''">
              Pulisci
            </Btn>
          </div>
          <pre class="text-bg-dark p-3 rounded border border-secondary mb-0"
            style="white-space: pre-wrap;">{{ d1_res }}</pre>
        </div>

        <div v-else class="alert alert-secondary border mt-2 mb-0 text-center">
          <div class="d-flex flex-column align-items-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 32px;">code</span>
            <div class="fw-semibold">Nessun risultato</div>
            <div class="small text-body-secondary">
              Imposta i caratteri massimi e premi <b>Esegui</b>.
            </div>
          </div>
        </div>
      </div>

      <!-- DEMO 2 -->
      <div class="col-12 mb-2">
        <h2 class="h4 mb-1">Function: <code>testoXParole</code></h2>
        <p class="mb-0"><code>maxQuantitaParole: number</code></p>
        <p class="mb-0"><code>testoSorgente: string = _testoSorgente</code></p>

        <CodeBlock class="my-2" ts>
          {{ `testoXParole(${d2_maxWords}, source);` }}
        </CodeBlock>

        <div class="input-group mb-2">
          <span class="input-group-text">Arg(1)</span>
          <input type="number" v-model.number="d2_maxWords" min="0" class="form-control" placeholder="es. 25"
            aria-label="maxQuantitaParole" />
          <Btn color="primary" variant="outline" icon="motion_play" @click="runWords">
            Esegui
          </Btn>
        </div>

        <div v-if="d2_res" class="mt-2">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <small class="text-body-secondary">
              Output: <b>{{ d2_res.split(/\s+/).filter(Boolean).length }}</b> parole
            </small>
            <Btn color="secondary" variant="ghost" icon="delete" @click="d2_res = ''">
              Pulisci
            </Btn>
          </div>
          <pre class="text-bg-dark p-3 rounded border border-secondary mb-0"
            style="white-space: pre-wrap;">{{ d2_res }}</pre>
        </div>

        <div v-else class="alert alert-secondary border mt-2 mb-0 text-center">
          <div class="d-flex flex-column align-items-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 32px;">format_quote</span>
            <div class="fw-semibold">Nessun risultato</div>
            <div class="small text-body-secondary">
              Imposta il numero di parole e premi <b>Esegui</b>.
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER ACTIONS -->
      <div class="col-12 mt-3">
        <div class="d-flex flex-wrap gap-2 justify-content-end">
          <Btn color="secondary" variant="outline" icon="mop" @click="clearResults">
            Pulisci tutti i risultati
          </Btn>
        </div>
      </div>
    </div>
  </div>
</template>
