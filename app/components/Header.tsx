import { Link } from 'react-router'
import { NewTask } from '~/components/task/NewTaskPopup'
import { DeletePopup } from './popups/DeletePopup'
import { OptionsMenu } from './popups/OptionsMenuPopup'
import { DropdownMenuMobile } from './popups/DropdownMenuMobile'
import { EditBoard } from './board/EditBoard'
import { useHeader } from '~/hooks/useheader'
import MobileLogo from '@assets/logo-mobile.svg'

export function Header() {
  const {
    board,
    boards,
    isLoggedIn,
    newTaskPopupOpen,
    isDeletePopupOpen,
    isEditPopupOpen,
    handleAddNewTaskClick,
    handleDeleteBoardClick,
    handleEditBoardClick,
    deleteBoard,
  } = useHeader()

  return (
    <>
      <header className="dark:bg-dark-grey flex w-full items-center justify-between border-[1px] border-[#E4EBFA] p-4 [grid-area:header] dark:border-0 dark:text-white">
        <div className="flex gap-2">
          <img
            src={MobileLogo}
            alt="App logo for mobile"
            className="sm:hidden"
          />
          <h1 className="heading-xl">Platform Launch</h1>
          <DropdownMenuMobile boards={boards || []} />
        </div>

        <nav className="flex items-center gap-6">
          {!isLoggedIn && (
            <Link
              to="/login"
              className="secondary-btn grid w-28 place-items-center"
            >
              Login{' '}
            </Link>
          )}
          <button
            className="primary-btn-l heading-m flex w-12 items-center justify-center gap-2 text-white md:w-40"
            onClick={handleAddNewTaskClick}
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
            <span className="hidden md:block">Add New Task</span>
          </button>
          <OptionsMenu
            handleDeleteBoardClick={handleDeleteBoardClick}
            handleEditBoardClick={handleEditBoardClick}
          />
        </nav>
      </header>

      {newTaskPopupOpen && <NewTask closePopup={handleAddNewTaskClick} />}
      {isDeletePopupOpen && board && (
        <DeletePopup
          board={{ boardName: board.name, id: board.boardId }}
          deleteAction={deleteBoard}
          closePopup={handleDeleteBoardClick}
        />
      )}
      {isEditPopupOpen && board && (
        <EditBoard closePopup={handleEditBoardClick} />
      )}
    </>
  )
}
