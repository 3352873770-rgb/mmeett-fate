import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HexLines } from '@/components/HexLines'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import { diagrams } from '@/data/knowledge'
import { tools } from '@/data/tools'
import { dailyHexagram } from '@/lib/liuyao'
import { useLang } from '@/lib/i18n'

const hotTools = [
  { to: '/tools/hecan', ico: '☰', zh: '三术合参', sub: '八字 · 紫微 · 奇门互证' },
  { to: '/tools/bazi-hepan', ico: '⚭', zh: '八字合盘', sub: '双人四柱对照合缘' },
  { to: '/tools/bazi-detail', ico: '▤', zh: '八字详批', sub: '古籍锚点逐柱参详' },
  { to: '/tools/ziwei-hepan', ico: '✦', zh: '紫微合盘', sub: '十二宫对映合缘' },
  { to: '/tools/liuyao', ico: '☯', zh: '六爻起卦', sub: '铜钱法成卦' },
  { to: '/tools/daliuren', ico: '☵', zh: '大六壬', sub: '月将 · 四课三传' },
  { to: '/wiki', ico: '卷', zh: '藏经阁', sub: '术数词条坐标系' },
  { to: '/classics', ico: '典', zh: '古籍书楼', sub: '原典索引' },
]

const gridSteps = [
  { ico: '◷', title: '定时', body: '先校准日期、时辰、节气和地点。时间一错，盘面后面全会偏。' },
  { ico: '☯', title: '取象', body: '命盘看结构，卦象看当下，牌阵看选择。先分清用哪一门，再入局。' },
  { ico: '⚖', title: '断事', body: '只问一件事，先判强弱和阻力，再看转机，不用空话把结果抹平。' },
  { ico: '✓', title: '复核', body: '用档案、历史记录和古籍规则反复校验；证据不足时直接标出边界。' },
]

const signs = ['心有所向，行则将至。', '静水流深，缓则得渡。', '云开月明，事有转机。', '守拙抱一，久则见功。', '风起于青萍，慎察其微。']

export function HomePage() {
  const { t } = useLang()
  const daily = useMemo(() => dailyHexagram(), [])
  const [signIdx, setSignIdx] = useState(0)
  const today = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六'][today.getDay()]
  const dateLabel = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 星期${week}`

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/home/suanleme-cloud-scroll.jpg)' }} aria-hidden />
        <div className="hero-inner">
          <span className="hero-tag">{t('东方命理，云海问卦', 'Eastern metaphysics in the clouds')}</span>
          <h1 className="hero-title">算了么</h1>
          <p className="hero-sub">SUAN LE ME</p>
          <p className="hero-desc">
            {t('天地之间，万事皆有迹可循。', 'Between heaven and earth, all things leave traces.')}
            <br />
            {t('八字、紫微、六爻、塔罗、古籍与人格测试，一屏进入。', 'BaZi, Zi Wei, Liu Yao, Tarot, classics and personality — all in one place.')}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/tools">{t('开始入局', 'Get started')}</Link>
            <Link className="btn" to="/games/daily-lottery">{t('每日摇签', 'Daily draw')}</Link>
          </div>
        </div>
      </section>

      {/* 深色区：统计 + 热门工具 左右分栏 */}
      <section className="section home-dark">
        <div className="container">
          <div className="home-split">
            <div className="home-intro">
              <span className="en-label" style={{ color: 'rgba(255,250,234,0.55)' }}>云海问卦</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>一屏入局，诸术同参。</h2>
              <p style={{ color: 'rgba(255,250,234,0.72)', lineHeight: 1.8 }}>
                以时间、地点、所问与盘面证据为轴，把命盘、卦象、牌阵和古籍线索收束成清晰的入局路径。先定信息，再看结构，最后落到可执行的判断。
              </p>
              <div className="stat-row" style={{ margin: '0.5rem 0 0.5rem' }}>
                <div className="stat"><b>{tools.length}</b><span>工具</span></div>
                <div className="stat"><b>48</b><span>古籍</span></div>
                <div className="stat"><b>78</b><span>塔罗</span></div>
              </div>
              <Link className="btn btn-gold" style={{ justifySelf: 'start' }} to="/tools">进入全部工具 →</Link>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {hotTools.map((it) => (
                <Link key={it.to} to={it.to} className="tool-mini">
                  <span className="tm-ico">{it.ico}</span>
                  <div>
                    <h3>{it.zh}</h3>
                    <p>{it.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 两种新入局：左文右图卡 */}
      <section className="section">
        <div className="container">
          <div className="home-split" style={{ alignItems: 'stretch' }}>
            <div className="home-intro" style={{ alignContent: 'center' }}>
              <h2>两种新的入局方式</h2>
              <p className="soft" style={{ lineHeight: 1.8 }}>
                传统推演完整保留，自己与关系各自成章。它们是独立产品，不替代命盘、卦象、时令和实用工具；你仍然可以按原来的方式进入全部推演。
              </p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Link to="/personality" className="feature-card">
                <div className="fc-bg" style={{ backgroundImage: 'url(/personality/moonlit-editorial-desk.jpg)' }} aria-hidden />
                <span className="en-label" style={{ color: 'rgba(255,250,234,0.7)' }}>PERSONALITY ATLAS</span>
                <h3>人格图谱</h3>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>免费体验</span>
                <p>从偏好、压力反应和关系方式理解自己。MBTI 与阴影人格独立成章，不混进传统推演。</p>
                <span style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: '#cbb380' }}>进入人格图谱 →</span>
              </Link>
              <Link to="/relationship-lab" className="feature-card">
                <div className="fc-bg" style={{ backgroundImage: 'url(/relationship/relationship-mirror-morning-fast.webp)' }} aria-hidden />
                <span className="en-label" style={{ color: 'rgba(255,250,234,0.7)' }}>RELATIONSHIP LAB</span>
                <h3>关系实验室</h3>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>免费体验</span>
                <p>先分清事实、猜测和需要，再决定下一句话怎么说。</p>
                <span style={{ marginTop: '0.35rem', fontSize: '0.85rem', color: '#cbb380' }}>进入关系实验室 →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 使用指南：左大卡 + 右 2×2 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>观象不是堆工具，先把问法立住。</h2>
            <p>真正有用的不是一下子打开所有工具，而是先定时间、定所问、定取象，再让盘面证据自己说话。</p>
          </div>
          <div className="home-split" style={{ alignItems: 'stretch', gridTemplateColumns: 'minmax(260px, 1fr) 1fr' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="serif" style={{ fontSize: '2rem', color: 'var(--accent)' }}>一</span>
              <h3 style={{ margin: '0.5rem 0' }}>一事一问，一门入局，一条证据链。</h3>
              <p className="soft" style={{ lineHeight: 1.8 }}>
                问命局结构，就进命盘；问眼前取舍，就进卜筮；查日常节律，就放在实用小工具。界面要清，判断要狠，证据不够就不把话说满。
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <Link className="btn btn-sm" to="/tools">去选工具</Link>
                <Link className="btn btn-sm" to="/classics">看古籍书楼</Link>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {gridSteps.map((s) => (
                <div key={s.title} className="card">
                  <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{s.ico}</span>
                  <h3 style={{ fontSize: '1rem', margin: '0.35rem 0' }}>{s.title}</h3>
                  <p className="soft" style={{ fontSize: '0.84rem' }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 每日一卦：左卦象 + 右信息 */}
      <section className="section">
        <div className="container">
          <div className="home-split" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
              <span className="en-label">DAILY HEXAGRAM</span>
              <h2 style={{ margin: 0 }}>每日一卦</h2>
              <p className="soft">每天生成一张固定卦象，把当天的行动重点先提出来。点进工具后可按姓名、性别和日期重新查看。</p>
              <Link className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} to="/tools/daily-hexagram">打开今日卦 →</Link>
            </div>
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p className="muted" style={{ fontSize: '0.85rem' }}>{dateLabel} · 每日一卦</p>
                <p style={{ marginTop: '0.75rem' }}>本卦：<strong>{daily.ben.name}</strong>（上{daily.ben.upper.name}下{daily.ben.lower.name}）</p>
                {daily.bian && <p style={{ marginTop: '0.25rem' }}>变卦：<strong>{daily.bian.name}</strong>（上{daily.bian.upper.name}下{daily.bian.lower.name}）</p>}
                <p style={{ marginTop: '0.5rem' }}>今日提醒：<strong style={{ color: 'var(--accent)' }}>{daily.reading}</strong></p>
              </div>
              <div style={{ color: 'var(--accent)' }}><HexLines lines={daily.lines} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 知识图解：3 列带迷你图 */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="section-head" style={{ margin: 0 }}>
              <h2>先看懂关系，再看结果</h2>
              <p>把五行、九宫、八字判断顺序拆成节点图，减少术语堆砌，让新用户也能快速理解页面结果。</p>
            </div>
            <Link className="btn btn-sm" to="/knowledge">全部图解 →</Link>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {diagrams.slice(0, 6).map((d) => (
              <div key={d.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '1rem' }}>{d.zh}</h3>
                  <span className="en-label">{d.en}</span>
                </div>
                <div style={{ display: 'grid', placeItems: 'center', minHeight: 120, margin: '0.75rem 0' }}>
                  <KnowledgeDiagram d={d} compact />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 时间签文 */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <span className="en-label">TIME ORACLE</span>
            <p className="serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', margin: '1rem 0' }}>{signs[signIdx]}</p>
            <button className="btn" onClick={() => setSignIdx((i) => (i + 1) % signs.length)}>换一句</button>
          </div>
        </div>
      </section>

      {/* 关于：左太极 + 右文字 */}
      <section className="section">
        <div className="container">
          <div className="home-split" style={{ gridTemplateColumns: 'minmax(220px, 320px) 1fr' }}>
            <div className="card" style={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
              <div className="taiji" aria-hidden />
            </div>
            <div>
              <span className="en-label">ABOUT</span>
              <h2 style={{ margin: '0.5rem 0 1rem' }}>以现代设计重新呈现传统文化</h2>
              <p className="soft" style={{ lineHeight: 1.9 }}>
                我们把复杂的传统术数界面整理为清晰、可扫描的现代工具。排盘与解释分开：先呈现可核对的盘面，再给出解读。
                所有结果仅供传统文化体验与自我观察参考，不替代专业建议，也不制造焦虑。
              </p>
              <Link className="btn" style={{ marginTop: '1.5rem' }} to="/about">了解更多 →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
