"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconX, IconPlus, IconMinus, IconTrash, IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import Btn from "./Btn";

function formatPrice(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export default function CartAside() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const currency = items[0]?.currencyCode ?? "USD";

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        className={`fixed inset-0 z-[200] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[201] h-full w-[min(100%,26rem)] max-w-[90vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl">
            Cart {totalItems > 0 && <span className="text-gray-400">({totalItems})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 transition-colors supports-hover:hover:text-gray-500"
          >
            <IconX size={24} stroke={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <IconShoppingBag size={48} stroke={1} />
              <p className="text-lg">Your cart is empty</p>
              <button
                type="button"
                onClick={closeCart}
                className="text-sm text-black underline underline-offset-4"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-200"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No img
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="text-sm font-medium leading-tight line-clamp-2 supports-hover:hover:underline"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && item.variantTitle !== "Default Title" && (
                        <p className="text-xs text-gray-400 mt-0.5">{item.variantTitle}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1.5 supports-hover:hover:bg-gray-50 transition-colors"
                        >
                          {item.quantity === 1 ? (
                            <IconTrash size={14} stroke={1.5} />
                          ) : (
                            <IconMinus size={14} stroke={1.5} />
                          )}
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1.5 supports-hover:hover:bg-gray-50 transition-colors"
                        >
                          <IconPlus size={14} stroke={1.5} />
                        </button>
                      </div>

                      {/* Line price */}
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity, item.currencyCode)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Subtotal</span>
              <span className="text-xl font-semibold">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <Btn size="md">Checkout</Btn>
          </div>
        )}
      </aside>
    </>
  );
}
