import { useEffect, useRef, useState } from 'react'
import { MemberLock } from '@/components/MemberLock'
import { drawCards, spreads, TAROT_CARD_BACK, tarotCardImage, type DrawnCard, type Spread } from '@/data/tarot'

export function TarotTool() {
  const [spread, setSpread] = useState<Spread>(spreads[0])
  const [cards, setCards] = useState<DrawnCard[]>([])
  const [flipped, setFlipped] = useState<number>(0)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const draw = () => {
    timers.current.forEach(clearTimeout)
    const drawn = drawCards(spread.count)
    setCards(drawn)
    setFlipped(0)
    for (let i = 1; i <= drawn.length; i++) {
      const id = window.setTimeout(() => setFlipped(i), i * 520)
      timers.current.push(id)
    }
  }

  return (
    <>
      <div className="tool-panel">
        <span className="muted" style={{ fontSize: '0.85rem' }}>选择牌阵</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.5rem 0 1rem' }}>
          {spreads.map((s) => (
            <button
              key={s.id}
              className="chip"
              onClick={() => { setSpread(s); setCards([]) }}
              style={spread.id === s.id ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', borderColor: 'var(--btn-bg)' } : undefined}
            >
              {s.zh} · {s.count} 张
            </button>
          ))}
        </div>
        <p className="soft" style={{ fontSize: '0.88rem' }}>{spread.desc}</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={draw}>洗牌抽牌</button>
      </div>

      {cards.length > 0 && (
        <div className="tarot-stage">
          <div className="tarot-stage-glow" aria-hidden />
          <div className={`tarot-row tarot-row--${spread.count}`}>
            {cards.map((c, i) => {
              const isFlipped = i < flipped
              return (
                <div key={`${c.id}-${i}`} className={`tarot-slot${isFlipped ? ' is-revealed' : ''}`}>
                  <span className="tarot-pos">{spread.positions[i]}</span>
                  <div className="tarot-card-frame">
                    <div className={`tarot-card${isFlipped ? ' is-flipped' : ''}`}>
                      <div className="tarot-face tarot-back">
                        <img src={TAROT_CARD_BACK} alt="" draggable={false} />
                      </div>
                      <div className={`tarot-face tarot-front${c.reversed_orientation ? ' is-reversed' : ''}`}>
                        <img src={tarotCardImage(c.id)} alt={c.zh} draggable={false} />
                        <span className="tarot-orient">{c.reversed_orientation ? '逆位' : '正位'}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`tarot-caption${isFlipped ? ' is-on' : ''}`}>
                    {isFlipped ? (
                      <>
                        <strong className="tarot-name">{c.zh}</strong>
                        <em className="tarot-en">{c.en}</em>
                        <p className="tarot-kw">{c.reversed_orientation ? c.reversed : c.upright}</p>
                      </>
                    ) : (
                      <span className="tarot-waiting">翻开中…</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {cards.length > 0 && flipped === cards.length && (
        <div style={{ marginTop: '1.25rem' }}>
          <MemberLock
            reading={`牌阵「${spread.zh}」：${cards.map((c, i) => `${spread.positions[i]}—${c.zh}(${c.reversed_orientation ? '逆' : '正'})`).join('，')}。可继续展开牌与牌之间的关系脉络与行动建议。`}
          />
        </div>
      )}
    </>
  )
}
