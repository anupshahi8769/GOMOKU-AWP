import { useState } from "react";
import { UserContext } from "../context";
import { User } from "../types/User";

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const Login = (username: string) => setUser({ username });
  const Logout = () => setUser(undefined);

  return (
    <UserContext.Provider value={{ user, Login, Logout }}>
      {children}
    </UserContext.Provider>
  );
}
