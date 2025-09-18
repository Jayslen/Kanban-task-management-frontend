import { create } from 'zustand'
import type { Board } from '~/types/global'

interface CurrentBoard {
    board: Board | null
    setCurrentBoard: (board: Board | null) => void
}



export const useCurrentBoard = create<CurrentBoard>((set) => ({
    board: null,
    setCurrentBoard: (board) => set(() => ({ board }))
})) 