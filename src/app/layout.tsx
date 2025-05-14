import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import {Reem_Kufi} from 'next/font/google'
import StoreProvider from "@/app/StoreProvider";

// === Configuration =============================

const fontReemKufi = Reem_Kufi({
  subsets: ['vietnamese'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: "%s | UpHub",
    default: "Welcome to UpHub"
  },
  description: "This is the InternHub App used externally for school, candidates and enterprises",
};

// === Components =============================

export default function RootLayout({children}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={fontReemKufi.className}>
      <body className={"min-h-screen text-custom-black leading-relaxed"}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
