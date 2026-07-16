import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type AuthUser = {
  id: string
  name: string
  email: string
  member: boolean
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isMember: boolean
  authOpen: boolean
  authMode: 'login' | 'register'
  openAuth: (mode?: 'login' | 'register') => void
  closeAuth: () => void
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  upgradeMember: () => void
  requireAuth: (action?: () => void) => void
}

const STORAGE_KEY = '__suanleme_auth_user__'

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadUser())
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  const persist = (next: AuthUser | null) => {
    setUser(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }

  const openAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setAuthOpen(false)
    setPendingAction(null)
  }, [])

  const login = useCallback(
    async (email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 400))
      const next: AuthUser = {
        id: 'u_' + Date.now(),
        name: email.split('@')[0] || '云海用户',
        email,
        member: false,
      }
      persist(next)
      setAuthOpen(false)
      pendingAction?.()
      setPendingAction(null)
    },
    [pendingAction],
  )

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 500))
      const next: AuthUser = {
        id: 'u_' + Date.now(),
        name: name || email.split('@')[0] || '云海用户',
        email,
        member: false,
      }
      persist(next)
      setAuthOpen(false)
      pendingAction?.()
      setPendingAction(null)
    },
    [pendingAction],
  )

  const logout = useCallback(() => persist(null), [])

  const upgradeMember = useCallback(() => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, member: true }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const requireAuth = useCallback(
    (action?: () => void) => {
      if (user) {
        action?.()
        return
      }
      if (action) setPendingAction(() => action)
      setAuthMode('login')
      setAuthOpen(true)
    },
    [user],
  )

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isMember: !!user?.member,
      authOpen,
      authMode,
      openAuth,
      closeAuth,
      login,
      register,
      logout,
      upgradeMember,
      requireAuth,
    }),
    [user, authOpen, authMode, openAuth, closeAuth, login, register, logout, upgradeMember, requireAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
