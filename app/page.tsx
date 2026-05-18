'use client'

import { useEffect, useState } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { StudioSection } from '@/components/sections/studio-section'
import { WorkSection } from '@/components/sections/work-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(window.scrollY / totalHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Interpolate from miku green (#39C5BB) to vermillion/orange-red (#E54B3C)
  const interpolateColor = (progress: number) => {
    // Start: #39C5BB (57, 197, 187)
    // End: #E54B3C (229, 75, 60)
    const r = Math.round(57 + (229 - 57) * progress)
    const g = Math.round(197 + (75 - 197) * progress)
    const b = Math.round(187 + (60 - 187) * progress)
    return `rgb(${r}, ${g}, ${b})`
  }

  const accentColor = interpolateColor(scrollProgress)

  return (
    <>
      {/* Dynamic CSS variables based on scroll */}
      <style jsx global>{`
        :root {
          --dynamic-accent: ${accentColor};
        }
        .dynamic-glow {
          box-shadow: 0 0 20px ${accentColor}40;
        }
        .dynamic-text-glow {
          text-shadow: 0 0 20px ${accentColor}99;
        }
        .dynamic-border {
          border-color: ${accentColor};
        }
        .dynamic-bg {
          background-color: ${accentColor};
        }
      `}</style>
      <main className="min-h-screen bg-background">
        <HeroSection />
        <AboutSection accentColor={accentColor} />
        <StudioSection accentColor={accentColor} />
        <WorkSection accentColor={accentColor} />
        <ContactSection accentColor={accentColor} />
      </main>
    </>
  )
}
