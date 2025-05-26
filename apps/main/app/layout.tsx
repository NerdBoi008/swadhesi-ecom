import type { Metadata } from "next";
import "./globals.css";
import { fontPrimary } from "./fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Swadhesi",
  description: "Swadhesi a kids wear brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.className} antialiased`}
      >
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
