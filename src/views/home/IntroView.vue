<script setup lang="ts">
import { Auth } from '@src/main';
import { Btn, BtnMoveIcon, toast } from 'cic-kit';

const reload = () => window.location.reload();

const update = () => {

    if (!('serviceWorker' in navigator)) {
        toast.warning('ℹ️ Aggiornamento disponibile, ma il browser non supporta i Service Worker');
        return;
    }

    navigator.serviceWorker
        .getRegistration()
        .then((reg) => {
            if (!reg) {
                toast.warning('ℹ️ Nessun Service Worker registrato');
                return;
            }
            toast.success('✨ Nuova versione disponibile, ricarico la pagina…');
            return reg
                .update()
                .then(() => new Promise((r) => setTimeout(r, 2000)));
        })
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            toast.error('Errore durante l’aggiornamento dell’app');
        });
}
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-t">
            <div class="col mb-3">
                <h1 class="f-monoton">cic-kit-sandbox cic-kit</h1>
            </div>
            <div class="col-auto mb-3">
                <Btn v-if="!Auth.isLoggedIn" icon="account_circle" variant="ghost" class="rounded-pill p-1"
                    :to="{ name: 'View: Login' }" />
                <Btn v-else icon="power_settings_circle" color="danger" variant="ghost" class="rounded-pill p-1"
                    @click="() => Auth.logout()" />
            </div>
            <div class="col-12 mb-4">
                <p>
                    Pacchetto JavaScript pensato per essere riutilizzabile e facilmente integrabile in altri progetti.
                    Espone funzionalità modulari e ben isolate, sviluppate per essere consumate come dipendenza esterna
                    tramite npm, ma testabili anche in locale durante lo sviluppo tramite un progetto cic-kit-sandbox. È
                    pensato per semplificare lo sviluppo, favorire il riuso del codice e mantenere una struttura chiara
                    e manutenibile.
                </p>
            </div>

            <div class="col-12">
                <BtnMoveIcon icon="system_update_alt" @click="update">Update</BtnMoveIcon>
                <BtnMoveIcon icon="refresh" @click="reload">Ricarica</BtnMoveIcon>
            </div>
        </div>
    </div>
</template>
