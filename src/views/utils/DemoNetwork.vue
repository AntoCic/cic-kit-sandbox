<script setup lang="ts">
import CodeBlock from '@src/utils/CodeBlock.vue';
import { cicKitStore, toast } from 'cic-kit';

const code = `
export const MSG_IS_OFFLINE = 'Sei offline: sincronizzo quando torni online.'
export function isBrowserOnline(): boolean {
    return typeof navigator !== 'undefined' ? !!navigator.onLine : true
}
export function isBrowserOffline(): boolean { return !isBrowserOnline() }
`
const run = ()=> toast.warning(cicKitStore.MSG_IS_OFFLINE)
</script>


<template>
    <div class="p-3 border rounded">
        <h5 class="mb-2">Network status</h5>

        <p class="text-muted mb-2">
            Questa demo usa <code>isBrowserOnline</code> e <code>isBrowserOffline</code>.
        </p>

        <CodeBlock lang="ts" @run="run">
            {{ code }}
        </CodeBlock>

        <small class="text-muted d-block mt-2">
            💡 Run il codice per vedere il toast
        </small>
    </div>
</template>
