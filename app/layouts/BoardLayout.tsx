import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from '~/components/Header'
import { SideBar } from '~/components/Sidebar'
import { ToggleSidebarBtn } from '~/components/ToggleSidebar'

export default function Layout() {
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(true)
  const toggleSideBar = () => {
    setSideBarOpen((prev) => !prev)
  }

  return (
    <>
      <Header isUserLoggedIn={true} />
      {!sideBarOpen && <ToggleSidebarBtn toggleSideBar={toggleSideBar} />}
      {sideBarOpen && <SideBar toggleSideBar={toggleSideBar} />}
      <main className="[grid-area:content] overflow-hidden">
        <Outlet />
      </main>
    </>
  )
}
