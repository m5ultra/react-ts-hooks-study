import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../project-list/search-panel";
import * as auth from "auth-provider";

interface IAuthForm {
  username: string,
  password: string
}

export const AuthContext = createContext<{
  user: User | null,
  login: (form: IAuthForm) => Promise<void>
  register: (form: IAuthForm) => Promise<void>
  logout: (form: IAuthForm) => Promise<void>

} | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  // point free
  const login = (form: IAuthForm) => auth.login(form).then(setUser);
  const register = (form: IAuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  // @ts-ignore
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context
};
