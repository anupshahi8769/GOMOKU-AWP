import { useState, useEffect } from "react";
import Stone from "./Stone";
import style from "./Board.module.css";
import type { stoneMap } from "../types/GameData";
import { getStoneStatusAndSequence } from "../utils/utils";

type BoardProps = {
  size: number;
  turns: stoneMap[];
  updateGameStatus?: (turns: stoneMap) => void;
  readonly?: boolean;
};

export default function Board({
  size,
  turns,
  updateGameStatus,
  readonly = false,
}: BoardProps) {
  const [currentTurn, setCurrentTurn] = useState<stoneMap>();

  useEffect(() => {
    if (!updateGameStatus || !currentTurn || turns.includes(currentTurn))
      return;
    updateGameStatus(currentTurn);
    setCurrentTurn(undefined);
  }, [currentTurn, turns, updateGameStatus]);

  return (
    <div className={style.main}>
      <div className={style.board}>
        {Array.from({ length: size }).map((_, row) => (
          <div
            key={`row-${row}`}
            className={style.row}
            style={{ gridTemplateColumns: `repeat(${size}, 3.5rem)` }}
          >
            {Array.from({ length: size }).map((_, column) => (
              <Stone
                key={`stone-${row * size + column}`}
                row={row}
                column={column}
                {...getStoneStatusAndSequence([row, column], turns)}
                onClick={setCurrentTurn}
                readonly={readonly}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
