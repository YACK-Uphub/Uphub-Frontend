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
        <header className={"sticky top-0 z-50"}>
          <div className={"py-3 px-12 bg-custom-white"}>
            <UHeader/>
          </div>

          {/* Sub Headers*/}
          <USubHeader navItems={navItems}/>
        </header>

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
