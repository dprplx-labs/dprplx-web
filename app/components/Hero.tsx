type HeroProps = {
  eyebrow: string;
  line1: string;
  line2: string;
  subhead: string;
};

export default function Hero({ eyebrow, line1, line2, subhead }: HeroProps) {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-16">
      <div className="max-w-5xl pt-16">
        <p
          className="text-[11px] font-light tracking-[0.45em] text-[#87B1FF] uppercase mb-12"
          style={{ animation: "fadeUp 0.9s ease-out 0.1s both" }}
        >
          {eyebrow}
        </p>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extralight tracking-tight text-zinc-50 leading-[1.06] mb-10"
          style={{ animation: "fadeUp 0.9s ease-out 0.3s both" }}
        >
          {line1}
          <br />
          {line2}
        </h1>

        <p
          className="text-base md:text-lg font-light text-zinc-400 max-w-md leading-7"
          style={{ animation: "fadeUp 0.9s ease-out 0.5s both" }}
        >
          {subhead}
        </p>
      </div>
    </section>
  );
}
