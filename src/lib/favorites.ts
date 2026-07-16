import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = '__suanleme_favorites__'

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/** 收藏工具（localStorage），跨组件同步 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => load())

  useEffect(() => {
    const onStorage = () => setFavorites(load())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const has = useCallback((id: string) => favorites.includes(id), [favorites])

  return { favorites, toggle, has }
}
