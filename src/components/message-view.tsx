"use client";

import UserMessage from "./user-message";
import AssistantMessage from "./assistant-message";
import { useMessageStore } from "@/app/store/message-store";
import { useEffect } from "react";
import { Auth } from "@/domain/auth";
import { env } from "@/configuration/environments";

export default function MessageView() {
  const { addManyMessages } = useMessageStore((state) => state);
  const newMessage = useMessageStore((state) => state.messages);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = await Auth.getToken();
      if (token) {
        const messages = await fetch(`${env.baseUrl}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await messages.json();
        addManyMessages(data);
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2 w-full py-2 pb-4">
      <div className="flex flex-col gap-2 w-full">
        {newMessage.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.createdAt} message={message} />
          ) : (
            <AssistantMessage
              key={message.createdAt}
              message={message.content}
            />
          )
        )}
      </div>
    </div>
  );
}
