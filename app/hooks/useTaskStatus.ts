import { useState } from 'react'
import toast from 'react-hot-toast'
import { APIMethods } from '~/api/apiClient'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function useTaskStatus(props: { columnStatusId?: string, taskId?: string, updateDB?: boolean } = {}) {
    const { columnStatusId, taskId, updateDB } = props
    const { board, updateTaskStatus } = useCurrentBoard()
    const status = board?.columns.map((col) => ({ name: col.name, id: col.id })) || []
    const currentStatus = status.find((s) => s.id === columnStatusId) || status[0]
    const [statusSelected, setStatusSelected] = useState<{ name: string, id: string } | undefined>(currentStatus)

    const updateStatus = async (status: { name: string, id: string }) => {
        if (status.id === statusSelected?.id) return
        if (!updateDB && !taskId) setStatusSelected(status)

        if (updateDB && taskId && board) {
            try {
                await APIMethods.EditTask({
                    boardId: board.boardId,
                    taskId,
                    requestBody: { status: status.id }
                })
                updateTaskStatus(taskId, status.id)
                setStatusSelected(status)
            } catch (error) {
                console.error("Error updating task status:", error)
                toast.error(`${(error as Error).message || 'Could not update task status'}`)
            }
        }
    }

    return { status, statusSelected, updateStatus }
}