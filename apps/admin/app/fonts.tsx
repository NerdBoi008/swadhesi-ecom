import { Dosis, Geist, } from "next/font/google";

export const fontPrimary = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: 'swap',
});

export const fontSecondary = Dosis({
  variable: "--font-dosis",
  subsets: ['latin'],
  display: 'swap',
});