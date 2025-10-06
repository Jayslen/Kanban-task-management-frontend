import logo from '@assets/logo-light.svg'
import '../inputStyles.css'
import { useLoginUser } from '~/hooks/useLoginUser'

export default function Login() {
  const { handleLogin } = useLoginUser()
  return (
    <>
      <header className="p-4 border-b-[0.5px] border-medium-grey/25">
        <a href="/">
          <img src={logo} alt="Logo kaban" />
        </a>
      </header>
      <main className="w-full flex justify-center">
        <section className="w-[400px] p-6">
          <h1 className="dark:text-white font-bold text-3xl">Login</h1>
          <p className="dark:text-white">Hi, welcome back</p>
          <form className="flex flex-col gap-3 my-2" onSubmit={handleLogin}>
            <label className="font-regular dark:text-white">
              Username
              <input
                type="text"
                name="username"
                placeholder="e.g. John Doe"
                className="outline-1 outline-medium-grey/25 rounded-sm h-10 p-4 text-white/85 focus:outline w-full"
                minLength={4}
                maxLength={30}
                required
              />
            </label>
            <label className="font-regular dark:text-white">
              Password
              <input
                type="password"
                name="password"
                placeholder="e.g. John Doe"
                className="outline-1 outline-medium-grey/25 rounded-sm h-10 p-4 text-white/85 block w-full"
                minLength={8}
                maxLength={50}
                required
              />
            </label>
            <button type="submit" className="secondary-btn w-full">
              Login
            </button>
          </form>
          <p className="text-white text-center text-sm">
            Not registerd yet?{' '}
            <a
              href="/"
              className="text-gray-400 underline visited:text-purple-500"
            >
              Create an account
            </a>
          </p>
        </section>
      </main>
    </>
  )
}
