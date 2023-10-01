export const AVAILABLE_GAME_SIZES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];


export enum STONE_STATUS {
  AVAILABLE = "AVAILABLE",
  PLAYER1 = "PLAYER1",
  PLAYER2 = "PLAYER2",
}

export enum GameStatus {
  PLAYER1_TURN = "PLAYER1 (BLACK) TURN TO MOVE",
  PLAYER2_TURN = "PLAYER2 (WHITE) TURN TO MOVE",
  PLAYER1_WIN = "WINNER WINNER CHICKEN DINNER: PLAYER1 (BLACK) WON THE GAME",
  PLAYER2_WIN = "WINNER WINNER CHICKEN DINNER: PLAYER2 (WHITE) WON THE GAME",
  DRAW = "!!***THE GAME IS DRAW***!! ",
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''
