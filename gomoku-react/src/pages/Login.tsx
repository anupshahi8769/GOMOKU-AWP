// // import { useState, useContext } from 'react'
// import { useState, useContext, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button, Input, Message } from '../components'
// import { UserContext } from '../context'
// import users from '../data/users.json'

// import style from './Login.module.css'

// export default function Login() {
//     const {Login} = useContext(UserContext)
//     const usernameInput = useRef<HTMLInputElement | null>(null)
//     const navigate = useNavigate()
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [isCredentialInvalid, setCredentialInvalid] = useState(false)

//     const handleLogin = () => {
//         const user = users.find(
//             (u) => u.username === username && u.password === password
//         )
//         if (!user) {
//             setCredentialInvalid(true)
//         } else {
//             Login(username)
//             navigate ('/')
//         }
//     }

//     useEffect(() => {
//         if (usernameInput.current) {
//           usernameInput.current.focus()
//         }
//       }, [])

//     return (
//         <form className={style.container} onSubmit={(e) => {
//             e.preventDefault()
//             handleLogin()
//         }}
//         >
//             {isCredentialInvalid && (
//                 <Message variant="error" message="invalid username or password" />)}
//             <Input
//                 name="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => {
//                     setUsername(e.target.value)
//                     setCredentialInvalid(false)
//                 }}
//             />
//             <Input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button type="submit">
//                 Login
//             </Button>
//         </form>
//     )
// }

import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { UserContext } from '../context'

import style from './Login.module.css'

export default function Login() {
  const { login } = useContext(UserContext)
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')
    const result = await login(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])

  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <Input
        ref={usernameInput}
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
        }}
      />
      <Button type="submit" disabled={!username || !password}>
        Login
      </Button>
    </form>
  )
}

