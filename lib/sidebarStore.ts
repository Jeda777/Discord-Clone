import { create } from 'zustand'

interface sidebarStoreInterface {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const sidebarStore = create<sidebarStoreInterface>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
