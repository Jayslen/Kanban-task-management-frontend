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
  useEffect(() => {
    document.body.style.display = 'grid'
    document.body.style.gridTemplateColumns = '300px 1fr'
    document.body.style.gridTemplateRows = 'auto 1fr'
    document.body.style.gridTemplateAreas = `
      "sidebar header"
      "sidebar content"
    `
    document.body.style.width = '100vw'
    document.body.style.height = '100vh'
  }, [])
  return (
    <>
      <Header />
      {!sideBarOpen && <ToggleSidebarBtn toggleSideBar={toggleSideBar} />}
      {sideBarOpen && <SideBar toggleSideBar={toggleSideBar} />}
      <main className="[grid-area:content] overflow-hidden">
        <Outlet />
      </main>
    </>
  )
}
