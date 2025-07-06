"use client";

import { Auth, Login, Register } from "@/domain/auth";
import { useUserStore } from "@/app/store/user-store";

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const setError = useUserStore((state) => state.setError);
  const removeUser = useUserStore((state) => state.removeUser);

  const login = async (data: Login) => {
    setLoading(true);
    setError(null);
    try {
      const user = await Auth.login(data);
      setUser({
        email: user.email,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: Register) => {
    setLoading(true);
    setError(null);
    try {
      const user = await Auth.register(data);
      setUser({
        email: user.email,
      });
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await Auth.logout();
      removeUser();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { register: registerUser, login, logout };
};
