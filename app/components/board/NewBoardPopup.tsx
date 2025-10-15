import { type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useBoards } from '~/context/UseBoards'
import { useIncreaseInputs } from '~/hooks/useIncreseInputs'
import { Popup } from '../popups/PopupLayout'
import { InputText } from '../task/TasksInputs'
import { IconCross } from '@assets/IconCross'
import '../../inputStyles.css'
import { APIMethods } from '~/api/apiClient'

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
    const newBoardInfo = {
      name: boardName as string,
      columns: boardColumns as string[],
    }

    try {
      const response = await APIMethods.CreateBoard(newBoardInfo)
      newBoard(response)
      toast.success('Board created successfully')
      closePopup()
    } catch (error) {
      console.error('Error creating board:', error)
      toast.error(`${(error as Error).message || 'Could not create board'}`)
    }
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
          className="custom-scrollbar flex h-full grow flex-col gap-2"
          data-testid="columns-container"
          id={inputContainerId}
        >
          <h3 className="heading-m text-medium-grey dark:text-white">
            Columns
          </h3>
          {inputs.map((col, index) => (
            <div
              className="relative flex w-full items-center gap-4"
              key={index}
            >
              <InputText
                placeholder="e.g. Todo"
                required
                name={`column-${index}`}
                minLength={4}
                maxLength={20}
                onChange={(e) => updateInputValue(e.target.value, index)}
              />
              <IconCross
                className="hover:text-red cursor-pointer text-[#828FA3]"
                onClick={() => deleteInput(col.id)}
              />
            </div>
          ))}
          <button
            className="secondary-btn mt-2 w-full"
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
