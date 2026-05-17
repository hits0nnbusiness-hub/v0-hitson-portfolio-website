'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Music, Film, Clapperboard, Image } from 'lucide-react'

const services = [
  {
    icon: Music,
    title: 'Música',
    titleEn: 'Music',
    color: 'primary',
  },
  {
    icon: Film,
    title: 'Animación',
    titleEn: 'Animation',
    color: 'secondary',
  },
  {
    icon: Clapperboard,
    title: 'Cine',
    titleEn: 'Cinema',
    color: 'primary',
  },
  {
    icon: Image,
    title: 'Galería',
    titleEn: 'Gallery',
    color: 'secondary',
  },
]

export function StudioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="studio" className="py-24 md:py-32 px-4 bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-heading tracking-widest uppercase">Studio</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            <span className="text-secondary">Gold</span> Feathers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Producing music, animation, cinema, and gallery art from México.
            <span className="block text-xs mt-2 text-secondary/60">
              Produciendo desde el corazón de México
            </span>
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div 
                className={`relative bg-card border border-border rounded-lg p-6 md:p-8 text-center transition-all duration-300 hover:border-${service.color} hover:scale-105 cursor-pointer overflow-hidden`}
                style={{
                  boxShadow: service.color === 'primary' 
                    ? '0 0 30px rgba(255, 45, 117, 0)' 
                    : '0 0 30px rgba(0, 229, 255, 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = service.color === 'primary'
                    ? '0 0 30px rgba(255, 45, 117, 0.2)'
                    : '0 0 30px rgba(0, 229, 255, 0.2)'
                  e.currentTarget.style.borderColor = service.color === 'primary'
                    ? '#ff2d75'
                    : '#00e5ff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 45, 117, 0)'
                  e.currentTarget.style.borderColor = ''
                }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-4 transition-all duration-300 ${
                  service.color === 'primary' 
                    ? 'bg-primary/10 text-primary group-hover:bg-primary/20' 
                    : 'bg-secondary/10 text-secondary group-hover:bg-secondary/20'
                }`}>
                  <service.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-1">
                  {service.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {service.titleEn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
