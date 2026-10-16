'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play, X } from 'lucide-react'
import { useLang } from '@/components/lang'

const SPOTIFY_ARTIST = '0JqKwgyfjSPhtCJ9Rvic33'
const FANLINK = 'https://goldfeathers.fanlink.tv/hitson'

// Botón "PRESS PLAY" + ventanita estilo reproductor con el Spotify de HitsON.
export function MusicPlayer() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-[#cfe3ff] hover:text-white transition-colors"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#8fc1ff]/50 group-hover:border-white transition-colors">
          <span className="absolute inset-0 rounded-full bg-[#2f7bff]/30 animate-ping" />
          <Play className="relative w-3.5 h-3.5 fill-current" />
        </span>
        {t('PRESS PLAY · ESCUCHA MI MÚSICA', 'PRESS PLAY · HEAR MY MUSIC')}
      </button>

      {open && mounted && createPortal(
        <div className="fixed z-[60] bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] rounded-xl border border-[#8fc1ff]/40 bg-[#070a14]/95 backdrop-blur-md shadow-[0_0_40px_#2f7bff55] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#8fc1ff]/20 bg-gradient-to-r from-[#2f7bff]/25 to-transparent">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#cfe3ff]">GOLD_FEATHERS.MP3</span>
            <button onClick={() => setOpen(false)} aria-label={t('Cerrar', 'Close')} className="text-[#cfe3ff]/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <iframe
            title="HitsON en Spotify"
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ border: 0, display: 'block' }}
          />
          <a
            href={FANLINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-center font-mono text-[11px] tracking-[0.2em] text-[#8fc1ff] hover:text-white border-t border-[#8fc1ff]/20"
          >
            {t('TODAS LAS PLATAFORMAS →', 'ALL PLATFORMS →')}
          </a>
        </div>,
        document.body
      )}
    </>
  )
}
