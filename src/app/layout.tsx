import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerar CPF",
  description: "Site para gerar CPFs válidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dosis.className}>
        <Toaster position="top-right" />
        {children}
        </body>
    </html>
  );
}
