export function TaskCheckbox({ taskTitle }: { taskTitle: string }) {
  return (
    <label className="min-h-10 rounded-md p-3.5 dark:bg-very-dark-grey-dark-bg grid grid-cols-[auto_1fr] items-center gap-2 cursor-pointer">
      <input type="checkbox" name="" id="" className="peer hidden" />
      <div className="w-4 h-4 rounded-[2px] grid place-content-center text-transparent border border-medium-grey bg-dark-grey peer-checked:bg-main-purple peer-checked:text-white peer-checked:border-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388"
            stroke-width="2"
          />
        </svg>
      </div>
      <span className="heading-s dark:text-white dark:peer-checked:text-medium-grey peer-checked:line-through">
        {taskTitle}
      </span>
    </label>
  )
}
