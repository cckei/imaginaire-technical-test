import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { CartProvider } from "@/context/CartContext";
import CartAside from "@/components/CartAside";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Imaginaire",
    template: "%s — Imaginaire",
  },
  description: "Premium snowboards and gear by Imaginaire.",
  openGraph: {
    type: "website",
    siteName: "Imaginaire",
    title: "Imaginaire",
    description: "Premium snowboards and gear by Imaginaire.",
    images: [{ url: "/ogimag.jpg" }],
  },
  twitter: {
    card: "summary",
    title: "Imaginaire",
    description: "Premium snowboards and gear by Imaginaire.",
    images: ["/ogimag.jpg"],
  },
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartAside />
        </CartProvider>
      </body>
    </html>
  );
}
