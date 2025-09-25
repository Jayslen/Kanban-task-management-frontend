import { type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useBoards } from '~/context/UseBoards'
import { useIncreaseInputs } from '~/hooks/useIncreseInputs'
import { Popup } from '../PopupLayout'
import { InputText } from './TasksInputs'
import type { Board } from '~/types/global'
import { IconCross } from '@assets/IconCross'
import '../../inputStyles.css'

export function NewBoardPopup(props: { closePopup: () => void }) {
  const { closePopup } = props
  const { newBoard } = useBoards()
  const {
    inputs,
    inputContainerId,
    updateInputValue,
    addNewInput,
    deleteInput,
  } = useIncreaseInputs()

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
    toast.success('Board created successfully')
    closePopup()
  }

  return (
    <Popup closePopup={closePopup} height="449px">
      <header>
        <h2 className="heading-l dark:text-white">Add New Board</h2>
      </header>
      <form className="flex flex-col gap-6" onSubmit={createNewBoard}>
        <InputText
          label="Board Name"
          name="boardName"
          placeholder="e.g. Web Desing"
        />
        <div
          className=" flex flex-col gap-2 grow h-full custom-scrollbar"
          id={inputContainerId}
        >
          <h3 className="heading-m dark:text-white">Columns</h3>
          {inputs.map((_, index) => (
            <div
              className="w-full flex items-center gap-4 relative"
              key={index}
            >
              <InputText
                label=""
                placeholder=""
                required
                name={`column-${index}`}
                minLength={4}
                maxLength={20}
                onChange={(e) => updateInputValue(e.target.value, index)}
              />
              <IconCross
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => deleteInput(index)}
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
