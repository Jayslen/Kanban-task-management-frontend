import type { Route } from './+types/Board'
import type { Boards } from '~/types/global'
import { BoardTask } from '~/components/BoardTask'
import { TaskStatusColor } from '~/types/global'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch('../app/mockup/data.json')
  if (!response.ok) {
    throw new Error('Failed to fetch boards')
  }
  const boardsData = (await response.json()) as Boards
  const selectedBoard = boardsData.boards.find(
    (board) => board.id === params.boardId
  )

  return selectedBoard
}

export function HydrateFallback() {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="heading-l">Loading Board...</h1>
      <p className="text-medium-grey">
        Please wait while we load the board data.
      </p>
    </main>
  )
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Board - ${data?.name}` },
    { name: 'description', content: 'Board management page' },
  ]
}

export default function Board({ loaderData }: Route.ComponentProps) {
  const board = loaderData
  const columns = board?.columns
  const columnsCount = columns?.length ? columns.length + 1 : 1
  return (
    <main className="pt-16 p-6 container mx-auto font-plus-jakarta-sans overflow-auto min-h-screen">
      <section
        className={`grid grid-cols-[repeat(${columnsCount},280px)] h-full gap-6 overflow-auto overflow-y-auto
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:m-4
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:h-2
  [&::-webkit-scrollbar-thumb]:h-2
  [&::-webkit-scrollbar-thumb]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
      >
        {columns?.map(({ name, tasks }) => {
          const color = TaskStatusColor[name as keyof typeof TaskStatusColor]
          return (
            <div>
              <header className="mb-4 flex items-center gap-2">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <h3 className="heading-s uppercase dark:text-medium-grey">{`${name} (${tasks.length})`}</h3>
              </header>
              <ul key={name} className="flex flex-col gap-5">
                {tasks.map((task) => {
                  return <BoardTask task={task} />
                })}
              </ul>
            </div>
          )
        })}
        <div className="dark:bg-very-dark-grey-dark-bg grid place-content-center">
          <button className="heading-l text-medium-grey">+ New Column</button>
        </div>
      </section>
    </main>
  )
}
