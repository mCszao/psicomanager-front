import SideLinks from "@/components/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthGuard from "@/components/auth-guard";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AuthGuard />
      <SideLinks />
      <main className="pl-20 min-h-screen">
        {children}
      </main>
    </ThemeProvider>
  );
}
