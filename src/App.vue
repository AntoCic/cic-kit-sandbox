<script setup lang="ts">
import { ContainerSideTabs, ToastCmp, type SideTabComponent, type SideTabs } from 'cic-kit';
import { computed, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import HeaderApp from './HeaderApp.vue';
import router from './router';

const active = ref("home")

const tabs = computed<SideTabs>(() => [
  {
    name: 'home',
    label: 'home',
    icon: 'home',
  },
  {
    name: 'DemoContainerSidebar',
    label: 'ContainerSidebar',
    icon: 'view_sidebar',
  },
  {
    name: 'DemoBtn',
    label: 'Btn',
    icon: 'smart_button',
  },
  {
    name: 'DemoToast',
    label: 'toast',
    icon: 'notifications',
  },
  {
    name: 'DemoFirebaseModelApi',
    label: 'FirebaseModelApi',
    icon: 'cloud',
  },
  {
    name: 'DemoVeeValidate',
    label: 'VeeValidate',
    icon: 'fact_check',
  },
])



onMounted(() => document.getElementsByClassName('starter-loader')?.[0]?.remove())

const onSelect = (tab: SideTabComponent) => { router.push({ name: tab.name }) }
</script>

<template>
  <HeaderApp></HeaderApp>

  <main>
    <ContainerSideTabs v-model="active" :tabs="tabs" @select="onSelect" :trackRoute="false" color="#30475E"
      :sidebarMinWidth="250">
      <RouterView />
    </ContainerSideTabs>
  </main>

  <ToastCmp />
</template>

<style scoped>
/* ciao mondo */
</style>
