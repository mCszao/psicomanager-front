import SideLinks from "@/components/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import AuthGuard from "@/components/auth-guard";
import MainContent from "@/components/main-content";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AuthGuard />
        <SideLinks />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
