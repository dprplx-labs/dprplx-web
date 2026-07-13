type Status = "live" | "demo" | "development" | "waitlist"

type Product = {
  id: string
  name: string
  tagline: string
  domain?: string
  status: Status
}

type Category = {
  key: string
  label: string
  products: Product[]
}

const categories: Category[] = [
  {
    key: "wellness",
    label: "Health & Wellness",
    products: [
      {
        id: "01",
        name: "Optimonth",
        tagline: "Curated wellness commerce for the cycle-aware athlete. Products that support peak physical and mental performance through every phase of the month.",
        domain: "optimonth.com",
        status: "waitlist",
      },
    ],
  },
  {
    key: "finance",
    label: "Personal Finance",
    products: [
      {
        id: "02",
        name: "Vayld",
        tagline: "Privacy-first personal finance and allocation. Track everything, share nothing — your data never leaves your device.",
        domain: "vayld.com",
        status: "waitlist",
      },
    ],
  },
  {
    key: "collectibles",
    label: "Collectible Markets",
    products: [
      {
        id: "03",
        name: "Kaboom Exchange",
        tagline: "A trading-grade bid/ask order book for Panini Kaboom! cards. The market exists. Now it has a home.",
        domain: "kaboomexchange.com",
        status: "demo",
      },
      {
        id: "04",
        name: "Card Show Club",
        tagline: "Reimagining the sports card show economy — bridging the physical show floor and the digital hobbyist.",
        domain: "cardshowclub.com",
        status: "waitlist",
      },
      {
        id: "05",
        name: "Slab CFO",
        tagline: "Personal finance built for the serious collector. Know what your collection is really worth — and what to do about it.",
        domain: "slabcfo.com",
        status: "waitlist",
      },
      {
        id: "06",
        name: "SlabCall",
        tagline: "The demand network for graded cards. Collectors post what they want to buy, sell, or trade — the app does the matching.",
        domain: "slabcall.com",
        status: "waitlist",
      },
    ],
  },
  {
    key: "builder",
    label: "Builder Platforms",
    products: [
      {
        id: "07",
        name: "Fly5x",
        tagline: "Don't found alone. Fractional micro-teams and automated ownership rails — stakes, agreements, payouts — for builders shipping a portfolio of products.",
        domain: "fly5x.com",
        status: "waitlist",
      },
    ],
  },
]

const statusConfig: Record<Status, { dot: string; label: string; text: string; size: string }> = {
  live:        { dot: "bg-emerald-500",  label: "Live",           text: "text-zinc-300", size: "text-[10px]" },
  demo:        { dot: "bg-yellow-400",   label: "Demo Mode",      text: "text-zinc-300", size: "text-[9px]"  },
  waitlist:    { dot: "bg-[#87B1FF]",    label: "Waitlist",       text: "text-zinc-400", size: "text-[10px]" },
  development: { dot: "bg-zinc-700",     label: "In development", text: "text-zinc-600", size: "text-[10px]" },
}

function ProductCard({ product }: { product: Product }) {
  const s = statusConfig[product.status]
  return (
    <article className="bg-[#0a0a0a] p-8 lg:p-10 group flex flex-col">
      <span className="block text-[11px] font-light tracking-[0.3em] text-zinc-800 mb-12">
        {product.id}
      </span>

      <div className="flex-1 mb-12">
        <p className="text-lg font-extralight text-zinc-100 mb-4">
          {product.name}
        </p>
        <p className="text-sm font-light text-zinc-500 leading-6">
          {product.tagline}
        </p>
      </div>

      <div className="flex items-center justify-between mt-12">
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full transition-opacity duration-500 group-hover:opacity-70 ${s.dot}`} />
          <span className={`${s.size} font-light tracking-[0.3em] uppercase ${s.text}`}>
            {s.label}
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
  )
}

// Complete the desktop 3-column row with soft "unannounced" slots.
// Hidden on mobile so the stacked layout shows real cards only.
function FillerCard() {
  return (
    <div className="hidden md:flex bg-[#0a0a0a] p-8 lg:p-10 flex-col">
      <span className="block text-[11px] font-light tracking-[0.3em] text-zinc-800 mb-12">
        —
      </span>
      <div className="flex-1 mb-12">
        <div className="w-5 h-px bg-zinc-800 mb-5" />
        <p className="text-sm font-light text-zinc-700">Unannounced</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-32 md:py-48 border-t border-zinc-900">
      <div className="max-w-5xl">
        <p className="text-[11px] font-light tracking-[0.45em] text-[#87B1FF] uppercase mb-16">
          Portfolio
        </p>

        <h2 className="text-3xl sm:text-4xl font-extralight text-zinc-100 tracking-tight leading-tight mb-24">
          A growing portfolio of
          <br />
          focused software.
        </h2>

        <div className="space-y-20">
          {categories.map((category) => {
            const remainder = category.products.length % 3
            const fillerCount = remainder === 0 ? 0 : 3 - remainder
            return (
              <div key={category.key}>
                <div className="flex items-center gap-6 mb-8">
                  <p className="text-[11px] font-light tracking-[0.3em] text-zinc-600 uppercase whitespace-nowrap">
                    {category.label}
                  </p>
                  <div className="h-px flex-1 bg-zinc-900" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  {Array.from({ length: fillerCount }).map((_, i) => (
                    <FillerCard key={`filler-${category.key}-${i}`} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
