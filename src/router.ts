// router.ts

import { createWebHistory, type RouteRecordRaw } from 'vue-router';
import { ErrorView, HomeView, initRouter, LoginView, RegisterView, ResetPasswordView, UserView } from 'cic-kit';
import IntroView from './views/home/IntroView.vue'
import DemoBtn from './views/components/DemoBtn.vue';
import DemoToast from './views/global-components/DemoToast.vue';
import DemoFirebaseModelApi from './views/firebase/DemoFirebaseModelApi.vue';
import DemoVeeValidate from './views/form/DemoVeeValidate.vue';
import DemoContainerSidebar from './views/components/DemoContainerSidebar.vue';
import GettingStarted from './views/home/GettingStarted.vue';
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
import DemoAccordion from './views/components/DemoAccordion.vue';
import DemoContainerSub from './views/components/DemoContainerSub.vue';
import DemoBtnMoveIcon from './views/components/DemoBtnMoveIcon.vue';
import DemoToolbarView from './views/components/DemoToolbarView.vue';
import DemoNetwork from './views/utils/DemoNetwork.vue';
import DemoLoading from './views/global-components/DemoLoading.vue';
import DemoCicKitStore from './views/global-components/DemoCicKitStore.vue';
import DemoLS from './views/utils/DemoLS.vue';
import DemoShareLink from './views/utils/DemoShareLink.vue';
import DemoModal from './views/components/DemoModal.vue';
import DemoLogo from './views/components/DemoLogo.vue';
import DemoAvatar from './views/components/DemoAvatar.vue';
import DemoAuth from './views/global-components/DemoAuth.vue';
import DemoViewsSettings from './views/views/DemoViewsSettings.vue';
import DemoFieldInputsView from './views/form/DemoFieldInputsView.vue';
import DemoFieldFile from './views/form/DemoFieldFile.vue';
import DemoPushView from './views/firebase/DemoPushView.vue';
import DemoTimestampView from './views/utils/DemoTimestampView.vue';

// ===================================================================================================
export const routes: RouteRecordRaw[] = [
  // _home
  { path: '/', name: 'Introduzione', component: IntroView, meta: { group: '_home', icon: 'home_app_logo' } },
  { path: '/getting-started', name: 'Getting started', component: GettingStarted, meta: { group: '_home', icon: 'line_start_circle' } },

  // _components
  { path: '/demo-accordion', name: 'Accordion', component: DemoAccordion, meta: { group: '_components', icon: 'expand_more' } },
  { path: '/demo-avatar', name: 'Avatar', component: DemoAvatar, meta: { group: '_components', icon: 'account_circle' } },
  { path: '/demo-btn', name: 'Btn', component: DemoBtn, meta: { group: '_components', icon: 'smart_button' } },
  { path: '/demo-btn-move-icon', name: 'Btn Move Icon', component: DemoBtnMoveIcon, meta: { group: '_components', icon: 'swap_horiz' } },
  { path: '/demo-container-sidebar', name: 'Container Sidebar', component: DemoContainerSidebar, meta: { group: '_components', icon: 'view_sidebar' } },
  { path: '/demo-container-sub', name: 'Container Sub', component: DemoContainerSub, meta: { group: '_components', icon: 'view_agenda' } },
  { path: '/demo-logo', name: 'Logo', component: DemoLogo, meta: { group: '_components', icon: 'deployed_code' } },
  { path: '/demo-modal', name: 'Modal', component: DemoModal, meta: { group: '_components', icon: 'dialogs' } },
  { path: '/demo-object-viewer', name: 'Object Viewer', component: DemoObjectViewer, meta: { group: '_components', icon: 'data_object' } },
  { path: '/demo-toolbar', name: 'Toolbar', component: DemoToolbarView, meta: { group: '_components', icon: 'bottom_panel_open' } },

  // _global-components
  { path: '/demo-auth', name: 'Auth', component: DemoAuth, meta: { group: '_global-components', icon: 'verified_user' } },
  { path: '/demo-cicKitStore', name: 'cicKitStore', component: DemoCicKitStore, meta: { group: '_global-components', icon: 'dns' } },
  { path: '/demo-loading', name: 'Loading', component: DemoLoading, meta: { group: '_global-components', icon: 'progress_activity' } },
  { path: '/demo-toast', name: 'Toast', component: DemoToast, meta: { group: '_global-components', icon: 'notifications' } },

  // _firebase
  { path: '/demo-firebase-model-api', name: 'FirebaseModelApi', component: DemoFirebaseModelApi, meta: { group: '_firebase', icon: 'cloud' } },
  { path: '/demo-push', name: 'Push', component: DemoPushView, meta: { group: '_firebase', icon: 'notifications_active' } },

  // _form
  { path: '/demo-field-file', name: 'Field File', component: DemoFieldFile, meta: { group: '_form', icon: 'upload_file' } },
  { path: '/demo-field-inputs', name: 'Field Inputs', component: DemoFieldInputsView, meta: { group: '_form', icon: 'edit_note' } },
  { path: '/demo-vee-validate', name: 'Vee Validate', component: DemoVeeValidate, meta: { group: '_form', icon: 'fact_check' } },

  // _views (coerenti e senza collisioni)
  { path: '/views/settings', name: 'settings', component: DemoViewsSettings, meta: { group: '_views', icon: 'settings_applications' } },
  { path: '/views/home', name: 'View: Home', component: HomeView, meta: { group: '_views', icon: 'home' } },
  { path: '/views/login', name: 'View: Login', component: LoginView, meta: { group: '_views', icon: 'login' } },
  { path: '/views/register', name: 'View: Register', component: RegisterView, meta: { group: '_views', icon: 'person_add' } },
  { path: '/views/reset-password', name: 'View: Reset Password', component: ResetPasswordView, meta: { group: '_views', icon: 'lock_reset' } },
  { path: '/views/user', name: 'View: User', component: UserView, meta: { group: '_views', icon: 'account_circle' } },
  { path: '/views/error', name: 'View: Error', component: ErrorView, meta: { group: '_views', icon: 'error' } },

  // _test
  { path: '/demo-genera-colore', name: 'Genera Colore', component: DemoGeneraColore, meta: { group: '_test', icon: 'palette' } },
  { path: '/demo-genera-date', name: 'Genera Date', component: DemoGeneraDate, meta: { group: '_test', icon: 'event' } },
  { path: '/demo-genera-dati-personali', name: 'Genera Dati Personali', component: DemoGeneraDatiPersonali, meta: { group: '_test', icon: 'badge' } },
  { path: '/demo-genera-numero', name: 'Genera Numero', component: DemoGeneraNumero, meta: { group: '_test', icon: 'numbers' } },
  { path: '/demo-genera-testo', name: 'Genera Testo', component: DemoGeneraTesto, meta: { group: '_test', icon: 'article' } },

  // _utils
  { path: '/demo-copy-to-clipboard', name: 'CopyToClipboard', component: DemoCopyToClipboard, meta: { group: '_utils', icon: 'content_copy' } },
  { path: '/demo-delay', name: 'Delay', component: DemoDelay, meta: { group: '_utils', icon: 'timer' } },
  { path: '/demo-ls', name: 'LS', component: DemoLS, meta: { group: '_utils', icon: 'storage' } },
  { path: '/demo-network', name: 'Network', component: DemoNetwork, meta: { group: '_utils', icon: 'wifi' } },
  { path: '/demo-pick-random', name: 'PickRandom', component: DemoPickRandom, meta: { group: '_utils', icon: 'casino' } },
  { path: '/demo-share-link', name: 'ShareLink', component: DemoShareLink, meta: { group: '_utils', icon: 'share' } },
  { path: '/demo-timestamp', name: 'Timestamp', component: DemoTimestampView, meta: { group: '_utils', icon: 'schedule' } },
  { path: '/demo-use-debounce', name: 'UseDebounce', component: DemoUseDebounce, meta: { group: '_utils', icon: 'speed' } },
  { path: '/demo-use-routeTo', name: 'UseRouteTo', component: DemoUseRouteTo, meta: { group: '_utils', icon: 'alt_route' } },
];

// ===================================================================================================
export const router = initRouter({
  history: createWebHistory(),
  routes
})
export default router

