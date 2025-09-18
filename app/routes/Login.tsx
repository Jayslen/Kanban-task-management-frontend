import { type FormEvent } from 'react'
import logo from '@assets/logo-light.svg'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import '../inputStyles.css'

export default function Login() {
  const navigate = useNavigate()

  const myPromise = async (formData: { [k: string]: FormDataEntryValue }) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })

    if (!response.ok) {
      const responseError = await response.json()
      throw new Error(responseError.message)
    }
    const data = await response.json()
    window.localStorage.setItem('user', JSON.stringify(data.username))
    return data.username
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))

    toast.promise(myPromise(formData), {
      loading: 'Logging in...',
      success: (data) => {
        navigate('/')
        return `Welcome back ${data}!`
      },
      error: (err) => {
        return `${err.message}`
      },
    })
  }
  return (
    <>
      <header className="p-4 border-b-[0.5px] border-medium-grey/25">
        <a href="/">
          <img src={logo} alt="Logo kaban" />
        </a>
      </header>
      <main className="font-plus-jakarta-sans w-full flex justify-center">
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
