import { MemberRole } from '@prisma/client'
import { create } from 'zustand'

export type modalSecondLayerType = 'removeMember' | 'changeRole'

interface modalData {
  memberId?: string
  memberRole?: MemberRole
}

interface modalStoreInterface {
  type: modalSecondLayerType | null
  data: modalData
  isOpen: boolean
  open: (type: modalSecondLayerType, data?: modalData) => void
  close: () => void
}

export const modalSecondLayerStore = create<modalStoreInterface>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null }),
}))
