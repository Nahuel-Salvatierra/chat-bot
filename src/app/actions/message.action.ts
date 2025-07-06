"use server";

import { MessageError, MessageService } from "@/services/api/message.service";

export const sendMessage = async (message: string, token?: string) => {
  if (!token) {
    throw new MessageError("Token requerido", 401, "TOKEN_REQUIRED");
  }
  try {
    const response = await MessageService.sendMessage(message, token);
    return response;
  } catch (error) {
    if (error instanceof MessageError) {
      throw error;
    }
    throw new MessageError("Error interno del servidor", 500, "INTERNAL_ERROR");
  }
};
