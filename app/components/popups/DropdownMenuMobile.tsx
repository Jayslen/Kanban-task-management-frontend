import { useRef } from 'react'
import { BoardAnchor } from '../board/BoardAnchor'
import ArrowDownIcon from '@assets/icon-chevron-down.svg'
import { BoardIcon } from '~/assets/BoardIcon'
import { ToggleTheme } from '../ToggleTheme'

export function DropdownMenuMobile({
  boards,
}: {
  boards: { name: string; boardId: string }[]
}) {
  const dropDownInput = useRef<HTMLInputElement>(null)

  return (
    <>
      <label htmlFor="dropdown" className="grid place-content-center md:hidden">
        <img
          src={ArrowDownIcon}
          alt="Arrow down icon"
          className="cursor-pointer"
        />
      </label>
      <input
        ref={dropDownInput}
        type="checkbox"
        id="dropdown"
        hidden
        className="peer block md:hidden"
      />
      <div className="bg-dark-grey absolute top-28 left-1/2 hidden min-h-56 w-full max-w-[264px] -translate-x-1/2 flex-col gap-3 rounded-lg py-4 peer-checked:flex md:hidden">
        <h4 className="heading-s dark:text-medium-grey px-4 uppercase">
          All boards ({boards.length})
        </h4>
        <ul className="grow">
          {boards.map((board) => {
            return (
              <BoardAnchor
                key={board.boardId}
                boardId={board.boardId}
                name={board.name}
                fucntionOnClick={() => {
                  if (dropDownInput.current) {
                    dropDownInput.current.checked = false
                  }
                }}
              />
            )
          })}
          <li>
            <button className="dark:text-main-purple heading-m group flex h-12 w-[276px] cursor-pointer items-center gap-4 rounded-r-full px-7">
              <BoardIcon />
              <span className="group-hover:text-main-purple-hover transition-colors">
                + Create New Board
              </span>
            </button>
          </li>
        </ul>
        <ToggleTheme />
      </div>
    </>
  )
}
