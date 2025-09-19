import { useState, type FormEvent, type FormEventHandler } from 'react'
import { Popup } from '../PopupLayout'
import { FormInput, SubtaskInput } from './TasksInputs'
import { IconCross } from '@assets/IconCross'
import debounce from 'just-debounce-it'
import '../../inputStyles.css'
import type { Board } from '~/types/global'
import { useBoards } from '~/context/UseBoards'
import toast from 'react-hot-toast'

export function NewBoardPopup(props: { closePopup: () => void }) {
  const { closePopup } = props
  const [columns, setColumns] = useState(['', ''])
  const { newBoard } = useBoards()

  const updateColumnName = debounce((value: string, index: number) => {
    if (value.length === 0) return
    const newColumns = [...columns]
    newColumns[index] = value
    setColumns(newColumns)
  }, 600)

  const createNewBoard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [boardName, ...boardColumns] = Object.values(
      Object.fromEntries(new FormData(e.target as HTMLFormElement))
    )
    const newBoardInfo = { name: boardName, columns: boardColumns }

    const response = await fetch('http://localhost:3000/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoardInfo),
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error creating board:', errorData)
      toast.error(`Error: ${errorData.message || 'Could not create board'}`)
      return
    }

    const data = (await response.json()) as Board
    newBoard(data)
    closePopup()
  }

  return (
    <Popup closePopup={closePopup} height="449px">
      <header>
        <h2 className="heading-l dark:text-white">Add New Board</h2>
      </header>
      <form className="flex flex-col gap-6" onSubmit={createNewBoard}>
        <FormInput label="Board Name">
          <input
            type="text"
            name="boardName"
            placeholder="e.g. Web Design"
            className="border border-medium-grey/25 rounded-sm h-10 p-4 text-white/85 focus:outline-none"
          />
        </FormInput>
        <FormInput label="Columns">
          <div
            className=" flex flex-col gap-2 grow h-full overflow-auto custom-scrollbar"
            id="columnsContainer"
          >
            {columns.map((col, index) => (
              <label className="flex items-center gap-2 w-full p-1 relative ">
                <input
                  type="text"
                  placeholder="e.g. Make coffee"
                  className="outline outline-medium-grey/25 h-10 rounded-sm p-2 text-white/85 grow "
                  required
                  name={`column-${index}`}
                  minLength={4}
                  maxLength={20}
                  onChange={(e) => {
                    updateColumnName(e.target.value, index)
                  }}
                />
                <IconCross
                  className="text-[#828FA3] cursor-pointer hover:text-red"
                  onClick={() => {
                    setColumns((prev) => prev.filter((_, i) => i !== index))
                  }}
                />
              </label>
            ))}
            <button
              className="secondary-btn w-full mt-2"
              type="button"
              onClick={() => {
                const isColumnEmpty = columns.some((col) => col.length === 0)
                if (isColumnEmpty) {
                  const inputs = document
                    .getElementById('columnsContainer')
                    ?.getElementsByTagName('input')
                  Array.from(inputs || []).forEach((input) => {
                    if (input.value.length === 0) {
                      input.parentElement?.classList.add('column-empty')
                      setTimeout(() => {
                        input.parentElement?.classList.remove('column-empty')
                      }, 3000)
                    }
                  })

                  return
                }
                setColumns((prev) => [...prev, ''])
              }}
            >
              Add new column
            </button>
          </div>
        </FormInput>
        <button className="primary-btn-l w-full">Add new Board</button>
      </form>
    </Popup>
  )
}
