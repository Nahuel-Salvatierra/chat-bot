import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat with IA Assistant | Authentication",
  description: "Chat with IA Assistant | Authentication",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
