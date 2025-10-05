import { IconCross } from '~/assets/IconCross'
import { InputText, TaskSelectInput } from '../task/TasksInputs'
import { Popup } from '../popups/PopupLayout'
import type { Task } from '~/types/global'
import { useEditTask } from '~/hooks/useEditTask'

export function EditTask({
  task,
  closePopup,
}: {
  task: Task
  closePopup: () => void
}) {
  const {
    name,
    description,
    inputs,
    inputContainerId,
    updateSubtasks,
    status,
    statusSelected,
    handleEditTask,
    addNewInput,
    removeSubtask,
    updateStatus,
  } = useEditTask(task, closePopup)

  return (
    <Popup closePopup={closePopup} height="675px">
      <header>
        <h2 className="heading-l dark:text-white">Edit task</h2>
      </header>
      <form className="grid grid-flow-row gap-4" onSubmit={handleEditTask}>
        <InputText
          label="Title"
          defaultValue={name}
          placeholder="e.g. Take coffee break"
          name="taskName"
          required
          minLength={6}
          maxLength={40}
        />
        <label className="text-white/75">
          <span className="heading-m">Description</span>
          <textarea
            name="description"
            defaultValue={description || ''}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            minLength={8}
            maxLength={150}
            className="outline outline-medium-grey/25 rounded-sm p-4 text-white/85 block grow w-full mt-2 min-h-28 field-sizing-content resize-none"
          ></textarea>
        </label>
        <div className="h-full custom-scrollbar" id={inputContainerId}>
          <h3 className="heading-m dark:text-white">Subtasks</h3>
          {inputs.map((subtask, index) => (
            <div className="w-full flex items-center gap-4 relative">
              <InputText
                label=""
                key={subtask.id}
                defaultValue={
                  typeof subtask === 'string' ? subtask : subtask.name
                }
                placeholder="e.g. Make coffee"
                minLength={4}
                maxLength={20}
                onChange={(e) => {
                  updateSubtasks({ value: e.target.value, subtask, index })
                }}
              />
              <IconCross
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => {
                  removeSubtask(subtask)
                }}
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
        <button className="primary-btn-l w-full">Save changes</button>
      </form>
    </Popup>
  )
}
