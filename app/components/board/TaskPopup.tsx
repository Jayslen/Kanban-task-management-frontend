import type { Task } from '~/types/global'
import { TaskCheckbox } from './TaskCheckbox'
import { TaskSelectInput } from './TaskSelectInput'

export function TaskPopup({
  task,
  onClose,
}: {
  task: Task
  onClose: () => void
}) {
  const { title, description, status, subtasks } = task
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length

  const handleBackdropClick = () => {
    console.log('Backdrop clicked, closing popup')
    onClose()
  }

  const handleSectionClick = (e: React.MouseEvent) => {
    // Prevent the backdrop click event from firing when clicking inside the section
    e.stopPropagation()
  }

  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 bg-black/50 grid place-content-center"
      onClick={handleBackdropClick}
    >
      <section
        className="w-[480px] h-[520px] flex flex-col gap-6 dark:bg-dark-grey rounded-md p-8"
        onClick={handleSectionClick}
      >
        <header>
          <h2 className="dark:text-white heading-l">{title}</h2>
        </header>
        <p className="typo-body-m dark:text-white">
          {description || 'No description provided.'}
        </p>

        <div className="grow h-full overflow-auto custom-scrollbar">
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
      </section>
    </div>
  )
}
