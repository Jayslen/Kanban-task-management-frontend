import debounce from "just-debounce-it"
import { useIncreaseInputs } from "./useIncreseInputs"
import { useTaskStatus } from "./useTaskStatus"
import { useState, type FormEvent } from "react"
import { useCurrentBoard } from "~/context/useCurrentBoard"
import type { Subtask, Task } from "~/types/global"
import { APIMethods } from "~/api/apiClient"
import toast from "react-hot-toast"

export function useEditTask(task: Task, closePopup: () => void) {
    const { name, description, column_id, subtasks } = task
    console.log(task.id)
    const { board, updateTask } = useCurrentBoard()
    const [subtasksToDelete, setSubtaskToDelete] = useState<{ id: string }[]>([])

    const {
        inputs,
        inputContainerId,
        setInputs,
        addNewInput,
        deleteInput } = useIncreaseInputs(subtasks?.map((s) => ({ id: s.id, name: s.name, fromDB: true, updated: false })))

    const {
        status,
        statusSelected,
        updateStatus
    }
        = useTaskStatus({
            columnStatusId: column_id,
            taskId: task.id,
            updateDB: true,
        })
    const updateSubtasks = debounce(
        ({
            value,
            subtask,
            index
        }: {
            value: string,
            subtask: { name: string, id: string, updated?: boolean, fromDB?: boolean }
            index: number
        }) => {
            const inputsState = [...inputs]
            const editColum = inputsState.find((sub) => sub.id === subtask.id)
            if (!editColum) return
            editColum.name = value
            editColum.updated = subtask.fromDB ? true : false
            inputsState[index] = editColum
            setInputs(inputsState)
        },
        300
    )

    const removeSubtask = (subtask: { name: string, id: string, updated?: boolean, fromDB?: boolean }) => {
        if (!subtask.fromDB) return deleteInput(subtask.id, true)
        setSubtaskToDelete((prev) => [...prev, { id: subtask.id }])
        deleteInput(subtask.id, true)
    }

    const handleEditTask = async (e: FormEvent<HTMLFormElement>) => {
        {
            e.preventDefault()
            const { taskName: name, description } = Object.fromEntries(
                new FormData(e.currentTarget)
            )

            const subtasks: (
                | { name: string }
                | { name: string; id: string }
                | { id: string }
            )[] = [
                ...inputs.map((sub) => {
                    if (sub.updated) return { id: sub.id, name: sub.name }
                    if (!sub.fromDB && !sub.updated) return { name: sub.name }
                }),
                ...subtasksToDelete.map((col) => ({ id: col.id })),
            ].filter((c) => !!c)

            if (!board) return
            try {
                const updatedTask = await APIMethods.EditTask({
                    boardId: board.boardId,
                    taskId: task.id,
                    requestBody: {
                        name: name as string | undefined,
                        description: description as string | undefined,
                        status: statusSelected?.id,
                        subtasks
                    },
                })

                updateTask(updatedTask)
                closePopup()
                toast.success('Task updated successfully')
            } catch (error) {
                console.error('Error fetching task data:', error)
                toast.error('An error occurred while fetching task data')
            }
        }
    }

    return {
        name,
        description,
        inputContainerId,
        inputs,
        updateSubtasks,
        status,
        statusSelected,
        handleEditTask,
        removeSubtask,
        addNewInput,
        updateStatus,
        deleteInput,
        setSubtaskToDelete,
    }
}