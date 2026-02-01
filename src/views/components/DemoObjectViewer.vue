<!-- DemoSafeStringify.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { ObjectViewer } from 'cic-kit'

function makeFirestoreLikeRef(path: string) {
    // basta che abbia path/id e una key "firestore" o "parent"
    return { path, firestore: {} }
}

const demoObj = computed(() => {
    const root: any = {
        title: 'safeStringify demo',
        createdAt: new Date(),
        fn: () => 'hello',
        nested: {
            level1: {
                level2: {
                    level3: {
                        level4: { note: 'vai su MaxDepth per tagliare qui' },
                    },
                },
            },
        },
        longArray: Array.from({ length: 120 }, (_, i) => ({ i, value: `item-${i}` })),
        manyKeys: Object.fromEntries(Array.from({ length: 140 }, (_, i) => [`k_${i}`, i])),
        docRef: makeFirestoreLikeRef('users/abc123'),
        something: {
            ref: makeFirestoreLikeRef('projects/p1'), // key-based rule: "ref" => [Ref]
        },
    }

    // circular
    root.self = root
    root.nested.loop = root.nested

    return root
})
</script>

<template>
    <div class="container">
        <div class="row pt-3 pb-4">
            <div class="col-12 text-center mb-3">
                <h1>Demo: safeStringify</h1>
                <p class="text-body-secondary mb-0">
                    Prova a ridurre <b>MaxDepth</b>, <b>MaxKeys</b> e <b>MaxArray</b> e guarda come vengono troncati:
                    <code>[MaxDepth]</code>, <code>__truncatedKeys</code>, <code>[... +N more]</code>,
                    <code>[Circular]</code>, <code>[Ref ...]</code>.
                </p>
            </div>

            <div class="col-12 bg-light router">
                <ObjectViewer :obj="demoObj" />
            </div>
        </div>
    </div>
</template>
