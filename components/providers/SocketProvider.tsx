'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

type socketContextType = {
  socket: any | null
  connected: boolean
}

const socketContext = createContext<socketContextType>({
  socket: null,
  connected: false,
})

export const useSocket = () => {
  return useContext(socketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: { origin: process.env.NEXT_PUBLIC_SITE_URL!, methods: ['GET', 'POST', 'PATCH'] },
    })

    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('disconnect', () => {
      setConnected(false)
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return <socketContext.Provider value={{ socket, connected }}>{children}</socketContext.Provider>
}
