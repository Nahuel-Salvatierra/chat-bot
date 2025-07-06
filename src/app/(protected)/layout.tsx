import { Metadata } from "next";
import ProtectedGuard from "./guard";

export const metadata: Metadata = {
  title: "Chat with IA Assistant",
  description: "Chat with IA Assistant",
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedGuard>{children}</ProtectedGuard>;
}
