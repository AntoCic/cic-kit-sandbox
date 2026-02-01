<!-- src/demo/DemoVeeValidate.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { Timestamp } from "firebase/firestore";
import { Btn, ObjectViewer, toast } from "cic-kit";


export type PhoneNumber = [prefix: string, number: string];
export type Gender = "" | "m" | "f" | "o";

export type DemoUserRegistration = {
  id: string;
  userPublicId: string;
  name: string;
  surname: string;
  email: string;
  birthDate?: Timestamp;
  phoneNumber?: PhoneNumber;
  photoURL?: string;
  description?: string;
  gender?: Gender;
  birthHideYear?: boolean;
};

type FormValues = {
  id: string;
  userPublicId: string;
  name: string;
  surname: string;
  email: string;

  birthDate?: string; // YYYY-MM-DD (input type="date")
  phonePrefix?: string;
  phoneNumber?: string;

  photoURL?: string;
  description?: string;
  gender?: Gender;
  birthHideYear?: boolean;
};

const initialValues = computed<FormValues>(() => ({
  id: "",
  userPublicId: "",
  name: "",
  surname: "",
  email: "",
  birthDate: "",
  phonePrefix: "+39",
  phoneNumber: "",
  photoURL: "",
  description: "",
  gender: "",
  birthHideYear: false,
}));

const schema = toTypedSchema(
  yup.object({
    id: yup
      .string()
      .trim()
      .required("ID obbligatorio")
      .min(3, "Minimo 3 caratteri"),
    userPublicId: yup
      .string()
      .trim()
      .required("Public ID obbligatorio")
      .matches(/^[a-zA-Z0-9_-]+$/, "Solo lettere, numeri, _ e -")
      .min(4, "Minimo 4 caratteri"),
    name: yup.string().trim().required("Nome obbligatorio").min(2, "Minimo 2 caratteri"),
    surname: yup.string().trim().required("Cognome obbligatorio").min(2, "Minimo 2 caratteri"),
    email: yup.string().trim().required("Email obbligatoria").email("Email non valida"),

    birthDate: yup
      .string()
      .optional()
      .test("date", "Data non valida", (v) => !v || !Number.isNaN(new Date(v).getTime())),

    // validiamo formato, ma la regola "o entrambi o nessuno" la gestiamo nel submit (toast)
    phonePrefix: yup
      .string()
      .optional()
      .transform((v) => (v ? String(v).trim() : v))
      .test("prefix", "Prefisso non valido (es: +39)", (v) => !v || /^\+\d{1,4}$/.test(v)),
    phoneNumber: yup
      .string()
      .optional()
      .transform((v) => (v ? String(v).trim() : v))
      .test("number", "Numero non valido", (v) => !v || /^[0-9]{5,15}$/.test(v)),

    photoURL: yup
      .string()
      .optional()
      .transform((v) => (v ? String(v).trim() : v))
      .test("url", "URL non valido", (v) => !v || /^https?:\/\/.+/i.test(v)),
    description: yup.string().optional().max(280, "Max 280 caratteri"),
    gender: yup.mixed<Gender>().oneOf(["", "m", "f", "o"]).optional(),
    birthHideYear: yup.boolean().optional(),
  })
);

const { handleSubmit, meta, values, isSubmitting } = useForm<FormValues>({
  initialValues: initialValues.value,
  validationSchema: schema,
});

const sub = ref({})

function toUser(vals: FormValues): DemoUserRegistration {
  const prefix = vals.phonePrefix?.trim() || "";
  const num = vals.phoneNumber?.trim() || "";
  const hasPhone = !!prefix && !!num;

  const birthDate = vals.birthDate?.trim()
    ? Timestamp.fromDate(new Date(vals.birthDate))
    : undefined;

  return {
    id: vals.id.trim(),
    userPublicId: vals.userPublicId.trim(),
    name: vals.name.trim(),
    surname: vals.surname.trim(),
    email: vals.email.trim(),
    birthDate,
    phoneNumber: hasPhone ? [prefix, num] : undefined,
    photoURL: vals.photoURL?.trim() || undefined,
    description: vals.description?.trim() || undefined,
    gender: vals.gender || undefined,
    birthHideYear: !!vals.birthHideYear,
  };
}

const onSubmit = handleSubmit(async (vals) => {
  // regola extra: se compili uno tra prefisso/numero, devi compilare anche l'altro
  const prefix = vals.phonePrefix?.trim();
  const num = vals.phoneNumber?.trim();
  if ((prefix && !num) || (!prefix && num)) {
    toast.error("Compila sia prefisso che numero di telefono (o lascia entrambi vuoti).");
    return;
  }

  const user = toUser(vals);

  sub.value = user

  // demo: qui faresti chiamata API / firestore ecc.
  console.log("values:", values);
  console.log("Demo user:", user);

  toast.success("Utente valido ✅ (vedi console)");
});
</script>

<template>
  <div class="ck-demo-veevalidate">
    <div class="mb-3">
      <h3 class="mb-1">Demo VeeValidate + Yup</h3>
      <div class="text-muted">Esempio form registrazione utente</div>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label class="form-label">ID *</label>
          <Field name="id" class="form-control" placeholder="es: user_001" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="id" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Public ID *</label>
          <Field name="userPublicId" class="form-control" placeholder="es: mario_rossi" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="userPublicId" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Nome *</label>
          <Field name="name" class="form-control" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="name" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Cognome *</label>
          <Field name="surname" class="form-control" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="surname" />
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">Email *</label>
          <Field name="email" type="email" class="form-control" placeholder="mail@dominio.it" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="email" />
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Data di nascita</label>
          <Field name="birthDate" type="date" class="form-control" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="birthDate" />
          </div>

          <div class="form-check mt-2">
            <Field name="birthHideYear" type="checkbox" class="form-check-input" :value="true" />
            <label class="form-check-label">Nascondi anno di nascita</label>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Genere</label>
          <Field name="gender" as="select" class="form-select">
            <option value="">—</option>
            <option value="m">Maschio</option>
            <option value="f">Femmina</option>
            <option value="o">Altro</option>
          </Field>
          <div class="invalid-feedback d-block">
            <ErrorMessage name="gender" />
          </div>
        </div>

        <div class="col-12 col-md-4">
          <label class="form-label">Prefisso</label>
          <Field name="phonePrefix" class="form-control" placeholder="+39" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="phonePrefix" />
          </div>
        </div>

        <div class="col-12 col-md-8">
          <label class="form-label">Numero</label>
          <Field name="phoneNumber" class="form-control" placeholder="3331234567" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="phoneNumber" />
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">Photo URL</label>
          <Field name="photoURL" class="form-control" placeholder="https://..." />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="photoURL" />
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">Descrizione</label>
          <Field name="description" as="textarea" class="form-control" rows="3" />
          <div class="invalid-feedback d-block">
            <ErrorMessage name="description" />
          </div>
        </div>

        <div class="col-12 d-flex gap-2 align-items-center">
          <Btn type="submit" color="primary" icon="how_to_reg" :loading="isSubmitting"
            :disabled="!meta.valid || isSubmitting">
            Crea utente
          </Btn>

          <div class="text-muted small">
            Stato: <b>{{ meta.valid ? "valido" : "non valido" }}</b>
          </div>
        </div>

        <div class="col-12 mt-2">
          <ObjectViewer :obj="sub" />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.ck-demo-veevalidate pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
