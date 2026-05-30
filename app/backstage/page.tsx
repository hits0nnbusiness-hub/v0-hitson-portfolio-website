'use client'

import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

// ─────────────────────────────────────────────
// Agrega tus fotos aquí. Cada objeto tiene:
//   src   → ruta en /public  (ej. "/backstage/foto1.jpg")
//   alt   → descripción
//   tag   → "Detrás de cámaras" | "Actor" | "Portfolio" | etc.
// ─────────────────────────────────────────────
const photos: { src: string; alt: string; tag: string }[] = [
  // Ejemplo (descomenta cuando subas tus fotos):
  // { src: '/backstage/foto1.jpg', alt: 'Kill In Papa set', tag: 'Detrás de cámaras' },
  // { src: '/backstage/foto2.jpg', alt: 'Actuación',        tag: 'Actor'             },
]

const tags = ['Todos', 'Detrás de cámaras', 'Actor', 'Portfolio']

export default function BackstagePage() {
  return (
    <main className="min-h-screen bg-background py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-heading tracking-widest uppercase" style={{ color: '#39C5BB' }}>
            Backstage
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
            Detrás de{' '}
            <span style={{ color: '#39C5BB' }}>cámaras</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Fotos de sets, actuación, portafolio visual y momentos del proceso creativo.
          </p>
        </motion.div>

        {/* Filter tags — funcionales cuando haya fotos */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm font-heading border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {photos.length === 0 ? (
          // Empty state — se quita cuando subas fotos
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6 py-32 border border-dashed border-border rounded-2xl"
          >
            <ImageIcon className="w-14 h-14 text-muted-foreground/30" />
            <div className="text-center">
              <p className="font-heading text-lg text-muted-foreground">Fotos próximamente</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Sube tus imágenes a <code className="bg-muted px-1 rounded">/public/backstage/</code> y agrégalas al array de este archivo.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs font-heading bg-black/50 px-2 py-1 rounded-full">
                    {photo.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
