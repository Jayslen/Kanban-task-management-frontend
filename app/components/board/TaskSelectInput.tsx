import ArrowDown from '@assets/icon-chevron-down.svg'
export function TaskSelectInput(props: { status: string }) {
  const { status } = props
  return (
    <div className="h-10 border border-medium-grey/25 rounded-sm">
      <label
        htmlFor="task-status"
        className="flex justify-between items-center h-full px-4 typo-body-l dark:text-white cursor-pointer"
      >
        {status}
        <img src={ArrowDown} alt="Arrow down icon" />
      </label>

      <input
        type="checkbox"
        name="task-status"
        id="task-status"
        className="hidden peer "
      />

      <ul className="hidden peer-checked:flex flex-col gap-2 typo-body-m p-4 rounded-lg dark:bg-very-dark-grey-dark-bg dark:text-medium-grey mt-1.5 cursor-pointer">
        <li>Doing</li>
        <li>Done</li>
        <li>To do</li>
      </ul>
    </div>
  )
}
