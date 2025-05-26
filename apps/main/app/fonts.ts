import { Mulish, Yanone_Kaffeesatz,  } from "next/font/google";

export const fontPrimary = Mulish({
    variable: "--font-mulish",
    subsets: ["latin"],
    display: "swap",
});

export const fontSecondary = Yanone_Kaffeesatz({
    variable: "--font-yanone-kaffeesatz",
    subsets: ["latin"],
    display: "swap",
});