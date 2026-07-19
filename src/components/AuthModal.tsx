import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '@/lib/auth'
import { useLang } from '@/lib/i18n'

export function AuthModal() {
  const { authOpen, closeAuth, login, sendSms } = useAuth()
  const { t } = useLang()
  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [sending, setSending] = useState(false)
  const [countdown, setCountdown] = useState(0)

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

  useEffect(() => {
    if (countdown <= 0) return
    const tmr = window.setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => window.clearTimeout(tmr)
  }, [countdown])

  if (!authOpen) return null

  const onSendSms = async () => {
    setError(null)
    if (!/^1\d{10}$/.test(phone.trim())) {
      setError(t('请输入有效的 11 位手机号', 'Enter a valid 11-digit phone'))
      return
    }
    setSending(true)
    try {
      await sendSms(phone.trim())
      setCountdown(60)
    } catch (e) {
      setError(e instanceof Error ? e.message : t('验证码发送失败', 'Failed to send code'))
    } finally {
      setSending(false)
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await login(phone.trim(), smsCode.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : t('操作失败，请重试', 'Something went wrong, please retry'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={closeAuth}>
      <div className="auth-panel" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="auth-head">
          <h2>{t('登录', 'Login')}</h2>
          <button className="auth-close" onClick={closeAuth} aria-label="close">
            ×
          </button>
        </div>
        <p className="auth-hint">
          {t('手机号验证码登录，未注册将自动开户。本地 mock 验证码 123456。', 'Phone + SMS login. Mock code: 123456.')}
        </p>
        <form className="auth-form" onSubmit={submit}>
          <label className="field">
            <span>{t('手机号', 'Phone')}</span>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="11 位手机号"
            />
          </label>
          <label className="field">
            <span>{t('验证码', 'Code')}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                required
                placeholder={t('短信验证码', 'SMS code')}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn"
                disabled={sending || countdown > 0}
                onClick={onSendSms}
              >
                {countdown > 0 ? `${countdown}s` : sending ? t('发送中…', 'Sending…') : t('获取验证码', 'Get code')}
              </button>
            </div>
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? t('处理中…', 'Working…') : t('登录', 'Login')}
          </button>
        </form>
      </div>
    </div>
  )
}
