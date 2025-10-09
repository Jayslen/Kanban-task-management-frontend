import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { APIMethods } from "~/api/apiClient"

export function useLoginUser() {
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true)
    const navigate = useNavigate()
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))

        toast.promise(
            APIMethods.LoginUser(formData as { username: string; password: string }),
            {
                loading: 'Logging in...',
                success: (username) => {
                    navigate('/')
                    window.localStorage.setItem('user', JSON.stringify(username))
                    return `Welcome back, ${username}`
                },
                error: (err) => {
                    return `${err.message === 'Failed to fetch' ? 'Network error' : err.message}`
                },
            }
        )
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, password } = Object.fromEntries(new FormData(e.currentTarget))
        toast.promise(
            APIMethods.RegisterUser({ username: username as string, password: password as string }),
            {
                loading: 'Creating your account...',
                success: (registeredUsername) => {
                    navigate('/')
                    window.localStorage.setItem('user', JSON.stringify(registeredUsername))
                    return `Welcome aboard, ${registeredUsername}`
                },
                error: (err) => {
                    return `${err.message === 'Failed to fetch' ? 'Network error' : err.message}`
                },
            }
        )
    }

    const togleLoginRegister = () => {
        setIsLoggingIn((prev) => !prev)
    }

    return { handleLogin, handleRegister, togleLoginRegister, isLoggingIn }
}