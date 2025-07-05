import ProtectedGuard from "./guard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedGuard>{children}</ProtectedGuard>;
}
