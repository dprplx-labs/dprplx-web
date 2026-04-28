export default function Philosophy() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-32 md:py-48 border-t border-zinc-900">
      <div className="max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.45em] text-zinc-600 uppercase mb-20">
          Philosophy
        </p>

        <blockquote className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extralight text-zinc-100 leading-[1.2] tracking-tight mb-16">
          The beauty of simplicity
          <br />
          is that it is the hardest
          <br />
          thing to achieve.
        </blockquote>

        <div className="max-w-lg space-y-5 text-[15px] font-light text-zinc-400 leading-7">
          <p>
            We don&apos;t build features. We build experiences — stripped back
            to what matters, precise in every detail.
          </p>
          <p>
            dprplx was founded on the conviction that the most powerful
            software is the kind that gets out of your way. Restraint is not
            a limitation. It is an art form.
          </p>
        </div>
      </div>
    </section>
  );
}
