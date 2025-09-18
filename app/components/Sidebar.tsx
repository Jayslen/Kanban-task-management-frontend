import { useState } from 'react'
import { NavLink } from 'react-router'
import LogoSvg from '@assets/logo-light.svg'
import { BoardIcon } from '@assets/BoardIcon'
import HideSideBarIcon from '@assets/icon-hide-sidebar.svg'
import { Toggle } from './Toggle'
import { NewBoardPopup } from './board/NewBoardPopup'
import { useBoards } from '~/context/UseBoards'

export function SideBar(props: { toggleSideBar: () => void }) {
  const { toggleSideBar } = props
  const [newBoardPopupOpen, setNewBoardPopupOpen] = useState(false)
  const { boards } = useBoards()

  const handlePopup = () => {
    setNewBoardPopupOpen((prev) => !prev)
  }

  return (
    <>
      {newBoardPopupOpen && <NewBoardPopup closePopup={() => handlePopup()} />}
      <aside className="w-[300px] h-screen dark:bg-dark-grey grid grid-rows-[auto_1fr_auto] [grid-area:sidebar]">
        <header className="px-6 pt-6 mb-[54px]">
          <NavLink to="/">
            <img src={LogoSvg} alt="Logo kaban" />
          </NavLink>
        </header>

        <nav className="flex flex-col gap-4">
          <h3 className="heading-s text-medium-grey uppercase px-7">
            All boards ({boards?.length})
          </h3>
          <ul className="flex flex-col ">
            {boards?.map((board) => (
              <li key={board.boardId}>
                <NavLink
                  to={`/board/${board.boardId}`}
                  className={({ isActive }) =>
                    `w-[276px] h-12 heading-m flex items-center px-7 gap-4 rounded-r-full transition-colors duration-300 dark:text-medium-grey dark:hover:text-main-purple dark:hover:bg-white ${isActive ? 'first:bg-main-purple first:text-white' : null}`
                  }
                >
                  <BoardIcon />
                  {board.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="dark:text-main-purple w-[276px] h-12 heading-m px-7 flex items-center gap-4 rounded-r-full"
                onClick={() => handlePopup()}
              >
                <BoardIcon />
                <span>+ Create New Board</span>
              </button>
            </li>
          </ul>
        </nav>

        <footer className="flex flex-col gap-5 ">
          <Toggle />
          <button
            className="flex items-center gap-3 px-6 mb-6 h-12 rounded-r-full w-[276px] cursor-pointer transition-colors duration-300 hover:dark:bg-white hover:dark:text-main-purple"
            onClick={toggleSideBar}
          >
            <img src={HideSideBarIcon} alt="" />
            <span className="text-medium-grey heading-m">Hide sidebar</span>
          </button>
        </footer>
      </aside>
    </>
  )
}
