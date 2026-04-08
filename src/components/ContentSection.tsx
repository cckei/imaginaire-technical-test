interface ContentSectionProps {
  heading?: string;
  body?: string;
}

export default function ContentSection({
  heading = "Crafted for the Bold",
  body = "Every board in our collection is shaped by riders who live for the mountain. We partner with independent shapers and sustainable material suppliers to deliver gear that performs at the highest level — without compromise. Whether you're dropping into a steep chute or cruising groomers at golden hour, our boards are designed to amplify the way you ride.",
}: ContentSectionProps) {
  return (
    <section className="bg-gray-50 py-20 mobile:py-12">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mobile:text-2xl">
          {heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-gray-600">
          {body}
        </p>
      </div>
    </section>
  );
}
