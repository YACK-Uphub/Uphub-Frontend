import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "$s | Page",
  description: "This is the InternHub App used externally for school, candidates and enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
