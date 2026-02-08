<script setup lang="ts">
import { Auth } from "@src/main";
import { BtnGoogleLogin, BtnMoveIcon, ObjectViewer, Btn, toast } from "cic-kit";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";

type LoginValues = {
    email: string;
    password: string;
};

type ResetValues = {
    email: string;
};

type RegisterValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

const resetInitial: ResetValues = {
    email: "",
};

const loginInitial: LoginValues = {
    email: "",
    password: "",
};

const registerInitial: RegisterValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
};

const resetSchema = toTypedSchema(
    yup.object({
        email: yup.string().trim().required("Email obbligatoria").email("Email non valida"),
    })
);

const loginSchema = toTypedSchema(
    yup.object({
        email: yup.string().trim().required("Email obbligatoria").email("Email non valida"),
        password: yup.string().required("Password obbligatoria").min(6, "Minimo 6 caratteri"),
    })
);

const registerSchema = toTypedSchema(
    yup.object({
        name: yup.string().trim().required("Nome obbligatorio").min(2, "Minimo 2 caratteri"),
        surname: yup.string().trim().required("Cognome obbligatorio").min(2, "Minimo 2 caratteri"),
        email: yup.string().trim().required("Email obbligatoria").email("Email non valida"),
        password: yup.string().required("Password obbligatoria").min(6, "Minimo 6 caratteri"),
    })
);

async function onLogin(values: LoginValues) {
    console.log("login:", values);

    Auth.loginWithPassword(values.email, values.password)
        .then(() => toast.success("Login valido ✅ (demo)"))
        .catch((e) => {
            console.dir(e);
        })
}

async function onReset(values: ResetValues) {
    console.log("onReset:", values);

    Auth.resetPassword(values.email)
        .then(() => toast.success("Login valido ✅ (demo)"))
        .catch((e) => {
            console.dir(e);
        })
}

async function onRegister(values: RegisterValues) {
    console.log("register:", values);

    Auth.register(values.name, values.surname, values.email, values.password)
        .then(() => toast.success("Registrazione valida ✅ (demo)"))
        .catch(() => toast.error('Errore'))
}
</script>

<template>
    <div class="container py-4">
        <div class="row g-4">
            <div class="col-12">
                <h2 class="mb-1">Demo Auth</h2>
                <div class="text-body-secondary">
                    Login / Registrazione con VeeValidate e stato Auth in tempo reale.
                </div>
            </div>
            <div class="col-6">
                <BtnGoogleLogin @click="Auth.loginWithGoogle" />
            </div>
            <div class="col-6">
                <BtnMoveIcon color="danger" icon="logout" @click="() => Auth.logout()">
                    Logout
                </BtnMoveIcon>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Login</div>
                    <Form :initial-values="loginInitial" :validation-schema="loginSchema"
                        @submit="(v) => onLogin(v as LoginValues)" v-slot="{ meta, isSubmitting }">
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label">Email *</label>
                                <Field name="email" type="email" class="form-control" placeholder="mail@dominio.it" />
                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>

                            <div class="col-12">
                                <label class="form-label">Password *</label>
                                <Field name="password" type="password" class="form-control"
                                    placeholder="Min 6 caratteri" />
                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>

                            <div class="col-12 d-flex gap-2 align-items-center">
                                <Btn type="submit" color="primary" icon="login" :loading="isSubmitting"
                                    :disabled="!meta.valid || isSubmitting">
                                    Accedi
                                </Btn>
                                <div class="text-muted small">
                                    Stato: <b>{{ meta.valid ? "valido" : "non valido" }}</b>
                                </div>
                            </div>
                        </div>
                    </Form>
                    <hr>
                    <div class="fw-semibold mb-2">Reset password</div>
                    <Form :initial-values="resetInitial" :validation-schema="resetSchema"
                        @submit="(v) => onReset(v as ResetValues)" v-slot="{ meta, isSubmitting }">

                        <div class="input-group">
                            <Field name="email" type="email" class="form-control" placeholder="mail@dominio.it" />
                            <Btn type="submit" variant="outline" icon="lock_reset" :loading="isSubmitting"
                                :disabled="!meta.valid || isSubmitting"></Btn>
                        </div>
                        <div class="invalid-feedback d-block">
                            <ErrorMessage name="email" />
                        </div>
                    </Form>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">Registrazione</div>
                    <Form :initial-values="registerInitial" :validation-schema="registerSchema"
                        @submit="(v) => onRegister(v as RegisterValues)" v-slot="{ meta, isSubmitting }">
                        <div class="row g-3">
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

                            <div class="col-12">
                                <label class="form-label">Password *</label>
                                <Field name="password" type="password" class="form-control"
                                    placeholder="Min 6 caratteri" />
                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>

                            <div class="col-12 d-flex gap-2 align-items-center">
                                <Btn type="submit" color="success" icon="how_to_reg" :loading="isSubmitting"
                                    :disabled="!meta.valid || isSubmitting">
                                    Crea account
                                </Btn>
                                <div class="text-muted small">
                                    Stato: <b>{{ meta.valid ? "valido" : "non valido" }}</b>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">user</div>
                    <ObjectViewer :obj="Auth!.user" />
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="border rounded p-3 shadow-sm h-100">
                    <div class="fw-semibold mb-2">firebaseUser</div>
                    <ObjectViewer :obj="Auth!.firebaseUser" />
                </div>
            </div>
        </div>
    </div>
</template>
