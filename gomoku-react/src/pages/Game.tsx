import { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { Board, Button } from "../components/";

import { API_HOST, AVAILABLE_GAME_SIZES, GameStatus } from "../constants";
import type { stoneMap, GameData } from "../types/GameData";

import style from "./Game.module.css";
import { UserContext } from "../context";

import { get, put as putRequest, del } from "../utils/http";
import { isGameEnded } from "../utils/utils";

const isGameOver = (gameStatus: GameStatus) =>
  [GameStatus.DRAW, GameStatus.PLAYER1_WIN, GameStatus.PLAYER2_WIN].includes(
    gameStatus
  );

export default function Game() {
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [games, setGames] = useLocalStorage<GameData[]>("gamehistory", []);
  const size = parseInt(searchParams.get("size") || "0");
  const [gameStatus, setGameStatus] = useState(GameStatus.PLAYER1_TURN);
  const [turns, setTurns] = useState<stoneMap[]>([]);

  //if user is not logged in, redirect to the login page
  if (!user) return <Navigate to="/login" replace />;
  console.log(user);
  const _id = "";
  const userId = "";
  const date = "";

  if (!AVAILABLE_GAME_SIZES.includes(size)) {
    return (
      <p className={style.message}>
        Invalid Game-Size. Please go back to The Home Page and start The Game
        again with valid Game-Size drop-down option. Thank-you!!
      </p>
    );
  }

  const updateGameStatus = async (turn: stoneMap) => {
    if (isGameOver(gameStatus)) return;
    const updatedTurns = [...turns, turn];
    if (isGameEnded(size, updatedTurns)) {
      if (updatedTurns.length === size * size) {
        setGameStatus(GameStatus.DRAW);
      } else if (updatedTurns.length % 2) {
        setGameStatus(GameStatus.PLAYER1_WIN);
      } else {
        setGameStatus(GameStatus.PLAYER2_WIN);
      }
    } else {
      setGameStatus(
        updatedTurns.length % 2
          ? GameStatus.PLAYER1_TURN
          : GameStatus.PLAYER2_TURN
      );
    }
    setTurns(updatedTurns);
    //get request to get game details
    const getDetails = await get<GameData[]>("api/games");
    console.log(getDetails);
    const currentDetails = getDetails[getDetails.length - 1];
    const thisId = currentDetails._id;

    // puting request to update game upon user making moves

    await putRequest(`${API_HOST}/api/games/${thisId}`, {
      userID: user._id,
      size,
      turns,
      date,
      result: gameStatus,
    });
  };
  const restart = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm(
        "Game still in progress!! Do you still want to restart The Game?"
      )
    )
      return;
    setTurns([]);
    setGameStatus(GameStatus.PLAYER1_TURN);

    //getting request to get game details
    const getDetails = await get<GameData[]>("api/games");
    const currentDetails = getDetails[getDetails.length - 1];
    const thisId = currentDetails._id;
    //putting request to update game upon restarting
    await put(`/api/games/${thisId}`, {
      userId,
      size,
      turns: [[]],
      date,
      result: gameStatus,
    });
  };

  const leave = async () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm(
        "Game still in progress!! Do you still want to leave The Game?"
      )
    )
      return;
    if (isGameOver(gameStatus)) {
      setGames([
        ...games,
        {
          _id,
          userId,
          size,
          turns,
          date: new Date().toString(),
          result: gameStatus,
        },
      ]);
      navigate("/gamehistory");
      //  GET request to get game details.
      const getDetails = await get<GameData[]>("api/games");
      const currentDetails = getDetails[getDetails.length - 1];
      const thisId = currentDetails._id;
      // PUT request to update the game upon the user leaving the game with the game being finished.
      await putRequest(`${API_HOST}/api/games/${thisId}`, {
        userId,
        size,
        turns,
        date: new Date().toString(),
        result: gameStatus,
      });
    } else {
      navigate("/");
      //get request to get game details
      const getDetails = await get<GameData[]>("api/games");
      const getId = getDetails[getDetails.length - 1];
      const thisId = getId._id;
      //  DELETE request to delete the game if the user leaves with the game not being finished.
      await del(`${API_HOST}/api/games/${thisId}`);
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

function put(
  arg0: string,
  arg1: {
    userId: string;
    size: number;
    turns: never[][];
    date: string;
    result: GameStatus;
  }
) {
  throw new Error("Function not implemented.");
}
