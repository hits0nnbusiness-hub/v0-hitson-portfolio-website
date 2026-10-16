'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import { HitsON3D } from '@/components/hitson-3d'
import { useLang } from '@/components/lang'
import { MusicPlayer } from '@/components/music-player'

const AURA = '#2f7bff'
const REEL_URL = 'https://vimeo.com/1177795498?fl=pl&fe=sh'

interface HeroSectionProps {
  accentColor?: string
}

export function HeroSection({ accentColor = AURA }: HeroSectionProps) {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden bg-[#05060a] flex flex-col"
    >
      {/* Fondo: aura + rejilla tenue */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(60% 55% at 68% 50%, ${AURA}33 0%, transparent 70%), radial-gradient(40% 40% at 15% 85%, #39C5BB14 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#8fc1ff 1px, transparent 1px), linear-gradient(90deg, #8fc1ff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(70% 60% at 60% 50%, black, transparent)',
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)' }}
      />

      {/* Franjas de cine */}
      <div className="absolute top-0 inset-x-0 h-[5vh] bg-black z-30" />
      <div className="absolute bottom-0 inset-x-0 h-[5vh] bg-black z-30" />

      {/* HUD */}
      <div className="absolute z-30 top-[5vh] inset-x-0 px-4 md:px-8 pt-3 flex justify-between font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-[#8fc1ff]/70 pointer-events-none">
        <span>HITSON.EXE // ARTIST FILE 001</span>
        <span className="hidden sm:inline">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2 align-middle animate-pulse" />
          REC
        </span>
      </div>
      <div className="absolute z-30 bottom-[5vh] inset-x-0 px-4 md:px-8 pb-3 flex justify-between font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-[#8fc1ff]/60 pointer-events-none">
        <span>{t('ARRASTRA PARA GIRAR', 'DRAG TO ROTATE')}</span>
        <span className="hidden sm:inline">MX · {new Date().getFullYear()}</span>
      </div>

      <div className="relative z-20 flex-1 grid md:grid-cols-2 items-center max-w-7xl w-full mx-auto px-4 md:px-8 pt-[9vh] pb-[9vh] gap-2">
        {/* Texto */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-[#8fc1ff] mb-4"
          >
            {t('CINEASTA DIGITAL · ANIMACIÓN 3D · VFX · MÚSICA', 'DIGITAL FILMMAKER · 3D ANIMATION · VFX · MUSIC')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-7xl sm:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.85] mb-6"
          >
            <span className="text-foreground">Hits</span>
            <span style={{ color: accentColor, textShadow: `0 0 40px ${accentColor}aa` }}>ON</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#8fc1ff]/90 italic text-base md:text-lg mb-1"
          >
            &ldquo;Ma nel xochitl, ma nel cuicatl&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs text-muted-foreground mb-10"
          >
            {t('Al menos flores, al menos cantos', 'At least flowers, at least songs')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <a
              href={REEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 font-heading font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 24px ${accentColor}88` }}
            >
              <Play className="w-4 h-4 fill-current" />
              {t('Ver reel', 'Watch reel')}
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-md px-7 py-3.5 font-heading font-semibold border border-[#8fc1ff]/40 text-[#cfe3ff] hover:bg-[#8fc1ff]/10 hover:border-[#8fc1ff] transition-all"
            >
              {t('Colaboremos', "Let's collaborate")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex justify-center md:justify-start"
          >
            <MusicPlayer />
          </motion.div>
        </div>

        {/* Peluche 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-1 md:order-2"
        >
          <HitsON3D className="w-full h-[46svh] md:h-[72svh]" />
        </motion.div>
      </div>

      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute z-30 bottom-[calc(5vh+2.25rem)] left-1/2 -translate-x-1/2 text-[#8fc1ff]/60 hover:text-white transition-colors animate-bounce"
        aria-label={t('Bajar', 'Scroll down')}
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  )
}
