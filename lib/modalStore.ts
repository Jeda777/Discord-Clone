import { Server } from '@prisma/client'
import { create } from 'zustand'

export type modalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'editChannel'
  | 'deleteMessage'
  | 'members'

interface modalData {
  server?: Server
  isModerator?: boolean
  profileId?: string
  channelId?: string
  channelName?: string
}

interface modalStoreInterface {
  type: modalType | null
  data: modalData
  isOpen: boolean
  open: (type: modalType, data?: modalData) => void
  close: () => void
}

export const modalStore = create<modalStoreInterface>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null }),
}))
