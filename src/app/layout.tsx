import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StateContext } from "./context/StateContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z-Audio Store",
  description: "Developed By Zargham Ali",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StateContext>
          <Toaster />
          <div className="layout">
            <header>
              <Navbar />
            </header>
            <main className="main-container">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </StateContext>
      </body>
    </html>
  );
}
