import { ContactSection } from '@/components/sections/contact-section'

export const metadata = {
  title: 'Contacto | HitsON',
  description: 'Contáctame para proyectos de animación, VFX, cine y más.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background">
      <ContactSection accentColor="#39C5BB" />
    </main>
  )
}
