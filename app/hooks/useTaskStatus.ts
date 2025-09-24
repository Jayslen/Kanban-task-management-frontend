import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function useTaskStatus(props: { columnStatusId?: number, taskId?: string, updateDB?: boolean } = {}) {
    const { columnStatusId, taskId, updateDB } = props
    const { board, updateTaskStatus } = useCurrentBoard()
    const status = board?.columns.map((col) => ({ name: col.name, id: col.id })) || []
    const currentStatus = status.find((s) => s.id === columnStatusId) || status[0]
    const [statusSelected, setStatusSelected] = useState<{ name: string, id: number } | undefined>(currentStatus)

    const updateStatus = async (status: { name: string, id: number }) => {
        if (status.id === statusSelected?.id) return
        if (!updateDB && !taskId) setStatusSelected(status)

        if (updateDB && taskId && board) {
            try {
                const response = await fetch(`http://localhost:3000/board/${board.boardId}/task/${taskId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ status: status.id })
                })

                if (!response.ok) {
                    const responseError = await response.json()
                    toast.error(responseError.message)
                    console.error("Failed to update task status in the database")
                    return
                }
                updateTaskStatus(taskId, status.id)
                setStatusSelected(status)
            } catch (error) {
                console.error("Error updating task status:", error)
                toast.error("An error occurred while updating the task status")
            }
        }
    }

    return { status, statusSelected, updateStatus }
}