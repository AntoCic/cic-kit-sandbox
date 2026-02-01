<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import type { Announcement } from "@src/models/Announcement"
import { announcementStore } from "@src/stores/announcementStore"
import { Btn, toast } from "cic-kit"

// -------------------- UI state --------------------
const loading = ref(false)
const search = ref("")
const showForm = ref(true)

const newType = ref("info")
const newText = ref("")

const editingId = ref<string | null>(null)
const editingType = ref("")
const editingText = ref("")

// -------------------- Derived --------------------
const items = computed<Announcement[]>(() => (announcementStore.itemsActiveArray as Announcement[] ?? []))

// -------------------- Helpers --------------------
function resetNew() {
    newType.value = "info"
    newText.value = ""
}

function cancelEdit() {
    editingId.value = null
    editingType.value = ""
    editingText.value = ""
}

function startEdit(id: string) {
    const item = announcementStore.items?.[id]
    if (!item) return
    editingId.value = id
    editingType.value = item.type
    editingText.value = item.text
}

function formatTs(ts: any) {
    if (!ts?.toDate) return "—"
    try {
        return ts.toDate().toLocaleString()
    } catch {
        return "—"
    }
}

// -------------------- CRUD --------------------
async function reload() {
    loading.value = true
    try {
        await announcementStore.get()
    } catch (e) {
        console.error(e)
        toast.error("Errore durante il caricamento")
    } finally {
        loading.value = false
    }
}

async function addAnnouncement() {
    const type = newType.value.trim()
    const text = newText.value.trim()

    if (!type || !text) {
        toast.error("Compila type e text")
        return
    }

    loading.value = true
    try {
        await announcementStore.add({
            id: "",
            type,
            text,
        })
        toast.success("Announcement creato")
        resetNew()
    } catch (e) {
        console.error(e)
        toast.error("Errore durante la creazione")
    } finally {
        loading.value = false
    }
}

async function saveEdit(id: string) {
    const item = announcementStore.items?.[id]
    if (!item) return

    const type = editingType.value.trim()
    const text = editingText.value.trim()

    if (!type || !text) {
        toast.error("Compila type e text")
        return
    }

    loading.value = true
    try {
        // FirestoreModel: update(partial)
        await item.update({ type, text })
        toast.success("Announcement aggiornato")
        cancelEdit()
    } catch (e) {
        console.error(e)
        toast.error("Errore durante l’aggiornamento")
    } finally {
        loading.value = false
    }
}

async function removeAnnouncement(id: string) {
    const item: any = announcementStore.items?.[id]
    if (!item) return
    if (!confirm("Sicuro di voler eliminare questo announcement?")) return

    loading.value = true
    try {
        // Provo softDelete se esiste, altrimenti delete (varie API possibili)
        if (typeof item.softDelete === "function") {
            await item.softDelete()
        } else if (typeof item.delete === "function") {
            // in alcuni tuoi store vecchi: item.delete(store)
            await item.delete(announcementStore)
        } else if (typeof (announcementStore as any).delete === "function") {
            await (announcementStore as any).delete(id)
        } else {
            throw new Error("Nessun metodo delete/softDelete disponibile")
        }

        toast.success("Announcement eliminato")
    } catch (e) {
        console.error(e)
        toast.error("Errore durante l’eliminazione")
    } finally {
        loading.value = false
    }
}

// -------------------- Lifecycle --------------------
onMounted(reload)
</script>

<template>
    <div class="container py-3 overflow-auto h-100">
        <div class="row g-2 align-items-center mb-3">
            <div class="col-12 col-md">
                <input v-model="search" type="search" class="form-control" placeholder="Cerca per id, type o text…" />
            </div>

            <div class="col-12 col-md-auto d-flex gap-2">
                <Btn color="secondary" variant="outline" icon="refresh" :loading="loading" @click="reload">
                    Reload
                </Btn>

                <Btn color="secondary" variant="outline" :icon="showForm ? 'expand_less' : 'add'"
                    @click="showForm = !showForm">
                    {{ showForm ? "Nascondi form" : "Nuovo" }}
                </Btn>
            </div>
        </div>

        <!-- Form Nuovo -->
        <div v-if="showForm" class="card mb-3">
            <div class="card-body">
                <form class="row g-2" @submit.prevent="addAnnouncement" novalidate>
                    <div class="col-12 col-md-3">
                        <input v-model="newType" class="form-control" placeholder="type (es. info, warning)" />
                    </div>
                    <div class="col-12 col-md-9">
                        <input v-model="newText" class="form-control" placeholder="text..." />
                    </div>

                    <div class="col-12 d-flex gap-2">
                        <Btn color="primary" type="submit" icon="save" :loading="loading">
                            Salva
                        </Btn>
                        <Btn color="secondary" variant="outline" icon="close" @click="resetNew">
                            Svuota
                        </Btn>
                    </div>
                </form>
            </div>
        </div>

        <!-- Lista -->
        <div class="list-group">
            <div v-if="!items.length" class="list-group-item text-muted">
                Nessun announcement. Creane uno dal form sopra.
            </div>

            <div v-for="a in items" :key="a.id" class="list-group-item d-flex align-items-start">
                <!-- Delete -->
                <Btn class="me-2" size="sm" color="danger" variant="outline" icon="delete" :disabled="loading"
                    @click="removeAnnouncement(a.id)" />

                <div class="flex-grow-1">
                    <!-- EDIT MODE -->
                    <template v-if="editingId === a.id">
                        <div class="row g-2">
                            <div class="col-12 col-md-3">
                                <input v-model="editingType" class="form-control" placeholder="type" />
                            </div>
                            <div class="col-12 col-md-9">
                                <input v-model="editingText" class="form-control" placeholder="text" />
                            </div>
                        </div>

                        <div class="mt-2 d-flex gap-2">
                            <Btn size="sm" color="success" icon="check" :loading="loading" @click="saveEdit(a.id)">
                                Salva
                            </Btn>
                            <Btn size="sm" color="secondary" variant="outline" icon="close" @click="cancelEdit">
                                Annulla
                            </Btn>
                        </div>
                    </template>

                    <!-- VIEW MODE -->
                    <template v-else>
                        <div class="d-flex align-items-center gap-2">
                            <div class="fw-semibold">
                                {{ a.type }}
                                <small class="text-muted">#{{ a.id }}</small>
                            </div>
                            <Btn size="sm" color="secondary" variant="ghost" icon="edit" :disabled="loading"
                                @click="startEdit(a.id)" />
                        </div>

                        <div class="mt-1">{{ a.text }}</div>

                        <small class="text-muted d-block mt-1">
                            Updated: {{ formatTs((a as any).updatedAt) }} — Created: {{ formatTs((a as any).createdAt)
                            }}
                        </small>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-group-item {
    min-height: 64px;
}
</style>
