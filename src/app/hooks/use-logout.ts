"use client";

import { useUserStore } from "@/app/store/user-store";
import { useAuth } from "./use-auth";
import { toast } from "react-toastify";
import { useState } from "react";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const setError = useUserStore((state) => state.setError);

  const submit = async () => {
    try {
      setLoading(true);
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}
