import { Link, Navigate, useParams } from 'react-router-dom'
import { gameById } from '@/data/games'
import { DailyCardGame } from '@/pages/games/DailyCardGame'
import { DailyLotteryGame } from '@/pages/games/DailyLotteryGame'
import { RedThreadGame } from '@/pages/games/RedThreadGame'
import { TarotDrawGame } from '@/pages/games/TarotDrawGame'

export function GameDetailPage() {
  const { id = '' } = useParams()
  const game = gameById(id)
  if (!game) return <Navigate to="/games" replace />

  return (
    <div className="page game-detail-page">
      <div className="muted game-crumb">
        <Link to="/games">小游戏</Link>
        <span>/</span>
        <span>{game.zh}</span>
      </div>

      {id === 'daily-card' && <DailyCardGame />}
      {id === 'daily-lottery' && <DailyLotteryGame />}
      {id === 'red-thread' && <RedThreadGame />}
      {id === 'tarot-draw' && <TarotDrawGame />}
    </div>
  )
}
