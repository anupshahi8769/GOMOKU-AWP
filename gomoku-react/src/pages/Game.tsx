import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { Board, Button } from "../components/";
import { isGameEnded } from "../utils/utils";
import { AVAILABLE_GAME_SIZES, GAME_STATUS } from "../constants";
import type { stoneMap, GameData } from "../types/GameData";

import style from "./Game.module.css";

const isGameOver = (gameStatus: GAME_STATUS) =>
  [GAME_STATUS.DRAW, GAME_STATUS.PLAYER1_WIN, GAME_STATUS.PLAYER2_WIN].includes(
    gameStatus
  );

export default function Game() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [games, setGames] = useLocalStorage<GameData[]>("gamehistory", []);
  const size = parseInt(searchParams.get("size") || "0");
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYER1_TURN);
  const [turns, setTurns] = useState<stoneMap[]>([]);

  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid Game-Size. Please go back to The Home Page and start The Game again with valid Game-Size drop-down option. Thank-you!!
      </p>
    );
  }

  const updateGameStatus = (turn: stoneMap) => {
    if (isGameOver(gameStatus)) return;
    const updatedTurns = [...turns, turn];
    if (isGameEnded(size, updatedTurns)) {
      if (updatedTurns.length === size * size) {
        setGameStatus(GAME_STATUS.DRAW);
      } else if (updatedTurns.length % 2) {
        setGameStatus(GAME_STATUS.PLAYER1_WIN);
      } else {
        setGameStatus(GAME_STATUS.PLAYER2_WIN);
      }
    } else {
      setGameStatus(
        updatedTurns.length % 2
          ? GAME_STATUS.PLAYER1_TURN
          : GAME_STATUS.PLAYER2_TURN
      );
    }
    setTurns(updatedTurns);
  };

  const restart = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm("Game still in progress!! Do you still want to restart The Game?")
    )
      return;
    setTurns([]);
    setGameStatus(GAME_STATUS.PLAYER1_TURN);
  };

  const leave = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm("Game still in progress!! Do you still want to leave The Game?")
    )
      return;
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        { size, turns, date: new Date().toString(), result: gameStatus },
      ]);
      navigate("/gamehistory");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <p className={style.message}>{gameStatus}</p>
      <Board
        size={size}
        updateGameStatus={updateGameStatus}
        turns={turns}
        readonly={isGameOver(gameStatus)}
      />
      <div className={style.buttons}>
        <Button type="button" onClick={restart}>
          Restart
        </Button>
        <Button type="button" onClick={leave}>
          Leave
        </Button>
      </div>
    </>
  );
}
