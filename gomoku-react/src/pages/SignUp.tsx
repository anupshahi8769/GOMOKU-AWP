import { useState } from "react";
import { Button, Input, Message } from "../components";
import users from "../data/users.json";
import style from "./Login.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    if (users.find((u) => u.username === username)) {
      setErrorMessage(`Username ${username} has been taken`);
      return;
    }

    if (password !== confirmedPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    console.log({
      username,
      password,
    });
  };

  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Input
        name="confirmedPassword"
        type="password"
        placeholder="Confirmed Password"
        value={confirmedPassword}
        onChange={(e) => {
          setConfirmedPassword(e.target.value);
        }}
      />

      <Button
        type="submit"
        disabled={!username || !password || !confirmedPassword}
      >
        Sign Up
      </Button>
    </form>
  );
}
