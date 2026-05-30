import { StudioSection } from '@/components/sections/studio-section'

export const metadata = {
  title: 'Gold Feathers | HitsON',
  description: 'Gold Feathers Studio — Música, Animación, Cine.',
}

export default function GoldFeathersPage() {
  return (
    <main className="min-h-screen bg-background">
      <StudioSection accentColor="#39C5BB" />
    </main>
  )
}
