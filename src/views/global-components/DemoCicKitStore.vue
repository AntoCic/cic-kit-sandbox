<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "@src/utils/CodeBlock.vue";
import { cicKitStore, LS } from "cic-kit";

// Mostriamo lo stato completo dello store
const storeJson = computed(() =>
  JSON.stringify(cicKitStore, null, 2)
);

</script>

<template>
  <div class="p-3 border rounded mt-3">
    <h5 class="mb-2">Store generale cic-kit</h5>

    <p class="text-muted mb-3">
      <strong>cicKitStore</strong> è uno store globale reactive condiviso
      tra tutti i componenti. Qui sotto vedi il suo contenuto in tempo reale.
    </p>

    <CodeBlock lang="json">
      {{ storeJson }}
    </CodeBlock>

    <small class="text-muted d-block mt-2">
      💡 Essendo reactive, ogni modifica allo store aggiorna
      automaticamente la UI.
    </small>
  </div>

  <div class="col-12 mb-4">
    <div
      class="form-check form-switch ps-0 d-flex flex-row align-items-center gap-2 justify-content-between border-bottom">
      <label class="form-check-label mb-0" for="checkDebugMod">
        Debug mode
      </label>
      <input class="form-check-input m-0" type="checkbox" role="switch" id="checkDebugMod"
        v-model="cicKitStore.debugMod" @change="() => LS.set(LS.defaultKey.debugMod, cicKitStore.debugMod)">
    </div>
  </div>
</template>
