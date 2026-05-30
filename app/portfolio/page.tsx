import { WorkSection } from '@/components/sections/work-section'

export const metadata = {
  title: 'Portfolio | HitsON',
  description: 'Trabajos destacados de HitsON — animación, VFX, cine y dirección.',
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <WorkSection accentColor="#39C5BB" />
    </main>
  )
}
