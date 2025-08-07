import ShowSideIcon from '@assets/icon-show-sidebar.svg'

export function ToggleSidebarBtn(props: { toggleSideBar: () => void }) {
  const { toggleSideBar } = props

  return (
    <button
      className="fixed bottom-10 dark:bg-main-purple dark:hover:bg-main-purple-hover transition-colors w-14 h-12 rounded-r-full grid place-content-center cursor-pointer"
      onClick={toggleSideBar}
    >
      <img src={ShowSideIcon} alt="" />
    </button>
  )
}
