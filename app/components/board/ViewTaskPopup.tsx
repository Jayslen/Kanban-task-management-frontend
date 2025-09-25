import type { Task } from '~/types/global'
import { TaskCheckbox } from './TasksInputs'
import { TaskSelectInput } from './TasksInputs'
import { Popup } from '../PopupLayout'
import { useTaskStatus } from '~/hooks/useTaskStatus'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { DeletePopup } from './DeletePopup'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function TaskPopup({
  task,
  closePopup,
}: {
  task: Task
  status: { name: string; id: number }[]
  closePopup: () => void
}) {
  const { name, description, column_id, subtasks } = task
  const { board, deleteTask } = useCurrentBoard()
  const { status, statusSelected, updateStatus } = useTaskStatus({
    columnStatusId: column_id,
    taskId: task.id,
    updateDB: true,
  })
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
  const handleDeleteBoardClick = () => {
    if (!task) {
      return toast.error('Please select a board first')
    }
    setIsDeletePopupOpen((prev) => !prev)
  }

  const completedSubtasks = subtasks?.filter(
    (subtask) => subtask.isComplete
  ).length

  return (
    <>
      <Popup closePopup={closePopup}>
        <header className="flex justify-between">
          <h2 className="dark:text-white heading-l">{name}</h2>
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
        </header>
        <p className="typo-body-m dark:text-white">
          {description || 'No description provided.'}
        </p>

        <div className="grow h-24 overflow-auto custom-scrollbar">
          <h3 className="heading-s dark:text-white mb-4">
            Subtasks {`(${completedSubtasks} of ${subtasks?.length})`}
          </h3>
          <ul className="flex flex-col gap-3">
            {subtasks &&
              subtasks.map((subtask) => (
                <li>
                  <TaskCheckbox taskTitle={subtask.name} />
                </li>
              ))}
          </ul>
        </div>

        <footer>
          <h3 className="heading-s dark:text-white mb-2">Current status</h3>
          <TaskSelectInput
            status={status}
            currentStatus={statusSelected}
            updateStatus={updateStatus}
          />
        </footer>
      </Popup>

      {isDeletePopupOpen && (
        <DeletePopup
          closePopup={handleDeleteBoardClick}
          task={{ id: task.id, title: task.name }}
          deleteAction={async () => {
            const response = await fetch(
              `http://localhost:3000/board/${board?.boardId}/task/${task.id}`,
              {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              }
            )

            if (!response.ok) {
              const errorResponse = await response.json()
              return toast.error(
                errorResponse.message || 'Something went wrong'
              )
            }

            deleteTask(task.id)
            handleDeleteBoardClick()
            closePopup()
            toast.success('Task deleted successfully')
          }}
        />
      )}
    </>
  )
}
