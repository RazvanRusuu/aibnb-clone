import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/modals/Modal";

const nonito = Nunito({
  variable: "--font-nonito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nonito.variable} ${nonito.variable} antialiased`}>
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
