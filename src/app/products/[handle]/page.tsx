import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/queries";
import type { ProductByHandleResponse } from "@/lib/types";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductImages from "@/components/ProductImages";
import ProductForm from "@/components/ProductForm";

interface PageProps {
  params: { handle: string };
}

async function getProduct(handle: string) {
  const data = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });
  return data.productByHandle;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} — Imaginaire`,
    description: product.description?.slice(0, 160) || "",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const hasDiscount =
    parseFloat(compareAt.amount) > 0 &&
    parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <>
      <Navigation />

      <main className="pt-10">
        {/* Breadcrumb */}
        <div className="container mx-auto mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="supports-hover:hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="supports-hover:hover:text-black transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>

        {/* Product detail */}
        <div className="container mx-auto">
          <div className="flex gap-16 tablet:flex-col tablet:gap-10">
            {/* Left — Images */}
            <div className="w-1/2 tablet:w-full flex-shrink-0">
              <ProductImages images={images} />
            </div>

            {/* Right — Info */}
            <div className="flex-1 flex flex-col gap-6 py-4">
              <div>
                <h1 className="text-3xl tracking-tight">{product.title}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: price.currencyCode,
                    }).format(parseFloat(price.amount))}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-400 line-through">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: compareAt.currencyCode,
                      }).format(parseFloat(compareAt.amount))}
                    </span>
                  )}
                </div>
              </div>

              {/* Variant selector + Add to cart */}
              <ProductForm
                variants={variants}
                productId={product.id}
                productTitle={product.title}
                handle={product.handle}
                image={images[0]?.url}
              />

              {/* Description */}
              {product.descriptionHtml && (
                <div className="border-t border-gray-200 pt-6 mt-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
                    Description
                  </h2>
                  <div
                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[var(--spacing-section)]" />
      </main>

      <Footer />
    </>
  );
}
