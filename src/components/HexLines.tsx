import type { Line } from '@/lib/liuyao'

/** 渲染六爻爻象：自上而上（数组 0=初爻在最下） */
export function HexLines({ lines, size = 'md' }: { lines: Line[]; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 8 : 12
  const w = size === 'sm' ? 88 : 120
  return (
    <div className="hexlines" style={{ display: 'grid', gap: size === 'sm' ? 4 : 6 }}>
      {[...lines].reverse().map((l, i) => (
        <div
          key={i}
          style={{ display: 'flex', gap: 8, alignItems: 'center', height: h }}
          title={l.changing ? '变爻' : undefined}
        >
          <div style={{ display: 'flex', gap: w * 0.12, width: w }}>
            {l.yang ? (
              <span style={{ flex: 1, background: 'currentColor', height: h, borderRadius: 2 }} />
            ) : (
              <>
                <span style={{ flex: 1, background: 'currentColor', height: h, borderRadius: 2 }} />
                <span style={{ flex: 1, background: 'currentColor', height: h, borderRadius: 2 }} />
              </>
            )}
          </div>
          {l.changing && (
            <span style={{ fontSize: 12, opacity: 0.7 }}>{l.value === 9 ? '○' : '×'}</span>
          )}
        </div>
      ))}
    </div>
  )
}
