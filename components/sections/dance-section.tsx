'use client'

import { useEffect, useRef, useState } from 'react'

type Sheet = { src: string; w: number; h: number; cols: number; frames: number }

// Un solo escenario: baila uno, CORTE, baila el otro, CORTE… infinito.
const DANCERS: Sheet[] = [
  { src: '/hitson3d/sprites/lobitson.webp', w: 213, h: 232, cols: 10, frames: 66 },
  { src: '/hitson3d/sprites/hitson.webp', w: 213, h: 232, cols: 10, frames: 66 },
]
const FPS = 12

export function DanceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [who, setWho] = useState(0)
  const [frame, setFrame] = useState(0)
  const [cut, setCut] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const upd = () => setScale(window.innerWidth >= 768 ? 2 : 1.5)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // precargar los dos para que el corte sea instantáneo
  useEffect(() => {
    if (!visible) return
    DANCERS.forEach((d) => { const i = new Image(); i.src = d.src })
  }, [visible])

  const pos = useRef({ who: 0, frame: 0 })
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      const p = pos.current
      p.frame += 1
      if (p.frame >= DANCERS[p.who].frames) {
        // CORTE: flashazo y cambia de bailarín
        p.frame = 0
        p.who = (p.who + 1) % DANCERS.length
        setCut(true)
        setTimeout(() => setCut(false), 90)
        setWho(p.who)
      }
      setFrame(p.frame)
    }, 1000 / FPS)
    return () => clearInterval(id)
  }, [visible])

  const d = DANCERS[who]
  const x = (frame % d.cols) * d.w * scale
  const y = Math.floor(frame / d.cols) * d.h * scale

  return (
    <section id="dance" className="relative py-20 md:py-28 px-4 overflow-hidden bg-[#05060a]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2f7bff]/40 to-transparent" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(#8fc1ff 1px, transparent 1px), linear-gradient(90deg, #8fc1ff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />
      <div className="relative flex flex-col items-center">
        <div
          ref={ref}
          role="img"
          aria-label="HitsON dance"
          style={{
            width: d.w * scale,
            height: d.h * scale,
            backgroundImage: visible ? `url(${d.src})` : undefined,
            backgroundSize: `${d.cols * d.w * scale}px auto`,
            backgroundPosition: `-${x}px -${y}px`,
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 1px #8fc1ff) drop-shadow(0 0 12px #2f7bff55)',
          }}
        />
        <div
          className="-mt-2 h-6 w-64 max-w-full rounded-[50%] blur-xl"
          style={{ background: 'radial-gradient(closest-side, #2f7bff77, transparent)' }}
        />
      </div>
      {/* flashazo del corte */}
      <div
        className="absolute inset-0 pointer-events-none bg-white mix-blend-overlay transition-opacity duration-75"
        style={{ opacity: cut ? 0.35 : 0 }}
      />
    </section>
  )
}
