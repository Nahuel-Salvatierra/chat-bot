export type MessageRole = "user" | "assistant";
export type Status = "idle" | "loading" | "success" | "error";

export interface Message {
  content: string;
  role: MessageRole;
  createdAt: string;
  status: Status;
  id?: string;
}

export const createMessage = (
  content: string,
  role: MessageRole,
  createdAt: Date = new Date(),
  status: Status,
  id?: string
): Message => ({
  content,
  role,
  createdAt: createdAt.toISOString(),
  status,
  id,
});
