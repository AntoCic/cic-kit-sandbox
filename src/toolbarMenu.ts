import type { OffcanvasTab } from "cic-kit";
import type { RouteRecordRaw } from "vue-router";
import { routes } from "./router";

export type ToolbarMenuItem = {
  name: string;
  title: string;
  description: string;
  icon: string;
  group: string;
  path: string;
};

const DEMO_GROUPS = new Set([
  "_components",
  "_global-components",
  "_firebase",
  "_form",
  "_views",
  "_test",
  "_utils",
]);

const GROUP_LABELS: Record<string, string> = {
  _components: "Components",
  "_global-components": "Global Components",
  _firebase: "Firebase",
  _form: "Form",
  _views: "Views",
  _test: "Test",
  _utils: "Utils",
};

function toToolbarMenuItem(route: RouteRecordRaw): ToolbarMenuItem | null {
  if (!route.name || !route.path) return null;

  const meta = (route.meta ?? {}) as Record<string, unknown>;
  const group = String(meta.group ?? "");
  if (!DEMO_GROUPS.has(group)) return null;

  const icon = String(meta.icon ?? "apps");
  const title = String(route.name);
  const groupLabel = GROUP_LABELS[group] ?? group;

  return {
    name: String(route.name),
    title,
    description: `${groupLabel} - ${route.path}`,
    icon,
    group,
    path: route.path,
  };
}

export const toolbarMenu: ToolbarMenuItem[] = (routes as RouteRecordRaw[])
  .map((route) => toToolbarMenuItem(route))
  .filter((route): route is ToolbarMenuItem => route !== null);

export const toolbarOffcanvasTabs: OffcanvasTab[] = toolbarMenu.map((view) => ({
  name: view.title,
  icon: view.icon,
  to: { name: view.name },
}));

export const toolbarPageMap: Record<string, string> = Object.fromEntries(
  toolbarMenu.map((view) => [view.name, view.title])
);
