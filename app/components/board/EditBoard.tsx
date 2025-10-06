import { IconCross } from '~/assets/IconCross'
import { Popup } from '../popups/PopupLayout'
import { InputText } from '../task/TasksInputs'
import { useEditBoard } from '~/hooks/useEditBoard'

export function EditBoard({ closePopup }: { closePopup: () => void }) {
  const {
    boardName,
    inputContainerId,
    inputs,
    updateColumn,
    handleDeleteColumn,
    addNewInput,
    handleSubmitBoard,
  } = useEditBoard(closePopup)
  return (
    <Popup closePopup={closePopup} height="449px">
      <header>
        <h2 className="heading-l dark:text-white">Edit Board</h2>
      </header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmitBoard}>
        <InputText
          label="Board Name"
          name="boardName"
          placeholder="e.g. Web Desing"
          defaultValue={boardName}
        />
        <div
          className="custom-scrollbar flex h-full grow flex-col gap-2"
          id={inputContainerId}
        >
          <h3 className="heading-m dark:text-white">Columns</h3>
          {inputs.map((col, index) => (
            <div
              className="relative flex w-full items-center gap-4"
              key={col.id}
            >
              <InputText
                required
                placeholder="e.g. Todo"
                defaultValue={col.name}
                minLength={4}
                maxLength={20}
                onChange={(e) => {
                  updateColumn(e, col, index)
                }}
              />
              <IconCross
                className="hover:text-red cursor-pointer text-[#828FA3]"
                onClick={() => handleDeleteColumn(col)}
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
