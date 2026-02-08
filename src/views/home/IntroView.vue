<script setup lang="ts">
import { Auth } from '@src/main';
import { Btn, BtnMoveIcon } from 'cic-kit';

const reload = () => window.location.reload();
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-t">
            <div class="col mb-3">
                <h1 class="f-monoton">cic-kit-sandbox cic-kit</h1>
            </div>
            <div class="col-auto mb-3">
                <Btn v-if="!Auth.isLoggedIn" icon="account_circle" variant="ghost" class="rounded-pill p-1"
                    :to="{ name: 'auth' }" />
                <Btn v-else icon="power_settings_circle" color="danger" variant="ghost" class="rounded-pill p-1"
                    @click="() => Auth.logout()" />
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
                <p>
                    <br><br># TODO

                    <br> esportare + demo :: Logo
                    <br> esportare + demo :: AvatarCmp
                    <br> esportare + demo :: Modal
                    <br> esportare + demo :: AppConfigViewDev
                    <br> esportare + demo :: FirestoreDevView
                    <br> esportare + demo :: LSViewDev
                    <br> esportare + demo :: MsgPushViewDev
                    <br> esportare + demo :: HomeViewDev

                    <br><br>Firebase / Firestore
                    <br> esportare + demo :: firebase
                    <br> esportare + demo :: FirestoreModel
                    <br> esportare + demo :: FirestoreStore
                    <br> esportare + demo :: middlewareCatchCall
                    <br> esportare + demo :: useStoreWatch
                    <br> esportare + demo :: FirebaseStorage
                    <br> esportare + demo :: ImgUploader

                    <br><br>Form validator
                    <br> esportare + demo :: FormValidator
                    <br> esportare + demo :: InputValueParser
                    <br> esportare + demo :: Validator

                    <br><br> rinominare se necessari per mettere prima input o prima Field
                    <br> esportare + demo :: FieldGender
                    <br> esportare + demo :: Gender
                    <br> esportare + demo :: FieldPhoneNumber
                    <br> esportare + demo :: PhoneNumber
                    <br> esportare + demo :: ColorTag
                    <br> esportare + demo :: ColorTagInput
                    <br> esportare + demo :: TagInput
                    <br> esportare + demo :: InputField
                    <br> esportare + demo :: TiptapField

                    <br> esportare + demo :: pushMsg
                    <br> esportare + demo :: RegisterSW
                    <br> esportare + demo :: parseTimestamp
                    <br> esportare + demo :: FooterApp
                    <br> esportare + demo :: HeaderApp
                    <br> esportare + demo :: ToolbarTab
                    <br> esportare + demo :: useChangeToolbar

                    <br> esportare + demo :: AvatarUser
                    <br> esportare + demo :: AvatarUserCmp
                    <br> esportare + demo :: AvatarUserEditor
                    <br> esportare + demo :: AvatarUserPicker
                    <br> esportare + demo :: AvatarUserPickerGender

                    <br> controllare import necessari per router.ts controllare con GameScore
                    <br> controllare import necessari per App.vue controllare con GameScore
                    <br> controllare import necessari per sw.ts controllare con GameScore

                    <br> controllare import necessari per creare pacchetto cic-functions-kit.ts
                </p>
            </div>
        </div>
    </div>
</template>
