<script setup lang="ts">
import { cicKitStore, ContainerSideTabs, defaultUserPermission, LoaderCmp, loading, ToastCmp, ToolbarApp, type SideTabComponent, type SideTabs, toolbarOffcanvasStore, ModalDev, RegisterSW } from 'cic-kit';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterView, useRoute, type RouteRecordRaw } from 'vue-router';
import HeaderApp from './HeaderApp.vue';
import router, { routes } from './router';
import { Auth } from './main';
import { toolbarOffcanvasTabs } from "./toolbarMenu";

const route = useRoute();
const active = ref("intro")

const GROUP_UI: Record<string, { label: string; icon: string }> = {
  _home: { label: "cic-kit", icon: "home_app_logo" },
  _components: { label: "Components", icon: "apps" },
  "_global-components": { label: "Global Components", icon: "globe" },
  _form: { label: "Form", icon: "contract_edit" },
  _firebase: { label: "Firebase", icon: "local_fire_department" },
  _views: { label: "Views", icon: "view_compact_alt" },
  _test: { label: "Test", icon: "labs" },
  _utils: { label: "Utils", icon: "handyman" },
  other: { label: "Other", icon: "more_horiz" },
};

const tabs = computed<SideTabs>(() => {
  const list = (routes as RouteRecordRaw[])
    // regola: se mancano sia group che icon -> NON inserirlo nei tabs
    .filter(r => {
      const meta = (r.meta ?? {}) as any;
      return !!meta.group || !!meta.icon;
    })
    .map(r => {
      const meta = (r.meta ?? {}) as any;

      const group = (meta.group as string | undefined) ?? "other";
      const icon = (meta.icon as string | undefined) ?? "trail_length_short";

      return {
        group,
        routeName: String(r.name ?? r.path),
        label: String(r.name ?? r.path),
        icon,
      };
    });

  const byGroup = new Map<string, typeof list>();

  for (const item of list) {
    const arr = byGroup.get(item.group) ?? [];
    arr.push(item);
    byGroup.set(item.group, arr);
  }

  const order = [
    "_home",
    "_components",
    "_global-components",
    "_form",
    "_firebase",
    "_views",
    "_test",
    "_utils",
    "other",
  ];

  const tabsOut: SideTabs = [];

  for (const groupName of order) {
    const items = byGroup.get(groupName);
    if (!items?.length) continue;

    const ui = GROUP_UI[groupName] ?? { label: groupName, icon: "trail_length_short" };

    tabsOut.push({
      name: groupName,
      label: ui.label,
      icon: ui.icon,
      subTabs: items
        .slice()
        .map(i => ({
          name: i.routeName,
          label: i.label,
          icon: i.icon,
        })),
    });
  }

  for (const [groupName, items] of byGroup.entries()) {
    if (order.includes(groupName)) continue;

    const ui = GROUP_UI[groupName] ?? { label: groupName, icon: "trail_length_short" };

    tabsOut.push({
      name: groupName,
      label: ui.label,
      icon: ui.icon,
      subTabs: items
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(i => ({
          name: i.routeName,
          label: i.label,
          icon: i.icon,
        })),
    });
  }

  return tabsOut;
});


const onSelect = (tab: SideTabComponent) => { router.push({ name: tab.name }) }
function applyToolbarMenu() {
  toolbarOffcanvasStore.title = "Demo Menu";
  toolbarOffcanvasStore.setTabs(toolbarOffcanvasTabs);
}

watch(
  () => route.name,
  () => {
    applyToolbarMenu();
  },
  { immediate: true, flush: "post" }
);

onMounted(() => {
  document.getElementsByClassName('starter-loader')?.[0]?.remove();
})
onBeforeUnmount(() => {
  toolbarOffcanvasStore.title = "Menu";
  toolbarOffcanvasStore.setTabs(undefined);
});
</script>

<template>
  <LoaderCmp v-if="loading.state" />
  <HeaderApp />

  <main>
    <ContainerSideTabs v-model="active" :tabs="tabs" @select="onSelect" :trackRoute="false" color="#30475E"
      :sidebarMinWidth="250">
      <RouterView />
    </ContainerSideTabs>
  </main>

  <ToolbarApp glass primary-dark="#F05454" primary-light=" #31475e4d" />
  <ModalDev v-if="Auth?.user?.hasPermission(defaultUserPermission.MODAL_DEV_ON) && cicKitStore.debugMod" />
  <ToastCmp />
  <RegisterSW />
</template>

<style scoped>
/* ciao mondo */
</style>
