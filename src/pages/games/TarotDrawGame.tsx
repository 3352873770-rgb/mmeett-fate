import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { drawCards, TAROT_CARD_BACK, tarotCardImage, type DrawnCard } from '@/data/tarot'

const SPREADS = [
  { id: 'single', zh: '单牌', desc: '取当下主象', count: 1, positions: ['当下'] },
  { id: 'three', zh: '三牌', desc: '来路、当下、去势', count: 3, positions: ['过去', '现在', '趋势'] },
  { id: 'choice', zh: '抉择', desc: '两条路对照', count: 3, positions: ['现状', '路径甲', '路径乙'] },
] as const

export function TarotDrawGame() {
  const [name, setName] = useState('')
  const [question, setQuestion] = useState('这件事现在最该看哪条线？')
  const [spreadId, setSpreadId] = useState<(typeof SPREADS)[number]['id']>('three')
  const [cards, setCards] = useState<DrawnCard[]>([])
  const [flipped, setFlipped] = useState(0)
  const [toast, setToast] = useState('')
  const timers = useRef<number[]>([])

  const spread = useMemo(() => SPREADS.find((s) => s.id === spreadId)!, [spreadId])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const shuffle = () => {
    timers.current.forEach(clearTimeout)
    const drawn = drawCards(spread.count)
    setCards(drawn)
    setFlipped(0)
    for (let i = 1; i <= drawn.length; i++) {
      const id = window.setTimeout(() => setFlipped(i), i * 420)
      timers.current.push(id)
    }
  }

  const core = cards[Math.min(1, cards.length - 1)] || cards[0]
  const ready = cards.length > 0 && flipped === cards.length

  return (
    <div className="game-detail">
      <section className="game-hero game-hero-dark">
        <div className="game-hero-body">
          <span className="badge">塔罗牌阵 · 小局</span>
          <h1>洗牌入局，照见当下暗线</h1>
          <p>先把问题定住，再让牌面落位。这里给你一张可保存的小局图；想继续细问，再进完整塔罗解读。</p>
        </div>
      </section>

      <div className="game-split tarot-game-split">
        <div className="card game-form tarot-game-form">
          <h2>起牌前先定问</h2>
          <p className="soft">少问空泛，先锁定一个人、一件事或一个选择，牌面才容易落到真正要看的线索上。</p>

          <label className="field">
            <span>名字</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="可留空" />
          </label>
          <label className="field" style={{ marginTop: '0.75rem' }}>
            <span>想问的事</span>
            <textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>

          <div className="tarot-spread-pick">
            {SPREADS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`tarot-spread-card${spreadId === s.id ? ' active' : ''}`}
                onClick={() => { setSpreadId(s.id); setCards([]) }}
              >
                <strong>{s.zh}</strong>
                <span>{s.desc}</span>
              </button>
            ))}
          </div>

          <div className="game-actions">
            <button type="button" className="btn btn-primary" onClick={shuffle}>洗牌起局</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setToast('演示环境请截图保存牌阵图')
                window.setTimeout(() => setToast(''), 2200)
              }}
            >
              保存牌阵图
            </button>
            <Link className="btn btn-ghost" to="/tools/tarot">进完整牌阵 →</Link>
          </div>
          {toast && <p className="game-toast">{toast}</p>}
        </div>

        <div className="game-preview-wrap">
          <article className="tarot-share-card">
            <header>
              <span>{name.trim() || '来问的人'} · {spread.count} 张牌</span>
              <strong>MMEETT Fate</strong>
            </header>
            <p className="tarot-share-type">{spread.zh}推演</p>
            <p className="tarot-share-q">{question.trim() || '（未填写问题）'}</p>

            {cards.length === 0 ? (
              <div className="tarot-empty">洗牌后，牌面会落在这里。</div>
            ) : (
              <div className="tarot-share-row">
                {cards.map((c, i) => {
                  const show = i < flipped
                  return (
                    <div key={`${c.id}-${i}`} className={`tarot-share-slot${show ? ' is-revealed' : ''}`}>
                      <span className="tarot-pos">{spread.positions[i]}</span>
                      <div className="tarot-card-frame">
                        <div className={`tarot-card${show ? ' is-flipped' : ''}`}>
                          <div className="tarot-face tarot-back">
                            <img src={TAROT_CARD_BACK} alt="" draggable={false} />
                          </div>
                          <div className={`tarot-face tarot-front${c.reversed_orientation ? ' is-reversed' : ''}`}>
                            <img src={tarotCardImage(c.id)} alt={c.zh} draggable={false} />
                            <span className="tarot-orient">{c.reversed_orientation ? '逆位' : '正位'}</span>
                          </div>
                        </div>
                      </div>
                      {show && (
                        <p>
                          <strong>{c.zh}</strong>
                          <span>{c.reversed_orientation ? '逆位' : '正位'}</span>
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {ready && core && (
              <div className="tarot-share-read">
                <p>
                  {(name.trim() || '来问的人')}这次抽到的核心是「{core.zh}·{core.reversed_orientation ? '逆位' : '正位'}」。
                  它更像是在提醒：先看清现在位置的主线，再处理「{core.zh}」带出的阻力。
                </p>
                <p>
                  先按「{spread.positions[Math.min(1, cards.length - 1)]}」这张牌处理最关键的一步：
                  {core.reversed_orientation ? core.reversed : core.upright}。
                </p>
                {core.reversed_orientation && (
                  <p>逆位牌出现时，先修正节奏和边界，再推进结果。</p>
                )}
              </div>
            )}

            <footer>传统文化体验参考 · MMEETT Fate</footer>
          </article>
        </div>
      </div>
    </div>
  )
}
