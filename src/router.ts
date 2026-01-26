// router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';
import ErrorView from './views/ErrorView.vue'
import HomeView from './views/HomeView.vue'
import DemoBtnCmp from './views/demo/DemoBtnCmp.vue';
import DemoToast from './views/demo/DemoToast.vue';
import DemoFirebaseModelApi from './views/demo/DemoFirebaseModelApi.vue';

// ===================================================================================================
const routes: RouteRecordRaw[] = [
  // public
  { path: '/', name: 'home', component: HomeView },
  { path: '/DemoBtnCmp', name: 'DemoBtnCmp', component: DemoBtnCmp },
  { path: '/DemoToast', name: 'DemoToast', component: DemoToast },
  { path: '/DemoFirebaseModelApi', name: 'DemoFirebaseModelApi', component: DemoFirebaseModelApi },

  // --- 404 catch-all (deve stare in fondo)
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorView, props: (route) => ({ kind: '404' as const, attemptedPath: route.fullPath }) },
]

// ===================================================================================================
export const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router

