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
      className="absolute top-0 left-0 z-20 grid h-screen w-screen place-content-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <section
        className="dark:bg-dark-grey custom-scrollbar mx-auto flex w-[90%] flex-col gap-6 overflow-auto rounded-md bg-white p-8 md:max-h-[600px] md:min-h-[520px] md:w-[480px]"
        style={{ minHeight: height ?? '520px' }}
        onClick={handleSectionClick}
      >
        {children}
      </section>
    </div>
  )
}
