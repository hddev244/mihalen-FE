import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import {Nunito} from 'next/font/google';
import Footer from "@/components/footer/Footer";

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: "400",
})

export const metadata: Metadata = {
  title: {
    default:"Mihalen",
    template: "Mihalen | %s"
  },
  description: "mihale page desc",
};

export default function RootLayout({
  children,
  productView,
}: Readonly<{
  productView: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`dark:text-slate-900 bg-white pt-16  + ${nunito.className}`}>
        <Header></Header>
        <main className="h-full min-h-[80vh]">
        {productView}
        {children}
        </main>
        <Footer></Footer>
        </body>
    </html>
  );
}
