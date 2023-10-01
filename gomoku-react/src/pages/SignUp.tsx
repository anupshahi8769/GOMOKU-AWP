// import { useContext, useState } from "react";
// import { Button, Input, Message } from "../components";
// import users from "../data/users.json";
// import style from "./Login.module.css";
// import { UserContext } from "../context";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const { register } = useContext(UserContext)
//   const navigate = useNavigate()
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmedPassword, setConfirmedPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSignUp = async () => {
//     if (users.find((u) => u.username === username)) {
//       setErrorMessage(`Username ${username} has been taken`);
//       return;
//     }

//     if (password !== confirmedPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }

//     console.log({
//       username,
//       password,
//     });
//   };

//   return (
//     <form
//       className={style.container}
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleSignUp();
//       }}
//     >
//       {errorMessage && <Message variant="error" message={errorMessage} />}
//       <Input
//         name="username"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => {
//           setUsername(e.target.value);
//         }}
//       />

//       <Input
//         name="password"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//       />

//       <Input
//         name="confirmedPassword"
//         type="password"
//         placeholder="Confirmed Password"
//         value={confirmedPassword}
//         onChange={(e) => {
//           setConfirmedPassword(e.target.value);
//         }}
//       />

//       <Button
//         type="submit"
//         disabled={!username || !password || !confirmedPassword}
//       >
//         Sign Up
//       </Button>
//     </form>
//   );
// }

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { UserContext } from '../context'

import style from './Login.module.css'

export default function SignUp() {
  const { register } = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async () => {
    setErrorMessage('')
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    const result = await register(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          // setErrorMessage('')
          setUsername(e.target.value)
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          // setErrorMessage('')
          setPassword(e.target.value)
        }}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          // setErrorMessage('')
          setConfirmPassword(e.target.value)
        }}
      />
      <Button
        type="submit"
        disabled={!username || !password || !confirmPassword}
      >
        Sign Up
      </Button>
    </form>
  )
}


