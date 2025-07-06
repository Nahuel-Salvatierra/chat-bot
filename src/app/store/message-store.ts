import { Message } from "@/domain/message";
import { create } from "zustand";

export interface MessageStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  addManyMessages: (messages: Message[]) => void;
  updateOne: (message: Message) => void;
}

export const useMessageStore = create<MessageStore>()((set) => ({
  messages: [],

  updateOne: (message: Message) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.createdAt === message.createdAt ? message : m
      ),
    })),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setMessages: (messages) => set({ messages }),

  addManyMessages: (messages) => set({ messages: [...messages] }),

  syncWithStorage: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chat-messages");
      if (stored) {
        set({ messages: JSON.parse(stored) });
      }
    }
  },
}));
