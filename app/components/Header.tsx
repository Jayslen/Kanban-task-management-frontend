export function Header() {
  return (
    <header className="flex justify-between dark:bg-dark-grey dark:text-white p-4 [grid-area:header]">
      <h1 className="heading-xl">Platform Launch</h1>
      <button className="primary-btn-l w-40 heading-m">+ Add New Task</button>
    </header>
  )
}
