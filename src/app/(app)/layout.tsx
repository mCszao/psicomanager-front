import SideLinks from "@/components/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <SideLinks />
      <main className="pl-20 min-h-screen">
        {children}
      </main>
    </ThemeProvider>
  );
}
