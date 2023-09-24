import { memo } from "react";
import { STONE_STATUS } from "../constants";
import style from "./Stone.module.css";

const getClassId = (status: STONE_STATUS) => {
  const classId = style.stone;
  switch (status) {
    case STONE_STATUS.PLAYER1:
      return `${classId} ${style.player1}`;
    case STONE_STATUS.PLAYER2:
      return `${classId} ${style.player2}`;
    default:
      return classId;
  }
};

type StoneProps = {
  row: number;
  column: number;
  status: STONE_STATUS;
  sequence: number;
  onClick: (stoneMap: [number, number]) => void;
  readonly: boolean;
};

export default memo(function Stone({
  row,
  column,
  status,
  sequence,
  onClick,
  readonly,
}: StoneProps) {
  const handleClick = () => {
    if (status === STONE_STATUS.AVAILABLE && !readonly) {
      onClick([row, column]);
    }
  };
  return (
    <div className={getClassId(status)} onClick={handleClick}>
      {sequence && readonly ? sequence : undefined}
    </div>
  );
});
