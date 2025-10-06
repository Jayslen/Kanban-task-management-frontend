import DarkModeIcon from '../assets/icon-dark-theme.svg'
import LightModeIcon from '../assets/icon-light-theme.svg'

export function ToggleTheme() {
  return (
    <div className="dark:bg-very-dark-grey-dark-bg mx-4 flex items-center justify-center gap-4 rounded-md p-3 md:mx-6">
      <img src={LightModeIcon} alt="Light mode icon" />
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" />
        <div className="peer peer-checked:bg-main-purple relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
      </label>
      <img src={DarkModeIcon} alt="Dark mode icon" />
    </div>
  )
}
