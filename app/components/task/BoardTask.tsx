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
      className="dark:bg-dark-grey group flex min-h-20 w-full cursor-pointer flex-col justify-center gap-1 rounded-lg bg-white p-4 shadow-md"
      onClick={() => updateTasksSelected(task)}
    >
      <h3 className="heading-m dark:group-hover:text-main-purple transition-colors dark:text-white">
        {task.name}
      </h3>
      <p className="typo-body-b text-medium-grey">{`${completedSubtasks} of ${task?.subtasks?.length} substasks`}</p>
    </li>
  )
}
