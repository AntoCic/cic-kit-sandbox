// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';
import { ErrorView } from 'cic-kit';
import IntroView from './views/home/IntroView.vue'
import DemoBtn from './views/components/DemoBtn.vue';
import DemoToast from './views/general-components/DemoToast.vue';
import DemoFirebaseModelApi from './views/firebase/DemoFirebaseModelApi.vue';
import DemoVeeValidate from './views/form/DemoVeeValidate.vue';
import DemoContainerSidebar from './views/components/DemoContainerSidebar.vue';
import GetStarted from './views/home/GetStarted.vue';
import DemoUseDebounce from './views/utils/DemoUseDebounce.vue';
import DemoGeneraTesto from './views/test/DemoGeneraTesto.vue';
import DemoGeneraNumero from './views/test/DemoGeneraNumero.vue';
import DemoGeneraDatiPersonali from './views/test/DemoGeneraDatiPersonali.vue';
import DemoGeneraDate from './views/test/DemoGeneraDate.vue';
import DemoGeneraColore from './views/test/DemoGeneraColore.vue';
import DemoUseRouteTo from './views/utils/DemoUseRouteTo.vue';
import DemoCopyToClipboard from './views/utils/DemoCopyToClipboard.vue';
import DemoDelay from './views/utils/DemoDelay.vue';
import DemoPickRandom from './views/utils/DemoPickRandom.vue';
import DemoObjectViewer from './views/components/DemoObjectViewer.vue';

// ===================================================================================================
export const routes: RouteRecordRaw[] = [
  // _home
  { path: '/', name: 'Introduzione', component: IntroView, meta: { group: '_home', icon: 'home_app_logo' } },
  { path: '/get-start', name: 'Get start', component: GetStarted, meta: { group: '_home', icon: 'line_start_circle' } },

  // _components
  { path: '/DemoBtn', name: 'Btn', component: DemoBtn, meta: { group: '_components', icon: 'smart_button' } },
  { path: '/DemoContainerSidebar', name: 'Container Sidebar', component: DemoContainerSidebar, meta: { group: '_components', icon: 'view_sidebar' } },
  { path: '/DemoObjectViewer', name: 'Object Viewer', component: DemoObjectViewer, meta: { group: '_components' } },

  // _general-components
  { path: '/DemoToast', name: 'Toast', component: DemoToast, meta: { group: '_global-components', icon: 'notifications' } },

  // _firebase
  { path: '/DemoFirebaseModelApi', name: 'FirebaseModelApi', component: DemoFirebaseModelApi, meta: { group: '_firebase', icon: 'cloud' } },

  // _form
  { path: '/DemoVeeValidate', name: 'Vee Validate', component: DemoVeeValidate, meta: { group: '_form', icon: 'fact_check' } },

  // _views
  { path: '/ErrorView', name: 'Error', component: ErrorView, meta: { group: '_views', icon: 'computer_cancel' } },

  // _test
  { path: '/DemoGeneraColore', name: 'Genera Colore', component: DemoGeneraColore, meta: { group: '_test', icon: 'palette' } },
  { path: '/DemoGeneraDate', name: 'Genera Date', component: DemoGeneraDate, meta: { group: '_test', icon: 'event' } },
  { path: '/DemoGeneraDatiPersonali', name: 'Genera Dati Personali', component: DemoGeneraDatiPersonali, meta: { group: '_test', icon: 'badge' } },
  { path: '/DemoGeneraNumero', name: 'Genera Numero', component: DemoGeneraNumero, meta: { group: '_test', icon: 'badge' } },
  { path: '/DemoGeneraTesto', name: 'Genera Testo', component: DemoGeneraTesto, meta: { group: '_test', icon: 'article' } },

  // _utils
  { path: '/DemoCopyToClipboard', name: 'CopyToClipboard', component: DemoCopyToClipboard, meta: { group: '_utils', icon: 'content_copy' } },
  { path: '/DemoDelay', name: 'Delay', component: DemoDelay, meta: { group: '_utils', icon: 'timer' } },
  { path: '/DemoPickRandom', name: 'PickRandom', component: DemoPickRandom, meta: { group: '_utils', icon: 'casino' } },
  { path: '/DemoUseDebounce', name: 'UseDebounce', component: DemoUseDebounce, meta: { group: '_utils', icon: 'speed' }, },
  { path: '/DemoUseRouteTo', name: 'UseRouteTo', component: DemoUseRouteTo, meta: { group: '_utils', icon: 'alt_route' } },

  // --- 404 catch-all (deve stare in fondo)
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorView, props: (route) => ({ kind: '404' as const, attemptedPath: route.fullPath }) },
]

// ===================================================================================================
export const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router

