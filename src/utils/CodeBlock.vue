<script setup lang="ts">
import { computed, useSlots, getCurrentInstance, ref } from "vue";
import { VCodeBlock } from "@wdns/vue-code-block";

defineOptions({ name: "CodeBlocK" });

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
const emit = defineEmits<{ (e: "run", ...args: any[]): void; }>();

const hasRunListener = computed(() => {
  const vnodeProps = getCurrentInstance()?.vnode.props as any;
  return !!(vnodeProps && vnodeProps.onRun);
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

type OptsBind = { label?: string, tabs?: boolean, "copy-tab"?: boolean, "run-tab"?: boolean }
// label va passato solo se presente
const optsBind = computed(() => {
  const opts: OptsBind = {}
  if (props.label?.trim()) opts.label = props.label;
  return opts;
});

const check = ref(false);
function forwardRun(...args: any[]) {
  if (hasRunListener) {
    check.value = true;
    setTimeout(() => (check.value = false), 2000)
    emit("run", ...args);
  }
}

const isMultiLine = computed(() => finalCode.value.includes('\n'));
</script>

<template>
  <div class="code-block">
    <VCodeBlock :code="finalCode" :lang="ts ? 'typescript' : lang" :theme="theme" :highlightjs="highlightjs"
      v-bind="optsBind" />
    <span v-if="hasRunListener && !check" :class="`material-symbols-outlined iconRun ${isMultiLine && 'isMultiLine'}`"
      @click="forwardRun">
      motion_play
    </span>
    <span v-if="hasRunListener && check"
      :class="`material-symbols-outlined check iconRun ${isMultiLine && 'isMultiLine'}`">
      check
    </span>
  </div>
</template>


<style scoped lang="scss">
.code-block {
  position: relative;

  &:hover .iconRun {
    opacity: 1;
  }

  .iconRun {
    color: #7AC1FF;
    position: absolute;
    cursor: pointer;
    height: 1.5em;
    opacity: 0;
    transition: opacity .2s ease-in-out;
    z-index: 2;
    right: calc(.9rem + 1.5em);
    top: .7rem;
  }

  .check.iconRun {
    color: #7EE786;
  }

  .iconRun.isMultiLine {
    right: .9rem;
    top: calc(.7rem + 1.5em);
  }

}
</style>
