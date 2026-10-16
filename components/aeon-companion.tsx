'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/components/lang'

type Api = { mount: (el: HTMLElement, onClick?: () => void) => void; unmount: () => void }
declare global {
  interface Window {
    AEON3D?: Api
  }
}

// Frases de AEON por sección (id del <section>)
const LINES: Record<string, [string, string]> = {
  about: ['Archivo HitsON: cargando biografía…', 'HitsON file: loading bio…'],
  logros: ['🏆 Logros desbloqueados. Revisa esto.', '🏆 Achievements unlocked. Check this out.'],
  dance: ['¡Nivel 01! Pista de baile.', 'Level 01! Dance floor.'],
  release: ['Shhh… esto todavía no sale.', "Shhh… this isn't out yet."],
  work: ['Proyectando cortos…', 'Screening short films…'],
  contact: ['¿Colaboramos? Escríbele a HitsON.', 'Collab? Write to HitsON.'],
}
const CLICK: [string, string][] = [
  ['Soy AEON, el bot de HitsON.', "I'm AEON, HitsON's bot."],
  ['No me toques los sensores 😤', "Don't touch my sensors 😤"],
  ["I'll be the hottest cameraman… 🚽🪠", "I'll be the hottest cameraman… 🚽🪠"],
  ['Ma nel xochitl, ma nel cuicatl.', 'Ma nel xochitl, ma nel cuicatl.'],
]

export function AeonCompanion() {
  const { t } = useLang()
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [y, setY] = useState(0)
  const [mobile, setMobile] = useState(false)
  const clickN = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const say = (text: string) => {
    setMsg(text)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 3800)
  }

  useEffect(() => {
    const upd = () => setMobile(window.innerWidth < 768)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  // Aparece después de pasar el inicio (para no competir con el peluche)
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const limit = hero ? hero.offsetHeight * 0.6 : 200
      setShow(window.scrollY > limit || !hero)
      const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setY(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Carga perezosa del modelo cuando hace falta mostrarlo
  useEffect(() => {
    if (!show || loaded) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const start = () => window.AEON3D && ref.current && window.AEON3D.mount(ref.current, () => {
      const l = CLICK[clickN.current++ % CLICK.length]
      say(t(l[0], l[1]))
    })
    const onLoaded = () => setLoaded(true)
    el.addEventListener('aeon-loaded', onLoaded)
    if (window.AEON3D) start()
    else {
      window.addEventListener('aeon3d-ready', start, { once: true })
      if (!document.getElementById('aeon3d-script')) {
        const s = document.createElement('script')
        s.id = 'aeon3d-script'; s.type = 'module'; s.src = '/hitson3d/aeon.js'
        document.body.appendChild(s)
      }
    }
    return () => el.removeEventListener('aeon-loaded', onLoaded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  useEffect(() => () => { window.AEON3D?.unmount() }, [])

  // Frase cuando entra cada sección
  useEffect(() => {
    if (!loaded) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const l = LINES[e.target.id]
        if (e.isIntersecting && l) say(t(l[0], l[1]))
      })
    }, { threshold: 0.4 })
    Object.keys(LINES).forEach((id) => {
      const s = document.getElementById(id)
      if (s) io.observe(s)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, pathname, t])

  // Compu: baja por la orilla derecha y se mece. Cel: se queda en la esquina de abajo.
  const pos = mobile
    ? { bottom: '12px', right: '6px' }
    : { top: `calc(${18 + y * 52}vh)`, right: `calc(${2 + Math.sin(y * Math.PI * 3) * 2.5}vw)` }

  return (
    <div
      className="fixed z-40 pointer-events-none transition-[opacity,transform] duration-700"
      style={{ ...pos, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)', transitionProperty: 'opacity, transform, top, right' }}
      aria-hidden={!show}
    >
      {msg && (
        <div
          className={
            mobile
              ? 'absolute bottom-full right-1 mb-1 w-max max-w-[170px] rounded-lg border border-[#8fc1ff]/40 bg-[#070a14]/90 backdrop-blur px-2.5 py-1.5 font-mono text-[10px] leading-snug text-[#cfe3ff]'
              : 'absolute -top-2 right-full mr-1 w-max max-w-[220px] rounded-lg border border-[#8fc1ff]/40 bg-[#070a14]/90 backdrop-blur px-3 py-2 font-mono text-[11px] leading-snug text-[#cfe3ff] shadow-[0_0_20px_#2f7bff44]'
          }
        >
          {msg}
        </div>
      )}
      <div
        ref={ref}
        className="pointer-events-auto cursor-pointer w-[84px] h-[84px] md:w-[170px] md:h-[170px]"
        title="AEON"
        style={{
          maskImage: 'radial-gradient(closest-side, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 70%, transparent 100%)',
        }}
      />
    </div>
  )
}
