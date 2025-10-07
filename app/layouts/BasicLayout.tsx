import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
