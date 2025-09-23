import { create } from 'zustand'
import type { Board, Task } from '~/types/global'

interface CurrentBoard {
    board: Board | null
    setCurrentBoard: (board: Board | null) => void
    addTask: (task: Task) => void
}

export const useCurrentBoard = create<CurrentBoard>((set) => ({
    board: null,
    setCurrentBoard: (board) => set(() => ({ board })),
    addTask: (newTask) => set((state) => {
        if (!state.board) return state

        const columnToUpdateIndex = state.board.columns.findIndex(col => col.id === newTask.column_id)
        if (columnToUpdateIndex === -1) return state

        const columnToUpdate = state.board.columns[columnToUpdateIndex]

        const updatedColumn = {
            ...columnToUpdate,
            tasks: [...columnToUpdate.tasks, newTask]
        }

        const updatedColumns = state.board.columns.map((col, idx) =>
            idx === columnToUpdateIndex ? updatedColumn : col
        )

        return ({
            board: {
                ...state.board,
                columns: updatedColumns
            }
        })
    })
})) 