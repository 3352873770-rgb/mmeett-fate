import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '@/lib/auth'
import { useLang } from '@/lib/i18n'

export function AuthModal() {
  const { authOpen, authMode, closeAuth, login, register, openAuth } = useAuth()
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!authOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuth()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [authOpen, closeAuth])

  if (!authOpen) return null

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (authMode === 'login') await login(email, password)
      else await register(name, email, password)
    } catch {
      setError(t('操作失败，请重试', 'Something went wrong, please retry'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={closeAuth}>
      <div className="auth-panel" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="auth-head">
          <h2>{authMode === 'login' ? t('登录', 'Login') : t('注册', 'Register')}</h2>
          <button className="auth-close" onClick={closeAuth} aria-label="close">
            ×
          </button>
        </div>
        <p className="auth-hint">
          {t('演示用途，任意邮箱密码均可通过。', 'Demo only — any email and password works.')}
        </p>
        <form className="auth-form" onSubmit={submit}>
          {authMode === 'register' && (
            <label className="field">
              <span>{t('昵称', 'Name')}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('怎么称呼你', 'Your name')} />
            </label>
          )}
          <label className="field">
            <span>{t('邮箱', 'Email')}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </label>
          <label className="field">
            <span>{t('密码', 'Password')}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder={t('任意密码', 'Any password')} />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? t('处理中…', 'Working…') : authMode === 'login' ? t('登录', 'Login') : t('注册', 'Register')}
          </button>
        </form>
        <p className="auth-switch">
          {authMode === 'login' ? t('还没有账号？', 'No account yet?') : t('已有账号？', 'Already registered?')}
          <button onClick={() => openAuth(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? t('去注册', 'Sign up') : t('去登录', 'Sign in')}
          </button>
        </p>
      </div>
    </div>
  )
}
