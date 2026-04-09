import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />

      <main className="min-h-[calc(100dvh-var(--header-height))] flex items-center">
        <div className="container mx-auto w-full py-20">
          <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">404</p>
            <h1 className="text-3xl tablet:text-2xl">Page not found</h1>
            <p className="text-lg text-gray-700">
              The page you’re looking for doesn’t exist (or it may have been moved).
            </p>

            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center text-center btn-hover bg-black text-white rounded px-8 py-5 text-lg"
            >
              <span className="btn__text">Back to home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

