import { IconCross } from '~/assets/IconCross'
import { InputText, TaskSelectInput } from './TasksInputs'
import { Popup } from '../PopupLayout'
import { useIncreaseInputs } from '~/hooks/useIncreseInputs'
import { useTaskStatus } from '~/hooks/useTaskStatus'
import type { Task } from '~/types/global'
import debounce from 'just-debounce-it'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCurrentBoard } from '~/context/useCurrentBoard'

export function EditTask({
  task,
  closePopup,
}: {
  task: Task
  closePopup: () => void
}) {
  const { name, description, column_id, subtasks } = task
  const { inputs, inputContainerId, setInputs, addNewInput, deleteInput } =
    useIncreaseInputs(subtasks?.map((s) => ({ id: s.id, name: s.name })))
  const { status, statusSelected, updateStatus } = useTaskStatus({
    columnStatusId: column_id,
    taskId: task.id,
    updateDB: true,
  })
  const [subtastToDelete, setSubtaskToDelete] = useState<{ id: number }[]>([])
  const updateSubtasks = debounce(
    ({
      value,
      subtask,
      index,
    }: {
      value: string
      subtask: Partial<Task>
      index: number
    }) => {
      setInputs((prev) => {
        const inputs = prev
        if (typeof subtask !== 'string') {
          inputs[index].updated = true
          inputs[index].name = value
        } else {
          inputs[index] = value
        }
        return inputs
      })
    },
    300
  )
  const { board, updatetask } = useCurrentBoard()
  return (
    <Popup closePopup={closePopup} height="675px">
      <header>
        <h2 className="heading-l dark:text-white">Edit task</h2>
      </header>
      <form
        className="grid grid-flow-row gap-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const { taskName: name, description } = Object.fromEntries(
            new FormData(e.currentTarget)
          )

          const subtasks: ({ name: string; id?: number } | { id: number })[] =
            inputs
              .filter((subtask) => {
                return (
                  subtask.hasOwnProperty('updated') ||
                  typeof subtask === 'string'
                )
              })
              .map((subtask) => {
                if (typeof subtask === 'string') {
                  return { name: subtask }
                }
                return { id: subtask.id, name: subtask.name }
              })

          subtasks.push(...subtastToDelete)
          try {
            const response = await fetch(
              `http://localhost:3000/board/${board?.boardId}/task/${task.id}`,
              {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  name,
                  description,
                  status: statusSelected?.id,
                  subtasks,
                }),
              }
            )

            if (!response.ok) {
              const responseError = await response.json()
              toast.error(responseError.message)
              console.error('Failed to update task in the database')
              return
            }

            const updatedTask = (await response.json()) as Partial<Task>
            updatetask(updatedTask)
            closePopup()
            toast.success('Task updated successfully')
          } catch (error) {
            console.error('Error fetching task data:', error)
            toast.error('An error occurred while fetching task data')
          }
        }}
      >
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
            <div
              className="w-full flex items-center gap-4 relative"
              key={index}
            >
              <InputText
                label=""
                defaultValue={
                  typeof subtask === 'string' ? subtask : subtask.name
                }
                placeholder="e.g. Make coffee"
                name={`subtask-${index}`}
                minLength={4}
                maxLength={20}
                onChange={(e) => {
                  const value = e.target.value
                  updateSubtasks({ index, subtask, value })
                }}
              />
              <IconCross
                className="text-[#828FA3] cursor-pointer hover:text-red"
                onClick={() => {
                  if (typeof subtask === 'string')
                    return deleteInput(index, true)
                  setSubtaskToDelete((prev) => [...prev, { id: subtask.id }])
                  deleteInput(index, true)
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
