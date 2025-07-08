"use client";

import { Label } from "@/components/ui/label";
import CheckButton from "./check-icon";
import { Message } from "@/domain/message";
import ErrorIcon from "./error-icon";
import DoubleCheckButton from "./double-check-icon";
import LoaderDots from "./loader-dots";

export default function UserMessage({ message }: { message: Message }) {
  if (message.content == null) return null;

  console.log(message.status);
  return (
    <>
      <Label className="text-sm bg-secondary p-2 rounded-lg w-fit">
        {message.content}
        {message.status === "error" && <ErrorIcon />}
        {message.status === "loading" && <CheckButton />}
        {message.status === "success" && <DoubleCheckButton />}
        {message.status === "loading" && <LoaderDots />}
      </Label>
    </>
  );
}
