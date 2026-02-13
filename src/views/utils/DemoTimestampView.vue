<script setup lang="ts">
import { computed, ref } from "vue";
import { Timestamp } from "firebase/firestore";
import { Btn, reviveTimestamp, reviveTimestampsDeep, serializeTimestamp } from "cic-kit";

type TimestampJson = {
  seconds: number;
  nanoseconds: number;
  type?: string;
};

type DemoPayload = {
  id: string;
  createdAt: TimestampJson;
  audit: {
    updatedAt: TimestampJson;
    publishedAt: TimestampJson;
  };
  items: Array<{
    id: string;
    at: TimestampJson;
  }>;
  untouched: {
    note: string;
    count: number;
  };
};

function createPayload(baseMs = Date.now()): DemoPayload {
  const createdAt = Timestamp.fromMillis(baseMs);
  const updatedAt = Timestamp.fromMillis(baseMs + 60_000);
  const publishedAt = Timestamp.fromMillis(baseMs + 3_600_000);

  return {
    id: `post-${Math.floor(baseMs / 1000)}`,
    createdAt: createdAt.toJSON(),
    audit: {
      updatedAt: updatedAt.toJSON(),
      publishedAt: publishedAt.toJSON(),
    },
    items: [
      { id: "a", at: Timestamp.fromMillis(baseMs - 10_000).toJSON() },
      { id: "b", at: Timestamp.fromMillis(baseMs + 10_000).toJSON() },
    ],
    untouched: {
      note: "I campi non timestamp restano invariati",
      count: 2,
    },
  };
}

const source = ref<DemoPayload>(createPayload());

const revived = computed(() => reviveTimestampsDeep(structuredClone(source.value)));
const serialized = computed(() => serializeTimestamp(structuredClone(revived.value)));

const singleRevived = computed(() => reviveTimestamp(source.value.createdAt));
const singleIso = computed(() => singleRevived.value.toDate().toISOString());

const roundTripOk = computed(
  () => JSON.stringify(serialized.value) === JSON.stringify(source.value)
);

function toPrintable(value: unknown): unknown {
  if (value instanceof Timestamp) {
    return {
      __type: "Timestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
      iso: value.toDate().toISOString(),
    };
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toPrintable(entry));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, toPrintable(entry)])
    );
  }

  return value;
}

const sourcePretty = computed(() => JSON.stringify(source.value, null, 2));
const revivedPretty = computed(() => JSON.stringify(toPrintable(revived.value), null, 2));
const serializedPretty = computed(() => JSON.stringify(serialized.value, null, 2));

const summary = computed(() => ({
  rootTimestamp: revived.value.createdAt instanceof Timestamp,
  nestedTimestamp: revived.value.audit.updatedAt instanceof Timestamp,
  listTimestamp: revived.value.items[0]?.at instanceof Timestamp,
  roundTripOk: roundTripOk.value,
  singleReviveISO: singleIso.value,
}));

function regenerateNow() {
  source.value = createPayload(Date.now());
}

function regenerateTomorrow() {
  source.value = createPayload(Date.now() + 86_400_000);
}
</script>

<template>
  <div class="container py-4 pb-t overflow-auto h-100">
    <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
      <div>
        <h2 class="f-calSans mb-1">Demo: Timestamp utils</h2>
        <p class="text-muted mb-0">
          Round-trip reale: JSON Firestore -> <code>Timestamp</code> -> JSON serializzabile.
        </p>
      </div>
      <div class="d-flex flex-wrap gap-2">
        <Btn icon="refresh" color="dark" variant="outline" @click="regenerateNow">Rigenera now</Btn>
        <Btn icon="event" color="dark" @click="regenerateTomorrow">Rigenera +1 giorno</Btn>
      </div>
    </div>

    <div class="demo-card mb-3">
      <h5 class="mb-2">Verifiche rapide</h5>
      <pre class="demo-pre">{{ summary }}</pre>
    </div>

    <div class="row g-3">
      <div class="col-12 col-xl-4">
        <div class="demo-card h-100">
          <h6 class="mb-2">1) Input JSON</h6>
          <pre class="demo-pre">{{ sourcePretty }}</pre>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="demo-card h-100">
          <h6 class="mb-2">2) reviveTimestampsDeep</h6>
          <pre class="demo-pre">{{ revivedPretty }}</pre>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="demo-card h-100">
          <h6 class="mb-2">3) serializeTimestamp</h6>
          <pre class="demo-pre">{{ serializedPretty }}</pre>
        </div>
      </div>
    </div>

    <div class="demo-card mt-3">
      <h6 class="mb-1">reviveTimestamp singolo</h6>
      <div class="small text-muted mb-2">ISO result: {{ singleIso }}</div>
      <pre class="demo-pre">{{ singleRevived }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-card {
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(48, 71, 94, 0.12);
  box-shadow: 0 10px 28px rgba(48, 71, 94, 0.08);
  padding: 1rem;
}

.demo-pre {
  background: #0f172a0d;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  line-height: 1.45;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.82rem;
  white-space: pre-wrap;
  margin: 0;
}
</style>
