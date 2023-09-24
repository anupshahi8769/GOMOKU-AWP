import { useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import { Board, Button } from '../components'
import type { GameData } from '../types'

import style from './GameHistoryDetail.module.css'

export default function GameHistoryDetail() {
  const { gameId = '' } = useParams()
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('gamehistory', [])
  const game = games.find(
    (g) => new Date(g.date).getTime() === parseInt(gameId)
  )
  if (!game)
    return (
      <p className={style.message}>
        Cannot find the game log, please go back to the home page
      </p>
    )

  const { size, turns, result } = game

  return (
    <>
      <p className={style.message}>{result}</p>
      <Board size={size} turns={turns} readonly />
      <div className={style.button}>
        <Button onClick={() => navigate('/gamehistory')}>Back</Button>
      </div>
    </>
  )
}

