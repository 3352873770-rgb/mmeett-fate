import { useMemo, useState } from 'react'
import { MemberLock } from '@/components/MemberLock'
import { publicAsset } from '@/lib/publicAsset'

type Dim = 'EI' | 'SN' | 'TF' | 'JP'
type Q = { dim: Dim; a: string; b: string; aKey: string; bKey: string }

const dimensions = [
  { key: 'EI', zh: '能量方向', left: '外向 E', right: '内向 I' },
  { key: 'SN', zh: '信息偏好', left: '具体 S', right: '抽象 N' },
  { key: 'TF', zh: '决策方式', left: '理性 T', right: '感性 F' },
  { key: 'JP', zh: '生活节律', left: '计划 J', right: '适应 P' },
]

const questions: Q[] = [
  { dim: 'EI', a: '聚会后我感觉充电满满', b: '独处后我才恢复精力', aKey: 'E', bKey: 'I' },
  { dim: 'EI', a: '我习惯先说出来再想', b: '我习惯想清楚再开口', aKey: 'E', bKey: 'I' },
  { dim: 'SN', a: '我更信任具体的事实与细节', b: '我更关注趋势与可能性', aKey: 'S', bKey: 'N' },
  { dim: 'SN', a: '我喜欢按步骤把事做实', b: '我喜欢跳跃地找新点子', aKey: 'S', bKey: 'N' },
  { dim: 'TF', a: '做决定我先看逻辑对错', b: '做决定我先看人的感受', aKey: 'T', bKey: 'F' },
  { dim: 'TF', a: '被指出错误我不太在意', b: '被指出错误我会先受触动', aKey: 'T', bKey: 'F' },
  { dim: 'JP', a: '计划定了我就想照做', b: '计划我喜欢随时调整', aKey: 'J', bKey: 'P' },
  { dim: 'JP', a: '截止前我早早完成', b: '截止前我才发力', aKey: 'J', bKey: 'P' },
]

export function PersonalityPage() {
  const [tab, setTab] = useState<'mbti' | 'shadow'>('mbti')
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b'>>({})
  const [done, setDone] = useState(false)

  const result = useMemo(() => {
    const score: Record<string, number> = {}
    questions.forEach((q, i) => {
      const pick = answers[i]
      if (!pick) return
      const key = pick === 'a' ? q.aKey : q.bKey
      score[key] = (score[key] ?? 0) + 1
    })
    const type =
      (score.E >= (score.I ?? 0) ? 'E' : 'I') +
      (score.S >= (score.N ?? 0) ? 'S' : 'N') +
      (score.T >= (score.F ?? 0) ? 'T' : 'F') +
      (score.J >= (score.P ?? 0) ? 'J' : 'P')
    return { score, type }
  }, [answers])

  const answeredAll = Object.keys(answers).length === questions.length

  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ minHeight: '46vh' }}>
        <div className="hero-bg" style={{ backgroundImage: `url(${publicAsset('/personality/moonlit-editorial-desk.jpg')})` }} aria-hidden />
        <div className="hero-inner">
          <span className="en-label" style={{ color: 'var(--hero-text)' }}>PERSONALITY ATLAS</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>不是贴标签，是看见自己的反应方式</h1>
          <p className="hero-desc">从偏好、压力反应和关系方式理解自己。MBTI 与阴影人格独立成章，不混进传统推演。</p>
        </div>
      </section>

      <div className="page">
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button className="chip" onClick={() => setTab('mbti')} style={tab === 'mbti' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}>
            MBTI 偏好 · 40 道原创题
          </button>
          <button className="chip" onClick={() => setTab('shadow')} style={tab === 'shadow' ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}>
            阴影反应 · 九维压力雷达
          </button>
        </div>

        {tab === 'mbti' ? (
          <>
            <div className="grid-cards" style={{ marginBottom: '2rem' }}>
              {dimensions.map((d) => (
                <div key={d.key} className="card">
                  <h3 style={{ fontSize: '1rem' }}>{d.zh}</h3>
                  <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>{d.left} ↔ {d.right}</p>
                </div>
              ))}
            </div>

            <div className="tool-panel">
              <p className="muted" style={{ marginTop: 0, fontSize: '0.85rem' }}>体验版 8 题。选出更像你的一项：</p>
              <div className="grid" style={{ gap: '1rem', marginTop: '1rem' }}>
                {questions.map((q, i) => (
                  <div key={i}>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{i + 1}. 更像你的是？</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {(['a', 'b'] as const).map((opt) => (
                        <button
                          key={opt}
                          className="btn btn-sm"
                          onClick={() => setAnswers((s) => ({ ...s, [i]: opt }))}
                          style={answers[i] === opt ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
                        >
                          {opt === 'a' ? q.a : q.b}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: '1.25rem' }} disabled={!answeredAll} onClick={() => setDone(true)}>
                {answeredAll ? '看我的类型' : `还需作答 ${questions.length - Object.keys(answers).length} 题`}
              </button>
            </div>

            {done && answeredAll && (
              <div style={{ marginTop: '1.5rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <span className="en-label">YOUR TYPE</span>
                  <p className="serif" style={{ fontSize: '3rem', color: 'var(--accent)', margin: '0.5rem 0' }}>{result.type}</p>
                  <p className="soft">四个维度的偏好组合（演示体验版）。</p>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <MemberLock title="完整人格报告" reading={`你的偏好类型为 ${result.type}。报告展开每个维度的强度、阴影反应与关系模式（演示假数据）。`} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="tool-panel">
            <h3>阴影反应 · 九维压力雷达</h3>
            <p className="soft" style={{ marginTop: '0.5rem' }}>
              45 道原创题，观察你在压力下的九个反应维度（如退缩、控制、讨好、爆发等），用雷达图呈现。
            </p>
            <div className="grid-cards" style={{ marginTop: '1rem' }}>
              {['退缩', '控制', '讨好', '爆发', '合理化', '回避', '苛责', '依赖', '麻木'].map((x) => (
                <div key={x} className="chip" style={{ textAlign: 'center' }}>{x}</div>
              ))}
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <MemberLock title="阴影报告" reading="阴影反应报告基于九维压力雷达与应对建议生成（演示假数据）。" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
