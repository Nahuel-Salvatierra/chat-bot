"use client";

import { Label } from "@/components/ui/label";

export default function AssistantMessage({ message }: { message: string }) {
  return (
    <Label className="text-sm bg-tertiary self-end bg-background p-2 rounded-lg w-fit">
      {message}
    </Label>
  );
}
