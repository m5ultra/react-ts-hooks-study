import React from "react";
import { ReactNode } from "react";
import { AuthProvider } from "./auth-content";

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

