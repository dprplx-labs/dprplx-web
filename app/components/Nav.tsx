import Link from 'next/link'
import LogoMark from './LogoMark'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-zinc-900/60">
      <Link href="/" className="flex items-center gap-4">
        <LogoMark width={34} />
        <span className="text-sm font-light tracking-[0.28em] text-white/80">
          dprplx
        </span>
      </Link>
      <Link
        href="/lab"
        className="text-[11px] font-light tracking-[0.3em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
      >
        Lab
      </Link>
    </nav>
  )
}
