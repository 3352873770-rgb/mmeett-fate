import type { Diagram } from '@/data/knowledge'
import { EL_COLOR, type Element } from '@/lib/bazi'

/** 知识图解可视化：compact 用于首页卡片，full 用于图解页 */
export function KnowledgeDiagram({ d, compact = false }: { d: Diagram; compact?: boolean }) {
  if (d.kind === 'grid' && d.cells) {
    return (
      <div className={`kd-grid${compact ? ' kd-compact' : ''}`} role="img" aria-label={d.zh}>
        {d.cells.map((c) => (
          <div key={c.name} className="kd-cell">
            <strong>{c.name}</strong>
            <span>{c.hint}</span>
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
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size }} role="img" aria-label={d.zh}>
        {pts.map((p, i) => {
          const next = pts[(i + 1) % pts.length]
          return (
            <line
              key={`l${i}`}
              x1={p.x} y1={p.y} x2={next.x} y2={next.y}
              stroke="var(--border-strong)" strokeWidth={compact ? 1.2 : 1.6}
              strokeDasharray={compact ? undefined : '4 3'}
            />
          )
        })}
        {pts.map((p) => {
          const color = EL_COLOR[p.name as Element] ?? 'var(--accent)'
          return (
            <g key={p.name}>
              <circle cx={p.x} cy={p.y} r={compact ? 16 : 28} fill="var(--surface)" stroke={color} strokeWidth="1.6" />
              <text
                x={p.x} y={p.y + (compact ? 4 : 5)}
                textAnchor="middle"
                fill={color}
                fontSize={compact ? 13 : 18}
                fontFamily="var(--font-serif)"
              >
                {p.name}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  if (d.kind === 'season') {
    return (
      <div className={`kd-season${compact ? ' kd-compact' : ''}`} role="img" aria-label={d.zh}>
        {d.nodes.map((n) => (
          <div key={n.name} className="kd-season-item">
            <strong className="serif">{n.name}</strong>
            {!compact && <span>{n.hint}</span>}
          </div>
        ))}
      </div>
    )
  }

  // flow
  return (
    <div className={`kd-flow${compact ? ' kd-compact' : ''}`} role="img" aria-label={d.zh}>
      {d.nodes.map((n, i) => (
        <div key={n.name} className="kd-flow-item">
          <div className="kd-node">
            <strong>{n.name}</strong>
            {!compact && <span>{n.hint}</span>}
          </div>
          {i < d.nodes.length - 1 && <span className="kd-arrow" aria-hidden>→</span>}
        </div>
      ))}
    </div>
  )
}
