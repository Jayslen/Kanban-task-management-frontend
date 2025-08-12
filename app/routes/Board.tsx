import type { Route } from './+types/Board'
import type { Boards } from '~/types/global'
import { BoardTask } from '~/components/board/BoardTask'
import type { Task } from '~/types/global'
import { TaskStatusColor } from '~/types/global'
import { useState } from 'react'
import { TaskPopup } from '~/components/board/ViewTaskPopup'

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
  const [taskSelected, setTaskSelected] = useState<Task | null>(null)

  const updateTasks = (updatedTask: Task) => {
    setTaskSelected(updatedTask)
  }

  const closeTaskPopup = () => {
    setTaskSelected(null)
  }

  const board = loaderData
  const columns = board?.columns
  const columnsCount = columns?.length ? columns.length + 1 : 1
  return (
    <main className="p-6 container mx-auto font-plus-jakarta-sans overflow-auto min-h-[90vh] [grid-area:content]">
      <section
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, 280px)`,
        }}
        className="grid h-full gap-6 overflow-auto overflow-y-auto custom-scrollbar"
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
                  return <BoardTask task={task} updatedTask={updateTasks} />
                })}
              </ul>
            </div>
          )
        })}
        <div className="dark:bg-very-dark-grey-dark-bg grid place-content-center">
          <button className="heading-l text-medium-grey">+ New Column</button>
        </div>
      </section>
      {taskSelected && (
        <TaskPopup task={taskSelected} closePopup={closeTaskPopup} />
      )}
    </main>
  )
}
