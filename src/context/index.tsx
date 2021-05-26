import React from 'react'
import { ReactNode } from 'react'
import { AuthProvider } from './auth-content'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AuthProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
