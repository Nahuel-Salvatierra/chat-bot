"use client";

import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .min(3, "Email debe tener al menos 3 caracteres")
    .max(255, "Email debe tener menos de 255 caracteres")
    .required("Email es requerido"),
  password: yup
    .string()
    .min(8, "Password debe tener al menos 8 caracteres")
    .max(255, "Password debe tener menos de 255 caracteres")
    .required("Password es requerido"),
});
