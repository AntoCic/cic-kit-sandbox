<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

function routeTo(name: string, params?: Record<string, any>, query?: Record<string, any>) {
    return router.push({ name, params, query })
}

const props = defineProps<{
    kind: '404' | 'unauthorized'
    attemptedPath?: string
}>()

</script>

<template>
    <div class="container">
        <div class="row text-center py-5">
            <div class="col-12 mb-4">
                <!-- <img src="/public/img/error_view/error.svg" class="" alt="errore-caricamento-pagina" /> -->
            </div>
            <div class="col-12 mb-4">
                <h1 class="mb-0">
                    <template v-if="props.kind === '404'">
                        Pagina non trovata
                    </template>
                    <template v-else-if="props.kind === 'unauthorized'">
                        Accesso non autorizzato
                    </template>
                </h1>
            </div>
            <div class="col-12">
                <p v-if="props.attemptedPath">
                    Hai tentato di accedere a: <strong>{{ props.attemptedPath }}</strong>
                </p>

                <button class="btn btn-primary mt-3" @click="routeTo('home')">
                    Torna alla Home
                </button>
            </div>
        </div>
    </div>
</template>
