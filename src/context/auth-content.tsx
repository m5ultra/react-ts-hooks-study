import React from "react";
import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../screens/project-list/search-panel";
import * as auth from "auth-provider";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPage, FullPageError, FullPageLoading } from "../components/lib";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

interface IAuthForm {
  username: string
  password: string
}

export const AuthContext = createContext<| {
  user: User | null
  login: (form: IAuthForm) => Promise<void>
  register: (form: IAuthForm) => Promise<void>
  logout: () => Promise<void>
}
  | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>();
  // point free
  const login = (form: IAuthForm) => auth.login(form).then(setUser);
  const register = (form: IAuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
}
