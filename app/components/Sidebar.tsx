import { use, useEffect, useState } from 'react'
import LogoSvg from '@assets/logo-light.svg'
import { BoardIcon } from '@assets/BoardIcon'
import HideSideBarIcon from '@assets/icon-hide-sidebar.svg'
import data from '../mockup/data.json'
import { type Board, type Boards } from '@globlaTypes'
import { Toggle } from './Toggle'
import { useNavigate, NavLink } from 'react-router'

export function SideBar() {
  const [boards, setBoards] = useState<Board[]>()

  useEffect(() => {
    // Simulate fetching boards from an API or data source
    const fetchBoards = async () => {
      const response = await fetch('../app/mockup/data.json')
      if (!response.ok) {
        throw new Error('Failed to fetch boards')
      }
      const bordsData = (await response.json()) as Boards
      setBoards(bordsData.boards)
    }
    fetchBoards()
  }, [])

  return (
    <aside className="w-[300px] h-screen dark:bg-dark-grey grid grid-rows-[auto_1fr_auto]">
      <header className="px-6 pt-6 mb-[54px]">
        <NavLink to="/">
          <img src={LogoSvg} alt="Logo kaban" />
        </NavLink>
      </header>

      <nav className="flex flex-col gap-4">
        <h3 className="heading-s text-medium-grey uppercase px-7">
          All boards (8)
        </h3>
        <ul className="flex flex-col ">
          {boards?.map((board) => (
            <li key={board.id}>
              <NavLink
                to={`/board/${board.id}`}
                className={({ isActive }) =>
                  `dark:text-medium-grey w-[276px] h-12 heading-m flex items-center gap-4 rounded-r-full ${isActive ? 'first:bg-main-purple first:text-white' : null} px-7`
                }
              >
                <BoardIcon />
                {board.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button className="dark:text-main-purple w-[276px] h-12 heading-m px-7 flex items-center gap-4 rounded-r-full">
              <BoardIcon />
              <span>+ Create New Board</span>
            </button>
          </li>
        </ul>
      </nav>

      <footer className="flex flex-col gap-5 p-6">
        <Toggle />
        <button className="flex gap-3 items-center cursor-pointer">
          <img src={HideSideBarIcon} alt="" />
          <span className="text-medium-grey heading-m">Hide sidebar</span>
        </button>
      </footer>
    </aside>
  )
}
