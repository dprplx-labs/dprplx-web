import LogoMark from './LogoMark'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 h-16 flex items-center gap-4">
      <LogoMark width={34} />
      <span className="text-sm font-light tracking-[0.28em] text-white/80">
        dprplx
      </span>
    </nav>
  )
}
