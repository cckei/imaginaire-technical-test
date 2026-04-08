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
  title: "Imaginaire",
  description: "Shopify Developer — Tech Test",
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
