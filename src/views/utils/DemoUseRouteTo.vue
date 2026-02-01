<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import { Btn, useRouteTo, type RouteToOpts } from 'cic-kit'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { routeTo } = useRouteTo()

// --------------------------------------------------
// UI state
// --------------------------------------------------
const name = ref<string>('Home')

const paramsText = ref<string>(`{ "id": 123 }`)
const queryText = ref<string>(`{ "page": 2, "q": "vue" }`)
const hash = ref<string>('#settings')
const replace = ref<boolean>(false)
const catchError = ref<boolean>(true)
const useState = ref<boolean>(true)
const stateText = ref<string>(`{ "fromDemo": true, "ts": ${Date.now()} }`)

const useRaw = ref<boolean>(false)
const rawText = ref<string>(`{ "path": "/" }`)

const log = ref<string[]>([])

// update default state ts when toggling
watch(useState, (v) => {
    if (v) stateText.value = `{ "fromDemo": true, "ts": ${Date.now()} }`
})

// --------------------------------------------------
// helpers
// --------------------------------------------------
function safeJson<T = any>(s: string): { ok: true; value: T } | { ok: false; error: string } {
    const txt = (s ?? '').trim()
    if (!txt) return { ok: true, value: {} as T }
    try {
        return { ok: true, value: JSON.parse(txt) as T }
    } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : String(e) }
    }
}

const paramsParsed = computed(() => safeJson<Record<string, any>>(paramsText.value))
const queryParsed = computed(() => safeJson<Record<string, any>>(queryText.value))
const stateParsed = computed(() => safeJson<any>(stateText.value))
const rawParsed = computed(() => safeJson<any>(rawText.value))

const hasJsonError = computed(() =>
    (!paramsParsed.value.ok) ||
    (!queryParsed.value.ok) ||
    (useState.value && !stateParsed.value.ok) ||
    (useRaw.value && !rawParsed.value.ok)
)

const currentInfo = computed(() => ({
    name: route.name,
    path: route.path,
    fullPath: route.fullPath,
    params: route.params,
    query: route.query,
    hash: route.hash,
}))

const historyStatePreview = computed(() => {
    // history.state è standard browser; non sempre contiene ciò che hai passato (dipende dal router)
    try {
        return history.state
    } catch {
        return null
    }
})

// --------------------------------------------------
// actions
// --------------------------------------------------
async function run() {
    if (hasJsonError.value) {
        log.value.unshift('❌ JSON non valido in uno dei campi.')
        return
    }

    const opts: RouteToOpts = {
        replace: replace.value,
        catchError: catchError.value,
        hash: hash.value || undefined,
    }

    if (paramsParsed.value.ok) opts.params = paramsParsed.value.value
    if (queryParsed.value.ok) opts.query = queryParsed.value.value

    if (useState.value && stateParsed.value.ok) opts.state = stateParsed.value.value

    if (useRaw.value) {
        if (!rawParsed.value.ok) {
            log.value.unshift(`❌ RAW JSON non valido: ${rawParsed.value.error}`)
            return
        }
        // routeTo accetta RouteLocationRaw in opts.raw
        opts.raw = rawParsed.value.value
    }

    try {
        log.value.unshift(`➡️ routeTo("${name.value}", ${JSON.stringify({ ...opts, raw: useRaw.value ? '[raw]' : undefined }, null, 0)})`)
        await routeTo(name.value, opts)
        log.value.unshift('✅ navigation ok')
    } catch (e) {
        log.value.unshift(`💥 error: ${e instanceof Error ? e.message : String(e)}`)
    }
}

function clearLog() {
    log.value = []
}

function fillExample(which: "Introduzione" | "Btn" | "Vee Validate" | "Toast") {
    useRaw.value = false
    replace.value = false
    useState.value = true
    catchError.value = true

    if (which === 'Introduzione') {
        name.value = which
        paramsText.value = `{ }`
        queryText.value = `{ }`
        hash.value = ''
        stateText.value = `{ "fromDemo": true, "ts": ${Date.now()} }`
    }

    if (which === 'Btn') {
        name.value = which
        paramsText.value = `{ "id": 123 }`
        queryText.value = `{ }`
        hash.value = ''
        stateText.value = `{ "fromDemo": true, "section": "user" }`
    }

    if (which === 'Vee Validate') {
        name.value = which
        paramsText.value = `{ }`
        queryText.value = `{ "page": 2, "q": "vue" }`
        hash.value = ''
        stateText.value = `{ "fromDemo": true, "filters": ["a", "b"] }`
    }

    if (which === 'Toast') {
        name.value = which
        paramsText.value = `{ }`
        queryText.value = `{ }`
        hash.value = '#settings'
        stateText.value = `{ "fromDemo": true, "tab": "settings" }`
    }
}
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>useRouteTo (advanced)</h1>
                <p class="text-body-secondary mb-0">
                    Navigazione per <b>name</b> con opzioni (<code>params/query/hash/replace/state/raw</code>)
                    e gestione errori (<code>catchError</code>).
                </p>
            </div>

            <!-- DEBUG CURRENT ROUTE -->
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                            <div>
                                <h2 class="h5 mb-1">Route corrente</h2>
                            </div>
                            <Btn color="secondary" variant="outline" icon="delete" @click="clearLog">
                                Pulisci log
                            </Btn>
                        </div>

                        <div class="row g-2">
                            <div class="col-12 col-lg-7">
                                <div class="small text-body-secondary mb-1">Info live</div>
                                <CodeBlock class="my-0" lang="json" :code="JSON.stringify(currentInfo, null, 2)" />
                            </div>
                            <div class="col-12 col-lg-5">
                                <div class="small text-body-secondary mb-1">history.state</div>
                                <CodeBlock class="my-0" lang="json"
                                    :code="JSON.stringify(historyStatePreview, null, 2)" />
                            </div>
                        </div>

                        <div class="mt-3 d-flex flex-wrap gap-2">
                            <div class="mt-3 d-flex flex-wrap gap-2">
                                <Btn color="primary" variant="outline" icon="home_app_logo"
                                    @click="fillExample('Introduzione')">
                                    Introduzione
                                </Btn>

                                <Btn color="primary" variant="outline" icon="smart_button" @click="fillExample('Btn')">
                                    Demo Btn
                                </Btn>

                                <Btn color="primary" variant="outline" icon="fact_check"
                                    @click="fillExample('Vee Validate')">
                                    VeeValidate
                                </Btn>

                                <Btn color="primary" variant="outline" icon="cloud" @click="fillExample('Toast')">
                                    Toast
                                </Btn>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- CONTROLS -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">routeTo(name, opts)</h2>

                <CodeBlock class="my-2" ts @run="run">
                    {{
                        `await routeTo('${name}', {
                    params: ${paramsText},
                    query: ${queryText},
                    hash: ${hash ? `'${hash}'` : 'undefined'},
                    replace: ${replace},
                    state: ${useState ? stateText : 'undefined'},
                    raw: ${useRaw ? rawText : 'undefined'},
                    catchError: ${catchError},
                    })`
                    }}
                </CodeBlock>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-6">
                        <label class="form-label mb-1">name</label>
                        <input v-model="name" class="form-control" placeholder="es. Home" />
                    </div>

                    <div class="col-12 col-md-6 d-flex gap-2">
                        <Btn color="primary" variant="solid" icon="arrow_forward" class="flex-fill"
                            :disabled="hasJsonError" @click="run">
                            Naviga
                        </Btn>
                    </div>
                </div>

                <div class="row g-2 mb-2">
                    <div class="col-12 col-lg-6">
                        <label class="form-label mb-1">params (JSON)</label>
                        <textarea v-model="paramsText" rows="4" class="form-control"
                            :class="{ 'is-invalid': !paramsParsed.ok }" placeholder='{ "id": 123 }' />
                        <div v-if="!paramsParsed.ok" class="invalid-feedback d-block">
                            JSON non valido: {{ paramsParsed.error }}
                        </div>
                    </div>

                    <div class="col-12 col-lg-6">
                        <label class="form-label mb-1">query (JSON)</label>
                        <textarea v-model="queryText" rows="4" class="form-control"
                            :class="{ 'is-invalid': !queryParsed.ok }" placeholder='{ "page": 2 }' />
                        <div v-if="!queryParsed.ok" class="invalid-feedback d-block">
                            JSON non valido: {{ queryParsed.error }}
                        </div>
                    </div>
                </div>

                <div class="row g-2 align-items-end mb-2">
                    <div class="col-12 col-md-6">
                        <label class="form-label mb-1">hash</label>
                        <input v-model="hash" class="form-control" placeholder="#section" />
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="d-flex flex-wrap gap-3 align-items-center">
                            <div class="form-check form-switch m-0">
                                <input id="swReplace" v-model="replace" class="form-check-input" type="checkbox"
                                    role="switch" />
                                <label class="form-check-label" for="swReplace">replace</label>
                            </div>

                            <div class="form-check form-switch m-0">
                                <input id="swCatch" v-model="catchError" class="form-check-input" type="checkbox"
                                    role="switch" />
                                <label class="form-check-label" for="swCatch">catchError</label>
                            </div>

                            <div class="form-check form-switch m-0">
                                <input id="swState" v-model="useState" class="form-check-input" type="checkbox"
                                    role="switch" />
                                <label class="form-check-label" for="swState">state</label>
                            </div>

                            <div class="form-check form-switch m-0">
                                <input id="swRaw" v-model="useRaw" class="form-check-input" type="checkbox"
                                    role="switch" />
                                <label class="form-check-label" for="swRaw">raw</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="useState" class="mb-2">
                    <label class="form-label mb-1">state (JSON)</label>
                    <textarea v-model="stateText" rows="3" class="form-control"
                        :class="{ 'is-invalid': !stateParsed.ok }" />
                    <div v-if="!stateParsed.ok" class="invalid-feedback d-block">
                        JSON non valido: {{ stateParsed.error }}
                    </div>
                </div>

                <div v-if="useRaw" class="mb-2">
                    <label class="form-label mb-1">raw (RouteLocationRaw JSON)</label>
                    <textarea v-model="rawText" rows="3" class="form-control" :class="{ 'is-invalid': !rawParsed.ok }"
                        placeholder='{ "path": "/users/123?x=1#top" }' />
                    <div v-if="!rawParsed.ok" class="invalid-feedback d-block">
                        JSON non valido: {{ rawParsed.error }}
                    </div>
                    <div class="form-text">
                        Se <code>raw</code> è valorizzato, bypassa <code>name</code> (usa direttamente l’oggetto
                        RouteLocationRaw).
                    </div>
                </div>

                <div v-if="hasJsonError" class="alert alert-warning border mb-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">warning</span>
                        <div>Correggi i campi JSON non validi prima di navigare.</div>
                    </div>
                </div>
            </div>

            <!-- LOG -->
            <div class="col-12">
                <h2 class="h4 mb-1">Log</h2>

                <div v-if="log.length" class="text-bg-dark p-3 rounded border border-secondary">
                    <pre class="mb-0" style="white-space: pre-wrap;">{{ log.join('\n') }}</pre>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">terminal</span>
                        <div class="fw-semibold">Nessun log</div>
                        <div class="small text-body-secondary">Esegui una navigazione per vedere gli eventi.</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
