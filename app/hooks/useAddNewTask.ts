import { useCurrentBoard } from "~/context/useCurrentBoard"
import { useIncreaseInputs } from "./useIncreseInputs"
import type { FormEvent } from "react"
import { useTaskStatus } from "./useTaskStatus"
import toast from "react-hot-toast"
import { APIMethods } from "~/api/apiClient"

export function useAddNewTask({ closePopup }: { closePopup: () => void }) {
    const { board, addTask } = useCurrentBoard()
    const {
        inputs,
        inputContainerId,
        updateInputValue,
        addNewInput,
        deleteInput,
    } = useIncreaseInputs()
    const { status, statusSelected, updateStatus } = useTaskStatus()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!board) return toast.error('No board selected')

        const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
        )
        const taskInfo: {
            name: string
            status: string
            subtasks: string[]
            description?: string
        } = {
            name: formData.title as string,
            status: statusSelected?.id as string,
            subtasks: inputs
                .filter((subtask) => subtask.name.length > 0)
                .map((subtask) => subtask.name),
        }

        if (formData.description) {
            taskInfo.description = formData.description as string
        }

        try {
            const taskCreated = await APIMethods.CreateTask({
                boardId: board.boardId,
                requestBody: taskInfo,
            })

            addTask(taskCreated)
            toast.success('Task added successfully')
            closePopup()
        } catch (error) {
            toast.error((error as Error).message || 'Failed to add task')
        }
    }

    return {
        handleSubmit,
        inputs,
        inputContainerId,
        updateInputValue,
        addNewInput,
        deleteInput,
        status,
        statusSelected,
        updateStatus
    }
}