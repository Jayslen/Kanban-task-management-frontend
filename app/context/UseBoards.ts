import { create } from 'zustand'

interface Boards {
  boards: { boardId: string; name: string; createdAt: Date }[]
  isLoggedIn?: boolean
  addBoards: (
    input: { boardId: string; name: string; createdAt: Date }[]
  ) => void
  newBoard: (input: { boardId: string; name: string; createdAt: Date }) => void
}

export const useBoards = create<Boards>((set) => ({
  boards: [],
  isLoggedIn: false,
  addBoards: (input) => set(() => ({ boards: input, isLoggedIn: true })),
  newBoard: (input) => set((state) => ({ boards: [...state.boards, input] }))
}))
