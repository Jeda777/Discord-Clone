'use client'

import { useSocket } from '@/components/providers/SocketProvider'
import { DirectMessageWithProfile, MessageWithMemberWithProfile } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface props {
  socketKey: string
  socketUpdateKey: string
}

const useChatSocket = ({ socketKey, socketUpdateKey }: props) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    socket.on(socketUpdateKey, (message: DirectMessageWithProfile | MessageWithMemberWithProfile) => {
      queryClient.setQueryData([socketKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: DirectMessageWithProfile | MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message
              }
              return item
            }),
          }
        })

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    socket.on(socketKey, (message: DirectMessageWithProfile | MessageWithMemberWithProfile) => {
      queryClient.setQueryData([socketKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          }
        }

        const newData = [...oldData.pages]

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        }

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    return () => {
      socket.off(socketKey)
      socket.off(socketUpdateKey)
    }
  }, [socket, socketKey, socketUpdateKey, queryClient])
}

export default useChatSocket
