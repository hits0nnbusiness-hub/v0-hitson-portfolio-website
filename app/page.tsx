'use client'

import { useEffect, useState } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      setScrollProgress(Math.min(window.scrollY / totalHeight, 1))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const interpolateColor = (progress: number) => {
    const r = Math.round(57  + (229 - 57)  * progress)
    const g = Math.round(197 + (75  - 197) * progress)
    const b = Math.round(187 + (60  - 187) * progress)
    return `rgb(${r}, ${g}, ${b})`
  }

  const accentColor = interpolateColor(scrollProgress)

  return (
    <>
      <style jsx global>{`
        :root { --dynamic-accent: ${accentColor}; }
        .dynamic-glow   { box-shadow:   0 0 20px ${accentColor}40; }
        .dynamic-text-glow { text-shadow: 0 0 20px ${accentColor}99; }
        .dynamic-border { border-color: ${accentColor}; }
        .dynamic-bg     { background-color: ${accentColor}; }
      `}</style>

      {/* Scroll-progress bar */}
      <div
        className="fixed top-14 left-0 h-0.5 z-40 transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%`, backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
      />

      <main className="min-h-screen bg-background">
        <HeroSection  accentColor={accentColor} />
        <AboutSection accentColor={accentColor} />
      </main>
    </>
  )
}
