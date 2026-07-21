import { useState, type FormEvent } from 'react'

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!msg.trim()) return
    setSent(true)
    setMsg('')
  }

  return (
    <div className="page">
      <span className="en-label">CONTACT</span>
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', margin: '0.5rem 0 0.35rem' }}>联系我们</h1>
      <p className="soft" style={{ marginBottom: '2rem', maxWidth: '40rem' }}>
        产品建议、内容纠错或合作，都可以在这里留言。演示站不会真正发送信息。
      </p>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'start' }}>
        <form className="tool-panel" onSubmit={submit}>
          <label className="field">
            <span>邮箱（选填）</span>
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className="field" style={{ marginTop: '0.75rem' }}>
            <span>想说的话</span>
            <textarea rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="写下你的反馈或问题…" />
          </label>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} type="submit">提交反馈</button>
          {sent && <p className="badge" style={{ marginTop: '1rem' }}>已收到，感谢反馈（演示）</p>}
        </form>

        <div className="card">
          <h3>其他方式</h3>
          <p className="soft" style={{ marginTop: '0.75rem', lineHeight: 1.9 }}>
            邮箱：hello@suanlemeai.cn<br />
            公众号：MMEETT Fate<br />
            工作时间：周一至周五 10:00–18:00
          </p>
          <p className="muted" style={{ fontSize: '0.78rem', marginTop: '1rem' }}>以上联系方式为演示占位。</p>
        </div>
      </div>
    </div>
  )
}
