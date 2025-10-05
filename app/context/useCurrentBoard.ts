import { create } from 'zustand'
import type { Board, Task } from '~/types/global'

interface CurrentBoard {
    board: Board | null
    setCurrentBoard: (board: Board | null) => void
    addTask: (task: Task) => void
    updateTaskStatus: (taskId: string, newStatusId: string) => void
    deleteTask: (taskId: string) => void
    updateSubtaskStatus: (taskId: string, subtaskId: string, isComplete: boolean) => void
    updateTask: (updatedTask: Partial<Task>) => void
    updateBoardColumns: (boardId: string, columns: { id: string; name: string }[]) => void
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
    }),
    updateTaskStatus: (taskId, newStatusId) => set((state) => {
        if (!state.board) return state
        const taskToUpdate = state.board.columns.flatMap(col => col.tasks).find(task => task.id === taskId)

        if (!taskToUpdate) return state

        const oldColumnId = taskToUpdate.column_id
        if (oldColumnId === newStatusId) return state
        const updatedTask = { ...taskToUpdate, column_id: newStatusId }
        const updatedColumns = state.board.columns.map(col => {
            if (col.id === oldColumnId) {
                return {
                    ...col,
                    tasks: col.tasks.filter(task => task.id !== taskId)
                }
            }
            if (col.id === newStatusId) {
                return {
                    ...col, tasks: [...col.tasks, updatedTask]
                }
            }
            return col
        })
        return {
            board: {
                ...state.board,
                columns: updatedColumns
            }
        }
    }),
    deleteTask: (taskId) => set((state) => {
        if (!state.board) return state
        const updatedColumns = state.board.columns.map(col => ({
            ...col,
            tasks: col.tasks.filter(task => task.id !== taskId)
        }))
        return {
            board: { ...state.board, columns: updatedColumns }
        }
    }),
    updateSubtaskStatus: (taskId, subtaskId, isComplete) => set((state) => {
        if (!state.board) return state
        const updatedColumns = state.board.columns.map(col => ({
            ...col,
            tasks: col.tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        subtasks: task?.subtasks?.map(subtask =>
                            subtask.id === subtaskId ? { ...subtask, isComplete } : subtask
                        )
                    }
                }
                return task
            })
        }))
        return {
            board: { ...state.board, columns: updatedColumns }
        }
    }),
    updateTask: (updatedTask) => set((state) => {
        if (!state.board) return state
        const updatedColumns = state.board.columns.map(col => ({
            ...col,
            tasks: col.tasks.map(task =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            )
        }))
        return {
            board: { ...state.board, columns: updatedColumns }
        }
    }),
    updateBoardColumns: (boardId, columns) => set((state) => {
        if (!state.board || state.board.boardId !== boardId) return state

        const updatedColumns = columns.map(col => {
            const existingColumn = state.board?.columns.find(c => c.id === col.id)
            return existingColumn ? { ...existingColumn, name: col.name } : { ...col, tasks: [] }
        })

        return { board: { ...state.board, columns: updatedColumns } }
    })
})) 