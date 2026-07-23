import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HexLines } from '@/components/HexLines'
import { KnowledgeDiagram } from '@/components/KnowledgeDiagram'
import { diagrams } from '@/data/knowledge'
import { tools } from '@/data/tools'
import { dailyHexagram } from '@/lib/liuyao'
import { useLang } from '@/lib/i18n'

const hotTools = [
  {
    to: '/tools/hecan',
    ico: '☰',
    zh: '三术合参',
    en: 'Triple Reading',
    subZh: '八字 · 紫微 · 奇门互证',
    subEn: 'Bazi, Zi Wei and Qimen together',
  },
  {
    to: '/tools/bazi-hepan',
    ico: '⚭',
    zh: '八字合盘',
    en: 'Bazi Compatibility',
    subZh: '双人四柱对照合缘',
    subEn: 'Two charts for relationship reading',
  },
  {
    to: '/tools/bazi-detail',
    ico: '▤',
    zh: '八字详批',
    en: 'Bazi Detail',
    subZh: '古籍锚点逐柱参详',
    subEn: 'Classic-anchored pillar reading',
  },
  {
    to: '/tools/ziwei-hepan',
    ico: '✦',
    zh: '紫微合盘',
    en: 'Zi Wei Compatibility',
    subZh: '十二宫对映合缘',
    subEn: 'Palace mapping for two charts',
  },
  {
    to: '/tools/liuyao',
    ico: '☯',
    zh: '六爻起卦',
    en: 'Liu Yao Cast',
    subZh: '铜钱法成卦',
    subEn: 'Coin-method casting',
  },
  {
    to: '/tools/daliuren',
    ico: '☵',
    zh: '大六壬',
    en: 'Da Liu Ren',
    subZh: '月将 · 四课三传',
    subEn: 'Month general and transmissions',
  },
  {
    to: '/wiki',
    ico: '◈',
    zh: '藏经阁',
    en: 'Wiki',
    subZh: '术数词条坐标系',
    subEn: 'Term index for metaphysics',
  },
  {
    to: '/classics',
    ico: '▣',
    zh: '古籍书楼',
    en: 'Classics',
    subZh: '原典索引',
    subEn: 'Source text index',
  },
]

const gridSteps = [
  {
    ico: '◷',
    titleZh: '定时',
    titleEn: 'Time',
    bodyZh: '先校准日期、时辰、节气和地点。时间一错，盘面后面全会偏。',
    bodyEn: 'Confirm date, hour, solar term and location before reading the chart.',
  },
  {
    ico: '☯',
    titleZh: '取象',
    titleEn: 'Image',
    bodyZh: '命盘看结构，卦象看当下，牌阵看选择。先分清用哪一门，再入局。',
    bodyEn: 'Charts, hexagrams and cards answer different kinds of questions.',
  },
  {
    ico: '⚖',
    titleZh: '断事',
    titleEn: 'Judgement',
    bodyZh: '只问一件事，先判强弱和阻力，再看转机，不用空话把结果抹平。',
    bodyEn: 'Ask one thing, weigh strength and resistance first, then look for openings.',
  },
  {
    ico: '✓',
    titleZh: '复核',
    titleEn: 'Review',
    bodyZh: '用档案、历史记录和古籍规则反复校验；证据不足时直接标出边界。',
    bodyEn: 'Use profiles, history and classic rules to check evidence and limits.',
  },
]

const signs = [
  { zh: '心有所向，行则将至。', en: 'Where the heart aims, the path will open.' },
  { zh: '静水流深，缓则得渡。', en: 'Still water runs deep; patience finds the crossing.' },
  { zh: '云开月明，事有转机。', en: 'When clouds part, the moon returns — so can the situation.' },
  { zh: '守拙抱一，久则见功。', en: 'Hold to simplicity long enough, and skill appears.' },
  { zh: '风起于青萍，慎察其微。', en: 'Wind begins in the reeds — watch the smallest shift.' },
]

const WEEK_ZH = ['日', '一', '二', '三', '四', '五', '六']
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function HomePage() {
  const { t, lang } = useLang()
  const daily = useMemo(() => dailyHexagram(), [])
  const [signIdx, setSignIdx] = useState(0)
  const today = new Date()
  const dateLabel =
    lang === 'en'
      ? `${WEEK_EN[today.getDay()]}, ${today.toLocaleString('en-US', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`
      : `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 星期${WEEK_ZH[today.getDay()]}`

  return (
    <div>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/home/mmeett-fate-cloud-scroll.jpg)' }} aria-hidden />
        <div className="hero-inner">
          <span className="hero-tag">
            {t('东方命理，云海问卦', 'Eastern divination · cloud sea oracle')}
          </span>
          <h1 className="hero-title">MMEETT Fate</h1>
          <p className="hero-sub">MMEETT FATE</p>
          <p className="hero-desc">
            {t('天地之间，万事皆有迹可循。', 'Between heaven and earth, every pattern leaves a trace.')}
            <br />
            {t(
              '八字、紫微、六爻、塔罗、古籍与人格测试，一屏进入。',
              'Bazi, Zi Wei, hexagrams, tarot, classics and personality tests open in one place.',
            )}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/tools">
              {t('开始入局', 'Start reading')}
            </Link>
            <Link className="btn" to="/games/daily-lottery">
              {t('每日摇签', 'Daily draw')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-dark">
        <div className="container">
          <div className="home-split">
            <div className="home-intro">
              <span className="en-label home-dark-label">{t('云海问卦', 'MMEETT Fate')}</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                {t('一屏入局，诸术同参。', 'One field, many ways to read the pattern.')}
              </h2>
              <p className="home-dark-copy" style={{ lineHeight: 1.8 }}>
                {t(
                  '以时间、地点、所问与盘面证据为轴，把命盘、卦象、牌阵和古籍线索收束成清晰的入局路径。先定信息，再看结构，最后落到可执行的判断。',
                  'Time, place, question and chart evidence are arranged into a focused reading path. Choose the entry, then let the result speak in order.',
                )}
              </p>
              <div className="stat-row" style={{ margin: '0.5rem 0 0.5rem' }}>
                <div className="stat">
                  <b>{tools.length}</b>
                  <span>{t('工具', 'tools')}</span>
                </div>
                <div className="stat">
                  <b>48</b>
                  <span>{t('古籍', 'classics')}</span>
                </div>
                <div className="stat">
                  <b>78</b>
                  <span>{t('塔罗', 'tarot cards')}</span>
                </div>
              </div>
              <Link className="btn btn-gold" style={{ justifySelf: 'start' }} to="/tools">
                {t('进入全部工具 →', 'Open all tools')}
              </Link>
            </div>

            <div className="home-grid-2">
              {hotTools.map((it) => (
                <Link key={it.to} to={it.to} className="tool-mini">
                  <span className="tm-ico">{it.ico}</span>
                  <div>
                    <h3>{lang === 'en' ? it.en : it.zh}</h3>
                    <p>{lang === 'en' ? it.subEn : it.subZh}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-split" style={{ alignItems: 'stretch' }}>
            <div className="home-intro" style={{ alignContent: 'center' }}>
              <h2>{t('两种新的入局方式', 'TWO NEW WAYS TO BEGIN')}</h2>
              <p className="soft" style={{ lineHeight: 1.8 }}>
                {t(
                  '传统推演完整保留，自己与关系各自成章。它们是独立产品，不替代命盘、卦象、时令和实用工具；你仍然可以按原来的方式进入全部推演。',
                  'Traditional readings stay intact. Self and relationships get their own focused space. These are dedicated products, not replacements for the traditional tools already available.',
                )}
              </p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Link to="/personality" className="feature-card">
                <div className="fc-bg" style={{ backgroundImage: 'url(/personality/moonlit-editorial-desk.jpg)' }} aria-hidden />
                <span className="en-label fc-en">PERSONALITY ATLAS</span>
                <h3>{t('人格图谱', 'Personality Atlas')}</h3>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>
                  {t('免费体验', 'Free preview')}
                </span>
                <p>
                  {t(
                    '从偏好、压力反应和关系方式理解自己。MBTI 与阴影人格独立成章，不混进传统推演。',
                    'Understand preferences, stress reactions and relationship patterns through two focused self-reflection tests.',
                  )}
                </p>
                <span className="fc-link">{t('进入人格图谱 →', 'Open the atlas')}</span>
              </Link>
              <Link to="/relationship-lab" className="feature-card">
                <div
                  className="fc-bg"
                  style={{ backgroundImage: 'url(/relationship/relationship-mirror-morning-fast.webp)' }}
                  aria-hidden
                />
                <span className="en-label fc-en">RELATIONSHIP LAB</span>
                <h3>{t('关系实验室', 'Relationship Lab')}</h3>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>
                  {t('免费体验', 'Free preview')}
                </span>
                <p>
                  {t(
                    '先分清事实、猜测和需要，再决定下一句话怎么说。',
                    'Separate facts from assumptions, name the need underneath, and draft a sentence you can actually send.',
                  )}
                </p>
                <span className="fc-link">{t('进入关系实验室 →', 'Open the lab')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t('观象不是堆工具，先把问法立住。', 'Read the pattern before chasing an answer.')}</h2>
            <p>
              {t(
                '真正有用的不是一下子打开所有工具，而是先定时间、定所问、定取象，再让盘面证据自己说话。',
                'The useful part is not opening every method at once. It is choosing the right gate, checking the time, then letting evidence speak.',
              )}
            </p>
          </div>
          <div className="home-split" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="serif" style={{ fontSize: '2rem', color: 'var(--accent)' }}>
                {lang === 'en' ? '01' : '一'}
              </span>
              <h3 style={{ margin: '0.5rem 0' }}>
                {t('一事一问，一门入局，一条证据链。', 'One question, one gate, one line of evidence.')}
              </h3>
              <p className="soft" style={{ lineHeight: 1.8 }}>
                {t(
                  '问命局结构，就进命盘；问眼前取舍，就进卜筮；查日常节律，就放在实用小工具。界面要清，判断要狠，证据不够就不把话说满。',
                  'If the question is about a life structure, start with a chart. If it is about an immediate choice, use an oracle. If it is daily timing, keep it in the utility shelf. The interface should stay calm; the judgement should stay sharp.',
                )}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <Link className="btn btn-sm" to="/tools">
                  {t('去选工具', 'Choose the gate')}
                </Link>
                <Link className="btn btn-sm" to="/classics">
                  {t('看古籍书楼', 'Read the sources')}
                </Link>
              </div>
            </div>
            <div className="home-grid-2">
              {gridSteps.map((s) => (
                <div key={s.titleZh} className="card">
                  <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{s.ico}</span>
                  <h3 style={{ fontSize: '1rem', margin: '0.35rem 0' }}>
                    {lang === 'en' ? s.titleEn : s.titleZh}
                  </h3>
                  <p className="soft" style={{ fontSize: '0.84rem' }}>
                    {lang === 'en' ? s.bodyEn : s.bodyZh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-split" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
              <span className="en-label">DAILY HEXAGRAM</span>
              <h2 style={{ margin: 0 }}>{t('每日一卦', 'Daily Hexagram')}</h2>
              <p className="soft">
                {t(
                  '每天生成一张固定卦象，把当天的行动重点先提出来。点进工具后可按姓名、性别和日期重新查看。',
                  'A fixed daily hexagram highlights the day’s action focus. Open the tool to regenerate it with your own name, gender and date.',
                )}
              </p>
              <Link className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} to="/tools/daily-hexagram">
                {t('打开今日卦 →', 'Open Today’s Hexagram')}
              </Link>
            </div>
            <div className="card home-daily-row">
              <div>
                <p className="muted" style={{ fontSize: '0.85rem' }}>
                  {dateLabel} · {t('每日一卦', 'Daily Hexagram')}
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  {t('本卦', 'Original Hexagram')}：
                  <strong>{daily.ben.name}</strong>
                  （{t('上', 'upper')}
                  {lang === 'en' ? daily.ben.upper.nameEn : daily.ben.upper.name}
                  {t('下', 'lower')}
                  {lang === 'en' ? daily.ben.lower.nameEn : daily.ben.lower.name}）
                </p>
                {daily.bian ? (
                  <p style={{ marginTop: '0.25rem' }}>
                    {t('变卦', 'Changed Hexagram')}：
                    <strong>{daily.bian.name}</strong>
                    （{t('上', 'upper')}
                    {lang === 'en' ? daily.bian.upper.nameEn : daily.bian.upper.name}
                    {t('下', 'lower')}
                    {lang === 'en' ? daily.bian.lower.nameEn : daily.bian.lower.name}）
                  </p>
                ) : null}
                <p style={{ marginTop: '0.5rem' }}>
                  {t('今日提醒', 'Daily Note')}：
                  <strong style={{ color: 'var(--accent)' }}>
                    {lang === 'en' ? daily.keywordEn : daily.keyword}
                  </strong>
                </p>
              </div>
              <div style={{ color: 'var(--accent)' }}>
                <HexLines lines={daily.lines} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div className="section-head" style={{ margin: 0 }}>
              <h2>{t('先看懂关系，再看结果', 'Understand the structure before the result')}</h2>
              <p>
                {t(
                  '把五行、九宫、八字判断顺序拆成节点图，减少术语堆砌，让新用户也能快速理解页面结果。',
                  'Relationship diagrams break down five elements, nine palaces and chart-reading order into visible nodes.',
                )}
              </p>
            </div>
            <Link className="btn btn-sm" to="/knowledge">
              {t('全部图解 →', 'All Diagrams')}
            </Link>
          </div>
          <div className="grid home-diagram-grid">
            {diagrams.slice(0, 6).map((d) => (
              <div key={d.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '1rem' }}>{lang === 'en' ? d.en : d.zh}</h3>
                  {lang === 'zh' ? <span className="en-label">{d.en}</span> : null}
                </div>
                <div style={{ display: 'grid', placeItems: 'center', minHeight: 120, margin: '0.75rem 0' }}>
                  <KnowledgeDiagram d={d} compact />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <span className="en-label">TIME ORACLE</span>
            <p className="serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', margin: '1rem 0' }}>
              {lang === 'en' ? signs[signIdx].en : signs[signIdx].zh}
            </p>
            <button type="button" className="btn" onClick={() => setSignIdx((i) => (i + 1) % signs.length)}>
              {t('换一句', 'Another line')}
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="home-split">
            <div className="card" style={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
              <div className="taiji" aria-hidden />
            </div>
            <div>
              <span className="en-label">ABOUT</span>
              <h2 style={{ margin: '0.5rem 0 1rem' }}>
                {t('以现代设计重新呈现传统文化', 'Present tradition through modern design')}
              </h2>
              <p className="soft" style={{ lineHeight: 1.9 }}>
                {t(
                  '我们把复杂的传统术数界面整理为清晰、可扫描的现代工具。排盘与解释分开：先呈现可核对的盘面，再给出解读。所有结果仅供传统文化体验与自我观察参考，不替代专业建议，也不制造焦虑。',
                  'We reshape dense traditional interfaces into clear, scannable tools. Charts come first, then interpretation. Everything is for cultural experience and self-observation — not professional advice, and not anxiety.',
                )}
              </p>
              <Link className="btn" style={{ marginTop: '1.5rem' }} to="/about">
                {t('了解更多 →', 'Learn more →')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
