import { useIncreaseInputs } from '~/hooks/useIncreseInputs'
import { Popup } from '../PopupLayout'
import { InputText } from './TasksInputs'
import { IconCross } from '~/assets/IconCross'
import { useCurrentBoard } from '~/context/useCurrentBoard'
import debounce from 'just-debounce-it'
import { useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { useBoards } from '~/context/UseBoards'

export function EditBoard({ closePopup }: { closePopup: () => void }) {
  const { board, updateBoardColumns } = useCurrentBoard()
  const { updateBoard } = useBoards()
  const boardInfo = {
    name: board?.name,
    columns: board?.columns.map((col) => ({
      name: col.name,
      id: col.id,
      update: false,
    })),
  }
  const { inputs, inputContainerId, setInputs, addNewInput, deleteInput } =
    useIncreaseInputs(boardInfo.columns)
  const [columnsToDelete, setColumsToDelete] = useState<
    { id: number; remove: true }[]
  >([])
  const updateColumn = debounce(
    (
      e: ChangeEvent<HTMLInputElement>,
      col: { name: string; id: number } | string,
      index: number
    ) => {
      if (typeof col !== 'string' && col?.id) {
        const editColumn = { id: col.id, name: e.target.value, updated: true }
        const newInputs = [...inputs]
        newInputs[index] = editColumn
        setInputs(newInputs)
      } else {
        const newInputs = [...inputs]
        newInputs[index] = e.target.value
        setInputs(newInputs)
      }
    },
    300
  )

  return (
    <Popup closePopup={closePopup} height="449px">
      <header>
        <h2 className="heading-l dark:text-white">Edit Board</h2>
      </header>
      <form
        className="flex flex-col gap-6"
        onSubmit={async (e) => {
          e.preventDefault()
          const { boardName } = Object.fromEntries(
            new FormData(e.currentTarget)
          )
          const columns = inputs.reduce<{
            add: string[]
            edit: { id: number; payload?: string; remove?: boolean }[]
          }>(
            (acc, col) => {
              if (typeof col === 'string') {
                acc.add.push(col)
              } else if ('id' in col && 'updated' in col) {
                acc.edit.push({ id: col.id, payload: col.name })
              }
              return acc
            },
            { add: [], edit: [] }
          )

          columns.edit.push(...columnsToDelete)
          const response = await fetch(
            `http://localhost:3000/board/${board?.boardId}`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ name: boardName, columns }),
            }
          )
          if (!response.ok) {
            const errorResponse = await response.json()
            return toast.error(errorResponse.message || 'Something went wrong')
          }
          const boardResponse = await response.json()
          toast.success('Board updated successfully')
          updateBoard(boardResponse.boardId, boardResponse.name)
          updateBoardColumns(boardResponse.boardId, boardResponse.columns)
          closePopup()
        }}
      >
        <InputText
          label="Board Name"
          name="boardName"
          placeholder="e.g. Web Desing"
          defaultValue={boardInfo.name || ''}
        />
        <div
          className=" flex flex-col gap-2 grow h-full custom-scrollbar"
          id={inputContainerId}
        >
          <h3 className="heading-m dark:text-white">Columns</h3>
          {inputs.map((col, index) => (
            <div
              className="w-full flex items-center gap-4 relative"
              key={index}
            >
              <InputText
                label=""
                placeholder=""
                required
                defaultValue={col && typeof col !== 'string' ? col.name : ''}
                name={`column-${index}`}
                minLength={4}
                maxLength={20}
                onChange={(e) => {
                  updateColumn(e, col, index)
                }}
              />
              <IconCross
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => {
                  if (inputs.length <= 2)
                    return toast.error('A board must have at least 2 columns')
                  if (typeof col === 'string') return deleteInput(index)
                  setColumsToDelete((prev) => [
                    ...prev,
                    { id: col.id, remove: true },
                  ])
                  deleteInput(index)
                }}
              />
            </div>
          ))}
          <button
            className="secondary-btn w-full mt-2"
            type="button"
            onClick={addNewInput}
          >
            Add new column
          </button>
          <button className="primary-btn-l w-full">Add new Board</button>
        </div>
      </form>
    </Popup>
  )
}
