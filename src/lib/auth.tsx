import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { apiFetch } from '@/lib/api'

export type AuthUser = {
  id: string
  name: string
  phone?: string
  avatar?: string
  token: string
  email?: string
  member?: boolean
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  authOpen: boolean
  authMode: 'login' | 'register'
  openAuth: (mode?: 'login' | 'register') => void
  closeAuth: () => void
  sendSms: (phone: string) => Promise<void>
  login: (phone: string, smsCode: string) => Promise<void>
  logout: () => Promise<void>
  requireAuth: (action?: () => void) => void
}

const STORAGE_KEY = '__meet_auth_fortune__'

type StoredAuth = { token: string; user: Omit<AuthUser, 'token'> }

type AuthResponseDto = {
  token: string
  userId: string
  displayName: string
  phone: string | null
  avatar: string | null
}

type UserProfileDto = {
  id: string
  displayName: string
  phone: string | null
  avatar: string | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredAuth
    if (!parsed?.token || !parsed?.user?.id) return null
    return { ...parsed.user, token: parsed.token }
  } catch {
    return null
  }
}

function persist(next: AuthUser | null) {
  if (!next) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  const { token, ...user } = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user } satisfies StoredAuth))
}

function toUser(dto: AuthResponseDto): AuthUser {
  return {
    id: dto.userId,
    name: dto.displayName || dto.phone || '用户',
    phone: dto.phone ?? undefined,
    avatar: dto.avatar ?? undefined,
    token: dto.token,
    email: dto.phone ?? undefined,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadStored())
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    const token = user?.token
    if (!token) return
    let cancelled = false
    ;(async () => {
      try {
        const me = await apiFetch<UserProfileDto>(STORAGE_KEY, '/api/auth/me')
        if (cancelled) return
        const next: AuthUser = {
          id: me.id,
          name: me.displayName || me.phone || '用户',
          phone: me.phone ?? undefined,
          avatar: me.avatar ?? undefined,
          token,
          email: me.phone ?? undefined,
        }
        setUser(next)
        persist(next)
      } catch {
        if (cancelled) return
        setUser(null)
        persist(null)
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }, [])

  const closeAuth = useCallback(() => {
    setAuthOpen(false)
    setPendingAction(null)
  }, [])

  const sendSms = useCallback(async (phone: string) => {
    await apiFetch<null>(STORAGE_KEY, '/api/auth/sms/send', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    })
  }, [])

  const login = useCallback(
    async (phone: string, smsCode: string) => {
      const dto = await apiFetch<AuthResponseDto>(STORAGE_KEY, '/api/auth/login/phone', {
        method: 'POST',
        body: JSON.stringify({ phone, smsCode }),
      })
      const next = toUser(dto)
      setUser(next)
      persist(next)
      setAuthOpen(false)
      pendingAction?.()
      setPendingAction(null)
    },
    [pendingAction],
  )

  const logout = useCallback(async () => {
    try {
      await apiFetch<null>(STORAGE_KEY, '/api/auth/logout', { method: 'POST' })
    } catch {
      // ignore
    }
    setUser(null)
    persist(null)
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
      authOpen,
      authMode,
      openAuth,
      closeAuth,
      sendSms,
      login,
      logout,
      requireAuth,
    }),
    [user, authOpen, authMode, openAuth, closeAuth, sendSms, login, logout, requireAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
