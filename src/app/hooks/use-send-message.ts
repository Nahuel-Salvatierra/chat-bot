"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMessage } from "../actions/message-action";
import { messageSchema } from "../validations/message-schema";
import { Auth } from "@/domain/auth";
import { createMessage, Message } from "@/domain/message";
import { useMessageStore } from "@/app/store/message-store";
import { toast } from "react-toastify";

export default function useSendMessage({
  onSuccess,
}: {
  onSuccess?: (response: Message) => void;
}) {
  const [loading, setLoading] = useState(false);

  const addMessage = useMessageStore((state) => state.addMessage);
  const updateOne = useMessageStore((state) => state.updateOne);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const submit = handleSubmit(async (data) => {
    setLoading(true);
    const newMessage = createMessage(
      data.message,
      "user",
      new Date(),
      "loading"
    );

    reset();
    addMessage(newMessage);

    const token = await Auth.getToken();

    try {
      const response = await sendMessage(data.message, token);

      updateOne({ ...newMessage, status: "success" });
      onSuccess?.(response);

      return response;
    } catch (error) {
      console.error(error);

      toast.error("Error sending message");
      updateOne({ ...newMessage, status: "error" });
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    registerForm: register,
    submit,
    validationErrors: errors,
  };
}
