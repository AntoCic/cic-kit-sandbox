<!-- src/demo/DemoVeeValidate.vue -->
<script setup lang="ts">
import { BtnMoveIcon, cicKitStore, toast } from "cic-kit";
import CodeBlock from "@src/utils/CodeBlock.vue";

const imgLoghi = [
  "/img/logo/logo.png",
  "/img/utils/a.png",
  "/img/utils/b.png",
  "/img/utils/c.png",
  "/img/utils/d.png",
];

const views = cicKitStore.defaultViews;

// actions
function setLogo(url: string) {
  views.logoUrl = url;
  toast.success("Logo aggiornato");
}

function resetTheme() {
  views.logoUrl = "/img/logo/logo.png";
  views.colorDark = "#30475e";
  views.colorAccent = "#f05454";
  views.colorSoft = "#f7f4f4";
  toast.success("Tema ripristinato");
}

const code_runReset = `function resetTheme() {
  views.logoUrl = "/img/logo/logo.png"
  views.colorDark = "#30475e"
  views.colorAccent = "#f05454"
  views.colorSoft = "#f7f4f4"
}`;
</script>

<template>
  <div :style="cicKitStore.defaultViews.bgStyle()">

    <div class="container py-3 overflow-auto h-100 demo-theme">
      <div class="row g-3">
        <div class="col-auto"><img :src="views.logoUrl" alt="logo" class="logoImg" /></div>
        <div class="col">
          <div class="h5 mb-1">Theme Builder</div>
          <div class="text-secondary small">
            Seleziona un logo e personalizza i colori di default (preview + JSON live).
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="swatch" :style="{ background: views.colorDark }" title="colorDark" />
            <span class="swatch" :style="{ background: views.colorAccent }" title="colorAccent" />
            <span class="swatch border" :style="{ background: views.colorSoft }" title="colorSoft" />
          </div>
        </div>

        <!-- Controls -->
        <div class="col-12">
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <div class="fw-semibold mb-2">Scegli un logo</div>

              <div class="row g-2">
                <div v-for="url in imgLoghi" :key="url" class="col-6 col-sm-4 col-md-3">
                  <button type="button" class="logoChoice w-100" :class="{ active: views.logoUrl === url }"
                    @click="setLogo(url)">
                    <img :src="url" alt="logo option" class="logoChoiceImg" />
                    <div class="logoChoiceLabel small text-truncate">
                      {{ url.split("/").pop() }}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold mb-2">Colori</div>

              <div class="row g-3">
                <div class="col-12 col-md-4">
                  <label class="form-label mb-1">Color più scuro</label>
                  <div class="d-flex align-items-center gap-2">
                    <input type="color" class="form-control form-control-color" v-model="views.colorDark"
                      title="Choose your color" />
                    <code class="small text-secondary">{{ views.colorDark }}</code>
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="form-label mb-1">Accent</label>
                  <div class="d-flex align-items-center gap-2">
                    <input type="color" class="form-control form-control-color" v-model="views.colorAccent"
                      title="Choose your color" />
                    <code class="small text-secondary">{{ views.colorAccent }}</code>
                  </div>
                </div>

                <div class="col-12 col-md-4">
                  <label class="form-label mb-1">Soft background</label>
                  <div class="d-flex align-items-center gap-2">
                    <input type="color" class="form-control form-control-color" v-model="views.colorSoft"
                      title="Choose your color" />
                    <code class="small text-secondary">{{ views.colorSoft }}</code>
                  </div>
                </div>
              </div>

              <hr class="my-3" />

              <div class="mt-3">
                <div class="small text-secondary">Reset (runnabile)</div>
                <CodeBlock class="mt-2" :code="code_runReset" lang="ts" @run="resetTheme" />

                <BtnMoveIcon color="secondary" icon="restart_alt" @click="resetTheme">
                  Reset
                </BtnMoveIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-theme {
  --radius: 14px;
}

.preview {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.logoWrap {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.logoImg {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  display: inline-block;
}

.jsonBox {
  background: #0f172a0d;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius);
  padding: 12px;
  font-size: 12px;
  max-height: 220px;
  overflow: auto;
}

.logoChoice {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius);
  background: #fff;
  padding: 10px;
  text-align: center;
  transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
}

.logoChoice:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.logoChoice.active {
  border-color: rgba(0, 0, 0, 0.28);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.logoChoiceImg {
  width: 100%;
  height: 54px;
  object-fit: contain;
  display: block;
}

.logoChoiceLabel {
  margin-top: 6px;
}
</style>
