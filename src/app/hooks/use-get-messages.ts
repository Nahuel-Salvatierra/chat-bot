"use client";

import { Auth } from "@/domain/auth";
import { useMessageStore } from "../store/message-store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { addManyMessages } = useMessageStore((state) => state);
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const token = await Auth.getToken();
      try {
        if (token) {
          const messages = await fetch(`/api/messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await messages.json();
          addManyMessages(data);
        }
      } catch (error) {
        toast.error("Error getting messages");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
};
