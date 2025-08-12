import { useState } from 'react'
import { NewTask } from './board/NewTaskPopup'

export function Header() {
  const [newTaskPopupOpen, setNewTaskPopupOpen] = useState<Boolean>(false)
  const handleAddNewTaskClick = () => {
    setNewTaskPopupOpen((prev) => !prev)
  }
  return (
    <>
      <header className="flex justify-between items-center dark:bg-dark-grey dark:text-white p-4 [grid-area:header]">
        <h1 className="heading-xl">Platform Launch</h1>
        <button
          className="primary-btn-l w-40 heading-m"
          onClick={handleAddNewTaskClick}
        >
          + Add New Task
        </button>
      </header>

      {newTaskPopupOpen && <NewTask closePopup={handleAddNewTaskClick} />}
    </>
  )
}
