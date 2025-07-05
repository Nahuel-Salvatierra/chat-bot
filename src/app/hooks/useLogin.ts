"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/validations/loginSchema";
import { useAuth } from "./useAuth";
import { useState } from "react";

export default function useLogin({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      await login(data);
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
