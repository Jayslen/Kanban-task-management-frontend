import { useId, useRef, useState } from 'react'
import ArrowDown from '@assets/icon-chevron-down.svg'
import crossIcon from '@assets/icon-cross.svg'

export function TaskSelectInput({
  status,
  defaultStatus,
}: {
  status: { name: string; id: number }[]
  defaultStatus: string | undefined
}) {
  const [currentStatus, setCurrentStatus] = useState(defaultStatus)
  const inputElement = useRef<HTMLInputElement>(null)
  return (
    <div className="h-10 border border-medium-grey/25 rounded-sm relative">
      <label
        htmlFor="task-status"
        className="flex justify-between items-center h-full px-4 typo-body-l dark:text-white cursor-pointer"
      >
        {currentStatus}
        <img src={ArrowDown} alt="Arrow down icon" />
      </label>

      <input
        type="checkbox"
        ref={inputElement}
        name="task-status"
        id="task-status"
        className="hidden peer "
      />

      <ul className="hidden peer-checked:flex flex-col gap-2 typo-body-m p-4 rounded-lg dark:bg-very-dark-grey-dark-bg dark:text-medium-grey mt-1.5 cursor-pointer z-20 absolute w-full">
        {status.map(({ name, id }) => {
          return (
            <li
              key={id}
              className="hover:text-main-purple"
              onClick={() => {
                setCurrentStatus(name)
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

export function FormInput(props: {
  label?: string
  placeholder?: string
  type?: string
  children?: React.ReactNode
}) {
  const { label, placeholder, type = 'text', children } = props
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="heading-m dark:text-white">
        {label}
      </label>
      {children && children}
      {!children && (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="border border-medium-grey/25 rounded-sm h-10 p-4 text-white/85 focus:outline-none"
        />
      )}
    </div>
  )
}

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

export function SubtaskInput() {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="e.g. Make coffee"
        className="border h-10 border-medium-grey/25 rounded-sm p-2 text-white/85 focus:outline-none grow"
      />
      <img src={crossIcon} alt="" className="" />
    </div>
  )
}
