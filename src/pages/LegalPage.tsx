const CONTENT = {
  disclaimer: {
    en: 'DISCLAIMER',
    title: '免责声明',
    paras: [
      '本站为「算了么」的演示复刻，所有排盘、卦象、牌意、签文与人格测试结果均由纯前端确定性算法生成，属演示假数据，不代表任何真实推断。',
      '站内内容仅供传统文化体验与自我观察参考，不构成医疗、法律、投资、婚恋或其他专业建议，也不应用于替代专业人士的判断。',
      '请理性看待命理与占卜，不迷信、不制造焦虑。因使用本站内容所作的任何决定，由使用者自行负责。',
    ],
  },
  privacy: {
    en: 'PRIVACY',
    title: '隐私政策',
    paras: [
      '本演示站不设真实后端。登录、会员状态、收藏与偏好等信息均保存在你当前浏览器的本地存储（localStorage）中，不上传服务器。',
      '基础排盘、抽牌与起卦在你的设备本地完成；页面不采集真实的身份信息。清除浏览器数据即可移除全部本地记录。',
      '本站不接入广告与第三方追踪脚本；字体等静态资源可能来自公开 CDN。',
    ],
  },
}

export function LegalPage({ kind }: { kind: 'disclaimer' | 'privacy' }) {
  const c = CONTENT[kind]
  return (
    <div className="page" style={{ maxWidth: '760px' }}>
      <span className="en-label">{c.en}</span>
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', margin: '0.5rem 0 1.5rem' }}>{c.title}</h1>
      {c.paras.map((p, i) => (
        <p key={i} className="soft" style={{ lineHeight: 1.9, marginBottom: '1rem' }}>{p}</p>
      ))}
      <p className="muted" style={{ fontSize: '0.8rem', marginTop: '2rem' }}>
        最后更新：2026 年 · Copyright © 2026 suanlemeai.cn
      </p>
    </div>
  )
}
