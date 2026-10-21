'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LangToggle, useLang } from '@/components/lang'

const navLinks = [
  { href: '/',              es: 'HitsON',        en: 'HitsON'        },
  { href: '/gold-feathers', es: 'Gold Feathers', en: 'Gold Feathers' },
  { href: '/portfolio',     es: 'Portfolio',     en: 'Portfolio'     },
  { href: '/backstage',     es: 'Backstage',     en: 'Backstage'     },
  { href: '/contacto',      es: 'Contacto',      en: 'Contact'       },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-lg tracking-tight"
          style={{ color: '#39C5BB' }}
        >
          H<span className="text-foreground">itsON</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, es, en }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  style={active ? { color: '#39C5BB', borderBottom: '2px solid #39C5BB' } : {}}
                >
                  {t(es, en)}
                </Link>
              </li>
            )
          })}
          <li>
            <a href="/verity" target="_blank" rel="noopener noreferrer"
              className="px-4 py-1.5 text-sm font-heading font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
              style={{ color: '#f4b400' }}>
              verity.file.exe
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LangToggle />
          </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="px-4 pt-3">
            <LangToggle />
          </div>
          <ul className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ href, es, en }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-heading font-medium transition-all ${
                      active
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    style={active ? { color: '#39C5BB' } : {}}
                  >
                    {t(es, en)}
                  </Link>
                </li>
              )
            })}
            <li>
              <a href="/verity" target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-heading font-medium underline underline-offset-4"
                style={{ color: '#f4b400' }}>
                verity.file.exe
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
