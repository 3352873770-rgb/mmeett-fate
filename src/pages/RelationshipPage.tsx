import { useState } from 'react'
import { MemberLock } from '@/components/MemberLock'

const relations = ['暧昧', '恋爱', '伴侣', '婚姻', '前任', '朋友', '家庭', '职场', '其他']
const scenes = ['回复变慢', '冲突之后', '计划改变', '边界问题', '冷热反复', '要不要继续', '其他场景']
const tones = ['温和确认', '直接沟通', '边界清楚']

export function RelationshipPage() {
  const [relation, setRelation] = useState(relations[0])
  const [scene, setScene] = useState(scenes[0])
  const [fact, setFact] = useState('')
  const [worry, setWorry] = useState('')
  const [tone, setTone] = useState(tones[0])
  const [result, setResult] = useState<null | { fact: string; guess: string; need: string; boundary: string }>(null)

  const organize = () => {
    setResult({
      fact: fact.trim() || '（尚未填写具体事件）',
      guess: worry.trim() ? `你担心：${worry.trim()}——这是你的推测与感受，尚待与事实分开核对。` : '（尚未填写你的担心）',
      need: `在这段「${relation}」关系的「${scene}」里，你真正想要的，或许是一个明确的回应与被看见。`,
      boundary: `以「${tone}」的语气表达：可以接受的是坦诚沟通，不愿接受的是被忽视或反复消耗。`,
    })
  }

  return (
    <div>
      <section className="hero" style={{ minHeight: '42vh' }}>
        <div className="hero-bg" style={{ backgroundImage: 'url(/relationship/relationship-mirror-morning-fast.webp)' }} aria-hidden />
        <div className="hero-inner">
          <span className="en-label" style={{ color: 'var(--hero-text)' }}>RELATIONSHIP LAB</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.4rem)' }}>关系实验室</h1>
          <p className="hero-desc">先把事实说清楚，再决定下一句话。</p>
        </div>
      </section>

      <div className="page">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>
          {/* 输入 */}
          <div className="tool-panel">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <label className="field" style={{ flex: 1, minWidth: '130px' }}>
                <span>关系类型</span>
                <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                  {relations.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="field" style={{ flex: 1, minWidth: '130px' }}>
                <span>场景</span>
                <select value={scene} onChange={(e) => setScene(e.target.value)}>
                  {scenes.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>

            <label className="field" style={{ marginTop: '0.75rem' }}>
              <span>你实际看见了什么？</span>
              <textarea rows={3} maxLength={600} value={fact} onChange={(e) => setFact(e.target.value)} placeholder="只写具体发生的行为、语言或事件，不替对方下结论。" />
            </label>
            <label className="field" style={{ marginTop: '0.75rem' }}>
              <span>我担心的是…</span>
              <textarea rows={3} maxLength={600} value={worry} onChange={(e) => setWorry(e.target.value)} placeholder="可以写下焦虑、害怕或最想确认的事，系统会把它与事实分开。" />
            </label>

            <div style={{ marginTop: '0.75rem' }}>
              <span className="field"><span>希望最后一句话是什么语气？</span></span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {tones.map((tOpt) => (
                  <button key={tOpt} className="chip" onClick={() => setTone(tOpt)} style={tone === tOpt ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}>
                    {tOpt}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: '1.25rem' }} onClick={organize}>先整理这一刻</button>
            <p className="muted" style={{ fontSize: '0.78rem', marginTop: '0.75rem' }}>
              草稿保存在当前浏览器，整理结果仅做本地演示。
            </p>
          </div>

          {/* 镜面输出 */}
          <div>
            {result ? (
              <>
                <div className="grid" style={{ gap: '0.75rem' }}>
                  {[
                    { k: '事实', v: result.fact, d: '你实际看见了什么？' },
                    { k: '推测', v: result.guess, d: '你可能在想什么？' },
                    { k: '需要', v: result.need, d: '这一刻你真正需要的是什么？' },
                    { k: '边界', v: result.boundary, d: '你愿意接受什么？不愿意接受什么？' },
                  ].map((row) => (
                    <div key={row.k} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ color: 'var(--accent)' }}>{row.k}</strong>
                        <span className="muted" style={{ fontSize: '0.78rem' }}>{row.d}</span>
                      </div>
                      <p className="soft" style={{ marginTop: '0.4rem' }}>{row.v}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <MemberLock title="深度分析" reading="深度分析包含：互动循环 · 三种回复 · 七天计划。基于你此刻整理的事实与需要生成（演示假数据）。" />
                </div>
              </>
            ) : (
              <div className="card" style={{ minHeight: '200px', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <p className="muted">填写左侧后点「先整理这一刻」，<br />这里会把事实、推测、需要和边界分开呈现。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
