import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LocationPicker } from '@/components/LocationPicker'
import type { Place } from '@/data/locations'

export type BirthData = {
  name: string
  gender: '男' | '女'
  dateStr: string
  hour: number
  minute: number
  question: string
}

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

function shichenIndex(hour: number) {
  return Math.floor(((hour + 1) % 24) / 2)
}

/** 推演信息表单：对齐参考站命盘类工具的排盘输入面板 */
export function BirthChartForm({
  question: defaultQuestion = '我现在应该如何推进这件事?',
  onSubmit,
  top,
  hideQuestion = false,
}: {
  question?: string
  onSubmit: (data: BirthData) => void
  top?: ReactNode
  hideQuestion?: boolean
}) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'男' | '女'>('男')
  const [calendar, setCalendar] = useState<'公历' | '农历'>('公历')
  const [year, setYear] = useState('2026')
  const [month, setMonth] = useState('07')
  const [day, setDay] = useState('15')
  const [hour, setHour] = useState(8)
  const [minute, setMinute] = useState(0)
  const [timeMode, setTimeMode] = useState<'真太阳时' | '民用时间'>('真太阳时')
  const [place, setPlace] = useState<Place | null>(null)
  const [lng, setLng] = useState('')
  const [utc, setUtc] = useState('8')
  const [question, setQuestion] = useState(defaultQuestion)
  const [error, setError] = useState<string | null>(null)

  const pickPlace = (p: Place) => {
    setPlace(p)
    setLng(String(p.lng))
    setUtc(String(p.utc))
    setError(null)
  }

  const pickShichen = (idx: number) => {
    setHour(idx === 0 ? 23 : idx * 2 - 1)
  }

  const reset = () => {
    setName('')
    setGender('男')
    setCalendar('公历')
    setYear('2026'); setMonth('07'); setDay('15')
    setHour(8); setMinute(0)
    setTimeMode('真太阳时')
    setPlace(null); setLng(''); setUtc('8')
    setError(null)
    setQuestion(defaultQuestion)
  }

  const submit = () => {
    if (!place && !lng.trim()) {
      setError('请选择出生/起局地点（城市或区县），或手动输入经度后再生成。')
      return
    }
    setError(null)
    onSubmit({
      name,
      gender,
      dateStr: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      hour,
      minute,
      question,
    })
  }

  return (
    <div className="tool-panel">
      {top}
      <div className="form-head">
        <h3>推演信息</h3>
        <span className="muted" style={{ fontSize: '0.82rem' }}>只保留此法必需的信息，先定盘，再推演。</span>
      </div>

      <div className="form-sec" style={{ marginTop: 0 }}>
        <span className="form-lbl">👤 套用档案</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select style={{ flex: 1 }} defaultValue="">
            <option value="">选择已保存档案</option>
          </select>
          <button type="button" className="btn btn-sm">套用档案</button>
        </div>
        <p className="muted" style={{ fontSize: '0.78rem', marginTop: '0.4rem' }}>
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

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span className="form-lbl" style={{ margin: 0 }}>出生日期</span>
            <div className="seg-inline">
              {(['公历', '农历'] as const).map((c) => (
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
        <div>
          <span className="form-lbl">出生时间</span>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <label className="field"><span>小时</span><input type="number" min={0} max={23} value={hour} onChange={(e) => setHour(Number(e.target.value))} /></label>
            <label className="field"><span>分钟</span><input type="number" min={0} max={59} value={minute} onChange={(e) => setMinute(Number(e.target.value))} /></label>
          </div>
          <p className="muted" style={{ fontSize: '0.76rem', margin: '0.4rem 0 0.6rem' }}>24 小时制，00（午夜），12（正午），范围 00-23。</p>
          <span className="form-lbl">十二时辰</span>
          <select value={shichenIndex(hour)} onChange={(e) => pickShichen(Number(e.target.value))}>
            {SHICHEN.map((s, i) => (
              <option key={s.name} value={i}>{s.name} {s.range}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="subpanel" style={{ marginTop: '1.25rem' }}>
        <span className="form-lbl">高级设置 · 时间口径</span>
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

      {!hideQuestion && (
        <div className="form-sec">
          <span className="form-lbl">你想问的事</span>
          <textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>
      )}

      {error && (
        <div className="subpanel" style={{ marginTop: '1.25rem' }}>
          <span className="soft">{error}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
        <button type="button" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={submit}>生成排盘</button>
        <button type="button" className="btn" onClick={reset}>重置</button>
      </div>
    </div>
  )
}
