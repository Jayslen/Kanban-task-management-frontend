import type { Task } from '~/types/global'
import { TaskCheckbox } from './TasksInputs'
import { TaskSelectInput } from './TasksInputs'
import { Popup } from '../PopupLayout'

export function TaskPopup({
  task,
  closePopup,
}: {
  task: Task
  closePopup: () => void
}) {
  const { title, description, status, subtasks } = task
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length

  return (
    <Popup closePopup={closePopup}>
      <header>
        <h2 className="dark:text-white heading-l">{title}</h2>
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
              <TaskCheckbox taskTitle={subtask.title} />
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <h3 className="heading-s dark:text-white mb-2">Current status</h3>
        <TaskSelectInput status={status} />
      </footer>
    </Popup>
  )
}
