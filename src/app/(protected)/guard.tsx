"use client";

import { useUserStore } from "@/store/user-store";

export default function ProtectedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  console.log(user, loading, isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Unauthorized</div>;
  }

  return <>{children}</>;
}
