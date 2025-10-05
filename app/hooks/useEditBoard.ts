import { useBoards } from '~/context/UseBoards'
import { useCurrentBoard } from '~/context/useCurrentBoard'
import { useIncreaseInputs } from './useIncreseInputs'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import debounce from 'just-debounce-it'
import toast from 'react-hot-toast'
import { APIMethods } from '~/api/apiClient'

export function useEditBoard(closePopup: () => void) {
    const { board, updateBoardColumns } = useCurrentBoard()
    const { updateBoard } = useBoards()

    const columns = board?.columns.map((col) => ({
        name: col.name,
        id: col.id,
        fromDB: true,
    })) || []

    const { inputs, inputContainerId, setInputs, addNewInput, deleteInput } =
        useIncreaseInputs(columns)
    const [columnsToDelete, setColumsToDelete] = useState<{ id: string }[]>([])

    const updateColumn = debounce(
        (
            e: ChangeEvent<HTMLInputElement>,
            col: { name: string; id: string; updated?: boolean; fromDB?: boolean },
            index: number
        ) => {
            const inputsState = [...inputs]
            const editColum = inputsState.find((c) => c.id === col.id)
            if (!editColum) return
            editColum.name = e.target.value
            editColum.updated = col.fromDB ? true : false
            inputsState[index] = editColum
            setInputs(inputsState)
        },
        300
    )

    const handleDeleteColumn = (col) => {
        if (inputs.length <= 2)
            return toast.error('A board must have at least 2 columns')
        if (!col.fromDB) {
            return deleteInput(col.id)
        }
        setColumsToDelete((prev) => [...prev, { id: col.id }])

        deleteInput(col.id)
    }

    const handleSubmitBoard = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { boardName } = Object.fromEntries(
            new FormData(e.currentTarget)
        )
        const columns: (
            | { name: string }
            | { name: string; id: string }
            | { id: string }
        )[] = [
            ...inputs.map((col) => {
                if (col.updated) return { id: col.id, name: col.name }
                if (!col.fromDB && !col.updated) return { name: col.name }
            }),
            ...columnsToDelete.map((col) => ({ id: col.id })),
        ].filter((c) => !!c)

        try {
            const boardResponse = await APIMethods.EditBoard({
                boardId: board?.boardId as string,
                requestBody: { name: boardName as string, columns },
            })
            toast.success('Board updated successfully')
            updateBoard(boardResponse.boardId, boardResponse.name)
            updateBoardColumns(boardResponse.boardId, boardResponse.columns)
            closePopup()
        } catch (error) {
            console.error('Error updating board:', error)
            return toast.error(
                `${(error as Error).message || 'Could not update board'}`
            )
        }
    }

    return {
        boardName: board?.name || '',
        inputContainerId,
        inputs,
        updateColumn,
        addNewInput,
        handleDeleteColumn,
        handleSubmitBoard
    }
}
