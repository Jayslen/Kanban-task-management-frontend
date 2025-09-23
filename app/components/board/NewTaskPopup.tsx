import { useState, type FormEvent } from 'react'
import { Popup } from '../PopupLayout'
import { InputText, TaskSelectInput } from './TasksInputs'
import { useCurrentBoard } from '~/context/useCurrentBoard'
import { useIncreaseInputs } from '~/hooks/useIncreseInputs'
import { IconCross } from '~/assets/IconCross'
import { useTaskStatus } from '~/hooks/useTaskStatus'
import type { Task } from '~/types/global'
import toast from 'react-hot-toast'

export function NewTask(props: { closePopup: () => void }) {
  const { closePopup } = props
  const { board, addTask } = useCurrentBoard()
  const {
    inputs,
    inputContainerId,
    updateInputValue,
    addNewInput,
    deleteInput,
  } = useIncreaseInputs()
  const { status, statusSelected, updateTaskStatus } = useTaskStatus()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    )
    const taskInfo: {
      name: string
      status: number
      subtasks: string[]
      description?: string
    } = {
      name: formData.title as string,
      status: statusSelected?.id as number,
      subtasks: inputs.filter((subtask) => subtask.length > 0),
    }

    if (formData.description) {
      taskInfo.description = formData.description as string
    }

    const response = await fetch(
      `http://localhost:3000/board/${board?.boardId}/task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskInfo),
        credentials: 'include',
      }
    )
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error creating task:', errorData)
      console.log(errorData)
      return
    }

    const newTask = (await response.json()) as Task
    addTask(newTask)
    toast.success('Task added successfully')
    closePopup()
  }

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
          {inputs.map((_, index) => (
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
                onClick={() => deleteInput(index)}
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
            updateStatus={updateTaskStatus}
            currentStatus={statusSelected}
          />
        </div>
        <button className="primary-btn-l w-full">Add new Task</button>
      </form>
    </Popup>
  )
}
