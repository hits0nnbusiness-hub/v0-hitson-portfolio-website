'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/components/lang'

// ─────────────────────────────────────────────
// Portafolio de actor. Para agregar fotos: súbelas a /public/media
// y agrégalas aquí. Después hacemos subcarpetas (detrás de cámaras, etc.).
// ─────────────────────────────────────────────
const photos: { src: string; alt: string }[] = [
  { src: '/media/foto-hnahum-5.webp', alt: 'HitsON' },
  { src: '/media/foto-hitson1.webp', alt: 'HitsON' },
  { src: '/media/foto-ari1.webp', alt: 'HitsON' },
  { src: '/media/foto-h_0.webp', alt: 'HitsON' },
  { src: '/media/foto-hitson2.webp', alt: 'HitsON' },
]

export default function BackstagePage() {
  const { t } = useLang()
  return (
    <main className="min-h-screen bg-background py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-heading tracking-widest uppercase" style={{ color: '#39C5BB' }}>
            {t('Portafolio', 'Portfolio')}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
            <span style={{ color: '#39C5BB' }}>Actor</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            {t('Horacio Nahum Avendaño · HitsON frente a cámara.', 'Horacio Nahum Avendaño · HitsON on camera.')}
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="break-inside-avoid group relative overflow-hidden rounded-xl border border-border"
            >
              <a href={photo.src} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
