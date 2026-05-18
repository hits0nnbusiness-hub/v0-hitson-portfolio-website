'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

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

interface AboutSectionProps {
  accentColor?: string
}

export function AboutSection({ accentColor }: AboutSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
          <span className="text-secondary text-sm font-heading tracking-widest uppercase">About</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Acerca de <span className="text-primary">mí</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              <span className="text-primary font-semibold">Multifaceted artist.</span> Narrative, visual, and interpretive.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Expert in 3D animation, VFX, sound design, and video editing. Creating immersive digital experiences that blend technology with storytelling.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <span className="text-secondary">Master&apos;s degree</span> in 3D Animation & Post-Production from UNIAT (Universidad Internacional de Avances Tecnológicos).
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Based in México</span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-heading text-lg text-muted-foreground mb-6">
              Herramientas / <span className="text-secondary">Tools</span>
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
