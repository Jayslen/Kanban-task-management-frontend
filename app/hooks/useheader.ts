import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { APIMethods } from "~/api/apiClient"
import { useBoards } from "~/context/UseBoards"
import { useCurrentBoard } from "~/context/useCurrentBoard"

export function useHeader() {
    const navigate = useNavigate()
    const [newTaskPopupOpen, setNewTaskPopupOpen] = useState<Boolean>(false)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
    const [isEditPopupOpen, setIsEditPopupOpen] = useState<Boolean>(false)
    const { boards, isLoggedIn, deleteBoard: updateStateOnDelete } = useBoards()
    const { board } = useCurrentBoard()

    const handleAddNewTaskClick = () => {
        if (!board) {
            return toast.error('Please select a board first')
        }
        setNewTaskPopupOpen((prev) => !prev)
    }
    const handleDeleteBoardClick = () => {
        if (!board) {
            return toast.error('Please select a board first')
        }
        setIsDeletePopupOpen((prev) => !prev)
    }
    const handleEditBoardClick = () => {
        if (!board) {
            return toast.error('Please select a board first')
        }
        setIsEditPopupOpen((prev) => !prev)
    }

    const deleteBoard = async () => {
        try {
            if (!board) return
            await APIMethods.DeleteBoard(board.boardId)
            updateStateOnDelete(board.boardId)
            handleDeleteBoardClick()
            toast.success('Board deleted successfully')
            navigate('/')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Something went wrong')
            }
        }
    }

    return {
        boards,
        newTaskPopupOpen,
        isDeletePopupOpen,
        board,
        isEditPopupOpen,
        isLoggedIn,
        deleteBoard,
        handleAddNewTaskClick,
        handleDeleteBoardClick,
        handleEditBoardClick,
    }
}