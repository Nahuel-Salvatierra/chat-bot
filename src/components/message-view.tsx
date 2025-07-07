"use client";

import UserMessage from "./user-message";
import AssistantMessage from "./assistant-message";
import { useMessageStore } from "@/app/store/message-store";
import { useGetMessages } from "@/app/hooks/use-get-messages";
import LoaderBox from "./loader-box";
import { useEffect, useRef } from "react";

export default function MessageView() {
  const messages = useMessageStore((state) => state.messages);
  const loadMessage = useMessageStore((state) => state.updateOne);
  const { loading } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadMessage]);

  return (
    <div className="flex gap-2 w-full py-2 pb-4 overflow-y-auto ">
      <div className="flex flex-col gap-2 w-full">
        {loading && <LoaderBox />}
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.createdAt} message={message} />
          ) : (
            <AssistantMessage
              key={message.createdAt}
              message={message.content}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
