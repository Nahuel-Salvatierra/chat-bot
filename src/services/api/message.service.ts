import { serverEnv } from "@/configuration/environments";
import { Message, createMessage } from "@/domain/message";

export class MessageError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "MessageError";
  }
}

export const MessageService = {
  async sendMessage(message: string, token: string): Promise<Message> {
    try {
      const response = await fetch(`${serverEnv.apiBaseUrl}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: message }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new MessageError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.code
        );
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
      if (error instanceof MessageError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new MessageError(
          "Error de conexión. Verifica tu internet.",
          0,
          "NETWORK_ERROR"
        );
      }

      throw new MessageError(
        "Error inesperado al enviar mensaje",
        0,
        "UNKNOWN_ERROR"
      );
    }
  },

  async getMessages(token: string): Promise<Message[]> {
    try {
      const response = await fetch(`${serverEnv.apiBaseUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new MessageError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.code
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof MessageError) {
        throw error;
      }

      throw new MessageError("Error al cargar mensajes", 0, "LOAD_ERROR");
    }
  },
};
