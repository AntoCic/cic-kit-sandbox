<script setup lang="ts">
import { BtnMoveIcon, type ShareLink } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";

type DemoItem = {
    id: string;
    title: string;
    label: string;
    props: {
        icon: string;
        color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
        disabled?: boolean;
        loading?: boolean;
        to?: string;
        share?: ShareLink;
    };
    code: string;
};

const share: ShareLink = {
    title: "CIC-Kit",
    text: "Getting started con BtnMoveIcon.",
    url: "https://cic-kit-sandbox.web.app/getting-started",
};

const demos: DemoItem[] = [
    {
        id: "base",
        title: "Base",
        label: "Condividi",
        props: { icon: "share" },
        code: `<BtnMoveIcon icon="share">
  Condividi
</BtnMoveIcon>`,
    },
    {
        id: "color",
        title: "Color (secondary)",
        label: "Secondario",
        props: { icon: "palette", color: "secondary" },
        code: `<BtnMoveIcon icon="palette" color="secondary">
  Secondario
</BtnMoveIcon>`,
    },
    {
        id: "color",
        title: "Color (danger)",
        label: "Danger",
        props: { icon: "palette", color: "danger" },
        code: `<BtnMoveIcon icon="palette" color="danger">
 Danger
</BtnMoveIcon>`,
    },
    {
        id: "color",
        title: "Color (warning)",
        label: "Warning",
        props: { icon: "palette", color: "warning" },
        code: `<BtnMoveIcon icon="palette" color="warning">
  Warning
</BtnMoveIcon>`,
    },
    {
        id: "loading",
        title: "Loading",
        label: "Caricamento",
        props: { icon: "autorenew", loading: true },
        code: `<BtnMoveIcon icon="autorenew" :loading="true">
  Caricamento
</BtnMoveIcon>`,
    },
    {
        id: "disabled",
        title: "Disabled",
        label: "Disabilitato",
        props: { icon: "block", disabled: true },
        code: `<BtnMoveIcon icon="block" :disabled="true">
  Disabilitato
</BtnMoveIcon>`,
    },
    {
        id: "to",
        title: "Link",
        label: "Vai alla guida",
        props: { icon: "open_in_new", to: "https://cic-kit-sandbox.web.app/getting-started" },
        code: `<BtnMoveIcon
  icon="open_in_new"
  to="https://cic-kit-sandbox.web.app/getting-started"
>
  Vai alla guida
</BtnMoveIcon>`,
    },
    {
        id: "share",
        title: "Share",
        label: "Condividi link",
        props: { icon: "share", share },
        code: `<BtnMoveIcon
  icon="share"
  :share="{
    title: "CIC-Kit",
    text: "Getting started con BtnMoveIcon.",
    url: "https://cic-kit-sandbox.web.app/getting-started",
  }"
>
  Condividi link
</BtnMoveIcon>`,
    },
];
</script>

<template>
    <div class="container py-3">
        <div class="row g-3">
            <div v-for="demo in demos" :key="demo.id" class="col-12">
                <div class="border rounded p-3 shadow-sm">
                    <div class="fw-semibold mb-2">{{ demo.title }}</div>
                    <div class="mb-3">
                        <BtnMoveIcon :icon="demo.props.icon" :color="demo.props.color" :disabled="demo.props.disabled"
                            :loading="demo.props.loading" :to="demo.props.to" :share="demo.props.share">
                            {{ demo.label }}
                        </BtnMoveIcon>
                    </div>
                    <CodeBlock :code="demo.code" />
                </div>
            </div>
        </div>
    </div>
</template>
