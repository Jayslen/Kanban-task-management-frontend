import { useId, useRef, type ChangeEvent } from 'react'
import ArrowDown from '@assets/icon-chevron-down.svg'

export function TaskSelectInput({
  status,
  currentStatus,
  updateStatus,
}: {
  status: { name: string; id: string }[]
  currentStatus: { name: string; id: string } | undefined
  updateStatus: (status: { name: string; id: string }) => void
}) {
  const inputElement = useRef<HTMLInputElement>(null)
  const inputId = useId()
  return (
    <div className="border-medium-grey/25 relative h-10 rounded-sm border">
      <label
        htmlFor={inputId}
        className="typo-body-l flex h-full cursor-pointer items-center justify-between px-4 text-[#000112] dark:text-white"
      >
        {currentStatus?.name}
        <img src={ArrowDown} alt="Arrow down icon" />
      </label>

      <input
        type="checkbox"
        ref={inputElement}
        name="task-status"
        id={inputId}
        className="peer hidden"
      />

      <ul className="typo-body-m dark:bg-very-dark-grey-dark-bg dark:text-medium-grey z-20 mt-1.5 hidden w-full cursor-pointer flex-col gap-2 rounded-lg p-4 peer-checked:flex">
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
    <label className="dark:bg-very-dark-grey-dark-bg bg-light-grey-light-bg hover:bg-main-purple/15 grid min-h-10 cursor-pointer grid-cols-[auto_1fr] items-center gap-2 rounded-md p-3.5 transition-colors">
      <input
        type="checkbox"
        defaultChecked={isComplete}
        name=""
        id=""
        className="peer hidden"
        onChange={(e) => update(e)}
      />
      <div className="border-medium-grey dark:bg-dark-grey peer-checked:bg-main-purple grid h-4 w-4 place-content-center rounded-[2px] border text-transparent peer-checked:border-0 peer-checked:text-white">
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
      <span className="heading-s dark:peer-checked:text-medium-grey peer-checked:text-medium-grey peer-checked:line-through dark:text-white">
        {taskTitle}
      </span>
    </label>
  )
}

export function InputText({
  label,
  ...props
}: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="text-medium-grey relative flex w-full flex-col gap-2 dark:text-white">
      <span className="heading-m">{label}</span>
      <input
        type="text"
        {...props}
        className="outline-medium-grey/25 block h-10 w-full grow rounded-sm p-4 text-sm text-[#000112] outline dark:text-white/85"
      />
    </label>
  )
}
