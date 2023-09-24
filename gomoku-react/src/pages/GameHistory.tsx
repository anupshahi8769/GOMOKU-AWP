import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import type { GameData } from '../types'

import style from './GameHistory.module.css'

export default function GameHistory() {
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('gamehistory', [])

  return (
    <>
      <h1 className={style.header}>Previous Games</h1>
      {games.map(({ date, result }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`game-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/gamehistorydetail/${d.getTime()}`)} 
            >
              View Game History Detail
            </button>
          </div>
        )
      })}
    </>
  )
}
