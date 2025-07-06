"use client";

import { useUserStore } from "@/app/store/user-store";
import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/services/firebase/configuration";

export default function useOnLoad() {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);

  const getUser = useCallback(async () => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email as string,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser]);

  useEffect(() => {
    const unsubscribe = getUser();

    return () => {
      unsubscribe.then((unsub) => unsub());
    };
  }, [getUser]);

  return { loading };
}
