import type { Metadata } from "next";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTION_PRODUCTS_QUERY } from "@/lib/queries";
import type { CollectionProductsResponse } from "@/lib/types";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "All Products — Imaginaire",
  description: "Browse our full collection of snowboards and gear.",
};

async function getAllProducts() {
  const data = await shopifyFetch<CollectionProductsResponse>({
    query: COLLECTION_PRODUCTS_QUERY,
    variables: { first: 20 },
  });
  return data.products.edges.map((e) => e.node);
}

export default async function CollectionsPage() {
  const products = await getAllProducts();

  return (
    <>
      <Navigation />

      <main className="pt-10">
        {/* Page header */}
        <div className="container mx-auto mb-12">
          <h1 className="text-3xl tracking-tight">All Products</h1>
          <p className="mt-2 text-lg text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Product grid */}
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-x-8 gap-y-12 tablet:grid-cols-2 tablet:gap-x-4 tablet:gap-y-8 mobile:gap-y-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="h-[var(--spacing-section)]" />
      </main>

      <Footer />
    </>
  );
}
