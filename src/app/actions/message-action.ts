"use server";

import { messageService } from "@/services/api/message-service";
import { MessageError } from "@/app/util/server-error";

export const sendMessage = async (message: string, token?: string) => {
  if (!token) {
    throw new MessageError("Unauthorized", 401, "UNAUTHORIZED");
  }
  try {
    const response = await messageService.sendMessage(message, token);
    return response;
  } catch (error) {
    if (error instanceof MessageError) {
      throw error;
    }
    throw new MessageError("Internal server error", 500, "INTERNAL_ERROR");
  }
};
