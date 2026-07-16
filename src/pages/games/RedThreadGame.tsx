import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { seedFrom } from '@/data/games'

type Gender = '女' | '男' | '保密'

const KEYWORDS = ['回响', '心有灵犀', '细水长流', '互补相成', '需要磨合', '各自成全', '同频共振']
const MODES = ['互补', '相生', '磨合', '牵引', '守望']
const DIMS = ['吸引', '沟通', '节奏', '稳定', '修复'] as const

const NEXT = [
  '先约定一件很小但能完成的事，观察对方是否守时、回应和兑现。',
  '表达喜欢时尽量具体，说清楚欣赏的是哪件事，而不是只给笼统评价。',
  '遇到分歧先复述对方意思，再说自己的边界，别急着判断输赢。',
  '适合把一次长谈拆成几次短沟通，关系会更稳。',
]

function PersonForm({
  title,
  name,
  setName,
  birthday,
  setBirthday,
  gender,
  setGender,
  placeholders,
}: {
  title: string
  name: string
  setName: (v: string) => void
  birthday: string
  setBirthday: (v: string) => void
  gender: Gender
  setGender: (v: Gender) => void
  placeholders: [string, string]
}) {
  return (
    <div className="red-person">
      <h3>{title}</h3>
      <div className="red-person-fields">
        <label className="field">
          <span>名字</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={placeholders[0]} />
        </label>
        <label className="field">
          <span>生日</span>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </label>
      </div>
      <div className="seg">
        {(['女', '男', '保密'] as const).map((g) => (
          <button key={g} type="button" className={gender === g ? 'active' : ''} onClick={() => setGender(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export function RedThreadGame() {
  const [aName, setAName] = useState('')
  const [bName, setBName] = useState('')
  const [aBirth, setABirth] = useState('')
  const [bBirth, setBBirth] = useState('')
  const [aGender, setAGender] = useState<Gender>('女')
  const [bGender, setBGender] = useState<Gender>('男')
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState('')

  const result = useMemo(() => {
    const key = [aName.trim() || '你', bName.trim() || '对方', aBirth, bBirth, aGender, bGender].join('|')
    const s = seedFrom(key)
    const score = 58 + (s % 38)
    const keyword = KEYWORDS[s % KEYWORDS.length]
    const dims = Object.fromEntries(
      DIMS.map((d, i) => [d, 45 + ((s >> (i * 3)) % 50)]),
    ) as Record<(typeof DIMS)[number], number>
    const level = (n: number) => (n >= 75 ? '强' : n >= 55 ? '可磨合' : '稳')
    return {
      score,
      keyword,
      mode: MODES[s % MODES.length],
      dims,
      labels: {
        吸引: level(dims.吸引),
        沟通: level(dims.沟通),
        节奏: level(dims.节奏),
        稳定: level(dims.稳定),
        修复: level(dims.修复),
      },
      match: `你和对方的吸引感比较容易被看见，适合从轻松、具体的小事建立信任。这组关系的红线落在「${keyword}」，越是把话说清楚，越容易形成稳定的互动感。`,
      warn: dims.沟通 < 60
        ? '沟通项偏低时，容易出现一方想快、一方想稳的错位。重要决定不要只看当下热度，最好留一次复盘时间。'
        : '节奏接近时，也要给彼此留一点缓冲，避免好事催得太紧。',
      summary: `你与对方的合拍关键词是「${keyword}」。这组关系的优势在吸引，需要留意沟通；适合先用真实互动验证，而不是只看一时情绪。`,
      tags: ['情绪互照', '慢热升温', '行动牵引', '先观察'],
    }
  }, [aName, bName, aBirth, bBirth, aGender, bGender])

  const run = () => {
    if (!aName.trim() || !bName.trim()) {
      setToast('请先填两边的名字')
      window.setTimeout(() => setToast(''), 1800)
      return
    }
    setDone(true)
  }

  return (
    <div className="game-detail">
      <section className="game-hero">
        <div className="game-hero-bg" style={{ backgroundImage: 'url(/games/cloud-paper-mist.jpg)' }} aria-hidden />
        <div className="game-hero-body">
          <span className="badge" style={{ background: 'color-mix(in srgb, #9b3d45 18%, transparent)', color: '#8a3038' }}>红线合拍</span>
          <h1>看两个人的红线牵引感</h1>
          <p>输入两个人的姓名和生日，生成一张关系合拍卡。适合发给朋友互动，也可以继续进入八字合盘看完整关系结构。</p>
        </div>
      </section>

      <div className="game-split">
        <div className="card game-form">
          <h2>两个人的信息</h2>
          <p className="soft">生日可不填；填了会把出生日期节律也纳入合拍结果。</p>

          <PersonForm
            title="主方"
            name={aName}
            setName={setAName}
            birthday={aBirth}
            setBirthday={setABirth}
            gender={aGender}
            setGender={setAGender}
            placeholders={['你的名字', '']}
          />
          <PersonForm
            title="对方"
            name={bName}
            setName={setBName}
            birthday={bBirth}
            setBirthday={setBBirth}
            gender={bGender}
            setGender={setBGender}
            placeholders={['对方名字', '']}
          />

          <div className="game-actions">
            <button type="button" className="btn btn-primary" onClick={run}>开始合拍</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setToast('演示环境请截图保存合拍卡')
                window.setTimeout(() => setToast(''), 2200)
              }}
            >
              保存合拍图
            </button>
            <Link className="btn btn-ghost" to="/tools/bazi-hepan">进入完整合盘 →</Link>
          </div>
          {toast && <p className="game-toast">{toast}</p>}
        </div>

        <div className="game-preview-wrap">
          <article className={`red-share-card${done ? ' ready' : ''}`}>
            <header>
              <span>红线合拍 · 关系小游戏</span>
              <strong>算了么</strong>
            </header>

            <div className="red-orbit" aria-hidden>
              <span>{aName.trim() || '你'}</span>
              <i />
              <span>{bName.trim() || '对'}</span>
            </div>
            <p className="red-names">{aName.trim() || '你'} × {bName.trim() || '对方'}</p>
            <p className="red-score">{result.score}</p>
            <p className="red-keyword">{result.keyword}</p>
            <p className="soft">{result.summary}</p>

            <div className="red-tags">
              {result.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="red-dims">
              {DIMS.map((d) => (
                <div key={d} className="daily-score-row">
                  <span>{d}</span>
                  <div className="daily-score-bar accent-red"><i style={{ width: `${result.dims[d]}%` }} /></div>
                  <b>{result.labels[d]}</b>
                </div>
              ))}
            </div>

            <div className="red-boxes">
              <div>
                <h4>合拍点</h4>
                <p>{result.match}</p>
              </div>
              <div>
                <h4>提醒</h4>
                <p>{result.warn}</p>
              </div>
            </div>

            <footer>
              <span>红线模式：{result.mode}</span>
              <small>传统文化体验参考</small>
            </footer>
          </article>

          {done && (
            <section className="red-next">
              <h3>下一步怎么相处</h3>
              <div className="red-next-grid">
                {NEXT.map((t) => (
                  <div key={t} className="card">{t}</div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
