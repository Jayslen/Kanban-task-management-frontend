import { useState } from 'react'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function useTaskStatus() {
    const { board } = useCurrentBoard()
    const status = board?.columns.map((col) => ({ name: col.name, id: col.id })) || []
    const [statusSelected, setStatusSelected] = useState<{ name: string, id: number } | undefined>(status[0])

    const updateTaskStatus = (status: { name: string, id: number }) => {
        setStatusSelected(status)
    }

    return { status, statusSelected, updateTaskStatus }
}