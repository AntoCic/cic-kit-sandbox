<script setup lang="ts">
import { computed, useSlots } from "vue";
import { VCodeBlock } from "@wdns/vue-code-block";

defineOptions({ name: "CodeBlockWrapper" });

type Props = {
  code?: string;
  label?: string;
  ts?: boolean;
  lang?: string;
  theme?: string;
  highlightjs?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  theme: "github-dark",
  lang: "html",
  ts: false,
  highlightjs: true,
});

const slots = useSlots();
const slotCode = computed(() => {
  const cld = slots.default?.().map((s) => {
    const isString = typeof s.children === 'string';
    if (isString) {
      return s.children
    } else {
      throw new Error("Hai passato a CodeBlock uno slot che non contiene stringhe");
    }
  })
  return cld ? cld.join('\n') : ''
});

const finalCode = computed(() => {
  const a = (props.code ?? "").trim();
  const b = (slotCode.value ?? "").trim();

  if (a && b) return `${a}\n${b}`;
  return a || b || "";
});

// label va passato solo se presente
const labelBind = computed(() => (props.label?.trim() ? { label: props.label } : {}));
</script>

<template>
  <VCodeBlock :code="finalCode" :lang="ts ? 'typescript' : lang" :theme="theme" :highlightjs="highlightjs"
    v-bind="labelBind" />
</template>
