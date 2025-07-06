"use client";

import { useUserStore } from "@/app/store/user-store";
import LoaderScreen from "@/components/loader-screen";
import useOnLoad from "../hooks/use-on-load";

export default function ProtectedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: loadingOnLoad } = useOnLoad();
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);

  if (loading || loadingOnLoad) {
    return <LoaderScreen />;
  }

  if (!user) {
    return <div>Unauthorized</div>;
  } else {
    return <>{children}</>;
  }
}
