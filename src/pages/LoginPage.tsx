import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export function LoginPage() {
  const { user, isAuthenticated, login, sendSms, logout } = useAuth()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [sending, setSending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (countdown <= 0) return
    const t = window.setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [countdown])

  const onSendSms = async () => {
    setError('')
    if (!/^1\d{10}$/.test(phone.trim())) {
      setError('请输入有效的 11 位手机号')
      return
    }
    setSending(true)
    try {
      await sendSms(phone.trim())
      setCountdown(60)
    } catch (e) {
      setError(e instanceof Error ? e.message : '验证码发送失败')
    } finally {
      setSending(false)
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(phone.trim(), smsCode.trim())
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败')
    } finally {
      setBusy(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="page" style={{ maxWidth: '520px' }}>
        <span className="en-label">ACCOUNT</span>
        <h1 style={{ margin: '0.5rem 0 1.5rem' }}>我的账户</h1>
        <div className="card">
          <p><strong>{user?.name}</strong></p>
          <p className="soft" style={{ fontSize: '0.9rem' }}>{user?.phone || user?.email}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link className="btn" to="/favorites">我的收藏</Link>
            <button className="btn" onClick={() => void logout()}>退出登录</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page" style={{ maxWidth: '440px' }}>
      <span className="en-label">LOGIN</span>
      <h1 style={{ margin: '0.5rem 0 0.5rem' }}>登录</h1>
      <p className="muted" style={{ marginBottom: '1.5rem', fontSize: '0.88rem' }}>
        手机号验证码登录；本地 mock 验证码为 123456。
      </p>
      <form className="tool-panel" onSubmit={submit}>
        <label className="field" style={{ marginTop: '0.75rem' }}>
          <span>手机号</span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="11 位手机号" />
        </label>
        <label className="field" style={{ marginTop: '0.75rem' }}>
          <span>验证码</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} required placeholder="短信验证码" style={{ flex: 1 }} />
            <button type="button" className="btn" disabled={sending || countdown > 0} onClick={() => void onSendSms()}>
              {countdown > 0 ? `${countdown}s` : sending ? '发送中…' : '获取验证码'}
            </button>
          </div>
        </label>
        {error ? <p style={{ color: '#c44', fontSize: '0.85rem', marginTop: '0.75rem' }}>{error}</p> : null}
        <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} type="submit" disabled={busy}>
          {busy ? '处理中…' : '登录'}
        </button>
      </form>
    </div>
  )
}
