import { useLoginUser } from '~/hooks/useLoginUser'
import { Logos } from '~/components/Logos'
import { InputText } from '~/components/task/TasksInputs'

export default function Login() {
  const { handleLogin, handleRegister, togleLoginRegister, isLoggingIn } =
    useLoginUser()
  return (
    <>
      <header className="border-medium-grey/25 border-b-[0.5px] p-4">
        <a href="/">
          <Logos />
        </a>
      </header>
      <main className="flex w-full justify-center">
        <section className="w-[400px] p-6">
          <h1 className="text-3xl font-bold dark:text-white">Login</h1>
          <p className="dark:text-white">Hi, welcome back</p>
          <form
            className="my-2 flex flex-col gap-3"
            onSubmit={isLoggingIn ? handleLogin : handleRegister}
          >
            {isLoggingIn && (
              <>
                <InputText
                  label="Username"
                  name="username"
                  placeholder='e.g. "johndoe"'
                  type="text"
                  minLength={4}
                  maxLength={30}
                />
                <InputText
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  minLength={8}
                  maxLength={50}
                />

                <button type="submit" className="secondary-btn w-full">
                  Login
                </button>
              </>
            )}
            {!isLoggingIn && (
              <>
                <InputText
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="e.g. example@gmail.com"
                  minLength={8}
                  maxLength={50}
                />
                <InputText
                  label="Username"
                  name="username"
                  placeholder='e.g. "johndoe"'
                  type="text"
                  minLength={4}
                  maxLength={30}
                />
                <InputText
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  minLength={8}
                  maxLength={50}
                />
                <button type="submit" className="secondary-btn w-full">
                  Register
                </button>
              </>
            )}
          </form>
          <p className="text-center text-sm dark:text-white">
            {isLoggingIn ? 'Not registerd yet?' : 'Already have an account? '}
            <button
              className="cursor-pointer text-gray-700 underline dark:text-gray-400"
              type="button"
              onClick={togleLoginRegister}
            >
              {isLoggingIn ? 'Create an account' : 'Login'}
            </button>
          </p>
        </section>
      </main>
    </>
  )
}
