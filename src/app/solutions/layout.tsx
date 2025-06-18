import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SolutionHeader from "@/components/SolutionHeader";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}
      >
        <div className="flex flex-col gap-0.5">
            <Header/>
            <SolutionHeader semester="semester 4" subject="Design Principales" year="2023" key={"1"} />
          {children}
        </div>
      </body>
    </html>
  );
}