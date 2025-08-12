import { Popup } from '../PopupLayout'
import { FormInput, SubtaskInput } from './TasksInputs'

export function NewBoardPopup(props: { closePopup: () => void }) {
  const { closePopup } = props
  return (
    <Popup closePopup={closePopup}>
      <header>
        <h2 className="heading-l dark:text-white">Add New Board</h2>
      </header>
      <form className="flex flex-col gap-6">
        <FormInput label="Board Name" placeholder="e.g. Web Design" />
        <FormInput label="Subtasks">
          <div className=" flex flex-col gap-2 grow h-full overflow-auto custom-scrollbar">
            <SubtaskInput />
            <SubtaskInput />

            <button className="secondary-btn w-full mt-2" type="button">
              + Add New Subtask
            </button>
          </div>
        </FormInput>
        <button className="primary-btn-l w-full">Add new Board</button>
      </form>
    </Popup>
  )
}
