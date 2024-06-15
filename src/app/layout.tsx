import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideLinks from "@/components/sidebar";
import metadataFactory from "@/util/metadataFactory";
const inter = Inter({ subsets: ["latin"] });

export const metadata = metadataFactory("Homecriada");
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
