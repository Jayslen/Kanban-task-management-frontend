import type { Task } from '~/types/global'

export function BoardTask({ task }: { task: Task }) {
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length
  return (
    <li className="w-full min-h-20 rounded-lg dark:bg-dark-grey flex flex-col justify-center p-4 gap-1">
      <h3 className="dark:text-white heading-m">{task.title}</h3>
      <p className="typo-body-b dark:text-medium-grey">{`${completedSubtasks} of ${task.subtasks.length} substasks`}</p>
    </li>
  )
}
