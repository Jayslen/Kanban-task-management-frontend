import debounce from 'just-debounce-it'
import { useId, useState } from 'react'

export function useIncreaseInputs(defaultInputs?:
  {
    name: string,
    id: string,
    updated?: boolean,
    fromDB?: boolean
  }[]
) {
  const [inputs, setInputs] = useState<{ name: string, id: string, updated?: boolean, fromDB?: boolean }[]>(defaultInputs || [
    { id: crypto.randomUUID(), name: '' },
    { id: crypto.randomUUID(), name: '' },
  ])

  const inputContainerId = useId()
  const updateInputValue = debounce((value: string, index: number) => {
    if (value.length === 0) return
    const newInputs = [...inputs]
    newInputs[index] = { ...newInputs[index], name: value }
    setInputs(newInputs)
  }, 300)

  const deleteInput = (id: string, deleteAll = false) => {
    if (inputs.length <= 2 && !deleteAll) return
    if (inputs.length === 0) return

    setInputs((prev) => {
      return prev.filter((s) => s.id !== id)
    })
  }

  const addNewInput = () => {
    const areInputsEmpty = inputs.some((col) => {
      return col.name.length === 0
    })
    if (areInputsEmpty) {
      const inputs = document
        .getElementById(inputContainerId)
        ?.getElementsByTagName('input')
      Array.from(inputs || []).forEach((input) => {
        if (input.value.length === 0) {
          input.parentElement?.classList.add('column-empty')
          setTimeout(() => {
            input.parentElement?.classList.remove('column-empty')
          }, 900)
        }
      })
    } else {
      setInputs((prev) => [...prev, { id: crypto.randomUUID(), name: '' }])
    }
  }

  return {
    inputs,
    updateInputValue,
    deleteInput,
    addNewInput,
    setInputs,
    inputContainerId,
  }
}
