import type { Task } from '~/types/global'
import { TaskCheckbox } from './TasksInputs'
import { TaskSelectInput } from './TasksInputs'
import { Popup } from '../popups/PopupLayout'
import { DeletePopup } from '../popups/DeletePopup'
import { OptionsMenu } from '../popups/OptionsMenuPopup'
import { EditTask } from '../task/EditTask'
import { useTask } from '~/hooks/useTask'

export function TaskPopup({
  task,
  closePopup,
}: {
  task: Task
  status: { name: string; id: string }[]
  closePopup: () => void
}) {
  const {
    name,
    description,
    subtasks,
    completedSubtasks,
    status,
    statusSelected,
    isDeletePopupOpen,
    isEditPopupOpen,
    handleDeleteBoardClick,
    handleEditBoardClick,
    updateStatus,
    deleteTask,
    updateSubtaskStatus,
  } = useTask(task, closePopup)

  return (
    <>
      <Popup closePopup={closePopup}>
        <header className="flex justify-between relative">
          <h2 className="dark:text-white heading-l">{name}</h2>
          <OptionsMenu
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
                    update={async (e) => updateSubtaskStatus(e, subtask.id)}
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
          deleteAction={deleteTask}
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
