import { Link } from 'react-router-dom'

const benefits = [
  { k: '本地排盘', d: '排盘、起卦、抽牌与黄历打开即可使用，结果在浏览器本地生成。' },
  { k: '盘面可核', d: '先呈现可核对的盘面结构，再给出解读，不把结论说满。' },
  { k: '隐私可控', d: '基础盘与草稿默认留在设备；演示站不上传服务器。' },
]

export function AboutPage() {
  return (
    <div className="page">
      <span className="en-label">ABOUT</span>
      <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.8rem)', margin: '0.5rem 0 1rem' }}>关于算了么</h1>

      <h2 style={{ fontSize: '1.2rem' }}>可核对盘面，也可继续解读</h2>
      <p className="soft" style={{ maxWidth: '46rem', lineHeight: 1.9, marginTop: '0.75rem' }}>
        用现代界面呈现传统术数，把确定性排盘与解释清楚分开。东方玄学不是焦虑生意，它可以是一种观察时间、关系与选择的文化语言。
      </p>

      <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>产品介绍</h2>
      <p className="soft" style={{ maxWidth: '46rem', lineHeight: 1.9, marginTop: '0.75rem' }}>
        「算了么」是一套面向普通用户的东方命理排盘工具。八字、紫微、奇门、黄历等盘面由历法与排盘引擎生成；解读结合既有盘面、真太阳时和你的问题继续解释。
      </p>

      <h2 style={{ fontSize: '1.2rem', marginTop: '2rem' }}>三条原则</h2>
      <div className="grid-cards" style={{ marginTop: '1rem' }}>
        {benefits.map((b) => (
          <div key={b.k} className="card">
            <h3 style={{ fontSize: '1.05rem' }}>{b.k}</h3>
            <p className="soft" style={{ marginTop: '0.35rem' }}>{b.d}</p>
          </div>
        ))}
      </div>

      <div className="member-lock" style={{ marginTop: '2rem' }}>
        <div>
          <strong>本站为演示复刻</strong>
          <p className="muted" style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
            所有结果均为纯前端假数据，仅供交互体验与自我观察参考，不替代专业建议。
          </p>
        </div>
        <Link className="btn btn-primary btn-sm" to="/tools">去体验推演</Link>
      </div>
    </div>
  )
}
