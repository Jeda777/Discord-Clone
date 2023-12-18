import { create } from 'zustand'

export type modalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'deleteChannel'
  | 'editChannel'
  | 'deleteMessage'

interface modalStoreInterface {
  type: modalType | null
  isOpen: boolean
  open: (type: modalType) => void
  close: () => void
}

export const modalStore = create<modalStoreInterface>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}))
