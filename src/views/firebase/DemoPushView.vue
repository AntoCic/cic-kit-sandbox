<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Btn, RegisterSW, _Auth, pushMsg } from "cic-kit";
import { VAPID_PUBLIC_KEY } from "../../firebase-config";

pushMsg.vapidPublicKey = VAPID_PUBLIC_KEY;

const token = ref<string | null>(null);
const tokenRegistered = ref(false);
const toUid = ref(_Auth?.uid ?? "");
const pushBody = ref("Test notifica dal demo cic-kit");
const sending = ref(false);
const sendRemoteResult = ref<null | boolean>(null);

const permission = computed(() => pushMsg.permission);
const currentUid = computed(() => _Auth?.uid ?? "-");
const isSupported = computed(() => pushMsg.isNotificationSupported);

async function askPermission() {
  await pushMsg.askPermission();
}

async function refreshDeviceStatus() {
  token.value = await pushMsg.getCurrentFcmToken();
  tokenRegistered.value = await pushMsg.isThisDeviceTokenRegistered();
}

async function enableThisDevice() {
  token.value = await pushMsg.registerFcmToken();
  tokenRegistered.value = await pushMsg.isThisDeviceTokenRegistered();
}

async function disableThisDevice() {
  await pushMsg.removeThisDeviceToken();
  await refreshDeviceStatus();
}

async function sendLocal() {
  await pushMsg.send({
    title: "Push locale demo",
    body: pushBody.value,
    data: { url: "/demo-push" },
  });
}

async function sendRemote() {
  if (!toUid.value.trim()) return;
  try {
    sending.value = true;
    sendRemoteResult.value = await pushMsg.sendTo(toUid.value.trim(), {
      title: "Push remota demo",
      body: pushBody.value,
      data: { url: "/demo-push" },
    });
  } finally {
    sending.value = false;
  }
}

onMounted(() => {
  refreshDeviceStatus();
});
</script>

<template>
  <div class="container py-4 pb-t overflow-auto h-100">
    <RegisterSW />

    <h2 class="f-calSans mb-3">Demo Push</h2>

    <div class="card p-3 mb-3 d-grid gap-2">
      <h5 class="mb-1">Questo dispositivo</h5>
      <p class="mb-2">
        API supportata: <strong>{{ isSupported ? "SI" : "NO" }}</strong><br />
        Permission: <strong>{{ permission }}</strong><br />
        Current UID: <code>{{ currentUid }}</code><br />
        VAPID key: <strong>{{ VAPID_PUBLIC_KEY ? "OK" : "Mancante" }}</strong><br />
        Token registrato su _Auth?.user: <strong>{{ tokenRegistered ? "SI" : "NO" }}</strong>
      </p>
      <div class="d-flex gap-2 flex-wrap">
        <Btn icon="notifications" color="dark" @click="askPermission">Chiedi permesso</Btn>
        <Btn icon="check_circle" color="dark" @click="enableThisDevice">Attiva su questo device</Btn>
        <Btn icon="refresh" variant="outline" color="dark" @click="refreshDeviceStatus">Aggiorna stato</Btn>
        <Btn icon="delete" variant="outline" color="danger" @click="disableThisDevice">Disattiva device</Btn>
      </div>
      <div class="d-flex gap-2 mt-2">
        <Btn icon="send" variant="outline" color="dark" @click="sendLocal">Invia locale</Btn>
      </div>
      <pre class="demo-pre">{{ token || "Token non disponibile." }}</pre>
    </div>

    <div class="card p-3">
      <h5 class="mb-3">Invio remoto (Cloud Function)</h5>
      <div class="row g-2">
        <div class="col-12 col-lg-6">
          <label class="form-label">UID destinatario</label>
          <input v-model="toUid" class="form-control" placeholder="uid utente" />
        </div>
        <div class="col-12 col-lg-6">
          <label class="form-label">Messaggio</label>
          <input v-model="pushBody" class="form-control" />
        </div>
      </div>

      <div class="d-flex gap-2 mt-3">
        <Btn :loading="sending" icon="cloud_upload" color="dark" @click="sendRemote">
          Invia remota
        </Btn>
      </div>

      <p v-if="sendRemoteResult !== null" class="mt-2 mb-0">
        Esito invio remoto: <strong>{{ sendRemoteResult ? "OK" : "KO" }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid rgba(48, 71, 94, 0.16);
  border-radius: 12px;
}

.demo-pre {
  background: #0f172a0d;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  line-height: 1.45;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.82rem;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
