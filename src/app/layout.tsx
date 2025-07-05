import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { description, title, keywords } from "@/lib/constant";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | GTU Solutions"
  },
  description,
  keywords,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png" }]
  },
  metadataBase: new URL("https://gtusolutions.fun"),
  openGraph: {
    title,
    description,
    url: "https://gtusolutions.fun",
    siteName: "GTU Solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTU Solutions OG",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTU Solutions",
    description: "All-in-one solution for GTU exam paper preparation.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://gtusolutions.fun",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster closeButton={true} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
