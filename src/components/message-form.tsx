"use client";

import useSendMessage from "@/app/hooks/use-send-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpanError from "./span-error";
import { useMessageStore } from "@/app/store/message-store";

export default function MessageForm() {
  const { addMessage } = useMessageStore((state) => state);
  const { registerForm, submit, validationErrors, loading } = useSendMessage({
    onSuccess: (response) => {
      addMessage(response);
    },
  });

  return (
    <>
      <form
        className="flex gap-2 w-full sticky bottom-0 bg-card pt-2"
        onSubmit={submit}
      >
        <Input placeholder="Ask me anything" {...registerForm("message")} />
        <Button type="submit" disabled={loading}>
          Send
        </Button>
      </form>
      <SpanError error={validationErrors.message?.message} />
    </>
  );
}
