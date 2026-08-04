import { useState } from 'react'
import { BirthChartForm, type BirthData } from '@/components/BirthChartForm'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import { MemberLock } from '@/components/MemberLock'
import { diagrams } from '@/data/knowledge'
import { baziFromBirth, ELEMENTS, type BaziChart, type Element } from '@/lib/bazi'
import { ziweiFromBirth, type ZiweiChart } from '@/lib/ziwei'

const EL_COLOR: Record<Element, string> = {
  木: '#4f9d6b', 火: '#d0604f', 土: '#c1913f', 金: '#c9a94f', 水: '#4f7fb0',
}

// 十二宫在 4×4 盘面的边格位置（顺时针）
const POS: [number, number][] = [
  [1, 1], [1, 2], [1, 3], [1, 4], [2, 4], [3, 4],
  [4, 4], [4, 3], [4, 2], [4, 1], [3, 1], [2, 1],
]

const JIEQI = ['小暑·中元', '大暑·上元', '立秋·中元', '处暑·下元', '白露·上元']
const JUFA = ['阳遁2局', '阴遁2局', '阳遁5局', '阴遁8局']
const ZHIFU = ['天蓬·休门', '天芮·死门', '天冲·伤门', '天辅·杜门']

type Result = {
  data: BirthData
  bazi: BaziChart
  ziwei: ZiweiChart
  meta: { jieqi: string; jufa: string; zhifu: string }
}

export function HecanTool() {
  const [result, setResult] = useState<Result | null>(null)
  const [lifeTab, setLifeTab] = useState<'bazi' | 'ziwei'>('bazi')
  const [boardTab, setBoardTab] = useState('本命')

  const generate = (data: BirthData) => {
    const bazi = baziFromBirth(data.dateStr, data.hour)
    const ziwei = ziweiFromBirth(data.dateStr, data.hour)
    const seed = data.dateStr.split('-').reduce((a, b) => a + Number(b), 0) + data.hour
    setResult({
      data,
      bazi,
      ziwei,
      meta: { jieqi: JIEQI[seed % JIEQI.length], jufa: JUFA[seed % JUFA.length], zhifu: ZHIFU[seed % ZHIFU.length] },
    })
  }

  if (!result) {
    return (
      <>
        <div className="method-pills" style={{ marginBottom: '1.5rem' }}>
          {['八字', '紫微', '奇门'].map((m) => (
            <span key={m} className="chip">{m}</span>
          ))}
        </div>
        <BirthChartForm onSubmit={generate} />
      </>
    )
  }

  const { bazi, ziwei, data, meta } = result
  const total = ELEMENTS.reduce((a, e) => a + bazi.counts[e], 0) || 1
  const strong = ELEMENTS.reduce((a, b) => (bazi.counts[b] > bazi.counts[a] ? b : a))
  const weak = ELEMENTS.reduce((a, b) => (bazi.counts[b] < bazi.counts[a] ? b : a))
  const wuxingDiagram = diagrams.find((d) => d.id === 'wuxing-cycle')!
  const year = new Date(data.dateStr).getFullYear()

  return (
    <div>
      {/* 结果头 */}
      <div className="tool-panel">
        <div className="form-head" style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="badge badge-ghost">命盘</span>
            <span className="badge badge-ghost">三术合参</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-sm" onClick={() => window.print()}>⬇ 保存长图</button>
            <button className="btn btn-sm" onClick={() => setResult(null)}>调整输入</button>
            <button className="btn btn-sm btn-primary" onClick={() => generate(data)}>重新生成</button>
          </div>
        </div>
        <span className="en-label">✧ 专业基础结果</span>
        <h2 style={{ margin: '0.35rem 0 0.5rem' }}>{data.name || '未署名'}的三术合参</h2>
        <p className="soft" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
          以同一组真太阳时：八字看结构与运势，紫微看宫位与人生主题，奇门命盘看年命、日干、时干落宫与行动出口。
        </p>
        <div className="method-pills" style={{ marginTop: '0.75rem' }}>
          {['八字', '紫微', '奇门', '合参'].map((m) => (
            <span key={m} className="chip">{m}</span>
          ))}
        </div>
      </div>

      {/* 岁运轨迹 */}
      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <span className="en-label">人生 · K 线　{year}–{year + 4}</span>
        <h3 style={{ margin: '0.35rem 0 0.75rem' }}>岁运轨迹</h3>
        <p className="soft" style={{ fontSize: '0.88rem' }}>把大运、流年与宫位信号在同一条时间轴上，点选年份查看当年运测依据。</p>
        <div className="seg-inline" style={{ margin: '1rem 0' }}>
          <button className={lifeTab === 'bazi' ? 'active' : ''} onClick={() => setLifeTab('bazi')}>八字大运</button>
          <button className={lifeTab === 'ziwei' ? 'active' : ''} onClick={() => setLifeTab('ziwei')}>紫微运限</button>
        </div>
        <div className="subpanel">
          {lifeTab === 'bazi' ? (
            <p className="soft" style={{ fontSize: '0.86rem' }}>
              八字大运：以日主{bazi.dayMaster}（{bazi.dayMasterEl}）为轴，结构标签区间 20–80。{bazi.summary}
            </p>
          ) : (
            <p className="soft" style={{ fontSize: '0.86rem' }}>
              紫微运限：命宫在{ziwei.palaces[0].branch}，大限与年度信号沿十二宫流转，年干{ziwei.yearStem}引动四化。
            </p>
          )}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <MemberLock title="完整岁运轨迹" reading="逐年信号、年度重点与大限范围（演示）：近三年宜稳健推进主线事务，留意换局年前后的节奏差。" />
        </div>
      </div>

      {/* 紫微十二宫盘 */}
      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="en-label">ZI WEI BOARD</span>
          <span className="badge badge-ghost">{boardTab}</span>
        </div>
        <h3 style={{ margin: '0.35rem 0 0.75rem' }}>紫微十二宫盘</h3>
        <div className="seg-inline" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
          {['本命', '大限', '小限', '流年', '流月', '流日', '流时'].map((t) => (
            <button key={t} className={boardTab === t ? 'active' : ''} onClick={() => setBoardTab(t)}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, minmax(78px, auto))', gap: '0.5rem' }}>
          {ziwei.palaces.map((p, i) => (
            <div
              key={i}
              className="card ziwei-cell"
              style={{ gridRow: POS[i][0], gridColumn: POS[i][1], padding: '0.5rem 0.6rem', ...(i === 0 ? { borderColor: 'var(--accent)' } : {}) }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '0.82rem', color: i === 0 ? 'var(--accent)' : undefined }}>{p.name}</strong>
                <span className="muted serif" style={{ fontSize: '0.78rem' }}>{p.branch}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.3rem' }}>
                {p.stars.map((s) => (
                  <span key={s} style={{ fontSize: '0.68rem', color: 'var(--accent)' }}>{s}</span>
                ))}
                {p.stars.length === 0 && <span className="muted" style={{ fontSize: '0.68rem' }}>—</span>}
              </div>
              {p.sihua.map((h) => (
                <span key={h} className="badge" style={{ fontSize: '0.6rem', marginTop: '0.2rem', marginRight: '0.2rem' }}>{h}</span>
              ))}
            </div>
          ))}
          {/* 中央命盘 */}
          <div className="card" style={{ gridRow: '2 / 4', gridColumn: '2 / 4', display: 'grid', placeItems: 'center', textAlign: 'center', background: 'var(--surface-strong)' }}>
            <div>
              <div className="serif" style={{ fontSize: '1.3rem' }}>紫微斗数</div>
              <p className="muted" style={{ fontSize: '0.75rem', margin: '0.35rem 0 0' }}>十二宫 · 四化 · 运限</p>
              <p className="soft" style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}>命宫在{ziwei.palaces[0].branch}</p>
            </div>
          </div>
        </div>

        {/* 排盘信息 */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem', marginTop: '1rem' }}>
          <div className="subpanel" style={{ marginTop: 0 }}><span className="form-lbl">排盘类型</span><strong>命盘</strong></div>
          <div className="subpanel" style={{ marginTop: 0 }}><span className="form-lbl">节气三元</span><strong>{meta.jieqi}</strong></div>
          <div className="subpanel" style={{ marginTop: 0 }}><span className="form-lbl">局法</span><strong>{meta.jufa}</strong></div>
          <div className="subpanel" style={{ marginTop: 0 }}><span className="form-lbl">值符值使</span><strong>{meta.zhifu}</strong></div>
        </div>
      </div>

      {/* 五行流转 */}
      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <h3>五行流转</h3>
        <p className="soft" style={{ fontSize: '0.88rem', margin: '0.35rem 0 1rem' }}>最旺<strong style={{ color: EL_COLOR[strong] }}>{strong}</strong> · 最弱<strong style={{ color: EL_COLOR[weak] }}>{weak}</strong>。按段流通与制化，先看流通和制化，不把数量多寡直接当作喜忌。</p>
        <div className="home-split" style={{ gridTemplateColumns: '220px 1fr', alignItems: 'center' }}>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <KnowledgeDiagram d={wuxingDiagram} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.6rem' }}>
            {ELEMENTS.map((e) => (
              <div key={e} className="subpanel" style={{ marginTop: 0, textAlign: 'center' }}>
                <div className="serif" style={{ fontSize: '1.4rem', color: EL_COLOR[e] }}>{e}</div>
                <div className="muted" style={{ fontSize: '0.78rem' }}>{Math.round((bazi.counts[e] / total) * 100)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 全能解读 */}
      <div className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>三术合参全能解读</h3>
        <MemberLock reading={`结合基础盘面，就「${data.question || '所问之事'}」给出一次完整回答：三术在“主动推进”上大体一致，分歧在节奏快慢。可继续对照各术细节做应期推演。`} />
      </div>
    </div>
  )
}
