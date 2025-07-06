"use client";

import { User } from "@/domain/user";
import { create } from "zustand";

export interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  removeUser: () => void;
  clearError: () => void;
}

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  removeUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    }),

  clearError: () => set({ error: null }),
}));
