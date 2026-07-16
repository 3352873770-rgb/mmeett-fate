import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'zh' | 'en'

const STORAGE_KEY = '__suanleme_lang__'

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** 双语文案：中文必填，英文可选；英文缺省时回退中文 */
  t: (zh: string, en?: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

function loadLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadLang())

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => setLang(lang === 'zh' ? 'en' : 'zh'), [lang, setLang])

  const t = useCallback((zh: string, en?: string) => (lang === 'en' && en ? en : zh), [lang])

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
