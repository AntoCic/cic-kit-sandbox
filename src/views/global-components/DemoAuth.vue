<script setup lang="ts">
import { Auth, Btn, BtnMoveIcon, ObjectViewer } from 'cic-kit';

const reload = () => window.location.reload();
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-t">
            <div class="col-12  text-center mb-3">
                <h1 class="f-monoton">cic-kit-sandbox cic-kit</h1>
            </div>
            <div class="col-12 mb-4">
                <p>Pacchetto JavaScript pensato per essere riutilizzabile e facilmente integrabile in altri progetti.
                    Espone funzionalità modulari e ben isolate, sviluppate per essere consumate come dipendenza esterna
                    tramite npm, ma testabili anche in locale durante lo sviluppo tramite un progetto cic-kit-sandbox. È
                    pensato
                    per semplificare lo sviluppo, favorire il riuso del codice e mantenere una struttura chiara e
                    manutenibile.</p>
            </div>
            <div class="col-12">
                <BtnMoveIcon icon="refresh" @click="reload">Ricarica</BtnMoveIcon>
            </div>

            <div class="col-12">
                <Btn @click="Auth!.loginWithGoogle">google login</Btn>
                <Btn @click="Auth!.logout">logout</Btn>
                <Btn @click="() => console.log(Auth)">log</Btn>
            </div>

            <div class="col-12">
                <!-- <Logo src="/img/logo/logo.png" /> -->
                <!-- <Avatar src="/img/logo/logo.png" initials="AC" full-name="Antonino Cicala" /> -->
            </div>
            <div class="col-12">
                <h2>user</h2>
                <ObjectViewer :obj="Auth!.user" />
            </div>
            <div class="col-12">
                <h2>firebaseUser</h2>
                <ObjectViewer :obj="Auth!.firebaseUser" />
            </div>

        </div>
    </div>
</template>
