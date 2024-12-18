import Footer from "../components/shared/footer";
import "./globals.css";
import type { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import localFont from "next/font/local";
import Header from "../components/shared/header";
import { Analytics } from "@vercel/analytics/next";

// Octin Sports Font
const bravaSlab = localFont({
  src: "../../public/fonts/Brava Slab Bold.ttf",
  display: "swap",
  variable: "--font-brava-slab",
});

// Brava Slab Font
const octinSports = localFont({
  src: "../../public/fonts/Octin Sports Heavy.ttf",
  display: "swap",
  variable: "--font-octin-sports",
});

export const metadata: Metadata = {
  title: "MHS Laude",
  description:
    "Milton High School's Laude Point Calculator. No more tedious calculations! Simply upload your transcript and instantly get results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${octinSports.variable} ${bravaSlab.variable}`}>
      <head>
        <link rel="shortcut icon" href="/media/favicon.png" />
      </head>
      <body className="bg-background">
        <Analytics />
        <ChakraProvider>
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
