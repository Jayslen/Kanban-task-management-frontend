import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <main className="m-auto text-center">
      <h2 className="text-medium-grey heading-l my-2">No board selected</h2>
    </main>
  )
}
