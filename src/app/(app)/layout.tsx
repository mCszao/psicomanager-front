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
      {/* pl-20 só em desktop (sidebar lateral). pb-16 em mobile (bottom nav). */}
      <main className="md:pl-20 pb-16 md:pb-0 h-screen overflow-hidden">
        {children}
      </main>
    </ThemeProvider>
  );
}
