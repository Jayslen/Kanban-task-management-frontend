import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { NewTask } from '~/components/task/NewTaskPopup'
import { useBoards } from '~/context/UseBoards'
import { useCurrentBoard } from '~/context/useCurrentBoard'
import { DeletePopup } from './popups/DeletePopup'
import { OptionsMenu } from './popups/OptionsMenuPopup'
import { EditBoard } from './board/EditBoard'
import { APIMethods } from '~/api/apiClient'

export function Header() {
  const navigate = useNavigate()
  const [newTaskPopupOpen, setNewTaskPopupOpen] = useState<Boolean>(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<Boolean>(false)
  const { isLoggedIn, deleteBoard: updateStateOnDelete } = useBoards()
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
  return (
    <>
      <header className="flex justify-between items-center dark:bg-dark-grey dark:text-white p-4 [grid-area:header] w-full">
        <h1 className="heading-xl">Platform Launch</h1>
        <div className="flex gap-6 items-center">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="secondary-btn w-28 grid place-items-center"
            >
              Login{' '}
            </Link>
          )}
          <button
            className="primary-btn-l w-40 heading-m text-white"
            onClick={() => {
              if (!board) {
                toast.error('Please select a board first')
                return
              }
              handleAddNewTaskClick()
            }}
          >
            + Add New Task
          </button>
          <OptionsMenu
            handleDeleteBoardClick={handleDeleteBoardClick}
            handleEditBoardClick={handleEditBoardClick}
          />
        </div>
      </header>

      {newTaskPopupOpen && <NewTask closePopup={handleAddNewTaskClick} />}
      {isDeletePopupOpen && board && (
        <DeletePopup
          board={{ boardName: board.name, id: board.boardId }}
          deleteAction={deleteBoard}
          closePopup={handleDeleteBoardClick}
        />
      )}
      {isEditPopupOpen && board && (
        <EditBoard closePopup={handleEditBoardClick} />
      )}
    </>
  )
}
