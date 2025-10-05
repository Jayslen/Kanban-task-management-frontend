import { Outlet } from 'react-router'
import { useNavigation } from 'react-router'
import { Header } from '~/components/Header'
import { SideBar } from '~/components/Sidebar'
import { ToggleSidebarBtn } from '~/components/ToggleSidebar'
import { useGetAllBoards } from '~/hooks/useGetAllboards'

export default function Layout() {
  const { isSidebarOpen, toggleSidebarMenu } = useGetAllBoards()
  const navegation = useNavigation()
  const isNavegating = Boolean(navegation.location)
  return (
    <>
      <Header />
      {!isSidebarOpen && <ToggleSidebarBtn toggleSideBar={toggleSidebarMenu} />}
      {isSidebarOpen && <SideBar toggleSideBar={toggleSidebarMenu} />}
      <main className="[grid-area:content] overflow-hidden">
        <Outlet />
      </main>
    </>
  )
}
