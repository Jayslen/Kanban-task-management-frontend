import { useCurrentBoard } from "~/context/useCurrentBoard"
import { useTaskStatus } from "./useTaskStatus"
import type { Task } from "~/types/global"
import { useState, type ChangeEvent } from "react"
import toast from "react-hot-toast"
import { APIMethods } from "~/api/apiClient"

export function useTask(task: Task, closeTaskPopup: () => void) {
    const { name, description, column_id, subtasks } = task
    const { board, deleteTask: updateStateOnDelete, updateSubtaskStatus: updateStateOnSubtaskStatus } = useCurrentBoard()
    const { status, statusSelected, updateStatus } = useTaskStatus({
        columnStatusId: column_id,
        taskId: task.id,
        updateDB: true,
    })
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState<Boolean>(false)
    const [completedSubtasks, setCompletedSubtasks] = useState<number>(
        subtasks?.filter((subtask) => subtask.isComplete).length || 0
    )
    const handleDeleteBoardClick = () => {
        if (!task) {
            return toast.error('Please select a board first')
        }
        setIsDeletePopupOpen((prev) => !prev)
    }

    const handleEditBoardClick = () => {
        if (!task) {
            return toast.error('Please select a board first')
        }
        setIsEditPopupOpen((prev) => !prev)
    }

    const deleteTask = async () => {
        if (!board) {
            return toast.error('Board not found')
        }

        try {
            await APIMethods.DeleteTask(board.boardId, task.id)
            updateStateOnDelete(task.id)
            handleDeleteBoardClick()
            closeTaskPopup()
            toast.success('Task deleted successfully')
        } catch (error) {
            toast.error((error as Error).message || 'Failed to delete task')
        }
    }

    const updateSubtaskStatus = async (e: ChangeEvent<HTMLInputElement>, subtaskId: string) => {
        if (!board) return toast.error('Board not found')
        try {
            await APIMethods.updateSubtaskStatus({ boardId: board.boardId, taskId: task.id, requestBody: { subtaskId, isCompleted: e.target.checked } })
            updateStateOnSubtaskStatus(
                task.id,
                subtaskId,
                e.target.checked
            )
            setCompletedSubtasks((prev) => {
                if (e.target.checked) return prev + 1
                return prev - 1
            })
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update subtask status')
            e.target.checked = !e.target.checked
        }

    }
    return {
        name,
        description,
        completedSubtasks,
        subtasks,
        status,
        statusSelected,
        isDeletePopupOpen,
        isEditPopupOpen,
        updateSubtaskStatus,
        deleteTask,
        setIsDeletePopupOpen,
        updateStatus,
        handleDeleteBoardClick,
        handleEditBoardClick
    }
}