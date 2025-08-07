import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { SideBar } from './components/Sidebar'
import { Header } from './components/Header'
import { useState } from 'react'
import { ToggleSidebarBtn } from './components/ToggleSideBar'

export function links() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap',
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [sideBarOpen, setSideBarOpen] = useState<Boolean>(true)
  const toggleSideBar = () => {
    setSideBarOpen((prev) => !prev)
  }
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className="grid grid-cols-[300px_1fr]"
        style={{
          gridTemplateAreas: sideBarOpen
            ? '"sidebar header" "sidebar content"'
            : '"header header" "content content"',
        }}
      >
        {!sideBarOpen && <ToggleSidebarBtn toggleSideBar={toggleSideBar} />}
        {sideBarOpen && <SideBar toggleSideBar={toggleSideBar} />}
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
