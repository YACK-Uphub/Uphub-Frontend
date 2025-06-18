import "./globals.css";
import React, {ReactNode} from "react";
import {Reem_Kufi} from "next/font/google";
import UHeader from "@/components/layout/header/UHeader";
import USubHeader from "@/components/layout/USubHeader";
import UFooter from "@/components/layout/UFooter";
import UPageSpinnerWrapper from "@/components/shared/spinner/UPageSpinnerWrapper";
import StoreProvider from "@/app/StoreProvider";
import {Slide, ToastContainer} from "react-toastify";
import {UserRole} from "@/types/user";
import AuthSessionSync from "@/providers/AuthSessionSync";
import {SessionProvider} from "next-auth/react";
import UChatWidget from "@/features/chatbox/components/UChatboxWidget";

const fontReemKufi = Reem_Kufi({
  subsets: ["vietnamese"],
  display: "swap",
});

// export const metadata: Metadata = {
// 	title: {
// 		template: "%s | UpHub",
// 		default: "Welcome to UpHub"
// 	},
// 	description: "This is the InternHub App used externally for school, candidates and enterprises",
// };

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  //! FOR TESTING PURPOSE on Auth
  // const session = .....
  const role: UserRole = UserRole.Guest;

  return (
      <html lang="en" className={`${fontReemKufi.className} h-full`}>
      <body className={"h-full text-custom-black leading-relaxed flex flex-col"}>
      <SessionProvider>
        <StoreProvider>
          <AuthSessionSync/>

          {/* Toaster */}
          <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
          />

          {/* Header */}
          <header className={"sticky top-0 z-50"}>
            <div className={"py-3 px-12 bg-custom-white"}>
              <UHeader/>
            </div>

            <USubHeader role={role}/>
          </header>

          {/* Main */}
          <main className={"flex-1 bg-custom-white"}>
            <UPageSpinnerWrapper>{children}</UPageSpinnerWrapper>
            <UChatWidget></UChatWidget>
          </main>

          {/* Footer*/}
          <footer className={"border-custom-white"}>
            <UFooter/>
          </footer>


        </StoreProvider>
      </SessionProvider>
      </body>
      </html>
  );
}
