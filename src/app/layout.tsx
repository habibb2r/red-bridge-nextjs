import type { Metadata } from "next";
import { Sansation } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/hooks/useAuth";


const sansation = Sansation({
  variable: "--font-sansation",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Red Bridge - Blood Donation Platform",
  description: "Connecting blood donors with those in need. Save lives, one donation at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansation.variable} ${sansation.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
