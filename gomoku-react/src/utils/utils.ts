import { STONE_STATUS } from "../constants";
import type { stoneMap } from "../types/GameData";

function isCurrentPlayerStone(
  size: number,
  stoneMap: stoneMap,
  turns: stoneMap[]
) {
  const [x, y] = stoneMap;
  if (x < 0 || x >= size || y < 0 || y >= size) return false;
  const turnIndex = turns.findIndex(
    (turn) => turn[0] === stoneMap[0] && turn[1] === stoneMap[1]
  );
  if (turnIndex === -1) return false;
  return (turns.length - 1) % 2 === turnIndex % 2;
}

function getHorizontalRowNumber(size: number, turns: stoneMap[]) {
  const [x, y] = turns[turns.length - 1];
  let rowCount = 1;
  let left = y;
  while (rowCount < 5 && isCurrentPlayerStone(size, [x, --left], turns)) {
    rowCount++;
  }
  if (rowCount === 5) return rowCount;
  let right = y;
  while (rowCount < 5 && isCurrentPlayerStone(size, [x, ++right], turns)) {
    rowCount++;
  }
  return rowCount;
}

function getVerticalRowNumber(size: number, moves: stoneMap[]) {
  const [x, y] = moves[moves.length - 1];
  let rowCount = 1;
  let top = x;
  while (rowCount < 5 && isCurrentPlayerStone(size, [--top, y], moves)) {
    rowCount++;
  }
  if (rowCount === 5) return rowCount;
  let bottom = x;
  while (rowCount < 5 && isCurrentPlayerStone(size, [++bottom, y], moves)) {
    rowCount++;
  }
  return rowCount;
}
function getTopLeftDiagonalRowNumber(size: number, moves: stoneMap[]) {
  const [x, y] = moves[moves.length - 1];
  let rowCount = 1;
  let [top, left] = [x, y];
  while (
    rowCount < 5 &&
    isCurrentPlayerStone(size, [--top, --left], moves)
  ) {
    rowCount++;
  }
  if (rowCount === 5) return rowCount;
  let [bottom, right] = [x, y];
  while (
    rowCount < 5 &&
    isCurrentPlayerStone(size, [++bottom, ++right], moves)
  ) {
    rowCount++;
  }
  return rowCount;
}

function getTopRightDiagonalRowNumber(size: number, turns: stoneMap[]) {
  const [x, y] = turns[turns.length - 1];
  let rowCount = 1;
  let [top, right] = [x, y];
  while (
    rowCount < 5 &&
    isCurrentPlayerStone(size, [--top, ++right], turns)
  ) {
    rowCount++;
  }
  if (rowCount === 5) return rowCount;
  let [bottom, left] = [x, y];
  while (
    rowCount < 5 &&
    isCurrentPlayerStone(size, [++bottom, --left], turns)
  ) {
    rowCount++;
  }
  return rowCount;
}
/*This method checks the winner if 5 stone with same color connects (Horizontally or Vertically or Diagonally) to determine the winner.
 */
export function isGameEnded(size: number, turns: stoneMap[]) {
  if (turns.length < 5) return false;
  if (
    getHorizontalRowNumber(size, turns) === 5 ||
    getVerticalRowNumber(size, turns) === 5 ||
    getTopLeftDiagonalRowNumber(size, turns) === 5 ||
    getTopRightDiagonalRowNumber(size, turns) === 5
  )
    return true;
  if (turns.length === size * size) return true;
}

export function getStoneStatusAndSequence(
  stoneMap: stoneMap,
  turns: stoneMap[]
) {
  const sequence =
    turns.findIndex(
      (turn) => turn[0] === stoneMap[0] && turn[1] === stoneMap[1]
    ) + 1;
  const status =
    sequence === 0
      ? STONE_STATUS.AVAILABLE
      : sequence % 2
      ? STONE_STATUS.PLAYER1
      : STONE_STATUS.PLAYER2;
  return { sequence, status };
}
