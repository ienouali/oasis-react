import React, {createContext, useEffect} from "react";
import {useLocalStorageState} from "../hooks/useLocalStorageState.ts";

export const DarkModeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} })

export function DarkModeProvider({children}: {children: React.ReactElement}) {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(mode, 'isDarkMode')
    function toggleDarkMode() {
        setIsDarkMode((isDarkMode: boolean) => !isDarkMode)
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
    }, [isDarkMode]);

    return <DarkModeContext.Provider  value={{ isDarkMode, toggleDarkMode }}>
        {children}
    </DarkModeContext.Provider>
}
