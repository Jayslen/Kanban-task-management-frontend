import type { Task } from '~/types/global'
import { TaskCheckbox } from './TasksInputs'
import { TaskSelectInput } from './TasksInputs'
import { Popup } from '../PopupLayout'

export function TaskPopup({
  task,
  status,
  closePopup,
}: {
  task: Task
  status: { name: string; id: number }[]
  closePopup: () => void
}) {
  const { name, description, column_id, subtasks } = task
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isComplete
  ).length
  const currentStatus = status.find((s) => s.id === column_id)?.name

  return (
    <Popup closePopup={closePopup}>
      <header>
        <h2 className="dark:text-white heading-l">{name}</h2>
      </header>
      <p className="typo-body-m dark:text-white">
        {description || 'No description provided.'}
      </p>

      <div className="grow h-24 overflow-auto custom-scrollbar">
        <h3 className="heading-s dark:text-white mb-4">
          Subtasks {`(${completedSubtasks} of ${subtasks.length})`}
        </h3>
        <ul className="flex flex-col gap-3">
          {subtasks.map((subtask) => (
            <li>
              <TaskCheckbox taskTitle={subtask.name} />
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <h3 className="heading-s dark:text-white mb-2">Current status</h3>
        <TaskSelectInput status={status} defaultStatus={currentStatus} />
      </footer>
    </Popup>
  )
}
