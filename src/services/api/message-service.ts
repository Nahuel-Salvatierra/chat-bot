import {
  handleApiError,
  handleNetworkError,
  MessageError,
} from "@/app/util/server-error";
import { serverEnv } from "@/configuration/environments";
import { Message, createMessage } from "@/domain/message";

export const messageService = {
  async sendMessage(message: string, token: string): Promise<Message> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`${serverEnv.apiBaseUrl}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: message }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw handleApiError(response, errorData);
      }

      const data = await response.json();
      return createMessage(
        data.content,
        data.role,
        new Date(),
        "success",
        data.id
      );
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof MessageError) {
        console.error(`[MessageService] ${error.name}:`, error.message);
        throw error;
      }

      const networkError = handleNetworkError(error);
      console.error(`[MessageService] Network Error:`, networkError.message);
      throw networkError;
    }
  },

  async getMessages(token: string): Promise<Message[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${serverEnv.apiBaseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw handleApiError(response, errorData);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof MessageError) {
        console.error(`[MessageService] ${error.name}:`, error.message);
        throw error;
      }

      const networkError = handleNetworkError(error);
      console.error(`[MessageService] Network Error:`, networkError.message);
      throw networkError;
    }
  },
};
