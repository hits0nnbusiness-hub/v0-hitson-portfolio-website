'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/components/lang'

const skills = [
  'Blender',
  'Maya',
  'Unreal Engine',
  'ZBrush',
  'DaVinci Resolve',
  'FL Studio',
  'After Effects',
  'Premiere Pro',
  'Audition',
  'Toon Boom Harmony',
]

const PHOTOS = [
  '/media/foto-hnahum-5.webp',
  '/media/foto-hitson1.webp',
  '/media/foto-h_0.webp',
  '/media/foto-hitson2.webp',
  '/media/foto-ari1.webp',
]

function PhotoSlides() {
  const [i, setI] = useState(0)
  const [pause, setPause] = useState(false)
  useEffect(() => {
    if (pause) return
    const id = setInterval(() => setI((n) => (n + 1) % PHOTOS.length), 3500)
    return () => clearInterval(id)
  }, [pause])
  return (
    <div
      className="relative mb-6 w-full aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-xl border border-border bg-black"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      {PHOTOS.map((src, k) => (
        <div key={src} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-50" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="HitsON" className="absolute inset-0 h-full w-full object-contain" loading={k === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}
      <button aria-label="Anterior" onClick={() => setI((n) => (n - 1 + PHOTOS.length) % PHOTOS.length)} className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white text-lg backdrop-blur hover:bg-[#2f7bff]">‹</button>
      <button aria-label="Siguiente" onClick={() => setI((n) => (n + 1) % PHOTOS.length)} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 text-white text-lg backdrop-blur hover:bg-[#2f7bff]">›</button>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {PHOTOS.map((_, k) => (
          <button key={k} aria-label={`Foto ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-6 bg-[#8fc1ff]' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  )
}

interface AboutSectionProps {
  accentColor?: string
}

export function AboutSection({ accentColor }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLang()

  return (
    <section id="about" className="py-24 md:py-32 px-4 relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-secondary text-sm font-heading tracking-widest uppercase">{t('Quién soy', 'About')}</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            {t('Acerca de ', 'About ')}<span className="text-primary">{t('mí', 'me')}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-[11px] tracking-[0.25em] text-[#8fc1ff] mb-3">
              {t('CINEASTA · ACTOR · MÚSICO · ESCRITOR · ANIMADOR', 'FILMMAKER · ACTOR · MUSICIAN · WRITER · ANIMATOR')}
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              <span className="text-primary font-semibold">{t('Crear mundos. Contar historias.', 'Build worlds. Tell stories.')}</span>{' '}
              {t('Dejar huella.', 'Leave a mark.')}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                'Horacio Nahum Avendaño, HitsON. Artista mexicano que junta cine, actuación, música y animación 3D en un solo lenguaje: cada historia con su imagen, su sonido y su firma.',
                'Horacio Nahum Avendaño, HitsON. Mexican artist who blends film, acting, music and 3D animation into one language: every story with its own look, its own sound and its own signature.'
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                'Dirijo películas y cortos, actúo, produzco mis propios beats, escribo y animo. Nada genérico: que cada obra se reconozca como mía.',
                'I direct films and shorts, act, produce my own beats, write and animate. Nothing generic: every piece should be recognizably mine.'
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('Cortometrajes ', 'Short films ')}
              <span className="text-secondary">{t('premiados en festivales internacionales', 'awarded at international festivals')}</span>.
            </p>
            <PhotoSlides />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>{t('Desde México', 'Based in Mexico')}</span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-heading text-lg text-muted-foreground mb-6">
              {t('Herramientas', 'Tools')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="px-4 py-2 bg-muted/50 border border-border rounded-full text-sm font-medium text-foreground/80 hover:bg-primary/10 transition-all cursor-default"
                  style={{
                    boxShadow: accentColor ? `0 0 15px ${accentColor}20` : '0 0 15px rgba(57, 197, 187, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    if (accentColor) {
                      e.currentTarget.style.borderColor = accentColor
                      e.currentTarget.style.color = accentColor
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.color = ''
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
