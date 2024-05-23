import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Providers from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Costing App",
  description: "A simple menu costing app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-screen
      "
      >
        <Providers>
          <Navbar />

          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
