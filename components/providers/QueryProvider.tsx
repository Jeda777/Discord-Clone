'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface props {
  children: React.ReactNode
}

const QueryProvider = ({ children }: props) => {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
