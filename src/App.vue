<script setup lang="ts">
import { BtnCmp, ToastCmp } from 'cic-kit';
import { onMounted } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute();

const routeTo = (name: string, query?: Record<string, any>) => router.push({ name, query })
const isSelected = (name: string) => route.name === name

const page = {
  home: 'home',
  DemoBtnCmp: 'BtnCmp',
  DemoToast: 'toast',
  DemoFirebaseModelApi: 'FirebaseModelApi',
}


// onBeforeMount(() => {
//   get
// })

onMounted(() => {
  document.getElementsByClassName('starter-loader')?.[0]?.remove();
})
</script>

<template>
  <nav>
    <div class="nav nav-tabs" role="tablist">
      <BtnCmp v-for="(label, routName) in page" :key="routName" color="dark"
        :variant="isSelected(routName) ? 'solid' : 'ghost'" @click="routeTo(routName)">
        {{ label }}
      </BtnCmp>
    </div>
  </nav>

  <main>
    <RouterView />
  </main>

  <ToastCmp />
</template>

<style scoped></style>
