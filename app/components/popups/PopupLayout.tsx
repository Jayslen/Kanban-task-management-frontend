export function Popup(props: {
  children: React.ReactNode
  closePopup: () => void
  height?: string
}) {
  const { children, closePopup, height = '520px' } = props
  const handleBackdropClick = () => {
    console.log('Backdrop clicked, closing popup')
    closePopup()
  }

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div
      className="absolute w-screen h-screen top-0 left-0 bg-black/50 grid place-content-center"
      onClick={handleBackdropClick}
    >
      <section
        className="w-[480px] max-h-[600px] min-h-[520px] flex flex-col gap-6 dark:bg-dark-grey rounded-md p-8 overflow-auto custom-scrollbar"
        style={{ minHeight: height ?? '520px' }}
        onClick={handleSectionClick}
      >
        {children}
      </section>
    </div>
  )
}
