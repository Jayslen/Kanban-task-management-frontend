import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { APIMethods } from "~/api/apiClient"
import { useBoards } from "~/context/UseBoards"

export function useGetAllBoards() {
    const { addBoards } = useBoards()
    const [isSidebarOpen, setIsSidebarOpen] = useState<Boolean>(true)
    const toggleSidebarMenu = () => setIsSidebarOpen((prev) => !prev)

    useEffect(() => {
        document.body.classList.add('board-layout')
        return () => {
            document.body.classList.remove('board-layout')
        }
    }, [])

    useEffect(() => {
        const getBoards = async () => {
            try {
                const boards = await APIMethods.GetBoards()
                addBoards(boards)
            } catch (error) {
                console.error((error as Error).message || 'Failed to fetch boards')
                toast.error((error as Error).message || 'Failed to fetch boards')
            }
        }

        getBoards()
    }, [])

    return { isSidebarOpen, toggleSidebarMenu }
}