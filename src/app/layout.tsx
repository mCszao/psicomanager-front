import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | Agenda Psico", default: "Agenda Psico" },
  description: "Sistema de gestão para psicólogos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative bg-surface text-content-primary"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
