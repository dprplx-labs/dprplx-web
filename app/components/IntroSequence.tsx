'use client'

import { useCallback, useEffect, useState } from 'react'
import LogoMark from './LogoMark'

type Phase = 'perplexed' | 'deperplex' | 'brand' | 'done'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

// Question marks scattered around the periphery — avoid the center text area
const FLOATERS = [
  { left: '6%',  top: '11%', size: '1.9rem', opacity: 0.28, anim: 'float1', dur: 11, delay: '0s'    },
  { left: '80%', top: '8%',  size: '1.3rem', opacity: 0.20, anim: 'float2', dur: 9,  delay: '1.5s'  },
  { left: '11%', top: '72%', size: '2.2rem', opacity: 0.22, anim: 'float3', dur: 13, delay: '0.5s'  },
  { left: '76%', top: '68%', size: '1.6rem', opacity: 0.24, anim: 'float1', dur: 10, delay: '2.2s'  },
  { left: '87%', top: '38%', size: '2.0rem', opacity: 0.18, anim: 'float4', dur: 12, delay: '0.9s'  },
  { left: '3%',  top: '41%', size: '1.4rem', opacity: 0.21, anim: 'float2', dur: 14, delay: '2.8s'  },
  { left: '46%', top: '6%',  size: '1.1rem', opacity: 0.15, anim: 'float3', dur: 10, delay: '1.2s'  },
  { left: '54%', top: '82%', size: '1.7rem', opacity: 0.19, anim: 'float4', dur: 11, delay: '3.6s'  },
  { left: '24%', top: '17%', size: '1.0rem', opacity: 0.16, anim: 'float1', dur: 15, delay: '0.7s'  },
]

function TextSlide({
  text,
  visible,
  animate = false,
  className = '',
}: {
  text: string
  visible: boolean
  animate?: boolean
  className?: string
}) {
  return (
    <span
      className={`absolute left-1/2 whitespace-nowrap font-extralight ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? '0' : '10px'})`,
        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
        animation: animate && visible ? 'perplexWaver 3s ease-in-out infinite' : undefined,
        pointerEvents: 'none',
      }}
    >
      {text}
    </span>
  )
}

export default function IntroSequence({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('perplexed')
  const [exiting, setExiting] = useState(false)

  const finish = useCallback((instant = false) => {
    try { sessionStorage.setItem('dprplx_intro', '1') } catch {}
    if (instant) {
      setPhase('done')
    } else {
      setExiting(true)
      setTimeout(() => setPhase('done'), 1000)
    }
  }, [])

  useEffect(() => {
    let t0: ReturnType<typeof setTimeout> | undefined
    try {
      if (sessionStorage.getItem('dprplx_intro')) {
        t0 = setTimeout(() => finish(true), 0)
        return () => clearTimeout(t0)
      }
    } catch {}

    const t1 = setTimeout(() => setPhase('deperplex'), 2400)
    const t2 = setTimeout(() => setPhase('brand'), 4400)
    const t3 = setTimeout(() => finish(), 6200)

    return () => [t0, t1, t2, t3].forEach((t) => t && clearTimeout(t))
  }, [finish])

  if (phase === 'done') return <>{children}</>

  return (
    <>
      {children}

      <div
        role="button"
        tabIndex={0}
        aria-label="Skip intro"
        onClick={() => finish()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? finish() : undefined}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden cursor-pointer select-none"
        style={{
          opacity: exiting ? 0 : 1,
          transition: exiting ? 'opacity 1s ease-out' : 'none',
        }}
      >
        {/* Noise layer 1 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundSize: '200px 200px',
            opacity: phase === 'perplexed' ? 0.38 : phase === 'deperplex' ? 0.07 : 0,
            transition: 'opacity 1.8s ease-out',
            animation: 'noiseShift 7s linear infinite',
            mixBlendMode: 'screen',
          }}
        />

        {/* Noise layer 2 — faster, offset */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundSize: '200px 200px',
            opacity: phase === 'perplexed' ? 0.20 : phase === 'deperplex' ? 0.03 : 0,
            transition: 'opacity 1.8s ease-out',
            animation: 'noiseShift2 4.5s linear infinite',
            mixBlendMode: 'screen',
          }}
        />

        {/* Floating question marks — visible only in perplexed phase */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="absolute font-extralight text-zinc-600 select-none"
              style={{
                left: f.left,
                top: f.top,
                fontSize: f.size,
                opacity: phase === 'perplexed' ? f.opacity : 0,
                transition: 'opacity 1.6s ease-in-out',
                animation: `${f.anim} ${f.dur}s ease-in-out infinite`,
                animationDelay: f.delay,
              }}
            >
              ?
            </span>
          ))}
        </div>

        {/* Logo + text */}
        <div className="relative flex flex-col items-center gap-10">
          <div
            style={{
              opacity: phase === 'brand' ? 1 : 0,
              transform: `translateY(${phase === 'brand' ? '0' : '8px'})`,
              transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
            }}
          >
            <LogoMark width={88} />
          </div>

          <div
            className="relative h-14 flex items-center justify-center"
            style={{ minWidth: '20rem' }}
          >
            <TextSlide
              text="perplexed?"
              visible={phase === 'perplexed'}
              animate
              className="text-4xl sm:text-5xl text-zinc-500 tracking-wide"
            />
            <TextSlide
              text="deperplex."
              visible={phase === 'deperplex'}
              className="text-4xl sm:text-5xl text-zinc-300 tracking-normal"
            />
            <TextSlide
              text="dprplx"
              visible={phase === 'brand'}
              className="text-4xl sm:text-5xl text-white tracking-[0.2em]"
            />
          </div>
        </div>

        {/* Skip hint */}
        <span
          className="absolute bottom-10 text-[10px] font-light tracking-[0.3em] text-zinc-800 uppercase"
          style={{
            opacity: phase === 'perplexed' ? 0 : 0.7,
            transition: 'opacity 1.2s ease-out',
          }}
        >
          tap to skip
        </span>
      </div>
    </>
  )
}
