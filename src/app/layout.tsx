import { Inter } from "next/font/google";
import "./globals.css";
import SideLinks from "@/components/sidebar";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className+" relative"}>
        <SideLinks></SideLinks>
        {children}</body>
    </html>
  );
}
