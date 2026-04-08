import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/queries";
import type { ProductsResponse } from "@/lib/types";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";

async function getProducts() {
  const data = await shopifyFetch<ProductsResponse>({
    query: PRODUCTS_QUERY,
    variables: { first: 8 },
  });
  return data.products.edges.map((edge) => edge.node);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <ProductCarousel products={products} />
        <ContentSection />
      </main>

      <Footer />
    </>
  );
}
