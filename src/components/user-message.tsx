"use client";

import { Label } from "@/components/ui/label";
import CheckButton from "./check-icon";
import { Message } from "@/domain/message";
import ErrorIcon from "./error-icon";
import DoubleCheckButton from "./double-check-icon";

export default function UserMessage({ message }: { message: Message }) {
  if (message.content == null) return null;

  return (
    <Label className="text-sm bg-secondary p-2 rounded-lg w-fit">
      {message.content}
      {message.status === "loading" && <CheckButton />}
      {message.status === "error" && <ErrorIcon />}
      {message.status === "success" && <DoubleCheckButton />}
    </Label>
  );
}
