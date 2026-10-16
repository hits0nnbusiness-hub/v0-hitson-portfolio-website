'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react'
import { useLang } from '@/components/lang'

const EMAIL = 'hits0nbusiness@outlook.es'

interface ContactSectionProps {
  accentColor?: string
}

export function ContactSection({ accentColor }: ContactSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLang()
  const subject = encodeURIComponent(t('Colaboración con HitsON', 'Collaboration with HitsON'))

  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-heading tracking-widest uppercase">{t('Colaboraciones', 'Collaborations')}</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            {t('¿Hacemos algo juntos?', 'Shall we make something?')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
            {t(
              'No tomo cualquier proyecto. Si eres artista o creador y tienes una idea que valga la pena, cuéntamela.',
              "I don't take every project. If you're an artist or creator with an idea worth making, tell me about it."
            )}
          </p>
          <p className="text-muted-foreground mb-10 text-sm">
            Ma titequitican / <span className="text-secondary">Tlazohcamati</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href={`mailto:${EMAIL}?subject=${subject}`}
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 font-heading font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: accentColor, boxShadow: accentColor ? `0 0 24px ${accentColor}66` : undefined }}
          >
            <Mail className="w-5 h-5" />
            {t('Escríbeme', 'Write to me')}
          </a>
          <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground">{EMAIL}</p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <a
            href="https://www.instagram.com/hits0n.real/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/people/Gold-Feathers/61552324411780/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.tiktok.com/@hits0n.real"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
            aria-label="TikTok"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@_hitson"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 pt-8 border-t border-border/50"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} <span className="text-foreground">HitsON</span> · Horacio Nahum Avendaño
          </p>
          <p className="flex items-center gap-2">
            {t('Hecho en ', 'Made in ')}<span className="text-primary">{t('México', 'Mexico')}</span> · ⚡️
          </p>
        </div>
      </motion.footer>
    </section>
  )
}
