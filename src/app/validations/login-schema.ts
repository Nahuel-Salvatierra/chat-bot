"use client";

import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .min(3, "Email must be at least 3 characters")
    .max(255, "Email must be less than 255 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be less than 255 characters")
    .required("Password is required"),
});
