<script setup lang="ts">
import { Btn } from 'cic-kit';
import { ref, onMounted, onBeforeUnmount, type PropType, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const {
  page,
} = defineProps({
  page: { type: Object as PropType<Record<string, string>>, required: false },
})

const route = useRoute();
const router = useRouter();

const headerRef = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null

onMounted(() => {
  const el = headerRef.value
  if (!el) return
  const setVar = () => {
    // store.HEADER.height = el.offsetHeight;
    return document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
  }
  ro = new ResizeObserver(setVar)
  ro.observe(el)
  setVar()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
})

const isSelected = (name: string) => route.name === name
const isVisible = computed(() => {
  // todo bisogna capire sulla base di cosa deve essere true o false
  return false
})

</script>

<template>
  <header ref="headerRef">
    <div v-if="isVisible" class="container">
      <nav class="row align-items-center my-1">
        <div class="col-auto">
          <!-- <Logo :loading="store.HEADER.loading" :back-to="store.HEADER.backTo" /> -->
        </div>
        <div class="col">
          <div v-if="page" class="nav nav-tabs" role="tablist">
            <Btn v-for="(label, routName) in page" :key="routName" color="dark"
              :variant="isSelected(routName) ? 'solid' : 'ghost'" @click="router.push({ name: routName })">
              {{ label }}
            </Btn>
          </div>
          <!-- <h1 class="mb-0 f-calSans" v-if="(store.HEADER.title + store.HEADER.defaultTitle).trim() !== ''"> {{
            store.HEADER.title !== '' ? store.HEADER.title : store.HEADER.defaultTitle }} </h1> -->
        </div>
        <div class="col-auto p-0">
          <!-- <component v-if="store.HEADER.extra" :is="store.HEADER.extra" v-bind="store.HEADER.extraProps" /> -->
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
