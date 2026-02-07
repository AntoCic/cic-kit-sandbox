<script setup lang="ts">
import CodeBlock from "@src/utils/CodeBlock.vue";

import { Avatar } from "cic-kit";

// snippet per CodeBlock (NO <script> / <template> nel codice)
const code_sizes = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">sm</div>
    <Avatar size="sm" initials="SM" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">md</div>
    <Avatar size="md" initials="MD" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">lg</div>
    <Avatar size="lg" initials="LG" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">xl</div>
    <Avatar size="xl" initials="XL" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">number (48px)</div>
    <Avatar :size="48" initials="48" />
  </div>
</div>`;

const code_src = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">src + circle</div>
    <Avatar src="/img/logo/logo.png" title="Logo" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">src + square</div>
    <Avatar src="/img/logo/logo.png" shape="square" title="Logo square" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">src + xl</div>
    <Avatar src="/img/logo/logo.png" size="xl" title="Logo XL" />
  </div>
</div>`;

const code_fullName = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">fullName → initials</div>
    <Avatar fullName="Mario Rossi" title="Mario Rossi" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">fullName (1 parola)</div>
    <Avatar fullName="Giulia" title="Giulia" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">fullName + square</div>
    <Avatar fullName="Luca Bianchi" shape="square" title="Luca Bianchi" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">fullName + size 80</div>
    <Avatar fullName="Anna Verdi" :size="80" title="Anna Verdi" />
  </div>
</div>`;

const code_initials = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">initials</div>
    <Avatar initials="MK" title="MK" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">initials + xl</div>
    <Avatar initials="AB" size="xl" title="AB XL" />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">initials + square</div>
    <Avatar initials="SQ" shape="square" title="Square" />
  </div>
</div>`;

const code_icon = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">icon (precedenza)</div>
    <Avatar :icon="'span'" title="Icon slot-like">
      <!-- se la tua impl accetta componenti, qui è solo un esempio -->
    </Avatar>
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">icon con Material Symbols</div>
    <Avatar
      :icon="{ template: '<span class=\\'material-symbols-outlined\\'>person</span>' }"
      title="person"
    />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">icon + size 56</div>
    <Avatar
      :size="56"
      :icon="{ template: '<span class=\\'material-symbols-outlined\\'>photo</span>' }"
      title="photo"
    />
  </div>
</div>`;

const code_title_attrs = `<div class="d-flex flex-wrap gap-3 align-items-end">
  <div class="text-center">
    <div class="small text-muted mb-1">title + attrs</div>
    <Avatar
      fullName="Paolo Neri"
      title="Tooltip: Paolo Neri"
      class="shadow-sm"
      style="cursor: pointer;"
    />
  </div>

  <div class="text-center">
    <div class="small text-muted mb-1">placeholder</div>
    <Avatar title="Nessun dato" />
  </div>
</div>`;
</script>

<template>
  <div class="container py-3">
    <h2 class="mb-1">Avatar</h2>
    <div class="text-muted mb-3">
      Esempi rapidi per tutte le props: size, src, shape, initials/fullName, icon, title e $attrs.
    </div>

    <!-- 1) SIZE -->
    <div class="border rounded p-3 mb-3">
      <div class="fw-semibold mb-2">Size</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">sm</div>
          <Avatar size="sm" initials="SM" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">md</div>
          <Avatar size="md" initials="MD" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">lg</div>
          <Avatar size="lg" initials="LG" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">xl</div>
          <Avatar size="xl" initials="XL" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">number</div>
          <Avatar :size="48" initials="48" />
        </div>
      </div>

      <CodeBlock :code="code_sizes" />
    </div>

    <!-- 2) SRC + SHAPE -->
    <div class="border rounded p-3 mb-3">
      <div class="fw-semibold mb-2">src + shape</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">src + circle</div>
          <Avatar src="/img/logo/logo.png" title="Logo" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">src + square</div>
          <Avatar src="/img/logo/logo.png" shape="square" title="Logo square" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">src + xl</div>
          <Avatar src="/img/logo/logo.png" size="xl" title="Logo XL" />
        </div>
      </div>

      <CodeBlock :code="code_src" />
    </div>

    <!-- 3) FULLNAME -->
    <div class="border rounded p-3 mb-3">
      <div class="fw-semibold mb-2">fullName → initials automatiche</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">Mario Rossi</div>
          <Avatar fullName="Mario Rossi" title="Mario Rossi" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">Giulia</div>
          <Avatar fullName="Giulia" title="Giulia" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">square</div>
          <Avatar fullName="Luca Bianchi" shape="square" title="Luca Bianchi" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">size 80</div>
          <Avatar fullName="Anna Verdi" :size="80" title="Anna Verdi" />
        </div>
      </div>

      <CodeBlock :code="code_fullName" />
    </div>

    <!-- 4) INITIALS -->
    <div class="border rounded p-3 mb-3">
      <div class="fw-semibold mb-2">initials</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">MK</div>
          <Avatar initials="MK" title="MK" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">AB XL</div>
          <Avatar initials="AB" size="xl" title="AB XL" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">square</div>
          <Avatar initials="SQ" shape="square" title="Square" />
        </div>
      </div>

      <CodeBlock :code="code_initials" />
    </div>

    <!-- 5) ICON -->
    <div class="border rounded p-3 mb-3">
      <div class="fw-semibold mb-2">icon (precedenza su src/initials)</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">person</div>
          <Avatar icon="person" title="person" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">photo</div>
          <Avatar icon="photo" title="photo" shape="square" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">size 56</div>
          <Avatar :size="56" icon="star" title="star" />
        </div>
      </div>

      <CodeBlock :code="code_icon" />
      <div class="small text-muted mt-2">
        Nota: qui l’icon è un mini “componente inline” (oggetto con template) giusto per la demo.
      </div>
    </div>

    <!-- 6) TITLE + ATTRS + PLACEHOLDER -->
    <div class="border rounded p-3">
      <div class="fw-semibold mb-2">title + $attrs (class/style) + placeholder</div>

      <div class="d-flex flex-wrap gap-3 align-items-end mb-3">
        <div class="text-center">
          <div class="small text-muted mb-1">title + attrs</div>
          <Avatar fullName="Paolo Neri" title="Tooltip: Paolo Neri" class="shadow-sm" style="cursor: pointer;" />
        </div>

        <div class="text-center">
          <div class="small text-muted mb-1">placeholder</div>
          <Avatar title="Nessun dato" />
        </div>
      </div>

      <CodeBlock :code="code_title_attrs" />
    </div>
  </div>
</template>
