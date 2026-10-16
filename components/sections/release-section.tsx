'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useLang } from '@/components/lang'

const SRC = '/media/betbilder-preview.mp3'

export function ReleaseSection() {
  const { t } = useLang()
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [prog, setProg] = useState(0)

  useEffect(() => () => { audio.current?.pause() }, [])

  const toggle = () => {
    if (!audio.current) {
      const a = new Audio(SRC)
      a.addEventListener('timeupdate', () => setProg(a.currentTime / (a.duration || 30)))
      a.addEventListener('ended', () => { setPlaying(false); setProg(0) })
      audio.current = a
    }
    const a = audio.current
    if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) }
  }

  return (
    <section id="release" className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl border border-[#8fc1ff]/25 bg-gradient-to-br from-[#0b1430] via-[#070a14] to-[#070a14] p-6 md:p-10 shadow-[0_0_60px_#2f7bff22]">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#8fc1ff] mb-2">
          {t('PRÓXIMO LANZAMIENTO · GOLD FEATHERS', 'NEXT RELEASE · GOLD FEATHERS')}
        </p>
        <div className="flex items-center gap-5 md:gap-8">
          <button
            onClick={toggle}
            aria-label={playing ? t('Pausar', 'Pause') : t('Escuchar adelanto', 'Play preview')}
            className="relative flex h-16 w-16 md:h-20 md:w-20 flex-none items-center justify-center rounded-full bg-[#2f7bff] text-white shadow-[0_0_30px_#2f7bff88] transition-transform hover:scale-105"
          >
            {!playing && <span className="absolute inset-0 rounded-full bg-[#2f7bff]/40 animate-ping" />}
            {playing ? <Pause className="relative w-7 h-7 fill-current" /> : <Play className="relative w-7 h-7 fill-current ml-1" />}
          </button>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">Betbilder</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('Adelanto de 30 segundos. Muy pronto completa.', '30-second preview. Full track coming soon.')}
            </p>
            <div className="mt-4 h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#8fc1ff] transition-[width] duration-200" style={{ width: `${prog * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
