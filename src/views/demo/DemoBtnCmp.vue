<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { BtnCmp, type BtnColor, type BtnVariant } from "cic-kit";

const route = useRoute();
const colors: BtnColor[] = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
];

const variants: BtnVariant[] = ["solid", "outline", "ghost", "link"];

const sectionId = (name: string) => `demo-${name.toLowerCase()}`;

const currentRouteName = computed(() => String(route.name ?? ""));
</script>

<template>
    <div class="container">
        <div class="row text-center py-5">
            <div class="col-12 mb-4">
                <h1>DemoBtnCmp</h1>
                <p class="text-muted mb-0">
                    Showcase delle principali prop di <code>BtnCmp</code>: <code>color</code>,
                    <code>variant</code>, <code>size</code>, <code>block</code>, <code>disabled</code>,
                    <code>loading</code>, <code>icon</code>, <code>to</code>.
                </p>
            </div>

            <!-- mini menu -->
            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('color')}`">color</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('variant')}`">variant</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('size')}`">size</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('block')}`">block</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('disabled')}`">disabled</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('loading')}`">loading</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('icon')}`">icon</a>
                    <a class="btn btn-sm btn-outline-secondary" :href="`#${sectionId('to')}`">to</a>
                </div>
            </div>
        </div>

        <!-- COLOR -->
        <section class="row pb-5" :id="sectionId('color')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>color</code></h2>
                <p class="text-muted mb-0">
                    <code>color</code> usa i colori Bootstrap. Qui vedi tutti i colori disponibili su
                    variante <code>solid</code>.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <BtnCmp v-for="c in colors" :key="c" :color="c">
                        {{ c }}
                    </BtnCmp>
                </div>
            </div>
        </section>

        <!-- VARIANT -->
        <section class="row pb-5" :id="sectionId('variant')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>variant</code></h2>
                <p class="text-muted mb-0">
                    <code>variant</code> cambia lo stile del bottone: <code>solid</code>, <code>outline</code>,
                    <code>ghost</code>, <code>link</code>. Stesso <code>color</code>, aspetto diverso.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <BtnCmp v-for="v in variants" :key="v" color="primary" :variant="v">
                        {{ v }}
                    </BtnCmp>
                </div>

                <div class="mt-3 text-muted small">
                    Suggerimento: <code>outline</code> e <code>ghost</code> sono perfetti per azioni secondarie,
                    <code>link</code> per CTA “testuali”.
                </div>
            </div>
        </section>

        <!-- SIZE -->
        <section class="row pb-5" :id="sectionId('size')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>size</code></h2>
                <p class="text-muted mb-0">
                    <code>size</code> supporta <code>sm</code> e <code>lg</code>. Se non passi nulla, è la size
                    “default”.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-column align-items-center gap-3">
                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                        <BtnCmp color="dark">default</BtnCmp>
                        <BtnCmp color="dark" size="sm">sm</BtnCmp>
                        <BtnCmp color="dark" size="lg">lg</BtnCmp>
                    </div>

                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                        <BtnCmp color="success" variant="outline">default</BtnCmp>
                        <BtnCmp color="success" variant="outline" size="sm">sm</BtnCmp>
                        <BtnCmp color="success" variant="outline" size="lg">lg</BtnCmp>
                    </div>
                </div>
            </div>
        </section>

        <!-- BLOCK -->
        <section class="row pb-5" :id="sectionId('block')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>block</code></h2>
                <p class="text-muted mb-0">
                    <code>block</code> rende il bottone full-width (<code>w-100</code>). Utile su mobile o in form.
                </p>
            </div>

            <div class="col-12 col-md-6 mx-auto">
                <div class="d-flex flex-column gap-2">
                    <BtnCmp color="primary" :block="true">Primary block</BtnCmp>
                    <BtnCmp color="dark" variant="outline" :block="true">Outline block</BtnCmp>
                    <BtnCmp color="secondary" variant="ghost" :block="true">Ghost block</BtnCmp>
                </div>
            </div>
        </section>

        <!-- DISABLED -->
        <section class="row pb-5" :id="sectionId('disabled')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>disabled</code></h2>
                <p class="text-muted mb-0">
                    <code>disabled</code> disabilita il click e lo stile comunica lo stato non attivo.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <BtnCmp color="primary" :disabled="true">Disabled solid</BtnCmp>
                    <BtnCmp color="primary" variant="outline" :disabled="true">Disabled outline</BtnCmp>
                    <BtnCmp color="primary" variant="ghost" :disabled="true">Disabled ghost</BtnCmp>
                    <BtnCmp color="primary" variant="link" :disabled="true">Disabled link</BtnCmp>
                </div>
            </div>
        </section>

        <!-- LOADING -->
        <section class="row pb-5" :id="sectionId('loading')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>loading</code></h2>
                <p class="text-muted mb-0">
                    <code>loading</code> mostra lo spinner e disabilita l’azione mentre stai aspettando una async.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <BtnCmp color="success" :loading="true">Salvataggio…</BtnCmp>
                    <BtnCmp color="danger" variant="outline" :loading="true">Eliminazione…</BtnCmp>
                    <BtnCmp color="dark" variant="ghost" :loading="true">Caricamento…</BtnCmp>
                </div>
            </div>
        </section>

        <!-- ICON -->
        <section class="row pb-5" :id="sectionId('icon')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>icon</code></h2>
                <p class="text-muted mb-0">
                    <code>icon</code> accetta una stringa con il nome della Material Symbol (es: <code>add</code>,
                    <code>delete</code>).
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <BtnCmp color="primary" icon="add">Nuovo</BtnCmp>
                    <BtnCmp color="warning" variant="outline" icon="edit">Modifica</BtnCmp>
                    <BtnCmp color="danger" variant="solid" icon="delete">Elimina</BtnCmp>
                    <BtnCmp color="dark" variant="ghost" icon="download">Download</BtnCmp>
                    <BtnCmp color="info" variant="link" icon="open_in_new">Apri</BtnCmp>
                </div>
            </div>
        </section>

        <!-- TO (router) -->
        <section class="row pb-5" :id="sectionId('to')">
            <div class="col-12 text-start mb-3">
                <h2 class="h4 mb-1">Prop: <code>to</code></h2>
                <p class="text-muted mb-0">
                    <code>to</code> naviga usando <code>router.push</code>. Qui mostro un esempio con una route per
                    nome.
                </p>
            </div>

            <div class="col-12">
                <div class="d-flex flex-column align-items-center gap-2">
                    <div class="text-muted small">
                        Route corrente: <code>{{ currentRouteName }}</code>
                    </div>

                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                        <BtnCmp color="primary" icon="home" :to="{ name: 'home' }">
                            Vai a home
                        </BtnCmp>

                        <BtnCmp color="secondary" variant="outline" icon="search"
                            :to="{ name: 'home', query: { q: 'demo' } }">
                            Vai a home con query
                        </BtnCmp>
                    </div>

                    <div class="text-muted small mt-2">
                        Se nel cic-kit-sandbox non hai una route <code>home</code>, aggiorna il <code>name</code> in base alle
                        tue routes.
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
