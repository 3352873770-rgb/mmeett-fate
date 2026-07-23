import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Skin = 'day' | 'cloud' | 'night'

const STORAGE_KEY = '__mmeett_fate_skin__'

const ThemeContext = createContext<{ skin: Skin; setSkin: (s: Skin) => void } | null>(null)

function loadSkin(): Skin {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'day' || v === 'night' ? v : 'cloud'
  } catch {
    return 'cloud'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [skin, setSkinState] = useState<Skin>(() => loadSkin())

  useEffect(() => {
    document.documentElement.dataset.theme = skin
  }, [skin])

  const setSkin = (s: Skin) => {
    setSkinState(s)
    try {
      localStorage.setItem(STORAGE_KEY, s)
    } catch {
      /* ignore */
    }
  }

  return <ThemeContext.Provider value={{ skin, setSkin }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
