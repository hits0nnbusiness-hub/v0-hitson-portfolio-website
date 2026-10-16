'use client'

import { useEffect, useRef, useState } from 'react'

type HitsON3DApi = { mount: (el: HTMLElement) => void; unmount: () => void }

declare global {
  interface Window {
    HitsON3D?: HitsON3DApi
  }
}

// Carga /public/hitson3d/hero.js (three.js nativo, sin build) y monta el peluche.
export function HitsON3D({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onLoaded = () => setLoaded(true)
    el.addEventListener('hitson3d-loaded', onLoaded)

    const start = () => {
      if (window.HitsON3D && ref.current) window.HitsON3D.mount(ref.current)
    }

    if (window.HitsON3D) {
      start()
    } else {
      window.addEventListener('hitson3d-ready', start, { once: true })
      if (!document.getElementById('hitson3d-script')) {
        const s = document.createElement('script')
        s.id = 'hitson3d-script'
        s.type = 'module'
        s.src = '/hitson3d/hero.js'
        document.body.appendChild(s)
      }
    }

    return () => {
      el.removeEventListener('hitson3d-loaded', onLoaded)
      window.removeEventListener('hitson3d-ready', start)
      if (window.HitsON3D) window.HitsON3D.unmount()
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
        }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-mono text-xs tracking-[0.3em] text-[#8fc1ff]/70 animate-pulse">LOADING…</span>
        </div>
      )}
    </div>
  )
}
