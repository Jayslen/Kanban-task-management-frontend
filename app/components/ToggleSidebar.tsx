import ShowSideIcon from '@assets/icon-show-sidebar.svg'

export function ToggleSidebarBtn(props: { toggleSideBar: () => void }) {
  const { toggleSideBar } = props

  return (
    <button
      className="dark:bg-main-purple dark:hover:bg-main-purple-hover fixed bottom-10 grid h-12 w-14 cursor-pointer place-content-center rounded-r-full transition-colors"
      onClick={toggleSideBar}
    >
      <img src={ShowSideIcon} alt="" />
    </button>
  )
}
