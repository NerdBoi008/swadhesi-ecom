import type { Metadata } from "next";
import "./globals.css";
import { fontPrimary } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
import { Amplify } from "aws-amplify";
import { AmplifyClientWrapper } from "@/lib/auth/AmplifyClientWrapper";

console.log("Auth configuration loaded",Amplify.getConfig());


export const metadata: Metadata = {
  title: "Admin | swadhesi",
  description: "Swadhesi admin app.",
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
        <Toaster richColors position="top-right" />
        <AmplifyClientWrapper>
          {children}
        </AmplifyClientWrapper>
      </body>
    </html>
  )
}
