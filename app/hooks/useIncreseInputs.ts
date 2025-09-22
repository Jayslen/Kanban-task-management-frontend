import debounce from 'just-debounce-it'
import { useId, useState } from 'react'

export function useIncreaseInputs() {
  const [inputs, setInputs] = useState(['', ''])
  const inputContainerId = useId()

  const updateInputValue = debounce((value: string, index: number) => {
    if (value.length === 0) return
    const newInputs = [...inputs]
    newInputs[index] = value
    setInputs(newInputs)
  }, 600)

  const deleteInput = (index: number) => {
    if (inputs.length <= 2) return
    const newInputs = inputs.filter((_, i) => i !== index)
    setInputs(newInputs)
  }

  const addNewInput = () => {
    const areInputsEmpty = inputs.some((col) => col.length === 0)
    if (areInputsEmpty) {
      const inputs = document
        .getElementById(inputContainerId)
        ?.getElementsByTagName('input')
      Array.from(inputs || []).forEach((input) => {
        if (input.value.length === 0) {
          input.parentElement?.classList.add('column-empty')
          setTimeout(() => {
            input.parentElement?.classList.remove('column-empty')
          }, 3000)
        }
      })
    } else {
      setInputs((prev) => [...prev, ''])
    }
  }

  return {
    inputs,
    updateInputValue,
    deleteInput,
    addNewInput,
    inputContainerId,
  }
}
