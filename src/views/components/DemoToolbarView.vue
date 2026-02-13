<script setup lang="ts">
import { defineComponent, h, ref } from "vue";
import { Btn, Toolbar, ToolbarApp, type ToolbarAppButton, type ToolbarButton } from "cic-kit";

const BadgeToken = defineComponent({
  name: "BadgeToken",
  props: {
    text: { type: String, default: "CMP" },
    color: { type: String, default: "#0ea5e9" },
  },
  setup(props) {
    return () =>
      h(
        "span",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "22px",
            height: "22px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: "700",
            color: "#ffffff",
            backgroundColor: props.color,
            padding: "0 6px",
          },
        },
        props.text
      );
  },
});

function makeDemoImg(color: string, text: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="${color}"/><text x="20" y="25" text-anchor="middle" font-size="15" fill="#fff" font-family="Arial">${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const imgWallet = makeDemoImg("#16a34a", "W");
const imgMap = makeDemoImg("#2563eb", "M");
const imgMix = makeDemoImg("#7c3aed", "X");

const localToolbarActive = ref("home");
const advancedToolbarActive = ref("wallet");
const localToolbarAppActive = ref("local-home");
const showFixed = ref(true);
const fixedActive = ref("home");
const actionCounter = ref(0);
const events = ref<string[]>([]);

const localToolbarButtons: ToolbarButton[] = [
  { name: "menu", icon: "menu", tooltip: "Apri menu locale" },
  { name: "home", icon: "home", tooltip: "Home locale" },
  { name: "user", icon: "person_search", tooltip: "User locale" },
];

const advancedToolbarButtons: ToolbarButton[] = [
  { name: "wallet", icon: "payments", img: imgWallet, label: "Wallet" },
  { name: "map", icon: "map", img: imgMap, label: "Map" },
  {
    name: "mix",
    icon: "sync",
    img: imgMix,
    component: BadgeToken,
    componentProps: { text: "MIX", color: "#7c3aed" },
    label: "Mix",
    onClick: () => {
      actionCounter.value += 1;
    },
  },
];

const localToolbarAppButtons: ToolbarAppButton[] = [
  {
    name: "local-home",
    icon: "home",
    label: "Local",
    tooltip: "Cambio stato locale",
  },
  {
    name: "local-settings",
    icon: "settings",
    label: "Settings",
    tooltip: "Cambio stato locale",
  },
  {
    name: "go-intro",
    icon: "launch",
    label: "Intro",
    tooltip: "Naviga alla route Introduzione",
    to: { name: "Introduzione" },
  },
];

const fixedButtons: ToolbarButton[] = [
  { name: "home", icon: "home", label: "Home" },
  { name: "search", icon: "search", label: "Search" },
  { name: "settings", icon: "settings", label: "Settings" },
];

function addEvent(scope: string, name: string) {
  const time = new Date().toLocaleTimeString();
  events.value = [`${time} [${scope}] ${name}`, ...events.value].slice(0, 12);
}

function onLocalToolbarChange(name: string) {
  localToolbarActive.value = name;
  addEvent("Toolbar-local", name);
}

function onAdvancedToolbarChange(name: string) {
  advancedToolbarActive.value = name;
  addEvent("Toolbar-advanced", name);
}

function onToolbarAppChange(name: string) {
  localToolbarAppActive.value = name;
  addEvent("ToolbarApp-local", name);
}

function onFixedChange(name: string) {
  fixedActive.value = name;
  addEvent("Toolbar-fixed", name);
}
</script>

<template>
  <div class="container py-4 pb-t overflow-auto h-100">
    <h2 class="f-calSans mb-1">Demo: Toolbar (local state)</h2>
    <p class="text-muted mb-3">
      Questa pagina usa solo stato locale (<code>ref</code> + <code>@on-change</code>), senza
      <code>toolbarStore</code> globale.
    </p>

    <div class="row g-3">
      <div class="col-12 col-xl-6">
        <div class="demo-card h-100">
          <h5 class="mb-2">1) Toolbar - base locale</h5>
          <p class="text-muted mb-2">Active: <strong>{{ localToolbarActive }}</strong></p>
          <Toolbar
            class="demo-toolbar-inline"
            :buttons="localToolbarButtons"
            :active-button="localToolbarActive"
            @on-change="onLocalToolbarChange"
          />
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <div class="demo-card h-100">
          <h5 class="mb-2">2) Toolbar - img/component/glass</h5>
          <p class="text-muted mb-2">
            Active: <strong>{{ advancedToolbarActive }}</strong> | Counter: <strong>{{ actionCounter }}</strong>
          </p>
          <Toolbar
            class="demo-toolbar-inline"
            tabs-class="demo-toolbar-square"
            :buttons="advancedToolbarButtons"
            :active-button="advancedToolbarActive"
            :glass="true"
            primary-light="#ede9fe"
            primary-dark="#5b21b6"
            @on-change="onAdvancedToolbarChange"
          />
        </div>
      </div>

      <div class="col-12">
        <div class="demo-card">
          <h5 class="mb-2">3) ToolbarApp - gestione locale (non globale)</h5>
          <p class="text-muted mb-2">
            Anche con <code>ToolbarApp</code>, l'attivo e l'evento sono locali alla pagina demo.
          </p>
          <p class="text-muted mb-2">Active: <strong>{{ localToolbarAppActive }}</strong></p>
          <ToolbarApp
            class="demo-toolbar-inline"
            :buttons="localToolbarAppButtons"
            :active-button="localToolbarAppActive"
            primary-light="#dcfce7"
            primary-dark="#166534"
            @on-change="onToolbarAppChange"
          />
        </div>
      </div>

      <div class="col-12">
        <div class="demo-card">
          <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
            <h5 class="mb-0">4) Toolbar fixed default</h5>
            <Btn
              size="sm"
              variant="outline"
              color="dark"
              :icon="showFixed ? 'visibility_off' : 'visibility'"
              @click="showFixed = !showFixed"
            >
              {{ showFixed ? "Nascondi fixed toolbar" : "Mostra fixed toolbar" }}
            </Btn>
          </div>
          <p class="text-muted mb-0">
            Questo esempio mantiene il comportamento fixed originale del componente.
          </p>
        </div>
      </div>
    </div>

    <div class="demo-card mt-3">
      <h5 class="mb-2">Event log</h5>
      <pre class="demo-pre">{{ events.length ? events.join('\n') : "Nessun evento ancora." }}</pre>
    </div>

    <Toolbar
      v-if="showFixed"
      :buttons="fixedButtons"
      :active-button="fixedActive"
      :glass="true"
      primary-light="#e0f2fe"
      primary-dark="#0c4a6e"
      @on-change="onFixedChange"
    />

    <div style="height: 120px"></div>
  </div>
</template>

<style scoped lang="scss">
.demo-card {
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(48, 71, 94, 0.12);
  box-shadow: 0 10px 28px rgba(48, 71, 94, 0.08);
  padding: 1rem;
}

.demo-pre {
  background: #0f172a0d;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  line-height: 1.45;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.86rem;
  white-space: pre-wrap;
  margin: 0;
}

.demo-toolbar-inline {
  position: static;
  width: auto;
  padding: 0;
  z-index: auto;
}

:deep(.demo-toolbar-square) {
  border-radius: 14px;
}
</style>
