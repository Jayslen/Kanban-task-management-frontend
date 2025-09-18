import { useState } from 'react'
import { Link } from 'react-router'
import { NewTask } from '~/components/board/NewTaskPopup'
import { useBoards } from '~/context/UseBoards'

export function Header() {
  const [newTaskPopupOpen, setNewTaskPopupOpen] = useState<Boolean>(false)
  const handleAddNewTaskClick = () => {
    setNewTaskPopupOpen((prev) => !prev)
  }
  const { isLoggedIn } = useBoards()
  return (
    <>
      <header className="flex justify-between items-center dark:bg-dark-grey dark:text-white p-4 [grid-area:header] w-full">
        <h1 className="heading-xl">Platform Launch</h1>
        <div className="flex gap-2">
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
            onClick={handleAddNewTaskClick}
          >
            + Add New Task
          </button>
        </div>
      </header>

      {newTaskPopupOpen && <NewTask closePopup={handleAddNewTaskClick} />}
    </>
  )
}
