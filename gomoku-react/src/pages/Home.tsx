import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { AVAILABLE_GAME_SIZES } from "../constants";
import { useContext } from "react";
import { UserContext } from "../context";
import style from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [size, setSize] = useState(5);
  const { user } = useContext(UserContext);
  if (!user)
    return (
      <>
        <label className={style.label}>
          Please select The Game size
          <select
            className={style.select}
            value={size.toString()}
            onChange={(event) => setSize(parseInt(event.target.value))}
          >
            {AVAILABLE_GAME_SIZES.map((value) => (
              <option key={`size-${value}`} value={value.toString()}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <Button type="button" onClick={() => navigate("/login")}>
          Start Game
        </Button>
      </>
    );
  return (
    <>
      <label className={style.label}>
        Please select The Game size
        <select
          className={style.select}
          value={size.toString()}
          onChange={(event) => setSize(parseInt(event.target.value))}
        >
          {AVAILABLE_GAME_SIZES.map((value) => (
            <option key={`size-${value}`} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <Button type="button" onClick={() => navigate(`game?size=${size}`)}>
        Start The Game
      </Button>
    </>
  );
}
