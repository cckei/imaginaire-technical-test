export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gray-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/snowboard-1.jpg')" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <h1 className="text-4xl font-bold leading-tight tracking-tight mobile:text-3xl desktop:text-6xl">
          Ride the Mountain.
          <br />
          Own the Moment.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-200 mobile:text-base">
          Premium snowboards crafted for every terrain and every rider. From
          powder-fresh backcountry to park perfection — find your next board.
        </p>
        <a
          href="/shop"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 transition-all supports-hover:hover:bg-gray-100 supports-hover:hover:scale-105"
        >
          Shop Collection
        </a>
      </div>
    </section>
  );
}
