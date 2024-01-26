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
    const socket = new (io as any)('http://localhost:3000/', {
      path: '/api/socket/io',
      addTrailingSlash: false,
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
