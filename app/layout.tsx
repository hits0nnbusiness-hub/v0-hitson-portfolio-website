import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { LangProvider } from '@/components/lang'
import { AeonCompanion } from '@/components/aeon-companion'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-heading',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'HitsON | Filmmaker · Actor · 3D Animation · Music',
  description: 'Multifaceted artist specializing in 3D animation, VFX, sound design, and video editing. Stories from the digital underworld.',
  keywords: ['HitsON', 'filmmaker', '3D animation', 'VFX', 'sound design', 'video editing', 'Mexico', 'Gold Feathers'],
  authors: [{ name: 'HitsON - Horacio Nahum Avendaño' }],
  metadataBase: new URL('https://hitson.site'),
  openGraph: {
    title: 'HitsON',
    description: 'Filmmaker · Actor · 3D Animation · Music',
    url: 'https://hitson.site',
    siteName: 'HitsON',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} bg-background scroll-smooth`}>
      <body className="font-body antialiased">
        <LangProvider>
          <Navbar />
          <AeonCompanion />
          {/* pt-14 so content doesn't hide behind the fixed navbar */}
          <div className="pt-14">
            {children}
          </div>
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
