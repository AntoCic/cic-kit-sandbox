# cic-kit-sandbox

Sandbox Vue 3 + Vite per sviluppare e validare `cic-kit` in isolamento.

Il progetto include:
- demo UI/componenti
- demo utility e Firebase
- integrazione toolbar/offcanvas
- setup PWA con service worker

## Requisiti

- Node.js 20+
- npm 10+

## Avvio rapido (locale)

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
npm run preview
```

## Avvio con emulatori Firebase (Docker)

Prima build:

```bash
docker compose -f docker-compose.emu.yml build --no-cache
```

Avvio:

```bash
docker compose -f docker-compose.emu.yml up
```

Comandi utili:

```bash
docker compose -f docker-compose.emu.yml ps
docker compose -f docker-compose.emu.yml logs -f
docker compose -f docker-compose.emu.yml exec firebase-emulator bash
docker compose -f docker-compose.emu.yml down
docker compose -f docker-compose.emu.yml down -v
```

## Demo aggiunte/migrate

Le demo originariamente in `src/ppp` sono state migrate nelle cartelle standard `src/views/...`:

- `src/views/form/DemoFieldInputsView.vue`
- `src/views/firebase/DemoPushView.vue`
- `src/views/utils/DemoTimestampView.vue` (versione migliorata con round-trip completo)
- `src/views/components/DemoToolbarView.vue` (focus su gestione locale `Toolbar` e `ToolbarApp`)

## Toolbar menu

Il menu usato da `ToolbarApp` (offcanvas) e ora generato automaticamente da `src/router.ts`:

- sorgente: `src/toolbarMenu.ts`
- include tutte le route demo (group `_components`, `_global-components`, `_firebase`, `_form`, `_views`, `_test`, `_utils`)
- resta allineato in automatico quando aggiungi/rimuovi demo dal router

## Struttura principale

- `src/router.ts`: registry route demo
- `src/App.vue`: layout principale + `ContainerSideTabs` + `ToolbarApp`
- `src/toolbarMenu.ts`: mapping route -> tabs offcanvas toolbar
- `src/firebase-config.ts`: config Firebase + VAPID key

