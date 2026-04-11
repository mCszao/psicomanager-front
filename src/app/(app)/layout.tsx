import SideLinks from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideLinks />
      <main className="pl-20 min-h-screen">
        {children}
      </main>
    </>
  );
}
