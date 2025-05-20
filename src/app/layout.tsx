import type {Metadata} from "next";
import "./globals.css";
import React, {ReactNode} from "react";
import {Reem_Kufi} from 'next/font/google'
import UHeader from "@/components/layout/header/UHeader";
import USubHeader from "@/components/layout/USubHeader";
import UFooter from "@/components/layout/UFooter";
import UPageSpinnerWrapper from "@/components/shared/spinner/UPageSpinnerWrapper";

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

const navItems = [
  {name: 'Trang chủ', path: '/'},
  {name: 'Về chúng tôi', path: '/about-us'},
  {name: 'Liên hệ', path: '/contact-us'},
];

// === Components =============================

export default function RootLayout({children}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={fontReemKufi.className}>
      <body className={"min-h-screen text-custom-black leading-relaxed flex flex-col"}>
        {/*<StoreProvider>*/}

        {/* Header */}
        <header className={"py-6 px-12 sticky top-0 z-50 bg-custom-white border-b-2"}>
            <UHeader/>
        </header>

        {/* Sub Headers*/}
        <USubHeader navItems={navItems}/>

        {/* Main */}
        <main className={"flex-1 bg-custom-white"}>
          <UPageSpinnerWrapper>
              {children}
          </UPageSpinnerWrapper>
        </main>

        {/* Footer*/}
        <footer className={"border-custom-yellow-1"}>
          <UFooter/>
        </footer>

        {/*</StoreProvider>*/}
      </body>
    </html>
  );
}
