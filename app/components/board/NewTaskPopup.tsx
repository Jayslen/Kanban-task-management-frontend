import { Popup } from '../PopupLayout'
import { FormInput, SubtaskInput, TaskSelectInput } from './TasksInputs'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function NewTask(props: { closePopup: () => void }) {
  const { closePopup } = props
  const { board } = useCurrentBoard()
  const status =
    board?.columns.map((col) => ({ name: col.name, id: col.id })) || []
  return (
    <Popup closePopup={closePopup}>
      <header>
        <h2 className="heading-l dark:text-white">Add new task</h2>
      </header>
      <form className="flex flex-col gap-6">
        <FormInput label="Title" placeholder="e.g. Take coffee break" />
        <FormInput
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        >
          <textarea
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            className="border border-medium-grey/25 rounded-sm h-28 p-4 text-white/85 focus:outline-none resize-none"
          />
        </FormInput>
        <FormInput label="Subtasks">
          <div className=" flex flex-col gap-2 grow  overflow-auto custom-scrollbar">
            <SubtaskInput />
            <SubtaskInput />
            <SubtaskInput />
            <SubtaskInput />
            <SubtaskInput />
          </div>
          <button className="secondary-btn w-full mt-2" type="button">
            + Add New Subtask
          </button>
        </FormInput>

        <div>
          <label className="heading-m dark:text-white">Status</label>
          <TaskSelectInput defaultStatus={status[0].name} status={status} />
        </div>
        <button className="primary-btn-l w-full">Add new Task</button>
      </form>
    </Popup>
  )
}
