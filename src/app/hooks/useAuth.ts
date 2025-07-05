"use client";

import { useUserStore } from "@/store/user-store";
import { FirebaseAuth } from "@/services/firebase/auth-firebase";
import { IUser } from "@/domain/user";

export type Login = {
  email: string;
  password: string;
};

export type Register = Login;

export interface IAuth {
  register: (data: Register) => Promise<IUser>;
  login: (data: Login) => Promise<IUser>;
  logout: () => Promise<void>;
}

export const getAuth = () => {
  return new FirebaseAuth();
};

class Auth {
  static async login(data: Login) {
    return getAuth().login(data);
  }

  static async register(data: Register) {
    return getAuth().register(data);
  }

  static async logout() {
    return getAuth().logout();
  }
}

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
        id: user.email,
        username: user.email,
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
        id: user.email,
        username: user.email,
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
