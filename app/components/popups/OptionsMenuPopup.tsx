import { useEffect, useId, useRef } from 'react'

export function OptionsMenu({
  handleDeleteBoardClick,
  handleEditBoardClick,
}: {
  handleDeleteBoardClick: () => void
  handleEditBoardClick: () => void
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
        className="group cursor-pointer fill-[#828FA3] hover:fill-main-purple transition-colors block h-full"
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
        className="peer"
        hidden
      />
      <div className="absolute bg-very-dark-grey-dark-bg rounded-md right-0 top-8 p-4 hidden text-sm peer-checked:flex flex-col gap-3 w-48">
        <span
          onClick={handleEditBoardClick}
          className="text-medium-grey cursor-pointer hover:text-main-purple"
        >
          Edit board
        </span>
        <span
          onClick={handleDeleteBoardClick}
          className="text-red cursor-pointer hover:text-red/60"
        >
          Delete board
        </span>
      </div>
    </>
  )
}
