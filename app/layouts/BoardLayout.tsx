import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from '~/components/Header'
import { SideBar } from '~/components/Sidebar'
import { ToggleSidebarBtn } from '~/components/ToggleSidebar'
import { useBoards } from '~/context/UseBoards'

export default function Layout() {
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(true)
  const toggleSideBar = () => setSideBarOpen((prev) => !prev)
  const { addBoard } = useBoards()

  useEffect(() => {
    document.body.classList.add('board-layout')
    return () => {
      document.body.classList.remove('board-layout')
    }
  }, [])

  useEffect(() => {
    const getBoards = async () => {
      const response = await fetch('http://localhost:3000/board', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      if (!response.ok) {
        const responseError = await response.json()
        console.error(responseError.message)
      } else {
        const boardsResponse = await response.json()
        addBoard(boardsResponse)
      }
    }

    getBoards()
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
