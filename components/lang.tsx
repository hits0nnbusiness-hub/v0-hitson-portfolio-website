'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'es' | 'en'

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (es: string, en: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'es',
  setLang: () => {},
  t: (es) => es,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hitson-lang')
      if (saved === 'es' || saved === 'en') {
        setLangState(saved)
      } else if (!navigator.language.toLowerCase().startsWith('es')) {
        setLangState('en')
      }
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem('hitson-lang', l)
    } catch {}
  }

  const t = (es: string, en: string) => (lang === 'es' ? es : en)

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center rounded-full border border-border/60 p-0.5 font-mono text-[11px] tracking-widest">
      {(['es', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            lang === l ? 'bg-[#2f7bff] text-white' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
