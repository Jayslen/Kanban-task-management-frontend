import { NavLink } from 'react-router'
import { BoardIcon } from '~/assets/BoardIcon'

export function BoardAnchor({
  name,
  boardId,
  fucntionOnClick,
}: {
  name: string
  boardId: string
  fucntionOnClick?: () => void
}) {
  return (
    <li>
      <NavLink
        onClick={fucntionOnClick}
        to={`/board/${boardId}`}
        className={({ isActive }) =>
          `heading-m dark:text-medium-grey dark:hover:text-main-purple flex h-12 w-60 items-center gap-4 rounded-r-full px-7 transition-colors duration-300 md:w-[276px] dark:hover:bg-white ${isActive ? 'first:bg-main-purple first:text-white' : null}`
        }
      >
        <BoardIcon />
        {name}
      </NavLink>
    </li>
  )
}
