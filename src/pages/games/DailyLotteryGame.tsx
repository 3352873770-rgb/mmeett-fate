import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { seedFrom, todayKey } from '@/data/games'

const LEVELS = ['上上签', '上签', '中签', '下签'] as const
const VERSES = [
  '云开见月，诸事渐明。静守半日，自有佳音。',
  '静待时机，缓则得济。不宜硬闯，先稳根基。',
  '守正持恒，终有回响。今日宜少言，多成事。',
  '低调蓄力，暂避锋芒。先把一件小事做完再议。',
]
const HINTS = [
  '完全随机',
  '每天一次',
  '摇到上上签，当天赠送 1 次全能解读',
]

const LOTTERY_STORE = '__suanleme_daily_lottery__'

export function DailyLotteryGame() {
  const { isAuthenticated, openAuth, user } = useAuth()
  const [shaking, setShaking] = useState(false)
  const storageKey = `${LOTTERY_STORE}:${user?.id || 'anon'}:${todayKey()}`
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    try { setDrawn(localStorage.getItem(storageKey) === '1') } catch { setDrawn(false) }
  }, [storageKey])

  const result = useMemo(() => {
    const s = seedFrom(`${storageKey}|lottery`)
    return {
      level: LEVELS[s % LEVELS.length],
      verse: VERSES[s % VERSES.length],
    }
  }, [storageKey])

  const shake = () => {
    if (!isAuthenticated) {
      openAuth('login')
      return
    }
    if (drawn || shaking) return
    setShaking(true)
    window.setTimeout(() => {
      setShaking(false)
      setDrawn(true)
      try { localStorage.setItem(storageKey, '1') } catch { /* ignore */ }
    }, 1100)
  }

  return (
    <div className="game-detail">
      <section className="game-hero game-hero-plain">
        <div className="game-hero-body">
          <span className="badge">小游戏</span>
          <h1>每日摇签</h1>
          <p>每个用户每天只能摇一次。结果由本地确定性算法抽出，抽完当天锁定，刷新或重复点击都不会重抽。</p>
          <div className="pill-row">
            {HINTS.map((h) => <span key={h} className="chip">{h}</span>)}
          </div>
        </div>
      </section>

      <div className="lottery-layout">
        <div className="card lottery-main">
          <div className={`lottery-stage${shaking ? ' is-shaking' : ''}${drawn ? ' is-drawn' : ''}`}>
            <img
              className="lottery-cup"
              src="/games/daily-lottery-premium-cup-fast.webp"
              alt="签筒"
            />
            <img
              className={`lottery-sticks${drawn ? ' out' : ''}`}
              src={drawn ? '/games/daily-lottery-premium-stick-fast.webp' : '/games/daily-lottery-premium-stick-bundle-fast.webp'}
              alt=""
              aria-hidden
            />
          </div>

          {!isAuthenticated ? (
            <div className="lottery-gate">
              <div className="lottery-lock" aria-hidden>锁</div>
              <h3>登录后摇签</h3>
              <p className="soft">每日摇签绑定账号，抽到上上签后奖励次数才能在各个工具里使用（演示环境标记即可）。</p>
              <button type="button" className="btn btn-primary" onClick={() => openAuth('login')}>去登录</button>
            </div>
          ) : !drawn ? (
            <div className="lottery-gate">
              <h3>{shaking ? '签筒轻响…' : '今日尚未摇签'}</h3>
              <p className="soft">轻轻一摇，当天签文即锁定。</p>
              <button type="button" className="btn btn-primary" onClick={shake} disabled={shaking}>
                {shaking ? '摇签中…' : '摇一签'}
              </button>
            </div>
          ) : (
            <div className="lottery-result">
              <span className="badge">{result.level}</span>
              <p className="serif lottery-verse">{result.verse}</p>
              {result.level === '上上签' && (
                <p className="soft">摇到上上签，今日可标记 1 次全能解读（本地演示，无需计费）。</p>
              )}
              <p className="muted" style={{ fontSize: '0.78rem' }}>当天签文已锁定，明日再来。</p>
            </div>
          )}

          <Link className="btn" to="/tools" style={{ alignSelf: 'flex-start' }}>去使用工具 →</Link>
        </div>

        <aside className="card lottery-tips">
          <h3>今日提示</h3>
          <ul>
            {HINTS.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <p className="muted" style={{ fontSize: '0.78rem', marginTop: '1rem' }}>
            后面会继续把其他小游戏加在这里。
          </p>
        </aside>
      </div>
    </div>
  )
}
