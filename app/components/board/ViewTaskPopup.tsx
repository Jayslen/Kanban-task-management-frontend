import { useState } from 'react'
import toast from 'react-hot-toast'
import type { Task } from '~/types/global'
import { TaskCheckbox } from './TasksInputs'
import { TaskSelectInput } from './TasksInputs'
import { Popup } from '../PopupLayout'
import { useTaskStatus } from '~/hooks/useTaskStatus'
import { DeletePopup } from './DeletePopup'
import { EditBoardBox } from '../EditBoardBox'
import { EditTask } from './EditTask'
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
  const { board, deleteTask, updateSubtaskStatus } = useCurrentBoard()
  const { status, statusSelected, updateStatus } = useTaskStatus({
    columnStatusId: column_id,
    taskId: task.id,
    updateDB: true,
  })
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<Boolean>(false)
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<Boolean>(false)
  const handleDeleteBoardClick = () => {
    if (!task) {
      return toast.error('Please select a board first')
    }
    setIsDeletePopupOpen((prev) => !prev)
  }

  const handleEditBoardClick = () => {
    if (!task) {
      return toast.error('Please select a board first')
    }
    setIsEditPopupOpen((prev) => !prev)
  }

  const [completedSubtasks, setCompletedSubtasks] = useState<number>(
    subtasks?.filter((subtask) => subtask.isComplete).length || 0
  )

  return (
    <>
      <Popup closePopup={closePopup}>
        <header className="flex justify-between relative">
          <h2 className="dark:text-white heading-l">{name}</h2>
          <EditBoardBox
            handleDeleteBoardClick={handleDeleteBoardClick}
            handleEditBoardClick={handleEditBoardClick}
          />
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
                <li key={subtask.id}>
                  <TaskCheckbox
                    isComplete={subtask.isComplete}
                    taskTitle={subtask.name}
                    update={async (e) => {
                      try {
                        const response = await fetch(
                          `http://localhost:3000/board/${board?.boardId}/task/${task.id}/subtask`,
                          {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                              subtaskId: subtask.id,
                              isCompleted: e.target.checked,
                            }),
                          }
                        )

                        if (!response.ok) {
                          const errorResponse = await response.json()
                          e.target.checked = !e.target.checked
                          return toast.error(
                            errorResponse.message || 'Something went wrong'
                          )
                        }

                        updateSubtaskStatus(
                          task.id,
                          subtask.id,
                          e.target.checked
                        )
                        setCompletedSubtasks((prev) => {
                          if (e.target.checked) return prev + 1
                          return prev - 1
                        })
                      } catch (error) {
                        e.target.checked = !e.target.checked
                        toast.error('Something went wrong')
                      }
                    }}
                  />
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
      {isEditPopupOpen && (
        <EditTask
          task={task}
          closePopup={() => {
            closePopup()
            handleEditBoardClick()
          }}
        />
      )}
    </>
  )
}
