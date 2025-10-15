import { useEffect, useId, useRef } from 'react'

export function OptionsMenu({
  handleDeleteBoardClick,
  handleEditBoardClick,
  isBoard = true,
}: {
  handleDeleteBoardClick: () => void
  handleEditBoardClick: () => void
  isBoard?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (
        inputRef.current &&
        e.target !== inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        inputRef.current.checked = false
      }
    })

    return () => {
      document.body.removeEventListener('click', () => {})
    }
  })
  return (
    <>
      <label
        htmlFor={inputId}
        className="group hover:fill-main-purple block h-full cursor-pointer fill-[#828FA3] transition-colors"
      >
        <svg
          width="5"
          height="20"
          viewBox="0 0 5 20"
          fill="auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.30769" cy="2.30769" r="2.30769" fill="auto" />
          <circle cx="2.30769" cy="10" r="2.30769" fill="auto" />
          <circle cx="2.30769" cy="17.6923" r="2.30769" fill="auto" />
        </svg>
      </label>
      <input
        ref={inputRef}
        type="checkbox"
        id={inputId}
        name="dropdown"
        className="peer"
        hidden
      />
      <div className="dark:bg-very-dark-grey-dark-bg absolute top-8 right-0 hidden w-48 flex-col gap-3 rounded-md bg-white p-4 text-sm peer-checked:flex">
        <span
          onClick={handleEditBoardClick}
          className="text-medium-grey hover:text-main-purple cursor-pointer"
        >
          Edit {isBoard ? 'board' : 'task'}
        </span>
        <span
          onClick={handleDeleteBoardClick}
          className="text-red hover:text-red/60 cursor-pointer"
        >
          Delete {isBoard ? 'board' : 'task'}
        </span>
      </div>
    </>
  )
}
