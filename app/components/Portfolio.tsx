const products = [
  {
    id: "01",
    name: "Card Show Club",
    tagline: "The modern operating system for the sports card show economy. Bridging physical show floors and the digital hobbyist.",
    domain: "cardshowclub.com",
    category: "Sports · Collectibles",
    live: true,
  },
  { id: "02", name: null, live: false },
  { id: "03", name: null, live: false },
]

export default function Portfolio() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-32 md:py-48 border-t border-zinc-900">
      <div className="max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.45em] text-zinc-600 uppercase mb-16">
          Portfolio
        </p>

        <h2 className="text-3xl sm:text-4xl font-extralight text-zinc-100 tracking-tight leading-tight mb-20">
          A growing portfolio of
          <br />
          focused software.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-[#0a0a0a] p-8 lg:p-10 group flex flex-col"
            >
              <span className="block text-[11px] font-light tracking-[0.3em] text-zinc-800 mb-12">
                {product.id}
              </span>

              <div className="flex-1 mb-12">
                {product.name ? (
                  <>
                    <p className="text-lg font-extralight text-zinc-100 mb-4">
                      {product.name}
                    </p>
                    <p className="text-sm font-light text-zinc-500 leading-6">
                      {product.tagline}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-px bg-zinc-800 mb-5" />
                    <p className="text-sm font-light text-zinc-600">Unannounced</p>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between mt-12">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full transition-opacity duration-500 group-hover:opacity-70 ${
                      product.live ? "bg-emerald-500" : "bg-zinc-700"
                    }`}
                  />
                  <span className={`text-[10px] font-light tracking-[0.3em] uppercase ${product.live ? "text-zinc-300" : "text-zinc-600"}`}>
                    {product.live ? "Live" : "In development"}
                  </span>
                </div>

                {product.domain && (
                  <a
                    href={`https://${product.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-light tracking-[0.15em] text-blue-500 hover:text-blue-400 transition-colors duration-300"
                  >
                    {product.domain} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
