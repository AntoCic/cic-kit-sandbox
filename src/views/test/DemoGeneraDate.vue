<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import {
    Btn,
    copyToClipboard,

    _defaultRange,
    dateCasuale,
    timestampCasuale,
    msCasuali,

    dateToInputDate,
    dateToInputTime,
    dateToInputDateTimeLocal,

    inputDateCasuale,
    inputTimeCasuale,
    inputDateTimeLocalCasuale,

    dateCasualeUltimiGiorni,
    dateCasualeProssimiGiorni,
    timestampCasualeUltimiGiorni,
    timestampCasualeProssimiGiorni,

    rangeGiorno,
    normalizeRange
} from 'cic-kit'
import { computed, ref } from 'vue'
import { Timestamp } from 'firebase/firestore'

// ----------------------------------------------------
// helpers demo
// ----------------------------------------------------
const pad2 = (n: number) => String(n).padStart(2, '0')
const fmt = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`

function safeDate(v: string): Date | null {
    const s = (v ?? '').trim()
    if (!s) return null
    const d = new Date(s)
    return isNaN(d.getTime()) ? null : d
}

function clampInt(n: unknown, min: number, max: number, fallback: number) {
    const v = Number(n)
    if (!Number.isFinite(v)) return fallback
    return Math.min(max, Math.max(min, Math.floor(v)))
}

// ----------------------------------------------------
// Range controls (datetime-local)
// ----------------------------------------------------
const rangeMode = ref<'default' | 'custom'>('default')

// usiamo input datetime-local: 'YYYY-MM-DDTHH:mm'
const range_from = ref<string>(dateToInputDateTimeLocal(_defaultRange.from()))
const range_to = ref<string>(dateToInputDateTimeLocal(_defaultRange.to()))

const resolvedRange = computed(() => {
    if (rangeMode.value === 'default') return normalizeRange(undefined)

    const fromD = safeDate(range_from.value)
    const toD = safeDate(range_to.value)

    // normalizeRange accetta Date | Timestamp | string | number
    return normalizeRange({
        from: fromD ?? range_from.value,
        to: toD ?? range_to.value,
    })
})

function resetToDefaultRange() {
    rangeMode.value = 'default'
    range_from.value = dateToInputDateTimeLocal(_defaultRange.from())
    range_to.value = dateToInputDateTimeLocal(_defaultRange.to())
    clear()
}

// ----------------------------------------------------
// Time opts controls
// ----------------------------------------------------
const t_hourFrom = ref<number>(9)
const t_hourTo = ref<number>(18)
const t_minStep = ref<number>(15)

const timeOpts = computed(() => ({
    hourFrom: clampInt(t_hourFrom.value, 0, 23, 0),
    hourTo: clampInt(t_hourTo.value, 0, 23, 23),
    minuteStep: clampInt(t_minStep.value, 1, 30, 1),
}))

// ----------------------------------------------------
// Shortcut controls
// ----------------------------------------------------
const shortcutDays = ref<number>(30)

// ----------------------------------------------------
// Results
// ----------------------------------------------------
type Result = {
    date?: Date
    timestamp?: Timestamp
    ms?: number

    inputDate?: string
    inputTime?: string
    inputDateTimeLocal?: string

    range?: { from: Date; to: Date }
    rangeDay?: { from: Date; to: Date }

    bulk?: Array<{
        date: string
        ms: number
        inputDate: string
        inputTime: string
        inputDT: string
    }>
}

const res = ref<Result>({})

const hasAnyResult = computed(() => Object.keys(res.value).length > 0)

function clear() {
    res.value = {}
}

// ----------------------------------------------------
// Run functions (main)
// ----------------------------------------------------
function runDateCasuale() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, date: dateCasuale({ from, to }) }
}

function runTimestampCasuale() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, timestamp: timestampCasuale({ from, to }) }
}

function runMsCasuali() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, ms: msCasuali({ from, to }) }
}

// format helpers
function runDateToInput() {
    const d = res.value.date ?? new Date()
    res.value = {
        ...res.value,
        inputDate: dateToInputDate(d),
        inputTime: dateToInputTime(d),
        inputDateTimeLocal: dateToInputDateTimeLocal(d),
    }
}

function runInputDateCasuale() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, inputDate: inputDateCasuale({ from, to }) }
}

function runInputTimeCasuale() {
    res.value = { ...res.value, inputTime: inputTimeCasuale(timeOpts.value) }
}

function runInputDateTimeLocalCasuale() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, inputDateTimeLocal: inputDateTimeLocalCasuale({ from, to }, timeOpts.value) }
}

// shortcut
function runUltimiGiorniDate() {
    const days = clampInt(shortcutDays.value, 0, 3650, 30)
    res.value = { ...res.value, date: dateCasualeUltimiGiorni(days) }
}

function runProssimiGiorniDate() {
    const days = clampInt(shortcutDays.value, 0, 3650, 30)
    res.value = { ...res.value, date: dateCasualeProssimiGiorni(days) }
}

function runUltimiGiorniTimestamp() {
    const days = clampInt(shortcutDays.value, 0, 3650, 30)
    res.value = { ...res.value, timestamp: timestampCasualeUltimiGiorni(days) }
}

function runProssimiGiorniTimestamp() {
    const days = clampInt(shortcutDays.value, 0, 3650, 30)
    res.value = { ...res.value, timestamp: timestampCasualeProssimiGiorni(days) }
}

// range helpers
const rangeDayInput = ref<string>(dateToInputDate(new Date()))
function runRangeGiorno() {
    // accetta Date | Timestamp | string | number → passiamo una string 'YYYY-MM-DD'
    const r = rangeGiorno(rangeDayInput.value)
    res.value = { ...res.value, rangeDay: r }
}
function runNormalizeRange() {
    const { from, to } = resolvedRange.value
    res.value = { ...res.value, range: normalizeRange({ from, to }) }
}

// bulk
const bulkQty = ref<number>(10)
function runBulk() {
    const qty = clampInt(bulkQty.value, 0, 200, 10)
    const { from, to } = resolvedRange.value
    const arr: Result['bulk'] = []

    for (let i = 0; i < qty; i++) {
        const d = dateCasuale({ from, to })
        const ms = d.getTime()
        arr.push({
            date: fmt(d),
            ms,
            inputDate: dateToInputDate(d),
            inputTime: dateToInputTime(d),
            inputDT: dateToInputDateTimeLocal(d),
        })
    }

    res.value = { bulk: arr }
}
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>Date Utils</h1>
                <p class="text-body-secondary mb-0">
                    Date casuali, Timestamp Firestore, epoch ms, e formati per input HTML.
                </p>
            </div>

            <!-- RANGE CONTROLS -->
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                            <div>
                                <h2 class="h5 mb-1">Range</h2>
                                <p class="mb-0 text-body-secondary">
                                    Default: ultimi 365 giorni → adesso. Oppure imposta un range custom.
                                </p>
                            </div>

                            <div class="btn-group" role="group" aria-label="Range mode">
                                <input id="r-default" class="btn-check" type="radio" value="default"
                                    v-model="rangeMode" />
                                <label class="btn btn-outline-primary" for="r-default">Default</label>

                                <input id="r-custom" class="btn-check" type="radio" value="custom"
                                    v-model="rangeMode" />
                                <label class="btn btn-outline-primary" for="r-custom">Custom</label>
                            </div>
                        </div>

                        <div v-if="rangeMode === 'custom'" class="row g-2 align-items-end">
                            <div class="col-12 col-md-5">
                                <label class="form-label mb-1">from (datetime-local)</label>
                                <input v-model="range_from" type="datetime-local" class="form-control" />
                            </div>

                            <div class="col-12 col-md-5">
                                <label class="form-label mb-1">to (datetime-local)</label>
                                <input v-model="range_to" type="datetime-local" class="form-control" />
                            </div>

                            <div class="col-12 col-md-2 d-flex gap-2">
                                <Btn color="secondary" variant="outline" icon="restart_alt" class="w-100"
                                    @click="resetToDefaultRange">
                                    Reset
                                </Btn>
                            </div>
                        </div>

                        <div class="alert alert-light border mt-3 mb-0">
                            <div class="d-flex flex-wrap gap-3 align-items-center">
                                <div>
                                    <div class="small text-body-secondary">Resolved from</div>
                                    <div class="fw-semibold">{{ fmt(resolvedRange.from) }}</div>
                                </div>
                                <div class="text-body-secondary">→</div>
                                <div>
                                    <div class="small text-body-secondary">Resolved to</div>
                                    <div class="fw-semibold">{{ fmt(resolvedRange.to) }}</div>
                                </div>
                                <div class="ms-auto small text-body-secondary">
                                    (se invertito, viene fatto swap)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TIME OPTS -->
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h2 class="h5 mb-1">Opzioni time (per <code>inputTimeCasuale</code>)</h2>
                        <p class="text-body-secondary mb-2">Range ore e step minuti.</p>

                        <div class="row g-2 align-items-end">
                            <div class="col-12 col-md-4">
                                <label class="form-label mb-1">hourFrom</label>
                                <input v-model.number="t_hourFrom" type="number" class="form-control" min="0"
                                    max="23" />
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label mb-1">hourTo</label>
                                <input v-model.number="t_hourTo" type="number" class="form-control" min="0" max="23" />
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label mb-1">minuteStep</label>
                                <input v-model.number="t_minStep" type="number" class="form-control" min="1" max="30" />
                            </div>
                        </div>

                        <div class="mt-2 small text-body-secondary">
                            Risolte: <code>{{ timeOpts }}</code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MAIN GENERATORS -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Generatori principali</h2>

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex flex-wrap gap-2 mb-2">
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runDateCasuale">
                                dateCasuale
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runTimestampCasuale">
                                timestampCasuale
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runMsCasuali">
                                msCasuali
                            </Btn>

                            <div class="ms-auto d-flex gap-2">
                                <Btn color="secondary" variant="outline" icon="mop" @click="clear">Pulisci</Btn>
                            </div>
                        </div>

                        <CodeBlock class="my-2" ts>
                            {{
                                `dateCasuale({ from, to })
                            timestampCasuale({ from, to })
                            msCasuali({ from, to })`
                            }}
                        </CodeBlock>

                        <div v-if="res.date || res.timestamp || typeof res.ms === 'number'"
                            class="text-bg-dark p-3 rounded border border-secondary">
                            <div class="row g-3">
                                <div class="col-12 col-md-4" v-if="res.date">
                                    <div class="small text-body-secondary">Date</div>
                                    <div class="fw-semibold">{{ fmt(res.date) }}</div>
                                </div>
                                <div class="col-12 col-md-4" v-if="res.timestamp">
                                    <div class="small text-body-secondary">Timestamp</div>
                                    <div class="fw-semibold">
                                        {{ fmt(res.timestamp.toDate()) }}
                                    </div>
                                </div>
                                <div class="col-12 col-md-4" v-if="typeof res.ms === 'number'">
                                    <div class="small text-body-secondary">ms (epoch)</div>
                                    <div class="fw-semibold">{{ res.ms }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="alert alert-secondary border mb-0 text-center">
                            <div class="d-flex flex-column align-items-center gap-1">
                                <span class="material-symbols-outlined" style="font-size: 32px;">event</span>
                                <div class="fw-semibold">Nessun risultato</div>
                                <div class="small text-body-secondary">Premi uno dei pulsanti per generare un valore.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- HTML INPUT FORMATTERS -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Formati per input HTML</h2>

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex flex-wrap gap-2 mb-2">
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runDateToInput">
                                dateToInput*
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runInputDateCasuale">
                                inputDateCasuale
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runInputTimeCasuale">
                                inputTimeCasuale
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play"
                                @click="runInputDateTimeLocalCasuale">
                                inputDateTimeLocalCasuale
                            </Btn>
                        </div>

                        <CodeBlock class="my-2" ts>
                            {{
                                `dateToInputDate(d)
                            dateToInputTime(d)
                            dateToInputDateTimeLocal(d)

                            inputDateCasuale({ from, to })
                            inputTimeCasuale({ hourFrom, hourTo, minuteStep })
                            inputDateTimeLocalCasuale({ from, to }, { hourFrom, hourTo, minuteStep })`
                            }}
                        </CodeBlock>

                        <div v-if="res.inputDate || res.inputTime || res.inputDateTimeLocal"
                            class="text-bg-dark p-3 rounded border border-secondary">
                            <div class="row g-3">
                                <div class="col-12 col-md-4" v-if="res.inputDate">
                                    <div class="small text-body-secondary">input[type=date]</div>
                                    <div class="fw-semibold">{{ res.inputDate }}</div>
                                </div>
                                <div class="col-12 col-md-4" v-if="res.inputTime">
                                    <div class="small text-body-secondary">input[type=time]</div>
                                    <div class="fw-semibold">{{ res.inputTime }}</div>
                                </div>
                                <div class="col-12 col-md-4" v-if="res.inputDateTimeLocal">
                                    <div class="small text-body-secondary">input[type=datetime-local]</div>
                                    <div class="fw-semibold">{{ res.inputDateTimeLocal }}</div>
                                </div>
                            </div>

                            <div class="mt-3">
                                <div class="small text-body-secondary mb-1">Preview inputs</div>
                                <div class="row g-2">
                                    <div class="col-12 col-md-4">
                                        <input type="date" class="form-control" :value="res.inputDate ?? ''" />
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <input type="time" class="form-control" :value="res.inputTime ?? ''" />
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <input type="datetime-local" class="form-control"
                                            :value="res.inputDateTimeLocal ?? ''" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="alert alert-secondary border mb-0 text-center">
                            <div class="d-flex flex-column align-items-center gap-1">
                                <span class="material-symbols-outlined" style="font-size: 32px;">schedule</span>
                                <div class="fw-semibold">Nessun risultato</div>
                                <div class="small text-body-secondary">Esegui una delle funzioni di formattazione.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SHORTCUTS -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Shortcut comodi</h2>

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="input-group mb-2">
                            <span class="input-group-text">days</span>
                            <input v-model.number="shortcutDays" type="number" min="0" class="form-control" />
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runUltimiGiorniDate">
                                date ultimi N
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runProssimiGiorniDate">
                                date prossimi N
                            </Btn>
                        </div>

                        <div class="d-flex flex-wrap gap-2 mb-2">
                            <Btn color="primary" variant="outline" icon="motion_play" @click="runUltimiGiorniTimestamp">
                                timestamp ultimi N
                            </Btn>
                            <Btn color="primary" variant="outline" icon="motion_play"
                                @click="runProssimiGiorniTimestamp">
                                timestamp prossimi N
                            </Btn>
                        </div>

                        <div v-if="res.date || res.timestamp" class="text-bg-dark p-3 rounded border border-secondary">
                            <div class="row g-3">
                                <div class="col-12 col-md-6" v-if="res.date">
                                    <div class="small text-body-secondary">Date</div>
                                    <div class="fw-semibold">{{ fmt(res.date) }}</div>
                                </div>
                                <div class="col-12 col-md-6" v-if="res.timestamp">
                                    <div class="small text-body-secondary">Timestamp</div>
                                    <div class="fw-semibold">{{ fmt(res.timestamp.toDate()) }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="alert alert-secondary border mb-0 text-center">
                            <div class="d-flex flex-column align-items-center gap-1">
                                <span class="material-symbols-outlined" style="font-size: 32px;">bolt</span>
                                <div class="fw-semibold">Nessun risultato</div>
                                <div class="small text-body-secondary">Imposta days e genera uno shortcut.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RANGE HELPERS -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Range helpers</h2>

                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <div class="row g-2 align-items-end mb-2">
                            <div class="col-12 col-md-6">
                                <label class="form-label mb-1">rangeGiorno(d)</label>
                                <input v-model="rangeDayInput" type="date" class="form-control" />
                            </div>
                            <div class="col-12 col-md-6 d-flex gap-2">
                                <Btn color="primary" variant="outline" icon="motion_play" class="w-100"
                                    @click="runRangeGiorno">
                                    rangeGiorno
                                </Btn>
                                <Btn color="primary" variant="outline" icon="motion_play" class="w-100"
                                    @click="runNormalizeRange">
                                    normalizeRange
                                </Btn>
                            </div>
                        </div>

                        <CodeBlock class="my-2" ts>
                            {{
                                `rangeGiorno(d)
                            normalizeRange(range?)`
                            }}
                        </CodeBlock>

                        <div v-if="res.range || res.rangeDay" class="text-bg-dark p-3 rounded border border-secondary">
                            <div class="row g-3">
                                <div class="col-12 col-md-6" v-if="res.rangeDay">
                                    <div class="small text-body-secondary">rangeGiorno</div>
                                    <div class="fw-semibold">{{ fmt(res.rangeDay.from) }} → {{ fmt(res.rangeDay.to) }}
                                    </div>
                                </div>
                                <div class="col-12 col-md-6" v-if="res.range">
                                    <div class="small text-body-secondary">normalizeRange</div>
                                    <div class="fw-semibold">{{ fmt(res.range.from) }} → {{ fmt(res.range.to) }}</div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="alert alert-secondary border mb-0 text-center">
                            <div class="d-flex flex-column align-items-center gap-1">
                                <span class="material-symbols-outlined" style="font-size: 32px;">date_range</span>
                                <div class="fw-semibold">Nessun risultato</div>
                                <div class="small text-body-secondary">Genera un range con i pulsanti.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- BULK -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Bulk</h2>
                <p class="text-body-secondary mb-2">Genera una lista di date (utile per testare tabelle e filtri).</p>

                <div class="input-group mb-2">
                    <span class="input-group-text">qty</span>
                    <input v-model.number="bulkQty" type="number" min="0" class="form-control" />
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runBulk">Genera</Btn>
                    <Btn color="secondary" variant="outline" icon="delete" @click="clear">Pulisci</Btn>
                </div>

                <div v-if="res.bulk?.length" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="small text-body-secondary">Risultati: <b>{{ res.bulk.length }}</b></div>
                        <Btn color="secondary" variant="ghost" icon="content_copy"
                            @click="copyToClipboard(JSON.stringify(res.bulk, null, 2))">
                            Copia JSON
                        </Btn>
                    </div>
                    <pre class="mb-0" style="white-space: pre-wrap;">{{ JSON.stringify(res.bulk, null, 2) }}</pre>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">dataset</span>
                        <div class="fw-semibold">Nessuna lista generata</div>
                        <div class="small text-body-secondary">Imposta qty e premi <b>Genera</b>.</div>
                    </div>
                </div>
            </div>

            <!-- STATE -->
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="h5 mb-0">Stato attuale</h2>
                    <Btn v-if="hasAnyResult" color="secondary" variant="outline" icon="mop" @click="clear">
                        Reset
                    </Btn>
                </div>

                <div v-if="hasAnyResult" class="text-bg-dark p-3 rounded border border-secondary">
                    <pre class="mb-0" style="white-space: pre-wrap;">{{
                        JSON.stringify(
                            {
                                ...res,
                                // Date/Timestamp in JSON non sono super leggibili: aggiungo “shadow fields”
                                __date: res.date ? fmt(res.date) : undefined,
                                __timestamp: res.timestamp ? fmt(res.timestamp.toDate()) : undefined,
                            },
                            null,
                            2
                        )
                    }}</pre>
                </div>

                <div v-else class="alert alert-secondary border text-center mb-0">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">tune</span>
                        <div class="fw-semibold">Nessuna demo eseguita</div>
                        <div class="small text-body-secondary">Usa i pulsanti sopra per generare output.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
