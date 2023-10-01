// import { useState } from "react";
// import { UserContext } from "../context";
// import { User } from "../types/User";

// type UserProviderProps = {
//   children: React.ReactNode;
// };

// export default function UserProvider({ children }: UserProviderProps) {
//   const [user, setUser] = useState<User | undefined>(undefined);

//   const Login = (username: string) => setUser({ username });
//   const Logout = () => setUser(undefined);

//   return (
//     <UserContext.Provider value={{ user, Login, Logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

import { User, Credential } from '../types'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import { post, setToken } from '../utils/http'
import { API_HOST } from '../constants'

type UserProviderProps = {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
  if (user) {
    setToken(user.token)
  }

  const login = async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
        username,
        password,
      })
      setUser(user)
      setToken(user.token)
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(
        `${API_HOST}/api/auth/register`,
        {
          username,
          password,
        }
      )
      setUser(user)
      setToken(user.token)
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to login at this moment, please try again'
    }
  }

  const logout = () => {
    setUser(undefined)
    setToken('')
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}


