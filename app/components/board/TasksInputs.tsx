import { useId, useRef, type ChangeEvent } from 'react'
import ArrowDown from '@assets/icon-chevron-down.svg'

export function TaskSelectInput({
  status,
  currentStatus,
  updateStatus,
}: {
  status: { name: string; id: number }[]
  currentStatus: { name: string; id: number } | undefined
  updateStatus: (status: { name: string; id: number }) => void
}) {
  const inputElement = useRef<HTMLInputElement>(null)
  const inputId = useId()
  return (
    <div className="h-10 border border-medium-grey/25 rounded-sm relative">
      <label
        htmlFor={inputId}
        className="flex justify-between items-center h-full px-4 typo-body-l dark:text-white cursor-pointer"
      >
        {currentStatus?.name}
        <img src={ArrowDown} alt="Arrow down icon" />
      </label>

      <input
        type="checkbox"
        ref={inputElement}
        name="task-status"
        id={inputId}
        className="hidden peer "
      />

      <ul className="hidden peer-checked:flex flex-col gap-2 typo-body-m p-4 rounded-lg dark:bg-very-dark-grey-dark-bg dark:text-medium-grey mt-1.5 cursor-pointer z-20 w-full">
        {status.map(({ name, id }) => {
          return (
            <li
              key={id}
              className="hover:text-main-purple"
              onClick={() => {
                updateStatus({ name, id })
                if (inputElement.current) {
                  inputElement.current.checked = false
                }
              }}
            >
              {name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function TaskCheckbox({
  taskTitle,
  isComplete,
  update,
}: {
  taskTitle: string
  isComplete: boolean
  update: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="min-h-10 rounded-md p-3.5 dark:bg-very-dark-grey-dark-bg grid grid-cols-[auto_1fr] items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={isComplete}
        name=""
        id=""
        className="peer hidden"
        onChange={(e) => update(e)}
      />
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

export function InputText({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="w-full dark:text-white relative flex flex-col gap-2">
      <span className="heading-m">{label}</span>
      <input
        type="text"
        {...props}
        className="outline text-sm outline-medium-grey/25 rounded-sm h-10 p-4 text-white/85 block grow w-full"
      />
    </label>
  )
}
