import { create } from 'zustand'

interface Boards {
  boards: { boardId: string; name: string; createdAt: Date }[]
  isLoggedIn?: boolean
  addBoard: (
    input: { boardId: string; name: string; createdAt: Date }[]
  ) => void
}

export const useBoards = create<Boards>((set) => ({
  boards: [],
  isLoggedIn: false,
  addBoard: (input) => set(() => ({ boards: input, isLoggedIn: true })),
}))
