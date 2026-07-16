import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

export function LoginPage() {
  const { user, isAuthenticated, login, register, logout } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      if (mode === 'login') await login(email, password)
      else await register(name, email, password)
      navigate('/')
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
          <p className="soft" style={{ fontSize: '0.9rem' }}>{user?.email}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Link className="btn" to="/favorites">我的收藏</Link>
            <button className="btn" onClick={logout}>退出登录</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page" style={{ maxWidth: '440px' }}>
      <span className="en-label">{mode === 'login' ? 'LOGIN' : 'REGISTER'}</span>
      <h1 style={{ margin: '0.5rem 0 0.5rem' }}>{mode === 'login' ? '登录' : '注册'}</h1>
      <p className="muted" style={{ marginBottom: '1.5rem', fontSize: '0.88rem' }}>演示用途，任意邮箱密码均可通过。</p>
      <form className="tool-panel" onSubmit={submit}>
        {mode === 'register' && (
          <label className="field">
            <span>昵称</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="怎么称呼你" />
          </label>
        )}
        <label className="field" style={{ marginTop: '0.75rem' }}>
          <span>邮箱</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
        </label>
        <label className="field" style={{ marginTop: '0.75rem' }}>
          <span>密码</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="任意密码" />
        </label>
        <button className="btn btn-primary btn-block" style={{ marginTop: '1rem' }} type="submit" disabled={busy}>
          {busy ? '处理中…' : mode === 'login' ? '登录' : '注册'}
        </button>
      </form>
      <p className="auth-switch">
        {mode === 'login' ? '还没有账号？' : '已有账号？'}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? '去注册' : '去登录'}
        </button>
      </p>
    </div>
  )
}
