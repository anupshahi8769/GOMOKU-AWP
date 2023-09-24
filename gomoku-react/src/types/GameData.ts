import { GAME_STATUS } from '../constants'

export type stoneMap = [number, number]

export type GameData = {
  size: number
  turns: stoneMap[]
  date: string
  result: GAME_STATUS
}
