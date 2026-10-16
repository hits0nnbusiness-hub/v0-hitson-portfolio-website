'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/components/lang'

type Ach = { icon: string; title: [string, string]; detail: [string, string]; year?: string; gs: number }

const ACHIEVEMENTS: Ach[] = [
  {
    icon: '🏆',
    title: ['Mejor Cortometraje Animado', 'Best Animated Short Film'],
    detail: ['The Lazy Caesar · Haz Corto con la Corrupción Festival', 'The Lazy Caesar · Haz Corto con la Corrupción Festival'],
    year: '2021',
    gs: 100,
  },
  {
    icon: '🎖️',
    title: ['Mención Especial', 'Special Mention'],
    detail: ['Agüita de Más · Construir Cine, Argentina', 'Agüita de Más · Construir Cine, Argentina'],
    year: '2024',
    gs: 50,
  },
  {
    icon: '✔️',
    title: ['Seguido por @adamgoodman', 'Followed by @adamgoodman'],
    detail: ['“So sick.” · “What is all this awesome stuff you’re building?”', '“So sick.” · “What is all this awesome stuff you’re building?”'],
    gs: 30,
  },
]

export function AchievementsSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [toast, setToast] = useState<number>(-1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen) {
        setSeen(true)
        ACHIEVEMENTS.forEach((_, i) => setTimeout(() => setToast(i), 300 + i * 1600))
        setTimeout(() => setToast(-1), 300 + ACHIEVEMENTS.length * 1600 + 600)
      }
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  const total = ACHIEVEMENTS.reduce((a, b) => a + b.gs, 0)

  return (
    <section id="logros" ref={ref} className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2f7bff]/40 to-transparent" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#8fc1ff] mb-2">
              {t('LOGROS DESBLOQUEADOS', 'ACHIEVEMENTS UNLOCKED')}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              {t('Trofeos', 'Trophies')} <span className="text-[#2f7bff]">HitsON</span>
            </h2>
          </div>
          <div className="font-mono text-sm text-[#cfe3ff]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2f7bff] text-[10px] font-bold text-white mr-2">G</span>
            {seen ? total : 0} GS
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-[#8fc1ff]/20 bg-[#0b1020]/80 px-4 py-4 md:px-6 transition-all duration-700"
              style={{ opacity: seen ? 1 : 0.15, transform: seen ? 'none' : 'translateX(-12px)', transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex h-12 w-12 md:h-14 md:w-14 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#2f7bff] to-[#0b1a44] text-2xl shadow-[0_0_20px_#2f7bff55]">
                {a.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-base md:text-lg font-semibold text-white">{t(a.title[0], a.title[1])}</p>
                <p className="text-sm text-muted-foreground truncate md:whitespace-normal">{t(a.detail[0], a.detail[1])}</p>
              </div>
              <div className="flex-none text-right font-mono text-xs text-[#8fc1ff]">
                {a.year && <div>{a.year}</div>}
                <div className="text-[#cfe3ff]">{a.gs} GS</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast tipo consola */}
      <div
        className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none"
        style={{ opacity: toast >= 0 ? 1 : 0, transform: `translate(-50%, ${toast >= 0 ? 0 : 20}px)` }}
      >
        {toast >= 0 && (
          <div className="flex items-center gap-3 rounded-full border border-[#8fc1ff]/40 bg-[#070a14]/95 pl-2 pr-5 py-2 shadow-[0_0_30px_#2f7bff66] backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f7bff] text-lg">{ACHIEVEMENTS[toast].icon}</span>
            <div className="leading-tight">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#8fc1ff]">{t('LOGRO DESBLOQUEADO', 'ACHIEVEMENT UNLOCKED')}</p>
              <p className="text-sm font-semibold text-white">
                {ACHIEVEMENTS[toast].gs}G · {t(ACHIEVEMENTS[toast].title[0], ACHIEVEMENTS[toast].title[1])}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
