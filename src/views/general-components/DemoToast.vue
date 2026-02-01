<script setup lang="ts">
import { Btn, toast } from "cic-kit";

const typeToast = {
    success: "success",
    error: "danger",
    warning: "warning",
    info: "info",
    primary: "primary",
    secondary: "secondary",
} as const;

const typeDevToast = {
    log: "info",
    logError: "danger",
} as const;

const showToast = (type: keyof typeof typeToast) => {
    toast[type]?.({
        title: `Toast ${type}`,
        message: "Questo è un messaggio di esempio",
    });
};

const showDevToast = (type: keyof typeof typeDevToast) => {
    toast[type]?.({
        title: `Dev toast ${type}`,
        message: "Questo è un messaggio di esempio",
    });
};
</script>

<template>
    <div class="container">
        <div class="row text-center py-5">
            <div class="col-12 mb-4">
                <h1>Toast</h1>
                <div class="alert alert-warning">
                    <strong>⚠️ Importante:</strong>
                    per far funzionare le <strong>toast notifications</strong> è necessario
                    inserire il componente <code>&lt;ToastCmp /&gt;</code> in
                    <code>App.vue</code> (o in un layout globale).
                </div>
                <p class="text-muted mb-0">
                    Demo del sistema di <strong>toast notifications</strong> incluso in
                    <code>cic-kit</code>.
                </p>
            </div>
        </div>

        <!-- TOAST STANDARD -->
        <section class="row pb-5">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Toast applicativi</h2>
                <p class="text-muted mb-0">
                    Toast pensati per feedback utente: successo, errore, warning, info ecc.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <Btn v-for="(color, toastType) in typeToast" :key="toastType" :color="color" icon="notifications"
                        @click="showToast(toastType)">
                        {{ toastType }}
                    </Btn>
                </div>
            </div>
        </section>

        <!-- TOAST DEV -->
        <section class="row pb-5">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Toast developer</h2>
                <p class="text-muted mb-0">
                    (non si vede nulla al click sui button da un ambiente di produzione) Toast utili in fase di sviluppo
                    per log, debug o errori tecnici.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <Btn v-for="(color, toastType) in typeDevToast" :key="toastType" :color="color" variant="outline"
                        icon="bug_report" @click="showDevToast(toastType)">
                        {{ toastType }}
                    </Btn>
                </div>
            </div>
        </section>
    </div>
</template>
