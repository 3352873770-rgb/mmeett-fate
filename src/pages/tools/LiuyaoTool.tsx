import { useEffect, useRef, useState } from 'react'
import { HexLines } from '@/components/HexLines'
import { MemberLock } from '@/components/MemberLock'
import { castHexagram, type CastResult } from '@/lib/liuyao'

export function LiuyaoTool() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<CastResult | null>(null)
  const [revealed, setRevealed] = useState(0)
  const [casting, setCasting] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const cast = () => {
    timers.current.forEach(clearTimeout)
    const res = castHexagram()
    setResult(res)
    setRevealed(0)
    setCasting(true)
    for (let i = 1; i <= 6; i++) {
      const id = window.setTimeout(() => {
        setRevealed(i)
        if (i === 6) setCasting(false)
      }, i * 420)
      timers.current.push(id)
    }
  }

  const shown = result ? { ...result, lines: result.lines.slice(0, revealed) } : null

  return (
    <>
      <div className="tool-panel">
        <label className="field">
          <span>所占之事</span>
          <input
            placeholder="心中默念所占之事，例如：近期工作调动是否顺利"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={cast} disabled={casting}>
            {casting ? '起卦中…' : '铜钱起卦'}
          </button>
          {/* 三枚铜钱动画 */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`coin${casting ? ' coin-spin' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>
                乾
              </span>
            ))}
          </div>
        </div>
      </div>

      {shown && result && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {/* 本卦 */}
            <div className="card" style={{ color: 'var(--accent)' }}>
              <span className="en-label" style={{ color: 'var(--text-muted)' }}>本卦</span>
              <h3 style={{ margin: '0.35rem 0 0.75rem' }}>{revealed === 6 ? result.ben.name : '起卦中…'}</h3>
              <HexLines lines={shown.lines} />
              {revealed === 6 && (
                <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.75rem' }}>
                  上{result.ben.upper.nature}下{result.ben.lower.nature} · {result.ben.upper.symbol}{result.ben.lower.symbol}
                </p>
              )}
            </div>

            {/* 变卦 */}
            {revealed === 6 && result.bian && (
              <div className="card" style={{ color: 'var(--text-soft)' }}>
                <span className="en-label" style={{ color: 'var(--text-muted)' }}>变卦</span>
                <h3 style={{ margin: '0.35rem 0 0.75rem' }}>{result.bian.name}</h3>
                <HexLines lines={result.lines.map((l) => ({ ...l, yang: l.changing ? !l.yang : l.yang, changing: false }))} />
                <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.75rem' }}>
                  {result.changingCount} 个动爻
                </p>
              </div>
            )}
          </div>

          {revealed === 6 && (
            <>
              <div className="result-box">
                <strong>所占之事：</strong>{question || '（未填写）'}
                <br />
                <strong>断辞：</strong>{result.reading}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <MemberLock
                  reading={`「${result.ben.name}」${result.bian ? `变「${result.bian.name}」` : '静卦不变'}。就「${question || '所问之事'}」而言，${result.reading} 可继续展开逐爻断与应期推演。`}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
