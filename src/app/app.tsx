"use client";

import { ToastContainer } from "react-toastify";
import { ThemeProvider, useTheme } from "next-themes";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AppContent>{children}</AppContent>
    </ThemeProvider>
  );
}

const AppContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer autoClose={3000} theme={theme} />
      {children}
    </>
  );
};
