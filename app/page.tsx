'use client'

import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { StudioSection } from '@/components/sections/studio-section'
import { WorkSection } from '@/components/sections/work-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <StudioSection />
      <WorkSection />
      <ContactSection />
    </main>
  )
}
