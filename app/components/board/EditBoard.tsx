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
          className=" flex flex-col gap-2 grow h-full custom-scrollbar"
          id={inputContainerId}
        >
          <h3 className="heading-m dark:text-white">Columns</h3>
          {inputs.map((col, index) => (
            <div
              className="w-full flex items-center gap-4 relative"
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
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => handleDeleteColumn(col)}
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
