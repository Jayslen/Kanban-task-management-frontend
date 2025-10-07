import { useEffect, useState } from "react"

export function useToggleTheme() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
    const handleToggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setIsDarkMode(false)
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setIsDarkMode(true)
        }
    }

    useEffect(() => {
        const userTheme = window.localStorage.getItem('theme')

        if (!userTheme) {
            const systemPreference = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
            systemPreference
                ? document.documentElement.classList.add('dark')
                : document.documentElement.classList.remove('dark')
        }

        if (userTheme === 'dark') {
            document.documentElement.classList.add('dark')
            setIsDarkMode(true)
            return
        }

        if (userTheme === 'light') {
            document.documentElement.classList.remove('dark')
            setIsDarkMode(false)
            return
        }
    })

    return { isDarkMode, handleToggleTheme }
}