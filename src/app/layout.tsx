import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/app/context/AuthProvider";
import NavBar from "@/components/layout/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticketing System",
  description: "I mean, we all love tickets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="w-full">
      <body className={"w-full bg-zinc-100 min-w-fit" + inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
