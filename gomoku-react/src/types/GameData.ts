import { GameStatus } from '../constants'

export type stoneMap = [number, number]

export type GameData = {
  _id: string,
  userId: string,
  size: number,
  turns: stoneMap[]
  date: string
  result: GameStatus
}
