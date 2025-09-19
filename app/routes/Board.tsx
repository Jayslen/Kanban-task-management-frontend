import { useEffect, useState } from 'react'
import { redirect } from 'react-router'
import toast from 'react-hot-toast'
import { BoardTask } from '~/components/board/BoardTask'
import { TaskPopup } from '~/components/board/ViewTaskPopup'
import type { Task, Board } from '~/types/global'
import type { Route } from './+types/Board'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(
    `http://localhost:3000/board/${params.boardId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  if (!response.ok) {
    const responseError = await response.json()
    toast.error(responseError.message || 'Failed to fetch boards')
    return redirect('/')
  }

  const board = (await response.json()) as Board
  return board
}

export function HydrateFallback() {
  return (
    <section className="container mx-auto grid place-content-center">
      <h1 className="heading-l">Loading Board...</h1>
      <p className="text-medium-grey">
        Please wait while we load the board data.
      </p>
    </section>
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
  const { board, setCurrentBoard } = useCurrentBoard()
  useEffect(() => {
    setCurrentBoard(loaderData)
    return () => {
      setCurrentBoard(null)
    }
  }, [loaderData])

  const updateTasksSelected = (updatedTask: Task) => {
    setTaskSelected(updatedTask)
  }

  const closeTaskPopup = () => {
    setTaskSelected(null)
  }

  const columns = board?.columns
  const columnsCount = columns?.length ? columns.length + 1 : 1
  const status = columns?.map((col) => ({ name: col.name, id: col.id })) || []
  return (
    <section className="font-plus-jakarta-sans grid p-6 h-full w-full">
      <div
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, 280px)`,
          gridAutoRows: 'min-content',
        }}
        className="grid gap-6 overflow-auto custom-scrollbar"
      >
        {columns?.map(({ name, tasks }) => {
          return (
            <div>
              <header className="mb-4 flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full"></div>
                <h3 className="heading-s uppercase dark:text-medium-grey">{`${name} (${tasks.length})`}</h3>
              </header>
              <ul key={name} className="flex flex-col gap-5">
                {tasks.map((task) => {
                  return (
                    <BoardTask
                      task={task}
                      updateTasksSelected={updateTasksSelected}
                    />
                  )
                })}
              </ul>
            </div>
          )
        })}
        <div className="dark:bg-very-dark-grey-dark-bg grid place-content-center">
          <button className="heading-l text-medium-grey">+ New Column</button>
        </div>
      </div>
      {taskSelected && (
        <TaskPopup
          task={taskSelected}
          status={status}
          closePopup={closeTaskPopup}
        />
      )}
    </section>
  )
}
