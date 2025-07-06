"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/validations/login-schema";
import { useAuth } from "./use-auth";
import { useState } from "react";

export default function useRegister({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await register(data);
      onSuccess?.();
    } catch (error: unknown) {
      console.error(error);
      onError?.();
    } finally {
      setLoading(false);
    }
  });

  return {
    validationErrors: errors,
    submit,
    registerForm,
    loading,
  };
}
