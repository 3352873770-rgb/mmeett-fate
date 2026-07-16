import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { categoryLabels, type Tool } from '@/data/tools'
import { useFavorites } from '@/lib/favorites'

/** 工具页统一外壳：面包屑 + 标题 + 门类 + 准备提示 */
export function ToolShell({ tool, children }: { tool: Tool; children: ReactNode }) {
  const { has, toggle } = useFavorites()
  const isBazi = tool.id === 'bazi'

  return (
    <div className={`page tool-detail${isBazi ? ' tool-detail-bazi' : ''}`}>
      <div className="tool-detail-head">
        {!isBazi && (
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', marginBottom: '0.85rem' }} className="muted">
            <Link to="/tools">推演</Link>
            <span>/</span>
            <span>{categoryLabels[tool.category].zh}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ maxWidth: '42rem' }}>
            <div className="method-pills" style={{ marginBottom: '0.75rem' }}>
              <span className="chip">{categoryLabels[tool.category].zh}</span>
              {isBazi && <span className="chip">基础结果免费</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)', margin: 0 }}>{tool.zh}</h1>
            <p className="soft" style={{ marginTop: '0.65rem', lineHeight: 1.75 }}>
              {isBazi
                ? '按节气分界生成四柱、藏干、十神、纳音与五行分布，基础排盘在浏览器本地完成。'
                : `${tool.subtitle}。${descFor(tool)}`}
            </p>
          </div>
          <button
            className="icon-btn"
            onClick={() => toggle(tool.id)}
            aria-pressed={has(tool.id)}
            title={has(tool.id) ? '取消收藏' : '收藏'}
            style={{ borderRadius: '50%', width: 40, minWidth: 40 }}
          >
            {has(tool.id) ? '♥' : '♡'}
          </button>
        </div>

        {!isBazi && tool.prep && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '1.1rem 0 0' }}>
            <span className="muted" style={{ fontSize: '0.82rem', alignSelf: 'center' }}>入局准备：</span>
            {tool.prep.map((p) => (
              <span key={p} className="chip" style={{ fontSize: '0.75rem' }}>{p}</span>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: isBazi ? '1.15rem' : '1.5rem' }}>{children}</div>
    </div>
  )
}

function descFor(tool: Tool): string {
  const map: Record<string, string> = {
    hecan: '用同一组出生时间和真太阳时同时生成八字、紫微与奇门摘要，提取三套系统共同指向与分歧。',
    bazi: '按节气分界生成四柱、藏干、十神、纳音与五行分布，基础排盘在浏览器本地完成。',
    'bazi-detail': 'RAG 锚定古籍原文，按年/月/日/时柱逐段参详，句句可溯源。',
    'bazi-hepan': '双方四柱对照，按情侣/夫妻/亲子/合伙/职场/朋友维度参看合缘。',
    'ziwei-hepan': '双人十二宫对映，以命宫与关系维度观缘分深浅。',
    ziwei: '输入出生信息，按通行安星法生成十二宫、十四主星、四化与大限盘面。',
    wuxing: '从四柱推算五行旺衰与结构强弱，适合做结构体检。',
    liuyao: '铜钱法起卦，生成本卦、动爻与变卦。',
    tarot: '完整 78 张牌与多种常用牌阵。',
  }
  return map[tool.id] ?? '盘面在浏览器本地生成，相同输入结果一致。'
}
