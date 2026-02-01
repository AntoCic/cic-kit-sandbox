<script setup lang="ts">
import { computed, h, ref } from "vue"
import { toast, ContainerSideTabs, type SideTabComponent, type SideTabs, ObjectDataViewer } from "cic-kit";
import { testObj } from "../utils/testObj";

// tab attivo
const active = ref("about")


const tabs = computed<SideTabs>(() => [
  {
    name: "intro",
    icon: "home",
    label: "Introduzione",
    component: {
      name: "IntroTab",
      setup() {
        return () => h(ObjectDataViewer, { obj: testObj("Introduzione") })
      },
    },
  },
  {
    icon: "tune",
    label: "Impostazioni",
    subTabs: [
      {
        name: "profile",
        icon: "person",
        label: "Profilo",
        component: {
          name: "ProfileTab",
          setup() {
            return () => h(ObjectDataViewer, { obj: testObj("Profilo") })
          },
        },
      },
      {
        name: "billing",
        icon: "payments",
        label: {
          name: "ProBadge",
          setup() {
            return () => h("span", { class: "text-bg-warning align-middle px-2 rounded-1" }, "componente")
          },
        },
        component: {
          name: "BillingTab",
          setup() {
            return () => h(ObjectDataViewer, { obj: testObj("Billing (PRO)") })
          },
        },
      },
    ],
  },
  {
    name: "about",
    icon: "info",
    label: "About",
    component: {
      name: "AboutTab",
      setup() {
        return () => h(ObjectDataViewer, { obj: testObj("About") })
      },
    },
  },

  // {
  //   icon: "add",
  //   label: "Test",
  //   subTabs: [
  //     { name: "1", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "2", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "3", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "4", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "5", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "6", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "7", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "8", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "9", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "10", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "11", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "12", icon: "info", label: "About", component: DemoPage1 },
  //     { name: "13", icon: "info", label: "About", component: DemoPage1 },
  //   ],
  // },
])

const onSelect = (tab: SideTabComponent) => toast.success({ title: 'Cambio tab 📑', message: tab.name })
</script>

<template>
  <ContainerSideTabs v-model="active" :tabs="tabs" @select="onSelect" color="#30475E" :sidebarMinWidth="200" />
</template>
