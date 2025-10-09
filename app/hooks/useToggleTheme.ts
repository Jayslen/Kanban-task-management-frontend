import { useEffect, useState } from "react"

export function useToggleTheme() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const handleToggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark'
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        window.localStorage.setItem('theme', newTheme)
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const userTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const activeTheme = userTheme || (systemPrefersDark ? 'dark' : 'light')

        document.documentElement.classList.toggle('dark', activeTheme === 'dark')
        setIsDarkMode(activeTheme === 'dark')
    }, [])

    return { isDarkMode, handleToggleTheme }
}