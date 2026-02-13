<script setup lang="ts">
import { computed, ref } from "vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import {
  Btn,
  FieldColorTag,
  FieldGender,
  FieldPhoneNumber,
  FieldTiptap,
  isPhoneNumberValid,
  type ColorTag,
  type Gender,
  type PhoneNumber,
} from "cic-kit";

type DemoForm = {
  name: string;
  gender: Gender;
  phoneNumber: PhoneNumber;
  tags: ColorTag[];
  bio: string;
};

const genderModel = ref<Gender>("");
const phoneModel = ref<PhoneNumber>(["+39", ""]);
const tagsModel = ref<ColorTag[]>([
  { label: "Vue", color: "#41b883" },
  { label: "Firebase", color: "#ffca28" },
]);
const bioModel = ref("<p>Scrivi qui...</p>");

const tagSuggestions = ref<ColorTag[]>([
  { label: "Vue", color: "#41b883" },
  { label: "Firebase", color: "#ffca28" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Bootstrap", color: "#6f42c1" },
]);

const schema = toTypedSchema(
  yup.object({
    name: yup.string().trim().required("Nome obbligatorio").min(2, "Minimo 2 caratteri"),
    gender: yup.mixed<Gender>().oneOf(["", "m", "f", "o"]).required("Genere obbligatorio"),
    phoneNumber: yup
      .mixed<PhoneNumber>()
      .required("Telefono obbligatorio")
      .test("phone", "Telefono non valido", (value) =>
        isPhoneNumberValid((value as PhoneNumber) ?? ["", ""])
      ),
    tags: yup
      .array(
        yup.object({
          label: yup.string().required(),
          color: yup.string().required(),
        })
      )
      .min(1, "Inserisci almeno un tag"),
    bio: yup.string().required("Bio obbligatoria").min(10, "Minimo 10 caratteri"),
  })
);

const initialValues = computed<DemoForm>(() => ({
  name: "",
  gender: genderModel.value,
  phoneNumber: phoneModel.value,
  tags: tagsModel.value,
  bio: bioModel.value,
}));

const submitted = ref<DemoForm | null>(null);

function onSubmit(values: DemoForm) {
  submitted.value = values;
}

function onNewSuggestion(tag: ColorTag) {
  tagSuggestions.value = [...tagSuggestions.value, tag];
}

function onDeleteSuggestion(tag: ColorTag) {
  tagSuggestions.value = tagSuggestions.value.filter((it) => it.label !== tag.label);
}
</script>

<template>
  <div class="container py-4 pb-t overflow-auto h-100">
    <h2 class="f-calSans mb-3">Demo: Field Inputs (vee-validate)</h2>

    <Form
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="(v) => onSubmit(v as DemoForm)"
      v-slot="{ values }"
    >
      <div class="row g-3">
        <div class="col-12 col-lg-6">
          <label class="form-label">Nome</label>
          <Field name="name" class="form-control" placeholder="Mario Rossi" />
        </div>

        <div class="col-12 col-lg-6">
          <FieldGender name="gender" v-model="genderModel" label="Genere" required />
        </div>

        <div class="col-12">
          <FieldPhoneNumber
            name="phoneNumber"
            v-model="phoneModel"
            label="Telefono"
            placeholder-prefix="+39"
            placeholder="3331234567"
            required
          />
        </div>

        <div class="col-12">
          <FieldColorTag
            name="tags"
            v-model="tagsModel"
            label="Tag colorati"
            :suggestions="tagSuggestions"
            :max-tags="8"
            @new-suggestion="onNewSuggestion"
            @delete-suggestion="onDeleteSuggestion"
          />
        </div>

        <div class="col-12">
          <FieldTiptap
            name="bio"
            v-model="bioModel"
            label="Bio"
            :toolbar-sticky-on="'top'"
            required
          />
        </div>

        <div class="col-12 d-flex gap-2">
          <Btn type="submit" icon="save" color="dark">Valida e salva</Btn>
        </div>
      </div>

      <div class="mt-4">
        <h5 class="mb-2">Values live</h5>
        <pre class="demo-pre">{{ values }}</pre>
      </div>
    </Form>

    <div v-if="submitted" class="mt-3">
      <h5 class="mb-2">Ultimo submit</h5>
      <pre class="demo-pre">{{ submitted }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-pre {
  background: #0f172a0d;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  line-height: 1.45;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.88rem;
  white-space: pre-wrap;
}
</style>
