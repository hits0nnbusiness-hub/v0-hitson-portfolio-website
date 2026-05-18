'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Award, Star, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'The Lazy Caesar',
    year: '2021',
    role: 'Animator',
    achievement: 'Best Animated Shortfilm',
    festival: 'Haz Corto con la Corrupción Festival',
    color: 'primary',
    featured: true,
  },
  {
    title: 'Agüita de Más',
    year: '2024',
    role: 'Animation & Direction',
    achievement: 'Special Mention',
    festival: 'Construir Cine Argentina',
    color: 'secondary',
    featured: true,
  },
  {
    title: "Kill In' Papa",
    year: '2025',
    role: 'Direction · VFX · Acting · Screenwriting',
    achievement: 'Official Selection',
    festival: 'Lift-Off Global Network',
    color: 'primary',
    featured: true,
  },
  {
    title: "Deep N' Dirty H",
    year: '2023-2025',
    role: '3D Animation Music Videos',
    achievement: null,
    festival: null,
    color: 'secondary',
    featured: false,
  },
  {
    title: 'Content Creation for Business',
    year: 'Ongoing',
    role: '@hits0n.real',
    achievement: null,
    festival: null,
    color: 'primary',
    featured: false,
  },
  {
    title: 'More Projects',
    year: 'Coming Soon',
    role: 'New works in progress',
    achievement: null,
    festival: null,
    color: 'secondary',
    featured: false,
  },
]

interface WorkSectionProps {
  accentColor?: string
}

export function WorkSection({ accentColor }: WorkSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="work" className="py-24 md:py-32 px-4 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-secondary text-sm font-heading tracking-widest uppercase">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            Trabajos <span className="text-primary">Destacados</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Selected works / <span className="text-secondary">Tequitl</span>
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-video bg-card border border-border rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: hoveredIndex === index
                    ? `0 0 40px ${accentColor || '#39C5BB'}4D`
                    : 'none',
                  borderColor: hoveredIndex === index
                    ? accentColor || '#39C5BB'
                    : '',
                  transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {/* Placeholder for project image/video */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  project.color === 'primary'
                    ? 'from-primary/20 via-background to-background'
                    : 'from-secondary/20 via-background to-background'
                }`} />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    project.color === 'primary' ? 'bg-primary/90' : 'bg-secondary/90'
                  }`}>
                    <Play className="w-6 h-6 text-background ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Achievement Badge */}
                {project.featured && project.achievement && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
                    <Award className={`w-3 h-3 ${project.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    <span className="text-foreground/90">{project.achievement}</span>
                  </div>
                )}

                {/* Year Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                  {project.year}
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{project.role}</p>
                {project.festival && (
                  <p className="text-xs text-secondary/80 mt-2 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.festival}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
