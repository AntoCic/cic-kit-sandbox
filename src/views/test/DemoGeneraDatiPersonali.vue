<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue'
import {
    Btn, type Gender, type PhoneNumber,
    generaNome,
    generaCognome,
    generaFullName,
    generaEmail,
    generaIndirizzo,
    generaNumeroTelefono,
    generaPhoneNumber,
    generaGender,
} from 'cic-kit'
import { computed, ref } from 'vue'


type NameGender = 'm' | 'f' | 'all'
type PhoneFormat = 'mobile' | 'fisso'

const nomeGender = ref<NameGender>('all')
const fullNameGender = ref<NameGender>('all')

const emailUseProvided = ref<boolean>(true)
const emailNome = ref<string>('')
const emailCognome = ref<string>('')

const phoneFormat = ref<PhoneFormat>('mobile')

type Result = {
    nome?: string
    cognome?: string
    fullName?: string
    email?: string
    indirizzo?: string
    telefono?: string
    phoneNumber?: PhoneNumber
    gender?: Gender
    bulk?: Array<{
        fullName: string
        email: string
        phone: string
        address: string
        gender: Gender
    }>
}
const res = ref<Result>({})

const nomeGenderArg = computed(() => {
    if (nomeGender.value === 'all') return undefined
    return nomeGender.value
})
const fullNameGenderArg = computed(() => {
    if (fullNameGender.value === 'all') return undefined
    return fullNameGender.value
})

const hasAnyResult = computed(() => Object.keys(res.value).length > 0)

function clear() {
    res.value = {}
}

function runNome() {
    res.value = { ...res.value, nome: generaNome(nomeGenderArg.value) }
}

function runCognome() {
    res.value = { ...res.value, cognome: generaCognome() }
}

function runFullName() {
    res.value = { ...res.value, fullName: generaFullName(fullNameGenderArg.value) }
}

function runEmail() {
    const n = emailUseProvided.value ? emailNome.value.trim() || undefined : undefined
    const c = emailUseProvided.value ? emailCognome.value.trim() || undefined : undefined
    res.value = { ...res.value, email: generaEmail(n, c) }
}

function runIndirizzo() {
    res.value = { ...res.value, indirizzo: generaIndirizzo() }
}

function runNumeroTelefono() {
    res.value = { ...res.value, telefono: generaNumeroTelefono(phoneFormat.value) }
}

function runPhoneNumber() {
    res.value = { ...res.value, phoneNumber: generaPhoneNumber() }
}

function runGender() {
    res.value = { ...res.value, gender: generaGender() }
}

function runAllOne() {
    const g = generaGender()
    // per nome usiamo solo m/f quando possibile, altrimenti random
    const gForName: 'm' | 'f' | undefined = g === 'm' || g === 'f' ? g : undefined

    const fullName = generaFullName(gForName)
    const [n, ...rest] = fullName.split(' ')
    const c = rest.join(' ').trim()

    res.value = {
        nome: n,
        cognome: c,
        fullName,
        email: generaEmail(n, c),
        indirizzo: generaIndirizzo(),
        telefono: generaNumeroTelefono('mobile'),
        phoneNumber: generaPhoneNumber(),
        gender: g,
    }
}

const bulkQty = ref<number>(10)
function runBulk() {
    const qty = Math.max(0, Number(bulkQty.value ?? 0))
    const arr: Result['bulk'] = []

    for (let i = 0; i < qty; i++) {
        const g = generaGender()
        const gForName: 'm' | 'f' | undefined = g === 'm' || g === 'f' ? g : undefined
        const fullName = generaFullName(gForName)
        const [n, ...rest] = fullName.split(' ')
        const c = rest.join(' ').trim()

        arr.push({
            fullName,
            email: generaEmail(n, c),
            phone: generaNumeroTelefono(Math.random() > 0.8 ? 'fisso' : 'mobile'),
            address: generaIndirizzo(),
            gender: g,
        })
    }

    res.value = { bulk: arr }
}
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>Mock Anagrafica</h1>
                <p class="text-body-secondary mb-0">
                    Generazione di dati fittizi: nome, cognome, email, indirizzo, telefono e gender.
                </p>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="col-12 mb-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-body d-flex flex-wrap gap-2 justify-content-between align-items-center">
                        <div>
                            <div class="fw-semibold">Azioni rapide</div>
                            <div class="small text-body-secondary">Genera un profilo completo o una lista.</div>
                        </div>

                        <div class="d-flex flex-wrap gap-2">
                            <Btn color="primary" variant="solid" icon="auto_awesome" @click="runAllOne">
                                Genera profilo
                            </Btn>
                            <Btn color="secondary" variant="outline" icon="delete" @click="clear">
                                Pulisci
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO: generaNome -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaNome</code></h2>
                <p class="mb-0"><code>genere?: 'm' | 'f'</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `generaNome(${nomeGender === 'all' ? '' : `'${nomeGender}'`});` }}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">genere</span>
                    <select v-model="nomeGender" class="form-select" aria-label="Seleziona genere">
                        <option value="all">Casuale (m + f)</option>
                        <option value="m">Maschile</option>
                        <option value="f">Femminile</option>
                    </select>
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runNome">Esegui</Btn>
                </div>

                <div v-if="res.nome" class="alert alert-dark border mb-0">
                    <span class="material-symbols-outlined align-middle me-1">badge</span>
                    <b>{{ res.nome }}</b>
                </div>
                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">person</span>
                        <div class="fw-semibold">Nessun nome generato</div>
                        <div class="small text-body-secondary">Seleziona il genere e premi <b>Esegui</b>.</div>
                    </div>
                </div>
            </div>

            <!-- DEMO: generaCognome -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaCognome</code></h2>

                <CodeBlock class="my-2" ts>
                    {{ `generaCognome();` }}
                </CodeBlock>

                <div class="d-flex gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runCognome">Esegui</Btn>
                </div>

                <div v-if="res.cognome" class="alert alert-dark border mb-0">
                    <span class="material-symbols-outlined align-middle me-1">id_card</span>
                    <b>{{ res.cognome }}</b>
                </div>
                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">badge</span>
                        <div class="fw-semibold">Nessun cognome generato</div>
                        <div class="small text-body-secondary">Premi <b>Esegui</b>.</div>
                    </div>
                </div>
            </div>

            <!-- DEMO: generaFullName -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaFullName</code></h2>
                <p class="mb-0"><code>genere?: 'm' | 'f'</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `generaFullName(${fullNameGender === 'all' ? '' : `'${fullNameGender}'`});` }}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">genere</span>
                    <select v-model="fullNameGender" class="form-select" aria-label="Seleziona genere">
                        <option value="all">Casuale (m + f)</option>
                        <option value="m">Maschile</option>
                        <option value="f">Femminile</option>
                    </select>
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runFullName">Esegui</Btn>
                </div>

                <pre v-if="res.fullName" class="text-bg-dark p-3 rounded border border-secondary mb-0"
                    style="white-space: pre-wrap;">{{ res.fullName }}</pre>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">account_circle</span>
                        <div class="fw-semibold">Nessun nominativo generato</div>
                        <div class="small text-body-secondary">Imposta il genere (opzionale) e premi <b>Esegui</b>.
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO: generaEmail -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaEmail</code></h2>
                <p class="mb-0"><code>nome?: string, cognome?: string</code></p>

                <CodeBlock class="my-2" ts>
                    {{ emailUseProvided ? `generaEmail('${emailNome || 'nome?'}', '${emailCognome || 'cognome?'}');` :
                        `generaEmail();` }}
                </CodeBlock>

                <div class="form-check form-switch mb-2">
                    <input id="emailUse" v-model="emailUseProvided" class="form-check-input" type="checkbox"
                        role="switch">
                    <label class="form-check-label" for="emailUse">Usa nome/cognome inseriti</label>
                </div>

                <div class="row g-2 mb-2" :class="{ 'opacity-50': !emailUseProvided }">
                    <div class="col-12 col-md-6">
                        <input v-model="emailNome" class="form-control" :disabled="!emailUseProvided"
                            placeholder="Nome (opzionale)" />
                    </div>
                    <div class="col-12 col-md-6">
                        <input v-model="emailCognome" class="form-control" :disabled="!emailUseProvided"
                            placeholder="Cognome (opzionale)" />
                    </div>
                </div>

                <div class="d-flex gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runEmail">Esegui</Btn>
                </div>

                <pre v-if="res.email" class="text-bg-dark p-3 rounded border border-secondary mb-0"
                    style="white-space: pre-wrap;">{{ res.email }}</pre>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">alternate_email</span>
                        <div class="fw-semibold">Nessuna email generata</div>
                        <div class="small text-body-secondary">Premi <b>Esegui</b>.</div>
                    </div>
                </div>
            </div>

            <!-- DEMO: generaIndirizzo -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaIndirizzo</code></h2>

                <CodeBlock class="my-2" ts>
                    {{ `generaIndirizzo();` }}
                </CodeBlock>

                <div class="d-flex gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runIndirizzo">Esegui</Btn>
                </div>

                <pre v-if="res.indirizzo" class="text-bg-dark p-3 rounded border border-secondary mb-0"
                    style="white-space: pre-wrap;">{{ res.indirizzo }}</pre>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">home_pin</span>
                        <div class="fw-semibold">Nessun indirizzo generato</div>
                        <div class="small text-body-secondary">Premi <b>Esegui</b>.</div>
                    </div>
                </div>
            </div>

            <!-- DEMO: telefono -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaNumeroTelefono</code> / <code>generaPhoneNumber</code></h2>
                <p class="mb-0"><code>formato: 'mobile' | 'fisso' = 'mobile'</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `generaNumeroTelefono('${phoneFormat}');` }}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">formato</span>
                    <select v-model="phoneFormat" class="form-select" aria-label="Formato telefono">
                        <option value="mobile">Mobile</option>
                        <option value="fisso">Fisso</option>
                    </select>
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runNumeroTelefono">Numero</Btn>
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runPhoneNumber">PhoneNumber</Btn>
                </div>

                <div v-if="res.telefono || res.phoneNumber" class="text-bg-dark p-3 rounded border border-secondary">
                    <div v-if="res.telefono" class="mb-2">
                        <span class="text-body-secondary">telefono:</span> <b>{{ res.telefono }}</b>
                    </div>
                    <div v-if="res.phoneNumber">
                        <span class="text-body-secondary">phoneNumber:</span>
                        <b>[{{ res.phoneNumber[0] }}, {{ res.phoneNumber[1] }}]</b>
                    </div>
                </div>
                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">call</span>
                        <div class="fw-semibold">Nessun telefono generato</div>
                        <div class="small text-body-secondary">Scegli formato e premi <b>Numero</b> o
                            <b>PhoneNumber</b>.
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEMO: gender -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Function: <code>generaGender</code></h2>
                <p class="mb-0"><code>returns Gender ('m' | 'f' | 'o')</code></p>

                <CodeBlock class="my-2" ts>
                    {{ `generaGender();` }}
                </CodeBlock>

                <div class="d-flex gap-2 mb-2">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runGender">Esegui</Btn>
                </div>

                <div v-if="res.gender" class="alert alert-dark border mb-0">
                    <span class="material-symbols-outlined align-middle me-1">wc</span>
                    <b>{{ res.gender }}</b>
                    <span class="text-body-secondary ms-2 small">
                        (m=maschile, f=femminile, o=other)
                    </span>
                </div>
                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">transgender</span>
                        <div class="fw-semibold">Nessun gender generato</div>
                        <div class="small text-body-secondary">Premi <b>Esegui</b>.</div>
                    </div>
                </div>
            </div>

            <!-- BULK -->
            <div class="col-12 mb-4">
                <h2 class="h4 mb-1">Bulk generator</h2>
                <p class="text-body-secondary mb-2">Genera una lista di profili (utile per tabelle / seed).</p>

                <CodeBlock class="my-2" ts>
                    {{`Array.from({ length: ${bulkQty} }, () => /* profilo */)`}}
                </CodeBlock>

                <div class="input-group mb-2">
                    <span class="input-group-text">qty</span>
                    <input type="number" v-model.number="bulkQty" min="0" class="form-control" placeholder="es. 10">
                    <Btn color="primary" variant="outline" icon="motion_play" @click="runBulk">Genera</Btn>
                </div>

                <div v-if="res.bulk?.length" class="text-bg-dark p-3 rounded border border-secondary">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="small text-body-secondary">Risultati: <b>{{ res.bulk.length }}</b></div>
                        <Btn color="secondary" variant="ghost" icon="delete" @click="res = {}">Pulisci</Btn>
                    </div>

                    <pre class="mb-0" style="white-space: pre-wrap;">{{ JSON.stringify(res.bulk, null, 2) }}</pre>
                </div>

                <div v-else class="alert alert-secondary border mb-0 text-center">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">dataset</span>
                        <div class="fw-semibold">Nessuna lista generata</div>
                        <div class="small text-body-secondary">Imposta la quantità e premi <b>Genera</b>.</div>
                    </div>
                </div>
            </div>

            <!-- OUTPUT COMPLESSIVO (facoltativo) -->
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="h5 mb-0">Stato attuale</h2>
                    <Btn v-if="hasAnyResult" color="secondary" variant="outline" icon="mop" @click="clear">
                        Reset
                    </Btn>
                </div>

                <div v-if="hasAnyResult" class="text-bg-dark p-3 rounded border border-secondary">
                    <pre class="mb-0" style="white-space: pre-wrap;">{{ JSON.stringify(res, null, 2) }}</pre>
                </div>

                <div v-else class="alert alert-secondary border text-center mb-0">
                    <div class="d-flex flex-column align-items-center gap-1">
                        <span class="material-symbols-outlined" style="font-size: 32px;">tune</span>
                        <div class="fw-semibold">Nessuna demo eseguita</div>
                        <div class="small text-body-secondary">Usa i pulsanti sopra per generare dati.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
