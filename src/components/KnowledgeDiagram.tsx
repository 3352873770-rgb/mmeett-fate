import type { Diagram } from '@/data/knowledge'
import { nodeHint, nodeLabel } from '@/data/knowledge'
import { EL_COLOR, type Element } from '@/lib/bazi'
import { useLang } from '@/lib/i18n'

/** 知识图解可视化：compact 用于首页卡片，full 用于图解页 */
export function KnowledgeDiagram({ d, compact = false }: { d: Diagram; compact?: boolean }) {
  const { lang } = useLang()
  const title = lang === 'en' ? d.en : d.zh

  if (d.kind === 'grid' && d.cells) {
    return (
      <div className={`kd-grid${compact ? ' kd-compact' : ''}`} role="img" aria-label={title}>
        {d.cells.map((c) => (
          <div key={c.id} className="kd-cell">
            <strong>{nodeLabel(c, lang)}</strong>
            <span>{nodeHint(c, lang)}</span>
          </div>
        ))}
      </div>
    )
  }

  if (d.kind === 'cycle') {
    const n = d.nodes.length
    const size = compact ? 160 : 280
    const cx = size / 2
    const cy = size / 2
    const r = compact ? 52 : 96
    const pts = d.nodes.map((node, i) => {
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2
      return { ...node, x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) }
    })
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }} role="img" aria-label={title}>
        {pts.map((p, i) => {
          const next = pts[(i + 1) % pts.length]
          return (
            <line
              key={`l${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="var(--border-strong)"
              strokeWidth={compact ? 1.2 : 1.6}
              strokeDasharray={compact ? undefined : '4 3'}
            />
          )
        })}
        {pts.map((p) => {
          const color = EL_COLOR[p.id as Element] ?? 'var(--accent)'
          const label = nodeLabel(p, lang)
          return (
            <g key={p.id}>
              <circle cx={p.x} cy={p.y} r={compact ? 16 : 28} fill="var(--surface)" stroke={color} strokeWidth="1.6" />
              <text
                x={p.x}
                y={p.y + (compact ? 4 : 5)}
                textAnchor="middle"
                fill={color}
                fontSize={compact ? (lang === 'en' ? 10 : 13) : lang === 'en' ? 12 : 18}
                fontFamily="var(--font-serif)"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  if (d.kind === 'season') {
    return (
      <div className={`kd-season${compact ? ' kd-compact' : ''}`} role="img" aria-label={title}>
        {d.nodes.map((n) => (
          <div key={n.id} className="kd-season-item">
            <strong className="serif">{nodeLabel(n, lang)}</strong>
            {!compact && <span>{nodeHint(n, lang)}</span>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`kd-flow${compact ? ' kd-compact' : ''}`} role="img" aria-label={title}>
      {d.nodes.map((n, i) => (
        <div key={n.id} className="kd-flow-item">
          <div className="kd-node">
            <strong>{nodeLabel(n, lang)}</strong>
            {!compact && <span>{nodeHint(n, lang)}</span>}
          </div>
          {i < d.nodes.length - 1 && (
            <span className="kd-arrow" aria-hidden>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
