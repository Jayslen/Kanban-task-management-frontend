import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { NewTask } from '~/components/board/NewTaskPopup'
import { useBoards } from '~/context/UseBoards'
import { useCurrentBoard } from '~/context/useCurrentBoard'
import { DeletePopup } from './board/DeletePopup'

export function Header() {
  const navigate = useNavigate()
  const [newTaskPopupOpen, setNewTaskPopupOpen] = useState<Boolean>(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
  const { isLoggedIn, deleteBoard } = useBoards()
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
  return (
    <>
      <header className="flex justify-between items-center dark:bg-dark-grey dark:text-white p-4 [grid-area:header] w-full">
        <h1 className="heading-xl">Platform Launch</h1>
        <div className="flex gap-6">
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
          <button
            className="group cursor-pointer fill-[#828FA3] hover:fill-main-purple transition-colors"
            onClick={handleDeleteBoardClick}
          >
            <svg
              width="5"
              height="20"
              viewBox="0 0 5 20"
              fill="auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2.30769" cy="2.30769" r="2.30769" fill="auto" />
              <circle cx="2.30769" cy="10" r="2.30769" fill="auto" />
              <circle cx="2.30769" cy="17.6923" r="2.30769" fill="auto" />
            </svg>
          </button>
        </div>
      </header>

      {newTaskPopupOpen && <NewTask closePopup={handleAddNewTaskClick} />}
      {isDeletePopupOpen && board && (
        <DeletePopup
          board={{ boardName: board.name, id: board.boardId }}
          deleteAction={async () => {
            const response = await fetch(
              `http://localhost:3000/board/${board.boardId}`,
              {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            if (!response.ok) {
              const errorResponse = await response.json()
              toast.error(errorResponse.message || 'Something went wrong')
            }
            deleteBoard(board.boardId)
            handleDeleteBoardClick()
            toast.success('Board deleted successfully')
            navigate('/')
          }}
          closePopup={handleDeleteBoardClick}
        />
      )}
    </>
  )
}
