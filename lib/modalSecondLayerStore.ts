import { MemberRole } from '@prisma/client'
import { create } from 'zustand'

export type modalSecondLayerType = 'removeMember' | 'changeRole'

interface modalSecondLayerData {
  serverId?: string
  memberId?: string
  memberRole?: MemberRole
}

interface modalStoreInterface {
  typeSecond: modalSecondLayerType | null
  dataSecond: modalSecondLayerData
  isOpenSecond: boolean
  openSecond: (type: modalSecondLayerType, data?: modalSecondLayerData) => void
  closeSecond: () => void
}

export const modalSecondLayerStore = create<modalStoreInterface>((set) => ({
  typeSecond: null,
  dataSecond: {},
  isOpenSecond: false,
  openSecond: (typeSecond, dataSecond = {}) => set({ isOpenSecond: true, typeSecond, dataSecond }),
  closeSecond: () => set({ isOpenSecond: false, typeSecond: null }),
}))
