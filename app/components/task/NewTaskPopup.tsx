import { useAddNewTask } from '~/hooks/useAddNewTask'
import { Popup } from '../popups/PopupLayout'
import { InputText, TaskSelectInput } from './TasksInputs'
import { IconCross } from '~/assets/IconCross'

export function NewTask(props: { closePopup: () => void }) {
  const { closePopup } = props
  const {
    inputs,
    inputContainerId,
    updateInputValue,
    status,
    statusSelected,
    handleSubmit,
    addNewInput,
    deleteInput,
    updateStatus,
  } = useAddNewTask({ closePopup })
  return (
    <Popup closePopup={closePopup} height="675px">
      <header>
        <h2 className="heading-l dark:text-white">Add new task</h2>
      </header>
      <form className="grid grid-flow-row gap-4" onSubmit={handleSubmit}>
        <InputText
          label="Title"
          placeholder="e.g. Take coffee break"
          name="title"
          required
          minLength={6}
          maxLength={40}
        />
        <label className="text-white/75">
          <span className="heading-m">Description</span>
          <textarea
            name="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            minLength={8}
            maxLength={150}
            className="outline outline-medium-grey/25 rounded-sm p-4 text-white/85 block grow w-full mt-2 min-h-28 field-sizing-content resize-none"
          ></textarea>
        </label>
        <div className="h-full custom-scrollbar" id={inputContainerId}>
          <h3 className="heading-m dark:text-white">Subtasks</h3>
          {inputs.map((input, index) => (
            <div
              className="w-full flex items-center gap-4 relative"
              key={index}
            >
              <InputText
                label=""
                placeholder="e.g. Make coffee"
                name={`subtask-${index}`}
                minLength={4}
                maxLength={20}
                onChange={(e) => updateInputValue(e.target.value, index)}
              />
              <IconCross
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => deleteInput(input.id)}
              />
            </div>
          ))}
          <button
            className="secondary-btn w-full mt-2"
            type="button"
            onClick={addNewInput}
          >
            Add new subtask
          </button>
        </div>

        <div>
          <label className="heading-m dark:text-white">Status</label>
          <TaskSelectInput
            status={status}
            updateStatus={updateStatus}
            currentStatus={statusSelected}
          />
        </div>
        <button className="primary-btn-l w-full">Add new Task</button>
      </form>
    </Popup>
  )
}
