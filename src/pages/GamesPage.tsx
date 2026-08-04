import { Link } from 'react-router-dom'
import { games, type Game } from '@/data/games'

function GameIcon({ type }: { type: Game['icon'] }) {
  if (type === 'spark') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M24 4l3.2 14.2L41 24l-13.8 5.8L24 44l-3.2-14.2L7 24l13.8-5.8L24 4z" fill="currentColor" opacity="0.9" />
        <circle cx="24" cy="24" r="4" fill="var(--surface-solid)" />
      </svg>
    )
  }
  if (type === 'scroll') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <rect x="12" y="8" width="24" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M18 16h12M18 22h12M18 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'heart') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path d="M24 40s-12-7.8-16.5-14.2C4.2 20.8 5.4 13.5 11.2 11.4c3.4-1.2 6.8.2 8.8 2.8 2-2.6 5.4-4 8.8-2.8 5.8 2.1 7 9.4 3.7 14.4C36 32.2 24 40 24 40z" fill="currentColor" />
        <path d="M18 24c2 2.4 4.2 3.8 6 4.8 1.8-1 4-2.4 6-4.8" fill="none" stroke="var(--surface-solid)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <ellipse cx="24" cy="22" rx="14" ry="10" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 22c2 8 8 14 12 16 4-2 10-8 12-16" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      <circle cx="30" cy="20" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function GamesPage() {
  return (
    <div className="page games-page">
      <div className="games-grid">
        {games.map((g) => (
          <Link key={g.id} to={`/games/${g.id}`} className="game-tile" style={{ ['--game-accent' as string]: g.accent }}>
            <div className="game-tile-ico">
              <GameIcon type={g.icon} />
            </div>
            <h3>{g.zh}</h3>
            <span className="badge badge-ghost">{g.tag}</span>
            <p>{g.desc}</p>
            <span className="game-tile-cta">{g.cta} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
