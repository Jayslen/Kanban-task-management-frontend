import { Popup } from '../PopupLayout'

export function DeletePopup(props: {
  closePopup: () => void
  deleteAction: () => void
  board?: { id: string; boardName: string }
  task?: { id: string; title: string }
}) {
  const { closePopup, board, task, deleteAction } = props
  const isABoard = Boolean(board)
  return (
    <Popup closePopup={closePopup} height="auto">
      <div className="flex flex-col gap-4">
        <header>
          <h3 className="text-red heading-l">
            Delete this {isABoard ? 'Board' : 'Task'}?
          </h3>
        </header>
        <p className="text-medium-grey text-sm">
          {isABoard
            ? `Are you sure you want to delete the ${board?.boardName} board? This action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘${task?.title}’ task and its subtasks? This action cannot be reversed.`}
        </p>
        <footer className="flex gap-4">
          <button className="delete-btn" onClick={deleteAction}>
            Delete
          </button>
          <button className="secondary-btn" onClick={closePopup}>
            Cancel
          </button>
        </footer>
      </div>
    </Popup>
  )
}
