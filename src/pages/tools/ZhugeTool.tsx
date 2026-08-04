import { useState } from 'react'
import { MemberLock } from '@/components/MemberLock'
import { castZhuge, type ZhugeSign } from '@/data/zhuge'

export function ZhugeTool() {
  const [chars, setChars] = useState('')
  const [question, setQuestion] = useState('')
  const [sign, setSign] = useState<ZhugeSign | null>(null)

  const cast = () => setSign(castZhuge(chars))

  return (
    <>
      <div className="tool-panel">
        <label className="field">
          <span>所问一事</span>
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="一事一问，例如：此次合作能否成" />
        </label>
        <label className="field" style={{ marginTop: '0.75rem' }}>
          <span>默念三字</span>
          <input value={chars} onChange={(e) => setChars(e.target.value)} placeholder="随心写下三个汉字" maxLength={6} />
        </label>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={cast}>起数得签</button>
      </div>

      {sign && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <span className="en-label">第 {sign.number} 签</span>
            <p className="serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', margin: '1rem 0', color: 'var(--accent)' }}>
              {sign.verse}
            </p>
            <p className="soft">{sign.note}</p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <MemberLock reading={`第 ${sign.number} 签：${sign.verse}就「${question || '所问之事'}」，${sign.note} 可继续展开逐句解签与应期。`} />
          </div>
        </div>
      )}
    </>
  )
}
