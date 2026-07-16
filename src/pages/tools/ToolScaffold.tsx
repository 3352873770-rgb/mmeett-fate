import { useState } from 'react'
import { MemberLock } from '@/components/MemberLock'
import type { Tool } from '@/data/tools'

// 通用断语池（演示），按输入 hash 确定性选取
const VERDICTS = [
  '结构清晰，主线明确，宜顺势推进，不必反复试探。',
  '眼下有阻，但阻在表层，把关键一步走扎实即可化解。',
  '时机未全，宜先备而后动，等一个明确的信号再落子。',
  '内外不一，先把信息核对清楚，再决定要不要开口。',
  '看似平静，实则暗流，留意被忽略的细节与旁人态度。',
  '转机在近处，抓住一个可执行的小切口，事情会松动。',
]

function hashStr(s: string): number {
  let h = 0
  for (const ch of s) h = (h * 31 + ch.codePointAt(0)!) % 1_000_000
  return h
}

export function ToolScaffold({ tool }: { tool: Tool }) {
  const fields = tool.prep && tool.prep.length ? tool.prep : ['所问事项']
  const [values, setValues] = useState<Record<number, string>>({})
  const [verdict, setVerdict] = useState<string | null>(null)

  const run = () => {
    const joined = Object.values(values).join('|') + tool.id
    setVerdict(VERDICTS[hashStr(joined) % VERDICTS.length])
  }

  return (
    <>
      <div className="tool-panel">
        <div className="grid" style={{ gap: '0.75rem' }}>
          {fields.map((f, i) => (
            <label key={i} className="field">
              <span>{f}</span>
              <input
                value={values[i] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [i]: e.target.value }))}
                placeholder={`请输入${f}`}
              />
            </label>
          ))}
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={run}>生成盘面</button>
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.75rem' }}>
          {tool.zh}盘面由确定性算法生成（演示假数据），相同输入结果一致。
        </p>
      </div>

      {verdict && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="card">
            <span className="en-label">{tool.en}</span>
            <h3 style={{ margin: '0.35rem 0 0.75rem' }}>{tool.zh} · 盘面速览</h3>
            <p className="soft">{verdict}</p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <MemberLock reading={`就「${Object.values(values).filter(Boolean).join('、') || '所问之事'}」，${verdict} 可继续展开${tool.zh}的完整推演与逐条依据。`} />
          </div>
        </div>
      )}
    </>
  )
}
