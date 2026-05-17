import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'HitsON | Digital Filmmaker · 3D Animation · VFX',
  description: 'Multifaceted artist specializing in 3D animation, VFX, sound design, and video editing. Stories from the digital underworld.',
  keywords: ['filmmaker', '3D animation', 'VFX', 'sound design', 'video editing', 'Mexico', 'Gold Feathers'],
  authors: [{ name: 'HitsON - Horacio Nahum Avendaño' }],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} bg-background scroll-smooth`}>
      <body className="font-body antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
