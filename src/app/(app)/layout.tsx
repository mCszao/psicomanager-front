import SideLinks from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideLinks />
      {children}
    </>
  );
}
