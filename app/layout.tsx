// app/layout.tsx
"use client";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNavBar from "@/ui-components/HeaderNavBar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <HeaderNavBar />
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}