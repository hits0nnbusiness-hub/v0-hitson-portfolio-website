'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/components/lang'

type Sheet = { src: string; w: number; h: number; cols: number; frames: number }

const LOBITSON: Sheet = { src: '/hitson3d/sprites/lobitson.webp', w: 170, h: 195, cols: 10, frames: 47 }
const HITSON: Sheet = { src: '/hitson3d/sprites/hitson.webp', w: 113, h: 187, cols: 10, frames: 25 }

function SpriteDancer({ sheet, scale, fps = 12, label }: { sheet: Sheet; scale: number; fps?: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setFrame((f) => (f + 1) % sheet.frames), 1000 / fps)
    return () => clearInterval(id)
  }, [visible, fps, sheet.frames])

  const x = (frame % sheet.cols) * sheet.w * scale
  const y = Math.floor(frame / sheet.cols) * sheet.h * scale

  return (
    <figure className="flex flex-col items-center gap-3">
      <div
        ref={ref}
        role="img"
        aria-label={label}
        style={{
          width: sheet.w * scale,
          height: sheet.h * scale,
          backgroundImage: visible ? `url(${sheet.src})` : undefined,
          backgroundSize: `${sheet.cols * sheet.w * scale}px auto`,
          backgroundPosition: `-${x}px -${y}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 1px #8fc1ff) drop-shadow(0 0 10px #2f7bff55)',
        }}
      />
      <figcaption className="font-mono text-[10px] tracking-[0.3em] text-[#8fc1ff]/70">{label}</figcaption>
    </figure>
  )
}

export function DanceSection() {
  const { t } = useLang()
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const upd = () => setScale(window.innerWidth >= 768 ? 2 : 1)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  return (
    <section id="dance" className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#05060a]">
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
      <div className="relative max-w-6xl mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#8fc1ff] mb-3">
          {t('NIVEL 01 // PISTA DE BAILE', 'LEVEL 01 // DANCE FLOOR')}
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-14">
          Lobitson <span className="text-[#2f7bff]">×</span> HitsON
        </h2>
        <div className="flex items-end justify-center gap-8 md:gap-20">
          <SpriteDancer sheet={LOBITSON} scale={scale} label="LOBITSON" />
          <SpriteDancer sheet={HITSON} scale={scale} label="HITSON" />
        </div>
        <div
          className="mx-auto mt-2 h-6 max-w-xl rounded-[50%] blur-xl"
          style={{ background: 'radial-gradient(closest-side, #2f7bff66, transparent)' }}
        />
      </div>
    </section>
  )
}
