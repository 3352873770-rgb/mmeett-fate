import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LocationPicker } from '@/components/LocationPicker'
import { MemberLock } from '@/components/MemberLock'
import type { Place } from '@/data/locations'
import { useFavorites } from '@/lib/favorites'
import {
  baziFromBirth, ELEMENTS, EL_COLOR,
  type BaziChart, type Pillar,
} from '@/lib/bazi'

const SHICHEN = [
  { name: '子时', range: '23:00-00:59' },
  { name: '丑时', range: '01:00-02:59' },
  { name: '寅时', range: '03:00-04:59' },
  { name: '卯时', range: '05:00-06:59' },
  { name: '辰时', range: '07:00-08:59' },
  { name: '巳时', range: '09:00-10:59' },
  { name: '午时', range: '11:00-12:59' },
  { name: '未时', range: '13:00-14:59' },
  { name: '申时', range: '15:00-16:59' },
  { name: '酉时', range: '17:00-18:59' },
  { name: '戌时', range: '19:00-20:59' },
  { name: '亥时', range: '21:00-22:59' },
]

const PREVIEW: { label: string; hint: string; tint: string; p: Pick<Pillar, 'stem' | 'branch' | 'stemEl'> }[] = [
  { label: '年', hint: '十神', tint: 'rgba(79, 157, 107, 0.14)', p: { stem: '甲', branch: '子', stemEl: '木' } },
  { label: '月', hint: '月令', tint: 'rgba(208, 96, 79, 0.12)', p: { stem: '乙', branch: '丑', stemEl: '木' } },
  { label: '日', hint: '日主', tint: 'rgba(193, 145, 63, 0.14)', p: { stem: '丙', branch: '寅', stemEl: '火' } },
  { label: '时', hint: '时局', tint: 'rgba(201, 169, 79, 0.16)', p: { stem: '丁', branch: '卯', stemEl: '火' } },
]

const TOGGLES = ['节气定月', '子初换日', '藏干十神', '大运流年', '神煞全表'] as const

function shichenIndex(hour: number) {
  return Math.floor(((hour + 1) % 24) / 2)
}

type Meta = {
  name: string
  gender: string
  dateStr: string
  hour: number
  minute: number
  dayRule: string
  placeLabel?: string
}

/** 独立页面（表单 + 结果） */
export function BaziTool() {
  const { has, toggle } = useFavorites()
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'男' | '女'>('男')
  const [calendar, setCalendar] = useState<'公历' | '农历' | '四柱'>('公历')
  const [year, setYear] = useState('2026')
  const [month, setMonth] = useState('07')
  const [day, setDay] = useState('15')
  const [hour, setHour] = useState(8)
  const [minute, setMinute] = useState(0)
  const [dayRule, setDayRule] = useState<'子初换日' | '晚子不换'>('子初换日')
  const [timeMode, setTimeMode] = useState<'真太阳时' | '民用时间'>('真太阳时')
  const [place, setPlace] = useState<Place | null>(null)
  const [lng, setLng] = useState('')
  const [utc, setUtc] = useState('8')
  const [error, setError] = useState<string | null>(null)
  const [chart, setChart] = useState<BaziChart | null>(null)
  const [meta, setMeta] = useState<Meta | null>(null)
  const [activeToggles, setActiveToggles] = useState<string[]>(['节气定月', '子初换日', '藏干十神'])
  const [luckTab, setLuckTab] = useState<'八字大运' | '年度摘要'>('八字大运')
  const [pickedYear, setPickedYear] = useState<number | null>(null)

  const pickPlace = (p: Place) => {
    setPlace(p)
    setLng(String(p.lng))
    setUtc(String(p.utc))
    setError(null)
  }

  const pickShichen = (idx: number) => setHour(idx === 0 ? 23 : idx * 2 - 1)

  const reset = () => {
    setName(''); setGender('男'); setCalendar('公历')
    setYear('2026'); setMonth('07'); setDay('15')
    setHour(8); setMinute(0); setDayRule('子初换日'); setTimeMode('真太阳时')
    setPlace(null); setLng(''); setUtc('8'); setError(null)
    setChart(null); setMeta(null); setPickedYear(null)
  }

  const generate = () => {
    if (!place && !lng.trim()) {
      setError('请选择出生/起局地点（城市或区县），或手动输入经度后再生成。')
      return
    }
    const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    const next = baziFromBirth(dateStr, hour)
    setError(null)
    setChart(next)
    setMeta({
      name, gender, dateStr, hour, minute, dayRule,
      placeLabel: place ? (place.kind === 'district' ? `${place.city}·${place.name}` : place.name) : undefined,
    })
    setPickedYear(next.luckYears[4]?.year ?? new Date().getFullYear())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleChip = (t: string) => {
    setActiveToggles((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  }

  if (chart && meta) {
    return (
      <BaziResult
        chart={chart}
        meta={meta}
        favorited={has('bazi')}
        onFav={() => toggle('bazi')}
        onAdjust={() => { setChart(null); setMeta(null) }}
        onRegen={generate}
        activeToggles={activeToggles}
        onToggle={toggleChip}
        luckTab={luckTab}
        setLuckTab={setLuckTab}
        pickedYear={pickedYear}
        setPickedYear={setPickedYear}
      />
    )
  }

  return (
    <div className="page tool-detail tool-detail-bazi">
      <div className="tool-detail-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ maxWidth: '42rem' }}>
            <div className="method-pills" style={{ marginBottom: '0.75rem' }}>
              <span className="chip">命盘</span>
              <span className="chip">基础结果免费</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)', margin: 0 }}>八字排盘</h1>
            <p className="soft" style={{ marginTop: '0.65rem', lineHeight: 1.75 }}>
              按节气分界生成四柱、藏干、十神、纳音与五行分布，基础排盘在浏览器本地完成。
            </p>
          </div>
          <button className="icon-btn" style={{ borderRadius: '50%', width: 40, minWidth: 40 }} onClick={() => toggle('bazi')} aria-pressed={has('bazi')}>
            {has('bazi') ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="bazi-pillar-block" style={{ marginTop: '1.15rem' }}>
        <span className="en-label bazi-pillar-caption">柱 · 年 · 月 · 日 · 时</span>
        <div className="pillar-row bazi-pillar-row">
          {PREVIEW.map((item) => (
            <div key={item.label} className="bazi-pillar" style={{ background: item.tint }}>
              <span className="bazi-pillar-lab">{item.label}</span>
              <div className="serif bazi-pillar-gz" style={{ color: EL_COLOR[item.p.stemEl] }}>{item.p.stem}{item.p.branch}</div>
              <span className="bazi-pillar-hint">{item.hint}</span>
            </div>
          ))}
        </div>
        <p className="muted bazi-pillar-foot">四柱定盘 · 校时 · 排干支 · 复核十神</p>
      </div>

      <div className="tool-panel bazi-form">
        <div className="form-sec" style={{ marginTop: 0 }}>
          <span className="form-lbl">排盘模式</span>
          <div className="seg seg-2">
            <button type="button" className="active">单人排盘</button>
            <Link to="/tools/bazi-hepan" className="seg-link">双人合盘</Link>
          </div>
        </div>

        <div className="form-head" style={{ marginTop: '1.25rem' }}>
          <h3>推演信息</h3>
          <span className="muted" style={{ fontSize: '0.82rem' }}>只保留此法必需的信息，先定盘，再推演。</span>
        </div>

        <div className="archive-box">
          <span className="form-lbl">👤 套用档案</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select style={{ flex: 1 }} defaultValue=""><option value="">选择已保存档案</option></select>
            <button type="button" className="btn btn-sm">套用档案</button>
          </div>
          <p className="muted" style={{ fontSize: '0.78rem', marginTop: '0.4rem', marginBottom: 0 }}>
            可先到「档案」页面保存常用出生信息。<Link to="/favorites" style={{ color: 'var(--accent)' }}>去添加</Link>
          </p>
        </div>

        <div className="form-sec">
          <span className="form-lbl">姓名</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="可留空" />
        </div>
        <div className="form-sec">
          <span className="form-lbl">性别</span>
          <div className="seg seg-2">
            {(['男', '女'] as const).map((g) => (
              <button key={g} type="button" className={gender === g ? 'active' : ''} onClick={() => setGender(g)}>{g}</button>
            ))}
          </div>
        </div>

        <div className="form-sec">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span className="form-lbl" style={{ margin: 0 }}>出生日期</span>
            <div className="seg-inline">
              {(['公历', '农历', '四柱'] as const).map((c) => (
                <button key={c} type="button" className={calendar === c ? 'active' : ''} onClick={() => setCalendar(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <label className="field"><span>年</span><input value={year} onChange={(e) => setYear(e.target.value)} /></label>
            <label className="field"><span>月</span><input value={month} onChange={(e) => setMonth(e.target.value)} /></label>
            <label className="field"><span>日</span><input value={day} onChange={(e) => setDay(e.target.value)} /></label>
          </div>
        </div>

        <div className="form-sec">
          <span className="form-lbl">出生时间</span>
          <div className="bazi-time-row">
            <label className="field"><span>小时</span><input type="number" min={0} max={23} value={hour} onChange={(e) => setHour(Number(e.target.value))} /></label>
            <span className="bazi-time-colon">:</span>
            <label className="field"><span>分钟</span><input type="number" min={0} max={59} value={minute} onChange={(e) => setMinute(Number(e.target.value))} /></label>
          </div>
          <p className="muted" style={{ fontSize: '0.76rem', margin: '0.45rem 0 0.7rem', lineHeight: 1.55 }}>
            24小时制，00（午夜），12（正午），范围00-23，可精确到分钟。
          </p>
          <span className="form-lbl">十二时辰</span>
          <select value={shichenIndex(hour)} onChange={(e) => pickShichen(Number(e.target.value))}>
            {SHICHEN.map((s, i) => <option key={s.name} value={i}>{s.name} {s.range}</option>)}
          </select>
          <p className="muted" style={{ fontSize: '0.76rem', margin: '0.45rem 0 0', lineHeight: 1.55 }}>
            子时跨 23:00-00:59；晚子 23:00-23:59 与早子 00:00-00:59 请以 24 小时输入框为准。
          </p>
        </div>

        <div className="form-sec">
          <span className="form-lbl">日柱换日口径</span>
          <div className="seg seg-2">
            <button type="button" className={dayRule === '子初换日' ? 'active' : ''} onClick={() => setDayRule('子初换日')}>
              子初换日<small>23:00 换日</small>
            </button>
            <button type="button" className={dayRule === '晚子不换' ? 'active' : ''} onClick={() => setDayRule('晚子不换')}>
              晚子不换<small>00:00 换日</small>
            </button>
          </div>
        </div>

        <div className="subpanel" style={{ marginTop: '1.25rem' }}>
          <span className="form-lbl">高级设置</span>
          <span className="form-lbl" style={{ marginTop: '0.65rem' }}>时间口径</span>
          <div className="seg seg-2">
            <button type="button" className={timeMode === '真太阳时' ? 'active' : ''} onClick={() => setTimeMode('真太阳时')}>
              真太阳时<small>按地点经度校正</small>
            </button>
            <button type="button" className={timeMode === '民用时间' ? 'active' : ''} onClick={() => setTimeMode('民用时间')}>
              民用时间<small>不校正经度</small>
            </button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <LocationPicker
              selected={place}
              lng={lng}
              utc={utc}
              onSelect={pickPlace}
              onLngChange={(v) => { setLng(v); setError(null) }}
              onUtcChange={setUtc}
            />
          </div>
        </div>

        {error && <div className="subpanel" style={{ marginTop: '1rem' }}><span className="soft">{error}</span></div>}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={generate}>生成排盘</button>
          <button type="button" className="btn" onClick={reset}>重置</button>
        </div>
      </div>
    </div>
  )
}

function BaziResult({
  chart, meta, favorited, onFav, onAdjust, onRegen,
  activeToggles, onToggle, luckTab, setLuckTab, pickedYear, setPickedYear,
}: {
  chart: BaziChart
  meta: Meta
  favorited: boolean
  onFav: () => void
  onAdjust: () => void
  onRegen: () => void
  activeToggles: string[]
  onToggle: (t: string) => void
  luckTab: '八字大运' | '年度摘要'
  setLuckTab: (t: '八字大运' | '年度摘要') => void
  pickedYear: number | null
  setPickedYear: (y: number) => void
}) {
  const pillars = useMemo(() => [
    { key: '年', p: chart.year },
    { key: '月', p: chart.month },
    { key: '日', p: chart.day },
    { key: '时', p: chart.hour },
  ], [chart])

  const yearWin = chart.luckYears
  const activeYear = pickedYear ?? yearWin[4]?.year

  return (
    <div className="page bazi-result">
      <div className="bazi-result-top">
        <div className="method-pills">
          <Link className="chip" to="/tools">命盘</Link>
          <span className="chip" style={{ background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' }}>八字排盘</span>
        </div>
        <div className="bazi-result-actions">
          <button type="button" className="btn btn-sm" onClick={() => window.print()}>保存长图</button>
          <button type="button" className="btn btn-sm" onClick={onAdjust}>调整输入</button>
          <button type="button" className="btn btn-sm btn-primary" onClick={onRegen}>重新生成</button>
          <button type="button" className="icon-btn" style={{ borderRadius: '50%', width: 36, minWidth: 36 }} onClick={onFav} aria-pressed={favorited}>
            {favorited ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <span className="en-label">✧ 专业基础结果</span>
      <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', margin: '0.35rem 0 0.55rem' }}>
        {meta.name || '未署名'}的八字排盘
      </h1>
      <p className="soft" style={{ maxWidth: '46rem', lineHeight: 1.8, margin: 0 }}>{chart.summary}</p>
      <p className="muted" style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}>
        {meta.gender} · {meta.dateStr} {String(meta.hour).padStart(2, '0')}:{String(meta.minute).padStart(2, '0')} · {meta.dayRule}
        {meta.placeLabel ? ` · ${meta.placeLabel}` : ''}
      </p>

      <div className="method-pills" style={{ marginTop: '1rem' }}>
        {TOGGLES.map((t) => (
          <button
            key={t}
            type="button"
            className="chip"
            onClick={() => onToggle(t)}
            style={activeToggles.includes(t) ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 岁运轨迹 */}
      <section className="tool-panel" style={{ marginTop: '1.35rem' }}>
        <div className="form-head">
          <div>
            <span className="en-label">人生 · K 线</span>
            <h2 style={{ margin: '0.25rem 0 0', fontSize: '1.25rem' }}>岁运轨迹</h2>
          </div>
          <span className="chip">{yearWin[0].year}—{yearWin[yearWin.length - 1].year}</span>
        </div>
        <p className="soft" style={{ fontSize: '0.88rem', margin: '0.35rem 0 0.85rem' }}>
          把大运、流年与宫位信号放在同一条时间轴上，点选年份查看可追溯依据。
        </p>
        <div className="seg-inline" style={{ marginBottom: '0.85rem' }}>
          {(['八字大运', '年度摘要'] as const).map((t) => (
            <button key={t} type="button" className={luckTab === t ? 'active' : ''} onClick={() => setLuckTab(t)}>{t}</button>
          ))}
        </div>
        <div className="bazi-luck-track">
          {yearWin.map((y) => (
            <button
              key={y.year}
              type="button"
              className={`bazi-luck-dot${activeYear === y.year ? ' active' : ''}`}
              onClick={() => setPickedYear(y.year)}
              title={`${y.year} ${y.label}`}
            >
              <b style={{ height: `${y.score}%` }} />
              <span>{String(y.year).slice(2)}</span>
            </button>
          ))}
        </div>
        <div className="bazi-luck-panels" style={{ marginTop: '1rem' }}>
          <div className="subpanel" style={{ margin: 0 }}>
            <strong>{luckTab}</strong>
            <p className="soft" style={{ fontSize: '0.86rem', margin: '0.45rem 0 0', lineHeight: 1.7 }}>
              {luckTab === '八字大运'
                ? `结构相合度 · 区间 20—80。当前年份 ${activeYear}（${yearWin.find((y) => y.year === activeYear)?.label}），评分 ${yearWin.find((y) => y.year === activeYear)?.score}。`
                : `已切换 ${activeYear} 年度摘要：以流年干支与日主关系观气势起伏（演示假数据）。`}
            </p>
          </div>
          <div className="subpanel" style={{ margin: 0 }}>
            <strong>{activeYear} 年度详情</strong>
            <p className="soft" style={{ fontSize: '0.86rem', margin: '0.45rem 0 0', lineHeight: 1.7 }}>
              日主{chart.dayMaster}{chart.dayMasterEl}，年运倾向{chart.strength}。轨迹用于整理大运、流年信号，不代表客观命运高低。
            </p>
          </div>
        </div>
      </section>

      {/* 八字主盘 */}
      <section className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <div className="form-head">
          <div>
            <span className="en-label">四柱总览</span>
            <h2 style={{ margin: '0.25rem 0 0', fontSize: '1.25rem' }}>八字主盘</h2>
          </div>
          <div className="bazi-qi">
            <div className="bazi-qi-ring"><strong>{chart.qiScore}</strong></div>
            <div>
              <div className="form-lbl" style={{ margin: 0 }}>日主气数</div>
              <strong style={{ color: 'var(--accent)' }}>{chart.strength}</strong>
            </div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: '0.84rem', margin: '0 0 1rem' }}>
          年{chart.year.stem}{chart.year.branch} · 月{chart.month.stem}{chart.month.branch} · 日{chart.day.stem}{chart.day.branch} · 时{chart.hour.stem}{chart.hour.branch}
        </p>

        <div className="bazi-board">
          {pillars.map(({ key, p }) => (
            <div key={key} className="bazi-board-col">
              <span className="bazi-board-lab">{key}</span>
              {key === '日' && <span className="bazi-day-tag">日主</span>}
              <div className="serif bazi-board-stem" style={{ color: EL_COLOR[p.stemEl] }}>{p.stem}</div>
              <small style={{ color: EL_COLOR[p.stemEl] }}>{p.stemEl}</small>
              <div className="serif bazi-board-branch" style={{ color: EL_COLOR[p.branchEl] }}>{p.branch}</div>
              <small style={{ color: EL_COLOR[p.branchEl] }}>{p.branchEl}</small>
            </div>
          ))}
        </div>

        <div className="bazi-layers" style={{ marginTop: '1.1rem' }}>
          {[
            { k: '得令', v: chart.deling, max: 28, note: `${chart.month.branch}${chart.month.branchEl}` },
            { k: '得地', v: chart.dedi, max: 26, note: '通根' },
            { k: '得势', v: chart.deshi, max: 24, note: '透干生扶' },
            { k: '动态', v: chart.dynamic, max: 22, note: '岁运触动' },
          ].map((row) => (
            <div key={row.k} className="bazi-layer">
              <div className="bazi-layer-top">
                <strong>{row.k}</strong>
                <span>{row.v}<small>/{row.max}</small></span>
              </div>
              <div className="bazi-layer-bar"><b style={{ width: `${(row.v / row.max) * 100}%` }} /></div>
              <span className="muted" style={{ fontSize: '0.75rem' }}>{row.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 明细表 */}
      {(activeToggles.includes('藏干十神') || activeToggles.includes('神煞全表')) && (
        <section className="tool-panel" style={{ marginTop: '1.25rem', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '0.85rem' }}>柱详表</h3>
          <table className="bazi-table">
            <thead>
              <tr>
                <th>项目</th>
                {pillars.map(({ key }) => <th key={key}>{key}柱</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>十神</td>
                {pillars.map(({ key, p }) => <td key={key}>{p.shishen}</td>)}
              </tr>
              <tr>
                <td>天干</td>
                {pillars.map(({ key, p }) => (
                  <td key={key}><span style={{ color: EL_COLOR[p.stemEl] }}>{p.stem}</span> · {p.stemEl}</td>
                ))}
              </tr>
              <tr>
                <td>地支</td>
                {pillars.map(({ key, p }) => (
                  <td key={key}><span style={{ color: EL_COLOR[p.branchEl] }}>{p.branch}</span> · {p.branchEl}</td>
                ))}
              </tr>
              {activeToggles.includes('藏干十神') && (
                <>
                  <tr>
                    <td>藏干</td>
                    {pillars.map(({ key, p }) => <td key={key}>{p.hidden.join(' · ')}</td>)}
                  </tr>
                  <tr>
                    <td>藏干十神</td>
                    {pillars.map(({ key, p }) => <td key={key}>{p.hiddenGods.join(' · ')}</td>)}
                  </tr>
                </>
              )}
              <tr>
                <td>纳音</td>
                {pillars.map(({ key, p }) => <td key={key}>{p.nayin}</td>)}
              </tr>
              <tr>
                <td>星运</td>
                {pillars.map(({ key, p }) => <td key={key}>{p.stage}</td>)}
              </tr>
              <tr>
                <td>自坐</td>
                {pillars.map(({ key, p }) => <td key={key}>{p.selfSit}</td>)}
              </tr>
              <tr>
                <td>旬空</td>
                {pillars.map(({ key, p }) => <td key={key}>{p.xunkong}</td>)}
              </tr>
              {activeToggles.includes('神煞全表') && (
                <tr>
                  <td>神煞</td>
                  {pillars.map(({ key, p }) => <td key={key}>{p.shensha.join(' · ')}</td>)}
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* 流派视角 */}
      <section className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <span className="en-label">School Views</span>
        <h3 style={{ margin: '0.35rem 0 0.85rem' }}>流派视角</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="subpanel" style={{ margin: 0 }}>
            <strong>子平扶抑</strong>
            <p className="soft" style={{ fontSize: '0.86rem', margin: '0.45rem 0 0', lineHeight: 1.7 }}>
              日主{chart.dayMaster}{chart.dayMasterEl}判定为{chart.strength}；先定月令得气，再看通根与透干生扶，喜用取{chart.useful.join('、')}。
            </p>
          </div>
          <div className="subpanel" style={{ margin: 0 }}>
            <strong>调候用神</strong>
            <p className="soft" style={{ fontSize: '0.86rem', margin: '0.45rem 0 0', lineHeight: 1.7 }}>
              月令{chart.month.branch}{chart.month.branchEl}，气候宜{chart.useful[0]}为先；慎偏{chart.careful.join('、')}，岁运见喜勿过猛。
            </p>
          </div>
        </div>
      </section>

      {/* 地支关系 */}
      <section className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <span className="en-label">Branch Relations</span>
        <h3 style={{ margin: '0.35rem 0 0.85rem' }}>地支组合</h3>
        <div className="grid" style={{ gap: '0.75rem' }}>
          {chart.relations.map((r) => (
            <div key={r.kind} className="subpanel" style={{ margin: 0 }}>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong>{r.kind}</strong>
                {r.items.map((it) => <span key={it} className="chip">{it}</span>)}
              </div>
              <p className="soft" style={{ fontSize: '0.86rem', margin: '0.45rem 0 0' }}>{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 喜用 / 五行 */}
      <section className="tool-panel" style={{ marginTop: '1.25rem' }}>
        <span className="en-label">USEFUL ELEMENTS</span>
        <h3 style={{ margin: '0.35rem 0 0.75rem' }}>喜用参考</h3>
        <div className="bazi-useful">
          <div className="bazi-qi">
            <div className="bazi-qi-ring"><strong>{chart.qiScore}</strong></div>
            <div><div className="form-lbl" style={{ margin: 0 }}>日主气数</div><strong>{chart.strength}</strong></div>
          </div>
          <div>
            <div className="form-lbl">喜用</div>
            <div className="method-pills">
              {chart.useful.map((e) => <span key={e} className="chip" style={{ color: EL_COLOR[e], borderColor: EL_COLOR[e] }}>{e}</span>)}
            </div>
          </div>
          <div>
            <div className="form-lbl">慎偏</div>
            <div className="method-pills">
              {chart.careful.map((e) => <span key={e} className="chip">{e}</span>)}
            </div>
          </div>
        </div>
        <h3 style={{ margin: '1.25rem 0 0.75rem' }}>五行力量盘</h3>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
          {ELEMENTS.map((e) => (
            <div key={e} className="subpanel" style={{ margin: 0, textAlign: 'center' }}>
              <div className="serif" style={{ color: EL_COLOR[e], fontSize: '1.25rem' }}>{e}</div>
              <div className="muted" style={{ fontSize: '0.8rem' }}>{chart.percents[e]}%</div>
              <div className="bazi-layer-bar" style={{ marginTop: '0.45rem' }}>
                <b style={{ width: `${chart.percents[e]}%`, background: EL_COLOR[e] }} />
              </div>
            </div>
          ))}
        </div>
        <p className="soft" style={{ fontSize: '0.88rem', marginTop: '0.85rem', lineHeight: 1.75 }}>
          最旺{Object.entries(chart.percents).sort((a, b) => b[1] - a[1])[0][0]} {Math.max(...Object.values(chart.percents))}%
          {' · '}
          最弱{Object.entries(chart.percents).sort((a, b) => a[1] - b[1])[0][0]} {Math.min(...Object.values(chart.percents))}%
          。当前喜用倾向以扶抑、调候、通关合参，不按「缺什么补什么」直接下断。
        </p>
      </section>

      <div style={{ marginTop: '1.25rem' }}>
        <MemberLock
          title="八字全能解读"
          reading={`${chart.summary} 日主气数 ${chart.qiScore}（${chart.strength}）。先看月令与通根，再看十神流转与岁运触发。（演示假数据）`}
        />
      </div>
    </div>
  )
}
