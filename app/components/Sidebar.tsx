import { useState } from 'react'
import { NavLink } from 'react-router'
import LightModeLogo from '@assets/logo-light.svg'
import DarkModeLogo from '@assets/logo-dark.svg'
import { BoardIcon } from '@assets/BoardIcon'
import HideSideBarIcon from '@assets/icon-hide-sidebar.svg'
import { ToggleTheme } from './ToggleTheme'
import { NewBoardPopup } from './board/NewBoardPopup'
import { useBoards } from '~/context/UseBoards'
import toast from 'react-hot-toast'
import { BoardAnchor } from './board/BoardAnchor'
import { Logos } from './Logos'

export function SideBar(props: { toggleSideBar: () => void }) {
  const { toggleSideBar } = props
  const [newBoardPopupOpen, setNewBoardPopupOpen] = useState(false)
  const { boards, isLoggedIn } = useBoards()

  const handlePopup = () => {
    if (!isLoggedIn) return toast.error('You need to be logged in')
    setNewBoardPopupOpen((prev) => !prev)
  }

  return (
    <>
      {newBoardPopupOpen && <NewBoardPopup closePopup={() => handlePopup()} />}
      <aside className="dark:bg-dark-grey hidden h-screen w-[300px] grid-rows-[auto_1fr_auto] border-r-[1px] border-[#E4EBFA] bg-white [grid-area:sidebar] md:grid dark:border-0">
        <header className="mb-[54px] px-6 pt-6">
          <NavLink to="/">
            <Logos />
          </NavLink>
        </header>

        <nav className="flex h-full flex-col gap-4 overflow-y-auto">
          <h3 className="heading-s text-medium-grey px-7 uppercase">
            All boards ({boards?.length})
          </h3>
          <ul className="flex flex-col">
            {boards?.map((board) => (
              <li key={board.boardId}>
                <BoardAnchor
                  boardId={board.boardId}
                  name={board.name}
                  key={board.boardId}
                />
              </li>
            ))}
            <li>
              <button
                className="dark:text-main-purple heading-m group flex h-12 w-[276px] cursor-pointer items-center gap-4 rounded-r-full px-7"
                onClick={() => {
                  if (!isLoggedIn)
                    return toast.error('You need to be logged in')
                  handlePopup()
                }}
              >
                <BoardIcon />
                <span className="group-hover:text-main-purple-hover transition-colors">
                  + Create New Board
                </span>
              </button>
            </li>
          </ul>
        </nav>

        <footer className="flex flex-col gap-5">
          <ToggleTheme />
          <button
            className="dark:hover:text-main-purple hover:bg-main-purple/20 mb-6 flex h-12 w-[276px] cursor-pointer items-center gap-3 rounded-r-full px-6 transition-colors duration-300 dark:hover:bg-white"
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
