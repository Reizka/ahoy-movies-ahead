import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import NavBar from "./myComponents/NavBar";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-svh">
        <NavBar />
        <ScrollArea className="max-w m-auto p-3 flex-1 flex flex-col w-full">

          {children}
        </ScrollArea>
      </body>
    </html>
  );
}
