<script setup lang="ts">
import { ContainerSideTabs, ToastCmp, type SideTabComponent, type SideTabs } from 'cic-kit';
import { computed, onMounted, ref } from 'vue';
import { RouterView, type RouteRecordRaw } from 'vue-router';
import HeaderApp from './HeaderApp.vue';
import router, { routes } from './router';

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
        .sort((a, b) => a.label.localeCompare(b.label))
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
