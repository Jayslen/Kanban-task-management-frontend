import LightModeLogo from '@assets/logo-light.svg'
import DarkModeLogo from '@assets/logo-dark.svg'

export function Logos() {
  return (
    <>
      <img src={LightModeLogo} alt="Logo kaban" className="hidden dark:block" />
      <img src={DarkModeLogo} alt="Logo kaban" className="block dark:hidden" />
    </>
  )
}
