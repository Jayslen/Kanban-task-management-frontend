import type { Task } from '~/types/global'

export function BoardTask({
  task,
  updateTasksSelected,
}: {
  task: Task
  updateTasksSelected: (task: Task) => void
}) {
  const completedSubtasks = task?.subtasks?.filter(
    (subtask) => subtask.isComplete
  ).length
  return (
    <li
      className="flex flex-col justify-center gap-1 w-full min-h-20 rounded-lg p-4 cursor-pointer dark:bg-dark-grey transition-colors group"
      onClick={() => updateTasksSelected(task)}
    >
      <h3 className="dark:text-white heading-m group-hover:dark:hover:text-main-purple ">
        {task.name}
      </h3>
      <p className="typo-body-b dark:text-medium-grey">{`${completedSubtasks} of ${task?.subtasks?.length} substasks`}</p>
    </li>
  )
}
