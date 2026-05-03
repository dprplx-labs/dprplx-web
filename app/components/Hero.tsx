export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-16">
      <div className="max-w-5xl pt-16">
        <p
          className="text-[11px] font-light tracking-[0.45em] text-[#87B1FF] uppercase mb-12"
          style={{ animation: "fadeUp 0.9s ease-out 0.1s both" }}
        >
          Portfolio Co. · Est. 2026
        </p>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extralight tracking-tight text-zinc-50 leading-[1.06] mb-10"
          style={{ animation: "fadeUp 0.9s ease-out 0.3s both" }}
        >
          Software distilled
          <br />
          to its essence.
        </h1>

        <p
          className="text-base md:text-lg font-light text-zinc-400 max-w-md leading-7"
          style={{ animation: "fadeUp 0.9s ease-out 0.5s both" }}
        >
          dprplx builds a focused portfolio of software products. Each one
          shaped by a single principle: the beauty of simplicity.
        </p>
      </div>
    </section>
  );
}
